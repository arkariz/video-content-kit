// Adegan s01-s06 (disetujui kreator lewat preview 2026-11-26).
import React from "react";
import * as THREE from "three";
import { Easing } from "remotion";
import { R, clamp, keys, mix, pop, seg } from "@r3";
import { G, Gr, Hose, M, Pop, Rod, TextPlane, V3 } from "@r3/three";
import { Bag, CardGate, Chair, Coin, Crew, HangLamp, LAMP, NIGHT, Paper, Room, S, Stack, State, Store, TOP, Table, Tower, back, ease, s3 } from "./base";

/* ------------------------------ s01: tengah malam, tombol Buy ------------------------------ */
export const s01 = s3({
  sky: NIGHT, aperture: 3,
  cam: (a) => { const dl = a.w("The", 5), mo = a.w("money", 6.9); return {
    at: [keys(a.t, [0, a.w("Buy", 2.6), dl, mo, mo + 1], [-0.4, -0.2, 0, 2.4, 2.7]), keys(a.t, [0, dl, mo + 1], [3.2, 3.6, 2.4]), 0],
    d: keys(a.t, [0, a.w("Buy", 2.6), dl, mo, mo + 1], [17, 18, 19, 15.5, 13]), yaw: keys(a.t, [0, dl, mo + 1], [-20, -7, 8]), pitch: keys(a.t, [0, dl, mo + 1], [14, 10, 13]),
  }; },
  items: (a) => {
    const buy = a.w("Buy", 2.6), mo = a.w("money", 6.9);
    const press = seg(a.t, buy - 0.2, buy) * (1 - seg(a.t, buy + 0.12, buy + 0.4));
    const prog = seg(a.t, buy + 0.25, buy + 5.4, Easing.out(Easing.quad));
    const still = a.t > mo ? mo : a.t;
    return <>
      <Room t={still} floor="#2c2154" bokeh={["#5a6ae0", "#9a6ad8", "#4fb8d8"]} rug="#46316e" />
      {/* TV dan rak */}
      <S g={G.box(9.4, 5.4, 0.5, 0.35)} c="#1c1830" p={[0, 4.9, -4.4]} />
      <S g={G.box(8.8, 4.8, 0.2, 0.25)} c={prog > 0 ? "#2a4fae" : "#27306a"} glow={0.45 + press * 0.5} p={[0, 4.9, -4.1]} />
      <S g={G.box(6.6, 0.55, 0.12, 0.26)} c="#151a40" p={[0, 4.1, -3.95]} />
      {prog > 0.02 && <S g={G.box(1, 0.4, 0.12, 0.05)} c="#7ff0d8" glow={0.8} p={[-3.2 + 3.2 * prog, 4.1, -3.86]} s={[6.4 * prog, 1, 1]} />}
      {/* panah unduh */}
      <Gr p={[0, 5.95 - ((still * 0.9) % 1) * 0.35, -3.85]} s={pop(a.t, buy + 0.2, 0.35)}><Rod a={[0, 0.55, 0]} b={[0, -0.1, 0]} w={0.14} c="#cfe6ff" /><S g={G.cone(0.42, 0.55, 28)} c="#cfe6ff" glow={0.5} p={[0, -0.35, 0]} r={[Math.PI, 0, 0]} /></Gr>
      <S g={G.box(11.5, 1.1, 1.8, 0.35)} c="#5a3d78" p={[0, 0.75, -4]} />
      {/* console generik */}
      <S g={G.box(2.4, 0.65, 1.3, 0.3)} c="#e6e0f4" p={[3.4, 1.65, -3.6]} /><S g={G.box(1.3, 0.1, 0.1, 0.04)} c="#7ff0d8" glow={press + prog > 0 ? 0.9 : 0.1} p={[3.4, 1.65, -2.93]} />
      {/* jam 12:00 di dinding */}
      <Gr p={[-6.0, 5.8, -4]}><S g={G.cyl(1.35, 1.35, 0.4, 56)} c="#8a6ac0" r={[Math.PI / 2, 0, 0]} /><S g={G.cyl(1.12, 1.12, 0.46, 56)} c="#fff6e4" glow={0.3} r={[Math.PI / 2, 0, 0]} />
        <Rod a={[0, 0, 0.3]} b={[0, 0.85, 0.3]} w={0.07} c="#2a1c40" /><Rod a={[0, 0, 0.32]} b={[0, 0.55, 0.32]} w={0.11} c="#e2573d" /><S g={G.ball(0.13)} c="#2a1c40" p={[0, 0, 0.34]} />
        {Array.from({ length: 12 }, (_, i) => <S key={i} g={G.ball(0.055, 8)} c="#6a4a8a" p={[Math.sin((i * Math.PI) / 6) * 0.92, Math.cos((i * Math.PI) / 6) * 0.92, 0.26]} />)}</Gr>
      {/* aliran titik data ke console */}
      {a.t > buy + 0.2 && Array.from({ length: 26 }, (_, i) => { const q = (still * 0.75 + i / 26) % 1; return <S key={i} g={G.ball(0.1, 10)} c="#7ff0d8" glow={1} cast={false} p={[mix(8.5, 3.4, q), mix(7.2, 1.75, q) + Math.sin(q * Math.PI) * 1.6, mix(-1, -3.2, q)]} s={Math.sin(q * Math.PI) * 1.2} />; })}
      {/* kontroler generik dan ibu jari */}
      <Gr p={[-2.2, 2.05 - press * 0.08, 3.6]} r={[0.5, 0.2 + Math.sin(still * 1.2) * 0.03, 0]} s={0.82}>
        <S g={G.box(3.6, 0.7, 1.7, 0.34)} c="#8f86c8" />
        {[-1.65, 1.65].map((x) => <S key={x} g={G.ball(1, 28)} c="#8f86c8" p={[x, -0.15, 0.35]} s={[0.78, 0.55, 1.15]} r={[0, x * 0.16, 0]} />)}
        <S g={G.cyl(0.34, 0.4, 0.3, 24)} c="#3a2f66" p={[-0.95, 0.48, 0]} />
        <S g={G.cyl(0.3, 0.3, 0.24 - press * 0.12, 28)} c="#ff7a63" glow={0.2 + press} p={[0.95, 0.42, 0.1]} />
        {[[1.6, -0.35], [0.35, -0.3]].map(([x, z]) => <S key={x} g={G.cyl(0.17, 0.17, 0.14, 20)} c="#cfc6ee" p={[x, 0.4, z]} />)}
        {/* tangan: lengan sweater + ibu jari */}
        <Hose a={[3.9, -1.6, 2.4]} c={[3.4, 0.2, 2.0]} b={[2.3, 0.1, 1.1]} w={0.55} color="#e2715a" n={14} />
        <S g={G.ball(0.72, 28)} c="#d99a78" p={[2.15, 0.15, 0.95]} />
        <Hose a={[2.0, 0.5, 0.85]} c={[1.7, 1.45 - press * 0.4, 0.5]} b={[1.0, 0.92 - press * 0.34, 0.12]} w={0.27} color="#d99a78" n={14} />
      </Gr>
      {/* meja kopi dan kantong koin yang diam */}
      <S g={G.cyl(1.9, 1.9, 0.28, 60)} c="#a8644e" p={[3.7, 1.15, 1.6]} /><S g={G.cyl(0.35, 0.6, 1.1, 24)} c="#7a423e" p={[3.7, 0.55, 1.6]} />
      <Pop t={a.t} at={mo - 0.25} p={[3.7, 1.28, 1.6]} s={0.68}><Bag t={still} p={[0, 0, 0]} e="wait" /></Pop>
      {a.t > mo && <><S g={G.torus(1.35, 0.06)} c="#ffd766" glow={0.9} p={[3.7, 1.33, 1.6]} r={[Math.PI / 2, 0, 0]} s={0.7 + seg(a.t, mo, mo + 0.5, back) * 0.35} cast={false} /></>}
    </>;
  },
  labels: [["$79.99", [-1.5, 3.5, 3.4], "down", "#e2573d"], ["DOWNLOADING", [0, 3.7, -3.8], "up", "#13966a"]],
});

