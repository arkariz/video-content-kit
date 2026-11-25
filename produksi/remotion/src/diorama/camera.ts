// Proyeksi perspektif sederhana. Dunia: x ke kanan, z menjauh, y ke atas (satuan bebas, "meter").
export type Cam = { x: number; y: number; z: number; pitch: number; yaw: number; fov: number };
export const DEFAULT_CAM: Cam = { x: 0, y: 14, z: -26, pitch: 24, yaw: 0, fov: 50 };
export type Projected = { sx: number; sy: number; s: number; d: number }; // s = piksel per satuan dunia, d = kedalaman
const rad = (v: number) => (v * Math.PI) / 180;
export const focal = (c: Cam, w: number, h: number) => (Math.min(w, h * 0.72) / 2) / Math.tan(rad(c.fov) / 2);
/** Titik dunia -> ruang kamera. */
export const toCam = (c: Cam, x: number, y: number, z: number) => {
  const dx = x - c.x, dy = y - c.y, dz = z - c.z, cy = Math.cos(rad(c.yaw)), sy = Math.sin(rad(c.yaw));
  const rx = dx * cy - dz * sy, rz = dx * sy + dz * cy, cp = Math.cos(rad(c.pitch)), sp = Math.sin(rad(c.pitch));
  return { x: rx, y: dy * cp + rz * sp, z: rz * cp - dy * sp };
};
export const NEAR = 0.8;
export const project = (c: Cam, w: number, h: number, x: number, y: number, z: number): Projected | null => {
  const p = toCam(c, x, y, z); if (p.z < NEAR) return null; const s = focal(c, w, h) / p.z;
  return { sx: w / 2 + p.x * s, sy: h / 2 - p.y * s, s, d: p.z };
};
/** Poligon di tanah, dipotong di bidang dekat supaya tidak terbalik saat kamera melewatinya. */
export const groundPoly = (c: Cam, w: number, h: number, pts: [number, number][], y = 0): string => {
  const cs = pts.map(([x, z]) => toCam(c, x, y, z)); const out: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < cs.length; i++) { const a = cs[i], b = cs[(i + 1) % cs.length], ia = a.z >= NEAR, ib = b.z >= NEAR; if (ia) out.push(a);
    if (ia !== ib) { const t = (NEAR - a.z) / (b.z - a.z); out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: NEAR }); } }
  const f = focal(c, w, h); return out.map((p) => `${(w / 2 + (p.x * f) / p.z).toFixed(1)},${(h / 2 - (p.y * f) / p.z).toFixed(1)}`).join(" ");
};
export const mixCam = (a: Cam, b: Cam, t: number): Cam => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t, pitch: a.pitch + (b.pitch - a.pitch) * t, yaw: a.yaw + (b.yaw - a.yaw) * t, fov: a.fov + (b.fov - a.fov) * t });
