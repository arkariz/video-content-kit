# Naskah: T01 siklus 002-fee-split (DRAFT, menunggu persetujuan kreator)

> **Usang (2026-11-26):** draft ini memakai gaya diorama 2.5D yang sudah diganti R3. Isi cerita boleh dipakai ulang, tetapi visual wajib ditulis ulang (`instruksi/referensi/gaya-visual.md`) sebelum disetujui.

Judul kerja: You Pay $100. Here's Who Takes a Cut.
Janji: setelah menonton, kamu tahu ke mana $2,75 dari belanja $100 pergi dan siapa yang menanggungnya.
Gaya: diorama 2.5D (`instruksi/referensi/gaya-diorama.md`) + cerita (`instruksi/referensi/gaya-cerita.md`).
44 scene · ±1.230 kata EN · target ±8:15 dengan jeda variabel (0,5 detik body, 1,2–1,4 detik sebelum re-hook/payoff).

Peta re-hook: s03 (0:20), s12 (±1:50), s18 (±3:00), s24 (±4:05), s30 (±5:20), s36 (±6:30), s40 (±7:00).
Istilah baru: card network (s07), terminal company (s11), interchange (s14), rewards (s20), network fee (s23), markup (s28), QRIS (s37).
Chapters: 0:00 The tap · 0:35 The road · 2:00 Gate one: your bank · 3:50 Gate two: the network · 4:15 Gate three: the shop's side · 5:20 Who really pays · 6:30 Another road · 7:20 Where it all went

## Checklist cerita (instruksi/referensi/gaya-cerita.md)
- [x] Scene 1 "you" di momen kunci, maks 2 kalimat, hook terkunci V2 (angka dulu): s01–s02
- [x] Analogi di fondasi dan penutup: gerobak 100 koin di jalan tol, s06 → s42
- [x] Tebakan dipatahkan: s12 (Visa terbesar? terkecil)
- [x] Mesin insentif: s18–s22 (kenapa bank ingin tol lebih mahal)
- [x] Callback dengan twist: s09 "tol dari gerobak, bukan kantongmu" → s32 pembayar tunai tetap membayar
- [x] Steelman: s35 (tol membeli janji bank untuk membayar)
- [x] Penutup membingkai ulang + ajakan spesifik: s43 (tanda "cash discount"), s44 (video 003)

## Bab 1: The tap

### s01 · hook · diorama
EN: Every tap pays four companies. On a hundred-dollar purchase, here's exactly how much each one takes.
ID: Setiap kali kamu tap kartu, empat perusahaan dibayar. Dari belanja seratus dolar, ini persis berapa bagian masing-masing.
Visual: dekat ke terminal "$100.00", lalu empat bangunan di peta menyala bergantian.

### s02 · body · broll (klip kreator: tangan tap kartu) → diorama
EN: Noon. You tap your card for a pair of running shoes. The screen says one hundred dollars, and for a second, nothing else happens.
ID: Siang hari. Kamu tap kartu untuk sepasang sepatu lari. Layar menunjukkan seratus dolar, dan selama sedetik, tidak terjadi apa-apa lagi.
Visual: klip tangan kreator ±5 detik, cut ke diorama yang membeku; kotak sepatu di meja kasir.

### s03 · rehook · diorama
EN: But the hundred dollars won't reach the shop in one piece. Ninety-seven dollars and twenty-five cents will. Two dollars twenty go to your bank, sixteen cents to Visa, and thirty-nine cents to the people who run the shop's card machine.
ID: Tapi seratus dolar itu tidak sampai ke toko utuh. Yang sampai sembilan puluh tujuh dolar dua puluh lima sen. Dua dolar dua puluh untuk bankmu, enam belas sen untuk Visa, dan tiga puluh sembilan sen untuk pihak yang mengurus mesin kartu toko.
Visual: tumpukan koin pecah jadi empat, terbang ke empat bangunan; callout $2.20 / 16¢ / 39¢ / $97.25.
Sumber: Visa interchange (Helcim, Chargeflow), Wells Fargo pass-through, Stripe pricing.

## Bab 2: The road

### s04 · body · diorama
EN: Here's where those coins go, on one map. Your money starts here, at your bank.
ID: Ini peta perjalanan koin-koin itu. Uangmu berangkat dari sini, dari bankmu.
Visual: kamera mundur ke peta (dist ±45), sorot YOUR BANK.

