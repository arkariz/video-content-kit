# Pipeline produksi otomatis

Satu perintah menjalankan satu siklus dari riset sampai paket review. Kreator hanya menonton, lalu menyetujui atau meminta revisi.

```
node --env-file=.env scripts/pipeline/run.mjs --track T01 --siklus 001        # jalankan / lanjutkan
node --env-file=.env scripts/pipeline/run.mjs --track T01 --siklus 001 --dry  # lihat status tahap
node scripts/pipeline/autofix.mjs --track T01 --siklus 001                    # perbaikan mekanis (salah ucap)
node --env-file=.env scripts/pipeline/approve.mjs --track T01 --siklus 001    # setujui (ketik SETUJU)
node scripts/pipeline/approve.mjs --track T01 --siklus 001 --revisi "catatan" # minta revisi
```

Gaya wajib: ilustrasi gerak penjelas R3 (`instruksi/referensi/gaya-visual.md`); QA menandai kritis bila scene siklus baru tidak punya `shots` (kecuali scene footage). Scene dengan `shots` dirender mesin R3 (bagian "Mesin R3" di bawah). T01-001 tetap dirender dengan mesin lama; T02-001 sudah diproduksi ulang dengan R3 3D.

## Tahap

| Tahap | Jenis | Hasil | Idempotent |
| --- | --- | --- | --- |
| riset-brief | LLM | `01-riset-viral.md`, `02-brief.md` | ya |
| naskah | LLM | `03-script.json`, `03-naskah.md` (sumber per klaim, stop-slop ≥ 35) | ya |
| visual | LLM | `anchor`, `cast`, dan `shots` per kalimat di `03-script.json`, `broll` untuk scene dunia nyata, dan komponen adegan `04-shots.tsx` | ya |
| kontrak | skrip | `build-visual.mjs --check`: shots, anchor, cast, dan komponen tiap scene di `04-shots.tsx` | ya |
| tts-en, caption-en | skrip | audio, caption (disamakan dengan naskah, hasil STT mentah disimpan) | ya |
| footage | skrip | pilih otomatis footage nyata berlisensi (skor tag + durasi, tanpa duplikat), unduh, catat lisensi | ya |
| adegan | skrip | scene footage jadi latar nyata | ya |
| render | skrip | Master16x9 + semua Shorts di `shorts_cuts` | ya |
| qa | skrip | `05-qa.auto.json/.md`; **kritis = berhenti** | selalu jalan |
| paket-review | skrip | `hasil/review/<ID>-<siklus>/index.html` | selalu jalan |

Tahap LLM berjalan lewat `claude -p` bila CLI `claude` ada di PATH. Kalau tidak, penggerak mencetak prompt (`scripts/pipeline/prompts/`) dan keluar dengan kode 3. Di sesi Claude Code, "lanjut T01" menjalankan tahap itu. Bagian `claude -p` belum teruji di mesin ini karena CLI belum terpasang.

## Mesin R3 (`shots`)

Kode bersama: `produksi/remotion/src/r3/` (`kit.tsx` primitif, `count.tsx` penghitung, `engine.tsx` waktu dan transisi, `three/` lapisan 3D, `registry.ts`, `cast/` pemeran per track). Logika waktu dan validasi di Node: `scripts/produksi/r3.mjs` (dipakai `build-visual.mjs`, `render.mjs`, dan `scripts/pipeline/qa-r3.mjs`). Contoh lengkap: `produksi/contoh-r3/T02-001-s06/` (s06 naskah T02-001 ditulis ulang; tidak mengubah render T02-001).

### Alur per siklus
1. Naskah: `anchor`, `cast`, dan `shots` per scene di `03-script.json` (kontrak di `produksi/CONTRACT.md`).
2. Agent menulis `04-shots.tsx` di folder siklus (di samping `03-script.json`): satu komponen React per shot, memakai primitif bersama. `show` berupa teks bebas, jadi gambarnya ditulis per siklus; mesin mengurus waktu, transisi, label, efek suara, dan Shorts.
3. `build-visual.mjs` memvalidasi kontrak dan memastikan tiap scene punya komponen. Scene R3 ditulis ke `04-stage.base.json` sebagai `{ "engine": "r3" }`.
4. Setelah TTS dan caption, `render.mjs` menghitung waktu tiap shot dan label dari caption per kata, lalu mengirimnya ke komposisi. `Video.tsx` memakai mesin R3 untuk scene yang punya `shots`.

