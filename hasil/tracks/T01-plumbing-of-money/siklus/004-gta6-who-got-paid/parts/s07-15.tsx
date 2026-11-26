// s07-s15: tebakan, retail sales vs revenue, tangan pertama (negara) dan kedua (toko).
import React from "react";
import { Easing } from "remotion";
import { R, clamp, keys, mix, pop, seg } from "@r3";
import { G, Gr, Pop, Rod, TextPlane, V3, poly, M } from "@r3/three";
import { Bag, CardGate, Chair, Coin, HangLamp, LAMP, NIGHT, COLD, Paper, Room, S, Stack, State, Store, TOP, Table, Tower, back, ease, s3 } from "./base";
import { Cabinet, Calendar, CoinWall, ConsoleBox, Courtroom, Doorway, GameBox, Magnifier, Newspaper, Path, Receipt, Register, Spot, Tracker, cams, fly } from "./props";

const WARM = ["#ffb468", "#ff8a7a", "#b48ae8"], COOL = ["#8fd0ff", "#b8c8ff"], BLUE = ["#5a6ae0", "#9a6ad8", "#4fb8d8"];
const Warm: React.FC<{ t: number; rug?: boolean }> = ({ t, rug }) => <Room t={t} floor="#5a3354" bokeh={WARM} rug={rug ? "#6f3f66" : undefined} />;
const Pile: React.FC<{ p: V3; n: number; s?: number; spread?: number; t: number; at?: number }> = ({ p, n, s = 1, spread = 2.2, t, at = 0.1 }) => (
  <Gr p={p} s={s}>{Array.from({ length: n }, (_, i) => { const r = Math.sqrt(R(i, 2)) * spread, an = R(i, 3) * 6.28; return <Coin key={i} p={[Math.cos(an) * r, 0.1 + (1 - r / spread) * spread * 0.62 * R(i, 4), Math.sin(an) * r * 0.65]} r={[(R(i, 5) - 0.5) * 0.7, R(i, 6) * 6, (R(i, 7) - 0.5) * 0.7]} s={0.75 * pop(t, at + i * 0.006, 0.25)} />; })}</Gr>
);

/* ---------- s07 ---------- */
export const s07a = s3({
  sky: LAMP, aperture: 1.4, vd: 2,
  cam: (a) => cams(a, [[0, 0, 3.4, 20, -14, 14], [a.w("It", 4.7), 0, 3.4, 18, 0, 13], [a.dur, 0, 3.6, 19, 10, 15]]),
  items: (a) => { const years = a.w("years", 6.8), nope = a.w("At", 8.4) - 0.9; const dim = seg(a.t, nope, nope + 0.5); return <>
    <Room t={a.t} floor={dim > 0.5 ? "#333258" : "#5a3354"} bokeh={dim > 0.5 ? COOL : WARM} />
    <Tower t={a.t} p={[0, -0.4, -0.8]} h={5.4} s={1.1} e={dim > 0.5 ? "wait" : "happy"} />
    <Pile t={a.t} p={[0, 0, 1.4]} n={150} spread={3.4} at={0.6} />
    {[-1, 1].map((d) => <Gr key={d} p={[0, 0, 0]}><S g={G.ball(1, 18)} c="#f6bd78" p={[d * 2.9, 1.5, 1.9]} s={0.55} /><Path a={[d * 1.35, 3.4, -0.2]} b={[d * 2.9, 1.5, 1.9]} lift={0.6} k={seg(a.t, 0.9, 1.7)} c="#e89a4e" w={0.34} /></Gr>)}
    {Array.from({ length: 12 }, (_, i) => { const t0 = years - 1.9 + i * 0.2, u = seg(a.t, t0, t0 + 0.9, Easing.in(Easing.quad)); return a.t < t0 || u >= 1 ? null : <Calendar key={i} text={String(2013 + i)} s={0.55 * (1 - u * 0.5)} p={fly(a.t, t0, t0 + 0.9, [(i % 2 ? 1 : -1) * 8, 8.5 - (i % 3), 1], [0, 5.2, 0.6], 1.2)} r={[0, 0, (1 - u) * (i % 2 ? 0.6 : -0.6)]} />; })}
    {dim > 0.01 && <Gr p={[0, 4.4, 3.2]} s={pop(a.t, nope, 0.35)}>{[1, -1].map((d) => <S key={d} g={G.box(6.4, 0.55, 0.4, 0.2)} c="#e0342c" glow={0.35} r={[0, 0, d * 0.62]} />)}</Gr>}
  </>; },
  labels: [["THE GUESS", [-4.4, 6.4, 0], "right", "#6a6480"], ["YEARS OF WORK", [4.6, 5.6, 0], "left", "#a8503c"]],
});
export const s07b = s3({
  sky: LAMP, aperture: 1.7,
  cam: (a) => cams(a, [[0, -1.4, 3.2, 19, -16, 30], [a.dur, 2.4, 3.2, 17, 14, 22]]),
  items: (a) => { const last = a.w("last", 2.1); const route: V3[] = [[-5.2, TOP + 0.5, 0.2], [-2.0, TOP + 0.5, -2.6], [1.8, TOP + 0.5, -2.6], [4.6, TOP + 0.5, -0.2]]; return <>
    <Warm t={a.t} rug />
    <Table r={4.8} />
    <State t={a.t} p={[-6.4, 0, -1.2]} s={0.72} ry={0.4} e="calm" /><Store t={a.t} p={[-2.6, 0, -5]} s={0.72} /><CardGate t={a.t} p={[2.3, 0, -5]} s={0.72} />
    <Tower t={a.t} p={[7.0, -0.3, -1.2]} h={4.6} s={0.85} ry={-0.45} e={a.t > last ? "calm" : "wait"} />
    {Array.from({ length: 24 }, (_, i) => { const stop = i < 3 ? 0 : i < 10 ? 1 : i < 12 ? 2 : 3; const t0 = 0.15 + i * 0.04; let p = route[0]; for (let k = 0; k < stop; k++) { const s0 = t0 + k * 0.55; if (a.t > s0) p = fly(a.t, s0, s0 + 0.55, route[k], route[k + 1], 0.9); }
      return <Coin key={i} s={0.7} p={[p[0] + (R(i, 2) - 0.5) * 0.8, p[1] + (i % 4) * 0.13, p[2] + (R(i, 3) - 0.5) * 0.8]} />; })}
    <Spot p={[7.0, 0.2, -1.2]} r={2.3} k={seg(a.t, last, last + 0.4)} />
  </>; },
  labels: [["SERVED LAST", [7.0, 7.0, -1.2], "down", "#c9742f"]],
});

