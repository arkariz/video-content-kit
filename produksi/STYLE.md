# Gaya gambar dan pemeran (semua track)

Aturan wajib ada di `instruksi/referensi/gaya-visual.md` (R3, sejak 2026-11-26). File ini memuat cara menggambar tokoh dan benda, palet, dan pemeran per track. Yang ditiru dari referensi hanya teknik; tokoh dan aset dibuat orisinal. Tokoh dari kartun lain (misalnya Adventure Time) tidak boleh disalin, hanya bahasa bentuknya yang dipakai.

## Bahasa bentuk pemeran
1. **Badan satu bentuk dasar** (kacang, bola, kapsul, kotak membulat) yang sekaligus menjadi kepala. Siluet harus terbaca dari bayangannya saja.
2. **Tangan dan kaki seperti selang karet**: garis melengkung tanpa sendi, ujung bulat. Kaki pendek.
3. **Mata titik** dengan satu titik putih kilap; alis pendek hanya bila ekspresi butuh. Mulut sederhana.
4. **Satu aksesori penanda** per tokoh (topi, kumis, dasi, ransel) supaya dikenali dari jauh.
5. **Benda dan lembaga boleh jadi tokoh** (kereta, dokumen, sel) bila ceritanya butuh emosi atau motif (mesin insentif di `gaya-cerita.md`).
6. Tujuh ekspresi baku: neutral, happy, sad, shock, tired, angry, smug. Keadaan berubah lewat ekspresi dan warna, bukan bubble.
7. Pemeran adalah warga sehari-hari, bukan kostum etnis atau stereotip.

## Cara menggambar
- Tanpa garis tinta. Isian datar, satu bayangan di sisi jauh cahaya (sekitar 55% opasitas warna lebih gelap), satu kilap kecil putih (sekitar 22%).
- Bayangan jatuh berupa elips gelap tipis di bawah tokoh.
- Latar gelap memakai glow untuk benda penting; latar terang memakai gradien hangat dan partikel tipis.
- Label pil: isian warna rata, sudut membulat kecil, teks putih tebal, segitiga penunjuk ke benda.

## Palet
| Track | Palet dasar | Catatan |
| --- | --- | --- |
| T01 (uang) | belum ditetapkan | ditetapkan di siklus pertama yang memakai gaya R3 |
| T02 (Asia Tenggara) | krem hangat #fff6dc, senja #f3a15f → #6d3f7a, malam #1c1f4a → #3b1f5e; livery KRL merah #d83c33 dan kuning #f2b632; teal #2c8c86 | dari uji pemeran 2026-11-26 |

Palet referensi R3 yang terukur (sel, neuron, membran) ada di `produksi/REFERENSI-GAYA.md`; jangan dipakai mentah sebagai palet track.

## Pemeran per track
| Track | Tokoh | Peran | Status |
| --- | --- | --- | --- |
| T02 | Komo | penumpang sehari-hari, tokoh utama: badan kacang sawo matang, topi bucket teal, ransel merah | usulan, menunggu persetujuan kreator |
| T02 | Sepuh | kereta eks-Tokyo yang menua: tampak depan, livery KRL, kumis dan alis putih, karat, tongkat | usulan |
| T02 | Pak Aturan | aturan dan pemerintah: selembar dokumen resmi, dasi kupu-kupu, stempel | usulan |
| T02 | Cicak | pengamat kecil yang menempel di mana saja | usulan |
| T01 | belum ada | dirancang ulang dengan bahasa bentuk di atas | - |

Contoh kode dan lembar karakter: `produksi/remotion/src/experiment/cast.tsx`, render di `produksi/render/_eksperimen/T02-pemeran-lembar.png`.

---

## Mesin lama: kartun datar (hanya T01 siklus 001 dan thumbnail)

Bagian di bawah ini tidak dipakai untuk siklus baru.


Referensi pengamatan: channel OverSimplified (kartun 2D, kepala bulat besar, kostum penanda peran, latar bergaya lukisan datar, bubble dialog, subtitle putih berkontur hitam, peta/diagram sebagai sisipan). Yang ditiru hanya bahasa visualnya. Karakter, latar, efek suara, dan teks dibuat orisinal di repo ini. Jangan memakai aset, karakter, musik, atau gaya merek yang persis sama.

### Prinsip
1. **Konsep abstrak dijadikan tokoh.** Sistem, lembaga, atau benda diberi wajah dan peran (Terminal, Acquirer, Network, Issuer, Bank Sentral). Penonton mengikuti "siapa bicara ke siapa", bukan membaca kotak.
2. **Satu ide per adegan.** Satu aksi, satu bubble pendek, satu efek (stempel, ledakan, paket pesan yang terbang).
3. **Diagram dan data tetap ada**, tetapi sebagai papan sisipan (`insert`) di atas adegan, bukan pengganti adegan.
4. **Gerak setiap detik:** kamera pelan mendekat atau menjauh (bergantian per scene), tokoh muncul memantul, berkedip, bernapas.
5. **Humor ringan dan akurat.** Bubble boleh bercanda, tidak boleh menambah klaim fakta di luar naskah. Semua bubble ikut gate anti-slop.
6. **Konsisten per track.** Pemeran dan palet tetap sepanjang track. Beda track, beda pemeran dan tema.

