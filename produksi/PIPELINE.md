# Pipeline produksi otomatis

Satu perintah menjalankan satu siklus dari riset sampai paket review. Kreator hanya menonton, lalu menyetujui atau meminta revisi.

```
node --env-file=.env scripts/pipeline/run.mjs --track T01 --siklus 001        # jalankan / lanjutkan
node --env-file=.env scripts/pipeline/run.mjs --track T01 --siklus 001 --dry  # lihat status tahap
node scripts/pipeline/autofix.mjs --track T01 --siklus 001                    # perbaikan mekanis (salah ucap)
node --env-file=.env scripts/pipeline/approve.mjs --track T01 --siklus 001    # setujui (ketik SETUJU)
node scripts/pipeline/approve.mjs --track T01 --siklus 001 --revisi "catatan" # minta revisi
```

Gaya wajib: ilustrasi gerak penjelas R3 (`instruksi/referensi/gaya-visual.md`); QA menandai kritis bila scene siklus baru tidak punya `shots` (kecuali scene footage). Scene dengan `shots` dirender mesin R3 (bagian "Mesin R3" di bawah). T01-001 tetap dirender dengan mesin lama; T02-001 diproduksi ulang dengan R3 3D tetapi bukan acuan gaya.

## Tahap

| Tahap | Jenis | Hasil | Idempotent |
| --- | --- | --- | --- |
| riset-brief | LLM | `01-riset-viral.md`, `02-brief.md` | ya |
| naskah | LLM | `03-script.json`, `03-naskah.md` (sumber per klaim, stop-slop ≥ 35) | ya |
| visual | LLM | `anchor`, `cast`, dan `shots` per kalimat di `03-script.json`, arah visual per scene di `03-visual.json`, `broll` untuk scene dunia nyata, dan komponen adegan `04-shots.tsx` | ya |
| kontrak | skrip | `build-visual.mjs --check`: shots, anchor, cast, dan komponen tiap scene di `04-shots.tsx` | ya |
| tts-en, caption-en | skrip | audio, caption (disamakan dengan naskah, hasil STT mentah disimpan) | ya |
| still | skrip + gate | `scripts/pipeline/still.mjs`: still per scene R3 → `04-still.json` dinilai rubrik (agent) lalu disetujui kreator. Hanya naskah `visual_spec` versi 2; berhenti kode 3 sampai lulus. Berlaku juga di mode `otomatis`. | ya |
| footage | skrip | pilih otomatis footage nyata berlisensi (skor tag + durasi, tanpa duplikat), unduh, catat lisensi | ya |
| adegan | skrip | scene footage jadi latar nyata | ya |
| render | skrip | Master16x9 + semua Shorts di `shorts_cuts` | ya |
| qa | skrip | `05-qa.auto.json/.md`; **kritis = berhenti** | selalu jalan |
| paket-review | skrip | `hasil/review/<ID>-<siklus>/index.html` | selalu jalan |

Tahap LLM berjalan lewat `claude -p` bila CLI `claude` ada di PATH. Kalau tidak, penggerak mencetak prompt (`scripts/pipeline/prompts/`) dan keluar dengan kode 3. Di sesi Claude Code, "lanjut T01" menjalankan tahap itu. Bagian `claude -p` belum teruji di mesin ini karena CLI belum terpasang.

## Mesin R3 (`shots`): spesifikasi animasi

Bagian ini adalah sumber kebenaran untuk **cara menggerakkan dan merender** di Remotion. Tampilan (bentuk, rendering, material, cahaya, kedalaman, tipografi) diatur di `produksi/STYLE.md`; arsitektur aset dan gate kualitas visual ada di bagian 9 dan 10 di bawah. Apa yang harus digambar per scene datang dari penulis lewat `shots` (di `03-script.json`) dan `03-visual.json` (`instruksi/referensi/gaya-visual.md`). Penulis tidak menulis kode; lapisan ini memutuskan *bagaimana* sebuah arah visual dianimasikan.

Kode bersama ada di `produksi/remotion/src/r3/`:

| Modul | Isi |
| --- | --- |
| `kit.tsx` | primitif 2D SVG, waktu, warna, kamera 2D, parallax |
| `count.tsx` | penghitung |
| `engine.tsx` | waktu shot, transisi, label, efek suara, Shorts |
| `registry.ts` | pemindai `04-shots.tsx` |
| `cast/` | pemeran 2D per track |
| `three/` (`@r3/three`) | lapisan 3D: `World`, `Post`, `s3` |
| `soft/kit.tsx` | pustaka 3D lembut: `sc`, kamera bernama, benda dan wajah |
| `art/` (`@r3/art`) | pustaka aset ilustrasi 2D/2.5D bersama (bagian 9): `Shade`, air, langit, kota, atmosfer |

Logika waktu dan validasi di Node ada di `scripts/produksi/r3.mjs`, dipakai oleh `build-visual.mjs`, `render.mjs`, dan `scripts/pipeline/qa-r3.mjs`. Contoh scene 2D lengkap: `produksi/contoh-r3/T02-001-s06/` (s06 naskah T02-001 ditulis ulang; render T02-001 tidak berubah). Contoh 3D yang dipakai sebagai acuan: T02 siklus 002 sampai 004 (pustaka `soft`) dan T01 siklus 004 (`s3` sendiri di `parts/base.tsx`). T02-001 bukan acuan gaya.

### Alur per siklus
1. Naskah: `anchor`, `cast`, dan `shots` per scene di `03-script.json`. Arah visual rinci per scene ada di `03-visual.json`, yang wajib bila naskah menulis `"visual_spec": "03-visual.json"`. Kontrak di `produksi/CONTRACT.md`.
2. Agent menulis `04-shots.tsx` di folder siklus (di samping `03-script.json`): satu komponen React per shot.
   - Gambar dan geraknya mengikuti `show`/`motion` shot dan entri `03-visual.json` scene itu (subjek, anatomi, lingkungan, perilaku, komposisi, animasi).
   - Mesin mengurus waktu, transisi, label, efek suara, dan Shorts.
