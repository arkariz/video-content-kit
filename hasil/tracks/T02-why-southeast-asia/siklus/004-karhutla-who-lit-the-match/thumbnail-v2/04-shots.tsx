// Opsi thumbnail baru T02-004 (karhutla): rendering datar bertingkat (STYLE.md, T1-T13), palet dan pemeran T02. Teks judul ditambahkan komposisi Thumbnail.
// Still di produksi/acuan-visual/eksternal hanya acuan teknik; komposisi dan aset orisinal. Ilustrasi bergaya: tanpa peta akurat, tanpa perusahaan, logo, atau orang nyata.
// Master: teks kiri atas (x < 1300, y < 600). Short tegak: yang terlihat x 656..1264, teks di y < 400.
import React from "react";
import { defineShots, Frame, R, SANS } from "@r3";
import { Shade, Tones, rr, Cloud, FarCity, Block, Tree } from "@r3/art";
import { Komo } from "@r3/cast/T02";

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

const PEAT: Tones = ["#220c30", "#3c1838", "#5c2c3c", "#8c4c44"];

/** langit asap jingga: matahari merah pucat, gumpalan asap, siluet hutan */
const Haze: React.FC<{ id: string; sun: V2; ground?: number }> = ({ id, sun, ground = 900 }) => (
  <g>
    <Back id={id} stops={["#3a0c34", "#8c1c30", "#e0481c", "#ff8c20", "#ffc83c"]} /><Rays cx={sun[0]} cy={sun[1]} o={0.08} c="#ffe27a" />
    <Glow x={sun[0]} y={sun[1]} r={620} c="#ffe27a" o={0.75} /><circle cx={sun[0]} cy={sun[1]} r={120} fill="#ff5a30" /><circle cx={sun[0]} cy={sun[1]} r={88} fill="#ff8448" />
    <Cloud x={sun[0] - 700} y={ground - 430} s={1.25} seed={2} base="#8c2438" lit="#ff8430" shadow="#58142c" />
    <Cloud x={sun[0] + 300} y={ground - 560} s={1} seed={8} base="#74203c" lit="#f06c30" shadow="#48102c" />
    <Snags y={ground - 30} c="#9c2c28" s={0.7} n={26} seed={3} />
    <path d={`M-600 ${ground}Q480 ${ground - 60} 1100 ${ground - 8}T2500 ${ground - 40}V1800H-600Z`} fill="#4c1028" />
    <path d={`M-600 ${ground + 90}Q600 ${ground + 30} 1300 ${ground + 90}T2500 ${ground + 60}V1800H-600Z`} fill="#240820" />
  </g>
);
/** pohon hangus tanpa daun */
const Snags: React.FC<{ y: number; c?: string; s?: number; n?: number; seed?: number }> = ({ y, c = "#240820", s = 1, n = 12, seed = 1 }) => (
  <g>{Array.from({ length: n }, (_, i) => { const x = -100 + i * (2200 / n) + R(i + seed, 41) * 60, h = (110 + R(i + seed, 42) * 190) * s; return (
    <g key={i}>{line(`M${x} ${y + 40}L${x + 6} ${y - h}`, c, 20 * s)}{line(`M${x + 3} ${y - h * 0.5}l${-46 * s} ${-44 * s}M${x + 4} ${y - h * 0.68}l${40 * s} ${-50 * s}`, c, 11 * s)}</g>); })}</g>
);
/** lidah api datar tiga nada; (x,y) = dasar, tinggi ~ 300*s */
const Flame: React.FC<{ x: number; y: number; s?: number; flip?: boolean }> = ({ x, y, s = 1, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d="M-110 0C-170 -80 -110 -140 -96 -196C-60 -170 -56 -146 -50 -130C-70 -220 -10 -250 6 -330C60 -270 40 -220 66 -176C80 -196 88 -220 84 -244C150 -180 160 -70 104 0Z" fill="#e8301c" />
    <path d="M-78 0C-108 -60 -66 -96 -56 -130C-30 -108 -30 -90 -24 -76C-34 -150 14 -176 22 -226C64 -164 34 -128 58 -98C70 -112 74 -126 72 -140C112 -90 108 -40 72 0Z" fill="#ff8a1c" />
    <path d="M-40 0C-56 -42 -24 -62 -14 -92C14 -62 4 -46 20 -34C30 -46 32 -56 30 -64C58 -36 52 -14 36 0Z" fill="#ffe24c" />
  </g>
);
const FireLine: React.FC<{ y: number; s?: number; n?: number; x0?: number; x1?: number; seed?: number }> = ({ y, s = 1, n = 14, x0 = -60, x1 = 1980, seed = 2 }) => (
  <g><Glow x={(x0 + x1) / 2} y={y - 60} r={(x1 - x0) * 0.5} c="#ffb02c" o={0.5} />
    {Array.from({ length: n }, (_, i) => <Flame key={i} x={x0 + i * ((x1 - x0) / (n - 1))} y={y + R(i + seed, 43) * 30} s={s * (0.6 + R(i + seed, 44) * 0.65)} flip={i % 2 === 1} />)}</g>
);
const Embers: React.FC<{ n: number; seed: number; area?: [number, number, number, number] }> = ({ n, seed, area = [0, 200, 1920, 1000] }) => (
  <g>{Array.from({ length: n }, (_, i) => <circle key={i} cx={area[0] + R(i + seed, 45) * (area[2] - area[0])} cy={area[1] + R(i + seed, 46) * (area[3] - area[1])} r={3 + R(i + seed, 47) * 7} fill={i % 3 ? "#ffd23f" : "#fff0a0"} opacity={0.85} />)}</g>
);
/** masker di wajah Komo; (x,y) = dasar kaki Komo, skala sama */
const Mask: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {line("M-38 -116L-72 -136M38 -116L72 -136", "#fff6dc", 6)}
    <path d={rr(-40, -124, 80, 50, 20)} fill="#fff6dc" stroke={INK} strokeWidth={5} />{line("M-26 -108H26M-26 -92H26", "#a8c8d8", 5)}
  </g>
);
/** potongan gambut: api merayap di bawah tanah; y = permukaan */
const Underground: React.FC<{ y: number; drain?: boolean }> = ({ y, drain = true }) => (
  <g>
    <path d={`M-600 ${y}Q480 ${y - 26} 1100 ${y}T2500 ${y - 10}V1800H-600Z`} fill={PEAT[2]} />
    <path d={`M-600 ${y + 130}Q400 ${y + 90} 1000 ${y + 140}T2500 ${y + 110}V1800H-600Z`} fill={PEAT[1]} />
    <path d={`M-600 ${y + 300}Q500 ${y + 260} 1200 ${y + 310}T2500 ${y + 280}V1800H-600Z`} fill={PEAT[0]} />
    {line(`M-600 ${y}Q480 ${y - 26} 1100 ${y}T2500 ${y - 10}`, "#2cc480", drain ? 14 : 30)}
    {Array.from({ length: 70 }, (_, i) => <g key={i}>{line(`M${R(i, 48) * 2100 - 90} ${y + 30 + R(i, 49) * 380}l${24 + R(i, 50) * 40} ${R(i, 51) * 18 - 9}`, "#a8644c", 9, 0.55)}</g>)}
    {([[520, 150, 150], [800, 210, 200], [1060, 130, 150], [1300, 230, 180], [960, 320, 120], [660, 300, 90]] as [number, number, number][]).map(([a, b, r], i) => (
      <g key={i}><Glow x={a} y={y + b} r={r * 1.5} c="#ff7a1c" o={0.9} /><ellipse cx={a} cy={y + b} rx={r * 0.72} ry={r * 0.34} fill="#e8401c" /><ellipse cx={a + 8} cy={y + b} rx={r * 0.46} ry={r * 0.2} fill="#ffa01c" /><ellipse cx={a + 14} cy={y + b} rx={r * 0.2} ry={r * 0.09} fill="#fff0a0" /></g>))}
    {line(`M520 ${y + 150}Q660 ${y + 240} 800 ${y + 210}T1060 ${y + 130}T1300 ${y + 230}`, "#ffd23f", 12, 0.8)}
  </g>
);
/** korek api raksasa menyala; (x,y) = pangkal batang */
const Match: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Glow x={0} y={-520} r={340} c="#ffe27a" o={0.9} />
    <Shade d={rr(-32, -470, 64, 470, 20)} tones={["#8a4c28", "#c8843c", "#f0b864", "#ffe0a0"]} L={LR} s={[5, 16, 8]} />
    <ellipse cy={-476} rx={62} ry={78} fill="#7a1c30" />
    <Flame x={0} y={-486} s={1.05} />
  </g>
);
/** tumpukan uang kertas generik */
const Notes: React.FC<{ x: number; y: number; n: number; s?: number }> = ({ x, y, n, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><Contact x={0} y={12} w={190} />
    {Array.from({ length: n }, (_, i) => <g key={i} transform={`translate(${(R(i + x, 52) - 0.5) * 26} ${-i * 38})`}><Shade d={rr(-150, -40, 300, 54, 12)} tones={["#0c4a52", "#12806c", "#2cc480", "#b8f070"]} L={LR} s={[3, 10, 5]} /><path d={rr(-34, -40, 68, 54, 4)} fill="#fff6dc" /></g>)}
  </g>
);
/** palu pengadilan; (x,y) = tengah kepala palu */
const Gavel: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Shade d={rr(-26, 40, 52, 330, 22)} tones={["#3c1d3e", "#6a3340", "#98523e", "#d98a56"]} L={LR} s={[5, 14, 8]} />
    <Shade d={rr(-170, -90, 340, 170, 46)} tones={["#4c2430", "#84422c", "#c0703c", "#f0a868"]} L={LR} s={[8, 26, 12]} />
    {line("M-108 -82V74M108 -82V74", "#ffd23f", 18)}
  </g>
);
/** gedung-gedung tertelan asap */
const Smog: React.FC<{ y: number }> = ({ y }) => (
  <g><FarCity x0={-300} x1={2200} base={y} seed={31} fill="#b4442c" hi="#e87838" t={2} lights={0.03} />
    <rect x={-600} y={y - 130} width={3200} height={150} fill="#ff9428" opacity={0.4} /></g>
);

