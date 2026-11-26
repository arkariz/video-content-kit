// Pustaka adegan 3D halus (gaya disetujui lewat preview T01-004): bentuk membulat, gradasi lembut, tanpa garis.
// Tambahan di atas r3/three; hanya dipakai siklus yang mengimpornya. Koordinat: x kanan, y atas (lantai 0), z ke kamera.
// Bidang utama terlihat kira-kira x -8..8, y 0..8. Sisakan bagian bawah layar untuk caption.
import React from "react";
import * as THREE from "three";
import { Easing } from "remotion";
import { Bubble, Frame, Pill, Ptr, R, W as SW, clamp, mix, seg, shot, useShot } from "@r3";
import { Cam, G, Gr, Hose, M, Pop, Rod, Sky, TextPlane, V3, World, project } from "@r3/three";
export { R, clamp, mix, seg, G, Gr, Hose, M, Pop, Rod, TextPlane, Easing, THREE };
export type { V3, Sky, Cam };

/* ---------- material ---------- */
const MC = new Map<string, THREE.MeshStandardMaterial>();
export const soft = (c: string, glow = 0.07, opacity = 1) => {
  const o = Math.round(clamp(opacity) * 50) / 50, g = Math.round(glow * 20) / 20, k = `${c}|${g}|${o}`;
  let m = MC.get(k);
  if (!m) { m = new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: g, roughness: 0.72, metalness: 0, transparent: o < 1, opacity: o, depthWrite: o > 0.6 }); MC.set(k, m); }
  return m;
};
export const S: React.FC<{ g: THREE.BufferGeometry; c: string; p?: V3; r?: V3; s?: V3 | number; glow?: number; o?: number; cast?: boolean }> = ({ g, c, p, r, s, glow, o = 1, cast = true }) => (
  <mesh geometry={g} material={soft(c, glow, o)} position={p} rotation={r} scale={s} castShadow={cast && o > 0.6} receiveShadow />
);
export const Ball: React.FC<{ p?: V3; s?: V3 | number; c: string; glow?: number; o?: number; cast?: boolean }> = (p) => <S g={G.ball(1, 24)} {...p} />;
export const Box: React.FC<{ w: number; h: number; d: number; p?: V3; r?: V3; c: string; rr?: number; glow?: number; o?: number; cast?: boolean }> = ({ w, h, d, rr, ...x }) => <S g={G.box(w, h, d, rr ?? Math.min(w, h, d) * 0.3)} {...x} />;
export const Cyl: React.FC<{ r: number; r2?: number; h: number; p?: V3; rot?: V3; c: string; glow?: number; o?: number }> = ({ r, r2, h, rot, ...x }) => <S g={G.cyl(r, r2 ?? r, h, 36)} r={rot} {...x} />;

/* ---------- penyusun shot ---------- */
export type A = { t: number; dur: number; w: (text: string, d?: number, n?: number) => number; vertical: boolean };
export type Lb = [string, V3 | ((a: A) => V3), Ptr?, string?];
export const RED = "#e2573d", GRN = "#179a72", BLU = "#2f6fd0", GOLD = "#b97d0a", PUR = "#7a4a8e", INK = "#241a2e";
export const L = (text: string, at: Lb[1], ptr: Ptr = "down", bg: string = RED): Lb => [text, at, ptr, bg];
export const SKY = {
  night: { top: "#0d1030", mid: "#252a66", low: "#4b3f82", fog: "#262860", sun: "#6f7dff", sunAt: [0.5, 0.55], key: "#cdd8ff", amb: "#8f98e8", ground: "#2a1c4e" },
  lamp: { top: "#1c1238", mid: "#4a2a5e", low: "#a85a5a", fog: "#4a2a58", sun: "#ffb468", sunAt: [0.5, 0.7], key: "#ffe4bc", amb: "#d9b4d8", ground: "#4a2848" },
  cold: { top: "#101a38", mid: "#2c4a6e", low: "#6f98ae", fog: "#2f4c6c", sun: "#bfe8ff", sunAt: [0.5, 0.7], key: "#e0f2ff", amb: "#b8d4ee", ground: "#28324e" },
  day: { top: "#4fa3d9", mid: "#9bd3e8", low: "#fde3b8", fog: "#b6dce6", sun: "#fff0b0", sunAt: [0.72, 0.8], key: "#fff4de", amb: "#dff0ff", ground: "#8a7a8f" },
  warm: { top: "#e8825a", mid: "#f6b77a", low: "#ffe3b0", fog: "#f1b98a", sun: "#fff0c0", sunAt: [0.7, 0.75], key: "#fff0d8", amb: "#ffe0d0", ground: "#8a5a6a" },
  sea: { top: "#073a52", mid: "#0f6f84", low: "#3fb3ab", fog: "#117084", sun: "#9ff0e0", sunAt: [0.5, 0.75], key: "#dcfff6", amb: "#9fdcd8", ground: "#12404e" },
  mint: { top: "#1f6e6a", mid: "#49a58e", low: "#cfeac2", fog: "#58aa94", sun: "#f4ffd0", sunAt: [0.6, 0.75], key: "#fffbe6", amb: "#d8f6e8", ground: "#2e5a52" },
  grey: { top: "#2a2c40", mid: "#55586e", low: "#9a98a8", fog: "#575a70", sun: "#d0d4e8", sunAt: [0.5, 0.7], key: "#eef0ff", amb: "#bcc0d8", ground: "#34354a" },
} satisfies Record<string, Sky>;
export type SkyName = keyof typeof SKY;
const FLOOR: Record<SkyName, [string, string[]]> = {
  night: ["#262452", ["#8f7bff", "#ffb468", "#6fd8ff"]], lamp: ["#4a2c52", ["#ffb468", "#ff7a63", "#ffe08a"]], cold: ["#2d4766", ["#9fd8ff", "#c8b8ff", "#e0f6ff"]],
  day: ["#8fc27a", ["#ffffff", "#fff0b0", "#bfe8ff"]], warm: ["#d98a62", ["#fff0c0", "#ffd08a", "#ff9f8a"]], sea: ["#0f5f72", ["#8ff0d8", "#bff6ff", "#4fd0c8"]], mint: ["#3f8a72", ["#fff6c8", "#b8ffd8", "#ffd08a"]], grey: ["#4a4c62", ["#c8cce0", "#9a9cb8", "#e8e8f4"]],
};
export type CamName = "wide" | "mid" | "close" | "top" | "low" | "left" | "right" | "map" | "push" | "pull";
const C = (at: V3, d: number, yaw: number, pitch: number): Cam => ({ at, d, yaw, pitch, fov: 35 });
const CAMS: Record<CamName, [Cam, Cam]> = {
  wide: [C([0, 2.9, 0], 23, -17, 15), C([0, 2.9, 0], 20.5, 4, 13)],
  mid: [C([0, 3, 0], 19, 15, 11), C([0, 3, 0], 16.8, -6, 9)],
  close: [C([0, 3, 0], 15, -13, 8), C([0, 3, 0], 12.8, 5, 7)],
  top: [C([0, 0.8, 0], 23, -14, 38), C([0, 0.8, 0], 20, 8, 33)],
  low: [C([0, 3.3, 0], 19, -22, 4), C([0, 3.1, 0], 17, 3, 6)],
  left: [C([-1.5, 2.9, 0], 20, -28, 13), C([0.8, 2.9, 0], 19, -8, 11)],
  right: [C([1.5, 2.9, 0], 20, 28, 13), C([-0.8, 2.9, 0], 19, 8, 11)],
  map: [C([0, 0, 0.4], 24, -10, 52), C([0, 0, 0.8], 20.5, 7, 47)],
  push: [C([0, 3, 0], 24, -8, 13), C([0, 2.9, 0], 13.5, 5, 8)],
  pull: [C([0, 3, 0], 12.5, 8, 7), C([0, 2.9, 0], 23, -9, 15)],
};
export type SceneOpt = { cam?: CamName | [Cam, Cam]; at?: V3; d?: number; vx?: number; vd?: number; floor?: string | false; bubbleAt?: V3 };
const Env: React.FC<{ t: number; sky: SkyName; floor?: string | false }> = ({ t, sky, floor }) => {
  const [fc, bokeh] = FLOOR[sky];
  return (
    <group>
      {floor !== false && <S g={G.plane(240, 180)} c={floor || fc} r={[-Math.PI / 2, 0, 0]} p={[0, -0.03, 0]} cast={false} />}
      {Array.from({ length: 26 }, (_, i) => <S key={i} g={G.ball(1, 14)} c={bokeh[i % bokeh.length]} glow={0.8} o={0.5} cast={false}
        p={[(R(i, 2) - 0.5) * 70, 2 + R(i, 3) * 15 + Math.sin(t * 0.5 + i) * 0.35, -23 - R(i, 4) * 20]} s={0.16 + R(i, 5) ** 2 * 0.7} />)}
      {Array.from({ length: 22 }, (_, i) => <S key={"m" + i} g={G.ball(1, 8)} c="#fff2d0" glow={0.7} o={0.5} cast={false}
        p={[(R(i, 12) - 0.5) * 24, (R(i, 13) * 10 + t * (0.12 + R(i, 14) * 0.2)) % 10, -8 + R(i, 15) * 15]} s={0.025 + R(i, 16) * 0.04} />)}
    </group>
  );
};
type Spec = { sky: SkyName; o: SceneOpt; items: (a: A) => React.ReactNode; labels: Lb[] };
const Scene: React.FC<{ spec: Spec }> = ({ spec }) => {
  const c = useShot(); const { t, dur, vertical } = c; const o = spec.o;
  const a: A = { t, dur, vertical, w: (text, d = 0.7, n = 0) => { const v = c.word(text, n); return Number.isFinite(v) ? v : d; } };
  const [from, to] = Array.isArray(o.cam) ? o.cam : CAMS[o.cam ?? "mid"];
  const u = seg(t, 0, Math.max(dur + 0.3, 2), Easing.inOut(Easing.sin));
  const at = (o.at ?? [mix(from.at[0], to.at[0], u), mix(from.at[1], to.at[1], u), mix(from.at[2], to.at[2], u)]) as V3;
  let cam: Cam = { at, d: mix(from.d, to.d, u) * (o.d ?? 1), yaw: mix(from.yaw, to.yaw, u) + Math.sin(t * 0.5 + c.index) * 0.8, pitch: mix(from.pitch, to.pitch, u) + Math.cos(t * 0.4 + c.index) * 0.4, fov: 35 };
  if (vertical) cam = { ...cam, at: [o.vx ?? cam.at[0], cam.at[1], cam.at[2]], d: cam.d * (o.vd ?? 1.7) * 1.2, yaw: cam.yaw * 0.7 };
  const half = vertical ? 303 : 960;
  return (
    <>
      <World sky={SKY[spec.sky] as Sky} cam={cam} focus={cam.d} aperture={2.2} dpr={vertical ? 1.5 : 1}><Env t={c.T + c.index * 5} sky={spec.sky} floor={o.floor} />{spec.items(a)}</World>
      <Frame vignette={0.25}>
        {spec.labels.map(([text, p0, ptr = "down", bg = RED]) => {
          const p = typeof p0 === "function" ? p0(a) : p0; let [x, y] = project(cam, p);
          const size = vertical ? 38 : 46, width = text.length * size * 0.62 + size * 1.2;
          const lo = ptr === "right" ? width + 20 : ptr === "left" ? 0 : width / 2, hi = ptr === "left" ? width + 20 : ptr === "right" ? 0 : width / 2;
          x = clamp(x, SW / 2 - half + lo + 24, SW / 2 + half - hi - 24); y = clamp(y, ptr === "up" ? 60 : 130, 860);
          return <Pill key={text} x={x} y={y} text={text} p={c.label(text)} bg={bg} ptr={ptr} size={size} />;
        })}
        {c.bubble && o.bubbleAt && c.t > 0.5 && <Bubble x={vertical ? clamp(project(cam, o.bubbleAt)[0], 780, 960) : project(cam, o.bubbleAt)[0]} y={project(cam, o.bubbleAt)[1]} text={c.bubble} p={seg(c.t, 0.5, 0.8)} />}
      </Frame>
    </>
  );
};
/** Satu shot: langit, isi (fungsi waktu), label, opsi kamera. */
export const sc = (sky: SkyName, items: (a: A) => React.ReactNode, labels: Lb[] = [], o: SceneOpt = {}) =>
  shot((() => <Scene spec={{ sky, o, items, labels }} />) as React.FC, { labels: "own", drift: false, bubble: "own" });

