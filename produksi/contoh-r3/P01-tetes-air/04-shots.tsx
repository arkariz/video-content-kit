// P01 "How a single drop of water travels through a city": prototipe Fase 3 sistem visual storytelling (2.5D, mesin R3).
// Subjek: satu tetes air yang diikuti. Semua gerak fungsi murni dari `t`; acak hanya lewat R dari @r3.
import React from "react";
import { Easing } from "remotion";
import { Backdrop, FlatRect, Frame, Glow, Layer, Particles, R, defineShots, keys, lerpColor, mix, seg, shot, useShot } from "@r3";
import { CLEAR, Drop, GREY, MURKY, Splash, TearGhost } from "./parts/drop";
import { Fog, Rain, Skyline } from "./parts/city";
import { Wp, impact, soft, stretch, tw } from "./parts/util";
import { RiverBody, Pipe, StirTank, FlocTank, SettleTank, FilterTank, ChlorTank, AerTank, BarRack, PlantBack, House } from "./parts/plant";

const DUSK = ["#2b3550", "#5e6f8f", "#b3a8b9"];
const rainArea = (v: boolean): [number, number, number, number] => (v ? [960 - 460, -80, 960 + 460, 1160] : [-60, -80, 1980, 1160]);

/* ================= s01: tetes jatuh, bukan air mata, memipih seperti roti burger ================= */
const FallShot: React.FC = () => {
  const { t, word, vertical, dur } = useShot();
  const tTear = tw(word("teardrops"), 1.05), tFlat = tw(word("flatten"), 2.5);
  const hx = 960, hy = vertical ? 600 : 560, R0 = vertical ? 125 : 150;
  const flatP = seg(t, tFlat, tFlat + 0.55, Easing.out(Easing.back(1.5)));
  const wob = t > tFlat ? Math.exp(-(t - tFlat) * 2.6) * Math.sin((t - tFlat) * 13) * 0.09 : 0;
  const flat = flatP;
  const sx = 1 + wob + (t < tFlat ? 0 : 0), sy = (t < tFlat ? 1.03 : 1) - wob;
  const ghostIn = seg(t, tTear, tTear + 0.35, Easing.out(Easing.back(1.6))), ghostOut = 1 - seg(t, tFlat - 0.15, tFlat + 0.2, Easing.in(Easing.cubic));
  const ghostP = ghostIn * ghostOut;
  const crossP = seg(t, tTear + 0.35, tTear + 0.65);
  const air = seg(t, tFlat - 0.1, tFlat + 0.45) * 0.9;
  const cam = { x: 960, y: mix(560, 520, seg(t, 0, dur)), z: mix(1.0, 1.14, seg(t, 0, dur, Easing.inOut(Easing.sin))) };
  const hover = Math.sin(t * 2.4) * 7;
  const smallX = 1440, smallY = 700;
  return (
    <Frame>
      <Layer cam={cam} d={0}><Backdrop stops={DUSK} t={t} glow="#f0b57a" glowAt={[960, 900]} glowR={900} particles={["#e8f1ff"]} n={20} speed={-0.8} /></Layer>
      <Layer cam={cam} d={0.18} blur={3}>
        <g transform={`translate(0 ${-((t * 60) % 400)})`}>{[0, 1].map((k) => <g key={k} transform={`translate(0 ${k * 400})`}>{[260, 900, 1520].map((x, i) => <ellipse key={i} cx={x + k * 130} cy={120 + (i % 2) * 60} rx={220} ry={46} fill="#d6c9d6" opacity={0.2} />)}</g>)}</g>
        <Skyline x0={-700} x1={2700} base={1180 - t * 14} seed={3} fill="#5b6b88" h={[160, 420]} w={[90, 170]} />
      </Layer>
      <Rain t={t} n={vertical ? 40 : 90} area={rainArea(vertical)} speed={-700} len={[40, 80]} w={2.5} op={0.22} seed={1} />
      <Layer cam={cam} d={0.5} blur={3}>
        <Skyline x0={-600} x1={2600} base={1230 - t * 24} seed={7} fill="#44546f" win="#ffd98a" h={[220, 520]} w={[100, 190]} lit={0.3} />
        <Fog y={700} h={420} color="#9aa5bb" o={0.5} />
      </Layer>
      <Layer cam={cam} d={1}>
        {/* aliran udara naik di sekitar dasar tetes: tekanan udara yang meratakan */}
        {air > 0 && [-1, 1].flatMap((s) => [0, 1, 2].map((j) => {
          const p = (t * 1.1 + j / 3 + (s > 0 ? 0.17 : 0)) % 1, ox = s * (R0 * (0.75 + j * 0.28));
          return <path key={`${s}${j}`} d={`M${hx + ox} ${hy + R0 * 1.4 - p * R0 * 1.6} q${s * 14} -40 0 -80`} stroke="#e9f6ff" strokeWidth={7} fill="none" strokeLinecap="round" opacity={air * Math.sin(p * Math.PI) * 0.75} />;
        }))}
        {air > 0 && [-1, 0, 1].map((s) => <path key={s} d={`M${hx + s * R0 * 0.6} ${hy + R0 * 1.55} l0 -${R0 * 0.55}`} stroke="#bfe8ff" strokeWidth={9} strokeLinecap="round" opacity={air * 0.45 * (0.6 + 0.4 * Math.sin(t * 8 + s))} />)}
        <Glow x={hx} y={hy + hover} r={R0 * 2.3} color="#7fd8ff" p={0.28} t={t} />
        <Drop x={hx} y={hy + hover} r={R0} flat={flat} sx={sx} sy={sy} refl={0.85} />
        <TearGhost x={hx} y={hy + hover} r={R0} p={ghostP} />
        {crossP > 0 && ghostOut > 0 && <g opacity={ghostOut}><rect x={hx - R0 * 1.25 * crossP} y={hy + hover - R0 * 0.3 - 11} width={R0 * 2.5 * crossP} height={22} rx={11} fill="#e2573d" transform={`rotate(-38 ${hx} ${hy + hover - R0 * 0.3})`} opacity={0.92} /></g>}
        {/* tetes kecil: tetap bulat */}
        {!vertical && <g><Glow x={smallX} y={smallY + Math.sin(t * 2.1 + 1) * 6} r={120} color="#7fd8ff" p={0.22} t={t} /><Drop x={smallX} y={smallY + Math.sin(t * 2.1 + 1) * 6} r={R0 * 0.34} refl={0.55} /></g>}
      </Layer>
      <Rain t={t} n={vertical ? 14 : 28} area={rainArea(vertical)} speed={-1500} len={[160, 300]} w={7} op={0.2} seed={2} blur />
      <Particles t={t} colors={["#fff", "#cfe6ff"]} n={26} speed={-3} area={[0, 0, 1920, 1080]} size={[3, 8]} opacity={0.4} seed={5} />
    </Frame>
  );
};


