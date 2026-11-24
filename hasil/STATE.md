---
mode_gate: tanya                 # tanya | otomatis (lihat AGENTS.md)
kapasitas_jam_per_minggu: null   # diisi kreator, dipakai untuk membatasi track paralel
batas_track_aktif: 2             # maksimal track di tahap "aktif" sekaligus
batas_track_validasi: 2          # maksimal track di tahap "validasi" sekaligus
track_fokus: null                # track yang dikerjakan bila kreator hanya bilang "mulai", contoh T01
langkah_berikutnya: "riset niche: kreator memilih usulan track untuk validasi, lalu buat TRACK.md semua usulan (instruksi/01-riset-niche.md langkah 7)"
menunggu_keputusan: "Pilih track untuk validasi (maks 2): U2-A The plumbing of money [81, rekomendasi], U1-A Why Southeast Asia works like this [79, rekomendasi], cadangan U1-B, U1-C, U2-B, U2-C, atau track tech dari riset pertama (AI coding agents mobile, 87). Detail: hasil/00-riset-niche/analisa-niche-nontech.md"
review_portfolio_berikutnya: null   # tanggal ISO
terakhir_diperbarui: 2026-11-24
---

# STATE portfolio

File ini adalah memori kerja tingkat portfolio. Progres per track ada di `hasil/tracks/<ID>/TRACK.md`. Perbarui tabel dan log ini setiap kali status track berubah.

## Track

| ID | Niche | Sudut | Tahap | Channel | Langkah berikutnya | Jam/minggu | Keputusan terakhir |
| --- | --- | --- | --- | --- | --- | --- | --- |

Tahap: `usulan` → `validasi` → `aktif` ⇄ `jeda` → `drop`. Lihat `instruksi/02-validasi-niche.md` dan `instruksi/09-review-portfolio.md`.

## Log

- 2026-11-24: Kit diubah ke model portfolio multi-track. Belum ada track. Rekomendasi awal dari dokumen strategi (master Inggris, niche edukasi mobile/Flutter atau AI tools untuk developer) menjadi bahan riset niche, belum diputuskan kreator.
- 2026-11-24: Riset niche ke-2 (non-tech): 14 kandidat dengan data pencarian YouTube. Dua niche teratas: sejarah dan cara kerja uang (81) dan Indonesia/Asia Tenggara dijelaskan dari dalam (79), masing-masing 3 sudut (U1-A..C, U2-A..C). File: 00-riset-niche/kandidat-niche-nontech.md, analisa-niche-nontech.md. Hasil riset pertama (tech) belum ada di repo.
