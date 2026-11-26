// Contoh komponen adegan R3: T02-001 s06 ditulis ulang dengan `shots` (lihat 03-script.json di folder ini).
// "They were the first air-conditioned electric trains in Indonesia. At the time, crowded riders hung out of open doors or sat on the roof."
// Waktu: t = detik sejak shot mulai; kata dibaca lewat useShot().word(...), label lewat useLabel(...). Tanpa angka detik yang ditulis tangan.
import React from "react";
import { Easing } from "remotion";
import {
  Backdrop, Blur, Frame, Glow, GlowEdge, Layer, Particles, Pill, Sparks, cast, defineShots, fade, keys, lerpColor, mix, seg, shot, useLabel, useShot,
} from "@r3";

const { Komo, Warga, Gerbong, Rel, Kabel, Pantograf, Matahari, Awan, Gedung, Kelapa, EKONOMI, DOORS } = cast.T02;

/* ---------------- shot 1: gerbong ber-AC pertama (inside, push) ---------------- */
const WIRE = 176, ROOF = 300, FLOOR = 800;
const AcShot: React.FC = () => {
  const { t, word, faces } = useShot();
  const tAc = word("air-conditioned"), tEl = word("electric");
  const cold = seg(t, tAc, tAc + 0.9);
  const lit = seg(t, tEl, tEl + 0.25) * (1 - 0.6 * seg(t, tEl + 0.7, tEl + 1.4));
  const cam = { x: mix(990, 950, seg(t, 0, 4, Easing.inOut(Easing.sin))), y: 545, z: mix(1.02, 1.08, seg(t, 0, 4)) };
  const run = t * 520; // pemandangan luar bergeser: kereta melaju
  const inside = lerpColor("#f4c98c", "#bfe6f7", cold);
  return (
    <Frame>
      <Layer cam={cam} d={0}><Backdrop stops={["#f08a3c", "#f9c46b", "#fde6b4"]} t={t} /></Layer>
      <Layer cam={cam} d={0.2}><Matahari x={1720} y={120} r={74} t={t} /><Awan x={300 - t * 8} y={120} s={1.1} o={0.5} /></Layer>
      <Layer cam={cam} d={0.35} blur={3}>
        <g transform={`translate(${-((run * 0.12) % 300)} 0)`}><Gedung base={870} seed="ac" fill="#e9b37a" win="#fff6dc" h={[80, 260]} x0={-600} x1={2700} n={30} /></g>
      </Layer>
      <Layer cam={cam} d={0.6} blur={3}>
        {Array.from({ length: 9 }, (_, i) => { const x = ((((i * 340 - run * 0.45) % 3060) + 3060) % 3060) - 560; return <Kelapa key={i} x={x} y={890} s={1.05} t={t} />; })}
      </Layer>
      <Layer cam={cam} d={1}>
        <rect x={-800} y={860} width={3520} height={500} fill="#d9a86a" />
        <Rel y={912} off={-run} bed="#a88f6c" />
        <Kabel y={WIRE} base={880} off={-run} />
        {/* udara bergetar di luar */}
        {Array.from({ length: 10 }, (_, i) => { const x = [60, 110, 1820, 1870, 400, 700, 1000, 1300, 1600, 1750][i], p = (t * 0.6 + i * 0.13) % 1; return <path key={i} d={`M${x} ${290 - p * 140} q12 -14 0 -28 q-12 -14 0 -28`} stroke="#fff6dc" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5 * Math.sin(p * Math.PI)} />; })}
        {/* pantograf menyentuh kabel; percikan dan aliran listrik di kata "electric" */}
        <Pantograf x={540} y={ROOF} wireY={WIRE} />
        <GlowEdge d={`M-800 ${WIRE} H520`} color="#fff27a" p={lit} w={7} t={t} />
        <Glow x={512} y={WIRE + 4} r={120} color="#fff27a" p={lit} t={t} />
        <Sparks t={t} x={512} y={WIRE + 6} rate={9} spread={26} size={70} from={tEl} seed={3} />
        {/* gerbong terpotong */}
        <rect x={130} y={ROOF} width={1660} height={560} rx={60} fill="#e4e8ea" />
        <rect x={130} y={ROOF + 470} width={1660} height={90} rx={30} fill="#cdd3d6" />
        <rect x={130} y={812} width={1660} height={22} fill="#2166b0" />
        <rect x={180} y={360} width={1560} height={FLOOR - 360} rx={30} fill={inside} />
        <rect x={180} y={360} width={1560} height={70} rx={30} fill="#fff" opacity={0.12} />
        {[320, 610, 900, 1190, 1480].map((x) => <g key={x}><rect x={x} y={420} width={220} height={150} rx={22} fill="#f6b25c" /><rect x={x} y={420} width={220} height={150} rx={22} fill="#7fd3f5" opacity={cold * 0.25} /><path d={`M${x + 20} 552 L${x + 110} 432`} stroke="#fff" strokeWidth={16} opacity={0.22} strokeLinecap="round" /></g>)}
        {/* gantungan tangan */}
        <rect x={210} y={396} width={1500} height={8} rx={4} fill="#9aa3aa" />
        {Array.from({ length: 13 }, (_, i) => { const x = 260 + i * 115, sw = Math.sin(t * 2.2 + i) * 4; return <g key={i} transform={`rotate(${sw} ${x} 400)`}><rect x={x - 3} y={400} width={6} height={34} fill="#9aa3aa" /><circle cx={x} cy={446} r={12} fill="none" stroke="#9aa3aa" strokeWidth={6} /></g>; })}
        {/* bangku dan penumpang duduk */}
        <rect x={220} y={608} width={1480} height={96} rx={20} fill="#2c8c86" />
        {[310, 450, 760, 1030, 1340, 1480, 1620].map((x, i) => <Warga key={i} x={x} y={712} s={1.3} t={t} seed={"acs" + i} pose="seat" hot={1 - cold} expr={cold > 0.6 ? "happy" : "tired"} />)}
        <rect x={210} y={700} width={1500} height={46} rx={16} fill="#3aa39c" /><rect x={210} y={732} width={1500} height={14} rx={7} fill="#24756f" />
        {/* penumpang berdiri dan Komo */}
        <Warga x={620} y={FLOOR} s={1.3} t={t} seed="acw1" pose="wave" hot={1 - cold} expr={cold > 0.6 ? "happy" : "tired"} />
        <Warga x={1220} y={FLOOR} s={1.3} t={t} seed="acw2" pose="stand" hot={1 - cold} expr={cold > 0.6 ? "happy" : "tired"} flip />
        <Komo x={930} y={FLOOR} s={0.78} t={t} expr={cold > 0.55 ? ((faces.komo as "happy") ?? "happy") : "tired"} look={cold > 0.55 ? 0 : -1} />
        <rect x={180} y={FLOOR - 4} width={1560} height={14} fill="#9aa3aa" />
        {/* unit AC di atap: menyala lalu meniupkan udara dingin */}
        {[900, 1300].map((x) => <g key={x}>
          <Glow x={x} y={280} r={190} color="#8fe0ff" p={cold * 0.8} t={t} />
          <rect x={x - 150} y={250} width={300} height={62} rx={20} fill="#b9c4cc" /><rect x={x - 150} y={288} width={300} height={24} rx={10} fill="#9fabb4" />
          {Array.from({ length: 8 }, (_, i) => <rect key={i} x={x - 120 + i * 32} y={262} width={9} height={30} rx={4} fill="#7d8992" />)}
          <rect x={x - 150} y={250} width={300} height={62} rx={20} fill="#8fe0ff" opacity={cold * 0.35} />
        </g>)}
        {cold > 0 && [520, 900, 1300, 1600].flatMap((x, k) => [0, 1, 2].map((j) => {
          const p = (t * 0.75 + j / 3 + k * 0.21) % 1;
          return <path key={`${k}${j}`} d={`M${x + (j - 1) * 70} ${372 + p * 250} q-30 30 0 60 q30 30 0 60`} stroke="#3fb3ef" strokeWidth={10} fill="none" strokeLinecap="round" opacity={cold * Math.sin(p * Math.PI) * 0.9} />;
        }))}
        {cold > 0 && <Particles t={t} colors={["#ffffff", "#bfeaff"]} n={34} speed={-2.4} area={[200, 380, 1720, 790]} size={[4, 9]} opacity={cold * 0.9} seed={7} />}
        {/* bogie dan roda */}
        {[445, 1475].map((x) => <rect key={x} x={x - 190} y={846} width={380} height={34} rx={14} fill="#3b3d46" />)}
        {[330, 560, 1360, 1590].map((x) => <g key={x} transform={`translate(${x} 872) rotate(${run * 0.9})`}><circle r={40} fill="#2a2b31" /><circle r={20} fill="#6d717c" /><rect x={-5} y={-34} width={10} height={68} fill="#8d8f99" /></g>)}
      </Layer>
    </Frame>
  );
};

