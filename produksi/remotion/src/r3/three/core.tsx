// Lapisan 3D R3 (gaya-visual.md bagian 4): kanvas three.js dengan kamera orbit deterministik, cahaya kartun, bayangan,
// kabut jarak, dan blur kedalaman (depth of field). Satuan: 1 = ±100 px logis pada bidang fokus. Tanah di y=0.
import React from "react";
import * as THREE from "three";
import { ThreeCanvas } from "@remotion/three";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type V3 = [number, number, number];
export type Cam = { at: V3; d: number; yaw: number; pitch: number; fov?: number };
export type Sky = { top: string; mid: string; low: string; fog: string; sun?: string; sunAt?: [number, number]; key?: string; amb?: string; ground?: string };

/* ------------------------------ kamera ------------------------------ */
const D2R = Math.PI / 180;
export const camPos = (c: Cam): V3 => [c.at[0] + c.d * Math.sin(c.yaw * D2R) * Math.cos(c.pitch * D2R), c.at[1] + c.d * Math.sin(c.pitch * D2R), c.at[2] + c.d * Math.cos(c.yaw * D2R) * Math.cos(c.pitch * D2R)];
export const mixCam = (a: Cam, b: Cam, p: number): Cam => {
  const m = (x: number, y: number) => x + (y - x) * p;
  return { at: [m(a.at[0], b.at[0]), m(a.at[1], b.at[1]), m(a.at[2], b.at[2])], d: m(a.d, b.d), yaw: m(a.yaw, b.yaw), pitch: m(a.pitch, b.pitch), fov: m(a.fov ?? 35, b.fov ?? 35) };
};
const probe = new THREE.PerspectiveCamera(35, 16 / 9, 0.1, 600);
/** Proyeksi titik dunia ke layar logis 1920x1080 (untuk label yang menempel pada benda). */
export const project = (c: Cam, p: V3): [number, number] => {
  probe.fov = c.fov ?? 35; probe.position.set(...camPos(c)); probe.lookAt(...c.at); probe.updateProjectionMatrix(); probe.updateMatrixWorld();
  const v = new THREE.Vector3(...p).project(probe); return [(v.x + 1) * 960, (1 - v.y) * 540];
};

/* ------------------------------ geometri dan material (cache) ------------------------------ */
const GC = new Map<string, THREE.BufferGeometry>();
const cached = <T extends THREE.BufferGeometry>(k: string, f: () => T): T => { let g = GC.get(k); if (!g) { g = f(); GC.set(k, g); } return g as T; };
export const G = {
  box: (w: number, h: number, d: number, r = 0) => cached(`b${w},${h},${d},${r}`, () => (r > 0 ? new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2, h / 2, d / 2) * 0.999) : new THREE.BoxGeometry(w, h, d))),
  cyl: (rt: number, rb: number, h: number, n = 28) => cached(`c${rt},${rb},${h},${n}`, () => new THREE.CylinderGeometry(rt, rb, h, n)),
  ball: (r: number, n = 28) => cached(`s${r},${n}`, () => new THREE.SphereGeometry(r, n, Math.round(n * 0.7))),
  dome: (r: number) => cached(`d${r}`, () => new THREE.SphereGeometry(r, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2)),
  torus: (r: number, tube: number, arc = Math.PI * 2) => cached(`t${r},${tube},${arc}`, () => new THREE.TorusGeometry(r, tube, 10, 40, arc)),
  cone: (r: number, h: number, n = 20) => cached(`k${r},${h},${n}`, () => new THREE.ConeGeometry(r, h, n)),
  plane: (w: number, h: number, sx = 1, sy = 1) => cached(`p${w},${h},${sx},${sy}`, () => new THREE.PlaneGeometry(w, h, sx, sy)),
  /** bentuk 2D (titik x,y) diekstrusi setebal depth, dipusatkan di z, dengan bevel kecil */
  ext: (key: string, make: () => THREE.Shape | THREE.Shape[], depth: number, bevel = 0.04) => cached(`e${key},${depth},${bevel}`, () => {
    const g = new THREE.ExtrudeGeometry(make(), { depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 24 });
    g.translate(0, 0, -depth / 2); return g;
  }),
};
export const poly = (pts: [number, number][]) => { const s = new THREE.Shape(); pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y))); s.closePath(); return s; };

