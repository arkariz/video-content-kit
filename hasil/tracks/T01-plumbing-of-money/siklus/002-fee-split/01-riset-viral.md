# Riset viral: T01 sprint V2 (dipakai siklus 001, 002, 003)

Tanggal: 2026-11-24 · Sumber: web search. View count belum terverifikasi; isi lewat YouTube Data API bila `YOUTUBE_API_KEY` ada.

## Video pembanding

| Video | Channel | Umur | View | Catatan |
| --- | --- | --- | --- | --- |
| [What Actually Happens when I Tap a Credit Card?](https://www.pulse.bot/fintech/video/what-actually-happens-when-i-tap-a-credit-card-0656d471-b3f4-45fd-8463-1de441d865b7/) | Cleo Abram | 2026-06-15 (>90 hari) | belum terverifikasi | Disponsori Mastercard; fokus chip, enkripsi, token. Tidak membahas settlement |
| [How Visa Makes Money on Every Transaction](https://www.youtube.com/watch?v=WN-SYD-QLUM) | belum terverifikasi | ±49 hari | belum terverifikasi | Model bisnis Visa |
| [How Visa Actually Makes Money (It's Not What You Think)](https://www.youtube.com/watch?v=B5gK64d6_x0) | belum terverifikasi | ±85 hari | belum terverifikasi | Pola judul "not what you think" |
| [How Visa Makes Money](https://www.youtube.com/watch?v=_Uqx9s0TdCY) | belum terverifikasi | ±97 hari | belum terverifikasi | Pembuka "Visa isn't a bank" |
| [Swipe fees driving up prices (Shorts)](https://www.youtube.com/shorts/LZfqLGpKN2A) | belum terverifikasi | ±116 hari | belum terverifikasi | Framing biaya ke konsumen |

Aturan outlier (≥3x median 10 video terakhir channel) belum bisa dihitung. Tugas berikutnya di repo: isi view dan median channel lewat API, tandai mana yang outlier.

## Tiga pola

1. Judul "How X makes money" plus twist ("not what you think", "isn't a bank") mendominasi topik fee. Bukti: 3 video Visa dalam ±100 hari dengan pola sama.
2. Video tap kartu berhenti di sisi chip/NFC/enkripsi ("approved dalam 2 detik"). Bukti: Cleo Abram; konten LinkedIn/podcast "2 seconds" sejenis.
3. Konten sejarah mengulang cerita resmi perusahaan (dompet Diners Club, ide ATM) tanpa memeriksa sumber.

## Celah (bukti milik kreator)

- Authorization ≠ settlement: "approved" hanya pesan; uang pindah lewat clearing/settlement belakangan (rentang hari per pasar belum terverifikasi). Kreator menjelaskan alur pesan (ISO 8583) dari sisi engineer aplikasi keuangan.
- Pembagian fee per pihak untuk satu transaksi (issuer, network, acquirer, processor) dengan angka publik: rata-rata interchange AS sekitar 2,36% (PYMNTS, 2026-11-16). Tanpa nasihat produk.
- Mitos asal-usul: Matty Simmons (VP Diners Club) di memoar 1995 menyebut cerita dompet dikarang untuk PR; kajian akademik menyebutnya "probably apocryphal". ATM pertama (1967) memakai cek kertas ber-carbon-14, maksimal £10 per transaksi.

## Usulan sudut (DIPILIH: semua, opsi 1, 2026-11-24)

| Variasi | Siklus | Judul kerja | Hook draf | Bukti kreator | Risiko slop |
| --- | --- | --- | --- | --- | --- |
| A | 001 | Your Card Said "Approved." The Shop Hasn't Been Paid. | "Your card said approved. The shop hasn't been paid yet. That happens later, in a second system most people never hear about." | Alur authorization vs clearing/settlement | Diagram generik "4 kotak + panah"; wajib alur pesan nyata |
| B | 002 | You Pay $100. Here's Who Takes a Cut. | "Every tap pays four companies. On a $100 purchase, here is how much each one takes." | Pecah biaya per pihak, angka publik | Angka harus bersumber dan diberi konteks pasar (AS); jangan jadi nasihat |
| C1 | 003 | The Credit Card's Origin Story Was Made Up by Its PR Man | "The credit card began with a forgotten wallet. Except the man who told that story later said he made it up." | Cek sumber primer | Klaim pakai atribusi (memoar Simmons), bukan "terbukti bohong" |
| C2 | 003 | The First ATM Took Radioactive Cheques | "In 1967, the first cash machine didn't take cards. It took paper cheques laced with carbon-14." | Konteks keamanan pembayaran | Beri skala ("mildly radioactive"), jangan dramatisasi |

Sub-sudut dan gaya hook sama dengan `validasi/rencana.md` (terkunci); yang berubah hanya judul kerja. Semua judul masih judul kerja, skor anti-slop di langkah naskah.

Tidak dipakai: sengketa swipe fee Visa/Mastercard (berita kebijakan berjalan, masuk "Tidak akan dibahas").

## Sumber

- https://muse.jhu.edu/article/549589
- https://stacker.news/items/1612801
- https://dinersclub.com/about-us/history
- https://finextra.com/newsarticle/21405/john-shepherd-barron-inventor-of-the-cash-machine-dies-aged-84
- https://home.barclays/news/2017/06/from-the-archives-the-atm-is-50
- https://www.pymnts.com/cpi-posts/visa-mastercard-seek-approval-for-38-billion-swipe-fee-settlement/

## Riset fakta

Diperiksa 2026-11-28 (setelah gambar pertama dibuat). Halaman yang tidak terbuka ditulis di Catatan.

| id | Klaim | Sumber (URL) | Kutipan / halaman | Status | Catatan |
| --- | --- | --- | --- | --- | --- |
| C01 | Visa USA, berlaku 24 Okt 2026, retail kartu hadir: baris Product 2, All Other 1,51% + $0,10 | https://usa.visa.com/content/dam/VCOM/download/merchants/visa-usa-interchange-reimbursement-fees.pdf | baris "Product 2", kolom All Other | terverifikasi | dibaca dari teks PDF; kolom dipetakan dari urutan judul. Bahwa baris ini tarif toko sepatu standar adalah tafsiran naskah |
| C02 | Pada tabel yang sama, Visa Signature Preferred 2,10% + $0,10 | https://usa.visa.com/content/dam/VCOM/download/merchants/visa-usa-interchange-reimbursement-fees.pdf | baris "Product 2", kolom Signature Preferred | terverifikasi | "kartu premium" di video = Signature Preferred |
| C03 | Visa credit assessment 0,14% dari nilai transaksi | https://www.helcim.com/visa-usa-interchange-rates/ | "Visa Card-Brand / 0.1400%"; juga Shopify (jadwal Fiserv April 2026) | terverifikasi | PDF Wells Fargo dan NCOSC tidak terbaca; sumber yang terbaca pemroses pembayaran |
| C04 | Biaya Visa per otorisasi kredit sekitar $0,0195 | https://www.helcim.com/visa-usa-interchange-rates/ | "Visa NAPF ... Credit / $0.0195" | terverifikasi | label di sumber NAPF, tanpa tanggal berlaku |
| C05 | Stripe, kartu domestik di toko: 2,7% + 5 sen | https://stripe.com/pricing | "2.7% + 5¢" | terverifikasi | diperiksa 2026-11-28 |
| C06 | Visa dan Mastercard lebih dari 80% volume transaksi kartu kredit AS | https://fool.com/money/research/average-credit-card-processing-fees-costs-america | "over 80% of U.S. credit card transaction volume" | terverifikasi | sumber sekunder |
| C07 | Kartu Visa dan Mastercard terbitan AS: $9,986 triliun volume pembelian 2025 | https://nilsonreport.com/articles/mastercard-and-visa-cards-in-the-us-2025/ | "$9.986 trillion in purchase volume in 2025" | terverifikasi | mencakup kredit, debit, prabayar |
| C08 | Interchange adalah biaya transfer antara bank acquirer (pihak toko) dan bank penerbit kartu | https://www.visa.com/en-us/support/business/regulation-fees | "transfer fees between acquiring banks and issuing banks" | disederhanakan | Visa menyatakan merchant tidak membayar interchange langsung; video menyebut "pihak toko" |
| C09 | Visa menetapkan tarif interchange; tarif berbeda menurut jenis kartu, kategori merchant, dan cara kartu dipakai | https://www.helcim.com/visa-usa-interchange-rates/ | "Interchange rates are determined by Visa" | terverifikasi | sumber pemroses |
| C10 | Interchange porsi terbesar biaya pemrosesan kartu | https://nav.com/blog/credit-card-processing-fees | "largest portion of credit card processing costs" | terverifikasi |  |
| C11 | Dana transaksi kartu sampai ke rekening toko sekitar 1 sampai 3 hari kerja | https://stripe.com/en-cy/resources/more/payment-settlement-explained-how-it-works-and-how-long-it-takes | ringkasan hasil pencarian | disederhanakan | halaman tidak dibuka penuh |
| C12 | Markup pemroses adalah bagian yang bisa dinegosiasi; assessment tidak | https://www.spark.money/glossary/assessment-fee | "processor markup (the only negotiable piece)" | terverifikasi |  |
| C13 | Usaha kecil yang memenuhi syarat punya baris tarif lebih murah | https://www.helcim.com/visa-usa-interchange-rates/ | "preferential interchange rates for qualifying small businesses" | terverifikasi |  |
| C14 | Pendapatan utama fungsi transaksi kartu kredit bank adalah interchange, dan rewards dibiayai dari arus itu | https://www.federalreserve.gov/econres/notes/feds-notes/credit-card-profitability-20220909.html | "main source of revenue for the transaction function is interchange" | disederhanakan | Rewards bisa melebihi interchange; bagian nasabah lunas penuh tidak diverifikasi terpisah; sampel 13 bank 2014-2021 |
| C15 | Contoh hitungan: dari $100 dengan harga rata, $2,20 interchange, $0,16 Visa, $0,39 sisa; kartu biasa menyisakan $0,98; kaus kaki $5 membuat pemroses tekor sekitar 5 sen | https://usa.visa.com/content/dam/VCOM/download/merchants/visa-usa-interchange-reimbursement-fees.pdf | turunan C01 sampai C05 | terverifikasi | hitungan: 2,75-2,20-0,16=0,39; 0,185-0,205-0,0265=-0,047; 1000 pasang: $2.750 setara 27,5 harga sepatu |
| C16 | Cashback 1,5% pada $100 adalah $1,50 |  | contoh pengandaian di narasi | disederhanakan | bukan tarif kartu tertentu |
| C17 | Merchant umumnya tidak memberi harga berbeda menurut cara bayar | https://www.bostonfed.org/publications/public-policy-discussion-paper/2010/who-gains-and-who-loses-from-credit-card-payments-theory-and-calibrations.aspx | "merchants generally do not set differential prices" | terverifikasi |  |
| C18 | Boston Fed (DP 10-3, revisi Agustus 2010): rumah tangga tunai rata-rata mentransfer $149 per tahun ke pemakai kartu; regresif setelah rewards dihitung | https://www.bostonfed.org/publications/public-policy-discussion-paper/2010/who-gains-and-who-loses-from-credit-card-payments-theory-and-calibrations.aspx | "each cash-using household pays $149"; "regressive transfer" | terverifikasi | versi lain menyebut $151; tautan lama mymoney.gov 404 |
| C19 | QRIS adalah standar kode QR pembayaran yang ditetapkan Bank Indonesia; satu kode untuk semua aplikasi | https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/ritel/kanal-layanan/qris/default.aspx | "standar QR Code Pembayaran yang ditetapkan oleh Bank Indonesia" | terverifikasi |  |
| C20 | Mulai 1 Okt 2026: MDR QRIS 0% sampai Rp100 ribu; usaha kecil, menengah, besar 0,7% di atasnya; mikro 0% sampai Rp500 ribu | https://www.antaranews.com/berita/5697901/bi-perluas-kebijakan-mdr-qris-0-persen-untuk-pelaku-umkm | "mulai 1 Oktober 2026"; "MDR 0,7 persen" | terverifikasi | mikro 0,3% di atas Rp500 ribu; ada kategori lain di luar reguler |
| C21 | MDR ditanggung merchant dan tidak boleh dibebankan ke pembeli | https://www.antaranews.com/berita/5697901/bi-perluas-kebijakan-mdr-qris-0-persen-untuk-pelaku-umkm | "tidak boleh dibebankan kepada konsumen atau pembeli" | terverifikasi |  |
| C22 | Otorisasi kartu adalah persetujuan penerbit; transaksi yang disetujui masih bisa batal atau disengketakan | https://stripe.com/resources/more/card-authorization-explained | "approval from a credit or debit card issuer" | terverifikasi | TIDAK mendukung kata "janji pembayaran" tanpa syarat |
| C23 | Approval adalah janji bank yang membuat toko bisa menjual ke orang asing, dan kartu mengurangi urusan uang tunai (narasi s39) |  | tidak ditemukan sumber | belum | hasil pencarian: otorisasi bukan jaminan terhadap chargeback; usul pelunakan narasi |
| C24 | Matty Simmons belakangan menulis bahwa ia mengarang cerita dompet Diners Club (narasi s49) | https://en.wikipedia.org/wiki/Diners_Club_International | "that never happened and the story was invented" | belum | halaman yang terbaca mengaitkan bantahan ke Simmons, tidak menyatakan ia menulis bahwa ia pengarangnya; blog Birch menyatakan demikian; NerdWallet 403 |

**Subjek yang digambar:** kartu, mesin kartu, sepatu, kaus kaki, koin, label harga, tabel tarif, uang tunai, rumah tangga (C01-C18); stiker QR, warung, bank sentral, lembar uang rekaan (C19-C21). Gerobak, jalan tol, gerbang, menara pengawas, server berwajah, dan bank berwajah adalah **metafora**; tidak ada wujud nyata jaringan atau pemroses yang digambar.

**Miskonsepsi:** jaringan kartu (Visa) mengambil bagian terbesar (pada contoh ini yang terkecil di antara potongan yang bisa dihitung, C01-C04); uang kartu langsung masuk laci toko (C11); pembayar tunai tidak ikut menanggung biaya kartu (C17, C18).

**Belum pasti:** C23 dan C24. Gambar yang menyertainya diperlakukan sebagai metafora dan narasinya perlu keputusan kreator.
