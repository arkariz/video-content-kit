// Isi lingkungan tambahan (awan, perahu, burung, semak, lampu gantung, orang lewat) untuk scene yang semula polos.
import React from "react";
import { R } from "@r3";
import { Shade, rr } from "@r3/art";
import { BLUE, CORAL, CREAM, GOLD, GREEN, Glow2, LR, TEALB, WOOD, circ, ell, line } from "./kit";

export const Puff: React.FC<{ x: number; y: number; s?: number; c?: string; o?: number }> = ({ x, y, s = 1, c = "#fff", o = 0.85 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={c} opacity={o}><circle r={46} /><circle cx={56} cy={10} r={33} /><circle cx={-54} cy={13} r={29} /><circle cx={16} cy={-24} r={31} /><rect x={-82} y={10} width={170} height={32} rx={16} /></g>
);
export const Birds: React.FC<{ x: number; y: number; t: number; c?: string; n?: number }> = ({ x, y, t, c = "#241450", n = 5 }) => (
  <g>{Array.from({ length: n }, (_, i) => { const bx = x + i * 62 + R(i, 2) * 30 + t * 22, by = y + (i % 2) * 34 + Math.sin(t * 1.3 + i) * 10, f = Math.sin(t * 7 + i * 2) * 11; return <g key={i}>{line(`M${bx - 20} ${by - f}Q${bx - 8} ${by - 12 - f * 0.4} ${bx} ${by}Q${bx + 8} ${by - 12 - f * 0.4} ${bx + 20} ${by - f}`, c, 5)}</g>; })}</g>
);
export const Boat: React.FC<{ x: number; y: number; s?: number; t: number; sail?: string }> = ({ x, y, s = 1, t, sail = "#fff4da" }) => (
  <g transform={`translate(${x} ${y + Math.sin(t * 2 + x) * 6}) rotate(${Math.sin(t * 1.5 + x) * 2.4}) scale(${s})`}>
    {line("M0 -6V-170", "#98523e", 9)}<Shade d="M8 -168Q96 -110 100 -24H8Z" tones={["#c9a98c", "#ead3ad", sail, "#fffdf4"]} L={LR} s={[4, 12, 7]} /><path d="M-8 -140Q-70 -90 -72 -24H-8Z" fill={CORAL[2]} />
    <Shade d="M-112 -12H112Q92 38 52 42H-52Q-92 38 -112 -12Z" tones={WOOD} L={LR} s={[4, 12, 7]} />{line("M-130 48q40 14 80 0t80 0t80 0", "#cfe8ff", 5, 0.5)}
  </g>
);
export const Shrub: React.FC<{ x: number; y: number; s?: number; c?: [string, string, string]; flower?: string }> = ({ x, y, s = 1, c = ["#1f5a44", "#2f7a58", "#66b878"], flower }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse cy={4} rx={70} ry={10} fill="#10243a" opacity={0.3} /><g fill={c[0]}><circle cy={-34} r={38} /><circle cx={-40} cy={-16} r={26} /><circle cx={40} cy={-18} r={29} /></g><g fill={c[1]}><circle cx={6} cy={-42} r={28} /><circle cx={-34} cy={-24} r={18} /><circle cx={42} cy={-26} r={20} /></g>{line("M-24 -60Q0 -74 24 -62", c[2], 8)}{flower && [[-30, -30], [4, -52], [34, -20], [-6, -22]].map(([a, b]) => <circle key={`${a}${b}`} cx={a} cy={b} r={8} fill={flower} />)}</g>
);
export const Rock: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse cy={3} rx={62} ry={9} fill="#10243a" opacity={0.3} /><Shade d="M-56 0Q-52 -46 -12 -50Q22 -72 42 -34Q64 -22 58 0Z" tones={["#46506c", "#66749a", "#8c9cc0", "#d0dcf4"]} L={LR} s={[5, 14, 8]} /></g>;
export const Lights: React.FC<{ x0: number; x1: number; y: number; t: number; sag?: number; n?: number }> = ({ x0, x1, y, t, sag = 70, n = 14 }) => (
  <g>{line(`M${x0} ${y}Q${(x0 + x1) / 2} ${y + sag * 2} ${x1} ${y}`, "#1c0c3c", 5)}{Array.from({ length: n }, (_, i) => { const u = (i + 0.5) / n, x = x0 + (x1 - x0) * u, yy = y + 4 * sag * u * (1 - u) + 16, c = ["#ffd23f", "#ff9a68", "#8ce8d0"][i % 3]; return <g key={i}><Glow2 x={x} y={yy} r={52} c={c} o={0.45 + Math.sin(t * 3 + i * 1.7) * 0.2} /><circle cx={x} cy={yy} r={11} fill={c} /></g>; })}</g>
);
/** pejalan kaki kecil (siluet badan kacang) */
export const Walker: React.FC<{ x: number; y: number; s?: number; t: number; c?: string; seed?: number }> = ({ x, y, s = 1, t, c = "#2c1650", seed = 0 }) => {
  const b = Math.abs(Math.sin(t * 6 + seed)) * 8, k = Math.sin(t * 6 + seed) * 16;
  return <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse cy={3} rx={40} ry={7} fill="#10042a" opacity={0.35} />{line(`M-10 -28L${-12 - k} 0M10 -28L${12 + k} 0`, c, 12)}<g transform={`translate(0 ${-b})`}><path d={rr(-30, -112, 60, 90, 30)} fill={c} />{line("M-24 -100Q0 -118 20 -104", "#ffb37a", 6, 0.8)}<circle cx={10} cy={-82} r={4.5} fill="#fff" /></g></g>;
};
export const Pendant: React.FC<{ x: number; len: number; t: number; c?: typeof GREEN }> = ({ x, len, t, c = GREEN }) => (
  <g transform={`translate(${x} -60) rotate(${Math.sin(t * 1.2 + x) * 1.6})`}>{line(`M0 0V${len}`, "#2a1c38", 6)}<Glow2 x={0} y={len + 70} r={230} c="#ffd98a" o={0.45} /><Shade d={`M-80 ${len + 62}Q-74 ${len - 4} 0 ${len - 4}Q74 ${len - 4} 80 ${len + 62}Z`} tones={c} L={LR} s={[4, 12, 7]} /><ellipse cy={len + 64} rx={44} ry={13} fill="#fff3c0" /></g>
);
export const Cup: React.FC<{ x: number; y: number; s?: number; t: number; c?: typeof BLUE }> = ({ x, y, s = 1, t, c = TEALB }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse cy={2} rx={62} ry={12} fill={CREAM[2]} />{line("M38 -54q34 0 28 22q-6 18 -32 16", c[2], 10)}<Shade d="M-42 -68H42L34 -6Q0 8 -34 -6Z" tones={c} L={LR} s={[4, 12, 7]} /><ellipse cy={-68} rx={42} ry={9} fill="#6a3a28" />{[0, 1].map((i) => { const u = (t * 0.35 + i * 0.5) % 1; return <circle key={i} cx={Math.sin(u * 6 + i) * 14} cy={-86 - u * 80} r={8 + u * 14} fill="#fff" opacity={0.35 * Math.sin(u * Math.PI)} />; })}</g>
);
export const Vending: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x} ${y})`}><Glow2 x={0} y={-90} r={150} c="#bfe6ff" o={0.45 + Math.sin(t * 9) * 0.03} /><Shade d={rr(-56, -180, 112, 180, 14)} tones={CORAL} L={LR} s={[4, 12, 7]} /><path d={rr(-42, -164, 84, 104, 8)} fill="#e0f4ff" />{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <path key={`${r}${c}`} d={rr(-34 + c * 27, -156 + r * 33, 15, 24, 5)} fill={[BLUE[2], GREEN[2], GOLD[2]][(r + c) % 3]} />))}<path d={rr(-30, -46, 60, 22, 6)} fill="#2a0c20" /></g>
);
export const Lantern: React.FC<{ x: number; y: number; t: number; on?: boolean }> = ({ x, y, t, on = true }) => (
  <g transform={`translate(${x} ${y}) rotate(${Math.sin(t * 1.6 + x) * 5})`}>{line("M0 -26V0", "#0c0828", 4)}{on && <Glow2 x={0} y={30} r={80} c="#ff8a4a" o={0.6} />}<path d={ell(0, 30, 24, 32)} fill={on ? "#ff6a42" : "#4a3058"} />{line("M-20 18H20M-23 34H23M-18 48H18", on ? "#ffc08a" : "#6a4a74", 3)}</g>
);
export const Foam: React.FC<{ d: string; t: number }> = ({ d, t }) => <g><path d={d} stroke="#fff" strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.7} /><path d={d} stroke="#fff" strokeWidth={6} strokeDasharray="36 44" strokeDashoffset={-t * 30} fill="none" transform="translate(0 -24)" opacity={0.55} /></g>;
export const Flag: React.FC<{ x: number; y: number; t: number; c: string }> = ({ x, y, t, c }) => <g transform={`translate(${x} ${y})`}>{line("M0 0V-90", "#e8ecff", 7)}<path d={`M3 -90Q30 ${-98 + Math.sin(t * 5) * 8} 66 ${-80 + Math.sin(t * 5 + 1) * 8}Q34 ${-66 + Math.sin(t * 5) * 6} 3 -62Z`} fill={c} /></g>;
export const _dk = { circ };
