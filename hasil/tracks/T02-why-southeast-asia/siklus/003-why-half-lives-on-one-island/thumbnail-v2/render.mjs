// Render opsi thumbnail ke produksi/render/T02/003/thumbnail-v2/ (thumbnail yang sudah tayang tidak ditimpa).
// Jalankan dari root repo: node hasil/tracks/T02-why-southeast-asia/siklus/003-why-half-lives-on-one-island/thumbnail-v2/render.mjs [id,id]
import fs from "node:fs"; import path from "node:path"; import os from "node:os"; import { execFileSync } from "node:child_process"; import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url)); const root = path.resolve(here, "../../../../../..");
const module = path.relative(root, path.join(here, "04-shots.tsx")).split(path.sep).join("/");
const out = path.join(root, "produksi/render/T02/003/thumbnail-v2"); fs.mkdirSync(out, { recursive: true });
const W = "#ffffff", Y = "#ffd23f", M = "#7dffd0";
const L = (a, as, ac, b, bs, bc) => [{ text: a, size: as, color: ac }, { text: b, size: bs, color: bc }];
const jobs = {
  m1: ["Master-1", L("158 MILLION", 164, Y, "ON 1 ISLAND?!", 128, W)],
  m2: ["Master-2", L("WHY LIVE", 180, W, "HERE?!", 210, Y)],
  m3: ["Master-3", L("MOVED 9M", 180, Y, "STILL FULL?!", 136, W)],
  m4: ["Master-4", L("MAGIC", 200, Y, "SOIL?", 200, W)],
  s1a: ["Short1-A", L("MOVED 9M", 140, W, "GREW 95M", 140, Y)],
  s1b: ["Short1-B", L("BOATS", 200, Y, "LOST?!", 200, W)],
  s1c: ["Short1-C", L("STILL", 200, W, "FULL?!", 210, Y)],
  s2a: ["Short2-A", L("158 MILLION", 118, Y, "1 ISLAND", 160, W)],
  s2b: ["Short2-B", L("MORE THAN", 126, W, "RUSSIA?!", 160, Y)],
  s2c: ["Short2-C", L("35 ACTIVE", 140, Y, "VOLCANOES", 120, W)],
};
const ids = process.argv[2] ? process.argv[2].split(",") : Object.keys(jobs);
const tmp = path.join(os.tmpdir(), "t02-003-thumbv2.json");
for (const id of ids) {
  const [name, lines] = jobs[id]; const vertical = id.startsWith("s");
  fs.writeFileSync(tmp, JSON.stringify({ trackId: "T02", vertical, lines, stage: { engine: "r3", module, scene: id } }));
  execFileSync("npx", ["remotion", "still", "src/index.ts", vertical ? "ThumbnailShort" : "Thumbnail", path.join(out, `${name}.png`), `--props=${tmp}`, `--public-dir=${path.join(root, "produksi")}`, "--frame=89", "--gl=angle"], { cwd: path.join(root, "produksi/remotion"), stdio: ["ignore", "ignore", "inherit"] });
  console.log("ok", name);
}
