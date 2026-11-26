// Reproduksi uji: klip referensi asddd.mov (R3 3:45–4:05, "Neurons are biological electrical wires ... constantly monitoring").
// Waktu dikunci ke kata narasi (STT). Tujuan: mengukur seberapa dekat mesin kita meniru gaya R3. Bukan untuk publikasi.
import React from "react";
import { AbsoluteFill, Composition, Easing, interpolate, registerRoot, useCurrentFrame } from "remotion";

const FPS = 30;
const DUR = 20.0;
const SANS = "'Avenir Next','Helvetica Neue',Arial,sans-serif";
const seg = (t: number, a: number, b: number, e: (n: number) => number = Easing.inOut(Easing.cubic)) =>
  interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const pop = (t: number, a: number, d = 0.22) => seg(t, a, a + d, Easing.out(Easing.back(1.8)));
const out = (t: number, a: number, d = 0.2) => 1 - seg(t, a, a + d, Easing.in(Easing.back(1.5)));
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const R = (i: number, k = 1) => { const x = Math.sin(i * 127.1 * k + 311.7) * 43758.5453; return x - Math.floor(x); };
type P = [number, number];

/* ---------- primitif bersama ---------- */
const BLURS = [3, 6, 10, 16, 26, 40];
const Defs: React.FC = () => (
  <defs>
    {BLURS.map((b) => <filter key={b} id={`b${b}`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation={b} /></filter>)}
    <filter id="mblur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10 3" /></filter>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={0.4} /></radialGradient>
    <linearGradient id="cyto" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6e1433" /><stop offset="1" stopColor="#4a0a26" /></linearGradient>
    <radialGradient id="nuc" cx="0.42" cy="0.32" r="0.7"><stop offset="0" stopColor="#fbe920" /><stop offset="0.35" stopColor="#f6b21c" /><stop offset="1" stopColor="#e9781a" /></radialGradient>
    <linearGradient id="space" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e0a55" /><stop offset="1" stopColor="#3a0c72" /></linearGradient>
    <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3e0b74" /><stop offset="0.35" stopColor="#7a1080" /><stop offset="0.75" stopColor="#c41470" /><stop offset="1" stopColor="#e2216f" /></linearGradient>
    <linearGradient id="inside" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fdf0c0" /><stop offset="1" stopColor="#f8d570" /></linearGradient>
  </defs>
);
const Blur: React.FC<{ b?: number; children: React.ReactNode }> = ({ b, children }) => (b ? <g filter={`url(#b${b})`}>{children}</g> : <>{children}</>);
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}><Defs />{children}</svg>;

type Kind = "ring" | "c" | "pin" | "pill" | "ball" | "tri" | "donut";
const Mol: React.FC<{ k: Kind; x: number; y: number; s?: number; r?: number; c?: string; b?: number; o?: number }> = ({ k, x, y, s = 1, r = 0, c, b, o = 1 }) => {
  const el = {
    ring: <><circle r={34} fill="none" stroke={c ?? "#25cfe0"} strokeWidth={22} /><path d="M-30 -14 A33 33 0 0 1 14 -31" stroke="#9ff3ff" strokeWidth={8} fill="none" strokeLinecap="round" /></>,
    c: <><path d="M28 -30 A40 40 0 1 0 28 30" stroke={c ?? "#2bb7b9"} strokeWidth={26} fill="none" strokeLinecap="round" /><path d="M-36 -10 A38 38 0 0 1 -10 -37" stroke="#fff" strokeOpacity={0.35} strokeWidth={8} fill="none" strokeLinecap="round" /></>,
    pin: <><rect x={-20} y={-70} width={40} height={84} rx={20} fill={c ?? "#b25cf0"} /><rect x={-42} y={6} width={84} height={44} rx={22} fill="#8f3ad8" /><rect x={-10} y={-60} width={14} height={50} rx={7} fill="#dcb0ff" /></>,
    pill: <><rect x={-56} y={-24} width={112} height={48} rx={24} fill={c ?? "#b25cf0"} /><rect x={-34} y={-12} width={62} height={20} rx={10} fill="#e2bdff" /></>,
    ball: <><circle r={26} fill={c ?? "#2fb7f0"} /><circle cx={-8} cy={-9} r={8} fill="#fff" opacity={0.35} /></>,
    tri: <path d="M0 -40 L38 28 L-38 28 Z" fill="none" stroke={c ?? "#e3337c"} strokeWidth={18} strokeLinejoin="round" />,
    donut: <><path d="M-34 0 A34 34 0 0 1 34 0" stroke="#3fcc4c" strokeWidth={20} fill="none" /><path d="M34 0 A34 34 0 0 1 -34 0" stroke="#f1d33a" strokeWidth={20} fill="none" /></>,
  }[k];
  return <Blur b={b}><g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>{el}</g></Blur>;
};

