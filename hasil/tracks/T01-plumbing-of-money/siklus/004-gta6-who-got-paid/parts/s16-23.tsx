// s16-s23: tangan ketiga (kartu) dan keempat (publisher), biaya pembuatan, titik balik modal.
import React from "react";
import { Easing } from "remotion";
import { R, clamp, keys, mix, pop, seg } from "@r3";
import { G, Gr, Hose, M, Pop, Rod, TextPlane, V3, poly } from "@r3/three";
import { Bag, CardGate, Coin, Face, HangLamp, LAMP, NIGHT, COLD, Paper, Room, S, Stack, State, Store, TOP, Table, Tower, back, s3 } from "./base";
import { Bank, CoinWall, Mountain, Path, Receipt, Spot, Tracker, cams, fly } from "./props";

const WARM = ["#ffb468", "#ff8a7a", "#b48ae8"], BLUE = ["#5a6ae0", "#9a6ad8", "#4fb8d8"];
const Warm: React.FC<{ t: number; rug?: boolean }> = ({ t, rug }) => <Room t={t} floor="#5a3354" bokeh={WARM} rug={rug ? "#6f3f66" : undefined} />;

/** Koin bertanda tanya. */
const QCoin: React.FC<{ t: number; p: V3; s?: number }> = ({ t, p, s = 1 }) => (
  <Gr p={p} r={[0, Math.sin(t * 2.4) * 0.5, 0]} s={s}><S g={G.cyl(1.2, 1.2, 0.35, 48)} c="#f4ad22" glow={0.25} r={[Math.PI / 2, 0, 0]} /><S g={G.torus(1.08, 0.14)} c="#ffd766" glow={0.3} p={[0, 0, 0.1]} /><TextPlane text="?" h={1.7} color="#5a3410" p={[0, 0, 0.22]} /></Gr>
);

/* ---------- s16 ---------- */
export const s16 = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => { const who = a.w("Who", 2.5), no = a.w("Not", 5.6) - 0.4; return cams(a, [[0, -1.6, 3.6, 19, -14, 20], [who, 0, 4.2, 17, 0, 18], [no, 0.6, 4.2, 18, 6, 16], [a.dur, 2.6, 4.0, 17, 14, 14]]); },
  items: (a) => { const who = a.w("Who", 2.5), no = a.w("Not", 5.6) - 0.5; const go = seg(a.t, no, a.dur);
    return <>
      <Warm t={a.t} rug />
      <Table r={4.4} />
      <CardGate t={a.t} p={[mix(-12, -5.6, seg(a.t, 0.05, 1.4, Easing.out(Easing.cubic))), 0, -0.6]} s={1} ry={0.35} />
      <Gr r={[0, Math.sin(Math.max(0, a.t - no) * 11) * 0.28 * (a.t > no ? 1 - go * 0.5 : 0), 0]} p={[6.4, 0, -1]}><Tower t={a.t} p={[0, -0.3, 0]} h={4.6} s={0.9} e={a.t > no ? "stern" : "calm"} /></Gr>
      <Pop t={a.t} at={who - 0.3} p={fly(a.t, no, no + 1.2, [0.2, 5.4, 0], [-3.6, 7.2, -1], 0.8)}><QCoin t={a.t} p={[0, Math.sin(a.t * 2.6) * 0.2, 0]} /></Pop>
    </>; },
  hud: (a) => <Tracker a={a} n={3} />,
  labels: [["HAND 3", [-5.6, 7.0, -0.6], "down", "#13966a"], ["CARD FEE", [0.2, 3.2, 1.5], "up", "#13966a"]],
});

