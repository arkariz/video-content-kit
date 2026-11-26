// Pemeran T02 "Why Southeast Asia" (produksi/STYLE.md). Bahasa bentuk: badan = satu bentuk dasar, tangan/kaki selang karet, mata titik, satu aksesori.
// Rendering R3: tanpa garis tinta, isian datar + satu bayangan + satu kilap. Dipindahkan dari experiment/cast.tsx (2026-11-26).
import React from "react";
import { R, SANS, fade, mix, pick, shade } from "../kit";
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


/* ================================================================== */
/* Figuran dan benda T02 (gaya R3, tanpa garis tinta).                 */
/* ================================================================== */
const SKINS = ["#c98a5a", "#a86c43", "#e0ac82", "#8d5a3b", "#d29a72"];
const SHIRTS = ["#e2573d", "#2c8c86", "#f2b632", "#3f7cac", "#8b6bb1", "#efe6d2", "#cf6f3e", "#5b8a5a", "#c65b8a", "#6d7a88"];
const PANTS = ["#2f3b52", "#3b3346", "#5d4c3a", "#41504a"];

export type WargaPose = "stand" | "sit" | "hang" | "seat" | "wave" | "walk";
/**
 * WARGA: figuran penumpang (badan kacang kecil, tanpa aksesori tokoh utama). Tinggi ±150 pada s=1.
 * Titik asal: telapak kaki (stand/wave/walk), tepi tempat duduk (sit), pijakan pintu (hang), tepi bawah jendela (seat).
 * hot = gerah (keringat, warna lebih hangat); dim = pudar (masa lalu / keadaan buruk); lean = condong keluar (derajat).
 */