3. `build-visual.mjs` memvalidasi kontrak dan memastikan tiap scene punya komponen. Scene R3 ditulis ke `04-stage.base.json` sebagai `{ "engine": "r3" }`.
4. Setelah TTS dan caption, `render.mjs` menghitung waktu tiap shot dan label dari caption per kata, lalu mengirimnya ke komposisi. `Video.tsx` memakai mesin R3 untuk scene yang punya `shots`.

### 1. Waktu (dikunci ke caption per kata)
- **Batas shot:**
  - Shot ke-n mulai di kata pertama kalimat `sentence`-nya.
  - Shot pertama mulai di awal scene.
  - Shot berakhir saat shot berikutnya mulai.
  - Kalimat yang tidak punya shot sendiri ikut shot sebelumnya.
- **Label:** membesar dengan pantulan (±0,2 dtk) tepat di awal `word`-nya, lalu mengecil hilang ±0,25 dtk sebelum transisi berikutnya.
- **Waktu kata:** selalu diambil lewat `word()` (2D) atau `a.w()` (3D). Detik dari caption tidak boleh ditulis tangan.
- **Pemetaan ke `03-visual.json`:**
  - `animation.sequence` dipetakan ke kunci waktu dalam shot.
  - Langkah yang terikat kata ("saat kata *engulf*") memakai `word("engulf")`.
  - Langkah tanpa kata dibagi rata pada sisa durasi shot dengan `seg`/`keys`.
- **Kalimat pendek** (kurang dari 4 kata) boleh berbagi shot dengan kalimat sebelumnya. Jeda dramatis boleh nyaris diam, tapi kamera tetap melayang.

### 2. Kamera
Kamera melayani penjelasan: setiap gerak kamera harus menjawab "apa yang sekarang perlu dilihat penonton". Gerak dekoratif hanya berupa drift bawaan.

| Gerak | Kapan dipakai | 2D (`kit.tsx`) | 3D (`soft` / `three`) | Waktu dan easing |
| --- | --- | --- | --- | --- |
| Drift (bawaan) | selalu, supaya tidak ada frame mati | otomatis di `engine.tsx` (±9 px, zoom naik 4,5% sepanjang shot); `drift: false` bila komponen mengatur kamera sendiri | jarak dan yaw `[a, b]` berbeda sedikit | sepanjang shot, sinus pelan |
| Dolly masuk/keluar | memperkenalkan detail / mengembalikan konteks | `Layer` dengan `cam.z` naik/turun | `CAMS.push` / `CAMS.pull`, atau `d` dari besar ke kecil | 1,5 sampai 4 dtk, `inOut(cubic)` |
| Pan | memindah perhatian di bidang yang sama | `cam.x` bergeser | yaw berubah, `at` tetap | 1 sampai 3 dtk, `inOut(sin)` |
| Tracking | mengikuti subjek bergerak | `cam.x/y` = posisi subjek dikurangi offset tetap, dihaluskan | `at` = posisi subjek tiap frame | ikut subjek; offset berubah pelan |
| Orbit | memperlihatkan bentuk 3D atau sisi lain | (tidak; pakai 3D) | yaw `a→b` minimal 20° (`CAMS.left`/`right`) | 3 sampai 8 dtk |
| Parallax | menegaskan kedalaman saat kamera bergerak | `Layer d`: latar 0 sampai 0,3, lingkungan 0,6, subjek 1, latar depan 1,3 sampai 1,8 | otomatis dari perspektif | mengikuti gerak kamera |
| Push-through | masuk ke dalam benda (pipa, sel) | transisi `push`, atau `cam.z` membesar sampai benda memenuhi layar lalu shot baru mulai 1,14× | `d` menuju 0 menembus permukaan, `Post` blur naik di akhir | 0,6 sampai 1,2 dtk, `in(cubic)` lalu shot baru `out(cubic)` |
| Transisi skala | pindah skala (kota → jalan → pipa) | iris dari titik pada benda, atau dolly + crossfade lapisan | dolly sangat besar, lingkungan skala baru diganti saat layar penuh | 0,45 sampai 1,5 dtk |
| Focus shift | narasi pindah dari satu subjek ke subjek lain | `Blur b` dipindah antar `Layer` | DOF `Post` (fokus pada jarak subjek baru) | 0,4 sampai 0,8 dtk |
| Reveal | membuka konteks yang tadinya tertutup | `cam.z` mundur, latar depan bergeser keluar bingkai | `CAMS.pull` atau `pitch` naik ke `top`/`map` | 1,5 sampai 3 dtk |

Kamera 3D bernama di `soft` (`CamName`):
- Sudut dan jarak: `wide`, `mid`, `close`, `top`, `low`, `left`, `right`, `map`.
- Gerak: `push`, `pull`.

Masing-masing berupa pasangan `[awal, akhir]` yang diinterpolasi sepanjang shot. Kamera bebas berbentuk `[Cam, Cam]` dengan `{ at, d, yaw, pitch, fov }`.

