// T01-002: set dan benda bersama (R3 2.5D, gaya siklus 005). Dunia: toko sepatu senja, jalan tol antar bank, pulau QRIS.
// Gambar utama dijaga di y < 860 (caption di bawah). Tanpa logo merek.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, R, clamp, mix, pop, seg, useShot } from "@r3";
import type { ShotCtx } from "@r3";
import { Cloud, Shade, Sky, Tones, rr } from "@r3/art";
import { BLUE, COPPER, CORAL, CREAM, Contact, DARK, Eyes, Face, GOLD, GREEN, Glow2, Hose, LL, LR, P, QrGrid, STEEL, TEALB, WOOD, circ, ell, line, tw } from "./kit";
import { BFace, BankChar, Coin, NetTower, PURPLE, SKYB, SILVER, Stack, Txt } from "./benda";
import { Shrub } from "./dekor";
import { Fore, Mid } from "./latar";

export type SetName = "toko" | "jalan" | "malam" | "brankas" | "kantor" | "pulau" | "hijau" | "ungu" | "pagi";
export type Cam = { x: number; y: number; z: number };

/** Waktu kata dengan cadangan. */
export const useW = () => { const c = useShot(); return { ...c, at: (w: string, fb: number, n = 0) => tw(c.word(w, n), fb) }; };
export const go = (t: number, a: number, d = 0.6) => seg(t, a, a + d, Easing.inOut(Easing.cubic));
export const back = (t: number, a: number, d = 0.45) => seg(t, a, a + d, Easing.out(Easing.back(1.5)));

const Grad: React.FC<{ id: string; stops: string[] }> = ({ id, stops }) => (
  <g><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{stops.map((c, i) => <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />)}</linearGradient></defs><rect x={-600} y={-700} width={3200} height={2600} fill={`url(#${id})`} /></g>
);
const Stars: React.FC<{ t: number; n?: number }> = ({ t, n = 60 }) => <g>{Array.from({ length: n }, (_, i) => <circle key={i} cx={R(i, 2) * 2400 - 240} cy={R(i, 3) * 500 - 80} r={1.5 + R(i, 4) * 2.5} fill="#cfe0ff" opacity={0.25 + 0.4 * Math.abs(Math.sin(t * 0.8 + i))} />)}</g>;

/* ---------------- benda latar ---------------- */
export const ShoeBox: React.FC<{ x: number; y: number; s?: number; c?: Tones }> = ({ x, y, s = 1, c = CORAL }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Shade d={rr(-62, -62, 124, 62, 8)} tones={c} L={LR} s={[3, 10, 6]} /><Shade d={rr(-68, -76, 136, 24, 8)} tones={c} L={LR} s={[2, 7, 5]} />
    <path d={rr(-24, -42, 48, 24, 6)} fill={P.cream} />
  </g>
);
const Shelf: React.FC<{ x: number; y: number; n: number; seed: number }> = ({ x, y, n, seed }) => (
  <g>
    <path d={rr(x - 20, y, n * 150 + 20, 18, 8)} fill="#4a2448" />
    {Array.from({ length: n }, (_, i) => <ShoeBox key={i} x={x + 60 + i * 150} y={y} s={0.82} c={[CORAL, TEALB, GOLD, BLUE, GREEN][(i + seed) % 5]} />)}
  </g>
);
const Window: React.FC<{ t: number; x: number; night?: boolean }> = ({ t, x, night }) => (
  <g transform={`translate(${x} 0)`}>
    <clipPath id={`win${x}`}><path d={rr(-230, 130, 460, 400, 200, 20)} /></clipPath>
    <g clipPath={`url(#win${x})`}><g transform="translate(-960 -150)"><Sky t={t} /></g><path d="M-260 430Q-100 370 20 420Q150 380 260 430V560H-260Z" fill="#6c3c82" />{[0, 1, 2, 3, 4].map((i) => <path key={i} d={rr(-220 + i * 100, 450 - R(i, 8) * 80, 60, 140, 8)} fill="#45286a" />)}{night && <rect x={-260} y={100} width={520} height={460} fill="#0b1130" opacity={0.55} />}</g>
    <path d={rr(-230, 130, 460, 400, 200, 20)} fill="none" stroke="#fff0d4" strokeWidth={18} />
    {line("M0 134V528M-226 340H226", "#fff0d4", 10)}
  </g>
);

