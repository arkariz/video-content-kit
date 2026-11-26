// Mesin R3: merender `shots` satu scene. Shot mulai di kata pertama kalimatnya (waktu dari render.mjs / scripts/produksi/r3.mjs),
// label muncul di katanya, transisi iris / wipe / dorong / potong / tahan sesuai gaya-visual.md bagian 3.
import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { SceneProps } from "../lib/types";
import { Backdrop, Bubble, Frame, H, Pill, SANS, W, clamp, mix, seg } from "./kit";
import { R3Label, R3ShotSpec, R3Word, ShotProvider, labelP, makeCtx } from "./context";
import { ShotDef, getShots, toDef } from "./registry";

/** Lama transisi (detik). Sama dengan TRANS_S di scripts/produksi/r3.mjs. */
export const TRANS = { iris: 0.45, wipe: 0.4, push: 0.3, cut: 0, hold: 0 } as const;
const LABEL_BG = ["#e2573d", "#2c8c86", "#3f7cac", "#8b6bb1", "#d8322b"];

type Seg = {
  k: number; start: number; end: number; transition: string; shots: R3ShotSpec[]; def: ShotDef | null;
  labels: R3Label[]; words: R3Word[]; enterA: number; enterB: number; pivot: number; out: number;
};

/** Gabungkan shot `hold` ke shot sebelumnya, lalu hitung waktu masuk tiap segmen (detik scene). */
export function buildSegments(s: SceneProps, fps: number, chained: boolean): Seg[] {
  const shots = s.r3?.shots ?? []; const defs = getShots(s.r3?.module)?.[s.id] ?? [];
  const sceneEnd = s.durationFrames / fps; const segs: Seg[] = [];
  shots.forEach((sh, i) => {
    const last = segs[segs.length - 1];
    if (i > 0 && sh.transition === "hold" && last) { last.shots.push(sh); if (!last.def) last.def = toDef(defs[i]); return; }
    segs.push({ k: segs.length, start: i === 0 ? 0 : sh.startMs / 1000, end: 0, transition: sh.transition, shots: [sh], def: toDef(defs[i]), labels: [], words: [], enterA: 0, enterB: 0, pivot: 0, out: 0 });
  });
  segs.forEach((g, k) => {
    g.end = k < segs.length - 1 ? segs[k + 1].start : sceneEnd;
    const tr = g.transition as keyof typeof TRANS; const d = TRANS[tr] ?? 0;
    if (k === 0) { // masuk dari scene sebelumnya: transisi di awal scene, hanya bila scene sebelumnya juga R3
      const on = chained && d > 0; g.enterA = 0; g.pivot = on ? (tr === "wipe" ? d / 2 : d) : 0; g.enterB = on ? (tr === "push" ? d + 0.5 : d) : 0;
      if (!on) g.transition = "cut";
    } else {
      const lo = segs[k - 1].start + 0.3;
      if (tr === "iris") { g.enterA = Math.max(lo, g.start - d); g.pivot = g.start; g.enterB = g.start; }
      else if (tr === "wipe") { g.enterA = Math.max(lo, g.start - d / 2); g.pivot = g.start; g.enterB = g.enterA + d; }
      else if (tr === "push") { g.enterA = g.start; g.pivot = g.start; g.enterB = g.start + 0.5; }
      else { g.enterA = g.start; g.pivot = g.start; g.enterB = g.start; }
    }
  });
  segs.forEach((g, k) => {
    const next = segs[k + 1];
    const outAt = (next ? (next.transition === "push" ? next.start - 0.6 : next.enterA) : g.end - 0.15) - 0.25 - g.start;
    g.out = outAt;
    g.labels = g.shots.flatMap((sh) => (sh.labels ?? []).map((l) => ({ text: l.text, word: l.word, at: (l.atMs ?? sh.startMs + 300) / 1000 - g.start, out: Math.max(outAt, (l.atMs ?? 0) / 1000 - g.start + 0.8), found: l.found })));
    g.words = g.shots.flatMap((sh) => (sh.words ?? []).map((w) => ({ text: w.text, at: w.startMs / 1000 - g.start, end: w.endMs / 1000 - g.start })));
  });
  return segs;
}

const Placeholder: React.FC<{ id: string; spec: R3ShotSpec; t: number }> = ({ id, spec, t }) => (
  <Frame>
    <Backdrop stops={["#3a3a44", "#1d1d24"]} t={t} particles={["#ffffff"]} n={16} />
    <text x={W / 2} y={440} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={64} fill="#ff6b5a">ADEGAN BELUM ADA · {id}#{spec.sentence}</text>
    <text x={W / 2} y={540} textAnchor="middle" fontFamily={SANS} fontWeight={500} fontSize={36} fill="#fff">{spec.show.slice(0, 90)}</text>
    <text x={W / 2} y={600} textAnchor="middle" fontFamily={SANS} fontWeight={500} fontSize={30} fill="#bbb">tulis komponennya di 04-shots.tsx (produksi/PIPELINE.md)</text>
  </Frame>
);

