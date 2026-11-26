# Gaya visual wajib dan spesifikasi scene (R3)

**Berlaku untuk semua track dan semua siklus sejak 2026-11-26, bagi agent chat maupun agent di repo.** Dipilih kreator. Pengecualian hanya T01 siklus 001 (dirender sebelum aturan ini); T01 siklus 001 dan T02 siklus 001 bukan acuan. QA otomatis menandai **kritis** bila scene siklus baru tidak punya `shots`.

Dokumen ini untuk **penulis**: apa yang harus dijelaskan dan digambar di setiap scene. Pembagian sumber kebenaran:

| Pertanyaan | Dokumen |
| --- | --- |
| Riset, narasi, struktur cerita | `instruksi/referensi/gaya-cerita.md` |
| Apa yang digambar per kalimat dan per scene (dokumen ini) | `gaya-visual.md` |
| Seperti apa tampilannya (bentuk, rendering, material, cahaya, kedalaman, lingkungan, tipografi, pemeran) | `produksi/STYLE.md`; resep teknik dari referensi di `produksi/REFERENSI-GAYA.md` (T1–T13) |
| Bagaimana dianimasikan dan dirender (kamera, gerak, transisi, cahaya, 2D/2.5D/3D) | `produksi/PIPELINE.md` bagian "Mesin R3" |
| Bentuk data (`shots`, `03-visual.json`, klaim) | `produksi/CONTRACT.md` |
| Kepadatan isi dan fondasi | `hasil/learnings-global.md` |

Penulis bertanggung jawab atas cerita **dan** penjelasan visualnya, tetapi tidak menulis kode. Animator (agent repo) tidak boleh mengarang detail cerita atau ilmiah yang hilang; scene yang kurang jelas dikembalikan ke penulis (bagian 7).

Dasar pengamatan: Kurzgesagt "Dying Is Complicated", dianalisa per kalimat dan per frame (`produksi/REFERENSI-GAYA.md`). **Yang ditiru hanya teknik.** Tokoh, aset, huruf, musik, warna merek, dan susunan adegan mereka tidak disalin.

## 1. Prinsip

1. **Satu kalimat, satu gambar.** Setiap kalimat narasi punya shot yang menggambarkan isi kalimat itu secara harfiah. "Penumpang bergelantungan di pintu dan duduk di atap" berarti kereta penuh orang di pintu dan atap, bukan tokoh berdiri di depan gedung. Kalimat sangat pendek (kurang dari 4 kata) boleh berbagi shot dengan kalimat sebelumnya.
2. **Ganti gambar di batas kalimat.** Pergantian shot jatuh di awal kalimat (±0,4 detik), memakai waktu kata dari caption. Panjang shot mengikuti panjang kalimat (biasanya 3 sampai 8 detik).
3. **Label dan sorotan jatuh tepat di katanya.** Label muncul saat kata bendanya diucapkan; sorotan (glow, perubahan warna) saat kata kerjanya diucapkan.
4. **Tidak ada frame yang diam.** Kamera selalu melayang pelan, benda latar mengambang, tokoh bernapas dan berkedip. Diam total hanya untuk jeda dramatis yang disengaja.
5. **Metafora di naskah digambar harfiah**, dan ditandai sebagai metafora (bagian 4). Metafora besar dari `gaya-cerita.md` menjadi jangkar visual yang dipakai berulang. Metafora tidak menggantikan penjelasan mekanisme yang sebenarnya.
6. **Skala adalah kamera.** Cerita berpindah dari gambaran besar ke detail (negara → kota → stasiun → kereta → kursi) dan kembali. Satu **jangkar** (peta, siluet, atau benda metafora) muncul berulang untuk menunjukkan posisi cerita.
7. **Angka dibuat bisa dihitung.** Proporsi menjadi grid titik yang diwarnai, jumlah menjadi benda yang muncul satu per satu dengan penghitung, waktu menjadi garis waktu, perbandingan menjadi dua panel.
8. **Benda diberi wajah bila perlu emosi**, bukan saat mekanismenya sedang dijelaskan secara literal (`produksi/STYLE.md` 9.1).
9. **Warna menandai keadaan** pada benda yang sama (aturan di `produksi/STYLE.md` 3.2).
10. **Kedalaman berlapis**: latar, lingkungan, subjek, latar depan, atmosfer (`produksi/STYLE.md` 4).
11. **Teks di layar minimal.** Label pil pada benda (maksimal 3 kata atau satu angka), legenda kecil bila perlu, catatan kaki kecil. Tanpa papan teks.
12. **Bubble hanya untuk sikap atau lelucon.** Jarang (sekitar satu per menit), tidak mengulang narasi, tidak memuat klaim fakta.
13. **Musik tidak berhenti.** Jeda narasi diisi musik. Efek suara menempel pada kejadian (pop label, wipe, hantaman).

