// Mencatat unggahan manual (sudah tayang atau terjadwal) ke dashboard, dari platform dan dari catatan di repo.
//   node --env-file=.env scripts/rilis/catat-tayang.mjs [--lihat]
// Hanya membaca platform. Siklus yang cocok dibuatkan rencana dan DIKUNCI agar tidak terunggah dua kali.
// Isian yang sudah ada tidak ditimpa. Instagram dan TikTok hanya dari catatan di repo.
import fs from "node:fs"; import path from "node:path"; import { pathToFileURL } from "node:url";
import { readJson } from "../produksi/lib.mjs";
import { accessToken, data, tokenVar as bacaVar } from "../youtube/lib.mjs";
import { ROOT, PLATFORM, buatRencana, daftarSiklus, idYouTube, muat, sibuk, ubah } from "./inti.mjs";
import { bacaPanduan } from "./panduan.mjs";
import { klien as klienYT, publishVar } from "./youtube.mjs";
import { klien as klienFB, tokenVar as fbVar } from "./facebook.mjs";

const norm = (s) => String(s ?? "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const wib = (d) => new Date(d).toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" }).slice(0, 16).replace(" ", "T");
const detikISO = (s = "") => { const m = s.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/) ?? []; return (+(m[1] ?? 0)) * 3600 + (+(m[2] ?? 0)) * 60 + (+(m[3] ?? 0)); };

/** Semua konten semua siklus satu track, dengan teks yang bisa dipakai mencocokkan. */
export function kandidat(track) {
  return daftarSiklus().filter((c) => c.track === track && !c.nama.endsWith("-uji-alat")).flatMap((c) => {
    const script = readJson(path.join(c.dir, "03-script.json")); const r = muat(c);
    const nama = ["master", ...(script.shorts_cuts || []).map((x) => x.name)];
    const f = path.join(c.dir, "06-publish-manual.md"); const panduan = fs.existsSync(f) ? bacaPanduan(fs.readFileSync(f, "utf8"), nama) : {};
    return nama.map((n, k) => {
      const item = r?.items.find((x) => x.nama === n);
      // Postingan Facebook sering diawali kalimat pertama deskripsi, bukan judul.
      const awal = [item?.deskripsi, panduan[n]?.deskripsi].map((d) => String(d ?? "").split("\n")[0]);
      const kunci = [item?.judul, panduan[n]?.judul, ...awal, ...(n === "master" ? [script.publish_title, ...(script.title_options || [])] : [script.shorts_cuts[k - 1].hook_override])];
      return { c, nama: n, kunci: [...new Set(kunci.map(norm).filter((x) => x.length >= 12))] };
    });
  });
}

/** Konten yang paling cocok untuk sebuah video; null bila tidak ada atau lebih dari satu yang sama kuat. */
export function cocokkan(daftar, v) {
  const teks = [v.judul, String(v.teks ?? "").split("\n")[0]].map(norm).filter(Boolean);
  const nilai = daftar.map((k) => {
    // Durasi memisahkan master dari Short yang judulnya mirip.
    if (v.detik && (k.nama === "master" ? v.detik <= 100 : v.detik > 180)) return [0, k];
    let n = 0;
    for (const a of k.kunci) for (const b of teks) n = Math.max(n, a === b ? 1000 + a.length : Math.min(a.length, b.length) >= 25 && (b.startsWith(a) || a.startsWith(b)) ? Math.min(a.length, b.length) : 0);
    return [n, k];
  }).filter(([n]) => n > 0).sort((a, b) => b[0] - a[0]);
  return nilai.length && (nilai.length === 1 || nilai[0][0] > nilai[1][0]) ? nilai[0][1] : null;
}

async function videoYouTube(track) {
  let get;
  if (process.env[publishVar(track)]) get = (await klienYT(track)).get;
  else if (process.env[bacaVar(track)]) { const token = await accessToken(track); get = (r, q) => data(r, q, { token }); }
  else return null;
  const up = (await get("channels", { part: "contentDetails", mine: "true" })).items?.[0]?.contentDetails.relatedPlaylists.uploads;
  const ids = []; let pageToken;
  do { const r = await get("playlistItems", { part: "contentDetails", playlistId: up, maxResults: "50", ...(pageToken && { pageToken }) }); ids.push(...(r.items ?? []).map((x) => x.contentDetails.videoId)); pageToken = r.nextPageToken; } while (pageToken && ids.length < 200);
  const out = [];
  for (let n = 0; n < ids.length; n += 50) for (const v of (await get("videos", { part: "snippet,status,contentDetails", id: ids.slice(n, n + 50).join(",") })).items ?? []) {
    const jadwal = v.status.publishAt; if (v.status.privacyStatus === "private" && !jadwal) continue; // draf atau uji privat
    out.push({ platform: "youtube", videoId: v.id, url: `https://www.youtube.com/watch?v=${v.id}`, judul: v.snippet.title, teks: v.snippet.description, detik: detikISO(v.contentDetails.duration), publishAt: jadwal ?? null, waktu: jadwal ?? v.snippet.publishedAt, privasi: v.status.privacyStatus });
  }
  return out;
}

