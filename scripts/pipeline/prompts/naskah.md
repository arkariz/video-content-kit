WAJIB: baca instruksi/referensi/gaya-cerita.md, instruksi/referensi/gaya-visual.md, produksi/STYLE.md, dan hasil/learnings-global.md. Visual ditulis sebagai `anchor`, `cast`, `visual_spec`, dan `shots` (satu shot per kalimat, tiap shot punya `motion`) di 03-script.json, ditambah 03-visual.json (bidang A-I per scene, klaim merujuk tabel Riset fakta di 01-riset-viral.md). Setiap scene harus lulus gate kesiapan visual (gaya-visual.md bagian 7).

Baca dulu baris 3-4 "Urutan baca" di produksi/contoh-r3/P01b-s01-benchmark/EVALUASI.md (naskah + shots, 03-visual.json versi 2 yang merujuk klaim).

Track {{track}}, siklus {{siklus}}. Ikuti instruksi/04-naskah.md, skill video-anti-slop (lapisan teks), humanizer, stop-slop.
Tulis 03-script.json (skema instruksi/templates/script.schema.json) dan 03-naskah.md. Wajib: setiap scene faktual punya `sources` ([{url, claim, id}], id = id klaim riset) di 03-script.json (daftar `sources` tingkat atas juga boleh);
klaim tanpa sumber dilunakkan atau dibuang. Durasi EN setelah TTS harus ≥ 8:00 untuk long-form. Re-hook tiap 60-90 detik. Tanpa klaim kredensial, tanpa nasihat produk.
Nilai stop-slop EN dan ID; tulis ulang sampai ≥ 35/50 (maks. 3 putaran). Bila gagal, berhenti dan laporkan.

Wajib: tiap item `shorts_cuts` punya `thumbnail` (1080x1920, maksimal 5 kata; untuk R3 tambahkan komponen `thumbS<n>` di 04-shots.tsx). Jangan menulis `caption_mode`; caption siklus baru tampil per kalimat. Lihat produksi/CONTRACT.md.
