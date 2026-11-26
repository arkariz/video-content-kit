// Benda 3D R3: kereta, rel, kapal, bangunan, dan benda infografik yang bisa dihitung. Titik asal di alas benda; gerak fungsi dari waktu.
import React from "react";
import * as THREE from "three";
import { Easing } from "remotion";
import { G, Gr, Hose, M, Rod, TextPlane, V3, poly } from "./core";
import { R, clamp, mix, pop, seg } from "../kit";

/** Muncul dengan pantulan di detik at (dan hilang di detik out), berpusat di titik asal. */
export const Pop: React.FC<{ t: number; at?: number; out?: number; p?: V3; r?: V3; s?: number; children: React.ReactNode }> = ({ t, at = -1, out, p, r, s = 1, children }) => {
  const k = (at < 0 ? 1 : pop(t, at, 0.32)) * (out === undefined ? 1 : 1 - seg(t, out, out + 0.22));
  return k <= 0.002 ? null : <Gr p={p} r={r} s={s * k}>{children}</Gr>;
};

/* ------------------------------ kereta ------------------------------ */
export type Livery = { body: string; roof: string; band: string; band2: string; window: string; door: string };
export const LIV: Record<string, Livery> = {
  krl: { body: "#f1eee4", roof: "#bdb8aa", band: "#d83c33", band2: "#f2b632", window: "#33486e", door: "#e2ddd0" },
  toei: { body: "#dfe6ec", roof: "#a9b6c2", band: "#2166b0", band2: "#5fc0e8", window: "#2b3a5c", door: "#cdd7e0" },
  eko: { body: "#c8a97c", roof: "#8d7455", band: "#a5522f", band2: "#d9a85a", window: "#3a3140", door: "#b59468" },
  metro: { body: "#e6ebed", roof: "#a9b4ba", band: "#2c8c86", band2: "#f2b632", window: "#2b3550", door: "#d5dbde" },
  cn: { body: "#faf7f0", roof: "#c9c6bd", band: "#c8102e", band2: "#2b6cb0", window: "#2b3550", door: "#e6e2d6" },
  inka: { body: "#fbf6e8", roof: "#c4bfb2", band: "#e8772e", band2: "#2c8c86", window: "#2b3550", door: "#e8e3d4" },
};
export const CAR = 8.8;
/** Satu gerbong, panjang 8,6 sepanjang +x (muka di x=0), rel di y=0. */
export const Car: React.FC<{ lv: Livery; head?: boolean; open?: boolean; lit?: boolean; roll?: number; dirt?: number; crowd?: React.ReactNode; seed?: string }> = ({ lv, head, open, lit = true, roll = 0, dirt = 0, seed = "c" }) => (
  <group>
    <M g={G.box(8.4, 0.34, 1.7, 0.1)} c="#3d3b45" p={[4.3, 0.66, 0]} />
    {[1.2, 2.2, 6.4, 7.4].map((x) => [-0.86, 0.86].map((z) => (
      <Gr key={`${x}${z}`} p={[x, 0.38, z]} r={[0, 0, -roll]}><M g={G.cyl(0.38, 0.38, 0.22)} c="#2a2a31" r={[Math.PI / 2, 0, 0]} /><M g={G.cyl(0.17, 0.17, 0.26)} c="#a2a4ad" r={[Math.PI / 2, 0, 0]} /><M g={G.box(0.46, 0.07, 0.28, 0)} c="#8a8c96" /></Gr>
    )))}
    <M g={G.box(8.6, 2.6, 2.4, 0.32)} c={lv.body} p={[4.3, 2.12, 0]} />
    <M g={G.box(8.2, 0.34, 1.9, 0.16)} c={lv.roof} p={[4.3, 3.46, 0]} />
    {[2.3, 6.2].map((x) => <M key={x} g={G.box(1.7, 0.26, 1.2, 0.08)} c={lv.roof} p={[x, 3.7, 0]} />)}
    <M g={G.box(8.62, 0.28, 2.43, 0.06)} c={lv.band} p={[4.3, 1.38, 0]} /><M g={G.box(8.63, 0.1, 2.44, 0.02)} c={lv.band2} p={[4.3, 1.14, 0]} />
    <M g={G.box(8.3, 0.12, 2.44, 0.02)} c={lv.band} p={[4.3, 3.12, 0]} />
    {[-1, 1].map((side) => (
      <Gr key={side} p={[0, 0, side * 1.21]}>
        {[0.95, 3.35, 5.25, 7.65].map((x) => <group key={x}><M g={G.box(0.98, 0.98, 0.06, 0.12)} c={lv.roof} p={[x, 2.3, 0]} /><M g={G.box(0.86, 0.86, 0.08, 0.1)} c={lit ? "#bfe4f2" : lv.window} p={[x, 2.3, 0.005 * side]} o={lit ? { glow: 0.28 } : undefined} />
          <M g={G.box(0.14, 0.72, 0.02, 0.01)} c="#ffffff" p={[x - 0.2, 2.34, side * 0.05]} r={[0, 0, -0.5]} o={{ basic: true, opacity: 0.35 }} /></group>)}
        {[2.15, 6.45].map((x) => open && side > 0 ? (
          <group key={x}><M g={G.box(1.16, 2.1, 0.08, 0.03)} c="#241d2b" p={[x, 1.93, -0.005]} />
            <M g={G.box(0.2, 2.1, 0.12, 0.03)} c={lv.door} p={[x - 0.7, 1.93, 0.04]} /><M g={G.box(0.2, 2.1, 0.12, 0.03)} c={lv.door} p={[x + 0.7, 1.93, 0.04]} />
            <Rod a={[x, 0.95, 0.1]} b={[x, 2.9, 0.1]} w={0.035} c="#d9dde3" /></group>
        ) : (
          <group key={x}><M g={G.box(1.14, 2.05, 0.07, 0.05)} c={lv.door} p={[x, 1.93, 0]} /><M g={G.box(0.04, 2.0, 0.09, 0)} c="#55525c" p={[x, 1.93, 0]} />
            {[-0.27, 0.27].map((d) => <M key={d} g={G.box(0.36, 0.8, 0.09, 0.08)} c={lit ? "#bfe4f2" : lv.window} p={[x + d, 2.35, 0]} o={lit ? { glow: 0.28 } : undefined} />)}</group>
        ))}
        {dirt > 0 && Array.from({ length: Math.round(dirt * 14) }, (_, i) => <M key={i} g={G.ball(1, 10)} c="#8a5a36" p={[R(seed + i, 2) * 8.2 + 0.2, 0.95 + R(seed + i, 3) * 0.75, 0.02 * side]} s={[0.1 + R(seed + i, 4) * 0.28, 0.07 + R(seed + i, 5) * 0.14, 0.03]} />)}
      </Gr>
    ))}
    {head && <group>
      <M g={G.box(0.22, 2.5, 2.2, 0.1)} c={lv.band} p={[0.02, 2.05, 0]} />
      <M g={G.box(0.1, 1.05, 1.85, 0.05)} c="#2b3550" p={[-0.1, 2.5, 0]} /><M g={G.box(0.12, 1.0, 0.06, 0)} c={lv.band} p={[-0.11, 2.5, 0]} />
      <M g={G.box(0.12, 0.22, 1.3, 0.05)} c="#1d1f27" p={[-0.1, 3.18, 0]} /><M g={G.box(0.14, 0.09, 0.8, 0.02)} c="#ff9a3c" p={[-0.12, 3.18, 0]} o={{ basic: true }} />
      {[-0.72, 0.72].map((z) => <M key={z} g={G.cyl(0.15, 0.15, 0.14)} c="#fff1b0" p={[-0.1, 1.3, z]} r={[0, 0, Math.PI / 2]} o={{ glow: 0.7 }} />)}
    </group>}
    <M g={G.box(0.3, 2.1, 1.4, 0.08)} c="#4a4752" p={[8.7, 2.0, 0]} />
  </group>
);
/** Rangkaian n gerbong. x = posisi muka; move = geseran sepanjang rel (sudah dihitung), roda ikut berputar. */
export const Train: React.FC<{ lv?: string; n?: number; p?: V3; ry?: number; s?: number; move?: number; head?: boolean; open?: boolean; lit?: boolean; dirt?: number; seed?: string; riders?: (car: number) => React.ReactNode }> = ({ lv = "krl", n = 1, p = [0, 0, 0], ry = 0, s = 1, move = 0, head = true, open, lit, dirt, seed = "t", riders }) => (
  <Gr p={p} r={[0, ry, 0]} s={s}>
    <Gr p={[move, 0, 0]}>
      {Array.from({ length: n }, (_, i) => <Gr key={i} p={[i * CAR, 0, 0]}><Car lv={LIV[lv]} head={head && i === 0} open={open} lit={lit} dirt={dirt} roll={-move / 0.38} seed={seed + i} />{riders?.(i)}</Gr>)}
    </Gr>
  </Gr>
);
export const Rails: React.FC<{ p?: V3; ry?: number; len?: number; gauge?: number; off?: number }> = ({ p = [0, 0, 0], ry = 0, len = 90, gauge = 1.72, off = 0 }) => {
  const n = Math.floor(len / 1.15), shift = ((off % 1.15) + 1.15) % 1.15;
  return (
    <Gr p={p} r={[0, ry, 0]}>
      <M g={G.box(len, 0.1, gauge + 1.5, 0.04)} c="#8c7762" p={[0, 0.04, 0]} noShadow />
      {Array.from({ length: n }, (_, i) => <M key={i} g={G.box(0.42, 0.1, gauge + 0.85, 0.03)} c="#6a4c3a" p={[-len / 2 + i * 1.15 + shift, 0.12, 0]} noShadow />)}
      {[-1, 1].map((d) => <group key={d}><M g={G.box(len, 0.12, 0.13, 0.02)} c="#c3c8d2" p={[0, 0.25, (d * gauge) / 2]} /><M g={G.box(len, 0.03, 0.07, 0)} c="#ffffff" p={[0, 0.32, (d * gauge) / 2]} o={{ opacity: 0.8 }} /></group>)}
    </Gr>
  );
};
/** Sepasang rel dilihat dari depan dengan garis ukur lebar sepur. w = lebar sepur, g = garis ukur 0..1. */
export const Gauge: React.FC<{ w?: number; g?: number; depth?: number }> = ({ w = 3, g = 1, depth = 7 }) => (
  <group>
    {Array.from({ length: Math.ceil(depth / 0.9) }, (_, i) => <M key={i} g={G.box(w + 1.9, 0.22, 0.5, 0.07)} c="#8a5f42" p={[0, 0.12, 0.6 - i * 0.9]} />)}
    {[-1, 1].map((d) => <Gr key={d} p={[(d * w) / 2, 0.23, -depth / 2 + 0.9]}>
      <M g={G.box(0.5, 0.12, depth, 0.04)} c="#9aa1ae" p={[0, 0.06, 0]} /><M g={G.box(0.16, 0.5, depth, 0.04)} c="#aab1bd" p={[0, 0.35, 0]} /><M g={G.box(0.36, 0.24, depth, 0.09)} c="#d4d9e2" p={[0, 0.68, 0]} />
    </Gr>)}
    {g > 0 && <group>
      <Rod a={[-(w / 2 - 0.2) * g, 1.75, 1.0]} b={[(w / 2 - 0.2) * g, 1.75, 1.0]} w={0.1} c="#d83c33" />
      {[-1, 1].map((d) => <group key={d}><Rod a={[d * (w / 2 - 0.2) * g, 1.25, 1.0]} b={[d * (w / 2 - 0.2) * g, 2.15, 1.0]} w={0.1} c="#d83c33" /><M g={G.cone(0.24, 0.5)} c="#d83c33" p={[d * ((w / 2 - 0.2) * g - 0.25), 1.75, 1.0]} r={[0, 0, -d * Math.PI / 2]} /></group>)}
    </group>}
  </group>
);

