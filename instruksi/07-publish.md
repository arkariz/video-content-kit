# Langkah track: Publish

Tujuan: satu video master dan potongannya tayang di 4 platform dengan metadata yang sesuai masing-masing. **Selalu minta persetujuan eksplisit kreator sebelum mengirim apa pun ke platform**, di mode gate apa pun.

## Siapkan metadata (`06-publish.md`, template `publish.md`)

| Platform | File | Judul / caption | Catatan |
| --- | --- | --- | --- |
| YouTube | `Master16x9` + track audio ID | Judul terpilih, deskripsi dengan chapter, 3 sampai 5 tag | Upload track audio Indonesia lewat Languages di YouTube Studio |
| YouTube Shorts | `Short9x16` | Judul singkat + tautan ke master di komentar yang di-pin | Tanpa musik berlisensi YouTube (memotong pool Shorts) |
| Instagram Reels | `Short9x16` | Caption 1 sampai 2 kalimat + ajakan kirim ke teman | Di bawah 3 menit |
| TikTok | `ClipID9x16` | Caption dengan kata kunci pencarian | Sebut kata kunci di narasi |
| Facebook Reels | `ClipID9x16` atau `Short9x16` | Caption singkat | Boleh sama dengan platform lain selama karya sendiri |

## Label AI

Tentukan per platform dan tulis alasannya di `06-publish.md`:

- Konten realistis yang dibuat atau diubah AI wajib diberi label (YouTube "altered or synthetic", TikTok AIGC, Meta "AI info").
- Motion graphics, diagram, dan footage asli tidak perlu label.
- Suara clone milik kreator yang membacakan naskahnya sendiri berisiko rendah. Kalau ragu, beri label. YouTube menyatakan label tidak mengurangi jangkauan atau monetisasi.

## Kirim

- **Lewat API cross-post** (misalnya Upload-Post atau Ayrshare, key di `.env`): kirim setelah kreator menyetujui ringkasan final (file, judul, jadwal, label).
- **Manual**: siapkan semua file dan teks yang tinggal disalin, kreator yang mengunggah.

Catat URL tayang dan waktu publish di `06-publish.md`. Ubah status siklus di `TRACK.md` menjadi `tayang` dan isi tanggal tayang.

## Jadwal default

Master tayang Kamis. Shorts dan clip Indonesia Jumat sampai Minggu, satu per hari.