/* ---------- waktu ---------- */
export const ease = Easing.inOut(Easing.cubic);
/** 0..1 mulai detik a selama d. */
export const go = (t: number, a: number, d = 0.8) => seg(t, a, a + d, ease);
export const lerp3 = (a: V3, b: V3, p: number): V3 => [mix(a[0], b[0], p), mix(a[1], b[1], p), mix(a[2], b[2], p)];
/** Muncul memantul pada detik at (opsional hilang pada out). */
export const In: React.FC<{ a: A; at?: number; out?: number; p?: V3; s?: number; r?: V3; children: React.ReactNode }> = ({ a, at = -1, ...x }) => <Pop t={a.t} at={at} {...x} />;
/** Pindah dari a ke b dengan lengkung. */
export const Move: React.FC<{ t: number; from: V3; to: V3; at?: number; dur?: number; lift?: number; children: React.ReactNode }> = ({ t, from, to, at = 0.2, dur = 1.2, lift = 0, children }) => { const u = go(t, at, dur); const p = lerp3(from, to, u); return <group position={[p[0], p[1] + Math.sin(u * Math.PI) * lift, p[2]]}>{children}</group>; };
export const bob = (t: number, k = 0, amp = 0.12): number => Math.sin(t * 2 + k) * amp;

/* ---------- wajah dan tokoh ---------- */
export type Expr = "calm" | "happy" | "sad" | "shock" | "stern" | "smug" | "busy";
export const Face: React.FC<{ t: number; p: V3; s?: number; e?: Expr; seed?: number }> = ({ t, p, s = 1, e = "calm", seed = 0 }) => {
  const blink = (t + seed * 0.7) % 3.1 < 0.12 ? 0.15 : 1;
  const eyeY = (e === "smug" ? 0.55 : e === "shock" ? 1.3 : 1) * blink; const dart = e === "busy" ? Math.sin(t * 6) * 0.07 : 0;
  return (
    <Gr p={p} s={s}>
      {[-1, 1].map((d) => <Gr key={d} p={[d * 0.42 + dart, 0.12, 0]}><S g={G.ball(1, 20)} c={INK} s={[0.13, 0.17 * eyeY, 0.09]} /><S g={G.ball(1, 8)} c="#ffffff" glow={0.8} p={[0.04, 0.06 * eyeY, 0.09]} s={0.035 * blink} /></Gr>)}
      {e === "stern" && [-1, 1].map((d) => <Rod key={d} a={[d * 0.65, 0.52, 0.05]} b={[d * 0.22, 0.38, 0.05]} w={0.05} c={INK} />)}
      {e === "shock" ? <S g={G.ball(1, 16)} c={INK} p={[0, -0.36, 0]} s={[0.14, 0.19 + Math.sin(t * 8) * 0.02, 0.07]} />
        : e === "stern" ? <Rod a={[-0.2, -0.32, 0]} b={[0.2, -0.32, 0]} w={0.045} c={INK} />
        : e === "sad" ? <M g={G.torus(0.22, 0.05, Math.PI)} c={INK} p={[0, -0.45, 0]} s={[1, 0.65, 1]} />
        : <M g={G.torus(0.24, 0.05, Math.PI)} c={INK} p={[e === "smug" ? 0.08 : 0, -0.24, 0]} r={[0, 0, Math.PI + (e === "smug" ? 0.18 : 0)]} s={[1, e === "happy" ? 1 : 0.6, 1]} />}
      {e !== "stern" && [-1, 1].map((d) => <S key={d} g={G.ball(1, 14)} c="#ff8f8a" o={0.55} p={[d * 0.68, -0.16, -0.02]} s={[0.15, 0.09, 0.04]} cast={false} />)}
    </Gr>
  );
};
export type Acc = "scarf" | "cap" | "helmet" | "apron" | "headset" | "glasses" | "tie" | "bun" | "none";
/** Orang/tokoh bulat. Tinggi ±3.6 pada s=1, kaki di p. */
export const Guy: React.FC<{ t: number; p?: V3; s?: number; c?: string; e?: Expr; acc?: Acc; a2?: string; ry?: number; seed?: number; wave?: boolean; hop?: number; hold?: React.ReactNode }> = ({ t, p = [0, 0, 0], s = 1, c = "#ff8a5c", e = "calm", acc = "none", a2 = "#2f6fd0", ry = 0, seed = 0, wave, hop = 0, hold }) => {
  const br = Math.sin(t * 2.2 + seed) * 0.02; const wv = wave ? Math.sin(t * 7 + seed) * 0.35 : 0;
  return (
    <Gr p={[p[0], p[1] + hop, p[2]]} s={s} r={[0, ry, Math.sin(t * 1.1 + seed) * 0.025]}>
      {[-0.45, 0.45].map((x) => <group key={x}><Rod a={[x, 0.8, 0]} b={[x * 1.15, 0.15, 0.1]} w={0.15} c={INK} /><Ball p={[x * 1.2, 0.15, 0.25]} s={[0.32, 0.18, 0.46]} c={INK} /></group>)}
      <Gr s={[1 - br, 1 + br, 1 - br]}>
        <Ball p={[0, 2.05, 0]} s={[1.08, 1.5, 0.95]} c={c} />
        <Face t={t} p={[0, 2.5, 0.92]} s={0.88} e={e} seed={seed} />
        {acc === "scarf" && <><S g={G.torus(0.86, 0.2)} c={a2} p={[0, 1.65, 0]} r={[Math.PI / 2, 0, 0]} /><Hose a={[0.55, 1.65, 0.8]} c={[0.9, 1.3, 1.1]} b={[0.8 + bob(t, 1, 0.1), 0.8, 1.0]} w={0.15} color={a2} /></>}
        {acc === "cap" && <><S g={G.dome(0.82)} c={a2} p={[0, 3.2, 0]} /><Box w={0.9} h={0.14} d={0.8} c={a2} p={[0, 3.28, 0.8]} /></>}
        {acc === "helmet" && <><S g={G.dome(0.98)} c="#ffd23f" p={[0, 3.1, 0]} /><S g={G.torus(0.98, 0.08)} c="#f0a81f" p={[0, 3.12, 0]} r={[Math.PI / 2, 0, 0]} /></>}
        {acc === "apron" && <Box w={1.35} h={1.35} d={0.25} c={a2} p={[0, 1.25, 0.86]} rr={0.12} />}
        {acc === "headset" && <><S g={G.torus(1.02, 0.09, Math.PI)} c={INK} p={[0, 2.65, 0]} />{[-1.02, 1.02].map((x) => <Ball key={x} p={[x, 2.65, 0.05]} s={[0.2, 0.32, 0.26]} c={a2} />)}<Rod a={[1.0, 2.5, 0.2]} b={[0.45, 2.0, 1.05]} w={0.05} c={INK} /></>}
        {acc === "glasses" && [-0.37, 0.37].map((x) => <S key={x} g={G.torus(0.26, 0.045)} c={a2} p={[x, 2.6, 1.0]} />)}
        {acc === "tie" && <><Box w={0.28} h={0.9} d={0.18} c={a2} p={[0, 1.2, 0.9]} /><S g={G.dome(0.7)} c="#3a2a52" p={[0, 3.3, 0]} s={[1.1, 0.5, 1.05]} /></>}
        {acc === "bun" && <><S g={G.dome(0.88)} c="#3a2a52" p={[0, 3.05, -0.05]} /><Ball p={[0, 3.95, -0.1]} s={0.38} c="#3a2a52" /></>}
      </Gr>
      <Hose a={[-0.95, 2.0, 0.2]} c={[-1.65, 1.7, 0.5]} b={[-1.45, 1.05 + bob(t, seed, 0.06), 0.65]} w={0.13} color={c} /><Ball p={[-1.45, 1.05 + bob(t, seed, 0.06), 0.65]} s={0.23} c={c} />
      <Hose a={[0.95, 2.0, 0.2]} c={[1.7, wave ? 2.5 : 1.7, 0.5]} b={[wave ? 1.65 + wv : 1.45, wave ? 3.25 : 1.05, 0.65]} w={0.13} color={c} /><Ball p={[wave ? 1.65 + wv : 1.45, wave ? 3.25 : 1.05, 0.65]} s={0.23} c={c} />
      {hold && <Gr p={[1.5, 1.35, 0.9]}>{hold}</Gr>}
    </Gr>
  );
};
export const Gecko: React.FC<{ t: number; p?: V3; s?: number; e?: Expr; ry?: number }> = ({ t, p = [0, 0, 0], s = 1, e = "shock", ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}><Ball p={[0, 0.7, 0]} s={[0.55, 0.75, 0.45]} c="#8fd66a" /><Ball p={[0, 1.6, 0.05]} s={[0.68, 0.52, 0.5]} c="#9fe278" />
    <Face t={t} p={[0, 1.58, 0.52]} s={0.55} e={e} seed={5} /><Hose a={[0.3, 0.35, -0.2]} c={[1.5, 0.1, -0.2]} b={[1.3, 0.9 + bob(t, 2, 0.2), -0.1]} w={0.13} color="#8fd66a" />
    {[-0.6, 0.6].map((x) => <Ball key={x} p={[x, 0.15, 0.25]} s={[0.24, 0.12, 0.28]} c="#7ac858" />)}</Gr>
);
/** Gedung berwajah (bank, kantor, lembaga). */
export const Bank: React.FC<{ t: number; p?: V3; s?: number; e?: Expr; c?: string; roof?: string; ry?: number }> = ({ t, p = [0, 0, 0], s = 1, e = "calm", c = "#f2e4c8", roof = "#2f8f6b", ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}><Gr s={[1, 1 + Math.sin(t * 2 + p[0]) * 0.012, 1]}>
    <Box w={4.2} h={0.45} d={2.3} c={roof} p={[0, 0.23, 0]} /><Box w={3.7} h={2.9} d={1.9} c={c} p={[0, 1.9, 0]} rr={0.3} />
    {[-1.5, 1.5].map((x) => <Cyl key={x} r={0.2} h={2.6} c="#fffaf0" p={[x, 1.8, 1.05]} />)}
    <Box w={4.2} h={0.45} d={2.3} c={roof} p={[0, 3.5, 0]} /><S g={G.cone(2.5, 1.35, 4)} c={roof} p={[0, 4.35, 0]} r={[0, Math.PI / 4, 0]} s={[1.15, 1, 0.65]} />
    <Face t={t} p={[0, 2.15, 1.0]} s={1.05} e={e} seed={1} />
  </Gr></Gr>
);
/** Menara kantor/pengawas berwajah dengan lampu sorot opsional. */
export const Tower: React.FC<{ t: number; p?: V3; s?: number; e?: Expr; c?: string; h?: number; beam?: boolean; ry?: number }> = ({ t, p = [0, 0, 0], s = 1, e = "stern", c = "#6c74c9", h = 4.2, beam, ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}><Cyl r={0.85} r2={1.3} h={h} c={c} p={[0, h / 2, 0]} /><Box w={3.1} h={2.1} d={2.1} c="#e8e2ff" p={[0, h + 0.9, 0]} rr={0.6} />
    <S g={G.dome(1.35)} c={c} p={[0, h + 1.9, 0]} /><Face t={t} p={[0, h + 0.95, 1.1]} s={1.0} e={e} seed={4} />
    <Ball p={[0, h + 3.45, 0]} s={0.28} c="#ffd23f" glow={0.9} />
    {beam && <Gr p={[0, h + 3.4, 0]} r={[0, Math.sin(t * 0.9) * 1.2, 1.9]}><mesh geometry={G.cone(1.6, 9, 32)} position={[0, -4.5, 0]}><meshBasicMaterial color="#fff0a8" transparent opacity={0.13} depthWrite={false} /></mesh></Gr>}</Gr>
);
export const Server: React.FC<{ t: number; p?: V3; s?: number; e?: Expr; ry?: number }> = ({ t, p = [0, 0, 0], s = 1, e = "calm", ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}><Box w={2.8} h={4} d={1.7} c="#4f8fe0" p={[0, 2.1, 0]} rr={0.5} />
    {[0, 1, 2].map((i) => <group key={i}><Box w={2.1} h={0.32} d={0.15} c="#2f5fa8" p={[0, 0.8 + i * 0.5, 0.85]} /><Ball p={[0.75, 0.8 + i * 0.5, 0.98]} s={0.09} c={Math.sin(t * 5 + i * 2) > 0 ? "#8fffc8" : "#ffd23f"} glow={0.9} /></group>)}
    <Face t={t} p={[0, 3.1, 0.9]} s={1.0} e={e} seed={2} /><S g={G.torus(1.55, 0.12, Math.PI)} c={INK} p={[0, 3.3, 0.1]} />{[-1.55, 1.55].map((x) => <Ball key={x} p={[x, 3.25, 0.15]} s={[0.25, 0.42, 0.3]} c="#ff8a5c" />)}</Gr>
);

