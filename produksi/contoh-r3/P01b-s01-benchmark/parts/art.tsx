// Aset ilustrasi benchmark s01 (Fase 3.5): rendering datar bertingkat (STYLE.md 2.2, resep REFERENSI-GAYA.md T1-T13).
// Semua bentuk fungsi murni dari parameter dan t; acak hanya lewat R.
import React from "react";
import { R, clamp, mix } from "@r3";

export type V2 = [number, number];
export type Tones = [string, string, string, string]; // inti bayangan, bayangan, dasar, highlight

const useSid = () => React.useId().replace(/[^a-zA-Z0-9]/g, "");
const f1 = (n: number) => n.toFixed(1);

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

/* ============================== LANGIT DAN AWAN ============================== */

export const SKY = { top: "#1a0f4a", hi: "#3a237a", mid: "#7e3a96", low: "#d0587e", glow: "#f5835e", sun: "#ffc58a" };

export const Sky: React.FC<{ t: number }> = ({ t }) => {
  const id = useSid();
  return (
    <g>
      <defs>
        <linearGradient id={`s${id}`} gradientUnits="userSpaceOnUse" x1={0} y1={-300} x2={0} y2={980}>
          <stop offset={0} stopColor={SKY.top} /><stop offset={0.3} stopColor={SKY.hi} /><stop offset={0.58} stopColor={SKY.mid} />
          <stop offset={0.8} stopColor={SKY.low} /><stop offset={0.93} stopColor={SKY.glow} /><stop offset={1} stopColor="#ffb27a" />
        </linearGradient>
        <radialGradient id={`g${id}`} cx={0.5} cy={0.5} r={0.5}>
          <stop offset={0} stopColor={SKY.sun} stopOpacity={0.95} /><stop offset={0.25} stopColor="#ff9a6a" stopOpacity={0.55} /><stop offset={1} stopColor="#ff9a6a" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x={-600} y={-700} width={3200} height={2600} fill={`url(#s${id})`} />
      <circle cx={1050} cy={690} r={560 + Math.sin(t * 0.8) * 6} fill={`url(#g${id})`} />
      <circle cx={1050} cy={690} r={66} fill="#ffe2b0" opacity={0.95} />
      <circle cx={1050} cy={690} r={108} fill="#ffd29a" opacity={0.3} />
    </g>
  );
};

/** T4: awan gugus lobus, bawah kanan menyala jingga (matahari rendah di kanan bawah). */
export const Cloud: React.FC<{ x: number; y: number; s: number; seed: number; base?: string; lit?: string; shadow?: string; op?: number }> = ({ x, y, s, seed, base = "#4a3482", lit = "#f0906a", shadow = "#33246a", op = 1 }) => {
  const id = useSid();
  const n = 6 + Math.floor(R(seed, 41) * 4);
  const lobes = Array.from({ length: n }, (_, i) => {
    const u = i / (n - 1);
    const cx = (u - 0.5) * 2 * s * (0.9 + R(seed + i, 42) * 0.15);
    const rad = s * (0.28 + Math.sin(u * Math.PI) * 0.42 + R(seed + i, 43) * 0.12);
    return { cx, cy: -rad * 0.55 + R(seed + i, 44) * s * 0.08, r: rad };
  });
  const flatBottom = s * 0.18;
  const all = (fill: string, dx = 0, dy = 0) => (
    <g fill={fill} transform={`translate(${dx} ${dy})`}>
      {lobes.map((l, i) => <circle key={i} cx={l.cx} cy={l.cy} r={l.r} />)}
      <path d={rr(-s * 1.05, -s * 0.3, s * 2.1, s * 0.3 + flatBottom, s * 0.15)} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <defs><clipPath id={`k${id}`}>{lobes.map((l, i) => <circle key={i} cx={l.cx} cy={l.cy} r={l.r} />)}<path d={rr(-s * 1.05, -s * 0.3, s * 2.1, s * 0.3 + flatBottom, s * 0.15)} /></clipPath></defs>
      {all(lit)}
      <g clipPath={`url(#k${id})`}>{all(base, -s * 0.05, -s * 0.07)}{all(shadow, -s * 0.16, -s * 0.2)}</g>
    </g>
  );
};

/* ============================== KOTA ============================== */

/** Keluarga nada kota tengah (digeser 20% ke langit), dan fungsi geser ke langit (T5). */
export const MID: Tones = ["#1d2b5c", "#243a6e", "#2f5288", "#4f7fb3"];
export const RIM = "#ffb36b";
const WIN_ON = ["#ffb85c", "#ffd98f", "#fff1c9"];
const WIN_OFF = "#1a2554";

