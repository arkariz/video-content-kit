---
mode_gate: tanya                 # tanya | otomatis (lihat AGENTS.md)
kapasitas_jam_per_minggu: 12     # kreator menerima di atas 10 jam/minggu (2026-11-24)
batas_track_aktif: 2             # maksimal track di tahap "aktif" sekaligus
batas_track_validasi: 2          # maksimal track di tahap "validasi" sekaligus
track_fokus: T01                # track yang dikerjakan bila kreator hanya bilang "mulai", contoh T01
langkah_berikutnya: "T01: kreator menyetujui rencana V2 (menunggu_keputusan di TRACK T01). T02: validasi V1 di sesi terpisah (\"lanjut T02\"), target V2 tayang di periode yang sama dengan T01"
menunggu_keputusan: null
review_portfolio_berikutnya: null   # tanggal ISO
terakhir_diperbarui: 2026-11-24
---

# STATE portfolio

File ini adalah memori kerja tingkat portfolio. Progres per track ada di `hasil/tracks/<ID>/TRACK.md`. Perbarui tabel dan log ini setiap kali status track berubah.

## Track

| ID | Niche | Sudut | Tahap | Channel | Langkah berikutnya | Jam/minggu | Keputusan terakhir |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | Sejarah dan cara kerja uang | The plumbing of money | validasi | Channel uang (belum dinamai) | Setujui rencana V2 | 5 | 2026-11-24: dipilih untuk validasi; V1 LULUS |
| T02 | Indonesia dan Asia Tenggara dari dalam | Why Southeast Asia works like this | validasi | Channel Asia Tenggara (belum dinamai) | Validasi V1 | 5 | 2026-11-24: dipilih untuk validasi |
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
