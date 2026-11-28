// T01-002: gambar ulang s15, s24, s32, s44, s46 setelah gate still (material, kedalaman, polesan).
import React from "react";
import { Easing } from "remotion";
import { R, mix, seg } from "@r3";
import { Block, Office, Shade, Tones, Tree, WaterTower, rr } from "@r3/art";
import { BLUE, COPPER, CORAL, CREAM, Contact, DARK, GOLD, GREEN, Glow2, LR, P, QrGrid, STEEL, TEALB, WOOD, circ, line } from "./kit";
import { Txt, PURPLE } from "./benda";
import { Boat, Birds } from "./dekor";
import { Card, Cart, Highway, MyBank, Scene, Shoe, ShopBank, Sock, Stall, Terminal, TollGate, back, go, useW } from "./dunia";
import { Pop } from "./s1";

/** koin timbul 3 nada; ringan untuk dipakai ratusan kali */
const Disc: React.FC<{ x: number; y: number; r: number; hot?: boolean }> = ({ x, y, r, hot }) => (
  <g transform={`translate(${x} ${y})`}><ellipse cx={3} cy={5} rx={r} ry={r} fill="#1a0c34" opacity={0.5} /><circle r={r} fill={hot ? CORAL[1] : GOLD[1]} /><circle cx={r * 0.08} cy={-r * 0.1} r={r * 0.86} fill={hot ? CORAL[2] : GOLD[2]} /><circle r={r * 0.52} fill="none" stroke={hot ? CORAL[1] : GOLD[1]} strokeWidth={r * 0.14} /><path d={`M${-r * 0.62} ${-r * 0.18}A${r * 0.65} ${r * 0.65} 0 0 1 ${r * 0.1} ${-r * 0.64}`} stroke={hot ? "#ffc0a0" : "#fffbd0"} strokeWidth={r * 0.2} fill="none" strokeLinecap="round" /></g>
);
const Grain: React.FC<{ x: number; y: number; w: number; h: number; n: number; c: string; seed: number }> = ({ x, y, w, h, n, c, seed }) => <g>{Array.from({ length: n }, (_, i) => <circle key={i} cx={x + R(seed + i, 2) * w} cy={y + R(seed + i, 3) * h} r={1.5 + R(seed + i, 4) * 2.5} fill={c} opacity={0.35} />)}</g>;

