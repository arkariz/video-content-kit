// ElevenLabs STT per scene (timestamp kata) -> captions JSON. Waktu relatif ke awal scene.
import fs from "node:fs"; import path from "node:path";
import { ROOT, args, resolveCycle, readJson, writeJson, need } from "./lib.mjs";
const o = args(); const lang = o.lang || "en"; const { scriptPath } = resolveCycle(o.track, o.siklus);
const key = need("ELEVENLABS_API_KEY"); const script = readJson(scriptPath);
const out = {};
for (const s of script.scenes) {
  const f = path.join(ROOT, "produksi/audio", o.track, o.siklus, lang, `${s.id}.mp3`);
  if (!fs.existsSync(f)) { console.warn("lewati (tanpa audio):", s.id); continue; }
  const fd = new FormData();
  fd.append("model_id", "scribe_v1"); fd.append("timestamps_granularity", "word"); fd.append("language_code", lang === "id" ? "ind" : "eng");
  fd.append("file", new Blob([fs.readFileSync(f)], { type: "audio/mpeg" }), `${s.id}.mp3`);
  const r = await fetch("https://api.elevenlabs.io/v1/speech-to-text", { method: "POST", headers: { "xi-api-key": key }, body: fd });
  if (!r.ok) throw new Error(`${s.id}: ${r.status} ${await r.text()}`);
  const j = await r.json();
  out[s.id] = (j.words || []).filter((w) => w.type === "word").map((w) => ({ text: w.text, startMs: Math.round(w.start * 1000), endMs: Math.round(w.end * 1000) }));
}
const dest = path.join(ROOT, "produksi/captions", o.track, o.siklus, `${lang}.json`);
writeJson(dest, out); console.log("Ditulis", dest, "- periksa istilah teknis lalu perbaiki manual.");
