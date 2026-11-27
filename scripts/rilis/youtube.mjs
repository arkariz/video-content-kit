// Kirim ke YouTube lewat Data API v3: unggah resumable, playlist, subtitle, thumbnail, dan komentar pertama.
// Env per track: YOUTUBE_PUBLISH_TOKEN_<ID> (ditulis auth.mjs --tulis) dan YOUTUBE_CHANNEL_ID_<ID>.
// Semua langkah dicatat di 06-rilis.json dan dilewati bila sudah selesai, jadi aman dijalankan ulang.
// Token dan URL sesi unggah tidak pernah dicetak atau disimpan di file yang di-commit.
import fs from "node:fs"; import path from "node:path";
import { readJson, writeJson } from "../produksi/lib.mjs";
import { oauthClient, tokenRequest, channelVar } from "../youtube/lib.mjs";
import { ROOT, disetujui, muat, terkunci, ubah, waktu } from "./inti.mjs";

const API = "https://www.googleapis.com/youtube/v3";
const UP = "https://www.googleapis.com/upload/youtube/v3";
export const CHUNK = 8 * 1024 * 1024; // harus kelipatan 256 KB
export const publishVar = (track) => `YOUTUBE_PUBLISH_TOKEN_${track}`;
const jeda = (ms) => new Promise((r) => setTimeout(r, ms));

async function galat(res) {
  const b = await res.json().catch(() => ({})); const reason = b.error?.errors?.[0]?.reason ?? (typeof b.error === "string" ? b.error : "");
  const saran = reason === "quotaExceeded" ? " (kuota harian habis; reset tengah malam Pacific Time)" : reason === "youtubeSignupRequired" ? " (akun ini tidak punya channel)" : "";
  return Object.assign(new Error(`YouTube ${res.status} ${reason}: ${b.error?.message ?? res.statusText}${saran}`), { status: res.status, reason });
}

