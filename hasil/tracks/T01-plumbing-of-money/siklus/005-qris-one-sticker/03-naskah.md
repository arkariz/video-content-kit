# Naskah: T01 siklus 005-qris-one-sticker (R3, DRAFT menunggu persetujuan kreator)

Judul kerja: One Sticker, 72 Million People: How Indonesia Built a Payment Network Visa Doesn't Run
Janji: After watching, you know what happens in the two seconds after you scan one QRIS sticker, why a small shop pays almost nothing for it, and how the same sticker now takes money from other countries without dollars.
Gaya: R3 (`gaya-visual.md`) + `gaya-cerita.md`. 48 scene, 1294 kata EN, 1171 kata ID. Estimasi ±8:28 pada 167 kata per menit (tempo nyata 001) + jeda 0,9 detik. Durasi pasti setelah TTS.
Shot lengkap (show, motion, label) di `03-script.json`; arah visual per scene di `03-visual.json` (versi 2). Status V2: di luar paket uji (seperti 004).

Re-hook dan payoff (estimasi): s03 0:22 · s10 1:34 · s16 2:45 · s26 4:36 · s33 5:33 · s41 7:00 · s45 7:51 · s46 8:00 · s47 8:10

## Checklist cerita
- [x] Scene 1 "you" di momen kunci, 2 kalimat: s01 (memindai stiker di warung Bali)
- [x] Analogi di fondasi dan penutup: colokan dan stopkontak (s06, s07, s11), adaptor (s40), kembali di s46 dan s47
- [x] Tebakan dipatahkan: s08 (QRIS bukan aplikasi) dan s35 (tidak lewat dolar)
- [x] Mesin insentif: s20 sampai s22 (bank sentral: pintu masuk UMKM dan catatan kredit; aplikasi: kunjungan)
- [x] Callback dengan twist: stopkontak s06/s07 kembali di s29 (bentuknya dirancang klub pendiri perusahaan kartu); callback video 002 di s16 dan s23
- [x] Steelman: s31 dan s32 (jaringan kartu tetap memimpin lintas negara), s42 (Jepang 35 toko, satu arah)
- [x] Penutup membingkai ulang di warung yang sama (s45 sampai s47) + ajakan spesifik ke video transfer bank antarnegara (s48)
- [x] Setiap angka dan klaim fakta di narasi dan label punya id klaim `terverifikasi` atau `disederhanakan` (lihat baris Klaim per scene); C10, C11, C28, C31 berstatus `belum` dan tidak dipakai
- [x] Subtipe disebut spesifik: QRIS statis (bukan dinamis), switch domestik vs jaringan kartu global, usaha mikro vs non-mikro untuk MDR

## Gate kesiapan visual (`gaya-visual.md` bagian 7)
- `build-visual.mjs --check`: 0 temuan V-1 sampai V-14. Sisa kontrak: `04-shots.tsx` belum ada (ditulis di tahap produksi). Peringatan porsi broll 2% (mesin R3 mengabaikan broll di scene ber-shots; klip kreator s01 opsional).
- Tidak ada scene dengan `needs`. Semua subjek L1 punya siluet, proporsi, material, dan detail; semua scene punya `light`, `art_refs`, tengara, tipe benda, dan kejadian kecil.
- Pemeran baru diusulkan, belum di `produksi/STYLE.md` 9.2, jadi `faces` untuk mereka belum ditulis di `shots`: `switch` (stasiun bundar berkumparan kabel), `yourapp` (menara berbentuk ponsel), `tourist` (turis Thailand, kapsul biru muda bertopi pantai), `centralbank` (gedung berkubah dengan pintu berbentuk stopkontak). Setelah disetujui: catat di STYLE.md 9.2 lalu tambahkan ke `cast` dan `faces` (scene s14, s20, s22, s25, s30, s36, s37, s38, s47).
- Anggaran konsep: satu standar QR (s07), switch (s11), MDR (s17), EMVCo (s29), settlement (s39), hub instan bersama (s44). Enam istilah, jarak minimal sekitar 70 detik.

## Durasi dan risiko
- Estimasi ±8:26 pada 167 kpm. Bila TTS memberi tempo seperti 002 (±184 kpm), master bisa sekitar 7:40. Kreator memilih: perlambat TTS, tambah jeda, atau tanpa mid-roll. Jangan menambah konsep.
- Fondasi: metafora di s06 (±0:49), tiga pemain di peta pada s10 (±1:33), sedikit lewat 90 detik karena babak sejarah.
- Angka BI data Oktober 2026 (RDG 18 Nov 2026); label tanpa bulan, narasi menyebut "In October".

