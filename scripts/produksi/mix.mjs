// Campur musik latar (otomatis mengecil saat narasi) dan efek suara dari 04-audio.json ke video yang sudah dirender.
// Gambar tidak dirender ulang. Hasil render asli disimpan sebagai *.raw.mp4, jadi aman diulang (misalnya setelah efek suara menyusul).
// Pemakaian: node scripts/produksi/mix.mjs --track T01 --siklus 004     (setelah render.mjs)
import fs from "node:fs"; import path from "node:path"; import { execFileSync, spawnSync } from "node:child_process";
import { ROOT, args, resolveCycle, readJson, writeJson, pauseSec } from "./lib.mjs"; import { findWord } from "./r3.mjs";
const o = args(); const lang = o.lang || "en"; const { dir, scriptPath, assetsPath } = resolveCycle(o.track, o.siklus);
const spec = readJson(path.join(dir, "04-audio.json")); const script = readJson(scriptPath);
const caps = readJson(path.join(ROOT, "produksi/captions", o.track, o.siklus, `${lang}.json`), {});
const outDir = path.join(ROOT, "produksi/render", o.track, o.siklus); const extra = path.join(ROOT, "produksi/audio", o.track, o.siklus, "extra");
const FPS = 30;
const probe = (f, entry) => execFileSync("ffprobe", ["-v", "error", "-show_entries", entry, "-of", "csv=p=0", f]).toString().trim();
const music = path.join(extra, "music.mp3"); if (!fs.existsSync(music)) throw new Error("musik belum ada; jalankan audio-extra.mjs");
const targets = [{ file: `Master16x9-${lang}.mp4`, ids: script.scenes.map((s) => s.id) }, ...(script.shorts_cuts || []).map((c) => ({ file: `Short9x16-${c.name}-${lang}.mp4`, ids: c.scene_ids }))];
const missing = new Set(); const report = [];
// encoder AudioToolbox bila ada (encoder aac bawaan ffmpeg pernah menghasilkan lonjakan puncak di master 004)
const AAC = spawnSync("ffmpeg", ["-hide_banner", "-encoders"], { encoding: "utf8" }).stdout.includes(" aac_at ") ? "aac_at" : "aac";
const peak = (f) => parseFloat(spawnSync("ffmpeg", ["-nostats", "-i", f, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"], { encoding: "utf8" }).stderr.match(/Peak:\s+(-?[\d.]+) dBFS/g).at(-1).split(/\s+/)[1]);
const lufs = (f) => parseFloat(spawnSync("ffmpeg", ["-nostats", "-i", f, "-vn", "-af", "ebur128", "-f", "null", "-"], { encoding: "utf8" }).stderr.match(/I:\s+(-?[\d.]+) LUFS/g).at(-1).split(/\s+/)[1]);
for (const t of targets) {
  const final = path.join(outDir, t.file), raw = final.replace(/\.mp4$/, ".raw.mp4");
  if (!fs.existsSync(final)) { console.log("lewati (belum dirender):", t.file); continue; }
  if (!probe(final, "format_tags=comment").includes("mixed")) fs.copyFileSync(final, raw); // render baru menjadi sumber
  const dur = parseFloat(probe(raw, "format=duration"));
  // waktu mulai scene sama dengan render.mjs
  let frames = 0; const cues = [];
  t.ids.forEach((id, i) => {
    const s = script.scenes.find((x) => x.id === id), words = caps[id] || [];
    for (const c of spec.cues.filter((x) => x.scene === id)) {
      const k = c.word ? findWord(words, c.word) : -1;
      if (c.word && k < 0) console.log(`  peringatan: ${id} kata "${c.word}" tidak ada di caption`);
      const at = Math.max(0, frames / FPS + (k >= 0 ? words[k].startMs / 1000 : 0) + (c.offset ?? 0));
      const f = path.join(extra, `${c.sfx}.mp3`); if (fs.existsSync(f)) cues.push({ f, at, vol: c.vol ?? 0.4 }); else missing.add(c.sfx);
    }
    const next = script.scenes.find((x) => x.id === t.ids[i + 1]);
    frames += Math.ceil((s.duration_ms[lang] / 1000) * FPS) + Math.round(pauseSec(next) * FPS);
  });
  const musLen = parseFloat(probe(music, "format=duration")); const copies = Math.max(1, Math.ceil((dur - 4) / (musLen - 4)));
  const inputs = ["-i", raw]; for (let i = 0; i < copies; i++) inputs.push("-i", music); for (const c of cues) inputs.push("-i", c.f);
  const flt = []; let bed = "[1:a]";
  for (let i = 1; i < copies; i++) { flt.push(`${bed}[${i + 1}:a]acrossfade=d=4:c1=tri:c2=tri[b${i}]`); bed = `[b${i}]`; }
  flt.push(`[0:a]asplit=2[voice][key]`);
  flt.push(`${bed}atrim=0:${dur},volume=${spec.music.volume},afade=t=in:d=0.8,afade=t=out:st=${Math.max(0, dur - 2)}:d=2,aresample=48000[mus]`);
  flt.push(`[mus][key]sidechaincompress=threshold=0.03:ratio=4:attack=25:release=500[duck]`);
  cues.forEach((c, i) => { const ms = Math.round(c.at * 1000); flt.push(`[${1 + copies + i}:a]aresample=48000,volume=${c.vol},adelay=${ms}|${ms}[x${i}]`); });
  flt.push(`[voice][duck]${cues.map((_, i) => `[x${i}]`).join("")}amix=inputs=${2 + cues.length}:duration=first:normalize=0,alimiter=limit=0.95[out]`);
  const tmp = final.replace(/\.mp4$/, ".tmp.mov"); // audio antara tanpa kompresi, AAC hanya dikodekan sekali
  execFileSync("ffmpeg", ["-v", "error", "-y", ...inputs, "-filter_complex", flt.join(";"), "-map", "0:v", "-map", "[out]", "-c:v", "copy", "-c:a", "pcm_f32le", "-ar", "48000", "-t", String(dur), "-metadata", "comment=mixed", "-movflags", "+faststart", tmp], { stdio: "inherit" });
  // naikkan ke target kenyaringan (spec.target_lufs): penguatan + limiter; koreksi diulang karena limiter memakan sebagian kenaikan
  let measured = lufs(tmp);
  const loud = final.replace(/\.mp4$/, ".loud.mp4"); const target = spec.target_lufs ?? -14; let gain = target - measured;
  {
    for (let pass = 0; pass < 3; pass++) {
      execFileSync("ffmpeg", ["-v", "error", "-y", "-i", tmp, "-map", "0:v", "-map", "0:a", "-c:v", "copy", "-af", `volume=${gain.toFixed(2)}dB,aresample=192000,alimiter=limit=0.82:attack=4:release=80:level=false,aresample=48000`, "-c:a", AAC, "-b:a", "192k", "-metadata", "comment=mixed", "-movflags", "+faststart", loud], { stdio: "inherit" });
      measured = lufs(loud); if (Math.abs(target - measured) <= 0.4) break; gain += target - measured;
    }
    fs.rmSync(tmp);
  }
  const puncak = peak(loud); if (puncak > 0) console.log(`  peringatan: puncak audio ${puncak} dBFS di ${t.file}, periksa`);
  fs.renameSync(loud, final); report.push({ file: t.file, sfx: cues.length, lufs: measured }); console.log("campur", t.file, `${dur.toFixed(1)} dtk, ${cues.length} efek suara, ${measured} LUFS`);
}
if (missing.size) console.log("efek suara BELUM ADA (dilewati):", [...missing].join(", "));
const assets = readJson(assetsPath, { footage: [], renders: [] });
assets.audio_extra = { sumber: "ElevenLabs (Music API, Sound Generation)", musik: spec.music.prompt, tercampur: report, sfx_belum_ada: [...missing] };
writeJson(assetsPath, assets);
