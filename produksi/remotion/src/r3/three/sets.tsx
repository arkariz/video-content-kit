// Lingkungan 3D berlapis: latar depan (blur), bidang utama, bangunan tengah, siluet jauh yang memudar ke kabut.
import React from "react";
import { G, Gr, M, Rod, Sky, V3 } from "./core";
import { R, mix } from "../kit";
import { House, Palm, Rails, Train } from "./props";

export const SKIES: Record<string, Sky> = {
  jkt: { top: "#6e6fb8", mid: "#f2a56e", low: "#ffd9a0", fog: "#f4b27c", sun: "#ffe2a0", sunAt: [0.76, 0.66], key: "#ffe6bf", amb: "#ffdcc4", ground: "#7a5a86" },
  tokyo: { top: "#6f93c4", mid: "#bcd3ea", low: "#e9f1f8", fog: "#bfd4e8", sun: "#ffffff", sunAt: [0.2, 0.8], key: "#f4f8ff", amb: "#e6f0ff", ground: "#7d86a6" },
  day: { top: "#4aa0d8", mid: "#a9dcef", low: "#fdf0cf", fog: "#bfe2ea", sun: "#fff4c2", sunAt: [0.78, 0.82], amb: "#eaf8ff", ground: "#8f8a6a" },
  hot: { top: "#d9603f", mid: "#f6a24c", low: "#fde3a8", fog: "#f4ad62", sun: "#fff0b0", sunAt: [0.7, 0.75], key: "#ffe7b8", amb: "#ffd7b0", ground: "#8a5a4a" },
  paper: { top: "#2f8f9a", mid: "#8fd0c8", low: "#f6e6bd", fog: "#9fd2c6", sun: "#fff3c4", sunAt: [0.5, 0.72], amb: "#f2fffb", ground: "#8a7a6a" },
  grey: { top: "#4e5670", mid: "#8e96ab", low: "#c9ccd6", fog: "#8f97ab", key: "#e8ecf8", amb: "#cdd4e8", ground: "#555068" },
  night: { top: "#0f1138", mid: "#2f2368", low: "#6a3a86", fog: "#32256a", sun: "#8f7bff", sunAt: [0.5, 0.55], key: "#cfd6ff", amb: "#8e8ee0", ground: "#2a1a48" },
  dusk: { top: "#2c1e55", mid: "#7d3f78", low: "#ee9362", fog: "#85497a", sun: "#ffb072", sunAt: [0.28, 0.55], key: "#ffd2a8", amb: "#d6a8d8", ground: "#442a58" },
  sea: { top: "#2f86c8", mid: "#86d0ea", low: "#e4f8f2", fog: "#a5dcea", sun: "#fff6c8", sunAt: [0.8, 0.8], amb: "#e4fbff", ground: "#2f6f8a" },
  map: { top: "#1d5f8f", mid: "#4fb3d4", low: "#4fb3d4", fog: "#4aa8cc", key: "#fff2d8", amb: "#dff6ff", ground: "#356a8a" },
};

const Cloud: React.FC<{ p: V3; s?: number; o?: number }> = ({ p, s = 1, o = 0.92 }) => (
  <Gr p={p} s={s}>{[[0, 0, 1.5], [1.7, -0.25, 1.05], [-1.7, -0.3, 1.0], [0.7, 0.55, 0.95]].map(([x, y, r], i) => <M key={i} g={G.ball(1, 18)} c="#ffffff" p={[x, y, 0]} s={[r, r * 0.66, r * 0.6]} o={{ opacity: o, glow: 0.35 }} noShadow noReceive />)}</Gr>
);
const Clouds: React.FC<{ t: number; n?: number; z?: number }> = ({ t, n = 6, z = -46 }) => <>{Array.from({ length: n }, (_, i) => <Cloud key={i} p={[-40 + i * (80 / n) + R(i, 2) * 8 + t * (0.18 + R(i, 3) * 0.2), 9 + R(i, 4) * 8, z - R(i, 5) * 14]} s={0.8 + R(i, 6) * 0.9} />)}</>;

