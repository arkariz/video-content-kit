// Atmosfer: hujan berlapis dan pita kabut.
import React from "react";
import { R, clamp, mix } from "../kit";
import { Shade, Tones, V2, f1, rr, useSid } from "./core";

/* ============================== HUJAN DAN ATMOSFER ============================== */

/** Hujan sebagai garis bulat pendek di satu kedalaman; jatuh relatif (latar naik karena tetes jatuh). */
export const RainLayer: React.FC<{ t: number; n: number; seed: number; len: [number, number]; w: number; color: string; op: number; speed: number; area?: [number, number, number, number] }> = ({ t, n, seed, len, w, color, op, speed, area = [-100, -200, 2020, 1280] }) => {
  const [ax, ay, bx, by] = area, H2 = by - ay;
  return (
    <g stroke={color} strokeWidth={w} strokeLinecap="round" opacity={op}>
      {Array.from({ length: n }, (_, i) => {
        const L = mix(len[0], len[1], R(seed + i, 91)), x = mix(ax, bx, R(seed + i, 92));
        const y = ay + ((R(seed + i, 93) * H2 + t * speed) % H2 + H2) % H2;
        return <path key={i} d={`M${x} ${y}l${-L * 0.08} ${-L}`} />;
      })}
    </g>
  );
};

/** Pita kabut tipis antar lapisan (gradien boleh untuk atmosfer). */
export const MistBand: React.FC<{ y: number; h: number; color: string; op: number }> = ({ y, h, color, op }) => {
  const id = useSid();
  return (
    <g>
      <defs><linearGradient id={`m${id}`} x1={0} y1={0} x2={0} y2={1}><stop offset={0} stopColor={color} stopOpacity={0} /><stop offset={0.5} stopColor={color} stopOpacity={op} /><stop offset={1} stopColor={color} stopOpacity={0} /></linearGradient></defs>
      <rect x={-600} y={y} width={3200} height={h} fill={`url(#m${id})`} />
    </g>
  );
};