## Anti-slop teks (skill `video-anti-slop`, lapisan 1, memakai aturan `stop-slop` + `pola-slop-indonesia.md`)
| Dimensi | EN | ID |
| --- | --- | --- |
| Directness | 8 | 8 |
| Rhythm | 8 | 8 |
| Trust | 9 | 9 |
| Authenticity | 7 | 7 |
| Density | 8 | 7 |
| **Total** | **40/50 LULUS** | **39/50 LULUS** |

Diperbaiki saat pemeriksaan: "Here's the common mistake" dan "Here's the twist" (pembuka basa-basi) diganti kalimat langsung; "Which brings us to the second question" (penyambung meta) diganti pertanyaannya sendiri; kontras "isn't a rival to Visa. It's an adapter" ditulis langsung; adverb "simply" dan "properly" dibuang; satu kalimat pasif diberi pelaku (providers). ID: "Ini salah kaprah yang umum", "Ini twist-nya", "Ini membawa kita ke" diganti; "Agar adil bagi" jadi "Supaya adil untuk".
Sisa catatan: Authenticity 7 karena narator tidak boleh memakai persona kreator; bukti kreator ada di detail isi kode (s12) dan klip tangan opsional (s01). Durasi ID per scene dicek lewat panjang karakter (semua dalam 0,8 sampai 1,25 kali EN setelah s04 dan s06 dipendekkan); pasti setelah TTS.

## The scan

### s01 · hook · 2 shot · klip kreator opsional
EN: You scan a paper square at a noodle stall in Bali, and your bank app has never met this stall. Two seconds later, the noodles are paid for.
ID: Kamu memindai selembar kotak kertas di warung mi di Bali, padahal aplikasi bankmu belum pernah kenal warung ini. Dua detik kemudian, mi itu sudah terbayar.
Visual: close-up over your shoulder: your phone camera frames a white QRIS stand on a wooden noodle counter, steam rising from a pot behind it, penjor bamboo arch blurred at dusk → your phone screen flips to a green tick while the owner's phone on the counter lights up and chimes; a small wall clock hand moves two ticks
Klaim: C05, C08

### s02 · context · 3 shot
EN: That square is called QRIS, and almost seventy-two million people in Indonesia pay with it. Fifty-one million shops accept it. In October, transactions were up seventy-one percent on a year earlier.
ID: Kotak itu bernama QRIS, dan hampir tujuh puluh dua juta orang di Indonesia membayar dengannya. Lima puluh satu juta toko menerimanya. Pada Oktober, jumlah transaksinya naik tujuh puluh satu persen dibanding setahun sebelumnya.
Visual: camera pulls up from the stall to a night map of Indonesia; tiny phone glows light up island by island → shop roofs pop up as small markers among the glowing phones, each with a tiny white square → a stack of transaction coins beside the map grows from last October's height to this October's height
Klaim: C09

### s03 · rehook · 2 shot
EN: So how does one sticker work with every app? And how did paying this way start working in Bangkok, Tokyo and Seoul?
ID: Jadi bagaimana satu stiker bisa dipakai semua aplikasi? Dan bagaimana cara bayar ini mulai berfungsi di Bangkok, Tokyo, dan Seoul?
Visual: a ring of phones in six different app colours closes in around one white sticker on the counter → the sticker's outline lifts off and flies over a dark map of Asia, landing three times on city dots
Klaim: C19

## Before the sticker

### s04 · body · 2 shot
EN: Go back to 2019. Bank Indonesia counted twenty-six companies running QR payments, each with its own format.
ID: Mundur ke 2019. Bank Indonesia mencatat dua puluh enam perusahaan pembayaran QR, masing-masing dengan format sendiri.
Visual: the same stall in daylight, a wall calendar on the post flips its pages backwards until it stops → twenty-six QR codes pop into a grid above the counter, each with a different frame colour and corner shape
Klaim: C02

### s05 · body · 2 shot
EN: A shop that wanted every customer had to put up a code for each one. Scan with the wrong app, and the code meant nothing.
ID: Toko yang ingin melayani semua pembeli harus memasang kode untuk masing-masing. Pindai dengan aplikasi yang salah, dan kodenya tidak berarti apa-apa.
Visual: the stall's glass display case covered in overlapping QR stickers of different colours; the owner presses on one more → you scan one of the stickers; your phone shows a red cross and buzzes
Klaim: C02

