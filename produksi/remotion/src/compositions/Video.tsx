import React, { useLayoutEffect, useRef, useState } from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { themeFor } from "../themes";
import type { SceneProps, VideoProps } from "../lib/types";
import { Diagram } from "../components/Diagram";
import { CodeBlock } from "../components/CodeBlock";
import { DataPanel } from "../components/DataPanel";
import { clamp, ease } from "../lib/ui";

const Captions: React.FC<{ words: SceneProps["captions"]; big: boolean; accent: string }> = ({ words, big, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const i = words.findIndex((w) => ms >= w.startMs && ms < w.endMs);
  if (i < 0) return null;
  const page = words.slice(Math.floor(i / 4) * 4, Math.floor(i / 4) * 4 + 4);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, bottom: big ? 300 : 70, textAlign: "center", fontSize: big ? 78 : 52, fontWeight: 800, color: "#fff", textShadow: "0 3px 12px #000" }}>
      {page.map((w, k) => (<span key={k} style={{ color: w === words[i] ? accent : "#fff" }}>{w.text} </span>))}
    </div>
  );
};

const TextCard: React.FC<{ spec: any; p: number; t: ReturnType<typeof themeFor> }> = ({ spec, p, t }) => (
  <div style={{ textAlign: "center", opacity: ease(p / 0.15) }}>
    <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 1.1, color: t.fg }}>{spec.headline}</div>
    {spec.sub && <div style={{ fontSize: 44, color: t.accent, marginTop: 30, fontWeight: 700 }}>{spec.sub}</div>}
  </div>
);

/** Ukur isi lalu skalakan agar pas di area (maks. `max`); tidak pernah meluber. */
const Fit: React.FC<{ availW: number; availH: number; max: number; children: React.ReactNode }> = ({ availW, availH, max, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const next = Math.min(max, availW / el.scrollWidth, availH / el.scrollHeight);
    if (Math.abs(next - k) > 0.001) setK(next);
  });
  return <div ref={ref} style={{ width: "max-content", transform: `scale(${k})`, transformOrigin: "center" }}>{children}</div>;
};

const Scene: React.FC<{ s: SceneProps; trackId: string; vertical: boolean }> = ({ s, trackId, vertical }) => {
  const t = themeFor(trackId);
  const frame = useCurrentFrame();
  const p = clamp(frame / Math.max(1, s.audioFrames));
  const spec = s.spec, vp = { spec, p, vertical, t };
  const dataKinds = ["stats", "counter", "bars", "netting", "collapse", "bignum", "breakdown"];
  const body = !spec ? null : spec.headline ? <TextCard spec={spec} p={p} t={t} /> : spec.kind === "code" ? <CodeBlock {...vp} /> : dataKinds.includes(spec.kind) ? <DataPanel {...vp} /> : <Diagram {...vp} />;
  return (
    <AbsoluteFill style={{ background: t.bg, color: t.fg, fontFamily: t.font }}>
      {s.clip && <OffthreadVideo src={staticFile(s.clip)} muted style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />}
      {s.clip && <AbsoluteFill style={{ background: "linear-gradient(#0f1b2dcc, #0f1b2d00 35%, #0f1b2d00 65%, #0f1b2dcc)" }} />}
      {s.text && s.type !== "remotion-text" && (
        <div style={{ position: "absolute", top: vertical ? 150 : 70, left: 0, right: 0, textAlign: "center", fontSize: vertical ? 54 : 44, fontWeight: 800, color: t.accent, letterSpacing: 1, padding: "0 70px", opacity: ease(p / 0.1) }}>{s.text}</div>
      )}
      <div style={{ position: "absolute", top: vertical ? 300 : 170, bottom: vertical ? 520 : 200, left: vertical ? 70 : 140, right: vertical ? 70 : 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {body && <Fit availW={vertical ? 940 : 1640} availH={vertical ? 1100 : 710} max={spec?.headline ? 1 : vertical ? 1.3 : 1.6}>{body}</Fit>}{!body && (s.clip ? null : <div style={{ fontSize: 76, fontWeight: 800, textAlign: "center" }}>{s.text}</div>)}
      </div>
      {s.audio && <Audio src={staticFile(s.audio)} />}
      <Captions words={s.captions} big={vertical} accent={t.accent} />
    </AbsoluteFill>
  );
};

export const Video: React.FC<VideoProps & { vertical?: boolean }> = ({ scenes, trackId, vertical = false }) => {
  let from = 0;
  return (
    <AbsoluteFill>
      {scenes.map((s) => {
        const el = (<Sequence key={s.id} from={from} durationInFrames={s.durationFrames}><Scene s={s} trackId={trackId} vertical={vertical} /></Sequence>);
        from += s.durationFrames;
        return el;
      })}
    </AbsoluteFill>
  );
};

export const totalFrames = (scenes: SceneProps[]) => scenes.reduce((a, s) => a + s.durationFrames, 0);
