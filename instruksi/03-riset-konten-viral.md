# Langkah track: Riset konten viral (setiap siklus)

Tujuan: menemukan pola yang sedang bekerja di niche, lalu memilih satu topik dan sudut untuk siklus ini. Yang ditiru adalah pola, bukan isi.

## Persiapan

1. Baca `hasil/tracks/<ID>/TRACK.md`, `hasil/tracks/<ID>/learnings.md`, `hasil/tracks/<ID>/backlog.md`, dan `hasil/learnings-global.md`.
2. Buat folder `hasil/tracks/<ID>/siklus/NNN-slug/` (NNN = nomor siklus terakhir + 1). Slug sementara boleh `NNN-riset`, lalu diganti setelah topik dipilih.
3. Tambah baris siklus di tabel Siklus pada `TRACK.md` dengan status `riset`.

## Cari outlier

Outlier = video yang view-nya jauh di atas rata-rata channel-nya sendiri. Ini sinyal topik dan kemasan yang menarik, bukan sekadar channel besar.

- **Aturan outlier:** view minimal 3x median view 10 video terakhir channel itu, tayang dalam 90 hari terakhir.
- **Sumber:**
  - YouTube: kalau ada `YOUTUBE_API_KEY` di `.env`, pakai YouTube Data API (`search.list` + `videos.list` + `channels.list`). Kalau tidak ada, pakai web search dan halaman channel.
  - TikTok dan Instagram: web search untuk kata kunci niche, catat video dengan engagement tinggi.
  - Sinyal permintaan di niche developer: pertanyaan yang sering muncul di Reddit, Stack Overflow, GitHub issues, dan changelog rilis baru.
  - Export dari kreator (YouTube Studio, vidIQ, dan sejenisnya) kalau diberikan.
- **Jumlah:** 5 sampai 10 outlier. Kalau angka tidak bisa diverifikasi, tulis `belum terverifikasi`.

## Analisa setiap outlier

| Elemen | Yang dicatat |
| --- | --- |
| Judul | Pola (angka, "stop doing", klaim kontra-intuitif, hasil dulu, panggilan langsung) |
| Thumbnail | Subjek, jumlah kata, emosi, warna dominan |
| Hook | Kalimat pertama dan apa yang terlihat di 2 detik pertama |
| Struktur | Durasi, jumlah babak, letak payoff |
| Komentar | Pertanyaan atau keluhan penonton yang belum terjawab (ini sumber sudut baru) |
| Kelemahan | Apa yang dangkal, salah, atau terlihat generik |

## Sintesis

Tulis `01-riset-viral.md` (template `riset-viral.md`) yang berisi:

1. Tabel outlier dengan tautan.
2. Tiga pola yang berulang, masing-masing dengan bukti.
3. **Celah**: apa yang belum dijawab outlier dan bisa kita jawab.
4. **Tiga usulan sudut** untuk siklus ini. Setiap sudut berisi judul kerja, hook draf, alasan kenapa sekarang, dan risiko slop.
5. Perbarui `hasil/tracks/<ID>/backlog.md` dengan ide baru dari riset.

## Gate: pilih sudut

Isi `menunggu_keputusan` dengan tiga sudut + rekomendasimu. Setelah dipilih, ganti nama folder siklus ke slug final, perbarui `TRACK.md` (`status: brief`), lalu lanjut ke `instruksi/04-naskah.md`.

## Larangan

- Jangan menyalin naskah, struktur kalimat, atau thumbnail outlier.
- Jangan memakai topik keuangan, kesehatan, atau hukum dengan narasi suara AI (lihat `referensi/aturan-platform.md`).
