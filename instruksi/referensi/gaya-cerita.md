# Gaya cerita wajib (acuan utama naskah)

**Berlaku untuk semua track dan semua siklus sejak 2026-11-26, bagi agent chat maupun agent di repo.** Dipilih kreator. Dipakai bersama `instruksi/referensi/gaya-visual.md` (spesifikasi visual per kalimat dan per scene) dan `hasil/learnings-global.md`. Urutan kerja: **riset subjek (bagian 1) → narasi (bagian 2) → teknik (bagian 3) → visual (`gaya-visual.md`)**. Status: arahan kreator, belum terbukti dengan data; dinilai ulang di review portfolio setelah ada analitik siklus yang memakainya (pertama: T01-002).

Sumber yang dipelajari: Kurzgesagt "Why It Takes So LONG for Your Body to Die", Kurzgesagt "Dear Alcohol...", OverSimplified "The First Punic War (Part 1)". **Yang ditiru hanya teknik.** Kalimat, tokoh, lelucon, dan struktur bab mereka tidak disalin.

## 1. Riset subjek sebelum bercerita

Naskah tidak ditulis sebelum subjeknya dipahami cukup dalam untuk **digambar dengan benar**. Hasil riset ditulis sebagai tabel klaim di bagian "Riset fakta" `01-riset-viral.md` (template `instruksi/templates/riset-viral.md`).

### 1.1 Pertanyaan riset
Jawab yang relevan untuk topik:
- Fakta yang sudah mapan, dan apa yang masih diperdebatkan atau belum pasti.
- Mekanisme ilmiah, historis, teknis, atau kontekstual yang dijelaskan.
- Ciri fisik subjek: bentuk, ukuran (dan ukuran relatif terhadap benda di sekitarnya), warna, tekstur.
- Komponen dan struktur dalam yang perlu terlihat.
- Lingkungan tempat subjek berada dan kondisinya.
- Bagaimana subjek bergerak atau berperilaku, apa pemicunya.
- Hubungan antar-subjek, sebab-akibat, dan perubahan dalam waktu (berapa lama tiap tahap).
- Miskonsepsi umum (bahan "tebakan dipatahkan").
- **Subtipe**: jangan menyamakan yang berbeda. Neutrofil, makrofag, dan limfosit punya struktur dan fungsi berbeda; KRL dan MRT berbeda armada; kartu debit dan kredit berbeda jalur.

### 1.2 Sumber
Urutan prioritas:
1. Sumber primer atau otoritatif: publikasi ilmiah (PMC, jurnal), buku ajar (NCBI Bookshelf, OpenStax), lembaga pemerintah dan kesehatan (WHO, CDC, kementerian, BPS), universitas, lembaga ilmiah, dokumen resmi (peraturan, laporan tahunan).
2. Media dan ensiklopedia bereputasi (Britannica, kantor berita besar) untuk konteks.
3. Wikipedia hanya sebagai penunjuk ke sumber; yang dicatat adalah sumber yang dirujuknya.

Setiap klaim dicatat: id (`C01`, `C02`, …), kalimat klaim, URL, kutipan pendek atau halaman bila ada, status, dan catatan.

| Status | Arti | Boleh dipakai untuk |
| --- | --- | --- |
| `terverifikasi` | didukung sumber kelas 1, atau dua sumber kelas 2 yang sepakat | narasi, label, angka, gambar `literal` |
| `disederhanakan` | benar, tetapi akan ditampilkan dalam bentuk yang lebih sederhana; catat apa yang dihilangkan | gambar `simplified` |
| `belum` | belum ditemukan sumber yang cukup, atau sumber berselisih | tidak boleh untuk `literal`; lunakkan ("diperkirakan", "menurut …") atau buang |

### 1.3 Larangan
- Mengarang mekanisme, anatomi, proporsi, atau perilaku supaya scene lebih menarik.
- Mengisi detail visual dari ingatan tanpa sumber, bila detail itu menentukan pemahaman.
- Metafora yang menggantikan penjelasan saat ketepatan fakta penting. Metafora boleh menemani penjelasan, tidak menggantikannya.

## 2. Mengembangkan narasi

