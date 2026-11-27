// Peta tetap tiga bangunan (menara aplikasi, stasiun switch, bank), jangkar s10-s17 dan seterusnya.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, R, fade, lerpColor, mix, pop, seg, useShot } from "@r3";
import { Shade, Tones, rr } from "@r3/art";
import { BLUE, CREAM, Contact, COPPER, DARK, GOLD, GREEN, Glow2, LL, P, STEEL, circ, ell, line, tw } from "./kit";

const NIGHT = "#101a38";
const dim = (t: Tones, k: number): Tones => t.map((c) => lerpColor(c, "#243258", k)) as Tones;

/** menara aplikasi pembayaran: gedung berbentuk ponsel, jarum saldo di atap. (x,y) = tengah dasar. */
export const AppTower: React.FC<{ x: number; y: number; s?: number; lit?: number; t: number; gauge?: number; shut?: number }> = ({ x, y, s = 1, lit = 1, t, gauge = 0.65, shut = 0 }) => {
  const k = (1 - lit) * 0.72;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Contact x={14} y={6} w={170} o={0.55} />
      {lit > 0.05 && <Glow2 x={0} y={-230} r={330} c="#6fb4ff" o={0.4 * lit} />}
      <Shade d={rr(-112, -440, 224, 440, 52, 22)} tones={dim(BLUE, k)} L={LL} s={[6, 20, 10]} />
      <path d={rr(-88, -406, 176, 330, 22)} fill={lerpColor("#24345c", "#bfe6ff", lit)} />
      {[0, 1, 2, 3].map((i) => <g key={i} opacity={0.35 + 0.65 * lit}><path d={rr(-68, -384 + i * 74, 136, 52, 16)} fill={lerpColor("#34477a", i === 1 ? P.coin : "#4f86e0", lit)} /><circle cx={-42} cy={-358 + i * 74} r={13} fill="#fff" opacity={0.7} />{line(`M-16 ${-366 + i * 74}H46M-16 ${-348 + i * 74}H24`, "#fff", 8, 0.65)}</g>)}
      <path d={rr(-40, -62, 80, 62, 20, 4)} fill="#101a3c" />
      {[0, 1, 2].map((i) => <rect key={i} x={-40} y={-62 + i * 20} width={80} height={16 * shut} fill={fade(P.coral, k)} />)}
      <path d={rr(-34, -432, 68, 13, 6)} fill="#0e1634" />
      {line("M-98 -386V-110", "#d6ecff", 7, 0.25 + 0.5 * lit)}
      <g transform="translate(0 -452)"><Shade d="M-62 0A62 62 0 0 1 62 0Z" tones={dim(CREAM, k)} L={LL} s={[4, 10, 6]} />{line("M-46 -8A46 46 0 0 1 46 -8", P.green, 9, 0.4 + 0.6 * lit)}<g transform={`rotate(${mix(-72, 72, gauge) + Math.sin(t * 3) * 2})`}>{line("M0 -4V-44", fade(P.coral, k), 8)}</g><circle cy={-4} r={9} fill={DARK[1]} /></g>
    </g>
  );
};
/** stasiun switch: silinder rendah berkubah datar, tiga kumparan tembaga, meja putar di pintu. */
export const SwitchStation: React.FC<{ x: number; y: number; s?: number; lit?: number; t: number; spin?: number }> = ({ x, y, s = 1, lit = 1, t, spin = 0 }) => {
  const k = (1 - lit) * 0.7;
  const steel = dim(["#1a2a5c", "#2d4a82", "#4a72ac", "#a8d4f0"], k), cop = dim(COPPER, k);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Contact x={18} y={10} w={245} o={0.55} />
      {lit > 0.05 && <Glow2 x={0} y={-150} r={360} c="#7dffd0" o={(0.28 + Math.sin(t * 3.5) * 0.06) * lit} />}
      {[-116, 0, 116].map((a, i) => {
        const h = i === 1 ? -282 : -246;
        return (<g key={i} transform={`translate(${a} ${h})`}>{line("M0 60V0", steel[1], 30)}<Shade d={rr(-44, -52, 88, 62, 22)} tones={cop} L={LL} s={[5, 14, 8]}>{[0, 1, 2, 3].map((j) => <path key={j} d={`M-48 ${-40 + j * 15}Q0 ${-30 + j * 15} 48 ${-40 + j * 15}`} stroke={cop[0]} strokeWidth={5} fill="none" />)}</Shade><path d={ell(0, -52, 52, 11)} fill={cop[3]} /><path d={ell(0, 10, 52, 11)} fill={cop[1]} /><circle cy={-68} r={9} fill={lit > 0.5 ? "#7dffb8" : "#3a5670"} />{lit > 0.5 && <Glow2 x={0} y={-68} r={44} c="#7dffb8" o={0.6 + Math.sin(t * 5 + i * 2) * 0.3} />}</g>);
      })}
      <Shade d="M-215 -196C-190 -268 190 -268 215 -196Z" tones={steel} L={LL} s={[6, 18, 10]} />
      <Shade d="M-200 -200H200V-32Q200 6 0 8Q-200 6 -200 -32Z" tones={steel} L={LL} s={[14, 52, 14]}>
        {[-150, -100, 100, 150].map((a) => <g key={a}>{line(`M${a} -196V4`, steel[0], 5)}{[-170, -120, -70, -22].map((b) => <circle key={b} cx={a + 14} cy={b} r={4.5} fill={steel[3]} opacity={0.8} />)}</g>)}
      </Shade>
      <path d={ell(0, -198, 216, 20)} fill={steel[3]} opacity={0.9} /><path d={ell(0, -203, 196, 13)} fill={steel[2]} />
      <path d="M-76 6V-84Q-76 -146 0 -146Q76 -146 76 -84V6Q38 9 0 9Q-38 9 -76 6Z" fill="#0c1430" />
      <path d={ell(0, -34, 58, 22)} fill={lit > 0.5 ? "#2f8f6b" : "#24405c"} />
      <g transform={`translate(0 -34) scale(1 0.38) rotate(${spin})`}>{line("M-40 0H34M12 -24L40 0L12 24", lit > 0.5 ? P.coin : "#6a82a8", 16)}</g>
      {line("M-185 -180V-50", "#e8f8ff", 7, 0.35 + 0.35 * lit)}
    </g>
  );
};
/** bank warung: gedung krem beratap pelana hijau, pintu brankas bundar. */
export const BankHouse: React.FC<{ x: number; y: number; s?: number; lit?: number; t: number }> = ({ x, y, s = 1, lit = 1, t }) => {
  const k = (1 - lit) * 0.72;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Contact x={16} y={8} w={215} o={0.55} />
      {lit > 0.05 && <Glow2 x={0} y={-170} r={320} c="#ffd98a" o={0.34 * lit} />}
      <Shade d={rr(-170, -240, 340, 240, 8)} tones={dim(CREAM, k)} L={LL} s={[6, 24, 10]} />
      <Shade d="M-214 -230L-14 -358Q0 -366 14 -358L214 -230Q220 -214 200 -214H-200Q-220 -214 -214 -230Z" tones={dim(GREEN, k)} L={LL} s={[6, 20, 10]}>{[0, 1, 2].map((i) => <path key={i} d={`M-230 ${-248 - i * 34}H230`} stroke={dim(GREEN, k)[1]} strokeWidth={5} />)}</Shade>
      <circle cy={-272} r={30} fill={dim(GOLD, k)[2]} /><circle cy={-272} r={17} fill="none" stroke={dim(GOLD, k)[1]} strokeWidth={6} />
      {[-142, -86, 86, 142].map((a) => <Shade key={a} d={rr(a - 16, -196, 32, 184, 10)} tones={dim(CREAM, k * 1.05)} L={LL} s={[3, 10, 5]} />)}
      <Shade d={circ(0, -92, 58)} tones={dim(STEEL, k)} L={LL} s={[5, 14, 8]} /><circle cy={-92} r={32} fill={dim(STEEL, k)[1]} />
      <g transform={`translate(0 -92) rotate(${t * 8})`}>{line("M-24 0H24M0 -24V24", dim(STEEL, k)[3], 8)}</g>
      <Shade d={rr(-196, -16, 392, 28, 8)} tones={dim(CREAM, k + 0.05)} L={LL} s={[3, 8, 5]} />
    </g>
  );
};

