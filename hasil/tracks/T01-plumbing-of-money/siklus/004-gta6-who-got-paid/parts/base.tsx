// Bahan bersama adegan T01 siklus 004: material, penyusun shot, lingkungan, pemeran, benda.
// Semua tokoh dan benda orisinal (tanpa aset, logo, atau tokoh GTA/Rockstar/console). Bentuk membulat, gradasi halus, tanpa garis lantai.
// Koordinat dunia: x kanan, y atas (lantai 0), z ke arah kamera.
import React from "react";
import * as THREE from "three";
import { Easing } from "remotion";
import { Bubble, Frame, Pill, Ptr, R, W as SW, clamp, mix, pop, seg, shot, useShot } from "@r3";
import { Cam, G, Gr, Hose, M, Pop, Rod, Sky, TextPlane, V3, World, project } from "@r3/three";

/* ------------------------------ material halus ------------------------------ */
export const MC = new Map<string, THREE.MeshStandardMaterial>();
export const soft = (c: string, glow = 0.06, opacity = 1) => {
  const o = Math.round(clamp(opacity) * 50) / 50, k = `${c}|${glow}|${o}`;
  let m = MC.get(k);
  if (!m) { m = new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: glow, roughness: 0.72, metalness: 0, transparent: o < 1, opacity: o, depthWrite: o > 0.6 }); MC.set(k, m); }
  return m;
};
export const S: React.FC<{ g: THREE.BufferGeometry; c: string; p?: V3; r?: V3; s?: V3 | number; glow?: number; o?: number; cast?: boolean }> = ({ g, c, p, r, s, glow, o = 1, cast = true }) => (
  <mesh geometry={g} material={soft(c, glow, o)} position={p} rotation={r} scale={s} castShadow={cast && o > 0.6} receiveShadow />
);
export const ease = Easing.inOut(Easing.cubic);
export const back = Easing.out(Easing.back(1.5));

/* ------------------------------ penyusun shot ------------------------------ */
export type A = { t: number; dur: number; w: (text: string, d: number, n?: number) => number; label: (text: string) => number; vertical: boolean };
export type Lb = [string, V3 | ((a: A) => V3), Ptr?, string?];
export type Spec = { sky: Sky; cam: (a: A) => Cam; items: (a: A) => React.ReactNode; labels?: Lb[]; bubble?: (a: A) => { at: V3; p: number }; aperture?: number; vd?: number; hud?: (a: A) => React.ReactNode };
export const Scene3: React.FC<{ spec: Spec }> = ({ spec }) => {
  const c = useShot(); const { t, dur, vertical } = c;
  const a: A = { t, dur, vertical, label: c.label, w: (text, d, n = 0) => { const v = c.word(text, n); return Number.isFinite(v) ? v : d; } };
  const base = spec.cam(a);
  let cam: Cam = { ...base, yaw: base.yaw + Math.sin(t * 0.5 + c.index) * 0.8, pitch: base.pitch + Math.cos(t * 0.4 + c.index) * 0.4 };
  if (vertical) cam = { ...cam, d: cam.d * (spec.vd ?? 1.7), yaw: cam.yaw * 0.7 };
  const half = vertical ? 303 : 960;
  const bub = spec.bubble?.(a);
  return (
    <>
      <World sky={spec.sky} cam={cam} focus={cam.d} aperture={spec.aperture ?? 2.2} dpr={vertical ? 1.5 : 1}>{spec.items(a)}</World>
      <Frame vignette={0.25}>
        {spec.hud?.(a)}
        {(spec.labels ?? []).map(([text, at, ptr = "down", bg = "#e2573d"]) => {
          const p = typeof at === "function" ? at(a) : at; let [x, y] = project(cam, p);
          const size = vertical ? 38 : 46, width = text.length * size * 0.62 + size * 1.2;
          x = clamp(x, SW / 2 - half + width / 2 + 24, SW / 2 + half - width / 2 - 24); y = clamp(y, 130, 880);
          return <Pill key={text} x={x} y={y} text={text} p={c.label(text)} bg={bg} ptr={ptr} size={size} />;
        })}
        {bub && c.bubble && bub.p > 0 && <Bubble x={project(cam, bub.at)[0]} y={project(cam, bub.at)[1]} text={c.bubble} p={bub.p} />}
      </Frame>
    </>
  );
};
export const s3 = (spec: Spec, from?: [number, number]) => shot((() => <Scene3 spec={spec} />) as React.FC, { labels: "own", drift: false, bubble: "own", from });