### s05 · body · diorama
EN: It ends over there, at the shop's bank. Card money doesn't land in the till. It lands in the shop's account, a day or so later.
ID: Perjalanannya berakhir di sana, di bank milik toko. Uang kartu tidak masuk ke laci kasir. Uangnya masuk ke rekening toko, sekitar sehari kemudian.
Visual: jalan tergambar dari YOUR BANK ke SHOP'S BANK.
Sumber: siklus 001 (settlement).

### s06 · body · diorama
EN: Think of your payment as a cart of one hundred coins, rolling down a toll road between those two banks. Each gate on the road keeps a few coins.
ID: Bayangkan pembayaranmu sebagai gerobak berisi seratus koin yang melaju di jalan tol antara dua bank itu. Setiap gerbang di jalan itu menahan beberapa koin.
Visual: gerobak muncul di YOUR BANK, callout "100 coins"; gerbang-gerbang tampil sepanjang jalan.

### s07 · body · diorama
EN: The company that owns the road is the card network: Visa or Mastercard. Together they carry more than eighty percent of American credit card spending.
ID: Perusahaan pemilik jalannya adalah jaringan kartu: Visa atau Mastercard. Berdua, mereka mengangkut lebih dari delapan puluh persen belanja kartu kredit di Amerika.
Visual: menara network di bukit membesar, gerbang tol disorot; callout ">80%".
Sumber: Motley Fool (Merchants Payments Coalition).

### s08 · body · diorama
EN: The network sets the tolls and checks every message that passes. The money itself stays with the banks at either end.
ID: Jaringan itu menentukan tarif tol dan memeriksa setiap pesan yang lewat. Uangnya sendiri tetap dipegang bank di kedua ujung.
Visual: amplop pesan melintas di gerbang dan dicap; koin tetap di gerobak.

### s09 · body · diorama
EN: One rule surprises people. The tolls come out of the cart, not out of your pocket. Your statement says a hundred dollars. The shop receives less.
ID: Ada satu aturan yang sering bikin kaget. Tolnya diambil dari gerobak, bukan dari kantongmu. Di tagihanmu tertulis seratus dolar. Toko menerima lebih sedikit.
Visual: dekat ke you (dompet tetap utuh), lalu ke gerobak yang berkurang.

### s10 · body · diorama
EN: The shop accepted that deal the day it put the card logo on its door.
ID: Toko menyetujui aturan itu sejak hari ia menempel logo kartu di pintunya.
Visual: owner menempel stiker logo kartu di pintu toko.

### s11 · body · diorama
EN: There's one more stop, right next to the shop: the company that runs the card machine and talks to the road on the shop's behalf. Call it the terminal company.
ID: Masih ada satu pemberhentian lagi, persis di sebelah toko: perusahaan yang mengurus mesin kartu dan bicara ke jalan tol atas nama toko. Sebut saja perusahaan terminal.
Visual: gedung server di samping toko disorot, garis dari terminal ke server ke jalan.

### s12 · rehook · diorama
EN: So four hands wait along the road. Most people guess Visa takes the biggest cut. Visa takes the smallest. The biggest goes to your own bank.
ID: Jadi ada empat tangan yang menunggu di sepanjang jalan. Kebanyakan orang menebak Visa mengambil bagian terbesar. Bagian Visa justru paling kecil. Yang terbesar jatuh ke bankmu sendiri.
Visual: kamera dari menara (mengecil) berayun ke YOUR BANK (membesar).

## Bab 3: Gate one, your bank

### s13 · body · diorama
EN: The first coins never leave home. When your bank pays the shop's side, it sends ninety-seven dollars and eighty cents, and keeps two dollars twenty.
ID: Koin pertama bahkan tidak pernah keluar rumah. Saat bankmu membayar ke pihak toko, yang dikirim sembilan puluh tujuh dolar delapan puluh sen. Dua dolar dua puluh tetap di bankmu.
Visual: gerobak berangkat; koin $2.20 meloncat balik ke vault; callout "$2.20".

### s14 · body · diorama
EN: That cut is called interchange: the fee the shop's side pays your bank every time its card is used. It's the largest piece of the toll, almost every time.
ID: Potongan itu namanya interchange: biaya yang dibayar pihak toko ke bankmu setiap kali kartunya dipakai. Hampir selalu, inilah bagian tol yang paling besar.
Visual: label "interchange" menempel di tumpukan koin bank.
Sumber: Nav (interchange porsi terbesar).

