// Catatan proses produksi visual per siklus (04-proses.jsonl): setiap render still/video dan setiap putaran review
// menambah satu baris, supaya proses bisa diputar ulang dan dipelajari agent berikutnya (PIPELINE.md Mesin R3 10).
import fs from "node:fs"; import path from "node:path"; import crypto from "node:crypto"; import { execFileSync } from "node:child_process";
import { ROOT } from "./lib.mjs";

const sha = (buf) => crypto.createHash("sha1").update(buf).digest("hex").slice(0, 12);
const tsx = (d) => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((x) => x.isDirectory() ? tsx(path.join(d, x.name)) : x.name.endsWith(".tsx") ? [path.join(d, x.name)] : []).sort() : [];
/** Hash gabungan kode adegan (04-shots.tsx + parts/*.tsx) di folder siklus. */
export const kodeHash = (dir) => { const f = tsx(dir); return f.length ? sha(Buffer.concat(f.map((x) => fs.readFileSync(x)))) : null; };
export const fileHash = (f) => (fs.existsSync(f) ? sha(fs.readFileSync(f)) : null);
const git = () => { try { const h = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim(); const dirty = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" }).trim() ? "+lokal" : ""; return h + dirty; } catch { return null; } };

/** Tambah satu baris ke <dir>/04-proses.jsonl. */
export function logProses(dir, entry) {
  const row = { waktu: new Date().toISOString(), git: git(), kode: kodeHash(dir), ...entry };
  fs.appendFileSync(path.join(dir, "04-proses.jsonl"), JSON.stringify(row) + "\n");
  return row;
}

/** Salin still (PNG) ke <dir>/04-still/putaran-N/ sebagai JPEG kecil (lebar 960) supaya riwayat ikut di-commit. Hasil: path relatif. */
export function arsipStill(dir, files, n) {
  const out = path.join(dir, "04-still", `putaran-${n}`); fs.mkdirSync(out, { recursive: true });
  return files.filter((f) => fs.existsSync(path.resolve(ROOT, f))).map((f) => {
    const dst = path.join(out, path.basename(f).replace(/\.png$/, ".jpg"));
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", path.resolve(ROOT, f), "-vf", "scale='min(960,iw)':-2", "-q:v", "4", dst]);
    return path.relative(ROOT, dst);
  });
}
