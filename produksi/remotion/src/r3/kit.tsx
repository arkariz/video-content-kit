// Primitif bersama gaya R3 (instruksi/referensi/gaya-visual.md). Semua koordinat logis 1920x1080; mesin menskalakan ke komposisi.
// Gaya gambar: vektor datar tanpa garis tinta, isian + satu bayangan + satu kilap, latar gradien, partikel, glow, blur kedalaman.
import React from "react";
import { Easing, interpolate } from "remotion";

export const W = 1920, H = 1080;
export const SANS = "'Avenir Next','Helvetica Neue',Arial,sans-serif";

/* ------------------------------ waktu dan acak ------------------------------ */
export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
/** 0→1 antara detik a dan b (default ease in-out cubic). */
export const seg = (t: number, a: number, b: number, e: (n: number) => number = Easing.inOut(Easing.cubic)) =>
  b <= a ? (t >= a ? 1 : 0) : interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
/** Masuk dengan pantulan (back 1,8), ±0,2 dtk, mulai di detik a. */
export const pop = (t: number, a: number, d = 0.22) => seg(t, a, a + d, Easing.out(Easing.back(1.8)));
/** Keluar dengan mengecil, mulai di detik a. Hasil 1 → 0. */
export const out = (t: number, a: number, d = 0.2) => 1 - seg(t, a, a + d, Easing.in(Easing.back(1.5)));
/** Acak deterministik 0..1 dari angka atau teks. */
export const R = (i: number | string, k = 1) => {
  const n = typeof i === "number" ? i : [...i].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 1e6, 7);
  const x = Math.sin(n * 127.1 * k + 311.7) * 43758.5453; return x - Math.floor(x);
};
export const pick = <T,>(arr: T[], seed: number | string) => arr[Math.floor(R(seed) * arr.length) % arr.length];
/** Interpolasi berkunci: nilai vals[i] pada detik keys[i], halus di antaranya. */
export const keys = (t: number, ks: number[], vals: number[], e: (n: number) => number = Easing.inOut(Easing.sin)) => {
  if (t <= ks[0]) return vals[0]; let i = 0; while (i < ks.length - 2 && t > ks[i + 1]) i++;
  return mix(vals[i], vals[i + 1], seg(t, ks[i], ks[i + 1], e));
};

/* ------------------------------ warna ------------------------------ */
const hex = (c: string) => { const h = c.replace("#", ""); const f = h.length === 3 ? h.split("").map((x) => x + x).join("") : h; return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16)); };
const toHex = (r: number[]) => "#" + r.map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("");
export const shade = (c: string, k = 0.25) => toHex(hex(c).map((v) => v * (1 - k)));
export const tint = (c: string, k = 0.25) => toHex(hex(c).map((v) => v + (255 - v) * k));
export const lerpColor = (a: string, b: string, p: number) => { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => mix(v, B[i], clamp(p)))); };
/** Pudarkan warna ke kelabu (keadaan mati, gagal, masa lalu). */
export const fade = (c: string, k = 0.6) => { const [r, g, b] = hex(c); const l = 0.3 * r + 0.59 * g + 0.11 * b; return toHex([r, g, b].map((v) => mix(v, l, k))); };

