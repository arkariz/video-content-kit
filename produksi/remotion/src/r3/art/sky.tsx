// Langit senja dan awan gugus lobus (T4, T8).
import React from "react";
import { R, clamp, mix } from "../kit";
import { Shade, Tones, V2, f1, rr, useSid } from "./core";

/* ============================== LANGIT DAN AWAN ============================== */

export const SKY = { top: "#1a0f4a", hi: "#3a237a", mid: "#7e3a96", low: "#d0587e", glow: "#f5835e", sun: "#ffc58a" };

export const Sky: React.FC<{ t: number }> = ({ t }) => {
  const id = useSid();
  return (
    <g>
      <defs>
        <linearGradient id={`s${id}`} gradientUnits="userSpaceOnUse" x1={0} y1={-300} x2={0} y2={980}>
          <stop offset={0} stopColor={SKY.top} /><stop offset={0.3} stopColor={SKY.hi} /><stop offset={0.58} stopColor={SKY.mid} />
          <stop offset={0.8} stopColor={SKY.low} /><stop offset={0.93} stopColor={SKY.glow} /><stop offset={1} stopColor="#ffb27a" />
        </linearGradient>
        <radialGradient id={`g${id}`} cx={0.5} cy={0.5} r={0.5}>
          <stop offset={0} stopColor={SKY.sun} stopOpacity={0.95} /><stop offset={0.25} stopColor="#ff9a6a" stopOpacity={0.55} /><stop offset={1} stopColor="#ff9a6a" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x={-600} y={-700} width={3200} height={2600} fill={`url(#s${id})`} />
      <circle cx={1050} cy={690} r={560 + Math.sin(t * 0.8) * 6} fill={`url(#g${id})`} />
      <circle cx={1050} cy={690} r={66} fill="#ffe2b0" opacity={0.95} />
      <circle cx={1050} cy={690} r={108} fill="#ffd29a" opacity={0.3} />
    </g>
  );
};

/** T4: awan gugus lobus, bawah kanan menyala jingga (matahari rendah di kanan bawah). */
export const Cloud: React.FC<{ x: number; y: number; s: number; seed: number; base?: string; lit?: string; shadow?: string; op?: number }> = ({ x, y, s, seed, base = "#4a3482", lit = "#f0906a", shadow = "#33246a", op = 1 }) => {
  const id = useSid();
  const n = 6 + Math.floor(R(seed, 41) * 4);
  const lobes = Array.from({ length: n }, (_, i) => {
    const u = i / (n - 1);
    const cx = (u - 0.5) * 2 * s * (0.9 + R(seed + i, 42) * 0.15);
    const rad = s * (0.28 + Math.sin(u * Math.PI) * 0.42 + R(seed + i, 43) * 0.12);
    return { cx, cy: -rad * 0.55 + R(seed + i, 44) * s * 0.08, r: rad };
  });
  const flatBottom = s * 0.18;
  const all = (fill: string, dx = 0, dy = 0) => (
    <g fill={fill} transform={`translate(${dx} ${dy})`}>
      {lobes.map((l, i) => <circle key={i} cx={l.cx} cy={l.cy} r={l.r} />)}
      <path d={rr(-s * 1.05, -s * 0.3, s * 2.1, s * 0.3 + flatBottom, s * 0.15)} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <defs><clipPath id={`k${id}`}>{lobes.map((l, i) => <circle key={i} cx={l.cx} cy={l.cy} r={l.r} />)}<path d={rr(-s * 1.05, -s * 0.3, s * 2.1, s * 0.3 + flatBottom, s * 0.15)} /></clipPath></defs>
      {all(lit)}
      <g clipPath={`url(#k${id})`}>{all(base, -s * 0.05, -s * 0.07)}{all(shadow, -s * 0.16, -s * 0.2)}</g>
    </g>
  );
};

