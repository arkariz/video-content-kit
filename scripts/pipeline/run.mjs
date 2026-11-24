// Penggerak produksi satu siklus. Pemakaian: node --env-file=.env scripts/pipeline/run.mjs --track T01 --siklus 001 [--from tahap] [--only tahap] [--dry]
// Tiap tahap idempotent dan bisa dilanjutkan. Tahap LLM butuh CLI `claude` atau agen di sesi Claude Code (kode keluar 3).
import fs from "node:fs"; import path from "node:path"; import { spawnSync } from "node:child_process";
import { ROOT, args, resolveCycle, readJson, writeJson } from "../produksi/lib.mjs"; import { runPrompt } from "./llm.mjs";
const o = args(); const { dir, cycleId } = resolveCycle(o.track, o.siklus); const trackdir = path.basename(path.dirname(path.dirname(dir)));
const E = (f) => fs.existsSync(path.join(dir, f)); const node = (s, extra = []) => spawnSync("node", ["--env-file=.env", `scripts/${s}`, "--track", o.track, "--siklus", o.siklus, ...extra], { cwd: ROOT, stdio: "inherit" }).status;
const script = () => readJson(path.join(dir, "03-script.json"), { scenes: [] });
const allDur = () => script().scenes.length > 0 && script().scenes.every((s) => s.duration_ms?.en);
const stages = [
  { id: "riset-brief", llm: "riset-brief", done: () => E("01-riset-viral.md") && E("02-brief.md") },
  { id: "naskah", llm: "naskah", done: () => E("03-script.json") && E("03-naskah.md") },
  { id: "visual", llm: "visual", build: () => script().scenes.length > 0 && script().scenes.every((s) => s.stage), done: () => E("04-visual-spec.json") && E("04-stage.base.json") && E("04-broll-plan.json") && fs.statSync(path.join(dir, "04-visual-spec.json")).mtimeMs >= fs.statSync(path.join(dir, "03-script.json")).mtimeMs },
  { id: "kontrak", done: () => false, run: () => node("produksi/build-visual.mjs", ["--check"]) },
  { id: "tts-en", done: allDur, run: () => node("produksi/tts.mjs", ["--lang", "en"]) },
  { id: "caption-en", done: () => fs.existsSync(path.join(ROOT, "produksi/captions", o.track, o.siklus, "en.json")), run: () => node("produksi/captions.mjs", ["--lang", "en"]) },
  { id: "footage", done: () => readJson(path.join(dir, "04-assets.json"), { footage: [] }).footage.length > 0, run: () => node("produksi/footage.mjs", ["plan"]) || node("produksi/footage.mjs", ["download"]) },
  { id: "adegan", done: () => E("04-stage.json"), run: () => node("produksi/apply-footage.mjs") },
  { id: "render", done: () => fs.existsSync(path.join(ROOT, "produksi/render", o.track, o.siklus, "Master16x9-en.mp4")), run: () => { let st = node("produksi/render.mjs", ["--comp", "Master16x9", "--lang", "en"]); for (const c of script().shorts_cuts || []) st = st || node("produksi/render.mjs", ["--comp", "Short9x16", "--lang", "en", "--cut", c.name]); return st; } },
  { id: "qa", done: () => false, run: () => spawnSync("node", ["scripts/pipeline/qa.mjs", "--track", o.track, "--siklus", o.siklus], { cwd: ROOT, stdio: "inherit" }).status },
  { id: "publish-plan", done: () => E("06-publish.json"), run: () => spawnSync("node", ["scripts/pipeline/publish.mjs", "plan", "--track", o.track, "--siklus", o.siklus], { cwd: ROOT, stdio: "inherit" }).status },
  { id: "paket-review", done: () => false, run: () => spawnSync("node", ["scripts/pipeline/review.mjs", "--track", o.track, "--siklus", o.siklus], { cwd: ROOT, stdio: "inherit" }).status },
];
const state = readJson(path.join(dir, ".pipeline.json"), { log: [] });
console.log(`Pipeline ${o.track}/${cycleId}`);
if (o.dry) { for (const s of stages) console.log(`${s.done() ? "SELESAI" : "BELUM  "} ${s.id}${s.llm ? " (LLM)" : ""}`); process.exit(0); }
let started = !o.from;
for (const s of stages) {
  if (o.only && s.id !== o.only) continue; if (!started) { if (s.id === o.from) started = true; else continue; }
  if (s.done() && s.id !== o.only && !["qa", "paket-review"].includes(s.id)) { console.log(`✓ ${s.id}`); continue; }
  console.log(`▶ ${s.id}`); const t0 = Date.now();
  const code = s.build?.() ? node("produksi/build-visual.mjs") : s.llm ? runPrompt(s.llm, { track: o.track, siklus: o.siklus, trackdir }) : s.run();
  state.log.push({ tahap: s.id, kode: code, detik: Math.round((Date.now() - t0) / 1000), waktu: new Date().toISOString() }); writeJson(path.join(dir, ".pipeline.json"), state);
  if (s.id === "qa" && code === 2) { console.log("■ QA GAGAL: berhenti (gate wajib). Lihat 05-qa.auto.md."); process.exit(2); }
  if (code === 3) { console.log(`■ ${s.id} butuh agen LLM. Jalankan "lanjut ${o.track}" di sesi Claude Code, lalu ulangi.`); process.exit(3); }
  if (code) { console.log(`■ ${s.id} gagal (kode ${code})`); process.exit(1); }
}
console.log("Selesai sampai batas otomatis. Menunggu review kreator.");
