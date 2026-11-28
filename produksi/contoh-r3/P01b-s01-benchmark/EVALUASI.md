# P01b s01: contoh kerja lengkap produksi visual (wajib dibaca)

**Status:** acuan untuk semua produksi, disetujui kreator (still 2026-11-26, animasi 2026-11-27). Agent mana pun yang menulis brief, naskah, `03-visual.json`, `04-shots.tsx`, atau menilai still **membaca bagian yang relevan dengan tahapnya** sebelum mulai.

## Urutan baca

| # | Tahap | Baca | Pelajari |
| --- | --- | --- | --- |
| 1 | Riset fakta | `../P01-tetes-air/01-riset-viral.md`, bagian Riset fakta | Klaim C01-C16: satu baris per klaim, sumber otoritatif, status jujur (`belum` bila tidak ditemukan), miskonsepsi dicatat. |
| 2 | Brief | `../P01-tetes-air/02-brief.md` | Pertanyaan utama, alur pengungkapan, jangkar. |
| 3 | Naskah + shots | `03-script.json` | Satu shot per kalimat; label di kata yang diucapkan; `sources` merujuk id klaim; `visual_spec`. |
| 4 | Arah visual | `03-visual.json` (versi 2) | Tiap subjek memakai `treatment` dan `claims`, sehingga fakta (C01 tetes besar memipih) mengunci bentuk, sedangkan gaya (`silhouette`, `material`, `light`, `art_refs`) hanya menafsirkan. Lihat juga cara `simplifications` mencatat apa yang tidak literal. |
| 5 | Kode | `04-shots.tsx` + `produksi/remotion/src/r3/art/` | Shot hanya menyusun aset pustaka (`@r3/art`), waktu dari `word()`, kamera dari `Layer`, dan semua gerak berupa fungsi `t`. Aset khusus topik (`parts/ghost.tsx`) tetap lokal. |
| 6 | Putaran still | `04-still.json` → `scenes.s01.riwayat` (putaran 0-7) + gambarnya di `04-still/putaran-N/` | Cara menulis kritik: **masalah yang terlihat → penyebab di kode → perbaikan → hasil**. Kritik ditulis sebelum kode diubah, satu putaran satu commit. |
| 7 | Animasi | bagian "Phase D" di bawah | Lembar frame per 0,5 dtk untuk memeriksa gerak, perbaikan tilt kamera, cek determinisme `framemd5`. |
| 8 | Jejak teknis | `04-proses.jsonl` | Setiap render still dan video tercatat otomatis (perintah, commit, hash kode, hash gambar). |

## Yang ditiru dan yang tidak

- **Ditiru (prosesnya):**
  - urutan klaim → spesifikasi → kode → still → kritik → perbaikan;
  - satu fokus L1 yang paling jenuh;
  - kedalaman lewat geser warna ke langit, bukan blur;
  - lingkungan yang ikut menjelaskan (talang di latar depan menunjuk ke scene berikutnya);
  - gerak yang terkunci ke kata.
- **Jangan disalin ke topik lain (isinya):**
  - tetes air, kota senja, menara air, palet ungu-jingga, komposisi kiri-atas-label.
  - Topik baru mengambil komponen pustaka yang cocok, lalu membuat subjek L1 sendiri dengan proses yang sama.
- **Batasan contoh ini:**
  - Hanya satu scene berdurasi 6 detik. Belum mencontohkan banyak scene, transisi antar-scene, re-hook, atau Shorts dari video panjang.
  - Putaran 1-4 hanya rekonstruksi dari catatan (kode dan gambarnya tidak tersimpan). Putaran 0 dan 5-7 punya gambar.

---

## Evaluasi still benchmark s01 (Fase 3.5 Phase C)

Laporan data, bukan dokumen aturan. Dibuat 2026-11-26.

**Dasar penilaian:**
- Penilaian agent dari still 1920×1080 dan potongan crop-nya, berdampingan dengan prototipe P01 dan resep referensi (`produksi/REFERENSI-GAYA.md`).
- Belum ada penilaian kreator. Skor di bawah adalah perkiraan, bukan kelulusan.
- Animasi belum dibuat. Gerak di still hanya posisi pada detik tertentu.

## Berkas

