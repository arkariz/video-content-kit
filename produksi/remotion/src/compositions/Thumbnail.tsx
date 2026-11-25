import React from "react";
import { AbsoluteFill } from "remotion";
import { Stage } from "../toon/Stage";
import { INK } from "../toon/ctx";

export type ThumbProps = { trackId: string; lines: { text: string; color?: string; size?: number }[]; align?: "left" | "center"; stage: any };

/** Thumbnail 1280x720: adegan kartun (spec yang sama dengan 04-stage) + judul raksasa berkontur. Maks. 4 kata. */
export const Thumbnail: React.FC<ThumbProps> = ({ lines, align = "left", stage }) => (
  <AbsoluteFill style={{ background: "#fff6df" }}>
    <Stage spec={stage} frame={89} dur={90} vertical={false} />
    <div style={{ position: "absolute", top: 36, left: align === "left" ? 48 : 0, right: align === "left" ? undefined : 0, textAlign: align, zIndex: 80 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ fontFamily: "'Arial Black','Helvetica Neue',sans-serif", fontWeight: 900, fontSize: l.size ?? 150, lineHeight: 1.02, color: l.color ?? "#fff", WebkitTextStroke: `22px ${INK}`, paintOrder: "stroke fill", textShadow: `10px 12px 0 ${INK}55`, whiteSpace: "nowrap", transform: `rotate(${i % 2 ? 1.2 : -2}deg)` }}>{l.text}</div>
      ))}
    </div>
  </AbsoluteFill>
);