### Waktu (dari `gaya-visual.md` bagian 3)
- Shot ke-n mulai di kata pertama kalimat `sentence`-nya; shot pertama mulai di awal scene; shot berakhir saat shot berikutnya mulai. Kalimat yang tidak punya shot sendiri ikut shot sebelumnya.
- Label membesar dengan pantulan (±0,2 dtk) tepat di awal `word`-nya, lalu mengecil hilang ±0,25 dtk sebelum transisi berikutnya.
- `iris` 0,45 dtk, lingkaran bergaris putih dari titik `from`, mempercepat, terbuka penuh di kata pertama. `wipe` 0,4 dtk, garis putih 8 px kiri ke kanan, berpusat di kata pertama. `push`: shot lama menyala lalu didorong masuk 0,3 dtk ke titik `from`, shot baru mulai 1,14× lalu mengendap 0,5 dtk. `cut` langsung. `hold` meneruskan gambar shot sebelumnya (isi `null` di `04-shots.tsx`), labelnya tetap muncul di katanya.
- Transisi shot pertama scene hanya berlaku bila scene sebelumnya juga R3 (mesin menggambar shot terakhir scene itu); selain itu potong langsung.
- Efek suara otomatis: `pop` di setiap label, `whoosh` di setiap transisi.

### Menulis `04-shots.tsx`
```tsx
import React from "react";
import { Backdrop, Frame, Layer, Pill, cast, defineShots, seg, shot, useLabel, useShot } from "@r3";
const { Komo } = cast.T02;

const Pertama: React.FC = () => {
  const { t, word } = useShot();             // t = detik sejak shot mulai
  const dingin = seg(t, word("air-conditioned"), word("air-conditioned") + 0.9);
  return <Frame><Backdrop stops={["#f08a3c", "#fde6b4"]} t={t} />{/* ... */}</Frame>;
};
const Kedua: React.FC = () => { const { t } = useShot(); const p = useLabel("ROOF RIDERS"); return <Frame>{/* ... */}<Pill x={900} y={400} text="ROOF RIDERS" p={p} /></Frame>; };

export default defineShots({
  s06: [shot(Pertama, { labels: { "FIRST AC TRAIN": [1100, 236] }, from: [1100, 520] }), shot(Kedua, { labels: "own" })],
});
```
- Kunci = id scene, isi = komponen per shot, urut sama dengan `shots`. Komponen polos (tanpa `shot(...)`) juga boleh.
- `useShot()`: `t` (detik sejak shot), `T` (detik sejak scene), `dur`, `word(teks, n)` (detik kata diucapkan, relatif shot), `label(teks)`, `faces`, `mood`, `bubble`, `vertical`, `shot` (kontrak).
- Opsi `shot(C, {...})`: `labels` (posisi tetap `[x, y, penunjuk]` per teks, atau `"own"` bila komponen menggambar label sendiri dengan `useLabel` + `Pill`, wajib untuk label pada benda bergerak; tanpa opsi, label dijajarkan di atas), `from` (titik asal iris/dorong), `focus` (x yang dijaga di tengah untuk Shorts 9:16), `drift: false` (komponen mengatur kamera sendiri), `bubble: "own"` / `bubbleAt`.
- Primitif (`kit.tsx`): `Frame`, `Backdrop` (gradien + glow + partikel), `Particles`, `Layer` (parallax, `cam {x,y,z}`), `Blur` (kedalaman), `Glow`, `GlowEdge`, `Sparks` (kejadian acak 3–9 frame), `Pill`, `Bubble`, `Footnote`, `FlatRect`, `Shadow`; waktu `seg`, `pop`, `out`, `keys`, `mix`; warna `shade`, `tint`, `fade`, `lerpColor`; acak deterministik `R`, `pick`.
- Penghitung (`count.tsx`) untuk `count`: `Dots` (proporsi), `Items` (jumlah satu per satu + angka), `Timeline` (garis waktu dan penanda), `Split` (dua panel, kiri bisa dicoret).
- Pemeran: `cast.T02` (Komo, Sepuh, Aturan, Cicak, figuran `Warga`, `Gerbong`, `Rel`, `Kabel`, `Pantograf`, `Matahari`, `Awan`, `Gedung`, `Kelapa`). Track baru: tambah `src/r3/cast/<ID>.tsx`, daftarkan di `cast/index.ts` dan `CAST` di `scripts/produksi/r3.mjs`.
- Aturan: koordinat logis 1920×1080. Semua gerak fungsi dari `t` (tanpa `Math.random`, state, atau efek). Ambil waktu kata lewat `word()`, jangan menulis detik dari caption. Gaya datar tanpa garis tinta. Tanpa lapisan 3D (di bawah), shot `three_d` ditulis versi 2D.
- Komponen yang belum ada dirender sebagai layar "ADEGAN BELUM ADA" dan ditandai kritis oleh QA G6.

