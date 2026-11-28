// Menyegarkan catatan dashboard dari platform (baca saja): jadwal, status tayang, judul, deskripsi, dan video yang hilang.
//   node --env-file=.env scripts/rilis/segarkan.mjs [--track T02] [--siklus 003]
// Aturan: perubahan di platform diambil; perubahan di dashboard yang belum diterapkan tidak ditimpa.
// Persetujuan dipertahankan bila perubahannya tidak menyangkut apa pun yang masih akan dikirim.
import path from "node:path"; import { pathToFileURL } from "node:url";
import { readJson, writeJson } from "../produksi/lib.mjs";
import { accessToken, data, tokenVar as bacaVar } from "../youtube/lib.mjs";
import { ROOT, daftarSiklus, disetujui, muat, sibuk, sidik, ubah, waktu } from "./inti.mjs";
import { klien as klienYT, publishVar } from "./youtube.mjs";
import { klien as klienFB, tokenVar as fbVar } from "./facebook.mjs";

const wib = (d) => new Date(d).toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" }).slice(0, 16).replace(" ", "T");
const jam = (d) => (d ? wib(d).replace("T", " ") : "tanpa jadwal");
const sama = (a, b) => (a ? new Date(a).getTime() : 0) === (b ? new Date(b).getTime() : 0);

/** Data video YouTube milik channel track, dikelompokkan 50 ID. null bila track belum terhubung. */
async function bacaYouTube(track, ids) {
  let get;
  if (process.env[publishVar(track)]) get = (await klienYT(track)).get;
  else if (process.env[bacaVar(track)]) { const token = await accessToken(track); get = (r, q) => data(r, q, { token }); }
  else return null;
  const hasil = new Map();
  for (let n = 0; n < ids.length; n += 50) for (const v of (await get("videos", { part: "snippet,status", id: ids.slice(n, n + 50).join(",") })).items ?? []) hasil.set(v.id, v);
  return hasil;
}

/** ID video dari catatan Facebook: dari unggahan alat, atau dari URL /reel/<id> dan /videos/<id>. */
export const idFacebook = (h) => h.videoId ?? String(h.url ?? "").match(/\/(?:reel|videos)\/(\d+)/)?.[1] ?? null;

async function bacaFacebook(track, ids) {
  if (!process.env[fbVar(track)]) return null;
  const fb = klienFB(track); const hasil = new Map();
  for (const id of ids) {
    try { hasil.set(id, { ...(await fb.get(id, { fields: "status" })), ...(await fb.get(id, { fields: "published" }).catch(() => ({}))) }); }
    catch (e) { if (e.code !== 100) throw e; hasil.set(id, null); } // null = tidak ditemukan
  }
  return hasil;
}