/* ---------- s17: merchant of record ---------- */
export const s17a = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, -1.2, 3.6, 18, -16, 10], [a.dur, 1.6, 4.0, 17, 8, 9]]),
  items: (a) => { const print = seg(a.t, a.w("seller", 2.4) - 1.2, a.w("seller", 2.4) + 0.6); return <>
    <Warm t={a.t} />
    <Store t={a.t} p={[-2.6, 0, -0.6]} s={1.2} e="happy" />
    <Gr p={[2.8, 0, 0.8]}><S g={G.box(3.8, 0.5, 1.0, 0.24)} c="#241a2e" p={[0, 6.4, 0]} /><Gr p={[0, 6.2 - print * 2.1, 0]} s={[1, Math.max(0.04, print), 1]}><Receipt p={[0, 0, 0]} len={4.2} /></Gr></Gr>
    <Bag t={a.t} p={[7.0, 0, 1]} s={0.8} />
  </>; },
  hud: (a) => <Tracker a={a} n={3} />,
});
export const s17b = s3({
  sky: LAMP, aperture: 2,
  cam: (a) => { const card = a.w("card", 2) - 0.4; return cams(a, [[0, -1.6, 5.6, 9.5, -5, 4], [card, -1.4, 5.0, 11, 0, 5], [card + 1.2, 1.6, 4.0, 18, 10, 11], [a.dur, 2.0, 3.8, 18.5, 4, 12]]); },
  items: (a) => { const ch = a.w("charges", 2.7); const hit = seg(a.t, ch - 0.35, ch, Easing.in(Easing.quad)); return <>
    <Warm t={a.t} />
    <Receipt p={[-1.6, 4.0, 0]} len={4.8} s={1.05} top="CONSOLE STORE" stamp={hit} />
    <CardGate t={a.t} p={[5.0, 0, -0.5]} s={1.05} ry={-0.45} e="stern" />
    <Path a={[4.0, 4.8, 0.6]} b={[0.6, 2.8, 1]} k={seg(a.t, ch - 1.1, ch - 0.35)} c="#46cfa8" w={0.22} />
    <Tower t={a.t} p={[-9, -0.4, -5]} h={3.8} s={0.75} e="wait" />
  </>; },
  hud: (a) => <Tracker a={a} n={3} />,
  labels: [["STORE NAME", [-4.3, 6.2, 0.2], "right", "#2f66b8"]],
});
export const s17c = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 0, 3.8, 16, 14, 11], [a.dur, 0, 3.8, 13.5, -6, 8]]),
  items: (a) => { const m = a.w("merchant", 1.6); const k = seg(a.t, m - 0.4, m + 0.15, back); return <>
    <Warm t={a.t} />
    <Store t={a.t} p={[0, 0, -0.4]} s={1.25} e="smug" />
    {a.t > m - 0.4 && <Gr p={[1.5, 2.6, 1.6 + (1 - Math.min(1, k)) * 4]} r={[0, 0, Math.sin(a.t * 2) * 0.1]} s={k}><S g={G.cyl(0.85, 0.85, 0.28, 40)} c="#ffd766" glow={0.4} r={[Math.PI / 2, 0, 0]} /><S g={G.torus(0.85, 0.12)} c="#f4ad22" /><S g={G.ball(0.32)} c="#e2573d" p={[0, 0, 0.18]} />{[-1, 1].map((d) => <S key={d} g={G.box(0.45, 1.3, 0.12, 0.1)} c="#e2573d" p={[d * 0.35, -1.1, -0.1]} r={[0, 0, d * 0.35]} />)}</Gr>}
  </>; },
  hud: (a) => <Tracker a={a} n={3} />,
  labels: [["MERCHANT OF RECORD", [0, 7.5, -0.4], "down", "#2f66b8"]],
});