### s15 · body · diorama
EN: The price isn't hidden. Visa publishes it in a public table, row by row: by card type, by kind of shop, and by whether the card was tapped or typed in.
ID: Tarifnya tidak dirahasiakan. Visa menerbitkannya di tabel publik, baris demi baris: menurut jenis kartu, jenis toko, dan apakah kartunya di-tap atau nomornya diketik.
Visual: gulungan kertas membuka di samping menara.
Sumber: PDF Visa USA Interchange Reimbursement Fees.

### s16 · body · diorama
EN: For a basic credit card tapped at a store, the row says one point five one percent plus ten cents. On your shoes, that's a dollar sixty-one.
ID: Untuk kartu kredit biasa yang di-tap di toko, barisnya menulis 1,51% plus sepuluh sen. Untuk sepatumu, itu satu dolar enam puluh satu sen.
Visual: gerobak A, tumpukan kecil; callout "$1.61".
Sumber: Chargeflow (tabel Visa 24 Okt 2026).

### s17 · body · diorama
EN: For a premium rewards card, the row says two point one percent plus ten cents. Two dollars twenty. Same shoes, same shop, bigger toll.
ID: Untuk kartu premium berhadiah, barisnya menulis 2,10% plus sepuluh sen. Dua dolar dua puluh. Sepatunya sama, tokonya sama, tolnya lebih besar.
Visual: gerobak B di sebelah A, tumpukan lebih besar; callout "$2.20".
Sumber: Helcim (cocokkan dengan PDF Visa).

### s18 · rehook · diorama
EN: Why would a bank want the shop to pay more? There's something you need to know about your bank.
ID: Kenapa bank ingin toko membayar lebih mahal? Ada satu hal soal bankmu yang perlu kamu tahu.
Visual: kamera mendorong masuk ke YOUR BANK.

### s19 · body · diorama
EN: If you pay your card off in full every month, your bank earns no interest from you. On those cards, the tap fee is one of the main ways it gets paid.
ID: Kalau tagihan kartumu selalu kamu lunasi tiap bulan, bank tidak dapat bunga darimu. Di kartu seperti itu, biaya tap adalah salah satu sumber utama pemasukannya.
Visual: kotak bunga di vault kosong; koin tap masuk.

### s20 · body · diorama
EN: So banks compete for the spot in your wallet, and they pay for it with that same fee. Points, miles, cashback. Premium cards promise richer rewards, so they carry a richer toll.
ID: Jadi bank berebut tempat di dompetmu, dan membayarnya dengan biaya yang sama. Poin, miles, cashback. Kartu premium menjanjikan hadiah lebih besar, jadi tolnya juga lebih besar.
Visual: kartu-kartu antre masuk dompet you; kartu premium paling besar.
Sumber: Stax (reward didanai sebagian oleh interchange).

### s21 · body · diorama
EN: Say your card pays one and a half percent back. A dollar fifty of the two-twenty rolls back to you as points. Your bank keeps seventy cents.
ID: Misalnya kartumu memberi cashback satu setengah persen. Satu dolar lima puluh dari dua dolar dua puluh tadi kembali ke kamu dalam bentuk poin. Bankmu menyimpan tujuh puluh sen.
Visual: koin $1.50 terbang dari bank ke you; callout "+$1.50 points", "70¢".
Catatan: contoh hipotetis, diucapkan "say".

### s22 · body · diorama
EN: Notice where those points came from. Out of the shop's cart.
ID: Perhatikan dari mana poin itu datang. Dari gerobak milik toko.
Visual: jalur tergambar dari gerobak toko ke tumpukan poin you.

## Bab 4: Gate two, the network

### s23 · body · diorama
EN: The cart reaches the toll gate. Visa bills the shop's side zero point one four percent of the sale, plus about two cents for carrying the approval message. Sixteen cents.
ID: Gerobak tiba di gerbang tol. Visa menagih pihak toko 0,14% dari nilai belanja, ditambah sekitar dua sen untuk mengantar pesan persetujuan. Total enam belas sen.
Visual: palang gerbang turun, koin 16¢ masuk menara; callout "16¢".
Sumber: Wells Fargo pass-through fees (0,14% kredit; APF $0,0195).

### s24 · rehook · diorama
EN: Sixteen cents looks tiny. Now multiply. Mastercard's card volume in America alone passed two trillion dollars in 2023.
ID: Enam belas sen terlihat kecil. Sekarang kalikan. Volume kartu Mastercard di Amerika saja melewati dua triliun dolar pada 2023.
Visual: kamera naik tinggi; ribuan koin di banyak jalan menuju menara.
Sumber: Benzinga (Merchants Payments Coalition).