const Tag: React.FC<{ x: number; y: number; text: string; p: number; bg: string; ptr?: "right" | "down" | "none"; size?: number; rot?: number; reveal?: number }> = ({ x, y, text, p, bg, ptr = "right", size = 52, rot = 0, reveal = 1 }) => {
  if (p <= 0.001 || reveal <= 0.001) return null;
  const w = text.length * size * 0.6 + size * 1.25, h = size * 1.85;
  const id = `tg${text}${Math.round(x)}`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <clipPath id={id}><rect x={(-w / 2 - 30) * reveal} y={-h} width={(w + 60) * reveal} height={h * 2} /></clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={4} fill={bg} />
        {ptr === "right" && <path d={`M${w / 2 - 1} -18 L${w / 2 + 20} 0 L${w / 2 - 1} 18 Z`} fill={bg} />}
        {ptr === "down" && <path d={`M-18 ${h / 2 - 1} L0 ${h / 2 + 20} L18 ${h / 2 - 1} Z`} fill={bg} />}
        <text y={size * 0.35} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={size} fill="#fff">{text}</text>
      </g>
    </g>
  );
};

/* ================= A. Neuron dan petir (0 – 7,5) ================= */
const AXON: P[] = [[-120, 960], [300, 862], [660, 850], [900, 830], [1120, 752], [1262, 642], [1345, 540]];
const along = (pts: P[], u: number): { p: P; a: number } => {
  const L: number[] = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const d = u * L[L.length - 1];
  let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const k = (d - L[i - 1]) / (L[i] - L[i - 1] || 1);
  const [x1, y1] = pts[i - 1], [x2, y2] = pts[i];
  return { p: [mix(x1, x2, k), mix(y1, y2, k)], a: Math.atan2(y2 - y1, x2 - x1) };
};
const smooth = (pts: P[]) => {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) { const [x, y] = pts[i], [nx, ny] = pts[i + 1]; d += ` Q${x} ${y} ${(x + nx) / 2} ${(y + ny) / 2}`; }
  const l = pts[pts.length - 1]; return d + ` L${l[0]} ${l[1]}`;
};

const Dendrites: React.FC<{ cx: number; cy: number; r: number; n: number; len: [number, number]; w: number; seed: number; front: string; back: string; t: number }> = ({ cx, cy, r, n, len, w, seed, front, back, t }) => (
  <g strokeLinecap="round" fill="none">
    {Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + R(i, seed) * 0.4, L = mix(len[0], len[1], R(i, seed + 1));
      const sw = Math.sin(t * 0.8 + i) * 0.04;
      const bend = (R(i, seed + 2) - 0.5) * 1.1 + sw;
      const x0 = cx + Math.cos(a) * r * 0.8, y0 = cy + Math.sin(a) * r * 0.8;
      const xm = cx + Math.cos(a + bend * 0.3) * (r + L * 0.55), ym = cy + Math.sin(a + bend * 0.3) * (r + L * 0.55);
      const x1 = cx + Math.cos(a + bend * 0.5) * (r + L), y1 = cy + Math.sin(a + bend * 0.5) * (r + L);
      const isBack = Math.cos(a - 0.4) > 0.35;
      const bx = xm + Math.cos(a + 0.9 * Math.sign(bend || 1)) * L * 0.38, by = ym + Math.sin(a + 0.9 * Math.sign(bend || 1)) * L * 0.38;
      return (
        <g key={i} stroke={isBack ? back : front}>
          <path d={`M${x0} ${y0} Q${xm} ${ym} ${x1} ${y1}`} strokeWidth={w} />
          <path d={`M${xm} ${ym} L${bx} ${by}`} strokeWidth={w * 0.8} />
        </g>
      );
    })}
  </g>
);

