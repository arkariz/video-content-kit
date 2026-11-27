// Identitas Equator Logic v3: "jalur khatulistiwa" (opsi C), rendering datar bertingkat R3.
// Teknik mengikuti produksi/REFERENSI-GAYA.md (T1-T13); semua bentuk, komposisi, dan palet orisinal. Tanpa garis tinta hitam, tanpa tokoh.
// Profil: render tegak, potong persegi tengah (terlihat: lingkaran r=304 di (960,540)). Banner: 16:9 skala 2; area aman x 380..1540, y 381..699.
import React from "react";
import { defineShots, Frame, R } from "@r3";
import { Shade, Tones, V2, rr, useSid } from "@r3/art";

const L: V2 = [-0.62, -0.78]; // satu arah cahaya: kiri atas
const GOLD: Tones = ["#a8420c", "#e8821a", "#ffc52e", "#fff0a0"];
const CORAL: Tones = ["#8a0f55", "#d81e63", "#ff4f6a", "#ffb0a0"];
const CREAM: Tones = ["#7a62b8", "#b9a6e8", "#f2ecff", "#ffffff"];
const OCEAN: Tones = ["#141a6e", "#1c3fa8", "#1488d8", "#6fe6f0"];
const LAND: Tones = ["#0b4f66", "#0f8a74", "#2fd07e", "#d6f86a"];
const LEAF: Tones = ["#0a3558", "#0d6470", "#18a67c", "#a4f078"];
const ROCK: Tones = ["#2a0f5c", "#4a1c80", "#76309c", "#c862b0"];
const SAND: Tones = ["#a03c58", "#e8744c", "#ffb458", "#ffe69a"];

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
/** pohon kelapa: batang meruas, pelepah dua nada */
const Palm: React.FC<{ x: number; y: number; s: number; flip?: boolean }> = ({ x, y, s, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {line("M0 0C6 -50 14 -96 34 -140", "#7a2458", 20)}{line("M-4 -4C2 -52 10 -96 30 -138", "#e8744c", 8)}{line("M0 -30l16 3M6 -62l16 5M16 -96l15 7", "#4a1048", 5)}
    {([[-1, 96, 22], [1, 100, 30], [-1, 62, -46], [1, 66, -42], [1, 8, -70]] as [number, number, number][]).map(([k, dx, dy], i) => { const ex = 34 + k * dx, ey = -144 + dy; return (
      <g key={i}><path d={`M34 -144Q${34 + k * dx * 0.5} ${-190 + dy * 0.4} ${ex} ${ey}Q${34 + k * dx * 0.45} ${-150 + dy * 0.5} 34 -144Z`} fill={i % 2 ? "#18a67c" : "#0d6470"} />{line(`M34 -146Q${34 + k * dx * 0.5} ${-180 + dy * 0.45} ${ex} ${ey}`, "#a4f078", 4, 0.9)}</g>); })}
    <circle cx={26} cy={-136} r={11} fill="#e8821a" /><circle cx={46} cy={-134} r={10} fill="#ffc52e" />
  </g>);

/** jalur khatulistiwa: pita emas bertebal (bayangan jatuh, dinding samping, badan, sabit terang, bantalan) */
const Track: React.FC<{ d: string; w: number; drop?: number }> = ({ d, w, drop = 1 }) => (
  <g>
    <g transform={`translate(${w * 0.12} ${w * 0.8 * drop})`}>{line(d, "#0a0640", w * 1.05, 0.32)}</g>
    {line(d, "#ffd860", w * 2, 0.13)}
    {[0.42, 0.34, 0.26, 0.18, 0.1].map((k) => <g key={k} transform={`translate(0 ${w * k})`}>{line(d, k > 0.3 ? GOLD[0] : "#c05c10", w)}</g>)}
    {line(d, GOLD[2], w)}
    <g transform={`translate(0 ${w * 0.17})`}>{line(d, GOLD[1], w * 0.4)}</g>
    <path d={d} fill="none" stroke="#fff8d8" strokeWidth={w * 0.2} strokeDasharray={`${w * 0.62} ${w * 0.72}`} strokeLinecap="round" transform={`translate(0 ${-w * 0.1})`} />
    <g transform={`translate(0 ${-w * 0.37})`}>{line(d, GOLD[3], w * 0.09, 0.95, `${w * 4} ${w * 0.7} ${w * 0.4} ${w * 0.7}`)}</g>
  </g>);

/** stasiun peta rute: cakram bertebal bercincin krem; beacon = stasiun merah yang sedang dibahas (T8) */
const Station: React.FC<{ x: number; y: number; r: number; beacon?: boolean }> = ({ x, y, r, beacon }) => { const k = 0.74, h = r * 0.34; const core = beacon ? CORAL : OCEAN; return (
  <g transform={`translate(${x} ${y})`}>
    {beacon && <><Glow x={0} y={0} r={r * 3.6} c="#ff7a90" o={0.7} />
      {[-150, -120, -90, -60, -30].map((a) => { const c = Math.cos((a * Math.PI) / 180), s = Math.sin((a * Math.PI) / 180); return <g key={a}>{line(`M${c * r * 1.55} ${s * r * 1.55}L${c * r * 2.05} ${s * r * 2.05}`, "#fff2f4", r * 0.17)}</g>; })}</>}
    <ellipse cx={r * 0.18} cy={h + r * 0.3} rx={r * 1.12} ry={r * k * 0.9} fill="#0a0640" opacity={0.32} />
    <Shade d={`M${-r} 0V${h}A${r} ${r * k} 0 0 0 ${r} ${h}V0Z`} tones={CREAM} L={L} s={[r * 0.08, r * 0.26, r * 0.08]} />
    <path d={oval(0, 0, r, r * k)} fill="#f2ecff" />{line(`M${-r * 0.9} ${-r * k * 0.12}A${r * 0.9} ${r * k * 0.9} 0 0 1 ${r * 0.2} ${-r * k * 0.88}`, "#ffffff", r * 0.1)}
    <path d={oval(0, 0, r * 0.64, r * k * 0.64)} fill={core[0]} />
    <Shade d={oval(0, r * 0.05, r * 0.56, r * k * 0.54)} tones={core} L={L} s={[r * 0.05, r * 0.17, r * 0.07]} />
    <Pill x={-r * 0.22} y={-r * 0.16} h={r * 0.34} rot={52} o={0.85} />
  </g>); };

/** gerbong tanpa wajah; (x,y) = tengah di atas rel */
const Train: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-112, 0, 112].map((a, i) => <g key={a}><Shade d={rr(a - 52, -70, 104, 58, i === 2 ? 28 : 14, 10)} tones={CREAM} L={L} s={[3, 11, 6]}>
      <rect x={a - 60} y={-38} width={130} height={11} fill="#ff4f6a" /><rect x={a - 60} y={-27} width={130} height={5} fill="#ffc52e" />
      {[-34, -4, 26].map((w) => <path key={w} d={rr(a + w, -60, 20, 18, 6)} fill="#1c3fa8" />)}{[-34, -4, 26].map((w) => <g key={w}>{line(`M${a + w + 5} ${-55}l6 -1`, "#9ff4ff", 4)}</g>)}</Shade>
      <circle cx={a - 28} cy={-10} r={9} fill="#2a0f5c" /><circle cx={a + 28} cy={-10} r={9} fill="#2a0f5c" /></g>)}
  </g>);

