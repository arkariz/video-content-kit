# Brief: siklus 001 (T02, uji-V2 variasi A)

- **Janji video:** Setelah menonton, kamu bisa menjelaskan kenapa Jakarta bisa menjalankan kereta pensiunan Tokyo selama 25 tahun tanpa membongkar relnya, dan kenapa batas umur impor 20 tahun mengakhiri cara itu pada November 2026.
- **Penonton:** penonton global yang suka video geografi, infrastruktur, dan kereta (penonton The Odd Decision, Behind Asia, Unix Travels). Mereka tahu Jakarta memakai kereta bekas Jepang, tapi belum tahu soal lebar rel, aturan umur impor, dan pembatalan November 2026. Audio Indonesia untuk penonton domestik yang bangga dengan transportasi Jakarta (lihat komentar Unix Travels di riset).
- **Bukti milik kreator:**
  - Footage rekaman sendiri di KRL, wajib sebelum 30% durasi: s01 (interior eks JR 205 dengan tulisan Jepang), s02 (rangkaian eks Jepang masuk peron), s11 (rel dan kabel aliran atas dari jendela). Lalu s31 (rangkaian CRRC di lintas Bogor), s34 (peron jam sibuk), s54 dan s57 (pengambilan penutup).
  - Sumber berbahasa Indonesia (Bisnis, Katadata, detik, Liputan6, MetroTV, CNBC Indonesia, Puslit DPR) untuk babak 2023 sampai 2026. Babak ini belum dibuat video berbahasa Inggris mana pun di riset.
- **Format:** master sekitar 8:25 (perkiraan dari 1.380 kata EN, dicek ulang setelah TTS; syarat ≥ 8:00), 2 Shorts (A1, A2), versi Indonesia: ya (audio track kedua).
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
  - QA T01 T8 (bubble) tidak berlaku lagi: gaya diorama tanpa bubble. Angka dan keterangan menempel pada benda (callout).
  - QA T01 T2: tidak ada `say_as` untuk istilah yang biasa dibaca benar oleh TTS. Hanya "Sifang".
- **Gaya visual wajib: diorama 2.5D** (`instruksi/referensi/gaya-diorama.md`, berlaku sejak 2026-11-25). Naskah ditulis ulang visualnya, narasi dan sumber tidak berubah (`03-script.diorama.py` menghasilkan `world` dan `stage` tiap scene).
  - **Dunia (satu peta tetap):** Tokyo di kiri (menara, pinus, kereta lama), laut Jepang-Jawa di tengah, Jakarta di kanan (menara kota, stasiun Jakarta Kota, lintas Bogor dan Cikarang), pabrik INKA di Jawa Timur, CRRC di utara seberang laut (Tiongkok), gedung KAI dan pemerintah/DPR di tepi Jakarta. Jalur pengiriman kapal dan lintas rel digambar bertahap.
  - **Tokoh dan benda:** kereta (`actor:train`) sebagai tokoh utama, kapal, Guide sebagai penutur kecil. Tanpa bubble dan tanpa papan teks.
  - **Aset baru yang dibutuhkan:** tidak ada. Dipakai apa adanya: `tower`, `house`, `bankhall`, `shop`, `palm`, `pine`, `tree`, `bush`, `lock`, `envelope`, `actor:train`, `actor:ship`, `actor:guide`. Opsional kalau agent repo sempat: livery kereta Jepang vs Tiongkok yang berbeda warna, dan rel di tanah.
  - **Footage:** 12 scene memakai footage (7 file milik kreator dan stok) di atas dunia diorama, 20 sampai 34% durasi.
  - **Anggaran konsep (maks. 8 per video panjang):** lebar rel, listrik 1.500 V DC, seri 205, INKA, CRRC Sifang, batas umur barang modal bekas, retrofit, KAI sebagai operator. Delapan istilah, pas di batas. Istilah lain (E217, Tokyo Metro 6000, Mita Line) hanya disebut sebagai nama, tidak dijelaskan.
  - **Belum terpenuhi sepenuhnya:** aturan "fondasi dulu" (60 sampai 90 detik pertama harus memperkenalkan pemain, tahap, dan satu analogi sehari-hari). Hook sampai s06 memperkenalkan kereta dan Tokyo, tetapi pemain keputusan (KAI, pemerintah, INKA) baru muncul di s20 ke atas, dan belum ada analogi. Lihat pilihan di `menunggu_keputusan` TRACK.md.
- **Hal yang sengaja dihindari:**
  - Menyebut nama tokoh politik atau pejabat yang masih aktif. Naskah hanya menyebut institusi (KAI, Kemendag, Kemenhub, Komisi VI DPR). Kutipan direktur utama KAI ditulis tanpa nama.
  - Dugaan tekanan China lewat pinjaman kereta cepat (CNN Indonesia 2024, sumber anonim) dan kasus korupsi impor KRL 2006–2007. Keduanya di luar sudut track (politik berjalan, kriminal) dan belum bisa diverifikasi.
  - Angka 395 kerusakan motor traksi (IRJ). Konteks artikelnya armada lokomotif, bukan KRL, jadi diganti alasan suku cadang dari RRI.
  - Klaim orang pertama ("saya naik KRL ini setiap hari") karena narasinya suara sintetis dan belum ada konfirmasi pengalaman kreator.
  - Batas negara pada peta dunia diorama. Tokyo, Jakarta, INKA, dan Tiongkok hanya berupa tempat bertanda, tanpa garis perbatasan.

## Footage yang harus direkam kreator (target 2026-11-28/29)

Taruh di `produksi/footage-own/T02/`. Tanpa wajah orang yang dikenali dari dekat; ambil dari belakang atau dengan fokus pada kereta.

| File | Isi | Scene | Durasi minimal |
| --- | --- | --- | --- |
| `krl-01.mp4` | Interior eks JR East 205: stiker, tulisan, atau pelat Jepang di dinding atau atas pintu | s01 (hook) | 12 detik |
| `krl-01b.mp4` | Interior eks JR 205, pengambilan berbeda (misalnya pegangan tangan atau jendela) | s57 (penutup) | 15 detik |
| `krl-02.mp4` | Rangkaian eks Jepang masuk peron | s02 | 12 detik |
| `krl-02b.mp4` | Rangkaian eks Jepang di peron lain atau sudut lain | s54 | 14 detik |
| `krl-03.mp4` | Peron atau gerbong saat jam sibuk, dari belakang | s34 | 10 detik |
| `krl-04.mp4` | Rangkaian CRRC baru (seri SFC120-V) di lintas Bogor | s31 | 16 detik |
| `krl-05.mp4` | Rel dan kabel listrik aliran atas dari jendela kereta | s11 (re-hook) | 12 detik |

Kalau `krl-01`, `krl-02`, dan `krl-05` belum ada, QA otomatis akan GAGAL di K1 (bukti kreator), sama seperti T01.

## Catatan untuk tooling bersama (di luar sesi track ini)

`scripts/produksi/build-visual.mjs` menolak `broll: {"own": "..."}` tanpa `keywords` ("broll tanpa keywords/keep"), padahal `produksi/CONTRACT.md` dan `footage.mjs` mendukung `own`. Di siklus ini, setiap scene `own` diberi `keywords` cadangan. `footage.mjs` membaca `own` lebih dulu, jadi footage milik kreator tetap yang dipakai. Perbaikan validator sebaiknya dikerjakan di sesi portfolio tersendiri.