## 2. Dua tingkat spesifikasi visual

| Tingkat | Tempat | Isi | Siapa memakai |
| --- | --- | --- | --- |
| Per kalimat | `shots` di `03-script.json` | apa yang terlihat (`show`), apa yang berubah (`motion`), skala, transisi, label di kata, `count` | mesin (waktu, label, transisi) dan animator |
| Per scene | entri scene di `03-visual.json` | tujuan, subjek dan anatominya, lingkungan, perilaku, komposisi, arah animasi, dasar fakta, kebutuhan produksi | animator, QA kesiapan visual |

`03-visual.json` wajib untuk siklus yang menulis `"visual_spec": "03-visual.json"` di `03-script.json`. Mulai siklus baru setelah dokumen ini disetujui, setiap siklus menulisnya. Narasi tidak disalin ke `03-visual.json`; ia diambil dari `03-script.json` lewat id scene. Bentuk datanya di `produksi/CONTRACT.md`.

## 3. Template scene (A sampai I)

Setiap scene di `03-visual.json` mengisi bidang di bawah. Tidak semua bidang wajib untuk semua scene, tetapi **tidak boleh ada detail visual penting yang ambigu**.

| Bagian | Bidang | Yang ditulis | Wajib |
| --- | --- | --- | --- |
| **A. Tujuan naratif** | `purpose` | informasi apa yang disampaikan, pertanyaan apa yang dijawab, kenapa di titik ini | ya |
| **B. Narasi** | (dari `03-script.json`) + `emphasis` | kata atau frasa yang ditekankan; durasi diharapkan | `emphasis` bila ada istilah kunci |
| **C. Subjek dan anatomi** | `subjects[]` | nama spesifik (bukan "sel darah putih" bila yang dimaksud neutrofil), bentuk dan proporsi, bagian yang relevan, ciri pembeda, ukuran relatif (`scale_ref`), detail yang wajib terlihat (`must_show`), yang tidak boleh digambar (`must_not`), `treatment` | ya, untuk setiap benda yang dijelaskan |
| **D. Lingkungan** | `environment` | tempat, struktur sekitar, benda atau makhluk lain di sekitar, hubungan ruang; isi lima lapisan kedalaman; palet dan cahaya | ya |
| **E. Perilaku** | `behavior[]` | apa yang dilakukan subjek, bagaimana bergerak, pemicunya, berinteraksi dengan apa, apa yang berubah, hasilnya | ya, bila ada aksi |
| **F. Komposisi** | `composition` | sudut kamera, letak subjek, latar depan/tengah/belakang, skala dan perspektif, ruang negatif, titik fokus, elemen pendukung | ya |
| **G. Arah animasi** | `animation` | keadaan awal, urutan gerak (boleh terikat kata), gerak kamera, gerak sekunder, transisi keluar, keadaan akhir | ya |
| **H. Dasar fakta** | `claims[]` di subjek dan perilaku, `simplifications[]` | id klaim dari riset yang mendukung gambar, apa yang disederhanakan, apa yang tidak boleh disalahartikan | ya, untuk topik faktual |
| **I. Catatan produksi** | `pattern`, `dimension`, `assets[]`, `notes` | pola komposisi (bagian 6), 2d / 2.5d / 3d, komponen yang dipakai ulang, ilustrasi atau aset baru, batasan | `pattern`, `dimension` ya |