/* ---------- s18: biaya kartu ---------- */
export const s18 = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => { const ty = a.w("typical", 4.3), co = a.w("company", 9.3); return cams(a, [[0, -1.4, 3.6, 18, -12, 22], [ty, 0, 3.6, 16.5, 0, 18], [co - 0.4, 0.4, 3.8, 18, 6, 16], [co + 1.2, 2.8, 4.0, 18.5, 14, 13], [a.dur, 3.0, 4.0, 17, 9, 12]]); },
  items: (a) => { const ty = a.w("typical", 4.3), two = a.w("two", 8.1), co = a.w("company", 9.3); const lift = seg(a.t, ty, two + 0.3); return <>
    <Warm t={a.t} rug />
    <Table r={4.6} />
    <Store t={a.t} p={[-6.8, 0, -1]} s={0.9} ry={0.4} e={lift > 0.5 ? "stern" : "smug"} />
    <CardGate t={a.t} p={[3.2, 0, -3.8]} s={0.9} ry={-0.2} />
    {Array.from({ length: 4 }, (_, i) => <Stack key={i} n={6} p={[-3.0 + i * 0.75, TOP, 0.4]} s={0.95} />)}
    {[0, 1].map((i) => <Coin key={i} s={1.0} glow={0.45} c="#46cfa8" hi="#a8f4dc" p={fly(a.t, ty + i * 0.35, two + 0.2 + i * 0.35, [-0.75, TOP + 0.95 + i * 0.18, 0.4], [2.0 + i * 1.0, TOP + 0.7, -2.4], 2.4)} />)}
    <Pop t={a.t} at={co - 0.2} p={[6.4, 4.2, 1]} r={[0, -0.35, 0.05]}>
      <S g={G.box(3.8, 3.0, 0.25, 0.25)} c="#cfe6ff" glow={0.25} o={0.62} />
      {[0, 1, 2].map((i) => <group key={i}><S g={G.box(1.5, 0.26, 0.1, 0.1)} c="#5a6a8a" p={[-0.75, 0.8 - i * 0.75, 0.18]} />{[0, 1, 2, 3, 4].map((j) => <S key={j} g={G.ball(0.24, 12)} c="#6a7aa0" o={0.35 + 0.15 * Math.sin(a.t * 2 + i + j)} p={[0.35 + j * 0.28, 0.8 - i * 0.75, 0.2]} cast={false} />)}</group>)}
    </Pop>
  </>; },
  hud: (a) => <Tracker a={a} n={3} />,
  labels: [["≈ $2", [2.6, 4.9, -2.4], "down", "#13966a"], ["NOT PUBLIC", [6.4, 6.6, 1], "down", "#6a6480"]],
});

/* ---------- s19: video tersendiri ---------- */
export const s19a = s3({
  sky: NIGHT,
  cam: (a) => cams(a, [[0, 0, 3.4, 16, -14, 16], [a.dur, 0, 3.4, 18.5, 12, 14]]),
  items: (a) => { const br = a.w("split", 1.8) - 0.5; const dest: V3[] = [[-6.4, 3.6, -1], [0, 5.2, -2.5], [6.4, 3.6, -1]]; const at = [a.w("bank", 2.9), a.w("network", 3.6), a.w("payment", 4.9)]; return <>
    <Room t={a.t} floor="#2a2358" bokeh={BLUE} />
    <Bank t={a.t} p={[-6.4, 0, -1]} s={0.6} e="happy" />
    <Gr p={[0, 0, -2.5]}><S g={G.ball(1.5, 36)} c="#46cfa8" p={[0, 2.2, 0]} />{[0, 1, 2].map((i) => <S key={i} g={G.torus(2.1, 0.09)} c="#bdf4e2" glow={0.4} p={[0, 2.2, 0]} r={[1.1 + i * 0.9, a.t * 0.4 + i, 0]} />)}<Face t={a.t} p={[0, 2.2, 1.52]} s={0.9} e="busy" /></Gr>
    <Gr p={[6.4, 0, -1]}><S g={G.box(3.0, 2.4, 1.8, 0.7)} c="#b48ae8" p={[0, 1.3, 0]} /><S g={G.box(2.2, 0.35, 1.82, 0.16)} c="#7a4a8e" p={[0, 2.2, 0]} /><Face t={a.t} p={[0, 1.3, 0.95]} s={0.9} e="calm" seed={7} /></Gr>
    {a.t < br && [0, 1].map((i) => <Coin key={i} s={2.2} p={[(i - 0.5) * 1.7, 3.0 + Math.sin(a.t * 3 + i) * 0.2, 1.5]} r={[Math.PI / 2, 0, i * 0.3]} />)}
    {a.t >= br && dest.map((d, i) => <Coin key={i} s={1.1} glow={0.4} p={fly(a.t, br + i * 0.12, at[i] + 0.2, [0, 3.0, 1.5], [d[0], d[1] + 0.9, d[2] + 1.2], 2.2)} r={[Math.PI / 2 + a.t * 2, 0, 0]} />)}
  </>; },
  hud: (a) => <Tracker a={a} n={3} />,
});
export const s19b = s3({
  sky: LAMP, aperture: 1.8,
  cam: (a) => cams(a, [[0, 0, 3.0, 18, -8, 28], [a.dur, 2.6, 2.8, 14, 8, 22]]),
  items: (a) => { const u = seg(a.t, 0.1, 1.3); return <>
    <Warm t={a.t} />
    <Table r={5} />
    <Gr p={fly(a.t, 0.1, 1.3, [0, 6, 0], [4.0, 2.7, 2.4], 1.2)} r={[-u * 1.25, 0, 0.14]} s={1.3 - u * 0.4}>
      <S g={G.box(2.8, 2.8, 0.16, 0.12)} c="#ffe27a" glow={0.28} />
      {[-0.75, 0, 0.75].map((x) => <S key={x} g={G.ball(0.3)} c={["#8fd0c8", "#46cfa8", "#b48ae8"][Math.round(x / 0.75) + 1]} p={[x, 0.45, 0.2]} />)}
      <S g={G.box(1.9, 0.15, 0.05, 0.03)} c="#a8893a" p={[0, -0.35, 0.11]} /><S g={G.box(1.4, 0.15, 0.05, 0.03)} c="#a8893a" p={[-0.25, -0.75, 0.11]} />
    </Gr>
    <Stack n={7} p={[-2.4, TOP, 0]} />
  </>; },
  hud: (a) => <Tracker a={a} n={3} />,
  labels: [["NEXT VIDEO", [4.0, 4.4, 2.4], "down", "#a8503c"]],
});

