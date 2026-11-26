# Audit visual P01 "tetes air" (Fase 3.5, Phase A)

Tanggal: 2026-11-26. Cakupan: `produksi/contoh-r3/P01-tetes-air/` (commit `7734f7a`), mesin `produksi/remotion/src/r3/`, spesifikasi penulisan. Laporan data, bukan dokumen aturan. Tidak ada kode, spesifikasi, atau prototipe yang diubah.

## 1. Ringkasan temuan

1. **Akar masalah terbesar adalah dua hal yang saling mengunci: standar gaya itu sendiri dan proses tanpa tahap desain.** `STYLE.md` 2.1/2.2 mewajibkan "geometris = kotak, silinder, lingkaran", isian dua nilai dengan selisih 8 sampai 15%, satu bayangan, satu kilap, tekstur "opasitas rendah". Mengikuti aturan itu dengan setia menghasilkan ikon datar yang lunak. Lalu agent menulis JSX langsung dari `show`/`motion`/`03-visual.json` (`04-shots.tsx`, 252 baris) tanpa pernah mendesain still. Tidak ada titik di alur tempat seseorang menilai "apakah gambar ini bagus".
2. **Engine bukan penyebab utama.** Semua yang dipakai prototipe (path, clipPath, gradien, blur, parallax) berfungsi. Yang tidak terbukti: engine tidak pernah dicoba dengan filter selain blur, mask, blend mode, tekstur, atau pencahayaan terarah. Dari kode: `r3/` hanya memakai `feGaussianBlur` (`kit.tsx:44`). Jadi "engine tidak mampu" belum bisa dikatakan; yang benar "engine belum pernah diminta".
3. **Masalah aset/ilustrasi.** Hampir semua benda disusun dari `rect`/`circle`/`ellipse` yang diulang dengan `R(i)`: gedung (`city.tsx:10`), pantulan di tetes (`drop.tsx:26-35`), isi bak (`plant.tsx:63,102,104`), tanah (`04-shots.tsx:70`). Tidak ada satu pun benda yang punya siluet rancangan.
4. **Tetes (subjek utama) hampir berhasil tetapi gagal di bahan.** Bentuk burger dan gradiennya benar, tetapi tetes opak (`drop.tsx:18` stopOpacity 0,9 sampai 0,96), jadi kota di belakang tidak terlihat menembus dan tidak ada refraksi. "Pantulan kota terbalik" yang ditulis di spesifikasi diterjemahkan renderer menjadi 9 batang berpola (garis barcode), karena spesifikasi tidak menjelaskan cara menggambar pantulan lengkung.
5. **Spesifikasi penulisan menjawab "apa yang dijelaskan", bukan "seperti apa digambar".** `03-visual.json` punya `anatomy` (prosa), `palette` dan `lighting` (string bebas), tetapi tidak ada siluet, bahasa bentuk, material per permukaan, perilaku bayangan, hierarki detail per subjek, atau acuan visual. Gate kesiapan ("anatomi minimal 12 kata") bersifat leksikal dan terlewati oleh prosa yang tetap menghasilkan gambar generik.
6. **Evaluasi diri tidak punya kriteria kualitas ilustrasi.** `EVALUASI.md` menilai Konsistensi 4, Kedalaman 4, Warna 4 karena cek formal terpenuhi (lima lapisan ada: tetapi dua di antaranya `Skyline` yang sama dengan warna berbeda, `04-shots.tsx:35,39,98,101`). Cek formal lulus, penampilan tidak.
7. **Hierarki visual lemah di s02 dan s03.** Subjek (tetes) hanya 34 dan 30 px jari-jari di dunia 1920 sampai 3300 px (`04-shots.tsx:77`, `:189`); pipa, label, dan bak lebih dominan. Label otomatis melayang di baris atas, tidak menempel benda ("ROOF" di atas jendela, bukan atap).
8. **Kesimpulan lapisan:** terutama **art direction + aset (ilustrasi)**, diperparah **proses** dan **standar STYLE.md**; **penulisan** berkontribusi sedang; **engine** kecil dan belum terbukti.

