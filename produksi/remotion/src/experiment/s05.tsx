// s05: "Those cars were built from 1968. Tokyo retired them after about thirty years..., and Jakarta kept them running until 2016."
import React from "react";
import { Easing } from "remotion";
import { Car, Catenary, Cloud, Frame, FONT, House, INK, Label, Layer, Palm, Person, Rails, Skyline, Sky, TOKYO, mix, pop, rnd, seg } from "./kit";

const YearBoard: React.FC<{ x: number; y: number; year: number; p?: number; sub?: string }> = ({ x, y, year, p = 1, sub }) => (
  <g transform={`translate(${x} ${y}) scale(${p})`}>
    <rect x={-170} y={-95} width={340} height={sub ? 210 : 170} rx={24} fill="#2d2a35" stroke={INK} strokeWidth={6} />
    {String(year).split("").map((c, i) => (
      <g key={i} transform={`translate(${-111 + i * 74} -12)`}>
        <rect x={-33} y={-62} width={66} height={124} rx={9} fill="#f7f1e3" />
        <text y={36} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={102} fill={INK}>{c}</text>
        <path d="M-33 0H33" stroke={INK} strokeWidth={2.5} opacity={0.4} />
      </g>
    ))}
    {sub && <text y={94} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={38} fill="#ffd23f">{sub}</text>}
  </g>
);

