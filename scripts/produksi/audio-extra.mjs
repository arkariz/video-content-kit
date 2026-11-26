// Musik latar dan efek suara ElevenLabs untuk satu siklus, dari 04-audio.json. Idempotent: file yang sudah ada dilewati.
// Pemakaian: node --env-file=.env scripts/produksi/audio-extra.mjs --track T01 --siklus 004
import fs from "node:fs"; import path from "node:path";
import { ROOT, args, resolveCycle, readJson, need, pLimit } from "./lib.mjs";
const o = args(); const { dir } = resolveCycle(o.track, o.siklus); const spec = readJson(path.join(dir, "04-audio.json"));
const key = need("ELEVENLABS_API_KEY");
const outDir = path.join(ROOT, "produksi/audio", o.track, o.siklus, "extra"); fs.mkdirSync(outDir, { recursive: true });
async function make(name, url, body) {
  const f = path.join(outDir, `${name}.mp3`); if (fs.existsSync(f)) return console.log("ada", name);
  const r = await fetch(url, { method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`${name}: ${r.status} ${await r.text()}`);
  fs.writeFileSync(f, Buffer.from(await r.arrayBuffer())); console.log("dibuat", name);
}
const limit = pLimit(2);
// --only sfx|music untuk menjalankan salah satu
if (o.only !== "music") await Promise.all(Object.entries(spec.sfx).map(([name, x]) => limit(() => make(name, "https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", { text: x.prompt, duration_seconds: x.seconds, prompt_influence: 0.45 }))));
if (o.only !== "sfx") await make("music", "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128", { prompt: spec.music.prompt, music_length_ms: spec.music.length_ms, model_id: "music_v1", force_instrumental: true });
