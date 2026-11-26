# Evaluasi still benchmark s01 (Fase 3.5 Phase C)

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
- **Aset:** semuanya lokal di `parts/art.tsx`. Prototipe P01 tidak diubah.

## Perintah
```
node scripts/produksi/render.mjs --track _contoh --siklus P01 --script produksi/contoh-r3/P01b-s01-benchmark/03-script.json --still s01 --at 0.6,1.5,2.9,3.9
node scripts/produksi/render.mjs --track _contoh --siklus P01 --script produksi/contoh-r3/P01b-s01-benchmark/03-script.json --still s01 --at 2.9 --comp Short9x16
```
