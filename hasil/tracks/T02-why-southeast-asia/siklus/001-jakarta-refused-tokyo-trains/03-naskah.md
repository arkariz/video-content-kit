# Naskah: siklus 001-jakarta-refused-tokyo-trains (T02, uji-V2 variasi A)

Status: **disetujui kreator 2026-11-25.** Sumber tunggal untuk produksi adalah `03-script.json`; file ini versi baca.

- **Janji:** After watching, you can explain why Jakarta could run Tokyo's retired trains for 25 years without rebuilding its tracks, and why a 20-year import age limit ended that in November 2026.
- **Hook (s01):** This train used to carry commuters in Tokyo. Jakarta still runs hundreds of cars like it, and in November it refused to buy any more.
- **Panjang:** 58 scene, 1437 kata EN, 1271 kata ID. Perkiraan durasi master sekitar 8:41 (0,33 detik per kata + jeda pipeline); angka pasti setelah TTS, syarat ≥ 8:00.
- **Judul:** (1) Jakarta Just Refused Tokyo's Old Trains. Here's Why · (2) Why Jakarta Runs on Tokyo's Retired Trains, and Why That Just Ended · (3) Tokyo's Old Trains Are Now Too Old for Jakarta
- **Teks thumbnail:** TOO OLD TO IMPORT · TOKYO'S TRAINS, REJECTED

## Skor anti-slop (lapisan Teks)

Dinilai manual (dinilai ulang setelah revisi s02, s03, s12, s47: skor tidak berubah, tanpa pola terlarang menurut cek regex) dengan `skills/video-anti-slop/references/spoken-script-rules.md`, `pola-slop-indonesia.md`, dan pola yang diperiksa `scripts/pipeline/qa.mjs`. Ini penilaian penulis naskah, bukan QA final; langkah 06 tetap wajib.

| Bahasa | Directness | Rhythm | Trust | Authenticity | Density | Total | Lulus (≥35) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EN | 8 | 7 | 9 | 7 | 8 | **39** | ya |
| ID | 8 | 7 | 9 | 7 | 7 | **38** | ya |

Yang sudah diperbaiki saat baca ulang: "this month" di hook (salah setelah tayang 7 Des) diganti "in November"; "most countries" dilunakkan jadi "many countries"; pengulangan "1940s" dan "this year's" dibuang; s35 tidak lagi mencampur jumlah perjalanan dengan persentase pertumbuhan; s36 klaim "jumlah kereta yang sama" (tanpa sumber) diganti selisih yang bisa dihitung; s44 lama ("bagian yang menurut saya paling menarik") diganti karena klaim orang pertama dengan suara sintetis.

Cek otomatis: tanpa em dash, tanpa kontras "not just", tanpa frasa slop ID dari daftar, pembuka tanpa basa-basi. Tanpa bubble dan papan teks (gaya diorama): angka menempel pada benda sebagai callout.

Sisa risiko yang tercatat: Rhythm 7 karena banyak kalimat dua klausa dengan panjang mirip di babak 3; s03 adalah peta tiga bagian (struktur, bukan triad hiasan) dan s52 memakai satu metafora "jendela". Dua-duanya dipertahankan, kreator boleh memotong.

## Gaya visual: diorama 2.5D

Sejak 2026-11-25 semua siklus wajib diorama (`instruksi/referensi/gaya-diorama.md`). Visual naskah ini sudah dikonversi: satu `world` (Tokyo, laut, Jakarta, Jawa Timur, Tiongkok), kamera berpindah tiap scene, angka menempel pada benda, tanpa bubble dan papan teks. Footage milik kreator tetap di atas dunia pada 12 scene. Detail dunia dan anggaran konsep ada di `02-brief.md`. Pratinjau visual belum bisa dibuat di sesi ini (Remotion belum terpasang); `build-visual.mjs --check` dan `check_kit.py` lolos.

**Fondasi dulu (revisi 2026-11-25):** s02 memperkenalkan analogi baju bekas turunan (cocok ukurannya, masih ada umur pakainya), s03 memperkenalkan empat pemain (KAI, pemerintah, INKA, CRRC), dan analogi dipanggil lagi di s12 (ukuran rel) dan s47 (umur pakai). Penambahan sekitar 70 kata.

## Struktur

| Babak | Scene | Mulai (perkiraan) | Isi |
| --- | --- | --- | --- |
| Hook | s01–s03 | 0:00 | Kereta Tokyo di Jakarta, ditolak November 2026 |
| 1. Kenapa cocok | s04–s19 | 0:25 | Hibah 2000, harga sepersepuluh, lebar rel 1.067 mm dan 1.500 V DC, 908 gerbong berumur 34–41 tahun |
| 2. Upaya 2023 | s20–s29 | 2:56 | Impor E217 ditolak, kereta baru CRRC dan INKA, tiga seri tertua pensiun |
| 3. Pabrik dan kepadatan | s30–s39 | 4:19 | INKA 7 dari 16, penumpang +11%, butuh 105 punya 102 |
| 4. Sept–Nov 2026 | s40–s52 | 5:37 | DPR setuju 23 rangkaian, batas umur 20 tahun vs kereta 25–28 tahun, dibatalkan 5 Nov |
| 5. Berikutnya | s53–s58 | 7:22 | INKA dan perpanjangan umur, 84 rangkaian diganti, CTA ke video Jawa |

Re-hook: s11 (1:26), s20 (2:56), s30 (4:19), s40 (5:37), s50 (6:57). Payoff: s56, s57. CTA: s58.

## Bukti milik kreator

- s01 (0:00): Footage milik kreator: interior KRL eks JR East 205 dengan tulisan Jepang → `produksi/footage-own/T02/krl-01.mp4`
- s02 (0:08): Footage milik kreator: rangkaian eks Jepang masuk peron → `produksi/footage-own/T02/krl-02.mp4`
- s11 (1:26): Footage milik kreator: rel dan kabel aliran atas dari jendela → `produksi/footage-own/T02/krl-05.mp4`
- s31 (4:25): Footage milik kreator: rangkaian CRRC baru di lintas Bogor → `produksi/footage-own/T02/krl-04.mp4`
- s45 (6:14): Sumber berbahasa Indonesia (Bisnis, Katadata, detik, Liputan6, MetroTV, CNBC Indonesia) yang belum dipakai video berbahasa Inggris tentang topik ini