/* ------------------------------ kanvas ------------------------------ */
const BLURS = [3, 6, 10, 16, 26, 40];
export const Defs: React.FC = () => (
  <defs>
    {BLURS.map((b) => <filter key={b} id={`r3b${b}`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation={b} /></filter>)}
    <filter id="r3mblur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="12 2" /></filter>
    <radialGradient id="r3vig" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={0.42} /></radialGradient>
  </defs>
);
/** Kanvas SVG 1920x1080 dengan filter blur bersama (`r3b3`…`r3b40`) dan vinyet. */
export const Frame: React.FC<{ children: React.ReactNode; vignette?: number }> = ({ children, vignette = 0.6 }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    <Defs />
    {children}
    {vignette > 0 && <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="url(#r3vig)" opacity={vignette} pointerEvents="none" />}
  </svg>
);
/** Blur kedalaman: latar depan besar dan blur, latar jauh kecil dan pudar. b = 3, 6, 10, 16, 26, atau 40. */
export const Blur: React.FC<{ b?: number; children: React.ReactNode }> = ({ b, children }) => {
  if (!b) return <>{children}</>;
  const near = BLURS.reduce((a, x) => (Math.abs(x - b) < Math.abs(a - b) ? x : a), BLURS[0]);
  return <g filter={`url(#r3b${near})`}>{children}</g>;
};

/* ------------------------------ kamera ------------------------------ */
export type Cam = { x: number; y: number; z: number };
/** Lapisan parallax. d=0 diam (langit), d=1 bidang utama, d>1 latar depan. cam.x/y = titik yang dilihat, cam.z = zoom. */
export const Layer: React.FC<{ cam: Cam; d: number; children: React.ReactNode; blur?: number; opacity?: number }> = ({ cam, d, children, blur, opacity }) => {
  const z = 1 + (cam.z - 1) * d, x = (cam.x - W / 2) * d, y = (cam.y - H / 2) * d;
  return <g transform={`translate(${W / 2} ${H / 2}) scale(${z}) translate(${-W / 2 - x} ${-H / 2 - y})`} opacity={opacity}><Blur b={blur}>{children}</Blur></g>;
};
/** Kamera melayang pelan (tidak pernah diam). amp dalam piksel logis. */
export const float = (t: number, amp = 10, seed = 0) => ({ x: Math.sin(t * 0.37 + seed) * amp, y: Math.cos(t * 0.29 + seed * 1.7) * amp * 0.6 });

/* ------------------------------ latar ------------------------------ */
/** Latar gradien 2-3 warna (atas → bawah), glow opsional, partikel mengambang. */
export const Backdrop: React.FC<{ stops: string[]; t: number; glow?: string; glowAt?: [number, number]; glowR?: number; particles?: string[]; n?: number; speed?: number; angle?: number }> = ({ stops, t, glow, glowAt = [W / 2, H * 0.55], glowR = 760, particles, n = 40, speed = 1, angle = 0 }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const rad = (angle * Math.PI) / 180;
  return (
    <g>
      <defs>
        <linearGradient id={`g${id}`} x1={0.5 - Math.sin(rad) / 2} y1={0.5 - Math.cos(rad) / 2} x2={0.5 + Math.sin(rad) / 2} y2={0.5 + Math.cos(rad) / 2}>
          {stops.map((c, i) => <stop key={i} offset={stops.length === 1 ? 0 : i / (stops.length - 1)} stopColor={c} />)}
        </linearGradient>
        {glow && <radialGradient id={`h${id}`}><stop offset="0" stopColor={glow} stopOpacity={0.6} /><stop offset="1" stopColor={glow} stopOpacity={0} /></radialGradient>}
      </defs>
      <rect x={-600} y={-600} width={W + 1200} height={H + 1200} fill={`url(#g${id})`} />
      {glow && <ellipse cx={glowAt[0]} cy={glowAt[1]} rx={glowR} ry={glowR * 0.68} fill={`url(#h${id})`} />}
      {particles && <Particles t={t} colors={particles} n={n} speed={speed} />}
    </g>
  );
};
/** Partikel kecil yang naik dan bergoyang; yang besar diberi blur (dekat kamera). */
export const Particles: React.FC<{ t: number; colors: string[]; n?: number; speed?: number; area?: [number, number, number, number]; size?: [number, number]; opacity?: number; seed?: number }> = ({ t, colors, n = 40, speed = 1, area = [-100, -60, W + 100, H + 60], size = [3, 14], opacity = 0.5, seed = 0 }) => {
  const [x0, y0, x1, y1] = area, hgt = y1 - y0;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const r = mix(size[0], size[1], R(i + seed * 100, 2) ** 2), sx = mix(x0, x1, R(i + seed * 100, 3)), sy = mix(y0, y1, R(i + seed * 100, 4));
        const y = y0 + ((((sy - y0 - t * speed * (10 + R(i, 5) * 18)) % hgt) + hgt) % hgt);
        const el = <circle key={i} cx={sx + Math.sin(t * 0.6 + i) * 14} cy={y} r={r} fill={colors[i % colors.length]} opacity={opacity * (0.5 + R(i, 6) * 0.5)} />;
        return r > size[1] * 0.7 ? <g key={i} filter="url(#r3b6)">{el}</g> : el;
      })}
    </g>
  );
};
/** Bayangan jatuh berupa elips tipis di bawah benda. */
export const Shadow: React.FC<{ x?: number; y?: number; w: number; o?: number }> = ({ x = 0, y = 0, w, o = 0.18 }) => <ellipse cx={x} cy={y + 3} rx={w} ry={w * 0.16} fill="#000" opacity={o} />;