/* ------------------------------ lingkungan ------------------------------ */
export const NIGHT: Sky = { top: "#0d1030", mid: "#252a66", low: "#4b3f82", fog: "#262860", sun: "#6f7dff", sunAt: [0.5, 0.55], key: "#cdd8ff", amb: "#8f98e8", ground: "#2a1c4e" };
export const LAMP: Sky = { top: "#1c1238", mid: "#4a2a5e", low: "#a85a5a", fog: "#4a2a58", sun: "#ffb468", sunAt: [0.5, 0.7], key: "#ffe4bc", amb: "#d9b4d8", ground: "#4a2848" };
export const COLD: Sky = { top: "#101a38", mid: "#2c4a6e", low: "#6f98ae", fog: "#2f4c6c", sun: "#bfe8ff", sunAt: [0.5, 0.7], key: "#e0f2ff", amb: "#b8d4ee", ground: "#28324e" };

/** Lantai polos dan bokeh jauh (di luar fokus). */
export const Room: React.FC<{ t: number; floor: string; bokeh: string[]; rug?: string }> = ({ t, floor, bokeh, rug }) => (
  <group>
    <S g={G.plane(240, 180)} c={floor} r={[-Math.PI / 2, 0, 0]} p={[0, -0.02, 0]} cast={false} />
    {rug && <S g={G.cyl(10.5, 10.5, 0.04, 80)} c={rug} p={[0, 0.01, -1]} cast={false} />}
    {Array.from({ length: 34 }, (_, i) => (
      <S key={i} g={G.ball(1, 14)} c={bokeh[i % bokeh.length]} glow={0.8} o={0.55} cast={false}
        p={[(R(i, 2) - 0.5) * 70, 1 + R(i, 3) * 15 + Math.sin(t * 0.5 + i) * 0.35, -22 - R(i, 4) * 20]} s={0.18 + R(i, 5) ** 2 * 0.75} />
    ))}
    {Array.from({ length: 26 }, (_, i) => (
      <S key={"m" + i} g={G.ball(1, 8)} c="#ffe9c0" glow={0.7} o={0.5} cast={false}
        p={[(R(i, 12) - 0.5) * 24, ((R(i, 13) * 10 + t * (0.12 + R(i, 14) * 0.2)) % 10), -8 + R(i, 15) * 16]} s={0.03 + R(i, 16) * 0.05} />
    ))}
  </group>
);

/** Berkas cahaya lampu: tipis dan menambah terang, tanpa tepi tegas. */
export const BEAM = new THREE.MeshBasicMaterial({ color: "#ffd9a0", transparent: true, opacity: 0.022, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });

