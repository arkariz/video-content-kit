// Air (material liquid, STYLE.md 2.4): tetes dengan parameter pipih. Lulus benchmark P01b s01.
import React from "react";
import { R, clamp, mix } from "../kit";
import { Shade, Tones, V2, f1, rr, useSid } from "./core";

/* ============================== TETES (L1, material liquid) ============================== */

/** Path tetes: flat 0 = hampir bulat, 1 = roti burger (atas kubah, dasar rata sedikit cekung). Asimetri halus lewat `lean`. */
export const dropPath = (r: number, flat: number, sx = 1, sy = 1, lean = 0) => {
  const f = clamp(flat, 0, 1.15), q = 0.552;
  const W = r * (1 + 0.2 * f) * sx, Ht = r * (1 - 0.05 * f) * sy, Hb = r * (1 - 0.42 * f) * sy, cav = r * 0.035 * clamp(f) * sy;
  const pk = -r * 0.07 * f + lean * r; // puncak kubah sedikit ke kiri
  const kx = W * 0.6 * clamp(f); // titik sudut dasar
  return [
    `M${f1(-W)} ${f1(0)}`,
    `C${f1(-W)} ${f1(-Ht * q)} ${f1(pk - W * q)} ${f1(-Ht)} ${f1(pk)} ${f1(-Ht)}`,
    `C${f1(pk + W * q)} ${f1(-Ht)} ${f1(W)} ${f1(-Ht * q)} ${f1(W)} ${f1(0)}`,
    `C${f1(W)} ${f1(Hb * mix(q, 0.8, f))} ${f1(mix(W * q, W * 0.9, f))} ${f1(Hb)} ${f1(kx)} ${f1(Hb)}`,
    `C${f1(kx * 0.45)} ${f1(Hb)} ${f1(kx * 0.2)} ${f1(Hb - cav)} ${f1(0)} ${f1(Hb - cav)}`,
    `C${f1(-kx * 0.2)} ${f1(Hb - cav)} ${f1(-kx * 0.45)} ${f1(Hb)} ${f1(-kx)} ${f1(Hb)}`,
    `C${f1(-mix(W * q, W * 0.9, f))} ${f1(Hb)} ${f1(-W)} ${f1(Hb * mix(q, 0.8, f))} ${f1(-W)} ${f1(0)}Z`,
  ].join("");
};
export const dropBox = (r: number, flat: number, sx = 1, sy = 1) => {
  const f = clamp(flat, 0, 1.15);
  return { W: r * (1 + 0.2 * f) * sx, Ht: r * (1 - 0.05 * f) * sy, Hb: r * (1 - 0.42 * f) * sy };
};

export const WATER: Tones = ["#0a4a8c", "#127fd0", "#33c4f2", "#a8f0ff"];

/** Pantulan kota terbalik di dalam tetes: pita siluet dua nada yang melengkung mengikuti dasar, dengan menara air (tengara) dan jendela. */
const Reflection: React.FC<{ W: number; Hb: number; Ht: number; t: number }> = ({ W, Hb, Ht, t }) => {
  const shift = Math.sin(t * 0.6) * W * 0.04;
  const horizon = Hb * 0.62; // cakrawala terpantul rendah di bagian bawah tetes
  const blocks: { x: number; w: number; h: number; kind: number }[] = [];
  let x = -W * 1.3;
  for (let i = 0; x < W * 1.3; i++) {
    const w = W * (0.09 + R(i, 31) * 0.1), h = Hb * (0.18 + R(i, 32) * 0.32);
    blocks.push({ x, w, h, kind: i === 4 ? 9 : Math.floor(R(i, 33) * 3) });
    x += w * (0.86 + R(i, 34) * 0.12);
  }
  const bend = (bx: number) => horizon - (bx / W) * (bx / W) * Hb * 0.35; // cakrawala melengkung mengikuti badan
  return (
    <g transform={`translate(${f1(shift)} 0)`}>
      {/* langit terpantul: pita terang di atas cakrawala */}
      <path d={`M${f1(-W * 1.3)} ${f1(bend(-W) - Hb * 0.18)}Q0 ${f1(horizon - Hb * 0.02)} ${f1(W * 1.3)} ${f1(bend(W) - Hb * 0.18)}L${f1(W * 1.3)} ${f1(bend(W))}Q0 ${f1(horizon + Hb * 0.22)} ${f1(-W * 1.3)} ${f1(bend(-W))}Z`} fill="#ffb36b" opacity={0} />
      {blocks.map((b, i) => {
        const y0 = bend(b.x + b.w / 2);
        if (b.kind === 9) { // menara air terbalik
          const tw = b.w * 1.3, th = Hb * 0.2;
          return (
            <g key={i} fill="#0b4f86" opacity={0.65}>
              <rect x={b.x + b.w * 0.2} y={y0} width={b.w * 0.08} height={Hb * 0.32} rx={2} />
              <rect x={b.x + b.w * 0.72} y={y0} width={b.w * 0.08} height={Hb * 0.32} rx={2} />
              <path d={rr(b.x - tw * 0.05, y0 + Hb * 0.3, tw, th, tw * 0.12)} />
              <path d={`M${f1(b.x - tw * 0.08)} ${f1(y0 + Hb * 0.3 + th)}L${f1(b.x + b.w / 2)} ${f1(y0 + Hb * 0.3 + th + Hb * 0.12)}L${f1(b.x + tw * 1.03)} ${f1(y0 + Hb * 0.3 + th)}Z`} />
              <circle cx={b.x + b.w / 2} cy={y0 + Hb * 0.3 + th + Hb * 0.14} r={Math.max(2, W * 0.012)} fill="#ff6a5c" opacity={0.9} />
            </g>
          );
        }
        const top = b.kind === 1 ? b.w * 0.25 : 3;
        return (
          <g key={i}>
            <path d={rr(b.x, y0, b.w, b.h, 2, top)} fill={i % 2 ? "#0b4f86" : "#11619a"} opacity={0.55} />
            {Array.from({ length: 3 }, (_, k) => R(i * 7 + k, 35) > 0.45 && (
              <rect key={k} x={b.x + b.w * (0.22 + (k % 2) * 0.36)} y={y0 + b.h * (0.25 + k * 0.22)} width={Math.max(3, b.w * 0.16)} height={Math.max(3, b.w * 0.14)} rx={1.5} fill="#ffd98f" opacity={0.85} />
            ))}
          </g>
        );
      })}
    </g>
  );
};