/* ---------- uang dan perdagangan ---------- */
export const Coin: React.FC<{ p?: V3; r?: V3; s?: number; c?: string; hi?: string; glow?: number }> = ({ p, r, s = 1, c = "#f4ad22", hi = "#ffd766", glow = 0.18 }) => (
  <Gr p={p} r={r} s={s}><S g={G.cyl(0.4, 0.4, 0.13, 24)} c={c} glow={glow} /><S g={G.torus(0.34, 0.055)} c={hi} glow={glow} r={[Math.PI / 2, 0, 0]} p={[0, 0.06, 0]} /><S g={G.cyl(0.18, 0.18, 0.17, 16)} c={hi} glow={glow} /></Gr>
);
export const Stack: React.FC<{ n: number; p?: V3; s?: number; c?: string }> = ({ n, p = [0, 0, 0], s = 1, c }) => <Gr p={p} s={s}>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => <Coin key={i} c={c} p={[(R(i, 2) - 0.5) * 0.08, 0.07 + i * 0.14, (R(i, 3) - 0.5) * 0.08]} />)}</Gr>;
/** Tumpukan menyebar (beberapa kolom). */
export const Pile: React.FC<{ n: number; p?: V3; s?: number; cols?: number }> = ({ n, p = [0, 0, 0], s = 1, cols = 4 }) => <Gr p={p} s={s}>{Array.from({ length: cols }, (_, k) => <Stack key={k} n={Math.floor(n / cols) + (k < n % cols ? 1 : 0)} p={[(k - (cols - 1) / 2) * 0.85, 0, (k % 2) * 0.5]} />)}</Gr>;
/** Koin mengalir berulang sepanjang lengkung dari a ke b. */
export const Flow: React.FC<{ t: number; a: V3; b: V3; lift?: number; n?: number; speed?: number; at?: number; c?: string; s?: number; coin?: boolean }> = ({ t, a, b, lift = 1.5, n = 7, speed = 0.45, at = 0, c = "#8fe8ff", s = 0.22, coin }) => (
  <>{t < at ? null : Array.from({ length: n }, (_, i) => { const raw = (t - at) * speed - i / n; if (raw < 0) return null; const u = raw % 1; const p = lerp3(a, b, u); p[1] += Math.sin(u * Math.PI) * lift; const k = Math.min(1, Math.sin(u * Math.PI) * 3);
    return coin ? <Coin key={i} p={p} s={s * 3 * k} r={[0.9, u * 6, 0]} /> : <Ball key={i} p={p} s={s * k} c={c} glow={0.8} cast={false} />; })}</>
);
/** Pipa melengkung bercahaya dengan butiran mengalir. flow=0 mematikan aliran; on = bagian tergambar. */
export const Pipe: React.FC<{ t: number; a: V3; b: V3; lift?: number; w?: number; c?: string; water?: string; flow?: number; on?: number }> = ({ t, a, b, lift = 0.8, w = 0.28, c = "#2f7fb0", water = "#a8f4ff", flow = 1, on = 1 }) => {
  const mid: V3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + lift * 2, (a[2] + b[2]) / 2];
  const at = (u: number): V3 => [0, 1, 2].map((i) => (1 - u) * (1 - u) * a[i] + 2 * (1 - u) * u * mid[i] + u * u * b[i]) as V3;
  if (on <= 0.01) return null;
  return <><Hose a={a} c={mid} b={b} w={w} color={c} n={22} upto={on} />{flow > 0 && Array.from({ length: 6 }, (_, i) => { const u = ((t * 0.35 * flow + i / 6) % 1) * on; const p = at(u); return <Ball key={i} p={[p[0], p[1] + w * 0.55, p[2] + w * 0.8]} s={w * 0.55} c={water} glow={0.9} cast={false} />; })}</>;
};
export const Cart: React.FC<{ t: number; p?: V3; s?: number; taken?: number; roll?: boolean; grid?: boolean }> = ({ t, p = [0, 0, 0], s = 1, taken = 0, roll }) => (
  <Gr p={[p[0], p[1] + (roll ? Math.abs(Math.sin(t * 9)) * 0.05 : 0), p[2]]} s={s}>
    <Box w={4.4} h={0.9} d={3.2} c="#a8643c" p={[0, 1.1, 0]} rr={0.25} />
    {[-1.5, 1.5].map((x) => [-1.65, 1.65].map((z) => <Gr key={`${x}${z}`} p={[x, 0.6, z]} r={[0, 0, roll ? -t * 5 : 0]}><S g={G.torus(0.48, 0.17)} c={INK} /><Box w={0.9} h={0.16} d={0.12} c="#d9a06a" /><Box w={0.16} h={0.9} d={0.12} c="#d9a06a" /></Gr>))}
    {Array.from({ length: 100 }, (_, i) => (i < 100 - taken ? <Coin key={i} s={0.46} p={[-1.8 + (i % 10) * 0.4, 1.62 + bob(t, i, 0.015), -1.26 + Math.floor(i / 10) * 0.28]} /> : null))}
  </Gr>
);
export const Gate: React.FC<{ t?: number; p?: V3; s?: number; open?: number; c?: string; ry?: number }> = ({ p = [0, 0, 0], s = 1, open = 0, c = "#e2573d", ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}><Box w={0.8} h={2.6} d={0.8} c="#f2e4c8" p={[-2.4, 1.3, 0]} /><S g={G.dome(0.55)} c={c} p={[-2.4, 2.6, 0]} />
    <Gr p={[-2.1, 2.0, 0.45]} r={[0, 0, open * 1.35]}><Box w={4.4} h={0.32} d={0.25} c={c} p={[2.2, 0, 0]} />{[1, 2.2, 3.4].map((x) => <Box key={x} w={0.45} h={0.34} d={0.27} c="#fff4da" p={[x, 0, 0]} />)}</Gr></Gr>
);
export const Road: React.FC<{ t: number; p?: V3; len?: number; w?: number; ry?: number; c?: string }> = ({ p = [0, 0, 0], len = 40, w = 3.6, ry = 0, c = "#4a4468" }) => (
  <Gr p={p} r={[0, ry, 0]}><Box w={len} h={0.1} d={w} c={c} p={[0, 0.03, 0]} cast={false} />{Array.from({ length: Math.floor(len / 2) }, (_, i) => <Box key={i} w={0.9} h={0.05} d={0.16} c="#ffe9a8" p={[-len / 2 + 1 + i * 2, 0.11, 0]} cast={false} />)}</Gr>
);
export const Card: React.FC<{ p?: V3; r?: V3; s?: number; c?: string; premium?: boolean; t?: number }> = ({ p, r = [0, -0.15, 0.08], s = 1, c = "#3f6fd8", premium, t = 0 }) => (
  <Gr p={p} r={r} s={s}><Box w={3.2} h={2.0} d={0.16} c={premium ? "#4a2f6e" : c} rr={0.07} /><Box w={0.55} h={0.42} d={0.08} c="#ffd766" glow={0.4} p={[-0.95, 0.25, 0.1]} />
    {[0, 1, 2, 3].map((i) => <Ball key={i} p={[-1.1 + i * 0.35, -0.5, 0.1]} s={0.1} c="#fff4da" />)}
    {premium && [0, 1, 2].map((i) => <Ball key={"s" + i} p={[0.5 + i * 0.4, 0.55 + Math.sin(t * 5 + i * 2) * 0.1, 0.18]} s={0.1 + 0.05 * Math.abs(Math.sin(t * 3 + i))} c="#fff2b0" glow={1} />)}</Gr>
);
export const Terminal: React.FC<{ t: number; p?: V3; s?: number; beep?: number; ry?: number }> = ({ t, p = [0, 0, 0], s = 1, beep = 99, ry = -0.2 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}><Box w={1.9} h={2.8} d={0.8} c="#3a3560" p={[0, 1.4, 0]} /><Box w={1.5} h={1.0} d={0.12} c={t > beep ? "#8fffc8" : "#bfe0ff"} glow={t > beep ? 0.8 : 0.3} p={[0, 2.1, 0.42]} />
    {[0, 1, 2].map((r) => [-0.45, 0, 0.45].map((x) => <Box key={`${r}${x}`} w={0.28} h={0.22} d={0.14} c="#e8e2ff" p={[x, 1.2 - r * 0.38, 0.42]} />))}
    {t > beep && [0, 1, 2].map((i) => { const u = ((t - beep) * 1.4 + i / 3) % 1; return <S key={i} g={G.torus(0.6 + u * 1.8, 0.05)} c="#8fffc8" glow={0.9} o={1 - u} p={[0, 2.2, 0.55]} />; })}</Gr>
);
export const Bills: React.FC<{ p?: V3; n?: number; s?: number; c?: string; r?: V3 }> = ({ p = [0, 0, 0], n = 4, s = 1, c = "#6fcf8f", r }) => <Gr p={p} s={s} r={r}>{Array.from({ length: n }, (_, i) => <group key={i}><Box w={1.7} h={0.1} d={0.9} c={c} p={[(R(i, 6) - 0.5) * 0.2, 0.06 + i * 0.12, 0]} r={[0, (R(i, 7) - 0.5) * 0.4, 0]} /><Cyl r={0.22} h={0.11} c="#d8f4d0" p={[0, 0.07 + i * 0.12, 0]} /></group>)}</Gr>;
export const Wallet: React.FC<{ p?: V3; s?: number; fat?: number; c?: string }> = ({ p = [0, 0, 0], s = 1, fat = 1, c = "#a8584a" }) => (
  <Gr p={p} s={s}><Box w={2.4} h={1.6} d={0.35 + fat * 0.5} c={c} p={[0, 0.8, 0]} /><Box w={0.8} h={0.55} d={0.45 + fat * 0.5} c="#d98a62" p={[0.9, 0.8, 0.03]} /><Ball p={[1.0, 0.8, 0.3 + fat * 0.25]} s={0.14} c="#ffd766" glow={0.5} />{fat > 0.6 && <Box w={1.8} h={0.5} d={0.2} c="#6fcf8f" p={[-0.2, 1.7, 0]} r={[0, 0, 0.1]} />}</Gr>
);
export const Tag: React.FC<{ p?: V3; s?: number; text?: string; c?: string; ry?: number }> = ({ p, s = 1, text, c = "#ffd766", ry = -0.1 }) => (
  <Gr p={p} s={s} r={[0, ry, 0.12]}><Box w={3.0} h={1.7} d={0.25} c={c} rr={0.12} /><S g={G.torus(0.18, 0.07)} c={INK} p={[-1.15, 0.45, 0.14]} /><Hose a={[-1.15, 0.5, 0.1]} c={[-2.0, 1.4, 0]} b={[-1.6, 1.9, -0.2]} w={0.05} color="#fff4da" />{text && <TextPlane text={text} h={0.9} color={INK} p={[0.2, -0.05, 0.17]} />}</Gr>
);
export const Envelope: React.FC<{ p?: V3; s?: number; r?: V3; c?: string }> = ({ p, s = 1, r, c = "#fff4da" }) => (
  <Gr p={p} s={s} r={r}><Box w={1.6} h={1.05} d={0.14} c={c} /><Rod a={[-0.75, 0.45, 0.09]} b={[0, -0.05, 0.09]} w={0.05} c="#d9a06a" /><Rod a={[0.75, 0.45, 0.09]} b={[0, -0.05, 0.09]} w={0.05} c="#d9a06a" /><Ball p={[0, -0.05, 0.12]} s={0.17} c="#e2573d" /></Gr>
);
export const Gift: React.FC<{ p?: V3; s?: number; c?: string; r?: V3 }> = ({ p, s = 1, c = "#e2573d", r }) => <Gr p={p} s={s} r={r}><Box w={1} h={0.85} d={1} c={c} /><Box w={0.2} h={0.9} d={1.05} c="#ffd766" /><Box w={1.05} h={0.9} d={0.2} c="#ffd766" />{[-0.2, 0.2].map((x) => <S key={x} g={G.torus(0.18, 0.07)} c="#ffd766" p={[x, 0.55, 0]} />)}</Gr>;
export const Star: React.FC<{ t: number; p: V3; s?: number }> = ({ t, p, s = 1 }) => <Gr p={p} s={s} r={[0, t * 2, 0]}><S g={G.ext("star", () => { const sh = new THREE.Shape(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? 0.28 : 0.65, an = (i / 10) * Math.PI * 2 + Math.PI / 2; i ? sh.lineTo(Math.cos(an) * rr, Math.sin(an) * rr) : sh.moveTo(Math.cos(an) * rr, Math.sin(an) * rr); } return sh; }, 0.22, 0.08)} c="#ffd23f" glow={0.6} /></Gr>;

