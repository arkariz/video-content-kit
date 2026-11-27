// Opsi thumbnail baru T02-002: rendering datar bertingkat (STYLE.md, T1-T13), palet dan pemeran T02. Teks judul ditambahkan komposisi Thumbnail.
// Still di produksi/acuan-visual/eksternal hanya acuan teknik (lapisan, warna jenuh, cahaya sebagai bentuk, bingkai latar depan); komposisi dan aset orisinal.
// Semua benda orisinal: tanpa aset, logo, tokoh, atau font GTA/Rockstar/console. "GTA VI" hanya teks.
// Master: teks kiri atas (x < 1300, y < 600). Short tegak: yang terlihat x 656..1264, teks di y < 400.
import React from "react";
import { defineShots, Frame, R, SANS } from "@r3";
import { Shade, Tones, rr, Cloud, FarCity, Block, Tree } from "@r3/art";
import { Komo, Kelapa } from "@r3/cast/T02";

type V2 = [number, number];
const LR: V2 = [0.8, -0.6];
const INK = "#241440";
const GOLD: Tones = ["#a85a28", "#e09a2c", "#ffd23f", "#fff0a0"];
const PURPLE: Tones = ["#2a1660", "#46288e", "#7450c8", "#b090f0"];
const TEAL: Tones = ["#133f58", "#1b6678", "#2c8c86", "#6fd8cc"];
const CORAL: Tones = ["#7a2440", "#b83a34", "#e2573d", "#ff9a68"];
const CREAM: Tones = ["#c9a98c", "#ead3ad", "#fff6dc", "#fffdf4"];
const BLUE: Tones = ["#1c2870", "#2745a8", "#3b6fd8", "#7fb4ff"];