### 3. Gerak benda
| Prinsip | Aturan | Alat |
| --- | --- | --- |
| Easing | Tidak ada gerak linier, kecuali aliran kontinu (sungai, partikel). Masuk/keluar memakai `inOut(cubic)`; muncul memakai `pop` (back 1,8); hilang memakai `out` (back 1,5). | `seg`, `pop`, `out`, `keys`, `go` |
| Anticipation | Gerak besar didahului gerak kecil berlawanan (5 sampai 10% jarak, 0,1 sampai 0,2 dtk). | `keys(t, [a-0.15, a, b], [0, -0.08, 1])` |
| Follow-through | Benda berhenti dengan sedikit melewati target lalu kembali (overshoot 3 sampai 6%). Bagian lunak (ekor, rambut, pseudopodia) berhenti lebih lambat dari badan. | `Easing.out(Easing.back(1.2))`, delay 0,05 sampai 0,15 dtk per bagian |
| Secondary motion | Subjek utama punya satu gerak kecil yang terus jalan (napas, denyut membran, kedip) dengan amplitudo kecil (2 sampai 4% ukuran). | `float`, `bob`, sinus dengan seed berbeda |
| Organik | Bentuk lunak berubah bentuk saat bergerak: memanjang ke arah gerak, memendek saat berhenti. | path SVG dengan titik kontrol dari `t`; skala non-seragam |
| Floating | Benda di cairan atau udara melayang dengan dua sinus berbeda frekuensi di x dan y. | `float(t, amp, seed)` |
| Rotasi | Benda bebas berputar pelan (≤ 15°/dtk), kecuali mesin yang memang berputar. | `R(i)` untuk arah dan laju |
| Pulse | Sorotan berdenyut 1,5 sampai 2 Hz, maksimal 3 denyut, lalu tetap. | `Glow pulse`, `GlowEdge` |
| Morph | Perubahan keadaan pada benda yang sama (tetes → uap, bentuk A → B) lewat interpolasi titik path atau skala/opasitas silang 0,4 sampai 0,8 dtk. | `mix` per titik, `lerpColor` |
| Squash and stretch | Hanya untuk benda lunak atau yang jatuh/memantul (tetes air, sel). Volume dijaga: `sx × sy ≈ 1`, maksimal 25%. | skala non-seragam dari kecepatan |
| Partikel | Atmosfer (lapisan 5) tipis dan lambat; partikel bermakna (molekul, tetes hujan) punya arah sesuai fisika. | `Particles`, `Sparks`, `Flow` (`soft`) |
| Acak terkendali | Semua variasi dari seed: `R(i, k)` dan `pick`. **Dilarang `Math.random`, state, dan efek.** Hasil render sama setiap kali dijalankan. | `R`, `pick` |

Batas: maksimal tiga benda bergerak menonjol bersamaan; selebihnya bergerak kecil. Gerak yang tidak menjelaskan apa pun dibuang.

### 4. Transisi
Transisi dipilih menurut makna naratif (kolom `transition` di `shots`, rinciannya di `03-visual.json` `animation.transition`).

| Transisi | Makna | Status | Cara |
| --- | --- | --- | --- |
| `cut` | topik baru | ada | langsung |
| `hold` | kalimat masih bicara gambar yang sama | ada | isi `null` di `04-shots.tsx`, label tetap muncul di katanya |
| `iris` | masuk ke skala lebih kecil | ada | 0,45 dtk, lingkaran bergaris putih dari titik `from`, mempercepat, terbuka penuh di kata pertama |
| `wipe` | pindah tempat atau waktu di skala sama | ada | 0,4 dtk, garis putih 8 px kiri ke kanan, berpusat di kata pertama |
| `push` | masuk ke dalam benda | ada | shot lama menyala lalu didorong masuk 0,3 dtk ke titik `from`; shot baru mulai 1,14× lalu mengendap 0,5 dtk |
| Match cut | dua benda berbentuk sama di dua skala/tempat | dalam shot | posisi dan ukuran benda dikunci sama di akhir shot A dan awal shot B, transisi `cut` |
| Shape morph | benda berubah jadi benda lain | dalam shot | morph (bagian 3) di akhir shot, lalu `hold` atau `cut` |
| Scale transition | kota → pipa → tetes | dalam shot | dolly / push-through (bagian 2) dalam satu komponen yang menggambar dua skala |
| Camera transition | kamera terus bergerak melintasi batas shot | dalam shot | satu komponen untuk dua kalimat (shot kedua `hold`) dengan kamera kontinu |
| Mask reveal | konteks dibuka lewat bentuk | dalam shot | `clipPath` bentuk yang membesar, mengikuti benda |
| Dissolve | perubahan waktu yang tenang | belum ada sebagai jenis | opasitas silang dalam satu komponen (0,6 sampai 1 dtk); hemat |
| Environment transition | lingkungan berubah, subjek tetap | dalam shot | subjek di lapisan 3 tetap, lapisan 1 sampai 2 berganti dengan wipe lembut atau perubahan cahaya |
| Object-based | benda yang lewat menutup layar | dalam shot | benda latar depan besar melintas, shot baru di baliknya (`hold` + kamera kontinu) |

Aturan:
- Transisi shot pertama scene hanya berlaku bila scene sebelumnya juga R3; selain itu potong langsung.
- Efek suara otomatis: `pop` di setiap label, `whoosh` di setiap transisi.
- Transisi "dalam shot" ditulis di komponen. Kontrak `transition` tidak berubah.

### 5. Cahaya dan atmosfer
| Efek | 2D | 3D | Aturan |
| --- | --- | --- | --- |
| Ambient | warna latar `Backdrop` | `SKY.<nama>.amb`, hemisphere light di `World` | sesuai suasana di STYLE.md 3.4 |
| Kunci + bayangan | shading datar bertingkat dengan `clipPath` (bagian 9), bayangan kontak | directional light + shadow map; `soft()` | satu arah per scene, bayangan memakai hue latar |
| Rim | `GlowEdge` tipis | `soft(c, glow)` | memisahkan subjek dari latar gelap |
| Glow | `Glow` (opsional `pulse`) | `glow` pada material | hanya sumber cahaya nyata atau sorotan |
| Kabut / kedalaman | geser warna ke langit (`lerpColor`) per lapisan; `Blur` hanya untuk latar depan ekstrem | `fog` di `World`, DOF di `Post` | makin jauh makin dekat ke warna langit (STYLE.md 4.2) |
| Partikel atmosfer | `Backdrop particles`, `Particles` | `Env` di `soft` | tipis, lambat, tidak menutupi subjek |
| Langit / matahari / vinyet | `Backdrop`, `Frame vignette` | `Post` (gradien langit, matahari, vinyet) | vinyet 0,4 sampai 0,6 |

### 6. Tipografi di layar
- **Label:**
  - Opsi `labels` di `shot(...)` memberi posisi tetap.
  - `"own"` dipakai bila komponen menggambar label sendiri (`useLabel` + `Pill`). Ini wajib untuk label pada benda bergerak.
  - Di 3D, label berupa pin `L(teks, [x,y,z], penunjuk, warna)`, yang diproyeksikan dan dijepit ke zona aman.