/** Deret gedung berjendela pada kedalaman z. */
export const Skyline: React.FC<{ z: number; seed: string; colors: string[]; h?: [number, number]; n?: number; span?: number; win?: string }> = ({ z, seed, colors, h = [3, 10], n = 16, span = 70, win = "#fff2c8" }) => (
  <group>{Array.from({ length: n }, (_, i) => {
    const W = 2.2 + R(seed + i, 2) * 2.2, H = mix(h[0], h[1], R(seed + i, 3) ** 1.4), x = -span / 2 + (i + R(seed + i, 4) * 0.6) * (span / n), c = colors[Math.floor(R(seed + i, 5) * colors.length)];
    const rows = Math.min(7, Math.floor(H / 1.1)), zz = z - R(seed + i, 6) * 3;
    return <Gr key={i} p={[x, 0, zz]}>
      <M g={G.box(1, 1, 1, 0.04)} c={c} p={[0, H / 2, 0]} s={[W, H, 2.4]} noShadow />
      <M g={G.box(1, 0.22, 1, 0.03)} c={c} p={[0, H + 0.1, 0]} s={[W * 0.72, 1, 1.6]} noShadow />
      {R(seed + i, 7) > 0.6 && <Rod a={[0, H + 0.2, 0]} b={[0, H + 1.4, 0]} w={0.06} c={c} noShadow />}
      {Array.from({ length: rows }, (_, r) => <M key={r} g={G.box(1, 0.3, 0.05, 0)} c={R(seed + i + "w", r + 2) > 0.45 ? win : c} p={[0, 0.9 + r * 1.05, 1.22]} s={[W * 0.7, 1, 1]} o={{ glow: 0.25 }} noShadow />)}
    </Gr>;
  })}</group>
);
const Hills: React.FC<{ z: number; c: string; seed?: string }> = ({ z, c, seed = "h" }) => <>{Array.from({ length: 7 }, (_, i) => <M key={i} g={G.ball(1, 24)} c={c} p={[-42 + i * 14 + R(seed + i) * 5, -1.5, z - R(seed + i, 2) * 6]} s={[10 + R(seed + i, 3) * 5, 5 + R(seed + i, 4) * 6, 4]} noShadow />)}</>;
const Tree: React.FC<{ p: V3; s?: number; c?: string; t?: number }> = ({ p, s = 1, c = "#4f9a5f", t = 0 }) => (
  <Gr p={p} s={s} r={[0, 0, Math.sin(t * 1.1 + p[0]) * 0.025]}><M g={G.cyl(0.16, 0.22, 1.2, 12)} c="#8a5a36" p={[0, 0.6, 0]} /><M g={G.ball(0.9, 20)} c={c} p={[0, 1.75, 0]} /><M g={G.ball(0.6, 16)} c={c} p={[0.62, 1.4, 0.2]} /><M g={G.ball(0.55, 16)} c={c} p={[-0.6, 1.45, 0.15]} /></Gr>
);
const Pole: React.FC<{ p: V3; c?: string }> = ({ p, c = "#5a5566" }) => <Gr p={p}><M g={G.cyl(0.13, 0.17, 6.4, 12)} c={c} p={[0, 3.2, 0]} /><Rod a={[0, 5.9, 0]} b={[0, 5.9, 1.9]} w={0.08} c={c} /><Rod a={[0, 5.2, 0]} b={[0, 5.9, 1.4]} w={0.05} c={c} /></Gr>;
const Lamp: React.FC<{ p: V3; c?: string }> = ({ p, c = "#3d3a52" }) => <Gr p={p}><M g={G.cyl(0.12, 0.18, 4.2, 12)} c={c} p={[0, 2.1, 0]} /><M g={G.box(0.9, 0.35, 0.6, 0.15)} c={c} p={[0, 4.35, 0]} /><M g={G.ball(0.24)} c="#ffe9a0" p={[0, 4.15, 0]} o={{ glow: 0.9 }} /></Gr>;
const Bush: React.FC<{ p: V3; s?: number; c?: string }> = ({ p, s = 1, c = "#3f8a58" }) => <Gr p={p} s={s}>{[[0, 0.45, 0.65], [0.65, 0.3, 0.45], [-0.62, 0.28, 0.42]].map(([x, y, r], i) => <M key={i} g={G.ball(1, 16)} c={c} p={[x, y, i * 0.1]} s={r} />)}</Gr>;
const Motes: React.FC<{ t: number; c: string[]; n?: number }> = ({ t, c, n = 46 }) => <>{Array.from({ length: n }, (_, i) => { const y = (R(i, 3) * 12 + t * (0.15 + R(i, 5) * 0.3)) % 12; return <M key={i} g={G.ball(1, 10)} c={c[i % c.length]} p={[(R(i, 2) - 0.5) * 34 + Math.sin(t * 0.6 + i) * 0.4, y, -14 + R(i, 4) * 23]} s={0.05 + R(i, 6) ** 2 * 0.13} o={{ opacity: 0.75, glow: 0.5 }} noShadow />; })}</>;

