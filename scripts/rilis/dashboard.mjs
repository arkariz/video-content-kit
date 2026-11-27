// Dashboard rilis, hanya bisa dibuka dari Mac ini.
//   node --env-file=.env scripts/rilis/dashboard.mjs [--port 4747]
// Tanpa --env-file dashboard tetap jalan (rencana, checklist, URL); tombol kirim menolak karena kredensial kosong.
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import crypto from "node:crypto";
import { pathToFileURL } from "node:url";
import { readJson } from "../produksi/lib.mjs";
import * as inti from "./inti.mjs";
import { kirim, pascaTayang, periksa, publishVar } from "./youtube.mjs";
import { buatSkenario, hapusSkenario, jadwalUlang } from "./skenario.mjs";

const UI = path.join(import.meta.dirname, "ui.html");
const logs = new Map(); const kunciLog = (c) => `${c.track}/${c.siklus}`;

function sel(c, r) {
  const lama = readJson(path.join(c.dir, "06-publish.json"), null);
  return (r?.items ?? []).map((i) => {
    const p = {};
    for (const n of inti.PLATFORM) {
      const h = r.hasil[i.nama]?.[n];
      if (h) p[n] = { status: h.galat?.length ? "gagal" : h.publishAt && new Date(h.publishAt) > new Date() ? "terjadwal" : h.privasi === "private" ? "privat" : h.sumber === "manual" ? "dicatat" : "tayang", url: h.url };
      else if (lama?.hasil?.some((x) => x.nama === i.nama && x.platforms?.includes(n))) p[n] = { status: "upload-post" };
    }
    const thumb = i.thumbnail && fs.existsSync(path.join(inti.ROOT, i.thumbnail)) ? path.basename(i.thumbnail) : null;
    return { nama: i.nama, judul: i.judul, jadwal: i.jadwal, thumb, platform: p, galat: r.hasil[i.nama]?.youtube?.galat ?? [] };
  });
}

function ringkasan() {
  return inti.daftarSiklus().map((c) => {
    const r = inti.muat(c); const qa = readJson(path.join(c.dir, "05-qa.auto.json"), null);
    return { track: c.track, siklus: c.siklus, nama: c.nama, channel: c.channel, status: c.status, tanggal: c.tanggal, adaRencana: !!r, qa: qa?.verdict ?? null, disetujui: !!r && inti.disetujui(r), kunci: r?.kunci_manual ?? null, items: sel(c, r), tugas: r ? inti.checklist(c, r) : [], masalah: r ? inti.masalah(c, r).length : 0 };
  });
}

function rinci(c) {
  const r = inti.muat(c); const dir = path.join(inti.ROOT, c.render);
  const qa = readJson(path.join(c.dir, "05-qa.auto.json"), null);
  return {
    track: c.track, siklus: c.siklus, nama: c.nama, channel: c.channel, rel: c.rel,
    rencana: r, masalah: r ? inti.masalah(c, r) : [], disetujui: !!r && inti.disetujui(r), qa, qaManual: inti.qaManual(c), ujiAlat: !!r?.uji_alat, panduan: inti.adaPanduan(c),
    tugas: r ? inti.checklist(c, r) : [], items: sel(c, r), sibuk: inti.sibuk(c), log: logs.get(kunciLog(c)) ?? [],
    berkas: fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /\.(mp4|png|jpg)$/.test(f)) : [],
    kredensial: !!process.env[publishVar(c.track)],
  };
}

/** Pekerjaan panjang berjalan di latar; kemajuannya dibaca lewat log. */
function jalankan(c, label, fn) {
  if (inti.sibuk(c)) throw new Error("siklus ini sedang diproses");
  const baris = []; logs.set(kunciLog(c), baris);
  const log = (s) => { baris.push(`${new Date().toLocaleTimeString("sv-SE")} ${s}`); if (baris.length > 200) baris.shift(); };
  log(`${label} dimulai`);
  fn(log).then(() => log(`${label} selesai`), (e) => log(`GAGAL: ${e.message}`));
}