### Cek sebelum produksi penuh
```
npm --prefix produksi/remotion run typecheck
node scripts/produksi/build-visual.mjs --track T02 --siklus 002 --check
node scripts/produksi/render.mjs --track T02 --siklus 002 --still s06            # satu gambar per shot (atau --at 1.2,5)
node scripts/produksi/render.mjs --track T02 --siklus 002 --scenes s05,s06       # render pendek, tidak dicatat di 04-assets.json
node scripts/pipeline/qa-r3.mjs --track T02 --siklus 002 [--scene s06]           # G1-G6
```
Naskah di luar siklus (contoh): tambah `--script produksi/contoh-r3/<nama>/03-script.json`; hasil ke `produksi/render/_contoh/<nama>/`. Registri hanya memindai `hasil/tracks/**/04-shots.tsx` dan `produksi/contoh-r3/**/04-shots.tsx`.

### Lapisan 3D (`r3/three`, 2026-11-26)
Adegan 3D berkedalaman (kamera orbit perspektif, cahaya dan bayangan kartun, kabut jarak, blur kedalaman) untuk shot R3. Opsional: hanya siklus yang `04-shots.tsx`-nya mengimpor `@r3/three`; `render.mjs` lalu menambahkan `--gl=angle`. Contoh lengkap: T02 siklus 001.
- Satu shot: `s3({ env, cam: [dari, ke], items: (a) => <>…</>, labels: [[teks, [x,y,z], penunjuk, warna]], vx, vd })`. `a.t` detik shot, `a.w("kata", cadangan)` detik kata.
- Koordinat: x kanan, y atas (tanah 0), z ke kamera; bidang utama kira-kira x -10..10. Kamera: `{ at, d, yaw, pitch, fov }`.
- `env`: jkt, hot, jktDay, jktGrey, tokyo, yard, yardDusk, yardNight, paper, grey, night, dusk, sea, map, mapStudio.
- Benda: `props.tsx` (kereta, rel, kapal, pabrik, angka yang bisa dihitung), `map.tsx` (peta jangkar), pemeran `cast/T02.tsx`.
- Shorts: `vx` = titik dunia di tengah, `vd` = pengali jarak kamera (default 1,75), jadi tidak sekadar dipotong.
- Thumbnail: `stage: { "engine": "r3", "module": "<path 04-shots.tsx>", "scene": "thumbA" }`.
- Cek tata letak memakai `render.mjs --still <scene>` (tambah `--comp Short9x16` untuk tegak).

### Belum ada
Musik latar terus-menerus. Shorts versi 2D masih memotong bagian tengah 16:9 di titik `focus`.

## Publish (Upload-Post)

Adaptor: `scripts/pipeline/publish.mjs`. Alur: `plan` menulis `06-publish.json` dan `06-publish.md` (judul, deskripsi dengan chapter dari `script.chapters`, tag, jadwal, label AI per platform; edit sebelum approve) → kreator menonton dan mengetik SETUJU di `approve.mjs` → `send` mengunggah terjadwal lewat `POST /api/upload` dengan `Idempotency-Key` sehingga tidak ganda. `status` mengambil status dan URL tayang.

```
node scripts/pipeline/publish.mjs plan   --track T01 --siklus 001
node --env-file=.env scripts/pipeline/publish.mjs send --track T01 --siklus 001 --dry   # tampilkan payload, tidak mengirim
node --env-file=.env scripts/pipeline/publish.mjs status --track T01 --siklus 001
```