### Art direction (versi 2, wajib untuk siklus baru)
Bidang A sampai I menjawab **apa yang dikomunikasikan**. Bidang di bawah ini menjawab **seperti apa digambar**, supaya animator dan renderer tidak perlu mengarang art direction. Aktif bila `03-visual.json` menulis `"version": 2`.

| Bidang | Untuk | Yang ditulis |
| --- | --- | --- |
| `subjects[].detail_level` | setiap subjek | `L1`, `L2`, atau `L3` (`produksi/STYLE.md` 2.3). Satu sampai dua L1 per scene. |
| `subjects[].silhouette` | L1, L2 | Bentuk luar yang khas, ditulis sebagai bentuk: "atas membulat, dasar rata sedikit cekung, lebih lebar dari tinggi 1,6:1, sedikit miring ke kiri". Tulis juga bedanya dengan subjek lain di frame. |
| `subjects[].proportions` | L1 | Perbandingan bagian: "inti 40% lebar sel", "atap 1/3 tinggi gedung" |
| `subjects[].material` | L1, L2 | `{ "type": "liquid" }` dari tabel material `STYLE.md` 2.4, ditambah `surface` (variasi permukaan, tekstur), `transparency`, `highlight`, dan `notes` |
| `subjects[].details` | L1 | Daftar detail yang wajib digambar, urut menurut pentingnya (bukan hanya `must_show`) |
| `light` | scene | Arah dan warna kunci, warna bayangan, rim (warna dan sisi), sumber cahaya nyata di frame, bayangan kontak yang wajib |
| `environment.landmark` | scene dengan lingkungan | Satu tengara yang dikenali |
| `environment.types` | scene dengan lingkungan | Tipe benda yang membentuk tempat, dengan siluet berbeda (mis. 3 tipe bangunan) |
| `environment.life` | scene dengan lingkungan | 1 sampai 3 kejadian kecil yang membuat dunia hidup |
| `environment.layers` | scene | Isi tiap lapisan, termasuk `mid` (lingkungan tengah) dan geseran warna ke langit |
| `art_refs` | scene | Ciri yang dituju, dirujuk ke resep `REFERENSI-GAYA.md` (`T1`, `T9`, …) dan ditulis sebagai karakteristik ("air distilisasi: nada bertingkat + garis riak putih"), bukan "tiru gambar X" |
| `animation.deformation` | subjek lunak | Bagaimana bentuk berubah saat bergerak (memipih, memanjang, bergoyang teredam) |

**Fakta vs gaya:** `treatment` dan `claims` mengatur kebenaran (bentuk, bagian, proporsi, perilaku). `silhouette`, `material`, `light`, dan `art_refs` mengatur interpretasi gaya. Gaya tidak boleh mengubah fakta. Contohnya, tetes besar tetap memipih (C01), seindah apa pun bentuk lain.

**Empat peran dalam satu scene:**

| Peran | Apa yang ditentukannya | Tempat |
| --- | --- | --- |
| Penulis | Apa yang dikomunikasikan dan fakta pendukungnya | A, B, E, H |
| Art direction (penulis visual) | Apa yang digambar dan seperti apa | C, D, F, bidang versi 2 |
| Animator | Bagaimana bergerak | G, `animation.deformation` |
| Engine | Waktu, kamera, transisi, render | `produksi/PIPELINE.md`, tidak ditulis di scene |

### Syarat detail minimum
- **Subjek**: anatomi ditulis sebagai bagian-bagian yang bisa digambar (bentuk badan, bagian dalam, permukaan, warna dasar), minimal 12 kata, dan `scale_ref` terhadap benda lain di scene.
- **Perilaku**: kata kerja fisik (menggelinding, menempel, memanjang, membungkus), bukan kata kerja abstrak (menyerang, melawan, bekerja).
- **Lingkungan**: minimal lapisan lingkungan dan latar terisi; arah aliran atau gravitasi bila relevan.
- **Animasi**: minimal keadaan awal, satu langkah urutan, dan keadaan akhir.
- Kalimat "tampilkan X" saja **gagal** bila X butuh detail fisik atau perilaku.
- **Versi 2:**
  - Setiap L1 punya `silhouette`, `proportions`, `material`, dan `details`.
  - Setiap scene punya `light` dan `art_refs`.
  - Scene dengan lingkungan punya `landmark`, `types`, dan `life`.
  - "Kota", "bangunan", atau "tangki" tanpa tipe dan siluet dianggap kurang.