### s06 · body · 2 shot
EN: Think of each app as a plug, and each shop's code as a socket. Every app had its own plug shape, so every shop needed a wall of different sockets.
ID: Bayangkan aplikasi sebagai colokan, dan kode toko sebagai stopkontak. Tiap aplikasi punya bentuk colokan sendiri, jadi tiap toko butuh satu dinding penuh stopkontak berbeda.
Visual: your phone morphs into a coral plug with two flat prongs; the sticker on the counter morphs into a matching wall socket → the wall behind the stall fills with sockets of six different shapes; a round-pin plug drifts from socket to socket and fits only one

### s07 · body · 2 shot
EN: On August seventeenth, 2019, Indonesia's Independence Day, the central bank and the payment industry launched one socket shape for everyone. They called it QRIS.
ID: Pada tujuh belas Agustus 2019, hari kemerdekaan Indonesia, bank sentral dan asosiasi industri pembayaran meluncurkan satu bentuk stopkontak untuk semua. Namanya QRIS.
Visual: red-and-white bunting strung above the stall street; the wall of mismatched sockets slides together and merges into one socket plate → the single socket plate gets a label; plugs of all six colours line up and click into it one after another
Klaim: C01

### s08 · body · 2 shot
EN: Many people think QRIS is an app, but there's no QRIS app to download. It's a rulebook for how the code is written and how the companies on each side connect.
ID: Banyak orang mengira QRIS itu aplikasi, padahal tidak ada aplikasi QRIS untuk diunduh. QRIS adalah buku aturan tentang cara kode ditulis dan cara perusahaan di kedua sisi tersambung.
Visual: two panels: on the left a pale dashed phone app tile named QRIS with a download arrow; a coral stroke crosses it out → a thick ring-bound rulebook opens on the counter; one page shows the socket plate, the next shows wires linking two small buildings
Klaim: C04, C06

### s09 · body · 3 shot
EN: From 2020, payment codes at Indonesian shops had to follow it. A shop now signs up with one provider, and any provider's app can pay it. The printed sticker itself is free.
ID: Sejak 2020, kode pembayaran di toko-toko Indonesia wajib mengikutinya. Sekarang toko cukup mendaftar ke satu penyelenggara, dan aplikasi penyelenggara mana pun bisa membayarnya. Stiker cetaknya sendiri gratis.
Visual: the old stickers peel off the glass case one by one and curl away, leaving a single white QRIS stand on the counter → the owner shakes hands with one small green-roofed bank; behind them phones in six colours each scan the one stand and get a green tick → the bank slides a freshly printed white stand across its counter to the owner, no price tag on it
Klaim: C03, C04, C05

## Two seconds

### s10 · rehook · 2 shot
EN: Now follow one scan, on one map. Your app sits on the left, the stall's bank on the right, and in the middle there's a switch.
ID: Sekarang ikuti satu scan, di satu peta. Aplikasimu di kiri, bank warung di kanan, dan di tengah ada switch.
Visual: camera rises from the stall to a top-down town map at night: three buildings joined by two glowing roads → left: a tall phone-shaped tower; right: the green-roofed bank; centre: a round station with cable spools on its roof
Klaim: C06, C07

### s11 · body · 2 shot
EN: A switch is the wiring behind the wall. It's a company that passes payment messages between providers that aren't wired to each other directly.
ID: Switch adalah kabel di balik dinding. Ia perusahaan yang meneruskan pesan pembayaran antarpenyelenggara yang tidak tersambung langsung satu sama lain.
Visual: cutaway behind the socket plate: bundled wires run down inside the wall and under the street toward the round station → back on the map: no road joins the phone tower to the bank directly; a small envelope rolls from the tower into the station and out toward the bank
Klaim: C37

### s12 · body · 3 shot
EN: When your camera reads the square, it reads plain text. Inside is which shop this is, which provider holds its account, and a country code: Indonesia. The amount isn't in there, which is why the sticker never has to change.
ID: Saat kamera membaca kotak itu, yang terbaca adalah teks biasa. Isinya: toko mana ini, penyelenggara mana yang memegang rekeningnya, dan kode negara: Indonesia. Nominalnya tidak ada di situ, karena itu stikernya tidak perlu diganti.
Visual: macro dive into the printed QR: black modules flip over like tiles and become short lines of text → three tags float out of the text: a shop tag, a provider tag, and a country tag → the three tags slide back into the code; an empty amount slot on the side of the code stays blank and the printed stand looks unchanged
Klaim: C32, C01, C05

