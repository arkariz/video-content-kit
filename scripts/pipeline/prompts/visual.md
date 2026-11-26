WAJIB: baca instruksi/referensi/gaya-visual.md, instruksi/referensi/gaya-cerita.md, hasil/learnings-global.md, produksi/STYLE.md, dan produksi/CONTRACT.md.

Track {{track}}, siklus {{siklus}}. Lengkapi visual di 03-script.json:
1) `anchor` dan `cast` di tingkat atas (pemeran dari produksi/STYLE.md untuk track ini).
2) `shots` per scene: satu shot per kalimat narasi Inggris, masing-masing dengan `show` (apa yang terlihat, konkret dan harfiah), `motion` (apa yang bergerak atau berubah), `transition`, dan `labels` yang `word`-nya diucapkan di kalimat itu. Angka penting diberi `count`.
3) `broll` hanya untuk scene dunia nyata (footage nyata berlisensi; 20-30% durasi, tersebar, maks. 2 berurutan; kata kunci spesifik dan daftar avoid).
Lalu jalankan `node scripts/pipeline/qa.mjs --track {{track}} --siklus {{siklus}}` dan perbaiki temuan G1-G5. Jangan menulis 04-*.json dengan tangan.
