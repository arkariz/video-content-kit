// Klien YouTube Data API v3 (API key atau OAuth) dan YouTube Analytics API (OAuth), tanpa dependensi.
// Env bersama: YOUTUBE_API_KEY (data publik), YOUTUBE_CLIENT_ID + YOUTUBE_CLIENT_SECRET (OAuth, tipe Desktop app).
// Per track (opsional, menggantikan yang bersama): YOUTUBE_API_KEY_<ID>, YOUTUBE_CLIENT_ID_<ID> + YOUTUBE_CLIENT_SECRET_<ID>.
// Per track (wajib untuk analitik, ditulis auth.mjs): YOUTUBE_REFRESH_TOKEN_<ID>, YOUTUBE_CHANNEL_ID_<ID>.
// Selalu jalankan dengan: node --env-file=.env ...
// Key dan token hanya dikirim lewat header atau body, tidak pernah dicetak.
import fs from "node:fs"; import path from "node:path";
import { ROOT, need } from "../produksi/lib.mjs";

export const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/yt-analytics.readonly"];
// Izin menulis (unggah, subtitle, thumbnail, playlist, komentar) untuk scripts/rilis; tokennya disimpan terpisah.
export const SCOPES_TULIS = ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.force-ssl"];
const DATA = "https://www.googleapis.com/youtube/v3";
const REPORTS = "https://youtubeanalytics.googleapis.com/v2/reports";
export const TOKEN_URL = "https://oauth2.googleapis.com/token";

/** Pemakaian kuota Data API proses ini. search.list punya jatah harian sendiri. */
export const kuota = { search: 0, lain: 0 };

/** Opsi CLI. Opsi yang diulang (mis. --q) dikumpulkan jadi array lewat `semua`. */
export function opts(argv = process.argv.slice(2)) {
  const o = {}, semua = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith("--")) throw new Error(`argumen tidak dikenal: ${argv[i]}`);
    const k = argv[i].slice(2), v = argv[i + 1] === undefined || argv[i + 1].startsWith("--") ? true : argv[++i];
    o[k] = v; (semua[k] ||= []).push(v);
  }
  return { o, semua };
}

// Gangguan jaringan (mis. connect timeout ke Google) pada permintaan baca atau token dicoba lagi.
export const jaringan = { coba: 4, jeda: 1500 };
export async function ambil(url, init) {
  const aman = (init?.method ?? "GET") === "GET" || String(url).startsWith(TOKEN_URL);
  for (let ke = 1; ; ke++) {
    try { return await fetch(url, init); }
    catch (e) {
      if (!aman || ke >= jaringan.coba) throw Object.assign(new Error(`jaringan: ${e.cause?.code ?? e.message} (${new URL(url).hostname})`), { cause: e });
      await new Promise((r) => setTimeout(r, ke * jaringan.jeda));
    }
  }
}
export async function request(url, init) {
  let res;
  // Gangguan sisi Google (5xx) pada permintaan baca dicoba lagi dua kali.
  for (let ke = 1; ; ke++) {
    res = await ambil(url, init);
    if (res.status < 500 || (init?.method ?? "GET") !== "GET" || ke === 3) break;
    await new Promise((r) => setTimeout(r, ke * 1500));
  }
  const body = await res.json().catch(() => ({}));
  if (res.ok) return body;
  const e = body.error; const reason = e?.errors?.[0]?.reason ?? (typeof e === "string" ? e : e?.status);
  const msg = e?.message ?? body.error_description ?? res.statusText;
  let saran = "";
  if (reason === "quotaExceeded") saran = " (kuota harian habis; reset tengah malam Pacific Time)";
  if (reason === "invalid_grant") saran = " (refresh token kedaluwarsa atau dicabut; jalankan ulang auth.mjs)";
  throw Object.assign(new Error(`YouTube API ${res.status} ${reason ?? ""}: ${msg}${saran}`), { status: res.status, reason });
}

/** API key milik track bila ada, kalau tidak yang bersama. */
export const apiKey = (track) => (track && process.env[`YOUTUBE_API_KEY_${track}`]) || need("YOUTUBE_API_KEY");

/** Satu panggilan Data API. auth: { token } untuk OAuth; selain itu API key ({ track } memilih key milik track). */
export function data(resource, params, auth = {}) {
  if (resource === "search") kuota.search++; else kuota.lain++;
  const headers = auth.token ? { Authorization: `Bearer ${auth.token}` } : { "X-Goog-Api-Key": apiKey(auth.track) };
  return request(`${DATA}/${resource}?${new URLSearchParams(params)}`, { headers });
}

