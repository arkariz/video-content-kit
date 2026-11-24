import React from "react";
import { AbsoluteFill, Audio, Sequence, spring, staticFile, useVideoConfig } from "remotion";
import { Backdrop } from "./Backdrop";
import { Bubble } from "./Bubble";
import { Gadget, Person, Pose, isPerson } from "./Actors";
import type { Emo } from "./Face";
import { Ctx, INK, makeCtx } from "./ctx";
import { Fit } from "../lib/Fit";
import { clamp, ease } from "../lib/ui";

const FONT = "'Chalkboard SE','Marker Felt','Comic Sans MS',sans-serif";
const KS: Record<string, number> = { bank: 1.12, "bank-big": 1.18, vault: 1.05, plane: 1.1 };
type Sfx = { at: number; name: string; v?: number };

const tone = (t?: string) => ({ good: "#1fa86b", bad: "#e0443e", hot: "#f5b700" }[t ?? "hot"] ?? "#f5b700");

export const Stage: React.FC<{ spec: any; frame: number; dur: number; vertical: boolean; title?: string; board?: React.ReactNode }> = ({ spec, frame, dur, vertical, title, board }) => {
  const { fps, width: w, height: h } = useVideoConfig();
  const ctx = makeCtx(w, h, vertical);
  const { u, groundY } = ctx;
  const X = (x: number) => (vertical ? 0.2 + x * 0.6 : x); // di layar 9:16 pemeran dirapatkan ke tengah
  const p = clamp(frame / Math.max(1, dur));
  const fAt = (at = 0) => Math.round(at * dur);
  const sp = (at: number, cfg = { damping: 11, stiffness: 150, mass: 0.7 }) => spring({ frame: frame - fAt(at), fps, config: cfg });
  const sfx: Sfx[] = [];
  // Efek suara ditentukan dari spec (bukan dari frame) supaya Sequence tidak putus.
  (spec.actors ?? []).forEach((a: any) => sfx.push({ at: fAt(a.at ?? 0.02), name: "pop", v: 0.25 }));
  (spec.actors ?? []).forEach((a: any) => { if (a.say) sfx.push({ at: fAt(a.say.at ?? 0.1), name: "pop", v: 0.18 }); });
  (spec.fx ?? []).forEach((f: any) => {
    if (f.type === "packet") sfx.push({ at: fAt(f.at ?? 0.3), name: "whoosh", v: 0.3 });
    if (f.type === "stamp") { sfx.push({ at: fAt(f.at ?? 0.3), name: "thud", v: 0.6 }); sfx.push({ at: fAt(f.at ?? 0.3) + 3, name: f.tone === "bad" ? "buzz" : "ding", v: 0.5 }); }
    if (f.type === "pow") sfx.push({ at: fAt(f.at ?? 0.3), name: "thud", v: 0.5 });
    if (f.type === "coins") sfx.push({ at: fAt(f.at ?? 0.3), name: "coin", v: 0.4 });
  });
  const actors: any[] = spec.actors ?? [];
  const pos: Record<string, { x: number; y: number; size: number }> = {};
  actors.forEach((a) => { const size = u * (a.scale ?? 1) * (KS[a.kind] ?? 1); pos[a.id] = { x: X(a.x) * w, y: groundY - size * 0.5, size }; });

  const cam = spec.cam ?? {};
  const z = (cam.z ?? [1, 1.07]) as number[], cx = (cam.x ?? [0, 0]) as number[];
  const zoom = z[0] + (z[1] - z[0]) * ease(p), pan = (cx[0] + (cx[1] - cx[0]) * ease(p)) * w;

  const bob = (i: number) => Math.sin((frame + i * 17) / 13) * 5 * (u / 330);
  const blink = (i: number) => ((frame + i * 31) % 100 < 4 ? 0.15 : 1);

  const actorEls = actors.map((a, i) => {
    const at = a.at ?? 0.02, until = a.until ?? 2, size = u * (a.scale ?? 1) * (KS[a.kind] ?? 1), emoList: [number, Emo][] = [[0, a.emo ?? "neutral"], ...(a.emoAt ?? [])];
    const emo = (emoList.filter(([t]) => p >= t).pop() ?? emoList[0])[1];
    const poseList: [number, Pose][] = [[0, a.pose ?? "down"], ...(a.poseAt ?? [])];
    const pose = (poseList.filter(([t]) => p >= t).pop() ?? poseList[0])[1];
    if (p < at || p > until) return null;
    const s = sp(at);
    const from = a.from ?? "pop";
    let tx = 0, ty = 0, sc = 1;
    if (from === "pop") sc = Math.max(0.01, s);
    else if (from === "left") tx = (1 - Math.min(1, s)) * -w * 0.7;
    else if (from === "right") tx = (1 - Math.min(1, s)) * w * 0.7;
    else if (from === "drop") ty = (1 - s) * -h * 0.6;
    if (a.act === "shake" && p >= (a.actAt ?? 0.5) && p < (a.actAt ?? 0.5) + 0.12) tx += Math.sin(frame * 1.7) * 14 * (u / 330);
    if (a.act === "jump" && p >= (a.actAt ?? 0.5)) { const k = ((p - (a.actAt ?? 0.5)) * dur) / 14; if (k < 1) ty -= Math.sin(k * Math.PI) * 60 * (u / 330); }
    const left = X(a.x) * w - (size * 300) / 380 / 2, top = groundY - size;
    const sayEl = a.say && p >= (a.say.at ?? 0.1) ? (() => {
      const sa = sp(a.say.at ?? 0.1, { damping: 12, stiffness: 190, mass: 0.6 });
      const fs = vertical ? 52 : 44, maxW = vertical ? w * 0.82 : Math.min(600, w * 0.3);
      const cxp = clamp(X(a.x) * w + (a.say.bx ?? 0) * u, maxW / 2 + 24, w - maxW / 2 - 24);
      return (<div key={`b${i}`} style={{ position: "absolute", left: cxp, bottom: h - (groundY - size * 0.9) + 26 + (a.say.by ?? 0) * u, transform: "translateX(-50%)", zIndex: 5 + i }}>
        <Bubble text={a.say.text} a={clamp(sa)} fs={fs} maxW={maxW} tone={a.say.tone} tailX={clamp(X(a.x) * w - cxp, -maxW / 2 + 40, maxW / 2 - 40)} /></div>);
    })() : null;
    return (
      <React.Fragment key={a.id}>
        <div style={{ position: "absolute", left, top: top + bob(i) + ty, width: (size * 300) / 380, height: size, transform: `translateX(${tx}px) scale(${sc}) scaleX(${a.flip ? -1 : 1})`, transformOrigin: "50% 100%", zIndex: 2 + i }}>
          {isPerson(a.kind) ? <Person kind={a.kind} emo={emo} pose={pose} blink={blink(i)} /> : <Gadget kind={a.kind} emo={emo} pose={pose} blink={blink(i)} cfg={{ acc: a.acc, color: a.color }} />}
        </div>
        {a.label && <div style={{ position: "absolute", left: X(a.x) * w, top: groundY + 14 + (a.labelDy ?? 0), transform: `translateX(-50%) scale(${Math.min(1, s)})`, background: "#fff", border: `5px solid ${INK}`, borderRadius: 14, padding: "2px 18px", fontFamily: FONT, fontWeight: 800, fontSize: vertical ? 34 : 30, color: INK, letterSpacing: 1, boxShadow: `4px 5px 0 ${INK}`, whiteSpace: "nowrap" }}>{a.label}</div>}
        {sayEl}
      </React.Fragment>
    );
  });

  const loc = (r: any, side: "from" | "to") => (typeof r === "string" ? pos[r] : { x: X(r) * w, y: groundY - u * 0.5, size: u });
  const fxEls = (spec.fx ?? []).map((f: any, i: number) => {
    const at = f.at ?? 0.3, a = clamp((p - at) / Math.max(0.001, f.dur ?? 0.12));
    if (p < at) return null;
    if (f.type === "packet") {
      if (p > at + (f.dur ?? 0.12) + (f.hold ?? 0.04)) return null;
      const A = loc(f.from, "from"), B = loc(f.to, "to"), e = ease(a);
      const x = A.x + (B.x - A.x) * e, y = A.y - (f.y ?? 0.15) * u + (B.y - A.y) * e - Math.sin(e * Math.PI) * u * (f.arc ?? 0.35);
      const sz = u * 0.42;
      return (<div key={i} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${(e - 0.5) * 14}deg) scale(${0.8 + 0.2 * Math.sin(e * Math.PI)})`, zIndex: 20, textAlign: "center", fontFamily: FONT }}>
        {f.kind === "coin" ? <div style={{ width: sz * 0.7, height: sz * 0.7, borderRadius: "50%", background: "#f5b700", border: `6px solid ${INK}`, color: INK, fontWeight: 900, fontSize: sz * 0.45, lineHeight: `${sz * 0.7 - 12}px` }}>$</div>
          : f.kind === "card" ? <div style={{ width: sz * 1.1, height: sz * 0.7, borderRadius: 12, background: "#e4572e", border: `6px solid ${INK}`, position: "relative" }}><div style={{ position: "absolute", left: 10, top: "32%", width: sz * 0.26, height: sz * 0.2, background: "#f5d36a", border: `3px solid ${INK}`, borderRadius: 5 }} /></div>
          : <div style={{ position: "relative", width: sz * 1.25, height: sz * 0.85, background: "#fff6df", border: `6px solid ${INK}`, borderRadius: 10, boxShadow: `5px 6px 0 ${INK}` }}>
            <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}><path d="M2,4 L50,36 L98,4" fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="round" /></svg></div>}
        {f.label && <div style={{ marginTop: 6, background: INK, color: "#fff6df", borderRadius: 10, padding: "0 12px", fontWeight: 900, fontSize: vertical ? 34 : 32, display: "inline-block", fontFamily: "'SF Mono',Menlo,monospace" }}>{f.label}</div>}
      </div>);
    }
    if (f.type === "stamp") {
      const s = spring({ frame: frame - fAt(at), fps, config: { damping: 9, stiffness: 220, mass: 0.6 } });
      const c = tone(f.tone), shake = frame - fAt(at) < 8 ? Math.sin(frame * 3) * 10 : 0;
      return (<div key={i} style={{ position: "absolute", left: (f.x ?? 0.5) * w + shake, top: (f.y ?? 0.4) * h, transform: `translate(-50%,-50%) rotate(${f.rot ?? -8}deg) scale(${1 + (1 - Math.min(1, s)) * 2.6})`, opacity: Math.min(1, s * 2), zIndex: 30, border: `${u * 0.035}px solid ${c}`, color: c, background: "#ffffffd9", borderRadius: 18, padding: `0 ${u * 0.14}px`, fontFamily: FONT, fontWeight: 900, fontSize: u * (vertical ? 0.36 : 0.4), letterSpacing: 4, textShadow: `3px 3px 0 ${INK}22`, whiteSpace: "nowrap" }}>{f.text}</div>);
    }
    if (f.type === "pow") {
      const s = spring({ frame: frame - fAt(at), fps, config: { damping: 8, stiffness: 200, mass: 0.5 } });
      const R = u * 0.42, pts = Array.from({ length: 16 }).map((_, k) => { const r = k % 2 ? R * 0.62 : R, an = (k / 16) * Math.PI * 2; return `${R + r * Math.cos(an)},${R + r * Math.sin(an)}`; }).join(" ");
      return (<div key={i} style={{ position: "absolute", left: (f.x ?? 0.5) * w, top: (f.y ?? 0.35) * h, transform: `translate(-50%,-50%) rotate(${f.rot ?? 8}deg) scale(${Math.min(1.1, s)})`, zIndex: 25, width: R * 2, height: R * 2 }}>
        <svg width={R * 2} height={R * 2}><polygon points={pts} fill={f.color ?? "#f5b700"} stroke={INK} strokeWidth={7} strokeLinejoin="round" /></svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontWeight: 900, fontSize: R * 0.5, color: INK, textAlign: "center", lineHeight: 1 }}>{f.text}</div></div>);
    }
    if (f.type === "coins") {
      return (<>{Array.from({ length: f.n ?? 10 }).map((_, k) => { const t0 = ((frame - fAt(at)) / 40 + k * 0.37) % 1.2, x = ((k * 241 + 120) % 1000) / 1000 * w; return (<div key={`${i}-${k}`} style={{ position: "absolute", left: x, top: -80 + t0 * (h + 160), width: u * 0.2, height: u * 0.2, borderRadius: "50%", background: "#f5b700", border: `5px solid ${INK}`, transform: `rotate(${t0 * 360 * (k % 2 ? 1 : -1)}deg)`, zIndex: 3, textAlign: "center", fontFamily: FONT, fontWeight: 900, fontSize: u * 0.12, lineHeight: `${u * 0.2 - 10}px`, color: INK }}>$</div>); })}</>);
    }
    return null;
  });

  // papan infografis (spec lama) dalam gaya kartun
  const ins = spec.insert;
  let boardEl: React.ReactNode = null;
  if (ins && board) {
    const at = ins.at ?? 0.04, s = sp(at, { damping: 13, stiffness: 160, mass: 0.7 });
    const R = vertical
      ? (ins.pos === "full" ? { x: 0.04, y: 0.09, w: 0.92, h: 0.56 } : { x: 0.04, y: 0.09, w: 0.92, h: 0.36 })
      : ({ full: { x: 0.07, y: 0.14, w: 0.86, h: 0.64 }, top: { x: 0.06, y: 0.1, w: 0.88, h: 0.32 }, left: { x: 0.03, y: 0.12, w: 0.5, h: 0.58 }, right: { x: 0.47, y: 0.12, w: 0.5, h: 0.58 } } as any)[ins.pos ?? "full"];
    if (p >= at) boardEl = (
      <div style={{ position: "absolute", left: R.x * w, top: R.y * h, width: R.w * w, height: R.h * h, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${Math.max(0.01, s)}) rotate(${(1 - Math.min(1, s)) * -5}deg)`, zIndex: 40 }}>
        <Fit availW={R.w * w} availH={R.h * h} max={ins.max ?? (vertical ? 1.25 : 1.5)}>
          <div style={{ background: "#fff6df", border: `8px solid ${INK}`, borderRadius: 30, padding: 34, boxShadow: `12px 14px 0 ${INK}`, color: INK, fontFamily: FONT }}>{board}</div>
        </Fit>
      </div>);
  }

  const titleEl = title ? (() => { const s = sp(0.03, { damping: 12, stiffness: 180, mass: 0.6 }); return (
    <div style={{ position: "absolute", top: vertical ? h * 0.035 : 26, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 60 }}>
      <div style={{ transform: `rotate(-1.5deg) scale(${Math.max(0.01, s)})`, background: "#f5b700", color: INK, border: `6px solid ${INK}`, borderRadius: 14, padding: "4px 26px", fontFamily: FONT, fontWeight: 900, fontSize: vertical ? 48 : 40, boxShadow: `6px 7px 0 ${INK}`, maxWidth: w * 0.9, textAlign: "center" }}>{title}</div></div>); })() : null;

  return (
    <Ctx.Provider value={ctx}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${-pan}px) scale(${zoom})`, transformOrigin: "50% 60%" }}>
          {spec.bg !== "none" && <Backdrop kind={spec.bg ?? "paper"} frame={frame} />}
          {actorEls}
          {fxEls}
        </div>
        {boardEl}
        {titleEl}
        {sfx.map((s, i) => <Sequence key={i} from={s.at} durationInFrames={45}><Audio src={staticFile(`sfx/${s.name}.wav`)} volume={s.v ?? 0.4} /></Sequence>)}
      </AbsoluteFill>
    </Ctx.Provider>
  );
};