const Axon: React.FC<{ pts: P[]; w0: number; w1: number; nodes: number[] }> = ({ pts, w0, w1, nodes }) => {
  // tabung bersegmen: lapisan tebal biru + kilap, cincin cyan di titik nodus
  const N = 40;
  const samples = Array.from({ length: N + 1 }, (_, i) => along(pts, i / N));
  return (
    <g strokeLinecap="round" fill="none">
      {samples.slice(0, -1).map((s, i) => { const nx = samples[i + 1]; const w = mix(w0, w1, i / N); return <path key={i} d={`M${s.p[0]} ${s.p[1]} L${nx.p[0]} ${nx.p[1]}`} stroke="#4f1ff0" strokeWidth={w} />; })}
      {samples.slice(0, -1).map((s, i) => { const nx = samples[i + 1]; const w = mix(w0, w1, i / N); return <path key={"d" + i} d={`M${s.p[0]} ${s.p[1] + w * 0.22} L${nx.p[0]} ${nx.p[1] + w * 0.22}`} stroke="#3d14c8" strokeWidth={w * 0.5} />; })}
      {nodes.map((u, k) => {
        const prev = k === 0 ? 0.02 : nodes[k - 1] + 0.05, end = u - 0.05;
        const a = along(pts, prev), b = along(pts, end), w = mix(w0, w1, (prev + end) / 2);
        const off = (q: { p: P; a: number }): P => [q.p[0] + Math.sin(q.a) * w * 0.2, q.p[1] - Math.cos(q.a) * w * 0.2];
        const [ax, ay] = off(a), [bx, by] = off(b);
        return <path key={"h" + k} d={`M${mix(ax, bx, 0.2)} ${mix(ay, by, 0.2)} L${mix(ax, bx, 0.75)} ${mix(ay, by, 0.75)}`} stroke="#7b55ff" strokeWidth={w * 0.2} />;
      })}
      {nodes.map((u, k) => {
        const q = along(pts, u), w = mix(w0, w1, u) * 1.04, deg = (q.a * 180) / Math.PI;
        return (
          <g key={"n" + k} transform={`translate(${q.p[0]} ${q.p[1]}) rotate(${deg})`}>
            <rect x={-48} y={-w / 2 - 4} width={96} height={w + 8} rx={36} fill="#2a0fa0" />
            <rect x={-30} y={-w / 2 + 2} width={56} height={w - 4} rx={26} fill="#12b8f0" />
            <rect x={-26} y={-w / 2 + 8} width={22} height={w - 16} rx={11} fill="#7ff4ff" />
          </g>
        );
      })}
    </g>
  );
};