### s13 · body · 2 shot
EN: You type fifty thousand rupiah and your PIN. Your app checks your balance, then sends a message to the switch: take fifty thousand from this person, for this stall.
ID: Kamu mengetik lima puluh ribu rupiah dan PIN-mu. Aplikasimu memeriksa saldo, lalu mengirim pesan ke switch: ambil lima puluh ribu dari orang ini, untuk warung ini.
Visual: close on your phone keypad: digits type in, then six dots for the PIN → on the map the phone tower's balance gauge dips by one notch, and a sealed envelope with a gold coin stamp leaves along the left road
Klaim: C05, C37

### s14 · body · 2 shot
EN: The switch reads which provider holds the stall's account, and forwards the message there. The stall's bank checks the account and says yes.
ID: Switch membaca penyelenggara mana yang memegang rekening warung, lalu meneruskan pesan ke sana. Bank warung memeriksa rekening itu dan menjawab ya.
Visual: inside the round station: the envelope sits on a turntable that rotates until its arrow points at the right-hand road → the green-roofed bank catches the envelope, stamps it green and sends a tick back down the road
Klaim: C37, C07

### s15 · body · 3 shot
EN: A tick appears on your phone, and the owner's phone chimes on the counter. The owner sees the amount and the time without touching a card machine. Providers build that whole round trip to finish while you're still holding your phone.
ID: Tanda centang muncul di ponselmu, dan ponsel pemilik warung berbunyi di meja. Pemilik melihat nominal dan waktunya tanpa menyentuh mesin kartu. Seluruh perjalanan bolak-balik itu dirancang selesai selagi ponsel masih di tanganmu.
Visual: split close-up at the counter: your phone shows a green tick; the owner's phone lights with chime rings → over the owner's shoulder: the phone shows the amount and time; a dusty card machine sits unused at the back of the shelf → the town map again: the envelope's whole path traced as one glowing loop from tower to station to bank and back
Klaim: C08

## Who pays

### s16 · rehook · 2 shot
EN: But who pays for those two seconds? In our card video, a hundred-dollar tap cost the shop two dollars seventy-five.
ID: Tapi siapa yang membayar dua detik itu? Di video kartu kami, satu tap seratus dolar membuat toko kehilangan dua dolar tujuh puluh lima sen.
Visual: the glowing loop freezes; a single gold coin hovers above the station with a small question tilt → callback: a wooden cart of one hundred coins rolls down a toll road and a small handful of coins hop off at the gates
Klaim: C15

### s17 · body · 2 shot
EN: The fee a shop pays to accept a payment has a name: the merchant discount rate, or MDR. It's a small slice taken off each sale before the money reaches the shop.
ID: Biaya yang dibayar toko untuk menerima pembayaran punya nama: merchant discount rate, atau MDR. Itu potongan kecil dari setiap penjualan sebelum uangnya sampai ke toko.
Visual: a short stack of gold coins on the counter; a thin wedge-shaped slice lifts out of the top coin → the coral slice drifts away toward the bank while the rest of the stack slides into the owner's tin
Klaim: C12, C13

### s18 · body · 2 shot
EN: Since October 2026, a QRIS payment up to a hundred thousand rupiah costs most shops nothing at all. The smallest businesses pay nothing up to five hundred thousand.
ID: Sejak Oktober 2026, pembayaran QRIS sampai seratus ribu rupiah tidak memotong apa pun bagi sebagian besar toko. Usaha paling kecil tidak dipotong sampai lima ratus ribu.
Visual: a horizontal price bar in front of the stall from zero to one hundred thousand turns green, and the coral slice vanishes → a tiny pushcart stall beside the warung gets a longer green bar stretching to five hundred thousand
Klaim: C12

### s19 · body · 2 shot
EN: Above that, the fee is still under one percent. And the shop isn't allowed to pass it on to you.
ID: Di atas itu, biayanya tetap di bawah satu persen. Dan toko tidak boleh membebankannya kepadamu.
Visual: past the green part of the bar, a sliver-thin coral slice reappears on a large coin → the owner nudges a small extra coin onto your bill; a round rule stamp drops and blocks it
Klaim: C13, C14

