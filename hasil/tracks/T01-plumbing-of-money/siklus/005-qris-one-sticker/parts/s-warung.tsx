// Adegan di warung: s03a, s04, s05, s08, s09, s15, s17-s19, s21, s23, s36, s38, s45, s47, s48.
import React from "react";
import { Easing } from "remotion";
import { Bubble, Frame, Layer, R, SANS, clamp, mix, pop, seg, useShot, useLabel, Pill } from "@r3";
import { Shade, rr } from "@r3/art";
import { BLUE, CORAL, CREAM, Contact, GOLD, GREEN, Glow2, Hose, LR, Owner, P, Phone, QrGrid, ScanFrame, STEEL, Sticker, TEALB, Tick, WOOD, You, circ, line, tw } from "./kit";
import { BananaLeaf, Bottle, Bowl, Pot, Steam, Table, WarungSet } from "./warung";
import { APPS, BankChar, Coin, Cross, Envelope, Stack, Tin, Tourist, Txt, bump, drift, Back, SILVER } from "./benda";

export const TY = 790;
type Cam = { x: number; y: number; z: number };
/** warung baku: latar, meja, panci di kiri; isi meja = children, pemeran di belakang meja = mid */
export const Stall: React.FC<{ t: number; cam: Cam; day?: number; mid?: React.ReactNode; children?: React.ReactNode; pot?: boolean; front?: React.ReactNode; leaf?: boolean }> = ({ t, cam, day, mid, children, pot = true, front, leaf = true }) => (
  <WarungSet t={t} cam={cam} day={day} mid={mid} fg={leaf ? <Layer cam={cam} d={1.45}><BananaLeaf x={-60} y={1210} rot={28} s={1.1} t={t} /></Layer> : undefined}>
    <Table y={TY} />{pot && <Pot x={330} y={TY - 4} t={t} />}{children}{front}
  </WarungSet>
);
const Chime: React.FC<{ x: number; y: number; since: number; c?: string }> = ({ x, y, since, c = P.coin }) => since <= 0 || since > 1.4 ? null : (
  <g>{[0, 1, 2].map((i) => { const u = since * 1.1 - i * 0.22; return u > 0 && u < 1 ? <circle key={i} cx={x} cy={y} r={40 + u * 160} stroke={c} strokeWidth={10 * (1 - u)} fill="none" opacity={1 - u} /> : null; })}</g>
);
const TickScreen: React.FC<{ p: number; r?: number }> = ({ p, r = 70 }) => <Tick x={0} y={-10} r={r} p={p} />;

/** s03 shot 1: ponsel enam warna mengelilingi satu stiker */
export const RingShot: React.FC = () => {
  const { t, word } = useShot();
  const tOne = tw(word("one"), 1), glow = bump(t, tOne + 0.5, 1.1);
  const close = seg(t, 0, 1.4, Easing.out(Easing.cubic));
  return (
    <Frame vignette={0.5}>
      <Stall t={t} cam={drift(t, 1.04, 1.12, 4, 960, 520)} pot={false}>
        <Sticker x={960} y={TY} s={0.98} glow={0.25 + glow * 0.75} />
        {APPS.map((c, i) => {
          const a = (i / 6) * Math.PI * 2 + t * 0.35, r = mix(900, 450, close), x = 960 + Math.cos(a) * r * 1.15, y = 500 + Math.sin(a) * r * 0.66;
          return <g key={i}><Phone x={x} y={y} s={0.42} rot={(Math.atan2(560 - y, 960 - x) * 180) / Math.PI * 0.12} body={c} bg="#5a3a80" screen={<g><QrGrid x={-70} y={-70} size={140} /><ScanFrame x={0} y={0} w={170} p={seg(t, tOne, tOne + 0.4)} /></g>} /></g>;
        })}
      </Stall>
    </Frame>
  );
};

/** s04: warung siang 2019, kalender mundur, 26 format kode */
export const Y2019Shot: React.FC = () => {
  const { t, word } = useShot();
  const t19 = tw(word("2019"), 0.8), tBank = tw(word("Bank"), t19 + 0.8), t26 = tw(word("twenty-six"), tBank + 1.4);
  const day = seg(t, 0.1, t19 + 0.2);
  const flips = clamp(t / (t19 || 1));
  const year = Math.round(mix(2026, 2019, flips));
  const n = Math.floor(seg(t, t26 - 0.2, t26 + 1.8, Easing.inOut(Easing.quad)) * 26 + 1e-6);
  const gridIn = seg(t, t26 - 0.4, t26);
  return (
    <Frame vignette={0.35}>
      <Stall t={t} cam={drift(t, 1.06, 1, 6)} day={day} pot>
        <Bowl x={640} y={TY} s={0.8} noodles t={t} />
        <g transform={`translate(${mix(1250, 1640, gridIn)} ${mix(430, 440, gridIn)}) scale(${mix(1.15, 0.8, gridIn)})`}>
          {line("M-70 -190L0 -250L70 -190", "#4a2a52", 8)}
          <Shade d={rr(-140, -190, 280, 330, 22)} tones={CREAM} L={LR} s={[4, 14, 8]}><rect x={-140} y={-190} width={280} height={80} fill={P.coral} /></Shade>
          {[-80, 80].map((a) => <path key={a} d={rr(a - 9, -212, 18, 48, 8)} fill={STEEL[2]} />)}
          <Txt x={0} y={50} s={100} c={P.navy}>{year}</Txt>
          {t < t19 + 0.1 && [0, 1, 2].map((i) => { const u = (t * 3.2 + i / 3) % 1; return <path key={i} d={`M-136 ${-106}Q0 ${-106 - u * 190} 136 ${-106}L136 ${-106 + (1 - u) * 230}Q0 ${-106 + (1 - u) * 170} -136 ${-106 + (1 - u) * 230}Z`} fill="#fffdf4" opacity={(1 - u) * 0.8} />; })}
        </g>
        {Array.from({ length: n }, (_, i) => {
          const col = i % 9, row = Math.floor(i / 9), x = 330 + col * 130 + (row === 2 ? 60 : 0), y = 190 + row * 140, c = APPS[i % 6], p = pop(t, t26 - 0.2 + (i / 26) * 2, 0.25);
          return <g key={i} transform={`translate(${x} ${y + Math.sin(t * 2 + i) * 4}) scale(${p})`}><Shade d={rr(-55, -55, 110, 110, [6, 28, 55, 18][i % 4])} tones={c} L={LR} s={[3, 9, 5]} /><path d={rr(-39, -39, 78, 78, [4, 12, 22, 4][i % 4])} fill="#fffdf4" /><QrGrid x={-31} y={-31} size={62} seed={i * 13} /></g>;
        })}
        {n > 0 && <g transform={`translate(1640 690) scale(${pop(t, t26 - 0.1, 0.3)})`}><path d={rr(-90, -62, 180, 110, 26)} fill={P.navy} opacity={0.85} /><Txt x={0} y={24} s={84} c={P.coin}>{n}</Txt></g>}
      </Stall>
    </Frame>
  );
};

