# Langkah portfolio: Riset niche

Tujuan: menghasilkan beberapa **usulan track** (niche + sudut) yang layak divalidasi. Langkah ini tidak lagi memilih satu niche final. Keputusan final datang dari data validasi (`02-validasi-niche.md`). Jalankan dengan skill `video-niche-research`.

## Input

- `hasil/00-riset-niche/profil-kreator.md`. Kalau bagian "Batasan" atau "Kapasitas" masih kosong, tanyakan maksimal 4 pertanyaan singkat ke kreator, lalu lanjut. Isi `kapasitas_jam_per_minggu` di STATE dari jawaban itu.
- `instruksi/referensi/aturan-platform.md` untuk angka RPM dan aturan kebijakan.
- Track yang sudah ada di STATE (termasuk yang `drop` beserta alasannya), supaya tidak mengusulkan ulang hal yang sudah gagal tanpa alasan baru.
- `hasil/learnings-global.md`.

## Langkah

### 1. Susun 10 sampai 15 kandidat niche

Gabungkan keahlian kreator dengan permintaan pasar. Setiap kandidat ditulis spesifik ("Flutter performance untuk aplikasi production"), bukan kategori lebar ("teknologi"). Sertakan minimal 3 kandidat di luar keahlian utama sebagai pembanding.

### 2. Riset setiap kandidat dengan web search

| Data | Cara mendapatkan |
| --- | --- |
| Permintaan | Pencarian YouTube untuk 3 kata kunci inti: berapa video terbaru (90 hari) yang di atas 10 ribu view? Google Trends kalau tersedia |
| Kompetisi | 5 channel teratas: jumlah subscriber, frekuensi upload, umur channel |
| Ruang untuk pendatang | Ada channel di bawah 10 ribu subscriber dengan video di atas 50 ribu view? (tanda outlier) |
| Tingkat slop | Seberapa banyak hasil teratas yang berupa konten AI massal? |
| Nilai penonton | Tier RPM dari referensi; negara penonton yang dominan |
| Sponsor | Brand yang sudah mensponsori channel di niche ini |
| Risiko kebijakan | Masuk topik sensitif (keuangan, kesehatan, hukum) yang berisiko bila memakai suara AI? |
| Kecocokan produksi | Bisa divisualkan sebagai ilustrasi gerak (proses, skala, benda yang bisa digambar) + footage? |
| Evergreen | Apakah video masih relevan 12 bulan lagi? |

Catat semua data dan tautannya di `hasil/00-riset-niche/kandidat-niche.md`. Data yang tidak bisa diverifikasi ditandai `belum terverifikasi`, jangan dikarang.

### 3. Beri skor

Pakai `instruksi/templates/niche-scorecard.md`:

| Kriteria | Bobot |
| --- | --- |
| Keunggulan kreator (bukti yang hanya dia punya) | 25% |
| Nilai penonton (RPM + potensi sponsor) | 20% |
| Ruang untuk pendatang (outlier kecil ada) | 20% |
| Permintaan | 15% |
| Kecocokan produksi | 10% |
| Evergreen | 5% |
| Risiko kebijakan (dibalik: risiko tinggi = skor rendah) | 5% |

### 4. Pecah niche teratas menjadi sudut

Untuk 3 sampai 4 niche dengan skor tertinggi, usulkan 1 sampai 3 **sudut** yang berbeda nyata. Sudut berbeda bila penontonnya, janjinya, atau formatnya berbeda, misalnya "Flutter performance: debugging rebuild untuk senior" vs "Flutter performance: checklist sebelum rilis untuk pemula". Setiap pasangan niche + sudut adalah satu usulan track.

### 5. Tulis analisa dan usulan track

Tulis `hasil/00-riset-niche/analisa-niche.md` (template `analisa-niche.md`). Setiap usulan track berisi:

- Hipotesis satu kalimat (siapa, format, topik, kenapa kreator)
- Skor niche dan alasan dalam 3 kalimat
- 3 channel pembanding dan outlier yang ditemukan, dengan tautan
- 10 contoh judul yang memakai bukti milik kreator
- Estimasi jam per minggu
- Usulan channel (baru atau gabung dengan track yang sudah ada di niche yang sama)
- Risiko utama dan mitigasinya

### 6. Gate: kreator memilih track yang divalidasi

Isi `menunggu_keputusan` di STATE: daftar usulan track + rekomendasimu tentang mana yang divalidasi dulu. Hormati `batas_track_validasi` dan sisa kapasitas jam. Kreator boleh memilih lebih dari satu. Gate ini selalu berhenti, termasuk di mode `otomatis`.

### 7. Buat track

Untuk setiap usulan (yang dipilih maupun tidak):

1. Beri ID berikutnya (`T01`, `T02`, ...) dan buat `hasil/tracks/<ID>-slug/TRACK.md` dari template `track.md`. Isi `asal: analisa-niche`.
2. Yang dipilih: `tahap: validasi`, `langkah_berikutnya: "validasi V1"`. Yang tidak dipilih: `tahap: usulan` (cadangan).
3. Isi `backlog.md` (template `track-backlog.md`) dengan minimal 20 ide untuk track yang dipilih. Buat `learnings.md` dari template `track-learnings.md`.
4. Tambahkan semua track ke tabel di STATE dan catat di log.

## Kapan langkah ini dijalankan ulang

- Kreator meminta ("riset niche").
- Review portfolio menyimpulkan semua track lemah dan tidak ada usulan cadangan yang layak.

Hasil riset sebelumnya dipindah ke `hasil/00-riset-niche/arsip-YYYY-MM-DD/`, bukan dihapus. Track lama tidak berubah.
