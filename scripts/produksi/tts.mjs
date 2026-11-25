// ElevenLabs TTS per scene. Lanjut dari scene yang belum ada (idempotent). Concurrency 2.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
import { ROOT, args, resolveCycle, readJson, writeJson, need, pLimit } from "./lib.mjs";
const o = args(); const lang = o.lang || "en"; const { scriptPath } = resolveCycle(o.track, o.siklus);
const key = need("ELEVENLABS_API_KEY");
// suara per bahasa: produksi/voices.json (track, lalu default); hanya EN yang boleh jatuh ke ELEVENLABS_VOICE_ID
const voices = readJson(path.join(ROOT, "produksi/voices.json"), {});
const voice = voices[o.track]?.[lang] ?? voices.default?.[lang] ?? (lang === "en" ? need("ELEVENLABS_VOICE_ID") : null);
if (!voice) throw new Error(`belum ada voice untuk bahasa "${lang}" di produksi/voices.json`);
const script = readJson(scriptPath); const outDir = path.join(ROOT, "produksi/audio", o.track, o.siklus, lang);
fs.mkdirSync(outDir, { recursive: true });
const say = (t) => (lang !== "en" ? t : (script.pronunciations || []).reduce((s, p) => s.split(p.term).join(p.say_as), t)); // ejaan fonetik ditulis untuk EN
const only = o.scenes ? o.scenes.split(",") : null; // contoh: --scenes s01,s02 untuk sampel
const limit = pLimit(2);
await Promise.all(script.scenes.filter((s) => !only || only.includes(s.id)).map((s) => limit(async () => {
  const f = path.join(outDir, `${s.id}.mp3`);
  if (!fs.existsSync(f)) {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
      method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ text: say(s.narration[lang]), model_id: "eleven_multilingual_v2" }) });
    if (!r.ok) throw new Error(`${s.id}: ${r.status} ${await r.text()}`);
    fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
  }
  const sec = parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());
  s.duration_ms = { ...(s.duration_ms || {}), [lang]: Math.round(sec * 1000) };
  console.log(s.id, s.duration_ms[lang], "ms");
})));
writeJson(scriptPath, script);
const total = script.scenes.reduce((a, s) => a + (s.duration_ms?.[lang] || 0), 0);
console.log(`Total ${lang}: ${(total / 60000).toFixed(2)} menit`);