/* ---------- rumah, jalan, kota ---------- */
export const House: React.FC<{ p?: V3; s?: number; c?: string; roof?: string; lit?: number; ry?: number }> = ({ p = [0, 0, 0], s = 1, c = "#f2d9b0", roof = "#d9604a", lit = 1, ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}><Box w={2.4} h={1.9} d={2} c={c} p={[0, 0.95, 0]} rr={0.25} /><S g={G.cone(2.0, 1.4, 4)} c={roof} p={[0, 2.55, 0]} r={[0, Math.PI / 4, 0]} />
    <Box w={0.55} h={1.0} d={0.15} c="#7a4a5e" p={[-0.5, 0.5, 1.0]} /><Box w={0.6} h={0.55} d={0.12} c={lit > 0.5 ? "#fff0a8" : "#4a4468"} glow={lit > 0.5 ? 0.85 : 0.05} p={[0.55, 1.1, 1.0]} /></Gr>
);
export const Shop: React.FC<{ t: number; p?: V3; s?: number; c?: string; awn?: string; ry?: number }> = ({ t, p = [0, 0, 0], s = 1, c = "#f2e4c8", awn = "#e2573d", ry = 0 }) => (
  <Gr p={p} s={s} r={[0, ry, 0]}><Box w={5} h={3.4} d={2} c={c} p={[0, 1.7, -0.4]} rr={0.3} />{Array.from({ length: 7 }, (_, i) => <Ball key={i} p={[-2.15 + i * 0.72, 3.15 + bob(t, i, 0.025), 0.7]} s={[0.42, 0.34, 0.85]} c={i % 2 ? "#fff6ea" : awn} />)}
    <Box w={1.2} h={2.0} d={0.15} c="#6fa8c8" p={[-1.3, 1.05, 0.65]} glow={0.2} /><Box w={2.0} h={1.35} d={0.15} c="#bfe8ff" glow={0.35} p={[0.9, 1.5, 0.65]} /></Gr>
);
export const City: React.FC<{ t: number; p?: V3; n?: number; span?: number; seed?: string; c?: string[]; h?: [number, number] }> = ({ p = [0, 0, -8], n = 12, span = 24, seed = "c", c = ["#6c74c9", "#8f7bc8", "#4f8fe0", "#c9705a"], h = [2, 6] }) => (
  <Gr p={p}>{Array.from({ length: n }, (_, i) => { const hh = h[0] + R(seed + i, 2) * (h[1] - h[0]), x = -span / 2 + (i + 0.5) * (span / n); return <group key={i}><Box w={span / n * 0.78} h={hh} d={1.4} c={c[i % c.length]} p={[x, hh / 2, -R(seed + i, 3) * 2]} rr={0.2} />{Array.from({ length: Math.floor(hh) }, (_, r) => <Box key={r} w={0.28} h={0.3} d={0.1} c="#fff0b8" glow={R(i, r + 4) > 0.4 ? 0.8 : 0.1} p={[x, 0.7 + r * 0.85, 0.75 - R(seed + i, 3) * 2]} />)}</group>; })}</Gr>
);
export const Pole: React.FC<{ p?: V3; h?: number; s?: number; tilt?: number }> = ({ p = [0, 0, 0], h = 5, s = 1, tilt = 0 }) => <Gr p={p} s={s} r={[0, 0, tilt]}><Cyl r={0.13} r2={0.17} h={h} c="#8a5a48" p={[0, h / 2, 0]} />{[h - 0.2, h - 0.75].map((y) => <Box key={y} w={1.3} h={0.15} d={0.15} c="#8a5a48" p={[0, y, 0]} />)}</Gr>;
export const Palm: React.FC<{ t: number; p?: V3; s?: number }> = ({ t, p = [0, 0, 0], s = 1 }) => <Gr p={p} s={s}><Hose a={[0, 0, 0]} c={[0.3, 2, 0]} b={[0.6, 3.6, 0]} w={0.2} color="#a8743c" />{[0, 1, 2, 3, 4].map((i) => <Hose key={i} a={[0.6, 3.6, 0]} c={[0.6 + Math.cos(i * 1.26) * 1.2, 4.5, Math.sin(i * 1.26) * 1.2]} b={[0.6 + Math.cos(i * 1.26) * 2, 3.4 + Math.sin(t * 1.5 + i) * 0.15, Math.sin(i * 1.26) * 2]} w={0.18} color="#4fb36a" />)}</Gr>;