/* ---------- s08 ---------- */
export const s08a = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 0, 4, 15, -12, 14], [a.dur, 0.4, 4, 13.5, 8, 10]]),
  items: (a) => <>
    <Warm t={a.t} />
    <Receipt p={[0, 4.2, 0]} len={5.8} s={1.05} r={[-0.12, -0.18 + a.t * 0.05, -0.04]} />
    <Magnifier p={[keys(a.t, [0, a.dur], [-3.2, 2.4]), 4.8 + Math.sin(a.t * 2) * 0.5, 2.2]} s={1.15} />
  </>,
});
export const s08b = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => { const rv = a.w("Revenue", 7.3); return cams(a, [[0, -0.6, 3.6, 19, -10, 18], [rv - 1.7, 0, 3.4, 17.5, 4, 17], [rv - 0.4, 0.2, 3.4, 19, 8, 18], [a.dur, 1.4, 3.4, 19, 14, 16]]); },
  items: (a) => { const rv = a.w("Revenue", 7.3); const took = a.w("everyone", 9.8) - 1.0; const gone = seg(a.t, took, took + 1.6); return <>
    <Warm t={a.t} />
    <Register t={a.t} p={[-6.4, 0, -0.5]} s={0.95} open={pop(a.t, 0.2, 0.4)} />
    <Pile t={a.t} p={[-1.2, 0, 0]} n={Math.round(170 - 105 * gone)} spread={3.2 - 1.2 * gone} />
    {Array.from({ length: 26 }, (_, i) => { const t0 = 0.3 + i * 0.22, u = seg(a.t, t0, t0 + 0.7); return a.t < t0 || u >= 1 || a.t > took ? null : <Coin key={i} s={0.75} p={fly(a.t, t0, t0 + 0.7, [(R(i, 3) - 0.5) * 14, 9.5, -2], [-1.2, 1.6, 0], 0.8)} r={[u * 6, 0, u * 3]} />; })}
    {Array.from({ length: 40 }, (_, i) => { const hand = i % 4, t0 = took + hand * 0.28 + i * 0.012, u = seg(a.t, t0, t0 + 0.9); const to: V3[] = [[-9, 6, -3], [-4, 8.5, -4], [3, 8.5, -4], [-8, 1, 5]]; return a.t < t0 || u >= 1 ? null : <Coin key={"o" + i} s={0.75 * (1 - u * 0.4)} p={fly(a.t, t0, t0 + 0.9, [-1.2, 1.5, 0], to[hand], 1.6)} />; })}
    <Pop t={a.t} at={rv - 0.3} p={[6.0, -0.4, -0.8]}><Tower t={a.t} p={[0, 0, 0]} h={4.4} s={0.9} ry={-0.35} e="calm" /></Pop>
    <Pop t={a.t} at={1.6} p={[-1.2, 5.7, 0]}><TextPlane text="$3.79B" h={1.25} color="#ffffff" bg={gone > 0.5 ? "#7a6a88" : "#e2573d"} /></Pop>
  </>; },
  labels: [["RETAIL SALES", [-1.2, 7.0, 0], "down", "#e2573d"], ["REVENUE", [6.0, 6.4, -0.8], "down", "#13966a"]],
});
export const s08c = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 0, 3.4, 20, 10, 34], [a.dur, 0, 3.2, 14.5, -5, 30]]),
  items: (a) => { const u = seg(a.t, 0.05, 0.6, Easing.in(Easing.quad)); const bounce = Math.sin(seg(a.t, 0.6, 1.1, Easing.linear) * Math.PI) * 0.25; return <>
    <Warm t={a.t} />
    <Table r={5.2} />
    <Newspaper p={[0, TOP + 0.25 + (1 - u) * 6 + bounce, 0.3]} r={[-Math.PI / 2, 0, -0.12 + (1 - u) * 1.4]} />
    <Stack n={5} p={[-4, TOP, -1]} s={0.8} /><Stack n={3} p={[4.1, TOP, 0.6]} s={0.8} />
  </>; },
  bubble: (a) => ({ at: [2.4, 5.0, -0.5], p: pop(a.t, Math.min(a.dur - 1.4, 1.0), 0.25) }),
});

