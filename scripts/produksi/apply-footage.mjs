// Sesuaikan 04-stage.json untuk scene yang memakai footage nyata: latar footage, satu komentator kecil di sisi kanan.
import path from "node:path";
import { args, resolveCycle, readJson, writeJson } from "./lib.mjs";
const o = args(); const { dir, assetsPath } = resolveCycle(o.track, o.siklus);
const stageP = path.join(dir, "04-stage.json"); const stage = readJson(path.join(dir, "04-stage.base.json")); const assets = readJson(assetsPath, { footage: [] });
let n = 0;
for (const f of assets.footage) {
  const s = stage[f.scene_id]; if (!s) continue;
  const talker = (s.actors || []).find((a) => a.say) || (s.actors || [])[0];
  stage[f.scene_id] = { bg: "none", cam: s.cam, actors: talker ? [{ ...talker, x: 0.86, scale: 0.7, from: "right", label: talker.label }] : [], fx: [], footage: true };
  n++;
}
writeJson(stageP, stage); console.log(`${n} scene diubah ke footage nyata`);