function aksi(b) {
  if (b.aksi === "skenario") return rinci(buatSkenario(b.track));
  const c = inti.cari(b.track, b.siklus);
  const bebas = () => { if (inti.sibuk(c)) throw new Error("siklus ini sedang diproses; tunggu selesai"); };
  switch (b.aksi) {
    case "plan": inti.buatRencana(c); break;
    case "periksa": jalankan(c, "Periksa di YouTube", (log) => periksa(c, { log })); break;
    case "jadwal-uji": bebas(); jadwalUlang(c); break;
    case "hapus-uji": bebas(); hapusSkenario(c); logs.delete(kunciLog(c)); return { dihapus: true };
    case "impor": bebas(); inti.impor(c); break;
    case "sunting": bebas(); inti.sunting(c, b.item, b.data ?? {}); break;
    case "setujui": bebas(); inti.setujui(c, b.kata, "dashboard"); break;
    case "url": inti.catatUrl(c, b.item, b.platform, b.url ?? ""); break;
    case "centang": inti.centang(c, b.id, !!b.selesai); break;
    case "kirim": jalankan(c, "Kirim ke YouTube", (log) => kirim(c, { log })); break;
    case "uji": jalankan(c, "Unggah uji (privat)", (log) => kirim(c, { uji: true, log })); break;
    case "pasca": jalankan(c, "Pasca-tayang", (log) => pascaTayang(c, { log })); break;
    default: throw new Error("aksi tidak dikenal");
  }
  return rinci(c);
}

const MIME = { ".mp4": "video/mp4", ".png": "image/png", ".jpg": "image/jpeg" };
function media(req, res, q) {
  const c = inti.cari(q.get("t"), q.get("s")); const nama = path.basename(q.get("f") ?? ""); const file = path.join(inti.ROOT, c.render, nama); const mime = MIME[path.extname(nama)];
  if (!mime || !fs.existsSync(file)) { res.writeHead(404).end(); return; }
  const total = fs.statSync(file).size; const m = req.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
  let a = 0, z = total - 1;
  if (m && (m[1] || m[2])) { a = m[1] ? +m[1] : Math.max(0, total - +m[2]); z = m[1] && m[2] ? Math.min(+m[2], total - 1) : total - 1; }
  if (a > z) { res.writeHead(416, { "Content-Range": `bytes */${total}` }).end(); return; }
  res.writeHead(m ? 206 : 200, { "Content-Type": mime, "Content-Length": z - a + 1, "Accept-Ranges": "bytes", ...(m && { "Content-Range": `bytes ${a}-${z}/${total}` }) });
  fs.createReadStream(file, { start: a, end: z }).on("error", () => res.destroy()).pipe(res);
}

export function buatServer() {
  const token = crypto.randomBytes(24).toString("base64url");
  const server = http.createServer((req, res) => {
    const kirimJson = (kode, v) => res.writeHead(kode, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }).end(JSON.stringify(v));
    const port = server.address().port;
    // Host diperiksa agar situs lain tidak bisa menjangkau server lokal ini (DNS rebinding).
    if (![`127.0.0.1:${port}`, `localhost:${port}`].includes(req.headers.host)) { res.writeHead(403).end(); return; }
    const u = new URL(req.url, `http://127.0.0.1:${port}`);
    try {
      if (req.method === "GET") {
        if (u.pathname === "/") { res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Frame-Options": "DENY", "Content-Security-Policy": "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; frame-ancestors 'none'" }).end(fs.readFileSync(UI, "utf8").replace("__TOKEN__", token)); return; }
        if (u.pathname === "/api/ringkasan") return void kirimJson(200, ringkasan());
        if (u.pathname === "/api/siklus") return void kirimJson(200, rinci(inti.cari(u.searchParams.get("t"), u.searchParams.get("s"))));
        if (u.pathname === "/media") return void media(req, res, u.searchParams);
      }
      if (req.method === "POST" && u.pathname === "/api/aksi") {
        if (req.headers["x-token"] !== token) return void kirimJson(403, { galat: "token halaman tidak cocok; muat ulang halaman" });
        let isi = "";
        req.on("data", (d) => { isi += d; if (isi.length > 1e5) req.destroy(); });
        req.on("end", () => { try { kirimJson(200, aksi(JSON.parse(isi))); } catch (e) { kirimJson(400, { galat: e.message }); } });
        return;
      }
      res.writeHead(404).end();
    } catch (e) { kirimJson(400, { galat: e.message }); }
  });
  return server;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const k = process.argv.indexOf("--port"); const port = k > 0 ? Number(process.argv[k + 1]) : Number(process.env.PORT) || 4747;
  buatServer().listen(port, "127.0.0.1", () => console.log(`Dashboard rilis: http://127.0.0.1:${port}  (Ctrl+C untuk berhenti)`));
}