- **Teks lain:**
  - Angka yang dihitung memakai `count.tsx`: `Dots`, `Items`, `Timeline`, `Split`.
  - Catatan kaki memakai `Footnote`.
  - Bubble memakai `Bubble`, otomatis dari kontrak.
- **Zona aman:**
  - 16:9: label di atas y 860.
  - 9:16: label dijepit ke setengah lebar 303 px dari `focus`, dan tidak masuk sepertiga bawah.
- **Animasi teks:** masuk dengan `pop`, keluar dengan `out`. Teks tidak diketik huruf demi huruf.

### 7. 2D, 2.5D, dan 3D
| Perlakuan | Dipakai untuk | Alat | Catatan |
| --- | --- | --- | --- |
| **2D** (bahasa utama) | diagram, penghitung, perbandingan, potongan datar, label padat | `kit.tsx`, `count.tsx`, `cast/` | paling cepat dirender, kontrol bentuk organik paling halus (path SVG) |
| **2.5D** | lingkungan berlapis, parallax, kamera bergerak di bidang, transisi kedalaman | `Layer` (`d`, `blur`) + `Blur` + `float` | default untuk scene lingkungan; murah, tetap lembut |
| **3D** | kamera benar-benar berputar (orbit, permukaan dilihat miring lalu diputar, terbang menembus struktur), benda yang bentuknya harus dipahami dari banyak sisi | `soft` (`sc`, `CAMS`, `SKY`) untuk adegan bertokoh dan benda membulat; `three` (`s3`, `env`) untuk set yang sudah ada dan peta | butuh `--gl=angle`; lebih lambat; jaga bentuk tetap membulat (STYLE.md 2.2) |

Aturan pemilihan:
- `dimension` di `03-visual.json` menyatakan kebutuhan. Mesin memilih alatnya.
- 3D hanya bila nilai penjelasannya nyata. Jangan memaksa semua scene jadi 3D.
- `three_d` di `shots` hanya penanda informatif. 3D dipilih lewat import `@r3/three` atau `r3/soft/` di file adegan.

**Lapisan 3D `three` (`s3`):**
- Bentuk panggilan: `s3({ env, cam: [dari, ke], items: (a) => <>…</>, labels: [[teks, [x,y,z], penunjuk, warna]], vx, vd })`.
  - `a.t` adalah detik shot.
  - `a.w("kata", cadangan)` adalah detik kata.
- Koordinat:
  - x ke kanan, y ke atas (tanah 0), z ke arah kamera.
  - Bidang utama kira-kira x -10..10.
  - Kamera ditulis `{ at, d, yaw, pitch, fov }`.
- `env`: jkt, hot, jktDay, jktGrey, tokyo, yard, yardDusk, yardNight, paper, grey, night, dusk, sea, map, mapStudio.
- Benda:
  - `props.tsx`: kereta, rel, kapal, pabrik, angka yang bisa dihitung.
  - `map.tsx`: peta jangkar.
  - `sets.tsx`: set siap pakai.
  - `cast/T02.tsx`: pemeran 3D.

**Pustaka `soft` (`r3/soft/kit.tsx`):**
- Cara memuat: diimpor dengan path relatif, misalnya `../../../../../produksi/remotion/src/r3/soft/kit`.
- Bentuk panggilan: `sc(sky, (a) => <>…</>, [L("1 HOUR", [x,y,z], "down", GRN)], { cam, vx, vd, floor })`.
- Langit:
  - `SKY`: night, lamp, cold, day, warm, sea, mint, grey, dan lainnya.
- Bentuk dasar:
  - `Ball`, `Box` (`rr` membulat), `Cyl`.
  - `Hose`/`Rod` untuk tangan selang.
- Gerak:
  - `In` (muncul), `Move` (pindah dengan lengkung `lift`), `go`, `bob`, `lerp3`.
- Wajah dan tokoh:
  - `Face` dengan `Expr` calm, happy, sad, shock, stern, smug, busy.
  - Tokoh `Guy` dengan aksesori `Acc`.
- Benda siap pakai:
  - Uang dan dokumen: `Coin`, `Stack`, `Pile`, `Bills`, `Wallet`, `Card`, `Envelope`.
  - Aliran: `Flow`, `Pipe` (pipa berisi aliran air), `Cable`.
  - Tempat dan bangunan: `House`, `Shop`, `City`, `Road`, `Gate`, `Bank`, `Tower`, `Server`.
  - Perangkat: `Phone`, `Router`, `Terminal`.
  - Lain-lain: `Cell`, `Bucket`, `Clock`, `Grid`.

**Shorts:** `vx` adalah titik dunia di tengah layar, `vd` adalah pengali jarak kamera (default 1,75 di `three`, 1,7 di `soft`). Kamera direka ulang, tidak sekadar dipotong.

### 8. Batasan implementasi
- **Koordinat:** logis 1920×1080 untuk 2D. Komposisi menskalakan ke 1080×1920 (`Short9x16`, `ClipID9x16`, `ThumbnailShort`). Untuk 2D vertikal, mesin memotong strip 607 px di sekitar `focus`.
- **Determinisme:** semua gerak adalah fungsi murni dari `t`. Tanpa `Math.random`, `useState`, `useEffect`, atau waktu dinding. Acak hanya lewat `R`/`pick`.
- **WebGL:** siklus yang mengimpor `@r3/three` atau `r3/soft/` dirender dengan `--gl=angle`. `render.mjs` memeriksa `04-shots.tsx` dan semua `.tsx` di folder siklus, termasuk `parts/`.
- **Cache:** geometri, material, dan tekstur 3D di-cache per modul. Jangan membuat geometri baru per frame.
- **Komponen hilang:** dirender sebagai "ADEGAN BELUM ADA" dan ditandai kritis oleh QA G6.
- **Komponen baru:**
  - Dibuat dulu di folder siklus atau contoh.
  - Dipindah ke `kit.tsx`/`soft` hanya setelah terbukti dipakai ulang. Jangan membuat modul kosong.

