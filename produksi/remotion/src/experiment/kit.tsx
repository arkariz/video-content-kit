// Perkakas khusus eksperimen: kamera berlapis (2.5D), orang, kereta, dan latar. Tidak dipakai pipeline.
import React from "react";
import { Easing, interpolate, random } from "remotion";

export const INK = "#26222b";
export const FONT = "'Chalkboard SE','Marker Felt','Comic Sans MS',sans-serif";

/** 0→1 antara detik a dan b */
export const seg = (t: number, a: number, b: number, e: (n: number) => number = Easing.inOut(Easing.cubic)) =>
  interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
export const pop = (t: number, a: number, d = 0.4) => seg(t, a, a + d, Easing.out(Easing.back(2)));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const rnd = (seed: string) => random(seed);
export const pick = <T,>(arr: T[], seed: string) => arr[Math.floor(rnd(seed) * arr.length)];

export type Cam = { x: number; y: number; z: number };

/** Lapisan parallax: d=0 diam (langit), d=1 bidang utama, d>1 latar depan. x,y = titik yang dilihat kamera. */
export const Layer: React.FC<{ cam: Cam; d: number; children: React.ReactNode }> = ({ cam, d, children }) => {
  const z = 1 + (cam.z - 1) * d;
  const x = (cam.x - 960) * d, y = (cam.y - 540) * d;
  return <g transform={`translate(960 540) scale(${z}) translate(${-960 - x} ${-540 - y})`}>{children}</g>;
};

export const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>{children}</svg>
);

export const Sky: React.FC<{ id: string; top: string; bottom: string }> = ({ id, top, bottom }) => (
  <>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient></defs>
    <rect x={-200} y={-200} width={2320} height={1480} fill={`url(#${id})`} />
  </>
);

export const Cloud: React.FC<{ x: number; y: number; s?: number; fill?: string }> = ({ x, y, s = 1, fill = "#fff" }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 40 C-10 5 35 -5 50 12 C60 -30 125 -28 135 10 C170 -5 205 18 190 40 Z" fill={fill} opacity={0.9} />
);

