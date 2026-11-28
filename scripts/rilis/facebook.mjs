// Kirim ke Facebook Page lewat Graph API: master sebagai video Page, Short sebagai Reel, subtitle, sampul, dan komentar.
// Env per track (ditulis tombol "Hubungkan Page" di dashboard): FACEBOOK_PAGE_ID_<ID> dan FACEBOOK_PAGE_TOKEN_<ID>.
// App ID, App Secret, dan token pengguna hanya dipakai sekali saat menghubungkan dan tidak disimpan.
// Token hanya dikirim lewat header atau body, tidak pernah dicetak.
import fs from "node:fs"; import path from "node:path";
import { ROOT as REPO } from "../produksi/lib.mjs";
import { kembar, pesanKembar } from "./ganda.mjs";
import { ambil } from "../youtube/lib.mjs";
import { ROOT, disetujui, muat, teksFacebook, terkunci, ubah, waktu } from "./inti.mjs";

export const VERSI = "v27.0";
const GRAPH = `https://graph.facebook.com/${VERSI}`;
const VIDEO = `https://graph-video.facebook.com/${VERSI}`;
const RUPLOAD = `https://rupload.facebook.com/video-upload/${VERSI}`;
export const pageVar = (t) => `FACEBOOK_PAGE_ID_${t}`;
export const tokenVar = (t) => `FACEBOOK_PAGE_TOKEN_${t}`;
export const tunda = { proses: 10_000, batas: 10 * 60e3, ulang: 2000 };
const jeda = (ms) => new Promise((r) => setTimeout(r, ms));

async function minta(url, init) {
  const res = await ambil(url, init); // hanya permintaan baca yang diulang saat jaringan terganggu
  const b = await res.json().catch(() => ({}));
  if (res.ok && !b.error) return b;
  if (res.status === 413) throw Object.assign(new Error("Facebook 413: kiriman terlalu besar untuk satu permintaan"), { status: 413 });
  const e = b.error ?? b.debug_info ?? {};
  const saran = e.code === 190 ? " (token tidak berlaku; hubungkan ulang Page)" : e.code === 200 || e.code === 10 ? " (izin kurang; hubungkan ulang dengan semua izin)" : "";
  throw Object.assign(new Error(`Facebook ${res.status}${e.code ? ` kode ${e.code}` : ""}: ${e.error_user_msg ?? e.message ?? res.statusText}${saran}`), { status: res.status, code: e.code });
}

export function klien(track) {
  const page = process.env[pageVar(track)], token = process.env[tokenVar(track)];
  if (!page || !token) throw new Error(`Page Facebook ${track} belum dihubungkan (dashboard, langkah Setujui dan kirim)`);
  const auth = { Authorization: `Bearer ${token}` };
  return {
    page, token,
    get: (p, q = {}) => minta(`${GRAPH}/${p}?${new URLSearchParams(q)}`, { headers: auth }),
    post: (p, body = {}, basis = GRAPH) => minta(`${basis}/${p}`, { method: "POST", headers: auth, body: body instanceof FormData ? body : new URLSearchParams(body) }),
  };
}

const form = (isi) => { const f = new FormData(); for (const [k, v] of Object.entries(isi)) if (v !== undefined) Array.isArray(v) ? f.append(k, v[0], v[1]) : f.append(k, String(v)); return f; };
const berkas = async (rel) => [await fs.openAsBlob(path.join(ROOT, rel)), path.basename(rel)];
const detik = (d) => Math.floor(d.getTime() / 1000);

async function tautan(fb, id, reel) {
  const cadangan = `https://www.facebook.com/${reel ? "reel" : `${fb.page}/videos`}/${id}`;
  try { const u = (await fb.get(id, { fields: "permalink_url" })).permalink_url; return u ? new URL(u, "https://www.facebook.com").href : cadangan; } catch { return cadangan; }
}

/** Video Page (master), diunggah bertahap (start, transfer, finish): satu permintaan ditolak dengan HTTP 413
 *  untuk file besar. Sesi dicatat sehingga unggahan terputus dilanjutkan; penanda "mengunggah" dipasang sebelum
 *  tahap akhir agar video tidak terbit dua kali bila balasannya hilang. */
