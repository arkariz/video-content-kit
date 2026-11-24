// Gabungkan script.json + durasi + captions + assets -> props, lalu render komposisi. Satu render per waktu.
import path from "node:path"; import fs from "node:fs"; import { execFileSync } from "node:child_process";
import { ROOT, args, resolveCycle, readJson, writeJson } from "./lib.mjs";
const o = args(); const lang = o.lang || "en"; const comp = o.comp || "Master16x9"; const cut = o.cut; // --cut A1-zero-dollars-moved
const { scriptPath, assetsPath } = resolveCycle(o.track, o.siklus); const script = readJson(scriptPath);
const specs = readJson(path.join(path.dirname(scriptPath), "04-visual-spec.json"), {});
const stages = readJson(path.join(path.dirname(scriptPath), "04-stage.json"), {});
const caps = readJson(path.join(ROOT, "produksi/captions", o.track, o.siklus, `${lang}.json`), {}); const assets = readJson(assetsPath, { footage: [], renders: [] });
const FPS = 30; const PAUSE = Math.round(parseFloat(o.pause ?? "0.9") * FPS); // jeda akhir scene (detik)
const cutDef = cut && script.shorts_cuts.find((c) => c.name === cut);
const ids = o.still ? o.still.split(",") : cutDef ? cutDef.scene_ids : script.scenes.map((s) => s.id);
const scenes = ids.map((id) => { const s = script.scenes.find((x) => x.id === id); const ms = s.duration_ms?.[lang]; if (!ms) throw new Error(`${id}: belum ada duration_ms (${lang}); jalankan tts.mjs`);
  const f = assets.footage.find((x) => x.scene_id === id);
  return { id, type: s.visual.type, text: s.visual.on_screen_text || "", description: s.visual.description, audio: `audio/${o.track}/${o.siklus}/${lang}/${id}.mp3`, spec: specs[id], stage: stages[id], audioFrames: Math.ceil((ms / 1000) * FPS), durationFrames: Math.ceil((ms / 1000) * FPS) + PAUSE, clip: f?.file, captions: caps[id] || [] }; });
const props = { trackId: o.track, lang, scenes, vertical: comp !== "Master16x9" };
const tmp = path.join(ROOT, "produksi/render", `.props-${o.track}-${o.siklus}.json`); writeJson(tmp, props);
const outRel = `render/${o.track}/${o.siklus}/${comp}${cut ? "-" + cut : ""}-${lang}.mp4`; fs.mkdirSync(path.dirname(path.join(ROOT, "produksi", outRel)), { recursive: true });
if (o.still) { for (const id of ids) { const one = { ...props, scenes: props.scenes.filter((s) => s.id === id) }; writeJson(tmp, one); const out = path.join(ROOT, "produksi/render", o.track, o.siklus, "stills", `${id}-${comp}.png`); fs.mkdirSync(path.dirname(out), { recursive: true }); execFileSync("npx", ["remotion", "still", "src/index.ts", comp, out, `--props=${tmp}`, `--public-dir=${path.join(ROOT, "produksi")}`, `--frame=${Math.max(1, one.scenes[0].audioFrames - 8)}`], { cwd: path.join(ROOT, "produksi/remotion"), stdio: "inherit" }); console.log("still", out); } process.exit(0); }
execFileSync("npx", ["remotion", "render", "src/index.ts", comp, path.join(ROOT, "produksi", outRel), `--props=${tmp}`, `--public-dir=${path.join(ROOT, "produksi")}`, "--concurrency=50%"], { cwd: path.join(ROOT, "produksi/remotion"), stdio: "inherit" });
assets.renders = [...assets.renders.filter((r) => r.file !== outRel), { file: outRel, comp, lang, cut: cut || null }]; writeJson(assetsPath, assets);