/* ------------------------------ kendaraan dan bangunan ------------------------------ */
export const Ship: React.FC<{ t: number; n?: number; lv?: string; p?: V3; ry?: number; s?: number }> = ({ t, n = 3, lv = "toei", p = [0, 0, 0], ry = 0, s = 1 }) => {
  const hull = (key: string, k: number) => G.ext(key, () => poly([[-4.6 * k, -1.15 * k], [3.3 * k, -1.15 * k], [5.2 * k, 0], [3.3 * k, 1.15 * k], [-4.6 * k, 1.15 * k]]), 1, 0.08);
  return (
    <Gr p={[p[0], p[1] + Math.sin(t * 1.6) * 0.08, p[2]]} r={[Math.sin(t * 1.1) * 0.015, ry, Math.sin(t * 1.3) * 0.02]} s={s}>
      <M g={hull("hullA", 1)} c="#3d4256" p={[0, 0.65, 0]} r={[-Math.PI / 2, 0, 0]} s={[1, 1, 1.1]} />
      <M g={hull("hullB", 1.02)} c="#d83c33" p={[0, 0.12, 0]} r={[-Math.PI / 2, 0, 0]} s={[1, 1, 0.3]} />
      <M g={G.box(8.2, 0.12, 2.1, 0.04)} c="#c9a97d" p={[-0.5, 1.28, 0]} />
      {Array.from({ length: n }, (_, i) => <Gr key={i} p={[-2.9 + (i % 3) * 1.85, 1.34 + Math.floor(i / 3) * 0.9, 0]} s={0.2 * pop(t, 0.25 + i * 0.22, 0.3)}><Gr p={[0, -0.15, 0]}><Car lv={LIV[lv]} head /></Gr></Gr>)}
      <M g={G.box(1.2, 1.6, 1.6, 0.12)} c="#f3eee2" p={[-3.9, 2.1, 0]} /><M g={G.box(1.24, 0.34, 1.64, 0.05)} c="#33486e" p={[-3.9, 2.45, 0]} />
      <M g={G.cyl(0.28, 0.34, 0.8)} c="#d83c33" p={[-4.0, 3.3, 0]} />
      {Array.from({ length: 5 }, (_, i) => { const q = (t * 0.45 + i / 5) % 1; return <M key={i} g={G.ball(1, 12)} c="#ffffff" p={[-4.0 - q * 1.8, 3.8 + q * 1.4, 0]} s={0.18 + q * 0.42} o={{ opacity: 0.75 * (1 - q) }} noShadow />; })}
      {[0, 1, 2].map((i) => <M key={"w" + i} g={G.torus(1 + i * 0.5, 0.06, Math.PI)} c="#ffffff" p={[5.0 - i * 3.4, 0.04, 0]} r={[Math.PI / 2, 0, -Math.PI / 2]} o={{ basic: true, opacity: 0.4 + 0.2 * Math.sin(t * 3 + i) }} />)}
    </Gr>
  );
};
export const Factory: React.FC<{ t: number; p?: V3; s?: number; smoke?: number; ry?: number }> = ({ t, p = [0, 0, 0], s = 1, smoke = 1, ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}>
    <M g={G.box(5.4, 2.4, 3, 0.12)} c="#d9a878" p={[0, 1.2, 0]} />
    {[0, 1, 2].map((i) => <Gr key={i} p={[-2.7 + i * 1.5, 2.4, 0]}><M g={G.ext("roofSaw", () => poly([[0, 0], [1.5, 0], [0, 0.9]]), 2.9, 0.04)} c="#b4603f" /><M g={G.box(0.06, 0.55, 2.4, 0)} c="#bfe4f2" p={[-0.02, 0.38, 0]} o={{ glow: 0.2 }} /></Gr>)}
    <M g={G.box(1.2, 0.5, 3.02, 0.08)} c="#c18f63" p={[2.1, 2.6, 0]} />
    <M g={G.cyl(0.32, 0.42, 3.4)} c="#a7795a" p={[2.2, 3.8, -0.6]} /><M g={G.cyl(0.38, 0.38, 0.3)} c="#d83c33" p={[2.2, 5.35, -0.6]} />
    {smoke > 0 && Array.from({ length: 6 }, (_, i) => { const q = (t * 0.4 + i / 6) % 1; return <M key={i} g={G.ball(1, 16)} c="#ffffff" p={[2.2 + q * 1.5, 5.8 + q * 2.6, -0.6]} s={(0.28 + q * 0.6) * smoke * Math.min(1, (1 - q) * 2.2)} o={{ opacity: 0.85 }} noShadow />; })}
    <M g={G.box(1.7, 1.75, 0.16, 0.05)} c="#3d3a46" p={[-1.5, 0.9, 1.5]} />
    {[0.35, 1.5].map((x) => <group key={x}><M g={G.box(0.82, 0.7, 0.12, 0.06)} c="#f6efda" p={[x, 1.35, 1.5]} /><M g={G.box(0.68, 0.56, 0.16, 0.04)} c="#9fdcf3" p={[x, 1.35, 1.5]} o={{ glow: 0.35 }} /></group>)}
    <M g={G.box(5.7, 0.18, 3.3, 0.04)} c="#8a6a52" p={[0, 0.09, 0]} />
  </Gr>
);
export const Parliament: React.FC<{ p?: V3; s?: number; lit?: number; ry?: number }> = ({ p = [0, 0, 0], s = 1, lit = 0, ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}>
    {[0, 1, 2].map((i) => <M key={i} g={G.box(6.4 - i * 0.35, 0.22, 3.6 - i * 0.3, 0.05)} c="#d8c7a2" p={[0, 0.11 + i * 0.22, 0]} />)}
    <M g={G.box(5.0, 1.8, 2.0, 0.08)} c="#e8d9b4" p={[0, 1.55, -0.45]} />
    {[-2.4, -1.45, -0.48, 0.48, 1.45, 2.4].map((x) => <group key={x}><M g={G.cyl(0.2, 0.23, 1.8)} c="#fbf3dc" p={[x, 1.55, 0.98]} /><M g={G.box(0.52, 0.14, 0.52, 0.03)} c="#d8c7a2" p={[x, 2.5, 0.98]} /></group>)}
    <M g={G.box(6.0, 0.36, 3.0, 0.07)} c="#cdb582" p={[0, 2.74, 0.1]} />
    <M g={G.ext("pediment", () => poly([[-3, 0], [3, 0], [0, 1.1]]), 0.5, 0.05)} c="#dcc796" p={[0, 2.9, 1.25]} />
    <M g={G.cyl(1.35, 1.35, 0.6)} c="#fbf3dc" p={[0, 3.2, -0.35]} /><M g={G.dome(1.45)} c="#2c8c86" p={[0, 3.45, -0.35]} o={lit > 0 ? { glow: 0.1 + lit * 0.5 } : undefined} />
    <Rod a={[0, 4.85, -0.35]} b={[0, 5.6, -0.35]} w={0.05} c="#f2b632" /><M g={G.ball(0.14)} c="#f2b632" p={[0, 5.65, -0.35]} />
    {[-1.5, 0, 1.5].map((x) => <M key={x} g={G.box(0.6, 1.2, 0.1, 0.25)} c="#6a5a44" p={[x * 0.97, 1.25, 0.58]} />)}
  </Gr>
);
export const House: React.FC<{ p?: V3; s?: number; c?: string }> = ({ p = [0, 0, 0], s = 1, c = "#e8c39a" }) => (
  <Gr p={p} s={s}><M g={G.box(1.2, 0.8, 1, 0.06)} c={c} p={[0, 0.4, 0]} /><M g={G.cone(1.02, 0.75, 4)} c="#d0553c" p={[0, 1.15, 0]} r={[0, Math.PI / 4, 0]} /><M g={G.box(0.28, 0.45, 0.08, 0.03)} c="#7a5a36" p={[0, 0.23, 0.5]} /></Gr>
);
export const Palm: React.FC<{ t: number; p?: V3; s?: number; seed?: number }> = ({ t, p = [0, 0, 0], s = 1, seed = 0 }) => {
  const sway = Math.sin(t * 1.2 + seed) * 0.12, top: V3 = [0.55 + sway, 3.6, 0];
  return (
    <Gr p={p} s={s}>
      <Hose a={[0, 0, 0]} c={[0.1, 2.1, 0]} b={top} w={0.17} color="#9a6e46" n={8} />
      {Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2 + seed; return <Gr key={i} p={top} r={[0, a, -0.25 + Math.sin(t * 1.7 + i) * 0.05]}><M g={G.ball(1, 14)} c={i % 2 ? "#3f9a5c" : "#58b66a"} p={[0.95, -0.12, 0]} r={[0, 0, -0.3]} s={[1.15, 0.09, 0.34]} /></Gr>; })}
      <M g={G.ball(0.17)} c="#8a5a36" p={[top[0] - 0.15, top[1] - 0.2, 0.18]} /><M g={G.ball(0.17)} c="#8a5a36" p={[top[0] + 0.18, top[1] - 0.22, 0.1]} />
    </Gr>
  );
};

