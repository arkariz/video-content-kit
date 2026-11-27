---
mode_gate: otomatis              # tanya | otomatis (lihat AGENTS.md). Otomatis sejak 2026-11-24: pipeline produksi penuh, kreator hanya review video jadi
kapasitas_jam_per_minggu: 12     # kreator menerima di atas 10 jam/minggu (2026-11-24)
batas_track_aktif: 2             # maksimal track di tahap "aktif" sekaligus
batas_track_validasi: 2          # maksimal track di tahap "validasi" sekaligus
track_fokus: T01                # track yang dikerjakan bila kreator hanya bilang "mulai", contoh T01
langkah_berikutnya: "Review video T01-002 dan T02-002/003/004 (hasil/review/rencana-produksi-2026-11-26.md), lalu publish sesuai jadwal; analitik 001 T02 11-28, T01 12-02"
menunggu_keputusan: null
review_portfolio_berikutnya: null   # tanggal ISO
terakhir_diperbarui: 2026-11-27
---

# STATE portfolio

File ini adalah memori kerja tingkat portfolio. Progres per track ada di `hasil/tracks/<ID>/TRACK.md`. Perbarui tabel dan log ini setiap kali status track berubah.

## Track

| ID | Niche | Sudut | Tahap | Channel | Langkah berikutnya | Jam/minggu | Keputusan terakhir |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | Sejarah dan cara kerja uang | The plumbing of money | validasi | Money Plumbing | 002 menunggu review; 004 siap publish; analitik 001 mulai 12-02 | 5,5 | 2026-11-26: 002 dirender |
| T02 | Indonesia dan Asia Tenggara dari dalam | Why Southeast Asia works like this | validasi | Channel Asia Tenggara (@equator.logic di TikTok) | Review 002, 003, 004; publish 002 target 12-01 | 6 | 2026-11-26: 002, 003, 004 dirender |
| T03 | Sejarah dan cara kerja uang | When money breaks | usulan | Channel uang | Cadangan | - | 2026-11-24: cadangan |
| T04 | Sejarah dan cara kerja uang | Asian business empires | usulan | Channel uang (atau pilar channel Asia Tenggara) | Cadangan | - | 2026-11-24: cadangan |
| T05 | Indonesia dan Asia Tenggara dari dalam | Nusantara before the maps | usulan | Channel Asia Tenggara | Cadangan | - | 2026-11-24: cadangan |
| T06 | Indonesia dan Asia Tenggara dari dalam | Indonesia dalam 60 detik (Shorts ID) | usulan | Channel Asia Tenggara + FB/IG | Cadangan | - | 2026-11-24: cadangan |

Tahap: `usulan` → `validasi` → `aktif` ⇄ `jeda` → `drop`. Lihat `instruksi/02-validasi-niche.md` dan `instruksi/09-review-portfolio.md`.

## Log

