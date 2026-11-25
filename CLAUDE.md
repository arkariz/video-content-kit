@AGENTS.md

## Khusus Claude Code

- **Gaya wajib diorama 2.5D** (lihat AGENTS.md): baca `instruksi/referensi/gaya-diorama.md` dan `hasil/learnings-global.md` sebelum brief, naskah, atau produksi.

- Skill proyek ada di `skills/`. Jalankan `bash scripts/install-skills.sh` sekali (dan setiap kali `skills/` berubah) supaya dimuat dari `.claude/skills/`.
- **Satu track dan satu langkah per sesi.** Setelah langkah selesai dan TRACK.md/STATE diperbarui, sarankan kreator menjalankan `/clear`. STATE.md adalah memorinya, bukan riwayat chat.
- **Commit setelah setiap langkah** dengan format `T01 siklus NNN: <langkah> <hasil>` (contoh `T01 siklus 001: naskah disetujui`), `T02 validasi: <hasil>`, atau `portfolio: <hasil>`. Jangan `git push` tanpa persetujuan.
- **Blok HANDOFF dari chat:** kalau kreator menempelkan blok yang diawali `HANDOFF → Claude Code`, jalankan isinya. Tulis file ke path yang disebut (isi di blok dipakai apa adanya), perbarui TRACK.md (dan STATE bila tahap track berubah), commit, lalu lanjut ke langkah berikutnya yang disebut di blok.
- `.env` tidak boleh dibaca (diblokir di `.claude/settings.json`). Skrip produksi membaca key dari environment saat runtime.
- Validasi sebelum commit: `python3 scripts/check_kit.py`, dan untuk naskah `python3 scripts/check_kit.py hasil/tracks/<ID>/siklus/<NNN>/03-script.json`.
- **Produksi otomatis:** langkah 05 sampai 07 dijalankan `scripts/pipeline/run.mjs` (lihat bagian "Produksi otomatis" di AGENTS.md dan `produksi/PIPELINE.md`). Render dan audio memakan waktu; jalankan di latar belakang dan jangan menjalankan dua render track yang sama bersamaan (file props bersama). `python3.12` dipakai untuk `check_kit.py` bila `python3` bawaan terlalu lama.

