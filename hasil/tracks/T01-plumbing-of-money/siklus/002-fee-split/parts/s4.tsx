// T01-002 s39-s49 dan thumbnail: manfaat gerbang, QRIS, penutup.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, R, clamp, mix, pop, seg, useShot } from "@r3";
import { Shade, Sky, Tones, rr } from "@r3/art";
import { BLUE, COPPER, CORAL, CREAM, Contact, DARK, GOLD, GREEN, Glow2, LR, P, Phone, QrGrid, STEEL, TEALB, WOOD, You, Owner, circ, line, Tick, ScanFrame } from "./kit";
import { CentralBank, Coin, NetTower, PURPLE, Stack, Tourist, Txt } from "./benda";
import { Bill, Card, Cart, CashMan, Counter, Gold, Hand, Highway, Lines, MyBank, Paper, PriceTag, QrStand, Sack, Scene, ServerGuy, Shoe, ShopBank, Stall, Terminal, TollGate, arc, back, go, useW } from "./dunia";
import { MapBase, Pop } from "./s1";

/* s39 */
export const RepairShot: React.FC = () => {
  const { t } = useW();
  const hit = Math.abs(Math.sin(t * 5));
  return (
    <Scene kind="jalan" from={{ z: 1.05 }} to={{ z: 1.12 }}>
      <Highway y={850} t={t} speed={30} />
      <TollGate x={1050} y={800} s={1.5} t={t} open={0.9} mood="happy" />
      <Hand from={[960, 640]} to={[780, 680 - hit * 110]} tones={TEALB} />
      <g transform={`translate(780 ${680 - hit * 110}) rotate(${-50 + hit * 60})`}>{line("M0 0V-120", WOOD[2], 22)}<path d={rr(-56, -162, 112, 62, 20)} fill={STEEL[2]} /></g>
      {hit < 0.25 && [0, 1, 2, 3].map((i) => <circle key={i} cx={700 + R(i, 3) * 90} cy={790 - R(i, 4) * 50} r={7} fill={P.coin} />)}
      <Cart x={mix(1500, 2100, seg(t, 0, 5, Easing.linear))} y={875} s={0.6} t={t} rolling />
    </Scene>
  );
};
export const SealShot: React.FC = () => {
  const { t, at } = useW();
  const g = back(t, at("promise", 2) - 0.9, 0.8), x = mix(620, 1010, g);
  return (
    <Scene kind="toko" from={{ z: 1.02 }} to={{ z: 1.08 }}>
      <MyBank x={380} y={790} s={0.9} t={t} hand={[mix(200, 540, g), -230]} />
      <Owner x={1280} y={850} s={1.05} t={t} face={g > 0.8 ? "happy" : "neutral"} look={-30} />
      <Tourist x={1660} y={860} s={0.95} t={t} look={-26} face="happy" />
      <g transform={`translate(${x} 580) rotate(${Math.sin(t * 2) * 4})`}><Glow2 x={0} y={0} r={220} c={P.coin} o={0.55} />{Array.from({ length: 12 }, (_, i) => <circle key={i} cx={Math.cos(i * 0.5236) * 94} cy={Math.sin(i * 0.5236) * 94} r={26} fill={GOLD[2]} />)}<Shade d={circ(0, 0, 100)} tones={GOLD} L={LR} s={[5, 16, 10]} /><Tick x={0} y={0} r={58} p={1} /></g>
    </Scene>
  );
};
export const TidyTillShot: React.FC = () => {
  const { t, at } = useW();
  const p = go(t, at("less", 1.2) - 0.8, 1.6);
  return (
    <Scene kind="toko" from={{ z: 1.1 }} to={{ z: 1.15 }}>
      <Counter y={820} />
      <Owner x={520} y={830} s={1.15} t={t} face="happy" look={30} />
      <g transform="translate(1180 800)"><Shade d={rr(-280, -150, 560, 150, 24)} tones={STEEL} L={LR} s={[6, 20, 10]} />{[0, 1, 2, 3].map((i) => <g key={i}><path d={rr(-255 + i * 130, -130, 115, 92, 14)} fill="#0c1230" /><Stack x={-198 + i * 130} y={-62} n={Math.max(1, Math.round(5 - p * (3 + (i % 2))))} w={36} /></g>)}</g>
      {[0, 1, 2, 3, 4].map((i) => <Gold key={i} x={1000 + i * 110} y={560 - p * 320 - (i % 2) * 70} r={30} text="¢" op={clamp(1 - p)} />)}
    </Scene>
  );
};
/* s40 */
export const LowGateShot: React.FC = () => {
  const { t, at } = useW();
  const p = go(t, at("low", 1.2) - 0.6, 2.0), a = mix(70, -75, p);
  return (
    <Scene kind="malam" to={{ z: 1.08 }}>
      <Highway y={850} t={t} speed={0} />
      <TollGate x={560} y={800} s={1.5} t={t} open={mix(0.8, 0, p)} />
      <g transform="translate(1360 560)"><Shade d={circ(0, 0, 220)} tones={CREAM} L={LR} s={[8, 24, 14]} />{Array.from({ length: 9 }, (_, i) => <path key={i} d="M0 -190V-150" stroke={P.navy} strokeWidth={12} strokeLinecap="round" transform={`rotate(${-80 + i * 20})`} />)}<g transform={`rotate(${a})`}>{line("M0 20V-150", P.coral, 22)}</g><circle r={30} fill={P.navy} /><Txt x={-130} y={110} s={60} c={GREEN[1]}>0</Txt><g transform="translate(30 110)"><Gold x={0} y={0} r={40} text="¢" /></g></g>
    </Scene>
  );
};
export const SeaFlightShot: React.FC = () => {
  const { t, at, dur } = useW();
  const p = seg(t, 0, Math.max(2, dur - 0.2), Easing.inOut(Easing.cubic)), z = at("zero", 2.6), open = back(t, z - 0.6, 0.7);
  return (
    <Scene kind="pulau">
      <g transform={`translate(${mix(900, 0, p)} 0)`}>
        <TollGate x={960} y={790} s={1.35} t={t} open={clamp(open)} mood={open > 0.5 ? "happy" : "neutral"} />
      </g>
      <g transform={`translate(${mix(400, -900, p)} ${620 + Math.sin(t * 3) * 6})`}><path d="M-140 0H140L100 60H-100Z" fill={WOOD[2]} />{line("M0 0V-190", WOOD[1], 14)}<path d="M8 -190L130 -30H8Z" fill="#fff4da" /></g>
    </Scene>
  );
};
/* s41 */
export const WarungQrShot: React.FC = () => {
  const { t, at } = useW();
  const q = at("QRIS", 2.2), glow = go(t, q - 0.4, 0.6);
  return (
    <Scene kind="pulau" from={{ z: 1.05 }} to={{ z: 1.25, y: 580 }}>
      <Stall x={760} y={850} s={1.35} wide><Owner x={-70} y={-88} s={0.55} t={t} face="happy" look={20} /></Stall>
      <QrStand x={1300} y={850} s={1.0} glow={glow * 0.3} />
      <ScanFrame x={1300} y={626} w={230} p={glow} />
    </Scene>
  );
};
export const ManyPhonesShot: React.FC = () => {
  const { t, at } = useW();
  const c = at("scan", 2);
  const ph: [number, number, number, Tones][] = [[360, 640, 24, BLUE], [620, 330, 52, CORAL], [1300, 330, -52, GREEN], [1560, 640, -24, GOLD]];
  return (
    <Scene kind="pulau" to={{ z: 1.07 }}>
      <QrStand x={960} y={820} s={1.35} glow={0.6} />
      {ph.map(([x, y, r, k], i) => { const p = back(t, 0.15 + i * 0.2, 0.6); return <g key={i}>{line(`M${x + (960 - x) * 0.22} ${y + (520 - y) * 0.22}L${x + (960 - x) * 0.5} ${y + (520 - y) * 0.5}`, P.coin, 12, p * (0.4 + 0.6 * Math.abs(Math.sin(t * 4 + i))))}<Pop x={x} y={y} p={p}><Phone x={x} y={y + Math.sin(t * 2 + i) * 8} s={0.68} rot={r} body={k} bg="#5a3a80" screen={<g><QrGrid x={-70} y={-70} size={140} /><ScanFrame x={0} y={0} w={170} p={1} /></g>} /></Pop></g>; })}
    </Scene>
  );
};
/* s42 */
export const CentralGateShot: React.FC = () => {
  const { t, at } = useW();
  const b = at("Indonesia", 2), p = back(t, b - 0.9, 0.8);
  return (
    <Scene kind="pulau" to={{ z: 1.06 }}>
      <Pop x={720} y={800} p={0.5 + 0.5 * p}><CentralBank x={720} y={800} s={1.3} t={t} mood="calm" /></Pop>
      <TollGate x={1380} y={820} s={1.15} t={t} open={0.5 + Math.sin(t * 1.5) * 0.3} />
      <Hand from={[960, 600]} to={[1340, 640 + Math.sin(t * 1.5) * 20]} tones={CREAM} />
    </Scene>
  );
};
export const ShopPaysShot: React.FC = () => {
  const { t, at } = useW();
  const pay = go(t, at("pays", 1.6) - 0.8, 1.0);
  const [x, y] = arc([760, 600], [1060, 800], pay, 150);
  return (
    <Scene kind="pulau" from={{ z: 1.05 }} to={{ z: 1.1 }}>
      <Stall x={500} y={850} s={1.1}><Owner x={0} y={-88} s={0.55} t={t} look={20} /></Stall>
      <g transform="translate(1060 850)"><Shade d={rr(-80, -90, 160, 90, 22)} tones={TEALB} L={LR} s={[4, 12, 7]} /><path d={rr(-50, -100, 100, 22, 11)} fill="#0c2030" /></g>
      {pay > 0 && pay < 0.97 && <Coin x={x} y={y} r={44} />}
      <You x={1560} y={860} s={1.05} t={t} face="happy" look={-30} arm={[-180, -260]} />
      <Paper x={1300} y={380} w={260} h={250} rot={-4}><Lines x={-90} y={44} w={180} n={4} g={34} /><Tick x={0} y={210} r={30} p={back(t, at("add", 3) - 0.2)} /></Paper>
    </Scene>
  );
};
/* s43 */
export const NoFeeShot: React.FC = () => {
  const { t, at } = useW();
  const f = at("fee", 3), open = back(t, f - 0.8, 0.8);
  return (
    <Scene kind="pulau" to={{ z: 1.04 }}>
      <Stall x={430} y={820} s={0.8}><QrStand x={110} y={-92} s={0.3} /></Stall>
      <TollGate x={760} y={840} s={0.85} t={t} open={clamp(open)} mood="happy" />
      <Stall x={1330} y={820} s={1.05} c={BLUE} wide><QrStand x={150} y={-92} s={0.3} /></Stall>
      <TollGate x={1700} y={860} s={0.85} t={t} open={clamp(open)} mood="happy" />
    </Scene>
  );
};
export const MicroLimitShot: React.FC = () => {
  const { t, at } = useW();
  const f = at("five", 2.4), a = go(t, 0.2, 0.9), b = go(t, f - 0.9, 1.1), h = a * 120 + b * 360;
  return (
    <Scene kind="pulau" from={{ z: 1.05 }} to={{ z: 1.08 }}>
      <Stall x={560} y={850} s={0.95} c={GREEN}><Owner x={0} y={-88} s={0.5} t={t} face={b > 0.8 ? "happy" : "neutral"} /></Stall>
      <g transform="translate(1250 850)"><Shade d={rr(-80, -560, 160, 560, 60)} tones={CREAM} L={LR} s={[6, 20, 10]} /><path d={rr(-48, -36 - h, 96, h, 40)} fill={GREEN[2]} />{[-156, -516].map((y) => <path key={y} d={`M-120 ${y}H120`} stroke={P.navy} strokeWidth={9} strokeDasharray="22 16" />)}</g>
      {b > 0.9 && <Glow2 x={1250} y={334} r={170} c="#7dffb8" o={0.7} />}
    </Scene>
  );
};
/* s44 */
export const OverLimitShot: React.FC = () => {
  const { t, at } = useW();
  const p = go(t, 0.3, 1.4), close = go(t, at("percent", 3) - 1.2, 0.9);
  return (
    <Scene kind="pulau" to={{ z: 1.06 }}>
      <g transform="translate(520 850)"><Shade d={rr(-80, -560, 160, 560, 60)} tones={CREAM} L={LR} s={[6, 20, 10]} /><path d={rr(-48, -36 - p * 460, 96, p * 460, 40)} fill={p > 0.4 ? GOLD[2] : GREEN[2]} /><path d="M-120 -200H120" stroke={P.navy} strokeWidth={9} strokeDasharray="22 16" /></g>
      <Stall x={1050} y={830} s={0.85} c={BLUE} />
      <TollGate x={1520} y={850} s={1.25} t={t} open={1 - close * 0.75} mood="calm" />
    </Scene>
  );
};
export const MillionSliceShot: React.FC = () => {
  const { t, at } = useW();
  const s = at("seven", 2.4), p = back(t, s - 0.9, 0.8);
  return (
    <Scene redup kind="pulau" from={{ z: 1.05 }} to={{ z: 1.12 }}>
      <g transform={`translate(${900 - p * 40} 520) rotate(-3)`}><Shade d={rr(-480, -240, 940, 480, 34)} tones={CORAL} L={LR} s={[6, 20, 10]} /><path d={rr(-440, -200, 860, 400, 24)} fill="none" stroke="#ffd0b0" strokeWidth={10} /><circle cx={-250} cy={0} r={120} fill="#ffd0b0" opacity={0.7} /><Txt x={100} y={30} s={106}>Rp1,000,000</Txt></g>
      <g transform={`translate(${1378 + p * 66} ${505 + p * 6}) rotate(${-3 + p * 7})`}><Shade d={rr(-14, -240, 36, 480, 14)} tones={CORAL} L={LR} s={[3, 9, 6]} /><Glow2 x={0} y={0} r={200} c={P.coin} o={0.7 * clamp(p)} /></g>
      <path d={`M${1372 - p * 6} 236V800`} stroke="#fff4da" strokeWidth={8} strokeDasharray="22 18" opacity={clamp(p)} /><Stack x={1480 + p * 70} y={860} n={Math.round(clamp(p) * 4)} w={74} />
    </Scene>
  );
};
/* s45 */
export const IslandCartShot: React.FC = () => {
  const { t, at } = useW();
  const s = at("seventy", 2.4), p = go(t, s - 1.0, 1.0);
  const [x, y] = arc([660, 620], [1330, 800], p, 260);
  return (
    <Scene kind="pulau" to={{ z: 1.06 }}>
      <Highway y={860} t={t} speed={0} />
      <Cart x={620} y={860} s={1.05} t={t} />
      <Stack x={x} y={y} n={4} w={70} />
      <TollGate x={1640} y={810} s={1.1} t={t} open={0.3} mood="happy" />
    </Scene>
  );
};
export const SideBySideShot: React.FC = () => {
  const { t, at } = useW();
  const a = go(t, 0.2, 0.8), b = back(t, at("seventy-five", 2.6) - 1.0, 0.9);
  return (
    <Scene kind="jalan" to={{ z: 1.04 }}>
      <path d={rr(260, 150, 580, 720, 44)} fill="#7dffd0" opacity={0.14} /><path d={rr(1080, 150, 580, 720, 44)} fill="#ffb88a" opacity={0.16} />
      <Stack x={550} y={820} n={Math.round(a * 5)} w={110} />
      <Stack x={1370} y={820} n={Math.round(clamp(b) * 19)} w={110} />
      <QrStand x={330} y={840} s={0.45} /><Card x={1560} y={780} s={0.65} rot={12} premium t={t} />
    </Scene>
  );
};
/* s46 */
export const TwoRoadsShot: React.FC = () => {
  const { t } = useW();
  const house = (x: number, y: number, k: number, c: string) => <g key={x} transform={`translate(${x} ${y}) scale(${k})`}><path d={rr(-60, -90, 120, 90, 8)} fill="#fff4da" /><path d="M-82 -82L0 -150L82 -82Z" fill={c} /><path d={rr(-18, -48, 36, 48, 14, 3)} fill="#6a3340" /></g>;
  return (
    <Scene kind="pagi" to={{ z: 1.04 }}>
      <path d="M980 640Q1250 560 1520 610Q1850 540 2320 620V1300H900Z" fill="#1d7ca8" />
      <path d="M1130 700Q1420 520 1760 640Q1860 690 1880 710Z" fill="#2f8a6a" /><path d="M1500 640L1660 440Q1676 424 1692 440L1850 650Z" fill="#4a8cb0" />
      {[1230, 1320, 1840].map((x, i) => <g key={x} transform={`translate(${x} 700)`}>{line(`M0 0Q${i % 2 ? 26 : -26} -90 ${Math.sin(t + i) * 6} -170`, "#5a3040", 15)}<g transform={`translate(${Math.sin(t + i) * 6} -172)`}>{[-150, -105, -60, -15, 30, 200].map((r) => <path key={r} transform={`rotate(${r})`} d="M0 0Q46 -28 100 8Q46 -4 0 8Z" fill="#175a48" />)}</g></g>)}
      {house(1560, 700, 0.9, CORAL[2])}
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={rr(1080 + R(i, 3) * 800 + Math.sin(t + i) * 16, 905 + R(i, 4) * 90, 90, 9, 4)} fill="#bff0f8" opacity={0.55} />)}
      <path d="M1130 702Q1440 676 1880 712" stroke="#e8fbff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.8} />
      <path d="M1560 556L1660 440Q1676 424 1692 440L1744 506L1704 492L1672 520L1636 494Z" fill="#cfeaf4" />
      <path d="M-400 700Q200 620 560 660Q820 640 940 700V1300H-400Z" fill="#45286a" />
      {Array.from({ length: 7 }, (_, i) => { const h = 90 + R(i, 8) * 200, x = 70 + i * 118; return <g key={i}><path d={rr(x, 690 - h, 86, h + 20, i % 3 ? 8 : 34, 3)} fill="#6c3c82" />{[0, 1, 2].map((k) => <rect key={k} x={x + 16 + (k % 2) * 34} y={712 - h + k * 34} width={18} height={20} rx={5} fill="#ffd27a" opacity={R(i * 3 + k, 5) > 0.4 ? 0.9 : 0.25} />)}</g>; })}
      <Highway y={830} t={t} x0={-400} x1={900} /><Highway y={830} t={t} x0={1020} x1={2320} />
      <path d="M960 250V920" stroke="#fff4da" strokeWidth={14} strokeDasharray="34 24" strokeLinecap="round" />
      <TollGate x={420} y={790} s={1.15} t={t} /><TollGate x={1360} y={790} s={1.15} t={t} open={1} />
      <Cart x={190 + Math.sin(t) * 20} y={880} s={0.55} t={t} rolling /><Cart x={1700 + t * 40} y={880} s={0.55} t={t} rolling />
    </Scene>
  );
};
export const SmallRewardShot: React.FC = () => {
  const { t, at } = useW();
  const c = at("central", 3), p = back(t, c - 0.8, 0.8);
  return (
    <Scene kind="pulau" from={{ z: 1.05 }} to={{ z: 1.08 }}>
      <Highway y={870} t={t} speed={0} />
      <Sack x={520} y={860} s={0.75} label="★" c={GOLD} />
      <Pop x={1180} y={820} p={0.4 + 0.6 * p}><CentralBank x={1180} y={810} s={1.05} t={t} mood="calm" /></Pop>
      <Pop x={1640} y={480} p={p}><Paper x={1640} y={300} w={270} h={380} rot={5}><Lines x={-95} y={50} w={190} n={7} g={44} c={TEALB[2]} /></Paper></Pop>
    </Scene>
  );
};
/* s47 */
export const NightAllShot: React.FC = () => {
  const { t, at } = useW();
  const s = at("seventy-five", 1.6);
  return (
    <Scene kind="malam">
      <MapBase t={t} cam={{ x: 960, y: mix(600, 545, go(t, 0, 2)), z: mix(1.2, 1.05, go(t, 0, 2.4)) }}>
        {Array.from({ length: 9 }, (_, i) => { const u = (t * 0.18 + i / 9) % 1, x = mix(420, 1500, u), y = 775 + Math.sin(u * Math.PI) * 60; return t > s - 1 ? <g key={i}><Glow2 x={x} y={y} r={55} c={P.coin} o={0.7} /><Gold x={x} y={y} r={22} /></g> : null; })}
      </MapBase>
    </Scene>
  );
};
export const RewardBackShot: React.FC = () => {
  const { t, at } = useW();
  const s = at("twenty", 1), back1 = go(t, at("rewards", s + 1.6) - 0.8, 1.2);
  return (
    <Scene kind="malam" to={{ z: 1.05 }}>
      <Highway y={870} t={t} speed={0} />
      <MyBank x={620} y={800} s={1.3} t={t} />
      <Stack x={620} y={330} n={Math.round(go(t, s - 0.8, 0.8) * 7)} w={72} />
      <You x={1520} y={870} s={1.05} t={t} face={back1 > 0.8 ? "happy" : "neutral"} look={-30} arm={[-170, -190]} />
      {[0, 1, 2, 3].map((i) => { const u = clamp(back1 * 1.4 - i * 0.12); const [x, y] = arc([760, 480], [1340, 680], u, 200); return u > 0 && u < 1 ? <Gold key={i} x={x} y={y} r={34} /> : null; })}
      {back1 > 0.95 && <Stack x={1300} y={870} n={4} w={50} />}
    </Scene>
  );
};
export const TowerServerShot: React.FC = () => {
  const { t, at } = useW();
  const a = at("Sixteen", 0.8), b = at("thirty-nine", 2.8), pa = go(t, a - 0.6, 0.6), pb = go(t, b - 0.6, 0.6);
  return (
    <Scene kind="malam" to={{ z: 1.05 }}>
      <Highway y={870} t={t} speed={0} />
      <g opacity={0.35 + 0.65 * pa}>{pa > 0.2 && <Glow2 x={560} y={450} r={380} c="#fff3b0" o={0.4 * pa} />}<NetTower x={560} y={810} s={1.0} t={t} mood={pa > 0.5 ? "happy" : "calm"} beam={pa} /></g>
      <g opacity={0.35 + 0.65 * pb}><ServerGuy x={1360} y={830} s={1.2} t={t} face={pb > 0.5 ? "happy" : "neutral"} lit={pb * 2} /></g>
      <Pop x={560} y={220} p={pa}><Gold x={840} y={640} r={42} text="¢" /></Pop><Pop x={1640} y={640} p={pb}><Stack x={1660} y={820} n={3} w={54} /></Pop>
    </Scene>
  );
};
/* s48 */
export const AlreadyInShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const p = go(t, 0.4, 1.2), app = go(t, at("before", 2.4) - 0.9, 1.0);
  return (
    <Scene kind="toko" from={{ z: 1.05 }} to={{ z: 1.14, y: 520 }}>
      <Counter y={800} />
      <Shoe x={v ? 890 : 640} y={788} s={v ? 0.85 : 1.3} />
      <g transform={`translate(${v ? 960 : 1000} ${v ? 360 : 400}) rotate(${Math.sin(t * 1.8) * 3}) scale(${v ? 0.95 : 1.4})`}><PriceTag x={0} y={0} text="" /><g opacity={1 - p}><Txt x={-26} y={30} s={92} c={P.navy}>$100</Txt></g><g opacity={p}><Txt x={-90} y={30} s={78} c={P.navy}>$100</Txt><Gold x={96} y={0} r={48} text="¢" /></g></g>
      <Terminal x={v ? 1140 : 1450} y={790} s={v ? 0.65 : 0.95} t={t} />
      <Card x={v ? 1190 : mix(1850, 1700, app)} y={v ? 500 : 520} s={v ? 0.55 : 0.85} rot={14} t={t} />
    </Scene>
  );
};
export const SidePathShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const d = at("discount", 3), p = seg(t, Math.max(0.2, d - 1.6), d + 1.0, Easing.inOut(Easing.sin));
  const sx = v ? 790 : 560, gx = v ? 1030 : 1330;
  const u = p, q = 1 - u, x = q * q * (v ? 700 : 150) + 2 * q * u * (v ? 960 : 1150) + u * u * (v ? 1230 : 1900), y = q * q * 720 + 2 * q * u * 980 + u * u * 720;
  return (
    <Scene kind="pagi" to={{ z: 1.04 }}>
      <Highway y={720} t={t} speed={14} />
      <path d={`M${v ? 700 : 150} 735Q${v ? 960 : 1150} 1000 ${v ? 1230 : 1900} 735`} stroke="#e8c89a" strokeWidth={60} fill="none" strokeLinecap="round" />
      <path d={`M${v ? 700 : 150} 735Q${v ? 960 : 1150} 1000 ${v ? 1230 : 1900} 735`} stroke="#fff6d8" strokeWidth={7} strokeDasharray="24 34" fill="none" />
      <TollGate x={gx} y={690} s={v ? 0.7 : 1.0} t={t} />
      <g transform={`translate(${sx} 640) scale(${v ? 0.62 : 0.95})`}><Shade d={rr(-190, -380, 380, 380, 20)} tones={CREAM} L={LR} s={[6, 22, 11]} /><Shade d={rr(-90, -250, 180, 250, 30, 4)} tones={TEALB} L={LR} s={[5, 16, 9]} /><Shade d="M-230 -370L-180 -470H180L230 -370Z" tones={CORAL} L={LR} s={[5, 16, 9]} /><g transform={`rotate(${Math.sin(t * 2.4) * 8} 0 -300)`}>{line("M-50 -300L0 -340L50 -300", "#2a1444", 6)}<path d={rr(-100, -300, 200, 80, 20)} fill={GREEN[2]} /><g transform="translate(0 -260) scale(0.62)"><Bill x={0} y={0} text="$" /></g></g></g>
      <Cart x={x} y={y + 40} s={v ? 0.45 : 0.7} t={t} rolling={p > 0 && p < 1} />
    </Scene>
  );
};
/* s49 */
const Wallet1: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}><Contact x={0} y={4} w={170} /><Shade d={rr(-130, -130, 260, 130, 30)} tones={WOOD} L={LR} s={[5, 16, 9]} /><Shade d={rr(20, -102, 122, 74, 24)} tones={COPPER} L={LR} s={[3, 10, 6]} /><circle cx={54} cy={-65} r={13} fill={GOLD[2]} />{line("M-110 -108H0", WOOD[3], 8, 0.7)}</g>;
export const OldTableShot: React.FC = () => {
  const { t, at } = useW();
  const p = go(t, at("forgotten", 2) - 0.8, 1.0);
  return (
    <Scene kind="ungu" from={{ z: 1.2 }} to={{ z: 1.05 }}>
      <path d="M-300 -200H2220V760H-300Z" fill="#6a2c4a" />{Array.from({ length: 22 }, (_, i) => <path key={i} d={rr(-260 + i * 120, -100, 40, 860, 18)} fill="#7e3858" opacity={0.7} />)}
      <path d="M-300 760H2220V1300H-300Z" fill="#3c1d3e" />{Array.from({ length: 24 }, (_, i) => <path key={i} d={`M${-300 + i * 110} 790h55l-20 40h-55Z`} fill="#58284a" />)}
      {[[880, 330], [1640, 300]].map(([x, y]) => <g key={x}><path d={rr(x - 110, y - 130, 220, 250, 100, 12)} fill="#16204a" stroke={WOOD[3]} strokeWidth={14} />{[0, 1, 2, 3].map((k) => <circle key={k} cx={x - 60 + k * 40} cy={y - 40 + (k % 2) * 50} r={6} fill="#ffd27a" />)}<path d={`M${x - 150} ${y - 160}Q${x - 90} ${y} ${x - 140} ${y + 150}L${x - 170} ${y + 150}V${y - 160}Z`} fill={CORAL[1]} /><path d={`M${x + 150} ${y - 160}Q${x + 90} ${y} ${x + 140} ${y + 150}L${x + 170} ${y + 150}V${y - 160}Z`} fill={CORAL[1]} /></g>)}
      <path d={rr(-300, 560, 2520, 22, 10)} fill={WOOD[2]} />{[620, 1500].map((x, i) => <g key={x}>{line(`M${x} -200V${130 + i * 30}`, "#2a1030", 8)}<Shade d={`M${x - 80} ${215 + i * 30}Q${x} ${80 + i * 30} ${x + 80} ${215 + i * 30}Z`} tones={COPPER} L={LR} s={[4, 12, 7]} /><Glow2 x={x} y={240 + i * 30} r={240} c="#ffd98a" o={0.55} /></g>)}
      <path d={rr(260, 150, 420, 620, 210, 12)} fill="#101a38" opacity={0.75} /><path d={rr(260, 150, 420, 620, 210, 12)} fill="none" stroke={WOOD[2]} strokeWidth={30} />
      <g transform="translate(1160 840)">{line("M0 -190V0M-120 0H120", WOOD[1], 40)}<ellipse cy={-215} rx={390} ry={64} fill={CREAM[2]} /><ellipse cy={-232} rx={390} ry={54} fill={CREAM[3]} /><ellipse cx={-170} cy={-232} rx={96} ry={22} fill="#c0d6f0" /><ellipse cx={-170} cy={-236} rx={62} ry={13} fill="#eef6ff" /><g transform="translate(290 -238)"><Shade d="M-34 -80H34L26 -6Q0 8 -26 -6Z" tones={TEALB} L={LR} s={[3, 10, 6]} />{line("M34 -66Q66 -58 30 -34", TEALB[2], 10)}</g>{line("M-300 -226H-262M-82 -226H-44", "#c0d6f0", 10)}{line("M180 -250V-370", GOLD[1], 12)}<path d="M180 -420q30 36 0 52q-30 -16 0 -52Z" fill="#ffd98a" /><Glow2 x={180} y={-390} r={190} c="#ffd98a" o={0.7 + Math.sin(t * 7) * 0.1} /></g>
      {[700, 1650].map((x, i) => <g key={x} transform={`translate(${x} 900) scale(${i ? -1 : 1} 1)`}><Contact x={0} y={6} w={120} /><Shade d={rr(-90, -400, 46, 400, 22)} tones={WOOD} L={LR} s={[4, 12, 7]} /><Shade d={rr(-100, -420, 70, 240, 34)} tones={CORAL} L={LR} s={[4, 14, 8]} /><Shade d={rr(-96, -170, 220, 52, 20)} tones={CORAL} L={LR} s={[4, 14, 8]} />{line("M104 -118V0", WOOD[2], 30)}</g>)}
      <g transform={`translate(0 ${(1 - p) * -40})`} opacity={0.3 + 0.7 * p}><Wallet1 x={1130} y={610} /></g>
    </Scene>
  );
};
export const PrScriptShot: React.FC = () => {
  const { t, at } = useW();
  const w = go(t, 0.3, Math.max(1.5, at("invented", 3))), stamp = back(t, at("invented", 3) - 0.15, 0.4);
  const px = 720 + ((t * 300) % 460), py = 330 + Math.floor(w * 6.9) * 62 + Math.sin(t * 22) * 6;
  return (
    <Scene kind="toko" from={{ z: 1.05 }} to={{ z: 1.14 }}>
      <Paper x={960} y={180} w={640} h={680} rot={-2}><Wallet1 x={0} y={150} s={0.55} />{Array.from({ length: Math.floor(w * 7) }, (_, i) => <path key={i} d={rr(-250, 220 + i * 62, 500 * (0.65 + R(i, 7) * 0.35), 18, 9)} fill="#7a5a7a" />)}</Paper>
      {stamp < 0.1 && <g transform={`translate(${px} ${py}) rotate(35)`}><Shade d={rr(-20, -230, 40, 210, 20)} tones={BLUE} L={LR} s={[3, 9, 6]} /><path d="M-20 -22L0 20L20 -22Z" fill={GOLD[2]} /></g>}
      <Hand from={[1750, 1100]} to={[px + 150, py - 90]} tones={BLUE} />
      {stamp > 0 && <g transform={`translate(960 560) scale(${2 - clamp(stamp)})`} opacity={clamp(stamp * 2)}><circle r={190} fill="none" stroke={P.coral} strokeWidth={24} />{line("M-110 -110L110 110M-110 110L110 -110", P.coral, 36)}</g>}
    </Scene>
  );
};

