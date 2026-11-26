// Gambar diam semua shot sekaligus (satu kali bundle) + lembar kontak, untuk pemeriksaan cepat.
// Pemakaian: node scripts/produksi/render.mjs --track T02 --siklus 002 --props-only
//            node produksi/remotion/stills-batch.mjs T02 002 <folder-keluar> [s01,s02] [--vertical]
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
import { bundle } from "@remotion/bundler"; import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
const here = import.meta.dirname, ROOT = path.resolve(here, "../..");
const [track, siklus, out, only] = process.argv.slice(2).filter((x) => !x.startsWith("--"));
const vertical = process.argv.includes("--vertical"); const comp = vertical ? "Short9x16" : "Master16x9";
const props = JSON.parse(fs.readFileSync(path.join(ROOT, `produksi/render/.props-${track}-${siklus}.json`), "utf8"));
fs.mkdirSync(out, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.join(here, "src/index.ts"), publicDir: path.join(ROOT, "produksi"), webpackOverride: (c) => ({ ...c, resolve: { ...c.resolve, alias: { ...c.resolve?.alias, "@r3": path.join(here, "src/r3") }, modules: [...(c.resolve?.modules ?? ["node_modules"]), path.join(here, "node_modules")] } }) });
const chromiumOptions = { gl: "angle" }; const browser = await openBrowser("chrome", { chromiumOptions });
const files = [];
for (const sc of props.scenes.filter((s) => !only || only.split(",").includes(s.id))) {
  const one = { ...props, vertical, scenes: [sc] };
  const composition = await selectComposition({ serveUrl, id: comp, inputProps: one, puppeteerInstance: browser, chromiumOptions });
  for (const [i, x] of (sc.r3?.shots ?? []).entries()) {
    const at = x.startMs + Math.min(x.endMs - x.startMs - 300, Math.max(1700, ...(x.labels || []).map((l) => l.atMs - x.startMs + 500)));
    const f = path.join(out, `${sc.id}-${i + 1}.jpg`);
    try { await renderStill({ serveUrl, composition, inputProps: one, output: f, frame: Math.min(sc.durationFrames - 1, Math.max(0, Math.round((at / 1000) * 30))), imageFormat: "jpeg", jpegQuality: 80, puppeteerInstance: browser, chromiumOptions, scale: 0.5 }); files.push(f); }
    catch (e) { console.log("GAGAL", sc.id, i + 1, String(e.message).slice(0, 300)); }
  }
  console.log(sc.id);
}
await browser.close({ silent: true });
// lembar kontak 4x4
const [w, h] = vertical ? [270, 480] : [480, 270];
for (let p = 0, n = 1; p < files.length; p += 16, n++) {
  const g = files.slice(p, p + 16); const inputs = g.flatMap((f) => ["-i", f]);
  const flt = g.map((f, i) => `[${i}:v]scale=${w}:${h}[v${i}]`);
  const layout = g.map((_, i) => `${(i % 4) * (w + 4)}_${Math.floor(i / 4) * (h + 4)}`).join("|");
  const graph = g.length === 1 ? flt[0].replace(/\[v0\]$/, "[o]") : `${flt.join(";")};${g.map((_, i) => `[v${i}]`).join("")}xstack=inputs=${g.length}:layout=${layout}:fill=black[o]`;
  execFileSync("ffmpeg", ["-v", "error", "-y", ...inputs, "-filter_complex", graph, "-map", "[o]", "-frames:v", "1", "-q:v", "4", path.join(out, `lembar-${n}.jpg`)]);
  console.log(`lembar-${n}:`, g.map((f) => path.basename(f, ".jpg")).join(" "));
}
console.log("selesai", files.length);