/** Klien untuk channel milik satu track. Menolak bila token menunjuk channel lain. */
export async function klien(track) {
  if (!process.env[publishVar(track)]) throw new Error(`Env ${publishVar(track)} kosong. Jalankan: node --env-file=.env scripts/youtube/auth.mjs --track ${track} --tulis`);
  const channel = process.env[channelVar(track)]; if (!channel) throw new Error(`Env ${channelVar(track)} kosong; jalankan auth.mjs untuk track ini`);
  const { access_token } = await tokenRequest({ ...oauthClient(track), refresh_token: process.env[publishVar(track)], grant_type: "refresh_token" });
  const auth = { Authorization: `Bearer ${access_token}` };
  const panggil = async (url, init = {}) => { const res = await fetch(url, { ...init, headers: { ...auth, ...init.headers } }); if (!res.ok) throw await galat(res); return res.status === 204 ? {} : res.json().catch(() => ({})); };
  const get = (r, q) => panggil(`${API}/${r}?${new URLSearchParams(q)}`);
  const post = (r, q, body) => panggil(`${API}/${r}?${new URLSearchParams(q)}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const milik = (await get("channels", { part: "id", mine: "true" })).items?.[0]?.id;
  if (milik !== channel) throw new Error(`token tulis ${track} menunjuk channel lain dari ${channelVar(track)}; hubungkan ulang dengan channel yang benar`);
  return { auth, channel, panggil, get, post };
}

// "Penggunaan AI" (containsSyntheticMedia) sengaja tidak dikirim: keputusan kreator 2026-11-27, dibiarkan kosong.
export function metadata(r, i, uji) {
  const y = r.youtube; const t = i.terjemahan?.judul ? i.terjemahan : null; const terjadwal = !uji && i.jadwal;
  const body = {
    snippet: { title: uji ? `[UJI] ${i.judul}`.slice(0, 100) : i.judul, description: i.deskripsi, tags: i.tag, categoryId: y.kategori, defaultLanguage: y.bahasa, defaultAudioLanguage: y.bahasa },
    status: { privacyStatus: uji || terjadwal ? "private" : "public", selfDeclaredMadeForKids: y.untuk_anak, embeddable: true, ...(terjadwal && { publishAt: waktu(i.jadwal).toISOString() }) },
    paidProductPlacementDetails: { hasPaidProductPlacement: y.promosi_berbayar },
    ...(t && { localizations: { id: { title: t.judul, description: t.deskripsi || i.deskripsi } } }),
  };
  return body;
}

// URL sesi unggah disimpan di file tersembunyi (di-.gitignore) agar unggahan yang terputus bisa dilanjutkan.
const fileSesi = (c) => path.join(c.dir, ".rilis-sesi.json");
const sesi = (c) => readJson(fileSesi(c), {});
const aturSesi = (c, k, v) => { const s = sesi(c); if (v) s[k] = v; else delete s[k]; if (Object.keys(s).length) writeJson(fileSesi(c), s); else fs.rmSync(fileSesi(c), { force: true }); };

async function unggah(yt, c, kunci, file, body, log, diam) {
  const total = fs.statSync(file).size; let url = sesi(c)[kunci]?.url; let offset = 0;
  const kirim = (headers, data) => fetch(url, { method: "PUT", redirect: "manual", headers: { ...yt.auth, ...headers }, body: data });
  const posisi = (res) => { const m = res.headers.get("range")?.match(/-(\d+)$/); return m ? +m[1] + 1 : 0; };
  if (url) {
    if (sesi(c)[kunci].ukuran !== total) throw new Error("file video berubah sejak unggahan terputus; periksa YouTube Studio, lalu hapus .rilis-sesi.json");
    const res = await kirim({ "Content-Range": `bytes */${total}` });
    if (res.status === 200 || res.status === 201) return res.json();
    if (res.status !== 308) throw new Error(`sesi unggah lama tidak bisa dilanjutkan (HTTP ${res.status}). Periksa YouTube Studio apakah videonya sudah masuk; bila belum, hapus ${path.basename(fileSesi(c))} lalu ulangi`);
    offset = posisi(res); log(`melanjutkan unggahan dari ${Math.round((offset / total) * 100)}%`);
  } else {
    const res = await fetch(`${UP}/videos?${new URLSearchParams({ uploadType: "resumable", part: Object.keys(body).join(","), ...(diam && { notifySubscribers: "false" }) })}`, { method: "POST", headers: { ...yt.auth, "Content-Type": "application/json; charset=UTF-8", "X-Upload-Content-Length": String(total), "X-Upload-Content-Type": "video/mp4" }, body: JSON.stringify(body) });
    if (!res.ok) throw await galat(res);
    url = res.headers.get("location"); if (!url) throw new Error("YouTube tidak memberi alamat unggah");
    aturSesi(c, kunci, { url, ukuran: total });
  }
  const fd = fs.openSync(file, "r");
  try {
    for (let gagal = 0; ;) {
      const buf = Buffer.alloc(Math.min(CHUNK, total - offset)); fs.readSync(fd, buf, 0, buf.length, offset);
      let res; try { res = await kirim({ "Content-Range": `bytes ${offset}-${offset + buf.length - 1}/${total}` }, buf); } catch (e) { res = { status: 599, statusText: e.message }; }
      if (res.status === 200 || res.status === 201) return res.json();
      if (res.status === 308) { offset = posisi(res); gagal = 0; log(`unggah ${Math.round((offset / total) * 100)}%`); continue; }
      if (res.status < 500 || ++gagal > 4) throw res.json ? await galat(res) : new Error(`unggahan terputus: ${res.statusText}; jalankan lagi untuk melanjutkan`);
      await jeda(gagal * 1500);
      const cek = await kirim({ "Content-Range": `bytes */${total}` }).catch(() => null);
      if (cek?.status === 200 || cek?.status === 201) return cek.json();
      if (cek?.status === 308) offset = posisi(cek);
    }
  } finally { fs.closeSync(fd); }
}

async function playlist(yt, judul, videoId, privasi) {
  let id, pageToken;
  do { const r = await yt.get("playlists", { part: "snippet", mine: "true", maxResults: "50", ...(pageToken && { pageToken }) }); id = r.items?.find((p) => p.snippet.title === judul)?.id; pageToken = r.nextPageToken; } while (!id && pageToken);
  id ||= (await yt.post("playlists", { part: "snippet,status" }, { snippet: { title: judul }, status: { privacyStatus: privasi } })).id;
  const sudah = (await yt.get("playlistItems", { part: "id", playlistId: id, videoId })).items?.length;
  if (!sudah) await yt.post("playlistItems", { part: "snippet" }, { snippet: { playlistId: id, resourceId: { kind: "youtube#video", videoId } } });
}

async function subtitle(yt, videoId, bahasa, file) {
  const ada = (await yt.get("captions", { part: "snippet", videoId })).items?.some((x) => x.snippet.language === bahasa && x.snippet.trackKind !== "asr");
  if (ada) return;
  const b = `rilis${Date.now()}`;
  const body = Buffer.concat([Buffer.from(`--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({ snippet: { videoId, language: bahasa, name: "" } })}\r\n--${b}\r\nContent-Type: application/octet-stream\r\n\r\n`), fs.readFileSync(file), Buffer.from(`\r\n--${b}--`)]);
  await yt.panggil(`${UP}/captions?uploadType=multipart&part=snippet`, { method: "POST", headers: { "Content-Type": `multipart/related; boundary=${b}` }, body });
}

const thumbnail = (yt, videoId, file) => yt.panggil(`${UP}/thumbnails/set?${new URLSearchParams({ videoId, uploadType: "media" })}`, { method: "POST", headers: { "Content-Type": /\.png$/i.test(file) ? "image/png" : "image/jpeg" }, body: fs.readFileSync(file) });
const diproses = async (yt, videoId) => (await yt.get("videos", { part: "processingDetails", id: videoId })).items?.[0]?.processingDetails?.processingStatus === "succeeded";

/** Langkah setelah video ada: yang belum selesai saja; kegagalan satu langkah tidak menghentikan yang lain. */
async function lengkapi(yt, r, i, h, catat, { uji, log }) {
  const galatList = [];
  const langkah = async (kunci, label, fn) => {
    if (h.selesai?.[kunci]) return;
    try { if ((await fn()) === false) return; (h.selesai ||= {})[kunci] = new Date().toISOString(); log(`${i.nama}: ${label} selesai`); }
    catch (e) { galatList.push(`${label}: ${e.message}`); log(`${i.nama}: ${label} GAGAL: ${e.message}`); }
    catat(h);
  };
  if (i.playlist && !uji) await langkah("playlist", "playlist", () => playlist(yt, i.playlist, h.videoId, r.uji_alat ? "unlisted" : "public"));
  for (const s of i.subtitle) await langkah(`subtitle-${s.bahasa}`, `subtitle ${s.bahasa}`, () => subtitle(yt, h.videoId, s.bahasa, path.join(ROOT, s.file)));
  if (i.thumbnail) await langkah("thumbnail", "thumbnail", async () => {
    // thumbnail Shorts hanya diterima setelah pemrosesan selesai
    if (i.nama !== "master" && !(await diproses(yt, h.videoId))) { log(`${i.nama}: thumbnail menunggu pemrosesan selesai`); return false; }
    await thumbnail(yt, h.videoId, path.join(ROOT, i.thumbnail));
  });
  h.galat = galatList; catat(h);
}

/** Thumbnail Shorts baru diterima setelah pemrosesan selesai: tunggu di sini agar tidak tertinggal memakai frame otomatis. */
async function thumbnailTertunda(yt, c, r, daftar, { uji, log, tunggu, selang }) {
  const tertunda = () => daftar.filter(([i, k]) => { const h = muat(c).hasil[k]?.youtube; return i.thumbnail && h?.sumber === "alat" && !h.selesai?.thumbnail && !h.galat?.some((g) => g.startsWith("thumbnail")); });
  const batas = Date.now() + tunggu; let sisa = tertunda();
  if (sisa.length && tunggu > 0) log(`menunggu pemrosesan YouTube untuk memasang thumbnail: ${sisa.map(([i]) => i.nama).join(", ")}`);
  while (sisa.length && Date.now() < batas) {
    await jeda(selang);
    for (const [i, k] of sisa) {
      const h = muat(c).hasil[k].youtube;
      try { if (!(await diproses(yt, h.videoId))) continue; } catch (e) { log(`${i.nama}: status pemrosesan belum terbaca (${e.message})`); continue; }
      await lengkapi(yt, r, i, h, (v) => ubah(c, (x) => { x.hasil[k].youtube = v; }), { uji, log: (s) => !s.includes("menunggu pemrosesan") && log(s) });
    }
    sisa = tertunda();
  }
  if (sisa.length) log(`THUMBNAIL BELUM TERPASANG: ${sisa.map(([i]) => i.nama).join(", ")}. Klik "Jalankan pasca-tayang" beberapa menit lagi.`);
}

const wajibSetuju = (r) => { if (!disetujui(r)) throw new Error(r.persetujuan ? "isi rencana atau file berubah setelah disetujui; setujui ulang" : "belum disetujui kreator (ketik SETUJU)"); };

/** Unggah semua item yang belum ada di YouTube. uji: satu Short, privat, tanpa jadwal, playlist, atau komentar. */
export function kirim(c, { uji = false, log = console.log, tunggu = 10 * 60e3, selang = 15e3 } = {}) {
  return terkunci(c, async () => {
    const r = muat(c); if (!r) throw new Error("rencana belum dibuat");
    if (!uji) { wajibSetuju(r); if (r.kunci_manual) throw new Error(`siklus dikunci untuk unggah (${r.kunci_manual}); komentar tetap bisa lewat pasca-tayang`); }
    const items = uji ? r.items.filter((i) => i.nama !== "master").slice(0, 1) : r.items;
    if (!items.length) throw new Error("tidak ada item untuk dikirim");
    const yt = await klien(c.track);
    for (const i of items) {
      const kunci = uji ? `${i.nama}-uji` : i.nama;
      let h = muat(c).hasil[kunci]?.youtube;
      const catat = (v) => ubah(c, (x) => { (x.hasil[kunci] ||= {}).youtube = v; });
      if (h?.sumber === "manual") { log(`${i.nama}: sudah diunggah manual, dilewati`); continue; }
      if (!h?.videoId) {
        if (!uji && i.jadwal && !(waktu(i.jadwal) > Date.now() + 5 * 60e3)) throw new Error(`${i.nama}: jadwal sudah lewat; ubah lalu setujui ulang`);
        const body = metadata(r, i, uji); log(`${i.nama}: mulai unggah`);
        const v = await unggah(yt, c, kunci, path.join(ROOT, i.file), body, (s) => log(`${i.nama}: ${s}`), r.uji_alat);
        if (!v.id) throw new Error(`${i.nama}: unggahan selesai tanpa ID video; periksa YouTube Studio`);
        h = { sumber: "alat", videoId: v.id, url: `https://www.youtube.com/watch?v=${v.id}`, privasi: v.status?.privacyStatus ?? body.status.privacyStatus, publishAt: body.status.publishAt ?? null, diunggah: new Date().toISOString() };
        catat(h); aturSesi(c, kunci, null); log(`${i.nama}: terunggah ${h.url}`);
      }
      await lengkapi(yt, r, i, h, catat, { uji, log });
    }
    await thumbnailTertunda(yt, c, r, items.map((i) => [i, uji ? `${i.nama}-uji` : i.nama]), { uji, log, tunggu, selang });
  });
}