const sx = (i: number) => ({ x: 800 + (i % 5) * 150 + (R(i, 3) - 0.5) * 60, y: 400 + Math.floor(i / 5) * 140 + (R(i, 4) - 0.5) * 50, r: (R(i, 5) - 0.5) * 26, c: APPS[i % 6] });
const MiniStand: React.FC<{ x: number; y: number; r: number; c: (typeof APPS)[number]; i: number; s?: number }> = ({ x, y, r, c, i, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}><path d={rr(-70, -80, 150, 180, 16)} fill="#1a0c34" opacity={0.25} /><Shade d={rr(-75, -90, 150, 180, 16)} tones={c} L={LR} s={[3, 10, 6]} /><path d={rr(-58, -56, 116, 130, 10)} fill="#fffdf4" /><QrGrid x={-45} y={-35} size={90} seed={i * 7} />{line("M-40 -73H40", "#fff", 10, 0.85)}</g>
);
/** s05 shot 1: etalase penuh stiker */
export const ClutterShot: React.FC = () => {
  const { t, word, faces } = useShot();
  const tPut = tw(word("put"), 1.6), add = seg(t, tPut, tPut + 0.8, Easing.out(Easing.back(1.4)));
  return (
    <Frame vignette={0.45}>
      <Stall t={t} cam={drift(t, 1.03, 1.1, 5, 920, 540)} pot={false} mid={<Owner x={430} y={800} t={t} face={faces.owner === "tired" ? "neutral" : "calm"} look={20} />}>
        <Shade d={rr(690, 300, 840, 480, 26)} tones={["#2c4a70", "#4c78a0", "#8cc0d8", "#dff6ff"]} L={LR} s={[5, 14, 8]} op={0.6} />
        {Array.from({ length: 14 }, (_, i) => { const m = sx(i); return <MiniStand key={i} {...m} i={i} s={pop(t, 0.05 + i * 0.07, 0.25)} />; })}
        {add > 0 && <MiniStand x={mix(470, 880, add)} y={mix(640, 520, add)} r={mix(-30, 8, add)} c={APPS[3]} i={44} />}
        <Hose d={`M560 690Q650 760 ${mix(480, 830, add)} ${mix(660, 580, add)}`} tones={TEALB} w={32} />
        {line("M700 322H1520", "#fff", 10, 0.5)}
      </Stall>
    </Frame>
  );
};
/** s05 shot 2: pindai stiker yang salah */
export const WrongShot: React.FC = () => {
  const { t, word } = useShot();
  const tScan = tw(word("Scan"), 0.2), tBad = tw(word("meant"), 1.8);
  const red = pop(t, tBad - 0.1, 0.35), shake = t > tBad - 0.1 ? Math.sin(t * 60) * 14 * Math.max(0, 1 - (t - tBad) * 1.8) : 0, low = seg(t, tBad + 0.4, tBad + 1.2);
  const enter = seg(t, 0, tScan + 0.4, Easing.out(Easing.cubic));
  return (
    <Frame vignette={0.5}>
      <Stall t={t + 5} cam={drift(t, 1.12, 1.06, 4, 1080, 560)} pot={false}>
        {Array.from({ length: 10 }, (_, i) => { const m = sx(i); return <MiniStand key={i} {...m} x={m.x - 260} i={i} />; })}
        <You x={1700} y={1120} s={1.05} t={t} face={red > 0.5 ? "calm" : "neutral"} look={-30} arm={[mix(-180, -120, low) + shake / 2, mix(-380, -230, low)]} />
        <Phone x={mix(2100, 1440, enter) + shake} y={mix(620, 760, low)} s={0.82} rot={-8 + low * 14} bg={red > 0.5 ? "#4a1c3a" : "#5a3a80"} glow={red > 0.5 ? "#ff6a6a" : "#9fc4ff"} screen={red > 0.5 ? <Cross x={0} y={-10} r={70} p={red} /> : <g><QrGrid x={-70} y={-80} size={140} seed={22} /><ScanFrame x={0} y={-10} w={170} p={seg(t, tScan, tScan + 0.4)} /></g>} />
      </Stall>
    </Frame>
  );
};

