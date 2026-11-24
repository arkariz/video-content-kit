# Gaya visual: kartun penjelasan (berlaku untuk semua track)

Referensi pengamatan: channel OverSimplified (kartun 2D, kepala bulat besar, kostum penanda peran, latar bergaya lukisan datar, bubble dialog, subtitle putih berkontur hitam, peta/diagram sebagai sisipan). Yang ditiru hanya bahasa visualnya. Karakter, latar, efek suara, dan teks dibuat orisinal di repo ini. Jangan memakai aset, karakter, musik, atau gaya merek yang persis sama.

## Prinsip
1. **Konsep abstrak dijadikan tokoh.** Sistem, lembaga, atau benda diberi wajah dan peran (Terminal, Acquirer, Network, Issuer, Bank Sentral). Penonton mengikuti "siapa bicara ke siapa", bukan membaca kotak.
2. **Satu ide per adegan.** Satu aksi, satu bubble pendek, satu efek (stempel, ledakan, paket pesan yang terbang).
3. **Diagram dan data tetap ada**, tetapi sebagai papan sisipan (`insert`) di atas adegan, bukan pengganti adegan.
4. **Gerak setiap detik:** kamera pelan mendekat atau menjauh (bergantian per scene), tokoh muncul memantul, berkedip, bernapas.
5. **Humor ringan dan akurat.** Bubble boleh bercanda, tidak boleh menambah klaim fakta di luar naskah. Semua bubble ikut gate anti-slop.
6. **Konsisten per track.** Pemeran dan palet tetap sepanjang track. Beda track, beda pemeran dan tema.

## Komponen (`produksi/remotion/src/toon/`)
| File | Isi |
| --- | --- |
| `Face.tsx` | wajah: neutral, happy, shock, angry, smug, sad, think, worry, dead |
| `Actors.tsx` | `Person` (you, owner, clerk, pilot, friend) dan `Gadget` (terminal, bank, bank-big, network, phone, card, vault, plane); tambah tokoh baru di sini |
| `Backdrop.tsx` | latar: cafe, street, bank, sky, night, vault, paper (+ grain dan vignette) |
| `Bubble.tsx` | bubble dialog |
| `Stage.tsx` | menyusun adegan dari spec: aktor, bubble, efek, kamera, papan sisipan, banner judul, efek suara |

## Spec adegan (`siklus/<NNN>/04-stage.json`, kunci = id scene)
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

## Track baru
1. Pilih pemeran di `Actors.tsx` (atau tambah), tulis `themes/<ID>.ts` bila perlu.
2. Tulis `04-visual-spec.json` (data) lalu `04-stage.json` (adegan). Lihat `siklus/001-approved-not-paid/` sebagai contoh.
3. Cek tiap scene dengan `render.mjs --still sNN`, lalu render penuh.