export const Warga: React.FC<{ x: number; y: number; s?: number; t: number; seed: string | number; pose?: WargaPose; expr?: Expr; hot?: number; dim?: number; lean?: number; flip?: boolean; shirt?: string }> = ({ x, y, s = 1, t, seed, pose = "stand", expr = "neutral", hot = 0, dim = 0, lean = 0, flip, shirt: shirtIn }) => {
  const id = uid();
  const k = String(seed);
  const skin0 = pick(SKINS, k + "k"), shirt0 = shirtIn ?? pick(SHIRTS, k + "s"), pants0 = pick(PANTS, k + "p");
  const f = (c: string) => (dim > 0 ? fade(c, dim * 0.7) : c);
  const skin = f(skin0), shirt = f(shirt0), pants = f(pants0), limb = f(shade(skin0, 0.2));
  const hat = R(k + "h") > 0.72 ? pick(["#2f3b52", "#e2573d", "#efe6d2", "#2c8c86"], k + "hc") : null;
  const hijab = !hat && R(k + "j") > 0.8 ? f(pick(["#c65b8a", "#3f7cac", "#efe6d2", "#8b6bb1"], k + "jc")) : null;
  const ph = R(k + "ph") * 6.28, sway = Math.sin(t * 2.6 + ph);
  const br = 1 + Math.sin(t * 2.4 + ph) * 0.02;
  const body = (cy: number, rx = 30, ry = 42) => (
    <g transform={`translate(0 ${cy + ry}) scale(1 ${br}) translate(0 ${-cy - ry})`}>
      <clipPath id={`w${id}`}><ellipse cx={0} cy={cy} rx={rx} ry={ry} /></clipPath>
      <ellipse cx={0} cy={cy} rx={rx} ry={ry} fill={hijab ?? skin} />
      <g clipPath={`url(#w${id})`}>
        {hijab && <ellipse cx={0} cy={cy - ry * 0.18} rx={rx * 0.66} ry={ry * 0.46} fill={skin} />}
        <rect x={-rx} y={cy + ry * 0.1} width={rx * 2} height={ry} fill={shirt} />
        <ellipse cx={rx * 0.5} cy={cy + ry * 0.3} rx={rx} ry={ry * 1.1} fill={shade(skin0, 0.35)} opacity={0.38} />
      </g>
      <ellipse cx={-rx * 0.42} cy={cy - ry * 0.55} rx={rx * 0.3} ry={ry * 0.13} fill="#fff" opacity={0.22} transform={`rotate(-28 ${-rx * 0.42} ${cy - ry * 0.55})`} />
      <g transform={`translate(0 ${cy - ry * 0.2}) scale(0.62)`}><Face expr={hot > 0.5 && expr === "neutral" ? "tired" : expr} open={blink(t, ph)} sp={22} /></g>
      {hat && <><path d={`M${-rx * 0.82} ${cy - ry * 0.62} Q0 ${cy - ry * 1.32} ${rx * 0.82} ${cy - ry * 0.62} Z`} fill={f(hat)} /><rect x={rx * 0.1} y={cy - ry * 0.7} width={rx * 1.0} height={7} rx={3} fill={f(shade(hat, 0.25))} /></>}
      {hot > 0 && <path d={`M${rx * 0.9} ${cy - ry * 0.5 + ((t * 36 + ph * 9) % 22)} q7 11 0 15 q-7 -4 0 -15`} fill="#8fd3f5" opacity={hot} />}
    </g>
  );
  const hand = (hx: number, hy: number) => <circle cx={hx} cy={hy} r={7.5} fill={skin} />;
  let el: React.ReactNode;
  if (pose === "sit") {
    const sw = sway * 6;
    el = <>
      <Limb a={[-12, -8]} b={[-16 + sw, 34]} bend={-6} w={10} c={pants} /><Limb a={[12, -8]} b={[14 + sw * 0.6, 32]} bend={-6} w={10} c={pants} />
      {body(-42)}
      <Limb a={[-26, -40]} b={[-38, -4]} bend={8} w={9} c={limb} />{hand(-38, -4)}
      {R(k + "arm") > 0.86 ? <><Limb a={[26, -48]} b={[44 + sway * 6, -96]} bend={-10} w={9} c={limb} />{hand(44 + sway * 6, -96)}</> : <><Limb a={[26, -40]} b={[38, -4]} bend={-8} w={9} c={limb} />{hand(38, -4)}</>}
    </>;
  } else if (pose === "hang") {
    const o = lean + sway * 5;
    el = <>
      <Limb a={[-6, -32]} b={[-4, 0]} w={10} c={pants} />
      <g transform={`rotate(${o} 0 0)`}>
        <Limb a={[8, -32]} b={[30 + sway * 8, -6 + sway * 4]} bend={-8} w={10} c={pants} />
        {body(-74)}
        <Limb a={[-22, -96]} b={[-30, -150]} bend={-6} w={9} c={limb} />{hand(-30, -150)}
        <Limb a={[24, -82]} b={[56 + sway * 10, -96 + sway * 10]} bend={-10} w={9} c={limb} />{hand(56 + sway * 10, -96 + sway * 10)}
      </g>
    </>;
  } else if (pose === "seat") {
    el = <>{body(-38, 28, 40)}</>;
  } else {
    const walk = pose === "walk", step = walk ? Math.sin(t * 8 + ph) * 12 : 0, bob = walk ? -Math.abs(Math.sin(t * 8 + ph)) * 4 : 0;
    el = <>
      <ellipse cx={0} cy={3} rx={34} ry={6} fill="#000" opacity={0.16} />
      <Limb a={[-11, -32]} b={[-12 + step, -2]} w={10} c={pants} /><Limb a={[11, -32]} b={[12 - step, -2]} w={10} c={pants} />
      <g transform={`translate(0 ${bob})`}>
        {body(-72)}
        <Limb a={[-26, -66]} b={[-36 - step * 0.4, -34]} bend={8} w={9} c={limb} />{hand(-36 - step * 0.4, -34)}
        {pose === "wave" ? <><Limb a={[26, -78]} b={[44 + sway * 10, -128]} bend={-10} w={9} c={limb} />{hand(44 + sway * 10, -128)}</> : <><Limb a={[26, -66]} b={[36 + step * 0.4, -34]} bend={-8} w={9} c={limb} />{hand(36 + step * 0.4, -34)}</>}
      </g>
    </>;
  }
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>{el}</g>;
};