const Back1: React.FC<{ kind: SetName; t: number; cam: Cam }> = ({ kind, t, cam }) => {
  if (kind === "toko") return (<>
    <Layer cam={cam} d={0}><Grad id="d2toko" stops={["#7a3a62", "#b8556a", "#e8906a"]} /></Layer>
    <Layer cam={cam} d={0.35}><Window t={t} x={960} /><Shelf x={40} y={330} n={4} seed={0} /><Shelf x={60} y={520} n={4} seed={2} /><Shelf x={1330} y={330} n={4} seed={3} /><Shelf x={1310} y={520} n={4} seed={1} /></Layer>
    <Layer cam={cam} d={0.6}><path d="M-400 760H2320V1300H-400Z" fill="#5a2c52" />{[180, 960, 1740].map((a, i) => <g key={a}>{line(`M${a} -100V${70 + i % 2 * 20}`, "#3c1d3e", 7)}<Shade d={`M${a - 70} ${150 + i % 2 * 20}Q${a} ${40 + i % 2 * 20} ${a + 70} ${150 + i % 2 * 20}Z`} tones={GREEN} L={LR} s={[4, 12, 7]} /><Glow2 x={a} y={170 + i % 2 * 20} r={200} c="#ffd98a" o={0.5} /></g>)}</Layer>
  </>);
  if (kind === "jalan" || kind === "pagi") return (<>
    <Layer cam={cam} d={0}>{kind === "pagi" ? <Grad id="d2pagi" stops={["#3f8fd8", "#8fd0ee", "#ffe6bc"]} /> : <Sky t={t} />}</Layer>
    <Layer cam={cam} d={0.12}><Cloud x={380 + t * 6} y={220} s={110} seed={7} base="#a4528e" lit="#ffc99a" shadow="#8a4690" op={0.85} /><Cloud x={1600 - t * 4} y={150} s={90} seed={19} base="#6e46a0" lit="#f2a89a" shadow="#5e3c96" op={0.8} /></Layer>
    <Layer cam={cam} d={0.3}><path d="M-400 640Q0 470 380 600Q700 450 1060 580Q1400 440 1760 590Q2050 500 2320 580V1300H-400Z" fill={kind === "pagi" ? "#5c8ca8" : "#6c3c82"} /></Layer>
    <Layer cam={cam} d={0.6}><path d="M-400 700Q300 620 900 690Q1500 750 2320 650V1300H-400Z" fill={kind === "pagi" ? "#3f7a6a" : "#45286a"} />{[120, 520, 1180, 1560, 1840].map((a, i) => <Shrub key={a} x={a} y={715 + R(i, 4) * 25} s={0.9} c={kind === "pagi" ? undefined : ["#23183e", "#34205a", "#6c3c82"]} />)}</Layer>
  </>);
  if (kind === "malam") return (<>
    <Layer cam={cam} d={0}><Grad id="d2malam" stops={["#0b1130", "#172447", "#4a3a82"]} /><Stars t={t} /><Glow2 x={1690} y={150} r={230} c="#9fb8ff" o={0.45} /><circle cx={1690} cy={150} r={46} fill="#e8f0ff" /></Layer>
    <Layer cam={cam} d={0.3}>{Array.from({ length: 34 }, (_, i) => { const h = 70 + R(i, 8) * 150; return <g key={i}><path d={rr(-300 + i * 74, 660 - h, 58 + R(i, 9) * 26, h + 80, i % 4 === 0 ? 28 : 6, 0)} fill="#33306c" />{R(i, 11) > 0.4 && <rect x={-286 + i * 74} y={680 - h} width={12} height={16} rx={3} fill="#ffd27a" opacity={0.8} />}</g>; })}</Layer>
    <Layer cam={cam} d={0.7}><path d="M-400 700Q500 650 960 700T2320 690V1300H-400Z" fill="#1d3056" /></Layer>
  </>);
  if (kind === "brankas") return (<Layer cam={cam} d={0.4}><Grad id="d2vault" stops={["#101a38", "#1d2f5c", "#2c4a80"]} />{Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${-100 + i * 220} -200V780`} stroke="#35569a" strokeWidth={8} opacity={0.5} />)}{Array.from({ length: 4 }, (_, i) => <path key={i} d={`M-400 ${120 + i * 210}H2320`} stroke="#35569a" strokeWidth={6} opacity={0.4} />)}<path d="M-400 790H2320V1300H-400Z" fill="#0c1230" /><Glow2 x={960} y={260} r={700} c="#7fb4ff" o={0.3} /></Layer>);
  if (kind === "kantor") return (<Layer cam={cam} d={0.4}><Grad id="d2kantor" stops={["#14464e", "#1f6a6a", "#3a9a8a"]} />{[140, 330, 1590, 1780].map((a, i) => <g key={a}><Shade d={rr(a - 75, 180, 150, 600, 22)} tones={DARK} L={LR} s={[5, 16, 8]} />{Array.from({ length: 7 }, (_, k) => <g key={k}><path d={rr(a - 52, 215 + k * 78, 104, 42, 10)} fill="#27345e" /><circle cx={a - 28} cy={236 + k * 78} r={8} fill={Math.sin(t * 3 + i * 2 + k) > 0 ? "#7dffb8" : P.coin} /></g>)}</g>)}<path d="M-400 780H2320V1300H-400Z" fill="#103238" /><Glow2 x={960} y={300} r={720} c="#9fffe0" o={0.28} /></Layer>);
  if (kind === "pulau") return (<>
    <Layer cam={cam} d={0}><Grad id="d2pulau" stops={["#2f78c8", "#78c8ee", "#ffe0b0"]} /><Glow2 x={1650} y={230} r={210} c="#fff0b0" o={0.5} /><circle cx={1650} cy={230} r={64} fill="#fff8d8" /></Layer>
    <Layer cam={cam} d={0.12}><Cloud x={420 + t * 6} y={210} s={100} seed={3} base="#bfe0f4" lit="#ffffff" shadow="#9cc8e8" /></Layer>
    <Layer cam={cam} d={0.35}><path d="M-400 600H2320V1300H-400Z" fill="#1d7ca8" />{Array.from({ length: 16 }, (_, i) => <path key={i} d={rr(-300 + R(i, 3) * 2500 + Math.sin(t + i) * 20, 620 + R(i, 4) * 90, 90, 8, 4)} fill="#bff0f8" opacity={0.55} />)}</Layer>
    <Layer cam={cam} d={0.7}><path d="M-400 730Q300 660 960 710T2320 700V1300H-400Z" fill="#2f8a6a" />{[110, 260, 1700, 1850].map((a, i) => <g key={a} transform={`translate(${a} 740)`}>{line(`M0 0Q${i % 2 ? 40 : -40} -140 ${Math.sin(t + i) * 8 + (i % 2 ? 20 : -20)} -270`, "#5a3040", 22)}<g transform={`translate(${Math.sin(t + i) * 8 + (i % 2 ? 20 : -20)} -272)`}>{[-150, -110, -60, -20, 30, 190, 230].map((r) => <path key={r} transform={`rotate(${r + Math.sin(t * 1.4 + i) * 4})`} d="M0 0Q70 -40 150 12Q70 -6 0 12Z" fill="#175a48" />)}</g></g>)}</Layer>
  </>);
  const g = kind === "hijau" ? ["#12423c", "#1f6a57", "#58b890"] : ["#2c1658", "#5a3290", "#a45a9a"];
  return (<Layer cam={cam} d={0.25}><Grad id={`d2${kind}`} stops={g} /><Glow2 x={960} y={470} r={820} c={kind === "hijau" ? "#c8ffe0" : "#ffb88a"} o={0.38} />{Array.from({ length: 28 }, (_, i) => <circle key={i} cx={R(i, 21) * 2200 - 140} cy={R(i, 22) * 900 + Math.sin(t * 0.7 + i) * 14} r={4 + R(i, 23) * 9} fill="#fff" opacity={0.12} />)}<path d="M-400 800Q960 740 2320 800V1300H-400Z" fill="#000" opacity={0.22} /></Layer>);
};

/** Panggung satu shot: latar berlapis + isi di lapisan depan. cam = [awal, akhir] zoom/posisi sepanjang shot. */
export const Scene: React.FC<{ redup?: boolean; kind: SetName; from?: Partial<Cam>; to?: Partial<Cam>; children: React.ReactNode; vignette?: number }> = ({ kind, from, to, children, vignette = 0.45, redup }) => {
  const { t, dur } = useShot();
  const a = { x: 960, y: 540, z: 1.0, ...from }, b = { x: 960, y: 540, z: 1.06, ...to };
  const p = seg(t, 0, Math.max(1.5, dur + 0.3), Easing.inOut(Easing.sin));
  const cam = { x: mix(a.x, b.x, p) + Math.sin(t * 0.36) * 7, y: mix(a.y, b.y, p) + Math.cos(t * 0.29) * 4, z: mix(a.z, b.z, p) };
  return (<Frame vignette={vignette}><Back1 kind={kind} t={t} cam={cam} /><Mid kind={kind} t={t} cam={cam} />{redup && <Layer cam={cam} d={0.8}><rect x={-600} y={-700} width={3200} height={2600} fill="#2a0e44" opacity={0.5} /></Layer>}<Layer cam={cam} d={1}>{children}</Layer><Fore kind={kind} t={t} cam={cam} /></Frame>);
};

/* ---------------- benda toko ---------------- */
/** meja kasir; y = permukaan atas */
export const Counter: React.FC<{ y?: number; x?: number; w?: number }> = ({ y = 760, x = 200, w = 1520 }) => (
  <g><Contact x={x + w / 2} y={y + 330} w={w * 0.55} /><Shade d={rr(x + 30, y + 20, w - 60, 520, 20)} tones={WOOD} L={LR} s={[10, 30, 14]} />{Array.from({ length: Math.floor(w / 250) }, (_, i) => <path key={i} d={rr(x + 80 + i * 250, y + 80, 190, 300, 18)} fill="#7e3c3a" opacity={0.75} />)}<Shade d={rr(x, y - 16, w, 48, 18)} tones={COPPER} L={LR} s={[5, 14, 9]} /><path d={`M${x + 18} ${y - 8}H${x + w * 0.3}M${x + w * 0.36} ${y - 8}H${x + w * 0.42}`} stroke="#ffd0a0" strokeWidth={6} strokeLinecap="round" />{Array.from({ length: Math.floor(w / 190) }, (_, i) => <path key={i} d={`M${x + 70 + i * 190} ${y + 12 + (i % 3) * 5}q60 ${i % 2 ? 9 : -7} 120 0`} stroke={COPPER[1]} strokeWidth={4} fill="none" strokeLinecap="round" />)}{Array.from({ length: Math.floor(w / 250) }, (_, i) => <g key={i}><path d={`M${x + 100 + i * 250} ${y + 130}q40 26 150 4M${x + 100 + i * 250} ${y + 220}q60 -20 150 -4`} stroke="#5a2430" strokeWidth={5} fill="none" opacity={0.6} /><path d={`M${x + 96 + i * 250} ${y + 98}h120`} stroke="#d98a56" strokeWidth={5} strokeLinecap="round" opacity={0.7} /></g>)}</g>
);
/** sepatu; (x,y) = dasar */
export const Shoe: React.FC<{ x: number; y: number; s?: number; c?: Tones; rot?: number }> = ({ x, y, s = 1, c = CORAL, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Contact x={0} y={4} w={170} />
    <Shade d="M-150 -42Q-158 -128 -112 -140Q-74 -118 -44 -132Q-8 -156 18 -122Q60 -82 120 -74Q166 -64 164 -34V-24H-150Z" tones={c} L={LR} s={[6, 18, 10]} />
    {[0, 1, 2].map((i) => <g key={i}>{line(`M${-30 + i * 28} ${-128 + i * 17}L${4 + i * 28} ${-96 + i * 15}`, "#fff4da", 10)}</g>)}
    <Shade d={rr(-160, -34, 332, 36, 18)} tones={CREAM} L={LR} s={[3, 9, 6]} />
    {line("M-130 -70Q-40 -52 60 -62", c[3], 12)}
  </g>
);
export const Sock: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Contact x={14} y={4} w={110} />
    <Shade d="M-70 -250H30V-110Q34 -84 70 -74Q120 -60 120 -30Q120 0 82 0H0Q-70 0 -70 -70Z" tones={GOLD} L={LR} s={[5, 16, 9]}><rect x={-90} y={-226} width={150} height={22} fill={BLUE[2]} /><rect x={-90} y={-188} width={150} height={14} fill={CORAL[2]} /></Shade>
    <Shade d={rr(-78, -268, 116, 40, 14)} tones={BLUE} L={LR} s={[3, 9, 6]} />
  </g>
);
/** kartu; (x,y) = tengah, 260x164 */
export const Card: React.FC<{ x: number; y: number; s?: number; rot?: number; premium?: boolean; t: number; face?: Face; glow?: number }> = ({ x, y, s = 1, rot = 0, premium, t, face, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {(glow > 0 || premium) && <Glow2 x={0} y={0} r={230} c={premium ? "#ffd98a" : "#9fc4ff"} o={premium ? 0.45 + glow * 0.3 : glow * 0.5} />}
    <Shade d={rr(-130, -82, 260, 164, 22)} tones={premium ? PURPLE : SKYB} L={LR} s={[4, 12, 7]}>
      {premium && <path d="M-140 40Q-20 -20 140 -60V-10Q0 20 -140 90Z" fill={GOLD[2]} opacity={0.85} />}
      <path d={`M${-160 + ((t * 120) % 420)} -90l40 0l-60 190l-40 0Z`} fill="#fff" opacity={0.22} />
    </Shade>
    <Shade d={rr(-102, -46, 52, 40, 9)} tones={GOLD} L={LR} s={[2, 6, 4]} />{line("M-102 -26H-50M-76 -46V-6", GOLD[1], 3)}
    {!face && [0, 1, 2, 3].map((i) => <path key={i} d={rr(-102 + i * 56, 34, 42, 12, 6)} fill="#fff4da" opacity={0.85} />)}
    {premium && !face && <path transform="translate(86 -40)" d="M0 -26L8 -8L28 -7L12 6L17 25L0 14L-17 25L-12 6L-28 -7L-8 -8Z" fill={GOLD[3]} />}
    {face && <g><ellipse cx={30} cy={22} rx={72} ry={44} fill="#fff4da" /><Eyes x={30} y={10} gap={26} r={9} face={face} t={t} /></g>}
  </g>
);
/** mesin kartu; (x,y) = dasar. screen: "idle" | "beep" | "ok" */
export const Terminal: React.FC<{ x: number; y: number; s?: number; t: number; on?: number; amount?: string }> = ({ x, y, s = 1, t, on = 0, amount }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={4} w={150} />
    <Shade d="M-96 0L-112 -230Q-114 -262 -80 -264H80Q114 -262 112 -230L96 0Q94 14 76 14H-76Q-94 14 -96 0Z" tones={DARK} L={LR} s={[6, 20, 10]} />
    <path d={rr(-84, -240, 168, 108, 14)} fill={on > 0.5 ? "#2f8f6b" : "#2c3a70"} />
    {amount ? <Txt x={0} y={-168} s={52}>{amount}</Txt> : on > 0.5 ? line("M-34 -188L-8 -164L36 -212", "#fff", 14) : [0, 1].map((i) => <path key={i} d={rr(-58, -212 + i * 34, 116 - i * 34, 14, 7)} fill="#7fb4ff" opacity={0.5 + 0.4 * Math.abs(Math.sin(t * 2 + i))} />)}
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <path key={`${r}${c}`} d={rr(-70 + c * 52, -112 + r * 34, 34, 22, 8)} fill={r === 2 && c === 2 ? "#7dffb8" : "#8aa0d0"} />))}
    {line("M-96 -230L-84 -30", "#8aa0e0", 5, 0.8)}
  </g>
);
export const Waves: React.FC<{ x: number; y: number; t: number; at: number; c?: string; n?: number }> = ({ x, y, t, at, c = P.coin, n = 3 }) => (
  <g>{Array.from({ length: n }, (_, i) => { const u = (t - at) * 0.9 - i * 0.22; return u > 0 && u < 1 ? <circle key={i} cx={x} cy={y} r={50 + u * 240} stroke={c} strokeWidth={14 * (1 - u)} fill="none" opacity={1 - u} /> : null; })}</g>
);

/* ---------------- uang ---------------- */
export const Gold: React.FC<{ x: number; y: number; r?: number; text?: string; sx?: number; op?: number }> = ({ x, y, r = 50, text = "$", sx = 1, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${sx} 1)`} opacity={op}><Shade d={circ(0, 0, r)} tones={GOLD} L={LR} s={[r * 0.06, r * 0.2, r * 0.12]} /><circle r={r * 0.74} fill="none" stroke={GOLD[1]} strokeWidth={r * 0.08} /><Txt x={0} y={r * (text.length > 2 ? 0.2 : 0.3)} s={r * (text.length > 3 ? 0.5 : text.length > 2 ? 0.62 : 0.82)} c="#6a2c18">{text}</Txt></g>
);
/** grid titik-koin: n total, `taken` terakhir disorot warna lain */
export const CoinGrid: React.FC<{ x: number; y: number; n?: number; cols?: number; r?: number; p?: number; taken?: number; takenC?: string; gone?: boolean }> = ({ x, y, n = 100, cols = 10, r = 16, p = 1, taken = 0, takenC = CORAL[2], gone }) => {
  const g = r * 2.35, rows = Math.ceil(n / cols);
  return (<g transform={`translate(${x} ${y})`}>{Array.from({ length: n }, (_, i) => { if (i >= Math.round(n * p)) return null; const row = rows - 1 - Math.floor(i / cols), col = i % cols, cut = i >= n - taken; const cx = (col - (cols - 1) / 2) * g, cy = (row - (rows - 1)) * g - r; return cut && gone ? <circle key={i} cx={cx} cy={cy} r={r * 0.8} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="6 6" opacity={0.6} /> : <g key={i}><circle cx={cx + 2} cy={cy + 4} r={r} fill={cut ? "#7a2440" : "#a85a28"} /><circle cx={cx} cy={cy} r={r} fill={cut ? takenC : P.coin} /><circle cx={cx + r * 0.25} cy={cy - r * 0.3} r={r * 0.3} fill="#fff" opacity={0.55} /></g>; })}</g>);
};
/** gerobak koin; (x,y) = dasar roda. load 0..1 */
export const Cart: React.FC<{ x: number; y: number; s?: number; t: number; load?: number; rolling?: boolean; taken?: number; grid?: boolean }> = ({ x, y, s = 1, t, load = 1, rolling, taken = 0, grid }) => (
  <g transform={`translate(${x} ${y + (rolling ? Math.sin(t * 14) * 3 : 0)}) scale(${s})`}>
    <Contact x={0} y={4} w={210} />
    {grid ? <CoinGrid x={0} y={-120} cols={20} r={7.4} p={load} taken={taken} gone /> : Array.from({ length: Math.round(34 * load) }, (_, i) => <ellipse key={i} cx={(R(i, 5) - 0.5) * 250} cy={-132 - R(i, 6) * 44 * (1 - Math.abs(R(i, 5) - 0.5))} rx={30} ry={14} fill={i % 3 === 0 ? "#fff0a0" : i % 3 === 1 ? "#ffd23f" : "#e09a2c"} />)}
    <Shade d="M-170 -128H170L138 -48Q134 -36 118 -36H-118Q-134 -36 -138 -48Z" tones={WOOD} L={LR} s={[6, 20, 10]}>{[-80, 0, 80].map((a) => <path key={a} d={`M${a} -130L${a * 0.86} -34`} stroke={WOOD[1]} strokeWidth={8} />)}</Shade>
    {[-104, -52, 28, 104].map((x, i) => <path key={x} d={`M${x - 20} ${-100 + (i % 3) * 20}q20 ${i % 2 ? 7 : -6} 40 0`} stroke="#d98a56" strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <Shade d={rr(-182, -140, 364, 24, 10)} tones={COPPER} L={LR} s={[3, 8, 5]} />{[-160, -80, 0, 80, 160].map((x) => <g key={x}><circle cx={x} cy={-128} r={5} fill="#5a2430" /><circle cx={x + 1.5} cy={-130} r={2} fill="#ffd0a0" /></g>)}<path d="M-172 -134H-60M20 -134H60" stroke="#ffd0a0" strokeWidth={4} strokeLinecap="round" />
    {line("M168 -110Q225 -112 236 -154", WOOD[2], 16)}
    {[-98, 98].map((a) => <g key={a} transform={`translate(${a} -34) rotate(${rolling ? t * 260 : 0})`}><Shade d={circ(0, 0, 38)} tones={DARK} L={LR} s={[3, 10, 6]} /><circle r={20} fill={GOLD[2]} />{line("M-18 0H18M0 -18V18", GOLD[1], 6)}</g>)}
  </g>
);
export const Sack: React.FC<{ x: number; y: number; s?: number; c?: Tones; label?: string }> = ({ x, y, s = 1, c = CREAM, label = "$" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><Contact x={0} y={4} w={140} /><Shade d="M-40 -190Q-140 -120 -128 -52Q-120 4 0 4Q120 4 128 -52Q140 -120 40 -190Z" tones={c} L={LR} s={[7, 22, 12]} /><Shade d="M-44 -190Q-70 -240 -30 -232Q0 -246 30 -232Q70 -240 44 -190Z" tones={c} L={LR} s={[3, 10, 6]} />{line("M-50 -190H50", WOOD[2], 14)}<Txt x={0} y={-52} s={72} c={c === CREAM ? WOOD[2] : "#fff"}>{label}</Txt></g>
);
export const Bill: React.FC<{ x: number; y: number; s?: number; rot?: number; text?: string }> = ({ x, y, s = 1, rot = 0, text = "$100" }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><Shade d={rr(-96, -50, 192, 100, 12)} tones={GREEN} L={LR} s={[3, 9, 6]} /><path d={rr(-80, -36, 160, 72, 8)} fill="none" stroke="#c8ffe4" strokeWidth={5} /><circle r={26} fill="#c8ffe4" /><Txt x={0} y={11} s={30} c={GREEN[0]}>{text}</Txt></g>
);
/** label harga gantung; (x,y) = tengah */
export const PriceTag: React.FC<{ x: number; y: number; s?: number; rot?: number; text: string; sub?: string; tones?: Tones }> = ({ x, y, s = 1, rot = 0, text, sub, tones = CREAM }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><Shade d="M-200 -90H150Q176 -90 192 -70L236 -10Q244 0 236 10L192 70Q176 90 150 90H-200Q-224 90 -224 66V-66Q-224 -90 -200 -90Z" tones={tones} L={LR} s={[5, 15, 9]} /><circle cx={188} r={17} fill="#2a1444" />{line("M188 0Q260 -30 280 -110", "#2a1444", 6)}<Txt x={-26} y={sub ? 14 : 30} s={92} c={tones === CREAM ? P.navy : "#fff"}>{text}</Txt>{sub && <Txt x={-26} y={64} s={36} c={tones === CREAM ? "#7a4a60" : "#fff"}>{sub}</Txt>}</g>
);
/** kertas/struk; (x,y) = tengah atas */
export const Paper: React.FC<{ x: number; y: number; w?: number; h?: number; rot?: number; children?: React.ReactNode }> = ({ x, y, w = 300, h = 400, rot = 0, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}><path d={rr(-w / 2 + 10, 14, w, h, 18)} fill="#1a0c34" opacity={0.28} /><Shade d={rr(-w / 2, 0, w, h, 18)} tones={CREAM} L={LR} s={[3, 10, 6]} />{children}</g>
);
export const Lines: React.FC<{ x: number; y: number; w: number; n: number; g?: number; c?: string }> = ({ x, y, w, n, g = 40, c = "#b49cb4" }) => <g>{Array.from({ length: n }, (_, i) => <path key={i} d={rr(x, y + i * g, w * (0.55 + R(i, 31) * 0.45), 13, 6)} fill={c} />)}</g>;

/* ---------------- jalan tol ---------------- */
export const Highway: React.FC<{ y?: number; t: number; speed?: number; p?: number; x0?: number; x1?: number }> = ({ y = 800, t, speed = 60, p = 1, x0 = -400, x1 = 2320 }) => p <= 0 ? null : (
  <g><path d={`M${x0} ${y}H${mix(x0, x1, p)}`} stroke="#ffb03a" strokeWidth={130} opacity={0.18} /><path d={`M${x0} ${y}H${mix(x0, x1, p)}`} stroke="#5a3048" strokeWidth={104} /><path d={`M${x0} ${y - 6}H${mix(x0, x1, p)}`} stroke="#c98a6a" strokeWidth={76} /><path d={`M${x0} ${y - 44}H${mix(x0, x1, p)}`} stroke="#ffe0a0" strokeWidth={9} />{Array.from({ length: 90 }, (_, i) => { const x = x0 + R(i, 51) * (x1 - x0); return x < mix(x0, x1, p) ? <ellipse key={i} cx={x} cy={y - 34 + R(i, 52) * 62} rx={3 + R(i, 53) * 5} ry={2.5} fill={i % 2 ? "#e0a888" : "#8a5460"} opacity={0.7} /> : null; })}<path d={`M${x0} ${y + 44}H${mix(x0, x1, p)}`} stroke="#8a4a58" strokeWidth={10} /><path d={`M${x0} ${y - 4}H${mix(x0, x1, p)}`} stroke="#fff6d8" strokeWidth={9} strokeDasharray="44 60" strokeDashoffset={-t * speed} /></g>
);
/** gerbang tol; (x,y) = dasar tiang. open 0..1 mengangkat palang */
export const TollGate: React.FC<{ x: number; y: number; s?: number; open?: number; t: number; tones?: Tones; mood?: string }> = ({ x, y, s = 1, open = 0, t, tones = TEALB, mood }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={4} w={110} />
    <Shade d={rr(-52, -200, 104, 200, 22, 6)} tones={tones} L={LR} s={[5, 16, 9]} />
    <path d={rr(-34, -168, 68, 60, 18)} fill="#ffd27a" />{mood ? <BFace x={0} y={-142} s={0.5} mood={mood} t={t} /> : <circle cy={-140} r={14} fill="#a85a28" />}
    <Shade d="M-76 -196Q0 -266 76 -196Z" tones={CORAL} L={LR} s={[4, 12, 7]} />
    <circle cy={-246} r={13} fill={open > 0.5 ? "#7dffb8" : "#ff6a5a"} /><Glow2 x={0} y={-246} r={60} c={open > 0.5 ? "#7dffb8" : "#ff6a5a"} o={0.7} />
    <g transform={`translate(52 -92) rotate(${-open * 72})`}><path d={rr(0, -13, 230, 26, 13)} fill="#fff4da" />{[0, 1, 2, 3].map((i) => <path key={i} d={`M${24 + i * 56} -13h26l-16 26h-26Z`} fill={CORAL[2]} />)}</g>
  </g>
);

/* ---------------- pemeran tambahan ---------------- */
/** perusahaan mesin kartu: kotak server berkepala bulat dengan headset */
export const ServerGuy: React.FC<{ x: number; y: number; s?: number; t: number; face?: Face; look?: number; arm?: [number, number]; armL?: [number, number]; lit?: number }> = ({ x, y, s = 1, t, face = "neutral", look = 0, arm, armL, lit = 1 }) => {
  const b = Math.sin(t * 2 + 3) * 4, limb = (a: [number, number], from: number) => `M${from} -150Q${(from + a[0]) / 2} ${(-150 + a[1]) / 2 + 80} ${a[0]} ${a[1]}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Contact x={0} y={4} w={150} />{lit > 0 && <Glow2 x={0} y={-200} r={300} c="#b490e8" o={0.25 * lit} />}
      <g transform={`translate(0 ${b})`}>
        <Shade d={rr(-110, -330, 220, 316, 48, 28)} tones={PURPLE} L={LR} s={[8, 26, 13]}>{[-120, -82, -44].map((a) => <path key={a} d={rr(-70, a, 140, 22, 11)} fill={PURPLE[0]} />)}</Shade>
        {[-120, -82, -44].map((a, i) => <circle key={a} cx={-46} cy={a + 11} r={7} fill={Math.sin(t * 4 + i * 2) > 0 ? "#7dffb8" : P.coin} />)}
        <path d="M-92 -306Q-60 -324 -8 -324" stroke="#e0c8ff" strokeWidth={9} strokeLinecap="round" fill="none" /><path d="M-96 -290V-60" stroke="#b490e8" strokeWidth={6} strokeLinecap="round" strokeDasharray="70 18 26 18" fill="none" />{[[-92, -34], [92, -34], [-92, -150], [92, -150]].map(([x, y]) => <g key={`${x}${y}`}><circle cx={x} cy={y} r={7} fill="#2c1658" /><circle cx={x + 2} cy={y - 2} r={3} fill="#e0c8ff" /></g>)}
        <ellipse cy={-230} rx={80} ry={58} fill="#fff4da" /><Eyes x={look} y={-248} gap={30} t={t} face={face} />
        {line("M-104 -232Q-112 -366 0 -368Q112 -366 104 -232", DARK[2], 18)}<path d={rr(-130, -262, 34, 70, 17)} fill={CORAL[2]} /><path d={rr(96, -262, 34, 70, 17)} fill={CORAL[2]} />{line("M-110 -204Q-90 -160 -34 -166", DARK[2], 9)}<circle cx={-32} cy={-166} r={11} fill={DARK[3]} />
        <Hose d={arm ? limb(arm, 100) : "M102 -150Q150 -110 140 -60"} tones={PURPLE} /><Hose d={armL ? limb(armL, -100) : "M-102 -150Q-150 -110 -140 -60"} tones={PURPLE} />
      </g>
    </g>
  );
};
/** pembayar tunai: badan lonjong ungu muda, topi pet */
export const CashMan: React.FC<{ x: number; y: number; s?: number; t: number; face?: Face; look?: number; arm?: [number, number] }> = ({ x, y, s = 1, t, face = "neutral", look = 0, arm }) => {
  const b = Math.sin(t * 1.7 + 4) * 4, T: Tones = ["#33245e", "#5a4496", "#8f7bd8", "#c8baff"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Contact x={0} y={4} w={130} />
      <Hose d="M-38 -34Q-46 -8 -58 0" tones={T} w={28} /><Hose d="M38 -34Q46 -8 62 0" tones={T} w={28} />
      <g transform={`translate(0 ${b})`}>
        <Shade d="M0 -356C86 -356 112 -270 118 -180C128 -70 78 -20 0 -20C-78 -20 -128 -70 -118 -180C-112 -270 -86 -356 0 -356Z" tones={T} L={LR} s={[8, 24, 13]} />
        <ellipse cx={-78} cy={-190} rx={8} ry={6} fill="#c8baff" opacity={0.55} /><ellipse cx={-90} cy={-160} rx={4} ry={3} fill="#c8baff" opacity={0.55} /><ellipse cx={82} cy={-100} rx={7} ry={5} fill="#c8baff" opacity={0.55} /><path d="M-84 -270Q-70 -326 -30 -344" stroke="#e8e0ff" strokeWidth={8} strokeLinecap="round" fill="none" /><path d="M110 -150Q104 -60 44 -32" stroke="#ffb36b" strokeWidth={6} strokeLinecap="round" strokeDasharray="30 15" fill="none" />
        <Eyes x={8 + look} y={-248} gap={30} t={t} face={face} />
        <Shade d="M-90 -304Q-82 -390 4 -388Q86 -386 88 -308Q0 -330 -90 -304Z" tones={GREEN} L={LR} s={[4, 12, 7]} /><path d="M40 -322Q120 -330 150 -300Q100 -290 44 -304Z" fill={GREEN[1]} />
        <Hose d={arm ? `M100 -150Q${(100 + arm[0]) / 2} ${(-150 + arm[1]) / 2 + 80} ${arm[0]} ${arm[1]}` : "M104 -150Q156 -110 142 -64"} tones={T} /><Hose d="M-104 -150Q-156 -116 -140 -66" tones={T} />
      </g>
    </g>
  );
};
/** hand = ujung tangan relatif bank; tangan keluar dari sisi yang sama dengan arahnya (tidak melintasi wajah) */
export const MyBank: React.FC<{ x: number; y: number; s?: number; t: number; mood?: string; hand?: [number, number]; lit?: number }> = ({ mood = "happy", hand, ...p }) => {
  const s = p.s ?? 1, side = hand && hand[0] > 0 ? 1 : -1;
  return (<g><BankChar {...p} mood={mood} />{hand && <g transform={`translate(${p.x} ${p.y}) scale(${s})`}><Hose d={`M${side * 165} -90Q${(hand[0] + side * 165) / 2} ${Math.max(-90, hand[1]) + 70} ${hand[0]} ${hand[1]}`} tones={CREAM} w={30} /><circle cx={hand[0]} cy={hand[1]} r={22} fill={CREAM[2]} /></g>}</g>);
};
/** bank toko: bank biru dengan papan toko kecil */
export const ShopBank: React.FC<{ x: number; y: number; s?: number; t: number; mood?: string }> = ({ x, y, s = 1, t, mood = "calm" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={14} y={8} w={215} o={0.5} />
    <path d="M168 -236L226 -256V-26L168 0Z" fill={SKYB[1]} /><path d="M196 -246L226 -256V-26L196 -14Z" fill={SKYB[0]} />
    <path d="M200 -298L244 -312V-248L200 -230Z" fill={BLUE[0]} />
    <path d="M182 -170L214 -182V-112L182 -100Z" fill="#26356e" /><path d="M188 -112L208 -168" stroke="#bfe8ff" strokeWidth={5} opacity={0.7} />
    <Shade d={rr(-170, -240, 340, 240, 8)} tones={SKYB} L={LL} s={[6, 24, 10]} />
    {[0, 1, 2, 3, 4, 5].map((r) => <path key={r} d={`M-166 ${-60 + (r % 3) * 20}h${r < 3 ? 60 : 0}M${r < 3 ? 100 : -150} ${-200 + (r % 3) * 20}h46`} stroke={SKYB[1]} strokeWidth={4} opacity={0.6} />)}
    <Shade d={rr(-200, -300, 400, 76, 34)} tones={BLUE} L={LL} s={[5, 16, 9]} />
    {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${-190 + i * 55} -226q27 42 54 0Z`} fill={i % 2 ? "#fff4da" : BLUE[2]} />)}
    <ShoeBox x={0} y={-292} s={0.7} c={CORAL} />
    {[-120, 120].map((a) => <g key={a}><path d={rr(a - 34, -166, 68, 82, 22)} fill="#fff4da" /><path d={rr(a - 28, -160, 56, 70, 18)} fill="#ffd27a" /><path d={`M${a - 18} -104L${a + 14} -150M${a - 2} -98L${a + 20} -128`} stroke="#fffbe8" strokeWidth={5} strokeLinecap="round" /><path d={`M${a} -158V-92M${a - 26} -126H${a + 26}`} stroke="#c98a4a" strokeWidth={4} /></g>)}
    <path d={rr(-46, -96, 92, 96, 36, 4)} fill={P.navy} /><BFace x={0} y={-150} s={0.82} mood={mood} t={t} />
    <Shade d={rr(-196, -16, 392, 28, 8)} tones={CREAM} L={LL} s={[3, 8, 5]} />
  </g>
);
export const Net: React.FC<{ x: number; y: number; s?: number; t: number; mood?: string; beam?: number; sweep?: number }> = (p) => <NetTower {...p} />;
export const Sticker2: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><Shade d={rr(-80, -60, 160, 120, 22)} tones={CREAM} L={LR} s={[3, 9, 6]} /><Card x={0} y={0} s={0.42} t={0} /></g>
);
export const QrStand: React.FC<{ x: number; y: number; s?: number; glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><Contact x={0} y={4} w={150} />{glow > 0 && <Glow2 x={0} y={-200} r={330} c={P.coin} o={0.55 * glow} />}<Shade d={rr(-130, -360, 260, 340, 24)} tones={CREAM} L={LR} s={[4, 12, 7]} /><QrGrid x={-96} y={-320} size={192} /><Txt x={0} y={-60} s={46} c={P.navy}>QRIS</Txt><Shade d={rr(-150, -22, 300, 24, 10)} tones={STEEL} L={LR} s={[2, 6, 4]} /></g>
);
/** warung kecil; (x,y) = dasar */
export const Stall: React.FC<{ x: number; y: number; s?: number; c?: Tones; wide?: boolean; children?: React.ReactNode }> = ({ x, y, s = 1, c = CORAL, wide, children }) => {
  const w = wide ? 290 : 200;
  return (<g transform={`translate(${x} ${y}) scale(${s})`}><Contact x={0} y={4} w={w * 1.2} /><Shade d={rr(-w, -290, w * 2, 290, 12)} tones={CREAM} L={LR} s={[7, 22, 11]} /><path d={rr(-w + 36, -236, w * 2 - 72, 130, 14)} fill="#6a3340" /><Shade d={`M${-w - 36} -290L${-w + 14} -372H${w - 14}L${w + 36} -290Z`} tones={c} L={LR} s={[5, 16, 9]} />{Array.from({ length: Math.floor(w / 28) }, (_, i) => <path key={i} d={`M${-w - 30 + i * 62} -292q31 46 62 0Z`} fill={i % 2 ? "#fff4da" : c[2]} />)}<Shade d={rr(-w - 12, -112, w * 2 + 24, 34, 12)} tones={WOOD} L={LR} s={[3, 10, 6]} />{children}</g>);
};
export const Hand: React.FC<{ from: [number, number]; to: [number, number]; tones?: Tones; w?: number }> = ({ from, to, tones = CORAL, w = 40 }) => (
  <g><Hose d={`M${from[0]} ${from[1]}Q${(from[0] + to[0]) / 2} ${Math.max(from[1], to[1]) + 60} ${to[0]} ${to[1]}`} tones={tones} w={w} /><circle cx={to[0]} cy={to[1]} r={w * 0.72} fill={tones[2]} /></g>
);
export const Star: React.FC<{ x: number; y: number; r: number; c?: string; rot?: number }> = ({ x, y, r, c = P.coin, rot = 0 }) => <path transform={`translate(${x} ${y}) rotate(${rot}) scale(${r / 28})`} d="M0 -28L8 -9L28 -8L12 6L17 26L0 15L-17 26L-12 6L-28 -8L-8 -9Z" fill={c} />;
export const Plane: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><path d="M-60 -6L70 -40L10 44L-4 12Z" fill="#fff" /><path d="M-4 12L70 -40L-60 -6Z" fill="#cfe4ff" /></g>;
/** busur terbang dari a ke b dengan puncak h */
export const arc = (a: [number, number], b: [number, number], p: number, h = 200): [number, number] => [mix(a[0], b[0], p), mix(a[1], b[1], p) - Math.sin(clamp(p) * Math.PI) * h];
export const _u = { pop, Coin, Stack, SILVER, ell, Sky };
export type { ShotCtx };
