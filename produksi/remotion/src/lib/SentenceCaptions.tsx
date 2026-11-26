// Caption per kalimat (bawaan semua siklus baru): satu kalimat utuh tampil selama diucapkan, tanpa sorotan per kata.
// Kalimat lebih panjang dari MAX_WORDS dipecah di koma agar paling banyak sekitar tiga baris.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { CaptionWord } from "./types";

const MAX_WORDS = 20, MIN_PART = 6, HOLD_MS = 500;
const ends = (w: string) => /[.!?]["”’)]?$/.test(w);
export const toLines = (words: CaptionWord[]): CaptionWord[][] => {
  const sentences: CaptionWord[][] = []; let cur: CaptionWord[] = [];
  words.forEach((w, i) => { cur.push(w); if (ends(w.text) || i === words.length - 1) { sentences.push(cur); cur = []; } });
  return sentences.flatMap((s) => {
    const out: CaptionWord[][] = []; let rest = s;
    while (rest.length > MAX_WORDS) {
      // potong di koma yang paling dekat tengah; tanpa koma, potong di tengah
      const mid = Math.min(MAX_WORDS, Math.ceil(rest.length / 2));
      const commas = rest.map((w, i) => (/[,;:]$/.test(w.text) ? i + 1 : 0)).filter((i) => i >= MIN_PART && i <= MAX_WORDS && rest.length - i >= MIN_PART);
      const cut = commas.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid))[0] ?? mid;
      out.push(rest.slice(0, cut)); rest = rest.slice(cut);
    }
    return [...out, rest];
  });
};

export const SentenceCaptions: React.FC<{ words: CaptionWord[]; vertical: boolean }> = ({ words, vertical }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig(); const ms = (frame / fps) * 1000;
  const lines = React.useMemo(() => toLines(words), [words]);
  const i = lines.findIndex((l, k) => ms >= l[0].startMs && ms < Math.min(lines[k + 1]?.[0].startMs ?? Infinity, l[l.length - 1].endMs + HOLD_MS));
  if (i < 0) return null;
  return (
    <div style={{ position: "absolute", left: vertical ? 60 : 200, right: vertical ? 60 : 200, bottom: vertical ? 320 : 54, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(14,10,24,0.72)", borderRadius: 22, padding: vertical ? "20px 30px" : "12px 28px", textAlign: "center", color: "#fff", fontFamily: "'Avenir Next','Helvetica Neue',Arial,sans-serif", fontWeight: 700, fontSize: vertical ? 52 : 42, lineHeight: 1.28, textWrap: "balance" }}>
        {lines[i].map((w) => w.text).join(" ")}
      </div>
    </div>
  );
};
