# Video Content Kit

Paket instruksi untuk AI agent yang memproduksi konten video multi-platform dari riset niche sampai analitik, lalu mengulang siklusnya setiap minggu. Jalan di Claude Code, Codex, Cursor, Gemini CLI, Copilot, dan agent lain yang membaca `AGENTS.md` dan Agent Skills (`SKILL.md`).

## Mulai dalam 3 langkah

```bash
bash scripts/install-skills.sh      # pasang skill untuk semua agent
cp .env.example .env                # isi API key saat tiba tahap produksi
python3 scripts/check_kit.py        # pastikan struktur valid
```

Lalu buka folder ini di agent pilihanmu dan ketik **`mulai`**. Agent membaca `hasil/STATE.md` dan langsung tahu langkah berikutnya. Untuk kit yang baru, langkah itu adalah riset niche.

## Isi

| Folder | Isi | Siapa yang mengubah |
| --- | --- | --- |
| `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` | Titik masuk agent | Kreator |
| `instruksi/` | Instruksi per fase, referensi aturan platform, template | Kreator |
| `skills/` | `video-content-cycle`, `video-niche-research`, `video-anti-slop`, plus `humanizer` dan `stop-slop` (pihak ketiga, MIT) | Kreator |
| `hasil/` | Semua hasil kerja: analisa niche, riset viral, naskah, QA, analitik, pelajaran | Agent |
| `scripts/` | Pemasang skill dan validator | Kreator |

## Siklus

```
Penentuan niche (sekali, bisa diulang) ─► Riset viral ─► Naskah ─► Produksi ─► QA anti-slop ─► Publish ─► Analitik
                                              ▲                                                            │
                                              └──────────────── learnings.md + backlog.md ─────────────────┘
```

Agent berhenti di setiap titik keputusan (pilih niche, pilih sudut, setujui naskah, setujui klip, publish) kecuali kamu menyetel `mode_gate: otomatis` di STATE. Publish dan pemilihan niche tetap selalu menunggu persetujuanmu.

Panduan lengkap ada di `instruksi/00-cara-pakai.md`.
