// s24-s37: jam pembayaran, "adil?", pembagian akhir, penutup. Juga dua gambar thumbnail.
import React from "react";
import { Easing } from "remotion";
import { R, clamp, keys, mix, pop, seg } from "@r3";
import { G, Gr, Hose, M, Pop, Rod, TextPlane, V3, poly } from "@r3/three";
import { Bag, CardGate, Coin, Face, HangLamp, LAMP, NIGHT, COLD, Paper, Room, S, Stack, State, Store, TOP, Table, Tower, back, ease, s3 } from "./base";
import { Bank, Calendar, CoinWall, Confetti, ConsoleBox, Courtroom, Doorway, Gavel, Mountain, Newspaper, Path, Receipt, Spot, Truck, cams, fly } from "./props";

const WARM = ["#ffb468", "#ff8a7a", "#b48ae8"], BLUE = ["#5a6ae0", "#9a6ad8", "#4fb8d8"], COOL = ["#8fd0ff", "#b8c8ff"];
const Warm: React.FC<{ t: number; rug?: boolean }> = ({ t, rug }) => <Room t={t} floor="#5a3354" bokeh={WARM} rug={rug ? "#6f3f66" : undefined} />;
const Cold: React.FC<{ t: number }> = ({ t }) => <Room t={t} floor="#2f3a5e" bokeh={COOL} />;
const Night: React.FC<{ t: number }> = ({ t }) => <Room t={t} floor="#2a2358" bokeh={BLUE} />;

/** Jam dinding besar; angle = putaran jarum panjang. coins = jarum dari koin. */
const BigClock: React.FC<{ p: V3; angle: number; s?: number; coins?: boolean }> = ({ p, angle, s = 1, coins = true }) => (
  <Gr p={p} s={s}>
    <S g={G.cyl(2.3, 2.3, 0.55, 64)} c="#a8644e" r={[Math.PI / 2, 0, 0]} /><S g={G.cyl(1.98, 1.98, 0.64, 64)} c="#fff6e4" glow={0.22} r={[Math.PI / 2, 0, 0]} /><S g={G.torus(2.14, 0.18)} c="#ffcf3f" glow={0.25} p={[0, 0, 0.3]} />
    {Array.from({ length: 12 }, (_, i) => <S key={i} g={G.ball(0.09, 8)} c="#8a6a4a" p={[Math.sin((i * Math.PI) / 6) * 1.6, Math.cos((i * Math.PI) / 6) * 1.6, 0.34]} />)}
    <Gr r={[0, 0, -angle]}>{coins ? [1, 2, 3].map((i) => <Coin key={i} p={[0, i * 0.47, 0.52]} r={[Math.PI / 2, 0, 0]} s={0.56} />) : <Rod a={[0, 0, 0.45]} b={[0, 1.5, 0.45]} w={0.1} c="#26222b" />}</Gr>
    <Gr r={[0, 0, -angle / 12]}>{coins ? [1, 2].map((i) => <Coin key={i} p={[0, i * 0.5, 0.42]} r={[Math.PI / 2, 0, 0]} s={0.68} c="#e2573d" hi="#ff9a80" />) : <Rod a={[0, 0, 0.4]} b={[0, 1.0, 0.4]} w={0.15} c="#e2573d" />}</Gr>
    <S g={G.ball(0.22)} c="#2a1c40" p={[0, 0, 0.62]} />
  </Gr>
);
const Four: React.FC<{ t: number; e?: "happy" | "wait" }> = ({ t, e = "happy" }) => (
  <>
    <State t={t} p={[-6.6, 0, -1.4]} s={0.78} ry={0.4} e={e === "happy" ? "calm" : "wait"} /><Store t={t} p={[-2.5, 0, -4.9]} s={0.78} e={e} />
    <CardGate t={t} p={[2.4, 0, -4.9]} s={0.78} e={e} /><Tower t={t} p={[6.8, -0.3, -1.6]} h={4.4} s={0.8} ry={-0.4} e={e} />
  </>
);
/** Tumpukan di depan tiap kursi; grey = 0..1 memudar jadi bayangan. */
const SeatStacks: React.FC<{ grey: number }> = ({ grey }) => (
  <>{([[-3.4, 0.1, 3], [-1.4, -2.2, 8], [1.4, -2.2, 2], [3.4, 0.1, 12]] as [number, number, number][]).map(([x, z, n], i) => (
    <Gr key={i} p={[x, TOP, z]}>{Array.from({ length: n }, (_, j) => <Coin key={j} p={[0, 0.07 + j * 0.14, 0]} c={grey > 0.5 ? "#a4a8bc" : undefined} hi={grey > 0.5 ? "#cdd0de" : undefined} glow={grey > 0.5 ? 0.05 : 0.18} />)}</Gr>
  ))}</>
);

/* ---------- s24 ---------- */
export const s24 = s3({
  sky: LAMP, aperture: 1.5,
  cam: (a) => cams(a, [[0, 0, 4.0, 20, -10, 18], [a.dur, 0, 4.6, 21.5, 8, 14]]),
  items: (a) => { const n = a.w("not", 2.6) - 0.15; const g = seg(a.t, n, n + 0.5); return <>
    {g > 0.5 ? <Cold t={a.t} /> : <Warm t={a.t} rug />}
    <Table r={4.4} /><Four t={a.t} e={g > 0.5 ? "wait" : "happy"} /><SeatStacks grey={g} />
    <BigClock p={[0, 7.8 + Math.sin(Math.max(0, a.t - n) * 22) * 0.22 * (a.t > n ? Math.max(0, 1 - (a.t - n)) : 0), -3]} angle={a.t * 2.4} s={0.9} />
  </>; },
  labels: [["NOT TONIGHT", [4.4, 8.2, -2.4], "left", "#2f66b8"]],
});

