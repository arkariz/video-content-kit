// Baca saja: cocokkan keadaan video di Facebook dengan rencana, satu baris per hal.
import { muat, teksFacebook, terkunci } from "./inti.mjs";
import { klien } from "./facebook.mjs";

const wib = (d) => d.toLocaleTimeString("sv-SE", { timeZone: "Asia/Jakarta" });

export function periksa(c, { log = console.log, kini = Date.now() } = {}) {
  return terkunci(c, async () => {
    const r = muat(c); if (!r) throw new Error("rencana belum dibuat");
    const fb = klien(c.track); let beda = 0;
    const cek = (nama, hal, ok, nyata) => { if (ok === false) beda++; log(`${ok === null ? "…" : ok ? "✓" : "✗"} ${nama} (Facebook): ${hal}${nyata ? ` (${nyata})` : ""}`); };
    // Tiap pembacaan berdiri sendiri: satu bidang yang ditolak tidak menghentikan pemeriksaan lain.
    const baca = async (nama, hal, fn) => { try { return await fn(); } catch (e) { cek(nama, `${hal} tidak terbaca`, null, e.message); return undefined; } };
    for (const i of r.items) {
      const h = r.hasil[i.nama]?.facebook; if (!h?.videoId) { cek(i.nama, "belum ada video yang diunggah alat", null); continue; }
      const ada = await baca(i.nama, "video", () => fb.get(h.videoId, { fields: "id" })); if (!ada) continue;
      cek(i.nama, "video ada", true, h.url);
      const jadwal = h.publishAt ? new Date(h.publishAt) : null; const waktunya = !jadwal || jadwal <= kini;
      const s = (await baca(i.nama, "status", () => fb.get(h.videoId, { fields: "status" })))?.status;
      let tayang = s?.publishing_phase?.publish_status ? s.publishing_phase.publish_status === "published" : undefined;
      if (tayang === undefined || i.nama === "master") { const p = await baca(i.nama, "status tayang", () => fb.get(h.videoId, { fields: "published" })); if (typeof p?.published === "boolean") tayang = p.published; }
      if (s?.video_status) cek(i.nama, "pemrosesan", s.video_status === "ready" ? true : s.video_status === "error" ? false : null, s.video_status);
      if (tayang === undefined) cek(i.nama, "tayang atau tidak: tidak diketahui", null);
      else if (!waktunya) cek(i.nama, "masih terjadwal", !tayang, `tayang ${wib(jadwal)} WIB`);
      else cek(i.nama, jadwal ? "tayang otomatis sesuai jadwal" : "sudah tayang", tayang ? true : jadwal && kini - jadwal < 3 * 60e3 ? null : false, tayang ? "published" : "belum");
      const sub = (await baca(i.nama, "subtitle", () => fb.get(`${h.videoId}/captions`)))?.data;
      if (sub) for (const x of i.subtitle) { const locale = { en: "en_US", id: "id_ID" }[x.bahasa]; cek(i.nama, `subtitle ${x.bahasa}`, sub.some((v) => v.locale === locale)); }
      if (i.thumbnail) cek(i.nama, "sampul", h.selesai?.sampul ? true : null, h.selesai?.sampul ? "terkirim" : "belum");
      if (teksFacebook(i).komentar.trim()) {
        const komentar = (await baca(i.nama, "komentar", () => fb.get(`${h.videoId}/comments`, { fields: "id,from", limit: "100" })))?.data;
        if (komentar) { const punya = komentar.some((k) => k.from?.id === fb.page) || (h.komentar && komentar.some((k) => k.id === h.komentar.id)); cek(i.nama, "komentar Page", punya ? true : h.komentar ? false : null, punya ? "ada" : waktunya ? "belum" : "setelah tayang"); }
      }
    }
    log(beda ? `${beda} hal tidak cocok` : "tidak ada yang tidak cocok");
    log("Terlihat publik hanya bisa dipastikan dengan membuka tautannya dari jendela tanpa login.");
  });
}
