// Peta 3D (jangkar T02): Jepang, Tiongkok, Sumatra, Jawa sebagai daratan berketebalan di atas laut; pin berdiri, kapal berlayar.
// Koordinat memakai kanvas peta 2D lama (1920x1080): w(x, y) = titik dunia di bidang y=h.
import React from "react";
import * as THREE from "three";
import { Easing } from "remotion";
import { G, Gr, M, Rod, V3 } from "./core";
import { R, mix, pop, seg } from "../kit";
import { LIV } from "./props";

export const w = (x: number, y: number, h = 0): V3 => [(x - 960) / 100, h, (y - 540) / 100];
export const PIN: Record<string, [number, number]> = { tokyo: [1590, 390], jakarta: [560, 826], bogor: [585, 852], cikarang: [655, 820], inka: [1060, 836], kota: [545, 812], china: [330, 300], java: [760, 846] };

type Cmd = ["M", number, number] | ["L", number, number] | ["Q", number, number, number, number];
const LAND: Record<string, Cmd[]> = {
  china: [["M", -600, -500], ["L", 560, -500], ["Q", 600, 140, 470, 270], ["Q", 330, 350, 130, 380], ["Q", -60, 330, -600, 420]],
  japan: [["M", 1500, 110], ["Q", 1630, 170, 1680, 320], ["Q", 1720, 430, 1630, 540], ["Q", 1560, 470, 1565, 370], ["Q", 1500, 280, 1410, 210]],
  sum: [["M", -330, 600], ["Q", -150, 640, 110, 800], ["Q", 220, 890, 190, 960], ["Q", -20, 920, -190, 790]],
  jawa: [["M", 230, 846], ["Q", 420, 782, 640, 794], ["Q", 910, 778, 1190, 812], ["Q", 1345, 836, 1270, 892], ["Q", 910, 926, 600, 906], ["Q", 330, 918, 230, 846]],
};
const shapeOf = (cmds: Cmd[]) => () => {
  const s = new THREE.Shape(); const X = (x: number) => (x - 960) / 100, Y = (y: number) => -(y - 540) / 100;
  for (const c of cmds) { if (c[0] === "M") s.moveTo(X(c[1]), Y(c[2])); else if (c[0] === "L") s.lineTo(X(c[1]), Y(c[2])); else s.quadraticCurveTo(X(c[1]), Y(c[2]), X(c[3]), Y(c[4])); }
  s.closePath(); return s;
};
const Land: React.FC<{ id: string; c: string; hi?: number }> = ({ id, c, hi = 0 }) => (
  <group>
    <M g={G.ext("shore-" + id, shapeOf(LAND[id]), 0.14, 0.28)} c="#f3e3ae" p={[0, 0.0, 0]} r={[-Math.PI / 2, 0, 0]} />
    <M g={G.ext("land-" + id, shapeOf(LAND[id]), 0.46, 0.12)} c={c} p={[0, 0.3, 0]} r={[-Math.PI / 2, 0, 0]} o={hi > 0 ? { glow: 0.16 * hi } : undefined} />
  </group>
);
const Volcano: React.FC<{ t: number; p: V3; s?: number }> = ({ t, p, s = 1 }) => (
  <Gr p={p} s={s}><M g={G.cone(0.46, 0.7, 14)} c="#8b9a62" p={[0, 0.35, 0]} /><M g={G.cone(0.17, 0.25, 14)} c="#c4785a" p={[0, 0.6, 0]} />
    {[0, 1].map((i) => { const q = (t * 0.3 + i * 0.5 + p[0]) % 1; return <M key={i} g={G.ball(1, 10)} c="#ffffff" p={[q * 0.3, 0.8 + q * 0.7, 0]} s={0.09 + q * 0.16} o={{ opacity: 0.7 * (1 - q) }} noShadow />; })}</Gr>
);
const Tree: React.FC<{ p: V3; s?: number; c?: string }> = ({ p, s = 1, c = "#4f9a5f" }) => <Gr p={p} s={s}><M g={G.cyl(0.04, 0.05, 0.2, 8)} c="#8a5a36" p={[0, 0.1, 0]} /><M g={G.ball(0.15, 10)} c={c} p={[0, 0.3, 0]} /></Gr>;
const City: React.FC<{ p: V3; seed: string; c?: string; n?: number }> = ({ p, seed, c = "#fbf0d8", n = 11 }) => (
  <Gr p={p}>{Array.from({ length: n }, (_, i) => { const h = 0.18 + R(seed + i, 2) * 0.55; return <M key={i} g={G.box(0.2, h, 0.2, 0.03)} c={i % 3 ? c : "#e9a877"} p={[(R(seed + i, 3) - 0.5) * 1.15, h / 2, (R(seed + i, 4) - 0.5) * 0.7]} />; })}</Gr>
);