/** Setelah tayang: thumbnail/subtitle yang tertunda dan komentar pertama (sekali saja, hanya di video publik atau unlisted). */
export function pascaTayang(c, { log = console.log, hanya, bolehKomentar = () => true } = {}) {
  return terkunci(c, async () => {
    const r = muat(c); if (!r) throw new Error("rencana belum dibuat");
    wajibSetuju(r);
    const yt = await klien(c.track);
    for (const i of r.items.filter((x) => !hanya || hanya.has(x.nama))) {
      const h = muat(c).hasil[i.nama]?.youtube; if (!h?.videoId) { log(`${i.nama}: belum ada video YouTube, dilewati`); continue; }
      const catat = (v) => ubah(c, (x) => { x.hasil[i.nama].youtube = v; });
      const v = (await yt.get("videos", { part: "snippet,status", id: h.videoId })).items?.[0];
      if (!v) { log(`${i.nama}: video ${h.videoId} tidak ditemukan`); continue; }
      if (v.snippet.channelId !== yt.channel) { log(`${i.nama}: video ini milik channel lain, dilewati`); continue; }
      h.privasi = v.status.privacyStatus; catat(h);
      if (h.sumber === "alat") await lengkapi(yt, r, i, h, catat, { uji: false, log });
      if (!i.komentar.trim() || h.komentar || !bolehKomentar(i.nama)) continue;
      if (h.privasi === "private") { log(`${i.nama}: masih privat, komentar ditunda`); continue; }
      try {
        const lama = (await yt.get("commentThreads", { part: "snippet", videoId: h.videoId, maxResults: "100", order: "time" })).items?.find((t) => t.snippet.topLevelComment.snippet.authorChannelId?.value === yt.channel);
        const id = lama?.id ?? (await yt.post("commentThreads", { part: "snippet" }, { snippet: { channelId: yt.channel, videoId: h.videoId, topLevelComment: { snippet: { textOriginal: i.komentar } } } })).id;
        h.komentar = { id, url: `https://www.youtube.com/watch?v=${h.videoId}&lc=${id}`, sudahAda: !!lama, waktu: new Date().toISOString() }; h.galat = (h.galat || []).filter((x) => !x.startsWith("komentar")); catat(h);
        log(`${i.nama}: ${lama ? "komentar channel sudah ada, tidak memposting lagi" : "komentar diposting"}; pin di ${h.komentar.url}`);
      } catch (e) { h.galat = [...(h.galat || []).filter((x) => !x.startsWith("komentar")), `komentar: ${e.message}`]; catat(h); log(`${i.nama}: komentar GAGAL: ${e.message}`); }
    }
  });
}

