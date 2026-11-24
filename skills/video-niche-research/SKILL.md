---
name: video-niche-research
description: Research, score, and turn niches into proposed tracks (niche + angle) for a monetizable video portfolio using web research - demand, outlier channels, audience RPM tier, sponsor pool, AI-slop saturation, policy risk, and the creator's unfair advantage. Use when the user wants to choose or re-evaluate a YouTube/TikTok/Reels niche, says "riset niche", "tentukan niche", "cari niche baru", or the video kit has no tracks yet. Validation of proposed tracks is handled by the video-portfolio skill.
---

# Video Niche Research

Menemukan niche yang membayar tinggi, masih punya ruang untuk pendatang baru, dan memberi kreator keunggulan yang tidak bisa ditiru channel AI generik. Hasilnya beberapa **usulan track** (niche + sudut) yang lalu divalidasi dengan data, bukan satu niche final yang dipilih berdasarkan riset saja.

## Mode kerja

- **Di dalam Video Content Kit** (ada `AGENTS.md` dan `hasil/STATE.md`): ikuti `instruksi/01-riset-niche.md` langkah demi langkah, pakai template di `instruksi/templates/`, tulis output ke `hasil/00-riset-niche/`, dan perbarui STATE.
- **Tanpa kit:** jalankan langkah yang sama, lalu tulis hasilnya sebagai file `analisa-niche.md` di folder kerja (atau di balasan bila tidak ada akses file).

## Langkah ringkas

1. **Profil kreator.** Kumpulkan keahlian, bukti yang bisa ditampilkan, batasan (rahasia kantor, wajah, suara), jam per minggu, dan bahasa. Tanyakan maksimal 4 pertanyaan bila ada yang kosong.
2. **10 sampai 15 kandidat spesifik**, minimal 3 di luar keahlian utama sebagai pembanding.
3. **Riset web per kandidat:** video 90 hari terakhir di atas 10 ribu view, 5 channel teratas, outlier dari channel di bawah 10 ribu subscriber, tingkat konten AI massal di hasil pencarian, tier RPM dan negara penonton, sponsor aktif, risiko kebijakan, kecocokan visual (diagram, kode, data), dan evergreen. Setiap angka diberi tautan. Kalau tidak bisa dicek, tulis `belum terverifikasi`.
4. **Skor dengan bobot:** keunggulan kreator 25%, nilai penonton 20%, ruang pendatang 20%, permintaan 15%, kecocokan produksi 10%, evergreen 5%, risiko kebijakan (dibalik) 5%. Skor 1 sampai 5 per kriteria, total diskalakan ke 0 sampai 100.
5. **Pecah 3 sampai 4 niche teratas menjadi 1 sampai 3 sudut** yang berbeda nyata (penonton, janji, atau format). Setiap niche + sudut adalah satu usulan track dengan hipotesis satu kalimat, alasan, pilar, 3 channel pembanding, outlier, 10 contoh judul dengan bukti milik kreator, estimasi jam per minggu, usulan channel, serta risiko dan mitigasi.
6. **Berhenti untuk keputusan kreator:** track mana yang masuk validasi (boleh lebih dari satu, sesuai kapasitas). Tampilkan rekomendasimu.
7. **Buat track** untuk semua usulan: yang dipilih menjadi `validasi`, sisanya `usulan` (cadangan). Isi TRACK.md, backlog minimal 20 ide berskor untuk track yang dipilih, dan tabel di STATE. Lanjutkan dengan skill `video-portfolio` untuk validasi V1.

## Aturan penilaian

- Nilai penonton ditentukan negara penonton dan niche. RPM penonton Indonesia jauh di bawah negara tier-1, jadi niche untuk audiens global berbahasa Inggris mendapat skor nilai penonton lebih tinggi. Cek angka terbaru di `instruksi/referensi/aturan-platform.md` (bila ada), atau verifikasi lewat web.
- Niche keuangan, kesehatan, dan hukum dengan narasi suara AI mendapat skor risiko kebijakan 1, karena YouTube tidak memonetisasi AI persona untuk topik sensitif.
- Niche yang 5 hasil teratasnya didominasi konten AI massal mendapat skor ruang pendatang rendah, kecuali kreator punya bukti yang jelas lebih kuat.
- Jangan merekomendasikan niche hanya karena RPM tinggi. Tanpa keunggulan kreator, hasilnya adalah slop.