Semua berkas ada di `produksi/render/_contoh/P01b-s01-benchmark/stills/`. Folder render diabaikan git; untuk membuat ulang, lihat bagian Perintah.

| Still | File |
| --- | --- |
| Komposisi utama, tetes pipih + garis arus udara | `s01-Master16x9-t2.9.png` |
| Siluet air mata dicoret | `s01-Master16x9-t1.5.png` |
| Tetes masih bulat | `s01-Master16x9-t0.6.png` |
| Akhir, kamera turun ke atap | `s01-Master16x9-t3.9.png` |
| Close-up subjek L1 (crop) | `s01-closeup-tetes-t2.9.png` |
| Detail lingkungan: menara air dan blok 3/4 (crop) | `s01-detail-lingkungan-t2.9.png` |
| Vertikal 1080×1920 | `s01-Short9x16-t2.9.png` |
| Perbandingan P01 (kiri) vs P01b (kanan) | `banding-P01-vs-P01b-s01.png` |

Close-up dan detail lingkungan adalah crop dari render 1920×1080, bukan render kamera terpisah.

## Yang berubah dan penyebabnya

| Aspek | P01 | P01b | Perubahan yang membuatnya |
| --- | --- | --- | --- |
| Tetes | gradien radial hampir opak; pantulan berupa 9 batang seperti barcode | 4 nada datar (T1), sabit putih besar, rim jingga putus (T2), pantulan berupa siluet kota kecil di bagian bawah, sedikit tembus | `Shade` (clipPath + salinan yang digeser + mask highlight) dan `Drop2` dengan path bezier berparameter `flat`; rasio pipih 1,57:1 |
| Kota | `FlatRect` kotak berulang, jendela acak, blur | blok 3/4 (muka depan, muka samping gelap, atap terlihat), balkon berpagar, unit AC, tangki atap, antena, tanaman atap, kubah, puncak bertangga | komponen `Block` dengan 3 keluarga nada (MID, TEAL, VIOLET) |
| Tengara | tidak ada | menara air (tangki kayu bercincin, kaki berangka, tangga, lampu merah) | `WaterTower`, material dibedakan (kayu-baja) |
| Kedalaman | dua `Skyline` yang sama dengan warna berbeda + blur | dua lapis kota jauh digeser ke langit (T5), kereta layang, kabut di antara lapisan, latar depan atap + talang | `FarCity`, `Elevated`, `MistBand`, `RoofCorner`; tanpa blur |
| Dunia hidup | hujan dan kabut saja | kereta lewat, jendela menyala bergiliran, uap dari ventilasi, lampu jalan, pohon bergoyang | `Elevated`, `Windows` flicker, `RoofCorner` uap, `Lamp`, `Tree` |
| Langit | gradien abu-biru | gradien indigo → magenta → jingga, matahari di celah kota, awan gugus lobus dengan bawah menyala | `Sky`, `Cloud` (T4, T8) |

## Rubrik (PIPELINE.md bagian 10), perkiraan agent

| Dimensi | P01 | P01b | Catatan |
| --- | --- | --- | --- |
| Siluet subjek | 2 | **4** | Bentuk roti burger jelas dan berbeda dari tetes kecil (bulat) dan siluet air mata (runcing) |
| Kompleksitas bentuk | 2 | 3 | Gedung sudah berkarakter; bagian tengah tetes masih satu bidang cyan yang luas |
| Hierarki detail | 2 | 4 | L1 paling detail, L2 cukup, L3 berupa siluet |
| Material | 2 | **3** | Air, kayu, beton, dan genteng terbedakan. Kilau air masih terbaca seperti kaca, dan muka gedung punya shading yang sama. |
| Cahaya | 2 | **3** | Rim jingga konsisten di sisi kanan dan bayangan memakai hue langit. Matahari banyak tertutup, belum ada bayangan kontak yang terlihat, dan cahaya senja belum "menyiram" adegan. |
| Lingkungan | 2 | **4** | Ada tengara, 3 tipe bangunan, kereta, pohon, dan lampu. Lingkungan juga memberi petunjuk tujuan tetes (atap dan talang). |
| Komposisi | 3 | **3** | Fokus jelas. Area kanan atas padat (label + menara), dan pita bawah tertutup caption. |
| Kedalaman | 2 | 4 | Lima lapisan terbaca dari nilai dan hue |
| Akurasi fakta | 4 | **4** | Bentuk tetes sesuai C01–C02. Ukuran tetes terhadap kota adalah skala ilustratif dan dicatat sebagai penyederhanaan. |
| Polesan | 2 | **3** | Jauh lebih dekat ke target dibanding P01, tapi saturasi, kepadatan detail latar depan, dan kehalusan gambar masih di bawah referensi |

