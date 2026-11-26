// Pemeran T02 versi 3D (produksi/STYLE.md): badan satu bentuk dasar, tangan/kaki selang karet, mata titik, satu aksesori.
// Titik asal = di antara kaki, menghadap +z (kamera). Tinggi ±2,5 satuan pada s=1. Semua gerak fungsi dari t.
import React from "react";
import * as THREE from "three";
import { G, Gr, Hose, M, Rod, TextPlane, V3, poly } from "../core";
import { R, mix } from "../../kit";
export type Expr = "neutral" | "happy" | "sad" | "shock" | "tired" | "angry" | "smug";
const INK = "#2a1d26";
const blink = (t: number, seed = 0) => { const p = (t + seed) % 3.3; return p < 0.14 ? Math.max(0.12, Math.abs(p - 0.07) / 0.07) : 1; };

/** Wajah datar yang menempel di bidang depan benda. Titik asal = di antara kedua mata. */
export const Face: React.FC<{ expr: Expr; t: number; sp?: number; look?: number; seed?: number; brow?: string; browW?: number }> = ({ expr, t, sp = 0.26, look = 0, seed = 0, brow = INK, browW = 0.04 }) => {
  const o = (expr === "tired" ? 0.45 : 1) * blink(t, seed), er = expr === "shock" ? 0.12 : 0.092;
  const tilt: Record<Expr, number> = { neutral: 0, happy: -0.1, sad: -0.3, shock: -0.15, tired: 0.08, angry: 0.34, smug: 0.2 };
  return (
    <group>
      {[-1, 1].map((d) => (
        <Gr key={d} p={[d * sp + look * 0.07, 0, 0]}>
          {expr === "happy" ? <M g={G.torus(0.085, 0.028, Math.PI)} c={INK} p={[0, -0.02, 0.01]} o={{ basic: true }} /> : (
            <><M g={G.ball(1, 16)} c={INK} s={[er, er * Math.max(0.12, o), er * 0.5]} o={{ basic: true }} />
              {o > 0.6 && <M g={G.ball(1, 8)} c="#ffffff" p={[-0.03, 0.033, er * 0.55]} s={0.026} o={{ basic: true }} />}</>
          )}
          {expr !== "neutral" && expr !== "happy" && <M g={G.box(0.24, 1, 0.04, 0)} c={brow} p={[0, expr === "shock" ? 0.25 : 0.18, 0.02]} r={[0, 0, d * tilt[expr]]} s={[1, browW, 1]} o={{ basic: true }} />}
        </Gr>
      ))}
      <Gr p={[look * 0.05, -0.24, 0.02]}>
        {expr === "happy" && <M g={G.ext("smile", () => { const s = new THREE.Shape(); s.moveTo(-0.15, 0.03); s.quadraticCurveTo(0, -0.22, 0.15, 0.03); s.closePath(); return s; }, 0.03, 0.008)} c="#5a2232" o={{ basic: true }} />}
        {expr === "shock" && <M g={G.ball(1, 14)} c="#5a2232" s={[0.085, 0.115, 0.03]} o={{ basic: true }} />}
        {expr === "sad" && <M g={G.torus(0.11, 0.024, Math.PI * 0.8)} c={INK} p={[0, -0.1, 0]} r={[0, 0, Math.PI * 0.1]} o={{ basic: true }} />}
        {expr === "neutral" && <M g={G.box(0.17, 0.045, 0.03, 0.02)} c={INK} o={{ basic: true }} />}
        {expr === "tired" && <><M g={G.torus(0.05, 0.022, Math.PI)} c={INK} p={[-0.05, 0, 0]} o={{ basic: true }} /><M g={G.torus(0.05, 0.022, Math.PI)} c={INK} p={[0.05, 0, 0]} r={[0, 0, Math.PI]} o={{ basic: true }} /></>}
        {expr === "angry" && <><M g={G.box(0.28, 0.13, 0.03, 0.05)} c="#5a2232" o={{ basic: true }} /><M g={G.box(0.22, 0.03, 0.02, 0)} c="#ffffff" p={[0, 0.005, 0.03]} o={{ basic: true }} /></>}
        {expr === "smug" && <M g={G.torus(0.13, 0.024, Math.PI * 0.55)} c={INK} p={[0.01, 0.09, 0]} r={[0, 0, Math.PI * 1.3]} o={{ basic: true }} />}
      </Gr>
    </group>
  );
};

