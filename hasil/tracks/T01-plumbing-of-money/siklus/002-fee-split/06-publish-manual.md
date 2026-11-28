# Unggah manual: siklus 002 (fee split, uji V2)

Versi produksi ulang (2026-11-28). Jadwal mengikuti `06-rilis.json`: master **2 Desember 10.00**, Short 1 **3 Desember 12.00**, Short 2 **4 Desember 15.00** WIB.

## Publish lewat dashboard rilis (keputusan kreator 2026-11-28)
Teks YouTube dan Facebook sudah ada di `06-rilis.json`. Urutan:
1. Hapus enam unggahan lama di YouTube Studio **dan** Meta Business Suite:
   - Master: https://www.youtube.com/watch?v=0Mg_mmMzF5g · https://www.facebook.com/reel/2371631973657530/
   - Short 1: https://www.youtube.com/watch?v=OQJxkEL8K58 · https://www.facebook.com/reel/1705005934367306/
   - Short 2: https://www.youtube.com/watch?v=FfuEICU-y2o · https://www.facebook.com/reel/4575236526069035/
2. Selesai 2026-11-28: platform memastikan enam video hilang dan catatan lama sudah dihapus.
3. Di dashboard (klik dua kali `Rilis.command`, siklus T01 002): **Buka kunci** (ketik BUKA), nyalakan **Kirim siklus ini ke Facebook lewat alat**.
4. Periksa isi, lalu **Setujui** (ketik SETUJU), **Kirim ke YouTube** dan **Kirim ke Facebook**.
5. Setelah terkirim, di Studio: nyalakan label konten AI, pasang end screen dan video terkait; pin komentar setelah tayang. Instagram dan TikTok tetap manual.

**Jangan jalankan `approve.mjs` / `publish.mjs send` untuk siklus ini**, supaya tidak terunggah dua kali.

## Sebelum mengunggah
- [x] QA otomatis lulus (0 kritis); pengucapan "QRIS" di s41 diterima kreator 2026-11-27.
- [x] QA anti-slop versi produksi ulang LULUS, dinilai agent (`05-qa.md`); temuan terbuka: s39 dan s49 belum terbukti sumbernya, musik pinjaman dari 004.
- [ ] Tonton master dan kedua Short penuh dengan suara.
- [ ] Angka biaya adalah satu contoh AS; cocokkan tarif Visa (24 Okt 2026) dan assessment di sumbernya. Stripe 2,7% + 5 sen sudah dicek di stripe.com/pricing 2026-11-26.
- [ ] Naskah menyebut Visa dan Mastercard; pastikan tidak ada logo merek di gambar, sampul, dan komentar.
- [ ] Cek ketentuan ElevenLabs untuk pemakaian komersial suara dan musik (musik dipakai ulang dari 004).

## Setelan semua platform
- Label konten AI: **nyalakan** (YouTube "Altered or synthetic content", Instagram/Facebook "AI info", TikTok "AI-generated content").
- Tanpa tambahan musik dari pustaka platform.
- Hashtag: pakai persis yang tertulis (Instagram maksimal 5).
- Short diunggah langsung ke tiap platform dari file asli.

## 2 Des 10.00: Master di YouTube
- File: `produksi/render/T01/002/Master16x9-en.mp4` (8:07)
- Thumbnail: `produksi/render/T01/002/Thumbnail-A.png`. Bila "Test & compare" tersedia, unggah juga `Thumbnail-B.png` (dengan judul cadangan 1) dan `Thumbnail-C.png` (dengan judul cadangan 2).
- Judul:

```text
Who Takes a Cut When You Tap Your Card?
```

Judul cadangan:

```text
Guess Who Takes the Most When You Tap Your Card
The Card Fee Hiding Inside the Price Tag
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
https://www.bostonfed.org/publications/public-policy-discussion-paper/2010/who-gains-and-who-loses-from-credit-card-payments-theory-and-calibrations.aspx
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
Siapa yang Dapat Potongan Saat Kamu Tap Kartu?
```

- Monetisasi, bila sudah aktif: mid-roll di 3:26 dan 5:31.
- End screen: pasang di akhir video, elemen Subscribe dan "Best for viewer".
- Komentar pin:

```text
Four companies, one tap. Did any part of the $2.75 surprise you?

Why "approved" doesn't mean the shop is paid: https://www.youtube.com/watch?v=z3M5k4pXXhw
```

- URL YouTube: 

## 2 Des 10.00: Master di Facebook (video Page)
- File dan thumbnail sama. Unggah `publish/master.en_US.srt` sebagai caption.
- Judul:

```text
Who Takes a Cut When You Tap Your Card?
```

- Teks:

```text
You tap a card for a $100 pair of shoes. The shop keeps $97.25. Here's who takes the other $2.75 in one US example, and who ends up paying.

#CreditCards #Payments #MoneyExplained
```
- URL Facebook: 


## 3 Des 12.00: Short 1: the $100 split
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


## 4 Des 15.00: Short 2: cash pays too
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