/** pulau bertebal: dinding tebing, permukaan, bibir terang, riak air (T9); (x,y) = tengah permukaan, setengah lebar 200 */
const Island: React.FC<{ x: number; y: number; s: number; seed: number; children?: React.ReactNode }> = ({ x, y, s, seed, children }) => {
  const top = "M-200 4C-196 -30 -130 -26 -104 -44C-60 -70 10 -40 52 -50C110 -62 196 -30 202 2C206 34 140 36 100 46C40 62 -30 40 -80 48C-140 56 -206 36 -200 4Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cy={62} rx={262} ry={52} fill="#6fe6f0" opacity={0.3} /><ellipse cy={60} rx={232} ry={40} fill="#0a0a50" opacity={0.45} />
      <Shade d="M-200 4C-190 50 -150 66 -96 80C-40 96 30 70 84 78C150 78 196 44 202 2Z" tones={ROCK} L={L} s={[6, 22, 8]}><Confetti n={34} seed={seed} box={[-190, 30, 380, 55]} c="#2a0f5c" s={7} o={0.7} />{line("M-130 46l6 24M-20 52l-4 22M110 48l-8 22", "#c862b0", 7, 0.8)}</Shade>
      <g transform="translate(0 10)"><path d={top} fill={SAND[1]} /></g>
      <Shade d={top} tones={LAND} L={L} s={[4, 14, 7]}><path d="M-190 14C-100 -4 -60 26 20 16S150 -6 200 8V60H-190Z" fill="#14a386" /><Confetti n={40} seed={seed + 50} box={[-180, -40, 360, 80]} c="#d6f86a" s={5} o={0.75} /></Shade>
      {line("M-188 -6C-170 -26 -130 -24 -102 -40C-66 -60 -20 -50 8 -47", "#f6ffb0", 6)}
      {line("M-262 74q22 -9 44 0t44 0M150 90q22 -9 44 0t44 0M-60 112h54M30 112h12", "#a8f6ff", 7, 0.85)}
      {children}
    </g>);
};
const Volcano: React.FC = () => (
  <g><Glow x={0} y={-190} r={110} c="#ffb02c" o={0.8} />
    {([[10, -218, 22], [36, -244, 29], [6, -270, 19]] as [number, number, number][]).map(([a, b, r], i) => <Shade key={i} d={circ(a, b, r)} tones={["#5a1c70", "#8a2c8c", "#c8487c", "#ff9a7c"]} L={L} s={[3, 9, 5]} />)}
    <Shade d="M-130 4C-76 -40 -46 -150 -28 -178Q0 -166 28 -178C46 -150 76 -40 130 4Q0 30 -130 4Z" tones={ROCK} L={L} s={[6, 26, 9]}><Confetti n={22} seed={77} box={[-60, -110, 150, 110]} c="#4a1c80" s={6} o={0.8} /></Shade>
    <path d="M-28 -178Q0 -166 28 -178L40 -146Q30 -136 22 -118Q14 -104 9 -136Q0 -146 -5 -112Q-12 -92 -17 -130Q-30 -142 -40 -146Z" fill="#ff8a24" />{line("M-24 -174Q0 -163 22 -173", "#fff0a0", 7)}</g>);
