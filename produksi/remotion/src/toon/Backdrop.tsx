import React from "react";
import { INK, useStage } from "./ctx";
import { DEFAULT_VIEW, MapView, SEA, project } from "./geo";

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
export const Backdrop: React.FC<{ kind: string; frame: number; view?: MapView }> = ({ kind, frame, view }) => {
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
    case "map": {
      const v = view ?? DEFAULT_VIEW;
      scene = (<g>
        <defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7cc6ea" /><stop offset="1" stopColor="#4aa3d1" /></linearGradient></defs>
        <rect width={w} height={h} fill="url(#sea)" />
        {Array.from({ length: 13 }).map((_, i) => <line key={`gx${i}`} x1={(i * w) / 12} y1={0} x2={(i * w) / 12} y2={h} stroke="#ffffff" strokeWidth={2} opacity={0.22} />)}
        {Array.from({ length: 8 }).map((_, i) => <line key={`gy${i}`} x1={0} y1={(i * h) / 7} x2={w} y2={(i * h) / 7} stroke="#ffffff" strokeWidth={2} opacity={0.22} />)}
        {SEA.map((land) => (<polygon key={land.id} points={land.pts.map((p) => project(p, w, h, v).join(",")).join(" ")} fill="#e7d9a8" stroke={INK} strokeWidth={5} strokeLinejoin="round" />))}
        <g transform={`translate(${w - 130},${h - 130})`} opacity={0.85}><circle r={46} fill="#fff6df" stroke={INK} strokeWidth={5} /><path d="M0,-38 L10,0 L0,38 L-10,0z" fill="#d9362b" stroke={INK} strokeWidth={3} /><text y={-52} textAnchor="middle" fontSize={26} fontWeight={900} fill={INK} fontFamily="'Chalkboard SE',sans-serif">N</text></g></g>);
      break;
    }
    case "station":
      scene = (<g>
        <defs><linearGradient id="stn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b9dff2" /><stop offset="1" stopColor="#f2f0e6" /></linearGradient></defs>
        <rect width={w} height={gy} fill="url(#stn)" />
        <rect x={0} y={h * 0.06} width={w} height={h * 0.08} fill="#8e99a8" stroke={INK} strokeWidth={6} />
        {[0.08, 0.3, 0.52, 0.74, 0.94].map((x, i) => <g key={i}><rect x={w * x - 10} y={h * 0.14} width={20} height={gy - h * 0.14} fill="#aab3bf" stroke={INK} strokeWidth={5} /></g>)}
        <rect x={0} y={gy - 10} width={w} height={12} fill="#f5c400" stroke={INK} strokeWidth={4} />
        <rect x={0} y={gy + 2} width={w} height={h - gy} fill="#6e6a62" />
        {[0.3, 0.55, 0.8].map((k, i) => <g key={i}><line x1={0} y1={gy + (h - gy) * k} x2={w} y2={gy + (h - gy) * k} stroke="#c9ced6" strokeWidth={8} /></g>)}
        {Array.from({ length: 24 }).map((_, i) => <line key={i} x1={(i * w) / 23} y1={gy + 6} x2={(i * w) / 23} y2={h} stroke="#3d3a35" strokeWidth={6} opacity={0.5} />)}</g>);
      break;
    case "city":
      scene = (<g>
        <defs><linearGradient id="ct" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7d9a8" /><stop offset="1" stopColor="#f3efe6" /></linearGradient></defs>
        <rect width={w} height={gy} fill="url(#ct)" />
        {[[0.0, 0.34], [0.1, 0.46], [0.22, 0.3], [0.32, 0.56], [0.44, 0.38], [0.55, 0.62], [0.66, 0.34], [0.76, 0.5], [0.88, 0.4]].map(([x, ht], i) => <g key={i}><rect x={w * +x} y={gy - h * +ht} width={w * 0.1} height={h * +ht} fill={["#9db4cf", "#b7a7c9", "#c9b08a", "#a7c4b5"][i % 4]} stroke={INK} strokeWidth={5} />{[0, 1, 2, 3, 4].map((r) => <rect key={r} x={w * +x + w * 0.02} y={gy - h * +ht + h * (0.04 + r * 0.06)} width={w * 0.06} height={h * 0.028} fill="#fff4c9" stroke={INK} strokeWidth={3} />)}</g>)}
        <Floor y={gy} w={w} h={h} a="#8d9099" b="#666a73" /></g>);
      break;
    case "sea":
      scene = (<g>
        <defs><linearGradient id="se" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd9a0" /><stop offset="0.5" stopColor="#bfe3f2" /><stop offset="1" stopColor="#3f9bcd" /></linearGradient></defs>
        <rect width={w} height={h} fill="url(#se)" />
        <circle cx={w * 0.78} cy={h * 0.3} r={h * 0.09} fill="#fff1b8" stroke={INK} strokeWidth={5} />
        <polygon points={`${w * 0.05},${h * 0.52} ${w * 0.16},${h * 0.4} ${w * 0.3},${h * 0.52}`} fill="#5b8f6a" stroke={INK} strokeWidth={5} />
        <rect x={0} y={h * 0.52} width={w} height={gy - h * 0.52} fill="#3f9bcd" />
        {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${(i * w) / 13},${h * 0.58 + (i % 3) * 40} q26,-14 52,0 t52,0`} fill="none" stroke="#ffffff" strokeWidth={5} strokeLinecap="round" opacity={0.7} transform={`translate(${Math.sin((frame + i * 9) / 18) * 12},0)`} />)}
        <Floor y={gy} w={w} h={h} a="#b98050" b="#8c5b34" planks /></g>);
      break;
    case "highland":
      scene = (<g>
        <defs><linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fd0f5" /><stop offset="1" stopColor="#eaf6ff" /></linearGradient></defs>
        <rect width={w} height={gy} fill="url(#hl)" /><Cloud x={w * 0.1} y={h * 0.1} s={1.5} /><Cloud x={w * 0.7} y={h * 0.18} s={1.1} />
        <polygon points={`${w * 0.5},${h * 0.2} ${w * 0.78},${gy} ${w * 0.22},${gy}`} fill="#7d6f63" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <polygon points={`${w * 0.47},${h * 0.2} ${w * 0.53},${h * 0.2} ${w * 0.5},${h * 0.26}`} fill="#ff7a2f" stroke={INK} strokeWidth={4} />
        {[0, 1, 2].map((i) => <circle key={i} cx={w * (0.5 + i * 0.03) + Math.sin((frame + i * 20) / 20) * 8} cy={h * (0.14 - i * 0.045)} r={h * (0.04 + i * 0.012)} fill="#e5e5ea" stroke={INK} strokeWidth={4} opacity={0.9} />)}
        <path d={`M0,${gy} Q${w * 0.2},${gy - h * 0.16} ${w * 0.4},${gy} Q${w * 0.6},${gy - h * 0.1} ${w},${gy}z`} fill="#7ec27a" stroke={INK} strokeWidth={6} />
        {[0.12, 0.2, 0.28].map((k, i) => <path key={i} d={`M${w * 0.0},${gy - h * k * 0.5} Q${w * 0.2},${gy - h * (k * 0.5 + 0.1)} ${w * 0.4},${gy - h * k * 0.5}`} fill="none" stroke="#4f9a54" strokeWidth={5} opacity={0.7} />)}
        <Floor y={gy} w={w} h={h} a="#6fb36a" b="#4f8f4c" /></g>);
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
