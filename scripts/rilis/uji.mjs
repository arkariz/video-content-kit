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
const yt = { video: {}, komentar: [], playlist: [], isiPlaylist: [], subtitle: [], thumbnail: [], putus: 0, channel: "UCuji", proses: "processing", panggilan: [], params: [] };
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
  if (p === "videos" && m === "POST") { yt.params.push(u.searchParams.get("notifySubscribers")); const id = `vid${String(Object.keys(yt.video).length).padStart(8, "0")}`; yt.video[id] = { id, body, diterima: 0, total: +init.headers["X-Upload-Content-Length"] }; return new Response(null, { status: 200, headers: { location: `https://sesi.uji/${id}` } }); }
  if (p === "videos" && u.searchParams.get("part") === "id") return j({ items: u.searchParams.get("id").split(",").filter((x) => yt.video[x]).map((id) => ({ id })) });
  if (p === "videos") { const v = yt.video[u.searchParams.get("id")]; return j({ items: v ? [{ snippet: { channelId: yt.channel, ...v.body.snippet }, localizations: v.body.localizations, status: { privacyStatus: v.publik ? "public" : v.body.status.privacyStatus, publishAt: v.body.status.publishAt }, processingDetails: { processingStatus: yt.proses } }] : [] }); }
  if (p === "channels") return j({ items: [{ id: yt.channel }] });
  if (p === "playlists" && m === "GET") return j({ items: yt.playlist });
  if (p === "playlists") { yt.playlist.push({ id: "PL1", snippet: body.snippet, status: body.status }); return j({ id: "PL1" }); }
  if (p === "playlistItems" && m === "GET") return j({ items: yt.isiPlaylist.filter((x) => x === u.searchParams.get("videoId")) });
  if (p === "playlistItems") { if (yt.belumDikenal-- > 0) return j({ error: { message: "tidak ditemukan", errors: [{ reason: "playlistNotFound" }] } }, 404); yt.isiPlaylist.push(body.snippet.resourceId.videoId); return j({}); }
  if (p === "captions" && m === "GET") return j({ items: [] });
  if (p === "captions") { yt.subtitle.push(init.body.toString()); return j({ id: "cap" }); }
  if (p === "thumbnails/set") { yt.thumbnail.push(u.searchParams.get("videoId")); return j({}); }
  if (p === "commentThreads" && m === "GET") return j({ items: yt.komentar.filter((k) => k.videoId === u.searchParams.get("videoId")).map((k) => ({ id: k.id, snippet: { topLevelComment: { snippet: { authorChannelId: { value: yt.channel } } } } })) });
  if (p === "commentThreads") { const id = `kom${yt.komentar.length}`; yt.komentar.push({ id, videoId: body.snippet.videoId, teks: body.snippet.topLevelComment.snippet.textOriginal }); return j({ id }); }
  throw new Error(`panggilan tak terduga: ${m} ${url}`);
};

