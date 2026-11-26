// Potongan instalasi air dan jalur pipa untuk P01: bak-bak berbentuk membulat dengan air bergradien, pipa tembus, sungai, rumah.
import React from "react";
import { FlatRect, R, mix, seg, shade, tint } from "@r3";
import { Sparkle } from "./drop";

const uid = () => React.useId().replace(/[^a-zA-Z0-9]/g, "");

/** Pipa tembus: dinding baja, lorong gelap, kilap tipis; air di dalam bila water > 0. d = path. */
export const Pipe: React.FC<{ d: string; w: number; c?: string; water?: number; wc?: string }> = ({ d, w, c = "#93a4b2", water = 0.5, wc = "#6fd0f2" }) => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} stroke={shade(c, 0.12)} strokeWidth={w + 18} />
    <path d={d} stroke="#33414f" strokeWidth={w} />
    {water > 0 && <path d={d} stroke={wc} strokeWidth={w * 0.55} opacity={0.4 * water} />}
    <path d={d} stroke="#fff" strokeWidth={Math.max(3, w * 0.12)} opacity={0.14} transform={`translate(0 ${-w * 0.36})`} />
  </g>
);

/** Air sungai: gradien, permukaan bergelombang dari t, riak dan kilau. */
export const RiverBody: React.FC<{ x0: number; x1: number; y: number; depth: number; t: number; c1?: string; c2?: string }> = ({ x0, x1, y, depth, t, c1 = "#3e86ab", c2 = "#17354d" }) => {
  const id = uid(); const pts: string[] = [];
  for (let x = x0; x <= x1; x += 40) pts.push(`${x} ${y + Math.sin(x * 0.018 + t * 1.7) * 5 + Math.sin(x * 0.007 - t) * 4}`);
  const top = "M" + pts.join(" L");
  return (
    <g>
      <defs><linearGradient id={`r${id}`} x1={0} y1={0} x2={0} y2={1}><stop offset={0} stopColor={c1} /><stop offset={1} stopColor={c2} /></linearGradient></defs>
      <path d={`${top} L${x1} ${y + depth} L${x0} ${y + depth} Z`} fill={`url(#r${id})`} />
      <path d={top} stroke="#d8f3ff" strokeWidth={5} fill="none" opacity={0.55} strokeLinecap="round" />
      {Array.from({ length: 9 }, (_, i) => { const px = mix(x0, x1, R(i, 3)) + Math.sin(t + i) * 20, py = y + 36 + R(i, 4) * (depth * 0.5); return <rect key={i} x={px} y={py} width={60 + R(i, 5) * 80} height={5} rx={2.5} fill="#cfeeff" opacity={0.18} />; })}
    </g>
  );
};

type TankP = { x: number; y: number; w: number; h: number; t: number; level?: number; c1: string; c2: string; children?: React.ReactNode };
/** Bak beton membulat: dinding, rongga gelap, air bergradien dengan permukaan bergelombang; isi digambar di dalam klip. */
export const TankShell: React.FC<TankP> = ({ x, y, w, h, t, level = 0.82, c1, c2, children }) => {
  const id = uid(); const cx = x + 16, cy = y + 4, cw = w - 32, ch = h - 20, wy = cy + ch * (1 - level);
  const wave: string[] = []; for (let i = 0; i <= cw; i += 20) wave.push(`${cx + i} ${wy + Math.sin(i * 0.05 + t * 2.2) * 3}`);
  return (
    <g>
      <defs>
        <clipPath id={`k${id}`}><rect x={cx} y={cy} width={cw} height={ch} rx={26} /></clipPath>
        <linearGradient id={`w${id}`} x1={0} y1={0} x2={0} y2={1}><stop offset={0} stopColor={c1} /><stop offset={1} stopColor={c2} /></linearGradient>
      </defs>
      <FlatRect x={x - 8} y={y - 8} w={w + 16} h={h + 16} r={34} fill="#5c7188" shadeK={0.25} />
      <rect x={cx} y={cy} width={cw} height={ch} rx={26} fill="#233444" />
      <g clipPath={`url(#k${id})`}>
        <path d={`M${wave.join(" L")} L${cx + cw} ${cy + ch} L${cx} ${cy + ch} Z`} fill={`url(#w${id})`} />
        <path d={`M${wave.join(" L")}`} stroke="#e4f7ff" strokeWidth={4} fill="none" opacity={0.5} strokeLinecap="round" />
        {children}
        <rect x={cx + 14} y={cy + 10} width={12} height={ch - 20} rx={6} fill="#fff" opacity={0.09} />
      </g>
    </g>
  );
};
const cav = (x: number, y: number, w: number, h: number) => ({ cx: x + 16, cy: y + 4, cw: w - 32, ch: h - 20 });

