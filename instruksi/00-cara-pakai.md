# Cara pakai kit ini

Kit ini dirancang supaya agent apa pun bisa langsung bekerja: buka folder, beri satu kalimat, dan agent tahu harus melakukan apa dari `hasil/STATE.md`.

## Setup sekali

1. Taruh folder ini di komputer (sebaiknya sebagai repo git, supaya setiap perubahan hasil kerja tercatat).
2. Jalankan `bash scripts/install-skills.sh` untuk menyalin skill ke folder yang dibaca masing-masing agent (`.claude/skills`, `.agents/skills`, `.github/skills`, `.gemini/skills`).
3. Salin `.env.example` menjadi `.env`, lalu isi API key yang kamu punya. Yang wajib hanya untuk tahap produksi.
4. Isi `hasil/00-niche/profil-kreator.md` (atau biarkan agent mewawancaraimu).

## Memulai di berbagai agent

| Agent | Cara memulai |
| --- | --- |
| Claude Code | Buka folder, ketik `mulai` |
| Codex CLI / Cursor / Copilot / Gemini CLI | Buka folder (AGENTS.md dibaca otomatis), ketik `mulai` |
| Claude.ai Project atau chat biasa | Unggah `AGENTS.md`, `instruksi/`, dan `hasil/STATE.md`, lalu ketik `mulai`. Agent tanpa akses file harus menuliskan isi file hasil di balasan, dan kamu yang menyimpannya |
| Agent lain | Prompt pertama: "Baca AGENTS.md dan ikuti urutan boot-nya." |

## Prompt yang bisa langsung dipakai

- `mulai`: agent membaca STATE dan mengerjakan langkah berikutnya.
- `riset niche`: menjalankan fase penentuan niche dengan riset web.
- `siklus baru`: memulai satu siklus konten untuk niche aktif.
- `cek slop hasil/siklus/001-xxx/03-naskah.md`: menjalankan gate anti-slop pada file tertentu.
- `rekap`: ringkasan posisi kerja dan pelajaran terbaru.

## Alur besar

```
[Fase 0] Penentuan niche ──gate──> niche terkunci
                                     │
      ┌──────────────────────────────┘
      ▼
[Siklus] Riset viral → Brief (gate) → Naskah (gate) → Produksi (gate)
         → QA anti-slop (harus LULUS) → Publish (gate) → Analitik
         → learnings.md + backlog.md → siklus berikutnya
```

Satu siklus = satu video master + potongannya. Target ritme: satu siklus per minggu. Analitik siklus N bisa dikerjakan bersamaan dengan riset siklus N+1.

## Bekerja di chat dan Claude Code sekaligus

Lihat `instruksi/08-handoff-claude-code.md`. Ringkasnya: repo adalah sumber kebenaran, chat mengirim hasil lewat blok HANDOFF, dan Claude Code menulis, commit, lalu push. Klik "Sync now" di Project sebelum chat.

## Pemisahan folder

- `instruksi/`, `skills/`, `AGENTS.md`: aturan main. Agent hanya membaca.
- `hasil/`: semua output agent (analisa niche, riset viral, naskah, laporan QA, analitik).

Untuk mengulang semuanya dari nol dengan niche lain, cukup kosongkan `hasil/` (kecuali README) dan setel ulang STATE ke `fase: 0-niche`.
