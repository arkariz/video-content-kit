# Naskah: T02 siklus 002-why-half-lives-on-one-island (DRAFT, menunggu persetujuan kreator)

Judul kerja: Why Half of Indonesia Lives on One Island
Janji: After watching, you can explain why more than half of Indonesia lives on Java, and why 75 years of moving people off the island barely changed that.
Gaya: R3 ilustrasi gerak penjelas (`instruksi/referensi/gaya-visual.md`) + cerita (`instruksi/referensi/gaya-cerita.md`). Variasi B V2 (perbandingan dengan data, hook angka dulu).
49 scene · 1297 kata EN · perkiraan 9:00 (153 kata/menit + jeda; long-form wajib ≥ 8:00 setelah TTS) · 104 shot · footage nyata: s08, s14, s44.

Peta re-hook: s03 (0:17) · s04 (0:28) · s07 (1:01) · s13 (2:21) · s20 (3:46) · s21 (4:00) · s28 (5:06) · s37 (6:26) · s43 (7:44) · s48 (8:34)
Konsep baru (anggaran maks 8): abu vulkanik (s09), tanah tercuci hujan (s11), sawah (s14), ladang berpindah (s18), Sistem Tanam Paksa (s22), transmigrasi (s30), Keluarga Berencana (s38). Total 7, jarak antar konsep ≥ 45 detik.
Chapters: 0:00 One island, 158 million people · 0:40 The ground · 2:33 A field that pays for more hands · 4:00 The Dutch decision · 5:17 Moving people off Java · 6:39 What actually slowed Java · 7:56 Why the crowd stays · 8:34 Back to the fridge

## Checklist cerita (instruksi/referensi/gaya-cerita.md)
- [x] Scene 1 "you" di momen kunci, 2 kalimat, hook terkunci V2 (angka dulu: pulau seluas Inggris, 158 juta orang): s01
- [x] Satu analogi di fondasi dan penutup: kulkas yang mengisi dirinya sendiri, s10 → s28 (lebih banyak mulut daripada rak) → s48 (kulkas masih terisi, yang membuat penuh sekarang kerumunannya)
- [x] Tebakan dipatahkan: s07 (Jawa pulau yang mudah? justru deretan gunung api), s12 (semua abu vulkanik subur? tidak), s32–s34 (transmigrasi mengosongkan Jawa? Jawa +95 juta)
- [x] Mesin insentif: s16–s17 ("There's one thing you need to know about a sawah": tiap jam tambahan dibalas, satu anak lagi = sepasang tangan lagi), s24 (insentif Belanda menjaga kerja di Jawa)
- [x] Callback dengan twist: s29 (155 keluarga di kapal 1905) → s41 (2025: 1.394 keluarga, sekitar pertambahan Jawa dalam satu hari)
- [x] Momen jujur/steelman: s35–s36 (transmigrasi memang mengubah peta: tiga perempat penduduk Lampung keturunan pendatang, membangun kabupaten dan kota), plus koreksi s12 dan s20 (hitungan Raffles kemungkinan terlalu rendah)
- [x] Penutup membingkai ulang + ajakan spesifik: s48 (kulkas membangun kerumunan, kerumunan menahan dirinya sendiri), s49 (tonton T02-001 kereta Tokyo)

## Cek gaya visual (gaya-visual.md bagian 7)
- [x] Setiap kalimat di scene non-footage punya shot (104 shot, validateR3 tanpa error).
- [x] Setiap shot punya `motion`; label memakai `word` yang ada di kalimatnya.
- [x] Jangkar peta muncul di fondasi (s02, s05), tengah (s25, s32–s34, s37), penutup (s45–s49).
- [x] Angka penting punya `count` (158 juta, 7%, 9,2 juta, +95 juta, 4×, 35 aktif, 1/5, 1/3, 6×, 75/100, 65→56, 1.394).
- [x] Bubble 3 kali (s10, s20, s48), semuanya sikap, tanpa klaim fakta.
- [x] Tanpa papan teks. Sumber tampil sebagai catatan kaki kecil (bukti kreator: data berbahasa Indonesia).
- [ ] `04-shots.tsx` belum ditulis (tugas agent repo, lihat produksi/PIPELINE.md bagian Mesin R3).

## One island, 158 million people (0:00)

