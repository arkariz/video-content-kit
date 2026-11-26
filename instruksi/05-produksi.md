# Langkah track: Produksi

Tujuan: dari `03-script.json` menghasilkan suara, caption, visual, dan render semua format. Semua tahap membaca file data yang sama, jadi perubahan naskah cukup dilakukan di satu tempat.

**Gaya wajib:** ilustrasi gerak penjelas R3 (`instruksi/referensi/gaya-visual.md`), dijalankan lewat `scripts/pipeline/run.mjs`. Scene `shots` dirender mesin R3 (`produksi/PIPELINE.md`, bagian "Mesin R3").

## Prasyarat

- `.env` berisi `ELEVENLABS_API_KEY` dan `ELEVENLABS_VOICE_ID` (paket berbayar, karena paket gratis tidak boleh dipakai komersial). Opsional: `PEXELS_API_KEY`, `PIXABAY_API_KEY`.
- Node.js dan satu proyek Remotion bersama di `produksi/remotion/` untuk semua track. Komposisi membaca `script.json` dari track dan siklus yang sedang diproduksi, jadi gaya visual boleh beda per track lewat props. Kalau belum ada, buat dengan `npx create-video@latest`, lalu pasang skill Remotion sesuai dokumentasi resmi (https://www.remotion.dev/docs/ai/claude-code). Perintah instalasinya pernah berubah, jadi cek dokumentasinya dulu.
- Jangan pernah memanggil API ElevenLabs dari browser atau dari kode komposisi Remotion. Panggil dari skrip Node atau Python di terminal.

## 3a. Suara (ElevenLabs TTS)

1. Untuk setiap scene, panggil Text-to-Speech dengan `ELEVENLABS_VOICE_ID`. Pakai pronunciation dari `script.json` (alias atau ejaan fonetik) untuk istilah teknis.
2. Simpan ke `produksi/audio/<ID>/<siklus>/<lang>/scene-XX.mp3`.
3. Ukur durasi setiap file, lalu tulis ke `script.json` (`duration_ms` per scene per bahasa). Durasi audio menentukan durasi scene di Remotion.
4. Dengarkan sampel atau minta kreator mendengarkan 2 scene. Salah ucap istilah teknis adalah tanda slop yang paling cepat ketahuan.

## 3b. Caption (ElevenLabs Speech-to-Text)

1. Kirim audio gabungan ke Speech-to-Text dengan `timestamps_granularity: "word"`.
2. Konversi dengan `elevenLabsTranscriptToCaptions()` dari `@remotion/elevenlabs`, lalu simpan ke `produksi/captions/<ID>/<siklus>/<lang>.json`.
3. Bandingkan dengan naskah, lalu perbaiki kata yang salah (terutama istilah teknis).

## 3c. Footage B-roll

1. Dari `broll_keywords` di setiap scene, ambil 3 sampai 5 kandidat dari API Pexels dan Pixabay. Utamakan klip tanpa wajah yang jelas.
2. Buat halaman pratinjau sederhana (`produksi/preview/<ID>-<siklus>.html` berisi thumbnail + tautan) untuk kreator.
3. **Gate:** kreator memilih klip. Di mode `otomatis`, pilih klip yang paling relevan dan tidak generik.
4. Unduh klip terpilih, lalu catat di `04-assets.json`: URL sumber, ID klip, lisensi, tanggal unduh, dan scene yang memakainya.
5. Batas: footage stok maksimal sekitar sepertiga dari total durasi. Sisanya visual Remotion dan bukti milik kreator.

## 3d. Visual Remotion

Komposisi standar (semua membaca `script.json` + `04-assets.json` + captions):

| ID komposisi | Rasio | Isi |
| --- | --- | --- |
| `Master16x9` | 1920x1080 | Video penuh, audio Inggris |
| `Short9x16` | 1080x1920 | Satu `shorts_cut`, audio Inggris, caption besar |
| `ClipID9x16` | 1080x1920 | Satu `shorts_cut`, audio Indonesia, caption Indonesia |
| `Thumbnail` | 1280x720 | Still frame untuk 2 varian teks thumbnail |

Aturan visual (selengkapnya `instruksi/referensi/gaya-visual.md`):

- Layout 9:16 dirancang ulang, bukan di-crop dari 16:9.
- Kode tampil dari file sumber nyata, bukan diketik ulang manual (supaya tidak ada typo atau kode palsu).
- Variasikan template: jangan pakai layout, warna, dan transisi yang persis sama 3 video berturut-turut.
- Caption dibakar ke video, ukuran terbaca di HP.

## 3e. Render

Render semua komposisi ke `produksi/render/<ID>/<siklus>/`. Catat nama file di `04-assets.json`. Lanjut ke `instruksi/06-qa-anti-slop.md`, status siklus di `TRACK.md` menjadi `qa`.
