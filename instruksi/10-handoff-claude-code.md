# Handoff antara chat (claude.ai Project) dan Claude Code

Prinsipnya: **repo adalah satu-satunya sumber kebenaran.** Chat dipakai untuk berpikir dan mereview, Claude Code untuk menulis dan mengeksekusi. Hasil tidak pernah disimpan di dua tempat yang bisa saling berbeda.

## Setup sekali (sekitar 15 menit)

1. Ekstrak kit, lalu jadikan repo git privat di GitHub:
   ```bash
   cd video-content-kit
   git init && git add . && git commit -m "kit: awal"
   gh repo create video-content-kit --private --source . --push
   ```
2. Pasang skill: `bash scripts/install-skills.sh`.
3. Di claude.ai, buka Project "Konten Video", lalu klik **+** di bagian knowledge, pilih **GitHub**, dan tambahkan repo itu. Pilih folder `instruksi/`, `hasil/`, `skills/`, serta file `AGENTS.md`.
4. Setelah repo tersambung, hapus dokumen `instruksi/` dan `hasil/` lama yang diunggah manual ke Project, supaya tidak ada dua versi.
5. Tempel isi `instruksi/PROJECT-INSTRUCTIONS.md` ke instruksi Project.

## Alur harian

| Kerjaan | Di mana | Kenapa |
| --- | --- | --- |
| Riset niche, riset viral, memilih sudut | Chat atau Claude Code | Keduanya bisa web search. Pakai chat kalau ingin berdiskusi, Claude Code kalau ingin hasilnya langsung tersimpan |
| Naskah dan review | Chat | Iterasi kata lebih nyaman |
| Produksi, render, publish | Claude Code | Butuh terminal, API key, dan file lokal |
| Analitik | Claude Code (CSV di repo) atau chat (angka ditempel) | Hasil akhirnya tetap harus masuk ke `hasil/` |

**Chat ke Claude Code:** chat mengakhiri hasilnya dengan satu blok `HANDOFF → Claude Code`. Salin blok itu, tempel ke Claude Code, dan Claude Code menulis file, memperbarui TRACK.md (dan STATE bila tahap track berubah), commit, lalu lanjut. Setiap blok menyebut satu track, atau `portfolio` untuk riset niche dan review.

**Claude Code ke chat:** Claude Code commit dan push, lalu kamu klik **Sync now** di Project sebelum memulai chat baru. Sinkronisasi GitHub di Project tidak otomatis.

## Supaya Claude Code efektif dan hemat

1. **Satu track dan satu langkah per sesi, lalu `/clear`.** STATE.md dan TRACK.md menyimpan posisi kerja, jadi riwayat chat panjang tidak diperlukan. Konteks kecil berarti lebih cepat, lebih murah, dan lebih fokus.
2. **Prompt pembuka cukup `mulai` atau `lanjut T02`.** CLAUDE.md mengimpor AGENTS.md, dan AGENTS.md menyuruh agent membaca STATE. Tidak perlu menjelaskan ulang konteks.
3. **Pilih model di awal sesi, jangan ganti di tengah.** Mengganti model di tengah sesi membuat seluruh percakapan dibaca ulang tanpa cache. Model yang lebih kuat untuk riset dan naskah, model yang lebih cepat untuk produksi dan langkah mekanis.
4. **Izin sudah disiapkan di `.claude/settings.json`:** perintah validasi, render Remotion, dan git lokal tidak perlu persetujuan berulang. `git push` tetap ditanyakan. `.env` diblokir dari pembacaan, jadi API key tidak pernah masuk ke konteks.
5. **Skill dimuat sesuai kebutuhan.** Hanya deskripsi skill yang selalu ada di konteks. Isi lengkapnya dimuat saat dipakai, jadi lima skill tidak membebani setiap sesi.
6. **Commit per langkah.** Riwayat git menjadi log kerja yang bisa di-rollback, dan Sync di Project selalu mendapat versi terbaru.
7. **Validasi sebelum commit:** `python3 scripts/check_kit.py` menangkap STATE yang rusak dan naskah yang tidak lengkap sebelum masuk ke produksi.

## Kalau sedang di luar komputer

Repo di GitHub juga bisa dibuka di Claude Code versi web (claude.ai/code) untuk riset, naskah, dan analitik. Produksi yang butuh API key dan render sebaiknya tetap di komputer lokal, kecuali environment cloud-nya sudah kamu isi dengan variabel API yang diperlukan.
