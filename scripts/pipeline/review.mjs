// Paket review: satu halaman HTML berisi video, hasil QA otomatis, daftar manual, dan sumber. Persetujuan lewat approve.mjs.
import fs from "node:fs"; import path from "node:path";
import { ROOT, args, resolveCycle, readJson } from "../produksi/lib.mjs";
const o = args(); const { dir, cycleId, scriptPath } = resolveCycle(o.track, o.siklus); const qa = readJson(path.join(dir, "05-qa.auto.json"), null); const script = readJson(scriptPath);
const outDir = path.join(ROOT, "hasil/review", `${o.track}-${cycleId}`); fs.mkdirSync(outDir, { recursive: true });
const rd = path.join(ROOT, "produksi/render", o.track, o.siklus); const vids = fs.existsSync(rd) ? fs.readdirSync(rd).filter((f) => f.endsWith(".mp4")) : [];
const rel = (f) => path.relative(outDir, path.join(rd, f));
const html = `<!doctype html><meta charset=utf-8><title>Review ${o.track} ${cycleId}</title><body style="font-family:system-ui;max-width:1100px;margin:24px auto;padding:0 16px">
<h1>Review ${o.track} · ${cycleId}</h1><p>QA otomatis: <b>${qa?.verdict ?? "belum dijalankan"}</b> · durasi ${qa?.durasi ?? "-"} · footage ${qa?.footage_pct ?? "-"}%</p>
${vids.map((f) => `<h3>${f}</h3><video src="${rel(f)}" controls style="max-width:${f.startsWith("Master") ? 1060 : 300}px;width:100%"></video>`).join("\n")}
<h2>Temuan QA</h2><table border=1 cellpadding=6 style="border-collapse:collapse"><tr><th>#<th>Lapisan<th>Tingkat<th>Temuan<th>Perbaikan</tr>${(qa?.temuan ?? []).map((f) => `<tr><td>${f.id}<td>${f.layer}<td>${f.level}<td>${f.msg}<td>${f.fix}</tr>`).join("")}</table>
<h2>Pemeriksaan manual (wajib)</h2><ul>${(qa?.manual ?? []).map((m) => `<li>${m}`).join("")}</ul>
<h2>Judul dan thumbnail</h2><ol>${script.title_options.map((t) => `<li>${t}`).join("")}</ol><p>Teks thumbnail: ${script.thumbnail_text.join(" / ")}</p>
<h2>Setujui atau revisi</h2><pre>node --env-file=.env scripts/pipeline/approve.mjs --track ${o.track} --siklus ${o.siklus}\nnode scripts/pipeline/approve.mjs --track ${o.track} --siklus ${o.siklus} --revisi "catatan"</pre></body>`;
fs.writeFileSync(path.join(outDir, "index.html"), html); console.log("Paket review:", path.relative(ROOT, path.join(outDir, "index.html")));
