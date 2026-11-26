# Visual Style Bible (semua track)

Sumber kebenaran untuk **tampilan**: identitas visual, bentuk dan rendering, hierarki detail, material, warna, cahaya, kedalaman, lingkungan, komposisi, tipografi, palet dan pemeran per track. Dokumen lain hanya menautkan ke sini.

- Cara menulis spesifikasi scene dan pola komposisi (untuk penulis): `instruksi/referensi/gaya-visual.md`.
- Cara menggerakkan dan merender (kamera, gerak, transisi, cahaya, 2D/2.5D/3D di Remotion): `produksi/PIPELINE.md` bagian "Mesin R3".
- Analisis video referensi dan palet terukurnya: `produksi/REFERENSI-GAYA.md` (bahan belajar, bukan palet track).

Arah: ilustrasi gerak penjelas (R3), terinspirasi teknik bercerita visual Kurzgesagt. **Yang ditiru hanya teknik** (lapisan kedalaman, metafora yang digambar harfiah, kamera sinematik, koreografi benda). Tokoh, aset, ilustrasi, huruf, warna merek, musik, dan susunan adegan mereka tidak disalin; tokoh dari kartun lain juga tidak.

## 1. Identitas

Gaya ini adalah ilustrasi vektor penjelas dengan **rendering datar bertingkat**. Ciri-cirinya:
- bentuk datar berlapis yang dirancang satu per satu;
- siluet yang unik dan warna jenuh yang terkurasi;
- kedalaman dibangun lewat geseran warna dan susunan lapisan;
- dunia ilustrasi yang hidup.

Setiap gambar harus **menjelaskan sesuatu**. Lingkungan juga ikut menjelaskan: tempat, skala, dan sebab-akibat.

Analisis teknik dari referensi ada di `produksi/REFERENSI-GAYA.md` (resep T1 sampai T13). Standar di dokumen ini adalah turunannya.

Empat sifat yang dijaga di semua track:
1. **Kredibel secara struktur.** Subjek nyata (sel, mesin, kota, uang) digambar dengan bagian-bagian yang benar dan proporsi yang masuk akal, lalu distilisasi. Penyederhanaan tidak boleh mengubah mekanisme (`gaya-visual.md` bagian 4).
2. **Dirancang, bukan dirakit.** Subjek utama adalah satu ilustrasi utuh dengan siluet, proporsi, bagian, dan material yang disengaja. Ia bukan tumpukan lingkaran, kotak, dan silinder.
3. **Lembut tapi tegas.** Sudut membulat dan tanpa garis tinta hitam. Batas bentuk tetap tegas karena dibentuk oleh beda nada datar, bukan oleh blur atau gradien.
4. **Terbaca dalam sedetik.** Satu fokus per frame. Fokus selalu menjadi bagian paling jenuh dan paling kontras.

Hindari:
- **Jebakan primitif:** gedung dari `rect`, awan atau pohon dari satu elips, tangki dari kotak membulat, detail dari pola acak yang berulang.
- **Gaya clip-art:** gradien lembut dan blur di semua benda, satu kilap generik, bayangan sama untuk semua material.
- Ikon datar ala slide dan papan teks.
- Efek tebal: bloom, lens flare, glitch.

## 2. Bentuk dan rendering

### 2.1 Bahasa bentuk
- **Organik:** makhluk hidup, cairan, alam, emosi.
  - Kurva kontinu dan asimetris dengan ketidakteraturan terkendali.
  - Benda lunak bergugus (pohon, awan, busa, semak) dibentuk dari **gugus lobus**: lingkaran beda ukuran yang menyatu dalam satu isian.
- **Geometris berkarakter:** buatan manusia.
  - Kerangka dibuat dari path dengan proporsi khas tipe bendanya (atap pelana bertumpuk, kubah, menara air, tangki silinder dengan cincin dan tangga, pipa bersambung flensa).
  - Sudut membulat, tapi siluetnya harus langsung dikenali sebagai benda itu.
- **Campuran:** kendaraan dan perangkat. Kerangka geometris dengan detail organik.
- **Uji siluet:** isi bentuk dengan satu warna gelap. Subjek harus tetap dikenali, dan harus berbeda dari subjek lain di frame.
- Primitif murni (lingkaran, kotak membulat) hanya boleh untuk tingkat L3 (bagian 2.3) dan diagram.

