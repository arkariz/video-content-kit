// Adegan di luar negeri: s26, s27, s28b, s30, s31, s32, s39, s42b, s43b, s46a.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, R, clamp, mix, pop, seg, useShot } from "@r3";
import { FarCity, Shade, Tree, rr } from "@r3/art";
import { BLUE, CORAL, CREAM, Contact, DARK, GOLD, GREEN, Glow2, Hose, LL, LR, P, Phone, QrGrid, STEEL, ScanFrame, Sticker, TEALB, Tick, WOOD, You, circ, ell, line, tw } from "./kit";
import { BankHouse, SwitchStation } from "./peta";
import { Birds, Boat, Cup, Foam, Lantern, Pendant, Puff, Rock, Shrub, Vending, Walker } from "./dekor";
import { Palm } from "./warung";
import { Adapter, Back, BankChar, CentralBank, Coin, Cross, Envelope, NetTower, PURPLE, SILVER, Socket, Txt, bump, drift } from "./benda";

const Sea: React.FC<{ t: number; y: number; c?: string; hi?: string }> = ({ t, y, c = "#16295c", hi = "#5a84c8" }) => (
  <g><path d={`M-600 ${y}H2700V1400H-600Z`} fill={c} />{Array.from({ length: 46 }, (_, i) => { const yy = y + 18 + R(i, 3) * (1080 - y); return <path key={i} d={`M${((R(i, 2) * 2400 + t * (8 + R(i, 4) * 16)) % 2400) - 240} ${yy}h${30 + (yy - y) * 0.25}`} stroke={hi} strokeWidth={4 + (yy - y) * 0.012} strokeLinecap="round" opacity={0.25 + 0.35 * Math.abs(Math.sin(t + i))} />; })}</g>
);
/** kantor bertiang generik di seberang laut (bukan gedung nyata) */
const Office: React.FC<{ x: number; y: number; s: number; lit: number; t: number }> = ({ x, y, s, lit, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-340 6Q0 -56 340 6Q240 70 0 74Q-240 70 -340 6Z" fill="#232c58" />
    <Shade d={rr(-230, -240, 460, 240, 8)} tones={["#1c2450", "#323e74", "#4c5c98", "#8ca0d0"]} L={LL} s={[7, 22, 10]} />
    <Shade d="M-260 -236L0 -340L260 -236Z" tones={["#1c2450", "#323e74", "#4c5c98", "#8ca0d0"]} L={LL} s={[5, 15, 8]} />
    {[-188, -113, -38, 38, 113, 188].map((a, i) => <path key={a} d={rr(a - 15, -218, 30, 206, 10)} fill="#a8b8e0" />)}
    {[-150, -75, 0, 75, 150].map((a, i) => <path key={a} d={rr(a - 18, -176, 36, 62, 8)} fill={i === 3 && lit > 0.5 ? "#ffd27a" : "#141c42"} />)}
    {lit > 0.5 && <Glow2 x={75} y={-145} r={140} c="#ffd27a" o={0.7 + Math.sin(t * 5) * 0.05} />}
  </g>
);
/** s26 */
export const FarOfficeShot: React.FC = () => {
  const { t, dur } = useShot();
  const D = Math.max(dur, 2.8), p = seg(t, 0, D * 0.85, Easing.inOut(Easing.cubic));
  const cam = { x: mix(420, 1180, p), y: mix(620, 520, p), z: mix(1.7, 1.02, p) + seg(t, D * 0.6, D + 1) * 0.1 };
  return (
    <Frame vignette={0.6}>
      <Back id="t5far" stops={["#080c28", "#16224e", "#463a7c"]} stars={80} t={t} />
      <Layer cam={cam} d={0.5}><Glow2 x={760} y={260} r={280} c="#9fb8ff" o={0.55} /><circle cx={760} cy={260} r={62} fill="#e8f0ff" /><circle cx={786} cy={242} r={52} fill="#7a8ac8" opacity={0.35} /><Puff x={420 + t * 14} y={330} c="#3c4884" o={0.8} /><Puff x={1240 + t * 10} y={200} s={1.3} c="#34407a" o={0.8} /><FarCity x0={1050} x1={2300} base={645} seed={17} fill="#2a3468" hi="#8090d0" t={t} lights={0.14} /><FarCity x0={-400} x1={520} base={645} seed={3} fill="#2a3468" hi="#8090d0" t={t} lights={0.16} /></Layer>
      <Layer cam={cam} d={1}><Sea t={t} y={640} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M${760 - 60 + Math.sin(t * 2 + i) * 18 - i * 6} ${668 + i * 34}h${120 + i * 14}`} stroke="#c8d8ff" strokeWidth={8} strokeLinecap="round" opacity={0.5 - i * 0.045} />)}
        <Boat x={700 + t * 20} y={760} s={0.9} t={t} /><Boat x={1180 - t * 12} y={690} s={0.45} t={t + 2} sail="#c8d8ff" />
        <Shrub x={90} y={668} s={0.8} c={["#14303c", "#1f4a50", "#3c7a74"]} /><Shrub x={400} y={690} s={0.6} c={["#14303c", "#1f4a50", "#3c7a74"]} />
        <path d="M-300 640Q100 590 520 660Q600 720 460 760H-300Z" fill="#22386a" /><SwitchStation x={200} y={690} s={0.55} t={t} />
        <Office x={1520} y={630} s={0.8} lit={t > D * 0.55 ? 1 : 0} t={t} />
      </Layer>
    </Frame>
  );
};
const Room: React.FC<{ t: number }> = ({ t }) => (
  <g><rect x={-600} y={-600} width={3200} height={2300} fill="#26305c" />{[160, 760, 1360].map((x) => <g key={x}><path d={rr(x, 90, 400, 520, 200, 12)} fill="#101840" /><path d={rr(x + 24, 114, 352, 472, 176, 8)} fill="#0b1230" />{Array.from({ length: 9 }, (_, i) => <circle key={i} cx={x + 60 + R(x + i, 2) * 280} cy={170 + R(x + i, 3) * 340} r={3} fill="#cfe0ff" opacity={0.4 + 0.5 * Math.abs(Math.sin(t + i))} />)}{line(`M${x + 200} 114V586`, "#3c4a82", 12)}</g>)}{[90, 670, 1270, 1850].map((x) => <Shade key={x} d={rr(x - 36, -100, 72, 800, 20)} tones={["#2c3868", "#465490", "#6272b0", "#a8b8e8"]} L={LL} s={[6, 18, 9]} />)}<path d="M-600 690H2600V1500H-600Z" fill="#1a2048" /></g>
);
/** s27 shot 1: laporan tebal, stiker terjepit */
export const ReportShot: React.FC = () => {
  const { t, word } = useShot();
  const tRep = tw(word("report"), 3), drop = seg(t, 0.4, 1.0, Easing.in(Easing.cubic)), open = seg(t, tRep - 0.8, tRep), clip = pop(t, tRep, 0.35);
  const sq = bump(t, 1.0, 0.35) * 0.1;
  return (
    <Frame vignette={0.55}>
      <Layer cam={drift(t, 1.02, 1.12, 8, 960, 570)} d={0.7}><Room t={t} /></Layer>
      <Layer cam={drift(t, 1.02, 1.1, 8, 960, 570)} d={1}>
        <Shade d={rr(180, 730, 1560, 110, 30)} tones={WOOD} L={LL} s={[5, 16, 8]} /><path d="M280 836H1640V1300H280Z" fill="#1c1030" />
        <Glow2 x={500} y={470} r={420} c="#ffd27a" o={0.4} />{line("M430 730V560", "#c0d6f0", 14)}<Shade d="M340 570Q340 460 430 460Q520 460 520 570Z" tones={GREEN} L={LL} s={[4, 12, 7]} />
        <g transform={`translate(1000 ${mix(-200, 730, drop)}) scale(${1 + sq} ${1 - sq})`}>
          <Contact x={0} y={4} w={420} />
          {open < 0.05 ? <Shade d={rr(-260, -150, 520, 150, 16)} tones={BLUE} L={LL} s={[7, 22, 10]}><rect x={-260} y={-40} width={520} height={14} fill="#fff4da" /></Shade> : <g transform={`translate(0 ${-open * 90}) scale(${mix(0.7, 1, open)})`}><path d={rr(-390, -270, 780, 350, 22)} fill={BLUE[1]} />{[-1, 1].map((s) => <g key={s} transform={`scale(${s} 1)`}><Shade d="M6 -260Q180 -290 366 -260V60Q180 36 6 66Z" tones={CREAM} L={LL} s={[3, 9, 5]} /></g>)}{[-200, -150, -100, -50, 0].map((y, i) => <path key={y} d={`M-330 ${y}H${-90 - (i % 3) * 40}`} stroke="#8a82ac" strokeWidth={13} strokeLinecap="round" />)}{[0, 1, 2].map((i) => <path key={i} d={`M50 ${-40 + i * 30}H${300 - i * 40}`} stroke="#8a82ac" strokeWidth={12} strokeLinecap="round" />)}</g>}
        </g>
        {clip > 0 && <g transform={`translate(1180 560) rotate(${6 + Math.sin(t * 3) * 2}) scale(${clip})`}><Sticker x={0} y={0} s={0.46} stand={false} />{line("M-24 -230V-190Q-24 -168 0 -168Q24 -168 24 -190V-240", "#c0d6f0", 13)}</g>}
        {t > 1 && t < 2 && [0, 1, 2, 3, 4, 5].map((i) => { const u = (t - 1); return <circle key={i} cx={1000 + (i - 2.5) * 150 * (0.6 + u)} cy={725 - u * 50} r={18 * (1 - u)} fill="#fff4da" opacity={0.5 * (1 - u)} />; })}
      </Layer>
    </Frame>
  );
};
/** s27 shot 2: meja rapat kosong, undangan tak pernah tiba */
export const EmptyTableShot: React.FC = () => {
  const { t, dur } = useShot();
  const D = Math.max(dur, 4.5), u = seg(t, 0.2, D, Easing.inOut(Easing.sin));
  const a = u * Math.PI * 2.2 - 2.4, r = 520 + u * u * 900, ex = 960 + Math.cos(a) * r, ey = 330 + Math.sin(a) * r * 0.34;
  return (
    <Frame vignette={0.6}>
      <Layer cam={drift(t, 1.1, 1.0, D)} d={0.7}><Room t={t + 3} /></Layer>
      <Layer cam={drift(t, 1.1, 1.0, D)} d={1}>
        <Glow2 x={960} y={430} r={560} c="#ffd27a" o={0.3} />{line("M960 -80V190", "#101840", 8)}<path d="M870 230Q870 180 960 180Q1050 180 1050 230Z" fill={GOLD[2]} />
        {[560, 820, 1100, 1360].map((x) => <Shade key={x} d={rr(x - 80, 450, 160, 270, 60, 16)} tones={CORAL} L={LL} s={[6, 18, 9]} />)}
        <Shade d={ell(960, 720, 640, 120)} tones={WOOD} L={LL} s={[6, 18, 10]} /><path d="M860 826H1060L1100 1100H820Z" fill="#3c1d3e" />
        {[330, 1590].map((x) => <g key={x}><Shade d={rr(x - 90, 560, 180, 300, 70, 20)} tones={CORAL} L={LL} s={[6, 18, 9]} /></g>)}
        <path d={`M960 330m${-520} 0a520 177 0 1 0 1040 0`} stroke="#fff4da" strokeWidth={5} strokeDasharray="10 28" fill="none" opacity={0.3} />
        <g opacity={1 - seg(t, D - 0.8, D)}><Envelope x={ex} y={ey} s={1.05} rot={Math.sin(t * 2.4) * 14} /></g>
      </Layer>
    </Frame>
  );
};
/** bukit menara jaringan kartu menghadap laut */
const Hill: React.FC<{ t: number; day?: boolean; children?: React.ReactNode }> = ({ t, day, children }) => (
  <g>
    <Back id={day ? "t5hd" : "t5hn"} stops={day ? ["#2f6ab8", "#74b8e0", "#e8f4f0"] : ["#0a1030", "#22285c", "#6a427c"]} stars={day ? 0 : 60} t={t} />
    {day && [0, 1, 2].map((i) => <g key={i} transform={`translate(${((i * 760 + t * 14) % 2400) - 200} ${150 + i * 90})`} fill="#fff" opacity={0.85}><circle r={46} /><circle cx={54} cy={8} r={34} /><circle cx={-52} cy={12} r={30} /><rect x={-80} y={10} width={166} height={32} rx={16} /></g>)}
    <Sea t={t} y={650} c={day ? "#2c7ab0" : "#16295c"} hi={day ? "#bfe8f4" : "#5a84c8"} />
    {children}
  </g>
);
/** s28 shot 2: sorot berhenti di garis pantai */
export const BeamShot: React.FC = () => {
  const { t, word, dur, faces } = useShot();
  const D = Math.max(dur, 4), tRun = tw(word("run"), 1.8), stop = seg(t, tRun + 0.2, tRun + 0.9);
  const sw = mix(-26 + Math.sin(t * 1.5) * 20, 14, seg(t, tRun - 0.8, tRun));
  return (
    <Frame vignette={0.55}>
      <Hill t={t}>
        <Layer cam={drift(t, 1.02, 1.08, D)} d={1}>
          <path d="M1280 700Q1560 620 2100 660V820Q1600 800 1330 760Z" fill="#2f6a5c" /><path d="M1280 700Q1560 620 2100 660" stroke="#9ff0c4" strokeWidth={8} fill="none" />
          {[1520, 1690, 1850].map((x, i) => <g key={x}><path d={rr(x - 30, 620 - i * 6, 60, 60, 12)} fill="#fff4da" /><rect x={x - 12} y={638 - i * 6} width={24} height={20} fill="#ffd27a" /></g>)}
          <path d="M-300 800Q330 540 900 860V1200H-300Z" fill="#2a2458" />
          <NetTower x={400} y={730} s={0.95} t={t} mood={faces.network || stop > 0.5 ? "tired" : "neutral"} beam={1 - stop * 0.8} sweep={sw} />
          {stop > 0 && <path d="M1260 560Q1300 660 1270 760" stroke="#fff3b0" strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray="26 22" opacity={stop} />}
        </Layer>
      </Hill>
    </Frame>
  );
};
/** s30: jembatan papan dibuka */
export const BridgeShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const D = Math.max(dur, 4), tOpen = tw(word("open"), 1.4), p = seg(t, tOpen - 0.3, D - 0.3, Easing.inOut(Easing.sin));
  return (
    <Frame vignette={0.45}>
      <Back id="t5brg" stops={["#241a5c", "#7a4488", "#f0a070"]} />
      <Layer cam={{ x: mix(860, 1060, p), y: 540, z: 1.04 }} d={1}>
        <Glow2 x={1080} y={660} r={520} c="#ffc08a" o={0.65} /><circle cx={1080} cy={668} r={80} fill="#ffe2b0" />
        <Puff x={330 + t * 10} y={230} c="#c87c9c" o={0.75} /><Puff x={1000 + t * 6} y={330} s={1.2} c="#f0a490" o={0.7} /><Puff x={1640 + t * 8} y={180} s={0.9} c="#9c649c" o={0.75} /><Birds x={760} y={250} t={t} n={7} />
        <path d="M-300 705Q120 560 480 700ZM700 705Q860 640 1020 705ZM1240 705Q1560 590 1900 705Z" fill="#5c3c84" />
        <Sea t={t} y={700} c="#2c4686" hi="#f0b898" />
        <Boat x={1180 - t * 18} y={760} s={0.55} t={t} /><Boat x={120 + t * 14} y={930} s={1.05} t={t + 3} />
        <Office x={1620} y={680} s={0.62} lit={1} t={t} />
        {Array.from({ length: 18 }, (_, i) => { const at = i / 18, s = clamp((p - at) * 12); if (s <= 0) return null; const x = 640 + i * 44, y = 790 - Math.sin((i / 17) * Math.PI) * 130 - (i / 17) * 80; return <g key={i} transform={`translate(${x} ${y}) rotate(${(1 - s) * -80}) scale(${s})`}><Shade d={rr(-20, -14, 40, 46, 8)} tones={WOOD} L={LR} s={[3, 8, 5]} />{i % 4 === 0 && line("M0 -14V-80", "#98523e", 8)}</g>; })}
        <path d="M-300 790Q200 720 640 800Q640 900 400 940H-300Z" fill="#45286a" />
        {[60, 640].map((x, i) => <Palm key={x} x={x} base={805} h={300 - i * 110} t={t} seed={i * 4 + 2} c="#3c2060" />)}<Shrub x={610} y={820} s={0.8} flower="#ffd23f" /><Shrub x={100} y={850} s={1.1} flower="#ff9a68" />
        <CentralBank x={360} y={800} s={0.95} t={t} open={seg(t, 0.2, tOpen)} mood="calm" />
      </Layer>
    </Frame>
  );
};
const Globe: React.FC<{ x: number; y: number; r: number; t: number }> = ({ x, y, r, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <Shade d={circ(0, 0, r)} tones={["#1c4a86", "#2c70b0", "#4a9cd4", "#a8e0f4"]} L={LR} s={[14, 44, 20]}>
      {[0, 1, 2, 3, 4, 5].map((i) => { const u = ((i / 6 + t * 0.03) % 1), cx = (u - 0.5) * r * 3, cy = (R(i, 3) - 0.5) * r * 1.4; return <path key={i} d={`M${cx - 80} ${cy}q10 -70 80 -50q40 -34 76 6q50 20 14 62q-20 50 -70 30q-70 22 -100 -48Z`} fill="#4fa878" />; })}
    </Shade>
    {[-0.5, 0, 0.5].map((k) => <ellipse key={k} rx={r} ry={Math.abs(k) * r * 0.4 + 6} cy={k * r} fill="none" stroke="#fff" strokeWidth={3} opacity={0.18} />)}
  </g>
);
/** s31: menara tetap memimpin */
export const GlobeShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const D = Math.max(dur, 7), tVisa = tw(word("Visa"), 2.4), tCross = tw(word("countries"), D - 1);
  const arcs: [number, number, number, number][] = [[880, 560, 1300, 330], [1180, 740, 1650, 470], [1000, 380, 1620, 700], [900, 700, 1520, 300], [1100, 300, 1720, 560]];
  return (
    <Frame vignette={0.4}>
      <Hill t={t} day>
        <Layer cam={drift(t, 1.0, 1.07, D)} d={1}>
          <path d="M-300 790Q330 520 900 880V1200H-300Z" fill="#3f8a68" />
          <Globe x={1310} y={500} r={300} t={t} />
          <NetTower x={390} y={720} s={1.05} t={t} mood="calm" sweep={Math.sin(t * 1.3) * 24} />
          {arcs.map(([a, b, c, d], i) => { const start = tVisa - 0.6 + i * 0.55, u = t < start ? 0 : ((t - start) * 0.55) % 1.25, v = clamp(u), mx = (a + c) / 2, my = Math.min(b, d) - 190, x = (1 - v) * (1 - v) * a + 2 * (1 - v) * v * mx + v * v * c, y = (1 - v) * (1 - v) * b + 2 * (1 - v) * v * my + v * v * d; return t < start ? null : <g key={i}><path d={`M${a} ${b}Q${mx} ${my} ${c} ${d}`} pathLength={100} strokeDasharray={`${v * 100} 100`} stroke="#fff3b0" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.85} /><g transform={`translate(${x} ${y}) rotate(${(v - 0.5) * 50})`}><Shade d={rr(-48, -30, 96, 60, 11)} tones={[BLUE, PURPLE, TEALB, CORAL, DARK][i]} L={LR} s={[3, 9, 5]} /><rect x={-34} y={-12} width={22} height={17} rx={4} fill={P.coin} />{line("M-34 17H34", "#fff", 5)}</g></g>; })}
          {t > tCross - 0.4 && <Glow2 x={1310} y={500} r={460} c="#fff3b0" o={0.35 * bump(t, tCross - 0.4, 1.2)} />}
        </Layer>
      </Hill>
    </Frame>
  );
};
/** s32: kafe jauh, QR gagal, kartu jalan */
export const CafeShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const tNot = tw(word("doesn't"), 1.8), tCard = tw(word("card"), tNot + 1.4);
  const red = pop(t, tNot - 0.1, 0.35), tap = seg(t, tCard - 0.6, tCard, Easing.out(Easing.cubic)), ok = pop(t, tCard + 0.1, 0.35);
  const lx = 480, rx = 1440;
  const Term: React.FC<{ x: number; state: number; c: string }> = ({ x, state, c }) => <g transform={`translate(${x} 780)`}><Contact x={0} y={0} w={140} /><Shade d={rr(-100, -240, 200, 240, 30)} tones={DARK} L={LR} s={[6, 18, 10]} /><path d={rr(-74, -216, 148, 90, 12)} fill={state > 0.5 ? c : "#2c3c6c"} />{[0, 1, 2].map((i) => [0, 1, 2].map((j) => <circle key={`${i}${j}`} cx={-48 + i * 48} cy={-96 + j * 32} r={12} fill="#8ca0d0" />))}</g>;
  return (
    <Frame vignette={0.5}>
      <Back id="t5caf" stops={["#2a5a88", "#7ab0c0", "#f4dcb4"]} />
      <Layer cam={drift(t, 1.0, 1.05, Math.max(4, dur))} d={0.35}>{[120, 520, 1150, 1580].map((x, i) => <g key={x}><clipPath id={`t5win${i}`}><path d={rr(x, 120, 260, 460, 130, 10)} /></clipPath><path d={rr(x - 18, 102, 296, 496, 148, 16)} fill="#8a5a4a" /><g clipPath={`url(#t5win${i})`}><rect x={x} y={120} width={260} height={460} fill="#cfeaf4" /><Puff x={x + 60 + ((t * 12 + i * 60) % 220)} y={230} s={0.6} /><FarCity x0={x - 40} x1={x + 300} base={540} seed={i * 11 + 2} fill="#7aa0bc" hi="#e8f4f4" t={t} lights={0.05} /><Tree x={x + 60 + i * 30} base={590} s={1.1} seed={i} t={t} /></g><path d={`M${x + 130} 120V580M${x} 340H${x + 260}`} stroke="#8a5a4a" strokeWidth={14} /><path d={rr(x - 30, 576, 320, 30, 10)} fill="#b87c58" /></g>)}</Layer>
      <Layer cam={drift(t, 1.0, 1.05, Math.max(4, dur))} d={0.65}><path d="M-300 640H2220V800H-300Z" fill="#6a4458" />{Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${-260 + i * 120} 650V800`} stroke="#54344c" strokeWidth={8} />)}<Shrub x={70} y={720} s={1.5} /><Shrub x={1860} y={720} s={1.4} /></Layer>
      <Layer cam={drift(t, 1.0, 1.05, Math.max(4, dur))} d={1}>
        <Shade d={rr(-200, 770, 2320, 80, 20)} tones={WOOD} L={LR} s={[4, 14, 8]} /><path d="M-200 848H2120V1300H-200Z" fill="#4a2c48" />
        <Pendant x={250} len={150} t={t} /><Pendant x={760} len={110} t={t} c={CORAL} /><Pendant x={1170} len={110} t={t} c={CORAL} /><Pendant x={1700} len={150} t={t} />
        {line("M960 160V850", "#fff4da", 12)}<Cup x={830} y={778} t={t} /><Cup x={1080} y={782} s={0.85} t={t + 1} c={CORAL} /><Cup x={1790} y={778} t={t + 2} c={GOLD} />
        <g opacity={1 - seg(t, tCard + 0.6, tCard + 1.1) * 0.45}><Term x={lx + 150} state={red} c={P.coral} /><Phone x={lx - 130 + (t > tNot && t < tNot + 0.6 ? Math.sin(t * 60) * 12 : 0)} y={520} s={0.9} rot={8} bg={red > 0.5 ? "#4a1c3a" : "#5a3a80"} screen={red > 0.5 ? <Cross x={0} y={-10} r={70} p={red} /> : <QrGrid x={-70} y={-80} size={140} />} /></g>
        <Term x={rx - 130} state={ok} c={P.green} />
        <g transform={`translate(${mix(1800, rx - 30, tap)} ${mix(300, 520, tap)}) rotate(${-14 - bump(t, tCard, 0.4) * 8})`}><Shade d={rr(-130, -82, 260, 164, 22)} tones={BLUE} L={LR} s={[5, 15, 9]} /><rect x={-96} y={-30} width={56} height={44} rx={9} fill={P.coin} />{line("M-96 44H90", "#fff", 10)}</g>
        {ok > 0 && [0, 1, 2].map((i) => { const u = (t - tCard) * 1.2 - i * 0.2; return u > 0 && u < 1 ? <circle key={i} cx={rx - 130} cy={600} r={60 + u * 180} fill="none" stroke="#7dffb8" strokeWidth={10 * (1 - u)} /> : null; })}
        <Tick x={rx - 130} y={450} r={64} p={ok} />
        <You x={vertical ? 960 : 150} y={1150} s={0.9} t={t} face="neutral" look={26} />
      </Layer>
    </Frame>
  );
};
const Crate: React.FC<{ x: number; y: number; k: "rp" | "thb" | "usd"; s?: number; dim?: number }> = ({ x, y, k, s = 1, dim = 0 }) => <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1 - dim * 0.5}><Shade d={rr(-52, -72, 104, 72, 12)} tones={WOOD} L={LR} s={[4, 11, 6]} /><Coin x={-22} y={-76} r={25} k={k} label={false} /><Coin x={24} y={-78} r={25} k={k} label={false} /><Coin x={0} y={-36} r={27} k={k} /></g>;
const Strait2: React.FC<{ t: number; children?: React.ReactNode; dollar?: boolean; vertical?: boolean }> = ({ t, children, dollar, vertical }) => (
  <g>
    <Back id="t5dock" stops={["#201858", "#6a3c88", "#f09870"]} />
    <Sea t={t} y={620} c="#2a4488" hi="#f0b898" />
    <path d="M-300 660Q100 600 520 650L500 800Q200 830 -300 800Z" fill="#35306a" /><path d="M2220 660Q1820 600 1400 650L1420 800Q1720 830 2220 800Z" fill="#2c5a58" />
    <Shade d={rr(300, 760, 300, 30, 10)} tones={WOOD} L={LR} s={[3, 8, 5]} /><Shade d={rr(1320, 760, 300, 30, 10)} tones={WOOD} L={LR} s={[3, 8, 5]} />
    <BankHouse x={vertical ? 780 : 230} y={660} s={vertical ? 0.42 : 0.7} t={t} /><BankHouse x={vertical ? 1140 : 1690} y={660} s={vertical ? 0.42 : 0.7} t={t} />
    <Txt x={vertical ? 780 : 230} y={vertical ? 440 : 360} s={vertical ? 28 : 38}>THAI BANK</Txt><Txt x={vertical ? 1140 : 1690} y={vertical ? 475 : 360} s={vertical ? 28 : 38}>{vertical ? "ID BANK" : "INDONESIAN BANK"}</Txt>
    {dollar && <g><Shade d={rr(860, 560, 200, 26, 10)} tones={DARK} L={LR} s={[3, 8, 5]} /><Crate x={960} y={562} k="usd" dim={1} /></g>}
    {children}
  </g>
);
const Ferry: React.FC<{ x: number; y: number; t: number; children?: React.ReactNode }> = ({ x, y, t, children }) => <g transform={`translate(${x} ${y + Math.sin(t * 2.2) * 7}) rotate(${Math.sin(t * 1.7) * 1.4})`}>{children}<Shade d="M-250 0H250Q220 84 150 90H-150Q-220 84 -250 0Z" tones={CREAM} L={LR} s={[6, 20, 10]}><rect x={-260} y={22} width={520} height={16} fill={P.coral} /></Shade></g>;
/** s39 shot 1: peti menyeberang */
export const FerryShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const D = Math.max(dur, 6), tBanks = tw(word("banks"), 2), tSwap = tw(word("swap"), tBanks + 1.6);
  const load = seg(t, tBanks - 0.6, tBanks + 0.6), go = seg(t, tSwap - 0.3, D - 0.2, Easing.inOut(Easing.sin));
  return (
    <Frame vignette={0.45}>
      <Layer cam={drift(t, 1.0, 1.06, D)} d={1}>
        <Strait2 t={t} vertical={vertical}>
          <g transform={vertical ? "translate(960 700) scale(0.58) translate(-960 -800)" : undefined}><Ferry x={mix(760, 1160, go)} y={800} t={t}><Crate x={mix(-420, -140, load) + go * 20} y={0} k="thb" /><Crate x={mix(-480, -30, load)} y={0} k="thb" /><Crate x={mix(740, 140, load)} y={0} k="rp" /><Crate x={mix(800, 40, load)} y={0} k="rp" /></Ferry></g>
          {go > 0 && <g opacity={Math.sin(go * Math.PI)}><path d="M680 530Q960 380 1240 530M1204 482L1244 530L1182 542" stroke="#fff4da" strokeWidth={11} fill="none" strokeLinecap="round" /><path d="M1240 580Q960 730 680 580M716 628L676 580L738 568" stroke="#fff4da" strokeWidth={11} fill="none" strokeLinecap="round" /></g>}
        </Strait2>
      </Layer>
    </Frame>
  );
};
/** s39 shot 2: peti menumpuk, dermaga dolar tak disentuh */
export const SettleShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const D = Math.max(dur, 5), tSet = tw(word("settlement"), 1), tCur = tw(word("currencies"), D - 1);
  const pos: [number, number][] = [[-52, 0], [62, 0], [5, -88]];
  return (
    <Frame vignette={0.45}>
      <Layer cam={drift(t, 1.06, 1.0, D)} d={1}>
        <Strait2 t={t} dollar vertical={vertical}>
          {pos.map(([a, b], i) => { const at = 0.3 + i * 0.45, p = seg(t, at, at + 0.5, Easing.out(Easing.bounce)); return <g key={i} opacity={t > at ? 1 : 0} transform={vertical ? "translate(0 -40)" : undefined}><Crate x={(vertical ? 790 : 450) + a * (vertical ? 0.7 : 1)} y={mix(300, 760 + b * (vertical ? 0.7 : 1), p)} s={vertical ? 0.7 : 1} k="rp" /><Crate x={(vertical ? 1130 : 1470) + a * (vertical ? 0.7 : 1)} y={mix(300, 760 + b * (vertical ? 0.7 : 1), p)} s={vertical ? 0.7 : 1} k="thb" /></g>; })}
          
          {t > tCur - 0.4 && (vertical ? [790, 1130] : [450, 1470]).map((x) => <Glow2 key={x} x={x} y={700} r={220 * bump(t, tCur - 0.4, 1.2)} c="#fff6c0" o={0.8} />)}
          {t > tSet && <g transform={`translate(960 180) scale(${pop(t, tSet, 0.3)})`}><Tick x={0} y={0} r={62} p={1} /></g>}
        </Strait2>
      </Layer>
    </Frame>
  );
};
/** Saudi dan Australia: pasar Indonesia diganti arah yang benar: lihat s39 (bank di tiap sisi). */
/** s42 shot 2: jalan belanja malam, sedikit toko menyala, jalur satu arah */
export const TokyoShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const t35 = tw(word("thirty-five"), 1), tOnly = tw(word("only", 1), t35 + 2.4), D = Math.max(dur, 6);
  const lit = Math.floor(seg(t, t35 - 0.5, t35 + 0.9) * 7);
  const way = seg(t, tOnly - 0.5, tOnly + 0.2), gate = seg(t, tOnly + 0.9, tOnly + 1.5, Easing.out(Easing.bounce));
  const on = [2, 7, 11, 4, 13, 0, 9];
  return (
    <Frame vignette={0.6}>
      <Back id="t5tk" stops={["#080c28", "#1c2458", "#4a3470"]} stars={30} t={t} />
      <Layer cam={drift(t, 1.02, 1.1, D)} d={1}>
        {Array.from({ length: 16 }, (_, i) => { const row = i < 8 ? 0 : 1, x = 130 + (i % 8) * 238 + row * 40, base = row ? 630 : 420, h = row ? 230 : 210, isOn = on.slice(0, lit).includes(i); return <g key={i}><Shade d={rr(x - 105, base - h - (i % 3) * 26, 210, h + (i % 3) * 26, 14, 4)} tones={["#161c46", "#252e66", "#36428a", "#6a7ac0"]} L={LL} s={[5, 15, 8]} /><path d={rr(x - 72, base - 108, 144, 108, 10, 2)} fill={isOn ? "#ffd27a" : "#10163a"} />{isOn && <Glow2 x={x} y={base - 60} r={170} c="#ffd27a" o={0.55} />}<path d={`M${x - 90} ${base - 108}H${x + 90}L${x + 76} ${base - 140}H${x - 76}Z`} fill={isOn ? P.coral : "#2c2c5c"} />{isOn && <rect x={x + 28} y={base - 84} width={30} height={36} rx={5} fill="#fff" />}</g>; })}
        <path d="M-300 630H2220V1200H-300Z" fill="#161638" />
        {Array.from({ length: 16 }, (_, i) => { const row = i < 8 ? 0 : 1, x = 130 + (i % 8) * 238 + row * 40, base = row ? 630 : 420, h = (row ? 230 : 210) + (i % 3) * 26, top = base - h, isOn = on.slice(0, lit).includes(i); return <g key={i}>
          {i % 3 === 0 ? <path d={`M${x - 128} ${top + 10}Q${x - 60} ${top - 6} ${x} ${top - 52}Q${x + 60} ${top - 6} ${x + 128} ${top + 10}Z`} fill="#44306c" /> : i % 3 === 1 ? <g><path d={rr(x - 60, top - 34, 70, 40, 8)} fill="#2c3674" />{line(`M${x + 46} ${top}V${top - 66}M${x + 30} ${top - 50}H${x + 62}`, "#6a7ac0", 6)}</g> : <path d={rr(x - 116, top - 12, 232, 20, 8)} fill="#5462a8" />}
          {[-52, 8].map((a, k) => <rect key={a} x={x + a} y={top + 24} width={44} height={30} rx={6} fill={R(i * 5 + k, 2) > 0.55 ? "#f4c878" : "#10163a"} />)}
          <path d={rr(x + 74, top + 62, 22, 66, 7)} fill={isOn ? "#8ce8d0" : "#2c3466"} />
          {isOn && [-40, 0, 40].map((a) => <path key={a} d={`M${x + a - 17} ${base - 108}h34v${30 + Math.sin(t * 2 + a) * 3}h-34Z`} fill="#e4572e" />)}
          <Lantern x={x - 88} y={base - 104} t={t} on={isOn} />
        </g>; })}
        {[250, 930, 1640].map((x) => <g key={x}>{line(`M${x} 650V150M${x - 50} 180H${x + 50}M${x - 36} 214H${x + 36}`, "#0c0c28", 12)}</g>)}{line("M-300 190Q-20 240 250 180Q590 262 930 180Q1290 266 1640 180Q1930 240 2220 190", "#0c0c28", 4)}
        <Vending x={72} y={640} t={t} /><Vending x={1870} y={640} t={t + 1} />
        <circle cx={620} cy={90} r={40} fill="#e8f0ff" opacity={0.9} /><Glow2 x={620} y={90} r={200} c="#9fb8ff" o={0.4} />
        {[0, 1, 2].map((i) => <Walker key={i} x={((i * 760 + (i % 2 ? -1 : 1) * t * 60 + 2200) % 2200) - 140} y={650} s={0.62} t={t} seed={i * 3} c={["#4a4a8a", "#7a3a6a", "#2c6a7a"][i]} />)}
        {way > 0 && <g opacity={way}>
          <path d="M360 720H1560" stroke="#7dffd0" strokeWidth={30} strokeLinecap="round" /><path d="M360 720H1560" stroke="#fff" strokeWidth={8} strokeDasharray="30 50" strokeDashoffset={-t * 90} /><path d="M1550 674L1620 720L1550 766Z" fill="#7dffd0" />
          <path d="M360 820H1560" stroke="#8a8ab0" strokeWidth={30} strokeLinecap="round" opacity={0.5} />
          <Txt x={360} y={680} s={36}>INDONESIA</Txt><Txt x={1520} y={662} s={36}>JAPAN</Txt>
          <g transform={`translate(1000 ${mix(560, 820, gate)})`}><Shade d={rr(-26, -90, 52, 150, 16)} tones={CORAL} L={LL} s={[4, 12, 7]} />{[-52, -10, 32].map((y) => <rect key={y} x={-26} y={y} width={52} height={18} fill="#fff4da" />)}</g>
        </g>}
      </Layer>
    </Frame>
  );
};
/** jemaah generik berpakaian putih polos */
const Pilgrim: React.FC<{ x: number; y: number; s?: number; t: number; seed: number; arm?: boolean }> = ({ x, y, s = 1, t, seed, arm }) => {
  const b = Math.sin(t * 2 + seed) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}><Contact x={0} y={4} w={100} /><g transform={`translate(0 ${b})`}><Shade d="M-82 -6Q-96 -250 0 -262Q96 -250 82 -6Z" tones={["#8a8ab4", "#c8c8e4", "#f4f4ff", "#ffffff"]} L={LR} s={[7, 22, 10]} /><Shade d={circ(0, -300, 62)} tones={["#6a3a30", "#9a5a40", "#c88058", "#f0b080"]} L={LR} s={[5, 14, 8]} /><path d="M-66 -310Q-60 -380 0 -376Q60 -380 66 -310Q0 -340 -66 -310Z" fill="#fff" /><circle cx={4} cy={-298} r={7} fill="#241440" /><circle cx={38} cy={-298} r={7} fill="#241440" />{line("M8 -272Q22 -262 36 -272", "#241440", 5)}<Hose d={arm ? "M66 -180Q140 -150 160 -220" : "M70 -180Q106 -130 90 -80"} tones={["#8a8ab4", "#c8c8e4", "#f4f4ff", "#ffffff"]} /></g></g>;
};
/** s43 shot 2 */
export const MarketShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const D = Math.max(dur, 5), tPay = tw(word("pay"), D - 1.6), tPil = tw(word("pilgrims"), 1.8);
  const lock = seg(t, tPil, tPil + 0.5, Easing.out(Easing.back(1.5))), ok = pop(t, tPay - 0.1, 0.35), nod = bump(t, tPay + 0.2, 0.7) * 24;
  return (
    <Frame vignette={0.45}>
      <Back id="t5mk" stops={["#4a90c8", "#a8d4dc", "#ffe0a8"]} />
      <Layer cam={drift(t, 1.0, 1.1, D, 1000, 560)} d={0.4}>{Array.from({ length: 14 }, (_, i) => <g key={i}><path d={rr(-200 + i * 170, 380 - R(i, 3) * 130, 150, 500, i % 3 ? 14 : 75, 0)} fill="#e0ac84" /><path d={rr(-160 + i * 170, 440 - R(i, 3) * 100, 44, 70, 22, 4)} fill="#b87c68" /></g>)}</Layer>
      <Layer cam={drift(t, 1.0, 1.08, D, 1000, 560)} d={1}>
        <path d="M-300 830H2220V1200H-300Z" fill="#c08460" />
        <Shade d={rr(900, 260, 34, 570, 10)} tones={WOOD} L={LR} s={[4, 11, 6]} /><Shade d={rr(1800, 260, 34, 570, 10)} tones={WOOD} L={LR} s={[4, 11, 6]} />
        <Pilgrim x={1620} y={780 + nod} s={0.9} t={t} seed={5} />
        <Shade d={rr(880, 650, 980, 190, 20)} tones={WOOD} L={LR} s={[6, 18, 10]} />
        {[0, 1, 2].map((k) => <g key={k} transform={`translate(${990 + k * 190} 656)`}><path d="M-80 0Q0 -90 80 0Z" fill="#7a3c24" />{Array.from({ length: 11 }, (_, i) => <ellipse key={i} cx={(R(k * 20 + i, 2) - 0.5) * 120} cy={-8 - R(k * 20 + i, 3) * 44} rx={17} ry={11} fill={i % 2 ? "#a85428" : "#c8702c"} />)}<path d={rr(-86, -4, 172, 22, 8)} fill={CREAM[1]} /></g>)}
        <Sticker x={1500} y={660} s={0.52} glow={lock} /><ScanFrame x={1500} y={660 - 122} w={130} p={lock * (1 - ok)} />
        <path d="M850 320Q1360 230 1880 320L1870 380Q1810 430 1750 380Q1690 430 1630 380Q1570 430 1510 380Q1450 430 1390 380Q1330 430 1270 380Q1210 430 1150 380Q1090 430 1030 380Q970 430 910 380Q880 400 860 380Z" fill={P.coral} />
        {line("M870 330Q1360 245 1860 330", "#fff4da", 12)}
        <Pilgrim x={300} y={930} s={0.9} t={t} seed={1} /><Pilgrim x={640} y={990} s={1.12} t={t} seed={2} arm />
        <Phone x={900} y={700} s={0.55} rot={-10} bg={ok > 0.5 ? P.cream : "#5a3a80"} screen={ok > 0.5 ? <Tick x={0} y={-10} r={70} p={ok} /> : <QrGrid x={-70} y={-80} size={140} />} />
      </Layer>
    </Frame>
  );
};
/** s46 shot 1: menara besar, adaptor kecil di pantai */
export const SizeShot: React.FC = () => {
  const { t, dur } = useShot();
  const D = Math.max(dur, 4), p = seg(t, 0.2, D - 0.4, Easing.inOut(Easing.sin));
  return (
    <Frame vignette={0.45}>
      <Hill t={t} day>
        <Layer cam={{ x: mix(860, 1030, p), y: 540, z: 1.02 + p * 0.06 }} d={1}>
          <path d="M-300 780Q420 500 1050 860V1200H-300Z" fill="#3f8a68" /><path d="M900 860Q1400 740 2220 800V1200H900Z" fill="#f0d49c" />
          <Foam d="M1000 862Q1420 752 2220 808" t={t} /><Boat x={1250 + t * 16} y={730} s={0.55} t={t} /><Boat x={1780 - t * 10} y={690} s={0.35} t={t + 2} /><Birds x={900} y={260} t={t} />
          {[1780, 1935].map((x, i) => <Palm key={x} x={x} base={900 + i * 30} h={380 - i * 90} t={t} seed={i * 6 + 1} c="#2c6a50" />)}
          {[[90, 770, 1], [230, 720, 0.7], [780, 740, 0.85], [920, 810, 0.65], [150, 900, 1.2], [700, 870, 1]].map(([x, y, s], i) => <Shrub key={i} x={x} y={y} s={s} flower={i % 2 ? "#fff4da" : "#ffd23f"} />)}
          <Rock x={1090} y={880} s={1.1} /><Rock x={1180} y={902} s={0.6} /><Rock x={1650} y={940} s={0.9} />{Array.from({ length: 30 }, (_, i) => <circle key={i} cx={1200 + R(i, 2) * 900} cy={880 + R(i, 3) * 190} r={4 + R(i, 4) * 6} fill="#d8ac74" />)}
          {line("M520 700C640 790 520 860 620 1100", "#f0d49c", 42, 0.85)}
          <NetTower x={480} y={700} s={1.22} t={t} mood="calm" />
          <Contact x={1470} y={882} w={120} /><Adapter x={1470} y={820} s={0.52} t={t} />
        </Layer>
      </Hill>
    </Frame>
  );
};
export const _l = { Socket, BankChar, GREEN, GOLD, SILVER };