export const Label: React.FC<{ x: number; y: number; text: string; size?: number; p?: number; fill?: string; color?: string }> = ({ x, y, text, size = 44, p = 1, fill = "#fff6de", color = INK }) => {
  const w = text.length * size * 0.66 + size * 1.2;
  if (p <= 0) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${p})`}>
      <rect x={-w / 2 + 6} y={-size * 0.85 + 8} width={w} height={size * 1.65} rx={size * 0.35} fill="#000" opacity={0.18} />
      <rect x={-w / 2} y={-size * 0.85} width={w} height={size * 1.65} rx={size * 0.35} fill={fill} stroke={INK} strokeWidth={4} />
      <text y={size * 0.34} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={size} fill={color}>{text}</text>
    </g>
  );
};

/* ---------------- Orang ---------------- */
const SKIN = ["#c98f66", "#a96f4b", "#e0ac82", "#8d5a3b", "#d29a72"];
const SHIRT = ["#d9534f", "#3f7cac", "#e9b44c", "#4f9d69", "#8b6bb1", "#e8e3d8", "#2e8b8b", "#cf6f3e", "#5b6770", "#c65b8a"];
const PANTS = ["#37465b", "#2d2d38", "#6b5b45", "#4a5a4a", "#5d6d8a"];
const HAIR = ["#1d1512", "#2b1d16", "#111111"];

export type Pose = "stand" | "sit" | "hang" | "cling" | "bust" | "wave" | "walk";
type PersonProps = { x: number; y: number; s?: number; seed: string; pose?: Pose; t?: number; flip?: boolean; mood?: "calm" | "happy" | "hot" | "shout"; wind?: number; shirt?: string };

const limb = (d: string, c: string, w: number) => (<><path d={d} stroke={INK} strokeWidth={w + 8} strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d={d} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" /></>);

/** Titik asal: telapak kaki (stand/walk/wave), tepi atap tempat duduk (sit), lantai pintu (hang/cling). Tinggi ±190. */
export const Person: React.FC<PersonProps> = ({ x, y, s = 1, seed, pose = "stand", t = 0, flip, mood = "calm", wind = 0, shirt: shirtProp }) => {
  const skin = pick(SKIN, seed + "k"), shirt = shirtProp ?? pick(SHIRT, seed + "s"), pants = pick(PANTS, seed + "p"), hair = pick(HAIR, seed + "h");
  const kind = pick(["hair", "hair", "hair", "cap", "hijab", "long"], seed + "t");
  const cap = pick(SHIRT, seed + "c");
  const ph = rnd(seed + "ph") * 6.28;
  const sway = Math.sin(t * (3 + wind * 5) + ph);
  const hand = (hx: number, hy: number) => <circle cx={hx} cy={hy} r={9} fill={skin} stroke={INK} strokeWidth={3.5} />;
  const head = (cx: number, cy: number) => (
    <g transform={`translate(${cx} ${cy}) rotate(${sway * (2 + wind * 5)})`}>
      {kind === "hijab" && <path d={`M-34 -4 C-36 -46 36 -46 34 -4 C36 22 ${40 + wind * 30} ${36 + sway * 6 * wind} ${26 + wind * 40} ${42 + sway * 8 * wind} C10 34 -20 40 -30 40 C-38 24 -33 10 -34 -4 Z`} fill={cap} stroke={INK} strokeWidth={4} />}
      {kind === "long" && <path d={`M-30 -6 C-34 -42 34 -42 30 -6 C${34 + wind * 30} 20 ${36 + wind * 40} ${38 + sway * 8} ${20 + wind * 30} 40 L-26 36 Z`} fill={hair} stroke={INK} strokeWidth={4} />}
      <circle r={26} fill={skin} stroke={INK} strokeWidth={4} />
      {(kind === "hair" || kind === "long") && <path d="M-27 -3 C-28 -38 28 -38 27 -3 C16 -14 6 -18 -4 -14 C-12 -10 -20 -10 -27 -3 Z" fill={hair} stroke={INK} strokeWidth={3.5} />}
      {kind === "cap" && <><path d="M-27 -8 C-24 -38 24 -38 27 -8 Z" fill={cap} stroke={INK} strokeWidth={4} /><path d="M12 -10 L40 -8" stroke={INK} strokeWidth={7} strokeLinecap="round" /></>}
      {kind === "hijab" && <path d="M-26 -6 C-20 -30 20 -30 26 -6 C10 -17 -10 -17 -26 -6 Z" fill={cap} />}
      {mood === "happy" ? <path d="M-14 -1 q5 -7 10 0 M6 -1 q5 -7 10 0" stroke={INK} strokeWidth={3.5} fill="none" strokeLinecap="round" /> : <><circle cx={-8} cy={-1} r={3.4} fill={INK} /><circle cx={10} cy={-1} r={3.4} fill={INK} /></>}
      {mood === "shout" ? <ellipse cx={1} cy={12} rx={6} ry={7} fill="#5a2020" /> : mood === "hot" ? <path d="M-6 13 q7 -4 14 0" stroke={INK} strokeWidth={3} fill="none" /> : <path d="M-6 10 q7 7 14 0" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />}
      {mood === "hot" && <path d={`M25 ${-10 + ((t * 30 + ph * 9) % 18)} q6 9 0 12 q-6 -3 0 -12`} fill="#7fd0f2" />}
    </g>
  );
  const torso = (tx: number, ty: number) => <path d={`M${tx - 25} ${ty} C${tx - 28} ${ty - 52} ${tx - 18} ${ty - 66} ${tx} ${ty - 66} C${tx + 18} ${ty - 66} ${tx + 28} ${ty - 52} ${tx + 25} ${ty} Z`} fill={shirt} stroke={INK} strokeWidth={4} />;
  let body: React.ReactNode;
  if (pose === "sit") {
    const sw = sway * (5 + wind * 10);
    body = <>
      {limb(`M-12 -6 L-18 14 L${-18 + sw} 58`, pants, 17)}{limb(`M12 -6 L18 16 L${18 + sw * 0.6} 56`, pants, 17)}
      {torso(0, 0)}
      {limb("M-20 -48 L-36 -22 L-30 0", shirt, 13)}{hand(-30, 0)}
      {rnd(seed + "arm") > 0.7 ? <>{limb(`M20 -48 L44 -70 L${52 + sway * 8} -104`, shirt, 13)}{hand(52 + sway * 8, -104)}</> : <>{limb("M20 -48 L36 -22 L30 0", shirt, 13)}{hand(30, 0)}</>}
      {head(0, -90)}
    </>;
  } else if (pose === "hang") {
    // satu tangan memegang kusen, badan condong keluar dari pintu
    const o = 26 + sway * 6 * (0.4 + wind);
    body = <>
      {limb("M-4 -70 L-8 -36 L-10 0", pants, 18)}{limb(`M12 -70 L${o + 14} -40 L${o + 22 + wind * 26} ${-8 + sway * 6}`, pants, 18)}
      <g transform={`rotate(${o} 4 -68)`}>
        {torso(4, -66)}
        {limb("M-14 -114 L-44 -128 L-52 -160", shirt, 13)}{hand(-52, -160)}
        {limb(`M22 -114 L52 -98 L${74 + wind * 14} ${-112 + sway * 14}`, shirt, 13)}{hand(74 + wind * 14, -112 + sway * 14)}
        {head(8, -156)}
      </g>
    </>;
  } else if (pose === "cling") {
    body = <>
      {limb("M-8 -66 L-12 -34 L-8 0", pants, 18)}{limb(`M10 -66 L22 -38 L${16 + sway * 5} -8`, pants, 18)}
      {torso(0, -62)}
      {limb("M-18 -112 L-40 -132 L-36 -166", shirt, 13)}{hand(-36, -166)}
      {limb("M18 -112 L38 -134 L30 -170", shirt, 13)}{hand(30, -170)}
      {head(0, -152)}
    </>;
  } else if (pose === "bust") {
    body = <>{torso(0, 0)}{head(0, -90)}</>;
  } else {
    const step = pose === "walk" ? Math.sin(t * 8 + ph) * 18 : 0;
    const bob = pose === "walk" ? -Math.abs(Math.sin(t * 8 + ph)) * 5 : Math.sin(t * 2 + ph) * 1.5;
    body = <>
      <ellipse cx={0} cy={4} rx={42} ry={9} fill="#000" opacity={0.2} />
      {limb(`M-11 -64 L${-13 + step} -4`, pants, 18)}{limb(`M11 -64 L${13 - step} -4`, pants, 18)}
      <g transform={`translate(0 ${bob})`}>
        {torso(0, -58)}
        {limb(`M-20 -106 L${-34 - step * 0.5} -62`, shirt, 13)}{hand(-34 - step * 0.5, -62)}
        {pose === "wave" ? <>{limb(`M20 -106 L46 -128 L${52 + sway * 14} -164`, shirt, 13)}{hand(52 + sway * 14, -164)}</> : <>{limb(`M20 -106 L${34 + step * 0.5} -62`, shirt, 13)}{hand(34 + step * 0.5, -62)}</>}
        {head(0, -148)}
      </g>
    </>;
  }
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>{body}</g>;
};

/* ---------------- Kereta ---------------- */
export type Livery = { body: string; roof: string; band: string; band2: string; front: string };
export const TOKYO: Livery = { body: "#dfe5ea", roof: "#aab6c0", band: "#2166b0", band2: "#2166b0", front: "#eef2f5" };
export const ECONOMY: Livery = { body: "#d8dccd", roof: "#8f9390", band: "#e07b2f", band2: "#2f7d5b", front: "#e6c54a" };

export const CAR_W = 860, CAR_H = 300, ROOF_D = 46;
export const DOORS = [150, 430, 710];

export const Wheel: React.FC<{ x: number; y: number; r?: number; rot: number }> = ({ x, y, r = 34, rot }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle r={r} fill="#3a3a42" stroke={INK} strokeWidth={5} /><circle r={r * 0.55} fill="#8d8f99" stroke={INK} strokeWidth={3} />
    <path d={`M${-r * 0.5} 0H${r * 0.5}M0 ${-r * 0.5}V${r * 0.5}`} stroke={INK} strokeWidth={4} />
  </g>
);

/** Satu gerbong tampak samping dengan bidang atap (2.5D). Titik asal = sudut kiri atas badan. */
export const Car: React.FC<{
  x: number; y: number; lv: Livery; rot?: number; head?: boolean; openDoors?: boolean; dirt?: number; lights?: boolean;
  windows?: (i: number, wx: number, wy: number, ww: number, wh: number) => React.ReactNode;
}> = ({ x, y, lv, rot = 0, head, openDoors, dirt = 0, lights = true, windows }) => {
  const wins = [[22, 62], [225, 74], [321, 62], [505, 74], [601, 62], [785, 56]] as const; // [x, lebar]
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={60} y={CAR_H - 6} width={220} height={40} rx={10} fill="#4a4a52" stroke={INK} strokeWidth={4} />
      <rect x={580} y={CAR_H - 6} width={220} height={40} rx={10} fill="#4a4a52" stroke={INK} strokeWidth={4} />
      <rect x={320} y={CAR_H} width={220} height={30} rx={6} fill="#5b5b63" stroke={INK} strokeWidth={4} />
      {[105, 235, 625, 755].map((wx) => <Wheel key={wx} x={wx} y={CAR_H + 42} rot={rot} />)}
      <path d={`M0 6 L26 ${-ROOF_D} H${CAR_W - 4} L${CAR_W} 6 Z`} fill={lv.roof} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M40 -22 H${CAR_W - 30}`} stroke="#fff" opacity={0.35} strokeWidth={6} />
      <rect x={0} y={0} width={CAR_W} height={CAR_H} rx={14} fill={lv.body} stroke={INK} strokeWidth={5} />
      {[34, 262, 275].map((yy) => <path key={yy} d={`M6 ${yy}H${CAR_W - 6}`} stroke={INK} opacity={0.18} strokeWidth={3} />)}
      <rect x={3} y={180} width={CAR_W - 6} height={26} fill={lv.band} /><rect x={3} y={212} width={CAR_W - 6} height={11} fill={lv.band2} />
      {wins.map(([wx, ww], i) => (
        <g key={i}>
          <rect x={wx} y={62} width={ww} height={106} rx={9} fill={lights ? "#9fd3ea" : "#4a5a68"} stroke={INK} strokeWidth={4} />
          {windows?.(i, wx, 62, ww, 106)}
          <path d={`M${wx + 8} 100 L${wx + 30} 70`} stroke="#fff" strokeWidth={6} opacity={0.45} strokeLinecap="round" />
        </g>
      ))}
      {DOORS.map((cx) => (
        <g key={cx}>
          <rect x={cx - 62} y={44} width={124} height={248} rx={6} fill={openDoors ? "#33313d" : "#cfd6dc"} stroke={INK} strokeWidth={5} />
          {!openDoors && <><path d={`M${cx} 44V292`} stroke={INK} strokeWidth={4} /><rect x={cx - 46} y={64} width={34} height={96} rx={8} fill={lights ? "#9fd3ea" : "#4a5a68"} stroke={INK} strokeWidth={3} /><rect x={cx + 12} y={64} width={34} height={96} rx={8} fill={lights ? "#9fd3ea" : "#4a5a68"} stroke={INK} strokeWidth={3} /></>}
        </g>
      ))}
      {dirt > 0 && <g opacity={dirt} fill="#7a5a36">
        {Array.from({ length: 70 }, (_, i) => <ellipse key={i} cx={20 + rnd("dx" + i) * (CAR_W - 40)} cy={190 + rnd("dy" + i) * 100} rx={4 + rnd("dr" + i) * 18} ry={3 + rnd("dq" + i) * 7} opacity={0.45} />)}
        {Array.from({ length: 16 }, (_, i) => <rect key={"s" + i} x={20 + rnd("sx" + i) * (CAR_W - 40)} y={6} width={5} height={50 + rnd("sh" + i) * 120} opacity={0.35} />)}
      </g>}
      {head && <g>
        <path d={`M8 0 H-46 Q-78 6 -84 70 L-90 ${CAR_H - 14} Q-90 ${CAR_H} -74 ${CAR_H} H8 Z`} fill={lv.front} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d={`M-84 70 Q-78 6 -46 0 L26 ${-ROOF_D} L0 6 Z`} fill={lv.roof} stroke={INK} strokeWidth={4} />
        <path d="M-66 54 L-12 48 V150 L-74 152 Z" fill={lights ? "#9fd3ea" : "#4a5a68"} stroke={INK} strokeWidth={4} />
        <path d="M-82 190 L8 184 V210 L-84 216 Z" fill={lv.band} />
        <circle cx={-62} cy={252} r={15} fill={lights ? "#fff3a8" : "#77756a"} stroke={INK} strokeWidth={4} />
        {lights && <path d="M-72 252 L-380 190 L-380 330 Z" fill="#fff3a8" opacity={0.14} />}
      </g>}
    </g>
  );
};

