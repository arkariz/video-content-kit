// Opsi thumbnail baru T01-004 bergaya ilustrasi siklus 005 (@r3/art, rendering datar bertingkat). Teks judul ditambahkan komposisi Thumbnail.
// Semua benda orisinal: tanpa aset, logo, tokoh, atau font GTA/Rockstar/console. "GTA VI" hanya teks.
// Master: area teks kiri atas (x < 1300, y < 640). Short tegak: yang terlihat x 656..1264, teks di y < 400.
import React from "react";
import { defineShots, Frame, R, SANS } from "@r3";
import { Shade, Sky, Tones, rr } from "@r3/art";
import { BLUE, CORAL, CREAM, Contact, DARK, Eyes, Face, GOLD, GREEN, Glow2, Hose, LR, STEEL, TEALB, WOOD, circ, line } from "../../005-qris-one-sticker/parts/kit";
import { Palm } from "../../005-qris-one-sticker/parts/warung";
import { Back } from "../../005-qris-one-sticker/parts/benda";

const SACK: Tones = ["#5a2838", "#94503a", "#cc7e42", "#f2b46a"];
const PURPLE: Tones = ["#2a1660", "#46288e", "#6a46bc", "#a888ee"];
const INK = "#241440";

const T: React.FC<{ x: number; y: number; s: number; c?: string; children: React.ReactNode }> = ({ x, y, s, c = "#fff", children }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={s} fill={c} stroke={INK} strokeWidth={s * 0.2} strokeLinejoin="round" paintOrder="stroke">{children}</text>
);
/** koin dolar emas */
const C: React.FC<{ x: number; y: number; r: number; rot?: number }> = ({ x, y, r, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <Shade d={circ(0, 0, r)} tones={GOLD} L={LR} s={[r * 0.06, r * 0.2, r * 0.12]} />
    <circle r={r * 0.72} fill="none" stroke={GOLD[1]} strokeWidth={r * 0.09} />
    <text y={r * 0.33} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={r * 0.95} fill={GOLD[0]}>$</text>
  </g>
);
const Pile: React.FC<{ x: number; y: number; n: number; w?: number }> = ({ x, y, n, w = 80 }) => (
  <g transform={`translate(${x} ${y})`}>
    <Contact x={0} y={w * 0.3} w={w * 1.3} />
    {Array.from({ length: n }, (_, i) => (
      <g key={i} transform={`translate(${(R(i + x, 3) - 0.5) * 12} ${-i * w * 0.26})`}>
        <Shade d={`M${-w} ${-w * 0.2}V0Q${-w} ${w * 0.32} 0 ${w * 0.32}Q${w} ${w * 0.32} ${w} 0V${-w * 0.2}Z`} tones={GOLD} L={LR} s={[3, 10, 5]} />
        <ellipse cy={-w * 0.2} rx={w} ry={w * 0.28} fill={GOLD[3]} /><ellipse cy={-w * 0.2} rx={w * 0.72} ry={w * 0.19} fill={GOLD[2]} />
      </g>
    ))}
  </g>
);
/** kantong koin berwajah; (x,y) = dasar, tinggi ~430*s */
const Bag: React.FC<{ x: number; y: number; s?: number; face?: Face; label?: string }> = ({ x, y, s = 1, face = "shock", label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={6} w={230} o={0.5} />
    {[[-62, -396, 40], [4, -420, 46], [66, -392, 38]].map(([a, b, r], i) => <C key={i} x={a} y={b} r={r} rot={(i - 1) * 18} />)}
    <Shade d="M-70 -350Q-110 -420 -96 -384Q-40 -352 0 -378Q44 -350 100 -388Q108 -420 72 -348C150 -306 236 -202 222 -102C208 -14 120 4 0 4C-120 4 -208 -14 -222 -102C-236 -202 -150 -306 -70 -350Z" tones={SACK} L={LR} s={[10, 34, 18]} />
    <Shade d={rr(-86, -360, 172, 40, 20)} tones={PURPLE} L={LR} s={[3, 10, 6]} />
    <Eyes x={8} y={-222} gap={54} r={22} t={1} face={face} />
    {label && <T x={0} y={-46} s={86} c="#fff4da">{label}</T>}
  </g>
);
/** kios toko konsol generik berwajah; tinggi ~380*s */
const Kiosk: React.FC<{ x: number; y: number; s?: number; face?: Face; label?: string }> = ({ x, y, s = 1, face = "happy", label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={6} w={200} />
    <Shade d={rr(-150, -320, 300, 320, 36, 20)} tones={BLUE} L={LR} s={[8, 26, 12]} />
    <path d={rr(-112, -258, 224, 150, 22)} fill="#101c4c" />
    <path d={rr(-98, -244, 196, 122, 16)} fill="#bfe8ff" />
    <Eyes x={0} y={-206} gap={42} r={15} t={1} face={face} />
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${-168 + i * 56} -344H${-112 + i * 56}V-296Q${-140 + i * 56} -266 ${-168 + i * 56} -296Z`} fill={i % 2 ? "#fff4da" : "#e4572e"} />)}
    <path d={rr(-176, -372, 352, 34, 17)} fill={CORAL[1]} />
    {label && <T x={0} y={-34} s={68} c="#ffd23f">{label}</T>}
  </g>
);
/** menara penerbit berwajah; tinggi ~ h*s */
const Tower: React.FC<{ x: number; y: number; s?: number; face?: Face; label?: string; h?: number }> = ({ x, y, s = 1, face = "happy", label, h = 470 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={6} w={180} />
    <Shade d={rr(-132, -h, 264, h, 30, 14)} tones={PURPLE} L={LR} s={[8, 28, 12]} />
    <path d={rr(-80, -h - 46, 160, 60, 20, 4)} fill={PURPLE[1]} />
    {line(`M0 ${-h - 46}V${-h - 104}`, PURPLE[3], 12)}<circle cy={-h - 112} r={15} fill="#ffd23f" />
    <Eyes x={4} y={-h + 96} gap={44} r={17} t={1} face={face} />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={rr(-92 + (i % 3) * 66, -h + 190 + Math.floor(i / 3) * 62, 50, 40, 8)} fill={R(i, 7) > 0.3 ? "#ffd98a" : "#7fb4ff"} />)}
    {label && <T x={0} y={-30} s={74} c="#7dffd0">{label}</T>}
  </g>
);
/** gerbang kartu berwajah */
const CardGuy: React.FC<{ x: number; y: number; s?: number; face?: Face; label?: string; rot?: number }> = ({ x, y, s = 1, face = "neutral", label, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Shade d={rr(-190, -125, 380, 250, 36)} tones={TEALB} L={LR} s={[8, 24, 12]}><rect x={-200} y={-88} width={400} height={46} fill="#0f2f48" /></Shade>
    <path d={rr(-152, -18, 66, 50, 10)} fill="#ffd23f" />
    <Eyes x={50} y={6} gap={36} r={15} t={1} face={face} />
    {label && <T x={0} y={104} s={66} c="#fff4da">{label}</T>}
  </g>
);
/** stik gim generik (tanpa logo) */
const Pad: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Shade d="M-120 -80H120C188 -80 212 -10 218 56C226 128 178 142 142 98L106 52H-106L-142 98C-178 142 -226 128 -218 56C-212 -10 -188 -80 -120 -80Z" tones={CREAM} L={LR} s={[7, 22, 10]} />
    <path d="M-132 -40h28v26h26v28h-26v26h-28v-26h-26v-28h26Z" fill={INK} />
    {[[112, -38, "#e4572e"], [146, -6, "#2596a0"], [112, 26, "#ffd23f"], [78, -6, "#3b6fd8"]].map(([a, b, c], i) => <circle key={i} cx={a as number} cy={b as number} r={17} fill={c as string} />)}
    <circle cx={-34} cy={22} r={22} fill={DARK[2]} /><circle cx={34} cy={22} r={22} fill={DARK[2]} />
  </g>
);
/** tangan selang meraih; dari (x0,y0) ke (x1,y1) */
const Reach: React.FC<{ x0: number; y0: number; x1: number; y1: number; tones: Tones; bend?: number }> = ({ x0, y0, x1, y1, tones, bend = -90 }) => {
  const a = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
  return (
    <g>
      <Hose d={`M${x0} ${y0}Q${(x0 + x1) / 2} ${(y0 + y1) / 2 + bend} ${x1} ${y1}`} tones={tones} w={62} />
      <g transform={`translate(${x1} ${y1}) rotate(${a})`}><Shade d="M-30 -50Q40 -70 74 -42Q90 -26 62 -20Q96 -4 74 16Q96 40 56 46Q30 66 -30 50Q-58 0 -30 -50Z" tones={tones} L={LR} s={[5, 16, 8]} /></g>
    </g>
  );
};
const Truck: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={8} w={330} o={0.5} />
    <Pile x={-210} y={-190} n={5} w={62} /><Pile x={-80} y={-190} n={8} w={62} /><Pile x={50} y={-190} n={6} w={62} />
    <Shade d={rr(-300, -190, 430, 140, 20)} tones={CORAL} L={LR} s={[7, 22, 10]} />
    <Shade d="M140 -270H236Q268 -270 284 -236L322 -160V-66Q322 -50 306 -50H140Z" tones={BLUE} L={LR} s={[7, 22, 10]} />
    <path d="M166 -244H232Q246 -244 254 -228L282 -168H166Z" fill="#cfefff" />
    <Eyes x={214} y={-210} gap={24} r={10} t={1} face="calm" />
    {[-210, -70, 220].map((a) => <g key={a}><circle cx={a} cy={-38} r={52} fill={INK} /><circle cx={a} cy={-38} r={22} fill={STEEL[3]} /></g>)}
  </g>
);
const Clock: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g transform={`translate(${x} ${y})`}>
    <Shade d={circ(0, 0, r)} tones={GOLD} L={LR} s={[6, 18, 10]} /><circle r={r * 0.8} fill="#fff4da" />
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={Math.sin(i * Math.PI / 6) * r * 0.65} cy={-Math.cos(i * Math.PI / 6) * r * 0.65} r={r * 0.04} fill={INK} />)}
    {line(`M0 0V${-r * 0.52}`, INK, r * 0.09)}{line(`M0 0L${r * 0.34} ${r * 0.2}`, "#e4572e", r * 0.11)}<circle r={r * 0.09} fill={INK} />
  </g>
);
const Rays: React.FC<{ cx: number; cy: number; o?: number; c?: string }> = ({ cx, cy, o = 0.1, c = "#ffd9a0" }) => (
  <g>{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${cx} ${cy}L${cx + Math.cos(i * 0.3927) * 1900} ${cy + Math.sin(i * 0.3927) * 1900}L${cx + Math.cos(i * 0.3927 + 0.15) * 1900} ${cy + Math.sin(i * 0.3927 + 0.15) * 1900}Z`} fill={c} opacity={o} />)}</g>
);
const Palms: React.FC<{ at: [number, number][]; c?: string; base?: number }> = ({ at, c = "#4a2670", base = 1010 }) => (
  <>{at.map(([x, h], i) => <Palm key={i} x={x} base={base} h={h} t={1} seed={i} c={c} />)}</>
);
const Ground: React.FC<{ y?: number; c?: string }> = ({ y = 960, c = "#37195c" }) => <path d={`M-600 ${y}Q600 ${y - 50} 1200 ${y - 10}Q1700 ${y + 20} 2500 ${y - 40}V1800H-600Z`} fill={c} />;
const Sparks: React.FC<{ at: [number, number, number][] }> = ({ at }) => (
  <>{at.map(([x, y, r], i) => <path key={i} d={`M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`} fill="#fff6c8" />)}</>
);

