// Perbaikan otomatis untuk temuan QA yang bisa dipastikan secara mekanis (maks. 1 putaran per temuan).
// A2 (dugaan salah ucap): buang say_as istilah itu, buat ulang audio scene terkait, transkrip ulang, QA ulang.
import fs from "node:fs"; import path from "node:path"; import { spawnSync } from "node:child_process";
import { ROOT, args, resolveCycle, readJson, writeJson } from "../produksi/lib.mjs";
const o = args(); const { dir, scriptPath } = resolveCycle(o.track, o.siklus); const qa = readJson(path.join(dir, "05-qa.auto.json"), null);
if (!qa) { console.log("jalankan QA dulu"); process.exit(1); }
const a2 = qa.temuan.filter((f) => f.id === "A2"); if (!a2.length) { console.log("tidak ada temuan yang bisa diperbaiki otomatis"); process.exit(0); }
const script = readJson(scriptPath); const terms = new Set(a2.map((f) => f.msg.match(/"(.+?)"/)[1].toLowerCase())); const scenes = new Set(a2.map((f) => f.msg.split(":")[0]));
const state = readJson(path.join(dir, ".pipeline.json"), { log: [] }); if (state.log.some((l) => l.tahap === "autofix-A2")) { console.log("A2 sudah pernah diperbaiki otomatis sekali; butuh pendengaran manusia"); process.exit(2); }
script.pronunciations = (script.pronunciations || []).filter((p) => !terms.has(p.term.toLowerCase())); writeJson(scriptPath, script);
for (const s of scenes) { const f = path.join(ROOT, "produksi/audio", o.track, o.siklus, "en", `${s}.mp3`); if (fs.existsSync(f)) fs.unlinkSync(f); }
const run = (s, x = []) => spawnSync("node", ["--env-file=.env", `scripts/${s}`, "--track", o.track, "--siklus", o.siklus, ...x], { cwd: ROOT, stdio: "inherit" }).status;
let st = run("produksi/tts.mjs", ["--lang", "en"]) || run("produksi/captions.mjs", ["--lang", "en"]);
state.log.push({ tahap: "autofix-A2", istilah: [...terms], scene: [...scenes], kode: st, waktu: new Date().toISOString() }); writeJson(path.join(dir, ".pipeline.json"), state);
console.log(st ? "autofix gagal" : `A2 diperbaiki: say_as dibuang untuk ${[...terms].join(", ")}; audio ${[...scenes].join(", ")} dibuat ulang`); process.exit(st ? 1 : 0);
