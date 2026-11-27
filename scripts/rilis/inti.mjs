// Inti alat rilis: membaca siklus, menyusun rencana, persetujuan, checklist manual.
// Sumber data per siklus: 06-rilis.json (rencana, persetujuan, hasil, checklist). Boleh diedit sebelum disetujui.
// RILIS_ROOT mengganti akar repo (dipakai uji.mjs agar data asli tidak tersentuh).
import fs from "node:fs"; import path from "node:path"; import crypto from "node:crypto";
import { ROOT as REPO, readJson, writeJson } from "../produksi/lib.mjs";
import { sceneStarts } from "../pipeline/kemasan.mjs";

export const ROOT = process.env.RILIS_ROOT || REPO;
const ada = (rel) => fs.existsSync(path.join(ROOT, rel));
const baca = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");

/** Folder siklus yang punya 03-script.json, beserta data barisnya di TRACK.md. */
export function daftarSiklus() {
  const base = path.join(ROOT, "hasil/tracks");
  return fs.readdirSync(base).flatMap((t) => {
    const sk = path.join(base, t, "siklus"); if (!fs.existsSync(sk)) return [];
    return fs.readdirSync(sk).filter((s) => fs.existsSync(path.join(sk, s, "03-script.json"))).map((s) => cari(t.split("-")[0], s.split("-")[0]));
  });
}

export function cari(track, siklus) {
  if (!/^T\d\d$/.test(track) || !/^\d{3}$/.test(siklus)) throw new Error("track/siklus tidak sah (contoh: T01 002)");
  const base = path.join(ROOT, "hasil/tracks");
  const tdir = fs.readdirSync(base).find((d) => d.startsWith(track + "-")); if (!tdir) throw new Error(`Track ${track} tidak ditemukan`);
  const sdir = fs.readdirSync(path.join(base, tdir, "siklus")).find((d) => d.startsWith(siklus + "-")); if (!sdir) throw new Error(`Siklus ${siklus} tidak ditemukan di ${tdir}`);
  const dir = path.join(base, tdir, "siklus", sdir);
  const md = baca(path.join(base, tdir, "TRACK.md"));
  const kolom = md.split("\n").find((l) => l.startsWith(`| ${sdir} `))?.split("|").map((x) => x.trim()) ?? [];
  return {
    track, siklus, nama: sdir, dir, rel: path.relative(ROOT, dir), render: `produksi/render/${track}/${siklus}`,
    channel: md.match(/^channel:[ \t]*"?([^"#\n]*)/m)?.[1]?.trim() ?? "", status: kolom[3] ?? "", tanggal: kolom[4]?.match(/20\d\d-\d\d-\d\d/)?.[0] ?? null,
  };
}

export const fileRilis = (c) => path.join(c.dir, "06-rilis.json");
export const muat = (c) => readJson(fileRilis(c), null);
export const simpan = (c, r) => writeJson(fileRilis(c), r);
/** Baca ulang, ubah, tulis: supaya suntingan di dashboard dan hasil unggah tidak saling menimpa. */
export function ubah(c, fn) { const r = muat(c); if (!r) throw new Error("rencana belum dibuat"); fn(r); simpan(c, r); return r; }

/** Kunci per siklus: satu pekerjaan kirim pada satu waktu, juga antara CLI dan dashboard. */
export async function terkunci(c, fn) {
  const f = path.join(c.dir, ".rilis.lock");
  try { fs.writeFileSync(f, String(process.pid), { flag: "wx" }); }
  catch (e) {
    if (e.code !== "EEXIST") throw e;
    if (hidup(Number(baca(f)))) throw new Error("siklus ini sedang diproses; tunggu selesai");
    fs.writeFileSync(f, String(process.pid)); // sisa proses yang sudah mati
  }
  try { return await fn(); } finally { fs.rmSync(f, { force: true }); }
}
const hidup = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };
export const sibuk = (c) => { const f = path.join(c.dir, ".rilis.lock"); return fs.existsSync(f) && hidup(Number(baca(f))); };

const fmtT = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const JAM = ["10:00", "12:00", "16:00", "19:00"];

