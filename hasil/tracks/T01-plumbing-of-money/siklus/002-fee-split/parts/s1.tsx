// T01-002 s01-s12: tap di kasir, peta jalan tol, gerbang, empat tangan.
import React from "react";
import { Easing } from "remotion";
import { R, clamp, mix, pop, seg } from "@r3";
import { Shade, rr } from "@r3/art";
import { BLUE, CORAL, CREAM, Contact, DARK, GOLD, GREEN, Glow2, LR, P, STEEL, TEALB, WOOD, You, Owner, circ, line, Tick } from "./kit";
import { NetTower, Stack, Txt, Coin, Cross } from "./benda";
import { BankHouse, TownBoard } from "./peta";
import { Bill, Card, Cart, CashMan, CoinGrid, Counter, Gold, Hand, Highway, Lines, MyBank, Paper, Sack, Scene, ServerGuy, Shoe, ShopBank, Sticker2, Terminal, TollGate, Waves, arc, back, go, useW } from "./dunia";

export const Pop: React.FC<{ x: number; y: number; p: number; children: React.ReactNode }> = ({ x, y, p, children }) => p <= 0.001 ? null : <g transform={`translate(${x} ${y}) scale(${p}) translate(${-x} ${-y})`}>{children}</g>;
export const Clock: React.FC<{ x: number; y: number; r?: number; hour: number }> = ({ x, y, r = 130, hour }) => (
  <g transform={`translate(${x} ${y})`}><Shade d={circ(0, 0, r)} tones={GOLD} L={LR} s={[5, 15, 9]} /><circle r={r * 0.8} fill={P.cream} />{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M0 ${-r * 0.7}V${-r * 0.6}`} stroke={P.navy} strokeWidth={r * 0.05} strokeLinecap="round" transform={`rotate(${i * 30})`} />)}<g transform={`rotate(${hour * 30})`}>{line(`M0 8V${-r * 0.4}`, P.navy, r * 0.1)}</g><g transform={`rotate(${(hour % 1) * 360})`}>{line(`M0 8V${-r * 0.62}`, P.coral, r * 0.07)}</g><circle r={r * 0.07} fill={P.navy} /></g>
);
const Building: React.FC<{ k: number; x: number; y: number; t: number; lit: number }> = ({ k, x, y, t, lit }) => (
  <g opacity={0.25 + 0.75 * lit}>{lit > 0.3 && <Glow2 x={x} y={y - 140} r={230} c="#ffd98a" o={0.5 * lit} />}
    {k === 0 ? <MyBank x={x} y={y} s={0.62} t={t} lit={lit} /> : k === 1 ? <NetTower x={x} y={y} s={0.55} t={t} beam={0} /> : k === 2 ? <ServerGuy x={x} y={y} s={0.75} t={t} face="happy" /> : <ShopBank x={x} y={y} s={0.62} t={t} />}
  </g>
);

/* s01 */
export const TapShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const tTap = at("tap", 0.5), t4 = at("four", 3);
  const move = go(t, Math.max(0, tTap - 0.5), 0.55), on = seg(t, tTap, tTap + 0.2);
  const tx = 900, hand: [number, number] = [mix(v ? 1150 : 1420, tx + 60, move), mix(720, 560, move)];
  return (
    <Scene kind="toko" from={{ z: 1.12, y: 570 }} to={{ z: 1.02 }}>
      {[0, 1, 2, 3].map((i) => <Pop key={i} x={(v ? [735, 885, 1035, 1180] : [250, 560, 1330, 1660])[i]} y={v ? 430 : 560} p={back(t, t4 + i * 0.18) * (v ? 0.62 : 1)}><Building k={i} x={(v ? [735, 885, 1035, 1180] : [250, 560, 1330, 1660])[i]} y={v ? 430 : 560} t={t} lit={go(t, t4 + i * 0.22, 0.4)} /></Pop>)}
      <Counter y={780} />
      <Shoe x={v ? 790 : 540} y={768} s={v ? 0.7 : 1.15} />
      <Terminal x={tx} y={770} s={1.25} t={t} on={on} />
      <Waves x={tx} y={490} t={t} at={tTap} />
      <You x={v ? 1150 : 1560} y={v ? 1000 : 1030} s={v ? 0.8 : 1.2} t={t} face={on > 0.5 ? "happy" : "neutral"} look={-30} arm={[(hand[0] - (v ? 1150 : 1560)) / (v ? 0.8 : 1.2) + 60, (hand[1] - (v ? 1000 : 1030)) / (v ? 0.8 : 1.2) + 30]} />
      <Card x={hand[0]} y={hand[1]} s={0.85} rot={mix(18, -10, move)} t={t} />
    </Scene>
  );
};
export const SplitCoinsShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const tNine = at("ninety-seven", 1.2);
  const fly = go(t, 0.35, 1.6), slide = go(t, tNine - 0.4, 0.8);
  const bx = mix(960, v ? 880 : 760, slide);
  return (
    <Scene kind="toko" from={{ z: 1.1, y: 560 }} to={{ z: 1.18 }}>
      <Counter y={780} />
      {!v && <Owner x={330} y={800} s={1.05} t={t} face={slide > 0.6 ? "happy" : "neutral"} look={20} />}
      <Contact x={bx} y={768} w={190} />
      {[-110, 0, 110].map((d, i) => <Stack key={d} x={bx + d} y={760} n={i === 1 ? 11 : 8} w={56} />)}
      {[0, 1, 2].map((i) => { const [x, y] = arc([bx + 130, 560], [v ? 1190 : 1520 + i * 80, 260 + i * 70], fly, 180 + i * 50); return <g key={i}>{line(`M${bx + 130} 560Q${(bx + x) / 2 + 200} ${y - 150} ${x} ${y}`, "#fff0a0", 5, 0.35 * fly)}<Gold x={x} y={y} r={34 - i * 4} sx={Math.max(0.3, Math.abs(Math.cos(t * 4 + i)))} /></g>; })}
    </Scene>
  );
};
/* s02 */
export const NoonShot: React.FC = () => {
  const { t, at } = useW();
  const tN = at("noon", 0.6), hour = mix(8.5, 12, go(t, 0.1, Math.max(0.6, tN)));
  const lift = back(t, at("premium", 1.6) - 0.4, 0.6);
  return (
    <Scene kind="toko" from={{ z: 1.0 }} to={{ z: 1.1, y: 520 }}>
      <Clock x={560} y={350} r={190} hour={hour} />
      <Counter y={800} />
      <Terminal x={860} y={790} s={1.05} t={t} />
      <You x={1520} y={1080} s={1.2} t={t} look={-26} arm={[-190, -330]} />
      <Card x={1260} y={mix(760, 650, lift)} s={1.25} rot={-12 + Math.sin(t * 2) * 3} premium t={t} glow={lift} />
    </Scene>
  );
};
export const BeepShot: React.FC = () => {
  const { t, at } = useW();
  const tB = at("beeps", 0.5), move = go(t, Math.max(0, tB - 0.45), 0.45), still = seg(t, tB + 0.9, tB + 1.6);
  const cx = mix(1330, 990, move), cy = mix(700, 480, move);
  return (
    <Scene kind="toko" from={{ z: 1.2, y: 520 }} to={{ z: 1.32, y: 500 }}>
      <Counter y={820} />
      <Terminal x={900} y={810} s={1.5} t={t} on={seg(t, tB, tB + 0.15)} />
      <Waves x={900} y={440} t={t} at={tB} n={4} />
      <Hand from={[1750, 1060]} to={[cx + 110, cy + 90]} w={52} />
      <Card x={cx} y={cy} s={1.15} rot={mix(10, -8, move)} premium t={t * (1 - still)} />
      {still > 0 && [0, 1, 2].map((i) => <circle key={i} cx={1210 + i * 60} cy={330} r={15} fill="#fff" opacity={still * (0.35 + 0.65 * Math.max(0, Math.sin(t * 5 - i)))} />)}
    </Scene>
  );
};
/* s03 */
export const LeapShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const tS = at("seventy-five", 1.4), up = back(t, tS - 0.5, 0.8);
  return (
    <Scene kind="toko" from={{ z: 1.08 }} to={{ z: 1.18, y: 500 }}>
      <Counter y={790} />
      <Terminal x={v ? 790 : 520} y={780} s={v ? 0.8 : 1.15} t={t} on={1} />
      {[-70, 70].map((d) => <Stack key={d} x={v ? 1100 : 1330 + d} y={770} n={v && d < 0 ? 0 : 12} w={v ? 46 : 62} />)}
      {up > 0 && <Glow2 x={960} y={380} r={360} c={P.coin} o={0.55 * up} />}
      {Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * 6.283 + t * 0.9, [x, y] = arc([v ? 1090 : 1330, 640], [960 + Math.cos(a) * (v ? 150 : 210), 380 + Math.sin(a) * 90], clamp(up), 120); return <Gold key={i} x={x} y={y} r={(v ? 40 : 52) + Math.sin(a) * 8} sx={Math.max(0.35, Math.abs(Math.cos(t * 3 + i * 0.7)))} />; })}
    </Scene>
  );
};
export const TwoStreamShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const t1 = at("twenty", 1), t2 = at("sixteen", 3);
  const L = v ? 790 : 430, Rx = v ? 1140 : 1500, src: [number, number] = [960, 330];
  const Stream: React.FC<{ to: [number, number]; at0: number; n: number; r: number }> = ({ to, at0, n, r }) => <g>{Array.from({ length: n }, (_, i) => { const p = seg(t, at0 - 0.5 + i * 0.09, at0 + 0.45 + i * 0.09, Easing.in(Easing.sin)); if (p <= 0 || p >= 1) return null; const [x, y] = arc(src, to, p, 140); return <Gold key={i} x={x} y={y} r={r} sx={Math.max(0.35, Math.abs(Math.cos(t * 4 + i)))} />; })}</g>;
  return (
    <Scene kind="jalan" from={{ z: 1.05 }} to={{ z: 1.0 }}>
      <Highway y={820} t={t} />
      <MyBank x={L} y={760} s={v ? 0.75 : 1.15} t={t} mood={t > t1 + 0.5 ? "happy" : "neutral"} />
      <NetTower x={Rx} y={760} s={v ? 0.62 : 0.85} t={t} beam={0} mood={t > t2 + 0.4 ? "calm" : "neutral"} />
      <Gold x={src[0]} y={src[1]} r={v ? 70 : 90} />
      <Stream to={[L, 600]} at0={t1} n={10} r={v ? 30 : 40} /><Stream to={[Rx, 450]} at0={t2} n={3} r={v ? 22 : 28} />
    </Scene>
  );
};
export const SmallSlicesShot: React.FC = () => {
  const { t, at, vertical: v } = useW();
  const t39 = at("thirty-nine", 1), a = back(t, 0.15, 0.6), b = back(t, 0.45, 0.6);
  const L = v ? 825 : 640, Rx = v ? 1115 : 1300;
  return (
    <Scene kind="jalan" from={{ z: 1.05, x: 900 }} to={{ z: 1.12, x: 1000 }}>
      <Highway y={830} t={t} />
      <Pop x={L} y={770} p={a}><ServerGuy x={L} y={770} s={v ? 0.7 : 1.25} t={t} face="happy" look={14} /></Pop>
      <Pop x={Rx} y={770} p={b}><ShopBank x={Rx} y={770} s={v ? 0.6 : 1.1} t={t} /></Pop>
      {[0, 1].map((i) => { const p = go(t, t39 - 0.4 + i * 0.15, 0.7), [x, y] = arc([960, 180], [i ? Rx : L, 360], p, 80); return p > 0 ? <Gold key={i} x={x} y={y} r={v ? 40 : 52} text="¢" /> : null; })}
    </Scene>
  );
};

/* s04-s05, s11: peta */
export const MapBase: React.FC<{ t: number; cam: { x: number; y: number; z: number }; road?: number; me?: number; shop?: number; them?: number; children?: React.ReactNode }> = ({ t, cam, road = 1, me = 1, shop = 1, them = 1, children }) => (
  <TownBoard t={t} cam={cam}>
    <path d="M400 770Q960 900 1520 770" pathLength={100} strokeDasharray={`${road * 100} 100`} stroke="#8a5a52" strokeWidth={56} fill="none" strokeLinecap="round" />
    <path d="M400 770Q960 900 1520 770" pathLength={100} strokeDasharray={`${road * 100} 100`} stroke="#ffd27a" strokeWidth={34} fill="none" strokeLinecap="round" />
    {road > 0.98 && <path d="M400 770Q960 900 1520 770" stroke="#fff6d8" strokeWidth={7} strokeDasharray="24 48" strokeDashoffset={-t * 80} fill="none" />}
    <MyBank x={360} y={720} s={0.9} t={t} lit={me} mood={me > 0.6 ? "happy" : "neutral"} />
    <g opacity={0.35 + 0.65 * shop}><g transform="translate(960 640)"><Contact x={0} y={4} w={150} /><Shade d={rr(-120, -150, 240, 150, 10)} tones={CREAM} L={LR} s={[5, 16, 9]} /><path d={rr(-40, -92, 80, 92, 28, 4)} fill="#6a3340" /><Shade d="M-150 -142L-110 -214H110L150 -142Z" tones={CORAL} L={LR} s={[4, 12, 7]} />{[-110, -55, 0, 55, 110].map((a) => <path key={a} d={`M${a - 28} -144q28 36 56 0Z`} fill="#fff4da" />)}</g></g>
    <g opacity={0.35 + 0.65 * them}><ShopBank x={1560} y={720} s={0.9} t={t} /></g>
    {children}
  </TownBoard>
);
export const MapIntroShot: React.FC = () => {
  const { t, dur } = useW();
  const p = seg(t, 0, dur, Easing.inOut(Easing.sin));
  return (
    <Scene kind="malam" from={{ z: 1.0 }} to={{ z: 1.0 }}>
      <MapBase t={t} cam={{ x: 960, y: mix(660, 540, p), z: mix(1.2, 1.0, p) }} road={0} me={go(t, 0.2)} shop={go(t, 0.9)} them={go(t, 1.4)} />
    </Scene>
  );
};
export const VaultFaceShot: React.FC = () => {
  const { t, at } = useW();
  const tB = at("bank", 1);
  return (
    <Scene kind="jalan" from={{ z: 1.15, x: 880 }} to={{ z: 1.3, x: 900, y: 560 }}>
      <Highway y={850} t={t} speed={0} />
      <MyBank x={900} y={780} s={1.55} t={t} mood="happy" hand={[270, -170 + Math.sin(t * 5) * 20]} />
      <Pop x={1450} y={600} p={back(t, tB, 0.5)}><Stack x={1430} y={780} n={14} w={70} /></Pop>
    </Scene>
  );
};
export const RoadDrawShot: React.FC = () => {
  const { t, at } = useW();
  const tE = at("ends", 0.3), tS = at("shop's", 1.4), p = go(t, tE, 1.8);
  return (
    <Scene kind="malam" to={{ z: 1.0 }}>
      <MapBase t={t} cam={{ x: mix(860, 1080, go(t, tE, 2.4)), y: 560, z: 1.08 }} road={p} them={go(t, tS - 0.2)}>
        <Glow2 x={mix(400, 1520, p)} y={790 + Math.sin(p * Math.PI) * 60} r={90} c={P.coin} o={p < 1 ? 0.9 : 0} />
      </MapBase>
    </Scene>
  );
};
export const EmptyTillShot: React.FC = () => {
  const { t, at } = useW();
  const open = back(t, Math.max(0.2, at("till", 1.4) - 0.7), 0.6);
  return (
    <Scene kind="toko" from={{ z: 1.1 }} to={{ z: 1.18 }}>
      <Counter y={820} />
      <Owner x={560} y={820} s={1.15} t={t} face={open > 0.8 ? "shock" : "neutral"} look={26} />
      <g transform="translate(1120 800)"><Contact x={0} y={4} w={260} /><Shade d={rr(-170, -260, 340, 180, 24)} tones={TEALB} L={LR} s={[6, 20, 10]} /><path d={rr(-100, -228, 200, 76, 14)} fill="#bfe8ff" /><Shade d={rr(-200, -96, 400, 96, 14)} tones={STEEL} L={LR} s={[5, 16, 8]} />
        <g transform={`translate(0 ${open * 76})`}><path d={rr(-190, -86, 380, 82, 12)} fill="#23305a" />{[0, 1, 2, 3].map((i) => <path key={i} d={rr(-174 + i * 90, -72, 76, 54, 10)} fill="#0c1230" />)}<path d={rr(-60, -6, 120, 18, 8)} fill="#c0d6f0" /></g>
      </g>
    </Scene>
  );
};
export const LaterShot: React.FC = () => {
  const { t, at, dur } = useW();
  const p = seg(t, 0.1, Math.max(1.6, dur - 0.5), Easing.inOut(Easing.sin)), arrive = at("later", 1) + 0.5;
  const ang = Math.PI * (1 + p * 2), sx = 960 + Math.cos(ang) * 720, sy = 640 + Math.sin(ang) * 480;
  const night = Math.sin(Math.min(1, Math.max(0, (p - 0.25) * 2)) * Math.PI);
  return (
    <Scene kind="pagi" to={{ z: 1.02 }}>
      <rect x={-600} y={-700} width={3200} height={1330} fill="#0b1130" opacity={0.75 * night} />
      <Glow2 x={sx} y={sy} r={190} c="#ffe08a" o={0.8} /><circle cx={sx} cy={sy} r={52} fill="#ffe9a0" />
      <Highway y={820} t={t} speed={0} />
      <ShopBank x={1520} y={760} s={1.05} t={t} mood={t > arrive ? "happy" : "calm"} />
      <Cart x={mix(220, 1180, go(t, 0.2, Math.max(1.5, arrive - 0.1)))} y={860} s={0.9} t={t} rolling={t < arrive} />
    </Scene>
  );
};
/* s06 */
export const GridCartShot: React.FC = () => {
  const { t, at } = useW();
  const th = at("hundred", 1), p = seg(t, th - 0.9, th + 0.6, Easing.linear), roll = go(t, th + 0.8, 2);
  return (
    <Scene kind="jalan" from={{ z: 1.05 }} to={{ z: 1.0 }}>
      <Highway y={840} t={t} speed={roll > 0 ? 130 : 0} />
      <MyBank x={mix(280, -80, roll)} y={780} s={0.85} t={t} />
      <Cart x={mix(900, 1120, roll)} y={830} s={1.7} t={t} grid load={p} rolling={roll > 0.05} />
    </Scene>
  );
};
export const GatesShot: React.FC = () => {
  const { t, at } = useW();
  const tg = at("gate", 0.7);
  return (
    <Scene kind="jalan" from={{ z: 1.1, x: 800 }} to={{ z: 1.0, x: 960 }}>
      <Highway y={810} t={t} />
      <MyBank x={170} y={750} s={0.65} t={t} /><ShopBank x={1760} y={750} s={0.65} t={t} />
      {[560, 960, 1360].map((x, i) => <Pop key={x} x={x} y={760} p={back(t, tg - 0.5 + i * 0.28)}><TollGate x={x - 80} y={760} s={1.1} t={t} open={0} mood="neutral" /></Pop>)}
      <Cart x={mix(250, 440, go(t, 0, 2.5))} y={870} s={0.75} t={t} rolling />
    </Scene>
  );
};
/* s07 */
export const WatchTowerShot: React.FC = () => {
  const { t } = useW();
  return (
    <Scene kind="malam" from={{ z: 1.15, y: 460 }} to={{ z: 1.0 }}>
      <path d="M520 800Q960 520 1400 800Z" fill="#2a4a6a" />
      <NetTower x={960} y={690} s={1.05} t={t} mood="calm" sweep={90 + Math.sin(t * 1.1) * 55} />
      <Highway y={830} t={t} />
      {[0, 1].map((i) => <Cart key={i} x={((t * 190 + i * 1000 + 200) % 2300) - 180} y={870} s={0.55} t={t} rolling />)}
    </Scene>
  );
};
export const EightyShot: React.FC = () => {
  const { t, at } = useW();
  const te = at("eighty", 2);
  return (
    <Scene kind="malam" to={{ z: 1.05 }}>
      <Highway y={560} t={t} /><Highway y={830} t={t} />
      <path d="M20 880Q60 640 230 640Q400 640 450 880Z" fill="#2a4a6a" /><path d="M80 760Q130 660 230 656" stroke="#5a8ab0" strokeWidth={10} fill="none" strokeLinecap="round" />
      <NetTower x={230} y={730} s={0.95} t={t} mood="calm" beam={0.55} sweep={14 + Math.sin(t) * 12} />
      {Array.from({ length: 10 }, (_, i) => { const x = 620 + (i % 5) * 262, y = i < 5 ? 600 : 870, on = i < 9 ? go(t, te - 0.6 + i * 0.1, 0.3) * (i < 8 ? 1 : 0.35) : 0;
        return <g key={i} opacity={i < 9 ? 1 : 0.6}>{on > 0 && <Glow2 x={x} y={y - 80} r={170} c="#7dffb8" o={0.8 * on} />}<Cart x={x} y={y} s={0.55} t={t} />{on > 0.5 && <Tick x={x} y={y - 190} r={34} p={pop(t, te - 0.4 + i * 0.1, 0.3)} />}</g>; })}
    </Scene>
  );
};
/* s08 */
export const PriceListShot: React.FC = () => {
  const { t, at } = useW();
  const un = back(t, 0.15, 0.9), tm = at("message", 2.4);
  return (
    <Scene kind="jalan" from={{ z: 1.05 }} to={{ z: 1.12 }}>
      <Highway y={840} t={t} />
      <TollGate x={520} y={790} s={1.75} t={t} mood="calm" />
      <Paper x={1050} y={250} w={340} h={Math.max(60, 500 * un)} rot={3}>{un > 0.7 && [0, 1, 2, 3, 4].map((i) => <g key={i}><Gold x={-110} y={70 + i * 84} r={28} text="¢" /><Lines x={-60} y={58 + i * 84} w={190} n={1} /></g>)}</Paper>
      <path d={rr(860, 222, 380, 44, 22)} fill={WOOD[2]} />
      {[0, 1, 2].map((i) => { const u = ((t - tm) * 0.5 + i * 0.33) % 1; return t > tm - 0.3 ? <g key={i} transform={`translate(${mix(-200, 2100, u)} ${150 + Math.sin(u * 9) * 40}) rotate(${Math.sin(u * 12) * 10}) scale(0.8)`}><Shade d={rr(-80, -52, 160, 104, 14)} tones={CREAM} L={LR} s={[3, 9, 6]} />{line("M-74 -44L0 12L74 -44", CREAM[0], 7)}</g> : null; })}
    </Scene>
  );
};
export const BanksHandsShot: React.FC = () => {
  const { t, at } = useW();
  const tb = at("banks", 1.5), reach = back(t, tb - 0.6, 0.7);
  return (
    <Scene kind="jalan" from={{ z: 1.0 }} to={{ z: 1.1 }}>
      <Highway y={840} t={t} speed={20} />
      <MyBank x={360} y={780} s={1.15} t={t} hand={[mix(180, 300, reach), -80]} />
      <MyBank x={1560} y={780} s={1.15} t={t} hand={[-mix(180, 300, reach), -80]} mood="calm" />
      <ShoeFlag x={1560} />
      <Cart x={960} y={812} s={1.1} t={t} />
      {reach > 0.8 && <Glow2 x={960} y={660} r={300} c={P.coin} o={0.5 * (reach - 0.8) * 5} />}
    </Scene>
  );
};
const ShoeFlag: React.FC<{ x: number }> = ({ x }) => <g><path d={rr(x - 90, 250, 180, 110, 30)} fill={P.cream} /><Shoe x={x} y={345} s={0.45} /></g>;
/* s09 */
export const FromCartShot: React.FC = () => {
  const { t, at } = useW();
  const tc = at("cart", 1.4), tn = at("hundred", 3.2), grab = go(t, tc - 0.7, 0.9), lift = go(t, tc + 0.2, 0.8);
  return (
    <Scene kind="jalan" from={{ z: 1.05 }} to={{ z: 1.1 }}>
      <Highway y={850} t={t} speed={0} />
      <TollGate x={560} y={800} s={1.5} t={t} mood="neutral" />
      <Cart x={970} y={850} s={1.15} t={t} load={1 - lift * 0.12} />
      <Hand from={[620, 620]} to={[mix(mix(660, 930, grab), 700, lift), mix(mix(560, 640, grab), 500, lift)]} tones={TEALB} />
      {grab > 0.9 && <Gold x={mix(930, 710, lift)} y={mix(630, 470, lift)} r={36} />}
      <You x={1640} y={870} s={0.95} t={t} face="happy" look={-20} arm={[-120, -190]} />
      <Pop x={1470} y={560} p={back(t, tn - 0.5)}><Paper x={1470} y={360} w={220} h={290} rot={-5}><Txt x={0} y={90} s={62} c={P.navy}>$100</Txt><Lines x={-80} y={130} w={160} n={4} g={34} /></Paper></Pop>
    </Scene>
  );
};
export const LessShot: React.FC = () => {
  const { t, at } = useW();
  const tl = at("less", 1.2), p = back(t, tl - 0.5, 0.6);
  return (
    <Scene redup kind="toko" to={{ z: 1.06 }}>
      <path d={rr(150, 170, 740, 690, 44)} fill="#fff" opacity={0.12} /><path d={rr(1030, 170, 740, 690, 44)} fill="#fff" opacity={0.2} />
      <Paper x={640} y={300} w={300} h={430} rot={-4}><Txt x={0} y={110} s={90} c={P.navy}>$100</Txt><Lines x={-110} y={170} w={220} n={6} /></Paper>
      <You x={330} y={840} s={0.95} t={t} look={20} arm={[150, -220]} />
      <Owner x={1280} y={840} s={1.05} t={t} face={p > 0.5 ? "shock" : "neutral"} look={24} />
      <g transform={`translate(1580 640)`}><Hose2 /><Pop x={0} y={-60} p={1}><Stack x={0} y={-20} n={Math.round(14 - p * 4)} w={72} /></Pop></g>
      {p > 0 && [0, 1].map((i) => <Gold key={i} x={1600 + i * 60} y={mix(400, 250, p) - i * 40} r={30} op={1 - p * 0.45} />)}
    </Scene>
  );
};
const Hose2 = () => <g>{line("M-190 0Q-130 40 -40 0H80", TEALB[1], 46)}{line("M-186 -4Q-130 32 -40 -6H76", TEALB[2], 30)}</g>;
/* s10 */
export const StickerShot: React.FC = () => {
  const { t, at } = useW();
  const ts = at("sticker", 1.8), p = go(t, ts - 0.9, 0.9), slap = seg(t, ts, ts + 0.3);
  const x = mix(760, 1180, p), y = mix(700, 440, p);
  return (
    <Scene kind="pagi" from={{ z: 1.05 }} to={{ z: 1.15, x: 1040, y: 520 }}>
      <Shade d={rr(820, 120, 760, 760, 30)} tones={CREAM} L={LR} s={[8, 26, 12]} />
      <Shade d="M780 160L850 70H1550L1620 160Z" tones={CORAL} L={LR} s={[5, 16, 9]} />{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${780 + i * 84} 158q42 60 84 0Z`} fill={i % 2 ? "#fff4da" : CORAL[2]} />)}
      <Shade d={rr(960, 280, 440, 600, 24, 4)} tones={TEALB} L={LR} s={[6, 20, 10]} /><path d={rr(1000, 320, 360, 330, 20)} fill="#bfe8ff" opacity={0.85} />{line("M1040 360L1120 330M1040 430L1190 360", "#fff", 14, 0.7)}<circle cx={1020} cy={720} r={18} fill={P.coin} />
      <path d="M-200 880H2120V1300H-200Z" fill="#6a4a5a" />
      <Owner x={560} y={880} s={1.15} t={t} face={slap > 0.5 ? "happy" : "neutral"} look={26} arm-x={0} />
      <Hand from={[700, 730]} to={[x - 70, y + 50]} tones={TEALB} />
      <Sticker2 x={x} y={y} s={mix(1.25, 1.05, slap)} />
      <Waves x={1180} y={440} t={t} at={ts} c="#fff" n={2} />
    </Scene>
  );
};
/* s11 */
export const MapDotShot: React.FC = () => {
  const { t, at } = useW();
  const tn = at("next", 1.4), p = back(t, tn - 0.3);
  return (
    <Scene kind="malam" to={{ z: 1.0 }}>
      <MapBase t={t} cam={{ x: mix(960, 1060, go(t, 0, 2.5)), y: mix(540, 590, go(t, 0, 2.5)), z: mix(1.0, 1.35, go(t, 0, 2.5)) }}>
        <Pop x={1180} y={640} p={p}><circle cx={1180} cy={600} r={34} fill="#b490e8" /><circle cx={1180} cy={600} r={14} fill="#fff" /></Pop>
        <Waves x={1180} y={600} t={t} at={tn} c="#e0c8ff" />
      </MapBase>
    </Scene>
  );
};
export const ServerIntroShot: React.FC = () => {
  const { t, at } = useW();
  const tr = at("runs", 0.8), tt = at("talks", 2.2), a = go(t, tr - 0.3, 0.8), b = go(t, tt - 0.3, 0.8);
  return (
    <Scene kind="kantor" from={{ z: 1.1 }} to={{ z: 1.0 }}>
      <path d="M720 700C560 840 520 620 400 660" pathLength={100} strokeDasharray={`${a * 100} 100`} stroke="#ffd23f" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M1200 700C1360 860 1500 600 1700 690" pathLength={100} strokeDasharray={`${b * 100} 100`} stroke="#7dffb8" strokeWidth={18} fill="none" strokeLinecap="round" />
      <ServerGuy x={960} y={800} s={1.5} t={t} face="happy" />
      <Terminal x={380} y={800} s={0.9} t={t} on={seg(t, tr + 0.4, tr + 0.6)} />
      <Pop x={1690} y={720} p={b}><Highway y={760} t={t} x0={1560} x1={1860} /><TollGate x={1650} y={740} s={0.8} t={t} open={1} /></Pop>
    </Scene>
  );
};
export const NameBoardShot: React.FC = () => {
  const { t, at } = useW();
  const tl = at("Call", 0.3), up = back(t, tl - 0.1, 0.7), ink = seg(t, at("terminal", 1.2) - 0.1, at("terminal", 1.2) + 0.3);
  return (
    <Scene kind="kantor" from={{ z: 1.05 }} to={{ z: 1.12 }}>
      <ServerGuy x={960} y={880} s={1.55} t={t} face="happy" arm={[190, -mix(80, 330, up)]} armL={[-190, -mix(80, 330, up)]} />
      <g transform={`translate(960 ${mix(760, 305, up)})`}><Shade d={rr(-380, -85, 760, 170, 36)} tones={CREAM} L={LR} s={[5, 16, 9]} />{ink < 1 && <path d={rr(-260, -22, 520, 44, 22)} fill="#d8c0b0" opacity={1 - ink} />}<g opacity={ink}><Terminal x={0} y={58} s={0.46} t={t} on={1} />{[-1, 1].map((d) => <g key={d}>{line(`M${d * 100} -24H${d * 300}M${d * 100} 18H${d * 240}`, "#8a6a8a", 15)}</g>)}</g></g>
    </Scene>
  );
};
/* s12 */
export const FourHandsShot: React.FC = () => {
  const { t, at } = useW();
  const tf = at("four", 0.6);
  return (
    <Scene kind="jalan" from={{ z: 1.0, x: 880 }} to={{ z: 1.06, x: 1020 }}>
      <Highway y={850} t={t} speed={25} />
      {[340, 760, 1180, 1600].map((x, i) => { const p = back(t, tf - 0.4 + i * 0.22, 0.5); const c = [CREAM, DARK, GREEN, BLUE][i]; return <g key={x}>{[<MyBank key="a" x={x} y={640} s={0.55} t={t} />, <NetTower key="b" x={x} y={640} s={0.5} t={t} beam={0} />, <ServerGuy key="c" x={x} y={640} s={0.68} t={t} face="happy" />, <ShopBank key="d" x={x} y={640} s={0.55} t={t} />][i]}<g transform={`translate(${x} ${mix(1100, 710, p) + Math.sin(t * 3 + i) * 8})`}><Shade d="M-34 150V20Q-70 -10 -78 -48Q-80 -76 -54 -70L-36 -34V-88Q-36 -112 -16 -112Q4 -112 4 -88V-100Q6 -124 26 -122Q46 -120 46 -96V-82Q50 -104 68 -102Q88 -98 86 -74L76 20Q70 60 40 70V150Z" tones={c} L={LR} s={[5, 15, 9]} /></g></g>; })}
      <Cart x={mix(-250, 2200, seg(t, 0, 5.5, Easing.linear))} y={900} s={0.55} t={t} rolling />
    </Scene>
  );
};
export const GuessShot: React.FC = () => {
  const { t, at } = useW();
  const g = at("guess", 1), p = back(t, g - 0.6, 0.8);
  return (
    <Scene kind="malam" to={{ z: 1.07 }}>
      <g opacity={0.82}><Pop x={1180} y={780} p={0.4 + 0.6 * p}><Sack x={1180} y={780} s={2.1} c={STEEL} label="?" /></Pop></g>
      <NetTower x={600} y={800} s={0.95} t={t} mood="smug" beam={0} />
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={1180 + Math.cos(i * 1.3 + t * 0.5) * 420} cy={430 + Math.sin(i * 1.9 + t * 0.7) * 220} r={14} fill="#fff" opacity={0.4} />)}
    </Scene>
  );
};
export const TruthShot: React.FC = () => {
  const { t, at } = useW();
  const s = at("smallest", 1), b = at("biggest", 3), small = go(t, s - 0.5, 0.7), big = back(t, b - 0.5, 0.8);
  return (
    <Scene kind="jalan" to={{ z: 1.04 }}>
      <NetTower x={290} y={810} s={0.85} t={t} mood={small > 0.6 ? "shock" : "smug"} beam={0} />
      <Sack x={720} y={810} s={mix(1.5, 0.5, small)} c={STEEL} label="¢" />
      <Sack x={1190} y={810} s={mix(0.7, 2.15, big)} c={GOLD} />
      <MyBank x={1640} y={810} s={0.95} t={t} mood={big > 0.5 ? "happy" : "neutral"} />
    </Scene>
  );
};
export const _s1 = { Bill, CashMan, CoinGrid, Coin, Cross, R, clamp, BankHouse };