## 2. Audit per scene

Still yang dilihat: s01 16:9 t3.3 dan 9:16 t3.3; s02 16:9 t1.0, t3.4, t5.2; s03 16:9 t2.2, t3.9 dan 9:16 t3.9; s04 16:9 t3.8. (JPEG 900 px; lihat bagian 7.)

### s01 (tetes jatuh di atas kota senja) `04-shots.tsx:24-62`
| Aspek | Temuan | Rujukan |
| --- | --- | --- |
| Subjek, siluet | Burger sesuai klaim USGS, siluet terbaca. Tetapi simetris sempurna kiri-kanan (kurva Bezier empat segmen dari satu `k=0.5523`), tidak ada asimetri hidup | `drop.tsx:11-12` |
| Material | Opak, gradien radial satu arah; tidak ada refraksi, tepi terang (Fresnel), kaustik, atau warna lingkungan di tepi. Terbaca sebagai "jeli/kaca" bukan air | `drop.tsx:18-19` |
| Detail permukaan | "Kota terbalik" = 9 `rect` berderet dengan jendela `rect` kecil; tampak seperti barcode, bukan pantulan melengkung | `drop.tsx:26-35` |
| Cahaya | Satu arah kiri atas diterapkan sama pada tetes (`cx .34 cy .3`), tetapi gedung memakai `FlatRect` dengan pita gelap kanan/bawah tanpa hubungan ke sumber cahaya senja di langit (glow di tengah bawah, `:33`) | `kit.tsx:112-124` |
| Lingkungan | `Skyline`: `FlatRect` r=14, jendela `rect` r=5 acak, antena. Tiga lapis memakai generator yang sama. Awan = elips datar opak 20% | `city.tsx:10-13`, `04-shots.tsx:34` |
| Latar depan | Dua lapis hujan: garis lurus. Tidak ada benda latar depan nyata (daun, kabel, tepi atap) | `04-shots.tsx:36,56` |
| Pemisahan kedalaman | Bekerja lewat blur dan fog, tetapi tetes dan gedung belakang sama tinggi nilainya; tetes tidak lepas dari kota | still s01 |
| Komposisi/kamera | Subjek besar di tengah, label atas terpisah, dolly 14%. Rapi tetapi statis. Kamera 2D hanya x/y/zoom | `:32` |
| Aliran udara | Garis melengkung putih seragam, terbaca sebagai antena, bukan tekanan udara | `:44-48` |
| Vertikal | Tetes dipotong caption; label bertumpuk di tengah | still 9:16 |

### s02 (atap, got, pipa, sungai) `04-shots.tsx:80-148`
| Aspek | Temuan | Rujukan |
| --- | --- | --- |
| Subjek | Tetes r=34 (sekitar 3% tinggi frame); jadi kerikil cokelat. Tidak ada silhouette yang terbaca saat keruh | `:77,133` |
| Gedung/atap | Gedung = satu `path` poligon dengan stroke tebal sebagai "pembulatan sudut" (`strokeLinejoin round`, `strokeWidth 20`), jendela = tiga `rect` identik, atap = poligon + 16 garis genteng sama jarak | `:110-116` |
| Pipa | `Pipe` = 3 `path` stroke berlapis lebar seragam; tanpa flensa, sambungan, ketebalan dinding, tekanan | `plant.tsx:9-16` |
| Got/grate | `FlatRect` + 5 `rect` identik | `:122-123` |
| Tanah | Gradien cokelat + 40 elips bertransparansi 20% (pengganti tekstur) | `:64-72` |
| Sungai | Gradien + gelombang sinus + 9 `rect` tipis sebagai "kilau". Permukaan tanpa pantulan kota, tanpa refraksi | `plant.tsx:19-30` |
| Material | Beton, baja, genteng, tanah, air memakai pola isian yang sama (gradien + pita gelap) | semua |
| Hierarki | Potongan melintang jelas secara diagram tetapi tanpa fokus; blok tanah cokelat memakan setengah frame (still t5.2) | still s02 |
| Kamera | Tracking dan zoom 3,6 ke 1,05 bagus secara penjelasan; kamera tidak punya rotasi | `:84-86` |

