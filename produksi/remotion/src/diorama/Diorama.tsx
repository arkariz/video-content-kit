import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Cam, DEFAULT_CAM, groundPoly, mixCam, project } from "./camera";
import { Sprite, sizeOf } from "./assets";
import { INK } from "../toon/ctx";
import { clamp, ease } from "../lib/ui";

const FONT = "'Chalkboard SE','Marker Felt','Comic Sans MS',sans-serif";
const MOOD: Record<string, { top: string; low: string; ground: string; shade: string; lit: boolean }> = {
  day: { top: "#9fd3f2", low: "#eaf5e4", ground: "#a9cf8e", shade: "#00000000", lit: false },
  dusk: { top: "#f2a65a", low: "#f7d9a8", ground: "#a8b877", shade: "#7a2f1430", lit: true },
  night: { top: "#111a3d", low: "#33406e", ground: "#35503f", shade: "#0b102c8c", lit: true },
};
const smooth = (t: number) => { const x = clamp(t); return x * x * (3 - 2 * x); };
/** Acak deterministik untuk sebaran aset. */
const rnd = (n: number) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };

export const Diorama: React.FC<{ world: any; shot: any; frame: number; dur: number }> = ({ world, shot, frame, dur }) => {
  const { width: w, height: h } = useVideoConfig();
  const p = clamp(frame / Math.max(1, dur)), vertical = h > w;
  const m = MOOD[shot.mood ?? world.mood ?? "day"] ?? MOOD.day;
  const objs: any[] = world.objects ?? [];
  const byId: Record<string, any> = Object.fromEntries(objs.map((o) => [o.id, o]));
  const pt = (r: any): [number, number] => (typeof r === "string" ? [byId[r]?.x ?? 0, byId[r]?.z ?? 0] : (r as [number, number]));

  // kamera: dari `from` ke `to`. Bisa menunjuk objek: {look:"id", dist, height}
  const resolve = (c: any): Cam => {
    if (!c) return DEFAULT_CAM;
    const base = { ...DEFAULT_CAM, ...(world.cams?.[c.preset] ?? {}), ...c };
    if (c.look) { const [x, z] = pt(c.look), dist = (c.dist ?? 16) * (vertical ? 1.15 : 1), height = c.height ?? dist * 0.5; return { ...base, x: x + (c.dx ?? 0), z: z - dist, y: height, pitch: c.pitch ?? (Math.atan2(height - (c.aim ?? 1.6), dist) * 180) / Math.PI }; }
    return base;
  };
  const from = resolve(shot.camera?.from ?? shot.camera), to = resolve(shot.camera?.to ?? shot.camera?.from ?? shot.camera);
  const mixed = mixCam(from, to, smooth(p / (shot.camera?.arrive ?? 1)));
  const cam: Cam = { ...mixed, x: mixed.x + Math.sin(frame / 47) * 0.12, y: mixed.y + Math.sin(frame / 61) * 0.08 }; // napas kamera: tidak pernah diam

  const sprites: { d: number; el: React.ReactNode }[] = [];
  const boxes: { id: string; d: number; x0: number; x1: number; y0: number; y1: number }[] = []; // untuk menyembunyikan label yang tertutup
  const moveChips: React.ReactNode[] = [];
  const hi = new Set((shot.highlight ?? []).filter((x: any) => p >= (x.at ?? 0) && p <= (x.until ?? 2)).map((x: any) => x.id));
  const place = (key: string, o: any, seed: number, opacity = 1, extraY = 0) => {
    const sz = sizeOf(o.asset), sc = o.scale ?? 1, q = project(cam, w, h, o.x, (o.y ?? 0) + extraY, o.z);
    if (!q) return; const pw = sz.w * sc * q.s, ph = sz.h * sc * q.s;
    if (q.sx + pw < 0 || q.sx - pw > w || q.sy - ph > h || q.sy < -ph || ph < 3) return;
    if (o.id && sz.w >= 2) boxes.push({ id: o.id, d: q.d, x0: q.sx - pw / 2, x1: q.sx + pw / 2, y0: q.sy - ph, y1: q.sy });
    sprites.push({ d: q.d, el: (<g key={key} opacity={opacity}>
      {!extraY && !o.y && <ellipse cx={q.sx} cy={q.sy} rx={pw * 0.48} ry={pw * 0.1} fill="#00000028" />}
      {hi.has(o.id) && <ellipse cx={q.sx} cy={q.sy} rx={pw * (0.7 + 0.06 * Math.sin(frame / 5))} ry={pw * 0.2} fill="#ffd23f66" stroke="#ffd23f" strokeWidth={Math.max(3, q.s * 0.12)} />}
      <Sprite asset={o.asset} x={q.sx - pw / 2} y={q.sy - ph} w={pw} h={ph} color={o.color} frame={frame} seed={seed} lit={m.lit} emo={shot.emo?.[o.id] ?? o.emo} />
    </g>) });
  };
  // sebaran aset kecil (membuat dunia terasa kaya)
  (world.scatter ?? []).forEach((s: any, k: number) => {
    const [x0, z0, x1, z1] = s.area;
    for (let i = 0; i < s.count; i++) {
      const x = x0 + rnd(k * 1000 + i) * (x1 - x0), z = z0 + rnd(k * 1000 + i + 0.5) * (z1 - z0);
      if (objs.some((o) => Math.abs(o.x - x) < sizeOf(o.asset).w * (o.scale ?? 1) * 0.8 && Math.abs(o.z - z) < 3)) continue;
      place(`s${k}-${i}`, { asset: s.asset, x, z, scale: (s.scale ?? 1) * (0.75 + rnd(i + k) * 0.5) }, i);
    }
  });
  // objek utama; shot.show/hide/grow mengubah keadaan
  objs.forEach((o, i) => {
    const hide = (shot.hide ?? []).find((x: any) => x.id === o.id), show = (shot.show ?? []).find((x: any) => x.id === o.id), grow = (shot.grow ?? []).find((x: any) => x.id === o.id);
    if (o.hidden && !show) return;
    const op = show ? ease((p - (show.at ?? 0)) / 0.1) : hide ? 1 - ease((p - (hide.at ?? 0)) / 0.1) : 1;
    if (op <= 0.01) return;
    const k = grow ? 1 + (grow.to - 1) * smooth((p - (grow.at ?? 0)) / (grow.dur ?? 0.3)) : 1;
    const bounce = hi.has(o.id) ? Math.abs(Math.sin(frame / 7)) * 0.25 : 0;
    place(o.id, { ...o, scale: (o.scale ?? 1) * k * (show ? 0.6 + 0.4 * op : 1) }, i + 1, op, bounce);
  });
  // benda yang berpindah (uang, pesan, kartu): inti "perlihatkan prosesnya"
  const sfx: { at: number; name: string }[] = [];
  (shot.moves ?? []).forEach((mv: any, i: number) => {
    const at = mv.at ?? 0.1, d = mv.dur ?? 0.4; sfx.push({ at: Math.round(at * dur), name: mv.asset === "coin" ? "coin" : "whoosh" });
    if (p < at || p > at + d + (mv.hold ?? 0.08)) return;
    const route: [number, number][] = [pt(mv.from), ...((mv.via ?? []) as any[]).map(pt), pt(mv.to)];
    const t = smooth((p - at) / d) * (route.length - 1), seg = Math.min(route.length - 2, Math.floor(t)), u = t - seg;
    const x = route[seg][0] + (route[seg + 1][0] - route[seg][0]) * u, z = route[seg][1] + (route[seg + 1][1] - route[seg][1]) * u;
    const lift = 1.6 + Math.sin(u * Math.PI) * (mv.arc ?? 2.4);
    place(`m${i}`, { asset: mv.asset ?? "envelope", x, z: z - 0.01, scale: mv.scale ?? 1.2 }, i, 1, lift);
    const q = project(cam, w, h, x, lift, z);
    if (q && mv.label) moveChips.push(<Chip key={`ml${i}`} x={clamp(q.sx, w * 0.25, w * 0.75)} y={q.sy + 14} text={mv.label} fs={vertical ? 44 : 36} dark />);
  });
  sprites.sort((a, b) => b.d - a.d);

  const horizon = project(cam, w, h, cam.x + Math.sin((cam.yaw * Math.PI) / 180) * 5000, 0, cam.z + Math.cos((cam.yaw * Math.PI) / 180) * 5000)?.sy ?? h * 0.3;
  // jalur di tanah, tergambar bertahap
  const paths = (world.paths ?? []).map((pa: any) => {
    const reveal = (shot.paths ?? []).find((x: any) => x.id === pa.id);
    const t = reveal ? smooth((p - (reveal.at ?? 0)) / (reveal.dur ?? 0.35)) : pa.hidden ? 0 : 1; if (t <= 0) return null;
    const route: [number, number][] = pa.points.map(pt), half = (pa.width ?? 0.7) / 2, n = route.length - 1, end = t * n;
    return route.slice(0, -1).map((a, i) => { if (i >= end) return null; const f = Math.min(1, end - i), b: [number, number] = [a[0] + (route[i + 1][0] - a[0]) * f, a[1] + (route[i + 1][1] - a[1]) * f];
      const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz) || 1, nx = (-dz / len) * half, nz = (dx / len) * half;
      return <polygon key={`${pa.id}-${i}`} points={groundPoly(cam, w, h, [[a[0] + nx, a[1] + nz], [b[0] + nx, b[1] + nz], [b[0] - nx, b[1] - nz], [a[0] - nx, a[1] - nz]], 0.02)} fill={(reveal?.color ?? pa.color) || "#e6d3a8"} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />; });
  });
  // angka/label menempel pada benda
  const labels = [...objs.filter((o) => o.label && !o.hidden).map((o) => ({ id: o.id, text: o.label, small: true })), ...(shot.callouts ?? [])].map((c: any, i: number) => {
    const o = byId[c.id]; if (!o || p < (c.at ?? 0) || p > (c.until ?? 2)) return null;
    const top = sizeOf(o.asset).h * (o.scale ?? 1) + (c.small ? 0.3 : 2.2), q = project(cam, w, h, o.x, c.small ? 0 : top, o.z); if (!q) return null;
    const a = c.small ? 1 : ease((p - (c.at ?? 0)) / 0.08), fs = c.small ? (vertical ? 32 : 28) : vertical ? 84 : 76;
    const sx = clamp(q.sx, c.small ? 0 : w * 0.2, c.small ? w : w * 0.8), sy = c.small ? q.sy + fs * 0.2 : clamp(q.sy, h * 0.14, h * 0.6);
    if (c.small) {
      if (q.sx < 40 || q.sx > w - 40 || q.d > (world.labelFar ?? 75)) return null;
      if (boxes.some((b) => b.id !== c.id && b.d < q.d - 1 && sx > b.x0 && sx < b.x1 && sy > b.y0 && sy < b.y1)) return null; // tertutup benda di depannya
      return <Chip key={`l${i}`} x={clamp(sx, fs * 3.5, w - fs * 3.5)} y={sy} text={c.text} fs={fs} />;
    }
    return <text key={`c${i}`} x={sx} y={sy} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={fs * (0.6 + 0.4 * a)} fill={c.color ?? "#fff"} stroke={INK} strokeWidth={fs * 0.18} paintOrder="stroke" opacity={a}>{c.text}</text>;
  });
  (shot.callouts ?? []).forEach((c: any) => sfx.push({ at: Math.round((c.at ?? 0) * dur), name: "pop" }));

  return (
    <AbsoluteFill>
      <svg width={w} height={h}>
        <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={m.top} /><stop offset="1" stopColor={m.low} /></linearGradient>
          <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={m.low} stopOpacity="0" /><stop offset="0.45" stopColor={m.low} stopOpacity="0.6" /><stop offset="1" stopColor={m.low} stopOpacity="0" /></linearGradient></defs>
        <rect width={w} height={h} fill="url(#sky)" />
        {m.lit && shot.mood !== "dusk" && Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={rnd(i) * w} cy={rnd(i + 9) * Math.max(0, horizon)} r={1.5 + rnd(i + 3) * 2} fill="#fff" opacity={0.5 + 0.4 * Math.sin(frame / 11 + i)} />)}
        {[0, 1, 2, 3].map((i) => <path key={i} transform={`translate(${((rnd(i) * w + frame * (0.5 + i * 0.2)) % (w + 400)) - 200},${horizon - 120 - rnd(i + 5) * Math.max(60, horizon - 200)})`} d="M0,40 a30,30 0 0 1 22,-48 a40,40 0 0 1 76,-8 a30,30 0 0 1 20,56z" fill="#fff" opacity={m.lit ? 0.18 : 0.8} />)}
        <path d={`M0,${horizon} ${Array.from({ length: 9 }).map((_, i) => `Q${(i + 0.5) * (w / 8) - cam.x * 4},${horizon - 40 - rnd(i + 20) * 90} ${(i + 1) * (w / 8) - cam.x * 4},${horizon - rnd(i + 30) * 20}`).join(" ")} L${w},${h} L0,${h}Z`} fill={m.ground} stroke={INK} strokeWidth={1.5} />
        <rect x={0} y={horizon} width={w} height={h - horizon} fill={world.ground ?? m.ground} />
        {(world.areas ?? []).map((a: any, i: number) => <polygon key={i} points={groundPoly(cam, w, h, a.points)} fill={a.color} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />)}
        {paths}
        <rect x={0} y={horizon - h * 0.05} width={w} height={h * 0.11} fill="url(#haze)" />
        {sprites.map((s) => s.el)}
        <rect width={w} height={h} fill={m.shade} style={{ mixBlendMode: "multiply" }} />
        {labels}
        {moveChips}
      </svg>
      {sfx.map((s, i) => <Sequence key={i} from={s.at} durationInFrames={40}><Audio src={staticFile(`sfx/${s.name}.wav`)} volume={0.28} /></Sequence>)}
    </AbsoluteFill>
  );
};

const Chip: React.FC<{ x: number; y: number; text: string; fs: number; dark?: boolean }> = ({ x, y, text, fs, dark }) => { const wd = text.length * fs * 0.6 + fs; return (
  <g><rect x={x - wd / 2} y={y} width={wd} height={fs * 1.45} rx={fs * 0.35} fill={dark ? INK : "#fff6df"} stroke={INK} strokeWidth={3} /><text x={x} y={y + fs * 1.05} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={fs} fill={dark ? "#fff6df" : INK}>{text}</text></g>); };
