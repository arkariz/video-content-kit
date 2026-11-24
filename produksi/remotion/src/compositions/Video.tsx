import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { themeFor } from "../themes";
import type { SceneProps, VideoProps } from "../lib/types";

const Captions: React.FC<{ words: SceneProps["captions"]; big: boolean; accent: string }> = ({ words, big, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const i = words.findIndex((w) => ms >= w.startMs && ms < w.endMs);
  if (i < 0) return null;
  const page = words.slice(Math.floor(i / 4) * 4, Math.floor(i / 4) * 4 + 4);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, bottom: big ? 300 : 90, textAlign: "center", fontSize: big ? 78 : 52, fontWeight: 800, color: "#fff", textShadow: "0 3px 12px #000" }}>
      {page.map((w, k) => (
        <span key={k} style={{ color: w === words[i] ? accent : "#fff" }}>{w.text} </span>
      ))}
    </div>
  );
};

const Scene: React.FC<{ s: SceneProps; trackId: string; vertical: boolean }> = ({ s, trackId, vertical }) => {
  const t = themeFor(trackId);
  return (
    <AbsoluteFill style={{ background: t.bg, color: t.fg, fontFamily: t.font, justifyContent: "center", padding: vertical ? 70 : 140, alignItems: t.layout === "center" ? "center" : "flex-start" }}>
      {s.clip && <OffthreadVideo src={staticFile(s.clip)} muted style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />}
      <div style={{ fontSize: vertical ? 84 : 76, fontWeight: 800, lineHeight: 1.1, maxWidth: vertical ? 940 : 1500 }}>{s.text}</div>
      {/* TODO per tipe visual (remotion-diagram/code/data): komponen khusus ditambah per track saat produksi */}
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
        const el = (
          <Sequence key={s.id} from={from} durationInFrames={s.durationFrames}>
            <Scene s={s} trackId={trackId} vertical={vertical} />
          </Sequence>
        );
        from += s.durationFrames;
        return el;
      })}
    </AbsoluteFill>
  );
};

export const totalFrames = (scenes: SceneProps[]) => scenes.reduce((a, s) => a + s.durationFrames, 0);