/** Jendela dengan irama: blok baris, sebagian menyala bergiliran menurut t. */
const Windows: React.FC<{ x: number; y: number; cols: number; rows: number; cw: number; ch: number; gx: number; gy: number; seed: number; t: number; on?: number }> = ({ x, y, cols, rows, cw, ch, gx, gy, seed, t, on = 0.5 }) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const k = R(seed + i, 51);
      const flick = Math.floor(t * 0.7 + R(seed + i, 52) * 7) % 5 === 0 ? 1 : 0; // menyala/padam bergiliran
      const lit = (k < on) !== (flick === 1 && R(seed + i, 53) > 0.82);
      return <rect key={i} x={x + c * (cw + gx)} y={y + r * (ch + gy)} width={cw} height={ch} rx={Math.min(cw, ch) * 0.22} fill={lit ? WIN_ON[Math.floor(R(seed + i, 54) * 3)] : WIN_OFF} opacity={lit ? 0.95 : 0.9} />;
    })}
  </g>
);

/** Blok apartemen dengan balkon, unit AC, parapet; cahaya dari kanan (rim jingga). */
export const Apartment: React.FC<{ x: number; base: number; w: number; h: number; seed: number; t: number; tones?: Tones }> = ({ x, base, w, h, seed, t, tones = MID }) => {
  const y = base - h, floors = Math.max(3, Math.round(h / 92)), fh = h / floors, cols = Math.max(3, Math.round(w / 70));
  const cw = (w - 40) / cols - 14;
  return (
    <g>
      <Shade d={rr(x, y, w, h + 400, 10, 0)} tones={tones} L={[1, -0.15]} s={[10, 26, 7]}>
        {Array.from({ length: floors }, (_, f) => (
          <g key={f}>
            <Windows x={x + 26} y={y + f * fh + fh * 0.2} cols={cols} rows={1} cw={cw} ch={fh * 0.42} gx={14} gy={0} seed={seed * 31 + f * 7} t={t} on={0.42} />
            {f % 2 === 1 && <g>
              <rect x={x + 14} y={y + f * fh + fh * 0.66} width={w - 28} height={fh * 0.12} rx={4} fill={tones[3]} opacity={0.75} />
              <rect x={x + 14} y={y + f * fh + fh * 0.78} width={w - 28} height={fh * 0.05} rx={2} fill={tones[0]} opacity={0.8} />
            </g>}
            {R(seed + f, 55) > 0.45 && <path d={rr(x + w - 44, y + f * fh + fh * 0.5, 30, fh * 0.26, 4)} fill={tones[1]} />}
          </g>
        ))}
      </Shade>
      {/* parapet dan rim cahaya */}
      <path d={rr(x - 6, y - 14, w + 12, 18, 6)} fill={tones[1]} />
      <path d={`M${x + w - 2} ${y - 8}V${base}`} stroke={RIM} strokeWidth={4} strokeLinecap="round" strokeDasharray="120 26 40 26" opacity={0.8} />
    </g>
  );
};

/** Deret rumah atap pelana (tipe kedua). */
export const Gables: React.FC<{ x: number; base: number; n: number; w: number; h: number; seed: number; t: number }> = ({ x, base, n, w, h, seed, t }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const hx = x + i * w * 0.96, hh = h * (0.85 + R(seed + i, 61) * 0.3), roof = w * 0.42;
      const body = rr(hx, base - hh, w, hh + 300, 4, 0);
      const roofD = `M${hx - 10} ${base - hh + 6}L${hx + w / 2} ${base - hh - roof}L${hx + w + 10} ${base - hh + 6}Q${hx + w + 12} ${base - hh + 14} ${hx + w} ${base - hh + 14}H${hx}Q${hx - 12} ${base - hh + 14} ${hx - 10} ${base - hh + 6}Z`;
      return (
        <g key={i}>
          {R(seed + i, 62) > 0.4 && <path d={rr(hx + w * 0.66, base - hh - roof * 0.7, w * 0.12, roof * 0.6, 3, 0)} fill={MID[1]} />}
          <Shade d={body} tones={MID} L={[1, -0.1]} s={[6, 14, 5]}>
            <Windows x={hx + w * 0.2} y={base - hh + hh * 0.25} cols={2} rows={1} cw={w * 0.2} ch={hh * 0.3} gx={w * 0.18} gy={0} seed={seed * 13 + i} t={t} on={0.55} />
          </Shade>
          <Shade d={roofD} tones={["#2a1e58", "#3a2a6e", "#5a3f8c", "#8a5fae"]} L={[0.7, -0.7]} s={[4, 10, 6]} />
          <path d={`M${hx + w / 2 + 6} ${base - hh - roof + 8}L${hx + w + 6} ${base - hh + 4}`} stroke={RIM} strokeWidth={3.5} strokeLinecap="round" opacity={0.85} />
        </g>
      );
    })}
  </g>
);