/* ---------- s25 ---------- */
export const s25a = s3({
  sky: NIGHT, aperture: 1.3,
  cam: (a) => cams(a, [[0, -1.6, 3.8, 17, -12, 12], [a.dur, 0.6, 3.8, 19, 12, 12]]),
  items: (a) => { const beat = Math.floor(a.t / 0.75); return <>
    <Night t={a.t} />
    <Gr p={[-4.6, 4.2, 0]} s={1 + Math.max(0, 0.06 - (a.t % 0.75) * 0.3)}><S g={G.box(0.7, 0.8, 0.5, 0.2)} c="#e2573d" p={[0, 2.75, 0]} /><BigClock p={[0, 0, 0]} angle={beat * (Math.PI / 6) + seg(a.t % 0.75, 0, 0.12) * (Math.PI / 6)} coins={false} /></Gr>
    {Array.from({ length: Math.min(14, beat + 1) }, (_, i) => { const t0 = i * 0.75, u = seg(a.t, t0, t0 + 0.55, Easing.in(Easing.quad)); const col = i % 4, row = Math.floor(i / 4);
      return <Gr key={i} p={[1.6 + col * 1.5, mix(10, 0.1 + row * 0.62, u), (i % 2) * 0.4]} r={[0, 0, (1 - u) * 0.5]}>{[0, 1, 2].map((j) => <Coin key={j} s={1.35} p={[0, 0.1 + j * 0.19, 0]} />)}<S g={G.box(0.28, 0.65, 1.2, 0.12)} c="#e2573d" p={[0, 0.29, 0]} /></Gr>; })}
  </>; },
  labels: [["$44K / SEC", [3.9, 6.4, 0], "down", "#a8503c"]],
});
export const s25b = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 0, 3.8, 18, 18, 12], [a.dur, 0, 4.2, 19.5, -8, 9]]),
  items: (a) => { const five = a.w("Five", 0.6); const g = seg(a.t, five - 0.2, five + 1.1, back); return <>
    <Warm t={a.t} />
    {[0].map(() => <S key="a" g={G.box(2.8, 1.6, 1.8, 0.2)} c="#8f86c8" glow={0.12} p={[-3.4, 0.8 * pop(a.t, 0.3, 0.4), 0]} s={[1, Math.max(0.02, pop(a.t, 0.3, 0.4)), 1]} />)}
    <S g={G.box(2.8, 1, 1.8, 0.14)} c="#e8772e" glow={0.2} p={[2.4, Math.max(0.05, 7.6 * g) / 2, 0]} s={[1, Math.max(0.05, 7.6 * g), 1]} />
  </>; },
  labels: [["2013", [-3.4, 2.5, 0.9], "down", "#6a6480"], ["≈ 5x", [5.0, 7.0, 0], "left", "#c9742f"]],
});
const Reel: React.FC<{ t: number; p: V3 }> = ({ t, p }) => (
  <Gr p={p} r={[0, 0, t * 1.4]}><S g={G.cyl(1.25, 1.25, 0.5, 48)} c="#4a4668" r={[Math.PI / 2, 0, 0]} /><S g={G.torus(1.2, 0.14)} c="#b4aee0" p={[0, 0, 0.24]} />{[0, 1, 2, 3, 4].map((i) => <S key={i} g={G.cyl(0.3, 0.3, 0.55, 20)} c="#241f40" p={[Math.cos(i * 1.2566) * 0.68, Math.sin(i * 1.2566) * 0.68, 0.02]} r={[Math.PI / 2, 0, 0]} />)}</Gr>
);
export const s25c = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 0, 3.8, 18, -16, 12], [a.dur, 0, 3.8, 16.5, 8, 10]]),
  items: (a) => { const films = a.w("films", 4.6); const settle = seg(a.t, 0.4, films + 0.4, Easing.out(Easing.elastic(1) as never)); const tilt = (1 - seg(a.t, 0.4, films + 0.6)) * 0.22 * Math.cos(a.t * 3); void settle; return <>
    <Warm t={a.t} />
    <S g={G.cone(1.5, 3.8, 36)} c="#a8644e" p={[0, 1.9, 0]} />
    <Gr p={[0, 4.0, 0]} r={[0, 0, tilt]}>
      <S g={G.box(11, 0.35, 0.8, 0.17)} c="#ffcf3f" glow={0.2} />
      {[-1, 1].map((d) => <Gr key={d} p={[d * 4.8, 0.35, 0]}><S g={G.cyl(1.9, 1.5, 0.35, 48)} c="#ffd766" glow={0.15} />
        {d < 0 ? [0, 1].map((i) => <Pop key={i} t={a.t} at={films - 1.2 + i * 0.5} p={[(i - 0.5) * 1.5, 1.5 + i * 0.4, i * -0.3]}><Reel t={a.t + i} p={[0, 0, 0]} /></Pop>)
          : <Calendar p={[0, 1.9, 0]} text="1 DAY" s={0.95} />}</Gr>)}
    </Gr>
  </>; },
  labels: [["2 FILMS", [-4.8, 8.2, 0], "down", "#6a6480"]],
});

/* ---------- s26 ---------- */
export const s26a = s3({
  sky: LAMP, aperture: 1.8,
  cam: (a) => cams(a, [[0, 0, 3.2, 18, 12, 38], [a.dur, 0, 3.0, 14.5, -8, 32]]),
  items: (a) => { const ap = a.w("approved", 3); const hit = seg(a.t, ap - 0.28, ap, Easing.in(Easing.cubic)); const shake = a.t > ap ? Math.sin((a.t - ap) * 40) * 0.07 * Math.max(0, 1 - (a.t - ap) * 3) : 0; return <>
    <Warm t={a.t} />
    <Gr p={[shake, 0, 0]}><Table r={5.2} />
      <S g={G.box(6.4, 0.14, 4.4, 0.07)} c="#fff8ea" glow={0.12} p={[0, TOP + 0.12, 0.2]} r={[0, -0.1, 0]} />
      {a.t >= ap && <TextPlane text="APPROVED" h={1.4} color="#13966a" border="#13966a" p={[0, TOP + 0.22, 0.3]} r={[-Math.PI / 2, 0, 0.2]} />}
      <Gr p={[mix(5.5, 0, seg(a.t, 0.3, ap - 0.3)), TOP + 0.4 + (1 - hit) * 4 + seg(a.t, ap + 0.35, ap + 1.1) * 5.5, 0.3]}><S g={G.box(4.6, 0.55, 1.8, 0.25)} c="#7a423e" p={[0, 0.2, 0]} /><S g={G.cyl(0.45, 0.65, 1.5, 28)} c="#a8644e" p={[0, 1.2, 0]} /><S g={G.ball(0.75, 28)} c="#c9885a" p={[0, 2.2, 0]} /></Gr>
    </Gr>
  </>; },
  labels: [["APPROVED ≠ PAID", [0, 5.6, -1.2], "down", "#13966a"]],
});
export const s26b = s3({
  sky: LAMP,
  cam: (a) => { const pr = a.w("promise", 2.1); return cams(a, [[0, 0, 3.6, 18, -16, 11], [pr, 0.8, 3.6, 16.5, 0, 10], [a.dur, -0.8, 3.4, 17, 12, 10]]); },
  items: (a) => { const pr = a.w("promise", 2.1); return <>
    <Warm t={a.t} />
    <Bank t={a.t} p={[-2.8, 0, -0.8]} s={1.15} e="happy" />
    <Pop t={a.t} at={pr - 0.3} p={[3.6, 3.8 + Math.sin(a.t * 2) * 0.12, 1.2]} r={[0, -0.25, 0.08]}><S g={G.box(3.0, 2.3, 0.2, 0.3)} c="#fff2c4" glow={0.35} /><Hose a={[-0.9, -0.4, 0.2]} c={[0, 0.9, 0.5]} b={[0.15, 0, 0.2]} w={0.17} color="#e8a888" /><Hose a={[0.9, -0.4, 0.2]} c={[0, 0.9, 0.5]} b={[-0.15, 0, 0.2]} w={0.17} color="#b9785a" /></Pop>
    <Gr p={[6.8, 0, 0]}><S g={G.box(3.2, 3.6, 2.0, 0.6)} c="#6fb8ac" p={[0, 1.8, 0]} /><S g={G.cyl(1.3, 1.3, 0.2, 48)} c="#241f40" p={[0, 1.9, 1.02]} r={[Math.PI / 2, 0, 0]} /><Bag t={a.t} p={[0, 1.0, 1.35]} s={0.62} e="wait" /><S g={G.torus(1.35, 0.16)} c="#dff4ee" p={[0, 1.9, 1.15]} /></Gr>
  </>; },
  labels: [["PROMISE", [3.6, 5.8, 1.2], "down", "#a8503c"]],
});
export const s26c = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, -3.6, 3.2, 18, -18, 14], [a.dur, 2.8, 3.2, 18, 8, 12]]),
  items: (a) => { const u = seg(a.t, 0.2, a.dur - 0.2); const x = mix(-8, 5.5, u); const days = a.w("days", 3.4); return <>
    <Warm t={a.t} />
    <S g={G.box(30, 0.14, 2.8, 0.07)} c="#8a6a8e" p={[0, 0.08, 0.3]} />
    {["DAY 0", "DAY 1", "DAY 2", "DAY 3"].map((d, i) => <Pop key={d} t={a.t} at={0.2 + i * 0.2} p={[-7.2 + i * 4.6, 0, -1.8]}><Rod a={[0, 0, 0]} b={[0, 3.6, 0]} w={0.1} c="#fff2d8" /><TextPlane text={d} h={0.95} color="#ffffff" bg={x > -8.2 + i * 4.6 ? "#e8772e" : "#6a5a80"} p={[0, 4.1, 0]} /></Pop>)}
    <Truck t={a.t} p={[x, 0.15, 0.5]} s={0.85} move={x} load={3} />
    <Spot p={[2.0, 0.2, 0.3]} r={1.6} k={seg(a.t, days - 0.3, days + 0.2)} />
  </>; },
  labels: [["1–3 DAYS", [2.0, 6.6, -1.8], "down", "#c9742f"]],
});

