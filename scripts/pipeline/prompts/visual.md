Baca produksi/CONTRACT.md. Tulis visual langsung ke 03-script.json (bidang `visual.spec`, `stage`, `broll`, `sources` per scene), lalu jalankan `node scripts/produksi/build-visual.mjs --track {{track}} --siklus {{siklus}}` sampai valid. Jangan menulis 04-*.json dengan tangan.

Track {{track}}, siklus {{siklus}}. Baca produksi/STYLE.md. Dari 03-script.json tulis di folder siklus:
1) 04-visual-spec.json (data Diagram/Code/Data per scene), 2) 04-stage.src.mjs yang menghasilkan 04-stage.base.json (adegan kartun per scene; bubble hanya candaan atau reaksi, bukan pengulang narasi, maks. 1 tanda seru per 3 bubble),
3) 04-broll-plan.json (scene dunia nyata untuk footage nyata berlisensi; 20-30% durasi, tersebar, maks. 2 berurutan; kata kunci spesifik dan daftar avoid).
Contoh lengkap: hasil/tracks/T01-plumbing-of-money/siklus/001-approved-not-paid/.
