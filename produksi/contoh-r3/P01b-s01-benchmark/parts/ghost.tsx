// Khusus P01: siluet air mata (miskonsepsi), metafora L2.
import React from "react";

/** Siluet air mata (miskonsepsi, L2 metafora): tembus pucat, garis tepi putus. */
export const TearGhost2: React.FC<{ x: number; y: number; r: number; p: number }> = ({ x, y, r, p }) => {
  if (p <= 0) return null;
  const d = `M0 ${-r * 1.75}C${r * 0.25} ${-r * 1.2} ${r * 1.02} ${-r * 0.55} ${r * 1.02} ${r * 0.15}C${r * 1.02} ${r * 0.72} ${r * 0.56} ${r * 1.05} 0 ${r * 1.05}C${-r * 0.56} ${r * 1.05} ${-r * 1.02} ${r * 0.72} ${-r * 1.02} ${r * 0.15}C${-r * 1.02} ${-r * 0.55} ${-r * 0.25} ${-r * 1.2} 0 ${-r * 1.75}Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * p})`} opacity={p}>
      <path d={d} fill="#ffc2d4" opacity={0.28} />
      <path d={d} fill="none" stroke="#ffd6e2" strokeWidth={r * 0.035} strokeLinecap="round" strokeDasharray={`${r * 0.16} ${r * 0.1}`} />
    </g>
  );
};

