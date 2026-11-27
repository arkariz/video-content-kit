// Uji alat rilis tanpa jaringan dan tanpa menyentuh data asli: repo tiruan di folder sementara, API YouTube tiruan.
//   node scripts/rilis/uji.mjs
import assert from "node:assert/strict"; import fs from "node:fs"; import os from "node:os"; import path from "node:path"; import http from "node:http";

const R = fs.mkdtempSync(path.join(os.tmpdir(), "rilis-uji-")); process.env.RILIS_ROOT = R;
Object.assign(process.env, { YOUTUBE_CLIENT_ID: "uji", YOUTUBE_CLIENT_SECRET: "uji", YOUTUBE_PUBLISH_TOKEN_T09: "uji", YOUTUBE_CHANNEL_ID_T09: "UCuji" });
const tulis = (rel, isi) => { const f = path.join(R, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, isi); };
const C = "hasil/tracks/T09-uji/siklus/001-contoh";
const besok = new Date(Date.now() + 3 * 864e5).toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
tulis("hasil/tracks/T09-uji/TRACK.md", `---\nid: T09\nchannel: "Uji"\n---\n| Siklus | Topik | Status | Tanggal tayang | Catatan |\n| --- | --- | --- | --- | --- |\n| 001-contoh | x | siap-publish | ${besok} | - |\n`);
tulis(`${C}/03-script.json`, JSON.stringify({ title_options: ["Judul uji"], promise: "Janji.", tags: ["satu", "dua"], scenes: [{ id: "s01", duration_ms: { en: 20000 } }, { id: "s02", duration_ms: { en: 20000 } }, { id: "s03", duration_ms: { en: 20000 } }], chapters: [{ scene: "s01", title: "A" }, { scene: "s02", title: "B" }, { scene: "s03", title: "C" }], shorts_cuts: [{ name: "S1", hook_override: "Kail" }] }));
tulis(`${C}/05-qa.auto.json`, JSON.stringify({ verdict: "GAGAL", temuan: [] }));
tulis(`${C}/publish/master.en.srt`, "1\n00:00:00,000 --> 00:00:01,000\nhi\n");
const UKURAN = 9 * 1024 * 1024; // dua potongan unggah
for (const f of ["Master16x9-en.mp4", "Short9x16-S1-en.mp4"]) tulis(`produksi/render/T09/001/${f}`, Buffer.alloc(UKURAN, 1));
for (const f of ["Thumbnail-A.png", "Thumbnail-Short-S1.png"]) tulis(`produksi/render/T09/001/${f}`, "png");

