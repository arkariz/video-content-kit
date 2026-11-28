# Hasil sampel video: pemenang vs gagal, 2026-11-28

Protokol: `sampel-video-2026-11-28-protokol.md` (dikunci sebelum data, dengan Amandemen 1). Data per video: `sampel-video-2026-11-28-data.csv`.

40 video dari 10 channel kecil (238 sampai 22.500 subscriber): 20 pemenang dan 20 gagal, 2 + 2 per channel. Median view: pemenang 87.369, gagal 427. Durasi median hampir sama (18,5 vs 17,6 menit).

Channel T01: BillionaireFiles, ExplainedLikeYou'reFive, pennyexplainsfinance, BusinessChroniclesMedia, PlanesInside. Channel T02: realterms-EN, TheSniffy, MapFathom, RamAshesAndEmpires, WorldExplained-4U.

## Hasil (aturan putus sesuai protokol)

"Channel" = jumlah channel yang pemenangnya unggul : yang gagalnya unggul. p = uji Fisher dua sisi, hanya dihitung untuk baris tertentu.

| Ciri | Pemenang | Gagal | Selisih | Channel | Hasil | p |
| --- | --- | --- | --- | --- | --- | --- |
| H1 teks thumbnail 3 kata atau kurang | 7/20 | 8/20 | -5 | 1 : 3 | tidak terbukti | |
| H2 tokoh dengan emosi atau aksi | 4/20 | 6/20 | -10 | 0 : 2 | tidak terbukti | |
| H3 satu titik fokus | 6/20 | 13/20 | -35 | 1 : 7 | melemahkan | 0,06 |
| H4 info di luar judul | 6/20 | 8/20 | -10 | 1 : 3 | tidak terbukti | |
| J1 judul memuat angka | 7/20 | 3/20 | +20 | 4 : 0 | lolos | 0,27 |
| J2 judul tanya / Why-How-What | 10/20 | 14/20 | -20 | 3 : 5 | melemahkan | 0,33 |
| J3 judul menyebut nama dikenal | 14/20 | 16/20 | -10 | 1 : 3 | tidak terbukti | |
| P1 pembukaan konkret | 14/20 | 17/20 | -15 | 0 : 3 | tidak terbukti | |
| P2 angka dalam 30 detik | 18/20 | 16/20 | +10 | 2 : 0 | tidak terbukti | |
| P3 pertanyaan, misteri, atau janji dalam 30 detik | 15/20 | 11/20 | +20 | 4 : 1 | lolos | 0,32 |
| P4 menyapa "you" | 5/20 | 4/20 | +5 | 3 : 2 | tidak terbukti | |

Per niche (10 lawan 10, sangat kecil): T01 lolos J1 dan P4; T02 lolos P3 (8/10 lawan 3/10, channel 4 : 0).

## Cara membaca

- **Tidak ada ciri yang bisa disebut terbukti.** Yang lolos aturan putus tetap punya p di atas 0,2, dan 11 ciri diuji sekaligus, jadi satu atau dua bisa lolos karena kebetulan.
- **Dugaan dari studi pertama tidak didukung:** teks thumbnail pendek dan tokoh beremosi sama sering atau lebih sering ada pada video gagal. Studi pertama hanya melihat pemenang.
- **Pembukaan konkret dan angka ada di hampir semua video,** termasuk yang gagal. Itu mungkin syarat dasar, tetapi data ini tidak bisa membuktikannya.
- **H3 jangan dibaca sebagai "buat thumbnail ramai".** Pengodean "satu fokus" paling subjektif.
- **J1 rapuh:** dua dari tujuh judul pemenang berangka adalah judul yang sama di dua channel, dan dua lagi berangka karena menyebut durasi.

## Temuan di luar protokol (dilihat sesudah data, hipotesis saja)

Perbedaan terbesar tampak pada **subjek**, dengan kemasan yang sama:

| Channel | Pola sama | Pemenang | Gagal |
| --- | --- | --- | --- |
| MapFathom | "X's geography is hiding something" | South Africa 283.909 | Oklahoma 79 |
| pennyexplainsfinance | "(Explained Like You're 5)" | America owes $40 trillion 1.157.678 | Federal Reserve 6.153 |
| RamAshesAndEmpires | "Why did X get rich..." | China vs India 52.703 | Turkey, entire history 56 |
| PlanesInside | berita maskapai | United vs Miami 22.367 | Eastern Airlines (sejarah) 395 |

Judul "Who Does America Owe $40 Trillion? (Explained Like You're 5)" juga tayang di dua channel berbeda dalam sampel dan menjadi pemenang di keduanya (428.384 dan 1.157.678). Baris RamAshes dan PlanesInside tidak sepenuhnya berpola sama.

## Keterbatasan

- Satu pengode. Thumbnail dikodekan dari grid acak tanpa angka view, tetapi view dan judul sudah terlihat saat pemilihan, jadi tidak buta penuh. Pembukaan dan judul tidak buta.
- Video gagal lebih muda (median 15,5 hari lawan 26 hari).
- Hitungan kata thumbnail memasukkan semua label peta dan teks kecil.
- Sampel diambil dari hasil pencarian YouTube akun yang sedang masuk; channel format "ELI5" saling meniru.
- Gerak, suara, retensi, dan CTR tidak diketahui.

## Cukup atau belum

Cukup untuk satu kesimpulan: pada sampel ini tidak ada ciri kemasan yang besar dan konsisten memisahkan pemenang dari gagal. Belum cukup untuk memastikan efek kecil. Untuk mendeteksi selisih 20 poin dengan andal dibutuhkan kira-kira 80 sampai 100 video per kelompok, dan data pengamatan tetap tercampur pengaruh subjek. Menambah sampel sejenis tidak disarankan.

## Usulan (tidak mengubah rencana V2)

1. Saat memilih topik, cari bukti permintaan subjeknya: video channel kecil dengan subjek sama yang performanya tinggi.
2. Pembukaan: pasang pertanyaan atau kontradiksi dalam 30 detik, terutama T02.
3. Judul T01: coba angka yang bermakna.
4. Uji thumbnail dengan data sendiri (A/B di YouTube Studio bila tersedia), bukan dari tiruan.
