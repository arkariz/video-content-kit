# Langkah track: Brief dan naskah

Tujuan: satu naskah yang ditulis untuk didengar, dengan satu ide per scene dan bukti milik kreator, lulus gate anti-slop sebelum diproduksi.

**Wajib dibaca dulu:** `instruksi/referensi/gaya-cerita.md` (riset dan cerita), `instruksi/referensi/gaya-visual.md` (spesifikasi visual), `produksi/STYLE.md` (tampilan), dan `hasil/learnings-global.md`.

Urutan langkah:
1. **Riset fakta**: tabel klaim `C01…` di bagian "Riset fakta" `01-riset-viral.md` (`gaya-cerita.md` bagian 1).
2. **Brief** (2a).
3. **Naskah** dengan `shots` per kalimat (2b).
4. **Arah visual** per scene di `03-visual.json`, dan `"visual_spec": "03-visual.json"` di `03-script.json` (2b').
5. **Gate kesiapan visual** (`gaya-visual.md` bagian 7), versi Indonesia, anti-slop, lalu persetujuan kreator.

## 2a. Brief

Tulis `02-brief.md` (template `brief.md`):

- **Janji video** dalam satu kalimat ("Setelah menonton, kamu bisa ...").
- **Penonton**: siapa, level, dan apa yang sudah mereka tahu.
- **Bukti milik kreator**: minimal satu (demo kode nyata, angka dari proyek yang boleh dibagi, pengalaman spesifik, screen recording).
- **Format**: durasi master, jumlah Shorts yang akan dipotong, versi Indonesia.
- **3 varian judul** dan **2 varian teks thumbnail** (maksimal 4 kata).
- **Thumbnail tiap Short** (wajib, 1080x1920): isi `shorts_cuts[].thumbnail`, maksimal 5 kata (kontrak di `produksi/CONTRACT.md`).
- **Learnings yang diterapkan** dari `hasil/tracks/<ID>/learnings.md`.

## 2b. Naskah

Tulis `03-script.json` mengikuti `instruksi/templates/script.schema.json`, lalu `03-naskah.md` sebagai versi yang enak dibaca manusia.

Aturan menulis untuk telinga:

1. **Hook di scene pertama:** hasil akhir atau masalah langsung terlihat, maksimal 2 kalimat. Tanpa salam, tanpa "in today's video".
2. **Selesaikan janji hook sebelum detik 30** (long-form) atau detik 3 (Shorts).
3. **Satu ide per scene**, 1 sampai 3 kalimat narasi, 5 sampai 20 detik.
4. **Re-hook setiap 60 sampai 90 detik** di long-form: pertanyaan baru, twist, atau demo berikutnya.
5. **Kalimat pendek dan konkret.** Angka, nama API, nama file, dan baris kode, bukan kata sifat.
6. **Visual menjelaskan, narasi menambah.** Jangan membacakan apa yang sudah ada di layar.
7. **Penutup:** satu takeaway dan satu ajakan spesifik ke video berikutnya. Tanpa "semoga bermanfaat".
8. **Tandai potongan Shorts** di `shorts_cuts` (scene mana yang bisa berdiri sendiri, 20 sampai 45 detik).
9. **Istilah teknis** yang rawan salah ucap masuk ke `pronunciations`.

## 2b'. Arah visual per scene

Tulis `03-visual.json` (bentuk di `produksi/CONTRACT.md`, skema `$defs.visual` di `instruksi/templates/script.schema.json`): satu entri per scene dengan bidang A sampai I dari `gaya-visual.md` bagian 3. Subjek dan perilaku faktual merujuk id klaim. Tandai setiap subjek `literal`, `simplified`, atau `metaphor`. Pilih pola komposisi (`P01`–`P14`) dan perlakuan `2d`/`2.5d`/`3d`.

## 2c. Versi Bahasa Indonesia

- Lokalisasi, bukan terjemahan harfiah. Istilah teknis tetap bahasa Inggris (widget, state, rebuild).
- Durasi per scene harus mirip versi Inggris (selisih maksimal 15%), karena dipakai sebagai audio track di video yang sama.
- Jalankan cek pola slop Indonesia dari `skills/video-anti-slop/references/pola-slop-indonesia.md`.

## 2d. Gate anti-slop teks

Jalankan skill `video-anti-slop` lapisan **Teks** pada narasi Inggris dan Indonesia. Perbaiki sampai lulus, lalu sertakan skornya di `03-naskah.md`.

## Gate: kreator menyetujui naskah

Sajikan ringkasan: janji, hook, struktur scene, bukti milik kreator, skor anti-slop, checklist cerita (`gaya-cerita.md`), hasil gate kesiapan visual (scene yang masih `needs` atau berklaim `belum`), dan 3 judul. Kreator bisa menambah insight atau mengoreksi akurasi teknis. Setelah disetujui, ubah status siklus di `TRACK.md` menjadi `produksi`.
