# Langkah portfolio: Review portfolio

Tujuan: membandingkan semua track dengan data yang sama, lalu memutuskan per track apakah di-scale, lanjut, pivot, jeda, atau drop, tanpa melampaui kapasitas kreator. Jalankan dengan skill `video-portfolio`.

## Kapan dijalankan

- Setiap 2 minggu (isi `review_portfolio_berikutnya` di STATE setelah setiap review).
- Saat sebuah track selesai validasi V2.
- Saat kreator meminta ("review portfolio"), atau kapasitas jamnya berubah.

## Input

- `hasil/STATE.md` dan semua `hasil/tracks/*/TRACK.md` yang tahapnya `validasi`, `aktif`, atau `jeda`.
- `analitik/` dan `validasi/hasil.md` setiap track.
- Jam kerja nyata per track (tanyakan ke kreator bila belum dicatat).

## Langkah

1. **Papan skor.** Isi tabel di template `review-portfolio.md` untuk setiap track. Pakai metrik rasio yang sama untuk semua track (viewed vs swiped, persentase ditonton, CTR, share per 1.000 view), lalu tren 3 siklus terakhir.
2. **Skor 0 sampai 100:** performa vs target 40%, tren 20%, potensi monetisasi 20% (RPM tier, sponsor, affiliate), efisiensi jam 10%, energi kreator 10% (tanyakan satu pertanyaan: "Track mana yang paling ingin kamu kerjakan?").
3. **Usulkan keputusan per track:**

   | Keputusan | Kapan |
   | --- | --- |
   | `scale` | Skor tertinggi, tren naik, dan ada sisa kapasitas. Tambah frekuensi, misalnya Shorts ekstra atau long-form kedua |
   | `lanjut` | Di atas target atau tren naik |
   | `pivot` | Satu sub-sudut atau format jelas lebih baik dari yang lain. Buat track baru (`asal: pivot-dari:<ID>`), track lama di-drop atau dijeda |
   | `jeda` | Lumayan tetapi kalah prioritas karena kapasitas. Simpan backlog, berhenti produksi |
   | `drop` | 3 siklus berturut-turut di bawah target CTR **dan** retensi setelah hook dan judul divariasikan, atau gagal validasi |
   | `validasi` | Track `usulan` cadangan yang layak diuji karena ada kapasitas kosong |

4. **Cek kapasitas.** Jumlah `jam_per_minggu` track `aktif` + `validasi` setelah keputusan tidak boleh melebihi `kapasitas_jam_per_minggu`, dan jumlah track tidak boleh melebihi batas di STATE. Kalau melebihi, usulkan track mana yang dijeda.
5. **Naikkan learnings.** Pelajaran yang terbukti di 2 track atau lebih dipindah ke `hasil/learnings-global.md`, dengan sumber track dan siklusnya.
6. **Tulis** `hasil/review/YYYY-MM-DD-review-portfolio.md`.
7. **Gate:** kreator memutuskan per track. Gate ini selalu berhenti.
8. **Terapkan:** perbarui `tahap` dan tabel Keputusan di setiap TRACK.md, tabel Track dan log di STATE, `track_fokus`, dan `review_portfolio_berikutnya`.

## Aturan keadilan

- Jangan membandingkan view mentah antar channel dengan umur berbeda. Pakai rasio dan tren.
- Track yang baru 1 siklus belum dinilai `drop`, kecuali melanggar kebijakan.
- Biaya yang sudah keluar bukan alasan untuk lanjut. Yang dinilai hanya prospek ke depan.
