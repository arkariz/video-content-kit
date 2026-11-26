// Konteks satu shot R3. Komponen adegan membaca waktu, label, dan kata lewat useShot() / useLabel().
import React from "react";
import { Easing } from "remotion";
import { seg } from "./kit";

export type R3Label = { text: string; word: string; at: number; out: number; found?: boolean };
export type R3Word = { text: string; at: number; end: number };
export type R3ShotSpec = {
  sentence: number; show: string; scale: string; motion: string; transition: string;
  labels?: { text: string; word: string; atMs?: number; found?: boolean }[];
  count?: { value: number; as: "dots" | "items" | "timeline" | "split" };
  faces?: Record<string, string>; mood?: string; bubble?: string; three_d?: boolean;
  startMs: number; endMs: number; words?: { text: string; startMs: number; endMs: number }[];
};
export type ShotCtx = {
  /** detik sejak shot ini mulai (shot `hold` meneruskan waktu shot sebelumnya) */
  t: number;
  /** detik sejak scene mulai */
  T: number;
  /** panjang shot (detik, sampai shot berikutnya mulai) */
  dur: number;
  sceneId: string; track: string; index: number; vertical: boolean;
  /** shot pemilik (dan shot `hold` yang meneruskannya) dari kontrak */
  shot: R3ShotSpec; shots: R3ShotSpec[];
  labels: R3Label[]; words: R3Word[];
  faces: Record<string, string>; mood?: string; bubble?: string;
  /** detik (relatif shot) saat kata ini diucapkan; n = kemunculan ke-n. NaN bila tidak ada. */
  word: (text: string, n?: number) => number;
  /** keadaan label 0..1 (dengan pantulan) menurut waktu katanya. */
  label: (text: string) => number;
};

const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9]+/g, "");
export const labelP = (t: number, l: R3Label) => seg(t, l.at, l.at + 0.22, Easing.out(Easing.back(1.8))) * (1 - seg(t, l.out, l.out + 0.2, Easing.in(Easing.back(1.5))));

export const makeCtx = (base: Omit<ShotCtx, "word" | "label">): ShotCtx => ({
  ...base,
  word: (text, n = 0) => {
    const q = text.split(/\s+/).map(norm).filter(Boolean);
    let seen = 0;
    for (let i = 0; i < base.words.length; i++) if (q.every((x, k) => norm(base.words[i + k]?.text ?? "") === x)) { if (seen++ === n) return base.words[i].at; }
    return NaN;
  },
  label: (text) => { const l = base.labels.find((x) => x.text === text); return l ? labelP(base.t, l) : 0; },
});

const Ctx = React.createContext<ShotCtx | null>(null);
export const ShotProvider: React.FC<{ value: ShotCtx; children: React.ReactNode }> = ({ value, children }) => <Ctx.Provider value={value}>{children}</Ctx.Provider>;
/** Waktu dan data shot yang sedang dirender. Hanya di dalam komponen adegan. */
export const useShot = (): ShotCtx => {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useShot() hanya bisa dipakai di dalam komponen adegan R3");
  return v;
};
/** Keadaan label 0..1 menurut kata di kontrak. Pakai bersama <Pill p={...}> untuk label yang menempel pada benda bergerak. */
export const useLabel = (text: string) => useShot().label(text);