/* ---------- s20: publisher ---------- */
export const s20 = s3({
  sky: LAMP, aperture: 1.4, vd: 1.9,
  cam: (a) => { const st = a.w("That's", 6.3); return cams(a, [[0, 2.8, 3.6, 18, 18, 18], [a.w("left", 2.6), 0.8, 3.6, 18.5, 6, 18], [st - 0.9, 0.6, 3.8, 19, 0, 16], [st, 0, 4.8, 19, -4, 7], [a.dur, 1.0, 4.8, 18.5, -12, 7]]); },
  items: (a) => { const left = a.w("left", 2.6), st = a.w("That's", 6.3); const wall = a.t > st - 0.35; return <>
    <Warm t={a.t} rug />
    <Tower t={a.t} p={[mix(7.0, 7.6, seg(a.t, st - 0.5, st)), -0.3, -0.8]} h={5} s={0.95} ry={-0.4} e={a.t > left ? "happy" : "patient"} />
    {!wall && <><Table r={4.6} />{Array.from({ length: 5 }, (_, i) => { const p = fly(a.t, left - 0.9 + i * 0.12, left + 0.6 + i * 0.12, [-2.4 + i * 0.8, TOP, 0.3], [2.2 + (i % 3) * 0.8, TOP, 0.2 + (i % 2) * 0.8], 0.3); return <Stack key={i} n={8} p={p} />; })}</>}
    {wall && <CoinWall t={a.t - (st - 0.35)} p={[-1.6, 4.5, 0]} cols={10} rows={8} color={(_, col) => (col < 7 ? ["#e8772e", "#ffb878"] : undefined)} />}
  </>; },
  hud: (a) => <Tracker a={a} n={4} />,
  labels: [["HAND 4", [7.0, 7.6, -0.8], "down", "#c9742f"], ["$55.99", [2.9, 4.6, 0.6], "down", "#c9742f"], ["70%", [-2.7, 8.6, 0.4], "down", "#c9742f"]],
});

