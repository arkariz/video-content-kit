// s06: "They were the first air-conditioned electric trains in Indonesia. At the time, crowded riders hung out of open doors or sat on the roof."
import React from "react";
import { Easing } from "remotion";
import { Car, CAR_W, Catenary, Cloud, DOORS, ECONOMY, Frame, FONT, House, INK, Label, Layer, Palm, Person, Rails, Skyline, Sky, mix, pick, pop, rnd, seg } from "./kit";

/** "They were the first air-conditioned electric trains in Indonesia." — potongan dalam gerbong: dingin di dalam, terik di luar, listrik dari kabel. */
export const AcShot: React.FC<{ t: number }> = ({ t }) => {
  const cold = seg(t, 0.8, 1.5);
  const zoom = seg(t, 0, 3.7, Easing.inOut(Easing.sin));
  const cam = { x: mix(980, 940, zoom), y: mix(560, 530, zoom), z: mix(1.1, 1.0, zoom) };
  const spark = t > 1.65;
  return (
    <Frame>
      <Layer cam={cam} d={0}><Sky id="a-sky" top="#f6b85a" bottom="#ffe6b0" /></Layer>
      <Layer cam={cam} d={0.35}>
        <g transform={`translate(1800 250) rotate(${t * 14})`}><circle r={86} fill="#ffdf4d" />{Array.from({ length: 12 }, (_, i) => <path key={i} d="M0 -112 V-150" transform={`rotate(${i * 30})`} stroke="#ffdf4d" strokeWidth={16} strokeLinecap="round" />)}</g>
        <Skyline base={760} seed="ac" fill="#e0b98c" h={[60, 240]} />
        {[120, 420, 1620, 1860].map((x) => <Palm key={x} x={x} y={800} s={1.2} t={t} />)}
      </Layer>
      <Layer cam={cam} d={1}>
        <rect x={-600} y={840} width={3120} height={500} fill="#d9bd8c" />
        <Rails y={918} off={t * 500} />
        {/* kabel listrik dan pantograf */}
        <path d="M-600 182 H2520" stroke={INK} strokeWidth={6} />
        <path d="M600 330 L690 255 L600 188 M540 186 H660" stroke={INK} strokeWidth={11} fill="none" strokeLinecap="round" />
        {spark && <g transform="translate(600 184)">
          {Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * 6.28 + Math.floor(t * 12); const r = 34 + rnd(`sp${i}${Math.floor(t * 14)}`) * 60; return <path key={i} d={`M0 0 L${Math.cos(a) * r * 0.5 + 8} ${Math.sin(a) * r * 0.5} L${Math.cos(a) * r} ${Math.sin(a) * r}`} stroke="#fff27a" strokeWidth={7} fill="none" strokeLinecap="round" />; })}
          <circle r={18} fill="#fff" />
        </g>}
        {/* badan gerbong terpotong */}
        <g>
          {[300, 1360].map((x) => <g key={x}><rect x={x - 20} y={840} width={300} height={44} rx={10} fill="#4a4a52" stroke={INK} strokeWidth={5} />{[x + 45, x + 215].map((w) => <g key={w} transform={`translate(${w} 896) rotate(${t * 500})`}><circle r={40} fill="#3a3a42" stroke={INK} strokeWidth={5} /><path d="M-22 0H22M0 -22V22" stroke="#8d8f99" strokeWidth={8} /></g>)}</g>)}
          <rect x={150} y={330} width={1620} height={515} rx={50} fill="#dfe5ea" stroke={INK} strokeWidth={7} />
          <rect x={200} y={385} width={1520} height={420} rx={24} fill="#fbf3df" stroke={INK} strokeWidth={5} />
          <rect x={200} y={385} width={1520} height={420} rx={24} fill="#8fd6f5" opacity={cold * 0.38} />
          <rect x={155} y={806} width={1610} height={20} fill="#2166b0" />
          {/* unit AC di atap */}
          {[820, 1260].map((x) => <g key={x}><rect x={x} y={272} width={300} height={62} rx={18} fill="#b9c4cc" stroke={INK} strokeWidth={6} />{Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${x + 36 + i * 32} 288 v30`} stroke={INK} strokeWidth={6} />)}</g>)}
          {[420, 700, 980, 1260, 1540].map((x) => <rect key={x} x={x - 80} y={452} width={160} height={150} rx={20} fill="#ffd98a" stroke={INK} strokeWidth={5} />)}
          <path d="M240 428 H1680" stroke="#8d8f99" strokeWidth={9} />
          {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${300 + i * 95} 428 v34 m-13 0 a13 15 0 1 0 26 0 a13 15 0 1 0 -26 0`} stroke="#8d8f99" strokeWidth={6} fill="none" />)}
          <rect x={240} y={720} width={1440} height={44} rx={14} fill="#2f8f6a" stroke={INK} strokeWidth={5} />
          {[330, 540, 750, 960, 1170, 1380, 1590].map((x, i) => <g key={x}>
            <path d={`M${x - 22} 730 L${x - 30} 800 M${x + 22} 730 L${x + 30} 800`} stroke="#37465b" strokeWidth={24} strokeLinecap="round" />
            <Person x={x} y={724} s={1.5} seed={"acp" + i} pose="bust" t={t} mood={cold > 0.5 ? "happy" : "hot"} />
          </g>)}
          {/* hembusan dingin */}
          {cold > 0 && [880, 970, 1060, 1320, 1410, 1500, 520, 430].map((x, k) => {
            const p = (t * 1.1 + rnd("br" + k)) % 1;
            return <path key={k} d={`M${x} ${400 + p * 190} q-34 34 0 68 q34 34 0 68`} stroke="#35a9e8" strokeWidth={11} fill="none" strokeLinecap="round" opacity={cold * (1 - p)} />;
          })}
          {cold > 0 && Array.from({ length: 22 }, (_, i) => { const p = (t * 0.5 + rnd("fl" + i)) % 1; return <text key={i} x={240 + rnd("fx" + i) * 1440 + Math.sin(t * 3 + i) * 14} y={400 + p * 330} fontSize={26 + rnd("fs" + i) * 24} fill="#2b93d6" opacity={cold * (1 - p)}>❄</text>; })}
        </g>
      </Layer>
      <Label x={400} y={118} text="FIRST AC TRAIN" size={60} p={pop(t, 0.7)} fill="#d7f1ff" />
      <Label x={950} y={118} text="ELECTRIC" size={52} p={pop(t, 1.65)} fill="#fff3a8" />
      <Label x={1410} y={118} text="INDONESIA" size={52} p={pop(t, 2.5)} />
    </Frame>
  );
};