/* ---------- s09-s10: negara ---------- */
export const s09 = s3({
  sky: LAMP, aperture: 1.6, vd: 1.9,
  cam: (a) => { const tax = a.w("sales", 2.8); return cams(a, [[0, -2.8, 4, 19, -16, 15], [tax, -1.0, 3.8, 17, -4, 16], [a.dur, 0.4, 4.2, 18, 10, 17]]); },
  items: (a) => { const tax = a.w("sales", 2.8), heavy = a.w("heavier", 6.1); const sag = seg(a.t, tax + 0.4, heavy + 0.5); return <>
    <Warm t={a.t} />
    <Table r={4.8} />
    <State t={a.t} p={[-6.4, 0, -0.8]} s={1.05} ry={0.4} reach={0.7 + Math.sin(a.t * 2) * 0.3} />
    <Bag t={a.t} p={[0, TOP, 0]} s={1.15 + sag * 0.25} squash={sag * 0.7} e={sag > 0.4 ? "nervous" : "calm"} />
    {Array.from({ length: 18 }, (_, i) => { const t0 = tax + i * 0.16, u = seg(a.t, t0, t0 + 0.6, Easing.in(Easing.quad)); return a.t < t0 || u >= 1 ? null : <Coin key={i} s={0.8} p={[(R(i, 2) - 0.5) * 1.2, TOP + 3.2 + (1 - u) * 5, 0.3]} r={[u * 5, 0, 0]} />; })}
    <Stack n={Math.round(sag * 8)} p={[2.8, TOP, 0.9]} />
  </>; },
  hud: (a) => <Tracker a={a} n={1} />,
  labels: [["HAND 1", [-6.4, 7.8, -0.8], "down", "#6c74c9"], ["SALES TAX", [2.8, 4.6, 0.9], "down", "#a8503c"]],
});
export const s10a = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => { const st = a.w("store", 4.2), back2 = a.w("It", 7.1); return cams(a, [[0, 0, 3.4, 16, -10, 26], [st - 0.3, -0.6, 3.4, 18, 0, 20], [back2, -1.4, 3.5, 20, 10, 18], [a.dur, 0, 3.4, 20.5, -4, 24]]); },
  items: (a) => { const five = a.w("five", 2.8), st = a.w("store", 4.2), pass = a.w("passes", 5.5), never = a.w("never", 7.3);
    const base: V3 = [0.2, TOP + 0.1, 0.3], atStore: V3 = [3.6, TOP + 0.5, -1.2], atState: V3 = [-6.0, 3.2, 0.4];
    return <>
      <Warm t={a.t} rug />
      <Table r={4.8} />
      <State t={a.t} p={[-6.8, 0, -1]} s={0.9} ry={0.4} e={a.t > pass + 0.6 ? "calm" : "stern"} />
      <Store t={a.t} p={[5.9, 0, -2.4]} s={0.85} ry={-0.35} />
      <Bag t={a.t} p={[-1.7, TOP, -0.6]} s={0.85} />
      {Array.from({ length: 6 }, (_, i) => { let p: V3 = base; if (a.t > st) p = fly(a.t, st + i * 0.05, st + 0.7 + i * 0.05, base, atStore, 1); if (a.t > pass) p = fly(a.t, pass + i * 0.07, pass + 1.0 + i * 0.07, atStore, atState, 2.6);
        const s = i === 5 ? 0.6 : 1; return a.t > pass + 1.0 + i * 0.07 ? null : <Coin key={i} s={s * 0.95 * pop(a.t, five - 0.4 + i * 0.08, 0.25)} glow={0.45} p={[p[0] + (i % 2) * 0.12, p[1] + i * 0.16, p[2]]} />; })}
      {a.t < st && <Spot p={[0.2, TOP + 0.1, 0.3]} r={1.0} k={seg(a.t, five - 0.2, five + 0.2)} />}
      <Pop t={a.t} at={never} p={[0, 0, 0]}>{[[-4.2, TOP + 0.4, 2.2], [4.0, TOP + 0.4, 2.0]].map((p, i) => <Chair key={i} p={[p[0] * 1.35, -0.4, p[2] + 1.2]} lit={0} ry={p[0] < 0 ? 0.9 : -0.9} />)}</Pop>
    </>; },
  hud: (a) => <Tracker a={a} n={1} />,
  labels: [["≈ $5.60", [0.4, 4.6, 0.3], "down", "#a8503c"]],
});
const US = () => poly([[-5.6, 2.2], [-4.9, 3.0], [-1.0, 2.9], [1.8, 2.5], [2.6, 2.9], [3.2, 2.3], [4.6, 2.7], [5.7, 3.2], [5.9, 2.4], [5.0, 1.2], [4.7, 0.1], [3.8, -0.8], [4.4, -2.7], [3.7, -2.8], [3.0, -1.5], [1.0, -1.7], [-0.3, -2.9], [-1.2, -1.9], [-2.8, -1.8], [-3.6, -1.2], [-5.0, -0.9], [-5.7, 0.4]]);
const OR = () => poly([[-5.62, 2.0], [-5.5, 2.4], [-4.8, 2.15], [-3.7, 2.2], [-3.75, 0.9], [-5.65, 0.95]]);
export const s10b = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 0.6, 4.8, 21, -12, 8], [a.dur, -1.6, 4.8, 17, 6, 6]]),
  items: (a) => { const or = a.w("Oregon", 1.8, 0); const lit = seg(a.t, Math.max(0.2, or - 0.2), or + 0.5); return <>
    <Warm t={a.t} />
    <Gr p={[0.4, 4.0, -1]} r={[-0.1, -0.08, 0]}>
      <M g={G.ext("usMap", US, 0.7, 0.18)} c="#8f86c8" />
      <Gr p={[0, 0, 0.35 + lit * 0.6]}><M g={G.ext("orState", OR, 0.5, 0.1)} c={lit > 0.3 ? "#ffd766" : "#a89fd8"} o={{ glow: lit * 0.4 }} /></Gr>
    </Gr>
    <Pop t={a.t} at={or} p={[-4.5, 7.2, 0.6]}><Bag t={a.t} p={[0, 0, 0]} s={0.75} e="happy" /></Pop>
    <Rod a={[-4.4, 6.9, 0.4]} b={[-4.3, 5.8, -0.1]} w={0.05 * lit} c="#ffd766" />
  </>; },
  hud: (a) => <Tracker a={a} n={1} />,
  labels: [["OREGON", [-4.4, 4.9, 0.4], "up", "#c9742f"], ["NO TAX", [-1.6, 8.0, 0.6], "left", "#13966a"]],
});

