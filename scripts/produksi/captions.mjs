// ElevenLabs STT per scene (timestamp kata) -> captions JSON. Waktu relatif ke awal scene.
import fs from "node:fs"; import path from "node:path";
import { ROOT, args, resolveCycle, readJson, writeJson, need } from "./lib.mjs";
const o = args(); const lang = o.lang || "en"; const { scriptPath } = resolveCycle(o.track, o.siklus);
const key = need("ELEVENLABS_API_KEY"); const script = readJson(scriptPath);
const out = {};
// Samakan ejaan caption dengan naskah (istilah, angka, kode) bila kata berbeda; waktu dibagi proporsional dalam rentang scene.
const normW = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean).join(" ");
function alignToScript(caps, scr, lg) { for (const s of scr.scenes) { const w = caps[s.id]; if (!w?.length) continue; if (normW(w.map((x) => x.text).join(" ")) === normW(s.narration[lg])) continue;
  const a = w[0].startMs, b = w[w.length - 1].endMs, toks = s.narration[lg].split(/\s+/), tot = toks.reduce((n, x) => n + x.length + 1, 0); let pos = a;
  caps[s.id] = toks.map((x) => { const d = Math.round(((b - a) * (x.length + 1)) / tot); const r = { text: x, startMs: pos, endMs: Math.min(b, pos + d) }; pos += d; return r; }); } }
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
writeJson(dest.replace(/\.json$/, ".raw.json"), out); // hasil STT apa adanya (dipakai QA untuk cek salah ucap)
alignToScript(out, script, lang); writeJson(dest, out); console.log("Ditulis", dest, "- periksa istilah teknis lalu perbaiki manual.");
