# Gaya video wajib: diorama 2.5D

**Berlaku untuk semua track dan semua siklus sejak 2026-11-25, bagi agent chat maupun agent di repo.** Dipilih kreator. Satu-satunya pengecualian: T01 siklus 001 (sudah tayang). QA otomatis menandai **kritis** bila `world` tidak ada atau scene diorama dan footage kurang dari 70%.

Baca juga: `hasil/learnings-global.md` (wajib sebelum brief dan naskah). Referensi visual: Histo Graph, https://www.facebook.com/reel/1069633245847151 (tiru bahasa visualnya, jangan menyalin aset).

## Prinsip
1. **Satu dunia per video** (`world`). Semua tempat yang dibahas ada di dunia itu dan posisinya tidak berpindah, sehingga dunia berfungsi sebagai peta.
2. **Kamera yang menjelaskan:** jauh untuk gambaran besar, dekat untuk detail. Tiap scene bergerak dari satu sudut ke sudut lain; mulai dari sudut akhir scene sebelumnya.
3. **Perlihatkan prosesnya:** benda berpindah (`moves`), jalur tergambar (`paths`), sesuatu muncul, hilang, membesar, atau disorot. Setiap scene punya minimal satu perubahan.
4. **Angka menempel pada benda** (`callouts`), bukan di papan teks. Tanpa bubble dan tanpa papan infografis.
5. **Dunia yang kaya:** puluhan sampai ratusan aset kecil (`scatter`).
6. **Fondasi dulu, anggaran konsep** (lihat learnings): 60 sampai 90 detik pertama memperkenalkan dunia, pemain, dan tahap; maksimal 8 istilah baru per video panjang, 3 per Short; definisikan saat pertama muncul.
7. Caption otomatis satu kata. Suasana (`mood`: day, dusk, night) dipakai untuk menandai keadaan.

## `world` (tingkat atas `03-script.json`)
Koordinat: `x` ke kanan, `z` menjauh dari kamera, `y` ke atas. Kira-kira satuan meter; satu rumah selebar 3.
```json
"world": {
  "ground": "#a9cf8e",
  "areas": [{ "points": [[-7,-8],[7,-8],[7,5],[-7,5]], "color": "#dcc7a1" }],
  "scatter": [{ "asset": "pine", "count": 130, "area": [-60, 8, 60, 90] }],
  "objects": [
    { "id": "shop", "asset": "shop", "x": 0, "z": 3 },
    { "id": "you", "asset": "actor:you", "x": -2.6, "z": -2.6, "scale": 0.8 },
    { "id": "bank", "asset": "bankhall", "x": -17, "z": 18, "label": "YOUR BANK" },
    { "id": "slip", "asset": "paper", "x": 2.8, "z": -3, "y": 3.4, "hidden": true }
  ],
  "paths": [{ "id": "p1", "points": ["shop", [9, 6], "bank"], "hidden": true }]
}
```
- **Aset:** `pine`, `tree`, `palm`, `bush`, `house`, `shop`, `bankhall`, `tower`, `server`, `lamp`, `counter`, `envelope`, `coin`, `paper`, `lock`.
- **Tokoh** sebagai `actor:<nama>`: you, owner, clerk, pilot, friend, guide, commuter, hijab, engineer, terminal, bank, bank-big, network, phone, card, vault, plane, train, island, volcano, city, ship.
- Aset yang belum ada ditulis di brief sebagai "butuh aset baru: ...", supaya agent repo menambahkannya. Jangan mengarang nama aset.

## `stage` per scene
```json
"stage": {
  "engine": "diorama",
  "mood": "day",
  "camera": { "from": { "look": "shop", "dist": 22, "height": 12 }, "to": { "look": "bank", "dist": 14, "height": 6 }, "arrive": 0.9 },
  "paths": [{ "id": "p1", "at": 0.1 }],
  "moves": [{ "asset": "envelope", "from": "shop", "via": [[9, 6]], "to": "bank", "at": 0.3, "dur": 0.5, "label": "may I charge $5?" }],
  "highlight": [{ "id": "bank", "at": 0.8 }],
  "show": [{ "id": "slip", "at": 0.2 }], "hide": [], "grow": [{ "id": "bank", "to": 1.4, "at": 0.5 }],
  "callouts": [{ "id": "bank", "text": "$5 on hold", "at": 0.7 }],
  "emo": { "you": "shock" }
}
```
- Waktu (`at`, `dur`, `arrive`) berupa pecahan 0 sampai 1 dari durasi suara scene.
- Kamera: `look` (id objek atau `[x, z]`) dengan `dist` dan `height`; kecil = dekat. Dekat: dist 10 sampai 14; menengah 18 sampai 24; peta: 34 sampai 55.
- Callout maksimal 3 kata atau satu angka. Label objek pendek dan hanya untuk tempat penting.
- Footage nyata (`broll`) tetap boleh, tersebar, maksimal sepertiga durasi.

## Bidang lain yang tetap wajib
`sources` per scene yang memuat klaim fakta, `chapters`, `shorts_cuts`, `thumbnails` (format di `produksi/CONTRACT.md`), durasi master sesuai brief.

## Cek sebelum diserahkan
- [ ] Satu `world`, semua tempat ada di dalamnya.
- [ ] Setiap scene punya perpindahan kamera atau perubahan yang menjelaskan narasinya.
- [ ] Tanpa papan teks dan bubble.
- [ ] Orang awam bisa menjelaskan ulang prosesnya hanya dari gambar.

## Untuk agent repo
Contoh jalan: `produksi/remotion/demo/diorama-tap.json`. Pratinjau: `node scripts/produksi/preview-stage.mjs --track <ID> --stage <file> [--vertical] [--video]`. Validasi: `node scripts/produksi/build-visual.mjs --track <ID> --siklus <NNN> --check`. Mesin: `produksi/remotion/src/diorama/`.
