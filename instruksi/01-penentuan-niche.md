# Fase 0: Penentuan niche

Tujuan: memilih satu niche yang (a) penontonnya membayar tinggi, (b) masih punya ruang untuk channel baru, dan (c) memberi kreator keunggulan yang sulit ditiru channel AI generik. Jalankan dengan skill `video-niche-research`.

## Input

- `hasil/00-niche/profil-kreator.md`. Kalau bagian "Batasan" atau "Kapasitas" masih kosong, tanyakan maksimal 4 pertanyaan singkat ke kreator, lalu lanjut.
- `instruksi/referensi/aturan-platform.md` untuk angka RPM dan aturan kebijakan.

## Langkah

### 1. Susun 10 sampai 15 kandidat

Gabungkan keahlian kreator dengan permintaan pasar. Setiap kandidat ditulis sebagai niche spesifik ("Flutter performance untuk aplikasi production"), bukan kategori lebar ("teknologi"). Sertakan minimal 3 kandidat di luar keahlian utama sebagai pembanding.

### 2. Riset setiap kandidat dengan web search

Untuk setiap kandidat, kumpulkan:

| Data | Cara mendapatkan |
| --- | --- |
| Permintaan | Pencarian YouTube untuk 3 kata kunci inti: berapa video terbaru (90 hari) yang di atas 10 ribu view? Google Trends kalau tersedia |
| Kompetisi | 5 channel teratas: jumlah subscriber, frekuensi upload, umur channel |
| Ruang untuk pendatang | Ada channel di bawah 10 ribu subscriber dengan video di atas 50 ribu view? (tanda outlier) |
| Tingkat slop | Seberapa banyak hasil teratas yang berupa konten AI massal? |
| Nilai penonton | Tier RPM dari referensi; negara penonton yang dominan |
| Sponsor | Brand yang sudah mensponsori channel di niche ini |
| Risiko kebijakan | Masuk topik sensitif (keuangan, kesehatan, hukum) yang berisiko bila memakai suara AI? |
| Kecocokan produksi | Bisa divisualkan dengan Remotion (diagram, kode, data) + footage? |
| Evergreen | Apakah video masih relevan 12 bulan lagi? |

Catat semua data dan tautannya di `hasil/00-niche/kandidat-niche.md`. Data yang tidak bisa diverifikasi ditandai `belum terverifikasi`, jangan dikarang.

### 3. Beri skor

Pakai `instruksi/templates/niche-scorecard.md`. Bobot default:

| Kriteria | Bobot |
| --- | --- |
| Keunggulan kreator (bukti yang hanya dia punya) | 25% |
| Nilai penonton (RPM + potensi sponsor) | 20% |
| Ruang untuk pendatang (outlier kecil ada) | 20% |
| Permintaan | 15% |
| Kecocokan produksi | 10% |
| Evergreen | 5% |
| Risiko kebijakan (dibalik: risiko tinggi = skor rendah) | 5% |

### 4. Shortlist 3 niche

Tulis `hasil/00-niche/analisa-niche.md` (template `analisa-niche.md`). Untuk setiap niche di shortlist:

- Skor dan alasan dalam 3 kalimat
- 3 channel pembanding dengan tautan
- 10 contoh judul video yang mengikuti pola outlier tetapi memakai bukti milik kreator
- Risiko utama dan cara mengatasinya
- Pilar konten (3 sampai 4 kategori topik yang berulang)

### 5. Gate: kreator memilih

Isi `menunggu_keputusan` di STATE dengan pertanyaan pilihan niche (3 opsi + rekomendasimu). Gate ini selalu berhenti, termasuk di mode `otomatis`.

Opsi tambahan yang boleh ditawarkan: **sprint validasi**, yaitu 2 Shorts per niche untuk 2 niche teratas selama 2 minggu, lalu pilih berdasarkan data retensi.

### 6. Kunci niche

Setelah kreator memilih:

1. Tulis `hasil/00-niche/keputusan-niche.md` (template `keputusan-niche.md`): niche, pilar konten, target penonton, bahasa, KPI 90 hari, dan hal yang tidak akan dibahas.
2. Isi `hasil/backlog.md` dengan minimal 20 ide dari analisa, sudah diberi skor.
3. Perbarui STATE: `fase: siklus`, `niche: <nama>`, `langkah_berikutnya: "siklus baru: riset viral"`.

## Kapan fase ini dijalankan ulang

- Kreator meminta ("riset niche" atau "ganti niche").
- Langkah analitik mengajukan pivot (lihat `07-analitik-dan-loop.md`) dan kreator menyetujuinya. Hasil lama dipindah ke `hasil/00-niche/arsip-YYYY-MM-DD/`, bukan dihapus.
