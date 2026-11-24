import React from "react";
import { Face, Emo } from "./Face";
import { INK } from "./ctx";

export type Pose = "down" | "up" | "point" | "shrug" | "hold";
const sw = 6;

const Shadow = () => <ellipse cx={150} cy={368} rx={84} ry={11} fill="#00000030" />;

/** Lengan dua lapis (kontur + warna) dengan tangan bulat. */
const Arm: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; hand?: string }> = ({ x1, y1, x2, y2, color, hand = "#f2c6a0" }) => (
  <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={30} strokeLinecap="round" /><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={19} strokeLinecap="round" />
    <circle cx={x2} cy={y2} r={15} fill={hand} stroke={INK} strokeWidth={4} /></g>
);
const Arms: React.FC<{ pose: Pose; sy: number; color: string; hand?: string; half?: number }> = ({ pose, sy, color, hand, half = 98 }) => {
  const lx = 150 - half, rx = 150 + half;
  const P = {
    down: [[lx - 34, sy + 52], [rx + 34, sy + 52]], up: [[lx - 46, sy - 62], [rx + 46, sy - 62]], point: [[lx - 30, sy + 50], [rx + 66, sy + 2]],
    shrug: [[lx - 50, sy + 6], [rx + 50, sy + 6]], hold: [[lx + 34, sy + 58], [rx - 34, sy + 58]],
  }[pose];
  return <g><Arm x1={lx} y1={sy} x2={P[0][0]} y2={P[0][1]} color={color} hand={hand} /><Arm x1={rx} y1={sy} x2={P[1][0]} y2={P[1][1]} color={color} hand={hand} /></g>;
};
const Legs: React.FC<{ color?: string; shoe?: string; y?: number }> = ({ color = "#2f3b52", shoe = INK, y = 300 }) => (
  <g>{[124, 176].map((x) => <g key={x}><rect x={x - 12} y={y} width={24} height={62 - (y - 300)} rx={10} fill={color} stroke={INK} strokeWidth={sw} /><ellipse cx={x + (x < 150 ? -6 : 6)} cy={364} rx={22} ry={10} fill={shoe} stroke={INK} strokeWidth={4} /></g>)}</g>
);

export type PersonCfg = { skin: string; outfit: string; pants?: string; hair: "short" | "cap" | "bun" | "bald" | "hat"; hairColor: string; apron?: string; tie?: boolean };
export const PEOPLE: Record<string, PersonCfg> = {
  you: { skin: "#f2c6a0", outfit: "#e4572e", hair: "short", hairColor: "#2b1d14" },
  owner: { skin: "#c68a5b", outfit: "#2a9d8f", hair: "cap", hairColor: "#f4f1ea", apron: "#f4f1ea" },
  clerk: { skin: "#e9b98f", outfit: "#2f4a7a", hair: "hat", hairColor: "#1f2f4f", tie: true },
  pilot: { skin: "#f2c6a0", outfit: "#33415c", hair: "hat", hairColor: "#222c40", tie: true },
  friend: { skin: "#8d5a3b", outfit: "#7b5ea7", hair: "bun", hairColor: "#1b1209" },
};

export const Person: React.FC<{ kind: string; emo: Emo; pose: Pose; blink: number }> = ({ kind, emo, pose, blink }) => {
  const c = PEOPLE[kind] ?? PEOPLE.you;
  return (
    <svg viewBox="0 0 300 380" width="100%" height="100%" style={{ overflow: "visible" }}>
      <Shadow />
      <Legs color={c.pants ?? "#2f3b52"} />
      <Arms pose={pose} sy={222} color={c.outfit} hand={c.skin} />
      <rect x={92} y={185} width={116} height={128} rx={42} fill={c.outfit} stroke={INK} strokeWidth={sw} />
      {c.apron && <path d="M112,215 h76 v90 a12,12 0 0 1 -12,12 h-52 a12,12 0 0 1 -12,-12z" fill={c.apron} stroke={INK} strokeWidth={4} />}
      {c.tie && <path d="M150,190 l-12,18 l12,60 l12,-60z" fill="#d9362b" stroke={INK} strokeWidth={4} />}
      <circle cx={68} cy={112} r={14} fill={c.skin} stroke={INK} strokeWidth={sw} /><circle cx={232} cy={112} r={14} fill={c.skin} stroke={INK} strokeWidth={sw} />
      <circle cx={150} cy={108} r={84} fill={c.skin} stroke={INK} strokeWidth={sw} />
      {c.hair === "short" && <path d="M68,100 Q70,30 150,26 Q230,30 232,100 Q200,60 150,66 Q100,60 68,100z" fill={c.hairColor} stroke={INK} strokeWidth={sw} strokeLinejoin="round" />}
      {c.hair === "cap" && <g><path d="M66,96 Q70,24 150,22 Q230,24 234,96z" fill="#2a9d8f" stroke={INK} strokeWidth={sw} /><path d="M200,86 Q262,86 268,104 Q240,112 196,104z" fill="#23867a" stroke={INK} strokeWidth={sw} /></g>}
      {c.hair === "bun" && <g><circle cx={150} cy={22} r={26} fill={c.hairColor} stroke={INK} strokeWidth={sw} /><path d="M68,100 Q70,30 150,26 Q230,30 232,100 Q200,62 150,68 Q100,62 68,100z" fill={c.hairColor} stroke={INK} strokeWidth={sw} /></g>}
      {c.hair === "hat" && <g><path d="M70,92 Q72,26 150,24 Q228,26 230,92z" fill={c.hairColor} stroke={INK} strokeWidth={sw} /><rect x={58} y={84} width={184} height={16} rx={8} fill={c.hairColor} stroke={INK} strokeWidth={sw} /><circle cx={150} cy={58} r={10} fill="#f5b700" stroke={INK} strokeWidth={3} /></g>}
      <Face cx={150} cy={118} s={84} emo={emo} blink={blink} />
    </svg>
  );
};