/** Bak koagulasi: bahan kimia menetes dari corong, pengaduk berputar, kotoran halus berputar. */
export const StirTank: React.FC<{ x: number; y: number; w: number; h: number; t: number }> = ({ x, y, w, h, t }) => {
  const { cx, cy, cw, ch } = cav(x, y, w, h), mid = cx + cw / 2, ang = t * 6;
  return (
    <g>
      <TankShell x={x} y={y} w={w} h={h} t={t} c1="#b79a68" c2="#7d6340">
        {Array.from({ length: 26 }, (_, i) => { const a = t * (1 + R(i, 1)) + R(i, 2) * 6.28, rr = 40 + R(i, 3) * (cw * 0.38); return <circle key={i} cx={mid + Math.cos(a) * rr} cy={cy + ch * (0.35 + 0.55 * R(i, 4)) + Math.sin(a) * 14} r={3 + R(i, 5) * 5} fill="#5e4a30" opacity={0.5} />; })}
        <rect x={mid - 7} y={cy - 10} width={14} height={ch * 0.82} rx={7} fill="#d6dde3" />
        {[0.55, 0.78].map((k, i) => <rect key={i} x={mid - 70 * Math.abs(Math.cos(ang + i * 1.6))} y={cy + ch * k} width={140 * Math.abs(Math.cos(ang + i * 1.6))} height={18} rx={9} fill="#e7b940" />)}
      </TankShell>
      <path d={`M${mid - 70} ${y - 120} L${mid + 70} ${y - 120} L${mid + 22} ${y - 40} L${mid - 22} ${y - 40} Z`} fill="#c9d0d6" />
      <rect x={mid - 80} y={y - 132} width={160} height={20} rx={10} fill="#e1e6ea" />
      {Array.from({ length: 4 }, (_, i) => { const p = (t * 1.3 + i / 4) % 1; return <circle key={i} cx={mid + Math.sin(i * 2) * 8} cy={y - 40 + p * (ch * 0.35)} r={5} fill="#fff" opacity={0.9 * (1 - p * 0.6)} />; })}
    </g>
  );
};

/** Bak flokulasi: kincir lambat, gumpalan (flok) tumbuh dan menyatu. */
export const FlocTank: React.FC<{ x: number; y: number; w: number; h: number; t: number }> = ({ x, y, w, h, t }) => {
  const { cx, cy, cw, ch } = cav(x, y, w, h), mid = cx + cw / 2, ang = t * 1.6, grow = seg(t, 0.15, 1.1);
  return (
    <TankShell x={x} y={y} w={w} h={h} t={t} c1="#b79a68" c2="#8f7447">
      {Array.from({ length: 22 }, (_, i) => { const a = t * 0.8 * (0.6 + R(i, 1)) + R(i, 2) * 6.28, rr = 30 + R(i, 3) * (cw * 0.36); return <circle key={i} cx={mid + Math.cos(a) * rr} cy={cy + ch * (0.3 + 0.55 * R(i, 4)) + Math.sin(a) * 12} r={mix(3, 8 + R(i, 5) * 12, grow)} fill="#8d7249" opacity={0.78} />; })}
      <g transform={`translate(${mid} ${cy + ch * 0.58}) rotate(${(ang * 180) / Math.PI})`}>{[0, 1, 2, 3].map((k) => <rect key={k} x={-8} y={-cw * 0.38} width={16} height={cw * 0.38} rx={8} fill="#e7b940" transform={`rotate(${k * 90})`} />)}<circle r={16} fill="#d6dde3" /></g>
    </TankShell>
  );
};