### 2.2 Rendering datar bertingkat (wajib untuk L1 dan L2)
| Lapisan | Aturan |
| --- | --- |
| Nada dasar | Isian datar, warna lokal material |
| Bayangan bentuk | Bentuk sabit di sisi jauh dari cahaya: nada dasar digeser ke warna bayangan scene (bukan sekadar lebih gelap); tepi tegas mengikuti bentuk |
| Inti bayangan | Bentuk lebih kecil dan lebih gelap di dalam bayangan, untuk benda bervolume besar |
| Highlight bentuk | Sabit sempit di sisi dekat cahaya, nada dasar digeser ke warna cahaya kunci |
| Highlight garis | Garis terang tipis berujung bulat, sejajar tepi dalam, sering terputus (T2) |
| Kilap | Titik atau sabit putih hanya untuk material mengilap (air, kaca, logam poles, mata) |
| Garis dalam | Kontur atau lipatan di dalam bentuk dengan nada isian ±, ujung bulat; **tidak ada garis luar hitam** |
| Bayangan jatuh/kontak | Bentuk datar gelap ber-opasitas di bawah benda yang menyentuh permukaan, mengikuti bentuk alas; benda tidak boleh tampak mengapung |

- **Gradien** hanya untuk langit, latar jauh, glow, cairan dalam, dan pemudaran atmosfer. Gradien tidak boleh menjadi pengganti shading benda.
- **Blur** hanya untuk lapisan latar depan ekstrem dan latar sangat jauh (bagian 4).
- Arah cahaya sama untuk semua benda di satu scene.

### 2.3 Hierarki detail
| Tingkat | Untuk | Detail | Rendering |
| --- | --- | --- | --- |
| **L1: subjek utama** | benda yang sedang dijelaskan (tetes, sel, mesin, gedung kunci) | Siluet dirancang khusus. Bagian dalam yang relevan terlihat. Detail permukaan T3. Semua lapisan 2.2. | Path tulisan tangan (aset), bukan rakitan primitif |
| **L2: pendukung** | benda yang berinteraksi atau menjelaskan konteks (pipa di sekitar tangki, bakteri di sekitar sel, mobil dan pohon) | Siluet khas tipenya, 3 nada, satu highlight garis | Komponen reusable dengan variasi parameter |
| **L3: latar dan atmosfer** | gedung jauh, partikel, bukit, awan jauh | Siluet 1 sampai 2 nada, tanpa detail kecil | Primitif dan path sederhana boleh; warna digeser ke langit |

- Detail dipusatkan di tempat yang membantu pemahaman, tidak ditambahkan acak demi tampak rumit.
- Rasio kepadatan detail L1 : L2 : L3 kira-kira 3 : 2 : 1.
- Ukuran minimum subjek L1:
  - 16:9: sekitar 12% tinggi frame saat sedang dijelaskan.
  - 9:16: sekitar 18%.

### 2.4 Sistem material
Setiap permukaan L1 dan L2 diberi satu material. Material menentukan nada, highlight, tepi, transparansi, dan tekstur.

| Material | Nada | Highlight | Tepi | Transparansi | Detail permukaan |
| --- | --- | --- | --- | --- | --- |
| Matte (cat, plastik, kulit buah) | 3 | sabit lebar lembut, tanpa kilap | tegas | opak | sedikit atau tidak ada |
| Glossy (logam poles, plastik keras) | 3–4 | sabit sempit + kilap titik + garis T2 | tegas | opak | tanpa |
| Translucent (gel, sitoplasma, daun tipis) | 3 | sabit + rim terang | rim lebih terang dari badan | 0,6–0,85; isi dalam terlihat samar | partikel dalam |
| Cairan / air | 3–4 nada cyan, sabit bawah lebih gelap | sabit putih besar + titik kilap + garis T2 putus | meniskus: tepi sedikit lebih gelap, lalu rim terang | 0,7–0,9; latar tembus sedikit | riak berupa garis pendek putih, pantulan berupa pita siluet dua nada yang melengkung mengikuti badan |
| Kaca | warna latar +terang | garis T2 tebal satu sisi + sabit putih besar + kilau 4 sudut | garis terang | 0,25–0,5 | tanpa |
| Jaringan organik | 3 nada hangat | sabit lembut | tidak rata, bergelombang | opak / translucent | bintik dan kapsul T3 |
| Membran biologis | 2 nada berlapis | garis T2 di sisi luar | ganda (dua garis sejajar) | translucent | butir atau ekor lipid berulang dengan variasi |
| Logam (baja, besi) | 3–4 nada dingin | pita highlight memanjang searah bentuk | tegas; flensa, baut, sambungan sebagai detail L1/L2 | opak | goresan atau karat hanya bila relevan |
| Beton / batu | 3 nada netral hangat atau dingin | sabit lebar matte | sedikit tidak rata | opak | bintik halus T3 dan retak sebagai garis dalam |
| Kain | 3 | sabit lembut mengikuti lipatan | lipatan sebagai garis dalam | opak | jahitan bila relevan |
| Tanah | 3 nada cokelat-jingga | sabit pada gundukan | bergelombang | opak | kerikil sebagai T3, akar sebagai garis dalam |
| Vegetasi | 3–4 nada hijau, geser ke kuning di sisi cahaya | sabit di lobus atas | gugus lobus | opak | urat daun sebagai garis dalam (L1 saja) |
| Atmosfer (kabut, uap, awan) | 2 nada | tepi atas lebih terang | gugus lobus lembut | 0,3–0,7 | tanpa |