**Gate wajib (minimum 4):**
- Lulus: siluet (4) dan akurasi (4).
- Belum lulus: material + cahaya (3), lingkungan + komposisi (rata-rata 3,5), dan polesan (3).
- Kesimpulan agent: **belum lulus gate still**. Dibutuhkan satu putaran lagi sebelum animasi.

## Putaran 6 (setelah permintaan kreator "satu putaran lagi")

| Perbaikan | Hasil |
| --- | --- |
| Celah di siluet kota jauh (`FarCity gap`) dan cahaya hangat menyapu adegan | matahari dan awan menyala terlihat di tengah, kota kanan tersiram jingga |
| Bayangan kontak di bawah AC, tangki, dan menara air; pita highlight pada tangki | perabot atap tidak lagi melayang |
| Jendela gelap memantulkan garis langit (material kaca) | muka gedung lebih kaya tanpa menambah benda |
| Lobus nada terang di tengah tetes; hujan depan dipindah ke belakang subjek | bidang cyan lebih bervariasi, tidak ada garis hujan yang lewat di depan tetes |
| Label pindah ke ruang negatif kiri atas, awan kiri diperkecil, tata letak vertikal disesuaikan | kanan atas lega; versi vertikal: label di atas, tetes kecil di samping menara |

Skor perkiraan putaran 6, juga dicatat di `04-still.json`:

| Dimensi | Skor |
| --- | --- |
| siluet | 4 |
| kompleksitas | 3 |
| hierarki | 4 |
| material | 3 |
| cahaya | 4 |
| lingkungan | 4 |
| komposisi | 4 |
| kedalaman | 4 |
| akurasi | 4 |
| polesan | 3 |

Gate masih tertahan di **material dan polesan (3)**. Sisanya sudah di 4.

Kreator menyatakan puas dengan arah ini dan meminta pustaka aset, galeri acuan, gate still, dan validator dibangun. Still putaran 6 dipakai sebagai acuan sementara di `produksi/acuan-visual/`.

## Yang perlu diperbaiki di putaran berikutnya
1. **Cahaya senja:**
   - Matahari dan awan menyala diletakkan di celah yang terlihat.
   - Gedung di sisi kanan diberi pantulan hangat.
   - Bayangan kontak ditambahkan di atap (tangki, AC, tanaman).
2. **Material tetes:**
   - Bayangan sabit bawah di luar area pantulan dipertegas.
   - Bidang tengah diberi nada dasar yang sedikit lebih bervariasi (gradien bertingkat dua nada, T9).
   - Garis hujan tidak boleh lewat di depan tetes.
3. **Material gedung:** beton, kaca jendela, dan logam dibedakan (pita highlight logam pada tangki, pantulan langit pada jendela gelap).
4. **Komposisi:**
   - Label dipindah ke ruang negatif kiri atas.
   - Ukuran awan kiri atas dikurangi.
   - Detail latar depan dinaikkan agar terbaca di atas pita caption.
5. **Vertikal:** tetes kecil bertumpuk dengan label, dan menara terpotong di tepi. Butuh tata letak vertikal tersendiri, bukan sekadar geser.

## Teknik

- **Typecheck:** bersih.
- **Determinisme:** `s01-Master16x9-t2.9.png` dirender dua kali menghasilkan SHA-1 identik (`2958cefc35466bc9265f8ad4f483ea4b354258e9`).
- **Waktu render:** sekitar 15 detik per still.
- **Engine:** tidak diubah. Semua teknik memakai SVG yang sudah didukung (clipPath, mask, stroke-dasharray, `lerpColor`). Sejauh ini belum ada bukti bahwa engine perlu diubah (kelas D kosong).
- **Aset:** sejak putaran 6 dipindah ke pustaka bersama `@r3/art` (`produksi/remotion/src/r3/art/`). Siluet air mata tetap lokal di `parts/ghost.tsx`. Hash still identik sebelum dan sesudah pemindahan. Prototipe P01 tidak diubah.