/* ---------- bagian bersama ---------- */
const Soil: React.FC<{ x0: number; x1: number; y: number; h?: number; seed?: number }> = ({ x0, x1, y, h = 900, seed = 1 }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <g>
      <defs><linearGradient id={`s${id}`} x1={0} y1={0} x2={0} y2={1}><stop offset={0} stopColor="#7a6450" /><stop offset={1} stopColor="#3f342c" /></linearGradient></defs>
      <rect x={x0} y={y} width={x1 - x0} height={h} fill={`url(#s${id})`} />
      {Array.from({ length: 40 }, (_, i) => <ellipse key={i} cx={mix(x0, x1, R(i + seed, 1))} cy={y + 30 + R(i + seed, 2) * (h - 60)} rx={8 + R(i, 3) * 20} ry={5 + R(i, 4) * 9} fill="#2f2620" opacity={0.2} />)}
    </g>
  );
};

/* ================= s02: atap, talang, got, pipa bawah tanah, sungai ================= */
const roofY = (x: number) => 360 + (x - 140) / 3;
const RS = 34;
const RunoffShot: React.FC = () => {
  const { t, word, vertical, dur } = useShot();
  const tL = tw(word("lands"), 1.32), tS = tw(word("slides"), 2.54), tD = tw(word("drain"), 3.18), tE = tw(word("ends"), 4.1), tV = tw(word("river"), 4.7);
  const wps: Wp[] = [
    [0, 430, 10], [tL, 430, roofY(430) - RS, "in"], [tS - 0.35, 480, roofY(480) - RS, "io"], [tS + 0.21, 880, roofY(880) - RS, "in"],
    [tS + 0.32, 904, 650, "io"], [tD - 0.06, 904, 872, "in"], [tD + 0.2, 1300, 884, "io"], [tD + 0.52, 1300, 1090, "in"],
    [tD + 0.62, 1340, 1090, "io"], [tE + 0.32, 2300, 1090, "io"], [tE + 0.48, 2400, 1085, "out"], [tV + 0.1, 2480, 1175, "in"],
    [tV + 0.3, 2500, 1184, "io"], [dur + 1, 2560, 1184, "io"],
  ];
  const [px, py] = soft(t, wps), [cx0, cy0] = soft(t - 0.12, wps), st = stretch(t, wps);
  const imp = impact(t, tL), tSplash = tV + 0.1;
  const z2 = keys(t, [0, tL, tL + 1.0, tD, tE + 0.2, tV + 0.5, dur], [3.6, 1.5, 1.05, 1.25, 1.15, 1.0, 1.2]);
  const cam = { x: cx0 + (vertical ? 0 : 340 * seg(t, tV + 0.2, dur)), y: cy0 + 30 - 60 * seg(t, tV + 0.2, dur) - (vertical ? 170 / z2 : 0), z: z2 };
  const tone = lerpColor(CLEAR, MURKY, seg(t, tL + 0.2, tD + 0.6));
  const flat = mix(1, 0.1, seg(t, 0, 1.0)) * (t < tL ? 1 : 0);
  const afloat = t > tV + 0.3 ? Math.sin((t - tV) * 2.2) * 3 : 0;
  const film = t > tD - 0.1 ? Math.max(0, Math.min(396, px - 904)) : 0;
  return (
    <Frame>
      <Layer cam={cam} d={0}><Backdrop stops={DUSK} t={t} glow="#f0b57a" glowAt={[960, 800]} glowR={1000} particles={["#e8f1ff"]} n={14} speed={0.5} /></Layer>
      <Layer cam={cam} d={0.2} blur={3}><Skyline x0={-1600} x1={4200} base={900} seed={3} fill="#5b6b88" h={[200, 560]} w={[90, 170]} /></Layer>
      <Rain t={t} n={vertical ? 30 : 80} area={rainArea(vertical)} speed={900} len={[40, 80]} w={2.5} op={0.2} seed={1} />
      <Layer cam={cam} d={0.5} blur={3}>
        <Skyline x0={-1400} x1={4200} base={1010} seed={7} fill="#44546f" win="#ffd98a" h={[220, 520]} w={[100, 190]} lit={0.3} />
        <Fog y={640} h={420} color="#9aa5bb" o={0.5} x0={-1400} x1={4200} />
      </Layer>
      <Layer cam={cam} d={1}>
        <Soil x0={-500} x1={2300} y={1000} h={1000} seed={2} />
        <FlatRect x={-500} y={900} w={2800} h={110} r={6} fill="#56626f" shadeK={0.15} />
        <rect x={-500} y={896} width={2800} height={16} fill="#8d99a5" />
        {[620, 1180, 1900].map((x) => <ellipse key={x} cx={x} cy={906} rx={90} ry={7} fill="#b9d3e6" opacity={0.28} />)}
        {/* gedung dan atap */}
        <path d={`M150 ${roofY(150)} L850 ${roofY(850)} L850 900 L150 900 Z`} fill="#b8aa97" stroke="#b8aa97" strokeWidth={20} strokeLinejoin="round" />
        <path d={`M690 ${roofY(690)} L850 ${roofY(850)} L850 900 L690 900 Z`} fill="#8e8272" opacity={0.45} />
        {[230, 440, 650].map((x, i) => <g key={x}><rect x={x} y={640} width={120} height={150} rx={24} fill="#ffcf7a" opacity={0.92} /><rect x={x} y={640} width={120} height={80} rx={24} fill="#fff1c4" opacity={0.35} /><rect x={x + 56} y={640} width={8} height={150} fill="#b8aa97" /></g>)}
        <rect x={420} y={860} width={90} height={40} rx={10} fill="#7c6a58" />
        <path d={`M96 ${roofY(96)} L910 ${roofY(910)} L910 ${roofY(910) + 46} L96 ${roofY(96) + 46} Z`} fill="#8d5c53" stroke="#8d5c53" strokeWidth={26} strokeLinejoin="round" />
        <path d={`M96 ${roofY(96) - 10} L910 ${roofY(910) - 10}`} stroke="#d99d8c" strokeWidth={10} opacity={0.45} strokeLinecap="round" />
        {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${130 + i * 50} ${roofY(130 + i * 50) + 4} l0 34`} stroke="#6a4039" strokeWidth={4} opacity={0.35} strokeLinecap="round" />)}
        {Array.from({ length: 6 }, (_, i) => { const p = (t * 1.6 + i / 6) % 1, x = 200 + R(i, 1) * 620; return <ellipse key={i} cx={x} cy={roofY(x) - 14} rx={6 + p * 22} ry={2 + p * 6} fill="none" stroke="#e8f4ff" strokeWidth={3} opacity={0.6 * (1 - p)} />; })}
        <FlatRect x={850} y={610} w={110} h={32} r={14} fill="#8fa0ad" shadeK={0.2} />
        <Pipe d="M904 640 L904 892" w={34} water={0.2} />
        {/* got dan pipa bawah tanah (potongan tembus) */}
        <rect x={880} y={886} width={film > 0 ? film + 24 : 0} height={9} rx={4.5} fill={CLEAR} opacity={0.5} />
        <FlatRect x={1250} y={893} w={100} h={16} r={6} fill="#2b3540" shadeK={0.1} hi={false} />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={1262 + i * 19} y={895} width={7} height={12} rx={3} fill="#0f161c" />)}
        <Pipe d="M1300 906 L1300 1090 L2300 1090" w={64} water={0.3} wc={MURKY} />
        <FlatRect x={2286} y={1000} w={96} h={270} r={24} fill="#7b8794" shadeK={0.22} />
        <RiverBody x0={2380} x1={4300} y={1190} depth={800} t={t} />
        <rect x={2380} y={1196} width={30} height={800} fill="#2d3e4e" opacity={0.6} />
        {/* lampu jalan */}
        <rect x={1555} y={560} width={12} height={340} rx={6} fill="#4a5664" /><rect x={1540} y={548} width={76} height={20} rx={10} fill="#4a5664" /><rect x={1590} y={564} width={36} height={14} rx={7} fill="#ffe9a8" />
        <Glow x={1608} y={600} r={170} color="#ffd98a" p={0.55} t={t} />
        {/* tetes */}
        <Glow x={px} y={py + afloat} r={RS * 3} color="#7fd8ff" p={0.25} t={t} />
        <Drop x={px} y={py + afloat} r={RS} flat={flat} sx={st.sx * (1 + 0.55 * imp)} sy={st.sy * (1 - 0.4 * imp)} rot={st.rot} tone={tone} refl={t < tL ? 0.85 : 0.5} />
        <Splash x={2480} y={1190} t={t} t0={tSplash} s={0.9} />
        <Splash x={430} y={roofY(430) - 6} t={t} t0={tL} s={0.55} color="#dff4ff" seed={3} />
        {t > tV + 0.5 && <ellipse cx={2500} cy={1192} rx={50 + Math.sin(t * 2) * 6} ry={9} fill="none" stroke="#cfeeff" strokeWidth={3} opacity={0.4} />}
      </Layer>
      <Rain t={t} n={vertical ? 16 : 36} area={rainArea(vertical)} speed={1800} len={[160, 300]} w={7} op={0.18} seed={2} blur />
      <Particles t={t} colors={["#fff", "#cfe6ff"]} n={20} speed={2} area={[0, 0, 1920, 1080]} size={[3, 8]} opacity={0.35} seed={5} />
    </Frame>
  );
};

/* ================= s03: instalasi pengolahan air minum dan pipa ke keran ================= */
const HX = 3150;
const PlantShot: React.FC = () => {
  const { t, word, vertical, dur } = useShot();
  const tF = tw(word("filters"), 1.1), tCl = tw(word("chlorinates"), 1.94), tTap = tw(word("tap"), 3.84);
  const wps: Wp[] = [
    [0, 100, 700], [0.3, 400, 700], [0.5, 470, 650], [0.7, 700, 720], [0.9, 840, 660], [1.05, 1090, 720], [1.2, 1270, 570], [1.42, 1480, 570],
    [tF + 0.5, 1650, 540], [tF + 0.85, 1690, 860], [tCl + 0.1, 1990, 780], [tCl + 0.4, 2030, 760], [tCl + 0.62, 2030, 1130, "in"],
    [tCl + 1.0, 2760, 1130, "io"], [tTap - 0.7, 3150, 1130], [tTap - 0.4, 3150, 740], [tTap - 0.2, 3150, 590], [tTap, 3230, 548],
    [tTap + 0.1, 3230, 612], [tTap + 0.55, 3230, 618], [tTap + 0.8, 3230, 770, "in"], [dur + 1, 3230, 776],
  ];
  const [px, py] = soft(t, wps), [cx0, cy0] = soft(t - 0.12, wps), st = stretch(t, wps);
  const swell = seg(t, tTap + 0.1, tTap + 0.55), RP = 30 * (1 + 0.16 * swell);
  const hanging = t > tTap + 0.1 && t < tTap + 0.8;
  const tone = lerpColor(MURKY, CLEAR, seg(t, tF + 0.3, tCl + 0.3));
  const z3 = keys(t, [0, 0.9, tCl + 0.6, tTap, dur], [3.4, 1.05, 1.0, 1.2, 1.25]);
  const cam = { x: cx0, y: cy0 * 0.6 + 250 - (vertical ? 170 / z3 : 0), z: z3 };
  const land = tTap + 0.8;
  return (
    <Frame>
      <Layer cam={cam} d={0}><Backdrop stops={["#1a2b3d", "#2c4660", "#46698a"]} t={t} particles={["#bfe8ff"]} n={22} speed={0.6} /></Layer>
      <Layer cam={cam} d={0.35} blur={3}><PlantBack x0={-1500} x1={4300} y0={-200} y1={1100} t={t} /></Layer>
      <Layer cam={cam} d={0.7} blur={6}>
        {Array.from({ length: 9 }, (_, i) => <FlatRect key={i} x={-1200 + i * 620} y={560 + (i % 3) * 40} w={440} h={600} r={40} fill="#35506c" shadeK={0.25} />)}
        <Fog y={500} h={500} color="#6f93b3" o={0.4} x0={-1500} x1={4300} />
      </Layer>
      <Layer cam={cam} d={1}>
        <Soil x0={-900} x1={3800} y={1040} h={800} seed={4} />
        <RiverBody x0={-1200} x1={-250} y={640} depth={420} t={t} c1="#6b8a74" c2="#2f4a3f" />
        <FlatRect x={-300} y={880} w={2540} h={160} r={10} fill="#5f7488" shadeK={0.2} />
        <Pipe d="M-300 700 L330 700" w={50} water={0.6} wc={MURKY} />
        {[[600, 700], [1000, 1060], [1480, 1540], [1840, 1900]].map(([a, b], i) => <Pipe key={i} d={`M${a} 760 L${b} 760`} w={34} water={0.5} wc={i < 2 ? MURKY : CLEAR} />)}
        <StirTank x={300} y={420} w={320} h={480} t={t} />
        <FlocTank x={680} y={420} w={320} h={480} t={t} />
        <SettleTank x={1060} y={420} w={420} h={480} t={t} />
        <FilterTank x={1540} y={420} w={300} h={480} t={t} />
        <ChlorTank x={1900} y={420} w={260} h={480} t={t} />
        <House riserX={HX} t={t} />
        <Pipe d={`M2030 880 L2030 1130 L2760 1130`} w={64} water={0.8} />
        <Pipe d={`M2760 1130 L${HX} 1130 L${HX} 760`} w={38} water={0.8} />
        <Pipe d="M2760 1130 Q2820 1130 2820 1230 L2820 1330" w={44} water={0.7} />
        <Pipe d="M2760 1130 Q2700 1130 2700 1230 L2700 1330" w={40} water={0.7} />
        <path d={`M${HX} 760 L${HX} 600 Q${HX} 530 ${HX + 65} 530 Q${HX + 80} 530 ${HX + 80} 548 L${HX + 80} 592`} stroke="#c9d3da" strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M${HX - 7} 740 L${HX - 7} 604`} stroke="#fff" strokeWidth={5} opacity={0.4} strokeLinecap="round" />
        <Glow x={px} y={py} r={RP * 3.2} color="#9fe8ff" p={0.45} t={t} />
        <Drop x={px} y={py} r={RP} sx={hanging ? 1 - 0.06 * swell : st.sx} sy={hanging ? 1 + 0.22 * swell : st.sy} rot={hanging ? 0 : st.rot} tone={tone} refl={mix(0.35, 0.8, seg(t, tCl, tTap))} />
        <Splash x={HX + 80} y={776} t={t} t0={land} s={0.6} />
      </Layer>
      <Particles t={t} colors={["#bfe8ff", "#fff"]} n={18} speed={-1.5} area={[0, 0, 1920, 1080]} size={[4, 30]} opacity={0.2} seed={9} />
    </Frame>
  );
};

