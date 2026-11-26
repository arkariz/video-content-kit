// s04: "It started with a gift. In May 2000, ... donated seventy-two used subway cars from Tokyo's Mita Line."
import React from "react";
import { Easing } from "remotion";
import { Car, CAR_W, Catenary, Cloud, Frame, FONT, INK, Label, Layer, MiniCar, Palm, Person, Rails, Skyline, Sky, TOKYO, mix, pop, rnd, seg } from "./kit";

const TokyoTower: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke="#c4503c" strokeWidth={9} fill="none">
    <path d="M-110 0 C-50 -150 -24 -300 -8 -470 H8 C24 -300 50 -150 110 0" />
    <path d="M-62 -110H62M-38 -220H38M-22 -320H22M0 -470V-560M-62 -110L38 -220M62 -110L-38 -220M-38 -220L22 -320M38 -220L-22 -320" strokeWidth={5} />
    <rect x={-40} y={-232} width={80} height={24} fill="#f2ede4" stroke={INK} strokeWidth={3} />
  </g>
);

/** "It started with a gift." — gerbong Tokyo dibungkus pita raksasa. */
export const GiftShot: React.FC<{ t: number }> = ({ t }) => {
  const cam = { x: mix(1010, 940, seg(t, 0, 1.9)), y: mix(560, 520, seg(t, 0, 1.9)), z: mix(1.18, 1.02, seg(t, 0, 1.9, Easing.out(Easing.cubic))) };
  const wrap = seg(t, 0.35, 1.0), bow = pop(t, 0.85, 0.45), tag = pop(t, 1.15);
  return (
    <Frame>
      <Layer cam={cam} d={0}><Sky id="g-sky" top="#8fd0f0" bottom="#fbe9d2" /></Layer>
      <Layer cam={cam} d={0.25}>
        <Cloud x={220 + t * 14} y={120} s={1.2} /><Cloud x={1480 + t * 9} y={70} />
        <path d="M900 760 L1380 300 L1450 335 L1500 305 L1960 760 Z" fill="#9db4d2" /><path d="M1310 367 L1380 300 L1450 335 L1500 305 L1580 380 L1510 360 L1460 395 L1405 362 L1360 392 Z" fill="#fff" />
      </Layer>
      <Layer cam={cam} d={0.5}><Skyline base={760} seed="tk" fill="#aebdcf" /><TokyoTower x={340} y={760} /></Layer>
      <Layer cam={cam} d={1}>
        <rect x={-600} y={730} width={3120} height={600} fill="#c9bfae" />
        <Catenary wireY={290} baseY={780} />
        <Rails y={832} />
        <ellipse cx={980} cy={880} rx={520} ry={22} fill="#000" opacity={0.2} />
        <Car x={560} y={500} lv={TOKYO} head />
        {/* pita hadiah: menyapu mendatar lalu tegak */}
        <g stroke={INK} strokeWidth={5}>
          <rect x={470} y={688} width={(CAR_W + 130) * wrap} height={46} fill="#e0463e" />
          <rect x={952} y={454} width={58} height={346 * seg(t, 0.55, 1.05)} fill="#e0463e" />
          <g transform={`translate(981 ${mix(160, 462, seg(t, 0.75, 1.05, Easing.bounce))}) scale(${bow})`}>
            <path d="M0 0 C-60 -110 -210 -100 -170 -20 C-150 20 -60 20 0 0 Z" fill="#e0463e" />
            <path d="M0 0 C60 -110 210 -100 170 -20 C150 20 60 20 0 0 Z" fill="#e0463e" />
            <path d="M-10 6 L-90 90 L-55 88 L-48 118 L8 14 Z M10 6 L90 90 L55 88 L48 118 L-8 14 Z" fill="#c93a33" />
            <circle r={30} fill="#f0675c" />
          </g>
        </g>
        <g transform={`translate(1215 636) rotate(${Math.sin(t * 5) * 7 * Math.max(0, 1.8 - t)}) scale(${tag})`}>
          <path d="M0 0 V40" stroke={INK} strokeWidth={5} />
          <path d="M-110 40 H110 V160 H-110 Z" fill="#fff4cf" stroke={INK} strokeWidth={5} />
          <text y={122} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={58} fill="#b8322b">GIFT</text>
        </g>
        {Array.from({ length: 46 }, (_, i) => {
          const p = seg(t, 0.9 + rnd("cd" + i) * 0.35, 2.2 + rnd("ce" + i) * 0.3, Easing.out(Easing.quad));
          if (p <= 0) return null;
          const a = rnd("ca" + i) * 6.28, r = 160 + rnd("cr" + i) * 560;
          return <rect key={i} x={981 + Math.cos(a) * r * p} y={470 + Math.sin(a) * r * 0.6 * p + p * p * 240} width={18} height={10} fill={["#ffd23f", "#e0463e", "#2166b0", "#4f9d69"][i % 4]} transform={`rotate(${t * 300 + i * 37} ${981 + Math.cos(a) * r * p} ${470 + Math.sin(a) * r * 0.6 * p + p * p * 240})`} />;
        })}
        <Person x={330} y={1010} s={1.25} seed="giver1" t={t} pose="wave" />
        <Person x={1640} y={1000} s={1.2} seed="giver2" t={t} pose="stand" flip />
      </Layer>
    </Frame>
  );
};

