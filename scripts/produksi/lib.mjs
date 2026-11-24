// Util bersama. Pemakaian: node --env-file=.env scripts/produksi/<skrip>.mjs --track T01 --siklus 001 [--lang en|id]
import fs from "node:fs";
import path from "node:path";
export const ROOT = path.resolve(import.meta.dirname, "../..");
export function args() {
  const a = process.argv.slice(2), o = { _: [] };
  for (let i = 0; i < a.length; i++) a[i].startsWith("--") ? (o[a[i].slice(2)] = a[++i]) : o._.push(a[i]);
  if (!o.track || !o.siklus) throw new Error("Wajib: --track T01 --siklus 001");
  return o;
}
export function resolveCycle(track, siklus) {
  const tdir = fs.readdirSync(path.join(ROOT, "hasil/tracks")).find((d) => d.startsWith(track + "-"));
  if (!tdir) throw new Error(`Track ${track} tidak ditemukan`);
  const sdir = fs.readdirSync(path.join(ROOT, "hasil/tracks", tdir, "siklus")).find((d) => d.startsWith(siklus));
  if (!sdir) throw new Error(`Siklus ${siklus} tidak ditemukan di ${tdir}`);
  const dir = path.join(ROOT, "hasil/tracks", tdir, "siklus", sdir);
  return { dir, cycleId: sdir, scriptPath: path.join(dir, "03-script.json"), assetsPath: path.join(dir, "04-assets.json") };
}
export const readJson = (p, d) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : d);
export const writeJson = (p, v) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n"); };
export const need = (k) => { if (!process.env[k]) throw new Error(`Env ${k} kosong. Jalankan dengan: node --env-file=.env ...`); return process.env[k]; };
export const pLimit = (n) => { let run = 0; const q = []; const next = () => { if (run >= n || !q.length) return; run++; const [f, res, rej] = q.shift(); f().then(res, rej).finally(() => { run--; next(); }); }; return (f) => new Promise((res, rej) => { q.push([f, res, rej]); next(); }); };
