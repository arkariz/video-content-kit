// Penjadwal Mac: tiap 5 menit memposting komentar pertama dan melengkapi thumbnail/subtitle yang tertunda,
// hanya untuk siklus yang sudah disetujui kreator. Tidak mengunggah video (jadwal tayang dipegang YouTube).
//   node scripts/rilis/jadwal.mjs pasang                      (sama dengan tombol "Aktifkan" di dashboard)
//   node scripts/rilis/jadwal.mjs status
//   node scripts/rilis/jadwal.mjs copot
//   node --env-file=.env scripts/rilis/jadwal.mjs jalan       (satu putaran; dipanggil launchd)
// Komentar yang terlambat lebih dari 60 menit (Mac tidur/mati) tidak diposting; menunggu keputusan kreator.
import path from "node:path"; import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { readJson, writeJson } from "../produksi/lib.mjs";
import { ROOT, daftarSiklus, disetujui, muat, sibuk, teksFacebook, ubah, waktu } from "./inti.mjs";
import { pascaTayang } from "./youtube.mjs";
import { pascaTayang as pascaFacebook } from "./facebook.mjs";
import { muatEnv } from "./hubungkan.mjs";
import { segarBila } from "./segarkan.mjs";
import { SELANG, copot, filePlist, pasang, termuat } from "./layanan.mjs";

export const BATAS = 60 * 60e3; // keterlambatan komentar yang masih boleh diposting
const MAKS = 5; // percobaan gagal sebelum berhenti mencoba
const UMUR = 24 * 3600e3; // lama melengkapi thumbnail/subtitle setelah unggah
export const fileStatus = () => path.join(ROOT, ".rilis-penjadwal.json");

/** Pekerjaan satu siklus, dihitung dari catatan lokal (tanpa memanggil API).
 *  keadaan: menunggu | siap | terlewat | gagal. */
export function antrean(r, kini = Date.now()) {
  const A = [];
  for (const i of r.items) for (const platform of ["youtube", "facebook"]) {
    const h = r.hasil[i.nama]?.[platform]; if (!h?.videoId || h.hilang || (platform === "facebook" && !h.url)) continue;
    const gagal = h.percobaan ?? {}; const dasar = { nama: i.nama, platform };
    const komentar = platform === "youtube" ? i.komentar : teksFacebook(i).komentar;
    if (komentar.trim() && !h.komentar && h.privasi !== (platform === "facebook" ? "private" : null)) {
      let saat = h.publishAt ? new Date(h.publishAt).getTime() : (waktu(i.jadwal)?.getTime() ?? new Date(h.diunggah ?? h.dicatat).getTime());
      // komentar yang menaut master baru bisa diposting setelah master tayang
      const m = r.hasil.master?.facebook?.publishAt; if (platform === "facebook" && komentar.includes("{master}") && m) saat = Math.max(saat, new Date(m).getTime());
      const keadaan = kini < saat ? "menunggu" : (gagal.komentar ?? 0) >= MAKS ? "gagal" : kini - saat > BATAS ? "terlewat" : "siap";
      A.push({ ...dasar, jenis: "komentar", saat: new Date(saat).toISOString(), keadaan });
    }
    if (h.sumber !== "alat") continue;
    const langkah = platform === "youtube" ? [...(i.playlist ? ["playlist"] : []), ...i.subtitle.map((s) => `subtitle-${s.bahasa}`), ...(i.thumbnail ? ["thumbnail"] : [])] : [...i.subtitle.map((s) => `subtitle-${s.bahasa}`), ...(i.thumbnail ? ["sampul"] : [])];
    const kurang = langkah.filter((k) => !h.selesai?.[k]);
    if (kurang.length) A.push({ ...dasar, jenis: "kelengkapan", kurang, saat: h.diunggah, keadaan: (gagal.kelengkapan ?? 0) >= MAKS || kini - new Date(h.diunggah).getTime() > UMUR ? "gagal" : "siap" });
  }
  return A;
}

/** Notifikasi macOS; teks dikirim sebagai argumen, bukan disisipkan ke skrip. */
function notifikasi(pesan) {
  try { execFileSync("osascript", ["-e", "on run argv", "-e", 'display notification (item 1 of argv) with title "Rilis"', "-e", "end run", pesan], { timeout: 10_000 }); } catch { /* notifikasi tidak penting */ }
}

