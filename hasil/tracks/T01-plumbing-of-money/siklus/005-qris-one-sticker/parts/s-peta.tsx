// Adegan peta kota: s11, s13-s16, s20, s22, s25, s28a, s37; interior stasiun dan menara.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, R, clamp, mix, pop, seg, useShot } from "@r3";
import { FarCity, Lamp, Shade, Tree, rr } from "@r3/art";
import { BLUE, CORAL, CREAM, Contact, DARK, GOLD, GREEN, Glow2, Hose, LL, LR, P, Phone, STEEL, TEALB, Tick, You, circ, ell, line, tw, COPPER } from "./kit";
import { AppTower, BankHouse, MAPX, ROAD_A, ROAD_B, Road, SwitchStation, TownBoard } from "./peta";
import { Birds, Flag, Puff, Shrub } from "./dekor";
import { Back, BankChar, BFace, CentralBank, Coin, Envelope, NetTower, Socket, Txt, bump, drift } from "./benda";

type V = [number, number];
const q = (a: V, b: V, c: V, d: V, u: number): V => { const v = 1 - u; return [0, 1].map((i) => v * v * v * a[i] + 3 * v * v * u * b[i] + 3 * v * u * u * c[i] + u * u * u * d[i]) as V; };
export const onA = (u: number) => q([400, 735], [520, 850], [760, 850], [960, 750], clamp(u));
export const onB = (u: number) => q([960, 750], [1160, 850], [1390, 850], [1510, 735], clamp(u));
const Env: React.FC<{ p: V; s?: number; t: number; k?: "rp" | "thb"; o?: number }> = ({ p, s = 0.62, t, k, o = 1 }) => <g opacity={o}><Glow2 x={p[0]} y={p[1] - 30} r={110} c="#ffd27a" o={0.6} /><Envelope x={p[0]} y={p[1] - 36 + Math.sin(t * 9) * 4} s={s} rot={Math.sin(t * 7) * 6} k={k} /></g>;

/** peta lengkap dengan parameter keadaan */
export const Town: React.FC<{ t: number; cam: { x: number; y: number; z: number }; gauge?: number; spin?: number; appMood?: string; swMood?: string; bankMood?: string; lean?: number; sw?: number; children?: React.ReactNode; under?: React.ReactNode }> = ({ t, cam, gauge, spin = 0, appMood, swMood, bankMood, lean = 0, sw = 1, children, under }) => (
  <TownBoard t={t} cam={cam}>
    <Road d={ROAD_A} p={1} t={t} /><Road d={ROAD_B} p={1} t={t} />{under}
    <g transform={`rotate(${lean * 8} ${MAPX.app} ${MAPX.y})`}><AppTower x={MAPX.app} y={MAPX.y} s={0.95} t={t} gauge={gauge} /><BFace x={MAPX.app} y={MAPX.y - 190} s={0.9} mood={appMood} t={t} look={10 * lean} /></g>
    <g transform={`rotate(${-lean * 8} ${MAPX.bank} ${MAPX.y})`}><BankChar x={MAPX.bank} y={MAPX.y} s={0.95} t={t} mood={bankMood} /></g>
    <SwitchStation x={MAPX.sw} y={MAPX.y + 8} s={0.98 * sw} t={t} spin={spin} /><BFace x={MAPX.sw} y={MAPX.y - 160} s={0.85} mood={swMood} t={t} />
    {children}
  </TownBoard>
);

/** s11 shot 2: pesan lewat stasiun */
export const MessagesShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tPass = tw(word("passes"), 0.8), D = Math.max(dur, 4);
  const a = seg(t, 0.3, tPass + 0.9, Easing.inOut(Easing.sin)), b = seg(t, tPass + 1.5, D - 0.2, Easing.inOut(Easing.sin));
  const miss = seg(t, tw(word("aren't"), D - 1.6) - 0.2, tw(word("aren't"), D - 1.6) + 0.3);
  return (
    <Frame vignette={0.45}>
      <Town t={t} cam={drift(t, 1.02, 1.07, D)} spin={seg(t, tPass + 0.8, tPass + 1.6) * 240}>
        {miss > 0 && <g opacity={miss}><path d="M420 330Q960 80 1490 400" stroke="#ff9a9a" strokeWidth={9} strokeDasharray="24 30" fill="none" strokeLinecap="round" /><g transform={`translate(955 218) scale(${pop(t, tw(word("aren't"), D - 1.6), 0.3)})`}><circle r={46} fill={P.coral} />{line("M-17 -17L17 17M17 -17L-17 17", "#fff", 11)}</g></g>}
        {a < 1 && <Env p={onA(a)} t={t} />}{b > 0 && <Env p={onB(b)} t={t} />}
      </Town>
    </Frame>
  );
};

