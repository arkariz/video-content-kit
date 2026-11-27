# Langkah track: Analitik dan loop

Tujuan: mengubah data setiap video di satu track menjadi aturan yang dipakai siklus berikutnya di track itu. Analitik selalu per track, meskipun beberapa track berbagi channel.

## Kapan dijalankan

- **48 jam** setelah tayang: cek awal (hook dan CTR).
- **7 hari** setelah tayang: analisa lengkap.
- **Mingguan**: rekap semua video yang tayang, di `hasil/tracks/<ID>/analitik/YYYY-MM-DD.md` (template `analitik-mingguan.md`).

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

### Grafik retensi (long-form dan Shorts)

Langkahnya:
1. Ekspor data dari YouTube Studio: Analytics → video → Engagement → grafik Audience retention → ikon unduh → "Audience retention" (CSV).
2. Jalankan:

```
node scripts/pipeline/retensi.mjs --track <ID> --siklus <NNN> --csv <file.csv> [--cut <nama Short>]
```

Hasilnya `analitik/retensi-<siklus>-<tanggal>.md`, berisi:
- **hook leak:** berapa persen penonton hilang di pembukaan;
- **cliff:** titik penonton jatuh tajam, lengkap dengan kalimat narasi yang sedang diucapkan (diambil dari caption kita);
- **slide:** laju penurunan di bagian tengah.

Alat bawaannya adalah `retention.py` dari youtube-agent-skill (MIT, `scripts/vendor/`).

Tulis satu aturan yang bisa diuji di bagian akhir laporan itu, lalu bawa ke `learnings.md`. Ini menggantikan pencatatan titik drop secara manual pada tabel di atas.



1. Bandingkan dengan target dan dengan 3 video sebelumnya.
2. Hubungkan angka ke keputusan di naskah: hook yang dipakai, struktur, durasi, judul.
3. Tambahkan ke `hasil/tracks/<ID>/learnings.md` dalam bentuk aturan yang bisa diuji, dengan bukti. Contoh: "Hook 'hasil dulu' menahan 78% di 3 detik pertama vs 61% untuk hook pertanyaan (siklus 003 vs 004)."
4. Satu pelajaran butuh minimal 2 siklus pendukung sebelum dianggap pasti. Sampai itu terjadi, simpan di bagian "Aturan yang sedang diuji".
5. Perbarui skor di `hasil/tracks/<ID>/backlog.md` (naikkan topik yang terbukti diminati, turunkan yang tidak).

## Putuskan siklus berikutnya

- **Lanjut** (default): status siklus di `TRACK.md` menjadi `dianalisis`, `langkah_berikutnya: "siklus baru: riset viral"`.
- **Sesuaikan**: ubah pilar, format, atau durasi di dalam track. Catat alasannya di tabel Keputusan `TRACK.md`.
- **Tandai untuk review**: kalau 3 siklus berturut-turut berada di bawah target CTR **dan** retensi setelah hook dan judul divariasikan, atau satu sub-sudut jauh mengungguli yang lain, isi `menunggu_keputusan` di STATE dengan "review portfolio: <ID>". Keputusan scale, pivot, jeda, dan drop hanya diambil lewat `instruksi/09-review-portfolio.md`.
- Pelajaran yang juga muncul di track lain dicatat sebagai kandidat untuk `hasil/learnings-global.md`. Review portfolio yang memindahkannya.

## Verifikasi berkala

Setiap 90 hari (atau bila ada berita perubahan kebijakan), verifikasi ulang fakta di `instruksi/referensi/aturan-platform.md` dengan web search, lalu tulis hasilnya di `hasil/catatan-verifikasi.md`.