/* ============================== MASTER 16:9 ============================== */
/** M1: dinding api melahap hutan, Komo bermasker */
const M1: React.FC = () => (
  <Frame vignette={0.45}>
    <Haze id="m1" sun={[1620, 420]} ground={860} />
    <Snags y={850} n={14} s={1.5} seed={9} />
    <FireLine y={940} s={1.15} />
    <path d="M-600 960Q480 900 1100 962T2500 930V1800H-600Z" fill="#240820" />
    <Komo x={1520} y={1040} s={1.9} t={1} expr="shock" /><Mask x={1520} y={1040} s={1.9} />
    <Embers n={60} seed={3} />
  </Frame>
);
/** M2: kota tertelan asap, warga bermasker */
const M2: React.FC = () => (
  <Frame vignette={0.5}>
    <Haze id="m2" sun={[1560, 500]} ground={850} />
    <Smog y={860} />
    <FireLine y={880} s={0.6} n={8} x0={-60} x1={640} />
    <path d="M-600 900Q480 850 1100 902T2500 870V1800H-600Z" fill="#3c0c24" />
    <Komo x={1320} y={1060} s={1.7} t={1} expr="shock" /><Mask x={1320} y={1060} s={1.7} />
    <Komo x={1710} y={1020} s={1.35} t={2} expr="sad" /><Mask x={1710} y={1020} s={1.35} />
    <Komo x={760} y={1050} s={1.15} t={3} expr="tired" /><Mask x={760} y={1050} s={1.15} />
    <Embers n={34} seed={11} />
  </Frame>
);
/** M3: hamparan hangus luas, rumah kecil di tengah */
const M3: React.FC = () => (
  <Frame vignette={0.45}>
    <Haze id="m3" sun={[1580, 380]} ground={700} />
    <path d="M-600 720Q480 660 1100 722T2500 690V1800H-600Z" fill="#240820" />
    <FireLine y={742} s={0.66} n={20} seed={7} />
    <path d="M-600 780Q480 730 1100 786T2500 752V1800H-600Z" fill="#34102c" />
    <Snags y={880} n={16} s={0.8} c="#12041a" seed={5} /><Snags y={1030} n={9} s={1.1} c="#12041a" seed={15} />
    <House x={1500} y={960} s={1.5} i={1} /><Komo x={1700} y={990} s={0.8} t={1} expr="shock" /><Mask x={1700} y={990} s={0.8} />
    <Embers n={70} seed={17} />
  </Frame>
);
/** M4: korek raksasa di atas tanah gambut yang membara */
const M4: React.FC = () => (
  <Frame vignette={0.45}>
    <Haze id="m4" sun={[300, 620]} ground={720} />
    <Underground y={720} />
    <Match x={1690} y={765} s={0.78} rot={-10} />
    <Flame x={1420} y={740} s={0.4} /><Flame x={640} y={735} s={0.34} flip /><Flame x={300} y={740} s={0.45} />
    <Komo x={1300} y={740} s={1.15} t={1} expr="shock" /><Mask x={1300} y={740} s={1.15} />
    <Embers n={40} seed={23} area={[0, 100, 1920, 700]} />
  </Frame>
);

