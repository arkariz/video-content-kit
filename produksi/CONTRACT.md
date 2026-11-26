# Kontrak data cerita dan visual (untuk Claude Project dan agent mana pun)

Gaya wajib: R3, ilustrasi gerak penjelas (`instruksi/referensi/gaya-visual.md`). Naskah (instruksi 04) menulis juga visualnya, sehingga tahap 05 sampai 07 berjalan tanpa LLM. Skema: `instruksi/templates/script.schema.json` (dokumen visual di `$defs.visual`).

## Empat lapisan data

| Lapisan | File | Isi | Ditautkan lewat |
| --- | --- | --- | --- |
| Riset | `01-riset-viral.md`, bagian "Riset fakta" | tabel klaim `C01…`: klaim, sumber, kutipan, status | id klaim |
| Cerita | `03-script.json` | narasi, urutan scene, `shots` per kalimat, `sources`, Shorts, thumbnail | id scene, nomor kalimat |
| Arah visual | `03-visual.json` | per scene: tujuan, subjek, lingkungan, perilaku, komposisi, animasi, dasar fakta, kebutuhan produksi | id scene → `03-script.json`; `claims` → riset |
| Render | `04-shots.tsx`, props dan caption buatan skrip | komponen per shot, waktu dari caption | id scene dan urutan shot |

Informasi tidak disalin antar lapisan: narasi hanya di `03-script.json`; klaim hanya di riset (lapisan lain merujuk id-nya).

## Riset fakta (`01-riset-viral.md`)
```
## Riset fakta
| id | Klaim | Sumber (URL) | Kutipan / halaman | Status | Catatan |
| --- | --- | --- | --- | --- | --- |
| C01 | Sel darah merah berbentuk cakram cekung dua sisi, tanpa inti | https://openstax.org/... | "biconcave disc" | terverifikasi | |
```
- `id`: `C` + dua digit, unik per siklus, tidak dipakai ulang setelah dihapus.
- `Status`: `terverifikasi`, `disederhanakan`, atau `belum` (arti di `instruksi/referensi/gaya-cerita.md` bagian 1.2).
- Validator Fase 4 membaca baris yang diawali `| C`.

## Tingkat atas
```json
"anchor": { "kind": "map", "desc": "peta jalur KRL Jabodetabek, stasiun utama sebagai titik" },
"cast": ["komo", "sepuh", "aturan", "cicak"],
"visual_spec": "03-visual.json"
```
- `anchor`: jangkar visual yang muncul berulang (peta, siluet, atau benda metafora besar dari `gaya-cerita.md`).
- `cast`: pemeran track dari `produksi/STYLE.md`.
- `visual_spec`: path relatif ke dokumen arah visual; kehadirannya menyalakan aturan V-1 sampai V-9.

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
- `shots`: satu per kalimat narasi Inggris. Bidang:
  - `sentence`: nomor kalimat di narasi Inggris scene itu, mulai dari 1.
  - `show`: apa yang terlihat, konkret dan bisa digambar. Dilarang: "tokoh berdiri", "ikon", "teks".
  - `scale`: `map`, `place`, `object`, atau `inside` (lebih kecil dari benda).
  - `motion`: apa yang bergerak atau berubah. Wajib.
  - `transition`: `cut`, `iris`, `wipe`, `push`, atau `hold` (makna di `produksi/PIPELINE.md` bagian 4).
  - `labels`: `[{ "text", "word" }]`, teks maksimal 3 kata, `word` diucapkan di kalimat itu.
  - `count` (opsional): `{ "value": 72, "as": "dots|items|timeline|split" }`.
  - `faces`, `mood`, `bubble` (maksimal 6 kata, sikap atau lelucon).
  - `three_d` (opsional): penanda informatif saja; 3D dipilih lewat import di `04-shots.tsx`.
- `broll` hanya untuk scene dunia nyata yang bisa dicari: `{ "keywords": [...], "avoid": [...] }`, `{ "own": "krl-01.mp4" }` untuk footage milik kreator (di `produksi/footage-own/<ID>/`, dihitung QA sebagai bukti kreator bila muncul sebelum 30% durasi), atau klip berlisensi lewat `lic:`. Jangan untuk konsep abstrak.
- `sources` untuk setiap scene yang memuat klaim fakta (angka, aturan, tanggal): `[{ "url", "claim", "id"? }]`, dengan `id` = id klaim riset bila ada. URL polos (string) hanya diterima di siklus lama. Klaim tanpa sumber dilunakkan atau dibuang. Daftar tingkat atas `sources: [{ "scene", "url", "claim" }]` boleh sebagai ringkasan (dipakai QA untuk menghitung sumber).

