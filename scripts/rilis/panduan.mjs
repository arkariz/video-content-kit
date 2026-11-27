// Membaca teks dari 06-publish-manual.md (panduan unggah buatan pipeline) agar tidak perlu disalin tangan.
// Hanya bagian YouTube yang diambil; bidang yang tidak ditemukan dibiarkan.

const LABEL = [["judul", /^-?\s*Judul(?! cadangan)(?: \/ caption)?(?: \([^)]*\))?:\s*(.*)$/], ["deskripsi", /^-?\s*Deskripsi:\s*(.*)$/], ["tag", /^-?\s*Tag(?: YouTube)?:\s*(.*)$/], ["komentar", /^(?:-\s*)?(?:.*)?Komentar pin(?: \([^)]*\))?:\s*(.*)$/], ["playlist", /^-?\s*Playlist:\s*`([^`]+)`/], ["terjemahan", /^-?\s*Terjemahan judul[^:]*:\s*(.*)$/], ["lain", /^-?\s*(?:Judul cadangan|URL[^:]*|Teks|File|Thumbnail|Subtitle[^:]*|Setelan|Monetisasi[^:]*|End screen):/]];

function bagian(teks) {
  const hasil = []; let kini = null, kode = false;
  for (const baris of teks.split("\n")) {
    if (baris.startsWith("```")) kode = !kode;
    const h = !kode && baris.match(/^(##|###) (.*)$/);
    if (h?.[1] === "##") hasil.push((kini = { judul: h[2], sub: [{ judul: "", baris: [] }] }));
    else if (h) kini?.sub.push({ judul: h[2], baris: [] });
    else kini?.sub.at(-1).baris.push(baris);
  }
  return hasil;
}

function bidang(baris) {
  const f = {}; let label = null; const lepas = []; const pilihan = [];
  for (let i = 0; i < baris.length; i++) {
    const b = baris[i];
    if (b.startsWith("```")) {
      const isi = []; while (++i < baris.length && !baris[i].startsWith("```")) isi.push(baris[i]);
      const t = isi.join("\n").trim();
      if (label && label !== "lain" && label !== "pilihan") f[label] ??= t; else if (label !== "lain") lepas.push(t);
      label = null; continue;
    }
    const nomor = label === "pilihan" && b.match(/^\s*1\.\s+(.*)$/); if (nomor) { pilihan.push(nomor[1].trim()); continue; }
    const rapi = b.trim().replace(/^\*\*([^*]+)\*\*.*$/, "$1:"); // "**Judul** (catatan)" = "Judul:"
    const cocok = LABEL.find(([, re]) => re.test(rapi));
    if (!cocok) continue;
    const nilai = rapi.match(cocok[1])[1]?.trim() ?? "";
    label = cocok[0];
    if (label === "lain") continue;
    if (label === "playlist") { f.playlist ??= nilai; label = null; }
    else if (nilai) { f[label] ??= nilai; label = null; }
    else if (label === "judul" && /opsi/i.test(b)) label = "pilihan"; // daftar bernomor: ambil nomor 1
  }
  if (pilihan[0]) f.judul ??= pilihan[0];
  // format ringkas: deskripsi berupa blok teks tanpa label
  if (!f.deskripsi && lepas[0]) f.deskripsi = lepas[0];
  for (const k of Object.keys(f)) if (!f[k]) delete f[k];
  return f;
}

/** Peta nama item -> { judul, deskripsi, tag, komentar, playlist, terjemahan } sesuai yang ditemukan. */
export function bacaPanduan(teks, nama) {
  const semua = bagian(teks);
  const short = semua.filter((s) => /^(?:[\d.:]+\s*)?Short\b|^S\d|^[A-Z]\d-/.test(s.judul) || nama.slice(1).some((n) => s.judul.includes(n)));
  const hasil = {};
  nama.forEach((n, k) => {
    const s = n === "master" ? semua.find((x) => /master|long-?form/i.test(x.judul) && !/di (Facebook|TikTok)|^Opsional/i.test(x.judul)) : short.find((x) => x.judul.includes(n)) ?? short[k - 1];
    if (!s) return;
    const yt = s.sub.find((x) => /YouTube/i.test(x.judul)) ?? s.sub[0];
    const f = bidang(yt.baris); if (Object.keys(f).length) hasil[n] = f;
  });
  return hasil;
}
