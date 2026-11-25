import React from "react";
import { INK } from "../toon/ctx";
import { Gadget, Person, isPerson } from "../toon/Actors";
import type { Emo } from "../toon/Face";

// Aset "papan tegak" (billboard) orisinal. Kotak gambar: w x h satuan dunia, dasar di tengah bawah.
// Gambar memakai viewBox 100 lebar; garis tinta tipis, warna datar kalem.
const L = { stroke: INK, strokeWidth: 1.6, strokeLinejoin: "round" as const };
type Draw = (o: { c?: string; frame: number; seed: number; lit: boolean }) => React.ReactNode;
type Asset = { w: number; h: number; vb: number; draw: Draw };
const win = (x: number, y: number, lit: boolean, w = 12, h = 12) => <rect x={x} y={y} width={w} height={h} fill={lit ? "#ffd966" : "#bfe0ef"} {...L} />;

export const ASSETS: Record<string, Asset> = {
  pine: { w: 1.6, h: 2.6, vb: 162, draw: ({ c }) => <g><rect x={44} y={130} width={12} height={32} fill="#7a5a3c" {...L} /><path d="M50,4 L88,82 L66,78 L96,138 L4,138 L34,78 L12,82Z" fill={c ?? "#4f8a5b"} {...L} /></g> },
  tree: { w: 2, h: 2.4, vb: 120, draw: ({ c }) => <g><rect x={44} y={76} width={12} height={44} fill="#7a5a3c" {...L} /><circle cx={50} cy={46} r={40} fill={c ?? "#6fae63"} {...L} /><circle cx={30} cy={64} r={22} fill={c ?? "#6fae63"} {...L} /></g> },
  palm: { w: 2.4, h: 3.6, vb: 150, draw: ({ c, frame, seed }) => { const s = Math.sin((frame + seed * 13) / 22) * 3; return <g><path d="M46,150 Q40,90 54,42" fill="none" stroke="#7a5a3c" strokeWidth={9} strokeLinecap="round" /><g transform={`rotate(${s} 54 42)`} fill={c ?? "#4f9a54"} {...L}><path d="M54,42 Q20,20 4,50 Q28,36 54,42Z" /><path d="M54,42 Q86,16 98,48 Q76,34 54,42Z" /><path d="M54,42 Q34,4 10,12 Q40,14 54,42Z" /><path d="M54,42 Q70,0 96,12 Q66,16 54,42Z" /></g></g>; } },
  bush: { w: 1.4, h: 0.8, vb: 57, draw: ({ c }) => <path d="M4,56 a22,22 0 0 1 20,-32 a28,28 0 0 1 48,-4 a22,22 0 0 1 24,36z" fill={c ?? "#79b36a"} {...L} /> },
  house: { w: 3, h: 2.6, vb: 87, draw: ({ c, seed, lit }) => <g><rect x={10} y={40} width={80} height={46} fill={c ?? ["#f1e2c4", "#e9d3d0", "#d8e4d0"][seed % 3]} {...L} /><path d="M2,42 L50,6 L98,42Z" fill={["#c8553d", "#a86a4a", "#7b6d8d"][seed % 3]} {...L} /><rect x={42} y={58} width={16} height={28} fill="#8a6240" {...L} />{win(20, 52, lit)}{win(68, 52, lit)}</g> },
  shop: { w: 7, h: 5.4, vb: 77, draw: ({ c, lit }) => <g><rect x={4} y={22} width={92} height={54} fill={c ?? "#f0d7aa"} {...L} /><rect x={2} y={10} width={96} height={14} fill="#8c5b34" {...L} />{[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${4 + i * 15.4},24 h15.4 v8 q-7.7,7 -15.4,0z`} fill={i % 2 ? "#fff6df" : "#e4572e"} {...L} />)}{win(10, 44, lit, 28, 22)}<rect x={46} y={44} width={18} height={32} fill="#8a6240" {...L} />{win(70, 44, lit, 20, 22)}<path d="M44,13 h14 v6 a7,6 0 0 1 -14,0z" fill="#fff6df" {...L} /></g> },
  bankhall: { w: 8, h: 6.4, vb: 80, draw: ({ c, lit }) => <g><path d="M2,26 L50,2 L98,26Z" fill="#b99b5e" {...L} /><rect x={6} y={26} width={88} height={8} fill="#c9ac6f" {...L} />{[12, 31, 59, 78].map((x) => <rect key={x} x={x} y={34} width={10} height={38} fill={c ?? "#efe3c2"} {...L} />)}<rect x={43} y={50} width={14} height={22} fill={lit ? "#ffd966" : "#6a5230"} {...L} /><rect x={2} y={72} width={96} height={7} fill="#a9a08a" {...L} /></g> },
  tower: { w: 3.4, h: 8, vb: 235, draw: ({ c, lit, seed }) => <g><rect x={8} y={6} width={84} height={228} fill={c ?? ["#9db4cf", "#b7a7c9", "#a7c4b5"][seed % 3]} {...L} />{Array.from({ length: 8 }).map((_, r) => [0, 1, 2].map((q) => <rect key={`${r}${q}`} x={18 + q * 25} y={18 + r * 26} width={15} height={15} fill={lit && (r + q + seed) % 3 ? "#ffd966" : "#e8f3fa"} {...L} />))}</g> },
  server: { w: 3, h: 4, vb: 133, draw: ({ c, frame }) => <g><rect x={8} y={6} width={84} height={124} rx={8} fill={c ?? "#4a5468"} {...L} />{[0, 1, 2, 3, 4].map((i) => <g key={i}><rect x={18} y={18 + i * 22} width={64} height={14} fill="#2e3646" {...L} /><circle cx={72} cy={25 + i * 22} r={3} fill={(Math.floor(frame / 7) + i) % 3 ? "#3ddc97" : "#f5b700"} /></g>)}</g> },
  lamp: { w: 0.8, h: 3, vb: 375, draw: ({ lit }) => <g><rect x={42} y={70} width={16} height={305} fill="#555b66" {...L} />{lit && <circle cx={50} cy={50} r={80} fill="#ffd96655" />}<circle cx={50} cy={50} r={34} fill={lit ? "#ffe08a" : "#e8e8ee"} {...L} /></g> },
  counter: { w: 3, h: 1.4, vb: 47, draw: ({ c }) => <g><rect x={4} y={10} width={92} height={36} fill={c ?? "#b98050"} {...L} /><rect x={1} y={4} width={98} height={9} fill="#8c5b34" {...L} /></g> },
  envelope: { w: 2, h: 1.3, vb: 65, draw: () => <g><rect x={4} y={4} width={92} height={58} rx={5} fill="#fff6df" {...L} strokeWidth={4} /><path d="M6,8 L50,38 L94,8" fill="none" {...L} strokeWidth={4} /></g> },
  coin: { w: 1.4, h: 1.4, vb: 100, draw: () => <g><circle cx={50} cy={50} r={46} fill="#f5b700" {...L} strokeWidth={6} /><text x={50} y={70} textAnchor="middle" fontSize={56} fontWeight={900} fill={INK}>$</text></g> },
  paper: { w: 1.4, h: 1.8, vb: 128, draw: ({ c }) => <g><path d="M8,4 h70 l16,18 v102 l-12,-8 -12,8 -12,-8 -12,8 -12,-8 -12,8 -14,-8Z" fill={c ?? "#ffffff"} {...L} strokeWidth={4} />{[34, 52, 70, 88].map((y) => <line key={y} x1={20} y1={y} x2={78} y2={y} stroke="#8a909c" strokeWidth={5} />)}</g> },
  lock: { w: 1.2, h: 1.5, vb: 125, draw: ({ c }) => <g><path d="M26,56 v-18 a24,24 0 0 1 48,0 v18" fill="none" stroke={INK} strokeWidth={12} /><rect x={12} y={54} width={76} height={66} rx={10} fill={c ?? "#f5b700"} {...L} strokeWidth={5} /><circle cx={50} cy={82} r={10} fill={INK} /></g> },
};

/** Tokoh dan objek berwajah dari toon/Actors boleh dipakai sebagai aset: "actor:you", "actor:terminal", dst. */
export const sizeOf = (asset: string) => (asset.startsWith("actor:") ? { w: 3, h: 3.8 } : ASSETS[asset] ?? { w: 1, h: 1 });
export const Sprite: React.FC<{ asset: string; x: number; y: number; w: number; h: number; color?: string; frame: number; seed: number; lit: boolean; emo?: Emo }> = ({ asset, x, y, w, h, color, frame, seed, lit, emo = "neutral" }) => {
  if (asset.startsWith("actor:")) { const k = asset.slice(6); return (<svg x={x} y={y} width={w} height={h} viewBox="0 0 300 380" overflow="visible">{isPerson(k) ? <Person kind={k} emo={emo} pose="down" blink={(frame + seed * 31) % 100 < 4 ? 0.15 : 1} /> : <Gadget kind={k} emo={emo} pose="down" blink={(frame + seed * 31) % 100 < 4 ? 0.15 : 1} cfg={{ color }} />}</svg>); }
  const a = ASSETS[asset]; if (!a) return null;
  return (<svg x={x} y={y} width={w} height={h} viewBox={`0 0 100 ${a.vb}`} preserveAspectRatio="xMidYMax meet" overflow="visible">{a.draw({ c: color, frame, seed, lit })}</svg>);
};