## Arah visual (`03-visual.json`)

Wajib bila `03-script.json` menulis `"visual_spec": "03-visual.json"` (semua siklus baru). Arti tiap bidang dan syarat detailnya: `instruksi/referensi/gaya-visual.md` bagian 3 sampai 7.

```json
{
  "cycle": "P01",
  "palette": { "bg": ["#0e2a3f", "#3d7a9a"], "primary": ["#5fc8f0"], "secondary": ["#9aa7b4", "#e9e1cf"], "accent": "#ffd23f", "meaning": "biru jernih = air bersih, cokelat keruh = air kotor" },
  "scenes": {
    "s01": {
      "purpose": "…",
      "emphasis": ["…"],
      "pattern": ["P01"],
      "dimension": "2.5d",
      "subjects": [{ "id": "tetes", "name": "…", "treatment": "literal", "anatomy": "…", "scale_ref": "…", "must_show": ["…"], "must_not": ["…"], "claims": ["C01"] }],
      "environment": { "setting": "…", "layers": { "bg": "…", "env": "…", "subject": "…", "fg": "…", "atmos": "…" }, "palette": "…", "lighting": "…" },
      "behavior": [{ "subject": "tetes", "action": "…", "trigger": "…", "result": "…", "treatment": "simplified", "claims": ["C02"] }],
      "composition": { "camera": "…", "placement": "…", "focal": "…", "negative_space": "…" },
      "animation": { "initial": "…", "sequence": ["…"], "camera_move": "…", "secondary": "…", "transition": "…", "final": "…" },
      "simplifications": ["…"],
      "assets": ["…"],
      "shots": { "2": "catatan khusus untuk shot ke-2 (opsional)" },
      "needs": "pertanyaan animator ke penulis (opsional; scene dengan needs tidak boleh dirender penuh)"
    }
  }
}
```
- Kunci `scenes` = id scene di `03-script.json`. Setiap scene yang punya `shots` harus punya entri.
- `treatment`: `literal`, `simplified`, atau `metaphor`. `dimension`: `2d`, `2.5d`, atau `3d`. `pattern`: id dari `P01`–`P14` (`gaya-visual.md` bagian 6).
- `claims`: id dari tabel riset. Subjek atau perilaku `literal` tidak boleh merujuk klaim berstatus `belum`.
- `palette` tingkat atas hanya untuk contoh di luar track; siklus track memakai palet track di `produksi/STYLE.md`.

### Versi 2: art direction (`"version": 2`)
Ditambahkan di Fase 3.5. Semua bidang opsional di skema. Siklus lama dan P01 (versi 1) tidak terpengaruh. Arti tiap bidang: `instruksi/referensi/gaya-visual.md` bagian 3, "Art direction".
```json
{
  "version": 2,
  "palette": { "bg": ["#1b1440", "#3a2a6e"], "families": { "air": ["#0f6fa8", "#1fa3d6", "#5fd3f3", "#c9f4ff"] }, "accent": "#ffb347", "meaning": "…" },
  "scenes": { "s01": {
    "light": { "key": "kiri atas", "key_color": "#ffcf8a", "shadow_color": "#3a2a6e", "rim": { "color": "#7fe3ff", "side": "kanan" }, "sources": ["lampu jendela"], "contact_shadows": ["…"] },
    "art_refs": [{ "ref": "T9", "want": "air distilisasi: nada bertingkat + garis riak putih" }],
    "subjects": [{ "id": "tetes", "detail_level": "L1", "silhouette": "…", "proportions": "…",
      "material": { "type": "liquid", "surface": "…", "transparency": 0.85, "highlight": "…", "notes": "…" },
      "details": ["…"] }],
    "environment": { "landmark": "…", "types": ["…"], "life": ["…"], "layers": { "bg": "…", "far": "…", "mid": "…", "subject": "…", "fg": "…", "atmos": "…" } },
    "animation": { "deformation": "…" }
  } }
}
```
| Kode | Aturan versi 2 | Tingkat |
| --- | --- | --- |
| V-10 | subjek tanpa `detail_level`; scene tanpa L1 | sedang |
| V-11 | L1 tanpa `silhouette`, `proportions`, `material.type`, atau `details` | kritis |
| V-12 | `material.type` di luar tabel `STYLE.md` 2.4 | sedang |
| V-13 | scene tanpa `light` atau `art_refs` | sedang |
| V-14 | scene dengan `environment.setting` tanpa `landmark`, `types` (≥2), atau `life` | sedang |

