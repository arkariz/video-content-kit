# Naskah: siklus 001-jakarta-refused-tokyo-trains (T02, uji-V2 variasi A)

Status: **ditulis ulang 2026-11-26 ke gaya cerita dan gaya visual R3; menunggu persetujuan ulang kreator** (versi sebelumnya disetujui 2026-11-25 dan dirender dengan mesin lama). Sumber tunggal untuk produksi adalah `03-script.json`; file ini versi baca. Visual per kalimat ada di `shots` di JSON dan komponennya di `04-shots.tsx`.

- **Janji:** After watching, you can explain why Jakarta could run Tokyo's retired trains for 25 years without rebuilding its tracks, and why a 20-year import age limit ended that in November 2026.
- **Hook (s01):** You step onto a Jakarta commuter train that started its working life in Tokyo, decades ago. In November, Jakarta refused to buy any more.
- **Panjang:** 58 scene, 1502 kata EN, 1332 kata ID. Durasi pasti setelah TTS; syarat ≥ 8:00 (naskah lama 8:41 dengan 1.437 kata EN).
- **Judul:** (1) Jakarta Just Refused Tokyo's Old Trains. Here's Why · (2) Why Jakarta Runs on Tokyo's Retired Trains, and Why That Just Ended · (3) Tokyo's Old Trains Are Now Too Old for Jakarta
- **Teks thumbnail:** ['TOO OLD TO IMPORT', "TOKYO'S TRAINS, REJECTED"]

## Checklist gaya cerita (`instruksi/referensi/gaya-cerita.md`)

| Syarat | Di mana | Isi |
| --- | --- | --- |
| Scene 1 orang kedua di momen kunci (maks. 2 kalimat) | s01 | "You step onto a Jakarta commuter train that started its working life in Tokyo, decades ago. In November, Jakarta refused to buy any more." |
| Satu analogi di fondasi | s02 (dan dipanggil di s47) | baju bekas turunan: hanya cocok kalau ukurannya sama, hanya berguna selama masih ada umur pakainya |
| Analogi kembali di penutup | s57 | "Tokyo's closet had nothing left that was young enough." |
| Satu tebakan yang patah | s50 | "You might guess Japan ran out of trains. It didn't." |
| Satu blok mekanika insentif | s43 | KAI mau kereta dalam hitungan bulan, DPR mau industri dalam negeri tumbuh, Jepang mau kereta tua keluar dari pembukuan, Kemendag punya batas umur |
| Satu callback dengan twist | s01 → s57 | penolakan November di hook ternyata berasal dari lemari Tokyo yang kehabisan kereta cukup muda, bukan dari Jakarta berpaling |
| Satu beat jujur / steelman | s44 | "To be fair, the argument was time." (argumen impor ditulis dulu sebelum aturan umur memotongnya) |
| Penutup membingkai ulang + ajakan video berikutnya yang spesifik | s57–s58 | reframe lemari; "Next video: why so many Indonesians live on Java." |
| Satu narator TTS, tanpa persona "I/saya" | seluruh naskah | ya |
| Fondasi dulu (60–90 dtk: pemain, tahap, satu analogi), anggaran konsep ≤ 8, istilah didefinisikan saat pertama muncul | s02–s03 | KAI, pemerintah, INKA, CRRC; delapan istilah: rail gauge, 1.500 V DC, seri 205, INKA, CRRC Sifang, batas umur barang modal bekas, retrofit, KAI |

## Gaya visual R3

- **Jangkar (`anchor`):** satu peta Jepang-Jawa-Tiongkok: garis laut Tokyo-Jakarta, pin kota, kapal yang membawa kereta bolak-balik; muncul di fondasi, tengah, dan penutup.
- **Pemeran (`cast`):** Komo (penumpang, "kamu"), Sepuh (kereta eks-Tokyo), Pak Aturan (aturan dan lembaga).
- Satu shot per kalimat, tiap shot punya `motion`, label maks. 3 kata muncul di kata yang diucapkan, angka dibuat bisa dihitung (titik, deretan gerbong, garis waktu). Tanpa papan teks.
- Scene footage nyata CC BY (s17, s22, s31, s34) dan stok s44 tetap footage penuh karena mesin R3 mengabaikan `broll` bila ada `shots`. s02 (analogi fondasi) kini digambar R3, jadi klip `s02-s17-...-01.mp4` tidak dipakai.
- Gambar ditulis di `04-shots.tsx` (dihasilkan oleh `03-script.r3.py` dari `04-shots.head.tsx`).

## Potongan Shorts

- **A1-why-tokyo-trains-fit** (s01, s08, s12, s14, s15). Hook: "You step onto a Jakarta train that started in Tokyo. Here's why it still fits."
- **A2-too-old-to-import** (s42, s45, s46, s49, s50). Hook: "You'd think Jakarta could just buy more of Tokyo's old trains. A rule said no."

Catatan: framing 9:16 Shorts dikerjakan lewat `focus` per shot (subjek utama di tengah) dan diperiksa saat render.

## Pelafalan

- Sifang: Si-fahng
- Sengaja tanpa `say_as` untuk INKA, CRRC, Bogor, Cikarang. Dengarkan kemunculan pertama setelah TTS.

## Skor anti-slop (lapisan Teks)

Belum dinilai ulang setelah penulisan ulang 2026-11-26. Skor naskah lama (EN 39, ID 38) tidak berlaku untuk teks yang berubah. Jalankan skill `video-anti-slop` pada naskah ini sebelum render. Cek otomatis `check_kit.py`: lolos. Kalimat s57 sengaja ditulis tanpa kontras "bukan X melainkan Y".

## Naskah per scene

### s01 · hook

**EN:** You step onto a Jakarta commuter train that started its working life in Tokyo, decades ago. In November, Jakarta refused to buy any more.

**ID:** Kamu naik kereta komuter Jakarta yang dulu mulai bekerja di Tokyo, puluhan tahun lalu. November lalu, Jakarta menolak membeli lagi.

*Visual (R3, satu per kalimat):*
1. [place/cut] peron Jakarta senja: kereta eks-Tokyo berhenti, pintu terbuka, Komo (kamu) melangkah ke pintu → Komo berjalan ke pintu, cahaya senja bergeser, kereta berdesis pelan · label: "MADE IN TOKYO"@Tokyo
2. [map/iris] peta: kapal membawa kereta dari Tokyo, di ujung Jakarta muncul tanda silang besar → kapal berlayar dari Tokyo ke Jakarta, di dekat tujuan berhenti dan tanda silang menghantam · label: "REFUSED"@refused