/* ------------------------------ wajah ------------------------------ */
export type Expr = "calm" | "happy" | "nervous" | "stern" | "smug" | "busy" | "patient" | "wait";
export const Face: React.FC<{ t: number; p: V3; s?: number; e?: Expr; look?: number; seed?: number }> = ({ t, p, s = 1, e = "calm", look = 0, seed = 0 }) => {
  const blink = ((t + seed * 0.7) % 3.1) < 0.12 ? 0.15 : 1;
  const eyeY = (e === "smug" || e === "patient" ? 0.55 : e === "nervous" ? 1.25 : 1) * blink;
  const dart = e === "busy" ? Math.sin(t * 6) * 0.07 : e === "nervous" ? Math.sin(t * 9) * 0.05 : look * 0.07;
  return (
    <Gr p={p} s={s}>
      {[-1, 1].map((d) => <Gr key={d} p={[d * 0.42 + dart, 0.12, 0]}><S g={G.ball(1, 20)} c="#241a2e" s={[0.13, 0.17 * eyeY, 0.09]} /><S g={G.ball(1, 8)} c="#ffffff" glow={0.8} p={[0.04, 0.06 * eyeY, 0.09]} s={0.035 * blink} /></Gr>)}
      {(e === "stern") && [-1, 1].map((d) => <Rod key={d} a={[d * 0.65, 0.52, 0.05]} b={[d * 0.22, 0.38, 0.05]} w={0.05} c="#241a2e" />)}
      {e === "nervous" || e === "wait" ? <S g={G.ball(1, 16)} c="#241a2e" p={[0, -0.34, 0]} s={[0.1, e === "nervous" ? 0.13 + Math.sin(t * 8) * 0.02 : 0.05, 0.07]} />
        : e === "stern" ? <Rod a={[-0.2, -0.32, 0]} b={[0.2, -0.32, 0]} w={0.045} c="#241a2e" />
        : <M g={G.torus(0.24, 0.05, Math.PI)} c="#241a2e" p={[e === "smug" ? 0.08 : 0, -0.24, 0]} r={[0, 0, Math.PI + (e === "smug" ? 0.18 : 0)]} s={[1, e === "happy" ? 1 : 0.6, 1]} />}
      {e !== "stern" && [-1, 1].map((d) => <S key={d} g={G.ball(1, 14)} c="#ff8f8a" o={0.55} p={[d * 0.68, -0.16, -0.02]} s={[0.15, 0.09, 0.04]} cast={false} />)}
    </Gr>
  );
};

