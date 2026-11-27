# Unggah manual: siklus 002 (fee split, uji V2)

Semua tayang **28 November 2026 (WIB)**: master 10.00, Short 1 12.00, Short 2 16.00. Jam mengikuti pola 005; ubah bila mau. Isi kolom URL setelah tayang, lalu kirim ke agent untuk dicatat.

**Jangan jalankan `approve.mjs` / `publish.mjs send` untuk siklus ini**, supaya tidak terunggah dua kali.

## Sebelum mengunggah
- [x] QA otomatis lulus (0 kritis); pengucapan "QRIS" di s41 diterima kreator 2026-11-27.
- [x] QA anti-slop manual dilewati atas keputusan kreator 2026-11-27 (`05-qa.md`); bukan LULUS.
- [ ] Tonton master dan kedua Short penuh dengan suara.
- [ ] Angka biaya adalah satu contoh AS; cocokkan tarif Visa (24 Okt 2026) dan assessment di sumbernya. Stripe 2,7% + 5 sen sudah dicek di stripe.com/pricing 2026-11-26.
- [ ] Naskah menyebut Visa dan Mastercard; pastikan tidak ada logo merek di gambar, sampul, dan komentar.
- [ ] Cek ketentuan ElevenLabs untuk pemakaian komersial suara dan musik (musik dipakai ulang dari 004).

## Setelan semua platform
- Label konten AI: **nyalakan** (YouTube "Altered or synthetic content", Instagram/Facebook "AI info", TikTok "AI-generated content").
- Tanpa tambahan musik dari pustaka platform.
- Hashtag: pakai persis yang tertulis (Instagram maksimal 5).
- Short diunggah langsung ke tiap platform dari file asli.

## 10.00: Master di YouTube
- File: `produksi/render/T01/002/Master16x9-en.mp4` (8:07)
- Thumbnail: `produksi/render/T01/002/Thumbnail-A.png`. Bila "Test & compare" tersedia, unggah juga `Thumbnail-B.png` dan dua judul cadangan.
- Judul:

```text
You Pay $100. Here's Who Takes a Cut.
```

Judul cadangan:

```text
Every Card Tap Pays 4 Companies. Here's the Split.
Where $2.75 Goes When You Tap a Card
```

- Deskripsi:

```text
After watching, you know where $2.75 of a $100 card purchase goes in one worked US example, who takes it, and who ends up paying.

0:00 The tap
0:29 The toll road
1:45 Gate one: your bank
3:26 Gate two: the network
3:50 Gate three: the shop's side
5:31 Who helps pay
6:31 Another road
7:34 Where it all went

One worked US example; fees differ by card, shop and country. This video explains how the fees work and is not financial advice.
Narration, music and sound effects are AI-generated. Visuals are original animation. Not affiliated with Visa, Mastercard or any bank.

Sources:
https://fool.com/money/research/average-credit-card-processing-fees-costs-america
https://nav.com/blog/credit-card-processing-fees
https://nilsonreport.com/articles/mastercard-and-visa-cards-in-the-us-2025/
https://staxpayments.com/blog/visa-interchange-rates/
https://usa.visa.com/content/dam/VCOM/download/merchants/visa-usa-interchange-reimbursement-fees.pdf
https://wellsfargo.com/merchantpassthroughfees
https://www.antaranews.com/berita/5697901/bi-perluas-kebijakan-mdr-qris-0-persen-untuk-pelaku-umkm
https://www.helcim.com/visa-usa-interchange-rates/
https://www.mymoney.gov/node/82113
https://www.nerdwallet.com/article/small-business/stripe-fees
https://www.nerdwallet.com/blog/credit-cards/matty-simmons-interview
https://www.spark.money/glossary/assessment-fee

#CreditCards #Payments #HowMoneyWorks
```

- Tag:

```text
credit card fees, interchange fees, swipe fees, how payments work, where card fees go, interchange explained, merchant fees, Visa fees, Mastercard, card network, cash discount, QRIS, payments explained, money explained, fintech
```

- Playlist: `How Money Moves` (buat bila belum ada).
- Setelan: kategori Education; bahasa video English; bukan "made for kids"; izinkan embed; komentar aktif.
- Subtitle: `hasil/tracks/T01-plumbing-of-money/siklus/002-fee-split/publish/master.en.srt` dan `hasil/tracks/T01-plumbing-of-money/siklus/002-fee-split/publish/master.id.srt`. Waktu versi Indonesia dibagi otomatis per scene; periksa sekilas.
- Terjemahan judul (Indonesia):

```text
Kamu Bayar $100. Siapa Saja yang Dapat Potongan?
```

- Monetisasi, bila sudah aktif: mid-roll di 3:26 dan 5:31.
- End screen: pasang di akhir video, elemen Subscribe dan "Best for viewer".
- Komentar pin:

```text
Four companies, one tap. Did any part of the $2.75 surprise you?

Why "approved" doesn't mean the shop is paid: https://www.youtube.com/watch?v=z3M5k4pXXhw
```

- URL YouTube: 

## 10.00: Master di Facebook (video Page)
- File dan thumbnail sama. Unggah `publish/master.en_US.srt` sebagai caption.
- Judul:

```text
You Pay $100. Here's Who Takes a Cut.
```