### s20 · body · 2 shot
EN: So why would anyone in the middle take almost nothing? There's one thing to know about Bank Indonesia: it wants small shops inside the digital economy, and it treats QRIS as their way in.
ID: Jadi kenapa pihak di tengah mau menerima hampir nol? Ada satu hal yang perlu kamu tahu soal Bank Indonesia: ia ingin toko kecil masuk ke ekonomi digital, dan menjadikan QRIS pintu masuknya.
Visual: on the town map the phone tower, the station and the bank all look down at one nearly empty coin tray → a domed central bank building at the edge of the map opens a tall door shaped like the socket plate; small stalls and carts roll through into a lit city
Klaim: C33

### s21 · body · 3 shot
EN: Every scan also leaves a record of what a shop sells and how often. Bank Indonesia wants those records to help small shops get loans, even with no credit history. Three years of daily chimes at a noodle stall is a sales history a bank can read.
ID: Setiap scan juga meninggalkan catatan tentang apa yang dijual toko dan seberapa sering. Bank Indonesia ingin catatan itu membantu toko kecil mendapat pinjaman, meski belum punya riwayat kredit. Tiga tahun bunyi notifikasi setiap hari di warung mi adalah riwayat penjualan yang bisa dibaca bank.
Visual: beside the stall each chime drops a small paper slip into a growing stack, day after day → the owner carries the stack to the green-roofed bank's counter; a small coin bag slides back across → the slips fan out into a long ribbon behind the stall, one fold per day, running back three seasons of rain and sun
Klaim: C36

### s22 · body · 2 shot
EN: For the apps, each scan is a visit. You open them, you see your balance, and you might stay for the next thing they sell.
ID: Bagi aplikasi, setiap scan adalah kunjungan. Kamu membukanya, melihat saldomu, dan mungkin bertahan untuk produk berikutnya yang mereka jual.
Visual: the phone-shaped tower opens its front like a shop door and you step inside → inside, shelves of glowing boxes light up one after another as you pass: a top-up box, a bill box, a ticket box

### s23 · body · 2 shot
EN: So for a fifty-thousand-rupiah bowl of noodles, the stall keeps all fifty thousand. With the cut from our card example, the same bowl would lose about one thousand four hundred rupiah.
ID: Jadi untuk semangkuk mi lima puluh ribu rupiah, warung menerima utuh lima puluh ribu. Dengan potongan seperti contoh kartu kita, mangkuk yang sama akan kehilangan sekitar seribu empat ratus rupiah.
Visual: a steaming bowl of noodles set on the counter; gold coins stream into the owner's tin and none split off → a ghost version of the same tin beside it, pale and dashed, where a small slice of coins breaks off and floats away
Klaim: C12, C15

## Seventy-two million

### s24 · body · 2 shot
EN: That's how a printed square reached fifty-one million shops, more than one for every six people in the country. Nearly all of them are small businesses.
ID: Begitulah selembar kotak cetak sampai ke lima puluh satu juta toko, lebih dari satu untuk setiap enam orang di negeri ini. Hampir semuanya usaha kecil.
Visual: a row of six small people figures beside one shop marker, repeating outward across the map of Indonesia → close on the markers: pushcarts, kiosks, a laundry, a phone-credit stand, a market stall, each with a white square
Klaim: C09, C34, C38

### s25 · body · 2 shot
EN: And the switches carrying those messages are Indonesian companies, licensed by the central bank. Card payments inside Indonesia run through them too.
ID: Dan switch yang membawa pesan-pesan itu adalah perusahaan Indonesia yang berizin bank sentral. Pembayaran kartu di dalam Indonesia juga lewat mereka.
Visual: the town map: the round switch station gets a small licence plaque from the domed central bank → a plain plastic card's message rolls along the same roads and through the same station as the QR envelope
Klaim: C37, C25

### s26 · rehook · 1 shot
EN: That last part is what the United States didn't like.
ID: Bagian terakhir itulah yang tidak disukai Amerika Serikat.
Visual: the camera pulls far back from the town map, across a dark ocean, to a distant columned office on another shore with its lights on

### s27 · body · 2 shot
EN: In March 2025, the US trade office put QRIS in its yearly report on trade barriers. It said foreign companies, American ones included, weren't consulted enough.
ID: Pada Maret 2025, kantor perdagangan AS memasukkan QRIS ke laporan tahunannya tentang hambatan perdagangan. Laporan itu menyebut perusahaan asing, termasuk dari Amerika, tidak cukup diajak berunding.
Visual: inside the columned office: a thick report thumps onto a desk; a small white QRIS stand is clipped to one page → a round meeting table with empty chairs; an invitation envelope travels toward them and never arrives
Klaim: C24

