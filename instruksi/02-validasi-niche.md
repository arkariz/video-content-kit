# Langkah track: Validasi niche

Tujuan: membuktikan atau membantah hipotesis track dengan biaya kecil sebelum memasukkannya ke ritme mingguan penuh. Validasi punya dua tahap. V1 murah, tanpa publish. V2 memakai konten uji yang benar-benar tayang. Jalankan dengan skill `video-portfolio`.

Prinsip utama: **kriteria lulus dan gagal ditulis dan dikunci sebelum data masuk.** Tanpa itu, setiap hasil gampang dirasionalisasi sebagai "lumayan".

## V1: validasi riset (1 sampai 2 hari, tanpa publish)

1. Salin `instruksi/templates/validasi-rencana.md` ke `hasil/tracks/<ID>/validasi/rencana.md`, lalu isi bagian hipotesis dan V1.
2. Cari bukti untuk setiap baris tabel V1 dengan web search: permintaan, outlier dari channel kecil, 10 ide dengan bukti milik kreator, estimasi jam produksi, dan risiko kebijakan. Gunakan ulang data dari `00-riset-niche/` bila ada, tetapi cek ulang khusus untuk sudut track ini.
3. Nilai setiap baris: lulus atau gagal.
   - **Semua lulus:** lanjut ke penyusunan V2.
   - **Ada yang gagal:** ajukan ke kreator, apakah sudut diubah (jadi track baru, track ini `drop`) atau langsung `drop`.

## V2: validasi pasar (2 sampai 3 minggu)

### Siapkan dan kunci rencana

1. Lengkapi bagian V2 di `validasi/rencana.md`: channel, paket uji, variasi yang diuji, tanggal, dan tabel ambang. Default paket uji: **6 Shorts + 2 long-form dalam 3 minggu**.
2. Variasikan dengan sengaja: 2 sampai 3 sub-sudut atau gaya hook, masing-masing minimal 2 konten. Tujuannya mengetahui *mana* yang bekerja, bukan sekadar *apakah* track ini bekerja.
3. Tampilkan rencana ke kreator. **Gate:** kreator menyetujui rencana, termasuk ambangnya. Setelah disetujui, tulis tanggal kunci di bagian atas file dan jangan ubah lagi.
4. Cek kapasitas: total jam track `aktif` + `validasi` tidak boleh melebihi `kapasitas_jam_per_minggu`.

### Produksi konten uji

Jalankan siklus biasa (`03` sampai `07`) untuk setiap konten uji, dengan penyesuaian:

- Riset viral cukup sekali di awal sprint, lalu pakai untuk semua konten uji.
- Gate anti-slop tetap wajib. Konten uji yang slop tidak memvalidasi apa pun.
- Tandai siklus di tabel TRACK.md dengan catatan `uji-V2`.

### Kumpulkan data dan nilai

1. Tunggu sampai setiap konten tayang minimal 7 hari.
2. Isi `hasil/tracks/<ID>/validasi/hasil.md` (template `validasi-hasil.md`): angka per konten, median per metrik, zona (lulus, tengah, gagal), dan variasi mana yang menang.
3. Hitung keputusan **persis** dengan aturan di `rencana.md`:
   - **LULUS:** track jadi `aktif`. Sub-sudut atau hook yang menang menjadi default di backlog dan learnings.
   - **GAGAL:** usulkan `drop`, atau pivot ke sub-sudut yang paling baik sebagai track baru.
   - **DI TENGAH:** usulkan perpanjangan 1 sprint dengan satu perubahan spesifik, atau pivot.
   - **DATA KURANG:** perpanjang 1 minggu (maksimal sekali). Kalau masih kurang, perlakukan sebagai DI TENGAH.
4. **Gate:** kreator memutuskan. Gate ini selalu berhenti, termasuk di mode `otomatis`.
5. Catat keputusan di tabel Keputusan TRACK.md, ubah `tahap`, perbarui tabel dan log STATE, lalu pindahkan pelajaran ke `learnings.md` track.

## Menjalankan validasi paralel

- Dua track boleh divalidasi bersamaan (sesuai `batas_track_validasi`). Untuk perbandingan yang adil, samakan jumlah dan jenis paket uji serta periode tayang.
- Track di niche berbeda butuh channel berbeda. Channel baru mulai tanpa riwayat, jadi bandingkan rasio (viewed vs swiped, persentase ditonton, CTR), bukan jumlah view.
- Hasil validasi paralel dibandingkan di review portfolio (`09-review-portfolio.md`).

## Setelah validasi

- Track `aktif` masuk loop mingguan: `03-riset-konten-viral.md` sampai `08-analitik-dan-loop.md`.
- Track `drop` tetap disimpan. Alasannya harus berupa data, misalnya "median viewed vs swiped 41%, di bawah ambang gagal 50%".