/* ------------------------------ KOMO ------------------------------ */
export type KomoPose = "idle" | "wave" | "point" | "shrug" | "walk";
export const Komo: React.FC<{ t: number; expr?: Expr; pose?: KomoPose; look?: number }> = ({ t, expr = "neutral", pose = "idle", look = 0 }) => {
  const C = { skin: "#d2925f", limb: "#a86c43", hat: "#2c8c86", hatD: "#1f6f6a", band: "#f2c14e", pack: "#e2573d", packD: "#b9432f", shoe: "#2f3b52" };
  const walk = pose === "walk", ph = t * 9, step = walk ? Math.sin(ph) : 0, bob = walk ? Math.abs(Math.sin(ph)) * 0.09 : 0, br = 1 + Math.sin(t * 2.4) * 0.016;
  const hands: Record<KomoPose, [V3, V3, V3, V3]> = {
    idle: [[-1.0, 0.72, 0.15], [1.0, 0.72, 0.15], [-1.12, 1.2, 0], [1.12, 1.2, 0]],
    walk: [[-0.9, 0.78, step * 0.55], [0.9, 0.78, -step * 0.55], [-1.05, 1.2, 0], [1.05, 1.2, 0]],
    wave: [[-1.0, 0.72, 0.15], [1.2 + Math.sin(t * 11) * 0.18, 2.25, 0.2], [-1.12, 1.2, 0], [1.5, 1.45, 0]],
    point: [[-1.0, 0.72, 0.15], [1.75, 1.5, 0.3], [-1.12, 1.2, 0], [1.2, 1.15, 0]],
    shrug: [[-1.3, 1.85, 0.25], [1.3, 1.85, 0.25], [-1.1, 0.9, 0.1], [1.1, 0.9, 0.1]],
  };
  const [lh, rh, lc, rc] = hands[pose];
  return (
    <group>
      {[-1, 1].map((d) => (<group key={d}><Hose a={[d * 0.24, 0.55, 0]} c={[d * 0.3, 0.32, d * step * 0.2]} b={[d * 0.26, 0.12, d * step * 0.45]} w={0.085} color={C.limb} n={4} />
        <M g={G.ball(1, 18)} c={C.shoe} p={[d * 0.28, 0.1 + Math.max(0, d * step) * 0.1, d * step * 0.45 + 0.1]} s={[0.19, 0.12, 0.28]} /></group>))}
      <Gr p={[0, bob, 0]}>
        <M g={G.box(0.78, 0.86, 0.42, 0.2)} c={C.packD} p={[0.22, 1.3, -0.62]} />
        <Gr p={[0, 1.32, 0]} s={[1, br, 1]}>
          <M g={G.ball(1, 40)} c={C.skin} s={[0.76, 0.92, 0.66]} />
          <M g={G.torus(0.72, 0.065, Math.PI * 1.1)} c={C.pack} p={[0, -0.1, 0.02]} r={[1.45, 0.35, -0.3]} s={[1.04, 0.95, 1]} />
          <Gr p={[0, 0.07, 0.665]}><Face expr={expr} t={t} sp={0.25} look={look} seed={0.4} /></Gr>
          <M g={G.dome(0.5)} c={C.hat} p={[0, 0.66, 0]} s={[1, 0.9, 0.95]} />
          <M g={G.cyl(0.74, 0.8, 0.08, 36)} c={C.hatD} p={[0, 0.66, 0]} s={[1, 1, 0.92]} />
          <M g={G.cyl(0.505, 0.515, 0.11, 36)} c={C.band} p={[0, 0.75, 0]} s={[1, 1, 0.95]} />
        </Gr>
        <Hose a={[-0.66, 1.35, 0.05]} c={lc} b={lh} w={0.082} color={C.limb} /><Hose a={[0.66, 1.35, 0.05]} c={rc} b={rh} w={0.082} color={C.limb} />
        <M g={G.ball(0.13)} c={C.skin} p={lh} /><M g={G.ball(0.13)} c={C.skin} p={rh} />
      </Gr>
    </group>
  );
};

