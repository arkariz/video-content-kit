# Gaya gambar dan pemeran (semua track)

Aturan wajib ada di `instruksi/referensi/gaya-visual.md` (R3, sejak 2026-11-26). File ini memuat cara menggambar tokoh dan benda, palet, dan pemeran per track. Yang ditiru dari referensi hanya teknik; tokoh dan aset dibuat orisinal. Tokoh dari kartun lain (misalnya Adventure Time) tidak boleh disalin, hanya bahasa bentuknya yang dipakai.

## Bahasa bentuk pemeran
1. **Badan satu bentuk dasar** (kacang, bola, kapsul, kotak membulat) yang sekaligus menjadi kepala. Siluet harus terbaca dari bayangannya saja.
2. **Tangan dan kaki seperti selang karet**: garis melengkung tanpa sendi, ujung bulat. Kaki pendek.
3. **Mata titik** dengan satu titik putih kilap; alis pendek hanya bila ekspresi butuh. Mulut sederhana.
4. **Satu aksesori penanda** per tokoh (topi, kumis, dasi, ransel) supaya dikenali dari jauh.
5. **Benda dan lembaga boleh jadi tokoh** (kereta, dokumen, sel) bila ceritanya butuh emosi atau motif (mesin insentif di `gaya-cerita.md`).
6. Tujuh ekspresi baku: neutral, happy, sad, shock, tired, angry, smug. Keadaan berubah lewat ekspresi dan warna, bukan bubble.
7. Pemeran adalah warga sehari-hari, bukan kostum etnis atau stereotip.

## Cara menggambar
- Tanpa garis tinta. Isian datar, satu bayangan di sisi jauh cahaya (sekitar 55% opasitas warna lebih gelap), satu kilap kecil putih (sekitar 22%).
- Bayangan jatuh berupa elips gelap tipis di bawah tokoh.
- Latar gelap memakai glow untuk benda penting; latar terang memakai gradien hangat dan partikel tipis.
- Label pil: isian warna rata, sudut membulat kecil, teks putih tebal, segitiga penunjuk ke benda.

## Palet
| Track | Palet dasar | Catatan |
| --- | --- | --- |
| T01 (uang) | belum ditetapkan | ditetapkan di siklus pertama yang memakai gaya R3 |
| T02 (Asia Tenggara) | krem hangat #fff6dc, senja #f3a15f → #6d3f7a, malam #1c1f4a → #3b1f5e; livery KRL merah #d83c33 dan kuning #f2b632; teal #2c8c86 | dari uji pemeran 2026-11-26 |

Palet referensi R3 yang terukur (sel, neuron, membran) ada di `produksi/REFERENSI-GAYA.md`; jangan dipakai mentah sebagai palet track.

## Pemeran per track
| Track | Tokoh | Peran | Status |
| --- | --- | --- | --- |
| T02 | Komo | penumpang sehari-hari, tokoh utama: badan kacang sawo matang, topi bucket teal, ransel merah | usulan, menunggu persetujuan kreator |
| T02 | Sepuh | kereta eks-Tokyo yang menua: tampak depan, livery KRL, kumis dan alis putih, karat, tongkat | usulan |
| T02 | Pak Aturan | aturan dan pemerintah: selembar dokumen resmi, dasi kupu-kupu, stempel | usulan |
| T02 | Cicak | pengamat kecil yang menempel di mana saja | usulan |
| T01 | belum ada | dirancang ulang dengan bahasa bentuk di atas | - |

Kode pemeran dipakai bersama mesin R3: `produksi/remotion/src/r3/cast/T02.tsx` (Komo, Sepuh, Pak Aturan, Cicak, figuran `Warga`, dan benda T02 seperti `Gerbong`). Lembar karakter: render `produksi/remotion/src/experiment/castIndex.tsx`, hasil di `produksi/render/_eksperimen/T02-pemeran-lembar.png`.

## Pemeran T01 (disetujui bersama naskah 002, 2026-11-26)
Digambar dengan `produksi/remotion/src/r3/soft/kit.tsx` di `04-shots.tsx` siklus.
| id | Peran | Bentuk |
| --- | --- | --- |
| you | pembeli | badan kacang koral, syal biru |
| owner | pemilik toko sepatu | badan bulat toska, celemek |
| bank | bank pembeli | gedung berwajah beratap hijau uang |
| network | jaringan kartu | menara pengawas berlampu sorot, tanpa logo |
| terminal | perusahaan terminal | server berheadset |
| cash | pembayar tunai | badan bulat ungu, topi pet, uang kertas |

Palet T01: krem #fff4da, hijau uang #2f8f6b, koin #ffd23f, biru malam #172447, koral #e4572e.