/** s13 shot 1: ketik jumlah dan PIN */
export const PinShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tFifty = tw(word("fifty"), 1), tPin = tw(word("PIN"), tFifty + 1.4);
  const digits = "50000".slice(0, Math.floor(seg(t, 0.25, tFifty + 0.5, Easing.linear) * 5 + 1e-6));
  const dots = Math.floor(seg(t, tFifty + 0.7, tPin + 0.4, Easing.linear) * 6 + 1e-6);
  const k = Math.floor(t * 6) % 9, press = t > 0.25 && dots < 6;
  const n = digits ? Number(digits).toLocaleString("en-US") : "0";
  return (
    <Frame vignette={0.5}>
      <Back id="t5pin" stops={["#16103c", "#3c2470", "#96487c"]} />
      <Layer cam={drift(t, 1.0, 1.08, Math.max(4, dur))} d={1}>
        <Glow2 x={960} y={500} r={720} c="#6fb4ff" o={0.3} />
        <Phone x={960} y={500} s={1.85} rot={-3} bg={P.cream} screen={<g><Txt x={0} y={-122} s={20} c="#6a6290">WARUNG MI</Txt><Txt x={0} y={-80} s={38} c={P.navy}>{`Rp${n}`}</Txt>{[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={-60 + i * 24} cy={-46} r={8} fill={i < dots ? P.navy : "#d8c8d8"} />)}{Array.from({ length: 9 }, (_, i) => { const x = -60 + (i % 3) * 60, y = -4 + Math.floor(i / 3) * 58, on = press && i === k; return <g key={i} transform={`translate(${x} ${y}) scale(${on ? 0.88 : 1})`}><circle r={25} fill={on ? P.coin : "#e8d8c0"} /><Txt x={0} y={9} s={26} c={P.navy}>{i + 1}</Txt></g>; })}<circle cy={170} r={25} fill="#e8d8c0" /><Txt x={0} y={179} s={26} c={P.navy}>0</Txt></g>} />
        <You x={1600} y={1170} s={1.15} t={t} face="neutral" look={-30} arm={[-300 + (press ? (k % 3) * 40 - 40 : 0), -330 + (press ? Math.floor(k / 3) * 40 : 0)]} />
      </Layer>
    </Frame>
  );
};
/** s13 shot 2: jarum saldo turun, amplop berangkat */
export const SendShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tCheck = tw(word("checks"), 0.6), tSend = tw(word("sends"), tCheck + 1), D = Math.max(dur, 5);
  const g = mix(0.72, 0.52, seg(t, tCheck, tCheck + 0.5, Easing.out(Easing.back(2))));
  const a = seg(t, tSend, D - 0.1, Easing.inOut(Easing.sin));
  const msg = seg(t, tw(word("take"), tSend + 1.4) - 0.2, tw(word("take"), tSend + 1.4) + 0.2);
  const cam = { x: mix(720, 940, seg(t, tSend, D)), y: mix(500, 545, seg(t, tSend, D)), z: mix(1.2, 1.04, seg(t, tSend - 0.5, tSend + 1.6)) };
  return (
    <Frame vignette={0.45}>
      <Town t={t} cam={cam} gauge={g}>
        {t > tSend - 0.1 && <Env p={onA(a)} t={t} s={mix(0.2, 0.85, pop(t, tSend - 0.1, 0.35))} />}
        {msg > 0 && <g transform={`translate(${onA(a)[0] + 40} ${onA(a)[1] - 190}) scale(${msg})`}><path d={rr(-170, -56, 340, 100, 28)} fill="#fff4da" /><path d="M-70 42L-52 72L-24 42Z" fill="#fff4da" /><Txt x={0} y={14} s={44} c={P.navy}>Rp50,000 →</Txt></g>}
      </Town>
    </Frame>
  );
};
/** s14 shot 1: di dalam stasiun, meja putar */
export const TurntableShot: React.FC = () => {
  const { t, word, dur, faces } = useShot();
  const tReads = tw(word("reads"), 0.6), tFw = tw(word("forwards"), tReads + 2), D = Math.max(dur, 4);
  const turn = [0, 1, 2].reduce((s, i) => s + seg(t, tReads + 0.25 + i * 0.55, tReads + 0.5 + i * 0.55, Easing.out(Easing.back(2.2))), 0);
  const ang = 180 + turn * 60, off = seg(t, tFw, tFw + 1.1, Easing.in(Easing.cubic));
  const scan = bump(t, tReads - 0.1, 0.9);
  return (
    <Frame vignette={0.55}>
      <Back id="t5in" stops={["#0c1434", "#1c3064", "#2a4a7c"]} />
      <Layer cam={drift(t, 1.0, 1.08, D)} d={0.5}>
        {Array.from({ length: 11 }, (_, i) => <g key={i}><path d={rr(-120 + i * 200, -40, 170, 640, 30)} fill="#26427a" opacity={0.7} />{[60, 220, 380, 540].map((y) => <circle key={y} cx={-90 + i * 200} cy={y} r={9} fill="#6c9ac8" />)}</g>)}
        {[260, 1660].map((x) => <g key={x}><path d={rr(x - 190, 260, 380, 440, 190, 0)} fill="#080e28" /><Glow2 x={x} y={600} r={260} c={x > 900 ? "#7dffb8" : "#ffd27a"} o={0.4} /></g>)}
      </Layer>
      <Layer cam={drift(t, 1.0, 1.05, D)} d={1}>
        {[-1, 1].map((s) => <g key={s} transform={`translate(${960 + s * 820} 150)`}><Shade d={rr(-90, -40, 180, 140, 40)} tones={COPPER} L={LL} s={[6, 18, 10]} />{[0, 1, 2, 3].map((j) => line(`M-86 ${-10 + j * 30}Q0 ${12 + j * 30} 86 ${-10 + j * 30}`, COPPER[0], 8))}</g>)}
        <path d="M960 760L2100 860V1000L960 830Z" fill="#8a5a52" /><path d="M960 775L2100 885V955L960 815Z" fill="#ffd27a" />
        <Shade d={ell(960, 780, 520, 190)} tones={STEEL} L={LL} s={[10, 30, 16]} /><path d={ell(960, 762, 430, 145)} fill={GREEN[2]} />
        <g transform={`translate(960 762) scale(1 0.36) rotate(${ang})`}>{line("M-340 0H330M220 -110L340 0L220 110", P.coin, 54)}</g>
        <g transform={`translate(${mix(960, 2150, off)} ${690 + off * 190})`}><Envelope x={0} y={0} s={1.7 * (1 - off * 0.2)} rot={Math.sin(t * 2) * 3 + off * 14} />
          {scan > 0 && <rect x={-150} y={-100 + ((t - tReads) * 220) % 200} width={300} height={10} rx={5} fill="#7dffd0" opacity={scan} />}</g>
        <g transform={`translate(960 270) scale(${faces.switch ? 1.7 : 0})`}><Shade d={rr(-150, -96, 300, 192, 56)} tones={STEEL} L={LL} s={[5, 15, 8]} />{[[-122, -68], [122, -68], [-122, 68], [122, 68]].map(([a, b]) => <circle key={`${a}${b}`} cx={a} cy={b} r={8} fill={STEEL[3]} />)}<circle cy={-112} r={13} fill="#7dffb8" /><BFace x={0} y={0} mood="calm" t={t} look={off * 22} /></g>
      </Layer>
    </Frame>
  );
};
/** s14 shot 2: bank menyetujui */
export const BankYesShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tChk = tw(word("checks"), 0.9), tYes = tw(word("yes"), tChk + 1.4), D = Math.max(dur, 4);
  const arrive = seg(t, 0, tChk, Easing.out(Easing.sin)), stamp = pop(t, tYes - 0.2, 0.3), back = seg(t, tYes + 0.15, D, Easing.inOut(Easing.sin));
  const cam = { x: mix(1260, 1120, back), y: 550, z: 1.18 - back * 0.08 };
  return (
    <Frame vignette={0.45}>
      <Town t={t} cam={cam} bankMood={t > tYes - 0.3 ? "happy" : "neutral"}>
        <g><Envelope x={onB(arrive)[0]} y={mix(onB(arrive)[1] - 40, 470, seg(t, tChk - 0.4, tChk))} s={mix(0.6, 1.1, seg(t, tChk - 0.4, tChk))} stamped={stamp} /></g>
        {t > tYes + 0.1 && <g transform={`translate(${onB(1 - back)[0]} ${onB(1 - back)[1] - 40})`}><Glow2 x={0} y={0} r={130} c="#7dffb8" o={0.8} /><Tick x={0} y={0} r={44} p={pop(t, tYes + 0.1)} /></g>}
      </Town>
    </Frame>
  );
};
/** s15 shot 3: lingkaran penuh dan penghitung dua detik */
export const LoopShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tRound = tw(word("round"), 1), D = Math.max(dur, 4);
  const p = seg(t, 0.3, D - 0.6, Easing.inOut(Easing.sin)), sec = p * 2;
  return (
    <Frame vignette={0.45}>
      <Town t={t} cam={drift(t, 1.0, 1.05, D)}>
        {[{ d: "M400 700C520 815 760 815 960 718C1160 815 1390 815 1510 700", dash: p * 2 }, { d: "M1510 770C1390 905 1160 900 960 800C760 900 520 905 400 770", dash: p * 2 - 1 }].map((r, i) => <g key={i}><path d={r.d} pathLength={100} strokeDasharray={`${clamp(r.dash) * 100} 100`} stroke="#7dffb8" strokeWidth={40} opacity={0.25} fill="none" strokeLinecap="round" /><path d={r.d} pathLength={100} strokeDasharray={`${clamp(r.dash) * 100} 100`} stroke="#7dffb8" strokeWidth={14} fill="none" strokeLinecap="round" /></g>)}
        <g transform={`translate(960 250) scale(${pop(t, tRound - 0.2, 0.35)})`}><Shade d={circ(0, 0, 112)} tones={GOLD} L={LL} s={[5, 16, 9]} /><circle r={90} fill={P.cream} /><path d="M0 -74A74 74 0 1 1 -0.1 -74" pathLength={100} strokeDasharray={`${p * 100} 100`} stroke={P.green} strokeWidth={18} fill="none" /><Txt x={0} y={22} s={64} c={P.navy}>{`${sec.toFixed(1)}s`}</Txt></g>
      </Town>
    </Frame>
  );
};
/** s16 shot 1: koin bertanya di atas stasiun */
export const WhoPaysShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tWho = tw(word("who"), 0.5), D = Math.max(dur, 3);
  const drop = seg(t, 0, tWho + 0.3, Easing.out(Easing.back(1.4)));
  return (
    <Frame vignette={0.55}>
      <Town t={t} cam={drift(t, 1.05, 1.16, D, 960, 470)}>
        <rect x={-400} y={-300} width={2700} height={1600} fill="#0a0f2c" opacity={0.45 * drop} />
        <g transform={`translate(960 ${mix(-100, 250, drop) + Math.sin(t * 2.4) * 10}) rotate(${Math.sin(t * 1.7) * 16})`}><Glow2 x={0} y={0} r={240} c="#ffd23f" o={0.6} /><Coin x={0} y={0} r={96} sx={Math.cos(Math.max(0, tWho + 1 - t) * 6)} label={false} /><Txt x={0} y={40} s={118} c={GOLD[0]}>?</Txt></g>
      </Town>
    </Frame>
  );
};
/** s16 shot 2: gerobak seratus koin dari video kartu */
export const CartShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tHundred = tw(word("hundred-dollar"), 0.8), tCost = tw(word("cost"), tHundred + 1.2), D = Math.max(dur, 4.5);
  const x = mix(-150, 1560, seg(t, 0, D, Easing.inOut(Easing.sin)));
  const gates = [620, 960, 1300], lost = gates.filter((g) => x > g).length;
  return (
    <Frame vignette={0.45}>
      <Back id="t5cart" stops={["#241458", "#5c3084", "#e0806c"]} />
      <Layer cam={drift(t, 1.02, 1.06, D)} d={0.15}><Glow2 x={1450} y={560} r={520} c="#ffb35a" o={0.6} /><circle cx={1450} cy={560} r={70} fill="#ffe2b0" /><Puff x={260 + t * 8} y={250} c="#d07aa0" o={0.7} /><Puff x={1100 + t * 5} y={150} s={0.8} c="#a45c9c" o={0.7} /><Puff x={1760 + t * 6} y={330} s={0.9} c="#f09a90" o={0.7} /><Birds x={420} y={300} t={t} /></Layer>
      <Layer cam={drift(t, 1.02, 1.06, D)} d={0.3}><FarCity x0={-300} x1={2300} base={640} seed={9} fill="#7a4090" hi="#f0a08a" t={t} lights={0.08} /></Layer>
      <Layer cam={drift(t, 1.02, 1.06, D)} d={0.5}>{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${i * 150 - 150} 720Q${i * 150 - 90} ${520 - (i % 3) * 70} ${i * 150 + 30} 720Z`} fill="#5a3078" />)}{[120, 360, 800, 1130, 1480, 1800].map((x, i) => <Tree key={x} x={x} base={712} s={0.9 + (i % 3) * 0.2} seed={i * 5} t={t} />)}</Layer>
      <Layer cam={drift(t, 1.02, 1.06, D)} d={1}>
        <path d="M-300 700H2220V1200H-300Z" fill="#2c1c52" /><path d="M-300 742H2220V830H-300Z" fill="#46305c" />{Array.from({ length: 16 }, (_, i) => <path key={i} d={rr(-260 + i * 170, 782, 80, 9, 4)} fill="#ffd27a" />)}
        {[210, 1700].map((x, i) => <Lamp key={x} x={x} base={700} s={2} t={t + i} />)}{[100, 340, 780, 1130, 1500, 1840].map((x, i) => <Shrub key={x} x={x} y={900} s={0.8 + (i % 2) * 0.35} flower={i % 2 ? "#ffd23f" : undefined} />)}
        {line("M-300 700H2220", "#c0d6f0", 10, 0.7)}{Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${i * 110 - 200} 700V736`} stroke="#8aa0c4" strokeWidth={9} />)}
        {gates.map((g, i) => <g key={g}><Contact x={g} y={742} w={120} /><Shade d={rr(g + 36, 590, 90, 150, 18)} tones={CREAM} L={LR} s={[4, 12, 7]} /><path d={rr(g + 52, 612, 58, 44, 8)} fill="#ffd27a" /><path d={`M${g + 22} 598L${g + 81} 558L${g + 140} 598Z`} fill={[BLUE, CORAL, GREEN][i][2]} /><g transform={`rotate(${x > g - 170 && x < g + 190 ? -62 : 0} ${g + 20} 640)`}>{line(`M${g + 20} 640H${g - 110}`, "#fff4da", 14)}{line(`M${g - 20} 640h-26M${g - 76} 640h-26`, P.coral, 14)}</g><Flag x={g} y={322} t={t + i} c={[BLUE, CORAL, GREEN][i][3]} /><Shade d={rr(g - 28, 360, 56, 380, 14)} tones={STEEL} L={LR} s={[4, 12, 7]} /><Shade d={rr(g - 90, 320, 180, 74, 22)} tones={[BLUE, CORAL, GREEN][i]} L={LR} s={[4, 12, 7]} /><circle cx={g} cy={357} r={16} fill="#fff4da" /></g>)}
        <g transform={`translate(${x} 700)`}>
          <Contact x={0} y={86} w={210} />
          {Array.from({ length: 24 - lost * 2 }, (_, i) => <Coin key={i} x={-130 + (i % 8) * 37 + (Math.floor(i / 8) % 2) * 15} y={-55 - Math.floor(i / 8) * 34} r={26} label={false} />)}
          <Shade d="M-180 -60H180L150 40H-150Z" tones={["#3c1d3e", "#6a3340", "#98523e", "#d98a56"]} L={LR} s={[5, 16, 9]} />
          {[-100, 100].map((w) => <g key={w} transform={`translate(${w} 52) rotate(${x * 1.6})`}><circle r={38} fill={DARK[2]} />{line("M-28 0H28M0 -28V28", STEEL[2], 8)}</g>)}
          <g transform="translate(0 -215)"><path d={rr(-110, -48, 220, 82, 24)} fill={P.navy} opacity={0.9} /><Txt x={0} y={12} s={52} c={P.coin}>{`$${(100 - [0, 1.1, 1.9, 2.75][lost]).toFixed(2)}`}</Txt></g>
        </g>
        {gates.map((g, i) => { const when = Math.acos(1 - 2 * clamp((g + 150) / 1710)) / Math.PI * D, u = seg(t, when, when + 0.7); return u > 0 ? <g key={g}><Coin x={g + 70 * u} y={690 - Math.sin(u * Math.PI) * 240 - u * 250} r={26 + i * 3} label={false} /></g> : null; })}
        <g transform={`translate(960 160) scale(${pop(t, tCost, 0.3)})`}><Txt x={0} y={0} s={46} c="#fff4da">from a $100 card tap</Txt></g>
      </Layer>
    </Frame>
  );
};
/** s20 shot 1: tiga bangunan menatap nampan hampir kosong */
export const TrayShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const D = Math.max(dur, 4), tAlm = tw(word("almost"), 2);
  const lean = seg(t, 0.2, tAlm, Easing.out(Easing.back(1.3))), rattle = Math.sin(t * 34) * 12 * bump(t, tAlm, 0.8);
  return (
    <Frame vignette={0.5}>
      <Town t={t} cam={drift(t, 1.02, 1.1, D)} lean={lean} appMood="neutral" swMood="tired" bankMood="neutral">
        <g transform={`translate(${960 + rattle} 905)`}><Contact x={0} y={16} w={240} /><Shade d={ell(0, -10, 220, 56)} tones={STEEL} L={LL} s={[5, 16, 9]} /><path d={ell(0, -20, 172, 36)} fill={STEEL[1]} /><Coin x={34 - rattle * 2} y={-30} r={26} /></g>
      </Town>
    </Frame>
  );
};
/** s20 shot 2: bank sentral membuka pintu, gerobak masuk kota menyala */
export const WayInShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tBank = tw(word("Bank"), 0.4), tWants = tw(word("wants"), tBank + 1.2), tWay = tw(word("way"), tWants + 3), D = Math.max(dur, 6);
  const open = seg(t, tWants - 0.4, tWants + 0.6);
  return (
    <Frame vignette={0.45}>
      <TownBoard t={t} cam={drift(t, 1.0, 1.1, D, 1050, 540)}>
        {Array.from({ length: 22 }, (_, i) => { const at = tWants + 0.4 + i * 0.17, on = t > at; const x = 80 + (i % 11) * 74, y = 600 + Math.floor(i / 11) * 90; return <g key={i}><path d={rr(x - 28, y - 56 - (i % 3) * 16, 56, 56 + (i % 3) * 16, 10, 2)} fill="#2c3c74" /><rect x={x - 14} y={y - 40} width={28} height={20} rx={5} fill={on ? "#ffd27a" : "#16224a"} />{on && <Glow2 x={x} y={y - 30} r={66} c="#ffd27a" o={0.5} />}</g>; })}
        <CentralBank x={1350} y={790} s={1.05} t={t} open={open} mood={t > tWay - 1 ? "happy" : "calm"} />
        {[0, 1, 2, 3].map((i) => { const u = seg(t, tWants + 0.2 + i * 0.8, tWants + 2.8 + i * 0.8, Easing.linear); if (u <= 0 || u >= 1) return null; const x = mix(1350, 330, u), s = mix(0.55, 0.9, Math.min(1, u * 3)); return <g key={i} transform={`translate(${x} ${mix(790, 870, Math.min(1, u * 2.4))}) scale(${s})`}><Contact x={0} y={0} w={90} /><Shade d={rr(-70, -100, 140, 80, 16)} tones={[BLUE, CORAL, GREEN, GOLD][i]} L={LL} s={[4, 12, 7]} /><path d="M-86 -146Q0 -196 86 -146Z" fill="#fff4da" />{line("M-60 -146V-100M60 -146V-100", "#c0d6f0", 8)}{[-45, 45].map((a) => <circle key={a} cx={a} cy={-16} r={18} fill="#0c1230" />)}</g>; })}
      </TownBoard>
    </Frame>
  );
};
/** s22 shot 1: menara membuka pintu seperti toko */
export const DoorShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tOpen = tw(word("open"), 1.4), D = Math.max(dur, 4);
  const open = seg(t, tOpen - 0.3, tOpen + 0.5), walk = seg(t, tOpen + 0.3, D, Easing.in(Easing.sin));
  return (
    <Frame vignette={0.5}>
      <Back id="t5door" stops={["#0b1130", "#1c2c60", "#5a3a82"]} stars={60} t={t} />
      <Layer cam={drift(t, 1.0, 1.14, D, 960, 580)} d={1}>
        <path d="M-300 920H2220V1200H-300Z" fill="#1d3056" />
        <AppTower x={960} y={930} s={1.72} t={t} shut={1 - open} />
        <BFace x={960} y={430} s={1.5} mood="happy" t={t} />
        <g transform={`translate(960 770) rotate(${Math.sin(t * 9) * 18 * bump(t, tOpen, 1.2)})`}><path d="M-26 0Q-26 -40 0 -40Q26 -40 26 0L34 10H-34Z" fill={P.coin} /><circle cy={18} r={9} fill={GOLD[1]} /></g>
        <You x={mix(1560, 970, walk)} y={mix(1050, 925, walk)} s={mix(0.8, 0.25, walk)} t={t} face="neutral" look={-30} />
      </Layer>
    </Frame>
  );
};
/** s22 shot 2: rak kotak menyala */
export const ShelfShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tSee = tw(word("balance"), 0.8), tStay = tw(word("stay"), tSee + 1), D = Math.max(dur, 5);
  const walk = seg(t, 0, tStay + 0.8, Easing.out(Easing.sin));
  const items: [string, [string, string, string, string], string][] = [["BALANCE", BLUE, "Rp"], ["TOP UP", GREEN, "+"], ["BILLS", CORAL, "≡"], ["TICKETS", GOLD, "★"]];
  const ats = [tSee - 0.3, tSee + 0.5, tStay - 0.4, tStay + 0.4];
  return (
    <Frame vignette={0.55}>
      <Back id="t5shelf" stops={["#18104a", "#2c2070", "#4a3c94"]} />
      <Layer cam={{ x: mix(900, 1030, walk), y: 540, z: 1.02 + t * 0.004 }} d={1}>
        <path d="M-300 880H2220V1200H-300Z" fill="#22184c" />
        {[330, 640].map((y) => <Shade key={y} d={rr(120, y, 1690, 40, 14)} tones={STEEL} L={LR} s={[3, 9, 5]} />)}
        {items.map(([name, c, ic], i) => { const on = t > ats[i], x = 330 + i * 420, p = on ? pop(t, ats[i], 0.35) : 0; return <g key={name} transform={`translate(${x} ${mix(250, 260, i % 2)})`}>{on && <Glow2 x={0} y={0} r={250} c={c[3]} o={0.5} />}<g transform={`scale(${1 + p * 0.1 - (p > 0.99 ? 0 : 0)})`} opacity={on ? 1 : 0.25}><Shade d={rr(-130, -120, 260, 190, 30)} tones={c} L={LR} s={[6, 18, 10]} /><Txt x={0} y={8} s={90}>{ic}</Txt></g><Txt x={0} y={150} s={38} o={on ? 1 : 0.3}>{name}</Txt>{[0, 1, 2].map((j) => <path key={j} d={rr(-110 + j * 80, 280, 60, 80 + ((i + j) % 3) * 20, 14)} fill={c[2]} opacity={on ? 0.75 : 0.2} />)}</g>; })}
        <You x={mix(150, 1500, walk)} y={1080} s={0.95} t={t} face="neutral" look={26} />
      </Layer>
    </Frame>
  );
};
/** s25 shot 1-2: switch berlisensi, pesan kartu lewat jalan yang sama */
export const LicensedShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tLic = tw(word("licensed"), 1.6), tCard = tw(word("Card"), tLic + 2.2), D = Math.max(dur, 7);
  const fly = seg(t, tLic - 0.7, tLic + 0.1, Easing.inOut(Easing.cubic));
  const a = seg(t, tCard - 0.2, tCard + 1.2, Easing.linear), b = seg(t, tCard + 1.4, tCard + 2.8, Easing.linear);
  const e = seg(t, tCard - 1.2, tCard + 0.3, Easing.linear);
  const p = a < 1 ? onA(a) : onB(b);
  return (
    <Frame vignette={0.45}>
      <TownBoard t={t} cam={drift(t, 1.02, 1.08, D)}>
        <Road d={ROAD_A} p={1} t={t} /><Road d={ROAD_B} p={1} t={t} />
        <AppTower x={150} y={720} s={0.72} t={t} /><CentralBank x={520} y={640} s={0.62} t={t} mood="calm" /><BankHouse x={MAPX.bank} y={MAPX.y} s={0.95} t={t} />
        <SwitchStation x={MAPX.sw} y={MAPX.y + 8} t={t} spin={(a + b) * 180} /><BFace x={MAPX.sw} y={MAPX.y - 160} s={0.85} mood={t > tLic ? "happy" : "neutral"} t={t} />
        {fly > 0 && <g transform={`translate(${mix(520, 1100, fly)} ${mix(380, 680, fly) - Math.sin(fly * Math.PI) * 200}) rotate(${(1 - fly) * -120}) scale(${mix(0.6, 1, fly)})`}><Shade d={rr(-60, -72, 120, 144, 18)} tones={GOLD} L={LL} s={[4, 12, 7]} /><circle cy={-24} r={22} fill={P.green} />{line("M-10 -24L-3 -16L12 -32", "#fff", 7)}{line("M-34 22H34M-34 44H14", GOLD[0], 8)}</g>}
        {a > 0 && b < 1 && <g transform={`translate(${p[0]} ${p[1] - 40}) rotate(${Math.sin(t * 8) * 8})`}><Glow2 x={0} y={0} r={110} c="#9fc4ff" o={0.7} /><Shade d={rr(-56, -36, 112, 72, 12)} tones={BLUE} L={LL} s={[3, 9, 5]} /><rect x={-40} y={-14} width={26} height={20} rx={5} fill={P.coin} />{line("M-40 20H40", "#fff", 6)}</g>}
        {e > 0 && e < 1 && <Env p={onA(e)} t={t} s={0.55} />}
      </TownBoard>
    </Frame>
  );
};
/** s28 shot 1: pesan kartu kembali ke stasiun */
export const BoomerangShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tRule = tw(word("rule"), 1.6), tDom = tw(word("domestic"), tRule + 0.5), D = Math.max(dur, 4.5);
  const u = seg(t, 0.4, D - 0.3, Easing.inOut(Easing.sin));
  const p: V = q([960, 560], [1500, -60], [2150, 330], [960, 640], u);
  return (
    <Frame vignette={0.45}>
      <TownBoard t={t} cam={drift(t, 1.0, 1.06, D, 1020, 520)}>
        <Road d={ROAD_A} p={1} t={t} /><Road d={ROAD_B} p={1} t={t} />
        <AppTower x={MAPX.app} y={MAPX.y} s={0.9} t={t} /><SwitchStation x={MAPX.sw} y={MAPX.y + 8} t={t} spin={u * 360} />
        <path d="M960 560C1500 -60 2150 330 960 640" stroke="#9fc4ff" strokeWidth={8} strokeDasharray="20 24" fill="none" opacity={0.65 * seg(t, tDom - 0.4, tDom)} />
        <g transform={`translate(${p[0]} ${p[1]}) rotate(${u * 360}) scale(${u > 0.97 ? mix(1, 0.2, (u - 0.97) / 0.03) : 1.2})`}><Glow2 x={0} y={0} r={110} c="#9fc4ff" o={0.7} /><Shade d={rr(-56, -36, 112, 72, 12)} tones={BLUE} L={LL} s={[3, 9, 5]} /><rect x={-40} y={-14} width={26} height={20} rx={5} fill={P.coin} />{line("M-40 20H40", "#fff", 6)}</g>
      </TownBoard>
    </Frame>
  );
};

