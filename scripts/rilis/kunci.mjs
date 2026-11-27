// Membuka atau memasang kembali kunci unggah sebuah siklus, atas tindakan kreator di dashboard.
import { ubah } from "./inti.mjs";

/** Membuka kunci butuh kata BUKA: video yang sudah diunggah lewat jalur lain bisa terunggah dua kali. */
export function bukaKunci(c, kata) {
  if (kata !== "BUKA") throw new Error("ketik BUKA (huruf besar) untuk membuka kunci");
  return ubah(c, (r) => {
    if (!r.kunci_manual) throw new Error("siklus ini tidak terkunci");
    r.kunci_dibuka = { alasan: r.kunci_manual, waktu: new Date().toISOString() }; r.kunci_manual = null; r.persetujuan = null;
  });
}
export const kunci = (c) => ubah(c, (r) => { if (r.kunci_manual) throw new Error("siklus ini sudah terkunci"); r.kunci_manual = "dikunci lewat dashboard: diunggah manual"; r.persetujuan = null; });
/** Siklus yang diarsipkan tidak muncul di agenda dan tidak disentuh penjadwal. */
export const arsip = (c, ya) => ubah(c, (r) => { if (ya) r.arsip = new Date().toISOString(); else delete r.arsip; });