/* ---------- perangkat dan jaringan ---------- */
export const Phone: React.FC<{ p?: V3; s?: number; r?: V3; screen?: string; t?: number; fill?: number; face?: Expr }> = ({ p, s = 1, r = [0, -0.15, 0], screen = "#bfe8ff", t = 0, fill, face }) => (
  <Gr p={p} s={s} r={r}><Box w={1.8} h={3.3} d={0.28} c={INK} rr={0.13} /><Box w={1.55} h={2.9} d={0.1} c={screen} glow={0.5} p={[0, 0, 0.13]} rr={0.04} />{fill !== undefined && <Box w={Math.max(0.05, 1.2 * fill)} h={0.25} d={0.12} c="#179a72" glow={0.5} p={[-0.6 + 0.6 * fill, -0.7, 0.2]} />}{face && <Face t={t} p={[0, 0.2, 0.24]} s={0.8} e={face} />}</Gr>
);
export const Router: React.FC<{ t: number; p?: V3; s?: number; e?: Expr; c?: string; ok?: boolean }> = ({ t, p = [0, 0, 0], s = 1, e = "calm", c = "#f2e4c8", ok = true }) => (
  <Gr p={p} s={s}><Box w={3.0} h={1.2} d={1.4} c={c} p={[0, 0.65, 0]} />{[-1.1, 1.1].map((x) => <group key={x}><Rod a={[x, 1.1, -0.3]} b={[x * 1.25, 2.6, -0.3]} w={0.09} c={INK} /><Ball p={[x * 1.25, 2.65, -0.3]} s={0.15} c={INK} /></group>)}
    <Face t={t} p={[0, 0.8, 0.74]} s={0.62} e={e} seed={7} />{[-1.2, -0.9].map((x, i) => <Ball key={x} p={[x, 0.3, 0.72]} s={0.08} c={ok && Math.sin(t * 6 + i * 2) > -0.3 ? "#8fffc8" : "#ff7a63"} glow={0.9} />)}</Gr>
);
export const Console: React.FC<{ p?: V3; s?: number; on?: number }> = ({ p = [0, 0, 0], s = 1, on = 1 }) => (
  <Gr p={p} s={s}><Box w={3.6} h={2.2} d={0.25} c={INK} p={[0, 2.2, 0]} rr={0.12} /><Box w={3.25} h={1.85} d={0.1} c={on > 0.5 ? "#c8f4ff" : "#2a2a48"} glow={on > 0.5 ? 0.7 : 0.1} p={[0, 2.2, 0.13]} rr={0.04} /><Box w={0.3} h={1.0} d={0.3} c={INK} p={[0, 0.8, 0]} /><Box w={2.2} h={0.45} d={1.0} c="#e8e2ff" p={[0, 0.25, 0.4]} /></Gr>
);
/** Menara seluler dengan gelombang. */
export const Cell: React.FC<{ t: number; p?: V3; s?: number; e?: Expr; waves?: boolean; h?: number }> = ({ t, p = [0, 0, 0], s = 1, e = "happy", waves = true, h = 5 }) => (
  <Gr p={p} s={s}>{[-0.9, 0.9].map((x) => <Rod key={x} a={[x, 0, 0]} b={[x * 0.25, h, 0]} w={0.13} c="#e2573d" />)}{[1.2, 2.5, 3.8].map((y) => <Rod key={y} a={[-0.8 * (1 - y / h) - 0.2, y, 0]} b={[0.8 * (1 - y / h) + 0.2, y, 0]} w={0.08} c="#ffd0b8" />)}
    <Ball p={[0, h + 0.5, 0]} s={0.85} c="#f2e4c8" /><Face t={t} p={[0, h + 0.5, 0.82]} s={0.6} e={e} />
    {waves && [0, 1, 2].map((i) => { const u = (t * 0.55 + i / 3) % 1; return <S key={i} g={G.torus(1.2 + u * 4, 0.07)} c="#8fe8ff" glow={0.9} o={(1 - u) * 0.9} p={[0, h + 0.5, -0.2]} />; })}</Gr>
);
export const Cable: React.FC<{ a: V3; b: V3; sag?: number; c?: string; w?: number; on?: number }> = ({ a, b, sag = 0.8, c = "#ffd23f", w = 0.07, on = 1 }) => on <= 0.01 ? null : <Hose a={a} c={[(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - sag, (a[2] + b[2]) / 2]} b={b} w={w} color={c} n={18} upto={on} o={{ basic: true }} />;
/** Bar progres mendatar; v 0..1. */
export const Progress: React.FC<{ p?: V3; v: number; w?: number; h?: number; c?: string; s?: number }> = ({ p, v, w = 8, h = 0.8, c = "#3fd890", s = 1 }) => (
  <Gr p={p} s={s}><Box w={w + 0.35} h={h + 0.35} d={0.4} c="#2a2448" rr={0.2} />{v > 0.005 && <Box w={Math.max(0.12, w * clamp(v))} h={h} d={0.5} c={c} glow={0.6} p={[-w / 2 + (w * clamp(v)) / 2, 0, 0.06]} rr={0.12} />}</Gr>
);
export const Bucket: React.FC<{ p?: V3; s?: number; v: number; c?: string; water?: string }> = ({ p = [0, 0, 0], s = 1, v, c = "#ff9f6e", water = "#6fe0ff" }) => (
  <Gr p={p} s={s}><S g={G.cyl(1.15, 0.9, 2.2, 36)} c={c} o={0.36} p={[0, 1.1, 0]} cast={false} /><S g={G.torus(1.15, 0.1)} c={c} p={[0, 2.22, 0]} r={[Math.PI / 2, 0, 0]} /><Cyl r={0.92} h={0.12} c={c} p={[0, 0.08, 0]} />
    {v > 0.01 && <Cyl r={0.9 + 0.17 * v} r2={0.87} h={2.0 * clamp(v)} c={water} glow={0.45} p={[0, 0.14 + clamp(v), 0]} />}<S g={G.torus(1.0, 0.05, Math.PI)} c={INK} p={[0, 2.2, 0]} /></Gr>
);
/** Jam dinding; h = jam (boleh pecahan), jarum panjang mengikuti menit. */
export const Clock: React.FC<{ p?: V3; s?: number; h: number; c?: string }> = ({ p, s = 1, h, c = "#e2573d" }) => (
  <Gr p={p} s={s}><Cyl r={1.35} h={0.28} c="#fff4da" rot={[Math.PI / 2, 0, 0]} /><S g={G.torus(1.35, 0.15)} c={c} p={[0, 0, 0.1]} />{Array.from({ length: 12 }, (_, i) => <Ball key={i} p={[Math.sin(i / 12 * 6.283) * 1.05, Math.cos(i / 12 * 6.283) * 1.05, 0.2]} s={0.06} c={INK} />)}
    <Rod a={[0, 0, 0.25]} b={[Math.sin(h / 12 * 6.283) * 0.62, Math.cos(h / 12 * 6.283) * 0.62, 0.25]} w={0.1} c={INK} /><Rod a={[0, 0, 0.3]} b={[Math.sin(h * 6.283) * 0.95, Math.cos(h * 6.283) * 0.95, 0.3]} w={0.06} c={c} /><Ball p={[0, 0, 0.33]} s={0.14} c={INK} /></Gr>
);
/** Grid benda yang bisa dihitung: value dari total menyala bertahap. */
export const Grid: React.FC<{ t: number; total: number; value: number; cols: number; gap?: number; p?: V3; on?: string; off?: string; at?: number; dur?: number; shape?: "ball" | "house" | "coin" | "phone" | "door" }> = ({ t, total, value, cols, gap = 0.62, p = [0, 0, 0], on = "#ffd23f", off = "#6a638f", at = 0.4, dur = 1.8, shape = "ball" }) => {
  const k = seg(t, at, at + dur) * value, rows = Math.ceil(total / cols);
  return <Gr p={p}>{Array.from({ length: total }, (_, i) => { const x = ((i % cols) - (cols - 1) / 2) * gap, y = (rows - 1 - Math.floor(i / cols)) * gap, lit = i < k, c = lit ? on : off, a = Math.min(1, Math.max(0, t * 3 - i / total)); if (a <= 0) return null; const s = gap * a * (lit ? 1.06 : 1);
    return <Gr key={i} p={[x, y, lit ? 0.25 : 0]} s={s}>{shape === "ball" ? <Ball s={0.38} c={c} glow={lit ? 0.45 : 0.05} /> : shape === "coin" ? <Coin r={[Math.PI / 2, 0, 0]} c={c} hi={lit ? "#ffe9a0" : "#8a84b0"} s={1.05} /> : shape === "house" ? <><Box w={0.6} h={0.45} d={0.4} c={c} glow={lit ? 0.45 : 0.05} p={[0, -0.12, 0]} /><S g={G.cone(0.5, 0.35, 4)} c={lit ? "#ff8a5c" : "#57507a"} p={[0, 0.28, 0]} r={[0, 0.785, 0]} /></> : shape === "phone" ? <Box w={0.42} h={0.72} d={0.15} c={c} glow={lit ? 0.5 : 0.05} /> : <><Box w={0.55} h={0.76} d={0.14} c={c} glow={lit ? 0.5 : 0.05} /><Ball p={[0.13, 0, 0.1]} s={0.06} c={INK} /></>}</Gr>; })}</Gr>;
};
export const Bar3: React.FC<{ t: number; h: number; p?: V3; c?: string; w?: number; at?: number; dur?: number }> = ({ t, h, p = [0, 0, 0], c = "#e2573d", w = 1.6, at = 0.3, dur = 1 }) => { const v = Math.max(0.05, h * go(t, at, dur)); return <Box w={w} h={v} d={w * 0.8} c={c} glow={0.2} p={[p[0], p[1] + v / 2, p[2]]} rr={Math.min(0.25, v / 2)} />; };
export const Calendar: React.FC<{ p?: V3; s?: number; mark?: number; flip?: number; t?: number }> = ({ p, s = 1, mark = 0, flip = 0, t = 0 }) => (
  <Gr p={p} s={s}><Box w={3.4} h={3.2} d={0.3} c="#fff4da" /><Box w={3.45} h={0.7} d={0.36} c="#e2573d" p={[0, 1.4, 0]} />{[-0.9, 0.9].map((x) => <S key={x} g={G.torus(0.22, 0.07)} c={INK} p={[x, 1.8, 0]} />)}
    {Array.from({ length: 20 }, (_, i) => <Box key={i} w={0.42} h={0.38} d={0.12} c={i < mark ? "#179a72" : "#d9ccb0"} glow={i < mark ? 0.4 : 0.05} p={[-1.2 + (i % 5) * 0.6, 0.55 - Math.floor(i / 5) * 0.55, 0.17]} />)}{flip > 0 && <Box w={3.2} h={2.4} d={0.06} c="#fffaf0" p={[0, -0.2 + ((t * flip) % 1) * 1.4, 0.4 + ((t * flip) % 1)]} r={[-((t * flip) % 1) * 2, 0, 0]} o={1 - ((t * flip) % 1)} />}</Gr>
);
export const Scale: React.FC<{ p?: V3; s?: number; tilt: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ p, s = 1, tilt, left, right }) => (
  <Gr p={p} s={s}><Cyl r={0.25} r2={0.55} h={3.4} c="#d9a06a" p={[0, 1.7, 0]} /><Box w={2.6} h={0.4} d={1.4} c="#a8643c" p={[0, 0.2, 0]} />
    <Gr p={[0, 3.5, 0]} r={[0, 0, tilt]}><Box w={8} h={0.28} d={0.4} c="#ffd766" /></Gr><Ball p={[0, 3.55, 0.2]} s={0.35} c="#e2573d" />
    {[-1, 1].map((d) => { const x = d * 3.85 * Math.cos(tilt), y = 3.5 + d * 3.85 * Math.sin(tilt) - 1.5; return <Gr key={d} p={[x, y, 0]}><Rod a={[0, 1.5, 0]} b={[-0.9, 0, 0]} w={0.04} c="#fff4da" /><Rod a={[0, 1.5, 0]} b={[0.9, 0, 0]} w={0.04} c="#fff4da" /><Cyl r={1.35} r2={1.0} h={0.22} c="#f2e4c8" />{d < 0 ? left : right}</Gr>; })}</Gr>
);
export const Check: React.FC<{ p: V3; s?: number }> = ({ p, s = 1 }) => <Gr p={p} s={s}><Ball s={[0.75, 0.75, 0.3]} c="#179a72" glow={0.4} /><Rod a={[-0.38, 0, 0.35]} b={[-0.1, -0.28, 0.35]} w={0.11} c="#ffffff" /><Rod a={[-0.1, -0.28, 0.35]} b={[0.4, 0.28, 0.35]} w={0.11} c="#ffffff" /></Gr>;
export const Cross: React.FC<{ p: V3; s?: number }> = ({ p, s = 1 }) => <Gr p={p} s={s}><Rod a={[-0.7, -0.7, 0]} b={[0.7, 0.7, 0]} w={0.22} c="#e2443d" /><Rod a={[-0.7, 0.7, 0]} b={[0.7, -0.7, 0]} w={0.22} c="#e2443d" /></Gr>;
export const Arrow: React.FC<{ a: V3; b: V3; c?: string; w?: number; on?: number; lift?: number }> = ({ a, b, c = "#ffffff", w = 0.14, on = 1, lift = 1.2 }) => {
  if (on <= 0.02) return null; const mid: V3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + lift * 2, (a[2] + b[2]) / 2];
  const at = (u: number): V3 => [0, 1, 2].map((i) => (1 - u) * (1 - u) * a[i] + 2 * (1 - u) * u * mid[i] + u * u * b[i]) as V3;
  const e = at(on), q = at(Math.max(0, on - 0.04)); const d = new THREE.Vector3(e[0] - q[0], e[1] - q[1], e[2] - q[2]).normalize(); const qq = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
  return <><Hose a={a} c={mid} b={b} w={w} color={c} n={20} upto={on} /><mesh geometry={G.cone(w * 3, w * 6, 20)} material={soft(c, 0.4)} position={e} quaternion={qq} /></>;
};
/** Teks angka/kata pendek pada benda (bukan papan penjelasan). */
export const Num: React.FC<{ text: string; p: V3; h?: number; c?: string; bg?: string }> = ({ text, p, h = 1.2, c = "#ffffff", bg }) => (
  <group position={p}><TextPlane text={text} h={h} color={c} bg={bg} />
    {/* bidang tak terlihat yang menulis kedalaman, supaya teks tidak ikut diburamkan efek fokus */}
    <mesh renderOrder={5} position={[0, 0, -0.01]}><planeGeometry args={[h * Math.round(((text.length * 92 + 100) / 240) * 4) / 4, h * 0.8]} /><meshBasicMaterial colorWrite={false} depthWrite transparent /></mesh>
  </group>
);