// ---- YouTube tiruan ----
const yt = { video: {}, komentar: [], playlist: [], isiPlaylist: [], subtitle: [], thumbnail: [], putus: 0, channel: "UCuji", proses: "processing", panggilan: [] };
const asli = globalThis.fetch;
const j = (v, status = 200, headers = {}) => new Response(JSON.stringify(v), { status, headers });
globalThis.fetch = async (url, init = {}) => {
  const u = new URL(url); if (u.hostname === "127.0.0.1") return asli(url, init);
  const m = init.method ?? "GET"; yt.panggilan.push(`${m} ${u.pathname}`);
  const body = typeof init.body === "string" && init.body.startsWith("{") ? JSON.parse(init.body) : null;
  if (u.hostname === "oauth2.googleapis.com") return j({ access_token: "akses" });
  if (u.hostname === "sesi.uji") {
    const s = yt.video[u.pathname.slice(1)]; const range = init.headers["Content-Range"];
    const [, a, z] = range.match(/bytes (\d+)-(\d+)/) ?? [];
    if (a !== undefined) { if (+a > 0 && yt.putus-- > 0) throw new Error("koneksi putus"); assert.equal(+a, s.diterima); assert.equal(init.body.length, z - a + 1); s.diterima = +z + 1; }
    if (s.diterima === s.total) return j({ id: s.id, status: s.body.status });
    return new Response(null, { status: 308, headers: s.diterima ? { range: `bytes=0-${s.diterima - 1}` } : {} });
  }
  const p = u.pathname.replace(/^(\/upload)?\/youtube\/v3\//, "");
  if (p === "videos" && m === "POST") { const id = `vid${String(Object.keys(yt.video).length).padStart(8, "0")}`; yt.video[id] = { id, body, diterima: 0, total: +init.headers["X-Upload-Content-Length"] }; return new Response(null, { status: 200, headers: { location: `https://sesi.uji/${id}` } }); }
  if (p === "videos") { const v = yt.video[u.searchParams.get("id")]; return j({ items: v ? [{ snippet: { channelId: yt.channel }, status: { privacyStatus: v.publik ? "public" : v.body.status.privacyStatus }, processingDetails: { processingStatus: yt.proses } }] : [] }); }
  if (p === "channels") return j({ items: [{ id: yt.channel }] });
  if (p === "playlists" && m === "GET") return j({ items: yt.playlist });
  if (p === "playlists") { yt.playlist.push({ id: "PL1", snippet: body.snippet }); return j({ id: "PL1" }); }
  if (p === "playlistItems" && m === "GET") return j({ items: yt.isiPlaylist.filter((x) => x === u.searchParams.get("videoId")) });
  if (p === "playlistItems") { yt.isiPlaylist.push(body.snippet.resourceId.videoId); return j({}); }
  if (p === "captions" && m === "GET") return j({ items: [] });
  if (p === "captions") { yt.subtitle.push(init.body.toString()); return j({ id: "cap" }); }
  if (p === "thumbnails/set") { yt.thumbnail.push(u.searchParams.get("videoId")); return j({}); }
  if (p === "commentThreads" && m === "GET") return j({ items: yt.komentar.filter((k) => k.videoId === u.searchParams.get("videoId")).map((k) => ({ id: k.id, snippet: { topLevelComment: { snippet: { authorChannelId: { value: yt.channel } } } } })) });
  if (p === "commentThreads") { const id = `kom${yt.komentar.length}`; yt.komentar.push({ id, videoId: body.snippet.videoId, teks: body.snippet.topLevelComment.snippet.textOriginal }); return j({ id }); }
  throw new Error(`panggilan tak terduga: ${m} ${url}`);
};

const inti = await import("./inti.mjs"); const { kirim, pascaTayang, CHUNK } = await import("./youtube.mjs"); const { buatServer } = await import("./dashboard.mjs");
const diam = { log: () => {} }; let lulus = 0;
const uji = async (nama, fn) => { await fn(); lulus++; console.log("✓", nama); };
try {
  const c = inti.cari("T09", "001"); let r = inti.buatRencana(c);
  await uji("rencana: chapter, jadwal, thumbnail, subtitle", () => {
    assert.equal(r.items.length, 2); assert.match(r.items[0].deskripsi, /0:00 A\n0:2\d B/); assert.equal(r.items[0].jadwal, `${besok}T10:00`); assert.equal(r.items[1].jadwal, `${besok}T12:00`);
    assert.equal(r.items[0].subtitle.length, 1); assert.equal(r.kunci_manual, null); assert.throws(() => inti.buatRencana(c), /sudah ada/);
  });
  await uji("QA GAGAL memblokir persetujuan; kirim tanpa persetujuan ditolak", async () => {
    assert.throws(() => inti.setujui(c, "SETUJU", "uji"), /QA otomatis GAGAL/);
    await assert.rejects(kirim(c, diam), /belum disetujui/); assert.equal(yt.panggilan.length, 0);
  });
  tulis(`${C}/05-qa.auto.json`, JSON.stringify({ verdict: "LULUS-OTOMATIS", temuan: [] }));
  inti.sunting(c, "master", { komentar: "Pertanyaan?", playlist: "Seri", terjemahan: { judul: "Judul ID", deskripsi: "" } });
  await uji("persetujuan: kata harus tepat, perubahan teks atau file membatalkannya", () => {
    assert.throws(() => inti.setujui(c, "setuju", "uji"), /ketik SETUJU/);
    inti.setujui(c, "SETUJU", "uji"); assert.ok(inti.disetujui(inti.muat(c)));
    inti.sunting(c, "S1", { judul: "Lain" }); assert.ok(!inti.disetujui(inti.muat(c)));
    inti.setujui(c, "SETUJU", "uji"); fs.utimesSync(path.join(R, "produksi/render/T09/001/Thumbnail-A.png"), new Date(0), new Date(0)); assert.ok(!inti.disetujui(inti.muat(c)));
    inti.setujui(c, "SETUJU", "uji");
  });
  await uji("channel yang salah ditolak sebelum unggah", async () => {
    yt.channel = "UClain"; await assert.rejects(kirim(c, diam), /channel lain/); assert.equal(Object.keys(yt.video).length, 0); yt.channel = "UCuji";
  });
  await uji("unggah dua potongan, pulih dari koneksi putus, metadata benar", async () => {
    assert.ok(UKURAN > CHUNK); yt.putus = 1; await kirim(c, diam);
    const [m, s] = Object.values(yt.video); assert.equal(m.diterima, UKURAN); assert.equal(s.diterima, UKURAN);
    assert.equal(m.body.status.privacyStatus, "private"); assert.equal(m.body.status.publishAt, `${besok}T03:00:00.000Z`);
    assert.equal(m.body.status.containsSyntheticMedia, true); assert.equal(m.body.paidProductPlacementDetails.hasPaidProductPlacement, false); assert.equal(m.body.localizations.id.title, "Judul ID");
    assert.equal(yt.subtitle.length, 1); assert.deepEqual(yt.isiPlaylist, [m.id]); assert.deepEqual(yt.thumbnail, [m.id]); assert.equal(yt.komentar.length, 0);
    assert.ok(!fs.existsSync(path.join(c.dir, ".rilis-sesi.json"))); assert.ok(!fs.existsSync(path.join(c.dir, ".rilis.lock")));
  });
  await uji("dijalankan ulang tidak mengunggah ganda", async () => { await kirim(c, diam); assert.equal(Object.keys(yt.video).length, 2); assert.equal(yt.subtitle.length, 1); });
  await uji("pasca-tayang menunggu publik, melengkapi thumbnail Short, komentar sekali", async () => {
    await pascaTayang(c, diam); assert.equal(yt.komentar.length, 0); assert.equal(yt.thumbnail.length, 1);
    const [m] = Object.values(yt.video); m.publik = true; yt.proses = "succeeded";
    await pascaTayang(c, diam); await pascaTayang(c, diam);
    assert.equal(yt.komentar.length, 1); assert.equal(yt.komentar[0].teks, "Pertanyaan?"); assert.equal(yt.thumbnail.length, 2);
    assert.match(inti.muat(c).hasil.master.youtube.komentar.url, /&lc=kom0$/);
  });
  await uji("komentar yang sudah ada tidak diposting lagi", async () => {
    inti.ubah(c, (x) => { delete x.hasil.master.youtube.komentar; }); await pascaTayang(c, diam); assert.equal(yt.komentar.length, 1); assert.ok(inti.muat(c).hasil.master.youtube.komentar.sudahAda);
  });
  await uji("unggahan terputus total dilanjutkan dari sesi lama", async () => {
    inti.ubah(c, (x) => { delete x.hasil.S1; }); inti.sunting(c, "master", { jadwal: "" }); inti.sunting(c, "S1", { jadwal: "" }); inti.setujui(c, "SETUJU", "uji");
    const sebelum = Object.keys(yt.video).length; yt.putus = 99; await assert.rejects(kirim(c, diam));
    yt.putus = 0; await kirim(c, diam); assert.equal(Object.keys(yt.video).length, sebelum + 1); assert.equal(Object.values(yt.video).at(-1).diterima, UKURAN);
  });
  await uji("mode uji: privat, tanpa jadwal, tanpa playlist, dicatat terpisah", async () => {
    inti.sunting(c, "S1", { playlist: "Seri" }); await kirim(c, { uji: true, ...diam });
    const v = Object.values(yt.video).at(-1); assert.equal(v.body.status.privacyStatus, "private"); assert.equal(v.body.status.publishAt, undefined); assert.match(v.body.snippet.title, /^\[UJI\]/); assert.ok(!yt.isiPlaylist.includes(v.id)); assert.ok(inti.muat(c).hasil["S1-uji"]);
  });
  await uji("siklus unggah manual dikunci; URL manual dipakai checklist dan komentar", async () => {
    inti.ubah(c, (x) => { x.kunci_manual = "manual"; x.hasil = {}; });
    inti.catatUrl(c, "master", "youtube", "https://youtu.be/vid00000000"); inti.catatUrl(c, "master", "facebook", "https://www.facebook.com/x/videos/1");
    assert.throws(() => inti.catatUrl(c, "master", "youtube", "javascript:alert(1)"), /https/);
    inti.setujui(c, "SETUJU", "uji"); await assert.rejects(kirim(c, diam), /dikunci/);
    const t = inti.checklist(c, inti.muat(c)); assert.equal(t.find((x) => x.id === "S1:fb-komentar").salin, "Full video: https://www.facebook.com/x/videos/1");
    inti.centang(c, "master:yt-cards", true); assert.ok(inti.muat(c).checklist["master:yt-cards"]); assert.throws(() => inti.centang(c, "x:y", true), /tidak dikenal/);
    const n = yt.komentar.length; yt.komentar.length = 0; await pascaTayang(c, diam); assert.equal(yt.komentar.length, 1, `sebelumnya ${n}`);
  });
  await uji("dashboard: token wajib, host asing ditolak, path media dibatasi", async () => {
    const s = buatServer(); await new Promise((ok) => s.listen(0, "127.0.0.1", ok)); const port = s.address().port; const base = `http://127.0.0.1:${port}`;
    try {
      const html = await (await fetch(base)).text(); const token = html.match(/const TOKEN = "([\w-]+)"/)[1];
      const post = (h) => fetch(`${base}/api/aksi`, { method: "POST", headers: h, body: JSON.stringify({ track: "T09", siklus: "001", aksi: "centang", id: "master:yt-cards", selesai: false }) });
      assert.equal((await post({})).status, 403); assert.equal((await post({ "X-Token": token })).status, 200);
      assert.equal((await (await fetch(`${base}/api/ringkasan`)).json()).length, 1);
      const m = await fetch(`${base}/media?t=T09&s=001&f=Master16x9-en.mp4`, { headers: { Range: "bytes=0-9" } }); assert.equal(m.status, 206); assert.equal((await m.arrayBuffer()).byteLength, 10);
      assert.equal((await fetch(`${base}/media?t=T09&s=001&f=${encodeURIComponent("../../../../hasil/tracks/T09-uji/TRACK.md")}`)).status, 404);
      const asing = await new Promise((ok) => http.get({ host: "127.0.0.1", port, path: "/api/ringkasan", headers: { Host: "jahat.example" } }, (res) => { res.resume(); ok(res.statusCode); }));
      assert.equal(asing, 403);
    } finally { s.close(); }
  });
  console.log(`\n${lulus} uji lulus (API tiruan; belum membuktikan perilaku API YouTube sungguhan).`);
} finally { fs.rmSync(R, { recursive: true, force: true }); }