### 9. Arsitektur aset ilustrasi (Fase 3.5)
Pembagian tanggung jawab:

| Lapisan | Menentukan | Tempat |
| --- | --- | --- |
| **Aset ilustrasi** | seperti apa benda terlihat: siluet, bagian, material, keadaan | pustaka bersama `@r3/art` (lihat daftar di bawah); aset baru dibuat di `parts/` siklus, lalu dipromosikan ke `r3/art/` setelah lulus gate still |
| **Scene** | susunan benda, lapisan, kamera | komponen shot di `04-shots.tsx` |
| **Animasi** | gerak dan deformasi | parameter aset sebagai fungsi `t` (`seg`, `keys`, `pop`), di komponen shot |
| **Engine** | waktu, label, transisi, render, Shorts | `r3/engine.tsx` (tidak berubah untuk gaya) |

**Pustaka `@r3/art`** (Fase 3.5, dari benchmark P01b yang lulus putaran 6):

| Modul | Komponen | Pakai untuk |
| --- | --- | --- |
| `core` | `Shade` (T1: nada bertingkat + highlight), `rr` (path kotak membulat), `useSid`, tipe `Tones` | setiap benda L1/L2: gambar path badan, bungkus dengan `Shade` |
| `water` | `Drop2` (tetes, parameter `flat`, `refl`, squash `sx/sy`), `dropPath`, `WATER` | tetes, gelembung, permukaan air kecil |
| `sky` | `Sky` (gradien senja + matahari), `Cloud` (gugus lobus, bawah menyala), `SKY` | langit senja dan awan |
| `city` | `Block` (gedung 3/4 + perabot atap), `Gables` (pelana), `Office`, `WaterTower`, `FarCity` (siluet jauh, opsi `gap`), `Elevated` (kereta layang), `Tree`, `Lamp`, `RoofCorner` (latar depan atap + talang), keluarga nada `MID`, `TEAL`, `VIOLET`, `RIM` | lingkungan kota di semua track |
| `atmos` | `RainLayer`, `MistBand` | hujan berlapis, kabut antar-lapisan |

Contoh pemakaian lengkap: `produksi/contoh-r3/P01b-s01-benchmark/04-shots.tsx`. Mengubah komponen pustaka mengubah semua siklus yang memakainya. Jadi ubah hanya dengan menambah parameter baru (nilai bawaan tetap), lalu cek hash still P01b tidak berubah (bagian Cek).

**Alur hibrida pembuatan aset:**
1. **Aset tulisan tangan (wajib untuk L1).**
   - Siluet dan bagian ditulis sebagai `path` (bezier) yang dirancang, bukan rakitan lingkaran dan kotak.
   - Bentuk dikendalikan beberapa parameter keadaan, misalnya `flat` 0..1 atau `open` 0..1, lewat interpolasi titik kontrol.
   - Boleh dibuat di editor vektor lalu disalin sebagai data path, asalkan semua warnanya diambil dari keluarga palet.
2. **Aset parametrik (L2, L3).** Satu komponen per tipe (`Building type="pelana"`, `Tree lobes={5}`) dengan variasi ber-seed `R()` dan irama yang terencana.
3. **3D** (`soft`, `three`) hanya bila nilai penjelasannya nyata (bagian 7). 3D tidak dipakai untuk "menambah detail".
4. **Raster tidak dipakai** untuk ilustrasi, karena tidak bisa diwarnai ulang, dideformasi, atau dianimasikan per bagian. Pengecualian hanya untuk footage nyata (`broll`).

**Teknik rendering datar bertingkat di SVG** (`produksi/STYLE.md` 2.2, resep `REFERENSI-GAYA.md`):

| Teknik | Cara | Status alat |
| --- | --- | --- |
| Bayangan dan highlight bentuk (T1) | `clipPath` dari path badan, lalu di dalamnya salinan badan yang digeser ke arah cahaya, diisi nada dasar di atas isian bayangan | primitif SVG; helper `Shade` diusulkan bila terbukti berulang |
| Highlight garis (T2) | path yang di-inset dengan `stroke-linecap="round"` + `stroke-dasharray` | primitif SVG |
| Detail permukaan (T3) | sebaran ber-seed `R()` dalam `clipPath` badan, kepadatan menurut posisi | primitif SVG |
| Gugus lobus (T4) | beberapa lingkaran dengan isian sama dalam satu `<g>`, ditambah satu lapisan bayangan yang di-clip | primitif SVG |
| Geser warna kedalaman (T5) | `lerpColor(warna, langit, k)` per lapisan | `kit.tsx` (ada); opsi `haze` pada `Layer` diusulkan |
| Kaca/air tembus (T9, T10) | `fillOpacity` + latar tembus + T1/T2 | primitif SVG |

**Klasifikasi kemampuan** (bukti di `hasil/review/2026-11-26-audit-visual-P01.md`):

| Kelas | Arti | Kemampuan |
| --- | --- | --- |
| A | Sudah ada dan cukup | path kustom, `clipPath`, gradien, opasitas, transform, `Layer`, kamera, `R()` |
| B | Ada tapi belum dipakai dengan baik | `clipPath` untuk shading bertingkat, `stroke-dasharray`, `lerpColor` untuk kedalaman |
| C | Butuh komponen ilustrasi reusable | aset per subjek, bangunan bertipe, gugus lobus, helper bayangan kontak |
| D | Butuh kemampuan engine baru | **belum ada yang terbukti** |
| E | Lebih baik aset tulisan tangan | siluet dan bagian subjek L1 |

**Perubahan engine hanya berdasarkan bukti.** Setiap usulan perubahan wajib menjawab:
1. Masalah visual apa yang diselesaikan.
2. Kenapa kemampuan yang ada tidak cukup, dibuktikan dengan benchmark.
3. Apakah perubahan itu milik engine atau milik aset.
4. Dampaknya ke track yang sudah berjalan.
5. Cara mengujinya.

