// Aset bersama T01-005 (2.5D, rendering datar bertingkat; produksi/STYLE.md 2-5, palet T01 STYLE.md 8).
import React from "react";
import { R, SANS, mix, seg } from "@r3";
import { Shade, Tones, rr } from "@r3/art";

export const P = { cream: "#fff4da", green: "#2f8f6b", coin: "#ffd23f", navy: "#172447", coral: "#e4572e" };
export const CREAM: Tones = ["#c9a98c", "#ead3ad", "#fff4da", "#fffdf4"];
export const GREEN: Tones = ["#164a45", "#1f6a57", "#2f8f6b", "#66c795"];
export const GOLD: Tones = ["#a85a28", "#e09a2c", "#ffd23f", "#fff0a0"];
export const CORAL: Tones = ["#7a2440", "#b83a34", "#e4572e", "#ff9a68"];
export const TEALB: Tones = ["#133f58", "#1b6678", "#2596a0", "#6fd8cc"];
export const BLUE: Tones = ["#1c2870", "#2745a8", "#3b6fd8", "#7fb4ff"];
export const WOOD: Tones = ["#3c1d3e", "#6a3340", "#98523e", "#d98a56"];
export const STEEL: Tones = ["#23305a", "#43588a", "#6c86b4", "#c0d6f0"];
export const DARK: Tones = ["#090d22", "#121a3a", "#1f2b55", "#4a62a0"];
export const COPPER: Tones = ["#5a2430", "#94442e", "#cc6c34", "#ffb070"];
/** arah cahaya: kanan atas (senja) dan kiri atas (bulan) */
export const LR: [number, number] = [0.8, -0.6];
export const LL: [number, number] = [-0.7, -0.7];

export const tw = (x: number, fb: number) => (Number.isFinite(x) ? x : fb);
export const circ = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}A${r} ${r} 0 1 0 ${cx + r} ${cy}A${r} ${r} 0 1 0 ${cx - r} ${cy}Z`;
export const ell = (cx: number, cy: number, rx: number, ry: number) => `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;
const line = (d: string, c: string, w: number, o = 1) => <path d={d} stroke={c} strokeWidth={w} opacity={o} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
export { line };

export const Contact: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 0.38 }) => <ellipse cx={x} cy={y} rx={w} ry={w * 0.13} fill="#1a0c34" opacity={o} />;
export const Glow2: React.FC<{ x: number; y: number; r: number; c: string; o?: number }> = ({ x, y, r, c, o = 0.6 }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  return (<g><defs><radialGradient id={`gg${id}`}><stop offset={0} stopColor={c} stopOpacity={o} /><stop offset={0.4} stopColor={c} stopOpacity={o * 0.4} /><stop offset={1} stopColor={c} stopOpacity={0} /></radialGradient></defs><circle cx={x} cy={y} r={r} fill={`url(#gg${id})`} /></g>);
};
/** garis tangan selang karet */
export const Hose: React.FC<{ d: string; tones: Tones; w?: number }> = ({ d, tones, w = 26 }) => (<g>{line(d, tones[1], w)}<g transform="translate(3 -3)">{line(d, tones[2], w * 0.62)}</g></g>);

