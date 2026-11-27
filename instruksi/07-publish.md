# Langkah track: Publish

Tujuan: satu video master dan potongannya tayang dengan metadata yang sesuai tiap platform. **Selalu minta persetujuan eksplisit kreator sebelum mengirim apa pun ke platform**, di mode gate apa pun. Agent tidak pernah mengetik `SETUJU` atau `BUKA`.

Alat utama: **alat rilis** (`scripts/rilis/`, dashboard). Cara pakai dan batasannya ada di `produksi/PIPELINE.md` bagian "Alat rilis". Upload-Post (`scripts/pipeline/publish.mjs`) adalah jalur lama; satu siklus hanya memakai satu jalur.

## Pembagian per platform

| Platform | Konten | Cara | Catatan |
| --- | --- | --- | --- |
| YouTube | Master dan Shorts | Alat rilis | Video terkait (Short ke master), pin komentar, end screen, cards, A/B test, multi audio, dan mid-roll dikerjakan di Studio |
| Facebook Page | Master penuh dan Shorts (Reel, 3-90 detik) | Alat rilis | Short berkomentar tautan **master Facebook**; jadwal minimal 10 menit |
| Instagram Reels | Shorts saja | Manual | Tautan lewat bio atau stiker Story ke master YouTube; maksimal 5 hashtag |
| TikTok | Shorts saja | Manual | Sebut kata kunci di narasi dan caption |

## Alur

1. **Persiapan** (otomatis di akhir pipeline, atau `node scripts/rilis/siapkan.mjs --track <ID> --siklus <NNN>`): subtitle, `06-rilis.json`, lalu agent menulis `06-teks-rilis.json` (komentar, playlist, terjemahan; format di `scripts/pipeline/prompts/teks-rilis.md`).
2. **Periksa** di dashboard: tonton video, baca teks, isi jadwal. Jadwal kosong berarti tayang segera.
3. **Setujui** (kreator mengetik `SETUJU`), lalu **Kirim**. Alat menolak judul yang sudah ada di channel atau Page.
4. **Pasca-tayang**: penjadwal memposting komentar pertama. Pin dan tugas manual lain ada di checklist.
5. **Catat**: unggahan manual dicatat lewat "Catat yang sudah tayang"; status siklus disamakan lewat "Samakan status TRACK.md".

## Label AI

- Keputusan kreator 2026-11-27: "Penggunaan AI" YouTube dibiarkan kosong (alat tidak mengirimnya) dan `is_ai_generated` Facebook tidak dikirim.
- Konten realistis yang dibuat atau diubah AI tetap wajib diungkapkan sesuai kebijakan platform; isi di Studio atau Business Suite bila suatu video memuatnya. Motion graphics, diagram, dan footage asli umumnya tidak perlu label.

## Jadwal default

Alat mengisi tanggal dari `TRACK.md` dengan jam 10.00 (master), 12.00, dan 16.00 WIB. Ubah di dashboard sebelum menyetujui.