Engine tetap fokus pada waktu, kamera, dan render; ia tidak menjadi editor ilustrasi.

### 10. Alur still-dulu dan gate kualitas visual
1. **Spesifikasi lengkap.** Scene lulus gate kesiapan (`gaya-visual.md` bagian 7, termasuk bidang versi 2). Validator: QA G7 (`validateVisualSpec`, aturan V-1 sampai V-14 di CONTRACT.md).
2. **Still dulu.**
   - Gambar komposisi utama sebagai satu frame diam, lalu render dengan `--still <scene> --at <detik>`.
   - Tambahkan close-up subjek L1, detail lingkungan, dan, bila berguna, satu sudut kamera alternatif.
   - Still harus sudah tampak di-art-direct tanpa bantuan gerak, kamera, atau efek.
3. **Nilai still** dengan rubrik di bawah, berdampingan dengan galeri acuan `produksi/acuan-visual/` (indeks di `STYLE.md` 10.1). Isi `04-still.json`: skor per dimensi, catatan, dan `lulus`. Minta kreator melihat still dan mengisi `kreator.disetujui`.
4. **Animasi** hanya setelah still lulus. Gerak menghidupkan ilustrasi yang sudah bagus, bukan menutupi kekurangannya.
5. **Render video** dan nilai ulang dimensi gerak.

**Rubrik kualitas visual** (skor 1 sampai 5):
- 5 berarti siap produksi.
- 3 berarti jalan, tapi masih tampak generik.
- 1 berarti syarat tidak terpenuhi.

| Dimensi | Pertanyaan | Batas minimum |
| --- | --- | --- |
| Siluet | Apakah subjek utama khas dan dirancang? | **4** |
| Kompleksitas bentuk | Apakah geometri sepadan dengan kerumitan subjek? | |
| Hierarki detail | Apakah detail penting diutamakan (L1 > L2 > L3)? | |
| Material | Apakah material bisa dibedakan satu sama lain? | **4** (bersama cahaya) |
| Cahaya | Apakah cahaya memperlihatkan bentuk dan kedalaman? | **4** (bersama material) |
| Lingkungan | Apakah scene terasa sebagai satu dunia yang utuh? | **4** (bersama komposisi) |
| Komposisi | Apakah hierarki fokus jelas? | **4** (bersama lingkungan) |
| Kedalaman | Apakah latar depan, tengah, dan belakang meyakinkan? | |
| Gerak | Apakah gerak halus dan bertujuan? (dinilai setelah animasi) | |
| Kontinuitas | Apakah hubungan ruang terjaga? (dinilai setelah animasi) | |
| Akurasi fakta | Apakah ciri fisik dan ilmiah benar? | **4** |
| Polesan | Apakah scene terasa di-art-direct secara profesional? | **4** |

- Penilaian agent dari still adalah perkiraan. Skor lulus final butuh penilaian manusia. Bila alat tidak memungkinkan penilaian objektif, misalnya karena still hanya dilihat sebagai JPEG kecil, tulis keterbatasannya, jangan klaim lulus.
- Render yang berhasil tidak sama dengan kualitas visual yang berhasil.

**Gate di pipeline:**
- Tahap `still` di `run.mjs` (setelah caption, sebelum footage dan render) hanya lolos bila `04-still.json` memenuhi semua syarat berikut:
  - setiap scene R3 punya skor minimal 4 pada dimensi wajib;
  - setiap scene bernilai `lulus: true`;
  - `kreator.disetujui: true`;
  - file itu lebih baru dari `04-shots.tsx`.
- Perintah:
  - render dan buat kerangka penilaian: `node scripts/pipeline/still.mjs --track <ID> --siklus <NNN>`;
  - cek status: tambah `--cek`.
- Agent yang tidak bisa melihat gambar tidak boleh mengisi skor. Ia menyerahkan still ke kreator.

### Menulis `04-shots.tsx`
```tsx
import React from "react";
import { Backdrop, Frame, Layer, Pill, cast, defineShots, seg, shot, useLabel, useShot } from "@r3";
const { Komo } = cast.T02;

const Pertama: React.FC = () => {
  const { t, word } = useShot();             // t = detik sejak shot mulai
  const dingin = seg(t, word("air-conditioned"), word("air-conditioned") + 0.9);
  return <Frame><Backdrop stops={["#f08a3c", "#fde6b4"]} t={t} />{/* ... */}</Frame>;
};
const Kedua: React.FC = () => { const { t } = useShot(); const p = useLabel("ROOF RIDERS"); return <Frame>{/* ... */}<Pill x={900} y={400} text="ROOF RIDERS" p={p} /></Frame>; };

export default defineShots({
  s06: [shot(Pertama, { labels: { "FIRST AC TRAIN": [1100, 236] }, from: [1100, 520] }), shot(Kedua, { labels: "own" })],
});
```
- **Struktur:** kunci = id scene, isi = komponen per shot dengan urutan sama seperti `shots`. Komponen polos (tanpa `shot(...)`) juga boleh.
- **`useShot()`** mengembalikan:
  - waktu: `t` (detik sejak shot), `T` (detik sejak scene), `dur`;
  - kata: `word(teks, n)` (detik kata diucapkan, relatif shot), `label(teks)`;
  - kontrak: `faces`, `mood`, `bubble`, `vertical`, `shot`.
- **Opsi `shot(C, {...})`:**
  - `labels`:
    - Posisi tetap ditulis `[x, y, penunjuk]` per teks.
    - `"own"` dipakai bila komponen menggambar label sendiri.
    - Tanpa opsi ini, label dijajarkan di atas.
  - `from`: titik asal iris atau dorong.
  - `focus`: x yang dijaga di tengah untuk Shorts 9:16.
  - `drift: false`: komponen mengatur kamera sendiri.
  - `bubble: "own"` / `bubbleAt`.
