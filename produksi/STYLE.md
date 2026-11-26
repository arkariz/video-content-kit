# Visual Style Bible (semua track)

Sumber kebenaran untuk **tampilan**: identitas visual, bahasa bentuk, warna, kedalaman, komposisi, tipografi, palet dan pemeran per track. Dokumen lain hanya menautkan ke sini.

- Cara menulis spesifikasi scene dan pola komposisi (untuk penulis): `instruksi/referensi/gaya-visual.md`.
- Cara menggerakkan dan merender (kamera, gerak, transisi, cahaya, 2D/2.5D/3D di Remotion): `produksi/PIPELINE.md` bagian "Mesin R3".
- Analisis video referensi dan palet terukurnya: `produksi/REFERENSI-GAYA.md` (bahan belajar, bukan palet track).

Arah: ilustrasi gerak penjelas (R3), terinspirasi teknik bercerita visual Kurzgesagt. **Yang ditiru hanya teknik** (lapisan kedalaman, metafora yang digambar harfiah, kamera sinematik, koreografi benda). Tokoh, aset, ilustrasi, huruf, warna merek, musik, dan susunan adegan mereka tidak disalin; tokoh dari kartun lain juga tidak.

## 1. Identitas

Ilustrasi vektor penjelas yang rapi dan tenang: bentuk bersih dengan siluet jelas, warna terkurasi, kedalaman berlapis, cahaya lembut. Setiap gambar harus **menjelaskan sesuatu**; dekorasi hanya boleh bila menambah suasana tanpa mencuri fokus.

Tiga sifat yang dijaga di semua track:
1. **Kredibel secara struktur.** Subjek nyata (sel, mesin, kota, uang) digambar dengan bagian-bagian yang benar dan proporsi yang masuk akal, lalu disederhanakan. Penyederhanaan tidak boleh mengubah mekanisme (lihat `gaya-visual.md` bagian 4).
2. **Lembut, bukan kaku.** Sudut membulat, bayangan melebur, gerak mengalir. Bukan tumpukan kotak dan silinder polos (penilaian kreator atas T02-001 versi 3D, 2026-11-26).
3. **Terbaca dalam sedetik.** Satu fokus per frame, hierarki ukuran dan kontras yang jelas, teks minimal.

Hindari: semua subjek dijadikan tokoh kartun generik; ikon datar ala slide; papan teks; foto stok di dalam ilustrasi; efek berlebihan (bloom tebal, lens flare, glitch).

## 2. Bahasa bentuk dan ilustrasi

### 2.1 Bentuk
- **Organik** untuk makhluk hidup, cairan, alam, emosi: kurva kontinu, tanpa sudut tajam, ketebalan berubah halus. Contoh: sel, tetes air, daun, awan.
- **Geometris** untuk buatan manusia dan sistem: kotak, silinder, lingkaran dengan radius sudut besar. Contoh: gedung, pipa, kartu, server.
- **Campuran** untuk benda yang dirasakan manusia (kendaraan, perangkat): kerangka geometris, permukaan dan detail organik.
- Siluet harus terbaca dari bayangannya saja. Uji: isi bentuk dengan satu warna gelap; kalau subjek masih dikenali, bentuknya lulus.

### 2.2 Garis, sudut, permukaan
| Aspek | Aturan |
| --- | --- |
| Garis luar | **Tidak ada garis tinta.** Batas bentuk dibuat dari beda nilai warna. Garis tipis hanya untuk struktur yang memang garis (kabel, rambut halus, retakan), dengan warna yang tidak kontras keras. |
| Radius sudut | Benda geometris: radius minimal sekitar 12% dari sisi terpendek. Benda organik: tanpa sudut. Hanya ujung yang memang tajam di dunia nyata (duri, pisau) yang boleh lancip. |
| Isian | Gradien lembut dua nilai searah cahaya (bukan isian datar penuh). Selisih terang-gelap sekitar 8 sampai 15% lightness. |
| Bayangan diri | Satu bayangan lembut di sisi jauh dari cahaya, sekitar 55% opasitas warna lebih gelap, tepi diblur, bukan pita bertingkat. |
| Kilap | Satu kilap kecil putih (sekitar 22%) di sisi atas menghadap cahaya. Benda basah (air, mata) boleh dua kilap. |
| Rim light | Garis cahaya tipis di tepi yang membelakangi latar terang atau saat benda harus dipisah dari latar gelap. |
| Bayangan jatuh | Elips gelap tipis dan blur di bawah benda yang menyentuh tanah. Tidak bertepi keras. |
| Tekstur | Tekstur halus (bintik, serat) hanya bila membantu mengenali bahan (kulit kayu, kain, permukaan sel). Opasitas rendah, skala kecil, tidak bergerak terhadap bentuknya. |

