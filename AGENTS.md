# AGENTS.md: Video Content Kit

Kamu adalah AI agent yang menjalankan produksi konten video multi-platform untuk satu kreator. Repo ini berisi semua instruksi, skill, dan hasil kerja. File ini adalah titik masuk untuk agent apa pun (Claude Code, Codex, Cursor, Gemini CLI, Copilot, dan agent lain yang membaca AGENTS.md).

## Model kerja: portfolio track

Satu repo menampung beberapa **track**. Satu track = satu niche + satu sudut, misalnya `T01` "Flutter performance untuk app production" dan `T02` "AI tools untuk mobile developer". Setiap track punya status, siklus, backlog, learnings, dan analitiknya sendiri di `hasil/tracks/<ID>/`. Track bisa berjalan paralel, dijeda, atau di-drop.

```
riset niche ─► usulan track ─► validasi (V1 riset, V2 pasar) ─► aktif ⇄ jeda
                                     │                              │
                                     └──► drop / pivot ◄────────────┘ (lewat review portfolio)
```

## Aturan paling penting

1. **Selalu mulai dengan membaca `hasil/STATE.md`** (portfolio), lalu `hasil/tracks/<ID>/TRACK.md` untuk track yang dikerjakan. Jangan menebak posisi kerja dari ingatan sesi sebelumnya.
2. **Satu sesi mengerjakan satu track.** Sebut ID track di awal setiap laporan. Jangan mencampur file atau pelajaran antar track, kecuali lewat `hasil/learnings-global.md`.
3. **Folder `instruksi/` dan `skills/` hanya dibaca.** Jangan ubah kecuali kreator memintanya secara eksplisit.
4. **Semua hasil kerja ditulis ke `hasil/`.** Ikuti struktur di `hasil/README.md`.
5. **Setiap langkah selesai harus memperbarui `TRACK.md`** (frontmatter, tabel siklus, satu baris log). Kalau tahap track berubah, perbarui juga tabel Track dan log di `STATE.md`.
6. **Berhenti di titik keputusan (gate).** Tulis pertanyaannya di `menunggu_keputusan` (di TRACK.md untuk keputusan track, di STATE.md untuk keputusan portfolio), sajikan 2 sampai 4 opsi dan rekomendasimu, lalu tunggu.
7. **Kriteria validasi dikunci sebelum data masuk.** Jangan mengubah `validasi/rencana.md` setelah konten uji pertama tayang.
8. **Hormati kapasitas.** Jangan menaikkan track ke `validasi` atau `aktif` kalau melampaui `batas_track_*` atau `kapasitas_jam_per_minggu` di STATE. Ajukan dulu apa yang harus dijeda.
9. **Gate anti-slop wajib.** Tidak ada naskah atau video yang lanjut ke publish tanpa laporan QA `LULUS` dari skill `video-anti-slop`.
10. **Publish ke platform butuh persetujuan eksplisit kreator di sesi itu**, apa pun mode gate-nya.
11. **Fakta yang berubah (aturan monetisasi, RPM, syarat program) diambil dari `instruksi/referensi/aturan-platform.md`.** Kalau tanggal verifikasinya lebih dari 90 hari, verifikasi ulang lewat web search dan catat hasilnya di `hasil/catatan-verifikasi.md`.
12. **Jangan pernah menulis API key ke file selain `.env`**, dan jangan menampilkannya di chat.

## Urutan boot setiap sesi

1. Baca `hasil/STATE.md`. Kalau `menunggu_keputusan` portfolio terisi, tampilkan dan tunggu jawaban.
2. Tentukan track: yang disebut kreator, lalu `track_fokus`, lalu track `aktif` atau `validasi` yang langkahnya paling lama tertunda. Kalau belum ada track, ikuti `langkah_berikutnya` di STATE (biasanya riset niche).
3. Baca `TRACK.md` track itu. Kalau `menunggu_keputusan` terisi, tampilkan dan tunggu.
4. Kerjakan `langkah_berikutnya` track itu dengan instruksi di tabel bawah.
5. Perbarui TRACK.md (dan STATE bila tahap berubah). Laporkan dalam 2 sampai 4 kalimat: track, apa yang selesai, file yang ditulis, dan langkah berikutnya.
6. Kalau `review_portfolio_berikutnya` sudah lewat, ingatkan kreator di akhir laporan.

## Peta langkah