export const MAPX = { app: 400, sw: 960, bank: 1510, y: 720 };
export const ROAD_A = "M400 735C520 850 760 850 960 750", ROAD_B = "M960 750C1160 850 1390 850 1510 735";
const Road: React.FC<{ d: string; p: number; t: number }> = ({ d, p, t }) => p <= 0 ? null : (
  <g>
    <path d={d} pathLength={100} strokeDasharray={`${p * 100} 100`} stroke="#ffb03a" strokeWidth={64} opacity={0.2} fill="none" strokeLinecap="round" />
    <path d={d} pathLength={100} strokeDasharray={`${p * 100} 100`} stroke="#8a5a52" strokeWidth={44} fill="none" strokeLinecap="round" />
    <path d={d} pathLength={100} strokeDasharray={`${p * 100} 100`} stroke="#ffd27a" strokeWidth={28} fill="none" strokeLinecap="round" />
    {p > 0.98 && <path d={d} stroke="#fff6d8" strokeWidth={6} strokeDasharray="22 46" strokeDashoffset={-t * 80} fill="none" strokeLinecap="round" />}
  </g>
);
const Block3: React.FC<{ x: number; y: number; w: number; h: number; i: number; t: number }> = ({ x, y, w, h, i, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d={rr(-w / 2, -h, w, h, 8, 3)} fill="#24346a" /><path d={rr(w / 2 - w * 0.28, -h, w * 0.28, h, 4, 3)} fill="#18244e" />
    <path d={rr(-w / 2 - 3, -h - 7, w + 6, 12, 5)} fill="#3a529a" />
    {[0, 1].map((j) => <rect key={j} x={-w / 2 + 10 + j * 22} y={-h + 18} width={11} height={14} rx={3} fill="#ffd27a" opacity={R(i * 7 + j, 3) > 0.45 ? 0.85 + Math.sin(t * 2 + i + j) * 0.15 : 0.12} />)}
  </g>
);
const Bush: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><g fill="#17484e"><circle r={24} cy={-20} /><circle cx={-24} cy={-8} r={17} /><circle cx={23} cy={-9} r={19} /></g><path d="M-30 -22Q-20 -48 6 -42" stroke="#3a8a78" strokeWidth={7} fill="none" strokeLinecap="round" /></g>
);

