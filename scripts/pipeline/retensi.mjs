// Analitik retensi: baca ekspor "Audience retention" YouTube Studio dengan retention.py (youtube-agent-skill, MIT,
// scripts/vendor/), memakai caption per kata kita sebagai transkrip supaya tiap titik jatuh disertai kalimat yang sedang diucapkan.
//   node scripts/pipeline/retensi.mjs --track T02 --siklus 004 --csv ~/Downloads/retention.csv [--lang en] [--cut S1-nama]
// Hasil: hasil/tracks/<track>/analitik/retensi-<siklus>[-<cut>]-<tanggal>.md (laporan + JSON mentah).
import fs from "node:fs"; import path from "node:path"; import { spawnSync } from "node:child_process";
import { ROOT, args, readJson, resolveCycle } from "../produksi/lib.mjs"; import { sceneStarts } from "./kemasan.mjs";

const o = args(); if (!o.csv) throw new Error("Wajib: --csv <ekspor Audience retention dari YouTube Studio>");
const lang = o.lang || "en"; const { dir, scriptPath } = resolveCycle(o.track, o.siklus); const script = readJson(scriptPath);
const caps = readJson(path.join(ROOT, "produksi/captions", o.track, o.siklus, `${lang}.json`), null);
if (!caps) throw new Error("caption belum ada; jalankan captions.mjs");
const cut = o.cut ? script.shorts_cuts.find((c) => c.name === o.cut) : null;
const scenes = cut ? script.scenes.filter((s) => cut.scene_ids.includes(s.id)) : script.scenes;
const { start, total } = sceneStarts(scenes);
// segmen per ~5 dtk dari kata-kata caption, waktu absolut video
const segs = [];
for (const s of scenes) {
  let cur = null;
  for (const w of caps[s.id] || []) {
    const a = start[s.id] + w.startMs / 1000, b = start[s.id] + w.endMs / 1000;
    if (!cur || b - cur.start > 5) { cur = { start: a, end: b, text: w.text }; segs.push(cur); } else { cur.end = b; cur.text += " " + w.text; }
  }
}
const tmp = path.join(dir, `.retensi-transkrip-${lang}.json`); fs.writeFileSync(tmp, JSON.stringify({ segments: segs }));
const py = path.join(ROOT, "scripts/vendor/youtube-agent-skill/yt-retention/retention.py");
const csv = path.resolve(o.csv.replace(/^~/, process.env.HOME));
const human = spawnSync("python3", [py, csv, "--transcript", tmp, "--duration", total.toFixed(1)], { encoding: "utf8" });
const json = spawnSync("python3", [py, csv, "--transcript", tmp, "--duration", total.toFixed(1), "--json"], { encoding: "utf8" });
fs.rmSync(tmp, { force: true });
if (human.status) { console.error(human.stderr || human.stdout); process.exit(1); }
const tanggal = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
const out = path.join(path.dirname(path.dirname(dir)), "analitik", `retensi-${o.siklus}${cut ? `-${cut.name}` : ""}-${tanggal}.md`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `# Retensi ${o.track} siklus ${o.siklus}${cut ? ` (${cut.name})` : ""}, ${tanggal}\n\nSumber: \`${path.basename(csv)}\`. Dibaca dengan retention.py (youtube-agent-skill, MIT). Transkrip dari caption ${lang}.\n\n\`\`\`\n${human.stdout.trim()}\n\`\`\`\n\n<details><summary>JSON</summary>\n\n\`\`\`json\n${json.stdout.trim()}\n\`\`\`\n</details>\n\n## Yang diubah di siklus berikutnya\n(isi: satu aturan yang bisa diuji untuk learnings.md)\n`);
console.log(human.stdout); console.log(`ditulis: ${path.relative(ROOT, out)}`);