/* ============================== s15: gulungan tarif ============================== */
const MiniShop: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => {
  const c = [CORAL, TEALB, GREEN, GOLD, BLUE, PURPLE][k % 6];
  return (<g transform={`translate(${x} ${y})`}><Shade d={rr(-30, -26, 60, 36, 6)} tones={CREAM} L={LR} s={[2, 6, 4]} /><path d={rr(-9, -10, 18, 20, 7, 2)} fill="#6a3340" /><Shade d={k % 3 === 0 ? "M-40 -22L0 -48L40 -22Z" : k % 3 === 1 ? "M-38 -22Q0 -58 38 -22Z" : "M-40 -22L-30 -42H30L40 -22Z"} tones={c} L={LR} s={[2, 7, 4]} /></g>);
};
export const TableShot2: React.FC = () => {
  const { t, at } = useW();
  const c = [at("card", 0.6), at("shop", 1.8), at("tapped", 3)];
  const h = [0, 1, 2].map((i) => back(t, c[i] - 0.35, 0.5));
  const X = [480, 960, 1440];
  return (
    <Scene redup kind="toko" to={{ z: 1.05 }}>
      {/* meja */}
      <Shade d={rr(40, 820, 1840, 420, 30)} tones={WOOD} L={LR} s={[8, 30, 14]} />{[860, 930, 1000].map((y, i) => <path key={y} d={`M80 ${y}Q${700 + i * 200} ${y + 16} 1840 ${y - 6}`} stroke={WOOD[1]} strokeWidth={6} fill="none" opacity={0.7} />)}
      <path d={rr(190, 235, 1560, 640, 22)} fill="#1a0c34" opacity={0.35} />
      <Shade d="M180 205Q960 185 1740 205Q1716 520 1752 842Q960 868 168 842Q204 520 180 205Z" tones={CREAM} L={LR} s={[10, 30, 14]}>
        <Grain x={200} y={230} w={1500} h={580} n={240} c="#b08460" seed={11} />
        <path d="M168 205H260Q300 520 250 860H168Z" fill="#c9a98c" opacity={0.45} /><path d="M1660 205H1752V860H1672Q1620 520 1660 205Z" fill="#c9a98c" opacity={0.45} />
        {[720, 1200].map((x) => <path key={x} d={`M${x} 230V830`} stroke="#c9a98c" strokeWidth={5} strokeDasharray="2 20" strokeLinecap="round" />)}
      </Shade>
      {/* baris tarif: kartu, toko, cara bayar, dan harga yang berbeda */}
      {Array.from({ length: 5 }, (_, r) => { const y = 458 + r * 72, p = go(t, 0.1 + r * 0.08, 0.5); return (
        <g key={r} opacity={p}>
          <path d={rr(236, y - 34, 1448, 70, 24)} fill={r % 2 ? "#ead3ad" : "#fff0d0"} /><path d={rr(250, y - 28, 1420, 5, 2)} fill="#fffdf4" />
          <g opacity={0.45 + 0.55 * h[0]}><Card x={430} y={y} s={0.34} premium={r % 2 === 1} t={t} /><path d={rr(505, y - 8, 90 + R(r, 3) * 70, 16, 8)} fill={BLUE[2]} /></g>
          <g opacity={0.45 + 0.55 * h[1]}><MiniShop x={900} y={y + 12} k={r} /><path d={rr(966, y - 8, 80 + R(r, 4) * 80, 16, 8)} fill={CORAL[2]} /></g>
          <g opacity={0.45 + 0.55 * h[2]}>{r % 2 ? <g>{[0, 1, 2].map((a) => [0, 1].map((b) => <path key={`${a}${b}`} d={rr(1360 + a * 28, y - 24 + b * 26, 21, 19, 6)} fill={STEEL[2]} />))}</g> : <g><circle cx={1392} cy={y} r={27} fill={TEALB[2]} />{[0, 1, 2].map((a) => <path key={a} d={`M${1380 + a * 10} ${y - 7 - a * 3}q13 ${7 + a * 3} 0 ${14 + a * 6}`} stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />)}</g>}
            {Array.from({ length: 1 + ((r * 2) % 4) }, (_, k) => <Disc key={k} x={1470 + k * 40} y={y} r={17} />)}</g>
        </g>); })}
      {[[190, -1], [862, 1]].map(([y, d]) => <g key={y}><path d={rr(130, y - 18, 1670, 56, 28)} fill="#1a0c34" opacity={0.3} /><Shade d={rr(130, y - 34, 1660, 64, 32)} tones={WOOD} L={LR} s={[5, 18, 11]}>{[300, 700, 1180, 1500].map((x) => <path key={x} d={`M${x} ${y - 18 + d * 4}h150`} stroke={WOOD[3]} strokeWidth={6} strokeLinecap="round" opacity={0.7} />)}</Shade>{[118, 1802].map((x) => <g key={x}><Shade d={circ(x, y - 2, 46)} tones={GOLD} L={LR} s={[4, 13, 8]} /><circle cx={x + 10} cy={y - 14} r={9} fill="#fff" opacity={0.85} /></g>)}</g>)}
      <Pop x={480} y={320} p={h[0]}><Glow2 x={480} y={320} r={140} c="#9fc4ff" o={0.5} /><Card x={480} y={322} s={0.82} rot={-6} t={t} /></Pop>
      <Pop x={960} y={320} p={h[1]}><g transform="translate(960 362) scale(1.9)"><MiniShop x={0} y={0} k={0} /></g></Pop>
      <Pop x={1440} y={320} p={h[2]}><g transform="translate(1440 400) scale(0.55)"><Terminal x={0} y={0} t={t} on={1} /></g></Pop>
    </Scene>
  );
};