/** Lantai bergaris: ubin yang mengecil ke kejauhan memberi perspektif. */
const Floor: React.FC<{ c: string; line: string; z0?: number; step?: number }> = ({ c, line, z0 = 0, step = 2.6 }) => (
  <group>
    <M g={G.plane(220, 160)} c={c} r={[-Math.PI / 2, 0, 0]} p={[0, -0.01, z0]} noShadow />
    {Array.from({ length: 33 }, (_, i) => <M key={"x" + i} g={G.box(0.06, 0.01, 90, 0)} c={line} p={[(i - 16) * step, 0.0, -30]} noShadow />)}
    {Array.from({ length: 22 }, (_, i) => <M key={"z" + i} g={G.box(110, 0.01, 0.06, 0)} c={line} p={[0, 0.0, 14 - i * step]} noShadow />)}
  </group>
);

export type SetProps = { t: number };
/** Stasiun/kota Jakarta. track = rel di z=0; canopy = atap peron di belakang. */
export const Station: React.FC<SetProps & { sky: "jkt" | "hot" | "day" | "grey"; track?: boolean; canopy?: boolean }> = ({ t, sky, track = true, canopy = true }) => {
  const g = { jkt: "#d3a687", hot: "#c99a6a", day: "#cdbd96", grey: "#8f8e9c" }[sky];
  const far = { jkt: ["#b3698a", "#c27a86", "#9c5c8a"], hot: ["#c4604a", "#d47a4c", "#ab4f4c"], day: ["#7fb2c4", "#97c2cb", "#6c9db6"], grey: ["#6f748c", "#7f849a", "#62667f"] }[sky];
  const mid = { jkt: ["#e9a878", "#d9876e", "#f0c08a", "#a9708c"], hot: ["#e9925a", "#d4704a", "#f2b56a"], day: ["#f0d3a0", "#e8a977", "#b9d3c4", "#f5e6c4"], grey: ["#a8a9b8", "#8e8f9f", "#bcbcc8"] }[sky];
  return (
    <group>
      <Floor c={g} line={sky === "grey" ? "#7f7e8e" : "#bd9274"} />
      {track && <Rails len={110} />}
      <M g={G.box(90, 0.34, 3.4, 0.06)} c="#e2cdb2" p={[0, 0.17, -5.2]} /><M g={G.box(90, 0.1, 0.22, 0.02)} c="#f2b632" p={[0, 0.39, -3.62]} noShadow />
      {canopy && <group>{Array.from({ length: 9 }, (_, i) => { const x = -36 + i * 9 + 2.5; return <group key={i}><M g={G.cyl(0.16, 0.2, 5.2, 12)} c="#4a6d80" p={[x, 2.9, -6.2]} /><Rod a={[x, 4.7, -6.2]} b={[x + 1.4, 5.45, -6.2]} w={0.07} c="#4a6d80" /></group>; })}
        <M g={G.box(90, 0.28, 3.2, 0.08)} c="#c9533f" p={[0, 5.65, -6.6]} /><M g={G.box(90, 0.16, 3.4, 0.04)} c="#f3e1c2" p={[0, 5.43, -6.6]} noShadow /></group>}
      {Array.from({ length: 12 }, (_, i) => <House key={i} p={[-36 + i * 6.6 + R(i, 2) * 2, 0, -11 - R(i, 3) * 4]} s={1.3 + R(i, 4) * 0.7} c={mid[i % mid.length]} />)}
      {[-24, -13, 15, 27].map((x, i) => <Palm key={x} t={t} p={[x, 0, -9 - (i % 2) * 5]} s={1.25 + R(i) * 0.35} seed={i * 2} />)}
      <Skyline z={-24} seed={"a" + sky} colors={mid} h={[4, 11]} n={17} />
      <Skyline z={-42} seed={"b" + sky} colors={far} h={[9, 20]} n={14} span={100} />
      <Clouds t={t} />
      <Lamp p={[-12.5, 0, 6.5]} /><Bush p={[11.6, 0, 8.2]} s={1.25} /><Bush p={[-9.5, 0, 9.5]} s={0.9} />
      <Motes t={t} c={["#fff2c4", "#ffd9a0"]} n={24} />
    </group>
  );
};
/** Depo Tokyo: jalur paralel dengan kereta parkir, tiang listrik, kota dingin, gunung. */
export const Tokyo: React.FC<SetProps & { track?: boolean; parked?: boolean }> = ({ t, track = true, parked = true }) => (
  <group>
    <Floor c="#b9c0cc" line="#a3abbb" />
    {track && <Rails len={110} />}
    <Rails len={110} p={[0, 0, -5.6]} /><Rails len={110} p={[0, 0, -10.4]} />
    {parked && <><Train lv="metro" n={3} p={[-31, 0.1, -10.4]} head /><Train lv="toei" n={2} p={[9, 0.1, -10.4]} /></>}
    {Array.from({ length: 8 }, (_, i) => <Pole key={i} p={[-31 + i * 9, 0, -7.9]} />)}
    <Rod a={[-45, 5.9, -6]} b={[45, 5.9, -6]} w={0.03} c="#4a4658" noShadow />
    <Skyline z={-19} seed="tk1" colors={["#9fb0cc", "#b9c6dc", "#8797b8", "#d3dbe8"]} h={[3, 9]} n={18} />
    <Skyline z={-34} seed="tk2" colors={["#8aa0c4", "#9cb0d0"]} h={[7, 16]} n={14} span={100} win="#eaf6ff" />
    <Gr p={[-17, -0.5, -62]}><M g={G.cone(24, 21, 40)} c="#7f93bc" p={[0, 10.5, 0]} noShadow /><M g={G.cone(8.3, 7.3, 40)} c="#f6fbff" p={[0, 17.45, 0.15]} noShadow /></Gr>
    <Clouds t={t} />
    <Bush p={[12.2, 0, 8.4]} s={1.1} c="#5d8a86" /><Pole p={[-13.5, 0, 5.5]} />
    <Motes t={t} c={["#ffffff"]} n={26} />
  </group>
);
/** Halaman pabrik: gudang, pagar, pohon, derek, bukit. */
export const Yard: React.FC<SetProps & { sky: "day" | "dusk" | "night" }> = ({ t, sky }) => {
  const c = { day: ["#c9ba84", "#b8a874", "#7fb06a", "#a3c48a"], dusk: ["#8a5f74", "#754f68", "#4f5a6a", "#6a5580"], night: ["#37306a", "#2c2658", "#24305a", "#322a66"] }[sky];
  return (
    <group>
      <Floor c={c[0]} line={c[1]} />
      {Array.from({ length: 6 }, (_, i) => <Gr key={i} p={[-30 + i * 12 + R(i, 2) * 3, 0, -15 - R(i, 3) * 4]}><M g={G.box(7, 3.4, 4, 0.2)} c={sky === "day" ? ["#e8c9a0", "#d3dde2", "#efdcb0"][i % 3] : c[3]} p={[0, 1.7, 0]} /><M g={G.cyl(2.1, 2.1, 7.1, 28)} c={sky === "day" ? "#b4705a" : c[2]} p={[0, 3.4, 0]} r={[0, 0, Math.PI / 2]} s={[0.55, 1, 0.95]} /></Gr>)}
      {Array.from({ length: 22 }, (_, i) => <group key={"f" + i}><M g={G.box(0.18, 1.1, 0.18, 0.04)} c="#8a7a66" p={[-32 + i * 3, 0.55, -8.5]} /></group>)}
      <M g={G.box(70, 0.14, 0.1, 0.02)} c="#8a7a66" p={[0, 0.9, -8.5]} />
      {Array.from({ length: 10 }, (_, i) => <Tree key={"t" + i} t={t} p={[-34 + i * 7.4 + R(i, 4) * 3, 0, -10 - R(i, 5) * 2]} s={1.0 + R(i, 6) * 0.6} c={c[2]} />)}
      <Gr p={[-19, 0, -21]}><M g={G.box(0.5, 13, 0.5, 0.05)} c="#f2b632" p={[0, 6.5, 0]} /><M g={G.box(10, 0.45, 0.45, 0.05)} c="#f2b632" p={[3.5, 12.8, 0]} /><Rod a={[7 + Math.sin(t * 0.5), 12.6, 0]} b={[7 + Math.sin(t * 0.5) * 1.6, 8.5, 0]} w={0.05} c="#4a4658" /><M g={G.box(1.2, 0.9, 1, 0.1)} c="#d83c33" p={[7 + Math.sin(t * 0.5) * 1.6, 8.1, 0]} /></Gr>
      <Hills z={-40} c={c[3]} seed="y" /><Hills z={-55} c={c[2]} seed="y2" />
      {sky === "day" ? <Clouds t={t} /> : <Motes t={t} c={sky === "night" ? ["#8f7bff", "#ffd23f"] : ["#ffb072", "#ffe0b0"]} n={50} />}
      <Bush p={[12.4, 0, 8]} s={1.15} c={c[2]} /><Bush p={[-12.6, 0, 7]} s={0.9} c={c[2]} />
    </group>
  );
};
/** Panggung studio untuk benda dan angka: lantai bergaris, pilar melengkung jauh, bentuk melayang (di luar fokus). */
export const Studio: React.FC<SetProps & { sky: "paper" | "grey" | "night" | "dusk" | "map" }> = ({ t, sky }) => {
  const c = { paper: ["#e8d3a4", "#d9c08e", "#4fa89f", "#e9a45f", "#f6e3b4"], grey: ["#8a8d9e", "#7b7e90", "#5f6682", "#a4a8ba", "#b9bccb"], night: ["#2d2660", "#3d3478", "#5a48a8", "#8a5ac8", "#ffd23f"], dusk: ["#6d4668", "#7d5476", "#9a4f7a", "#e08a62", "#ffc08a"], map: ["#3d96b4", "#4aa8c4", "#2f7894", "#86c474", "#bdeaf5"] }[sky];
  return (
    <group>
      <Floor c={c[0]} line={c[1]} />
      {Array.from({ length: 11 }, (_, i) => { const x = -35 + i * 7, h = 4 + R(i, 2) * 6, z = -17 - R(i, 3) * 5; return <Gr key={i} p={[x, 0, z]}><M g={G.cyl(1.25, 1.25, h, 28)} c={i % 2 ? c[2] : c[3]} p={[0, h / 2, 0]} noShadow /><M g={G.dome(1.25)} c={i % 2 ? c[2] : c[3]} p={[0, h, 0]} noShadow /></Gr>; })}
      {Array.from({ length: 5 }, (_, i) => <M key={"a" + i} g={G.torus(6.5 + R(i) * 3, 0.55, Math.PI)} c={c[2]} p={[-32 + i * 16, 0, -32]} noShadow />)}
      {Array.from({ length: 14 }, (_, i) => { const side = i % 2 ? 1 : -1, x = side * (9 + R(i, 4) * 12), y = 1.5 + R(i, 5) * 9, z = -12 + R(i, 6) * 8; const col = [c[2], c[3], c[4]][i % 3];
        return <Gr key={"f" + i} p={[x, y + Math.sin(t * 0.7 + i) * 0.45, z]} r={[t * 0.2 + i, t * 0.16 + i * 2, 0]} s={0.45 + R(i, 7) * 0.6}>{i % 3 === 0 ? <M g={G.torus(0.85, 0.3)} c={col} noShadow /> : i % 3 === 1 ? <M g={G.box(1.3, 1.3, 1.3, 0.35)} c={col} noShadow /> : <M g={G.ball(0.85)} c={col} noShadow />}</Gr>; })}
      {[[-10.5, 0.9, 8.5], [11.5, 7.2, 7.5], [-12.5, 8.4, 3]].map(([x, y, z], i) => <Gr key={"n" + i} p={[x, y + Math.sin(t * 0.9 + i * 2) * 0.3, z]} r={[t * 0.3, t * 0.22 + i, 0]}><M g={i === 1 ? G.torus(0.75, 0.27) : G.ball(0.8)} c={i % 2 ? c[3] : c[2]} noShadow /></Gr>)}
      <Motes t={t} c={[c[4], "#ffffff"]} />
    </group>
  );
};
/** Laut dengan ombak, pulau di kejauhan, awan. */
export const Sea: React.FC<SetProps> = ({ t }) => (
  <group>
    <M g={G.plane(240, 170)} c="#3d9fc2" r={[-Math.PI / 2, 0, 0]} noShadow />
    {Array.from({ length: 150 }, (_, i) => { const z = 12 - R(i, 3) * 52, x = (R(i, 2) - 0.5) * 66 + Math.sin(t * 0.7 + i) * 0.5; return <M key={i} g={G.ball(1, 10)} c={i % 3 ? "#58b6d4" : "#bfeaf4"} p={[x, 0.01, z]} s={[0.6 + R(i, 4) * 1.4, 0.07 + 0.05 * Math.sin(t * 2.2 + i), 0.12]} noShadow />; })}
    {[[-26, -30, 1.4], [20, -38, 2], [34, -24, 1]].map(([x, z, s], i) => <Gr key={i} p={[x, 0, z]} s={s}><M g={G.ball(1, 24)} c="#6fae6a" s={[6, 2.2, 3]} noShadow /><M g={G.cone(2.6, 4.2, 24)} c="#5f9a74" p={[0, 2.6, 0]} noShadow /><Palm t={t} p={[3, 1.1, 1]} s={0.7} seed={i} /></Gr>)}
    <Skyline z={-55} seed="sea" colors={["#7fb9d0", "#93c7da"]} h={[3, 8]} n={10} span={50} />
    <Clouds t={t} n={8} />
    <Motes t={t} c={["#ffffff"]} n={20} />
  </group>
);
