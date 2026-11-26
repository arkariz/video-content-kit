// Kota berlapis dan hujan untuk P01. Gedung: isian membulat dengan bayangan dan kilap (FlatRect), tanpa garis tinta.
import React from "react";
import { FlatRect, R, mix, shade } from "@r3";

export const Skyline: React.FC<{ x0: number; x1: number; base: number; seed: number; fill: string; win?: string; h: [number, number]; w?: [number, number]; lit?: number }> = ({ x0, x1, base, seed, fill, win, h, w = [70, 130], lit = 0.35 }) => {
  const out: React.ReactNode[] = []; let x = x0, i = 0;
  while (x < x1) {
    const bw = mix(w[0], w[1], R(i + seed * 99, 1)), bh = mix(h[0], h[1], R(i + seed * 99, 2) ** 1.4), c = R(i + seed * 99, 3) < 0.5 ? fill : shade(fill, 0.1);
    out.push(<g key={i}>
      <FlatRect x={x} y={base - bh} w={bw} h={bh + 400} r={14} fill={c} shadeK={0.22} side="right" />
      {R(i + seed, 8) < 0.28 && <g><rect x={x + bw * 0.2} y={base - bh - 26} width={bw * 0.34} height={28} rx={9} fill={shade(c, 0.15)} /><rect x={x + bw * 0.3} y={base - bh - 6} width={6} height={10} fill={shade(c, 0.3)} /></g>}
      {R(i + seed, 9) > 0.78 && <g><rect x={x + bw * 0.55} y={base - bh - 58} width={5} height={60} rx={2.5} fill={shade(c, 0.25)} /><circle cx={x + bw * 0.55 + 2.5} cy={base - bh - 60} r={5} fill="#ff8a6a" opacity={0.85} /></g>}
      {win && Array.from({ length: Math.floor(bh / 38) * Math.floor((bw - 20) / 28) }, (_, j) => {
        const cols = Math.floor((bw - 20) / 28), cx = x + 14 + (j % cols) * 28, cy = base - bh + 18 + Math.floor(j / cols) * 38;
        return R(j + i * 31 + seed, 10) < lit ? <rect key={j} x={cx} y={cy} width={16} height={22} rx={5} fill={win} opacity={0.55 + 0.4 * R(j, 11)} /> : null;
      })}
    </g>);
    x += bw + 4 + R(i, 12) * 10; i++;
  }
  return <g>{out}</g>;
};

/** Garis hujan miring. speed > 0 turun, speed < 0 naik (kamera ikut jatuh). Koordinat layar logis. */
export const Rain: React.FC<{ t: number; n: number; area: [number, number, number, number]; len?: [number, number]; speed: number; slant?: number; color?: string; w?: number; seed?: number; op?: number; blur?: boolean }> = ({ t, n, area, len = [40, 90], speed, slant = 0.12, color = "#dbe9f5", w = 3, seed = 0, op = 0.35, blur }) => {
  const [x0, y0, x1, y1] = area, hh = y1 - y0;
  const g = (
    <g stroke={color} strokeWidth={w} strokeLinecap="round" opacity={op}>
      {Array.from({ length: n }, (_, i) => {
        const x = mix(x0, x1, R(i + seed * 50, 1)), L = mix(len[0], len[1], R(i + seed * 50, 2)), ph = R(i + seed * 50, 3) * hh;
        const y = y0 + ((((ph + t * speed * (0.8 + 0.4 * R(i, 4))) % hh) + hh) % hh);
        return <line key={i} x1={x} y1={y} x2={x + slant * L} y2={y + L} />;
      })}
    </g>
  );
  return blur ? <g filter="url(#r3b6)">{g}</g> : g;
};

/** Kabut tipis berupa pita gradien horizontal. */
export const Fog: React.FC<{ y: number; h: number; color: string; o?: number; x0?: number; x1?: number }> = ({ y, h, color, o = 0.4, x0 = -1500, x1 = 5000 }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <g opacity={o}>
      <defs><linearGradient id={`f${id}`} x1={0} y1={0} x2={0} y2={1}><stop offset={0} stopColor={color} stopOpacity={0} /><stop offset={0.5} stopColor={color} stopOpacity={1} /><stop offset={1} stopColor={color} stopOpacity={0} /></linearGradient></defs>
      <rect x={x0} y={y} width={x1 - x0} height={h} fill={`url(#f${id})`} />
    </g>
  );
};
