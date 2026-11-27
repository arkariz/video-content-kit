// Render opsi thumbnail ke produksi/render/T01/004/thumbnail-v2/ (thumbnail yang sudah tayang tidak ditimpa).
// Jalankan dari root repo: node hasil/tracks/T01-plumbing-of-money/siklus/004-gta6-who-got-paid/thumbnail-v2/render.mjs [id,id]
import fs from "node:fs"; import path from "node:path"; import os from "node:os"; import { execFileSync } from "node:child_process"; import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url)); const root = path.resolve(here, "../../../../../..");
const module = path.relative(root, path.join(here, "04-shots.tsx")).split(path.sep).join("/");
const out = path.join(root, "produksi/render/T01/004/thumbnail-v2"); fs.mkdirSync(out, { recursive: true });
const W = "#ffffff", Y = "#ffd23f", M = "#7dffd0";
const L = (a, as, ac, b, bs, bc) => [{ text: a, size: as, color: ac }, { text: b, size: bs, color: bc }];
const jobs = {
  m1: ["Master-1", L("GTA VI", 220, Y, "$80 → WHO?", 124, W)],
  m2: ["Master-2", L("GTA VI", 220, W, "$80 SPLIT", 134, Y)],
  m3: ["Master-3", L("GTA VI", 220, W, "$3.79B → ?", 156, Y)],
  m4: ["Master-4", L("GTA VI", 220, Y, "PAID LATER", 130, W)],
  s1a: ["Short1-A", L("GTA VI", 230, Y, "$80 → $56", 150, W)],
  s1b: ["Short1-B", L("GTA VI", 230, W, "NOT TONIGHT", 118, Y)],
  s1c: ["Short1-C", L("GTA VI", 230, Y, "THEY GET $56", 112, W)],
  s2a: ["Short2-A", L("GTA VI", 230, W, "WHO PAYS?", 134, Y)],
  s2b: ["Short2-B", L("GTA VI", 230, Y, "NOT ROCKSTAR", 104, W)],
  s2c: ["Short2-C", L("GTA VI", 230, W, "STORE TAKES $24", 92, M)],
};
const ids = process.argv[2] ? process.argv[2].split(",") : Object.keys(jobs);
const tmp = path.join(os.tmpdir(), "t01-004-thumbv2.json");
for (const id of ids) {
  const [name, lines] = jobs[id]; const vertical = id.startsWith("s");
  fs.writeFileSync(tmp, JSON.stringify({ trackId: "T01", vertical, lines, stage: { engine: "r3", module, scene: id } }));
  execFileSync("npx", ["remotion", "still", "src/index.ts", vertical ? "ThumbnailShort" : "Thumbnail", path.join(out, `${name}.png`), `--props=${tmp}`, `--public-dir=${path.join(root, "produksi")}`, "--frame=89", "--gl=angle"], { cwd: path.join(root, "produksi/remotion"), stdio: ["ignore", "ignore", "inherit"] });
  console.log("ok", name);
}
