// Komponen adegan T02 siklus 001, gaya R3 3D berkedalaman (ditulis tangan, 2026-11-26). Sumber tunggal gambar shot.
// Lapisan 3D: produksi/remotion/src/r3/three. Satu s3({...}) per shot, urut sama dengan `shots` di 03-script.json.
// Koordinat dunia: x kanan, y atas (tanah 0), z ke arah kamera. Bidang utama terlihat kira-kira x -10..10, y 0..8.
import React from "react";
import { defineShots } from "@r3";
import {
  A, Arrow, BallGrid, Bar, Bolt, Cake, CamSpec, CarGrid, Check, Clock, Closet, Coins, Confetti, Cross, Doc, Env, Factory, G, Gauge, Gr, House, Lb, M, MapWorld, Palm,
  Parliament, Pin3, Pop, Rails, Ribbon, Rod, Route3, RouteSpec, Shirt, Ship, Skyline, Spec, T02, Timeline, Train, V3, Wall, s3, timeX, w,
} from "@r3/three";
import { keys, mix, seg } from "../../../../../produksi/remotion/src/r3/kit";

const { Komo, Sepuh, Aturan, Person } = T02;
type KP = React.ComponentProps<typeof Komo>; type SP = React.ComponentProps<typeof Sepuh>; type AP = React.ComponentProps<typeof Aturan>;
type Place = { p: V3; s?: number; ry?: number; at?: number; out?: number };
const K = ({ a, p, s = 1.4, ry = 0, at, out, ...r }: Place & { a: A } & Omit<KP, "t">) => <Pop t={a.t} at={at} out={out} p={p} s={s}><Gr r={[0, ry, 0]}><Komo t={a.t} {...r} /></Gr></Pop>;
const S = ({ a, p, s = 1.15, ry = 0, at, out, ...r }: Place & { a: A } & Omit<SP, "t">) => <Pop t={a.t} at={at} out={out} p={p} s={s}><Gr r={[0, ry, 0]}><Sepuh t={a.t} {...r} /></Gr></Pop>;
/** Pak Aturan; hit = detik stempel menghantam. */
const R_ = ({ a, p, s = 1.2, ry = 0, at, out, hit, ...r }: Place & { a: A; hit?: number } & Omit<AP, "t">) => (
  <Pop t={a.t} at={at} out={out} p={p} s={s}><Gr r={[0, ry, 0]}><Aturan t={a.t} {...r} raise={hit === undefined ? r.raise : seg(a.t, hit - 0.55, hit - 0.15) * (1 - seg(a.t, hit - 0.02, hit))} slam={hit === undefined ? r.slam : seg(a.t, hit - 0.02, hit + 0.14)} /></Gr></Pop>
);
/** Kerumunan berlapis: baris di kedalaman berbeda. */
const Crowd = ({ a, p, n, cols = 6, gap = [1.25, 1.2], s = 1, seed = "c", at = 0.1, step = 0.07, pose, expr, hot }: { a: A; p: V3; n: number; cols?: number; gap?: [number, number]; s?: number; seed?: string; at?: number; step?: number; pose?: "stand" | "wave" | "sit" | "walk"; expr?: T02.Expr; hot?: number }) => (
  <>{Array.from({ length: n }, (_, i) => { const r = Math.floor(i / cols), x = p[0] + ((i % cols) - (cols - 1) / 2) * gap[0] + (r % 2) * gap[0] * 0.5 + ((i * 37) % 7) * 0.05, z = p[2] - r * gap[1] + ((i * 53) % 5) * 0.09;
    return <Pop key={i} t={a.t} at={at + i * step} p={[x, p[1], z]} s={s}><Gr r={[0, Math.sin(i * 7) * 0.45, 0]}><Person t={a.t} seed={seed + i} pose={pose} expr={expr ?? (i % 3 === 0 ? "tired" : "neutral")} hot={hot} /></Gr></Pop>; })}</>
);
/** Penumpang bergelantungan di pintu terbuka (koordinat gerbong). */
const doorRiders = (a: A, seed: string) => (car: number) => <>{[2.15, 6.45].map((x, k) => <group key={x}>
  <Gr p={[x - 0.28, 0.95, 1.32]} r={[0, 0, 0.1 + Math.sin(a.t * 3 + k + car) * 0.04]} s={0.95}><Person t={a.t} seed={`${seed}${car}${k}a`} /></Gr>
  <Gr p={[x + 0.36, 1.05, 1.62]} r={[0, 0.2, -0.28 + Math.sin(a.t * 3.6 + k * 2) * 0.07]} s={0.9}><Person t={a.t} seed={`${seed}${car}${k}b`} pose="wave" expr="shock" /></Gr></group>)}</>;
const roofRiders = (a: A) => (car: number) => <>{Array.from({ length: 6 }, (_, i) => <Gr key={i} p={[0.8 + i * 1.38, 3.68, 0.35 + (i % 2) * 0.3]} r={[0, 0, Math.sin(a.t * 4 + i + car) * 0.07]} s={0.8}><Person t={a.t} seed={`roof${car}${i}`} pose="sit" expr={i % 3 ? "neutral" : "happy"} /></Gr>)}</>;

/* ------------------------------ peta ------------------------------ */
const ID_ROUTE = { from: "tokyo", c: [1250, 740], to: "jakarta" } as const;
const TJ: RouteSpec = { ...ID_ROUTE, c: [1250, 740] };
const CJ: RouteSpec = { from: "china", c: [300, 700], to: "jakarta", color: "#ffd23f", lv: "cn" };
const IJ: RouteSpec = { from: "inka", c: [800, 750], to: "jakarta", color: "#ff9f6e", at: 0.7, dur: 1.8, ship: false };
const MAPC: CamSpec = [{ at: [0.4, 0, 0.5], d: 21, pitch: 50, yaw: -14 }, { at: [0, 0, 0.9], d: 17.5, pitch: 45, yaw: 8 }];
const javaCam: CamSpec = [{ at: w(900, 760, 0.3), d: 13, pitch: 52, yaw: -18 }, { at: w(720, 830, 0.3), d: 8.2, pitch: 40, yaw: 10 }];
const map = (a: A, routes: RouteSpec[], pins: [string, number][], hi?: "jawa", extra?: React.ReactNode, pinS = 1) => (
  <><MapWorld t={a.t} hi={hi} />{routes.map((r, i) => <Route3 key={i} t={a.t} r={r} />)}{pins.map(([n, at]) => <Pin3 key={n} t={a.t} at={at} name={n} s={pinS} />)}{extra}</>
);
const pinTop = (n: string, h = 2.4): V3 => { const P: Record<string, [number, number]> = { tokyo: [1590, 390], jakarta: [560, 826], bogor: [585, 852], cikarang: [655, 820], inka: [1060, 836], china: [330, 300] }; return w(P[n][0], P[n][1], h); };

/* ------------------------------ kamera yang sering dipakai ------------------------------ */
const stationCam: CamSpec = [{ at: [0.5, 2.8, 0], d: 20, yaw: -34, pitch: 10 }, { at: [0, 2.8, 0], d: 18, yaw: -20, pitch: 8 }];
const gridCam: CamSpec = [{ at: [0, 1.0, 0], d: 21, yaw: -16, pitch: 34 }, { at: [0, 1.0, 0], d: 18.5, yaw: 6, pitch: 29 }];
const tlCam: CamSpec = [{ at: [-1.2, 2.2, 0], d: 18, yaw: -24, pitch: 18 }, { at: [1.0, 2.2, 0], d: 18, yaw: 8, pitch: 15 }];
const charCam: CamSpec = [{ at: [0, 2.9, 0], d: 17.5, yaw: -17, pitch: 11 }, { at: [0, 2.9, 0], d: 15.8, yaw: 4, pitch: 9 }];
const deskCam: CamSpec = [{ at: [0, 3.2, 0], d: 18, yaw: 20, pitch: 12 }, { at: [0, 3.2, 0], d: 16, yaw: -3, pitch: 9 }];
const spec = (s: Spec, from?: [number, number]) => s3(s, from);
const L = (text: string, at: Lb[1], ptr?: Lb[2], bg?: string): Lb => [text, at, ptr, bg];
const OK = "#13966a", NO = "#d8322b", TL = "#1f7f79";

/* garis waktu dengan penanda dan label di posisi tahun */
const tl = (a: A, range: [number, number], marks: number[], upTo: number, o: { dur?: number; c?: string; w?: number; p?: V3; names?: string[] } = {}) => <Timeline names={o.names} t={a.t} range={range} marks={marks} upTo={upTo} w={o.w ?? 13} p={o.p ?? [0, 0, 0.5]} to={o.dur ?? 2.6} c={o.c} />;
const tx = (v: number, range: [number, number], width = 13, h = 2.9): V3 => [timeX(v, range, width), h, 0.5];
const age = (a: A, upTo: number, marks: number[], names: string[], dur = 2.6, p?: V3) => tl(a, [0, 30], marks, upTo, { dur, c: "#e0342c", p, names });