### s28 · body · 2 shot
EN: The same report pointed at the rule that domestic card payments must go through switches inside Indonesia. Global card networks can't run that part there.
ID: Laporan yang sama menyorot aturan bahwa pembayaran kartu domestik wajib lewat switch di dalam Indonesia. Jaringan kartu global tidak bisa menjalankan bagian itu di sana.
Visual: on the map a card message starts to fly overseas but curves back down into the Indonesian switch station → on a distant hill the card network watchtower sweeps its searchlight toward Indonesia; the beam stops at the coastline
Klaim: C24, C25

### s29 · body · 2 shot
EN: Look at who designed that socket. The socket shape QRIS uses comes from EMVCo, a standards body set up by Europay, Mastercard and Visa.
ID: Lihat siapa yang merancang stopkontak itu. Bentuk stopkontak yang dipakai QRIS berasal dari EMVCo, lembaga standar yang didirikan Europay, Mastercard, dan Visa.
Visual: back at the stall wall: the single QRIS socket plate glows → the socket plate swings open like a hatch and shows a stamped maker's plate on its back, with three plain silhouettes of founders behind it
Klaim: C26, C01

### s30 · body · 1 shot
EN: Bank Indonesia's reply was polite: it's open to working with any country, the US included.
ID: Jawaban Bank Indonesia sopan: ia terbuka bekerja sama dengan negara mana pun, termasuk AS.
Visual: the domed central bank holds its door open; a plank bridge unrolls from its steps across the ocean toward the far office
Klaim: C26

### s31 · body · 2 shot
EN: To be fair to the card networks, they aren't losing the world. Visa and Mastercard still lead in Indonesian credit cards and in payments between countries.
ID: Supaya adil untuk jaringan kartu, mereka tidak sedang kehilangan dunia. Visa dan Mastercard masih memimpin kartu kredit di Indonesia dan pembayaran antarnegara.
Visual: mood shifts to cool daylight; the card network watchtower stands tall on its hill, searchlight sweeping a globe → arcs of plastic cards fly between continents on the globe, each passing through the tower's beam
Klaim: C27

### s32 · body · 1 shot
EN: Outside a handful of countries, your QRIS app doesn't work, and your card still does.
ID: Di luar segelintir negara, aplikasi QRIS-mu tidak bisa dipakai, sementara kartumu tetap bisa.
Visual: two panels at a café counter far from Asia: on the left your phone shows a red cross at a card terminal; on the right your card taps and gets a green tick
Klaim: C20

## Crossing borders

### s33 · rehook · 2 shot
EN: Now the second question: how does this cross borders? In August 2022, Thailand became the first country linked to QRIS, then Malaysia in 2023, then Singapore.
ID: Sekarang pertanyaan kedua: bagaimana ini menyeberang negara? Pada Agustus 2022, Thailand menjadi negara pertama yang tersambung ke QRIS, lalu Malaysia pada 2023, lalu Singapura.
Visual: the dark Asia map returns with Indonesia lit at the bottom and the rest in shadow → a timeline along the bottom ticks forward; Thailand, Malaysia and Singapore light up one by one with a cable drawn to Indonesia
Klaim: C19

### s34 · body · 2 shot
EN: Japan joined in August 2025, then South Korea and China in 2026. That makes six countries.
ID: Jepang bergabung pada Agustus 2025, lalu Korea Selatan dan China pada 2026. Totalnya enam negara.
Visual: the timeline continues north: Japan lights, then South Korea and China, each with its own cable → six lit countries around Indonesia, a counter settles on six
Klaim: C19, C20

### s35 · body · 2 shot
EN: You might guess that somewhere in the middle, the money gets turned into US dollars. In these links, it doesn't.
ID: Kamu mungkin menebak bahwa di suatu titik, uangnya diubah dulu ke dolar AS. Dalam sambungan ini, tidak.
Visual: a pale dashed path from a gold rupiah coin to a green dollar coin to a silver baht coin, drawn across the sea → a coral cross slashes the dollar coin, which fades; a solid line now joins the rupiah coin straight to the baht coin
Klaim: C16

