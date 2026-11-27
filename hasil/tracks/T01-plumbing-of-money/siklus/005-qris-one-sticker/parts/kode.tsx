// s12: di dalam pola modul (makro), tag isi kode, lalu keluar ke stiker di meja.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, Pill, R, SANS, clamp, mix, pop, seg, useShot, useLabel } from "@r3";
import { Shade, rr } from "@r3/art";
import { CREAM, Contact, GOLD, GREEN, Glow2, LR, P, STEEL, Sticker, circ, line, tw } from "./kit";
import { Bowl, WarungSet } from "./warung";

const M = 108; // ukuran modul makro
const Module: React.FC<{ x: number; y: number; flip: number; i: number }> = ({ x, y, flip, i }) => {
  const c = Math.cos(flip * Math.PI), sx = Math.max(0.04, Math.abs(c)), lift = Math.sin(flip * Math.PI) * 26, text = c < 0;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={rr(-M * 0.44 + 6, -M * 0.44 + 12 + lift * 0.4, M * 0.88, M * 0.88, 20)} fill="#172447" opacity={0.14} />
      <g transform={`translate(0 ${-lift}) scale(${sx} 1)`}>
        {text ? (<g><path d={rr(-M * 0.44, -M * 0.44, M * 0.88, M * 0.88, 20)} fill="#f4e4c2" />{[0, 1, 2].map((k) => <path key={k} d={`M-30 ${-20 + k * 20}h${22 + R(i * 3 + k, 5) * 38}`} stroke={k === 1 ? P.green : "#5a5a86"} strokeWidth={9} strokeLinecap="round" />)}</g>)
          : (<Shade d={rr(-M * 0.44, -M * 0.44, M * 0.88, M * 0.88, 20)} tones={["#0a1030", "#121c40", "#1f2d5a", "#5a74b4"]} L={[-0.6, -0.8]} s={[4, 12, 7]} />)}
      </g>
    </g>
  );
};
const BigFinder: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Shade d={rr(-250, -250, 500, 500, 70)} tones={["#0a1030", "#121c40", "#1f2d5a", "#5a74b4"]} L={[-0.6, -0.8]} s={[10, 30, 14]} />
    <path d={rr(-178, -178, 356, 356, 48)} fill="#fff4da" />
    <Shade d={rr(-106, -106, 212, 212, 36)} tones={["#0a1030", "#121c40", "#1f2d5a", "#5a74b4"]} L={[-0.6, -0.8]} s={[8, 22, 10]} />
  </g>
);
const Icon: React.FC<{ kind: "shop" | "prov" | "id" }> = ({ kind }) => kind === "shop" ? (
  <g><path d="M-34 -4L0 -34L34 -4Z" fill={P.coral} /><path d={rr(-26, -6, 52, 38, 5)} fill="#fff4da" /><path d={rr(-8, 8, 16, 24, 4)} fill={P.navy} /></g>
) : kind === "prov" ? (
  <g><path d={rr(-28, -30, 56, 62, 8)} fill="#bfe6ff" />{[0, 1, 2].map((i) => <g key={i}><rect x={-18} y={-20 + i * 17} width={12} height={9} fill={P.navy} /><rect x={6} y={-20 + i * 17} width={12} height={9} fill={P.navy} /></g>)}</g>
) : (
  <g><circle r={32} fill="#fff" /><path d="M-32 0A32 32 0 0 1 32 0Z" fill="#d8323a" /><circle r={32} fill="none" stroke="#fff4da" strokeWidth={5} /></g>
);
const TagCard: React.FC<{ x: number; y: number; s: number; kind: "shop" | "prov" | "id"; t: number; glow?: number }> = ({ x, y, s, kind, t, glow = 0 }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y + Math.sin(t * 2 + x) * 8}) scale(${s})`}>
    {glow > 0 && <Glow2 x={0} y={0} r={330} c={P.coin} o={0.7 * glow} />}
    <path d={rr(-180, -66, 380, 160, 70)} fill="#172447" opacity={0.2} transform="translate(0 12)" />
    <Shade d={rr(-190, -78, 380, 156, 70)} tones={GREEN} L={LR} s={[5, 14, 8]} />
    <path d={rr(-174, -62, 348, 124, 56)} fill="#fff4da" />
    <g transform="translate(-108 0)"><circle r={50} fill={P.green} /><g transform="scale(0.92)"><Icon kind={kind} /></g></g>
    {kind === "id" ? <text x={50} y={30} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={88} fill={P.navy} letterSpacing={6}>ID</text>
      : [0, 1, 2].map((k) => <path key={k} d={`M-36 ${-30 + k * 30}h${[178, 140, 108][k]}`} stroke={k ? "#8a82ac" : P.navy} strokeWidth={k ? 11 : 15} strokeLinecap="round" />)}
  </g>
);
const grid = (t: number, waveAt: number, back: number) => {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < 20; i++) for (let j = 0; j < 12; j++) {
    const x = -120 + i * M, y = -60 + j * M, k = i * 40 + j;
    const dark = R(k + 17, 3) > 0.5;
    const flip = dark ? seg(t, waveAt + (i + j) * 0.055, waveAt + (i + j) * 0.055 + 0.5) - back : 0;
    if (!dark) continue;
    if ((i < 4 && j < 4) || (i > 13 && j < 4)) continue;
    out.push(<Module key={k} x={x} y={y} flip={clamp(flip)} i={k} />);
  }
  return out;
};
const Motes: React.FC<{ t: number }> = ({ t }) => <g>{Array.from({ length: 24 }, (_, i) => <circle key={i} cx={(R(i, 2) * 2100 + t * 14 * (0.5 + R(i, 3))) % 2100 - 90} cy={R(i, 4) * 1080 + Math.sin(t + i) * 20} r={3 + R(i, 5) * 6} fill="#1f2d5a" opacity={0.18} />)}</g>;
const Paper: React.FC = () => <><defs><radialGradient id="t5paper" cx="0.5" cy="0.45" r="0.75"><stop offset="0" stopColor="#fffaf0" /><stop offset="1" stopColor="#e8cfa6" /></radialGradient></defs><rect x={-600} y={-600} width={3100} height={2300} fill="url(#t5paper)" /></>;

/** shot 1-2 (shot 2 hold): modul berbalik jadi teks, tiga tag keluar. */
export const InsideShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tReads = tw(word("reads"), 1), tShop = tw(word("shop"), 4.2), tProv = tw(word("provider"), 5.4), tId = tw(word("Indonesia"), 7.6);
  const first = tw(word("Inside"), tShop - 0.8);
  const push = seg(t, 0, first, Easing.out(Easing.cubic));
  const cam = { x: 960 + Math.sin(t * 0.4) * 12, y: 540, z: mix(0.9, 1.12, push) + Math.max(0, t - first) * 0.006 };
  const calm = seg(t, tShop - 0.5, tShop);
  const tags: ["shop" | "prov" | "id", number, number, string][] = [["shop", 450, tShop, "SHOP"], ["prov", 960, tProv, "PROVIDER"], ["id", 1470, tId, "ID"]];
  const pS = useLabel("SHOP"), pP = useLabel("PROVIDER"), pI = useLabel("ID"), ps = [pS, pP, pI];
  const scan = (t - tReads) * 0.55;
  return (
    <Frame vignette={0.35}>
      <Layer cam={cam} d={0}><Paper /></Layer>
      <Layer cam={cam} d={0.9}>{grid(t, tReads - 0.1, 0)}<BigFinder x={90} y={110} s={0.95} /><BigFinder x={1830} y={110} s={0.95} />
        {scan > 0 && scan < 1.3 && <g transform={`translate(0 ${-80 + scan * 1000})`}><rect x={-200} y={-30} width={2300} height={60} fill={P.green} opacity={0.18} /><rect x={-200} y={-4} width={2300} height={8} fill="#4fd8a0" /></g>}
        <rect x={-400} y={-300} width={2700} height={1700} fill="#fff4da" opacity={0.55 * calm} />
      </Layer>
      <Motes t={t} />
      <Layer cam={cam} d={1.06}>
        {tags.map(([k, x, at, label], i) => {
          const p = seg(t, at - 0.15, at + 0.4, Easing.out(Easing.back(1.5)));
          const tx = vertical ? 960 : x, ty = vertical ? 280 + i * 190 : 500;
          return <g key={k}><TagCard x={mix(960 + (i - 1) * 80, tx, p)} y={mix(760, ty, p)} s={p * (vertical ? 0.85 : 1.08)} kind={k} t={t} glow={k === "id" ? seg(t, at, at + 0.4) : 0} /><Pill x={tx} y={ty - (vertical ? 62 : 104)} text={label} p={ps[i]} bg={k === "id" ? "#d8323a" : P.green} size={vertical ? 30 : 42} /></g>;
        })}
      </Layer>
    </Frame>
  );
};

/** shot 3: tag kembali ke kode, kamera keluar ke stiker; slot nominal tetap kosong. */
export const PullOutShot: React.FC = () => {
  const { t, word, dur } = useShot();
  const tAmt = tw(word("amount"), 0.7), tSt = tw(word("sticker"), dur - 1);
  const tuck = seg(t, 0, 0.6, Easing.in(Easing.cubic)), pull = seg(t, 0.25, tAmt + 0.1, Easing.inOut(Easing.cubic));
  const cam = { x: mix(960, 1040, pull), y: mix(560, 545, pull), z: mix(2.9, 1.14, pull) + Math.max(0, t - tAmt) * 0.008 };
  const slot = pop(t, tAmt - 0.15, 0.35), still = Math.sin(clamp((t - tSt) / 0.7) * Math.PI);
  return (
    <Frame vignette={0.45}>
      <WarungSet t={t + 4} cam={cam}>
        <path d="M230 756H1790L1830 810H190Z" fill="#d98a56" /><path d="M230 756H1790L1802 772H218Z" fill="#f0a868" />
        <Shade d={rr(186, 806, 1648, 72, 14)} tones={["#3c1d3e", "#6a3340", "#98523e", "#d98a56"]} L={LR} s={[4, 16, 8]} /><path d="M360 878H1620V1200H360Z" fill="#2c1648" opacity={0.85} />
        <Bowl x={560} y={796} noodles t={t} />
        <Sticker x={960} y={790} s={0.98} glow={still * 0.8} />
        {tuck < 1 && [-1, 0, 1].map((i) => <TagCard key={i} x={mix(960 + i * 190, 960, tuck)} y={mix(330, 560, tuck)} s={(1 - tuck) * 0.42} kind={i < 0 ? "shop" : i > 0 ? "id" : "prov"} t={t} />)}
        <g transform={`translate(1360 560) scale(${slot})`}>
          {line("M-215 0L-188 0", P.coin, 9)}
          <path d={rr(-178, -84, 356, 168, 36)} fill="#172447" opacity={0.6} />
          <rect x={-160} y={-66} width={320} height={132} rx={26} fill="none" stroke={P.coin} strokeWidth={9} strokeDasharray="26 22" strokeDashoffset={-t * 36} strokeLinecap="round" />
          <text x={-94} y={24} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={66} fill="#fff4da">Rp</text>
          {line("M-20 28H112", "#fff4da", 10, 0.35 + 0.35 * Math.abs(Math.sin(t * 3)))}
        </g>
      </WarungSet>
    </Frame>
  );
};
export const _k = { Contact, CREAM, GOLD, STEEL, circ, pop };
