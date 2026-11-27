// Siklus uji sekali pakai (9NN-uji-alat) untuk mencoba semua fitur alat rilis dengan jadwal beberapa menit dari sekarang.
// Isinya potongan pendek dari hasil render yang sudah ada. Folder siklusnya tidak di-commit.
// Video uji BENAR-BENAR menjadi publik pada jadwalnya (tanpa notifikasi subscriber) dan harus dihapus kreator di Studio.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
import { writeJson } from "../produksi/lib.mjs";
import { ROOT, cari, muat, ubah, daftarSiklus } from "./inti.mjs";

export const JEDA = [20, 22]; // menit dari sekarang: master, Short (Facebook menolak jadwal kurang dari 10 menit)
const wib = (menit) => new Date(Math.ceil((Date.now() + menit * 60e3) / 60e3) * 60e3).toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" }).slice(0, 16).replace(" ", "T");

/** Subtitle SRT yang dipotong pada detik tertentu. */
export function potongSrt(teks, detik) {
  return teks.replace(/\r/g, "").split("\n\n").filter((b) => { const m = b.match(/(\d\d):(\d\d):(\d\d),\d+ -->/); return m && +m[1] * 3600 + +m[2] * 60 + +m[3] < detik - 1; }).join("\n\n") + "\n";
}

const potongVideo = (dari, ke, detik) => execFileSync("ffmpeg", ["-v", "error", "-y", "-i", dari, "-t", String(detik), "-c", "copy", "-movflags", "+faststart", ke]);

/** Sumber: siklus terbaru track itu yang punya master dan minimal satu Short hasil render. */
function sumber(track) {
  for (const c of daftarSiklus().filter((x) => x.track === track && !x.nama.endsWith("-uji-alat")).sort((a, b) => b.siklus.localeCompare(a.siklus))) {
    const dir = path.join(ROOT, c.render); if (!fs.existsSync(path.join(dir, "Master16x9-en.mp4"))) continue;
    const short = fs.readdirSync(dir).filter((f) => /^Short9x16-.*-en\.mp4$/.test(f) && !f.includes("audio")).sort()[0];
    if (short) return { c, dir, short, nama: short.slice("Short9x16-".length, -"-en.mp4".length) };
  }
  throw new Error(`${track} belum punya hasil render (master dan Short) untuk bahan uji`);
}

export function buatSkenario(track, { potong = potongVideo } = {}) {
  if (!/^T\d\d$/.test(track)) throw new Error("track tidak sah");
  const base = path.join(ROOT, "hasil/tracks"); const tdir = fs.readdirSync(base).find((d) => d.startsWith(track + "-")); if (!tdir) throw new Error(`Track ${track} tidak ditemukan`);
  const s = sumber(track);
  const sdir = path.join(base, tdir, "siklus"); const ada = fs.readdirSync(sdir);
  const nomor = String(Array.from({ length: 100 }, (_, i) => 900 + i).find((n) => !ada.some((d) => d.startsWith(`${n}-`))));
  const nama = `${nomor}-uji-alat`; const rel = `hasil/tracks/${tdir}/siklus/${nama}`; const dir = path.join(ROOT, rel); const render = `produksi/render/${track}/${nomor}`; const out = path.join(ROOT, render);
  fs.mkdirSync(path.join(dir, "publish"), { recursive: true }); fs.mkdirSync(out, { recursive: true });
  potong(path.join(s.dir, "Master16x9-en.mp4"), path.join(out, "Master16x9-en.mp4"), 45);
  fs.copyFileSync(path.join(s.dir, s.short), path.join(out, "Short9x16-uji-en.mp4"));
  const salin = (dari, ke) => (fs.existsSync(path.join(s.dir, dari)) ? (fs.copyFileSync(path.join(s.dir, dari), path.join(out, ke)), `${render}/${ke}`) : null);
  const thumb = { master: salin("Thumbnail-A.png", "Thumbnail-A.png"), uji: salin(`Thumbnail-Short-${s.nama}.png`, "Thumbnail-Short-uji.png") };
  const subtitle = (asal, item, detik) => ["en", "id"].flatMap((b) => { const f = path.join(s.c.dir, "publish", `${asal}.${b}.srt`); if (!fs.existsSync(f)) return []; const teks = fs.readFileSync(f, "utf8"); fs.writeFileSync(path.join(dir, "publish", `${item}.${b}.srt`), detik ? potongSrt(teks, detik) : teks); return [{ bahasa: b, file: `${rel}/publish/${item}.${b}.srt` }]; });
  writeJson(path.join(dir, "03-script.json"), { catatan: "siklus uji alat rilis, bukan konten", title_options: ["Uji alat rilis"], scenes: [], shorts_cuts: [{ name: "uji" }] });
  writeJson(path.join(dir, "05-qa.auto.json"), { verdict: "UJI-ALAT (bukan QA konten)", temuan: [], manual: ["Ini video uji. Ia akan PUBLIK pada jadwalnya; hapus di YouTube Studio setelah selesai."] });
  const jam = new Date().toLocaleTimeString("sv-SE", { timeZone: "Asia/Jakarta" }).slice(0, 5);
  const item = (n, i, x) => ({ nama: n, jadwal: wib(JEDA[i]), tag: ["uji alat"], terjemahan: { judul: "", deskripsi: "" }, playlist: "", ...x });
  writeJson(path.join(dir, "06-rilis.json"), {
    versi: 1, track, siklus: nama, dibuat: new Date().toISOString(), uji_alat: true, kunci_manual: null,
    youtube: { kategori: "27", bahasa: "en", untuk_anak: false, promosi_berbayar: false },
    items: [
      item("master", 0, { file: `${render}/Master16x9-en.mp4`, thumbnail: thumb.master, subtitle: subtitle("master", "master", 45), judul: `[UJI ALAT] Master ${jam}`, deskripsi: "Test upload from the publishing tool. It will be deleted.\n\n0:00 First part\n0:15 Second part\n0:30 Third part", komentar: "Test comment from the publishing tool.", facebook: { deskripsi: "", komentar: "Test comment on the test video." }, playlist: "UJI alat rilis", terjemahan: { judul: `[UJI ALAT] Master ${jam} (Indonesia)`, deskripsi: "Unggahan uji dari alat rilis. Akan dihapus." } }),
      item("uji", 1, { file: `${render}/Short9x16-uji-en.mp4`, thumbnail: thumb.uji, subtitle: subtitle(s.nama, "uji"), judul: `[UJI ALAT] Short ${jam} #Shorts`, deskripsi: "Test upload from the publishing tool. It will be deleted.", komentar: "Test comment on the test Short." }),
    ], persetujuan: null, hasil: {}, checklist: {},
  });
  return cari(track, nomor);
}

const wajibUji = (c) => { if (!c.nama.endsWith("-uji-alat") || !muat(c)?.uji_alat) throw new Error("hanya untuk siklus uji alat"); };
/** Geser jadwal item yang belum terunggah ke beberapa menit dari sekarang. Persetujuan batal, setujui ulang. */
export function jadwalUlang(c) {
  wajibUji(c);
  return ubah(c, (r) => r.items.forEach((i, n) => { if (!r.hasil[i.nama]?.youtube?.videoId) i.jadwal = wib(JEDA[n] ?? JEDA.at(-1)); }));
}
/** Hapus file lokal siklus uji. Video di YouTube tidak disentuh. */
export function hapusSkenario(c) {
  wajibUji(c);
  fs.rmSync(c.dir, { recursive: true, force: true }); fs.rmSync(path.join(ROOT, c.render), { recursive: true, force: true });
}
