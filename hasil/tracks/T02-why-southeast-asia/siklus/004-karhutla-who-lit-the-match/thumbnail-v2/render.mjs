// Render opsi thumbnail ke produksi/render/T02/004/thumbnail-v2/ (thumbnail yang sudah tayang tidak ditimpa).
// Jalankan dari root repo: node hasil/tracks/T02-why-southeast-asia/siklus/004-karhutla-who-lit-the-match/thumbnail-v2/render.mjs [id,id]
import fs from "node:fs"; import path from "node:path"; import os from "node:os"; import { execFileSync } from "node:child_process"; import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url)); const root = path.resolve(here, "../../../../../..");
const module = path.relative(root, path.join(here, "04-shots.tsx")).split(path.sep).join("/");
const out = path.join(root, "produksi/render/T02/004/thumbnail-v2"); fs.mkdirSync(out, { recursive: true });
const W = "#ffffff", Y = "#ffd23f", M = "#7dffd0";
const L = (a, as, ac, b, bs, bc) => [{ text: a, size: as, color: ac }, { text: b, size: bs, color: bc }];
const jobs = {
  m1: ["Master-1", L("MONTHS", 220, W, "ON FIRE", 210, Y)],
  m2: ["Master-2", L("BREATHING", 170, Y, "SMOKE", 210, W)],
  m3: ["Master-3", L("NEARLY A", 180, W, "BELGIUM", 200, Y)],
  m4: ["Master-4", L("WHO LIT", 190, Y, "THIS?", 210, W)],
  s1a: ["Short1-A", L("FIRE", 200, W, "UNDERGROUND", 90, Y)],
  s1b: ["Short1-B", L("UP TO 13X", 140, Y, "MORE FIRE", 130, W)],
  s1c: ["Short1-C", L("SOIL ON", 160, W, "FIRE?!", 210, Y)],
  s2a: ["Short2-A", L("FINES", 200, W, "UNPAID", 180, Y)],
  s2b: ["Short2-B", L("WHERE'S THE", 106, W, "MONEY?", 170, Y)],
  s2c: ["Short2-C", L("8 OF 10", 180, Y, "NO PENALTY", 112, W)],
};
const ids = process.argv[2] ? process.argv[2].split(",") : Object.keys(jobs);
const tmp = path.join(os.tmpdir(), "t02-004-thumbv2.json");
for (const id of ids) {
  const [name, lines] = jobs[id]; const vertical = id.startsWith("s");
  fs.writeFileSync(tmp, JSON.stringify({ trackId: "T02", vertical, lines, stage: { engine: "r3", module, scene: id } }));
  execFileSync("npx", ["remotion", "still", "src/index.ts", vertical ? "ThumbnailShort" : "Thumbnail", path.join(out, `${name}.png`), `--props=${tmp}`, `--public-dir=${path.join(root, "produksi")}`, "--frame=89", "--gl=angle"], { cwd: path.join(root, "produksi/remotion"), stdio: ["ignore", "ignore", "inherit"] });
  console.log("ok", name);
}
