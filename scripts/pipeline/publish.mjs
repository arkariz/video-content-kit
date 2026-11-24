// Adaptor publish: Upload-Post (https://docs.upload-post.com). Dua langkah:
//   plan : node scripts/pipeline/publish.mjs plan --track T01 --siklus 001   -> 06-publish.json + 06-publish.md (bisa diedit kreator)
//   send : dipanggil approve.mjs setelah kreator mengetik SETUJU. Menolak jalan tanpa catatan "disetujui" di .pipeline.json.
// Env: UPLOADPOST_API_KEY, UPLOADPOST_PROFILE (username profil Upload-Post). --dry mencetak payload tanpa mengirim.
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
import { ROOT, args, resolveCycle, readJson, writeJson, pauseSec } from "../produksi/lib.mjs";
const BASE = "https://api.upload-post.com";
const fmtT = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function plan({ track, siklus }) {
  const { dir, cycleId, scriptPath } = resolveCycle(track, siklus); const script = readJson(scriptPath); const assets = readJson(path.join(dir, "04-assets.json"), {});
  const trackDir = path.dirname(path.dirname(dir)); const trackMd = fs.readFileSync(path.join(trackDir, "TRACK.md"), "utf8");
  const row = trackMd.split("\n").find((l) => l.startsWith(`| ${cycleId}`)); const date = row?.match(/\b(20\d\d-\d\d-\d\d)\b/)?.[1];
  if (!date) throw new Error(`tanggal tayang ${cycleId} tidak ditemukan di tabel Siklus TRACK.md`);
  const at = (days) => { const d = new Date(`${date}T19:00:00+07:00`); d.setUTCDate(d.getUTCDate() + days); return { scheduled_date: d.toISOString().replace(".000Z", "Z"), timezone: "Asia/Jakarta", lokal: d.toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" }) }; };
  let t = 0; const start = {}; script.scenes.forEach((s, i) => { start[s.id] = t; t += (s.duration_ms?.en || 0) / 1000 + pauseSec(script.scenes[i + 1]); });
  const chapters = (script.chapters || []).filter((c) => start[c.scene] !== undefined);
  const voiceClone = assets.voice?.type === "clone-kreator"; const label = !voiceClone; // konservatif: suara sintetis non-kreator diberi label
  const sources = (script.sources || []).map((s) => `- ${s.url}`);
  const title = script.publish_title || script.title_options[0];
  const description = [script.promise, "", chapters.length >= 3 ? chapters.map((c) => `${fmtT(start[c.scene])} ${c.title}`).join("\n") : "", "", sources.length ? `Sources:\n${sources.join("\n")}` : "Sources: (not filled in yet, see QA T-src)", "", label ? "The narration uses a synthetic voice and cartoon animation. Real footage is licensed for commercial use (Pexels/Pixabay)." : "Real footage is licensed for commercial use (Pexels/Pixabay)."].filter((x, i, a) => !(x === "" && a[i - 1] === "")).join("\n");
  const tags = script.tags || ["how payments work", "credit card", "authorization", "clearing", "settlement", "ISO 8583", "fintech explained"];
  const rd = `produksi/render/${track}/${siklus}`; const items = [{ nama: "master", file: `${rd}/Master16x9-en.mp4`, platforms: ["youtube"], title, description, tags, ...at(0) }];
  (script.shorts_cuts || []).forEach((c, i) => items.push({ nama: c.name, file: `${rd}/Short9x16-${c.name}-en.mp4`, platforms: ["youtube", "tiktok", "instagram", "facebook"], title: `${c.hook_override}`.slice(0, 95), description: `${c.hook_override}\n\nFull video on the channel.`, tags: [...tags.slice(0, 3), "shorts"], ...at(1 + i) }));
  const out = { track, siklus: cycleId, dibuat: new Date().toISOString(), catatan: "Edit sebelum approve. platformAktif: ubah true/false. Jadwal default: master di tanggal tayang TRACK.md 19:00 WIB, Shorts +1 dan +2 hari (rencana.md terkunci: minggu yang sama).", platformAktif: { youtube: true, tiktok: false, instagram: false, facebook: false }, label_ai: { berlaku: label, alasan: label ? "suara sintetis (TTS) dan adegan kartun; konservatif, tidak mengurangi jangkauan menurut YouTube" : "suara clone milik kreator", youtube: "containsSyntheticMedia", tiktok: "is_aigc", instagram: "is_ai_generated", facebook: "facebook_is_ai_generated" }, youtube: { categoryId: "27", privacyStatus: "public", selfDeclaredMadeForKids: false, defaultAudioLanguage: "en" }, items, hasil: [] };
  writeJson(path.join(dir, "06-publish.json"), out);
  const md = `# Publish: siklus ${cycleId}\n\nDisetujui kreator: (diisi saat approve)\n\n| Item | File | Platform | Judul | Jadwal (WIB) | Label AI |\n| --- | --- | --- | --- | --- | --- |\n${items.map((i) => `| ${i.nama} | ${i.file} | ${i.platforms.filter((p) => out.platformAktif[p]).join(", ") || "(tidak ada aktif)"} | ${i.title} | ${i.lokal} | ${label ? "ya" : "tidak"} |`).join("\n")}\n\nAlasan label: ${out.label_ai.alasan}\n\n## Deskripsi YouTube\n\n${description}\n\n## Hasil kirim\n\n(Diisi otomatis setelah kirim.)\n`;
  fs.writeFileSync(path.join(dir, "06-publish.md"), md); return { dir, out };
}

const headers = () => { if (!process.env.UPLOADPOST_API_KEY) throw new Error("UPLOADPOST_API_KEY kosong (jalankan dengan --env-file=.env)"); return { Authorization: `Apikey ${process.env.UPLOADPOST_API_KEY}` }; };
export function payload(out, item) {
  const act = item.platforms.filter((p) => out.platformAktif[p]); const L = out.label_ai.berlaku; const f = []; const add = (k, v) => v !== undefined && f.push([k, String(v)]);
  add("user", process.env.UPLOADPOST_PROFILE); for (const p of act) add("platform[]", p); add("title", item.title); add("description", item.description); add("scheduled_date", item.scheduled_date); add("timezone", item.timezone); add("async_upload", true); add("external_id", `${out.track}-${out.siklus}-${item.nama}`);
  if (act.includes("youtube")) { add("youtube_title", item.title); add("youtube_description", item.description); for (const t of item.tags) add("tags[]", t); add("categoryId", out.youtube.categoryId); add("privacyStatus", out.youtube.privacyStatus); add("selfDeclaredMadeForKids", out.youtube.selfDeclaredMadeForKids); add("containsSyntheticMedia", L); add("defaultAudioLanguage", out.youtube.defaultAudioLanguage); }
  if (act.includes("tiktok")) { add("tiktok_title", `${item.title} ${item.tags.slice(0, 3).map((t) => "#" + t.replace(/\s+/g, "")).join(" ")}`.slice(0, 2200)); add("is_aigc", L); }
  if (act.includes("instagram")) { add("instagram_title", item.title); add("media_type", "REELS"); add("share_to_feed", true); add("is_ai_generated", L); }
  if (act.includes("facebook")) { add("facebook_title", item.title); add("facebook_description", item.description); add("facebook_media_type", "REELS"); add("facebook_is_ai_generated", L); }
  return { act, fields: f };
}
export async function send({ track, siklus, dry }) {
  const { dir } = resolveCycle(track, siklus); const pubP = path.join(dir, "06-publish.json"); if (!fs.existsSync(pubP)) plan({ track, siklus }); const out = readJson(pubP);
  const log = readJson(path.join(dir, ".pipeline.json"), { log: [] }).log; const lastOk = log.map((l) => l.tahap).lastIndexOf("disetujui"), lastRev = log.map((l) => l.tahap).lastIndexOf("revisi");
  if (!dry && (lastOk < 0 || lastRev > lastOk)) throw new Error("siklus belum disetujui kreator (jalankan approve.mjs dan ketik SETUJU)");
  if (!process.env.UPLOADPOST_PROFILE && !dry) throw new Error("UPLOADPOST_PROFILE kosong");
  for (const item of out.items) {
    const { act, fields } = payload(out, item); if (!act.length) { console.log(`- ${item.nama}: tidak ada platform aktif, dilewati`); continue; }
    const abs = path.join(ROOT, item.file); if (!fs.existsSync(abs)) throw new Error(`file tidak ada: ${item.file}`);
    if (dry) { console.log(`\n[DRY] ${item.nama} -> ${act.join(", ")} @ ${item.lokal} WIB (${(fs.statSync(abs).size / 1e6).toFixed(1)} MB)`); for (const [k, v] of fields) console.log(`  ${k} = ${v.length > 90 ? v.slice(0, 90) + "…" : v}`); continue; }
    if (out.hasil.some((h) => h.nama === item.nama && h.request_id)) { console.log(`- ${item.nama}: sudah dikirim, dilewati`); continue; }
    const fd = new FormData(); for (const [k, v] of fields) fd.append(k, v); fd.append("video", await fs.openAsBlob(abs), path.basename(abs));
    const r = await fetch(`${BASE}/api/upload`, { method: "POST", headers: { ...headers(), "Idempotency-Key": `${track}-${siklus}-${item.nama}` }, body: fd }); const j = await r.json().catch(() => ({}));
    if (!r.ok || j.success === false) throw new Error(`${item.nama}: HTTP ${r.status} ${JSON.stringify(j)}`);
    out.hasil.push({ nama: item.nama, platforms: act, request_id: j.request_id, job_id: j.job_id, scheduled_date: j.scheduled_date ?? item.scheduled_date, dikirim: new Date().toISOString() }); writeJson(pubP, out);
    console.log(`✓ ${item.nama} terkirim (${j.job_id ? "terjadwal job " + j.job_id : "request " + j.request_id})`);
  }
  if (!dry) { const md = path.join(dir, "06-publish.md"); fs.appendFileSync(md, out.hasil.map((h) => `- ${h.nama}: ${h.platforms.join(", ")}, ${h.job_id ? "job " + h.job_id : "request " + h.request_id}, jadwal ${h.scheduled_date}`).join("\n") + "\n"); console.log("Cek status: publish.mjs status. URL tayang muncul setelah proses selesai."); }
}
export async function status({ track, siklus }) {
  const { dir } = resolveCycle(track, siklus); const pubP = path.join(dir, "06-publish.json"); const out = readJson(pubP);
  for (const h of out.hasil) { const q = h.job_id ? `job_id=${h.job_id}` : `request_id=${h.request_id}`; const r = await (await fetch(`${BASE}/api/uploadposts/status?${q}`, { headers: headers() })).json(); h.status = r.status; h.detail = r.results; console.log(h.nama, r.status, JSON.stringify(r.results ?? "").slice(0, 200)); }
  const hist = await (await fetch(`${BASE}/api/uploadposts/history?limit=50`, { headers: headers() })).json().catch(() => ({})); for (const h of out.hasil) h.urls = (hist.history || []).filter((x) => x.external_id === `${out.track}-${out.siklus}-${h.nama}`).map((x) => ({ platform: x.platform, url: x.post_url })); writeJson(pubP, out);
}
export const publish = (o) => send({ track: o.track, siklus: o.siklus });
if (process.argv[1] === fileURLToPath(import.meta.url)) { const o = args(); const cmd = o._[0] || "plan"; (cmd === "plan" ? Promise.resolve(plan(o)).then((r) => console.log(`06-publish.json dan 06-publish.md ditulis (${r.out.items.length} item)`)) : cmd === "status" ? status(o) : send({ ...o, dry: !!o.dry })).catch((e) => { console.error("GAGAL:", e.message); process.exit(1); }); }
