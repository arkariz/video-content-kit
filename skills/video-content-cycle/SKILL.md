---
name: video-content-cycle
description: Run the repeatable weekly video production loop for a locked niche - viral outlier research, brief, script.json, ElevenLabs voice and captions, B-roll plus Remotion visuals, anti-slop QA, multi-platform publish prep, and analytics that feed learnings into the next cycle. Use when the user says "mulai", "lanjut", "siklus baru", "rekap", or wants the next video made for their channel; reads and updates hasil/STATE.md.
---

# Video Content Cycle

Orkestrator untuk satu siklus konten: satu video master, potongan Shorts, dan versi Bahasa Indonesia. Siklus berulang setiap minggu dengan niche yang sama, dan setiap siklus membaca pelajaran dari siklus sebelumnya.

## Boot

1. Cari `hasil/STATE.md`. Kalau tidak ada, cek apakah folder ini Video Content Kit (ada `AGENTS.md` dan `instruksi/`). Kalau bukan, tawarkan untuk membuat struktur minimal: `hasil/STATE.md`, `hasil/learnings.md`, `hasil/backlog.md`, `hasil/siklus/`.
2. Kalau `niche` kosong, jalankan skill `video-niche-research` dulu.
3. Kalau `menunggu_keputusan` terisi, tanyakan itu dulu ke kreator.
4. Jalankan langkah dari `langkah_berikutnya`.

## Langkah siklus

| # | Langkah | Instruksi rinci | Output | Gate |
| --- | --- | --- | --- | --- |
| 1 | Riset viral | `instruksi/02-riset-konten-viral.md` | `01-riset-viral.md` | Pilih 1 dari 3 sudut |
| 2 | Brief + naskah | `instruksi/03-naskah.md` | `02-brief.md`, `03-script.json`, `03-naskah.md` | Setujui naskah |
| 3 | Produksi | `instruksi/04-produksi.md` | audio, caption, `04-assets.json`, render | Setujui klip footage |
| 4 | QA | `instruksi/05-qa-anti-slop.md` + skill `video-anti-slop` | `05-qa.md` | Harus LULUS |
| 5 | Publish | `instruksi/06-publish.md` | `06-publish.md` | Selalu minta persetujuan |
| 6 | Analitik | `instruksi/07-analitik-dan-loop.md` | `hasil/analitik/*.md`, `learnings.md`, `backlog.md` | Pivot butuh persetujuan |

Semua output siklus ada di `hasil/siklus/NNN-slug/`. Kalau file instruksi rinci tidak tersedia (skill dipakai di luar kit), ikuti ringkasan di bawah.

## Ringkasan per langkah (dipakai bila instruksi rinci tidak ada)

1. **Riset viral:** cari 5 sampai 10 outlier (view minimal 3x median channel-nya, umur di bawah 90 hari). Catat judul, hook, struktur, thumbnail, dan pertanyaan di komentar. Simpulkan 3 pola dan celahnya, lalu usulkan 3 sudut yang memakai bukti milik kreator. Pola boleh ditiru, isi tidak.
2. **Naskah:** tulis untuk didengar. Hook di 2 detik pertama, janji terbayar sebelum detik 30, satu ide per scene, re-hook setiap 60 sampai 90 detik, angka dan kode konkret, serta penutup dengan satu takeaway. Siapkan 3 judul, 2 teks thumbnail, potongan Shorts, dan versi Indonesia yang dilokalisasi.
3. **Produksi:** ElevenLabs TTS per scene (paket berbayar, key di `.env`). Durasi audio menentukan durasi scene. ElevenLabs STT dengan timestamp per kata menjadi caption. Ambil B-roll dari Pexels/Pixabay maksimal sepertiga durasi, dengan lisensi dicatat. Komposisi Remotion `Master16x9`, `Short9x16`, `ClipID9x16`, dan `Thumbnail` membaca data yang sama.
4. **QA:** jalankan `video-anti-slop`. GAGAL berarti kembali ke langkah yang relevan.
5. **Publish:** siapkan metadata per platform dan keputusan label AI. Kirim hanya setelah kreator menyetujui.
6. **Analitik (48 jam dan 7 hari):** cek CTR, persentase ditonton, titik drop, rasio ditonton vs swipe, dan share. Tulis pelajaran sebagai aturan yang bisa diuji ke `learnings.md`, dan perbarui skor backlog.

## Aturan loop

- Setiap siklus baru membaca `learnings.md` dan menyebut pelajaran mana yang diterapkan di brief.
- Satu pelajaran baru dianggap pasti setelah didukung 2 siklus.
- Pivot niche hanya diajukan setelah 3 siklus berturut-turut di bawah target CTR **dan** retensi, setelah hook dan judul divariasikan.
- Setiap langkah selesai: perbarui frontmatter STATE, status siklus, dan satu baris log.
- Laporkan ke kreator dalam 2 sampai 4 kalimat: apa yang selesai, file yang ditulis, dan langkah berikutnya.