Footage milik kreator pertama di 0:00 dan s11 di 1:26, jauh sebelum 30% durasi (2:31). Daftar file yang harus direkam ada di `02-brief.md`.

## Potongan Shorts

- **A1-why-tokyo-trains-fit** (s01, s08, s12, s14, s15), sekitar 43 detik. Hook: "Why Jakarta's trains still have Japanese writing inside."
- **A2-too-old-to-import** (s42, s45, s46, s49, s51), sekitar 35 detik. Hook: "Jakarta wanted Tokyo's old trains again. A rule said no."

## Pelafalan

- Sifang: Si-fahng
- Sengaja tanpa `say_as` untuk INKA, CRRC, Bogor, Cikarang (pelajaran QA T01 T2). Dengarkan kemunculan pertama setelah TTS.

## Naskah per scene

### s01 · hook · 0:00

**EN:** This train used to carry commuters in Tokyo. Jakarta still runs hundreds of cars like it, and in November it refused to buy any more.

**ID:** Kereta ini dulu mengangkut penumpang di Tokyo. Jakarta masih menjalankan ratusan gerbong seperti ini, dan November lalu Jakarta menolak membeli lagi.

*Visual:* footage kreator `krl-01.mp4`. Footage milik kreator: interior KRL eks JR East 205, stiker dan tulisan Jepang di dinding gerbong · teks layar: "Filmed on Jakarta's commuter line, Nov 2026"