const line = (d: string, c: string, w: number, o = 1) => <path d={d} stroke={c} strokeWidth={w} opacity={o} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
const circ = (x: number, y: number, r: number) => `M${x - r} ${y}A${r} ${r} 0 1 0 ${x + r} ${y}A${r} ${r} 0 1 0 ${x - r} ${y}Z`;
const T: React.FC<{ x: number; y: number; s: number; c?: string; children: React.ReactNode }> = ({ x, y, s, c = "#fff", children }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={s} fill={c} stroke={INK} strokeWidth={s * 0.2} strokeLinejoin="round" paintOrder="stroke">{children}</text>
);
const Contact: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 0.38 }) => <ellipse cx={x} cy={y} rx={w} ry={w * 0.13} fill="#1a0c34" opacity={o} />;
const Glow: React.FC<{ x: number; y: number; r: number; c: string; o?: number }> = ({ x, y, r, c, o = 0.6 }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  return (<g><defs><radialGradient id={`g${id}`}><stop offset={0} stopColor={c} stopOpacity={o} /><stop offset={0.4} stopColor={c} stopOpacity={o * 0.4} /><stop offset={1} stopColor={c} stopOpacity={0} /></radialGradient></defs><circle cx={x} cy={y} r={r} fill={`url(#g${id})`} /></g>);
};
const Back: React.FC<{ id: string; stops: string[]; stars?: number }> = ({ id, stops, stars = 0 }) => (
  <g><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{stops.map((c, i) => <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />)}</linearGradient></defs><rect x={-600} y={-700} width={3200} height={2600} fill={`url(#${id})`} />
    {Array.from({ length: stars }, (_, i) => <circle key={i} cx={R(i, 2) * 2400 - 240} cy={R(i, 3) * 500 - 80} r={1.5 + R(i, 4) * 2.5} fill="#cfe0ff" opacity={0.5} />)}</g>
);
const Rays: React.FC<{ cx: number; cy: number; o?: number; c?: string }> = ({ cx, cy, o = 0.1, c = "#ffd9a0" }) => (
  <g>{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${cx} ${cy}L${cx + Math.cos(i * 0.4488) * 1900} ${cy + Math.sin(i * 0.4488) * 1900}L${cx + Math.cos(i * 0.4488 + 0.13) * 1900} ${cy + Math.sin(i * 0.4488 + 0.13) * 1900}Z`} fill={c} opacity={o} />)}</g>
);
/** kilau empat sudut (T8) */
const Sparks: React.FC<{ at: [number, number, number][]; c?: string }> = ({ at, c = "#fff6c8" }) => (
  <>{at.map(([x, y, r], i) => <g key={i}><circle cx={x} cy={y} r={r * 0.9} fill={c} opacity={0.16} /><path d={`M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`} fill={c} /></g>)}</>
);
const Stars: React.FC<{ n: number; seed: number; h?: number }> = ({ n, seed, h = 560 }) => (
  <g>{Array.from({ length: n }, (_, i) => <circle key={i} cx={R(seed + i, 2) * 2300 - 190} cy={R(seed + i, 3) * h - 60} r={2 + R(seed + i, 4) * 4} fill={["#cfe0ff", "#ff9ad0", "#8ff0ff", "#fff0a0"][i % 4]} opacity={0.75} />)}</g>
);
/** daun lebar latar depan (T6); (x,y) = pangkal */
const Leaf: React.FC<{ x: number; y: number; rot: number; s?: number; c?: string; v?: string }> = ({ x, y, rot, s = 1, c = "#1c0c46", v = "#7a2c8c" }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M0 0C40 -150 220 -210 420 -130C300 -110 330 -70 250 -50C330 -30 300 10 380 20C240 110 60 90 0 0Z" fill={c} />
    {line("M10 -4C110 -70 230 -100 390 -122", v, 11)}{line("M110 -62L170 -120M190 -86L260 -64", v, 7, 0.8)}
  </g>
);
const Bush: React.FC<{ x: number; y: number; s?: number; c?: string; hi?: string }> = ({ x, y, s = 1, c = "#241060", hi = "#c8447c" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {([[-130, 0, 90], [-40, -50, 110], [80, -24, 96], [170, 16, 66]] as [number, number, number][]).map(([a, b, r], i) => <g key={i}><circle cx={a} cy={b} r={r} fill={c} />{line(`M${a - r * 0.1} ${b - r * 0.82}Q${a + r * 0.62} ${b - r * 0.68} ${a + r * 0.82} ${b - r * 0.06}`, hi, 10)}</g>)}
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={R(i, 11) * 300 - 150} cy={R(i, 12) * 90 - 40} r={5 + R(i, 13) * 6} fill={hi} opacity={0.5} />)}
  </g>
);
/** deret kampung kota berwarna: blok bercahaya dan pohon lobus, mengisi lapisan tengah */
const Town: React.FC<{ base: number }> = ({ base }) => {
  const cols: Tones[] = [["#123a52", "#176a86", "#22a8b4", "#8ff4e0"], ["#5a1c52", "#a42c62", "#e8546c", "#ffb084"], ["#26146a", "#3c28a0", "#5c48d0", "#a898ff"], ["#7a3420", "#c86428", "#ffa038", "#ffe08a"]];
  return (
    <g>
      {Array.from({ length: 17 }, (_, i) => {
        const x = -160 + i * 138 + R(i, 51) * 36, w = 88 + R(i, 52) * 60, h = 70 + R(i, 53) * 130;
        return <g key={i}><Block x={x} base={base} w={w} h={h} side={26} seed={i + 60} t={2} tones={cols[i % 4]} top={(["flat", "dome", "step"] as const)[(i * 7) % 3]} balcony={false} />
          {i % 3 === 1 && <Tree x={x + w + 22} base={base + 8} s={0.62} seed={i} t={2} tones={["#0c4a52", "#12806c", "#2cc480", "#d8f870"]} />}</g>;
      })}
    </g>
  );
};
/** senja Jakarta: langit jenuh, matahari, awan lobus, dua lapis kota, pohon, tanah melengkung */
const Dusk: React.FC<{ id: string; sun: V2; ground?: number; stops?: string[]; city?: boolean }> = ({ id, sun, ground = 930, stops = ["#1c0e58", "#4a1c8c", "#a42c94", "#ee4c70", "#ff8a48", "#ffd060"], city = true }) => (
  <g>
    <Back id={id} stops={stops} /><Rays cx={sun[0]} cy={sun[1]} o={0.09} />
    <Stars n={34} seed={5} h={380} />
    <Glow x={sun[0]} y={sun[1]} r={720} c="#ffe27a" o={0.85} /><circle cx={sun[0]} cy={sun[1]} r={150} fill="#ffe88a" opacity={0.9} /><circle cx={sun[0]} cy={sun[1]} r={112} fill="#fff6c4" />
    <Cloud x={sun[0] - 620} y={ground - 420} s={1.1} seed={2} base="#7a2c9c" lit="#ff8a60" shadow="#4c1c80" />
    <Cloud x={sun[0] + 420} y={ground - 540} s={0.8} seed={7} base="#6a289c" lit="#ff7a70" shadow="#401a7a" />
    {city && <><FarCity x0={-300} x1={2200} base={ground - 40} seed={4} fill="#8a2c84" hi="#c44c8c" t={2} lights={0.05} />
      <Town base={ground - 6} /></>}
    <path d={`M-600 ${ground}Q480 ${ground - 60} 1100 ${ground - 8}T2500 ${ground - 40}V1800H-600Z`} fill="#4a1a74" />
    <path d={`M-600 ${ground + 70}Q600 ${ground + 20} 1300 ${ground + 80}T2500 ${ground + 50}V1800H-600Z`} fill="#2a0e56" />
    {line(`M-100 ${ground - 22}Q480 ${ground - 52} 900 ${ground - 28}M1300 ${ground + 2}Q1640 ${ground + 2} 1900 ${ground - 26}`, "#ff8a70", 9, 0.9)}
  </g>
);
/** malam indigo: nebula hangat, bintang, kota menyala */
const Night: React.FC<{ id: string; glow: V2; ground?: number }> = ({ id, glow, ground = 940 }) => (
  <g>
    <Back id={id} stops={["#08062c", "#1a1064", "#3a1c90", "#8a2ca0", "#e0508c"]} /><Stars n={110} seed={21} h={720} />
    <Glow x={glow[0]} y={glow[1]} r={760} c="#ff7ab0" o={0.6} /><Rays cx={glow[0]} cy={glow[1]} o={0.06} c="#ffb0e0" />
    <Cloud x={glow[0] - 560} y={ground - 360} s={0.9} seed={4} base="#3a2090" lit="#d048a8" shadow="#241468" />
    <FarCity x0={-300} x1={2200} base={ground - 30} seed={12} fill="#3c1c80" hi="#8c38a8" t={2} lights={0.14} />
    <Town base={ground - 6} />
    <path d={`M-600 ${ground}Q480 ${ground - 50} 1100 ${ground - 8}T2500 ${ground - 36}V1800H-600Z`} fill="#241068" />
    <path d={`M-600 ${ground + 80}Q600 ${ground + 30} 1300 ${ground + 80}T2500 ${ground + 56}V1800H-600Z`} fill="#140842" />
    {line(`M-100 ${ground - 20}Q480 ${ground - 46} 900 ${ground - 26}M1300 ${ground + 2}Q1640 ${ground} 1900 ${ground - 22}`, "#5ce0ff", 8, 0.8)}
  </g>
);
/** kabel bercahaya dengan butir data (T13) */
const Cable: React.FC<{ d: string; w: number; c?: string; hi?: string; dash?: string }> = ({ d, w, c = "#1c8cc0", hi = "#8ff4ff", dash = "4 70" }) => (
  <g>{line(d, c, w * 2.1, 0.22)}{line(d, "#0c1450", w)}{line(d, c, w * 0.68)}<g transform={`translate(0 ${-w * 0.16})`}>{line(d, hi, w * 0.13)}</g>
    <path d={d} fill="none" stroke="#fff6c4" strokeWidth={w * 0.3} strokeLinecap="round" strokeDasharray={dash} /></g>
);
/** teman di Singapura: badan kapsul ungu, headphone, senang. (x,y) = dasar kaki; tinggi ~360*s */
const Friend: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={4} w={140} />
    {line("M-44 -50Q-54 -22 -60 -6M44 -50Q54 -22 60 -6", PURPLE[1], 28)}
    {line("M-104 -150Q-170 -190 -168 -270", PURPLE[2], 30)}{line("M104 -140Q168 -150 176 -230", PURPLE[2], 30)}
    <Shade d="M0 -350C78 -350 122 -286 122 -190C122 -90 76 -30 0 -30C-76 -30 -122 -90 -122 -190C-122 -286 -78 -350 0 -350Z" tones={PURPLE} L={LR} s={[8, 26, 14]} />
    {line("M-124 -232C-132 -400 132 -400 124 -232", INK, 22)}
    <Shade d={rr(-154, -262, 54, 88, 24)} tones={GOLD} L={LR} s={[3, 10, 6]} /><Shade d={rr(100, -262, 54, 88, 24)} tones={GOLD} L={LR} s={[3, 10, 6]} />
    {line("M-62 -226Q-44 -252 -26 -226M26 -226Q44 -252 62 -226", INK, 13)}
    <path d="M-48 -190Q0 -112 48 -190Z" fill={INK} />
    <circle cx={-78} cy={-180} r={17} fill="#ff8fb0" opacity={0.75} /><circle cx={78} cy={-180} r={17} fill="#ff8fb0" opacity={0.75} />
  </g>
);
/** paket unduhan raksasa berwajah panah; (x,y) = tengah dasar, ~360*s */
const Box: React.FC<{ x: number; y: number; s?: number; rot?: number; label?: string }> = ({ x, y, s = 1, rot = 0, label = "212 GB" }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Contact x={0} y={8} w={240} o={0.45} />
    <Shade d={rr(-200, -340, 400, 340, 56)} tones={BLUE} L={LR} s={[10, 34, 18]} />
    <path d="M-32 -302H32V-224H78L0 -146L-78 -224H-32Z" fill="#fff6dc" stroke={INK} strokeWidth={14} strokeLinejoin="round" />
    <T x={0} y={-44} s={86} c="#ffd23f">{label}</T>
  </g>
);
/** bilah unduh */
const Bar: React.FC<{ x: number; y: number; w: number; h?: number; v: number; c?: string }> = ({ x, y, w, h = 70, v, c = "#ffb03a" }) => (
  <g transform={`translate(${x - w / 2} ${y})`}>
    <path d={rr(0, 0, w, h, h / 2)} fill="#150b36" stroke="#fff6dc" strokeWidth={10} />
    <path d={rr(12, 12, Math.max(h - 24, (w - 24) * v), h - 24, (h - 24) / 2)} fill={c} />
  </g>
);
const Phone: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Shade d={rr(-110, -210, 220, 420, 48)} tones={TEAL} L={LR} s={[8, 24, 12]} />
    <path d={rr(-86, -172, 172, 334, 24)} fill="#d8f8ff" />
    {line("M-40 -112Q-20 -132 0 -112M20 -112Q40 -132 60 -112", INK, 11)}
    <path d="M-34 -70Q10 -4 54 -70Z" fill={INK} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={rr(-66 + i * 36, 120 - (i + 1) * 36, 26, (i + 1) * 36, 8)} fill={CORAL[2]} />)}
  </g>
);
const Router: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={8} w={200} />
    {line("M-110 -120L-150 -270M110 -120L150 -270", CREAM[1], 22)}<circle cx={-150} cy={-270} r={20} fill={CORAL[2]} /><circle cx={150} cy={-270} r={20} fill={CORAL[2]} />
    <Shade d={rr(-180, -150, 360, 150, 50)} tones={CREAM} L={LR} s={[8, 24, 12]} />
    <circle cx={-64} cy={-92} r={22} fill={INK} /><circle cx={64} cy={-92} r={22} fill={INK} />
    <ellipse cx={0} cy={-44} rx={20} ry={24} fill={INK} />
    {line("M-96 -126L-40 -118M96 -126L40 -118", INK, 9)}
    <path d="M196 -210Q236 -150 196 -128Q156 -150 196 -210Z" fill="#8fdcff" />
  </g>
);
const Tower: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {line("M-110 0L0 -460L110 0M-82 -116H82M-52 -240H52M-82 -116L52 -240M82 -116L-52 -240", "#fff6dc", 18)}
    <circle cy={-470} r={28} fill={CORAL[2]} />
    {[80, 140].map((r) => <g key={r}>{line(`M${-r} ${-470 - r * 0.7}Q${-r * 1.5} -470 ${-r} ${-470 + r * 0.7}M${r} ${-470 - r * 0.7}Q${r * 1.5} -470 ${r} ${-470 + r * 0.7}`, "#8fdcff", 16)}</g>)}
  </g>
);

/* ============================== MASTER 16:9 ============================== */
/** M1: layar terbelah, teman selesai, Komo menunggu */
const M1: React.FC = () => (
  <Frame vignette={0.5}>
    <Dusk id="m1" sun={[330, 790]} />
    <path d="M910 -100H2400V1200H690Z" fill="#12094a" opacity={0.84} />
    <g clipPath="url(#m1r)"><clipPath id="m1r"><path d="M910 -100H2400V1200H690Z" /></clipPath><Stars n={80} seed={40} h={900} /><Glow x={1620} y={820} r={560} c="#4c6cff" o={0.6} /><FarCity x0={700} x1={2200} base={930} seed={30} fill="#2a1a78" hi="#5c38a8" t={2} lights={0.16} /><Town base={924} /><path d="M600 925Q1300 870 2500 930V1800H600Z" fill="#1c0c58" /></g>
    {line("M910 -100L690 1200", "#ff7ab8", 34, 0.35)}{line("M910 -100L690 1200", "#fff6dc", 14)}
    <Friend x={330} y={990} s={1.15} />
    <Bar x={630} y={940} w={300} v={1} c="#5fe08a" />
    <Komo x={1600} y={990} s={2.15} t={1} expr="shock" />
    <Bar x={1120} y={940} w={430} v={0.11} />
    <Sparks at={[[570, 700, 34], [110, 720, 24], [1380, 640, 22], [1840, 560, 30]]} />
    <Leaf x={-60} y={1100} rot={-28} /><Leaf x={1990} y={1080} rot={208} s={0.9} />
  </Frame>
);
/** M2: Komo lesu menunggu di depan paket raksasa */
const M2: React.FC = () => (
  <Frame vignette={0.5}>
    <Night id="m2" glow={[1480, 740]} />
    <Cable d="M-100 1050C300 1010 500 1100 900 1060S1300 960 1440 940" w={46} dash="4 190" />
    <Box x={1490} y={1000} s={1.35} rot={4} />
    <Komo x={900} y={1010} s={1.9} t={1} expr="tired" look={1} />
    <Bar x={330} y={870} w={480} h={96} v={0.11} />
    <Sparks at={[[1170, 520, 30], [1850, 640, 38], [640, 700, 20]]} />
    <Bush x={60} y={1110} s={1.2} /><Bush x={1900} y={1130} s={0.9} />
  </Frame>
);
/** M3: laut dan kabel bawah laut dicoret */
const M3: React.FC = () => (
  <Frame vignette={0.5}>
    <Dusk id="m3" sun={[1500, 600]} ground={790} city={false} />
    <FarCity x0={1080} x1={2100} base={742} seed={14} fill="#8a2c84" hi="#c44c8c" t={2} lights={0.06} />
    <path d="M-600 735Q0 690 480 735T1440 735T2500 735V1800H-600Z" fill="#1fa8c8" />
    <path d="M-600 810Q-60 765 480 810T1560 810T2500 810V1800H-600Z" fill="#136cb0" />
    <path d="M-600 920Q60 875 600 920T1680 920T2500 920V1800H-600Z" fill="#14307c" />
    {Array.from({ length: 30 }, (_, i) => <g key={i}>{line(`M${R(i, 31) * 1900} ${760 + R(i, 32) * 300}h${30 + R(i, 33) * 70}`, "#a8f4ff", 7, 0.7)}</g>)}
    <Cable d="M-100 1010C300 880 640 1040 960 990S1360 880 1520 780" w={54} c="#ffb02c" hi="#fff0a0" />
    <path d="M1160 760Q1250 690 1420 712Q1600 660 1760 718Q1900 720 1900 770Q1720 830 1520 806Q1300 840 1160 760Z" fill="#7a2c6c" />
    <path d="M1180 748Q1260 690 1420 708Q1600 660 1756 712Q1880 716 1878 748Q1700 794 1520 778Q1330 806 1180 748Z" fill="#3cc47c" />
    <Bush x={1270} y={720} s={0.42} c="#14806c" hi="#b8f070" /><Kelapa x={1800} y={740} s={1.2} t={1} />
    <Komo x={1500} y={755} s={1.7} t={1} expr="shock" pose="shrug" />
    {line("M330 760L580 1010M580 760L330 1010", INK, 84)}{line("M330 760L580 1010M580 760L330 1010", "#ff4a58", 50)}{line("M342 758L440 856", "#ffb0a0", 12)}
    <Leaf x={1990} y={1100} rot={206} />
  </Frame>
);
/** M4: paket 212 GB tersangkut di mulut pipa kecil menuju rumah */
const M4: React.FC = () => (
  <Frame vignette={0.5}>
    <Dusk id="m4" sun={[1690, 620]} />
    <Cable d="M740 880C1000 870 1060 990 1270 960S1500 850 1620 880" w={96} c="#2cb0a4" hi="#b8fff0" dash="6 120" />
    <Box x={420} y={1000} s={1.15} rot={12} />
    <Shade d={rr(695, 795, 104, 180, 30)} tones={TEAL} L={LR} s={[5, 16, 8]} />{[825, 885, 945].map((y) => <circle key={y} cx={747} cy={y} r={11} fill="#fff6dc" />)}
    <g transform="translate(1690 990)"><Contact x={0} y={6} w={190} />
      <Shade d={rr(-150, -230, 300, 230, 20)} tones={CREAM} L={LR} s={[8, 24, 12]} /><Shade d="M-196 -210L0 -380L196 -210Z" tones={CORAL} L={LR} s={[6, 20, 10]} />{line("M-150 -226L-6 -330M-96 -224L0 -292", "#ff9a68", 9)}</g>
    <Komo x={1690} y={985} s={0.95} t={1} expr="sad" />
    <Sparks at={[[830, 750, 42], [880, 1030, 28], [660, 640, 26], [250, 640, 22]]} />
    <Bush x={30} y={1110} s={1.1} /><Leaf x={1990} y={1110} rot={206} s={0.8} />
  </Frame>
);

/* ============================== SHORT B1 (9:16) ============================== */
const S1A: React.FC = () => (
  <Frame vignette={0.5}>
    <Dusk id="s1a" sun={[820, 610]} ground={740} city={false} />
    <Town base={745} />
    <path d="M500 780L1400 660V1300H500Z" fill="#12094a" opacity={0.9} /><Glow x={1100} y={960} r={380} c="#4c6cff" o={0.6} />
    {line("M500 780L1400 660", "#ff7ab8", 30, 0.35)}{line("M500 780L1400 660", "#fff6dc", 12)}
    <Friend x={800} y={720} s={0.72} /><Bar x={1100} y={545} w={250} h={56} v={1} c="#5fe08a" /><T x={1100} y={680} s={100} c="#5fe08a">1H</T>
    <Komo x={1110} y={1040} s={1.1} t={1} expr="shock" /><Bar x={810} y={870} w={250} h={56} v={0.11} /><T x={810} y={1032} s={100} c="#ffd23f">9H</T>
    <Sparks at={[[705, 470, 26], [1215, 780, 24]]} />
  </Frame>
);
const S1B: React.FC = () => (
  <Frame vignette={0.5}>
    <Dusk id="s1b" sun={[960, 720]} ground={940} city={false} />
    <FarCity x0={500} x1={1420} base={900} seed={17} fill="#8a2c84" hi="#c44c8c" t={2} lights={0.07} />
    <Town base={945} />
    <path d="M-600 950Q480 890 1100 942T2500 910V1800H-600Z" fill="#3c1470" />
    <Friend x={970} y={960} s={1.45} />
    <Komo x={765} y={1052} s={0.92} t={1} expr="shock" look={1} />
    <Sparks at={[[730, 510, 36], [1200, 490, 30], [1190, 900, 32], [1215, 650, 18]]} />
    <Leaf x={1330} y={1120} rot={215} s={0.62} />
  </Frame>
);
const S1C: React.FC = () => (
  <Frame vignette={0.5}>
    <Night id="s1c" glow={[960, 640]} ground={900} />
    <Cable d="M560 1010C700 990 720 900 860 880" w={30} dash="4 110" />
    <Box x={960} y={720} s={0.82} />
    <Komo x={960} y={1055} s={1.15} t={1} expr="tired" />
    <Bar x={960} y={745} w={500} h={84} v={0.11} />
    <Sparks at={[[720, 470, 28], [1200, 530, 34], [1180, 950, 20]]} />
    <Bush x={670} y={1110} s={0.55} /><Bush x={1270} y={1110} s={0.55} />
  </Frame>
);

/* ============================== SHORT B2 (9:16) ============================== */
const S2A: React.FC = () => (
  <Frame vignette={0.5}>
    <Night id="s2a" glow={[870, 660]} ground={930} />
    <Cable d="M870 900C880 1000 960 1030 1060 990" w={28} c="#d0446c" hi="#ffb0c0" dash="4 90" />
    {[250, 330, 410].map((r, i) => <g key={r}>{line(`M${870 - r * 0.72} ${660 - r * 0.62}Q${870 - r * 1.1} 660 ${870 - r * 0.72} ${660 + r * 0.62}M${870 + r * 0.72} ${660 - r * 0.62}Q${870 + r * 1.1} 660 ${870 + r * 0.72} ${660 + r * 0.62}`, "#8ff4ff", 16 - i * 3, 0.8 - i * 0.22)}</g>)}
    <Phone x={870} y={690} s={1.22} rot={-10} />
    <Router x={1105} y={1025} s={0.7} />
    <Sparks at={[[1085, 480, 42], [710, 960, 32], [1190, 680, 24]]} />
  </Frame>
);
const S2B: React.FC = () => (
  <Frame vignette={0.5}>
    <Dusk id="s2b" sun={[1080, 540]} ground={950} city={false} />
    <FarCity x0={500} x1={1420} base={915} seed={23} fill="#8a2c84" hi="#c44c8c" t={2} lights={0.08} />
    <Town base={950} />
    <path d="M-600 955Q480 900 1100 950T2500 920V1800H-600Z" fill="#33106a" />
    <Tower x={1080} y={990} s={1.08} />
    <Komo x={820} y={1030} s={1.3} t={1} expr="happy" pose="point" />
    <Router x={1155} y={1062} s={0.42} />
    <Sparks at={[[900, 490, 30], [1215, 740, 22]]} />
    <Leaf x={560} y={1140} rot={-35} s={0.6} />
  </Frame>
);
const S2C: React.FC = () => (
  <Frame vignette={0.5}>
    <Night id="s2c" glow={[1060, 640]} ground={940} />
    <Cable d="M800 760C700 860 900 860 930 940S860 1020 820 1000" w={22} dash="4 70" />
    <Glow x={800} y={600} r={260} c="#5ce0ff" o={0.55} />
    <Phone x={800} y={640} s={0.76} rot={-8} /><Bar x={1070} y={610} w={310} h={68} v={0.8} c="#5fe08a" />
    <Router x={800} y={1000} s={0.62} /><Bar x={1070} y={900} w={310} h={68} v={0.38} />
    <Sparks at={[[1200, 500, 32], [920, 770, 20]]} />
  </Frame>
);

export default defineShots({ m1: [M1], m2: [M2], m3: [M3], m4: [M4], s1a: [S1A], s1b: [S1B], s1c: [S1C], s2a: [S2A], s2b: [S2B], s2c: [S2C] });
