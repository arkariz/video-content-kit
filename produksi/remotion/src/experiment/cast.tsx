// Pemeran T02 (eksperimen). Bahasa bentuk: badan = satu bentuk dasar, tangan/kaki selang karet, mata titik, satu aksesori.
// Rendering ala R3 (produksi/REFERENSI-GAYA.md): tanpa garis tinta, isian datar + satu bayangan + satu kilap, glow di latar gelap.
import React from "react";

export const SANS = "'Avenir Next','Helvetica Neue',Arial,sans-serif";
export type Expr = "neutral" | "happy" | "sad" | "shock" | "tired" | "angry" | "smug";

const uid = () => React.useId().replace(/[^a-zA-Z0-9]/g, "");

/** Mata terbuka 0..1 (berkedip tiap ±3,3 detik, fase per tokoh) */
export const blink = (t: number, seed = 0) => { const p = (t + seed) % 3.3; return p < 0.14 ? Math.abs(p - 0.07) / 0.07 : 1; };

export const Limb: React.FC<{ a: [number, number]; b: [number, number]; bend?: number; w?: number; c: string }> = ({ a, b, bend = 0, w = 14, c }) => {
  const [x1, y1] = a, [x2, y2] = b; const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  return <path d={`M${x1} ${y1} Q${(x1 + x2) / 2 - (dy / L) * bend} ${(y1 + y2) / 2 + (dx / L) * bend} ${x2} ${y2}`} stroke={c} strokeWidth={w} strokeLinecap="round" fill="none" />;
};

export const Face: React.FC<{ expr: Expr; open?: number; look?: number; sp?: number; ink?: string; talk?: number; brows?: string }> = ({ expr, open = 1, look = 0, sp = 26, ink = "#2a1d26", talk = 0, brows }) => {
  const o = expr === "tired" ? Math.min(open, 0.42) : open;
  const k = expr === "shock" ? 1.25 : 1, er = 9 * k;
  const tilt: Record<Expr, number> = { neutral: 0, happy: -6, sad: -16, shock: -10, tired: 4, angry: 18, smug: 10 };
  const mouth = talk > 0.05 ? <ellipse cy={2} rx={9} ry={3 + talk * 9} fill="#5a2232" /> : {
    neutral: <path d="M-9 0 H9" stroke={ink} strokeWidth={4.5} strokeLinecap="round" />,
    happy: <path d="M-15 -3 Q0 17 15 -3 Z" fill="#5a2232" />,
    sad: <path d="M-12 7 Q0 -5 12 7" stroke={ink} strokeWidth={4.5} fill="none" strokeLinecap="round" />,
    shock: <ellipse rx={8} ry={11} fill="#5a2232" />,
    tired: <path d="M-11 2 q5.5 -5 11 0 q5.5 5 11 0" stroke={ink} strokeWidth={4} fill="none" strokeLinecap="round" transform="translate(0 0)" />,
    angry: <><rect x={-14} y={-5} width={28} height={12} rx={5} fill="#5a2232" /><path d="M-12 1 H12" stroke="#fff" strokeWidth={3} /></>,
    smug: <path d="M-12 3 Q2 10 15 -5" stroke={ink} strokeWidth={4.5} fill="none" strokeLinecap="round" />,
  }[expr];
  return (
    <g>
      {[-1, 1].map((sd) => (
        <g key={sd} transform={`translate(${sd * sp + look * 6} 0)`}>
          {expr === "happy"
            ? <path d={`M${-er} 3 Q0 ${-er - 5} ${er} 3`} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />
            : <><ellipse rx={er} ry={Math.max(1.2, er * o)} fill={ink} />{o > 0.55 && <circle cx={-3 + look * 2} cy={-3.5} r={2.8} fill="#fff" />}</>}
          {(expr !== "neutral" && expr !== "happy" || brows) && (
            <path d={`M${-11} ${-19 - sd * 0} L${11} ${-19}`} transform={`rotate(${sd * tilt[expr]} 0 -19) translate(0 ${expr === "shock" ? -6 : 0})`} stroke={brows ?? ink} strokeWidth={brows ? 9 : 4.5} strokeLinecap="round" />
          )}
        </g>
      ))}
      <g transform="translate(0 24)">{mouth}</g>
    </g>
  );
};

const Shadow: React.FC<{ w: number }> = ({ w }) => <ellipse cx={0} cy={3} rx={w} ry={w * 0.16} fill="#000" opacity={0.18} />;

