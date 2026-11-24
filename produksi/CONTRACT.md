# Kontrak visual di `03-script.json` (untuk Claude Project dan agent mana pun)

Naskah (instruksi 04) menulis juga visualnya, sehingga tahap 05 sampai 07 berjalan tanpa LLM. Tambahkan bidang berikut. Bidang lama tidak berubah.

## Per scene
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
- `sources` untuk setiap scene yang memuat klaim fakta (angka, aturan, tanggal). Klaim tanpa sumber dilunakkan atau dibuang.
- Opsi lengkap per bidang: `produksi/STYLE.md` (adegan) dan `produksi/README.md` (spec data). Daftar nilai yang valid: `scripts/produksi/vocab.mjs`.

## Aturan komposisi (QA otomatis memeriksanya)
1. **Satu ide per scene**: satu aksi, paling banyak dua bubble, satu efek.
2. **Bubble** adalah candaan atau reaksi tokoh, bukan pengulang narasi. Maksimal 44 huruf, tanpa klaim fakta baru, tanda seru hemat.
3. **Footage nyata (`broll`)**: sekitar 20 sampai 30% durasi, tersebar merata, maksimal 2 scene berurutan, tidak pernah lebih dari sepertiga. Hook (2 detik pertama) sebaiknya visual yang langsung menjelaskan janji.
4. **Variasi**: ganti `bg` dan susunan pembuka antar siklus, jangan sama tiga video berturut-turut. Cam otomatis bergantian.
5. **Re-hook** tiap 60 sampai 90 detik (`role: "rehook"`). Jeda otomatis lebih panjang sebelum re-hook, payoff, dan CTA.
6. **Durasi**: long-form ≥ 8:00 setelah TTS. Tambah scene isi, jangan memanjangkan jeda.
7. **Tokoh tetap per track** supaya penonton mengenali pemeran. Pemeran baru ditambah di `produksi/remotion/src/toon/Actors.tsx` dan `scripts/produksi/vocab.mjs`.

## Alur
`build-visual.mjs` memvalidasi kontrak, lalu menulis `04-visual-spec.json`, `04-stage.base.json`, dan `04-broll-plan.json`. Pipeline memanggilnya otomatis. Kontrak yang salah berhenti dengan daftar kesalahan per scene.