/** Rencana awal dari naskah dan hasil render. Tidak menimpa rencana yang sudah ada. */
export function buatRencana(c) {
  if (muat(c)) throw new Error("06-rilis.json sudah ada; edit di dashboard atau hapus dulu bila belum ada yang terkirim");
  const script = readJson(path.join(c.dir, "03-script.json"));
  const { start } = sceneStarts(script.scenes || []);
  const chapters = (script.chapters || []).filter((x) => start[x.scene] !== undefined);
  const sumber = [...new Set((script.sources || []).map((s) => s.url).filter((u) => /^https?:\/\//.test(u)))];
  const tags = script.tags || [];
  const hash = tags.slice(0, 3).map((t) => "#" + t.replace(/[^\p{L}\p{N}]/gu, "")).join(" ");
  const deskripsi = [script.promise, chapters.length >= 3 ? chapters.map((x) => `${fmtT(start[x.scene])} ${x.title}`).join("\n") : "", "Narration uses a synthetic voice.", sumber.length ? `Sources:\n${sumber.join("\n")}` : "", hash].filter(Boolean).join("\n\n");
  const srt = (nama, bhs) => { const f = `${c.rel}/publish/${nama}.${bhs}.srt`; return ada(f) ? [{ bahasa: bhs, file: f }] : []; };
  const gambar = (f) => (ada(f) ? f : null);
  const item = (nama, i, x) => ({ nama, jadwal: c.tanggal ? `${c.tanggal}T${JAM[Math.min(i, JAM.length - 1)]}` : "", subtitle: [...srt(nama, "en"), ...srt(nama, "id")], playlist: "", terjemahan: { judul: "", deskripsi: "" }, ...x });
  const items = [item("master", 0, { file: `${c.render}/Master16x9-en.mp4`, thumbnail: gambar(`${c.render}/Thumbnail-A.png`), judul: script.publish_title || script.title_options?.[0] || "", deskripsi, tag: tags, komentar: "" })];
  (script.shorts_cuts || []).forEach((s, i) => items.push(item(s.name, i + 1, { file: `${c.render}/Short9x16-${s.name}-en.mp4`, thumbnail: gambar(`${c.render}/Thumbnail-Short-${s.name}.png`), judul: String(s.hook_override ?? s.name).slice(0, 100), deskripsi: `${s.hook_override ?? ""}\n\nFull video on the channel.\nNarration uses a synthetic voice.\n\n${hash} #Shorts`.trim(), tag: [...tags.slice(0, 3), "shorts"], komentar: "" })));
  // Siklus yang sudah (atau akan) diunggah lewat jalur lain dikunci agar tidak terunggah dua kali.
  const lama = readJson(path.join(c.dir, "06-publish.json"), null);
  const alasan = c.status === "tayang" ? "status siklus di TRACK.md sudah tayang" : lama?.hasil?.length ? "sudah pernah dikirim lewat Upload-Post" : /Jangan jalankan `approve\.mjs`/.test(baca(path.join(c.dir, "06-publish-manual.md"))) ? "catatan 06-publish-manual.md: diunggah manual" : null;
  const r = { versi: 1, track: c.track, siklus: c.nama, dibuat: new Date().toISOString(), kunci_manual: alasan, youtube: { kategori: "27", bahasa: "en", label_ai: true, untuk_anak: false, promosi_berbayar: false }, items, persetujuan: null, hasil: {}, checklist: {} };
  simpan(c, r); return r;
}

export const waktu = (jadwal) => (jadwal ? new Date(`${jadwal}:00+07:00`) : null);

/** Hal yang membuat rencana tidak boleh disetujui. */
export function masalah(c, r) {
  const m = [];
  const qa = readJson(path.join(c.dir, "05-qa.auto.json"), null);
  if (!qa) m.push("QA otomatis belum dijalankan"); else if (qa.verdict === "GAGAL") m.push("QA otomatis GAGAL");
  for (const i of r.items) {
    const p = (s) => m.push(`${i.nama}: ${s}`); const sudah = r.hasil[i.nama]?.youtube?.videoId;
    if (!sudah && !r.kunci_manual) {
      if (!ada(i.file)) p(`file video tidak ada (${i.file})`);
      if (!i.judul.trim()) p("judul kosong");
      if (i.jadwal && !(waktu(i.jadwal) > Date.now() + 5 * 60e3)) p("jadwal sudah lewat atau kurang dari 5 menit lagi (ubah, atau kosongkan untuk tayang segera)");
    }
    for (const [label, judul, desk] of [["", i.judul, i.deskripsi], [" terjemahan", i.terjemahan?.judul ?? "", i.terjemahan?.deskripsi ?? ""]]) {
      if (judul.length > 100) p(`judul${label} lebih dari 100 karakter`);
      if (Buffer.byteLength(desk) > 5000) p(`deskripsi${label} lebih dari 5000 byte`);
      if (/[<>]/.test(judul + desk)) p(`judul/deskripsi${label} memuat < atau > (ditolak YouTube)`);
    }
    if (i.tag.join(",").length > 500) p("tag lebih dari 500 karakter");
    for (const f of [i.thumbnail, ...i.subtitle.map((s) => s.file)].filter(Boolean)) if (!ada(f)) p(`file tidak ada (${f})`);
  }
  return m;
}

/** Status QA manual (05-qa.md) untuk ditampilkan saat menyetujui. */
export function qaManual(c) {
  const t = baca(path.join(c.dir, "05-qa.md")); if (!t) return "belum ada 05-qa.md";
  return t.split("\n").find((l) => /Keputusan|LULUS|GAGAL|DILEWATI/.test(l))?.replace(/[*#]/g, "").trim() ?? "ada, tanpa keputusan terbaca";
}

/** Sidik isi yang disetujui: teks, jadwal, setelan, dan ukuran+waktu ubah setiap file. */
export function sidik(r) {
  const berkas = (f) => { try { const s = fs.statSync(path.join(ROOT, f)); return [f, s.size, Math.round(s.mtimeMs)]; } catch { return [f, null]; } };
  const isi = { y: r.youtube, kunci: r.kunci_manual, items: r.items.map((i) => ({ ...i, berkas: [i.file, i.thumbnail, ...i.subtitle.map((s) => s.file)].filter(Boolean).map(berkas) })) };
  return crypto.createHash("sha256").update(JSON.stringify(isi)).digest("hex");
}
export const disetujui = (r) => !!r.persetujuan && r.persetujuan.sidik === sidik(r);

export function setujui(c, kata, via) {
  if (kata !== "SETUJU") throw new Error("ketik SETUJU (huruf besar) untuk menyetujui");
  return ubah(c, (r) => {
    const m = masalah(c, r); if (m.length) throw new Error(`belum bisa disetujui: ${m.join("; ")}`);
    r.persetujuan = { sidik: sidik(r), waktu: new Date().toISOString(), via, qa_manual: qaManual(c) };
  });
}

const BIDANG = ["judul", "deskripsi", "komentar", "jadwal", "playlist", "tag", "terjemahan"];
/** Suntingan dari dashboard. Perubahan apa pun membatalkan persetujuan (sidik berbeda). */
export function sunting(c, nama, data) {
  return ubah(c, (r) => {
    const i = r.items.find((x) => x.nama === nama); if (!i) throw new Error(`item ${nama} tidak ada`);
    for (const k of BIDANG) if (data[k] !== undefined) {
      if (k === "tag") i.tag = String(data.tag).split(",").map((s) => s.trim()).filter(Boolean);
      else if (k === "terjemahan") i.terjemahan = { judul: String(data.terjemahan.judul ?? ""), deskripsi: String(data.terjemahan.deskripsi ?? "") };
      else if (k === "jadwal") { if (data.jadwal && !/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(data.jadwal)) throw new Error("format jadwal: 2026-11-28T10:00"); i.jadwal = data.jadwal; }
      else i[k] = String(data[k]);
    }
  });
}

export const idYouTube = (url) => String(url).match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/video\/)([\w-]{11})(?![\w-])/)?.[1] ?? null;
export const PLATFORM = ["youtube", "facebook", "instagram", "tiktok"];
/** URL tayang yang diisi tangan (unggahan manual). URL kosong menghapus catatan manual itu. */
export function catatUrl(c, nama, platform, url) {
  if (!PLATFORM.includes(platform)) throw new Error("platform tidak dikenal");
  url = String(url).trim();
  if (url && !/^https:\/\/[^\s"'<>]+$/.test(url)) throw new Error("URL harus diawali https://");
  return ubah(c, (r) => {
    if (!r.items.some((x) => x.nama === nama)) throw new Error(`item ${nama} tidak ada`);
    const h = (r.hasil[nama] ||= {}); const lama = h[platform];
    if (lama && lama.sumber !== "manual") throw new Error("hasil ini dicatat oleh alat; tidak ditimpa dari isian manual");
    if (!url) { delete h[platform]; return; }
    const videoId = platform === "youtube" ? idYouTube(url) : undefined;
    if (platform === "youtube" && !videoId) throw new Error("URL YouTube tidak dikenali");
    h[platform] = { sumber: "manual", url, ...(videoId && { videoId }), dicatat: new Date().toISOString() };
  });
}

/** Tugas yang tidak bisa (atau belum bisa) dikerjakan alat. */
export function checklist(c, r) {
  const T = []; const url = (n, p) => r.hasil[n]?.[p]?.url ?? ""; const vid = (n) => r.hasil[n]?.youtube?.videoId;
  const studio = (n) => (vid(n) ? `https://studio.youtube.com/video/${vid(n)}/edit` : "https://studio.youtube.com");
  const tambah = (item, kunci, label, x = {}) => T.push({ id: `${item}:${kunci}`, item, label, ...x, selesai: r.checklist[`${item}:${kunci}`] ?? null });
  const dub = fs.existsSync(path.join(ROOT, c.render)) && fs.readdirSync(path.join(ROOT, c.render)).filter((f) => /-audio-[a-z]+\.m4a$/.test(f));
  for (const i of r.items) {
    const n = i.nama, master = n === "master", hy = r.hasil[n]?.youtube;
    if (!vid(n) && r.kunci_manual) tambah(n, "yt-unggah", "Unggah ke YouTube, lalu catat URL-nya", { tautan: "https://studio.youtube.com" });
    if (i.komentar || r.kunci_manual) tambah(n, "yt-pin", hy?.komentar ? "Pin komentar di YouTube" : "Komentar pertama dan pin di YouTube", { tautan: hy?.komentar?.url ?? studio(n), salin: hy?.komentar ? "" : i.komentar });
    if (master) {
      tambah(n, "yt-endscreen", "End screen: Subscribe dan video berikutnya (5–20 detik terakhir)", { tautan: studio(n) });
      tambah(n, "yt-cards", "Cards bila naskah merujuk video lain (maks. 5)", { tautan: studio(n) });
      tambah(n, "yt-ab", "A/B test judul dan thumbnail (maks. 3)", { tautan: studio(n) });
      if (dub?.length) tambah(n, "yt-audio", `Multi audio: ${dub.filter((f) => f.startsWith("Master")).join(", ") || dub.join(", ")}`, { tautan: studio(n) });
      tambah(n, "yt-midroll", "Mid-roll di jeda antar bab (bila monetisasi aktif)", { tautan: studio(n) });
      tambah(n, "fb-unggah", "Facebook: unggah master penuh sebagai video Page, subtitle publish/master.en_US.srt, lalu catat URL", { salin: `${i.judul}\n\n${i.deskripsi}` });
    } else {
      tambah(n, "yt-terkait", "Pasang video terkait: master (master harus sudah publik)", { tautan: studio(n), salin: url("master", "youtube") });
      tambah(n, "fb-unggah", "Facebook: unggah Reel, lalu catat URL", { salin: i.deskripsi });
      tambah(n, "fb-komentar", "Facebook: komentar berisi tautan master Facebook, lalu pin", { tautan: url(n, "facebook"), salin: url("master", "facebook") ? `Full video: ${url("master", "facebook")}` : "", catatan: url("master", "facebook") ? "" : "catat dulu URL master Facebook" });
      tambah(n, "ig-unggah", "Instagram: unggah Reel (label AI nyala), lalu catat URL", { salin: i.deskripsi });
      tambah(n, "ig-komentar", "Instagram: komentar pertama dan pin", { tautan: url(n, "instagram") });
      tambah(n, "ig-story", "Instagram Story: bagikan Reel dengan stiker tautan ke master YouTube", { salin: url("master", "youtube") });
      tambah(n, "tt-unggah", "TikTok: unggah, lalu catat URL", { salin: i.deskripsi });
    }
  }
  return T;
}
export function centang(c, id, selesai) {
  return ubah(c, (r) => {
    if (!checklist(c, r).some((t) => t.id === id)) throw new Error("tugas tidak dikenal");
    if (selesai) r.checklist[id] = new Date().toISOString(); else delete r.checklist[id];
  });
}