/** s08 shot 1: bukan aplikasi */
export const NotAppShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tApp = tw(word("app"), 2.2), strike = seg(t, tApp - 0.05, tApp + 0.35, Easing.out(Easing.cubic));
  const cx = vertical ? 960 : 960;
  return (
    <Frame vignette={0.45}>
      <Back id="t5na" stops={["#241458", "#6a3484", "#d0607a"]} />
      <Layer cam={drift(t, 0.98, 1.07, 4)} d={1}>
        <g transform={`translate(${cx} ${500 + Math.sin(t * 2) * 8}) scale(${pop(t, 0.05, 0.4)})`}>
          <Glow2 x={0} y={0} r={520} c="#ffb35a" o={0.35} />
          <g opacity={1 - strike * 0.55}><Shade d={rr(-220, -230, 440, 440, 100)} tones={BLUE} L={LR} s={[8, 26, 14]} /><QrGrid x={-95} y={-165} size={190} /><Txt x={0} y={130} s={90}>QRIS</Txt></g>
          <path d={rr(-250, -260, 500, 500, 120)} fill="none" stroke="#fff4da" strokeWidth={10} strokeDasharray="34 28" strokeDashoffset={-t * 30} opacity={0.8} />
          <g transform={`translate(240 190) rotate(${t * 40})`}><circle r={74} fill={P.cream} /><g transform={`rotate(${-t * 40})`}>{line(`M0 -36V${24 + Math.sin(t * 7) * 6}M-26 0L0 28L26 0M-34 44H34`, P.navy, 13)}</g></g>
          {strike > 0 && line(`M-290 -280L${-290 + 580 * strike} ${-280 + 540 * strike}`, P.coral, 46)}
        </g>
      </Layer>
    </Frame>
  );
};
/** s08 shot 2: buku aturan */
export const RulebookShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tHow = tw(word("how"), 1.6), tConnect = tw(word("connect"), tHow + 2.2);
  const open = seg(t, 0, 0.8, Easing.out(Easing.back(1.1))), wire = seg(t, tConnect - 1.2, tConnect + 0.2);
  const k = vertical ? 0.62 : 1;
  const flip = t < tHow + 0.9 ? (t * 1.6) % 1 : 1;
  return (
    <Frame vignette={0.45}>
      <Stall t={t + 3} cam={drift(t, 1.02, 1.12, 5, 960, 560)} pot={false} leaf={false}>
        <g transform={`translate(960 ${vertical ? 430 : 520}) scale(${k * mix(0.7, 1, open)})`}>
          <Glow2 x={0} y={0} r={720} c="#ffcf6a" o={0.35} />
          <path d={rr(-620 * open, -280, 1240 * open, 600, 40)} fill={GREEN[0]} />
          <g transform={`scale(${Math.max(0.02, open)} 1)`}>
            {[-1, 1].map((s) => <g key={s} transform={`scale(${s} 1)`}><Shade d="M6 -250Q260 -290 580 -250V270Q260 236 6 280Z" tones={CREAM} L={LR} s={[3, 9, 6]} /></g>)}
            {[-190, -130, -70, -10, 50, 110, 170].map((y) => <circle key={y} cx={0} cy={y} r={20} fill="none" stroke={STEEL[2]} strokeWidth={12} />)}
            <g transform="translate(-300 -10)"><Sticker x={0} y={225} s={0.9} stand={false} /></g>
            <g transform="translate(300 0)">
              {[-170, 170].map((a, i) => <g key={a} transform={`translate(${a} 70) scale(0.9)`}><Shade d={i ? rr(-80, -90, 160, 140, 10) : rr(-55, -140, 110, 190, 26)} tones={i ? CREAM : BLUE} L={LR} s={[4, 12, 7]} />{i ? <path d="M-104 -84L0 -156L104 -84Z" fill={P.green} /> : <path d={rr(-38, -118, 76, 140, 14)} fill="#bfe6ff" />}</g>)}
              {line("M-130 130C-60 200 60 200 130 130", "#8a82ac", 16)}<path d="M-130 130C-60 200 60 200 130 130" pathLength={100} strokeDasharray={`${wire * 100} 100`} stroke={P.coin} strokeWidth={16} fill="none" strokeLinecap="round" />
              {wire > 0.98 && <Glow2 x={170} y={40} r={170} c="#ffd23f" o={0.6} />}
              {[-190, -150].map((y, i) => <g key={y}>{line(`M${-200 + i * 30} ${y}H${200 - i * 50}`, "#8a82ac", 14)}</g>)}
            </g>
            {flip < 1 && <path d={`M0 -250Q${580 * Math.cos(flip * Math.PI)} ${-290 - Math.sin(flip * Math.PI) * 90} ${580 * Math.cos(flip * Math.PI)} -250V270Q${290 * Math.cos(flip * Math.PI)} 220 0 280Z`} fill="#fffdf4" opacity={0.95} />}
          </g>
        </g>
      </Stall>
    </Frame>
  );
};

/** s09 shot 1-2: stiker lama terkelupas, satu dudukan; jabat tangan dengan satu penyelenggara */
export const ProviderShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const t20 = tw(word("2020"), 0.4), tShop = tw(word("shop", 1), 4), tAny = tw(word("any"), tShop + 2);
  const move = seg(t, tShop - 0.5, tShop + 0.4);
  const shake = Math.sin(t * 8) * 8 * seg(t, tShop, tShop + 0.3) * (1 - seg(t, tAny - 0.3, tAny));
  return (
    <Frame vignette={0.45}>
      <Stall t={t + 2} cam={drift(t, 1.08, 1.0, 5, 960, 540)} pot={false}
        mid={<g opacity={move}><Owner x={mix(120, vertical ? 770 : 430, move)} y={vertical ? 740 : 800} s={vertical ? 0.6 : 1} t={t} face="happy" look={24} /></g>}>
        <Sticker x={960 - (vertical ? 0 : move * 20)} y={TY - (vertical ? move * 60 : 0)} s={vertical ? 0.98 - move * 0.36 : 0.98} glow={bump(t, t20 + 1.4, 1)} />
        {Array.from({ length: 10 }, (_, i) => { const m = sx(i), at = t20 + 0.1 + i * 0.12, u = seg(t, at, at + 1.1, Easing.in(Easing.quad)); return u < 1 ? <g key={i} opacity={1 - u}><MiniStand {...m} x={m.x - 200 + u * (i % 2 ? 900 : -700)} y={m.y - u * 260} r={m.r + u * 220} i={i} /></g> : null; })}
        {move > 0 && <g transform={`translate(${mix(600, 0, move)} 0)`}><BankChar x={vertical ? 1160 : 1560} y={vertical ? 730 : 760} s={vertical ? 0.42 : 0.78} t={t} mood="happy" hand={vertical ? [-640, -90 + shake] : [-960, -90 + shake]} /></g>}
        {APPS.map((c, i) => { const at = tAny - 0.4 + i * 0.2, p = pop(t, at, 0.3), x = vertical ? 730 + i * 92 : 330 + i * 255; return <g key={i} transform={`translate(${x} ${170 + (i % 2) * 40}) scale(${p})`}><Phone x={0} y={0} s={vertical ? 0.28 : 0.4} body={c} bg={t > at + 0.35 ? P.green : "#5a3a80"} screen={t > at + 0.35 ? <TickScreen p={pop(t, at + 0.35)} /> : <QrGrid x={-70} y={-70} size={140} />} /></g>; })}
      </Stall>
    </Frame>
  );
};
/** s09 shot 3: stiker gratis */
export const FreeShot: React.FC = () => {
  const { t, word } = useShot();
  const tFree = tw(word("free"), 1.2), slide = seg(t, 0.15, tFree, Easing.inOut(Easing.cubic)), lift = seg(t, tFree + 0.2, tFree + 0.9);
  const x = mix(1500, 900, slide), y = TY - Math.sin(lift * Math.PI) * 150;
  return (
    <Frame vignette={0.45}>
      <Stall t={t + 4} cam={drift(t, 1.06, 1.12, 3, 1000, 560)} pot={false} mid={<Owner x={430} y={800} t={t} face="happy" look={30} />}>
        <BankChar x={1560} y={760} s={0.8} t={t} mood="happy" hand={[-230 - slide * 260, -40]} />
        <Sticker x={x} y={y} s={0.86} glow={bump(t, tFree, 1)} />
        {lift > 0 && <Hose d={`M560 690Q660 780 ${x - 130} ${y - 120}`} tones={TEALB} w={32} />}
      </Stall>
    </Frame>
  );
};