/** Gedung kantor dengan puncak bertangga dan sirip tegak (tipe ketiga), lampu merah di puncak. */
export const Office: React.FC<{ x: number; base: number; w: number; h: number; seed: number; t: number }> = ({ x, base, w, h, seed, t }) => {
  const tiers = [[0, 1], [0.12, 0.16], [0.26, 0.1]];
  return (
    <g>
      {tiers.slice().reverse().map(([inset, hh], j) => {
        const k = tiers.length - 1 - j;
        const tx = x + w * inset, tw2 = w * (1 - inset * 2);
        const top = base - h - (k === 0 ? 0 : tiers.slice(1, k + 1).reduce((a, b) => a + b[1] * h, 0));
        const th = k === 0 ? h + 400 : tiers[k][1] * h + 6;
        return (
          <Shade key={k} d={rr(tx, top, tw2, th, k === 0 ? 6 : 10, 0)} tones={MID} L={[1, -0.2]} s={[8, 20, 6]}>
            {k === 0 && Array.from({ length: Math.round(tw2 / 34) }, (_, i) => <rect key={i} x={tx + 16 + i * 34} y={top + 12} width={5} height={h} rx={2.5} fill={MID[3]} opacity={0.45} />)}
            {k === 0 && <Windows x={tx + 26} y={top + 30} cols={Math.round(tw2 / 68)} rows={Math.round(h / 64)} cw={22} ch={26} gx={46} gy={38} seed={seed * 17} t={t} on={0.3} />}
          </Shade>
        );
      })}
      <path d={rr(x + w * 0.47, base - h - h * 0.26 - 70, 8, 74, 4)} fill={MID[1]} />
      <circle cx={x + w * 0.5 - 1} cy={base - h - h * 0.26 - 72} r={7} fill="#ff6a5c" />
      <circle cx={x + w * 0.5 - 1} cy={base - h - h * 0.26 - 72} r={22} fill="#ff6a5c" opacity={0.25 + 0.2 * Math.max(0, Math.sin(t * 4))} />
      <path d={`M${x + w - 2} ${base - h + 10}V${base}`} stroke={RIM} strokeWidth={4} strokeLinecap="round" strokeDasharray="200 30 60 30" opacity={0.75} />
    </g>
  );
};

