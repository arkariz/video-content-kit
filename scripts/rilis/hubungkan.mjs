// Menghubungkan channel (izin tulis) dari dashboard: menjalankan auth.mjs dan meneruskan jawabannya.
// Izin tetap diberikan kreator di halaman Google, dan channel dikonfirmasi kreator sebelum disimpan.
import fs from "node:fs"; import path from "node:path"; import { spawn } from "node:child_process"; import { parseEnv } from "node:util";
import { ROOT } from "../produksi/lib.mjs";

let kini = null;
export const status = () => (kini ? { track: kini.track, tahap: kini.tahap, url: kini.url, channel: kini.channel, pesan: kini.pesan } : null);

/** Baca ulang variabel YouTube dari .env agar token baru langsung terpakai tanpa mulai ulang. */
export function muatEnv(file = path.join(ROOT, ".env")) {
  if (!fs.existsSync(file)) return;
  for (const [k, v] of Object.entries(parseEnv(fs.readFileSync(file, "utf8")))) if (/^(YOUTUBE|FACEBOOK)_/.test(k)) process.env[k] = v;
}

export function mulai(track, { perintah = [process.execPath, `--env-file-if-exists=${path.join(ROOT, ".env")}`, path.join(ROOT, "scripts/youtube/auth.mjs"), "--track", track, "--tulis"], selesai = muatEnv } = {}) {
  if (!/^T\d\d$/.test(track)) throw new Error("track tidak sah");
  batal();
  const anak = spawn(perintah[0], perintah.slice(1), { cwd: ROOT });
  const k = (kini = { track, tahap: "menyiapkan", url: null, channel: null, pesan: "", anak });
  let keluaran = "";
  const baca = (d) => {
    keluaran += d;
    k.url ||= keluaran.match(/https:\/\/accounts\.google\.com\/\S+/)?.[0] ?? null;
    const c = keluaran.match(/Tersambung ke channel "(.*?)" \((.*?)\)/);
    if (c) { k.channel = `${c[1]} (${c[2]})`; k.tahap = "konfirmasi"; k.pesan = keluaran.match(/PERHATIAN: .*/)?.[0] ?? ""; }
    else if (k.url) k.tahap = "izin";
  };
  anak.stdout.on("data", baca); anak.stderr.on("data", baca);
  anak.on("error", (e) => { k.tahap = "gagal"; k.pesan = e.message; });
  anak.on("close", (kode) => {
    if (k.dibatalkan) return;
    if (kode === 0) { selesai(); k.tahap = "selesai"; k.pesan = "Izin tersimpan."; }
    else { k.tahap = "gagal"; k.pesan = keluaran.split("\n").find((b) => /Error:/.test(b))?.replace(/^.*Error: /, "") ?? "proses izin berhenti"; }
  });
}
export function setujuiChannel() {
  if (kini?.tahap !== "konfirmasi") throw new Error("belum ada channel untuk dikonfirmasi");
  kini.tahap = "menyimpan"; kini.anak.stdin.write("ya\n");
}
export function batal() { if (kini) { kini.dibatalkan = true; kini.anak.kill(); kini = null; } }