/* ============================== STIKER QRIS (L1) ============================== */
const finder = (x: number, y: number, m: number, k: number) => (
  <g key={k}><path d={rr(x, y, 7 * m, 7 * m, m * 1.2)} fill={P.navy} /><path d={rr(x + m, y + m, 5 * m, 5 * m, m * 0.7)} fill="#fffdf4" /><path d={rr(x + 2 * m, y + 2 * m, 3 * m, 3 * m, m * 0.5)} fill={P.navy} /></g>
);
/** pola modul acak ber-seed: sengaja tidak bisa dipindai */
export const QrGrid: React.FC<{ x: number; y: number; size: number; seed?: number }> = ({ x, y, size, seed = 5 }) => {
  const n = 21, m = size / n;
  const inF = (i: number, j: number) => (i < 8 && j < 8) || (i > 12 && j < 8) || (i < 8 && j > 12);
  let d = "";
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (!inF(i, j) && R(i * 31 + j + seed, 3) > 0.52) d += rr(x + i * m + 0.4, y + j * m + 0.4, m - 0.8, m - 0.8, m * 0.22);
  return <g><path d={d} fill={P.navy} />{finder(x, y, m, 1)}{finder(x + 14 * m, y, m, 2)}{finder(x, y + 14 * m, m, 3)}</g>;
};
/** (x, y) = tengah dasar dudukan. Tinggi kartu 420*s. */
export const Sticker: React.FC<{ x: number; y: number; s?: number; glow?: number; stand?: boolean }> = ({ x, y, s = 1, glow = 0, stand = true }) => {
  const card = rr(-140, -448, 280, 420, 20);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {stand && <Contact x={0} y={4} w={190} o={0.45} />}
      {glow > 0 && <Glow2 x={0} y={-240} r={420} c={P.coin} o={0.55 * glow} />}
      {stand && <path d="M-150 -34 L150 -34 L172 0 Q172 10 158 10 L-158 10 Q-172 10 -172 0 Z" fill="#bfe8ff" opacity={0.4} />}
      <g transform="skewX(-1.5)">
        <path d={rr(-156, -462, 312, 446, 28)} fill="#cfefff" opacity={0.28} />
        <Shade d={card} tones={CREAM} L={LR} s={[3, 9, 6]}>
          <rect x={-140} y={-448} width={280} height={72} fill="#ffffff" />
          <rect x={-140} y={-376} width={280} height={7} fill={P.green} />
        </Shade>
        <text x={0} y={-394} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={56} fill={P.navy} letterSpacing={6}>QRIS</text>
        <path d={rr(-108, -346, 216, 216, 12)} fill="#fffdf4" />
        <QrGrid x={-98} y={-336} size={196} />
        <text x={0} y={-90} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill={P.navy}>WARUNG MI</text>
        {line("M-70 -62H70", "#8a7aa0", 7, 0.7)}{line("M-40 -46H40", "#8a7aa0", 5, 0.5)}
        {line("M-150 -440V-60", "#ffffff", 8, 0.75)}{line("M150 -450V-330", "#ffd9a0", 5, 0.8)}
      </g>
      {stand && <g><path d="M-158 6H158" stroke="#e8fbff" strokeWidth={6} strokeLinecap="round" opacity={0.8} /></g>}
    </g>
  );
};
/** empat sudut bingkai pindai di sekitar (x,y); p 0..1 = mengunci */
export const ScanFrame: React.FC<{ x: number; y: number; w: number; p: number; c?: string }> = ({ x, y, w, p, c = P.coin }) => {
  if (p <= 0) return null;
  const h = w / 2 + (1 - p) * w * 0.55, L = w * 0.2;
  return (<g opacity={Math.min(1, p * 1.5)}>{[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b], i) => <g key={i}>{line(`M${x + a * h} ${y + b * (h - L)}V${y + b * h}H${x + a * (h - L)}`, "#2a1650", w * 0.075, 0.5)}{line(`M${x + a * h} ${y + b * (h - L)}V${y + b * h}H${x + a * (h - L)}`, c, w * 0.048)}</g>)}</g>);
};
export const Tick: React.FC<{ x: number; y: number; r: number; p: number }> = ({ x, y, r, p }) => p <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${p})`}><Shade d={circ(0, 0, r)} tones={GREEN} L={LR} s={[r * 0.05, r * 0.14, r * 0.09]} />{line(`M${-r * 0.48} ${r * 0.04}L${-r * 0.12} ${r * 0.4}L${r * 0.5} ${-r * 0.32}`, "#fff", r * 0.22)}</g>
);

/* ============================== PONSEL ============================== */
/** (x,y) = tengah. Ukuran 230x440 pada s=1. screen digambar dalam koordinat layar (tengah 0,0; 200x400). */
export const Phone: React.FC<{ x: number; y: number; s?: number; rot?: number; body?: Tones; screen?: React.ReactNode; bg?: string; glow?: string }> = ({ x, y, s = 1, rot = 0, body = BLUE, screen, bg = "#1b2a5c", glow }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {glow && <Glow2 x={0} y={0} r={400} c={glow} o={0.45} />}
      <Shade d={rr(-115, -220, 230, 440, 46)} tones={body} L={LR} s={[5, 14, 9]} />
      <clipPath id={`ph${id}`}><path d={rr(-99, -202, 198, 404, 30)} /></clipPath>
      <path d={rr(-99, -202, 198, 404, 30)} fill={bg} />
      <g clipPath={`url(#ph${id})`}>{screen}<path d="M-99 -202H-20L-99 60Z" fill="#fff" opacity={0.08} /></g>
      <path d={rr(-30, -192, 60, 14, 7)} fill="#0a1030" />
      {line("M-104 -150V90", "#ffffff", 5, 0.65)}<circle cx={80} cy={-203} r={5} fill="#fff" opacity={0.85} />
    </g>
  );
};