let GRAD: THREE.DataTexture | null = null;
const gradient = () => {
  if (!GRAD) {
    const v = [118, 150, 196, 236, 255]; const data = new Uint8Array(v.flatMap((x) => [x, x, x, 255]));
    GRAD = new THREE.DataTexture(data, v.length, 1, THREE.RGBAFormat); GRAD.minFilter = THREE.LinearFilter; GRAD.magFilter = THREE.LinearFilter; GRAD.needsUpdate = true;
  }
  return GRAD;
};
const MC = new Map<string, THREE.Material>();
export type MatOpts = { glow?: number; opacity?: number; basic?: boolean; side?: boolean; noFog?: boolean };
export const mat = (color: string, o: MatOpts = {}) => {
  const op = o.opacity === undefined ? 1 : Math.round(Math.max(0, Math.min(1, o.opacity)) * 50) / 50;
  const k = `${color}|${o.glow ?? 0}|${op}|${o.basic ? 1 : 0}|${o.side ? 1 : 0}|${o.noFog ? 1 : 0}`;
  let m = MC.get(k);
  if (!m) {
    const base = { color: new THREE.Color(color), transparent: op < 1, opacity: op, depthWrite: op > 0.6, side: o.side ? THREE.DoubleSide : THREE.FrontSide, fog: !o.noFog };
    m = o.basic ? new THREE.MeshBasicMaterial(base) : new THREE.MeshToonMaterial({ ...base, gradientMap: gradient(), emissive: new THREE.Color(color), emissiveIntensity: o.glow ?? 0.04 });
    MC.set(k, m);
  }
  return m;
};

/* ------------------------------ primitif ------------------------------ */
export type MProps = { g: THREE.BufferGeometry; c: string; p?: V3; r?: V3; s?: V3 | number; o?: MatOpts; noShadow?: boolean; noReceive?: boolean; children?: React.ReactNode };
export const M: React.FC<MProps> = ({ g, c, p, r, s, o, noShadow, noReceive, children }) => (
  <mesh geometry={g} material={mat(c, o)} position={p} rotation={r} scale={s} castShadow={!noShadow && !o?.basic && (o?.opacity ?? 1) > 0.6} receiveShadow={!noReceive}>{children}</mesh>
);
export const Gr: React.FC<{ p?: V3; r?: V3; s?: V3 | number; children?: React.ReactNode }> = ({ p, r, s, children }) => <group position={p} rotation={r} scale={s}>{children}</group>;
const UP = new THREE.Vector3(0, 1, 0);
/** Batang silinder dari a ke b (dipakai untuk tangan/kaki selang, rel, kabel, garis). */
export const Rod: React.FC<{ a: V3; b: V3; w: number; c: string; o?: MatOpts; noShadow?: boolean }> = ({ a, b, w, c, o, noShadow }) => {
  const d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]); const L = d.length(); if (L < 1e-4) return null;
  const q = new THREE.Quaternion().setFromUnitVectors(UP, d.normalize());
  return <mesh geometry={G.cyl(1, 1, 1, 14)} material={mat(c, o)} position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} quaternion={q} scale={[w, L, w]} castShadow={!noShadow} />;
};
/** Garis melengkung (kuadratik) a→b lewat kontrol c, tebal w. upto 0..1 = bagian yang sudah tergambar. */
export const Hose: React.FC<{ a: V3; c: V3; b: V3; w: number; color: string; n?: number; upto?: number; o?: MatOpts; dashed?: boolean; noShadow?: boolean }> = ({ a, c, b, w, color, n = 8, upto = 1, o, dashed, noShadow }) => {
  const at = (u: number): V3 => [0, 1, 2].map((i) => (1 - u) * (1 - u) * a[i] + 2 * (1 - u) * u * c[i] + u * u * b[i]) as V3;
  const pts = Array.from({ length: n + 1 }, (_, i) => at((i / n) * upto));
  return (
    <group>
      {pts.slice(1).map((q, i) => (dashed && i % 2 ? null : <Rod key={i} a={pts[i]} b={q} w={w} c={color} o={o} noShadow={noShadow} />))}
      {!dashed && pts.map((q, i) => <M key={"j" + i} g={G.ball(1, 12)} c={color} p={q} s={w} o={o} noShadow={noShadow} />)}
    </group>
  );
};

