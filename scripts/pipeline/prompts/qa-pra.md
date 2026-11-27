# QA anti-slop sebelum render: {{track}} siklus {{siklus}}

Folder siklus: `hasil/tracks/{{trackdir}}/siklus/` yang berawalan `{{siklus}}-`.

Jalankan skill `video-anti-slop` **sebelum render penuh**. Baca `instruksi/06-qa-anti-slop.md` untuk ambang lulus; urutan di file ini yang berlaku (sebelum render, bukan sesudahnya).

Bahan:
- Teks: `03-script.json`, `03-naskah.md` (narasi Inggris dan Indonesia, judul, teks thumbnail). Periksa juga bahwa kedua bahasa menyatakan hal yang sama (angka, nama, cakupan tuduhan).
- Fakta: cocokkan klaim angka, nama orang dan perusahaan, serta status hukum dengan `01-riset-viral.md` dan tautan sumber; klaim yang tidak bisa dibuka dicatat sebagai temuan.
- Visual: gambar diam di `produksi/render/{{track}}/{{siklus}}/stills/` (daftarnya di `04-still.json`).
- Audio: `05-qa.pra.json` (temuan otomatis) dan `produksi/captions/{{track}}/{{siklus}}/en.raw.json` terhadap `pronunciations`.
- Channel: bandingkan dengan 3 siklus sebelumnya di channel yang sama.

Gerak, irama, dan campuran musik **tidak diperiksa** di sini (keputusan kreator 2026-11-27: dicek manual oleh kreator setelah render). Tulis begitu di laporan; jangan dianggap lulus atau gagal.

Tulis `05-qa.md` di folder siklus memakai `instruksi/templates/qa-report.md`, dengan dua baris di bagian atas:

```
## Keputusan: LULUS
Sidik isi: <keluaran `node scripts/pipeline/qa-gate.mjs --track {{track}} --siklus {{siklus}} --sidik`>
```

Isi `LULUS` atau `GAGAL` saja. Satu temuan kritis = GAGAL. `DILEWATI` hanya boleh ditulis atas permintaan eksplisit kreator. Bila GAGAL, tulis perbaikan konkret per temuan dan berhenti; jangan mengubah naskah tanpa persetujuan kreator.
