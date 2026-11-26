---
mode_gate: otomatis              # tanya | otomatis (lihat AGENTS.md). Otomatis sejak 2026-11-24: pipeline produksi penuh, kreator hanya review video jadi
kapasitas_jam_per_minggu: 12     # kreator menerima di atas 10 jam/minggu (2026-11-24)
batas_track_aktif: 2             # maksimal track di tahap "aktif" sekaligus
batas_track_validasi: 2          # maksimal track di tahap "validasi" sekaligus
track_fokus: T01                # track yang dikerjakan bila kreator hanya bilang "mulai", contoh T01
langkah_berikutnya: "T01: kirim Short A2 (kuota habis), verifikasi channel YouTube, setujui naskah 002 + rekam 2 klip tangan. T02: analitik siklus 001 mulai 2026-12-03"
menunggu_keputusan: null
review_portfolio_berikutnya: null   # tanggal ISO
terakhir_diperbarui: 2026-11-26
---

# STATE portfolio

File ini adalah memori kerja tingkat portfolio. Progres per track ada di `hasil/tracks/<ID>/TRACK.md`. Perbarui tabel dan log ini setiap kali status track berubah.

## Track

| ID | Niche | Sudut | Tahap | Channel | Langkah berikutnya | Jam/minggu | Keputusan terakhir |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | Sejarah dan cara kerja uang | The plumbing of money | validasi | Channel uang (belum dinamai) | Kirim Short A2, naskah 002 | 5,5 | 2026-11-25: master 001 tayang |
| T02 | Indonesia dan Asia Tenggara dari dalam | Why Southeast Asia works like this | validasi | Channel Asia Tenggara (belum dinamai) | 001 tayang di YouTube, Facebook, Instagram; analitik mulai 2026-12-03 | 6 | 2026-11-26: video 001 tayang di YouTube dan Facebook |
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
