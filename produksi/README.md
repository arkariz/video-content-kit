# produksi/

Engine Remotion bersama untuk semua track. Data dan output dipisah per `<ID>/<siklus>`.

- `remotion/`: engine (komposisi, `src/themes/<ID>`). Sesi track hanya mengubah tema track-nya sendiri.
- `footage-cache/index.json`: katalog global klip (lisensi, tanggal unduh, dipakai di mana). Di-commit.
- `audio/ captions/ footage/ render/`: di-gitignore (captions di-commit).

Urutan (dari root repo, `--env-file` dibaca Node, bukan agent):

```
node --env-file=.env scripts/produksi/tts.mjs --track T01 --siklus 001 --lang en [--scenes s01,s02]
node --env-file=.env scripts/produksi/captions.mjs --track T01 --siklus 001 --lang en
node --env-file=.env scripts/produksi/footage.mjs search   --track T01 --siklus 001
node --env-file=.env scripts/produksi/footage.mjs download --track T01 --siklus 001   # setelah picks.json diisi kreator
node scripts/produksi/render.mjs --track T01 --siklus 001 --comp Master16x9 --lang en
node scripts/produksi/render.mjs --track T01 --siklus 001 --comp Short9x16 --cut A1-zero-dollars-moved
```

Track audio bahasa lain seukuran master (untuk YouTube Studio > Languages): `render.mjs --comp Master16x9 --lang en --dub id` menghasilkan `Master16x9-audio-id.m4a`; scene yang lebih panjang dari slotnya dipercepat dan dilaporkan.

Suara per bahasa diatur di `produksi/voices.json` (EN boleh dari `ELEVENLABS_VOICE_ID`). Ejaan fonetik `pronunciations` hanya dipakai untuk EN.

Catatan: caption dibuat per scene (waktu relatif scene), bukan dari audio gabungan. Preview satu scene: `--still s10,s19` (PNG di `render/<ID>/<siklus>/stills/`).

## Gaya visual

Aturan wajib: `instruksi/referensi/gaya-visual.md`. Cara menggambar tokoh, palet, dan pemeran: `produksi/STYLE.md`. Kontrak di naskah: `produksi/CONTRACT.md`.