const inti = await import("./inti.mjs"); const { kirim, pascaTayang, CHUNK } = await import("./youtube.mjs"); const { buatServer } = await import("./dashboard.mjs");
const diam = { log: () => {}, tunggu: 0 }; let lulus = 0;
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
    assert.ok(!("containsSyntheticMedia" in m.body.status)); assert.equal(m.body.paidProductPlacementDetails.hasPaidProductPlacement, false); assert.equal(m.body.localizations.id.title, "Judul ID");
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
  await uji("panduan unggah mengisi rencana; tugas menunggu dan tercentang sendiri", () => {
    tulis(`${C}/06-publish-manual.md`, "## 10.00: Master di YouTube\n- Judul:\n\n```text\nDari panduan\n```\n\nJudul cadangan:\n\n```text\nCadangan\n```\n- Tag:\n```text\na, b\n```\n- Komentar pin:\n```text\nTanya?\n```\n## Short 1\n- File: `x`\n**Judul** (catatan)\n```\nJudul short\n```\n");
    const x = inti.impor(c); const [m, s] = x.items;
    assert.equal(m.judul, "Dari panduan"); assert.deepEqual(m.tag, ["a", "b"]); assert.equal(m.komentar, "Tanya?"); assert.equal(s.judul, "Judul short"); assert.ok(!inti.disetujui(x));
    inti.ubah(c, (r) => { r.hasil = {}; r.checklist = {}; });
    const t = () => Object.fromEntries(inti.checklist(c, inti.muat(c)).map((v) => [v.id, v]));
    assert.match(t()["master:yt-cards"].tunggu, /URL YouTube/); assert.equal(t()["S1:tt-unggah"].selesai, null);
    inti.catatUrl(c, "S1", "tiktok", "https://www.tiktok.com/@x/video/1"); assert.ok(t()["S1:tt-unggah"].selesai);
  });
  await uji("skenario uji: jadwal dekat, tanpa notifikasi, playlist unlisted, periksa, hapus", async () => {
    const { buatSkenario, jadwalUlang, hapusSkenario, potongSrt } = await import("./skenario.mjs"); const { periksa } = await import("./youtube.mjs");
    assert.equal(potongSrt("1\n00:00:01,000 --> 00:00:02,000\na\n\n2\n00:01:00,000 --> 00:01:02,000\nb\n", 45).includes("b"), false);
    const s = buatSkenario("T09", { potong: (a, b) => fs.copyFileSync(a, b) }); let x = inti.muat(s);
    assert.equal(s.siklus, "900"); assert.equal(x.items.length, 2); const menit = (inti.waktu(x.items[0].jadwal) - Date.now()) / 60000; assert.ok(menit > 11 && menit <= 13, String(menit));
    inti.ubah(s, (v) => (v.items[0].jadwal = "2020-01-01T00:00")); jadwalUlang(s); assert.ok(inti.waktu(inti.muat(s).items[0].jadwal) > Date.now());
    inti.setujui(s, "SETUJU", "uji"); yt.playlist.length = 0; yt.params.length = 0; await kirim(s, diam);
    assert.ok(yt.params.every((p) => p === "false")); assert.equal(yt.playlist[0].status.privacyStatus, "unlisted");
    const baris = []; await periksa(s, { log: (v) => baris.push(v) }); assert.ok(baris.some((v) => v.startsWith("✓ master: jadwal terpasang")), baris.join("\n"));
    assert.throws(() => hapusSkenario(c), /hanya untuk siklus uji/); hapusSkenario(s); assert.ok(!fs.existsSync(s.dir));
  });
  await uji("kirim menunggu pemrosesan lalu memasang thumbnail Short", async () => {
    inti.ubah(c, (x) => { x.kunci_manual = null; x.hasil = {}; x.items.forEach((i) => (i.jadwal = "")); }); inti.setujui(c, "SETUJU", "uji");
    yt.proses = "processing"; yt.thumbnail.length = 0; setTimeout(() => (yt.proses = "succeeded"), 60);
    await kirim(c, { log: () => {}, tunggu: 3000, selang: 10 });
    const h = inti.muat(c).hasil; assert.equal(yt.thumbnail.length, 2); assert.ok(h.S1.youtube.selesai.thumbnail);
  });
  await uji("penjadwal: komentar saat tayang, sekali; terlambat dan belum disetujui dilewati", async () => {
    const { antrean, putaran, BATAS } = await import("./jadwal.mjs"); const { plist } = await import("./layanan.mjs");
    const pesan = [], opsi = { log: () => {}, beri: (v) => pesan.push(v) };
    const tayang = new Date(Date.now() + 3600e3);
    inti.ubah(c, (x) => { x.items[1].komentar = "S1?"; x.hasil = Object.fromEntries(x.items.map((i, n) => { const id = `jdw0000000${n}`; yt.video[id] = { id, publik: true, body: { snippet: {}, status: { privacyStatus: "private" } } }; return [i.nama, { youtube: { sumber: "alat", videoId: id, publishAt: tayang.toISOString(), diunggah: new Date().toISOString(), selesai: { playlist: 1, "subtitle-en": 1, thumbnail: 1 } } }]; })); });
    inti.setujui(c, "SETUJU", "uji"); yt.komentar.length = 0; yt.panggilan.length = 0; yt.proses = "succeeded";
    await putaran(opsi); assert.equal(yt.panggilan.length, 0, "belum waktunya: tanpa panggilan API");
    const saat = tayang.getTime() + 60e3;
    inti.sunting(c, "S1", { komentar: "S1 berubah?" }); await putaran({ ...opsi, kini: saat }); assert.equal(yt.komentar.length, 0, "berubah setelah disetujui");
    inti.setujui(c, "SETUJU", "uji"); await putaran({ ...opsi, kini: saat }); await putaran({ ...opsi, kini: saat + 3e5 });
    assert.equal(yt.komentar.length, 2); assert.equal(pesan.filter((v) => v.includes("pin sekarang")).length, 2);
    inti.ubah(c, (x) => delete x.hasil.S1.youtube.komentar); yt.komentar.length = 0; pesan.length = 0;
    const telat = tayang.getTime() + BATAS + 60e3; await putaran({ ...opsi, kini: telat }); await putaran({ ...opsi, kini: telat + 3e5 });
    assert.equal(yt.komentar.length, 0); assert.equal(pesan.length, 1); assert.equal(antrean(inti.muat(c), telat).find((a) => a.nama === "S1").keadaan, "terlewat");
    const p = plist("penjadwal", { node: "/n", root: "/a & b", logFile: "/l" }); assert.match(p, /<string>--env-file-if-exists=\/a &amp; b\/\.env<\/string>/); assert.match(p, /StartInterval/); assert.match(plist("dashboard", { node: "/n", root: "/r", logFile: "/l" }), /KeepAlive/);
  });
  await uji("reset hanya melupakan video yang sudah terhapus", async () => {
    const { lupakanTerhapus } = await import("./youtube.mjs"); delete yt.video.jdw00000001;
    await lupakanTerhapus(c, { log: () => {} }); const r = inti.muat(c);
    assert.ok(r.hasil.master.youtube); assert.equal(r.hasil.S1, undefined); assert.equal(r.persetujuan, null);
  });
  await uji("tombol sistem: pasang dan copot layanan (launchctl tiruan), dashboard diganti launchd", async () => {
    const L = await import("./layanan.mjs"); const asliAda = fs.existsSync(path.join((await import("../produksi/lib.mjs")).ROOT, ".env"));
    Object.assign(process.env, { RILIS_AGENTS_DIR: path.join(R, "agen"), RILIS_LAUNCHCTL: "/usr/bin/true" });
    const keluar = []; const s = buatServer({ keluar: (_, lalu) => keluar.push(lalu) }); await new Promise((ok) => s.listen(0, "127.0.0.1", ok)); const base = `http://127.0.0.1:${s.address().port}`;
    try {
      const token = (await (await fetch(base)).text()).match(/const TOKEN = "([\w-]+)"/)[1];
      const post = async (b) => { const r = await fetch(`${base}/api/aksi`, { method: "POST", headers: { "X-Token": token }, body: JSON.stringify(b) }); return [r.status, await r.json()]; };
      if (asliAda) {
        let [kode, v] = await post({ aksi: "penjadwal", pasang: true }); assert.equal(kode, 200, v.galat); assert.ok(v.penjadwal.terpasang && L.terpasang("penjadwal"));
        [kode, v] = await post({ aksi: "penjadwal", pasang: false }); assert.equal(v.penjadwal.terpasang, false);
        await post({ aksi: "dashboard-otomatis", pasang: true }); assert.equal(L.terpasang("dashboard"), false, "baru dipasang setelah port dikosongkan"); keluar.pop()(); assert.ok(L.terpasang("dashboard"));
        await post({ aksi: "dashboard-otomatis", pasang: false }); assert.equal(L.terpasang("dashboard"), false);
      }
      const [kode] = await post({ aksi: "mulai-ulang" }); assert.equal(kode, 400);
    } finally { s.close(); delete process.env.RILIS_AGENTS_DIR; delete process.env.RILIS_LAUNCHCTL; }
  });
  await uji("hubungkan channel: tautan, konfirmasi, simpan", async () => {
    const H = await import("./hubungkan.mjs"); let dimuat = 0;
    const tiruan = `process.stdout.write("Buka:\\nhttps://accounts.google.com/o/oauth2/v2/auth?x=1\\n"); setTimeout(()=>process.stdout.write('Tersambung ke channel "Uji" (@uji).\\nSimpan? Ketik ya: '),150); process.stdin.on("data",(d)=>process.exit(String(d).trim()==="ya"?0:1));`;
    const tunggu = async (tahap) => { for (let n = 0; n < 100 && H.status()?.tahap !== tahap; n++) await new Promise((r) => setTimeout(r, 20)); assert.equal(H.status().tahap, tahap); };
    H.mulai("T09", { perintah: [process.execPath, "-e", tiruan], selesai: () => dimuat++ });
    assert.throws(() => H.setujuiChannel(), /belum ada channel/); await tunggu("izin"); assert.match(H.status().url, /accounts\.google\.com/);
    await tunggu("konfirmasi"); assert.equal(H.status().channel, "Uji (@uji)"); H.setujuiChannel(); await tunggu("selesai"); assert.equal(dimuat, 1);
    H.batal(); assert.equal(H.status(), null);
  });
  await uji("playlist baru yang belum dikenali dicoba ulang", async () => {
    const y = await import("./youtube.mjs"); y.tunda.playlist = 1;
    inti.ubah(c, (x) => { x.hasil = {}; x.items.forEach((i) => { i.playlist = ""; i.thumbnail = null; }); x.items[0].playlist = "Baru"; }); inti.setujui(c, "SETUJU", "uji");
    yt.playlist.length = 0; yt.isiPlaylist.length = 0; yt.belumDikenal = 2; await kirim(c, diam);
    const h = inti.muat(c).hasil.master.youtube; assert.ok(h.selesai.playlist, String(h.galat)); assert.equal(yt.playlist.length, 1); assert.equal(yt.isiPlaylist.length, 1);
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