| Tidak cukup | Cukup |
| --- | --- |
| "Tampilkan sel darah putih." | "Neutrofil: bulat agak tak beraturan, sekitar 1,5 sampai 2 kali diameter sel darah merah, inti 3 sampai 5 lobus ungu tua tersambung benang tipis terlihat lewat membran tembus, sitoplasma pucat berbintik granula halus." |
| "Tunjukkan bakteri menyerang." | "Gugus kokus bulat kecil (sekitar sepersepuluh diameter neutrofil) menempel di jaringan; tidak berwajah; tidak berduri." |
| "Zoom ke aliran darah." | "Kamera terbang maju di dalam pembuluh, dinding tubular merah muda di tepi kiri-kanan, sel darah merah cakram cekung dua sisi melintas di tiga kedalaman dan berputar pelan." |

## 4. Literal, disederhanakan, metafora

Setiap subjek dan perilaku diberi `treatment`:

| Nilai | Arti | Syarat |
| --- | --- | --- |
| `literal` | digambar sesuai kenyataan (bentuk, bagian, urutan) dengan gaya ilustrasi | didukung klaim `terverifikasi` |
| `simplified` | kenyataan yang disederhanakan (jumlah bagian dikurangi, beberapa tahap digabung, skala waktu dipadatkan) | mekanismenya tetap; apa yang disederhanakan ditulis di `simplifications` |
| `metaphor` | gambar perumpamaan (enzim sebagai gergaji, uang sebagai air) | harus jelas bagi penonton bahwa itu perumpamaan (konteks narasi atau perubahan gaya), dan penjelasan sebenarnya muncul di scene yang sama atau sebelumnya |

Larangan:
- Mengarang anatomi, proporsi, perilaku, atau mekanisme supaya scene lebih menarik.
- Menyamakan subtipe yang berbeda (neutrofil, makrofag, dan limfosit punya struktur dan fungsi berbeda; KRL dan MRT berbeda armadanya).
- Memberi wajah atau emosi pada subjek ilmiah di shot yang sedang menjelaskan mekanismenya secara `literal`.

## 5. Ketertelusuran

```
01-riset-viral.md            03-script.json                 03-visual.json                04-shots.tsx
(tabel klaim C01…) ──────►  scene.sources / labels ──────► subjects[].claims ──────────► komponen scene
                             shots[sentence]               behavior[].claims             (komentar // s03: C04)
```

- Setiap klaim punya id `Cnn` di tabel "Riset fakta" `01-riset-viral.md`.
- Subjek dan perilaku `literal` atau `simplified` merujuk minimal satu klaim.
- Label dan `count` yang memuat angka atau istilah teknis harus didukung klaim di scene itu.
- Klaim berstatus `belum` tidak boleh mendukung `literal`; scene itu dilunakkan, dijadikan `metaphor`, atau dibuang.

## 6. Pola komposisi scene

Pola adalah alat bantu, bukan template wajib. Pilih menurut cerita dan subjek, tulis id-nya di `pattern`. Satu scene boleh menggabungkan dua pola.

**P01 Pembuka lingkungan.**
- Kapan: awal babak atau tempat baru.
- Subjek: tempat (kota, pembuluh, stasiun).
- Komposisi: lebar, lima lapisan, horizon atau arah aliran jelas.
- Kamera: reveal atau dolly keluar pelan.
- Animasi: lingkungan hidup (aliran, lalu lintas, partikel).
- Kesalahan umum: terlalu banyak detail yang bersaing; tidak ada fokus.

**P02 Perkenalan subjek.**
- Kapan: subjek pertama kali disebut.
- Subjek: tokoh atau benda utama.
- Komposisi: subjek di tengah atau sepertiga, ruang negatif luas, latar blur.
- Kamera: dolly masuk ke subjek, lalu focus shift.
- Animasi: subjek masuk bingkai, label di kata namanya, gerak sekunder mulai.
- Kesalahan umum: subjek muncul tanpa skala pembanding; label sebelum kata diucapkan.

