// Warung mi Bali saat senja (s01, dipakai ulang s45-s47) dan thumbnail A.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, Pill, R, clamp, mix, pop, seg, useShot } from "@r3";
import { Cloud, Shade, Sky, Tree, rr } from "@r3/art";
import { BLUE, CORAL, CREAM, Contact, DARK, GOLD, GREEN, Glow2, Hose, LR, Owner, P, Phone, QrGrid, ScanFrame, STEEL, Sticker, TEALB, Tick, WOOD, You, circ, ell, line, tw } from "./kit";

const LEAF: [string, string, string, string] = ["#08202a", "#0d3238", "#154a46", "#2f7458"];

export const Palm: React.FC<{ x: number; base: number; h: number; t: number; seed: number; c: string }> = ({ x, base, h, t, seed, c }) => {
  const sw = Math.sin(t * 0.9 + seed) * 6, tx = x + h * 0.14 + sw, ty = base - h;
  return (
    <g>
      {line(`M${x} ${base}Q${x} ${base - h * 0.6} ${tx} ${ty}`, c, h * 0.055)}
      {[-165, -125, -85, -45, -5, 30].map((a, i) => {
        const r = h * (0.36 + R(seed + i, 2) * 0.1), rad = (a * Math.PI) / 180, ex = tx + Math.cos(rad) * r, ey = ty + Math.sin(rad) * r * 0.5 + r * 0.3;
        const mx = tx + Math.cos(rad) * r * 0.55, my = ty + Math.sin(rad) * r * 0.55 - r * 0.16;
        return <path key={i} d={`M${tx} ${ty}Q${mx} ${my - r * 0.14} ${ex} ${ey}Q${mx} ${my + r * 0.2} ${tx} ${ty}Z`} fill={c} />;
      })}
    </g>
  );
};
/** gerbang bata terbelah di ujung jalan (siluet generik, bukan tempat nyata) */
export const Gate: React.FC<{ x: number; base: number }> = ({ x, base }) => (
  <g>{[-1, 1].map((s) => (
    <g key={s} transform={`translate(${x} ${base}) scale(${s} 1)`}>
      <Shade d="M24 0V-200H38V-232H52V-262H66V-228H88V-198H104V-168H122V-130H112V0Z" tones={["#4a2458", "#6e3258", "#98485a", "#e08662"]} L={LR} s={[4, 10, 5]} />
      {line("M30 -150H108M30 -96H108M30 -44H108", "#5a2a56", 5)}
    </g>
  ))}</g>
);
export const Penjor: React.FC<{ x: number; t: number }> = ({ x, t }) => {
  const sw = Math.sin(t * 1.1) * 7, tip: [number, number] = [x - 250 + sw, 292 + sw];
  const d = `M${x} 860C${x + 8} 520 ${x + 4} 190 ${x - 90} 150C${x - 170} 122 ${x - 232 + sw} 200 ${tip[0]} ${tip[1]}`;
  return (
    <g>
      {line(d, "#7a4a34", 17)}<g transform="translate(4 0)">{line(d, "#e0a45a", 6)}</g>
      {[[x + 3, 470], [x - 6, 300], [x - 60, 164], [x - 160, 160]].map(([a, b], i) => <path key={i} d={`M${a} ${b}Q${a - 34 + sw * 0.5} ${b + 30} ${a - 22 + sw} ${b + 86}Q${a - 4} ${b + 46} ${a + 8} ${b + 10}Z`} fill={i % 2 ? "#ffe08a" : "#e9c25c"} />)}
      <g transform={`translate(${tip[0]} ${tip[1]})`}><path d="M0 0Q-34 28 -14 72Q0 52 14 72Q34 28 0 0Z" fill="#ffd23f" /><circle cy={88} r={14} fill="#e4572e" /></g>
    </g>
  );
};
export const Thatch: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <Shade d={`M-80 -80H760Q720 50 650 96${Array.from({ length: 13 }, (_, i) => `L${620 - i * 56} ${88 + (i % 2) * 40 + i * 2}`).join("")}L-80 190Z`} tones={["#3a1c44", "#5e2e48", "#8a4a46", "#d8884e"]} L={LR} s={[6, 18, 8]}>
      {Array.from({ length: 34 }, (_, i) => <path key={i} d={`M${i * 24 - 70} ${-40 + R(i, 2) * 30}q${-8 - R(i, 3) * 14} 70 ${-26} ${130 + R(i, 4) * 40}`} stroke="#5e2e48" strokeWidth={5} fill="none" strokeLinecap="round" />)}
    </Shade>
    {line("M-60 30Q280 76 640 20", "#c9743e", 9, 0.9)}
  </g>
);
export const Shop: React.FC<{ x: number; t: number }> = ({ x, t }) => (
  <g transform={`translate(${x} 0)`}>
    <Shade d={rr(0, 520, 300, 250, 10)} tones={["#33205c", "#4a2f74", "#6a4488", "#c07a88"]} L={LR} s={[5, 14, 7]} />
    <Shade d="M-30 540L40 452H290L340 540Z" tones={["#2b2860", "#40428a", "#5a64ac", "#e09a86"]} L={LR} s={[4, 12, 7]}>{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 32 - 4} 545L${i * 28 + 24} 450`} stroke="#40428a" strokeWidth={5} />)}</Shade>
    <path d={rr(36, 580, 150, 130, 8)} fill="#ffcc78" /><Glow2 x={110} y={645} r={170} c="#ffb35a" o={0.4 + Math.sin(t * 3) * 0.03} />
    {line("M36 626H186M36 668H186", "#a85a48", 7)}{[0, 1, 2, 3, 4].map((i) => <path key={i} d={rr(48 + i * 28, 598 + (i % 2) * 4, 16, 28, 5)} fill={["#2f8f6b", "#e4572e", "#3b6fd8"][i % 3]} />)}
    <path d={rr(214, 600, 58, 170, 8)} fill="#33205c" />
  </g>
);
export const Moto: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <Glow2 x={104} y={-30} r={110} c="#ffe9a0" o={0.7} />
    {[-52, 62].map((a) => <g key={a}><circle cx={a} r={23} fill="#1a1038" /><circle cx={a} r={9} fill="#8a78b4" /></g>)}
    <path d="M-72 -22Q-60 -52 -6 -46L30 -34L60 -58L86 -44L64 -12H-46Z" fill="#2b1a52" /><circle cx={-8} cy={-92} r={22} fill="#3d2768" /><path d="M-26 -74Q8 -86 20 -44L-30 -42Z" fill="#3d2768" /><circle cx={92} cy={-38} r={8} fill="#fff3b8" />
  </g>
);
export const Dog: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => {
  const k = 1 + Math.sin(t * 1.7) * 0.03;
  const tones: [string, string, string, string] = ["#5a2c44", "#8a4a44", "#bc7448", "#f0ac64"];
  return (
    <g transform={`translate(${x} ${y})`}>
      <Contact x={0} y={2} w={110} />
      <g transform={`scale(1 ${k})`}><Shade d="M-96 0Q-100 -62 -24 -62Q40 -66 54 -34Q70 -6 52 0Z" tones={tones} L={LR} s={[5, 12, 7]} /></g>
      <Shade d="M36 0Q30 -46 70 -48Q108 -48 112 -18Q124 -14 122 -4Q118 4 100 2Z" tones={tones} L={LR} s={[4, 9, 5]} />
      <path d="M56 -44Q38 -34 44 -8Q64 -18 66 -40Z" fill={tones[1]} />{line("M82 -26q8 6 16 0", "#2a1240", 4)}<circle cx={120} cy={-10} r={6} fill="#2a1240" />
      {line("M-92 -12Q-124 -10 -108 -34", tones[2], 15)}
    </g>
  );
};
export const Steam: React.FC<{ x: number; y: number; t: number; s?: number }> = ({ x, y, t, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 9 }, (_, i) => {
      const u = ((t * 0.22 + i / 9) % 1), cx = Math.sin(u * 5 + i * 2) * 30 * (0.4 + u) - u * 40, cy = -u * 240, r = 16 + u * 38;
      return <g key={i} opacity={0.34 * Math.sin(u * Math.PI)}><circle cx={cx} cy={cy} r={r} fill="#ffe8d8" /><circle cx={cx + r * 0.7} cy={cy + r * 0.3} r={r * 0.65} fill="#ffe8d8" /></g>;
    })}
  </g>
);
export const Pot: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <Contact x={0} y={2} w={150} />
    <Shade d={rr(-104, -36, 208, 36, 8)} tones={DARK} L={LR} s={[3, 8, 5]} />
    <Glow2 x={0} y={-36} r={120} c="#ff8a3a" o={0.5 + Math.sin(t * 11) * 0.06} />
    <Shade d="M-112 -196H112V-76Q112 -34 70 -34H-70Q-112 -34 -112 -76Z" tones={STEEL} L={LR} s={[12, 34, 16]}>{line("M-112 -150H112", "#43588a", 6)}</Shade>
    <Shade d={ell(0, -196, 120, 22)} tones={STEEL} L={LR} s={[3, 8, 5]} /><ellipse cy={-198} rx={96} ry={14} fill="#e8a452" />
    {line("M-112 -150q-38 4 -30 38M112 -150q38 4 30 38", "#c0d6f0", 12)}{line("M-86 -132V-70", "#fff", 10, 0.55)}
    <Steam x={0} y={-210} t={t} />
  </g>
);
export const Bowl: React.FC<{ x: number; y: number; s?: number; noodles?: boolean; t?: number }> = ({ x, y, s = 1, noodles, t = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={2} w={92} />
    <Shade d="M-88 -74H88Q82 -8 34 -6V4H-34V-6Q-82 -8 -88 -74Z" tones={CREAM} L={LR} s={[6, 18, 8]}><rect x={-100} y={-58} width={200} height={12} fill={P.coral} /></Shade>
    <ellipse cy={-74} rx={88} ry={17} fill="#fffdf4" /><ellipse cy={-72} rx={76} ry={12} fill="#c96a34" />
    {noodles && <g>{[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${-58 + i * 14} -74q22 ${-26 - (i % 2) * 8} 44 0`} stroke="#ffdc7a" strokeWidth={8} fill="none" strokeLinecap="round" />)}<circle cx={26} cy={-86} r={17} fill="#fff4da" /><circle cx={26} cy={-86} r={8} fill="#ffb02a" /><path d="M-52 -84q16 -22 34 -8q-14 18 -34 8Z" fill="#3fa05a" /><Steam x={0} y={-92} t={t + 2} s={0.55} /></g>}
  </g>
);
export const Bottle: React.FC<{ x: number; y: number; c: [string, string, string, string]; h?: number }> = ({ x, y, c, h = 130 }) => (
  <g transform={`translate(${x} ${y})`}><Contact x={0} y={2} w={40} /><Shade d={`M-28 0V${-h * 0.66}Q-28 ${-h * 0.8} -13 ${-h * 0.84}V${-h}H13V${-h * 0.84}Q28 ${-h * 0.8} 28 ${-h * 0.66}V0Z`} tones={c} L={LR} s={[3, 10, 6]} /><path d={rr(-16, -h - 16, 32, 18, 5)} fill={P.green} />{line("M-16 -14V-70", "#fff", 5, 0.55)}</g>
);
export const Bulb: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => {
  const a = Math.sin(t * 1.4) * 3.5;
  return (
    <g transform={`translate(${x} -60) rotate(${a})`}>
      {line(`M0 0V${y + 60}`, "#2a1444", 6)}
      <g transform={`translate(0 ${y + 60})`}><Glow2 x={0} y={34} r={300} c="#ffcf6a" o={0.55} /><path d={rr(-18, -4, 36, 26, 5)} fill="#4a2a52" /><path d="M-18 20Q-40 46 -24 70Q0 94 24 70Q40 46 18 20Z" fill="#ffe9a0" /><circle cx={9} cy={44} r={9} fill="#fff" /></g>
    </g>
  );
};
export const Table: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <Shade d={rr(300, y + 70, 60, 320, 10)} tones={WOOD} L={LR} s={[4, 12, 6]} /><Shade d={rr(1620, y + 70, 60, 320, 10)} tones={WOOD} L={LR} s={[4, 12, 6]} />
    <path d={`M230 ${y - 34}H1790L1830 ${y + 20}H190Z`} fill="#d98a56" />
    <path d={`M230 ${y - 34}H1790L1802 ${y - 18}H218Z`} fill="#f0a868" />
    <Shade d={rr(186, y + 16, 1648, 72, 14)} tones={WOOD} L={LR} s={[4, 16, 8]}>{[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${260 + i * 270} ${y + 48 + (i % 2) * 16}q70 -8 150 2`} stroke="#6a3340" strokeWidth={5} fill="none" strokeLinecap="round" />)}</Shade>
    <path d={`M360 ${y + 88}H1620V${y + 400}H360Z`} fill="#2c1648" opacity={0.85} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => <path key={i} d={`M${440 + i * 190} ${y + 100}V${y + 390}`} stroke="#42225c" strokeWidth={8} />)}
  </g>
);
export const BananaLeaf: React.FC<{ x: number; y: number; rot: number; s: number; t: number }> = ({ x, y, rot, s, t }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot + Math.sin(t * 1.2 + x) * 1.6}) scale(${s})`}>
    <Shade d="M0 0C-90 -90 -110 -270 -20 -430C-6 -400 8 -404 4 -372C96 -270 108 -120 26 -6Z" tones={LEAF} L={LR} s={[8, 22, 8]} />
    {line("M6 4C0 -130 -6 -280 -20 -420", "#2f7458", 9)}{[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${2 - i * 3} ${-60 - i * 56}q30 -18 ${52 - i * 4} -46M${-2 - i * 3} ${-74 - i * 56}q-30 -18 ${-56 + i * 4} -44`} stroke="#2f7458" strokeWidth={4} fill="none" strokeLinecap="round" />)}
  </g>
);

/** latar warung lengkap sampai meja; isi meja diberikan sebagai children. */
export const WarungSet: React.FC<{ t: number; cam: { x: number; y: number; z: number }; vertical?: boolean; day?: number; mid?: React.ReactNode; children?: React.ReactNode; fg?: React.ReactNode }> = ({ t, cam, mid, children, fg, day = 0 }) => (
  <>
    <Layer cam={cam} d={0}><Sky t={t} />{day > 0 && <g opacity={day}><defs><linearGradient id="t5day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3f8fd8" /><stop offset="0.55" stopColor="#8fd0ee" /><stop offset="1" stopColor="#ffe6bc" /></linearGradient></defs><rect x={-600} y={-700} width={3200} height={2600} fill="url(#t5day)" /></g>}</Layer>
    <Layer cam={cam} d={0.08}><Cloud x={420 + t * 5} y={330} s={120} seed={7} base="#a4528e" lit="#ffc99a" shadow="#8a4690" op={0.85} /><Cloud x={1640 - t * 3} y={200} s={110} seed={19} base="#6e46a0" lit="#f2a89a" shadow="#5e3c96" op={0.8} /></Layer>
    <Layer cam={cam} d={0.22}>
      {[[150, 150], [330, 200], [620, 130], [1580, 220], [1780, 170], [1930, 240]].map(([x, h], i) => <Palm key={i} x={x} base={745} h={h * 1.25} t={t} seed={i * 3} c="#6c3c82" />)}
      <path d="M-300 740Q200 690 560 736Q900 764 1180 720Q1600 686 2220 730V1200H-300Z" fill="#6c3c82" />
    </Layer>
    <Layer cam={cam} d={0.45}>
      <path d="M-300 760H2220V1200H-300Z" fill="#45286a" />
      <Gate x={860} base={772} /><Tree x={1080} base={780} s={0.9} seed={5} t={t} /><Shop x={1520} t={t} /><g transform="translate(1415 768) scale(0.62)"><Dog x={0} y={0} t={t} /></g>
      <path d="M-300 792H2220V850H-300Z" fill="#34205a" />{Array.from({ length: 14 }, (_, i) => <path key={i} d={rr(-260 + i * 180, 818, 80, 7, 3)} fill="#a8709a" opacity={0.7} />)}
      <Moto x={-200 + ((t * 190 + 520) % 2500)} y={814} />
    </Layer>
    <Layer cam={cam} d={0.8}>
      <Shade d={rr(20, -40, 46, 1160, 8)} tones={WOOD} L={LR} s={[5, 16, 8]} />
      <Penjor x={1800} t={t} />
      {mid}
    </Layer>
    <Layer cam={cam} d={1}>{children}<Thatch t={t} /><Bulb x={760} y={200} t={t} /></Layer>
    {fg}
  </>
);

/** s01: dua kalimat dalam satu komponen (shot kedua hold). */
export const ScanShot: React.FC = () => {
  const { t, word, vertical, dur } = useShot();
  const tScan = tw(word("scan"), 0.4), tSq = tw(word("square"), 1.2), tPaid = tw(word("paid"), 7);
  const tTwo = tw(word("Two"), tPaid - 1.5), tSec = tw(word("seconds"), tTwo + 0.4);
  const enter = seg(t, Math.max(0, tScan - 0.35), tScan + 0.55, Easing.out(Easing.back(1.1)));
  const lock = seg(t, tSq - 0.15, tSq + 0.35, Easing.out(Easing.back(1.6)));
  const tick = pop(t, tPaid - 0.05, 0.35);
  const done = seg(t, tPaid - 0.05, tPaid + 0.1);
  const push = seg(t, 0, tTwo, Easing.inOut(Easing.sin)), back = seg(t, tTwo - 0.2, tTwo + 1.4);
  const cam = { x: mix(mix(960, 1100, push), 990, back), y: mix(mix(540, 560, push), 545, back), z: mix(mix(1.02, 1.13, push), 1.04, back) + Math.max(0, t - tPaid) * 0.008 };
  const TY = 790;
  const px = mix(2250, vertical ? 1360 : 1560, enter) + Math.sin(t * 1.9) * 5, py = mix(1060, 700, enter) + Math.cos(t * 1.5) * 6;
  const chime = t - tPaid;
  const hand = (t > tTwo ? seg(t, tTwo, tTwo + 0.15, Easing.out(Easing.back(3))) : 0) + (t > tSec ? seg(t, tSec, tSec + 0.15, Easing.out(Easing.back(3))) : 0);
  return (
    <Frame vignette={0.5}>
      <WarungSet t={t} cam={cam}
        mid={<><Owner x={585} y={790} s={0.98} t={t} face={done > 0.5 ? "happy" : "neutral"} look={12} /></>}
        fg={<Layer cam={cam} d={1.45}><BananaLeaf x={-20} y={1180} rot={26} s={1.25} t={t} /><BananaLeaf x={150} y={1230} rot={52} s={0.95} t={t} /></Layer>}>
        <Table y={TY} />
        <Pot x={330} y={TY - 4} t={t} />
        <Bowl x={790} y={TY} s={0.85} noodles t={t} /><Bottle x={925} y={TY - 6} c={CORAL} /><Bottle x={990} y={TY + 2} c={GREEN} h={104} />
        {/* ponsel owner di meja: menyala saat paid */}
        <g>
          {done > 0 && [0, 1, 2].map((i) => { const u = (chime * 1.1 - i * 0.22); return u > 0 && u < 1 ? <circle key={i} cx={685} cy={TY - 66} r={40 + u * 150} stroke={P.coin} strokeWidth={10 * (1 - u)} fill="none" opacity={1 - u} /> : null; })}
          <Contact x={685} y={TY + 4} w={56} />
          <Phone x={685} y={TY - 66 + (done > 0 ? Math.sin(chime * 38) * 5 * clamp(1 - chime) : 0)} s={0.3} rot={-8} body={TEALB} bg={done > 0.5 ? P.green : "#1b2a5c"} glow={done > 0.5 ? "#7dffb8" : undefined} screen={done > 0.5 ? <Tick x={0} y={0} r={74} p={tick} /> : undefined} />
        </g>
        <Sticker x={1250} y={TY} s={0.98} glow={lock * (1 - done * 0.6)} />
        <ScanFrame x={1250} y={TY - 229} w={236} p={lock * (1 - done)} />
        {/* jam dinding kecil di tiang etalase */}
        {t > tTwo - 0.6 && (
          <g transform={`translate(930 330) scale(${pop(t, tTwo - 0.5, 0.35)})`}>
            {line("M0 -190V-76", "#2a1444", 6)}<Shade d={circ(0, 0, 80)} tones={GOLD} L={LR} s={[4, 12, 7]} /><circle r={63} fill={P.cream} />
            {Array.from({ length: 12 }, (_, i) => <path key={i} d="M0 -56V-48" stroke={P.navy} strokeWidth={4} strokeLinecap="round" transform={`rotate(${i * 30})`} />)}
            {line("M0 0L26 14", P.navy, 9)}<g transform={`rotate(${hand * 30})`}>{line("M0 8V-46", P.coral, 7)}</g><circle r={7} fill={P.navy} />
          </g>
        )}
        {/* pembeli dari samping depan, memegang ponsel */}
        <You x={vertical ? 1620 : 1760} y={1130} s={1.05} t={t} face={done > 0.5 ? "happy" : "neutral"} look={-30} arm={[(px - (vertical ? 1620 : 1760)) / 1.05 + 70, (py - 1130) / 1.05 + 120]} />
        <Phone x={px} y={py} s={0.8} rot={mix(18, -9, enter)} glow={done > 0.5 ? "#7dffb8" : "#9fc4ff"} bg={done > 0.5 ? P.cream : "#5a3a80"}
          screen={done > 0.5 ? <g><Tick x={0} y={-30} r={68} p={tick} />{line("M-58 84H58", "#9a86b0", 15)}{line("M-34 122H34", "#c0aed0", 12)}</g> : <g><g transform="translate(0 112) scale(0.62)"><Sticker x={0} y={0} stand={false} /></g><ScanFrame x={0} y={-24} w={140} p={lock} /><rect x={-99} y={-90 + ((t * 130) % 150)} width={198} height={6} fill={P.coin} opacity={0.7 * lock} /></g>} />
        <Hose d={`M${px + 112} ${py + 150}Q${px + 96} ${py + 92} ${px + 62} ${py + 108}`} tones={CORAL} w={34} />
      </WarungSet>
    </Frame>
  );
};

/** thumbnail A: satu stiker, banyak aplikasi. Teks thumbnail di sisi kiri. */
export const ThumbA: React.FC = () => {
  const { vertical } = useShot();
  const cx = 960, cy = vertical ? 900 : 826, s = vertical ? 1.15 : 1.08;
  const phones: [number, number, number, [string, string, string, string]][] = vertical
    ? [[700, 760, -22, BLUE], [1225, 760, 22, CORAL], [720, 1010, -34, GREEN], [1205, 1010, 34, GOLD]]
    : [[330, 800, -30, BLUE], [610, 915, -42, GREEN], [1310, 915, 42, GOLD], [1590, 800, 30, CORAL]];
  return (
    <Frame vignette={0.5}>
      <Layer cam={{ x: 960, y: 540, z: 1 }} d={0}><Sky t={2} /></Layer>
      {[[150, 330], [420, 220], [1650, 260], [1900, 380]].map(([x, h], i) => <Palm key={i} x={x} base={1000} h={h} t={1} seed={i} c="#5a3278" />)}
      <path d="M-100 940Q700 880 1200 930Q1600 970 2020 900V1200H-100Z" fill="#452768" />
      <Glow2 x={cx} y={cy} r={760} c="#ffb35a" o={0.75} />
      {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${cx} ${cy}L${cx + Math.cos(i * 0.3927) * 1100} ${cy + Math.sin(i * 0.3927) * 1100}L${cx + Math.cos(i * 0.3927 + 0.14) * 1100} ${cy + Math.sin(i * 0.3927 + 0.14) * 1100}Z`} fill="#ffd9a0" opacity={0.1} />)}
      {phones.map(([x, y, r, c], i) => { const a = Math.atan2(cy - y, cx - x); return <g key={i}>{line(`M${x + Math.cos(a) * 130} ${y + Math.sin(a) * 130}L${x + Math.cos(a) * 190} ${y + Math.sin(a) * 190}`, c[3], 16)}<Phone x={x} y={y} s={vertical ? 0.42 : 0.62} rot={r} body={c} bg="#5a3a80" screen={<g><QrGrid x={-70} y={-70} size={140} /><ScanFrame x={0} y={0} w={170} p={1} /></g>} /></g>; })}
      <Sticker x={cx} y={cy + 230 * s} s={s} glow={0.6} />
    </Frame>
  );
};
export const _unused = { Pill, R, BLUE, TEALB };
