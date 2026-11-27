# Profil channel T02 (dipakai juga T05, T06)

Status: **Equator Logic dipakai** (TikTok @equator.logic, tayang 2026-11-26). Handle YouTube, Instagram, dan Facebook belum dicatat di repo. Tabel di bawah adalah arsip usulan 2026-11-25.

## Nama dan handle

| Nama | Handle YouTube | Cek 2026-11-25 |
| --- | --- | --- |
| **Equator Logic** (rekomendasi) | @equatorlogic | kosong (404) |
| Archipelago Logic | @archipelagologic | kosong (404) |
| Equator Notes | @equatornotes | kosong (404) |
| Inside Nusantara | @insidenusantara | kosong (404) |

Sudah dipakai: Monsoon Atlas, Tropic Logic, Tropic Atlas, Local Atlas, Archipelago Explained. Instagram, TikTok, Facebook belum dicek.

## Aset v2, gaya R3 (2026-11-27, menunggu pilihan kreator)

Di `v2/`. Maskot Komo, tanda garis khatulistiwa emas, palet senja T02. Belum diunggah ke platform mana pun; aset lama di bawah masih yang terpasang.

| File | Isi |
| --- | --- |
| `profil-A-komo-cincin.png` (1080×1080, **rekomendasi**) | Komo dekat dengan cincin khatulistiwa |
| `profil-B-komo-globe.png` | Komo memeluk bola dunia |
| `profil-C-tanda.png` | tanpa maskot: gunung, matahari, laut, khatulistiwa |
| `banner-A.png` (2560×1440, **rekomendasi**) | Komo menunjuk nama, satu baris |
| `banner-B.png` | nama dua baris, Komo di kanan |
| `pratinjau.png` | potongan bulat (270, 98, 32 px) dan potongan banner di HP |

Render ulang: `node hasil/tracks/T02-why-southeast-asia/channel/v2/render.mjs`, lalu `python3 hasil/tracks/T02-why-southeast-asia/channel/v2/pratinjau.py`.

## Aset

- `profil-equator-logic-emblem.png` (1000×1000, **dipakai**): emblem bulat. Cincin krem bertuliskan EQUATOR LOGIC / WHY SOUTHEAST ASIA WORKS; di dalam, Guide dengan matahari sebagai lingkaran cahaya di belakang kepala, gunung api, kapal kontainer, laut, dan garis khatulistiwa merah sebagai cakrawala. Generator: `make_profile_badge.py`.
- `profil-equator-logic.png` (800×800): versi sederhana sebelumnya, cadangan.
- `banner-youtube-equator-logic.png` (2560×1440): peta Asia Tenggara dari `toon/geo.ts` tanpa batas negara, garis khatulistiwa, panel nama di area aman tengah 1546×423 (terlihat di HP, desktop, TV).
- `make_assets.py`: generator. Ganti `NAME`/`TAG`/`SUB` bila nama berubah, lalu jalankan `python3 make_assets.py` (butuh `rsvg-convert` dan font Poppins).

## Teks profil

YouTube (deskripsi channel):

```
Why Southeast Asia works the way it does, explained from Indonesia.

Second-hand Tokyo trains still running in Jakarta. One island holding more than half a country. The rails, rules and old decisions behind what you see on the street today.

Geography, infrastructure and history, with sources in every description (many of them in Indonesian). Footage is filmed on location; narration uses a synthetic voice.

New videos every week. Indonesian audio track available on selected videos.

Business: [email]
```

TikTok (≤80 karakter):

```
Why Southeast Asia works like this. Filmed in Indonesia. New video every week.
```

Instagram (≤150 karakter):

```
Why Southeast Asia works the way it does 🗺️
Geography, infrastructure, history you can still see
Filmed in Indonesia · sources in every post
```

Kata kunci channel:

```
southeast asia, indonesia explained, jakarta, geography, infrastructure, trains, history, asean, why indonesia, krl
```

Catatan: kalimat "narration uses a synthetic voice" sengaja dipasang (jujur ke penonton, menurunkan risiko kategori inauthentic content). Bio tidak menyebut kota karena belum dikonfirmasi.
