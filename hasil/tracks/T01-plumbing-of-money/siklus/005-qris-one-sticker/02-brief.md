# Brief: T01 siklus 005-qris-one-sticker (di luar paket V2)

- **Status V2:** di luar paket uji terkunci, seperti 004. Topik dari permintaan kreator 2026-11-27. Tidak dihitung di penilaian 2027-01-03. `validasi/rencana.md` tidak diubah.
- **Janji video:** Setelah menonton, kamu tahu apa yang terjadi dalam dua detik setelah memindai satu stiker QRIS, kenapa toko kecil hampir tidak membayar apa-apa untuk itu, dan bagaimana stiker yang sama kini menerima uang dari negara lain tanpa dolar.
- **Penonton:** penonton tier-1 yang penasaran soal uang dan pernah melihat atau memakai QR di Asia (turis, diaspora, penonton video UPI dan Pix). Tidak perlu tahu istilah pembayaran. Penonton Indonesia ikut lewat audio ID. Sudah tahu dari video lain bahwa "QRIS lawan Visa" ramai, tapi belum tahu jalurnya.
- **Pertanyaan utama (hook):** bagaimana aplikasi bank yang belum pernah "kenal" sebuah warung bisa membayarnya dalam dua detik?
- **Pesan inti:** QRIS bukan aplikasi dan belum mengalahkan Visa; ia satu bentuk colokan yang cocok untuk semua aplikasi, dan di luar negeri ia menjadi adaptor yang menyambung colokan dua negara dengan mata uang masing-masing.
- **Alur pengungkapan:**
  1. Satu scan di warung Bali, dibayar dalam dua detik (s01). Skala: 72 juta orang, 51 juta toko (s02). Dua pertanyaan: bagaimana di dalam negeri, bagaimana di luar negeri (s03).
  2. Sebelum 2019: 26 format QR, toko penuh stiker (s04, s05). Metafora colokan dan stopkontak (s06). Satu bentuk stopkontak untuk semua, 17 Agustus 2019 (s07). Tebakan dipatahkan: QRIS bukan aplikasi (s08). 2020: satu akun, semua aplikasi bisa bayar (s09).
  3. Ikuti satu scan: tiga pemain dan peta tetap (s10), switch = kabel di balik dinding (s11), isi kode (s12), PIN dan pesan (s13), switch meneruskan, bank warung menjawab (s14), centang dan bunyi di dua ponsel (s15).
  4. Re-hook biaya: callback ke video kartu 002 (s16). MDR didefinisikan (s17), 0% sampai Rp100 ribu (s18), di atasnya di bawah 1% dan tidak boleh dibebankan ke pembeli (s19). Mesin insentif: bank sentral, aplikasi, dan warung (s20 sampai s22). Mangkuk Rp50 ribu, warung menerima Rp50 ribu (s23).
  5. Skala dengan pembanding: satu toko QRIS untuk tiap enam orang Indonesia, hampir semuanya usaha kecil (s24). Switch-nya ada di dalam negeri (s25). Re-hook: bagian yang tidak disukai Amerika (s26). Laporan USTR 2025 (s27), aturan switch domestik (s28). Callback twist: bentuk stopkontaknya dirancang klub perusahaan kartu sendiri (s29). Jawaban BI (s30). Steelman: kartu tetap kuat (s31, s32).
  6. Ke luar negeri: urutan negara di peta (s33, s34). Tebakan dipatahkan: tidak lewat dolar (s35). Pendalaman: turis Thailand memindai stiker yang sama (s36), dua switch (s37), harga dalam baht (s38), bank yang ditunjuk menukar rupiah dan baht langsung (s39). Adaptor (s40). Angka inbound vs outbound (s41). Steelman kedua: Jepang 35 toko dan satu arah (s42). Negara berikutnya dan hub bersama (s43, s44).
  7. Penutup membingkai ulang di warung yang sama (s45 sampai s47), ajakan ke video SWIFT (s48).
- **Mekanisme yang dijelaskan:** interoperabilitas satu standar QR (s07 sampai s09), jalur satu scan lewat switch (s10 sampai s15), siapa menanggung biaya (s17 sampai s23), settlement mata uang lokal lintas negara (s36 sampai s40, satu pendalaman teknis video ini).
- **Metafora besar (jangkar):** colokan dan stopkontak. Aplikasi = colokan, kode toko = stopkontak, switch = kabel di balik dinding. Sebelum QRIS: dinding penuh stopkontak berbeda bentuk. QRIS: satu bentuk stopkontak. Lintas negara: adaptor perjalanan antara stopkontak Indonesia dan Thailand. Muncul di s06, s07, s11, s29, s40, s46.
- **Peta tetap:** peta tiga bangunan (aplikasimu di kiri, stasiun switch di tengah, bank warung di kanan) di s10 sampai s15, kembali di s25, s37, dan s47 dengan dua switch dan selat untuk lintas negara. Peta Asia dengan negara mitra menyala di s33, s34, s41, s43.
- **Bukti milik kreator:**
  - Jalur satu scan dijelaskan dari sisi orang yang membangun aplikasi pembayaran di Indonesia: isi kode, pesan ke switch, notifikasi dua sisi (s12 sampai s15). Tanpa klaim kredensial di narasi, tanpa nama kantor.
  - Callback ke video channel sendiri, potongan biaya kartu dari siklus 002 (s16).
  - OPSIONAL (disarankan): klip tangan kreator memindai stiker QRIS di warung, tanpa logo aplikasi dan tanpa wajah, ±4 detik (s01, `broll.own`). Kalau tidak ada, QA mencatat temuan sedang seperti 001 (`pengecualian_qa`).
