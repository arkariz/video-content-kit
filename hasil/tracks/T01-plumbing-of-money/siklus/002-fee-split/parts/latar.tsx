// Detail lingkungan, dunia hidup, dan latar depan pembingkai (STYLE.md 4.2-4.3, 5).
import React from "react";
import { Layer, R, mix } from "@r3";
import { FarCity, Lamp, Tree, WaterTower, rr } from "@r3/art";
import { Birds, Boat, Shrub, Walker } from "./dekor";
import type { Cam, SetName } from "./dunia";

const leaf = (x: number, y: number, rot: number, len: number, c: string, hi: string, t: number, i: number) => (
  <g key={i} transform={`translate(${x} ${y}) rotate(${rot + Math.sin(t * 1.1 + i) * 2.5})`}><path d={`M0 0Q${len * 0.45} ${-len * 0.3} ${len} 0Q${len * 0.45} ${len * 0.22} 0 0Z`} fill={c} /><path d={`M12 -2Q${len * 0.5} ${-len * 0.12} ${len * 0.86} -2`} stroke={hi} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.6} /></g>
);
const Bush2: React.FC<{ x: number; y: number; s: number; c: string; hi: string }> = ({ x, y, s, c, hi }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><g fill={c}><circle r={120} /><circle cx={-120} cy={34} r={90} /><circle cx={125} cy={40} r={96} /><circle cx={40} cy={-62} r={74} /></g><path d="M-96 -56Q-40 -140 70 -120" stroke={hi} strokeWidth={11} fill="none" strokeLinecap="round" opacity={0.7} /></g>
);
const Cloudlet: React.FC<{ x: number; y: number; c: string }> = ({ x, y, c }) => <g fill={c}><circle cx={x} cy={y} r={30} /><circle cx={x + 40} cy={y + 8} r={22} /><circle cx={x - 38} cy={y + 10} r={20} /><path d={rr(x - 58, y + 8, 122, 24, 12)} /></g>;

