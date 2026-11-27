// Identitas channel Equator Logic v2 (foto profil dan banner), gaya R3. Pembantu gambar disalin dari thumbnail-v2 siklus 003.
// Foto profil: render tegak lalu potong persegi tengah (yang terlihat: lingkaran r=304 di (960,540)). Banner: 16:9 skala 2; area aman x 380..1540, y 381..699.
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
const GREEN: Tones = ["#0c4a52", "#12806c", "#2cc480", "#d8f870"];
const ROCK: Tones = ["#2a1050", "#4c1c70", "#743090", "#c060a0"];
const SKIN = ["#c98a5a", "#e8a878", "#a86c43", "#d89868"];
const SHIRT = ["#e8546c", "#ffd23f", "#22a8b4", "#7450c8", "#fff6dc"];

/** siang jenuh: langit toska, awan lobus, laut berlapis */
const Day: React.FC<{ id: string; sun: V2; sea?: number }> = ({ id, sun, sea = 760 }) => (
  <g>
    <Back id={id} stops={["#0c4c9c", "#1488c8", "#2cc4d4", "#a8f0d8", "#fff0a8"]} /><Rays cx={sun[0]} cy={sun[1]} o={0.12} c="#fff6c4" />
    <Glow x={sun[0]} y={sun[1]} r={560} c="#fff6a0" o={0.8} /><circle cx={sun[0]} cy={sun[1]} r={92} fill="#fffbd0" />
    <Cloud x={sun[0] - 700} y={sea - 330} s={1} seed={3} base="#c8f4ff" lit="#ffffff" shadow="#74c8e8" />
    <Cloud x={sun[0] + 360} y={sea - 240} s={0.7} seed={9} base="#c8f4ff" lit="#ffffff" shadow="#74c8e8" />
    <Sea y={sea} />
  </g>
);
const Sea: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <path d={`M-600 ${y}Q0 ${y - 40} 480 ${y}T1440 ${y}T2500 ${y}V1800H-600Z`} fill="#1fa8c8" />
    <path d={`M-600 ${y + 100}Q-60 ${y + 55} 480 ${y + 100}T1560 ${y + 100}T2500 ${y + 100}V1800H-600Z`} fill="#136cb0" />
    <path d={`M-600 ${y + 230}Q60 ${y + 185} 600 ${y + 230}T1680 ${y + 230}T2500 ${y + 230}V1800H-600Z`} fill="#14307c" />
    {Array.from({ length: 40 }, (_, i) => <g key={i}>{line(`M${R(i, 31) * 2000 - 40} ${y + 30 + R(i, 32) * 320}h${24 + R(i, 33) * 70}`, "#a8f4ff", 7, 0.7)}</g>)}
  </g>
);
/** warga kecil: kepala dan badan bulat, (x,y) = dasar */
const Orang: React.FC<{ x: number; y: number; s?: number; i: number }> = ({ x, y, s = 1, i }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-30 0C-34 -52 -20 -70 0 -70C20 -70 34 -52 30 0Z" fill={SHIRT[i % 5]} stroke={INK} strokeWidth={5} />
    <circle cy={-92} r={27} fill={SKIN[i % 4]} stroke={INK} strokeWidth={5} />
    <circle cx={-9} cy={-94} r={4.5} fill={INK} /><circle cx={9} cy={-94} r={4.5} fill={INK} />
    {i % 3 === 0 ? <ellipse cy={-80} rx={6} ry={8} fill={INK} /> : line("M-8 -82Q0 -74 8 -82", INK, 4)}
    {R(i, 73) < 0.16 && <path d="M-34 -108L0 -142L34 -108Z" fill="#ffd23f" stroke={INK} strokeWidth={5} strokeLinejoin="round" />}
  </g>
);
/** kerumunan rapat: baris belakang dulu */
const Crowd: React.FC<{ x: number; y: number; w: number; rows: number; per: number; s?: number; seed?: number }> = ({ x, y, w, rows, per, s = 1, seed = 0 }) => (
  <g>{Array.from({ length: rows }, (_, r) => Array.from({ length: per }, (_, c) => {
    const i = r * per + c + seed;
    return <Orang key={i} x={x - w / 2 + (c + (r % 2) * 0.5) * (w / (per - 0.5)) + (R(i, 71) - 0.5) * 18} y={y + r * 46 * s + (R(i, 72) - 0.5) * 14} s={s * (0.9 + r * 0.07)} i={i * 7 + r} />;
  }))}</g>
);
/** rumah atap pelana kecil */
const House: React.FC<{ x: number; y: number; s?: number; i: number }> = ({ x, y, s = 1, i }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Shade d={rr(-44, -66, 88, 66, 8)} tones={[CREAM, TEAL, GOLD, PURPLE][i % 4]} L={LR} s={[3, 10, 6]} />
    <Shade d="M-62 -60L0 -118L62 -60Z" tones={i % 2 ? CORAL : BLUE} L={LR} s={[3, 10, 6]} />
    <path d={rr(-14, -38, 28, 38, 8)} fill="#ffe88a" />
  </g>
);
/** gunung api berwajah; (x,y) = tengah dasar, tinggi ~ 520*s */
const Volcano: React.FC<{ x: number; y: number; s?: number; face?: boolean; erupt?: boolean; mood?: "happy" | "calm" }> = ({ x, y, s = 1, face = true, erupt = true, mood = "happy" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {erupt && <><Glow x={0} y={-500} r={330} c="#ffb02c" o={0.85} />
      {([[-30, -580, 70], [60, -660, 96], [-70, -720, 64], [40, -800, 74], [150, -740, 54]] as [number, number, number][]).map(([a, b, r], i) => <g key={i}><circle cx={a} cy={b} r={r} fill={["#ff7a48", "#a8388c", "#c8487c", "#7c2c8c", "#8c3484"][i]} />{line(`M${a - r * 0.2} ${b - r * 0.76}Q${a + r * 0.6} ${b - r * 0.64} ${a + r * 0.76} ${b}`, "#ffb084", 10)}</g>)}
      {([[-190, -560], [200, -590], [-130, -660], [250, -500]] as V2[]).map(([a, b], i) => <circle key={i} cx={a} cy={b} r={17 - i * 2} fill="#ffd23f" stroke="#ff5a38" strokeWidth={8} />)}</>}
    <Shade d="M-430 0Q-250 -140 -110 -480Q-40 -440 0 -468Q50 -436 110 -480Q250 -140 430 0Z" tones={ROCK} L={LR} s={[12, 42, 16]} />
    <path d="M-110 -480Q-40 -440 0 -468Q50 -436 110 -480L136 -404Q96 -424 84 -344Q60 -300 44 -388Q16 -416 -6 -330Q-30 -280 -46 -386Q-80 -420 -96 -360Q-124 -380 -138 -410Z" fill="#ff7a30" />
    {line("M-100 -472Q-40 -432 0 -458Q50 -428 100 -472", "#fff0a0", 16)}
    <path d="M-430 0Q-300 -92 -170 -112Q-60 -60 60 -108Q250 -90 430 0Z" fill="#12806c" />
    {line("M-300 -72Q-210 -108 -150 -104M80 -104Q220 -92 330 -52", "#d8f870", 10)}
    {face && <g transform="translate(0 -220)">
      {mood === "happy" ? <>{line("M-86 4Q-60 -30 -34 4M34 4Q60 -30 86 4", INK, 18)}<path d="M-56 36Q0 118 56 36Z" fill={INK} /></> : <><circle cx={-60} r={22} fill={INK} /><circle cx={60} r={22} fill={INK} />{line("M-30 58Q0 76 30 58", INK, 14)}</>}
      <circle cx={-108} cy={38} r={22} fill="#ff8fb0" opacity={0.7} /><circle cx={108} cy={38} r={22} fill="#ff8fb0" opacity={0.7} /></g>}
  </g>
);
/** sawah berundak; y = tepi atas */
const Sawah: React.FC<{ y: number }> = ({ y }) => (
  <g>{[0, 1, 2, 3].map((k) => { const t = y + k * 82; const d = `M-600 ${t + 30}Q${200 + k * 140} ${t - 40} ${900 + k * 60} ${t + 14}T2500 ${t - 6}V1800H-600Z`; return (
    <g key={k}><path d={d} fill={["#2cc480", "#16987c", "#0c6a6c", "#08485c"][k]} />{line(`M-600 ${t + 30}Q${200 + k * 140} ${t - 40} ${900 + k * 60} ${t + 14}T2500 ${t - 6}`, "#d8f870", 10)}
      {Array.from({ length: 26 }, (_, i) => <g key={i}>{line(`M${i * 84 - 100 + k * 30} ${t + 56 + R(i + k * 40, 61) * 14}l-9 -18m9 18l9 -18`, "#b8f070", 6, 0.85)}</g>)}</g>); })}</g>
);
/** pulau melengkung penuh rumah dan warga; (x,y) = tengah permukaan */
const Island: React.FC<{ x: number; y: number; s?: number; people?: boolean; seed?: number }> = ({ x, y, s = 1, people = true, seed = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cy={150} rx={760} ry={74} fill="#082c6c" opacity={0.55} />
    <Shade d="M-740 0Q-500 -96 0 -104Q520 -96 740 0Q640 130 300 150Q0 186 -340 148Q-660 120 -740 0Z" tones={["#3c1458", "#6a2468", "#a8486c", "#f09068"]} L={LR} s={[8, 30, 12]} />
    <path d="M-740 0Q-500 -96 0 -104Q520 -96 740 0Q500 74 0 76Q-500 74 -740 0Z" fill="#2cc480" />
    {line("M-700 -6Q-480 -84 -40 -94M200 -88Q500 -70 690 -10", "#d8f870", 12)}
    {Array.from({ length: 18 }, (_, i) => <House key={i} x={-620 + i * 73 + R(i + seed, 81) * 26} y={-30 + R(i + seed, 82) * 46 - 22 * Math.sin((i / 17) * Math.PI)} s={0.72 + R(i, 83) * 0.34} i={i} />)}
    {people && <Crowd x={0} y={28} w={1240} rows={2} per={19} s={0.62} seed={seed} />}
    {line("M-690 160Q-640 182 -560 178M-120 200Q40 214 200 196M520 168Q600 170 680 146", "#a8f4ff", 12)}
  </g>
);
/** kapal penumpang penuh; (x,y) = garis air */
const Boat: React.FC<{ x: number; y: number; s?: number; seed?: number }> = ({ x, y, s = 1, seed = 3 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Shade d={rr(-60, -300, 120, 140, 26, 4)} tones={CREAM} L={LR} s={[5, 16, 8]} /><Shade d={rr(-26, -380, 52, 90, 14, 2)} tones={CORAL} L={LR} s={[4, 10, 6]} />
    {([[30, -440, 34], [90, -480, 46], [170, -500, 34]] as [number, number, number][]).map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill="#fff6dc" opacity={0.85 - i * 0.2} />)}
    <Crowd x={0} y={-124} w={470} rows={1} per={8} s={0.92} seed={seed} />
    <Shade d="M-300 -130H300Q290 -10 200 10H-200Q-290 -10 -300 -130Z" tones={BLUE} L={LR} s={[8, 24, 12]} />
    {line("M-268 -92H268", "#fff6dc", 12)}{[-180, -60, 60, 180].map((a) => <circle key={a} cx={a} cy={-46} r={20} fill="#ffe88a" stroke={INK} strokeWidth={7} />)}
    {line("M-380 14Q-320 -12 -260 14T-140 14M140 14Q200 -12 260 14T390 14", "#d8fcff", 18)}
  </g>
);
/** kulkas Jawa yang terisi lagi (jangkar video) */
const Fridge: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={0} y={8} w={230} />
    <Shade d={rr(-180, -520, 360, 520, 60, 30)} tones={TEAL} L={LR} s={[10, 34, 16]} />
    <path d={rr(-140, -478, 280, 430, 30)} fill="#fff6c4" />
    {[-338, -202, -66].map((sy, k) => <g key={sy}>{line(`M-132 ${sy}H132`, "#c87c3c", 12)}
      {[0, 1, 2, 3].map((i) => { const a = -96 + i * 64; return (i + k) % 3 === 0 ? <path key={i} d={`M${a - 26} ${sy - 8}Q${a} ${sy - 104} ${a + 26} ${sy - 8}Z`} fill="#ffa038" stroke={INK} strokeWidth={5} /> : (i + k) % 3 === 1 ? <circle key={i} cx={a} cy={sy - 40} r={31} fill="#e8546c" stroke={INK} strokeWidth={5} /> : <path key={i} d={rr(a - 26, sy - 84, 52, 76, 22)} fill="#2cc480" stroke={INK} strokeWidth={5} />; })}</g>)}
    <Shade d="M184 -516L300 -470V-70L184 -12Z" tones={TEAL} L={LR} s={[5, 18, 10]} />{line("M214 -330V-210", "#fff6dc", 18)}
  </g>
);

/* ============================== IDENTITAS ============================== */
const HEAD = "'Arial Black','Helvetica Neue',sans-serif";
/** garis khatulistiwa: pita emas bercahaya dengan putus-putus krem (tanda identitas channel) */
const Equator: React.FC<{ d: string; w: number }> = ({ d, w }) => (
  <g>{line(d, "#ffd23f", w * 3.4, 0.14)}{line(d, "#ffd23f", w * 2, 0.25)}{line(d, INK, w * 1.5)}{line(d, "#ffd23f", w)}
    <path d={d} fill="none" stroke="#fff6dc" strokeWidth={w * 0.3} strokeLinecap="round" strokeDasharray={`${w * 1.1} ${w * 1.5}`} /></g>
);

/** P1: Komo dekat, cincin khatulistiwa melingkari badannya, langit senja */
const P1: React.FC = () => (
  <Frame vignette={0.25}>
    <Back id="p1" stops={["#1c0e58", "#4a1c8c", "#a42c94", "#ee4c70", "#ff8a48", "#ffd060"]} />
    <Glow x={960} y={520} r={420} c="#ffe27a" o={0.9} /><Rays cx={960} cy={520} o={0.11} />
    <circle cx={960} cy={500} r={218} fill="#ffe88a" opacity={0.85} />
    <Equator d="M680 662C680 575 1240 575 1240 662" w={30} />
    <Komo x={960} y={925} s={2.42} t={1} expr="neutral" talk={0.55} />
    <Equator d="M680 662C680 765 1240 765 1240 662" w={34} />
    <Sparks at={[[760, 380, 26], [1170, 340, 20]]} />
  </Frame>
);
/** P2: Komo mengintip dari balik bola dunia berkhatulistiwa */
const P2: React.FC = () => (
  <Frame vignette={0.25}>
    <Back id="p2" stops={["#08062c", "#1a1064", "#3a1c90", "#8a2ca0"]} /><Stars n={60} seed={31} h={1000} />
    <Glow x={960} y={620} r={460} c="#5ce0ff" o={0.55} />
    <Komo x={960} y={705} s={1.9} t={1} expr="happy" />
    <g><clipPath id="globe"><circle cx={960} cy={790} r={250} /></clipPath>
      <circle cx={960} cy={790} r={250} fill="#1fa8c8" />
      <g clipPath="url(#globe)">
        <path d="M730 650Q800 610 860 650Q900 700 840 720Q760 730 730 650ZM890 625Q950 590 990 640Q1010 690 950 690Q900 680 890 625ZM1050 640Q1120 620 1170 680Q1140 720 1080 700ZM760 810Q830 790 880 830Q960 860 940 880Q830 890 760 810ZM1030 800Q1100 780 1180 820Q1130 880 1050 850Z" fill="#2cc480" stroke="#d8f870" strokeWidth={7} strokeLinejoin="round" />
        <circle cx={1090} cy={880} r={250} fill="#14307c" opacity={0.4} />
      </g>
      <circle cx={960} cy={790} r={250} fill="none" stroke={INK} strokeWidth={14} /></g>
    <Equator d="M712 752Q960 812 1208 752" w={28} />
    {[724, 1196].map((a) => <circle key={a} cx={a} cy={668} r={30} fill="#a86c43" stroke={INK} strokeWidth={8} />)}
    <Sparks at={[[750, 400, 24], [1180, 450, 30]]} />
  </Frame>
);
/** P3: tanda tanpa maskot: matahari, gunung, laut, dipotong khatulistiwa */
const P3: React.FC = () => (
  <Frame vignette={0.2}>
    <Back id="p3" stops={["#1c0e58", "#4a1c8c", "#a42c94", "#ee4c70", "#ffb050"]} />
    <Glow x={960} y={470} r={400} c="#ffe27a" o={0.85} /><circle cx={960} cy={455} r={180} fill="#ffe88a" />
    <Volcano x={960} y={640} s={0.5} face={false} erupt={false} />
    <Sea y={645} />
    <Equator d="M560 642H1360" w={36} />
  </Frame>
);

const Title: React.FC<{ x: number; y: number; s: number; c: string; w: number; children: string }> = ({ x, y, s, c, w, children }) => (
  <g><text x={x + 7} y={y + 9} textAnchor="middle" fontFamily={HEAD} fontWeight={900} fontSize={s} textLength={w} lengthAdjust="spacingAndGlyphs" fill={INK} opacity={s > 60 ? 0.45 : 0}>{children}</text>
    <text x={x} y={y} textAnchor="middle" fontFamily={HEAD} fontWeight={900} fontSize={s} textLength={w} lengthAdjust="spacingAndGlyphs" fill={c} stroke={INK} strokeWidth={s * 0.17} strokeLinejoin="round" paintOrder="stroke">{children}</text></g>
);
/** dunia banner: langit senja di atas, khatulistiwa, laut di bawah; hiasan di luar area teks */
const World: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <Frame vignette={0.35}>
    <Back id={id} stops={["#08062c", "#1c0e58", "#4a1c8c", "#a42c94", "#ee4c70", "#ff8a48", "#ffd060"]} />
    <Stars n={90} seed={41} h={400} /><Glow x={1010} y={690} r={700} c="#ffe27a" o={0.6} /><Rays cx={1010} cy={690} o={0.07} />
    <Cloud x={190} y={330} s={0.9} seed={2} base="#7a2c9c" lit="#ff8a60" shadow="#4c1c80" />
    <Cloud x={1600} y={260} s={0.75} seed={7} base="#6a289c" lit="#ff7a70" shadow="#401a7a" />
    <Volcano x={1735} y={678} s={0.5} />
    <g transform="translate(0 0)">{[0, 1, 2].map((i) => <Block key={i} x={-20 + i * 118} base={668} w={92} h={[150, 205, 120][i]} side={24} seed={i + 90} t={2} tones={(["#123a52", "#176a86", "#22a8b4", "#8ff4e0"] as unknown) && ([["#123a52", "#176a86", "#22a8b4", "#8ff4e0"], ["#5a1c52", "#a42c62", "#e8546c", "#ffb084"], ["#26146a", "#3c28a0", "#5c48d0", "#a898ff"]] as Tones[])[i]} top="flat" balcony={false} />)}</g>
    <Sea y={682} />
    <Island x={250} y={900} s={0.28} people={false} /><Island x={1640} y={880} s={0.34} people={false} seed={5} />
    <Boat x={1120} y={880} s={0.34} seed={4} />
    <Equator d="M-60 672H1980" w={18} />
    {children}
    <Leaf x={-60} y={1120} rot={-28} s={0.8} /><Leaf x={1990} y={1110} rot={208} s={0.8} />
  </Frame>
);
/** B1: Komo di kiri, nama dan tagline di tengah */
const B1: React.FC = () => (
  <World id="b1">
    <Komo x={490} y={662} s={0.98} t={1} expr="happy" pose="point" />
    <Title x={1055} y={518} s={104} c="#ffffff" w={790}>EQUATOR LOGIC</Title>
    <Title x={1055} y={601} s={42} c="#ffd23f" w={770}>WHY SOUTHEAST ASIA WORKS LIKE THIS</Title>
    <Sparks at={[[640, 430, 22], [1525, 405, 18]]} />
  </World>
);
/** B2: nama dua baris, Komo besar di kanan */
const B2: React.FC = () => (
  <World id="b2">
    <Title x={850} y={482} s={104} c="#ffffff" w={640}>EQUATOR</Title>
    <Title x={850} y={582} s={104} c="#ffd23f" w={470}>LOGIC</Title>
    <Title x={850} y={638} s={34} c="#fff6dc" w={660}>WHY SOUTHEAST ASIA WORKS LIKE THIS</Title>
    <Komo x={1345} y={664} s={1.08} t={1} expr="neutral" talk={0.5} pose="wave" />
    <Sparks at={[[450, 440, 22], [1220, 420, 24]]} />
  </World>
);

export default defineShots({ p1: [P1], p2: [P2], p3: [P3], b1: [B1], b2: [B2] });
