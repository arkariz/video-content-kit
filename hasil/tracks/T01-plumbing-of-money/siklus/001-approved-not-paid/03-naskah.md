# Naskah: siklus 001-approved-not-paid (T01, uji-V2 variasi A)

Tanggal: 2026-11-24 · Status: menunggu persetujuan kreator · Kata EN: 1153 (±7.7 menit pada 150 wpm) · Kata ID: 965

**Janji:** After watching, you can tell which system created each line in your bank app (pending, posted, or the one that disappears) and why the shop gets paid days after you tap.

**Judul (3 varian):**
1. Your Card Said "Approved." The Shop Hasn't Been Paid.
2. "Approved" Doesn't Mean Paid: What Happens After You Tap
3. Where Your Money Actually Is After You Tap Your Card

**Teks thumbnail:** APPROVED ≠ PAID / $0.00 MOVED

## Naskah per scene

### s01 · hook · remotion-diagram

EN: Your card just said approved. The coffee shop hasn't been paid, and it won't be today.

ID: Approved dalam dua detik. Tapi kedai kopinya belum dibayar, dan hari ini pun belum.

Visual: Terminal menampilkan APPROVED; di sebelahnya saldo rekening kedai kopi tetap $0.00 · Teks layar: "APPROVED · shop received: $0.00"

### s02 · context · remotion-diagram

EN: Approved is a message. The money moves later, through two more systems most people never hear about.

ID: Approved itu cuma pesan. Uangnya pindah belakangan, lewat dua sistem lain yang jarang orang dengar.

Visual: Garis waktu tiga blok: Authorization (sekarang), Clearing (malam ini), Settlement (1 sampai 3 hari kerja). Hanya blok pertama menyala

### s03 · context · remotion-diagram

EN: By the end, you'll know where every line in your bank app comes from: pending, posted, and the one that disappears.

ID: Di akhir video, kamu bakal tahu asal tiap baris di aplikasi bank: pending, posted, dan yang tiba-tiba hilang.

Visual: Mockup daftar transaksi generik (bukan aplikasi bank tertentu): satu baris Pending, satu Posted, satu dicoret · Teks layar: "pending · posted · gone"

### s04 · body · remotion-diagram

EN: Start with the tap. Your card, or your phone, hands the terminal a card number and a one-time code.

ID: Mulai dari tap. Kartu atau HP kamu memberi terminal nomor kartu dan satu kode sekali pakai.

Visual: Kartu → terminal, dua paket data: nomor kartu, cryptogram · Teks layar: "card number + one-time cryptogram"

### s05 · body · remotion-diagram

EN: That code exists for this purchase only. Copy it and replay it tomorrow, and the bank rejects it.

ID: Kode itu cuma berlaku untuk transaksi ini. Disalin lalu dipakai ulang besok, bank akan menolaknya.

Visual: Cryptogram disalin, dikirim ulang, dicap REJECTED

### s06 · body · remotion-diagram

EN: Pay with your phone, and the terminal never sees your real card number. It gets a token, a stand-in number that only works from that device.

ID: Kalau bayar pakai HP, terminal bahkan tidak pernah melihat nomor kartu aslimu. Yang dikirim token, nomor pengganti yang cuma berlaku dari HP itu.

Visual: Nomor kartu asli disamarkan; token berbeda dikirim dari HP · Teks layar: "token ≠ card number"

### s07 · body · remotion-diagram

EN: If a shop's system gets hacked, a stolen token is useless anywhere else.

ID: Kalau sistem toko dibobol, token yang dicuri tidak bisa dipakai di tempat lain.

Visual: Token curian dicoba di toko lain lalu ditolak

### s08 · body · remotion-diagram

EN: The terminal passes everything to the shop's bank, called the acquirer. The acquirer doesn't know you. It only knows where to send the question.

ID: Terminal meneruskan semuanya ke bank milik toko, namanya acquirer. Acquirer tidak kenal kamu. Ia cuma tahu ke mana pertanyaan ini harus dikirim.