/** Tetes air versi 2: T1 (4 nada), T2 (garis highlight putus), T9 (air distilisasi), T10 (sedikit tembus). */
export const Drop2: React.FC<{ x: number; y: number; r: number; flat: number; sx?: number; sy?: number; rot?: number; t: number; refl?: number; lean?: number; detail?: number }> = ({ x, y, r, flat, sx = 1, sy = 1, rot = 0, t, refl = 1, lean = 0, detail = 1 }) => {
  const id = useSid();
  const d = dropPath(r, flat, sx, sy, lean);
  const { W, Ht, Hb } = dropBox(r, flat, sx, sy);
  const tw = Math.sin(t * 3.1) * 0.5 + 0.5; // kilap berdenyut lembut
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})`}>
      <defs><clipPath id={`d${id}`}><path d={d} /></clipPath></defs>
      {/* T10: badan sedikit tembus */}
      <Shade d={d} tones={WATER} L={[-0.3, -0.95]} s={[r * 0.1, r * 0.26, r * 0.15]} op={0.95} lightOp={0.6}>
        {/* pantulan kota (T9: pita siluet, bukan batang) */}
        {refl > 0 && detail > 0 && <g opacity={refl}><Reflection W={W} Hb={Hb} Ht={Ht} t={t} /></g>}
        {/* inti bayangan di cekungan dasar */}
        <path d={`M${f1(-W * 0.95)} ${f1(Hb * 0.55)}Q0 ${f1(Hb * 0.92)} ${f1(W * 0.95)} ${f1(Hb * 0.55)}L${f1(W)} ${f1(Hb * 1.2)}H${f1(-W)}Z`} fill="#0b4f86" opacity={0.42} />
        {/* T9: lobus nada dasar lebih terang di tengah atas, memecah bidang cyan */}
        <path d={`M${f1(-W * 0.7)} ${f1(-Ht * 0.05)}C${f1(-W * 0.6)} ${f1(-Ht * 0.62)} ${f1(W * 0.45)} ${f1(-Ht * 0.7)} ${f1(W * 0.7)} ${f1(-Ht * 0.12)}C${f1(W * 0.45)} ${f1(Hb * 0.05)} ${f1(-W * 0.4)} ${f1(Hb * 0.1)} ${f1(-W * 0.7)} ${f1(-Ht * 0.05)}Z`} fill="#5fd6f8" opacity={0.55} />
        {/* riak tipis mengikuti kubah */}
        <path d={`M${f1(-W * 0.55)} ${f1(-Ht * 0.42)}Q${f1(-W * 0.05)} ${f1(-Ht * 0.78)} ${f1(W * 0.42)} ${f1(-Ht * 0.5)}`} stroke="#a6ecff" strokeWidth={r * 0.028} fill="none" strokeLinecap="round" opacity={0.55} />
      </Shade>
      {/* meniskus: cincin tipis lebih gelap di tepi, lalu garis terang tipis di dalam */}
      <g clipPath={`url(#d${id})`}>
        <path d={d} fill="none" stroke="#0b4f86" strokeWidth={r * 0.09} opacity={0.6} />
        <path d={dropPath(r * 0.93, flat, sx, sy, lean)} fill="none" stroke="#c9f4ff" strokeWidth={r * 0.018} opacity={0.35} />
      </g>
      {/* T2 + T8: rim jingga senja, putus, di kanan bawah */}
      <path d={`M${f1(W * 0.93)} ${f1(-Ht * 0.05)}C${f1(W * 0.95)} ${f1(Hb * 0.5)} ${f1(W * 0.78)} ${f1(Hb * 0.86)} ${f1(W * 0.42)} ${f1(Hb * 0.93)}`} stroke="#ffb36b" strokeWidth={r * 0.045} fill="none" strokeLinecap="round" strokeDasharray={`${f1(r * 0.42)} ${f1(r * 0.12)} ${f1(r * 0.12)} ${f1(r * 0.12)}`} opacity={0.95} />
      {/* sabit highlight putih besar kiri atas (pantulan langit) */}
      <path d={`M${f1(-W * 0.78)} ${f1(-Ht * 0.12)}C${f1(-W * 0.78)} ${f1(-Ht * 0.62)} ${f1(-W * 0.4)} ${f1(-Ht * 0.86)} ${f1(-W * 0.02)} ${f1(-Ht * 0.88)}C${f1(-W * 0.34)} ${f1(-Ht * 0.74)} ${f1(-W * 0.6)} ${f1(-Ht * 0.48)} ${f1(-W * 0.66)} ${f1(-Ht * 0.06)}Z`} fill="#ffffff" opacity={0.9} />
      <circle cx={W * 0.1} cy={-Ht * 0.72} r={r * 0.045} fill="#fff" opacity={0.75 + 0.25 * tw} />
      <circle cx={W * 0.22} cy={-Ht * 0.66} r={r * 0.022} fill="#fff" opacity={0.8} />
      <circle cx={-W * 0.72} cy={Hb * 0.22} r={r * 0.03} fill="#fff" opacity={0.55} />
    </g>
  );
};