/* ============================== MASTER 16:9 ============================== */
/** M1: empat tangan meraih kantong $80 */
const M1: React.FC = () => (
  <Frame vignette={0.45}>
    <Sky t={2} /><Rays cx={1440} cy={800} /><Palms at={[[110, 360], [330, 240], [1860, 520]]} /><Ground />
    <Glow2 x={1440} y={760} r={640} c="#ffcf6a" o={0.75} />
    <Bag x={1440} y={1010} s={1.3} label="$80" />
    <Reach x0={2080} y0={420} x1={1740} y1={640} tones={BLUE} />
    <Reach x0={2080} y0={1000} x1={1760} y1={880} tones={PURPLE} bend={60} />
    <Reach x0={620} y0={1200} x1={1100} y1={900} tones={TEALB} />
    <Reach x0={200} y0={900} x1={1020} y1={720} tones={GREEN} bend={-140} />
    <Pad x={360} y={880} s={1.05} rot={-12} />
  </Frame>
);
/** M2: pembagian $80: toko $24, penerbit $56 */
const M2: React.FC = () => (
  <Frame vignette={0.45}>
    <Back id="m2" stops={["#0e1544", "#3a2c86", "#c0507c", "#ff9a66"]} /><Rays cx={1250} cy={950} o={0.08} /><Ground c="#241250" />
    <Glow2 x={1580} y={640} r={620} c="#7dffd0" o={0.4} />
    <Tower x={1620} y={1010} s={1.2} h={560} label="$56" />
    <Kiosk x={1040} y={1010} s={1.08} face="happy" label="$24" />
    <Pad x={360} y={870} s={1.2} rot={-14} />
    <C x={620} y={760} r={58} rot={-20} /><C x={750} y={920} r={44} rot={16} /><C x={1360} y={700} r={52} rot={10} />
  </Frame>
);
/** M3: gunung koin, empat pemain menunggu bagian */
const M3: React.FC = () => (
  <Frame vignette={0.45}>
    <Sky t={2} /><Palms at={[[1830, 600], [1690, 420], [90, 300]]} /><Ground />
    <Glow2 x={960} y={900} r={900} c="#ffd23f" o={0.55} />
    {[[300, 3], [450, 5], [600, 7], [760, 9], [930, 11], [1100, 13], [1270, 17], [1440, 21], [1610, 15]].map(([x, n], i) => <Pile key={i} x={x} y={1010 + (i % 2) * 26} n={n} w={92} />)}
    <Bag x={1705} y={668} s={0.78} face="happy" />
    <Pad x={150} y={900} s={0.9} rot={-16} />
    <Sparks at={[[1180, 620, 40], [1760, 520, 30], [520, 760, 28], [900, 700, 22]]} />
  </Frame>
);
/** M4: uang masih di jalan pada malam peluncuran */
const M4: React.FC = () => (
  <Frame vignette={0.5}>
    <Back id="m4" stops={["#060b2c", "#182a6c", "#5a3a8e", "#d8647c"]} stars={70} t={2} />
    <Palms at={[[80, 330], [1860, 430]]} c="#221650" base={930} />
    <path d="M-600 900H2500V1800H-600Z" fill="#1a1240" /><path d="M-600 940H2500V1030H-600Z" fill="#2e2260" />{line("M-100 986H2100", "#ffd23f", 10, 0.7)}
    <Clock x={1620} y={330} r={210} />
    <Glow2 x={1200} y={820} r={620} c="#ffb35a" o={0.5} />
    <Truck x={1250} y={1000} s={1.35} />
    {line("M420 820H640M360 890H680M470 960H620", "#cfe0ff", 14, 0.6)}
    <Pad x={240} y={760} s={0.8} rot={-14} />
  </Frame>
);