/* ---------- kereta ekonomi penuh sesak ---------- */
const GAP = 910;

/** Penumpang atap: dua baris (belakang lebih kecil), rapat sampai atap tak terlihat. */
const RoofCrowd: React.FC<{ car: number; t: number; wind: number }> = ({ car, t, wind }) => (
  <g>
    {Array.from({ length: 11 }, (_, i) => <Person key={"b" + i} x={car + 62 + i * 76 + rnd(`rbx${car}${i}`) * 20} y={462} s={0.74} seed={`rb${car}${i}`} pose="sit" t={t} wind={wind} mood={rnd(`rm${car}${i}`) > 0.75 ? "shout" : "calm"} />)}
    {Array.from({ length: 10 }, (_, i) => { const stand = rnd(`st${car}${i}`) > 0.9; return <Person key={"f" + i} x={car + 40 + i * 87 + rnd(`rfx${car}${i}`) * 24} y={stand ? 508 : 504} s={stand ? 0.8 : 0.9} seed={`rf${car}${i}`} pose={stand ? "wave" : "sit"} t={t} wind={wind} mood={rnd(`rn${car}${i}`) > 0.8 ? "shout" : "calm"} />; })}
  </g>
);

const CrowdedTrain: React.FC<{ x: number; t: number; rot: number; wind: number }> = ({ x, t, rot, wind }) => (
  <g transform={`translate(${x} ${Math.sin(t * 17) * 3 * wind})`}>
    {[0, 1, 2].map((c) => {
      const cx = c * GAP;
      return (<g key={c}>
        {c > 0 && <rect x={cx - 52} y={540} width={56} height={240} fill="#3d3b42" stroke={INK} strokeWidth={5} />}
        <Car x={cx} y={500} lv={ECONOMY} head={c === 0} openDoors rot={rot} dirt={0.4}
          windows={(i, wx, wy, ww, wh) => (
            <g>
              <clipPath id={`w${c}-${i}`}><rect x={wx + 3} y={wy + 3} width={ww - 6} height={wh - 6} rx={7} /></clipPath>
              <g clipPath={`url(#w${c}-${i})`}>
                <rect x={wx} y={wy} width={ww} height={wh} fill="#3b3844" />
                <Person x={wx + ww * 0.7} y={wy + 130} s={0.7} seed={`wb${c}${i}`} pose="bust" t={t} />
                <Person x={wx + ww * 0.34} y={wy + 150} s={0.84} seed={`wa${c}${i}`} pose="bust" t={t} />
              </g>
            </g>
          )} />
        {c > 0 && <Person x={cx - 24} y={778} s={1.05} seed={"gap" + c} pose="cling" t={t} wind={wind} />}
      </g>);
    })}
    {[0, 1, 2].map((c) => <RoofCrowd key={c} car={c * GAP} t={t} wind={wind} />)}
    {/* pintu terbuka: penumpang dalam, lalu yang bergelantungan keluar */}
    {[0, 1, 2].map((c) => DOORS.map((d, k) => {
      const dx = c * GAP + d;
      return (<g key={`${c}-${k}`}>
        <clipPath id={`d${c}-${k}`}><rect x={dx - 60} y={546} width={120} height={244} /></clipPath>
        <g clipPath={`url(#d${c}-${k})`}>
          <Person x={dx - 30} y={756} s={0.9} seed={`in1${c}${k}`} pose="stand" t={t} />
          <Person x={dx + 34} y={748} s={0.88} seed={`in2${c}${k}`} pose="stand" t={t} />
          <Person x={dx + 4} y={790} s={1.0} seed={`in3${c}${k}`} pose="stand" t={t} mood="hot" />
        </g>
        <path d={`M${dx - 54} 560 V780 M${dx + 54} 560 V780`} stroke="#d9d9de" strokeWidth={7} />
        <Person x={dx - 14} y={792} s={0.98} seed={`h1${c}${k}`} pose="cling" t={t} wind={wind} />
        <Person x={dx + 34} y={786} s={1.06} seed={`h2${c}${k}`} pose="hang" t={t} wind={wind} mood={rnd(`hm${c}${k}`) > 0.6 ? "shout" : "calm"} />
      </g>);
    }))}
  </g>
);