export const Pin3: React.FC<{ t: number; at: number; name: string; s?: number; c?: string }> = ({ t, at, name, s = 1, c = "#e0342c" }) => {
  const [x, y] = PIN[name], k = pop(t, at, 0.35), q = (t * 0.7 + x * 0.01) % 1;
  if (t < at) return null;
  return <Gr p={w(x, y, 0.55)} s={s * k}>
    <Gr p={[0, Math.sin(t * 2.5 + x) * 0.08, 0]}><M g={G.cone(0.27, 0.85)} c={c} p={[0, 0.43, 0]} r={[Math.PI, 0, 0]} /><M g={G.ball(0.4)} c={c} p={[0, 1.05, 0]} o={{ glow: 0.2 }} /><M g={G.ball(0.17)} c="#ffffff" p={[0, 1.12, 0.31]} /></Gr>
    <M g={G.torus(1, 0.05)} c="#ffffff" p={[0, 0.04, 0]} r={[-Math.PI / 2, 0, 0]} s={0.25 + q * 0.75} o={{ opacity: 0.8 * (1 - q), basic: true }} />
  </Gr>;
};

export type RouteSpec = { from: string | [number, number]; c: [number, number]; to: string | [number, number]; at?: number; dur?: number; color?: string; ship?: boolean; lv?: string };
const P = (v: string | [number, number]) => (typeof v === "string" ? PIN[v] : v);
export const routePoint = (r: RouteSpec, u: number): [number, number] => { const a = P(r.from), b = P(r.to); return [0, 1].map((i) => (1 - u) * (1 - u) * a[i] + 2 * (1 - u) * u * r.c[i] + u * u * b[i]) as [number, number]; };
const MiniShip: React.FC<{ t: number; lv: string }> = ({ t, lv }) => (
  <group>
    <M g={G.ext("miniHull", () => { const s = new THREE.Shape(); s.moveTo(-0.85, -0.3); s.lineTo(0.5, -0.3); s.lineTo(0.95, 0); s.lineTo(0.5, 0.3); s.lineTo(-0.85, 0.3); s.closePath(); return s; }, 0.3, 0.05)} c="#3d4256" p={[0, 0.2, 0]} r={[-Math.PI / 2, 0, 0]} />
    {[-0.3, 0.18].map((x) => <group key={x}><M g={G.box(0.42, 0.28, 0.36, 0.07)} c={LIV[lv].body} p={[x, 0.55, 0]} /><M g={G.box(0.43, 0.08, 0.37, 0.02)} c={LIV[lv].band} p={[x, 0.5, 0]} /></group>)}
    <M g={G.box(0.24, 0.44, 0.34, 0.05)} c="#fbf6ea" p={[-0.68, 0.58, 0]} />
    {[0, 1, 2].map((i) => { const q = (t * 1.2 + i / 3) % 1; return <M key={i} g={G.ball(1, 8)} c="#ffffff" p={[-1.0 - q * 1.2, 0.08, 0]} s={[0.1 + q * 0.2, 0.04, 0.1 + q * 0.35]} o={{ opacity: 0.8 * (1 - q) }} noShadow />; })}
  </group>
);
export const Route3: React.FC<{ t: number; r: RouteSpec; shipS?: number }> = ({ t, r, shipS = 1 }) => {
  const a = r.at ?? 0.3, d = seg(t, a, a + (r.dur ?? 2.4), Easing.inOut(Easing.cubic)); if (t < a) return null;
  const N = 34, pts = Array.from({ length: N + 1 }, (_, i) => routePoint(r, i / N));
  const here = routePoint(r, d), nx = routePoint(r, Math.min(1, d + 0.02)), pv = routePoint(r, Math.max(0, d - 0.02));
  const heading = Math.atan2(-(nx[1] - pv[1]), nx[0] - pv[0]);
  const len = Math.hypot(P(r.to)[0] - P(r.from)[0], P(r.to)[1] - P(r.from)[1]);
  const step = len < 500 ? 3 : 1;
  return (
    <group>
      {pts.slice(0, -1).map((p, i) => (i % (2 * step) === 0 && i / N <= d ? <Rod key={i} a={w(p[0], p[1], 0.62)} b={w(pts[Math.min(N, i + step)][0], pts[Math.min(N, i + step)][1], 0.62)} w={0.075} c={r.color ?? "#ffffff"} o={{ glow: 0.35 }} noShadow /> : null))}
      {(r.ship ?? true) && d < 0.995 && <Gr p={w(here[0], here[1], 0.28 + Math.sin(t * 4) * 0.04)} r={[0, heading, Math.sin(t * 3) * 0.04]} s={shipS * Math.min(1, d * 6 + 0.35)}><MiniShip t={t} lv={r.lv ?? "toei"} /></Gr>}
    </group>
  );
};