- 2026-11-24: Kit diubah ke model portfolio multi-track. Belum ada track. Rekomendasi awal dari dokumen strategi (master Inggris, niche edukasi mobile/Flutter atau AI tools untuk developer) menjadi bahan riset niche, belum diputuskan kreator.
- 2026-11-24: Riset niche ke-2 (non-tech): 14 kandidat dengan data pencarian YouTube. Dua niche teratas: sejarah dan cara kerja uang (81) dan Indonesia/Asia Tenggara dijelaskan dari dalam (79), masing-masing 3 sudut (U1-A..C, U2-A..C). File: 00-riset-niche/kandidat-niche-nontech.md, analisa-niche-nontech.md. Hasil riset pertama (tech) belum ada di repo.
- 2026-11-24: Kreator memilih U2-A dan U1-A untuk validasi. Dibuat T01 (validasi), T02 (validasi), T03 sampai T06 (usulan cadangan). Kapasitas diisi 10 jam/minggu. T01 V1 LULUS; rencana V2 T01 menunggu persetujuan. Track tech dari riset pertama belum dibuat karena datanya belum ada di repo.
- 2026-11-24: Kreator menerima kapasitas di atas 10 jam/minggu. Kapasitas diubah ke 12. V2 T01 dan T02 direncanakan berjalan bersamaan (sekitar 11 jam/minggu) di periode tayang yang sama.
- 2026-11-24: T02 V1 LULUS (5/5). Rencana V2 T02 menunggu persetujuan. Estimasi T02 naik ke 6 jam/minggu (rekam footage); total T01 + T02 sekitar 11,7 dari 12 jam/minggu, hampir tanpa sisa.
- 2026-11-24: Rencana V2 T02 disetujui dan dikunci (paket 6 Shorts + 2 long-form, tayang 2026-12-07 s.d. 2026-12-27).
- 2026-11-24: Rencana V2 T01 disetujui dan dikunci (LULUS = min. 4/6 metrik, tanpa zona gagal). Beban validasi: T01 5,5 + T02 6 = 11,5 dari 12 jam/minggu.
- 2026-11-24: T01 riset viral sprint V2 selesai; kreator memilih semua usulan sudut (opsi 1). Siklus uji: 001 (A), 002 (B), 003 (C).
- 2026-11-24: T01 naskah siklus 001 disetujui (master ≥ 8:00 untuk mid-roll YouTube). Berikutnya produksi di repo.
- 2026-11-24: Kerangka produksi multi-track dibangun (engine Remotion bersama + skrip tts/captions/footage/render + katalog footage). T01 siklus 001 jadi uji pertama.
- 2026-11-24: Mode gate diubah ke otomatis atas permintaan kreator. Pipeline produksi penuh dibangun (scripts/pipeline, produksi/PIPELINE.md): riset sampai paket review tanpa tangan, berhenti di QA kritis, kreator review lalu SETUJU untuk publish (alat publish belum dipilih). Kreator memilih footage nyata berlisensi sebagai pengganti bukti kreator; dicatat sebagai pengecualian QA di T01.
- 2026-11-24: Kontrak visual di 03-script.json (produksi/CONTRACT.md) dan scripts/produksi/build-visual.mjs: chat Project cukup menulis naskah beserta visual; langkah 05 sampai 07 berjalan tanpa LLM dan bisa dipakai track/agent mana pun. AGENTS.md dan CLAUDE.md diperbarui. Siklus 001 T01 dimigrasi dan hasilnya identik.
- 2026-11-24: Pemeran dan latar T02 dibangun (STYLE.md). Footage milik kreator didukung pipeline dan dihitung QA sebagai bukti kreator. Pratinjau adegan: scripts/produksi/preview-stage.mjs.
- 2026-11-24: Alat publish dipilih: Upload-Post. Adaptor scripts/pipeline/publish.mjs (plan, send, status) dengan penolakan tanpa persetujuan, jadwal dari TRACK.md, label AI, chapter. Belum teruji ke API sungguhan; kreator perlu membuat akun, profil, dan API key (UPLOADPOST_API_KEY, UPLOADPOST_PROFILE di .env).
- 2026-11-24: Uji kirim Upload-Post berhasil: Short A1 T01-001 ke YouTube sebagai privat (kreator memeriksa di Studio, hasil oke). Instagram dan Facebook belum terhubung di Upload-Post, jadi belum teruji. Video uji perlu dihapus kreator di Studio.
- 2026-11-25: Publish mendukung beberapa profil Upload-Post: satu profil per track lewat `profil_publish` di TRACK.md (T01 = "default"; T02 belum ada). Profil lintas niche ditolak.
- 2026-11-25: Profil publish: T01 = "moneyplumbing" (YouTube, Facebook, Instagram terhubung), T02 = "equatorlogic" (belum ada di akun Upload-Post; batas 2 profil sudah terisi "default" dan "moneyplumbing").
- 2026-11-25: Koreksi profil T02: pakai "default" (nama API); "equatorlogic" hanya nama tampilan. T01 tetap "moneyplumbing".
- 2026-11-25: Uji kirim T01-001 A1 ke profil "moneyplumbing": YouTube privat sukses (ID p4CE55YrczE); Facebook sukses diminta sebagai draf (ID 1005272842019993), tetapi API mengembalikan URL Reel, jadi status draf perlu dikonfirmasi kreator (cek tanpa login tidak konklusif). Instagram tidak diuji. Video uji perlu dihapus kreator.
- 2026-11-25: Kreator mengonfirmasi Reel Facebook uji (ID 1005272842019993) berstatus draf. Mode uji aman untuk Facebook meskipun API mengembalikan URL Reel.
- 2026-11-25: ElevenLabs Starter aktif. Suara per bahasa di produksi/voices.json (ID = R86jddkroI9bJwXFfjsr; EN dari .env).
- 2026-11-25: T01 siklus 001 dirender ulang dengan audio ElevenLabs Starter (master 8:06). Menunggu review kreator, thumbnail, dan SETUJU publish.
- 2026-11-25: Publish versi Indonesia dilewati dulu; lanjut sesuai rencana awal (versi Inggris).
- 2026-11-25: Kreator memajukan publish T01-001 ke 25-27 Nov (penyimpangan dari rencana V2 terkunci). Menunggu kreator menjalankan approve.mjs.
- 2026-11-25: T01-001 tayang (master YouTube dan Facebook), A1 terjadwal, A2 tertahan kuota Upload-Post (10/bulan). Paket gratis tidak cukup untuk paket uji V2 dua track.
- 2026-11-25: Atas arahan kreator, pelajaran T01-001 (terlalu padat, visual dan fondasi kurang) disimpan di learnings-global.md untuk semua track dan siklus berikutnya. Mesin, kontrak, dan QA tidak diubah.
- 2026-11-25: Referensi gaya video dari kreator (diorama 2.5D, banyak aset dan gerak) dipelajari dan dicatat di produksi/REFERENSI-GAYA.md. Mesin visual belum diubah.
- 2026-11-25: Kreator memilih diorama 2.5D sebagai gaya wajib semua track dan siklus. Mesin diorama dibangun (produksi/remotion/src/diorama), kontrak di instruksi/referensi/gaya-diorama.md, QA menegakkannya (kecuali T01-001). instruksi/ diubah atas permintaan kreator (penunjuk gaya wajib).
- 2026-11-25: T02 rebase ke main terbaru. Naskah siklus 001 dikonversi ke diorama 2.5D (world + stage), menunggu persetujuan kreator; fondasi-dulu dipenuhi lewat revisi s02-s03.
- 2026-11-25: T02 siklus 001 naskah disetujui kreator. Berikutnya produksi.
- 2026-11-25: T02 siklus 001 diproduksi sampai paket review (QA otomatis tanpa temuan kritis). Menunggu review kreator; Shorts perlu perbaikan framing 9:16 di mesin diorama.
- 2026-11-26: Atas permintaan kreator, gaya cerita dari 3 transkrip (Kurzgesagt x2, OverSimplified) dijadikan acuan wajib semua naskah: instruksi/referensi/gaya-cerita.md. 04-naskah.md, AGENTS.md, CLAUDE.md, PROJECT-INSTRUCTIONS.md, dan learnings-global.md diperbarui atas izin kreator. T01: draft naskah 002 ditulis, menunggu persetujuan.
- 2026-11-26: T02 di-rebase ke main (commit gaya cerita 110f9f8). Atas keputusan kreator, gaya visual wajib diganti dari diorama 2.5D ke R3, ilustrasi gerak penjelas: instruksi/referensi/gaya-visual.md (satu kalimat satu gambar, gerak dan transisi terukur, kontrak `shots`). AGENTS.md, CLAUDE.md, instruksi/ (04, 05, PROJECT-INSTRUCTIONS, gaya-cerita), learnings-global.md, produksi/STYLE.md, CONTRACT.md, PIPELINE.md, prompt pipeline, dan QA (G1–G5) diselaraskan atas izin kreator. Lapisan 3D (@remotion/three) disetujui kreator, belum dibangun. Mesin render `shots` belum ada: siklus baru (termasuk naskah T01-002 yang masih diorama) perlu `shots` dan menunggu mesin itu.
- 2026-11-26: Atas permintaan kreator, instruksi dan referensi gaya lama dihapus supaya tidak terbaca agent: instruksi/referensi/gaya-diorama.md, contoh demo diorama dan pemeran lama, bagian mesin lama di STYLE.md dan CONTRACT.md, referensi R2 (Histo Graph) di REFERENSI-GAYA.md, papan spec di produksi/README.md, dan instruksi kartun di prompt pipeline. Skema naskah sekarang memakai `shots`, `anchor`, `cast`. Kode mesin lama tetap ada untuk render ulang T01-001 dan T02-001.
- 2026-11-26: Mesin render `shots` (gaya R3) dibangun di produksi/remotion/src/r3 (primitif, penghitung, transisi iris/wipe/dorong/potong/tahan, pemeran T02). Waktu shot dan label dihitung dari caption per kata (scripts/produksi/r3.mjs); agent menulis adegan per siklus di `04-shots.tsx` (cara di produksi/PIPELINE.md, bagian Mesin R3). build-visual, render, run, dan QA (G1–G6, scripts/pipeline/qa-r3.mjs) diselaraskan. Contoh: s06 T02-001 ditulis ulang di produksi/contoh-r3/T02-001-s06, QA G1–G6 lolos. T01-001 dan T02-001 tetap dirender mesin lama. instruksi/referensi/gaya-visual.md bagian 8 masih menyebut mesin belum ada (folder instruksi/ tidak diubah tanpa izin kreator).
- 2026-11-26: Mesin render shots R3 (produksi/remotion/src/r3, sesi terpisah) digabung ke T02. Siklus baru bisa diproduksi dengan gaya R3; T02-001 akan dibuat ulang dengan R3 di sesi baru.
- 2026-11-26: T02 siklus 001 diproduksi ulang dengan visual R3 3D berkedalaman atas permintaan kreator. Lapisan 3D bersama dibangun sebagai tambahan (`r3/three`, opsional per siklus) di sesi produksi yang sama; perubahan kecil di render.mjs (`--gl=angle` untuk siklus 3D), Thumbnail.tsx, dan tsconfig. Render track lain belum diuji ulang. AGENTS.md dan instruksi/referensi/gaya-visual.md masih menyebut lapisan 3D belum dibangun (tidak diubah tanpa izin).
- 2026-11-26: Kreator mengunggah T02-001 secara manual lebih awal (penyimpangan dari jendela tayang V2 T02). QA anti-slop manual belum dijalankan. Menunggu tautan tayang.
- 2026-11-26: T02-001 tayang di YouTube (master dan 2 Shorts, unggah manual). Analitik mulai 2026-12-03.
- 2026-11-26: T02-001 (master dan 2 Shorts) juga tayang di Facebook, unggah manual.
- 2026-11-26: Shorts T02-001 juga tayang di Instagram Reels, unggah manual.
- 2026-11-26: T02-001 juga tayang di TikTok (master dan 2 Shorts), unggah manual.
- 2026-11-26: T02 siklus 001 selesai sampai publish. Berikutnya analitik, lalu siklus 002.
- 2026-11-26: T02 siklus 003 (variasi B, Jawa; saat dibuat bernomor 002) dibuat: riset viral, sudut A dipilih kreator, brief dan naskah R3 ditulis. Menunggu persetujuan naskah 001 dan 003.
- 2026-11-26: T02: GTA menjadi siklus 002 (target 2026-12-01), Jawa mundur ke siklus 003 (2027-01-05). Penyimpangan isi dan jadwal dari rencana V2; kriteria tidak diubah.
- 2026-11-26: T01 siklus 004 (GTA VI) dibuat di luar paket V2 terkunci atas keputusan kreator; tidak dinilai di penilaian V2. Naskah menunggu persetujuan.
- 2026-11-26: T01-004 naskah disetujui (judul 1, thumbnail A); siap produksi R3.
- 2026-11-26: Atas permintaan kreator, berlaku semua track dan siklus berikutnya: tiap Short wajib punya thumbnail 1080x1920 (`shorts_cuts[].thumbnail`, komposisi ThumbnailShort, QA V8) dan caption tampil per kalimat. T01-001, T01-004, T02-001 tetap caption per kata (`caption_mode: "word"`). Mesin bersama, kontrak, instruksi 04/05, skema, dan prompt pipeline diperbarui di sesi produksi T01-004.
- 2026-11-26: Kreator mengonfirmasi T01 siklus 001 (master dan 2 Shorts) dan T02 siklus 001 sudah tayang di semua platform. Tautan T01 A1 dan A2 belum dicatat.
- 2026-11-26: Pembersihan dan penyelarasan repo atas permintaan kreator: file sampah dan generator sekali pakai yang usang dihapus dari git, dokumen progres dan catatan mesin visual (AGENTS.md, gaya-visual.md, PIPELINE.md, README) diselaraskan. Rencana validasi terkunci dan log lama tidak diubah.
- 2026-11-26: T02 siklus 002 brief + naskah draf selesai; menunggu persetujuan kreator.
- 2026-11-26: T02 siklus 002 naskah disetujui kreator. Berikutnya uji gaya mulus lalu produksi.
- 2026-11-26: Semua branch (T02-GTA, T02-JAWA, T01-S004-GTAVI; T02 sama dengan main) digabung ke main atas permintaan kreator. Folder Jawa dinomori ulang 002 → 003.
- 2026-11-26: Produksi malam disetujui: T02-002, T01-002, T02-003 (naskah disetujui), berhenti 06.00 WIB. Lihat hasil/review/rencana-produksi-2026-11-26.md.
- 2026-11-26: Produksi malam selesai dirender: T01-002, T02-002, T02-003, T02-004 (long-form, 2 Shorts, thumbnail). Semua menunggu review kreator; belum ada publish.
- 2026-11-26: Fase 1-2 sistem visual storytelling: audit R3 (peringatan 3D basi di r3.mjs, deteksi GL di render.mjs, EXPR beda dengan soft); spesifikasi dikonsolidasi tanpa file aturan baru: Style Bible di produksi/STYLE.md, spek animasi di PIPELINE.md Mesin R3, spek scene A-I + pola P01-P14 + gate kesiapan di gaya-visual.md, riset klaim di gaya-cerita.md, 03-visual.json + aturan V-1..V-9 di CONTRACT.md. Engine belum diubah. Menunggu persetujuan kreator.
- 2026-11-26: Kreator menyetujui dokumen Fase 2. Fase 3 (prototipe P01 tetes air di produksi/contoh-r3/) dimulai dengan Sonnet.
- 2026-11-26: Fase 3 prototipe P01 tetes air selesai (Sonnet): 16 klaim, 4 scene 17 dtk, audio dan caption ElevenLabs asli, render 1920x1080 dan 1080x1920, still deterministik. resolveCycle menerima id semu `_contoh`. Menunggu persetujuan visual kreator.
- 2026-11-26: Kreator meminta Fase 3.5 (koreksi kualitas visual) sebelum Fase 4. Phase A audit selesai: akar masalah di standar STYLE.md 2.1/2.2 dan proses tanpa tahap desain still, bukan engine; benchmark diusulkan s01.
- 2026-11-26: Fase 3.5 Phase B: 11 still referensi dari kreator dibedah jadi resep T1-T13 (rendering datar bertingkat, bukan gradien/blur); STYLE.md 1-5 ditulis ulang (hierarki L1-L3, sistem material, model cahaya, desain lingkungan); art direction versi 2 di 03-visual.json; arsitektur aset, alur still-dulu, dan rubrik 12 dimensi di PIPELINE.md; spesifikasi benchmark s01 di produksi/contoh-r3/P01b-s01-benchmark/. Engine tidak diubah.
- 2026-11-26: Fase 3.5 Phase C (Opus atas permintaan kreator): still benchmark s01 dirender (5 iterasi), aset lokal parts/art.tsx (Shade, Drop2, Block 3/4, WaterTower, FarCity, Cloud, Tree). Deterministik. Penilaian agent: siluet dan akurasi 4, material/cahaya/polesan 3; belum lulus gate. Engine tidak diubah.
- 2026-11-26: Fase 3.5 putaran still 6 (matahari, cahaya hangat, bayangan kontak, material kaca; material dan polesan masih 3) lalu Phase E atas permintaan kreator: pustaka aset bersama produksi/remotion/src/r3/art (@r3/art), galeri acuan produksi/acuan-visual/ (indeks STYLE.md 10.1), validateVisualSpec V-1..V-14 (build-visual + QA G7), tahap still wajib di run.mjs (scripts/pipeline/still.mjs, 04-still.json, hanya visual_spec versi 2). Perbaikan kecil: peringatan 3D basi dihapus, deteksi GL memindai parts/, EXPR + soft, cast [] boleh tanpa faces. Regresi: hash still contoh identik, build-visual 7 siklus identik, check_kit OK. Catatan: T01-004 kini terdeteksi 3D (--gl=angle) saat dirender ulang.
- 2026-11-26: Kreator menyetujui galeri acuan P01b; 11 still referensi kreator disimpan lokal di produksi/acuan-visual/eksternal/ (diabaikan git karena hak cipta pihak ketiga, indeks STYLE.md 10.2). Phase D: animasi benchmark s01 6,1 dtk dirender (16:9 dan 9:16), deterministik 183/183 frame, video perbandingan P01 vs P01b.
- 2026-11-27: Kreator menyetujui animasi benchmark s01 (P01b Phase D). Sistem visual (still dulu, @r3/art, G7) dipakai untuk siklus produksi berikutnya, mulai T01-005.
- 2026-11-27: Alat rilis sendiri dibangun (scripts/rilis: dashboard dan YouTube) atas persetujuan kreator; keputusan: master di YouTube dan Facebook, Short Facebook ke master Facebook, penjadwal di Mac (belum dibuat). Baru diuji dengan API tiruan.
- 2026-11-27: Uji unggah privat YouTube T01 lewat alat rilis berhasil (Short S1 T01-005, video WyvIPQTGoTM): metadata, subtitle en dan id, thumbnail. Jadwal, playlist, komentar, dan master belum teruji. Video uji perlu dihapus kreator di Studio.
- 2026-11-27: Penjadwal Mac alat rilis teruji sungguhan (komentar otomatis pada skenario uji T01). Persiapan rilis otomatis ditambahkan di akhir pipeline (subtitle, rencana, teks agen).
- 2026-11-27: Adaptor Facebook alat rilis dibangun (master, Reel, subtitle, sampul, komentar). Baru diuji dengan API tiruan; kreator perlu menyiapkan aplikasi Meta dan menghubungkan Page.
