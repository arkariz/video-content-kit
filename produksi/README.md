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

Catatan: caption dibuat per scene (waktu relatif scene), bukan dari audio gabungan. Komponen visual per tipe (`remotion-diagram/code/data`) masih placeholder teks; dibangun per track saat produksi.