/** Daratan, laut bergaris ombak, gunung, pohon, kota, dan awan yang melayang di atas (kedalaman). hi = daratan disorot. */
export const MapWorld: React.FC<{ t: number; hi?: "jawa" | "sum"; clouds?: boolean }> = ({ t, hi, clouds = true }) => (
  <group>
    <M g={G.plane(160, 110)} c="#4fb3d4" r={[-Math.PI / 2, 0, 0]} p={[0, -0.12, 0]} noShadow />
    {Array.from({ length: 90 }, (_, i) => <M key={i} g={G.torus(0.34, 0.035, Math.PI * 0.7)} c="#bdeaf5" p={[(R(i, 2) - 0.5) * 30 + Math.sin(t * 0.8 + i) * 0.25, -0.08, (R(i, 3) - 0.5) * 18]} r={[-Math.PI / 2, 0, 0.45]} s={0.5 + R(i, 4)} o={{ opacity: 0.35 + 0.3 * Math.sin(t * 1.8 + i), basic: true }} />)}
    <Land id="china" c="#d3cf8f" /><Land id="japan" c="#c9d6a8" /><Land id="sum" c={hi === "sum" ? "#62bb68" : "#8fc478"} hi={hi === "sum" ? 1 : 0} /><Land id="jawa" c={hi === "jawa" ? "#4fb862" : "#86c474"} hi={hi === "jawa" ? 1 : 0} />
    {[[380, 876], [720, 882], [850, 856], [985, 868], [1140, 850]].map(([x, y], i) => <Volcano key={i} t={t} p={w(x, y, 0.56)} s={0.72 + R(i, 2) * 0.3} />)}
    {Array.from({ length: 46 }, (_, i) => <Tree key={i} p={w(280 + R(i, 5) * 950, 828 + R(i, 6) * 62, 0.56)} s={0.55 + R(i, 7) * 0.4} />)}
    <City p={w(520, 842, 0.56)} seed="jk" n={14} /><City p={w(1585, 330, 0.56)} seed="tk" c="#dbe6f2" n={14} /><City p={w(260, 270, 0.56)} seed="cn" n={9} />
    {[[1520, 200], [1650, 450], [1580, 250]].map(([x, y], i) => <Volcano key={"j" + i} t={t} p={w(x, y, 0.56)} s={i ? 0.8 : 1.35} />)}
    {Array.from({ length: 40 }, (_, i) => <Tree key={"c" + i} p={w(-150 + R(i, 8) * 520, 20 + R(i, 9) * 270, 0.56)} s={0.7 + R(i, 10) * 0.5} c="#6f9a52" />)}
    {clouds && [[200, 640], [1330, 560], [900, 170], [1480, 860], [80, 520]].map(([x, y], i) => (
      <Gr key={"cl" + i} p={[w(x, y)[0] + Math.sin(t * 0.13 + i) * 0.8 + t * 0.09, 3.6 + (i % 2), w(x, y)[2]]} s={0.75 + R(i, 3) * 0.5}>
        {[[0, 0, 0.62], [0.65, -0.1, 0.45], [-0.65, -0.12, 0.42]].map(([cx, cy, r], k) => <M key={k} g={G.ball(1, 16)} c="#ffffff" p={[cx, cy, 0]} s={[r, r * 0.62, r * 0.75]} o={{ opacity: 0.88 }} noShadow />)}
      </Gr>
    ))}
  </group>
);
