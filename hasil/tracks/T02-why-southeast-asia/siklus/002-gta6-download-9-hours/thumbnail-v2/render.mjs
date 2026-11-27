// Render opsi thumbnail ke produksi/render/T02/002/thumbnail-v2/ (thumbnail yang sudah tayang tidak ditimpa).
// Jalankan dari root repo: node hasil/tracks/T02-why-southeast-asia/siklus/002-gta6-download-9-hours/thumbnail-v2/render.mjs [id,id]
import fs from "node:fs"; import path from "node:path"; import os from "node:os"; import { execFileSync } from "node:child_process"; import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url)); const root = path.resolve(here, "../../../../../..");
const module = path.relative(root, path.join(here, "04-shots.tsx")).split(path.sep).join("/");
const out = path.join(root, "produksi/render/T02/002/thumbnail-v2"); fs.mkdirSync(out, { recursive: true });
const W = "#ffffff", Y = "#ffd23f", M = "#7dffd0";
const L = (a, as, ac, b, bs, bc) => [{ text: a, size: as, color: ac }, { text: b, size: bs, color: bc }];
const jobs = {
  m1: ["Master-1", L("GTA VI", 220, Y, "1 HR vs 9 HR", 124, W)],
  m2: ["Master-2", L("GTA VI", 220, W, "STILL 11%?!", 138, Y)],
  m3: ["Master-3", L("GTA VI", 220, Y, "NOT THE SEA?", 120, W)],
  m4: ["Master-4", L("GTA VI", 220, W, "TOO BIG?", 156, Y)],
  s1a: ["Short1-A", L("GTA VI", 230, Y, "1H vs 9H", 156, W)],
  s1b: ["Short1-B", L("GTA VI", 230, W, "THEY'RE IN", 128, Y)],
  s1c: ["Short1-C", L("GTA VI", 230, Y, "8 HRS LEFT", 126, W)],
  s2a: ["Short2-A", L("GTA VI", 230, W, "PHONE WINS?", 112, Y)],
  s2b: ["Short2-B", L("GTA VI", 230, Y, "SKIP WI-FI?", 122, W)],
  s2c: ["Short2-C", L("GTA VI", 230, W, "2 HRS SOONER", 98, M)],
};
const ids = process.argv[2] ? process.argv[2].split(",") : Object.keys(jobs);
const tmp = path.join(os.tmpdir(), "t02-002-thumbv2.json");
for (const id of ids) {
  const [name, lines] = jobs[id]; const vertical = id.startsWith("s");
  fs.writeFileSync(tmp, JSON.stringify({ trackId: "T02", vertical, lines, stage: { engine: "r3", module, scene: id } }));
  execFileSync("npx", ["remotion", "still", "src/index.ts", vertical ? "ThumbnailShort" : "Thumbnail", path.join(out, `${name}.png`), `--props=${tmp}`, `--public-dir=${path.join(root, "produksi")}`, "--frame=89", "--gl=angle"], { cwd: path.join(root, "produksi/remotion"), stdio: ["ignore", "ignore", "inherit"] });
  console.log("ok", name);
}
