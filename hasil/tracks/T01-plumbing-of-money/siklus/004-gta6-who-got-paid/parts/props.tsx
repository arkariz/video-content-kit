// Benda tambahan untuk s07-s37. Semua orisinal dan generik (tanpa logo atau merek).
import React from "react";
import { Easing } from "remotion";
import { R, W, clamp, mix, pop, seg, SANS } from "@r3";
import { G, Gr, Hose, M, Rod, TextPlane, V3, poly } from "@r3/three";
import { A, Coin, Face, Expr, S, back } from "./base";

/** Kamera berkunci per detik: [t, x, y, jarak, yaw, pitch]. */
export const cams = (a: A, ks: [number, number, number, number, number, number][]) => {
  const e = Easing.inOut(Easing.sin);
  let i = 0; while (i < ks.length - 2 && a.t > ks[i + 1][0]) i++;
  const p = ks[i], q = ks[Math.min(i + 1, ks.length - 1)], u = seg(a.t, p[0], Math.max(q[0], p[0] + 0.01), e);
  const m = (k: number) => mix(p[k], q[k], u);
  return { at: [m(1), m(2), 0] as V3, d: m(3), yaw: m(4), pitch: m(5) };
};

/** Penanda posisi cerita: empat tangan, yang sedang dibahas menyala (jangkar di sudut kiri atas). */
export const Tracker: React.FC<{ a: A; n: number }> = ({ a, n }) => {
  const names = ["STATE", "STORE", "CARD", "PUBLISHER"], colors = ["#6c74c9", "#2f66b8", "#13966a", "#c9742f"];
  const p = pop(a.t, 0.15, 0.35), x0 = a.vertical ? W / 2 - 170 : 80;
  return (
    <g transform={`translate(${x0} ${a.vertical ? 70 : 76}) scale(${p})`}>
      <rect x={-34} y={-38} width={388} height={96} rx={48} fill="#120c24" opacity={0.5} />
      {names.map((name, i) => {
        const on = i === n - 1, k = on ? 1 + Math.sin(a.t * 4) * 0.06 + (pop(a.t, 0.45, 0.35) - 1) * 0.5 : 1;
        return <g key={name} transform={`translate(${i * 106} 0)`}>
          <circle r={26 * (on ? 1.15 * k : 0.85)} fill={on || i < n - 1 ? colors[i] : "#6a6480"} opacity={on ? 1 : 0.6} />
          <text y={9} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={26} fill="#fff">{i + 1}</text>
          {on && <text y={50} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={17} fill="#fff">{name}</text>}
        </g>;
      })}
    </g>
  );
};

/** Geser halus dari a ke b antara detik t0 dan t1, dengan lengkung setinggi lift. */
export const fly = (t: number, t0: number, t1: number, a: V3, b: V3, lift = 1): V3 => {
  const u = seg(t, t0, t1); return [mix(a[0], b[0], u), mix(a[1], b[1], u) + Math.sin(u * Math.PI) * lift, mix(a[2], b[2], u)];
};

/** Kisi koin tegak yang bisa dihitung; color(i) menentukan warna koin ke-i. */
export const CoinWall: React.FC<{ t: number; p: V3; cols: number; rows: number; gap?: number; color?: (i: number, col: number, row: number) => [string, string] | undefined; from?: number }> = ({ t, p, cols, rows, gap = 0.74, color, from = 0.1 }) => (
  <Gr p={p}>{Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols, row = Math.floor(i / cols), c = color?.(i, col, row);
    const lit = c ? 1.08 : 1;
    return <Coin key={i} c={c?.[0]} hi={c?.[1]} glow={c ? 0.28 : 0.12} s={0.78 * lit * pop(t, from + (col + row) * 0.035, 0.3)}
      p={[(col - (cols - 1) / 2) * gap, ((rows - 1) / 2 - row) * gap + Math.sin(t * 1.8 + col * 0.7 + row) * 0.04, c ? 0.12 : 0]} r={[Math.PI / 2, 0, 0]} />;
  })}</Gr>
);