/** s15 shot 1-2: centang di dua ponsel, jumlah dan waktu */
export const BothShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tTick = tw(word("tick"), 0.2), tChime = tw(word("chimes"), 1.6), tOwner = tw(word("owner", 1), 3.6), tAmt = tw(word("amount"), tOwner + 1);
  const zoom = seg(t, tOwner - 0.4, tOwner + 0.6);
  const cam = { x: mix(960, 760, zoom), y: mix(540, 570, zoom), z: mix(1.03, 1.13, zoom) + t * 0.003 };
  return (
    <Frame vignette={0.45}>
      <Stall t={t} cam={cam} pot={zoom > 0.3} mid={<Owner x={mix(560, 480, zoom)} y={800} t={t} face="happy" look={zoom > 0.5 ? 26 : 10} />}>
        <g opacity={zoom}>
          <Shade d={rr(1330, 560, 170, 220, 24)} tones={["#2a2a48", "#40405e", "#5a5a78", "#8a8aa8"]} L={LR} s={[5, 14, 8]} /><path d={rr(1352, 584, 126, 70, 8)} fill="#1a1a30" />{[0, 1, 2].map((i) => [0, 1, 2].map((j) => <circle key={`${i}${j}`} cx={1370 + i * 45} cy={690 + j * 30} r={10} fill="#33334e" />))}{line("M1360 560q30 -26 90 -6", "#d8d8f0", 4, 0.5)}
        </g>
        <Chime x={mix(760, 800, zoom)} y={mix(724, 520, zoom)} since={t - tChime} />
        <Phone x={mix(760, 800, zoom)} y={mix(724, 520, zoom)} s={mix(0.3, 0.9, zoom)} rot={-5} body={TEALB} bg={t > tChime ? P.cream : "#1b2a5c"} glow={t > tChime ? "#7dffb8" : undefined}
          screen={t > tChime ? (zoom < 0.5 ? <TickScreen p={pop(t, tChime)} /> : <g><Tick x={0} y={-110} r={46} p={1} /><g transform={`scale(${pop(t, tAmt - 0.1, 0.3)})`}><Txt x={0} y={8} s={34} c={P.navy}>Rp50,000</Txt></g><Txt x={0} y={84} s={40} c="#6a6290" o={seg(t, tAmt + 0.5, tAmt + 0.8)}>19:42</Txt>{line("M-60 130H60", "#c0aed0", 12)}</g>) : undefined} />
        <g opacity={1 - zoom}><Phone x={vertical ? 1200 : 1330} y={560} s={0.9} rot={6} bg={t > tTick ? P.cream : "#5a3a80"} glow={t > tTick ? "#7dffb8" : "#9fc4ff"} screen={t > tTick ? <TickScreen p={pop(t, tTick)} /> : <QrGrid x={-70} y={-80} size={140} />} />
          <You x={1650} y={1120} s={1.05} t={t} face={t > tTick ? "happy" : "neutral"} look={-30} arm={[-250, -420]} /></g>
      </Stall>
    </Frame>
  );
};

/** s17: irisan MDR dari tumpukan koin */
export const MdrShot: React.FC = () => {
  const { t, word, faces } = useShot();
  const tName = tw(word("MDR"), tw(word("rate"), 2.6)), tSlice = tw(word("slice"), 5), tShop = tw(word("shop", 1), tSlice + 1.8);
  const lift = seg(t, tName - 0.6, tName + 0.1, Easing.out(Easing.back(1.4))), go = seg(t, tSlice, tSlice + 2, Easing.inOut(Easing.cubic)), keep = seg(t, tShop - 0.6, tShop + 0.4);
  const wx = mix(960, 1500, go), wy = mix(420 - lift * 90, 470, go) + Math.sin(t * 3) * 6;
  return (
    <Frame vignette={0.45}>
      <Stall t={t} cam={drift(t, 1.08, 1.02, 8, 960, 540)} pot={false} mid={faces.owner || keep > 0 ? <Owner x={430} y={800} t={t} face="neutral" look={26} /> : undefined}>
        <BankChar x={1620} y={760} s={0.66} t={t} mood={go > 0.7 ? "happy" : undefined} />
        <Tin x={560} y={TY} s={0.95} fill={keep} />
        <g opacity={1 - seg(t, tShop, tShop + 0.5) * 0.9}><Stack x={mix(960, 560, keep)} y={mix(TY, 620, keep)} n={7} w={130 - keep * 70} /></g>
        <g transform={`translate(${wx} ${wy}) rotate(${go * 25})`}>
          {lift > 0 && <Glow2 x={40} y={0} r={200} c="#ff7a4a" o={0.6 * lift} />}
          <g opacity={clamp(lift * 3)}><Shade d="M0 0L120 -26Q150 0 120 30Z" tones={CORAL} L={LR} s={[4, 12, 7]} /></g>
        </g>
      </Stall>
    </Frame>
  );
};

