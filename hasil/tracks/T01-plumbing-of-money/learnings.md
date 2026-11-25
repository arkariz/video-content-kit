# Learnings: T01

Diisi oleh langkah analitik dan hasil validasi track ini. Setiap siklus baru di track ini wajib membaca file ini. Tulis pelajaran sebagai aturan yang bisa diuji, dengan bukti (siklus + angka). Pelajaran yang juga terbukti di track lain dinaikkan ke `hasil/learnings-global.md` saat review portfolio.

## Hook yang bertahan

## Hook yang gagal

## Topik dan sudut yang mendatangkan view

## Titik penonton keluar (retensi)

## Judul dan thumbnail

## Per platform

## Aturan yang sedang diuji

### Dari siklus 001: terlalu padat, kurang bisa dilihat (2026-11-25)

**Sumber:** penilaian kreator setelah menonton hasil jadi. Belum ada data penonton (analitik 001 mulai 2026-12-02), jadi ini hipotesis yang harus diuji.

**Keluhan kreator:** isi terlalu kompleks, penjelasan hampir hanya lewat suara dan caption, gambaran visual yang mudah dimengerti kurang, dan teori dasar yang perlu dipahami dulu tidak dijelaskan cukup.

**Bukti dari 001** (diukur dari `03-script.json` dan `04-stage.json`):
- Sekitar 25 istilah teknis dalam 8:04, kira-kira satu istilah baru tiap 19 detik, pada 167 kata per menit.
- Tiga konsep inti tidak dibangun dulu: kata "authorization" tidak pernah diucapkan di narasi EN, "clearing" baru muncul 4:59 dan "settlement" 6:01, padahal hanya tampil sebagai kotak di layar pada 0:05.
- Istilah mendalam datang sangat awal: cryptogram 0:32, token 0:45, acquirer 0:59, ISO 8583 1:26.
- Visual: 36 dari 58 scene memakai papan teks/infografis, hanya 12 scene memperlihatkan sesuatu berpindah. 67 bubble, sebagian besar candaan yang tidak menjelaskan.
- Penyebab dari proses: 5 scene konsep baru ditambahkan demi durasi 8:00, dan aturan QA mendorong bubble menjadi candaan.

**Aturan untuk siklus berikutnya** (uji di 002):
1. **Fondasi dulu.** Sebelum detail, jelaskan dalam 60 sampai 90 detik: siapa pemainnya, tahapnya apa, dan satu analogi sehari-hari. Analogi itu dipakai sampai akhir.
2. **Anggaran konsep.** Maksimal 8 istilah baru per video panjang (3 per Short), dan tidak lebih dari satu istilah baru per 45 detik.
3. **Definisikan saat pertama muncul:** kalimat bahasa awam, contoh, dan gambar. Istilah yang tidak sempat didefinisikan dibuang.
4. **Perlihatkan prosesnya.** Tiap scene penjelasan menunjukkan benda yang bergerak atau berubah (uang, pesan, catatan, saldo). Target minimal 70% scene; papan teks maksimal 30%.
5. **Satu peta yang tetap.** Diagram alur yang sama muncul berulang dengan posisi saat ini disorot, supaya penonton tidak tersesat.
6. **Detail teknis hanya satu pendalaman per video.** Kode field dan nomor pesan masuk hanya bila menjadi inti janji video.
7. **Bubble boleh menjelaskan** dengan bahasa awam, bukan hanya bercanda; tetap tidak mengulang narasi kata per kata.
8. **Jangan menambah konsep demi durasi.** Tambah contoh, perlambat, atau ulangi lewat analogi. Bila tetap di bawah 8:00, kreator memutuskan antara video lebih pendek atau topik lebih luas.

**Cara mengukur:** retensi di titik pengenalan istilah, average percentage viewed dibanding ambang V2 (30%), komentar yang minta penjelasan ulang, dan penilaian kreator sebelum publish (bisakah orang awam menjelaskan ulang tiga tahap setelah menonton?).
