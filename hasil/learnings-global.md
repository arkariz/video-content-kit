# Learnings global (lintas track)

Hanya berisi pelajaran yang terbukti di minimal 2 track berbeda, misalnya pola hook, durasi, gaya thumbnail, atau jam tayang. Pelajaran yang baru terbukti di satu track tetap disimpan di `tracks/<ID>/learnings.md`. Review portfolio yang memindahkan pelajaran ke sini.

## Arahan kreator, berlaku semua track (belum terbukti dengan data)

Bagian ini pengecualian atas syarat "terbukti di 2 track": dimasukkan atas permintaan kreator, dan dinilai ulang pada review portfolio setelah ada data penonton. **Baca sebelum menulis brief dan naskah siklus apa pun.**

### Jangan terlalu padat; perlihatkan, jelaskan fondasinya (2026-11-25, dari T01 siklus 001)

Penilaian kreator atas hasil jadi: isi terlalu kompleks, penjelasan hampir hanya lewat audio dan caption, gambaran visual yang mudah dimengerti kurang, dan teori dasar tidak dijelaskan cukup. Bukti terukur ada di `tracks/T01-plumbing-of-money/learnings.md`.

1. **Fondasi dulu:** dalam 60 sampai 90 detik pertama (Short: kalimat awal), jelaskan siapa pemainnya, tahapnya apa, dan satu analogi sehari-hari yang dipakai sampai akhir.
2. **Anggaran konsep:** maksimal 8 istilah atau konsep baru per video panjang dan 3 per Short, tidak lebih dari satu per 45 detik.
3. **Definisikan saat pertama muncul** dengan bahasa awam, contoh, dan gambar. Yang tidak sempat didefinisikan dibuang.
4. **Perlihatkan prosesnya:** setiap shot memperlihatkan benda bergerak atau berubah; tanpa papan teks.
5. **Satu peta yang tetap** (alur, peta wilayah, atau garis waktu) muncul berulang dengan posisi saat ini disorot.
6. **Satu pendalaman teknis per video.**
7. **Penjelasan dibawa gambar dan label pada benda** dengan bahasa awam; bubble hanya untuk sikap atau lelucon.
8. **Jangan menambah konsep demi durasi.** Tambah contoh atau ulangi lewat analogi; bila tetap kurang, kreator yang memutuskan.

**Gaya wajib:** ilustrasi gerak penjelas R3 (`instruksi/referensi/gaya-visual.md`, sejak 2026-11-26). Poin 4 dan 5 dipenuhi lewat `shots` (satu kalimat satu gambar, wajib ada `motion`) dan `anchor`.

Referensi gaya dari kreator (latar kaya, banyak aset, banyak gerakan): `produksi/REFERENSI-GAYA.md`.

Uji sebelum publish: bisakah orang awam menjelaskan ulang inti video setelah sekali menonton?

Aturan ini belum dicek otomatis oleh QA dan belum ada komponen visual baru untuk poin 4 dan 5, jadi dipenuhi lewat naskah dan spec adegan, lalu diperiksa manual.

### Lebih mulus, tanpa garis kaku: jangan terlihat seperti kartun balok (2026-11-26, dari T02 siklus 001 versi 3D)

Penilaian kreator atas render 3D: hasilnya **masih terlihat kartun, dengan garis kaku yang tegas, dan tidak mulus**. Arah untuk video berikutnya: tampilan dan gerak yang mulus seperti video Kurzgesagt (In a Nutshell). Yang ditiru tetap hanya teknik; tokoh, aset, huruf, warna merek, dan susunan adegannya tidak disalin. Kedalaman 3D tetap dipertahankan.

Terjemahan ke produksi sekarang ada di `produksi/STYLE.md` (bagian 2.2 dan 11) dan `produksi/PIPELINE.md` bagian "Mesin R3" (gerak dengan awalan dan susulan). Persetujuan gayanya lewat 3 sampai 5 still dan satu klip 10 sampai 20 detik (prototipe `produksi/contoh-r3/P01-tetes-air/`), berlaku juga dalam mode `otomatis`. T02 siklus 001 versi 3D tidak dijadikan acuan gaya.

### Gaya cerita wajib (2026-11-26)

Semua naskah memakai `instruksi/referensi/gaya-cerita.md` sebagai acuan utama dan mencentang checklist ceritanya. Sumber: teknik dari 3 transkrip (Kurzgesagt x2, OverSimplified) yang dipilih kreator. Dinilai ulang di review portfolio setelah analitik T01-002.

### Aturan uji: Short menjawab janjinya sejak awal (2026-11-27, dari T02 siklus 001)

Dimasukkan atas permintaan kreator sebagai **aturan uji**, belum terbukti: buktinya baru satu video di satu track. Berlaku saat menulis dan memotong Short yang belum diproduksi; Short yang sudah jadi (termasuk T02 siklus 003) tidak diubah.

1. Kalimat pertama bisa dipahami tanpa konteks: tidak diawali "So" atau "Then", dan tidak menyebut orang, benda, atau pihak yang belum dikenalkan di Short itu.
2. Jawaban atas janji hook atau judul mulai di kalimat kedua, paling lambat detik 6. Konteks menyusul.

**Bukti awal:** T02 001 Short A1 (data 2026-11-25 sampai 11-26, 1 video): retensi sekitar 100% di detik 4,7, turun ke 43% di detik 15 saat narasi membahas konteks, lalu 43% ke 22% dalam 35 detik setelah jawaban mulai. Viewed vs swiped 57,4%; rata-rata tonton 0:27 dari 0:51. Rincian di `tracks/T02-why-southeast-asia/analitik/`. Poin 1 belum punya data retensi pembanding.

**Cara mengukur:** retensi detik 15 (A1: 43%) dan viewed vs swiped (A1: 57,4%), dicatat per track di `learnings.md`. Dinilai pada review portfolio setelah data dari minimal 2 Short berikutnya dan satu track lain; bila tidak didukung, dicabut.

### Efek suara ElevenLabs di semua konten (2026-11-27)

Permintaan kreator: setiap video memakai efek suara berkualitas dari ElevenLabs, mulai T01 siklus 005. Cara pakai dan pustaka bersama: `produksi/PIPELINE.md` bagian "Suara". Siklus baru tidak siap render tanpa `04-audio.json` berisi cues.

## Format dan struktur

## Hook dan judul

## Produksi (suara, visual, caption)

## Distribusi per platform

## Yang tidak berlaku lintas track
