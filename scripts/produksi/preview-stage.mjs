// Pratinjau adegan tanpa siklus: node scripts/produksi/preview-stage.mjs --track T02 --stage file.json [--frame 0.9]
// file.json = {"nama": {stage...}}. PNG ke produksi/render/_preview/<track>/<nama>.png. Cocok untuk menguji tokoh/latar baru.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
import { ROOT, readJson, writeJson } from "./lib.mjs";
const a = process.argv.slice(2); const get = (k, d) => { const i = a.indexOf("--" + k); return i < 0 ? d : a[i + 1]; };
const track = get("track", "T01"), file = get("stage"), vertical = a.includes("--vertical"); const stages = readJson(path.resolve(file)); const outDir = path.join(ROOT, "produksi/render/_preview", track); fs.mkdirSync(outDir, { recursive: true });
const D = 90, tmp = path.join(outDir, ".props.json");
const world = stages._world; delete stages._world; // adegan diorama: dunia dipakai bersama
const FPS = 30;
const mk = (name, st, dur) => ({ id: name, type: "remotion-diagram", text: st._title ?? "", description: "", stage: st.camera ? { ...st, engine: "diorama", world } : st, audioFrames: dur, durationFrames: dur, captions: (st._say ?? "").split(/\s+/).filter(Boolean).map((w, i, a) => ({ text: w, startMs: Math.round((i * dur * 900) / FPS / a.length), endMs: Math.round(((i + 1) * dur * 900) / FPS / a.length) })) });
if (a.includes("--video")) { // satu video tanpa narasi dari semua adegan (durasi `_sec`, default 5 dtk)
  const comp = vertical ? "Short9x16" : "Master16x9", out = path.join(outDir, `${path.basename(file, ".json")}-${vertical ? "9x16" : "16x9"}.mp4`);
  writeJson(tmp, { trackId: track, lang: "en", vertical, scenes: Object.entries(stages).map(([n, st]) => mk(n, st, Math.round((st._sec ?? 5) * FPS))) });
  execFileSync("npx", ["remotion", "render", "src/index.ts", comp, out, `--props=${tmp}`, `--public-dir=${path.join(ROOT, "produksi")}`, "--concurrency=50%"], { cwd: path.join(ROOT, "produksi/remotion"), stdio: "ignore" });
  console.log("video", path.relative(ROOT, out)); process.exit(0);
}
for (const [name, st] of Object.entries(stages)) {
  writeJson(tmp, { trackId: track, lang: "en", vertical, scenes: [mk(name, st, D)] });
  const out = path.join(outDir, `${name}.png`);
  execFileSync("npx", ["remotion", "still", "src/index.ts", vertical ? "Short9x16" : "Master16x9", out, `--props=${tmp}`, `--public-dir=${path.join(ROOT, "produksi")}`, `--frame=${Math.round(D * parseFloat(get("frame", "0.92")))}`], { cwd: path.join(ROOT, "produksi/remotion"), stdio: "ignore" });
  console.log("still", path.relative(ROOT, out));
}