### Komponen (`produksi/remotion/src/toon/`)
| File | Isi |
| --- | --- |
| `Face.tsx` | wajah: neutral, happy, shock, angry, smug, sad, think, worry, dead |
| `Actors.tsx` | `Person` (you, owner, clerk, pilot, friend) dan `Gadget` (terminal, bank, bank-big, network, phone, card, vault, plane); tambah tokoh baru di sini |
| `Backdrop.tsx` | latar: cafe, street, bank, sky, night, vault, paper (+ grain dan vignette) |
| `Bubble.tsx` | bubble dialog |
| `Stage.tsx` | menyusun adegan dari spec: aktor, bubble, efek, kamera, papan sisipan, banner judul, efek suara |

### Spec adegan (`siklus/<NNN>/04-stage.json`, kunci = id scene)
```json
{
  "s09": {
    "bg": "cafe",
    "cam": { "z": [1, 1.08], "x": [0, 0] },
    "actors": [
      { "id": "term", "kind": "terminal", "x": 0.22, "label": "TERMINAL", "emo": "happy",
        "emoAt": [[0.5, "worry"]], "pose": "down", "poseAt": [[0.4, "point"]],
        "at": 0.02, "from": "pop", "act": "shake", "actAt": 0.5, "scale": 1,
        "say": { "text": "Hey bank, may I charge this?", "at": 0.1, "tone": "say|shout|think" } }
    ],
    "fx": [
      { "type": "packet", "kind": "msg|coin|card", "from": "term", "to": "acq", "label": "0100", "at": 0.3, "dur": 0.14 },
      { "type": "stamp", "text": "APPROVED", "tone": "good|bad|hot", "at": 0.3, "x": 0.5, "y": 0.2 },
      { "type": "pow", "text": "LOST", "at": 0.45, "x": 0.5, "y": 0.3 },
      { "type": "coins", "at": 0.1, "n": 12 }
    ],
    "insert": { "pos": "top|left|right|full", "at": 0.04 }
  }
}
```
- Waktu (`at`, `actAt`, `emoAt`) berupa pecahan 0..1 dari durasi suara scene. `x` 0..1 dari lebar layar (di 9:16 otomatis dirapatkan ke tengah). `bg: "none"` membiarkan footage di belakang.
- `insert` merender spec data dari `04-visual-spec.json` (Diagram/Code/Data) dalam papan bergaya kartun.
- Efek suara dibuat otomatis dari spec (`pop`, `whoosh`, `ding`, `buzz`, `thud`, `coin`). Aset disintesis orisinal oleh `scripts/produksi/sfx.mjs` ke `produksi/sfx/`.

### Pemeran dan latar per track

| Track | Pemeran | Latar | Efek khusus |
| --- | --- | --- | --- |
| T01 (uang) | you, owner, clerk, pilot, friend; terminal, bank, bank-big, network, phone, card, vault, plane | cafe, street, bank, sky, night, vault, paper | packet, stamp, pow, coins |
| T02 (Asia Tenggara) | guide (pemandu tetap), commuter, hijab, engineer; train, island, volcano, city, ship | map, station, city, sea, highland | pin, route (lon/lat atau nama tempat) |

Peta T02 (`bg: "map"`): garis pantai kasar Asia Tenggara dan **tanpa batas negara**, sengaja, supaya tidak menyentuh isu batas dan konflik yang di luar sudut track. Bukan untuk mengukur jarak. Atur zoom dengan `"view": {"lon": [100, 125], "lat": [-12, 8]}`. Tempat acuan ada di `toon/geo.ts` (`PLACES`) dan `vocab.mjs` (`places`); tempat lain boleh ditulis `[lon, lat]`. Pemeran T02 adalah warga sehari-hari, bukan kostum etnis; jaga agar tidak menjadi stereotip.

Footage milik kreator (rekaman KRL, MRT, dan lain-lain) ditaruh di `produksi/footage-own/<ID>/` dan dipanggil dari `broll` dengan `{"own": "nama-file.mp4"}`. QA menghitungnya sebagai bukti kreator bila muncul sebelum 30% durasi.

Pratinjau tokoh atau latar tanpa siklus: `node scripts/produksi/preview-stage.mjs --track T02 --stage produksi/remotion/demo/T02-cast.json` (contoh di `produksi/remotion/demo/`).

### Track baru
1. Pilih pemeran di `Actors.tsx` (atau tambah), tulis `themes/<ID>.ts` bila perlu.
2. Tulis `04-visual-spec.json` (data) lalu `04-stage.json` (adegan). Lihat `siklus/001-approved-not-paid/` sebagai contoh.
3. Cek tiap scene dengan `render.mjs --still sNN`, lalu render penuh.