/* ============================== PEMERAN ============================== */
export type Face = "neutral" | "happy" | "shock" | "calm";
export const Eyes: React.FC<{ x: number; y: number; gap: number; r?: number; face?: Face; t: number; look?: number }> = ({ x, y, gap, r = 11, face = "neutral", t, look = 0 }) => {
  const blink = (t + 1.3) % 3.4 < 0.12 ? 0.12 : 1;
  return (
    <g>
      {[-1, 1].map((s) => face === "happy" ? <g key={s}>{line(`M${x + s * gap - r} ${y + 3}Q${x + s * gap} ${y - r * 1.2} ${x + s * gap + r} ${y + 3}`, "#241440", r * 0.6)}</g> : (
        <g key={s} transform={`translate(${x + s * gap + look} ${y}) scale(1 ${blink})`}><ellipse rx={r * (face === "shock" ? 1.3 : 1)} ry={r * (face === "shock" ? 1.55 : 1.15)} fill="#241440" /><circle cx={r * 0.35} cy={-r * 0.4} r={r * 0.34} fill="#fff" /></g>
      ))}
      {face === "shock" ? <ellipse cx={x} cy={y + r * 3} rx={r * 0.8} ry={r} fill="#241440" /> : face === "happy" ? <path d={`M${x - r * 1.8} ${y + r * 1.7}Q${x} ${y + r * 4.6} ${x + r * 1.8} ${y + r * 1.7}Z`} fill="#241440" /> : line(`M${x - r} ${y + r * 2.4}Q${x} ${y + r * (face === "calm" ? 3.1 : 2.8)} ${x + r} ${y + r * 2.4}`, "#241440", r * 0.45)}
    </g>
  );
};
/** pembeli: badan kacang koral, syal biru. (x,y) = dasar kaki; tinggi 360*s. */
export const You: React.FC<{ x: number; y: number; s?: number; t: number; face?: Face; look?: number; arm?: [number, number] }> = ({ x, y, s = 1, t, face = "neutral", look = 0, arm }) => {
  const b = Math.sin(t * 2.1) * 4;
  const body = "M-8 -350C70 -362 118 -306 108 -236C102 -194 128 -172 134 -128C146 -50 80 -22 -6 -24C-98 -22 -140 -76 -128 -144C-118 -196 -88 -206 -94 -252C-102 -306 -72 -340 -8 -350Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Contact x={0} y={4} w={150} />
      <Hose d="M-48 -40Q-62 -10 -74 0" tones={CORAL} w={30} /><Hose d="M50 -40Q60 -10 78 0" tones={CORAL} w={30} />
      <g transform={`translate(0 ${b})`}>
        <Shade d={body} tones={CORAL} L={LR} s={[8, 24, 14]} />
        <Eyes x={14 + look} y={-268} gap={30} t={t} face={face} />
        <Shade d="M-98 -214Q8 -168 108 -216Q124 -190 112 -170Q8 -124 -100 -168Q-112 -192 -98 -214Z" tones={BLUE} L={LR} s={[4, 10, 6]} />
        <Shade d={`M-82 -176Q-150 -150 ${-190 + Math.sin(t * 2.6) * 12} ${-108 + Math.cos(t * 2.2) * 8}Q-150 -96 -128 -112Q-112 -142 -62 -154Z`} tones={BLUE} L={LR} s={[3, 8, 5]} />
        <Hose d={arm ? `M92 -150Q${(92 + arm[0]) / 2 + 20} ${(-150 + arm[1]) / 2 + 70} ${arm[0]} ${arm[1]}` : "M96 -146Q150 -110 138 -66"} tones={CORAL} />
        <Hose d="M-100 -130Q-138 -96 -122 -62" tones={CORAL} />
      </g>
    </g>
  );
};
/** pemilik warung: badan bulat toska, celemek, handuk bahu. */
export const Owner: React.FC<{ x: number; y: number; s?: number; t: number; face?: Face; look?: number }> = ({ x, y, s = 1, t, face = "neutral", look = 0 }) => {
  const b = Math.sin(t * 1.8 + 2) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Contact x={0} y={4} w={165} />
      <g transform={`translate(0 ${b})`}>
        <Shade d="M0 -330C100 -332 164 -258 164 -168C164 -72 96 -14 0 -14C-96 -14 -164 -72 -164 -168C-164 -258 -100 -328 0 -330Z" tones={TEALB} L={LR} s={[10, 28, 15]} />
        <Eyes x={8 + look} y={-244} gap={34} t={t} face={face} />
        <Shade d="M-86 -158Q0 -142 86 -158L112 -44Q0 6 -112 -44Z" tones={CREAM} L={LR} s={[6, 16, 8]} />
        {line("M-86 -158Q-110 -190 -132 -196M86 -158Q110 -190 132 -196", CREAM[1], 11)}
        {line("M-48 -92H48", CREAM[1], 5)}<circle cx={34} cy={-60} r={13} fill="#d99a4a" opacity={0.6} /><circle cx={52} cy={-48} r={6} fill="#d99a4a" opacity={0.6} />
        <Shade d="M-150 -236Q-116 -276 -84 -262Q-96 -212 -112 -150Q-132 -140 -148 -158Q-140 -200 -150 -236Z" tones={CREAM} L={LR} s={[4, 10, 6]} />
        <Hose d="M146 -150Q196 -116 174 -66" tones={TEALB} /><Hose d="M-146 -146Q-196 -112 -172 -66" tones={TEALB} />
      </g>
    </g>
  );
};
export const reveal = (t: number, a: number, d = 0.5) => seg(t, a, a + d);
export const lerp = mix;
