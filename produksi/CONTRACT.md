# Kontrak visual di `03-script.json` (untuk Claude Project dan agent mana pun)

Gaya wajib: R3, ilustrasi gerak penjelas (`instruksi/referensi/gaya-visual.md`). Naskah (instruksi 04) menulis juga visualnya, sehingga tahap 05 sampai 07 berjalan tanpa LLM. Skema: `instruksi/templates/script.schema.json`.

## Tingkat atas
```json
"anchor": { "kind": "map", "desc": "peta jalur KRL Jabodetabek, stasiun utama sebagai titik" },
"cast": ["komo", "sepuh", "aturan", "cicak"]
```
- `anchor`: jangkar visual yang muncul berulang (peta, siluet, atau benda metafora besar dari `gaya-cerita.md`).
- `cast`: pemeran track dari `produksi/STYLE.md`.

## Per scene
```json
{
  "id": "s06", "role": "body",
  "narration": { "en": "They were the first air-conditioned electric trains in Indonesia. At the time, crowded riders hung out of open doors or sat on the roof.", "id": "..." },
  "shots": [
    { "sentence": 1, "show": "potongan gerbong: udara dingin di dalam, terik di luar, percikan di pantograf", "scale": "inside", "motion": "hembusan dingin mengalir, wajah penumpang berubah dari gerah ke lega", "transition": "push", "labels": [{ "text": "FIRST AC TRAIN", "word": "air-conditioned" }] },
    { "sentence": 2, "show": "kereta ekonomi di peron mulai berjalan, penumpang bergelantungan di pintu dan duduk di atap", "scale": "place", "motion": "kereta berangkat makin cepat, kamera dekati pintu lalu naik ke atap", "transition": "wipe" }
  ],
  "sources": [{ "url": "https://...", "claim": "..." }]
}
```
- `shots`: satu per kalimat narasi Inggris; isi tiap bidang di `instruksi/referensi/gaya-visual.md` bagian 6.
- `broll` hanya untuk scene dunia nyata yang bisa dicari: `{ "keywords": [...], "avoid": [...] }`, `{ "own": "krl-01.mp4" }` untuk footage milik kreator (di `produksi/footage-own/<ID>/`, dihitung QA sebagai bukti kreator bila muncul sebelum 30% durasi), atau klip berlisensi lewat `lic:`. Jangan untuk konsep abstrak.
- `sources` untuk setiap scene yang memuat klaim fakta (angka, aturan, tanggal). Klaim tanpa sumber dilunakkan atau dibuang.

## Thumbnail (tingkat atas `03-script.json`)
```json
"thumbnails": [
  { "lines": [{ "text": "APPROVED", "color": "#3ddc97", "size": 150 }, { "text": "≠ PAID", "color": "#ffd23f", "size": 190 }],
    "stage": { "bg": "cafe", "cam": { "z": [1, 1] }, "actors": [{ "id": "owner", "kind": "owner", "x": 0.85, "scale": 1.7, "emo": "shock" }] } }
]
```
Dua varian (A dan B), maksimal 4 kata, tanpa label atau bubble. Teks di kiri, tokoh di kanan (x 0,6 ke atas). Hasil: `render.mjs --thumb`.

## Aturan komposisi (QA otomatis memeriksanya)
1. **Satu kalimat, satu shot**: setiap kalimat narasi digambar sesuai isinya, pergantian shot di batas kalimat, setiap shot punya `motion` (QA G1–G3).
2. **Label** di kata yang diucapkan (QA G4), maksimal 3 kata atau satu angka. Tanpa papan teks.
3. **Bubble** hanya sikap atau lelucon, jarang (sekitar satu per menit), bukan pengulang narasi. Maksimal 6 kata, tanpa klaim fakta baru.
4. **Jangkar** (`anchor`) wajib (QA G5), muncul di fondasi, tengah, dan penutup.
5. **Footage nyata (`broll`)**: sekitar 20 sampai 30% durasi, tersebar merata, maksimal 2 scene berurutan, tidak pernah lebih dari sepertiga.
6. **Variasi**: jangkar, palet suasana, dan susunan pembuka tidak sama tiga video berturut-turut.
7. **Re-hook** tiap 60 sampai 90 detik (`role: "rehook"`). Jeda otomatis lebih panjang sebelum re-hook, payoff, dan CTA.
8. **Durasi**: long-form ≥ 8:00 setelah TTS. Tambah scene isi, jangan memanjangkan jeda.
9. **Pemeran tetap per track** (`produksi/STYLE.md`) supaya penonton mengenalinya.

## Alur
Mesin render `shots` belum dibangun. Sampai ada, siklus baru berhenti di QA dan menunggu mesin itu. Kontrak yang salah dilaporkan QA per scene.
