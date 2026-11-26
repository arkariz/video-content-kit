// Tahap "still" (gate kualitas visual, produksi/PIPELINE.md bagian "Mesin R3" 10).
// Merender still per scene R3, lalu menulis/menggabungkan 04-still.json yang harus dinilai agent (rubrik) dan disetujui kreator
// sebelum render video. Hanya berlaku untuk naskah dengan visual_spec versi 2.
//   node scripts/pipeline/still.mjs --track T01 --siklus 005 [--scenes s01,s02] [--cek]
// Kode keluar: 0 = sudah lulus dan disetujui, 3 = menunggu penilaian/persetujuan, 1 = gagal render.
import fs from "node:fs"; import path from "node:path"; import { spawnSync } from "node:child_process";
import { ROOT, args, readJson, resolveCycle, writeJson } from "../produksi/lib.mjs";

export const RUBRIK = ["siluet", "kompleksitas", "hierarki", "material", "cahaya", "lingkungan", "komposisi", "kedalaman", "akurasi", "polesan"];
export const MIN4 = ["siluet", "material", "cahaya", "lingkungan", "komposisi", "akurasi", "polesan"];

/** Apakah gate still berlaku untuk naskah ini (visual_spec versi 2). */
export function stillBerlaku(dir, script) {
  if (!script?.visual_spec) return false;
  const v = readJson(path.resolve(dir, script.visual_spec), {}); return v.version === 2;
}
/** Status gate: { ok, alasan[] }. ok bila semua scene R3 lulus rubrik (min 4 pada dimensi wajib) dan kreator menyetujui, dan still tidak lebih lama dari 04-shots.tsx. */
export function stillStatus(dir, script) {
  const f = path.join(dir, "04-still.json"); const alasan = [];
  if (!fs.existsSync(f)) return { ok: false, alasan: ["04-still.json belum ada"] };
  const st = readJson(f, {}); const shots = path.join(dir, "04-shots.tsx");
  if (fs.existsSync(shots) && fs.statSync(shots).mtimeMs > fs.statSync(f).mtimeMs) alasan.push("04-shots.tsx berubah setelah still dinilai");
  for (const s of (script.scenes || []).filter((x) => x.shots?.length)) {
    const n = st.scenes?.[s.id];
    if (!n) { alasan.push(`${s.id}: belum ada still`); continue; }
    const rendah = MIN4.filter((k) => !(Number(n.skor?.[k]) >= 4));
    if (rendah.length) alasan.push(`${s.id}: skor di bawah 4 atau kosong (${rendah.join(", ")})`);
    if (n.lulus !== true) alasan.push(`${s.id}: lulus belum true`);
  }
  if (st.kreator?.disetujui !== true) alasan.push("kreator belum menyetujui still (kreator.disetujui)");
  return { ok: !alasan.length, alasan };
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const o = args(); const { dir } = resolveCycle(o.track, o.siklus); const script = readJson(path.join(dir, "03-script.json"));
  if (!stillBerlaku(dir, script)) { console.log("still: tidak berlaku (naskah tanpa visual_spec versi 2)"); process.exit(0); }
  if (o.cek) { const s = stillStatus(dir, script); console.log(s.ok ? "still: LULUS dan disetujui" : `still: menunggu\n  - ${s.alasan.join("\n  - ")}`); process.exit(s.ok ? 0 : 3); }
  const ids = o.scenes ? String(o.scenes).split(",") : script.scenes.filter((s) => s.shots?.length).map((s) => s.id);
  const r = spawnSync("node", ["scripts/produksi/render.mjs", "--track", o.track, "--siklus", o.siklus, "--still", ids.join(",")], { cwd: ROOT, stdio: "inherit" });
  if (r.status) process.exit(1);
  const sdir = path.join(ROOT, "produksi/render", o.track, o.siklus, "stills");
  const f = path.join(dir, "04-still.json"); const st = readJson(f, { _catatan: "Gate still (PIPELINE.md Mesin R3 10). Agent mengisi skor 1-5 per dimensi dan lulus; kreator mengisi kreator.disetujui setelah melihat still.", scenes: {}, kreator: { disetujui: false } });
  for (const id of ids) {
    const files = fs.existsSync(sdir) ? fs.readdirSync(sdir).filter((x) => x.startsWith(`${id}-`) && x.endsWith(".png")).map((x) => path.relative(ROOT, path.join(sdir, x))) : [];
    const lama = st.scenes[id] || {};
    st.scenes[id] = { still: files, skor: lama.skor || Object.fromEntries(RUBRIK.map((k) => [k, null])), catatan: lama.catatan || "", lulus: false };
  }
  st.kreator = { disetujui: false };
  st.dirender = new Date().toISOString();
  writeJson(f, st);
  console.log(`still: ${ids.length} scene dirender ke ${path.relative(ROOT, sdir)}. Nilai dengan rubrik (bandingkan dengan produksi/acuan-visual/), isi 04-still.json, lalu minta kreator menyetujui.`);
  process.exit(3);
}