/** Bak pengendap: flok tenggelam, lumpur menumpuk, air di atas menjernih. */
export const SettleTank: React.FC<{ x: number; y: number; w: number; h: number; t: number; dirty?: string; sludge?: string }> = ({ x, y, w, h, t, dirty = "#9a7f55", sludge = "#6b5638" }) => {
  const { cx, cy, cw, ch } = cav(x, y, w, h), s = seg(t, 0, 2);
  return (
    <TankShell x={x} y={y} w={w} h={h} t={t} c1="#86cfe6" c2={dirty}>
      {Array.from({ length: 24 }, (_, i) => { const p = ((R(i, 1) + t * (0.12 + R(i, 2) * 0.12)) % 1); return <circle key={i} cx={cx + 30 + R(i, 3) * (cw - 60)} cy={cy + ch * 0.12 + p * ch * 0.78} r={5 + R(i, 4) * 9} fill={sludge} opacity={0.55 * (1 - p * 0.4)} />; })}
      <path d={`M${cx} ${cy + ch - 20 - 30 * s} Q${cx + cw * 0.25} ${cy + ch - 48 - 40 * s} ${cx + cw * 0.5} ${cy + ch - 28 - 30 * s} T${cx + cw} ${cy + ch - 24 - 26 * s} L${cx + cw} ${cy + ch} L${cx} ${cy + ch} Z`} fill={sludge} />
    </TankShell>
  );
};

/** Filter pasir: air jernih di atas, pasir dan kerikil berlapis, butir air jatuh menembus. */
export const FilterTank: React.FC<{ x: number; y: number; w: number; h: number; t: number }> = ({ x, y, w, h, t }) => {
  const { cx, cy, cw, ch } = cav(x, y, w, h), sandY = cy + ch * 0.52, gravY = cy + ch * 0.8;
  return (
    <TankShell x={x} y={y} w={w} h={h} t={t} level={0.9} c1="#96dcf2" c2="#6fc3e3">
      <rect x={cx} y={sandY} width={cw} height={gravY - sandY + 4} fill="#d9c08c" />
      {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={cx + R(i, 1) * cw} cy={sandY + 6 + R(i, 2) * (gravY - sandY - 10)} r={2 + R(i, 3) * 3} fill={R(i, 4) < 0.5 ? "#b99d68" : "#ecd8a8"} opacity={0.8} />)}
      <rect x={cx} y={gravY} width={cw} height={cy + ch - gravY} fill="#8a8277" />
      {Array.from({ length: 22 }, (_, i) => <ellipse key={i} cx={cx + 16 + (i % 6) * (cw / 6) + R(i, 5) * 10} cy={gravY + 16 + Math.floor(i / 6) * 24} rx={16 + R(i, 6) * 8} ry={11 + R(i, 7) * 5} fill={R(i, 8) < 0.5 ? "#6e675d" : "#a39a8c"} />)}
      {Array.from({ length: 8 }, (_, i) => { const p = (t * 0.9 + R(i, 1)) % 1; return <rect key={i} x={cx + 30 + R(i, 2) * (cw - 60)} y={cy + ch * 0.2 + p * ch * 0.55} width={5} height={16} rx={2.5} fill="#e9f8ff" opacity={0.7 * (1 - p)} />; })}
    </TankShell>
  );
};

