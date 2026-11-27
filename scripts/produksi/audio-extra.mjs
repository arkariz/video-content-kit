// Musik latar dan efek suara ElevenLabs. Idempotent: file yang sudah ada dilewati.
// Pemakaian: node --env-file=.env scripts/produksi/audio-extra.mjs --library              (pustaka bersama produksi/sfx/el.json)
//            node --env-file=.env scripts/produksi/audio-extra.mjs --track T01 --siklus 004 (musik dan efek khusus siklus dari 04-audio.json)
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
import { ROOT, args, resolveCycle, readJson, need } from "./lib.mjs";
const library = process.argv.includes("--library"); const o = library ? { library } : args(); const key = need("ELEVENLABS_API_KEY");
const spec = o.library ? readJson(path.join(ROOT, "produksi/sfx/el.json")) : readJson(path.join(resolveCycle(o.track, o.siklus).dir, "04-audio.json"));
const outDir = o.library ? path.join(ROOT, "produksi/sfx/el") : path.join(ROOT, "produksi/audio", o.track, o.siklus, "extra"); fs.mkdirSync(outDir, { recursive: true });
// efek: buang hening di awal (agar tepat di katanya) dan samakan puncak ke -3 dBFS
function rapikan(f, loop) {
  const probe = execFileSync("sh", ["-c", 'ffmpeg -nostats -i "$1" -af volumedetect -f null - 2>&1', "sh", f]).toString();
  const gain = -3 - parseFloat(probe.match(/max_volume:\s+(-?[\d.]+)/)?.[1] ?? "-3"); const tmp = f.replace(/\.mp3$/, ".tmp.mp3");
  const af = [...(loop ? [] : ["silenceremove=start_periods=1:start_threshold=-45dB"]), `volume=${gain.toFixed(2)}dB`].join(",");
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", f, "-af", af, "-c:a", "libmp3lame", "-b:a", "192k", tmp]); fs.renameSync(tmp, f);
}
async function make(name, url, body, after) {
  const f = path.join(outDir, `${name}.mp3`); if (fs.existsSync(f)) return console.log("ada", name);
  const r = await fetch(url, { method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`${name}: ${r.status} ${await r.text()}`);
  fs.writeFileSync(f, Buffer.from(await r.arrayBuffer())); after?.(f); console.log("dibuat", name);
}
// berurutan menurut prioritas di spec: bila kredit habis, efek yang lebih penting sudah jadi
// --only sfx|music untuk menjalankan salah satu
if (o.only !== "music") for (const [name, x] of Object.entries(spec.sfx ?? {})) await make(name, "https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", { text: x.prompt, duration_seconds: x.seconds, prompt_influence: 0.45, model_id: "eleven_text_to_sound_v2", ...(x.loop ? { loop: true } : {}) }, (f) => rapikan(f, x.loop));
if (o.only !== "sfx" && spec.music) await make("music", "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128", { prompt: spec.music.prompt, music_length_ms: spec.music.length_ms, model_id: "music_v1", force_instrumental: true });