/** "Those cars were built from 1968." — badan gerbong diturunkan derek ke atas roda, dilas di pabrik. */
export const FactoryShot: React.FC<{ t: number }> = ({ t }) => {
  const drop = seg(t, 0.1, 1.15, Easing.inOut(Easing.cubic));
  const bodyY = mix(150, 500, drop);
  const cam = { x: 960, y: mix(500, 560, seg(t, 0, 2.6)), z: mix(1.0, 1.1, seg(t, 0, 2.6)) };
  const weld = t > 1.2;
  const bogie = (x: number) => (
    <g key={x}><rect x={x} y={794} width={220} height={40} rx={10} fill="#4a4a52" stroke={INK} strokeWidth={4} />
      {[x + 45, x + 175].map((w) => <g key={w}><circle cx={w} cy={842} r={34} fill="#3a3a42" stroke={INK} strokeWidth={5} /><circle cx={w} cy={842} r={18} fill="#8d8f99" /></g>)}</g>
  );
  return (
    <Frame>
      <Layer cam={cam} d={0.4}>
        <Sky id="f-sky" top="#6e5b4d" bottom="#c8ab84" />
        {[120, 520, 920, 1320, 1720].map((x) => <g key={x}><path d={`M${x - 110} 520 V230 Q${x} 130 ${x + 110} 230 V520 Z`} fill="#f6dfae" stroke="#4b3b31" strokeWidth={14} /><path d={`M${x} 175 V520 M${x - 110} 320 H${x + 110} M${x - 110} 420 H${x + 110}`} stroke="#4b3b31" strokeWidth={7} /></g>)}
      </Layer>
      <Layer cam={cam} d={1}>
        <path d="M-400 90 H2320 M-400 150 H2320" stroke="#3f3a3d" strokeWidth={18} />
        {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${-400 + i * 100} 90 L${-300 + i * 100} 150 L${-200 + i * 100} 90`} stroke="#3f3a3d" strokeWidth={8} fill="none" />)}
        <rect x={-600} y={875} width={3120} height={500} fill="#8a7566" stroke={INK} strokeWidth={5} />
        <Rails y={880} bed="#77665a" />
        {bogie(600)}{bogie(1120)}
        {[760, 1180].map((x) => <g key={x} stroke={INK}><path d={`M${x} 150 V${bodyY - 90}`} strokeWidth={7} /><path d={`M${x} ${bodyY - 90} L${x - 110} ${bodyY - 10} M${x} ${bodyY - 90} L${x + 110} ${bodyY - 10}`} strokeWidth={5} /><rect x={x - 40} y={130} width={80} height={44} rx={8} fill="#e9b44c" strokeWidth={5} /></g>)}
        <g>
          <clipPath id="f-body"><rect x={400} y={bodyY - 70} width={1200} height={380} /></clipPath>
          <g clipPath="url(#f-body)"><Car x={540} y={bodyY} lv={TOKYO} head lights={false} /></g>
        </g>
        {weld && [620, 1360].map((x, k) => (
          <g key={x}>
            <circle cx={x} cy={802} r={30 + rnd(`wg${k}${Math.floor(t * 18)}`) * 30} fill="#bfe6ff" opacity={0.7} />
            {Array.from({ length: 18 }, (_, i) => {
              const life = (t * 3 + rnd(`l${k}${i}`)) % 1, a = -3.14 * rnd(`a${k}${i}`), r = 160 * life;
              return <path key={i} d={`M${x + Math.cos(a) * r} ${802 + Math.sin(a) * r + life * life * 130} l${Math.cos(a) * 18} ${Math.sin(a) * 18}`} stroke={i % 2 ? "#ffd23f" : "#fff3c0"} strokeWidth={6} strokeLinecap="round" opacity={1 - life} />;
            })}
          </g>
        ))}
        <Person x={500} y={985} s={1.45} seed="welder1" shirt="#e58a2e" t={t} />
        <Person x={1500} y={990} s={1.45} seed="welder2" shirt="#e58a2e" t={t} flip />
        <Person x={230} y={950} s={1.25} seed="mandor" shirt="#4f6d8f" t={t} pose="wave" />
        {/* helm */}
        {[[500, 724], [1500, 729]].map(([x, y]) => <path key={x} d={`M${x - 44} ${y} Q${x} ${y - 62} ${x + 44} ${y} Z`} fill="#ffd23f" stroke={INK} strokeWidth={5} />)}
      </Layer>
      <g transform={`translate(1640 330) scale(${pop(t, 1.15, 0.35)}) rotate(-6)`}>
        <rect x={-170} y={-100} width={340} height={200} rx={18} fill="#cfa54a" stroke={INK} strokeWidth={7} />
        <rect x={-150} y={-80} width={300} height={160} rx={10} fill="none" stroke={INK} strokeWidth={3} />
        <text y={-26} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill={INK}>BUILT</text>
        <text y={64} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={100} fill={INK}>1968</text>
      </g>
    </Frame>
  );
};

/** "Tokyo retired them after about thirty years of service," — tahun berjalan, kereta menua lalu masuk depo dan pintunya ditutup. */
export const RetireShot: React.FC<{ t: number }> = ({ t }) => {
  const years = seg(t, 2.55, 4.55, Easing.inOut(Easing.sin));
  const year = Math.round(mix(1968, 1999, years));
  const drive = seg(t, 2.5, 4.6, Easing.out(Easing.cubic));
  const x = mix(-1000, 760, drive);
  const rot = x * 0.9;
  const shutter = seg(t, 4.55, 5.15, Easing.in(Easing.quad));
  const off = t > 4.6;
  const dusk = seg(t, 3.8, 5.2);
  const cam = { x: mix(960, 1040, seg(t, 2.5, 5.6)), y: 540, z: mix(1.0, 1.1, seg(t, 4.2, 5.6)) };
  return (
    <Frame>
      <Layer cam={cam} d={0}><Sky id="r-sky" top="#9fd2ef" bottom="#f6e6d0" /><rect x={-200} y={-200} width={2320} height={1480} fill="#4a2f55" opacity={dusk * 0.5} /></Layer>
      <Layer cam={cam} d={0.35}><Cloud x={300 - t * 20} y={110} /><Skyline base={720} seed="rt" fill="#a9b7cb" /></Layer>
      <Layer cam={cam} d={1}>
        <rect x={-600} y={730} width={3120} height={600} fill="#b7ad9c" />
        {/* bagian dalam depo */}
        <rect x={720} y={400} width={1120} height={450} fill="#3a343c" />
        <Rails y={832} />
        <Catenary wireY={330} baseY={780} />
        <Car x={x + 60} y={500} lv={TOKYO} head rot={rot} dirt={years * 0.85} lights={!off} />
        {/* dinding depo & rolling door */}
        <g stroke={INK} strokeWidth={6}>
          <path d="M660 400 L1280 230 L1900 400 Z" fill="#7d6a5f" />
          <rect x={720} y={392} width={1120} height={470 * shutter} fill="#9aa0a6" />
          {Array.from({ length: 12 }, (_, i) => (i + 1) * 39 < 470 * shutter ? <path key={i} d={`M720 ${392 + (i + 1) * 39}H1840`} strokeWidth={3} /> : null)}
          <rect x={660} y={380} width={66} height={490} fill="#8c776a" /><rect x={1834} y={380} width={66} height={490} fill="#8c776a" />
        </g>
        <Label x={1280} y={338} text="TOKYO DEPOT" size={38} />
        <Person x={430} y={1010} s={1.5} seed="masinis" shirt="#2f3e5c" t={t} pose={t > 4.9 ? "wave" : "stand"} />
      </Layer>
      <YearBoard x={320} y={220} year={year} sub={year >= 1998 ? "≈ 30 YEARS" : "IN SERVICE"} p={pop(t, 2.45)} />
      <g transform={`translate(1280 620) rotate(-12) scale(${t > 5.0 ? mix(2.6, 1, seg(t, 5.0, 5.2, Easing.in(Easing.quad))) : 0})`}>
        <rect x={-310} y={-92} width={620} height={184} rx={20} fill="#fff4e8" opacity={0.94} stroke="#c9332c" strokeWidth={16} />
        <text y={42} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={118} fill="#c9332c">RETIRED</text>
      </g>
    </Frame>
  );
};

const Monas: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={4}>
    <path d="M-130 0 H130 L96 -50 H-96 Z" fill="#e6dccb" /><path d="M-30 -50 L-14 -430 H14 L30 -50 Z" fill="#f2ebdd" />
    <rect x={-46} y={-452} width={92} height={26} fill="#e6dccb" /><path d="M-18 -452 C-44 -500 -4 -520 0 -560 C6 -520 44 -500 18 -452 Z" fill="#f4c542" />
  </g>
);

/** "and Jakarta kept them running until 2016." — gerbong yang sama melaju di Jakarta, tahun berjalan sampai 2016. */
export const JakartaShot: React.FC<{ t: number }> = ({ t }) => {
  const years = seg(t, 5.9, 7.55, Easing.inOut(Easing.sin));
  const year = Math.round(mix(2000, 2016, years));
  const speed = t * 1500;
  const x = mix(1000, 330, seg(t, 5.6, 9, Easing.out(Easing.quad)));
  const cam = { x: 960, y: 540, z: mix(1.12, 1.0, seg(t, 5.6, 7)) };
  const bob = Math.sin(t * 22) * 3;
  return (
    <Frame>
      <Layer cam={cam} d={0}><Sky id="j-sky" top="#6fc2ee" bottom="#ffe9b8" /><circle cx={1580} cy={220} r={90} fill="#ffd45c" /></Layer>
      <Layer cam={cam} d={0.3}><Cloud x={200 + t * 30} y={90} s={1.3} /><Skyline base={700} seed="jk" fill="#b7c9c2" h={[60, 260]} /><Monas x={1180 + (t - 5.6) * 60} y={700} /></Layer>
      <Layer cam={cam} d={0.7}>
        <rect x={-600} y={690} width={3120} height={130} fill="#9fc77f" />
        {Array.from({ length: 22 }, (_, i) => { const px = ((i * 190 + speed * 0.35) % 4180) - 900; return i % 3 === 0 ? <Palm key={i} x={px} y={745} s={0.9} t={t} /> : <House key={i} x={px} y={752} s={0.95} seed={"jh" + i} />; })}
      </Layer>
      <Layer cam={cam} d={1}>
        <rect x={-600} y={780} width={3120} height={600} fill="#c9b690" />
        <Catenary wireY={340} baseY={790} off={speed} />
        <Rails y={832} off={speed} />
        <g transform={`translate(0 ${bob})`}>
          <path d={`M${x + 420} 448 L${x + 490} 342 L${x + 560} 448`} stroke={INK} strokeWidth={9} fill="none" />
          <Car x={x} y={500} lv={TOKYO} head rot={-speed} dirt={0.35} />
          <Car x={x + 900} y={500} lv={TOKYO} rot={-speed} dirt={0.35} />
        </g>
        {Array.from({ length: 12 }, (_, i) => { const p = (t * 2.2 + rnd("wl" + i)) % 1; return <path key={i} d={`M${x + 100 + p * 1900} ${470 + rnd("wy" + i) * 420} h${90 + rnd("ww" + i) * 120}`} stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={(1 - p) * 0.8} />; })}
      </Layer>
      <Layer cam={cam} d={1.35}>{[0, 1, 2].map((i) => <Palm key={i} x={((i * 1100 + speed * 1.5) % 3300) - 600} y={1360} s={1.5} t={t} />)}</Layer>
      <YearBoard x={320} y={220} year={year} sub="JAKARTA" p={pop(t, 5.65, 0.3)} />
    </Frame>
  );
};