/* ---------- peta ---------- */
/** Pulau lembut dari daftar gumpalan [x, z, rx, rz]. */
export const Isle: React.FC<{ blobs: [number, number, number, number][]; c?: string; y?: number }> = ({ blobs, c = "#7fc77a", y = 0 }) => <>{blobs.map(([x, z, rx, rz], i) => <group key={i}><Ball p={[x, y + 0.02, z]} s={[rx * 1.12, 0.14, rz * 1.15]} c="#f2d9a0" cast={false} /><Ball p={[x, y + 0.1 + i * 0.002, z]} s={[rx, 0.3, rz]} c={c} /></group>)}</>;
/** Kepulauan stilisasi (bukan peta akurat): barat ke timur. */
export const IDN: Record<string, [number, number, number, number][]> = {
  sumatra: [[-8.6, -2.6, 1.5, 0.8], [-7.4, -1.5, 1.6, 0.9], [-6.2, -0.3, 1.3, 0.9]],
  jawa: [[-4.6, 2.4, 1.3, 0.55], [-2.9, 2.7, 1.4, 0.55], [-1.2, 2.9, 1.1, 0.5]],
  kalimantan: [[-2.4, -1.4, 1.9, 1.7], [-1.2, -2.4, 1.4, 1.2]],
  sulawesi: [[2.0, -1.0, 0.7, 1.6], [2.8, -2.3, 1.4, 0.4], [2.9, 0.1, 1.0, 0.35]],
  nusa: [[0.8, 3.2, 0.5, 0.35], [1.9, 3.3, 0.55, 0.3], [3.2, 3.4, 0.9, 0.3], [4.6, 3.7, 0.7, 0.3]],
  papua: [[7.6, -0.4, 2.0, 1.3], [9.0, 0.7, 1.4, 1.3], [6.2, -1.1, 0.9, 0.55]],
  maluku: [[4.7, -1.3, 0.45, 0.8], [5.0, 0.8, 0.8, 0.3]],
};
export const Archipelago: React.FC<{ t: number; hi?: keyof typeof IDN; c?: string; dots?: number }> = ({ t, hi, c = "#6fbf7a", dots = 0 }) => (
  <>{Object.entries(IDN).map(([k, b]) => <Isle key={k} blobs={b} c={k === hi ? "#ffd766" : c} />)}
    {Array.from({ length: dots }, (_, i) => <Ball key={i} p={[(R(i, 31) - 0.5) * 22, 0.08, (R(i, 32) - 0.5) * 11]} s={[0.16, 0.08, 0.13]} c={c} o={Math.min(1, Math.max(0, t * 40 - i * 0.2))} cast={false} />)}</>
);
export const Wave: React.FC<{ t: number; p?: V3; s?: number; e?: Expr; rise?: number }> = ({ t, p = [0, 0, 0], s = 1, e = "smug", rise = 1 }) => (
  <Gr p={[p[0], p[1] - (1 - rise) * 4 * s, p[2]]} s={s}>{[[-1.6, 0.9, 1.3], [0, 1.6, 1.9], [1.6, 0.9, 1.3]].map(([x, y, r], i) => <group key={i}><Ball p={[x, y + bob(t, i * 2, 0.18), -i * 0.05]} s={[r, r * 1.05, r * 0.7]} c="#3fb3d0" /><Ball p={[x, y + r * 0.9 + bob(t, i * 2, 0.18), 0.1]} s={[r * 0.5, 0.25, r * 0.4]} c="#e8fcff" glow={0.3} /></group>)}
    <Face t={t} p={[0, 1.9 + bob(t, 2, 0.18), 1.36]} s={1.15} e={e} />{[-1, 1].map((d) => <Hose key={d} a={[d * 2.2, 1.2, 0.5]} c={[d * 3.6, 1.4, 0.8]} b={[d * 3.2, 2.8 + bob(t * 2, d, 0.35), 0.8]} w={0.22} color="#3fb3d0" />)}</Gr>
);
export const Burst: React.FC<{ t: number; at: number; p: V3; n?: number; c?: string[]; r?: number }> = ({ t, at, p, n = 40, c = ["#ffd23f", "#ff7a63", "#8fffc8", "#8fe8ff"], r = 7 }) => { const u = (t - at) / 1.4; return u <= 0 || u >= 1 ? null : <>{Array.from({ length: n }, (_, i) => { const a = R(i, 41) * 6.283, v = (0.3 + R(i, 42) * 0.7) * r, k = 1 - (1 - u) ** 3; return <Ball key={i} p={[p[0] + Math.cos(a) * v * k, p[1] + Math.sin(a) * v * k - u * u * 2, p[2] + (R(i, 43) - 0.5) * 4 * k]} s={0.2 * (1 - u)} c={c[i % c.length]} glow={0.9} cast={false} />; })}</>; };
/** Latar thumbnail: benda dikomposisi di bawah/samping teks. */
export const thumb = (sky: SkyName, items: (a: A) => React.ReactNode, o: SceneOpt = {}) => sc(sky, items, [], o);