/* ------------------------------ koin, kantong, meja, lampu ------------------------------ */
export const Coin: React.FC<{ p?: V3; r?: V3; s?: number; c?: string; hi?: string; glow?: number }> = ({ p, r, s = 1, c = "#f4ad22", hi = "#ffd766", glow = 0.14 }) => (
  <Gr p={p} r={r} s={s}><S g={G.cyl(0.4, 0.4, 0.13, 28)} c={c} glow={glow} /><S g={G.torus(0.34, 0.06)} c={hi} glow={glow} r={[Math.PI / 2, 0, 0]} p={[0, 0.06, 0]} /><S g={G.cyl(0.18, 0.18, 0.17, 20)} c={hi} glow={glow} /></Gr>
);
export const Stack: React.FC<{ n: number; p: V3; s?: number }> = ({ n, p, s = 1 }) => <Gr p={p} s={s}>{Array.from({ length: n }, (_, i) => <Coin key={i} p={[(R(i, 2) - 0.5) * 0.08, 0.07 + i * 0.14, (R(i, 3) - 0.5) * 0.08]} />)}</Gr>;
export const Bag: React.FC<{ t: number; p: V3; s?: number; e?: Expr; squash?: number; open?: number; face?: boolean }> = ({ t, p, s = 1, e = "calm", squash = 0, face = true }) => {
  const br = Math.sin(t * 2.2) * 0.02;
  return (
    <Gr p={p} s={s}>
      <Gr s={[1 + squash * 0.25 - br, 1 - squash * 0.3 + br, 1 + squash * 0.25 - br]}>
        <S g={G.ball(1, 40)} c="#c98d55" p={[0, 0.98, 0]} s={[1.22, 1.06, 1.08]} />
        <S g={G.cyl(0.38, 0.72, 0.7, 32)} c="#c98d55" p={[0, 2.0, 0]} />
        <S g={G.cyl(0.62, 0.36, 0.45, 32)} c="#dca56c" p={[0, 2.62, 0]} />
        <S g={G.torus(0.42, 0.13)} c="#7a4a8e" p={[0, 2.34, 0]} r={[Math.PI / 2, 0, 0]} />
        <Hose a={[0.35, 2.3, 0.3]} c={[0.8, 2.1 + Math.sin(t * 3) * 0.1, 0.9]} b={[0.75, 1.6 + Math.sin(t * 3) * 0.08, 1.0]} w={0.07} color="#7a4a8e" />
        {face && <Face t={t} p={[0, 1.02, 1.09]} s={0.95} e={e} />}
      </Gr>
    </Gr>
  );
};
export const Table: React.FC<{ p?: V3; s?: number; r?: number }> = ({ p = [0, 0, 0], s = 1, r = 5 }) => (
  <Gr p={p} s={s}>
    <S g={G.cyl(r, r, 0.42, 96)} c="#8a4f45" p={[0, 1.9, 0]} />
    <S g={G.torus(r, 0.26)} c="#a8644e" p={[0, 2.02, 0]} r={[Math.PI / 2, 0, 0]} />
    <S g={G.cyl(r - 0.25, r - 0.25, 0.12, 96)} c="#2f8a80" p={[0, 2.12, 0]} />
    <S g={G.cyl(0.7, 1.1, 1.7, 40)} c="#7a423e" p={[0, 0.85, 0]} /><S g={G.cyl(2.4, 2.6, 0.24, 60)} c="#8a4f45" p={[0, 0.12, 0]} />
  </Gr>
);
export const TOP = 2.2;
export const HangLamp: React.FC<{ t: number; p: V3; s?: number; on?: number }> = ({ t, p, s = 1, on = 1 }) => (
  <Gr p={p} r={[0, 0, Math.sin(t * 0.9 + p[0]) * 0.025]} s={s}>
    <Rod a={[0, 0.5, 0]} b={[0, 6, 0]} w={0.05} c="#2a1a38" />
    <S g={G.dome(1.3)} c="#e2674e" glow={0.12} /><S g={G.torus(1.3, 0.09)} c="#ffb08a" r={[Math.PI / 2, 0, 0]} />
    {on > 0.02 && <><S g={G.ball(0.45, 20)} c="#fff0b8" glow={0.3 + on} p={[0, -0.05, 0]} cast={false} />
      {[1, 0.78, 0.56, 0.36].map((k) => <mesh key={k} geometry={G.cone(2.5 * k, 3.6, 48)} material={BEAM} position={[0, -1.85, 0]} />)}</>}
  </Gr>
);
export const Chair: React.FC<{ p: V3; lit: number; ry?: number }> = ({ p, lit, ry = 0 }) => (
  <Gr p={p} r={[0, ry, 0]}>
    <S g={G.box(2.4, 3.6, 0.5, 0.25)} c={lit > 0.5 ? "#c9705a" : "#5d4366"} glow={0.05 + lit * 0.12} p={[0, 2.5, -0.9]} />
    <S g={G.box(2.5, 0.5, 2.0, 0.22)} c={lit > 0.5 ? "#a8584a" : "#4a3554"} p={[0, 1.2, 0]} />
  </Gr>
);
export const Paper: React.FC<{ p: V3; n?: number; s?: number }> = ({ p, n = 5, s = 1 }) => <Gr p={p} s={s}>{Array.from({ length: n }, (_, i) => <S key={i} g={G.box(1.1, 0.07, 0.8, 0.03)} c={i % 2 ? "#fff7e8" : "#e9dcc2"} p={[(R(i, 4) - 0.5) * 0.14, 0.05 + i * 0.08, 0]} r={[0, (R(i, 5) - 0.5) * 0.35, 0]} />)}</Gr>;

