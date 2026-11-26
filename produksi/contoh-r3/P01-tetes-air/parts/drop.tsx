// Tetes air lembut (tanpa garis tinta): gradien, meniskus gelap di tepi, kilap, rim light, pantulan kota terbalik di dalamnya.
// Bentuk: flat 0 = bola, flat 1 = roti burger (atas membulat, dasar pipih dan sedikit cekung). Tidak pernah berujung lancip.
import React from "react";
import { R, lerpColor, mix, shade, tint } from "@r3";

export const CLEAR = "#6fd0f2", MURKY = "#a58558", GREY = "#8f9188";

export type DropP = { x: number; y: number; r: number; flat?: number; sx?: number; sy?: number; rot?: number; tone?: string; refl?: number; op?: number; rim?: number };
export const Drop: React.FC<DropP> = ({ x, y, r, flat = 0, sx = 1, sy = 1, rot = 0, tone = CLEAR, refl = 0.7, op = 1, rim = 1 }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const rx = r * (1 + 0.27 * flat), hT = r * (1 - 0.18 * flat), hB = r * (1 - 0.4 * flat), k = 0.5523;
  const body = `M${-rx} 0 C${-rx} ${-hT * k} ${-rx * k} ${-hT} 0 ${-hT} C${rx * k} ${-hT} ${rx} ${-hT * k} ${rx} 0 C${rx} ${hB * k} ${rx * k} ${hB} 0 ${hB} C${-rx * k} ${hB} ${-rx} ${hB * k} ${-rx} 0 Z`;
  const lt = tint(tone, 0.62), dk = shade(tone, 0.4), ed = shade(tone, 0.6), bd = shade(tone, 0.45);
  const rimPath = `M${rx * 0.88} ${hB * 0.02} C${rx * 0.88} ${hB * 0.62} ${rx * 0.46} ${hB * 0.93} ${rx * 0.04} ${hB * 0.92}`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${sx} ${sy})`} opacity={op}>
      <defs>
        <radialGradient id={`b${id}`} cx={0.34} cy={0.3} r={0.85}><stop offset={0} stopColor={lt} stopOpacity={0.96} /><stop offset={0.5} stopColor={tone} stopOpacity={0.9} /><stop offset={1} stopColor={dk} stopOpacity={0.96} /></radialGradient>
        <radialGradient id={`e${id}`} cx={0.5} cy={0.5} r={0.5}><stop offset={0.6} stopColor={ed} stopOpacity={0} /><stop offset={1} stopColor={ed} stopOpacity={0.62} /></radialGradient>
        <clipPath id={`c${id}`}><path d={body} /></clipPath>
      </defs>
      <path d={body} fill={`url(#b${id})`} />
      {refl > 0 && (
        <g clipPath={`url(#c${id})`} opacity={refl}>
          <rect x={-rx} y={hB * 0.1} width={rx * 2} height={hB} fill="#fff" opacity={0.17} />
          {Array.from({ length: 9 }, (_, i) => {
            const w = rx * 0.2, bx = -rx * 1.05 + i * rx * 0.25 + R(i, 4) * 6, h = hT * (0.3 + R(i, 2) * 0.55);
            return (
              <g key={i}>
                <rect x={bx} y={-hT * 1.02} width={w} height={h} rx={w * 0.28} fill={bd} opacity={0.6} />
                <rect x={bx + w * 0.25} y={-hT * 1.02 + h * 0.55} width={w * 0.2} height={w * 0.26} rx={2} fill="#ffd98a" opacity={0.75} />
                <rect x={bx + w * 0.58} y={-hT * 1.02 + h * 0.3} width={w * 0.2} height={w * 0.26} rx={2} fill="#ffd98a" opacity={R(i, 7) > 0.4 ? 0.7 : 0} />
              </g>
            );
          })}
        </g>
      )}
      <path d={body} fill={`url(#e${id})`} />
      <ellipse cx={-rx * 0.38} cy={-hT * 0.5} rx={r * 0.24} ry={r * 0.11} transform={`rotate(-32 ${-rx * 0.38} ${-hT * 0.5})`} fill="#fff" opacity={0.3} filter="url(#r3b3)" />
      <ellipse cx={-rx * 0.38} cy={-hT * 0.5} rx={r * 0.17} ry={r * 0.07} transform={`rotate(-32 ${-rx * 0.38} ${-hT * 0.5})`} fill="#fff" opacity={0.88} />
      <circle cx={-rx * 0.16} cy={-hT * 0.8} r={r * 0.045} fill="#fff" opacity={0.7} />
      <path d={rimPath} stroke={lerpColor(lt, "#d9f6ff", 0.6)} strokeWidth={r * 0.07} fill="none" strokeLinecap="round" opacity={0.6 * rim} />
      {flat > 0.25 && <path d={`M${-rx * 0.5} ${hB * 0.74} Q0 ${hB * mix(0.74, 0.5, flat)} ${rx * 0.5} ${hB * 0.74}`} stroke="#fff" strokeWidth={r * 0.05} fill="none" strokeLinecap="round" opacity={0.28 * flat} />}
    </g>
  );
};