/* ---------- s11: toko mengambil 30% ---------- */
const STORE_C: [string, string] = ["#3f7ce0", "#8fbcff"];
export const s11 = s3({
  sky: LAMP, aperture: 1.4, vd: 1.9,
  cam: (a) => { const th = a.w("thirty", 3.6), dol = a.w("twenty-four", 7.5); return cams(a, [[0, 2.6, 4, 18, 14, 12], [th - 0.4, 0, 4.6, 19, 0, 8], [dol - 0.6, 0, 4.6, 19, -6, 8], [a.dur, 1.8, 4.4, 20, -14, 10]]); },
  items: (a) => { const th = a.w("thirty", 3.6), dol = a.w("twenty-four", 7.5); const wall = seg(a.t, th - 1.2, th - 0.6), take = seg(a.t, dol - 0.5, dol + 0.7); return <>
    <Warm t={a.t} />
    <Store t={a.t} p={[mix(4.5, 7.4, wall), 0, -0.5]} s={1.05} ry={-0.35 - Math.sin(seg(a.t, 0, 1.4) * Math.PI) * 0.2} />
    {a.t < th - 1.1 && <Bag t={a.t} p={[-1.5, 0, 1]} s={1.5} e="nervous" />}
    {a.t > th - 1.2 && Array.from({ length: 80 }, (_, i) => { const col = i % 10, row = Math.floor(i / 10), mine = col >= 7; const on = mine && a.t > th - 0.1 + row * 0.07;
      const u = mine ? take : 0; return <Coin key={i} s={0.8 * pop(a.t, th - 1.2 + (col + row) * 0.03, 0.3)} c={on ? STORE_C[0] : undefined} hi={on ? STORE_C[1] : undefined} glow={on ? 0.3 : 0.12}
        p={[-4.4 + col * 0.74 + u * 1.5, 7.2 - row * 0.74 + Math.sin(a.t * 1.8 + col + row) * 0.03, u * 0.8]} r={[Math.PI / 2, 0, 0]} />; })}
  </>; },
  hud: (a) => <Tracker a={a} n={2} />,
  labels: [["HAND 2", [7.4, 7.4, -0.5], "down", "#2f66b8"], ["30%", [2.9, 8.6, 0.6], "down", "#2f66b8"], ["$24", [3.8, 1.4, 1], "up", "#2f66b8"]],
});