/* ============================== s24: negeri penuh jalan tol ============================== */
/** jalan perspektif: makin jauh makin tipis dan memudar ke langit */
const LAN = [
  { y: 452, s: 0.3, bend: -50, col: "#3c3c78", glow: 0.35 },
  { y: 540, s: 0.46, bend: 60, col: "#4a3a7a", glow: 0.5 },
  { y: 660, s: 0.72, bend: -80, col: "#6a4468", glow: 0.7 },
  { y: 830, s: 1.12, bend: 70, col: "#8a5a52", glow: 1 },
];
const qy = (l: (typeof LAN)[number], u: number) => (1 - u) * (1 - u) * l.y + 2 * u * (1 - u) * (l.y + l.bend) + u * u * (l.y - l.bend * 0.3);
export const NationShot2: React.FC = () => {
  const { t, at } = useW();
  const lit = go(t, 0.1, Math.max(1.5, at("ten", 3)));
  return (
    <Scene kind="malam" from={{ z: 1.35, y: 620 }} to={{ z: 1.0 }}>
      {LAN.map((l, k) => { const d = `M-300 ${l.y}Q960 ${l.y + l.bend} 2220 ${l.y - l.bend * 0.3}`, dir = k % 2 ? 1 : -1, n = [13, 10, 7, 5][k];
        return (<g key={k}>
          {/* bukit di belakang jalan ini, dengan kota dan pohon */}
          <path d={`M-400 ${l.y - 6}Q${200 + k * 260} ${l.y - 120 * l.s - 30} ${900 + k * 120} ${l.y - 14}Q${1500 - k * 100} ${l.y - 100 * l.s - 20} 2320 ${l.y - 30}V1300H-400Z`} fill={["#262a60", "#222a58", "#1d2c52", "#172447"][k]} />
          {Array.from({ length: 9 - k }, (_, i) => { const x = -100 + R(k * 31 + i, 5) * 2100, y = qy(l, (x + 300) / 2520) - 40 * l.s, w = 46 * l.s + 10, hh = (50 + R(i, k + 6) * 80) * l.s; return <g key={i}><path d={rr(x, y - hh, w, hh, 7 * l.s, 2)} fill={["#363a78", "#32407a", "#2c4676", "#27506e"][k]} /><path d={rr(x + w * 0.62, y - hh, w * 0.38, hh, 3, 2)} fill="#141c46" opacity={0.6} />{[0, 1].map((j) => <rect key={j} x={x + w * 0.18} y={y - hh + 10 * l.s + j * 22 * l.s} width={w * 0.22} height={9 * l.s + 2} rx={2} fill="#ffd27a" opacity={R(k + i * 3 + j, 9) > 0.35 ? 0.9 : 0.15} />)}</g>; })}
          <path d={d} stroke="#ffb03a" strokeWidth={86 * l.s} opacity={0.18 * lit * l.glow} fill="none" />
          <path d={d} stroke="#160c30" strokeWidth={50 * l.s} fill="none" transform={`translate(0 ${9 * l.s})`} />
          <path d={d} stroke={l.col} strokeWidth={46 * l.s} fill="none" />
          <path d={d} stroke="#ffe0a0" strokeWidth={5 * l.s} fill="none" opacity={0.35 + 0.65 * lit} transform={`translate(0 ${-20 * l.s})`} />
          <path d={d} stroke="#fff6d8" strokeWidth={4 * l.s} strokeDasharray={`${30 * l.s} ${46 * l.s}`} strokeDashoffset={-t * 60 * l.s * dir} fill="none" />
          {Array.from({ length: n }, (_, i) => { const u = ((i + R(k * 20 + i, 3) * 0.5) / n + t * 0.028 * dir + 10) % 1; return i / n <= lit ? <Cart key={i} x={-300 + u * 2520} y={qy(l, u) + 8 * l.s} s={0.5 * l.s} t={t + i} rolling /> : null; })}
        </g>); })}
      <MyBank x={230} y={900} s={0.55} t={t} /><ShopBank x={1690} y={875} s={0.55} t={t} />
    </Scene>
  );
};

