// Bagian tetap 04-shots.tsx (komponen gambar T02-001, gaya R3). File 04-shots.tsx dibuat oleh 03-script.r3.py
// dengan menempelkan file ini + daftar shot per scene. Jangan edit 04-shots.tsx langsung; ubah di sini atau di generator.
// Satu komponen Stage menggambar tiap shot dari data (items), waktu kata lewat useShot().word, label lewat ctx.label.
import React from "react";
import { Easing } from "remotion";
import { Backdrop, Dots, Frame, Glow, Items, Layer, Particles, Pill, SANS, Timeline, cast, defineShots, fade, keys, mix, pop, seg, shade, shot, useShot } from "@r3";

const T: any = cast.T02;
const { Komo, Sepuh, Aturan, Cicak, Warga, Gerbong, Rel, Kabel, Pantograf, Matahari, Awan, Gedung, Kelapa, KRL, TOEI, EKONOMI, DOORS } = T;

const LIV: Record<string, any> = {
  krl: KRL, toei: TOEI, eko: EKONOMI,
  metro: { body: "#e3e8ea", roof: "#aab3b8", band: "#2c8c86", band2: "#f2b632", window: "#2b3550", door: "#d5dbde" },
  cn: { body: "#f4f1ea", roof: "#c9c6bd", band: "#c8102e", band2: "#2b6cb0", window: "#2b3550", door: "#e6e2d6" },
  inka: { body: "#f6f2e8", roof: "#c4bfb2", band: "#e8772e", band2: "#2c8c86", window: "#2b3550", door: "#e8e3d4" },
};
const SKY: Record<string, string[]> = {
  tokyo: ["#9db7d6", "#e8eef5"], jkt: ["#f3a15f", "#fde6b4"], paper: ["#fff6dc", "#f3e0b0"], night: ["#1c1f4a", "#3b1f5e"],
  sea: ["#7cc4dd", "#d7f0f6"], dusk: ["#6d3f7a", "#f3a15f"], day: ["#8ccbe8", "#fdf1d0"], hot: ["#f08a3c", "#fde6b4"], grey: ["#b9bcc4", "#eceef2"],
};
const RED = "#d83c33", YEL = "#f2b632", TEAL = "#2c8c86";

type It = { k: string; x?: number; y?: number; s?: number; at?: number | string; [key: string]: any };
type Props = { sky?: string; ground?: string; gy?: number; cam?: number[][]; items?: It[]; map?: any; lb?: any[]; stars?: boolean };

const Stage: React.FC<Props> = ({ sky = "paper", ground, gy = 840, cam, items = [], map, lb = [] }) => {
  const c = useShot(); const { t, dur, word } = c;
  const tm = (a: any, d = 0): number => { if (typeof a === "number") return a; if (typeof a === "string" && a.startsWith("w:")) { const [, w, n] = a.split(":"); const v = word(w, n ? +n : 0); return Number.isFinite(v) ? v : d; } return d; };
  const [c0, c1] = cam ?? [[960, 540, 1], [960, 540, 1.06]];
  const u = seg(t, 0, Math.max(dur, 1.5), Easing.inOut(Easing.sin));
  const view = { x: mix(c0[0], c1[0], u), y: mix(c0[1], c1[1], u), z: mix(c0[2], c1[2], u) };
  const stops = SKY[sky] ?? SKY.paper;
  return (
    <Frame>
      <Layer cam={view} d={0}><Backdrop stops={stops} t={t} /></Layer>
      <Layer cam={view} d={1}>
        {map && <MapArt t={t} m={map} tm={tm} />}
        {!map && ground && <g><rect x={-900} y={gy} width={3700} height={900} fill={ground} /><rect x={-900} y={gy} width={3700} height={14} fill={shade(ground, 0.18)} /></g>}
        {items.map((it, i) => <Item key={i} it={it} t={t} dur={dur} tm={tm} />)}
      </Layer>
      {lb.map((l: any, i: number) => <Pill key={i} x={l[1]} y={l[2]} text={l[0]} p={c.label(l[0])} ptr={l[3] ?? "down"} bg={l[4] ?? "#e2573d"} size={l[5] ?? 40} />)}
    </Frame>
  );
};

