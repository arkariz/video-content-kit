import React from "react";
import { INK, useStage } from "./ctx";

const Floor: React.FC<{ y: number; w: number; h: number; a: string; b: string; planks?: boolean }> = ({ y, w, h, a, b, planks }) => (
  <g><rect x={0} y={y} width={w} height={h - y} fill={`url(#fl)`} />
    <defs><linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
    {planks && Array.from({ length: 9 }).map((_, i) => <line key={i} x1={0} y1={y + ((h - y) * (i + 1)) / 9} x2={w} y2={y + ((h - y) * (i + 1)) / 9} stroke="#00000018" strokeWidth={3} />)}
    <line x1={0} y1={y} x2={w} y2={y} stroke={INK} strokeWidth={5} /></g>
);
const Cloud: React.FC<{ x: number; y: number; s: number; o?: number }> = ({ x, y, s, o = 0.9 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}><path d="M0,40 a30,30 0 0 1 22,-48 a40,40 0 0 1 76,-8 a30,30 0 0 1 20,56z" fill="#fff" /></g>
);

/** Latar bergaya lukisan datar: gradasi + bentuk sederhana + grain + vignette. */
export const Backdrop: React.FC<{ kind: string; frame: number }> = ({ kind, frame }) => {
  const { w, h, groundY } = useStage();
  const gy = groundY - 6;
  let scene: React.ReactNode;
  switch (kind) {
    case "cafe":
      scene = (<g>
        <defs><linearGradient id="cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6dcb4" /><stop offset="1" stopColor="#e2b57c" /></linearGradient></defs>
        <rect width={w} height={gy} fill="url(#cw)" />
        <rect x={w * 0.08} y={h * 0.1} width={w * 0.2} height={h * 0.34} rx={14} fill="#bfe6fb" stroke={INK} strokeWidth={8} /><line x1={w * 0.18} y1={h * 0.1} x2={w * 0.18} y2={h * 0.44} stroke={INK} strokeWidth={6} /><line x1={w * 0.08} y1={h * 0.27} x2={w * 0.28} y2={h * 0.27} stroke={INK} strokeWidth={6} />
        <rect x={w * 0.62} y={h * 0.12} width={w * 0.26} height={h * 0.24} rx={10} fill="#2f3a33" stroke="#8a5a2b" strokeWidth={12} />
        {[0, 1, 2].map((i) => <line key={i} x1={w * 0.65} y1={h * (0.18 + i * 0.055)} x2={w * (0.78 - i * 0.04)} y2={h * (0.18 + i * 0.055)} stroke="#f4f1ea" strokeWidth={5} strokeLinecap="round" opacity={0.8} />)}
        <Floor y={gy} w={w} h={h} a="#b98050" b="#8c5b34" planks /></g>);
      break;
    case "street":
      scene = (<g>
        <defs><linearGradient id="st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fd0f5" /><stop offset="1" stopColor="#e9f6ff" /></linearGradient></defs>
        <rect width={w} height={gy} fill="url(#st)" /><Cloud x={w * 0.12} y={h * 0.08} s={1.6} /><Cloud x={w * 0.62} y={h * 0.14} s={1.2} />
        {[[0.0, 0.3, "#c8a98a"], [0.2, 0.42, "#a9b9d0"], [0.45, 0.28, "#d9b28a"], [0.66, 0.4, "#b7a7c9"], [0.86, 0.3, "#c9b08a"]].map(([x, ht, c], i) => (
          <g key={i}><rect x={w * +x} y={gy - h * +ht} width={w * 0.17} height={h * +ht} fill={String(c)} stroke={INK} strokeWidth={6} />
            {[0, 1, 2].map((r) => [0, 1].map((q) => <rect key={`${r}${q}`} x={w * +x + w * (0.03 + q * 0.06)} y={gy - h * +ht + h * (0.04 + r * 0.07)} width={w * 0.04} height={h * 0.045} fill="#fff4c9" stroke={INK} strokeWidth={4} />))}</g>))}
        <Floor y={gy} w={w} h={h} a="#8d9099" b="#6c6f78" /></g>);
      break;
    case "bank":
      scene = (<g>
        <defs><linearGradient id="bk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f3ecd8" /><stop offset="1" stopColor="#d8cba8" /></linearGradient></defs>
        <rect width={w} height={gy} fill="url(#bk)" />
        {[0.06, 0.3, 0.7, 0.94].map((x, i) => <g key={i}><rect x={w * x - w * 0.025} y={h * 0.06} width={w * 0.05} height={gy - h * 0.06} fill="#efe6cb" stroke={INK} strokeWidth={6} /><rect x={w * x - w * 0.032} y={h * 0.05} width={w * 0.064} height={h * 0.03} fill="#e1d4b0" stroke={INK} strokeWidth={5} /></g>)}
        <Floor y={gy} w={w} h={h} a="#cfc3a1" b="#a99c78" /></g>);
      break;
    case "sky":
      scene = (<g>
        <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5fb4ee" /><stop offset="1" stopColor="#d6efff" /></linearGradient></defs>
        <rect width={w} height={h} fill="url(#sk)" />
        {[[0.1, 0.12, 1.8], [0.5, 0.06, 2.2], [0.78, 0.2, 1.5], [0.3, 0.3, 1.2], [0.9, 0.42, 1.4]].map(([x, y, s], i) => <Cloud key={i} x={((w * +x + frame * (0.6 + i * 0.15)) % (w + 300)) - 150} y={h * +y} s={+s} />)}
        <Floor y={gy + 14} w={w} h={h} a="#f1f6ff" b="#cfe0f5" /></g>);
      break;
    case "night":
      scene = (<g>
        <defs><linearGradient id="ng" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16204a" /><stop offset="1" stopColor="#3b3f7a" /></linearGradient></defs>
        <rect width={w} height={gy} fill="url(#ng)" />
        {Array.from({ length: 28 }).map((_, i) => <circle key={i} cx={(i * 337) % w} cy={((i * 191) % (h * 0.4)) + 20} r={2 + (i % 3)} fill="#fff" opacity={0.6 + 0.3 * Math.sin(frame / 12 + i)} />)}
        {[[0.02, 0.3], [0.17, 0.42], [0.34, 0.26], [0.52, 0.38], [0.7, 0.3], [0.86, 0.44]].map(([x, ht], i) => <g key={i}><rect x={w * +x} y={gy - h * +ht} width={w * 0.14} height={h * +ht} fill="#242b5c" stroke={INK} strokeWidth={5} />{[0, 1, 2, 3].map((r) => <rect key={r} x={w * +x + w * 0.03} y={gy - h * +ht + h * (0.04 + r * 0.06)} width={w * 0.025} height={h * 0.03} fill="#ffd966" />)}</g>)}
        <Floor y={gy} w={w} h={h} a="#2a2f5e" b="#1b1f40" /></g>);
      break;
    case "vault":
      scene = (<g>
        <defs><linearGradient id="vt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5a6272" /><stop offset="1" stopColor="#363c48" /></linearGradient></defs>
        <rect width={w} height={gy} fill="url(#vt)" />
        {Array.from({ length: 12 }).map((_, i) => <g key={i}><circle cx={(i + 0.5) * (w / 12)} cy={h * 0.08} r={8} fill="#8a92a0" stroke={INK} strokeWidth={3} /><circle cx={(i + 0.5) * (w / 12)} cy={gy - 24} r={8} fill="#8a92a0" stroke={INK} strokeWidth={3} /></g>)}
        <Floor y={gy} w={w} h={h} a="#454b58" b="#2b2f39" /></g>);
      break;
    case "paper":
    default:
      scene = (<g>
        <rect width={w} height={h} fill="#f6ecd2" />
        {Array.from({ length: 40 }).map((_, i) => <line key={`v${i}`} x1={i * 60} y1={0} x2={i * 60} y2={h} stroke="#d9c9a0" strokeWidth={2} opacity={0.6} />)}
        {Array.from({ length: 24 }).map((_, i) => <line key={`h${i}`} x1={0} y1={i * 60} x2={w} y2={i * 60} stroke="#d9c9a0" strokeWidth={2} opacity={0.6} />)}</g>);
  }
  return (
    <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
      {scene}
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" /><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0" /></filter>
      <rect width={w} height={h} filter="url(#grain)" />
      <defs><radialGradient id="vg" cx="50%" cy="50%" r="75%"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.28" /></radialGradient></defs>
      <rect width={w} height={h} fill="url(#vg)" />
    </svg>
  );
};