Visual: Terminal → Acquirer · Teks layar: "ACQUIRER = the shop's bank"

### s09 · body · remotion-diagram

EN: It sends it to the card network, Visa or Mastercard. The network reads the first six to eight digits of the card number, finds the bank that issued it, and forwards the message.

ID: Acquirer mengirimnya ke jaringan kartu, Visa atau Mastercard. Jaringan membaca enam sampai delapan digit pertama nomor kartu, mencari bank penerbitnya, lalu meneruskan pesannya.

Visual: Acquirer → Network; 6 sampai 8 digit pertama disorot (BIN) → Issuer · Teks layar: "BIN = first 6–8 digits"

### s10 · body · remotion-diagram

EN: The network holds none of your money and lends you nothing. It carries messages, and charges a small fee on each one.

ID: Jaringan kartu tidak menyimpan uangmu dan tidak meminjamkan apa pun. Ia mengantar pesan, dan memungut biaya kecil untuk tiap pesan.

Visual: Network digambar sebagai jalur pesan, ikon biaya kecil per pesan · Teks layar: "network = messages, not money"

### s11 · body · remotion-code

EN: Banks have passed these messages in the same format since 1987. It's called ISO 8583.

ID: Bank memakai format pesan yang sama sejak 1987. Namanya ISO 8583.

Visual: Pesan ISO 8583 contoh (data fiktif), field ditampilkan satu per satu · Teks layar: "ISO 8583 (1987)"

### s12 · body · remotion-code

EN: The first four digits say what kind of message it is. Zero one zero zero means: may I charge this card?

ID: Empat digit pertama menyatakan jenis pesan. Nol satu nol nol artinya: boleh saya tagih kartu ini?

Visual: MTI 0100 disorot · Teks layar: "MTI 0100 = authorization request"

### s13 · body · remotion-code

EN: Then come numbered fields. Field 2 is the card number. Field 4 is the amount. Field 49 is the currency.

ID: Setelah itu field bernomor. Field 2 nomor kartu. Field 4 jumlahnya. Field 49 mata uangnya.

Visual: Field 2, 4, 49 disorot berurutan (nomor kartu fiktif) · Teks layar: "DE2 · DE4 · DE49"

### s14 · body · remotion-diagram

EN: Your bank, the issuer, now has well under a second to decide.

ID: Bank kamu, si issuer, sekarang punya waktu kurang dari satu detik untuk memutuskan.

Visual: Issuer disorot; penghitung waktu berjalan

### s15 · body · remotion-diagram

EN: It checks that the card is real, that the one-time code matches, that the purchase doesn't look like fraud, and that you have the money or the credit.

ID: Issuer mengecek kartunya asli, kode sekali pakainya cocok, transaksinya tidak terlihat seperti fraud, dan saldo atau limitmu cukup.

Visual: Empat centang muncul satu per satu

### s16 · body · remotion-diagram

EN: The fraud check compares this purchase with your history: where you usually shop, at what time, and for how much.

ID: Cek fraud membandingkan transaksi ini dengan riwayatmu: biasanya belanja di mana, jam berapa, dan berapa banyak.

Visual: Titik transaksi baru dibandingkan pola riwayat

### s17 · body · remotion-code

EN: If everything passes, it replies with message zero one one zero, and field 39 set to two zeros. Two zeros means approved.

ID: Kalau semua lolos, issuer membalas dengan pesan nol satu satu nol, dan field 39 diisi dua angka nol. Nol nol artinya approved.

Visual: MTI 0110, DE39 = 00 · Teks layar: "DE39 = 00 → approved"

### s18 · body · remotion-code

EN: Field 38 carries a six-character approval code. The shop keeps it. For now, it's the only thing the shop has.

ID: Field 38 membawa kode approval enam karakter. Toko menyimpannya. Untuk sekarang, cuma itu yang dipegang toko.

