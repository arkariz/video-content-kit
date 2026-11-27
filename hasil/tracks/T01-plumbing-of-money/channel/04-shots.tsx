// Identitas Money Plumbing: "bawah tanah" (ide E). Di atas permukaan terlihat pembayaran; di bawahnya pipa yang membawa uang. Katup koral = titik potongan / pertanyaan.
// Rendering datar bertingkat R3 (REFERENSI-GAYA.md T1-T20), palet T01, tanpa tokoh, tanpa logo atau lambang mata uang. Pembantu gambar disalin dari identitas T02 v3.
// Profil: render tegak, potong persegi tengah (terlihat: lingkaran r=304 di (960,540)). Banner: 16:9 skala 2; area aman x 380..1540, y 381..699.
import React from "react";
import { defineShots, Frame, R } from "@r3";
import { Shade, Tones, V2, rr, useSid } from "@r3/art";

const L: V2 = [-0.62, -0.78];
const GOLD: Tones = ["#a8560c", "#e8961a", "#ffd23f", "#fff2a8"];
const CORAL: Tones = ["#7a1c30", "#b83428", "#f0602e", "#ffb088"];
const CREAM: Tones = ["#8a6a8c", "#d8b894", "#fff4da", "#ffffff"];
const MONEY: Tones = ["#0a3c44", "#16685a", "#2faa78", "#a8f4b8"];
const NAVY: Tones = ["#070d2c", "#101a44", "#213468", "#5470b8"];
const LAWN: Tones = ["#0c4a48", "#14785c", "#3cc47c", "#dcf878"];

const line = (d: string, c: string, w: number, o = 1, dash?: string) => <path d={d} stroke={c} strokeWidth={w} opacity={o} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} />;
const circ = (x: number, y: number, r: number) => `M${x - r} ${y}A${r} ${r} 0 1 0 ${x + r} ${y}A${r} ${r} 0 1 0 ${x - r} ${y}Z`;
const oval = (x: number, y: number, a: number, b: number) => `M${x - a} ${y}A${a} ${b} 0 1 0 ${x + a} ${y}A${a} ${b} 0 1 0 ${x - a} ${y}Z`;

const Glow: React.FC<{ x: number; y: number; r: number; c: string; o?: number }> = ({ x, y, r, c, o = 0.6 }) => { const id = useSid(); return (
  <g><defs><radialGradient id={`g${id}`}><stop offset={0} stopColor={c} stopOpacity={o} /><stop offset={0.45} stopColor={c} stopOpacity={o * 0.35} /><stop offset={1} stopColor={c} stopOpacity={0} /></radialGradient></defs><circle cx={x} cy={y} r={r} fill={`url(#g${id})`} /></g>); };
/** T8: kilau empat sudut */
const Spark: React.FC<{ x: number; y: number; r: number; c?: string }> = ({ x, y, r, c = "#fff6d0" }) => (
  <g><circle cx={x} cy={y} r={r} fill={c} opacity={0.14} /><path d={`M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`} fill={c} /></g>);
/** T2: highlight kapsul + titik di sisi cahaya */
const Pill: React.FC<{ x: number; y: number; h: number; rot?: number; c?: string; o?: number }> = ({ x, y, h, rot = 38, c = "#ffffff", o = 0.75 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}><path d={rr(-h * 0.2, -h / 2, h * 0.4, h, h * 0.2)} fill={c} /><circle cy={h * 0.82} r={h * 0.17} fill={c} /></g>);
/** T3: konfeti permukaan (titik dan kapsul) dalam kotak; dipakai di dalam clip Shade */
const Confetti: React.FC<{ n: number; seed: number; box: [number, number, number, number]; c: string; s: number; o?: number }> = ({ n, seed, box: [x, y, w, h], c, s, o = 0.5 }) => (
  <g opacity={o}>{Array.from({ length: n }, (_, i) => { const px = x + R(seed + i, 2) * w, py = y + R(seed + i, 3) * h, k = s * (0.5 + R(seed + i, 4));
    return i % 3 ? <circle key={i} cx={px} cy={py} r={k * 0.55} fill={c} /> : <path key={i} d={`M${px} ${py}l${k * 2} ${(R(seed + i, 5) - 0.5) * k * 1.6}`} stroke={c} strokeWidth={k} strokeLinecap="round" />; })}</g>);

