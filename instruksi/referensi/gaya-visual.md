# Gaya visual wajib: ilustrasi gerak penjelas (R3)

**Berlaku untuk semua track dan semua siklus sejak 2026-11-26, bagi agent chat maupun agent di repo.** Dipilih kreator. Pengecualian hanya T01 siklus 001, yang dirender sebelum aturan ini; T01 siklus 001 dan T02 siklus 001 bukan acuan. QA otomatis menandai **kritis** bila scene siklus baru tidak punya `shots`.

Dipakai bersama `instruksi/referensi/gaya-cerita.md` (cerita) dan `hasil/learnings-global.md` (kepadatan dan fondasi). Dasar pengamatan: Kurzgesagt "Dying Is Complicated", dianalisa per kalimat dan per frame, lalu dua klipnya direproduksi di Remotion (`produksi/REFERENSI-GAYA.md`, bagian R3). **Yang ditiru hanya teknik.** Tokoh, aset, huruf, musik, warna merek, dan susunan adegan mereka tidak disalin.

## 1. Prinsip

1. **Satu kalimat, satu gambar.** Setiap kalimat narasi punya shot sendiri yang menggambarkan isi kalimat itu secara harfiah. Kalimat "penumpang bergelantungan di pintu dan duduk di atap" berarti kereta penuh orang di pintu dan atap, bukan tokoh berdiri di depan gedung. Kalimat sangat pendek (kurang dari 4 kata) boleh berbagi shot dengan kalimat sebelumnya.
2. **Ganti gambar di batas kalimat.** Pergantian shot jatuh di awal kalimat, paling jauh 0,4 detik sebelum atau sesudahnya, memakai waktu kata dari caption. Panjang shot mengikuti panjang kalimat (biasanya 3 sampai 8 detik).
3. **Label dan sorotan jatuh tepat di katanya.** Label muncul saat kata bendanya diucapkan, sorotan (glow, perubahan warna) muncul saat kata kerjanya diucapkan.
4. **Tidak ada frame yang diam.** Kamera selalu melayang pelan, benda latar mengambang dan berputar, tokoh bernapas dan berkedip. Diam total hanya untuk jeda dramatis yang disengaja.
5. **Metafora di naskah digambar harfiah.** Kalau narasi bilang "mesin canggih", gambarnya mesin. Metafora besar dari `gaya-cerita.md` menjadi jangkar visual yang dipakai berulang.
6. **Skala adalah kamera.** Cerita berpindah dari gambaran besar ke detail (negara → kota → stasiun → kereta → kursi) dan kembali. Satu **jangkar** (peta, siluet, atau benda metafora) muncul berulang untuk menunjukkan posisi cerita.
7. **Angka dibuat bisa dihitung.** Proporsi menjadi grid titik yang diwarnai, jumlah menjadi benda yang muncul satu per satu dengan penghitung, waktu menjadi garis waktu dengan penanda, perbandingan menjadi dua panel berdampingan.
8. **Benda diberi wajah bila perlu emosi.** Sel, kereta, dokumen, atau lembaga boleh punya mata titik dan mulut. Perubahan keadaan harus terbaca tanpa suara (lelah, takut, senang).
9. **Warna menandai keadaan.** Hangat dan terang untuk hidup atau berhasil, dingin, pudar, atau kelabu untuk mati, gagal, atau ditolak. Perubahan keadaan ditunjukkan dengan perubahan warna di benda yang sama.
10. **Kedalaman lewat blur.** Benda latar depan besar dan blur, benda jauh kecil dan pudar, fokus di tengah.
11. **Teks di layar minimal.** Label pil pada benda (maksimal 3 kata atau satu angka), legenda kecil bila perlu, catatan kaki kecil untuk keterangan tambahan. Tanpa papan teks atau kotak penjelasan.
12. **Bubble hanya untuk sikap atau lelucon.** Satu bubble kecil sesekali (maksimal sekitar satu per menit), tidak mengulang narasi, tidak memuat klaim fakta.
13. **Musik tidak berhenti.** Jeda narasi diisi musik, bukan keheningan. Efek suara menempel pada kejadian (pop label, wipe, hantaman).

## 2. Gaya gambar

- **Vektor datar tanpa garis tinta.** Setiap bentuk punya isian datar, satu bayangan (lebih gelap, di sisi jauh dari cahaya), dan satu kilap (lebih terang, kecil, di sisi atas).
- **Latar gradien** dua sampai tiga warna, vinyet tipis di tepi, partikel kecil yang mengambang.
- **Glow** untuk benda penting di latar gelap (inti sel, lampu, benda yang diaktifkan).
- **Pemeran** mengikuti bahasa bentuk di `produksi/STYLE.md`: badan satu bentuk dasar, tangan dan kaki seperti selang karet, mata titik, satu aksesori penanda.
- **Palet per track** tetap sepanjang track dan tercatat di `produksi/STYLE.md`.
- Huruf label: sans geometris tebal (sekarang Avenir Next 700). Huruf khusus merek lain tidak dipakai.

## 3. Gerak dan transisi (angka dari pengukuran R3)

