---
name: video-content-cycle
description: Run the repeatable weekly video production loop for one track (niche + angle) in a multi-track portfolio - viral outlier research, brief, script.json, ElevenLabs voice and captions, B-roll plus Remotion visuals, anti-slop QA, multi-platform publish prep, and analytics that feed learnings into the next cycle. Use when the user says "mulai", "lanjut T01", "siklus baru", "rekap", or wants the next video made; reads hasil/STATE.md and updates hasil/tracks/<ID>/TRACK.md.
---

# Video Content Cycle

Orkestrator untuk satu siklus konten di **satu track**: satu video master, potongan Shorts, dan versi Bahasa Indonesia. Siklus berulang setiap minggu di track itu, dan setiap siklus membaca pelajaran dari siklus sebelumnya di track yang sama. Satu sesi = satu track.

## Boot

1. Cari `hasil/STATE.md`. Kalau tidak ada, cek apakah folder ini Video Content Kit (ada `AGENTS.md` dan `instruksi/`). Kalau bukan, tawarkan untuk membuat struktur minimal lewat skill `video-portfolio`.
2. Kalau belum ada track, jalankan skill `video-niche-research` dulu.
3. Tentukan track: yang disebut kreator, lalu `track_fokus`, lalu track `aktif`/`validasi` yang paling lama tertunda. Track `usulan`, `jeda`, dan `drop` tidak dijalankan siklusnya.
4. Baca `hasil/tracks/<ID>/TRACK.md`. Kalau `menunggu_keputusan` (di STATE atau TRACK) terisi, tanyakan itu dulu.
5. Jalankan `langkah_berikutnya` track itu. Kalau track sedang `validasi`, ikuti paket uji di `validasi/rencana.md` (lihat skill `video-portfolio`).

## Langkah siklus

| # | Langkah | Instruksi rinci | Output | Gate |
| --- | --- | --- | --- | --- |
| 1 | Riset viral | `instruksi/03-riset-konten-viral.md` | `01-riset-viral.md` | Pilih 1 dari 3 sudut |
| 2 | Brief + naskah | `instruksi/04-naskah.md` | `02-brief.md`, `03-script.json`, `03-naskah.md` | Setujui naskah |
| 3 | Produksi | `instruksi/05-produksi.md` | audio, caption, `04-assets.json`, render | Setujui klip footage |
| 4 | QA | `instruksi/06-qa-anti-slop.md` + skill `video-anti-slop` | `05-qa.md` | Harus LULUS |
| 5 | Publish | `instruksi/07-publish.md` | `06-publish.md` | Selalu minta persetujuan |
| 6 | Analitik | `instruksi/08-analitik-dan-loop.md` | `hasil/tracks/<ID>/analitik/*.md`, `learnings.md`, `backlog.md` | Keputusan besar lewat review portfolio |

Semua output siklus ada di `hasil/tracks/<ID>/siklus/NNN-slug/`. Kalau file instruksi rinci tidak tersedia (skill dipakai di luar kit), ikuti ringkasan di bawah.

## Ringkasan per langkah (dipakai bila instruksi rinci tidak ada)

1. **Riset viral:** cari 5 sampai 10 outlier (view minimal 3x median channel-nya, umur di bawah 90 hari). Catat judul, hook, struktur, thumbnail, dan pertanyaan di komentar. Simpulkan 3 pola dan celahnya, lalu usulkan 3 sudut yang memakai bukti milik kreator. Pola boleh ditiru, isi tidak.
2. **Riset fakta + naskah:** sebelum menulis, catat klaim subjek (id `C01…`, sumber otoritatif, status terverifikasi/disederhanakan/belum) termasuk bentuk, bagian, ukuran relatif, lingkungan, dan gerak subjek yang akan digambar. Tulis untuk didengar. Hook di 2 detik pertama, janji terbayar sebelum detik 30, satu ide per scene, re-hook setiap 60 sampai 90 detik, angka dan kode konkret, serta penutup dengan satu takeaway. Siapkan 3 judul, 2 teks thumbnail, potongan Shorts, dan versi Indonesia yang dilokalisasi. Visual gaya R3: satu shot per kalimat (`show`, `motion`, label di katanya) di `03-script.json`, ditambah `03-visual.json` per scene (tujuan, subjek dan anatominya, lingkungan, perilaku, komposisi, animasi, klaim pendukung, literal/disederhanakan/metafora). Scene yang hanya berkata "tampilkan X" belum siap diproduksi.
3. **Produksi:** ElevenLabs TTS per scene (paket berbayar, key di `.env`). Durasi audio menentukan durasi scene. ElevenLabs STT dengan timestamp per kata menjadi caption. Ambil B-roll dari Pexels/Pixabay maksimal sepertiga durasi, dengan lisensi dicatat. Visual dirender mesin R3 Remotion dari komponen per shot (`04-shots.tsx`), dengan waktu shot dan label dari caption per kata; komposisi `Master16x9`, `Short9x16`, `ClipID9x16`, `Thumbnail`, dan `ThumbnailShort` membaca data yang sama.
4. **QA:** jalankan `video-anti-slop`. GAGAL berarti kembali ke langkah yang relevan.
5. **Publish:** siapkan metadata per platform dan keputusan label AI. Kirim hanya setelah kreator menyetujui.
6. **Analitik (48 jam dan 7 hari):** cek CTR, persentase ditonton, titik drop, rasio ditonton vs swipe, dan share. Tulis pelajaran sebagai aturan yang bisa diuji ke `learnings.md`, dan perbarui skor backlog.

## Aturan loop

- Setiap siklus baru membaca `learnings.md` track itu dan `hasil/learnings-global.md`, lalu menyebut pelajaran mana yang diterapkan di brief.
- Satu pelajaran baru dianggap pasti setelah didukung 2 siklus.
- Scale, pivot, jeda, dan drop tidak diputuskan di siklus. Kalau 3 siklus berturut-turut di bawah target CTR **dan** retensi setelah hook dan judul divariasikan, tandai track untuk review portfolio.
- Setiap langkah selesai: perbarui frontmatter TRACK.md, tabel siklus, dan satu baris log. Perbarui STATE hanya bila tahap track berubah.
- Laporkan ke kreator dalam 2 sampai 4 kalimat, diawali ID track: apa yang selesai, file yang ditulis, dan langkah berikutnya.
