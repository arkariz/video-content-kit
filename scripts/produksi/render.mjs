// Gabungkan script.json + durasi + captions + assets -> props, lalu render komposisi. Satu render per waktu.
import path from "node:path"; import fs from "node:fs"; import { execFileSync } from "node:child_process";
import { ROOT, args, resolveCycle, readJson, writeJson } from "./lib.mjs";
const o = args(); const lang = o.lang || "en"; const comp = o.comp || "Master16x9"; const cut = o.cut; // --cut A1-zero-dollars-moved
const { scriptPath, assetsPath } = resolveCycle(o.track, o.siklus); const script = readJson(scriptPath);
const caps = readJson(path.join(ROOT, "produksi/captions", o.track, o.siklus, `${lang}.json`), {}); const assets = readJson(assetsPath, { footage: [], renders: [] });
const FPS = 30; const cutDef = cut && script.shorts_cuts.find((c) => c.name === cut);
const ids = cutDef ? cutDef.scene_ids : script.scenes.map((s) => s.id);
const scenes = ids.map((id) => { const s = script.scenes.find((x) => x.id === id); const ms = s.duration_ms?.[lang]; if (!ms) throw new Error(`${id}: belum ada duration_ms (${lang}); jalankan tts.mjs`);
  const f = assets.footage.find((x) => x.scene_id === id);
  return { id, type: s.visual.type, text: s.visual.on_screen_text || "", description: s.visual.description, audio: `audio/${o.track}/${o.siklus}/${lang}/${id}.mp3`, durationFrames: Math.ceil((ms / 1000) * FPS) + 6, clip: f?.file, captions: caps[id] || [] }; });
const props = { trackId: o.track, lang, scenes, vertical: comp !== "Master16x9" };
const tmp = path.join(ROOT, "produksi/render", `.props-${o.track}-${o.siklus}.json`); writeJson(tmp, props);
const outRel = `render/${o.track}/${o.siklus}/${comp}${cut ? "-" + cut : ""}-${lang}.mp4`; fs.mkdirSync(path.dirname(path.join(ROOT, "produksi", outRel)), { recursive: true });
execFileSync("npx", ["remotion", "render", "src/index.ts", comp, path.join(ROOT, "produksi", outRel), `--props=${tmp}`, `--public-dir=${path.join(ROOT, "produksi")}`, "--concurrency=50%"], { cwd: path.join(ROOT, "produksi/remotion"), stdio: "inherit" });
assets.renders = [...assets.renders.filter((r) => r.file !== outRel), { file: outRel, comp, lang, cut: cut || null }]; writeJson(assetsPath, assets);