/** Menara air (tengara, L2): kaki berangka, tangki bercincin, atap kerucut, tangga, lampu merah. */
export const WaterTower: React.FC<{ x: number; base: number; s: number; t: number }> = ({ x, base, s, t }) => {
  const legH = 120 * s, tw = 150 * s, th = 120 * s, ty = base - legH - th;
  const leg = (lx: number, rx2: number) => `M${x + lx} ${base}L${x + rx2} ${base - legH}`;
  return (
    <g>
      <g stroke={MID[0]} strokeWidth={9 * s} strokeLinecap="round">
        <path d={leg(-tw * 0.42, -tw * 0.34)} /><path d={leg(tw * 0.42, tw * 0.34)} />
        <path d={leg(-tw * 0.14, -tw * 0.12)} stroke={MID[1]} /><path d={leg(tw * 0.14, tw * 0.12)} stroke={MID[1]} />
      </g>
      <g stroke={MID[1]} strokeWidth={4 * s} strokeLinecap="round" opacity={0.9}>
        <path d={`M${x - tw * 0.4} ${base - legH * 0.15}L${x + tw * 0.36} ${base - legH * 0.6}`} />
        <path d={`M${x + tw * 0.4} ${base - legH * 0.15}L${x - tw * 0.36} ${base - legH * 0.6}`} />
        <path d={`M${x - tw * 0.38} ${base - legH * 0.6}H${x + tw * 0.38}`} />
      </g>
      <path d={rr(x - tw * 0.56, base - legH - 8 * s, tw * 1.12, 12 * s, 5 * s)} fill={MID[0]} />
      <Shade d={rr(x - tw / 2, ty, tw, th, 14 * s)} tones={["#3a2420", "#5c3a2c", "#8a5a3e", "#c98a5a"]} L={[1, -0.25]} s={[6 * s, 18 * s, 9 * s]}>
        {[0.28, 0.62].map((u) => <rect key={u} x={x - tw / 2} y={ty + th * u} width={tw} height={7 * s} rx={3 * s} fill="#2c1c22" opacity={0.75} />)}
        {Array.from({ length: 6 }, (_, i) => <rect key={i} x={x - tw / 2 + 14 * s + i * tw * 0.16} y={ty + 6 * s} width={3 * s} height={th - 12 * s} rx={1.5 * s} fill="#c98a5a" opacity={0.35} />)}
      </Shade>
      <Shade d={`M${x - tw * 0.6} ${ty + 6 * s}L${x} ${ty - 62 * s}L${x + tw * 0.6} ${ty + 6 * s}Q${x + tw * 0.62} ${ty + 14 * s} ${x + tw * 0.52} ${ty + 14 * s}H${x - tw * 0.52}Q${x - tw * 0.62} ${ty + 14 * s} ${x - tw * 0.6} ${ty + 6 * s}Z`} tones={["#20163f", "#2f2366", "#46378a", "#7a5fb8"]} L={[0.75, -0.66]} s={[4 * s, 12 * s, 8 * s]} />
      <path d={`M${x + tw * 0.5} ${ty + 8 * s}V${ty + th - 6 * s}`} stroke={RIM} strokeWidth={5 * s} strokeLinecap="round" strokeDasharray={`${40 * s} ${10 * s}`} opacity={0.9} />
      <g stroke="#2c1c22" strokeWidth={3 * s} strokeLinecap="round"><path d={`M${x - tw * 0.3} ${ty + th}V${base - 6 * s}`} /><path d={`M${x - tw * 0.2} ${ty + th}V${base - 6 * s}`} />{Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${x - tw * 0.3} ${ty + th + 18 * s * (i + 0.5)}H${x - tw * 0.2}`} />)}</g>
      <circle cx={x} cy={ty - 64 * s} r={6 * s} fill="#ff6a5c" />
      <circle cx={x} cy={ty - 64 * s} r={22 * s} fill="#ff6a5c" opacity={0.2 + 0.25 * Math.max(0, Math.sin(t * 3 + 1))} />
    </g>
  );
};

/** Siluet kota jauh (L3): satu path gugus, digeser jauh ke langit; puncak bervariasi (rata, kubah, menara, bertangga). */
export const FarCity: React.FC<{ x0: number; x1: number; base: number; seed: number; fill: string; hi: string; t: number; lights?: number }> = ({ x0, x1, base, seed, fill, hi, t, lights = 0.06 }) => {
  const items: React.ReactNode[] = [];
  let x = x0, i = 0;
  const rhythm = [0.55, 1, 0.7, 0.4, 0.85, 0.6, 1.2, 0.5];
  while (x < x1) {
    const w = 70 + R(seed + i, 71) * 90, h = 80 + rhythm[i % rhythm.length] * 170 + R(seed + i, 72) * 50, kind = Math.floor(R(seed + i, 73) * 5);
    items.push(<path key={`b${i}`} d={rr(x, base - h, w, h + 200, kind === 1 ? w * 0.5 : 6, 0)} fill={fill} />);
    if (kind === 2) items.push(<path key={`s${i}`} d={`M${x + w / 2 - 6} ${base - h}L${x + w / 2} ${base - h - 70}L${x + w / 2 + 6} ${base - h}Z`} fill={fill} />);
    if (kind === 3) items.push(<path key={`t${i}`} d={rr(x + w * 0.2, base - h - 34, w * 0.6, 40, 6, 0)} fill={fill} />);
    items.push(<path key={`r${i}`} d={`M${x + w - 3} ${base - h + 8}V${base - h + h * 0.6}`} stroke={hi} strokeWidth={3} strokeLinecap="round" opacity={0.55} />);
    for (let k = 0; k < 4; k++) if (R(seed + i * 5 + k, 74) < lights * 4) items.push(<rect key={`w${i}${k}`} x={x + 12 + R(seed + i + k, 75) * (w - 30)} y={base - h + 20 + R(seed + i + k, 76) * (h - 40)} width={7} height={8} rx={2} fill="#ffc77a" opacity={0.55 + 0.3 * Math.sin(t * 2 + k)} />);
    x += w * (0.8 + R(seed + i, 77) * 0.25); i++;
  }
  return <g>{items}</g>;
};

/** Kereta layang (L3, kejadian kecil): jembatan berpilar dan kereta dengan jendela menyala. */
export const Elevated: React.FC<{ x0: number; x1: number; y: number; t: number; fill: string; hi: string }> = ({ x0, x1, y, t, fill, hi }) => {
  const tx = mix(x1 + 200, x0 - 900, ((t * 0.16) % 1));
  return (
    <g>
      {Array.from({ length: Math.ceil((x1 - x0) / 220) + 1 }, (_, i) => <path key={i} d={rr(x0 + i * 220, y + 10, 22, 400, 4, 0)} fill={fill} />)}
      <path d={rr(x0 - 50, y, x1 - x0 + 100, 16, 6)} fill={fill} />
      <path d={`M${x0 - 50} ${y + 1}H${x1 + 50}`} stroke={hi} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
      {[0, 1, 2].map((c) => (
        <g key={c}>
          <path d={rr(tx + c * 190, y - 44, 180, 44, c === 0 ? 22 : 8, 6)} fill={fill} />
          {Array.from({ length: 6 }, (_, k) => <rect key={k} x={tx + c * 190 + 16 + k * 27} y={y - 34} width={16} height={14} rx={3} fill="#ffd98f" opacity={0.85} />)}
        </g>
      ))}
    </g>
  );
};

/* ============================== LATAR DEPAN: SUDUT ATAP DENGAN TALANG ============================== */

export const RoofCorner: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => {
  const id = useSid();
  const roof = `M${x - 200} ${y + 70}L${x + 640} ${y - 40}Q${x + 690} ${y - 46} ${x + 700} ${y - 10}L${x + 760} ${y + 600}H${x - 200}Z`;
  return (
    <g>
      <defs><clipPath id={`r${id}`}><path d={roof} /></clipPath></defs>
      <Shade d={roof} tones={["#0d0826", "#140d30", "#22174a", "#33245e"]} L={[0.6, -0.8]} s={[8, 20, 10]}>
        {/* deret genteng sebagai garis dalam (T13) */}
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${x - 200} ${y + 120 + i * 58}L${x + 700} ${y + 10 + i * 58}`} stroke="#2a1d56" strokeWidth={6} strokeLinecap="round" opacity={0.9} />)}
        {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={x - 150 + R(i, 81) * 820} cy={y + 60 + R(i, 82) * 420} r={3 + R(i, 83) * 4} fill="#3b2c70" opacity={0.6} />)}
      </Shade>
      {/* talang logam: setengah pipa dengan pita highlight dan rim */}
      <path d={`M${x - 220} ${y + 62}L${x + 650} ${y - 48}`} stroke="#22174a" strokeWidth={34} strokeLinecap="round" />
      <path d={`M${x - 220} ${y + 54}L${x + 650} ${y - 56}`} stroke="#4a3a8a" strokeWidth={14} strokeLinecap="round" />
      <path d={`M${x - 120} ${y + 44}L${x + 560} ${y - 42}`} stroke="#9b8ad8" strokeWidth={4} strokeLinecap="round" strokeDasharray="160 24 50 24" opacity={0.85} />
      <path d={`M${x + 200} ${y + 6}L${x + 640} ${y - 50}`} stroke={RIM} strokeWidth={4} strokeLinecap="round" opacity={0.8} />
      {/* mulut pipa turun di ujung talang (petunjuk ke s02) */}
      <ellipse cx={x + 662} cy={y - 50} rx={26} ry={14} fill="#0b0720" />
      <path d={rr(x + 640, y - 46, 44, 400, 10, 0)} fill="#1a1240" />
      <path d={`M${x + 676} ${y - 36}V${y + 340}`} stroke="#6a5ab0" strokeWidth={5} strokeLinecap="round" opacity={0.7} />
      {/* tetesan kecil di bibir talang */}
      {[0, 1, 2].map((k) => {
        const p = (t * 0.9 + k * 0.33) % 1, dx = x + 60 + k * 190 - k * 12, dy = y + 64 - k * 24;
        return <ellipse key={k} cx={dx} cy={dy + p * p * 60} rx={5} ry={7 + p * 3} fill="#7fd8ff" opacity={0.85 * (1 - p)} />;
      })}
      {/* ventilasi dengan uap (kejadian kecil) */}
      <path d={rr(x + 300, y - 30, 46, 70, 10, 0)} fill="#1a1240" />
      <path d={rr(x + 292, y - 40, 62, 16, 7)} fill="#2a1d56" />
      {[0, 1, 2].map((k) => {
        const p = (t * 0.35 + k / 3) % 1;
        return <circle key={k} cx={x + 323 + Math.sin(p * 6 + k) * 14 + p * 30} cy={y - 56 - p * 170} r={14 + p * 30} fill="#8a7ab8" opacity={0.28 * (1 - p)} />;
      })}
      <g clipPath={`url(#r${id})`} />
    </g>
  );
};

