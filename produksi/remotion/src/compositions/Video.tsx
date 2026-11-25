import React from "react";
import { AbsoluteFill, Audio, Loop, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { themeFor } from "../themes";
import type { SceneProps, VideoProps } from "../lib/types";
import { Diagram } from "../components/Diagram";
import { CodeBlock } from "../components/CodeBlock";
import { DataPanel } from "../components/DataPanel";
import { clamp, ease } from "../lib/ui";
import { Fit } from "../lib/Fit";
import { Stage } from "../toon/Stage";
import { Diorama } from "../diorama/Diorama";

const Captions: React.FC<{ words: SceneProps["captions"]; big: boolean; accent: string; per?: number }> = ({ words, big, accent, per = 4 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const i = words.findIndex((w) => ms >= w.startMs && ms < w.endMs);
  if (i < 0) return null;
  const page = words.slice(Math.floor(i / per) * per, Math.floor(i / per) * per + per);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, bottom: big ? 300 : 60, textAlign: "center", fontSize: big ? 74 : 54, fontWeight: 900, color: "#fff", fontFamily: "'Chalkboard SE','Marker Felt','Comic Sans MS',sans-serif", WebkitTextStroke: `${big ? 12 : 9}px #1b1b1b`, paintOrder: "stroke fill", letterSpacing: 1, lineHeight: 1.1 }}>
      {page.map((w, k) => (<span key={k} style={{ color: per > 1 && w === words[i] ? "#ffd23f" : "#fff", fontSize: per === 1 ? "1.3em" : undefined }}>{w.text} </span>))}
    </div>
  );
};

const TextCard: React.FC<{ spec: any; p: number; t: ReturnType<typeof themeFor> }> = ({ spec, p, t }) => (
  <div style={{ textAlign: "center", opacity: ease(p / 0.15) }}>
    <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 1.1, color: t.fg }}>{spec.headline}</div>
    {spec.sub && <div style={{ fontSize: 44, color: t.accent, marginTop: 30, fontWeight: 700 }}>{spec.sub}</div>}
  </div>
);

const Scene: React.FC<{ s: SceneProps; trackId: string; vertical: boolean }> = ({ s, trackId, vertical }) => {
  const t = themeFor(trackId);
  const frame = useCurrentFrame();
  const p = clamp(frame / Math.max(1, s.audioFrames));
  const spec = s.spec, vp = { spec, p, vertical, t };
  const dataKinds = ["stats", "counter", "bars", "netting", "collapse", "bignum", "breakdown"];
  const body = !spec ? null : spec.headline ? <TextCard spec={spec} p={p} t={t} /> : spec.kind === "code" ? <CodeBlock {...vp} /> : dataKinds.includes(spec.kind) ? <DataPanel {...vp} /> : <Diagram {...vp} />;
  const stage = s.stage;
  return (
    <AbsoluteFill style={{ background: t.bg, color: t.fg, fontFamily: t.font }}>
      {s.clip && (
        <AbsoluteFill style={{ transform: `scale(${1 + 0.06 * p})` }}>
          <Loop durationInFrames={Math.max(1, s.clipFrames ?? s.durationFrames)} layout="none">
            <OffthreadVideo src={staticFile(s.clip)} muted style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </Loop>
        </AbsoluteFill>
      )}
      {stage?.engine === "diorama" ? (
        <Diorama world={stage.world} shot={stage} frame={frame} dur={s.audioFrames} />
      ) : stage ? (
        <Stage spec={stage} frame={frame} dur={s.audioFrames} vertical={vertical} title={s.type === "remotion-text" ? undefined : s.text} board={stage.insert ? body : null} />
      ) : (
        <>
          {s.text && s.type !== "remotion-text" && (
            <div style={{ position: "absolute", top: vertical ? 150 : 70, left: 0, right: 0, textAlign: "center", fontSize: vertical ? 54 : 44, fontWeight: 800, color: t.accent, padding: "0 70px", opacity: ease(p / 0.1) }}>{s.text}</div>
          )}
          <div style={{ position: "absolute", top: vertical ? 300 : 170, bottom: vertical ? 520 : 200, left: vertical ? 70 : 140, right: vertical ? 70 : 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {body && <Fit availW={vertical ? 940 : 1640} availH={vertical ? 1100 : 710} max={spec?.headline ? 1 : vertical ? 1.3 : 1.6}>{body}</Fit>}
          </div>
        </>
      )}
      {s.audio && <Audio src={staticFile(s.audio)} playbackRate={s.audioRate ?? 1} />}
      <Captions words={s.captions} big={vertical} accent={t.accent} per={stage?.engine === "diorama" ? 1 : 4} />
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
