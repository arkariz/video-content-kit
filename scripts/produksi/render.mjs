// Gabungkan script.json + durasi + captions + assets -> props, lalu render komposisi. Satu render per waktu.
// Opsi: --still s06[,s07] (gambar diam; scene R3: satu per shot, atau --at 1.2,5) · --scenes s06 (render pendek beberapa scene)
//       --script <path> (naskah lain, mis. produksi/contoh-r3/...; hasil ke render/_contoh/, 04-assets.json tidak diubah)
import path from "node:path"; import { execFileSync as ef } from "node:child_process"; import fs from "node:fs"; import { execFileSync } from "node:child_process";
import { ROOT, args, resolveCycle, readJson, writeJson, pauseSec } from "./lib.mjs"; import { timeShots } from "./r3.mjs";
const o = args(); const lang = o.lang || "en"; const comp = o.comp || "Master16x9"; const cut = o.cut; // --cut A1-zero-dollars-moved
const cyc = resolveCycle(o.track, o.siklus); const scriptPath = o.script ? path.resolve(ROOT, o.script) : cyc.scriptPath; const { assetsPath } = cyc; const script = readJson(scriptPath);
const contoh = !!o.script; const outBase = contoh ? `render/_contoh/${path.basename(path.dirname(scriptPath))}` : `render/${o.track}/${o.siklus}`;
const specs = readJson(path.join(path.dirname(scriptPath), "04-visual-spec.json"), {});
const stages = readJson(path.join(path.dirname(scriptPath), "04-stage.json"), {});
const caps = readJson(path.join(ROOT, "produksi/captions", o.track, o.siklus, `${lang}.json`), {}); const assets = readJson(assetsPath, { footage: [], renders: [] });
if (o.thumb) { // thumbnail dari script.thumbnails -> Thumbnail-A.png, Thumbnail-B.png, ...
  const list = script.thumbnails || []; if (!list.length) throw new Error("script.thumbnails kosong");
  const outDir = path.join(ROOT, "produksi/render", o.track, o.siklus); fs.mkdirSync(outDir, { recursive: true }); const tp = path.join(ROOT, "produksi/render", `.props-${o.track}-${o.siklus}-thumb.json`); const a = readJson(assetsPath, { footage: [], renders: [] });
  const gl3 = list.some((t) => t.stage?.engine === "r3") ? ["--gl=angle"] : [];
  list.forEach((th, i) => { const name = `Thumbnail-${String.fromCharCode(65 + i)}.png`; writeJson(tp, { trackId: o.track, ...th });
    execFileSync("npx", ["remotion", "still", "src/index.ts", "Thumbnail", path.join(outDir, name), `--props=${tp}`, `--public-dir=${path.join(ROOT, "produksi")}`, "--frame=89", ...gl3], { cwd: path.join(ROOT, "produksi/remotion"), stdio: "ignore" });
    const rel = `render/${o.track}/${o.siklus}/${name}`; a.renders = [...a.renders.filter((r) => r.file !== rel), { file: rel, comp: "Thumbnail" }]; console.log("thumbnail", rel); });
  writeJson(assetsPath, a); process.exit(0);
}
// Siklus yang memakai lapisan 3D (@r3/three) butuh WebGL di Chrome headless.
const shotsFile = path.join(path.dirname(scriptPath), "04-shots.tsx");
const gl = fs.existsSync(shotsFile) && fs.readFileSync(shotsFile, "utf8").includes("@r3/three") ? ["--gl=angle"] : [];
const FPS = 30; const PAUSE = Math.round(parseFloat(o.pause ?? "0.9") * FPS); // jeda akhir scene (detik)
const cutDef = cut && script.shorts_cuts.find((c) => c.name === cut);
const ids = o.still ? o.still.split(",") : o.scenes ? o.scenes.split(",") : cutDef ? cutDef.scene_ids : script.scenes.map((s) => s.id);
const shotsModule = path.relative(ROOT, path.join(path.dirname(scriptPath), "04-shots.tsx")).split(path.sep).join("/");
const scenes = ids.map((id, idx) => { const s = script.scenes.find((x) => x.id === id); if (!s) throw new Error(`${id}: scene tidak ada di ${path.relative(ROOT, scriptPath)}`); const ms = s.duration_ms?.[lang]; if (!ms) throw new Error(`${id}: belum ada duration_ms (${lang}); jalankan tts.mjs`);
  const f = s.shots?.length ? null : assets.footage.find((x) => x.scene_id === id);
  const audioFrames = Math.ceil((ms / 1000) * FPS), durationFrames = audioFrames + Math.round((o.pause !== undefined ? parseFloat(o.pause) : pauseSec(script.scenes.find((x) => x.id === ids[idx + 1]))) * FPS);
  let r3; if (s.shots?.length) { // mesin R3: waktu shot dan label dari caption per kata (scripts/produksi/r3.mjs)
    const tm = timeShots(s, caps[id] || [], (durationFrames / FPS) * 1000); for (const w of tm.warn) console.log("  peringatan R3:", w);
    r3 = { module: shotsModule, track: o.track, shots: tm.shots }; }
  return { id, type: s.visual?.type ?? (r3 ? "r3" : ""), text: s.visual?.on_screen_text || "", description: s.visual?.description ?? "", audio: `audio/${o.track}/${o.siklus}/${lang}/${id}.mp3`, spec: specs[id], stage: r3 ? undefined : stages[id]?.engine === "diorama" ? { ...stages[id], world: script.world } : stages[id], r3, audioFrames, durationFrames, clip: f?.file, clipFrames: f ? Math.floor(parseFloat(ef("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path.join(ROOT, "produksi", f.file)]).toString()) * FPS) : undefined, captions: caps[id] || [] }; });
// --dub id : track audio bahasa lain dengan timing persis video `lang` (efek suara ikut). Hanya audio yang dirender.
const dubbed = [];
if (o.dub) for (const s of scenes) { const ms = script.scenes.find((x) => x.id === s.id).duration_ms?.[o.dub]; if (!ms) throw new Error(`${s.id}: belum ada audio ${o.dub}`);
  s.audio = `audio/${o.track}/${o.siklus}/${o.dub}/${s.id}.mp3`; const rate = (ms / 1000) * FPS / (s.durationFrames - 2); if (rate > 1) { s.audioRate = Math.round(rate * 1000) / 1000; dubbed.push([s.id, s.audioRate]); } }
const props = { trackId: o.track, lang, scenes, vertical: comp !== "Master16x9" };
const tmp = path.join(ROOT, "produksi/render", `.props-${o.track}-${o.siklus}${contoh ? "-contoh" : ""}.json`); writeJson(tmp, props);
const tag = cut ? "-" + cut : o.scenes ? "-" + ids.join("-") : "";
const outRel = o.dub ? `${outBase}/${comp}${tag}-audio-${o.dub}.m4a` : `${outBase}/${comp}${tag}-${lang}.mp4`; fs.mkdirSync(path.dirname(path.join(ROOT, "produksi", outRel)), { recursive: true });
if (o["props-only"]) { console.log("props", path.relative(ROOT, tmp)); process.exit(0); }
if (o.still) {
  for (const id of ids) {
    const one = { ...props, scenes: props.scenes.filter((s) => s.id === id) }; writeJson(tmp, one); const sc = one.scenes[0];
    // scene R3: satu gambar per shot (saat label sudah tampil), atau detik yang diminta lewat --at
    const at = o.at ? String(o.at).split(",").map((x) => [`t${x}`, Math.round(parseFloat(x) * FPS)]) : sc.r3 ? sc.r3.shots.map((x, i) => [`shot${i + 1}`, Math.round(((x.startMs + Math.min(x.endMs - x.startMs - 400, Math.max(1500, ...(x.labels || []).map((l) => l.atMs - x.startMs + 500)))) / 1000) * FPS)]) : [["", Math.max(1, sc.audioFrames - 8)]];
    for (const [name, frame] of at) {
      const out = path.join(ROOT, "produksi", outBase, "stills", `${id}-${comp}${name ? "-" + name : ""}.png`); fs.mkdirSync(path.dirname(out), { recursive: true });
      execFileSync("npx", ["remotion", "still", "src/index.ts", comp, out, `--props=${tmp}`, `--public-dir=${path.join(ROOT, "produksi")}`, `--frame=${Math.min(sc.durationFrames - 1, Math.max(0, frame))}`, ...gl], { cwd: path.join(ROOT, "produksi/remotion"), stdio: "inherit" }); console.log("still", path.relative(ROOT, out));
    }
  }
  process.exit(0);
}
execFileSync("npx", ["remotion", "render", "src/index.ts", comp, path.join(ROOT, "produksi", outRel), `--props=${tmp}`, `--public-dir=${path.join(ROOT, "produksi")}`, "--concurrency=50%", ...gl, ...(o.dub ? ["--codec=aac"] : [])], { cwd: path.join(ROOT, "produksi/remotion"), stdio: "inherit" });
if (!contoh && !o.scenes) { assets.renders = [...assets.renders.filter((r) => r.file !== outRel), { file: outRel, comp, lang: o.dub || lang, cut: cut || null, ...(o.dub ? { dub: true, dipercepat: Object.fromEntries(dubbed) } : {}) }]; writeJson(assetsPath, assets); }
console.log("render", outRel);
if (o.dub) console.log(`dub ${o.dub}: ${dubbed.length} scene dipercepat`, dubbed.map(([i, r]) => `${i}×${r}`).join(" "));