/* ------------------------------ SEPUH: kereta tua eks-Tokyo ------------------------------ */
export const Sepuh: React.FC<{ t: number; expr?: Expr; look?: number; dim?: number; sweat?: boolean; roll?: number; stamp?: number }> = ({ t, expr = "tired", look = 0, dim = 0, sweat, roll = 0, stamp = 0 }) => {
  const fadeC = (c: string) => { const x = new THREE.Color(c), l = x.r * 0.3 + x.g * 0.59 + x.b * 0.11; x.lerp(new THREE.Color(l, l, l), dim * 0.85).multiplyScalar(1 - dim * 0.25); return "#" + x.getHexString(); };
  const C = { body: fadeC("#efe7d3"), side: fadeC("#d8cfb6"), win: "#2b3550", red: fadeC("#d83c33"), yel: fadeC("#f2b632"), stache: fadeC("#e6e2d9"), dark: "#3b3d46", rust: fadeC("#b0683a"), wood: "#7a5232" };
  const br = 1 + Math.sin(t * 2) * 0.01, w = Math.sin(t * 3.1) * 0.05;
  return (
    <group>
      <M g={G.box(2.5, 0.32, 1.7, 0.12)} c={C.dark} p={[0, 0.34, -0.1]} />
      {[-0.8, 0.8].map((x) => [0.55, -0.75].map((z) => <Gr key={`${x}${z}`} p={[x, 0.24, z]} r={[0, 0, -roll]}><M g={G.cyl(0.24, 0.24, 0.2)} c="#26272d" r={[Math.PI / 2, 0, 0]} /><M g={G.box(0.3, 0.07, 0.24, 0.02)} c="#9496a0" /><M g={G.box(0.07, 0.3, 0.24, 0.02)} c="#9496a0" /></Gr>))}
      <Gr p={[0, 0.48, 0]} s={[1, br, 1]}>
        <M g={G.box(2.6, 3.25, 2.0, 0.55)} c={C.body} p={[0, 1.63, -0.15]} />
        <M g={G.box(2.64, 0.24, 2.03, 0.1)} c={C.red} p={[0, 0.66, -0.15]} /><M g={G.box(2.65, 0.1, 2.04, 0.04)} c={C.yel} p={[0, 0.46, -0.15]} />
        <M g={G.box(1.7, 0.18, 1.7, 0.08)} c={C.side} p={[0, 3.3, -0.2]} />
        {[[-0.95, 0.95, 0.2], [0.95, 2.95, 0.15], [-0.8, 3.05, 0.11]].map(([x, y, r], i) => <M key={i} g={G.ball(1, 14)} c={C.rust} p={[x, y, 0.82]} s={[r, r * 0.7, 0.04]} />)}
        <M g={G.box(1.3, 0.32, 0.1, 0.06)} c="#1d1f27" p={[0, 3.0, 0.84]} />
        {[-0.42, -0.14, 0.14, 0.42].map((x) => <M key={x} g={G.box(0.2, 0.1, 0.04, 0.02)} c="#ff9a3c" p={[x, 3.0, 0.9]} o={{ basic: true }} />)}
        <M g={G.box(2.1, 0.92, 0.12, 0.3)} c="#a9b4c4" p={[0, 2.22, 0.82]} />
        <M g={G.box(1.96, 0.8, 0.12, 0.28)} c="#c9e6f2" p={[0, 2.22, 0.855]} />
        <Gr p={[0, 2.26, 0.95]} s={1.5}><Face expr={expr} t={t} sp={0.31} look={look} seed={1.7} brow={C.stache} browW={0.085} /></Gr>
        {[-1, 1].map((d) => <Gr key={d} p={[0, 1.46, 0.95]} r={[0, 0, d * w]}><M g={G.ext("stache" + d, () => { const s = new THREE.Shape(); s.moveTo(0, 0.02); s.bezierCurveTo(d * 0.3, 0.22, d * 0.75, 0.12, d * 0.92, -0.18); s.bezierCurveTo(d * 0.62, -0.08, d * 0.34, -0.2, 0, -0.1); s.closePath(); return s; }, 0.14, 0.04)} c={C.stache} /></Gr>)}
        {[-0.95, 0.95].map((x) => <M key={x} g={G.cyl(0.14, 0.14, 0.1)} c="#fff1b0" p={[x, 1.05, 0.86]} r={[Math.PI / 2, 0, 0]} o={{ glow: 0.5 * (1 - dim) }} />)}
        <Rod a={[-0.5, 3.35, -0.2]} b={[0, 3.85, -0.2]} w={0.05} c={C.dark} /><Rod a={[0.5, 3.35, -0.2]} b={[0, 3.85, -0.2]} w={0.05} c={C.dark} /><M g={G.box(1.5, 0.09, 0.14, 0.03)} c={C.dark} p={[0, 3.9, -0.2]} />
        {sweat && [0, 1].map((i) => { const q = (t * 0.7 + i * 0.5) % 1; return <Gr key={i} p={[i ? -1.32 : 1.34, 2.75 - q * 0.8, 0.8]} s={1 - q * 0.4}><M g={G.ball(0.11, 12)} c="#8fd3f5" /><M g={G.cone(0.095, 0.2, 12)} c="#8fd3f5" p={[0, 0.14, 0]} /></Gr>; })}
        {stamp > 0 && <Gr p={[0, 0.9, 1.15 + (1 - stamp) * 2.5]} r={[0, 0, -0.18]} s={1 + (1 - stamp) * 0.8}><TextPlane text="TOO OLD" h={0.8} color="#d8322b" bg="#fff8ea" border="#d8322b" opacity={stamp} /></Gr>}
      </Gr>
      <Hose a={[-1.25, 2.0, 0.4]} c={[-1.8, 1.9, 0.6]} b={[-1.75, 1.2, 0.8]} w={0.085} color={C.side} /><Hose a={[1.25, 2.0, 0.4]} c={[1.85, 1.9, 0.6]} b={[1.78, 1.3, 0.8]} w={0.085} color={C.side} />
      <M g={G.ball(0.13)} c={C.body} p={[-1.75, 1.2, 0.8]} /><M g={G.ball(0.13)} c={C.body} p={[1.78, 1.3, 0.8]} />
      <Rod a={[1.8, 1.3, 0.8]} b={[1.8, 0.02, 0.95]} w={0.065} c={C.wood} /><M g={G.torus(0.17, 0.065, Math.PI)} c={C.wood} p={[1.63, 1.38, 0.8]} />
    </group>
  );
};

