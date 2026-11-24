// Turunkan 04-visual-spec.json, 04-stage.base.json, 04-broll-plan.json dari 03-script.json (tanpa LLM) dan validasi kontraknya.
// Kontrak: lihat produksi/CONTRACT.md. Pemakaian: node scripts/produksi/build-visual.mjs --track T01 --siklus 001 [--check]
import path from "node:path"; import { args, resolveCycle, readJson, writeJson } from "./lib.mjs"; import { VOCAB as V } from "./vocab.mjs";
const o = args(); const { dir, scriptPath } = resolveCycle(o.track, o.siklus); const script = readJson(scriptPath);
const errs = []; const warn = []; const e = (id, m) => errs.push(`${id}: ${m}`); const inList = (id, what, v, list) => { if (v !== undefined && !list.includes(v)) e(id, `${what} "${v}" tidak dikenal (${list.join("|")})`); };
const vspec = {}, stage = {}, broll = { _catatan: "Dibangun dari 03-script.json (scene.broll). Footage nyata berlisensi, 20-30% durasi, tersebar, maks. 2 berurutan." };
const ids = new Set(script.scenes.map((s) => s.id));
for (const s of script.scenes) {
  const id = s.id, st = s.stage, sp = s.visual?.spec;
  if (!st) { e(id, "tanpa `stage`"); continue; }
  if (sp) { vspec[id] = sp; const need = sp.headline ? [] : V.spec[sp.kind ?? "flow"]; if (!sp.headline && !V.spec[sp.kind ?? "flow"]) e(id, `spec.kind "${sp.kind}" tidak dikenal`); for (const k of need ?? []) if (sp[k] === undefined) e(id, `spec ${sp.kind ?? "flow"} tanpa bidang "${k}"`); }
  if (st.insert && !sp) e(id, "stage.insert tanpa visual.spec"); if (st.insert) inList(id, "insert.pos", st.insert.pos ?? "full", V.insertPos);
  inList(id, "bg", st.bg ?? "paper", V.bg); const labels = new Set();
  const actorIds = new Set((st.actors ?? []).map((a) => a.id));
  for (const a of st.actors ?? []) { inList(id, "aktor.kind", a.kind, V.actors); inList(id, "emo", a.emo, V.emo); inList(id, "pose", a.pose, V.pose); inList(id, "from", a.from, V.from); inList(id, "acc", a.acc, V.acc); if (a.x === undefined || a.x < 0 || a.x > 1) e(id, `aktor ${a.id}: x harus 0..1`); if (a.say) { if (!a.say.text) e(id, `aktor ${a.id}: say tanpa text`); else if (a.say.text.length > 44) warn.push(`${id}: bubble ${a.id} ${a.say.text.length} huruf (>44, mudah menutup isi)`); inList(id, "say.tone", a.say.tone, V.tone); } for (const [, em] of a.emoAt ?? []) inList(id, "emoAt", em, V.emo); }
  for (const f of st.fx ?? []) { inList(id, "fx.type", f.type, V.fx); if (f.type === "packet") { inList(id, "packet.kind", f.kind ?? "msg", V.packetKind); for (const r of [f.from, f.to]) if (typeof r === "string" && !actorIds.has(r)) e(id, `packet merujuk aktor "${r}" yang tidak ada`); } }
  if (s.broll && !s.broll.keywords?.length && !s.broll.keep) e(id, "broll tanpa keywords/keep");
  stage[id] = st; if (s.broll) broll[id] = s.broll;
}
for (const f of script.shorts_cuts ?? []) for (const i of f.scene_ids) if (!ids.has(i)) e(f.name, `scene ${i} tidak ada`);
// komposisi footage
const fb = script.scenes.filter((s) => s.broll); let run = 0, mx = 0; script.scenes.forEach((s) => { run = s.broll ? run + 1 : 0; mx = Math.max(mx, run); });
if (mx > 2) warn.push(`${mx} scene broll berurutan (maks. 2)`); const share = fb.reduce((a, s) => a + (s.duration_ms?.en ?? 6000), 0) / script.scenes.reduce((a, s) => a + (s.duration_ms?.en ?? 6000), 0);
if (script.scenes.length > 10 && (share < 0.1 || share > 0.34)) warn.push(`porsi broll ${(share * 100).toFixed(0)}% di luar 10-34% (target 20-30%)`);
for (const w of warn) console.log("  peringatan:", w);
if (errs.length) { console.log(`KONTRAK TIDAK VALID (${errs.length}):`); for (const x of errs) console.log("  -", x); process.exit(1); }
if (!o.check) { writeJson(path.join(dir, "04-visual-spec.json"), vspec); writeJson(path.join(dir, "04-stage.base.json"), stage); writeJson(path.join(dir, "04-broll-plan.json"), broll); }
console.log(`${o.check ? "valid" : "ditulis"}: ${Object.keys(vspec).length} spec, ${Object.keys(stage).length} adegan, ${fb.length} scene broll`);
