import React from "react";
import { INK } from "./ctx";

/** Bubble dialog: putih, kontur tebal, ekor menunjuk ke pembicara. */
export const Bubble: React.FC<{ text: string; a: number; fs: number; maxW: number; tail?: "down" | "left" | "right"; tailX?: number; tone?: "say" | "shout" | "think" }> = ({ text, a, fs, maxW, tailX = 0, tone = "say" }) => (
  <div style={{ position: "relative", opacity: Math.min(1, a * 1.6), transform: `scale(${0.6 + 0.4 * a}) rotate(${(1 - a) * -4}deg)`, transformOrigin: "bottom center" }}>
    <div style={{ background: "#fff", color: INK, border: `${Math.round(fs * 0.12)}px solid ${INK}`, borderRadius: tone === "think" ? fs * 1.4 : fs * 0.8, padding: `${fs * 0.35}px ${fs * 0.6}px`, fontSize: fs, fontWeight: 800, lineHeight: 1.12, textAlign: "center", maxWidth: maxW, fontFamily: "'Chalkboard SE','Marker Felt','Comic Sans MS',sans-serif", boxShadow: `${fs * 0.1}px ${fs * 0.12}px 0 ${INK}`, textTransform: tone === "shout" ? "uppercase" : "none", letterSpacing: tone === "shout" ? 1 : 0 }}>{text}</div>
    <div style={{ position: "absolute", left: `calc(50% + ${tailX}px)`, bottom: -fs * 0.52, width: 0, height: 0, borderLeft: `${fs * 0.3}px solid transparent`, borderRight: `${fs * 0.3}px solid transparent`, borderTop: `${fs * 0.56}px solid ${INK}`, transform: "translateX(-50%)" }} />
    <div style={{ position: "absolute", left: `calc(50% + ${tailX}px)`, bottom: -fs * 0.34, width: 0, height: 0, borderLeft: `${fs * 0.2}px solid transparent`, borderRight: `${fs * 0.2}px solid transparent`, borderTop: `${fs * 0.4}px solid #fff`, transform: "translateX(-50%)" }} />
  </div>
);