/* ------------------------------ pemain meja ------------------------------ */
export type Pl = { t: number; p: V3; s?: number; e?: Expr; ry?: number };
export const breathe = (t: number, k: number): V3 => [1, 1 + Math.sin(t * 2 + k) * 0.015, 1];
export const Hand: React.FC<{ a: V3; b: V3; w?: number; c: string }> = ({ a, b, w = 0.17, c }) => <><Hose a={a} c={[(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 0.3, (a[2] + b[2]) / 2 + 0.4]} b={b} w={w} color={c} n={14} /><S g={G.ball(0.34, 18)} c={c} p={b} /></>;
export const State: React.FC<Pl & { reach?: number }> = ({ t, p, s = 1, e = "stern", ry = 0, reach = 0 }) => (
  <Gr p={p} r={[0, ry, 0]} s={s}><Gr s={breathe(t, 1)}>
    <S g={G.box(3.3, 0.45, 2.1, 0.2)} c="#d9c9ee" p={[0, 1.7, 0]} />
    <S g={G.box(2.9, 2.2, 1.8, 0.35)} c="#f2e9d8" p={[0, 3.0, 0]} />
    {[-1.15, 1.15].map((x) => <S key={x} g={G.cyl(0.17, 0.19, 2.0, 20)} c="#fffaf0" p={[x, 2.9, 0.98]} />)}
    <S g={G.box(3.35, 0.4, 2.15, 0.19)} c="#d9c9ee" p={[0, 4.25, 0]} />
    <S g={G.cyl(1.0, 1.1, 0.55, 40)} c="#f2e9d8" p={[0, 4.65, 0]} /><S g={G.dome(1.05)} c="#6c74c9" p={[0, 4.9, 0]} />
    <Rod a={[0, 5.9, 0]} b={[0, 6.5, 0]} w={0.05} c="#f4b52c" /><S g={G.ball(0.16)} c="#f4b52c" glow={0.4} p={[0, 6.55, 0]} />
    <Face t={t} p={[0, 3.15, 0.95]} s={1.05} e={e} seed={1} />
  </Gr>
  <Hand a={[1.45, 2.8, 0.5]} b={[1.7 + reach * 0.8, 2.7, 1.0 + reach * 1.6]} c="#c4b2e0" /></Gr>
);
export const Store: React.FC<Pl> = ({ t, p, s = 1, e = "smug", ry = 0 }) => (
  <Gr p={p} r={[0, ry, 0]} s={s}><Gr s={breathe(t, 2)}>
    <S g={G.box(3.2, 3.9, 1.9, 0.6)} c="#4f8fe0" p={[0, 2.9, 0]} />
    <S g={G.box(2.5, 1.9, 0.3, 0.4)} c="#dff1ff" glow={0.18} p={[0, 3.45, 0.88]} />
    {Array.from({ length: 5 }, (_, i) => <Gr key={i} p={[-1.4 + i * 0.7, 5.0 + Math.sin(t * 3 + i) * 0.025, 0.55]}><S g={G.ball(1, 20)} c={i % 2 ? "#fff6ea" : "#ff7a63"} s={[0.4, 0.34, 0.9]} /></Gr>)}
    <S g={G.box(3.5, 0.45, 2.4, 0.22)} c="#2f66b8" p={[0, 2.15, 0.15]} />
    <Face t={t} p={[0, 3.5, 1.1]} s={1.05} e={e} seed={2} />
  </Gr>
  <Hand a={[-1.5, 3.0, 0.5]} b={[-2.0, 2.65 + Math.sin(t * 2.4) * 0.08, 1.3]} c="#3d76c8" /></Gr>
);
export const CardGate: React.FC<Pl> = ({ t, p, s = 1, e = "busy", ry = 0 }) => (
  <Gr p={p} r={[0, ry, 0]} s={s}><Gr s={breathe(t, 3)}>
    {[-1.35, 1.35].map((x) => <S key={x} g={G.box(0.7, 2.9, 1.0, 0.3)} c="#2fa98c" p={[x, 2.4, 0]} />)}
    <S g={G.box(3.7, 2.3, 0.8, 0.38)} c="#46cfa8" p={[0, 4.3, 0]} />
    <S g={G.box(3.72, 0.38, 0.83, 0.16)} c="#1f6f66" p={[0, 5.0, 0]} /><S g={G.box(0.6, 0.44, 0.1, 0.1)} c="#ffd766" glow={0.3} p={[-1.15, 3.6, 0.42]} />
    <Face t={t} p={[0.15, 4.15, 0.46]} s={1.05} e={e} seed={3} />
  </Gr>
  <S g={G.box(4.4, 0.24, 0.9, 0.12)} c="#3a2a52" p={[0, 2.35, 0.35]} />
  {Array.from({ length: 5 }, (_, i) => { const q = (t * 0.28 + i / 5) % 1; return <Coin key={i} p={[-2.0 + q * 4, 2.58, 0.35]} r={[0, q * 6, 0]} s={0.62 * Math.min(1, Math.sin(q * Math.PI) * 3)} />; })}</Gr>
);
export const Tower: React.FC<Pl & { h?: number; trophy?: boolean }> = ({ t, p, s = 1, e = "patient", ry = 0, h = 5.6, trophy }) => (
  <Gr p={p} r={[0, ry, 0]} s={s}><Gr s={breathe(t, 4)}>
    <S g={G.box(2.5, h, 2.0, 0.55)} c="#e89a4e" p={[0, 1.0 + h / 2, 0]} />
    <S g={G.box(1.8, 0.7, 1.4, 0.3)} c="#f6bd78" p={[0, 1.25 + h, 0]} />
    {Array.from({ length: Math.max(2, Math.floor(h - 2.6)) }, (_, r) => [-0.65, 0, 0.65].map((x) => <S key={`${r}${x}`} g={G.box(0.42, 0.42, 0.16, 0.14)} c="#fff1c4" glow={(r + x > 1 ? 0.55 : 0.2)} p={[x, 1.6 + r * 0.72, 1.0]} />))}
    <Face t={t} p={[0, h - 0.05, 1.08]} s={1.0} e={e} seed={4} />
    {trophy && <Gr p={[0, 2.0 + h + Math.sin(t * 2) * 0.08, 0]} r={[0, t * 0.8, 0]}><S g={G.cyl(0.62, 0.3, 0.8, 28)} c="#ffcf3f" glow={0.4} p={[0, 0.3, 0]} />{[-1, 1].map((d) => <S key={d} g={G.torus(0.28, 0.08)} c="#ffcf3f" glow={0.4} p={[d * 0.62, 0.38, 0]} />)}<S g={G.cyl(0.14, 0.14, 0.4, 14)} c="#e6a51f" p={[0, -0.2, 0]} /><S g={G.box(0.8, 0.24, 0.8, 0.1)} c="#a8643c" p={[0, -0.48, 0]} /></Gr>}
  </Gr></Gr>
);
/** Anggota kru: siluet bertopi orisinal. */
export const Crew: React.FC<{ t: number; p: V3; c: string; hat: number; seed: number }> = ({ t, p, c, hat, seed }) => (
  <Gr p={p} s={[1, 1 + Math.sin(t * 2.3 + seed) * 0.02, 1]} r={[0, -p[0] * 0.07, Math.sin(t * 1.4 + seed) * 0.03]}>
    <S g={G.ball(1, 32)} c={c} p={[0, 2.5, 0]} s={[1.25, 1.65, 0.95]} /><S g={G.ball(0.88, 32)} c="#3a2a52" p={[0, 4.55, 0]} />
    {hat === 0 ? <><S g={G.cyl(1.3, 1.3, 0.14, 40)} c={c} p={[0, 5.1, 0]} /><S g={G.cyl(0.65, 0.75, 0.75, 32)} c={c} p={[0, 5.5, 0]} /></>
      : hat === 1 ? <><S g={G.dome(0.93)} c={c} p={[0, 4.85, 0]} /><S g={G.box(1.0, 0.16, 0.8, 0.07)} c={c} p={[0, 4.95, 0.9]} /></>
      : hat === 2 ? <><S g={G.dome(0.96)} c={c} p={[0, 4.75, 0]} /><S g={G.ball(0.28)} c="#fff2d8" p={[0, 5.85, 0]} /></>
      : <><S g={G.cyl(0.55, 0.92, 0.85, 32)} c={c} p={[0, 5.35, 0]} /><S g={G.torus(0.85, 0.12)} c="#fff2d8" p={[0, 5.05, 0]} r={[Math.PI / 2, 0, 0]} /></>}
    {[-0.3, 0.3].map((x) => <S key={x} g={G.ball(1, 12)} c="#fff6dc" glow={0.7} p={[x, 4.58, 0.84]} s={[0.12, ((t + seed) % 3.4) < 0.12 ? 0.02 : 0.09, 0.06]} />)}
  </Gr>
);

