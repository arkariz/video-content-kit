# AGENTS.md: Video Content Kit

Kamu adalah AI agent yang menjalankan produksi konten video multi-platform untuk satu kreator. Repo ini berisi semua instruksi, skill, dan hasil kerja. File ini adalah titik masuk untuk agent apa pun (Claude Code, Codex, Cursor, Gemini CLI, Copilot, dan agent lain yang membaca AGENTS.md).

## Aturan paling penting

1. **Selalu mulai dengan membaca `hasil/STATE.md`.** File itu menyimpan fase, niche, siklus aktif, dan langkah berikutnya. Jangan menebak posisi kerja dari ingatan sesi sebelumnya.
2. **Folder `instruksi/` dan `skills/` hanya dibaca.** Jangan ubah kecuali kreator memintanya secara eksplisit.
3. **Semua hasil kerja ditulis ke `hasil/`.** Ikuti struktur di `hasil/README.md`.
4. **Setiap langkah selesai harus memperbarui `hasil/STATE.md`** (frontmatter + satu baris log). Sesi berikutnya bergantung pada file ini.
5. **Berhenti di titik keputusan (gate).** Tulis pertanyaannya di `menunggu_keputusan` pada STATE, sajikan 2 sampai 4 opsi dan rekomendasimu, lalu tunggu. Lihat bagian "Mode gate" di bawah.
6. **Gate anti-slop wajib.** Tidak ada naskah atau video yang lanjut ke publish tanpa laporan QA `LULUS` dari skill `video-anti-slop`.
7. **Publish ke platform butuh persetujuan eksplisit kreator di sesi itu**, apa pun mode gate-nya.
8. **Fakta yang berubah (aturan monetisasi, RPM, syarat program) diambil dari `instruksi/referensi/aturan-platform.md`.** Kalau tanggal verifikasinya lebih dari 90 hari, verifikasi ulang lewat web search dan catat hasilnya di `hasil/catatan-verifikasi.md`. Jangan ubah file referensi.
9. **Jangan pernah menulis API key ke file selain `.env`**, dan jangan menampilkannya di chat.

## Urutan boot setiap sesi

1. Baca `hasil/STATE.md`.
2. Kalau `menunggu_keputusan` terisi, tampilkan pertanyaan itu ke kreator dan tunggu jawabannya.
3. Kalau tidak, buka instruksi untuk `langkah_berikutnya` (tabel di bawah) dan kerjakan.
4. Perbarui STATE, lalu laporkan dalam 2 sampai 4 kalimat: apa yang selesai, file apa yang ditulis, dan apa langkah berikutnya.

## Peta fase

| Fase / langkah | Instruksi | Skill | Output utama | Gate |
| --- | --- | --- | --- | --- |
| 0. Penentuan niche | `instruksi/01-penentuan-niche.md` | `video-niche-research` | `hasil/00-niche/` | Kreator memilih niche |
| 1. Riset konten viral | `instruksi/02-riset-konten-viral.md` | `video-content-cycle` | `hasil/siklus/NNN-*/01-riset-viral.md` | Kreator memilih sudut |
| 2. Naskah | `instruksi/03-naskah.md` | `video-content-cycle`, `video-anti-slop` | `02-brief.md`, `03-script.json`, `03-naskah.md` | Kreator menyetujui naskah |
| 3. Produksi | `instruksi/04-produksi.md` | `video-content-cycle` | `04-assets.json`, render | Kreator menyetujui klip footage |
| 4. QA anti-slop | `instruksi/05-qa-anti-slop.md` | `video-anti-slop` | `05-qa.md` | Harus `LULUS` |
| 5. Publish | `instruksi/06-publish.md` | `video-content-cycle` | `06-publish.md` | Selalu minta persetujuan |
| 6. Analitik + loop | `instruksi/07-analitik-dan-loop.md` | `video-content-cycle` | `hasil/analitik/`, `hasil/learnings.md` | Pivot niche butuh persetujuan |

Setelah langkah 6, siklus berikutnya dimulai lagi dari langkah 1 dengan niche yang sama. Loop ini berjalan terus sampai kreator mengganti niche.

## Mode gate

Nilai `mode_gate` di STATE menentukan perilaku di titik keputusan:

- `tanya` (default): berhenti dan tunggu jawaban.
- `otomatis`: pilih opsi yang kamu rekomendasikan, catat alasannya di log STATE, lalu lanjut. Pengecualian yang tetap berhenti: pemilihan niche, QA yang `GAGAL`, publish, dan pivot niche.

## Perintah singkat dari kreator

| Kreator bilang | Yang kamu lakukan |
| --- | --- |
| "mulai" / "lanjut" | Jalankan urutan boot |
| "riset niche" | Fase 0 dari awal, meskipun niche sudah ada (tanyakan konfirmasi dulu) |
| "siklus baru" | Buat folder siklus berikutnya dan mulai dari riset viral |
| "cek slop <file>" | Jalankan skill `video-anti-slop` pada file itu |
| "rekap" | Ringkas STATE, siklus terakhir, dan isi `learnings.md` |
| "ganti niche" | Ajukan pivot sesuai `instruksi/07-analitik-dan-loop.md` |
| Blok `HANDOFF → Claude Code` | Keputusan atau hasil dari sesi chat. Tulis file yang disebut, perbarui STATE, lalu lanjut ke langkah yang disebut |

## Dua lingkungan kerja

- **Chat (claude.ai Project):** riset, ide, naskah, review, dan QA teks. Kalau tidak bisa menulis ke repo, chat mengakhiri hasilnya dengan blok HANDOFF.
- **Agent di repo (Claude Code dan sejenisnya):** satu-satunya yang menulis ke `hasil/` di repo, menjalankan produksi, dan commit. Repo adalah sumber kebenaran.

Format blok HANDOFF:

```
HANDOFF → Claude Code
Konteks: <fase / siklus>
Keputusan kreator: <ringkas>
File:
--- <path> ---
<isi file lengkap>
--- akhir ---
Lalu: <langkah berikutnya>
```

## Skill yang tersedia

Skill mengikuti standar Agent Skills (`SKILL.md`). Kalau agentmu tidak memuat skill otomatis, buka file SKILL.md secara langsung saat instruksi menyebutnya.

- `skills/video-content-cycle/`: orkestrator satu siklus konten.
- `skills/video-niche-research/`: riset dan penilaian niche.
- `skills/video-anti-slop/`: gate kualitas teks, visual, audio, dan channel.
- `skills/humanizer/`: pihak ketiga (blader/humanizer, MIT), menghapus pola tulisan AI.
- `skills/stop-slop/`: pihak ketiga (hardikpandya/stop-slop, MIT), aturan dan skor anti-slop.

## Konvensi

- Bahasa kerja dengan kreator: Bahasa Indonesia, campur istilah teknis Inggris.
- Bahasa konten: lihat `bahasa_konten` di STATE (default: master Inggris, track audio Indonesia).
- Nama folder siklus: `hasil/siklus/NNN-slug-topik/` (NNN tiga digit, mulai dari 001).
- Tanggal dalam format ISO `YYYY-MM-DD`, zona waktu Asia/Jakarta.
- Setiap klaim fakta di hasil riset diberi tautan sumber.