/** Baca saja: cocokkan keadaan di YouTube dengan rencana, satu baris per hal yang diperiksa. */
export function periksa(c, { log = console.log } = {}) {
  return terkunci(c, async () => {
    const r = muat(c); if (!r) throw new Error("rencana belum dibuat");
    const yt = await klien(c.track); let beda = 0;
    const cek = (nama, hal, ok, nyata) => { if (ok === false) beda++; log(`${ok === null ? "…" : ok ? "✓" : "✗"} ${nama}: ${hal}${nyata ? ` (${nyata})` : ""}`); };
    for (const i of r.items) {
      const h = muat(c).hasil[i.nama]?.youtube; if (!h?.videoId) { cek(i.nama, "belum ada video YouTube", null); continue; }
      const v = (await yt.get("videos", { part: "snippet,status,localizations,processingDetails", id: h.videoId })).items?.[0];
      if (!v) { cek(i.nama, "video tidak ditemukan", false, h.videoId); continue; }
      const privasi = v.status.privacyStatus; const tayang = h.publishAt ? new Date(h.publishAt) : null; const sudahWaktunya = !tayang || tayang < Date.now();
      cek(i.nama, "channel", v.snippet.channelId === yt.channel);
      if (h.sumber === "alat") {
        cek(i.nama, "judul", v.snippet.title === i.judul, v.snippet.title);
        cek(i.nama, "label bahasa", v.snippet.defaultLanguage === r.youtube.bahasa && v.snippet.defaultAudioLanguage === r.youtube.bahasa, `${v.snippet.defaultLanguage} / audio ${v.snippet.defaultAudioLanguage}`);
        if (i.terjemahan?.judul) cek(i.nama, "judul Indonesia", v.localizations?.id?.title === i.terjemahan.judul, v.localizations?.id?.title ?? "tidak ada");
      }
      if (tayang && !sudahWaktunya) cek(i.nama, "jadwal terpasang", privasi === "private" && new Date(v.status.publishAt).getTime() === tayang.getTime(), `${privasi}, tayang ${tayang.toLocaleTimeString("sv-SE", { timeZone: "Asia/Jakarta" })} WIB`);
      else if (tayang) cek(i.nama, "tayang otomatis sesuai jadwal", privasi === "public" ? true : Date.now() - tayang < 3 * 60e3 ? null : false, privasi);
      else cek(i.nama, "visibilitas", privasi !== "private", privasi);
      cek(i.nama, "pemrosesan", v.processingDetails?.processingStatus === "succeeded" ? true : null, v.processingDetails?.processingStatus);
      const sub = (await yt.get("captions", { part: "snippet", videoId: h.videoId })).items ?? [];
      for (const s of i.subtitle) cek(i.nama, `subtitle ${s.bahasa}`, sub.some((x) => x.snippet.language === s.bahasa));
      if (i.playlist) cek(i.nama, `playlist "${i.playlist}"`, !!h.selesai?.playlist);
      if (i.thumbnail) cek(i.nama, "thumbnail", h.selesai?.thumbnail ? true : null, h.selesai?.thumbnail ? "terpasang" : "belum; jalankan pasca-tayang");
      if (i.komentar.trim()) cek(i.nama, "komentar pertama", h.komentar ? true : null, h.komentar ? "ada" : sudahWaktunya ? "belum; jalankan pasca-tayang" : "setelah tayang");
      ubah(c, (x) => { x.hasil[i.nama].youtube.privasi = privasi; });
    }
    log(beda ? `${beda} hal tidak cocok` : "tidak ada yang tidak cocok");
  });
}

