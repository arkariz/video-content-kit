---
name: video-portfolio
description: Manage a portfolio of parallel video-channel tracks (niche + angle) - create tracks, run niche validation (desk research V1, then a pre-registered market test V2 with locked pass/fail criteria), enforce capacity limits, and run portfolio reviews that decide scale, continue, pivot, pause, or drop per track. Use when the user says "validasi", "validasi niche", "track baru", "review portfolio", "jeda", "drop", "pivot", or wants to compare niches/angles.
---

# Video Portfolio

Satu kreator, beberapa track. Satu track = satu niche + satu sudut, dengan progresnya sendiri. Skill ini mengatur siklus hidup track: `usulan` → `validasi` → `aktif` ⇄ `jeda` → `drop`.

## Mode kerja

- **Di dalam Video Content Kit** (ada `AGENTS.md` dan `hasil/STATE.md`): ikuti `instruksi/02-validasi-niche.md` untuk validasi dan `instruksi/09-review-portfolio.md` untuk review. Pakai template `track.md`, `validasi-rencana.md`, `validasi-hasil.md`, dan `review-portfolio.md` di `instruksi/templates/`.
- **Tanpa kit:** buat `hasil/STATE.md` (tabel track + kapasitas) dan `hasil/tracks/<ID>/TRACK.md`, lalu jalankan aturan di bawah.

## Membuat track

1. ID berikutnya: `T` + dua digit, tidak pernah dipakai ulang. Folder `hasil/tracks/<ID>-slug/`.
2. TRACK.md berisi hipotesis satu kalimat ("Penonton X mau menonton format Y tentang Z dari kreator, karena bukti W"), pilar, topik yang dihindari, channel, dan jam per minggu.
3. Niche berbeda butuh channel berbeda. Sudut berbeda di niche yang sama boleh satu channel.
4. Tambahkan ke tabel di STATE.

## Validasi

**V1, riset tanpa publish (1 sampai 2 hari).** Lulus hanya bila semua terpenuhi: minimal 5 video dalam 90 hari terakhir di atas 10 ribu view, minimal 2 outlier dari channel di bawah 10 ribu subscriber, minimal 10 ide dengan bukti milik kreator, jam produksi sesuai kapasitas, dan bukan topik sensitif dengan suara AI. Setiap bukti diberi tautan.

**V2, uji pasar (2 sampai 3 minggu).**
- Default paket uji: 6 Shorts + 2 long-form, dengan 2 sampai 3 variasi sudut atau hook yang disengaja.
- **Kunci kriteria sebelum konten pertama tayang** dan minta kreator menyetujuinya. Ambang awal (median paket uji):
  - Shorts viewed vs swiped: lulus 65% atau lebih, gagal di bawah 50%
  - Shorts average percentage viewed: lulus 70% atau lebih, gagal di bawah 50%
  - Long-form CTR: lulus 3% atau lebih, gagal di bawah 2%
  - Long-form average percentage viewed: lulus 30% atau lebih, gagal di bawah 20%
  - Komentar dengan pertanyaan lanjutan atau share: lulus minimal 3, gagal 0
  - Waktu produksi: gagal kalau di atas 1,5x rencana
- Nilai setelah setiap konten tayang minimal 7 hari. Total view Shorts di bawah 3.000 berarti DATA KURANG, dan sprint diperpanjang 1 minggu (maksimal sekali).
- Keputusan: LULUS → `aktif`. GAGAL (2 metrik atau lebih di zona gagal) → `drop` atau pivot. DI TENGAH → perpanjang dengan satu perubahan spesifik, atau pivot. Kreator selalu yang memutuskan.

## Kapasitas

Sebelum menaikkan track ke `validasi` atau `aktif`, jumlahkan `jam_per_minggu` semua track `validasi` + `aktif` dan bandingkan dengan `kapasitas_jam_per_minggu`, `batas_track_aktif`, dan `batas_track_validasi` di STATE. Kalau melebihi, usulkan track mana yang dijeda dulu.

## Review portfolio (setiap 2 minggu, atau setelah validasi selesai)

1. Papan skor dengan metrik rasio yang sama untuk semua track, plus tren 3 siklus.
2. Skor 0 sampai 100: performa vs target 40%, tren 20%, potensi monetisasi 20%, efisiensi jam 10%, energi kreator 10%.
3. Usulan per track: `scale`, `lanjut`, `pivot` (sudut baru menjadi track baru dengan `asal: pivot-dari:<ID>`), `jeda`, `drop`, atau `validasi` untuk usulan cadangan.
4. Cek kapasitas setelah keputusan.
5. Pindahkan pelajaran yang terbukti di 2 track atau lebih ke `hasil/learnings-global.md`.
6. Tulis `hasil/review/YYYY-MM-DD-review-portfolio.md`, lalu minta keputusan kreator per track. Gate ini selalu berhenti.

## Aturan keadilan

- Jangan bandingkan view mentah antar channel dengan umur berbeda. Pakai rasio dan tren.
- Track yang baru 1 siklus belum dinilai `drop`, kecuali melanggar kebijakan.
- Biaya yang sudah keluar bukan alasan untuk lanjut.
- Track yang di-drop tidak dihapus. Catat alasannya dengan angka.
