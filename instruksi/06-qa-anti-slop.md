# Langkah track: QA anti-slop

Tujuan: memastikan video tidak terasa seperti konten AI massal. Ini penting untuk penonton, dan juga syarat monetisasi, karena YouTube tidak memonetisasi "inauthentic content" (generik, repetitif, atau berbasis template).

**Waktu: sebelum render penuh** (keputusan kreator 2026-11-27), setelah audio, caption, dan still. Gerak, irama, dan campuran musik tidak diperiksa di sini; kreator mengeceknya manual setelah render. `05-qa.md` memuat baris `Sidik isi:` (lihat `produksi/PIPELINE.md` bagian "Gate QA sebelum render"). Pada tabel di bawah, "Render master + Shorts" dibaca sebagai still per scene.

Jalankan skill `video-anti-slop` pada keempat lapisan, lalu tulis `05-qa.md` dengan template `qa-report.md`.

## Lapisan dan ambang lulus

| Lapisan | Yang diperiksa | Lulus bila |
| --- | --- | --- |
| Teks | Narasi EN + ID, judul, deskripsi | Skor stop-slop minimal 35/50, tanpa pola kritis dari humanizer |
| Visual | Render master + Shorts | Semua item wajib di checklist visual terpenuhi |
| Audio | Suara + caption | Tanpa salah ucap istilah teknis, caption cocok dengan naskah |
| Channel | Video ini dibandingkan 3 video sebelumnya | Lulus uji orisinalitas dan variasi template |

## Keputusan

- **LULUS**: semua lapisan lulus. Status siklus di `TRACK.md` menjadi `siap-publish`.
- **GAGAL**: tulis perbaikan spesifik per temuan, kembali ke langkah yang relevan (naskah atau produksi), lalu jalankan QA ulang. Mode `otomatis` tetap berhenti di sini dan melapor ke kreator.

## Uji orisinalitas (wajib dijawab di laporan)

1. Kalau channel lain memberi prompt yang sama ke AI, apakah mereka akan mendapat video yang hampir sama? Kalau ya, GAGAL.
2. Apa yang dipelajari penonton di sini yang tidak ada di 5 outlier riset?