/* ------------------------------ s02: dunia menyala, menara dengan piala ------------------------------ */
const GLOBE = 6;
const sphere = (lat: number, lon: number, r: number): V3 => [r * Math.cos(lat) * Math.sin(lon), r * Math.sin(lat), r * Math.cos(lat) * Math.cos(lon)];
export const s02a = s3({
  sky: NIGHT, aperture: 1.4, vd: 1.9,
  cam: (a) => ({ at: [0, 6, 0], d: keys(a.t, [0, 2.2, a.dur], [8.5, 23, 25]), yaw: mix(-8, 8, seg(a.t, 0, a.dur)), pitch: 6 }),
  items: (a) => { const bil = a.w("billion", 3.6), n = seg(a.t, 0.2, bil + 0.4, Easing.inOut(Easing.quad)); return <>
    {Array.from({ length: 110 }, (_, i) => <S key={"st" + i} g={G.ball(0.08, 6)} c="#dfe6ff" glow={1} o={0.7} cast={false} p={[(R(i, 31) - 0.5) * 80, R(i, 32) * 34 - 8, -26 - R(i, 33) * 10]} s={0.5 + R(i, 34) * (1 + Math.sin(a.t * 2 + i) * 0.3)} />)}
    <Gr p={[0, 6, 0]} r={[0.12, -0.5 + a.t * 0.07, 0]}>
      <S g={G.ball(GLOBE, 64)} c="#2c4a92" glow={0.12} />
      {Array.from({ length: 70 }, (_, i) => { const cl = i % 7, lat = (R(cl, 41) - 0.5) * 1.8 + (R(i, 42) - 0.5) * 0.5, lon = (cl / 7) * Math.PI * 2 + (R(i, 43) - 0.5) * 0.7; return <Gr key={"l" + i} p={sphere(lat, lon, GLOBE - 0.32)}><S g={G.ball(1, 18)} c="#3f7a9e" s={0.5 + R(i, 44) * 0.42} cast={false} /></Gr>; })}
      {Array.from({ length: 420 }, (_, i) => { const lat = Math.asin(R(i, 51) * 1.7 - 0.85), lon = R(i, 52) * Math.PI * 2, order = R(i, 53); if (order > n) return null; const k = clamp((n - order) * 14); return <S key={i} g={G.ball(1, 8)} c={i % 4 ? "#ffd766" : "#7ff0d8"} glow={1} cast={false} p={sphere(lat, lon, GLOBE + 0.32)} s={(0.075 + R(i, 54) * 0.06) * (1 + (1 - k) * 2)} />; })}
    </Gr>
    <Pop t={a.t} at={bil} p={[0, 6.2, 8.2]}><TextPlane text="$3.79B" h={2.2} color="#ffffff" bg="#e2573d" /></Pop>
    {Array.from({ length: 24 }, (_, i) => { const q = seg(a.t, bil - 0.4 + i * 0.05, bil + 0.8 + i * 0.05); return q <= 0 || q >= 1 ? null : <Coin key={i} p={[mix((R(i, 61) - 0.5) * 16, 0, q), mix(2 + R(i, 62) * 9, 6.2, q), mix(7, 8, q)]} r={[1.2, q * 7, 0]} s={0.7 * Math.sin(q * Math.PI)} />; })}
  </>; },
});
export const s02b = s3({
  sky: LAMP,
  cam: (a) => { const rs = a.w("Rockstar", 1.8), big = a.w("biggest", 3.1); return { at: [keys(a.t, [0, rs, big, a.dur], [-1.4, 1.2, 0, 0]), 4.6, 0], d: keys(a.t, [0, rs, big, a.dur], [17, 18, 20, 19]), yaw: mix(-18, 12, seg(a.t, 0, a.dur)), pitch: 9 }; },
  items: (a) => { const big = a.w("biggest", 3.1); return <>
    <Room t={a.t} floor="#6a3f62" bokeh={["#ffb468", "#ff7a9a", "#b48ae8"]} />
    {[-11, -7.6, 7.8, 11.4, 0.8].map((x, i) => <Tower key={i} t={a.t + i} p={[x, -0.6, -11 - (i % 2) * 3]} h={3.2 + (i % 3) * 1.3} s={0.85} e="wait" />)}
    <Tower t={a.t} p={[-2.6, -0.6, 0]} h={6.2} s={1.05} e="happy" trophy />
    <Pop t={a.t} at={a.w("owns", 1.5) - 0.2} p={[3.6, -0.5, 0.8]}><Tower t={a.t} p={[0, 0, 0]} h={3.8} s={0.95} e="happy" trophy /></Pop>
    <Hose a={[-0.9, 2.4, 0.6]} c={[0.6, 1.2, 2.4]} b={[2.3, 2.0, 1.4]} w={0.16} color="#ffd766" upto={seg(a.t, a.w("owns", 1.5), a.w("owns", 1.5) + 0.5)} n={16} />
    {a.t > big && Array.from({ length: 70 }, (_, i) => { const u = a.t - big; return <S key={i} g={G.box(0.22, 0.13, 0.05, 0.05)} c={["#ff7a63", "#ffd766", "#46cfa8", "#fff6ea"][i % 4]} p={[(R(i, 4) - 0.5) * 18, 12 - ((u * (2 + R(i, 3) * 2) + R(i, 2) * 5) % 12), (R(i, 5) - 0.4) * 8]} r={[u * 4 * R(i, 6) + i, u * 3 + i, i]} s={clamp(u * 3 - R(i, 7))} cast={false} />; })}
  </>; },
  labels: [["TAKE-TWO", [-2.6, 8.9, 0], "down", "#a8503c"], ["ROCKSTAR", [3.6, 6.2, 0.8], "down", "#7a4a8e"]],
});