### 2.3 Kepadatan detail
- **Subjek utama**: detail paling banyak, termasuk bagian yang dibutuhkan penjelasan (misalnya inti bersegmen pada neutrofil, katup pada pipa).
- **Lingkungan**: detail sedang, bentuk berulang dengan variasi (ukuran, rotasi, warna ±5%) supaya tidak tampak salinan.
- **Latar jauh**: siluet dan gradien saja.
- Aturan praktis: rasio detail subjek : lingkungan : latar kira-kira 3 : 2 : 1.

### 2.4 Konsistensi antar-scene
- Subjek yang sama memakai komponen yang sama di semua scene (satu fungsi gambar, parameter keadaan). Jangan menggambar ulang dengan gaya lain.
- Proporsi antar-subjek dicatat sekali (di `03-visual.json`, `subjects[].scale_ref`) dan dipakai di semua scene. Contoh: neutrofil sekitar 1,5 sampai 2 kali diameter sel darah merah.
- Perubahan keadaan ditunjukkan pada benda yang sama (warna, ekspresi, bentuk), bukan dengan mengganti bendanya.

## 3. Sistem warna

### 3.1 Struktur palet
Setiap track punya palet sendiri (bagian 8), tetapi strukturnya sama:

| Peran | Fungsi | Jumlah |
| --- | --- | --- |
| Latar | Gradien langit/ruang, gelap atau terang tergantung suasana | 2 sampai 3 nilai |
| Primer | Warna identitas track, dipakai pada subjek utama atau jangkar | 1 sampai 2 |
| Sekunder | Lingkungan dan subjek pendukung | 2 sampai 3 |
| Aksen | Satu warna jenuh untuk fokus, label, sorotan | 1 |
| Semantik | Hidup/berhasil, mati/gagal, bahaya, netral (bagian 3.2) | 4 |
| Cahaya | Warna kunci (hangat/dingin) dan warna isi bayangan | 2 |

### 3.2 Warna bermakna (bukan pemetaan kaku)
- Hangat dan terang untuk hidup, aktif, berhasil; dingin, pudar, atau kelabu untuk mati, pasif, gagal, ditolak. Perubahan keadaan = perubahan warna pada benda yang sama.
- Merah tidak otomatis berarti "jahat" dan hijau tidak otomatis "baik". Makna warna ditetapkan per video di `03-visual.json` (`environment.palette`) dan dipakai konsisten di video itu.
- Warna yang punya makna nyata dipertahankan: air bersih dibiarkan biru-jernih, darah merah, daun hijau. Warna semantik tidak boleh melawan warna nyata subjek.

### 3.3 Kontras dan keterbacaan
- Subjek utama punya kontras lightness minimal sekitar 25 poin dari latar di sekitarnya.
- Teks label: kontras minimal 4,5:1 terhadap isian pilnya.
- Tidak lebih dari satu aksen jenuh di satu frame, kecuali perbandingan dua pihak.
- Uji dalam skala abu-abu sebelum dikunci: fokus harus tetap paling terang atau paling kontras.

### 3.4 Cahaya
- Satu arah cahaya kunci per scene (default: kiri atas), dipakai untuk semua bayangan dan kilap di scene itu.
- Suasana: hangat (matahari, senja) = cahaya kuning-oranye, bayangan ungu kebiruan; dingin (malam, dalam tubuh, laut) = cahaya biru-toska, bayangan biru tua; netral (studio, diagram) = cahaya putih lembut, bayangan abu-biru.
- Glow hanya untuk sumber cahaya nyata (lampu, inti yang aktif, bioluminesensi) atau sorotan yang disengaja.

## 4. Kedalaman dan lapisan

Setiap frame disusun dari lima lapisan, dari jauh ke dekat:

| Lapisan | Isi | Perlakuan |
| --- | --- | --- |
| 1. Latar | Langit, ruang, dinding jauh | Gradien, tanpa detail, bergerak paling lambat |
| 2. Lingkungan | Struktur tempat (dinding pembuluh, jalan, gedung) | Detail sedang, sedikit lebih pudar dan lebih dingin dari subjek |
| 3. Subjek | Benda utama dan pendukungnya | Detail penuh, kontras tertinggi, tajam |
| 4. Latar depan | Benda yang lewat dekat kamera (sel lain, daun, partikel besar) | Besar, gelap atau blur, menutup sebagian tepi, bergerak paling cepat |
| 5. Atmosfer | Partikel kecil, kabut, cahaya volumetrik | Tipis, tidak menutupi subjek |

