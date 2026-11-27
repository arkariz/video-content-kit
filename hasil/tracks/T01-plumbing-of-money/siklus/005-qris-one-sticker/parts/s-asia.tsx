// Peta Asia stilisasi (jangkar kedua): s02, s03b, s24, s33-s35, s41, s42a, s43a, s44, s45b, s46b, dan thumbnail B/S2.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, Pill, R, clamp, mix, pop, seg, useShot, useLabel } from "@r3";
import { FarCity, Gables, Lamp, Shade, Tree, rr } from "@r3/art";
import { BLUE, CORAL, CREAM, Contact, GOLD, GREEN, Glow2, LR, P, QrGrid, STEEL, Sticker, TEALB, Tick, circ, ell, line, tw } from "./kit";
import { Birds, Lights, Puff, Shrub, Walker } from "./dekor";
import { Adapter, Back, Coin, Cross, Plug, Socket, Stack, Txt, bump, drift } from "./benda";

type V = [number, number];
export const geo = (lon: number, lat: number): V => [(lon - 35) * 15.2 + 10, (46 - lat) * 13.4 - 30];
/** bentuk daratan halus dari titik lon,lat */
const blob = (pts: V[]) => {
  const p = pts.map(([a, b]) => geo(a, b)), m = (i: number): V => { const a = p[i % p.length], b = p[(i + 1) % p.length]; return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
  return `M${m(p.length - 1).join(" ")}` + p.map((q, i) => `Q${q.join(" ")} ${m(i).join(" ")}`).join("") + "Z";
};
const MAIN = blob([[34, 62], [160, 62], [142, 50], [131, 43], [129, 40], [122, 40], [118, 38], [122, 31], [121, 27], [114, 22], [108, 21.5], [106, 20], [109, 12], [105, 8.5], [102, 12.5], [99.5, 12], [101, 7], [104, 1.4], [101, 2.6], [98.5, 8], [97.5, 16], [92, 22], [87, 21.5], [80.5, 13], [77.5, 8], [73, 17], [68, 23], [61, 25], [57, 26], [51, 29], [48, 30], [42, 37], [34, 40]]);
const ARAB = blob([[35, 31], [48, 30], [52, 25], [60, 22], [55, 17], [45, 12.5], [42, 17], [36, 27]]);
export const INDO: string[] = [
  blob([[95.2, 5.6], [98, 4], [103, 0.5], [106, -3], [106, -6], [104, -5.6], [101, -2.5], [98, 1.5]]),
  blob([[105.3, -6.4], [108, -6.3], [111, -6.5], [114.4, -7.4], [114.4, -8.6], [110, -8.1], [106.4, -7.3]]),
  blob([[109, 1], [111, 2], [114, 4], [117.5, 4.2], [118.8, 1], [116.5, -3.6], [114, -3.5], [110, -3], [109, -1]]),
  blob([[119, -5.5], [119.2, -1], [121, 1.2], [125, 1.7], [124, 0.2], [121, 0], [123.4, -1], [122.5, -4.8], [121, -3], [120.4, -5.6]]),
  blob([[131, -1], [135, -2], [141, -2.6], [141, -9], [137.5, -7.5], [135, -4.4], [132, -3.4]]),
  blob([[114.9, -8.1], [115.8, -8.5], [115.1, -8.9]]), blob([[116.2, -8.3], [119, -8.4], [119, -9], [116.4, -9]]), blob([[121, -8.4], [125, -8.4], [125, -9.2], [121, -9.2]]),
];
const OTHER = [
  blob([[130, 31], [132, 34], [136, 35], [140, 36], [141, 40], [142, 41], [140.5, 41.5], [139, 38], [136, 37], [131, 34.5]]), blob([[140, 42], [145, 43.5], [142, 45.5]]),
  blob([[126, 38.5], [129.3, 37], [129, 35], [126.3, 34.6]]), blob([[120, 18.5], [122.5, 17], [124, 13], [126, 8], [125, 6], [122, 8], [120, 14]]),
  blob([[113, -22], [122, -17], [130, -12], [136, -12], [142, -11], [146, -19], [153, -27], [150, -37], [140, -38], [130, -32], [115, -34]]), blob([[80, 9.5], [81.8, 7], [80, 6]]),
];
export const C: Record<string, V> = { bali: [115.2, -8.4], jkt: [106.8, -6.2], bkk: [100.5, 13.8], kl: [101.7, 3.1], sgp: [103.8, 1.3], tokyo: [139.7, 35.7], seoul: [127, 37.5], china: [112, 31], india: [78, 22], saudi: [45, 23.5], vietnam: [106, 17], aus: [134, -24], hub: [117, 12] };
export const at = (k: keyof typeof C) => geo(...C[k]);

export type MCam = { x: number; y: number; z: number };
/** kamera: titik lon/lat di tengah layar */
export const look = (lon: number, lat: number, z: number, t = 0, dy = 0): MCam => { const [x, y] = geo(lon, lat); return { x: x + Math.sin(t * 0.35) * 6, y: y + dy + Math.cos(t * 0.3) * 4, z }; };
export const AsiaBase: React.FC<{ t: number; cam: MCam; hi?: number; dim?: number; children?: React.ReactNode }> = ({ t, cam, hi = 1, dim = 0, children }) => (
  <>
    <defs><linearGradient id="t5sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a1236" /><stop offset="1" stopColor="#1b2c66" /></linearGradient></defs>
    <rect x={-600} y={-700} width={3200} height={2600} fill="url(#t5sea)" />
    <g transform={`translate(960 540) scale(${cam.z}) translate(${-cam.x} ${-cam.y})`}>
      {Array.from({ length: 90 }, (_, i) => <path key={i} d={`M${R(i, 2) * 2200 - 140} ${R(i, 3) * 1200 - 60}h${14 + R(i, 4) * 22}`} stroke="#5a78c8" strokeWidth={3} strokeLinecap="round" opacity={0.15 + 0.3 * Math.abs(Math.sin(t * 0.9 + i))} />)}
      {[MAIN, ARAB, ...OTHER].map((d, i) => <g key={i}><path d={d} transform="translate(0 12)" fill="#07102c" opacity={0.7} /><path d={d} fill="#2b3f72" stroke="#6a86cc" strokeWidth={3 / Math.sqrt(cam.z)} /></g>)}
      {hi > 0 && <Glow2 x={geo(118, -3)[0]} y={geo(118, -3)[1]} r={430} c="#ffb35a" o={0.28 * hi} />}
      {INDO.map((d, i) => <g key={i}><path d={d} transform="translate(0 9)" fill="#07102c" opacity={0.7} /><path d={d} fill={hi > 0.5 ? "#3f9c74" : "#2f5a80"} stroke={hi > 0.5 ? "#9ff0c4" : "#6a86cc"} strokeWidth={3 / Math.sqrt(cam.z)} /></g>)}
      <rect x={-600} y={-700} width={3200} height={2600} fill="#0a0f2c" opacity={dim} />
      {children}
    </g>
  </>
);
/** kota menyala */
export const Dot: React.FC<{ p: V; on: number; z: number; c?: string; t?: number }> = ({ p, on, z, c = P.coin, t = 0 }) => (
  <g transform={`translate(${p[0]} ${p[1]}) scale(${1 / z})`}>
    {on > 0 && <Glow2 x={0} y={0} r={90 * on} c={c} o={0.7} />}
    {on > 0 && on < 1.2 && <circle r={20 + ((t * 0.9) % 1) * 40} fill="none" stroke={c} strokeWidth={4} opacity={(1 - ((t * 0.9) % 1)) * on} />}
    <circle r={13 + on * 5} fill={on > 0.5 ? c : "#4a5a92"} stroke="#fff" strokeWidth={4} />
  </g>
);
/** kabel lengkung antar titik */
export const Cable: React.FC<{ a: V; b: V; p: number; z: number; w?: number; c?: string; dashed?: boolean; lift?: number; t?: number; flow?: boolean }> = ({ a, b, p, z, w = 9, c = "#7dffd0", dashed, lift = 0.22, t = 0, flow }) => {
  if (p <= 0) return null;
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - Math.hypot(b[0] - a[0], b[1] - a[1]) * lift, d = `M${a[0]} ${a[1]}Q${mx} ${my} ${b[0]} ${b[1]}`, k = w / z;
  if (dashed) return <path d={d} stroke={c} strokeWidth={k} fill="none" strokeLinecap="round" strokeDasharray={`${k * 2.4} ${k * 2.6}`} opacity={Math.min(1, p)} />;
  const q = clamp(p), u = clamp(p), hx = (1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * mx + u * u * b[0], hy = (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * my + u * u * b[1];
  return (<g><path d={d} pathLength={100} strokeDasharray={`${q * 100} 100`} stroke={c} strokeWidth={k * 3} opacity={0.22} fill="none" strokeLinecap="round" /><path d={d} pathLength={100} strokeDasharray={`${q * 100} 100`} stroke={c} strokeWidth={k} fill="none" strokeLinecap="round" />
    {flow && p >= 1 && <path d={d} pathLength={100} strokeDasharray="1.5 14" strokeDashoffset={-t * 22} stroke="#fff" strokeWidth={k * 0.7} fill="none" strokeLinecap="round" />}
    {p < 1 && <Glow2 x={hx} y={hy} r={70 / z} c="#fff" o={0.9} />}</g>);
};
const Tag: React.FC<{ p: V; z: number; text: string; s: number; bg?: string; dy?: number }> = ({ p, z, text, s, bg = P.green, dy = -30 }) => s <= 0.001 ? null : <g transform={`translate(${p[0]} ${p[1]}) scale(${1 / z})`}><Pill x={0} y={dy} text={text} p={s} bg={bg} size={34} /></g>;
const Counter: React.FC<{ x: number; y: number; text: string; s?: number; c?: string }> = ({ x, y, text, s = 1, c = P.coin }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path d={rr(-260, -66, 520, 120, 34)} fill={P.navy} opacity={0.9} /><Txt x={0} y={22} s={74} c={c}>{text}</Txt></g>;

/** titik acak di dalam kepulauan, urut dari Bali */
const SPOTS: V[] = (() => {
  const areas: [number, number, number, number, number][] = [[106, 114, -8, -6.4, 46], [96, 105, -4, 4, 26], [110, 117, -2.6, 2.4, 22], [119.4, 121, -5, 0, 10], [132, 140, -6.5, -2.6, 12], [115, 124, -8.9, -8.2, 8]];
  const out: V[] = [];
  areas.forEach(([a, b, c, d, n], k) => { for (let i = 0; i < n; i++) { const u = R(k * 100 + i, 2), v = R(k * 100 + i, 3); const lon = mix(a, b, u), lat = k === 1 ? mix(c, d, 1 - u) + (v - 0.5) * 2 : mix(c, d, v); out.push(geo(lon, lat)); } });
  const bali = at("bali"); return out.sort((p, q) => Math.hypot(p[0] - bali[0], p[1] - bali[1]) - Math.hypot(q[0] - bali[0], q[1] - bali[1]));
})();
const Shop: React.FC<{ p: V; s: number; z: number }> = ({ p, s, z }) => s <= 0.001 ? null : (
  <g transform={`translate(${p[0]} ${p[1]}) scale(${s / z})`}><path d={rr(-18, -22, 36, 26, 5)} fill="#fff4da" /><path d="M-24 -20L0 -42L24 -20Z" fill={P.coral} /><rect x={-7} y={-17} width={14} height={14} fill={P.navy} /></g>
);

/** s02 shot 1-2 (hold): lampu ponsel lalu penanda toko */
export const IndoMapShot: React.FC = () => {
  const { t, word } = useShot();
  const tM = tw(word("million"), 2.4), tShops = tw(word("shops"), tM + 3.5), z = mix(3.0, 2.35, seg(t, 0, 1.6, Easing.out(Easing.cubic)));
  const cam = look(118, -3, z, t, -8);
  const g = seg(t, 0.2, tM + 1, Easing.inOut(Easing.sin)), sh = seg(t, tShops - 1, tShops + 1.2);
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam}>
        {SPOTS.slice(0, Math.floor(g * SPOTS.length)).map((p, i) => <g key={i}><circle cx={p[0]} cy={p[1]} r={(9 + Math.sin(t * 3 + i) * 2) / z * 2} fill="#ffd23f" opacity={0.28} /><circle cx={p[0]} cy={p[1]} r={5.5 / z * 2} fill="#fff0a0" /></g>)}
        {SPOTS.filter((_, i) => i % 3 === 0).map((p, i, a) => <Shop key={i} p={[p[0] + 5, p[1] - 3]} s={pop(t, tShops - 1 + (i / a.length) * 2, 0.3)} z={z / 1.15} />)}
      </AsiaBase>
    </Frame>
  );
};
/** s02 shot 3: tumpukan transaksi naik 71% */
export const GrowthShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tOct = tw(word("October"), 0.4), tP = tw(word("percent"), tOct + 2), g = seg(t, tOct + 0.3, tP + 0.2, Easing.inOut(Easing.cubic));
  const n = 10 + g * 7.1;
  return (
    <Frame vignette={0.5}>
      <Back id="t5gr" stops={["#0b1236", "#24307a", "#7a4a8e"]} stars={50} t={t} />
      <Layer cam={drift(t, 1.0, 1.07, Math.max(4, dur))} d={1}>
        <path d="M-300 830H2220V1200H-300Z" fill="#1d2c58" />
        <Stack x={640} y={800} n={10} w={150} /><Txt x={640} y={900 - 20} s={40} c="#c8d4ff">Oct last year</Txt>
        <Stack x={1280} y={800} n={n} w={150} /><Txt x={1280} y={880} s={40} c="#fff4da">Oct this year</Txt>
        {line(`M470 ${800 - 10 * 36 - 30}H1560`, "#fff4da", 7, 0.75 * seg(t, 0.3, 0.8))}
        {g > 0.1 && <g>{line(`M1540 ${800 - 10 * 36 - 30}V${800 - n * 36 - 30}`, P.coral, 14)}{line(`M1515 ${800 - n * 36 - 8}L1540 ${800 - n * 36 - 34}L1565 ${800 - n * 36 - 8}`, P.coral, 14)}</g>}
      </Layer>
    </Frame>
  );
};
/** s03 shot 2: bingkai stiker meloncat ke tiga kota */
export const HopShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const keys: V[] = [at("bali"), at("bkk"), at("tokyo"), at("seoul")];
  const tB = tw(word("Bangkok"), 2), tT = tw(word("Tokyo"), tB + 0.8), tS = tw(word("Seoul"), tT + 0.8), ts = [Math.max(0.2, tB - 1.2), tB, tT, tS];
  let i = 0; while (i < 2 && t > ts[i + 1]) i++;
  const u = seg(t, ts[i], ts[i + 1], Easing.inOut(Easing.sin)), a = keys[i], b = keys[i + 1];
  const p: V = [mix(a[0], b[0], u), mix(a[1], b[1], u) - Math.sin(u * Math.PI) * 150];
  const z = 1.45, cam = look(117, 14, z, t, 0);
  const names = ["BANGKOK", "TOKYO", "SEOUL"], l = [useLabel("BANGKOK"), useLabel("TOKYO"), useLabel("SEOUL")];
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam} dim={0.18}>
        <Dot p={keys[0]} on={1} z={z} t={t} />
        {keys.slice(1).map((c, k) => <g key={k}><Dot p={c} on={t >= ts[k + 1] - 0.05 ? 1 : 0} z={z} t={t} /><Tag p={c} z={z} text={names[k]} s={l[k]} dy={k === 2 ? -34 : -30} /></g>)}
        <g transform={`translate(${p[0]} ${p[1] - (t >= tS ? 90 : 46) / z}) rotate(${Math.sin(t * 5) * 8}) scale(${1 / z})`}><Glow2 x={0} y={0} r={110} c="#ffd23f" o={0.7} /><path d={rr(-46, -66, 92, 132, 14)} fill="none" stroke="#fff4da" strokeWidth={10} /><QrGrid x={-30} y={-30} size={60} /><path d={rr(-30, -30, 60, 60, 8)} fill="none" stroke={P.coin} strokeWidth={6} /></g>
      </AsiaBase>
      {t > dur + 99 && null}
    </Frame>
  );
};
const Person: React.FC<{ x: number; y: number; s: number; c: string }> = ({ x, y, s, c }) => <g transform={`translate(${x} ${y}) scale(${s})`}><circle cy={-52} r={17} fill={c} /><path d="M-23 0V-14Q-23 -34 0 -34Q23 -34 23 -14V0Z" fill={c} /></g>;
/** s24 shot 1: enam orang per satu toko */
export const PerSixShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const t6 = tw(word("six"), 2.8), z = 2.3, cam = look(118, -3, z, t, 0);
  const big = seg(t, t6 - 1.4, t6 - 0.6);
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam} dim={big * 0.45}>
        {SPOTS.filter((_, i) => i % 4 === 0).map((p, i, a) => <g key={i} transform={`translate(${p[0]} ${p[1]}) scale(${pop(t, 0.2 + (i / a.length) * 1.6, 0.3) / z})`}><Shop p={[0, 0]} s={1} z={1} />{[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={-25 + k * 10} cy={14} r={4} fill="#fff0a0" />)}</g>)}
      </AsiaBase>
      {big > 0 && <g transform={`translate(960 560) scale(${pop(t, t6 - 1.2, 0.4)})`}><path d={rr(-620, -190, 1240, 320, 60)} fill={P.navy} opacity={0.92} />{[0, 1, 2, 3, 4, 5].map((k) => <Person key={k} x={-500 + k * 132} y={60 + Math.sin(t * 3 + k) * 5} s={1.9 * pop(t, t6 - 0.9 + k * 0.12, 0.25)} c={["#ff9a68", "#6fd8cc", "#7fb4ff", "#fff0a0", "#b490e8", "#66c795"][k]} />)}<path d="M290 -40V20M260 -10H320" stroke="#fff4da" strokeWidth={0} /><g transform="translate(450 60) scale(4.4)"><Shop p={[0, 0]} s={pop(t, t6, 0.3)} z={1} /></g></g>}
      {dur < 0 && null}
    </Frame>
  );
};
/** s24 shot 2: jalan usaha kecil */
export const StreetShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const D = Math.max(dur, 3.5), tS = tw(word("small"), 1);
  const cam = { x: mix(760, 1300, seg(t, 0, D, Easing.inOut(Easing.sin))), y: 540, z: 1.06 };
  const kinds = ["cart", "kiosk", "laundry", "phone", "market", "cart", "kiosk"];
  return (
    <Frame vignette={0.45}>
      <Back id="t5st" stops={["#1c1450", "#5c2c7c", "#e88a64"]} />
      <Layer cam={cam} d={0.15}><Glow2 x={1200} y={620} r={620} c="#ffb35a" o={0.55} /><Puff x={300 + t * 9} y={230} c="#c06c9c" o={0.7} /><Puff x={1500 + t * 6} y={300} s={0.8} c="#f09a90" o={0.65} /><Birds x={800} y={330} t={t} /></Layer>
      <Layer cam={cam} d={0.3}><FarCity x0={-600} x1={2900} base={640} seed={31} fill="#6a3888" hi="#f0a08a" t={t} lights={0.1} /></Layer>
      <Layer cam={cam} d={0.55}>{Array.from({ length: 12 }, (_, i) => <g key={i}><Gables x={-420 + i * 280} base={700 + (i % 2) * 20} n={2} w={110} h={130 + (i % 3) * 40} seed={i * 3} t={t} />{i % 2 === 0 && <Tree x={-300 + i * 280} base={760} s={1.3} seed={i} t={t} />}</g>)}</Layer>
      <Layer cam={cam} d={1}>
        <path d="M-500 790H2900V1200H-500Z" fill="#2c1850" /><path d="M-500 790H2900V822H-500Z" fill="#6a4080" /><path d="M-500 900H2900V1010H-500Z" fill="#3c2464" />{Array.from({ length: 22 }, (_, i) => <path key={i} d={rr(-460 + i * 160, 950, 74, 9, 4)} fill="#ffd27a" opacity={0.7} />)}
        {kinds.map((k, i) => { const x = -60 + i * 390, c = [BLUE, TEALB, CORAL, GREEN, GOLD, TEALB, CORAL][i], p = bump(t, tS - 0.4 + i * 0.3, 0.5); return (
          <g key={i} transform={`translate(${x} ${790 - p * 34})`}><Contact x={0} y={p * 34} w={180} />
            {k === "cart" ? <g><Shade d={rr(-130, -180, 260, 130, 20)} tones={c} L={LR} s={[5, 15, 8]} /><path d="M-160 -300Q0 -380 160 -300Z" fill={P.coral} />{line("M-110 -300V-180M110 -300V-180", "#c0d6f0", 11)}{[-80, 80].map((a) => <circle key={a} cx={a} cy={-32} r={32} fill="#160a30" />)}</g>
              : <g><Shade d={rr(-160, -270, 320, 270, 16)} tones={c} L={LR} s={[7, 20, 10]} /><path d={`M-180 -270H180L160 -330H-160Z`} fill={i % 2 ? P.cream : P.coral} />{k === "laundry" ? <g><circle cx={-60} cy={-120} r={56} fill="#fff4da" /><circle cx={-60} cy={-120} r={36} fill="#74c0e8" /><path d={`M-86 -120q26 ${-24 + Math.sin(t * 6) * 8} 52 0`} stroke="#fff" strokeWidth={8} fill="none" /></g> : k === "phone" ? <path d={rr(-95, -180, 80, 140, 18)} fill="#bfe6ff" /> : <g>{[0, 1, 2].map((j) => <circle key={j} cx={-90 + j * 55} cy={-70} r={26} fill={["#ffd23f", "#e4572e", "#66c795"][j]} />)}<rect x={-130} y={-48} width={180} height={20} rx={8} fill="#6a3340" /></g>}<path d={rr(50, -170, 80, 170, 14, 2)} fill="#201040" /></g>}
            <g transform="translate(90 -215)"><path d={rr(-34, -42, 68, 86, 10)} fill="#fffdf4" /><QrGrid x={-24} y={-22} size={48} seed={i * 9} /></g>
          </g>); })}
        {[130, 910, 1690].map((x, n) => <Lamp key={x} x={x} base={800} s={2.1} t={t + n} />)}
        <Lights x0={-300} x1={640} y={330} t={t} /><Lights x0={640} x1={1580} y={330} t={t + 1} /><Lights x0={1580} x1={2520} y={330} t={t + 2} />
        {[0, 1, 2, 3].map((n) => <Walker key={n} x={((n * 640 + (n % 2 ? -1 : 1) * t * 90 + 2900) % 2900) - 400} y={880 + (n % 2) * 40} s={0.95} t={t} seed={n * 2} c={["#2c1650", "#4a2058", "#183a5a", "#5a2448"][n]} />)}
        {[330, 1110, 1500, 2060].map((x, n) => <Shrub key={x} x={x} y={812} s={0.75} flower={n % 2 ? "#ff9a68" : "#ffd23f"} />)}
      </Layer>
    </Frame>
  );
};