Setelah riset, tulis di `02-brief.md` (template `brief.md`):
- **Penonton dan tingkat pengetahuannya**: apa yang sudah mereka tahu, istilah apa yang perlu didefinisikan (anggaran konsep di `learnings-global.md`).
- **Pertanyaan utama** (rasa penasaran di hook) dan **pesan inti** (satu kalimat).
- **Alur pengungkapan**: urutan yang membuat setiap jawaban memunculkan pertanyaan berikutnya. Jangan sekadar mendaftar fakta.
- **Mekanisme yang dijelaskan** dan scene tempat ia muncul.
- **Contoh dan analogi**, termasuk satu metafora besar (jangkar).
- **Peluang visual**: transisi skala, reveal, sebab-akibat, perbandingan, diagram; pilih pola dari `gaya-visual.md` bagian 6.
- **Ritme emosi**: di mana tegang, di mana lega, di mana jujur (steelman).
- **Penutup dan takeaway**: yang membingkai ulang, bukan ringkasan.

## 3. Teknik per sumber

### Kurzgesagt, kematian tubuh
1. Pembuka "kamu" + masa kini, tepat di momen kunci. Penonton jadi pelaku, bukan pengamat.
2. Satu momen diikuti tahap demi tahap dengan penanda waktu atau kemajuan. Penanda itu tulang punggung struktur.
3. Satu metafora besar dipakai konsisten dari awal sampai akhir.
4. Skala selalu diberi pembanding.
5. Penutup berupa pertanyaan atau situasi yang membingkai ulang seluruh video, bukan ringkasan.

### Kurzgesagt, alkohol
1. Hook paradoks: fakta besar yang bertabrakan dengan kebiasaan sehari-hari.
2. Tangga eskalasi per bab: satu orang → kebiasaan → orang lain → masyarakat.
3. Angka diubah jadi hal yang terbayang (laju, setara satu kota, per orang).
4. Momen jujur (steelman): akui manfaat sebelum menutup.
5. Ambang personal bila relevan ("kalau kamu ...").

### OverSimplified, Perang Punik
1. Patahkan tebakan: sebut dulu yang biasanya orang kira, lalu yang benar.
2. Mesin insentif: "ada satu hal yang perlu kamu tahu soal X", lalu jelaskan kenapa pihak itu bertindak begitu.
3. Callback: dipasang sekali, dibayar kemudian dengan twist.
4. Angka besar dibuat jadi drama kecil.
5. Setiap pihak punya motif yang jelas, bukan sekadar nama di diagram.

## 4. Adaptasi ke kit (wajib)
- Satu narator TTS. Dialog banyak tokoh hanya bila kreator menyetujui suara tambahan.
- Visual mengikuti `gaya-visual.md`: metafora besar = `anchor`, tahap dan penanda = garis waktu atau skala kamera di `shots`, tanpa papan teks; bubble hanya untuk sikap atau lelucon (lihat bagian 8 di sana).
- Humor kering di pilihan kata, bukan punchline yang bergantung intonasi.
- Topik uang, kesehatan, hukum: steelman wajib, tanpa nasihat.
- Narator tidak mengaku sebagai orang tertentu ("I", "saya" sebagai persona) kecuali suara milik kreator.
- Anggaran konsep dan fondasi tetap mengikuti `hasil/learnings-global.md`. Teknik cerita tidak boleh menambah istilah.

## 5. Checklist cerita (wajib dicentang di `03-naskah.md`)
- [ ] Scene 1: "kamu"/"you" di momen kunci, maksimal 2 kalimat (tetap memenuhi hook yang terkunci di rencana validasi, bila ada).
- [ ] Satu analogi/metafora muncul di fondasi dan kembali di penutup.
- [ ] Minimal satu "tebakan dipatahkan".
- [ ] Satu blok mesin insentif.
- [ ] Satu callback yang kembali dengan twist.
- [ ] Satu momen jujur/steelman.
- [ ] Penutup membingkai ulang, ditambah satu ajakan spesifik ke video berikutnya.
- [ ] Setiap klaim fakta di narasi, label, dan angka punya id klaim berstatus `terverifikasi` atau `disederhanakan`.
- [ ] Subtipe subjek disebut spesifik (bukan kategori umum) bila struktur atau perilakunya berbeda.

## 6. Shorts
- Pembuka sama: "kamu" di momen kunci, hook terbayar sebelum detik 3.
- Satu callback atau satu tebakan dipatahkan, bukan keduanya bila waktunya tidak cukup.
- Tutup dengan pembingkaian ulang. Maksimal 3 konsep.

## 7. Contoh penerapan
T01 siklus 002-fee-split: s02 (pembuka "kamu"), s06 (gerobak di jalan tol sebagai metafora), s12 (tebakan dipatahkan), s18–s22 (mesin insentif bank), s09 → s32 (callback "tol dari gerobak, bukan kantongmu"), s35 (steelman), s43 (penutup tanda "cash discount").