### s36 · body · 2 shot
EN: A tourist from Thailand walks up to the same noodle stall in Bali. The tourist scans the same sticker, using a Thai banking app.
ID: Seorang turis dari Thailand mampir ke warung mi yang sama di Bali. Turis itu memindai stiker yang sama, memakai aplikasi bank Thailand.
Visual: dusk at the Bali stall again; the tourist in a sun hat arrives and sits on the plastic stool → the tourist's phone, in a different app colour, frames the same white stand
Klaim: C17

### s37 · body · 2 shot
EN: The Thai app sees that the code is Indonesian and sends the payment to Thailand's switch. That switch passes it across to Indonesia's switch, which takes it to the stall's bank, down the same road as before.
ID: Aplikasi Thailand melihat kodenya dari Indonesia dan mengirim pembayaran ke switch Thailand. Switch itu meneruskannya ke switch Indonesia, yang membawanya ke bank warung, lewat jalan yang sama seperti tadi.
Visual: the town map grows a second shore across a strait: a Thai app tower and a Thai switch station on the far side; an envelope with a silver coin stamp rolls from the tower to the Thai station → a cable bridge links the two stations; the envelope crosses to the Indonesian station, turns on its turntable and rolls down the old road to the green-roofed bank
Klaim: C16, C37

### s38 · body · 2 shot
EN: Before typing a PIN, the tourist sees the price in baht. Then the baht balance goes down, and the stall still receives rupiah.
ID: Sebelum mengetik PIN, turis itu melihat harganya dalam baht. Lalu saldo baht-nya berkurang, dan warung tetap menerima rupiah.
Visual: close on the tourist's phone: the price shows in baht with a small rupiah line underneath → two panels: silver baht coins leave the tourist's phone; gold rupiah coins land in the owner's tin
Klaim: C17

### s39 · body · 2 shot
EN: Behind the scenes, a few appointed banks in each country swap rupiah and baht with each other directly. That final handover between banks is called settlement, and here it happens in the two local currencies.
ID: Di balik layar, beberapa bank yang ditunjuk di tiap negara saling menukar rupiah dan baht secara langsung. Serah terima terakhir antarbank itu disebut settlement, dan di sini terjadi dalam dua mata uang lokal.
Visual: two small bank buildings on either side of the strait, each on its own dock, push crates of coins onto a ferry: gold crates from one side, silver from the other → the ferry docks; gold crates stack on the Indonesian side, silver on the Thai side; a lone dollar crate waits on a third pier and nobody touches it
Klaim: C16

### s40 · body · 3 shot
EN: That's the adapter. Two countries with different sockets, joined through their switches, each keeping its own money. It works the other way too: in Bangkok, you scan a Thai code with your Indonesian app, and your rupiah balance goes down.
ID: Itulah adaptornya. Dua negara dengan stopkontak berbeda, tersambung lewat switch masing-masing, dan masing-masing tetap memakai uangnya sendiri. Arah sebaliknya juga bisa: di Bangkok, kamu memindai kode Thailand dengan aplikasi Indonesiamu, dan saldo rupiahmu yang berkurang.
Visual: a Thai plug and the Indonesian socket plate float apart; a travel adapter clicks in between them → the adapter turns see-through: inside, two wires lead to the two switch stations, gold coins on one side, silver on the other → a Bangkok street-food cart under a tangle of overhead cables; you scan its Thai code and your phone balance in rupiah ticks down
Klaim: C16, C19, C17

### s41 · rehook · 3 shot
EN: And money is mostly flowing in. Up to July 2026, visitors spent five point nine trillion rupiah through QRIS in Indonesia, more than three times what Indonesians spent with it abroad. Most of those visitors come from Malaysia and Singapore, paying from ringgit and Singapore dollar accounts.
ID: Dan uangnya kebanyakan mengalir masuk. Sampai Juli 2026, pengunjung asing membelanjakan lima koma sembilan triliun rupiah lewat QRIS di Indonesia, lebih dari tiga kali lipat belanja orang Indonesia dengan QRIS di luar negeri. Kebanyakan pengunjung itu datang dari Malaysia dan Singapura, membayar dari rekening ringgit dan dolar Singapura.
Visual: on the Asia map, thick gold arrows flow into Indonesia from the partner countries while thin arrows flow out → two panels: a tall stack of gold coins for visitors' spending and a stack less than a third its height for Indonesians abroad → on the map the two thickest gold arrows glow brighter, from Malaysia and Singapore, each carrying its own coin colour that turns gold on landing
Klaim: C22, C23