/* ------------------------------ s03: angka retak, 56 koin tertahan ------------------------------ */
const CRACKS: V3[][] = [[[0.2, 0, 0], [-1.1, 0.5, 0], [-1.7, 1.2, 0], [-3.1, 1.75, 0]], [[0.2, 0, 0], [1.3, -0.3, 0], [2.0, -1.1, 0], [3.6, -1.7, 0]], [[0.2, 0, 0], [0.7, 0.9, 0], [1.9, 1.15, 0], [2.4, 1.85, 0]], [[0.2, 0, 0], [-0.6, -0.8, 0], [-2.1, -1.0, 0], [-2.8, -1.8, 0]]];
export const s03a = s3({
  sky: NIGHT,
  cam: (a) => ({ at: [0, 5, 0], d: mix(19, 15.5, seg(a.t, 0, a.dur)), yaw: mix(14, -4, seg(a.t, 0, a.dur)), pitch: 7 }),
  items: (a) => { const sk = a.w("skip", 1.7), k = seg(a.t, sk - 0.5, sk + 0.1); return <>
    <Room t={a.t} floor="#2a2358" bokeh={["#5a6ae0", "#e2677a", "#4fb8d8"]} />
    <Gr p={[Math.sin(a.t * 34) * 0.12 * seg(a.t, sk - 0.5, sk - 0.4) * (1 - seg(a.t, sk - 0.2, sk + 0.1)), 5, 0]} r={[0, 0, -0.03 * k]}>
      <S g={G.box(10.4, 4.6, 0.7, 0.6)} c={k > 0.6 ? "#8a8498" : "#e2573d"} glow={0.18 - k * 0.1} />
      <TextPlane text="$3.79B" h={3.1} color="#ffffff" p={[0, 0, 0.42]} opacity={1 - k * 0.35} />
      {CRACKS.map((path, i) => path.slice(1).map((b, j) => { const u = clamp(k * 3 - j); const p0 = path[j]; return u <= 0.02 ? null : <Rod key={`${i}${j}`} a={[p0[0], p0[1], 0.5]} b={[mix(p0[0], b[0], u), mix(p0[1], b[1], u), 0.5]} w={0.075 - j * 0.017} c="#1c1430" />; }))}
    </Gr>
  </>; },
});
/** Posisi koin ke-i: grid 10x8 di meja. */
const grid = (i: number): V3 => [-4.1 + (i % 10) * 0.62, TOP + 0.09, -2.0 + Math.floor(i / 10) * 0.6];
export const s03b = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => { const nt = a.w("And", 3.2); return { at: [keys(a.t, [0, 2.2, nt, nt + 1.4], [-0.6, 1.4, 1.6, 1.0]), keys(a.t, [0, nt, nt + 1.4], [3.0, 3.4, 5.0]), 0], d: keys(a.t, [0, nt, nt + 1.4], [17.5, 19, 19.5]), yaw: mix(-12, 10, seg(a.t, 0, a.dur)), pitch: keys(a.t, [0, nt, nt + 1.4], [36, 28, 12]) }; },
  items: (a) => {
    const fs = a.w("fifty-six", 2.7), nt = a.w("And", 3.2), cold = seg(a.t, nt, nt + 0.8);
    const go = (i: number) => seg(a.t, fs - 1.5 + (i / 56) * 1.5, fs - 0.7 + (i / 56) * 1.5, ease);
    const moved = Array.from({ length: 56 }, (_, i) => go(i)).filter((v) => v > 0.5).length;
    return <>
      <Room t={a.t} floor={cold > 0.5 ? "#2f3a5e" : "#5a3354"} bokeh={cold > 0.5 ? ["#8fd0ff", "#b8c8ff"] : ["#ffb468", "#ff8a7a"]} />
      <Table r={5.4} />
      {Array.from({ length: 80 }, (_, i) => {
        const from = grid(i);
        if (i >= 56) return <Coin key={i} p={from} s={0.7 * pop(a.t, 0.05 + i * 0.004, 0.3)} />;
        const k = go(i), col = i % 8, row = Math.floor(i / 8), rise = seg(a.t, nt, nt + 1.1);
        // sebelum "And": berbaris di depan menara; sesudahnya: naik menjadi dinding 8 x 7 yang menggantung
        const near: V3 = [1.5 + col * 0.52, TOP + 0.09, -1.9 + row * 0.55], air: V3 = [-0.6 + col * 0.74, 3.7 + row * 0.66, 0.2];
        const wob = Math.sin(a.t * 2.2 + col * 0.8 + row * 0.5) * 0.07 * rise;
        const u = seg(a.t, nt + (row + col) * 0.02, nt + 0.8 + (row + col) * 0.02, back);
        const to: V3 = [mix(near[0], air[0], u), mix(near[1], air[1], u) + wob, mix(near[2], air[2], u)];
        return <Coin key={i} s={0.62 * pop(a.t, 0.05 + i * 0.004, 0.3) * (1 + 0.12 * u)} glow={0.14 + 0.08 * cold} c={cold > 0.5 ? "#d9b04a" : "#f4ad22"} hi={cold > 0.5 ? "#f6dc8c" : "#ffd766"}
          p={[mix(from[0], to[0], k), mix(from[1], to[1], k) + Math.sin(k * Math.PI) * 1.5, mix(from[2], to[2], k)]} r={[u * Math.PI / 2, 0, 0]} />;
      })}
      <Tower t={a.t} p={[7.2, -0.3, -1.4]} h={5} s={0.95} ry={-0.45} e={a.t > nt ? "wait" : "happy"} />
      {a.t < nt && <TextPlane text={String(moved)} h={1.8} color="#ffffff" bg="#a8503c" p={[2.9, 6.1, 0]} />}
      <Pop t={a.t} at={nt + 0.25} p={[-3.4, 6.3, -0.5]} s={0.85}>
        <S g={G.cyl(1.35, 1.35, 0.4, 56)} c="#6f98c8" r={[Math.PI / 2, 0, 0]} /><S g={G.cyl(1.12, 1.12, 0.46, 56)} c="#f2faff" glow={0.3} r={[Math.PI / 2, 0, 0]} />
        <Gr r={[0, 0, -a.t * 5]}><Rod a={[0, 0, 0.32]} b={[0, 0.85, 0.32]} w={0.08} c="#26305a" /></Gr><Gr r={[0, 0, -a.t * 0.8]}><Rod a={[0, 0, 0.34]} b={[0, 0.55, 0.34]} w={0.12} c="#e2573d" /></Gr><S g={G.ball(0.14)} c="#26305a" p={[0, 0, 0.36]} />
      </Pop>
    </>;
  },
  labels: [["$56", [6.2, 5.9, 0], "down", "#e2573d"], ["NOT YET", [-3.4, 4.7, -0.5], "up", "#2f66b8"]],
}, [960, 560]);