**P03 Makro ke mikro.**
- Kapan: penjelasan butuh masuk ke skala kecil.
- Subjek: benda besar → bagian → isi.
- Komposisi: titik masuk ditandai di benda besar.
- Kamera: transisi skala (iris, push-through, dolly besar).
- Animasi: lingkungan skala lama menjadi latar skala baru.
- Kesalahan umum: melompat skala tanpa titik masuk; kehilangan orientasi.

**P04 Potongan (cutaway).**
- Kapan: isi dalam benda penting untuk penjelasan.
- Subjek: pipa, sel, mesin, gedung.
- Komposisi: benda dibelah atau dibuat tembus, bagian dalam berwarna lebih jenuh.
- Kamera: diam atau pan pelan sepanjang potongan.
- Animasi: bagian dalam bergerak, label per bagian di katanya.
- Kesalahan umum: potongan tanpa luar benda sebagai konteks.

**P05 Mekanisme dalam.**
- Kapan: menjelaskan bagaimana sesuatu bekerja.
- Subjek: bagian-bagian yang berinteraksi.
- Komposisi: 2 sampai 4 bagian, jalur gerak jelas.
- Kamera: tracking benda yang sedang bekerja.
- Animasi: urutan langkah sesuai riset, satu langkah per kalimat.
- Kesalahan umum: langkah yang tidak ada di riset; semua bagian bergerak sekaligus.

**P06 Sebab-akibat.**
- Kapan: A menyebabkan B.
- Subjek: pemicu dan hasil.
- Komposisi: kiri (sebab) ke kanan (akibat), atau atas ke bawah.
- Kamera: pan mengikuti rantai.
- Animasi: pemicu aktif (sorotan), lalu akibat terjadi dengan jeda yang terasa.
- Kesalahan umum: akibat terjadi sebelum sebab terlihat.

**P07 Perbandingan.**
- Kapan: dua keadaan, pilihan, atau tebakan lawan kenyataan.
- Subjek: dua versi benda yang sama.
- Komposisi: dua panel (`count: split`), satu perbedaan yang menonjol.
- Kamera: diam atau push ke pemenang.
- Animasi: panel yang salah pudar atau dicoret.
- Kesalahan umum: dua panel berbeda banyak hal sekaligus.

**P08 Garis waktu.**
- Kapan: urutan kejadian dalam waktu.
- Subjek: penanda tahap.
- Komposisi: garis mendatar dengan penanda; posisi sekarang disorot.
- Kamera: pan sepanjang garis.
- Animasi: penanda menyala satu per satu di katanya (`count: timeline`).
- Kesalahan umum: terlalu banyak tanggal; teks panjang di penanda.

**P09 Visualisasi proses.**
- Kapan: alur bertahap (air melewati pengolahan, uang lewat jaringan).
- Subjek: satu benda yang berjalan melewati tahap.
- Komposisi: jalur tetap yang muncul berulang (peta proses).
- Kamera: tracking benda di jalur.
- Animasi: benda berubah keadaan di tiap tahap.
- Kesalahan umum: benda berganti di tiap tahap sehingga penonton kehilangan "tokoh".

**P10 Transformasi.**
- Kapan: benda berubah wujud atau keadaan.
- Subjek: benda yang sama sebelum dan sesudah.
- Komposisi: benda di tengah, latar tenang.
- Kamera: dolly pelan masuk.
- Animasi: morph atau squash; warna berubah sesuai keadaan.
- Kesalahan umum: memotong ke benda baru alih-alih mengubah benda yang sama.

**P11 Data.**
- Kapan: angka penting.
- Subjek: angka yang dibuat bisa dihitung.
- Komposisi: grid titik, benda yang dihitung, atau batang sederhana; satu angka per shot.
- Kamera: diam atau dolly pelan.
- Animasi: hitungan naik (`count`), angka besar di kata angkanya.
- Kesalahan umum: grafik saham generik; angka tanpa satuan atau pembanding.