### Aturan validasi (diimplementasi di Fase 4, `validateVisualSpec` di `scripts/produksi/r3.mjs`)
| Kode | Aturan | Tingkat |
| --- | --- | --- |
| V-1 | `visual_spec` ditulis tapi file tidak ada | kritis |
| V-2 | scene ber-`shots` tanpa entri | kritis |
| V-3 | entri tanpa `purpose`, `subjects`, `environment`, `composition`, `animation`, `pattern`, atau `dimension` | kritis |
| V-4 | subjek tanpa `treatment`, atau `anatomy` kurang dari 12 kata, atau tanpa `scale_ref` | sedang |
| V-5 | `literal`/`simplified` tanpa `claims` di siklus yang punya tabel riset | sedang |
| V-6 | klaim yang dirujuk tidak ada di tabel, atau `literal` merujuk klaim `belum` | kritis |
| V-7 | label atau `count` berisi angka tanpa klaim di scene itu | sedang |
| V-8 | `animation` tanpa `initial`, `sequence`, atau `final`; `behavior` memakai hanya kata kerja abstrak | kecil |
| V-9 | scene masih punya `needs` | kritis (render penuh), boleh untuk still |

Siklus lama tanpa `visual_spec` tidak diperiksa aturan ini.

## Thumbnail (tingkat atas `03-script.json`)
```json
"thumbnails": [
  { "lines": [{ "text": "APPROVED", "color": "#3ddc97", "size": 150 }, { "text": "≠ PAID", "color": "#ffd23f", "size": 190 }],
    "stage": { "bg": "cafe", "cam": { "z": [1, 1] }, "actors": [{ "id": "owner", "kind": "owner", "x": 0.85, "scale": 1.7, "emo": "shock" }] } }
]
```
Dua varian (A dan B), maksimal 4 kata, tanpa label atau bubble. Teks di kiri, tokoh di kanan (x 0,6 ke atas). Hasil: `render.mjs --thumb`.

### Thumbnail Shorts (wajib, tiap `shorts_cuts`)
Keputusan kreator 2026-11-26, berlaku semua track dan siklus berikutnya. Satu thumbnail tegak 1080x1920 per Short:
```json
"shorts_cuts": [{ "name": "S1-...", "scene_ids": ["s01"], "hook_override": "...",
  "thumbnail": { "lines": [{ "text": "WHO PAYS", "color": "#ffffff", "size": 150 }, { "text": "CARD FEE?", "color": "#ffd23f", "size": 150 }],
    "stage": { "engine": "r3", "module": "<path 04-shots.tsx>", "scene": "thumbS1" } } }]
```
Maksimal 5 kata. Teks otomatis di tengah atas, benda utama di tengah bawah. Hasil `render.mjs --thumb`: `Thumbnail-Short-<name>.png`. QA: V8 (kritis bila tidak ditulis, sedang bila belum dirender).

## Caption
Keputusan kreator 2026-11-26: caption tampil **per kalimat** (satu kalimat utuh selama diucapkan, kalimat di atas 20 kata dipecah di koma). Ini bawaan semua siklus baru, tanpa pengaturan apa pun. `"caption_mode": "word"` di tingkat atas hanya penanda siklus lama (T01-001, T01-004, T02-001) dan tidak boleh dipakai di siklus baru. Sisakan pita bawah untuk caption: label dan benda penting di atas y 860 (16:9) atau di atas sepertiga bawah (9:16).

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
Scene dengan `shots` dirender mesin R3: agent repo menulis komponen adegan per shot di `04-shots.tsx` (folder siklus), mesin mengatur waktu dari caption per kata, label, transisi, dan efek suara. Cara menulisnya, kamera, gerak, transisi, dan perintah cek ada di `produksi/PIPELINE.md`, bagian "Mesin R3"; tampilan di `produksi/STYLE.md`. Kontrak yang salah ditolak `build-visual.mjs` dan dilaporkan QA (G1–G6, dan G7 untuk `03-visual.json` setelah Fase 4) per scene.
