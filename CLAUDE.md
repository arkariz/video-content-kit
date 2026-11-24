@AGENTS.md

## Khusus Claude Code

- Skill proyek ada di `skills/`. Jalankan `bash scripts/install-skills.sh` sekali (dan setiap kali `skills/` berubah) supaya dimuat dari `.claude/skills/`.
- **Satu langkah per sesi.** Setelah langkah selesai dan STATE diperbarui, sarankan kreator menjalankan `/clear`. STATE.md adalah memorinya, bukan riwayat chat.
- **Commit setelah setiap langkah** dengan format `siklus NNN: <langkah> <hasil>` (contoh `siklus 001: naskah disetujui`) atau `niche: <hasil>`. Jangan `git push` tanpa persetujuan.
- **Blok HANDOFF dari chat:** kalau kreator menempelkan blok yang diawali `HANDOFF → Claude Code`, jalankan isinya. Tulis file ke path yang disebut (isi di blok dipakai apa adanya), perbarui STATE, commit, lalu lanjut ke langkah berikutnya yang disebut di blok.
- `.env` tidak boleh dibaca (diblokir di `.claude/settings.json`). Skrip produksi membaca key dari environment saat runtime.
- Validasi sebelum commit: `python3 scripts/check_kit.py`, dan untuk naskah `python3 scripts/check_kit.py hasil/siklus/<NNN>/03-script.json`.
