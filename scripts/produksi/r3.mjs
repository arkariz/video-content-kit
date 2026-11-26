// Mesin R3 (instruksi/referensi/gaya-visual.md): pembagian kalimat, waktu shot dari caption per kata, dan validasi kontrak `shots`.
// Dipakai bersama oleh build-visual.mjs (validasi), render.mjs (waktu ke komposisi), dan qa-r3.mjs (G1-G6). Sumber tunggal: jangan salin logikanya.
import fs from "node:fs"; import path from "node:path"; import { ROOT } from "./lib.mjs";

export const SCALES = ["map", "place", "object", "inside"];
export const TRANSITIONS = ["cut", "iris", "wipe", "push", "hold"];
export const COUNT_AS = ["dots", "items", "timeline", "split"];
export const ANCHOR_KINDS = ["map", "silhouette", "object"];
export const MOODS = ["warm", "cool", "bright", "dark", "faded", "night", "dusk", "day", "danger", "calm"];
export const EXPR = ["neutral", "happy", "sad", "shock", "tired", "angry", "smug"];
// Pemeran per track (produksi/STYLE.md). Tambah di sini DAN di produksi/remotion/src/r3/cast/ saat menambah tokoh.
export const CAST = { T01: ["you", "owner", "bank", "network", "terminal", "cash"], T02: ["komo", "sepuh", "aturan", "cicak"] };
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
  if (!Array.isArray(cast) || !cast.length) e("cast", "naskah dengan shots butuh `cast` (pemeran track dari produksi/STYLE.md)");
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
      if (x.three_d) w(id, "three_d: lapisan 3D belum ada, dirender versi 2D (transition)");
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