/** lapisan tengah tambahan, di atas latar dasar dan di bawah subjek */
export const Mid: React.FC<{ kind: SetName; t: number; cam: Cam }> = ({ kind, t, cam }) => {
  if (kind === "jalan" || kind === "pagi") { const day = kind === "pagi"; return (<>
    <Layer cam={cam} d={0.24}><g opacity={0.9}><FarCity x0={-300} x1={2220} base={660} seed={day ? 9 : 4} fill={day ? "#78a4bc" : "#5a3482"} hi={day ? "#a8c8d8" : "#8a5aa8"} t={t} lights={day ? 0 : 0.08} gap={[760, 1160]} /></g><Birds x={mix(300, 900, (t * 0.03) % 1)} y={250} t={t} c={day ? "#2f5a78" : "#2a1650"} n={4} /></Layer>
    <Layer cam={cam} d={0.5}><WaterTower x={1730} base={705} s={0.55} t={t} />{[250, 340, 1380, 1455].map((x, i) => <Tree key={x} x={x} base={730} s={0.55 + (i % 2) * 0.16} seed={i + 3} t={t} tones={day ? undefined : ["#1c1438", "#2c2054", "#46327a", "#e89a6a"]} />)}</Layer>
    <Layer cam={cam} d={0.75}><Lamp x={90} base={760} s={0.72} t={t} /><Lamp x={1850} base={760} s={0.72} t={t} /></Layer>
  </>); }
  if (kind === "malam") return (<>
    <Layer cam={cam} d={0.45}><FarCity x0={-300} x1={2220} base={715} seed={21} fill="#242456" hi="#3c3c80" t={t} lights={0.12} gap={[640, 1280]} /><WaterTower x={170} base={700} s={0.5} t={t} /></Layer>
  </>);
  if (kind === "pulau") return (
    <Layer cam={cam} d={0.3}><path d="M1120 610L1330 380Q1352 366 1374 380L1600 610Z" fill="#4a8cb0" /><path d="M1300 413L1330 380Q1352 366 1374 380L1404 413L1372 404L1352 424L1330 402Z" fill="#cfeaf4" /><Cloudlet x={1350 + Math.sin(t * 0.5) * 12} y={320} c="#e8f6ff" />{[430, 520, 600].map((x, i) => <g key={x} transform={`translate(${x} ${612 - (i % 2) * 10})`}><path d="M-34 0L0 -44L34 0Z" fill="#2f6a7a" /><path d={rr(-24, -4, 48, 24, 6)} fill="#235468" /></g>)}<Boat x={mix(-100, 900, (t * 0.025 + 0.3) % 1)} y={650} s={0.5} t={t} /><Birds x={700 + t * 14} y={260} t={t} c="#2a5a78" n={3} /></Layer>);
  if (kind === "toko") return (
    <Layer cam={cam} d={0.5}><path d={rr(-400, 596, 2720, 12, 6)} fill="#8a3a58" />{[560, 1295].map((x, i) => <g key={x} transform={`translate(${x} 760)`}><path d={rr(-34, -56, 68, 56, 14)} fill="#8a4a40" />{[-60, -28, 6, 36, 64].map((r, k) => leaf(0, -52, r - 90, 80 + (k % 2) * 26, "#2c7a62", "#8ad0a8", t, k + i * 9))}</g>)}<g transform="translate(700 270)"><circle r={42} fill="#fff0d4" /><circle r={30} fill="#7a3a62" /><path d={`M0 0V-20M0 0L${Math.cos(t * 0.6) * 15} ${Math.sin(t * 0.6) * 15}`} stroke="#fff0d4" strokeWidth={6} strokeLinecap="round" /></g></Layer>);
  if (kind === "kantor") return (
    <Layer cam={cam} d={0.55}>{[520, 720, 1060, 1230].map((x, i) => <g key={x}><path d={rr(x, 190 + (i % 2) * 60, 150, 100, 18)} fill="#0f3a42" /><path d={`M${x + 18} ${250 + (i % 2) * 60}${[0, 1, 2, 3, 4].map((k) => `L${x + 18 + k * 28} ${246 + (i % 2) * 60 - Math.sin(t * 2 + k * 1.7 + i) * 24}`).join("")}`} stroke="#7dffd0" strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.6} /></g>)}<path d="M-300 120Q300 190 700 110T1500 130T2220 100" stroke="#0f3a42" strokeWidth={16} fill="none" />{Array.from({ length: 6 }, (_, i) => <circle key={i} cx={((t * 150 + i * 420) % 2500) - 280} cy={122 + Math.sin(i * 2) * 16} r={8} fill="#ffd23f" />)}</Layer>);
  if (kind === "ungu" || kind === "hijau") { const g = kind === "hijau"; const a = g ? "#2a7a62" : "#5c3c96", b = g ? "#1c6050" : "#482c7c", hi = g ? "#8ad8b0" : "#c08ad0"; return (<>
    {/* ruang pembukuan: rak buku besar, toples koin, lampu gantung */}
    <Layer cam={cam} d={0.2}><g opacity={0.65}>{[-120, 190, 1590, 1900].map((x, i) => <g key={x}><path d={rr(x, 250 + (i % 2) * 70, 250, 560, 110, 8)} fill={b} />{[0, 1, 2].map((k) => <g key={k}><path d={rr(x + 24, 400 + k * 120 + (i % 2) * 40, 202, 13, 6)} fill={a} />{Array.from({ length: 5 }, (_, j) => <path key={j} d={rr(x + 34 + j * 38, 400 + k * 120 + (i % 2) * 40 - 50 - R(i * 9 + k * 5 + j, 3) * 30, 26, 50 + R(i * 9 + k * 5 + j, 3) * 30, 7, 2)} fill={j % 2 ? a : hi} opacity={j % 2 ? 1 : 0.4} />)}</g>)}</g>)}</g></Layer>
    <Layer cam={cam} d={0.45}><path d="M-400 800Q960 742 2320 800V1300H-400Z" fill={b} /><path d="M-300 802Q960 746 2220 802" stroke={hi} strokeWidth={6} fill="none" opacity={0.5} />{[110, 1810].map((x, i) => <g key={x}><path d={`M${x} -200V${96 + i * 40}`} stroke={b} strokeWidth={8} /><path d={`M${x - 62} ${160 + i * 40}Q${x} ${60 + i * 40} ${x + 62} ${160 + i * 40}Z`} fill={hi} /><circle cx={x} cy={170 + i * 40} r={120} fill="#ffd98a" opacity={0.12} /></g>)}</Layer>
  </>); }
  if (kind === "brankas") return (
    <Layer cam={cam} d={0.55}>{[60, 1770].map((x, i) => <g key={x}>{[0, 1, 2, 3].map((k) => <g key={k}><path d={rr(x - 20 + (i ? -60 : 0), 250 + k * 135, 150, 112, 16)} fill="#243c70" /><circle cx={x + 55 + (i ? -60 : 0)} cy={306 + k * 135} r={20} fill="#4a74b8" /><path d={rr(x + 49 + (i ? -60 : 0), 290 + k * 135, 12, 32, 6)} fill="#9fc4ff" opacity={0.5 + 0.4 * Math.sin(t * 2 + k + i)} /></g>)}</g>)}</Layer>);
  return null;
};

