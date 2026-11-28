// T01-002 s25-s38: perusahaan mesin kartu, harga flat, kaus kaki, pembayar tunai, studi 2010.
import React from "react";
import { Easing } from "remotion";
import { R, clamp, mix, pop, seg } from "@r3";
import { Shade, Tones, rr } from "@r3/art";
import { BLUE, COPPER, CORAL, CREAM, Contact, GOLD, GREEN, Glow2, LR, P, STEEL, TEALB, WOOD, You, Owner, circ, line, Tick } from "./kit";
import { NetTower, PURPLE, Stack, Txt } from "./benda";
import { Bill, Card, Cart, CashMan, CoinGrid, Counter, Gold, Hand, Highway, Lines, MyBank, Paper, PriceTag, Scene, ServerGuy, Shoe, ShoeBox, ShopBank, Sock, Terminal, TollGate, arc, back, go, useW } from "./dunia";
import { MapBase, Pop } from "./s1";

/* s25 */
export const CartArriveShot: React.FC = () => {
  const { t, dur } = useW();
  const p = seg(t, 0, Math.max(1.4, dur - 0.4), Easing.out(Easing.cubic));
  return (
    <Scene kind="kantor" from={{ z: 1.05 }} to={{ z: 1.12 }}>
      <ServerGuy x={1320} y={810} s={1.35} t={t} face="happy" look={-24} />
      <Cart x={mix(-150, 720, p)} y={850} s={1.05} t={t} rolling={p < 0.97} />
    </Scene>
  );
};
export const ClosedDoorsShot: React.FC = () => {
  const { t, dur } = useW();
  const w = seg(t, 0, Math.max(2, dur), Easing.inOut(Easing.sin)), x = mix(150, 1620, w);
  return (
    <Scene kind="jalan" to={{ z: 1.05 }}>
      <Highway y={860} t={t} speed={0} />
      {[[400, 0], [960, 1], [1520, 2]].map(([a, i]) => <g key={a}>{i === 0 ? <MyBank x={a} y={680} s={0.75} t={t} mood="calm" /> : i === 1 ? <NetTower x={a} y={680} s={0.6} t={t} beam={0} mood="calm" /> : <ShopBank x={a} y={680} s={0.75} t={t} />}<Shade d={rr(a - 55, 580, 110, 102, 26, 4)} tones={WOOD} L={LR} s={[3, 10, 6]} /><circle cx={a + 28} cy={634} r={9} fill={P.coin} /></g>)}
      <g transform={`translate(0 ${-Math.abs(Math.sin(t * 7)) * 12})`}><Owner x={x} y={880} s={0.72} t={t} look={26} /><g transform={`translate(${x + 100} 790) rotate(${Math.sin(t * 7) * 6}) scale(0.7)`}><Env /></g></g>
    </Scene>
  );
};
const Env: React.FC = () => <g><Shade d={rr(-80, -52, 160, 104, 14)} tones={CREAM} L={LR} s={[3, 9, 6]} />{line("M-74 -44L0 12L74 -44", CREAM[0], 7)}<Gold x={40} y={22} r={20} /></g>;
export const OneEnvelopeShot: React.FC = () => {
  const { t, at } = useW();
  const f = at("flat", 1.6), give = go(t, Math.max(0.1, f - 1.2), 1.0), split = go(t, at("settles", f + 1.4) - 0.3, 1.2);
  return (
    <Scene kind="kantor" to={{ z: 1.06 }}>
      <Owner x={420} y={850} s={1.15} t={t} face="happy" look={26} />
      <ServerGuy x={1120} y={850} s={1.2} t={t} face="happy" armL={[-190, -220]} />
      {split < 0.05 && <g transform={`translate(${mix(570, 900, give)} ${mix(700, 600, give)}) scale(1.25)`}><Env /></g>}
      {split > 0.05 && [[1500, 200], [1730, 430], [1740, 680]].map((to, i) => { const [x, y] = arc([920, 600], to as [number, number], split, 160); return <g key={i} transform={`translate(${x} ${y}) scale(0.7)`}><Env /></g>; })}
      <Pop x={1500} y={300} p={split}><MyBank x={1560} y={310} s={0.35} t={t} /></Pop><Pop x={1790} y={540} p={split}><NetTower x={1800} y={560} s={0.3} t={t} beam={0} /></Pop><Pop x={1790} y={790} p={split}><ShopBank x={1790} y={820} s={0.35} t={t} /></Pop>
    </Scene>
  );
};
/* s26 */
export const BigTagShot: React.FC = () => {
  const { t, at } = useW();
  const p = back(t, at("percent", 2) - 0.8, 0.7);
  return (
    <Scene kind="kantor" from={{ z: 1.08 }} to={{ z: 1.12 }}>
      <ServerGuy x={520} y={850} s={1.35} t={t} face="happy" look={22} arm={[240, -230]} />
      <g transform={`translate(1220 460) rotate(${Math.sin(t * 2.2) * 3}) scale(${0.4 + 0.6 * p})`}><PriceTag x={0} y={0} s={1.85} text="2.7%" sub="+5¢ in person" /></g>
    </Scene>
  );
};
export const StackOnTagShot: React.FC = () => {
  const { t, at } = useW();
  const s = at("seventy-five", 1.8), p = go(t, Math.max(0.2, s - 1.4), 1.5);
  return (
    <Scene kind="kantor" from={{ z: 1.1 }} to={{ z: 1.16 }}>
      <Cart x={520} y={850} s={1.1} t={t} load={1 - p * 0.15} />
      <PriceTag x={1300} y={780} s={1.1} text="2.7%" sub="+5¢" />
      {Array.from({ length: 11 }, (_, i) => { const u = clamp(p * 2 - i * 0.09); const [x, y] = arc([560, 620], [1270 + (R(i, 3) - 0.5) * 14, 650 - i * 28], u, 230); return u > 0 ? <ellipse key={i} cx={x} cy={y} rx={70} ry={22} fill={i % 2 ? P.coin : "#fff0a0"} stroke="#a85a28" strokeWidth={5} /> : null; })}
    </Scene>
  );
};
export const SingleBillShot: React.FC = () => {
  const { t } = useW();
  return (
    <Scene kind="toko" from={{ z: 1.1 }} to={{ z: 1.2 }}>
      <Counter y={800} />
      <Owner x={620} y={810} s={1.2} t={t} face="happy" look={34} />
      <g transform={`translate(1180 ${640 + Math.sin(t * 2) * 10}) rotate(-5) scale(2.4)`}><Env /></g>
      <Glow2 x={1180} y={640} r={300} c={P.coin} o={0.3} />
    </Scene>
  );
};
/* s27 */
export const TwoFlowsShot: React.FC = () => {
  const { t, at } = useW();
  const a = go(t, at("two-twenty", 1.4) - 0.9, 1.3), b = go(t, at("sixteen", 2.8) - 0.7, 1.1);
  const go1 = (p: number, to: [number, number], n: number, r: number) => Array.from({ length: n }, (_, i) => { const u = clamp(p * 1.6 - i * 0.1); const [x, y] = arc([960, 520], [to[0] + (i % 3 - 1) * 60, to[1]], u, 150); return u > 0 ? <Gold key={i} x={x} y={y} r={r} /> : null; });
  return (
    <Scene kind="kantor" to={{ z: 1.04 }}>
      <MyBank x={340} y={830} s={0.95} t={t} /><NetTower x={1600} y={830} s={0.8} t={t} beam={0} mood={b > 0.8 ? "happy" : "calm"} />
      <ServerGuy x={960} y={850} s={1.0} t={t} face="calm" arm={[190, -240]} armL={[-190, -240]} />
      {go1(a, [340, 430], 9, 38)}{go1(b, [1600, 330], 2, 28)}
    </Scene>
  );
};
/* s28 */
export const LeftoverShot: React.FC = () => {
  const { t, at } = useW();
  const m = back(t, at("markup", 1.6) - 0.7, 0.7);
  return (
    <Scene kind="kantor" from={{ z: 1.15, y: 560 }} to={{ z: 1.25, y: 570 }}>
      <ServerGuy x={620} y={840} s={1.15} t={t} face="neutral" look={26} />
      <Counter y={760} x={860} w={840} />
      <Pop x={1250} y={750} p={0.6 + 0.4 * m}><Stack x={1180} y={745} n={3} w={80} /><Gold x={1370} y={700} r={44} text="¢" /></Pop>
      <Glow2 x={1260} y={680} r={280} c={P.coin} o={0.5 * m} />
    </Scene>
  );
};
export const CurtainShot: React.FC = () => {
  const { t, at } = useW();
  const c = go(t, at("split", 2) - 1.2, 1.1);
  const Drape: React.FC<{ x: number; dir: number }> = ({ x, dir }) => <g transform={`translate(${x} 0) scale(0.5 1)`}><Shade d={`M0 150H${dir * 520}V800Q${dir * 460} 760 ${dir * 400} 800Q${dir * 330} 760 ${dir * 260} 800Q${dir * 190} 760 ${dir * 130} 800Q${dir * 60} 760 0 800Z`} tones={CORAL} L={LR} s={[6, 24, 12]}>{[130, 260, 400].map((a) => <path key={a} d={`M${dir * a} 150V800`} stroke={CORAL[1]} strokeWidth={22} />)}</Shade></g>;
  return (
    <Scene kind="kantor" to={{ z: 1.05 }}>
      <ServerGuy x={620} y={850} s={1.0} t={t} face="happy" look={22} arm={[220, -170]} />
      <ShopBank x={1360} y={850} s={0.9} t={t} />
      <Stack x={960} y={820} n={5} w={60} />
      <Drape x={mix(-380, 700, c)} dir={1} /><Drape x={mix(2300, 1220, c)} dir={-1} />
      {c > 0.9 && <g><circle cx={960} cy={480} r={96} fill="#fff4da" /><Txt x={960} y={528} s={130} c={P.navy}>?</Txt></g>}
      <path d={rr(430, 120, 1060, 46, 23)} fill={GOLD[2]} />
    </Scene>
  );
};
export const TugShot: React.FC = () => {
  const { t } = useW();
  const x = Math.sin(t * 4.2) * 70;
  return (
    <Scene kind="kantor" from={{ z: 1.08 }} to={{ z: 1.14 }}>
      <Owner x={580 + x} y={850} s={1.2} t={t} face="neutral" look={26} />
      <ServerGuy x={1360 + x} y={850} s={1.2} t={t} face="neutral" look={-24} />
      <Hand from={[720 + x, 660]} to={[870 + x, 600]} tones={TEALB} /><Hand from={[1220 + x, 660]} to={[1050 + x, 600]} tones={PURPLE} />
      <Gold x={960 + x} y={600} r={100} text="¢" sx={0.92 + Math.sin(t * 8) * 0.08} />
    </Scene>
  );
};
/* s29 */
export const BasicBackShot: React.FC = () => {
  const { t } = useW();
  const p = go(t, 0.15, 0.9);
  return (
    <Scene kind="toko" from={{ z: 1.15 }} to={{ z: 1.22 }}>
      <Counter y={800} />
      <Terminal x={900} y={790} s={1.35} t={t} on={seg(t, 1.1, 1.3)} />
      <Card x={mix(1700, 1010, p)} y={mix(650, 470, p)} s={1.15} rot={mix(25, -8, p)} t={t} />
      <Card x={mix(960, 300, p)} y={mix(470, 650, p)} s={0.9} rot={-20} premium t={t} />
      <Hand from={[1900, 1000]} to={[mix(1800, 1130, p), mix(740, 560, p)]} />
    </Scene>
  );
};
export const ShrinkBankShot: React.FC = () => {
  const { t, at } = useW();
  const p = go(t, at("drops", 2) - 0.8, 0.9);
  return (
    <Scene redup kind="toko" to={{ z: 1.05 }}>
      <PriceTag x={600} y={420} s={1.3} text="$2.75" sub="shop pays" />
      <Owner x={600} y={870} s={0.95} t={t} look={26} />
      <g transform={`translate(1300 850) scale(${mix(1.75, 1.0, p)})`}><Shade d="M-40 -190Q-140 -120 -128 -52Q-120 4 0 4Q120 4 128 -52Q140 -120 40 -190Z" tones={GOLD} L={LR} s={[7, 22, 12]} />{line("M-50 -190H50", WOOD[2], 14)}<Txt x={0} y={-52} s={72} c={WOOD[2]}>$</Txt></g>
      <MyBank x={1660} y={870} s={0.65} t={t} mood={p > 0.6 ? "shock" : "calm"} />
    </Scene>
  );
};
export const TwoPlatesShot: React.FC = () => {
  const { t, at } = useW();
  const a = back(t, at("thirty-nine", 2.6) - 1.0, 0.6), b = back(t, at("ninety-eight", 1) - 0.5, 0.6);
  const Plate: React.FC<{ x: number; n: number; premium?: boolean }> = ({ x, n, premium }) => <g><path d={rr(x - 340, 200, 680, 660, 44)} fill="#fff" opacity={0.14} /><Card x={x} y={340} s={1.0} premium={premium} t={t} /><ellipse cx={x} cy={760} rx={240} ry={48} fill="#e8f0ff" /><ellipse cx={x} cy={750} rx={200} ry={34} fill="#c0d6f0" /><Stack x={x} y={735} n={n} w={84} /></g>;
  return (
    <Scene kind="kantor" to={{ z: 1.04 }}>
      <Pop x={560} y={540} p={a}><Plate x={560} n={4} premium /></Pop>
      <Pop x={1360} y={540} p={b}><Plate x={1360} n={10} /></Pop>
      <ServerGuy x={960} y={880} s={0.6} t={t} face="happy" />
    </Scene>
  );
};
/* s30 */
export const SockSlipShot: React.FC = () => {
  const { t, at } = useW();
  const tb = at("backfire", 1), slip = go(t, tb - 0.4, 0.55);
  return (
    <Scene kind="kantor" from={{ z: 1.05 }} to={{ z: 1.12 }}>
      {[[820, 850, 8], [960, 850, -6], [1100, 850, 14], [900, 790, -18], [1040, 780, 10]].map(([x, y, r], i) => <Sock key={i} x={x} y={y} s={0.65} rot={r * 3} />)}
      <g transform={`translate(${mix(960, 1020, slip)} ${mix(640, 700, slip)}) rotate(${mix(0, 68, slip) + (slip < 1 ? Math.sin(t * 20) * 4 : 0)})`}><ServerGuy x={0} y={80} s={1.0} t={t} face={slip > 0.2 ? "shock" : "happy"} arm={[230, -300]} armL={[-230, -280]} /></g>
      {slip > 0.5 && [0, 1, 2].map((i) => <Gold key={i} x={700 - i * 90 - slip * 40} y={420 + i * 40 - Math.sin(t * 4 + i) * 20} r={30} text="¢" />)}
    </Scene>
  );
};
export const SockCoinShot: React.FC = () => {
  const { t, at } = useW();
  const f = at("five-dollar", 1), tn = at("ten", 3), a = back(t, f - 0.5), b = back(t, tn - 0.5, 0.7);
  return (
    <Scene kind="toko" from={{ z: 1.1 }} to={{ z: 1.18 }}>
      <Counter y={800} />
      <Pop x={560} y={780} p={a}><Sock x={560} y={782} s={1.35} /></Pop>
      <Card x={900} y={680} s={0.8} rot={-12} premium t={t} />
      <Pop x={1320} y={560} p={b}><Gold x={1320} y={560} r={190} text="10¢" /></Pop>
      {[0, 1, 2].map((i) => <Gold key={i} x={1600 + i * 80} y={740} r={34} text="¢" />)}
    </Scene>
  );
};
/* s31 */
const Balance: React.FC<{ t: number; tilt: number; left: number; right: number; children?: React.ReactNode }> = ({ tilt, left, right }) => {
  const end = (d: number): [number, number] => [960 + Math.cos(tilt * Math.PI / 180) * d, 380 + Math.sin(tilt * Math.PI / 180) * d];
  return (<g><Contact x={960} y={860} w={280} /><Shade d="M870 860L930 380H990L1050 860Z" tones={STEEL} L={LR} s={[5, 16, 9]} />{line(`M${end(-480).join(" ")}L${end(480).join(" ")}`, GOLD[2], 30)}<circle cx={960} cy={380} r={34} fill={GOLD[1]} />
    {[[-480, left], [480, right]].map(([d, n]) => { const [x, y] = end(d); return <g key={d}>{line(`M${x} ${y}L${x - 140} ${y + 250}M${x} ${y}L${x + 140} ${y + 250}`, "#e8f0ff", 6, 0.8)}<Stack x={x} y={y + 240} n={n} w={70} /><path d={`M${x - 170} ${y + 250}H${x + 170}Q${x + 120} ${y + 310} ${x} ${y + 310}Q${x - 120} ${y + 310} ${x - 170} ${y + 250}Z`} fill={TEALB[2]} /></g>; })}</g>);
};
export const ReceivedScaleShot: React.FC = () => {
  const { t, at } = useW();
  const p = go(t, at("eighteen", 2) - 1.0, 1.0);
  return (
    <Scene kind="kantor" to={{ z: 1.05 }}>
      <Balance t={t} tilt={-12 * p} left={Math.round(p * 7)} right={0} />
      <ServerGuy x={170} y={860} s={0.7} t={t} face="happy" look={26} />
    </Scene>
  );
};
export const BankHeavierShot: React.FC = () => {
  const { t, at } = useW();
  const p = go(t, at("twenty", 1.6) - 0.8, 0.9);
  return (
    <Scene kind="kantor" from={{ z: 1.05 }} to={{ z: 1.05 }}>
      <Balance t={t} tilt={mix(-12, 11, p) + (p > 0.9 ? Math.sin(t * 9) * 0.8 : 0)} left={7} right={Math.round(p * 9)} />
      <ServerGuy x={170} y={860} s={0.7} t={t} face={p > 0.7 ? "shock" : "happy"} look={26} />
      <MyBank x={1760} y={880} s={0.55} t={t} />
    </Scene>
  );
};
export const PocketShot: React.FC = () => {
  const { t, at } = useW();
  const f = at("five", 2.4), dig = go(t, 0.2, 0.8), pay = go(t, f - 0.7, 1.0);
  const [x, y] = arc([840, 700], [1330, 620], pay, 200);
  return (
    <Scene kind="kantor" from={{ z: 1.1 }} to={{ z: 1.18 }}>
      <ServerGuy x={720} y={850} s={1.4} t={t} face="shock" arm={pay > 0.05 ? [200 + pay * 80, -220] : [100, -80 + Math.sin(t * 8) * 14 * dig]} />
      {pay > 0.02 && <Gold x={x} y={y} r={56} text="5¢" />}
      <MyBank x={1500} y={850} s={0.9} t={t} hand={[-250, -240]} />
      {pay > 0.98 && <Gold x={x} y={y} r={56} text="5¢" />}
    </Scene>
  );
};
/* s32 */
export const SeesawShot: React.FC = () => {
  const { t, at } = useW();
  const p = back(t, at("bigger", 2) - 0.7, 0.9), a = mix(-13, 13, clamp(p)) + Math.sin(t * 3) * 1.2;
  return (
    <Scene kind="pagi" to={{ z: 1.05 }}>
      <path d="M-200 830H2120V1300H-200Z" fill="#5a8a6a" />
      <Shade d="M850 830L960 660L1070 830Z" tones={CORAL} L={LR} s={[5, 16, 9]} />
      <g transform={`translate(960 650) rotate(${a})`}><Shade d={rr(-700, -24, 1400, 48, 24)} tones={WOOD} L={LR} s={[4, 14, 9]} /><Sock x={-540} y={-26} s={0.75} /><Shoe x={500} y={-26} s={1.35} /></g>
    </Scene>
  );
};
export const TwoGridsShot: React.FC = () => {
  const { t, at } = useW();
  const f = at("four", 3), a = go(t, 0.3, 1.2), b = go(t, f - 1.0, 1.0);
  return (
    <Scene redup kind="toko" to={{ z: 1.03 }}>
      <path d={rr(220, 200, 640, 680, 40)} fill="#2c1250" opacity={0.88} /><path d={rr(1060, 200, 640, 680, 40)} fill="#2c1250" opacity={0.88} />
      <Shoe x={540} y={330} s={0.65} /><Sock x={1370} y={345} s={0.42} />
      <CoinGrid x={540} y={850} r={21} p={a} taken={a > 0.95 ? 3 : 0} />
      <CoinGrid x={1380} y={850} r={21} p={a} taken={Math.round(b * 4)} />
    </Scene>
  );
};
/* s33 */
export const YardArriveShot: React.FC = () => {
  const { t, at } = useW();
  const p = seg(t, 0, Math.max(1.4, at("arrives", 1.8)), Easing.out(Easing.cubic));
  return (
    <Scene kind="jalan" to={{ z: 1.08, x: 1050 }}>
      <Highway y={860} t={t} speed={100 * (1 - p)} />
      <ShopBank x={1480} y={800} s={1.35} t={t} mood={p > 0.9 ? "happy" : "calm"} />
      <Cart x={mix(0, 880, p)} y={865} s={1.15} t={t} rolling={p < 0.97} load={0.9} />
    </Scene>
  );
};
export const WideTallyShot: React.FC = () => {
  const { t, at } = useW();
  const a = at("hundred", 1.4), b = at("ninety-seven", 3.6);
  return (
    <Scene kind="malam" to={{ z: 1.0 }}>
      <MapBase t={t} cam={{ x: 960, y: 560, z: 1.06 }}>
        <Pop x={360} y={420} p={back(t, a - 0.4)}><Stack x={360} y={440} n={11} w={56} /></Pop>
        <Pop x={820} y={480} p={back(t, b - 1.0)}><Stack x={780} y={490} n={2} w={36} /></Pop>
        <Pop x={1140} y={480} p={back(t, b - 0.8)}><Stack x={1150} y={490} n={1} w={36} /></Pop>
        <Pop x={1560} y={420} p={back(t, b - 0.4)}><Stack x={1560} y={440} n={10} w={56} /></Pop>
      </MapBase>
    </Scene>
  );
};
export const PairsShot: React.FC = () => {
  const { t, at } = useW();
  const f = at("twenty-seven", 3.4);
  return (
    <Scene kind="toko" from={{ z: 1.02 }} to={{ z: 1.0 }}>
      <path d="M-300 830H2220V1300H-300Z" fill="#5a2c52" />
      {Array.from({ length: 60 }, (_, i) => <ShoeBox key={i} x={150 + (i % 10) * 90} y={830 - Math.floor(i / 10) * 88} s={0.62} c={[CORAL, TEALB, GOLD, BLUE, GREEN][(i * 3) % 5]} />)}
      {Array.from({ length: 27 }, (_, i) => { const u = go(t, f - 1.4 + i * 0.05, 0.8); const [x, y] = arc([600 + (i % 5) * 60, 500], [1220 + (i % 7) * 92, 790 - Math.floor(i / 7) * 88], u, 240); return u > 0 ? <g key={i} transform={`translate(${x} ${y}) rotate(${(1 - u) * 200}) translate(${-x} ${-y})`}><ShoeBox x={x} y={y} s={0.62} c={GOLD} /></g> : null; })}
    </Scene>
  );
};
/* s34 */
export const DuskMapShot: React.FC = () => {
  const { t } = useW();
  const d = go(t, 0.3, 2.0);
  return (
    <Scene kind="malam">
      <MapBase t={t} cam={{ x: 960, y: 550, z: mix(1.05, 1.15, d) }} />
      <rect x={-600} y={-700} width={3200} height={2600} fill="#060a20" opacity={0.5 * d} />
      <Glow2 x={960} y={800} r={260} c="#b490e8" o={0.5 * d} />
    </Scene>
  );
};
export const QueueShot: React.FC = () => {
  const { t, at } = useW();
  const w = at("without", 2), p = back(t, Math.max(0.2, w - 1.3), 0.8);
  return (
    <Scene kind="toko" from={{ z: 1.12, x: 860 }} to={{ z: 1.05, x: 1020 }}>
      <Counter y={800} x={0} w={760} />
      <Terminal x={540} y={790} s={0.85} t={t} on={1} />
      <You x={950} y={880} s={1.1} t={t} face="happy" look={-30} arm={[-250, -230]} />
      <Card x={690} y={620} s={0.65} rot={-12} t={t} />
      <g transform={`translate(${mix(900, 0, p)} 0)`}><CashMan x={1480} y={880} s={1.1} t={t} look={-30} arm={[-150, -200]} /><Bill x={1290} y={655} s={0.9} rot={-10} /></g>
    </Scene>
  );
};
/* s35 */
export const SamePriceShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const c = at("cash", 2), a = back(t, 0.2), b = back(t, c - 0.5);
  const A: [number, number] = v ? [960, 330] : [550, 480], B: [number, number] = v ? [960, 660] : [1370, 480], s = v ? 0.85 : 1.25;
  return (
    <Scene redup kind="toko" to={{ z: 1.06 }}>
      <Pop x={A[0]} y={A[1]} p={a}><PriceTag x={A[0]} y={A[1]} s={s} text="$100" rot={-3} /><Card x={v ? 790 : A[0]} y={v ? 495 : A[1] + 250} s={v ? 0.65 : 0.95} t={t} rot={-6} /></Pop>
      <Pop x={B[0]} y={B[1]} p={b}><PriceTag x={B[0]} y={B[1]} s={s} text="$100" rot={3} /><Bill x={v ? 1130 : B[0]} y={v ? 495 : B[1] + 250} s={v ? 0.8 : 1.25} rot={7} /></Pop>
      {b > 0.8 && !v && <g>{line("M920 460H1000M920 505H1000", "#fff4da", 22)}</g>}
    </Scene>
  );
};
export const TollInsideShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const p = go(t, at("toll", 2) - 1.0, 1.0);
  const s = v ? 1.15 : 2.1;
  return (
    <Scene redup kind="toko" from={{ z: 1.0 }} to={{ z: 1.1 }}>
      <g transform={`translate(960 500) scale(${s})`}>
        <PriceTag x={0} y={0} text="" />
        <g opacity={1 - p}><Txt x={-26} y={30} s={92} c={P.navy}>$100</Txt></g>
        <g opacity={p}><path d={rr(-190, -62, 330, 124, 30)} fill="#6a3340" /><Gold x={-112} y={0} r={44} text="¢" /><Gold x={-20} y={8} r={38} text="¢" /><Gold x={68} y={-4} r={42} text="¢" /></g>
      </g>
      <Glow2 x={900} y={500} r={v ? 320 : 480} c={P.coin} o={0.45 * p} />
    </Scene>
  );
};
/* s36 */
export const CashPayShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const c = at("cash", 1.6), p = go(t, c - 0.8, 0.9);
  const man = v ? 1120 : 1330, own = v ? 790 : 590;
  const [bx, by] = arc([man - 160, 620], [own + 170, 620], p, v ? 90 : 160);
  return (
    <Scene kind="toko" from={{ z: 1.08 }} to={{ z: 1.14 }}>
      <Owner x={own} y={810} s={v ? 0.8 : 1.15} t={t} face={p > 0.9 ? "happy" : "neutral"} look={26} />
      <Counter y={790} />
      <Shoe x={960} y={778} s={v ? 0.6 : 1.0} />
      <CashMan x={man} y={900} s={v ? 0.82 : 1.15} t={t} look={-30} arm={[-140, -230]} />
      <Bill x={bx} y={by} s={v ? 0.75 : 1.15} rot={-8 + p * 12} />
    </Scene>
  );
};
export const EmptyRoadShot: React.FC = () => {
  const { t, vertical: v } = useW();
  return (
    <Scene kind="jalan" from={{ z: 1.02 }} to={{ z: 1.08 }}>
      <Highway y={730} t={t} speed={14} />
      <TollGate x={v ? 1070 : 1420} y={690} s={v ? 0.85 : 1.1} t={t} />
      <CashMan x={v ? 850 : 640} y={900} s={v ? 0.75 : 1.0} t={t} look={18} />
      {[0, 1].map((i) => <ellipse key={i} cx={((t * 70 + i * 900) % 2200) - 100} cy={720 - Math.abs(Math.sin(t * 3 + i)) * 20} rx={26} ry={18} fill="#c8a87a" opacity={0.6} />)}
    </Scene>
  );
};
export const ShadowCoinShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const n = at("points", 2.4), p = go(t, 0.3, Math.max(1.6, n - 0.2));
  const from: [number, number] = v ? [840, 640] : [520, 620], to: [number, number] = v ? [1110, 560] : [1400, 520];
  const [x, y] = arc(from, to, p, 240);
  return (
    <Scene kind="malam" to={{ z: 1.05 }}>
      <CashMan x={v ? 830 : 440} y={880} s={v ? 0.75 : 1.1} t={t} face={p > 0.7 ? "shock" : "neutral"} look={24} />
      <You x={v ? 1130 : 1500} y={880} s={v ? 0.75 : 1.1} t={t} face={p > 0.85 ? "happy" : "neutral"} look={-30} />
      {Array.from({ length: 6 }, (_, i) => { const [a, b] = arc(from, to, clamp(p - i * 0.06), 240); return p > i * 0.06 ? <circle key={i} cx={a} cy={b} r={26 - i * 3} fill="#b490e8" opacity={0.35 - i * 0.05} /> : null; })}
      <g opacity={0.9}><Glow2 x={x} y={y} r={130} c="#b490e8" o={0.8} /><Gold x={x} y={y} r={v ? 40 : 56} text="¢" op={0.85} /></g>
      <Stack x={v ? 1210 : 1700} y={870} n={3 + Math.round(go(t, n, 0.5) * 2)} w={v ? 36 : 56} />
    </Scene>
  );
};
/* s37 */
const MiniHouse: React.FC<{ x: number; y: number; s?: number; c: Tones; cards?: number; t: number }> = ({ x, y, s = 1, c, cards = 0, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><Contact x={0} y={4} w={150} /><Shade d={rr(-110, -150, 220, 150, 10)} tones={CREAM} L={LR} s={[5, 16, 9]} /><Shade d="M-150 -140L0 -262L150 -140Z" tones={c} L={LR} s={[4, 14, 8]} /><path d={rr(-30, -80, 60, 80, 22, 4)} fill="#6a3340" /><path d={rr(-84, -112, 36, 36, 10)} fill="#ffd27a" /><path d={rr(48, -112, 36, 36, 10)} fill="#ffd27a" />{Array.from({ length: cards }, (_, i) => <Card key={i} x={-60 + i * 60} y={-290 - (i % 2) * 20} s={0.28} rot={-14 + i * 10} premium={i % 2 === 0} t={t} />)}</g>
);
export const Study2010Shot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const y = at("2010", 0.8), line1 = go(t, 0.1, Math.max(0.8, y)), mag = go(t, y + 0.3, 2.4);
  return (
    <Scene kind="pagi" to={{ z: 1.05 }}>
      <path d="M-200 830H2120V1300H-200Z" fill="#4a7a6a" />
      {line(`M200 260H${mix(200, 1720, line1)}`, "#fff4da", 18)}{[200, 580, 960, 1340, 1720].map((x, i) => <circle key={x} cx={x} cy={260} r={i === 2 ? 30 * back(t, y - 0.3) + 12 : 14} fill={i === 2 ? P.coral : "#fff4da"} />)}
      {(v ? [820, 1100] : [360, 760, 1160, 1560]).map((x, i) => <MiniHouse key={x} x={x} y={830} s={v ? 0.8 : 1} c={[CORAL, BLUE, GREEN, GOLD][i]} t={t} />)}
      <g transform={`translate(${mix(v ? 800 : 300, v ? 1110 : 1450, mag)} ${(v ? 640 : 650) + Math.sin(mag * 9) * 40}) scale(${v ? 0.75 : 1})`}><circle r={150} fill="#bfe8ff" opacity={0.3} /><circle r={150} fill="none" stroke={STEEL[1]} strokeWidth={30} />{line("M108 108L210 210", WOOD[2], 46)}{line("M-90 -50Q-60 -100 -10 -104", "#fff", 14, 0.8)}</g>
    </Scene>
  );
};
export const HouseTransferShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const f = at("fifty", 2.2), A = v ? 810 : 450, B = v ? 1115 : 1470, k = v ? 0.85 : 1.5;
  return (
    <Scene kind="pagi" to={{ z: v ? 1.0 : 1.05 }}>
      <MiniHouse x={A} y={820} s={k} c={BLUE} t={t} /><Bill x={A} y={v ? 480 : 300} s={v ? 0.7 : 0.9} text="$" />
      <MiniHouse x={B} y={820} s={k} c={CORAL} cards={3} t={t} />
      {[0, 1, 2].map((i) => { const u = ((t * 0.4 + i / 3) % 1); const [x, y] = arc([v ? A + 40 : 620, 560], [v ? B - 40 : 1300, 560], u, v ? 220 : 280); return t > f - 1.6 + i * 0.2 ? <g key={i} transform={`translate(${x} ${y}) rotate(${Math.sin(u * 6) * 10}) scale(${v ? 0.75 : 1})`}><Env /></g> : null; })}
      <g>{Array.from({ length: v ? 8 : 12 }, (_, i) => { const x0 = (v ? 732 : 620) + i * 58; return <g key={i}><path d={rr(x0, v ? 870 : 790, 46, 56, 10)} fill="#fff4da" /><path d={rr(x0, v ? 870 : 790, 46, 16, 8)} fill={CORAL[2]} />{t > 0.6 + i * 0.22 && <circle cx={x0 + 23} cy={(v ? 870 : 790) + 37} r={11} fill={GREEN[2]} />}</g>; })}</g>
    </Scene>
  );
};
/* s38 */
export const HousesRowShot: React.FC = () => {
  const { t, at } = useW();
  const r = at("rise", 1.8);
  return (
    <Scene kind="pagi" from={{ z: 1.1, x: 800 }} to={{ z: 1.0, x: 960 }}>
      <path d="M-200 830H2120V1300H-200Z" fill="#4a7a6a" />
      {[0, 1, 2, 3, 4].map((i) => { const x = 220 + i * 370, s = 0.6 + i * 0.22; return <g key={i}><MiniHouse x={x} y={830} s={s} c={[BLUE, GREEN, TEALB, GOLD, CORAL][i]} t={t} />{back(t, r - 1.0 + i * 0.25) > 0.1 && Array.from({ length: i }, (_, k) => <Card key={k} x={x - (i - 1) * 26 + k * 52} y={830 - 320 * s - (k % 2) * 40 - 30} s={0.34 * back(t, r - 1.0 + i * 0.25)} rot={-12 + k * 8} premium={k % 2 === 0} t={t} />)}</g>; })}
    </Scene>
  );
};
export const LowerToHigherShot: React.FC = () => {
  const { t, at } = useW();
  const p = go(t, at("lower-income", 2.4) - 1.2, 1.4);
  return (
    <Scene kind="malam" to={{ z: 1.05 }}>
      <MiniHouse x={460} y={820} s={0.95} c={BLUE} t={t} /><MiniHouse x={1440} y={820} s={1.65} c={CORAL} cards={3} t={t} />
      <path d="M580 600C800 250 1050 200 1260 380" pathLength={100} strokeDasharray={`${p * 100} 100`} stroke={P.coin} strokeWidth={10} opacity={0.5} fill="none" strokeLinecap="round" />
      {p > 0.9 && [0, 1, 2, 3, 4, 5].map((i) => { const u = (t * 0.3 + i / 6) % 1, q = 1 - u; const x = q * q * q * 580 + 3 * q * q * u * 800 + 3 * q * u * u * 1050 + u * u * u * 1260, y = q * q * q * 600 + 3 * q * q * u * 250 + 3 * q * u * u * 200 + u * u * u * 380; return <Gold key={i} x={x} y={y} r={26} />; })}
    </Scene>
  );
};
export const _s3 = { Lines, Paper, Tick, pop, circ, COPPER };
