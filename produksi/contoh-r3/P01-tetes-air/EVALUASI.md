# Evaluasi prototipe P01 "How a single drop of water travels through a city"

Laporan data Fase 3 (bukan dokumen aturan). Dibuat 2026-11-26. Hanya melihat 14 still dan dua klip yang dirender; belum ada penilaian kreator.

## Ringkasan teknis
- Naskah: 4 scene, 53 kata Inggris, audio 17,0 dtk, video 20,47 dtk (614 frame, jeda antar-scene otomatis). 4 shot, satu per scene (tiap scene satu kalimat).
- Audio dan caption asli: TTS ElevenLabs dan STT (`scribe_v1`) per kata, lewat `tts.mjs` dan `captions.mjs` dengan id semu `--track _contoh --siklus P01`. Satu perbaikan manual pada caption (`teardrops.` menjadi `teardrops:` agar sama dengan naskah; STT menambah titik karena jeda bicara).
- Mesin: 2.5D SVG (`Layer` d 0 sampai 1, blur kedalaman, `Frame`, `Pill` otomatis). Tanpa `soft`/`three`, jadi tanpa `--gl=angle`. Komponen baru hanya di `parts/` folder ini; `r3/` tidak diubah.
- Perubahan di luar folder contoh: `scripts/produksi/lib.mjs` (satu blok di `resolveCycle`, lihat diff di laporan akhir). Hanya aktif bila `--track` diawali `_`; jalur T01/T02 tidak tersentuh.

## Berkas
| Apa | Path |
| --- | --- |
| Riset, brief, naskah, visual, shots | `produksi/contoh-r3/P01-tetes-air/{01-riset-viral.md, 02-brief.md, 03-script.json, 03-visual.json, 04-shots.tsx, parts/*.tsx}` |
| Audio dan caption | `produksi/audio/_contoh/P01/en/*.mp3`, `produksi/captions/_contoh/P01/en.json` (+ `en.raw.json`) |
| Video landscape 1920x1080 | `produksi/render/_contoh/P01-tetes-air/Master16x9-en.mp4` (8,7 MB) |
| Video vertikal 1080x1920 | `produksi/render/_contoh/P01-tetes-air/Short9x16-S1-tetes-air-en.mp4` (7,2 MB) |
| Still landscape terpilih | `.../stills/s01-Master16x9-t3.3.png`, `s02-Master16x9-t3.4.png`, `s02-Master16x9-t5.2.png`, `s03-Master16x9-t2.2.png`, `s03-Master16x9-t3.9.png`, `s04-Master16x9-t2.7.png`, `s04-Master16x9-t3.8.png` |
| Still vertikal | `.../stills/s01-Short9x16-t3.3.png`, `s02-Short9x16-t3.5.png`, `s03-Short9x16-t3.9.png`, `s04-Short9x16-t3.8.png` |

Perintah:
```
npm --prefix produksi/remotion run typecheck
node --env-file=.env scripts/produksi/tts.mjs --track _contoh --siklus P01
node --env-file=.env scripts/produksi/captions.mjs --track _contoh --siklus P01
node scripts/produksi/render.mjs --track _contoh --siklus P01 --script produksi/contoh-r3/P01-tetes-air/03-script.json --still s01 --at 0.5,1.7,3.3
node scripts/produksi/render.mjs --track _contoh --siklus P01 --script produksi/contoh-r3/P01-tetes-air/03-script.json
node scripts/produksi/render.mjs --track _contoh --siklus P01 --script produksi/contoh-r3/P01-tetes-air/03-script.json --comp Short9x16 --cut S1-tetes-air
```
Satu render sekitar 3 sampai 4 menit di mesin ini (konkurensi 50 persen).

## Nilai per kriteria (1 sampai 5, jujur)