/* ============================== SHORT B1 (9:16) ============================== */
const S1A: React.FC = () => (
  <Frame vignette={0.45}>
    <Haze id="s1a" sun={[1130, 500]} ground={660} />
    <Underground y={660} />
    <Komo x={960} y={665} s={0.85} t={1} expr="shock" /><Mask x={960} y={665} s={0.85} />
    <Embers n={20} seed={31} area={[660, 420, 1260, 660]} />
  </Frame>
);
const S1B: React.FC = () => (
  <Frame vignette={0.45}>
    <Haze id="s1b" sun={[960, 560]} ground={820} />
    <Snags y={810} n={18} s={1.1} seed={25} />
    <Flame x={960} y={960} s={1.55} /><Flame x={730} y={970} s={0.9} flip /><Flame x={1190} y={970} s={1} />
    <path d="M-600 960Q480 905 1100 962T2500 930V1800H-600Z" fill="#240820" />
    <Komo x={780} y={1060} s={0.9} t={1} expr="shock" /><Mask x={780} y={1060} s={0.9} />
    <Embers n={26} seed={33} area={[660, 420, 1260, 1000]} />
  </Frame>
);
const S1C: React.FC = () => (
  <Frame vignette={0.5}>
    <Haze id="s1c" sun={[830, 500]} ground={760} />
    <Underground y={760} />
    <Match x={1060} y={790} s={0.55} rot={-14} />
    <Embers n={18} seed={35} area={[660, 420, 1260, 760]} />
  </Frame>
);