**P12 Metafora visual.**
- Kapan: konsep abstrak tanpa bentuk fisik.
- Subjek: benda perumpamaan (treatment `metaphor`).
- Komposisi: konsisten dengan jangkar.
- Kamera: mengikuti benda metafora.
- Animasi: perilaku metafora meniru logika konsep.
- Kesalahan umum: metafora yang menggantikan penjelasan; metafora baru di setiap scene.

**P13 Reveal sinematik.**
- Kapan: twist, skala yang mengejutkan, jawaban hook.
- Subjek: konteks yang tadinya tersembunyi.
- Komposisi: mulai sempit, berakhir lebar.
- Kamera: reveal atau mundur besar.
- Animasi: latar depan bergeser keluar, cahaya berubah.
- Kesalahan umum: reveal tanpa persiapan (penonton tidak tahu apa yang tadinya tersembunyi).

**P14 Penutup ringkasan.**
- Kapan: akhir video atau Short.
- Subjek: jangkar atau shot pembuka dengan arti baru.
- Komposisi: sama dengan pembuka, satu perubahan.
- Kamera: menjauh pelan.
- Animasi: callback ke gerak pembuka.
- Kesalahan umum: daftar poin; benda baru di penutup.

## 7. Gate kesiapan visual

Sebelum naskah disetujui untuk produksi, setiap scene dicek (oleh penulis, lalu oleh QA otomatis setelah validator Fase 4 ada):

- [ ] Tujuan naratif jelas (`purpose`).
- [ ] Semua subjek penting disebut dengan nama spesifik dan anatominya cukup untuk digambar.
- [ ] Lingkungan jelas, termasuk apa yang ada di sekitar subjek.
- [ ] Gerak dan interaksi dijelaskan dengan kata kerja fisik.
- [ ] Urutan sebab-akibat bisa diikuti.
- [ ] Metafora dibedakan dari representasi faktual (`treatment`).
- [ ] Klaim faktual didukung riset (`claims` ke tabel riset, status bukan `belum` untuk `literal`).
- [ ] Animator bisa mengerjakan scene tanpa menebak.
- [ ] (versi 2) Ilustrator bisa menggambar subjek L1 tanpa menebak siluet, material, dan cahaya.
- [ ] (versi 2) Lingkungan punya tengara, tipe benda yang bervariasi, dan kejadian kecil.

Gate kualitas **gambar** (still sebelum animasi) ada di `produksi/PIPELINE.md` bagian "Mesin R3" 9; gate di atas hanya menilai kelengkapan spesifikasi.

Mengembalikan scene ke penulis: animator menulis `"needs": "<pertanyaan>"` pada scene itu di `03-visual.json` dan tidak menggambarnya. Penulis menjawab dengan memperbarui bidangnya dan menghapus `needs`. Scene dengan `needs` tidak boleh masuk render penuh.

## 8. Kaitan dengan gaya cerita

| Teknik cerita (`gaya-cerita.md`) | Bentuk visual | Pola |
| --- | --- | --- |
| Pembuka "kamu" di momen kunci | shot pertama memperlihatkan momen itu dari dekat, langsung bergerak | P02 |
| Satu metafora besar | jangkar visual, muncul di fondasi, kembali di penutup | P12, P14 |
| Penanda tahap atau waktu | garis waktu, jam, atau tahun di sudut yang sama | P08, P09 |
| Tebakan dipatahkan | dua panel: tebakan (pudar atau dicoret) lalu yang benar | P07 |
| Mesin insentif | tiap pihak sebagai tokoh berwajah dengan motif yang terlihat | P06 |
| Callback | aset atau komposisi yang sama kembali dengan satu perubahan | P14 |
| Steelman | warna atau suasana berubah, sisi lain ditampilkan setara | P07 |
| Penutup membingkai ulang | kembali ke jangkar atau shot pembuka dengan arti baru | P14 |

## 9. Contoh tingkat detail: neutrofil

Contoh ini menunjukkan tingkat detail yang diminta. Ini bukan naskah produksi; sebelum dipakai, klaim diperiksa ulang ke sumbernya.