/** s33 + s34: garis waktu negara tersambung */
const LINKS: { k: keyof typeof C; name: string; year: string; word: string; n?: number }[] = [
  { k: "bkk", name: "THAILAND", year: "2022", word: "Thailand" }, { k: "kl", name: "MALAYSIA", year: "2023", word: "Malaysia" }, { k: "sgp", name: "SINGAPORE", year: "", word: "Singapore" },
  { k: "tokyo", name: "JAPAN", year: "2025", word: "Japan" }, { k: "seoul", name: "S. KOREA", year: "2026", word: "Korea" }, { k: "china", name: "CHINA", year: "", word: "China" },
];
const Timebar: React.FC<{ u: number; y?: number }> = ({ u, y = 800 }) => {
  const x = (yr: number) => 380 + (yr - 2022) * 290;
  return <g><path d={rr(300, y - 6, 1320, 12, 6)} fill="#fff" opacity={0.25} /><path d={rr(300, y - 6, Math.max(12, x(u) - 300), 12, 6)} fill={P.coin} />{[2022, 2023, 2024, 2025, 2026].map((yr) => <g key={yr}><circle cx={x(yr)} cy={y} r={u >= yr - 0.05 ? 17 : 11} fill={u >= yr - 0.05 ? P.coin : "#8a9ad0"} /><Txt x={x(yr)} y={y + 56} s={34} c={u >= yr - 0.05 ? "#fff4da" : "#8a9ad0"}>{yr}</Txt></g>)}<circle cx={x(u)} cy={y} r={24} fill={P.coin} stroke="#fff" strokeWidth={5} /></g>;
};
export const LinkShot: React.FC = () => {
  const { t, word } = useShot();
  const tT = tw(word("Thailand"), 4), tM = tw(word("Malaysia"), tT + 2), tS = tw(word("Singapore"), tM + 1.6), tNow = tw(word("August"), tT - 1.6);
  const ats = [tT, tM, tS], z = 1.75, cam = look(113, 4.5, z, t);
  const year = mix(2022, 2023, seg(t, tM - 0.8, tM)) ;
  const bar = seg(t, tNow - 0.8, tNow);
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam}>
        {LINKS.slice(0, 3).map((l, i) => <g key={l.k}><Cable a={at("jkt")} b={at(l.k)} p={seg(t, ats[i] - 0.4, ats[i] + 0.4)} z={z} lift={[0.16, 0.3, -0.25][i]} t={t} flow /><Dot p={at(l.k)} on={seg(t, ats[i], ats[i] + 0.3)} z={z} t={t} c="#7dffd0" /><Tag p={at(l.k)} z={z} text={l.name} s={pop(t, ats[i], 0.3)} dy={[-26, -22, -2][i]} /></g>)}
        <Dot p={at("jkt")} on={1} z={z} t={t} />
      </AsiaBase>
      <g opacity={bar}><Timebar u={year} /></g>
    </Frame>
  );
};
export const NorthShot: React.FC = () => {
  const { t, word } = useShot();
  const tJ = tw(word("Japan"), 0.2), tK = tw(word("Korea"), tJ + 2), tC = tw(word("China"), tK + 0.6), tSix = tw(word("six"), tC + 1.6);
  const ats = [0, 0, 0, tJ, tK, tC];
  const p = seg(t, 0, 1.4), z = mix(1.75, 1.22, p), cam = look(mix(113, 118, p), mix(4.5, 11, p), z, t);
  const year = mix(mix(2023, 2025, seg(t, tJ, tJ + 0.8)), 2026, seg(t, tK - 0.7, tK));
  const n = 3 + [tJ, tK, tC].filter((a) => t >= a).length, all = bump(t, tSix, 0.9);
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam}>
        {LINKS.map((l, i) => { const a = ats[i], on = i < 3 ? 1 : seg(t, a, a + 0.3); return <g key={l.k}><Cable a={at("jkt")} b={at(l.k)} p={i < 3 ? 1 : seg(t, a - 0.5, a + 0.3)} z={z} w={9 + all * 7} lift={[0.16, 0.3, -0.25, 0.18, 0.28, 0.14][i]} t={t} flow /><Dot p={at(l.k)} on={on} z={z} t={t} c="#7dffd0" />{i >= 3 && <Tag p={at(l.k)} z={z} text={l.name} s={pop(t, a, 0.3)} dy={-28} />}</g>; })}
        <Dot p={at("jkt")} on={1} z={z} t={t} />
      </AsiaBase>
      <Timebar u={year} />
      {t < tSix - 0.1 && <Counter x={330} y={150} text={`${n} countries`} s={0.85} />}
    </Frame>
  );
};
/** s35: baht ke rupiah tanpa dolar */
const Ferryline: React.FC<{ t: number; vertical: boolean; detour: number; cross: number; solid: number; dim: number }> = ({ t, vertical, detour, cross, solid, dim }) => {
  const a: V = vertical ? [820, 340] : [430, 420], b: V = vertical ? [1100, 640] : [1480, 620], u: V = vertical ? [1110, 260] : [1240, 190];
  return (
    <g>
      <ellipse cx={a[0] - 20} cy={a[1] + 110} rx={vertical ? 140 : 270} ry={84} fill="#2b3f72" stroke="#6a86cc" strokeWidth={5} /><ellipse cx={b[0] + 20} cy={b[1] + 110} rx={vertical ? 140 : 270} ry={84} fill="#2f6a5c" stroke="#9ff0c4" strokeWidth={5} />
      <Txt x={a[0] - 20} y={a[1] + 150} s={40} c="#c8d4ff">THAILAND</Txt><Txt x={b[0] + 20} y={b[1] + 150} s={40} c="#d8ffe8">BALI</Txt>
      <path d={`M${a[0]} ${a[1]}Q${(a[0] + b[0]) / 2} ${(a[1] + b[1]) / 2 + 80} ${b[0]} ${b[1]}`} pathLength={100} strokeDasharray={`${solid * 100} 100`} stroke="#7dffd0" strokeWidth={16} fill="none" strokeLinecap="round" />
      {solid >= 1 && <path d={`M${a[0]} ${a[1]}Q${(a[0] + b[0]) / 2} ${(a[1] + b[1]) / 2 + 80} ${b[0]} ${b[1]}`} pathLength={100} strokeDasharray="1.5 12" strokeDashoffset={-t * 20} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" />}
      {detour > 0 && <path d={`M${a[0]} ${a[1] - 70}Q${a[0] + 160} ${u[1] - 70} ${u[0]} ${u[1]}Q${b[0] + 60} ${u[1] - 30} ${b[0]} ${b[1] - 80}`} stroke="#c8d4ff" strokeWidth={11} strokeDasharray="26 28" strokeDashoffset={-t * 40} fill="none" opacity={detour} strokeLinecap="round" />}
      <g transform={`translate(0 ${Math.sin(t * 2) * 6})`}><Glow2 x={a[0]} y={a[1]} r={190} c="#cfe4ff" o={0.5} /><Coin x={a[0]} y={a[1]} r={86} k="thb" /></g>
      <g transform={`translate(0 ${Math.sin(t * 2 + 2) * 6})`}><Glow2 x={b[0]} y={b[1]} r={190} c="#ffd23f" o={0.5} /><Coin x={b[0]} y={b[1]} r={86} /></g>
      <g transform={`rotate(${cross * Math.sin(t * 30) * 4 * Math.max(0, 1 - cross)} ${u[0]} ${u[1]})`} opacity={1 - dim * 0.55}><Coin x={u[0]} y={u[1]} r={78} k="usd" /></g>
      <Cross x={u[0] + 50} y={u[1] + 40} r={46} p={cross} />
    </g>
  );
};
export const NoDollarShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const tD = tw(word("dollars"), 3), solid = seg(t, Math.max(0.3, tD - 1.8), tD - 0.4);
  return <Frame vignette={0.5}><Back id="t5nd" stops={["#0a1236", "#1b2c66", "#5a4a92"]} stars={60} t={t} /><Layer cam={drift(t, 1.0, 1.07, Math.max(4, dur))} d={1}><Ferryline t={t} vertical={vertical} detour={0} cross={0} solid={solid} dim={seg(t, tD - 0.2, tD + 0.3)} /></Layer></Frame>;
};
export const GuessShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const tG = tw(word("guess"), 1), tM = tw(word("middle"), tG + 2);
  const detour = seg(t, 0.2, tG) * (1 - seg(t, tM + 0.4, tM + 1)), cross = pop(t, tM - 0.2, 0.35);
  return <Frame vignette={0.5}><Back id="t5gs" stops={["#0a1236", "#1b2c66", "#5a4a92"]} stars={60} t={t} /><Layer cam={drift(t, 1.07, 1.0, Math.max(4, dur))} d={1}><Ferryline t={t} vertical={vertical} detour={detour} cross={cross} solid={1} dim={1 - seg(t, 0, 0.3) + cross} /></Layer></Frame>;
};