/* ------------------------------ PAK ATURAN ------------------------------ */
/** slam 0..1 = stempel dihantam ke bawah-depan; raise 0..1 = stempel terangkat. */
export const Aturan: React.FC<{ t: number; expr?: Expr; look?: number; raise?: number; slam?: number }> = ({ t, expr = "neutral", look = 0, raise = 0, slam = 0 }) => {
  const C = { paper: "#f8f0da", fold: "#d9cca9", line: "#c2b592", navy: "#2c3f6c", navyD: "#1b2846", seal: "#d8322b" };
  const br = 1 + Math.sin(t * 2.2 + 1) * 0.012;
  const up: V3 = [1.25, mix(1.5, 3.35, raise), 0.35], hit: V3 = [1.85, 0.95, 1.1];
  const h: V3 = [mix(up[0], hit[0], slam), mix(up[1], hit[1], slam), mix(up[2], hit[2], slam)];
  return (
    <group>
      {[-0.28, 0.28].map((x) => <group key={x}><Rod a={[x, 0.75, 0]} b={[x, 0.1, 0.05]} w={0.08} c={C.navyD} /><M g={G.ball(1, 14)} c="#1a1a22" p={[x * 1.15, 0.09, 0.15]} s={[0.18, 0.1, 0.27]} /></group>)}
      <Gr p={[0, 0.62, 0]} s={[1, br, 1]}>
        <M g={G.ext("aturanSheet", () => poly([[-0.8, 0], [0.8, 0], [0.8, 2.42], [0.42, 2.8], [-0.8, 2.8]]), 0.34, 0.07)} c={C.paper} />
        <M g={G.ext("aturanFold", () => poly([[0.42, 2.8], [0.42, 2.42], [0.8, 2.42]]), 0.4, 0.02)} c={C.fold} />
        {[0.95, 0.74, 0.53, 0.32].map((y, i) => <M key={y} g={G.box(i === 3 ? 0.65 : 1.1, 0.08, 0.04, 0.03)} c={C.line} p={[i === 3 ? -0.22 : 0, y, 0.25]} />)}
        <M g={G.cyl(0.19, 0.19, 0.08)} c={C.seal} p={[0.42, 0.34, 0.27]} r={[Math.PI / 2, 0, 0]} />
        <Gr p={[0, 1.95, 0.27]}><Face expr={expr} t={t} sp={0.25} look={look} seed={2.6} /></Gr>
        <Gr p={[0, 1.34, 0.32]}>{[-1, 1].map((d) => <M key={d} g={G.cone(0.17, 0.34, 4)} c={C.navy} p={[d * 0.17, 0, 0]} r={[0, 0, d * Math.PI / 2]} s={[1, 1, 0.5]} />)}<M g={G.ball(0.09)} c={C.navyD} /></Gr>
        <M g={G.cyl(0.52, 0.62, 0.5, 28)} c={C.navy} p={[-0.08, 3.0, 0]} s={[1.05, 1, 0.5]} />
      </Gr>
      <Hose a={[-0.82, 2.0, 0.1]} c={[-1.3, 1.8, 0.2]} b={[-1.15, 1.15, 0.35]} w={0.078} color={C.navyD} /><M g={G.ball(0.12)} c={C.paper} p={[-1.15, 1.15, 0.35]} />
      <Hose a={[0.82, 2.05, 0.1]} c={[1.75, mix(1.6, 2.5, raise), 0.4]} b={h} w={0.078} color={C.navyD} />
      <Gr p={h}>
        <M g={G.ball(0.13)} c={C.paper} />
        <M g={G.ball(0.2)} c="#b87a4a" p={[0, 0.16, 0]} /><M g={G.cyl(0.1, 0.13, 0.42)} c="#8a5a36" p={[0, -0.18, 0]} />
        <M g={G.box(0.82, 0.24, 0.55, 0.08)} c="#3a3a44" p={[0, -0.47, 0]} /><M g={G.box(0.76, 0.09, 0.5, 0.03)} c={C.seal} p={[0, -0.62, 0]} />
      </Gr>
    </group>
  );
};