/* ------------------------------------------------------------------ */
/** KOMO: tokoh utama, penumpang sehari-hari. Badan kacang sawo matang, topi bucket, ransel. Titik asal = di antara kaki. */
export type KomoPose = "idle" | "wave" | "point" | "shrug" | "walk";
export const Komo: React.FC<{ x: number; y: number; s?: number; t: number; expr?: Expr; pose?: KomoPose; look?: number; talk?: number; flip?: boolean }> = ({ x, y, s = 1, t, expr = "neutral", pose = "idle", look = 0, talk = 0, flip }) => {
  const id = uid();
  const C = { skin: "#c98a5a", shade: "#a86c43", hat: "#2c8c86", hatD: "#1f6f6a", band: "#f2c14e", pack: "#e2573d", packD: "#b9432f", shoe: "#2f3b52" };
  const walk = pose === "walk";
  const ph = t * 9;
  const step = walk ? Math.sin(ph) * 16 : 0;
  const bob = walk ? -Math.abs(Math.sin(ph)) * 8 : 0;
  const br = 1 + Math.sin(t * 2.4) * 0.018;
  const arms: Record<KomoPose, [[number, number], [number, number], number, number]> = {
    idle: [[-86, -66], [86, -66], 14, -14],
    walk: [[-84 - step * 0.8, -70], [84 - step * 0.8, -70], 12, -12],
    wave: [[-86, -66], [116 + Math.sin(t * 11) * 16, -212], 14, 26],
    point: [[-86, -66], [168, -138], 14, 10],
    shrug: [[-122, -176], [122, -176], -24, 24],
  };
  const [lh, rh, lb, rb] = arms[pose];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Shadow w={64} />
      {/* kaki */}
      <Limb a={[-22, -44]} b={[-24 + step, -8]} bend={walk ? step * 0.4 : 4} w={13} c={C.shade} />
      <Limb a={[22, -44]} b={[24 - step, -8]} bend={walk ? -step * 0.4 : -4} w={13} c={C.shade} />
      <ellipse cx={-28 + step} cy={-5} rx={17} ry={9} fill={C.shoe} /><ellipse cx={28 - step} cy={-5} rx={17} ry={9} fill={C.shoe} />
      <g transform={`translate(0 ${bob})`}>
        {/* ransel di belakang */}
        <rect x={34} y={-172} width={54} height={86} rx={20} fill={C.packD} />
        <g transform={`translate(0 -38) scale(1 ${br}) translate(0 38)`}>
          <clipPath id={`k${id}`}><ellipse cx={0} cy={-128} rx={74} ry={90} /></clipPath>
          <ellipse cx={0} cy={-128} rx={74} ry={90} fill={C.skin} />
          <g clipPath={`url(#k${id})`}>
            <ellipse cx={34} cy={-98} rx={74} ry={96} fill={C.shade} opacity={0.55} />
            <path d="M-80 -50 L80 -96" stroke={C.pack} strokeWidth={15} />
          </g>
          <ellipse cx={-30} cy={-176} rx={22} ry={11} fill="#fff" opacity={0.22} transform="rotate(-28 -30 -176)" />
          <g transform="translate(0 -126)"><Face expr={expr} open={blink(t, 0.4)} look={look} sp={25} talk={talk} /></g>
          {/* topi bucket */}
          <path d="M-46 -206 Q-44 -248 0 -250 Q44 -248 46 -206 Z" fill={C.hat} />
          <rect x={-46} y={-216} width={92} height={10} fill={C.band} />
          <ellipse cx={0} cy={-205} rx={72} ry={13} fill={C.hatD} />
        </g>
        {/* tangan */}
        <Limb a={[-64, -122]} b={lh} bend={lb} w={13} c={C.shade} />
        <Limb a={[64, -122]} b={rh} bend={rb} w={13} c={C.shade} />
        <circle cx={lh[0]} cy={lh[1]} r={10} fill={C.skin} /><circle cx={rh[0]} cy={rh[1]} r={10} fill={C.skin} />
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/** SEPUH: kereta eks-Tokyo yang sudah tua, tampak depan, berlivery KRL. Kumis dan alis putih, karat, tongkat. Titik asal = rel. */
export const Sepuh: React.FC<{ x: number; y: number; s?: number; t: number; expr?: Expr; roll?: number; talk?: number; look?: number; dim?: number; stamp?: number; sweat?: boolean }> = ({ x, y, s = 1, t, expr = "tired", roll = 0, talk = 0, look = 0, dim = 0, stamp = 0, sweat }) => {
  const id = uid();
  const C = { body: "#ece5d3", shade: "#cfc6b0", win: "#2b3550", red: "#d83c33", yel: "#f2b632", stache: "#d9d5cc", stacheD: "#b9b4aa", dark: "#3b3d46", rust: "#a8643a" };
  const br = 1 + Math.sin(t * 2) * 0.01;
  const w = Math.sin(t * 3.1) * 3;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} style={{ filter: `saturate(${1 - dim * 0.75}) brightness(${1 - dim * 0.3})` }}>
      <Shadow w={140} />
      {/* bogie dan roda */}
      <rect x={-120} y={-46} width={240} height={30} rx={12} fill={C.dark} />
      {[-78, 78].map((wx) => (
        <g key={wx} transform={`translate(${wx} -16) rotate(${roll})`}>
          <circle r={20} fill="#2a2b31" /><path d="M-13 0H13M0 -13V13" stroke="#8d8f99" strokeWidth={6} strokeLinecap="round" />
        </g>
      ))}
      {/* pantograf */}
      <path d="M-50 -372 L0 -420 L50 -372 M-70 -422 H70" stroke={C.dark} strokeWidth={8} fill="none" strokeLinecap="round" />
      <g transform={`translate(0 -40) scale(1 ${br}) translate(0 40)`}>
        <clipPath id={`s${id}`}><rect x={-128} y={-372} width={256} height={334} rx={54} /></clipPath>
        <rect x={-128} y={-372} width={256} height={334} rx={54} fill={C.body} />
        <g clipPath={`url(#s${id})`}>
          <rect x={60} y={-372} width={90} height={340} fill={C.shade} opacity={0.7} />
          <rect x={-130} y={-98} width={260} height={22} fill={C.red} />
          <rect x={-130} y={-76} width={260} height={10} fill={C.yel} />
          {[[-104, -60, 22], [96, -330, 16], [-90, -350, 12], [108, -130, 14]].map(([rx, ry, r], i) => <ellipse key={i} cx={rx} cy={ry} rx={r} ry={r * 0.7} fill={C.rust} opacity={0.45} />)}
        </g>
        <ellipse cx={-70} cy={-340} rx={30} ry={9} fill="#fff" opacity={0.35} transform="rotate(-12 -70 -340)" />
        {/* papan tujuan dan kaca depan */}
        <rect x={-62} y={-358} width={124} height={26} rx={8} fill="#1d1f27" />
        {[-44, -18, 8, 34].map((dx) => <rect key={dx} x={dx} y={-349} width={18} height={8} rx={3} fill="#ff9a3c" />)}
        <rect x={-100} y={-322} width={200} height={70} rx={24} fill={C.win} />
        <path d="M-80 -300 L-40 -312" stroke="#fff" strokeWidth={8} opacity={0.25} strokeLinecap="round" />
        <g transform="translate(0 -212) scale(1.45)"><Face expr={expr} open={blink(t, 1.7)} look={look} sp={30} talk={talk} brows={C.stache} /></g>
        {/* kumis */}
        <g transform="translate(0 -150)">
          <path d={`M0 0 C-30 -18 -70 -10 -86 ${12 + w} C-60 ${4 + w} -34 14 0 8 Z`} fill={C.stache} />
          <path d={`M0 0 C30 -18 70 -10 86 ${12 - w} C60 ${4 - w} 34 14 0 8 Z`} fill={C.stacheD} />
        </g>
        {/* lampu depan redup */}
        <circle cx={-92} cy={-116} r={12} fill="#fff1b0" opacity={0.8} /><circle cx={92} cy={-116} r={12} fill="#fff1b0" opacity={0.8} />
        {sweat && <path d={`M118 ${-268 + ((t * 40) % 30)} q11 16 0 22 q-11 -6 0 -22`} fill="#8fd3f5" />}
        {stamp > 0 && (
          <g transform={`translate(0 -96) rotate(-11) scale(${1 + (1 - stamp) * 1.4})`} opacity={stamp}>
            <rect x={-108} y={-34} width={216} height={68} rx={10} fill="#fff8ea" fillOpacity={0.9} stroke="#d8322b" strokeWidth={8} />
            <text y={20} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={50} fill="#d8322b" letterSpacing={2}>TOO OLD</text>
          </g>
        )}
      </g>
      {/* tangan dan tongkat */}
      <Limb a={[-122, -170]} b={[-160, -104]} bend={16} w={12} c={C.shade} />
      <Limb a={[122, -170]} b={[166, -112]} bend={-16} w={12} c={C.shade} />
      <path d="M168 -112 V0 M168 -112 q0 -22 -20 -22" stroke="#7a5232" strokeWidth={8} fill="none" strokeLinecap="round" />
      <circle cx={-160} cy={-104} r={10} fill={C.body} /><circle cx={166} cy={-112} r={10} fill={C.body} />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/** PAK ATURAN: aturan/pemerintah sebagai selembar dokumen resmi berdasi kupu-kupu, membawa stempel. Titik asal = di antara kaki. */
export const Aturan: React.FC<{ x: number; y: number; s?: number; t: number; expr?: Expr; stampUp?: number; slam?: number; talk?: number; look?: number; flip?: boolean }> = ({ x, y, s = 1, t, expr = "neutral", stampUp = 0, slam = 0, talk = 0, look = 0, flip }) => {
  const id = uid();
  const C = { paper: "#f6efda", shade: "#e1d7bb", line: "#c9bea2", navy: "#26365c", navyD: "#1b2846", seal: "#d8322b" };
  const br = 1 + Math.sin(t * 2.2 + 1) * 0.012;
  // tangan kanan: diam (0) → terangkat (stampUp) → dihantam ke depan (slam)
  const ux = 96 + stampUp * 40, uy = -130 - stampUp * 190;
  const hx = ux + (190 - ux) * slam, hy = uy + (-120 - uy) * slam;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Shadow w={70} />
      <Limb a={[-26, -64]} b={[-28, -10]} w={12} c={C.navyD} /><Limb a={[26, -64]} b={[28, -10]} w={12} c={C.navyD} />
      <ellipse cx={-32} cy={-6} rx={16} ry={8} fill="#1a1a22" /><ellipse cx={32} cy={-6} rx={16} ry={8} fill="#1a1a22" />
      <g transform={`translate(0 -60) scale(1 ${br}) translate(0 60)`}>
        <clipPath id={`a${id}`}><path d="M-76 -330 H40 L76 -294 V-60 H-76 Z" /></clipPath>
        <path d="M-76 -330 H40 L76 -294 V-60 H-76 Z" fill={C.paper} />
        <g clipPath={`url(#a${id})`}><rect x={30} y={-340} width={60} height={290} fill={C.shade} opacity={0.6} /></g>
        <path d="M40 -330 V-294 H76 Z" fill={C.shade} />
        {[-150, -130, -110, -90].map((ly, i) => <rect key={ly} x={-56} y={ly} width={i === 3 ? 60 : 104} height={8} rx={4} fill={C.line} />)}
        <circle cx={38} cy={-86} r={16} fill={C.seal} opacity={0.85} />
        <g transform="translate(0 -250)"><Face expr={expr} open={blink(t, 2.6)} look={look} sp={24} talk={talk} /></g>
        {/* dasi kupu-kupu */}
        <g transform="translate(0 -184)"><path d="M0 0 L-26 -14 V14 Z M0 0 L26 -14 V14 Z" fill={C.navy} /><circle r={7} fill={C.navyD} /></g>
        {/* peci resmi berpinggir */}
        <path d="M-60 -330 Q-56 -364 0 -366 Q56 -364 60 -330 Z" fill={C.navy} />
        <path d="M-66 -330 H82 Q70 -318 40 -318 H-66 Z" fill={C.navyD} />
      </g>
      <Limb a={[-72, -170]} b={[-104, -104]} bend={14} w={12} c={C.navyD} /><circle cx={-104} cy={-104} r={10} fill={C.paper} />
      <Limb a={[72, -176]} b={[hx, hy]} bend={-18} w={12} c={C.navyD} />
      {/* stempel di tangan kanan */}
      <g transform={`translate(${hx} ${hy})`}>
        <rect x={-10} y={-4} width={20} height={34} fill="#8a5a36" />
        <ellipse cx={0} cy={-10} rx={20} ry={15} fill="#a56c40" />
        <rect x={-36} y={28} width={72} height={20} rx={5} fill="#3a3a44" /><rect x={-34} y={46} width={68} height={8} rx={3} fill={C.seal} />
        <circle cx={0} cy={0} r={10} fill={C.paper} />
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/** CICAK: pengamat kecil yang menempel di mana saja. Titik asal = perut. */
export const Cicak: React.FC<{ x: number; y: number; s?: number; t: number; crawl?: boolean; expr?: Expr; flip?: boolean; look?: number }> = ({ x, y, s = 1, t, crawl, expr = "happy", flip, look = 0 }) => {
  const C = { body: "#b9c98d", shade: "#93a668", eye: "#2a1d26" };
  const ph = crawl ? Math.sin(t * 14) : 0;
  const tail = Math.sin(t * (crawl ? 10 : 2.5)) * 8;
  const o = blink(t, 0.9);
  const leg = (lx: number, d: number, k: number) => (
    <g key={lx + "-" + d}>
      <Limb a={[lx, -14]} b={[lx + 14 * d + k * 6, 0]} bend={d * 6} w={7} c={C.shade} />
      {[-6, 0, 6].map((tx) => <circle key={tx} cx={lx + 14 * d + k * 6 + tx} cy={1} r={3.4} fill={C.shade} />)}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={56} ry={7} fill="#000" opacity={0.15} />
      <path d={`M-38 -12 C-76 ${-12 + tail} -98 ${-34 + tail} -84 ${-52 + tail * 0.5} C-74 -64 -58 -54 -66 -44`} stroke={C.shade} strokeWidth={11} fill="none" strokeLinecap="round" />
      {leg(-22, -1, ph)}{leg(18, 1, -ph)}
      <ellipse cx={0} cy={-18} rx={42} ry={18} fill={C.body} />
      <ellipse cx={6} cy={-10} rx={36} ry={9} fill={C.shade} opacity={0.5} />
      <circle cx={46} cy={-30} r={22} fill={C.body} />
      {[36, 58].map((ex, i) => (
        <g key={ex}><circle cx={ex} cy={-46} r={10} fill={C.body} /><ellipse cx={ex + look * 3} cy={-46} rx={6} ry={6 * o} fill={C.eye} />{o > 0.5 && <circle cx={ex - 2 + look * 3} cy={-48} r={2} fill="#fff" />}</g>
      ))}
      {expr === "happy" ? <path d="M40 -24 Q52 -16 64 -26" stroke={C.eye} strokeWidth={3.5} fill="none" strokeLinecap="round" /> : expr === "shock" ? <ellipse cx={54} cy={-22} rx={5} ry={6} fill="#5a2232" /> : <path d="M44 -22 H62" stroke={C.eye} strokeWidth={3.5} strokeLinecap="round" />}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/** Label pil ala R3: isian warna, teks putih tebal, segitiga penunjuk ke bawah. */
export const Pill: React.FC<{ x: number; y: number; text: string; p?: number; bg?: string; size?: number }> = ({ x, y, text, p = 1, bg = "#e2573d", size = 34 }) => {
  if (p <= 0) return null;
  const w = text.length * size * 0.66 + size * 1.1, h = size * 1.55;
  return (
    <g transform={`translate(${x} ${y}) scale(${p})`}>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={8} fill={bg} />
      <path d={`M-10 0 L10 0 L0 12 Z`} fill={bg} />
      <text y={-h / 2 + size * 0.36} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={size} fill="#fff" letterSpacing={0.5}>{text}</text>
    </g>
  );
};

/** Latar gradien + glow + bokeh ala R3 */
export const Backdrop: React.FC<{ id: string; top: string; bottom: string; glow?: string; glowAt?: [number, number]; dots?: string[]; t: number; n?: number }> = ({ id, top, bottom, glow, glowAt = [960, 600], dots = [], t, n = 40 }) => (
  <g>
    <defs>
      <linearGradient id={`bg${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient>
      {glow && <radialGradient id={`gl${id}`}><stop offset="0" stopColor={glow} stopOpacity={0.55} /><stop offset="1" stopColor={glow} stopOpacity={0} /></radialGradient>}
      <filter id={`bl${id}`}><feGaussianBlur stdDeviation={6} /></filter>
    </defs>
    <rect x={-400} y={-400} width={2720} height={1880} fill={`url(#bg${id})`} />
    {glow && <ellipse cx={glowAt[0]} cy={glowAt[1]} rx={760} ry={520} fill={`url(#gl${id})`} />}
    {dots.length > 0 && Array.from({ length: n }, (_, i) => {
      const r = 3 + ((i * 37) % 11), sx = ((i * 467) % 2100) - 90, sy = ((i * 283) % 1200) - 60;
      return <circle key={i} cx={sx + Math.sin(t * 0.6 + i) * 14} cy={((((sy - t * (8 + (i % 5) * 3)) % 1300) + 1300) % 1300) - 60} r={r} fill={dots[i % dots.length]} opacity={0.5} filter={r > 10 ? `url(#bl${id})` : undefined} />;
    })}
  </g>
);
