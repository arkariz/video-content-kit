// P01b benchmark s01 (Fase 3.5): tetes hujan di atas kota senja, digambar ulang dengan standar STYLE.md 1-5
// (rendering datar bertingkat, hierarki L1-L3, material, cahaya, lingkungan dirancang). Spesifikasi: 03-visual.json versi 2.
import React from "react";
import { Easing } from "remotion";
import { Frame, Layer, clamp, defineShots, mix, seg, shot, useShot } from "@r3";
import { Lamp, TEAL, Tree, VIOLET, Block, Cloud, Drop2, Elevated, FarCity, Gables, MistBand, Office, RainLayer, RoofCorner, Sky, WaterTower } from "@r3/art";
import { TearGhost2 } from "./parts/ghost";

const tw = (x: number, fb: number) => (Number.isFinite(x) ? x : fb);

const FallShot: React.FC = () => {
  const { t, word, vertical, dur } = useShot();
  const tTear = tw(word("teardrops"), 1.05), tFlat = tw(word("flatten"), 2.5);
  const D = Math.max(dur, 4.2);

  // tetes: bulat saat masuk, memipih di "flatten" dengan overshoot dan goyang teredam (volume dijaga)
  const enter = seg(t, 0, 0.9, Easing.out(Easing.cubic));
  const flatP = seg(t, tFlat - 0.05, tFlat + 0.5, Easing.out(Easing.back(1.4)));
  const wob = t > tFlat ? Math.exp(-(t - tFlat - 0.3) * 3.2) * Math.sin((t - tFlat) * 12) * 0.06 * clamp((t - tFlat) / 0.3) : 0;
  const sx = 1 + wob, sy = 1 / (1 + wob);
  const lean = Math.sin(t * 1.3) * 0.015;
  const hover = Math.sin(t * 2.2) * 6;

  // kamera: dolly masuk 8%, tilt turun di akhir memperlihatkan atap dan talang (reveal)
  const reveal = seg(t, tFlat + 0.7, D + 0.6, Easing.inOut(Easing.sin));
  const cam = { x: 960 + Math.sin(t * 0.37) * 8, y: mix(540, 590, reveal) + Math.cos(t * 0.29) * 5, z: mix(1.0, 1.08, seg(t, 0, D + 0.6, Easing.inOut(Easing.sin))) };
  const fall = t * 34; // dunia naik pelan: tetes jatuh

  const hx = vertical ? 760 : 720, hy = (vertical ? 500 : 455) + mix(-160, 0, enter) + hover, R0 = vertical ? 165 : 205;
  const cityShift = vertical ? -390 : 0, cityDrop = vertical ? 230 : 0;

  // miskonsepsi
  const ghostIn = seg(t, tTear - 0.05, tTear + 0.3, Easing.out(Easing.back(1.6)));
  const ghostOut = 1 - seg(t, tFlat - 0.25, tFlat + 0.1, Easing.in(Easing.cubic));
  const ghostP = ghostIn * ghostOut, crossP = seg(t, tTear + 0.3, tTear + 0.6, Easing.out(Easing.cubic));
  const air = seg(t, tFlat - 0.2, tFlat + 0.3) * (1 - 0.5 * seg(t, tFlat + 1.2, tFlat + 2));

  return (
    <Frame vignette={0.45}>
      <Layer cam={cam} d={0}><Sky t={t} /></Layer>
      <Layer cam={cam} d={0.08}>
        <g transform={`translate(${cityShift * 0.3} ${-fall * 0.15})`}>
          <Cloud x={110} y={300} s={120} seed={3} base="#4a3486" lit="#f2a07c" shadow="#3a2a76" op={0.95} />
          <Cloud x={1250} y={150} s={120} seed={7} op={0.85} />
          <Cloud x={1700} y={560} s={210} seed={11} base="#6a3a86" lit="#ffb07a" shadow="#4c2f7a" />
          <Cloud x={700} y={640} s={140} seed={5} base="#5a3784" lit="#f59a72" shadow="#45307a" op={0.9} />
          <Cloud x={760} y={610} s={230} seed={17} base="#8a4a8e" lit="#ffc48a" shadow="#6a3a86" />
          <Cloud x={1250} y={520} s={150} seed={19} base="#7a4290" lit="#ffb884" shadow="#5c3684" />
        </g>
      </Layer>
      <Layer cam={cam} d={0.2}>
        <g transform={`translate(${cityShift * 0.5} ${cityDrop * 0.6 - fall * 0.3})`}>
          <FarCity x0={-500} x1={2500} base={760} seed={44} fill="#6a4a96" hi="#f0a08a" t={t} lights={0.03} gap={[960, 1150]} />
          <FarCity x0={-500} x1={2500} base={820} seed={21} fill="#4c3a86" hi="#e0868a" t={t} gap={[930, 1180]} />
        </g>
        <MistBand y={640 + cityDrop * 0.6 - fall * 0.3} h={260} color="#b0609a" op={0.5} />
      </Layer>
      <Layer cam={cam} d={0.35}>
        <g transform={`translate(${cityShift * 0.7} ${cityDrop * 0.8 - fall * 0.45})`}>
          <Elevated x0={-400} x1={2400} y={800} t={t} fill="#3a2c74" hi="#f08f7a" />
        </g>
      </Layer>
      <Layer cam={cam} d={0.6}>
        <g transform={`translate(${cityShift} ${cityDrop - fall * 0.7})`}>
          <g transform="translate(0 -110)">
          <Gables x={-80} base={1150} n={3} w={170} h={190} seed={4} t={t} />
          <Block x={470} base={1190} w={250} h={320} side={40} seed={8} t={t} top="dome" tones={VIOLET} />
          <Gables x={880} base={1215} n={2} w={170} h={160} seed={12} t={t} />
          <Tree x={790} base={1060} s={1.1} seed={3} t={t} />
          <Tree x={845} base={1080} s={0.8} seed={8} t={t} />
          <Tree x={430} base={880} s={0.6} seed={13} t={t} />
          <Tree x={1215} base={1050} s={1.0} seed={21} t={t} />
          <Lamp x={760} base={1100} s={1} t={t} />
          <Lamp x={1180} base={1110} s={1} t={t + 1} />
          </g>
          <Block x={1700} base={1230} w={290} h={720} side={50} seed={9} t={t} top="step" on={0.35} tones={TEAL} />
          <Block x={1300} base={1215} w={300} h={590} side={56} seed={2} t={t} />
          <WaterTower x={1440} base={606} s={1.05} t={t} />
        </g>
        <MistBand y={930 + cityDrop - fall * 0.7} h={260} color="#6a3a86" op={0.45} />
      </Layer>
      <RainLayer t={t} n={70} seed={1} len={[22, 40]} w={2.5} color="#b9d8ff" op={0.35} speed={500} />
      <RainLayer t={t} n={26} seed={2} len={[60, 110]} w={5} color="#d8ecff" op={0.3} speed={1100} />
      <rect x={-200} y={-200} width={2400} height={1500} fill="url(#warmwash)" />
      <defs><radialGradient id="warmwash" gradientUnits="userSpaceOnUse" cx={1050} cy={720} r={900}><stop offset={0} stopColor="#ff9a6a" stopOpacity={0.22} /><stop offset={1} stopColor="#ff9a6a" stopOpacity={0} /></radialGradient></defs>
      <Layer cam={cam} d={1}>
        {/* tekanan udara di bawah dasar tetes (penyederhanaan, C02) */}
        {air > 0 && [-0.55, 0.55].map((s, i) => {
          const base = hy + R0 * 0.62, ox = s * R0, side = Math.sign(s);
          const d = `M${hx + ox * 0.8} ${base + R0 * 0.95}C${hx + ox * 0.8} ${base + R0 * 0.35} ${hx + ox * 0.95} ${base + R0 * 0.12} ${hx + ox * 1.25 + side * R0 * 0.25} ${base - R0 * 0.05}S${hx + side * R0 * 1.55} ${base - R0 * 0.45} ${hx + side * R0 * 1.6} ${base - R0 * 0.85}`;
          return <path key={i} d={d} stroke="#d8f6ff" strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray={`${R0 * 0.38} ${R0 * 0.22}`} strokeDashoffset={t * R0 * 1.1 + i * 30} opacity={air * 0.6} />;
        })}
        <Drop2 x={hx} y={hy} r={R0} flat={flatP} sx={sx} sy={sy} t={t} lean={lean} />
        <TearGhost2 x={hx} y={hy} r={R0} p={ghostP} />
        {crossP > 0 && ghostOut > 0 && (
          <g opacity={ghostOut} transform={`rotate(-34 ${hx} ${hy - R0 * 0.25})`}>
            <rect x={hx - R0 * 1.3 * crossP} y={hy - R0 * 0.25 - 13} width={R0 * 2.6 * crossP} height={26} rx={13} fill="#ff5a6e" />
            <rect x={hx - R0 * 1.3 * crossP + 10} y={hy - R0 * 0.25 - 8} width={Math.max(0, R0 * 2.6 * crossP - 20)} height={5} rx={2.5} fill="#ffb3c0" opacity={0.8} />
          </g>
        )}
        {/* tetes kecil (L2): tetap bulat */}
        <Drop2 x={vertical ? 980 : 1190} y={(vertical ? 660 : 400) + Math.sin(t * 2.6 + 1) * 8 - fall * 0.2} r={vertical ? 52 : 62} flat={0} t={t + 3} refl={0} />
      </Layer>
      <Layer cam={cam} d={1.5}>
        <g transform={`translate(${vertical ? 380 : 0} ${(vertical ? 120 : 0) - fall * 0.9})`}><RoofCorner x={-60} y={975} t={t} /></g>
      </Layer>
    </Frame>
  );
};

export default defineShots({
  s01: [shot(FallShot, { labels: { "NOT A TEARDROP": [560, 80, "none"], "FLATTENS": [560, 170, "none"] }, labelBg: ["#d8466a", "#1484c2"], drift: false, focus: 760 })],
});
