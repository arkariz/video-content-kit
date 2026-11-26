// QA gaya wajib R3 (G1-G7). Dipakai qa.mjs, dan bisa dijalankan sendiri untuk satu naskah atau satu scene:
//   node scripts/pipeline/qa-r3.mjs --track T02 --siklus 002 [--scene s06] [--script produksi/contoh-r3/.../03-script.json]
// Kode keluar 2 bila ada temuan kritis.
import path from "node:path"; import { pathToFileURL } from "node:url";
import { ROOT, readJson, resolveCycle } from "../produksi/lib.mjs";
import { longSentences, sentences, timeShots, validateR3, validateVisualSpec } from "../produksi/r3.mjs";

const daftar = (a) => a.slice(0, 6).join(", ") + (a.length > 6 ? "…" : "");

/** Temuan G1-G6 untuk naskah. footageIds = scene yang memakai footage nyata (tidak butuh shots). */
export function cekR3(script, { footageIds = new Set(), captions = {}, scriptPath, track, only } = {}) {
  const F = []; const add = (level, id, msg, fix) => F.push({ layer: "Visual", level, id, msg, fix });
  const sc = (script.scenes || []).filter((s) => !only || only.includes(s.id));
  const tanpa = sc.filter((s) => !footageIds.has(s.id) && !(Array.isArray(s.shots) && s.shots.length)).map((s) => s.id);
  if (tanpa.length) add("kritis", "G1", `gaya wajib R3: ${tanpa.length} scene tanpa shots (${daftar(tanpa)})`, "tulis shots satu per kalimat sesuai instruksi/referensi/gaya-visual.md");
  const r3 = sc.filter((s) => Array.isArray(s.shots) && s.shots.length);
  const kurang = r3.filter((s) => s.shots.length < longSentences(s.narration.en)).map((s) => s.id);
  if (kurang.length) add("sedang", "G2", `${kurang.length} scene punya shot lebih sedikit dari kalimatnya (${daftar(kurang)})`, "satu shot per kalimat; kalimat di bawah 4 kata boleh berbagi");
  const diam = r3.flatMap((s) => s.shots.filter((x) => !x.motion?.trim() || !x.show?.trim()).map((x) => `${s.id}#${x.sentence ?? "?"}`));
  if (diam.length) add("sedang", "G3", `${diam.length} shot tanpa show atau motion (${daftar(diam)})`, "isi apa yang terlihat dan apa yang bergerak");
  // G4: label harus jatuh di kata yang diucapkan di kalimat shot itu (pakai waktu caption bila ada)
  const salah = [];
  for (const s of r3) {
    const caps = captions[s.id];
    if (caps?.length) { const { warn } = timeShots(s, caps); for (const w of warn) if (/label/.test(w)) salah.push(w); }
    else { const ks = sentences(s.narration.en); for (const x of s.shots) for (const l of x.labels || []) { const k = (ks[x.sentence - 1] || "").toLowerCase().replace(/[^a-z0-9 -]/g, " "); if (!k.includes(String(l.word || "").toLowerCase())) salah.push(`${s.id}#${x.sentence}: "${l.word}"`); } }
  }
  if (salah.length) add("kecil", "G4", `${salah.length} label dengan word yang tidak ada di kalimatnya (${daftar(salah)})`, "word harus kata yang diucapkan di kalimat shot itu");
  if (r3.length && !script.anchor) add("sedang", "G5", "tanpa anchor (jangkar visual) di tingkat atas", "tulis anchor sesuai gaya-visual.md bagian 6");
  // G6: kontrak lengkap dan komponen adegan tersedia (tanpa itu mesin menggambar placeholder)
  if (r3.length) {
    const { errs } = validateR3({ ...script, scenes: r3 }, { track, scriptPath });
    const lain = errs.filter((e) => !/show kosong|motion kosong|^anchor:|: word "/.test(e));
    if (lain.length) add("kritis", "G6", `kontrak R3 atau komponen adegan bermasalah (${lain.length}): ${daftar(lain)}`, "perbaiki kontrak shots / tulis 04-shots.tsx (produksi/PIPELINE.md, bagian Mesin R3)");
  }
  // G7: arah visual 03-visual.json (V-1 sampai V-14), hanya bila naskah menulis visual_spec
  const vs = validateVisualSpec(script, { scriptPath }).filter((f) => !only || only.includes(f.id) || !/^s\d/.test(f.id));
  if (vs.length) {
    const level = vs.some((f) => f.level === "kritis") ? "kritis" : vs.some((f) => f.level === "sedang") ? "sedang" : "kecil";
    add(level, "G7", `arah visual belum siap (${vs.length}): ${daftar(vs.map((f) => `${f.id} ${f.code} ${f.msg}`))}`, "lengkapi 03-visual.json sesuai instruksi/referensi/gaya-visual.md bagian 3 dan 7");
  }
  return F;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const a = process.argv.slice(2), o = {}; for (let i = 0; i < a.length; i++) if (a[i].startsWith("--")) o[a[i].slice(2)] = a[i + 1] && !a[i + 1].startsWith("--") ? a[++i] : true;
  if (!o.track || !o.siklus) throw new Error("Wajib: --track T02 --siklus 001");
  const cyc = resolveCycle(o.track, o.siklus); const scriptPath = o.script ? path.resolve(ROOT, o.script) : cyc.scriptPath;
  const script = readJson(scriptPath); const assets = readJson(cyc.assetsPath, { footage: [] });
  const captions = readJson(path.join(ROOT, "produksi/captions", o.track, o.siklus, "en.json"), {});
  const only = o.scene ? String(o.scene).split(",") : null;
  const footageIds = o.script ? new Set() : new Set(assets.footage.map((f) => f.scene_id));
  const F = cekR3(script, { footageIds, captions, scriptPath, track: o.track, only });
  const ids = ["G1", "G2", "G3", "G4", "G5", "G6", "G7"];
  console.log(`QA R3 ${o.track}/${o.siklus}${o.script ? ` (${path.relative(ROOT, scriptPath)})` : ""}${only ? ` scene ${only.join(",")}` : ""}`);
  for (const id of ids) { const f = F.find((x) => x.id === id); console.log(f ? `  ${id} ${f.level.toUpperCase()}: ${f.msg}` : `  ${id} lolos`); }
  process.exit(F.some((f) => f.level === "kritis") ? 2 : 0);
}
