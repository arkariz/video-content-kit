#!/usr/bin/env python3
"""Tulis ulang 03-naskah.md (versi baca) dari 03-script.json setelah konversi R3 + gaya cerita. Jalankan: python3 03-naskah.r3.py"""
import json, pathlib, re
here = pathlib.Path(__file__).parent
d = json.load(open(here / "03-script.json"))
W = lambda t: len(t.split())
en = sum(W(s["narration"]["en"]) for s in d["scenes"]); idn = sum(W(s["narration"]["id"]) for s in d["scenes"])
rep = {s["id"]: s for s in d["scenes"]}
o = []
o.append("# Naskah: siklus 001-jakarta-refused-tokyo-trains (T02, uji-V2 variasi A)\n")
o.append("Status: **ditulis ulang 2026-11-26 ke gaya cerita dan gaya visual R3; menunggu persetujuan ulang kreator** (versi sebelumnya disetujui 2026-11-25 dan dirender dengan mesin lama). Sumber tunggal untuk produksi adalah `03-script.json`; file ini versi baca. Visual per kalimat ada di `shots` di JSON dan komponennya di `04-shots.tsx`.\n")
o.append(f"- **Janji:** {d['promise']}")
o.append(f"- **Hook (s01):** {rep['s01']['narration']['en']}")
o.append(f"- **Panjang:** {len(d['scenes'])} scene, {en} kata EN, {idn} kata ID. Durasi pasti setelah TTS; syarat ≥ 8:00 (naskah lama 8:41 dengan 1.437 kata EN).")
o.append("- **Judul:** " + " · ".join(f"({i+1}) {t}" for i, t in enumerate(d["title_options"])))
o.append(f"- **Teks thumbnail:** {d.get('thumbnail_text','')}\n")
o.append("## Checklist gaya cerita (`instruksi/referensi/gaya-cerita.md`)\n")
o.append("| Syarat | Di mana | Isi |\n| --- | --- | --- |")
o.append(f"| Scene 1 orang kedua di momen kunci (maks. 2 kalimat) | s01 | \"{rep['s01']['narration']['en']}\" |")
o.append("| Satu analogi di fondasi | s02 (dan dipanggil di s47) | baju bekas turunan: hanya cocok kalau ukurannya sama, hanya berguna selama masih ada umur pakainya |")
o.append("| Analogi kembali di penutup | s57 | \"Tokyo's closet had nothing left that was young enough.\" |")
o.append("| Satu tebakan yang patah | s50 | \"You might guess Japan ran out of trains. It didn't.\" |")
o.append("| Satu blok mekanika insentif | s43 | KAI mau kereta dalam hitungan bulan, DPR mau industri dalam negeri tumbuh, Jepang mau kereta tua keluar dari pembukuan, Kemendag punya batas umur |")
o.append("| Satu callback dengan twist | s01 → s57 | penolakan November di hook ternyata berasal dari lemari Tokyo yang kehabisan kereta cukup muda, bukan dari Jakarta berpaling |")
o.append("| Satu beat jujur / steelman | s44 | \"To be fair, the argument was time.\" (argumen impor ditulis dulu sebelum aturan umur memotongnya) |")
o.append("| Penutup membingkai ulang + ajakan video berikutnya yang spesifik | s57–s58 | reframe lemari; \"Next video: why so many Indonesians live on Java.\" |")
o.append("| Satu narator TTS, tanpa persona \"I/saya\" | seluruh naskah | ya |")
o.append("| Fondasi dulu (60–90 dtk: pemain, tahap, satu analogi), anggaran konsep ≤ 8, istilah didefinisikan saat pertama muncul | s02–s03 | KAI, pemerintah, INKA, CRRC; delapan istilah: rail gauge, 1.500 V DC, seri 205, INKA, CRRC Sifang, batas umur barang modal bekas, retrofit, KAI |\n")
o.append("## Gaya visual R3\n")
o.append(f"- **Jangkar (`anchor`):** {d['anchor']['desc']}.")
o.append("- **Pemeran (`cast`):** Komo (penumpang, \"kamu\"), Sepuh (kereta eks-Tokyo), Pak Aturan (aturan dan lembaga).")
o.append("- Satu shot per kalimat, tiap shot punya `motion`, label maks. 3 kata muncul di kata yang diucapkan, angka dibuat bisa dihitung (titik, deretan gerbong, garis waktu). Tanpa papan teks.")
o.append("- Scene footage nyata CC BY (s17, s22, s31, s34) dan stok s44 tetap footage penuh karena mesin R3 mengabaikan `broll` bila ada `shots`. s02 (analogi fondasi) kini digambar R3, jadi klip `s02-s17-...-01.mp4` tidak dipakai.")
o.append("- Gambar ditulis di `04-shots.tsx` (dihasilkan oleh `03-script.r3.py` dari `04-shots.head.tsx`).\n")
o.append("## Potongan Shorts\n")
for c in d["shorts_cuts"]: o.append(f"- **{c['name']}** ({', '.join(c['scene_ids'])}). Hook: \"{c['hook_override']}\"")
o.append("\nCatatan: framing 9:16 Shorts dikerjakan lewat `focus` per shot (subjek utama di tengah) dan diperiksa saat render.\n")
o.append("## Pelafalan\n")
for p in d.get("pronunciations", []): o.append(f"- {p['term']}: {p['say_as']}")
o.append("- Sengaja tanpa `say_as` untuk INKA, CRRC, Bogor, Cikarang. Dengarkan kemunculan pertama setelah TTS.\n")
o.append("## Skor anti-slop (lapisan Teks)\n")
o.append("Belum dinilai ulang setelah penulisan ulang 2026-11-26. Skor naskah lama (EN 39, ID 38) tidak berlaku untuk teks yang berubah. Jalankan skill `video-anti-slop` pada naskah ini sebelum render. Cek otomatis `check_kit.py`: lolos. Kalimat s57 sengaja ditulis tanpa kontras \"bukan X melainkan Y\".\n")
o.append("## Naskah per scene\n")
t = 0
for s in d["scenes"]:
    o.append(f"### {s['id']} · {s['role']}\n")
    o.append(f"**EN:** {s['narration']['en']}\n")
    o.append(f"**ID:** {s['narration']['id']}\n")
    if s.get("shots"):
        o.append("*Visual (R3, satu per kalimat):*")
        for x in s["shots"]:
            lb = ", ".join(f"\"{l['text']}\"@{l['word']}" for l in x.get("labels", []))
            o.append(f"{x['sentence']}. [{x['scale']}/{x['transition']}] {x['show']} → {x['motion']}" + (f" · label: {lb}" if lb else ""))
        o.append("")
    elif s.get("broll"):
        b = s["broll"]; o.append(f"*Visual:* footage nyata {'CC BY `' + b['lic'] + '`' if 'lic' in b else 'stok: ' + ', '.join(b.get('keywords', []))}\n")
    if s.get("sources"):
        o.append("*Sumber:* " + " · ".join(f"[{x['claim'][:90]}]({x['url']})" for x in s["sources"]) + "\n")
(here / "03-naskah.md").write_text("\n".join(o))
print("ditulis", len(o), "baris;", en, "kata EN")
