// T01-002 s13-s24: gerbang bank (interchange), tabel harga, timbangan, hadiah, gerbang jaringan.
import React from "react";
import { Easing } from "remotion";
import { R, clamp, mix, pop, seg } from "@r3";
import { Shade, Tones, rr } from "@r3/art";
import { BLUE, COPPER, CORAL, CREAM, Contact, DARK, GOLD, GREEN, Glow2, LR, P, STEEL, TEALB, WOOD, You, Owner, circ, line, Tick } from "./kit";
import { NetTower, PURPLE, Stack, Txt } from "./benda";
import { Card, Cart, Gold, Highway, Lines, MyBank, Paper, Plane, Scene, ServerGuy, Shoe, Star, Terminal, TollGate, arc, back, go, useW } from "./dunia";
import { MapBase, Pop } from "./s1";

/* s13 */
export const YardShot: React.FC = () => {
  const { t, at } = useW();
  const tf = at("first", 0.6), stick = go(t, tf - 0.3, 1.0);
  return (
    <Scene kind="jalan" from={{ z: 1.2, x: 780 }} to={{ z: 1.12, x: 860 }}>
      <Highway y={850} t={t} speed={0} />
      <MyBank x={470} y={790} s={1.45} t={t} />
      <Cart x={1180} y={850} s={1.1} t={t} />
      {[0, 1, 2].map((i) => { const [x, y] = arc([1120 + i * 40, 650], [330 + i * 140, 520 + (i % 2) * 60], clamp(stick * 1.3 - i * 0.12), 190); return <Gold key={i} x={x} y={y} r={36} />; })}
    </Scene>
  );
};
export const DepartShot: React.FC = () => {
  const { t, at } = useW();
  const ts = at("ninety-seven", 1.6), roll = go(t, 0.2, 3.2);
  return (
    <Scene kind="jalan" from={{ z: 1.05 }} to={{ z: 1.1, x: 1050 }}>
      <Highway y={850} t={t} speed={120} />
      <MyBank x={mix(360, 120, roll)} y={780} s={0.9} t={t} />
      <Cart x={mix(700, 1230, roll)} y={845} s={1.55} t={t} grid taken={Math.round(go(t, ts - 0.4, 0.8) * 2)} rolling={roll < 1} />
    </Scene>
  );
};
export const IntoVaultShot: React.FC = () => {
  const { t, at } = useW();
  const tt = at("twenty", 0.8);
  return (
    <Scene kind="brankas" from={{ z: 1.05 }} to={{ z: 1.18, y: 520 }}>
      <Vault x={1150} y={470} s={1.35} t={t} open={go(t, 0.1, 0.8)} />
      {[0, 1, 2].map((i) => { const p = seg(t, tt - 0.5 + i * 0.35, tt + 0.35 + i * 0.35, Easing.in(Easing.sin)); if (p <= 0) return null; const [x, y] = arc([330, 720], [1090 + i * 60, 540], p, 330); return <Gold key={i} x={x} y={y} r={mix(66, 40, p)} sx={p < 1 ? Math.max(0.35, Math.abs(Math.cos(t * 5 + i))) : 1} />; })}
      <MyBank x={380} y={790} s={0.85} t={t} />
    </Scene>
  );
};
export const Vault: React.FC<{ x: number; y: number; s?: number; t: number; open?: number }> = ({ x, y, s = 1, t, open = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><Glow2 x={0} y={0} r={420} c="#ffd98a" o={0.45 * open} /><Shade d={circ(0, 0, 260)} tones={STEEL} L={LR} s={[10, 30, 16]} /><circle r={200} fill="#101a38" />{open > 0.3 && [0, 1, 2].map((i) => <Stack key={i} x={-110 + i * 110} y={150} n={5 + i * 2} w={44} />)}<g transform={`translate(${-230 - open * 150} 0) scale(${1 - open * 0.7} 1)`}><Shade d={circ(0, 0, 210)} tones={STEEL} L={LR} s={[8, 26, 14]} /><g transform={`rotate(${open * 220 + t * 6})`}>{line("M-110 0H110M0 -110V110", GOLD[2], 30)}</g><circle r={36} fill={GOLD[2]} /></g></g>
);
/* s14 */
export const InterchangeShot: React.FC = () => {
  const { t, at } = useW();
  const ti = at("interchange", 1.2), p = go(t, ti - 0.9, 1.4);
  const [cx, cy] = arc([1420, 560], [600, 430], p, 260);
  return (
    <Scene kind="jalan" to={{ z: 1.08 }}>
      <Highway y={850} t={t} speed={15} />
      <MyBank x={440} y={790} s={1.2} t={t} hand={[270, -260]} />
      <ShopSide x={1520} t={t} />
      <path d="M1360 380C1100 150 850 150 660 360" pathLength={100} strokeDasharray={`${p * 100} 100`} stroke="#fff6d8" strokeWidth={18} fill="none" strokeLinecap="round" />
      {p > 0.95 && line("M652 300L660 362L722 352", "#fff6d8", 18)}
      <Stack x={cx + 130} y={cy + 140} n={4} w={64} />
    </Scene>
  );
};
const ShopSide: React.FC<{ x: number; t: number }> = ({ x, t }) => <g><Owner x={x} y={820} s={1.05} t={t} look={-26} /><Shoe x={x + 240} y={820} s={0.6} /></g>;
export const ThreeStacksShot: React.FC = () => {
  const { t, at } = useW();
  const tl = at("largest", 1.5), p = back(t, tl - 0.7, 0.8);
  return (
    <Scene kind="ungu" to={{ z: 1.05 }}>
      <MyBank x={510} y={850} s={0.55} t={t} /><NetTower x={1010} y={850} s={0.4} t={t} beam={0} mood="calm" /><ServerGuy x={1460} y={850} s={0.6} t={t} />
      <Stack x={510} y={630} n={Math.round(3 + p * 17)} w={100} />
      <Stack x={1010} y={630} n={2} w={100} /><Stack x={1460} y={630} n={4} w={100} />
      {p > 0.7 && <g transform={`translate(510 ${630 - 20 * 24 - 70}) scale(${p})`}><Star x={0} y={0} r={46} rot={Math.sin(t * 2) * 12} /></g>}
    </Scene>
  );
};
/* s15 */
export const ScrollShot: React.FC = () => {
  const { t, at } = useW();
  const tp = at("public", 1), un = back(t, Math.max(0.15, tp - 0.8), 1.1);
  return (
    <Scene kind="malam" from={{ z: 1.1, y: 520 }} to={{ z: 1.0 }}>
      <Highway y={860} t={t} />
      <NetTower x={560} y={820} s={1.15} t={t} mood="calm" sweep={30 + Math.sin(t) * 20} />
      <Paper x={1150} y={220} w={560} h={Math.max(60, 620 * un)} rot={2}>{un > 0.6 && <g><Lines x={-230} y={70} w={460} n={Math.floor(un * 12)} g={44} /></g>}</Paper>
      <path d={rr(840, 190, 620, 54, 27)} fill={WOOD[2]} />
    </Scene>
  );
};
export const TableShot: React.FC = () => {
  const { t, at } = useW();
  const c = [at("card", 0.6), at("shop", 1.8), at("tapped", 3)];
  const heads = [0, 1, 2].map((i) => back(t, c[i] - 0.35, 0.5));
  const X = [480, 960, 1440];
  return (
    <Scene kind="hijau" to={{ z: 1.05 }}>
      <Paper x={960} y={170} w={1540} h={690}>
        {Array.from({ length: 6 }, (_, r) => <g key={r}><path d={rr(-710, 270 + r * 66, 1420, 50, 14)} fill={r % 2 ? "#e8d0b4" : "#f4e2c8"} />{[0, 1, 2].map((k) => <path key={k} d={rr(X[k] - 960 - 90, 286 + r * 66, 180 * (0.5 + R(r * 3 + k, 4) * 0.5), 18, 9)} fill={heads[k] > 0.5 ? ["#3b6fd8", "#e4572e", "#2f8f6b"][k] : "#b49cb4"} opacity={0.85} />)}</g>)}
      </Paper>
      <Pop x={480} y={310} p={heads[0]}><Card x={480} y={310} s={0.85} t={t} /></Pop>
      <Pop x={960} y={310} p={heads[1]}><g transform="translate(960 380) scale(0.52)"><Shade d={rr(-120, -150, 240, 150, 10)} tones={CREAM} L={LR} s={[5, 16, 9]} /><path d={rr(-40, -92, 80, 92, 28, 4)} fill="#6a3340" /><Shade d="M-150 -142L-110 -214H110L150 -142Z" tones={CORAL} L={LR} s={[4, 12, 7]} /></g></Pop>
      <Pop x={1440} y={310} p={heads[2]}><g><circle cx={1440} cy={310} r={62} fill={TEALB[2]} />{[0, 1, 2].map((i) => <path key={i} d={`M${1420 + i * 22} ${290 - i * 8}q30 ${20 + i * 8} 0 ${40 + i * 16}`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" />)}</g></Pop>
    </Scene>
  );
};
/* s16-s17 */
const Scale1: React.FC<{ x: number; y: number; t: number; tilt?: number; children?: React.ReactNode }> = ({ x, y, tilt = 0, children }) => (
  <g transform={`translate(${x} ${y})`}><Contact x={0} y={4} w={260} /><Shade d="M-90 0L-34 -170H34L90 0Z" tones={STEEL} L={LR} s={[5, 16, 9]} /><g transform={`translate(0 -190) rotate(${tilt})`}><Shade d={rr(-300, -22, 600, 44, 22)} tones={COPPER} L={LR} s={[4, 12, 7]} />{children}</g><circle cy={-190} r={34} fill={GOLD[2]} /></g>
);
export const BasicScaleShot: React.FC = () => {
  const { t, at } = useW();
  const tp = at("percent", 1.5), tc = at("ten", 2.6), a = go(t, tp - 0.6, 0.55), b = go(t, tc - 0.6, 0.55);
  return (
    <Scene kind="ungu" from={{ z: 1.05 }} to={{ z: 1.1 }}>
      <Scale1 x={960} y={850} t={t} tilt={mix(-3, 3, b)}>
        <Card x={-180} y={-104} s={1.05} t={t} />
        <g transform={`translate(110 ${mix(-620, -70, a)})`} opacity={a > 0 ? 1 : 0}><Gold x={0} y={0} r={62} text="%" /></g>
        <g transform={`translate(250 ${mix(-620, -60, b)})`} opacity={b > 0 ? 1 : 0}><Gold x={0} y={0} r={46} text="10¢" /></g>
      </Scale1>
    </Scene>
  );
};
export const ShoesTollShot: React.FC = () => {
  const { t, at } = useW();
  const ts = at("sixty-one", 1.4), p = go(t, ts - 0.9, 0.9);
  const [x, y] = arc([700, 600], [1420, 790], p, 330);
  return (
    <Scene kind="jalan" to={{ z: 1.08 }}>
      <Highway y={850} t={t} speed={0} />
      <Shoe x={340} y={820} s={1.05} />
      <Cart x={760} y={845} s={1.05} t={t} />
      <Pop x={1150} y={300} p={1}><Txt x={330} y={330} s={92} stroke={P.navy}>A</Txt></Pop>
      <Stack x={x} y={y} n={7} w={72} />
      <TollGate x={1660} y={800} s={1.0} t={t} mood="happy" />
    </Scene>
  );
};
export const PremiumScaleShot: React.FC = () => {
  const { t, at } = useW();
  const swap = back(t, at("premium", 0.8) - 0.4, 0.8), a = go(t, at("percent", 2.4) - 0.6, 0.55), b = go(t, at("ten", 3.4) - 0.6, 0.55);
  return (
    <Scene kind="ungu" from={{ z: 1.08 }} to={{ z: 1.12 }}>
      <Scale1 x={960} y={850} t={t} tilt={mix(3, -6, swap) + b * 3}>
        <Card x={mix(-180, -560, swap)} y={mix(-104, -420, swap)} s={1.05} rot={-30 * swap} t={t} />
        <Card x={mix(-900, -180, swap)} y={-108} s={1.2} premium t={t} />
        {a > 0 && <Gold x={110} y={mix(-620, -80, a)} r={74} text="%" />}
        {b > 0 && <Gold x={260} y={mix(-620, -60, b)} r={46} text="10¢" />}
      </Scale1>
    </Scene>
  );
};
export const CompareStacksShot: React.FC = () => {
  const { t, at } = useW();
  const a = go(t, at("shoes", 0.8) - 0.6, 0.7), b = go(t, at("twenty", 2.8) - 0.8, 0.9);
  return (
    <Scene kind="jalan" to={{ z: 1.05 }}>
      <Highway y={870} t={t} speed={0} />
      <Cart x={620} y={870} s={0.9} t={t} /><Cart x={1300} y={870} s={0.9} t={t} />
      <Stack x={620} y={650} n={Math.round(a * 9)} w={80} /><Stack x={1300} y={650} n={Math.round(b * 15)} w={80} />
      <Card x={290} y={560} s={0.8} rot={-10} t={t} /><Card x={1640} y={520} s={0.9} rot={10} premium t={t} />
      <Txt x={440} y={800} s={80} stroke={P.navy}>A</Txt><Txt x={1500} y={800} s={80} stroke={P.navy}>B</Txt>
    </Scene>
  );
};
export const StandardRowShot: React.FC = () => {
  const { t, at } = useW();
  const s = at("standard", 2.2), p = back(t, s - 0.7, 0.7);
  const Shop1: React.FC<{ x: number; s: number; c: Tones }> = ({ x, s: k, c }) => <g transform={`translate(${x} 820) scale(${k})`}><Contact x={0} y={4} w={260} /><Shade d={rr(-200, -280, 400, 280, 12)} tones={CREAM} L={LR} s={[6, 22, 11]} /><path d={rr(-60, -170, 120, 170, 40, 4)} fill="#6a3340" /><Shade d="M-240 -270L-190 -370H190L240 -270Z" tones={c} L={LR} s={[5, 16, 9]} /></g>;
  return (
    <Scene kind="pagi" to={{ z: 1.05 }}>
      <path d="M-200 820H2120V1300H-200Z" fill="#6a4a5a" />
      <Shop1 x={520} s={0.72} c={GREEN} /><Gold x={520} y={400} r={46} text="¢" />
      <Pop x={1300} y={700} p={0.9 + p * 0.18}><Shop1 x={1300} s={1.1} c={CORAL} /><Shoe x={1300} y={470} s={0.75} /></Pop>
      <Pop x={1620} y={420} p={p}><Stack x={1630} y={500} n={7} w={60} /></Pop>
      <Owner x={900} y={860} s={0.8} t={t} look={20} />
    </Scene>
  );
};
/* s18-s19 */
export const RubHandsShot: React.FC = () => {
  const { t } = useW();
  const r = Math.sin(t * 9) * 26;
  return (
    <Scene kind="jalan" from={{ z: 1.12, x: 880 }} to={{ z: 1.22, x: 860 }}>
      <Highway y={870} t={t} speed={0} />
      <MyBank x={720} y={800} s={1.5} t={t} mood="smug" hand={[250 + r * 0.4, -190 + r]} />
      <circle cx={720 + (250 - r * 0.4) * 1.5} cy={800 + (-170 - r) * 1.5} r={32} fill={CREAM[2]} />
      <ShopSide x={1500} t={t} />
    </Scene>
  );
};
/** dua pipa pemasukan: interest (kiri atas) dan tap fee (kanan atas) menuju brankas */
export const Pipes: React.FC<{ t: number; dry?: number; flow?: number }> = ({ t, dry = 0, flow = 0.5 }) => {
  const L = "M-100 260H430Q520 260 520 350V560", Rr = "M2020 260H1490Q1400 260 1400 350V560";
  const Pipe: React.FC<{ d: string; c: Tones }> = ({ d, c }) => <g>{line(d, c[1], 120)}<g transform="translate(6 -8)">{line(d, c[2], 84)}</g><g transform="translate(14 -26)">{line(d, c[3], 14, 0.8)}</g></g>;
  return (
    <g>
      <Pipe d={L} c={dry > 0.5 ? STEEL : BLUE} /><Pipe d={Rr} c={GREEN} />
      {Array.from({ length: 7 }, (_, i) => { const u = (t * (0.35 + flow * 0.5) + i / 7) % 1; return <g key={i}><Gold x={1400 + Math.sin(i) * 18} y={mix(620, 790, u)} r={mix(22, 36, flow)} op={flow > 0.1 ? 1 : 0} />{dry < 0.3 && <path d={`M${520 + Math.sin(i) * 18} ${mix(620, 780, u)}q18 28 0 36q-18 -8 0 -36Z`} fill="#bfe8ff" opacity={1 - dry * 3} />}</g>; })}
      {dry > 0.4 && <g opacity={dry}>{[[380, 232], [450, 300], [540, 470], [500, 540]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l24 10l-8 20l20 14`} stroke="#c4682c" strokeWidth={10} fill="none" strokeLinecap="round" />)}<g transform="translate(520 420)"><circle r={54} fill={COPPER[2]} />{line("M-40 -40L40 40M-40 40L40 -40", COPPER[0], 16)}</g></g>}
      {[520, 1400].map((x) => <g key={x}><Shade d={rr(x - 90, 540, 180, 60, 22)} tones={COPPER} L={LR} s={[3, 9, 6]} /></g>)}
    </g>
  );
};
export const InsideVaultShot: React.FC = () => {
  const { t } = useW();
  return (
    <Scene kind="brankas" from={{ z: 1.25 }} to={{ z: 1.0 }}>
      <Pipes t={t} flow={0.5} />
      <MyBank x={960} y={850} s={0.9} t={t} />
    </Scene>
  );
};
export const PaidCalendarShot: React.FC = () => {
  const { t, at } = useW();
  const tf = at("full", 1.8);
  return (
    <Scene kind="toko" to={{ z: 1.06 }}>
      <Paper x={880} y={190} w={820} h={640}><path d={rr(-410, 0, 820, 110, 18)} fill={CORAL[2]} />{[-250, 250].map((a) => <path key={a} d={rr(a - 16, -30, 32, 80, 16)} fill={STEEL[2]} />)}
        {Array.from({ length: 12 }, (_, i) => { const x = -300 + (i % 4) * 200, y = 205 + Math.floor(i / 4) * 160; return <g key={i}><path d={rr(x - 78, y - 62, 156, 124, 20)} fill="#f0dcc0" /><Tick x={x} y={y} r={44} p={pop(t, Math.max(0.2, tf - 1.1) + i * 0.1, 0.25)} /></g>; })}
      </Paper>
      <You x={1590} y={870} s={1.05} t={t} face="happy" look={-26} arm={[-160, -270]} />
    </Scene>
  );
};
export const DryPipeShot: React.FC = () => {
  const { t, at } = useW();
  const d = go(t, at("interest", 1.6) - 1.0, 1.2);
  return (
    <Scene kind="brankas" from={{ z: 1.35, x: 640, y: 460 }} to={{ z: 1.45, x: 640, y: 470 }}>
      <Pipes t={t} dry={d} flow={0.3} />
    </Scene>
  );
};
export const FlowPipeShot: React.FC = () => {
  const { t, at } = useW();
  const f = go(t, at("fee", 1.6) - 1.0, 1.0);
  return (
    <Scene kind="brankas" from={{ z: 1.2, x: 1150 }} to={{ z: 1.28, x: 1180 }}>
      <Pipes t={t} dry={1} flow={0.4 + f * 0.6} />
      <MyBank x={960} y={850} s={0.75} t={t} />
      <Stack x={1400} y={850} n={Math.round(2 + f * 10)} w={90} />
      <Terminal x={1740} y={850} s={0.65} t={t} on={1} />
    </Scene>
  );
};
/* s20 */
export const WalletFightShot: React.FC = () => {
  const { t } = useW();
  const cards = [[620, GOLD], [840, TEALB], [1080, CORAL], [1300, BLUE]] as const;
  return (
    <Scene kind="ungu" from={{ z: 1.15, y: 560 }} to={{ z: 1.03 }}>
      <Shade d={rr(450, 420, 1020, 420, 60)} tones={WOOD} L={LR} s={[8, 26, 14]} />
      {cards.map(([x], i) => { const j = Math.max(0, Math.sin(t * 5 + i * 1.9)); return <Card key={i} x={x + Math.sin(t * 7 + i) * 16} y={500 - j * 110} s={0.95} rot={Math.sin(t * 6 + i * 2) * 12} premium={i % 2 === 0} t={t} face={j > 0.6 ? "shock" : "neutral"} />; })}
      <Shade d={rr(420, 540, 1080, 320, 56)} tones={COPPER} L={LR} s={[8, 26, 14]} />
      <path d={rr(480, 590, 960, 14, 7)} fill={WOOD[3]} opacity={0.6} /><circle cx={1400} cy={710} r={34} fill={GOLD[2]} />
    </Scene>
  );
};
export const PerksShot: React.FC = () => {
  const { t, at } = useW();
  const ws = [at("Points", 0.4), at("miles", 1.2), at("cashback", 2.2)];
  const item = (i: number, k: number) => i === 0 ? <Star key={k} x={0} y={0} r={52} rot={t * 60 + k * 40} /> : i === 1 ? <Plane key={k} x={0} y={0} s={0.9} rot={Math.sin(t * 2 + k) * 14} /> : <g key={k}><Gold x={0} y={0} r={46} /></g>;
  return (
    <Scene kind="hijau" to={{ z: 1.07 }}>
      <Card x={960} y={700} s={1.5} premium t={t} face="happy" />
      {[0, 1, 2].map((i) => [0, 1, 2].map((k) => { const p = back(t, ws[i] - 0.25 + k * 0.14, 0.7), tx = 480 + i * 480 + (k - 1) * 120, ty = 420 - (k % 2) * 110 + Math.sin(t * 2 + k + i) * 14; const [x, y] = arc([960, 640], [tx, ty], clamp(p), 120); return p > 0 ? <g key={`${i}${k}`} transform={`translate(${x} ${y}) scale(${p})`}>{item(i, k)}</g> : null; }))}
    </Scene>
  );
};
export const HighBarShot: React.FC = () => {
  const { t, at } = useW();
  const p = back(t, at("premium", 0.8) - 0.4, 0.7), up = go(t, at("higher", 2.4) - 0.5, 0.9);
  return (
    <Scene kind="jalan" to={{ z: 1.06 }}>
      <Highway y={870} t={t} speed={0} />
      <Pop x={650} y={700} p={p}><Card x={620} y={720} s={1.9} premium t={t} face="happy" /><SackBig x={380} y={850} /></Pop>
      <TollGate x={1350} y={820} s={1.35} t={t} />
      <g transform={`translate(1160 ${mix(640, 330, up)})`}><path d={rr(0, -18, 520, 36, 18)} fill="#fff4da" />{[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${24 + i * 84} -18h36l-22 36h-36Z`} fill={CORAL[2]} />)}</g>
      {line(`M1700 800V${mix(660, 350, up)}M1664 ${mix(700, 390, up)}L1700 ${mix(650, 340, up)}L1736 ${mix(700, 390, up)}`, P.coin, 22, up)}
    </Scene>
  );
};
const SackBig: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`}><Shade d="M-40 -190Q-140 -120 -128 -52Q-120 4 0 4Q120 4 128 -52Q140 -120 40 -190Z" tones={GOLD} L={LR} s={[7, 22, 12]} />{line("M-50 -190H50", WOOD[2], 14)}<Star x={0} y={-76} r={52} c="#fff4da" /></g>;
/* s21 */
export const WheelShot: React.FC = () => {
  const { t, at } = useW();
  const p = back(t, at("percent", 1.6) - 0.7, 0.7);
  return (
    <Scene kind="ungu" to={{ z: 1.08 }}>
      <Card x={720} y={550} s={2.4} rot={-6} premium t={t} />
      <g transform={`translate(1340 560) scale(${0.3 + p * 0.7}) rotate(${t * 70})`}><Shade d={circ(0, 0, 190)} tones={GOLD} L={LR} s={[8, 24, 14]} />{Array.from({ length: 8 }, (_, i) => <path key={i} d="M0 -176V-60" stroke={GOLD[1]} strokeWidth={14} transform={`rotate(${i * 45})`} />)}<circle r={62} fill={P.cream} /></g>
      <g transform="translate(1340 560)" opacity={p}><Txt x={0} y={22} s={64} c={P.navy}>1.5%</Txt></g>
    </Scene>
  );
};
export const RollHomeShot: React.FC = () => {
  const { t, at } = useW();
  const tf = at("fifty", 1), p = go(t, tf - 0.8, 1.8);
  return (
    <Scene kind="jalan" to={{ z: 1.05 }}>
      <Highway y={860} t={t} speed={0} />
      <MyBank x={420} y={800} s={1.15} t={t} mood="calm" />
      <You x={1560} y={850} s={1.15} t={t} face={p > 0.8 ? "happy" : "neutral"} look={-30} arm={[-170, -190]} />
      <Stack x={720} y={850} n={Math.round(15 - p * 10)} w={66} />
      {[0, 1, 2, 3, 4].map((i) => { const u = clamp(p * 1.5 - i * 0.12); return u > 0 ? <g key={i} transform={`translate(${mix(740, 1360 - i * 70, u)} ${800 - Math.abs(Math.sin(u * 9)) * 70 * (1 - u)}) rotate(${u * 720})`}><Gold x={0} y={0} r={42} /></g> : null; })}
    </Scene>
  );
};
export const KeepSmallShot: React.FC = () => {
  const { t, at } = useW();
  const s = at("seventy", 0.9), hug = back(t, s - 0.7, 0.6);
  return (
    <Scene kind="ungu" from={{ z: 1.12 }} to={{ z: 1.25 }}>
      <MyBank x={900} y={820} s={1.5} t={t} mood="calm" hand={[mix(260, 70, hug), -90]} />
      <Stack x={mix(1420, 1040, hug)} y={800} n={5} w={62} />
    </Scene>
  );
};
/* s22 */
export const TraceShot: React.FC = () => {
  const { t, at } = useW();
  const p = go(t, at("rewards", 1) - 0.8, 1.8);
  return (
    <Scene kind="malam" to={{ z: 1.0 }}>
      <MapBase t={t} cam={{ x: 960, y: 560, z: 1.08 }}>
        {Array.from({ length: 12 }, (_, i) => { const u = i / 11; if (u > p) return null; const x = mix(480, 1360, u), y = 560 - Math.sin(u * Math.PI) * 160 + u * 150; return <g key={i}><Glow2 x={x} y={y} r={50} c={P.coin} o={0.7} /><Gold x={x} y={y} r={20 + Math.sin(t * 4 + i) * 3} /></g>; })}
        <g transform="translate(330 470)"><You x={0} y={0} s={0.36} t={t} face="happy" /></g>
      </MapBase>
    </Scene>
  );
};
export const FromShopCartShot: React.FC = () => {
  const { t, at } = useW();
  const tc = at("cart", 1.6), p = seg(t, 0.2, tc + 0.8, Easing.inOut(Easing.sin));
  return (
    <Scene kind="jalan" from={{ z: 1.05 }} to={{ z: 1.15 }}>
      <Highway y={850} t={t} speed={0} />
      <Cart x={760} y={850} s={1.3} t={t} load={1 - p * 0.2} />
      {[0, 1, 2, 3].map((i) => { const u = (t * 0.35 + i * 0.25) % 1; const [x, y] = arc([760, 640], [-60, 330], u, 130); return <Gold key={i} x={x} y={y} r={30} op={1 - u * 0.5} />; })}
      <Owner x={1450} y={860} s={1.2} t={t} face={t > tc - 0.2 ? "shock" : "neutral"} look={-36} />
    </Scene>
  );
};
/* s23 */
export const AtTowerShot: React.FC = () => {
  const { t, at } = useW();
  const stop = seg(t, 0, Math.max(1.4, at("gate", 2)), Easing.out(Easing.cubic));
  return (
    <Scene kind="malam" to={{ z: 1.08 }}>
      <Highway y={850} t={t} speed={80 * (1 - stop)} />
      <NetTower x={1500} y={780} s={1.0} t={t} mood="calm" sweep={165} />
      <TollGate x={1100} y={800} s={1.25} t={t} />
      <Cart x={mix(50, 720, stop)} y={870} s={1.0} t={t} rolling={stop < 0.97} />
    </Scene>
  );
};
export const TollBoxShot: React.FC = () => {
  const { t, at } = useW();
  const tp = at("percent", 2), tc = at("cents", 3.4), a = go(t, tp - 0.7, 0.7), b = go(t, tc - 0.7, 0.7);
  const drop = (p: number, x0: number, big: boolean) => { const [x, y] = arc([x0, 330], [960 + (big ? -60 : 70), 560], p, 100); return p > 0 ? <Gold x={x} y={p >= 1 ? 535 : y} r={big ? 74 : 54} text={big ? "%" : "2¢"} /> : null; };
  const fly = seg(t, at("approval", tc + 1) - 0.6, at("approval", tc + 1) + 1.2, Easing.inOut(Easing.sin));
  return (
    <Scene kind="malam" to={{ z: 1.1, y: 540 }}>
      <Highway y={870} t={t} speed={0} />
      <NetTower x={1500} y={820} s={0.95} t={t} mood={b > 0.9 ? "happy" : "calm"} beam={0} />
      <g transform="translate(960 820)"><Contact x={0} y={4} w={240} /><Shade d={rr(-180, -240, 360, 240, 36)} tones={PURPLE} L={LR} s={[7, 22, 12]} /><path d={rr(-110, -252, 220, 32, 16)} fill="#12062c" /><Txt x={0} y={-96} s={80}>TOLL</Txt></g>
      {drop(a, 420, true)}{drop(b, 520, false)}
      {fly > 0 && fly < 1 && <g transform={`translate(${mix(-150, 2050, fly)} ${220 - Math.sin(fly * Math.PI) * 50})`}><Shade d={rr(-80, -52, 160, 104, 14)} tones={CREAM} L={LR} s={[3, 9, 6]} /><Tick x={0} y={10} r={32} p={1} /></g>}
    </Scene>
  );
};
export const MergeCoinsShot: React.FC = () => {
  const { t, at } = useW();
  const s = at("sixteen", 1.2), m = go(t, s - 0.8, 0.8), p = back(t, s - 0.1, 0.5);
  return (
    <Scene kind="ungu" from={{ z: 1.1 }} to={{ z: 1.2 }}>
      {m < 0.95 && <g><Gold x={mix(580, 930, m)} y={540} r={90} text="%" /><Gold x={mix(1340, 990, m)} y={540} r={64} text="2¢" /></g>}
      {m >= 0.95 && <g><Stack x={960} y={720} n={Math.round(4 * p)} w={120} /><Waves2 x={960} y={620} t={t} at={s} /></g>}
      <NetTower x={1620} y={850} s={0.75} t={t} mood="happy" beam={0} />
    </Scene>
  );
};
const Waves2: React.FC<{ x: number; y: number; t: number; at: number }> = ({ x, y, t, at }) => <g>{[0, 1].map((i) => { const u = (t - at) * 0.9 - i * 0.25; return u > 0 && u < 1 ? <circle key={i} cx={x} cy={y} r={80 + u * 300} stroke="#fff" strokeWidth={12 * (1 - u)} fill="none" opacity={1 - u} /> : null; })}</g>;
/* s24 */
export const ZoomOutShot: React.FC = () => {
  const { t, at, dur } = useW();
  const z = seg(t, 0.2, Math.max(1.8, dur), Easing.inOut(Easing.cubic)), k = mix(3.4, 0.28, z);
  return (
    <Scene kind="malam">
      <g opacity={z}>{[470, 590, 710, 830].map((y) => <path key={y} d={`M-200 ${y}Q960 ${y - 90} 2120 ${y}`} stroke="#4a62a0" strokeWidth={12} fill="none" opacity={0.7} />)}</g>
      <g transform={`translate(960 500) scale(${k})`}><Glow2 x={0} y={0} r={260} c={P.coin} o={0.7} /><Gold x={0} y={0} r={100} text="16¢" /></g>
    </Scene>
  );
};
export const NationShot: React.FC = () => {
  const { t, at } = useW();
  const tt = at("ten", 3), lit = go(t, 0.1, Math.max(1.5, tt));
  const roads = [250, 370, 490, 610, 730, 850];
  return (
    <Scene kind="malam" from={{ z: 1.5, y: 600 }} to={{ z: 1.0 }}>
      {roads.map((y, k) => { const s = 0.4 + k * 0.12; return <g key={y}><path d={`M-300 ${y}Q960 ${y - 110 + k * 6} 2220 ${y}`} stroke="#ffb03a" strokeWidth={26 * s} opacity={0.25 * lit} fill="none" /><path d={`M-300 ${y}Q960 ${y - 110 + k * 6} 2220 ${y}`} stroke="#ffd27a" strokeWidth={8 * s} opacity={0.4 + 0.6 * lit} fill="none" />
        {Array.from({ length: 14 }, (_, i) => { const u = (R(k * 20 + i, 3) + t * (0.05 + R(i, k + 2) * 0.05) * (k % 2 ? 1 : -1) + 10) % 1, x = -300 + u * 2520, v = (x + 300) / 2520, yy = (1 - v) * (1 - v) * y + 2 * v * (1 - v) * (y - 110 + k * 6) + v * v * y; return i / 14 < lit ? <g key={i} transform={`translate(${x} ${yy - 6}) scale(${s * 0.7})`}><path d="M-30 -22H30L22 0H-22Z" fill="#d98a56" /><ellipse cy={-24} rx={26} ry={12} fill={P.coin} /><circle cx={-16} cy={4} r={9} fill="#0c1230" /><circle cx={16} cy={4} r={9} fill="#0c1230" /></g> : null; })}</g>; })}
    </Scene>
  );
};
export const _s2 = { Lines };
