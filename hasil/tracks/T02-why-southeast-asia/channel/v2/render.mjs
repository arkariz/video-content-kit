// Render foto profil (1080x1080) dan banner YouTube (2560x1440) ke folder ini.
// Jalankan dari root repo: node hasil/tracks/T02-why-southeast-asia/channel/v2/render.mjs [id,id]
import fs from "node:fs"; import path from "node:path"; import os from "node:os"; import { execFileSync } from "node:child_process"; import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url)); const root = path.resolve(here, "../../../../..");
const module = path.relative(root, path.join(here, "04-shots.tsx")).split(path.sep).join("/");
const jobs = { p1: "profil-A-komo-cincin", p2: "profil-B-komo-globe", p3: "profil-C-tanda", b1: "banner-A", b2: "banner-B" };
const ids = process.argv[2] ? process.argv[2].split(",") : Object.keys(jobs);
const tmp = path.join(os.tmpdir(), "t02-channel-v2.json");
for (const id of ids) {
  const vertical = id.startsWith("p"); const file = path.join(here, `${jobs[id]}.png`);
  fs.writeFileSync(tmp, JSON.stringify({ trackId: "T02", vertical, lines: [], stage: { engine: "r3", module, scene: id } }));
  execFileSync("npx", ["remotion", "still", "src/index.ts", vertical ? "ThumbnailShort" : "Thumbnail", file, `--props=${tmp}`, `--public-dir=${path.join(root, "produksi")}`, "--frame=89", "--gl=angle", ...(vertical ? [] : ["--scale=2"])], { cwd: path.join(root, "produksi/remotion"), stdio: ["ignore", "ignore", "inherit"] });
  if (vertical) execFileSync("sips", ["-c", "1080", "1080", file], { stdio: "ignore" });
  console.log("ok", jobs[id]);
}
