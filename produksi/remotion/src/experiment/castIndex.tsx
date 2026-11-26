// Entry eksperimen pemeran T02: lembar karakter (still) dan uji animasi (±19 detik, tanpa suara).
// npx remotion still src/experiment/castIndex.tsx LembarKarakter <out.png>
// npx remotion render src/experiment/castIndex.tsx UjiAnimasi <out.mp4>
import React from "react";
import { AbsoluteFill, Composition, Easing, interpolate, registerRoot, useCurrentFrame } from "remotion";
import { Aturan, Backdrop, Cicak, Expr, Komo, Pill, SANS, Sepuh } from "./cast";

const FPS = 30;
const seg = (t: number, a: number, b: number, e: (n: number) => number = Easing.inOut(Easing.cubic)) =>
  interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const pop = (t: number, a: number, d = 0.35) => seg(t, a, a + d, Easing.out(Easing.back(2.2)));
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>{children}</svg>;
const Cam: React.FC<{ z: number; x?: number; y?: number; children: React.ReactNode }> = ({ z, x = 960, y = 540, children }) => (
  <g transform={`translate(960 540) scale(${z}) translate(${-x} ${-y})`}>{children}</g>
);

/* ---------------- Uji animasi ---------------- */

/** A: perkenalan Komo dan Cicak (latar terang hangat) */
const ShotA: React.FC<{ t: number }> = ({ t }) => {
  const walkP = seg(t, 0.2, 2.6, Easing.out(Easing.quad));
  const walking = t > 0.2 && t < 2.5;
  const kx = mix(-160, 820, walkP);
  const cx = mix(2050, 1230, seg(t, 1.6, 3.6, Easing.out(Easing.quad)));
  const kExpr: Expr = t > 3.9 ? "happy" : "neutral";
  return (
    <Svg>
      <Backdrop id="a" top="#fff6dc" bottom="#f6dfae" glow="#ffffff" glowAt={[900, 560]} t={t} />
      <Cam z={mix(1, 1.07, seg(t, 0, 5.5, Easing.inOut(Easing.sin)))} x={mix(940, 980, seg(t, 0, 5.5))}>
        <ellipse cx={960} cy={812} rx={900} ry={40} fill="#ecd29a" opacity={0.6} />
        <Komo x={kx} y={800} t={t} pose={walking ? "walk" : t > 2.7 && t < 4.6 ? "wave" : "idle"} expr={kExpr} look={t > 3.6 ? 1 : 0} />
        <Cicak x={cx} y={800} s={1.3} t={t} crawl={t > 1.6 && t < 3.6} flip look={t > 3.7 ? -1 : 0} expr={t > 3.8 ? "happy" : "neutral"} />
        <Pill x={kx} y={520} text="KOMO" p={pop(t, 2.8)} bg="#2c8c86" />
        <Pill x={cx + 50} y={690} text="CICAK" p={pop(t, 3.7)} bg="#7f9a45" size={28} />
      </Cam>
    </Svg>
  );
};

/** B: Sepuh datang di peron senja */
const ShotB: React.FC<{ t: number }> = ({ t }) => {
  const arrive = seg(t, 0.1, 2.7, Easing.out(Easing.cubic));
  const sx = mix(2250, 1250, arrive);
  const settle = t > 2.7 ? Math.sin((t - 2.7) * 14) * Math.exp(-(t - 2.7) * 4) * 0.04 : 0;
  const kExpr: Expr = t < 1.4 ? "neutral" : t < 3.0 ? "shock" : "happy";
  return (
    <Svg>
      <Backdrop id="b" top="#f3a15f" bottom="#6d3f7a" glow="#ffd38a" glowAt={[1250, 640]} dots={["#ffd38a", "#ffffff", "#f6a66b"]} t={t} n={30} />
      <Cam z={mix(1.08, 1, seg(t, 0, 2.8))}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={-60 + i * 270} y={560 - ((i * 53) % 170)} width={190} height={400} fill="#4f2d5e" opacity={0.55} />)}
        <rect x={-300} y={800} width={2520} height={400} fill="#3c2349" />
        <rect x={-300} y={800} width={2520} height={16} fill="#f2c14e" />
        <g transform={`translate(${sx} 800) scale(1 ${1 - settle}) translate(${-sx} -800)`}>
          <Sepuh x={sx} y={800} s={1.1} t={t} roll={-arrive * 720} expr={t > 2.8 ? "tired" : "neutral"} sweat={t > 3.0} />
        </g>
        <Komo x={560} y={800} t={t} pose={t > 3.2 ? "wave" : "idle"} expr={kExpr} look={1} />
        <Pill x={sx} y={300} text="SEPUH" p={pop(t, 3.0)} bg="#d83c33" />
        <Pill x={sx + 230} y={420} text="34 YEARS OLD" p={pop(t, 3.6)} bg="#f2a23a" size={28} />
      </Cam>
    </Svg>
  );
};