/* ---------- s21: gunung biaya ---------- */
export const s21 = s3({
  sky: NIGHT, aperture: 1.3, vd: 1.9,
  cam: (a) => { const cost = a.w("cost", 3.1), built = a.w("built", 8.7), never = a.w("Rockstar", 10.9); return cams(a, [[0, 3.6, 2.8, 12.5, 8, 14], [cost - 1.2, 3.4, 2.8, 13, 4, 13], [cost + 0.8, -0.6, 4.4, 24, -8, 12], [built - 0.4, -1.0, 4.2, 22, -4, 10], [built + 1.0, -1.0, 3.4, 22, 8, 12], [never, -2.0, 4.6, 19, 2, 9], [a.dur, -2.2, 4.8, 17, -8, 8]]); },
  items: (a) => { const cost = a.w("cost", 3.1), built = a.w("built", 8.7), conf = a.w("Rockstar", 10.9); const k = seg(a.t, cost - 1.0, cost + 1.2); return <>
    <Room t={a.t} floor="#2a2358" bokeh={BLUE} />
    <Tower t={a.t} p={[6.2, -0.3, 1.2]} h={3.8} s={0.8} ry={-0.3} e={a.t > cost ? "wait" : "happy"} />
    {[0, 1, 2].map((i) => <Stack key={i} n={6 - i} p={[3.4 + i * 0.75, 0, 2.6]} />)}
    <Mountain t={a.t} p={[-3.0, 0, -3]} k={k} s={1.15} />
    {a.t > built - 0.2 && <Gr p={[0, 0.9, 1.4]}>
      <S g={G.box(12, 0.3, 0.7, 0.14)} c="#fff2d8" p={[-3, 0, 0]} s={[seg(a.t, built - 0.2, built + 0.5), 1, 1]} />
      {Array.from({ length: 12 }, (_, i) => <Pop key={i} t={a.t} at={built + i * 0.11} p={[-8.5 + i, 0.5, 0]}><S g={G.box(0.7, 0.75, 0.25, 0.14)} c={i % 2 ? "#e2573d" : "#46cfa8"} glow={0.2} /></Pop>)}
    </Gr>}
    <Pop t={a.t} at={conf} p={[-1.0, 5.2, 0]} r={[0, 0, -0.2 + Math.sin(a.t * 2.4) * 0.12]}><Rod a={[-1.4, 1.2, -0.6]} b={[0, 0.5, 0]} w={0.04} c="#fff2d8" /><S g={G.box(2.3, 1.4, 0.18, 0.3)} c="#fff8ea" glow={0.3} /><S g={G.ball(0.14)} c="#7a423e" p={[-0.8, 0.3, 0.14]} /></Pop>
  </>; },
  hud: (a) => <Tracker a={a} n={4} />,
  labels: [["$1B+", [-3.0, 8.4, -3], "down", "#a8503c"], ["10+ YEARS", [-4.6, 2.2, 1.4], "down", "#13966a"], ["UNCONFIRMED", [1.9, 6.4, 0], "left", "#6a6480"]],
});