Visual: DE38 kode fiktif A1B2C3 · Teks layar: "DE38 = approval code"

### s19 · body · remotion-code

EN: When the answer is no, field 39 carries a different code. Fifty-one means insufficient funds. Zero five means do not honor: the bank says no without saying why.

ID: Kalau jawabannya tidak, field 39 berisi kode lain. Lima puluh satu artinya saldo tidak cukup. Nol lima artinya do not honor: bank menolak tanpa menyebut alasan.

Visual: DE39 = 51 lalu DE39 = 05 · Teks layar: "51 insufficient funds · 05 do not honor"

### s20 · body · remotion-diagram

EN: The terminal usually shows one word for both: declined. The real reason stays inside the message, which is why the cashier can't tell you what went wrong.

ID: Terminal biasanya menampilkan satu kata untuk keduanya: declined. Alasan sebenarnya tetap di dalam pesan. Makanya kasir tidak bisa memberi tahu apa yang salah.

Visual: Dua kode berbeda menghasilkan layar terminal yang sama: DECLINED

### s21 · rehook · remotion-data

EN: On a yes, that reply is the beep you hear. Now count the money that moved between banks. Zero.

ID: Kalau disetujui, balasan itulah bunyi bip yang kamu dengar. Sekarang hitung uang yang pindah antar bank. Nol.

Visual: Penghitung transfer antar bank: $0.00 · Teks layar: "money moved: $0.00"

### s22 · body · remotion-data

EN: Instead, your bank put a hold on five dollars. Your available balance went down by five. Your actual balance stayed the same.

ID: Yang dilakukan bank kamu adalah menahan lima dolar. Saldo tersedia turun lima. Saldo sebenarnya tetap.

Visual: Dua angka: Available $95, Balance $100 · Teks layar: "available ≠ balance"

### s23 · body · broll

EN: That hold is the pending line in your app. In most banking apps, pending and posted come from two different records, which is why the name or the amount can change between them.

ID: Hold itu yang muncul sebagai baris pending di aplikasimu. Di kebanyakan aplikasi bank, pending dan posted berasal dari dua record berbeda. Makanya nama atau jumlahnya bisa berubah di antara keduanya.

Visual: B-roll berlisensi Pexels/Pixabay: tangan menggulir aplikasi bank (UI fiktif, tanpa logo bank nyata), ditimpa overlay Remotion: baris pending berubah jadi posted dengan nama merchant berubah · Teks layar: "pending = authorization record"

### s24 · body · broll

EN: Gas pumps and hotels often hold more than you'll spend, because they don't know the final amount yet.

ID: Pom bensin dan hotel sering menahan lebih dari yang akan kamu belanjakan, karena mereka belum tahu jumlah akhirnya.

Visual: Pom bensin, meja resepsionis hotel · Teks layar: "hold > final amount"

### s25 · body · remotion-diagram

EN: A hotel can also raise the hold during your stay, and the final charge can clear for more than was approved. Card rules allow that for hotels, car rentals, and restaurants, not for an ordinary shop.

ID: Hotel juga bisa menaikkan hold selama kamu menginap, dan tagihan akhirnya boleh lebih besar dari yang di-approve. Aturan kartu mengizinkan itu untuk hotel, rental mobil, dan restoran, tidak untuk toko biasa.

Visual: Hold hotel naik bertahap; label kategori hospitality

### s26 · body · remotion-diagram

EN: If the shop never follows up, the hold expires, usually within a few days to a week for a purchase like this. That's the pending charge that disappears.

ID: Kalau toko tidak pernah menindaklanjuti, hold-nya kedaluwarsa, biasanya beberapa hari sampai seminggu untuk transaksi seperti ini. Itulah transaksi pending yang tiba-tiba hilang.

Visual: Baris pending memudar dan hilang setelah penghitung hari

### s27 · rehook · remotion-diagram