/* ============================== SHORT 1 (9:16) ============================== */
const S1A: React.FC = () => (
  <Frame vignette={0.45}>
    <Sky t={2} /><Rays cx={960} cy={760} /><Palms at={[[690, 300], [1245, 380]]} /><Ground />
    <Glow2 x={960} y={720} r={520} c="#ffcf6a" o={0.75} />
    <Bag x={830} y={720} s={0.68} label="$80" />
    {line("M930 750Q1050 765 1095 830", "#fff4da", 22)}{line("M1048 826L1098 836L1104 786", "#fff4da", 22)}
    <Tower x={1115} y={1010} s={0.5} h={360} />
    <Pile x={780} y={940} n={5} w={62} />
    <T x={910} y={1010} s={88} c="#7dffd0">$56</T>
  </Frame>
);
const S1B: React.FC = () => (
  <Frame vignette={0.5}>
    <Back id="s1b" stops={["#060b2c", "#1c2c70", "#6a3c90", "#e06c78"]} stars={60} t={2} />
    <Ground y={980} c="#1c1248" />
    <Glow2 x={960} y={700} r={520} c="#ffb35a" o={0.5} />
    <Clock x={960} y={570} r={150} />
    <Truck x={950} y={970} s={0.8} />
    <Pad x={770} y={430} s={0.42} rot={-18} /><C x={1170} y={430} r={50} rot={14} />
  </Frame>
);
const S1C: React.FC = () => (
  <Frame vignette={0.45}>
    <Back id="s1c" stops={["#241458", "#6a3484", "#f08a5c"]} /><Rays cx={960} cy={720} /><Ground />
    <Glow2 x={960} y={740} r={520} c="#7dffd0" o={0.4} />
    <Tower x={960} y={960} s={0.95} h={470} label="$56" />
    <Pile x={750} y={970} n={7} w={66} /><Pile x={1180} y={980} n={4} w={66} />
    <C x={750} y={520} r={52} rot={-18} /><C x={1180} y={600} r={42} rot={16} />
    
  </Frame>
);