/** batang harga s18-s19 */
const Bar: React.FC<{ x: number; y: number; w: number; p: number; label: string; lp: number }> = ({ x, y, w, p, label, lp }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d={rr(-14, -44, w + 28, 88, 44)} fill={P.navy} opacity={0.8} /><path d={rr(0, -30, w, 60, 30)} fill="#4a3a72" />
    {p > 0.01 && <Shade d={rr(0, -30, Math.max(60, w * p), 60, 30)} tones={GREEN} L={[0, -1]} s={[4, 12, 7]} />}
    <Txt x={0} y={96} s={42} stroke={P.navy}>0</Txt><g transform={`scale(1)`} opacity={lp}><Txt x={w} y={96} s={42} stroke={P.navy}>{label}</Txt></g>
  </g>
);
export const FreeBarShot: React.FC = () => {
  const { t, word, faces } = useShot();
  const tH = tw(word("hundred"), 2.4), tNo = tw(word("nothing"), tH + 1.5), tSmall = tw(word("smallest"), tNo + 1), tF = tw(word("five"), tSmall + 1.6);
  const p = seg(t, tH - 0.8, tH + 0.3), slice = 1 - seg(t, tNo, tNo + 0.15), burst = seg(t, tNo, tNo + 0.5), second = seg(t, tF - 0.4, tF + 0.4, Easing.out(Easing.back(1.5)));
  const cart = seg(t, tSmall - 0.6, tSmall + 0.4);
  return (
    <Frame vignette={0.45}>
      <Stall t={t} cam={drift(t, 1.02, 1.06, 10)} pot={false} leaf={false} mid={cart > 0.5 || faces.owner ? <Owner x={1690} y={800} s={0.86} t={t} face="happy" look={-30} /> : undefined}>
        <Bar x={400} y={380} w={640} p={p} label="Rp100,000" lp={seg(t, tH - 0.3, tH)} />
        <g opacity={seg(t, tSmall - 0.3, tSmall)}><Bar x={400} y={600} w={1120} p={second * 1} label="Rp500,000" lp={seg(t, tF - 0.2, tF + 0.1)} /></g>
        <g transform="translate(1250 380)">
          {slice > 0 ? <g transform={`scale(${pop(t, 0.3)}) translate(0 ${Math.sin(t * 3) * 6})`}><Shade d="M-50 0L66 -40Q90 0 66 40Z" tones={CORAL} L={LR} s={[4, 12, 7]} /></g> : burst < 1 && Array.from({ length: 10 }, (_, i) => { const a = i * 0.628; return <circle key={i} cx={Math.cos(a) * burst * 140} cy={Math.sin(a) * burst * 140} r={14 * (1 - burst)} fill="#ff9a68" />; })}
        </g>
        <g transform={`translate(${mix(-300, 230, cart)} ${TY - 10})`}>
          <Contact x={0} y={0} w={130} /><Shade d={rr(-110, -130, 220, 100, 18)} tones={BLUE} L={LR} s={[5, 14, 8]} /><path d="M-130 -190Q0 -250 130 -190Z" fill={P.coral} />{line("M-100 -190V-130M100 -190V-130", "#c0d6f0", 10)}{[-70, 70].map((a) => <g key={a}><circle cx={a} cy={-22} r={28} fill="#1a1038" /><circle cx={a} cy={-22} r={11} fill="#c0d6f0" /></g>)}<Steam x={0} y={-140} t={t} s={0.4} />
        </g>
      </Stall>
    </Frame>
  );
};
/** s19 shot 1-2: irisan tipis, biaya tidak boleh dibebankan */
export const ThinShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tUnder = tw(word("under"), 1.2), tShop = tw(word("shop"), 2.8), tYou = tw(word("you"), tShop + 1.8);
  const split = seg(t, tShop - 0.4, tShop + 0.2);
  const push = seg(t, tShop, tYou - 0.5), stamp = seg(t, tYou - 0.45, tYou - 0.2, Easing.in(Easing.cubic)), backc = seg(t, tYou - 0.1, tYou + 0.5, Easing.out(Easing.back(1.6)));
  const cx = mix(mix(720, 1180, push), 700, backc), say = useShot().bubble;
  return (
    <Frame vignette={0.45}>
      <Stall t={t + 6} cam={drift(t, 1.04, 1.08, 6)} pot={false} mid={split > 0 ? <Owner x={470} y={800} t={t} face={backc > 0.5 ? "calm" : "happy"} look={30} /> : undefined}>
        <g opacity={1 - split}>
          <Coin x={960} y={420 + Math.sin(t * 2) * 6} r={230} />
          <g transform={`translate(960 420) rotate(${-34}) scale(${pop(t, tUnder - 0.3, 0.4)})`}><path d="M0 0L232 -12Q236 0 232 12Z" fill={P.coral} stroke="#fff4da" strokeWidth={5} /></g>
        </g>
        <g opacity={split}>
          <You x={1560} y={1120} s={1.02} t={t} face="neutral" look={-30} />
          <Shade d={rr(1010, 750, 300, 40, 12)} tones={CREAM} L={LR} s={[3, 8, 5]} />{line("M1040 770H1190", "#8a82ac", 8)}
          <Coin x={cx} y={TY - 46} r={38} />
          <Hose d={`M590 690Q660 780 ${Math.min(cx, 1040) - 40} ${TY - 52}`} tones={TEALB} w={32} />
          {say && <Bubble x={520} y={420} text={say} p={pop(t, tShop + 0.2)} />}
          {t > tYou - 0.6 && <g transform={`translate(1060 ${mix(-200, 640, stamp)}) rotate(-6)`}><Shade d={rr(-34, -160, 68, 90, 26)} tones={WOOD} L={LR} s={[4, 12, 7]} /><Shade d={rr(-110, -80, 220, 70, 18)} tones={GREEN} L={LR} s={[5, 14, 8]} /><Shade d={circ(0, 60, 62)} tones={CORAL} L={LR} s={[4, 12, 7]} op={stamp} />{line("M-30 30L30 90", "#fff", 18, stamp)}</g>}
        </g>
      </Stall>
    </Frame>
  );
};