*Sumber:* [KAI memastikan tidak mengimpor KRL bekas Jepang (5 Nov 2026)](https://finance.detik.com/infrastruktur/d-8740270/impor-krl-bekas-akhirnya-batal)

### s02 · context · 0:08

**EN:** The reason it came here is simple, and it works like hand-me-down clothes. They only fit if the size matches, and they only help while there's life left in them. The reason it stopped is a rule about age.

**ID:** Alasan kereta ini datang ke sini sederhana, dan cara kerjanya seperti baju bekas turunan. Baju itu hanya cocok kalau ukurannya sama, dan hanya berguna selama masih ada umur pakainya. Alasan berhentinya adalah aturan soal umur.

*Visual:* footage kreator `krl-02.mp4`. Footage milik kreator: rangkaian eks Jepang masuk peron

### s03 · context · 0:17

**EN:** Four players run this story. KAI, the state railway behind the commuter trains. The government, which sets the import rules. INKA, Indonesia's own train builder. And CRRC, a Chinese maker of new trains. We'll cover why Tokyo's trains fit Jakarta, why the deal worked for twenty-five years, and why it ended in November 2026.

**ID:** Ada empat pemain dalam cerita ini. KAI, perusahaan kereta api negara di balik KRL. Pemerintah, yang menetapkan aturan impor. INKA, pembuat kereta dalam negeri. Dan CRRC, pembuat kereta baru dari Tiongkok. Kita bahas kenapa kereta Tokyo cocok untuk Jakarta, kenapa kesepakatan itu bertahan dua puluh lima tahun, dan kenapa berakhir November 2026.

*Visual:* diorama 2.5D. peta dunia, empat pemain disorot berurutan: KAI, pemerintah, INKA, CRRC

*Bubble:* "I've heard this story."

### s04 · body · 0:25

**EN:** It started with a gift. In May 2000, Japan's aid agency and the Tokyo city government donated seventy-two used subway cars from Tokyo's Mita Line.

**ID:** Semuanya dimulai dari hibah. Mei 2000, badan bantuan Jepang dan pemerintah kota Tokyo memberi tujuh puluh dua gerbong kereta bawah tanah bekas dari jalur Mita di Tokyo.

*Visual:* diorama 2.5D. kamera ke tokyo; 72 CARS

*Bubble:* "Is it always this warm?"

*Sumber:* [Mei 2000, Jepang lewat JICA dan Pemerintah Metropolitan Tokyo menghibahkan 72 unit Toei 6000 bekas jalur Mita](https://en.wikipedia.org/wiki/KRL_Commuterline)

### s05 · body · 0:34

**EN:** Those cars were built from 1968. Tokyo retired them after about thirty years of service, and Jakarta kept them running until 2016.

**ID:** Gerbong itu dibuat mulai 1968. Tokyo memensiunkannya setelah sekitar tiga puluh tahun, dan Jakarta masih menjalankannya sampai 2016.

*Visual:* diorama 2.5D. kamera ke t_old; BUILT 1968, RAN TO 2016

*Bubble:* "Retirement? Never heard of it."

*Sumber:* [Toei 6000 beroperasi di jalur Mita 1968-1999, di KCI 2000-2016](https://en.wikipedia.org/wiki/KRL_Commuterline); [Toei 6000 mulai beroperasi di Jepang 1968, dipensiunkan setelah 32 tahun](https://katadata.co.id/berita/2019/08/21/candu-impor-kereta-bekas-jepang)

### s06 · body · 0:42

**EN:** They were the first air-conditioned electric trains in Indonesia. At the time, crowded riders hung out of open doors or sat on the roof.

**ID:** Itu kereta listrik ber-AC pertama di Indonesia. Waktu itu, penumpang yang berjejal bergelantungan di pintu terbuka, bahkan duduk di atap.

*Visual:* diorama 2.5D. kamera ke t_old; FIRST A/C

*Bubble:* "Wait, it's cold in here?"

*Sumber:* [Toei 6000 adalah kereta listrik ber-AC pertama di Indonesia](https://en.wikipedia.org/wiki/KRL_Commuterline); [Sebelum itu banyak penumpang duduk di atap karena gerbong terlalu padat](https://katadata.co.id/berita/2019/08/21/candu-impor-kereta-bekas-jepang)

### s07 · body · 0:50

**EN:** Then Jakarta started buying them. In 2014, the operator said a used car from Japan cost eight hundred million to one billion rupiah.

**ID:** Lalu Jakarta mulai membeli. Tahun 2014, operatornya bilang satu gerbong bekas dari Jepang harganya delapan ratus juta sampai satu miliar rupiah.

*Visual:* footage stok: jakarta commuter train, indonesia electric train station. Footage stok: KRL di Jakarta · teks layar: "Used car from Japan: Rp 0.8 to 1 bn (2014)"

*Sumber:* [KCJ 2014: kereta bekas dari Jepang Rp800 juta sampai Rp1 miliar per unit, kereta baru Rp10 sampai 12 miliar](https://ekonomi.republika.co.id/berita/ng0apv/impor-kereta-demi-tarif-murah)

### s08 · body · 0:59

**EN:** A new car cost ten to twelve billion. Same seats, same doors, about one tenth of the price.

**ID:** Gerbong baru sepuluh sampai dua belas miliar. Kursinya sama, pintunya sama, harganya kira-kira sepersepuluh.

*Visual:* diorama 2.5D. kamera ke peta; Rp10-12 BN, 1/10 PRICE

*Bubble:* "I'll take ten."

*Sumber:* [Kereta baru Rp10 sampai 12 miliar, bekas Rp800 juta sampai Rp1 miliar (2014)](https://ekonomi.republika.co.id/berita/ng0apv/impor-kereta-demi-tarif-murah)

### s09 · body · 1:05

**EN:** Indonesia's own train maker, INKA, quoted about one point three million dollars for a new car in 2019. Even after shipping, a used car was about one ninth of that price.

**ID:** Pabrik kereta Indonesia sendiri, INKA, mematok sekitar satu koma tiga juta dolar per gerbong baru di 2019. Bahkan setelah ongkos kirim, gerbong bekas harganya kira-kira sepersembilan dari itu.

*Visual:* diorama 2.5D. kamera ke inka; $1.3M NEW, 1/9 PRICE

*Sumber:* [Dirut INKA 2019: kereta bekas Jepang sekitar Rp2 miliar, kereta INKA sekitar US$1,3 juta](https://finance.detik.com/read/2019/08/19/161619/4671967/1036/ri-bisa-bikin-krl-tapi-kok-impor-yang-bekas-dari-jepang); [Kereta bekas Jepang sekitar Rp2 miliar termasuk ongkos kirim, INKA sekitar Rp18 miliar](https://finance.detik.com/read/2019/08/19/161619/4671967/1036/ri-bisa-bikin-krl-tapi-kok-impor-yang-bekas-dari-jepang)

### s10 · body · 1:16

**EN:** For Japan, the deal was just as good. Scrapping a train costs money. Shipping it to Jakarta cost less, and somebody else would keep using it.

**ID:** Untuk Jepang, ini juga untung. Membuang kereta itu mahal. Mengirimnya ke Jakarta lebih murah, dan keretanya tetap dipakai orang lain.

*Visual:* diorama 2.5D. kamera ke tokyo; SCRAP COSTS, RE-USED

*Bubble:* "Next stop, Tanjung Priok."

*Sumber:* [Di Jepang, membuang barang bekas pun ongkosnya mahal](https://katadata.co.id/berita/2019/08/21/candu-impor-kereta-bekas-jepang)

### s11 · rehook · 1:26

**EN:** But price alone doesn't explain it. In many countries, a train from Tokyo can't run without major changes. In Jakarta, it can.

**ID:** Tapi harga saja tidak cukup menjelaskan. Di banyak negara, kereta dari Tokyo tidak bisa jalan tanpa diubah besar-besaran. Di Jakarta, bisa.

*Visual:* footage kreator `krl-05.mp4`. Footage milik kreator: rel dan kabel listrik aliran atas dari jendela kereta

### s12 · body · 1:34

**EN:** The first size that matches is the rails. Japan's regular lines and Java's lines are both one thousand and sixty-seven millimetres apart. Change the rail width and you need new wheels, new axles, often a new train.

**ID:** Ukuran pertama yang cocok adalah relnya. Jalur kereta biasa di Jepang dan jalur di Jawa sama-sama seribu enam puluh tujuh milimeter. Kalau lebar relnya beda, roda dan as harus diganti, sering kali keretanya juga.

*Visual:* diorama 2.5D. kamera ke tokyo; 1,067 MM, 1,067 MM

*Bubble:* "Measured twice."

*Sumber:* [Jalur konvensional Jepang 1.067 mm; Indonesia sama; Eropa, China 1.435 mm atau lebih](https://www.newsweekjapan.jp/articles/-/21721?page=1); [Lebar rel utama Indonesia 1.067 mm](https://en.wikipedia.org/wiki/Rail_transport_in_Indonesia)

### s13 · body · 1:47

**EN:** That match has a history. Java's first railway, in 1867, was built wider. During the Japanese occupation in the 1940s, the remaining wide lines on Java were converted to the narrower Japanese width. That is a big reason a Tokyo train fits Java's rails today.

**ID:** Kesamaan ini ada sejarahnya. Jalur kereta pertama di Jawa, tahun 1867, dibangun lebih lebar. Saat pendudukan Jepang tahun 1940-an, jalur lebar yang tersisa di Jawa diubah ke lebar rel Jepang yang lebih sempit. Itu alasan besar kereta Tokyo pas di rel Jawa sekarang.

*Visual:* diorama 2.5D. kamera ke kota; 1867 WIDE, 1940s NARROW

*Sumber:* [Rel pertama 1867 memakai 1.435 mm; saat pendudukan Jepang dikonversi ke 1.067 mm](https://en.wikipedia.org/wiki/Rail_transport_in_Indonesia); [Lebar rel Indonesia diseragamkan oleh Jepang saat Perang Dunia II](https://www.newsweekjapan.jp/articles/-/21721?page=1)

### s14 · body · 2:02

**EN:** The power matches too. Jakarta's electric line opened in 1925 on fifteen hundred volts DC, the same system the 205 series was built for in Tokyo.

**ID:** Listriknya juga cocok. Jalur listrik Jakarta dibuka tahun 1925 dengan seribu lima ratus volt DC, sistem yang sama dengan rancangan seri 205 di Tokyo.

*Visual:* diorama 2.5D. kamera ke tokyo; 1925: 1,500 V, 205: 1,500 V

*Bubble:* "Feels like home."

*Sumber:* [Jalur listrik Jakarta selesai 1924-1925 dengan 1.500 V DC aliran atas](https://en.wikipedia.org/wiki/KRL_Commuterline); [Seri 205 (komuter Tokyo) memakai 1.500 V DC aliran atas](https://en.wikipedia.org/wiki/205_series)

### s15 · body · 2:12

**EN:** Same rails, same power. A Tokyo train arrives by ship, gets new signs and checks, and goes into service with no rebuilding of the tracks.

**ID:** Rel sama, listrik sama. Kereta Tokyo datang naik kapal, diganti tandanya dan diperiksa, lalu langsung dipakai tanpa membongkar rel.

*Visual:* diorama 2.5D. kamera ke jkt; NEW SIGNS

*Bubble:* "No new rails needed."

*Sumber:* [Gerbong eks Jepang diturunkan di Pelabuhan Tanjung Priok lalu dirangkai](https://rmol.id/read/2012/05/16/64003/atap-berkarat-gerbong-penuh-poster-iklan)

### s16 · body · 2:21

**EN:** So Jakarta kept buying. In 2012, the operator planned to bring in one hundred and forty cars that year, and aimed for fourteen hundred and forty cars by 2019.

**ID:** Jadi Jakarta terus membeli. Tahun 2012, operatornya menargetkan seratus empat puluh gerbong tahun itu, dan seribu empat ratus empat puluh gerbong di 2019.

*Visual:* diorama 2.5D. kamera ke jkt; 2012: 140, 2019: 1,440

*Bubble:* "More trains, fewer roofs."

*Sumber:* [KCJ 2012 menargetkan 140 unit tahun itu dan 1.440 kereta pada 2019](https://rmol.id/read/2012/05/16/64003/atap-berkarat-gerbong-penuh-poster-iklan)

### s17 · body · 2:31

**EN:** The biggest batch came later. JR East's 205 series, a Tokyo commuter train first built in 1985, started running in Jakarta in 2013.

**ID:** Gelombang terbesar datang belakangan. Seri 205 milik JR East, kereta komuter Tokyo yang pertama dibuat tahun 1985, mulai jalan di Jakarta tahun 2013.

*Visual:* diorama 2.5D. kamera ke t_old; 2013

*Bubble:* "Window seat, please."

*Sumber:* [Seri 205 diperkenalkan JNR 1985, dioperasikan KAI Commuter sejak 2013](https://en.wikipedia.org/wiki/205_series)

### s18 · body · 2:39

**EN:** Today the backbone is still Japanese. Seven hundred and eighty cars came from JR East's 205 series, and one hundred and twenty-eight from Tokyo Metro.

**ID:** Sampai sekarang tulang punggungnya masih Jepang. Tujuh ratus delapan puluh gerbong dari seri 205 milik JR East, dan seratus dua puluh delapan dari Tokyo Metro.

*Visual:* diorama 2.5D. kamera ke t_old; 780 JR EAST, 128 METRO

*Sumber:* [Masih beroperasi 780 unit JR East 205 dan 128 unit Tokyo Metro 6000 (Juli 2026)](https://ekonomi.bisnis.com/read/20260713/98/1987706/kai-sebut-18-krl-baru-siap-beroperasi-9-rangkaian-pensiun-tahun-ini)

### s19 · body · 2:48

**EN:** Those cars are thirty-four to forty-one years old. Many of them started work in Tokyo before the Berlin Wall fell.

**ID:** Umur gerbong itu tiga puluh empat sampai empat puluh satu tahun. Banyak yang mulai bekerja di Tokyo sebelum Tembok Berlin runtuh.

*Visual:* diorama 2.5D. kamera ke t_old; 34-41 YEARS

*Bubble:* "My knees, though."

*Sumber:* [Usia JR East 205 dan Tokyo Metro 6000: 34 sampai 41 tahun](https://ekonomi.bisnis.com/read/20260713/98/1987706/kai-sebut-18-krl-baru-siap-beroperasi-9-rangkaian-pensiun-tahun-ini)

### s20 · rehook · 2:56

**EN:** A fleet that old needs replacing, and passenger numbers kept rising. The first attempt to replace it with more Tokyo trains came in 2023, and it was blocked.

**ID:** Armada setua itu harus diganti, dan jumlah penumpang terus naik. Upaya pertama menggantinya dengan kereta Tokyo lagi terjadi di 2023, dan ditolak.

*Visual:* diorama 2.5D. kamera ke gov; BLOCKED 2023

### s21 · body · 3:06

**EN:** The operator asked to import three hundred and forty-eight used cars of a newer Japanese model, the E217, for 2023 and 2024.

**ID:** Operatornya minta izin impor tiga ratus empat puluh delapan gerbong bekas model Jepang yang lebih baru, E217, untuk 2023 dan 2024.

*Visual:* diorama 2.5D. kamera ke tokyo; 348 CARS

*Bubble:* "Just a few more?"

*Sumber:* [KCI mengajukan impor 120 unit KRL tipe E217 untuk 2023 dan 228 unit untuk 2024](https://www.cnbcindonesia.com/news/20230303072844-4-418508/impor-krl-bekas-jepang-berpolemik-ini-biang-keroknya)

### s22 · body · 3:14

**EN:** The government said no. The cars stayed in Japan. Officials chose to refit old trains and buy new ones instead.

**ID:** Pemerintah menolak. Gerbongnya tetap di Jepang. Sebagai gantinya, kereta lama diperbarui dan kereta baru dibeli.

*Visual:* diorama 2.5D. kamera ke gov; NO

*Sumber:* [2023 pemerintah menolak impor KRL bekas Jepang, memilih retrofit KRL lama dan pengadaan KRL baru](https://www.metrotvnews.com/play/NxGCXq5a-dulu-ditolak-kini-indonesia-mau-impor-krl-bekas-dari-jepang)

### s23 · body · 3:21

**EN:** New trains came from two places. A Chinese maker, CRRC Sifang, and INKA in East Java.

**ID:** Kereta baru datang dari dua tempat. Pabrikan China, CRRC Sifang, dan INKA di Jawa Timur.

*Visual:* diorama 2.5D. kamera ke peta; CHINA, EAST JAVA

*Sumber:* [Total pemesanan: 16 trainset INKA dan 11 trainset CRRC Qingdao Sifang](https://www.liputan6.com/bisnis/read/6007403/kai-commuter-kembali-terima-2-krl-baru-dari-china)

### s24 · body · 3:27

**EN:** INKA also took a contract to refit nineteen of the old trains, so they could keep running while the new ones were built.

**ID:** INKA juga mendapat kontrak memperbarui sembilan belas rangkaian lama, supaya tetap bisa jalan selama kereta baru dibuat.

*Visual:* diorama 2.5D. kamera ke inka; REFIT 19

*Bubble:* "New paint, same knees."

*Sumber:* [KAI Commuter melakukan peremajaan atau retrofit 19 rangkaian KRL oleh PT INKA](https://berkas.dpr.go.id/pusaka/files/isu_sepekan/Isu Sepekan---I-PUSLIT-Februari-2024-228.pdf)

### s25 · body · 3:36

**EN:** In January 2024, the operator signed for three Chinese trains. The contract was seven hundred and eighty-three billion rupiah, about two hundred and sixty-one billion per train.

**ID:** Januari 2024, operatornya meneken kontrak tiga rangkaian dari China. Nilainya tujuh ratus delapan puluh tiga miliar rupiah, sekitar dua ratus enam puluh satu miliar per rangkaian.

*Visual:* diorama 2.5D. kamera ke crrc; 3 TRAINS, Rp783 BN

*Bubble:* "That's a lot of zeros."

*Sumber:* [KCI membeli 3 trainset KCI-SFC120-V seharga Rp783 miliar, Rp261 miliar per trainset (31 Jan 2024)](https://ekonomi.bisnis.com/read/20240201/98/1737487/perbandingan-impor-krl-dari-china-dan-jepang-siapa-lebih-mahal)

### s26 · body · 3:45

**EN:** The new trains are longer. Each one has twelve cars and can carry about three thousand four hundred people per trip.

**ID:** Kereta barunya lebih panjang. Tiap rangkaian berisi dua belas gerbong dan bisa mengangkut sekitar tiga ribu empat ratus orang sekali jalan.

*Visual:* diorama 2.5D. kamera ke t_new; 12 CARS, 3,400 RIDERS

*Bubble:* "Finally, legroom. Kind of."

*Sumber:* [Rangkaian CRRC 12 gerbong, kapasitas 1 rangkaian sekitar 3.400 penumpang sekali jalan](https://finance.detik.com/infrastruktur/d-7943442/krl-made-in-china-resmi-operasi-punya-banyak-fitur-baru)

### s27 · body · 3:53

**EN:** Compare that with the old deal. Twelve used cars from Japan once cost about twelve billion. One new twelve-car train cost around twenty times as much.

**ID:** Bandingkan dengan cara lama. Dua belas gerbong bekas Jepang dulu sekitar dua belas miliar. Satu rangkaian baru berisi dua belas gerbong harganya kira-kira dua puluh kali lipat.

*Visual:* diorama 2.5D. kamera ke peta; ~Rp12 BN, 20x

*Bubble:* "Told you I was a bargain."

*Sumber:* [Gerbong bekas Rp800 juta sampai Rp1 miliar (2014)](https://ekonomi.republika.co.id/berita/ng0apv/impor-kereta-demi-tarif-murah); [Rp261 miliar per trainset CRRC](https://ekonomi.bisnis.com/read/20240201/98/1737487/perbandingan-impor-krl-dari-china-dan-jepang-siapa-lebih-mahal); [KCI-SFC120-V masing-masing terdiri dari 12 gerbong](https://berkas.dpr.go.id/pusaka/files/isu_sepekan/Isu Sepekan---I-PUSLIT-Februari-2024-228.pdf)

### s28 · body · 4:02

**EN:** New trains fix one problem: age. In November 2025, three of the oldest Japanese series retired, some of them close to fifty years old.

**ID:** Kereta baru menyelesaikan satu masalah: umur. November 2025, tiga seri Jepang tertua pensiun, sebagian umurnya hampir lima puluh tahun.

*Visual:* diorama 2.5D. kamera ke t_old; NOV 2025, ~50 YEARS

*Bubble:* "Finally, a pension."

*Sumber:* [Nov 2025: KRL seri 8500, 7000, dan 203 resmi pensiun, sebagian berusia hingga 50 tahun](https://rri.co.id/en/archipelago/1967107/jakarta-s-legendary-krl-trains-retired-after-decades-of-service)

### s29 · body · 4:11

**EN:** Their driver cabins are going on display at Jakarta Kota station. Jakarta gave its second-hand trains a retirement ceremony.

**ID:** Kabin masinisnya akan dipajang permanen di Stasiun Jakarta Kota. Jakarta memberi kereta bekasnya upacara pensiun yang layak.

*Visual:* diorama 2.5D. kamera ke kota; ON DISPLAY

*Bubble:* "I'll miss the creaks."

*Sumber:* [Bagian kabin masinis ketiga seri dipajang permanen di Stasiun Jakarta Kota](https://rri.co.id/en/archipelago/1967107/jakarta-s-legendary-krl-trains-retired-after-decades-of-service)

### s30 · rehook · 4:19

**EN:** So the plan was new trains from China and from INKA. The weak point was INKA's factory.

**ID:** Jadi rencananya kereta baru dari China dan dari INKA. Titik lemahnya ada di pabrik INKA.

*Visual:* diorama 2.5D. kamera ke inka; WEAK POINT

*Sumber:* [Pesanan 16 trainset INKA dan 11 trainset CRRC](https://www.liputan6.com/bisnis/read/6007403/kai-commuter-kembali-terima-2-krl-baru-dari-china)

### s31 · body · 4:25

**EN:** All eleven Chinese trains are running, mostly on the Bogor and Cikarang lines. This footage is from November 2026: a Chinese train on the Bogor line, sharing the tracks with the old Japanese ones.

**ID:** Kesebelas rangkaian China sudah beroperasi, kebanyakan di lintas Bogor dan Cikarang. Footage ini dari November 2026: kereta China di lintas Bogor, berbagi rel dengan kereta Jepang yang lama.

*Visual:* footage kreator `krl-04.mp4`. Footage milik kreator: rangkaian CRRC baru di lintas Bogor · teks layar: "CRRC Sifang train, Bogor line (filmed Nov 2026)"

*Sumber:* [11 rangkaian CRRC sudah dioperasikan untuk Bogor Line dan Cikarang Line](https://finance.detik.com/infrastruktur/d-8571647/kai-buka-bukaan-18-krl-baru-sudah-beroperasi)

### s32 · body · 4:37

**EN:** INKA was expected to build eight trains a year. It delivered two to three.

**ID:** INKA diproyeksikan membuat delapan rangkaian setahun. Yang terwujud dua sampai tiga.

*Visual:* diorama 2.5D. kamera ke inka; PLAN 8/YR, REAL 2-3

*Bubble:* "Working on it."

*Sumber:* [Proyeksi INKA 8 trainset per tahun, realisasi 2 sampai 3 trainset per tahun](https://www.metrotvnews.com/play/NxGCXq5a-dulu-ditolak-kini-indonesia-mau-impor-krl-bekas-dari-jepang)

### s33 · body · 4:42

**EN:** By September 2026, seven of the sixteen INKA trains were in service. That left nine trains the network was counting on, still not carrying anyone.

**ID:** Sampai September 2026, baru tujuh dari enam belas rangkaian INKA yang beroperasi. Artinya masih ada sembilan rangkaian yang diandalkan, tapi belum mengangkut siapa pun.

*Visual:* diorama 2.5D. kamera ke inka; 7 OF 16, 9 IDLE

*Sumber:* [Baru 7 dari 16 EMU iE305 INKA yang beroperasi](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/); [Hingga September 2026 baru 7 rangkaian yang beroperasi](https://www.metrotvnews.com/play/NxGCXq5a-dulu-ditolak-kini-indonesia-mau-impor-krl-bekas-dari-jepang)

### s34 · body · 4:51

**EN:** Meanwhile the trains got more crowded. Ridership in the first half of 2026 was up about eleven percent on a year earlier.

**ID:** Sementara itu kereta makin padat. Jumlah penumpang semester pertama 2026 naik sekitar sebelas persen dibanding tahun sebelumnya.

*Visual:* footage kreator `krl-03.mp4`. Footage milik kreator: peron saat jam sibuk, diambil dari belakang (tanpa wajah dekat)

*Sumber:* [Penumpang komuter KAI naik 11,3% year-on-year di semester I 2026](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/)

### s35 · body · 4:59

**EN:** That's about one point one million trips a day. The operator had planned for three to four percent growth, not eleven.

**ID:** Itu sekitar satu koma satu juta perjalanan per hari. Operatornya merencanakan pertumbuhan tiga sampai empat persen, bukan sebelas.

*Visual:* diorama 2.5D. kamera ke jkt; 1.1M / DAY, PLAN +3-4%

*Bubble:* "Is there room for my bag?"

*Sumber:* [Ridership harian sekitar 1,1 juta](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/); [Pertumbuhan 11,5% semester I 2026, jauh di atas proyeksi awal 3 sampai 4%](https://investortrust.id/business/121803/kai-scraps-plan-to-import-used-japanese-commuter-trains-prioritizes-domestic-fleet)

### s36 · body · 5:07

**EN:** On the busiest days, the count can reach one point three million. That's two hundred thousand more trips than an ordinary day.

**ID:** Di hari tersibuk, jumlahnya bisa mencapai satu koma tiga juta. Itu dua ratus ribu perjalanan lebih banyak dari hari biasa.

*Visual:* footage stok: crowded train platform commuters, rush hour train station asia. Footage stok: peron padat jam sibuk (tanpa wajah dekat) · teks layar: "Busiest days: up to 1.3 million trips"

*Sumber:* [1,1 juta penumpang per hari; pada hari tertentu bisa 1,3 juta](https://www.metrotvnews.com/play/NxGCXq5a-dulu-ditolak-kini-indonesia-mau-impor-krl-bekas-dari-jepang); [Pertumbuhan jauh melampaui proyeksi awal 3 sampai 4 persen](https://investortrust.id/business/121803/kai-scraps-plan-to-import-used-japanese-commuter-trains-prioritizes-domestic-fleet)

### s37 · body · 5:15

**EN:** The operator calculated it needs one hundred and five trains. It has one hundred and two.

**ID:** Operatornya menghitung butuh seratus lima rangkaian. Yang tersedia seratus dua.

*Visual:* diorama 2.5D. kamera ke kota; NEED 105, HAVE 102

*Bubble:* "Three short."

*Sumber:* [Operator memperkirakan butuh 105 rangkaian, tersedia 102](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/)

### s38 · body · 5:21

**EN:** And the gap was about to grow. Thirteen former Tokyo Metro trains were due to retire this year.

**ID:** Dan kekurangannya akan membesar. Tiga belas rangkaian eks Tokyo Metro dijadwalkan pensiun tahun ini.

*Visual:* diorama 2.5D. kamera ke t_metro; 13 RETIRE

*Sumber:* [13 rangkaian eks Tokyo Metro seri 6000 akan ditarik tahun ini](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/)

### s39 · body · 5:27

**EN:** A new train takes one to two years from order to delivery. An order signed in January 2026 would arrive in 2027 at the earliest.

**ID:** Kereta baru butuh satu sampai dua tahun dari pesan sampai datang. Pesanan yang diteken Januari 2026 paling cepat baru datang di 2027.

*Visual:* diorama 2.5D. kamera ke peta; 1-2 YEARS, 2027+

*Bubble:* "I needed it yesterday."

*Sumber:* [Kereta baru butuh satu sampai dua tahun sejak dipesan](https://afu.id/ekonomi/dirut-kai-batalkan-impor-23-krl-bekas-jepang-yang-sudah-disetujui-dpr-ini-alasannya)

### s40 · rehook · 5:37

**EN:** So in September 2026, Jakarta went back to Tokyo.

**ID:** Maka September 2026, Jakarta kembali melirik Tokyo.

*Visual:* footage stok: tokyo commuter train station, japan train platform. Footage stok: kereta komuter Tokyo di stasiun

### s41 · body · 5:41

**EN:** On September 23, the head of the national railway asked parliament to allow used Japanese trains again, as a stopgap for 2026 and 2027.

**ID:** Tanggal 23 September, pimpinan KAI meminta DPR mengizinkan lagi kereta bekas Jepang, sebagai tambalan untuk 2026 dan 2027.

*Visual:* diorama 2.5D. kamera ke kai; SEP 23

*Bubble:* "Just as a bridge."

*Sumber:* [Usulan impor EMU bekas Jepang ke DPR pada 23 September sebagai langkah sementara](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/)

### s42 · body · 5:49

**EN:** Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industry.

**ID:** Komisi VI DPR setuju. Rencananya dua puluh tiga rangkaian bekas, dengan satu syarat: industri kereta dalam negeri tetap diperkuat.

*Visual:* diorama 2.5D. kamera ke gov; AGREED, 23 TRAINS

*Sumber:* [Komisi VI DPR menyetujui usulan impor KRL bekas dari Jepang (28 Sept 2026)](https://katadata.co.id/infografik/6ab9d5bf9a9fd/infografik-impor-krl-eks-jepang-kembali-diizinkan); [Rencana impor 23 rangkaian; syarat tetap meningkatkan industri perkeretaapian dalam negeri](https://katadata.co.id/amp/finansial/makro/6aec65cdc2b9f/kai-batalkan-impor-krl-bekas-23-trainset-akan-dipasok-dari-dalam-negeri)

### s43 · body · 5:57

**EN:** The pressure behind that vote was a forecast of three hundred and sixty-nine million passenger trips in 2026. Every missing train makes the remaining ones fuller.

**ID:** Tekanan di balik keputusan itu adalah proyeksi tiga ratus enam puluh sembilan juta perjalanan di 2026. Setiap rangkaian yang kurang membuat rangkaian lain makin penuh.

*Visual:* diorama 2.5D. kamera ke jkt; 369M TRIPS

*Bubble:* "Somebody count the seats."

*Sumber:* [Proyeksi penumpang KRL diestimasi 369 juta penumpang sepanjang 2026](https://katadata.co.id/infografik/6ab9d5bf9a9fd/infografik-impor-krl-eks-jepang-kembali-diizinkan)

### s44 · body · 6:06

**EN:** The reasoning was time. A used train could arrive in one to two months. A new one takes one to two years.

**ID:** Alasannya waktu. Kereta bekas bisa datang dalam satu sampai dua bulan. Kereta baru butuh satu sampai dua tahun.

*Visual:* footage stok: cargo ship at sea, container ship ocean. Footage stok: kapal kargo di laut · teks layar: "Used: 1 to 2 months · New: 1 to 2 years"

*Bubble:* "Already packed."

*Sumber:* [Pengadaan KRL bekas sekitar satu sampai dua bulan, kereta baru satu sampai dua tahun sejak dipesan](https://afu.id/ekonomi/dirut-kai-batalkan-impor-23-krl-bekas-jepang-yang-sudah-disetujui-dpr-ini-alasannya)

### s45 · body · 6:14

**EN:** Then it hit a rule. Indonesia's trade ministry only allows used capital goods like these up to twenty years old.

**ID:** Lalu rencananya menabrak aturan. Kementerian Perdagangan hanya mengizinkan barang modal bekas seperti ini maksimal berumur dua puluh tahun.

*Visual:* diorama 2.5D. kamera ke gov; MAX 20 YRS

*Sumber:* [Ketentuan Kementerian Perdagangan: usia maksimal 20 tahun](https://ekonomi.bisnis.com/read/20261003/98/2009402/impor-krl-bekas-terganjal-usia-kereta)

### s46 · body · 6:21

**EN:** The trains on offer were twenty-five to twenty-eight years old. On average, they had been carrying passengers in Japan since 1998.

**ID:** Kereta yang ditawarkan berumur dua puluh lima sampai dua puluh delapan tahun. Rata-rata sudah mengangkut penumpang di Jepang sejak 1998.

*Visual:* diorama 2.5D. kamera ke oldjp; 25-28 YEARS, SINCE 1998

*Bubble:* "I'm only 28."

*Sumber:* [KAI berencana impor KRL dengan usia pakai 25 tahun](https://ekonomi.bisnis.com/read/20261003/98/2009402/impor-krl-bekas-terganjal-usia-kereta); [Rata-rata kereta berumur 28 tahun, dipakai sejak 1998](https://ekonomi.bisnis.com/read/20261110/98/2020013/3-pertimbangan-kai-batal-impor-krl-bekas-jepang)

### s47 · body · 6:29

**EN:** The transport ministry added another problem. Hand-me-downs wear out. A train used for twenty to thirty years in Japan might have only about ten years left. After that, Jakarta would be shopping for trains again.

**ID:** Kementerian Perhubungan menambah satu masalah. Barang bekas turunan ada batas pakainya. Kereta yang sudah dipakai dua puluh sampai tiga puluh tahun di Jepang mungkin cuma tersisa sekitar sepuluh tahun. Setelah itu, Jakarta harus belanja kereta lagi.

*Visual:* diorama 2.5D. kamera ke t_old; ~10 YRS LEFT

*Bubble:* "Ten years, maybe."

*Sumber:* [Sisa masa pakai diprediksi hanya 10 tahun, karena sudah dipakai 20 sampai 30 tahun di Jepang](https://ekonomi.bisnis.com/read/20261010/98/2011478/kemenhub-ingin-pt-kai-punya-krl-baru-bukan-bekas)

### s48 · body · 6:40

**EN:** Old trains are also harder to keep running. When three Japanese series retired in 2025, one stated reason was that their spare parts had run out.

**ID:** Kereta tua juga makin sulit dirawat. Saat tiga seri Jepang pensiun di 2025, salah satu alasannya adalah suku cadangnya sudah habis.

*Visual:* diorama 2.5D. kamera ke t_old; NO SPARES

*Sumber:* [Seri 8500, 7000, dan 203 pensiun karena usia dan habisnya suku cadang](https://rri.co.id/en/archipelago/1967107/jakarta-s-legendary-krl-trains-retired-after-decades-of-service); [Suku cadang kereta bekas Jepang susah didapat karena banyak yang sudah tidak diproduksi](https://katadata.co.id/berita/2019/08/21/candu-impor-kereta-bekas-jepang)

### s49 · body · 6:50

**EN:** On November 5, the railway's chief executive cancelled the plan. His words: for the public, it must be new.

**ID:** Tanggal 5 November, direktur utama KAI membatalkan rencana itu. Katanya: untuk rakyat, harus yang baru.

*Visual:* diorama 2.5D. kamera ke kai; NOV 5: CANCELLED

*Sumber:* [Dirut KAI 5 Nov: kami tidak impor bekas, untuk rakyat harus yang baru](https://katadata.co.id/amp/finansial/makro/6aec65cdc2b9f/kai-batalkan-impor-krl-bekas-23-trainset-akan-dipasok-dari-dalam-negeri); [KAI memastikan tidak mengimpor KRL bekas Jepang](https://finance.detik.com/infrastruktur/d-8740270/impor-krl-bekas-akhirnya-batal)

### s50 · rehook · 6:57

**EN:** Look at what actually blocked it. Japan still has trains to sell. They are too old for Indonesia's own rule.

**ID:** Lihat apa yang sebenarnya menghalangi. Jepang masih punya kereta untuk dijual. Keretanya terlalu tua untuk aturan Indonesia sendiri.

*Visual:* diorama 2.5D. kamera ke tokyo; STILL FOR SALE, TOO OLD

*Sumber:* [KRL bekas berusia 25 tahun, ketentuan maksimal 20 tahun](https://ekonomi.bisnis.com/read/20261003/98/2009402/impor-krl-bekas-terganjal-usia-kereta)

### s51 · body · 7:05

**EN:** Japan keeps its commuter trains for twenty to thirty years. By the time a car is free to sell, it's usually past Jakarta's limit.

**ID:** Jepang memakai kereta komuternya dua puluh sampai tiga puluh tahun. Saat gerbongnya siap dijual, umurnya biasanya sudah lewat batas Jakarta.

*Visual:* diorama 2.5D. kamera ke oldjp; KEPT 20-30 YRS

*Bubble:* "Missed it by five years."

*Sumber:* [Usia penggunaan di Jepang sekitar 20 sampai 30 tahun](https://ekonomi.bisnis.com/read/20261010/98/2011478/kemenhub-ingin-pt-kai-punya-krl-baru-bukan-bekas)

### s52 · body · 7:13

**EN:** The window that opened in 2000 closed on its own. The supply that made Jakarta's network cheap now ages out before it can be shipped.

**ID:** Jendela yang terbuka tahun 2000 tertutup dengan sendirinya. Pasokan yang membuat jaringan Jakarta murah sekarang keburu tua sebelum bisa dikirim.

*Visual:* footage stok: old train depot, train yard rail cars. Footage stok: depo kereta tua · teks layar: "2000 donation · 2023 blocked · 2026 cancelled"

### s53 · body · 7:22

**EN:** So what do commuters ride next? The operator had three options: order from INKA, keep the old trains running longer, or import used ones.

**ID:** Jadi penumpang naik apa berikutnya? Operatornya punya tiga pilihan: pesan ke INKA, memperpanjang umur kereta lama, atau impor bekas.

*Visual:* diorama 2.5D. kamera ke peta; ORDER INKA, KEEP OLD, IMPORT USED

*Bubble:* "Option four: I walk?"

*Sumber:* [KAI punya tiga opsi: pesan ke INKA, perpanjang usia kereta yang ada, impor bekas](https://ekonomi.bisnis.com/read/20261110/98/2020013/3-pertimbangan-kai-batal-impor-krl-bekas-jepang)

### s54 · body · 7:31

**EN:** With imports off the table, that leaves two. Old Japanese cars stay in service longer, and INKA has to build faster. Some of those cars are already past forty.

**ID:** Karena impor dicoret, tinggal dua. Gerbong Jepang lama dipakai lebih lama, dan INKA harus membuat lebih cepat. Sebagian gerbong itu umurnya sudah lewat empat puluh tahun.

*Visual:* footage kreator `krl-02b.mp4`. Footage milik kreator: eks JR 205 di peron (pengambilan berbeda dari s02)

*Sumber:* [Opsi tersisa: produksi INKA dan perpanjangan usia rangkaian yang beroperasi](https://ekonomi.bisnis.com/read/20261110/98/2020013/3-pertimbangan-kai-batal-impor-krl-bekas-jepang)

### s55 · body · 7:41

**EN:** The money for new trains was already approved. A year earlier, the government set aside five trillion rupiah for thirty new trains, due within a year.

**ID:** Dananya sudah disetujui. Setahun sebelumnya, pemerintah menyiapkan lima triliun rupiah untuk tiga puluh rangkaian baru, ditargetkan selesai dalam setahun.

*Visual:* diorama 2.5D. kamera ke gov; Rp5 TRILLION, 30 TRAINS

*Bubble:* "Within a year?"

*Sumber:* [Setahun sebelum pembatalan, anggaran Rp5 triliun disetujui untuk 30 rangkaian KRL baru, target rampung dalam satu tahun](https://afu.id/ekonomi/dirut-kai-batalkan-impor-23-krl-bekas-jepang-yang-sudah-disetujui-dpr-ini-alasannya)

### s56 · payoff · 7:51

**EN:** The longer plan is to replace eighty-four old Japanese trains with INKA-built ones, and raise capacity from one point one to one point four million passengers a day by 2030.

**ID:** Rencana jangka panjangnya mengganti delapan puluh empat rangkaian Jepang tua dengan buatan INKA, dan menaikkan kapasitas dari satu koma satu ke satu koma empat juta penumpang per hari pada 2030.

*Visual:* diorama 2.5D. kamera ke jkt; 1.1M > 1.4M

*Bubble:* "No pressure."

*Sumber:* [Program jangka panjang mengganti 84 EMU bekas Jepang (rata-rata 40 tahun) dengan buatan INKA, kapasitas 1,1 juta ke 1,4 juta per hari pada 2030](https://www.railjournal.com/passenger/commuter-rail/indonesia-pursues-major-fleet-modernisation/)

### s57 · payoff · 8:03

**EN:** For twenty-five years, Tokyo's old trains let Jakarta grow a rail network it couldn't afford to buy new. The age rule ended that, and now the trains have to be built at home.

**ID:** Selama dua puluh lima tahun, kereta tua Tokyo membuat Jakarta bisa membangun jaringan kereta yang tak sanggup dibeli baru. Aturan umur mengakhirinya, dan sekarang keretanya harus dibuat di dalam negeri.

*Visual:* footage kreator `krl-01b.mp4`. Footage milik kreator: interior eks JR 205, tulisan Jepang (pengambilan penutup)

### s58 · cta · 8:15

**EN:** Those trains carry people to and from one island that holds more than half of Indonesia. Next video: why so many Indonesians live on Java.

**ID:** Kereta-kereta itu mengangkut orang di satu pulau yang dihuni lebih dari separuh penduduk Indonesia. Video berikutnya: kenapa begitu banyak orang Indonesia tinggal di Jawa.

*Visual:* diorama 2.5D. kamera ke peta; JAVA

*Sumber:* [Jawa dihuni lebih dari separuh penduduk Indonesia (verifikasi angka BPS di siklus 002)](https://en.wikipedia.org/wiki/Java)