/* ---------- s12: bukan rahasia ---------- */
export const s12a = s3({
  sky: NIGHT,
  cam: (a) => cams(a, [[0, 0, 3.6, 17, 22, 18], [a.dur, 0, 4.6, 14, 4, 10]]),
  items: (a) => { const o = seg(a.t, 0.15, 0.75, back), up = seg(a.t, 0.7, a.dur + 0.3); return <>
    <Room t={a.t} floor="#2a2358" bokeh={BLUE} />
    <Cabinet p={[0, 0, -1]} open={o} />
    <Gr p={[0.2, 4.1 + up * 2.4, 1.0 + up * 0.8]} r={[-0.15, Math.sin(a.t * 1.6) * 0.3, 0.12]} s={0.4 + 0.6 * up}><Paper p={[0, 0, 0]} n={1} s={0.1} /><S g={G.box(2.2, 2.8, 0.1, 0.05)} c="#fff8ea" glow={0.2} /><TextPlane text="30%" h={1} color="#2f66b8" p={[0, 0.2, 0.08]} /></Gr>
  </>; },
});
export const s12b = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => cams(a, [[0, -2.2, 3.6, 19, -18, 13], [a.w("Nintendo", 4.4), 0, 3.8, 20, -2, 13], [a.dur, 1.2, 3.8, 18.5, 12, 11]]),
  items: (a) => { const nin = a.w("Nintendo", 4.4), th = a.w("thirty", 7.2); return <>
    <Warm t={a.t} />
    <Courtroom />
    <Gr p={[-6.6, 0, 1]}><S g={G.box(2.6, 2.0, 1.8, 0.4)} c="#a8644e" p={[0, 1.0, 0]} /><S g={G.ball(0.85, 28)} c="#8f86c8" p={[0, 3.5, 0]} /><S g={G.ball(1, 28)} c="#8f86c8" p={[0, 2.1, 0]} s={[0.9, 1, 0.8]} /></Gr>
    {[-1.4, 2.4, 6.2].map((x, i) => { const at = nin - 0.2 + i * 0.7; return <Gr key={i} p={[x, 0, -0.2]}>
      <Store t={a.t + i} p={[0, 0, 0]} s={0.72} e="smug" />
      <Pop t={a.t} at={Math.min(at + 0.4, th - 0.2 + i * 0.12)} p={[0, 5.6, 0.6]}><S g={G.box(2.4, 1.4, 0.18, 0.25)} c="#fff8ea" glow={0.22} /><TextPlane text="30%" h={0.95} color="#2f66b8" p={[0, 0, 0.13]} /></Pop></Gr>; })}
    <S g={G.box(12, 1.1, 0.8, 0.3)} c="#8a4f45" p={[2.4, 0.55, 1.9]} />
  </>; },
  labels: [["30% EACH", [2.4, 7.5, 0.6], "down", "#2f66b8"]],
});