export default defineShots({
  s01: [
    spec({ env: "jkt", vx: 2.2, vd: 1.5, cam: [{ at: [0.8, 2.8, 0.6], d: 19, yaw: -36, pitch: 10 }, { at: [1.6, 2.6, 1], d: 15, yaw: -17, pitch: 7 }],
      items: (a) => <><Train lv="krl" n={3} p={[-5.5, 0.3, 0]} open riders={doorRiders(a, "s01")} />
        <K a={a} p={[keys(a.t, [0, a.dur], [8.6, 2.6]), 0.05, keys(a.t, [0, a.dur], [4.6, 2.9])]} s={1.25} ry={-0.75} pose="walk" /><Crowd a={a} p={[7.8, 0.35, -4.6]} n={5} cols={5} /></>,
      labels: [L("MADE IN TOKYO", [-2.2, 4.9, 1.2])] }),
    spec({ env: "map", vx: -2.4, vd: 1.35, cam: MAPC, items: (a) => <>{map(a, [{ ...TJ, dur: 3.0 }], [["tokyo", 0.2], ["jakarta", 0.4]])}<Cross t={a.t} at={a.w("refused", 2.2)} p={[-3.4, 2.1, 2.4]} s={1.15} /></>,
      labels: [L("REFUSED", [-1.4, 2.4, 2.4], "left", NO)] }, [560, 760]),
  ],
  s02: [
    spec({ env: "paper", cam: charCam, items: (a) => <><K a={a} p={[-3.2, 0, 1]} s={1.7} ry={0.35} expr="happy" pose="wave" /><Shirt t={a.t} p={[3.0, 3.6, 0.5]} s={2} />
      <Gr p={[3.4, 0, -4.5]} s={1.5}><M g={G.ball(1)} c="#2f6f6a" p={[0, 2.9, 0]} /><M g={G.cyl(0.8, 1.4, 2.2)} c="#2f6f6a" p={[0, 1.1, 0]} /></Gr></>,
      labels: [L("HAND-ME-DOWNS", [3.0, 6.4, 0.5])] }),
    spec({ env: "paper", cam: [{ at: [0, 3, 0], d: 17, yaw: 16, pitch: 10 }, { d: 14.5, yaw: -8 }], items: (a) => { const m = a.w("matches", 1.4), life = a.w("life", 2.8); return <>
      <K a={a} p={[-0.2, 0, 0.4]} s={1.9} expr="sad" out={m} /><K a={a} p={[-0.2, 0, 0.4]} s={1.9} expr="happy" at={m} />
      <Shirt t={a.t} p={[-0.2, 3.1, 2.1]} s={2.5 * (1 - seg(a.t, m - 0.1, m + 0.25))} />
      <Pop t={a.t} at={m} p={[0, 0, 0]}><Shirt t={a.t} p={[3.9, 3.3, 0.6]} s={1.55} hole={seg(a.t, life, life + 0.7)} /></Pop></>; },
      labels: [L("SIZE MATCH", [3.9, 6.0, 0.6], "down", TL), L("LIFE LEFT", [-4.4, 4.6, 0.5])] }),
    spec({ env: "dusk", cam: [{ at: [0, 2.9, 0], d: 18, yaw: -22, pitch: 9 }, { d: 15.5, yaw: 6 }], items: (a) => { const h = a.w("age", 1.6); return <>
      <Gr p={[Math.sin(a.t * 40) * 0.1 * (a.t > h && a.t < h + 0.35 ? 1 : 0), 0, 0]}><S a={a} p={[-3.6, 0, 0]} s={1.3} ry={0.35} expr={a.t > h ? "shock" : "sad"} dim={0.2} sweat stamp={seg(a.t, h, h + 0.25)} /></Gr>
      <R_ a={a} p={[3.6, 0, 0.8]} s={1.35} ry={-0.75} expr="smug" hit={h} /></>; },
      labels: [L("AGE RULE", [0.2, 6.4, 0.5])] }),
  ],
  s03: [
    spec({ env: "paper", cam: gridCam, items: (a) => <>{[-6.3, -2.1, 2.1, 6.3].map((x, i) => <group key={x}><Bar t={a.t} h={1.5} at={0.25 + i * 0.35} dur={0.6} p={[x, 0, 0]} w={3.1} c={["#e2573d", "#3f7cac", "#e8772e", "#c8102e"][i]} />
      <Pop t={a.t} at={0.6 + i * 0.35} p={[x, 1.55, 0]}>{i === 0 ? <Train lv="krl" p={[-1.5, 0, 0]} s={0.34} /> : i === 1 ? <Parliament s={0.42} /> : i === 2 ? <Factory t={a.t} s={0.45} /> : <Ship t={a.t} n={2} lv="cn" s={0.3} />}</Pop></group>)}</>,
      labels: [L("4 PLAYERS", [0, 5.4, 0])] }),
    spec({ env: "jkt", cam: stationCam, items: (a) => <><Train lv="krl" n={3} p={[-4.5, 0.3, 0]} move={mix(-17, 0, seg(a.t, 0, Math.min(a.dur, 3.2), (x) => 1 - (1 - x) ** 3))} /><Crowd a={a} p={[3, 0.35, -4.8]} n={6} /></>,
      labels: [L("KAI", [-1.2, 5.3, 1.2])] }),
    spec({ env: "jktDay", track: false, canopy: false, cam: deskCam, items: (a) => <><Parliament p={[-0.5, 0, -5]} s={1.45} /><R_ a={a} p={[-1.4, 0, 2]} s={1.35} ry={0.15} hit={1.5} /><Doc t={a.t} p={[5.4, 3.6, 1.5]} mark="ok" markAt={1.9} ry={-0.5} /></>,
      labels: [L("GOVERNMENT", [-1.4, 6.8, 1])] }),
    spec({ env: "yard", cam: [{ at: [0.5, 2.9, 0], d: 21, yaw: 30, pitch: 14 }, { d: 17.5, yaw: 8 }], items: (a) => <><Factory t={a.t} p={[-4.4, 0, -1.5]} s={1.35} /><Rails len={40} p={[8, 0, 1.6]} />
      <Train lv="inka" p={[mix(-5.2, 2.2, seg(a.t, 0.2, a.dur + 0.4)), 0.3, 1.6]} s={0.82} /></>, labels: [L("INKA", [-4.4, 7.4, -1])] }),
    spec({ env: "map", cam: [{ at: w(520, 560), d: 19, pitch: 52, yaw: 14 }, { at: w(480, 640), d: 15, pitch: 44, yaw: -8 }], items: (a) => map(a, [{ ...CJ, dur: 2.8 }], [["china", 0.2], ["jakarta", 0.5]]),
      labels: [L("CRRC", pinTop("china", 2.6))] }),
    spec({ env: "paper", cam: tlCam, items: (a) => tl(a, [2000, 2026], [2000, 2013, 2026], 2026, { dur: 3.6 }), labels: [L("NOV 2026", tx(2026, [2000, 2026], 13, 3.1))] }),
  ],
  s04: [
    spec({ env: "tokyo", cam: [{ at: [0, 3, 0], d: 20, yaw: -30, pitch: 13 }, { d: 17.5, yaw: -8, pitch: 11 }], items: (a) => <><Train lv="toei" p={[-4.3, 0.3, 0]} /><Ribbon t={a.t} at={a.w("gift", 1.2)} p={[0, 0.3, 0]} w={8.9} /><Confetti t={a.t} at={a.w("gift", 1.2)} p={[0, 4.5, 1]} /></>,
      labels: [L("A GIFT", [-2.8, 6.0, 1])] }),
    spec({ env: "map", cam: MAPC, items: (a) => map(a, [{ ...TJ, dur: 3.4 }], [["tokyo", 0.2], ["jakarta", 0.4]], undefined, <CarGrid t={a.t} value={72} cols={18} gap={[1.3, 1.25]} s={0.44} lv="toei" p={[-0.6, 0.15, -0.7]} to={2.6} />),
      labels: [L("72 CARS", [-0.6, 1.9, -1.9]), L("MAY 2000", pinTop("tokyo", 2.6), "down", TL)] }, [1500, 420]),
  ],
  s05: [
    spec({ env: "tokyo", parked: false, cam: [{ at: [0, 3, 0], d: 21, yaw: 28, pitch: 13 }, { d: 18, yaw: 6 }], items: (a) => <><Factory t={a.t} p={[-5.6, 0, -4.5]} s={1.25} />
      <Train lv="toei" n={2} p={[mix(-6.5, -1.5, seg(a.t, 0.2, a.dur + 0.4)), 0.3, 0]} s={0.75} /></>, labels: [L("1968", [-5.6, 6.8, -4])] }),
    spec({ env: "paper", cam: tlCam, items: (a) => <>{tl(a, [1968, 2016], [1968, 2000, 2016], 2016, { dur: 3.4, w: 12, p: [-2.2, 0, 1] })}<S a={a} p={[7, 0, 0]} s={0.95} ry={-0.4} expr="happy" at={0.4} /></>,
      labels: [L("30 YEARS", [-4.4, 3.5, 1])] }),
  ],
  s06: [
    spec({ env: "mapStudio", cam: [{ at: [0, 2.6, 0], d: 16, yaw: -20, pitch: 12 }, { d: 13.5, yaw: 12, pitch: 8 }], aperture: 4, items: (a) => { const on = a.w("air-conditioned", 1.2); return <>
      <M g={G.box(24, 0.3, 8, 0.1)} c="#cfd8e0" p={[0, 0.15, -0.5]} /><M g={G.box(24, 7, 0.4, 0.1)} c="#e9f0f4" p={[0, 3.5, -4.6]} />
      {[-8, -3.2, 1.6, 6.4].map((x) => <group key={x}><M g={G.box(3.8, 2.4, 0.2, 0.4)} c="#9fdcf3" p={[x, 3.7, -4.36]} o={{ glow: 0.4 }} /><Rod a={[x + 2.4, 0.3, -2]} b={[x + 2.4, 6.4, -2]} w={0.09} c="#aab6c2" /></group>)}
      <Rod a={[-12, 6.0, -2]} b={[12, 6.0, -2]} w={0.1} c="#aab6c2" /><M g={G.box(20, 0.6, 1.4, 0.25)} c="#ffffff" p={[0, 6.7, -3.6]} />
      {Array.from({ length: 24 }, (_, i) => { const q = (a.t * 0.7 + i / 24) % 1; return a.t < on ? null : <M key={i} g={G.box(0.9, 0.12, 0.08, 0.05)} c="#d6f6ff" p={[-9 + (i % 8) * 2.5 + Math.sin(a.t * 3 + i) * 0.25, 6.2 - q * 3, -2.6 + (i % 3) * 0.8]} r={[0, 0, -0.35]} s={1 - q * 0.6} o={{ opacity: 0.75, basic: true }} />; })}
      <Crowd a={a} p={[0, 0.3, 0.6]} n={9} cols={5} gap={[2.2, 2.2]} s={1.3} expr={a.t >= on ? "happy" : "tired"} hot={a.t >= on ? 0 : 1.2} step={0.04} />
      <Bolt t={a.t} at={on} p={[7.2, 5.4, 0]} s={0.8} /></>; }, labels: [L("FIRST AC TRAIN", [0, 5.6, 0.6])] }),
    spec({ env: "hot", cam: [{ at: [1, 3.4, 0], d: 18, yaw: -34, pitch: 13 }, { at: [3, 3.2, 0], d: 21, yaw: -14, pitch: 11 }], items: (a) => <Train lv="eko" n={3} dirt={0.6} open p={[-3.5, 0.3, 0]} move={-(a.t * a.t) * 0.28} riders={(i) => <>{doorRiders(a, "eko")(i)}{roofRiders(a)(i)}</>} />,
      labels: [L("ROOF RIDERS", (a) => [1.2 - a.t * a.t * 0.28, 6.0, 0.5], "down", "#a5522f")] }),
  ],
  s07: [
    spec({ env: "map", cam: javaCam, items: (a) => map(a, [{ ...TJ, dur: 2.6 }], [["jakarta", 0.3]], "jawa", <Gr p={w(520, 800, 0.56)}><CarGrid t={a.t} value={8} cols={4} gap={[1.3, 1.15]} s={0.36} lv="toei" from={2.0} to={3.4} /></Gr>, 0.7) }),
    spec({ env: "paper", cam: deskCam, items: (a) => <><Train lv="toei" p={[-8.6, 0, -1]} s={0.85} ry={0.22} /><Coins t={a.t} n={3} at={a.w("billion", 1.2) - 0.25} p={[5, 0, 1.5]} s={1.6} step={0.14} /></>,
      labels: [L("RP 0.8-1 B", [5, 3.4, 1.5])] }),
  ],
  s08: [
    spec({ env: "paper", vx: 4.4, vd: 1.45, cam: [{ at: [0, 3.2, 0], d: 18.5, yaw: -22, pitch: 12 }, { d: 17, yaw: 4 }], items: (a) => <><Train lv="inka" p={[-8.8, 0, -1.6]} s={0.85} ry={0.2} /><Coins t={a.t} n={14} at={0.35} p={[4.6, 0, 1.4]} s={1.35} step={0.1} /></>,
      labels: [L("RP 10-12 B", [4.6, 6.0, 1.4])] }),
    spec({ env: "paper", vx: 0, vd: 2.55, cam: [{ at: [0, 3.2, 0], d: 18, yaw: -6, pitch: 15 }, { d: 21, yaw: 8, pitch: 12 }], items: (a) => <><Train lv="toei" p={[-9.4, 0, -3.2]} s={0.66} ry={0.12} /><Train lv="inka" p={[3.2, 0, -3.8]} s={0.66} ry={-0.12} />
      <Coins t={a.t} n={1} at={0.3} p={[-2.6, 0, 2]} s={1.3} /><Coins t={a.t} n={16} at={a.w("tenth", 1.4) - 0.8} p={[2.6, 0, 1.4]} s={1.15} step={0.06} /></>,
      labels: [L("1/10 PRICE", [-2.8, 3.4, 2])] }),
  ],
  s09: [
    spec({ env: "yard", cam: deskCam, items: (a) => <><Factory t={a.t} p={[-5.2, 0, -2.5]} s={1.2} ry={0.2} /><Doc t={a.t} p={[mix(-4, 1.8, seg(a.t, 0.1, 1.2)), 3.6, 1.6]} s={1.15} mark="ok" markAt={a.w("2019", 1.8)} /><Coins t={a.t} n={13} at={0.5} p={[6.8, 0, 0.8]} /></>,
      labels: [L("$1.3 M", [1.8, 6.2, 1.6])] }),
    spec({ env: "sea", cam: [{ at: [0, 2.8, 0], d: 21, yaw: -20, pitch: 15 }, { d: 18.5, yaw: 8, pitch: 12 }], items: (a) => <><Ship t={a.t} n={3} p={[-5.4 + a.t * 0.25, 0, 0.5]} s={0.82} ry={-0.2} />
      <M g={G.box(7.4, 0.7, 3.2, 0.12)} c="#c9a97d" p={[4.8, 0.25, -0.5]} /><Bar t={a.t} h={6} at={0.25} p={[3.3, 0.6, -0.5]} w={2} c="#e8e4da" /><Bar t={a.t} h={0.67} at={a.w("ninth", 1.4) - 0.4} p={[6.4, 0.6, -0.5]} w={2} /></>,
      labels: [L("1/9 PRICE", [6.4, 2.0, -0.4])] }),
  ],
  s10: [
    spec({ env: "tokyo", cam: stationCam, items: (a) => <><Train lv="toei" n={2} p={[-7.5, 0.3, 0]} /><Check t={a.t} at={a.w("good", 1)} p={[3.8, 5.6, 2]} s={1.2} /></>, labels: [L("GOOD FOR JAPAN", [-0.2, 5.6, 1.4], "down", OK)] }),
    spec({ env: "grey", cam: charCam, items: (a) => <><S a={a} p={[-3.2, 0, 0]} s={1.35} ry={0.35} expr="sad" sweat dim={0.25} /><Coins t={a.t} n={7} at={a.w("costs", 1.2) - 0.5} p={[3.8, 0, 1]} s={1.55} />
      <Gr p={[6.8, 0, -3]}>{[0, 1, 2, 3, 4].map((i) => <M key={i} g={G.box(1.8, 0.5, 1.2, 0.2)} c={i % 2 ? "#8a5a36" : "#6f7180"} p={[(i % 2) * 0.5 - 0.3, 0.3 + i * 0.45, 0]} r={[0.1 * i, i, 0.12 * (i % 3)]} />)}</Gr></>,
      labels: [L("SCRAP COST", [3.8, 4.4, 1])] }),
    spec({ env: "map", cam: MAPC, items: (a) => map(a, [{ ...TJ, dur: 3.0 }], [["tokyo", 0.2], ["jakarta", 0.4]], undefined, <Coins t={a.t} n={1} at={0.8} p={[2.8, 1.4 + Math.sin(a.t * 3) * 0.15, 0.4]} s={1.1} />),
      labels: [L("SHIPPING", [2.8, 3.0, 0.4])] }, [1590, 420]),
  ],
  s11: [
    spec({ env: "paper", cam: charCam, items: (a) => <><Coins t={a.t} n={9} at={0.1} p={[0, 0, 0]} s={1.9} step={0.06} /><Cross t={a.t} at={a.w("alone", 1.2)} p={[0, 2.6, 2.2]} s={1.7} /></>, labels: [L("NOT JUST PRICE", [0, 6.6, 0])] }),
    spec({ env: "grey", cam: [{ at: [0, 2.8, 0], d: 18, yaw: 24, pitch: 18 }, { d: 15.5, yaw: -6, pitch: 12 }], items: (a) => { const c = a.w("major", 1.4); const k = seg(a.t, 0.4, 1.2); return <>
      <Gr p={[-1.5, 0, 0]}><Gauge w={3.4} g={0} /></Gr><Gr p={[-1.5, mix(5.4, 2.0, k), 0.2]} r={[0, 0, Math.sin(a.t * 6) * 0.03 + 0.08]}><Gr p={[0, 0, 0]} r={[0, Math.PI / 2, 0]} s={0.82}><Train lv="toei" p={[-4.3, -0.4, 0]} /></Gr></Gr>
      <Cross t={a.t} at={c} p={[4.4, 3.4, 2]} s={1.15} /></>; }, labels: [L("MAJOR CHANGES", [4.4, 6.0, 1])] }),
    spec({ env: "jkt", cam: stationCam, items: (a) => <><Train lv="toei" n={3} p={[-4.5, 0.3, 0]} move={mix(-16, 0, seg(a.t, 0, a.dur + 0.4, (x) => 1 - (1 - x) ** 2.4))} /><Check t={a.t} at={a.w("can", 1.4)} p={[4.4, 6, 2]} s={1.25} /></>,
      labels: [L("JAKARTA", [4.8, 4.4, 2], "down", TL)] }),
  ],
  s12: [
    spec({ env: "paper", vx: 0, vd: 1.45, cam: [{ at: [0, 1.6, -0.5], d: 17, yaw: -26, pitch: 22 }, { at: [0, 1.4, 0], d: 13.5, yaw: 4, pitch: 15 }], items: (a) => <Gauge w={4.4} g={seg(a.t, 0.4, 1.4)} depth={16} />,
      labels: [L("THE RAILS", [0, 3.8, 0.6])] }),
    spec({ env: "paper", vx: 0, vd: 2.5, cam: [{ at: [0, 1.8, 0], d: 18.5, yaw: 14, pitch: 20 }, { d: 17, yaw: -10, pitch: 17 }], items: (a) => <><Gr p={[-5, 0, 0]}><Gauge w={3} g={seg(a.t, 0.4, 1.6)} depth={14} /></Gr><Gr p={[5, 0, 0]}><Gauge w={3} g={seg(a.t, 0.9, 2.1)} depth={14} /></Gr></>,
      labels: [L("JAPAN", [-5, 4.4, 0]), L("JAVA", [5, 4.4, 0]), L("1,067 MM", [0, 2.6, 2.5], "down", TL)] }),
    spec({ env: "grey", vx: 0, vd: 1.5, cam: [{ at: [0, 2.2, 0], d: 17.5, yaw: -20, pitch: 20 }, { d: 15, yaw: 12 }], items: (a) => { const c = a.w("Change", 1.0); const wd = mix(3, 5.4, seg(a.t, c - 0.2, c + 0.6)); const f = seg(a.t, c + 0.3, c + 1.1);
      return <><Gauge w={wd} g={0} depth={13} />{[-1.5, 1.5].map((x, i) => <Gr key={x} p={[x - f * (i ? -0.3 : 0.3), mix(2.0, 0.85, f), 1.2]} r={[0, Math.PI / 2, (i ? 1 : -1) * f * 0.6]}><M g={G.cyl(1, 1, 0.45, 36)} c="#3d3b45" r={[Math.PI / 2, 0, 0]} /><M g={G.cyl(0.45, 0.45, 0.52)} c="#c3c8d2" r={[Math.PI / 2, 0, 0]} /></Gr>)}
        <Rod a={[-1.5, mix(2.0, 0.85, f), 1.2]} b={[1.5, mix(2.0, 0.85, f), 1.2]} w={0.16} c="#9aa1ae" /><Cross t={a.t} at={c + 0.5} p={[0, 4.6, 1]} s={1.1} /></>; }, labels: [L("NEW WHEELS", [4.8, 3.6, 1.2])] }),
  ],
  s13: [
    spec({ env: "dusk", cam: charCam, items: (a) => <><Clock t={a.t} p={[0, 3.4, 0]} s={1.7} rate={-260} ry={0} /><Rails len={60} p={[0, 0, -4]} /><Train lv="eko" p={[-14 + a.t * -0.6, 0.3, -4]} s={0.8} /></>, labels: [L("HISTORY", [0, 7.3, 0])] }),
    spec({ env: "map", cam: [{ at: w(760, 820), d: 14, pitch: 55, yaw: 16 }, { at: w(760, 850), d: 10.5, pitch: 40, yaw: -12 }], items: (a) => { const d = seg(a.t, 0.4, 2.4);
      return map(a, [], [], "jawa", <Gr p={w(760, 850, 0.62)}>{[-0.32, 0.32].map((z) => <Rod key={z} a={[-4.6, 0.08, z]} b={[-4.6 + 9.2 * d, 0.08, z]} w={0.07} c="#3d3b45" />)}{Array.from({ length: 30 }, (_, i) => (i / 30 < d ? <M key={i} g={G.box(0.12, 0.07, 1.0, 0.02)} c="#8a5f42" p={[-4.5 + i * 0.31, 0.04, 0]} /> : null))}</Gr>); },
      labels: [L("1867", w(760, 850, 2.6))] }),
    spec({ env: "sea", cam: [{ at: [0, 2.6, 0], d: 19, yaw: -18, pitch: 24 }, { d: 17, yaw: 10, pitch: 18 }], items: (a) => { const c = a.w("converted", 1.4); const k = seg(a.t, c, c + 0.9);
      return <><M g={G.box(17, 0.6, 10, 0.3)} c="#a9cf8e" p={[0, 0.1, -1]} /><Gr p={[0, 0.4, -2.6]}><Gauge w={mix(5.4, 3, k)} g={1} depth={6} /></Gr>{tl(a, [1860, 1960], [1867, 1942], 1945, { dur: 3.0, p: [0, 0.4, 3.0], w: 12 })}</>; },
      labels: [L("1940S", [timeX(1942, [1860, 1960], 12), 3.2, 3], "down", TL), L("NARROWER", [0, 4.6, -2])] }),
    spec({ env: "jkt", cam: stationCam, items: (a) => <><Train lv="toei" n={3} p={[-4.5, 0.3, 0]} move={mix(-18, 0, seg(a.t, 0, a.dur + 0.3, (x) => 1 - (1 - x) ** 2.2))} /><Check t={a.t} at={a.w("fits", 1.4)} p={[4.4, 6, 2]} s={1.2} /></>,
      labels: [L("IT FITS", [4.6, 4.4, 2], "down", OK)] }, [960, 800]),
  ],
  s14: [
    spec({ env: "night", vx: 1.4, vd: 2.0, cam: charCam, items: (a) => <><Bolt t={a.t} at={0.25} p={[-0.8, 3.6, 0]} s={1.9} /><Check t={a.t} at={a.w("matches", 1.4)} p={[4.4, 3.4, 1.5]} s={1.25} /></>, labels: [L("POWER", [-0.8, 7.2, 0])] }),
    spec({ env: "night", vx: -0.6, vd: 1.6, cam: [{ at: [0, 3.8, 0], d: 20, yaw: -32, pitch: 10 }, { at: [0, 3.9, 0], d: 17.5, yaw: -8, pitch: 8 }], items: (a) => { const f = a.w("fifteen", 1.2);
      return <><Rails len={80} /><Train lv="krl" n={2} p={[-5, 0.3, 0]} /><Rod a={[-40, 6.0, 0]} b={[40, 6.0, 0]} w={0.07} c="#ffd23f" o={{ glow: a.t > f - 0.4 ? 0.8 : 0.1 }} /><Rod a={[-40, 7.0, 0]} b={[40, 7.0, 0]} w={0.04} c="#9a94c8" />
        {Array.from({ length: 12 }, (_, i) => <Rod key={i} a={[-33 + i * 6, 6, 0]} b={[-33 + i * 6, 7, 0]} w={0.025} c="#9a94c8" />)}
        {[[-2.7, 0], [6.1, 1]].map(([x, i]) => <group key={i}><Rod a={[x - 0.7, 4.1, 0]} b={[x + 0.4, 5.0, 0]} w={0.07} c="#c3c8d2" /><Rod a={[x + 0.4, 5.0, 0]} b={[x - 0.2, 5.92, 0]} w={0.07} c="#c3c8d2" /><M g={G.box(1.4, 0.12, 0.2, 0.04)} c="#c3c8d2" p={[x - 0.2, 5.92, 0]} />
          {a.t > f - 0.3 && <M g={G.ball(0.26 + 0.12 * Math.sin(a.t * 23 + i))} c="#fff6b0" p={[x - 0.2, 6.0, 0.1]} o={{ glow: 1 }} />}</group>)}
        {a.t > f - 0.4 && Array.from({ length: 9 }, (_, i) => <M key={"e" + i} g={G.ball(0.2)} c="#fff6b0" p={[-18 + ((a.t * 11 + i * 4.2) % 36), 6.0, 0.05]} o={{ glow: 1 }} noShadow />)}</>; },
      labels: [L("1,500 V DC", [2.4, 7.6, 0]), L("1925", [-6.4, 7.6, 0], "down", TL)] }),
  ],
  s15: [
    spec({ env: "paper", vx: 0, vd: 2.7, cam: [{ at: [0, 2.6, 0], d: 18.5, yaw: -18, pitch: 17 }, { d: 16.5, yaw: 8, pitch: 13 }], items: (a) => <><Gr p={[-4.4, 0, 0]}><Gauge w={3.2} g={seg(a.t, 0.2, 0.9)} depth={12} /></Gr><Bolt t={a.t} at={0.6} p={[4.4, 2.2, 0]} s={1.3} /><Check t={a.t} at={0.9} p={[-4.4, 4.2, 1]} /><Check t={a.t} at={1.4} p={[4.4, 5.0, 1]} /></>,
      labels: [L("SAME RAILS", [-4.4, 6.0, 0], "down", TL)] }),
    spec({ env: "jkt", vx: 1.0, vd: 1.95, cam: stationCam, items: (a) => { const g = a.w("gets", 1.4), sv = a.w("service", 2.6); return <><Pop t={a.t} out={g} p={[-1, 0.2, 0]}><Ship t={a.t} n={3} lv="krl" /></Pop>
      {a.t >= g && <Train lv="krl" n={3} p={[-4, 0.3, 0]} move={mix(-14, 0, seg(a.t, g, g + 2.2, (x) => 1 - (1 - x) ** 2.4))} />}<Check t={a.t} at={sv} p={[4.4, 6, 2]} s={1.15} /></>; },
      labels: [L("NEW SIGNS", [-0.5, 5.4, 1.4])] }),
  ],
  s16: [
    spec({ env: "map", cam: MAPC, items: (a) => map(a, [{ ...TJ, at: 0.2, dur: 2.4 }, { ...TJ, c: [1100, 560], at: 0.8, dur: 2.4, color: "#ffd23f" }, { ...TJ, c: [1250, 920], at: 1.4, dur: 2.4, color: "#ff9f6e" }], [["tokyo", 0.1], ["jakarta", 0.3]]) }),
    spec({ env: "paper", cam: [{ at: [0, 1.2, 0.5], d: 22, yaw: -14, pitch: 38 }, { d: 20, yaw: 6, pitch: 30 }], items: (a) => <><CarGrid t={a.t} value={140} cols={20} gap={[0.98, 0.9]} s={0.9} p={[0, 0, -1.8]} to={2.6} />{tl(a, [2012, 2019], [2012, 2019], 2019, { dur: 3.0, w: 12, p: [0, 0, 4.2] })}</>,
      labels: [L("140 CARS", [-1.5, 3.6, -4]), L("1,440 CARS", [6.4, 2.6, 4.2], "down", TL)] }),
  ],
  s18: [
    spec({ env: "jkt", cam: [{ at: [-1, 2.8, -1], d: 17, yaw: -52, pitch: 11 }, { at: [3, 2.8, -1], d: 19, yaw: -34, pitch: 13 }], items: (a) => <><Train lv="krl" n={4} p={[-6 - a.t * 0.35, 0.3, 0]} /><Rails len={110} p={[0, 0, 4.4]} /><Train lv="metro" n={3} p={[2 + a.t * 0.25, 0.3, 4.4]} s={0.98} /></>,
      labels: [L("STILL JAPANESE", [-0.5, 6.4, 0])] }),
    spec({ env: "paper", cam: gridCam, items: (a) => <><BallGrid t={a.t} total={100} value={86} cols={20} gap={0.78} r={0.29} p={[0.6, 0, 0.4]} on="#e0342c" off="#2c8c86" from={0.5} to={2.9} /><S a={a} p={[-9.2, 0, -0.5]} s={0.7} ry={0.5} expr="happy" at={0.6} /></>,
      labels: [L("780 CARS", [-3.4, 3.4, 0], "down", NO), L("128 CARS", [6.6, 3.4, 0], "down", TL)] }),
  ],
  s19: [
    spec({ env: "paper", cam: charCam, items: (a) => <><S a={a} p={[-3.8, 0, 0]} s={1.35} ry={0.4} expr="tired" sweat /><Cake t={a.t} at={a.w("thirty-four", 0.8)} p={[3.8, 0, 0.8]} n={12} s={1.15} /></>, labels: [L("34-41 YEARS", [3.8, 4.6, 0.8])] }),
    spec({ env: "grey", cam: [{ at: [0, 2.6, 0], d: 18, yaw: 24, pitch: 13 }, { d: 16.5, yaw: -8, pitch: 10 }], items: (a) => <><Wall t={a.t} fallAt={a.w("fell", 1.4)} p={[1.6, 0, -1.5]} /><S a={a} p={[-6.6, 0, 2]} s={0.85} ry={0.55} expr="happy" /></>, labels: [L("BERLIN WALL", [1.6, 5.4, -1.5])] }),
  ],
  s20: [
    spec({ env: "jktGrey", cam: [{ at: [0.5, 2.8, 0], d: 21, yaw: -18, pitch: 13 }, { at: [1.4, 2.6, 0.5], d: 15.5, yaw: 8, pitch: 11 }], items: (a) => <><Train lv="krl" n={2} p={[-6, 0.3, -0.2]} dirt={0.25} /><S a={a} p={[-4.2, 0.1, 3.6]} s={0.95} ry={0.3} expr="tired" sweat /><Crowd a={a} p={[4.4, 0, 3.8]} n={22} cols={7} gap={[1.15, 1.0]} s={1.05} step={0.09} hot={1} /></>,
      labels: [L("RISING", [4.6, 4.2, 3])] }),
    spec({ env: "paper", cam: deskCam, items: (a) => <><Doc t={a.t} p={[0, 3.4, 0.5]} s={1.7} mark="no" markAt={a.w("blocked", 1.4)} /></>, labels: [L("2023", [-4.8, 5.4, 0], "down", TL), L("BLOCKED", [4.8, 5.4, 0], "down", NO)] }),
  ],
  s21: [
    spec({ env: "tokyo", track: false, parked: false, cam: [{ at: [0, 2.8, 0], d: 22, yaw: -20, pitch: 22 }, { d: 20, yaw: 8, pitch: 18 }], items: (a) => <><M g={G.box(10, 0.08, 9, 0.02)} c="#5fb4d4" p={[-6.6, 0.02, 1]} /><Ship t={a.t} n={5} lv="toei" p={[-5.8, 0.05, 1.5]} s={0.78} ry={-0.15} />
      <CarGrid t={a.t} value={58} cols={8} gap={[1.12, 0.86]} lv="metro" p={[4.8, 0, -0.5]} to={2.8} /></>, labels: [L("348 CARS", [4.8, 4.2, -2]), L("E217", [-5.8, 4.8, 1.5], "down", TL)] }),
  ],
  s23: [
    spec({ env: "map", cam: [{ at: [-0.6, 0, 0.4], d: 20, pitch: 54, yaw: 15 }, { at: [-1.4, 0, 1.4], d: 15.5, pitch: 42, yaw: -10 }], items: (a) => map(a, [{ ...CJ, dur: 2.6 }, IJ], [["china", 0.1], ["inka", 0.5], ["jakarta", 0.3]]) }),
    spec({ env: "map", cam: [{ at: w(420, 420), d: 13, pitch: 48, yaw: -20 }, { at: w(940, 760), d: 11, pitch: 44, yaw: 12 }], items: (a) => map(a, [{ ...CJ, dur: 2.0 }], [["china", 0.2], ["inka", a.w("INKA", 2) - 0.2]], "jawa", undefined, 0.85),
      labels: [L("CRRC SIFANG", pinTop("china", 2.3)), L("INKA", pinTop("inka", 2.3), "down", TL)] }),
  ],
  s24: [
    spec({ env: "yard", cam: [{ at: [0, 2.4, 0], d: 22, yaw: -18, pitch: 24 }, { d: 19.5, yaw: 9, pitch: 18 }], items: (a) => <><Factory t={a.t} p={[6.6, 0, -2.6]} s={1.05} ry={-0.25} /><Rails len={13} p={[-4.4, 0, 3]} /><Train lv="krl" p={[-8.6, 0.3, 3]} s={0.85} />
      <CarGrid t={a.t} value={19} cols={7} gap={[1.35, 1.1]} p={[-3.2, 0, -2]} to={2.2} /></>, labels: [L("19 TRAINS", [-3.2, 4.0, -2.6])] }),
  ],
  s25: [
    spec({ env: "sea", cam: [{ at: [0, 2.4, 0], d: 19, yaw: -30, pitch: 18 }, { d: 15.5, yaw: 2, pitch: 12 }], items: (a) => <Ship t={a.t} n={3} lv="cn" p={[1.4 - a.t * 0.35, 0, 0]} s={1.35} ry={Math.PI + 0.15} />,
      labels: [L("3 CHINESE TRAINS", [0.4, 6.0, 0]), L("JAN 2024", [-6.4, 4.2, 0], "down", TL)] }),
    spec({ env: "paper", cam: charCam, items: (a) => <><Doc t={a.t} p={[0, 6.1, -2]} s={0.85} mark="ok" markAt={0.9} />{[-4.6, 0, 4.6].map((x, i) => <Coins key={x} t={a.t} n={6} at={0.4 + i * 0.35} p={[x, 0, 1.2]} s={1.4} />)}</>,
      labels: [L("RP 783 B", [-4.6, 6.4, -1]), L("RP 261 B", [4.6, 3.2, 1.2], "down", TL)] }),
  ],
  s26: [
    spec({ env: "jkt", cam: [{ at: [1, 2.8, -1], d: 22, yaw: -34, pitch: 14 }, { at: [3, 2.8, -1], d: 20.5, yaw: -16, pitch: 12 }], items: (a) => <><Train lv="cn" n={4} p={[-7, 0.3, 1.6]} s={0.9} move={mix(-18, 0, seg(a.t, 0, a.dur + 0.3, (x) => 1 - (1 - x) ** 2))} /><Rails len={80} p={[0, 0, -2.6]} /><Train lv="toei" p={[-6, 0.3, -2.6]} s={0.78} dirt={0.4} /></>,
      labels: [L("LONGER", [2.5, 5.6, 1.6])] }),
    spec({ env: "paper", cam: [{ at: [0, 1.2, 0.4], d: 22, yaw: -14, pitch: 34 }, { d: 20, yaw: 7, pitch: 29 }], items: (a) => <><CarGrid t={a.t} value={12} cols={12} gap={[1.45, 1]} s={1.15} lv="cn" p={[0, 0, -3]} to={1.8} /><BallGrid t={a.t} total={34} value={34} cols={17} gap={0.95} r={0.33} p={[0, 0, 2.4]} on="#2c8c86" from={a.w("people", 1.6) - 0.8} to={a.w("people", 1.6) + 1.4} /></>,
      labels: [L("12 CARS", [0, 3.0, -3]), L("3,400 PEOPLE", [0, 1.8, 2.4], "down", TL)] }),
  ],
  s27: [
    spec({ env: "paper", cam: [{ at: [0, 2.6, 0], d: 21, yaw: -8, pitch: 17 }, { d: 18.5, yaw: 8, pitch: 14 }], items: (a) => <><Train lv="toei" p={[mix(-16, -8.8, seg(a.t, 0, 1.4)), 0, 0]} s={0.78} dirt={0.35} /><Gr p={[mix(16, 8.8, seg(a.t, 0, 1.4)), 0, 0]} r={[0, Math.PI, 0]}><Train lv="cn" s={0.78} /></Gr>
      <Pop t={a.t} at={1.2} p={[0, 2.6, 1]}><M g={G.torus(1, 0.2)} c="#f2b632" r={[0, a.t * 1.5, 0]} /><M g={G.ball(0.45)} c="#e2573d" /></Pop></>, labels: [L("OLD DEAL", [-5.4, 5.0, 0.5])] }),
    spec({ env: "paper", cam: gridCam, items: (a) => <><CarGrid t={a.t} value={12} cols={12} gap={[1.45, 1]} s={1.1} lv="toei" p={[0, 0, -3.2]} /><Coins t={a.t} n={3} at={a.w("billion", 1.4) - 0.3} p={[0, 0, 3]} s={1.6} step={0.14} /></>, labels: [L("RP 12 B", [0, 2.8, 2.2])] }),
    spec({ env: "paper", cam: [{ at: [0, 2.6, 0], d: 18, yaw: 20, pitch: 8 }, { at: [0.6, 3.8, 0], d: 21, yaw: -10, pitch: 6 }], items: (a) => <><Coins t={a.t} n={1} at={0.2} p={[-3.8, 0, 1]} s={1.5} /><Coins t={a.t} n={20} at={a.w("twenty", 1.4) - 1.0} p={[3.4, 0, 0]} s={1.55} step={0.065} /></>,
      labels: [L("20X PRICE", [-0.9, 7.0, 0], "right", NO)] }),
  ],
  s28: [
    spec({ env: "jktDay", cam: stationCam, items: (a) => <><Train lv="cn" n={2} p={[-5.5, 0.3, 0]} move={mix(-12, 0, seg(a.t, 0, 2.4, (x) => 1 - (1 - x) ** 2.2))} />
      <M g={G.box(0.5, 4.2, 0.1, 0.05)} c="#ffffff" p={[mix(-7, 12, (a.t * 0.45) % 1), 2.4, 1.4]} r={[0, 0, -0.4]} o={{ opacity: 0.45, basic: true }} /><Check t={a.t} at={a.w("age", 1.4)} p={[4.6, 6, 2]} s={1.15} /></>, labels: [L("FIXES AGE", [-0.6, 5.6, 1.4], "down", OK)] }),
    spec({ env: "dusk", cam: [{ at: [0, 2.6, 0], d: 18, yaw: -22, pitch: 11 }, { d: 17, yaw: 8, pitch: 9 }], items: (a) => <><S a={a} p={[-6, 0, -1.5]} s={1.0} ry={0.3} expr="tired" dim={0.25} out={a.w("fifty", 2.4) + 0.8} /><S a={a} p={[0, 0, 0]} s={1.1} expr="tired" dim={0.35} /><S a={a} p={[5.8, 0, 1.2]} s={1.15} ry={-0.3} expr="tired" dim={0.5} /></>,
      labels: [L("NOV 2025", [0, 5.7, 0], "down", TL), L("~50 YEARS", [5.8, 6.2, 1.2])] }),
  ],
  s29: [
    spec({ env: "jkt", track: false, cam: [{ at: [0, 3.2, 0], d: 19, yaw: -30, pitch: 12 }, { d: 16, yaw: 14, pitch: 9 }], items: (a) => <>{[0, 1].map((i) => <M key={i} g={G.cyl(3.6 - i * 0.5, 3.8 - i * 0.5, 0.65, 48)} c={i ? "#c98a55" : "#8a5a36"} p={[0, 0.32 + i * 0.65, 0]} />)}
      <S a={a} p={[0, 1.3, 0]} s={1.12} expr="happy" />{[-1, 1].map((d) => <group key={d}><M g={G.cone(1.5, 7, 24)} c="#fff2b0" p={[d * 3.6, 5.2, 0]} r={[0, 0, d * 0.62]} o={{ opacity: 0.2 + 0.06 * Math.sin(a.t * 4 + d), basic: true }} /><Palm t={a.t} p={[d * 8.2, 0, -1]} s={1.4} seed={d} /></group>)}</>,
      labels: [L("JAKARTA KOTA", [0, 7.2, 0])] }),
    spec({ env: "jkt", cam: charCam, items: (a) => <><S a={a} p={[0, 0.1, 0]} s={1.25} expr="happy" /><Pop t={a.t} at={0.5} p={[0, 1.1, 1.75]} s={1}><M g={G.cyl(0.5, 0.5, 0.15)} c="#f4b52c" r={[Math.PI / 2, 0, 0]} /><M g={G.cyl(0.28, 0.28, 0.2)} c="#ffd558" r={[Math.PI / 2, 0, 0]} /><Rod a={[-0.5, 0.9, 0]} b={[0, 0.35, 0]} w={0.11} c="#e0342c" /><Rod a={[0.5, 0.9, 0]} b={[0, 0.35, 0]} w={0.11} c="#e0342c" /></Pop>
      <Crowd a={a} p={[-6.6, 0, 3]} n={6} cols={3} pose="wave" expr="happy" /><Crowd a={a} p={[6.6, 0, 3]} n={6} cols={3} pose="wave" expr="happy" seed="d" /><Confetti t={a.t} at={a.w("ceremony", 0.6)} /></>, labels: [L("RETIREMENT", [0, 6.6, 0])] }, [960, 520]),
  ],
  s30: [
    spec({ env: "map", cam: [{ at: [-1, 0, 0.6], d: 20, pitch: 46, yaw: -18 }, { at: [-1.2, 0, 1.4], d: 16, pitch: 50, yaw: 10 }], items: (a) => map(a, [{ ...CJ, dur: 2.2 }, { ...IJ, at: 0.5 }], [["china", 0.1], ["inka", 0.3], ["jakarta", 0.5]]) }),
    spec({ env: "yard", cam: charCam, items: (a) => { const c = a.w("weak", 1.4); return <><Factory t={a.t} p={[0, 0, -1]} s={1.5} smoke={1 - 0.75 * seg(a.t, c, c + 0.8)} /><Cross t={a.t} at={c} p={[3.6, 4.4, 2.6]} s={1.2} /></>; }, labels: [L("WEAK POINT", [-2.4, 6.8, 0])] }),
  ],
  s32: [
    spec({ env: "yard", cam: gridCam, items: (a) => <><Factory t={a.t} p={[6.8, 0, -2]} s={1.05} ry={-0.25} /><CarGrid t={a.t} value={8} cols={4} gap={[2.0, 2.0]} s={1.5} lv="metro" p={[-3.2, 0, 0]} /></>, labels: [L("8 PER YEAR", [-3.2, 4.4, -1.5], "down", TL)] }),
    spec({ env: "yard", cam: gridCam, items: (a) => <><Factory t={a.t} p={[6.8, 0, -2]} s={1.05} ry={-0.25} /><CarGrid t={a.t} value={3} total={8} ghost cols={4} gap={[2.0, 2.0]} s={1.5} p={[-3.2, 0, 0]} from={a.w("two", 0.8)} to={a.w("two", 0.8) + 1.1} /></>, labels: [L("2-3 DELIVERED", [-3.2, 4.4, -1.5])] }),
  ],
  s33: [
    spec({ env: "paper", cam: gridCam, items: (a) => <BallGrid t={a.t} total={16} value={7} cols={8} gap={2.0} r={0.72} on="#2c8c86" from={0.5} to={2.2} />, labels: [L("7 OF 16", [0, 4.6, -1])] }),
    spec({ env: "paper", cam: [{ at: [0, 2.0, 0], d: 21, yaw: 16, pitch: 30 }, { d: 18.5, yaw: -8, pitch: 24 }], items: (a) => <><BallGrid t={a.t} total={16} value={16} baseN={7} base="#2c8c86" cols={8} gap={1.8} r={0.62} on={Math.sin(a.t * 6) > 0 ? "#ffb52e" : "#f39a1e"} p={[0, 0, 1.6]} from={0.5} to={1.4} /><Rails len={60} p={[0, 0, -4.4]} /><Train lv="inka" p={[-4.4, 0.3, -4.4]} s={0.9} lit={false} /></>,
      labels: [L("9 WAITING", [3.6, 3.6, 1], "down", NO)] }),
  ],
  s35: [
    spec({ env: "paper", cam: gridCam, items: (a) => <BallGrid t={a.t} total={110} value={110} cols={22} gap={0.8} r={0.3} on="#2c8c86" from={0.4} to={3.0} />, labels: [L("1.1 M TRIPS", [0, 4.2, -1.6])] }),
    spec({ env: "paper", cam: charCam, items: (a) => <><Bar t={a.t} h={1.75} at={0.3} p={[-3, 0, 0]} w={2.6} c="#8a8fa3" /><Bar t={a.t} h={5.5} at={a.w("eleven", 1.8) - 0.5} p={[3, 0, 0]} w={2.6} /></>, labels: [L("PLANNED 3-4%", [-3, 2.6, 0], "down", "#5f6682"), L("ACTUAL 11%", [3, 6.2, 0], "down", NO)] }),
  ],
  s36: [
    spec({ env: "paper", cam: gridCam, items: (a) => <BallGrid t={a.t} total={130} value={130} cols={26} gap={0.7} r={0.26} on="#2c8c86" from={0.4} to={3.0} />, labels: [L("1.3 M", [0, 4.0, -1.6])] }),
    spec({ env: "paper", cam: [{ at: [1.4, 1.2, 0], d: 19.5, yaw: 4, pitch: 34 }, { at: [2.2, 1.2, 0.4], d: 18, yaw: -14, pitch: 30 }], items: (a) => <BallGrid t={a.t} total={130} value={130} baseN={110} base="#2c8c86" cols={26} gap={0.7} r={0.26} on="#e0342c" from={a.w("thousand", 1.4) - 0.8} to={a.w("thousand", 1.4) + 0.6} />,
      labels: [L("+200,000", [6, 2.8, 1.4], "down", NO)] }),
  ],
  s37: [
    spec({ env: "paper", cam: [{ at: [0, 0.8, 0], d: 23, yaw: -15, pitch: 40 }, { d: 20.5, yaw: 7, pitch: 33 }], items: (a) => <CarGrid t={a.t} value={105} cols={15} gap={[1.25, 1.1]} lv="metro" to={3.0} />, labels: [L("105 TRAINS", [0, 3.0, -4])] }),
    spec({ env: "paper", cam: [{ at: [0, 0.8, 0], d: 22, yaw: 12, pitch: 38 }, { at: [1.5, 0.6, 1], d: 19.5, yaw: -10, pitch: 35 }], items: (a) => <CarGrid t={a.t} value={102} total={105} ghost cols={15} gap={[1.25, 1.1]} from={0.2} to={2.0} />, labels: [L("102 HAVE", [0, 3.0, -4], "down", NO)] }),
  ],
  s38: [
    spec({ env: "paper", cam: charCam, items: (a) => <><Bar t={a.t} h={5.6} at={0.2} p={[-3, 0, 0]} w={2.6} c="#8a8fa3" /><Bar t={a.t} h={4.9} at={0.5} p={[3, 0, 0]} w={2.6} /><Pop t={a.t} at={a.w("gap", 1.4)} p={[3, 5.25, 0]}><M g={G.box(2.6, 0.65, 2.6, 0.09)} c="#ffd23f" o={{ opacity: 0.55 + 0.35 * Math.sin(a.t * 7), glow: 0.6 }} /></Pop></>,
      labels: [L("GAP", [4.6, 5.3, 0], "left", NO)] }),
    spec({ env: "paper", cam: gridCam, items: (a) => <><CarGrid t={a.t} value={13} cols={7} gap={[2.0, 1.8]} s={1.45} lv="metro" to={1.8} /><Cross t={a.t} at={a.w("retire", 2)} p={[0, 2.4, 2.4]} s={2.0} /></>, labels: [L("13 TRAINS", [0, 4.8, -2])] }),
  ],
  s39: [
    spec({ env: "yard", cam: deskCam, items: (a) => <><Clock t={a.t} p={[-4.6, 3.2, 1]} s={1.35} rate={140} /><Factory t={a.t} p={[4.6, 0, -2]} s={1.15} ry={-0.25} />
      <Gr p={[-0.4, 0, 3]}><M g={G.box(4, 0.3, 1.2, 0.1)} c="#3d3b45" p={[0, 0.5, 0]} />{Array.from({ length: 5 }, (_, i) => <Rod key={i} a={[-1.8 + i * 0.9, 0.6, 0]} b={[-1.8 + i * 0.9, 2.1, 0]} w={0.08} c="#e8772e" />)}<Rod a={[-1.8, 2.1, 0]} b={[1.8, 2.1, 0]} w={0.08} c="#e8772e" /><M g={G.box(1.6, 1.4, 1.2, 0.2)} c="#fbf6e8" p={[-1.05, 1.35, 0]} /></Gr></>, labels: [L("1-2 YEARS", [-4.6, 6.3, 1])] }),
    spec({ env: "paper", cam: tlCam, items: (a) => tl(a, [2026, 2028], [2026, 2027], 2027, { dur: 2.6, c: "#e0342c", w: 12 }), labels: [L("JAN 2026", [-6, 3.1, 0.5], "down", TL), L("2027", [0, 3.1, 0.5], "down", NO)] }),
  ],
  s40: [
    spec({ env: "map", cam: [{ at: [-0.4, 0, 1], d: 17, pitch: 44, yaw: 14 }, { at: [1.6, 0, 0], d: 18.5, pitch: 52, yaw: -10 }], items: (a) => map(a, [{ from: "jakarta", c: [1250, 740], to: "tokyo", dur: 3.0, lv: "krl" }], [["jakarta", 0.1], ["tokyo", 0.5]]), labels: [L("SEPT 2026", pinTop("tokyo", 2.6))] }, [560, 760]),
  ],
  s41: [
    spec({ env: "jktDay", canopy: false, cam: [{ at: [0, 3.2, 0], d: 22, yaw: -22, pitch: 12 }, { at: [1, 3.2, 0], d: 19.5, yaw: 6, pitch: 10 }], items: (a) => <><Parliament p={[5.6, 0.2, -2.5]} s={1.1} ry={-0.3} /><Train lv="krl" p={[-10.2, 0.3, 0]} s={0.72} />
      <Doc t={a.t} p={[mix(-5.6, 3.4, seg(a.t, 0.8, 3)), 4.4 + Math.sin(seg(a.t, 0.8, 3) * Math.PI) * 1.4, 1.6]} s={0.7} mark="ok" markAt={2.0} /><Arrow t={a.t} at={a.w("parliament", 1.6) - 0.6} a={[-4.6, 2.6, 2.6]} b={[3.4, 2.4, 1.6]} /></>,
      labels: [L("SEPT 23", [-1.4, 6.8, 1], "down", TL), L("STOPGAP", [6.2, 7.2, -2])] }),
  ],
  s42: [
    spec({ env: "jktDay", track: false, canopy: false, vx: 0.6, vd: 1.9, cam: [{ at: [0, 3.4, -1], d: 22, yaw: -24, pitch: 10 }, { d: 18, yaw: 10, pitch: 8 }], items: (a) => { const g = a.w("agreed", 1.2); return <><Parliament p={[0, 0, -2]} s={1.35} lit={seg(a.t, g, g + 0.5)} /><Check t={a.t} at={g} p={[2.9, 2.0, 4]} s={0.95} />{a.t > g && <Confetti t={a.t} at={g} p={[0, 5, 1]} n={50} />}</>; },
      labels: [L("AGREED", [0, 8.6, -1.5], "down", OK)] }),
    spec({ env: "paper", vx: 1.0, vd: 2.45, cam: [{ at: [0, 2.4, 0], d: 22, yaw: -14, pitch: 24 }, { d: 20, yaw: 8, pitch: 19 }], items: (a) => <><CarGrid t={a.t} value={23} cols={6} gap={[1.45, 1.2]} s={1.15} lv="toei" p={[-3.6, 0, 0]} to={2.2} /><Factory t={a.t} p={[6.2, 0, -1]} s={1.05} ry={-0.25} /></>,
      labels: [L("23 USED TRAINS", [-3.6, 4.4, -2]), L("ONE CONDITION", [6.0, 7.0, -1], "down", TL)] }),
  ],
  s43: [
    spec({ env: "jktGrey", cam: [{ at: [0, 3, 0], d: 21, yaw: -18, pitch: 15 }, { d: 18, yaw: 8, pitch: 12 }], items: (a) => <><Crowd a={a} p={[-2, 0, 5]} n={28} cols={9} gap={[1.25, 1.05]} step={0.06} hot={1} /><Bar t={a.t} h={7} at={0.4} dur={2} p={[7.4, 0, 1]} w={1.8} /></>, labels: [L("369 M TRIPS", [-1.5, 5.2, 0])] }),
    spec({ env: "jktGrey", cam: [{ at: [0, 3, 0], d: 20, yaw: -30, pitch: 14 }, { at: [1.5, 2.4, 0.5], d: 17, yaw: -8, pitch: 13 }], items: (a) => { const m = a.w("missing", 1.2); return <><Pop t={a.t} out={m + 0.5} p={[-8.4, 0.3, 0]}><Train lv="krl" s={0.8} /></Pop><Cross t={a.t} at={m} p={[-5, 3, 2]} s={1.1} /><Crowd a={a} p={[3.6, 0, 6]} n={34} cols={8} gap={[1.05, 0.95]} step={0.045} hot={1} expr="tired" seed="f" /></>; }, labels: [L("FULLER", [4, 4.6, 2])] }),
    spec({ env: "paper", cam: [{ at: [0, 2.8, 0], d: 21, yaw: -18, pitch: 14 }, { d: 19, yaw: 10, pitch: 11 }], items: (a) => <><Pop t={a.t} at={0.2} p={[-9.6, 0, 1]}><Train lv="krl" s={0.45} /></Pop><Pop t={a.t} at={0.6} p={[-2.6, 0, -1]}><Parliament s={0.65} /></Pop><S a={a} p={[2.8, 0, 0.5]} s={0.95} ry={-0.15} expr="smug" at={1.0} /><R_ a={a} p={[7.4, 0, 1.5]} s={1.0} ry={-0.4} at={1.4} /></>, labels: [L("4 WANTS", [0, 6.8, 0])] }),
    spec({ env: "jkt", cam: stationCam, items: (a) => <><Train lv="krl" n={2} p={[-9, 0.3, 0]} move={a.t * 0.5} /><Clock t={a.t} p={[5, 4.6, 2.5]} s={1.2} rate={420} ry={-0.35} /><Crowd a={a} p={[4, 0.35, -4.8]} n={7} cols={7} /></>, labels: [L("WITHIN MONTHS", [5, 7.4, 2.5])] }),
    spec({ env: "jktDay", track: false, canopy: false, cam: [{ at: [0, 3, 0], d: 22, yaw: 22, pitch: 13 }, { d: 19, yaw: -6, pitch: 11 }], items: (a) => { const g = a.w("growing", 1.8); return <><Parliament p={[-6, 0, -1]} s={0.95} ry={0.3} /><Factory t={a.t} p={[5.2, 0, -1]} s={1.0 + 0.3 * seg(a.t, g, g + 0.7)} ry={-0.25} /><Arrow t={a.t} at={g - 0.5} a={[-3.4, 3.2, 1]} b={[3.0, 2.6, 1]} c="#2c8c86" w={0.22} /></>; }, labels: [L("HOME INDUSTRY", [5, 8, -1], "down", TL)] }),
    spec({ env: "tokyo", cam: charCam, items: (a) => { const b = a.w("books", 1.4); return <><S a={a} p={[-3.6, 0.3, 1.4]} s={1.15} ry={0.35} expr="smug" /><Pop t={a.t} out={b + 0.4} p={[3.8, 0.3, 1.8]}><Coins t={a.t} n={6} at={0.2} s={1.45} /></Pop><Cross t={a.t} at={b} p={[3.8, 2.4, 3.6]} s={1.15} /></>; }, labels: [L("OFF ITS BOOKS", [3.8, 5.0, 1.8])] }),
    spec({ env: "paper", cam: deskCam, items: (a) => { const c = a.w("cap", 1.6); return <><Doc t={a.t} p={[-3.4, 3.4, 0.5]} s={1.4} mark="no" markAt={c} ry={0.15} /><R_ a={a} p={[3.4, 0, 1.2]} s={1.35} ry={-0.85} expr="angry" hit={c} /></>; }, labels: [L("A CAP", [-3.4, 6.5, 0.5])] }),
  ],
  s45: [
    spec({ env: "paper", vx: 0, vd: 1.9, cam: charCam, items: (a) => <><R_ a={a} p={[3.0, 0, 0]} s={1.5} ry={-0.55} hit={2.2} /><K a={a} p={[-3.4, 0, 1.2]} s={1.35} ry={0.65} expr="shock" look={1} /></>, labels: [L("A RULE", [-0.6, 7.0, 0])] }),
    spec({ env: "paper", vx: 1.2, vd: 1.7, cam: [{ at: [-1.4, 2.4, 0], d: 19, yaw: -24, pitch: 17 }, { at: [1.4, 2.4, 0], d: 17, yaw: 8, pitch: 14 }], items: (a) => <>{age(a, 20, [0, 20], ["NEW", "LIMIT"], 2.6)}
      <Pop t={a.t} at={2.4} p={[timeX(20, [0, 30], 13), 0, -0.4]}><M g={G.box(0.3, 4, 3.4, 0.1)} c="#e0342c" p={[0, 2, 0]} o={{ opacity: 0.45, glow: 0.4 }} /></Pop></>, labels: [L("20 YEARS MAX", tx(20, [0, 30], 13, 4.6), "down", NO)] }),
  ],
  s46: [
    spec({ env: "paper", vx: 3.4, vd: 1.6, cam: [{ at: [0, 2.4, 0], d: 19, yaw: -20, pitch: 17 }, { at: [2.6, 2.4, 0], d: 15.5, yaw: 6, pitch: 13 }], items: (a) => <>{age(a, 28, [20, 25, 28], ["LIMIT", "25", "28"], 3.0)}<M g={G.box(0.3, 3.4, 3.4, 0.1)} c="#e0342c" p={[timeX(20, [0, 30], 13), 1.7, -0.4]} o={{ opacity: 0.4, glow: 0.4 }} /></>,
      labels: [L("25-28 YEARS", tx(26.5, [0, 30], 13, 3.8))] }),
    spec({ env: "paper", vx: -2, vd: 1.9, cam: tlCam, items: (a) => <>{tl(a, [1995, 2026], [1998, 2026], 2026, { dur: 3.0, w: 12, p: [-1, 0, 1.6], names: ["1998", "NOW"] })}<S a={a} p={[2.2, 0, -2.4]} s={0.95} expr="tired" at={0.3} /></>, labels: [L("SINCE 1998", [-1 + timeX(1998, [1995, 2026], 12), 3.4, 1.6], "down", TL)] }),
  ],
  s47: [
    spec({ env: "paper", cam: deskCam, items: (a) => <><R_ a={a} p={[3.8, 0, 0.5]} s={1.35} ry={-0.45} expr="smug" /><Doc t={a.t} p={[mix(2.4, -2.8, seg(a.t, 0.5, 1.4)), 3.4 + Math.sin(seg(a.t, 0.5, 1.4) * Math.PI) * 1.8, 1.6]} s={1.3} mark="no" markAt={1.8} /></>, labels: [L("TRANSPORT MINISTRY", [0, 7.2, 0])] }),
    spec({ env: "paper", cam: charCam, items: (a) => { const wr = a.w("wear", 1.4); return <><K a={a} p={[-3.2, 0, 0.8]} s={1.75} ry={0.35} expr="sad" /><Shirt t={a.t} p={[3.2, 3.6, 0.5]} s={2.0} hole={seg(a.t, wr, wr + 0.9)} fall={seg(a.t, wr + 0.8, a.dur) * 0.35} /></>; }, labels: [L("WEAR OUT", [3.2, 6.6, 0.5])] }),
    spec({ env: "paper", cam: [{ at: [0, 2.4, 0], d: 19, yaw: -14, pitch: 17 }, { at: [3, 2.4, 0], d: 15.5, yaw: 12, pitch: 13 }], items: (a) => <>{age(a, 30, [20, 30], ["20", "30"], 2.8)}<M g={G.box(timeX(30, [0, 30], 13) - timeX(20, [0, 30], 13), 0.1, 2.4, 0.04)} c="#ffd23f" p={[(timeX(30, [0, 30], 13) + timeX(20, [0, 30], 13)) / 2, 0.06, 0.5]} o={{ glow: 0.5 }} /></>,
      labels: [L("~10 YEARS LEFT", tx(25, [0, 30], 13, 4.0), "down", NO)] }),
    spec({ env: "paper", cam: [{ at: [0, 2.8, 0], d: 20, yaw: 20, pitch: 13 }, { d: 17.5, yaw: -8, pitch: 10 }], items: (a) => <><K a={a} p={[-5.4, 0, 2]} s={1.4} ry={0.5} expr="tired" pose="shrug" />
      <Gr p={[-3.2, 0, 3]} r={[0, 0, Math.sin(a.t * 2.4) * 0.08]}><M g={G.box(1.2, 1.3, 0.7, 0.12)} c="#e2573d" p={[0, 0.7, 0]} /><M g={G.torus(0.35, 0.06, Math.PI)} c="#8a3a2a" p={[0, 1.38, 0]} /></Gr>
      <M g={G.box(11, 0.5, 3.4, 0.1)} c="#d9ccae" p={[2.6, 0.25, -1.5]} /><Train lv="cn" p={[-1.2, 0.5, -1.5]} s={0.72} /><M g={G.box(11.2, 4.4, 3.6, 0.2)} c="#bfe9f7" p={[2.6, 2.7, -1.5]} o={{ opacity: 0.14 }} noShadow /><Coins t={a.t} n={6} at={a.w("shopping", 1.4) - 0.5} p={[7.4, 0, 2.4]} s={1.1} /></>, labels: [L("SHOPPING AGAIN", [0, 6.6, -1])] }),
  ],
  s48: [
    spec({ env: "grey", cam: [{ at: [0, 3, 0], d: 17, yaw: -24, pitch: 9 }, { d: 13.5, yaw: 12, pitch: 6 }], items: (a) => <><Gr p={[Math.sin(a.t * 30) * 0.05 * ((a.t % 1.7) < 0.3 ? 1 : 0), 0, 0]}><S a={a} p={[0, 0, 0]} s={1.45} expr="tired" sweat dim={0.35} /></Gr>
      {Array.from({ length: 18 }, (_, i) => { const q = (a.t * 0.4 + i / 18) % 1; return <M key={i} g={G.ball(0.11, 8)} c="#b0683a" p={[Math.sin(i * 5) * 2.6 + q * Math.cos(i), 5 - q * 4.6, 1.2 + Math.cos(i * 3)]} s={1 - q * 0.5} />; })}</>, labels: [L("HARDER", [0, 6.8, 0])] }),
    spec({ env: "grey", cam: deskCam, items: (a) => { const o = a.w("out", 1.6); return <><S a={a} p={[-4.8, 0, 1]} s={1.15} ry={0.5} expr="sad" dim={0.2} />
      <Gr p={[3.6, 0, -0.5]}>{[-2.4, 2.4].map((x) => <M key={x} g={G.box(0.25, 5, 1.4, 0.05)} c="#6f7690" p={[x, 2.5, 0]} />)}{[1.0, 2.7, 4.4].map((y) => <M key={y} g={G.box(5.1, 0.22, 1.5, 0.05)} c="#8a91aa" p={[0, y, 0]} />)}
        {Array.from({ length: 6 }, (_, i) => <Pop key={i} t={a.t} at={0.2 + i * 0.1} out={o - 0.7 + i * 0.12} p={[-1.4 + (i % 3) * 1.4, 1.58 + Math.floor(i / 3) * 1.7, 0]}><M g={G.box(1.0, 0.9, 0.9, 0.12)} c="#c9a37a" /><M g={G.box(1.02, 0.18, 0.92, 0.03)} c="#8a6a4a" /></Pop>)}</Gr>
      <Cross t={a.t} at={o} p={[3.6, 2.8, 1.6]} s={1.3} /></>; }, labels: [L("NO SPARE PARTS", [3.6, 6.6, -0.5])] }),
  ],
  s49: [
    spec({ env: "paper", vx: 0, vd: 1.75, cam: deskCam, items: (a) => <Doc t={a.t} p={[0, 3.4, 0.5]} s={1.7} mark="no" markAt={a.w("cancelled", 1.6)} />, labels: [L("NOV 5", [-4.6, 5.6, 0], "down", TL), L("CANCELLED", [4.8, 4.4, 0], "down", NO)] }),
    spec({ env: "jktDay", vx: 1.6, vd: 2.0, cam: stationCam, items: (a) => <><Train lv="cn" n={2} p={[-6.5, 0.3, 0]} move={mix(-10, 0, seg(a.t, 0, 2.2, (x) => 1 - (1 - x) ** 2.2))} /><K a={a} p={[5.2, 0.05, 3.6]} s={1.1} ry={-0.9} expr="happy" look={-1} />
      <M g={G.box(0.5, 4.2, 0.1, 0.05)} c="#ffffff" p={[mix(-8, 12, (a.t * 0.45) % 1), 2.4, 1.4]} r={[0, 0, -0.4]} o={{ opacity: 0.45, basic: true }} /><Check t={a.t} at={a.w("new", 1.4)} p={[4.8, 6.0, 1]} s={1.1} /></>, labels: [L("MUST BE NEW", [0, 5.6, 1.4], "down", OK)] }),
  ],
  s50: [
    spec({ env: "tokyo", parked: false, vx: 0, vd: 1.7, cam: charCam, items: (a) => <><K a={a} p={[0, 0.3, 1]} s={1.55} expr="tired" pose="shrug" />{[-6, 5.6].map((x, i) => <Gr key={x} p={[x, 0.4, -1.5]}><M g={G.box(5.4, 2.6, 1.8, 0.4)} c="#ffffff" p={[0, 1.5, 0]} o={{ opacity: 0.16 + 0.12 * Math.sin(a.t * 3 + i) }} noShadow /></Gr>)}</>, labels: [L("RAN OUT?", [0, 5.4, 1])] }),
    spec({ env: "tokyo", parked: false, vx: 1.2, vd: 2.1, cam: [{ at: [0, 3.2, -2], d: 21, yaw: -22, pitch: 17 }, { d: 18.5, yaw: 6, pitch: 14 }], items: (a) => <>{[[-10, 0, "toei"], [1.2, 0, "metro"], [-7, -5.6, "metro"], [3.4, -5.6, "toei"], [-12, -10.4, "toei"], [0, -10.4, "metro"]].map(([x, z, lv], i) => <Pop key={i} t={a.t} at={0.15 + i * 0.18} p={[x as number, 0.3, z as number]}><Train lv={lv as string} s={0.95} /></Pop>)}
      <K a={a} p={[4.8, 0.35, 2.4]} s={1.3} ry={-0.4} expr="shock" /><Cross t={a.t} at={0.4} p={[-2.2, 5.6, 2]} s={0.9} /></> }),
    spec({ env: "paper", vx: -0.8, vd: 2.4, cam: charCam, items: (a) => { const r = a.w("rule", 1.8); return <><Gr p={[0, -0.35 * seg(a.t, r, r + 0.3), 0]}><Train lv="metro" p={[-9.6, 0, -2]} s={0.78} dirt={0.45} /></Gr><R_ a={a} p={[3.2, 0, 1.2]} s={1.35} ry={-0.8} expr="smug" hit={r} /></>; }, labels: [L("TOO OLD", [-2.4, 5.4, -1], "down", NO)] }),
  ],
  s51: [
    spec({ env: "tokyo", track: false, cam: tlCam, items: (a) => <>{tl(a, [0, 40], [20, 30], 30, { dur: 2.8, w: 12, p: [-1.6, 0, 2] })}<S a={a} p={[6.6, 0, -0.5]} s={0.95} ry={-0.35} expr="tired" at={0.4} /></>, labels: [L("20-30 YEARS", [-1.6 + timeX(25, [0, 40], 12), 3.6, 2])] }),
    spec({ env: "tokyo", track: false, cam: [{ at: [-0.6, 2.4, 1], d: 19, yaw: -18, pitch: 17 }, { at: [1.8, 2.4, 1], d: 15.5, yaw: 10, pitch: 13 }], items: (a) => <>{tl(a, [0, 40], [20, 28], 28, { dur: 2.8, w: 12, c: "#e0342c", p: [0, 0, 1], names: ["LIMIT", "FOR SALE"] })}<M g={G.box(0.3, 3.6, 3.4, 0.1)} c="#e0342c" p={[timeX(20, [0, 40], 12), 1.8, 0.4]} o={{ opacity: 0.4, glow: 0.4 }} /></>, labels: [L("PAST LIMIT", [timeX(27, [0, 40], 12), 3.7, 1], "down", NO)] }),
  ],
  s52: [
    spec({ env: "paper", cam: tlCam, items: (a) => { const c = a.w("closed", 2.4); const shut = seg(a.t, c - 0.3, c + 0.2); return <>{tl(a, [2000, 2026], [2000, 2026], 2026, { dur: 3.2, names: ["OPEN", "CLOSED"] })}
      {[-1, 1].map((d) => <Gr key={d} p={[d * mix(3.4, 0.95, shut), 5.4, -1.5]}><M g={G.box(1.9, 3.4, 0.25, 0.12)} c="#a56c40" /><M g={G.box(1.4, 2.8, 0.3, 0.08)} c="#bfe9f7" o={{ glow: 0.3 }} /></Gr>)}<Cross t={a.t} at={c} p={[6.6, 3.9, 1.6]} s={0.8} /></>; }, labels: [L("2000", tx(2000, [2000, 2026], 13, 3.1), "down", TL)] }),
    spec({ env: "sea", cam: [{ at: [0, 2.6, 0], d: 19, yaw: -18, pitch: 15 }, { d: 17, yaw: 12, pitch: 12 }], items: (a) => { const s = a.w("shipped", 2.2); return <><M g={G.box(7, 0.7, 4, 0.15)} c="#c9a97d" p={[-4.8, 0.25, 0.8]} /><S a={a} p={[-4.8, 0.6, 0.8]} s={1.1} ry={0.35} expr="sad" dim={0.35 + 0.45 * seg(a.t, s, s + 0.8)} /><Ship t={a.t} n={3} p={[4 + a.t * 0.18, 0, -0.5]} s={0.82} ry={-0.2} /><Cross t={a.t} at={s} p={[4.2, 2.8, 2.4]} s={1.25} /></>; }, labels: [L("AGES OUT", [-4.8, 6.4, 0.8])] }),
  ],
  s53: [
    spec({ env: "jktGrey", cam: stationCam, items: (a) => <><K a={a} p={[-3.6, 0.05, 1.9]} s={1.6} ry={-0.5} expr="tired" pose="shrug" /><Crowd a={a} p={[3.4, 0.35, -3.2]} n={8} cols={4} gap={[1.5, 1.7]} /></>, labels: [L("WHAT NEXT?", [-1.6, 5.8, 2])] }),
    spec({ env: "paper", cam: [{ at: [0, 2.8, 0], d: 21, yaw: -20, pitch: 16 }, { d: 19, yaw: 10, pitch: 13 }], items: (a) => { const i1 = a.w("INKA", 0.5), i2 = a.w("old", 1.3), i3 = a.w("import", 2.1); return <>{[-6.6, 0, 6.6].map((x, i) => <Bar key={x} t={a.t} h={0.9} at={[i1, i2, i3][i] - 0.2} dur={0.4} p={[x, 0, 0]} w={4.8} c={["#e8772e", "#8a5a36", "#2c8c86"][i]} />)}
      <Pop t={a.t} at={i1} p={[-6.6, 0.9, 0]}><Factory t={a.t} s={0.68} /></Pop><S a={a} p={[0, 0.9, 0]} s={0.85} expr="tired" at={i2} /><Pop t={a.t} at={i3} p={[6.6, 0.8, 0]}><Ship t={a.t} n={3} s={0.46} /></Pop></>; }, labels: [L("3 OPTIONS", [0, 6.8, 0])] }),
  ],
  s54: [
    spec({ env: "sea", cam: [{ at: [0, 2.6, 0], d: 19, yaw: 22, pitch: 15 }, { d: 16, yaw: -8, pitch: 11 }], items: (a) => <><Ship t={a.t} n={3} p={[0, 0, 0]} s={1.15} /><Cross t={a.t} at={a.w("off", 1.2)} p={[0.5, 3.2, 2.8]} s={1.7} /></>, labels: [L("NO IMPORTS", [0, 6.6, 0], "down", NO)] }),
    spec({ env: "yard", cam: deskCam, items: (a) => <><S a={a} p={[-5.4, 0, 1]} s={1.1} ry={0.45} expr="tired" sweat /><Factory t={a.t * 2.4} p={[5, 0, -1.5]} s={1.15} ry={-0.25} /><Clock t={a.t} p={[0, 4.6, 0.5]} s={0.85} rate={360} ry={0} /></>, labels: [L("BUILD FASTER", [5, 7.6, -1.5], "down", TL)] }),
    spec({ env: "paper", cam: charCam, items: (a) => <><S a={a} p={[-3.8, 0, 0]} s={1.35} ry={0.4} expr="tired" sweat /><Cake t={a.t} at={a.w("forty", 0.8) - 0.6} p={[3.8, 0, 0.8]} n={14} s={1.15} /></>, labels: [L("PAST 40", [3.8, 4.6, 0.8])] }),
  ],
  s55: [
    spec({ env: "paper", cam: deskCam, items: (a) => <><Doc t={a.t} p={[0, 3.4, 0.5]} s={1.7} mark="ok" markAt={a.w("approved", 1.4)} />{a.t > a.w("approved", 1.4) && <Confetti t={a.t} at={a.w("approved", 1.4)} n={40} />}</>, labels: [L("APPROVED", [0, 6.9, 0], "down", OK)] }),
    spec({ env: "paper", cam: [{ at: [0, 2.6, 0], d: 21, yaw: -16, pitch: 24 }, { d: 19, yaw: 9, pitch: 18 }], items: (a) => <><Coins t={a.t} n={18} at={0.2} p={[-6.4, 0, 0.5]} s={1.25} step={0.065} /><CarGrid t={a.t} value={30} cols={6} gap={[1.45, 1.2]} s={1.15} lv="cn" p={[2.8, 0, 0]} from={a.w("thirty", 1.6) - 0.6} to={a.w("thirty", 1.6) + 1.4} /></>, labels: [L("RP 5 T", [-6.4, 6.6, 0.5], "down", TL), L("30 TRAINS", [2.8, 4.2, -2])] }),
  ],
  s56: [
    spec({ env: "paper", cam: [{ at: [0, 1.4, 0.8], d: 23, yaw: -14, pitch: 36 }, { d: 20.5, yaw: 8, pitch: 29 }], items: (a) => <><CarGrid t={a.t} value={84} cols={14} gap={[1.25, 1.0]} lv="inka" p={[0, 0, -2.2]} to={2.8} />{tl(a, [2026, 2030], [2026, 2030], 2030, { dur: 3.4, w: 11, p: [0, 0, 4.0], names: ["2026", "2030"] })}</>,
      labels: [L("84 TRAINS", [0, 3.2, -5]), L("1.4 M DAILY", [5.5, 2.8, 4], "down", TL)] }),
  ],
  s57: [
    spec({ env: "map", cam: [{ at: [1, 0, 0], d: 22, pitch: 58, yaw: 18 }, { at: [0, 0, 1], d: 16.5, pitch: 40, yaw: -12 }], items: (a) => map(a, [0, 1, 2, 3, 4].map((i) => ({ ...TJ, c: [1100 + (i % 3) * 90, 560 + i * 90] as [number, number], at: 0.2 + i * 0.45, dur: 2.2, color: ["#ffffff", "#ffd23f", "#ff9f6e"][i % 3] })), [["tokyo", 0.1], ["jakarta", 0.2]]), labels: [L("25 YEARS", [1.2, 3.0, 0])] }, [1500, 420]),
    spec({ env: "paper", cam: [{ at: [-0.8, 2.8, 0], d: 21, yaw: -22, pitch: 13 }, { at: [1.2, 2.8, 0], d: 18.5, yaw: 8, pitch: 11 }], items: (a) => { const g = a.w("aged", 1.6); return <><S a={a} p={[-7.4, 0, 0.5]} s={0.95} ry={0.4} expr="sad" dim={0.35} /><R_ a={a} p={[-2.6, 0, 1.2]} s={1.05} ry={-0.55} expr="smug" hit={g} /><Factory t={a.t} p={[6, 0, -2]} s={1.05} ry={-0.2} /><Train lv="inka" p={[mix(5, 1.2, seg(a.t, g, a.dur + 0.4)), 0, 2.6]} s={0.5} /></>; }, labels: [L("HOME-BUILT", [6, 7.0, -2], "down", TL)] }),
    spec({ env: "dusk", cam: [{ at: [0, 3, 0], d: 19, yaw: 18, pitch: 10 }, { d: 15, yaw: -9, pitch: 8 }], items: (a) => <><K a={a} p={[-4.2, 0, 1.6]} s={1.45} ry={0.6} expr="sad" /><Closet t={a.t} p={[2.4, 0, -0.5]} s={1.05}><Shirt t={a.t} p={[0.45, 3.5, 0.15]} s={0.9} hole={seg(a.t, 0.4, 1.2)} fall={seg(a.t, a.dur - 1.2, a.dur + 0.2)} /></Closet></>, labels: [L("NOVEMBER", [2.4, 7.4, 0])] }),
  ],
  s58: [
    spec({ env: "map", cam: [{ at: w(820, 780), d: 15, pitch: 55, yaw: -16 }, { at: w(750, 850), d: 9.5, pitch: 44, yaw: 8 }], items: (a) => map(a, [], [["jakarta", 0.2]], "jawa", <>{Array.from({ length: 100 }, (_, i) => { const lit = i < Math.floor(seg(a.t, 0.5, a.w("half", 1.8) + 0.6) * 56); return <M key={i} g={G.ball(0.1, 10)} c={lit ? "#e0342c" : "#fbf6ea"} p={w(520 + (i % 20) * 29, 822 + Math.floor(i / 20) * 15 + (i % 2) * 5, lit ? 0.95 + Math.sin(a.t * 3 + i) * 0.04 : 0.78)} s={lit ? 1.15 : 0.8} o={lit ? { glow: 0.35 } : undefined} />; })}</>, 0.6),
      labels: [L("OVER HALF", w(760, 830, 2.4))] }),
    spec({ env: "sea", cam: [{ at: [0, 2.2, 0], d: 15, yaw: -26, pitch: 22 }, { at: [0, 2.2, 0], d: 23, yaw: 12, pitch: 27 }], items: (a) => <><M g={G.cyl(9.6, 10.4, 0.8, 48)} c="#f3e3ae" p={[0, 0.05, -0.5]} s={[1, 1, 0.55]} /><M g={G.cyl(9, 9.4, 0.8, 48)} c="#86c474" p={[0, 0.35, -0.5]} s={[1, 1, 0.55]} />
      <M g={G.cone(2.6, 4.2, 24)} c="#8b9a62" p={[-5.4, 2.8, -2.4]} /><M g={G.cone(0.95, 1.5, 24)} c="#c4785a" p={[-5.4, 4.2, -2.35]} />{[[3.6, -2.6], [5.6, -1.4], [-2, -3], [1.4, -3.4], [7, -0.4]].map(([x, z], i) => <House key={i} p={[x, 0.75, z]} s={1.1} />)}
      <Palm t={a.t} p={[-7.4, 0.75, 1]} /><Palm t={a.t} p={[7.6, 0.75, 1.2]} seed={2} /><Crowd a={a} p={[0, 0.75, 2.4]} n={36} cols={12} gap={[1.05, 0.95]} s={0.68} step={0.04} pose="wave" /></>, labels: [L("WHY JAVA?", [0, 5.8, -1])] }, [750, 800]),
  ],
  /* thumbnail (script.thumbnails): komposisi dengan ruang judul di kiri atas */
  thumbA: [
    spec({ env: "jkt", cam: { at: [-2.4, 2.7, 0], d: 18, yaw: -24, pitch: 9 }, items: (a) => <><Train lv="krl" n={3} p={[3.5, 0.3, -3.2]} /><S a={a} p={[3.55, 0.1, 1.8]} s={1.28} ry={-0.4} expr="shock" sweat /></> }),
  ],
  thumbB: [
    spec({ env: "sea", cam: { at: [-0.4, 3.9, 0], d: 21.5, yaw: -22, pitch: 13 }, items: (a) => <><Ship t={a.t} n={3} p={[1.4, 0, 0.8]} s={1.25} ry={-0.25} /><Cross t={a.t} at={0.1} p={[4.4, 2.2, 3.6]} s={1.35} /></> }),
  ],
});