async function videoPage(fb, i, t, jadwal, h, catat, log) {
  const tepi = `${fb.page}/videos`; const file = path.join(ROOT, i.file); const ukuran = fs.statSync(file).size;
  let u = h?.unggahan;
  if (u && u.ukuran !== ukuran) u = null; // file dirender ulang: mulai dari awal
  if (!u) {
    const m = await fb.post(tepi, { upload_phase: "start", file_size: String(ukuran) }, VIDEO);
    if (!m.upload_session_id || !m.video_id) throw new Error("Facebook tidak memberi sesi unggah");
    u = { sesi: String(m.upload_session_id), videoId: String(m.video_id), ukuran, awal: Number(m.start_offset), akhir: Number(m.end_offset) };
  }
  const simpan = () => catat({ sumber: "alat", unggahan: u });
  simpan();
  const isi = await fs.openAsBlob(file);
  for (let gagal = 0; u.awal < u.akhir;) {
    try {
      const m = await fb.post(tepi, form({ upload_phase: "transfer", upload_session_id: u.sesi, start_offset: u.awal, video_file_chunk: [isi.slice(u.awal, u.akhir), path.basename(file)] }), VIDEO);
      u = { ...u, awal: Number(m.start_offset), akhir: Number(m.end_offset) }; gagal = 0; simpan();
      log(`${i.nama}: unggah ${Math.round((Math.min(u.awal, ukuran) / ukuran) * 100)}%`);
    } catch (e) {
      if (e.status && e.status < 500) { catat(null); throw e; } // sesi ditolak: belum ada yang terbit, percobaan berikutnya mulai baru
      if (++gagal > 3) throw new Error(`unggahan terputus (${e.message}); klik kirim lagi untuk melanjutkan`);
      await jeda(gagal * tunda.ulang);
    }
  }
  catat({ sumber: "alat", unggahan: u, mengunggah: new Date().toISOString() });
  try {
    const m = await fb.post(tepi, form({ upload_phase: "finish", upload_session_id: u.sesi, title: i.judul, description: t.deskripsi, ...(jadwal ? { published: false, scheduled_publish_time: detik(jadwal) } : { published: true }) }), VIDEO);
    if (m.success === false) throw new Error("Facebook menolak tahap akhir");
  } catch (e) { if (e.status && e.status < 500) catat(null); throw e; }
  return { videoId: u.videoId, selesai: {} };
}

/** Reel tiga tahap. ID dicatat sejak tahap pertama sehingga tahap yang terputus dilanjutkan. */
async function reel(fb, i, t, jadwal, h, catat, { draf, log }) {
  let id = h?.videoId;
  if (!id) { id = (await fb.post(`${fb.page}/video_reels`, { upload_phase: "start" })).video_id; if (!id) throw new Error("Facebook tidak memberi ID video"); h = { sumber: "alat", videoId: id, tahap: "unggah" }; catat(h); }
  const status = async () => (await fb.get(id, { fields: "status" })).status ?? {};
  let s = await status();
  if (!["complete", "completed"].includes(s.uploading_phase?.status)) {
    const file = path.join(ROOT, i.file); const total = fs.statSync(file).size; const offset = s.uploading_phase?.bytes_transfered ?? 0;
    const data = fs.readFileSync(file).subarray(offset);
    await minta(`${RUPLOAD}/${id}`, { method: "POST", headers: { Authorization: `OAuth ${fb.token}`, offset: String(offset), file_size: String(total), "Content-Type": "application/octet-stream" }, body: data });
    log(`${i.nama}: file terunggah`);
  }
  // Bila tahap akhir sudah diterima pada percobaan sebelumnya, jangan dikirim dua kali.
  if (["scheduled", "published"].includes(s.publishing_phase?.publish_status)) return { videoId: id, selesai: {} };
  await fb.post(`${fb.page}/video_reels`, { upload_phase: "finish", video_id: id, video_state: draf ? "DRAFT" : jadwal ? "SCHEDULED" : "PUBLISHED", title: i.judul, description: t.deskripsi, ...(jadwal && !draf && { scheduled_publish_time: String(detik(jadwal)) }) });
  return { videoId: id, selesai: {} };
}