/* ---------- s27 ---------- */
export const s27a = s3({
  sky: NIGHT,
  cam: (a) => cams(a, [[0, 0, 3.8, 20, -14, 10], [a.dur, 0.4, 3.4, 14, 8, 8]]),
  items: (a) => <>
    <Night t={a.t} />
    <S g={G.cyl(5.4, 5.4, 0.6, 72)} c="#2c5a6e" p={[0, 4.2, -3.2]} r={[Math.PI / 2, 0, 0]} /><S g={G.torus(5.4, 0.55)} c="#8fd0c8" p={[0, 4.2, -2.8]} />
    {Array.from({ length: 10 }, (_, i) => <S key={i} g={G.ball(0.26, 14)} c="#dff4ee" p={[Math.cos(i * 0.628) * 5.4, 4.2 + Math.sin(i * 0.628) * 5.4, -2.2]} />)}
    <S g={G.box(5.6, 0.4, 2.4, 0.18)} c="#3f9a92" p={[-0.8, 0.9, -0.4]} /><Bag t={a.t} p={[-0.8, 1.1, -0.4]} s={1.15} e="wait" />
    <BigClock p={[3.6, 5.6, -2.2]} angle={0} s={0.62} coins={false} />
    <Stack n={6} p={[3.6, 0, 1]} />
  </>,
});
export const s27b = s3({
  sky: LAMP,
  cam: (a) => { const tt = a.w("Take-Two", 1.8) - 0.3; return cams(a, [[0, -4.8, 3.6, 15, -10, 12], [tt - 0.2, -4.6, 3.6, 14, -2, 11], [tt + 0.8, 2.4, 4.0, 19, 8, 10], [a.dur, 2.8, 4.0, 17.5, 14, 9]]); },
  items: (a) => { const sales = a.w("sales", 2.5); const n = Math.round(seg(a.t, 0.8, a.dur + 1) * 60) * 5 + 3490; return <>
    <Warm t={a.t} />
    <Store t={a.t} p={[-5.4, 0, -0.8]} s={1.05} e="happy" />
    <Pop t={a.t} at={0.4} p={[-3.0, 3.4 + Math.sin(a.t * 2.4) * 0.12, 1.4]} r={[0, 0.2, 0.1]}><S g={G.box(1.9, 1.5, 0.18, 0.25)} c="#fff2c4" glow={0.55} /><S g={G.ball(0.34)} c="#e8a888" p={[0, 0, 0.15]} /></Pop>
    <Tower t={a.t} p={[7.0, -0.3, -0.6]} h={4.4} s={0.85} ry={-0.4} e="wait" />
    <Gr p={[2.0, 5.6, -0.8]}><S g={G.box(6.4, 2.5, 0.5, 0.4)} c="#241f40" /><TextPlane text={`$${(n / 1000).toFixed(2)}B`} h={1.9} color="#7ff0d8" p={[0, 0, 0.32]} /></Gr>
    <S g={G.box(4, 0.35, 1.8, 0.16)} c="#8f86c8" p={[4.4, 0.5, 2]} /><S g={G.box(3.4, 0.12, 1.3, 0.05)} c="#4a4668" p={[4.4, 0.72, 2]} />
    <Spot p={[4.4, 0.3, 2]} r={2.4} k={seg(a.t, sales, sales + 0.4)} c="#8fd0ff" />
  </>; },
  labels: [["SALES COUNTER", [2.0, 7.8, -0.8], "down", "#2f66b8"]],
});

/* ---------- s28 ---------- */
export const s28a = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, -3.0, 3.4, 18, -16, 13], [a.dur, 2.2, 3.4, 17, 8, 12]]),
  items: (a) => { const set = a.w("settles", 1.6); const x = mix(-12, -0.8, seg(a.t, 0.1, set + 0.1, Easing.out(Easing.cubic))); return <>
    <Warm t={a.t} />
    <S g={G.box(30, 0.14, 2.8, 0.07)} c="#8a6a8e" p={[0, 0.08, 0.6]} />
    <Truck t={a.t} p={[x, 0.15, 0.8]} s={0.85} move={x} load={Math.max(0, 3 - Math.floor(Math.max(0, a.t - set) * 3))} />
    <Store t={a.t} p={[6.0, 0, -1.2]} s={1} ry={-0.35} e="happy" />
    {Array.from({ length: 12 }, (_, i) => { const t0 = set + i * 0.1; return a.t < t0 ? null : <Coin key={i} s={0.9} glow={0.4} p={fly(a.t, t0, t0 + 0.8, [x - 0.5, 3.6, 0.8], [3.0 + (i % 3) * 0.7, 0.15 + Math.floor(i / 3) * 0.18, 2.4], 2.2)} />; })}
  </>; },
  labels: [["SETTLED", [3.7, 3.0, 2.4], "down", "#13966a"]],
});
export const s28b = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => { const sch = a.w("schedule", 2.7); return cams(a, [[0, -2.0, 3.6, 18, -10, 13], [sch, 0, 4.0, 14, 0, 9], [a.dur, 1.8, 4.0, 17.5, 12, 10]]); },
  items: (a) => { const pays = a.w("pays", 0.5), con = a.w("contract", 4), open = seg(a.t, a.w("schedule", 2.7) - 0.3, a.w("schedule", 2.7) + 0.5); return <>
    <Warm t={a.t} />
    <Store t={a.t} p={[-7.0, 0, -1.2]} s={0.9} ry={0.35} /><Tower t={a.t} p={[7.2, -0.3, -1.2]} h={4.2} s={0.85} ry={-0.4} />
    <Gr p={fly(a.t, pays, a.w("schedule", 2.7) - 0.3, [-5.2, 3.0, 0.6], [0, 3.6, 1.4], 1.6)} r={[0, Math.sin(a.t) * 0.12, 0.04]}>
      <Gr p={[0, open * 1.9, -0.1]} s={0.5 + open * 0.5}><S g={G.box(2.7, 2.7, 0.12, 0.1)} c="#fff8ea" glow={0.2} />{Array.from({ length: 16 }, (_, i) => <S key={i} g={G.box(0.42, 0.36, 0.06, 0.1)} c={i === 9 ? "#e8772e" : "#c4bcd8"} o={i === 9 ? 1 : 0.55} p={[-0.9 + (i % 4) * 0.6, 0.65 - Math.floor(i / 4) * 0.5, 0.1]} />)}</Gr>
      <S g={G.box(3.6, 2.3, 0.3, 0.14)} c="#e8c9a0" /><M g={G.ext("flap", () => poly([[-1.75, 1.1], [1.75, 1.1], [0, -0.15]]), 0.12, 0.04)} c="#d9ac7a" p={[0, 0, 0.2]} />
      <S g={G.cyl(0.48, 0.48, 0.24, 32)} c="#d8322b" glow={0.2} p={[0, -0.05 - seg(a.t, con, con + 0.4) * 0.15, 0.32]} r={[Math.PI / 2, 0, 0]} />
    </Gr>
  </>; },
  labels: [["PAYOUT", [-4.4, 6.2, 0.6], "down", "#a8503c"], ["CONTRACT", [3.4, 1.8, 1.4], "up", "#d8322b"]],
});
export const s28c = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, -1.6, 3.8, 17, 16, 11], [a.dur, 1.6, 3.8, 17.5, -10, 10]]),
  items: (a) => { const dec = a.w("December", 5.8) - 0.5; const flip = seg(a.t, dec - 0.4, dec + 0.3); return <>
    <Warm t={a.t} />
    <Gr p={[-3.2, 4.3, -0.4]}>
      {flip < 0.5 ? <Calendar p={[0, 0, 0]} text="NOV" s={1.6} /> : <Calendar p={[0, 0, 0]} text="DEC" s={1.6} c="#2f66b8" />}
      {flip > 0 && flip < 1 && <S g={G.box(5.1, 4.2, 0.08, 0.04)} c="#fff8ea" glow={0.25} p={[0, -0.4 - flip * 3.5, 1 + flip * 2]} r={[-flip * 1.8, 0, flip * 0.4]} />}
    </Gr>
    <Gr p={[4.4, 0, 0]}><S g={G.box(3.6, 4.6, 1.6, 0.8)} c="#e2573d" p={[0, 2.3, 0]} /><S g={G.box(2.4, 0.34, 0.3, 0.14)} c="#241a2e" p={[0, 3.4, 0.85]} />
      <Gr p={[Math.sin(a.t * 2) * 0.05, 3.55 - flip * 0.35, 1.2]} r={[0, 0, 0.08]}><S g={G.box(2.0, 1.15, 0.12, 0.06)} c="#e8c9a0" /><S g={G.cyl(0.22, 0.22, 0.1, 20)} c="#d8322b" p={[0, 0, 0.1]} r={[Math.PI / 2, 0, 0]} /></Gr></Gr>
    <Tower t={a.t} p={[8.8, -0.3, -2.4]} h={3.6} s={0.8} e="wait" />
  </>; },
  labels: [["IF MONTHLY", [4.4, 6.3, 0], "down", "#a8503c"]],
});