| Langkah | Lingkup | Instruksi | Skill | Output utama | Gate |
| --- | --- | --- | --- | --- | --- |
| Riset niche | Portfolio | `instruksi/01-riset-niche.md` | `video-niche-research` | `hasil/00-riset-niche/`, track `usulan` | Kreator memilih track yang divalidasi |
| Validasi niche (V1 riset, V2 pasar) | Track | `instruksi/02-validasi-niche.md` | `video-portfolio` | `tracks/<ID>/validasi/` | Lulus/gagal sesuai kriteria terkunci |
| Riset konten viral | Track | `instruksi/03-riset-konten-viral.md` | `video-content-cycle` | `siklus/NNN-*/01-riset-viral.md` | Memilih sudut video |
| Naskah | Track | `instruksi/04-naskah.md` | `video-content-cycle`, `video-anti-slop` | `02-brief.md`, `03-script.json`, `03-naskah.md` | Menyetujui naskah |
| QA anti-slop (sebelum render penuh) | Track | `instruksi/06-qa-anti-slop.md` | `video-anti-slop` | `05-qa.md` | Harus `LULUS` sebelum render |
| Produksi (render) | Track | `instruksi/05-produksi.md`, dijalankan lewat pipeline (bagian Produksi otomatis) | `video-content-cycle` | `04-assets.json`, render | Menyetujui klip footage |
| Publish | Track | `instruksi/07-publish.md` | `video-content-cycle` | `06-rilis.json` (alat rilis) | Selalu minta persetujuan |
| Analitik + loop | Track | `instruksi/08-analitik-dan-loop.md` | `video-content-cycle` | `tracks/<ID>/analitik/`, `learnings.md` | Tidak ada (keputusan besar lewat review) |
| Review portfolio | Portfolio | `instruksi/09-review-portfolio.md` | `video-portfolio` | `hasil/review/` | Kreator memutuskan per track |

Saat validasi V2, track menjalankan langkah riset viral sampai analitik dengan paket uji yang lebih ringan (lihat `02-validasi-niche.md`). Setelah track `aktif`, loop riset viral → analitik berulang setiap minggu sampai review portfolio memutuskan lain.

## Gaya visual wajib: ilustrasi gerak penjelas (R3)

Berlaku untuk **semua track dan semua siklus**, untuk agent chat maupun agent di repo (keputusan kreator 2026-11-26, menggantikan diorama 2.5D). Sebelum menulis brief, naskah, spec visual, atau produksi, **baca dan terapkan**:

1. `instruksi/referensi/gaya-cerita.md`: riset subjek (tabel klaim) dan acuan utama cerita untuk semua naskah (keputusan kreator 2026-11-26).
2. `instruksi/referensi/gaya-visual.md`: satu kalimat satu gambar, spesifikasi scene A-I (`03-visual.json`), pola komposisi, gate kesiapan visual.
3. `produksi/STYLE.md`: Visual Style Bible (bentuk, warna, kedalaman, tipografi, palet dan pemeran per track). Kamera, gerak, transisi, dan 2D/2.5D/3D di `produksi/PIPELINE.md` bagian "Mesin R3".
4. `hasil/learnings-global.md`: aturan agar isi tidak padat dan prosesnya terlihat.

Naskah siklus baru tanpa `shots` per kalimat tidak boleh lanjut ke produksi; QA otomatis menandainya kritis. T01 siklus 001 (mesin lama) dan T02 siklus 001 (R3 3D, masih terlihat kaku) tidak dijadikan acuan. Lapisan 3D (`@remotion/three`) disetujui kreator dan sudah dibangun di `produksi/remotion/src/r3/three` (opsional per siklus). Scene dengan `shots` dirender mesin R3 (`produksi/remotion/src/r3`); gambar tiap shot ditulis agent repo sebagai komponen di `04-shots.tsx` folder siklus (cara di `produksi/PIPELINE.md`, bagian "Mesin R3").

## Mode gate

Nilai `mode_gate` di STATE berlaku untuk semua track:

- `tanya` (default): berhenti dan tunggu jawaban.
- `otomatis`: pilih opsi yang kamu rekomendasikan, catat alasannya di log, lalu lanjut. Pengecualian yang tetap berhenti: memilih track untuk validasi, keputusan hasil validasi, QA yang `GAGAL`, publish, dan semua keputusan review portfolio.

## Produksi otomatis (langkah 05 sampai 07)

Langkah riset sampai naskah (00 sampai 04) bisa dikerjakan di chat Claude Project dan masuk lewat blok HANDOFF. Langkah 05 sampai 07 dijalankan pipeline Node yang tidak terikat ke satu agent atau track:

```
node --env-file=.env scripts/pipeline/run.mjs --track <ID> --siklus <NNN> [--dry]
```

- Syarat input: `01-riset-viral.md`, `02-brief.md`, `03-script.json` (dengan bidang visual sesuai `produksi/CONTRACT.md`), `03-naskah.md`. Pipeline memvalidasi kontrak, lalu TTS, caption, footage, render, QA otomatis, dan paket review di `hasil/review/`.
- Dokumentasi: `produksi/PIPELINE.md` (tahap, gate, kebutuhan), `produksi/CONTRACT.md` (kontrak visual), `produksi/STYLE.md` (bahasa bentuk, palet, pemeran).
- **QA anti-slop dijalankan sebelum render penuh** (keputusan kreator 2026-11-27, mengganti urutan di `instruksi/05` dan `06`): setelah audio, caption, dan still; `run.mjs` tidak merender sebelum `05-qa.md` `LULUS` untuk isi yang sekarang. Gerak, irama, dan campuran musik tidak diperiksa gate ini; kreator mengeceknya manual setelah render.
- Pipeline berhenti pada QA kritis (kode 2), pada tahap LLM yang file-nya belum ada (kode 3), dan menunggu kreator. **QA otomatis tidak pernah menyatakan LULUS final**; pemeriksaan manual tetap wajib. Perbaikan mekanis: `scripts/pipeline/autofix.mjs`.
- Publish hanya lewat dua jalur, masing-masing setelah kreator mengetik SETUJU untuk siklus itu: `scripts/pipeline/approve.mjs` (Upload-Post) atau alat rilis `scripts/rilis/` (dashboard atau `rilis.mjs setuju`, YouTube dan Facebook; lihat `produksi/PIPELINE.md` bagian "Alat rilis"). Agent tidak boleh mengetik atau mengisi SETUJU maupun BUKA. Satu siklus hanya memakai satu jalur. Jangan memanggil API platform dengan jalur lain.
- Mesin visual dipakai bersama semua track: ubah komponen bersama (`produksi/remotion/src`) hanya di sesi terpisah dan jangan merusak track lain.
- Pengecualian QA dari kreator ditulis di TRACK.md (`pengecualian_qa`) dan tetap muncul sebagai temuan.

