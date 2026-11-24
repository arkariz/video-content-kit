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
