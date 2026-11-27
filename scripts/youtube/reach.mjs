// Impressions dan CTR thumbnail lewat YouTube Reporting API (laporan massal channel_reach_basic_a1).
// Job dibuat sekali per channel. Menurut dokumentasi, laporan pertama muncul dalam sekitar 48 jam, mencakup 30 hari sebelum
// job dibuat, dan hanya disimpan Google 30 sampai 60 hari. Karena itu tiap hari data diarsipkan di hasil/youtube-reach/<channelId>.json.
// Rujukan: https://developers.google.com/youtube/reporting/v1/reports
import path from "node:path";
import { ROOT, readJson, writeJson } from "../produksi/lib.mjs";
import { request } from "./lib.mjs";

const BASE = "https://youtubereporting.googleapis.com/v1";
const JENIS = "channel_reach_basic_a1";

async function semua(url, kunci, token) {
  const out = []; let pageToken;
  do {
    const r = await request(`${url}${pageToken ? `?${new URLSearchParams({ pageToken })}` : ""}`, { headers: { Authorization: `Bearer ${token}` } });
    out.push(...(r[kunci] ?? [])); pageToken = r.nextPageToken;
  } while (pageToken);
  return out;
}

/** Job laporan jangkauan milik channel pemilik token; dibuat bila belum ada. */
export async function reachJob(token) {
  const cari = async () => (await semua(`${BASE}/jobs`, "jobs", token)).find((j) => j.reportTypeId === JENIS);
  const ada = await cari(); if (ada) return { ...ada, baru: false };
  try {
    const j = await request(`${BASE}/jobs`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ reportTypeId: JENIS, name: "video-content-kit reach" }) });
    return { ...j, baru: true };
  } catch (e) { if (e.status !== 409) throw e; return { ...(await cari()), baru: false }; }
}

function baca(csv) {
  const [kepala, ...baris] = csv.trim().split(/\r?\n/).map((l) => l.split(","));
  const kolom = (...nama) => { const i = kepala.findIndex((k) => nama.includes(k)); if (i < 0) throw new Error(`kolom ${nama[0]} tidak ada di laporan; kolom: ${kepala.join(", ")}`); return i; };
  const d = kolom("date", "day"), v = kolom("video_id"), n = kolom("video_thumbnail_impressions"), c = kolom("video_thumbnail_impressions_ctr");
  return baris.map((b) => [b[d].replace(/^(\d{4})(\d\d)(\d\d)$/, "$1-$2-$3"), b[v], Number(b[n]) || 0, Number(b[c]) || 0]);
}

/** Unduh laporan yang belum diarsipkan (laporan pengganti dengan createTime lebih baru menimpa periodenya). */
export async function sinkronReach(token, channelId) {
  const job = await reachJob(token);
  const file = path.join(ROOT, "hasil/youtube-reach", `${channelId}.json`);
  const arsip = readJson(file, { jenis: JENIS, periode: {} });
  const terbaru = new Map(); // periode -> laporan dengan createTime terbaru
  for (const r of await semua(`${BASE}/jobs/${encodeURIComponent(job.id)}/reports`, "reports", token))
    if (!terbaru.has(r.startTime) || r.createTime > terbaru.get(r.startTime).createTime) terbaru.set(r.startTime, r);
  let diunduh = 0;
  for (const [periode, r] of terbaru) {
    if (arsip.periode[periode]?.createTime >= r.createTime) continue;
    // Token hanya dikirim ke host Google.
    const u = new URL(r.downloadUrl); if (u.protocol !== "https:" || !u.hostname.endsWith(".googleapis.com")) throw new Error(`host unduhan tidak dikenal: ${u.hostname}`);
    const res = await fetch(u, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`unduh laporan gagal: ${res.status}`);
    arsip.periode[periode] = { createTime: r.createTime, baris: baca(await res.text()) }; diunduh++;
  }
  if (diunduh) writeJson(file, arsip);
  const baris = Object.values(arsip.periode).flatMap((p) => p.baris);
  // Dokumentasi tidak menyebut skala CTR (0-1 atau 0-100): bila ada nilai di atas 1, anggap sudah persen.
  const persen = baris.some((b) => b[3] > 1) ? 1 : 100;
  const hari = baris.map((b) => b[0]).sort();
  return {
    job, diunduh, dari: hari[0] ?? null, sampai: hari.at(-1) ?? null, file: path.relative(ROOT, file),
    /** Total impressions dan CTR tertimbang (%) satu video sejak tanggal `mulai`; null bila tidak ada data. */
    video(id, mulai) {
      let imp = 0, klik = 0;
      for (const [tgl, v, n, ctr] of baris) if (v === id && tgl >= mulai) { imp += n; klik += n * ctr * persen / 100; }
      return imp ? { imp, ctr: (klik / imp) * 100 } : null;
    },
  };
}