/** latar peta: langit malam, kota jauh, papan peta miring. */
export const TownBoard: React.FC<{ t: number; cam: { x: number; y: number; z: number }; children?: React.ReactNode }> = ({ t, cam, children }) => (
  <>
    <Layer cam={cam} d={0}>
      <defs><linearGradient id="t5sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b1130" /><stop offset="0.6" stopColor="#172447" /><stop offset="1" stopColor="#4a3a82" /></linearGradient></defs>
      <rect x={-600} y={-700} width={3200} height={2500} fill="url(#t5sky)" />
      {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={R(i, 2) * 2400 - 240} cy={R(i, 3) * 460 - 100} r={1.5 + R(i, 4) * 2.5} fill="#cfe0ff" opacity={0.25 + 0.4 * Math.abs(Math.sin(t * 0.8 + i))} />)}
      <Glow2 x={170} y={130} r={230} c="#9fb8ff" o={0.45} /><circle cx={170} cy={130} r={46} fill="#e8f0ff" /><circle cx={190} cy={116} r={40} fill="#6a7ab8" opacity={0.35} />
    </Layer>
    <Layer cam={cam} d={0.35}>
      {Array.from({ length: 34 }, (_, i) => { const h = 50 + R(i, 8) * 120 + (i % 3) * 22; return <path key={i} d={rr(-300 + i * 74, 520 - h, 58 + R(i, 9) * 26, h + 80, i % 4 === 0 ? 28 : 6, 0)} fill="#33306c" />; })}
    </Layer>
    <Layer cam={cam} d={1}>
      <path d="M150 548Q160 520 200 520H1720Q1760 520 1770 548L2090 960Q2100 990 2060 990H-140Q-180 990 -170 960Z" fill="#1d3056" />
      <path d="M-170 976H2090L2078 1040Q2070 1060 2040 1060H-120Q-150 1060 -158 1040Z" fill="#0c1230" />
      {line("M168 546Q176 522 206 522H1714Q1744 522 1752 546", "#6a82c8", 5, 0.8)}
      {[[250, 600], [640, 575], [1250, 575], [1690, 600]].map(([x, y], i) => <path key={i} d={`M${x - 130} ${y + 20}L${x - 100} ${y - 24}H${x + 110}L${x + 135} ${y + 20}Z`} fill="#213a5e" />)}
      {line("M-60 930Q500 880 960 925T1990 915", "#2f4a74", 34)}{line("M-60 930Q500 880 960 925T1990 915", "#5a74a8", 3, 0.6)}
      {[[190, 625, 80, 70], [650, 600, 64, 84], [725, 612, 56, 54], [1200, 598, 60, 62], [1275, 610, 70, 92], [1760, 640, 84, 66]].map(([x, y, w, h], i) => <Block3 key={i} x={x} y={y} w={w} h={h} i={i} t={t} />)}
      {[[150, 700, 1], [680, 690, 0.8], [1230, 690, 0.9], [1790, 730, 1.1], [700, 900, 0.9], [1240, 895, 0.8]].map(([x, y, s], i) => <Bush key={i} x={x} y={y} s={s} />)}
      {[0, 1].map((i) => { const u = (t * (0.07 + i * 0.03) + i * 0.5) % 1, x = i ? 2000 - u * 2100 : -80 + u * 2100; return <g key={i} transform={`translate(${x} ${i ? 912 : 930})`}><path d={rr(-22, -18, 44, 18, 8)} fill={i ? P.coral : "#4f86e0"} /><circle cx={i ? -24 : 24} cy={-8} r={5} fill="#fff3b8" /></g>; })}
      {children}
    </Layer>
  </>
);