/* ================= s04: dari keran ke IPAL, kembali ke sungai senja ================= */
const WwShot: React.FC = () => {
  const { t, word, vertical, dur } = useShot();
  const tR = tw(word("river"), 2.6);
  const wps: Wp[] = [
    [0, 130, 470], [0.2, 130, 540, "in"], [0.34, 130, 600, "in"], [0.6, 130, 1130, "in"], [0.9, 610, 1130, "io"], [1.08, 610, 800, "io"],
    [1.2, 640, 760], [1.32, 800, 740], [1.5, 1150, 790], [1.62, 1290, 730], [1.9, 1700, 650], [2.0, 1860, 720], [2.14, 1960, 780],
    [2.32, 1960, 1130, "in"], [tR + 0.0, 2430, 1130, "io"], [tR + 0.16, 2510, 1180, "out"], [tR + 0.34, 2560, 1248, "in"], [tR + 0.5, 2580, 1246], [dur + 1, 2620, 1246],
  ];
  const [px, py] = soft(t, wps), [cx0, cy0] = soft(t - 0.12, wps), st = stretch(t, wps);
  const f = seg(t, tR + 0.45, dur, Easing.inOut(Easing.cubic));
  const cam = { x: mix(cx0, vertical ? 2580 : 2300, f), y: mix(cy0 * 0.7 + 300, 1010, f), z: keys(t, [0, 0.6, 1.3, tR, tR + 0.5, dur], [1.7, 1.3, 1.0, 1.0, 0.95, 1.1]) };
  const tone = lerpColor(lerpColor(CLEAR, GREY, seg(t, 0, 0.4)), CLEAR, seg(t, 1.2, 2.3));
  const big = 1 + 2.0 * f, bob = t > tR + 0.5 ? Math.sin((t - tR) * 2.4) * 4 : 0;
  const reflP = mix(0.3, 0.95, seg(t, 2.0, dur));
  return (
    <Frame>
      <Layer cam={cam} d={0}><Backdrop stops={DUSK} t={t} glow="#f0b57a" glowAt={[960, 800]} glowR={1000} particles={["#e8f1ff"]} n={14} speed={0.4} /></Layer>
      <Layer cam={cam} d={0.2} blur={3}><Skyline x0={-1600} x1={4200} base={920} seed={3} fill="#5b6b88" h={[200, 560]} w={[90, 170]} /></Layer>
      <Layer cam={cam} d={0.5} blur={3}>
        <Skyline x0={-1400} x1={4200} base={1020} seed={7} fill="#44546f" win="#ffd98a" h={[220, 520]} w={[100, 190]} lit={0.3} />
        <Fog y={650} h={420} color="#9aa5bb" o={0.5} x0={-1400} x1={4200} />
      </Layer>
      <Layer cam={cam} d={1}>
        <Soil x0={-500} x1={2500} y={1040} h={1000} seed={5} />
        <FlatRect x={-500} y={1030} w={3000} h={18} r={6} fill="#56626f" shadeK={0.15} />
        <FlatRect x={-300} y={380} w={660} h={660} r={26} fill="#c9ab87" shadeK={0.2} side="right" />
        <rect x={-240} y={640} width={520} height={400} rx={22} fill="#a07f5a" /><rect x={-240} y={640} width={520} height={16} rx={8} fill="#c6a47a" />
        <rect x={20} y={596} width={240} height={44} rx={22} fill="#c9d3da" /><ellipse cx={130} cy={600} rx={26} ry={7} fill="#1f2a35" />
        <path d="M-60 420 L100 420 Q130 420 130 450 L130 462" stroke="#c9d3da" strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <FlatRect x={520} y={900} w={1760} h={140} r={10} fill="#5f7488" shadeK={0.2} />
        <Pipe d="M130 604 L130 1130 L610 1130 L610 880" w={40} water={0.5} wc={GREY} />
        <BarRack x={570} y={660} h={240} t={t} />
        {[[690, 780], [1180, 1260], [1760, 1840]].map(([a, b], i) => <Pipe key={i} d={`M${a} 770 L${b} 770`} w={34} water={0.5} wc={i === 2 ? CLEAR : GREY} />)}
        <SettleTank x={780} y={520} w={400} h={380} t={t} dirty="#8f9188" sludge="#5f5a48" />
        <AerTank x={1260} y={520} w={500} h={380} t={t} />
        <ChlorTank x={1840} y={520} w={240} h={380} t={t} />
        <Pipe d="M1960 880 L1960 1130 L2440 1130" w={56} water={0.8} wc={CLEAR} />
        <FlatRect x={2426} y={1040} w={90} h={230} r={22} fill="#7b8794" shadeK={0.22} />
        <RiverBody x0={2510} x1={4300} y={1250} depth={800} t={t} />
        <rect x={2430} y={1256} width={90} height={400} fill="#3f342c" />
        <Glow x={px} y={py + bob} r={30 * big * 3.2} color="#9fe8ff" p={0.4 + 0.3 * f} t={t} />
        <Drop x={px} y={py + bob} r={30 * big} sx={st.sx} sy={st.sy} rot={st.rot} tone={tone} refl={reflP} />
        <Splash x={2560} y={1250} t={t} t0={tR + 0.34} s={0.9} />
      </Layer>
      <Particles t={t} colors={["#fff", "#cfe6ff"]} n={16} speed={1.2} area={[0, 0, 1920, 1080]} size={[3, 8]} opacity={0.3} seed={11} />
    </Frame>
  );
};

export default defineShots({
  s01: [shot(FallShot, { labels: { "NOT A TEARDROP": [960, 160, "none"], "FLATTENS": [960, 265, "none"] }, labelBg: ["#c0462f", "#2f8fc4"] })],
  s02: [shot(RunoffShot, { from: [960, 540], drift: false, labelBg: ["#8a5a8f", "#c0462f", "#2f8fc4"] })],
  s03: [shot(PlantShot, { from: [960, 540], drift: false, labelBg: ["#b0842a", "#2c8c86", "#d8873a", "#2f8fc4"] })],
  s04: [shot(WwShot, { drift: false, labelBg: ["#2c8c86", "#2f8fc4"] })],
});