| Kejadian | Cara | Waktu |
| --- | --- | --- |
| Label masuk | membesar dari kecil dengan pantulan (`back` ±1,8) | ±0,2 dtk, mulai di kata yang dimaksud |
| Label keluar | mengecil sampai hilang | ±0,2 dtk, saat narasi pindah topik |
| Label pada benda bergerak | menempel dan ikut bergerak | sepanjang label tampil |
| Sorotan | glow berdenyut atau garis tepi terang | mulai di kata kerjanya |
| Masuk ke skala lebih kecil | **iris**: lingkaran bergaris putih tumbuh dari titik pada benda, isinya shot berikutnya, mempercepat | ±0,45 dtk, terbuka penuh di kata pertama kalimat baru |
| Pindah tempat di skala yang sama | **wipe**: garis putih tegak ±8 px dari kiri ke kanan, shot baru di belakang garis | ±0,4 dtk, ease-in-out |
| Masuk ke dalam benda | **dorong kamera**: benda menyala lalu kamera mendorong masuk, shot berikutnya mulai sedikit membesar lalu mengendap | 0,2 sampai 0,4 dtk |
| Kamera dalam shot | melayang pelan dan sedikit membesar | sepanjang shot |
| Kejadian kecil berulang (petir, percikan) | muncul acak, hidup 3 sampai 9 frame | rapat saat aktif, jarang saat melemah |

Transisi dipilih menurut makna: iris = masuk lebih dalam, wipe = pindah tempat atau waktu, dorong = masuk ke dalam benda, potong langsung = topik baru. Crossfade biasa hanya untuk perubahan waktu yang tenang.

## 4. Lapisan 3D (keputusan kreator 2026-11-26)

Lapisan 3D (`@remotion/three`) **disetujui** untuk shot yang butuh kamera benar-benar berputar di ruang 3D: permukaan yang dilihat miring lalu diputar, terbang melewati benda, atau orbit mengelilingi objek. **Sudah dibangun** di `produksi/remotion/src/r3/three` (opsional per siklus, cara di `produksi/PIPELINE.md`). Tandai shot seperti itu dengan `"three_d": true`; siklus yang tidak memakai lapisan 3D menulis versi 2D-nya (iris, wipe, atau dorong).

## 5. Kaitan dengan gaya cerita

| Teknik cerita (`gaya-cerita.md`) | Bentuk visualnya |
| --- | --- |
| Pembuka "kamu" di momen kunci | shot pertama memperlihatkan momen itu dari dekat, langsung bergerak |
| Satu metafora besar | jangkar visual, muncul di fondasi, kembali di penutup |
| Penanda tahap atau waktu | garis waktu, jam, atau tahun yang bergerak di sudut yang sama |
| Tebakan dipatahkan | dua panel: tebakan (pudar atau dicoret) lalu yang benar |
| Mesin insentif | tiap pihak sebagai tokoh berwajah dengan motif yang terlihat |
| Callback | aset atau komposisi yang sama kembali dengan satu perubahan |
| Steelman | warna atau suasana berubah, sisi lain ditampilkan setara |
| Penutup membingkai ulang | kembali ke jangkar atau shot pembuka dengan arti baru |

## 6. Kontrak di `03-script.json`

Tingkat atas:
```json
"anchor": { "kind": "map", "desc": "peta jalur KRL Jabodetabek, stasiun utama sebagai titik" },
"cast": ["komo", "sepuh", "aturan", "cicak"]
```
Per scene, satu shot per kalimat (urut sesuai narasi Inggris):
```json
"shots": [
  { "sentence": 1, "show": "kereta di peron mulai berjalan, pintu terbuka penuh penumpang bergelantungan, atap penuh orang duduk",
    "scale": "place", "motion": "kereta berangkat pelan lalu makin cepat; kamera dekati pintu lalu naik ke atap",
    "transition": "wipe", "labels": [{ "text": "BACK THEN", "word": "time" }],
    "faces": { "sepuh": "tired" }, "mood": "warm", "three_d": false }
]
```
- `sentence`: nomor kalimat di narasi Inggris scene itu, mulai dari 1.
- `show`: apa yang terlihat, konkret dan bisa digambar. Dilarang: "tokoh berdiri", "ikon", "teks".
- `scale`: `map`, `place`, `object`, atau `inside` (lebih kecil dari benda).
- `motion`: apa yang bergerak atau berubah di shot itu. Wajib diisi.
- `transition`: `cut`, `iris`, `wipe`, `push`, atau `hold` (meneruskan shot sebelumnya).
- `labels`: teks maksimal 3 kata dan `word` tempat label muncul (kata yang diucapkan).
- `count` (opsional): `{ "value": 72, "as": "dots|items|timeline|split" }` untuk angka yang dibuat bisa dihitung.
- `faces`, `mood`, `bubble` (opsional, maksimal 6 kata, hanya sikap atau lelucon), `three_d` (opsional).
- Footage nyata tetap boleh lewat `broll` (scene penuh), maksimal sepertiga durasi.

## 7. Cek sebelum diserahkan
- [ ] Setiap kalimat punya `shots` yang menggambarkan isinya, bukan tokoh diam atau dekorasi.
- [ ] Setiap shot punya `motion`.
- [ ] Label ditulis dengan `word` yang benar-benar ada di kalimatnya.
- [ ] Jangkar muncul minimal di fondasi, di tengah, dan di penutup.
- [ ] Angka penting punya `count`.
- [ ] Tanpa papan teks; bubble jarang dan bukan pengulang narasi.
- [ ] Orang awam bisa menjelaskan ulang prosesnya hanya dari gambar.

## 8. Untuk agent repo
- Contoh kerja: `produksi/remotion/src/experiment/` (scene per kalimat s04–s06, pemeran T02, reproduksi R3 `repAsd.tsx` dan `repAsddd.tsx`).
- **Mesin R3** ada di `produksi/remotion/src/r3/`: agent menulis komponen adegan per shot di `04-shots.tsx` (folder siklus), mesin mengatur waktu dari caption per kata, label, transisi, dan efek suara. Cara dan perintah cek: `produksi/PIPELINE.md` bagian "Mesin R3". Jangan memakai mesin lama untuk siklus baru.
- Thumbnail memakai kontrak `thumbnails` di `produksi/CONTRACT.md`.