### Story
| Kriteria | Nilai | Catatan |
| --- | --- | --- |
| Kejelasan | 4 | Jalur atap, got, pipa, sungai, bak, keran, IPAL terbaca berurutan. Satu tetes yang diikuti membuat alurnya mudah. Scene s03 memuat lima tahap dalam 4,5 dtk, terlalu rapat. |
| Akurasi | 4 | Semua gambar punya klaim `terverifikasi` atau `disederhanakan`; tetes yang diikuti ditandai `metaphor` (C15 `belum`). Bentuk tetes besar roti burger sesuai USGS. Catatan: halaman USGS, EPA, dan CDC tidak bisa dibuka penuh (domain diblokir), kutipan dari cuplikan pencarian. Pemeriksaan sumber perlu diulang manual. |
| Penjelasan visual | 4 | Koagulasi (pengaduk dan corong), flokulasi (flok tumbuh), sedimentasi (lumpur), filter (pasir dan kerikil), klorin (kilau), aerasi (gelembung dan bakteri kapsul) berbeda satu sama lain. Pipa distribusi digambar bercabang tapi tidak mengecil jelas. |
| Kontinuitas | 3 | Tetes yang sama berubah warna: biru, cokelat keruh, biru, abu, biru. Jangkar (pantulan kota di tetes) kuat di s01 tapi lemah di s04; penutup belum "kembali ke pembuka dengan arti baru". |

### Visual
| Kriteria | Nilai | Catatan |
| --- | --- | --- |
| Konsistensi ilustrasi | 4 | Satu komponen `Drop` di semua scene, tanpa garis tinta, bak dan pipa membulat. |
| Komposisi | 3 | Tetes dijaga di tengah layar oleh kamera tracking; aman untuk vertikal, tapi komposisi cenderung "tetes di tengah, dunia lewat". Label otomatis berada di baris atas, tidak menempel pada benda. |
| Warna | 4 | Biru jernih dan cokelat keruh membawa makna; latar senja konsisten di s01, s02, s04. |
| Kedalaman | 4 | Lima lapisan di s01 sampai s04 (langit, skyline jauh, skyline tengah, subjek, hujan dan partikel latar depan). Kabut dan blur bekerja. s03 lapisan belakang kurang menarik (dinding gelap). |
| Keterbacaan | 3 | Label terbaca di 16:9 dan 9:16. Di vertikal, empat label s03 bertumpuk dan menutupi sebagian faucet bila kamera tidak digeser (digeser lewat offset khusus vertikal). Tetes kecil di s01 dibuang di vertikal. Pantulan kota di dalam tetes tampak seperti garis batang, bukan gedung. |

### Motion
| Kriteria | Nilai | Catatan |
| --- | --- | --- |
| Timing | 3 | Titik jalan tetes diikat ke `word()` (lands, slides, drain, river, filters, chlorinates, tap), tapi langkah antar kata dipadatkan: di pipa kecepatan hingga sekitar 1.600 px/dtk sehingga tetes sulit diikuti. |
| Kehalusan | 4 | Lintasan `soft()` membulatkan belokan; squash-stretch dari kecepatan; benturan teredam; goyangan setelah memipih. Belum diperiksa dalam gerak nyata oleh orang (hanya still dan beberapa frame ffmpeg). |
| Kamera | 4 | Dolly keluar dari tetes raksasa ke jalur (s02, s03), tracking dengan jeda 0,12 dtk, tarik mundur di s04. Setiap gerak punya alasan penjelasan. |
| Gerak sekunder | 4 | Pengaduk, kincir, flok, gelembung, riak, hujan, kilau klorin, lampu jalan. Mungkin terlalu banyak bergerak sekaligus di s03. |
| Transisi | 3 | Iris dari titik jatuh s01 ke s02, push s02 ke s03, wipe s03 ke s04 berjalan sesuai rancangan. Hanya `cut`/`iris`/`push`/`wipe` dipakai; tanpa match cut atau morph. Iris dan wipe masih bergaris putih tegas (dibiarkan sesuai STYLE.md bagian 11). |

### Technical
| Kriteria | Nilai | Bukti |
| --- | --- | --- |
| Deterministik | lulus | `shasum` dua render still `s02 t3.5` dan `s03 t2.2` identik (`5e31dbf5...` dan `8c669a32...`). Tanpa `Math.random`, state, efek. |
| Rasio | lulus | ffprobe: Master 1920x1080, 30 fps, 614 frame, 20,47 dtk; Short 1080x1920, 30 fps, 614 frame, 20,47 dtk. |
| Sinkron caption | sebagian | Caption dari STT asli per kata; label dan titik jalan memakai waktu kata. Hanya diperiksa dari still dan frame, belum diputar. Perbaikan manual satu kata caption diperlukan. |
| Tidak merusak pipeline | lulus | Typecheck bersih. Perubahan skrip satu blok di `resolveCycle`, aktif hanya untuk id berawalan `_`. `render.mjs --script` T02-001 s06 tidak diubah dan tidak dirender ulang di sesi ini (kompatibilitas dinilai dari kode). |
| Validator kontrak | gagal sebagian | `validateR3` melaporkan satu error: `cast` kosong ditolak ("naskah dengan shots butuh cast"), padahal prototipe tanpa pemeran valid. Lihat temuan spesifikasi. |

