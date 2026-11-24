// Pratinjau adegan tanpa siklus: node scripts/produksi/preview-stage.mjs --track T02 --stage file.json [--frame 0.9]
// file.json = {"nama": {stage...}}. PNG ke produksi/render/_preview/<track>/<nama>.png. Cocok untuk menguji tokoh/latar baru.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
import { ROOT, readJson, writeJson } from "./lib.mjs";
const a = process.argv.slice(2); const get = (k, d) => { const i = a.indexOf("--" + k); return i < 0 ? d : a[i + 1]; };
const track = get("track", "T01"), file = get("stage"), vertical = a.includes("--vertical"); const stages = readJson(path.resolve(file)); const outDir = path.join(ROOT, "produksi/render/_preview", track); fs.mkdirSync(outDir, { recursive: true });
const D = 90, tmp = path.join(outDir, ".props.json");
for (const [name, st] of Object.entries(stages)) {
  writeJson(tmp, { trackId: track, lang: "en", vertical, scenes: [{ id: name, type: "remotion-diagram", text: st._title ?? "", description: "", stage: st, audioFrames: D, durationFrames: D, captions: [] }] });
  const out = path.join(outDir, `${name}.png`);
  execFileSync("npx", ["remotion", "still", "src/index.ts", vertical ? "Short9x16" : "Master16x9", out, `--props=${tmp}`, `--frame=${Math.round(D * parseFloat(get("frame", "0.92")))}`], { cwd: path.join(ROOT, "produksi/remotion"), stdio: "ignore" });
  console.log("still", path.relative(ROOT, out));
}
