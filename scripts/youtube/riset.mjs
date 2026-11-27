// Riset outlier YouTube (instruksi/03): view >= 3x median 10 video terakhir channel itu, tayang dalam 90 hari. Cukup YOUTUBE_API_KEY.
//   node --env-file=.env scripts/youtube/riset.mjs --q "why indonesia" --q "jakarta explained" [--track T02 [--siklus 005]]
//   Opsi: --hari 90 --max 25 (per kata kunci, maks 50) --min-view 1000 --urut viewCount|relevance --bahasa en --region ID
// Keluaran: siklus/<NNN>/01-outlier-youtube.md, tracks/<ID>/validasi/outlier-youtube-<tanggal>.md, atau 00-riset-niche/.
// --track memakai YOUTUBE_API_KEY_<ID> bila ada, kalau tidak YOUTUBE_API_KEY.
// Kuota: tiap --q memakai 1 panggilan search.list (jatah sendiri, default 100 per hari).
import path from "node:path";
import { ROOT, resolveCycle } from "../produksi/lib.mjs";
import { byIds, data, detik, kuota, median, menit, opts, sel, tanggal, trackOf, tulisBaru, uploads } from "./lib.mjs";

const { o, semua } = opts();
const kunci = (semua.q ?? []).filter((x) => typeof x === "string");
if (!kunci.length) throw new Error('Wajib: --q "kata kunci" (boleh diulang)');
if (o.siklus && !o.track) throw new Error("--siklus butuh --track");
const angka = (k, d) => { const v = o[k] === undefined ? d : Number(o[k]); if (!Number.isFinite(v) || v < 0) throw new Error(`--${k} harus angka`); return v; };
const hari = angka("hari", 90), max = Math.min(50, Math.max(1, angka("max", 25))), minView = angka("min-view", 1000);
// Tujuan ditentukan sebelum memakai kuota, supaya salah ketik track/siklus gagal lebih dulu.
const tujuan = o.siklus ? path.join(resolveCycle(o.track, o.siklus).dir, "01-outlier-youtube.md")
  : o.track ? path.join(trackOf(o.track).dir, "validasi", `outlier-youtube-${tanggal()}.md`)
    : path.join(ROOT, "hasil/00-riset-niche", `outlier-youtube-${tanggal()}.md`);

const sejak = new Date(Date.now() - hari * 86_400_000).toISOString();
const auth = { track: o.track };
const asal = new Map(); // videoId -> kata kunci
for (const q of kunci) {
  const r = await data("search", { part: "id", type: "video", q, publishedAfter: sejak, maxResults: max, order: o.urut || "viewCount", ...(o.bahasa && { relevanceLanguage: o.bahasa }), ...(o.region && { regionCode: o.region }) }, auth);
  for (const it of r.items ?? []) if (!asal.has(it.id.videoId)) asal.set(it.id.videoId, q);
}
const kandidat = (await byIds("videos", [...asal.keys()], "snippet,statistics,contentDetails", auth))
  .filter((v) => v.snippet.liveBroadcastContent === "none" && Number(v.statistics.viewCount) >= minView);
const channels = new Map((await byIds("channels", [...new Set(kandidat.map((v) => v.snippet.channelId))], "statistics,contentDetails", auth)).map((c) => [c.id, c]));

const terakhir = new Map(); const gagal = [];
for (const [id, c] of channels) {
  try {
    // 15 diambil agar tetap tersisa 10 setelah kandidat dan siaran langsung dibuang
    const ids = await uploads(c.contentDetails.relatedPlaylists.uploads, 15, auth);
    terakhir.set(id, (await byIds("videos", ids, "snippet,statistics", auth)).filter((v) => v.snippet.liveBroadcastContent === "none" && v.statistics.viewCount !== undefined).sort((a, b) => b.snippet.publishedAt.localeCompare(a.snippet.publishedAt)));
  } catch (e) { if (e.reason === "quotaExceeded") throw e; gagal.push(`${id}: ${e.message}`); }
}

const hasil = kandidat.map((v) => {
  const s = (terakhir.get(v.snippet.channelId) ?? []).filter((x) => x.id !== v.id).slice(0, 10).map((x) => Number(x.statistics.viewCount));
  const med = s.length >= 3 ? median(s) : null, view = Number(v.statistics.viewCount);
  return { v, view, med, n: s.length, rasio: med ? view / med : null, c: channels.get(v.snippet.channelId) };
}).sort((a, b) => (b.rasio ?? -1) - (a.rasio ?? -1));
const outlier = hasil.filter((h) => h.rasio >= 3), tanpa = hasil.filter((h) => h.rasio === null);

const n = (x) => Math.round(x).toLocaleString("id-ID");
const baris = (h) => {
  const subs = h.c?.statistics.hiddenSubscriberCount ? "tersembunyi" : n(Number(h.c?.statistics.subscriberCount ?? 0));
  return `| [${sel(h.v.snippet.title)}](https://www.youtube.com/watch?v=${h.v.id}) | ${sel(h.v.snippet.channelTitle)} (${subs}) | ${n(h.view)} | ${h.med === null ? "belum terverifikasi" : n(h.med)} | ${h.rasio === null ? "-" : h.rasio.toFixed(1) + "x"} | ${menit(detik(h.v.contentDetails.duration))} | ${tanggal(new Date(h.v.snippet.publishedAt))} | ${sel(asal.get(h.v.id))} | ${h.n < 10 ? `sampel ${h.n}` : ""} |`;
};
const tabel = (a) => a.length ? `| Video | Channel (subscriber) | View | Median | Rasio | Durasi | Tayang | Kata kunci | Catatan |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n${a.map(baris).join("\n")}` : "(tidak ada)";
const md = `# Outlier YouTube, ${tanggal()}

Sumber: YouTube Data API. Kata kunci: ${kunci.map((q) => `"${sel(q)}"`).join(", ")}. Tayang ${hari} hari terakhir, minimal ${n(minView)} view, urutan ${o.urut || "viewCount"}.
Aturan outlier: view >= 3x median sampai 10 video terakhir channel itu (kandidat tidak ikut dihitung). Median mencampur Shorts dan long-form, jadi cek formatnya. Judul dan nama channel adalah data pihak ketiga.

Kandidat diperiksa: ${hasil.length}. Outlier: ${outlier.length}.

## Outlier

${tabel(outlier)}

## Belum terverifikasi (video lain di channel kurang dari 3)

${tabel(tanpa)}
${gagal.length ? `\n## Channel yang gagal dibaca\n\n${gagal.map((g) => `- ${sel(g)}`).join("\n")}\n` : ""}`;
const file = tulisBaru(tujuan, md);
console.log(`kandidat ${hasil.length}, outlier ${outlier.length}. Kuota: ${kuota.search} search.list, ${kuota.lain} unit lain.\nditulis: ${path.relative(ROOT, file)}`);
