// Penyusun satu shot 3D untuk 04-shots.tsx: lingkungan, kamera orbit dari a ke b, isi, dan label pil yang menempel pada titik 3D.
import React from "react";
import { Easing } from "remotion";
import { useShot } from "../context";
import { shot, ShotDef } from "../registry";
import { Frame, Pill, Ptr, W, clamp, seg } from "../kit";
import { Cam, Sky, V3, World, project } from "./core";
import { SKIES, Sea, Station, Studio, Tokyo, Yard } from "./sets";

export type A = {
  t: number; dur: number;
  /** detik (relatif shot) saat kata diucapkan; d bila tidak ada */
  w: (text: string, d?: number) => number;
};
export type Env = "jkt" | "hot" | "jktDay" | "jktGrey" | "tokyo" | "yard" | "yardDusk" | "yardNight" | "paper" | "grey" | "night" | "dusk" | "sea" | "map" | "mapStudio";
export type CamSpec = Partial<Cam> | [Partial<Cam>, Partial<Cam>];
export type Lb = [string, V3 | ((a: A) => V3), Ptr?, string?];
export type Spec = {
  env: Env; cam?: CamSpec; items: (a: A) => React.ReactNode; labels?: Lb[];
  /** komposisi tegak: titik x dunia yang dipusatkan dan pengali jarak kamera */
  vx?: number; vd?: number; aperture?: number; focus?: number; track?: boolean; canopy?: boolean; parked?: boolean;
};
const BASE: Cam = { at: [0, 3, 0], d: 18.5, yaw: 0, pitch: 13, fov: 35 };
const SKY_OF: Record<Env, string> = { jkt: "jkt", hot: "hot", jktDay: "day", jktGrey: "grey", tokyo: "tokyo", yard: "day", yardDusk: "dusk", yardNight: "night", paper: "paper", grey: "grey", night: "night", dusk: "dusk", sea: "sea", map: "map", mapStudio: "map" };

const Environment: React.FC<{ s: Spec; t: number }> = ({ s, t }) => {
  switch (s.env) {
    case "jkt": case "hot": case "jktDay": case "jktGrey": return <Station t={t} sky={SKY_OF[s.env] as "jkt"} track={s.track} canopy={s.canopy} />;
    case "tokyo": return <Tokyo t={t} track={s.track} parked={s.parked} />;
    case "yard": case "yardDusk": case "yardNight": return <Yard t={t} sky={SKY_OF[s.env] as "day"} />;
    case "sea": return <Sea t={t} />;
    case "map": return null;
    case "mapStudio": return <Studio t={t} sky="map" />;
    default: return <Studio t={t} sky={s.env as "paper"} />;
  }
};

const Shot3D: React.FC<{ spec: Spec }> = ({ spec }) => {
  const c = useShot(); const { t, dur, vertical } = c;
  const a: A = { t, dur, w: (text, d = 0.6) => { const v = c.word(text); return Number.isFinite(v) ? v : d; } };
  const pair = Array.isArray(spec.cam) ? spec.cam : [spec.cam ?? {}, undefined];
  const from: Cam = { ...BASE, ...pair[0] };
  const to: Cam = pair[1] ? { ...from, ...pair[1] } : { ...from, yaw: from.yaw + 9, d: from.d * 0.92 };
  const u = seg(t, 0, Math.max(dur + 0.3, 2), Easing.inOut(Easing.sin));
  const m = (x: number, y: number) => x + (y - x) * u;
  let cam: Cam = {
    at: [m(from.at[0], to.at[0]), m(from.at[1], to.at[1]), m(from.at[2], to.at[2])], d: m(from.d, to.d),
    yaw: m(from.yaw, to.yaw) + Math.sin(t * 0.55 + c.index) * 0.7, pitch: m(from.pitch, to.pitch) + Math.cos(t * 0.43 + c.index) * 0.35, fov: m(from.fov ?? 35, to.fov ?? 35),
  };
  if (vertical) cam = { ...cam, at: [spec.vx ?? cam.at[0], cam.at[1], cam.at[2]], d: cam.d * (spec.vd ?? 1.75), yaw: cam.yaw * 0.7 };
  const sky: Sky = SKIES[SKY_OF[spec.env]];
  const half = vertical ? 303 : 960;
  return (
    <>
      <World sky={sky} cam={cam} focus={spec.focus ? (spec.focus * cam.d) / from.d : cam.d} aperture={spec.aperture ?? (spec.env === "map" ? 2.4 : 3.2)} dpr={vertical ? 1.5 : 1}>
        <Environment s={spec} t={c.T + c.index * 7} />
        {spec.items(a)}
      </World>
      <Frame vignette={0}>
        {(spec.labels ?? []).map(([text, at, ptr = "down", bg = "#e2573d"], i) => {
          const p = typeof at === "function" ? at(a) : at; let [x, y] = project(cam, p);
          const size = vertical ? 38 : 46, width = text.length * size * 0.62 + size * 1.2;
          const reach = ptr === "left" || ptr === "right" ? width + 20 : width / 2;
          x = clamp(x, W / 2 - half + (ptr === "right" ? reach : ptr === "left" ? 0 : reach) + 24, W / 2 + half - (ptr === "left" ? reach : ptr === "right" ? 0 : reach) - 24);
          y = clamp(y, ptr === "up" ? 60 : 130, 900);
          return <Pill key={text + i} x={x} y={y} text={text} p={c.label(text)} bg={bg} ptr={ptr} size={size} />;
        })}
      </Frame>
    </>
  );
};
/** Daftarkan satu shot 3D. from = titik asal iris/dorong di layar saat shot ini masuk. */
export const s3 = (spec: Spec, from?: [number, number]): ShotDef => shot((() => <Shot3D spec={spec} />) as React.FC, { labels: "own", drift: false, bubble: "own", from });