/** Satu segmen: konteks shot, kamera melayang, label dan bubble otomatis. t = detik sejak segmen mulai. */
const SegView: React.FC<{ g: Seg; t: number; T: number; s: SceneProps; vertical: boolean; visW: number }> = ({ g, t, T, s, vertical, visW }) => {
  const owner = g.shots[0]; const opts = g.def?.opts ?? {}; const dur = g.end - g.start;
  const ctx = makeCtx({
    t, T, dur, sceneId: s.id, track: s.r3?.track ?? "", index: g.k, vertical, shot: owner, shots: g.shots, labels: g.labels, words: g.words,
    faces: Object.assign({}, ...g.shots.map((x) => x.faces ?? {})), mood: g.shots.map((x) => x.mood).filter(Boolean).at(-1), bubble: g.shots.map((x) => x.bubble).filter(Boolean)[0],
  });
  const C = g.def?.C;
  const drift = opts.drift === false ? "" : `translate(${Math.sin(t * 0.37 + g.k) * 9}px, ${Math.cos(t * 0.29 + g.k) * 6}px) scale(${1 + 0.045 * clamp(t / Math.max(1, dur + 0.6))})`;
  const focus = vertical ? (opts.focus ?? W / 2) : W / 2;
  const fixed = opts.labels && opts.labels !== "own" ? opts.labels : {};
  const n = g.labels.length, bgs = opts.labelBg ?? LABEL_BG;
  const bubbleP = ctx.bubble && opts.bubble !== "own" ? seg(t, 0.6, 0.85, Easing.out(Easing.back(1.8))) * (1 - seg(t, g.out, g.out + 0.2)) : 0;
  return (
    <AbsoluteFill style={{ width: W, height: H, transform: `translateX(${W / 2 - focus}px)` }}>
      <AbsoluteFill style={{ width: W, height: H, transform: drift, transformOrigin: "50% 50%" }}>
        <ShotProvider value={ctx}>{C ? <C /> : <Placeholder id={s.id} spec={owner} t={t} />}</ShotProvider>
        {/* label dan bubble otomatis ikut kamera melayang, jadi tetap menempel pada bendanya */}
        {(opts.labels !== "own" && n > 0) || bubbleP > 0 ? (
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
            {opts.labels !== "own" && g.labels.map((l, i) => {
              const at = fixed[l.text];
              const x0 = at ? at[0] : vertical ? focus : W / 2 + (i - (n - 1) / 2) * 540, y = at ? at[1] : vertical ? 260 + i * 120 : 150;
              const half = l.text.length * 14 + 60, x = clamp(x0, focus - visW / 2 + half + 30, focus + visW / 2 - half - 30); // Shorts: tetap di dalam layar
              return <Pill key={l.text + i} x={x} y={y} text={l.text} p={labelP(t, l)} bg={bgs[i % bgs.length]} ptr={at?.[2] ?? (at ? "down" : "none")} size={44} />;
            })}
            {bubbleP > 0 && <Bubble x={opts.bubbleAt?.[0] ?? 1380} y={opts.bubbleAt?.[1] ?? 360} text={ctx.bubble!} p={bubbleP} />}
          </svg>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Scene R3. prev = scene sebelumnya (untuk transisi masuk bila scene itu juga R3). */
export const R3Scene: React.FC<{ s: SceneProps; prev?: SceneProps; vertical: boolean }> = ({ s, prev, vertical }) => {
  const frame = useCurrentFrame(); const { fps, width, height } = useVideoConfig();
  const T = frame / fps;
  const chained = !!prev?.r3;
  const segs = React.useMemo(() => buildSegments(s, fps, chained), [s, fps, chained]);
  const prevSegs = React.useMemo(() => (prev?.r3 ? buildSegments(prev, fps, false) : []), [prev, fps]);
  const scale = vertical ? height / H : width / W, visW = width / scale, vx0 = W / 2 - visW / 2, vx1 = W / 2 + visW / 2;

  let k = 0; while (k < segs.length - 1 && T >= segs[k + 1].enterA) k++;
  const g = segs[k]; if (!g) return null;
  const view = (x: Seg, isPrev = false) => {
    const tt = isPrev ? T + (prev!.durationFrames / fps - x.start) : T - x.start;
    return <SegView g={x} t={tt} T={isPrev ? T + prev!.durationFrames / fps : T} s={isPrev ? prev! : s} vertical={vertical} visW={visW} />;
  };
  const outgoing = k > 0 ? segs[k - 1] : prevSegs[prevSegs.length - 1];
  const outIsPrev = k === 0;
  const inTrans = g.transition !== "cut" && T < g.enterB && !!outgoing;
  const nextPush = segs[k + 1]?.transition === "push" ? segs[k + 1] : null;

  const layers: React.ReactNode[] = [];
  const shift = (d?: ShotDef | null) => (vertical ? W / 2 - (d?.opts.focus ?? W / 2) : 0); // koordinat segmen → layar (Shorts)
  const o0 = g.def?.opts.from ?? [W / 2, H / 2]; const origin: [number, number] = [o0[0] + shift(g.def), o0[1]];
  if (inTrans && g.transition === "iris") {
    const p = seg(T, g.enterA, g.pivot, Easing.in(Easing.quad));
    const r = mix(0, Math.hypot(visW, H) * 1.05, p);
    layers.push(<AbsoluteFill key="o">{view(outgoing!, outIsPrev)}</AbsoluteFill>);
    layers.push(<AbsoluteFill key="i" style={{ clipPath: `circle(${r}px at ${origin[0]}px ${origin[1]}px)` }}>{view(g)}</AbsoluteFill>);
    layers.push(<div key="ring" style={{ position: "absolute", left: origin[0] - r, top: origin[1] - r, width: r * 2, height: r * 2, borderRadius: "50%", border: "9px solid #fff", boxSizing: "border-box" }} />);
  } else if (inTrans && g.transition === "wipe") {
    const p = seg(T, g.enterA, g.enterB, Easing.inOut(Easing.cubic));
    const lx = mix(vx0 - 10, vx1 + 10, p);
    layers.push(<AbsoluteFill key="o">{view(outgoing!, outIsPrev)}</AbsoluteFill>);
    layers.push(<AbsoluteFill key="i" style={{ clipPath: `inset(0 ${W - lx}px 0 0)` }}>{view(g)}</AbsoluteFill>);
    layers.push(<div key="line" style={{ position: "absolute", top: 0, height: H, left: lx - 4, width: 8, background: "#fff" }} />);
  } else if (inTrans && g.transition === "push" && T < g.pivot) {
    // awal scene: dorong keluar dari shot terakhir scene sebelumnya
    const p = seg(T, g.enterA, g.pivot, Easing.in(Easing.cubic));
    layers.push(<AbsoluteFill key="o" style={{ transform: `scale(${1 + p * 1.8})`, transformOrigin: `${origin[0]}px ${origin[1]}px`, filter: `brightness(${1 + p * 0.9}) blur(${p * 8}px)` }}>{view(outgoing!, outIsPrev)}</AbsoluteFill>);
  } else if (g.transition === "push" && T < g.enterB && (k > 0 || chained)) {
    const p = seg(T, g.pivot, g.enterB, Easing.out(Easing.cubic));
    layers.push(<AbsoluteFill key="i" style={{ transform: `scale(${mix(1.14, 1, p)})`, transformOrigin: `${origin[0]}px ${origin[1]}px` }}>{view(g)}</AbsoluteFill>);
    layers.push(<AbsoluteFill key="flash" style={{ background: "#fffbea", opacity: 0.65 * (1 - seg(T, g.pivot, g.pivot + 0.18)) }} />);
  } else if (nextPush && T >= nextPush.start - 0.6) {
    // shot ini menyala lalu kamera mendorong masuk ke titik asal shot berikutnya
    const o1 = nextPush.def?.opts.from ?? [W / 2, H / 2]; const o = [o1[0] + shift(g.def), o1[1]];
    const glow = seg(T, nextPush.start - 0.6, nextPush.start - 0.3), p = seg(T, nextPush.start - 0.3, nextPush.start, Easing.in(Easing.cubic));
    layers.push(<AbsoluteFill key="c" style={{ transform: `scale(${1 + p * 1.8})`, transformOrigin: `${o[0]}px ${o[1]}px`, filter: `brightness(${1 + glow * 0.25 + p * 0.8}) blur(${p * 8}px)` }}>{view(g)}</AbsoluteFill>);
    layers.push(<div key="glow" style={{ position: "absolute", left: o[0] - 420, top: o[1] - 420, width: 840, height: 840, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,250,220,0.85), rgba(255,240,180,0))", opacity: glow * (1 - p * 0.3) }} />);
  } else {
    layers.push(<AbsoluteFill key="c">{view(g)}</AbsoluteFill>);
  }

  // efek suara: pop di label, whoosh di transisi
  const sfx: { at: number; name: string; v: number }[] = [];
  segs.forEach((x) => {
    if (x.transition !== "cut" && (x.k > 0 || chained)) sfx.push({ at: Math.max(0, Math.round(x.enterA * fps)), name: "whoosh", v: 0.28 });
    x.labels.forEach((l) => sfx.push({ at: Math.max(0, Math.round((x.start + l.at) * fps)), name: "pop", v: 0.2 }));
  });
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: (width - W * scale) / 2, top: (height - H * scale) / 2, width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        {layers}
      </div>
      {sfx.map((x, i) => <Sequence key={i} from={x.at} durationInFrames={30}><Audio src={staticFile(`sfx/${x.name}.wav`)} volume={x.v} /></Sequence>)}
    </AbsoluteFill>
  );
};
