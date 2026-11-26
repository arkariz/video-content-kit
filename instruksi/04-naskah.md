# Langkah track: Brief dan naskah

Tujuan: satu naskah yang ditulis untuk didengar, dengan satu ide per scene dan bukti milik kreator, lulus gate anti-slop sebelum diproduksi.

**Wajib dibaca dulu:** `instruksi/referensi/gaya-cerita.md` (acuan utama cerita), `instruksi/referensi/gaya-visual.md`, dan `hasil/learnings-global.md`. Naskah ditulis bersama `shots`: satu shot per kalimat yang menggambarkan isi kalimat itu.

## 2a. Brief

Tulis `02-brief.md` (template `brief.md`):

- **Janji video** dalam satu kalimat ("Setelah menonton, kamu bisa ...").
- **Penonton**: siapa, level, dan apa yang sudah mereka tahu.
- **Bukti milik kreator**: minimal satu (demo kode nyata, angka dari proyek yang boleh dibagi, pengalaman spesifik, screen recording).
- **Format**: durasi master, jumlah Shorts yang akan dipotong, versi Indonesia.
- **3 varian judul** dan **2 varian teks thumbnail** (maksimal 4 kata).
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

## 2c. Versi Bahasa Indonesia

- Lokalisasi, bukan terjemahan harfiah. Istilah teknis tetap bahasa Inggris (widget, state, rebuild).
- Durasi per scene harus mirip versi Inggris (selisih maksimal 15%), karena dipakai sebagai audio track di video yang sama.
- Jalankan cek pola slop Indonesia dari `skills/video-anti-slop/references/pola-slop-indonesia.md`.

## 2d. Gate anti-slop teks

Jalankan skill `video-anti-slop` lapisan **Teks** pada narasi Inggris dan Indonesia. Perbaiki sampai lulus, lalu sertakan skornya di `03-naskah.md`.

## Gate: kreator menyetujui naskah

Sajikan ringkasan: janji, hook, struktur scene, bukti milik kreator, skor anti-slop, checklist cerita (`gaya-cerita.md`), dan 3 judul. Kreator bisa menambah insight atau mengoreksi akurasi teknis. Setelah disetujui, ubah status siklus di `TRACK.md` menjadi `produksi`.