/** Bak klorin: air jernih, titik terang klorin menyebar dan berkilau, pipa dosis di atas. */
export const ChlorTank: React.FC<{ x: number; y: number; w: number; h: number; t: number }> = ({ x, y, w, h, t }) => {
  const { cx, cy, cw, ch } = cav(x, y, w, h), mid = cx + cw / 2;
  return (
    <g>
      <TankShell x={x} y={y} w={w} h={h} t={t} c1="#9fe3f7" c2="#5fc0e6">
        {Array.from({ length: 16 }, (_, i) => { const sp = seg(t, 0, 1.2); const a = R(i, 1) * 6.28, d = 20 + R(i, 2) * cw * 0.4 * sp; return <Sparkle key={i} x={mid + Math.cos(a) * d + Math.sin(t * 1.5 + i) * 6} y={cy + ch * 0.2 + Math.abs(Math.sin(a)) * ch * 0.55 + Math.cos(t * 1.2 + i) * 6} s={8 + R(i, 3) * 9} c={i % 2 ? "#fff6a8" : "#ffffff"} o={0.55 + 0.4 * Math.sin(t * 4 + i)} rot={t * 40} />; })}
      </TankShell>
      <path d={`M${mid} ${y - 150} L${mid} ${y - 20}`} stroke="#d6dde3" strokeWidth={22} strokeLinecap="round" />
      {Array.from({ length: 3 }, (_, i) => { const p = (t * 1.4 + i / 3) % 1; return <circle key={i} cx={mid} cy={y - 20 + p * (ch * 0.28)} r={7} fill="#f4f08a" opacity={0.9 * (1 - p * 0.5)} />; })}
    </g>
  );
};

/** Bak aerasi IPAL: gelembung naik, bakteri berbentuk kapsul cokelat melayang. */
export const AerTank: React.FC<{ x: number; y: number; w: number; h: number; t: number; dirty?: string }> = ({ x, y, w, h, t, dirty = "#8e8d7f" }) => {
  const { cx, cy, cw, ch } = cav(x, y, w, h);
  return (
    <TankShell x={x} y={y} w={w} h={h} t={t} c1="#a9d6d4" c2={dirty}>
      {Array.from({ length: 14 }, (_, i) => { const a = t * 0.5 + R(i, 1) * 6.28; return <rect key={i} x={cx + 30 + R(i, 2) * (cw - 70) + Math.sin(a) * 18} y={cy + ch * (0.2 + 0.6 * R(i, 3)) + Math.cos(a * 1.3) * 14} width={26} height={12} rx={6} fill="#8b6a43" opacity={0.7} transform={`rotate(${R(i, 4) * 180 + t * 20} ${cx + 40 + R(i, 2) * (cw - 70)} ${cy + ch * 0.5})`} />; })}
      {Array.from({ length: 46 }, (_, i) => { const p = (t * (0.35 + R(i, 1) * 0.3) + R(i, 2)) % 1; const bx = cx + 20 + R(i, 3) * (cw - 40) + Math.sin(t * 2 + i) * 6, by = cy + ch - p * ch; const r = 4 + R(i, 4) * 9; return <g key={i} opacity={0.65 * (1 - p * 0.3)}><circle cx={bx} cy={by} r={r} fill="#eafcff" opacity={0.45} /><circle cx={bx - r * 0.3} cy={by - r * 0.3} r={r * 0.28} fill="#fff" /></g>; })}
      <rect x={cx + 20} y={cy + ch - 16} width={cw - 40} height={10} rx={5} fill="#c8d2da" />
    </TankShell>
  );
};

/** Saringan berjeruji miring di pintu masuk IPAL, dengan sampah yang tertahan. */
export const BarRack: React.FC<{ x: number; y: number; h: number; t: number }> = ({ x, y, h, t }) => (
  <g>
    <FlatRect x={x - 40} y={y} w={150} h={h} r={30} fill="#5c7188" />
    <rect x={x - 20} y={y + 20} width={110} height={h - 36} rx={20} fill="#233444" />
    <rect x={x - 20} y={y + h * 0.5} width={110} height={h * 0.5 - 16} rx={20} fill="#8f9188" opacity={0.7} />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={x - 4 + i * 15} y={y + 36} width={8} height={h - 72} rx={4} fill="#d6dde3" transform={`rotate(14 ${x + 50} ${y + h / 2})`} />)}
    {[0, 1, 2].map((i) => <ellipse key={i} cx={x + 18 + i * 30 + Math.sin(t * 1.2 + i) * 3} cy={y + h * 0.5 + 18 + i * 8} rx={20} ry={8} fill={["#a38e6b", "#7a8a6a", "#b4a58a"][i]} transform={`rotate(${-12 + i * 18} ${x + 18 + i * 30} ${y + h * 0.5})`} />)}
  </g>
);

