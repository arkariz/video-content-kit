// Menyamakan tabel Siklus di TRACK.md dengan hasil yang tercatat di dashboard (catatan lokal, tanpa API).
//   node scripts/rilis/status.mjs [--lihat]
// Hanya menaikkan status (ke siap-publish atau tayang) berdasarkan master di YouTube; tidak pernah menurunkan.
import fs from "node:fs"; import path from "node:path"; import { pathToFileURL } from "node:url";
import { ROOT, daftarSiklus, muat, waktu } from "./inti.mjs";

const URUT = ["riset", "naskah", "produksi", "qa", "siap-publish", "tayang"];
const tanggal = (d) => d.toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });

/** Status yang seharusnya menurut master YouTube; null bila belum ada hasil. */
export function seharusnya(r, kini = Date.now()) {
  const h = r.hasil.master?.youtube; if (!h) return null;
  const jadwal = h.publishAt ? new Date(h.publishAt) : null;
  if (jadwal && jadwal > kini) return { status: "siap-publish", tanggal: tanggal(jadwal) };
  if (h.privasi === "private" && !jadwal) return null; // terunggah privat tanpa jadwal: belum tayang
  const saat = jadwal ?? waktu(r.items.find((i) => i.nama === "master")?.jadwal) ?? new Date(h.dicatat ?? h.diunggah);
  return { status: "tayang", tanggal: tanggal(saat) };
}

export function sinkronStatus({ log = console.log, lihat = false, kini = Date.now() } = {}) {
  let ubahan = 0;
  for (const c of daftarSiklus().filter((x) => !x.nama.endsWith("-uji-alat"))) {
    const r = muat(c); const s = r && seharusnya(r, kini); if (!s) continue;
    const file = path.join(ROOT, path.dirname(path.dirname(c.rel)), "TRACK.md"); const baris = fs.readFileSync(file, "utf8").split("\n");
    const n = baris.findIndex((l) => l.startsWith(`| ${c.nama} `)); if (n < 0) { log(`${c.track}-${c.siklus}: baris siklus tidak ada di TRACK.md, dilewati`); continue; }
    const k = baris[n].split("|"); const lama = k[3].trim(), tglLama = k[4].trim();
    const naik = URUT.indexOf(s.status) > URUT.indexOf(lama);
    const geser = s.status === lama && s.status === "siap-publish" && tglLama !== s.tanggal;
    if (URUT.indexOf(lama) < 0 || !(naik || geser)) continue;
    ubahan++; log(`${c.track}-${c.siklus}: ${lama} (${tglLama}) -> ${s.status} (${s.tanggal})`);
    if (lihat) continue;
    k[3] = ` ${s.status} `; k[4] = ` ${s.tanggal} `; baris[n] = k.join("|");
    const isi = baris.join("\n").replace(/\n*$/, "\n");
    fs.writeFileSync(file, `${isi}- ${tanggal(new Date(kini))}: Status ${c.siklus} disamakan dengan hasil di dashboard rilis: ${s.status} (${s.tanggal}).\n`);
  }
  log(ubahan ? `${ubahan} status ${lihat ? "berbeda (mode lihat, tidak ditulis)" : "diperbarui di TRACK.md"}` : "status di TRACK.md sudah sesuai");
  return ubahan;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) sinkronStatus({ lihat: process.argv.includes("--lihat") });