/** T4 + T1: gugus lobus berlapis, tiap lobus punya sabit bayangan dan garis cahaya */
const Lobes: React.FC<{ x: number; y: number; s: number; tones?: Tones; seed?: number }> = ({ x, y, s, tones = LEAF, seed = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {([[-52, -30, 38], [46, -38, 42], [-8, -66, 48], [-30, -14, 34], [26, -10, 40]] as [number, number, number][]).map(([a, b, r], i) => (
      <g key={i}><Shade d={circ(a, b, r)} tones={tones} L={L} s={[r * 0.1, r * 0.34, r * 0.14]}><Confetti n={6} seed={seed * 9 + i} box={[a - r * 0.2, b, r, r * 0.8]} c={tones[0]} s={5} o={0.55} /></Shade></g>))}
  </g>);
/** awan gugus lobus datar dua nada */
const Cloud: React.FC<{ x: number; y: number; s: number; c: [string, string, string] }> = ({ x, y, s, c: [sh, base, hi] }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><Shade d="M-150 20C-170 -8 -128 -30 -100 -20C-100 -64 -42 -80 -16 -48C4 -92 80 -80 80 -34C112 -50 154 -24 138 2C170 6 164 30 130 30H-124C-140 30 -148 28 -150 20Z" tones={[sh, sh, base, hi]} L={L} s={[4, 16, 8]} /></g>);

/* ============================== BENDA ============================== */
/** koin bertebal: rim samping, muka bercincin, lekuk timbul, highlight kapsul */
const Coin: React.FC<{ x: number; y: number; r: number; d?: number }> = ({ x, y, r, d = 0.16 }) => (
  <g transform={`translate(${x} ${y})`}>
    <Shade d={circ(r * d, r * d * 0.5, r)} tones={["#7a3408", "#a8560c", "#d07c14", "#f4b032"]} L={L} s={[r * 0.04, r * 0.14, r * 0.05]} />
    <Shade d={circ(0, 0, r)} tones={GOLD} L={L} s={[r * 0.04, r * 0.17, r * 0.07]} />
    <circle r={r * 0.72} fill={GOLD[0]} opacity={0.55} />
    <Shade d={circ(r * 0.025, r * 0.035, r * 0.68)} tones={["#c4700e", "#e8961a", "#ffc22c", "#ffe480"]} L={L} s={[r * 0.03, r * 0.12, r * 0.05]}><Confetti n={18} seed={Math.round(r)} box={[-r * 0.1, -r * 0.1, r * 0.8, r * 0.8]} c="#c4700e" s={r * 0.06} o={0.55} /></Shade>
    {line(`M${r * 0.05} ${-r * 0.33}V${r * 0.35}`, "#a8560c", r * 0.2)}{line(`M${-r * 0.01} ${-r * 0.37}V${r * 0.29}`, "#fff2a8", r * 0.13)}
    <Pill x={-r * 0.52} y={-r * 0.5} h={r * 0.34} rot={42} o={0.9} />
  </g>);
/** pipa: bayangan jatuh, badan bertingkat, garis cahaya sepanjang pipa, bintik */
const Pipe: React.FC<{ d: string; w: number; t?: Tones }> = ({ d, w, t = MONEY }) => (
  <g fill="none">
    <g transform={`translate(${w * 0.2} ${w * 0.36})`}>{line(d, "#02061c", w * 1.04, 0.42)}</g>
    {line(d, t[0], w)}
    <g transform={`translate(${-w * 0.05} ${-w * 0.06})`}>{line(d, t[1], w * 0.82)}</g>
    <g transform={`translate(${-w * 0.1} ${-w * 0.12})`}>{line(d, t[2], w * 0.54)}</g>
    <g transform={`translate(${-w * 0.21} ${-w * 0.24})`}>{line(d, t[3], w * 0.11, 0.95, `${w * 2.6} ${w * 0.5} ${w * 0.18} ${w * 0.5}`)}</g>
    <g transform={`translate(${w * 0.12} ${w * 0.16})`}>{line(d, t[0], w * 0.09, 0.75, `${w * 0.06} ${w * 0.62} ${w * 0.3} ${w * 0.9}`)}</g>
  </g>);
/** flensa sambungan; v = pipa tegak */
const Flange: React.FC<{ x: number; y: number; w: number; v?: boolean; t?: Tones }> = ({ x, y, w, v, t = MONEY }) => { const a = w * 1.34, b = w * 0.34; const bx = v ? x - a / 2 : x - b / 2, by = v ? y - b / 2 : y - a / 2; return (
  <g><path d={rr(bx + w * 0.14, by + w * 0.22, v ? a : b, v ? b : a, b / 2.4)} fill="#02061c" opacity={0.4} />
    <Shade d={rr(bx, by, v ? a : b, v ? b : a, b / 2.4)} tones={t} L={L} s={[w * 0.04, w * 0.14, w * 0.07]} />
    {[-0.36, 0.36].map((k) => <circle key={k} cx={v ? x + a * k : x} cy={v ? y : y + a * k} r={w * 0.07} fill={t[3]} />)}</g>); };
/** jendela kaca pada pipa berisi koin (T10) */
const Window: React.FC<{ x: number; y: number; w: number; len: number; v?: boolean; n?: number }> = ({ x, y, w, len, v, n = 3 }) => { const h = w * 0.62; return (
  <g transform={`translate(${x} ${y}) rotate(${v ? 90 : 0})`}>
    <path d={rr(-len / 2 - w * 0.1, -h / 2 - w * 0.1, len + w * 0.2, h + w * 0.2, h / 2 + w * 0.1)} fill="#0a3c44" />
    <path d={rr(-len / 2, -h / 2, len, h, h / 2)} fill="#072238" />
    {Array.from({ length: n }, (_, i) => <Coin key={i} x={-len / 2 + (len / n) * (i + 0.5) - w * 0.03} y={0} r={Math.min(h * 0.4, len / n * 0.42)} d={0.2} />)}
    <path d={rr(-len / 2, -h / 2, len, h, h / 2)} fill="#bff4ff" opacity={0.14} />
    {line(`M${-len / 2 + h * 0.4} ${(v ? 1 : -1) * h * 0.46}H${len * 0.12}M${len * 0.24} ${(v ? 1 : -1) * h * 0.46}h${w * 0.04}`, "#ffffff", w * 0.055, v ? 0.7 : 0.9)}
  </g>); };
/** katup koral: leher, roda berjeruji; beacon = sorotan (T8) */
const Valve: React.FC<{ x: number; y: number; r: number; beacon?: boolean }> = ({ x, y, r, beacon }) => (
  <g transform={`translate(${x} ${y})`}>
    {beacon && <><Glow x={0} y={0} r={r * 3.4} c="#ff8050" o={0.75} />
      {[-150, -120, -90, -60, -30].map((a) => { const c = Math.cos((a * Math.PI) / 180), s = Math.sin((a * Math.PI) / 180); return <g key={a}>{line(`M${c * r * 1.45} ${s * r * 1.45}L${c * r * 1.9} ${s * r * 1.9}`, "#fff4e0", r * 0.16)}</g>; })}</>}
    <circle cx={r * 0.18} cy={r * 0.28} r={r * 1.04} fill="#02061c" opacity={0.4} />
    <Shade d={`${circ(0, 0, r)}`} tones={CORAL} L={L} s={[r * 0.06, r * 0.2, r * 0.09]} />
    <circle r={r * 0.68} fill={CORAL[0]} /><circle cx={r * 0.04} cy={r * 0.05} r={r * 0.62} fill="#1a1440" />
    {[0, 60, 120].map((a) => <g key={a} transform={`rotate(${a})`}>{line(`M${-r * 0.66} 0H${r * 0.66}`, CORAL[1], r * 0.22)}{line(`M${-r * 0.64} ${-r * 0.04}H${r * 0.64}`, CORAL[2], r * 0.12)}</g>)}
    <Shade d={circ(0, 0, r * 0.3)} tones={CORAL} L={L} s={[r * 0.03, r * 0.1, r * 0.05]} />
    {line(`M${-r * 0.82} ${-r * 0.18}A${r * 0.84} ${r * 0.84} 0 0 1 ${-r * 0.3} ${-r * 0.78}`, "#ffe0c8", r * 0.11)}<circle cx={-r * 0.1} cy={-r * 0.84} r={r * 0.055} fill="#ffe0c8" />
  </g>);
/** tanah: pita lapisan bergelombang makin gelap ke bawah, kerikil, akar (T3, T17) */
const Soil: React.FC<{ y: number; step: number }> = ({ y, step }) => (
  <g>{["#3a2468", "#2c1c5a", "#201750", "#171244", "#100e38"].map((c, i) => { const t = y + i * step, a = 12 + i * 3; return <path key={c} d={`M-200 ${t + a}C200 ${t - a} 420 ${t + a * 1.7} 760 ${t + 4}S1260 ${t - a} 1560 ${t + a * 0.6}S1960 ${t + a} 2120 ${t - a}V1400H-200Z`} fill={c} />; })}
    <Confetti n={150} seed={61} box={[-80, y + 24, 2080, step * 6]} c="#7a50b0" s={7} o={0.55} /><Confetti n={46} seed={88} box={[-80, y + 24, 2080, step * 6]} c="#c8689c" s={10} o={0.45} /></g>);
/** permukaan: lapisan rumput bertebal dengan bibir terang (T15) */
const Ground: React.FC<{ y: number; h: number }> = ({ y, h }) => (
  <g><path d={`M-200 ${y + h * 0.9}Q300 ${y + h * 1.5} 700 ${y + h}T1500 ${y + h * 1.1}T2120 ${y + h}V${y}H-200Z`} fill="#6a2c58" />
    <path d={`M-200 ${y}H2120V${y + h}Q1900 ${y + h * 1.3} 1700 ${y + h * 0.85}T1300 ${y + h * 0.95}T860 ${y + h * 0.8}T420 ${y + h}T-200 ${y + h * 0.85}Z`} fill={LAWN[1]} />
    <rect x={-200} y={y - h * 0.12} width={2320} height={h * 0.5} rx={h * 0.2} fill={LAWN[2]} />{line(`M-200 ${y - h * 0.04}H2120`, LAWN[3], h * 0.13, 1, "210 22 40 22")}
    <Confetti n={90} seed={19} box={[-60, y + h * 0.08, 2040, h * 0.55]} c={LAWN[0]} s={h * 0.16} o={0.6} /></g>);
/** toko beratap kanopi; (x,y) = tengah dasar */
const Shop: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cy={2} rx={150} ry={12} fill="#06222c" opacity={0.35} />
    <Shade d={rr(-112, -176, 224, 178, 20, 4)} tones={CREAM} L={L} s={[5, 18, 9]}><Confetti n={20} seed={5} box={[10, -120, 96, 110]} c="#d8b894" s={7} /></Shade>
    <Shade d={rr(-90, -228, 180, 54, 22, 6)} tones={NAVY} L={L} s={[4, 13, 6]} /><Coin x={0} y={-201} r={18} />
    {[0, 1, 2, 3, 4, 5].map((i) => <Shade key={i} d={`M${-132 + i * 44} -150H${-88 + i * 44}V-116Q${-110 + i * 44} -92 ${-132 + i * 44} -116Z`} tones={i % 2 ? CREAM : CORAL} L={L} s={[3, 9, 5]} />)}
    <path d={rr(-84, -80, 70, 82, 22, 2)} fill={NAVY[1]} /><path d={rr(10, -78, 76, 52, 12)} fill="#ffe27a" />{line("M18 -68l22 0M18 -54h10", "#fff8d0", 7)}{line("M-30 -40v8", GOLD[2], 8)}
  </g>);