const Slip: React.FC<{ x: number; y: number; r?: number; s?: number }> = ({ x, y, r = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}><path d={rr(-46, -16, 92, 32, 6)} fill="#fffdf4" stroke="#c9a98c" strokeWidth={4} />{line("M-30 -3H22M-30 7H4", "#8a82ac", 5)}</g>
);
/** s21 shot 1-2: catatan penjualan jadi pinjaman */
export const RecordShot: React.FC = () => {
  const { t, word } = useShot();
  const tRec = tw(word("record"), 1.4), tBank = tw(word("Bank"), 4), tLoan = tw(word("loans"), tBank + 2.4);
  const n = Math.floor(seg(t, 0.3, tBank - 0.4, Easing.linear) * 16);
  const go = seg(t, tBank - 0.3, tBank + 1.1), bag = seg(t, tLoan - 0.5, tLoan + 0.4, Easing.out(Easing.back(1.2)));
  const stx = mix(900, 1300, go);
  return (
    <Frame vignette={0.45}>
      <Stall t={t * (1 + (1 - go) * 2)} cam={drift(t, 1.04, 1.09, 8)} pot={false} day={(1 - go) * Math.max(0, Math.sin(t * 2.4)) * 0.7} mid={<Owner x={mix(480, 800, go)} y={800} t={t} face={bag > 0.5 ? "happy" : "neutral"} look={26} />}>
        {go > 0 && <g transform={`translate(${mix(600, 0, go)} 0)`}><BankChar x={1580} y={760} s={0.82} t={t} mood={t > tRec ? "happy" : "neutral"} /></g>}
        <Bowl x={560} y={TY} s={0.7} noodles t={t} />
        <Chime x={720} y={TY - 60} since={go < 0.1 ? (t * 1.3) % 1.2 : 0} />
        <Phone x={720} y={TY - 60} s={0.28} body={TEALB} bg={P.green} />
        {Array.from({ length: n }, (_, i) => <Slip key={i} x={stx + (R(i, 3) - 0.5) * 14} y={TY - 18 - i * 17} r={(R(i, 4) - 0.5) * 6} s={1.3} />)}
        {go < 0.1 && <Slip x={mix(720, stx, (t * 1.8) % 1)} y={mix(600, TY - 20 - n * 17, (t * 1.8) % 1) - Math.sin(((t * 1.8) % 1) * Math.PI) * 140} r={((t * 1.8) % 1) * 340} s={1.2} />}
        {bag > 0 && <g transform={`translate(${mix(1400, 1010, bag)} ${TY})`}><Contact x={0} y={0} w={90} /><Shade d="M-24 -120Q-100 -70 -88 -30Q-76 4 0 4Q76 4 88 -30Q100 -70 24 -120L40 -146H-40Z" tones={GOLD} L={LR} s={[7, 20, 11]} />{line("M-30 -118H30", P.coral, 13)}<Txt x={0} y={-36} s={54} c={GOLD[0]}>Rp</Txt></g>}
      </Stall>
    </Frame>
  );
};
/** s21 shot 3: tiga tahun */
export const YearsShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tThree = tw(word("Three"), 0.2), D = Math.max(3, dur);
  const run = seg(t, 0.1, D - 0.4, Easing.inOut(Easing.sin));
  const yr = Math.min(3, 1 + Math.floor(seg(t, tThree, D - 1) * 2.999));
  return (
    <Frame vignette={0.45}>
      <Stall t={t * 3} cam={drift(t, 1.05, 1.0, D)} pot={false} day={Math.max(0, Math.sin(t * 3)) * 0.45} leaf={false} mid={<Owner x={420} y={800} t={t} face="happy" look={30} />}>
        <path d={`M560 760C760 380 980 760 1180 520S1560 300 ${mix(700, 1830, run)} 330`} stroke="#fffdf4" strokeWidth={62} fill="none" strokeLinecap="round" opacity={0.25} />
        {Array.from({ length: Math.floor(run * 28) }, (_, i) => { const u = i / 28; return <Slip key={i} x={600 + u * 1260} y={620 - Math.sin(u * 8.6) * 150 - u * 220} r={Math.cos(u * 8.6) * -28} s={1.05} />; })}
        {Array.from({ length: Math.floor(run * 6.5) }, (_, i) => { const x = 700 + i * 190, rain = i % 2 === 0; return <g key={i} transform={`translate(${x} 712) scale(${pop(t, 0.1 + (i / 6.5) * (D - 0.5), 0.3)})`}><circle r={46} fill={P.navy} opacity={0.8} />{rain ? <g><path d="M-26 4a16 16 0 0 1 10-24a20 20 0 0 1 36 6a12 12 0 0 1 2 22Z" fill="#c8dcff" />{line("M-12 18l-5 12M6 18l-5 12M22 18l-5 12", "#74c0e8", 6)}</g> : <g><circle r={17} fill={P.coin} />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d="M0 -26V-34" stroke={P.coin} strokeWidth={7} strokeLinecap="round" transform={`rotate(${a})`} />)}</g>}</g>; })}
        <g transform={`translate(1580 170) scale(${pop(t, tThree, 0.3)})`}><path d={rr(-150, -64, 300, 118, 30)} fill={P.navy} opacity={0.88} /><Txt x={0} y={22} s={70} c={P.coin}>{`YEAR ${yr}`}</Txt></g>
      </Stall>
    </Frame>
  );
};

/** s23: semangkuk mi, koin utuh masuk kaleng; bayangan irisan kartu */
export const KeepShot: React.FC = () => {
  const { t, word } = useShot();
  const tKeep = tw(word("keeps"), 2.6), tCut = tw(word("cut"), tKeep + 2.4), tLose = tw(word("lose"), tCut + 1.6);
  const slide = seg(t, 0, 0.8, Easing.out(Easing.back(1.2))), ghost = seg(t, tCut - 0.3, tCut + 0.2) * (1 - seg(t, tLose + 2.2, tLose + 2.8)), cut = seg(t, tLose - 0.2, tLose + 1.4);
  const count = Math.round(seg(t, tw(word("fifty"), 0.6) - 0.2, tKeep + 0.6) * 50000);
  return (
    <Frame vignette={0.45}>
      <Stall t={t} cam={drift(t, 1.03, 1.08, 9)} pot={false} mid={<Owner x={430} y={800} t={t} face="happy" look={30} />}>
        <Bowl x={mix(-100, 660, slide)} y={TY} s={1.15} noodles t={t} />
        <Tin x={1060} y={TY} s={1.15} fill={0.2 + seg(t, 0.8, tKeep + 1) * 0.8} />
        {t < tKeep + 1.2 && t > 0.8 && [0, 1, 2, 3].map((i) => { const u = (t * 1.5 + i / 4) % 1; return <Coin key={i} x={mix(720, 1060, u)} y={mix(640, 580, u) - Math.sin(u * Math.PI) * 220} r={34} sx={Math.cos(u * 7)} />; })}
        <g transform={`translate(1060 300) scale(${pop(t, 0.8, 0.3) * (1 - seg(t, tCut - 0.4, tCut))})`}><path d={rr(-230, -66, 460, 116, 30)} fill={P.navy} opacity={0.88} /><Txt x={0} y={20} s={72} c={P.coin}>{`Rp${count.toLocaleString("en-US")}`}</Txt></g>
        {ghost > 0 && <g opacity={ghost}><Tin x={1530} y={TY} s={1.15} ghost /><g transform={`translate(${1560 + cut * 170} ${540 - cut * 220}) rotate(${cut * 40})`}><Coin x={0} y={0} r={34} op={0.8} /><Coin x={52} y={10} r={34} op={0.8} /><path d="M-60 40L110 -50" stroke={P.coral} strokeWidth={12} strokeDasharray="18 14" /></g></g>}
      </Stall>
    </Frame>
  );
};