**Klaim (bagian "Riset fakta" `01-riset-viral.md`)**

| id | Klaim | Sumber | Status |
| --- | --- | --- | --- |
| C01 | Sel darah merah berbentuk cakram cekung dua sisi, tanpa inti, diameter sekitar 7 sampai 8 µm | [OpenStax A&P 18.3](https://openstax.org/books/anatomy-and-physiology/pages/18-3-erythrocytes), [NCBI NBK539702](https://www.ncbi.nlm.nih.gov/books/NBK539702/) | terverifikasi |
| C02 | Neutrofil berdiameter sekitar 12 sampai 15 µm pada apusan darah, inti 3 sampai 5 lobus | [StatPearls](https://www.statpearls.com/point-of-care/31353), [Univ. Aberdeen](https://abdn.ac.uk/medical/elf/courses/view/126314/a-short-review-of-histology/1/page172) | terverifikasi |
| C03 | Neutrofil matang punya beberapa jenis granula berisi enzim (mis. elastase, mieloperoksidase) | [British Society for Immunology](https://www.immunology.org/public-information/bitesized-immunology/cells/neutrophils) | terverifikasi |
| C04 | Selektin memperantarai leukosit menggelinding di endotel; integrin memperantarai adhesi kuat dan migrasi menembus endotel | [NCBI Bookshelf NBK53380](https://www.ncbi.nlm.nih.gov/books/NBK53380/) | terverifikasi |
| C05 | Integrin LFA-1 dan Mac-1 neutrofil mengikat ICAM-1 di endotel; Mac-1 berperan saat neutrofil merayap di permukaan endotel; transmigrasi melibatkan protein sambungan antar-sel endotel seperti PECAM-1 | [Zarbock & Ley, PMC2851240](https://pmc.ncbi.nlm.nih.gov/articles/PMC2851240/) | terverifikasi |
| C06 | Neutrofil menelan partikel ke dalam fagosom bermembran; granula melebur dengannya membentuk fagolisosom | [British Society for Immunology](https://www.immunology.org/public-information/bitesized-immunology/cells/neutrophils), [Britannica](https://www.britannica.com/science/neutrophil) | terverifikasi |
| C07 | *Staphylococcus aureus* berbentuk kokus (bulat) sekitar 1 µm, bergerombol seperti anggur | (belum dicari) | belum |

**Scene s02: neutrofil keluar dari pembuluh (`03-visual.json`)**
```json
"s02": {
  "purpose": "Menjawab bagaimana sel imun bisa sampai ke jaringan yang terinfeksi padahal ia hanyut di darah.",
  "emphasis": ["roll", "stick", "squeeze"],
  "pattern": ["P05", "P09"],
  "dimension": "2.5d",
  "subjects": [
    { "id": "neutrofil", "name": "neutrofil", "treatment": "literal",
      "anatomy": "badan bulat agak tak beraturan dan lunak, membran tembus pucat; inti 3 sampai 5 lobus ungu tua tersambung benang tipis terlihat di dalam; sitoplasma berbintik granula halus",
      "scale_ref": "1,5 sampai 2 kali diameter sel darah merah",
      "must_show": ["inti berlobus", "granula halus", "badan berubah bentuk saat menempel"],
      "must_not": ["wajah", "duri", "bentuk bulat sempurna dan kaku"],
      "claims": ["C02", "C03"] },
    { "id": "eritrosit", "name": "sel darah merah", "treatment": "literal",
      "anatomy": "cakram merah cekung di kedua sisi, tanpa inti, tepi lebih tebal dari tengah, lentur",
      "scale_ref": "ukuran acuan (1)", "must_not": ["bola", "inti"], "claims": ["C01"] },
    { "id": "endotel", "name": "dinding pembuluh (sel endotel)", "treatment": "simplified",
      "anatomy": "lapisan sel pipih bersusun seperti ubin di sisi bawah layar, sambungan antar-sel terlihat sebagai garis lembut; di bawahnya jaringan berserat",
      "scale_ref": "satu sel endotel kira-kira selebar dua neutrofil", "claims": ["C04", "C05"] }
  ],
  "environment": {
    "setting": "potongan memanjang pembuluh darah kecil di dekat jaringan yang meradang",
    "layers": { "bg": "jaringan berserat kekuningan blur di bawah dinding", "env": "dinding endotel di bawah, plasma tembus di atas", "subject": "neutrofil di dekat dinding", "fg": "sel darah merah blur melintas cepat", "atmos": "partikel halus mengalir kiri ke kanan" },
    "palette": "plasma merah muda pucat, endotel merah muda lebih tua, jaringan krem; neutrofil ungu pucat dengan inti ungu tua",
    "lighting": "cahaya lembut dari kiri atas, rim tipis pada neutrofil"
  },
  "behavior": [
    { "subject": "neutrofil", "action": "melambat lalu menggelinding di permukaan endotel", "trigger": "permukaan endotel di area meradang menjadi lengket", "result": "neutrofil berjalan lebih lambat dari sel darah merah", "treatment": "simplified", "claims": ["C04"] },
    { "subject": "neutrofil", "action": "berhenti dan menempel kuat, badannya memipih", "trigger": "ikatan integrin ke dinding", "result": "neutrofil diam di dinding sementara aliran tetap lewat", "treatment": "simplified", "claims": ["C04", "C05"] },
    { "subject": "neutrofil", "action": "menyelinap di sambungan antar-sel endotel, badan memanjang lalu keluar ke jaringan", "trigger": "sinyal dari jaringan", "result": "neutrofil berada di jaringan di bawah dinding", "treatment": "simplified", "claims": ["C04", "C05"] }
  ],
  "composition": { "camera": "samping, sejajar dinding", "placement": "dinding di sepertiga bawah, neutrofil di sepertiga kiri bergerak ke kanan", "focal": "neutrofil", "negative_space": "plasma di atas dan kanan" },
  "animation": {
    "initial": "aliran sel darah merah cepat kiri ke kanan, neutrofil ikut hanyut di atas dinding",
    "sequence": ["neutrofil turun ke dinding dan mulai menggelinding (kata roll)", "berhenti, memipih, label STICK (kata stick)", "badan memanjang masuk celah sambungan dan keluar di bawah dinding (kata squeeze)"],
    "camera_move": "tracking neutrofil, lalu pan turun mengikutinya ke jaringan",
    "secondary": "membran neutrofil berdenyut kecil, sel darah merah berputar pelan",
    "transition": "wipe ke s03 (pindah tempat: jaringan)",
    "final": "neutrofil di jaringan, dinding utuh di atasnya"
  },
  "simplifications": ["Tiga tahap (menggelinding, menempel, transmigrasi) dipadatkan ke sekitar 6 detik; aslinya berlangsung jauh lebih lama.", "Molekul selektin, integrin, dan ICAM tidak digambar; perubahan 'lengket' ditunjukkan lewat gerak saja.", "Jalur menembus badan sel endotel (bukan sambungan) tidak ditampilkan."],
  "assets": ["neutrofil 2D dengan path lunak dan inti berlobus (baru)", "eritrosit cakram cekung (baru)", "dinding endotel ubin (baru)"]
}
```
Yang dibuat gagal oleh gate pada contoh ini: menggambar bakteri *S. aureus* di s03 sebelum C07 diverifikasi, atau menulis "neutrofil menembus dinding" tanpa tahapan.

## 10. Kontrak dan cek
- Bidang `shots` (per kalimat) dan `03-visual.json` (per scene): `produksi/CONTRACT.md`.
- Cek sebelum diserahkan:
  - [ ] Setiap kalimat punya shot yang menggambarkan isinya; setiap shot punya `motion`.
  - [ ] Label ditulis dengan `word` yang benar-benar ada di kalimatnya.
  - [ ] Jangkar muncul minimal di fondasi, tengah, dan penutup.
  - [ ] Angka penting punya `count` dan klaim.
  - [ ] Setiap scene lulus gate kesiapan visual (bagian 7).
  - [ ] Tanpa papan teks; bubble jarang dan bukan pengulang narasi.
  - [ ] Orang awam bisa menjelaskan ulang prosesnya hanya dari gambar.
