# hasil/: semua hasil kerja agent

Folder ini berisi output, bukan instruksi. Agent boleh membuat dan mengubah file di sini. Instruksi ada di `instruksi/` dan `skills/`.

```
hasil/
├── STATE.md                 # posisi kerja saat ini (baca pertama kali)
├── learnings.md             # pelajaran kumulatif dari analitik, dipakai setiap siklus
├── backlog.md               # daftar ide topik yang sudah diprioritaskan
├── catatan-verifikasi.md    # hasil verifikasi ulang fakta platform (dibuat bila perlu)
├── 00-niche/
│   ├── profil-kreator.md    # keahlian, waktu, batasan kreator
│   ├── kandidat-niche.md    # 10-15 kandidat + data mentah
│   ├── analisa-niche.md     # skor, shortlist 3, kompetitor, contoh ide
│   └── keputusan-niche.md   # niche terpilih + alasan + KPI
├── siklus/
│   └── NNN-slug-topik/
│       ├── 01-riset-viral.md
│       ├── 02-brief.md
│       ├── 03-script.json   # sumber tunggal untuk suara, caption, visual, render
│       ├── 03-naskah.md     # versi baca manusia + versi Indonesia
│       ├── 04-assets.json   # footage, lisensi, file audio
│       ├── 05-qa.md         # laporan anti-slop (LULUS / GAGAL)
│       └── 06-publish.md    # metadata per platform + URL tayang
└── analitik/
    └── YYYY-MM-DD-mingguan.md
```

Template untuk setiap file ada di `instruksi/templates/`.