### s01 · hook · R3 · ±0:00
EN: You're standing on an island the size of England. A hundred and fifty-eight million people live on it with you.
ID: Kamu berdiri di sebuah pulau seluas Inggris. Seratus lima puluh delapan juta orang tinggal di pulau itu bersamamu.
Shots: 1. Komo berdiri di pematang sawah di Jawa saat pagi, lalu peta Jawa ditumpuk tepat di atas siluet England dengan ukuran yang sama [cut] | 2. dari udara, titik-titik orang muncul memenuhi pulau Jawa dari barat ke timur sampai pulau terang penuh [hold]
Sumber: [SUPAS 2025: penduduk Indonesia 284,67 juta, 55,65% di Jawa (sekitar 158 juta)](https://kabar24.bisnis.com/read/20260505/15/1971460/sensus-bps-jumlah-penduduk-ri-capai-28467-juta-jiwa-2025-tumbuh-melambat); [Luas Jawa sekitar 132.600 km² termasuk Madura](https://en.wikipedia.org/wiki/Java); [Luas England 130.278 km²](https://www.britannica.com/summary/England)

### s02 · body · R3 · ±0:08
EN: That's more people than all of Russia. It's also more than half of Indonesia, on about seven percent of the country's land.
ID: Lebih banyak dari seluruh penduduk Rusia. Juga lebih dari separuh Indonesia, di sekitar tujuh persen daratannya.
Shots: 1. dua panel: Jawa yang padat titik di kiri, Rusia yang luas dengan titik lebih sedikit di kanan [wipe] | 2. peta Indonesia utuh, daratan dibagi grid kotak, hanya 7 kotak dari 100 yang menyala di Jawa tetapi separuh titik penduduk berkumpul di sana [wipe]
Sumber: [Penduduk Rusia 146,0 juta per 1 Januari 2025 (Rosstat)](https://tass.com/society/1907243); [Jawa sekitar 7% luas daratan Indonesia, 56,1% penduduk (SP2020)](https://databoks.katadata.co.id/en/demographics/statistics/4e9e52829d77f4b/more-than-half-of-indonesias-population-lives-on-java); [55,65% penduduk di Jawa (SUPAS 2025)](https://kabar24.bisnis.com/read/20260505/15/1971460/sensus-bps-jumlah-penduduk-ri-capai-28467-juta-jiwa-2025-tumbuh-melambat)

### s03 · rehook · R3 · ±0:17
EN: For seventy-five years, Indonesia has been moving people off this island. It has moved more than nine million. Java grew anyway, by about ninety-five million.
ID: Selama tujuh puluh lima tahun, Indonesia memindahkan orang dari pulau ini. Lebih dari sembilan juta sudah dipindah. Jawa tetap bertambah, sekitar sembilan puluh lima juta.
Shots: 1. kapal kecil berangkat dari pantai utara Jawa membawa keluarga ke pulau-pulau lain di peta [cut] | 2. titik-titik orang mengalir keluar dari Jawa lewat garis rute [hold] | 3. di saat yang sama Jawa menggembung, titik baru bermunculan jauh lebih cepat dari yang keluar [hold]
Sumber: [Sejak 1950 transmigrasi memindahkan sekitar 2,2 juta KK atau 9,2 juta jiwa (Kementerian Transmigrasi)](https://timesindonesia.co.id/liputan-khusus/570490/tak-harus-ke-luar-negeri-transmigrasi-tawarkan-peluang-ekonomi-baru); [Jawa sekitar 63 juta jiwa pada 1961](https://journal.student.uny.ac.id/ilmu-sejarah/article/download/16594/16054); [Jawa sekitar 158 juta jiwa pada 2025](https://kabar24.bisnis.com/read/20260505/15/1971460/sensus-bps-jumlah-penduduk-ri-capai-28467-juta-jiwa-2025-tumbuh-melambat)

### s04 · payoff · R3 · ±0:28
EN: The short answer is under your feet. Java's ground can feed a lot of people from a small field, and once the people came, everything else followed them.
ID: Jawaban singkatnya ada di bawah kakimu. Tanah Jawa bisa memberi makan banyak orang dari petak yang kecil, dan setelah orangnya datang, semua hal lain menyusul.
Shots: 1. kamera menukik dari peta ke kaki Komo di pematang, lalu menembus tanah ke lapisan tanah gelap berbutir mineral [iris] | 2. satu petak sawah menghasilkan tumpukan karung beras yang memberi makan barisan keluarga, lalu jalan, pabrik, dan kota tumbuh di sekitar barisan itu [push]
Sumber: [Tanah Jawa sangat subur karena diperkaya abu vulkanik secara berkala](https://kids.britannica.com/students/article/Java/327496); [Jawa menyumbang 56,93% PDB Indonesia 2025](https://www.bps.go.id/id/pressrelease/2026/02/05/2546/ekonomi-indonesia-tahun-2025-tumbuh-5-11-persen)

## The ground (0:40)

### s05 · body · R3 · ±0:40
EN: Start with the map. Java is one of five big islands, and two of them, Sumatra and Borneo, are far bigger.
ID: Mulai dari peta. Jawa satu dari lima pulau besar, dan dua di antaranya, Sumatra dan Kalimantan, jauh lebih besar.
Shots: 1. peta Indonesia (jangkar) muncul dari laut, lima pulau besar terangkat satu per satu [cut] | 2. Sumatra dan Kalimantan membesar dan bersinar, Jawa terlihat kecil di bawahnya [hold]
Sumber: [Jawa pulau terbesar kelima di Indonesia](https://en.wikipedia.org/wiki/Java)

### s06 · body · R3 · ±0:49
EN: Indonesia's part of Borneo alone is about four times the size of Java. It holds about one Indonesian in sixteen, roughly thirty people per square kilometre against Java's twelve hundred.
ID: Bagian Kalimantan milik Indonesia saja sekitar empat kali luas Jawa. Isinya hanya sekitar satu dari enam belas orang Indonesia, kira-kira tiga puluh orang per kilometer persegi, dibanding seribu dua ratus di Jawa.
Shots: 1. empat potongan Jawa ditumpuk berjejer di atas Kalimantan sampai menutup pulau itu [wipe] | 2. dua kotak satu kilometer persegi berdampingan: kotak Kalimantan dengan 30 orang kecil, kotak Jawa dengan 1.200 orang berdesakan [cut]
Sumber: [Kalimantan luasnya empat kali Jawa dan dihuni 6,15% penduduk (SP2020)](https://www.thejakartapost.com/news/2021/05/23/indonesia-remains-java-centric-despite-jokowis-infrastructure-campaign.html); [Kepadatan Jawa sekitar 1.190 jiwa/km²](https://en.wikipedia.org/wiki/Java)
Catatan: Kepadatan Kalimantan ±30/km² dihitung dari 6,15% × 270 juta ÷ ±530 ribu km²; cek ulang ke BPS sebelum render.

### s07 · rehook · R3 · ±1:01
EN: So you'd guess Java won because it was the easy island, flat and calm. It's the opposite. A chain of volcanoes runs down its spine, and thirty-five of them are active.
ID: Jadi mungkin kamu menebak Jawa menang karena pulaunya mudah, datar dan tenang. Justru terbalik. Deretan gunung api membentang di punggungnya, dan tiga puluh lima masih aktif.
Shots: 1. Komo membayangkan Jawa sebagai dataran hijau yang rata dan damai, gambar itu pudar seperti mimpi [cut] | 2. gambar datar itu retak dan jatuh, di baliknya muncul Jawa yang bergunung [hold] | 3. dari samping, deretan gunung api berdiri di sepanjang punggung pulau, 35 puncak mengepulkan asap [push]
Sumber: [Jawa punya 112 gunung api, 35 di antaranya aktif](https://kids.britannica.com/students/article/Java/327496)

### s08 · body · footage · ±1:15
EN: People don't keep away from them either. On the slopes of Merapi, the most active volcano on Java, farmers leave when it erupts and come back to the same fields.
ID: Orang juga tidak menjauh dari gunung itu. Di lereng Merapi, gunung api paling aktif di Jawa, petani mengungsi saat gunung meletus lalu kembali ke ladang yang sama.
Footage: merapi volcano farmland, volcano village java farmers, mount merapi (hindari: lava closeup night, drone selfie)
Sumber: [Merapi gunung api paling aktif di Jawa; banyak orang tetap tinggal di sana sebagai petani](https://www.degruyterbrill.com/document/doi/10.1515/opag-2022-0122/html?lang=en); [Warga mengungsi saat erupsi dan kembali setelah bahaya lewat](https://journal.ugm.ac.id/jae/article/download/82362/37573)

### s09 · body · R3 · ±1:27
EN: The reason is what the volcano leaves behind. Volcanic ash is crushed rock full of minerals that plants need. Every eruption sprinkles a fresh layer over the fields.
ID: Alasannya ada pada yang ditinggalkan gunung itu. Abu vulkanik adalah batuan halus penuh mineral yang dibutuhkan tanaman. Tiap letusan menaburkan lapisan baru di atas ladang.
Shots: 1. puncak gunung meletus kecil, awan abu mengembang dan melayang ke arah ladang di bawahnya [cut] | 2. kamera masuk ke satu butir abu: batuan pecah berisi butir mineral berwarna [iris] | 3. abu turun seperti salju tipis di atas sawah, lalu tunas padi tumbuh menembusnya [push]
Sumber: [Tanah Jawa subur karena diperkaya abu vulkanik secara berkala](https://kids.britannica.com/students/article/Java/327496); [Batuan Jawa sebagian besar andesit vulkanik; tanah dari material andesit termasuk yang paling subur](https://www.britannica.com/place/Indonesia/Soils)

### s10 · body · R3 · ±1:38
EN: Think of Java's soil as a fridge that restocks itself. Every harvest takes food off the shelves, and every so often the mountain fills them back up.
ID: Bayangkan tanah Jawa sebagai kulkas yang mengisi dirinya sendiri. Setiap panen mengambil makanan dari raknya, dan sesekali gunung itu mengisinya kembali.
Shots: 1. pulau Jawa berubah bentuk menjadi kulkas besar dengan gunung api di atasnya, pintunya terbuka memperlihatkan rak penuh beras dan sayur [push] | 2. tangan petani mengambil karung beras dari rak, lalu gunung di atas kulkas batuk abu dan rak terisi lagi [hold]

### s11 · body · R3 · ±1:49
EN: Most tropical soil works the other way. Heavy rain washes the minerals down and out of reach. On much of Borneo, the fridge was emptied long ago, and nothing refills it.
ID: Tanah tropis umumnya sebaliknya. Hujan deras mencuci mineralnya jauh ke bawah. Di banyak bagian Kalimantan, kulkasnya sudah lama kosong, dan tak ada yang mengisi.
Shots: 1. kulkas kedua berbentuk Kalimantan berdiri di samping kulkas Jawa, tanpa gunung api di atasnya [wipe] | 2. potongan tanah: hujan deras turun, butir mineral tersapu air ke lapisan dalam jauh di bawah akar [iris] | 3. pintu kulkas Kalimantan terbuka, raknya kosong dan berdebu, lampunya berkedip [push]
Sumber: [Suhu tinggi dan hujan lebat menyebabkan pencucian mineral yang menghasilkan tanah miskin; Kalimantan didominasi granit dan endapan](https://www.britannica.com/place/Indonesia/Soils)

### s12 · body · R3 · ±2:02
EN: One correction, because the popular version gets this wrong. Ash from some volcanoes, in western Java and across much of Sumatra, is acidic and far less fertile. The best soil comes from one kind of lava, and much of Java happens to be built from it.
ID: Satu koreksi, karena versi populernya keliru di sini. Abu dari sebagian gunung api, di Jawa bagian barat dan di banyak bagian Sumatra, bersifat asam dan jauh kurang subur. Tanah terbaik datang dari satu jenis lava, dan sebagian besar Jawa kebetulan terbentuk dari lava itu.
Shots: 1. Cicak menempel di sudut peta dan mengangkat tangan kecilnya [cut] | 2. dua kulkas vulkanik: satu di Sumatra dan Jawa barat berisi rak setengah kosong berwarna kelabu [wipe] | 3. aliran lava jenis tertentu mengalir di bawah sebagian besar Jawa dan berubah menjadi lapisan tanah gelap yang kaya [push]
Sumber: [Tidak semua tanah vulkanik subur; abu di Jawa barat dan banyak bagian Sumatra bersifat asam](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/77BD65D89AB2B22D403B0B336C3856D2/S0026749X00000196a.pdf/div-class-title-economic-myth-and-geographical-reality-in-indonesia-div.pdf); [Batuan Jawa sebagian besar andesit; tanah andesit termasuk yang paling subur](https://www.britannica.com/place/Indonesia/Soils)

### s13 · rehook · R3 · ±2:21
EN: A full fridge explains how people could live here. It doesn't explain how so many did. For that, you need to see what Javanese farmers did with water.
ID: Kulkas penuh menjelaskan kenapa orang bisa hidup di sini. Belum menjelaskan kenapa sebanyak ini. Untuk itu, lihat apa yang dilakukan petani Jawa dengan air.
Shots: 1. kulkas Jawa penuh, satu keluarga kecil duduk di depannya [cut] | 2. keluarga itu berlipat ganda berkali-kali sampai antrean panjang mengular di depan kulkas [hold] | 3. air mengalir dari puncak gunung menuruni lereng menuju petak-petak sawah [wipe]

## A field that pays for more hands (2:33)

### s14 · body · footage · ±2:33
EN: This is a sawah, a flooded rice field. Water from the mountains runs from one terrace to the next and carries fresh minerals down with it.
ID: Inilah sawah, ladang padi yang digenangi air. Air dari gunung mengalir dari satu teras ke teras berikutnya dan membawa mineral baru bersamanya.
Footage: rice terraces java, sawah irrigation water, paddy field indonesia (hindari: bali tourist swing, drone selfie)
Sumber: [Sawah (padi beririgasi) adalah bentuk pertanian dominan di Jawa dan Bali](https://en.wikipedia.org/wiki/Agricultural_Involution)

### s15 · body · R3 · ±2:43
EN: A flooded field holds up far better than a dry one. Farmers can plant it season after season without the soil giving out.
ID: Ladang yang digenangi jauh lebih tahan dibanding ladang kering. Petani bisa menanaminya musim demi musim tanpa tanahnya habis.
Shots: 1. dua petak berdampingan: petak kering retak dan pucat, petak sawah tergenang hijau [cut] | 2. garis waktu musim bergerak di bawah petak sawah, padi tumbuh, dipanen, ditanam lagi berulang [hold]
Sumber: [Sawah merespons setiap tambahan tenaga kerja dan menjadi sistem yang stabil (Geertz 1963)](https://muse.jhu.edu/article/367736)
Catatan: Klaim kestabilan sawah bersumber Geertz (diperdebatkan). Dibiarkan umum, tanpa angka.

### s16 · body · R3 · ±2:53
EN: There's one thing you need to know about a sawah. It pays back almost every extra hour you put into it.
ID: Ada satu hal yang perlu kamu tahu soal sawah. Sawah membalas hampir setiap jam tambahan yang kamu curahkan.
Shots: 1. petak sawah diberi wajah ramah, menatap Komo [push] | 2. jam pasir di pematang, setiap butir yang jatuh menambah satu bulir padi di petak [hold]
Sumber: [Sawah responsif terhadap setiap tambahan input tenaga kerja (Geertz 1963)](https://muse.jhu.edu/article/367736)

### s17 · body · R3 · ±3:02
EN: Weed a little more, plant the seedlings closer, guide the water more carefully, and the same field gives a little more rice. So for a farming family, one more child meant one more pair of hands, and more food from the same land.
ID: Siangi sedikit lebih rajin, tanam bibit lebih rapat, atur air lebih teliti, dan petak yang sama memberi sedikit lebih banyak padi. Jadi bagi keluarga petani, satu anak lagi berarti sepasang tangan lagi, dan lebih banyak makanan dari tanah yang sama.
Shots: 1. tiga tangan bekerja di petak yang sama: mencabut gulma, menancap bibit rapat, membuka pintu air kecil [cut] | 2. keluarga petani di pematang bertambah satu anak, anak itu ikut menanam dan karung beras keluarga bertambah [push]
Sumber: [Sawah yang menyerap tambahan tenaga kerja mendorong sistem kepemilikan dan keluarga yang makin rapat](https://muse.jhu.edu/article/367736)

### s18 · body · R3 · ±3:19
EN: In Borneo's forests, many farmers did the opposite. They cleared a patch, grew crops for a few years until the soil was spent, then moved on. That kind of farming needs a lot of land for each family, so villages stayed small and far apart.
ID: Di hutan Kalimantan, banyak petani melakukan sebaliknya. Mereka membuka lahan, menanaminya beberapa tahun sampai tanahnya habis, lalu pindah. Cara itu butuh lahan luas per keluarga, jadi desanya kecil dan berjauhan.
Shots: 1. peta wipe ke hutan Kalimantan dari atas [wipe] | 2. satu petak hutan dibuka, ladang tumbuh, lalu memudar pucat, dan keluarga berjalan ke petak berikutnya [hold] | 3. dari atas, desa-desa kecil berjauhan di tengah hutan luas [push]
Sumber: [Dua bentuk pertanian dominan: ladang berpindah (swidden) dan sawah; ladang berpindah lebih umum di luar Jawa dan Bali](https://en.wikipedia.org/wiki/Agricultural_Involution)

### s19 · body · R3 · ±3:37
EN: Same country, two different rules. One rewards more people on the same land, and the other needs more land for each person.
ID: Negara sama, dua aturan berbeda. Yang satu menghargai lebih banyak orang di tanah yang sama, yang lain butuh lebih banyak tanah per orang.
Shots: 1. layar dibelah dua: Jawa dengan sawah padat, Kalimantan dengan hutan luas [cut] | 2. di sisi Jawa orang bertambah di petak yang sama, di sisi Kalimantan satu orang berjalan menempati petak makin luas [hold]

### s20 · rehook · R3 · ±3:46
EN: By 1815, when a British administrator named Raffles ran a count, Java had about four and a half million people. Historians think he undercounted. Even so, what came next was extreme.
ID: Pada 1815, saat pejabat Inggris bernama Raffles menghitung, Jawa berpenduduk sekitar empat setengah juta. Sejarawan menduga hitungannya terlalu rendah. Meski begitu, yang terjadi setelahnya luar biasa.
Shots: 1. garis waktu muncul di bawah peta dengan penanda 1815, juru hitung bertopi tinggi mencoret buku catatan [wipe] | 2. buku catatan dengan halaman yang terlipat dan beberapa titik di luar catatan [push] | 3. garis waktu mulai berjalan cepat ke kanan, penghitung bergetar siap melonjak [hold]
Sumber: [Sensus Raffles 1815 sekitar 4,5 juta; 1900 sekitar 28,5 juta](https://informahealthcare.com/doi/abs/10.1080/00324728.1970.10406113); [Angka Raffles kemungkinan terlalu rendah](https://kyoto-seas.org/pdf/28/4/280404.pdf)

## The Dutch decision (4:00)

### s21 · rehook · R3 · ±4:00
EN: In 1830, the Dutch, who ruled Java, made a decision that tied the island's people to its fields for decades.
ID: Pada 1830, Belanda yang menguasai Jawa membuat keputusan yang mengikat penduduknya ke ladang selama puluhan tahun.
Shots: 1. Pak Aturan versi kolonial (dokumen resmi berstempel Belanda) muncul di atas peta Jawa, tali-tali menjulur dari dokumen ke setiap desa [cut]
Sumber: [Sistem Tanam Paksa (Cultuurstelsel) diperkenalkan Belanda di Jawa, 1830](https://www.britannica.com:443/place/Indonesia/The-Culture-System)

### s22 · body · R3 · ±4:09
EN: It was called the Cultivation System. Each village had to set aside a fifth of its land for export crops, like sugar and coffee, grown for the Dutch government.
ID: Namanya Sistem Tanam Paksa. Setiap desa wajib menyisihkan seperlima tanahnya untuk tanaman ekspor, seperti tebu dan kopi, yang ditanam untuk pemerintah Belanda.
Shots: 1. dokumen Pak Aturan terbuka, stempel besar menghantam peta Jawa [push] | 2. satu desa dari atas, ladangnya dibagi lima, satu bagian berubah warna menjadi kebun tebu dan kopi [iris]
Sumber: [Desa menyisihkan seperlima tanah garapan untuk tanaman ekspor; tebu dan nila lalu kopi dan lainnya](https://www.britannica.com:443/place/Indonesia/The-Culture-System)

### s23 · body · R3 · ±4:21
EN: It made the Netherlands rich. Between 1840 and 1880, sales from it paid for about a third of the Dutch national budget.
ID: Sistem itu membuat Belanda kaya. Antara 1840 dan 1880, hasil penjualannya membiayai sekitar sepertiga anggaran negara Belanda.
Shots: 1. kapal penuh karung gula dan kopi berlayar dari Jawa ke Belanda di peta [wipe] | 2. kue anggaran Belanda berbentuk lingkaran, sepertiganya terisi warna dari kapal Jawa [hold]
Sumber: [1840–1880 penjualannya rata-rata 18 juta gulden per tahun, sekitar sepertiga anggaran Belanda](https://www.britannica.com:443/place/Indonesia/The-Culture-System)

### s24 · body · R3 · ±4:30
EN: So the Dutch had every reason to keep the work where it already was. Sugar mills went up across Java, right next to the fields and the people who worked them.
ID: Jadi Belanda punya semua alasan untuk menjaga pekerjaan tetap di tempatnya. Pabrik gula berdiri di seluruh Jawa, tepat di samping ladang dan orang-orang yang menggarapnya.
Shots: 1. Pak Aturan memegang peta Jawa erat-erat seperti barang berharga [cut] | 2. di peta Jawa bermunculan cerobong pabrik gula, masing-masing tepat di samping petak tebu dan kerumunan titik penduduk [hold]
Sumber: [Industri gula Jawa ditransformasi di bawah Tanam Paksa lalu perusahaan gula Belanda](https://www.doi.org/10.1017/S0026749X00007307); [Tanam Paksa memperluas produksi desa di Jawa](https://www.britannica.com:443/place/Indonesia/The-Culture-System)

### s25 · body · R3 · ±4:42
EN: Java's population didn't shrink under all that work. It grew. By 1900, Java had about twenty-eight and a half million people.
ID: Penduduk Jawa tidak menyusut di bawah kerja itu. Malah bertambah. Pada 1900, Jawa dihuni sekitar dua puluh delapan setengah juta orang.
Shots: 1. titik penduduk Jawa bergetar di bawah beban karung tebu tapi tidak berkurang [cut] | 2. titik mulai berkembang biak [hold] | 3. garis waktu tiba di 1900, penghitung naik sampai 28,5 juta [hold]
Sumber: [Jawa sekitar 28,5 juta pada 1900](https://informahealthcare.com/doi/abs/10.1080/00324728.1970.10406113); [Penduduk Jawa naik dari 6 juta ke 9,5 juta selama Tanam Paksa berjalan penuh](https://www.britannica.com:443/place/Indonesia/The-Culture-System)

### s26 · body · R3 · ±4:51
EN: That's about six times Raffles' count, in less than a century.
ID: Sekitar enam kali hitungan Raffles, dalam kurang dari seabad.
Shots: 1. enam tumpukan titik seukuran hitungan 1815 berjajar, menyamai jumlah tahun 1900 [cut]
Sumber: [4,5 juta (1815) ke 28,5 juta (1900)](https://informahealthcare.com/doi/abs/10.1080/00324728.1970.10406113)

### s27 · body · R3 · ±4:56
EN: Then came the catch. Each new generation split the family field again, until many plots were too small to feed the people working them.
ID: Di sinilah masalahnya. Tiap generasi baru membagi lagi sawah keluarga, sampai banyak petak terlalu kecil untuk menghidupi penggarapnya.
Shots: 1. Cicak menunjuk retakan kecil di pematang [cut] | 2. satu petak sawah dibagi dua, lalu empat, lalu delapan, tiap potongan diisi satu keluarga yang makin berdesakan [push]
Sumber: [Tekanan penduduk di Jawa membuat kepemilikan lahan terus terbagi-bagi](https://ageconsearch.umn.edu/record/320860/files/AgMonograph15.pdf); [Tesis involusi Geertz diperdebatkan sejarawan Jawa](https://dare.uva.nl/id/a580592c-eb8b-48c8-b247-414dafaef637)

### s28 · rehook · R3 · ±5:06
EN: By the early 1900s, even the Dutch could see the fridge had more mouths than shelves. So they tried the obvious fix: move people somewhere else.
ID: Awal 1900-an, Belanda pun melihat kulkas itu punya lebih banyak mulut daripada rak. Jadi mereka mencoba solusi paling jelas: memindahkan orang.
Shots: 1. kulkas Jawa kembali, antrean orang di depannya jauh lebih panjang dari jumlah raknya [cut] | 2. Pak Aturan kolonial menunjuk ke laut, ke arah Sumatra [wipe]

## Moving people off Java (5:17)

### s29 · body · R3 · ±5:17
EN: In November 1905, the colonial government sent 155 Javanese families to Lampung, on the southern tip of Sumatra.
ID: Pada November 1905, pemerintah kolonial mengirim 155 keluarga Jawa ke Lampung, di ujung selatan Sumatra.
Shots: 1. kapal kayu kecil berangkat dari Jawa membawa 155 keluarga, menyeberang ke ujung selatan Sumatra [cut]
Sumber: [November 1905: 155 KK dari Karanganyar, Kebumen, Purworejo, Kedu dipindahkan ke Gedong Tataan, Lampung](https://www.detik.com/bali/berita/d-8238991/nusron-minta-warga-bali-ke-luar-pulau-ini-riwayat-transmigrasi-di-indonesia)

### s30 · body · R3 · ±5:25
EN: After independence, Indonesia turned that experiment into a national program called transmigration. In December 1950, the first group of twenty-five families left for Lampung.
ID: Setelah merdeka, Indonesia mengubah percobaan itu menjadi program nasional bernama transmigrasi. Pada Desember 1950, rombongan pertama berisi dua puluh lima keluarga berangkat ke Lampung.
Shots: 1. Pak Aturan versi Indonesia (dokumen merah putih) mengambil alih peta dan menulis kata program di atas rute kapal [cut] | 2. 25 keluarga naik kapal di pelabuhan, penanda tahun 1950 [wipe]
Sumber: [Transmigrasi resmi dimulai 12 Desember 1950: 25 KK (98 orang) ke Lampung](https://jkp.ejournal.unri.ac.id/index.php/JKP/article/download/8157/6888)

### s31 · body · R3 · ±5:35
EN: Settlers got a plot of land, a house, and support for their first year.
ID: Transmigran mendapat lahan, rumah, dan bantuan untuk tahun pertama.
Shots: 1. keluarga transmigran tiba di lahan baru: sebidang tanah dipatok, rumah kayu berdiri, kalender satu tahun tergantung di dinding [push]
Sumber: [Transmigran diberi lahan untuk bercocok tanam dan dukungan keuangan selama satu tahun](https://jurnal.fkip.unmul.ac.id/index.php/yupa/article/download/3803/2249/22100)

### s32 · body · R3 · ±5:41
EN: So you'd expect Java to slowly empty out. In 1961, the first census after independence found sixty-three million people on Java.
ID: Jadi kamu mungkin mengira Jawa perlahan-lahan menyusut. Pada 1961, sensus pertama setelah merdeka mencatat enam puluh tiga juta orang di Jawa.
Shots: 1. gambaran tebakan: pulau Jawa yang makin kosong dan sepi, dibuat pudar [cut] | 2. garis waktu ke 1961, petugas sensus menghitung, penghitung Jawa naik ke 63 juta [wipe]
Sumber: [1961: penduduk Indonesia ±97 juta, Jawa ±63 juta](https://journal.student.uny.ac.id/ilmu-sejarah/article/download/16594/16054); [Sensus 1961 adalah sensus pertama setelah merdeka](https://en.wikipedia.org/wiki/1961_Indonesian_census)

### s33 · body · R3 · ±5:49
EN: Since 1950, transmigration has moved about nine point two million people, according to the ministry that runs it.
ID: Sejak 1950, transmigrasi sudah memindahkan sekitar sembilan koma dua juta orang, menurut kementerian yang menjalankannya.
Shots: 1. kapal demi kapal berangkat dari Jawa, setiap kapal menambah penghitung keluar [cut]
Sumber: [Sejak 1950: sekitar 2,2 juta KK atau 9,2 juta jiwa (Kementerian Transmigrasi)](https://timesindonesia.co.id/liputan-khusus/570490/tak-harus-ke-luar-negeri-transmigrasi-tawarkan-peluang-ekonomi-baru); [Angka lain: 7,8 juta jiwa (Kemendes PDTT 2019)](https://jkp.ejournal.unri.ac.id/index.php/JKP/article/download/8157/6888)
Catatan: Angka total transmigran berbeda antar sumber (7,8 juta s.d. 9,2 juta). Narasi memakai angka kementerian.

### s34 · body · R3 · ±5:57
EN: Over the same years, Java went from sixty-three million to about a hundred and fifty-eight million. For every person the program moved, Java gained about ten.
ID: Di tahun-tahun yang sama, Jawa naik dari enam puluh tiga juta ke sekitar seratus lima puluh delapan juta. Tiap satu orang yang dipindahkan, Jawa bertambah sekitar sepuluh.
Shots: 1. garis waktu 1961 ke 2025, penghitung Jawa naik dari 63 juta ke 158 juta [wipe] | 2. satu orang naik kapal keluar, sepuluh orang baru muncul di Jawa [cut]
Sumber: [Jawa ±63 juta (1961)](https://journal.student.uny.ac.id/ilmu-sejarah/article/download/16594/16054); [Jawa ±158 juta (SUPAS 2025)](https://kabar24.bisnis.com/read/20260505/15/1971460/sensus-bps-jumlah-penduduk-ri-capai-28467-juta-jiwa-2025-tumbuh-melambat); [9,2 juta jiwa dipindahkan sejak 1950](https://timesindonesia.co.id/liputan-khusus/570490/tak-harus-ke-luar-negeri-transmigrasi-tawarkan-peluang-ekonomi-baru)
Catatan: Rasio 1:10 = (158 − 63) ÷ 9,2 ≈ 10,3 (hitungan sendiri).

### s35 · body · R3 · ±6:08
EN: To be fair, transmigration did change the map. In Lampung, about three quarters of the people today descend from migrants from Java, Madura and Bali.
ID: Supaya adil, transmigrasi memang mengubah peta. Di Lampung, sekitar tiga perempat penduduknya sekarang adalah keturunan pendatang dari Jawa, Madura, dan Bali.
Shots: 1. suasana berubah lebih terang, kamera iris ke Sumatra selatan [iris] | 2. grid 100 titik di atas Lampung, 75 titik berwarna sama dengan Jawa, Madura, dan Bali [hold]
Sumber: [Tiga perempat penduduk Lampung keturunan pendatang Jawa, Madura, dan Bali](https://en.wikipedia.org/wiki/Lampung)

### s36 · body · R3 · ±6:18
EN: The program built whole districts and towns. It just could never move people as fast as Java was growing.
ID: Program itu membangun kabupaten dan kota baru. Hanya saja, tak pernah secepat pertumbuhan Jawa.
Shots: 1. kota-kota kecil bermunculan di Sumatra dan Kalimantan di titik tujuan kapal [cut] | 2. lomba dua garis: garis kapal yang naik pelan dan garis penduduk Jawa yang melesat [wipe]
Sumber: [Transmigrasi membentuk 1.183 desa definitif, 385 kecamatan, 104 kota/kabupaten, 2 ibu kota provinsi](https://jkp.ejournal.unri.ac.id/index.php/JKP/article/download/8157/6888)

### s37 · rehook · R3 · ±6:26
EN: Java's share of Indonesia did fall, from about sixty-five percent in 1961 to under fifty-six today. A big part of that came from something that never left the island.
ID: Porsi Jawa memang turun, dari sekitar enam puluh lima persen pada 1961 ke bawah lima puluh enam persen sekarang. Banyak dari penurunan itu datang dari sesuatu yang tak pernah meninggalkan pulau.
Shots: 1. grid 100 titik Indonesia, titik Jawa berkurang dari 65 ke 56 [cut] | 2. kamera berputar kembali ke sebuah rumah desa di Jawa, pintunya tertutup [push]
Sumber: [1961: 65% penduduk tinggal di Jawa](https://en.wikipedia.org/wiki/1961_Indonesian_census); [2025: 55,65% di Jawa](https://kabar24.bisnis.com/read/20260505/15/1971460/sensus-bps-jumlah-penduduk-ri-capai-28467-juta-jiwa-2025-tumbuh-melambat)

## What actually slowed Java (6:39)

### s38 · body · R3 · ±6:39
EN: In 1970, Indonesia launched a national family planning program. At the time, a woman had between five and six children on average.
ID: Pada 1970, Indonesia meluncurkan program Keluarga Berencana nasional. Saat itu, rata-rata seorang perempuan punya lima sampai enam anak.
Shots: 1. pintu rumah terbuka, di dalamnya poster program Keluarga Berencana bergambar keluarga kecil, penanda tahun 1970 [push] | 2. satu ibu dengan barisan enam anak di sampingnya [hold]
Sumber: [Program KB didirikan 1970 di bawah BKKBN; TFR 5,6 pada akhir 1960-an](https://indonesia.unfpa.org/en/node/11919); [TFR 1971: 5,61](https://databoks.katadata.co.id/en/demographics/statistics/e30b7b2cff9a7d8/indonesias-birth-rate-continues-to-decline)

### s39 · body · R3 · ±6:48
EN: By 2020, that number was about two. And Java got there earlier. In the 1970s, Java grew by under two percent a year, while the other islands grew by more than two and a half.
ID: Pada 2020, angkanya sekitar dua. Dan Jawa sampai ke sana lebih dulu. Pada 1970-an, penduduk Jawa tumbuh di bawah dua persen per tahun, sementara pulau-pulau lain tumbuh lebih dari dua setengah persen.
Shots: 1. barisan enam anak menyusut menjadi dua, garis waktu bergerak dari 1971 ke 2020 [cut] | 2. dua pelari di lintasan: Jawa melambat lebih dulu [wipe] | 3. dua batang pertumbuhan berdampingan: Jawa 1,7 persen, pulau lain 2,6 persen [hold]
Sumber: [TFR turun ke 2,18 pada 2020](https://databoks.katadata.co.id/en/demographics/statistics/e30b7b2cff9a7d8/indonesias-birth-rate-continues-to-decline); [1971–80: pertumbuhan penduduk Jawa 1,7% per tahun, pulau lain 2,6%](https://discmaster.textfiles.com/view/12548/abacus-multimedia-mania.iso/dp/0020/00209.txt)
Catatan: Sumber 1,7% vs 2,6% adalah studi negara Library of Congress (salinan arsip). Cek ulang ke publikasi BPS bila ada.

### s40 · body · R3 · ±7:02
EN: Add it up. If Java had kept its 1961 share, it would have about a hundred and eighty-five million people today. The boats moved nine million of the difference, and their children were born outside Java too. Slower births on Java itself did much of the rest.
ID: Coba dijumlahkan. Kalau Jawa mempertahankan porsinya di 1961, penduduknya sekarang sekitar seratus delapan puluh lima juta. Kapal memindahkan sembilan juta dari selisih itu, dan anak-anak mereka juga lahir di luar Jawa. Kelahiran yang lebih lambat di Jawa sendiri mengerjakan sebagian besar sisanya.
Shots: 1. kalkulator kayu di pematang, Komo memencet tombolnya [cut] | 2. dua pulau Jawa bayangan: yang pudar berisi 185 juta, yang nyata berisi 158 juta, selisihnya melayang di tengah [hold] | 3. kapal membawa sebagian titik selisih ke Sumatra dan Kalimantan, di sana titik itu beranak [wipe] | 4. sisa titik selisih tidak pernah muncul, keluarga di rumah Jawa tetap kecil [push]
Sumber: [Porsi Jawa 65% pada 1961](https://en.wikipedia.org/wiki/1961_Indonesian_census); [Penduduk Indonesia 284,67 juta (2025)](https://kabar24.bisnis.com/read/20260505/15/1971460/sensus-bps-jumlah-penduduk-ri-capai-28467-juta-jiwa-2025-tumbuh-melambat); [9,2 juta jiwa dipindahkan](https://timesindonesia.co.id/liputan-khusus/570490/tak-harus-ke-luar-negeri-transmigrasi-tawarkan-peluang-ekonomi-baru)
Catatan: 185 juta = 65% × 284,67 juta (hitungan sendiri). Narasi tidak mengklaim pembagian persis; migrasi spontan juga berperan.

### s41 · body · R3 · ±7:21
EN: Remember those 155 families on the boat in 1905? In 2025, the program moved 1,394 families. That's roughly five thousand people, about what Java adds in a single day.
ID: Ingat 155 keluarga di kapal tahun 1905 tadi? Pada 2025, program itu memindahkan 1.394 keluarga. Itu kira-kira lima ribu orang, sekitar jumlah yang bertambah di Jawa dalam satu hari.
Shots: 1. kapal kayu kecil tahun 1905 muncul lagi di peta dengan komposisi yang sama [cut] | 2. kapal yang sama berganti menjadi kapal modern berisi 1.394 keluarga, penanda tahun 2025 [hold] | 3. jam satu hari berputar di atas Jawa, dan selama satu putaran muncul titik baru sebanyak isi kapal itu [push]
Sumber: [155 KK pada 1905](https://www.detik.com/bali/berita/d-8238991/nusron-minta-warga-bali-ke-luar-pulau-ini-riwayat-transmigrasi-di-indonesia); [2025: 1.394 KK ikut transmigrasi; 95 KK setara 360 jiwa](https://www.goodnewsfromindonesia.id/short/sebanyak-1394-kepala-keluarga-ikut-transmigrasi-selama-2025); [Laju pertumbuhan penduduk 1,08% per tahun](https://kabar24.bisnis.com/read/20260505/15/1971460/sensus-bps-jumlah-penduduk-ri-capai-28467-juta-jiwa-2025-tumbuh-melambat)
Catatan: 5.000 orang ≈ 1.394 KK × ±3,8 jiwa/KK. Pertambahan Jawa ±4.500/hari ≈ 158 juta × ±1% ÷ 365 (perkiraan sendiri dari laju nasional). Wajib disebut 'roughly'.

### s42 · body · R3 · ±7:33
EN: This year, the ministry changed course again. It now focuses on fewer settlement areas, mostly in eastern Indonesia, and pays settlers a monthly allowance while they start out.
ID: Tahun ini, kementerian kembali mengubah arah. Fokusnya sekarang pada lebih sedikit kawasan, sebagian besar di Indonesia timur, dan transmigran mendapat jaminan hidup bulanan selama masa awal.
Shots: 1. Pak Aturan versi sekarang mencoret banyak pin di peta [cut] | 2. dari 154 pin tinggal 53 yang menyala, sebagian besar di timur, dan amplop bulanan jatuh ke tangan keluarga transmigran [hold]
Sumber: [2026: fokus dari 154 kawasan dipersempit ke 53 kawasan prioritas, terutama Indonesia timur; jaminan hidup Rp3,6 juta per bulan](https://katadata.co.id/berita/nasional/6a7c54e7b6ccc/pemerintah-ubah-pola-transmigrasi-warga-dapat-jaminan-rp-3-6-juta-per-bulan)

### s43 · rehook · R3 · ±7:44
EN: So the soil filled Java, the Dutch kept it full, and the boats couldn't empty it. That explains the past. Why does the crowd stay now?
ID: Jadi tanah mengisi Jawa, Belanda menjaganya penuh, dan kapal tak mampu mengosongkannya. Itu menjelaskan masa lalu. Kenapa kerumunannya bertahan sekarang?
Shots: 1. rangkuman tiga gambar yang muncul cepat: kulkas penuh, stempel Belanda, kapal kecil [cut] | 2. sawah di pinggir kota berganti menjadi deretan pabrik dan gedung [wipe] | 3. Komo berdiri di tengah kerumunan stasiun kota, menoleh ke kamera [push]

## Why the crowd stays (7:56)

### s44 · body · footage · ±7:56
EN: Because the crowd built everything else. Java produces about fifty-seven percent of Indonesia's economy.
ID: Karena kerumunan itu membangun semua hal lainnya. Jawa menghasilkan sekitar lima puluh tujuh persen perekonomian Indonesia.
Footage: jakarta skyline traffic, jakarta commuters crowd, surabaya city (hindari: protest, flood, politician)
Sumber: [Kontribusi Jawa terhadap PDB 2025: 56,93% (BPS)](https://www.bps.go.id/id/pressrelease/2026/02/05/2546/ekonomi-indonesia-tahun-2025-tumbuh-5-11-persen)

### s45 · body · R3 · ±8:02
EN: Ports, factories, universities and the capital, Jakarta, grew where the people already were. And those jobs keep pulling people toward Java's cities.
ID: Pelabuhan, pabrik, kampus, dan ibu kota, Jakarta, tumbuh di tempat orang-orangnya sudah berada. Dan pekerjaan itu terus menarik orang ke kota-kota di Jawa.
Shots: 1. peta Jawa dengan kerumunan titik, lalu pelabuhan, pabrik, kampus, dan kota Jakarta muncul tepat di atas kerumunan terpadat [cut] | 2. titik-titik dari desa dan pulau lain bergerak seperti tertarik magnet ke kota-kota Jawa [hold]
Sumber: [Indonesia tetap berpusat di Jawa meskipun kampanye infrastruktur](https://www.thejakartapost.com/news/2021/05/23/indonesia-remains-java-centric-despite-jokowis-infrastructure-campaign.html)

### s46 · body · R3 · ±8:11
EN: Even the hard numbers follow the crowd. Just over half of Indonesia's poor also live on Java, which is about what you'd expect from where everyone lives.
ID: Angka yang berat pun mengikuti kerumunan. Sedikit lebih dari separuh penduduk miskin Indonesia juga di Jawa, kurang lebih sesuai sebaran penduduknya.
Shots: 1. grid titik penduduk miskin ditumpuk di atas peta [cut] | 2. 52 dari 100 titik kelabu jatuh di Jawa, hampir sama dengan porsi titik penduduk [hold]
Sumber: [Maret 2026: 52,42% penduduk miskin Indonesia di Jawa](https://www.idntimes.com/business/economy/lebih-dari-separuh-penduduk-miskin-indonesia-terkonsentrasi-di-jawa-00-gshdq-r7kydq)

### s47 · body · R3 · ±8:22
EN: Which is why moving the crowd is so hard. People came for the soil. Their children stay for the jobs, the schools and the family that are already here.
ID: Itu sebabnya kerumunan ini sulit dipindah. Orang datang karena tanahnya. Anak-anaknya bertahan karena kerja, sekolah, dan keluarga yang sudah ada di sini.
Shots: 1. kerumunan di Jawa dari atas, sebuah tangan raksasa mencoba mendorongnya, kerumunan kembali seperti air [cut] | 2. keluarga petani lama datang ke sawah subur [wipe] | 3. anak-anak mereka di kota: kantor, sekolah, dan meja makan keluarga besar [hold]

## Back to the fridge (8:34)

### s48 · payoff · R3 · ±8:34
EN: So go back to the fridge. It still restocks itself every time a volcano clears its throat. What keeps the island full now is the crowd itself.
ID: Kembali ke kulkas tadi. Kulkas itu masih terisi sendiri tiap kali gunung berdeham. Yang membuat pulau ini tetap penuh sekarang adalah kerumunannya.
Shots: 1. kulkas Jawa dari awal video kembali dengan komposisi yang sama [cut] | 2. gunung di atas kulkas batuk abu kecil, rak terisi lagi [hold] | 3. kamera mundur: kulkas ternyata berdiri di tengah kota yang penuh orang, kerumunan mengelilinginya [push]

### s49 · cta · R3 · ±8:45
EN: And that crowd has to get to work every morning. Jakarta's answer was to run its commuter trains on Tokyo's retired cars for decades, until a twist this November. That's the video to watch next.
ID: Dan kerumunan itu harus berangkat kerja setiap pagi. Jawaban Jakarta: kereta komuter dari gerbong pensiunan Tokyo, selama puluhan tahun, sampai kejutan November ini. Itu video yang perlu kamu tonton berikutnya.
Shots: 1. pagi hari, kerumunan dari kota mengalir ke satu peron stasiun [cut] | 2. Sepuh, kereta tua eks-Tokyo, masuk ke peron dan membuka pintunya [wipe] | 3. peta laut Tokyo ke Jakarta dari video sebelumnya, kapal membawa kereta, kamera berhenti [push]
Sumber: [Kerumunan di Jawa (konteks)](https://kabar24.bisnis.com/read/20260505/15/1971460/sensus-bps-jumlah-penduduk-ri-capai-28467-juta-jiwa-2025-tumbuh-melambat)
Catatan: CTA merujuk T02-001 (kereta Tokyo), yang tayang lebih dulu (2026-12-07). Tautkan 001 di end screen dan kartu.

## Shorts

- **B1-moved-9-million-grew-95**: s32, s33, s34, s41. Hook: "You'd think moving nine million people would empty Java."
- **B2-island-the-size-of-england**: s01, s02, s07, s09, s10. Hook: "You're on an island the size of England, with 158 million people."

## Judul dan thumbnail

1. Why Half of Indonesia Lives on One Island
2. Indonesia Moved 9 Million People Off Java. Java Grew by 95 Million
3. 158 Million People, One Island: Why Java Is So Crowded

Thumbnail: A "HALF ON / ONE ISLAND" (pulau, kaget), B "158 MILLION / HERE" (gunung api, puas). Janji judul terbayar di s01–s03 (detik 0–25).

## QA anti-slop teks (skill video-anti-slop, lapisan 1)

Dijalankan dengan `references/spoken-script-rules.md` dan `pola-slop-indonesia.md` (pemeriksaan manual oleh agent chat, 2026-11-26).

| Dimensi | EN | ID | Catatan |
| --- | --- | --- | --- |
| Directness | 8 | 8 | Hook langsung angka; janji judul terbayar di s03–s04 (±0:25) |
| Rhythm | 8 | 8 | Kalimat pendek dan panjang bergantian; re-hook tiap 60–90 detik |
| Trust | 8 | 8 | Setiap angka punya sumber di scene; tiga angka hitungan sendiri ditandai di Catatan (s06, s40, s41) |
| Authenticity | 8 | 7 | Sumber berbahasa Indonesia (BPS, Kementrans, jurnal kampus); tanpa footage milik kreator, jadi pengecualian bukti-kreator masih berlaku |
| Density | 8 | 7 | Tanpa pengisi; ID sedikit lebih panjang (rasio suku kata ID/EN 1,28, setara siklus 001) |
| **Total** | **40/50** | **38/50** | Ambang 35. **LULUS** teks |

Yang sudah diperbaiki dalam draf ini:
- s04: klaim superlatif "feeds more people per field than almost anywhere" dilunakkan (tanpa sumber).
- s24: "roads and ports" dibuang; sumber hanya mendukung pabrik gula.
- s37: "Most of that" diganti "A big part of that"; pembagian persis penurunan porsi Jawa tidak didukung data.
- s43: klaim "most people on Java aren't farmers" dibuang (belum ada data Sakernas per pulau).
- s49: "this month's twist" diganti "a twist this November" (video tayang Desember).

Temuan terbuka:
- **Sedang:** tidak ada footage milik kreator. Opsional: rekam 5–10 detik kerumunan stasiun atau jalan di Jawa untuk s44 (`produksi/footage-own/T02/jawa-01.mp4`).
- **Sedang:** footage nyata hanya 3 scene (s08, s14, s44), kira-kira 8% durasi, di bawah panduan 20–30%. Disengaja karena R3 jadi gaya utama; agent repo boleh menambah klip CC BY bila cocok.
- **Kecil:** angka 1,7% vs 2,6% (s39) bersumber dari salinan arsip studi negara Library of Congress; sebaiknya dicek ke publikasi BPS sebelum render.
- **Kecil:** kepadatan Kalimantan ±30/km² (s06) dihitung sendiri; cek ke tabel BPS kepadatan per provinsi.
- Lapisan visual, audio, dan channel diperiksa setelah render (QA 05).