/** Gerbong mini untuk barisan di depo. Titik asal = tengah bawah. Lebar 150. */
export const MiniCar: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={4} cy={2} rx={82} ry={8} fill="#000" opacity={0.22} />
    <path d="M-72 -62 L-62 -76 H74 L72 -62 Z" fill={TOKYO.roof} stroke={INK} strokeWidth={3} />
    <rect x={-72} y={-62} width={144} height={52} rx={6} fill={TOKYO.body} stroke={INK} strokeWidth={3.5} />
    {[-62, -34, -6, 22, 50].map((wx) => <rect key={wx} x={wx} y={-52} width={18} height={20} rx={3} fill="#9fd3ea" stroke={INK} strokeWidth={2} />)}
    <rect x={-70} y={-27} width={140} height={8} fill={TOKYO.band} />
    {[-48, -24, 26, 50].map((wx) => <circle key={wx} cx={wx} cy={-6} r={8} fill="#3a3a42" stroke={INK} strokeWidth={2.5} />)}
  </g>
);

export const Rails: React.FC<{ y: number; off?: number; bed?: string }> = ({ y, off = 0, bed = "#8c8377" }) => (
  <g>
    <rect x={-900} y={y - 14} width={3720} height={90} fill={bed} />
    {Array.from({ length: 60 }, (_, i) => { const x = -900 + (((i * 66 + off) % 3960) + 3960) % 3960; return <path key={i} d={`M${x} ${y - 6} l-22 66`} stroke="#5b4636" strokeWidth={18} />; })}
    {[y, y + 42].map((yy) => <rect key={yy} x={-900} y={yy - 3} width={3720} height={11} fill="#b8bcc4" stroke={INK} strokeWidth={3} />)}
  </g>
);