/* ============================== SHORT B2 (9:16) ============================== */
const S2A: React.FC = () => (
  <Frame vignette={0.45}>
    <Haze id="s2a" sun={[960, 640]} ground={900} />
    <FireLine y={940} s={0.62} n={7} x0={650} x1={1270} />
    <path d="M-600 950Q480 895 1100 952T2500 920V1800H-600Z" fill="#240820" />
    <Gavel x={930} y={620} s={0.9} rot={-34} />
    <Notes x={1060} y={1050} n={5} s={0.78} />
    <Sparks at={[[740, 480, 30], [1200, 760, 24]]} />
  </Frame>
);
const S2B: React.FC = () => (
  <Frame vignette={0.45}>
    <Night id="s2b" glow={[960, 640]} ground={900} />
    <Notes x={960} y={960} n={11} s={1.05} />
    <Komo x={760} y={1060} s={0.9} t={1} expr="shock" look={1} />
    <Flame x={1190} y={1060} s={0.55} />
    <Sparks at={[[1170, 500, 34], [730, 620, 24]]} />
  </Frame>
);
const S2C: React.FC = () => (
  <Frame vignette={0.45}>
    <Haze id="s2c" sun={[960, 560]} ground={880} />
    <FireLine y={900} s={0.55} n={7} x0={650} x1={1270} />
    <path d="M-600 910Q480 855 1100 912T2500 880V1800H-600Z" fill="#240820" />
    {Array.from({ length: 10 }, (_, i) => { const x = 740 + (i % 5) * 110, y = 560 + Math.floor(i / 5) * 190, bebas = i < 8; return (
      <g key={i} transform={`translate(${x} ${y})`}><Shade d={rr(-46, -66, 92, 132, 16)} tones={bebas ? ["#7a2440", "#b83a34", "#ff5a30", "#ffa068"] : ["#0c4a52", "#12806c", "#2cc480", "#b8f070"]} L={LR} s={[4, 12, 6]} />
        {[0, 1].map((c) => <path key={c} d={rr(-28 + c * 34, -44, 22, 26, 5)} fill="#fff6dc" />)}{[0, 1].map((c) => <path key={c} d={rr(-28 + c * 34, -6, 22, 26, 5)} fill="#fff6dc" />)}
        {bebas && line("M-30 30L30 66M30 30L-30 66", "#fff6dc", 12)}</g>); })}
  </Frame>
);

export default defineShots({ m1: [M1], m2: [M2], m3: [M3], m4: [M4], s1a: [S1A], s1b: [S1B], s1c: [S1C], s2a: [S2A], s2b: [S2B], s2c: [S2C] });