### s03 (instalasi pengolahan air) `04-shots.tsx:150-206`
| Aspek | Temuan | Rujukan |
| --- | --- | --- |
| Bak | `TankShell`: rounded rect + rongga gelap + air bergradien + satu strip putih 9%. Tanpa dinding berketebalan, tangga, tepi pelimpah, pipa masuk | `plant.tsx:35-56` |
| Isi bak | Kotoran = 26 lingkaran; pasir = 70 lingkaran; kerikil = 22 elips; flok = lingkaran. Pola berulang menggantikan desain detail | `plant.tsx:63,102,104` |
| Klorin | `Sparkle` bintang empat titik: terbaca "ajaib/berkilau", bukan klorin (makna salah) | `plant.tsx:111-123` |
| Dapur/rumah | 8 `rect` bertumpuk, jendela = dua `rect`; keran = satu `path` stroke. Bukan satu benda utuh (dicatat EVALUASI #8) | `plant.tsx:162-175`, `04-shots.tsx:187` |
| Latar | `PlantBack` dinding gradien + kolom `rect`; blur 6 menutupi, tetapi hasilnya "dinding kosong" | `plant.tsx:148-160` |
| Padat | Lima tahap dalam 4,5 dtk; tetes r=30 hilang di antara bak | `:189` |
| Vertikal | Empat label bertumpuk menutupi benda | still 9:16 |

### s04 (keran ke IPAL ke sungai) `04-shots.tsx:208-252`
| Aspek | Temuan | Rujukan |
| --- | --- | --- |
| Penutup | Tetes membesar di sungai, pantulan kota di tetes masih barcode (`drop.tsx:26`); callback ke s01 formal bukan visual | still s04 |
| Lingkungan | Skyline sama (seed 3, 7) dengan s01 dan s02: konsisten tetapi identik, tanpa variasi senja ke malam | `:215,217` |
| Sungai/tepi | Tepi beton = `FlatRect` abu-abu, air = gradien datar. Tidak ada tepian organik, riak, atau pantulan | `:223,236` |
| Dinding sungai | Pita gelap gradien tanpa bentuk (still) | `:235` |

**Pola lintas scene.** (a) Gedung/bak/pipa = `rect` berulang. (b) Satu rumus material (gradien + satu pita gelap + satu kilap) untuk semuanya. (c) Pola acak berulang menggantikan detail rancangan. (d) Tidak ada bayangan jatuh/oklusi sama sekali: `Shadow` dan `GlowEdge` dipakai 0 kali di P01 (grep). (e) Tidak ada tekstur, derau, atau variasi tepi. (f) Tidak semua primitif salah: `Drop` (bezier kustom), `RiverBody` (path gelombang), kamera tracking, `soft()`/`stretch()` adalah gerak dan bentuk yang benar. Masalahnya ada pada bahan dan siluet benda yang dibuat dari kotak.

## 3. Kemampuan engine (diperiksa nyata)

Kelas: A cukup; B ada tetapi pemakaian kurang; C perlu komponen ilustrasi reusable; D perlu kemampuan engine baru; E lebih baik aset vektor yang ditulis tangan. Render memakai Chrome headless sehingga semua fitur SVG/CSS Chrome tersedia; batasnya biaya render (satu render P01 3 sampai 4 menit, 50% konkurensi).

| Kebutuhan | Kelas | Bukti |
| --- | --- | --- |
| Path SVG kustom (organik, asimetris) | A (engine), E (konten) | Dipakai: `drop.tsx:12`, `plant.tsx:9`, `RiverBody`. Tidak ada utilitas morph titik atau generator kontur terkendali |
| clipPath | A | `kit.tsx:116`, `drop.tsx:20`; dipakai untuk isi bak |
| mask (alfa/gradien) | B | Tidak dipakai di mana pun di `r3/`. Chrome mendukung; belum ada pembungkus |
| Filter blur | A | `kit.tsx:44` (3, 6, 10, 16, 26, 40, dibulatkan ke terdekat, `kit.tsx:58-61`) |
| Filter derau/tekstur (`feTurbulence`) | B atau D-ringan | Hanya di mesin lama `toon/Backdrop.tsx:128` (grain). Tidak ada di `r3/` |
| `feDisplacementMap` (refraksi, riak), `feSpecularLighting`/`feDiffuseLighting`, `feColorMatrix`, `feDropShadow`, `feMorphology` | B (belum terbukti perlu) | Tidak dipakai di `r3/`, `experiment/`, atau P01 (grep). Belum diuji biaya render |
| Gradien linear/radial berlapis | B | Dipakai satu atau dua lapis per benda (`drop.tsx:18-19`, `kit.tsx:76-85`). Tidak ada gradien berlapis untuk volume, tidak ada gradien yang diikat ke satu arah cahaya bersama |
| Bayangan jatuh, oklusi ambien | B / C | `Shadow` ada (`kit.tsx:108`, elips gelap); P01 tidak memakainya. Tidak ada utilitas bayangan menurut arah cahaya |
| Highlight/rim | B / C | Ditulis ulang tangan per komponen (`drop.tsx:39-44`); `GlowEdge` ada (`kit.tsx:140`), tidak dipakai |
| Tekstur (pola, serat, butir) | C / E | Hanya elips acak. `<pattern>` tidak dipakai. Tekstur bermakna (beton, genteng, pasir) lebih baik aset vektor |
| Opasitas | A | Dipakai di mana-mana |
| Blend mode | B | Tidak ada di `r3/`; hanya `mixBlendMode: "multiply"` di mesin lama `diorama/Diorama.tsx:125`. Chrome mendukung `mix-blend-mode` pada grup SVG (untuk cahaya `screen`, bayangan `multiply`); perlu diuji pada render still deterministik |
| Transform | A | Dipakai |
| Parallax (`Layer`) | A | `kit.tsx:67-70`. Kekurangan: tidak ada perspektif udara otomatis (warna dikerjakan tangan), tidak ada rotasi kamera/roll |
| Kamera | A (2D) / B | x, y, zoom; tracking dan dolly dipakai baik (`04-shots.tsx:84`). Rotasi/roll dan DOF per kedalaman tidak ada di 2D (blur statis per `Layer`) |
| Manajemen lapisan | A | `Layer d` + urutan JSX; tidak ada ID lapisan atau lapisan yang bisa di-cache |
| Deformasi bentuk | B | `Drop` mengubah titik kontrol lewat `flat` (`drop.tsx:11`), selebihnya `scale(sx, sy)`. Morph titik-ke-titik antara dua path tidak ada |
| Integrasi 3D | A tetapi tidak relevan di P01 | `@r3/three`, `soft/kit.tsx`; bahan gaya toon dari `Ball/Box/Cyl/Hose` (`soft/kit.tsx:23-25`), jadi pola primitif yang sama. Butuh `--gl=angle` (`render.mjs:27`) |
| Pustaka asset ilustrasi (path berkualitas, dikelola, dipakai ulang) | C / E, D bila perlu loader | Tidak ada. `parts/` per contoh, tanpa konvensi siklus aset |
| Bukti kemampuan lampau | - | `repAsd.tsx` (11 `path`) dan `repAsddd.tsx` (36 `path`) hanya gradien + blur + clipPath; `REFERENSI-GAYA.md` sendiri mencatat "rantai struktur masih tampak berulang", "dendrit masih lurus dan berduri". Jadi stack ini belum terbukti mencapai tingkat detail Kurzgesagt, tetapi juga belum diuji untuk mencapainya |

## 4. Tabel akar masalah

| Masalah | Akar masalah | Lapisan | Koreksi yang diusulkan |
| --- | --- | --- | --- |
| Gedung/kota berupa kotak berulang (`city.tsx:10-13`) | Satu generator `FlatRect` + jendela acak; tidak ada siluet gedung dirancang (atap, menara, tangga, variasi arsitektur) | Aset | Beberapa tipe bangunan sebagai path berkarakter, ditata dengan irama, bukan acak; detail untuk tengah, siluet untuk jauh |
| Tetes terbaca jeli, bukan air (`drop.tsx:18`) | Isian opak; tanpa refraksi, Fresnel, kaustik, warna lingkungan di tepi | Aset (bahan) | Tetes transparan: tepi terang, bagian bawah mengumpulkan cahaya (kaustik), isi menampilkan kota terbalik yang dilengkungkan (path atau filter kecil), bukan rect |
| Pantulan = barcode (`drop.tsx:26-35`) | Spesifikasi hanya bilang "pantulan kota terbalik"; renderer menebak cara menggambar | Penulisan + aset | Spesifikasi cara: "siluet kota terbalik, dilengkungkan mengikuti lensa, warna senja menguat di tepi bawah"; aset pantulan dari path yang sama dengan skyline latar |
| Semua material tampak sama (bak, pipa, tanah, gedung) | Satu rumus di `STYLE.md` 2.2 (dua nilai, satu bayangan, satu kilap, opasitas rendah) | Art direction (standar) | Sistem material di `STYLE.md`: air, kaca, beton, baja berkarat, tanah, genteng, daun masing-masing punya resep (tepi, kilap, tekstur, cahaya) |
| Detail diganti pola berulang (isi bak, tanah, genteng) | Tidak ada tahap desain detail; `R(i)` adalah jalan pintas | Proses + aset | Detail rancangan per subjek (hierarki L1/L2/L3); pola hanya untuk L3; variasi bentuk, bukan hanya posisi |
| Tanpa bayangan jatuh/oklusi; benda mengapung | `Shadow` ada tetapi tidak diminta; tidak ada arah cahaya bersama | Art direction + engine kecil | Deskriptor cahaya per scene (arah, warna kunci, warna isi, perilaku bayangan) dan satu helper bayangan/rim yang memakainya |
| Lingkungan datar: dua `Skyline` sama, tanah cokelat kosong | Lima lapisan dipenuhi secara formal; lapisan 2 dan 4 tidak dirancang (`STYLE.md` 4) | Art direction | Lapisan latar depan nyata (benda dekat kamera, blur), perspektif udara (warna), pemisahan lewat nilai |
| Subjek kecil, hierarki lemah di s02, s03 | Tetes dijadikan penanda jalur, bukan fokus; dolly 3,6 ke 1,05 melepas subjek; label tetap di baris atas | Art direction + animasi | Fokus dijaga (skala subjek minimal, cahaya terfokus), label menempel benda (`useLabel` + `Pill`) |
| Isi bak berupa titik, klorin = bintang | Bentuk generik menggantikan metafora ilmiah yang benar | Penulisan + aset | Spesifikasi bahan (flok = gumpalan tak beraturan, klorin = molekul/ kilau halus tanpa bintang) dan aset path |
| Evaluasi memberi 4 untuk Kedalaman/Konsistensi | Rubrik tidak punya kriteria kualitas ilustrasi (siluet, material, cahaya) dan tidak ada pembanding | Proses | Gate kualitas ilustrasi berbasis still, dinilai sebelum animasi (Phase C) |
| Gerak kamera mekanis | Dolly dan tracking linier ke subjek; tidak ada rotasi, tidak ada gerak sekunder lingkungan (kabel, daun) | Animasi | Gerak sekunder lingkungan dan easing berlapis (setelah still disetujui) |
| Garis aliran udara, awan elips | Elemen atmosfer dari primitif garis dan elips | Aset | Bentuk awan/uap organik berkontur, bukan elips |

## 5. Celah spesifikasi penulisan

Pembagian peran yang dipakai: **K** = apa yang harus dikomunikasikan scene; **I** = apa yang harus digambar ilustrator; **A** = apa yang dianimasikan; **E** = apa yang harus didukung engine.

| Aspek | Status di `03-visual.json` / `gaya-visual.md` | Renderer terpaksa menebak? | Peran | Usulan penampung |
| --- | --- | --- | --- | --- |
| Siluet | Tidak ada bidang. Hanya "bulat agak tak beraturan" dalam prosa `anatomy` | Ya | I | `gaya-visual.md` §3 (tambah bidang `silhouette`) + `CONTRACT.md` |
| Bahasa bentuk | Tidak ada per subjek; `STYLE.md` 2.1 terlalu kasar (organik/geometris) | Ya | I | `STYLE.md` 2.1 diperluas |
| Proporsi | Hanya `scale_ref` (relatif ke benda lain) | Sebagian | I | `gaya-visual.md` §3 `proportions` |
| Hierarki detail | Hanya rasio 3:2:1 di `STYLE.md` 2.3, tidak diterapkan per subjek | Ya | I | `gaya-visual.md` §3 `detail_level` (L1/L2/L3) |
| Material | Tidak ada. `treatment` = literal/simplified/metaphor adalah kebenaran fakta, bukan bahan (nama bentrok) | Ya | I | `STYLE.md` (sistem material) + bidang `material` per permukaan |
| Permukaan | Tidak ada (`must_show` menyebut sebagian secara kebetulan) | Ya | I | sama |
| Arah cahaya | `environment.lighting` string bebas | Sebagian | I + E | `STYLE.md` 3.4 + bidang terstruktur `light` |
| Perilaku bayangan | Tidak ada | Ya | I + E | `STYLE.md` 3.4 |
| Hubungan warna | `palette` string + `meaning` | Sebagian | I | `STYLE.md` 3.1 (peran warna) cukup; tambah peran per benda |
| Struktur lingkungan | `environment.layers` 5 string pendek | Ya (isi tiap lapis) | I | `gaya-visual.md` §3 (lapis dengan isi, bukan label) |
| Hubungan ruang | `composition` string | Sebagian | K + I | tetap |
| Hierarki fokus | `focal`: nama benda; tidak ada aturan ukuran minimum atau kontras | Ya | K + I | `STYLE.md` 5 (ukuran minimum subjek) |
| Acuan visual | Tidak ada bidang. Gaya = "terinspirasi Kurzgesagt" | Ya | I | `gaya-visual.md` §3 bidang `reference` (teknik dalam kata-kata, bukan salinan) |
| Detail wajib | `must_show` ada (baik) | Tidak | K | tetap |
| Batasan animasi | `animation.*` ada; tidak ada batas gerak sekunder atau kecepatan | Sebagian | A | `PIPELINE.md` Mesin R3 bagian 3 |
| Ketersediaan aset | `assets[]` string bebas, tanpa status (baru/ada/ditulis) | Ya | I + E | `PIPELINE.md` Mesin R3 (arsitektur aset) |
| Gate kesiapan | §7 `gaya-visual.md` bersifat subjektif; V-4 menghitung kata anatomi | Ya | K | `CONTRACT.md` V-rule baru untuk bidang desain; gate still di `gaya-visual.md` |

Kontrak: `instruksi/templates/script.schema.json` `$defs.visual` punya `palette`, `lighting` sebagai string; bidang baru dibuat opsional dulu supaya siklus T01/T02 yang sudah ada tidak rusak. Larangan kreator: tidak ada file aturan baru; semua ke dokumen di atas.

## 6. Rencana koreksi berprioritas (Phase B sampai F)

| Prioritas | Fase | Tindakan | Alasan/bukti |
| --- | --- | --- | --- |
| 1 | B | Rumuskan standar ilustrasi di `STYLE.md` (menggantikan 2.2 yang membatasi): sistem material, cahaya, hierarki detail L1/L2/L3, aturan "primitif hanya L3" | Akar 1 (standar mengunci hasil datar) |
| 2 | B | Tambah bidang desain ke template `gaya-visual.md` §3 dan `$defs.visual` (opsional): `silhouette`, `material`, `light`, `detail_level`, `reference` | Celah bagian 5 |
| 3 | B | Tambah tahap "desain still" ke `PIPELINE.md` Mesin R3 alur per siklus (sebelum animasi), dengan gate kualitas ilustrasi yang menilai siluet, material, cahaya, hierarki | Akar proses |
| 4 | B | Tetapkan arsitektur aset (aset path ditulis tangan, per subjek, dipakai ulang; `parts/` ke `r3/` setelah lulus) di `PIPELINE.md` | Hindari jebakan primitif |
| 5 | C | Benchmark still: lihat usulan di bawah. Termasuk uji coba filter (displacement/lighting) pada tetes saja, ukur waktu render | Membuktikan atau menolak kebutuhan engine |
| 6 | D | Animasi benchmark: kamera, gerak sekunder lingkungan, squash tetes dengan material baru | Hanya setelah still disetujui |
| 7 | E | Integrasi ke `r3/` hanya yang terbukti (lihat daftar engine) | Brief: berbasis bukti |
| 8 | F | Regresi: render ulang P01 lama, `T02-001-s06`, typecheck, `check_kit.py`; pastikan vertikal tidak berubah | Kompatibilitas |

**Usulan scene benchmark: s01 (tetes jatuh di atas kota senja).**
- Subjek besar (sekitar 300 px) dan satu fokus, jadi detail material terbaca; sekaligus ada lingkungan (kota senja, hujan, latar depan) untuk menguji kedalaman.
- Dampak tertinggi per usaha: `Drop` dipakai di keempat scene, dan `Skyline` di tiga; memperbaikinya memperbaiki hampir seluruh video.
- Menguji bahan paling sulit (air/kaca transparan dengan refraksi), siluet organik asimetris, cahaya senja, dan bayangan/oklusi. Biaya render rendah (satu shot, 4 detik).
- Memuat jangkar cerita (callback ke s04), jadi hasil benchmark mudah diuji ulang.
- Cadangan bila kreator ingin uji bahan beragam: satu bak filter dari s03 (beton, air, pasir, kerikil, baja) sebagai mini-benchmark kedua.

**Daftar perubahan engine yang mungkin dibutuhkan (bukti sekarang):**
| Perubahan | Status bukti |
| --- | --- |
| Filter bersama di `Defs` (`feTurbulence`, `feDisplacementMap`, `feColorMatrix`) untuk refraksi dan derau halus | Belum terbukti perlu. Chrome mendukung; tidak pernah dicoba di `r3/`. Putuskan setelah spike Phase C (kualitas vs. waktu render) |
| Mask/blend mode di `r3/` | Belum terbukti perlu; dicoba di benchmark, pembungkus kecil bila terbukti berguna |
| Deskriptor cahaya + helper bayangan/rim | Cukup sebagai komponen, bukan perubahan engine; bukti kebutuhan: P01 memakai 0 bayangan, pola kilap ditulis ulang di tiap komponen |
| Utilitas morph titik antar path | Belum terbukti perlu (`Drop` sudah memakai parameter `flat`) |
| Rotasi/roll kamera 2D | Belum terbukti perlu untuk P01 |
| Perspektif udara otomatis di `Layer` | Belum terbukti; dikerjakan lewat `Fog`/warna dulu |
| Pustaka aset ilustrasi + konvensi folder | Bukan fitur engine: konvensi kerja (E) |
| Mesin render baru | Tidak ada bukti; tidak diusulkan |

Satu-satunya hal yang terbukti: standar dan proses perlu berubah. Perubahan engine mana pun menunggu bukti dari still benchmark.

## 7. Batasan audit
- Penilaian visual dari 12 JPEG berukuran 900 px (kompresi 60%), bukan PNG penuh; detail halus (tekstur, banding gradien, garis tepi) mungkin tidak terlihat. Bandingan sengaja dibatasi pada hal yang terbaca di JPEG.
- Video tidak diputar; gerak dan sinkron caption tidak dinilai (hanya kode kamera dan jalur).
- Tidak ada render baru dan tidak ada uji biaya filter; klaim kemampuan engine berdasarkan pembacaan kode dan grep, bukan percobaan. Dukungan Chrome terhadap fitur SVG adalah pengetahuan umum, belum diverifikasi di build Remotion proyek.
- Kualitas "lulus/gagal" tidak diklaim; penilaian ini diagnostik dan mengikuti keluhan kreator yang dikonfirmasi dari still.
- Tidak membaca dokumen sumber referensi Kurzgesagt di luar `REFERENSI-GAYA.md`; tidak ada salinan artwork.