/** videos.list / channels.list dalam kelompok 50 ID. */
export async function byIds(resource, ids, part, auth) {
  const out = [];
  for (let i = 0; i < ids.length; i += 50) out.push(...((await data(resource, { part, id: ids.slice(i, i + 50).join(","), maxResults: 50 }, auth)).items ?? []));
  return out;
}

/** ID video terbaru dari playlist upload sebuah channel. */
export async function uploads(playlistId, jumlah, auth) {
  const ids = []; let pageToken;
  do {
    const r = await data("playlistItems", { part: "contentDetails", playlistId, maxResults: Math.min(50, jumlah - ids.length), ...(pageToken && { pageToken }) }, auth);
    ids.push(...(r.items ?? []).map((x) => x.contentDetails.videoId)); pageToken = r.nextPageToken;
  } while (pageToken && ids.length < jumlah);
  return ids;
}

/** OAuth client milik track bila diisi (ID dan secret harus sepasang), kalau tidak yang bersama. */
export function oauthClient(track) {
  const akhir = process.env[`YOUTUBE_CLIENT_ID_${track}`] || process.env[`YOUTUBE_CLIENT_SECRET_${track}`] ? `_${track}` : "";
  return { client_id: need(`YOUTUBE_CLIENT_ID${akhir}`), client_secret: need(`YOUTUBE_CLIENT_SECRET${akhir}`) };
}
export const tokenVar = (track) => `YOUTUBE_REFRESH_TOKEN_${track}`;
export const channelVar = (track) => `YOUTUBE_CHANNEL_ID_${track}`;
export const tokenRequest = (params) => request(TOKEN_URL, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(params) });

/** Access token untuk channel milik satu track. Tidak ada token default, supaya analitik antar channel tidak tertukar. */
export async function accessToken(track) {
  if (!process.env[tokenVar(track)]) throw new Error(`Env ${tokenVar(track)} kosong. Hubungkan dulu: node --env-file=.env scripts/youtube/auth.mjs --track ${track}`);
  return (await tokenRequest({ ...oauthClient(track), refresh_token: process.env[tokenVar(track)], grant_type: "refresh_token" })).access_token;
}

/** reports.query untuk channel pemilik token. Mengembalikan baris sebagai objek per nama kolom. */
export async function report(token, params) {
  const r = await request(`${REPORTS}?${new URLSearchParams({ ids: "channel==MINE", ...params })}`, { headers: { Authorization: `Bearer ${token}` } });
  return (r.rows ?? []).map((row) => Object.fromEntries(r.columnHeaders.map((c, i) => [c.name, row[i]])));
}

/** Folder dan frontmatter semua track. */
export function tracks() {
  const base = path.join(ROOT, "hasil/tracks");
  return fs.readdirSync(base).filter((d) => fs.existsSync(path.join(base, d, "TRACK.md"))).map((d) => {
    const fm = fs.readFileSync(path.join(base, d, "TRACK.md"), "utf8").split(/^---$/m)[1] || "";
    const val = (k) => { const v = fm.match(new RegExp(`^${k}:[ \\t]*("[^"]*"|'[^']*'|[^#\\n]*)`, "m"))?.[1]?.trim().replace(/^["']|["']$/g, ""); return v && v !== "null" ? v : null; };
    return { id: val("id"), channel: val("channel"), dir: path.join(base, d) };
  });
}
export function trackOf(id) { const t = tracks().find((x) => x.id === id); if (!t) throw new Error(`Track ${id} tidak ditemukan`); return t; }

export const tanggal = (d = new Date()) => d.toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
export const detik = (iso = "") => { const m = iso.match(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/) ?? []; return (+(m[1] ?? 0)) * 86400 + (+(m[2] ?? 0)) * 3600 + (+(m[3] ?? 0)) * 60 + (+(m[4] ?? 0)); };
export const menit = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
export const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
/** Teks pihak ketiga (judul, nama channel) yang aman dimasukkan ke sel tabel dan teks tautan markdown. */
export const sel = (s) => String(s ?? "").replace(/\s+/g, " ").replace(/[\\|[\]<>`]/g, "\\$&").trim();

/** Tulis file baru; bila sudah ada, tambah akhiran -2, -3, ... agar laporan lama tidak tertimpa. */
export function tulisBaru(file, isi) {
  const { dir, name, ext } = path.parse(file); fs.mkdirSync(dir, { recursive: true });
  for (let n = 1; ; n++) {
    const p = n === 1 ? file : path.join(dir, `${name}-${n}${ext}`);
    try { fs.writeFileSync(p, isi, { flag: "wx" }); return p; } catch (e) { if (e.code !== "EEXIST") throw e; }
  }
}