/* ------------------------------ bentuk datar ------------------------------ */
/** Kotak membulat gaya R3: isian, bayangan di sisi bawah/kanan, kilap tipis di atas. */
export const FlatRect: React.FC<{ x: number; y: number; w: number; h: number; r?: number; fill: string; shadeK?: number; side?: "bottom" | "right"; hi?: boolean }> = ({ x, y, w, h, r = 12, fill, shadeK = 0.18, side = "bottom", hi = true }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <g>
      <clipPath id={`c${id}`}><rect x={x} y={y} width={w} height={h} rx={r} /></clipPath>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} />
      <g clipPath={`url(#c${id})`}>
        {side === "bottom" ? <rect x={x} y={y + h * 0.72} width={w} height={h * 0.3} fill={shade(fill, shadeK)} /> : <rect x={x + w * 0.78} y={y} width={w * 0.24} height={h} fill={shade(fill, shadeK)} />}
        {hi && <rect x={x + r} y={y + Math.min(10, h * 0.08)} width={Math.max(0, w - r * 2)} height={Math.max(3, Math.min(10, h * 0.06))} rx={5} fill="#fff" opacity={0.22} />}
      </g>
    </g>
  );
};

/* ------------------------------ sorotan ------------------------------ */
/** Glow berdenyut di sekitar titik (benda penting di latar gelap, atau sorotan di kata kerja). p = kekuatan 0..1. */
export const Glow: React.FC<{ x: number; y: number; r: number; color: string; p?: number; t?: number; pulse?: number }> = ({ x, y, r, color, p = 1, t = 0, pulse = 0.08 }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  if (p <= 0) return null;
  const k = 1 + Math.sin(t * 5) * pulse;
  return (
    <g opacity={p}>
      <defs><radialGradient id={`gl${id}`}><stop offset="0" stopColor={color} stopOpacity={0.75} /><stop offset="0.45" stopColor={color} stopOpacity={0.3} /><stop offset="1" stopColor={color} stopOpacity={0} /></radialGradient></defs>
      <circle cx={x} cy={y} r={r * k} fill={`url(#gl${id})`} />
    </g>
  );
};
/** Garis tepi terang di sekitar bentuk (path d). Untuk sorotan "diaktifkan". */
export const GlowEdge: React.FC<{ d: string; color?: string; p?: number; w?: number; t?: number }> = ({ d, color = "#9ff3ff", p = 1, w = 10, t = 0 }) => p <= 0 ? null : (
  <g opacity={p * (0.85 + Math.sin(t * 6) * 0.15)} fill="none" strokeLinejoin="round" strokeLinecap="round">
    <path d={d} stroke={color} strokeWidth={w * 3} opacity={0.25} filter="url(#r3b10)" />
    <path d={d} stroke={color} strokeWidth={w} />
  </g>
);
/** Kejadian kecil berulang (percikan, petir): acak, hidup 3-9 frame. rate = kejadian per detik. */
export const Sparks: React.FC<{ t: number; x: number; y: number; rate?: number; spread?: number; color?: string; seed?: number; fps?: number; size?: number; from?: number; until?: number }> = ({ t, x, y, rate = 6, spread = 40, color = "#fff27a", seed = 0, fps = 30, size = 60, from = -1e9, until = 1e9 }) => {
  if (t < from || t > until) return null;
  const f = Math.floor(t * fps), slot = Math.floor(fps / Math.max(0.5, rate));
  const live: React.ReactNode[] = [];
  for (let k = Math.floor((f - 9) / slot); k <= Math.floor(f / slot); k++) {
    const born = k * slot + Math.floor(R(k + seed * 1000, 7) * slot), life = 3 + Math.floor(R(k + seed * 1000, 8) * 7);
    if (f < born || f > born + life || born / fps < from) continue;
    const a = R(k, 9) * Math.PI * 2, cx = x + Math.cos(a) * spread * R(k, 10), cy = y + Math.sin(a) * spread * R(k, 10) * 0.6, L = size * (0.6 + R(k, 11) * 0.8);
    const pts = Array.from({ length: 5 }, (_, j) => { const u = j / 4; return [cx + Math.cos(a) * L * u + (j % 2 ? 1 : -1) * L * 0.18 * Math.sin(a), cy + Math.sin(a) * L * u + (j % 2 ? -1 : 1) * L * 0.18 * Math.cos(a)]; });
    const d = "M" + pts.map((p) => p.map((v) => v.toFixed(1)).join(" ")).join(" L");
    live.push(<g key={k} opacity={1 - (f - born) / (life + 1)}><path d={d} stroke={color} strokeWidth={14} opacity={0.35} fill="none" filter="url(#r3b6)" /><path d={d} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>);
  }
  return <g>{live}</g>;
};