/** Dinding belakang instalasi: gradien biru gelap, tiang, pipa besar silang, jendela berlampu. */
export const PlantBack: React.FC<{ x0: number; x1: number; y0: number; y1: number; seed?: number; t: number }> = ({ x0, x1, y0, y1, seed = 1, t }) => {
  const id = uid();
  return (
    <g>
      <defs><linearGradient id={`p${id}`} x1={0} y1={0} x2={0} y2={1}><stop offset={0} stopColor="#2f4660" /><stop offset={1} stopColor="#1a2b3d" /></linearGradient></defs>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={`url(#p${id})`} />
      {Array.from({ length: Math.floor((x1 - x0) / 420) }, (_, i) => <g key={i}><rect x={x0 + 120 + i * 420} y={y0} width={46} height={y1 - y0} rx={18} fill="#3b536d" opacity={0.7} /><rect x={x0 + 240 + i * 420} y={y0 + 90 + R(i + seed, 1) * 90} width={130} height={80} rx={20} fill="#ffd98a" opacity={0.4 + 0.15 * Math.sin(t * 0.8 + i)} /></g>)}
      <path d={`M${x0} ${y0 + (y1 - y0) * 0.32} L${x1} ${y0 + (y1 - y0) * 0.32}`} stroke="#4f6a85" strokeWidth={46} strokeLinecap="round" />
      <path d={`M${x0} ${y0 + (y1 - y0) * 0.32 - 12} L${x1} ${y0 + (y1 - y0) * 0.32 - 12}`} stroke="#fff" strokeWidth={6} opacity={0.12} />
    </g>
  );
};

/** Dapur rumah (potongan): dinding hangat, jendela senja, meja dan bak cuci, keran lengkung. riserX = x pipa tegak. */
export const House: React.FC<{ riserX: number; t: number }> = ({ riserX, t }) => {
  const id = uid(); const X = riserX;
  return (
    <g>
      <defs><linearGradient id={`h${id}`} x1={0} y1={0} x2={0} y2={1}><stop offset={0} stopColor="#f3d9a8" /><stop offset={1} stopColor="#d9b27a" /></linearGradient></defs>
      <FlatRect x={X - 220} y={340} w={680} h={700} r={40} fill="#e8cc9c" shadeK={0.2} side="right" />
      <rect x={X - 196} y={364} width={632} height={660} rx={26} fill={`url(#h${id})`} />
      <rect x={X + 250} y={440} width={150} height={190} rx={28} fill="#7e8cb0" /><rect x={X + 250} y={440} width={150} height={100} rx={28} fill="#c7a7b2" opacity={0.8} />
      <rect x={X + 322} y={440} width={6} height={190} fill="#e8cc9c" /><rect x={X + 250} y={530} width={150} height={6} fill="#e8cc9c" />
      <circle cx={X - 100} cy={470} r={44} fill="#ffe7a8" opacity={0.5} filter="url(#r3b10)" />
      <rect x={X - 120} y={788} width={460} height={250} rx={26} fill="#a07f5a" /><rect x={X - 120} y={788} width={460} height={18} rx={9} fill="#c6a47a" />
      <rect x={X - 70} y={782} width={290} height={34} rx={17} fill="#7a8a96" /><rect x={X - 60} y={786} width={270} height={22} rx={11} fill="#c9d3da" />
      <rect x={X - 100} y={820} width={380} height={190} rx={18} fill="#8b6c49" opacity={0.6} />
    </g>
  );
};