/* ---------- s29 ---------- */
const Trophy: React.FC<{ t: number; p: V3; s?: number }> = ({ t, p, s = 1 }) => (
  <Gr p={p} s={s} r={[0, Math.sin(t * 1.2) * 0.5, 0]}><S g={G.cyl(1.35, 0.6, 1.8, 40)} c="#ffcf3f" glow={0.32} p={[0, 1.9, 0]} />{[-1, 1].map((d) => <S key={d} g={G.torus(0.62, 0.17)} c="#ffcf3f" glow={0.3} p={[d * 1.35, 2.1, 0]} />)}<S g={G.torus(1.34, 0.1)} c="#fff0a8" glow={0.5} p={[0, 2.82, 0]} r={[Math.PI / 2, 0, 0]} /><S g={G.cyl(0.25, 0.25, 0.8, 20)} c="#e6a51f" p={[0, 0.75, 0]} /><S g={G.box(1.8, 0.55, 1.8, 0.22)} c="#a8643c" p={[0, 0.2, 0]} />
    {[0, 1, 2, 3].map((i) => <S key={i} g={G.ball(0.11, 8)} c="#ffffff" glow={1} p={[Math.cos(i * 2 + t) * 1.8, 2 + Math.sin(i * 3 + t * 1.5) * 1.2, 1]} s={Math.max(0, Math.sin(t * 4 + i * 1.7))} cast={false} />)}</Gr>
);
export const s29 = s3({
  sky: LAMP, aperture: 2.4,
  cam: (a) => { const tr = a.w("trophy", 4.8) - 0.5, co = a.w("coins", 5.8) - 0.5; return cams(a, [[0, 0, 3.8, 20, -8, 12], [tr - 0.5, 0, 3.8, 18, 0, 11], [tr + 0.4, -2.8, 3.6, 11, 6, 8], [co, -2.6, 3.6, 11.5, 12, 8], [co + 0.9, 3.8, 2.8, 16, 30, 13], [a.dur, 4.8, 2.6, 14, 36, 12]]); },
  items: (a) => { const x = mix(5, 9.5, seg(a.t, 0, a.dur + 0.5, Easing.linear)); return <>
    <Night t={a.t} />
    <S g={G.cyl(4.6, 4.9, 0.8, 64)} c="#7a4a8e" p={[-1.4, 0.4, 0]} />
    <Tower t={a.t} p={[0.6, 0.2, -0.6]} h={4.4} s={0.9} e="happy" />
    <Trophy t={a.t} p={[-2.8, 0.8, 1]} s={1.15} />
    <Confetti t={a.t} at={0.9} />
    <S g={G.box(16, 0.14, 2.6, 0.07)} c="#5a4a78" p={[8, 0.08, -5.5]} />
    <Truck t={a.t} p={[x, 0.15, -5.4]} s={0.9} move={x} />
  </>; },
  labels: [["REAL", [-2.8, 5.6, 1], "down", "#c9742f"]],
  bubble: (a) => ({ at: [a.vertical ? 4.8 : 5.6, 4.2, -5], p: pop(a.t, a.w("truck", 7) - 0.5, 0.25) }),
});

