// Reproduksi uji: klip referensi asd.mov (R3 4:58–5:12, "calcium ... damaging it"). Waktu dikunci ke kata narasi (STT ElevenLabs).
// Tujuan: mengukur seberapa dekat mesin kita meniru gaya R3. Bukan untuk publikasi.
import React from "react";
import { AbsoluteFill, Composition, Easing, interpolate, registerRoot, useCurrentFrame } from "remotion";

const FPS = 30;
const DUR = 13.58;
const SANS = "'Avenir Next','Helvetica Neue',Arial,sans-serif";
const seg = (t: number, a: number, b: number, e: (n: number) => number = Easing.inOut(Easing.cubic)) =>
  interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const pop = (t: number, a: number, d = 0.22) => seg(t, a, a + d, Easing.out(Easing.back(1.8)));
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const R = (i: number, k = 1) => { const x = Math.sin(i * 127.1 * k + 311.7) * 43758.5453; return x - Math.floor(x); };
const keys = (t: number, ts: number[], vs: number[]) => interpolate(t, ts, vs, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) });

/* ---------- primitif ---------- */
const BLURS = [3, 6, 10, 16, 26];
const Defs: React.FC = () => (
  <defs>
    {BLURS.map((b) => <filter key={b} id={`b${b}`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation={b} /></filter>)}
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#00113f" /><stop offset="0.36" stopColor="#0d3866" /><stop offset="0.72" stopColor="#2592a0" /><stop offset="1" stopColor="#5ed3b6" />
    </linearGradient>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={0.35} /></radialGradient>
    <radialGradient id="floor"><stop offset="0" stopColor="#9bf7d2" stopOpacity={0.75} /><stop offset="1" stopColor="#9bf7d2" stopOpacity={0} /></radialGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity={0} /><stop offset="0.5" stopColor="#bff6ff" stopOpacity={0.09} /><stop offset="1" stopColor="#ffffff" stopOpacity={0} /></linearGradient>
  </defs>
);
const Blur: React.FC<{ b?: number; children: React.ReactNode }> = ({ b, children }) => (b ? <g filter={`url(#b${b})`}>{children}</g> : <>{children}</>);
const Sea: React.FC<{ beam?: boolean }> = ({ beam }) => (
  <>
    <rect x={-200} y={-200} width={2320} height={1480} fill="url(#sea)" />
    <ellipse cx={960} cy={1160} rx={1100} ry={420} fill="url(#floor)" />
    <rect x={-200} y={-200} width={2320} height={1480} fill="url(#vig)" />
    {beam && <path d="M1250 -100 L1900 -100 L700 1180 L50 1180 Z" fill="url(#beam)" />}
  </>
);

type Kind = "ring" | "c" | "pin" | "pill" | "ball" | "donut" | "tri" | "bub";
const Mol: React.FC<{ k: Kind; x: number; y: number; s?: number; r?: number; c?: string; b?: number; o?: number }> = ({ k, x, y, s = 1, r = 0, c, b, o = 1 }) => {
  let el: React.ReactNode = null;
  switch (k) {
    case "ring": el = <><circle r={34} fill="none" stroke={c ?? "#25cfe0"} strokeWidth={22} /><path d="M-30 -14 A33 33 0 0 1 14 -31" stroke="#9ff3ff" strokeWidth={8} fill="none" strokeLinecap="round" /></>; break;
    case "c": el = <path d="M28 -30 A40 40 0 1 0 28 30" stroke={c ?? "#2bb7b9"} strokeWidth={24} fill="none" strokeLinecap="round" />; break;
    case "pin": el = <><rect x={-20} y={-70} width={40} height={84} rx={20} fill={c ?? "#a24fe8"} /><rect x={-40} y={6} width={80} height={44} rx={22} fill="#8a35d6" /><rect x={-30} y={14} width={34} height={20} rx={10} fill="#d7a8ff" /><rect x={-10} y={-60} width={14} height={50} rx={7} fill="#c88bfa" /></>; break;
    case "pill": el = <><rect x={-56} y={-22} width={112} height={44} rx={22} fill={c ?? "#9d55ea"} /><rect x={-30} y={-10} width={60} height={20} rx={10} fill="#c99bff" /></>; break;
    case "ball": el = <><circle r={26} fill={c ?? "#2d8fe0"} /><circle cx={-8} cy={-9} r={8} fill="#fff" opacity={0.35} /></>; break;
    case "donut": el = <><path d="M-34 0 A34 34 0 0 1 34 0" stroke="#3fcc4c" strokeWidth={20} fill="none" /><path d="M34 0 A34 34 0 0 1 -34 0" stroke="#f1d33a" strokeWidth={20} fill="none" /></>; break;
    case "tri": el = <path d="M0 -40 L38 28 L-38 28 Z" fill="none" stroke={c ?? "#e3337c"} strokeWidth={18} strokeLinejoin="round" />; break;
    case "bub": el = <circle r={20} fill="none" stroke={c ?? "#3aa6a8"} strokeWidth={7} />; break;
  }
  return <Blur b={b}><g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>{el}</g></Blur>;
};

/** Ion kalsium: empat lengan kapsul, warna per lengan menipu arah 3D, berputar pelan. */
const Ion: React.FC<{ x: number; y: number; a: number; tilt: number; s?: number; b?: number }> = ({ x, y, a, tilt, s = 1, b }) => {
  const cols = ["#d81b85", "#ea3d9e", "#f26fb6", "#f9b3d8"];
  const lobes = [0, 1, 2, 3].map((k) => {
    const ang = a + k * 90, depth = Math.cos(((ang + tilt) * Math.PI) / 180); // -1 belakang .. 1 depan
    return { ang, depth, len: 66 + depth * 16 };
  }).sort((p, q) => p.depth - q.depth);
  return (
    <Blur b={b}>
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        {lobes.map((l, i) => (
          <g key={i} transform={`rotate(${l.ang})`}>
            <rect x={-4} y={-21} width={l.len} height={42} rx={21} fill={cols[i]} />
            <rect x={l.len * 0.45} y={-16} width={l.len * 0.45} height={13} rx={6.5} fill="#fff" opacity={0.18 + 0.1 * i} />
          </g>
        ))}
      </g>
    </Blur>
  );
};

/** Pil label R3: isian rata, teks putih tebal, segitiga penunjuk. */
const Tag: React.FC<{ x: number; y: number; text: string; p: number; bg: string; ptr?: "up" | "down" | "right"; size?: number }> = ({ x, y, text, p, bg, ptr = "up", size = 54 }) => {
  if (p <= 0.001) return null;
  const w = text.length * size * 0.6 + size * 1.25, h = size * 1.95;
  return (
    <g transform={`translate(${x} ${y}) scale(${p})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={bg} />
      {ptr === "up" && <path d={`M-22 ${-h / 2 + 1} L0 ${-h / 2 - 22} L22 ${-h / 2 + 1} Z`} fill={bg} />}
      <text y={size * 0.35} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={size} fill="#fff">{text}</text>
    </g>
  );
};

/* ---------- Shot 1: kalsium membanjiri neuron (0 – 7,95 dtk) ---------- */
const BG1: [Kind, number, number, number, string | undefined, number | undefined, number][] = [
  // jenis, x, y, skala, warna, blur, rotasi
  ["ring", 210, 770, 1.6, undefined, undefined, 25], ["ball", 156, 636, 1.4, "#2d8fe0", undefined, 0], ["pill", 90, 750, 1.6, "#9d55ea", 26, 60],
  ["c", 1440, 610, 1.8, "#f08a1a", 16, -20], ["pin", 1640, 670, 1.3, undefined, undefined, 25], ["pill", 1840, 650, 1.2, "#2bb7b9", 3, 30],
  ["ball", 1330, 100, 1.1, "#c62ad6", undefined, 0], ["pill", 1736, 116, 1.0, "#9d55ea", undefined, 25], ["c", 1440, 80, 1.6, "#2bb7b9", 16, -60],
  ["donut", 335, 1075, 1.5, undefined, undefined, 10], ["ball", 1860, 935, 0.6, "#1f4fbf", 3, 0], ["c", 640, 760, 0.6, "#3aa6a8", 6, 30],
];
const Shot1: React.FC<{ t: number }> = ({ t }) => {
  const cx = -t * 6, cy = -t * 9; // kamera melayang pelan
  const hero = { b: -3.0, off: 215 };
  const ions = [{ b: -6.0, off: 20 }, { b: -4.4, off: -60 }, hero, { b: -0.6, off: 40 }, { b: 2.2, off: -40 }, { b: 4.6, off: 110 }];
  const ionPos = (io: { b: number; off: number }, i: number) => {
    const d = Math.max(0, (t - io.b) * 55);
    const emerge = seg(d, 0, 140);
    return { x: 690 + d * 0.35 + io.off * emerge + Math.sin(t * 0.9 + i) * 10, y: 110 + d, a: 20 + i * 37 + t * (14 + i * 3), tilt: t * 40 + i * 50 };
  };
  const h = ionPos(hero, 2);
  const tagP = pop(t, 2.72) * (1 - seg(t, 5.42, 5.62, Easing.in(Easing.back(1.5))));
  const bubP = pop(t, 5.72, 0.26);
  return (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <Defs /><Sea />
      <g transform={`translate(${cx} ${cy})`}>
        {Array.from({ length: 46 }, (_, i) => <Mol key={i} k={i % 3 ? "ball" : "bub"} x={R(i) * 2000 - 40 + Math.sin(t * 0.5 + i) * 12} y={R(i, 2) * 1100 + Math.cos(t * 0.4 + i) * 10} s={0.3 + R(i, 3) * 0.5} c="#5fc2c0" b={i % 2 ? 6 : 3} o={0.18 + R(i, 4) * 0.2} />)}
        {BG1.map(([k, x, y, s, c, b, r], i) => <Mol key={i} k={k} x={x + Math.sin(t * 0.7 + i) * 8} y={y + Math.cos(t * 0.6 + i) * 8} s={s} c={c} b={b} r={r + t * (i % 2 ? 4 : -3)} />)}
        {/* membran di pojok kiri atas */}
        <g transform="translate(0 20) rotate(-13.5 0 260) scale(1.15)">
          <rect x={-300} y={-200} width={1500} height={420} fill="#3d1890" />
          {Array.from({ length: 40 }, (_, i) => <path key={i} d={`M${-300 + i * 38} 215 L${-260 + i * 38} -40`} stroke="#5b2cb4" strokeWidth={14} strokeLinecap="round" />)}
          {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={-280 + i * 50} cy={236} r={30} fill="#5a25a8" />)}
          {Array.from({ length: 30 }, (_, i) => <circle key={"d" + i} cx={-280 + i * 50} cy={246} r={18} fill="#47198e" />)}
        </g>
        {/* kanal kalsium */}
        <path d="M560 40 C540 120 600 190 660 170 L650 40 Z" fill="#4a1aa2" />
        <path d="M740 30 C800 60 820 150 780 190 C760 140 740 110 720 100 Z" fill="#5a22b8" />
        {ions.map((io, i) => { const p = ionPos(io, i); return (t - io.b) * 55 < -10 ? null : <Ion key={i} x={p.x} y={p.y} a={p.a} tilt={p.tilt} s={1.25} />; })}
        <Tag x={h.x + 20} y={h.y + 205} text="Calcium" p={tagP} bg="#ec48a8" size={60} />
        {bubP > 0 && (
          <g>
            <path d={`M${h.x + 70} ${h.y + 60} C${h.x + 170} ${h.y + 70} ${h.x + 210} ${h.y + 120} ${h.x + 230} ${h.y + 180}`} stroke="#e01f6c" strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray={400} strokeDashoffset={400 * (1 - seg(t, 5.72, 5.9))} />
            <g transform={`translate(${h.x + 350} ${h.y + 245}) scale(${bubP})`}>
              <rect x={-205} y={-72} width={410} height={144} rx={44} fill="#e01f6c" />
              <text y={-8} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={46} fill="#fff">Let's mess this</text>
              <text y={46} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={46} fill="#fff">place up, baby!</text>
            </g>
          </g>
        )}
      </g>
    </svg>
  );
};

/* ---------- Shot 2: kalsium mengaktifkan enzim pemotong (7,95 – akhir) ---------- */
const Bubble: React.FC<{ x: number; y: number; r: number; dark?: boolean }> = ({ x, y, r, dark }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={dark ? "#3b1470" : "#8b28cf"} />
    <circle cx={x - r * 0.12} cy={y - r * 0.14} r={r * 0.84} fill={dark ? "#4d1a8e" : "#a13ddd"} />
    <path d={`M${x - r * 0.8} ${y - r * 0.15} A${r * 0.82} ${r * 0.82} 0 0 1 ${x + r * 0.45} ${y - r * 0.78}`} stroke={dark ? "#5a2299" : "#c766f0"} strokeWidth={r * 0.16} fill="none" strokeLinecap="round" />
    <circle cx={x} cy={y} r={r} fill="none" stroke={dark ? "#4d1a8e" : "#c063ef"} strokeWidth={r * 0.12} opacity={0.8} />
  </g>
);
const Chain: React.FC<{ pts: [number, number][]; r: [number, number]; seed: number; dark?: boolean; gone?: (i: number) => number }> = ({ pts, r, seed, dark, gone }) => {
  const out: React.ReactNode[] = [];
  let n = 0;
  for (let k = 0; k < pts.length - 1; k++) {
    const [x1, y1] = pts[k], [x2, y2] = pts[k + 1];
    const L = Math.hypot(x2 - x1, y2 - y1), steps = Math.ceil(L / 95);
    for (let j = 0; j < steps; j++, n++) {
      const u = j / steps, rr = mix(r[0], r[1], R(n, seed));
      const g = gone ? gone(n) : 0;
      if (g >= 1) continue;
      const bx = mix(x1, x2, u), by = mix(y1, y2, u), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
      out.push(<g key={n} transform={`translate(${g * (R(n, 7) - 0.5) * 300} ${g * -200})`} opacity={1 - g}>
        <Bubble x={bx + nx * 55 + (R(n, seed + 3) - 0.5) * 30} y={by + ny * 55} r={rr * 0.8} dark={dark} />
        <Bubble x={bx - nx * 50 + (R(n, seed + 1) - 0.5) * 50} y={by - ny * 50 + (R(n, seed + 2) - 0.5) * 50} r={rr * (0.75 + R(n, seed + 4) * 0.4)} dark={dark} />
        <Bubble x={bx + (R(n, seed + 5) - 0.5) * 40} y={by + (R(n, seed + 6) - 0.5) * 40} r={rr} dark={dark} />
      </g>);
    }
  }
  return <>{out}</>;
};

const Enzyme: React.FC<{ act: number; saw: number; t: number }> = ({ act, saw, t }) => {
  const parts = (stroke?: string) => {
    const sp = stroke ? { stroke, strokeWidth: 30, strokeLinejoin: "round" as const } : {};
    return (
      <g>
        <g transform="rotate(24 -135 0)"><rect x={-250} y={-36} width={130} height={68} rx={14} fill="#8a3ee4" {...sp} />{!stroke && <rect x={-246} y={-36} width={122} height={22} rx={10} fill="#a96df3" />}</g>
        <rect x={-188} y={-92} width={74} height={88} rx={16} fill="#f08a2c" {...sp} />
        <rect x={-110} y={-108} width={54} height={44} rx={10} fill="#8b48e6" {...sp} />
        {saw > 0 && (
          <g transform={`translate(140 -22) scale(${saw} 1)`}>
            <rect x={0} y={-36} width={150} height={72} rx={26} fill="#8c40e2" {...sp} />
            {!stroke && Array.from({ length: 7 }, (_, i) => { const xx = ((i * 26 + t * 160) % 182) - 8; return <g key={i}><circle cx={xx} cy={-38} r={13} fill="#7128c8" /><circle cx={150 - xx} cy={38} r={13} fill="#7128c8" /></g>; })}
          </g>
        )}
        <rect x={-140} y={-80} width={250} height={185} rx={26} fill="#e86f10" {...sp} />
        {!stroke && <rect x={-140} y={-80} width={235} height={58} rx={24} fill="#f5a04c" />}
        <rect x={90} y={-88} width={64} height={196} rx={22} fill="#d65d10" {...sp} />
        <rect x={-50} y={42} width={104} height={66} rx={12} fill="#8d44e6" {...sp} />
        {!stroke && <rect x={-50} y={42} width={104} height={20} rx={8} fill="#a974f3" />}
      </g>
    );
  };
  return (
    <g>
      {act > 0 && <g opacity={act}><g filter="url(#b10)">{parts("#7fe9ff")}</g>{parts("#c3f6ff")}</g>}
      {parts()}
    </g>
  );
};

const Shot2: React.FC<{ t: number }> = ({ t }) => {
  const cam = { x: -(t - 7.95) * 14, y: (t - 7.95) * 6 };
  const ts = [8.0, 10.0, 10.33, 11.0, 11.33, 12.0, 12.33, 12.67, 13.0, 13.33, 13.6];
  const ex = keys(t, ts, [690, 715, 980, 1186, 1286, 1392, 1516, 1640, 1720, 1776, 1792]);
  const ey = keys(t, ts, [730, 726, 680, 560, 514, 456, 408, 288, 216, 160, 150]);
  const er = keys(t, [8, 10, 11, 12, 13, 13.6], [-6, -8, -26, -30, -36, -38]) + Math.sin(t * 2) * 2;
  const act = seg(t, 9.22, 9.42) * (1 - seg(t, 10.5, 10.8));
  const saw = seg(t, 9.8, 10.15, Easing.out(Easing.back(1.6)));
  const chew = (i: number) => (i >= 3 && i <= 5 ? seg(t, 12.85 + (i - 3) * 0.12, 13.4 + (i - 3) * 0.12) : 0);
  return (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <Defs /><Sea beam />
      <g transform={`translate(${cam.x} ${cam.y})`}>
        {Array.from({ length: 50 }, (_, i) => <Mol key={i} k={i % 3 ? "ball" : "bub"} x={R(i, 5) * 2000 - 40} y={R(i, 6) * 1100 + Math.sin(t * 0.5 + i) * 10} s={0.3 + R(i, 3) * 0.5} c="#5fc2c0" b={i % 2 ? 6 : 3} o={0.2 + R(i, 4) * 0.2} />)}
        <Blur b={10}><Chain pts={[[-60, 470], [60, 700], [40, 960], [120, 1180]]} r={[60, 85]} seed={3} /></Blur>
        <Chain pts={[[1150, -80], [1240, 60], [1420, 200], [1640, 360], [1990, 460]]} r={[62, 86]} seed={1} gone={chew} />
        {([["donut", 990, 170, 1.1, 0], ["donut", 1734, 624, 1.1, 30], ["c", 150, 410, 1.2, 160], ["c", 1820, 370, 1.0, 200], ["ball", 1120, 230, 0.7, 0], ["ball", 1840, 150, 0.9, 0], ["ball", 1390, 736, 0.8, 0], ["ball", 190, 1020, 0.8, 0], ["c", 1490, 880, 1.3, -90], ["ring", 310, 900, 1.5, -20], ["tri", 500, 1040, 1.4, 0], ["pin", 1110, 60, 1.1, -55]] as [Kind, number, number, number, number][]).map(([k, x, y, s, r], i) => (
          <Mol key={i} k={k} x={x + Math.sin(t + i) * 8} y={y + Math.cos(t * 0.8 + i) * 8} s={s} r={r + t * 5} c={k === "c" ? (i === 8 ? "#f08a1a" : "#2bb7b9") : k === "ball" ? (i === 6 ? "#4a1ab0" : "#2d8fe0") : undefined} />
        ))}
        {/* aliran kalsium dari kiri atas */}
        {Array.from({ length: 60 }, (_, i) => {
          const u = (t * 0.11 + R(i, 9)) % 1;
          const x = mix(300, 620, u) + Math.sin(u * 9 + i) * 70 + (R(i, 10) - 0.5) * 90, y = mix(-30, 1000, u);
          const r = 10 + R(i, 11) * 8;
          return <g key={i}><circle cx={x} cy={y} r={r} fill="#ef3797" /><circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#ff9fd0" /></g>;
        })}
        <g transform={`translate(${ex} ${ey}) rotate(${er}) scale(1.07)`}>
          <Enzyme act={act} saw={saw} t={t} />
          {Array.from({ length: 7 }, (_, i) => {
            const on = seg(t, 8.7 + i * 0.09, 8.85 + i * 0.09);
            const px = [-150, -40, 40, 120, -95, 60, -170][i], py = [-60, 70, -10, -100, 120, 120, 40][i];
            return on > 0 ? <g key={i} opacity={on}><circle cx={px} cy={py - (1 - on) * 80} r={15} fill="#ef3797" /><circle cx={px - 5} cy={py - 5 - (1 - on) * 80} r={5} fill="#ff9fd0" /></g> : null;
          })}
        </g>
        <Blur b={26}><Chain pts={[[1450, 1060], [1700, 960], [2000, 1000]]} r={[110, 150]} seed={5} dark /></Blur>
        <Blur b={16}><Mol k="tri" x={1300} y={1010} s={2.4} c="#b62a77" /></Blur>
      </g>
    </svg>
  );
};

/* ---------- transisi wipe dengan garis putih (7,93 – 8,36) ---------- */
const RepAsd: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const w = seg(t, 7.93, 8.36, Easing.inOut(Easing.cubic));
  const lx = mix(-0.02, 1.02, w) * 1920;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {w < 1 && <AbsoluteFill><Shot1 t={t} /></AbsoluteFill>}
      {w > 0 && <AbsoluteFill style={{ clipPath: `inset(0 ${1920 - lx}px 0 0)` }}><Shot2 t={t} /></AbsoluteFill>}
      {w > 0 && w < 1 && <div style={{ position: "absolute", top: 0, bottom: 0, left: lx - 4, width: 8, background: "#fff" }} />}
    </AbsoluteFill>
  );
};

registerRoot(() => <Composition id="RepAsd" component={RepAsd} width={1920} height={1080} fps={FPS} durationInFrames={Math.round(DUR * FPS)} />);