/** bank: tiang dan atap segitiga */
const Bank: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cy={2} rx={170} ry={13} fill="#06222c" opacity={0.35} />
    <Shade d={rr(-132, -158, 264, 150, 8, 2)} tones={["#2a2058", "#40347c", "#5c4c9c", "#9c88d0"]} L={L} s={[4, 15, 7]} />
    {[-96, -36, 24, 84].map((a) => <Shade key={a} d={rr(a - 2, -150, 34, 132, 14, 6)} tones={CREAM} L={L} s={[3, 11, 6]} />)}
    <Shade d={rr(-154, -26, 308, 28, 10, 4)} tones={CREAM} L={L} s={[3, 10, 5]} /><Shade d={rr(-148, -178, 296, 30, 8)} tones={CREAM} L={L} s={[3, 10, 5]} />
    <Shade d="M-158 -170Q-80 -216 0 -258Q80 -216 158 -170Z" tones={MONEY} L={L} s={[5, 18, 8]} /><Coin x={0} y={-202} r={20} />
  </g>);
/** ponsel pembayaran berdiri */
const Phone: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(-6)`}>
    <Shade d={rr(-44, -156, 88, 156, 20)} tones={NAVY} L={L} s={[4, 14, 7]} /><path d={rr(-33, -140, 66, 122, 10)} fill="#8ff0e0" />
    {[0, 1, 2].map((i) => [0, 1, 2].map((j) => (i + j * 2) % 3 !== 1 && <path key={`${i}${j}`} d={rr(-23 + i * 17, -118 + j * 17, 12, 12, 3)} fill={NAVY[1]} />))}<path d={rr(-22, -52, 44, 18, 9)} fill={CORAL[2]} />
    {line("M54 -128q22 20 0 44M72 -144q40 36 0 76", "#fff4da", 7, 0.9)}
  </g>);
/** kartu pembayaran generik */
const Card: React.FC<{ x: number; y: number; s: number; rot?: number }> = ({ x, y, s, rot = -12 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}><Shade d={rr(-80, -52, 160, 104, 16)} tones={CORAL} L={L} s={[4, 14, 7]}><rect x={-90} y={-26} width={190} height={20} fill={CORAL[0]} /></Shade>
    <path d={rr(-60, 8, 34, 24, 6)} fill={GOLD[2]} />{line("M-4 30h20M30 30h26", "#fff4da", 8)}</g>);
const Tree: React.FC<{ x: number; y: number; s: number; seed?: number }> = ({ x, y, s, seed = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>{line("M0 0V-60", "#6a2c58", 18)}{line("M-3 -4V-56", "#c86c5c", 6)}<Lobes x={0} y={-40} s={1} tones={LAWN} seed={seed} /></g>);

/* ============================== PROFIL ============================== */
const Sunburst: React.FC<{ cy: number; c: string[] }> = ({ cy, c }) => (
  <g><rect x={-100} y={-100} width={2120} height={1280} fill={c[0]} />{c.slice(1).map((k, i) => <circle key={k} cx={960} cy={cy} r={330 - i * 72} fill={k} />)}</g>);
/** P1: koin di atas tanah, pipa bercabang di bawahnya, katup koral */
const P1: React.FC = () => (
  <Frame vignette={0.22}>
    <Sunburst cy={430} c={["#e8604c", "#f48a50", "#ffae58", "#ffd478", "#fff0b0"]} />
    <Cloud x={760} y={372} s={0.48} c={["#ff9c68", "#fff0d4", "#ffffff"]} /><Cloud x={1166} y={330} s={0.36} c={["#ff9c68", "#fff0d4", "#ffffff"]} />
    <Soil y={514} step={62} />
    <Pipe d="M960 500V668" w={58} />
    <Pipe d="M960 668H800Q760 668 760 708V900" w={46} /><Pipe d="M960 668H1100Q1140 668 1140 640V628Q1140 596 1180 596H1360" w={46} />
    <Pipe d="M960 668V740Q960 776 996 776H1360" w={46} />
    <Window x={960} y={570} w={58} len={90} v n={2} /><Window x={1058} y={776} w={46} len={104} />
    <Flange x={850} y={668} w={46} /><Flange x={960} y={738} w={46} v /><Flange x={1226} y={596} w={46} /><Flange x={760} y={742} w={46} v />
    <Ground y={500} h={34} />
    <Tree x={750} y={500} s={0.62} /><Tree x={1180} y={500} s={0.5} seed={6} />
    <ellipse cx={978} cy={500} rx={110} ry={14} fill="#06222c" opacity={0.4} />
    <Coin x={950} y={386} r={116} />
    <Valve x={960} y={668} r={62} beacon />
    <Spark x={1112} y={296} r={26} /><Spark x={800} y={462} r={16} />
  </Frame>);
/** P2: versi paling ringkas untuk ukuran kecil: koin, satu pipa, katup */
const P2: React.FC = () => (
  <Frame vignette={0.2}>
    <Sunburst cy={420} c={["#0f5a58", "#188068", "#2faa78", "#66cc88", "#b4eca0"]} />
    <Soil y={540} step={58} />
    <Pipe d="M960 520V700" w={96} t={["#8a5a7c", "#d8b894", "#fff4da", "#ffffff"]} />
    <Pipe d="M560 716H1360" w={96} t={["#8a5a7c", "#d8b894", "#fff4da", "#ffffff"]} />
    <Flange x={782} y={716} w={96} t={CREAM} /><Flange x={1138} y={716} w={96} t={CREAM} />
    <Ground y={528} h={44} />
    <ellipse cx={982} cy={526} rx={136} ry={17} fill="#06222c" opacity={0.4} />
    <Coin x={950} y={386} r={140} />
    <Valve x={960} y={716} r={88} beacon />
    <Spark x={1130} y={300} r={30} /><Spark x={770} y={440} r={20} />
  </Frame>);
/** P3: toko dan ponsel di permukaan, jalur pipa di bawah */
const P3: React.FC = () => (
  <Frame vignette={0.22}>
    <Sunburst cy={450} c={["#141c50", "#24226c", "#432c88", "#7c3c90", "#d05c80"]} />
    <Confetti n={40} seed={3} box={[660, 240, 600, 200]} c="#fff0c8" s={3.4} o={0.8} />
    <Soil y={538} step={58} />
    <Pipe d="M826 540V640Q826 678 864 678H960" w={44} /><Pipe d="M1100 540V640Q1100 678 1062 678H960" w={44} /><Pipe d="M960 678V900" w={44} />
    <Window x={826} y={600} w={44} len={70} v n={2} /><Window x={960} y={778} w={44} len={90} v n={2} />
    <Ground y={526} h={34} />
    <Shop x={840} y={526} s={0.92} /><Phone x={1096} y={526} s={1.08} /><Coin x={982} y={350} r={44} /><Card x={1130} y={310} s={0.55} />
    {line("M880 360Q908 312 942 334M1030 330Q1052 318 1070 320", "#fff4da", 7, 0.9, "3 18")}
    <Valve x={960} y={678} r={58} beacon />
    <Spark x={776} y={298} r={20} />
  </Frame>);

/* ============================== BANNER ============================== */
type Sky = { bg: string[]; cloud: [string, string, string]; city: [string, string]; star: boolean; title: [string, string]; sun: string };
const PAGI: Sky = { bg: ["#2f9c94", "#48b49c", "#70caa4", "#a0dcac", "#ccecb4", "#f0f4bc", "#ffe6a8"], cloud: ["#a8e4c8", "#fff8e4", "#ffffff"], city: ["#58b49c", "#3c9488"], star: false, title: ["#172447", "#fffdf0"], sun: "#fff6c0" };
const MALAM: Sky = { bg: ["#0c1238", "#121a4c", "#1c2464", "#2e2c7c", "#4c348c", "#783c90", "#b04c88"], cloud: ["#2c2870", "#4c3c8c", "#b86094"], city: ["#46307c", "#2c2064"], star: true, title: ["#ffffff", "#060a28"], sun: "#ff9ac0" };
const Title: React.FC<{ y: number; s: number; w: number; c: string; d: string; children: string }> = ({ y, s, w, c, d, children }) => {
  const p = { x: 960, textAnchor: "middle" as const, fontFamily: "'Arial Black','Helvetica Neue',sans-serif", fontWeight: 900, fontSize: s, textLength: w, lengthAdjust: "spacingAndGlyphs" as const };
  return <g>{Array.from({ length: Math.round(s * 0.09) }, (_, i) => <text key={i} {...p} y={y + Math.round(s * 0.09) - i} fill={d}>{children}</text>)}<text {...p} y={y} fill={c}>{children}</text></g>; };
const GY = 604;
const Banner: React.FC<{ k: Sky }> = ({ k }) => (
  <Frame vignette={0.26}>
    <rect x={-200} y={-200} width={2320} height={1480} fill={k.bg[0]} />
    {k.bg.slice(1).map((c, i) => <path key={c} d={circ(960, 760, 900 - i * 112)} fill={c} />)}
    {k.star && <><Confetti n={110} seed={12} box={[-40, -20, 2000, 350]} c="#cfd4ff" s={3.4} o={0.75} /><Spark x={300} y={230} r={20} /><Spark x={1610} y={150} r={26} /></>}
    <Glow x={960} y={600} r={520} c={k.sun} o={0.35} />
    <Cloud x={240} y={300} s={0.95} c={k.cloud} /><Cloud x={1660} y={262} s={0.78} c={k.cloud} /><Cloud x={640} y={210} s={0.42} c={k.cloud} /><Cloud x={1330} y={300} s={0.34} c={k.cloud} />
    {/* kota jauh: siluet satu nada (T5) */}
    {Array.from({ length: 40 }, (_, i) => { const x = -90 + i * 54, h = 40 + R(i, 41) * (i > 9 && i < 29 ? 34 : 190); return <path key={i} d={rr(x, GY - h, 46 + R(i, 42) * 22, h + 4, i % 3 ? 8 : 24, 0)} fill={k.city[i % 2]} opacity={0.8} />; })}
    <Soil y={GY + 14} step={84} />
    {/* jaringan pipa: utama di area aman, cabang di bawah */}
    <Pipe d="M150 590V632Q150 662 180 662H1736Q1766 662 1766 632V590" w={34} />
    <Pipe d="M520 662V800Q520 834 554 834H830Q864 834 864 868V1200" w={36} />
    <Pipe d="M1440 662V756Q1440 790 1406 790H1130Q1096 790 1096 824V900Q1096 934 1130 934H2000" w={36} />
    <Pipe d="M-80 900H290Q324 900 324 866V690Q324 662 354 662" w={30} />
    <Pipe d="M960 662V1200" w={30} t={["#5a1c40", "#a43440", "#e8603c", "#ffb490"]} />
    <Window x={470} y={662} w={34} len={120} /><Window x={760} y={662} w={34} len={150} n={4} /><Window x={1180} y={662} w={34} len={150} n={4} /><Window x={1450} y={662} w={34} len={110} />
    <Window x={690} y={834} w={36} len={130} /><Window x={1260} y={790} w={36} len={130} /><Window x={1600} y={934} w={36} len={150} n={4} /><Window x={960} y={850} w={30} len={100} v n={3} />
    {[600, 900, 1020, 1320, 1620, 300].map((a) => <Flange key={a} x={a} y={662} w={34} />)}<Flange x={520} y={748} w={36} v /><Flange x={864} y={960} w={36} v /><Flange x={1096} y={862} w={36} v />
    <Valve x={324} y={780} r={34} /><Valve x={1440} y={724} r={32} /><Valve x={864} y={930} r={30} />
    <Ground y={GY} h={26} />
    <Shop x={170} y={GY} s={0.9} /><Tree x={318} y={GY} s={0.52} /><Card x={118} y={330} s={0.7} /><Phone x={350} y={GY} s={0.5} />
    <Bank x={1752} y={GY} s={0.92} /><Tree x={1580} y={GY} s={0.56} seed={5} /><Tree x={1930} y={GY} s={0.66} seed={9} />
    <Coin x={414} y={GY - 34} r={30} /><Coin x={1512} y={GY - 26} r={22} />
    <Valve x={960} y={662} r={34} beacon />
    <Title y={474} s={112} w={1060} c={k.title[0]} d={k.title[1]}>MONEY PLUMBING</Title>
    <path d={rr(525, 497, 870, 60, 30)} fill="#101a44" opacity={0.94} />
    <text x={960} y={541} textAnchor="middle" fontFamily="'Arial Black','Helvetica Neue',sans-serif" fontWeight={900} fontSize={38} textLength={800} lengthAdjust="spacingAndGlyphs" fill="#ffd23f">WHAT HAPPENS BEHIND EVERY PAYMENT</text>
    {/* T6: pembingkai latar depan */}
    <Lobes x={-30} y={1110} s={2.2} tones={["#040824", "#0a1438", "#14285c", "#3c54a0"]} seed={5} /><Lobes x={1960} y={1130} s={2.0} tones={["#040824", "#0a1438", "#14285c", "#3c54a0"]} seed={9} />
  </Frame>);
const B1: React.FC = () => <Banner k={PAGI} />;
const B2: React.FC = () => <Banner k={MALAM} />;

const still = { drift: false as const };
export default defineShots({ p1: [P1, still], p2: [P2, still], p3: [P3, still], b1: [B1, still], b2: [B2, still] });