- **Format:** master 16:9 EN, 48 scene, 1.294 kata EN (estimasi ±8:28 pada 167 kpm, tempo nyata 001, ditambah jeda 0,9 detik), audio ID sebagai track kedua, 2 Shorts.
- **Judul (3 varian):**
  1. Indonesia's QRIS: One Sticker, 72 Million Users
  2. How Indonesia's QRIS Crosses Borders Without Dollars
  3. QRIS: What Happens 2 Seconds After You Scan
  (Diganti 2026-11-27 setelah lint kemasan `kemasan.mjs`: judul lama 62 sampai 86 karakter, terpotong di 60. Pasangan terbaik menurut title.py: judul 1 + "NO DOLLARS NEEDED", 100/100.)
- **Teks thumbnail (2 varian, maksimal 4 kata):**
  1. "ONE STICKER. EVERY APP."
  2. "NO DOLLARS NEEDED"
  Visual thumbnail: stiker QRIS putih di dudukan di meja warung, banyak colokan berbeda warna mengarah ke satu stopkontak di stiker. Tanpa logo aplikasi nyata dan tanpa logo resmi QRIS (hanya kata "QRIS" dengan huruf channel).
- **Thumbnail Short:** S1 "QRIS ISN'T AN APP", S2 "NO DOLLARS IN BETWEEN".
- **Aturan uji Short** (`learnings-global.md`, 2026-11-27): kalimat pertama berdiri sendiri, jawaban paling lambat kalimat kedua (detik 6). S1 dibuka s08 ("Many people think Indonesia's QRIS code is an app you download."), S2 dibuka s35 dengan jawabannya ("...the money is never turned into US dollars.").
- **Learnings yang diterapkan** (`learnings.md` T01 dan `learnings-global.md`):
  1. Fondasi dulu: metafora colokan di s06 (±0:49), tiga pemain di s10 (±1:33, sedikit melewati 90 detik karena babak sejarah; diterima karena metafora dan pemain toko-aplikasi sudah muncul di s06).
  2. Anggaran konsep 6: satu standar QR (s07), switch (s11), MDR (s17), EMVCo (s29), settlement (s39), hub instan bersama (s44). Aturan switch domestik (s28) memakai istilah switch yang sudah dikenal. Jarak antarkonsep baru di atas 45 detik.
  3. Setiap istilah didefinisikan di kalimat yang sama (switch, MDR, EMVCo).
  4. R3: satu kalimat satu shot, semua shot punya `motion`, tanpa papan teks; bubble 6 buah dalam ±8 menit, sikap saja.
  5. Satu peta tetap (tiga bangunan) dan satu jangkar (warung dengan stiker + stopkontak).
  6. Satu pendalaman: lintas negara tanpa dolar (s36 sampai s40).
  8. Durasi dicapai lewat contoh (mangkuk mi Rp50 ribu, turis Thailand, Jepang), bukan konsep tambahan.
- **Ritme emosi:** penasaran (s01 sampai s03), lega (s09), tegang (s26 sampai s28), ironi (s29), jujur (s31, s32, s42), hangat (s45 sampai s47).
- **Palet:** palet T01 di `produksi/STYLE.md` 8 (krem, hijau uang, koin, biru malam, koral). Suasana Bali senja hangat di pembuka dan penutup; malam biru untuk babak peta. Rupiah = koin emas, baht = koin perak kebiruan (pembeda dua mata uang, bukan warna resmi).
- **Pemeran:** you (pembeli), owner (pemilik warung, dipakai ulang dari pemilik toko 002 dengan celemek), bank (bank warung), network (dipakai sebagai menara kartu internasional di s31), tambahan usulan: `switch` (stasiun switch berwajah tenang dengan helm kabel) dan `tourist` (turis Thailand, badan kapsul biru muda, topi pantai). Tambahan menunggu persetujuan kreator bersama naskah.
- **Hal yang sengaja dihindari:**
  - Logo resmi QRIS, logo bank, e-wallet, Visa, Mastercard, dan aplikasi nyata. Nama Visa dan Mastercard hanya di narasi.
  - Opini politik soal kesepakatan dagang 2026 dan "Amerika takut" (C28 `belum`).
  - Klaim kerugian Visa per hari, angka UPI per hari (C31 `belum`).
  - Nasihat memilih aplikasi atau metode bayar.
  - Waktu dana masuk ke rekening merchant (bergantung penyelenggara).
- **Risiko:**
  - Durasi: tempo TTS bisa membuat master di bawah 8:00. Bila terjadi, kreator memilih: perlambat TTS, tambah jeda, atau tanpa mid-roll. Jangan menambah konsep.
  - Pola "lawan Visa" ramai dan cenderung slop; pembeda harus terlihat di 30% awal (peta jalur scan, bukan klaim).
  - Angka BI bergerak tiap bulan; narasi memakai data Oktober 2026 (RDG 18 Nov 2026) dan menyebut bulannya di layar.