- Teks:

```text
You tap a card for a $100 pair of shoes. The shop keeps $97.25. Here's who takes the other $2.75 in one US example, and who ends up paying.

#CreditCards #Payments #MoneyExplained
```
- URL Facebook: 


## 12.00: Short 1: the $100 split
- File: `produksi/render/T01/002/Short9x16-B1-100-dollar-split-en.mp4`
- Sampul: `produksi/render/T01/002/Thumbnail-Short-B1-100-dollar-split.png`
- Subtitle: `hasil/tracks/T01-plumbing-of-money/siklus/002-fee-split/publish/B1-100-dollar-split.en.srt` (Indonesia: `B1-100-dollar-split.id.srt`). Caption sudah menempel di video.

### YouTube Shorts
Judul:

```text
You pay $100. The shop gets $97.25.
```

Deskripsi:

```text
In one worked US example of a $100 card payment, $2.20 goes to your bank, 16 cents to Visa, and 39 cents to the card machine company and the shop's bank.

Full video on the channel.
Narration and animation made with AI tools.

#CreditCards #Payments #MoneyExplained #Shorts
```

Tag:

```text
credit card fees, interchange, swipe fees, small business, shorts
```

"Related video": pilih master. Komentar pin:

```text
Did you think the shop got the full price? Full story in the long video on this channel.
```

### Instagram Reels

```text
You pay $100. The shop gets $97.25.

In one worked US example of a $100 card payment, $2.20 goes to your bank, 16 cents to Visa, and 39 cents to the card machine company and the shop's bank.

Send this to someone who always pays by card.

#CreditCards #Payments #MoneyExplained #SmallBusiness #Fintech
```
- Sampul dari file di atas; aktifkan "Also share to feed".

### Facebook Reels

```text
You pay $100. The shop gets $97.25.

In one worked US example of a $100 card payment, $2.20 goes to your bank, 16 cents to Visa, and 39 cents to the card machine company and the shop's bank.

#CreditCards #Payments #MoneyExplained
```

### TikTok

```text
You pay $100. The shop gets $97.25. How credit card fees work: In one worked US example of a $100 card payment, $2.20 goes to your bank, 16 cents to Visa, and 39 cents to the card machine company and the shop's bank.

#CreditCards #Payments #MoneyExplained #SmallBusiness #Fintech
```

URL YouTube: 
URL Instagram: 
URL Facebook: 
URL TikTok: 


## 16.00: Short 2: cash pays too
- File: `produksi/render/T01/002/Short9x16-B2-cash-pays-too-en.mp4`
- Sampul: `produksi/render/T01/002/Thumbnail-Short-B2-cash-pays-too.png`
- Subtitle: `hasil/tracks/T01-plumbing-of-money/siklus/002-fee-split/publish/B2-cash-pays-too.en.srt` (Indonesia: `B2-cash-pays-too.id.srt`). Caption sudah menempel di video.

### YouTube Shorts
Judul:

```text
The man paying cash behind you helps pay the card toll.
```

Deskripsi:

```text
Shops often don't charge less for cash, so the card fee gets built into the price on the tag. Cash payers cover part of it and get no points back.

Full video on the channel.
Narration and animation made with AI tools.

#Cash #CreditCards #MoneyExplained #Shorts
```

Tag:

```text
cash vs card, credit card fees, cash discount, credit card points, shorts
```

"Related video": pilih master. Komentar pin:

```text
Do shops near you give a discount for cash? Full story in the long video on this channel.
```

### Instagram Reels

```text
The man paying cash behind you helps pay the card toll.

Shops often don't charge less for cash, so the card fee gets built into the price on the tag. Cash payers cover part of it and get no points back.

Send this to someone who always pays by card.

#Cash #CreditCards #MoneyExplained #Payments #Fintech
```
- Sampul dari file di atas; aktifkan "Also share to feed".

### Facebook Reels

```text
The man paying cash behind you helps pay the card toll.

Shops often don't charge less for cash, so the card fee gets built into the price on the tag. Cash payers cover part of it and get no points back.

#Cash #CreditCards #MoneyExplained
```

### TikTok

```text
The man paying cash behind you helps pay the card toll. How credit card fees work: Shops often don't charge less for cash, so the card fee gets built into the price on the tag. Cash payers cover part of it and get no points back.

#Cash #CreditCards #MoneyExplained #Payments #Fintech
```

URL YouTube: 
URL Instagram: 
URL Facebook: 
URL TikTok: 


## Opsional: master di TikTok
Tidak disarankan sebagai unggahan utama: video 16:9 sepanjang 8 menit. Cukup kedua Short.

## Setelah tayang
- [ ] 1 jam pertama: balas komentar.
- [ ] Kirim URL master 002 ke agent: dipakai untuk card dan komentar pin di video 005.
- [ ] Story / Community:

```text
You pay $100. The shop gets $97.25. Who took the rest? New video is up.
```
- [ ] 48 jam: catat CTR thumbnail, retensi detik 15 pada Short, viewed vs swiped.

## Catatan
- Jadwal dipasang lewat fitur jadwal bawaan platform (YouTube Studio, Meta Business Suite, TikTok Studio).
- Short 1 sekitar 29 detik, Short 2 33 detik.