/* ------------------------------ warga (figuran) ------------------------------ */
const SHIRTS = ["#e2573d", "#2c8c86", "#f2b632", "#5b6fb5", "#8b6bb1", "#d96c8a", "#4f9a5f"];
const SKINS = ["#c98a5a", "#a86c43", "#e0a97a", "#8d5a38"];
export const Person: React.FC<{ t: number; seed: string; pose?: "stand" | "sit" | "wave" | "walk"; expr?: Expr; hot?: number; lite?: boolean }> = ({ t, seed, pose = "stand", expr = "neutral", hot = 0, lite }) => {
  const sh = SHIRTS[Math.floor(R(seed, 2) * SHIRTS.length)], sk = SKINS[Math.floor(R(seed, 3) * SKINS.length)], k = 0.85 + R(seed, 4) * 0.3, ph = t * 2 + R(seed, 5) * 6;
  const hijab = R(seed, 6) > 0.68, cap = !hijab && R(seed, 7) > 0.55, sit = pose === "sit";
  const bob = Math.sin(ph) * 0.025 + (pose === "walk" ? Math.abs(Math.sin(t * 8 + R(seed) * 5)) * 0.08 : 0);
  const base = sit ? 0.12 : 0.62;
  return (
    <group scale={k}>
      {!sit && !lite && [-0.18, 0.18].map((x) => <Rod key={x} a={[x, 0.7, 0]} b={[x, 0.05, 0]} w={0.09} c="#3d3550" />)}
      {sit && !lite && [-0.18, 0.18].map((x) => <Rod key={x} a={[x, 0.2, 0.1]} b={[x, 0.05, 0.7]} w={0.09} c="#3d3550" />)}
      <Gr p={[0, base + bob, 0]}>
        <M g={G.cyl(0.26, 0.44, 0.95, 18)} c={sh} p={[0, 0.48, 0]} /><M g={G.ball(0.27, 16)} c={sh} p={[0, 0.92, 0]} s={[1, 0.7, 1]} />
        <M g={G.ball(0.35, 20)} c={sk} p={[0, 1.38, 0]} />
        {hijab && <><M g={G.ball(0.4, 20)} c={SHIRTS[Math.floor(R(seed, 8) * SHIRTS.length)]} p={[0, 1.43, -0.09]} s={[1.05, 1.05, 0.95]} /></>}
        {!hijab && <M g={G.dome(0.37)} c={cap ? "#2f3b52" : "#2a1d1a"} p={[0, 1.45, -0.03]} />}
        {cap && <M g={G.box(0.42, 0.06, 0.3, 0.02)} c="#2f3b52" p={[0, 1.5, 0.32]} />}
        {!lite && <Gr p={[0, 1.34, 0.335]} s={0.62}><Face expr={expr} t={t} sp={0.2} seed={R(seed, 9) * 3} /></Gr>}
        {!lite && [-1, 1].map((d) => { const w = pose === "wave" && d === 1; const hand: V3 = w ? [0.65 + Math.sin(t * 9 + R(seed) * 6) * 0.14, 1.65, 0.15] : [d * 0.55, 0.18, 0.12]; return <group key={d}><Hose a={[d * 0.26, 0.82, 0]} c={[d * 0.65, w ? 0.85 : 0.55, 0.1]} b={hand} w={0.065} color={sh} n={4} /><M g={G.ball(0.09, 10)} c={sk} p={hand} /></group>; })}
        {hot > 0 && !lite && <M g={G.ball(0.07, 8)} c="#8fd3f5" p={[0.36, 1.55 - ((t * 0.8 + R(seed)) % 1) * 0.4, 0.2]} s={hot} />}
      </Gr>
    </group>
  );
};