## Perintah
```
node scripts/produksi/render.mjs --track _contoh --siklus P01 --script produksi/contoh-r3/P01b-s01-benchmark/03-script.json --still s01 --at 0.6,1.5,2.9,3.9
node scripts/produksi/render.mjs --track _contoh --siklus P01 --script produksi/contoh-r3/P01b-s01-benchmark/03-script.json --still s01 --at 2.9 --comp Short9x16
```

## Phase D: animasi (2026-11-26)

Still putaran 6 disetujui kreator sebagai acuan. Animasi dirender dengan engine R3 yang sebenarnya, dan audio serta caption diambil dari P01. Jeda akhir dibuat 2,0 dtk agar durasi masuk target 5 sampai 8 dtk.

| Berkas (`produksi/render/_contoh/P01b-s01-benchmark/`) | Cek ffprobe |
| --- | --- |
| `Master16x9-en.mp4` | 1920×1080, 183 frame, 6,10 dtk |
| `Short9x16-S1-benchmark-en.mp4` | 1080×1920, 183 frame, 6,10 dtk |
| `banding-animasi-P01-vs-P01b.mp4` | kiri P01, kanan P01b, 6,1 dtk pertama, audio P01b |

**Urutan gerak:**
1. Tetes bulat masuk dari atas, sementara kota naik pelan (tetes jatuh). Hujan bergerak di dua kedalaman.
2. Di kata "teardrops", siluet air mata muncul memantul lalu dicoret.
3. Di kata "flatten", siluet menyusut, garis arus udara naik, dan tetes memipih dengan overshoot dan goyang teredam. Volume dijaga (`sx·sy ≈ 1`).
4. Kamera dolly masuk 8% lalu turun pelan, sehingga atap dan talang terlihat (petunjuk ke s02).
5. Sepanjang shot ada gerak sekunder:
   - kereta layang lewat;
   - jendela menyala bergiliran;
   - uap keluar dari ventilasi;
   - pohon bergoyang;
   - lampu dan menara berkedip;
   - kilap tetes berdenyut;
   - pantulan kota bergeser.

**Perbaikan setelah lembar frame pertama:** tilt kamera semula 100 px membuat tetes naik sampai tertutup label di detik 4,5 ke atas. Tilt diturunkan jadi 50 px dan label dinaikkan.

**Rubrik gerak (perkiraan agent, dari lembar frame per 0,5 dtk dan frame akhir; video belum ditonton manusia dengan suara):**

| Dimensi | P01 | P01b | Catatan |
| --- | --- | --- | --- |
| Gerak (timing, easing) | 3 | 4 | label dan perubahan bentuk terkunci ke kata, easing dengan overshoot |
| Kamera | 3 | 4 | dolly dan reveal punya tujuan; parallax 6 lapisan |
| Gerak sekunder | 2 | 4 | dunia hidup tanpa mencuri fokus |
| Gerak sesuai material | 2 | 4 | air: squash dengan volume terjaga dan goyang teredam; benda kaku tidak berubah bentuk |
| Transisi | 3 | 3 | benchmark satu shot, berakhir pada reveal; transisi ke s02 belum diuji |
| Kontinuitas | 3 | 4 | hubungan ruang tetes, kota, dan atap terjaga sepanjang tilt |

**Teknik:**
- **Deterministik:** dua render video menghasilkan 183 dari 183 frame identik (`framemd5`).
- **Rasio:** landscape dan vertikal benar.
- **Sinkron caption:** caption dan waktu kata memakai `produksi/captions/_contoh/P01/en.json` yang sama dengan P01.
- **Waktu render:** sekitar 11 dtk untuk 6 dtk video.

**Kekurangan:**
- Kesan "jatuh" masih halus, karena hanya ditunjukkan lewat kota yang naik pelan dan hujan.
- Saat goyang, bentuk tetes sesaat tampak miring seperti kacang.
- Transisi ke scene berikutnya belum didemonstrasikan.
- Material dan polesan still tetap 3 (diterima kreator).

## Keputusan kreator

2026-11-27: animasi benchmark s01 (Phase D) disetujui. Sistem dipakai untuk siklus produksi berikutnya.