### 2.5 Konsistensi antar-scene
- Subjek yang sama memakai komponen aset yang sama di semua scene: satu fungsi gambar, dengan parameter untuk keadaannya.
- Proporsi antar-subjek dicatat sekali di `03-visual.json` (`subjects[].scale_ref`, `proportions`) dan dipakai di semua scene.
- Perubahan keadaan ditunjukkan pada benda yang sama (warna, ekspresi, bentuk), bukan dengan mengganti benda.

## 3. Sistem warna

### 3.1 Struktur palet
Setiap track punya palet sendiri (bagian 8), dan setiap scene punya palet turunan di `03-visual.json`. Strukturnya sama:

| Peran | Fungsi | Jumlah |
| --- | --- | --- |
| Latar | Langit atau ruang; sering gelap (indigo, ungu tua, biru malam) agar warna lain menyala | 2 sampai 3 nilai |
| Primer | Warna identitas, dipakai pada subjek utama atau jangkar | 1 sampai 2 keluarga (masing-masing 3 sampai 4 nada) |
| Sekunder | Lingkungan dan subjek pendukung, analog dengan primer | 2 sampai 3 keluarga |
| Aksen | Komplementer hangat (oranye, kuning, merah muda) untuk fokus, cahaya, label | 1 |
| Semantik | Hidup/berhasil, mati/gagal, bahaya, netral (3.2) | 4 |
| Cahaya | Warna cahaya kunci, warna bayangan, warna rim | 3 |

- **Keluarga nada:** setiap warna dipakai sebagai keluarga 3 sampai 4 nada (bayangan inti, bayangan, dasar, highlight) yang digeser hue-nya, bukan hanya lightness. Contoh: bayangan biru bergeser ke ungu, highlight hijau bergeser ke kuning.
- **Saturasi tinggi dan terkurasi.** Hindari abu-abu netral kusam. Netral pun diberi warna, misalnya abu-biru atau abu-ungu.

### 3.2 Warna bermakna (bukan pemetaan kaku)
- Hangat dan terang untuk hidup, aktif, atau berhasil. Dingin, pudar, atau kelabu untuk mati, pasif, gagal, atau ditolak. Perubahan keadaan ditunjukkan sebagai perubahan warna pada benda yang sama.
- Makna warna ditetapkan per video di `03-visual.json` (`palette.meaning`) dan dipakai konsisten sepanjang video itu.
- Warna yang punya makna nyata dipertahankan: air bersih biru-cyan, darah merah, daun hijau. Warna semantik tidak boleh melawan warna nyata subjek.

### 3.3 Kontras dan keterbacaan
- Subjek utama adalah yang **paling jenuh dan paling kontras** di frame. Kontras lightness-nya terhadap latar di sekitarnya minimal sekitar 25 poin.
- Teks label: kontras minimal 4,5:1 terhadap isian pilnya.
- Satu aksen komplementer per frame, kecuali saat membandingkan dua pihak.
- Uji dalam skala abu-abu sebelum dikunci. Fokus harus tetap terbaca, dan tiap lapisan kedalaman harus punya rentang nilai yang terpisah.

## 4. Cahaya, kedalaman, dan lingkungan

