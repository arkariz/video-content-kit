// Benda dan pemeran tambahan T01-005: koin, amplop, colokan, adaptor, pemeran bank/switch/menara/bank sentral/turis.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, R, SANS, clamp, mix, pop, seg, useShot } from "@r3";
import { Shade, Tones, rr } from "@r3/art";
import { BLUE, COPPER, CORAL, CREAM, Contact, DARK, Eyes, Face, GOLD, GREEN, Glow2, Hose, LL, LR, P, Phone, STEEL, TEALB, WOOD, circ, ell, line, tw } from "./kit";
import { BankHouse } from "./peta";

export const SILVER: Tones = ["#3a4a78", "#6c82ac", "#aec2dc", "#eef6ff"];
export const SKYB: Tones = ["#2a5a90", "#4a8cc0", "#74c0e8", "#c8f0ff"];
export const PURPLE: Tones = ["#2c1658", "#4c2a86", "#7248b4", "#b490e8"];

export const Txt: React.FC<{ x: number; y: number; s: number; c?: string; children: React.ReactNode; a?: "start" | "middle" | "end"; o?: number; stroke?: string }> = ({ x, y, s, c = "#fff", children, a = "middle", o = 1, stroke }) => (
  <text x={x} y={y} textAnchor={a} fontFamily={SANS} fontWeight={800} fontSize={s} fill={c} opacity={o} stroke={stroke} strokeWidth={stroke ? s * 0.16 : 0} paintOrder="stroke" style={{ fontVariantNumeric: "tabular-nums" }}>{children}</text>
);
export const Coin: React.FC<{ x: number; y: number; r?: number; k?: "rp" | "thb" | "usd" | "myr" | "sgd"; sx?: number; label?: boolean; op?: number }> = ({ x, y, r = 50, k = "rp", sx = 1, label = true, op = 1 }) => {
  const tones = k === "rp" ? GOLD : k === "usd" ? GREEN : k === "myr" ? SKYB : k === "sgd" ? CORAL : SILVER;
  const sym = { rp: "Rp", thb: "฿", usd: "$", myr: "RM", sgd: "S$" }[k];
  return (
    <g transform={`translate(${x} ${y}) scale(${sx} 1)`} opacity={op}>
      <Shade d={circ(0, 0, r)} tones={tones} L={LR} s={[r * 0.06, r * 0.2, r * 0.12]} />
      <circle r={r * 0.72} fill="none" stroke={tones[1]} strokeWidth={r * 0.09} />
      {label && <Txt x={0} y={r * 0.26} s={r * (sym.length > 1 ? 0.7 : 0.85)} c={k === "rp" || k === "thb" ? tones[0] : "#fff"}>{sym}</Txt>}
    </g>
  );
};
/** tumpukan koin; (x,y) = dasar */
export const Stack: React.FC<{ x: number; y: number; n: number; w?: number; k?: "rp" | "thb" }> = ({ x, y, n, w = 70, k = "rp" }) => {
  const tones = k === "rp" ? GOLD : SILVER;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Contact x={0} y={4} w={w * 1.3} />
      {Array.from({ length: Math.max(0, Math.floor(n)) }, (_, i) => <g key={i} transform={`translate(${(R(i, 3) - 0.5) * 8} ${-i * w * 0.24})`}><Shade d={`M${-w} ${-w * 0.2}V0Q${-w} ${w * 0.3} 0 ${w * 0.3}Q${w} ${w * 0.3} ${w} 0V${-w * 0.2}Z`} tones={tones} L={LR} s={[3, 10, 5]} /><ellipse cy={-w * 0.2} rx={w} ry={w * 0.27} fill={tones[3]} /><ellipse cy={-w * 0.2} rx={w * 0.72} ry={w * 0.18} fill={tones[2]} /></g>)}
    </g>
  );
};
/** kaleng uang pemilik warung */
export const Tin: React.FC<{ x: number; y: number; s?: number; fill?: number; ghost?: boolean; op?: number }> = ({ x, y, s = 1, fill = 0.6, ghost, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    {!ghost && <Contact x={0} y={4} w={130} />}
    {ghost ? <g fill="#e8e0ff" fillOpacity={0.16} stroke="#fff" strokeWidth={6} strokeDasharray="18 16" strokeOpacity={0.8}><path d={rr(-100, -170, 200, 170, 18)} /><ellipse cy={-170} rx={100} ry={22} /></g> : (
      <g><ellipse cy={-170} rx={100} ry={24} fill="#142a4c" />
        {fill > 0 && Array.from({ length: Math.round(fill * 12) }, (_, i) => <ellipse key={i} cx={(R(i, 5) - 0.5) * 140} cy={-166 - R(i, 6) * 14 * fill} rx={26} ry={10} fill={i % 2 ? "#ffd23f" : "#fff0a0"} />)}
        <Shade d="M-100 -168Q0 -130 100 -168V-12Q100 8 0 10Q-100 8 -100 -12Z" tones={TEALB} L={LR} s={[8, 26, 12]}><rect x={-110} y={-108} width={220} height={50} fill={P.cream} /></Shade>
        <Coin x={0} y={-83} r={22} /></g>
    )}
  </g>
);
/** amplop pesan; stamp = koin di perangko */
export const Envelope: React.FC<{ x: number; y: number; s?: number; rot?: number; k?: "rp" | "thb"; stamped?: number; old?: boolean }> = ({ x, y, s = 1, rot = 0, k = "rp", stamped = 0, old }) => {
  const t: Tones = old ? ["#7a5040", "#b08460", "#dcbc8c", "#f8e4bc"] : CREAM;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <Shade d={rr(-80, -52, 160, 104, 14)} tones={t} L={LR} s={[3, 9, 6]} />
      {line("M-74 -44L0 12L74 -44", t[0], 7)}{line("M-74 46L-26 -4M74 46L26 -4", t[1], 5)}
      {old ? <circle cy={14} r={19} fill="#a82c34" /> : <Coin x={46} y={22} r={20} k={k} label={false} />}
      {stamped > 0 && <g transform={`translate(-30 18) scale(${stamped}) rotate(-12)`}><circle r={34} fill={P.green} />{line("M-15 1L-4 13L17 -11", "#fff", 9)}</g>}
    </g>
  );
};
export const Cross: React.FC<{ x: number; y: number; r: number; p: number }> = ({ x, y, r, p }) => p <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${p})`}><Shade d={circ(0, 0, r)} tones={CORAL} L={LR} s={[r * 0.05, r * 0.14, r * 0.09]} />{line(`M${-r * 0.4} ${-r * 0.4}L${r * 0.4} ${r * 0.4}M${r * 0.4} ${-r * 0.4}L${-r * 0.4} ${r * 0.4}`, "#fff", r * 0.2)}</g>
);

/* ============================== COLOKAN DAN STOPKONTAK ============================== */
const holes = (shape: number, c: string) => {
  const dot = (x: number, y: number, r = 13) => <circle key={`${x},${y}`} cx={x} cy={y} r={r} fill={c} />;
  const slot = (x: number, y: number, w: number, h: number, rot = 0) => <path key={`s${x},${y}`} d={rr(-w / 2, -h / 2, w, h, 5)} transform={`translate(${x} ${y}) rotate(${rot})`} fill={c} />;
  return [
    [slot(-24, 0, 14, 48), slot(24, 0, 14, 48)],
    [dot(-26, 0), dot(26, 0)],
    [slot(-24, -10, 13, 38, 28), slot(24, -10, 13, 38, -28), dot(0, 28, 10)],
    [dot(0, -26), dot(-24, 18), dot(24, 18)],
    [slot(0, -22, 48, 14), slot(-24, 20, 14, 38), slot(24, 20, 14, 38)],
    [dot(-22, -22, 9), dot(22, -22, 9), dot(-22, 22, 9), dot(22, 22, 9)],
  ][shape % 6];
};
export const APPS: Tones[] = [CORAL, BLUE, GREEN, GOLD, PURPLE, TEALB];
/** stopkontak: pelat dinding. shape 6 = soket QRIS (bingkai tiga sudut). */
export const Socket: React.FC<{ x: number; y: number; s?: number; shape?: number; tones?: Tones; lit?: number; label?: boolean }> = ({ x, y, s = 1, shape = 0, tones, lit = 0, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={rr(-70, -62, 150, 150, 34)} fill="#1a0c34" opacity={0.3} />
    {lit > 0 && <Glow2 x={0} y={0} r={190} c={shape === 6 ? "#7dffb8" : P.coin} o={0.7 * lit} />}
    <Shade d={rr(-75, -75, 150, 150, 34)} tones={tones ?? (shape === 6 ? CREAM : APPS[shape % 6])} L={LR} s={[5, 14, 8]} />
    <circle r={52} fill={shape === 6 ? "#e8d0ac" : "#fff4da"} />
    {shape === 6 ? <g>{[[-27, -27], [27, -27], [-27, 27]].map(([a, b]) => <g key={`${a},${b}`}><path d={rr(a - 17, b - 17, 34, 34, 8)} fill={P.navy} /><path d={rr(a - 7, b - 7, 14, 14, 3)} fill="#fff4da" /></g>)}<path d={rr(14, 14, 15, 15, 4)} fill={P.green} /><path d={rr(32, 32, 10, 10, 3)} fill={P.green} /></g> : holes(shape, P.navy)}
    {label && <g transform="translate(0 118)"><path d={rr(-78, -28, 156, 52, 14)} fill="#fff" /><Txt x={0} y={11} s={36} c={P.navy}>QRIS</Txt></g>}
  </g>
);
/** colokan menghadap kanan; (x,y) = tengah badan */
export const Plug: React.FC<{ x: number; y: number; s?: number; tones?: Tones; shape?: number; rot?: number; cord?: boolean; lit?: number }> = ({ x, y, s = 1, tones = CORAL, shape = 0, rot = 0, cord = true, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {lit > 0 && <Glow2 x={60} y={0} r={170} c="#7dffb8" o={0.75 * lit} />}
    {cord && line("M-70 0C-150 0 -150 90 -240 90", tones[0], 26)}
    {(shape === 1 || shape === 3 || shape === 5) ? [-24, 24].map((b) => <g key={b}>{line(`M50 ${b}H112`, "#8aa0c4", 20)}{line(`M52 ${b - 4}H108`, "#eef6ff", 6)}</g>) : [-26, 14].map((b) => <g key={b}><path d={rr(48, b, 66, 13, 5)} fill="#8aa0c4" /><path d={rr(52, b + 1, 56, 4, 2)} fill="#eef6ff" /></g>)}
    <Shade d="M-78 -34Q-78 -58 -46 -60H30Q62 -58 62 -32V32Q62 58 30 60H-46Q-78 58 -78 34Z" tones={tones} L={LR} s={[6, 18, 10]} />
    {[-40, -16, 8].map((a) => <path key={a} d={`M${a} -44V44`} stroke={tones[1]} strokeWidth={8} strokeLinecap="round" />)}
  </g>
);
/** adaptor perjalanan: dua sisi, bisa tembus pandang (see 0..1) */
export const Adapter: React.FC<{ x: number; y: number; s?: number; see?: number; blink?: number; t: number }> = ({ x, y, s = 1, see = 0, blink = 1, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-44, 20].map((b) => <g key={b}><path d={rr(-180, b, 70, 20, 7)} fill="#8aa0c4" /><path d={rr(112, b, 70, 20, 7)} fill="#eef6ff" /></g>)}
    <g opacity={1 - see * 0.8}><Shade d={rr(-120, -110, 240, 220, 54)} tones={GREEN} L={LR} s={[8, 26, 14]} /></g>
    {see > 0 && <g opacity={see}><path d={rr(-120, -110, 240, 220, 54)} fill="none" stroke="#c8ffe4" strokeWidth={9} />{line("M-110 -34C-40 -34 -30 8 0 8", "#ffd23f", 15)}{line("M110 -34C40 -34 30 8 0 8", "#cfe4ff", 15)}<circle cy={8} r={18} fill="#fff" /><Coin x={-58} y={52} r={26} /><Coin x={58} y={52} r={26} k="thb" /></g>}
    <path d={rr(-18, -110, 36, 220, 4)} fill={P.cream} opacity={0.9 * (1 - see)} />
    <circle cy={-76} r={13} fill="#7dffb8" opacity={0.4 + 0.6 * Math.abs(Math.sin(t * 3)) * blink} />
  </g>
);

/* ============================== PEMERAN ============================== */
/** wajah untuk bangunan (bank, switch, menara, bank sentral). mood: neutral|happy|smug|shock|tired|calm */
export const BFace: React.FC<{ x: number; y: number; s?: number; mood?: string; t: number; look?: number }> = ({ x, y, s = 1, mood, t, look = 0 }) => {
  if (!mood) return null;
  const face: Face = mood === "happy" ? "happy" : mood === "shock" ? "shock" : mood === "calm" ? "calm" : "neutral";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cy={14} rx={86} ry={52} fill="#fff4da" opacity={0.96} />
      <Eyes x={0} y={0} gap={30} r={11} face={face} t={t} look={look} />
      {(mood === "tired" || mood === "smug") && <g>{line(mood === "tired" ? "M-46 -14L-16 -8M46 -14L16 -8" : "M-46 -22L-16 -16M16 -24L46 -26", "#241440", 8)}</g>}
    </g>
  );
};
export const BankChar: React.FC<{ x: number; y: number; s?: number; t: number; mood?: string; lit?: number; hand?: [number, number] }> = ({ x, y, s = 1, t, mood, lit = 1, hand }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <BankHouse x={0} y={0} lit={lit} t={t} /><BFace x={0} y={-100} s={1.15} mood={mood} t={t} />
    {hand && <g><Hose d={`M-170 -90Q${(hand[0] - 170) / 2} ${hand[1] + 70} ${hand[0]} ${hand[1]}`} tones={CREAM} w={30} /><circle cx={hand[0]} cy={hand[1]} r={22} fill={CREAM[2]} /></g>}
  </g>
);
/** menara pengawas jaringan kartu: tanpa logo */
export const NetTower: React.FC<{ x: number; y: number; s?: number; t: number; mood?: string; beam?: number; sweep?: number }> = ({ x, y, s = 1, t, mood, beam = 1, sweep }) => {
  const a = sweep ?? Math.sin(t * 0.9) * 28;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Contact x={0} y={4} w={150} />
      {beam > 0 && <g transform={`translate(0 -470) rotate(${a})`} opacity={beam}><defs><linearGradient id="t5beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff3b0" stopOpacity={0.75} /><stop offset="1" stopColor="#fff3b0" stopOpacity={0} /></linearGradient></defs><path d="M0 -14L900 -150V150L0 14Z" fill="url(#t5beam)" /></g>}
      <Shade d="M-96 0L-60 -330H60L96 0Z" tones={PURPLE} L={LR} s={[8, 24, 12]}>{[-70, -150, -230].map((b) => <path key={b} d={`M-110 ${b}H110`} stroke={PURPLE[1]} strokeWidth={9} />)}</Shade>
      <path d="M40 -326L58 -326L90 -4H66Z" fill={PURPLE[0]} opacity={0.8} />
      <path d="M-52 -318L-80 -20" stroke={PURPLE[3]} strokeWidth={9} strokeLinecap="round" strokeDasharray="90 24 40 24" fill="none" />
      {[-258, -178, -108].map((b, i) => <g key={b}><path d={rr(-16 + i * 4, b - 22, 30, 40, 14, 3)} fill="#ffd27a" /><path d={`M${-10 + i * 4} ${b + 10}l18 -24`} stroke="#fffbe8" strokeWidth={4} strokeLinecap="round" /></g>)}
      <path d={rr(-108, -330, 216, 18, 8)} fill={STEEL[1]} />{[-92, -56, -20, 16, 52, 88].map((a) => <path key={a} d={`M${a} -330v-14`} stroke={STEEL[2]} strokeWidth={6} strokeLinecap="round" />)}
      <path d="M-96 -340H96" stroke={STEEL[3]} strokeWidth={5} strokeLinecap="round" />
      <Shade d={rr(-112, -420, 224, 100, 34)} tones={STEEL} L={LR} s={[6, 18, 10]} />
      <path d="M-96 -400Q-60 -414 -10 -412" stroke="#eef6ff" strokeWidth={8} strokeLinecap="round" fill="none" />{[-92, 92].map((a) => <circle key={a} cx={a} cy={-340} r={6} fill={STEEL[0]} />)}
      <BFace x={0} y={-378} s={0.92} mood={mood ?? "neutral"} t={t} />
      <Shade d="M-96 -420Q0 -480 96 -420Z" tones={PURPLE} L={LR} s={[4, 12, 7]} />
      <Glow2 x={0} y={-470} r={90} c="#fff3b0" o={0.85} /><circle cy={-470} r={24} fill="#fffbe0" />
      <path d={rr(-30, -64, 60, 64, 26, 4)} fill="#1a0c3c" />
    </g>
  );
};
/** bank sentral: gedung krem berkubah, pintu tinggi berbentuk pelat stopkontak */
export const CentralBank: React.FC<{ x: number; y: number; s?: number; t: number; mood?: string; open?: number; lit?: number }> = ({ x, y, s = 1, t, mood, open = 0, lit = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Contact x={14} y={8} w={270} o={0.5} />
    {lit > 0 && <Glow2 x={0} y={-230} r={400} c="#ffe0a0" o={0.32 * lit} />}
    <Shade d="M-130 -300C-130 -420 130 -420 130 -300Z" tones={GOLD} L={LR} s={[8, 24, 14]} />
    {line("M0 -390V-436", GOLD[1], 12)}<circle cy={-446} r={16} fill={GOLD[2]} />
    <Shade d={rr(-240, -308, 480, 46, 10)} tones={CREAM} L={LR} s={[4, 12, 7]} />
    <Shade d={rr(-216, -266, 432, 266, 8)} tones={CREAM} L={LR} s={[6, 22, 10]} />
    {[-188, -132, 132, 188].map((a) => <Shade key={a} d={rr(a - 17, -258, 34, 246, 12)} tones={CREAM} L={LR} s={[4, 11, 6]} />)}
    <path d={rr(-82, -196, 164, 196, 44, 6)} fill="#ffd27a" />
    <g transform={`translate(-82 0) scale(${1 - open * 0.9} 1) translate(82 0)`}><Shade d={rr(-82, -196, 164, 196, 44, 6)} tones={TEALB} L={LR} s={[5, 15, 8]} />{[-30, 30].map((a) => <path key={a} d={rr(a - 9, -110, 18, 52, 7)} fill={P.navy} />)}</g>
    <BFace x={0} y={-250} s={0.78} mood={mood} t={t} />
    <Shade d={rr(-262, -14, 524, 30, 9)} tones={CREAM} L={LR} s={[3, 9, 6]} />
  </g>
);
/** turis: badan kapsul biru muda, topi pantai krem, tas selempang */
export const Tourist: React.FC<{ x: number; y: number; s?: number; t: number; face?: Face; look?: number; arm?: [number, number] }> = ({ x, y, s = 1, t, face = "neutral", look = 0, arm }) => {
  const b = Math.sin(t * 2.3 + 1) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Contact x={0} y={4} w={125} />
      <Hose d="M-36 -34Q-44 -8 -56 0" tones={SKYB} w={28} /><Hose d="M36 -34Q44 -8 60 0" tones={SKYB} w={28} />
      <g transform={`translate(0 ${b})`}>
        <Shade d={rr(-108, -350, 216, 330, 108)} tones={SKYB} L={LR} s={[8, 24, 13]} />
        <Eyes x={8 + look} y={-244} gap={30} t={t} face={face} />
        {line("M-92 -200L76 -86", WOOD[2], 16)}<Shade d={rr(52, -112, 84, 72, 22)} tones={WOOD} L={LR} s={[4, 12, 7]} />
        <Shade d="M-170 -316Q0 -360 170 -316Q150 -284 0 -296Q-150 -284 -170 -316Z" tones={CREAM} L={LR} s={[4, 12, 7]} />
        <Shade d="M-88 -316Q-92 -404 0 -404Q92 -404 88 -316Q0 -334 -88 -316Z" tones={CREAM} L={LR} s={[5, 15, 9]}><rect x={-100} y={-344} width={200} height={18} fill={P.coral} /></Shade>
        <Hose d={arm ? `M92 -150Q${(92 + arm[0]) / 2} ${(-150 + arm[1]) / 2 + 80} ${arm[0]} ${arm[1]}` : "M96 -150Q150 -110 136 -64"} tones={SKYB} />
        <Hose d="M-96 -150Q-150 -116 -134 -66" tones={SKYB} />
      </g>
    </g>
  );
};
export const PhoneIcon = Phone;

/** latar gradien penuh dengan bintang opsional */
export const Back: React.FC<{ id: string; stops: string[]; stars?: number; t?: number }> = ({ id, stops, stars = 0, t = 0 }) => (
  <g><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{stops.map((c, i) => <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />)}</linearGradient></defs><rect x={-600} y={-700} width={3200} height={2600} fill={`url(#${id})`} />
    {Array.from({ length: stars }, (_, i) => <circle key={i} cx={R(i, 2) * 2400 - 240} cy={R(i, 3) * 500 - 80} r={1.5 + R(i, 4) * 2.5} fill="#cfe0ff" opacity={0.25 + 0.4 * Math.abs(Math.sin(t * 0.8 + i))} />)}</g>
);
export const drift = (t: number, z0 = 1, z1 = 1.06, d = 6, x = 960, y = 540) => ({ x: x + Math.sin(t * 0.36) * 9, y: y + Math.cos(t * 0.29) * 5, z: mix(z0, z1, seg(t, 0, d, Easing.inOut(Easing.sin))) });
export const bump = (t: number, at: number, d = 0.5) => Math.sin(clamp((t - at) / d) * Math.PI);
export const _b = { Frame, Layer, pop, useShot, tw, COPPER, DARK, LL, STEEL, ell };