/** C: Pak Aturan menstempel "TOO OLD" (latar gelap, glow) */
const ShotC: React.FC<{ t: number }> = ({ t }) => {
  const up = seg(t, 1.1, 1.8, Easing.out(Easing.cubic)) * (1 - seg(t, 2.05, 2.2, Easing.in(Easing.quad)));
  const slam = seg(t, 2.05, 2.2, Easing.in(Easing.quad)) * (1 - seg(t, 2.7, 3.2));
  const hit = 2.2;
  const shake = t > hit && t < hit + 0.35 ? Math.sin(t * 90) * 14 * (1 - (t - hit) / 0.35) : 0;
  const stamp = seg(t, hit, hit + 0.12);
  const dim = seg(t, hit + 0.2, hit + 1.2);
  return (
    <Svg>
      <Backdrop id="c" top="#1c1f4a" bottom="#3b1f5e" glow={t > hit ? "#ff5a4a" : "#6a7dff"} glowAt={[1050, 620]} dots={["#7f8cff", "#b07bff", "#ffffff"]} t={t} n={34} />
      <g transform={`translate(${shake} ${shake * 0.4})`}>
        <Cam z={mix(1, 1.1, seg(t, 0, 2.2, Easing.in(Easing.quad))) - seg(t, 2.4, 4.4) * 0.1} x={1000}>
          <rect x={-300} y={800} width={2520} height={400} fill="#191a3a" />
          <Komo x={430} y={800} t={t} pose={t > 3.0 ? "shrug" : "idle"} expr={t > hit ? "sad" : "neutral"} look={1} />
          <Sepuh x={820} y={800} s={1.05} t={t} expr={t > hit + 0.15 ? "sad" : "tired"} dim={dim} stamp={stamp} look={t < hit ? 1 : 0} />
          <g transform={`translate(1180 800) scale(${pop(t, 0.15, 0.45)}) translate(-1180 -800)`}>
            <Aturan x={1180} y={800} s={1.15} t={t} expr={t < hit ? "smug" : "neutral"} stampUp={up} slam={slam} look={1} flip />
          </g>
          <Pill x={1180} y={340} text="THE RULE" p={pop(t, 0.6)} bg="#26365c" />
          <Pill x={820} y={330} text="MAX 20 YEARS" p={pop(t, 3.0)} bg="#d8322b" size={30} />
        </Cam>
      </g>
      <rect x={0} y={0} width={1920} height={1080} fill="#fff" opacity={t > hit && t < hit + 0.12 ? 0.5 : 0} />
    </Svg>
  );
};

/** D: barisan pemeran */
const Lineup: React.FC<{ t: number; still?: boolean }> = ({ t, still }) => {
  const p = (a: number) => (still ? 1 : pop(t, a));
  return (
    <Svg>
      <Backdrop id="d" top="#12305c" bottom="#2a1a52" glow="#57b8ff" glowAt={[960, 650]} dots={["#57b8ff", "#ffffff", "#b07bff", "#ffd38a"]} t={t} n={50} />
      <rect x={-300} y={830} width={2520} height={400} fill="#132245" opacity={0.9} />
      <Komo x={360} y={830} t={t} pose={still ? "wave" : t > 0.6 ? "wave" : "idle"} expr="happy" look={1} />
      <Sepuh x={860} y={830} s={1.05} t={t} expr="smug" />
      <Aturan x={1330} y={830} s={1.1} t={t} expr="neutral" look={-1} />
      <Cicak x={1700} y={830} s={1.5} t={t} flip look={-1} />
      <Pill x={360} y={545} text="KOMO" p={p(0.2)} bg="#2c8c86" />
      <Pill x={860} y={370} text="SEPUH" p={p(0.4)} bg="#d83c33" />
      <Pill x={1330} y={380} text="PAK ATURAN" p={p(0.6)} bg="#26365c" />
      <Pill x={1720} y={720} text="CICAK" p={p(0.8)} bg="#7f9a45" />
    </Svg>
  );
};