/* ------------------------------ s04: empat tangan, jam koin ------------------------------ */
const SLEEVES = ["#6c74c9", "#4f8fe0", "#2fa98c", "#e89a4e"];
export const s04 = s3({
  sky: LAMP, aperture: 1.8,
  cam: (a) => { const sw = a.w("This", 3); return { at: [0, keys(a.t, [0, sw, sw + 1.6], [2.8, 3.0, 5.0]), 0], d: keys(a.t, [0, sw, sw + 1.6], [17.5, 15, 19]), yaw: mix(-22, 16, seg(a.t, 0, a.dur)), pitch: keys(a.t, [0, sw, sw + 1.6], [40, 34, 15]) }; },
  items: (a) => {
    const touch = a.w("touch", 0.8), sw = a.w("This", 3), cl = a.w("clock", 5.2);
    return <>
      <Room t={a.t} floor="#5a3354" bokeh={["#ffb468", "#ff8a7a", "#b48ae8"]} />
      <Table r={5} />
      <Bag t={a.t} p={[0, TOP, 0]} s={1.05} e={a.t > touch ? "nervous" : "calm"} />
      {[[-1, 0.55], [-0.75, -0.8], [0.75, -0.8], [1, 0.55]].map(([dx, dz], i) => {
        const k = seg(a.t, 0.1 + i * 0.28, 0.1 + i * 0.28 + 0.9, back) * (1 - 0.35 * seg(a.t, sw, sw + 0.8));
        const start: V3 = [dx * 10, TOP + 2.4, dz * 8], end: V3 = [dx * 1.85, TOP + 0.9 + Math.sin(a.t * 2.4 + i) * 0.1, dz * 1.7];
        const tip: V3 = [mix(start[0], end[0], k), mix(start[1], end[1], k), mix(start[2], end[2], k)];
        const a0: V3 = [dx * 11, TOP + 2.8, dz * 9];
        const dir = new THREE.Vector3(-tip[0], 0, -tip[2]).normalize();
        return <group key={i}>
          <Hose a={a0} c={[(a0[0] + tip[0]) / 2, TOP + 3.0, (a0[2] + tip[2]) / 2]} b={tip} w={0.48} color={SLEEVES[i]} n={20} />
          <S g={G.ball(0.58, 24)} c={["#e8b090", "#b9785a", "#f2c4a4", "#8f5a44"][i]} p={[tip[0] + dir.x * 0.3, tip[1], tip[2] + dir.z * 0.3]} />
          {[-1, 0, 1].map((f) => <Hose key={f} a={[tip[0] + dir.x * 0.5 - dir.z * f * 0.34, tip[1], tip[2] + dir.z * 0.5 + dir.x * f * 0.34]} c={[tip[0] + dir.x * 1.0 - dir.z * f * 0.4, tip[1] + 0.1, tip[2] + dir.z * 1.0 + dir.x * f * 0.4]} b={[tip[0] + dir.x * 1.15 - dir.z * f * 0.34, tip[1] - 0.35, tip[2] + dir.z * 1.15 + dir.x * f * 0.34]} w={0.15} color={["#e8b090", "#b9785a", "#f2c4a4", "#8f5a44"][i]} n={8} />)}
        </group>;
      })}
      {/* jam besar dengan jarum dari koin */}
      <Pop t={a.t} at={sw + 0.3} p={[0, 7.5, -3.2]}>
        <S g={G.cyl(2.5, 2.5, 0.55, 64)} c="#a8644e" r={[Math.PI / 2, 0, 0]} /><S g={G.cyl(2.15, 2.15, 0.64, 64)} c="#fff6e4" glow={0.18 + (a.t > cl ? 0.2 : 0)} r={[Math.PI / 2, 0, 0]} />
        <S g={G.torus(2.32, 0.2)} c="#ffcf3f" glow={0.25} p={[0, 0, 0.3]} />
        <Gr r={[0, 0, -a.t * 1.9]}>{[1, 2, 3].map((i) => <Coin key={i} p={[0, i * 0.52, 0.5]} r={[Math.PI / 2, 0, 0]} s={0.62} />)}</Gr>
        <Gr r={[0, 0, -a.t * 0.42]}>{[1, 2].map((i) => <Coin key={i} p={[0, i * 0.56, 0.42]} r={[Math.PI / 2, 0, 0]} s={0.75} c="#e2573d" hi="#ff9a80" />)}</Gr>
        <S g={G.ball(0.24)} c="#2a1c40" p={[0, 0, 0.6]} />
      </Pop>
    </>;
  },
  labels: [["WHEN?", [4.2, 6.6, -2.2], "left", "#e2573d"]],
});