/* ---------- s30-s33: pengadilan ---------- */
export const s30a = s3({
  sky: COLD,
  cam: (a) => cams(a, [[0, 0, 3.8, 18, -12, 14], [a.dur + 0.3, 0, 3.8, 15.5, 6, 11]]),
  items: (a) => { const tip = Math.sin(a.t * 2.6) * 0.13; return <>
    <Cold t={a.t} />
    <S g={G.cone(1.5, 3.8, 36)} c="#8fa8d4" p={[0, 1.9, 0]} />
    <Gr p={[0, 4.0, 0]} r={[0, 0, tip]}><S g={G.box(10, 0.35, 0.8, 0.17)} c="#cfe0ff" glow={0.2} />
      {[-1, 1].map((d) => <Gr key={d} p={[d * 4.4, 0.35, 0]}><S g={G.cyl(1.8, 1.4, 0.35, 48)} c="#b4c8ee" />{d < 0 ? [0, 1, 2].map((i) => <Stack key={i} n={8} p={[-0.75 + i * 0.75, 0.2, 0]} />) : <S g={G.box(1.6, 1.6, 1.6, 0.5)} c="#8f86c8" p={[0, 1.0, 0]} />}</Gr>)}
    </Gr>
  </>; },
  labels: [["RIP-OFF?", [0, 7.4, 0], "down", "#2f66b8"]],
});
export const s30b = s3({
  sky: COLD,
  cam: (a) => cams(a, [[0, 0, 3.8, 20, 16, 12], [a.dur + 0.4, 0, 4.0, 16.5, -6, 9]]),
  items: (a) => { const u = seg(a.t, 0, a.dur + 0.4); return <>
    <Cold t={a.t} />
    {[0, 1, 2, 3].map((i) => <S key={i} g={G.box(13 - i * 1.3, 0.45, 3.6 - i * 0.6, 0.2)} c="#c4cfe8" p={[0, 0.22 + i * 0.42, -2 - i * 0.4]} />)}
    {[-4, -2, 0, 2, 4].map((x) => <S key={x} g={G.cyl(0.4, 0.46, 4.4, 24)} c="#eef2ff" p={[x, 4.0, -4]} />)}
    <S g={G.box(11, 0.6, 2.4, 0.25)} c="#c4cfe8" p={[0, 6.5, -3.8]} /><M g={G.ext("court", () => poly([[-5.4, 0], [5.4, 0], [0, 2]]), 1.4, 0.2)} c="#a8b8e0" p={[0, 7.0, -3.8]} />
    <Gr p={[mix(-3.8, -0.8, u), 0.45 + u * 1.2 + Math.abs(Math.sin(a.t * 8)) * 0.2, mix(3.2, -0.2, u)]} s={0.58}><Store t={a.t} p={[0, -1.4, 0]} e="stern" /><S g={G.box(1.5, 1.1, 0.6, 0.2)} c="#7a423e" p={[2.4, 0.4, 0.8]} /><S g={G.torus(0.32, 0.09, Math.PI)} c="#5a2f2c" p={[2.4, 0.95, 0.8]} /></Gr>
  </>; },
});
const GALLERY = Array.from({ length: 300 }, (_, i) => { const row = Math.floor(i / 50), col = i % 50; return [(col - 24.5) * 0.34, 0.5 + row * 0.62, -1 - row * 0.75] as V3; });
export const s31a = s3({
  sky: COLD, aperture: 1.2, vd: 2,
  cam: (a) => { const tw = a.w("twelve", 2.8), arg = a.w("argued", 4.9); return cams(a, [[0, -1.6, 2.4, 9, -16, 16], [tw + 0.4, 0, 3.4, 20, -4, 18], [arg, 0, 3.8, 20, 6, 15], [a.dur, 0, 4.0, 17, -4, 11]]); },
  items: (a) => { const tw = a.w("twelve", 2.8), un = a.w("unfair", 7.3); return <>
    <Cold t={a.t} />
    <Courtroom />
    {GALLERY.map((p, i) => { const k = pop(a.t, 0.3 + R(i, 3) * (tw + 0.2), 0.3); return k <= 0.02 ? null : <Gr key={i} p={[p[0], p[1] + Math.sin(a.t * 2 + i) * 0.03, p[2] + 2.6]} s={k * 0.5}><S g={G.ball(0.28, 10)} c={["#8fb8ff", "#b48ae8", "#7ff0d8", "#ffd766"][i % 4]} glow={0.25} p={[0, 0, 0]} /><S g={G.ball(0.19, 10)} c="#f2d2b4" p={[0, 0.4, 0]} /></Gr>; })}
    <Pop t={a.t} at={un - 0.8} p={[0, 6.8, 0]} r={[0, 0, 0.05 * Math.sin(a.t * 2)]}><S g={G.box(2.6, 3.0, 0.16, 0.1)} c="#fff8ea" glow={0.25} />{[0.8, 0.3, -0.2].map((y) => <S key={y} g={G.box(1.8, 0.14, 0.05, 0.02)} c="#9a90a8" p={[0, y, 0.11]} />)}<TextPlane text="30%" h={0.7} color="#d8322b" p={[0, -0.85, 0.12]} /></Pop>
  </>; },
  labels: [["≈ 12M USERS", [-4.2, 5.6, -1], "down", "#2f66b8"]],
});
export const s31b = s3({
  sky: COLD,
  cam: (a) => { const th = a.w("threw", 4.3); return cams(a, [[0, -1.8, 4.0, 18, -14, 11], [th - 0.5, -0.6, 3.8, 17, 0, 10], [a.dur, 1.8, 4.2, 20, 12, 9]]); },
  items: (a) => { const two = a.w("two", 1.6), th = a.w("threw", 4.3); const hit = seg(a.t, th - 0.25, th, Easing.in(Easing.cubic)); return <>
    <Cold t={a.t} />
    <Pop t={a.t} at={0.15} p={[-5.4, 4.2, -0.6]}><Calendar p={[0, 0, 0]} text="NOV 17" s={1.25} /></Pop>
    <Pop t={a.t} at={two} p={[5.6, 3.4, -2.2]}><Calendar p={[0, 0, 0]} text="NOV 19" s={0.95} c="#c9742f" /></Pop>
    <Path a={[-3.4, 6.2, -0.6]} b={[4.2, 5.2, -2.2]} lift={1.6} k={seg(a.t, two - 0.4, two + 0.3)} />
    <Gavel p={[-0.4, 0, 1.8]} hit={a.t < th - 0.9 ? 0 : a.t < th - 0.25 ? 0 : hit} s={1.15} />
    {a.t > th && <Gr p={fly(a.t, th, th + 1.2, [1.6, 1.4, 1.6], [11, 8.5, -4], 2)} r={[a.t * 5, a.t * 3, a.t * 4]}><Paper p={[0, 0, 0]} n={1} s={0.1} /><S g={G.box(1.8, 2.2, 0.1, 0.05)} c="#fff8ea" glow={0.3} /></Gr>}
    {a.t > th && a.t < th + 0.5 && <S g={G.torus(1.6 + (a.t - th) * 6, 0.1)} c="#ffffff" glow={1} o={1 - (a.t - th) * 2} p={[-0.4, 0.5, 1.8]} r={[Math.PI / 2, 0, 0]} cast={false} />}
  </>; },
  labels: [["NOV 17", [-5.4, 7.0, -0.6], "down", "#2f66b8"], ["DISMISSED", [1.4, 3.4, 1.8], "down", "#d8322b"]],
});
export const s32a = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 0, 3.6, 22, -14, 16], [a.dur, 0, 3.8, 18, 8, 10]]),
  items: (a) => <>
    <Warm t={a.t} rug />
    <State t={a.t} p={[-7.4, 0, -1.6]} s={0.8} ry={0.4} e="calm" /><Store t={a.t} p={[-2.6, 0, 0]} s={0.85} e="calm" /><CardGate t={a.t} p={[2.6, 0, 0]} s={0.85} e="calm" /><Tower t={a.t} p={[7.4, -0.2, -1.6]} h={3.9} s={0.82} ry={-0.4} e="calm" />
  </>,
});
export const s32b = s3({
  sky: LAMP, aperture: 1.6,
  cam: (a) => { const sv = a.w("servers", 2), rf = a.w("refunds", 5.5); return cams(a, [[0, -5.6, 3.4, 15, -10, 14], [sv - 0.8, -4, 3.4, 15.5, -4, 14], [sv + 0.4, 0.2, 3.6, 15, 0, 12], [rf - 0.8, 0.8, 3.6, 15.5, 2, 12], [rf + 0.3, 5.6, 3.4, 15, 8, 13], [a.dur, 3.0, 3.8, 20, 0, 14]]); },
  items: (a) => <>
    <Warm t={a.t} />
    <Gr p={[-7, 0, -0.5]}><S g={G.box(5, 1.1, 2, 0.35)} c="#8f86c8" p={[0, 0.55, 0]} />{[0, 1, 2].map((i) => { const x = -3 + ((a.t * 1.5 + i * 2) % 6); return <Gr key={i} p={[x, 1.15, 0]} s={0.45}><ConsoleBox p={[0, 0, 0]} /></Gr>; })}<Rod a={[1.6, 4.6, 0]} b={[1.6, 6.4, 0]} w={0.14} c="#c4bcd8" /><Rod a={[1.6, 4.6, 0]} b={[0.2 + Math.sin(a.t * 2) * 0.7, 3.0 + Math.abs(Math.sin(a.t * 2)) * 0.4, 0]} w={0.14} c="#ffd766" /></Gr>
    {[-1.5, 0.4, 2.3].map((x, k) => <Gr key={x} p={[x, 0, -0.8]}><S g={G.box(1.5, 5.0, 1.4, 0.3)} c="#3d4a86" p={[0, 2.5, 0]} />{Array.from({ length: 8 }, (_, i) => <S key={i} g={G.box(1.1, 0.24, 0.1, 0.09)} c={Math.sin(a.t * 6 + i * 2.3 + k) > 0 ? "#7ff0d8" : "#5a6ab0"} glow={0.6} p={[0, 0.7 + i * 0.52, 0.75]} />)}</Gr>)}
    <Gr p={[7.4, 0, -0.3]}><S g={G.box(3.8, 1.8, 1.6, 0.45)} c="#a8644e" p={[0, 0.9, 0]} /><Gr p={[0, 1.8, -0.5]} s={0.55}><Store t={a.t} p={[0, -1.2, 0]} e="happy" /></Gr><Coin s={1.1} glow={0.4} p={fly((a.t * 0.8) % 1.4, 0, 1.1, [1.2, 2.2, 0.8], [-2.6, 2.2, 1.6], 1.4)} /></Gr>
  </>,
  labels: [["SERVERS", [0.4, 6.3, -0.8], "down", "#2f66b8"], ["REFUNDS", [7.4, 6.2, -0.3], "down", "#a8503c"]],
});
export const s32c = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, -1.2, 3.4, 18, 14, 14], [a.dur, 1.4, 3.4, 16, -8, 11]]),
  items: (a) => { const loss = a.w("loss", 4.8); return <>
    <Warm t={a.t} />
    <Gr p={[-4.4, 0, 0]}><S g={G.box(5.4, 2.6, 1.8, 0.5)} c="#8f86c8" p={[0, 1.3, 0]} />{[-1.2, 1.2].map((x) => <Gr key={x} p={[x, 1.7, 1.0]} r={[0, 0, -a.t * 2.4]}><S g={G.torus(0.65, 0.2)} c="#e6e0f4" /><S g={G.box(1.2, 0.14, 0.14, 0.06)} c="#4a4668" /></Gr>)}<S g={G.ball(0.24)} c="#ff5a4a" glow={0.5 + 0.5 * Math.sin(a.t * 5)} p={[0, 0.55, 1.0]} /></Gr>
    <ConsoleBox p={[3.4, 0.2, 0.6]} s={1.2} />
    <Gr p={[5.8, 3.4 + Math.sin(a.t * 2) * 0.12, 0.6]} r={[0, 0, -0.3]}><S g={G.box(1.9, 1.1, 0.2, 0.3)} c="#ffd766" glow={0.25} /><Rod a={[-1.4, -0.9, 0]} b={[-0.6, -0.15, 0]} w={0.04} c="#fff2d8" /></Gr>
    <Pop t={a.t} at={loss - 0.4} p={[3.6, 4.6, 1.4]}><Coin s={2.2} c="#e0342c" hi="#ff8a80" glow={0.35} r={[Math.PI / 2, 0, 0]} /><S g={G.box(0.9, 0.22, 0.15, 0.08)} c="#ffffff" glow={0.5} p={[0, 0, 0.35]} /></Pop>
  </>; },
  labels: [["AT A LOSS", [3.6, 6.6, 1.4], "down", "#d8322b"]],
});
export const s33 = s3({
  sky: LAMP, aperture: 1.5,
  cam: (a) => { const on = a.w("On", 4.1) - 0.5; return cams(a, [[0, -4.0, 3.6, 17, -14, 10], [on, -3.4, 3.6, 16.5, -4, 10], [on + 1.1, 3.6, 3.4, 16, 8, 10], [a.dur, 3.8, 3.4, 15, 14, 9]]); },
  items: (a) => { const sued = a.w("sued", 1.5), paid = a.w("paid", 6.7); const hit = seg(a.t, sued - 0.3, sued, Easing.in(Easing.quad)); return <>
    <Warm t={a.t} />
    <Doorway p={[-4.6, 0, -1]} kind="phone" glow={0.25} />
    {a.t > sued - 0.3 && <Gr p={[-4.6, 3.7, -0.2 + (1 - hit) * 4]} r={[0, 0, 0.08]}><S g={G.box(2.2, 2.7, 0.14, 0.08)} c="#fff8ea" glow={0.3} />{[0.7, 0.2, -0.3, -0.8].map((y) => <S key={y} g={G.box(1.5, 0.13, 0.05, 0.02)} c="#9a90a8" p={[0, y, 0.1]} />)}<S g={G.ball(0.24)} c="#d8322b" p={[0, 1.15, 0.14]} /></Gr>}
    <Doorway p={[4.4, 0, -1]} kind="console" glow={0.5} />
    <Gr p={[4.4, 0, 1.6]}><S g={G.cyl(0.85, 0.7, 1.7, 36)} c="#bfe6ff" o={0.45} p={[0, 0.85, 0]} /><S g={G.torus(0.85, 0.09)} c="#dff4ff" p={[0, 1.7, 0]} r={[Math.PI / 2, 0, 0]} /><Stack n={4} p={[0, 0, 0]} /></Gr>
    {a.t > paid - 0.7 && a.t < paid + 0.35 && <Coin s={1.1} glow={0.45} p={fly(a.t, paid - 0.7, paid + 0.3, [7.5, 5.5, 2], [4.4, 0.9, 1.6], 1.2)} r={[a.t * 6, 0, 0]} />}
  </>; },
  labels: [["SUED", [-4.6, 7.4, -1], "down", "#d8322b"], ["PAID", [6.4, 2.2, 1.6], "down", "#13966a"]],
  bubble: (a) => ({ at: [1.6, 5.8, 0], p: pop(a.t, a.dur - 1.7, 0.25) }),
});