/** s10: peta digambar (shot 1), bangunan menyala saat disebut (shot 2 hold). */
export const MapShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tFollow = tw(word("follow"), 0.2), tYour = tw(word("Your"), 2.4);
  const tApp = tw(word("app"), 3), tBank = tw(word("bank"), 4.5), tSw = tw(word("switch"), 6.5);
  const tilt = seg(t, 0, tYour, Easing.out(Easing.cubic));
  const cam = { x: 960 + Math.sin(t * 0.35) * 8, y: mix(660, 545, tilt), z: mix(1.2, 1.0, tilt) + seg(t, tSw, tSw + 2.5) * 0.035 };
  const a = seg(t, tFollow, tFollow + 1.3), b = seg(t, tFollow + 0.9, tFollow + 2.2);
  const lit = (at: number) => seg(t, at - 0.05, at + 0.35);
  const bounce = (at: number) => 1 + Math.max(0, Math.sin(seg(t, at, at + 0.5, Easing.linear) * Math.PI)) * 0.07;
  return (
    <Frame vignette={0.45}>
      <TownBoard t={t} cam={cam}>
        <Road d={ROAD_A} p={a} t={t} /><Road d={ROAD_B} p={b} t={t} />
        <AppTower x={MAPX.app} y={MAPX.y} s={0.95 * bounce(tApp)} lit={lit(tApp)} t={t} />
        <BankHouse x={MAPX.bank} y={MAPX.y} s={0.95 * bounce(tBank)} lit={lit(tBank)} t={t} />
        <SwitchStation x={MAPX.sw} y={MAPX.y + 8} s={0.98 * bounce(tSw)} lit={lit(tSw)} t={t} spin={seg(t, tSw, tSw + 1.2) * 360} />
      </TownBoard>
    </Frame>
  );
};
export const _p = { pop, vertical: 0 as number, GOLD, NIGHT, STEEL };
