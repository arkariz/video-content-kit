// QA kemasan: lint judul + teks thumbnail sebagai pasangan (title.py dari youtube-agent-skill, MIT, scripts/vendor/)
// dan aturan chapter YouTube (mulai 00:00, minimal 3, tiap chapter minimal 10 dtk, urut naik).
// Dipakai qa.mjs (lapisan "Kemasan", temuan saran: tidak pernah kritis), dan bisa dijalankan sendiri:
//   node scripts/pipeline/kemasan.mjs --track T02 --siklus 004
import path from "node:path"; import { spawnSync } from "node:child_process"; import { pathToFileURL } from "node:url";
import { ROOT, args, pauseSec, readJson, resolveCycle } from "../produksi/lib.mjs";

const TITLE_PY = path.join(ROOT, "scripts/vendor/youtube-agent-skill/yt-package/title.py");
const thumbText = (th) => (th?.lines || []).map((l) => l.text).join(" ").trim();

/** Jalankan title.py untuk satu judul (dan teks thumbnail). Hasil: { score, issues: [[kode, pesan]], good } atau null bila python gagal. */
export function lintJudul(title, thumb) {
  const a = [TITLE_PY, "--title", title, "--json"]; if (thumb) a.push("--thumb", thumb);
  const r = spawnSync("python3", a, { encoding: "utf8" });
  if (r.status) return null;
  try { return JSON.parse(r.stdout)[0]; } catch { return null; }
}

/** Waktu mulai scene (detik), sama dengan render/publish. */
export const sceneStarts = (sc) => { let t = 0; const start = {}; sc.forEach((s, i) => { start[s.id] = t; t += (s.duration_ms?.en || 0) / 1000 + pauseSec(sc[i + 1]); }); return { start, total: t }; };

/** Temuan kemasan untuk naskah. */
export function cekKemasan(script) {
  const F = []; const add = (level, id, msg, fix) => F.push({ layer: "Kemasan", level, id, msg, fix });
  const titles = script.title_options || [], thumbs = (script.thumbnails || []).map(thumbText).filter(Boolean);
  const pairs = titles.flatMap((t) => (thumbs.length ? thumbs : [null]).map((th) => ({ t, th, r: lintJudul(t, th) }))).filter((p) => p.r);
  if (titles.length && !pairs.length) add("kecil", "P0", "title.py tidak bisa dijalankan (python3?)", "pasang python3");
  if (pairs.length) {
    pairs.sort((a, b) => b.r.score - a.r.score);
    const best = pairs[0];
    const ringkas = (r) => r.issues.map(([k]) => k).join(", ") || "bersih";
    add(best.r.score >= 80 ? "kecil" : "sedang", "P1", `pasangan terbaik ${best.r.score}/100: "${best.t}"${best.th ? ` + "${best.th}"` : ""} (${ringkas(best.r)})`, "pakai pasangan ini atau perbaiki temuannya; skor adalah saran, bukan gate");
    for (const t of titles) {
      const r = pairs.find((p) => p.t === t)?.r; if (!r) continue;
      const iss = r.issues.filter(([k]) => ["length", "mobile", "vague", "shouting", "front-load"].includes(k));
      if (iss.length) add("kecil", "P2", `judul "${t}": ${iss.map(([k, m]) => `${k} (${m})`).join("; ")}`, "subjek harus terbaca di 40 karakter pertama (feed mobile)");
    }
    const dup = pairs.filter((p) => p.r.issues.some(([k]) => k === "duplicate"));
    if (dup.length === pairs.length && thumbs.length) add("sedang", "P3", "semua pasangan judul-thumbnail mengulang kata yang sama", "thumbnail harus mengatakan yang tidak dikatakan judul");
    const panjang = thumbs.filter((x) => x.split(/\s+/).length > 4);
    if (panjang.length) add("kecil", "P4", `teks thumbnail lebih dari 4 kata: ${panjang.join(" | ")}`, "maksimal 4 kata (CONTRACT.md)");
  }
  // chapter YouTube
  const ch = script.chapters || [];
  if (ch.length) {
    const { start, total } = sceneStarts(script.scenes || []);
    const ts = ch.map((c) => ({ ...c, at: start[c.scene] }));
    const salah = [];
    if (ts.some((c) => c.at === undefined)) salah.push(`scene tidak ada: ${ts.filter((c) => c.at === undefined).map((c) => c.scene).join(", ")}`);
    const ok = ts.filter((c) => c.at !== undefined);
    if (ok.length < 3) salah.push(`hanya ${ok.length} chapter (minimal 3)`);
    if (ok.length && ok[0].at !== 0) salah.push("chapter pertama tidak mulai di 00:00");
    ok.forEach((c, i) => { const end = ok[i + 1]?.at ?? total; if (i && c.at <= ok[i - 1].at) salah.push(`"${c.title}" tidak urut`); else if (end - c.at < 10) salah.push(`"${c.title}" hanya ${(end - c.at).toFixed(1)} dtk (minimal 10)`); });
    if (salah.length) add("sedang", "P5", `chapter tidak akan tampil di YouTube: ${salah.join("; ")}`, "perbaiki script.chapters");
  }
  return F;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const o = args(); const { scriptPath } = resolveCycle(o.track, o.siklus);
  const F = cekKemasan(readJson(scriptPath));
  console.log(`Kemasan ${o.track}/${o.siklus}`); for (const f of F) console.log(`  ${f.id} ${f.level.toUpperCase()}: ${f.msg}`);
  if (!F.length) console.log("  tidak ada temuan");
}
