// Metafora colokan dan stopkontak: s06, s07, s11a, s29, s40, dan thumbnail S1.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, R, clamp, mix, pop, seg, useShot } from "@r3";
import { Shade, rr } from "@r3/art";
import { BLUE, CORAL, CREAM, Contact, GOLD, GREEN, Glow2, Hose, LR, P, Phone, QrGrid, STEEL, ScanFrame, Sticker, TEALB, Tick, WOOD, You, circ, line, tw } from "./kit";
import { SwitchStation } from "./peta";
import { APPS, Adapter, Back, BFace, Coin, NetTower, Plug, Socket, Txt, bump, drift } from "./benda";

type Cam = { x: number; y: number; z: number };
/** dinding papan di belakang meja */
export const Wall: React.FC<{ t: number; cam: Cam; children?: React.ReactNode; lamp?: boolean; table?: boolean }> = ({ t, cam, children, lamp = true, table = true }) => (
  <>
    <Layer cam={cam} d={0.7}>
      <rect x={-600} y={-500} width={3200} height={2200} fill="#4a2658" />
      {Array.from({ length: 17 }, (_, i) => <g key={i}><path d={rr(-420 + i * 170, -400, 158, 1700, 12)} fill={["#6e3860", "#783e60", "#66345e"][i % 3]} /><path d={`M${-380 + i * 170} ${120 + R(i, 3) * 600}q18 60 2 150`} stroke="#4a2658" strokeWidth={6} fill="none" strokeLinecap="round" /><circle cx={-341 + i * 170} cy={60} r={8} fill="#3a1c4c" /><circle cx={-341 + i * 170} cy={820} r={8} fill="#3a1c4c" /></g>)}
      {lamp && <Glow2 x={960} y={160} r={900} c="#ffb35a" o={0.5 + Math.sin(t * 3) * 0.02} />}
    </Layer>
    <Layer cam={cam} d={1}>{children}
      {table && <g><path d="M-300 900H2220L2260 940H-340Z" fill="#d98a56" /><Shade d={rr(-340, 936, 2600, 90, 16)} tones={WOOD} L={LR} s={[4, 14, 8]} /><path d="M-300 1022H2220V1300H-300Z" fill="#2c1648" /></g>}
    </Layer>
  </>
);
const SH = [0, 1, 2, 3, 4, 5];
/** s06 shot 1: ponsel jadi colokan, stiker jadi stopkontak */
export const MorphShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tPlug = tw(word("plug"), 1.2), tSock = tw(word("socket"), tPlug + 1.4);
  const a = seg(t, tPlug - 0.35, tPlug + 0.15), b = seg(t, tSock - 0.35, tSock + 0.15), face = seg(t, tSock + 0.2, tSock + 1.1);
  const lx = mix(480, 620, face), rx = mix(1440, 1260, face);
  return (
    <Frame vignette={0.5}>
      <Wall t={t} cam={drift(t, 1.04, 1.12, 5, 960, 540)}>
        {a < 1 && <g opacity={1 - a}><Phone x={lx} y={500} s={1 - a * 0.4} rot={a * 90} body={CORAL} bg="#5a3a80" screen={<g><QrGrid x={-70} y={-80} size={140} /><ScanFrame x={0} y={-10} w={170} p={1} /></g>} /></g>}
        {a > 0 && <Plug x={lx} y={500 + Math.sin(t * 2.2) * 8} s={2.1 * pop(t, tPlug - 0.2, 0.4)} tones={CORAL} />}
        {b < 1 && <g opacity={1 - b}><Sticker x={rx} y={760} s={1.1 - b * 0.4} /></g>}
        {b > 0 && <Socket x={rx} y={500} s={2.1 * pop(t, tSock - 0.2, 0.4)} shape={0} />}
        {vertical ? null : null}
      </Wall>
    </Frame>
  );
};
const SOCKS: [number, number][] = [[430, 270], [830, 330], [1240, 250], [1620, 360], [620, 640], [1420, 650]];
/** s06 shot 2: dinding penuh enam bentuk, colokan hanya cocok satu */
export const WallShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tShape = tw(word("shape"), 1), tShop = tw(word("shop"), tShape + 0.8), D = Math.max(dur, 5);
  const path: [number, number][] = [[1000, 800], [700, 330], [1100, 250], [1480, 360], [460, 640]];
  const u = seg(t, 0.4, D - 0.4, Easing.linear) * (path.length - 1), i = Math.min(path.length - 2, Math.floor(u)), f = Easing.inOut(Easing.cubic)(clamp(u - i));
  const hit = Math.sin(clamp((f - 0.7) / 0.3) * Math.PI) * 60;
  const px = mix(path[i][0], path[i + 1][0], f) - hit, py = mix(path[i][1], path[i + 1][1], f) - Math.sin(f * Math.PI) * 120;
  return (
    <Frame vignette={0.45}>
      <Wall t={t + 3} cam={drift(t, 1.12, 1.0, D)}>
        {SOCKS.map(([x, y], k) => <Socket key={k} x={x} y={y} s={1.35 * pop(t, 0.1 + k * 0.18 + (k > 3 ? tShop - 1.2 : 0), 0.35)} shape={SH[(k + 1) % 6]} lit={k === 4 ? seg(t, D - 0.6, D - 0.2) : 0} />)}
        {SOCKS.slice(0, 4).map(([x, y], k) => { const when = 0.4 + ((k + 0.85) / 4) * (D - 0.8); const p = bump(t, when - 0.1, 0.55); return p > 0 && k > 0 ? <g key={k} transform={`translate(${x - 100} ${y - 90}) scale(${p})`}><circle r={38} fill={P.coral} />{line("M-14 -14L14 14M14 -14L-14 14", "#fff", 10)}</g> : null; })}
        <Plug x={px} y={py} s={1.35} tones={CORAL} rot={Math.sin(t * 5) * 6} />
      </Wall>
    </Frame>
  );
};
/** s07 shot 1: bendera, stopkontak menyatu */
export const MergeShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tIndep = tw(word("Independence"), 1.6), tLaunch = tw(word("launched"), tIndep + 2.6);
  const m = seg(t, tLaunch - 0.7, tLaunch + 0.5, Easing.inOut(Easing.cubic)), one = pop(t, tLaunch + 0.35, 0.45);
  const D = Math.max(dur, 7);
  return (
    <Frame vignette={0.45}>
      <Wall t={t} cam={drift(t, 1.0, 1.1, D)}>
        {m < 1 && SOCKS.map(([x, y], k) => <Socket key={k} x={mix(x, 960, m)} y={mix(y + 40, 520, m)} s={1.25 * (1 - m * 0.35)} shape={k} />)}
        {one > 0 && <Socket x={960} y={520} s={2.4 * one} shape={6} lit={0.8} />}
        {line("M-60 40Q960 260 1980 40", "#fff4da", 7)}
        {Array.from({ length: 19 }, (_, i) => { const u = (i + 0.5) / 19, x = -60 + u * 2040, y = 40 + Math.sin(u * Math.PI) * 108, p = pop(t, 0.2 + i * 0.07, 0.25); return <path key={i} d={`M${x - 38} ${y}H${x + 38}L${x + Math.sin(t * 3 + i) * 10} ${y + 80 * p}Z`} fill={i % 2 ? "#fffdf4" : "#e03a44"} />; })}
        {m > 0.8 && Array.from({ length: 24 }, (_, i) => { const a = i * 0.262, u = seg(t, tLaunch + 0.4, tLaunch + 1.5); return u > 0 && u < 1 ? <circle key={i} cx={960 + Math.cos(a) * (180 + u * 420)} cy={520 + Math.sin(a) * (180 + u * 300)} r={12 * (1 - u)} fill={i % 2 ? "#ff5a60" : "#fff"} /> : null; })}
      </Wall>
    </Frame>
  );
};
/** s07 shot 2: semua colokan masuk bergiliran */
export const ClickShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tCall = tw(word("QRIS"), 0.8), D = Math.max(dur, 3);
  const step = (D - 0.3) / 6, i = Math.min(5, Math.floor(t / step)), u = clamp((t - i * step) / step);
  const x = u < 0.55 ? mix(-200, 700, Easing.out(Easing.cubic)(u / 0.55)) : 700, lit = u > 0.55 ? 1 : 0;
  return (
    <Frame vignette={0.45}>
      <Wall t={t + 6} cam={drift(t, 1.1, 1.14, D)}>
        <Socket x={960} y={520} s={2.4} shape={6} lit={lit * 0.9} />
        <g transform={`translate(960 810) scale(${pop(t, tCall - 0.15, 0.4)})`}><path d={rr(-170, -56, 340, 110, 30)} fill="#fff" /><Txt x={0} y={26} s={78} c={P.navy}>QRIS</Txt></g>
        <Plug x={x} y={520} s={1.55} tones={APPS[i]} shape={i} lit={lit} />
        {Array.from({ length: 6 }, (_, k) => <g key={k} transform={`translate(${140 + k * 0} ${190 + k * 105})`}>{k > i ? <Plug x={40} y={0} s={0.5} tones={APPS[k]} shape={k} cord={false} /> : <g transform={`translate(40 0) scale(${k < i || lit ? 1 : 0})`}><circle r={32} fill={APPS[k][2]} />{line("M-14 0L-4 11L15 -10", "#fff", 9)}</g>}</g>)}
      </Wall>
    </Frame>
  );
};
/** s11 shot 1: kabel di balik dinding menuju stasiun */
export const WiringShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tWire = tw(word("wiring"), 0.8), D = Math.max(dur, 4);
  const open = seg(t, 0.2, tWire + 0.2), pulse = seg(t, tWire, D - 0.2, Easing.inOut(Easing.sin));
  const cam = { x: mix(960, 1060, pulse), y: mix(420, 660, pulse), z: 1.04 };
  const wire = "M560 420C560 720 640 800 900 820S1250 900 1480 880";
  return (
    <Frame vignette={0.55}>
      <Wall t={t} cam={cam} table={false}>
        <path d={rr(260, 480, mix(10, 1700, open), 700, 60)} fill="#1c0e38" />
        <g opacity={open}>
          {[-30, 0, 30].map((o, k) => <path key={o} d={wire} transform={`translate(${o} ${o * 0.6})`} stroke={["#cc6c34", "#3b6fd8", "#2f8f6b"][k]} strokeWidth={22} fill="none" strokeLinecap="round" />)}
          <path d={wire} pathLength={100} strokeDasharray="9 200" strokeDashoffset={-pulse * 96} stroke="#fff6c0" strokeWidth={34} fill="none" strokeLinecap="round" />
          <SwitchStation x={1590} y={970} s={0.75} t={t} lit={0.35 + pulse * 0.65} spin={pulse * 180} />
        </g>
        <Socket x={560} y={320} s={1.5} shape={6} lit={bump(t, 0.2, 1)} />
      </Wall>
    </Frame>
  );
};
/** s29 shot 1: pelat soket berdenyut */
export const GlowSocketShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const D = Math.max(dur, 2.5), p = bump(t, tw(word("socket"), 1) - 0.3, 1.2);
  return <Frame vignette={0.65}><Wall t={t} cam={drift(t, 1.0, 1.28, D, 960, 520)} lamp={false}><Glow2 x={960} y={520} r={760} c="#ffb35a" o={0.4 + p * 0.4} /><Socket x={960} y={520} s={2.2 + p * 0.15} shape={6} lit={0.3 + p * 0.7} /></Wall></Frame>;
};
/** s29 shot 2: pelat terbuka, pelat pembuat EMVCo dan tiga pendiri polos */
export const HatchShot: React.FC = () => {
  const { t, word, dur, faces } = useShot();
  const tEmv = tw(word("EMVCo"), 1.6), tBy = tw(word("Europay"), tEmv + 2), D = Math.max(dur, 6);
  const open = seg(t, 0.4, tEmv - 0.2, Easing.inOut(Easing.cubic));
  const names = ["Europay", "Mastercard", "Visa"], ats = [tBy, tw(word("Mastercard"), tBy + 0.6), tw(word("Visa"), tBy + 1.4)];
  return (
    <Frame vignette={0.55}>
      <Wall t={t + 2} cam={drift(t, 1.06, 1.0, D)}>
        <path d={rr(630, 190, 660, 660, 130)} fill="#180a30" />
        <g transform={`translate(960 520)`}>
          <Shade d={rr(-270, -270, 540, 540, 70)} tones={STEEL} L={LR} s={[6, 18, 10]} />
          {[[-226, -226], [226, -226], [-226, 226], [226, 226]].map(([a, b]) => <circle key={`${a}${b}`} cx={a} cy={b} r={16} fill={STEEL[1]} />)}
          <g transform={`scale(${pop(t, tEmv - 0.15, 0.4)})`}><path d={rr(-210, -90, 420, 180, 30)} fill={GOLD[2]} /><path d={rr(-190, -72, 380, 144, 20)} fill="none" stroke={GOLD[1]} strokeWidth={7} /><Txt x={0} y={34} s={96} c={GOLD[0]}>EMVCo</Txt></g>
        </g>
        <g transform={`translate(690 520) scale(${Math.cos(open * Math.PI * 0.6)} 1) translate(-690 -520)`}><Socket x={960} y={520} s={4} shape={6} /></g>
        {names.map((n, i) => { const x = [250, 1650, 1650][i], y = [330, 280, 640][i], p = seg(t, ats[i] - 0.2, ats[i] + 0.3); return <g key={n} opacity={p} transform={`translate(${x} ${y})`}><Glow2 x={0} y={0} r={190} c="#9fb8ff" o={0.4} /><circle cy={-60} r={56} fill="#d8c8f0" /><path d="M-96 96Q-90 4 0 4Q90 4 96 96Z" fill="#d8c8f0" /><Txt x={0} y={160} s={44}>{n}</Txt></g>; })}
        {faces.network && <NetTower x={250} y={930} s={0.78} t={t} mood={faces.network === "shock" ? "shock" : "neutral"} beam={0} />}
      </Wall>
    </Frame>
  );
};
/** s40 shot 1-2: adaptor di antara dua soket, lalu tembus pandang */
export const AdapterShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const tAd = tw(word("adapter"), 0.7), tJoin = tw(word("joined"), tAd + 2), tEach = tw(word("each", 0), tJoin + 1.6), D = Math.max(dur, 7);
  const sep = seg(t, 0, 0.8), inn = seg(t, tAd - 0.45, tAd + 0.15, Easing.in(Easing.cubic));
  const see = seg(t, tJoin - 0.4, tJoin + 0.4);
  const k = vertical ? 0.6 : 1;
  const lx = 960 - (mix(300, 600, sep) - inn * 130) * k, rx = 960 + (mix(300, 600, sep) - inn * 130) * k;
  return (
    <Frame vignette={0.5}>
      <Wall t={t} cam={drift(t, 1.0, 1.08, D)} table={false}>
        <Plug x={lx - 50} y={500} s={1.7 * k} tones={GOLD} shape={1} lit={inn > 0.98 ? 0.6 : 0} />
        <Socket x={rx + 20} y={500} s={1.75 * k} shape={6} lit={inn > 0.98 ? 0.7 : 0} />
        <Adapter x={960} y={mix(-250, 500, inn)} s={1.55 * k} see={see} t={t} />
        {t > tAd && t < tAd + 0.6 && <g>{[-1, 1].map((s) => <Glow2 key={s} x={960 + s * 270 * k} y={500} r={240 * bump(t, tAd, 0.6)} c="#fff6c0" o={0.9} />)}</g>}
        <g opacity={see}>
          <SwitchStation x={960 - 560 * k} y={940} s={0.6 * k} t={t} /><SwitchStation x={960 + 560 * k} y={940} s={0.6 * k} t={t} />
          {[-1, 1].map((s) => <g key={s}><path d={`M${960 + s * 560 * k} ${760}C${960 + s * 520 * k} 640 ${960 + s * 330 * k} 680 ${960 + s * 120 * k} 540`} stroke={s < 0 ? "#cfe4ff" : "#ffd23f"} strokeWidth={13} strokeDasharray="30 24" strokeDashoffset={-t * 70} fill="none" strokeLinecap="round" />{[0, 1, 2].map((i) => <Coin key={i} x={960 + s * (840 - i * 20) * k} y={870 - i * 62 * seg(t, tEach - 0.3 + i * 0.15, tEach + i * 0.15)} r={44 * k} k={s < 0 ? "thb" : "rp"} op={seg(t, tEach - 0.3 + i * 0.15, tEach + i * 0.15)} />)}</g>)}
        </g>
      </Wall>
    </Frame>
  );
};
/** s40 shot 3: gerobak Bangkok, saldo rupiah turun */
export const BangkokShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const tScan = tw(word("scan"), 1), tDown = tw(word("down"), tScan + 3), D = Math.max(dur, 5);
  const lock = seg(t, tScan, tScan + 0.5, Easing.out(Easing.back(1.6))), go = seg(t, tScan + 0.8, tDown + 0.2);
  const bal = Math.round(800000 - go * 46000);
  return (
    <Frame vignette={0.45}>
      <Back id="t5bkk" stops={["#201252", "#6a2c80", "#f08a5c"]} />
      <Layer cam={drift(t, 1.0, 1.08, D)} d={0.35}>{Array.from({ length: 16 }, (_, i) => { const h = 240 + R(i, 4) * 330; return <g key={i}><path d={rr(-200 + i * 150, 800 - h, 130, h, 16, 0)} fill="#4a2670" />{[0, 1, 2].map((j) => <rect key={j} x={-170 + i * 150} y={830 - h + j * 70} width={70} height={14} rx={6} fill="#ffcf7a" opacity={R(i * 3 + j, 2)} />)}</g>; })}
        {[130, 190, 235, 300].map((y, i) => <path key={y} d={`M-300 ${y}Q${400 + i * 260} ${y + 120 - i * 14} 2220 ${y + (i % 2) * 40}`} stroke="#1c0c3c" strokeWidth={5} fill="none" />)}
      </Layer>
      <Layer cam={drift(t, 1.0, 1.1, D)} d={1}>
        <path d="M-300 860H2220V1200H-300Z" fill="#2c1850" />
        <g transform="translate(620 880)"><Contact x={0} y={0} w={380} /><Shade d={rr(-320, -250, 640, 190, 30)} tones={TEALB} L={LR} s={[8, 24, 12]} />{[-220, 220].map((a) => <g key={a} transform={`translate(${a} -40)`}><circle r={60} fill="#180a30" /><circle r={22} fill={STEEL[2]} /></g>)}{line("M-290 -250V-500M290 -250V-500", STEEL[2], 16)}<Shade d="M-380 -490Q0 -640 380 -490L360 -460Q0 -520 -360 -460Z" tones={CORAL} L={LR} s={[5, 15, 9]} />
          <path d={circ(-170, -310, 76)} fill={GOLD[2]} /><path d={circ(-170, -330, 56)} fill="#e0603a" /><g transform="translate(130 -250)"><Sticker x={0} y={0} s={0.55} /></g></g>
        <ScanFrame x={750} y={880 - 250 - 126} w={140} p={lock * (1 - seg(t, tScan + 1, tScan + 1.4))} />
        <You x={vertical ? 1390 : 1700} y={1130} s={1.02} t={t} face="happy" look={-30} arm={[-290, -360]} />
        <Phone x={vertical ? 1100 : 1390} y={690} s={0.9} rot={-8} bg={P.cream} screen={<g><Txt x={0} y={-90} s={28} c="#6a6290">BALANCE</Txt><Txt x={0} y={-30} s={30} c={P.navy}>{`Rp${bal.toLocaleString("en-US")}`}</Txt><Tick x={0} y={80} r={52} p={pop(t, tDown - 0.2)} /></g>} />
        {[0, 1, 2].map((i) => { const u = seg(t, tScan + 0.8 + i * 0.5, tScan + 1.8 + i * 0.5, Easing.inOut(Easing.sin)); return u > 0 && u < 1 ? <Coin key={i} x={mix(1300, 900, u)} y={mix(560, 600, u) - Math.sin(u * Math.PI) * 240} r={40} k={u > 0.5 ? "thb" : "rp"} /> : null; })}
      </Layer>
    </Frame>
  );
};
export const _d = { BLUE, CREAM, GREEN, Hose };