EN: Then there's the charge that shows up twice.

ID: Lalu ada transaksi yang muncul dua kali.

Visual: Dua baris pending identik

### s28 · body · remotion-diagram

EN: Sometimes the request reaches your bank, but the reply gets lost on the way back. The terminal can't tell whether you were approved, so it asks again.

ID: Kadang permintaan sampai ke bank, tapi balasannya hilang di jalan. Terminal tidak tahu kamu sudah di-approve atau belum, jadi ia bertanya lagi.

Visual: Pesan 0110 hilang di tengah jalan; terminal mengirim 0100 kedua

### s29 · body · remotion-data

EN: Your bank said yes both times. Two holds, one coffee.

ID: Bank kamu menjawab ya dua kali. Dua hold, satu kopi.

Visual: Available $90 setelah dua hold $5

### s30 · body · remotion-code

EN: To clean it up, the terminal sends a reversal, a message in the zero four hundred family that tells your bank to drop the first hold. Until it arrives, you see the same charge twice.

ID: Untuk membereskannya, terminal mengirim reversal, pesan keluarga nol empat ratus, yang menyuruh bank membatalkan hold pertama. Sebelum pesan itu sampai, transaksinya terlihat dua kali.

Visual: MTI 0400/0420 reversal; satu baris pending dicoret · Teks layar: "reversal: MTI 04xx"

### s31 · rehook · broll

EN: Sometimes the bank doesn't see the purchase at all until hours later.

ID: Kadang bank baru tahu ada transaksi itu beberapa jam kemudian.

Visual: Troli penjualan di kabin pesawat

### s32 · body · remotion-diagram

EN: On a flight with no connection, the card and the terminal approve the purchase offline, using a spending limit the bank wrote onto the chip.

ID: Di penerbangan tanpa koneksi, kartu dan terminal menyetujui transaksi secara offline, pakai batas belanja yang ditulis bank ke dalam chip.

Visual: Kartu ↔ terminal saja; jalur ke bank terputus; label offline limit · Teks layar: "offline approval"

### s33 · body · remotion-diagram

EN: The bank finds out after landing, when the airline uploads the sales. If the card is no good by then, the airline usually takes the loss.

ID: Bank baru tahu setelah mendarat, saat maskapai mengunggah data penjualan. Kalau kartunya ternyata bermasalah, biasanya maskapai yang menanggung ruginya.

Visual: Pesawat mendarat; batch transaksi terkirim; satu ditolak

### s34 · body · remotion-data

EN: That's also why some airlines cap what you can buy on board. A higher limit means a bigger possible loss.

ID: Itu juga alasan sebagian maskapai membatasi nilai belanja di pesawat. Batas lebih tinggi berarti potensi rugi lebih besar.

Visual: Batas belanja di kabin vs potensi kerugian

### s35 · body · remotion-diagram

EN: Back on the ground, the coffee shop gets paid through clearing. At the end of the day, its terminal sends every sale in one batch.

ID: Kembali ke darat, kedai kopi dibayar lewat clearing. Di akhir hari, terminalnya mengirim semua penjualan dalam satu batch.

Visual: Banyak transaksi masuk ke satu amplop batch → acquirer · Teks layar: "end-of-day batch"

### s36 · body · remotion-diagram

EN: Each record carries its approval code, so the network can match it to the approval from this morning.

ID: Setiap record membawa kode approval-nya, jadi jaringan bisa mencocokkannya dengan approval tadi pagi.

Visual: Record clearing dicocokkan dengan DE38 A1B2C3

### s37 · body · remotion-data

EN: The amount doesn't have to match. At a restaurant, the card is approved for the bill, and the tip gets added before the batch goes out.

ID: Jumlahnya tidak harus sama. Di restoran, kartu di-approve sebesar tagihan, lalu tip ditambahkan sebelum batch dikirim.

Visual: Approved $40.00 → cleared $46.00 (+tip) · Teks layar: "approved $40 · cleared $46"

