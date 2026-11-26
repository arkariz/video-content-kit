# Kontrak visual di `03-script.json` (untuk Claude Project dan agent mana pun)

> **Gaya wajib sekarang R3, ilustrasi gerak penjelas** (`instruksi/referensi/gaya-visual.md`, sejak 2026-11-26). Visual siklus baru ditulis sebagai `anchor`, `cast`, dan `shots` per kalimat (format lengkap di bagian 6 dokumen itu). Bagian `stage` di bawah hanya untuk siklus lama (T01-001 kartun datar, T02-001 diorama) dan thumbnail; bidang `sources`, `broll`, `chapters`, dan `thumbnails` tetap berlaku.

Naskah (instruksi 04) menulis juga visualnya, sehingga tahap 05 sampai 07 berjalan tanpa LLM. Tambahkan bidang berikut. Bidang lama tidak berubah.

## Per scene (gaya wajib)
```json
{
  "id": "s06", "role": "body",
  "narration": { "en": "They were the first air-conditioned electric trains in Indonesia. At the time, crowded riders hung out of open doors or sat on the roof.", "id": "..." },
  "shots": [
    { "sentence": 1, "show": "potongan gerbong: udara dingin di dalam, terik di luar, percikan di pantograf", "scale": "inside", "motion": "hembusan dingin mengalir, wajah penumpang berubah dari gerah ke lega", "transition": "push", "labels": [{ "text": "FIRST AC TRAIN", "word": "air-conditioned" }] },
    { "sentence": 2, "show": "kereta ekonomi di peron mulai berjalan, penumpang bergelantungan di pintu dan duduk di atap", "scale": "place", "motion": "kereta berangkat makin cepat, kamera dekati pintu lalu naik ke atap", "transition": "wipe" }
  ],
  "broll": null,
  "sources": [{ "url": "https://...", "claim": "..." }]
}
```
- Satu shot per kalimat narasi Inggris; aturan isi tiap bidang di `instruksi/referensi/gaya-visual.md` bagian 6.
- Mesin render `shots` belum dibangun. Sampai ada, `build-visual.mjs` dan `render.mjs` hanya melayani format lama di bawah.

## Per scene (mesin lama: kartun datar dan diorama)
```json
{
  "id": "s09", "role": "body",
  "narration": { "en": "...", "id": "..." },
  "visual": {
    "type": "remotion-diagram", "description": "...", "on_screen_text": "ACQUIRER = the shop's bank",
    "spec": { "kind": "flow", "nodes": [{ "label": "Terminal" }, { "label": "Acquirer", "sub": "the shop's bank", "tone": "hot" }], "edges": ["asks"] }
  },
  "stage": {
    "bg": "cafe",
    "actors": [
      { "id": "term", "kind": "terminal", "x": 0.22, "label": "TERMINAL", "emo": "happy", "say": { "text": "Hey bank, may I charge this?", "at": 0.1 } },
      { "id": "acq", "kind": "bank", "x": 0.76, "label": "ACQUIRER", "acc": "glasses", "color": "#cfe3f7" }
    ],
    "fx": [{ "type": "packet", "from": "term", "to": "acq", "label": "0100", "at": 0.3 }],
    "insert": { "pos": "top" }
  },
  "broll": { "keywords": ["contactless payment coffee shop"], "avoid": ["man face"] },
  "sources": [{ "url": "https://...", "claim": "ISO 8583 dipublikasikan 1987" }]
}
```
- `visual.spec` hanya bila scene punya diagram, kode, atau angka. `stage.insert` wajib bila ada `spec`, dan tidak boleh ada tanpa `spec`.
- `broll` hanya untuk scene dunia nyata yang bisa dicari (orang membayar, gas pump, pesawat, uang tunai). Jangan untuk konsep abstrak.
- `broll` boleh `{ "own": "krl-01.mp4" }` untuk footage milik kreator (di `produksi/footage-own/<ID>/`). QA menganggapnya bukti kreator bila muncul sebelum 30% durasi.
- `stage.view` ({lon, lat}) mengatur zoom peta, dan fx `pin` dan `route` memakai nama tempat atau `[lon, lat]` (khusus `bg: "map"`).
- `sources` untuk setiap scene yang memuat klaim fakta (angka, aturan, tanggal). Klaim tanpa sumber dilunakkan atau dibuang.
- Opsi lengkap per bidang: `produksi/STYLE.md` (adegan) dan `produksi/README.md` (spec data). Daftar nilai yang valid: `scripts/produksi/vocab.mjs`.

## Thumbnail (tingkat atas `03-script.json`)
```json
"thumbnails": [
  { "lines": [{ "text": "APPROVED", "color": "#3ddc97", "size": 150 }, { "text": "≠ PAID", "color": "#ffd23f", "size": 190 }],
    "stage": { "bg": "cafe", "cam": { "z": [1, 1] }, "actors": [{ "id": "owner", "kind": "owner", "x": 0.85, "scale": 1.7, "emo": "shock" }] } }
]
```
Dua varian (A dan B), maksimal 4 kata, tanpa label atau bubble. Teks di kiri, tokoh di kanan (x 0,6 ke atas). Hasil: `render.mjs --thumb`.

## Aturan komposisi (QA otomatis memeriksanya)
1. **Satu kalimat, satu shot** (gaya wajib): setiap kalimat narasi digambar sesuai isinya, pergantian shot di batas kalimat. Di mesin lama: satu ide per scene, satu aksi, satu efek.
2. **Bubble** hanya sikap atau lelucon, jarang (sekitar satu per menit), bukan pengulang narasi. Maksimal 6 kata, tanpa klaim fakta baru, tanda seru hemat.
3. **Footage nyata (`broll`)**: sekitar 20 sampai 30% durasi, tersebar merata, maksimal 2 scene berurutan, tidak pernah lebih dari sepertiga. Hook (2 detik pertama) sebaiknya visual yang langsung menjelaskan janji.
4. **Variasi**: ganti `bg` dan susunan pembuka antar siklus, jangan sama tiga video berturut-turut. Cam otomatis bergantian.
5. **Re-hook** tiap 60 sampai 90 detik (`role: "rehook"`). Jeda otomatis lebih panjang sebelum re-hook, payoff, dan CTA.
6. **Durasi**: long-form ≥ 8:00 setelah TTS. Tambah scene isi, jangan memanjangkan jeda.
7. **Tokoh tetap per track** supaya penonton mengenali pemeran. Pemeran baru ditambah di `produksi/remotion/src/toon/Actors.tsx` dan `scripts/produksi/vocab.mjs`.

## Alur
`build-visual.mjs` memvalidasi kontrak, lalu menulis `04-visual-spec.json`, `04-stage.base.json`, dan `04-broll-plan.json`. Pipeline memanggilnya otomatis. Kontrak yang salah berhenti dengan daftar kesalahan per scene.