/** Petir: zig-zag kuning dengan glow, hidup beberapa frame. */
const BOLTS = (() => {
  const list: { t0: number; d: number; x: number; y: number; a: number; n: number; amp: number; step: number; seed: number }[] = [];
  let tt = 0, i = 0;
  while (tt < 6.7) {
    const dense = tt < 4.1;
    const u = dense ? R(i, 3) : 0.85 + R(i, 3) * 0.15;
    const q = along(AXON, Math.min(0.98, u));
    const peri = !dense && R(i, 5) > 0.4; // fase jarang: petir di pinggir dendrit
    const px = peri ? 1410 + Math.cos(R(i, 6) * 6.28) * 420 : q.p[0];
    const py = peri ? 380 + Math.sin(R(i, 6) * 6.28) * 330 : q.p[1] + (R(i, 7) - 0.5) * 60;
    list.push({ t0: tt, d: 0.1 + R(i, 8) * 0.2, x: px, y: py, a: (q.a * 180) / Math.PI + (R(i, 9) - 0.5) * 50, n: 5 + Math.floor(R(i, 10) * 3), amp: 30 + R(i, 11) * 30, step: 36 + R(i, 12) * 24, seed: i });
    tt += dense ? 0.12 + R(i, 13) * 0.22 : 0.45 + R(i, 13) * 0.5; i++;
  }
  return list;
})();
const Bolt: React.FC<{ b: (typeof BOLTS)[number]; t: number }> = ({ b, t }) => {
  const k = (t - b.t0) / b.d; if (k < 0 || k > 1) return null;
  const pts: P[] = Array.from({ length: b.n }, (_, j) => [j * b.step - (b.n * b.step) / 2, (j % 2 ? 1 : -1) * b.amp * (0.5 + R(j, b.seed + 20))]);
  const shown = Math.max(2, Math.ceil(pts.length * Math.min(1, k * 3)));
  const d = pts.slice(0, shown).map((p, j) => `${j ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  return (
    <g transform={`translate(${b.x} ${b.y}) rotate(${b.a})`} opacity={k > 0.75 ? (1 - k) / 0.25 : 1} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={d} stroke="#ffe14a" strokeWidth={26} filter="url(#b10)" opacity={0.9} />
      <path d={d} stroke="#fff27a" strokeWidth={13} />
      <path d={d} stroke="#fffde0" strokeWidth={5} />
    </g>
  );
};

const SOMA: P = [1410, 380];
const ShotA: React.FC<{ t: number }> = ({ t }) => {
  const push = seg(t, 7.3, 7.52, Easing.in(Easing.cubic));
  const drift = { x: -t * 4, y: t * 2 };
  const z = 1 + push * 1.6;
  const glow = seg(t, 7.25, 7.45);
  const fadeIn = seg(t, 0, 0.35);
  return (
    <Svg>
      <rect x={-200} y={-200} width={2320} height={1480} fill="#280357" />
      <g transform={`translate(${SOMA[0]} ${SOMA[1]}) scale(${z}) translate(${-SOMA[0] + drift.x} ${-SOMA[1] + drift.y})`} filter={push > 0.6 ? "url(#b3)" : undefined}>
        {/* siluet neuron lain di latar */}
        <g fill="#1d0748">
          <path d="M-100 200 C120 120 300 260 380 420 C460 560 380 760 300 900 C200 1080 -100 1100 -100 1100 Z" />
          <path d="M600 240 C760 220 900 320 860 520 C830 680 700 760 640 900 L560 900 C600 700 520 560 560 420 Z" opacity={0.85} />
          <path d="M1500 760 C1620 700 1760 780 1720 940 L1600 1100 L1440 1100 Z" opacity={0.7} />
        </g>
        <Blur b={16}><Dendrites cx={960} cy={-120} r={40} n={7} len={[120, 200]} w={26} seed={7} front="#9c22c8" back="#7a1fb0" t={t} /></Blur>
        <Blur b={16}><Dendrites cx={2010} cy={420} r={40} n={8} len={[120, 220]} w={26} seed={9} front="#a325cf" back="#7a1fb0" t={t} /></Blur>
        {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={R(i, 31) * 1920} cy={R(i, 32) * 1080 + Math.sin(t + i) * 8} r={4 + R(i, 33) * 6} fill="#5b2bb8" opacity={0.5} />)}
        <Dendrites cx={SOMA[0]} cy={SOMA[1]} r={150} n={13} len={[150, 280]} w={40} seed={1} front="#c02bd8" back="#8a24c4" t={t} />
        <circle cx={SOMA[0]} cy={SOMA[1]} r={160} fill="#b11fcf" />
        <circle cx={SOMA[0] + 30} cy={SOMA[1] + 30} r={140} fill="#9a1fc4" opacity={0.6} />
        <circle cx={SOMA[0] - 10} cy={SOMA[1] - 10} r={150} fill="#b725d6" opacity={0.55} />
        <Axon pts={AXON} w0={180} w1={120} nodes={[0.3, 0.6, 0.84, 0.985]} />
        <circle cx={SOMA[0] - 6} cy={SOMA[1] - 8} r={mix(94, 150, glow)} fill={glow > 0.5 ? "#fff36a" : "#f2a80c"} />
        <circle cx={SOMA[0] - 14} cy={SOMA[1] - 16} r={mix(70, 140, glow)} fill="#ffef1a" />
        {glow > 0.3 && <circle cx={SOMA[0] - 8} cy={SOMA[1] - 8} r={14} fill="#f07a1a" opacity={glow} />}
        {glow > 0 && <circle cx={SOMA[0]} cy={SOMA[1]} r={260} fill="#ffe86a" opacity={glow * 0.35} filter="url(#b40)" />}
        {BOLTS.map((b, i) => <Bolt key={i} b={b} t={t} />)}
        <Tag x={1010} y={358} text="Neuron" p={pop(t, 0.5) * out(t, 5.55)} bg="#4747e6" />
      </g>
      <rect x={-200} y={-200} width={2320} height={1480} fill="url(#vig)" opacity={0.35} />
      <rect x={0} y={0} width={1920} height={1080} fill="#000" opacity={1 - fadeIn} />
    </Svg>
  );
};

/* ================= B. Potongan sel (7,5 – 13,75) ================= */
const RING: P = [1130, 570];
const ShotB: React.FC<{ t: number }> = ({ t }) => {
  const settle = seg(t, 7.45, 8.3, Easing.out(Easing.cubic));
  const z = mix(1.3, 1, settle) * (1 + seg(t, 8.3, 13.8, Easing.linear) * 0.06);
  const dx = Math.sin(t * 0.5) * 10 - (t - 7.5) * 3, dy = Math.cos(t * 0.4) * 8;
  const glow = seg(t, 11.65, 11.95);
  const pulse = glow * (0.75 + 0.25 * Math.sin((t - 11.65) * 6));
  return (
    <Svg>
      <rect x={-200} y={-200} width={2320} height={1480} fill="#260350" />
      <g transform={`translate(${RING[0]} ${RING[1]}) scale(${z}) translate(${-RING[0] + dx} ${-RING[1] + dy})`}>
        <g fill="#1d0646">
          <path d="M-100 300 C150 250 360 380 380 560 C400 740 260 900 100 1100 L-100 1100 Z" />
          <path d="M1500 760 C1700 700 1900 780 1960 900 L1960 1100 L1500 1100 Z" opacity={0.8} />
        </g>
        <Dendrites cx={RING[0]} cy={RING[1]} r={300} n={15} len={[260, 420]} w={64} seed={4} front="#b822d8" back="#7e22c0" t={t} />
        {/* lengan akson masuk dari kiri bawah */}
        <path d="M780 1220 L1000 800" stroke="#5521fb" strokeWidth={150} strokeLinecap="round" />
        <path d="M800 1160 L960 870" stroke="#7b55ff" strokeWidth={34} strokeLinecap="round" />
        {glow > 0 && <circle cx={RING[0]} cy={RING[1]} r={330} fill="none" stroke="#ffe24a" strokeWidth={60} opacity={pulse * 0.8} filter="url(#b16)" />}
        <circle cx={RING[0]} cy={RING[1]} r={322} fill="url(#cyto)" />
        <circle cx={RING[0]} cy={RING[1] + 30} r={250} fill="#5a0c2a" opacity={0.6} />
        {Array.from({ length: 130 }, (_, i) => {
          const a = R(i, 41) * 6.28, rr = Math.sqrt(R(i, 42)) * 290;
          const x = RING[0] + Math.cos(a) * rr + Math.sin(t * 1.3 + i) * 6, y = RING[1] + Math.sin(a) * rr + Math.cos(t * 1.1 + i) * 6;
          const c = ["#f5d020", "#f08a1a", "#c8202f", "#e8b020", "#a8182c"][i % 5];
          const tw = 0.6 + 0.4 * Math.sin(t * 4 + i * 1.7);
          return <circle key={i} cx={x} cy={y} r={(9 + R(i, 43) * 12) * (0.85 + 0.15 * tw)} fill={c} opacity={0.55 + 0.45 * tw} />;
        })}
        <circle cx={RING[0] + 10} cy={RING[1] - 90} r={130} fill="url(#nuc)" />
        <path d={`M${RING[0] - 110} ${RING[1] - 30} A130 130 0 0 0 ${RING[0] + 135} ${RING[1] - 80} A150 150 0 0 1 ${RING[0] - 110} ${RING[1] - 30} Z`} fill="#de6a14" />
        <circle cx={RING[0] - 4} cy={RING[1] - 126} r={52} fill="#fbec2a" />
        <circle cx={RING[0]} cy={RING[1]} r={322} fill="none" stroke="#f7c00c" strokeWidth={38} />
        <circle cx={RING[0]} cy={RING[1]} r={310} fill="none" stroke="#ffd83a" strokeWidth={6} opacity={0.6} />
        <path d="M940 840 L1000 760" stroke="#12c8f0" strokeWidth={150} strokeLinecap="butt" />
        <path d="M940 840 L1000 760" stroke="#5521fb" strokeWidth={118} strokeLinecap="round" />
        <Tag x={470} y={540} text="Membrane" p={pop(t, 11.62)} bg="#c8103c" />
      </g>
      <rect x={-200} y={-200} width={2320} height={1480} fill="url(#vig)" opacity={0.5} />
      <rect x={0} y={0} width={1920} height={1080} fill="#fff6c0" opacity={(1 - seg(t, 7.45, 7.7)) * 0.7} />
    </Svg>
  );
};

/* ================= C. Permukaan membran miring (13,3 – 18,9) ================= */
type ArmSpec = { x: number; y: number; s: number; angs: number[]; lens: number[]; claw: number; b?: number; dim?: number };
const Arm: React.FC<ArmSpec & { hold?: React.ReactNode }> = ({ x, y, s, angs, lens, claw, b, dim = 0, hold }) => {
  const pts: P[] = [[0, 0]]; let a = 0;
  angs.forEach((g, i) => { a += g; const [px, py] = pts[pts.length - 1]; pts.push([px + Math.cos((a * Math.PI) / 180) * lens[i], py + Math.sin((a * Math.PI) / 180) * lens[i]]); });
  const end = pts[pts.length - 1];
  const main = dim ? "#5a5ce0" : "#3f9cf5", shade = dim ? "#4646c0" : "#2a78e0", hi = dim ? "#7c7cf0" : "#86ccff", collar = dim ? "#6a6ae8" : "#5cb2ff";
  return (
    <Blur b={b}>
      <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinecap="round" fill="none">
        <path d="M-80 30 Q-80 -40 0 -40 Q80 -40 80 30 Z" fill={shade} />
        {pts.slice(0, -1).map((p, i) => { const q = pts[i + 1], w = 64 - i * 10; return (
          <g key={i}>
            <path d={`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`} stroke={shade} strokeWidth={w} />
            <path d={`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`} stroke={main} strokeWidth={w * 0.72} />
            <path d={`M${mix(p[0], q[0], 0.2) - 8} ${mix(p[1], q[1], 0.2)} L${mix(p[0], q[0], 0.7) - 8} ${mix(p[1], q[1], 0.7)}`} stroke={hi} strokeWidth={w * 0.18} opacity={0.8} />
          </g>); })}
        {pts.slice(1, -1).map((p, i) => <g key={"j" + i}><circle cx={p[0]} cy={p[1]} r={40 - i * 5} fill={collar} /><circle cx={p[0]} cy={p[1]} r={22 - i * 3} fill={main} /></g>)}
        <g transform={`translate(${end[0]} ${end[1]}) rotate(${a + 90})`}>
          <circle r={26} fill={collar} />
          {[-1, 1].map((sd) => <path key={sd} d={`M${sd * 10} -8 L${sd * (30 + claw * 22)} -50 L${sd * (18 + claw * 12)} -86`} stroke={main} strokeWidth={22} strokeLinejoin="round" />)}
          {hold && <g transform="translate(0 -70)">{hold}</g>}
        </g>
      </g>
    </Blur>
  );
};
const Channel: React.FC<{ x: number; y: number; s: number; b?: number }> = ({ x, y, s, b }) => (
  <Blur b={b}>
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-78 4 Q-84 56 -52 64 L52 64 Q84 56 78 4 Z" fill="#8a0d3a" />
      <ellipse cx={0} cy={0} rx={82} ry={38} fill="#8fae1c" />
      <ellipse cx={0} cy={-4} rx={80} ry={33} fill="#b2cc22" />
      <ellipse cx={0} cy={2} rx={44} ry={17} fill="#5a0e30" />
      <path d="M-62 -18 Q-30 -34 10 -32" stroke="#e4f06a" strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  </Blur>
);

const ShotC: React.FC<{ t: number }> = ({ t }) => {
  const k = t - 13.3;
  const cam = { x: -k * 14, y: -k * 4 };
  const tilt = seg(t, 18.25, 18.95, Easing.in(Easing.cubic));
  const lift = seg(t, 15.6, 16.4), drop = seg(t, 16.4, 17.0);
  return (
    <Svg>
      <g transform={`translate(${-tilt * 300} ${-tilt * 900}) rotate(${-tilt * 14} 960 540)`} filter={tilt > 0.45 ? "url(#mblur)" : undefined}>
        <rect x={-300} y={-300} width={2520} height={1680} fill="url(#space)" />
        <g transform={`translate(${cam.x} ${cam.y})`}>
          {Array.from({ length: 26 }, (_, i) => <Mol key={"f" + i} k={(["c", "ring", "tri", "pill"] as Kind[])[i % 4]} x={R(i, 51) * 2100 - 80} y={R(i, 52) * 600 + Math.sin(t + i) * 10} s={0.5 + R(i, 53) * 0.4} r={R(i, 54) * 360 + t * 10} c="#5a3aa8" b={i % 2 ? 3 : 6} o={0.55} />)}
          {/* lantai membran: tepi bergelombang */}
          <path d={`M-300 640 ${Array.from({ length: 30 }, (_, i) => `Q${-300 + i * 90 + 45} ${600 - (i % 2) * 30 - i * 6} ${-300 + (i + 1) * 90} ${640 - i * 6}`).join(" ")} L2300 1400 L-300 1400 Z`} fill="url(#floorG)" />
          {Array.from({ length: 6 }, (_, row) => (
            <path key={row} d={`M-300 ${720 + row * 70} ${Array.from({ length: 24 }, (_, i) => `q55 ${-36 - row * 4} 110 0`).join(" ")}`} stroke="#e0328a" strokeOpacity={0.08 + row * 0.03} strokeWidth={10 + row * 3} fill="none" transform={`translate(0 ${-row * 8})`} />
          ))}
          <Channel x={1150} y={655} s={0.95} />
          <Channel x={580} y={810} s={1.05} />
          <Channel x={750} y={895} s={1.3} />
          <Channel x={90} y={975} s={1.2} />
          <Channel x={1580} y={740} s={1.25} b={3} />
          <Channel x={1200} y={1010} s={2.0} b={16} />
          <Channel x={1840} y={1030} s={1.7} b={16} />
          {([["c", 480, 320, 1.4, 160, "#2bc6b6"], ["pin", 960, 200, 1.3, -50, undefined], ["ball", 230, 180, 1.2, 0, "#c92fd6"], ["ball", 1230, 236, 1.3, 0, "#c92fd6"], ["ball", 1210, 36, 1.5, 0, "#4fc8f0"], ["ball", 280, 580, 1.4, 0, "#4fc8f0"], ["ball", 1760, 330, 0.8, 0, "#4fc8f0"], ["tri", 1620, 40, 1.4, 20, "#e8357a"], ["c", 50, 640, 1.4, 120, "#f07a1a"], ["c", 1100, 430, 1.3, 210, "#2bc6b6"]] as [Kind, number, number, number, number, string | undefined][]).map(([kk, x, y, s, r, c], i) => (
            <Mol key={i} k={kk} x={x + Math.sin(t * 0.8 + i) * 10} y={y + Math.cos(t * 0.7 + i) * 10} s={s} r={r + Math.sin(t * 0.5 + i) * 12} c={c} />
          ))}
          {/* lengan belakang (redup) */}
          <Arm x={1300} y={640} s={0.75} angs={[-100 + Math.sin(t) * 6, -40, 70]} lens={[180, 150, 110]} claw={0.4} dim={1} hold={<Mol k="c" x={0} y={0} s={1} c="#2bc6b6" />} />
          {/* lengan kiri memegang segitiga */}
          <Arm x={290} y={1040} s={1.1} angs={[-92 + Math.sin(t * 0.9) * 4 - lift * 10 + drop * 18, 18 + lift * 12 - drop * 30, 50 - drop * 40]} lens={[260, 170, 120]} claw={drop > 0.8 ? 1 : 0.2} hold={drop < 0.8 ? <Mol k="tri" x={0} y={0} s={1.4} c="#e8357a" /> : undefined} />
          {/* lengan depan besar (blur, latar depan) */}
          <Arm x={1800} y={1100} s={1.9} b={16} angs={[-112 + Math.sin(t * 0.7) * 5, -55 + Math.sin(t * 0.9) * 6, 95]} lens={[300, 190, 160]} claw={0.3} hold={<Mol k="pill" x={0} y={0} s={1.2} r={90} c="#c36cf2" />} />
        </g>
        <Tag x={870 + cam.x * 0.3} y={540} text="Membrane" p={(t < 13.75 ? 0 : 1) * out(t, 17.15)} bg="#c8103c" ptr="down" />
      </g>
      <rect x={-200} y={-200} width={2320} height={1480} fill="url(#vig)" />
    </Svg>
  );
};

/* ================= D. Potongan membran (18,5 – 20) ================= */
const ShotD: React.FC<{ t: number }> = ({ t }) => {
  const inn = seg(t, 18.45, 19.05, Easing.out(Easing.cubic));
  const k = t - 18.5;
  const rev = (a: number) => seg(t, a, a + 0.3);
  const B = { x0: -100, y0: 780, ang: -14.5 }; // garis tengah lapisan ganda
  return (
    <Svg>
      <g transform={`translate(${(1 - inn) * 400 - k * 10} ${(1 - inn) * 900}) rotate(${(1 - inn) * 14} 960 540)`} filter={inn < 0.5 ? "url(#mblur)" : undefined}>
        <rect x={-300} y={-300} width={2520} height={1680} fill="#260358" />
        {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={R(i, 61) * 1920} cy={R(i, 62) * 560} r={4 + R(i, 63) * 7} fill="#6a2bd0" opacity={0.6} />)}
        <g transform={`translate(${B.x0} ${B.y0}) rotate(${B.ang})`}>
          <rect x={-200} y={0} width={2700} height={900} fill="url(#inside)" />
          {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={R(i, 71) * 2400} cy={160 + R(i, 72) * 600} r={5 + R(i, 73) * 8} fill={["#f6d33a", "#f0a63a", "#f8e070"][i % 3]} opacity={0.8} />)}
          <rect x={-200} y={-130} width={2700} height={260} fill="#f06fc0" />
          {Array.from({ length: 140 }, (_, i) => <rect key={i} x={-200 + i * 20} y={-120} width={9} height={240} rx={4} fill="#e64aa8" />)}
          <path d="M-200 0 H2500" stroke="#d8409e" strokeWidth={6} />
          {Array.from({ length: 68 }, (_, i) => <g key={"h" + i}><circle cx={-200 + i * 40} cy={-134} r={24} fill="#c4103e" /><circle cx={-200 + i * 40} cy={134} r={24} fill="#c4103e" /></g>)}
          {/* kanal protein */}
          <g transform="translate(1000 0)">
            <ellipse cx={0} cy={0} rx={92} ry={150} fill="#5c0a26" />
            <path d="M-70 -120 Q-150 0 -70 120" stroke="#8fbf1a" strokeWidth={40} fill="none" strokeLinecap="round" />
            <path d="M70 -120 Q150 0 70 120" stroke="#8fbf1a" strokeWidth={40} fill="none" strokeLinecap="round" />
            {[[-70, -120], [70, -120], [-70, 120], [70, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={28} fill="#a6d02a" />)}
            <g transform={`translate(0 ${-60 + seg(t, 18.9, 20) * 80})`}><Mol k="pill" x={0} y={0} s={1} r={90} c="#c36cf2" /></g>
          </g>
          <g transform="translate(560 -112) rotate(14.5)"><Arm x={0} y={0} s={1} angs={[-120 + Math.sin(t) * 5, 50, 60]} lens={[220, 200, 120]} claw={0.4} hold={<Mol k="donut" x={0} y={0} s={0.9} />} /></g>
          <g transform="translate(1320 112) rotate(14.5)"><Arm x={0} y={0} s={1} angs={[60 + Math.sin(t * 1.2) * 5, -20, 40]} lens={[260, 220, 120]} claw={0.3} /></g>
        </g>
        {([["c", 340, 40, 1.2, 140, "#2bc6b6"], ["ball", 60, 120, 1.0, 0, "#4fc8f0"], ["pill", 80, 250, 1.1, -30, "#c36cf2"], ["c", 80, 480, 1.1, 210, "#f08a1a"], ["ring", 1620, 40, 1.4, 20, "#2bd4e0"], ["pill", 1400, 60, 0.9, 20, "#c36cf2"], ["tri", 1200, 190, 1.1, 30, "#e8357a"], ["ball", 1580, 120, 0.7, 0, "#c92fd6"], ["pill", 1640, 650, 1.1, 90, "#c36cf2"]] as [Kind, number, number, number, number, string | undefined][]).map(([kk, x, y, s, r, c], i) => (
          <Mol key={i} k={kk} x={x + Math.sin(t + i) * 8} y={y + Math.cos(t + i) * 8} s={s} r={r + t * 8} c={c} />
        ))}
      </g>
      <Tag x={320} y={366} text="Outside" p={1} reveal={rev(19.55)} bg="#3d48e8" ptr="none" />
      <Tag x={1580} y={366} text="Membrane" p={1} reveal={rev(19.62)} bg="#c0123a" ptr="none" rot={-12} />
      <Tag x={320} y={974} text="Inside" p={1} reveal={rev(19.7)} bg="#f08a1a" ptr="none" />
      <rect x={-200} y={-200} width={2320} height={1480} fill="url(#vig)" opacity={0.6} />
    </Svg>
  );
};

/* ================= Rangkaian dan transisi ================= */
const RepAsddd: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  // iris dari titik di dalam cincin, mempercepat, terbuka penuh di "This" (13,74)
  const ir = seg(t, 13.3, 13.78, Easing.in(Easing.quad));
  const irR = mix(0, 1300, ir), irX = mix(920, 960, ir), irY = 540;
  const dIn = seg(t, 18.7, 18.88);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {t < 7.5 && <AbsoluteFill><ShotA t={t} /></AbsoluteFill>}
      {t >= 7.45 && ir < 1 && <AbsoluteFill><ShotB t={t} /></AbsoluteFill>}
      {ir > 0 && t < 19.0 && (
        <AbsoluteFill style={{ clipPath: ir < 1 ? `circle(${irR}px at ${irX}px ${irY}px)` : undefined, opacity: 1 - dIn }}>
          <ShotC t={t} />
        </AbsoluteFill>
      )}
      {ir > 0 && ir < 1 && <div style={{ position: "absolute", left: irX - irR, top: irY - irR, width: irR * 2, height: irR * 2, borderRadius: "50%", border: "9px solid #fff", boxSizing: "border-box" }} />}
      {t >= 18.45 && <AbsoluteFill style={{ opacity: dIn }}><ShotD t={t} /></AbsoluteFill>}
    </AbsoluteFill>
  );
};

registerRoot(() => <Composition id="RepAsddd" component={RepAsddd} width={1920} height={1080} fps={FPS} durationInFrames={Math.round(DUR * FPS)} />);
