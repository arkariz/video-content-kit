# Rencana validasi: T01

**Dikunci: 2026-11-24 (disetujui kreator). Paket, variasi, tanggal, ambang, dan aturan keputusan di file ini tidak boleh diubah lagi.**

Ditulis: 2026-11-24 · Status: **DRAF, belum dikunci.** Dikunci setelah kreator menyetujui V2. Setelah dikunci, kriteria tidak diubah lagi, apa pun datanya.

## Hipotesis yang diuji

Penonton tier-1 yang penasaran soal uang mau menonton penjelasan 10 sampai 15 menit (plus Shorts turunannya) tentang apa yang terjadi di balik tap kartu, transfer, QR, dan ATM beserta sejarahnya, dari kreator yang 5 tahun membangun aplikasi keuangan, karena channel sejarah uang yang ada menjelaskan dari luar sistem.

## Tahap V1: validasi riset (tanpa publish)

Dinilai 2026-11-24. Data: pencarian YouTube halaman pertama dari browser kreator, 24 kata kunci khusus sudut ini (mekanisme pembayaran, sejarah alat bayar, model bisnis kartu).

| Pertanyaan | Bukti yang dibutuhkan | Hasil | Lulus? |
| --- | --- | --- | --- |
| Ada permintaan nyata? | Minimal 5 video 90 hari terakhir di atas 10 ribu view | 19 video unik di 16 kata kunci pertama. Yang relevan dengan sudut (bukan nasihat, bukan berita kebijakan): [How does Tap to Pay Work?](https://www.youtube.com/watch?v=N_6k_jd5pnA) 776K; [Why Does an ATM Keep Your Card Inside?](https://www.youtube.com/watch?v=K41FtlNvOYQ) 225K; [How Credit Card Companies Make Money From You (Even If You Pay in Full)](https://www.youtube.com/watch?v=nzZ8nwy2xSY) 198K; [How Credit Cards Make Money Even If You Pay in Full](https://www.youtube.com/watch?v=3DA-J3c-tDE) 160K; [How Money Was Invented: The Chinese Way](https://www.youtube.com/watch?v=KgrynQ27ir8) 126K; [The ENTIRE History of Money in 13 Minutes](https://www.youtube.com/watch?v=wmOolOr461w) 61K; [America Had No Credit Cards Until 1950](https://www.youtube.com/watch?v=Hd1kvNVedX4) 33K; [Wise QR Payments In Asia](https://www.youtube.com/watch?v=_jZsuJPFwW4) 16K. Tambahan dekat sudut: [Mastercard's Invisible Empire](https://www.youtube.com/watch?v=hidRAm8JcFI) 383K, [Every major economy is trying to ditch Visa & MasterCard](https://www.youtube.com/watch?v=ls-eE8FVM8E) 679K (7 bulan) | Lulus (8 relevan) |
| Channel kecil bisa menang? | Minimal 2 outlier dari channel di bawah 10 ribu subscriber | [Mogulnomics](https://www.youtube.com/channel/UCVXppDCH6pNktlMuA7fcTtQ) (359 subs) 198K dalam 2 hari; [Pocket Change](https://www.youtube.com/channel/UCtZqDxp9YAUHgF6BGl0kqbg) (482 subs) 160K dalam 2 minggu; [Time In Minutes](https://www.youtube.com/channel/UCHPaf9yEM-NRBEJ82yf8OrQ) (478 subs) 61K; [The Quiet History](https://www.youtube.com/channel/UCPPwHDEyPx_zF5Lk-X0N6dw) (1,9K subs) 33K | Lulus (3 di atas 50K) |
| Kreator punya bukti khusus? | Minimal 10 ide dengan bukti milik kreator | 21 ide di `backlog.md`, semuanya memakai pengalaman membangun aplikasi keuangan atau standar publik (ISO 8583, ISO 20022, QRIS) yang dijelaskan dari sisi engineer | Lulus |
| Bisa diproduksi rutin? | Estimasi jam per video sesuai kapasitas | Long-form 10 sampai 12 menit berbasis diagram Remotion: sekitar 6 jam (riset 2, naskah 1,5, produksi 2, QA dan publish 0,5). Shorts turunan: sekitar 0,75 jam. Paket V2 = 16,5 jam dalam 3 minggu, sekitar 5,5 jam per minggu | Lulus, dengan catatan kapasitas di bawah |
| Risiko kebijakan aman? | Bukan topik sensitif dengan suara AI | Topik keuangan, tetapi isinya mekanisme dan sejarah, bukan nasihat. Kategori 3 kebijakan YouTube menyasar konten yang tampil sebagai pakar manusia yang memberi nasihat keuangan ([Tubefilter](https://www.tubefilter.com/2026/07/13/youtube-inauthentic-content-monetization-policy-update/)). Aturan track: tanpa rekomendasi produk, tanpa persona pakar AI | Lulus, bersyarat pada aturan "Tidak akan dibahas" di TRACK.md |

**Hasil V1: LULUS** (5 dari 5).

Catatan V1:
- Dua outlier terbesar (Mogulnomics, Pocket Change) punya judul hampir sama dan jumlah video sedikit, jadi kemungkinan channel AI massal (`belum terverifikasi`). Ini membuktikan topiknya diminati, tapi juga berarti T01 akan bersaing dengan konten seperti itu. Pembedanya harus terlihat di 30% awal setiap video: diagram alur nyata dan penjelasan dari sisi engineer.
- Judul "make money from you" berada di dekat batas nasihat. T01 memakai versi mekanisme ("how the fee is split"), bukan versi "lindungi uangmu".

## Tahap V2: validasi pasar

- **Channel:** channel YouTube baru untuk niche uang (nama belum ditentukan), dipakai juga oleh T03/T04 bila nanti divalidasi. Shorts juga diunggah ke TikTok dan Instagram Reels; angka penilaian hanya dari YouTube.
- **Paket uji:** 6 Shorts + 2 long-form dalam 3 minggu.
- **Variasi yang sengaja diuji:**

| Variasi | Sub-sudut | Konten | Hook |
| --- | --- | --- | --- |
| A | Satu transaksi dibedah | Long-form: What Happens in the 2 Seconds After You Tap Your Card. Shorts: 2 potongan | Pertanyaan konkret ("What happens when you tap?") |
| B | Siapa dapat uang | Long-form: How Card Companies Make Money Even When You Pay in Full. Shorts: 2 potongan | Angka dulu ("Every tap pays 4 companies") |
| C | Sejarah alat bayar | Shorts: The Credit Card Was Invented Because of a Forgotten Wallet (Diners Club 1950); The First ATM in 1967 | Cerita sejarah |

- **Tanggal mulai / selesai:** konten pertama tayang 2026-12-07, konten terakhir paling lambat 2026-12-27, dinilai 2027-01-03 (7 hari setelah konten terakhir). Periode ini jatuh di musim liburan akhir tahun; CPM dan perilaku tonton bisa lain dari biasa, jadi penilaian memakai rasio, bukan view atau pendapatan.
- **Data minimal sebelum dinilai:** setiap konten tayang minimal 7 hari. Kalau total view Shorts di bawah 3.000, hasilnya "data kurang" dan sprint diperpanjang 1 minggu (maksimal sekali).

| Metrik (median paket uji) | Lulus | Gagal | Sumber data |
| --- | --- | --- | --- |
| Shorts: viewed vs swiped away | 65% atau lebih | di bawah 50% | YouTube Studio |
| Shorts: average percentage viewed | 70% atau lebih | di bawah 50% | YouTube Studio |
| Long-form: impressions CTR | 3% atau lebih | di bawah 2% | YouTube Studio |
| Long-form: average percentage viewed | 30% atau lebih | di bawah 20% | YouTube Studio |
| Sinyal kualitatif: komentar bertanya lanjutan atau share | minimal 3 | 0 | Komentar, dashboard |
| Waktu produksi rata-rata per konten | long-form ≤6 jam, Shorts ≤0,75 jam | long-form di atas 9 jam atau Shorts di atas 1,1 jam | Catatan kreator |

Variasi pemenang ditentukan dari median viewed vs swiped (Shorts) dan average percentage viewed (long-form) per variasi.

## Aturan keputusan

- **Lulus** (minimal 4 dari 6 metrik lulus dan tidak ada metrik di zona gagal): track masuk tahap `aktif`.
- **Gagal** (2 metrik atau lebih di zona gagal): `drop`, atau ajukan pivot sudut sebagai track baru.
- **Di tengah**: perpanjang 1 sprint dengan perubahan yang spesifik, atau pivot sudut.

Angka ambang ini titik awal untuk channel baru. Penyesuaian hanya berlaku untuk rencana validasi track berikutnya (bukan sprint ini), setelah ada data dari 2 track atau lebih, dan dicatat di `learnings-global.md`.

## Kapasitas

T01 sekitar 5,5 jam per minggu + T02 estimasi serupa = sekitar 11 jam per minggu selama V2 berjalan bersamaan. Kreator menerima kapasitas di atas 10 jam per minggu (2026-11-24); `kapasitas_jam_per_minggu` di STATE diubah ke 12.

Supaya perbandingan dengan T02 adil (`instruksi/02-validasi-niche.md`, validasi paralel), V2 T02 memakai paket uji yang sama (6 Shorts + 2 long-form) dan periode tayang yang sama, 2026-12-07 sampai 2026-12-27, dengan syarat V1 T02 lulus.

Jadwal mingguan gabungan (target):

| Minggu | T01 | T02 | Jam total |
| --- | --- | --- | --- |
| 2026-11-30 (persiapan) | Buat channel, template Remotion diagram, produksi long-form A | V1 T02, buat channel, template peta, produksi long-form pertama | sekitar 12 |
| 2026-12-07 | Tayang long-form A + 2 Shorts A | Tayang long-form 1 + 2 Shorts | sekitar 11 |
| 2026-12-14 | Tayang long-form B + 2 Shorts B | Tayang long-form 2 + 2 Shorts | sekitar 11 |
| 2026-12-21 | Tayang 2 Shorts C | Tayang 2 Shorts | sekitar 4 |
| 2027-01-03 | Penilaian | Penilaian | sekitar 2 |

Kalau waktu produksi nyata di 2 konten pertama melebihi 1,5 kali rencana, kreator boleh memilih menunda T02 satu minggu. Penundaan dicatat di log, ambang tidak berubah.
