# Langkah 6: Analitik dan loop

Tujuan: mengubah data setiap video menjadi aturan yang dipakai siklus berikutnya. Langkah ini yang membuat sistem makin baik setiap minggu.

## Kapan dijalankan

- **48 jam** setelah tayang: cek awal (hook dan CTR).
- **7 hari** setelah tayang: analisa lengkap.
- **Mingguan**: rekap semua video yang tayang, di `hasil/analitik/YYYY-MM-DD-mingguan.md` (template `analitik-mingguan.md`).

## Ambil data

Urutan prioritas: YouTube Analytics API kalau tersedia, lalu export CSV dari YouTube Studio / TikTok Studio / Meta Professional Dashboard yang diberikan kreator, lalu angka yang ditempel kreator di chat. Catat sumbernya.

| Metrik | Platform | Target awal |
| --- | --- | --- |
| Impressions CTR | YouTube long-form | 4% atau lebih (3% wajar untuk channel baru) |
| Average percentage viewed | YouTube long-form | 35% atau lebih |
| Titik drop terbesar di grafik retensi | YouTube long-form | Catat detik dan scene-nya |
| Viewed vs swiped away | YouTube Shorts | 70% ditonton atau lebih |
| Engaged views | YouTube Shorts | Tren naik |
| Completion rate, shares | TikTok | Tren naik |
| Watch time, sends per reach | Instagram Reels | Tren naik |
| Subscriber dari video | YouTube | Dicatat |

## Tulis pelajaran

1. Bandingkan dengan target dan dengan 3 video sebelumnya.
2. Hubungkan angka ke keputusan di naskah: hook yang dipakai, struktur, durasi, judul.
3. Tambahkan ke `hasil/learnings.md` dalam bentuk aturan yang bisa diuji, dengan bukti. Contoh: "Hook 'hasil dulu' menahan 78% di 3 detik pertama vs 61% untuk hook pertanyaan (siklus 003 vs 004)."
4. Satu pelajaran butuh minimal 2 siklus pendukung sebelum dianggap pasti. Sampai itu terjadi, simpan di bagian "Aturan yang sedang diuji".
5. Perbarui skor di `hasil/backlog.md` (naikkan topik yang terbukti diminati, turunkan yang tidak).

## Putuskan siklus berikutnya

- **Lanjut** (default): STATE `status: dianalisis`, `langkah_berikutnya: "siklus baru: riset viral"`.
- **Sesuaikan**: ubah pilar, format, atau durasi. Catat alasannya di `keputusan-niche.md` bagian "Perubahan".
- **Ajukan pivot niche**: hanya jika 3 siklus berturut-turut berada di bawah target CTR **dan** retensi, setelah hook dan judul sudah divariasikan. Isi `menunggu_keputusan` dengan data dan 2 opsi niche dari `analisa-niche.md`. Gate ini selalu berhenti.

## Verifikasi berkala

Setiap 90 hari (atau bila ada berita perubahan kebijakan), verifikasi ulang fakta di `instruksi/referensi/aturan-platform.md` dengan web search, lalu tulis hasilnya di `hasil/catatan-verifikasi.md`.
