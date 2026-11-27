// Layanan latar macOS (launchd) milik akun ini: penjadwal tiap 5 menit dan dashboard yang selalu hidup.
// Dipasang dan dicopot kreator lewat tombol di dashboard (atau jadwal.mjs pasang/copot).
// RILIS_AGENTS_DIR dan RILIS_LAUNCHCTL mengganti tujuan (dipakai uji.mjs agar sistem tidak tersentuh).
import fs from "node:fs"; import os from "node:os"; import path from "node:path"; import { execFileSync } from "node:child_process";
import { ROOT as REPO } from "../produksi/lib.mjs";

export const SELANG = 300; // detik antar putaran penjadwal
export const PORT = 4747;
export const LAYANAN = {
  penjadwal: { label: "com.video-content-kit.rilis", skrip: ["scripts/rilis/jadwal.mjs", "jalan"], selang: SELANG },
  dashboard: { label: "com.video-content-kit.rilis-dashboard", skrip: ["scripts/rilis/dashboard.mjs", "--port", String(PORT)], tetapHidup: true },
};
const dirAgen = () => process.env.RILIS_AGENTS_DIR || path.join(os.homedir(), "Library/LaunchAgents");
export const filePlist = (nama) => path.join(dirAgen(), `${LAYANAN[nama].label}.plist`);
export const terpasang = (nama) => fs.existsSync(filePlist(nama));
const logDari = (nama) => path.join(os.homedir(), "Library/Logs", `${LAYANAN[nama].label}.log`);

const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const str = (s) => `<string>${xml(s)}</string>`;
export function plist(nama, { node, root, logFile }) {
  const l = LAYANAN[nama]; const [skrip, ...sisa] = l.skrip;
  const argumen = [node, `--env-file-if-exists=${path.join(root, ".env")}`, path.join(root, skrip), ...sisa];
  const env = { PATH: `${path.dirname(node)}:/usr/local/bin:/usr/bin:/bin`, RILIS_LAYANAN: nama };
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key>${str(l.label)}
  <key>ProgramArguments</key><array>${argumen.map(str).join("")}</array>
  <key>WorkingDirectory</key>${str(root)}
  <key>EnvironmentVariables</key><dict>${Object.entries(env).map(([k, v]) => `<key>${k}</key>${str(v)}`).join("")}</dict>
  ${l.tetapHidup ? "<key>KeepAlive</key><true/>" : `<key>StartInterval</key><integer>${l.selang}</integer>`}
  <key>RunAtLoad</key><true/>
  <key>StandardOutPath</key>${str(logFile)}
  <key>StandardErrorPath</key>${str(logFile)}
</dict></plist>
`;
}

const launchctl = (...a) => execFileSync(process.env.RILIS_LAUNCHCTL || "launchctl", a, { stdio: "pipe" }).toString();
const tujuan = (nama) => `gui/${process.getuid()}/${LAYANAN[nama].label}`;
export const termuat = (nama) => { try { launchctl("print", tujuan(nama)); return true; } catch { return false; } };

export function pasang(nama) {
  if (!LAYANAN[nama]) throw new Error("layanan tidak dikenal");
  if (process.env.RILIS_ROOT && !process.env.RILIS_AGENTS_DIR) throw new Error("mode demo: layanan tidak dipasang");
  if (!process.env.RILIS_AGENTS_DIR && /\.claude\/worktrees\//.test(REPO)) throw new Error("jalankan dari folder repo utama, bukan worktree");
  if (!fs.existsSync(path.join(REPO, ".env"))) throw new Error(".env tidak ada di akar repo");
  const node = ["/opt/homebrew/bin/node", "/usr/local/bin/node"].find((p) => fs.existsSync(p)) ?? process.execPath;
  fs.mkdirSync(dirAgen(), { recursive: true }); fs.writeFileSync(filePlist(nama), plist(nama, { node, root: REPO, logFile: logDari(nama) }));
  if (termuat(nama)) { try { launchctl("bootout", tujuan(nama)); } catch { /* belum termuat */ } }
  launchctl("bootstrap", `gui/${process.getuid()}`, filePlist(nama));
}
export function copot(nama) {
  if (!LAYANAN[nama]) throw new Error("layanan tidak dikenal");
  fs.rmSync(filePlist(nama), { force: true }); // file dihapus dulu: bootout bisa mematikan proses ini sendiri
  if (termuat(nama)) launchctl("bootout", tujuan(nama));
}