/* ---------- s13: console dijual murah ---------- */
export const s13a = s3({
  sky: NIGHT,
  cam: (a) => cams(a, [[0, 0, 4.2, 20, -16, 10], [a.dur, 0, 4.0, 14, 8, 8]]),
  items: (a) => <>
    <Room t={a.t} floor="#2a2358" bokeh={BLUE} />
    <HangLamp t={a.t} p={[0, 9.4, 0.8]} />
    <Store t={a.t} p={[0, 0, mix(-4, 0.4, seg(a.t, 0.1, 1.6))]} s={1.2} e="happy" />
    <Spot p={[0, 0.1, 0.4]} r={3.2} k={seg(a.t, 1.2, 1.7)} />
    {[-1, 1].map((d) => <Gr key={d} p={[d * 4.2, 0, 2.2]}><Rod a={[0, 0, 0]} b={[0, 2.6, 0]} w={0.1} c="#6f6a8a" /><S g={G.ball(0.35)} c="#3a2a52" p={[0, 2.85, 0]} s={[1, 1.4, 1]} /></Gr>)}
  </>,
});
export const s13b = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => cams(a, [[0, -2.4, 3.2, 16, -12, 16], [a.w("earn", 3.3), -1.6, 3.2, 17, -2, 15], [a.dur, 0.8, 3.4, 19, 12, 14]]),
  items: (a) => { const loss = a.w("loss", 2.4), earn = a.w("earn", 3.3); return <>
    <Warm t={a.t} />
    <ConsoleBox p={[-4.2, 0.3, 0]} s={1.25} />
    <Gr p={[-2.2, 3.0 + Math.sin(a.t * 2) * 0.12, 0.8]} r={[0, 0, -0.35]}><Rod a={[-1.2, -0.9, 0]} b={[0, -0.1, 0]} w={0.04} c="#fff2d8" /><S g={G.box(1.9, 1.1, 0.2, 0.3)} c="#ffd766" glow={0.2} /><S g={G.ball(0.14)} c="#7a423e" p={[-0.6, 0, 0.15]} /></Gr>
    {Array.from({ length: 3 }, (_, i) => { const t0 = loss - 0.3 + i * 0.25, u = seg(a.t, t0, t0 + 0.9, Easing.in(Easing.quad)); return a.t < t0 ? null : <Coin key={i} s={1.1} c="#e0342c" hi="#ff8a80" glow={0.3} p={[-3.8 + i * 0.5 + u * 0.8, mix(2.2, 0.3, u), 1.8 + u]} r={[u * 4, 0, u * 2]} />; })}
    <Store t={a.t} p={[6.6, 0, -1.6]} s={0.9} ry={-0.35} />
    {Array.from({ length: 9 }, (_, i) => { const t0 = earn - 0.6 + i * 0.62, u = seg(a.t, t0, t0 + 2.2, Easing.linear); return a.t < t0 || u >= 1 ? null : <Gr key={i}><GameBox p={[mix(-9, 9, u), 5.6 + Math.sin(u * 6 + i) * 0.35, -1]} r={[0, u * 5, 0.1]} c={["#7a6ad8", "#e2573d", "#13966a"][i % 3]} />
      {u > 0.25 && <Coin s={0.8} glow={0.4} p={fly(u, 0.25, 0.95, [mix(-9, 9, 0.25), 5.2, -1], [5.4, 2.6, 0.4], 1)} />}</Gr>; })}
    <Stack n={Math.min(14, Math.max(0, Math.floor((a.t - earn) * 2.4)))} p={[4.4, 0.1, 1.6]} s={1.1} />
  </>; },
  labels: [["LOSS", [-3.2, 1.0, 2.4], "up", "#d8322b"], ["BACK", [4.4, 4.4, 1.6], "down", "#13966a"]],
});
export const s13c = s3({
  sky: NIGHT,
  cam: (a) => cams(a, [[0, 0, 3.6, 21, -14, 10], [a.w("door", 1.3), 0, 3.4, 16, -4, 8], [a.dur + 0.4, 0, 3.2, 8.5, 0, 6]]),
  items: (a) => { const walk = seg(a.t, 0.2, a.dur + 0.2); return <>
    <Room t={a.t} floor="#2a2358" bokeh={BLUE} />
    <Doorway p={[0, 0, -2]} kind="console" s={1.2} glow={0.4 + walk * 0.4} />
    <Bag t={a.t} p={[mix(-4.5, 0, walk), Math.abs(Math.sin(a.t * 7)) * 0.35, mix(4, -0.8, walk)]} s={0.8 - walk * 0.15} e="happy" />
  </>; },
  labels: [["THE DOOR", [0, 7.4, -2], "down", "#2f66b8"]],
});
export const s13d = s3({
  sky: LAMP, aperture: 1.7,
  cam: (a) => cams(a, [[0, -2.5, 3.8, 19, -22, 18], [a.dur, 1.6, 3.4, 18, 8, 15]]),
  items: (a) => <>
    <Room t={a.t} floor="#4a2450" bokeh={["#ffd766", "#ff7a9a", "#46cfa8"]} />
    {[-7, -2.4, 2.4, 7].map((x, i) => <HangLamp key={i} t={a.t} p={[x, 10, -4]} s={0.75} />)}
    <S g={G.box(17, 0.5, 2.6, 0.22)} c="#3a2a52" p={[-1.4, 1.2, 0]} />
    {Array.from({ length: 7 }, (_, i) => { const x = -10 + ((i * 2.7 + a.t * 2.2) % 18.9); const passed = x > -2; return <Gr key={i}><GameBox p={[x, 2.35, 0]} c={["#7a6ad8", "#e2573d", "#13966a"][i % 3]} />{passed && x < 3 && <Coin s={0.85} glow={0.45} p={fly(x, -2, 3, [-2, 3.4, 0], [4.6, 3.2, 1.2], 1.6)} />}</Gr>; })}
    <Store t={a.t} p={[6.6, 0, -1.2]} s={1.0} ry={-0.35} />
    <S g={G.cyl(1.5, 1.1, 1.4, 36)} c="#2f66b8" p={[4.6, 1.9, 1.8]} /><Stack n={Math.min(9, 2 + Math.floor(a.t * 2))} p={[4.6, 2.55, 1.8]} />
  </>,
  labels: [["THE HOUSE", [6.6, 7.2, -1.2], "down", "#2f66b8"]],
  bubble: (a) => ({ at: [2.6, 6.2, -1], p: pop(a.t, Math.min(a.dur - 1.3, 1.2), 0.25) }),
});

