// Mesin R3 (instruksi/referensi/gaya-visual.md): pembagian kalimat, waktu shot dari caption per kata, dan validasi kontrak `shots`.
// Dipakai bersama oleh build-visual.mjs (validasi), render.mjs (waktu ke komposisi), dan qa-r3.mjs (G1-G6). Sumber tunggal: jangan salin logikanya.
import fs from "node:fs"; import path from "node:path"; import { ROOT } from "./lib.mjs";

export const SCALES = ["map", "place", "object", "inside"];
export const TRANSITIONS = ["cut", "iris", "wipe", "push", "hold"];
export const COUNT_AS = ["dots", "items", "timeline", "split"];
export const ANCHOR_KINDS = ["map", "silhouette", "object"];
export const MOODS = ["warm", "cool", "bright", "dark", "faded", "night", "dusk", "day", "danger", "calm"];
// Ekspresi 2D (r3/cast) ditambah ekspresi pustaka soft (r3/soft/kit.tsx Expr).
export const EXPR = ["neutral", "happy", "sad", "shock", "tired", "angry", "smug", "calm", "stern", "busy"];
// Pemeran per track (produksi/STYLE.md). Tambah di sini DAN di produksi/remotion/src/r3/cast/ saat menambah tokoh.
export const CAST = { _contoh: [], T01: ["you", "owner", "bank", "network", "terminal", "cash", "switch", "yourapp", "tourist", "centralbank"], T02: ["komo", "sepuh", "aturan", "cicak"] };
// Waktu transisi (detik) dari gaya-visual.md bagian 3. Komposisi (src/r3/engine.tsx) memakai angka yang sama.
export const TRANS_S = { iris: 0.45, wipe: 0.4, push: 0.3, cut: 0, hold: 0 };
const BANNED_SHOW = [/\btokoh berdiri\b/i, /^\s*ikon\b/i, /^\s*teks\b/i, /\bicon\b/i, /\btext on screen\b/i];