/* ============================== s32: dua papan seratus koin ============================== */
const Board: React.FC<{ x: number; p: number; taken: number; t: number }> = ({ x, p, taken, t }) => {
  const g = 47, x0 = x - g * 4.5, y0 = 400;
  return (<g>
    <Contact x={x} y={884} w={330} o={0.5} />
    {[-220, 220].map((d) => <Shade key={d} d={rr(x + d - 26, 850, 52, 60, 12)} tones={WOOD} L={LR} s={[3, 9, 6]} />)}
    <Shade d={rr(x - 292, 350, 584, 524, 40)} tones={WOOD} L={LR} s={[9, 28, 14]}><Grain x={x - 290} y={350} w={580} h={520} n={70} c="#d98a56" seed={x} />{[372, 856].map((y) => <path key={y} d={`M${x - 250} ${y}Q${x} ${y + 8} ${x + 250} ${y - 3}`} stroke={WOOD[3]} strokeWidth={5} fill="none" opacity={0.6} />)}</Shade>
    <path d={rr(x - 252, 376, 504, 468, 26)} fill="#241040" /><path d={rr(x - 252, 376, 504, 20, 10)} fill="#12062c" />
    {Array.from({ length: 100 }, (_, i) => { const col = i % 10, row = Math.floor(i / 10), cx = x0 + col * g, cy = y0 + row * 46, hot = row === 0 && col >= 10 - taken, lift = hot ? 12 + Math.sin(t * 5 + col) * 5 : 0; return <g key={i}><ellipse cx={cx} cy={cy + 3} rx={20} ry={19} fill="#3a1c60" />{i >= (1 - p) * 100 && <Disc x={cx} y={cy - lift} r={hot ? 21 : 19} hot={hot} />}</g>; })}
    {[[x - 272, 366], [x + 272, 366], [x - 272, 858], [x + 272, 858]].map(([a, b], i) => <g key={i}><circle cx={a} cy={b} r={10} fill={GOLD[2]} /><circle cx={a + 3} cy={b - 3} r={3} fill="#fff" /></g>)}
  </g>);
};
export const TwoGridsShot2: React.FC = () => {
  const { t, at } = useW();
  const f = at("four", 3), a = go(t, 0.15, 1.0), b = go(t, f - 1.0, 1.0);
  const Stand: React.FC<{ x: number; children: React.ReactNode }> = ({ x, children }) => <g><Shade d={rr(x - 130, 318, 260, 34, 16)} tones={COPPER} L={LR} s={[3, 9, 6]} />{children}</g>;
  return (
    <Scene redup kind="toko" to={{ z: 1.04 }}>
      <Glow2 x={540} y={460} r={430} c="#ffd98a" o={0.35} /><Glow2 x={1380} y={460} r={430} c="#ffd98a" o={0.35} />
      <Board x={540} p={a} taken={a > 0.95 ? 3 : 0} t={t} /><Board x={1380} p={a} taken={Math.round(b * 4)} t={t} />
      <Stand x={540}><Shoe x={540} y={320} s={0.72} /></Stand><Stand x={1380}><Sock x={1365} y={322} s={0.52} /></Stand>
    </Scene>
  );
};

