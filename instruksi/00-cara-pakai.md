# Cara pakai kit ini

Kit ini dirancang supaya agent apa pun bisa langsung bekerja: buka folder, beri satu kalimat, dan agent tahu harus melakukan apa dari `hasil/STATE.md` dan `TRACK.md`.

## Konsep: portfolio track

Satu repo bisa menjalankan beberapa niche, atau beberapa sudut dari satu niche, sekaligus. Masing-masing disebut **track** dan punya progresnya sendiri:

| Tahap | Artinya | Yang terjadi |
| --- | --- | --- |
| `usulan` | Hasil riset niche, belum diuji | Disimpan sebagai cadangan |
| `validasi` | Sedang diuji | V1 riset (tanpa publish), lalu V2 pasar (6 Shorts + 2 long-form, kriteria dikunci di awal) |
| `aktif` | Lulus validasi | Siklus mingguan penuh |
| `jeda` | Ditahan karena prioritas atau kapasitas | Backlog disimpan, produksi berhenti |
| `drop` | Dihentikan berdasarkan data | Arsip + alasan, pelajarannya tetap dipakai |

Keputusan lanjut, scale, pivot, jeda, atau drop diambil di **review portfolio** setiap 2 minggu, dengan membandingkan semua track memakai metrik yang sama dan sesuai kapasitas jammu.

```
Riset niche ─► usulan T01..T0n ─► pilih ─► Validasi V1 ─► Validasi V2 ─► aktif ─► loop mingguan
                                               │               │             │
                                               ▼               ▼             ▼
                                           drop/pivot      drop/pivot    Review portfolio (2 mingguan):
                                                                         scale / lanjut / pivot / jeda / drop
```

## Setup sekali

1. Taruh folder ini di komputer sebagai repo git, supaya setiap perubahan hasil kerja tercatat.
2. Jalankan `bash scripts/install-skills.sh` untuk menyalin skill ke folder yang dibaca masing-masing agent.
3. Salin `.env.example` menjadi `.env`, lalu isi API key yang kamu punya. Yang wajib hanya untuk tahap produksi.
4. Isi `hasil/00-riset-niche/profil-kreator.md` (atau biarkan agent mewawancaraimu), termasuk jam per minggu.

## Memulai di berbagai agent

| Agent | Cara memulai |
| --- | --- |
| Claude Code | Buka folder, ketik `mulai` |
| Codex CLI / Cursor / Copilot / Gemini CLI | Buka folder (AGENTS.md dibaca otomatis), ketik `mulai` |
| claude.ai Project | Sambungkan repo GitHub ke project context, ketik `mulai`. Hasil yang perlu disimpan dikirim lewat blok HANDOFF |
| Agent lain | Prompt pertama: "Baca AGENTS.md dan ikuti urutan boot-nya." |

## Prompt yang bisa langsung dipakai

| Prompt | Hasil |
| --- | --- |
| `mulai` | Kerjakan langkah berikutnya untuk track fokus |
| `riset niche` | Riset kandidat, lalu usulan track baru |
| `track baru: <niche>, <sudut>` | Track dari idemu sendiri, langsung ke validasi V1 |
| `validasi T02` | Mulai atau lanjutkan validasi track itu |
| `lanjut T01` / `siklus baru T01` | Kerjakan track tertentu |
| `review portfolio` | Papan skor semua track dan usulan keputusan |
| `jeda T02` / `drop T02` / `pivot T02` | Ubah nasib track lewat gate |
| `cek slop <file>` | Gate anti-slop untuk file tertentu |
| `rekap` | Ringkasan portfolio dan pelajaran lintas track |

## Satu siklus

```
Riset viral → Brief (gate) → Naskah (gate) → Produksi (gate)
→ QA anti-slop (harus LULUS) → Publish (gate) → Analitik
→ learnings.md + backlog.md track itu → siklus berikutnya
```

Satu siklus = satu video master + potongannya. Track aktif menjalankan satu siklus per minggu. Kalau ada dua track aktif, kerjakan bergantian per sesi. Jangan mencampur dua track dalam satu sesi.

## Channel

Niche berbeda butuh channel atau akun berbeda. Sudut berbeda dari niche yang sama boleh satu channel.

## Bekerja di chat dan Claude Code sekaligus

Lihat `instruksi/10-handoff-claude-code.md`. Ringkasnya: repo adalah sumber kebenaran, chat mengirim hasil lewat blok HANDOFF (dengan ID track), dan Claude Code menulis, commit, lalu push. Klik "Sync now" di Project sebelum chat.

## Pemisahan folder

- `instruksi/`, `skills/`, `AGENTS.md`: aturan main. Agent hanya membaca.
- `hasil/`: semua output agent. Portfolio di `STATE.md`, per track di `tracks/<ID>/`, review di `review/`.