/** Deretan gedung jauh */
export const Skyline: React.FC<{ base: number; seed: string; fill: string; win?: string; n?: number; h?: [number, number] }> = ({ base, seed, fill, win = "#fff", n = 26, h = [90, 320] }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const w = 70 + rnd(seed + "w" + i) * 80, hh = mix(h[0], h[1], rnd(seed + "h" + i)), x = -400 + (i * 2700) / n;
      return (<g key={i}>
        <rect x={x} y={base - hh} width={w} height={hh + 60} fill={fill} />
        {Array.from({ length: Math.floor(hh / 34) }, (_, r) => [0, 1, 2].map((c) => rnd(`${seed}${i}-${r}-${c}`) > 0.35 ? <rect key={`${r}-${c}`} x={x + 10 + c * ((w - 20) / 3)} y={base - hh + 14 + r * 34} width={(w - 40) / 3} height={14} fill={win} opacity={0.55} /> : null))}
      </g>);
    })}
  </g>
);

export const Palm: React.FC<{ x: number; y: number; s?: number; t?: number }> = ({ x, y, s = 1, t = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-8 0 C-4 -80 6 -150 26 -215 L40 -210 C22 -140 14 -70 14 0 Z" fill="#8a6244" stroke={INK} strokeWidth={4} />
    <g transform={`translate(33 -214) rotate(${Math.sin(t * 2 + x) * 3})`}>
      {[-170, -130, -85, -45, -5, 25].map((a, i) => <path key={a} transform={`rotate(${a})`} d="M0 0 C40 -30 95 -22 128 14 C85 2 40 10 0 0 Z" fill={i % 2 ? "#3f8f5a" : "#4fa566"} stroke={INK} strokeWidth={3.5} />)}
    </g>
  </g>
);

export const House: React.FC<{ x: number; y: number; s?: number; seed: string }> = ({ x, y, s = 1, seed }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-80} width={120} height={80} fill={pick(["#f1e2c6", "#e8d1cf", "#cfe0d8", "#f3d9a4"], seed)} stroke={INK} strokeWidth={4} />
    <path d="M-76 -76 L-30 -130 H30 L76 -76 Z" fill={pick(["#b8563c", "#a96b46", "#8f4a42"], seed + "r")} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-14} y={-50} width={28} height={50} fill="#7a5536" stroke={INK} strokeWidth={3} />
    {[-48, 26].map((wx) => <rect key={wx} x={wx} y={-60} width={22} height={22} fill="#bfe3ef" stroke={INK} strokeWidth={3} />)}
  </g>
);

/** Tiang dan kabel listrik aliran atas */
export const Catenary: React.FC<{ wireY: number; baseY: number; off?: number }> = ({ wireY, baseY, off = 0 }) => (
  <g stroke={INK} fill="none">
    <path d={`M-900 ${wireY}H2820`} strokeWidth={4} />
    <path d={`M-900 ${wireY - 56}H2820`} strokeWidth={2.5} />
    {Array.from({ length: 6 }, (_, i) => { const x = -900 + (((i * 640 + off) % 3840) + 3840) % 3840; return <g key={i}><path d={`M${x} ${baseY}V${wireY - 90}`} stroke="#6d737d" strokeWidth={14} /><path d={`M${x} ${wireY - 70}h120M${x + 120} ${wireY - 70}V${wireY}`} strokeWidth={5} /></g>; })}
  </g>
);