/** Terapkan satu video YouTube ke rencana. Mengembalikan daftar perubahan (teks). */
function terapkanYouTube(r, i, h, v, kini) {
  const ubahan = []; const fbMenunggu = r.facebook?.aktif && !r.hasil[i.nama]?.facebook;
  if (!v) { if (!h.hilang) { h.hilang = new Date(kini).toISOString(); ubahan.push("video tidak ditemukan di YouTube (terhapus?)"); } return { ubahan, kirimTerpengaruh: false }; }
  if (h.hilang) { delete h.hilang; ubahan.push("video ditemukan lagi"); }
  let kirimTerpengaruh = false;
  const privasi = v.status.privacyStatus;
  const terjadwal = privasi === "private" && v.status.publishAt ? v.status.publishAt : null;
  const tayang = privasi !== "private" ? v.snippet.publishedAt : null;
  if (h.privasi && h.privasi !== privasi) ubahan.push(`visibilitas ${h.privasi} -> ${privasi}`);
  h.privasi = privasi;
  // Jadwal: hanya bila nilai di platform berbeda dari yang terakhir diketahui.
  const baru = terjadwal ?? (tayang && h.publishAt && new Date(h.publishAt) > kini ? tayang : null);
  if (baru ? !sama(baru, h.publishAt) : privasi === "private" && !!h.publishAt && new Date(h.publishAt) > kini) {
    ubahan.push(baru ? `jadwal ${jam(h.publishAt)} -> ${jam(baru)}` : `jadwal ${jam(h.publishAt)} dibatalkan di YouTube`);
    h.publishAt = baru; delete h.terlewatDiberitahu; delete h.percobaan;
    if (baru) { i.jadwal = wib(baru); if (fbMenunggu) kirimTerpengaruh = true; }
  }
  // Konten yang sudah tayang menampilkan waktu tayang sebenarnya.
  if (tayang && (!h.publishAt || new Date(h.publishAt) <= kini)) { const nyata = wib(h.publishAt ?? tayang); if (i.jadwal !== nyata) { ubahan.push(`waktu tayang ${i.jadwal.replace("T", " ") || "-"} -> ${nyata.replace("T", " ")}`); i.jadwal = nyata; } }
  // Teks: yang tampil di platform, kecuali masih akan dipakai untuk kiriman Facebook.
  for (const [bidang, nilai, label] of [["judul", v.snippet.title, "judul"], ["deskripsi", v.snippet.description, "deskripsi"]]) {
    const terakhir = h.dilihat?.[bidang];
    if (terakhir === nilai) continue;
    if (nilai === i[bidang]) { (h.dilihat ||= {})[bidang] = nilai; continue; }
    if (!nilai?.trim()) { if (terakhir !== undefined || i[bidang]) ubahan.push(`${label} di YouTube kosong (teks dashboard dipertahankan)`); (h.dilihat ||= {})[bidang] = nilai ?? ""; continue; }
    if (fbMenunggu) { ubahan.push(`${label} di YouTube berbeda (tidak diambil: masih dipakai untuk kiriman Facebook)`); (h.dilihat ||= {})[bidang] = nilai; continue; }
    i[bidang] = nilai; (h.dilihat ||= {})[bidang] = nilai; ubahan.push(`${label} diambil dari YouTube`);
  }
  return { ubahan, kirimTerpengaruh };
}

