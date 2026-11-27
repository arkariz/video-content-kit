// Analitik channel milik satu track (instruksi/08) lewat YouTube Analytics API. Butuh OAuth: jalankan auth.mjs dulu.
//   node --env-file=.env scripts/youtube/analitik.mjs --track T02 [--hari 28] [--video ID1,ID2] [--retensi]
// Tanpa --hari, angka tiap video dihitung sejak tayang. --retensi juga menulis CSV retensi untuk retensi.mjs.
// Isi laporan: angka terkini (Data API, tanpa jeda), metrik per video, impressions + CTR thumbnail (reach.mjs),
// sumber trafik, kata kunci pencarian, negara, status subscriber.
// Keluaran: hasil/tracks/<ID>/analitik/youtube-<tanggal>.md. "Viewed vs swiped away" tetap dari YouTube Studio.
import fs from "node:fs"; import path from "node:path";
import { ROOT, readJson } from "../produksi/lib.mjs";
import { sinkronReach } from "./reach.mjs";
import { accessToken, byIds, channelVar, data, detik, menit, opts, report, sel, tanggal, trackOf, tracks, tulisBaru, uploads } from "./lib.mjs";

const { o } = opts(); if (typeof o.track !== "string") throw new Error("Wajib: --track T02");
const hari = o.hari === undefined ? null : Number(o.hari); if (hari !== null && !(hari >= 1)) throw new Error("--hari harus angka minimal 1");
const track = trackOf(o.track); const token = await accessToken(track.id); const auth = { token };

const channel = (await data("channels", { part: "snippet,contentDetails", mine: "true" }, auth)).items?.[0];
if (!channel) throw new Error("token tidak punya channel; jalankan ulang auth.mjs");
const harap = process.env[channelVar(track.id)];
if (harap && harap !== channel.id) throw new Error(`token ${track.id} milik channel ${channel.id}, tetapi ${channelVar(track.id)} = ${harap}; jalankan ulang auth.mjs --track ${track.id}`);

