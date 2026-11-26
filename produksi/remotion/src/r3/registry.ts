// Registri komponen adegan per siklus. Setiap siklus R3 menulis `04-shots.tsx` di folder siklusnya (di samping 03-script.json)
// dengan `export default defineShots({ s06: [ShotSatu, ShotDua] })`. Webpack mengumpulkan semua file itu saat bundling,
// jadi tidak ada daftar yang perlu diperbarui tangan. Kunci modul = path relatif dari root repo (dikirim render.mjs).
import type React from "react";
import type { Ptr } from "./kit";

export type ShotOpts = {
  /** "own" = komponen menggambar labelnya sendiri (useLabel + Pill). Atau posisi tetap per teks label: [x, y] atau [x, y, penunjuk]. */
  labels?: "own" | Record<string, [number, number] | [number, number, Ptr]>;
  /** warna isian label otomatis (bergiliran) */
  labelBg?: string[];
  /** "own" = komponen menggambar bubble sendiri; selain itu mesin menggambar bubble di bubbleAt (ujung ekor). */
  bubble?: "own"; bubbleAt?: [number, number];
  /** false = komponen mengatur kamera sendiri; default mesin menambah kamera melayang pelan dan sedikit membesar. */
  drift?: boolean;
  /** titik x (logis 0..1920) yang dijaga di tengah layar pada komposisi tegak (Shorts). */
  focus?: number;
  /** titik asal iris/dorong saat shot ini masuk (logis 1920x1080). Default tengah. */
  from?: [number, number];
};
export type ShotDef = { C: React.FC; opts: ShotOpts };
export type ShotEntry = React.FC | ShotDef | null | undefined;
export type ShotsModule = Record<string, ShotEntry[]>;

/** Satu shot dengan opsi. */
export const shot = (C: React.FC, opts: ShotOpts = {}): ShotDef => ({ C, opts });
/** Daftar komponen per scene, urut sama dengan `shots` di 03-script.json. Shot `hold` boleh diisi null (meneruskan shot sebelumnya). */
export const defineShots = (m: ShotsModule): ShotsModule => m;
export const toDef = (e: ShotEntry): ShotDef | null => (!e ? null : typeof e === "function" ? { C: e, opts: {} } : e);

type Ctx = { keys(): string[]; (k: string): { default?: ShotsModule } };
const ctxs: [string, Ctx][] = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ["hasil/tracks/", (require as any).context("../../../../hasil/tracks", true, /04-shots\.tsx$/)],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ["produksi/contoh-r3/", (require as any).context("../../../contoh-r3", true, /04-shots\.tsx$/)],
];
const REG: Record<string, ShotsModule> = {};
for (const [prefix, c] of ctxs) for (const k of c.keys()) { const m = c(k).default; if (m) REG[prefix + k.replace(/^\.\//, "")] = m; }

/** Modul adegan untuk path relatif root (mis. "hasil/tracks/T02-…/siklus/002-…/04-shots.tsx"). */
export const getShots = (module?: string): ShotsModule | undefined => (module ? REG[module] : undefined);
export const registeredModules = () => Object.keys(REG);