/* ------------------------------ s05: kantong jatuh, kru, lalu empat pemain ------------------------------ */
export const s05a = s3({
  sky: LAMP, aperture: 1.8,
  cam: (a) => ({ at: [0, keys(a.t, [0, 1.6, a.dur], [4.4, 3.2, 2.8]), 0], d: keys(a.t, [0, 1.8, a.dur], [19, 15.5, 14.5]), yaw: mix(18, -12, seg(a.t, 0, a.dur)), pitch: keys(a.t, [0, 1.6, a.dur], [16, 28, 34]) }),
  items: (a) => {
    const bag = a.w("bag", 1.7), coins = a.w("eighty", 2.1);
    const fall = seg(a.t, bag - 0.9, bag - 0.25, Easing.in(Easing.quad));
    const squash = Math.sin(seg(a.t, bag - 0.25, bag + 0.35, Easing.linear) * Math.PI * 2) * (1 - seg(a.t, bag - 0.25, bag + 0.35)) * 0.9;
    return <>
      <Room t={a.t} floor="#5a3354" bokeh={["#ffb468", "#ff8a7a", "#b48ae8"]} />
      <HangLamp t={a.t} p={[0, 9.2, -1]} />
      <Table r={5.4} />
      <Bag t={a.t} p={[-2.9, TOP + (1 - fall) * 9, -0.9]} s={1.1} squash={squash} e="nervous" />
      {Array.from({ length: 80 }, (_, i) => {
        const t0 = coins - 0.35 + (i / 80) * 1.5, k = seg(a.t, t0, t0 + 0.55, ease); if (a.t < t0) return null;
        const to: V3 = [-0.4 + (i % 10) * 0.52, TOP + 0.09, -1.7 + Math.floor(i / 10) * 0.52];
        return <Coin key={i} s={0.6} p={[mix(-2.9, to[0], k), mix(TOP + 2.8, to[1], k) + Math.sin(k * Math.PI) * 1.2, mix(-0.9, to[2], k)]} r={[(1 - k) * 5, 0, (1 - k) * 3]} />;
      })}
    </>;
  },
  labels: [["80 COINS", [2.0, 3.4, -1.9], "down", "#a8503c"]],
}, [960, 600]);
const CREW: V3[] = [[-6.0, 0, -2.2], [-2.3, 0, -4.6], [2.3, 0, -4.6], [6.0, 0, -2.2]];
export const s05b = s3({
  sky: LAMP, aperture: 1.5, vd: 2.1,
  cam: (a) => ({ at: [0, 3.5, -1], d: keys(a.t, [0, a.dur], [21, 18.5]), yaw: mix(-18, 16, seg(a.t, 0, a.dur)), pitch: 19 }),
  items: (a) => {
    const you = a.w("Your", 4.2), sw = (i: number) => seg(a.t, you - 0.15 + i * 0.22, you + 0.35 + i * 0.22);
    const makers = [
      <State key="a" t={a.t} p={[0, 0, 0]} s={0.82} />, <Store key="b" t={a.t} p={[0, 0, 0]} s={0.82} />,
      <CardGate key="c" t={a.t} p={[0, 0, 0]} s={0.82} />, <Tower key="d" t={a.t} p={[0, -0.2, 0]} s={0.78} h={4.6} />,
    ];
    return <>
      <Room t={a.t} floor="#5a3354" bokeh={["#ffb468", "#ff8a7a", "#b48ae8"]} rug="#6f3f66" />
      <HangLamp t={a.t} p={[0, 9.8, -1]} />
      <Table r={4.6} />
      {CREW.map((p, i) => <group key={i}>
        {sw(i) < 0.5 ? <Gr p={p} s={1 - sw(i) * 2}><Crew t={a.t} p={[0, 0, 0]} c={["#7a5ac0", "#c9586a", "#3f7cac", "#c98a3f"][i]} hat={i} seed={i * 2} /></Gr>
          : <Gr p={p} s={back((sw(i) - 0.5) * 2)} r={[0, -p[0] * 0.05, 0]}>{makers[i]}</Gr>}
        {a.t > you - 0.15 + i * 0.22 && Array.from({ length: 10 }, (_, j) => { const q = seg(a.t, you - 0.15 + i * 0.22 + j * 0.06, you + 0.55 + i * 0.22 + j * 0.06); return q <= 0 || q >= 1 ? null : <S key={j} g={G.ball(0.2, 10)} c="#fff2d8" glow={0.8} o={1 - q} cast={false} p={[p[0] + Math.cos(j * 2.1) * q * 2.6, 3.4 + Math.sin(j * 1.7) * q * 2.6, p[2] + 0.8]} />; })}
        <Pop t={a.t} at={you + 0.8 + i * 0.2} p={[p[0] * 0.6 + 0.9, TOP, p[2] * 0.4 + 0.2]}><Paper p={[0, 0, 0]} n={5 + i} /></Pop>
      </group>)}
      {/* tumpukan koin digeser antar kursi */}
      {[0, 1, 2, 3].map((i) => { const q = (a.t * 0.35 + i / 4) % 1, ang = q * Math.PI * 2; return <Stack key={i} n={3 + i} p={[Math.cos(ang) * 2.5, TOP, Math.sin(ang) * 1.9]} s={0.9 * pop(a.t, 0.3 + i * 0.15, 0.3)} />; })}
    </>;
  },
  bubble: (a) => { const at = a.w("paperwork", 6) - 0.1; return { at: [3.4, 6.2, -4], p: pop(a.t, at, 0.25) }; },
});

