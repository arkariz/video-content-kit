# Pipeline produksi otomatis

Satu perintah menjalankan satu siklus dari riset sampai paket review. Kreator hanya menonton, lalu menyetujui atau meminta revisi.

```
node --env-file=.env scripts/pipeline/run.mjs --track T01 --siklus 001        # jalankan / lanjutkan
node --env-file=.env scripts/pipeline/run.mjs --track T01 --siklus 001 --dry  # lihat status tahap
node scripts/pipeline/autofix.mjs --track T01 --siklus 001                    # perbaikan mekanis (salah ucap)
node --env-file=.env scripts/pipeline/approve.mjs --track T01 --siklus 001    # setujui (ketik SETUJU)
node scripts/pipeline/approve.mjs --track T01 --siklus 001 --revisi "catatan" # minta revisi
```

## Tahap

| Tahap | Jenis | Hasil | Idempotent |
| --- | --- | --- | --- |
| riset-brief | LLM | `01-riset-viral.md`, `02-brief.md` | ya |
| naskah | LLM | `03-script.json`, `03-naskah.md` (sumber per klaim, stop-slop ≥ 35) | ya |
| visual | LLM | `04-visual-spec.json`, `04-stage.src.mjs` (→ `04-stage.base.json`), `04-broll-plan.json` | ya |
| tts-en, caption-en | skrip | audio, caption (disamakan dengan naskah, hasil STT mentah disimpan) | ya |
| footage | skrip | pilih otomatis footage nyata berlisensi (skor tag + durasi, tanpa duplikat), unduh, catat lisensi | ya |
| adegan | skrip | scene footage jadi latar nyata + satu komentator kartun | ya |
| render | skrip | Master16x9 + semua Shorts di `shorts_cuts` | ya |
| qa | skrip | `05-qa.auto.json/.md`; **kritis = berhenti** | selalu jalan |
| paket-review | skrip | `hasil/review/<ID>-<siklus>/index.html` | selalu jalan |

Tahap LLM berjalan lewat `claude -p` bila CLI `claude` ada di PATH. Kalau tidak, penggerak mencetak prompt (`scripts/pipeline/prompts/`) dan keluar dengan kode 3. Di sesi Claude Code, "lanjut T01" menjalankan tahap itu. Bagian `claude -p` belum teruji di mesin ini karena CLI belum terpasang.

## Publish (Upload-Post)

Adaptor: `scripts/pipeline/publish.mjs`. Alur: `plan` menulis `06-publish.json` dan `06-publish.md` (judul, deskripsi dengan chapter dari `script.chapters`, tag, jadwal, label AI per platform; edit sebelum approve) → kreator menonton dan mengetik SETUJU di `approve.mjs` → `send` mengunggah terjadwal lewat `POST /api/upload` dengan `Idempotency-Key` sehingga tidak ganda. `status` mengambil status dan URL tayang.

```
node scripts/pipeline/publish.mjs plan   --track T01 --siklus 001
node --env-file=.env scripts/pipeline/publish.mjs send --track T01 --siklus 001 --dry   # tampilkan payload, tidak mengirim
node --env-file=.env scripts/pipeline/publish.mjs status --track T01 --siklus 001
```

**Profil per track.** Satu akun Upload-Post bisa berisi beberapa profil (satu profil = satu set channel). Tiap track menunjuk profilnya di frontmatter TRACK.md: `profil_publish: "nama-profil"`. Tidak ada profil default: track tanpa profil ditolak, dan profil yang dipakai dua track berbeda niche juga ditolak (track seniche boleh berbagi). Siklus yang sudah terkirim ke satu profil tidak bisa dikirim ulang ke profil lain tanpa diperiksa. Cek dengan `node --env-file=.env scripts/pipeline/publish.mjs akun`.

Isi `.env` (nama variabel saja): `UPLOADPOST_API_KEY` (`UPLOADPOST_PROFILE` tidak dipakai lagi). Akun, profil, dan koneksi channel dibuat kreator sendiri di Upload-Post. Aktif: YouTube, Instagram, Facebook (`platformAktif`); TikTok mati karena butuh paket berbayar. `send` menolak jalan bila siklus belum disetujui. **Mode uji** (`send --test`, lalu `status --uji`) mengirim hanya Short pertama ke YouTube sebagai privat dan ke Facebook sebagai draf, tanpa jadwal dan tanpa Instagram/TikTok, sehingga tidak ada yang tampil publik (Instagram tidak punya mode privat atau draf lewat API ini). Facebook mengembalikan URL Reel walaupun berstatus draf (dikonfirmasi 2026-11-25). Hapus video uji di YouTube Studio dan draf Facebook setelah dicek. Label AI default konservatif (suara sintetis): `containsSyntheticMedia`, `is_aigc`, `is_ai_generated`. Teruji ke API sungguhan hanya lewat mode uji (YouTube privat dan Facebook draf, 2026-11-25); kirim terjadwal dan Instagram belum diuji. Yang tidak terdokumentasi di Upload-Post dan perlu dicek saat uji pertama: penanda Shorts di YouTube (setahu dokumennya tidak ada; Shorts dikenali dari rasio dan durasi), apakah `tags[]` atau `tags` yang diterima, dan nama bidang respons sukses. Track audio Indonesia tetap manual di YouTube Studio.

## Gate yang tidak bisa dilewati otomatis
- Rencana validasi terkunci, jadwal tayang, dan batas kapasitas dibaca dari file, tidak diubah.
- QA kritis menghentikan pipeline (kode 2). QA otomatis tidak pernah menyatakan LULUS final; ada pemeriksaan manual (dengar audio, tonton, cek fakta, thumbnail).
- Publish hanya setelah kreator mengetik `SETUJU` untuk siklus itu. Alat publish: Upload-Post (lihat bagian Publish).
- Pengecualian QA dari kreator dicatat di TRACK.md (`pengecualian_qa`) dan tetap tampil sebagai temuan.

## Yang dicek QA otomatis
Durasi ≥ 8:00 (jeda variabel: 0,65 dtk, 1,4 dtk sebelum re-hook/payoff/CTA), jarak re-hook, footage ≤ ⅓ dan tidak lebih dari 2 scene berurutan, file dan lisensi footage, kelengkapan adegan, pola slop (em dash, kontras palsu, pembuka basa-basi, frasa slop ID), bubble yang mengulang narasi, jumlah sumber, salah ucap lewat transkrip balik, catatan suara, thumbnail, bukti kreator.

## Kebutuhan agar benar-benar tanpa tangan
1. CLI `claude` terpasang (tahap LLM), atau tetap pakai sesi Claude Code.
2. `PEXELS_API_KEY` (gratis). Pencarian Pixabay saja kurang relevan, sehingga footage baru 11% dari durasi dan 3 scene harus tetap kartun.
3. `YOUTUBE_API_KEY` untuk angka outlier dan analitik.
4. Paket ElevenLabs berbayar, dan catatan jenis suara di `04-assets.json` (`voice.type`).
5. Penjadwalan mingguan (launchd/cron atau scheduled task) yang memanggil `run.mjs` sesuai jadwal di `validasi/rencana.md`.