### s42 · body · 2 shot
EN: It's still small. When Japan joined, only thirty-five shops there accepted it, and only Indonesians could pay that way, not Japanese visitors to Indonesia.
ID: Skalanya masih kecil. Saat Jepang bergabung, hanya tiga puluh lima toko di sana yang menerimanya, dan hanya orang Indonesia yang bisa membayar dengan cara itu, bukan turis Jepang di Indonesia.
Visual: honest tone: cool light; the Asia map dims and the six lit cables look thin against the dark continent → a Japanese shopping street at night where only a few shop signs light up, then a one-way arrow from Indonesia to Japan with a closed gate on the return lane
Klaim: C21

### s43 · body · 2 shot
EN: Next, Bank Indonesia is in talks with India, Saudi Arabia, Vietnam and Australia. In Saudi Arabia, the idea is to let Indonesian pilgrims on hajj and umrah pay with it.
ID: Berikutnya, Bank Indonesia sedang berunding dengan India, Arab Saudi, Vietnam, dan Australia. Di Arab Saudi, idenya agar jemaah haji dan umrah Indonesia bisa membayar dengannya.
Visual: the map widens: India, Saudi Arabia, Vietnam and Australia appear with dashed outlines and dashed cables → a generic market street with awnings in warm sun; pilgrims in plain white clothes scan a white stand at a date-fruit stall
Klaim: C20, C35

### s44 · body · 2 shot
EN: And six central banks, Indonesia's among them, are building a shared hub for their instant payment systems. It's still being built, but one connection there could reach several countries at once.
ID: Lalu enam bank sentral, termasuk Indonesia, sedang membangun satu hub bersama untuk sistem pembayaran instan mereka. Hub itu masih dibangun, tapi satu sambungan ke sana bisa menjangkau beberapa negara sekaligus.
Visual: in the sea between six countries, a round hub station rises inside scaffolding, cranes swinging → one cable runs from Indonesia to the hub, and five more cables light up from the hub to the other countries
Klaim: C29, C30

## Back at the stall

### s45 · payoff · 2 shot
EN: So how powerful is QRIS? At home, it put digital payments in fifty-one million shops for the price of a printed square.
ID: Jadi seberapa kuat QRIS? Di dalam negeri, ia membawa pembayaran digital ke lima puluh satu juta toko dengan modal selembar kotak cetak.
Visual: back at the Bali stall at dusk, the same white stand on the counter, steam rising → the camera lifts away until thousands of stall lights spread across the islands, each one a small white square
Klaim: C09, C05

### s46 · payoff · 2 shot
EN: Abroad, it's an adapter, and still a small one next to Visa. Each country plugged in gives the next tourist one more place to pay.
ID: Di luar negeri, ia sebuah adaptor, dan masih kecil di samping Visa. Setiap negara yang tersambung memberi turis berikutnya satu tempat lagi untuk membayar.
Visual: the card network watchtower on its hill beside the small travel adapter on the beach, very different in size → on the Asia map the adapter clicks into one more socket and a new country lights up
Klaim: C27, C20

### s47 · payoff · 2 shot
EN: The stall in Bali still has the same paper square on its counter. Now tourists pay it from their own apps, and the owner just hears the chime.
ID: Warung di Bali itu masih memasang kotak kertas yang sama di mejanya. Kini turis membayarnya dari aplikasi mereka sendiri, dan pemiliknya cukup mendengar bunyi notifikasi.
Visual: the same stall, same angle as the opening shot; you and the tourist sit side by side with bowls → the owner's phone chimes twice; gold coins drop into the tin, all the same colour
Klaim: C17, C16

### s48 · cta · 1 shot
EN: Next, we follow a bank wire across borders the old way, and see what it actually sends.
ID: Berikutnya, kita ikuti transfer bank antarnegara dengan cara lama, dan lihat apa yang sebenarnya dikirimnya.
Visual: an old-style envelope leaves the Bali stall and drifts off the edge of the map toward a far, old stone bank

## Shorts

- **S1-qris-isnt-an-app** (s08, s09), 63 kata, estimasi ±24 detik. Judul: QRIS isn't an app. It's a rulebook.. Thumbnail: QRIS ISN'T AN APP
- **S2-no-dollars-in-between** (s35, s37, s39), 92 kata, estimasi ±36 detik. Judul: A Thai tourist pays a Bali stall. No dollars involved.. Thumbnail: NO DOLLARS IN BETWEEN