/** Siluet air mata klasik (runcing di atas): hanya untuk membantah miskonsepsi, pucat dan tembus. */
export const TearGhost: React.FC<{ x: number; y: number; r: number; p: number }> = ({ x, y, r, p }) => {
  if (p <= 0.001) return null;
  const d = `M0 ${-1.65 * r} C${0.22 * r} ${-1.0 * r} ${r} ${-0.6 * r} ${r} ${0.12 * r} A${r} ${r} 0 0 1 ${-r} ${0.12 * r} C${-r} ${-0.6 * r} ${-0.22 * r} ${-1.0 * r} 0 ${-1.65 * r} Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${p})`} opacity={0.6}>
      <path d={d} fill="#dfe8f0" opacity={0.55} />
      <path d={d} fill="none" stroke="#fff" strokeWidth={r * 0.05} opacity={0.5} strokeLinejoin="round" />
    </g>
  );
};

/** Percikan: cincin riak melebar dan tetes kecil melengkung. t0 = detik saat benda menyentuh air. */
export const Splash: React.FC<{ x: number; y: number; t: number; t0: number; color?: string; s?: number; seed?: number }> = ({ x, y, t, t0, color = "#c8efff", s = 1, seed = 0 }) => {
  const p = t - t0; const L = 1.3; if (p < 0 || p > L) return null; const q = 1 - p / L;
  return (
    <g>
      <ellipse cx={x} cy={y} rx={24 * s + p * 170 * s} ry={(24 * s + p * 170 * s) * 0.2} fill="none" stroke={color} strokeWidth={7 * s * q} opacity={0.85 * q} />
      <ellipse cx={x} cy={y} rx={10 * s + p * 90 * s} ry={(10 * s + p * 90 * s) * 0.2} fill="none" stroke={color} strokeWidth={5 * s * q} opacity={0.6 * q} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI * (0.12 + 0.76 * R(i + seed, 1)), v = 330 * s * (0.55 + 0.8 * R(i + seed, 3));
        return <circle key={i} cx={x + Math.cos(a) * v * p} cy={y + Math.sin(a) * v * p + 820 * s * p * p} r={(5 + R(i, 5) * 8) * s * q} fill={color} opacity={0.9 * q} />;
      })}
    </g>
  );
};

/** Kilau empat titik membulat (klorin, kilap). */
export const Sparkle: React.FC<{ x: number; y: number; s: number; c?: string; o?: number; rot?: number }> = ({ x, y, s, c = "#e9fbff", o = 1, rot = 0 }) => (
  <path d={`M0 ${-s} Q0 0 ${s} 0 Q0 0 0 ${s} Q0 0 ${-s} 0 Q0 0 0 ${-s} Z`} transform={`translate(${x} ${y}) rotate(${rot})`} fill={c} opacity={o} />
);