/** kota: menara bertumpuk, kubah, atap pelana */
const Town: React.FC = () => (
  <g>{([[-122, 92, 44, 0], [-70, 140, 50, 1], [-12, 104, 58, 2], [54, 168, 42, 0], [104, 78, 46, 1]] as [number, number, number, number][]).map(([x, h, w, k], i) => { const tn = [CREAM, ["#0b4f66", "#127a98", "#22b8cc", "#a8f8f0"] as Tones, CORAL][k]; return (
    <g key={i}><Shade d={rr(x, -h, w, h + 8, i % 2 ? w / 2 : 10, 4)} tones={tn} L={L} s={[3, 12, 6]}>
      {Array.from({ length: Math.floor(h / 30) }, (_, f) => [0, 1].map((c) => <path key={`${f}${c}`} d={rr(x + 10 + c * (w / 2 - 4), -h + 24 + f * 28, w / 5, 12, 4)} fill={(f + c + i) % 3 ? "#ffe680" : "#2a1a78"} />))}</Shade>
      {i % 2 === 0 && <Shade d={`M${x - 8} ${-h + 4}Q${x + w / 2} ${-h - 36} ${x + w + 8} ${-h + 4}Z`} tones={SAND} L={L} s={[3, 10, 5]} />}
      {i === 3 && <>{line(`M${x + w / 2} ${-h}v-34`, "#f2ecff", 6)}<circle cx={x + w / 2} cy={-h - 38} r={8} fill="#ff4f6a" /></>}</g>); })}</g>);