## Perintah singkat dari kreator

| Kreator bilang | Yang kamu lakukan |
| --- | --- |
| "mulai" / "lanjut" | Jalankan urutan boot |
| "lanjut T02" | Urutan boot untuk track T02 |
| "riset niche" | Riset niche baru. Hasilnya track `usulan` tambahan, track lama tidak berubah |
| "track baru: <niche>, <sudut>" | Buat track `usulan` dari ide kreator, lalu mulai validasi V1 |
| "validasi T03" | Mulai atau lanjutkan validasi track itu |
| "siklus baru T01" | Buat folder siklus berikutnya di T01 dan mulai dari riset viral |
| "review portfolio" | Jalankan `instruksi/09-review-portfolio.md` |
| "jeda T02" / "drop T02" | Ajukan keputusan lewat gate, lalu catat di TRACK.md dan STATE |
| "pivot T02" | Buat track baru dengan sudut lain (`asal: pivot-dari:T02`), lalu tanyakan nasib T02 |
| "cek slop <file>" | Jalankan skill `video-anti-slop` pada file itu |
| "rekap" | Ringkas tabel portfolio, status tiap track, dan isi `learnings-global.md` |
| Blok `HANDOFF → Claude Code` | Keputusan atau hasil dari sesi chat. Tulis file yang disebut, perbarui TRACK/STATE, lalu lanjut ke langkah yang disebut |

## Channel dan track

- **Niche berbeda = channel/akun berbeda.** Mencampur niche di satu channel membingungkan algoritma dan penonton.
- **Sudut berbeda di niche yang sama boleh satu channel**, dibedakan lewat pilar atau seri. Tulis nama channel di `channel` pada TRACK.md.
- Analitik selalu dipisah per track, meskipun channelnya sama (filter per video).

## Dua lingkungan kerja

- **Chat (claude.ai Project):** riset, validasi V1, ide, naskah, review, QA teks, dan review portfolio dari angka yang ditempel. Kalau tidak bisa menulis ke repo, chat mengakhiri hasilnya dengan blok HANDOFF.
- **Agent di repo (Claude Code dan sejenisnya):** satu-satunya yang menulis ke `hasil/` di repo, menjalankan produksi, dan commit. Repo adalah sumber kebenaran.

Format blok HANDOFF:

```
HANDOFF → Claude Code
Track: <ID atau "portfolio">
Konteks: <langkah / siklus>
Keputusan kreator: <ringkas>
File:
--- <path> ---
<isi file lengkap>
--- akhir ---
Lalu: <langkah berikutnya>
```

## Skill yang tersedia

Skill mengikuti standar Agent Skills (`SKILL.md`). Kalau agentmu tidak memuat skill otomatis, buka file SKILL.md secara langsung saat instruksi menyebutnya.

- `skills/video-portfolio/`: membuat track, validasi niche, kapasitas, dan review portfolio.
- `skills/video-content-cycle/`: orkestrator satu siklus konten di satu track.
- `skills/video-niche-research/`: riset dan penilaian niche, menghasilkan usulan track.
- `skills/video-anti-slop/`: gate kualitas teks, visual, audio, dan channel.
- `skills/humanizer/`: pihak ketiga (blader/humanizer, MIT), menghapus pola tulisan AI.
- `skills/stop-slop/`: pihak ketiga (hardikpandya/stop-slop, MIT), aturan dan skor anti-slop.

## Konvensi

- Bahasa kerja dengan kreator: Bahasa Indonesia, campur istilah teknis Inggris.
- Bahasa konten: lihat `bahasa_konten` di TRACK.md (default: master Inggris, track audio Indonesia).
- ID track: `T` + dua digit (`T01`), tidak pernah dipakai ulang. Folder: `hasil/tracks/T01-slug/`.
- Folder siklus: `hasil/tracks/<ID>/siklus/NNN-slug-topik/` (NNN tiga digit, dihitung per track, mulai dari 001).
- Tanggal dalam format ISO `YYYY-MM-DD`, zona waktu Asia/Jakarta.
- Setiap klaim fakta di hasil riset diberi tautan sumber.
