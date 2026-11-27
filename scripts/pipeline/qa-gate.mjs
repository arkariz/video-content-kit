// Gate QA anti-slop sebelum render penuh: 05-qa.md harus memutuskan atas isi yang sekarang.
//   node scripts/pipeline/qa-gate.mjs --track T01 --siklus 006            (status; kode 0 lanjut, 2 GAGAL, 3 belum diperiksa)
//   node scripts/pipeline/qa-gate.mjs --track T01 --siklus 006 --sidik    (sidik isi untuk ditulis di laporan)
// Sidik berasal dari naskah (tanpa durasi audio) dan gambar (.tsx): mengubahnya membuat laporan kedaluwarsa.
import fs from "node:fs"; import path from "node:path"; import crypto from "node:crypto"; import { pathToFileURL } from "node:url";
import { args, readJson, resolveCycle } from "../produksi/lib.mjs";

export function sidikIsi(dir) {
  const h = crypto.createHash("sha256");
  const naskah = readJson(path.join(dir, "03-script.json"));
  h.update(JSON.stringify(naskah, (k, v) => (k === "duration_ms" ? undefined : v)));
  const tsx = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((x) => (x.isDirectory() ? tsx(path.join(d, x.name)) : x.name.endsWith(".tsx") ? [path.join(d, x.name)] : []));
  for (const f of tsx(dir).sort()) h.update(path.relative(dir, f)).update(fs.readFileSync(f));
  return h.digest("hex").slice(0, 12);
}

/** Keputusan dari baris "Keputusan:" atau "Status:"; templat yang belum diisi ("LULUS / GAGAL") tidak dihitung. */
export function bacaLaporan(teks) {
  const m = teks.match(/^[#\s]*(?:Keputusan|Status)\s*:[\s*]*(LULUS|GAGAL|DILEWATI)\b(?![\s*]*\/)/im);
  return { keputusan: m?.[1].toUpperCase() ?? null, sidik: teks.match(/^Sidik isi:\s*`?([0-9a-f]{12})\b/im)?.[1] ?? null };
}

export function statusGate(dir) {
  const f = path.join(dir, "05-qa.md"); const sekarang = sidikIsi(dir);
  if (!fs.existsSync(f)) return { kode: 3, pesan: "05-qa.md belum ada", sidik: sekarang };
  const { keputusan, sidik } = bacaLaporan(fs.readFileSync(f, "utf8"));
  if (!keputusan) return { kode: 3, pesan: "05-qa.md tanpa keputusan LULUS atau GAGAL", sidik: sekarang };
  if (sidik !== sekarang) return { kode: 3, pesan: sidik ? "naskah atau gambar berubah setelah QA; periksa ulang" : "05-qa.md tanpa baris \"Sidik isi:\"", sidik: sekarang };
  if (keputusan === "GAGAL") return { kode: 2, pesan: "QA anti-slop GAGAL: perbaiki temuannya sebelum render", sidik: sekarang };
  return { kode: 0, pesan: keputusan === "DILEWATI" ? "QA anti-slop dilewati atas keputusan kreator" : "QA anti-slop LULUS", sidik: sekarang };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const o = args(); const { dir } = resolveCycle(o.track, o.siklus);
  if (o.sidik) { console.log(sidikIsi(dir)); process.exit(0); }
  const s = statusGate(dir); console.log(`gate QA ${o.track}/${o.siklus}: ${s.pesan} (sidik ${s.sidik})`); process.exit(s.kode);
}