const Hinomaru: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}><rect width={130} height={86} fill="#fff" stroke={INK} strokeWidth={4} /><circle cx={65} cy={43} r={24} fill="#d3362f" /></g>
);
const MerahPutih: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}><rect width={130} height={86} fill="#fff" stroke={INK} strokeWidth={4} /><rect x={2} y={2} width={126} height={41} fill="#d3362f" /></g>
);

/** "In May 2000, Japan's aid agency and the Tokyo city government donated" — serah terima. t = detik scene. */
export const DonorShot: React.FC<{ t: number }> = ({ t }) => {
  const push = seg(t, 1.8, 6.6, Easing.inOut(Easing.sin));
  const cam = { x: mix(900, 1000, push), y: mix(520, 560, push), z: mix(1.0, 1.12, push) };
  const cal = pop(t, 1.9), flip = seg(t, 1.95, 2.55);
  const jica = seg(t, 2.55, 3.15), gov = seg(t, 4.05, 4.65);
  const give = seg(t, 5.9, 6.5);
  const kx = mix(860, 1330, give), ky = 880 - Math.sin(give * Math.PI) * 300;
  return (
    <Frame>
      <Layer cam={cam} d={0}><Sky id="d-sky" top="#a9d9f2" bottom="#f7ecd9" /></Layer>
      <Layer cam={cam} d={0.35}><Skyline base={700} seed="dn" fill="#b9c6d6" h={[120, 380]} /></Layer>
      <Layer cam={cam} d={0.7}>
        {/* depo dengan gerbong yang diserahkan */}
        <rect x={-300} y={640} width={2520} height={120} fill="#b4ab9d" />
        <g transform="translate(570 330) scale(0.9)"><Car x={0} y={0} lv={TOKYO} head /></g>
      </Layer>
      <Layer cam={cam} d={1}>
        <rect x={-600} y={752} width={3120} height={600} fill="#d8cbb2" />
        {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${-600 + i * 110} 752 L${-960 + i * 150} 1200`} stroke="#bfb095" strokeWidth={4} />)}
        <g transform={`translate(${mix(-420, 0, jica)} 0)`}>
          <Hinomaru x={150} y={520} /><path d="M150 520 V985" stroke={INK} strokeWidth={9} />
          <Person x={420} y={985} s={1.65} seed="jica" shirt="#2f3e5c" t={t} pose={jica < 1 ? "walk" : "stand"} mood="happy" />
          <Label x={420} y={612} text="JICA" size={50} p={pop(t, 3.0)} />
        </g>
        <g transform={`translate(${mix(-900, 0, gov)} 0)`}>
          <Person x={700} y={1010} s={1.65} seed="govtokyo" shirt="#4a4a58" t={t} pose={gov < 1 ? "walk" : "stand"} mood="happy" />
          <Label x={720} y={650} text="TOKYO GOVT" size={42} p={pop(t, 4.5)} />
        </g>
        <MerahPutih x={1650} y={520} /><path d="M1650 520 V990" stroke={INK} strokeWidth={9} />
        <Person x={1480} y={995} s={1.7} seed="penerima" shirt="#2e7d6b" t={t} pose={give >= 1 ? "wave" : "stand"} flip mood={give >= 1 ? "happy" : "calm"} />
        <Label x={1490} y={632} text="JAKARTA" size={46} p={pop(t, 3.4)} />
        {/* kunci berpita berpindah tangan */}
        {t > 5.4 && <g transform={`translate(${kx} ${ky}) scale(${pop(t, 5.4)}) rotate(${give * 360})`}>
          <circle cx={-40} r={30} fill="none" stroke={INK} strokeWidth={26} /><circle cx={-40} r={30} fill="none" stroke="#f4c542" strokeWidth={16} />
          <path d="M-10 0 H70 M46 0 V26 M66 0 V20" stroke={INK} strokeWidth={24} strokeLinecap="round" /><path d="M-10 0 H70 M46 0 V26 M66 0 V20" stroke="#f4c542" strokeWidth={13} strokeLinecap="round" />
          <path d="M-40 -34 l-34 -30 l8 36 Z M-40 -34 l34 -30 l-8 36 Z" fill="#e0463e" stroke={INK} strokeWidth={4} />
        </g>}
      </Layer>
      <g transform={`translate(1650 210) scale(${cal})`}>
        <rect x={-160} y={-130} width={320} height={290} rx={22} fill="#fffaf0" stroke={INK} strokeWidth={6} />
        <path d="M-160 -50 V-108 Q-160 -130 -138 -130 H138 Q160 -130 160 -108 V-50 Z" fill="#d3463c" stroke={INK} strokeWidth={6} />
        <text y={-68} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill="#fff">MAY</text>
        <text y={92} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={112} fill={INK}>2000</text>
        {[-90, 90].map((x) => <rect key={x} x={x - 10} y={-158} width={20} height={54} rx={9} fill="#8d8f99" stroke={INK} strokeWidth={5} />)}
        {flip < 1 && <rect x={-154} y={-48} width={308} height={202 * (1 - flip)} fill="#efe7d6" stroke={INK} strokeWidth={4} />}
      </g>
      <Palm x={1850} y={1130} s={1.5} t={t} />
    </Frame>
  );
};

const COLS = 9, ROWS = 8; // 72 gerbong

/** "seventy-two used subway cars from Tokyo's Mita Line." — 72 gerbong muncul satu per satu di depo. */
export const DepotShot: React.FC<{ t: number }> = ({ t }) => {
  const fill = seg(t, 6.4, 8.2, Easing.inOut(Easing.sin));
  const shown = Math.round(fill * 72);
  const toSign = seg(t, 8.55, 9.5);
  const cam = { x: mix(960, 960, toSign), y: mix(mix(660, 540, fill), 500, toSign), z: mix(mix(1.3, 1.0, fill), 1.08, toSign) };
  return (
    <Frame>
      <Layer cam={cam} d={0}><Sky id="p-sky" top="#9fd2ef" bottom="#f4ead8" /></Layer>
      <Layer cam={cam} d={0.4}><Skyline base={350} seed="dp" fill="#b3c1d3" h={[60, 220]} /><TokyoTower x={1760} y={350} /></Layer>
      <Layer cam={cam} d={1}>
        <rect x={-600} y={335} width={3120} height={1100} fill="#bdb3a2" />
        {/* mulut terowongan subway */}
        <g transform="translate(960 352)">
          <path d="M-330 30 V-90 Q-330 -190 -220 -190 H220 Q330 -190 330 -90 V30 Z" fill="#8f8a84" stroke={INK} strokeWidth={6} />
          <path d="M-250 30 V-70 Q-250 -130 -180 -130 H180 Q250 -130 250 -70 V30 Z" fill="#201c28" stroke={INK} strokeWidth={5} />
        </g>
        {Array.from({ length: ROWS }, (_, r) => {
          const k = r / (ROWS - 1), y = mix(425, 985, Math.pow(k, 1.15)), s = mix(0.52, 1.12, k);
          return (<g key={r}>
            <path d={`M-300 ${y - 2} H2220`} stroke="#8d8171" strokeWidth={5 * s} />
            {Array.from({ length: COLS }, (_, c) => {
              const i = r * COLS + c;
              if (i >= shown) return null;
              const born = 6.4 + (i / 72) * 1.8;
              const x = 960 + (c - 4) * 168 * s;
              return <MiniCar key={c} x={x} y={y - (1 - seg(t, born - 0.12, born + 0.18, Easing.out(Easing.back(2.5)))) * 60} s={s} />;
            })}
          </g>);
        })}
        <g transform={`translate(960 ${mix(-60, 205, seg(t, 8.6, 9.15, Easing.out(Easing.back(1.4))))})`}>
          <rect x={-290} y={-72} width={580} height={144} rx={20} fill="#fff" stroke={INK} strokeWidth={6} />
          <circle cx={-205} r={52} fill="#fff" stroke="#2166b0" strokeWidth={26} />
          <text x={-205} y={19} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill={INK}>I</text>
          <text x={70} y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill={INK}>MITA LINE</text>
        </g>
      </Layer>
      <g transform={`translate(230 190) scale(${pop(t, 6.4)})`}>
        <rect x={-170} y={-120} width={340} height={230} rx={30} fill="#fff6de" stroke={INK} strokeWidth={6} />
        <text y={44} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={150} fill="#d3463c">{shown}</text>
        <text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill={INK}>USED CARS</text>
      </g>
    </Frame>
  );
};