## Bab 5: Gate three, the shop's side

### s25 · body · diorama
EN: Last gate, beside the shop. Many small shops never deal with the banks directly. They pay the terminal company one flat price and let it handle everyone else.
ID: Gerbang terakhir, di sebelah toko. Banyak toko kecil tidak pernah berurusan langsung dengan bank. Mereka membayar perusahaan terminal satu tarif rata, lalu perusahaan itu yang mengurus semua pihak lain.
Visual: gerobak tiba di gedung server; owner menyerahkan satu amplop.

### s26 · body · diorama
EN: Stripe's public price for a card tapped in person is two point seven percent plus five cents. On a hundred dollars, two seventy-five. That's the only number the shop ever sees.
ID: Tarif publik Stripe untuk kartu yang di-tap langsung di toko adalah 2,7% plus lima sen. Dari seratus dolar, dua dolar tujuh puluh lima sen. Hanya angka itu yang pernah dilihat toko.
Visual: callout "$2.75" di atas toko.
Sumber: Stripe pricing (in-person).

### s27 · body · diorama
EN: Out of that, the terminal company pays your bank's two-twenty and Visa's sixteen cents.
ID: Dari situ, perusahaan terminal membayarkan dua dolar dua puluh untuk bankmu dan enam belas sen untuk Visa.
Visual: dua aliran koin dari server ke YOUR BANK dan ke menara.

### s28 · body · diorama
EN: What's left, thirty-nine cents, is the markup: the terminal company's own fee, part of which pays the shop's bank behind it. That split is private. It's also the one slice a shop can bargain over.
ID: Sisanya, tiga puluh sembilan sen, adalah markup: biaya milik perusahaan terminal sendiri, sebagian dipakai membayar bank milik toko di belakangnya. Pembagiannya tidak dipublikasikan. Hanya bagian inilah yang bisa ditawar toko.
Visual: 39¢ tersisa di server, sebagian kecil mengalir ke SHOP'S BANK; callout "39¢".
Sumber: Spark (markup satu-satunya bagian yang bisa dinegosiasi).

### s29 · payoff · diorama
EN: So the cart arrives. You were charged one hundred dollars. The shop's account receives ninety-seven twenty-five.
ID: Akhirnya gerobak sampai. Kamu ditagih seratus dolar. Rekening toko menerima sembilan puluh tujuh dolar dua puluh lima sen.
Visual: peta lebar, empat callout tampil bersamaan, gerobak masuk SHOP'S BANK.

## Bab 6: Who really pays

### s30 · rehook · diorama
EN: That's the trip. But someone on this map paid for it without ever touching a card.
ID: Itulah perjalanannya. Tapi ada satu orang di peta ini yang ikut membayar, padahal tidak pernah menyentuh kartu.
Visual: mood dusk; kamera ke antrean, cash payer di belakang you disorot.

### s31 · body · diorama
EN: The shop doesn't swallow two seventy-five on every sale. It builds the toll into the price on the tag.
ID: Toko tidak menelan dua dolar tujuh puluh lima di setiap penjualan. Toko memasukkan tol itu ke harga di label.
Visual: label harga sepatu, koin tol menempel di dalamnya.
Sumber: Boston Fed 2010 (merchant umumnya tidak membedakan harga).

### s32 · body · diorama
EN: And the tag is the same for everyone. The man behind you pays cash. He hands no coins to any gate, and he still pays the toll, inside the price, with no points coming back.
ID: Dan harga di label itu sama untuk semua orang. Pria di belakangmu bayar tunai. Ia tidak menyerahkan koin ke gerbang mana pun, tapi tetap membayar tolnya lewat harga, tanpa poin yang kembali.
Visual: cash payer menyerahkan uang kertas; satu koin bayangan terbang ke tumpukan poin you.
Catatan: callback s09 ("bukan dari kantongmu").

### s33 · body · diorama
EN: In 2010, economists at the Boston Fed put a number on it. By their estimate, the average cash-paying household paid about a hundred and fifty dollars a year to card-using households.
ID: Pada 2010, ekonom di Federal Reserve Boston menghitungnya. Menurut perkiraan mereka, rata-rata rumah tangga yang bayar tunai menyumbang sekitar seratus lima puluh dolar per tahun untuk rumah tangga pengguna kartu.
Visual: rumah cash payer, callout "$149/yr".
Sumber: mymoney.gov (ringkasan Schuh, Shy, Stavins).