/** s37: peta dua pantai. shot 1 (sisi Thailand), shot 2 (jembatan kabel ke stasiun Indonesia) */
const Strait: React.FC<{ t: number; cam: { x: number; y: number; z: number }; spin?: number; swMood?: string; bridge: number; children?: React.ReactNode }> = ({ t, cam, spin = 0, swMood, bridge, children }) => (
  <>
    <Back id="t5str" stops={["#0b1130", "#172447", "#4a3a82"]} stars={60} t={t} />
    <Layer cam={cam} d={1}>
      <path d="M-600 560Q200 520 600 580Q720 760 560 1200H-600Z" fill="#2a3a66" /><path d="M-600 560Q200 520 600 580" stroke="#8aa0e0" strokeWidth={6} fill="none" />
      <path d="M860 575Q1500 520 2500 575V1200H940Q780 760 860 575Z" fill="#1d3056" /><path d="M860 575Q1500 520 2500 575" stroke="#6a82c8" strokeWidth={6} fill="none" />
      <path d="M600 590Q720 760 560 1200H940Q780 760 860 590Z" fill="#12244e" />
      {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${640 + R(i, 2) * 120} ${640 + i * 34}h${40 + R(i, 3) * 50}`} stroke="#5a8ac8" strokeWidth={6} strokeLinecap="round" opacity={0.3 + 0.4 * Math.abs(Math.sin(t * 1.4 + i))} />)}
      <Road d="M110 735C190 830 280 830 400 760" p={1} t={t} />
      <Road d="M1180 760C1260 850 1340 850 1440 790" p={1} t={t} /><Road d="M1440 790C1560 860 1660 850 1780 735" p={1} t={t} />
      <path d="M400 570Q730 330 1180 560" stroke="#34477a" strokeWidth={20} fill="none" strokeLinecap="round" /><path d="M400 570Q730 330 1180 560" pathLength={100} strokeDasharray={`${bridge * 100} 100`} stroke="#7dffd0" strokeWidth={11} fill="none" strokeLinecap="round" />
      <g><AppTower x={115} y={730} s={0.7} t={t} /><circle cx={115} cy={375} r={28} fill={P.coin} /><Txt x={115} y={387} s={32} c={P.navy}>฿</Txt></g>
      <SwitchStation x={420} y={770} s={0.72} t={t} /><SwitchStation x={1190} y={770} s={0.78} t={t} spin={spin} /><BFace x={1190} y={645} s={0.66} mood={swMood} t={t} />
      <BankHouse x={1760} y={750} s={0.72} t={t} />
      {children}
    </Layer>
  </>
);
export const ThaiSwitchShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const tInd = tw(word("Indonesian"), 1.4), tSend = tw(word("sends"), tInd + 0.8), D = Math.max(dur, 4.5);
  const a = seg(t, tSend - 0.3, D - 0.2, Easing.inOut(Easing.sin));
  const p = q([110, 735], [190, 830], [280, 830], [420, 770], a);
  return <Frame vignette={0.45}><Strait t={t} cam={{ x: vertical ? 420 : mix(1300, 640, seg(t, 0, tSend)), y: 540, z: mix(1.0, 1.14, seg(t, 0, D)) }} bridge={0}><g transform={`translate(0 0)`}><Env p={p} t={t} k="thb" /></g></Strait></Frame>;
};
export const SameRoadShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const tAcross = tw(word("across"), 0.8), tTakes = tw(word("takes"), tAcross + 2), tRoad = tw(word("road"), tTakes + 1.4), D = Math.max(dur, 5);
  const br = seg(t, 0.2, tAcross + 0.9, Easing.inOut(Easing.sin)), on = seg(t, tTakes - 0.2, D - 0.2, Easing.inOut(Easing.sin));
  const p: V = br < 1 ? q([400, 610], [620, 380], [950, 380], [1180, 600], br) : on < 0.5 ? q([1180, 760], [1260, 850], [1340, 850], [1440, 790], on * 2) : q([1440, 790], [1560, 860], [1660, 850], [1770, 740], on * 2 - 1);
  const camx = vertical ? clamp(p[0], 500, 1600) : mix(820, 1200, seg(t, tAcross, tRoad));
  return <Frame vignette={0.45}><Strait t={t} cam={{ x: camx, y: 540, z: 1.06 }} bridge={seg(t, 0, 0.8)} spin={seg(t, tAcross + 0.9, tAcross + 1.7) * 200} swMood="happy"><Env p={p} t={t} k="thb" />{t > tRoad && <g transform={`translate(1760 420) scale(${pop(t, D - 0.4)})`}><Tick x={0} y={0} r={46} p={1} /></g>}</Strait></Frame>;
};
export const _m = { CREAM, TEALB, Hose, LR, NetTower, Socket };