/** Subtitle dan sampul yang belum terpasang. */
async function lengkapi(fb, i, h, catat, log) {
  const galat = [];
  const langkah = async (kunci, label, fn) => {
    if (h.selesai?.[kunci]) return;
    try { await fn(); (h.selesai ||= {})[kunci] = new Date().toISOString(); log(`${i.nama}: ${label} selesai`); }
    catch (e) { galat.push(`${label}: ${e.message}`); log(`${i.nama}: ${label} GAGAL: ${e.message}`); }
    catat(h);
  };
  for (const s of i.subtitle) {
    const locale = { en: "en_US", id: "id_ID" }[s.bahasa]; if (!locale) continue;
    await langkah(`subtitle-${s.bahasa}`, `subtitle ${s.bahasa}`, async () => {
      const blob = await fs.openAsBlob(path.join(ROOT, s.file)); if (blob.size > 200 * 1024) throw new Error("file lebih dari 200 KB");
      await fb.post(`${h.videoId}/captions`, form({ captions_file: [blob, `${i.nama}.${locale}.srt`], default_locale: s.bahasa === "en" ? locale : undefined }));
    });
  }
  if (i.thumbnail) await langkah("sampul", "sampul", async () => fb.post(`${h.videoId}/thumbnails`, form({ is_preferred: true, source: await berkas(i.thumbnail) })));
  h.galat = galat; catat(h);
}

/** Video dan postingan terjadwal yang sudah ada di Page. */
async function videoPageAda(fb) {
  const url = (u, id) => (u ? new URL(u, "https://www.facebook.com").href : `https://www.facebook.com/${id}`);
  const video = (await fb.get(`${fb.page}/videos`, { fields: "id,title,description,permalink_url", limit: "100" })).data ?? [];
  const jadwal = (await fb.get(`${fb.page}/scheduled_posts`, { fields: "id,message,permalink_url", limit: "100" })).data ?? [];
  return [...video.map((v) => ({ url: url(v.permalink_url, v.id), judul: v.title, teks: v.description })), ...jadwal.map((p) => ({ url: url(p.permalink_url, p.id), teks: p.message }))].filter((v) => !String(v.judul ?? "").startsWith("[UJI"));
}

const wajibSetuju = (r) => { if (!disetujui(r)) throw new Error(r.persetujuan ? "isi rencana atau file berubah setelah disetujui; setujui ulang" : "belum disetujui kreator (ketik SETUJU)"); };
export const MIN_JADWAL = 11 * 60e3; // Facebook menolak jadwal kurang dari 10 menit

/** Unggah item yang belum ada di Facebook. draf: satu Short sebagai Reel draf (tidak tampil), tanpa komentar. */
export function kirim(c, { draf = false, log = console.log } = {}) {
  return terkunci(c, async () => {
    const r = muat(c); if (!r) throw new Error("rencana belum dibuat");
    if (!draf) { wajibSetuju(r); if (!r.facebook?.aktif) throw new Error("Facebook belum dinyalakan untuk siklus ini"); if (r.kunci_manual) throw new Error(`siklus dikunci untuk unggah (${r.kunci_manual})`); }
    const items = draf ? r.items.filter((i) => i.nama !== "master").slice(0, 1) : r.items;
    if (!items.length) throw new Error("tidak ada item untuk dikirim");
    const fb = klien(c.track);
    // Diperiksa sebelum mengunggah apa pun. Gagal membaca Page = tidak mengirim.
    const baru = draf ? [] : items.filter((i) => !muat(c).hasil[i.nama]?.facebook);
    if (baru.length) {
      const ada = await videoPageAda(fb); const sama = baru.map((i) => [i.nama, kembar(i, ada, [teksFacebook(i).deskripsi])]).filter(([, v]) => v);
      if (sama.length) throw new Error(pesanKembar("Page Facebook", sama));
    }
    for (const i of items) {
      const kunci = draf ? `${i.nama}-uji` : i.nama; const master = i.nama === "master";
      let h = muat(c).hasil[kunci]?.facebook;
      const catat = (v) => ubah(c, (x) => { if (v) (x.hasil[kunci] ||= {}).facebook = v; else if (x.hasil[kunci]) { delete x.hasil[kunci].facebook; if (!Object.keys(x.hasil[kunci]).length) delete x.hasil[kunci]; } });
      try {
        if (h?.sumber === "manual") { log(`${i.nama}: sudah diunggah manual, dilewati`); continue; }
        if (!h?.url) {
          if (h?.mengunggah) throw new Error("unggahan sebelumnya tidak jelas hasilnya. Periksa Page; bila videonya ada, hapus di Facebook lalu klik \"Reset yang terhapus\"");
          let jadwal = draf ? null : waktu(i.jadwal);
          if (jadwal && r.uji_alat && !(jadwal - Date.now() > MIN_JADWAL)) { jadwal = null; log(`${i.nama}: Facebook menolak jadwal kurang dari 10 menit; video uji ditayangkan SEGERA`); }
          if (jadwal && !(jadwal - Date.now() > MIN_JADWAL)) throw new Error("jadwal Facebook harus lebih dari 10 menit lagi; ubah lalu setujui ulang");
          log(`${i.nama}: mulai unggah ke Facebook`);
          const t = teksFacebook(i);
          const v = master ? await videoPage(fb, i, t, jadwal, h, catat, (s) => log(s)) : await reel(fb, i, t, jadwal, h, catat, { draf, log });
          h = { sumber: "alat", ...v, url: await tautan(fb, v.videoId, !master), publishAt: jadwal?.toISOString() ?? null, ...(draf && { privasi: "private" }), diunggah: new Date().toISOString() };
          catat(h); log(`${i.nama}: ${draf ? "tersimpan sebagai draf" : jadwal ? "terjadwal" : "terkirim"} ${h.url}`);
        }
        await lengkapi(fb, i, h, catat, log);
      } catch (e) { log(`${i.nama}: GAGAL ${e.message}`); const x = muat(c).hasil[kunci]?.facebook; if (x) catat({ ...x, galat: [e.message] }); if (e.code === 190) throw e; }
    }
  });
}