/* ------------------------------ peta (jangkar) ------------------------------ */
const bez = (p0: number[], c: number[], p2: number[], u: number) => [(1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * c[0] + u * u * p2[0], (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * c[1] + u * u * p2[1]];
const PINS: Record<string, number[]> = { tokyo: [1590, 390], jakarta: [560, 826], bogor: [585, 852], cikarang: [655, 820], inka: [1060, 836], kota: [545, 812], china: [330, 300], java: [760, 846] };
const MapArt: React.FC<{ t: number; m: any; tm: (a: any, d?: number) => number }> = ({ t, m, tm }) => (
  <g>
    <rect x={-1200} y={-900} width={4400} height={3000} fill="#8fd0e3" />
    <path d="M-300 -200 H560 Q600 140 470 270 Q330 350 130 380 Q-60 330 -300 400 Z" fill="#d9d9ae" />
    <path d="M1500 110 Q1630 170 1680 320 Q1720 430 1630 540 Q1560 470 1565 370 Q1500 280 1410 210 Z" fill="#d2cbbb" />
    <path d="M-330 600 Q-150 640 110 800 Q220 890 190 960 Q-20 920 -190 790 Z" fill={m.hi === "sum" ? "#7fc079" : "#a9cf8e"} />
    <path d="M230 846 Q420 792 640 806 Q910 790 1190 822 Q1330 838 1270 884 Q910 906 600 894 Q330 904 230 846 Z" fill={m.hi === "jawa" ? "#8cc86f" : "#a9cf8e"} />
    <path d="M230 846 Q420 792 640 806 Q910 790 1190 822" fill="none" stroke="#fff" strokeWidth={5} opacity={0.35} />
    {(m.routes ?? []).map((r: any, i: number) => {
      const a = tm(r.at, 0.3), d = seg(t, a, a + (r.dur ?? 2.2), Easing.inOut(Easing.cubic));
      const sp = bez(r.from, r.c, r.to, d), nx = bez(r.from, r.c, r.to, Math.min(1, d + 0.02));
      const ang = (Math.atan2(nx[1] - sp[1], nx[0] - sp[0]) * 180) / Math.PI;
      const pts = Array.from({ length: 31 }, (_, k) => bez(r.from, r.c, r.to, (k / 30) * d));
      return (
        <g key={i}>
          <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={r.color ?? "#fff"} strokeWidth={8} strokeDasharray="22 16" strokeLinecap="round" opacity={0.9} />
          {r.ship && d > 0 && d < 0.999 && <g transform={`translate(${sp[0]} ${sp[1]}) rotate(${ang > 90 || ang < -90 ? ang + 180 : ang})`}>
            <path d="M-46 0 H46 L32 22 H-32 Z" fill="#3b3d46" /><rect x={-30} y={-22} width={22} height={22} fill={RED} /><rect x={-4} y={-22} width={22} height={22} fill={YEL} /><rect x={20} y={-16} width={14} height={16} fill={TEAL} />
          </g>}
        </g>
      );
    })}
    {(m.pins ?? []).map((p: any, i: number) => {
      const [name, at] = Array.isArray(p) ? p : [p, 0.4 + i * 0.25], xy = PINS[name], pp = pop(t, tm(at, 0.4), 0.3);
      return <g key={i} transform={`translate(${xy[0]} ${xy[1]}) scale(${pp * (m.pinS ?? 1)})`}><path d="M0 0 C-30 -34 -26 -62 0 -62 C26 -62 30 -34 0 0 Z" fill={RED} /><circle cy={-42} r={10} fill="#fff" /></g>;
    })}
  </g>
);

/* ------------------------------ item ------------------------------ */
const Pop: React.FC<{ x: number; y: number; p: number; children: React.ReactNode; flip?: boolean }> = ({ x, y, p, children, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -p : p} ${p}) translate(${-x} ${-y})`}>{children}</g>
);
const Train: React.FC<{ n: number; lv: any; x: number; y: number; s: number; t: number; dx?: number; head?: boolean; dirt?: number; open?: boolean; lit?: boolean; dim?: number; flip?: boolean; seed?: string; crowd?: boolean }> = ({ n, lv, x, y, s, t, dx = 0, head = true, dirt = 0, open, lit = true, dim = 0, flip, seed = "tr", crowd }) => {
  const off = dx * t, rot = -(off / 32) * 57.3;
  return (
    <g transform={`translate(${x + off} ${y}) scale(${flip ? -s : s} ${s})`}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${i * 905} 0)`}>
          {i > 0 && <rect x={-48} y={40} width={52} height={230} fill="#3d3b42" />}
          <Gerbong x={0} y={0} lv={lv} head={head && i === 0} open={open} lit={lit} dirt={dirt} dim={dim} rot={rot} seed={seed + i}
            doors={crowd ? (k: number, dxx: number) => <g><Warga x={dxx - 10} y={210} s={0.85} t={t} seed={`${seed}${i}a${k}`} dim={0.3} /><Warga x={dxx + 36} y={292} s={1.1} t={t} seed={`${seed}${i}b${k}`} hot={1} dim={0.2} expr="shock" /></g> : undefined} />
        </g>
      ))}
    </g>
  );
};
const Shirt: React.FC<{ x: number; y: number; s: number; color: string; hole?: number }> = ({ x, y, s, color, hole = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-70 -80 L-30 -96 Q0 -76 30 -96 L70 -80 L110 -30 L74 -6 L56 -30 V90 H-56 V-30 L-74 -6 L-110 -30 Z" fill={color} />
    <path d="M-30 -96 Q0 -76 30 -96" fill="none" stroke={shade(color, 0.3)} strokeWidth={8} />
    <path d="M-56 70 H56 V90 H-56 Z" fill={shade(color, 0.14)} />
    {hole > 0 && <g opacity={hole}><ellipse cx={-20} cy={20} rx={14} ry={10} fill="#fff6dc" /><ellipse cx={30} cy={-10} rx={10} ry={8} fill="#fff6dc" /><ellipse cx={8} cy={58} rx={12} ry={9} fill="#fff6dc" /></g>}
  </g>
);

const Item: React.FC<{ it: It; t: number; dur: number; tm: (a: any, d?: number) => number }> = ({ it, t, dur, tm }) => {
  const { k, x = 960, y = 700, s = 1 } = it;
  const a = tm(it.at, 0), p = pop(t, a, 0.32), z = it.out !== undefined ? 1 - seg(t, tm(it.out, 99), tm(it.out, 99) + 0.25) : 1;
  const P = p * z; if (P <= 0.001) return null;
  const ex = it.expr ?? "neutral", lk = it.look ?? 0;
  switch (k) {
    case "komo": return <Pop x={x} y={y} p={P} flip={it.flip}><Komo x={x} y={y} s={s} t={t} expr={ex} pose={it.pose ?? "idle"} look={lk} talk={it.talk ?? 0} /></Pop>;
    case "sepuh": return <Pop x={x} y={y} p={P}><Sepuh x={x} y={y} s={s} t={t} expr={it.expr ?? "tired"} roll={it.roll ? t * it.roll : 0} dim={it.dim ?? 0} sweat={it.sweat} stamp={it.stamp ? seg(t, tm(it.stampAt, 0), tm(it.stampAt, 0) + 0.3) : 0} look={lk} /></Pop>;
    case "aturan": return <Pop x={x} y={y} p={P}><Aturan x={x} y={y} s={s} t={t} expr={ex} flip={it.flip} slam={it.slamAt !== undefined ? seg(t, tm(it.slamAt), tm(it.slamAt) + 0.18) : 0} stampUp={it.slamAt !== undefined ? 1 - seg(t, tm(it.slamAt) - 0.3, tm(it.slamAt)) : 0} look={lk} /></Pop>;
    case "cicak": return <Pop x={x} y={y} p={P}><Cicak x={x} y={y} s={s} t={t} expr={ex} flip={it.flip} crawl={it.crawl} /></Pop>;
    case "warga": return <Pop x={x} y={y} p={P}><Warga x={x} y={y} s={s} t={t} seed={it.seed ?? "w"} pose={it.pose ?? "stand"} expr={ex} hot={it.hot ?? 0} flip={it.flip} /></Pop>;
    case "crowd": return <g>{Array.from({ length: it.n ?? 8 }, (_, i) => { const px = x + (i - ((it.n ?? 8) - 1) / 2) * (it.gap ?? 90) + ((i * 37) % 23), py = y + ((i * 53) % 4) * (it.dy ?? 12); return <Pop key={i} x={px} y={py} p={pop(t, a + i * (it.step ?? 0.05), 0.3) * z}><Warga x={px} y={py} s={s} t={t + i * 0.2} seed={`${it.seed ?? "c"}${i}`} pose={it.pose ?? "stand"} expr={it.expr ?? (i % 3 === 0 ? "tired" : "neutral")} hot={it.hot ?? 0} flip={i % 2 === 1} /></Pop>; })}</g>;
    case "train": return <Train n={it.n ?? 2} lv={LIV[it.lv ?? "krl"]} x={x} y={y} s={s} t={t} dx={it.dx} head={it.head !== false} dirt={it.dirt} open={it.open} lit={it.lit !== false} dim={it.dim} flip={it.flip} seed={it.seed} crowd={it.crowd} />;
    case "ship": return <g transform={`translate(${x + (it.dx ?? 0) * t} ${y + Math.sin(t * 1.6) * 5}) scale(${s})`} opacity={P}><path d="M-200 0 H200 L150 70 H-150 Z" fill="#3b3d46" />{Array.from({ length: it.n ?? 4 }, (_, i) => <g key={i} transform={`translate(${-150 + i * 78} -48)`} opacity={pop(t, a + 0.3 + i * 0.25, 0.25)}><rect width={70} height={48} rx={6} fill={LIV[it.lv ?? "toei"].band} /><rect x={8} y={12} width={54} height={20} rx={4} fill="#2b3550" /></g>)}<rect x={120} y={-60} width={50} height={60} fill="#e8e3d4" /></g>;
    case "bar": { const g = seg(t, a, a + (it.dur ?? 0.9), Easing.out(Easing.cubic)), w = it.w ?? 160, h = (it.h ?? 300) * g; return <g><rect x={x - w / 2} y={y - h} width={w} height={h} rx={14} fill={it.color ?? RED} /><rect x={x - w / 2} y={y - h} width={w} height={Math.min(h, 14)} rx={7} fill="#fff" opacity={0.25} /></g>; }
    case "coins": return <g opacity={z}>{Array.from({ length: it.n ?? 6 }, (_, i) => <g key={i} transform={`translate(${x + ((i * 7) % 5 - 2) * 4} ${y - i * 18 * s}) scale(${pop(t, a + i * 0.08, 0.25) * s})`}><ellipse rx={46} ry={16} fill={YEL} /><ellipse rx={46} ry={16} fill="none" stroke={shade(YEL, 0.3)} strokeWidth={4} /><ellipse cy={-4} rx={30} ry={9} fill="#fff" opacity={0.25} /></g>)}</g>;
    case "dots": return <Dots t={t - 0} x={x} y={y} total={it.total ?? 100} value={it.value ?? 50} cols={it.cols ?? 10} r={it.r ?? 14} gap={it.gap ?? 40} on={it.on ?? YEL} off="#ffffff" from={a + 0.2} to={a + (it.dur ?? 1.6)} appear={a} />;
    case "cars": return <Items t={t} x={x} y={y} value={it.value ?? 12} cols={it.cols ?? 12} gap={it.gap ?? [92, 70]} from={a} to={a + (it.dur ?? 1.8)} counter={false} max={it.max ?? 60} render={(i: number) => <g><rect x={-38} y={-22} width={76} height={44} rx={9} fill={it.color ?? RED} /><rect x={-38} y={8} width={76} height={9} fill={YEL} /><rect x={-28} y={-14} width={56} height={16} rx={4} fill="#2b3550" /></g>} />;
    case "timeline": return <Timeline t={t} x={x} y={y} w={it.w ?? 1200} range={it.range} marks={it.marks} upTo={it.upTo} from={a} to={a + (it.dur ?? 2.2)} color={it.color ?? YEL} />;
    case "gauge": { const g = seg(t, a, a + 0.5); return <g opacity={z}><rect x={x - 330} y={y + 70} width={660} height={34} rx={10} fill="#8c6b4a" />{[-150, 150].map((dx) => <g key={dx}><rect x={x + dx - 15} y={y - 90} width={30} height={26} rx={8} fill="#c9ced4" /><rect x={x + dx - 8} y={y - 64} width={16} height={134} fill="#aab1b9" /><rect x={x + dx - 30} y={y + 58} width={60} height={14} rx={6} fill="#c9ced4" /></g>)}<g opacity={g}><path d={`M${x - 135} ${y - 120} H${x + 135}`} stroke={RED} strokeWidth={8} strokeLinecap="round" /><path d={`M${x - 135} ${y - 140} V${y - 100} M${x + 135} ${y - 140} V${y - 100}`} stroke={RED} strokeWidth={8} /></g></g>; }
    case "bolt": { const g = seg(t, a, a + 0.25); return <g transform={`translate(${x} ${y}) scale(${s * (0.6 + 0.4 * g)})`} opacity={g * z}><Glow x={0} y={0} r={170} color="#fff27a" p={g} t={t} /><path d="M20 -120 L-60 20 H-6 L-30 120 L64 -30 H8 Z" fill="#ffd23f" stroke="#fff6dc" strokeWidth={6} strokeLinejoin="round" /></g>; }
    case "wire": return <g><Kabel y={y} base={it.base ?? 880} off={-(it.dx ?? 0) * t} x0={-900} x1={2800} /><Pantograf x={x} y={it.roof ?? y + 124} wireY={y} /></g>;
    case "factory": return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={P}><rect x={-260} y={-220} width={520} height={220} rx={14} fill="#c9a37a" /><path d="M-260 -220 L-160 -300 V-220 M-160 -220 L-60 -300 V-220 M-60 -220 L40 -300 V-220" fill="#a98660" /><rect x={160} y={-420} width={60} height={200} fill="#8f6f50" />{Array.from({ length: 6 }, (_, i) => { const q = (t * 0.5 + i / 6) % 1; return <circle key={i} cx={190 + q * 70} cy={-430 - q * 200} r={26 + q * 40} fill="#fff" opacity={0.7 * (1 - q)} />; })}<rect x={-200} y={-170} width={150} height={120} rx={10} fill="#3b3d46" />{[40, 120].map((wx) => <rect key={wx} x={wx} y={-170} width={60} height={50} rx={8} fill="#7fd3f5" opacity={0.8} />)}</g>;
    case "doc": { const g = it.markAt !== undefined ? pop(t, tm(it.markAt), 0.25) : 0; return <g transform={`translate(${x} ${y}) rotate(${it.rot ?? -4}) scale(${s * P})`}><rect x={-120} y={-160} width={240} height={320} rx={12} fill="#fffdf4" /><rect x={-120} y={-160} width={240} height={320} rx={12} fill="none" stroke="#d6c9a8" strokeWidth={6} />{[-110, -70, -30, 10].map((ly) => <rect key={ly} x={-86} y={ly} width={172 - ((ly * 7) % 50)} height={12} rx={6} fill="#c9bfa4" />)}{g > 0 && (it.mark === "no" ? <g transform={`translate(0 70) scale(${g})`}><circle r={64} fill="none" stroke={RED} strokeWidth={14} /><path d="M-40 -40 L40 40 M40 -40 L-40 40" stroke={RED} strokeWidth={16} strokeLinecap="round" /></g> : <g transform={`translate(0 70) scale(${g})`}><circle r={64} fill="none" stroke="#3ddc97" strokeWidth={14} /><path d="M-34 4 L-8 32 L38 -26" stroke="#3ddc97" strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>)}</g>; }
    case "clock": { const r = it.rate ?? 90; return <g transform={`translate(${x} ${y}) scale(${s * P})`}><circle r={120} fill="#fffdf4" stroke="#8a6a4a" strokeWidth={14} />{Array.from({ length: 12 }, (_, i) => <rect key={i} x={-4} y={-108} width={8} height={i % 3 === 0 ? 24 : 12} rx={4} fill="#8a6a4a" transform={`rotate(${i * 30})`} />)}<rect x={-5} y={-88} width={10} height={90} rx={5} fill="#26222b" transform={`rotate(${t * r})`} /><rect x={-7} y={-60} width={14} height={62} rx={6} fill={RED} transform={`rotate(${t * r / 12})`} /><circle r={10} fill="#26222b" /></g>; }
    case "cake": { const n = it.candles ?? 5; return <g transform={`translate(${x} ${y}) scale(${s * P})`}><rect x={-150} y={-90} width={300} height={90} rx={16} fill="#e9b88a" /><rect x={-150} y={-90} width={300} height={34} rx={16} fill="#fff6dc" />{Array.from({ length: n }, (_, i) => { const cx = -120 + (i * 240) / Math.max(1, n - 1); return <g key={i}><rect x={cx - 6} y={-140} width={12} height={52} rx={4} fill={i % 2 ? RED : TEAL} /><ellipse cx={cx} cy={-152 + Math.sin(t * 9 + i) * 2} rx={8} ry={14} fill="#ffd23f" /></g>; })}</g>; }
    case "wall": { const f = seg(t, tm(it.fallAt, 99), tm(it.fallAt, 99) + 1.1, Easing.in(Easing.quad)); return <g transform={`translate(${x} ${y})`}>{Array.from({ length: 5 }, (_, r) => Array.from({ length: 8 }, (_, c) => { const dxm = ((r * 7 + c * 3) % 5 - 2) * 30 * f, dym = f * (260 + ((c * 11) % 5) * 40) * (0.4 + r * 0.15); return <rect key={`${r}${c}`} x={c * 70 - 280 + (r % 2) * 30 + dxm} y={-r * 44 + dym} width={66} height={40} rx={4} fill={r % 2 ? "#a9a49c" : "#bcb6ac"} opacity={1 - f * 0.7} />; }))}</g>; }
    case "parlemen": return <g transform={`translate(${x} ${y}) scale(${s * P})`}><rect x={-260} y={-60} width={520} height={60} fill="#d9c7a0" />{[-210, -140, -70, 0, 70, 140, 210].map((cx) => <rect key={cx} x={cx - 14} y={-190} width={28} height={130} fill="#efe3c3" />)}<path d="M-280 -190 L0 -280 L280 -190 Z" fill="#c9b58a" /><path d="M-90 -280 Q0 -400 90 -280 Z" fill="#2c8c86" /></g>;
    case "confetti": return <Particles t={t} colors={[RED, YEL, TEAL, "#fff"]} n={46} speed={0.8} area={[x - 420, y - 400, x + 420, y + 200]} size={[6, 14]} opacity={0.9 * z} seed={4} />;
    case "shirt": return <Pop x={x} y={y} p={P}><Shirt x={x} y={y} s={s} color={it.color ?? TEAL} hole={it.hole ? seg(t, tm(it.holeAt, 0), tm(it.holeAt, 0) + 0.5) : 0} /></Pop>;
    case "x": { const g = pop(t, a, 0.25); return g > 0 ? <g transform={`translate(${x} ${y}) scale(${s * g})`}><path d="M-60 -60 L60 60 M60 -60 L-60 60" stroke={RED} strokeWidth={26} strokeLinecap="round" /></g> : null; }
    case "check": { const g = pop(t, a, 0.25); return g > 0 ? <g transform={`translate(${x} ${y}) scale(${s * g})`}><path d="M-60 4 L-16 50 L64 -50" stroke="#3ddc97" strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g> : null; }
    case "arrow": { const g = seg(t, a, a + 0.5), x2 = mix(x, it.x2, g), y2 = mix(y, it.y2, g), ang = Math.atan2(it.y2 - y, it.x2 - x); return <g opacity={z}><path d={`M${x} ${y} L${x2} ${y2}`} stroke={it.color ?? "#fff"} strokeWidth={14} strokeLinecap="round" /><path d={`M${x2 + Math.cos(ang + 2.6) * 40} ${y2 + Math.sin(ang + 2.6) * 40} L${x2} ${y2} L${x2 + Math.cos(ang - 2.6) * 40} ${y2 + Math.sin(ang - 2.6) * 40}`} stroke={it.color ?? "#fff"} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; }
    case "skyline": return <Gedung base={y} seed={it.seed ?? "sk"} fill={it.fill ?? "#c9b9a3"} win="#fff6dc" h={it.h ?? [90, 300]} x0={it.x0 ?? -300} x1={it.x1 ?? 2300} n={it.n ?? 24} />;
    case "palm": return <Pop x={x} y={y} p={P}><Kelapa x={x} y={y} s={s} t={t} /></Pop>;
    case "sun": return <Matahari x={x} y={y} r={it.r ?? 80} t={t} />;
    case "cloud": return <Awan x={x + t * (it.dx ?? 8)} y={y} s={s} o={it.o ?? 0.8} />;
    case "rails": return <Rel y={y} off={-(it.dx ?? 0) * t} bed={it.bed ?? "#a88f6c"} x0={-900} x1={2800} />;
    case "island": return <g transform={`translate(${x} ${y}) scale(${s * P})`}><path d="M-330 20 Q-150 -60 40 -30 Q240 -50 340 10 Q290 70 90 80 Q-120 90 -330 20 Z" fill="#a9cf8e" /><path d="M-330 20 Q-150 -60 40 -30 Q240 -50 340 10" fill="none" stroke="#fff" strokeWidth={6} opacity={0.4} /></g>;
    case "home": return <Pop x={x} y={y} p={P}><g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-60} y={-80} width={120} height={80} fill="#e0b58a" /><path d="M-80 -80 L0 -140 L80 -80 Z" fill={RED} /><rect x={-14} y={-50} width={28} height={50} fill="#7a5a36" /></g></Pop>;
    default: return null;
  }
};

/* factory: Stage dengan data tetap, dipanggil dari daftar shot */
const mk = (props: Props, opts: any = {}) => shot((() => <Stage {...props} />) as React.FC, { labels: "own", drift: false, ...opts });