/* ============================== HUJAN DAN ATMOSFER ============================== */

/** Hujan sebagai garis bulat pendek di satu kedalaman; jatuh relatif (latar naik karena tetes jatuh). */
export const RainLayer: React.FC<{ t: number; n: number; seed: number; len: [number, number]; w: number; color: string; op: number; speed: number; area?: [number, number, number, number] }> = ({ t, n, seed, len, w, color, op, speed, area = [-100, -200, 2020, 1280] }) => {
  const [ax, ay, bx, by] = area, H2 = by - ay;
  return (
    <g stroke={color} strokeWidth={w} strokeLinecap="round" opacity={op}>
      {Array.from({ length: n }, (_, i) => {
        const L = mix(len[0], len[1], R(seed + i, 91)), x = mix(ax, bx, R(seed + i, 92));
        const y = ay + ((R(seed + i, 93) * H2 + t * speed) % H2 + H2) % H2;
        return <path key={i} d={`M${x} ${y}l${-L * 0.08} ${-L}`} />;
      })}
    </g>
  );
};

/** Pita kabut tipis antar lapisan (gradien boleh untuk atmosfer). */
export const MistBand: React.FC<{ y: number; h: number; color: string; op: number }> = ({ y, h, color, op }) => {
  const id = useSid();
  return (
    <g>
      <defs><linearGradient id={`m${id}`} x1={0} y1={0} x2={0} y2={1}><stop offset={0} stopColor={color} stopOpacity={0} /><stop offset={0.5} stopColor={color} stopOpacity={op} /><stop offset={1} stopColor={color} stopOpacity={0} /></linearGradient></defs>
      <rect x={-600} y={y} width={3200} height={h} fill={`url(#m${id})`} />
    </g>
  );
};

