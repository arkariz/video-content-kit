// Util lokal P01: lintasan tetes dari titik-titik jalan (fungsi murni dari t), kecepatan, dan gerak tetes.
import { Easing } from "remotion";
import { clamp, mix } from "@r3";

export type Wp = [number, number, number, ("in" | "out" | "io" | "lin")?];
const EZ = { in: Easing.in(Easing.quad), out: Easing.out(Easing.quad), io: Easing.inOut(Easing.sin), lin: (n: number) => n };

/** Posisi pada lintasan: tiap segmen menuju titik berikutnya dengan easing titik tujuan (default io). */
export const trail = (t: number, w: Wp[]): [number, number] => {
  if (t <= w[0][0]) return [w[0][1], w[0][2]];
  const last = w[w.length - 1]; if (t >= last[0]) return [last[1], last[2]];
  let i = 0; while (i < w.length - 2 && t > w[i + 1][0]) i++;
  const a = w[i], b = w[i + 1]; const p = EZ[b[3] ?? "io"](clamp((t - a[0]) / Math.max(1e-6, b[0] - a[0])));
  return [mix(a[1], b[1], p), mix(a[2], b[2], p)];
};
/** Lintasan yang dihaluskan (rata-rata berbobot 5 sampel) supaya sudut belokan membulat. */
export const soft = (t: number, w: Wp[], k = 0.08): [number, number] => {
  const ws = [1, 2, 3, 2, 1]; let x = 0, y = 0;
  ws.forEach((q, i) => { const [a, b] = trail(t + (i - 2) * k * 0.5, w); x += a * q; y += b * q; });
  return [x / 9, y / 9];
};
export const vel = (t: number, w: Wp[]): [number, number] => {
  const a = soft(t - 0.04, w), b = soft(t + 0.04, w); return [(b[0] - a[0]) / 0.08, (b[1] - a[1]) / 0.08];
};
/** Waktu kata dari caption, atau cadangan bila kata tidak ada. */
export const tw = (x: number, fb: number) => (Number.isFinite(x) ? x : fb);
/** Squash-stretch dari kecepatan: memanjang searah gerak, volume dijaga (sx*sy sekitar 1), maksimal 25%. */
export const stretch = (t: number, w: Wp[], full = 2600) => {
  const [vx, vy] = vel(t, w); const sp = Math.hypot(vx, vy); const s = 1 + clamp(sp / full) * 0.25;
  const rot = sp > 30 ? (Math.atan2(-vx, vy) * 180) / Math.PI : 0;
  return { sx: 1 / Math.sqrt(s), sy: s, rot, sp };
};
/** Benturan: puncak saat t0 lalu meredam sambil bergoyang. Hasil 1 -> 0. */
export const impact = (t: number, t0: number, k = 7, f = 18) => (t < t0 ? 0 : Math.exp(-(t - t0) * k) * (0.6 + 0.4 * Math.cos((t - t0) * f)));
