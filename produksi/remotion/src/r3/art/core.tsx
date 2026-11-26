// Pustaka ilustrasi R3 (Fase 3.5): teknik dasar rendering datar bertingkat (produksi/STYLE.md 2.2, REFERENSI-GAYA.md T1-T2).
import React from "react";
import { R, clamp, mix } from "../kit";

export type V2 = [number, number];
export type Tones = [string, string, string, string]; // inti bayangan, bayangan, dasar, highlight

export const useSid = () => React.useId().replace(/[^a-zA-Z0-9]/g, "");
export const f1 = (n: number) => n.toFixed(1);

/** Path kotak membulat; rt/rb = radius sudut atas/bawah. */
export const rr = (x: number, y: number, w: number, h: number, rt: number, rb = rt) =>
  `M${f1(x + rt)} ${f1(y)}H${f1(x + w - rt)}Q${f1(x + w)} ${f1(y)} ${f1(x + w)} ${f1(y + rt)}V${f1(y + h - rb)}Q${f1(x + w)} ${f1(y + h)} ${f1(x + w - rb)} ${f1(y + h)}H${f1(x + rb)}Q${f1(x)} ${f1(y + h)} ${f1(x)} ${f1(y + h - rb)}V${f1(y + rt)}Q${f1(x)} ${f1(y)} ${f1(x + rt)} ${f1(y)}Z`;

/**
 * T1: shading datar bertingkat. Badan diisi inti bayangan, lalu salinan badan yang digeser ke arah cahaya
 * (bayangan, lalu dasar) sehingga sisi jauh tersisa sebagai sabit; highlight = badan dikurangi salinan yang digeser menjauh.
 * L = vektor satuan ke arah cahaya. s = [geser bayangan, geser dasar, lebar highlight].
 */
export const Shade: React.FC<{ d: string; tones: Tones; L: V2; s?: [number, number, number]; op?: number; children?: React.ReactNode; lightOp?: number }> = ({ d, tones, L, s = [5, 12, 8], op = 1, children, lightOp = 1 }) => {
  const id = useSid();
  const [core, sh, base, lt] = tones;
  const [lx, ly] = L;
  return (
    <g opacity={op}>
      <defs>
        <clipPath id={`c${id}`}><path d={d} /></clipPath>
        <mask id={`m${id}`} maskUnits="userSpaceOnUse" x={-6000} y={-6000} width={12000} height={12000}>
          <rect x={-6000} y={-6000} width={12000} height={12000} fill="#fff" />
          <path d={d} transform={`translate(${f1(-lx * s[2])} ${f1(-ly * s[2])})`} fill="#000" />
        </mask>
      </defs>
      <path d={d} fill={core} />
      <g clipPath={`url(#c${id})`}>
        <path d={d} transform={`translate(${f1(lx * s[0])} ${f1(ly * s[0])})`} fill={sh} />
        <path d={d} transform={`translate(${f1(lx * s[1])} ${f1(ly * s[1])})`} fill={base} />
        {s[2] > 0 && <path d={d} fill={lt} mask={`url(#m${id})`} opacity={lightOp} />}
        {children}
      </g>
    </g>
  );
};