/* ---------- s34-s37: pembagian ---------- */
export const s34 = s3({
  sky: LAMP, aperture: 1.5, vd: 1.5,
  cam: (a) => { const st = a.w("twenty-four", 3.4), pb = a.w("Fifty-six", 8.2), tx = a.w("tax", 10.4); return cams(a, [[0, 0, 4.0, 22, -12, 22], [st - 0.5, -1.8, 3.6, 18.5, 6, 20], [pb - 0.8, -1.2, 3.6, 18.5, 2, 20], [pb + 0.2, 3.2, 3.8, 17, -14, 17], [tx - 0.5, 2.0, 3.8, 18, -8, 17], [tx + 0.5, -2.0, 3.8, 20.5, 8, 18], [a.dur, -0.4, 4.0, 23, 0, 20]]); },
  items: (a) => { const st = a.w("twenty-four", 3.4), two = a.w("two", 5.9), pb = a.w("Fifty-six", 8.2), tx = a.w("tax", 10.4);
    const store: V3 = [-1.8, TOP, -1.6], gate: V3 = [1.6, TOP, -2.4], pub: V3 = [3.0, TOP, 0.2];
    return <>
      <Warm t={a.t} rug />
      <HangLamp t={a.t} p={[0, 11.2, -1]} />
      <Table r={4.6} /><Four t={a.t} />
      {a.t < st - 0.9 && <Gr p={[0, TOP, 0]}><S g={G.ball(1, 32)} c="#c98d55" p={[0, 0.3, 0]} s={[1.3, 0.32, 1.1]} /><S g={G.torus(0.5, 0.12)} c="#7a4a8e" p={[0, 0.55, 0.3]} r={[1.2, 0, 0]} /></Gr>}
      {Array.from({ length: 3 }, (_, i) => { const t0 = st - 0.9 + i * 0.12; return a.t < t0 ? null : <Stack key={"s" + i} n={i === 2 && a.t > two + 0.5 ? 6 : 8} p={fly(a.t, t0, t0 + 0.8, [0, TOP, 0], [store[0] + (i - 1) * 0.75, TOP, store[2]], 1)} />; })}
      {[0, 1].map((i) => a.t < two - 0.3 ? null : <Coin key={"c" + i} s={0.95} c="#46cfa8" hi="#a8f4dc" glow={0.4} p={fly(a.t, two - 0.3 + i * 0.2, two + 0.7 + i * 0.2, [store[0] + 0.75, TOP + 1.2, store[2]], [gate[0] + i * 0.3, TOP + 0.1 + i * 0.16, gate[2]], 2)} />)}
      {Array.from({ length: 7 }, (_, i) => { const t0 = pb - 0.9 + i * 0.09; return a.t < t0 ? null : <Stack key={"p" + i} n={8} p={fly(a.t, t0, t0 + 0.7, [0, TOP, 0], [pub[0] - 1.2 + (i % 4) * 0.72, TOP, pub[2] + Math.floor(i / 4) * 0.8], 1)} />; })}
      <Spot p={[pub[0], TOP + 0.05, pub[2] + 0.4]} r={2.0} k={seg(a.t, pb, pb + 0.4) * (1 - seg(a.t, tx - 0.4, tx))} />
      {Array.from({ length: 5 }, (_, i) => { const t0 = tx - 0.2 + i * 0.12; return a.t > t0 + 0.9 ? null : <Coin key={"t" + i} s={0.9} glow={0.35} p={fly(a.t, t0, t0 + 0.9, [-3.2, TOP + 0.15 + i * 0.16, 0.8], [-6.3, 2.4, -0.4], 2)} />; })}
    </>; },
  labels: [["$24", [-2.6, 4.3, -1.6], "down", "#2f66b8"], ["≈ $2", [2.2, 3.6, -2.4], "down", "#13966a"], ["$56", [3.2, 4.4, 0.6], "down", "#c9742f"], ["TAX", [-6.6, 6.2, -1.4], "down", "#6c74c9"]],
});
export const s35a = s3({
  sky: NIGHT, aperture: 2.4,
  cam: (a) => cams(a, [[0, 1.4, 3.4, 12, 14, 14], [a.dur + 0.3, 0.2, 3.6, 18, -6, 11]]),
  items: (a) => <>
    <Night t={a.t} />
    <S g={G.box(9.4, 5.4, 0.5, 0.35)} c="#1c1830" p={[0, 4.9, -4.4]} /><S g={G.box(8.8, 4.8, 0.2, 0.25)} c="#2a4fae" glow={0.45} p={[0, 4.9, -4.1]} />
    <S g={G.box(6.6, 0.55, 0.12, 0.26)} c="#151a40" p={[0, 4.1, -3.95]} /><S g={G.box(6.4, 0.4, 0.12, 0.05)} c="#7ff0d8" glow={0.8} p={[0, 4.1, -3.86]} />
    <S g={G.box(11.5, 1.1, 1.8, 0.35)} c="#5a3d78" p={[0, 0.75, -4]} /><ConsoleBox p={[3.4, 1.35, -3.6]} s={0.65} />
    <BigClock p={[-6.0, 5.8, -4]} angle={0} s={0.55} coins={false} />
    <S g={G.cyl(1.9, 1.9, 0.28, 60)} c="#a8644e" p={[2.6, 1.15, 1.6]} /><S g={G.cyl(0.35, 0.6, 1.1, 24)} c="#7a423e" p={[2.6, 0.55, 1.6]} />
    <S g={G.torus(1.2, 0.045)} c="#cdd8ff" glow={0.5} o={0.5 + 0.3 * Math.sin(a.t * 4)} p={[2.6, 1.34, 1.6]} r={[Math.PI / 2, 0, 0]} cast={false} />
  </>,
});
export const s35b = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, -2.2, 3.8, 20, -10, 14], [a.dur * 0.6, 0, 4.0, 20, 4, 14], [a.dur + 0.2, 1.4, 4.2, 20, 12, 13]]),
  items: (a) => { const clk = a.dur - 0.9; return <>
    <Warm t={a.t} />
    <Pop t={a.t} at={0.1} p={[-5.0, 0, 0]} s={0.82}><Table r={4.2} />{[0, 1, 2, 3].map((i) => <Stack key={i} n={[3, 8, 2, 11][i]} p={[Math.cos(i * 1.57 + 0.8) * 2.2, TOP, Math.sin(i * 1.57 + 0.8) * 1.7]} />)}</Pop>
    <Pop t={a.t} at={Math.max(0.4, clk)} p={[5.0, 4.4, 0]}><BigClock p={[0, 0, 0]} angle={a.t * 3} /></Pop>
  </>; },
  labels: [["THE TABLE", [-5.0, 6.0, 0], "down", "#a8503c"], ["THE CLOCK", [5.0, 7.4, 0], "down", "#2f66b8"]],
});
export const s35c = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 2.6, 4.0, 18, 8, 12], [a.dur + 0.3, 1.0, 3.6, 20, -10, 13]]),
  items: (a) => { const x = mix(-9, 4, seg(a.t, 0.2, a.dur + 0.5)); return <>
    <Warm t={a.t} />
    <BigClock p={[5.0, 5.0, -2]} angle={a.t * 6} />
    <S g={G.box(30, 0.14, 2.8, 0.07)} c="#8a6a8e" p={[0, 0.08, 1.2]} />
    <Truck t={a.t} p={[x, 0.15, 1.4]} s={0.85} move={x} />
    <Pop t={a.t} at={0.2} p={[-4, 5.6, -2]}><Calendar p={[0, 0, 0]} text={["DAY 1", "DAY 2", "DAY 3"][Math.min(2, Math.floor(a.t / Math.max(0.4, a.dur / 3)))]} s={1} c="#c9742f" /></Pop>
  </>; },
  labels: [["THE CLOCK", [5.0, 7.6, -2], "down", "#2f66b8"]],
});
export const s36 = s3({
  sky: LAMP, aperture: 1.8,
  cam: (a) => cams(a, [[0, 0, 3.4, 19, -14, 40], [a.w("ask", 2.5), 0, 3.2, 16, 0, 38], [a.dur + 0.3, 0, 3.2, 15, 8, 34]]),
  items: (a) => { const u = seg(a.t, 0.05, 0.7, Easing.in(Easing.quad)); const k = a.w("keeps", 3.9), w = a.w("when", 4.9);
    const Stamp: React.FC<{ at: number; x: number; kind: "table" | "clock" }> = ({ at, x, kind }) => { const h = seg(a.t, at - 0.3, at, Easing.in(Easing.cubic)); return a.t < at - 0.3 ? null : <Gr p={[x, TOP + 0.75 + (1 - h) * 5, 1.6]} s={1.25 - 0.25 * h}>{kind === "table" ? <><S g={G.cyl(1.35, 1.35, 0.35, 48)} c="#2f8a80" /><S g={G.torus(1.35, 0.16)} c="#a8644e" r={[Math.PI / 2, 0, 0]} p={[0, 0.15, 0]} /><Stack n={3} p={[-0.4, 0.2, 0]} s={0.8} /><Stack n={5} p={[0.45, 0.2, 0.2]} s={0.8} /></> : <Gr r={[-Math.PI / 2, 0, 0]} p={[0, 0.2, 0]}><BigClock p={[0, 0, 0]} angle={a.t * 3} s={0.65} /></Gr>}</Gr>; };
    return <>
      <Warm t={a.t} />
      <Table r={5.6} />
      <Newspaper p={[0, TOP + 0.25 + (1 - u) * 6, -0.5]} r={[-Math.PI / 2, 0, 0.08 + (1 - u) * 1.2]} s={1.15} head="$ BILLIONS" />
      <Stamp at={k} x={-2.2} kind="table" /><Stamp at={w} x={2.2} kind="clock" />
    </>; },
  labels: [["WHO KEEPS IT?", [-3.4, 5.0, 1.6], "down", "#a8503c"], ["WHEN?", [3.4, 5.0, 1.6], "down", "#2f66b8"]],
});
export const s37a = s3({
  sky: LAMP, aperture: 1.8,
  cam: (a) => cams(a, [[0, 0, 3.4, 15, -8, 24], [a.dur + 0.4, 3.2, 2.8, 15, 12, 18]]),
  items: (a) => <>
    <Warm t={a.t} />
    <Table r={4.6} />
    {[0, 1].map((i) => { const x = mix(-1.5 + i * 1.4, 5.2 + i * 0.9, seg(a.t, 0.2 + i * 0.25, a.dur - 0.2, Easing.in(Easing.quad))); const fall = Math.max(0, x - 4.6); return <Coin key={i} s={1.5} c="#46cfa8" hi="#a8f4dc" glow={0.4} p={[x, TOP + 0.62 - fall * fall * 0.8, 0.8 + i * 0.5]} r={[Math.PI / 2, 0, -x * 1.7]} />; })}
  </>,
});
export const s37b = s3({
  sky: LAMP,
  cam: (a) => cams(a, [[0, 1.0, 3.8, 18, 14, 10], [a.dur + 0.3, 0, 3.6, 15, -6, 9]]),
  items: (a) => { const big = a.w("biggest", 1); return <>
    <Warm t={a.t} />
    <Bank t={a.t} p={[-1.2, 0, -0.8]} s={1.2} e={a.t > big - 0.3 ? "happy" : "calm"} />
    <Hose a={[1.6, 2.2, 0.6]} c={[3.6, 1.0, 1.8]} b={[4.2, 2.2, 2.2]} w={0.3} color="#8fd0c8" /><S g={G.ball(0.55, 20)} c="#8fd0c8" p={[4.2, 2.2, 2.2]} />
    {[0, 1].map((i) => <Coin key={i} s={i ? 0.8 : 1.35} c="#46cfa8" hi="#a8f4dc" glow={0.45} p={fly(a.t, 0.1 + i * 0.2, 1.0 + i * 0.2, [8, 8, 1], [3.9 + i * 0.7, 2.9 + i * 0.1, 2.3], 0.6)} r={[Math.PI / 2, 0, 0]} />)}
  </>; },
});
export const s37c = s3({
  sky: NIGHT,
  cam: (a) => cams(a, [[0, 0, 4.2, 15, -10, 10], [a.dur + 0.5, 0, 4.4, 17.5, 4, 8]]),
  items: (a) => { const o = seg(a.t, 0.05, 0.7, back); return <>
    <Night t={a.t} />
    <Gr p={[0, 4.6, 0]} s={0.4 + 0.6 * o} r={[0, Math.sin(a.t * 1.4) * 0.08, 0]}>
      <S g={G.box(11, 6, 0.4, 0.5)} c="#ffe27a" glow={0.2} />
      <Bank t={a.t} p={[-2.8, -2.2, 0.9]} s={0.62} e="happy" />
      {[0, 1].map((i) => <Coin key={i} s={1.6 - i * 0.4} c="#46cfa8" hi="#a8f4dc" glow={0.45} p={[1.6 + i * 2.0, Math.sin(a.t * 2.4 + i) * 0.25, 0.9]} r={[Math.PI / 2, 0, 0]} />)}
      <S g={G.cone(0.55, 1.0, 28)} c="#e2573d" glow={0.35} r={[0, 0, -Math.PI / 2]} p={[4.4 + Math.sin(a.t * 5) * 0.2, -1.9, 0.6]} />
    </Gr>
  </>; },
  labels: [["NEXT", [0, 8.2, 0.5], "down", "#e2573d"]],
});