*Sumber:* [KAI memastikan tidak mengimpor KRL bekas Jepang (5 Nov 2026)](https://finance.detik.com/infrastruktur/d-8740270/impor-krl-bekas-akhirnya-batal)

### s02 · context

**EN:** The reason it came here is simple, and it works like hand-me-down clothes. They only fit if the size matches, and they only help while there's life left in them. The reason it stopped is a rule about age.

**ID:** Alasan kereta ini datang ke sini sederhana, dan cara kerjanya seperti baju bekas turunan. Baju itu hanya cocok kalau ukurannya sama, dan hanya berguna selama masih ada umur pakainya. Alasan berhentinya adalah aturan soal umur.

*Visual (R3, satu per kalimat):*
1. [place/cut] Komo memegang kemeja turunan kakaknya, bayangan anak yang lebih besar di belakang → kemeja pindah tangan dan mengembang, Komo menatapnya · label: "HAND-ME-DOWNS"@hand-me-down
2. [object/push] kemeja kebesaran menelan Komo, lalu ukuran pas, lalu kemeja pas mulai berlubang → kemeja menyusut jadi pas, Komo lega, lubang bermunculan · label: "SIZE MATCH"@size, "LIFE LEFT"@life
3. [object/wipe] Pak Aturan membanting stempel ke Sepuh yang tua dan berkarat → stempel turun, Sepuh tersentak · label: "AGE RULE"@age

### s03 · context

**EN:** Four players run this story. KAI, the state railway behind the commuter trains. The government, which sets the import rules. INKA, Indonesia's own train builder. And CRRC, a Chinese maker of new trains. We'll cover why Tokyo's trains fit Jakarta, why the deal worked for twenty-five years, and why it ended in November 2026.

**ID:** Ada empat pemain dalam cerita ini. KAI, perusahaan kereta api negara di balik KRL. Pemerintah, yang menetapkan aturan impor. INKA, pembuat kereta dalam negeri. Dan CRRC, pembuat kereta baru dari Tiongkok. Kita bahas kenapa kereta Tokyo cocok untuk Jakarta, kenapa kesepakatan itu bertahan dua puluh lima tahun, dan kenapa berakhir November 2026.

*Visual (R3, satu per kalimat):*
1. [place/cut] empat panggung kosong berjajar di tanah, satu per satu terangkat → panggung naik satu demi satu dengan pantulan · label: "4 PLAYERS"@Four
2. [object/push] kereta komuter KAI merah-kuning di peron Jakarta → kereta masuk peron pelan dan berhenti · label: "KAI"@KAI
3. [object/cut] Pak Aturan di depan gedung pemerintah, stempel di tangan, selembar aturan melayang → stempel naik turun, dokumen berputar pelan · label: "GOVERNMENT"@government
4. [place/iris] pabrik INKA berasap, kereta putih-oranye perlahan keluar dari pintunya → asap naik, kereta baru keluar pelan · label: "INKA"@INKA
5. [map/wipe] peta: kapal membawa kereta baru dari Tiongkok ke Jawa → kapal berlayar dari Tiongkok, mendekati Jakarta · label: "CRRC"@CRRC
6. [map/push] garis waktu 2000 ke 2026 digambar, tiga penanda menyala → titik berjalan dari 2000 ke 2026, tiga penanda menyala berurutan · label: "NOV 2026"@2026

*Sumber:* [KAI Commuter menerima KRL baru; pesanan 16 trainset INKA dan 11 trainset CRRC Qingdao Sifa](https://www.liputan6.com/bisnis/read/6007403/kai-commuter-kembali-terima-2-krl-baru-dari-china) · [Kementerian Perdagangan menetapkan aturan impor barang modal bekas (usia maksimal 20 tahun](https://ekonomi.bisnis.com/read/20261003/98/2009402/impor-krl-bekas-terganjal-usia-kereta)

### s04 · body

**EN:** It started with a gift. In May 2000, Japan's aid agency and the Tokyo city government donated seventy-two used subway cars from Tokyo's Mita Line.

**ID:** Semuanya dimulai dari hibah. Mei 2000, badan bantuan Jepang dan pemerintah kota Tokyo memberi tujuh puluh dua gerbong kereta bawah tanah bekas dari jalur Mita di Tokyo.

*Visual (R3, satu per kalimat):*
1. [object/cut] kereta subway Tokyo dibungkus pita besar seperti hadiah → pita mengembang dan konfeti naik · label: "A GIFT"@gift
2. [map/iris] peta: kapal membawa tujuh puluh dua gerbong dari Tokyo ke Jakarta → gerbong muncul satu per satu menjadi tujuh puluh dua, kapal berlayar · label: "72 CARS"@seventy-two, "MAY 2000"@2000

*Sumber:* [Mei 2000, Jepang lewat JICA dan Pemerintah Metropolitan Tokyo menghibahkan 72 unit Toei 60](https://en.wikipedia.org/wiki/KRL_Commuterline)

### s05 · body

**EN:** Those cars were built from 1968. Tokyo retired them after about thirty years of service, and Jakarta kept them running until 2016.

**ID:** Gerbong itu dibuat mulai 1968. Tokyo memensiunkannya setelah sekitar tiga puluh tahun, dan Jakarta masih menjalankannya sampai 2016.

*Visual (R3, satu per kalimat):*
1. [place/cut] pabrik tahun 1968, kereta biru-putih baru keluar dari gerbang → kereta meluncur keluar pelan, asap pabrik naik · label: "1968"@1968
2. [map/wipe] garis waktu 1968 ke 2016, Sepuh melambai di ujungnya → titik berjalan menyusuri tiga puluh tahun lalu sampai 2016 · label: "30 YEARS"@thirty

*Sumber:* [Toei 6000 beroperasi di jalur Mita 1968-1999, di KCI 2000-2016](https://en.wikipedia.org/wiki/KRL_Commuterline) · [Toei 6000 mulai beroperasi di Jepang 1968, dipensiunkan setelah 32 tahun](https://katadata.co.id/berita/2019/08/21/candu-impor-kereta-bekas-jepang)

### s06 · body

**EN:** They were the first air-conditioned electric trains in Indonesia. At the time, crowded riders hung out of open doors or sat on the roof.

**ID:** Itu kereta listrik ber-AC pertama di Indonesia. Waktu itu, penumpang yang berjejal bergelantungan di pintu terbuka, bahkan duduk di atap.

*Visual (R3, satu per kalimat):*
1. [inside/cut] dalam gerbong: penumpang lega, kilat listrik di atas, udara dingin → kilat menyala, wajah penumpang berubah dari gerah ke lega · label: "FIRST AC TRAIN"@air-conditioned
2. [place/wipe] kereta ekonomi berangkat, penumpang bergelantungan di pintu dan duduk di atap → kereta bergerak makin cepat, orang di atap bergoyang · label: "ROOF RIDERS"@roof

*Sumber:* [Toei 6000 adalah kereta listrik ber-AC pertama di Indonesia](https://en.wikipedia.org/wiki/KRL_Commuterline) · [Sebelum itu banyak penumpang duduk di atap karena gerbong terlalu padat](https://katadata.co.id/berita/2019/08/21/candu-impor-kereta-bekas-jepang)

### s07 · body

**EN:** Then Jakarta started buying them. In 2014, the operator said a used car from Japan cost eight hundred million to one billion rupiah.

**ID:** Lalu Jakarta mulai membeli. Tahun 2014, operatornya bilang satu gerbong bekas dari Jepang harganya delapan ratus juta sampai satu miliar rupiah.

*Visual (R3, satu per kalimat):*
1. [map/push] peta Jawa: kapal merapat ke Jakarta, tumpukan gerbong diturunkan → kamera turun ke Jawa, kapal merapat
2. [object/cut] gerbong bekas di samping tumpukan koin kecil → tiga koin jatuh dan menumpuk · label: "RP 0.8-1 B"@billion

*Sumber:* [KCJ 2014: kereta bekas dari Jepang Rp800 juta sampai Rp1 miliar per unit, kereta baru Rp10](https://ekonomi.republika.co.id/berita/ng0apv/impor-kereta-demi-tarif-murah)

### s08 · body

**EN:** A new car cost ten to twelve billion. Same seats, same doors, about one tenth of the price.

**ID:** Gerbong baru sepuluh sampai dua belas miliar. Kursinya sama, pintunya sama, harganya kira-kira sepersepuluh.

*Visual (R3, satu per kalimat):*
1. [object/cut] gerbong baru mengilap di samping tumpukan koin tinggi → koin jatuh menumpuk sampai dua belas · label: "RP 10-12 B"@twelve
2. [object/wipe] dua gerbong sama persis, satu dengan satu koin, satu dengan sepuluh → tumpukan kiri kecil, kanan menjulang, kamera mundur · label: "1/10 PRICE"@tenth

*Sumber:* [Kereta baru Rp10 sampai 12 miliar, bekas Rp800 juta sampai Rp1 miliar (2014)](https://ekonomi.republika.co.id/berita/ng0apv/impor-kereta-demi-tarif-murah)

### s09 · body

**EN:** Indonesia's own train maker, INKA, quoted about one point three million dollars for a new car in 2019. Even after shipping, a used car was about one ninth of that price.

**ID:** Pabrik kereta Indonesia sendiri, INKA, mematok sekitar satu koma tiga juta dolar per gerbong baru di 2019. Bahkan setelah ongkos kirim, gerbong bekas harganya kira-kira sepersembilan dari itu.

*Visual (R3, satu per kalimat):*
1. [place/cut] pabrik INKA menyodorkan selembar penawaran dengan tumpukan koin tinggi → dokumen terbang dari pabrik, koin menumpuk · label: "$1.3 M"@million
2. [object/push] kapal membawa gerbong bekas, dua batang harga: tinggi untuk baru, sangat pendek untuk bekas → kapal berlayar, batang bekas tumbuh hanya sepersembilan · label: "1/9 PRICE"@ninth

*Sumber:* [Dirut INKA 2019: kereta bekas Jepang sekitar Rp2 miliar, kereta INKA sekitar US$1,3 juta](https://finance.detik.com/read/2019/08/19/161619/4671967/1036/ri-bisa-bikin-krl-tapi-kok-impor-yang-bekas-dari-jepang) · [Kereta bekas Jepang sekitar Rp2 miliar termasuk ongkos kirim, INKA sekitar Rp18 miliar](https://finance.detik.com/read/2019/08/19/161619/4671967/1036/ri-bisa-bikin-krl-tapi-kok-impor-yang-bekas-dari-jepang)

### s10 · body

**EN:** For Japan, the deal was just as good. Scrapping a train costs money. Shipping it to Jakarta cost less, and somebody else would keep using it.

**ID:** Untuk Jepang, ini juga untung. Membuang kereta itu mahal. Mengirimnya ke Jakarta lebih murah, dan keretanya tetap dipakai orang lain.

*Visual (R3, satu per kalimat):*
1. [place/cut] depo Tokyo: kereta tua diparkir, tanda centang besar menyala → tanda centang muncul, Sepuh tersenyum · label: "GOOD FOR JAPAN"@good
2. [object/wipe] Sepuh berkeringat di tempat pembuangan, tumpukan koin biaya menggunung → koin biaya menumpuk di sebelahnya · label: "SCRAP COST"@Scrapping
3. [map/iris] peta: kapal membawa Sepuh dari Tokyo ke Jakarta, hanya satu koin kecil di sisi → kapal berlayar santai, koin kecil bergoyang di dek · label: "SHIPPING"@Shipping

*Sumber:* [Di Jepang, membuang barang bekas pun ongkosnya mahal](https://katadata.co.id/berita/2019/08/21/candu-impor-kereta-bekas-jepang)

### s11 · rehook

**EN:** But price alone doesn't explain it. In many countries, a train from Tokyo can't run without major changes. In Jakarta, it can.

**ID:** Tapi harga saja tidak cukup menjelaskan. Di banyak negara, kereta dari Tokyo tidak bisa jalan tanpa diubah besar-besaran. Di Jakarta, bisa.

*Visual (R3, satu per kalimat):*
1. [object/cut] tumpukan koin di tengah, tanda silang menimpanya → silang besar menghantam koin · label: "NOT JUST PRICE"@price
2. [object/wipe] kereta Tokyo di atas rel yang salah lebar, roda tidak masuk → rel melebar, roda menggantung, silang menyala · label: "MAJOR CHANGES"@changes
3. [place/push] kereta Tokyo meluncur pas di rel Jakarta, tanda centang muncul → kereta masuk dan pas, centang menyala · label: "JAKARTA"@Jakarta

### s12 · body

**EN:** The first size that matches is the rails. Japan's regular lines and Java's lines are both one thousand and sixty-seven millimetres apart. Change the rail width and you need new wheels, new axles, often a new train.

**ID:** Ukuran pertama yang cocok adalah relnya. Jalur kereta biasa di Jepang dan jalur di Jawa sama-sama seribu enam puluh tujuh milimeter. Kalau lebar relnya beda, roda dan as harus diganti, sering kali keretanya juga.

*Visual (R3, satu per kalimat):*
1. [object/push] penampang dua rel di bantalan, satu garis ukur muncul di antaranya → garis ukur memanjang di antara dua rel · label: "THE RAILS"@rails
2. [object/wipe] dua penampang rel kembar: Jepang di kiri, Jawa di kanan, angka sama → dua garis ukur memanjang bersamaan lalu sama panjang · label: "JAPAN"@Japan's, "JAVA"@Java's, "1,067 MM"@sixty-seven
3. [object/cut] rel melebar, roda kecil tidak muat dan jatuh, silang muncul → lebar rel berubah, roda terlepas · label: "NEW WHEELS"@wheels

*Sumber:* [Jalur konvensional Jepang 1.067 mm; Indonesia sama; Eropa, China 1.435 mm atau lebih](https://www.newsweekjapan.jp/articles/-/21721?page=1) · [Lebar rel utama Indonesia 1.067 mm](https://en.wikipedia.org/wiki/Rail_transport_in_Indonesia)

### s13 · body

**EN:** That match has a history. Java's first railway, in 1867, was built wider. During the Japanese occupation in the 1940s, the remaining wide lines on Java were converted to the narrower Japanese width. That is a big reason a Tokyo train fits Java's rails today.

**ID:** Kesamaan ini ada sejarahnya. Jalur kereta pertama di Jawa, tahun 1867, dibangun lebih lebar. Saat pendudukan Jepang tahun 1940-an, jalur lebar yang tersisa di Jawa diubah ke lebar rel Jepang yang lebih sempit. Itu alasan besar kereta Tokyo pas di rel Jawa sekarang.

*Visual (R3, satu per kalimat):*
1. [object/cut] jam raksasa berputar mundur di atas peta Jawa → jarum jam berputar mundur cepat · label: "HISTORY"@history
2. [map/push] pulau Jawa tahun 1867, rel lebar pertama dibentangkan → rel melebar digambar di atas Jawa · label: "1867"@1867
3. [map/wipe] rel lebar diganti rel sempit saat pendudukan, garis waktu sampai 1940an → rel lebar menyusut jadi sempit, titik waktu bergeser · label: "1940S"@1940s, "NARROWER"@narrower
4. [place/iris] kereta Tokyo pas di rel Jawa hari ini, centang menyala → kereta meluncur pas, centang muncul · label: "IT FITS"@fits

*Sumber:* [Rel pertama 1867 memakai 1.435 mm; saat pendudukan Jepang dikonversi ke 1.067 mm](https://en.wikipedia.org/wiki/Rail_transport_in_Indonesia) · [Lebar rel Indonesia diseragamkan oleh Jepang saat Perang Dunia II](https://www.newsweekjapan.jp/articles/-/21721?page=1)

### s14 · body

**EN:** The power matches too. Jakarta's electric line opened in 1925 on fifteen hundred volts DC, the same system the 205 series was built for in Tokyo.

**ID:** Listriknya juga cocok. Jalur listrik Jakarta dibuka tahun 1925 dengan seribu lima ratus volt DC, sistem yang sama dengan rancangan seri 205 di Tokyo.

*Visual (R3, satu per kalimat):*
1. [object/cut] kilat besar menyala di tengah, centang di sebelahnya → kilat menyala berdenyut, centang muncul · label: "POWER"@power
2. [object/push] kabel listrik dan pantograf, kilat mengalir ke atap kereta → arus mengalir sepanjang kabel ke kereta · label: "1,500 V DC"@volts, "1925"@1925

*Sumber:* [Jalur listrik Jakarta selesai 1924-1925 dengan 1.500 V DC aliran atas](https://en.wikipedia.org/wiki/KRL_Commuterline) · [Seri 205 (komuter Tokyo) memakai 1.500 V DC aliran atas](https://en.wikipedia.org/wiki/205_series)

### s15 · body

**EN:** Same rails, same power. A Tokyo train arrives by ship, gets new signs and checks, and goes into service with no rebuilding of the tracks.

**ID:** Rel sama, listrik sama. Kereta Tokyo datang naik kapal, diganti tandanya dan diperiksa, lalu langsung dipakai tanpa membongkar rel.

*Visual (R3, satu per kalimat):*
1. [object/cut] dua penampang rel dan kilat, dua centang menyala → dua centang menyala berurutan · label: "SAME RAILS"@rails
2. [place/wipe] kapal menurunkan kereta, kereta pasang tanda baru lalu melaju di rel yang tidak diubah → kapal berlalu, kereta bergerak masuk dinas · label: "NEW SIGNS"@signs

*Sumber:* [Gerbong eks Jepang diturunkan di Pelabuhan Tanjung Priok lalu dirangkai](https://rmol.id/read/2012/05/16/64003/atap-berkarat-gerbong-penuh-poster-iklan)

### s16 · body

**EN:** So Jakarta kept buying. In 2012, the operator planned to bring in one hundred and forty cars that year, and aimed for fourteen hundred and forty cars by 2019.

**ID:** Jadi Jakarta terus membeli. Tahun 2012, operatornya menargetkan seratus empat puluh gerbong tahun itu, dan seribu empat ratus empat puluh gerbong di 2019.

*Visual (R3, satu per kalimat):*
1. [map/push] peta: tiga kapal bergantian membawa kereta ke Jakarta → tiga kapal berlayar bergantian
2. [map/cut] deretan gerbong 140 bertambah, garis waktu 2012 ke 2019 di bawahnya → gerbong muncul satu per satu, titik waktu berjalan ke 2019 · label: "140 CARS"@forty, "1,440 CARS"@aimed

*Sumber:* [KCJ 2012 menargetkan 140 unit tahun itu dan 1.440 kereta pada 2019](https://rmol.id/read/2012/05/16/64003/atap-berkarat-gerbong-penuh-poster-iklan)

### s17 · body

**EN:** The biggest batch came later. JR East's 205 series, a Tokyo commuter train first built in 1985, started running in Jakarta in 2013.

**ID:** Gelombang terbesar datang belakangan. Seri 205 milik JR East, kereta komuter Tokyo yang pertama dibuat tahun 1985, mulai jalan di Jakarta tahun 2013.

*Visual:* footage nyata CC BY `s02-s17-rangkaian-eks-jepang-di-peron-02.mp4`

*Sumber:* [Seri 205 diperkenalkan JNR 1985, dioperasikan KAI Commuter sejak 2013](https://en.wikipedia.org/wiki/205_series)

### s18 · body

**EN:** Today the backbone is still Japanese. Seven hundred and eighty cars came from JR East's 205 series, and one hundred and twenty-eight from Tokyo Metro.

**ID:** Sampai sekarang tulang punggungnya masih Jepang. Tujuh ratus delapan puluh gerbong dari seri 205 milik JR East, dan seratus dua puluh delapan dari Tokyo Metro.

*Visual (R3, satu per kalimat):*
1. [object/cut] rangkaian panjang kereta Jepang berjajar di peron senja → rangkaian bergeser pelan melewati kamera · label: "STILL JAPANESE"@Japanese
2. [object/push] seratus titik: delapan puluh enam merah, sisanya hijau → titik menyala satu per satu, dua kelompok warna · label: "780 CARS"@Seven, "128 CARS"@twenty-eight

*Sumber:* [Masih beroperasi 780 unit JR East 205 dan 128 unit Tokyo Metro 6000 (Juli 2026)](https://ekonomi.bisnis.com/read/20260713/98/1987706/kai-sebut-18-krl-baru-siap-beroperasi-9-rangkaian-pensiun-tahun-ini)

### s19 · body

**EN:** Those cars are thirty-four to forty-one years old. Many of them started work in Tokyo before the Berlin Wall fell.

**ID:** Umur gerbong itu tiga puluh empat sampai empat puluh satu tahun. Banyak yang mulai bekerja di Tokyo sebelum Tembok Berlin runtuh.

*Visual (R3, satu per kalimat):*
1. [object/cut] Sepuh tua di samping kue ulang tahun penuh lilin → lilin menyala satu demi satu, Sepuh mengeluh · label: "34-41 YEARS"@thirty-four
2. [place/wipe] tembok bata runtuh di belakang Sepuh kecil → tembok retak lalu runtuh berkeping · label: "BERLIN WALL"@Berlin

*Sumber:* [Usia JR East 205 dan Tokyo Metro 6000: 34 sampai 41 tahun](https://ekonomi.bisnis.com/read/20260713/98/1987706/kai-sebut-18-krl-baru-siap-beroperasi-9-rangkaian-pensiun-tahun-ini)

### s20 · rehook

**EN:** A fleet that old needs replacing, and passenger numbers kept rising. The first attempt to replace it with more Tokyo trains came in 2023, and it was blocked.

**ID:** Armada setua itu harus diganti, dan jumlah penumpang terus naik. Upaya pertama menggantinya dengan kereta Tokyo lagi terjadi di 2023, dan ditolak.

*Visual (R3, satu per kalimat):*
1. [place/cut] Sepuh berkeringat, kerumunan di belakangnya bertambah → orang berdatangan memenuhi peron · label: "RISING"@rising
2. [object/push] dokumen impor dicap silang merah → stempel merah menghantam dokumen · label: "2023"@2023, "BLOCKED"@blocked

### s21 · body

**EN:** The operator asked to import three hundred and forty-eight used cars of a newer Japanese model, the E217, for 2023 and 2024.

**ID:** Operatornya minta izin impor tiga ratus empat puluh delapan gerbong bekas model Jepang yang lebih baru, E217, untuk 2023 dan 2024.

*Visual (R3, satu per kalimat):*
1. [place/cut] kapal di Tokyo siap menerima tumpukan gerbong model baru E217 → gerbong naik ke dek satu per satu menjadi tiga ratus empat puluh delapan · label: "348 CARS"@forty-eight, "E217"@E217

*Sumber:* [KCI mengajukan impor 120 unit KRL tipe E217 untuk 2023 dan 228 unit untuk 2024](https://www.cnbcindonesia.com/news/20230303072844-4-418508/impor-krl-bekas-jepang-berpolemik-ini-biang-keroknya)

### s22 · body

**EN:** The government said no. The cars stayed in Japan. Officials chose to refit old trains and buy new ones instead.

**ID:** Pemerintah menolak. Gerbongnya tetap di Jepang. Sebagai gantinya, kereta lama diperbarui dan kereta baru dibeli.

*Visual:* footage nyata CC BY `s20-s22-latar.mp4`

*Sumber:* [2023 pemerintah menolak impor KRL bekas Jepang, memilih retrofit KRL lama dan pengadaan KR](https://www.metrotvnews.com/play/NxGCXq5a-dulu-ditolak-kini-indonesia-mau-impor-krl-bekas-dari-jepang)

### s23 · body

**EN:** New trains came from two places. A Chinese maker, CRRC Sifang, and INKA in East Java.

**ID:** Kereta baru datang dari dua tempat. Pabrikan China, CRRC Sifang, dan INKA di Jawa Timur.

*Visual (R3, satu per kalimat):*
1. [map/cut] peta: dua jalur menuju Jakarta, satu dari Tiongkok, satu dari Jawa Timur → dua garis berwarna mengalir ke Jakarta
2. [map/push] peta zoom: pin CRRC di Tiongkok dan INKA di Jawa Timur → kamera bergeser dari Tiongkok ke Jawa Timur · label: "CRRC SIFANG"@CRRC, "INKA"@INKA

*Sumber:* [Total pemesanan: 16 trainset INKA dan 11 trainset CRRC Qingdao Sifang](https://www.liputan6.com/bisnis/read/6007403/kai-commuter-kembali-terima-2-krl-baru-dari-china)

### s24 · body

**EN:** INKA also took a contract to refit nineteen of the old trains, so they could keep running while the new ones were built.

**ID:** INKA juga mendapat kontrak memperbarui sembilan belas rangkaian lama, supaya tetap bisa jalan selama kereta baru dibuat.

*Visual (R3, satu per kalimat):*
1. [place/cut] di bengkel INKA kereta lama diperbaiki, sembilan belas gerbong merah berjajar → gerbong muncul satu per satu sampai sembilan belas · label: "19 TRAINS"@nineteen

*Sumber:* [KAI Commuter melakukan peremajaan atau retrofit 19 rangkaian KRL oleh PT INKA](https://berkas.dpr.go.id/pusaka/files/isu_sepekan/Isu Sepekan---I-PUSLIT-Februari-2024-228.pdf)

### s25 · body

**EN:** In January 2024, the operator signed for three Chinese trains. The contract was seven hundred and eighty-three billion rupiah, about two hundred and sixty-one billion per train.

**ID:** Januari 2024, operatornya meneken kontrak tiga rangkaian dari China. Nilainya tujuh ratus delapan puluh tiga miliar rupiah, sekitar dua ratus enam puluh satu miliar per rangkaian.

*Visual (R3, satu per kalimat):*
1. [object/cut] kapal dari Tiongkok membawa tiga kereta putih-merah → kapal berlayar, tiga kereta tampak di dek · label: "3 CHINESE TRAINS"@three, "JAN 2024"@January
2. [place/push] tiga tumpukan koin sama tinggi di bawah satu dokumen kontrak → koin jatuh menumpuk tiga kali sama banyak · label: "RP 783 B"@billion, "RP 261 B"@per

*Sumber:* [KCI membeli 3 trainset KCI-SFC120-V seharga Rp783 miliar, Rp261 miliar per trainset (31 Ja](https://ekonomi.bisnis.com/read/20240201/98/1737487/perbandingan-impor-krl-dari-china-dan-jepang-siapa-lebih-mahal)

### s26 · body

**EN:** The new trains are longer. Each one has twelve cars and can carry about three thousand four hundred people per trip.

**ID:** Kereta barunya lebih panjang. Tiap rangkaian berisi dua belas gerbong dan bisa mengangkut sekitar tiga ribu empat ratus orang sekali jalan.

*Visual (R3, satu per kalimat):*
1. [object/cut] kereta Tiongkok jauh lebih panjang dibanding kereta lama di sebelahnya → kereta baru meluncur masuk, lebih panjang dari yang lama · label: "LONGER"@longer
2. [inside/wipe] dua belas gerbong baris atas, tiga puluh empat titik orang di bawahnya → gerbong muncul satu per satu, titik orang mengisi · label: "12 CARS"@twelve, "3,400 PEOPLE"@people

*Sumber:* [Rangkaian CRRC 12 gerbong, kapasitas 1 rangkaian sekitar 3.400 penumpang sekali jalan](https://finance.detik.com/infrastruktur/d-7943442/krl-made-in-china-resmi-operasi-punya-banyak-fitur-baru)

### s27 · body

**EN:** Compare that with the old deal. Twelve used cars from Japan once cost about twelve billion. One new twelve-car train cost around twenty times as much.

**ID:** Bandingkan dengan cara lama. Dua belas gerbong bekas Jepang dulu sekitar dua belas miliar. Satu rangkaian baru berisi dua belas gerbong harganya kira-kira dua puluh kali lipat.

*Visual (R3, satu per kalimat):*
1. [object/cut] kereta bekas lama di kiri dan kereta baru di kanan, tanda banding di tengah → kedua kereta bergeser masuk berhadapan · label: "OLD DEAL"@old
2. [object/cut] dua belas gerbong bekas di atas, tiga koin biaya di bawah → gerbong tersusun, koin menumpuk tiga · label: "RP 12 B"@billion
3. [object/push] tumpukan koin kecil di kiri, tumpukan raksasa dua puluh kali di kanan → tumpukan kanan menjulang melewati kamera · label: "20X PRICE"@twenty

*Sumber:* [Gerbong bekas Rp800 juta sampai Rp1 miliar (2014)](https://ekonomi.republika.co.id/berita/ng0apv/impor-kereta-demi-tarif-murah) · [Rp261 miliar per trainset CRRC](https://ekonomi.bisnis.com/read/20240201/98/1737487/perbandingan-impor-krl-dari-china-dan-jepang-siapa-lebih-mahal) · [KCI-SFC120-V masing-masing terdiri dari 12 gerbong](https://berkas.dpr.go.id/pusaka/files/isu_sepekan/Isu Sepekan---I-PUSLIT-Februari-2024-228.pdf)

### s28 · body

**EN:** New trains fix one problem: age. In November 2025, three of the oldest Japanese series retired, some of them close to fifty years old.

**ID:** Kereta baru menyelesaikan satu masalah: umur. November 2025, tiga seri Jepang tertua pensiun, sebagian umurnya hampir lima puluh tahun.

*Visual (R3, satu per kalimat):*
1. [object/cut] kereta baru mengilap dengan centang di atapnya → kereta bergeser masuk, kilau menyapu badan, centang muncul · label: "FIXES AGE"@age
2. [place/push] tiga Sepuh tua berdiri di senja, satu per satu memudar → tiga Sepuh dimuat dalam cahaya senja, perlahan memudar · label: "NOV 2025"@2025, "~50 YEARS"@fifty

*Sumber:* [Nov 2025: KRL seri 8500, 7000, dan 203 resmi pensiun, sebagian berusia hingga 50 tahun](https://rri.co.id/en/archipelago/1967107/jakarta-s-legendary-krl-trains-retired-after-decades-of-service)

### s29 · body

**EN:** Their driver cabins are going on display at Jakarta Kota station. Jakarta gave its second-hand trains a retirement ceremony.

**ID:** Kabin masinisnya akan dipajang permanen di Stasiun Jakarta Kota. Jakarta memberi kereta bekasnya upacara pensiun yang layak.

*Visual (R3, satu per kalimat):*
1. [object/cut] kabin masinis Sepuh dipajang di atas panggung di stasiun Jakarta Kota → lampu sorot menyala di atas kabin · label: "JAKARTA KOTA"@Kota
2. [place/iris] Sepuh dengan medali di tengah konfeti, penonton bertepuk tangan → konfeti berhamburan, penonton melambai · label: "RETIREMENT"@retirement

*Sumber:* [Bagian kabin masinis ketiga seri dipajang permanen di Stasiun Jakarta Kota](https://rri.co.id/en/archipelago/1967107/jakarta-s-legendary-krl-trains-retired-after-decades-of-service)

### s30 · rehook

**EN:** So the plan was new trains from China and from INKA. The weak point was INKA's factory.

**ID:** Jadi rencananya kereta baru dari China dan dari INKA. Titik lemahnya ada di pabrik INKA.

*Visual (R3, satu per kalimat):*
1. [map/cut] peta: dua jalur baru, satu dari Tiongkok, satu dari pabrik INKA → dua garis menyala menuju Jakarta
2. [place/push] pabrik INKA besar, satu tanda silang di atas cerobong → asap melemah dan silang menghantam · label: "WEAK POINT"@weak

*Sumber:* [Pesanan 16 trainset INKA dan 11 trainset CRRC](https://www.liputan6.com/bisnis/read/6007403/kai-commuter-kembali-terima-2-krl-baru-dari-china)

### s31 · body

**EN:** All eleven Chinese trains are running, mostly on the Bogor and Cikarang lines. Here, a Chinese train on the Bogor line shares the tracks with the old Japanese ones.

**ID:** Kesebelas rangkaian China sudah beroperasi, kebanyakan di lintas Bogor dan Cikarang. Di sini, kereta China di lintas Bogor berbagi rel dengan kereta Jepang yang lama.

*Visual:* footage nyata CC BY `s31-s53.mp4`

*Sumber:* [11 rangkaian CRRC sudah dioperasikan untuk Bogor Line dan Cikarang Line](https://finance.detik.com/infrastruktur/d-8571647/kai-buka-bukaan-18-krl-baru-sudah-beroperasi)

### s32 · body

**EN:** INKA was expected to build eight trains a year. It delivered two to three.

**ID:** INKA diproyeksikan membuat delapan rangkaian setahun. Yang terwujud dua sampai tiga.

*Visual (R3, satu per kalimat):*
1. [place/cut] pabrik INKA dan delapan gerbong hijau berjajar sebagai target → gerbong muncul satu per satu sampai delapan · label: "8 PER YEAR"@eight
2. [place/cut] delapan gerbong abu-abu pudar, hanya tiga yang menyala merah → tiga gerbong menyala, lima tetap pudar · label: "2-3 DELIVERED"@delivered

*Sumber:* [Proyeksi INKA 8 trainset per tahun, realisasi 2 sampai 3 trainset per tahun](https://www.metrotvnews.com/play/NxGCXq5a-dulu-ditolak-kini-indonesia-mau-impor-krl-bekas-dari-jepang)

### s33 · body

**EN:** By September 2026, seven of the sixteen INKA trains were in service. That left nine trains the network was counting on, still not carrying anyone.

**ID:** Sampai September 2026, baru tujuh dari enam belas rangkaian INKA yang beroperasi. Artinya masih ada sembilan rangkaian yang diandalkan, tapi belum mengangkut siapa pun.

*Visual (R3, satu per kalimat):*
1. [object/cut] enam belas titik, tujuh menyala hijau → tujuh titik menyala satu per satu · label: "7 OF 16"@seven
2. [place/push] sembilan titik redup menunggu, kereta berhenti kosong di belakang → sembilan titik berdenyut kuning, kereta diam · label: "9 WAITING"@nine

*Sumber:* [Baru 7 dari 16 EMU iE305 INKA yang beroperasi](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/) · [Hingga September 2026 baru 7 rangkaian yang beroperasi](https://www.metrotvnews.com/play/NxGCXq5a-dulu-ditolak-kini-indonesia-mau-impor-krl-bekas-dari-jepang)

### s34 · body

**EN:** Meanwhile the trains got more crowded. Ridership in the first half of 2026 was up about eleven percent on a year earlier.

**ID:** Sementara itu kereta makin padat. Jumlah penumpang semester pertama 2026 naik sekitar sebelas persen dibanding tahun sebelumnya.

*Visual:* footage nyata CC BY `s34-s36-kepadatan.mp4`

*Sumber:* [Penumpang komuter KAI naik 11,3% year-on-year di semester I 2026](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/)

### s35 · body

**EN:** That's about one point one million trips a day. The operator had planned for three to four percent growth, not eleven.

**ID:** Itu sekitar satu koma satu juta perjalanan per hari. Operatornya merencanakan pertumbuhan tiga sampai empat persen, bukan sebelas.

*Visual (R3, satu per kalimat):*
1. [object/cut] seratus sepuluh titik menyala hijau, satu titik satu juta perjalanan → titik menyala satu per satu sampai seratus sepuluh · label: "1.1 M TRIPS"@million
2. [object/wipe] dua batang: rencana pendek, kenyataan tinggi → batang kenyataan tumbuh melewati rencana · label: "PLANNED 3-4%"@three, "ACTUAL 11%"@eleven

*Sumber:* [Ridership harian sekitar 1,1 juta](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/) · [Pertumbuhan 11,5% semester I 2026, jauh di atas proyeksi awal 3 sampai 4%](https://investortrust.id/business/121803/kai-scraps-plan-to-import-used-japanese-commuter-trains-prioritizes-domestic-fleet)

### s36 · body

**EN:** On the busiest days, the count can reach one point three million. That's two hundred thousand more trips than an ordinary day.

**ID:** Di hari tersibuk, jumlahnya bisa mencapai satu koma tiga juta. Itu dua ratus ribu perjalanan lebih banyak dari hari biasa.

*Visual (R3, satu per kalimat):*
1. [object/cut] seratus tiga puluh titik menyala, penumpang padat di peron → titik menyala sampai seratus tiga puluh · label: "1.3 M"@million
2. [object/cut] dua puluh titik merah tambahan di atas seratus sepuluh hijau → dua puluh titik merah menyala di ujung · label: "+200,000"@thousand

*Sumber:* [1,1 juta penumpang per hari; pada hari tertentu bisa 1,3 juta](https://www.metrotvnews.com/play/NxGCXq5a-dulu-ditolak-kini-indonesia-mau-impor-krl-bekas-dari-jepang) · [Pertumbuhan jauh melampaui proyeksi awal 3 sampai 4 persen](https://investortrust.id/business/121803/kai-scraps-plan-to-import-used-japanese-commuter-trains-prioritizes-domestic-fleet)

### s37 · body

**EN:** The operator calculated it needs one hundred and five trains. It has one hundred and two.

**ID:** Operatornya menghitung butuh seratus lima rangkaian. Yang tersedia seratus dua.

*Visual (R3, satu per kalimat):*
1. [object/cut] seratus lima gerbong kecil tersusun di rak → gerbong muncul satu per satu sampai seratus lima · label: "105 TRAINS"@five
2. [object/cut] seratus dua merah, tiga tempat kosong abu-abu → tiga tempat tersisa kosong · label: "102 HAVE"@two

*Sumber:* [Operator memperkirakan butuh 105 rangkaian, tersedia 102](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/)

### s38 · body

**EN:** And the gap was about to grow. Thirteen former Tokyo Metro trains were due to retire this year.

**ID:** Dan kekurangannya akan membesar. Tiga belas rangkaian eks Tokyo Metro dijadwalkan pensiun tahun ini.

*Visual (R3, satu per kalimat):*
1. [object/cut] dua batang: kebutuhan seratus lima, punya seratus dua, selisih menyala → selisih berdenyut di puncak · label: "GAP"@gap
2. [object/push] tiga belas gerbong biru-hijau Tokyo Metro dicoret satu per satu → gerbong muncul, silang menimpanya · label: "13 TRAINS"@Thirteen

*Sumber:* [13 rangkaian eks Tokyo Metro seri 6000 akan ditarik tahun ini](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/)

### s39 · body

**EN:** A new train takes one to two years from order to delivery. An order signed in January 2026 would arrive in 2027 at the earliest.

**ID:** Kereta baru butuh satu sampai dua tahun dari pesan sampai datang. Pesanan yang diteken Januari 2026 paling cepat baru datang di 2027.

*Visual (R3, satu per kalimat):*
1. [place/cut] jam berputar di samping pabrik, kereta baru belum selesai → jarum jam berputar, kereta setengah jadi · label: "1-2 YEARS"@years
2. [map/wipe] garis waktu 2026 ke 2028, penanda di 2027 → titik berjalan dari 2026 ke 2027 dan berhenti · label: "JAN 2026"@January, "2027"@2027

*Sumber:* [Kereta baru butuh satu sampai dua tahun sejak dipesan](https://afu.id/ekonomi/dirut-kai-batalkan-impor-23-krl-bekas-jepang-yang-sudah-disetujui-dpr-ini-alasannya)

### s40 · rehook

**EN:** So in September 2026, Jakarta went back to Tokyo.

**ID:** Maka September 2026, Jakarta kembali melirik Tokyo.

*Visual (R3, satu per kalimat):*
1. [map/iris] peta: kapal berbalik arah dari Jakarta menuju Tokyo → kapal berlayar ke arah Tokyo, garis menyala · label: "SEPT 2026"@September

### s41 · body

**EN:** On September 23, the head of the national railway asked parliament to allow used Japanese trains again, as a stopgap for 2026 and 2027.

**ID:** Tanggal 23 September, pimpinan KAI meminta DPR mengizinkan lagi kereta bekas Jepang, sebagai tambalan untuk 2026 dan 2027.

*Visual (R3, satu per kalimat):*
1. [place/cut] dokumen permintaan terbang dari kereta ke gedung DPR → dokumen melayang ke gedung, tanggal berdenyut · label: "SEPT 23"@23, "STOPGAP"@stopgap

*Sumber:* [Usulan impor EMU bekas Jepang ke DPR pada 23 September sebagai langkah sementara](https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/)

### s42 · body

**EN:** Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industry.

**ID:** Komisi VI DPR setuju. Rencananya dua puluh tiga rangkaian bekas, dengan satu syarat: industri kereta dalam negeri tetap diperkuat.

*Visual (R3, satu per kalimat):*
1. [place/cut] gedung DPR, centang hijau besar menyala di atasnya → centang menyala, gedung diterangi · label: "AGREED"@agreed
2. [place/push] dua puluh tiga gerbong dan pabrik kecil, satu syarat bercahaya → gerbong muncul sampai dua puluh tiga, pabrik berasap · label: "23 USED TRAINS"@twenty-three, "ONE CONDITION"@condition

*Sumber:* [Komisi VI DPR menyetujui usulan impor KRL bekas dari Jepang (28 Sept 2026)](https://katadata.co.id/infografik/6ab9d5bf9a9fd/infografik-impor-krl-eks-jepang-kembali-diizinkan) · [Rencana impor 23 rangkaian; syarat tetap meningkatkan industri perkeretaapian dalam negeri](https://katadata.co.id/amp/finansial/makro/6aec65cdc2b9f/kai-batalkan-impor-krl-bekas-23-trainset-akan-dipasok-dari-dalam-negeri)

### s43 · body

**EN:** The pressure behind that vote was a forecast of three hundred and sixty-nine million passenger trips in 2026. Every missing train makes the remaining ones fuller. Everyone in this story wanted something different. The railway wanted trains within months. Parliament wanted the home train industry kept growing. Japan wanted old trains off its books. And the trade ministry had a cap on how old a used machine can be.

**ID:** Tekanan di balik pemungutan suara itu adalah prakiraan tiga ratus enam puluh sembilan juta perjalanan penumpang pada 2026. Setiap kereta yang hilang membuat sisanya makin penuh. Setiap pihak di cerita ini menginginkan hal yang berbeda. Kereta api menginginkan kereta dalam hitungan bulan. DPR ingin industri kereta dalam negeri terus tumbuh. Jepang ingin kereta tuanya keluar dari pembukuan. Dan Kementerian Perdagangan punya batas umur untuk mesin bekas.

*Visual (R3, satu per kalimat):*
1. [place/cut] peron sesak dan batang tinggi yang tumbuh → batang prakiraan tumbuh, orang berdatangan · label: "369 M TRIPS"@million
2. [place/wipe] kereta hilang satu, peron makin penuh → kerumunan menebal, satu kereta dicoret · label: "FULLER"@fuller
3. [place/cut] empat pihak berjajar: kereta KAI, gedung DPR, Sepuh Jepang, Pak Aturan → keempatnya muncul satu per satu dengan pantulan · label: "4 WANTS"@something
4. [object/wipe] kereta KAI di samping jam cepat, penumpang menunggu → jarum jam berputar cepat, kereta bergeser · label: "WITHIN MONTHS"@months
5. [place/cut] DPR menunjuk pabrik INKA, pabrik mengembang dan berasap → panah dari gedung ke pabrik, pabrik membesar · label: "HOME INDUSTRY"@home
6. [place/push] Sepuh Jepang dengan tumpukan koin biaya, silang menimpa koin → koin menghilang, Sepuh lega · label: "OFF ITS BOOKS"@books
7. [object/cut] Pak Aturan membanting stempel ke batas umur pada dokumen → stempel menghantam, dokumen bergetar · label: "A CAP"@cap

*Sumber:* [Proyeksi penumpang KRL diestimasi 369 juta penumpang sepanjang 2026](https://katadata.co.id/infografik/6ab9d5bf9a9fd/infografik-impor-krl-eks-jepang-kembali-diizinkan)

### s44 · body

**EN:** To be fair, the argument was time. A used train could arrive in one to two months. A new one takes one to two years.

**ID:** Jujur saja, argumennya waktu. Kereta bekas bisa datang dalam satu sampai dua bulan. Kereta baru butuh satu sampai dua tahun.

*Visual:* footage nyata stok: cargo ship at sea, container ship ocean

*Sumber:* [Pengadaan KRL bekas sekitar satu sampai dua bulan, kereta baru satu sampai dua tahun sejak](https://afu.id/ekonomi/dirut-kai-batalkan-impor-23-krl-bekas-jepang-yang-sudah-disetujui-dpr-ini-alasannya)

### s45 · body

**EN:** Then it hit a rule. Indonesia's trade ministry only allows used capital goods like these up to twenty years old.

**ID:** Lalu rencananya menabrak aturan. Kementerian Perdagangan hanya mengizinkan barang modal bekas seperti ini maksimal berumur dua puluh tahun.

*Visual (R3, satu per kalimat):*
1. [object/cut] Pak Aturan mengangkat stempel besar di depan Komo → stempel naik, Komo menoleh kaget · label: "A RULE"@rule
2. [map/wipe] garis umur nol sampai tiga puluh tahun, batas dua puluh dengan cahaya merah → titik berjalan sampai dua puluh dan berhenti · label: "20 YEARS MAX"@twenty

*Sumber:* [Ketentuan Kementerian Perdagangan: usia maksimal 20 tahun](https://ekonomi.bisnis.com/read/20261003/98/2009402/impor-krl-bekas-terganjal-usia-kereta)

### s46 · body

**EN:** The trains on offer were twenty-five to twenty-eight years old. On average, they had been carrying passengers in Japan since 1998.

**ID:** Kereta yang ditawarkan berumur dua puluh lima sampai dua puluh delapan tahun. Rata-rata sudah mengangkut penumpang di Jepang sejak 1998.

*Visual (R3, satu per kalimat):*
1. [map/cut] garis umur dengan batas dua puluh dan kereta tawaran di dua puluh lima sampai dua puluh delapan → titik melewati batas lalu berhenti di dua puluh delapan · label: "25-28 YEARS"@twenty-five
2. [map/push] garis waktu 1995 ke 2026, Sepuh bekerja sejak 1998 → titik mulai dari 1998 dan berjalan sampai kini · label: "SINCE 1998"@1998

*Sumber:* [KAI berencana impor KRL dengan usia pakai 25 tahun](https://ekonomi.bisnis.com/read/20261003/98/2009402/impor-krl-bekas-terganjal-usia-kereta) · [Rata-rata kereta berumur 28 tahun, dipakai sejak 1998](https://ekonomi.bisnis.com/read/20261110/98/2020013/3-pertimbangan-kai-batal-impor-krl-bekas-jepang)

### s47 · body

**EN:** The transport ministry added another problem. Hand-me-downs wear out. A train used for twenty to thirty years in Japan might have only about ten years left. After that, Jakarta would be shopping for trains again.

**ID:** Kementerian Perhubungan menambah satu masalah. Barang bekas turunan ada batas pakainya. Kereta yang sudah dipakai dua puluh sampai tiga puluh tahun di Jepang mungkin cuma tersisa sekitar sepuluh tahun. Setelah itu, Jakarta harus belanja kereta lagi.

*Visual (R3, satu per kalimat):*
1. [object/cut] Pak Aturan dari Kementerian Perhubungan membawa dokumen baru → dokumen baru dilempar ke tengah · label: "TRANSPORT MINISTRY"@transport
2. [object/push] kemeja turunan Komo berlubang dan melorot → lubang bermunculan di kemeja, Komo menunduk · label: "WEAR OUT"@wear
3. [map/wipe] garis umur dua puluh ke tiga puluh, hanya sepuluh tahun tersisa bercahaya → titik berjalan dari dua puluh ke tiga puluh dan habis · label: "~10 YEARS LEFT"@ten
4. [place/cut] Komo dengan tas belanja di depan etalase kereta baru → Komo menggaruk kepala, tas belanja bergoyang · label: "SHOPPING AGAIN"@shopping

*Sumber:* [Sisa masa pakai diprediksi hanya 10 tahun, karena sudah dipakai 20 sampai 30 tahun di Jepa](https://ekonomi.bisnis.com/read/20261010/98/2011478/kemenhub-ingin-pt-kai-punya-krl-baru-bukan-bekas)

### s48 · body

**EN:** Old trains are also harder to keep running. When three Japanese series retired in 2025, one stated reason was that their spare parts had run out.

**ID:** Kereta tua juga makin sulit dirawat. Saat tiga seri Jepang pensiun di 2025, salah satu alasannya adalah suku cadangnya sudah habis.

*Visual (R3, satu per kalimat):*
1. [object/cut] Sepuh berkeringat dan berkarat, kabut karat di badannya → keringat menetes, Sepuh terbatuk · label: "HARDER"@harder
2. [place/push] rak suku cadang kosong, Sepuh melihat dengan sedih → kotak kecil muncul lalu lenyap satu per satu, silang menimpa · label: "NO SPARE PARTS"@parts

*Sumber:* [Seri 8500, 7000, dan 203 pensiun karena usia dan habisnya suku cadang](https://rri.co.id/en/archipelago/1967107/jakarta-s-legendary-krl-trains-retired-after-decades-of-service) · [Suku cadang kereta bekas Jepang susah didapat karena banyak yang sudah tidak diproduksi](https://katadata.co.id/berita/2019/08/21/candu-impor-kereta-bekas-jepang)

### s49 · body

**EN:** On November 5, the railway's chief executive cancelled the plan. His words: for the public, it must be new.

**ID:** Tanggal 5 November, direktur utama KAI membatalkan rencana itu. Katanya: untuk rakyat, harus yang baru.

*Visual (R3, satu per kalimat):*
1. [object/cut] dokumen rencana impor dicoret merah besar → stempel silang menimpa dokumen · label: "NOV 5"@5, "CANCELLED"@cancelled
2. [place/wipe] kereta baru berkilau dengan centang, Komo menoleh → kilau menyapu kereta, centang muncul · label: "MUST BE NEW"@new

*Sumber:* [Dirut KAI 5 Nov: kami tidak impor bekas, untuk rakyat harus yang baru](https://katadata.co.id/amp/finansial/makro/6aec65cdc2b9f/kai-batalkan-impor-krl-bekas-23-trainset-akan-dipasok-dari-dalam-negeri) · [KAI memastikan tidak mengimpor KRL bekas Jepang](https://finance.detik.com/infrastruktur/d-8740270/impor-krl-bekas-akhirnya-batal)

### s50 · rehook

**EN:** You might guess Japan ran out of trains. It didn't. Japan still has trains to sell, but they are too old for Indonesia's own rule.

**ID:** Mungkin kamu menebak Jepang kehabisan kereta. Ternyata tidak. Jepang masih punya kereta untuk dijual, tapi terlalu tua untuk aturan Indonesia sendiri.

*Visual (R3, satu per kalimat):*
1. [place/cut] depo Tokyo tanpa kereta dan Komo mengangkat bahu → bayangan gerbong hilang, Komo menggaruk kepala · label: "RAN OUT?"@ran
2. [place/push] depo Tokyo penuh kereta, Komo terkejut dan tanda silang muncul di atas tebakan → kereta muncul memenuhi depo, silang menimpa tanda tanya
3. [object/wipe] kereta Tokyo tua di samping Pak Aturan yang menunjuk batas umur → stempel menghantam, kereta tertunduk · label: "TOO OLD"@old

*Sumber:* [KRL bekas berusia 25 tahun, ketentuan maksimal 20 tahun](https://ekonomi.bisnis.com/read/20261003/98/2009402/impor-krl-bekas-terganjal-usia-kereta)

### s51 · body

**EN:** Japan keeps its commuter trains for twenty to thirty years. By the time a car is free to sell, it's usually past Jakarta's limit.

**ID:** Jepang memakai kereta komuternya dua puluh sampai tiga puluh tahun. Saat gerbongnya siap dijual, umurnya biasanya sudah lewat batas Jakarta.

*Visual (R3, satu per kalimat):*
1. [map/cut] garis umur dua puluh sampai tiga puluh tahun, Sepuh di ujungnya → titik berjalan dari dua puluh ke tiga puluh · label: "20-30 YEARS"@thirty
2. [map/push] garis umur dengan batas merah dan kereta dijual di dua puluh delapan → titik melewati batas merah dan berhenti · label: "PAST LIMIT"@past

*Sumber:* [Usia penggunaan di Jepang sekitar 20 sampai 30 tahun](https://ekonomi.bisnis.com/read/20261010/98/2011478/kemenhub-ingin-pt-kai-punya-krl-baru-bukan-bekas)

### s52 · body

**EN:** The window that opened in 2000 closed on its own. The supply that made Jakarta's network cheap now ages out before it can be shipped.

**ID:** Jendela yang terbuka tahun 2000 tertutup dengan sendirinya. Pasokan yang membuat jaringan Jakarta murah sekarang keburu tua sebelum bisa dikirim.

*Visual (R3, satu per kalimat):*
1. [map/cut] garis waktu 2000 ke 2026, jendela terbuka lalu menutup sendiri → titik berjalan, silang menutup jendela di ujung · label: "2000"@2000
2. [object/wipe] Sepuh pucat di samping kapal, silang menimpa kapal → Sepuh memudar saat silang menutup jalur kapal · label: "AGES OUT"@ages

### s53 · body

**EN:** So what do commuters ride next? The operator had three options: order from INKA, keep the old trains running longer, or import used ones.

**ID:** Jadi penumpang naik apa berikutnya? Operatornya punya tiga pilihan: pesan ke INKA, memperpanjang umur kereta lama, atau impor bekas.

*Visual (R3, satu per kalimat):*
1. [place/cut] Komo dan penumpang menunggu di peron kosong, Komo mengangkat bahu → penumpang melirik ke ujung rel · label: "WHAT NEXT?"@next
2. [object/push] tiga panggung: pabrik INKA, Sepuh tua, kapal impor → ketiganya muncul berurutan · label: "3 OPTIONS"@three

*Sumber:* [KAI punya tiga opsi: pesan ke INKA, perpanjang usia kereta yang ada, impor bekas](https://ekonomi.bisnis.com/read/20261110/98/2020013/3-pertimbangan-kai-batal-impor-krl-bekas-jepang)

### s54 · body

**EN:** With imports off the table, that leaves two. Old Japanese cars stay in service longer, and INKA has to build faster. Some of those cars are already past forty.

**ID:** Karena impor dicoret, tinggal dua. Gerbong Jepang lama dipakai lebih lama, dan INKA harus membuat lebih cepat. Sebagian gerbong itu umurnya sudah lewat empat puluh tahun.

*Visual (R3, satu per kalimat):*
1. [object/cut] kapal impor dengan silang besar, tiga gerbong menunggu → silang menimpa kapal · label: "NO IMPORTS"@imports
2. [place/wipe] Sepuh bertahan di kiri, pabrik INKA mempercepat di kanan → jam berputar cepat di pabrik · label: "BUILD FASTER"@faster
3. [place/cut] Sepuh di samping kue berlilin empat puluhan → lilin menyala, Sepuh menarik napas · label: "PAST 40"@forty

*Sumber:* [Opsi tersisa: produksi INKA dan perpanjangan usia rangkaian yang beroperasi](https://ekonomi.bisnis.com/read/20261110/98/2020013/3-pertimbangan-kai-batal-impor-krl-bekas-jepang)

### s55 · body

**EN:** The money for new trains was already approved. A year earlier, the government set aside five trillion rupiah for thirty new trains, due within a year.

**ID:** Dananya sudah disetujui. Setahun sebelumnya, pemerintah menyiapkan lima triliun rupiah untuk tiga puluh rangkaian baru, ditargetkan selesai dalam setahun.

*Visual (R3, satu per kalimat):*
1. [object/cut] dokumen anggaran dengan centang besar → centang menyala di dokumen · label: "APPROVED"@approved
2. [object/wipe] tumpukan koin lima triliun dan tiga puluh gerbong baru di sampingnya → koin menumpuk, gerbong muncul tiga puluh · label: "RP 5 T"@trillion, "30 TRAINS"@thirty

*Sumber:* [Setahun sebelum pembatalan, anggaran Rp5 triliun disetujui untuk 30 rangkaian KRL baru, ta](https://afu.id/ekonomi/dirut-kai-batalkan-impor-23-krl-bekas-jepang-yang-sudah-disetujui-dpr-ini-alasannya)

### s56 · payoff

**EN:** The longer plan is to replace eighty-four old Japanese trains with INKA-built ones, and raise capacity from one point one to one point four million passengers a day by 2030.

**ID:** Rencana jangka panjangnya mengganti delapan puluh empat rangkaian Jepang tua dengan buatan INKA, dan menaikkan kapasitas dari satu koma satu ke satu koma empat juta penumpang per hari pada 2030.

*Visual (R3, satu per kalimat):*
1. [object/cut] delapan puluh empat gerbong tersusun, garis waktu 2026 ke 2030 di bawahnya → gerbong muncul satu per satu, titik waktu berjalan ke 2030 · label: "84 TRAINS"@eighty-four, "1.4 M DAILY"@four

*Sumber:* [Program jangka panjang mengganti 84 EMU bekas Jepang (rata-rata 40 tahun) dengan buatan IN](https://www.railjournal.com/passenger/commuter-rail/indonesia-pursues-major-fleet-modernisation/)

### s57 · payoff

**EN:** For twenty-five years, Tokyo's old trains let Jakarta grow a rail network it couldn't afford to buy new. Then the hand-me-downs aged out of the rule, and the next trains have to be built at home. So the refusal in November came from Tokyo's closet, which had nothing left that was young enough.

**ID:** Selama dua puluh lima tahun, kereta tua Tokyo membuat Jakarta bisa membangun jaringan kereta yang tak sanggup dibeli baru. Lalu baju turunan itu terlalu tua untuk aturan, dan kereta berikutnya harus dibuat di dalam negeri. Jadi penolakan November datang dari lemari Tokyo, yang sudah tidak punya yang cukup muda.

*Visual (R3, satu per kalimat):*
1. [map/iris] peta: kapal-kapal pembawa kereta Tokyo berlayar ke Jakarta selama dua puluh lima tahun → kapal bergantian berlayar, garis menebal · label: "25 YEARS"@twenty-five
2. [place/wipe] Sepuh tua melewati stempel Pak Aturan, pabrik membuat kereta baru di kanan → stempel menghantam, pabrik mengeluarkan kereta · label: "HOME-BUILT"@home
3. [object/push] Komo di depan lemari kosong, hanya satu kemeja berlubang tergantung; penolakan November bermula dari lemari ini → lemari kosong bergoyang, kemeja berlubang jatuh · label: "NOVEMBER"@November

### s58 · cta

**EN:** Those trains carry people to and from one island that holds more than half of Indonesia. Next video: why so many Indonesians live on Java.

**ID:** Kereta-kereta itu mengangkut orang di satu pulau yang dihuni lebih dari separuh penduduk Indonesia. Video berikutnya: kenapa begitu banyak orang Indonesia tinggal di Jawa.

*Visual (R3, satu per kalimat):*
1. [map/push] peta zoom ke pulau Jawa, lebih dari separuh titik penduduk menyala → kamera masuk ke Jawa, titik menyala sampai lebih dari separuh · label: "OVER HALF"@half
2. [object/iris] pulau Jawa raksasa dikelilingi banyak orang → kerumunan mengisi pulau, kamera menjauh · label: "WHY JAVA?"@Java

*Sumber:* [Jawa dihuni lebih dari separuh penduduk Indonesia (verifikasi angka BPS di siklus 002)](https://en.wikipedia.org/wiki/Java)