// Peta video -> siklus: ID dari 06-rilis.json (dashboard rilis) dan hasil publish, lalu judul persis dari rencana dan 03-script.json.
// Hashtag di akhir judul (juga "# tag") ditambahkan saat unggah manual, jadi diabaikan saat mencocokkan.
const normal = (s) => String(s ?? "").replace(/(\s*#\s*[\p{L}\p{N}_]+)+\s*$/u, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const perId = new Map(), perJudul = new Map(); const sdir = path.join(track.dir, "siklus");
for (const d of fs.existsSync(sdir) ? fs.readdirSync(sdir).filter((x) => /^\d{3}/.test(x)).sort() : []) {
  const siklus = d.slice(0, 3); const pub = readJson(path.join(sdir, d, "06-publish.json"), {}); const script = readJson(path.join(sdir, d, "03-script.json"), {});
  const judul = (t, cut) => t && perJudul.set(normal(t), { siklus, cut });
  const cutOf = (nama) => (nama && nama !== "master" ? nama : null);
  if (d.endsWith("-uji-alat")) continue;
  const rilis = readJson(path.join(sdir, d, "06-rilis.json"), {});
  for (const t of [script.publish_title, ...(script.title_options ?? [])]) judul(t, null);
  for (const c of script.shorts_cuts ?? []) judul(String(c.hook_override ?? "").slice(0, 95), c.name);
  for (const i of pub.items ?? []) judul(i.title, cutOf(i.nama));
  for (const i of rilis.items ?? []) judul(i.judul, cutOf(i.nama));
  for (const h of pub.hasil ?? []) for (const x of h.detail ?? []) if (x.platform === "youtube" && x.platform_post_id) perId.set(x.platform_post_id, { siklus, cut: cutOf(h.nama) });
  // ID yang dicatat alat rilis (diunggah alat atau dicatat dari platform) adalah bukti terkuat.
  for (const [nama, h] of Object.entries(rilis.hasil ?? {})) if (h.youtube?.videoId && !nama.endsWith("-uji")) perId.set(h.youtube.videoId, { siklus, cut: cutOf(nama) });
}

const diminta = typeof o.video === "string" ? o.video.split(",").map((x) => x.trim()).filter(Boolean) : null;
const ids = diminta ?? await uploads(channel.contentDetails.relatedPlaylists.uploads, 200, auth);
let videos = (await byIds("videos", ids, "snippet,contentDetails,status,statistics", auth)).filter((v) => v.snippet.liveBroadcastContent !== "upcoming");
const asing = videos.filter((v) => v.snippet.channelId !== channel.id);
if (asing.length) throw new Error(`video bukan milik channel ${channel.snippet.title}: ${asing.map((v) => v.id).join(", ")}`);
// Cadangan: judul siklus yang cukup panjang diikuti tambahan saat unggah (mis. nama game); ambil yang terpanjang.
const awalan = (j) => perJudul.get([...perJudul.keys()].filter((k) => k.length >= 25 && j.startsWith(`${k} `)).sort((a, b) => b.length - a.length)[0]);
const cocok = (v) => perId.get(v.id) ?? perJudul.get(normal(v.snippet.title)) ?? awalan(normal(v.snippet.title));
// Channel yang dipakai beberapa track: hanya video yang terbukti milik siklus track ini (analitik selalu per track).
const berbagi = tracks().filter((t) => t.id !== track.id && ((t.channel && t.channel === track.channel) || process.env[channelVar(t.id)] === channel.id));
let dilewati = 0;
if (!diminta && berbagi.length) { dilewati = videos.length; videos = videos.filter(cocok); dilewati -= videos.length; }

const pacific = (d) => d.toLocaleDateString("sv-SE", { timeZone: "America/Los_Angeles" }); // tanggal laporan Analytics
const sampai = pacific(new Date());
const METRIK = ["views", "engagedViews", "estimatedMinutesWatched", "averageViewDuration", "averageViewPercentage", "subscribersGained", "subscribersLost", "likes", "comments", "shares"];
async function metrik(q) {
  try { return (await report(token, { ...q, metrics: METRIK.join(",") }))[0]; }
  catch (e) { if (e.status !== 400) throw e; return (await report(token, { ...q, metrics: METRIK.filter((m) => m !== "engagedViews").join(",") }))[0]; }
}

const baris = [], terkini = [], sumber = [], cari = [], negara = [], subs = [], retensi = [], catatan = [];
let reach = null;
try {
  reach = await sinkronReach(token, channel.id);
  if (reach.job.baru) catatan.push("Job laporan CTR baru dibuat. Data pertama muncul sekitar 48 jam lagi; jalankan ulang setelahnya.");
  else if (!reach.dari) catatan.push("Laporan CTR belum tersedia dari YouTube.");
  else catatan.push(`Arsip CTR mencakup ${reach.dari} sampai ${reach.sampai} (${reach.file}). Tanda * berarti video tayang sebelum arsip mulai, jadi angkanya sebagian. Cocokkan satu angka CTR dengan YouTube Studio saat pertama kali dipakai.`);
} catch (e) { catatan.push(`CTR tidak terambil: ${sel(e.message)}`); }
const ditolak = new Set();
/** Query tambahan: bila API menolak, laporan tetap jadi dan penolakannya dicatat sekali. */
async function opsional(nama, q) {
  try { return await report(token, q); }
  catch (e) { if (e.status !== 400 && !(e.status >= 500)) throw e; if (!ditolak.has(nama)) { ditolak.add(nama); catatan.push(`${nama} gagal (sebagian atau semua video): ${sel(e.message)}`); } return []; }
}
const persen = (x) => `${x.toFixed(1)}%`;
for (const v of videos.sort((a, b) => a.snippet.publishedAt.localeCompare(b.snippet.publishedAt))) {
  const m = cocok(v); const dur = detik(v.contentDetails.duration); const pendek = dur <= 180; // perkiraan: Shorts maksimal 3 menit
  const mulai = hari === null ? pacific(new Date(v.snippet.publishedAt)) : pacific(new Date(Date.now() - hari * 86_400_000));
  const q = { startDate: mulai, endDate: sampai, filters: `video==${v.id}` };
  const d = await metrik(q); const siklus = m ? `${m.siklus}${m.cut ? ` ${m.cut}` : ""}` : "?";
  const link = `[${sel(v.snippet.title)}](https://www.youtube.com/watch?v=${v.id})${v.status.privacyStatus === "public" ? "" : ` (${v.status.privacyStatus})`}`;
  const format = pendek ? "Short" : "long-form";
  const umur = (Date.now() - new Date(v.snippet.publishedAt)) / 3_600_000; const s = v.statistics ?? {};
  terkini.push(`| ${siklus} | ${link} | ${umur < 72 ? `${Math.floor(umur)} jam` : `${Math.floor(umur / 24)} hari`} | ${s.viewCount ?? "-"} | ${s.likeCount ?? "-"} | ${s.commentCount ?? "-"} |`);
  const r0 = reach?.video(v.id, mulai); const sebagian = r0 && hari === null && reach.dari > mulai ? "*" : "";
  const imp = r0 ? `${r0.imp}${sebagian}` : "belum tersedia", ctr = r0 ? `${persen(r0.ctr)}${sebagian}` : "belum tersedia";
  if (!d || !d.views) { baris.push(`| ${siklus} | ${link} | ${format} | ${tanggal(new Date(v.snippet.publishedAt))} | belum ada data |  | ${imp} | ${ctr} |  |  |  |  |  |  |  |`); continue; }
  const target = pendek ? "-" : [r0 && `CTR ${r0.ctr >= 4 ? "tercapai" : r0.ctr >= 3 ? "wajar untuk channel baru" : "di bawah 3%"}`, `retensi ${d.averageViewPercentage >= 35 ? "tercapai" : "di bawah 35%"}`].filter(Boolean).join(", ");
  baris.push(`| ${siklus} | ${link} | ${format} | ${tanggal(new Date(v.snippet.publishedAt))} | ${d.views} | ${d.engagedViews ?? "-"} | ${imp} | ${ctr} | ${persen(d.averageViewPercentage)} | ${menit(d.averageViewDuration)} / ${menit(dur)} | ${d.estimatedMinutesWatched} | ${d.shares} | +${d.subscribersGained} / -${d.subscribersLost} | ${d.likes} / ${d.comments} | ${target} |`);
  const asal = await report(token, { ...q, dimensions: "insightTrafficSourceType", metrics: "views", sort: "-views" });
  sumber.push(`| ${siklus} | ${link} | ${asal.slice(0, 4).map((r) => `${r.insightTrafficSourceType} ${r.views}`).join(", ") || "-"} |`);
  const kata = await opsional("Kata kunci pencarian", { ...q, filters: `${q.filters};insightTrafficSourceType==YT_SEARCH`, dimensions: "insightTrafficSourceDetail", metrics: "views", sort: "-views", maxResults: 10 });
  cari.push(`| ${siklus} | ${link} | ${kata.map((r) => `${sel(r.insightTrafficSourceDetail)} (${r.views})`).join(", ") || "-"} |`);
  const geo = (await opsional("Negara", { ...q, dimensions: "country", metrics: "views,averageViewPercentage" })).sort((a, b) => b.views - a.views);
  const total = geo.reduce((n, r) => n + r.views, 0);
  negara.push(`| ${siklus} | ${link} | ${geo.slice(0, 5).map((r) => `${r.country} ${r.views} (${persen((r.views / total) * 100)}; ditonton ${persen(r.averageViewPercentage)})`).join(", ") || "-"} |`);
  const status = await opsional("Status subscriber", { ...q, dimensions: "subscribedStatus", metrics: "views,averageViewPercentage" });
  const per = (k) => { const r = status.find((x) => x.subscribedStatus === k); return r ? `${r.views} view, ditonton ${persen(r.averageViewPercentage)}` : "-"; };
  subs.push(`| ${siklus} | ${link} | ${per("SUBSCRIBED")} | ${per("UNSUBSCRIBED")} |`);
  if (o.retensi) {
    const r = await report(token, { ...q, dimensions: "elapsedVideoTimeRatio", metrics: "audienceWatchRatio" });
    if (r.length < 8) { catatan.push(`Retensi ${v.id}: data belum cukup (${r.length} titik).`); continue; }
    const nama = `youtube-retensi-${m ? `${m.siklus}${m.cut ? `-${m.cut}` : ""}-` : ""}${v.id}-${tanggal()}.csv`;
    const csv = tulisBaru(path.join(track.dir, "analitik", nama), `Video position (%),Absolute audience retention (%)\n${r.map((x) => `${(x.elapsedVideoTimeRatio * 100).toFixed(1)},${(x.audienceWatchRatio * 100).toFixed(2)}`).join("\n")}\n`);
    const rel = path.relative(ROOT, csv);
    retensi.push(m ? `node scripts/pipeline/retensi.mjs --track ${track.id} --siklus ${m.siklus}${m.cut ? ` --cut ${m.cut}` : ""} --csv ${rel}` : `# ${v.id} belum cocok ke siklus: ${rel}`);
  }
}

if (berbagi.length) catatan.push(`Channel ini juga dipakai atau direncanakan dipakai ${berbagi.map((t) => t.id).join(", ")}${dilewati ? `; ${dilewati} video yang tidak cocok ke siklus ${track.id} dilewati (pakai --video untuk menyertakan)` : ""}.`);
const md = `# Data YouTube ${track.id}, ${tanggal()}

Sumber data: API (YouTube Analytics API), channel "${sel(channel.snippet.title)}". Rentang: ${hari === null ? "sejak tayang" : `${hari} hari terakhir`} sampai ${sampai} (Pacific Time). Data Analytics biasanya tertinggal 2 sampai 3 hari.
Isi manual dari YouTube Studio untuk Shorts: viewed vs swiped away (target 70%). Target CTR long-form 4% atau lebih. Siklus "?" berarti belum cocok lewat ID atau judul. Kata kunci pencarian adalah data pihak ketiga.

## Angka terkini (Data API, tanpa jeda; untuk cek 48 jam)

| Siklus | Video | Umur | View | Like | Komentar |
| --- | --- | --- | --- | --- | --- |
${terkini.join("\n")}

## Per video

| Siklus | Video | Format | Tayang | View | Engaged | Impressions | CTR | Avg % viewed | Avg durasi | Menit ditonton | Share | Subscriber | Like / komentar | vs target |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${baris.join("\n")}

## Sumber trafik (4 teratas, view)

| Siklus | Video | Sumber |
| --- | --- | --- |
${sumber.join("\n")}

## Kata kunci pencarian YouTube (10 teratas, view)

| Siklus | Video | Kata kunci |
| --- | --- | --- |
${cari.join("\n")}

## Negara (5 teratas)

| Siklus | Video | Negara (view, porsi, rata-rata ditonton) |
| --- | --- | --- |
${negara.join("\n")}

## Subscriber vs bukan

| Siklus | Video | Subscriber | Bukan subscriber |
| --- | --- | --- | --- |
${subs.join("\n")}
${retensi.length ? `\n## Analisa retensi\n\n\`\`\`\n${retensi.join("\n")}\n\`\`\`\n` : ""}${catatan.length ? `\n## Catatan\n\n${catatan.map((c) => `- ${c}`).join("\n")}\n` : ""}`;
const file = tulisBaru(path.join(track.dir, "analitik", `youtube-${tanggal()}.md`), md);
console.log(`channel "${channel.snippet.title}": ${videos.length} video.${retensi.length ? `\n${retensi.join("\n")}` : ""}\nditulis: ${path.relative(ROOT, file)}`);