/** Lupakan catatan unggah untuk video yang sudah tidak ada di YouTube, supaya bisa diunggah ulang.
 *  Video yang masih ada tetap dicatat (mencegah unggahan ganda). Persetujuan ikut dibatalkan. */
export function lupakanTerhapus(c, { log = console.log } = {}) {
  return terkunci(c, async () => {
    const r = muat(c); if (!r) throw new Error("rencana belum dibuat");
    const catatan = Object.entries(r.hasil).filter(([, v]) => v.youtube?.videoId);
    if (!catatan.length) return log("tidak ada catatan unggah YouTube");
    const yt = await klien(c.track);
    const ada = new Set(((await yt.get("videos", { part: "id", id: catatan.map(([, v]) => v.youtube.videoId).join(",") })).items ?? []).map((v) => v.id));
    const hilang = catatan.filter(([, v]) => !ada.has(v.youtube.videoId)).map(([n]) => n);
    for (const [n, v] of catatan) log(`${n}: ${ada.has(v.youtube.videoId) ? `masih ada di YouTube (${v.youtube.url}); catatan dipertahankan` : "sudah terhapus; catatan direset"}`);
    if (!hilang.length) return;
    ubah(c, (x) => {
      for (const n of hilang) { delete x.hasil[n].youtube; if (!Object.keys(x.hasil[n]).length) delete x.hasil[n]; for (const k of Object.keys(x.checklist)) if (k.startsWith(`${n}:yt-`)) delete x.checklist[k]; }
      x.persetujuan = null;
    });
    log("persetujuan dibatalkan; periksa jadwal lalu setujui ulang");
  });
}
