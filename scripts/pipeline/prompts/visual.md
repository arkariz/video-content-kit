WAJIB: baca instruksi/referensi/gaya-visual.md, produksi/STYLE.md, produksi/CONTRACT.md, produksi/PIPELINE.md bagian "Mesin R3", dan hasil/learnings-global.md.

Track {{track}}, siklus {{siklus}}. Lengkapi visual di 03-script.json:
1) `anchor` dan `cast` di tingkat atas (pemeran dari produksi/STYLE.md untuk track ini).
2) `shots` per scene: satu shot per kalimat narasi Inggris, masing-masing dengan `show` (apa yang terlihat, konkret dan harfiah), `motion` (apa yang bergerak atau berubah), `transition`, dan `labels` yang `word`-nya diucapkan di kalimat itu. Angka penting diberi `count`.
3) `broll` hanya untuk scene dunia nyata (footage nyata berlisensi; 20-30% durasi, tersebar, maks. 2 berurutan; kata kunci spesifik dan daftar avoid).
4) `03-visual.json` bila belum ada (bidang A-I per scene; jangan mengarang detail ilmiah: bila kurang, tulis `needs` dan berhenti).
5) `04-shots.tsx` di folder siklus: satu komponen React per shot (urut sama dengan `shots`) yang menggambar `show` dan `motion` serta subjek, lingkungan, perilaku, komposisi, dan animasi dari `03-visual.json` dengan primitif `@r3` dan pemeran `cast.<ID>`. Ambil waktu kata lewat `useShot().word(...)`, label lewat opsi `labels` atau `useLabel`. Cara dan contoh: produksi/PIPELINE.md bagian "Mesin R3" dan produksi/contoh-r3/T02-001-s06/.
Lalu jalankan `npm --prefix produksi/remotion run typecheck`, `node scripts/produksi/build-visual.mjs --track {{track}} --siklus {{siklus}} --check`, dan `node scripts/pipeline/qa-r3.mjs --track {{track}} --siklus {{siklus}}`, dan perbaiki temuan G1-G6. Setelah TTS dan caption ada, periksa gambarnya dengan `node scripts/produksi/render.mjs --track {{track}} --siklus {{siklus}} --still <scene>`. Jangan menulis 04-*.json dengan tangan.

Wajib: tiap item `shorts_cuts` punya `thumbnail` (1080x1920, maksimal 5 kata; untuk R3 tambahkan komponen `thumbS<n>` di 04-shots.tsx). Jangan menulis `caption_mode`; caption siklus baru tampil per kalimat. Lihat produksi/CONTRACT.md.