**Profil per track.** Satu akun Upload-Post bisa berisi beberapa profil (satu profil = satu set channel). Tiap track menunjuk profilnya di frontmatter TRACK.md: `profil_publish: "nama-profil"`. Tidak ada profil default: track tanpa profil ditolak, dan profil yang dipakai dua track berbeda niche juga ditolak (track seniche boleh berbagi). Siklus yang sudah terkirim ke satu profil tidak bisa dikirim ulang ke profil lain tanpa diperiksa. Cek dengan `node --env-file=.env scripts/pipeline/publish.mjs akun`.

Isi `.env` (nama variabel saja): `UPLOADPOST_API_KEY` (`UPLOADPOST_PROFILE` tidak dipakai lagi). Akun, profil, dan koneksi channel dibuat kreator sendiri di Upload-Post. Aktif: YouTube, Instagram, Facebook (`platformAktif`); TikTok mati karena butuh paket berbayar. Master dikirim ke YouTube dan Facebook (video Page, `facebook_media_type: VIDEO`); Shorts ke YouTube, Instagram, dan Facebook (Reels). Master tidak dikirim ke Instagram (16:9, dan file bisa melewati 300 MB). `send` menolak jalan bila siklus belum disetujui. **Mode uji** (`send --test`, lalu `status --uji`) mengirim hanya Short pertama ke YouTube sebagai privat dan ke Facebook sebagai draf, tanpa jadwal dan tanpa Instagram/TikTok, sehingga tidak ada yang tampil publik (Instagram tidak punya mode privat atau draf lewat API ini). Facebook mengembalikan URL Reel walaupun berstatus draf (dikonfirmasi 2026-11-25). Hapus video uji di YouTube Studio dan draf Facebook setelah dicek. Label AI default konservatif (suara sintetis): `containsSyntheticMedia`, `is_aigc`, `is_ai_generated`. Teruji ke API sungguhan hanya lewat mode uji (YouTube privat dan Facebook draf, 2026-11-25); kirim terjadwal dan Instagram belum diuji. Yang tidak terdokumentasi di Upload-Post dan perlu dicek saat uji pertama: penanda Shorts di YouTube (setahu dokumennya tidak ada; Shorts dikenali dari rasio dan durasi), apakah `tags[]` atau `tags` yang diterima, dan nama bidang respons sukses. Track audio Indonesia tetap manual di YouTube Studio.

## Gate yang tidak bisa dilewati otomatis
- Rencana validasi terkunci, jadwal tayang, dan batas kapasitas dibaca dari file, tidak diubah.
- QA kritis menghentikan pipeline (kode 2). QA otomatis tidak pernah menyatakan LULUS final; ada pemeriksaan manual (dengar audio, tonton, cek fakta, thumbnail).
- Publish hanya setelah kreator mengetik `SETUJU` untuk siklus itu. Alat publish: Upload-Post (lihat bagian Publish).
- Pengecualian QA dari kreator dicatat di TRACK.md (`pengecualian_qa`) dan tetap tampil sebagai temuan.

## Yang dicek QA otomatis
Durasi ≥ 8:00 (jeda variabel: 0,65 dtk, 1,4 dtk sebelum re-hook/payoff/CTA), jarak re-hook, gaya R3 (G1 scene tanpa shots, G2 shot kurang dari kalimat, G3 shot tanpa show/motion, G4 label tidak di kalimatnya, G5 tanpa anchor, G6 kontrak atau komponen adegan bermasalah), footage ≤ ⅓ dan tidak lebih dari 2 scene berurutan, file dan lisensi footage, kelengkapan adegan, pola slop (em dash, kontras palsu, pembuka basa-basi, frasa slop ID), bubble yang mengulang narasi, jumlah sumber, salah ucap lewat transkrip balik, catatan suara, thumbnail, bukti kreator.

## Kebutuhan agar benar-benar tanpa tangan
1. CLI `claude` terpasang (tahap LLM), atau tetap pakai sesi Claude Code.
2. `PEXELS_API_KEY` (gratis). Pencarian Pixabay saja kurang relevan, sehingga footage baru 11% dari durasi dan 3 scene harus tetap kartun.
3. `YOUTUBE_API_KEY` untuk angka outlier dan analitik.
4. Paket ElevenLabs berbayar, dan catatan jenis suara di `04-assets.json` (`voice.type`).
5. Penjadwalan mingguan (launchd/cron atau scheduled task) yang memanggil `run.mjs` sesuai jadwal di `validasi/rencana.md`.
