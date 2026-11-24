---
mode_gate: tanya                 # tanya | otomatis (lihat AGENTS.md)
kapasitas_jam_per_minggu: null   # diisi kreator, dipakai untuk membatasi track paralel
batas_track_aktif: 2             # maksimal track di tahap "aktif" sekaligus
batas_track_validasi: 2          # maksimal track di tahap "validasi" sekaligus
track_fokus: null                # track yang dikerjakan bila kreator hanya bilang "mulai", contoh T01
langkah_berikutnya: "riset niche: isi profil kreator lalu riset kandidat (instruksi/01-riset-niche.md)"
menunggu_keputusan: null
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
