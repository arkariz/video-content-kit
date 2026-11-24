// Subcommand: search | download. Katalog global: produksi/footage-cache/index.json
import fs from "node:fs"; import path from "node:path";
import { ROOT, args, resolveCycle, readJson, writeJson, need } from "./lib.mjs";
const o = args(); const cmd = o._[0] || "search"; const { scriptPath, assetsPath } = resolveCycle(o.track, o.siklus);
const script = readJson(scriptPath); const catPath = path.join(ROOT, "produksi/footage-cache/index.json");
const catalog = readJson(catPath, { clips: {} });
const broll = script.scenes.filter((s) => s.visual.type === "broll");
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
        for (const v of (await r.json()).hits || []) cand[s.id].push({ provider: "pixabay", id: String(v.id), page: v.pageURL, thumb: `https://i.vimeocdn.com/video/${v.picture_id}_640x360.jpg`, file: (v.videos.medium || v.videos.small).url, license: "Pixabay Content License", query: q });
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
    const c = (cand[sceneId] || []).find((x) => `${x.provider}:${x.id}` === ref); if (!c) { console.warn("tidak ketemu", sceneId, ref); continue; }
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