/** Siluet air mata (miskonsepsi, L2 metafora): tembus pucat, garis tepi putus. */
export const TearGhost2: React.FC<{ x: number; y: number; r: number; p: number }> = ({ x, y, r, p }) => {
  if (p <= 0) return null;
  const d = `M0 ${-r * 1.75}C${r * 0.25} ${-r * 1.2} ${r * 1.02} ${-r * 0.55} ${r * 1.02} ${r * 0.15}C${r * 1.02} ${r * 0.72} ${r * 0.56} ${r * 1.05} 0 ${r * 1.05}C${-r * 0.56} ${r * 1.05} ${-r * 1.02} ${r * 0.72} ${-r * 1.02} ${r * 0.15}C${-r * 1.02} ${-r * 0.55} ${-r * 0.25} ${-r * 1.2} 0 ${-r * 1.75}Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * p})`} opacity={p}>
      <path d={d} fill="#ffc2d4" opacity={0.28} />
      <path d={d} fill="none" stroke="#ffd6e2" strokeWidth={r * 0.035} strokeLinecap="round" strokeDasharray={`${r * 0.16} ${r * 0.1}`} />
    </g>
  );
};

/* ============================== BLOK KOTA 3/4 (L2, versi iterasi 2) ============================== */

const ROOF_TOP = "#6b8fd0";
/** Satu jendela berirama: menyala (dua nada + ambang) atau gelap. */
const Win: React.FC<{ x: number; y: number; w: number; h: number; lit: boolean; seed: number }> = ({ x, y, w, h, lit, seed }) => lit ? (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={3} fill={WIN_ON[Math.floor(R(seed, 54) * 3)]} />
    {R(seed, 56) > 0.5 && <rect x={x} y={y} width={w * 0.45} height={h} rx={3} fill="#e98a4a" opacity={0.55} />}
    <rect x={x - 2} y={y + h - 3} width={w + 4} height={4} rx={2} fill="#141c46" opacity={0.7} />
  </g>
) : <rect x={x} y={y} width={w} height={h} rx={3} fill={WIN_OFF} />;

/**
 * Gedung 3/4: muka depan (Shade, cahaya dari kanan), muka samping kiri lebih gelap, atap terlihat dari atas
 * dengan perabot atap (AC, tangki kecil, antena, rumah tangga, tanaman). top: bentuk puncak.
 */
