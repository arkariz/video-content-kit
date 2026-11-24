import React from "react";
import { INK } from "./ctx";

export type Emo = "neutral" | "happy" | "shock" | "angry" | "smug" | "sad" | "think" | "worry" | "dead";

/** Wajah kartun sederhana: mata titik, alis, mulut. cx,cy = pusat; s = jari-jari kepala. */
export const Face: React.FC<{ cx: number; cy: number; s: number; emo: Emo; ink?: string; blink?: number }> = ({ cx, cy, s, emo, ink = INK, blink = 1 }) => {
  const ex = 0.38 * s, ey = cy - 0.08 * s, my = cy + 0.42 * s, er = 0.11 * s;
  const sw = Math.max(3, s * 0.07);
  const dot = (x: number, y: number) => <ellipse cx={x} cy={y} rx={er} ry={er * blink} fill={ink} />;
  const brow = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth={sw * 1.2} strokeLinecap="round" />;
  const L = cx - ex, R = cx + ex;
  switch (emo) {
    case "happy":
      return (<g>{dot(L, ey)}{dot(R, ey)}<path d={`M${cx - 0.3 * s},${my - 0.06 * s} Q${cx},${my + 0.42 * s} ${cx + 0.3 * s},${my - 0.06 * s} Z`} fill="#fff" stroke={ink} strokeWidth={sw} strokeLinejoin="round" /></g>);
    case "shock":
      return (<g>
        <circle cx={L} cy={ey} r={0.2 * s} fill="#fff" stroke={ink} strokeWidth={sw} /><circle cx={L} cy={ey} r={0.05 * s} fill={ink} />
        <circle cx={R} cy={ey} r={0.2 * s} fill="#fff" stroke={ink} strokeWidth={sw} /><circle cx={R} cy={ey} r={0.05 * s} fill={ink} />
        <ellipse cx={cx} cy={my + 0.06 * s} rx={0.12 * s} ry={0.18 * s} fill="#5b1a1a" stroke={ink} strokeWidth={sw} />
        <path d={`M${cx + 0.78 * s},${cy - 0.5 * s} q${0.1 * s},${0.2 * s} 0,${0.28 * s} q${-0.1 * s},${-0.08 * s} 0,${-0.28 * s}`} fill="#7ec8f2" stroke={ink} strokeWidth={sw * 0.6} />
      </g>);
    case "angry":
      return (<g>{dot(L, ey)}{dot(R, ey)}{brow(L - 0.22 * s, ey - 0.3 * s, L + 0.2 * s, ey - 0.14 * s)}{brow(R + 0.22 * s, ey - 0.3 * s, R - 0.2 * s, ey - 0.14 * s)}
        <path d={`M${cx - 0.24 * s},${my + 0.1 * s} Q${cx},${my - 0.1 * s} ${cx + 0.24 * s},${my + 0.1 * s}`} fill="none" stroke={ink} strokeWidth={sw} strokeLinecap="round" /></g>);
    case "smug":
      return (<g>{dot(L, ey + 0.03 * s)}{dot(R, ey + 0.03 * s)}
        <line x1={L - 0.17 * s} y1={ey - 0.02 * s} x2={L + 0.17 * s} y2={ey - 0.02 * s} stroke={ink} strokeWidth={sw * 1.4} strokeLinecap="round" />
        <line x1={R - 0.17 * s} y1={ey - 0.02 * s} x2={R + 0.17 * s} y2={ey - 0.02 * s} stroke={ink} strokeWidth={sw * 1.4} strokeLinecap="round" />
        <path d={`M${cx - 0.2 * s},${my} Q${cx + 0.12 * s},${my + 0.2 * s} ${cx + 0.32 * s},${my - 0.1 * s}`} fill="none" stroke={ink} strokeWidth={sw} strokeLinecap="round" /></g>);
    case "sad":
    case "worry":
      return (<g>{dot(L, ey)}{dot(R, ey)}{brow(L - 0.2 * s, ey - 0.12 * s, L + 0.2 * s, ey - 0.3 * s)}{brow(R + 0.2 * s, ey - 0.12 * s, R - 0.2 * s, ey - 0.3 * s)}
        <path d={emo === "sad" ? `M${cx - 0.2 * s},${my + 0.1 * s} Q${cx},${my - 0.08 * s} ${cx + 0.2 * s},${my + 0.1 * s}` : `M${cx - 0.24 * s},${my + 0.02 * s} q${0.08 * s},${-0.1 * s} ${0.16 * s},0 t${0.16 * s},0 t${0.16 * s},0`} fill="none" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
        {emo === "sad" ? <circle cx={L - 0.05 * s} cy={ey + 0.34 * s} r={0.07 * s} fill="#7ec8f2" /> : <path d={`M${cx + 0.78 * s},${cy - 0.5 * s} q${0.1 * s},${0.2 * s} 0,${0.28 * s} q${-0.1 * s},${-0.08 * s} 0,${-0.28 * s}`} fill="#7ec8f2" stroke={ink} strokeWidth={sw * 0.6} />}</g>);
    case "think":
      return (<g>{dot(L + 0.05 * s, ey - 0.06 * s)}{dot(R + 0.05 * s, ey - 0.06 * s)}{brow(R - 0.15 * s, ey - 0.34 * s, R + 0.2 * s, ey - 0.26 * s)}
        <path d={`M${cx - 0.12 * s},${my} q${0.08 * s},${-0.08 * s} ${0.16 * s},0 t${0.16 * s},0`} fill="none" stroke={ink} strokeWidth={sw} strokeLinecap="round" /></g>);
    case "dead":
      return (<g>{[L, R].map((x, i) => <g key={i}><line x1={x - er} y1={ey - er} x2={x + er} y2={ey + er} stroke={ink} strokeWidth={sw} /><line x1={x + er} y1={ey - er} x2={x - er} y2={ey + er} stroke={ink} strokeWidth={sw} /></g>)}
        <path d={`M${cx - 0.2 * s},${my + 0.08 * s} q${0.1 * s},${-0.14 * s} ${0.2 * s},0 t${0.2 * s},0`} fill="none" stroke={ink} strokeWidth={sw} /></g>);
    default:
      return (<g>{dot(L, ey)}{dot(R, ey)}<path d={`M${cx - 0.2 * s},${my} Q${cx},${my + 0.1 * s} ${cx + 0.2 * s},${my}`} fill="none" stroke={ink} strokeWidth={sw} strokeLinecap="round" /></g>);
  }
};