/* ------------------------------ teks pada benda ------------------------------ */
const TC = new Map<string, THREE.CanvasTexture>();
export const TextPlane: React.FC<{ text: string; h: number; color: string; bg?: string; border?: string; p?: V3; r?: V3; opacity?: number }> = ({ text, h, color, bg, border, p, r, opacity = 1 }) => {
  const k = `${text}|${color}|${bg}|${border}`;
  let t = TC.get(k);
  if (!t) {
    const cv = document.createElement("canvas"); const x = cv.getContext("2d")!; const font = "800 160px 'Avenir Next','Helvetica Neue',Arial,sans-serif";
    x.font = font; cv.width = Math.ceil(x.measureText(text).width + 140); cv.height = 240; x.font = font;
    if (bg) { x.fillStyle = bg; x.beginPath(); x.roundRect(8, 8, cv.width - 16, 224, 34); x.fill(); }
    if (border) { x.strokeStyle = border; x.lineWidth = 16; x.beginPath(); x.roundRect(12, 12, cv.width - 24, 216, 30); x.stroke(); }
    x.fillStyle = color; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(text, cv.width / 2, 128);
    t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; TC.set(k, t);
  }
  const img = t.image as HTMLCanvasElement;
  return (
    <mesh position={p} rotation={r}>
      <planeGeometry args={[(h * img.width) / img.height, h]} />
      <meshBasicMaterial map={t} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};

/* ------------------------------ pasca-proses: kedalaman + langit ------------------------------ */
const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const FRAG = `
precision highp float; varying vec2 vUv;
uniform sampler2D tColor; uniform sampler2D tDepth; uniform vec2 texel; uniform float near, far, focus, aperture, maxR, px;
uniform vec3 skyTop, skyMid, skyLow, sunColor; uniform vec2 sunAt; uniform float sunOn, vig;
float viewZ(vec2 uv){ float d = texture2D(tDepth, uv).x; float z = d * 2.0 - 1.0; return (2.0 * near * far) / (far + near - z * (far - near)); }
float coc(float z){ float rel = (z - focus) / max(z, 0.001); float a = abs(rel) - (rel < 0.0 ? 0.07 : 0.09); return clamp(a * aperture, 0.0, 1.0) * maxR * px; }
void main(){
  float cz = viewZ(vUv); float cs = coc(cz); vec4 col = texture2D(tColor, vUv); float tot = 1.0; float R = 0.9; float lim = maxR * px;
  for (float ang = 0.0; R < lim; ang += 2.39996323) {
    vec2 uv = vUv + vec2(cos(ang), sin(ang)) * texel * R; vec4 s = texture2D(tColor, uv);
    float sz = viewZ(uv); float ss = coc(sz); if (sz > cz) ss = clamp(ss, 0.0, cs * 2.0);
    float m = smoothstep(R - 0.8, R + 0.8, ss); col += mix(col / tot, s, m); tot += 1.0; R += (1.25 * px * px) / R;
  }
  col /= tot;
  float y = vUv.y;
  vec3 sky = y > 0.52 ? mix(skyMid, skyTop, smoothstep(0.52, 1.0, y)) : mix(skyLow, skyMid, smoothstep(0.1, 0.52, y));
  vec2 q = (vUv - sunAt) * vec2(1.7778, 1.0); sky += sunColor * sunOn * exp(-dot(q, q) * 9.0) * 0.55;
  vec3 rgb = col.rgb + sky * (1.0 - clamp(col.a, 0.0, 1.0));
  vec2 v = (vUv - 0.5) * vec2(1.25, 1.0); rgb *= 1.0 - vig * smoothstep(0.28, 0.82, dot(v, v) * 1.5);
  gl_FragColor = vec4(rgb, 1.0);
  #include <colorspace_fragment>
}`;
const lin = (c: string) => new THREE.Color(c);

const Post: React.FC<{ sky: Sky; cam: Cam; focus: number; aperture: number; maxR: number }> = ({ sky, cam, focus, aperture, maxR }) => {
  const gl = useThree((s) => s.gl), scene = useThree((s) => s.scene), camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const o = React.useMemo(() => {
    const rt = new THREE.WebGLRenderTarget(4, 4, { samples: 4, type: THREE.HalfFloatType, depthTexture: new THREE.DepthTexture(4, 4) });
    const m = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, depthTest: false, depthWrite: false, uniforms: {
      tColor: { value: rt.texture }, tDepth: { value: rt.depthTexture }, texel: { value: new THREE.Vector2() }, near: { value: 0.5 }, far: { value: 500 }, focus: { value: 18 }, aperture: { value: 3 }, maxR: { value: 16 }, px: { value: 1 },
      skyTop: { value: new THREE.Color() }, skyMid: { value: new THREE.Color() }, skyLow: { value: new THREE.Color() }, sunColor: { value: new THREE.Color() }, sunAt: { value: new THREE.Vector2() }, sunOn: { value: 0 }, vig: { value: 0.32 } } });
    const qs = new THREE.Scene(); const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m); quad.frustumCulled = false; qs.add(quad);
    return { rt, m, qs, qc: new THREE.Camera(), v: new THREE.Vector2() };
  }, []);
  React.useEffect(() => () => { o.rt.dispose(); o.m.dispose(); }, [o]);
  useFrame(() => {
    const p = camPos(cam); camera.fov = cam.fov ?? 35; camera.near = 0.5; camera.far = 500; camera.position.set(...p); camera.lookAt(...cam.at); camera.updateProjectionMatrix(); camera.updateMatrixWorld();
    gl.getDrawingBufferSize(o.v);
    if (o.rt.width !== o.v.x || o.rt.height !== o.v.y) o.rt.setSize(o.v.x, o.v.y);
    const u = o.m.uniforms; u.texel.value.set(1 / o.v.x, 1 / o.v.y); u.px.value = o.v.x / 1920; u.focus.value = focus; u.aperture.value = aperture; u.maxR.value = maxR;
    u.skyTop.value.copy(lin(sky.top)); u.skyMid.value.copy(lin(sky.mid)); u.skyLow.value.copy(lin(sky.low)); u.sunColor.value.copy(lin(sky.sun ?? "#000000")); u.sunOn.value = sky.sun ? 1 : 0; u.sunAt.value.set(...(sky.sunAt ?? [0.75, 0.8]));
    gl.setRenderTarget(o.rt); gl.setClearColor(0x000000, 0); gl.clear(); gl.render(scene, camera);
    gl.setRenderTarget(null); gl.render(o.qs, o.qc);
  }, 1);
  return null;
};