type GCfg = { color?: string; acc?: "glasses" | "tie" | "shades" | "crown" | "none"; label?: string };

const Glasses = ({ cx, cy, s }: { cx: number; cy: number; s: number }) => (
  <g fill="none" stroke={INK} strokeWidth={5}><circle cx={cx - 0.38 * s} cy={cy - 0.08 * s} r={0.27 * s} /><circle cx={cx + 0.38 * s} cy={cy - 0.08 * s} r={0.27 * s} /><line x1={cx - 0.11 * s} y1={cy - 0.1 * s} x2={cx + 0.11 * s} y2={cy - 0.1 * s} /></g>
);
const Shades = ({ cx, cy, s }: { cx: number; cy: number; s: number }) => (
  <g stroke={INK} strokeWidth={5}><rect x={cx - 0.68 * s} y={cy - 0.28 * s} width={0.55 * s} height={0.34 * s} rx={0.1 * s} fill={INK} /><rect x={cx + 0.13 * s} y={cy - 0.28 * s} width={0.55 * s} height={0.34 * s} rx={0.1 * s} fill={INK} /><line x1={cx - 0.13 * s} y1={cy - 0.2 * s} x2={cx + 0.13 * s} y2={cy - 0.2 * s} /></g>
);

export const Gadget: React.FC<{ kind: string; emo: Emo; pose: Pose; blink: number; cfg?: GCfg }> = ({ kind, emo, pose, blink, cfg = {} }) => {
  const col = cfg.color;
  let body: React.ReactNode;
  switch (kind) {
    case "terminal": {
      const c = col ?? "#4a5468";
      body = (<g>
        <Legs color="#3a4252" y={318} /><Arms pose={pose} sy={235} color={c} hand="#cfd6e4" half={78} />
        <rect x={66} y={96} width={168} height={236} rx={26} fill={c} stroke={INK} strokeWidth={sw} />
        <rect x={86} y={116} width={128} height={104} rx={14} fill="#cdeed8" stroke={INK} strokeWidth={5} />
        <Face cx={150} cy={170} s={44} emo={emo} blink={blink} />
        {[0, 1, 2].map((r) => [0, 1, 2].map((q) => <circle key={`${r}${q}`} cx={112 + q * 38} cy={246 + r * 26} r={9} fill="#dfe5f1" stroke={INK} strokeWidth={3} />))}
        <rect x={96} y={96} width={108} height={8} rx={4} fill="#2e3646" /></g>);
      break;
    }
    case "bank": case "bank-big": {
      const c = col ?? "#d9c9a3", big = kind === "bank-big", top = big ? 54 : 84;
      body = (<g>
        <Legs color="#5b4a2a" y={330} /><Arms pose={pose} sy={250} color={c} hand="#f1e3bd" half={112} />
        <path d={`M30,${top + 70} L150,${top} L270,${top + 70}Z`} fill="#b99b5e" stroke={INK} strokeWidth={sw} strokeLinejoin="round" />
        <rect x={42} y={top + 70} width={216} height={22} fill="#c9ac6f" stroke={INK} strokeWidth={sw} />
        {[58, 112, 188, 242].map((x) => <rect key={x} x={x - 14} y={top + 92} width={28} height={214 - (top - 54) * 0 - (big ? 0 : 20)} fill={c} stroke={INK} strokeWidth={5} />)}
        <circle cx={150} cy={top + 156} r={52} fill="#fbf4df" stroke={INK} strokeWidth={sw} />
        <Face cx={150} cy={top + 164} s={52} emo={emo} blink={blink} />
        {cfg.acc === "glasses" && <Glasses cx={150} cy={top + 164} s={52} />}
        {cfg.acc === "shades" && <Shades cx={150} cy={top + 164} s={52} />}
        {cfg.acc === "tie" && <path d={`M150,${top + 208} l-11,16 l11,48 l11,-48z`} fill="#d9362b" stroke={INK} strokeWidth={4} />}
        {cfg.acc === "crown" && <path d={`M112,${top - 6} l10,-28 l14,18 l14,-26 l14,26 l14,-18 l10,28z`} fill="#f5b700" stroke={INK} strokeWidth={5} />}
        <rect x={26} y={top + 300 - (big ? 0 : 20)} width={248} height={22} rx={6} fill="#a9a08a" stroke={INK} strokeWidth={sw} /></g>);
      break;
    }
    case "network": {
      const c = col ?? "#8ecdf2";
      body = (<g>
        <Legs color="#4b84b0" y={316} /><Arms pose={pose} sy={225} color={c} hand="#e6f4fc" half={96} />
        <path d="M70,300 a52,52 0 0 1 8,-100 a62,62 0 0 1 118,-22 a56,56 0 0 1 36,100 a38,38 0 0 1 -14,22z" fill={c} stroke={INK} strokeWidth={sw} strokeLinejoin="round" />
        <Face cx={150} cy={252} s={54} emo={emo} blink={blink} />
        {cfg.acc === "shades" && <Shades cx={150} cy={252} s={54} />}
        {[96, 150, 204].map((x) => <circle key={x} cx={x} cy={324} r={7} fill="#fff" stroke={INK} strokeWidth={3} />)}</g>);
      break;
    }
    case "phone": {
      const c = col ?? "#2d3a52";
      body = (<g>
        <Legs color="#1f2a40" y={320} /><Arms pose={pose} sy={225} color={c} hand="#dfe5f1" half={70} />
        <rect x={84} y={50} width={132} height={278} rx={30} fill={c} stroke={INK} strokeWidth={sw} />
        <rect x={96} y={74} width={108} height={228} rx={16} fill="#bfe3ff" stroke={INK} strokeWidth={4} />
        <Face cx={150} cy={170} s={50} emo={emo} blink={blink} />
        <rect x={130} y={58} width={40} height={8} rx={4} fill="#111" />
        <path d="M236,120 q20,20 0,40 M252,106 q32,34 0,68" fill="none" stroke="#2a9d8f" strokeWidth={6} strokeLinecap="round" /></g>);
      break;
    }
    case "card": {
      const c = col ?? "#e4572e";
      body = (<g>
        <Legs color="#2f3b52" y={310} /><Arms pose={pose} sy={225} color={c} hand="#fbe5d9" half={118} />
        <rect x={32} y={116} width={236} height={178} rx={24} fill={c} stroke={INK} strokeWidth={sw} />
        <rect x={32} y={146} width={236} height={26} fill="#2b2b2b" stroke={INK} strokeWidth={4} />
        <rect x={54} y={190} width={50} height={38} rx={8} fill="#f5d36a" stroke={INK} strokeWidth={4} />
        <Face cx={186} cy={226} s={46} emo={emo} blink={blink} /></g>);
      break;
    }
    case "vault": {
      body = (<g>
        <Legs color="#4a4f58" y={322} /><Arms pose={pose} sy={235} color="#8a92a0" hand="#d6dbe6" half={122} />
        <circle cx={150} cy={210} r={124} fill="#8a92a0" stroke={INK} strokeWidth={sw} /><circle cx={150} cy={210} r={98} fill="#aab2c0" stroke={INK} strokeWidth={5} />
        {[0, 60, 120].map((a) => <line key={a} x1={150 + 98 * Math.cos((a * Math.PI) / 180)} y1={210 + 98 * Math.sin((a * Math.PI) / 180)} x2={150 - 98 * Math.cos((a * Math.PI) / 180)} y2={210 - 98 * Math.sin((a * Math.PI) / 180)} stroke={INK} strokeWidth={9} strokeLinecap="round" />)}
        <circle cx={150} cy={210} r={56} fill="#fbf4df" stroke={INK} strokeWidth={sw} /><Face cx={150} cy={214} s={56} emo={emo} blink={blink} />
        {cfg.acc === "crown" && <path d="M104,86 l10,-28 l14,18 l14,-26 l14,26 l14,-18 l10,28z" fill="#f5b700" stroke={INK} strokeWidth={5} />}</g>);
      break;
    }
    case "plane": {
      body = (<g>
        <ellipse cx={150} cy={210} rx={146} ry={62} fill="#f4f6fa" stroke={INK} strokeWidth={sw} />
        <path d="M150,170 L70,80 L108,80 L190,170z" fill="#d84a3a" stroke={INK} strokeWidth={sw} /><path d="M40,190 L8,140 L40,144 L70,190z" fill="#d84a3a" stroke={INK} strokeWidth={sw} />
        <Face cx={196} cy={206} s={46} emo={emo} blink={blink} /><circle cx={104} cy={206} r={9} fill="#9fd3ff" stroke={INK} strokeWidth={3} /><circle cx={134} cy={206} r={9} fill="#9fd3ff" stroke={INK} strokeWidth={3} /></g>);
      break;
    }
    default:
      body = <circle cx={150} cy={200} r={80} fill="#ccc" stroke={INK} strokeWidth={sw} />;
  }
  return (<svg viewBox="0 0 300 380" width="100%" height="100%" style={{ overflow: "visible" }}><Shadow />{body}</svg>);
};

export const isPerson = (k: string) => k in PEOPLE;
