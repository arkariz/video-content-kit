// Pengaman unggah ganda: sebelum mengirim, judul tiap konten dibandingkan dengan yang sudah ada di platform.
export const norm = (s) => String(s ?? "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

/** Video yang teksnya sama dengan judul atau kalimat pertama konten; null bila aman.
 *  video: [{ url, judul, teks }]. Durasi tidak dipakai: lebih baik berhenti dan diperiksa daripada ganda. */
export function kembar(item, video, teks = []) {
  const kunci = new Set([item.judul, ...teks].map((t) => norm(String(t ?? "").split("\n")[0])).filter((x) => x.length >= 12));
  return video.find((v) => [v.judul, String(v.teks ?? "").split("\n")[0]].some((t) => kunci.has(norm(t)))) ?? null;
}
export const pesanKembar = (platform, daftar) => `unggah ganda dicegah, judul yang sama sudah ada di ${platform}: ${daftar.map(([nama, v]) => `${nama} -> ${v.url}`).join("; ")}. Klik "Catat yang sudah tayang" untuk mencatatnya, atau hapus videonya / ubah judul bila memang ingin mengunggah baru`;