### 4.1 Model cahaya
| Unsur | Aturan |
| --- | --- |
| Ambient | Warna latar mewarnai semua bayangan. Bayangan memakai hue latar, bukan hitam. |
| Kunci | Satu arah per scene (default kiri atas). Menentukan sisi highlight dan bayangan semua benda. |
| Isi (fill) | Bayangan tidak pernah hitam pekat; nilai terendah dibatasi agar bentuk tetap terbaca |
| Rim | Garis T2 berwarna sumber cahaya atau warna langit di tepi yang membelakangi cahaya. Memisahkan subjek dari latar gelap. |
| Bayangan kontak dan jatuh | Wajib bila benda menyentuh permukaan. Datar, gelap, ber-opasitas, mengikuti alas. |
| Oklusi | Lipatan, sudut dalam, dan bagian yang tertutup diberi nada bayangan inti |
| Sumber cahaya nyata | Lampu, matahari, inti aktif: glow radial lembut + kilau 4 sudut; benda di dekatnya mendapat rim berwarna sumber |
| Suasana | Hangat (senja, matahari): cahaya kuning-oranye, bayangan ungu. Dingin (malam, dalam tubuh, laut): cahaya cyan, bayangan biru tua-ungu. |

### 4.2 Lapisan kedalaman
| Lapisan | Isi | Perlakuan |
| --- | --- | --- |
| 1. Latar | Langit, ruang, dinding jauh | Gradien boleh, tanpa detail, bergerak paling lambat |
| 2. Lingkungan jauh | Siluet kota, bukit, hutan | L3, 1 sampai 2 nada, warna digeser **40 sampai 70%** ke warna langit |
| 3. Lingkungan tengah | Struktur tempat (gedung dekat, dinding pembuluh, jalan) | L2, 3 nada, warna digeser **10 sampai 30%** ke langit |
| 4. Subjek | Benda utama dan pendukung yang berinteraksi | L1/L2, rendering penuh, tidak digeser |
| 5. Latar depan | Daun, batu, awan, benda yang lewat dekat kamera | Besar, gelap, kontras rendah, sebagian keluar bingkai. Blur hanya bila sangat dekat. |
| 6. Atmosfer | Partikel, hujan, kabut, kilau | Tipis, tidak menutupi subjek |

- **Perspektif udara** dibuat dengan menggeser warna ke langit, bukan dengan blur. Makin jauh, makin kecil, makin sedikit detail, dan makin dekat ke warna langit.
- **Tumpang tindih** wajib di setiap frame.
- **Parallax:** kecepatan geser tiap lapisan sebanding dengan kedekatannya ke kamera (angka di PIPELINE.md).
- **Transisi skala:** lapisan subjek pada skala lama menjadi latar pada skala baru.

### 4.3 Desain lingkungan
- **Lingkungan adalah dunia yang dirancang**, bukan latar berulang:
  - Satu tengara (landmark) yang dikenali per tempat, misalnya menara air atau jembatan.
  - Tipe benda yang bervariasi: minimal 3 tipe bangunan dengan siluet berbeda di kota, bukan satu kotak yang diulang.
  - Detail permukaan di lapisan tengah: atap, tangki di atap, balkon, papan tanpa teks, pohon gugus lobus, lampu jalan.
- **Lingkungan ikut menjelaskan:** tempat menyatakan skala dan konteks proses. Di adegan hujan kota, misalnya, terlihat talang, atap, dan saluran sebagai petunjuk ke mana air akan pergi.
- **Dunia yang hidup:** di setiap lapisan ada 1 sampai 3 kejadian kecil (burung, kendaraan, lampu menyala, uap), dengan gerak sekunder kecil yang tidak mencuri fokus.
- Irama, bukan acak: jarak dan tinggi benda berulang dengan variasi terencana (pola besar-kecil-sedang), bukan sebaran `R()` murni.

## 5. Komposisi

- **Satu fokus per frame.** Fokus diletakkan di titik sepertiga, atau di tengah bila subjek simetris atau sedang diperkenalkan.
- **Struktur:** pakai diagonal, horizon melengkung, atau jalur berkelok yang membawa mata ke fokus.
- **Pembingkai:** latar depan gelap di satu atau dua tepi.
- **Ruang negatif** di arah gerak dan arah pandang subjek.
- **Hierarki:** subjek > pendukung > lingkungan tengah > lingkungan jauh > latar, dibangun lewat ukuran, kontras, saturasi, dan detail.
- **Sudut kamera bermakna:**
  - sejajar mata untuk empati;
  - dari atas untuk peta dan sistem;
  - dari bawah untuk skala besar dan ancaman;
  - potongan (cutaway) untuk isi dalam.