/* ============================== s44: lembar sejuta dan irisan 0,7% ============================== */
/** gambar lembar uang rekaan (tanpa meniru rupiah asli) */
const Note: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <Shade d={rr(-520, -250, 1040, 500, 30)} tones={CORAL} L={LR} s={[9, 28, 14]}>
      <path d="M-540 120Q-200 20 80 140T540 60V270H-540Z" fill={CORAL[1]} opacity={0.55} />
      {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M-530 ${-190 + i * 40}Q-260 ${-230 + i * 40} 0 ${-190 + i * 40}T530 ${-190 + i * 40}`} stroke="#ffb088" strokeWidth={3} fill="none" opacity={0.45} />)}
      <Grain x={-510} y={-240} w={1020} h={480} n={150} c="#ffd0b0" seed={71} />
      <path d={`M${-620 + ((t * 150) % 1300)} -270l60 0l-150 540l-60 0Z`} fill="#fff" opacity={0.12} />
    </Shade>
    <path d={rr(-486, -218, 972, 436, 22)} fill="none" stroke="#ffd0b0" strokeWidth={9} /><path d={rr(-466, -198, 932, 396, 16)} fill="none" stroke="#ffd0b0" strokeWidth={3} strokeDasharray="14 10" />
    <g transform="translate(-290 10)">{[128, 104, 80].map((r, i) => <circle key={r} r={r} fill={i === 2 ? "#ffd8bc" : "none"} stroke="#ffd0b0" strokeWidth={5} />)}{Array.from({ length: 16 }, (_, i) => <ellipse key={i} cx={0} cy={-56} rx={14} ry={42} fill="none" stroke={CORAL[2]} strokeWidth={4} transform={`rotate(${i * 22.5})`} />)}<circle r={26} fill={CORAL[2]} /></g>
    <path d={rr(318, -218, 18, 436, 8)} fill={GOLD[2]} /><path d={rr(323, -214, 5, 428, 2)} fill="#fffbd0" />
    <Txt x={60} y={36} s={96} stroke={CORAL[0]}>Rp1,000,000</Txt>
    {[[-420, -150], [415, 170]].map(([x, y]) => <g key={x}><path d={rr(x - 46, y - 32, 92, 56, 18)} fill="#ffd8bc" /><Txt x={x} y={y + 10} s={42} c={CORAL[0]}>1M</Txt></g>)}
  </g>
);
export const MillionSliceShot2: React.FC = () => {
  const { t, at } = useW();
  const p = back(t, at("seven", 2.4) - 0.9, 0.8), cut = 1370, gap = p * 120;
  const Half: React.FC<{ id: string; x: number; w: number }> = ({ id, x, w }) => <g><clipPath id={id}><rect x={x} y={150} width={w} height={720} /></clipPath><g clipPath={`url(#${id})`}><g transform="translate(900 500)"><Note t={t} /></g></g></g>;
  return (
    <Scene redup kind="pulau" from={{ z: 1.02 }} to={{ z: 1.08 }}>
      <Shade d={rr(60, 800, 1800, 440, 30)} tones={WOOD} L={LR} s={[8, 30, 14]} />{[850, 930, 1010].map((y, i) => <path key={y} d={`M100 ${y}Q${600 + i * 300} ${y + 18} 1820 ${y - 6}`} stroke={WOOD[1]} strokeWidth={6} fill="none" opacity={0.7} />)}
      <ellipse cx={900} cy={810} rx={560} ry={34} fill="#1a0c34" opacity={0.4} />
      <Half id="d2n1" x={0} w={cut} />
      <path d={`M${cut - 3} 262V740`} stroke="#fff6d8" strokeWidth={7} strokeLinecap="round" />
      <ellipse cx={cut + 30 + gap} cy={812} rx={70} ry={18} fill="#1a0c34" opacity={0.35 * p} />
      <g transform={`translate(${gap} ${-p * 36}) rotate(${p * 7} ${cut + 25} 500)`}>{p > 0.2 && <Glow2 x={cut + 25} y={500} r={230} c={P.coin} o={0.75 * Math.min(1, p)} />}<Half id="d2n2" x={cut} w={120} /><path d={`M${cut + 2} 262V740`} stroke="#fff6d8" strokeWidth={7} strokeLinecap="round" /></g>
      {/* gunting di garis potong */}
      <g transform={`translate(${cut} ${mix(160, 800, seg(t, 0.2, Math.max(1.2, at("seven", 2.4) - 0.8), Easing.inOut(Easing.sin)))})`} opacity={1 - Math.min(1, p)}>{[-1, 1].map((s) => { const o = s * (12 + Math.abs(Math.sin(t * 9)) * 14); return <g key={s} transform={`rotate(${o})`}><path d="M-8 -10L0 70L8 -10Z" fill={STEEL[3]} />{line(`M0 -6L${s * 26} -52`, STEEL[2], 14)}<circle cx={s * 34} cy={-68} r={24} fill="none" stroke={DARK[2]} strokeWidth={13} /></g>; })}<circle r={8} fill={GOLD[2]} /></g>
      {Array.from({ length: Math.round(Math.min(1, p) * 4) }, (_, i) => <Disc key={i} x={1640 + (i % 2) * 70} y={778 - Math.floor(i / 2) * 22} r={42} />)}
    </Scene>
  );
};

/* ============================== s46: dua negeri, dua jalan ============================== */
const Palm2: React.FC<{ x: number; y: number; s: number; t: number; i: number }> = ({ x, y, s, t, i }) => {
  const top = (i % 2 ? 40 : -40) + Math.sin(t + i) * 7;
  return (<g transform={`translate(${x} ${y}) scale(${s})`}><Contact x={0} y={0} w={70} />{line(`M0 0Q${top * 1.4} -130 ${top} -260`, "#6a3340", 28)}{line(`M-5 -6Q${top * 1.4 - 8} -130 ${top - 6} -256`, "#98523e", 12)}{[-220, -190, -60, -120].map((y2) => line(`M${top * 0.5 - 10} ${y2 * 0.7}h22`, "#3c1d3e", 5))}<g transform={`translate(${top} -262)`}>{[-165, -125, -85, -40, 0, 38, 190, 232].map((r, k) => <g key={r} transform={`rotate(${r + Math.sin(t * 1.4 + k) * 3})`}><path d="M0 0Q66 -46 156 10Q74 -8 0 10Z" fill={k % 2 ? "#175a48" : "#23765a"} /><path d="M12 -4Q70 -32 136 4" stroke="#66c795" strokeWidth={4} fill="none" strokeLinecap="round" /></g>)}<circle cx={-10} cy={16} r={16} fill="#98523e" /><circle cx={18} cy={20} r={15} fill="#6a3340" /></g></g>);
};
export const TwoRoadsShot2: React.FC = () => {
  const { t } = useW();
  return (
    <Scene kind="pagi" to={{ z: 1.04 }}>
      {/* kiri: kota senja */}
      <defs><linearGradient id="d2kiri" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c1860" /><stop offset="0.6" stopColor="#8a3a82" /><stop offset="1" stopColor="#f5935e" /></linearGradient></defs>
      <path d="M-500 -400H990Q930 120 976 420T950 1300H-500Z" fill="url(#d2kiri)" />
      <Office x={30} base={720} w={190} h={330} seed={4} t={t} /><Block x={250} base={716} w={150} h={240} seed={9} t={t} top="step" /><Office x={560} base={716} w={150} h={390} seed={12} t={t} /><Block x={740} base={720} w={160} h={210} seed={2} t={t} top="dome" />
      <WaterTower x={480} base={712} s={0.85} t={t} />
      <path d="M-500 690Q200 650 620 690T952 690V1300H-500Z" fill="#45286a" />
      {[130, 640, 860].map((x, i) => <Tree key={x} x={x} base={738} s={0.75} seed={i + 5} t={t} tones={["#1c1438", "#2c2054", "#46327a", "#e89a6a"]} />)}
      {/* kanan: pulau */}
      <path d="M990 640Q1280 590 1560 630T2400 620V1300H955Q990 900 990 640Z" fill="#1d7ca8" />
      {Array.from({ length: 22 }, (_, i) => <path key={i} d={rr(1030 + R(i, 3) * 850 + Math.sin(t + i) * 16, i < 14 ? 622 + R(i, 4) * 40 : 905 + R(i, 4) * 100, 70, 7, 3)} fill="#bff0f8" opacity={0.6} />)}
      <path d="M1380 640L1590 392Q1612 372 1636 392L1850 640Z" fill="#4a8cb0" /><path d="M1612 380Q1624 372 1636 392L1850 640H1700Z" fill="#2f6a94" /><path d="M1546 444L1590 392Q1612 372 1636 392L1682 446L1646 432L1618 464L1586 430Z" fill="#e8f6ff" />
      <path d="M1060 716Q1230 610 1500 652Q1790 596 1990 716V740H1060Z" fill="#2f8a6a" /><path d="M1100 700Q1260 636 1420 660" stroke="#66c795" strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M1050 718Q1480 690 1990 722" stroke="#e8fbff" strokeWidth={13} fill="none" strokeLinecap="round" opacity={0.85} />
      <Stall x={1640} y={712} s={0.5} c={CORAL} wide><g transform="translate(130 -92) scale(1)"><path d={rr(-50, -100, 100, 100, 14)} fill="#fff4da" /><QrGrid x={-36} y={-86} size={72} /></g></Stall>
      <Palm2 x={1170} y={720} s={0.95} t={t} i={0} /><Palm2 x={1850} y={724} s={0.8} t={t} i={1} /><Palm2 x={1400} y={690} s={0.55} t={t} i={2} />
      <Boat x={1150 + Math.sin(t * 0.4) * 30} y={950} s={0.8} t={t} /><Birds x={1250 + t * 10} y={300} t={t} c="#2a5a78" n={4} />
      <Highway y={830} t={t} x0={-500} x1={900} /><Highway y={830} t={t} x0={1030} x1={2400} />
      {/* jahitan peta */}
      <path d="M990 -200Q930 120 976 420T950 1300" stroke="#fff4da" strokeWidth={22} fill="none" /><path d="M990 -200Q930 120 976 420T950 1300" stroke="#c9a98c" strokeWidth={6} strokeDasharray="26 22" fill="none" />
      <TollGate x={420} y={790} s={1.2} t={t} mood="neutral" /><TollGate x={1360} y={790} s={1.2} t={t} open={1} mood="happy" />
      <Cart x={170 + Math.sin(t) * 20} y={880} s={0.65} t={t} rolling /><Cart x={1660 + t * 36} y={880} s={0.65} t={t} rolling />
    </Scene>
  );
};
export const _u = { GREEN, TEALB };
