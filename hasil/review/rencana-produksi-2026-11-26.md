# Hasil produksi malam 2026-11-26

## Keputusan kreator (sesi ini)
- Semua branch digabung ke `main` (worktree `video-content-kit.worktrees/gta`). Tidak di-push; branch lama tidak dihapus.
- Naskah T01-002 dan T02-003 disetujui; T02-002 sudah disetujui sebelumnya.
- Sisa kredit ElevenLabs saat ditanya: 18.000.
- Klip tangan T01-002 diganti ilustrasi.
- T01 siklus 004 tidak disentuh (dikerjakan agen lain); dua commit barunya ikut digabung.
- Tambahan: video T02 tentang karhutla bila kuota cukup (jadi siklus 004; naskah belum dibaca kreator).
- Batas berhenti 06.00 WIB. Publish tidak termasuk.

## Hasil
Semua file di `produksi/render/<track>/<siklus>/` di worktree ini. Folder render **tidak masuk git**: jangan hapus worktree sebelum disalin.

| Video | Master | Shorts | Thumbnail | QA otomatis | Yang harus dicek |
| --- | --- | --- | --- | --- | --- |
| T02-002 GTA | 8:47 | 2 | 2 + 2 | lulus (1 sedang) | klaim bertanda di 03-naskah.md |
| T01-002 fee split | 8:06 | 2 | 2 + 2 | GAGAL: 1 kritis | s41 QRIS sengaja dibaca "kris" (transkrip: "CRIS"); dengarkan |
| T02-003 Jawa | 8:09 | 2 | 2 + 2 | lulus (1 sedang) | angka sensus dan transmigrasi |
| T02-004 karhutla | ±8:09 | 2 | 2 + 2 | lulus (3 sedang) | **wajib baca naskah dan cek fakta**; menyebut perusahaan dan orang |

Lembar unggah: `06-publish-manual.md` di tiap folder siklus. Halaman review: `hasil/review/<track>-<siklus>/index.html`.

## Belum dilakukan
- QA anti-slop manual dan menonton penuh dengan suara (yang diperiksa agen: gambar diam tiap shot, durasi, bingkai hitam, jeda senyap, transkrip balik).
- Track audio Indonesia.
- Publish ke platform mana pun.
- Gate "uji gaya" (learnings-global) tidak ditunggu karena produksi otomatis semalam.

## Catatan teknis
- Pustaka adegan baru `produksi/remotion/src/r3/soft/kit.tsx`; `render.mjs` kini menyalakan GPU (`--gl=angle`) untuk siklus yang memakainya.
- Render ulang: `bash scripts/produksi/render-semua.sh <track> <siklus>`; pratinjau semua shot: `produksi/remotion/stills-batch.mjs`.
- Musik latar dipakai ulang dari T01-004.