export async function putaran({ log = console.log, beri = notifikasi, kini = Date.now() } = {}) {
  const catatan = [];
  const tulis = (s) => { catatan.push(s); log(s); };
  const PASCA = { youtube: pascaTayang, facebook: pascaFacebook };
  for (const c of daftarSiklus()) {
    const label = `${c.track}-${c.siklus}`;
    try {
      const r = muat(c); if (!r || r.arsip) continue;
      const A = antrean(r, kini); const nama = (x) => `${label} ${x.nama}${x.platform === "facebook" ? " Facebook" : ""}`;
      // Terlewat: beri tahu sekali saja, dan hanya untuk siklus yang memang disetujui untuk diposting.
      for (const t of A.filter((x) => disetujui(r) && x.keadaan === "terlewat" && !r.hasil[x.nama][x.platform].terlewatDiberitahu)) {
        ubah(c, (x) => (x.hasil[t.nama][t.platform].terlewatDiberitahu = new Date(kini).toISOString()));
        tulis(`${nama(t)}: komentar TERLEWAT; posting lewat "Jalankan pasca-tayang" bila masih mau`); beri(`${nama(t)}: komentar terlewat, perlu keputusanmu`);
      }
      for (const platform of ["youtube", "facebook"]) {
        const siap = A.filter((x) => x.platform === platform && x.keadaan === "siap"); if (!siap.length) continue;
        if (!disetujui(muat(c))) { tulis(`${label}: ada pekerjaan, tetapi belum disetujui atau isinya berubah; dilewati`); break; }
        if (sibuk(c)) { tulis(`${label}: sedang diproses, dicoba lagi nanti`); break; }
        const boleh = new Set(siap.filter((x) => x.jenis === "komentar").map((x) => x.nama));
        try { await PASCA[platform](c, { log: (s) => tulis(`${label} ${s}`), hanya: new Set(siap.map((x) => x.nama)), bolehKomentar: (n) => boleh.has(n) }); }
        catch (e) { tulis(`${label}: ${platform} GAGAL ${e.message}`); continue; }
        const baru = muat(c);
        for (const x of siap) {
          const h = baru.hasil[x.nama][platform];
          if (x.jenis === "komentar" && h.komentar) { if (!h.komentar.sudahAda) beri(`${nama(x)}: komentar terposting, pin sekarang`); continue; }
          const galat = (h.galat ?? []).filter((g) => g.startsWith("komentar") === (x.jenis === "komentar"));
          if (!galat.length) continue; // belum waktunya (mis. video belum publik atau masih diproses)
          const n = (h.percobaan?.[x.jenis] ?? 0) + 1;
          ubah(c, (v) => ((v.hasil[x.nama][platform].percobaan ||= {})[x.jenis] = n));
          if (n === MAKS) beri(`${nama(x)}: ${x.jenis} gagal ${MAKS} kali, periksa dashboard`);
        }
      }
    } catch (e) { tulis(`${label}: GAGAL ${e.message}`); }
  }
  const lama = readJson(fileStatus(), { catatan: [] });
  const cap = new Date(kini).toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" });
  writeJson(fileStatus(), { terakhir: new Date(kini).toISOString(), catatan: [...lama.catatan, ...catatan.map((s) => `${cap} ${s}`)].slice(-50) });
  return catatan;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const cmd = process.argv[2];
  try {
    // Jadwal terbaru dari platform dibaca dulu, supaya komentar tidak memakai jam lama.
    if (cmd === "jalan") { muatEnv(); await segarBila(); await putaran(); }
    else if (cmd === "pasang") { pasang("penjadwal"); console.log(`Terpasang: berjalan tiap ${SELANG / 60} menit selama kamu login.\nPlist: ${filePlist("penjadwal")}`); }
    else if (cmd === "copot") { copot("penjadwal"); console.log("Penjadwal dicopot."); }
    else if (cmd === "status") {
      const s = readJson(fileStatus(), null);
      console.log(`Terpasang: ${termuat("penjadwal") ? "ya" : "tidak"}\nPutaran terakhir: ${s ? new Date(s.terakhir).toLocaleString("id-ID") : "belum pernah"}`);
      for (const b of s?.catatan.slice(-10) ?? []) console.log(" ", b);
      for (const c of daftarSiklus()) { const r = muat(c); if (r) for (const a of antrean(r)) console.log(`  ${c.track}-${c.siklus} ${a.nama} ${a.platform}: ${a.jenis} ${a.keadaan}${disetujui(r) ? "" : " (belum disetujui)"}`); }
    } else throw new Error("perintah: pasang | status | copot | jalan");
  } catch (e) { console.error("GAGAL:", e.message); process.exit(1); }
}