### s38 · body · remotion-diagram

EN: When the cleared record reaches your bank, the hold turns into a real charge. Pending becomes posted, sometimes with a different amount.

ID: Begitu record clearing sampai ke bank kamu, hold berubah jadi tagihan sungguhan. Pending jadi posted, kadang dengan jumlah berbeda.

Visual: Baris pending berubah jadi posted · Teks layar: "pending → posted"

### s39 · body · remotion-diagram

EN: Everything so far is the dual-message path: one message to approve, a second record to charge. Most credit card purchases go this way.

ID: Semua tadi adalah jalur dual-message: satu pesan untuk approve, satu record lagi untuk menagih. Kebanyakan transaksi kartu kredit lewat jalur ini.

Visual: Dua jalur: dual-message (approve + clear) dan single-message · Teks layar: "dual-message"

### s40 · body · remotion-code

EN: Some debit payments use a single message. In the US, when you type your PIN at checkout, message zero two zero zero approves and charges in one go.

ID: Sebagian pembayaran debit memakai satu pesan saja. Di Amerika, saat kamu mengetik PIN di kasir, pesan nol dua nol nol langsung approve sekaligus menagih.

Visual: MTI 0200 financial request · Teks layar: "single-message: MTI 0200"

### s41 · body · remotion-diagram

EN: There's no separate clearing record to wait for, so the charge posts sooner. The shop still waits for settlement like everyone else.

ID: Tidak ada record clearing terpisah yang perlu ditunggu, jadi tagihannya lebih cepat posted. Tokonya tetap menunggu settlement seperti biasa.

Visual: Jalur single-message langsung posted; jalur settlement tetap

### s42 · rehook · remotion-data

EN: You've now been charged. The coffee shop still has no money. That's the third system's job.

ID: Kamu sekarang sudah ditagih. Kedai kopinya tetap belum pegang uang. Itu tugas sistem ketiga.

Visual: Your account −$5 · shop received $0.00

### s43 · body · remotion-diagram

EN: The network adds up every cleared purchase between every pair of banks, then nets them out.

ID: Jaringan menjumlahkan semua transaksi yang sudah clearing antara setiap pasangan bank, lalu menghitung selisih bersihnya.

Visual: Matriks bank × bank dengan angka, dipadatkan jadi satu angka bersih per bank · Teks layar: "netting"

### s44 · body · remotion-data

EN: Without netting, every purchase would be its own transfer between banks: hundreds of millions of tiny payments a day.

ID: Tanpa netting, setiap transaksi jadi transfer sendiri antar bank: ratusan juta pembayaran kecil setiap hari.

Visual: Ribuan panah kecil antar bank, dipadatkan jadi beberapa panah besar

### s45 · body · remotion-data

EN: Your bank sends one total for millions of purchases, minus what other banks owe it. Your five dollars is a tiny part of that number.

ID: Bank kamu mengirim satu total untuk jutaan transaksi, dikurangi yang harus dibayar bank lain ke dia. Lima dolarmu cuma bagian kecil dari angka itu.

Visual: Satu angka besar; $5 disorot sebagai titik kecil

### s46 · body · remotion-diagram

EN: Then the acquirer pays the coffee shop, usually one to three business days after the sale.

ID: Lalu acquirer membayar kedai kopi, biasanya satu sampai tiga hari kerja setelah transaksi.

Visual: Acquirer → rekening toko; kalender maju 1 sampai 3 hari kerja · Teks layar: "T+1 to T+3"

### s47 · body · remotion-diagram

EN: Settlement runs on business days. A purchase on Friday night often reaches the shop's account on Monday or Tuesday.

ID: Settlement berjalan di hari kerja. Belanja Jumat malam sering baru masuk ke rekening toko hari Senin atau Selasa.

Visual: Kalender: Jumat ke Senin/Selasa, akhir pekan dilewati

### s48 · body · remotion-data

