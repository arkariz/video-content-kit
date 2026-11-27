# hasil/: semua hasil kerja agent

Folder ini berisi output, bukan instruksi. Satu repo menampung beberapa **track**. Satu track = satu niche + satu sudut, dengan progres, siklus, dan pelajarannya sendiri.

```
hasil/
├── STATE.md                    # portfolio: daftar track, kapasitas, langkah berikutnya (baca pertama)
├── learnings-global.md         # pelajaran yang terbukti berlaku lintas track
├── catatan-verifikasi.md       # verifikasi ulang fakta platform (dibuat bila perlu)
├── youtube-reach/              # arsip impressions dan CTR per channel, dibuat scripts/youtube/analitik.mjs
├── legal/                      # privacy policy dan terms aplikasi Meta (diunggah kreator ke web publik)
├── 00-riset-niche/
│   ├── profil-kreator.md
│   ├── kandidat-niche.md       # 10-15 kandidat + data mentah
│   └── analisa-niche.md        # skor + usulan track
├── review/
│   ├── YYYY-MM-DD-review-portfolio.md   # keputusan lanjut / scale / pivot / jeda / drop
│   └── <ID>-<siklus>/index.html         # paket review video, dibuat pipeline
└── tracks/
    └── T01-slug/
        ├── TRACK.md            # status track (frontmatter) + hipotesis + siklus + keputusan + log
        ├── backlog.md
        ├── learnings.md
        ├── channel/            # opsional: profil, aset, dan generator aset channel
        ├── validasi/
        │   ├── rencana.md      # kriteria lulus/gagal ditulis SEBELUM data masuk
        │   └── hasil.md
        ├── siklus/
        │   └── NNN-slug/       # 01-riset-viral.md, 02-brief.md, 03-script.json, 03-naskah.md,
        │                       # 04-shots.tsx, 04-assets.json, 05-qa.md, 06-publish.md
        └── analitik/
            └── YYYY-MM-DD.md
```

ID track: `T` + dua digit, berurutan dan tidak pernah dipakai ulang, meskipun track lama sudah di-drop. Track yang di-drop tidak dihapus. Statusnya diganti `drop` dan alasannya dicatat, supaya pelajarannya tetap bisa dipakai.

Template untuk setiap file ada di `instruksi/templates/`.