- **Zona aman:** label dan benda penting di atas y 860 pada 16:9 (pita caption) dan di sepertiga tengah pada 9:16. Tepi 5% kosong dari teks.
- **Vertikal (9:16):** subjek ditumpuk tegak. Jangan memotong tengah 16:9 bila subjek atau label jadi keluar bingkai (cara reframe di PIPELINE.md).

## 6. Adaptasi per jenis subjek

| Jenis | Bentuk | Warna | Gerak | Komposisi | Hindari |
| --- | --- | --- | --- | --- | --- |
| Biologi (sel, organ, organisme) | Organik, struktur dalam terlihat lewat potongan atau membran tembus (material translucent/membran) | Sesuai pewarnaan yang dikenali, distilisasi jenuh, latar cairan gelap | Lunak, berdenyut, deformasi, gerak acak kecil (Brown) | Potongan, perbandingan skala, lingkungan cairan | Sel bulat polos tanpa struktur; semua sel sama; bakteri bola berduri generik |
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

## 10. Galeri acuan dan contoh visual

### 10.1 Galeri acuan (target visual yang dipakai agent)
Gambar di `produksi/acuan-visual/` adalah **render kita sendiri** yang menjadi target kualitas. Gambar referensi pihak ketiga tidak disimpan di sini.

Cara memakainya:
- Agent membandingkan setiap still dengan acuan yang paling dekat jenis adegannya, memakai rubrik di `produksi/PIPELINE.md` bagian "Mesin R3" 10.
- Acuan baru ditambahkan hanya setelah kreator menyetujui still-nya.

| File | Jenis adegan | Yang dicontohkan | Status |
| --- | --- | --- | --- |
| `P01b-s01-Master16x9-t2.9.jpg` | subjek L1 di atas lingkungan kota senja | material air (T1, T2, T9, T10), blok kota 3/4, tengara, kedalaman lewat geser warna, cahaya senja | acuan sementara (putaran 6), menunggu persetujuan akhir |
| `P01b-s01-Master16x9-t1.5.jpg` | miskonsepsi dicoret | metafora ditandai: siluet pucat bergaris putus + coretan | sama |
| `P01b-s01-closeup-tetes-t2.9.jpg` | close-up subjek L1 | 4 nada datar, sabit putih, rim jingga putus, pantulan siluet kecil | sama |
| `P01b-s01-detail-lingkungan-t2.9.jpg` | detail lingkungan L2 | menara air, perabot atap dengan bayangan kontak, balkon, jendela kaca memantulkan langit | sama |
| `P01b-s01-Short9x16-t2.9.jpg` | tata letak vertikal | subjek di tengah, label di atas, caption di sepertiga bawah | sama |
| `P01b-banding-P01-vs-P01b-s01.jpg` | sebelum dan sesudah | kiri: jebakan primitif (P01); kanan: standar ini | sama |

### 10.2 Contoh visual lain

| Yang diperlihatkan | File |
| --- | --- |
| Reproduksi teknik referensi (label di kata, iris, wipe, blur kedalaman) | `produksi/render/_eksperimen/banding-asd.mp4`, `banding-asddd.mp4` |
| Lembar pemeran T02 | `produksi/render/_eksperimen/T02-pemeran-lembar.png` |
| Scene R3 lengkap per kalimat | `produksi/contoh-r3/T02-001-s06/` (render ke `produksi/render/_contoh/`) |
| Prototipe pertama (sebelum standar ini; contoh jebakan primitif) | `produksi/contoh-r3/P01-tetes-air/` |
| Benchmark standar ini (s01 tetes di atas kota) | `produksi/contoh-r3/P01b-s01-benchmark/` (Fase 3.5) |

## 11. Status
- **Fase 3.5 (2026-11-26):** bagian 1 sampai 5 ditulis ulang setelah audit visual P01 (`hasil/review/2026-11-26-audit-visual-P01.md`) dan analisis still referensi dari kreator (`REFERENSI-GAYA.md`). Versi sebelumnya (gradien dua nilai, satu bayangan, satu kilap) terbukti menghasilkan ikon datar.
- **Persetujuan visual:** standar ini diuji di benchmark s01 (`produksi/contoh-r3/P01b-s01-benchmark/`) lewat still dulu, animasi kemudian.
- **Transisi:** garis putih tegas pada iris dan wipe tetap berlaku sampai kreator memutuskan lain.
