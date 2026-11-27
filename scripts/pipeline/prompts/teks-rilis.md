# Teks rilis {{track}} siklus {{siklus}}

Folder siklus: `hasil/tracks/{{trackdir}}/siklus/` yang berawalan `{{siklus}}-`.

Baca `03-script.json`, `03-naskah.md`, `06-rilis.json` (judul, deskripsi, dan nama item), `hasil/tracks/{{trackdir}}/TRACK.md`, dan `06-teks-rilis.json` atau `06-publish-manual.md` siklus sebelumnya sebagai contoh gaya. Terapkan skill `video-anti-slop` pada teks.

Tulis **hanya** `06-teks-rilis.json` di folder siklus, kuncinya nama item persis seperti di `06-rilis.json`:

```json
{
  "master": {
    "komentar": "satu pertanyaan untuk penonton, bahasa Inggris",
    "playlist": "nama playlist track bila ada, kalau tidak hapus bidang ini",
    "terjemahan": { "judul": "judul Indonesia, maksimal 100 karakter", "deskripsi": "terjemahan Indonesia dari deskripsi" },
    "facebook": { "deskripsi": "teks postingan Facebook", "komentar": "pertanyaan untuk penonton; di Short akhiri dengan Full video: {master}" }
  },
  "<nama Short>": { "komentar": "...", "terjemahan": { "judul": "...", "deskripsi": "..." }, "facebook": { "deskripsi": "...", "komentar": "... Full video: {master}" } }
}
```

Bidang opsional lain bila teks bawaan perlu diganti: `judul`, `deskripsi`, `tag` (dipisah koma).

Aturan Facebook: tanpa tautan YouTube (komentar Short menaut ke master Facebook lewat `{master}`), maksimal 3 tagar, tanpa ajakan "link di bio".

Aturan: terjemahan deskripsi memuat chapter dengan waktu yang sama dan semua tautan sumber tanpa diubah; tidak ada klaim baru di luar naskah; tidak ada tautan karangan atau penanda yang belum diisi (tautan video lain hanya bila sudah tayang dan tercatat di TRACK.md); URL tidak dipakai di komentar Short; tanpa karakter `<` atau `>`. Jangan mengubah `06-rilis.json`, jangan menyetujui, dan jangan mengirim apa pun.
