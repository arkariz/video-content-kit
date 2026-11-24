---
mode_gate: otomatis              # tanya | otomatis (lihat AGENTS.md). Otomatis sejak 2026-11-24: pipeline produksi penuh, kreator hanya review video jadi
kapasitas_jam_per_minggu: 12     # kreator menerima di atas 10 jam/minggu (2026-11-24)
batas_track_aktif: 2             # maksimal track di tahap "aktif" sekaligus
batas_track_validasi: 2          # maksimal track di tahap "validasi" sekaligus
track_fokus: T01                # track yang dikerjakan bila kreator hanya bilang "mulai", contoh T01
langkah_berikutnya: "T01: produksi siklus 001 di Claude Code (ElevenLabs, Pexels/Pixabay, Remotion). T02: riset viral sprint V2 (\"lanjut T02\")"
menunggu_keputusan: null
review_portfolio_berikutnya: null   # tanggal ISO
terakhir_diperbarui: 2026-11-24
---

# STATE portfolio

File ini adalah memori kerja tingkat portfolio. Progres per track ada di `hasil/tracks/<ID>/TRACK.md`. Perbarui tabel dan log ini setiap kali status track berubah.

## Track

| ID | Niche | Sudut | Tahap | Channel | Langkah berikutnya | Jam/minggu | Keputusan terakhir |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | Sejarah dan cara kerja uang | The plumbing of money | validasi | Channel uang (belum dinamai) | Produksi siklus 001 | 5,5 | 2026-11-24: naskah 001 disetujui |
| T02 | Indonesia dan Asia Tenggara dari dalam | Why Southeast Asia works like this | validasi | Channel Asia Tenggara (belum dinamai) | Riset viral sprint V2 | 6 | 2026-11-24: rencana V2 dikunci |
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

