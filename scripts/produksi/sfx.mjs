// Sintesis efek suara kartun orisinal (tanpa aset pihak ketiga) -> produksi/sfx/*.wav (mono 22,05 kHz)
import fs from "node:fs"; import path from "node:path"; import { ROOT } from "./lib.mjs";
const SR = 22050; const out = path.join(ROOT, "produksi/sfx"); fs.mkdirSync(out, { recursive: true });
const env = (t, d, a = 0.005) => (t < a ? t / a : Math.exp(-(t - a) * (5 / d)));
const mk = (dur, f) => { const n = Math.floor(SR * dur), b = Buffer.alloc(44 + n * 2); b.write("RIFF", 0); b.writeUInt32LE(36 + n * 2, 4); b.write("WAVEfmt ", 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write("data", 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) { const v = Math.max(-1, Math.min(1, f(i / SR, i))); b.writeInt16LE(Math.round(v * 30000), 44 + i * 2); } return b; };
const noise = () => Math.random() * 2 - 1; const sin = (f, t) => Math.sin(2 * Math.PI * f * t);
const S = {
  pop: mk(0.14, (t) => sin(380 + 900 * Math.exp(-t * 40), t) * env(t, 0.1)),
  whoosh: mk(0.4, (t) => { const k = Math.sin((Math.PI * t) / 0.4); return noise() * 0.35 * k * (0.5 + 0.5 * sin(6, t)); }),
  ding: mk(0.7, (t) => (sin(1320, t) + 0.5 * sin(1980, t) + 0.25 * sin(2640, t)) * 0.5 * env(t, 0.5)),
  buzz: mk(0.45, (t) => (Math.sign(sin(110, t)) * 0.5 + 0.2 * noise()) * env(t, 0.35, 0.01)),
  thud: mk(0.3, (t) => (sin(90 * Math.exp(-t * 6), t) * 1.2 + 0.3 * noise() * Math.exp(-t * 40)) * env(t, 0.2, 0.002)),
  coin: mk(0.35, (t) => (t < 0.08 ? sin(1568, t) : sin(2093, t)) * 0.5 * env(t % 0.08, 0.2)),
};
for (const [k, b] of Object.entries(S)) fs.writeFileSync(path.join(out, `${k}.wav`), b);
console.log("sfx:", Object.keys(S).join(", "));
