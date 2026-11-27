// QA otomatis (bagian terprogram dari instruksi/06-qa-anti-slop.md). Menulis 05-qa.auto.json dan 05-qa.auto.md.
// Satu temuan kritis = GAGAL. Item yang butuh manusia ditandai "manual", tidak pernah dianggap lulus.
import fs from "node:fs"; import path from "node:path";
import { ROOT, args, resolveCycle, readJson, pauseSec } from "../produksi/lib.mjs"; import { cekR3 } from "./qa-r3.mjs"; import { cekKemasan } from "./kemasan.mjs";
const o = args(); const { dir, scriptPath, assetsPath } = resolveCycle(o.track, o.siklus);
const script = readJson(scriptPath), stage = readJson(path.join(dir, "04-stage.json"), {}), vspec = readJson(path.join(dir, "04-visual-spec.json"), {}), assets = readJson(assetsPath, { footage: [] });
const trackDir = path.dirname(path.dirname(dir)); const trackMd = fs.readFileSync(path.join(trackDir, "TRACK.md"), "utf8");
const exceptions = (trackMd.match(/^pengecualian_qa:\s*\[(.*)\]/m)?.[1] || "").split(",").map((s) => s.replace(/["'\s]/g, "")).filter(Boolean);
const F = []; const add = (layer, level, id, msg, fix) => F.push({ layer, level, id, msg, fix });
const sc = script.scenes; const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);

// timeline
let t = 0; const start = {}; sc.forEach((s, i) => { start[s.id] = t; t += (s.duration_ms?.en || 0) / 1000 + pauseSec(sc[i + 1]); });
const total = t; const mm = (x) => `${Math.floor(x / 60)}:${String(Math.floor(x % 60)).padStart(2, "0")}`;
const missingDur = sc.filter((s) => !s.duration_ms?.en).map((s) => s.id);
if (missingDur.length) add("Audio", "kritis", "A0", `scene tanpa audio EN: ${missingDur.join(", ")}`, "jalankan tts.mjs");
if (total < 480) add("Struktur", "kritis", "S1", `durasi ${mm(total)} < 8:00 (syarat mid-roll)`, "tambah scene isi, bukan jeda");

// re-hook
const marks = [0, ...sc.filter((s) => s.role === "rehook").map((s) => start[s.id]), total]; let worst = 0, at = 0;
for (let i = 1; i < marks.length; i++) if (marks[i] - marks[i - 1] > worst) { worst = marks[i] - marks[i - 1]; at = marks[i - 1]; }
if (worst > 100) add("Struktur", "sedang", "S2", `jarak re-hook terpanjang ${Math.round(worst)} dtk mulai ${mm(at)} (target 60-90)`, "ubah satu scene di rentang itu jadi re-hook");

// footage
const fset = new Set(assets.footage.map((f) => f.scene_id)); const fsec = sc.filter((s) => fset.has(s.id)).reduce((a, s) => a + s.duration_ms.en / 1000, 0); const share = fsec / total;
if (share > 0.34) add("Visual", "kritis", "V1", `footage stok ${(share * 100).toFixed(0)}% > sepertiga`, "kurangi scene footage");
let run = 0, maxRun = 0; sc.forEach((s) => { run = fset.has(s.id) ? run + 1 : 0; maxRun = Math.max(maxRun, run); });
if (maxRun > 2) add("Visual", "sedang", "V2", `${maxRun} scene footage berurutan`, "selang-seling dengan adegan kartun");
if (share < 0.1 && assets.footage.length) add("Visual", "kecil", "V3", `footage hanya ${(share * 100).toFixed(0)}% (target komposisi 20-30%)`, "tambah kunci PEXELS_API_KEY atau kata kunci b-roll");
for (const f of assets.footage) if (!fs.existsSync(path.join(ROOT, "produksi", f.file))) add("Visual", "kritis", "V4", `file footage hilang: ${f.file}`, "jalankan footage.mjs download");
const noLic = assets.footage.filter((f) => !f.catalog_key); if (noLic.length) add("Visual", "kritis", "V5", "footage tanpa catatan lisensi", "unduh lewat footage.mjs");

// stage/spec lengkap
for (const s of sc) { if (!stage[s.id]) add("Visual", "kritis", "V6", `scene ${s.id} tanpa adegan`, "isi 04-stage.json"); else if (stage[s.id].insert && !vspec[s.id]) add("Visual", "kritis", "V6", `scene ${s.id} insert tanpa spec`, "isi 04-visual-spec.json"); }

// gaya wajib: ilustrasi gerak penjelas R3 (instruksi/referensi/gaya-visual.md, sejak 2026-11-26).
// Siklus yang dirender sebelum aturan ini memakai mesin lama: T01-001 kartun datar, T02-001 diorama.
const mesinLama = { T01: ["001"], T02: ["001"] }[o.track]?.includes(o.siklus);
if (!mesinLama) for (const f of cekR3(script, { footageIds: fset, captions: readJson(path.join(ROOT, "produksi/captions", o.track, o.siklus, "en.json"), {}), scriptPath, track: o.track })) add(f.layer, f.level, f.id, f.msg, f.fix);

// teks: pola
for (const l of ["en", "id"]) for (const s of sc) { const x = s.narration[l]; if (/—|–/.test(x)) add("Teks " + l.toUpperCase(), "sedang", "T-em", `${s.id}: em dash`, "ganti titik/koma"); if (l === "en" && /\b(it.s|it is|this is) not\b[^.]*\b(it.s|but)\b|\bnot just\b/i.test(x)) add("Teks EN", "sedang", "T-neg", `${s.id}: kontras "bukan X tapi Y"`, "tulis langsung hal yang benar"); }
const idp = /di era|tidak dapat dipungkiri|perlu diingat|penting untuk dicatat|mari kita|yuk,|tanpa basa-basi|hal ini menunjukkan|memainkan peran|menjadi kunci|semoga bermanfaat|tak hanya itu|lebih lanjut|bukan hanya/i; for (const s of sc) if (idp.test(s.narration.id)) add("Teks ID", "sedang", "T-id", `${s.id}: frasa slop ID`, "tulis ulang santai");
const open = sc[0]?.narration.en || ""; if (/in today|let's dive|have you ever wondered|welcome/i.test(open)) add("Teks EN", "kritis", "T-open", "pembuka basa-basi", "mulai dari hasil/masalah");

// bubble
let bang = 0, echo = 0; const echoIds = [];
for (const [id, st] of Object.entries(stage)) for (const a of st.actors || []) if (a.say) { bang += (a.say.text.match(/[!?]/g) || []).length; const b = new Set(norm(a.say.text)), n = new Set(norm(sc.find((x) => x.id === id)?.narration.en || "")); const inter = [...b].filter((w) => n.has(w)).length; if (b.size >= 3 && inter / b.size >= 0.6) { echo++; echoIds.push(id); } }
if (echo > 8) add("Teks (bubble)", "sedang", "B1", `${echo} bubble mengulang narasi: ${echoIds.slice(0, 8).join(", ")}…`, "ganti jadi candaan/reaksi atau hapus");
if (bang > 24) add("Teks (bubble)", "kecil", "B2", `${bang} tanda seru/tanya di bubble`, "kurangi");

// sumber
const nSrc = (script.sources || []).length; if (nSrc < Math.ceil(sc.length / 10)) add("Teks", "sedang", "T-src", `sumber di 03-script.json ${nSrc}, perlu minimal ${Math.ceil(sc.length / 10)} (satu klaim fakta = satu tautan)`, "tambah `sources:[{scene,url,claim}]`");

// audio: transkrip balik vs istilah
const rawP = path.join(ROOT, "produksi/captions", o.track, o.siklus, "en.raw.json"); const raw = readJson(rawP, null) || readJson(path.join(ROOT, "produksi/captions", o.track, o.siklus, "en.json"), null);
if (!raw) add("Audio", "kritis", "A1", "caption EN belum ada", "jalankan captions.mjs");
else for (const p of script.pronunciations || []) { if (!/^[a-z]+$/i.test(p.term)) continue; for (const s of sc) if (new RegExp(`\\b${p.term}\\b`, "i").test(s.narration.en)) { const got = (raw[s.id] || []).map((w) => w.text.toLowerCase().replace(/[^a-z]/g, "")).join(" "); if (!got.includes(p.term.toLowerCase().replace(/[^a-z]/g, ""))) ((assets.ucapan_diterima?.scenes || []).includes(s.id) ? (cat, _t, ...x) => add(cat, "sedang", x[0], `${x[1]}; DITERIMA kreator ${assets.ucapan_diterima.tanggal} setelah didengar`, "tetap tercatat; dengar ulang bila audio scene ini dibuat ulang") : add)("Audio", "kritis", "A2", `${s.id}: transkrip balik tidak memuat "${p.term}" (dugaan salah ucap)`, "ubah/hapus say_as, buat ulang audio scene ini, dengarkan"); } }
if (!assets.voice?.type) add("Audio", "sedang", "A3", "jenis/lisensi suara belum dicatat (assets.voice.type)", "catat: clone milik kreator atau voice berlisensi komersial, paket berbayar");
// musik latar: tiap konten punya musik utama sendiri dan musik mood untuk scene tertentu (keputusan kreator 2026-11-27)
{ const audio = readJson(path.join(dir, "04-audio.json"), null); const extraDir = (t, c) => path.join(ROOT, "produksi/audio", t, c, "extra", "music.mp3");
  const mine = extraDir(o.track, o.siklus);
  if (!audio) add("Audio", "sedang", "A4", "04-audio.json belum ada (musik dan efek suara)", "tulis sesuai PIPELINE.md bagian Suara");
  else {
    if (!(audio.mood_music ?? []).length) add("Audio", "sedang", "A5", "tidak ada musik mood untuk scene tertentu", "tambah mood_music di 04-audio.json");
    if (fs.existsSync(mine)) { const sama = []; const base = path.join(ROOT, "produksi/audio"); const bytes = fs.readFileSync(mine);
      for (const t of fs.readdirSync(base)) { if (!fs.statSync(path.join(base, t)).isDirectory()) continue; for (const c of fs.readdirSync(path.join(base, t))) { const f = extraDir(t, c); if (f !== mine && fs.existsSync(f) && bytes.equals(fs.readFileSync(f))) sama.push(`${t}/${c}`); } }
      if (sama.length) add("Audio", "sedang", "A4", `musik utama sama dengan ${sama.join(", ")}`, "buat musik baru untuk konten ini"); }
  } }
// thumbnail
if (!fs.existsSync(path.join(ROOT, "produksi/render", o.track, o.siklus, "Thumbnail-A.png"))) add("Visual", "sedang", "V7", "thumbnail belum dibuat", "render Thumbnail varian A dan B");
// thumbnail Shorts dan caption per kalimat: wajib untuk semua siklus selain siklus lama (caption_mode "word")
{ const lama = script.caption_mode === "word";
  for (const c of script.shorts_cuts || []) {
    if (!c.thumbnail && !lama) add("Visual", "kritis", "V8", `Short ${c.name} tanpa "thumbnail" di shorts_cuts`, "tulis thumbnail tegak untuk tiap Short");
    else if (c.thumbnail && !fs.existsSync(path.join(ROOT, "produksi/render", o.track, o.siklus, `Thumbnail-Short-${c.name}.png`))) add("Visual", "sedang", "V8", `thumbnail Short ${c.name} belum dirender`, "render.mjs --thumb");
  } }
// manual
// kemasan: lint judul + thumbnail (title.py, saran) dan aturan chapter YouTube
for (const f of cekKemasan(script)) F.push(f);
const manual = ["Dengarkan audio: nada, artefak TTS, pengucapan istilah (kemunculan pertama)", "Tonton master dan Shorts: irama, kecepatan animasi, bubble tidak menutup isi", "Periksa fakta tiap klaim terhadap sumber", "Setujui thumbnail dan judul"];

const crit = F.filter((f) => f.level === "kritis"); const verdict = crit.length ? "GAGAL" : "LULUS-OTOMATIS (menunggu pemeriksaan manual)";
const out = { track: o.track, siklus: o.siklus, tanggal: new Date().toISOString().slice(0, 10), durasi: mm(total), footage_pct: +(share * 100).toFixed(1), verdict, temuan: F, manual };
fs.writeFileSync(path.join(dir, "05-qa.auto.json"), JSON.stringify(out, null, 2) + "\n");
const md = `# QA otomatis: siklus ${o.siklus}\n\nTanggal: ${out.tanggal} · Durasi ${out.durasi} · Footage ${out.footage_pct}%\n\n## Keputusan otomatis: ${verdict}\n\nQA otomatis tidak pernah menyatakan LULUS final. Item manual di bawah wajib dicek kreator.\n\n| # | Lapisan | Tingkat | Temuan | Perbaikan |\n| --- | --- | --- | --- | --- |\n${F.map((f) => `| ${f.id} | ${f.layer} | ${f.level} | ${f.msg} | ${f.fix} |`).join("\n") || "| - | - | - | tidak ada | - |"}\n\n## Pemeriksaan manual\n\n${manual.map((m) => `- [ ] ${m}`).join("\n")}\n`;
fs.writeFileSync(path.join(dir, "05-qa.auto.md"), md);
console.log(`QA otomatis ${o.track}/${o.siklus}: ${verdict} | durasi ${out.durasi} | footage ${out.footage_pct}% | temuan: kritis ${crit.length}, sedang ${F.filter((f) => f.level === "sedang").length}, kecil ${F.filter((f) => f.level === "kecil").length}`);
for (const f of F) console.log(` [${f.level}] ${f.id} ${f.layer}: ${f.msg}`);
process.exit(crit.length ? 2 : 0);