/* ------------------------------ benda infografik ------------------------------ */
/** Tumpukan koin: n keping jatuh satu per satu mulai detik at. */
export const Coins: React.FC<{ t: number; n: number; at?: number; p?: V3; s?: number; step?: number }> = ({ t, n, at = 0.3, p = [0, 0, 0], s = 1, step = 0.09 }) => (
  <Gr p={p} s={s}>
    {Array.from({ length: n }, (_, i) => {
      const f = seg(t, at + i * step, at + i * step + 0.28, Easing.in(Easing.quad)); if (t < at + i * step) return null;
      const y = 0.16 + i * 0.27 + (1 - f) * 3.2;
      return <Gr key={i} p={[(R(i, 2) - 0.5) * 0.14, y, (R(i, 3) - 0.5) * 0.14]} r={[0, R(i, 4) * 6 + (1 - f) * 3, 0]}><M g={G.cyl(0.78, 0.78, 0.23, 36)} c="#f4b52c" /><M g={G.cyl(0.57, 0.57, 0.26, 36)} c="#ffd558" /><M g={G.box(0.12, 0.28, 0.62, 0.03)} c="#e59a16" /></Gr>;
    })}
  </Gr>
);
/** Balok batang yang tumbuh dari lantai. */
export const Bar: React.FC<{ t: number; h: number; at?: number; p?: V3; w?: number; c?: string; dur?: number; pulse?: boolean }> = ({ t, h, at = 0.2, p = [0, 0, 0], w = 1.7, c = "#d83c33", dur = 0.9, pulse }) => {
  const k = seg(t, at, at + dur, Easing.out(Easing.back(1.2))); const H = Math.max(0.001, h * k);
  return <Gr p={p}><M g={G.box(1, 1, 1, 0.09)} c={c} p={[0, H / 2, 0]} s={[w, H, w]} o={pulse ? { glow: 0.2 + 0.25 * (0.5 + 0.5 * Math.sin(t * 6)) } : undefined} /></Gr>;
};
/** Barisan gerbong mini di lantai, muncul satu per satu (angka bisa dihitung). Baris pertama paling belakang. */
export const CarGrid: React.FC<{ t: number; value: number; total?: number; cols: number; gap?: [number, number]; p?: V3; s?: number; lv?: string; from?: number; to?: number; ghost?: boolean }> = ({ t, value, total, cols, gap = [1.35, 1.15], p = [0, 0, 0], s = 1, lv = "krl", from = 0.2, to = 2.2, ghost }) => {
  const all = total ?? value, rows = Math.ceil(all / cols), n = Math.floor(seg(t, from, to, Easing.inOut(Easing.quad)) * value + 1e-6);
  const L = LIV[lv] ?? LIV.krl;
  return (
    <Gr p={p} s={s}>
      {Array.from({ length: ghost ? all : n }, (_, i) => {
        const x = ((i % cols) - (cols - 1) / 2) * gap[0], z = (Math.floor(i / cols) - (rows - 1) / 2) * gap[1], on = i < n;
        const k = on ? pop(t, from + (i / Math.max(1, value)) * (to - from), 0.24) : 0.9;
        return <Gr key={i} p={[x, on ? (1 - clamp(k)) * 0.8 : 0, z]} s={k}>
          <M g={G.box(1.05, 0.5, 0.55, 0.12)} c={on ? L.body : "#a7a6b0"} p={[0, 0.38, 0]} o={on ? undefined : { opacity: 0.45 }} />
          {on && <><M g={G.box(1.07, 0.13, 0.57, 0.03)} c={L.band} p={[0, 0.24, 0]} /><M g={G.box(0.82, 0.17, 0.58, 0.04)} c="#33486e" p={[0, 0.47, 0]} /><M g={G.box(0.9, 0.08, 0.4, 0.03)} c={L.roof} p={[0, 0.66, 0]} /></>}
          <M g={G.box(0.9, 0.12, 0.42, 0.04)} c="#3d3b45" p={[0, 0.08, 0]} o={on ? undefined : { opacity: 0.45 }} />
        </Gr>;
      })}
    </Gr>
  );
};
/** Grid bola (proporsi): value dari total diwarnai satu per satu. */
export const BallGrid: React.FC<{ t: number; total: number; value: number; cols: number; gap?: number; r?: number; p?: V3; on?: string; off?: string; from?: number; to?: number; base?: string; baseN?: number }> = ({ t, total, value, cols, gap = 0.85, r = 0.3, p = [0, 0, 0], on = "#f2b632", off = "#ffffff", from = 0.3, to = 2, base, baseN = 0 }) => {
  const rows = Math.ceil(total / cols), lit = Math.floor(seg(t, from, to, Easing.inOut(Easing.quad)) * (value - baseN) + 1e-6) + baseN;
  return (
    <Gr p={p}>
      {Array.from({ length: total }, (_, i) => {
        const x = ((i % cols) - (cols - 1) / 2) * gap, z = (Math.floor(i / cols) - (rows - 1) / 2) * gap, isOn = i < lit, isBase = i < baseN;
        const a = pop(t, (i / total) * 0.45, 0.25), jump = isOn && !isBase ? Math.max(0, 1 - seg(t, from + ((i - baseN) / Math.max(1, value - baseN)) * (to - from), from + ((i - baseN) / Math.max(1, value - baseN)) * (to - from) + 0.35)) : 0;
        const wave = Math.sin(t * 2.4 + i * 0.37) * 0.05;
        return <Gr key={i} p={[x, r + (isOn ? 0.16 + wave : 0) + Math.sin(jump * Math.PI) * 0.7, z]} s={a * (isOn ? 1.08 : 0.82)}><M g={G.ball(r, 16)} c={isBase ? base ?? on : isOn ? on : off} o={isOn ? { glow: 0.16 } : undefined} /></Gr>;
      })}
    </Gr>
  );
};
/** Garis waktu 3D: rel di lantai, tiang penanda, bola berjalan sampai upTo. x(v) dipakai untuk label. */
export const timeX = (v: number, range: [number, number], w: number) => -w / 2 + ((v - range[0]) / (range[1] - range[0])) * w;
export const timeNow = (t: number, range: [number, number], upTo: number, from: number, to: number) => mix(range[0], upTo, seg(t, from + 0.3, to, Easing.inOut(Easing.quad)));
export const Timeline: React.FC<{ t: number; range: [number, number]; marks: number[]; upTo: number; w?: number; p?: V3; from?: number; to?: number; c?: string; ticks?: number; names?: string[] }> = ({ t, range, marks, upTo, w = 12, p = [0, 0, 0], from = 0.2, to = 2.6, c = "#f2b632", ticks = 12, names }) => {
  const now = timeNow(t, range, upTo, from, to), hx = timeX(now, range, w), d = seg(t, from, from + 0.5);
  return (
    <Gr p={p}>
      {/* skala nyaris nol membuat normal rusak (bercak hitam), jadi rel baru digambar setelah punya panjang */}
      {d > 0.04 && <M g={G.box(1, 0.28, 0.8, 0.12)} c="#fbf6ea" p={[0, 0.2, 0]} s={[(w + 0.8) * d, 1, 1]} />}
      {Array.from({ length: ticks + 1 }, (_, i) => i / ticks <= d && d > 0.04 && <M key={i} g={G.box(0.09, 0.1, 1.15, 0.02)} c="#b9ab93" p={[-w / 2 + (i * w) / ticks, 0.34, 0]} />)}
      {hx > -w / 2 + 0.3 && <M g={G.box(1, 0.34, 0.52, 0.12)} c={c} p={[(-w / 2 + hx) / 2, 0.27, 0]} s={[hx + w / 2, 1, 1]} />}
      {marks.map((m, j) => { const x = timeX(m, range, w), on = now >= m - (range[1] - range[0]) * 0.004; const k = pop(t, from + 0.2, 0.3);
        if (k <= 0.04) return null;
        return <Gr key={m} p={[x, 0, 0]} s={k}><Rod a={[0, 0.3, 0]} b={[0, on ? 1.75 : 1.2, 0]} w={0.09} c={on ? c : "#b9ab93"} /><M g={G.ball(on ? 0.34 : 0.22)} c={on ? c : "#d8ccb4"} p={[0, on ? 1.85 : 1.28, 0]} o={on ? { glow: 0.25 } : undefined} /><TextPlane text={names?.[j] ?? String(m)} h={0.78} color="#ffffff" bg={on ? "#26365c" : "#8a8272"} p={[0, 0.55, 1.3]} r={[-0.25, 0, 0]} /></Gr>; })}
      {d > 0.04 && <Gr p={[hx, 0.75, 0.15]} s={d}><M g={G.ball(0.52)} c={c} o={{ glow: 0.3 }} /><M g={G.torus(0.7, 0.08)} c="#ffffff" r={[Math.PI / 2, 0, t * 2]} o={{ opacity: 0.85 }} /></Gr>}
    </Gr>
  );
};
/** Cek dan silang tebal yang menghantam. p = kemunculan (pop). */
export const Cross: React.FC<{ t: number; at: number; p: V3; s?: number }> = ({ t, at, p, s = 1 }) => {
  const k = seg(t, at, at + 0.26, Easing.out(Easing.back(2))); if (t < at) return null;
  return <Gr p={[p[0], p[1], p[2] + (1 - Math.min(1, k)) * 4]} r={[0, Math.sin(t * 1.4) * 0.18, 0]} s={s * (0.4 + 0.6 * k)}>{[1, -1].map((d) => <M key={d} g={G.box(2.6, 0.55, 0.55, 0.22)} c="#e0342c" r={[0, 0, (d * Math.PI) / 4]} o={{ glow: 0.2 }} />)}</Gr>;
};
export const Check: React.FC<{ t: number; at: number; p: V3; s?: number }> = ({ t, at, p, s = 1 }) => {
  const k = seg(t, at, at + 0.3, Easing.out(Easing.back(2))); if (t < at) return null;
  return <Gr p={p} r={[0, Math.sin(t * 1.4) * 0.22, 0]} s={s * k}><M g={G.ext("check", () => poly([[-1.15, 0.05], [-0.72, 0.48], [-0.32, 0.08], [0.78, 1.18], [1.2, 0.74], [-0.32, -0.8]]), 0.45, 0.1)} c="#2fcf8b" o={{ glow: 0.22 }} /></Gr>;
};
export const Bolt: React.FC<{ t: number; at: number; p: V3; s?: number }> = ({ t, at, p, s = 1 }) => {
  const k = seg(t, at, at + 0.28, Easing.out(Easing.back(2))); if (t < at) return null; const f = 0.85 + 0.15 * Math.sin(t * 17);
  return <Gr p={p} r={[0, Math.sin(t * 1.3) * 0.35, 0]} s={s * k}><M g={G.ext("bolt", () => poly([[0.2, 1.4], [-0.75, -0.2], [-0.08, -0.2], [-0.36, -1.4], [0.76, 0.34], [0.08, 0.34]]), 0.42, 0.09)} c="#ffd23f" o={{ glow: 0.55 * f }} />
    {Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2 + t * 1.6, r = 1.7 + 0.3 * Math.sin(t * 9 + i); return <M key={i} g={G.box(0.5, 0.09, 0.09, 0.03)} c="#fff6b0" p={[Math.cos(a) * r, Math.sin(a) * r, 0]} r={[0, 0, a]} o={{ basic: true }} />; })}</Gr>;
};
/** Lembar dokumen tebal; mark "ok" atau "no" dicap di detik markAt. */
export const Doc: React.FC<{ t: number; p: V3; s?: number; mark?: "ok" | "no"; markAt?: number; ry?: number }> = ({ t, p, s = 1, mark, markAt = 1, ry = -0.2 }) => (
  <Gr p={[p[0], p[1] + Math.sin(t * 1.7) * 0.12, p[2]]} r={[-0.06, ry + Math.sin(t * 0.9) * 0.08, Math.sin(t * 1.2) * 0.03 - 0.04]} s={s}>
    <M g={G.box(2.4, 3.2, 0.14, 0.06)} c="#fffaf0" /><M g={G.box(2.4, 3.2, 0.1, 0.05)} c="#d9ccae" p={[0.1, -0.1, -0.14]} />
    {[1.1, 0.7, 0.3, -0.1].map((y, i) => <M key={y} g={G.box(1.7 - (i % 2) * 0.45, 0.13, 0.03, 0.01)} c="#c4b699" p={[-(i % 2) * 0.22, y, 0.09]} />)}
    {mark && t >= markAt && <Gr p={[0.05, -0.85, 0.2 + (1 - seg(t, markAt, markAt + 0.2)) * 2.2]} s={seg(t, markAt, markAt + 0.24, Easing.out(Easing.back(2)))}>
      <M g={G.torus(0.62, 0.11)} c={mark === "no" ? "#e0342c" : "#2fcf8b"} />
      {mark === "no" ? [1, -1].map((d) => <M key={d} g={G.box(1.1, 0.2, 0.14, 0.08)} c="#e0342c" r={[0, 0, (d * Math.PI) / 4]} />) : <M g={G.ext("check", () => poly([[-1.15, 0.05], [-0.72, 0.48], [-0.32, 0.08], [0.78, 1.18], [1.2, 0.74], [-0.32, -0.8]]), 0.45, 0.1)} c="#2fcf8b" s={[0.42, 0.42, 0.3]} p={[0, -0.05, 0]} />}
    </Gr>}
  </Gr>
);
export const Clock: React.FC<{ t: number; p: V3; s?: number; rate?: number; ry?: number }> = ({ t, p, s = 1, rate = 90, ry = 0.25 }) => (
  <Gr p={p} r={[0, ry + Math.sin(t * 0.8) * 0.1, 0]} s={s}>
    <M g={G.cyl(1.8, 1.8, 0.55, 48)} c="#a86c43" r={[Math.PI / 2, 0, 0]} /><M g={G.cyl(1.55, 1.55, 0.6, 48)} c="#fffaf0" r={[Math.PI / 2, 0, 0]} />
    <M g={G.torus(1.66, 0.16)} c="#c98a55" p={[0, 0, 0.28]} />
    {Array.from({ length: 12 }, (_, i) => <Gr key={i} r={[0, 0, (i * Math.PI) / 6]}><M g={G.box(0.09, i % 3 ? 0.18 : 0.34, 0.06, 0.02)} c="#8a6a4a" p={[0, 1.28, 0.33]} /></Gr>)}
    <Gr r={[0, 0, -t * rate * (Math.PI / 180)]}><M g={G.box(0.13, 1.25, 0.08, 0.05)} c="#26222b" p={[0, 0.55, 0.42]} /></Gr>
    <Gr r={[0, 0, -t * (rate / 12) * (Math.PI / 180)]}><M g={G.box(0.2, 0.85, 0.08, 0.07)} c="#d83c33" p={[0, 0.35, 0.37]} /></Gr>
    <M g={G.ball(0.17)} c="#26222b" p={[0, 0, 0.45]} />
  </Gr>
);
export const Cake: React.FC<{ t: number; at: number; p: V3; n?: number; s?: number }> = ({ t, at, p, n = 9, s = 1 }) => (
  <Pop t={t} at={0.15} p={p} s={s}>
    <M g={G.cyl(2.1, 2.1, 0.15, 48)} c="#e8e3ee" p={[0, 0.08, 0]} />
    <M g={G.cyl(1.75, 1.75, 1.1, 48)} c="#e9a877" p={[0, 0.7, 0]} /><M g={G.cyl(1.8, 1.8, 0.35, 48)} c="#fff6e4" p={[0, 1.3, 0]} /><M g={G.cyl(1.78, 1.78, 0.14, 48)} c="#e2573d" p={[0, 0.68, 0]} />
    {Array.from({ length: 11 }, (_, i) => { const a = (i / 11) * Math.PI * 2; return <M key={i} g={G.ball(0.22, 12)} c="#fff6e4" p={[Math.cos(a) * 1.72, 1.12 - R(i) * 0.12, Math.sin(a) * 1.72]} />; })}
    {Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + 0.3, r = i % 2 ? 1.25 : 0.7, x = Math.cos(a) * r, z = Math.sin(a) * r, on = t >= at + i * 0.13;
      return <Gr key={i} p={[x, 1.47, z]}><M g={G.cyl(0.08, 0.08, 0.75, 12)} c={i % 2 ? "#d83c33" : "#2c8c86"} p={[0, 0.37, 0]} />{on && <Gr p={[0, 0.95, 0]} s={pop(t, at + i * 0.13, 0.25)}><M g={G.ball(1, 12)} c="#ffd23f" s={[0.11, 0.2 + Math.sin(t * 13 + i) * 0.03, 0.11]} o={{ glow: 1 }} noShadow /></Gr>}</Gr>; })}
  </Pop>
);
/** Tembok bata yang runtuh mulai detik fallAt. */
export const Wall: React.FC<{ t: number; fallAt: number; p?: V3 }> = ({ t, fallAt, p = [0, 0, 0] }) => {
  const u = Math.max(0, t - fallAt);
  return (
    <Gr p={p}>
      {Array.from({ length: 6 }, (_, r) => Array.from({ length: 9 }, (_, c) => {
        const k = `${r}-${c}`, hit = Math.abs(c - 4) < 3.4 - (5 - r) * 0.35, d = hit ? Math.max(0, u - R(k, 2) * 0.25) : 0;
        const vy = 1.5 + R(k, 3) * 2.5, vx = (c - 4) * 0.55 + (R(k, 4) - 0.5), vz = (R(k, 5) - 0.25) * 4.5;
        let y = 0.28 + r * 0.55 + vy * d - 7 * d * d; const landed = y < 0.28; if (landed) y = 0.28;
        const dd = landed ? Math.min(d, 0.75 + R(k, 6) * 0.3) : d;
        return <M key={k} g={G.box(1.12, 0.5, 0.75, 0.07)} c={(r + c) % 3 === 0 ? "#bfb6aa" : (r + c) % 3 === 1 ? "#d0c8bc" : "#aaa094"} p={[(c - 4) * 1.18 + (r % 2) * 0.55 + vx * dd, y, vz * dd]} r={[dd * (R(k, 7) - 0.5) * 5, dd * (R(k, 8) - 0.5) * 4, dd * (R(k, 9) - 0.5) * 5]} />;
      }))}
    </Gr>
  );
};
export const Shirt: React.FC<{ t: number; p: V3; s?: number; c?: string; hole?: number; ry?: number; fall?: number }> = ({ t, p, s = 1, c = "#2c8c86", hole = 0, ry = 0, fall = 0 }) => (
  <Gr p={[p[0], p[1] - fall * 2.2 + Math.sin(t * 1.8) * 0.08, p[2]]} r={[fall * 0.8, ry + Math.sin(t * 1.1) * 0.22, fall * 0.5 + Math.sin(t * 1.5) * 0.03]} s={s}>
    <M g={G.ext("shirt", () => { const sh = poly([[-0.75, 0.95], [-0.34, 1.12], [-0.18, 0.88], [0, 0.82], [0.18, 0.88], [0.34, 1.12], [0.75, 0.95], [1.35, 0.35], [0.95, -0.05], [0.68, 0.22], [0.68, -1.15], [-0.68, -1.15], [-0.68, 0.22], [-0.95, -0.05], [-1.35, 0.35]]); return sh; }, 0.4, 0.12)} c={c} />
    <M g={G.torus(0.34, 0.07, Math.PI)} c="#1f6f6a" p={[0, 1.1, 0.14]} r={[0, 0, Math.PI]} />
    <M g={G.box(1.36, 0.16, 0.66, 0.06)} c="#1f6f6a" p={[0, -1.08, 0]} />
    {hole > 0 && [[-0.28, 0.2, 0.2], [0.3, -0.2, 0.15], [0.05, -0.68, 0.18], [0.35, 0.45, 0.1]].map(([x, y, r], i) => <group key={i}><M g={G.cyl(1, 1, 0.1, 10)} c="#3a2233" p={[x, y, 0.3]} r={[Math.PI / 2, i, 0]} s={[r * hole, 1, r * hole * 0.75]} o={{ basic: true }} /></group>)}
  </Gr>
);
export const Arrow: React.FC<{ t: number; at: number; a: V3; b: V3; lift?: number; c?: string; w?: number }> = ({ t, at, a, b, lift = 1.8, c = "#ffffff", w = 0.17 }) => {
  const u = seg(t, at, at + 0.6, Easing.inOut(Easing.cubic)); if (u <= 0.01) return null;
  const m: V3 = [(a[0] + b[0]) / 2, Math.max(a[1], b[1]) + lift, (a[2] + b[2]) / 2];
  const at2 = (k: number) => new THREE.Vector3(...([0, 1, 2].map((i) => (1 - k) * (1 - k) * a[i] + 2 * (1 - k) * k * m[i] + k * k * b[i]) as V3));
  const h = at2(u), dir = h.clone().sub(at2(Math.max(0, u - 0.03))).normalize(), q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  return <group><Hose a={a} c={m} b={b} w={w} color={c} n={18} upto={u} /><mesh position={h} quaternion={q} geometry={G.cone(w * 3.2, w * 5.5)} castShadow><meshToonMaterial color={c} emissive={c} emissiveIntensity={0.15} /></mesh></group>;
};
export const Confetti: React.FC<{ t: number; at?: number; p?: V3; n?: number; w?: number; h?: number }> = ({ t, at = 0, p = [0, 4, 0], n = 90, w = 14, h = 8 }) => t < at ? null : (
  <Gr p={p}>
    {Array.from({ length: n }, (_, i) => {
      const u = t - at, y = h / 2 - ((R(i, 2) * h + u * (1.2 + R(i, 3) * 1.6)) % h), grow = clamp(u * 3 - R(i, 7));
      return <M key={i} g={G.box(0.24, 0.14, 0.03, 0)} c={["#e0342c", "#f4b52c", "#2c8c86", "#ffffff", "#7a6ad8"][i % 5]} p={[(R(i, 4) - 0.5) * w + Math.sin(u * 2 + i) * 0.4, y, (R(i, 5) - 0.35) * 9]} r={[u * 4 * R(i, 6) + i, u * 3 + i, i]} s={grow} noShadow />;
    })}
  </Gr>
);
/** Pita hadiah mengelilingi benda panjang. */
export const Ribbon: React.FC<{ t: number; at: number; p: V3; w?: number; h?: number; d?: number }> = ({ t, at, p, w = 8.8, h = 3.8, d = 2.7 }) => {
  const k = seg(t, at, at + 0.4, Easing.out(Easing.back(1.8))); if (t < at) return null;
  return <Gr p={p}>
    <M g={G.box(0.55, h * k, d, 0.06)} c="#e0342c" p={[0, (h * k) / 2 + 0.1, 0]} /><M g={G.box(w * k, 0.4, d + 0.03, 0.06)} c="#e0342c" p={[0, h * 0.4, 0]} />
    <Gr p={[0, h + 0.2, 0.4]} s={k}>{[-1, 1].map((s) => <M key={s} g={G.torus(0.68, 0.24)} c="#f0483c" p={[s * 0.72, 0.45, 0]} r={[0, s * 0.35, s * -0.5]} s={[1, 0.68, 1]} />)}<M g={G.ball(0.4)} c="#c4231d" p={[0, 0.2, 0]} /></Gr>
  </Gr>;
};
/** Lemari terbuka (penutup: lemari Tokyo kosong). */
export const Closet: React.FC<{ t: number; p: V3; s?: number; children?: React.ReactNode }> = ({ t, p, s = 1, children }) => (
  <Gr p={p} s={s} r={[0, -0.15 + Math.sin(t * 0.7) * 0.03, Math.sin(t * 1.6) * 0.008]}>
    <M g={G.box(4.4, 0.35, 1.9, 0.08)} c="#8a5a36" p={[0, 0.35, 0]} /><M g={G.box(4.5, 0.4, 2.0, 0.1)} c="#a56c40" p={[0, 6.0, 0]} />
    {[-2.05, 2.05].map((x) => <M key={x} g={G.box(0.3, 5.7, 1.85, 0.07)} c="#a56c40" p={[x, 3.15, 0]} />)}
    <M g={G.box(4.0, 5.5, 0.18, 0.04)} c="#5f3d29" p={[0, 3.15, -0.82]} />
    <Rod a={[-1.9, 5.2, 0]} b={[1.9, 5.2, 0]} w={0.09} c="#d4d9e2" />
    {[-1.35, -0.55, 1.4].map((x, i) => <group key={x}><M g={G.torus(0.14, 0.035, Math.PI * 1.4)} c="#d4d9e2" p={[x, 5.18, 0]} /><M g={G.torus(0.55, 0.04, Math.PI)} c="#c9a37a" p={[x, 4.5, Math.sin(t * 2 + i) * 0.05]} s={[1, 0.5, 1]} /></group>)}
    {[-1, 1].map((d) => <Gr key={d} p={[d * 2.2, 3.15, 0.95]} r={[0, d * (0.95 + Math.sin(t * 1.3 + d) * 0.04), 0]}><M g={G.box(1.9, 5.4, 0.16, 0.06)} c="#b87a4a" p={[d * 0.95, 0, 0]} /><M g={G.ball(0.13)} c="#f4b52c" p={[d * 1.65, 0, 0.14]} /></Gr>)}
    {children}
  </Gr>
);