/** Pecah narasi menjadi kalimat: setelah . ! ? yang diikuti spasi dan huruf besar/angka. */
export const sentences = (text) => String(text || "").trim().split(/(?<=[.!?]["”’)]?)\s+(?=["“‘(]?[A-Z0-9])/).map((x) => x.trim()).filter(Boolean);
export const wordsOf = (x) => x.trim().split(/\s+/).filter(Boolean);
/** Kalimat yang wajib punya shot sendiri (4 kata ke atas; yang lebih pendek boleh berbagi). */
export const longSentences = (text) => sentences(text).filter((k) => wordsOf(k).length >= 4).length;
export const norm = (w) => String(w || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
const endsSentence = (w) => /[.!?]["”’)]?$/.test(w.text);

/** Kelompokkan kata caption per kalimat narasi. Hasil: [{ text, words: [{text,startMs,endMs}] }] dan mode penyelarasan. */
export function alignSentences(narration, captions = []) {
  const ss = sentences(narration); const counts = ss.map((s) => wordsOf(s).length);
  const total = counts.reduce((a, b) => a + b, 0);
  const groups = (sizes) => { let i = 0; return sizes.map((n, k) => ({ text: ss[k], words: captions.slice(i, (i += n)) })); };
  if (captions.length === total) return { mode: "kata", list: groups(counts) };
  // caption tidak sama persis dengan naskah: pakai tanda titik di caption
  const byPunct = []; let cur = [];
  captions.forEach((w, i) => { cur.push(w); if (endsSentence(w) || i === captions.length - 1) { byPunct.push(cur); cur = []; } });
  if (byPunct.length === ss.length) return { mode: "tanda-baca", list: byPunct.map((words, k) => ({ text: ss[k], words })) };
  // terakhir: proporsional terhadap jumlah kata
  let acc = 0; const sizes = counts.map((n, k) => { const end = k === counts.length - 1 ? captions.length : Math.round(((acc += n) / total) * captions.length); const prev = k === 0 ? 0 : Math.round(((acc - n) / total) * captions.length); return Math.max(0, end - prev); });
  return { mode: "proporsional", list: groups(sizes) };
}

/** Cari kata (boleh beberapa kata, misalnya "open doors") di daftar kata caption. Mengembalikan indeks kata pertama atau -1. */
export function findWord(words, word) {
  const q = wordsOf(String(word || "")).map(norm).filter(Boolean); if (!q.length) return -1;
  for (let i = 0; i < words.length; i++) {
    if (q.every((x, k) => { const w = norm(words[i + k]?.text); return w === x || (k === 0 && q.length === 1 && w.startsWith(x) && x.length >= 4); })) return i;
  }
  return -1;
}

/**
 * Waktu shot satu scene. Shot ke-n mulai di kata pertama kalimat `sentence`-nya (shot pertama mulai di 0),
 * berakhir saat shot berikutnya mulai (shot terakhir sampai akhir scene). Label muncul di awal `word`-nya.
 * @returns {{ shots: object[], mode: string, warn: string[] }}  waktu dalam milidetik relatif awal scene
 */
export function timeShots(scene, captions = [], sceneMs) {
  const { mode, list } = alignSentences(scene.narration?.en, captions); const warn = [];
  const endMs = sceneMs ?? scene.duration_ms?.en ?? (captions.at(-1)?.endMs ?? 0);
  const startOf = (n) => list[n - 1]?.words[0]?.startMs;
  const shots = (scene.shots || []).map((x, i) => ({ ...x, index: i, sentenceStartMs: startOf(x.sentence) ?? null }));
  shots.forEach((x, i) => { x.startMs = i === 0 ? 0 : (x.sentenceStartMs ?? shots[i - 1].startMs + 1); });
  shots.forEach((x, i) => {
    x.endMs = i < shots.length - 1 ? shots[i + 1].startMs : endMs;
    // kata yang tercakup shot ini: kalimatnya sampai sebelum kalimat shot berikutnya
    const nextSentence = shots[i + 1]?.sentence ?? list.length + 1;
    const covered = list.slice((x.sentence || 1) - 1, Math.max(x.sentence || 1, nextSentence - 1)).flatMap((s) => s.words);
    const own = list[(x.sentence || 1) - 1]?.words ?? [];
    x.words = covered.map((w) => ({ text: w.text, startMs: w.startMs, endMs: w.endMs }));
    x.labels = (x.labels || []).map((l) => {
      let k = findWord(own, l.word), pool = own, where = "kalimat";
      if (k < 0) { k = findWord(covered, l.word); pool = covered; where = "shot"; }
      if (k < 0) { k = findWord(captions, l.word); pool = captions; where = "scene"; }
      if (k < 0) { warn.push(`${scene.id}#${x.sentence}: label "${l.text}" word "${l.word}" tidak ada di caption`); return { ...l, atMs: x.startMs + 300, found: false }; }
      if (where !== "kalimat") warn.push(`${scene.id}#${x.sentence}: label "${l.text}" word "${l.word}" tidak ada di kalimatnya (ditemukan di ${where})`);
      return { ...l, atMs: pool[k].startMs, found: where === "kalimat" };
    });
  });
  if (mode !== "kata") warn.push(`${scene.id}: caption tidak sama persis dengan naskah, kalimat diselaraskan secara ${mode}`);
  return { shots, mode, warn };
}

/** Folder yang dipindai registri komposisi (produksi/remotion/src/r3/registry.ts). */
export const REGISTRY_ROOTS = ["hasil/tracks/", "produksi/contoh-r3/"];
/** Lokasi file komponen adegan siklus: 04-shots.tsx di folder yang sama dengan 03-script.json. */
export const shotsFileFor = (scriptPath) => path.join(path.dirname(scriptPath), "04-shots.tsx");

/** Validasi kontrak R3 satu naskah. errs = harus diperbaiki sebelum render; warn = peringatan. */
export function validateR3(script, { track, scriptPath } = {}) {
  const errs = [], warn = []; const e = (id, m) => errs.push(`${id}: ${m}`); const w = (id, m) => warn.push(`${id}: ${m}`);
  const r3 = (script.scenes || []).filter((s) => Array.isArray(s.shots) && s.shots.length);
  if (!r3.length) return { errs, warn, r3: [] };
  const a = script.anchor;
  if (!a) e("anchor", "naskah dengan shots butuh `anchor` di tingkat atas"); else { if (!ANCHOR_KINDS.includes(a.kind)) e("anchor", `kind "${a.kind}" tidak dikenal (${ANCHOR_KINDS.join("|")})`); if (!a.desc?.trim()) e("anchor", "desc kosong"); }
  const cast = script.cast;
  // cast boleh kosong ([]) untuk naskah tanpa pemeran (mis. contoh sains), selama tidak ada shot yang memakai faces
  const pakaiFaces = r3.some((s) => s.shots.some((x) => x.faces && Object.keys(x.faces).length));
  if (!Array.isArray(cast) || (!cast.length && pakaiFaces)) e("cast", "naskah dengan shots butuh `cast` (pemeran track dari produksi/STYLE.md); boleh [] bila tidak ada faces");
  else if (track && CAST[track]) { for (const c of cast) if (!CAST[track].includes(c)) e("cast", `"${c}" bukan pemeran ${track} (${CAST[track].join("|")})`); }
  else if (track) w("cast", `pemeran ${track} belum terdaftar di scripts/produksi/r3.mjs (CAST)`);
  const castSet = new Set(cast || []);
  for (const s of r3) {
    const n = sentences(s.narration?.en).length; let last = 0;
    s.shots.forEach((x, i) => {
      const id = `${s.id}#${x.sentence ?? i + 1}`;
      if (!Number.isInteger(x.sentence) || x.sentence < 1 || x.sentence > n) e(id, `sentence harus 1..${n} (kalimat narasi Inggris)`);
      else if (x.sentence <= last) e(id, "sentence harus naik dan tidak dobel"); else last = x.sentence;
      if (i === 0 && x.sentence !== 1) e(id, "shot pertama harus sentence 1");
      if (!x.show?.trim()) e(id, "show kosong"); else if (BANNED_SHOW.some((r) => r.test(x.show))) e(id, `show "${x.show.slice(0, 40)}" terlarang (tokoh berdiri, ikon, teks)`);
      if (!x.motion?.trim()) e(id, "motion kosong (apa yang bergerak)");
      if (!SCALES.includes(x.scale)) e(id, `scale "${x.scale}" tidak dikenal (${SCALES.join("|")})`);
      if (!TRANSITIONS.includes(x.transition)) e(id, `transition "${x.transition}" tidak dikenal (${TRANSITIONS.join("|")})`);
      for (const l of x.labels || []) {
        if (!l.text?.trim() || !l.word?.trim()) e(id, "label perlu text dan word");
        else if (wordsOf(l.text).length > 3 && !/^[\d.,%$€£¥]+$/.test(l.text)) e(id, `label "${l.text}" lebih dari 3 kata`);
        if (l.word?.trim() && Number.isInteger(x.sentence) && findWord(wordsOf(sentences(s.narration?.en)[x.sentence - 1] || "").map((text) => ({ text })), l.word) < 0) e(id, `label "${l.text}": word "${l.word}" tidak ada di kalimat ${x.sentence}`);
      }
      if (x.count) { if (typeof x.count.value !== "number") e(id, "count.value harus angka"); if (!COUNT_AS.includes(x.count.as)) e(id, `count.as "${x.count.as}" tidak dikenal (${COUNT_AS.join("|")})`); }
      for (const [k, v] of Object.entries(x.faces || {})) { if (!castSet.has(k)) e(id, `faces: "${k}" tidak ada di cast`); if (!EXPR.includes(v)) e(id, `faces.${k} "${v}" tidak dikenal (${EXPR.join("|")})`); }
      if (x.mood && !MOODS.includes(x.mood)) w(id, `mood "${x.mood}" di luar daftar (${MOODS.join("|")})`);
      if (x.bubble && wordsOf(x.bubble).length > 6) e(id, "bubble lebih dari 6 kata");
      if (x.three_d !== undefined && typeof x.three_d !== "boolean") e(id, "three_d harus true/false");
    });
    if (s.shots.length < longSentences(s.narration?.en)) w(s.id, `${s.shots.length} shot untuk ${longSentences(s.narration?.en)} kalimat (≥4 kata)`);
    if (s.broll) w(s.id, "scene punya shots dan broll; broll diabaikan oleh mesin R3");
  }
  if (scriptPath) {
    const f = shotsFileFor(scriptPath), rel = path.relative(ROOT, f).split(path.sep).join("/");
    if (!REGISTRY_ROOTS.some((r) => rel.startsWith(r))) e("04-shots.tsx", `${rel} di luar registri mesin (${REGISTRY_ROOTS.join(", ")}); komposisi tidak akan menemukannya`);
    if (!fs.existsSync(f)) e("04-shots.tsx", `belum ada (${rel}); tulis komponen adegan per scene, lihat produksi/PIPELINE.md`);
    else { const src = fs.readFileSync(f, "utf8"); for (const s of r3) if (!new RegExp(`["']?\\b${s.id}\\b["']?\\s*:`).test(src)) e(s.id, "tidak ada komponen adegan di 04-shots.tsx"); }
  }
  return { errs, warn, r3 };
}

/* ---------------- 03-visual.json (produksi/CONTRACT.md, aturan V-1 sampai V-14) ---------------- */
export const MATERIALS = ["matte", "glossy", "translucent", "liquid", "glass", "organic", "membrane", "metal", "concrete", "fabric", "soil", "vegetation", "atmosphere"];
const ABSTRAK = /^(menyerang|melawan|bekerja|berjuang|membantu|beraksi|berinteraksi|berperan)\b/i;
const words = (x) => String(x || "").trim().split(/\s+/).filter(Boolean).length;

/** Baca tabel klaim (baris `| Cnn | ... | status |`) dari file riset. Hasil: Map id -> status. */
export function readClaims(file) {
  const m = new Map(); if (!file || !fs.existsSync(file)) return m;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const c = line.split("|").map((x) => x.trim()); const id = c.find((x) => /^C\d{2,}$/.test(x)); if (!id) continue;
    const st = c.find((x) => /^(terverifikasi|disederhanakan|belum)$/i.test(x)); m.set(id, (st || "?").toLowerCase());
  }
  return m;
}

/**
 * Validasi dokumen arah visual. Hanya aktif bila naskah menulis `visual_spec`.
 * Hasil: temuan [{ code, level: "kritis"|"sedang"|"kecil", id, msg }].
 */
export function validateVisualSpec(script, { scriptPath } = {}) {
  const F = []; const add = (code, level, id, msg) => F.push({ code, level, id, msg });
  if (!script.visual_spec || !scriptPath) return F;
  const dir = path.dirname(scriptPath), vf = path.resolve(dir, script.visual_spec);
  if (!fs.existsSync(vf)) { add("V-1", "kritis", "visual_spec", `${path.relative(ROOT, vf)} belum ada`); return F; }
  let v; try { v = JSON.parse(fs.readFileSync(vf, "utf8")); } catch (err) { add("V-1", "kritis", "visual_spec", `JSON tidak valid: ${err.message}`); return F; }
  const v2 = v.version === 2;
  const claimsFile = v.claims_file ? path.resolve(path.dirname(vf), v.claims_file) : path.join(dir, "01-riset-viral.md");
  const claims = readClaims(claimsFile);
  const scenes = v.scenes || {};
  for (const s of script.scenes || []) {
    if (!(Array.isArray(s.shots) && s.shots.length)) continue;
    const id = s.id, e = scenes[id];
    if (!e) { add("V-2", "kritis", id, "scene ber-shots tanpa entri di 03-visual.json"); continue; }
    const hilang = ["purpose", "subjects", "environment", "composition", "animation", "pattern", "dimension"].filter((k) => e[k] === undefined || e[k] === "" || (Array.isArray(e[k]) && !e[k].length));
    if (hilang.length) add("V-3", "kritis", id, `bidang wajib kosong: ${hilang.join(", ")}`);
    const subs = e.subjects || [];
    for (const x of subs) {
      if (!x.treatment || words(x.anatomy) < 12 || !x.scale_ref) add("V-4", "sedang", id, `subjek "${x.id}": ${[!x.treatment && "treatment", words(x.anatomy) < 12 && "anatomy < 12 kata", !x.scale_ref && "scale_ref"].filter(Boolean).join(", ")}`);
    }
    // klaim wajib untuk perilaku faktual dan subjek yang sedang dijelaskan (L1, atau tanpa detail_level di versi 1); benda latar L2/L3 tidak wajib
    const faktual = [...subs.filter((x) => !x.detail_level || x.detail_level === "L1"), ...(e.behavior || [])].filter((x) => x.treatment === "literal" || x.treatment === "simplified");
    if (claims.size) for (const x of faktual) if (!(x.claims || []).length) add("V-5", "sedang", id, `"${x.id || x.subject}" (${x.treatment}) tanpa claims`);
    for (const x of [...subs, ...(e.behavior || [])]) for (const c of x.claims || []) {
      if (claims.size && !claims.has(c)) add("V-6", "kritis", id, `klaim ${c} tidak ada di ${path.relative(ROOT, claimsFile)}`);
      else if (x.treatment === "literal" && claims.get(c) === "belum") add("V-6", "kritis", id, `"${x.id || x.subject}" literal memakai klaim ${c} berstatus belum`);
    }
    const adaKlaim = faktual.some((x) => (x.claims || []).length) || (s.sources || []).some((y) => y && y.id);
    const angka = s.shots.flatMap((x) => [...(x.labels || []).map((l) => l.text), x.count ? String(x.count.value) : ""]).filter((t) => /\d/.test(t));
    if (angka.length && !adaKlaim) add("V-7", "sedang", id, `label/count berangka tanpa klaim: ${angka.join(", ")}`);
    const an = e.animation || {};
    if (!an.initial || !(an.sequence || []).length || !an.final) add("V-8", "kecil", id, "animation tanpa initial, sequence, atau final");
    for (const b of e.behavior || []) if (ABSTRAK.test(b.action || "") && words(b.action) < 4) add("V-8", "kecil", id, `perilaku abstrak: "${b.action}"`);
    if (e.needs) add("V-9", "kritis", id, `menunggu jawaban penulis: ${e.needs}`);
    if (v2) {
      if (subs.some((x) => !x.detail_level)) add("V-10", "sedang", id, "subjek tanpa detail_level");
      const l1 = subs.filter((x) => x.detail_level === "L1");
      if (!l1.length) add("V-10", "sedang", id, "tidak ada subjek L1");
      for (const x of l1) { const k = ["silhouette", "proportions", "details"].filter((q) => !x[q] || (Array.isArray(x[q]) && !x[q].length)); if (!x.material?.type) k.push("material.type"); if (k.length) add("V-11", "kritis", id, `L1 "${x.id}" tanpa ${k.join(", ")}`); }
      for (const x of subs) if (x.material?.type && !MATERIALS.includes(x.material.type)) add("V-12", "sedang", id, `material "${x.material.type}" di luar STYLE.md 2.4`);
      if (!e.light || !(e.art_refs || []).length) add("V-13", "sedang", id, `tanpa ${[!e.light && "light", !(e.art_refs || []).length && "art_refs"].filter(Boolean).join(" dan ")}`);
      const env = e.environment || {};
      if (env.setting && (!env.landmark || (env.types || []).length < 2 || !(env.life || []).length)) add("V-14", "sedang", id, "lingkungan tanpa landmark, types (≥2), atau life");
    }
  }
  return F;
}
