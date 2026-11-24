// Adaptor tahap LLM. Urutan: (1) Claude Code headless (`claude -p`) bila terpasang; (2) kalau tidak, cetak prompt
// dan keluar dengan kode 3 ("butuh agen") supaya agen di sesi Claude Code menjalankannya ("lanjut T01").
import { spawnSync } from "node:child_process"; import fs from "node:fs"; import path from "node:path";
import { ROOT } from "../produksi/lib.mjs";
export const hasClaude = () => spawnSync("which", ["claude"]).status === 0;
export function runPrompt(name, vars) {
  const file = path.join(ROOT, "scripts/pipeline/prompts", `${name}.md`);
  let text = fs.readFileSync(file, "utf8"); for (const [k, v] of Object.entries(vars)) text = text.replaceAll(`{{${k}}}`, v);
  if (!hasClaude()) { console.log(`\n--- PROMPT ${name} (butuh agen; jalankan di sesi Claude Code atau pasang CLI claude) ---\n${text}\n---`); return 3; }
  const r = spawnSync("claude", ["-p", text, "--permission-mode", "acceptEdits", "--allowedTools", "Read,Write,Edit,Glob,Grep,WebSearch,WebFetch,Bash(node scripts/*),Bash(python3.12 scripts/check_kit.py*)"], { cwd: ROOT, stdio: "inherit" });
  return r.status ?? 1;
}