Aturan:
- **Perspektif udara:** makin jauh, makin kecil, makin pudar, makin mendekati warna latar.
- **Tumpang tindih:** benda di depan menutup sebagian benda di belakangnya; ini isyarat kedalaman terkuat, pakai di setiap frame.
- **Blur kedalaman:** latar depan dan latar jauh blur, subjek tajam. Fokus boleh berpindah (lihat "focus shift" di PIPELINE.md) hanya saat narasi berpindah subjek.
- **Parallax:** kecepatan geser tiap lapisan sebanding dengan kedekatannya ke kamera (angka di PIPELINE.md).
- **Transisi skala:** saat masuk ke skala lebih kecil (kota → pipa → tetes air), lapisan subjek skala lama menjadi latar skala baru, supaya penonton tahu ia sedang "masuk".

## 5. Komposisi

- **Satu fokus per frame.** Fokus diletakkan di titik sepertiga atau di tengah bila subjek simetris atau sedang diperkenalkan.
- **Ruang negatif** di arah gerak dan pandangan subjek (benda bergerak ke kanan diletakkan di sepertiga kiri).
- **Hierarki:** subjek > pendukung > lingkungan > latar, lewat ukuran, kontras, dan ketajaman.
- **Sudut kamera bermakna:** sejajar mata untuk empati, dari atas untuk peta atau sistem, dari bawah untuk skala besar atau ancaman, potongan (cutaway) untuk isi dalam.
- **Zona aman:** label dan benda penting di atas y 860 pada 16:9 (pita caption) dan di sepertiga tengah pada 9:16; tepi 5% kosong dari teks.
- **Vertikal (9:16):** subjek ditumpuk tegak; jangan sekadar memotong tengah 16:9 bila subjek atau label keluar bingkai (cara reframe di PIPELINE.md).

## 6. Adaptasi per jenis subjek

| Jenis | Bentuk | Warna | Gerak | Komposisi | Hindari |
| --- | --- | --- | --- | --- | --- |
| Biologi (sel, organ, organisme) | Organik, struktur dalam terlihat lewat potongan atau membran tembus | Sesuai pewarnaan yang dikenali (darah merah, membran ungu-merah muda boleh stilisasi) dengan latar cairan gelap-toska | Lunak, berdenyut, deformasi, gerak acak kecil (Brown) | Potongan, perbandingan skala, lingkungan cairan | Sel bulat polos tanpa struktur; semua sel sama; bakteri bola berduri generik |
| Mekanik dan infrastruktur | Geometris, sambungan dan bagian yang benar | Material terbaca (logam, beton, plastik) | Mekanis: berputar, bergeser, katup membuka; awalan dan susulan kecil | Potongan teknis, isometrik, alur | Mesin tanpa logika gerak; pipa yang tidak tersambung |
| Abstrak (ekonomi, hukum, waktu) | Metafora benda konkret, ditandai sebagai metafora | Palet track, warna bermakna | Simbolis tapi tetap fisik (berat, mengalir, menumpuk) | Satu metafora besar sebagai jangkar | Ikon datar; metafora yang menggantikan penjelasan |
| Finansial dan bisnis | Diagram terstruktur, benda uang dan dokumen sebagai aktor | Palet track, aksen untuk arus uang | Arus, penumpukan, pemotongan | Editorial, alur kiri ke kanan, panel perbandingan | Grafik saham generik, uang beterbangan tanpa arah |
| Geografi dan kota | Peta stilisasi, gedung sederhana berlapis | Siang/senja/malam sesuai cerita | Kamera terbang, titik menyala, arus | Peta sebagai jangkar, skala kota → jalan → benda | Peta tanpa orientasi; skala yang melompat tanpa transisi |

## 7. Tipografi

- Huruf: sans geometris tebal (sekarang Avenir Next 700) untuk label, angka, dan judul. Huruf khusus merek lain tidak dipakai.
- Hierarki: angka besar (count) > label pil > legenda > catatan kaki. Ukuran logis (kanvas 1920×1080): angka 72 sampai 140, label 32 sampai 44, legenda 26 sampai 30, catatan kaki 20 sampai 22.
- **Label pil:** isian warna rata dari palet, sudut membulat kecil, teks putih tebal huruf kapital, maksimal 3 kata atau satu angka, segitiga penunjuk ke benda.
- **Caption:** per kalimat, di pita bawah, ditangani komponen `SentenceCaptions` (aturan di `produksi/CONTRACT.md`).
- **Anotasi diagram:** garis penunjuk tipis membulat, warna netral terang; teks rata kiri dekat ujung garis.
- **Angka:** satuan ditulis kecil di samping angka; angka yang dihitung naik memakai lebar digit tetap supaya tidak bergetar.
- Teks tidak pernah menjadi isi utama frame; tanpa papan teks.

## 8. Palet per track

### T01 (uang)
Krem #fff4da, hijau uang #2f8f6b, koin #ffd23f, biru malam #172447, koral #e4572e. Peran: latar krem/biru malam; primer hijau uang; aksen koin; koral untuk pembeli dan biaya.

