// Penghitung R3 (kontrak `count`): angka dibuat bisa dihitung. dots = proporsi, items = jumlah satu per satu, timeline = waktu, split = perbandingan.
import React from "react";
import { Easing } from "remotion";
import { Pill, SANS, clamp, fade, mix, pop, seg, shade } from "./kit";

/** Grid titik. `value` dari `total` diwarnai satu per satu antara detik from dan to. */
export const Dots: React.FC<{ t: number; x: number; y: number; total: number; value: number; cols?: number; r?: number; gap?: number; on?: string; off?: string; from?: number; to?: number; appear?: number }> = ({ t, x, y, total, value, cols = 10, r = 16, gap = 46, on = "#f2b632", off = "#ffffff", from = 0.3, to = 1.8, appear = 0 }) => {
  const rows = Math.ceil(total / cols), w = (cols - 1) * gap, h = (rows - 1) * gap;
  const lit = Math.floor(seg(t, from, to, Easing.inOut(Easing.quad)) * value + 1e-6);
  return (
    <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
      {Array.from({ length: total }, (_, i) => {
        const cx = (i % cols) * gap, cy = Math.floor(i / cols) * gap, isOn = i < lit;
        const s = pop(t, appear + (i / total) * 0.5, 0.25);
        const k = isOn ? pop(t, from + (i / Math.max(1, value)) * (to - from), 0.2) : 0;
        return <g key={i} transform={`translate(${cx} ${cy}) scale(${s * (1 + k * 0.15 - (k > 0.99 ? 0.15 : 0))})`}>
          <circle r={r} fill={isOn ? on : off} opacity={isOn ? 1 : 0.28} />
          {isOn && <circle cx={-r * 0.3} cy={-r * 0.32} r={r * 0.32} fill="#fff" opacity={0.3} />}
        </g>;
      })}
    </g>
  );
};

/** Benda muncul satu per satu dengan penghitung. render(i) menggambar satu benda di titik (0,0). */
export const Items: React.FC<{ t: number; x: number; y: number; value: number; render: (i: number) => React.ReactNode; cols?: number; gap?: [number, number]; from?: number; to?: number; counter?: boolean; counterAt?: [number, number]; color?: string; max?: number }> = ({ t, x, y, value, render, cols = 12, gap = [110, 90], from = 0.2, to = 2.2, counter = true, counterAt, color = "#fff", max = 120 }) => {
  const shown = Math.min(value, max), k = seg(t, from, to, Easing.inOut(Easing.quad));
  const n = Math.floor(k * shown + 1e-6), num = Math.round(k * value);
  const rows = Math.ceil(shown / cols), w = (Math.min(cols, shown) - 1) * gap[0], h = (rows - 1) * gap[1];
  return (
    <g>
      <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
        {Array.from({ length: n }, (_, i) => <g key={i} transform={`translate(${(i % cols) * gap[0]} ${Math.floor(i / cols) * gap[1]}) scale(${pop(t, from + (i / shown) * (to - from), 0.2)})`}>{render(i)}</g>)}
      </g>
      {counter && <text x={counterAt?.[0] ?? x} y={counterAt?.[1] ?? y - h / 2 - 90} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={96} fill={color}>{num.toLocaleString("en-US")}</text>}
    </g>
  );
};

/** Garis waktu: garis digambar, penanda muncul berurutan, titik berjalan sampai `upTo`. */
export const Timeline: React.FC<{ t: number; x: number; y: number; w: number; range: [number, number]; marks: { at: number; label: string; color?: string }[]; upTo?: number; from?: number; to?: number; color?: string; dim?: string }> = ({ t, x, y, w, range, marks, upTo, from = 0.2, to = 2.4, color = "#f2b632", dim = "#ffffff" }) => {
  const pos = (v: number) => x + ((v - range[0]) / (range[1] - range[0])) * w;
  const draw = seg(t, from, from + 0.5);
  const end = upTo ?? range[1], run = seg(t, from + 0.3, to, Easing.inOut(Easing.quad));
  const head = pos(mix(range[0], end, run));
  return (
    <g>
      <rect x={x} y={y - 5} width={w * draw} height={10} rx={5} fill={dim} opacity={0.35} />
      <rect x={x} y={y - 5} width={Math.max(0, head - x)} height={10} rx={5} fill={color} />
      {marks.map((m, i) => {
        const mx = pos(m.at), reached = head >= mx - 1, p = pop(t, from + 0.3 + ((m.at - range[0]) / (end - range[0] || 1)) * (to - from - 0.3), 0.22);
        return <g key={i}>
          <circle cx={mx} cy={y} r={reached ? 16 : 11} fill={reached ? m.color ?? color : dim} opacity={reached ? 1 : 0.5} />
          <Pill x={mx} y={y - 30} text={m.label} p={p} bg={m.color ?? shade(color, 0.35)} size={32} />
        </g>;
      })}
      <circle cx={head} cy={y} r={22} fill={color} opacity={draw} /><circle cx={head - 6} cy={y - 7} r={7} fill="#fff" opacity={0.35 * draw} />
    </g>
  );
};

/** Dua panel berdampingan dengan chevron. Panel kiri (tebakan) bisa memudar dan dicoret setelah detik `strikeAt`. */
export const Split: React.FC<{ t: number; left: React.ReactNode; right: React.ReactNode; leftLabel?: string; rightLabel?: string; leftColor?: string; rightColor?: string; strikeAt?: number; rightAt?: number; y?: number; w?: number; h?: number; gap?: number; panel?: string }> = ({ t, left, right, leftLabel, rightLabel, leftColor = "#8a8fa3", rightColor = "#2c8c86", strikeAt, rightAt = 0.6, y = 540, w = 700, h = 620, gap = 160, panel = "#ffffff" }) => {
  const lx = 960 - gap / 2 - w / 2, rx = 960 + gap / 2 + w / 2;
  const pl = pop(t, 0.1, 0.3), pr = pop(t, rightAt, 0.3), strike = strikeAt === undefined ? 0 : seg(t, strikeAt, strikeAt + 0.35);
  const ch = seg(t, rightAt - 0.2, rightAt + 0.2);
  return (
    <g>
      <g transform={`translate(${lx} ${y}) scale(${pl})`} opacity={1 - strike * 0.45} style={{ filter: strike ? `saturate(${1 - strike * 0.8})` : undefined }}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={28} fill={panel} opacity={0.14} />
        {left}
        {leftLabel && <Pill x={0} y={-h / 2 + 10} text={leftLabel} bg={strike > 0.5 ? fade(leftColor) : leftColor} ptr="none" />}
        {strike > 0 && <path d={`M${-w * 0.38} ${-h * 0.32} L${mix(-w * 0.38, w * 0.38, strike)} ${mix(-h * 0.32, h * 0.32, strike)}`} stroke="#d8322b" strokeWidth={26} strokeLinecap="round" />}
      </g>
      <g transform={`translate(960 ${y}) scale(${clamp(ch * 1.2)})`} opacity={ch}>
        <path d="M-30 -50 L20 0 L-30 50" stroke="#fff" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform={`translate(${rx} ${y}) scale(${pr})`}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={28} fill={panel} opacity={0.14} />
        {right}
        {rightLabel && <Pill x={0} y={-h / 2 + 10} text={rightLabel} bg={rightColor} ptr="none" />}
      </g>
    </g>
  );
};