### s34 · body · diorama
EN: Card use and rewards rise with income, so on balance the money flows from lower-income households to higher-income ones.
ID: Pemakaian kartu dan hadiahnya naik seiring pendapatan, jadi secara keseluruhan uangnya mengalir dari rumah tangga berpendapatan rendah ke yang berpendapatan tinggi.
Visual: deretan rumah kecil ke besar, koin mengalir sepanjang jalan ke rumah besar.
Sumber: Boston Fed (transfer regresif), NPR.

### s35 · body · diorama
EN: To be fair to the road, the toll buys something. The approval from our last video was your bank promising to pay, so the shop can sell to a stranger without trusting them.
ID: Supaya adil pada jalan tol ini, tolnya memang membeli sesuatu. Approval yang kita bahas di video sebelumnya adalah janji bankmu untuk membayar, sehingga toko bisa menjual ke orang asing tanpa harus percaya padanya.
Visual: YOUR BANK menyala, garis tipis "promise" ke toko.
Catatan: steelman + callback 001.

## Bab 7: Another road

### s36 · rehook · diorama
EN: So how low can a toll like this go? In Indonesia, the answer is printed on a sticker.
ID: Lalu, seberapa murah tol seperti ini bisa? Di Indonesia, jawabannya tercetak di sebuah stiker.
Visual: kamera terbang menyeberang laut ke pulau.

### s37 · body · diorama
EN: Small shops across the country display the same printed square: QRIS, one national QR code that any bank or e-wallet app can scan.
ID: Toko kecil di seluruh negeri memajang kotak cetak yang sama: QRIS, satu kode QR nasional yang bisa dipindai aplikasi bank atau e-wallet mana pun.
Visual: warung dengan stiker QR, beberapa ponsel memindai.

### s38 · body · broll (klip kreator: tangan bayar QRIS di warung)
EN: Here the central bank, Bank Indonesia, sets the toll. By its rules the shop pays it, and it can't be added to the buyer's bill.
ID: Di sini, tarif tolnya ditetapkan bank sentral, Bank Indonesia. Menurut aturannya, toko yang menanggung, dan biaya itu tidak boleh ditambahkan ke tagihan pembeli.
Visual: klip tangan kreator ±10 detik.
Sumber: Bank Indonesia (MDR QRIS).

### s39 · body · diorama
EN: Since October 2026, a QRIS payment up to a hundred thousand rupiah costs any shop nothing. Above that, a regular shop pays zero point seven percent.
ID: Sejak Oktober 2026, pembayaran QRIS sampai seratus ribu rupiah gratis untuk toko mana pun. Di atas itu, toko biasa membayar 0,7%.
Visual: callout "0%" lalu "0.7%" di warung.
Sumber: Antara, Katadata (BI, berlaku 1 Okt 2026).

### s40 · rehook · diorama
EN: On a hundred dollars, zero point seven percent is seventy cents. On the card road, the shop gave up two seventy-five.
ID: Dari seratus dolar, 0,7% berarti tujuh puluh sen. Di jalan tol kartu tadi, toko kehilangan dua dolar tujuh puluh lima sen.
Visual: dua tumpukan koin dibandingkan berdampingan; callout "70¢" dan "$2.75".

### s41 · body · diorama
EN: The comparison isn't perfect. This road doesn't fund card points, and a regulator writes its price list instead of a card company.
ID: Perbandingannya tidak sempurna. Jalan ini tidak membiayai poin kartu, dan daftar tarifnya ditulis regulator, bukan perusahaan kartu.
Visual: kamera mundur, dua jalan (kota dan pulau) terlihat sekaligus.

## Bab 8: Where it all went

### s42 · payoff · diorama
EN: So the two seventy-five didn't disappear. Two dollars twenty went to your bank, and some of it came back to you as points. Sixteen cents went to the road. Thirty-nine cents went to the shop's side.
ID: Jadi dua dolar tujuh puluh lima itu tidak hilang. Dua dolar dua puluh ke bankmu, dan sebagian kembali padamu sebagai poin. Enam belas sen ke pemilik jalan. Tiga puluh sembilan sen ke pihak toko.
Visual: mood night, peta kota lebar, keempat bangunan menyala dengan callout.

### s43 · takeaway · diorama
EN: And the price on the tag already included all of it. Next time you see a sign that says "cash discount", you'll know which toll it's offering to skip.
ID: Dan harga di label sudah memuat semuanya. Lain kali kamu melihat tulisan "diskon bayar tunai", kamu tahu tol mana yang ditawarkan untuk dilewati.
Visual: papan kecil "CASH DISCOUNT" di pintu toko (objek dunia, bukan papan teks), gerbang tol meredup.

