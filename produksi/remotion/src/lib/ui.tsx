import React from "react";
import { useVideoConfig } from "remotion";
import type { Theme } from "../themes";

export type Tone = "default" | "good" | "bad" | "hot" | "muted";
export type VProps = { spec: any; p: number; vertical: boolean; t: Theme };

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const ease = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
/** Kemunculan item ke-i dari n: 0..1, tersebar antara 5% dan 80% dari scene. */
export const appear = (p: number, i: number, n: number, span = 0.12) => ease((p - (0.05 + (i / Math.max(1, n)) * 0.75)) / span);
export const toneColor = (tone: Tone | undefined, t: Theme) => ({ default: t.fg, good: t.good, bad: t.bad, hot: t.accent, muted: t.muted }[tone ?? "default"]);

export const useSize = () => { const { width, height } = useVideoConfig(); return { width, height }; };

export const Box: React.FC<{ t: Theme; tone?: Tone; a?: number; w?: number | string; pad?: number; dashed?: boolean; style?: React.CSSProperties; children: React.ReactNode }> = ({ t, tone, a = 1, w, pad = 28, dashed, style, children }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: pad, borderRadius: 22, background: t.panel, border: `4px ${dashed ? "dashed" : "solid"} ${toneColor(tone, t)}`, opacity: a, transform: `translateY(${(1 - a) * 24}px)`, color: t.fg, textAlign: "center", ...style }}>{children}</div>
);

export const Arrow: React.FC<{ t: Theme; label?: string; a?: number; vertical?: boolean; broken?: boolean; back?: boolean; len?: number; fs?: number }> = ({ t, label, a = 1, vertical, broken, back, len = 130, fs = 30 }) => {
  const col = broken ? t.bad : t.accent;
  return (
    <div style={{ opacity: a, display: "flex", flexDirection: vertical ? "column" : "column", alignItems: "center", justifyContent: "center", minWidth: vertical ? undefined : len, minHeight: vertical ? len : undefined, color: col, fontSize: fs, fontWeight: 700, gap: 6 }}>
      {label ? <div style={{ fontSize: fs * 0.85, color: broken ? t.bad : t.fg, maxWidth: 220, textAlign: "center", lineHeight: 1.15 }}>{label}</div> : null}
      <div style={{ fontSize: fs * 1.8, lineHeight: 1 }}>{broken ? "✕" : vertical ? (back ? "↑" : "↓") : back ? "←" : "→"}</div>
    </div>
  );
};

export const Pill: React.FC<{ t: Theme; tone?: Tone; a?: number; children: React.ReactNode; mono?: boolean }> = ({ t, tone, a = 1, children, mono }) => (
  <span style={{ opacity: a, display: "inline-block", padding: "8px 22px", borderRadius: 999, border: `3px solid ${toneColor(tone, t)}`, color: toneColor(tone, t), fontFamily: mono ? t.mono : t.font, fontSize: 34, fontWeight: 700 }}>{children}</span>
);

export const Note: React.FC<{ t: Theme; a: number; children: React.ReactNode }> = ({ t, a, children }) => (
  <div style={{ opacity: a, marginTop: 36, textAlign: "center", fontSize: 38, color: t.muted, fontWeight: 600 }}>{children}</div>
);