/* ============================== SHORT 2 (9:16) ============================== */
const S2A: React.FC = () => (
  <Frame vignette={0.5}>
    <Back id="s2a" stops={["#0a1236", "#243a82", "#c8607c"]} stars={40} t={2} /><Rays cx={960} cy={720} o={0.08} /><Ground c="#1c2458" />
    <Glow2 x={960} y={700} r={520} c="#ffb35a" o={0.65} />
    <CardGuy x={960} y={640} s={1.25} face="shock" rot={-8} />
    <C x={780} y={930} r={92} rot={-14} /><C x={1130} y={940} r={92} rot={14} />
    <T x={960} y={965} s={104} c="#ffd23f">$2</T>
  </Frame>
);
const S2B: React.FC = () => (
  <Frame vignette={0.45}>
    <Sky t={2} /><Palms at={[[680, 330], [1250, 420]]} /><Ground />
    <Glow2 x={960} y={760} r={520} c="#ffcf6a" o={0.7} />
    <Kiosk x={990} y={880} s={1.12} face="calm" />
    <CardGuy x={860} y={900} s={0.66} rot={-10} label="FEE" />
    <Pad x={1130} y={990} s={0.46} rot={12} />
  </Frame>
);
const S2C: React.FC = () => (
  <Frame vignette={0.45}>
    <Back id="s2c" stops={["#10184a", "#46308c", "#d0587c", "#ffa06a"]} /><Rays cx={960} cy={760} o={0.09} /><Ground c="#2a1458" />
    <Glow2 x={960} y={700} r={540} c="#ffcf6a" o={0.6} />
    <Kiosk x={960} y={820} s={1.15} face="happy" />
    <Pile x={800} y={1030} n={6} w={70} /><Pile x={1125} y={1030} n={6} w={70} />
    <T x={960} y={1000} s={96} c="#ffd23f">$24</T>
    <Reach x0={560} y0={1080} x1={770} y1={760} tones={BLUE} /><Reach x0={1360} y0={1080} x1={1150} y1={760} tones={BLUE} />
  </Frame>
);

export default defineShots({ m1: [M1], m2: [M2], m3: [M3], m4: [M4], s1a: [S1A], s1b: [S1B], s1c: [S1C], s2a: [S2A], s2b: [S2B], s2c: [S2C] });
