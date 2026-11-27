// Analitik channel milik satu track (instruksi/08) lewat YouTube Analytics API. Butuh OAuth: jalankan auth.mjs dulu.
//   node --env-file=.env scripts/youtube/analitik.mjs --track T02 [--hari 28] [--video ID1,ID2] [--retensi]
// Tanpa --hari, angka tiap video dihitung sejak tayang. --retensi juga menulis CSV retensi untuk retensi.mjs.
// Keluaran: hasil/tracks/<ID>/analitik/youtube-<tanggal>.md. CTR thumbnail dan "viewed vs swiped away" tetap dari YouTube Studio.
import fs from "node:fs"; import path from "node:path";
import { ROOT, readJson } from "../produksi/lib.mjs";
import { accessToken, byIds, channelVar, data, detik, menit, opts, report, sel, tanggal, trackOf, tracks, tulisBaru, uploads } from "./lib.mjs";

const { o } = opts(); if (typeof o.track !== "string") throw new Error("Wajib: --track T02");
const hari = o.hari === undefined ? null : Number(o.hari); if (hari !== null && !(hari >= 1)) throw new Error("--hari harus angka minimal 1");
const track = trackOf(o.track); const token = await accessToken(track.id); const auth = { token };

const channel = (await data("channels", { part: "snippet,contentDetails", mine: "true" }, auth)).items?.[0];
if (!channel) throw new Error("token tidak punya channel; jalankan ulang auth.mjs");
const harap = process.env[channelVar(track.id)];
if (harap && harap !== channel.id) throw new Error(`token ${track.id} milik channel ${channel.id}, tetapi ${channelVar(track.id)} = ${harap}; jalankan ulang auth.mjs --track ${track.id}`);

// Peta video -> siklus: ID dari hasil publish, lalu judul persis dari 06-publish.json dan 03-script.json.
const normal = (s) => String(s ?? "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const perId = new Map(), perJudul = new Map(); const sdir = path.join(track.dir, "siklus");
for (const d of fs.existsSync(sdir) ? fs.readdirSync(sdir).filter((x) => /^\d{3}/.test(x)).sort() : []) {
  const siklus = d.slice(0, 3); const pub = readJson(path.join(sdir, d, "06-publish.json"), {}); const script = readJson(path.join(sdir, d, "03-script.json"), {});
  const judul = (t, cut) => t && perJudul.set(normal(t), { siklus, cut });
  const cutOf = (nama) => (nama && nama !== "master" ? nama : null);
  for (const t of [script.publish_title, ...(script.title_options ?? [])]) judul(t, null);
  for (const c of script.shorts_cuts ?? []) judul(String(c.hook_override ?? "").slice(0, 95), c.name);
  for (const i of pub.items ?? []) judul(i.title, cutOf(i.nama));
  for (const h of pub.hasil ?? []) for (const x of h.detail ?? []) if (x.platform === "youtube" && x.platform_post_id) perId.set(x.platform_post_id, { siklus, cut: cutOf(h.nama) });
}

const diminta = typeof o.video === "string" ? o.video.split(",").map((x) => x.trim()).filter(Boolean) : null;
const ids = diminta ?? await uploads(channel.contentDetails.relatedPlaylists.uploads, 200, auth);
let videos = (await byIds("videos", ids, "snippet,contentDetails,status", auth)).filter((v) => v.snippet.liveBroadcastContent !== "upcoming");
const asing = videos.filter((v) => v.snippet.channelId !== channel.id);
if (asing.length) throw new Error(`video bukan milik channel ${channel.snippet.title}: ${asing.map((v) => v.id).join(", ")}`);
const cocok = (v) => perId.get(v.id) ?? perJudul.get(normal(v.snippet.title));
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

const baris = [], sumber = [], retensi = [], catatan = [];
for (const v of videos.sort((a, b) => a.snippet.publishedAt.localeCompare(b.snippet.publishedAt))) {
  const m = cocok(v); const dur = detik(v.contentDetails.duration); const pendek = dur <= 180; // perkiraan: Shorts maksimal 3 menit
  const mulai = hari === null ? pacific(new Date(v.snippet.publishedAt)) : pacific(new Date(Date.now() - hari * 86_400_000));
  const q = { startDate: mulai, endDate: sampai, filters: `video==${v.id}` };
  const d = await metrik(q); const siklus = m ? `${m.siklus}${m.cut ? ` ${m.cut}` : ""}` : "?";
  const link = `[${sel(v.snippet.title)}](https://www.youtube.com/watch?v=${v.id})${v.status.privacyStatus === "public" ? "" : ` (${v.status.privacyStatus})`}`;
  const format = pendek ? "Short" : "long-form";
  if (!d || !d.views) { baris.push(`| ${siklus} | ${link} | ${format} | ${tanggal(new Date(v.snippet.publishedAt))} | belum ada data |  |  |  |  |  |  |  |  |`); continue; }
  const target = pendek ? "-" : d.averageViewPercentage >= 35 ? "retensi tercapai" : "retensi di bawah 35%";
  baris.push(`| ${siklus} | ${link} | ${format} | ${tanggal(new Date(v.snippet.publishedAt))} | ${d.views} | ${d.engagedViews ?? "-"} | ${d.averageViewPercentage.toFixed(1)}% | ${menit(d.averageViewDuration)} / ${menit(dur)} | ${d.estimatedMinutesWatched} | ${d.shares} | +${d.subscribersGained} / -${d.subscribersLost} | ${d.likes} / ${d.comments} | ${target} |`);
  const asal = await report(token, { ...q, dimensions: "insightTrafficSourceType", metrics: "views", sort: "-views" });
  sumber.push(`| ${siklus} | ${link} | ${asal.slice(0, 4).map((r) => `${r.insightTrafficSourceType} ${r.views}`).join(", ") || "-"} |`);
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
Isi manual dari YouTube Studio: impressions CTR (target 4% atau lebih) dan, untuk Shorts, viewed vs swiped away (target 70%). Siklus "?" berarti belum cocok lewat ID atau judul.

## Per video

| Siklus | Video | Format | Tayang | View | Engaged | Avg % viewed | Avg durasi | Menit ditonton | Share | Subscriber | Like / komentar | vs target |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${baris.join("\n")}

## Sumber trafik (4 teratas, view)

| Siklus | Video | Sumber |
| --- | --- | --- |
${sumber.join("\n")}
${retensi.length ? `\n## Analisa retensi\n\n\`\`\`\n${retensi.join("\n")}\n\`\`\`\n` : ""}${catatan.length ? `\n## Catatan\n\n${catatan.map((c) => `- ${c}`).join("\n")}\n` : ""}`;
const file = tulisBaru(path.join(track.dir, "analitik", `youtube-${tanggal()}.md`), md);
console.log(`channel "${channel.snippet.title}": ${videos.length} video.${retensi.length ? `\n${retensi.join("\n")}` : ""}\nditulis: ${path.relative(ROOT, file)}`);