async function videoFacebook(track, log) {
  if (!process.env[fbVar(track)]) return null;
  const fb = klienFB(track); const url = (u) => new URL(u, "https://www.facebook.com").href; const out = [];
  const ambil = async (tepi, fields) => { try { return (await fb.get(`${fb.page}/${tepi}`, { fields, limit: "100" })).data ?? []; } catch (e) { log(`Facebook ${track} ${tepi}: ${e.message}`); return []; } };
  for (const v of await ambil("videos", "id,title,description,permalink_url,created_time,length,published")) if (v.published !== false && v.permalink_url) out.push({ platform: "facebook", url: url(v.permalink_url), judul: v.title, teks: v.description, detik: v.length ? Math.round(v.length) : 0, publishAt: null, waktu: v.created_time });
  for (const p of await ambil("scheduled_posts", "id,message,scheduled_publish_time,permalink_url")) if (p.scheduled_publish_time) { const t = new Date(p.scheduled_publish_time * 1000).toISOString(); out.push({ platform: "facebook", url: p.permalink_url ? url(p.permalink_url) : `https://www.facebook.com/${p.id}`, teks: p.message, detik: 0, publishAt: t, waktu: t }); }
  return out;
}

/** URL yang sudah tercatat di 06-publish.json dan baris "- <item>: ... URL" di 06-publish.md. */
export function dariCatatan(c) {
  const out = []; const platform = (u) => PLATFORM.find((p) => new URL(u).hostname.includes(p === "youtube" ? "youtu" : p));
  const tambah = (nama, u) => { const p = platform(u); if (p) out.push({ nama, platform: p, url: u, ...(p === "youtube" && { videoId: idYouTube(u) }) }); };
  for (const h of readJson(path.join(c.dir, "06-publish.json"), {}).hasil ?? []) for (const x of h.urls ?? []) if (/^https:\/\//.test(x.url ?? "")) tambah(h.nama, x.url);
  const md = path.join(c.dir, "06-publish.md");
  if (fs.existsSync(md)) for (const baris of fs.readFileSync(md, "utf8").split("\n")) { const m = baris.match(/^- ([\w-]+): (.*)$/); if (m) for (const u of m[2].match(/https:\/\/[^\s()"'<>]+/g) ?? []) tambah(m[1], u.replace(/[.,;]$/, "")); }
  return out;
}

export async function catatTayang({ log = console.log, lihat = false } = {}) {
  const siklus = daftarSiklus().filter((c) => !c.nama.endsWith("-uji-alat")); const temuan = []; // { c, nama, v }
  for (const c of siklus) for (const v of dariCatatan(c)) temuan.push({ c, nama: v.nama, v });
  for (const track of [...new Set(siklus.map((c) => c.track))]) {
    const daftar = kandidat(track);
    for (const [label, ambil] of [["YouTube", videoYouTube], ["Facebook", videoFacebook]]) {
      let video; try { video = await ambil(track, log); } catch (e) { log(`${label} ${track}: GAGAL ${e.message}`); continue; }
      if (!video) { log(`${label} ${track}: belum terhubung, hanya memakai catatan di repo`); continue; }
      for (const v of video.filter((x) => !String(x.judul ?? "").startsWith("[UJI"))) {
        const k = cocokkan(daftar, v);
        if (k) temuan.unshift({ c: k.c, nama: k.nama, v }); // data platform didahulukan dari catatan
        else log(`${label} ${track}: tidak cocok dengan siklus mana pun: ${v.judul || String(v.teks ?? "").split("\n")[0].slice(0, 60) || v.url}`);
      }
    }
  }
  let baru = 0;
  for (const c of siklus) {
    const milik = temuan.filter((t) => t.c.dir === c.dir); if (!milik.length) continue;
    const label = `${c.track}-${c.siklus}`;
    if (sibuk(c)) { log(`${label}: sedang diproses, dilewati`); continue; }
    let r = muat(c);
    const kosong = (x, t) => x.items.some((i) => i.nama === t.nama) && !x.hasil[t.nama]?.[t.v.platform];
    if (lihat) { for (const t of milik) if (!r || kosong(r, t)) log(`${label} ${t.nama} ${t.v.platform}: ${t.v.url}`); continue; }
    r ||= buatRencana(c);
    if (!milik.some((t) => kosong(r, t))) continue;
    ubah(c, (x) => {
      for (const t of milik) {
        if (!kosong(x, t)) continue;
        const { platform, url, videoId, publishAt, privasi, waktu } = t.v;
        (x.hasil[t.nama] ||= {})[platform] = { sumber: "manual", url, ...(videoId && { videoId }), ...(publishAt && { publishAt }), ...(privasi && { privasi }), dicatat: new Date().toISOString() };
        const i = x.items.find((y) => y.nama === t.nama); if (waktu && (platform === "youtube" || !x.hasil[t.nama].youtube)) i.jadwal = wib(waktu);
        baru++; log(`${label} ${t.nama} ${platform}: dicatat ${url}`);
      }
      if (!x.kunci_manual) { x.kunci_manual = "sudah tayang atau terjadwal manual (dicatat dari platform)"; x.persetujuan = null; log(`${label}: unggah dikunci`); }
    });
  }
  log(lihat ? "mode lihat: tidak ada yang ditulis" : baru ? `${baru} unggahan dicatat` : "tidak ada unggahan baru untuk dicatat");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) catatTayang({ lihat: process.argv.includes("--lihat") }).catch((e) => { console.error("GAGAL:", e.message); process.exit(1); });
