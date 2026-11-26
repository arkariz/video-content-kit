// Pemeran T02 (eksperimen). Bahasa bentuk: badan = satu bentuk dasar, tangan/kaki selang karet, mata titik, satu aksesori.
// Rendering ala R3 (produksi/REFERENSI-GAYA.md): tanpa garis tinta, isian datar + satu bayangan + satu kilap, glow di latar gelap.
import React from "react";

// Pemeran kini tinggal di mesin bersama (src/r3/cast/T02.tsx); file ini meneruskan ekspornya untuk eksperimen lama.
export * from "../r3/cast/T02";
export const SANS = "'Avenir Next','Helvetica Neue',Arial,sans-serif";

/* ------------------------------------------------------------------ */
/** Label pil ala R3: isian warna, teks putih tebal, segitiga penunjuk ke bawah. */
export const Pill: React.FC<{ x: number; y: number; text: string; p?: number; bg?: string; size?: number }> = ({ x, y, text, p = 1, bg = "#e2573d", size = 34 }) => {
  if (p <= 0) return null;
  const w = text.length * size * 0.66 + size * 1.1, h = size * 1.55;
  return (
    <g transform={`translate(${x} ${y}) scale(${p})`}>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={8} fill={bg} />
      <path d={`M-10 0 L10 0 L0 12 Z`} fill={bg} />
      <text y={-h / 2 + size * 0.36} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={size} fill="#fff" letterSpacing={0.5}>{text}</text>
    </g>
  );
};

/** Latar gradien + glow + bokeh ala R3 */
export const Backdrop: React.FC<{ id: string; top: string; bottom: string; glow?: string; glowAt?: [number, number]; dots?: string[]; t: number; n?: number }> = ({ id, top, bottom, glow, glowAt = [960, 600], dots = [], t, n = 40 }) => (
  <g>
    <defs>
      <linearGradient id={`bg${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient>
      {glow && <radialGradient id={`gl${id}`}><stop offset="0" stopColor={glow} stopOpacity={0.55} /><stop offset="1" stopColor={glow} stopOpacity={0} /></radialGradient>}
      <filter id={`bl${id}`}><feGaussianBlur stdDeviation={6} /></filter>
    </defs>
    <rect x={-400} y={-400} width={2720} height={1880} fill={`url(#bg${id})`} />
    {glow && <ellipse cx={glowAt[0]} cy={glowAt[1]} rx={760} ry={520} fill={`url(#gl${id})`} />}
    {dots.length > 0 && Array.from({ length: n }, (_, i) => {
      const r = 3 + ((i * 37) % 11), sx = ((i * 467) % 2100) - 90, sy = ((i * 283) % 1200) - 60;
      return <circle key={i} cx={sx + Math.sin(t * 0.6 + i) * 14} cy={((((sy - t * (8 + (i % 5) * 3)) % 1300) + 1300) % 1300) - 60} r={r} fill={dots[i % dots.length]} opacity={0.5} filter={r > 10 ? `url(#bl${id})` : undefined} />;
    })}
  </g>
);