/* ---------- thumbnail (teks judul ditambahkan komposisi Thumbnail di kiri) ---------- */
export const thumbA = s3({
  sky: LAMP, aperture: 1.6,
  cam: () => ({ at: [-3.4, 3.6, 0], d: 16, yaw: -10, pitch: 14 }),
  items: () => <>
    <Warm t={2} />
    <HangLamp t={0} p={[1.6, 9.6, -0.8]} />
    <Table p={[1.8, 0, 0]} r={3.6} /><Bag t={0.5} p={[1.8, TOP, 0.4]} s={1.35} e="nervous" />
    <Tower t={0.5} p={[6.0, -0.3, -1.6]} h={4.4} s={0.78} ry={-0.4} e="happy" /><Store t={0.5} p={[-0.6, 0, -4.4]} s={0.75} />
    <Stack n={9} p={[0, TOP, 1.2]} /><Stack n={5} p={[3.9, TOP, 1.1]} />
  </>,
});
export const thumbB = s3({
  sky: NIGHT, aperture: 1.4,
  cam: () => ({ at: [-2.8, 4.1, 0], d: 14.5, yaw: -12, pitch: 14 }),
  items: () => <>
    <Night t={2} />
    <State t={0.5} p={[-1.4, 0, -3.8]} s={0.72} /><Store t={0.5} p={[1.4, 0, -0.5]} s={0.82} /><CardGate t={0.5} p={[4.6, 0, -2.4]} s={0.75} /><Tower t={0.5} p={[3.9, -0.3, 1.6]} h={4.2} s={0.68} ry={-0.3} e="happy" />
    <Stack n={10} p={[0.2, 0, 2.6]} /><Stack n={6} p={[1.2, 0, 3]} />
  </>,
});