export const Receipt: React.FC<{ p: V3; s?: number; len?: number; top?: string; stamp?: number; r?: V3 }> = ({ p, s = 1, len = 4.6, top, stamp = 0, r }) => (
  <Gr p={p} s={s} r={r}>
    <S g={G.box(3.2, len, 0.14, 0.07)} c="#fff8ea" glow={0.16} />
    {Array.from({ length: Math.floor((len - 1.6) / 0.5) }, (_, i) => <S key={i} g={G.box(2.4 - (i % 3) * 0.5, 0.13, 0.05, 0.02)} c="#bcae92" p={[-(i % 3) * 0.25, len / 2 - 1.35 - i * 0.5, 0.09]} />)}
    {top ? <TextPlane text={top} h={0.8} color="#ffffff" bg="#2f66b8" p={[0, len / 2 - 0.55, 0.12]} /> : <S g={G.box(2.2, 0.3, 0.05, 0.02)} c="#8a7a66" p={[0, len / 2 - 0.55, 0.09]} />}
    {stamp > 0.01 && <Gr p={[0.5, -len / 2 + 1.1, 0.2 + (1 - stamp) * 3]} r={[0, 0, 0.25]} s={0.5 + 0.5 * stamp}><S g={G.torus(0.75, 0.13)} c="#2f66b8" glow={0.3} /><S g={G.cyl(0.35, 0.35, 0.1, 24)} c="#2f66b8" glow={0.3} r={[Math.PI / 2, 0, 0]} /></Gr>}
  </Gr>
);
export const Magnifier: React.FC<{ p: V3; s?: number }> = ({ p, s = 1 }) => (
  <Gr p={p} s={s} r={[0, 0, 0.6]}><S g={G.torus(1.25, 0.2)} c="#f4b52c" glow={0.2} /><S g={G.cyl(1.15, 1.15, 0.06, 48)} c="#bfeaff" o={0.28} r={[Math.PI / 2, 0, 0]} cast={false} />
    <Rod a={[0, -1.35, 0]} b={[0, -3.0, 0]} w={0.24} c="#7a423e" /></Gr>
);
export const Register: React.FC<{ t: number; p: V3; s?: number; open?: number }> = ({ t, p, s = 1, open = 0 }) => (
  <Gr p={p} s={s}>
    <S g={G.box(3.8, 1.5, 2.2, 0.4)} c="#e2674e" p={[0, 0.9, 0]} />
    <S g={G.box(3.2, 0.6, 1.9 , 0.25)} c="#f08a6e" p={[0, 1.9, -0.1]} />
    <S g={G.box(2.0, 1.1, 0.5, 0.2)} c="#4a3a66" p={[0, 2.75, -0.4]} /><S g={G.box(1.6, 0.65, 0.1, 0.1)} c="#9ff3d8" glow={0.5} p={[0, 2.8, -0.12]} />
    {Array.from({ length: 12 }, (_, i) => <S key={i} g={G.ball(0.16, 12)} c="#fff2d8" p={[-0.9 + (i % 4) * 0.6, 1.72 + Math.max(0, Math.sin(t * 9 + i * 2)) * -0.06, 1.0 - Math.floor(i / 4) * 0.35 - 0.1]} />)}
    <S g={G.box(3.4, 0.45, 1.8, 0.15)} c="#7a423e" p={[0, 0.45, 0.25 + open * 1.2]} />
  </Gr>
);
export const Newspaper: React.FC<{ p: V3; r?: V3; s?: number; head?: string }> = ({ p, r, s = 1, head = "$3.79B" }) => (
  <Gr p={p} r={r} s={s}>
    <S g={G.box(6.4, 4.6, 0.18, 0.08)} c="#f3ead6" glow={0.12} />
    <TextPlane text={head} h={1.5} color="#2a1c30" p={[0, 1.2, 0.12]} />
    {[-1.9, 0, 1.9].map((x) => [0, 1, 2, 3].map((i) => <S key={`${x}${i}`} g={G.box(1.55, 0.14, 0.05, 0.02)} c="#a89a82" p={[x, -0.25 - i * 0.42, 0.11]} />))}
  </Gr>
);
export const Cabinet: React.FC<{ p: V3; open: number; s?: number }> = ({ p, open, s = 1 }) => (
  <Gr p={p} s={s}>
    <S g={G.box(3.4, 5, 2.2, 0.3)} c="#6f8ab8" p={[0, 2.5, 0]} />
    {[0, 1, 2].map((i) => { const z = i === 0 ? open * 1.5 : 0; return <Gr key={i} p={[0, 4.0 - i * 1.5, 1.1 + z]}><S g={G.box(3.0, 1.3, 0.3, 0.14)} c="#8fa8d4" /><S g={G.box(1.0, 0.22, 0.2, 0.1)} c="#f4b52c" p={[0, 0.1, 0.22]} />{i === 0 && <S g={G.box(2.8, 0.9, 1.5, 0.1)} c="#55709c" p={[0, -0.1, -0.8]} />}</Gr>; })}
  </Gr>
);
export const Gavel: React.FC<{ p: V3; hit: number; s?: number }> = ({ p, hit, s = 1 }) => (
  <Gr p={p} s={s}>
    <S g={G.cyl(1.1, 1.3, 0.4, 36)} c="#7a423e" p={[0, 0.2, 0]} />
    <Gr p={[2.2, 0.9, 0]} r={[0, 0, -0.85 * (1 - hit)]}><Rod a={[0, 0, 0]} b={[-2.2, 0.15, 0]} w={0.16} c="#c9885a" /><Gr p={[-2.2, 0.15, 0]}><S g={G.cyl(0.55, 0.55, 1.5, 28)} c="#a8644e" /><S g={G.torus(0.56, 0.08)} c="#f4b52c" r={[Math.PI / 2, 0, 0]} p={[0, 0.5, 0]} /></Gr></Gr>
  </Gr>
);
export const Calendar: React.FC<{ p: V3; text: string; s?: number; r?: V3; c?: string }> = ({ p, text, s = 1, r, c = "#e2573d" }) => (
  <Gr p={p} s={s} r={r}>
    <S g={G.box(3.2, 3.2, 0.3, 0.2)} c="#fff8ea" glow={0.18} /><S g={G.box(3.22, 0.85, 0.34, 0.18)} c={c} p={[0, 1.2, 0]} />
    {[-0.85, 0.85].map((x) => <S key={x} g={G.torus(0.22, 0.07)} c="#4a3a66" p={[x, 1.65, 0.1]} r={[0, Math.PI / 2, 0]} />)}
    <TextPlane text={text} h={1.15} color="#2a1c40" p={[0, -0.4, 0.2]} />
  </Gr>
);
export const Truck: React.FC<{ t: number; p: V3; s?: number; move?: number; load?: number }> = ({ t, p, s = 1, move = 0, load = 3 }) => (
  <Gr p={p} s={s}><Gr p={[0, Math.sin(t * 13) * 0.025, 0]}>
    <S g={G.box(3.8, 2.4, 2.0, 0.45)} c="#46cfa8" p={[-0.9, 1.9, 0]} />
    <S g={G.box(1.8, 1.8, 1.9, 0.55)} c="#ff8f6e" p={[2.0, 1.6, 0]} /><S g={G.box(0.9, 0.75, 1.94, 0.2)} c="#dff4ff" glow={0.3} p={[2.35, 1.95, 0]} />
    {Array.from({ length: load }, (_, i) => <Gr key={i} p={[-2.0 + i * 0.85, 3.45 + Math.sin(t * 6 + i) * 0.04, 0]} s={0.42}><S g={G.ball(1, 24)} c="#c98d55" p={[0, 0.7, 0]} /><S g={G.cyl(0.5, 0.35, 0.6, 20)} c="#dca56c" p={[0, 1.75, 0]} /><S g={G.torus(0.38, 0.12)} c="#7a4a8e" p={[0, 1.5, 0]} r={[Math.PI / 2, 0, 0]} /></Gr>)}
    <S g={G.box(6.0, 0.35, 1.9, 0.15)} c="#3a2a52" p={[0, 0.85, 0]} />
  </Gr>
  {[-2.0, -0.6, 2.0].map((x) => <Gr key={x} p={[x, 0.55, 1.05]} r={[0, 0, -move * 1.8]}><S g={G.torus(0.42, 0.2)} c="#241a2e" /><S g={G.cyl(0.22, 0.22, 0.28, 20)} c="#cfc6ee" r={[Math.PI / 2, 0, 0]} /><S g={G.box(0.5, 0.09, 0.32, 0.04)} c="#7a6a9a" /></Gr>)}
  </Gr>
);
/** Gedung bank berwajah (bankmu). */
export const Bank: React.FC<{ t: number; p: V3; s?: number; e?: Expr; ry?: number }> = ({ t, p, s = 1, e = "calm", ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}><Gr s={[1, 1 + Math.sin(t * 2 + 5) * 0.015, 1]}>
    <S g={G.box(5.0, 0.5, 2.4, 0.22)} c="#8fd0c8" p={[0, 0.25, 0]} />
    <S g={G.box(4.4, 3.0, 2.0, 0.45)} c="#dff4ee" p={[0, 2.0, 0]} />
    {[-1.75, 1.75].map((x) => <S key={x} g={G.cyl(0.25, 0.28, 2.8, 22)} c="#ffffff" p={[x, 2.0, 1.1]} />)}
    <S g={G.box(5.0, 0.5, 2.4, 0.22)} c="#8fd0c8" p={[0, 3.75, 0]} />
    <M g={G.ext("bankRoof", () => poly([[-2.4, 0], [2.4, 0], [0, 1.3]]), 1.6, 0.18)} c="#3f9a92" p={[0, 4.15, 0]} />
    <Coin p={[0, 4.55, 1.05]} r={[Math.PI / 2, 0, 0]} s={0.9} />
    <Face t={t} p={[0, 2.15, 1.08]} s={1.3} e={e} seed={5} />
  </Gr></Gr>
);
/** Pintu masuk berbentuk perangkat generik. */
export const Doorway: React.FC<{ p: V3; kind: "console" | "phone"; s?: number; glow?: number }> = ({ p, kind, s = 1, glow = 0.5 }) => {
  const [w, h, c] = kind === "console" ? [4.6, 5.6, "#e6e0f4"] : [3.2, 6.4, "#5a6ae0"];
  return (
    <Gr p={p} s={s}>
      <S g={G.box(w as number, h as number, 0.9, kind === "console" ? 0.7 : 0.55)} c={c as string} p={[0, (h as number) / 2, 0]} />
      <S g={G.box((w as number) - 1.1, (h as number) - 1.3, 0.2, 0.35)} c="#ffd9a0" glow={glow} p={[0, (h as number) / 2 - 0.15, 0.45]} />
      {kind === "console" ? <S g={G.box(2.2, 0.16, 0.1, 0.07)} c="#46cfa8" glow={0.8} p={[0, (h as number) - 0.32, 0.5]} /> : <S g={G.ball(0.18)} c="#241a2e" p={[0, (h as number) - 0.35, 0.5]} />}
    </Gr>
  );
};
export const GameBox: React.FC<{ p: V3; r?: V3; s?: number; c?: string }> = ({ p, r, s = 1, c = "#7a6ad8" }) => (
  <Gr p={p} r={r} s={s}><S g={G.box(1.1, 1.5, 0.35, 0.14)} c={c} /><S g={G.box(0.75, 0.55, 0.08, 0.08)} c="#fff2d8" glow={0.25} p={[0, 0.15, 0.19]} /></Gr>
);
export const ConsoleBox: React.FC<{ p: V3; s?: number }> = ({ p, s = 1 }) => (
  <Gr p={p} s={s}><S g={G.box(3.6, 1.1, 2.2, 0.45)} c="#e6e0f4" p={[0, 0.55, 0]} /><S g={G.box(2.0, 0.14, 0.1, 0.06)} c="#46cfa8" glow={0.8} p={[0, 0.6, 1.12]} /><S g={G.box(2.4, 0.2, 1.4, 0.09)} c="#8f86c8" p={[0, 1.15, 0]} /></Gr>
);
export const Mountain: React.FC<{ t: number; p: V3; k: number; s?: number }> = ({ t, p, k, s = 1 }) => (
  <Gr p={p} s={s}>{Array.from({ length: 150 }, (_, i) => {
    const row = Math.floor((1 - Math.sqrt(1 - i / 150)) * 9), width = 9 * (1 - row / 9.5);
    if (i / 150 > k) return null;
    return <Coin key={i} p={[(R(i, 2) - 0.5) * width, 0.25 + row * 0.72 + R(i, 3) * 0.3, (R(i, 4) - 0.5) * 2.4]} r={[(R(i, 5) - 0.5) * 1.1 + 0.5, R(i, 6) * 6, (R(i, 7) - 0.5) * 0.8]} s={1.35 * clamp((k - i / 150) * 12)} />;
  })}</Gr>
);
export const Courtroom: React.FC = () => (
  <group>
    {[-9, -4.5, 4.5, 9].map((x) => <Gr key={x} p={[x, 0, -7]}><S g={G.cyl(0.65, 0.75, 9, 28)} c="#d9c9b4" p={[0, 4.5, 0]} /><S g={G.box(2, 0.5, 2, 0.22)} c="#f3e8d4" p={[0, 9, 0]} /></Gr>)}
    <S g={G.box(9, 2.6, 1.4, 0.35)} c="#8a4f45" p={[0, 1.3, -6]} /><S g={G.box(9.6, 0.4, 1.8, 0.18)} c="#a8644e" p={[0, 2.75, -6]} />
  </group>
);
export const Confetti: React.FC<{ t: number; at?: number; n?: number }> = ({ t, at = 0, n = 70 }) => t < at ? null : (
  <>{Array.from({ length: n }, (_, i) => { const u = t - at; return <S key={i} g={G.box(0.22, 0.13, 0.05, 0.05)} c={["#ff7a63", "#ffd766", "#46cfa8", "#fff6ea"][i % 4]} p={[(R(i, 4) - 0.5) * 18, 12 - ((u * (2 + R(i, 3) * 2) + R(i, 2) * 5) % 12), (R(i, 5) - 0.4) * 8]} r={[u * 4 * R(i, 6) + i, u * 3 + i, i]} s={clamp(u * 3 - R(i, 7))} cast={false} />; })}</>
);
/** Panah melengkung halus. */
export const Path: React.FC<{ a: V3; b: V3; lift?: number; k: number; c?: string; w?: number }> = ({ a, b, lift = 1.5, k, c = "#ffd766", w = 0.14 }) => k <= 0.02 ? null : (
  <Hose a={a} c={[(a[0] + b[0]) / 2, Math.max(a[1], b[1]) + lift, (a[2] + b[2]) / 2]} b={b} w={w} color={c} upto={k} n={20} />
);
export const Spot: React.FC<{ p: V3; r?: number; k?: number; c?: string }> = ({ p, r = 2.4, k = 1, c = "#ffd766" }) => k <= 0.01 ? null : (
  <S g={G.torus(r, 0.1)} c={c} glow={0.9} p={p} r={[Math.PI / 2, 0, 0]} s={0.6 + 0.4 * back(clamp(k))} cast={false} />
);