/** latar depan gelap di tepi: besar, kontras rendah, sebagian keluar bingkai; tidak pernah menutup tengah frame */
export const Fore: React.FC<{ kind: SetName; t: number; cam: Cam }> = ({ kind, t, cam }) => {
  let el: React.ReactNode;
  if (kind === "toko") el = <><g>{[18, 44, 72, -8].map((r, i) => leaf(-70, 1090, r - 78, 330 - i * 28, i % 2 ? "#143c3a" : "#1c5048", "#4a9a80", t, i))}</g><g transform="translate(1930 1050)"><path d={rr(-150, -130, 260, 220, 20)} fill="#3c1838" /><path d={rr(-165, -165, 290, 52, 18)} fill="#4c2246" /><path d={rr(-100, -300, 190, 135, 18)} fill="#2e102c" /></g></>;
  else if (kind === "jalan" || kind === "malam") { const n = kind === "malam"; el = <><Bush2 x={-20} y={1090} s={1.15} c={n ? "#080e26" : "#1e0e36"} hi={n ? "#31508a" : "#8a4a8a"} /><Bush2 x={1960} y={1100} s={1.3} c={n ? "#080e26" : "#1e0e36"} hi={n ? "#31508a" : "#c0668a"} /></>; }
  else if (kind === "pagi") el = <><Bush2 x={-30} y={1100} s={1.15} c="#17443e" hi="#6ab890" /><Bush2 x={1960} y={1100} s={1.25} c="#17443e" hi="#8ad0a0" /></>;
  else if (kind === "pulau") el = <>{[-4, 24, 52, 80].map((r, i) => leaf(-60, 1100, r - 82, 380 - i * 35, i % 2 ? "#0c3a34" : "#145048", "#4ab088", t, i))}{[184, 208, 234, 258].map((r, i) => leaf(1990, 1100, r + 14, 360 - i * 30, i % 2 ? "#0c3a34" : "#145048", "#4ab088", t, i + 6))}</>;
  else if (kind === "kantor") el = <><path d={rr(-130, 560, 230, 640, 40)} fill="#061c22" /><path d={rr(1830, 640, 240, 560, 40)} fill="#061c22" /><path d="M-100 900Q180 1130 520 1090" stroke="#061c22" strokeWidth={44} fill="none" strokeLinecap="round" /><circle cx={52} cy={640 + 4} r={11} fill="#7dffb8" opacity={0.4 + 0.5 * Math.abs(Math.sin(t * 2))} /></>;
  else if (kind === "brankas") el = <><path d="M-80 880H110Q170 880 170 940V1200" stroke="#060a1e" strokeWidth={110} fill="none" /><path d="M2000 860H1830Q1770 860 1770 920V1200" stroke="#060a1e" strokeWidth={110} fill="none" /></>;
  else { const c = kind === "hijau" ? "#082a24" : "#1c0c40", hi = kind === "hijau" ? "#2f8f6b" : "#7248b4"; el = <>{[[40, 1050, 5], [190, 1090, 3], [1760, 1090, 4], [1910, 1040, 7]].map(([x, y, n], i) => <g key={i}>{Array.from({ length: n }, (_, k) => <g key={k}><ellipse cx={x + (R(i * 7 + k, 2) - 0.5) * 14} cy={y - k * 36} rx={104} ry={30} fill={c} /><path d={`M${x - 76} ${y - k * 36 - 12}Q${x} ${y - k * 36 - 34} ${x + 60} ${y - k * 36 - 20}`} stroke={hi} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.55} /></g>)}</g>)}</>; }
  return <Layer cam={cam} d={1.22}>{el}</Layer>;
};
export const _lt = { Shrub, Walker };
