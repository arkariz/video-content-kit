// Subcommand: search | download. Katalog global: produksi/footage-cache/index.json
import fs from "node:fs"; import path from "node:path";
import { ROOT, args, resolveCycle, readJson, writeJson, need } from "./lib.mjs";
const o = args(); const cmd = o._[0] || "search"; const { scriptPath, assetsPath } = resolveCycle(o.track, o.siklus);
const script = readJson(scriptPath); const catPath = path.join(ROOT, "produksi/footage-cache/index.json");
const catalog = readJson(catPath, { clips: {} });
const broll = script.scenes.filter((s) => s.visual.type === "broll");

if (cmd === "plan") {
  // Pilih klip otomatis per scene dari 04-broll-plan.json: skor tag + durasi, hindari duplikat di katalog global.
  const planPath = path.join(path.dirname(scriptPath), "04-broll-plan.json"); const plan = readJson(planPath, {});
  const fps = 1; const picks = {}; const cands = {};
  const fetchHits = async (q) => {
    const out = [];
    if (process.env.PEXELS_API_KEY) { const r = await fetch(`https://api.pexels.com/videos/search?per_page=15&orientation=landscape&query=${encodeURIComponent(q)}`, { headers: { Authorization: process.env.PEXELS_API_KEY } }); for (const v of (await r.json()).videos || []) out.push({ provider: "pexels", id: String(v.id), page: v.url, tags: (v.url || "").split("/").pop().replace(/-\d+\/?$/, "").split("-"), dur: v.duration, thumb: v.image, file: (v.video_files.filter((f) => f.width >= 1280 && f.width <= 2000).sort((a, b) => a.width - b.width)[0] || v.video_files[0]).link, license: "Pexels License" }); }
    if (process.env.PIXABAY_API_KEY) { const r = await fetch(`https://pixabay.com/api/videos/?key=${process.env.PIXABAY_API_KEY}&per_page=20&q=${encodeURIComponent(q)}`); for (const v of (await r.json()).hits || []) out.push({ provider: "pixabay", id: String(v.id), page: v.pageURL, tags: v.tags.split(",").map((s) => s.trim().toLowerCase()), dur: v.duration, thumb: (v.videos.medium || v.videos.small || v.videos.tiny).thumbnail, file: (v.videos.medium || v.videos.small).url, license: "Pixabay Content License" }); }
    return out;
  };
  for (const [sceneId, pl] of Object.entries(plan)) {
    if (sceneId.startsWith("_")) continue;
    const sc = script.scenes.find((s) => s.id === sceneId); const need = ((sc?.duration_ms?.en || 6000) / 1000) + 1;
    if (pl.own) { picks[sceneId] = `own:${pl.own}`; continue; }
    if (pl.keep) { picks[sceneId] = pl.keep; continue; }
    const words = new Set(pl.keywords.flatMap((k) => k.toLowerCase().split(/\s+/))); const avoid = new Set([...(pl.avoid || []).flatMap((k) => k.toLowerCase().split(/\s+/)), "ai", "generated", "cartoon", "animation", "animated", "illustration", "vector", "3d", "loop", "motion", "graphics"]);
    const all = []; for (const q of pl.keywords) all.push(...(await fetchHits(q)));
    const seen = new Set(); const scored = all.filter((h) => !seen.has(h.provider + h.id) && seen.add(h.provider + h.id)).map((h) => {
      const tg = new Set(h.tags.map((x) => x.toLowerCase())); let s = 0; for (const w of words) if (tg.has(w) || [...tg].some((x) => x.includes(w))) s += 2; const tw = new Set([...tg].flatMap((x) => x.split(/\s+/))); for (const a of avoid) if (tw.has(a)) s -= 3;
      if (h.dur < need) s -= 4; if ((catalog.clips[`${h.provider}:${h.id}`]?.used_in || []).some((u) => !u.startsWith(`${o.track}/${o.siklus}`))) s -= 6; return { ...h, score: s };
    }).sort((a, b) => b.score - a.score);
    const used = new Set(Object.values(picks)); const best = scored.find((h) => !used.has(`${h.provider}:${h.id}`));
    cands[sceneId] = scored.slice(0, 6); if (best && best.score >= (plan._minScore ?? 6)) picks[sceneId] = `${best.provider}:${best.id}`; else { console.log(sceneId, "-> tidak ada klip cukup relevan (skor tertinggi", best?.score, "), tetap adegan kartun"); continue; }
    console.log(sceneId, "->", picks[sceneId], `skor ${best.score}, ${best.dur}s, tags: ${best.tags.slice(0, 6).join(",")}`);
  }
  writeJson(path.join(ROOT, "produksi/preview", `${o.track}-${o.siklus}.candidates.json`), cands); writeJson(path.join(ROOT, "produksi/preview", `${o.track}-${o.siklus}.picks.json`), picks);
  console.log("picks.json ditulis; jalankan: footage.mjs download"); process.exit(0);
}
if (cmd === "search") {
  const cand = {};
  for (const s of broll) {
    cand[s.id] = [];
    for (const q of s.broll_keywords) {
      if (process.env.PEXELS_API_KEY) {
        const r = await fetch(`https://api.pexels.com/videos/search?per_page=3&query=${encodeURIComponent(q)}`, { headers: { Authorization: process.env.PEXELS_API_KEY } });
        for (const v of (await r.json()).videos || []) cand[s.id].push({ provider: "pexels", id: String(v.id), page: v.url, thumb: v.image, file: (v.video_files.filter((f) => f.width >= 1280).sort((a, b) => a.width - b.width)[0] || v.video_files[0]).link, license: "Pexels License", query: q });
      }
      if (process.env.PIXABAY_API_KEY) {
        const r = await fetch(`https://pixabay.com/api/videos/?key=${process.env.PIXABAY_API_KEY}&per_page=3&q=${encodeURIComponent(q)}`);
        for (const v of (await r.json()).hits || []) cand[s.id].push({ provider: "pixabay", id: String(v.id), page: v.pageURL, thumb: (v.videos.medium || v.videos.small || v.videos.tiny).thumbnail, file: (v.videos.medium || v.videos.small).url, license: "Pixabay Content License", query: q });
      }
    }
  }
  const cf = path.join(ROOT, "produksi/preview", `${o.track}-${o.siklus}.candidates.json`); writeJson(cf, cand);
  const html = `<!doctype html><meta charset=utf-8><title>${o.track}-${o.siklus}</title><body style="font-family:sans-serif">` + broll.map((s) => `<h3>${s.id}: ${s.visual.on_screen_text || ""}</h3><p>${s.visual.description}</p>` + cand[s.id].map((c) => `<a href="${c.page}" style="display:inline-block;margin:6px"><img src="${c.thumb}" width=240><br>${c.provider}:${c.id}</a>`).join("")).join("");
  fs.writeFileSync(path.join(ROOT, "produksi/preview", `${o.track}-${o.siklus}.html`), html);
  console.log("Pratinjau: produksi/preview/" + `${o.track}-${o.siklus}.html`, "| pilihan ditulis ke", `produksi/preview/${o.track}-${o.siklus}.picks.json`, "(format {\"s23\":\"pexels:123\"})");
} else if (cmd === "download") {
  const picks = readJson(path.join(ROOT, "produksi/preview", `${o.track}-${o.siklus}.picks.json`)); // pilihan kreator
  const cand = readJson(path.join(ROOT, "produksi/preview", `${o.track}-${o.siklus}.candidates.json`));
  const assets = readJson(assetsPath, { cycle: script.cycle, footage: [], renders: [] });
  for (const [sceneId, ref] of Object.entries(picks)) {
    if (ref.startsWith("own:")) { // footage milik kreator: produksi/footage-own/<track>/<file>
      const src = path.join(ROOT, "produksi/footage-own", o.track, ref.slice(4)); if (!fs.existsSync(src)) { console.warn(`footage milik kreator tidak ada: ${path.relative(ROOT, src)}`); continue; }
      const rel = `footage/${o.track}/${o.siklus}/${sceneId}.mp4`, dest = path.join(ROOT, "produksi", rel); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.copyFileSync(src, dest);
      catalog.clips[ref] = { source: "rekaman kreator", license: "milik kreator", downloaded: new Date().toISOString().slice(0, 10), used_in: [...new Set([...(catalog.clips[ref]?.used_in || []), `${o.track}/${o.siklus}/${sceneId}`])] };
      assets.footage = [...assets.footage.filter((f) => f.scene_id !== sceneId), { scene_id: sceneId, catalog_key: ref, file: rel }]; continue;
    }
    let c = (cand[sceneId] || []).find((x) => `${x.provider}:${x.id}` === ref);
    if (!c && ref.startsWith("pixabay:")) { const v = ((await (await fetch(`https://pixabay.com/api/videos/?key=${need("PIXABAY_API_KEY")}&id=${ref.slice(8)}`)).json()).hits || [])[0]; if (v) c = { provider: "pixabay", id: String(v.id), page: v.pageURL, file: (v.videos.medium || v.videos.small).url, license: "Pixabay Content License" }; }
    if (!c) { console.warn("tidak ketemu", sceneId, ref); continue; }
    const rel = `footage/${o.track}/${o.siklus}/${sceneId}.mp4`, dest = path.join(ROOT, "produksi", rel); fs.mkdirSync(path.dirname(dest), { recursive: true });
    const key = `${c.provider}:${c.id}`; const used = catalog.clips[key]?.used_in || [];
    if (used.some((u) => !u.startsWith(`${o.track}/${o.siklus}`))) console.warn(`PERINGATAN: ${key} sudah dipakai di`, used);
    fs.writeFileSync(dest, Buffer.from(await (await fetch(c.file)).arrayBuffer()));
    const date = new Date().toISOString().slice(0, 10);
    catalog.clips[key] = { source: c.page, license: c.license, downloaded: date, used_in: [...new Set([...used, `${o.track}/${o.siklus}/${sceneId}`])] };
    assets.footage = [...assets.footage.filter((f) => f.scene_id !== sceneId), { scene_id: sceneId, catalog_key: key, file: rel }];
  }
  writeJson(catPath, catalog); writeJson(assetsPath, assets); console.log("Selesai. Katalog dan 04-assets.json diperbarui.");
}