/* ---------- s22: 18 juta unduhan ---------- */
export const s22a = s3({
  sky: NIGHT, aperture: 1.3,
  cam: (a) => { const ei = a.w("eighteen", 3.5); return cams(a, [[0, 1.6, 4.2, 21, 12, 14], [ei, 0, 4.2, 22, 0, 12], [a.dur, -1, 4.0, 20, -10, 11]]); },
  items: (a) => { const t0 = a.w("billion", 1.7) - 0.6, end = a.w("pay", 5.5) + 0.5; const eaten = seg(a.t, t0 + 0.7, end); return <>
    <Room t={a.t} floor="#2a2358" bokeh={BLUE} />
    <Mountain t={a.t} p={[-2.6, 0, -2]} k={1 - eaten * 0.88} s={1.2} />
    <Tower t={a.t} p={[7.4, -0.3, 0]} h={3.8} s={0.8} ry={-0.35} />
    {Array.from({ length: 18 }, (_, i) => { const s0 = t0 + i * ((end - t0 - 0.7) / 18), u = seg(a.t, s0, s0 + 0.75, Easing.in(Easing.quad)); const target: V3 = [-2.6 + (R(i, 2) - 0.5) * 5, 1.2 + (1 - i / 18) * 5.5, -1];
      if (a.t < s0 || u >= 1) { const b = seg(a.t, s0 + 0.75, s0 + 1.05, Easing.linear); return b > 0 && b < 1 ? <S key={i} g={G.ball(0.6, 12)} c="#fff2d8" glow={1} o={1 - b} s={0.4 + b * 1.6} p={target} cast={false} /> : null; }
      return <GameBoxFly key={i} p={fly(a.t, s0, s0 + 0.75, [9, 7 + (i % 3), 3], target, 1.4)} spin={a.t * 6 + i} />; })}
  </>; },
  hud: (a) => <Tracker a={a} n={4} />,
  labels: [["≈ 18M", [2.6, 7.6, 0], "down", "#a8503c"]],
});
const GameBoxFly: React.FC<{ p: V3; spin: number }> = ({ p, spin }) => <Gr p={p} r={[spin * 0.4, spin, 0]}><S g={G.box(0.9, 1.2, 0.3, 0.12)} c="#46cfa8" glow={0.25} /><S g={G.box(0.6, 0.45, 0.08, 0.06)} c="#fff2d8" glow={0.3} p={[0, 0.1, 0.17]} /></Gr>;
export const s22b = s3({
  sky: NIGHT,
  cam: (a) => cams(a, [[0, 0.8, 3.4, 17, 18, 14], [a.dur, -0.4, 3.4, 15, -6, 11]]),
  items: (a) => <>
    <Room t={a.t} floor="#2a2358" bokeh={BLUE} />
    <Gr p={[0, 0, 0]}>
      <S g={G.box(0.5, 3, 0.5, 0.2)} c="#6f6a8a" p={[-2.4, 1.5, -0.2]} /><S g={G.box(0.5, 3, 0.5, 0.2)} c="#6f6a8a" p={[2.4, 1.5, -0.2]} />
      <Pop t={a.t} at={0.1} p={[0, 4.4, 0]} r={[0, Math.sin(a.t * 1.2) * 0.12, 0]}><S g={G.box(7.6, 3.6, 0.5, 0.35)} c="#ffd766" glow={0.22} /><S g={G.box(6.8, 2.9, 0.15, 0.25)} c="#e2573d" glow={0.2} p={[0, 0, 0.3]} /><Gr p={[-1.8, 0, 0.7]} s={0.9}><S g={G.cone(1.0, 1.8, 28)} c="#fff2d8" r={[0, 0, Math.PI / 2]} /><S g={G.cyl(0.3, 0.3, 0.9, 16)} c="#fff2d8" p={[1.0, -0.5, 0]} /></Gr>{[0, 1, 2].map((i) => <S key={i} g={G.torus(0.55 + i * 0.45, 0.1, 1.4)} c="#fff2d8" glow={0.4} p={[-0.2, 0, 0.55]} r={[0, 0, -0.7]} s={1 + Math.sin(a.t * 5 - i) * 0.06} />)}</Pop>
    </Gr>
    <Stack n={4} p={[6.2, 0, 1]} />
  </>,
  hud: (a) => <Tracker a={a} n={4} />,
  labels: [["MARKETING", [0, 7.2, 0], "down", "#e2573d"]],
});
const NL: [number, number][] = [[-1.2, 3.4], [0.6, 3.8], [2.6, 3.4], [2.5, 1.6], [3.0, 0.6], [1.7, 0.1], [2.0, -2.4], [1.1, -3.4], [0.7, -1.8], [-1.0, -1.7], [-2.9, -2.2], [-3.1, -1.3], [-1.9, -1.0], [-2.8, -0.2], [-2.1, 0.7], [-1.5, 2.2]];
const inside = (x: number, y: number) => { let c = false; for (let i = 0, j = NL.length - 1; i < NL.length; j = i++) { const [xi, yi] = NL[i], [xj, yj] = NL[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
const DOTS: [number, number][] = []; for (let y = -3.3; y < 3.8; y += 0.34) for (let x = -3.1; x < 3.1; x += 0.34) if (inside(x, y)) DOTS.push([x, y]);
export const s22c = s3({
  sky: NIGHT, aperture: 1.2,
  cam: (a) => cams(a, [[0, 0, 4.6, 12, -12, 6], [a.w("Netherlands", 2.5) + 0.4, 0, 4.6, 19, 0, 6], [a.dur, 0, 4.6, 17.5, 12, 6]]),
  items: (a) => { const k = seg(a.t, 0.15, a.w("buying", 3.2) + 0.8) * DOTS.length; return <>
    <Room t={a.t} floor="#2a2358" bokeh={BLUE} />
    <Gr p={[0, 4.5, 0]} r={[-0.08, Math.sin(a.t * 0.8) * 0.1, 0]} s={1.12}>
      <M g={G.ext("nl", () => poly(NL), 0.6, 0.22)} c="#3d3a86" />
      {DOTS.map(([x, y], i) => i > k ? null : <S key={i} g={G.box(0.2, 0.26, 0.14, 0.05)} c={i % 4 ? "#ffd766" : "#7ff0d8"} glow={0.6} p={[x * 0.97, y * 0.97, 0.55 + Math.sin(a.t * 3 + i * 0.4) * 0.03]} s={clamp((k - i) / 6)} cast={false} />)}
    </Gr>
  </>; },
  hud: (a) => <Tracker a={a} n={4} />,
  labels: [["≈ NETHERLANDS", [4.6, 7.0, 0.6], "left", "#2f66b8"]],
});

/* ---------- s23: 32,5 juta ---------- */
export const s23 = s3({
  sky: NIGHT, aperture: 1.3,
  cam: (a) => { const ev = a.w("Even", 5.2); return cams(a, [[0, 0, 4.2, 20, -14, 12], [ev, 0, 4.2, 18.5, 2, 10], [ev + 1.6, 2.0, 4.0, 20, 14, 12], [a.dur, 2.6, 4.0, 18, 6, 10]]); },
  items: (a) => { const th = a.w("thirty-two", 0.9), ev = a.w("Even", 5.2); const g = seg(a.t, th - 0.3, th + 1.4, back); const melt = seg(a.t, ev + 1.2, ev + 3.0); const H = 7.2; return <>
    <Room t={a.t} floor="#2a2358" bokeh={BLUE} />
    <S g={G.box(2.2, 1, 1.6, 0.14)} c="#e8772e" glow={0.18} p={[-2.2, Math.max(0.05, H * g) / 2, 0]} s={[1, Math.max(0.05, H * g), 1]} />
    <S g={G.box(2.2, 1, 1.6, 0.14)} c="#8f86c8" glow={0.1} p={[1.0, (H * 18 / 32.5) / 2, 0]} s={[1, H * 18 / 32.5, 1]} />
    <S g={G.box(8.4, 0.14, 0.18, 0.06)} c="#fff2d8" glow={0.6} p={[-0.6, H * 18 / 32.5, 0.95]} s={[seg(a.t, 0.3, 1.0), 1, 1]} />
    <Gr p={[-6.4, 0, 1]}><Rod a={[0, 0, 0]} b={[0, 4.4, 0]} w={0.12} c="#fff2d8" /><Pop t={a.t} at={a.w("before", 3.5)} p={[1.0, 3.8, 0]} r={[0, Math.sin(a.t * 3) * 0.25, 0]}><S g={G.box(1.9, 1.2, 0.16, 0.14)} c="#e2573d" glow={0.25} /><S g={G.cone(0.34, 0.6, 20)} c="#fff2d8" r={[0, 0, -Math.PI / 2]} p={[0, 0, 0.16]} /></Pop></Gr>
    <Mountain t={a.t} p={[7.8, 0, -4.5]} k={0.55 * (1 - melt)} s={0.85} />
    <Gr s={[1 + Math.sin(melt * Math.PI) * 0.06, 1 - Math.sin(melt * Math.PI) * 0.06, 1]} p={[6.4, 0, 0]}><Tower t={a.t} p={[0, -0.3, 0]} h={4.4} s={0.85} ry={-0.35} e={melt > 0.6 ? "happy" : "wait"} /></Gr>
    {melt > 0.5 && Array.from({ length: 5 }, (_, i) => { const q = ((a.t * 0.9 + i / 5) % 1); return <S key={i} g={G.ball(0.24, 12)} c="#dfe8ff" o={0.7 * (1 - q)} p={[4.6 - q * 2, 4.6 + Math.sin(i) * 0.4 + q, 1.2]} s={0.5 + q} cast={false} />; })}
  </>; },
  hud: (a) => <Tracker a={a} n={4} />,
  labels: [["32.5M", [-2.2, 8.4, 0], "down", "#c9742f"], ["18M", [2.6, 4.9, 0.9], "down", "#6a6480"]],
  bubble: (a) => ({ at: [5.2, 6.6, 0.5], p: pop(a.t, a.dur - 2.0, 0.25) }),
});