/** s36 shot 1: turis datang */
export const ArriveShot: React.FC = () => {
  const { t, word } = useShot();
  const walk = seg(t, 0.1, tw(word("noodle"), 2.2) + 0.2, Easing.out(Easing.cubic)), hop = Math.abs(Math.sin(t * 8)) * 22 * (1 - walk);
  return (
    <Frame vignette={0.45}>
      <Stall t={t} cam={drift(t, 1.0, 1.08, 4, 940, 540)} mid={<Owner x={620} y={800} t={t} face="happy" look={34} />}>
        <Sticker x={1000} y={TY} s={0.9} />
        <Bowl x={800} y={TY} s={0.7} noodles t={t} />
        <path d={rr(1360, 1000, 240, 40, 16)} fill={P.coral} />
        <Tourist x={mix(2200, 1480, walk)} y={1040 - hop} s={1.12} t={t} face="happy" look={-34} />
      </Stall>
    </Frame>
  );
};
/** s36 shot 2: turis memindai dengan aplikasi Thailand */
export const TouristScanShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tScan = tw(word("scans"), 0.8), tApp = tw(word("Thai"), tScan + 1.4);
  const enter = seg(t, 0, tScan + 0.2, Easing.out(Easing.cubic)), lock = seg(t, tScan, tScan + 0.5, Easing.out(Easing.back(1.6)));
  return (
    <Frame vignette={0.5}>
      <Stall t={t + 4} cam={drift(t, 1.08, 1.14, 4, 1080, 560)} pot={false} mid={<Owner x={520} y={800} t={t} face="happy" look={30} />}>
        <Sticker x={1100} y={TY} s={0.98} glow={lock} />
        <ScanFrame x={1100} y={TY - 229} w={236} p={lock} />
        <Tourist x={vertical ? 1520 : 1760} y={1130} s={1.05} t={t} face="happy" look={-30} arm={[-240, -330]} />
        <Phone x={mix(2200, vertical ? 1320 : 1440, enter)} y={680 + Math.sin(t * 2) * 6} s={0.82} rot={-9} body={GOLD} bg="#5a3a80" glow="#ffe08a" screen={<g><g transform="translate(0 90) scale(0.62)"><Sticker x={0} y={0} stand={false} /></g><ScanFrame x={0} y={-45} w={140} p={lock} /><g opacity={seg(t, tApp - 0.2, tApp + 0.1)}><path d={rr(-80, 118, 160, 54, 18)} fill="#fff" /><Txt x={0} y={158} s={36} c={P.navy}>฿ THAI</Txt></g></g>} />
      </Stall>
    </Frame>
  );
};
/** s38 shot 1: harga dalam baht */
export const BahtShot: React.FC = () => {
  const { t, word } = useShot();
  const tPrice = tw(word("price"), 1.4), tBaht = tw(word("baht"), tPrice + 0.8);
  const v = Math.round(seg(t, tPrice - 0.2, tBaht + 0.2) * 105);
  return (
    <Frame vignette={0.5}>
      <Stall t={t + 7} cam={drift(t, 1.14, 1.2, 4)} pot={false} leaf={false}>
        <Tourist x={1620} y={1100} s={1.05} t={t} face="neutral" look={-30} arm={[-320, -230]} />
        <g transform={`translate(960 500) scale(${pop(t, 0.05, 0.4)})`}>
          <Phone x={0} y={0} s={1.75} rot={-3} body={GOLD} bg={P.cream} glow="#ffe08a" screen={<g><Coin x={0} y={-118} r={40} k="thb" /><Txt x={0} y={4} s={72} c={P.navy}>{`฿${v}`}</Txt><g opacity={seg(t, tBaht + 0.2, tBaht + 0.6)}><Txt x={0} y={52} s={26} c="#6a6290">≈ Rp50,000</Txt></g>{[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={-60 + i * 24} cy={106} r={8} fill={i < Math.floor((t - tBaht - 0.6) * 6) ? P.navy : "#d0c0d8"} />)}<path d={rr(-72, 134, 144, 42, 20)} fill={P.green} /></g>} />
        </g>
      </Stall>
    </Frame>
  );
};
/** s38 shot 2: baht keluar, rupiah masuk */
export const BahtRpShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tDown = tw(word("goes"), 1.2), tRp = tw(word("rupiah"), tDown + 1.6);
  const bal = Math.round(2400 - seg(t, tDown - 0.2, tDown + 0.8) * 105);
  const lx = vertical ? 680 : 480, rx = vertical ? 1240 : 1440;
  return (
    <Frame vignette={0.45}>
      <Back id="t5br" stops={["#241458", "#5c3084", "#c4607c"]} />
      <Layer cam={drift(t, 1.0, 1.04, 6)} d={1}>
        <path d={rr(vertical ? 420 : 110, 150, vertical ? 520 : 780, 690, 46)} fill="#cfe0ff" opacity={0.12} /><path d={rr(vertical ? 980 : 1030, 150, vertical ? 520 : 780, 690, 46)} fill="#ffd27a" opacity={0.14} />
        <Phone x={lx} y={420} s={0.95} body={GOLD} bg={P.cream} screen={<g><Txt x={0} y={-60} s={30} c="#6a6290">BALANCE</Txt><Txt x={0} y={14} s={46} c={P.navy}>{`฿${bal.toLocaleString("en-US")}`}</Txt>{line("M-50 70L0 100L50 70", P.coral, 14)}</g>} />
        <Tin x={rx} y={720} s={1.35} fill={0.2 + seg(t, tRp - 1.4, tRp + 0.8) * 0.8} />
        {[0, 1, 2].map((i) => { const u = (t * 0.9 + i / 3) % 1, on = t > tDown - 0.3; return on ? <g key={i} opacity={Math.sin(u * Math.PI)}><Coin x={lx + u * 120} y={620 + u * 190} r={46} k="thb" /><Coin x={rx} y={220 + u * 250} r={46} /></g> : null; })}
        <Coin x={lx - 250} y={760} r={40} k="thb" /><Coin x={rx + 290} y={760} r={40} />
      </Layer>
    </Frame>
  );
};