/** publish_time Facebook berupa "2026-11-30T05:00:00+0000" (atau detik Unix); nilai tak terbaca diabaikan. */
export function waktuFacebook(t) {
  const d = new Date(/^\d+$/.test(String(t)) ? Number(t) * 1000 : String(t ?? ""));
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function terapkanFacebook(h, v, kini) {
  const ubahan = [];
  if (v === null) { if (!h.hilang) { h.hilang = new Date(kini).toISOString(); ubahan.push("video tidak ditemukan di Facebook (terhapus?)"); } return ubahan; }
  if (h.hilang) { delete h.hilang; ubahan.push("video ditemukan lagi"); }
  const p = v.status?.publishing_phase; const tayang = p?.publish_status ? p.publish_status === "published" : v.published;
  if (typeof tayang !== "boolean") return ubahan;
  const jadwal = !tayang ? waktuFacebook(p?.publish_time) : null;
  if (jadwal && !sama(jadwal, h.publishAt)) { ubahan.push(`jadwal ${jam(h.publishAt)} -> ${jam(jadwal)}`); h.publishAt = jadwal; delete h.terlewatDiberitahu; delete h.percobaan; }
  if (tayang && h.publishAt && new Date(h.publishAt) > kini) { ubahan.push("sudah tayang lebih awal dari jadwal"); h.publishAt = new Date(kini).toISOString(); }
  if (tayang && h.privasi === "private") { ubahan.push("draf sudah diterbitkan"); delete h.privasi; }
  return ubahan;
}

export async function segarkan({ log = console.log, track, siklus, kini = Date.now(), sumber = new Set() } = {}) {
  const daftar = daftarSiklus().filter((c) => !c.nama.endsWith("-uji-alat") && (!track || c.track === track) && (!siklus || c.siklus === siklus) && muat(c));
  let jumlah = 0;
  for (const t of [...new Set(daftar.map((c) => c.track))]) {
    const milik = daftar.filter((c) => c.track === t);
    const ambil = async (nama, fn, ids) => { if (!ids.length) return null; try { const x = await fn(t, [...new Set(ids)]); if (x) sumber.add(nama); else log(`${nama} ${t}: belum terhubung, dilewati`); return x; } catch (e) { log(`${nama} ${t}: GAGAL ${e.message}`); return null; } };
    const yt = await ambil("YouTube", bacaYouTube, milik.flatMap((c) => Object.values(muat(c).hasil).map((h) => h.youtube?.videoId).filter(Boolean)));
    const fb = await ambil("Facebook", bacaFacebook, milik.flatMap((c) => Object.values(muat(c).hasil).map((h) => h.facebook && idFacebook(h.facebook)).filter(Boolean)));
    for (const c of milik) {
      const label = `${c.track}-${c.siklus}`;
      if (sibuk(c)) { log(`${label}: sedang diproses, dilewati`); continue; }
      const catatan = [];
      ubah(c, (r) => {
        const sah = disetujui(r); let batal = false;
        for (const i of r.items) {
          const h = r.hasil[i.nama]; if (!h) continue;
          if (yt && h.youtube?.videoId) { const x = terapkanYouTube(r, i, h.youtube, yt.get(h.youtube.videoId), kini); batal ||= x.kirimTerpengaruh; for (const u of x.ubahan) catatan.push(`${label} ${i.nama} YouTube: ${u}`); }
          const id = h.facebook && idFacebook(h.facebook);
          if (fb && id && fb.has(id)) for (const u of terapkanFacebook(h.facebook, fb.get(id), kini)) catatan.push(`${label} ${i.nama} Facebook: ${u}`);
        }
        // Persetujuan mengikat isi yang akan dikirim; salinan keadaan platform tidak membatalkannya.
        if (sah && !batal) r.persetujuan.sidik = sidik(r);
        else if (sah) catatan.push(`${label}: jadwal berubah untuk konten yang belum dikirim ke Facebook; setujui ulang`);
      });
      for (const s of catatan) log(s);
      jumlah += catatan.length;
    }
  }
  log(jumlah ? `${jumlah} perubahan dicatat` : "tidak ada perubahan dari platform");
  return jumlah;
}

export const SEGAR_TIAP = 5 * 60e3;
export const fileSegar = () => path.join(ROOT, ".rilis-segar.json");
export const terakhirSegar = () => readJson(fileSegar(), null);
let berjalan = null;
/** Segarkan bila catatan terakhir sudah lebih tua dari `umur`; dipakai dashboard dan penjadwal. */
export function segarBila({ umur = SEGAR_TIAP, kini = Date.now() } = {}) {
  const lama = terakhirSegar();
  if (berjalan || (lama?.dicoba && kini - new Date(lama.dicoba) < umur)) return berjalan ?? Promise.resolve();
  const dicoba = new Date(kini).toISOString(); writeJson(fileSegar(), { ...lama, dicoba });
  const sumber = new Set(), galat = [];
  berjalan = segarkan({ kini, sumber, log: (s) => { if (s.includes("GAGAL")) galat.push(s); } })
    .then(() => writeJson(fileSegar(), { dicoba, ...(sumber.size ? { waktu: new Date().toISOString(), sumber: [...sumber].sort().reverse() } : { waktu: lama?.waktu, sumber: lama?.sumber }), galat }))
    .catch((e) => writeJson(fileSegar(), { ...lama, dicoba, galat: [e.message] }))
    .finally(() => (berjalan = null));
  return berjalan;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const a = (n) => { const k = process.argv.indexOf(`--${n}`); return k > 0 ? process.argv[k + 1] : undefined; };
  segarkan({ track: a("track"), siklus: a("siklus") }).catch((e) => { console.error("GAGAL:", e.message); process.exit(1); });
}