- **Primitif (`kit.tsx`):**
  - Bingkai dan latar: `Frame`, `Backdrop`, `Particles`.
  - Kedalaman: `Layer`, `Blur`.
  - Cahaya: `Glow`, `GlowEdge`, `Sparks`.
  - Teks: `Pill`, `Bubble`, `Footnote`.
  - Bentuk: `FlatRect`, `Shadow`.
  - Waktu: `seg`, `pop`, `out`, `keys`, `mix`, `float`.
  - Warna: `shade`, `tint`, `fade`, `lerpColor`.
  - Acak: `R`, `pick`.
- **Pemeran 2D:** `cast.T02` (Komo, Sepuh, Aturan, Cicak, `Warga`, `Gerbong`, `Rel`, `Kabel`, `Pantograf`, `Matahari`, `Awan`, `Gedung`, `Kelapa`).
  - Untuk track baru, tambah `src/r3/cast/<ID>.tsx`, lalu daftarkan di `cast/index.ts` dan di `CAST` pada `scripts/produksi/r3.mjs`.

### Cek sebelum produksi penuh
```
npm --prefix produksi/remotion run typecheck
node scripts/produksi/build-visual.mjs --track T02 --siklus 002 --check
node scripts/produksi/render.mjs --track T02 --siklus 002 --still s06            # satu gambar per shot (atau --at 1.2,5)
node scripts/produksi/render.mjs --track T02 --siklus 002 --scenes s05,s06       # render pendek, tidak dicatat di 04-assets.json
node scripts/pipeline/qa-r3.mjs --track T02 --siklus 002 [--scene s06]           # G1-G7
node scripts/pipeline/still.mjs --track T02 --siklus 005 [--cek]                  # gate still (visual_spec versi 2)
```
- Naskah di luar siklus (contoh): tambah `--script produksi/contoh-r3/<nama>/03-script.json`. Hasilnya masuk ke `produksi/render/_contoh/<nama>/`.
- Registri hanya memindai `hasil/tracks/**/04-shots.tsx` dan `produksi/contoh-r3/**/04-shots.tsx`.
- Tata letak tegak dicek dengan `--still <scene> --comp Short9x16`.
- Thumbnail:
  - Ditulis `stage: { "engine": "r3", "module": "<path 04-shots.tsx>", "scene": "thumbA" }`.
  - Thumbnail Shorts wajib ditulis di `shorts_cuts[].thumbnail`, satu per Short (lihat CONTRACT.md).
  - Caption siklus baru tampil per kalimat (`src/lib/SentenceCaptions.tsx`).

### Belum ada
- Musik latar terus-menerus.
- Shorts versi 2D masih memotong bagian tengah 16:9 di titik `focus`.
- `dissolve` belum menjadi jenis transisi kontrak.
- Animasi benchmark P01b (Phase D) belum dibuat; pustaka `@r3/art` baru teruji di still.

## Publish (Upload-Post)

Adaptor: `scripts/pipeline/publish.mjs`. Alur: `plan` menulis `06-publish.json` dan `06-publish.md` (judul, deskripsi dengan chapter dari `script.chapters`, tag, jadwal, label AI per platform; edit sebelum approve) → kreator menonton dan mengetik SETUJU di `approve.mjs` → `send` mengunggah terjadwal lewat `POST /api/upload` dengan `Idempotency-Key` sehingga tidak ganda. `status` mengambil status dan URL tayang.

```
node scripts/pipeline/publish.mjs plan   --track T01 --siklus 001
node --env-file=.env scripts/pipeline/publish.mjs send --track T01 --siklus 001 --dry   # tampilkan payload, tidak mengirim
node --env-file=.env scripts/pipeline/publish.mjs status --track T01 --siklus 001
```

**Profil per track.** Satu akun Upload-Post bisa berisi beberapa profil (satu profil = satu set channel). Tiap track menunjuk profilnya di frontmatter TRACK.md: `profil_publish: "nama-profil"`. Tidak ada profil default: track tanpa profil ditolak, dan profil yang dipakai dua track berbeda niche juga ditolak (track seniche boleh berbagi). Siklus yang sudah terkirim ke satu profil tidak bisa dikirim ulang ke profil lain tanpa diperiksa. Cek dengan `node --env-file=.env scripts/pipeline/publish.mjs akun`.

Isi `.env` (nama variabel saja): `UPLOADPOST_API_KEY` (`UPLOADPOST_PROFILE` tidak dipakai lagi). Akun, profil, dan koneksi channel dibuat kreator sendiri di Upload-Post. Aktif: YouTube, Instagram, Facebook (`platformAktif`); TikTok mati karena butuh paket berbayar. Master dikirim ke YouTube dan Facebook (video Page, `facebook_media_type: VIDEO`); Shorts ke YouTube, Instagram, dan Facebook (Reels). Master tidak dikirim ke Instagram (16:9, dan file bisa melewati 300 MB). `send` menolak jalan bila siklus belum disetujui. **Mode uji** (`send --test`, lalu `status --uji`) mengirim hanya Short pertama ke YouTube sebagai privat dan ke Facebook sebagai draf, tanpa jadwal dan tanpa Instagram/TikTok, sehingga tidak ada yang tampil publik (Instagram tidak punya mode privat atau draf lewat API ini). Facebook mengembalikan URL Reel walaupun berstatus draf (dikonfirmasi 2026-11-25). Hapus video uji di YouTube Studio dan draf Facebook setelah dicek. Label AI default konservatif (suara sintetis): `containsSyntheticMedia`, `is_aigc`, `is_ai_generated`. Teruji ke API sungguhan hanya lewat mode uji (YouTube privat dan Facebook draf, 2026-11-25); kirim terjadwal dan Instagram belum diuji. Yang tidak terdokumentasi di Upload-Post dan perlu dicek saat uji pertama: penanda Shorts di YouTube (setahu dokumennya tidak ada; Shorts dikenali dari rasio dan durasi), apakah `tags[]` atau `tags` yang diterima, dan nama bidang respons sukses. Track audio Indonesia tetap manual di YouTube Studio.

## Data YouTube (riset dan analitik)

Skrip `scripts/youtube/`, tanpa dependensi, hanya membaca. Dijalankan dari root repo.