/* ---------- s14: skala ---------- */
export const s14 = s3({
  sky: NIGHT, aperture: 1.1, vd: 1.8,
  cam: (a) => { const two = a.w("two", 5.1); return cams(a, [[0, 0, 2.6, 13, -6, 20], [a.w("ten", 0.9) + 0.6, 0, 3.6, 24, 6, 36], [two, 0, 4.4, 26, 12, 30], [a.dur, 0, 4.8, 24, -4, 22]]); },
  items: (a) => { const ten = a.w("ten", 0.9), two = a.w("two", 5.1); const val = Math.round(seg(a.t, two - 0.9, two + 0.9) * 24) * 10; return <>
    <Room t={a.t} floor="#241f50" bokeh={BLUE} />
    <Stack n={12} p={[0, 0, 2]} s={1.2} />
    {Array.from({ length: 130 }, (_, i) => { const col = i % 13, row = Math.floor(i / 13); const x = (col - 6) * 1.5, z = 0.2 - row * 1.5; const d = Math.hypot(x, z - 2) / 17; const k = pop(a.t, ten - 0.3 + d * 1.8, 0.35); return k <= 0.02 ? null : <Gr key={i} p={[x, 0, z]} s={[0.85, k, 0.85]}><Stack n={5 + Math.floor(R(i, 2) * 6)} p={[0, 0, 0]} /></Gr>; })}
    <Pop t={a.t} at={two - 0.9} p={[0, 8.6, -2]}><TextPlane text={`$${val}M`} h={2.4} color="#ffffff" bg="#2f66b8" /></Pop>
  </>; },
  hud: (a) => <Tracker a={a} n={2} />,
  labels: [["10M COPIES", [-6.4, 5.4, -3], "down", "#a8503c"], ["$240M", [6.4, 7.2, -2], "down", "#2f66b8"]],
  bubble: (a) => ({ at: [3.6, 4.4, 1], p: pop(a.t, a.w("didn't", 7.7), 0.25) }),
});