/** s45 shot 1: kembali ke warung, bendera kecil */
export const BackShot: React.FC = () => {
  const { t } = useShot();
  return (
    <Frame vignette={0.5}>
      <Stall t={t} cam={drift(t, 0.98, 1.2, 5, 1040, 560)} mid={<Owner x={620} y={800} t={t} face="calm" look={24} />}>
        <Bowl x={820} y={TY} s={0.75} noodles t={t} />
        <Sticker x={1180} y={TY} s={0.98} glow={0.45 + Math.sin(t * 2) * 0.15} />
        {line("M60 120Q960 300 1860 130", "#fff4da", 6)}
        {Array.from({ length: 17 }, (_, i) => { const u = (i + 0.5) / 17, x = 60 + u * 1800, y = 120 + Math.sin(u * Math.PI) * 90 + u * 8; return <path key={i} d={`M${x - 34} ${y}H${x + 34}L${x + Math.sin(t * 3 + i) * 9} ${y + 70}Z`} fill={i % 2 ? "#fffdf4" : "#e03a44"} />; })}
      </Stall>
    </Frame>
  );
};
/** s47 shot 1-2: kamu dan turis, dua dentang, koin sewarna */
export const TogetherShot: React.FC = () => {
  const { t, word, vertical, bubble } = useShot();
  const tPay = tw(word("pay"), 3.2), tOwner = tw(word("owner"), tPay + 1.4), tCh = tw(word("chime"), tOwner + 1.2);
  const both = seg(t, tPay - 0.4, tPay + 0.2), t2 = tCh + 0.5;
  return (
    <Frame vignette={0.45}>
      <Stall t={t} cam={drift(t, 1.02, 1.08, 9, 960, 550)} pot={false} mid={<Owner x={420} y={800} t={t} face={t > tOwner ? "happy" : "calm"} look={28} />}>
        <Sticker x={950} y={TY} s={0.86} glow={bump(t, tPay, 1.2)} />
        <Bowl x={1180} y={TY} s={0.62} noodles t={t} /><Bowl x={1330} y={TY} s={0.62} noodles t={t + 1} />
        <Tin x={640} y={TY} s={0.7} fill={0.4 + seg(t, tCh, t2 + 0.8) * 0.6} />
        {[tCh, t2].map((a, i) => { const u = seg(t, a, a + 0.5, Easing.in(Easing.quad)); return u > 0 && u < 1 ? <Coin key={i} x={640} y={mix(330, 650, u)} r={34} /> : null; })}
        <Chime x={750} y={TY - 55} since={t - tCh} /><Chime x={750} y={TY - 55} since={t - t2} />
        <Phone x={750} y={TY - 55} s={0.28} body={TEALB} bg={t > tCh ? P.green : "#1b2a5c"} />
        <You x={vertical ? 1330 : 1480} y={1130} s={0.95} t={t} face="happy" look={-30} arm={[-210, mix(-110, -330, both)]} />
        <Tourist x={vertical ? 1560 : 1780} y={1130} s={0.95} t={t} face="happy" look={-30} arm={[-200, mix(-110, -340, both)]} />
        <g opacity={both}><Phone x={vertical ? 1160 : 1270} y={760} s={0.42} rot={-12} bg={t > tCh - 0.4 ? P.green : "#5a3a80"} screen={t > tCh - 0.4 ? <TickScreen p={1} /> : <QrGrid x={-70} y={-80} size={140} />} />
          <Phone x={vertical ? 1390 : 1580} y={750} s={0.42} rot={-8} body={GOLD} bg={t > t2 - 0.3 ? P.green : "#5a3a80"} screen={t > t2 - 0.3 ? <TickScreen p={1} /> : <QrGrid x={-70} y={-80} size={140} />} /></g>
        {bubble && <Bubble x={480} y={420} text={bubble} p={pop(t, tOwner)} />}
      </Stall>
    </Frame>
  );
};
/** s48: amplop lama melayang ke bank batu */
export const WireShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const D = Math.max(dur, 4), go = seg(t, 0.2, D, Easing.inOut(Easing.sin)), far = seg(t, tw(word("wire"), 1.4) - 0.4, D - 0.5);
  const ex = mix(760, 1560, go), ey = mix(700, 330, go) + Math.sin(t * 2.4) * 26;
  const cam = { x: mix(960, 1180, go), y: 540, z: mix(1.04, 1.1, go) };
  return (
    <Frame vignette={0.55}>
      <Stall t={t + 9} cam={cam} pot={false} leaf={false}>
        <Sticker x={600} y={TY} s={0.72} />
        <g opacity={far} transform={`translate(1640 ${430 - far * 20}) scale(0.62)`}>
          <Glow2 x={0} y={-140} r={380} c="#c8b0ff" o={0.5} />
          <path d="M-330 20Q0 -40 330 20Q200 150 0 160Q-200 150 -330 20Z" fill="#45286a" />
          <Shade d="M-220 0V-210H220V0Z" tones={["#352858", "#554478", "#7c6a9c", "#c0aed8"]} L={LR} s={[8, 24, 12]} />
          <Shade d="M-250 -200L0 -330L250 -200Z" tones={["#2c2050", "#463668", "#66548a", "#a894c4"]} L={LR} s={[6, 18, 10]} />
          {[-160, -80, 0, 80, 160].map((a) => <path key={a} d={rr(a - 20, -180, 40, 180, 12)} fill="#c0aed8" />)}
          <path d={rr(-34, -100, 68, 100, 30, 2)} fill="#ffd27a" />
        </g>
        <path d={`M760 700Q1100 330 ${ex} ${ey}`} stroke="#fff4da" strokeWidth={7} strokeDasharray="14 24" fill="none" strokeLinecap="round" opacity={0.6} />
        <Envelope x={ex} y={ey} s={mix(1.3, 0.7, go)} rot={Math.sin(t * 2) * 10} old />
      </Stall>
    </Frame>
  );
};
export const _w = { Frame, Pill, useLabel, SANS, BLUE, Bottle, SILVER };