/* ------------------------------------------------------------------ */
export type Livery = { body: string; roof: string; band: string; band2: string; window: string; door: string };
/** Livery KRL (merah-kuning) dan kereta ekonomi lama (krem-oranye, pudar). */
export const KRL: Livery = { body: "#ece5d3", roof: "#b9b4a6", band: "#d83c33", band2: "#f2b632", window: "#2b3550", door: "#d9d2bf" };
export const EKONOMI: Livery = { body: "#d9cfb4", roof: "#8f8a7c", band: "#cf6f3e", band2: "#5b8a5a", window: "#3a3540", door: "#cbbf9f" };
export const TOEI: Livery = { body: "#e4e8ea", roof: "#aab3b8", band: "#2166b0", band2: "#2166b0", window: "#2b3550", door: "#d5dbde" };

export const CAR_W = 860, CAR_H = 300;
export const DOORS = [150, 430, 710];
export const WINDOWS: [number, number][] = [[24, 70], [228, 82], [324, 70], [508, 82], [604, 70], [790, 50]];

/** Roda tampak samping. rot = derajat putaran. */
export const Roda: React.FC<{ x: number; y: number; r?: number; rot: number }> = ({ x, y, r = 32, rot }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle r={r} fill="#2a2b31" /><circle r={r * 0.5} fill="#6d717c" />
    <rect x={-r * 0.12} y={-r * 0.85} width={r * 0.24} height={r * 1.7} rx={3} fill="#8d8f99" />
    <circle cx={-r * 0.3} cy={-r * 0.32} r={r * 0.16} fill="#fff" opacity={0.18} />
  </g>
);

/**
 * GERBONG tampak samping (datar R3). Titik asal = sudut kiri atas badan; lebar 860, tinggi 300.
 * windows/doors: isi jendela dan pintu (penumpang). head = kabin masinis di kiri. dirt 0..1 = kotor/karat. dim = pudar.
 */
export const Gerbong: React.FC<{
  x: number; y: number; lv: Livery; rot?: number; head?: boolean; open?: boolean; lit?: boolean; dirt?: number; dim?: number; seed?: string;
  windows?: (i: number, wx: number, wy: number, ww: number, wh: number) => React.ReactNode; doors?: (i: number, dx: number) => React.ReactNode;
}> = ({ x, y, lv, rot = 0, head, open, lit = true, dirt = 0, dim = 0, seed = "g", windows, doors }) => {
  const id = uid();
  const f = (c: string) => (dim > 0 ? fade(c, dim * 0.6) : c);
  const body = f(lv.body), win = lit ? f(lv.window) : shade(f(lv.window), 0.3);
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* bogie dan roda */}
      {[60, 580].map((bx) => <rect key={bx} x={bx} y={CAR_H - 10} width={220} height={36} rx={12} fill="#3b3d46" />)}
      {[108, 232, 628, 752].map((wx) => <Roda key={wx} x={wx} y={CAR_H + 34} rot={rot} />)}
      {/* atap */}
      <rect x={10} y={-26} width={CAR_W - 20} height={40} rx={18} fill={f(lv.roof)} />
      <rect x={30} y={-22} width={CAR_W - 60} height={8} rx={4} fill="#fff" opacity={0.18} />
      {/* badan */}
      <clipPath id={`gb${id}`}><rect x={0} y={0} width={CAR_W} height={CAR_H} rx={22} /></clipPath>
      <rect x={0} y={0} width={CAR_W} height={CAR_H} rx={22} fill={body} />
      <g clipPath={`url(#gb${id})`}>
        <rect x={0} y={232} width={CAR_W} height={70} fill={shade(body, 0.14)} />
        <rect x={0} y={182} width={CAR_W} height={24} fill={f(lv.band)} /><rect x={0} y={208} width={CAR_W} height={10} fill={f(lv.band2)} />
        <rect x={16} y={12} width={CAR_W - 32} height={8} rx={4} fill="#fff" opacity={0.25} />
        {dirt > 0 && <g opacity={dirt}>
          {Array.from({ length: 46 }, (_, i) => <ellipse key={i} cx={R(seed + "dx" + i) * CAR_W} cy={190 + R(seed + "dy" + i) * 110} rx={6 + R(seed + "dr" + i) * 22} ry={4 + R(seed + "dq" + i) * 8} fill="#7a5a36" opacity={0.35} />)}
          {Array.from({ length: 12 }, (_, i) => <rect key={"s" + i} x={R(seed + "sx" + i) * CAR_W} y={0} width={6} height={40 + R(seed + "sh" + i) * 110} fill="#7a5a36" opacity={0.25} />)}
        </g>}
      </g>
      {WINDOWS.map(([wx, ww], i) => (
        <g key={i}>
          <clipPath id={`gw${id}${i}`}><rect x={wx} y={58} width={ww} height={104} rx={12} /></clipPath>
          <rect x={wx} y={58} width={ww} height={104} rx={12} fill={win} />
          <g clipPath={`url(#gw${id}${i})`}>{windows?.(i, wx, 58, ww, 104)}<path d={`M${wx - 10} 150 L${wx + ww * 0.6} 40`} stroke="#fff" strokeWidth={14} opacity={0.12} /></g>
        </g>
      ))}
      {DOORS.map((cx, i) => (
        <g key={cx}>
          {open ? <>
            <clipPath id={`gd${id}${i}`}><rect x={cx - 60} y={40} width={120} height={256} rx={8} /></clipPath>
            <rect x={cx - 60} y={40} width={120} height={256} rx={8} fill={shade(f(lv.window), 0.25)} />
            <g clipPath={`url(#gd${id}${i})`}>{doors?.(i, cx)}</g>
          </> : <>
            <rect x={cx - 60} y={40} width={120} height={256} rx={8} fill={f(lv.door)} />
            <rect x={cx - 1.5} y={40} width={3} height={256} fill={shade(f(lv.door), 0.3)} />
            {[-44, 12].map((dx) => <rect key={dx} x={cx + dx} y={62} width={32} height={92} rx={8} fill={win} />)}
          </>}
        </g>
      ))}
      {head && <g>
        <path d={`M8 0 H-40 Q-76 6 -86 72 L-92 ${CAR_H - 16} Q-92 ${CAR_H} -74 ${CAR_H} H8 Z`} fill={shade(body, 0.06)} />
        <path d="M-68 52 L-14 46 V150 L-76 152 Z" fill={win} />
        <path d="M-86 186 L8 182 V206 L-88 210 Z" fill={f(lv.band)} />
        <circle cx={-64} cy={252} r={14} fill={lit ? "#fff3a8" : "#77756a"} />
      </g>}
    </g>
  );
};