/** "At the time, crowded riders hung out of open doors or sat on the roof." — kereta di peron mulai berjalan. */
export const CrowdShot: React.FC<{ t: number }> = ({ t }) => {
  // t = detik scene. Kata: At 4.0 · crowded 5.0 · hung 5.76 · open doors 6.24 · sat 7.08 · roof 7.52
  const go = Math.max(0, t - 4.15);
  const dist = 36 * go * go + 25 * go; // mulai pelan lalu makin cepat, ke kiri
  const wind = seg(t, 4.3, 6.8);
  const trainX = 330 - dist;
  const rot = -dist * 1.7;
  // kamera: lebar → dekati pintu → naik ke atap → mundur
  const k = [3.6, 5.2, 6.0, 6.75, 7.35, 7.85, 8.55];
  const at = (v: number[]) => { let i = 0; while (i < k.length - 2 && t > k[i + 1]) i++; return mix(v[i], v[i + 1], seg(t, k[i], k[i + 1], Easing.inOut(Easing.sin))); };
  const cam = {
    x: at([960, 960, 900, 860, 920, 860, 400]),
    y: at([545, 540, 665, 660, 430, 440, 520]),
    z: at([0.9, 1.0, 1.5, 1.55, 1.5, 1.45, 0.78]),
  };
  const pan = dist * 0.35;
  return (
    <Frame>
      <Layer cam={cam} d={0}><Sky id="c-sky" top="#8ccbea" bottom="#f8dfae" /></Layer>
      <Layer cam={cam} d={0.3}><Cloud x={250 + t * 22} y={100} s={1.2} /><Cloud x={1400 + t * 14} y={60} /><g transform={`translate(${pan * 0.2} 0)`}><Skyline base={690} seed="cr" fill="#c3b9ad" h={[60, 280]} /></g></Layer>
      <Layer cam={cam} d={0.65}>
        <rect x={-900} y={685} width={3720} height={150} fill="#9dbd7a" />
        {Array.from({ length: 24 }, (_, i) => { const x = -800 + i * 170 + pan * 0.6; return i % 4 === 0 ? <Palm key={i} x={x} y={750} s={0.95} t={t} /> : <House key={i} x={x} y={755} s={1} seed={"ch" + i} />; })}
      </Layer>
      <Layer cam={cam} d={1}>
        <rect x={-900} y={800} width={3720} height={600} fill="#a89576" />
        <Catenary wireY={215} baseY={815} off={dist} />
        <Rails y={832} />
        {/* peron di seberang: kanopi dan papan stasiun */}
        <g transform={`translate(${dist * 0.0} 0)`}>
          {[-300, 260, 1660, 2220].map((x) => <path key={x} d={`M${x} 815 V250`} stroke="#5f6b73" strokeWidth={16} />)}
          <path d="M-560 258 L-500 205 H-40 L20 258 Z M1500 258 L1560 205 H2440 L2500 258 Z" fill="#9c5848" stroke={INK} strokeWidth={5} />
        </g>
        <ellipse cx={trainX + 1300} cy={885} rx={1500} ry={20} fill="#000" opacity={0.22} />
        <CrowdedTrain x={trainX} t={t} rot={rot} wind={wind} />
        {/* debu dan uap saat mulai bergerak */}
        {go > 0 && Array.from({ length: 36 }, (_, i) => { const p = (go * 1.4 + rnd("du" + i)) % 1; const wx = trainX + [105, 235, 625, 755][i % 4] + GAP * (i % 3) + p * 190; return <circle key={i} cx={wx} cy={876 - p * 34 * rnd("dh" + i)} r={8 + p * 30} fill="#e9dcc2" opacity={(1 - p) * 0.75 * seg(t, 4.2, 4.8)} />; })}
      </Layer>
      <Layer cam={cam} d={1}>
        {/* peron depan dengan orang yang tertinggal */}
        <rect x={-900} y={948} width={3720} height={26} fill="#f2d14e" stroke={INK} strokeWidth={5} />
        <rect x={-900} y={974} width={3720} height={500} fill="#bcb5aa" />
        {Array.from({ length: 40 }, (_, i) => <path key={i} d={`M${-900 + i * 100} 974 l-60 400`} stroke="#a29a8e" strokeWidth={4} />)}
      </Layer>
      <Layer cam={cam} d={1.12}>
        {[90, 400, 1330, 1580, 1830].map((x, i) => <Person key={x} x={x - (i === 2 ? seg(t, 4.4, 8.5) * 320 : 0)} y={1105 + (i % 2) * 40} s={1.2} seed={"pf" + i} t={t} pose={i === 2 && t > 4.4 ? "walk" : i === 1 ? "wave" : "stand"} flip={i === 2} shirt={pick(["#5b6770", "#8a5a78", "#52705a"], "pfs" + i)} />)}
      </Layer>
      <g transform={`translate(1650 130) scale(${pop(t, 4.05) * (1 - seg(t, 5.4, 5.8))})`}>
        <rect x={-190} y={-60} width={380} height={120} rx={24} fill="#e7d3a4" stroke={INK} strokeWidth={6} />
        <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={62} fill={INK}>BACK THEN</text>
      </g>
    </Frame>
  );
};
