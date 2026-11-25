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

Gaya kartun penjelasan berlaku untuk semua track: lihat `produksi/STYLE.md` (pemeran, latar, spec adegan `04-stage.json`). Spec data di bawah menjadi papan sisipan di dalam adegan.

## Visual berbasis spec

Isi tiap scene non-b-roll dibaca dari `hasil/tracks/<ID>/siklus/<NNN>/04-visual-spec.json` (kunci = id scene). Komponen dipilih dari `kind`, bukan dari tipe di `03-script.json`, dan dipakai ulang lintas track (gaya per track di `src/themes/`). Isi diukur lalu diskalakan otomatis agar pas layar 16:9 maupun 9:16.

| Komponen | `kind` | Bentuk spec |
| --- | --- | --- |
| Diagram | `flow` (default) | `nodes:[{label,sub,tone}]`, `edges:[string \| {label,broken,back}]`, `note` |
| | `lanes` | `lanes:[{title,nodes,edges}]` |
| | `timeline` | `blocks:[{title,sub,tone:"lit\|dim\|hot"}]` |
| | `rows` | `rows:[{label,amount,state \| from,to,toAmount,switchAt,appearAt}]`, `header`, `note` |
| | `checks` | `items:[text \| {text,mark:"ok\|odd"}]`, `header` |
| | `gauge` | `zones:[..]`, `target`, `label` |
| | `stamp` | `lines`, `chips`, `stamp`, `tone`, `side:{label,value}` |
| | `hub` | `items:[..]`, `hub:{label,sub}` |
| Code | `code` | `title`, `lines:[{k,v,note}]`, `focus:[idx..]`, `note` |
| Data | `stats` | `items:[{label,value,tone,sub}]`, `between`, `note` |
| | `counter` / `bars` / `netting` / `collapse` / `bignum` / `breakdown` | lihat `src/components/DataPanel.tsx` |
| Teks | (ada `headline`) | `headline`, `sub` |

`tone`: `default`, `good`, `bad`, `hot`, `muted`. Scene tanpa spec jatuh ke teks `on_screen_text`.