const SHOTS = [{ el: ShotA, from: 0, len: 5.6 }, { el: ShotB, from: 5.6, len: 5.4 }, { el: ShotC, from: 11.0, len: 4.6 }, { el: Lineup, from: 15.6, len: 3.6 }];
const TOTAL = SHOTS.reduce((a, s) => a + s.len, 0);

const UjiAnimasi: React.FC = () => {
  const T = useCurrentFrame() / FPS;
  const i = SHOTS.findIndex((s) => T >= s.from && T < s.from + s.len);
  const cur = SHOTS[i < 0 ? SHOTS.length - 1 : i];
  const Cur = cur.el;
  const t = T - cur.from;
  // transisi iris (R3 4:16): shot lama mengecil ke dalam lingkaran di atas shot baru
  const prev = i > 0 ? SHOTS[i - 1] : null;
  const ir = prev ? seg(t, 0, 0.45, Easing.in(Easing.cubic)) : 1;
  const Prev = prev?.el;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Cur t={t} />
      {Prev && ir < 1 && (
        <AbsoluteFill style={{ clipPath: `circle(${mix(1200, 0, ir)}px at 50% 50%)`, transform: `scale(${mix(1, 0.55, ir)})` }}>
          <Prev t={prev!.len + t} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%" }} />
        </AbsoluteFill>
      )}
      {Prev && ir < 1 && ir > 0 && (
        <div style={{ position: "absolute", left: "50%", top: "50%", width: mix(2400, 0, ir) * mix(1, 0.55, ir), height: mix(2400, 0, ir) * mix(1, 0.55, ir), transform: "translate(-50%,-50%)", borderRadius: "50%", border: "10px solid #fff", boxSizing: "border-box" }} />
      )}
    </AbsoluteFill>
  );
};

/* ---------------- Lembar karakter ---------------- */
const EXPRS: Expr[] = ["neutral", "happy", "sad", "shock", "tired", "angry", "smug"];
const LembarKarakter: React.FC = () => (
  <AbsoluteFill>
    <Svg>
      <Backdrop id="sheet" top="#fff6dc" bottom="#f3dcb0" glow="#ffffff" t={0} />
      <text x={70} y={92} fontFamily={SANS} fontWeight={800} fontSize={46} fill="#2a1d26">Pemeran T02 · eksperimen gaya R3</text>
      <text x={70} y={136} fontFamily={SANS} fontWeight={500} fontSize={26} fill="#6b5a4a">badan satu bentuk · tangan selang karet · mata titik · satu aksesori · tanpa garis tinta</text>
      <rect x={0} y={690} width={1920} height={4} fill="#e6c98e" />
      <Komo x={250} y={640} t={0.9} pose="wave" expr="happy" look={1} />
      <Sepuh x={720} y={640} s={1.0} t={0.9} expr="tired" />
      <Aturan x={1180} y={640} s={1.05} t={0.9} expr="smug" stampUp={0.6} look={-1} />
      <Cicak x={1560} y={640} s={1.6} t={0.9} flip look={-1} />
      {[["KOMO", "penumpang, tokoh utama", 250, 250, "#2c8c86"], ["SEPUH", "kereta eks-Tokyo, 34–41 th", 720, 160, "#d83c33"], ["PAK ATURAN", "aturan dan pemerintah", 1180, 190, "#26365c"], ["CICAK", "pengamat, menempel di mana saja", 1600, 470, "#7f9a45"]].map(([n, d, x, y, c]) => (
        <g key={n as string}><Pill x={x as number} y={y as number} text={n as string} bg={c as string} size={30} /><text x={x as number} y={680} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={22} fill="#6b5a4a">{d}</text></g>
      ))}
      <text x={70} y={760} fontFamily={SANS} fontWeight={800} fontSize={30} fill="#2a1d26">Ekspresi Komo</text>
      {EXPRS.map((e, i) => (
        <g key={e}>
          <g transform={`translate(${170 + i * 255} 1010) scale(0.62) translate(0 0)`}><Komo x={0} y={0} t={0.9} expr={e} pose={e === "shock" ? "shrug" : e === "happy" ? "wave" : "idle"} /></g>
          <text x={170 + i * 255} y={1060} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={24} fill="#6b5a4a">{e}</text>
        </g>
      ))}
    </Svg>
  </AbsoluteFill>
);

registerRoot(() => (
  <>
    <Composition id="UjiAnimasi" component={UjiAnimasi} width={1920} height={1080} fps={FPS} durationInFrames={Math.round(TOTAL * FPS)} />
    <Composition id="LembarKarakter" component={LembarKarakter} width={1920} height={1080} fps={FPS} durationInFrames={1} />
  </>
));