export const Block: React.FC<{ x: number; base: number; w: number; h: number; side?: number; seed: number; t: number; top?: "flat" | "step" | "dome"; tones?: Tones; balcony?: boolean; on?: number }> = ({ x, base, w, h, side = 46, seed, t, top = "flat", tones = MID, balcony = true, on = 0.45 }) => {
  const y = base - h, dy = side * 0.34, low = base + 500;
  const sideD = `M${x - side} ${y - dy}L${x} ${y}V${low}H${x - side}Z`;
  const topD = `M${x - side} ${y - dy}L${x + w - side} ${y - dy}L${x + w} ${y}H${x}Z`;
  const floors = Math.max(3, Math.round(h / 78)), fh = h / floors;
  const pairs = Math.max(2, Math.round((w - 30) / 74));
  const ww = 20, wh = fh * 0.42;
  const items: React.ReactNode[] = [];
  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < pairs; c++) for (let k = 0; k < 2; k++) {
      const s = seed * 97 + f * 13 + c * 3 + k;
      const flick = Math.floor(t * 0.6 + R(s, 52) * 9) % 7 === 0;
      const lit = (R(s, 51) < on) !== (flick && R(s, 53) > 0.75);
      items.push(<Win key={`w${f}${c}${k}`} x={x + 22 + c * ((w - 44) / pairs) + k * (ww + 8)} y={y + f * fh + fh * 0.2} w={ww} h={wh} lit={lit} seed={s} />);
    }
    if (balcony && f % 2 === 1) {
      const by = y + f * fh + fh * 0.7;
      items.push(<g key={`b${f}`}><rect x={x + 10} y={by} width={w - 20} height={7} rx={3.5} fill={tones[3]} /><rect x={x + 10} y={by + 7} width={w - 20} height={fh * 0.22} rx={3} fill={tones[1]} opacity={0.85} />{Array.from({ length: Math.round((w - 20) / 18) }, (_, i) => <rect key={i} x={x + 14 + i * 18} y={by + 8} width={3} height={fh * 0.2} rx={1.5} fill={tones[3]} opacity={0.5} />)}</g>);
    }
    if (R(seed + f, 55) > 0.55) items.push(<g key={`a${f}`}><path d={rr(x + w - 46, y + f * fh + fh * 0.62, 32, 20, 4)} fill="#8ea9d6" /><circle cx={x + w - 30} cy={y + f * fh + fh * 0.62 + 10} r={6} fill="#5a74a8" /></g>);
  }
  // perabot atap
  const roofy = y - dy * 0.5;
  const kit: React.ReactNode[] = [];
  if (top === "step") kit.push(<Shade key="st" d={rr(x + w * 0.18, y - h * 0.14, w * 0.6, h * 0.14 + 6, 8, 0)} tones={tones} L={[1, -0.2]} s={[6, 14, 5]}><Windows x={x + w * 0.24} y={y - h * 0.1} cols={3} rows={1} cw={18} ch={22} gx={w * 0.12} gy={0} seed={seed + 300} t={t} on={0.6} /></Shade>);
  if (top === "dome") kit.push(<g key="dm"><Shade d={rr(x + w * 0.3, y - 60, w * 0.34, 64, 6, 0)} tones={tones} L={[1, -0.2]} s={[4, 10, 4]} /><Shade d={`M${x + w * 0.27} ${y - 58}A${w * 0.2} ${w * 0.2} 0 0 1 ${x + w * 0.67} ${y - 58}Z`} tones={["#20163f", "#2f2366", "#46378a", "#7a5fb8"]} L={[0.7, -0.7]} s={[4, 10, 7]} /></g>);
  if (R(seed, 57) > 0.3) kit.push(<g key="tk"><path d={rr(x + w * 0.66, roofy - 54, 40, 52, 10)} fill="#8a5a3e" /><rect x={x + w * 0.66} y={roofy - 40} width={40} height={5} rx={2.5} fill="#3a2420" /><path d={`M${x + w * 0.66 + 38} ${roofy - 50}V${roofy - 6}`} stroke={RIM} strokeWidth={3} strokeLinecap="round" /></g>);
  kit.push(<g key="ac">{[0, 1].map((i) => <g key={i}><path d={rr(x + 16 + i * 46, roofy - 24, 38, 24, 5)} fill="#9fb6e0" /><circle cx={x + 35 + i * 46} cy={roofy - 12} r={7} fill="#5a74a8" /></g>)}</g>);
  if (R(seed, 58) > 0.4) kit.push(<g key="an" stroke="#2a3a70" strokeWidth={4} strokeLinecap="round"><path d={`M${x + w * 0.4} ${roofy - 4}V${roofy - 90}`} /><path d={`M${x + w * 0.4 - 16} ${roofy - 70}H${x + w * 0.4 + 16}`} /><path d={`M${x + w * 0.4 - 10} ${roofy - 54}H${x + w * 0.4 + 10}`} /></g>);
  if (R(seed, 59) > 0.35) kit.push(<g key="pl">{[0, 1, 2].map((i) => <circle key={i} cx={x + w * 0.52 + i * 16} cy={roofy - 14 - (i % 2) * 8} r={13 - (i % 2) * 3} fill={i % 2 ? "#3f8a72" : "#2f6e5e"} />)}<path d={rr(x + w * 0.5 - 4, roofy - 10, 52, 12, 4)} fill="#7a4a3a" /></g>);
  return (
    <g>
      <path d={sideD} fill={tones[0]} />
      {Array.from({ length: floors }, (_, f) => <rect key={f} x={x - side + 10} y={y - dy + f * fh + fh * 0.28} width={side - 20} height={fh * 0.34} rx={3} fill={R(seed + f, 60) > 0.6 ? "#c98a5a" : "#151f4a"} opacity={0.75} />)}
      <path d={topD} fill={ROOF_TOP} opacity={0.9} />
      <path d={`M${x - side + 6} ${y - dy + 2}L${x + w - side} ${y - dy + 2}`} stroke="#a9c3f0" strokeWidth={3} strokeLinecap="round" opacity={0.7} />
      <Shade d={rr(x, y, w, h + 500, 4, 0)} tones={tones} L={[1, -0.15]} s={[8, 22, 7]}>{items}</Shade>
      <path d={`M${x + w - 2} ${y + 6}V${base + 40}`} stroke={RIM} strokeWidth={4.5} strokeLinecap="round" strokeDasharray="150 22 46 22" opacity={0.85} />
      {kit}
    </g>
  );
};