EN: Fees come out before that money lands, so the shop gets less than five dollars.

ID: Biaya dipotong sebelum uangnya masuk, jadi toko menerima kurang dari lima dolar.

Visual: $5.00 → $4.xx; selisih diberi tanda tanya · Teks layar: "shop gets < $5.00"

### s49 · body · remotion-data

EN: The shop usually sees them as one percentage on a monthly statement from its acquirer, with several smaller fees folded inside.

ID: Toko biasanya melihatnya sebagai satu persentase di laporan bulanan dari acquirer, padahal di dalamnya ada beberapa biaya lebih kecil.

Visual: Satu angka persen dibuka jadi beberapa potongan bertanda tanya

### s50 · rehook · remotion-diagram

EN: Even then, approved isn't final. If you dispute the charge, the money can travel back weeks later through the same networks. That's a chargeback.

ID: Bahkan setelah itu, approved belum final. Kalau kamu menyanggah tagihan, uangnya bisa berjalan balik berminggu-minggu kemudian lewat jaringan yang sama. Namanya chargeback.

Visual: Panah balik dari toko ke kamu, lewat acquirer, network, issuer · Teks layar: "chargeback"

### s51 · body · remotion-code

EN: The shop gets a window to fight it, with a receipt and the six-character approval code from the start. The same code, doing its last job.

ID: Toko diberi waktu untuk membantah, pakai struk dan kode approval enam karakter tadi. Kode yang sama, untuk tugas terakhirnya.

Visual: DE38 A1B2C3 muncul lagi di berkas sengketa

### s52 · payoff · remotion-diagram

EN: So: approved is your bank's promise to pay. Clearing is the bill. Settlement is the money, arriving a day or more after you finished the coffee.

ID: Jadi: approved itu janji bank untuk membayar. Clearing itu tagihannya. Settlement itu uangnya, yang datang sehari atau lebih setelah kopimu habis.

Visual: Garis waktu tiga blok dari s02, kini semuanya menyala dengan jam/hari · Teks layar: "promise · bill · money"

### s53 · cta · remotion-text

EN: Those fees decide how much of your five dollars the shop keeps. Next video: on a hundred-dollar purchase, who takes a cut, and how much.

ID: Biaya itu yang menentukan berapa dari lima dolarmu yang tersisa untuk toko. Video berikutnya: dari belanja seratus dolar, siapa saja yang ambil bagian, dan berapa.

Visual: Judul video B + end screen · Teks layar: "Next: You Pay $100. Who Takes a Cut?"

## Potongan Shorts

- **A1-zero-dollars-moved**: s04, s09, s17, s21. Hook: "Your card said approved. Zero dollars moved."
- **A2-pending-to-posted**: s22, s35, s37, s38. Hook: "Why your restaurant charge changes the next day."

## QA anti-slop teks (skill video-anti-slop, lapisan Teks)

| Dimensi | EN | ID | Catatan |
| --- | --- | --- | --- |
| Directness | 9 | 9 | Hook langsung ke masalah; tanpa salam atau "in this video" |
| Rhythm | 8 | 7 | Kalimat pendek bervariasi; ID sedikit lebih panjang per scene |
| Trust | 8 | 8 | Field ISO 8583, MTI, masa hold, offline approval, tip: semua bersumber (lihat bawah) |
| Authenticity | 7 | 7 | Sengaja tanpa klaim kredensial di narasi (aturan track); bukti datang dari detail teknis dan rekaman s18 |
| Density | 9 | 8 | Tidak ada pengisi; setiap scene membawa satu fakta |
| **Total** | **41/50** | **39/50** | Ambang 35. **LULUS** |

Perbaikan yang sudah dilakukan: "Here's what that message looks like" (throat-clearing) diganti kalimat langsung; kontras "doesn't send five dollars... it sends one total" diganti pernyataan langsung; "the shop doesn't receive five dollars" diganti. Scene tambahan dicek ulang dengan aturan yang sama. Triad di payoff dipertahankan karena memang tiga tahap nyata, bukan triad hiasan.

