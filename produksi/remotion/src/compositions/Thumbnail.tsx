import React from "react";
import { AbsoluteFill } from "remotion";
import { Stage } from "../toon/Stage";
import { INK } from "../toon/ctx";
import { R3Scene } from "../r3/engine";

export type ThumbProps = { trackId: string; lines: { text: string; color?: string; size?: number }[]; align?: "left" | "center"; stage: any; vertical?: boolean };

/** Thumbnail 1280x720 (atau 1080x1920 untuk Shorts, vertical): adegan kartun (spec yang sama dengan 04-stage) + judul raksasa berkontur. Maks. 4 kata. */
export const Thumbnail: React.FC<ThumbProps> = ({ lines, align: al, stage, vertical = false }) => { const align = al ?? (vertical ? "center" : "left"); return (
  <AbsoluteFill style={{ background: "#fff6df" }}>
    {stage?.engine === "r3" ? ( // gambar 3D: shot tunggal dari 04-shots.tsx (stage = { engine: "r3", module, scene })
      <R3Scene vertical={vertical} s={{ id: stage.scene, type: "r3", text: "", description: "", audio: "", audioFrames: 90, durationFrames: 90, captions: [], r3: { module: stage.module, track: "", shots: [{ sentence: 1, show: "thumbnail", scale: "object", motion: "-", transition: "cut", startMs: 0, endMs: 3000, words: [] }] } } as any} />
    ) : <Stage spec={stage} frame={89} dur={90} vertical={vertical} />}
    <div style={{ position: "absolute", top: vertical ? 220 : 36, left: align === "left" ? 48 : 0, right: align === "left" ? undefined : 0, textAlign: align, zIndex: 80 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ fontFamily: "'Arial Black','Helvetica Neue',sans-serif", fontWeight: 900, fontSize: l.size ?? 150, lineHeight: 1.02, color: l.color ?? "#fff", WebkitTextStroke: `22px ${INK}`, paintOrder: "stroke fill", textShadow: `10px 12px 0 ${INK}55`, whiteSpace: "nowrap", transform: `rotate(${i % 2 ? 1.2 : -2}deg)` }}>{l.text}</div>
      ))}
    </div>
  </AbsoluteFill>
); };
