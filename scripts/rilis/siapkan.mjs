// Menyiapkan siklus untuk rilis di akhir produksi: subtitle, rencana (06-rilis.json), dan teks dari 06-teks-rilis.json.
//   node scripts/rilis/siapkan.mjs --track T01 --siklus 006
// Tanpa jaringan, tidak menyetujui atau mengirim apa pun. Aman diulang: suntingan di dashboard tidak ditimpa.
import { args } from "../produksi/lib.mjs";
import { buatRencana, cari, masalah, muat, terapkanTeksBaru } from "./inti.mjs";
import { buatSubtitle } from "./subtitle.mjs";

try {
  const o = args(); const c = cari(o.track, o.siklus);
  const s = buatSubtitle(c);
  console.log(`Subtitle dibuat: ${s.dibuat.join(", ") || "tidak ada yang baru"}`);
  for (const d of s.dilewati) console.log(`  dilewati ${d}`);
  if (!muat(c)) { buatRencana(c); console.log(`Rencana ditulis: ${c.rel}/06-rilis.json`); }
  else console.log(terapkanTeksBaru(c));
  const r = muat(c);
  for (const i of r.items) {
    const kosong = [!i.judul && "judul", !i.komentar && "komentar", !i.terjemahan?.judul && "judul Indonesia", !i.terjemahan?.deskripsi && "deskripsi Indonesia", i.subtitle.length < 2 && "subtitle belum lengkap"].filter(Boolean);
    console.log(`  ${i.nama}: ${kosong.length ? `belum ada ${kosong.join(", ")}` : "lengkap"}`);
  }
  if (r.kunci_manual) console.log(`Unggah dikunci: ${r.kunci_manual}`);
  const m = masalah(c, r); if (m.length) console.log(`Perlu diperbaiki sebelum disetujui:\n  - ${m.join("\n  - ")}`);
} catch (e) { console.error("GAGAL:", e.message); process.exit(1); }