Pola slop Indonesia: tidak ada "di era digital", "mari kita bahas", "bukan hanya... tetapi juga", atau penutup "semoga bermanfaat". Istilah teknis tetap Inggris (acquirer, issuer, token, hold, pending, posted, chargeback).

Judul: janji "shop hasn't been paid" terbayar di dua scene pertama (sebelum detik 15). Lapisan Visual, Audio, Channel: tidak diperiksa (belum ada render).

## Catatan untuk kreator

1. **s23 (keputusan kreator: footage dari internet):** hanya dari Pexels/Pixabay (lisensi komersial, tanpa atribusi wajib), dicari Claude Code lewat API. Footage dari Adobe Stock, Getty, iStock, Storyblocks berbayar; rekaman aplikasi bank nyata dari internet tidak dipakai (hak cipta dan merek). UI di layar harus fiktif. Konsekuensi: video ini tidak punya kehadiran nyata kreator; lapisan Channel mensyaratkan minimal satu dalam 4 video, jadi jadwalkan di siklus 002 atau 003.
2. **Tanpa klaim kredensial** di narasi, sesuai "Tidak akan dibahas" di TRACK. Pengalamanmu bisa disebut di deskripsi, dan deskripsi juga perlu mengungkap bahwa narasinya memakai suara AI.
3. **Durasi (keputusan kreator: penuhi batas monetisasi, fokus YouTube):** target master **8:15 sampai 8:45** supaya mid-roll YouTube aktif (minimal 8:00 durasi akhir, end screen ikut dihitung). Tambahan isi: kode decline, transaksi ganda dan reversal, debit single-message, hold hotel, settlement hari kerja, callback chargeback. **QA wajib cek durasi render ≥ 8:00.** Kalau kurang, jangan memperlambat suara atau menambah jeda kosong: tambah satu scene isi (kandidat: perbandingan dengan QRIS/pembayaran real-time Asia, perlu riset dulu). Titik mid-roll: setelah s21 dan setelah s42 (jeda alami di re-hook). Shorts: 35 sampai 45 detik, satu file untuk YouTube Shorts, TikTok, dan Reels; TikTok Creator Rewards (syarat ≥1 menit) belum tersedia untuk akun Indonesia dan monetisasi Facebook lewat undangan, jadi tidak ada alasan memanjangkan Shorts sekarang.
4. Koreksi akurasi teknis apa pun dari pengalamanmu dipersilakan sebelum disetujui.

## Sumber fakta

- ISO 8583 MTI 0100/0110 dan versi 1987: https://en.wikipedia.org/wiki/ISO_8583
- DE38 approval code, DE39 response code: https://nibss-plc.com.ng/wp-content/uploads/2025/08/NUS-SPECIFICATION-1.pdf
- Masa hold (card-present ±5 hari, umum ±7 hari): https://www.airwallex.com/docs/issuing/transactions/authorization-expiration , https://docs.adyen.com/issuing/payment-stages/authorisation-holds
- Settlement lebih besar dari approval hanya untuk hospitality (tip): https://Www.Wikipedia.org/wiki/Authorization_hold
- Offline approval di pesawat, maskapai menanggung kerugian: https://www.cbsnews.com/news/airlines-confront-credit-card-fraud-in-the-air , https://www.americanbanker.com/payments/news/guestlogix-rolls-out-travel-industry-hot-list-to-block-fraudulent-cards
- Batch akhir hari dan waktu dana ke merchant: https://www.business.com/articles/ccp-settlement-times/
- Mid-roll YouTube minimal 8 menit: https://support.google.com/youtube/answer/6175006
- MTI 0200 financial request, 0420 reversal: https://nibss-plc.com.ng/wp-content/uploads/2025/08/NUS-SPECIFICATION-1.pdf