### s44 · cta · diorama
EN: Next video: the credit card's famous origin story, and why the man who told it later said he made it up.
ID: Video berikutnya: kisah asal-usul kartu kredit yang terkenal, dan kenapa orang yang menceritakannya belakangan mengaku cerita itu karangan.
Visual: dompet tertinggal di meja restoran, end screen.
Sumber: riset 001 (memoar Matty Simmons 1995).

## Potongan Shorts
- B1-100-dollar-split: s01, s03, s13, s23, s28. Hook: "You pay $100. The shop gets $97.25." (3 istilah: Visa/network, interchange tersirat, markup)
- B2-cash-pays-points: s31, s32, s21, s33. Hook: "The person paying cash behind you is paying for your points." (1 istilah: rewards)

## Pronunciations
- QRIS → "KYOO-ris"
- rupiah → "roo-PEE-ah"
- Angka persen di EN ditulis dalam kata di narasi supaya TTS membacanya benar. Versi ID: angka dibaca natural ("nol koma tujuh persen").

## QA anti-slop teks (skill video-anti-slop, lapisan Teks, fallback spoken-script-rules)
| Dimensi | EN | ID | Catatan |
| --- | --- | --- | --- |
| Directness | 9 | 9 | Hook angka di s01, pembagian lengkap sudah dibayar di s03 (±0:20) |
| Rhythm | 8 | 7 | Kalimat pendek bervariasi; ID sedikit lebih panjang di s28, s33 |
| Trust | 8 | 8 | Semua angka bersumber; contoh hipotetis ditandai (s21); 2010 disebut (s33) |
| Authenticity | 7 | 7 | Sudut Indonesia + 2 klip tangan kreator; turun bila klip tidak direkam |
| Density | 8 | 8 | Durasi dari contoh, bukan konsep tambahan |
| **Total** | **40/50** | **39/50** | Ambang 35: LULUS |

Temuan kecil yang sengaja dipertahankan: s12 (tebakan dipatahkan) dan s41 (perbandingan tidak sempurna) mirip pola kontras, dipakai sekali masing-masing karena faktual. Tanpa em dash, tanpa penutup ringkasan basa-basi. Pola slop Indonesia: tidak ditemukan ("Nah", "Yuk", "Tahukah kamu" tidak dipakai).

## Sumber
- Visa interchange (tabel 24 Okt 2026, kartu dasar 1,51% + $0,10): https://www.chargeflow.io/blog/interchange-fees
- Visa Signature Preferred retail 2,10% + $0,10: https://www.helcim.com/visa-usa-interchange-rates/ (cocokkan: https://usa.visa.com/content/dam/VCOM/download/merchants/visa-usa-interchange-reimbursement-fees.pdf)
- Visa assessment 0,14% dan APF $0,0195: https://wellsfargo.com/merchantpassthroughfees
- Stripe in-person 2,7% + 5¢: https://stripe.com/pricing
- Visa + Mastercard >80% volume kredit AS: https://fool.com/money/research/average-credit-card-processing-fees-costs-america
- Mastercard volume AS >$2 triliun: https://benzinga.com/news/24/04/38090169/mastercard-set-to-increase-credit-card-fees-adding-millions-in-costs-for-retailers-after-visa-settle
- Interchange porsi terbesar: https://nav.com/blog/credit-card-processing-fees
- Markup satu-satunya yang bisa dinegosiasi: https://www.spark.money/glossary/assessment-fee
- Reward didanai interchange: https://staxpayments.com/blog/visa-interchange-rates/
- Boston Fed 2010 ($149/tahun): https://www.mymoney.gov/node/82113 ; https://www.npr.org/sections/money/2010/07/27/128797815/credit-card-rewards-the-poor-pay-the-rich-benefit
- MDR QRIS (ditanggung merchant): https://www.bi.go.id/id/publikasi/ruang-media/cerita-bi/Pages/mdr-QRIS.aspx
- MDR QRIS 0% s.d. Rp100 ribu mulai 1 Okt 2026: https://www.antaranews.com/berita/5697901/bi-perluas-kebijakan-mdr-qris-0-persen-untuk-pelaku-umkm ; https://katadata.co.id/finansial/keuangan/6a82850639067/bi-rilis-dua-kebijakan-saat-hut-ri-perluas-mdr-qris-0-dan-luncurkan-kki-ritel