/* thumbnail tegak Shorts (1080x1920): benda di tengah bawah, teks judul di atas. Komposisi tegak memakai jarak kamera x vd. */
export const thumbS1 = s3({
  sky: LAMP, aperture: 1.6, vd: 1,
  cam: () => ({ at: [0, 5.4, 0], d: 24, yaw: -8, pitch: 12 }),
  items: () => <>
    <Warm t={2} />
    <Table r={3.1} /><Bag t={0.5} p={[-1.1, TOP, 0.4]} s={1.05} e="nervous" /><Stack n={11} p={[1.2, TOP, 0.9]} />
    <Tower t={0.5} p={[1.4, -0.3, -4]} h={5.2} s={0.95} ry={-0.2} e="happy" />
  </>,
});
export const thumbS2 = s3({
  sky: NIGHT, aperture: 1.4, vd: 1,
  cam: () => ({ at: [0, 5.2, 0], d: 23, yaw: 8, pitch: 12 }),
  items: () => <>
    <Night t={2} />
    <CardGate t={0.5} p={[0, 0, 0]} s={1.15} e="smug" />
    <Coin p={[-1.7, 1.1, 2.4]} r={[Math.PI / 2, 0, 0]} s={2} c="#46cfa8" hi="#a8f4dc" glow={0.45} /><Coin p={[1.7, 1.1, 2.4]} r={[Math.PI / 2, 0, 0]} s={2} c="#46cfa8" hi="#a8f4dc" glow={0.45} />
  </>,
});