### T02 (Asia Tenggara)
Krem hangat #fff6dc, senja #f3a15f → #6d3f7a, malam #1c1f4a → #3b1f5e; livery KRL merah #d83c33 dan kuning #f2b632; teal #2c8c86. Sumber: uji pemeran 2026-11-26.

### Contoh (`produksi/contoh-r3/`)
Contoh di luar track boleh punya palet sendiri, ditulis di `03-visual.json` contoh itu.

Palet track tetap sepanjang track. Perubahan palet adalah keputusan kreator.

## 9. Pemeran

### 9.1 Bahasa bentuk pemeran
1. **Badan satu bentuk dasar** (kacang, bola, kapsul, kotak membulat) yang sekaligus menjadi kepala. Siluet harus terbaca dari bayangannya saja.
2. **Tangan dan kaki seperti selang karet**: garis melengkung tanpa sendi, ujung bulat. Kaki pendek.
3. **Mata titik** dengan satu titik putih kilap; alis pendek hanya bila ekspresi butuh. Mulut sederhana.
4. **Satu aksesori penanda** per tokoh (topi, kumis, dasi, ransel) supaya dikenali dari jauh.
5. **Benda dan lembaga boleh jadi tokoh** (kereta, dokumen, sel) bila ceritanya butuh emosi atau motif (mesin insentif di `gaya-cerita.md`). Subjek ilmiah yang sedang dijelaskan mekanismenya digambar tanpa wajah; wajah hanya ditambahkan di shot yang membahas emosi atau motif, dan ditandai `metaphor` di `03-visual.json`.
6. Ekspresi baku: neutral, happy, sad, shock, tired, angry, smug (2D, `r3/cast`); pustaka `soft` memakai set sendiri (calm, happy, sad, shock, stern, smug, …). Keadaan berubah lewat ekspresi dan warna, bukan bubble.
7. Pemeran adalah warga sehari-hari, bukan kostum etnis atau stereotip.

### 9.2 Pemeran T01 (disetujui bersama naskah 002, 2026-11-26)
Digambar dengan `produksi/remotion/src/r3/soft/kit.tsx` di `04-shots.tsx` siklus.

| id | Peran | Bentuk |
| --- | --- | --- |
| you | pembeli | badan kacang koral, syal biru |
| owner | pemilik toko sepatu | badan bulat toska, celemek |
| bank | bank pembeli | gedung berwajah beratap hijau uang |
| network | jaringan kartu | menara pengawas berlampu sorot, tanpa logo |
| terminal | perusahaan terminal | server berheadset |
| cash | pembayar tunai | badan bulat ungu, topi pet, uang kertas |

### 9.3 Pemeran T02
| Tokoh | Peran | Status |
| --- | --- | --- |
| Komo | penumpang sehari-hari, tokoh utama: badan kacang sawo matang, topi bucket teal, ransel merah | usulan, menunggu persetujuan kreator |
| Sepuh | kereta eks-Tokyo yang menua: tampak depan, livery KRL, kumis dan alis putih, karat, tongkat | usulan |
| Pak Aturan | aturan dan pemerintah: selembar dokumen resmi, dasi kupu-kupu, stempel | usulan |
| Cicak | pengamat kecil yang menempel di mana saja | usulan |

Kode: 2D di `produksi/remotion/src/r3/cast/T02.tsx` (Komo, Sepuh, Pak Aturan, Cicak, figuran `Warga`, benda T02 seperti `Gerbong`); 3D di `r3/three/cast/T02.tsx`. Lembar karakter: `produksi/remotion/src/experiment/castIndex.tsx`, hasil di `produksi/render/_eksperimen/T02-pemeran-lembar.png`.

## 10. Contoh visual

| Yang diperlihatkan | File |
| --- | --- |
| Reproduksi teknik referensi (label di kata, iris, wipe, blur kedalaman) | `produksi/render/_eksperimen/banding-asd.mp4`, `banding-asddd.mp4` |
| Lembar pemeran T02 | `produksi/render/_eksperimen/T02-pemeran-lembar.png` |
| Scene R3 lengkap per kalimat | `produksi/contoh-r3/T02-001-s06/` (render ke `produksi/render/_contoh/`) |
| Prototipe sistem ini (tetes air di kota) | `produksi/contoh-r3/P01-tetes-air/` (Fase 3, menunggu) |

## 11. Status aturan "lebih mulus"
Aturan halus di bagian 2.2 (tanpa garis keras, bayangan melebur, gerak dengan awalan dan susulan) berasal dari penilaian kreator atas T02-001 versi 3D dan dipindahkan ke sini dari `hasil/learnings-global.md`. Persetujuan visualnya lewat 3 sampai 5 still dan satu klip 10 sampai 20 detik (prototipe P01). Garis putih tegas pada iris/wipe tetap berlaku sampai kreator memutuskan lain.