async function tayang(fb, nama, h) {
  if (nama === "master") { const v = await fb.get(h.videoId, { fields: "published" }); return v.published !== false; }
  const s = (await fb.get(h.videoId, { fields: "status" })).status ?? {}; return s.publishing_phase?.publish_status === "published";
}

/** Komentar sekali saja pada video yang sudah tayang. {master} diganti tautan master Facebook yang sudah tayang. */
export function pascaTayang(c, { log = console.log, hanya, bolehKomentar = () => true } = {}) {
  return terkunci(c, async () => {
    const r = muat(c); if (!r) throw new Error("rencana belum dibuat"); wajibSetuju(r);
    const fb = klien(c.track);
    for (const i of r.items.filter((x) => !hanya || hanya.has(x.nama))) {
      const h = muat(c).hasil[i.nama]?.facebook; if (!h?.videoId) continue;
      const catat = (v) => ubah(c, (x) => { x.hasil[i.nama].facebook = v; });
      try {
        if (h.sumber === "alat" && h.url) await lengkapi(fb, i, h, catat, log);
        let teks = teksFacebook(i).komentar.trim(); if (!teks || h.komentar || !bolehKomentar(i.nama)) continue;
        if (!(await tayang(fb, i.nama, h))) { log(`${i.nama}: Facebook belum tayang, komentar ditunda`); continue; }
        if (teks.includes("{master}")) {
          const m = muat(c).hasil.master?.facebook;
          if (!m?.url || (m.videoId && !(await tayang(fb, "master", m)))) { log(`${i.nama}: master Facebook belum tayang, komentar ditunda`); continue; }
          teks = teks.replaceAll("{master}", m.url);
        }
        const lama = (await fb.get(`${h.videoId}/comments`, { fields: "id,from", limit: "100" })).data?.find((k) => k.from?.id === fb.page);
        const id = lama?.id ?? (await fb.post(`${h.videoId}/comments`, { message: teks })).id;
        h.komentar = { id, url: h.url, sudahAda: !!lama, waktu: new Date().toISOString() }; h.galat = (h.galat || []).filter((x) => !x.startsWith("komentar")); catat(h);
        log(`${i.nama}: ${lama ? "komentar Page sudah ada, tidak memposting lagi" : "komentar Facebook diposting"}; pin di ${h.url}`);
      } catch (e) { h.galat = [...(h.galat || []).filter((x) => !x.startsWith("komentar")), `komentar: ${e.message}`]; catat(h); log(`${i.nama}: komentar Facebook GAGAL: ${e.message}`); }
    }
  });
}