## Yang belum memuaskan
1. Pantulan kota di dalam tetes tampak seperti bar-code; perlu bentuk gedung yang lebih jelas atau gradien langit terbalik.
2. s03 terlalu padat untuk 4,5 dtk. Pecah menjadi dua shot (dua kalimat) atau perpanjang narasi.
3. Penutup s04 belum menutup lingkaran secara visual; hanya satu tetes membesar di sungai.
4. Label otomatis tidak menempel pada benda. Sebaiknya `Pill` yang mengikuti benda (`useLabel` + pointer) untuk label penting (STORM DRAIN, CLUMP).
5. Pipa distribusi tidak "mengecil seperti cabang pohon" (C13), hanya bercabang.
6. Kecepatan tetes di pipa terlalu tinggi; perlu kamera yang melambat atau jalur dipendekkan.
7. Awan di s01 berupa elips datar yang kurang halus.
8. Keran dan bak cuci tidak membentuk satu benda utuh (bar horizontal menembus keran).
9. Tidak ada musik dan efek suara latar selain `pop` dan `whoosh` bawaan.
10. QA otomatis (`qa-r3.mjs`) tidak dijalankan: mesin itu membaca `hasil/tracks`.

## Temuan pada dokumen spesifikasi (tidak diubah)
- `CONTRACT.md` dan `r3.mjs` (`validateR3`): `cast: []` ditolak. Perlu aturan "boleh kosong bila tanpa pemeran" untuk contoh dan scene sains tanpa tokoh.
- `lib.mjs`/`tts.mjs`/`captions.mjs` hanya mengenal `hasil/tracks`; contoh di luar track butuh id semu (dibuat lewat `_contoh`). Perlu dicatat di `PIPELINE.md`.
- `gaya-visual.md` bagian 3: tidak ada panduan untuk scene satu kalimat panjang yang memuat banyak tahap (s03); gate kesiapan sebaiknya memeriksa kerapatan tahap per detik.
- `PIPELINE.md` bagian 6: label otomatis berada di posisi tetap di baris atas, bertumpuk dalam vertikal bila lebih dari tiga; aturan atau opsi posisi di bawah kamera belum ada.
- `STYLE.md` bagian 2.4: contoh subjek "tetes" belum ada; `Drop` P01 bisa menjadi acuan.
- Pemeriksaan sumber: kolom Kutipan di tabel riset berisi parafrase pendek dari cuplikan pencarian; template sebaiknya membedakan "kutipan dibaca langsung" dan "dari cuplikan".

## Komponen layak dipromosikan ke `r3/` di Fase 4
| Komponen | Kegunaan umum | Kesiapan |
| --- | --- | --- |
| `parts/util.tsx`: `trail`, `soft`, `vel`, `stretch`, `impact`, `tw` | lintasan benda dari titik jalan, squash-stretch dari kecepatan, benturan | siap, generik |
| `parts/drop.tsx`: `Drop`, `Splash`, `Sparkle`, `TearGhost` | tetes air lembut, percikan, kilau; `Drop` dan `Splash` untuk semua topik air | `Drop`, `Splash`, `Sparkle` siap; `TearGhost` khusus P01 |
| `parts/city.tsx`: `Skyline`, `Rain`, `Fog` | latar kota berlapis, hujan, kabut | siap; `Skyline` bisa menerima palet |
| `parts/plant.tsx`: `Pipe`, `RiverBody`, `TankShell` | pipa tembus, sungai, bak potongan | `Pipe`, `RiverBody`, `TankShell` siap; bak isi (Stir/Floc/Settle/Filter/Chlor/Aer) khusus topik air |
| Pola `Soil` (di `04-shots.tsx`) | tanah potongan | perlu dipindah ke `parts` dulu |
