// Shot `hold` dengan gambar berbeda: mesin hanya memakai komponen shot pertama, jadi pergantian dilakukan di sini.
// Label digambar sendiri supaya label gambar lama hilang saat gambar berganti.
import React from "react";
import { Easing } from "remotion";
import { Bubble, Pill, seg, useShot } from "@r3";
import type { Ptr } from "../../../../../../produksi/remotion/src/r3/kit";
import { ShotProvider, labelP, makeCtx } from "../../../../../../produksi/remotion/src/r3/context";

type Pos = [number, number, Ptr?];
type Opt = { k?: number; labels?: Record<string, Pos>; bubble?: { at: [number, number]; in: "a" | "b" } };
const BG = ["#e2573d", "#2c8c86", "#4a7fb0"];

export const chain = (A: React.FC, B: React.FC, { k = 1, labels = {}, bubble }: Opt = {}): React.FC => {
  const Chained: React.FC = () => {
    const c = useShot(), next = c.shots[k];
    const b = next ? (next.startMs - c.shots[0].startMs) / 1000 : c.dur;
    const mixP = seg(c.t, b - 0.15, b + 0.2);
    const sub = (t: number, dur: number, shift: number) => makeCtx({ ...c, t, dur, words: c.words.map((w) => ({ ...w, at: w.at - shift, end: w.end - shift })), labels: c.labels.map((l) => ({ ...l, at: l.at - shift, out: l.out - shift })) });
    const own = new Set(next ? c.shots.slice(k).flatMap((s) => (s.labels ?? []).map((l) => l.text)) : []);
    const text = c.shots.map((s) => s.bubble).filter(Boolean)[0];
    const bp = !bubble || !text ? 0 : bubble.in === "a" ? seg(c.t, 0.6, 0.85, Easing.out(Easing.back(1.8))) * (1 - seg(c.t, b - 0.25, b)) : seg(c.t, b + 0.7, b + 0.95, Easing.out(Easing.back(1.8)));
    return (
      <>
        {mixP < 1 && <div style={{ position: "absolute", inset: 0 }}><ShotProvider value={sub(c.t, b, 0)}><A /></ShotProvider></div>}
        {mixP > 0 && <div style={{ position: "absolute", inset: 0, opacity: mixP }}><ShotProvider value={sub(Math.max(0, c.t - b + 0.15), Math.max(1, c.dur - b + 0.15), b - 0.15)}><B /></ShotProvider></div>}
        <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          {c.labels.map((l, i) => { const p = labels[l.text]; if (!p) return null; const gone = own.has(l.text) ? 1 : 1 - seg(c.t, b - 0.3, b - 0.05); return <Pill key={l.text} x={c.vertical ? Math.min(1180, Math.max(740, p[0])) : p[0]} y={p[1]} text={l.text} p={labelP(c.t, l) * gone} bg={BG[i % 3]} ptr={p[2] ?? "down"} size={44} />; })}
          {bp > 0 && <Bubble x={bubble!.at[0]} y={bubble!.at[1]} text={text!} p={bp} />}
        </svg>
      </>
    );
  };
  return Chained;
};
