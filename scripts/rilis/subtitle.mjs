// Subtitle SRT per konten (publish/<item>.<bahasa>.srt) dari data produksi, tanpa jaringan.
// Inggris: waktu kata dari produksi/captions. Indonesia: narasi naskah, waktunya dibagi per scene (perkiraan).
// Posisi scene dihitung per frame seperti render.mjs. File yang sudah ada tidak ditimpa.
import fs from "node:fs"; import path from "node:path";
import { pauseSec, readJson } from "../produksi/lib.mjs";
import { ROOT } from "./inti.mjs";

const FPS = 30; const BARIS = 42; const MAKS = BARIS * 2 - 8;

/** Awal tiap scene (ms) dalam satu video berisi `ids` berurutan; sama dengan render.mjs. */
export function awalScene(script, ids) {
  const cari = (id) => script.scenes.find((s) => s.id === id); let frame = 0;
  return ids.map((id, n) => {
    const s = cari(id); const ms = s?.duration_ms?.en; if (!ms) throw new Error(`${id}: durasi audio belum ada`);
    const mulai = (frame / FPS) * 1000; frame += Math.ceil((ms / 1000) * FPS) + Math.round(pauseSec(cari(ids[n + 1])) * FPS);
    return { id, mulai, durasi: ms, scene: s };
  });
}

/** Kelompokkan kata menjadi potongan: putus di akhir kalimat, di koma bila sudah panjang, atau saat penuh. */
export function potongan(kata) {
  const hasil = []; let kini = [];
  const panjang = () => kini.map((k) => k.text).join(" ").length;
  for (const k of kata) {
    if (kini.length && panjang() + 1 + k.text.length > MAKS) { hasil.push(kini); kini = []; }
    kini.push(k);
    if (/[.?!]["')]?$/.test(k.text) || (/[,;:]$/.test(k.text) && panjang() > BARIS)) { hasil.push(kini); kini = []; }
  }
  if (kini.length) hasil.push(kini);
  return hasil;
}

/** Paling banyak dua baris yang seimbang. */
export function duaBaris(teks) {
  if (teks.length <= BARIS) return teks;
  const w = teks.split(" "); let baik = 1, selisih = Infinity;
  for (let i = 1; i < w.length; i++) { const d = Math.abs(w.slice(0, i).join(" ").length - w.slice(i).join(" ").length); if (d < selisih) { selisih = d; baik = i; } }
  return `${w.slice(0, baik).join(" ")}\n${w.slice(baik).join(" ")}`;
}

const cap = (ms) => { const t = Math.round(ms); const p = (n, l = 2) => String(n).padStart(l, "0"); return `${p(Math.floor(t / 3600000))}:${p(Math.floor(t / 60000) % 60)}:${p(Math.floor(t / 1000) % 60)},${p(t % 1000, 3)}`; };
export const srt = (cue) => cue.map((c, i) => `${i + 1}\n${cap(c.mulai)} --> ${cap(Math.max(c.akhir, c.mulai + 300))}\n${duaBaris(c.teks)}\n`).join("\n");

export function cueInggris(script, ids, captions) {
  return awalScene(script, ids).flatMap(({ id, mulai }) => {
    if (!captions[id]?.length) throw new Error(`${id}: caption Inggris belum ada`);
    return potongan(captions[id]).map((p) => ({ mulai: mulai + p[0].startMs, akhir: mulai + p.at(-1).endMs, teks: p.map((k) => k.text).join(" ") }));
  });
}
export function cueIndonesia(script, ids) {
  return awalScene(script, ids).flatMap(({ id, mulai, durasi, scene }) => {
    const teks = scene.narration?.id?.trim(); if (!teks) throw new Error(`${id}: narasi Indonesia belum ada`);
    const bagian = potongan(teks.split(/\s+/).map((text) => ({ text }))).map((p) => p.map((k) => k.text).join(" "));
    const total = bagian.reduce((n, x) => n + x.length, 0); let lalu = 0;
    return bagian.map((x) => { const a = mulai + (durasi * lalu) / total; lalu += x.length; return { mulai: a, akhir: mulai + (durasi * lalu) / total - 50, teks: x }; });
  });
}

/** Tulis subtitle yang belum ada untuk master dan tiap Short. Mengembalikan { dibuat, dilewati }. */
export function buatSubtitle(c) {
  const script = readJson(path.join(c.dir, "03-script.json")); const captions = readJson(path.join(ROOT, "produksi/captions", c.track, c.siklus, "en.json"), null);
  const daftar = [["master", (script.scenes || []).map((s) => s.id)], ...(script.shorts_cuts || []).map((x) => [x.name, x.scene_ids || []])];
  const dibuat = [], dilewati = [];
  for (const [nama, ids] of daftar) for (const [bahasa, cue] of [["en", () => { if (!captions) throw new Error("caption Inggris belum ada"); return cueInggris(script, ids, captions); }], ["id", () => cueIndonesia(script, ids)]]) {
    const file = path.join(c.dir, "publish", `${nama}.${bahasa}.srt`); if (fs.existsSync(file)) continue;
    try { if (!ids.length) throw new Error("tidak ada scene"); const isi = srt(cue()); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, isi); dibuat.push(`${nama}.${bahasa}`); }
    catch (e) { dilewati.push(`${nama}.${bahasa}: ${e.message}`); }
  }
  // Facebook meminta nama berakhiran bahasa_NEGARA.
  const en = path.join(c.dir, "publish/master.en.srt"), fb = path.join(c.dir, "publish/master.en_US.srt");
  if (fs.existsSync(en) && !fs.existsSync(fb)) fs.copyFileSync(en, fb);
  return { dibuat, dilewati };
}