/** Lupakan catatan untuk video yang sudah dihapus di Facebook (dan penanda unggahan yang tidak jelas). */
export function lupakanTerhapus(c, { log = console.log } = {}) {
  return terkunci(c, async () => {
    const r = muat(c); const catatan = Object.entries(r.hasil).filter(([, v]) => v.facebook?.sumber === "alat");
    if (!catatan.length) return log("tidak ada catatan unggah Facebook");
    const fb = klien(c.track); const hilang = [];
    for (const [n, v] of catatan) {
      const id = v.facebook.videoId;
      if (!id) { hilang.push(n); log(`${n}: penanda unggahan tanpa ID dihapus (pastikan videonya tidak ada di Page)`); continue; }
      try { await fb.get(id, { fields: "id" }); log(`${n}: masih ada di Facebook; catatan dipertahankan`); }
      catch (e) { if (e.code !== 100) throw e; hilang.push(n); log(`${n}: sudah terhapus; catatan direset`); }
    }
    if (hilang.length) ubah(c, (x) => { for (const n of hilang) { delete x.hasil[n].facebook; if (!Object.keys(x.hasil[n]).length) delete x.hasil[n]; for (const k of Object.keys(x.checklist)) if (k.startsWith(`${n}:fb-`)) delete x.checklist[k]; } x.persetujuan = null; });
  });
}

// ---------- Menghubungkan Page (dipicu kreator dari dashboard) ----------
let calon = null; // token Page sementara di memori sampai kreator memilih
export const IZIN_WAJIB = ["pages_show_list", "pages_read_engagement", "pages_manage_posts", "pages_manage_engagement"]; // terakhir: komentar
export const pilihan = () => (calon ? { track: calon.track, kurang: calon.kurang, pages: calon.pages.map((p) => ({ id: p.id, nama: p.name })) } : null);
export async function cariPage({ track, appId, appSecret, token }) {
  if (!/^T\d\d$/.test(track)) throw new Error("track tidak sah");
  if (!/^\d+$/.test(String(appId ?? "").trim()) || !appSecret || !token) throw new Error("isi App ID (angka), App Secret, dan User Access Token");
  calon = null;
  const panjang = (await minta(`${GRAPH}/oauth/access_token`, { method: "POST", body: new URLSearchParams({ grant_type: "fb_exchange_token", client_id: appId.trim(), client_secret: appSecret.trim(), fb_exchange_token: token.trim() }) })).access_token;
  const pages = (await minta(`${GRAPH}/me/accounts?${new URLSearchParams({ fields: "id,name,access_token,tasks", limit: "100" })}`, { headers: { Authorization: `Bearer ${panjang}` } })).data ?? [];
  const bisa = pages.filter((p) => p.access_token && (!p.tasks || p.tasks.includes("CREATE_CONTENT")));
  if (!bisa.length) throw new Error("tidak ada Page yang bisa kamu isi kontennya; pastikan Page dipilih dan semua izin dicentang saat membuat token");
  // Izin yang tidak dicentang baru ketahuan saat dipakai, jadi diperiksa sekarang.
  const izin = (await minta(`${GRAPH}/me/permissions`, { headers: { Authorization: `Bearer ${panjang}` } })).data ?? [];
  const kurang = IZIN_WAJIB.filter((n) => !izin.some((x) => x.permission === n && x.status === "granted"));
  calon = { track, pages: bisa, kurang };
  return pilihan();
}
/** Tulis variabel ke .env tanpa menyentuh baris lain. */
export function tulisEnv(isi, file) {
  let teks = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  for (const [nama, nilai] of Object.entries(isi)) {
    if (!/^[\w.\-|]+$/.test(nilai)) throw new Error(`nilai ${nama} berisi karakter tak terduga`);
    const pola = new RegExp(`^[ \\t]*(export[ \\t]+)?${nama}=.*$`, "m"), baris = `${nama}=${nilai}`;
    teks = pola.test(teks) ? teks.replace(pola, () => baris) : `${teks}${teks && !teks.endsWith("\n") ? "\n" : ""}${baris}\n`;
  }
  const tmp = `${file}.tmp-${process.pid}`; fs.writeFileSync(tmp, teks, { mode: 0o600 }); fs.renameSync(tmp, file);
}
export function pilihPage(id, file = path.join(REPO, ".env")) {
  const p = calon?.pages.find((x) => x.id === id); if (!p) throw new Error("pilih Page dari daftar; bila daftar hilang, ambil ulang");
  const isi = { [pageVar(calon.track)]: p.id, [tokenVar(calon.track)]: p.access_token };
  tulisEnv(isi, file); Object.assign(process.env, isi); const track = calon.track; calon = null;
  return { track, nama: p.name };
}
export const batal = () => { calon = null; };