const Boat: React.FC<{ x: number; y: number; s: number; flip?: boolean }> = ({ x, y, s, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {line("M-190 22h64M-230 38h40", "#a8f6ff", 9, 0.8)}
    <Shade d={rr(-44, -66, 62, 44, 12, 2)} tones={CREAM} L={L} s={[3, 10, 5]} /><Shade d={rr(-26, -92, 22, 30, 7, 0)} tones={CORAL} L={L} s={[2, 6, 3]} />
    {([[26, -40, "#2fd07e"], [52, -40, "#ffc52e"], [38, -62, "#ff4f6a"]] as [number, number, string][]).map(([a, b, c], i) => <path key={i} d={rr(a, b, 24, 20, 3)} fill={c} />)}
    <Shade d="M-96 -24H104Q88 24 50 26H-62Q-90 14 -96 -24Z" tones={CORAL} L={L} s={[4, 13, 6]} />{line("M-80 -10H86", "#f2ecff", 6)}
    {line("M-110 28q22 -10 44 0t44 0t44 0t44 0t44 0", "#d8fcff", 8)}
  </g>);
/** awan gugus lobus datar dua nada */
const Cloud: React.FC<{ x: number; y: number; s: number; c: [string, string, string] }> = ({ x, y, s, c: [sh, base, hi] }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><Shade d="M-150 20C-170 -8 -128 -30 -100 -20C-100 -64 -42 -80 -16 -48C4 -92 80 -80 80 -34C112 -50 154 -24 138 2C170 6 164 30 130 30H-124C-140 30 -148 28 -150 20Z" tones={[sh, sh, base, hi]} L={L} s={[4, 16, 8]} /></g>);

/* ============================== PROFIL ============================== */
/** busur putus konsentris di langit (kedalaman tanpa blur) */
const Arcs: React.FC<{ cx: number; cy: number; r0: number; n: number; c: string[]; w?: number }> = ({ cx, cy, r0, n, c, w = 5 }) => (
  <g>{Array.from({ length: n }, (_, i) => { const r = r0 + i * 17 + R(i, 3) * 8; return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={c[i % c.length]} strokeWidth={w * (0.4 + R(i, 4))} strokeLinecap="round" strokeDasharray={`${30 + R(i, 5) * 150} ${50 + R(i, 6) * 170}`} opacity={0.35 + R(i, 7) * 0.35} transform={`rotate(${R(i, 8) * 360} ${cx} ${cy})`} />; })}</g>);
const ROUTE_P = "M560 628H752L850 530H1070L1160 440H1360";
/** P1: planet dengan jalur menembusnya */
const P1: React.FC = () => (
  <Frame vignette={0.2}>
    <rect x={-100} y={-100} width={2120} height={1280} fill="#170f58" />
    <circle cx={960} cy={540} r={300} fill="#22146e" /><circle cx={960} cy={540} r={262} fill="#31198a" />
    <Arcs cx={960} cy={540} r0={226} n={6} c={["#6a5cff", "#c05cf0", "#3cc8ff"]} />
    <Glow x={960} y={540} r={330} c="#58d8ff" o={0.45} />
    <Shade d={circ(960, 540, 206)} tones={OCEAN} L={L} s={[10, 44, 15]}>
      {([["M776 446C800 392 868 366 920 384C948 396 916 424 944 442C972 470 916 492 884 476C856 462 852 500 818 494C786 490 762 478 776 446Z", 3], ["M1010 372C1060 366 1120 400 1140 444C1150 470 1102 470 1096 496C1080 524 1040 494 1050 466C1056 446 1000 440 992 410C986 388 992 374 1010 372Z", 5], ["M820 610C862 584 900 616 940 606C990 600 1010 640 984 668C962 690 940 670 916 700C888 730 850 708 850 680C848 656 790 640 820 610Z", 8], ["M1070 582C1104 560 1160 566 1166 600C1170 634 1126 628 1112 654C1096 678 1060 660 1068 632C1074 612 1046 598 1070 582Z", 11]] as [string, number][]).map(([d, k]) => <g key={k}><g transform="translate(6 11)"><path d={d} fill="#14307c" opacity={0.7} /></g><Shade d={d} tones={LAND} L={L} s={[4, 15, 6]}><Confetti n={44} seed={k * 13} box={[760, 360, 420, 360]} c="#0f8a74" s={6} o={0.8} /></Shade></g>)}
      <Confetti n={70} seed={4} box={[900, 420, 270, 330]} c="#141a6e" s={6} o={0.55} />
      {line("M800 560h40M1000 520h56M960 730h44M1110 520h22M880 352h40", "#a8f6ff", 8, 0.8)}
    </Shade>
    {line("M782 502A184 184 0 0 1 912 363", "#e8fdff", 15, 0.9)}{line("M772 546A190 190 0 0 1 773 532", "#e8fdff", 15, 0.9)}
    <circle cx={960} cy={540} r={219} fill="none" stroke="#8ff4ff" strokeWidth={6} opacity={0.4} />
    <Track d={ROUTE_P} w={40} />
    <Station x={752} y={622} r={34} /><Station x={1160} y={436} r={34} /><Station x={958} y={524} r={64} beacon />
    <Spark x={760} y={350} r={22} /><Spark x={1168} y={700} r={26} /><Spark x={1190} y={332} r={13} c="#8ff4ff" />
    <Confetti n={26} seed={90} box={[690, 270, 540, 540]} c="#c8c0ff" s={3} o={0.6} />
  </Frame>);
/** P2: tanda murni: jalur dan stasiun di atas cincin nilai warna */
const P2: React.FC = () => (
  <Frame vignette={0.18}>
    <rect x={-100} y={-100} width={2120} height={1280} fill="#1a0f5a" />
    {([[300, "#2a1478"], [252, "#471a90"], [204, "#6e229c"], [156, "#a02c94"], [108, "#d43c80"]] as [number, string][]).map(([r, c], i) => <path key={r} d={circ(960 + i * 3, 530 - i * 3, r)} fill={c} />)}
    <Arcs cx={960} cy={540} r0={190} n={7} c={["#ff8ab0", "#8a6cff", "#ffc52e"]} w={4} />
    <Glow x={960} y={530} r={240} c="#ff9a70" o={0.55} />
    <Track d="M560 640H756L868 528H1052L1164 416H1360" w={58} />
    <Station x={756} y={632} r={48} /><Station x={1164} y={408} r={48} /><Station x={960} y={518} r={80} beacon />
    <Spark x={790} y={376} r={30} /><Spark x={1146} y={668} r={22} />
  </Frame>);
/** P3: pulau terapung yang dilintasi jalur */
const P3: React.FC = () => (
  <Frame vignette={0.2}>
    <rect x={-100} y={-100} width={2120} height={1280} fill="#12307c" />
    <circle cx={960} cy={470} r={300} fill="#1858a8" /><circle cx={960} cy={450} r={220} fill="#1c86c4" /><circle cx={960} cy={436} r={146} fill="#2cb8c8" />
    <Arcs cx={960} cy={460} r0={210} n={6} c={["#8ff4ff", "#d6f86a"]} w={4} />
    <Cloud x={790} y={380} s={0.56} c={["#2cb8c8", "#a8f0e8", "#ffffff"]} /><Cloud x={1150} y={420} s={0.42} c={["#2cb8c8", "#a8f0e8", "#ffffff"]} />
    <Island x={960} y={576} s={1.12} seed={31}>
      <g transform="translate(-126 -22) scale(0.72)"><Volcano /></g><Palm x={112} y={-14} s={0.72} /><Lobes x={160} y={14} s={0.5} /><Lobes x={-30} y={-34} s={0.46} seed={4} />
    </Island>
    <Track d="M560 726H790L848 686H1068L1126 646H1360" w={36} />
    <Station x={784} y={724} r={32} /><Station x={962} y={682} r={56} beacon />
    <Spark x={820} y={300} r={20} /><Spark x={1130} y={320} r={26} />
  </Frame>);

/* ============================== BANNER ============================== */
type Sky = { bg: string[]; cloud: [string, string, string]; sea: string[]; far: [string, string]; star: boolean; sun: string };
const SENJA: Sky = { bg: ["#150c50", "#24116a", "#3a1782", "#5a1f94", "#84289a", "#b83492", "#e84c78", "#ff7c52"], cloud: ["#46188a", "#7a2c9c", "#e0607c"], sea: ["#2a7cc8", "#1c58b0", "#183c94", "#141f6c"], far: ["#6a248c", "#481878"], star: true, sun: "#ffe27a" };
const SIANG: Sky = { bg: ["#0c3c94", "#1058ac", "#1478c0", "#1c98cc", "#2cb6d0", "#58d0d0", "#98e8cc", "#e4f8c0"], cloud: ["#58c8d8", "#c8f4f0", "#ffffff"], sea: ["#22c4d0", "#189cc4", "#1470b0", "#124488"], far: ["#1c9098", "#136c8c"], star: false, sun: "#fff6a0" };
const ROUTE_B = "M-80 668H196L246 618H566L620 668H1250L1302 620H1642L1692 668H2000";
const Title: React.FC<{ y: number; s: number; w: number; c: string; d: string; children: string }> = ({ y, s, w, c, d, children }) => {
  const p = { x: 960, textAnchor: "middle" as const, fontFamily: "'Arial Black','Helvetica Neue',sans-serif", fontWeight: 900, fontSize: s, textLength: w, lengthAdjust: "spacingAndGlyphs" as const };
  return <g>{Array.from({ length: Math.round(s * 0.09) }, (_, i, ) => <text key={i} {...p} y={y + Math.round(s * 0.09) - i} fill={d}>{children}</text>)}<text {...p} y={y} fill={c}>{children}</text></g>; };
const Banner: React.FC<{ k: Sky }> = ({ k }) => (
  <Frame vignette={0.28}>
    <rect x={-200} y={-200} width={2320} height={1480} fill={k.bg[0]} />
    {k.bg.slice(1).map((c, i) => { const y = 150 + i * 66, a = 26 - i * 2; return <path key={i} d={`M-200 ${y + a}C120 ${y - a} 330 ${y + a * 1.6} 640 ${y + 6}S1110 ${y - a * 1.5} 1400 ${y + a * 0.4}S1860 ${y + a} 2120 ${y - a}V900H-200Z`} fill={c} />; })}
    {k.star && <><Confetti n={130} seed={12} box={[-40, -20, 2000, 330]} c="#cfc4ff" s={3.4} o={0.75} /><Spark x={250} y={250} r={20} /><Spark x={1640} y={170} r={26} /><Spark x={1180} y={300} r={13} /></>}
    <Glow x={960} y={610} r={640} c={k.sun} o={0.42} />
    <Cloud x={230} y={420} s={1.05} c={k.cloud} /><Cloud x={1710} y={330} s={0.85} c={k.cloud} /><Cloud x={620} y={262} s={0.46} c={k.cloud} /><Cloud x={1390} y={226} s={0.34} c={k.cloud} />
    {/* pulau jauh: siluet satu nada (T5) */}
    <path d="M-200 610Q-60 520 40 556Q96 486 170 548Q260 530 330 590Q420 560 520 612ZM1380 612Q1450 556 1520 580Q1590 500 1660 560Q1730 524 1790 566Q1900 500 2120 600Z" fill={k.far[0]} />
    <path d="M520 612Q600 584 650 596Q720 566 790 612ZM1100 612Q1190 578 1240 594Q1300 574 1380 612Z" fill={k.far[1]} />
    {/* laut melengkung berpita */}
    {k.sea.map((c, i) => { const y = [598, 668, 778, 918][i]; return <path key={i} d={`M-200 ${y + 24}Q960 ${y - 40 + i * 10} 2120 ${y + 24}V1300H-200Z`} fill={c} />; })}
    {line("M-100 614Q960 551 2020 614", "#c8fcff", 5, 0.75, "190 34 26 34")}
    {Array.from({ length: 70 }, (_, i) => <g key={i}>{line(`M${R(i, 31) * 1960 - 20} ${606 + R(i, 32) * 440}h${14 + R(i, 33) * 54}`, "#a8f6ff", 4 + R(i, 34) * 3, 0.55)}</g>)}
    <Island x={150} y={640} s={0.92} seed={3}><g transform="translate(-26 -14)"><Volcano /></g><Palm x={120} y={4} s={0.66} /><Lobes x={-142} y={16} s={0.5} /></Island>
    <Island x={1766} y={642} s={0.94} seed={8}><g transform="translate(6 -4)"><Town /></g><Palm x={-156} y={8} s={0.62} flip /><Lobes x={156} y={20} s={0.46} seed={3} /></Island>
    <Island x={560} y={820} s={0.66} seed={15}><Lobes x={-76} y={-6} s={0.75} seed={7} /><Palm x={30} y={0} s={0.86} /><Palm x={96} y={14} s={0.6} flip /></Island>
    <Island x={1370} y={850} s={0.56} seed={22}>{[-90, 0, 86].map((a, i) => <g key={a} transform={`translate(${a} ${i % 2 ? 6 : -4})`}><Shade d={rr(-28, -46, 56, 48, 8, 3)} tones={CREAM} L={L} s={[3, 9, 4]}><path d={rr(-9, -26, 18, 28, 7)} fill="#ffc52e" /></Shade><Shade d="M-42 -40L0 -86L42 -40Z" tones={i % 2 ? SAND : CORAL} L={L} s={[3, 9, 4]} /></g>)}<Lobes x={150} y={10} s={0.42} /></Island>
    <Boat x={930} y={790} s={0.78} /><Boat x={330} y={930} s={0.52} flip /><Boat x={1740} y={870} s={0.46} />
    {/* tiang penyangga jalur */}
    {[80, 400, 760, 1130, 1470, 1840].map((x) => { const y = (x > 246 && x < 566) || (x > 1302 && x < 1642) ? 630 : 680; return <g key={x}><Shade d={rr(x - 11, y, 22, 62, 4, 8)} tones={CREAM} L={L} s={[2, 8, 4]} /><ellipse cx={x} cy={y + 64} rx={30} ry={7} fill="#a8f6ff" opacity={0.6} /></g>; })}
    <Track d={ROUTE_B} w={24} />
    <Train x={406} y={611} s={0.62} />
    <Station x={668} y={664} r={31} /><Station x={1472} y={616} r={31} /><Station x={1130} y={662} r={43} beacon />
    <Title y={500} s={124} w={1010} c="#ffffff" d="#2c0c6a">EQUATOR LOGIC</Title>
    <path d={rr(515, 524, 890, 62, 31)} fill="#230a5c" opacity={0.9} />
    <text x={960} y={569} textAnchor="middle" fontFamily="'Arial Black','Helvetica Neue',sans-serif" fontWeight={900} fontSize={40} textLength={820} lengthAdjust="spacingAndGlyphs" fill="#ffe24a">WHY SOUTHEAST ASIA WORKS LIKE THIS</text>
    {[[500, 330], [546, 350], [1300, 342], [1340, 322], [1372, 348]].map(([x, y], i) => <g key={i}>{line(`M${x - 13} ${y - 6}Q${x - 6} ${y - 10} ${x} ${y}Q${x + 6} ${y - 10} ${x + 13} ${y - 6}`, "#fff0e0", 4, 0.85)}</g>)}
    {/* T6: pembingkai latar depan */}
    <Lobes x={-10} y={1100} s={2.5} tones={["#0a0a3c", "#10185a", "#1c2c78", "#4a5cc8"]} seed={5} /><Lobes x={1950} y={1096} s={2.8} tones={["#0a0a3c", "#10185a", "#1c2c78", "#4a5cc8"]} seed={9} />
    <Palm x={90} y={1130} s={1.7} /><Palm x={1850} y={1140} s={1.55} flip />
  </Frame>);
const B1: React.FC = () => <Banner k={SENJA} />;
const B2: React.FC = () => <Banner k={SIANG} />;

const still = { drift: false as const };
export default defineShots({ p1: [P1, still], p2: [P2, still], p3: [P3, still], b1: [B1, still], b2: [B2, still] });
