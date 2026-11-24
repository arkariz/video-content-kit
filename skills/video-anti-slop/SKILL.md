---
name: video-anti-slop
description: Quality gate that catches AI slop in video content before publishing - narration scripts (English and Indonesian), titles, visuals, voice/captions, and channel-level repetition. Use when reviewing a video script, render, or batch of uploads, when the user says "cek slop", "anti slop", "QA video", or before any video is published. Produces a LULUS/GAGAL report with specific fixes.
---

# Video Anti-Slop

Gate kualitas untuk konten video berbasis AI. Tujuannya dua: penonton tidak merasa sedang menonton konten AI massal, dan channel tidak jatuh ke kategori "inauthentic content" yang tidak bisa dimonetisasi.

Slop bukan soal "dibuat dengan AI". Slop adalah konten yang bisa dibuat siapa saja dengan prompt yang sama: generik, berulang, dan tanpa bukti dari orang yang membuatnya. Pola permukaan (kata, tanda baca) hanya gejala. Perbaiki penyebabnya dulu, baru gejalanya.

## Input

Satu atau lebih dari: naskah (`03-script.json` / `03-naskah.md`), judul dan deskripsi, file render atau frame-nya, file caption, dan daftar 3 video sebelumnya (untuk lapisan channel). Kalau ada file yang tidak tersedia, periksa lapisan yang bisa diperiksa dan tandai sisanya `tidak diperiksa`.

## Lapisan 1: Teks (narasi, judul, deskripsi)

1. **Cek substansi dulu.** Setiap scene harus memuat sesuatu yang spesifik: angka, nama API, nama file, baris kode, atau pengalaman. Scene yang hanya berisi pernyataan umum ditulis ulang atau dibuang.
2. **Jalankan humanizer**, kalau skill `humanizer` tersedia (blader/humanizer, berbasis panduan Wikipedia "Signs of AI writing"). Fokus pada: kontras "not X but Y", penutup satu baris yang dramatis, run-up sebelum poin, triad yang dipaksakan, kata AI yang berlebihan, klaim yang digelembungkan, dan bahasa jualan.
3. **Jalankan stop-slop**, kalau skill `stop-slop` tersedia (hardikpandya/stop-slop). Beri skor 5 dimensi: Directness, Rhythm, Trust, Authenticity, Density, masing-masing 1 sampai 10. **Ambang lulus: 35/50.**
4. **Kalau kedua skill tidak tersedia**, pakai `references/spoken-script-rules.md`, yang berisi ringkasan aturan inti plus aturan khusus naskah lisan.
5. **Narasi Bahasa Indonesia:** cek juga `references/pola-slop-indonesia.md`.
6. **Judul dan thumbnail:** janjinya harus terbayar dalam 10 detik pertama (atau 2 detik di Shorts). Judul yang tidak sesuai isi otomatis GAGAL.

Catatan untuk naskah lisan: beberapa aturan tulisan tidak berlaku. Pengulangan kata kunci dan kalimat pendek yang berirama boleh dipakai bila membantu pendengar. Yang tidak boleh adalah pengisi kosong dan pernyataan umum.

## Lapisan 2: Visual

Periksa render atau frame per scene dengan `references/video-slop-checklist.md` bagian Visual. Item wajib:

- Bukti milik kreator terlihat di layar (kode nyata, screen recording, data, wajah atau tangan kreator) minimal sekali di 30% awal video.
- Footage stok maksimal sekitar sepertiga dari total durasi.
- Tidak ada citra AI dengan teks rusak, anatomi aneh, atau fisika yang mustahil.
- Tidak ada B-roll klise teknologi (sirkuit menyala, kode Matrix, hacker berkerudung, dan sejenisnya) kecuali kontennya memang membahas itu.
- Kode di layar bisa dikompilasi dan diambil dari file sumber, bukan dikarang.
- Caption terbaca di layar HP dan cocok dengan audio.

## Lapisan 3: Audio

- Tidak ada salah ucap istilah teknis. Periksa daftar `pronunciations` dan dengarkan setiap kemunculan pertama istilah.
- Tempo tidak monoton sepanjang video. Ada jeda sebelum poin penting.
- Musik latar tidak menutupi narasi. Di Shorts, hindari musik berlisensi YouTube karena memotong pool pendapatan.
- Kalau suara clone dipakai, suara itu milik kreator sendiri, atau sudah ada izin tertulis.

## Lapisan 4: Channel

Bandingkan dengan 3 video terakhir:

- **Uji prompt yang sama:** kalau channel lain memberi prompt yang sama ke AI, apakah hasilnya hampir sama? Kalau ya, GAGAL.
- **Variasi template:** struktur, layout pembuka, dan transisi tidak identik 3 kali berturut-turut.
- **Tiga kategori inauthentic content dari YouTube:** generik/repetitif/template, konten yang mengganggu atau menyedihkan demi view, dan AI persona yang membahas keuangan, hukum, atau kesehatan. Satu saja terpenuhi, GAGAL.
- **Kehadiran manusia:** dalam 4 video terakhir, minimal ada satu bentuk kehadiran nyata kreator (suara asli atau clone milik sendiri, screen recording kerja nyata, wajah, atau tangan). Pemeriksaan ini mengikuti laporan bahwa YouTube makin memprioritaskan host manusia.

## Output

Tulis laporan dengan format `instruksi/templates/qa-report.md` kalau tersedia. Kalau tidak, pakai struktur ini:

1. Keputusan: **LULUS** atau **GAGAL**.
2. Tabel per lapisan: hasil, skor, catatan.
3. Uji orisinalitas: 3 jawaban (lihat lapisan 4 dan bukti milik kreator).
4. Tabel temuan: kutipan teks atau timestamp, tingkat (kritis/sedang/kecil), dan perbaikan konkret.

Satu temuan kritis sudah cukup untuk GAGAL. Kalau diminta memperbaiki, tulis ulang bagian yang gagal, jalankan lagi lapisan terkait, lalu tambahkan bagian "Setelah perbaikan".

## Yang bukan slop

Jangan "memperbaiki" hal yang bukan masalah: istilah teknis yang memang tepat, struktur langkah-demi-langkah dalam tutorial, atau kalimat pendek yang jelas. Tujuannya konten yang spesifik dan jujur, bukan konten yang lolos detektor AI.