/* ---------- s15: toko mana ---------- */
const BlueKiosk = Store;
const GreenKiosk: React.FC<{ t: number; p: V3; s?: number }> = ({ t, p, s = 1 }) => (
  <Gr p={p} s={s}><Gr s={[1, 1 + Math.sin(t * 2 + 8) * 0.015, 1]}><S g={G.box(3.2, 3.9, 1.9, 0.6)} c="#3fae78" p={[0, 2.9, 0]} /><S g={G.box(2.5, 1.9, 0.3, 0.4)} c="#e4fff0" glow={0.18} p={[0, 3.45, 0.88]} />
    {Array.from({ length: 5 }, (_, i) => <S key={i} g={G.ball(1, 20)} c={i % 2 ? "#fff6ea" : "#ffcf5a"} p={[-1.4 + i * 0.7, 5.0 + Math.sin(t * 3 + i) * 0.025, 0.55]} s={[0.4, 0.34, 0.9]} />)}
    <S g={G.box(3.5, 0.45, 2.4, 0.22)} c="#2c8058" p={[0, 2.15, 0.15]} />
    {[-0.45, 0.45].map((x) => <S key={x} g={G.ball(1, 16)} c="#241a2e" p={[x, 3.6, 1.1]} s={[0.14, ((t % 3.3) < 0.12 ? 0.03 : 0.18), 0.09]} />)}<M g={G.torus(0.26, 0.05, Math.PI)} c="#241a2e" p={[0, 3.2, 1.1]} r={[0, 0, Math.PI]} /></Gr></Gr>
);
export const s15a = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 0, 3.6, 19, -18, 12], [a.dur, 0, 3.6, 16.5, 10, 10]]),
  items: (a) => <><Warm t={a.t} /><Pop t={a.t} at={0.05} p={[-3.4, 0, 0]}><BlueKiosk t={a.t} p={[0, 0, 0]} s={1.05} /></Pop><Pop t={a.t} at={0.3} p={[3.4, 0, 0]}><GreenKiosk t={a.t} p={[0, 0, 0]} s={1.05} /></Pop></>,
  hud: (a) => <Tracker a={a} n={2} />,
});
export const s15b = s3({
  sky: LAMP, aperture: 1.4,
  cam: (a) => cams(a, [[0, 0, 3.2, 21, 8, 26], [a.dur, 0, 3.0, 18.5, -8, 22]]),
  items: (a) => { const three = a.w("three", 3.2); return <>
    <Warm t={a.t} />
    <BlueKiosk t={a.t} p={[-5.2, 0, -3]} s={1} /><GreenKiosk t={a.t} p={[5.2, 0, -3]} s={1} />
    {[0, 1, 2, 3].map((i) => { const left = i < 3; const t0 = three - 0.8 + i * 0.35; const p = fly(a.t, t0, t0 + 1.2, [-3 + i * 2, 0, 5.2], left ? [-7 + i * 1.8, 0, 0.2] : [5.2, 0, 0.2], 0.4);
      return <Gr key={i} p={[p[0], p[1] + Math.abs(Math.sin(a.t * 5 + i)) * 0.15, p[2]]}><S g={G.ball(1, 24)} c={a.t > t0 + 1 ? (left ? "#6f9cf0" : "#6fd09c") : "#e8c39a"} p={[0, 0.95, 0]} s={[0.65, 0.95, 0.55]} /><S g={G.ball(0.52, 24)} c="#f2d2b4" p={[0, 2.25, 0]} />{[-0.17, 0.17].map((x) => <S key={x} g={G.ball(0.07, 10)} c="#241a2e" p={[x, 2.3, 0.5]} />)}</Gr>; })}
  </>; },
  hud: (a) => <Tracker a={a} n={2} />,
  labels: [["3 OF 4", [-5.2, 6.8, -3], "down", "#2f66b8"]],
});
export const s15c = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => cams(a, [[0, -3, 3.0, 17, -22, 20], [a.dur, 2.6, 3.0, 17, 12, 17]]),
  items: (a) => { const u = seg(a.t, 0.2, a.dur - 0.8); const margin = a.w("margin", 5); return <>
    <Warm t={a.t} />
    <S g={G.box(22, 0.1, 2.2, 0.05)} c="#8a6a8e" p={[0, 0.07, 1]} />
    <Gr p={[mix(-8, 3.0, u), 1.3 + Math.abs(Math.sin(a.t * 6)) * 0.12, 1]} r={[0, Math.sin(a.t * 2) * 0.2, 0]}><S g={G.box(2.0, 2.4, 1.2, 0.28)} c="#d9a878" /><S g={G.box(1.2, 0.75, 0.1, 0.1)} c="#fff8ea" glow={0.2} p={[0, 0.1, 0.65]} />{[-0.35, -0.12, 0.1, 0.34].map((x) => <S key={x} g={G.box(0.09, 0.45, 0.04, 0.02)} c="#2a1c30" p={[x, 0.1, 0.72]} />)}</Gr>
    <GreenKiosk t={a.t} p={[6.6, 0, -1.6]} s={0.95} />
    <Pop t={a.t} at={margin - 0.4} p={[5.0, 0.1, 2.2]}><Stack n={5} p={[0, 0, 0]} s={1.2} /></Pop>
  </>; },
  hud: (a) => <Tracker a={a} n={2} />,
  labels: [["BOXED", [-3.6, 4.4, 1], "down", "#a8503c"]],
});
export const s15d = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 3, 3.2, 18, 18, 20], [a.dur, 0, 3.2, 15, -6, 16]]),
  items: (a) => <>
    <Warm t={a.t} />
    <S g={G.box(26, 0.1, 3, 0.05)} c="#8a6a8e" p={[0, 0.07, 0.4]} />
    <Bag t={a.t} p={[mix(-4.5, 0, seg(a.t, 0.05, 1.4)), 0.1, 0.4]} s={1.15} e="happy" />
    {Array.from({ length: 22 }, (_, i) => { const q = (a.t * 0.8 + i / 22) % 1; return <S key={i} g={G.ball(0.13, 10)} c="#7ff0d8" glow={1} cast={false} p={[mix(1.5, 8.5, q), 2.4 + Math.sin(q * 7 + a.t) * 0.3, 0.4]} s={Math.sin(q * Math.PI)} />; })}
    <ConsoleBox p={[8.2, 0.1, -0.6]} s={0.85} />
  </>,
  hud: (a) => <Tracker a={a} n={2} />,
  labels: [["DOWNLOAD", [3.6, 5.0, 0.4], "down", "#13966a"]],
});