/* ------------------------------ s06: empat kursi, empat pemain ------------------------------ */
const SEATS: V3[] = [[-6.6, 0, -1.6], [-2.4, 0, -4.8], [2.4, 0, -4.8], [7.0, 0, -2.4]];
export const s06 = s3({
  sky: LAMP, aperture: 2.2, vd: 1.45,
  cam: (a) => {
    const ks = [0, a.w("The", 1.9), a.w("console", 4.5) - 0.2, a.w("card", 6.9) - 0.2, a.w("publisher", 9.1) - 0.3, a.dur];
    return { at: [keys(a.t, ks, [0, -3.0, -1.6, 0.4, 1.0, 0.2]), keys(a.t, ks, [3.1, 3.7, 3.7, 3.7, 3.5, 3.4]), -1.5], d: keys(a.t, ks, [24, 19.5, 19.5, 20, 22.5, 23.5]), yaw: keys(a.t, ks, [-6, 10, 4, -4, -12, -3]), pitch: keys(a.t, ks, [22, 14, 14, 14, 15, 19]) };
  },
  items: (a) => {
    const sit = [a.w("state", 2.1), a.w("console", 4.5), a.w("card", 6.9), a.w("publisher", 9.1)];
    const lit = (i: number) => Math.max(seg(a.t, 0.15 + i * 0.36, 0.4 + i * 0.36), 0);
    const tax = seg(a.t, a.w("tax", 3.1) - 0.2, a.w("tax", 3.1) + 0.6, ease);
    const makers = [
      <State key="a" t={a.t} p={[0, 0, 0]} s={0.82} reach={Math.sin(tax * Math.PI)} />, <Store key="b" t={a.t} p={[0, 0, 0]} s={0.82} />,
      <CardGate key="c" t={a.t} p={[0, 0, 0]} s={0.82} />, <Tower key="d" t={a.t} p={[0, -0.2, 0]} s={0.76} h={4.4} />,
    ];
    return <>
      <Room t={a.t} floor="#5a3354" bokeh={["#ffb468", "#ff8a7a", "#b48ae8"]} rug="#6f3f66" />
      <Table r={4.6} />
      <Stack n={9} p={[-0.5, TOP, -0.2]} /><Stack n={7} p={[0.45, TOP, 0.2]} /><Stack n={5} p={[0, TOP, 0.9]} />
      {a.t > a.w("tax", 3.1) - 0.2 && <Stack n={3} p={[mix(-5.2, -1.5, tax), TOP + Math.sin(tax * Math.PI) * 1.4, mix(0, 0.4, tax)]} />}
      {SEATS.map((p, i) => <group key={i}>
        <Gr p={p} r={[0, -p[0] * 0.05, 0]}><Chair p={[0, 0, -0.2]} lit={lit(i)} />
          {a.t > sit[i] - 0.15 && <Gr p={[0, (1 - seg(a.t, sit[i] - 0.15, sit[i] + 0.3, Easing.in(Easing.quad))) * 7, 0.2]} s={1}>{makers[i]}</Gr>}
        </Gr>
        <HangLamp t={a.t} p={[p[0], i === 3 ? 10.2 : 9.4, p[2] + 0.4]} s={i === 3 ? 0.55 : 0.8} on={lit(i)} />
      </group>)}
    </>;
  },
  labels: [
    ["STATE", [-6.6, 6.4, -1.6], "down", "#6c74c9"], ["+TAX", [-3.4, 3.5, 0.4], "down", "#a8503c"],
    ["CONSOLE STORE", [-2.4, 6.9, -4.4], "down", "#2f66b8"], ["CARD SYSTEM", [2.4, 5.6, -4.4], "down", "#13966a"], ["PUBLISHER", [7.0, 6.2, -2.4], "down", "#c9742f"],
  ],
});