/* ============================== THUMBNAIL ============================== */
/* Teks thumbnail ditambahkan komposisi: kiri atas (16:9) atau tengah atas (9:16). Gambar dijaga di kanan/bawah. */
const Burst: React.FC<{ x: number; y: number; c: string; r?: number }> = ({ x, y, c, r = 1500 }) => <g><Glow2 x={x} y={y} r={700} c={c} o={0.8} />{Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${x} ${y}L${x + Math.cos(i * 0.349) * r} ${y + Math.sin(i * 0.349) * r}L${x + Math.cos(i * 0.349 + 0.13) * r} ${y + Math.sin(i * 0.349 + 0.13) * r}Z`} fill="#fff" opacity={0.09} />)}</g>;
const Bg: React.FC<{ id: string; stops: string[]; children: React.ReactNode }> = ({ id, stops, children }) => <Frame vignette={0.45}><Layer cam={{ x: 960, y: 540, z: 1 }} d={1}><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{stops.map((c, i) => <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />)}</linearGradient></defs><rect x={-300} y={-300} width={2600} height={1800} fill={`url(#${id})`} />{children}</Layer></Frame>;
/** A: gerobak 100 koin dijarah empat tangan */
export const ThumbA: React.FC = () => (
  <Bg id="d2ta" stops={["#2c1658", "#8a3a82", "#e8705a"]}>
    <Burst x={1300} y={760} c="#ffb35a" />
    <path d="M-100 950Q700 870 1300 930T2100 920V1200H-100Z" fill="#45286a" />
    <Cart x={1250} y={1020} s={2.35} t={1} />
    {([[1010, -80, 1070, 540, CREAM], [1240, -80, 1190, 400, STEEL], [1560, -80, 1490, 420, PURPLE], [2060, 200, 1740, 540, BLUE]] as [number, number, number, number, Tones][]).map(([a, b, c, d, k], i) => <g key={i}>{line(`M${a} ${b}Q${(a + c) / 2 + (i < 2 ? -50 : 50)} ${(b + d) / 2} ${c} ${d}`, k[1], 96)}{line(`M${a} ${b}Q${(a + c) / 2 + (i < 2 ? -50 : 50)} ${(b + d) / 2} ${c} ${d}`, k[2], 62)}<Gold x={c} y={d + 76} r={82} /><path d={rr(c - 76, d - 40, 152, 100, 50)} fill={k[2]} />{[-44, 0, 44].map((f) => <path key={f} d={rr(c + f - 19, d + 20, 38, 70, 19)} fill={k[2]} stroke={k[1]} strokeWidth={7} />)}</g>)}
    <You x={330} y={1100} s={1.35} t={1} face="shock" look={36} />
  </Bg>
);
/** B: kartu raksasa disiram potongan, empat penerima */
export const ThumbB: React.FC = () => (
  <Bg id="d2tb" stops={["#0b1130", "#1d2f5c", "#6a4a9a"]}>
    <Burst x={1230} y={500} c="#9fc4ff" />
    <path d="M-100 930Q900 880 2100 930V1200H-100Z" fill="#142046" />
    <MyBank x={1180} y={1030} s={1.75} t={1} mood="happy" />
    <Stack x={1180} y={400} n={5} w={120} />
    <NetTower x={1730} y={1030} s={0.85} t={1} beam={0} mood="shock" />
    <Gold x={1730} y={470} r={44} text="¢" />
    {[[770, 930, 62], [1560, 930, 50], [880, 400, 40]].map(([x, y, r], i) => <Gold key={i} x={x} y={y} r={r} />)}
    <You x={330} y={1110} s={1.3} t={1} face="shock" look={36} />
  </Bg>
);
/** C: sepatu dan label harga yang menyimpan koin */
export const ThumbC: React.FC = () => (
  <Bg id="d2tc" stops={["#0f4a44", "#1f7a62", "#e8c070"]}>
    <Burst x={1280} y={600} c="#fff0a0" />
    <path d="M-100 900H2100V1200H-100Z" fill="#5a2c52" /><path d="M-100 880H2100V930H-100Z" fill={COPPER[2]} />
    <Shoe x={620} y={890} s={2.0} />
    <g transform="translate(1320 520) rotate(-8) scale(2.35)"><PriceTag x={0} y={0} text="" /><path d={rr(-196, -62, 340, 124, 30)} fill="#6a3340" /><Gold x={-122} y={0} r={50} /><Gold x={-24} y={8} r={44} text="¢" /><Gold x={70} y={-4} r={48} /></g>
    <Gold x={1750} y={790} r={96} /><Gold x={1590} y={850} r={66} text="¢" />
  </Bg>
);
export const ThumbS1: React.FC = () => (
  <Bg id="d2ts1" stops={["#2c1658", "#a4527e", "#f5935e"]}>
    <Burst x={960} y={900} c="#ffd98a" />
    <path d="M400 1000H1520V1300H400Z" fill="#45286a" />
    <Terminal x={850} y={1010} s={1.35} t={1} on={1} />
    <Owner x={1100} y={1030} s={0.9} t={1} face="shock" look={-24} />
    <Card x={1010} y={640} s={1.1} rot={-14} premium t={0.6} />
    {[[760, 560, 54], [1180, 560, 44], [1200, 460, 32]].map(([x, y, r], i) => <Gold key={i} x={x} y={y} r={r} />)}
  </Bg>
);
export const ThumbS2: React.FC = () => (
  <Bg id="d2ts2" stops={["#0b1130", "#35226a", "#a45a9a"]}>
    <Burst x={960} y={780} c="#c8a8ff" />
    <path d="M400 1010H1520V1300H400Z" fill="#241450" />
    <CashMan x={900} y={1030} s={1.3} t={1} face="shock" look={26} arm={[190, -300]} />
    <Bill x={1160} y={640} s={1.35} rot={-14} text="$100" />
    {[[1190, 860, 48], [780, 560, 34]].map(([x, y, r], i) => <Gold key={i} x={x} y={y} r={r} text="¢" />)}
  </Bg>
);
export const _s4 = { Sky, pop, useShot, Counter, ShopBank, Phone, DARK, Contact, MapBase };
