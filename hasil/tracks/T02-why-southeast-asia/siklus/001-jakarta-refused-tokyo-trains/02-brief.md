# Brief: siklus 001 (T02, uji-V2 variasi A)

- **Janji video:** Setelah menonton, kamu bisa menjelaskan kenapa Jakarta bisa menjalankan kereta pensiunan Tokyo selama 25 tahun tanpa membongkar relnya, dan kenapa batas umur impor 20 tahun mengakhiri cara itu pada November 2026.
- **Penonton:** penonton global yang suka video geografi, infrastruktur, dan kereta (penonton The Odd Decision, Behind Asia, Unix Travels). Mereka tahu Jakarta memakai kereta bekas Jepang, tapi belum tahu soal lebar rel, aturan umur impor, dan pembatalan November 2026. Audio Indonesia untuk penonton domestik yang bangga dengan transportasi Jakarta (lihat komentar Unix Travels di riset).
- **Bukti milik kreator:**
  - Footage rekaman sendiri di KRL, wajib sebelum 30% durasi: s01 (interior eks JR 205 dengan tulisan Jepang), s02 (rangkaian eks Jepang masuk peron), s11 (rel dan kabel aliran atas dari jendela). Lalu s31 (rangkaian CRRC di lintas Bogor), s34 (peron jam sibuk), s54 dan s57 (pengambilan penutup).
  - Sumber berbahasa Indonesia (Bisnis, Katadata, detik, Liputan6, MetroTV, CNBC Indonesia, Puslit DPR) untuk babak 2023 sampai 2026. Babak ini belum dibuat video berbahasa Inggris mana pun di riset.
- **Format:** master sekitar 8:50 (perkiraan dari 1.502 kata EN setelah penulisan ulang R3, dicek ulang setelah TTS; syarat ≥ 8:00), 2 Shorts (A1, A2), versi Indonesia: ya (audio track kedua).
- **Judul (3 varian):**
  1. Jakarta Just Refused Tokyo's Old Trains. Here's Why
  2. Why Jakarta Runs on Tokyo's Retired Trains, and Why That Just Ended
  3. Tokyo's Old Trains Are Now Too Old for Jakarta
- **Teks thumbnail (2 varian, maksimal 4 kata):**
  1. TOO OLD TO IMPORT
  2. TOKYO'S TRAINS, REJECTED
- **Learnings yang diterapkan:** `learnings.md` T02 dan `learnings-global.md` masih kosong. Yang dipakai adalah pola dari riset siklus 001 (`01-riset-viral.md`) dan temuan QA T01 siklus 001 (`05-qa.md` T01) yang berlaku lintas track:
  - Pola 1 riset: angka spesifik dalam 10 detik pertama ("hundreds of cars", lalu 72 gerbong di s04).
  - Pola 3 riset: keputusan dengan harga yang jelas (Rp0,8 sampai 1 miliar vs Rp10 sampai 12 miliar, Rp261 miliar per rangkaian).
  - QA T01 T1: bukti nyata kreator di layar sebelum 30% durasi. Di sini berupa footage KRL sendiri di s01, s02, s11.
  - QA T01 T4: setiap klaim fakta bersumber (66 sumber per scene di `03-script.json`).
  - QA T01 T6: re-hook tiap 60 sampai 90 detik (s11, s20, s30, s40, s50).
  - QA T01 T8 (bubble): bubble hanya untuk sikap atau lelucon (maks. 6 kata, jarang); siklus ini tidak memakai bubble.
  - QA T01 T2: tidak ada `say_as` untuk istilah yang biasa dibaca benar oleh TTS. Hanya "Sifang".
- **Gaya visual wajib: ilustrasi gerak penjelas R3** (`instruksi/referensi/gaya-visual.md`, berlaku sejak 2026-11-26, menggantikan diorama 2.5D). Siklus 001 ditulis ulang ke gaya ini atas permintaan kreator 2026-11-26, walau aturan repo mengecualikannya. `03-script.r3.py` menghasilkan `anchor`, `cast`, `shots` per kalimat, dan `04-shots.tsx`.
  - **Jangkar:** satu peta Jepang-Jawa-Tiongkok dengan garis laut Tokyo-Jakarta, pin kota, dan kapal pembawa kereta. Muncul di fondasi (s03, s04), tengah (s30, s40), dan penutup (s57, s58).
  - **Pemeran:** Komo (penumpang, "kamu"), Sepuh (kereta eks-Tokyo), Pak Aturan (aturan dan lembaga). Cicak tidak dipakai.
  - **Footage:** scene CC BY (s17, s22, s31, s34) dan stok s44 tetap footage penuh (mesin R3 mengabaikan `broll` bila ada `shots`). Porsi sekitar 7%, di bawah target 20 sampai 30%; menambah klip berlisensi bisa menaikkannya.
  - **Anggaran konsep (maks. 8 per video panjang):** lebar rel, listrik 1.500 V DC, seri 205, INKA, CRRC Sifang, batas umur barang modal bekas, retrofit, KAI sebagai operator. Delapan istilah, pas di batas.
  - **Fondasi dulu:** s02 memperkenalkan analogi baju bekas turunan (digambar R3 dengan Komo dan kemeja), s03 memperkenalkan empat pemain. Analogi kembali di s47 dan penutup s57.
- **Gaya cerita wajib** (`instruksi/referensi/gaya-cerita.md`): lihat tabel checklist di `03-naskah.md`. Perubahan narasi 2026-11-26: s01 (orang kedua), s31 (tanpa klaim tanggal rekaman), s43 (blok insentif), s44 (beat jujur), s50 (tebakan yang patah), s57 (penutup dengan callback dan analogi).
- **Hal yang sengaja dihindari:**
  - Menyebut nama tokoh politik atau pejabat yang masih aktif. Naskah hanya menyebut institusi (KAI, Kemendag, Kemenhub, Komisi VI DPR). Kutipan direktur utama KAI ditulis tanpa nama.
  - Dugaan tekanan China lewat pinjaman kereta cepat (CNN Indonesia 2024, sumber anonim) dan kasus korupsi impor KRL 2006–2007. Keduanya di luar sudut track (politik berjalan, kriminal) dan belum bisa diverifikasi.
  - Angka 395 kerusakan motor traksi (IRJ). Konteks artikelnya armada lokomotif, bukan KRL, jadi diganti alasan suku cadang dari RRI.
  - Klaim orang pertama ("saya naik KRL ini setiap hari") karena narasinya suara sintetis dan belum ada konfirmasi pengalaman kreator.
  - Batas negara pada peta dunia diorama. Tokyo, Jakarta, INKA, dan Tiongkok hanya berupa tempat bertanda, tanpa garis perbatasan.

## Footage kreator

Diganti klip CC BY dari `produksi/footage-lisensi/T02/` (keputusan kreator 2026-11-25), dengan atribusi di `credits.md`. Tidak ada rekaman sendiri yang dibutuhkan; QA K1 (bukti kreator) ditangani lewat `pengecualian_qa: ["bukti-kreator"]` di TRACK.md.

## Catatan untuk tooling bersama (di luar sesi track ini)

`scripts/produksi/build-visual.mjs` menolak `broll: {"own": "..."}` tanpa `keywords` ("broll tanpa keywords/keep"), padahal `produksi/CONTRACT.md` dan `footage.mjs` mendukung `own`. Di siklus ini, setiap scene `own` diberi `keywords` cadangan. `footage.mjs` membaca `own` lebih dulu, jadi footage milik kreator tetap yang dipakai. Perbaikan validator sebaiknya dikerjakan di sesi portfolio tersendiri.