/** s41 shot 1 dan 3: arus masuk ke Indonesia */
const PARTNERS: (keyof typeof C)[] = ["bkk", "kl", "sgp", "tokyo", "seoul", "china"];
const Arrow: React.FC<{ a: V; b: V; w: number; z: number; t: number; c: string; p: number }> = ({ a, b, w, z, t, c, p }) => {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  return <g opacity={p}><Cable a={a} b={b} p={p} z={z} w={w} c={c} lift={0.12} t={t} flow />{p >= 1 && <path d={`M${-w * 2.4} ${-w * 1.8}L${w * 0.8} 0L${-w * 2.4} ${w * 1.8}Z`} fill={c} transform={`translate(${b[0] - Math.cos(ang) * 30 / z} ${b[1] - Math.sin(ang) * 30 / z}) rotate(${(ang * 180) / Math.PI}) scale(${1 / z})`} />}</g>;
};
export const InflowShot: React.FC = () => {
  const { t, word } = useShot();
  const tF = tw(word("flowing"), 1.2), z = 1.25, cam = look(118, 10, z, t), thick = seg(t, tF - 0.3, tF + 0.8);
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam}>
        {PARTNERS.map((k, i) => { const target: V = geo(107 + i * 3, -3 - (i % 2) * 2); return <g key={k}><Arrow a={[at(k)[0], at(k)[1]]} b={target} w={8 + thick * 14} z={z} t={t} c="#ffd23f" p={seg(t, 0.2 + i * 0.12, 1 + i * 0.12)} /><Cable a={geo(112 + i, -4)} b={at(k)} p={seg(t, 0.9, 1.7)} z={z} w={4} c="#9ab0e8" lift={-0.16} t={t} /><Dot p={at(k)} on={1} z={z} t={t} c="#7dffd0" /></g>; })}
      </AsiaBase>
    </Frame>
  );
};
export const TwoStackShot: React.FC = () => {
  const { t, word, dur, vertical } = useShot();
  const tT = tw(word("trillion"), 2.4), t3 = tw(word("three"), tT + 2.4);
  const big = seg(t, 0.4, tT + 0.4), small = seg(t, t3 - 1.4, t3 - 0.2);
  return (
    <Frame vignette={0.5}>
      <Back id="t5ts" stops={["#0b1236", "#24307a", "#7a4a8e"]} stars={50} t={t} />
      <Layer cam={drift(t, 1.0, 1.05, Math.max(5, dur))} d={1}>
        <path d="M-300 800H2220V1200H-300Z" fill="#1d2c58" />
        <Stack x={vertical ? 760 : 560} y={770} n={big * 16} w={150} /><Stack x={vertical ? 1180 : 1360} y={770} n={small * 5} w={150} />
        <Txt x={vertical ? 760 : 560} y={862} s={38} c="#fff4da">Visitors in Indonesia</Txt><Txt x={vertical ? 1180 : 1360} y={862} s={38} c="#c8d4ff">Indonesians abroad</Txt>
      </Layer>
    </Frame>
  );
};
export const TopTwoShot: React.FC = () => {
  const { t, word } = useShot();
  const tM = tw(word("Malaysia"), 1.2), tS = tw(word("Singapore"), tM + 0.8), z = 2.5, cam = look(107, -1, z, t);
  const lm = useLabel("MALAYSIA"), ls = useLabel("SINGAPORE");
  const src: [V, V, "myr" | "sgd", number][] = [[geo(102, 4.2), geo(111, -6.8), "myr", tM], [at("sgp"), geo(104.5, -5), "sgd", tS]];
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam}>
        {src.map(([a, b, k, w], i) => <g key={k}><Arrow a={a} b={b} w={14 + bump(t, w - 0.2, 1) * 10} z={z} t={t} c="#ffd23f" p={1} />{[0, 1, 2].map((j) => { const u = (t * 0.45 + j / 3 + i * 0.17) % 1, mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.12, x = (1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * mx + u * u * b[0], y = (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * my + u * u * b[1]; return <g key={j} transform={`translate(${x} ${y}) scale(${1 / z})`}><Coin x={0} y={0} r={34} k={u > 0.8 ? "rp" : k} /></g>; })}</g>)}
        <Dot p={geo(102, 4.2)} on={1} z={z} t={t} c="#7dffd0" /><Dot p={at("sgp")} on={1} z={z} t={t} c="#7dffd0" />
        <Tag p={geo(102, 4.2)} z={z} text="MALAYSIA" s={lm} dy={-52} /><g transform={`translate(${at("sgp")[0]} ${at("sgp")[1]}) scale(${1 / z})`}><Pill x={-30} y={0} text="SINGAPORE" p={ls} bg={P.green} size={34} ptr="right" /></g>
      </AsiaBase>
    </Frame>
  );
};
/** s42 shot 1: kabel tipis */
export const ThreadsShot: React.FC = () => {
  const { t, dur } = useShot();
  const D = Math.max(dur, 4), p = seg(t, 0, D, Easing.inOut(Easing.sin)), z = mix(1.5, 1.0, p), cam = look(mix(113, 100, p), mix(8, 10, p), z, t);
  return <Frame vignette={0.65}><AsiaBase t={t} cam={cam} hi={0.4} dim={0.35 * seg(t, 0, 1.2)}>{LINKS.map((l, i) => <g key={l.k}><Cable a={at("jkt")} b={at(l.k)} p={1} z={z} w={mix(9, 4, p)} c="#8ac8e8" lift={[0.16, 0.3, -0.25, 0.18, 0.28, 0.14][i]} /><Dot p={at(l.k)} on={0.35} z={z} c="#8ac8e8" t={t} /></g>)}<Dot p={at("jkt")} on={0.6} z={z} t={t} /></AsiaBase></Frame>;
};
/** s43 shot 1: dalam pembicaraan */
export const TalksShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const p = seg(t, 0, 1.6), z = mix(1.4, 0.98, p), cam = look(mix(115, 94, p), mix(6, 4, p), z, t, -10);
  const talk: [keyof typeof C, string, number][] = [["india", "INDIA", tw(word("India"), 1.6)], ["saudi", "SAUDI", tw(word("Saudi"), 2.6)], ["vietnam", "VIETNAM", tw(word("Vietnam"), 3.4)], ["aus", "AUSTRALIA", tw(word("Australia"), 4.4)]];
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam}>
        {LINKS.map((l, i) => <Cable key={l.k} a={at("jkt")} b={at(l.k)} p={1} z={z} w={5} lift={[0.16, 0.3, -0.25, 0.18, 0.28, 0.14][i]} />)}
        {talk.map(([k, n, w], i) => <g key={k}><Cable a={at("jkt")} b={at(k)} p={seg(t, w - 0.5, w)} z={z} w={8} c="#ffd23f" dashed lift={[0.18, 0.2, -0.1, -0.2][i]} /><g transform={`translate(${at(k)[0]} ${at(k)[1]}) scale(${pop(t, w - 0.1, 0.3) / z})`}><circle r={34} fill="none" stroke="#ffd23f" strokeWidth={7} strokeDasharray="14 12" /><circle r={9} fill="#ffd23f" /></g><Tag p={at(k)} z={z} text={n} s={pop(t, w, 0.3)} bg="#8a5a2a" dy={-42} /></g>)}
        <Dot p={at("jkt")} on={1} z={z} t={t} />
        {dur < 0 && null}
      </AsiaBase>
    </Frame>
  );
};
/** s44: pusat bersama dibangun */
export const HubShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tHub = tw(word("hub"), 3), tStill = tw(word("still"), tHub + 1.4), tOne = tw(word("one"), tStill + 1.6), D = Math.max(dur, 7);
  const rise = seg(t, 0.4, tHub + 0.4, Easing.out(Easing.back(1.1))), z = 1.8, cam = look(114, 6, z, t);
  const first = seg(t, tOne - 0.4, tOne + 0.3), fan = seg(t, tOne + 0.4, Math.min(D - 0.1, tOne + 1.5));
  const hub = geo(116.5, 10.5);
  const others: V[] = [geo(78, 20), geo(101.7, 3.1), geo(103.8, 1.3), geo(100.5, 14.5), geo(123, 13)];
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam}>
        <Cable a={at("jkt")} b={hub} p={first} z={z} w={12} lift={-0.2} t={t} flow />
        {others.map((o, i) => <g key={i}><Cable a={hub} b={o} p={fan} z={z} w={9} lift={0.16} t={t} flow /><Dot p={o} on={fan} z={z} t={t} c="#7dffd0" /></g>)}
        <Dot p={at("jkt")} on={1} z={z} t={t} />
        <g transform={`translate(${hub[0]} ${hub[1]}) scale(${1 / z})`}>
          <g transform={`scale(1 ${rise})`}><Shade d={ell(0, 14, 120, 40)} tones={STEEL} L={LR} s={[4, 12, 7]} /><Shade d={rr(-90, -70, 180, 86, 30)} tones={TEALB} L={LR} s={[5, 15, 9]} /><Shade d="M-90 -66Q0 -150 90 -66Z" tones={GOLD} L={LR} s={[5, 15, 9]} />{[-48, 0, 48].map((a) => <circle key={a} cx={a} cy={-28} r={13} fill={fan > 0 ? "#7dffb8" : "#fff4da"} />)}</g>
          <g opacity={rise * (0.9 - fan * 0.3)}>{line("M-130 30V-140M130 30V-140M-130 -60H-92M92 -60H130M-130 -140L-92 -60M130 -140L92 -60", "#ffb35a", 7)}</g>
          {[-1, 1].map((s) => <g key={s} transform={`translate(${s * 150} 30)`} opacity={rise}>{line("M0 0V-200", "#ffd23f", 10)}<g transform={`translate(0 -200) rotate(${s * (8 + Math.sin(t * 1.2 + s) * 14)})`}>{line(`M0 0H${-s * 110}M${-s * 90} 0V50`, "#ffd23f", 8)}<rect x={-s * 90 - 14} y={50} width={28} height={22} rx={5} fill={P.coral} /></g></g>)}
          {t > tStill - 0.3 && <g transform={`translate(0 -250) scale(${pop(t, tStill - 0.3, 0.3)})`}><path d={rr(-160, -34, 320, 62, 20)} fill="#8a5a2a" /><Txt x={0} y={10} s={34}>STILL BUILDING</Txt></g>}
        </g>
      </AsiaBase>
    </Frame>
  );
};
/** s45 shot 2: kamera naik, ribuan lampu warung */
export const LightsShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const D = Math.max(dur, 4), p = seg(t, 0, D * 0.8, Easing.out(Easing.cubic)), z = mix(7, 2.35, p), cam = look(mix(115.2, 118, p), mix(-8.4, -3, p), z, t, -6);
  const g = seg(t, 0.2, tw(word("shops"), D - 1.2) + 0.6);
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam}>
        {SPOTS.flatMap((s, i) => [s, [s[0] + (R(i, 7) - 0.5) * 22, s[1] + (R(i, 8) - 0.5) * 14] as V]).slice(0, Math.max(1, Math.floor(g * SPOTS.length * 2))).map((s, i) => <g key={i}><circle cx={s[0]} cy={s[1]} r={8 / z} fill="#ffd23f" opacity={0.3} /><rect x={s[0] - 3.4 / z} y={s[1] - 3.4 / z} width={6.8 / z} height={6.8 / z} fill="#fffdf4" /></g>)}
      </AsiaBase>
    </Frame>
  );
};
/** s46 shot 2: adaptor masuk satu soket lagi */
export const PlugMapShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tPl = tw(word("plugged"), 0.8), tOne = tw(word("one"), tPl + 1.2), z = 1.15, cam = look(104, 8, z, t);
  const go = seg(t, 0.2, tPl + 0.2, Easing.inOut(Easing.cubic)), on = seg(t, tPl + 0.2, tPl + 0.5);
  const tgt = at("india"), p: V = [mix(at("jkt")[0], tgt[0], go), mix(at("jkt")[1], tgt[1], go) - Math.sin(go * Math.PI) * 160];
  return (
    <Frame vignette={0.5}>
      <AsiaBase t={t} cam={cam}>
        {LINKS.map((l, i) => <g key={l.k}><Cable a={at("jkt")} b={at(l.k)} p={1} z={z} w={6} lift={[0.16, 0.3, -0.25, 0.18, 0.28, 0.14][i]} t={t} flow /><Dot p={at(l.k)} on={0.8} z={z} t={t} c="#7dffd0" /></g>)}
        <Cable a={at("jkt")} b={tgt} p={on} z={z} w={9} lift={0.18} t={t} flow />
        <g transform={`translate(${tgt[0]} ${tgt[1]}) scale(${1 / z})`}>{on < 0.5 ? <circle r={44} fill="none" stroke="#ffd23f" strokeWidth={8} strokeDasharray="16 14" /> : <g><Glow2 x={0} y={0} r={180} c="#7dffb8" o={0.8} /><circle r={44} fill="#7dffb8" opacity={0.35} stroke="#7dffb8" strokeWidth={8} /></g>}</g>
        <g transform={`translate(${p[0]} ${p[1]}) scale(${(0.34 + bump(t, tPl, 0.5) * 0.1) / z})`}><Adapter x={0} y={0} t={t} /></g>
        {t > tOne && <g transform={`translate(${tgt[0]} ${tgt[1]}) scale(${1 / z})`}><g transform={`translate(0 -130) scale(${pop(t, tOne, 0.3)})`}><path d={rr(-90, -40, 180, 74, 24)} fill={P.green} /><Txt x={0} y={14} s={44}>+1 place</Txt></g></g>}
        <Dot p={at("jkt")} on={1} z={z} t={t} />
        {dur < 0 && null}
      </AsiaBase>
    </Frame>
  );
};
export const ThumbB: React.FC = () => {
  const { vertical } = useShot();
  const y = vertical ? 900 : 860, a: V = [vertical ? 710 : 520, y], b: V = [vertical ? 1210 : 1400, y];
  return (
    <Frame vignette={0.55}>
      <Back id="t5tb" stops={["#0a1236", "#243a82", "#8a4a8e"]} stars={60} t={2} />
      <path d="M-100 930Q500 840 900 960T2020 900V1200H-100Z" fill="#2b3f72" />
      <Glow2 x={960} y={y - 80} r={800} c="#ffb35a" o={0.5} />
      {line(`M${a[0]} ${y}Q960 ${y - (vertical ? 300 : 340)} ${b[0]} ${y}`, "#7dffd0", 30)}
      <Coin x={a[0]} y={y} r={150} k="thb" /><Coin x={b[0]} y={y} r={150} />
      <g transform={`translate(960 ${vertical ? 1150 : 920})`}><Coin x={0} y={0} r={vertical ? 100 : 96} k="usd" op={0.65} /><Cross x={0} y={0} r={vertical ? 90 : 86} p={1} /></g>
    </Frame>
  );
};
/** thumbnail Short 1: stiker dan aplikasi dicoret */
export const ThumbS1: React.FC = () => (
  <Frame vignette={0.5}>
    <Back id="t5s1" stops={["#241458", "#6a3484", "#f08a5c"]} />
    <Glow2 x={960} y={720} r={620} c="#ffcf6a" o={0.7} />
    <g transform="translate(960 880) scale(1.12)"><Sticker x={0} y={0} s={1} glow={0.5} /></g>
    <g transform="translate(1160 840) rotate(8)"><Shade d={rr(-100, -100, 200, 200, 48)} tones={BLUE} L={LR} s={[6, 18, 10]} /><QrGrid x={-52} y={-52} size={104} />{line("M-120 -110L120 110", P.coral, 34)}</g>
    <path d="M-100 940H2020V1200H-100Z" fill="#2c1648" />
  </Frame>
);
/** thumbnail Short 2: turis, baht ke rupiah tanpa dolar */
export const ThumbS2: React.FC = () => (
  <Frame vignette={0.5}>
    <Back id="t5s2" stops={["#0a1236", "#243a82", "#c8607c"]} stars={50} t={2} />
    <path d="M-100 1000Q600 900 960 990T2020 940V1200H-100Z" fill="#2b3f72" />
    <Glow2 x={960} y={800} r={620} c="#ffb35a" o={0.55} />
    {line("M820 720Q960 580 1100 720", "#7dffd0", 26)}
    <Coin x={805} y={760} r={92} k="thb" /><Coin x={1115} y={760} r={92} />
    <g transform="translate(960 990)"><Coin x={0} y={0} r={84} k="usd" op={0.65} /><Cross x={0} y={0} r={76} p={1} /></g>
  </Frame>
);
export const _a = { Easing, Plug, Socket, Tick, CREAM, GREEN, Sticker, circ };