/* ------------------------------ teks kecil ------------------------------ */
export type Ptr = "down" | "up" | "left" | "right" | "none";
/** Label pil: isian rata, teks putih tebal, segitiga penunjuk ke benda. (x, y) = ujung penunjuk. p = skala masuk/keluar. */
export const Pill: React.FC<{ x: number; y: number; text: string; p?: number; bg?: string; fg?: string; size?: number; ptr?: Ptr; rot?: number }> = ({ x, y, text, p = 1, bg = "#e2573d", fg = "#fff", size = 40, ptr = "down", rot = 0 }) => {
  if (p <= 0.001) return null;
  const w = text.length * size * 0.62 + size * 1.2, h = size * 1.6, g = 16;
  const off: Record<Ptr, [number, number]> = { down: [0, -h / 2 - g], up: [0, h / 2 + g], left: [w / 2 + g, 0], right: [-w / 2 - g, 0], none: [0, 0] };
  const [ox, oy] = off[ptr];
  const tri: Record<Ptr, string> = { down: `M-14 ${h / 2 - 1} L0 ${h / 2 + g} L14 ${h / 2 - 1} Z`, up: `M-14 ${-h / 2 + 1} L0 ${-h / 2 - g} L14 ${-h / 2 + 1} Z`, left: `M${-w / 2 + 1} -14 L${-w / 2 - g} 0 L${-w / 2 + 1} 14 Z`, right: `M${w / 2 - 1} -14 L${w / 2 + g} 0 L${w / 2 - 1} 14 Z`, none: "" };
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p}) translate(${ox} ${oy})`}>
      <rect x={-w / 2 + 5} y={-h / 2 + 7} width={w} height={h} rx={7} fill="#000" opacity={0.16} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={7} fill={bg} />
      {ptr !== "none" && <path d={tri[ptr]} fill={bg} />}
      <text y={size * 0.35} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={size} fill={fg} letterSpacing={0.5}>{text}</text>
    </g>
  );
};
/** Bubble kecil untuk sikap atau lelucon (maksimal 6 kata, jarang). (x, y) = ujung ekor. */
export const Bubble: React.FC<{ x: number; y: number; text: string; p?: number; size?: number; tail?: "left" | "right"; bg?: string; fg?: string }> = ({ x, y, text, p = 1, size = 38, tail = "left", bg = "#fff", fg = "#26222b" }) => {
  if (p <= 0.001) return null;
  const w = text.length * size * 0.55 + size * 1.4, h = size * 1.9, s = tail === "left" ? 1 : -1;
  return (
    <g transform={`translate(${x} ${y}) scale(${p})`}>
      <g transform={`translate(${s * (w / 2 - 30)} ${-h / 2 - 40})`}>
        <rect x={-w / 2 + 6} y={-h / 2 + 8} width={w} height={h} rx={h / 2} fill="#000" opacity={0.15} />
        <path d={`M${-s * (w / 2 - 50)} ${h / 2 - 6} Q${-s * (w / 2 - 34)} ${h / 2 + 26} ${-s * (w / 2 - 30)} ${h / 2 + 40} Q${-s * (w / 2 - 70)} ${h / 2 + 20} ${-s * (w / 2 - 90)} ${h / 2 - 6} Z`} fill={bg} />
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={bg} />
        <text y={size * 0.35} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={size} fill={fg}>{text}</text>
      </g>
    </g>
  );
};
/** Catatan kaki kecil di sudut bawah (keterangan tambahan, bukan papan teks). */
export const Footnote: React.FC<{ text: string; p?: number; x?: number; y?: number; color?: string }> = ({ text, p = 1, x = 60, y = H - 150, color = "#fff" }) => p <= 0 ? null : (
  <text x={x} y={y} fontFamily={SANS} fontWeight={600} fontSize={26} fill={color} opacity={0.75 * p}>{text}</text>
);