/** Kanvas 3D satu shot. cam sudah dihitung untuk detik ini; focus = jarak tajam dari kamera. */
export const World: React.FC<{ sky: Sky; cam: Cam; focus?: number; aperture?: number; maxR?: number; dpr?: number; children: React.ReactNode }> = ({ sky, cam, focus, aperture = 3.2, maxR = 17, dpr = 1, children }) => {
  const f = focus ?? cam.d;
  const x = cam.at[0], z = cam.at[2];
  const sun = React.useMemo(() => { const o = new THREE.Object3D(); return o; }, []);
  sun.position.set(x, 0, z - 2); sun.updateMatrixWorld();
  return (
    <ThreeCanvas width={1920} height={1080} dpr={dpr} shadows flat gl={{ antialias: false, alpha: true }} camera={{ fov: cam.fov ?? 35, position: camPos(cam), near: 0.5, far: 500 }} style={{ position: "absolute", left: 0, top: 0 }}>
      <fog attach="fog" args={[sky.fog, f + 10, f + 95]} />
      <hemisphereLight args={[sky.amb ?? "#ffffff", sky.ground ?? "#8a6f8f", 1.45]} />
      <primitive object={sun} />
      <directionalLight color={sky.key ?? "#fff4de"} intensity={1.9} position={[x - 11, 17, z + 11]} target={sun} castShadow
        shadow-mapSize={[2048, 2048]} shadow-camera-left={-24} shadow-camera-right={24} shadow-camera-top={24} shadow-camera-bottom={-24} shadow-camera-near={1} shadow-camera-far={70} shadow-bias={-0.0004} shadow-normalBias={0.03} />
      <directionalLight color={sky.mid} intensity={0.75} position={[x + 12, 6, z - 9]} />
      {children}
      <Post sky={sky} cam={cam} focus={f} aperture={aperture} maxR={maxR} />
    </ThreeCanvas>
  );
};