/* ---------------- shot 2: kereta ekonomi penuh sesak (place, wipe) ---------------- */
const GAP = 900, TY = 520;
const RoofRow: React.FC<{ car: number; t: number; lean: number }> = ({ car, t, lean }) => (
  <g>
    {Array.from({ length: 11 }, (_, i) => <Warga key={"b" + i} x={car + 50 + i * 76 + ((i * 37) % 17)} y={TY - 6} s={0.82} t={t} seed={`rb${car}${i}`} pose="sit" dim={0.35} expr={i % 4 === 1 ? "shock" : "neutral"} />)}
    {Array.from({ length: 10 }, (_, i) => <Warga key={"f" + i} x={car + 30 + i * 86 + ((i * 53) % 21)} y={TY + 8} s={0.95} t={t + i * 0.3} seed={`rf${car}${i}`} pose={i === 4 && car === GAP ? "wave" : "sit"} dim={0.35} lean={lean} expr={i % 3 === 0 ? "happy" : "neutral"} />)}
  </g>
);
const CrowdShot: React.FC = () => {
  const { t, word, vertical } = useShot();
  const tHung = word("hung"), tSat = word("sat"), tRoof = word("roof"), tCrowd = word("crowded");
  const go = Math.max(0, t - 0.2), dist = 34 * go * go + 22 * go;
  const trainX = 260 - dist, rot = -(dist / 32) * 57.3;
  const lean = 6 + 16 * seg(t, 0.5, 2.6);
  const door = trainX + GAP + DOORS[1]; // pintu yang diikuti kamera
  const ks = [0, tCrowd, tHung, (tHung + tSat) / 2, tSat, tRoof, tRoof + 1.3];
  const cam = {
    x: keys(t, ks, [960, 1080, door, door, door - 40, door - 60, 900]),
    y: keys(t, ks, [560, 600, 700, 690, 520, 470, 540]),
    z: keys(t, ks, [0.84, 0.95, 1.42, 1.42, 1.36, 1.34, 0.94]),
  };
  const roofP = useLabel("ROOF RIDERS"), backP = useLabel("BACK THEN");
  const F = (c: string) => fade(c, 0.35);
  return (
    <Frame>
      <Layer cam={cam} d={0}><Backdrop stops={[F("#9cc9e0"), F("#f2d9a8")]} t={t} particles={["#fff3d6"]} n={18} speed={0.4} /></Layer>
      <Layer cam={cam} d={0.25}><Awan x={250 + t * 20} y={140} s={1.3} o={0.7} /><Awan x={1350 + t * 12} y={90} o={0.6} /><Gedung base={700} seed="cr" fill={F("#c9b9a3")} win="#fff6dc" h={[60, 260]} /></Layer>
      <Layer cam={cam} d={0.6} blur={3}>
        <rect x={-1200} y={690} width={4200} height={160} fill={F("#a7bf7c")} />
        {Array.from({ length: 14 }, (_, i) => <Kelapa key={i} x={-900 + i * 300 + dist * 0.25} y={770} s={0.9} t={t} dim={0.35} />)}
      </Layer>
      <Layer cam={cam} d={1}>
        <rect x={-1600} y={820} width={5200} height={700} fill={F("#b09d7d")} />
        <Kabel y={250} base={830} off={0} color="#4a4a52" x0={-1600} x1={3600} />
        <Rel y={890} bed={F("#9a8a70")} x0={-1600} x1={3600} />
        <ellipse cx={trainX + 1300} cy={900} rx={1500} ry={20} fill="#000" opacity={0.2} />
        <g transform={`translate(${trainX} ${Math.sin(t * 17) * 2.5 * seg(t, 0.3, 1)})`}>
          {[0, 1, 2].map((c) => <g key={c}>
            {c > 0 && <rect x={c * GAP - 44} y={TY + 40} width={48} height={230} fill="#3d3b42" />}
            <Gerbong x={c * GAP} y={TY} lv={EKONOMI} head={c === 0} open rot={rot} dirt={0.5} dim={0.35} seed={"e" + c} lit={false}
              windows={(i, wx, wy, ww) => <g><Warga x={wx + ww * 0.3} y={wy + 116} s={0.95} t={t} seed={`wa${c}${i}`} pose="seat" dim={0.4} /><Warga x={wx + ww * 0.78} y={wy + 124} s={0.85} t={t} seed={`wb${c}${i}`} pose="seat" dim={0.4} /></g>}
              doors={(i, dx) => <g><Warga x={dx - 10} y={210} s={0.85} t={t} seed={`in0${c}${i}`} dim={0.55} /><Warga x={dx + 38} y={200} s={0.8} t={t} seed={`in9${c}${i}`} dim={0.55} /><Warga x={dx - 30} y={286} s={1.05} t={t} seed={`in1${c}${i}`} dim={0.4} /><Warga x={dx + 30} y={292} s={1.1} t={t} seed={`in2${c}${i}`} dim={0.4} hot={1} /></g>} />
          </g>)}
          {[0, 1, 2].map((c) => <RoofRow key={c} car={c * GAP} t={t} lean={lean} />)}
          {[0, 1, 2].map((c) => DOORS.map((d, k) => <g key={`${c}${k}`}>
            <Warga x={c * GAP + d - 34} y={TY + 296} s={1.08} t={t} seed={`h1${c}${k}`} pose="hang" lean={-lean * 0.6} dim={0.35} flip />
            <Warga x={c * GAP + d + 40} y={TY + 296} s={1.12} t={t} seed={`h2${c}${k}`} pose="hang" lean={lean} dim={0.35} expr={(c + k) % 3 === 0 ? "shock" : "happy"} />
          </g>))}
          {/* debu dari roda saat mulai berjalan */}
          {go > 0 && Array.from({ length: 30 }, (_, i) => { const p = (go * 1.4 + (i * 0.137) % 1) % 1; const wx = [108, 232, 628, 752][i % 4] + GAP * (i % 3) + p * 160; return <circle key={i} cx={wx} cy={TY + 360 - p * 30} r={8 + p * 28} fill="#efe2c6" opacity={(1 - p) * 0.7 * seg(t, 0.2, 0.8)} />; })}
          <Pill x={GAP + 300} y={TY - 150} text="ROOF RIDERS" p={roofP} bg="#cf6f3e" size={40} />
        </g>
      </Layer>
      <Layer cam={cam} d={1.18}>
        <rect x={-1600} y={958} width={5200} height={26} fill="#e3c34e" />
        <rect x={-1600} y={984} width={5200} height={500} fill={F("#bcb5aa")} />
        <Blur b={6}>{[150, 520, 1420, 1760].map((x, i) => <Warga key={x} x={x - (i === 2 ? seg(t, 0.5, 4.6) * 300 : 0)} y={1140 + (i % 2) * 30} s={1.9} t={t} seed={"pf" + i} pose={i === 2 ? "walk" : i === 1 ? "wave" : "stand"} flip={i === 2} dim={0.4} />)}</Blur>
      </Layer>
      <Pill x={vertical ? 960 : 250} y={vertical ? 150 : 120} text="BACK THEN" p={backP} bg="#8a6a4a" ptr="none" size={44} />
    </Frame>
  );
};

export default defineShots({
  s06: [shot(AcShot, { labels: { "FIRST AC TRAIN": [1100, 236], "ELECTRIC": [560, 150] }, from: [1100, 520], focus: 960 }), shot(CrowdShot, { labels: "own" })],
});