/** Keluarga nada tambahan untuk variasi hue kota (STYLE.md 3.1). */
export const TEAL: Tones = ["#123a52", "#1a5670", "#247e92", "#5cc0c8"];
export const VIOLET: Tones = ["#261a5a", "#352777", "#4f3d9c", "#8f78d8"];

/** Pohon gugus lobus (T4, L2/L3): batang, 4-6 lobus, sisi kanan disinari jingga. */
export const Tree: React.FC<{ x: number; base: number; s: number; seed: number; t: number; tones?: Tones }> = ({ x, base, s: k, seed, t, tones = ["#173a3e", "#1f5a52", "#2f7a62", "#e89a6a"] }) => {
  const id = useSid();
  const sway = Math.sin(t * 1.4 + seed) * 2 * k;
  const n = 4 + Math.floor(R(seed, 101) * 3);
  const lobes = Array.from({ length: n }, (_, i) => ({ cx: (R(seed + i, 102) - 0.5) * 60 * k + sway, cy: -70 * k - R(seed + i, 103) * 50 * k, r: (24 + R(seed + i, 104) * 16) * k }));
  const all = (fill: string, dx = 0, dy = 0) => <g fill={fill} transform={`translate(${dx} ${dy})`}>{lobes.map((l, i) => <circle key={i} cx={l.cx} cy={l.cy} r={l.r} />)}</g>;
  return (
    <g transform={`translate(${x} ${base})`}>
      <path d={`M${-4 * k} 0L${-2 * k} ${-70 * k}H${3 * k}L${5 * k} 0Z`} fill="#2a1a3a" />
      <defs><clipPath id={`t${id}`}>{lobes.map((l, i) => <circle key={i} cx={l.cx} cy={l.cy} r={l.r} />)}</clipPath></defs>
      {all(tones[3])}
      <g clipPath={`url(#t${id})`}>{all(tones[2], -5 * k, -2 * k)}{all(tones[1], -14 * k, 6 * k)}{all(tones[0], -26 * k, 16 * k)}</g>
    </g>
  );
};
/** Lampu jalan dengan glow (sumber cahaya nyata, T8). */
export const Lamp: React.FC<{ x: number; base: number; s: number; t: number }> = ({ x, base, s: k, t }) => (
  <g>
    <path d={`M${x} ${base}V${base - 90 * k}Q${x} ${base - 104 * k} ${x + 14 * k} ${base - 104 * k}`} stroke="#1d1846" strokeWidth={5 * k} fill="none" strokeLinecap="round" />
    <circle cx={x + 16 * k} cy={base - 100 * k} r={42 * k} fill="#ffcf7a" opacity={0.18 + 0.04 * Math.sin(t * 5)} />
    <circle cx={x + 16 * k} cy={base - 100 * k} r={7 * k} fill="#fff1c9" />
  </g>
);