/** Rel dan bantalan. off = geser (piksel) supaya terlihat bergerak. */
export const Rel: React.FC<{ y: number; off?: number; bed?: string; x0?: number; x1?: number }> = ({ y, off = 0, bed = "#8c8377", x0 = -1200, x1 = 3100 }) => {
  const span = x1 - x0;
  return (
    <g>
      <rect x={x0} y={y - 12} width={span} height={80} fill={bed} />
      <rect x={x0} y={y + 48} width={span} height={20} fill={shade(bed, 0.15)} />
      {Array.from({ length: Math.ceil(span / 70) }, (_, i) => { const x = x0 + ((((i * 70 + off) % span) + span) % span); return <rect key={i} x={x} y={y - 4} width={22} height={58} rx={3} fill="#5b4636" />; })}
      {[y, y + 36].map((yy) => <rect key={yy} x={x0} y={yy - 4} width={span} height={10} rx={3} fill="#b8bcc4" />)}
    </g>
  );
};
/** Kabel listrik aliran atas dan tiangnya. */
export const Kabel: React.FC<{ y: number; base: number; off?: number; color?: string; x0?: number; x1?: number; gap?: number }> = ({ y, base, off = 0, color = "#3b3d46", x0 = -1200, x1 = 3100, gap = 640 }) => {
  const span = x1 - x0;
  return (
    <g>
      <rect x={x0} y={y - 3} width={span} height={6} fill={color} />
      <rect x={x0} y={y - 58} width={span} height={3} fill={color} opacity={0.7} />
      {Array.from({ length: Math.ceil(span / gap) + 1 }, (_, i) => { const x = x0 + ((((i * gap + off) % span) + span) % span); return <g key={i}><rect x={x - 8} y={y - 90} width={16} height={base - y + 90} fill="#6d737d" /><rect x={x} y={y - 74} width={120} height={8} fill={color} /><rect x={x + 116} y={y - 74} width={5} height={74} fill={color} /></g>; })}
    </g>
  );
};
/** Pantograf dari atap (y) sampai kabel (wireY). */
export const Pantograf: React.FC<{ x: number; y: number; wireY: number; color?: string }> = ({ x, y, wireY, color = "#3b3d46" }) => {
  const mid = wireY + (y - wireY) * 0.5;
  return (
    <g stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x - 60} ${y} L${x + 18} ${mid} L${x - 8} ${wireY + 8}`} strokeWidth={9} />
      <path d={`M${x + 60} ${y} L${x - 18} ${mid} L${x + 8} ${wireY + 8}`} strokeWidth={9} opacity={0.75} />
      <path d={`M${x - 52} ${wireY + 8} H${x + 52}`} strokeWidth={10} />
      <rect x={x - 80} y={y - 8} width={160} height={14} rx={7} fill={color} stroke="none" />
    </g>
  );
};
/** Matahari datar dengan sinar berputar pelan. */
export const Matahari: React.FC<{ x: number; y: number; r?: number; t: number; color?: string }> = ({ x, y, r = 90, t, color = "#ffd94d" }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r * 2.2} fill={color} opacity={0.12} /><circle r={r * 1.5} fill={color} opacity={0.18} />
    <g transform={`rotate(${t * 10})`}>{Array.from({ length: 12 }, (_, i) => <rect key={i} x={-7} y={-r * 1.62} width={14} height={r * 0.36} rx={7} fill={color} transform={`rotate(${i * 30})`} />)}</g>
    <circle r={r} fill={color} /><circle cx={-r * 0.32} cy={-r * 0.34} r={r * 0.28} fill="#fff" opacity={0.25} />
  </g>
);
export const Awan: React.FC<{ x: number; y: number; s?: number; fill?: string; o?: number }> = ({ x, y, s = 1, fill = "#fff", o = 0.85 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={20} rx={110} ry={30} fill={fill} /><circle cx={-40} cy={6} r={40} fill={fill} /><circle cx={16} cy={-6} r={52} fill={fill} /><circle cx={62} cy={12} r={34} fill={fill} />
  </g>
);
/** Deretan gedung jauh (datar, jendela redup). */
export const Gedung: React.FC<{ base: number; seed: string; fill: string; win?: string; n?: number; h?: [number, number]; x0?: number; x1?: number }> = ({ base, seed, fill, win = "#fff", n = 24, h = [90, 320], x0 = -500, x1 = 2400 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const w = 80 + R(seed + "w" + i) * 90, hh = mix(h[0], h[1], R(seed + "h" + i)), x = x0 + (i * (x1 - x0)) / n;
      return (<g key={i}>
        <rect x={x} y={base - hh} width={w} height={hh + 80} fill={fill} />
        <rect x={x + w * 0.74} y={base - hh} width={w * 0.26} height={hh + 80} fill={shade(fill, 0.12)} />
        {Array.from({ length: Math.floor(hh / 40) }, (_, r) => [0, 1].map((c) => R(`${seed}${i}-${r}-${c}`) > 0.4 ? <rect key={`${r}-${c}`} x={x + 12 + c * (w * 0.36)} y={base - hh + 18 + r * 40} width={w * 0.24} height={14} rx={3} fill={win} opacity={0.4} /> : null))}
      </g>);
    })}
  </g>
);
/** Pohon kelapa datar; bergoyang pelan. */
export const Kelapa: React.FC<{ x: number; y: number; s?: number; t: number; dim?: number }> = ({ x, y, s = 1, t, dim = 0 }) => {
  const f = (c: string) => (dim > 0 ? fade(c, dim) : c);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-9 0 C-4 -80 6 -150 26 -215 L40 -210 C22 -140 14 -70 14 0 Z" fill={f("#8a6244")} />
      <g transform={`translate(33 -214) rotate(${Math.sin(t * 1.8 + x) * 4})`}>
        {[-170, -130, -85, -45, -5, 25].map((a, i) => <path key={a} transform={`rotate(${a})`} d="M0 0 C40 -30 95 -22 128 14 C85 2 40 10 0 0 Z" fill={f(i % 2 ? "#3f8f5a" : "#4fa566")} />)}
      </g>
    </g>
  );
};