```
node --env-file=.env scripts/youtube/riset.mjs --q "why indonesia" --q "jakarta explained" --track T02 --siklus 005
node --env-file=.env scripts/youtube/auth.mjs --track T02            # sekali per track, oleh kreator
node --env-file=.env scripts/youtube/auth.mjs --cek                  # kredensial dan channel tiap track
node --env-file=.env scripts/youtube/analitik.mjs --track T02 [--hari 28] [--video ID1,ID2] [--retensi]
```

| Variabel `.env` | Isi | Cakupan |
| --- | --- | --- |
| `YOUTUBE_API_KEY` | API key (riset) | bersama |
| `YOUTUBE_API_KEY_<ID>` | API key khusus satu track | opsional, menggantikan yang bersama |
| `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET` | OAuth client tipe Desktop app | bersama |
| `YOUTUBE_CLIENT_ID_<ID>`, `YOUTUBE_CLIENT_SECRET_<ID>` | OAuth client khusus satu track (harus sepasang) | opsional |
| `YOUTUBE_REFRESH_TOKEN_<ID>`, `YOUTUBE_CHANNEL_ID_<ID>` | ditulis `auth.mjs` | wajib per track untuk analitik |

**Persiapan di Google Cloud (kreator).** Buat project, aktifkan YouTube Data API v3 dan YouTube Analytics API, buat API key (batasi ke Data API) dan OAuth client ID tipe *Desktop app*. Di OAuth consent screen (user type External) tambahkan akun pemilik channel sebagai test user. Pada status *Testing*, refresh token kedaluwarsa setelah 7 hari; ubah ke *In production*, lalu jalankan ulang `auth.mjs`.

**Banyak track, banyak akun.** Satu OAuth client cukup untuk semua akun; yang membedakan adalah token per track. Jalankan `auth.mjs --track <ID>` untuk tiap track dan pilih akun atau channel (termasuk Brand Account) milik track itu. Tidak ada token default. Skrip menampilkan nama channel sebelum menyimpan, memperingatkan bila channel itu sudah dipakai track lain, dan `analitik.mjs` hanya memasukkan video yang cocok ke siklus track bila channelnya dipakai bersama.

**Riset** (`instruksi/03`): view >= 3x median sampai 10 video terakhir channel, 90 hari. Hasil di folder siklus (`01-outlier-youtube.md`), `validasi/`, atau `00-riset-niche/`. Tiap `--q` memakai satu panggilan `search.list`, yang jatah hariannya terpisah (default 100; panggilan lain 10.000 unit per hari; diperiksa 2026-11-27 di [determine_quota_cost](https://developers.google.com/youtube/v3/determine_quota_cost)).

**Analitik** (`instruksi/08`): hasil di `tracks/<ID>/analitik/youtube-<tanggal>.md`. `--retensi` menulis CSV retensi per video dan mencetak perintah `retensi.mjs`. Impressions CTR thumbnail dan viewed vs swiped away tidak diambil skrip (tidak ditemukan di dokumentasi metrik Analytics API); isi dari YouTube Studio. Pendapatan tidak diminta (scope hanya `youtube.readonly` dan `yt-analytics.readonly`). Format Short ditebak dari durasi (maksimal 3 menit).

Status uji: baru diuji dengan respons API tiruan (2026-11-27), belum dengan akun sungguhan.

## Gate yang tidak bisa dilewati otomatis
- Rencana validasi terkunci, jadwal tayang, dan batas kapasitas dibaca dari file, tidak diubah.
- QA kritis menghentikan pipeline (kode 2). QA otomatis tidak pernah menyatakan LULUS final; ada pemeriksaan manual (dengar audio, tonton, cek fakta, thumbnail).
- Publish hanya setelah kreator mengetik `SETUJU` untuk siklus itu. Alat publish: Upload-Post (lihat bagian Publish).
- Pengecualian QA dari kreator dicatat di TRACK.md (`pengecualian_qa`) dan tetap tampil sebagai temuan.

## Yang dicek QA otomatis
Durasi ≥ 8:00 (jeda variabel: 0,65 dtk, 1,4 dtk sebelum re-hook/payoff/CTA), jarak re-hook, gaya R3 (G1 scene tanpa shots, G2 shot kurang dari kalimat, G3 shot tanpa show/motion, G4 label tidak di kalimatnya, G5 tanpa anchor, G6 kontrak atau komponen adegan bermasalah, G7 arah visual `03-visual.json` belum siap), footage ≤ ⅓ dan tidak lebih dari 2 scene berurutan, file dan lisensi footage, kelengkapan adegan, pola slop (em dash, kontras palsu, pembuka basa-basi, frasa slop ID), bubble yang mengulang narasi, jumlah sumber, salah ucap lewat transkrip balik, catatan suara, thumbnail, bukti kreator. Kemasan (lapisan "Kemasan", selalu saran, tidak pernah kritis; `scripts/pipeline/kemasan.mjs`): pasangan judul dan teks thumbnail dilint dengan `title.py` (youtube-agent-skill, MIT, `scripts/vendor/`): terpotong di 40/60 karakter, kata kabur, thumbnail mengulang judul. Chapter dicek terhadap aturan YouTube: mulai 00:00, minimal 3, masing-masing minimal 10 dtk. Analitik retensi setelah tayang: `scripts/pipeline/retensi.mjs` (`instruksi/08`).

## Kebutuhan agar benar-benar tanpa tangan
1. CLI `claude` terpasang (tahap LLM), atau tetap pakai sesi Claude Code.
2. `PEXELS_API_KEY` (gratis). Pencarian Pixabay saja kurang relevan, sehingga footage baru 11% dari durasi dan 3 scene harus tetap kartun.
3. `YOUTUBE_API_KEY` untuk angka outlier, dan OAuth per track untuk analitik (bagian Data YouTube).
4. Paket ElevenLabs berbayar, dan catatan jenis suara di `04-assets.json` (`voice.type`).
5. Penjadwalan mingguan (launchd/cron atau scheduled task) yang memanggil `run.mjs` sesuai jadwal di `validasi/rencana.md`.
