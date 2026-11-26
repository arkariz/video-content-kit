#!/usr/bin/env python3
"""T02-001 ke gaya wajib baru (2026-11-26): gaya cerita (gaya-cerita.md) + ilustrasi gerak penjelas R3 (gaya-visual.md).
Membaca 03-script.json, menulis ulang: narasi yang berubah (checklist cerita), anchor, cast, shots per kalimat; membuang world/stage/visual diorama.
Juga menulis 04-shots.tsx (04-shots.head.tsx + daftar shot). Idempotent. Jalankan: python3 03-script.r3.py"""
import json, pathlib, copy
here = pathlib.Path(__file__).parent
P = here / "03-script.json"
d = json.load(open(P))
SC = {s["id"]: s for s in d["scenes"]}

# ---------------------------------------------------------------- narasi yang berubah (checklist gaya-cerita.md)
EDIT = {
 "s01": ("You step onto a Jakarta commuter train that started its working life in Tokyo, decades ago. In November, Jakarta refused to buy any more.",
         "Kamu naik kereta komuter Jakarta yang dulu mulai bekerja di Tokyo, puluhan tahun lalu. November lalu, Jakarta menolak membeli lagi."),
 "s31": ("All eleven Chinese trains are running, mostly on the Bogor and Cikarang lines. Here, a Chinese train on the Bogor line shares the tracks with the old Japanese ones.",
         "Kesebelas rangkaian China sudah beroperasi, kebanyakan di lintas Bogor dan Cikarang. Di sini, kereta China di lintas Bogor berbagi rel dengan kereta Jepang yang lama."),
 "s44": ("To be fair, the argument was time. A used train could arrive in one to two months. A new one takes one to two years.",
         "Jujur saja, argumennya waktu. Kereta bekas bisa datang dalam satu sampai dua bulan. Kereta baru butuh satu sampai dua tahun."),
 "s50": ("You might guess Japan ran out of trains. It didn't. Japan still has trains to sell, but they are too old for Indonesia's own rule.",
         "Mungkin kamu menebak Jepang kehabisan kereta. Ternyata tidak. Jepang masih punya kereta untuk dijual, tapi terlalu tua untuk aturan Indonesia sendiri."),
 "s57": ("For twenty-five years, Tokyo's old trains let Jakarta grow a rail network it couldn't afford to buy new. Then the hand-me-downs aged out of the rule, and the next trains have to be built at home. So the refusal in November came from Tokyo's closet, which had nothing left that was young enough.",
         "Selama dua puluh lima tahun, kereta tua Tokyo membuat Jakarta bisa membangun jaringan kereta yang tak sanggup dibeli baru. Lalu baju turunan itu terlalu tua untuk aturan, dan kereta berikutnya harus dibuat di dalam negeri. Jadi penolakan November datang dari lemari Tokyo, yang sudah tidak punya yang cukup muda."),
}
EDIT["s43"] = ("The pressure behind that vote was a forecast of three hundred and sixty-nine million passenger trips in 2026. Every missing train makes the remaining ones fuller. Everyone in this story wanted something different. The railway wanted trains within months. Parliament wanted the home train industry kept growing. Japan wanted old trains off its books. And the trade ministry had a cap on how old a used machine can be.",
 "Tekanan di balik pemungutan suara itu adalah prakiraan tiga ratus enam puluh sembilan juta perjalanan penumpang pada 2026. Setiap kereta yang hilang membuat sisanya makin penuh. Setiap pihak di cerita ini menginginkan hal yang berbeda. Kereta api menginginkan kereta dalam hitungan bulan. DPR ingin industri kereta dalam negeri terus tumbuh. Jepang ingin kereta tuanya keluar dari pembukuan. Dan Kementerian Perdagangan punya batas umur untuk mesin bekas.")
for sid, (en, idn) in EDIT.items():
    SC[sid]["narration"] = {"en": en, "id": idn}; SC[sid].pop("duration_ms", None)

# ---------------------------------------------------------------- helpers visual
PIN = {"tokyo": (1590, 390), "jakarta": (560, 826), "bogor": (585, 852), "cikarang": (655, 820), "inka": (1060, 836), "china": (330, 300), "java": (760, 846)}
def proj(name, cam, dy=-12):
    (c0, c1) = cam; z = (c0[2] + c1[2]) / 2; cx = (c0[0] + c1[0]) / 2; cy = (c0[1] + c1[1]) / 2
    x, y = PIN[name]; return round(960 + (x - cx) * z), round(540 + (y - cy) * z - 62 * z + dy)
def I(k, **kw): return dict(k=k, **kw)
def komo(x, y=840, s=1.3, **kw): return I("komo", x=x, y=y, s=s, **kw)
def sepuh(x, y=840, s=1.1, **kw): return I("sepuh", x=x, y=y, s=s, **kw)
def aturan(x, y=840, s=1.3, **kw): return I("aturan", x=x, y=y, s=s, **kw)
def train(x, y, s, lv="krl", n=1, **kw): return I("train", x=x, y=y, s=s, lv=lv, n=n, **kw)
def coins(x, y, n, s=1.2, **kw): return I("coins", x=x, y=y, n=n, s=s, **kw)
def cars(x, y, v, **kw): return I("cars", x=x, y=y, value=v, **kw)
def dots(x, y, total, v, **kw): return I("dots", x=x, y=y, total=total, value=v, **kw)
def crowd(x, y, n, **kw): return I("crowd", x=x, y=y, n=n, **kw)
def tl(x, y, w, rng, marks, up=None, **kw): return I("timeline", x=x, y=y, w=w, range=rng, marks=[dict(at=a, label=l) for a, l in marks], upTo=up, **kw)
def route(frm, c, to, at=0.3, dur=2.4, color="#fff", ship=True): return dict(**{"from": list(frm)}, c=list(c), to=list(to), at=at, dur=dur, color=color, ship=ship)
TJ = route(PIN["tokyo"], (1250, 740), PIN["jakarta"])
CJ = route(PIN["china"], (300, 700), PIN["jakarta"], color="#ffd23f")
MAPC = [[960, 540, 1], [960, 560, 1.05]]
JAVA = [[900, 760, 1.6], [780, 800, 2.3]]

def S(show, motion, items=None, labels=(), sky="paper", ground=None, scale="place", tr="cut", cam=None, map=None, gy=840):
    """labels: (teks, kata, x, y[, ptr[, warna]]) dalam koordinat layar. map-shot memakai proyeksi lewat proj()."""
    st = dict(sky=sky, items=items or [])
    if ground: st["ground"] = ground; st["gy"] = gy
    if cam: st["cam"] = cam
    if map: st["map"] = map
    st["lb"] = [[l[0], l[2], l[3]] + ([l[4]] if len(l) > 4 else ["down"]) + ([l[5]] if len(l) > 5 else []) for l in labels]
    contract = dict(show=show, scale=scale, motion=motion, transition=tr)
    if labels: contract["labels"] = [dict(text=l[0], word=l[1]) for l in labels]
    return contract, st

G = "#cdbd9c"      # tanah peron
R = {}             # scene id -> [shot]
# ------------------------------------------------------------------ s01 hook (orang kedua)
R["s01"] = [
 S("peron Jakarta senja: kereta eks-Tokyo berhenti, pintu terbuka, Komo (kamu) melangkah ke pintu", "Komo berjalan ke pintu, cahaya senja bergeser, kereta berdesis pelan", [I("skyline", y=840, fill="#e9b37a", seed="j1"), I("rails", y=900), train(120, 520, 0.92, "krl", 2, open=True, crowd=True, seed="a"), komo(1640, 880, 1.0, pose="walk", expr="neutral", flip=True)], [("MADE IN TOKYO", "Tokyo", 600, 470)], sky="jkt", ground=G, scale="place", cam=[[1100, 560, 1], [900, 560, 1.12]]),
 S("peta: kapal membawa kereta dari Tokyo, di ujung Jakarta muncul tanda silang besar", "kapal berlayar dari Tokyo ke Jakarta, di dekat tujuan berhenti dan tanda silang menghantam", [I("x", x=640, y=700, s=2.6, at="w:refused")], [("REFUSED", "refused", 760, 560, "down", "#d8322b")], scale="map", tr="iris", map=dict(pins=["tokyo", "jakarta"], routes=[dict(TJ, dur=3.0)]), cam=MAPC),
]
# ------------------------------------------------------------------ s02 fondasi: analogi baju bekas
R["s02"] = [
 S("Komo memegang kemeja turunan kakaknya, bayangan anak yang lebih besar di belakang", "kemeja pindah tangan dan mengembang, Komo menatapnya", [komo(760, 840, 1.45, expr="happy", pose="wave"), I("shirt", x=1250, y=520, s=1.9, color="#2c8c86", at="w:hand-me-down")], [("HAND-ME-DOWNS", "hand-me-down", 1250, 330)], sky="paper", ground=G),
 S("kemeja kebesaran menelan Komo, lalu ukuran pas, lalu kemeja pas mulai berlubang", "kemeja menyusut jadi pas, Komo lega, lubang bermunculan", [komo(900, 840, 1.45, expr="sad", out="w:matches"), komo(900, 840, 1.45, expr="happy", at="w:matches"), I("shirt", x=900, y=560, s=3.0, color="#2c8c86", out="w:matches"), I("shirt", x=900, y=570, s=1.5, color="#2c8c86", at="w:matches", hole=1, holeAt="w:life")], [("SIZE MATCH", "size", 1280, 420), ("LIFE LEFT", "life", 560, 420)], sky="paper", ground=G, tr="push", scale="object"),
 S("Pak Aturan membanting stempel ke Sepuh yang tua dan berkarat", "stempel turun, Sepuh tersentak", [sepuh(700, 840, 1.5, dim=0.2, sweat=True, expr="sad"), aturan(1350, 840, 1.4, slamAt="w:age", expr="smug", flip=True)], [("AGE RULE", "age", 1000, 330)], sky="dusk", ground="#6b4a5e", scale="object", tr="wipe"),
]
# ------------------------------------------------------------------ s03 empat pemain
R["s03"] = [
 S("empat panggung kosong berjajar di tanah, satu per satu terangkat", "panggung naik satu demi satu dengan pantulan", [I("bar", x=x, y=840, w=210, h=110, color="#c9bfa4", at=0.25 + i * 0.3) for i, x in enumerate([480, 780, 1080, 1380])], [("4 PLAYERS", "Four", 930, 640)], sky="paper", ground=G),
 S("kereta komuter KAI merah-kuning di peron Jakarta", "kereta masuk peron pelan dan berhenti", [I("skyline", y=840, fill="#e9b37a", seed="k1"), I("rails", y=900), train(-900, 520, 1.0, "krl", 2, dx=240, seed="b")], [("KAI", "KAI", 900, 420)], sky="jkt", ground=G, scale="object", tr="push"),
 S("Pak Aturan di depan gedung pemerintah, stempel di tangan, selembar aturan melayang", "stempel naik turun, dokumen berputar pelan", [aturan(960, 840, 1.9, expr="neutral", slamAt=1.2), I("doc", x=1420, y=560, s=1.1, mark="ok", markAt=1.6)], [("GOVERNMENT", "government", 960, 300)], sky="day", ground="#b9c7a0", scale="object", tr="cut"),
 S("pabrik INKA berasap, kereta putih-oranye perlahan keluar dari pintunya", "asap naik, kereta baru keluar pelan", [I("factory", x=640, y=840, s=1.5), train(900, 560, 0.62, "inka", 1, dx=60, seed="c")], [("INKA", "INKA", 640, 250)], sky="day", ground="#c9bda0", scale="place", tr="iris"),
 S("peta: kapal membawa kereta baru dari Tiongkok ke Jawa", "kapal berlayar dari Tiongkok, mendekati Jakarta", [], [("CRRC", "CRRC", 330, 220)], scale="map", tr="wipe", map=dict(pins=["china", "jakarta"], routes=[dict(CJ, dur=2.8)]), cam=MAPC),
 S("garis waktu 2000 ke 2026 digambar, tiga penanda menyala", "titik berjalan dari 2000 ke 2026, tiga penanda menyala berurutan", [tl(360, 560, 1200, [2000, 2026], [(2000, "2000"), (2013, "2013"), (2026, "2026")], up=2026, dur=3.6)], [("NOV 2026", "2026", 1560, 420)], sky="paper", ground=G, scale="map", tr="push"),
]
# ------------------------------------------------------------------ s04 hadiah (analogi jadi kenyataan)
R["s04"] = [
 S("kereta subway Tokyo dibungkus pita besar seperti hadiah", "pita mengembang dan konfeti naik", [train(260, 540, 0.95, "toei", 1, head=True, seed="d"), I("confetti", x=960, y=500, at="w:gift")], [("A GIFT", "gift", 700, 380)], sky="tokyo", ground="#cfd3d8", scale="object"),
 S("peta: kapal membawa tujuh puluh dua gerbong dari Tokyo ke Jakarta", "gerbong muncul satu per satu menjadi tujuh puluh dua, kapal berlayar", [cars(960, 250, 72, cols=18, gap=[58, 46], dur=2.2, color="#2166b0", max=72)], [("72 CARS", "seventy-two", 960, 150), ("MAY 2000", "2000", 1460, 470)], scale="map", tr="iris", map=dict(pins=["tokyo", "jakarta"], routes=[dict(TJ, dur=3.4)]), cam=MAPC),
]
# ------------------------------------------------------------------ s05 usia
R["s05"] = [
 S("pabrik tahun 1968, kereta biru-putih baru keluar dari gerbang", "kereta meluncur keluar pelan, asap pabrik naik", [I("factory", x=420, y=840, s=1.3), train(560, 600, 0.55, "toei", 2, dx=70, seed="e")], [("1968", "1968", 420, 230)], sky="tokyo", ground="#cfd3d8", scale="place"),
 S("garis waktu 1968 ke 2016, Sepuh melambai di ujungnya", "titik berjalan menyusuri tiga puluh tahun lalu sampai 2016", [tl(300, 700, 1100, [1968, 2016], [(1968, "1968"), (2000, "2000"), (2016, "2016")], up=2016, dur=3.4), sepuh(1640, 840, 1.0, expr="happy")], [("30 YEARS", "thirty", 760, 560)], sky="paper", ground=G, scale="map", tr="wipe"),
]
# ------------------------------------------------------------------ s06 AC pertama / atap
R["s06"] = [
 S("dalam gerbong: penumpang lega, kilat listrik di atas, udara dingin", "kilat menyala, wajah penumpang berubah dari gerah ke lega", [crowd(960, 800, 6, s=1.5, expr="happy", gap=170), I("bolt", x=1500, y=340, s=1.2, at="w:electric")], [("FIRST AC TRAIN", "air-conditioned", 960, 360)], sky="sea", ground="#9cc3d6", scale="inside"),
 S("kereta ekonomi berangkat, penumpang bergelantungan di pintu dan duduk di atap", "kereta bergerak makin cepat, orang di atap bergoyang", [train(500, 540, 0.9, "eko", 2, dx=-60, open=True, crowd=True, dirt=0.5, seed="f"), crowd(1000, 500, 8, s=0.7, pose="sit", dx=-60, gap=130)], [("ROOF RIDERS", "roof", 960, 250, "down", "#cf6f3e")], sky="hot", ground="#b09d7d", scale="place", tr="wipe", cam=[[1100, 560, 1.1], [900, 560, 1.0]]),
]
# ------------------------------------------------------------------ s07-s10 harga
R["s07"] = [
 S("peta Jawa: kapal merapat ke Jakarta, tumpukan gerbong diturunkan", "kamera turun ke Jawa, kapal merapat", [], [], scale="map", tr="push", map=dict(pins=["jakarta"], routes=[dict(TJ, dur=2.6)]), cam=[[1000, 560, 1.1], [700, 800, 2.1]]),
 S("gerbong bekas di samping tumpukan koin kecil", "tiga koin jatuh dan menumpuk", [train(440, 560, 0.55, "toei", 1, seed="g"), coins(1350, 800, 3, 1.4, at="w:billion")], [("RP 0.8-1 B", "billion", 1350, 560)], sky="paper", ground=G, scale="object", tr="cut"),
]
R["s08"] = [
 S("gerbong baru mengilap di samping tumpukan koin tinggi", "koin jatuh menumpuk sampai dua belas", [train(300, 560, 0.55, "inka", 1, seed="h"), coins(1350, 820, 12, 1.1, at="w:twelve")], [("RP 10-12 B", "twelve", 1350, 340)], sky="paper", ground=G, scale="object"),
 S("dua gerbong sama persis, satu dengan satu koin, satu dengan sepuluh", "tumpukan kiri kecil, kanan menjulang, kamera mundur", [train(230, 520, 0.42, "toei", 1, seed="i"), train(1130, 520, 0.42, "inka", 1, seed="j"), coins(420, 830, 1, 1.4), coins(1320, 830, 10, 1.0, at="w:tenth")], [("1/10 PRICE", "tenth", 960, 330)], sky="paper", ground=G, scale="object", tr="wipe", cam=[[960, 540, 1.1], [960, 540, 1.0]]),
]
R["s09"] = [
 S("pabrik INKA menyodorkan selembar penawaran dengan tumpukan koin tinggi", "dokumen terbang dari pabrik, koin menumpuk", [I("factory", x=480, y=840, s=1.3), I("doc", x=1250, y=520, s=1.3, mark="ok", markAt="w:2019"), coins(1650, 830, 13, 0.9)], [("$1.3 M", "million", 1250, 330)], sky="day", ground="#c9bda0", scale="place"),
 S("kapal membawa gerbong bekas, dua batang harga: tinggi untuk baru, sangat pendek untuk bekas", "kapal berlayar, batang bekas tumbuh hanya sepersembilan", [I("ship", x=500, y=780, s=0.9, n=3, dx=20), I("bar", x=1150, y=840, w=170, h=470, color="#c9c9c9"), I("bar", x=1450, y=840, w=170, h=52, color="#d83c33", at=0.8)], [("1/9 PRICE", "ninth", 1450, 760)], sky="sea", ground="#9cc3d6", gy=840, scale="object", tr="push"),
]
R["s10"] = [
 S("depo Tokyo: kereta tua diparkir, tanda centang besar menyala", "tanda centang muncul, Sepuh tersenyum", [I("skyline", y=840, fill="#aebccf", seed="t1"), train(300, 560, 0.7, "toei", 1, seed="k"), I("check", x=1500, y=420, s=2.0, at="w:good")], [("GOOD FOR JAPAN", "good", 1300, 300)], sky="tokyo", ground="#cfd3d8"),
 S("Sepuh berkeringat di tempat pembuangan, tumpukan koin biaya menggunung", "koin biaya menumpuk di sebelahnya", [sepuh(700, 840, 1.4, sweat=True, expr="sad", dim=0.2), coins(1300, 830, 6, 1.5, at="w:costs")], [("SCRAP COST", "Scrapping", 1300, 520)], sky="grey", ground="#aeb2ba", tr="wipe", scale="object"),
 S("peta: kapal membawa Sepuh dari Tokyo ke Jakarta, hanya satu koin kecil di sisi", "kapal berlayar santai, koin kecil bergoyang di dek", [coins(1180, 520, 1, 1.4)], [("SHIPPING", "Shipping", 1590, 330)], scale="map", tr="iris", map=dict(pins=["tokyo", "jakarta"], routes=[dict(TJ, dur=3.0)]), cam=MAPC),
]
# ------------------------------------------------------------------ s11-s15 kecocokan
R["s11"] = [
 S("tumpukan koin di tengah, tanda silang menimpanya", "silang besar menghantam koin", [coins(960, 760, 6, 1.9), I("x", x=960, y=520, s=2.6, at="w:alone")], [("NOT JUST PRICE", "price", 960, 220)], sky="paper", ground=G, scale="object"),
 S("kereta Tokyo di atas rel yang salah lebar, roda tidak masuk", "rel melebar, roda menggantung, silang menyala", [I("gauge", x=960, y=700, s=1.6), train(420, 330, 0.45, "toei", 1, seed="l"), I("x", x=960, y=430, s=1.4, at="w:major")], [("MAJOR CHANGES", "changes", 1400, 330)], sky="grey", ground="#aeb2ba", tr="wipe", scale="object"),
 S("kereta Tokyo meluncur pas di rel Jakarta, tanda centang muncul", "kereta masuk dan pas, centang menyala", [I("skyline", y=840, fill="#e9b37a", seed="j2"), I("rails", y=900), train(-900, 520, 0.95, "toei", 2, dx=260, seed="m"), I("check", x=1500, y=360, s=2.0, at="w:can")], [("JAKARTA", "Jakarta", 1500, 520)], sky="jkt", ground=G, tr="push"),
]
R["s12"] = [
 S("penampang dua rel di bantalan, satu garis ukur muncul di antaranya", "garis ukur memanjang di antara dua rel", [I("gauge", x=960, y=620, s=1.9, at=0.3)], [("THE RAILS", "rails", 960, 270)], sky="paper", ground=G, scale="object", tr="push"),
 S("dua penampang rel kembar: Jepang di kiri, Jawa di kanan, angka sama", "dua garis ukur memanjang bersamaan lalu sama panjang", [I("gauge", x=520, y=620, s=1.2, at=0.3), I("gauge", x=1400, y=620, s=1.2, at=0.6)], [("JAPAN", "Japan's", 520, 330), ("JAVA", "Java's", 1400, 330), ("1,067 MM", "sixty-seven", 960, 560, "down", "#2c8c86")], sky="paper", ground=G, scale="object", tr="wipe"),
 S("rel melebar, roda kecil tidak muat dan jatuh, silang muncul", "lebar rel berubah, roda terlepas", [I("gauge", x=960, y=720, s=1.6), I("x", x=960, y=420, s=1.6, at="w:Change")], [("NEW WHEELS", "wheels", 1400, 420)], sky="grey", ground="#aeb2ba", scale="object", tr="cut"),
]
R["s13"] = [
 S("jam raksasa berputar mundur di atas peta Jawa", "jarum jam berputar mundur cepat", [I("clock", x=960, y=520, s=2.3, rate=-260)], [("HISTORY", "history", 960, 220)], sky="dusk", ground="#6b4a5e", scale="object"),
 S("pulau Jawa tahun 1867, rel lebar pertama dibentangkan", "rel melebar digambar di atas Jawa", [I("island", x=960, y=640, s=2.2), I("gauge", x=960, y=420, s=1.8), tl(360, 900, 1200, [1860, 1960], [(1867, "1867")], up=1867, dur=2.0)], [("1867", "1867", 960, 170)], sky="sea", scale="map", tr="push"),
 S("rel lebar diganti rel sempit saat pendudukan, garis waktu sampai 1940an", "rel lebar menyusut jadi sempit, titik waktu bergeser", [tl(360, 880, 1200, [1860, 1960], [(1867, "1867"), (1942, "1942")], up=1945, dur=3.0), I("gauge", x=960, y=560, s=1.9, out="w:converted"), I("gauge", x=960, y=560, s=1.2, at="w:converted")], [("1940S", "1940s", 1560, 760), ("NARROWER", "narrower", 960, 330)], sky="sea", scale="map", tr="wipe"),
 S("kereta Tokyo pas di rel Jawa hari ini, centang menyala", "kereta meluncur pas, centang muncul", [I("rails", y=900), train(-900, 520, 0.95, "toei", 2, dx=250, seed="n"), I("check", x=1500, y=380, s=1.8, at="w:fits")], [("IT FITS", "fits", 1500, 520)], sky="jkt", ground=G, tr="iris"),
]
R["s14"] = [
 S("kilat besar menyala di tengah, centang di sebelahnya", "kilat menyala berdenyut, centang muncul", [I("bolt", x=960, y=520, s=2.4, at=0.3), I("check", x=1480, y=380, s=1.8, at="w:matches")], [("POWER", "power", 960, 200)], sky="night", ground="#2a2656", scale="object"),
 S("kabel listrik dan pantograf, kilat mengalir ke atap kereta", "arus mengalir sepanjang kabel ke kereta", [train(260, 600, 0.7, "krl", 1, seed="o"), I("wire", x=420, y=230, roof=330, base=880), I("bolt", x=1250, y=420, s=1.2, at="w:fifteen")], [("1,500 V DC", "volts", 1250, 250), ("1925", "1925", 620, 190)], sky="night", ground="#2a2656", scale="object", tr="push"),
]
R["s15"] = [
 S("dua penampang rel dan kilat, dua centang menyala", "dua centang menyala berurutan", [I("gauge", x=620, y=640, s=1.1), I("bolt", x=1300, y=520, s=1.6), I("check", x=620, y=330, s=1.2, at=0.9), I("check", x=1300, y=290, s=1.2, at=1.4)], [("SAME RAILS", "rails", 620, 220)], sky="paper", ground=G, scale="object"),
 S("kapal menurunkan kereta, kereta pasang tanda baru lalu melaju di rel yang tidak diubah", "kapal berlalu, kereta bergerak masuk dinas", [I("ship", x=450, y=800, s=0.8, n=3, lv="krl", out="w:gets"), I("rails", y=900), train(-300, 520, 0.8, "krl", 2, dx=200, at="w:gets", seed="p"), I("check", x=1560, y=360, s=1.6, at="w:service")], [("NEW SIGNS", "signs", 1100, 360)], sky="jkt", ground=G, tr="wipe"),
]
R["s16"] = [
 S("peta: tiga kapal bergantian membawa kereta ke Jakarta", "tiga kapal berlayar bergantian", [], [], scale="map", tr="push", map=dict(pins=["tokyo", "jakarta"], routes=[dict(TJ, at=0.2, dur=2.4), dict(TJ, at=0.8, dur=2.4, color="#ffd23f"), dict(TJ, at=1.4, dur=2.4, color="#ff9f6e")]), cam=MAPC),
 S("deretan gerbong 140 bertambah, garis waktu 2012 ke 2019 di bawahnya", "gerbong muncul satu per satu, titik waktu berjalan ke 2019", [cars(960, 330, 140, cols=20, gap=[62, 46], max=140, dur=2.4, color="#d83c33"), tl(360, 860, 1200, [2012, 2019], [(2012, "2012"), (2019, "2019")], up=2019, dur=3.0)], [("140 CARS", "forty", 960, 200), ("1,440 CARS", "aimed", 1480, 760)], sky="paper", ground=G, scale="map", tr="cut"),
]
R["s17"] = [
 S("kapal besar penuh gerbong biru-putih merapat", "kapal bergoyang, gerbong terlihat bertumpuk", [I("ship", x=960, y=780, s=1.3, n=4, dx=-12)], [("BIGGEST BATCH", "biggest", 960, 480)], sky="sea", ground="#9cc3d6", scale="object"),
 S("Sepuh seri 205 menarik rangkaian ke peron Jakarta", "rangkaian masuk peron, Sepuh tersenyum", [I("skyline", y=840, fill="#e9b37a", seed="j3"), I("rails", y=900), train(-900, 520, 0.9, "krl", 2, dx=240, seed="q"), sepuh(1560, 840, 0.9, expr="happy", at=1.0)], [("205 SERIES", "series", 900, 400), ("1985", "1985", 1560, 330)], sky="jkt", ground=G, tr="wipe"),
]
R["s18"] = [
 S("rangkaian panjang kereta Jepang berjajar di peron senja", "rangkaian bergeser pelan melewati kamera", [I("rails", y=900), train(120, 560, 0.55, "krl", 3, dx=20, seed="r")], [("STILL JAPANESE", "Japanese", 960, 400)], sky="jkt", ground=G, scale="object"),
 S("seratus titik: delapan puluh enam merah, sisanya hijau", "titik menyala satu per satu, dua kelompok warna", [dots(960, 540, 100, 86, cols=20, r=17, gap=46, on="#d83c33", dur=2.4), I("sepuh", x=300, y=840, s=0.7, expr="happy", at=0.6)], [("780 CARS", "Seven", 560, 250, "down", "#d83c33"), ("128 CARS", "twenty-eight", 1360, 250, "down", "#2c8c86")], sky="paper", ground=G, scale="object", tr="push"),
]
R["s19"] = [
 S("Sepuh tua di samping kue ulang tahun penuh lilin", "lilin menyala satu demi satu, Sepuh mengeluh", [sepuh(700, 840, 1.5, expr="tired", sweat=True), I("cake", x=1330, y=840, s=1.5, candles=9, at="w:forty-one")], [("34-41 YEARS", "thirty-four", 1330, 460)], sky="paper", ground=G, scale="object"),
 S("tembok bata runtuh di belakang Sepuh kecil", "tembok retak lalu runtuh berkeping", [I("wall", x=1000, y=840, fallAt="w:fell"), sepuh(400, 840, 0.9, expr="happy")], [("BERLIN WALL", "Berlin", 1000, 330)], sky="grey", ground="#aeb2ba", tr="wipe"),
]
R["s20"] = [
 S("Sepuh berkeringat, kerumunan di belakangnya bertambah", "orang berdatangan memenuhi peron", [sepuh(860, 840, 1.3, expr="tired", sweat=True), crowd(1400, 840, 10, s=0.95, gap=70, step=0.15)], [("RISING", "rising", 1400, 360)], sky="grey", ground="#aeb2ba", scale="place", cam=[[960, 540, 1.0], [1000, 560, 1.12]]),
 S("dokumen impor dicap silang merah", "stempel merah menghantam dokumen", [I("doc", x=960, y=540, s=2.0, mark="no", markAt="w:blocked")], [("2023", "2023", 640, 300), ("BLOCKED", "blocked", 1280, 300, "down", "#d8322b")], sky="paper", ground=G, scale="object", tr="push"),
]
R["s21"] = [
 S("kapal di Tokyo siap menerima tumpukan gerbong model baru E217", "gerbong naik ke dek satu per satu menjadi tiga ratus empat puluh delapan", [I("skyline", y=840, fill="#aebccf", seed="t2"), I("ship", x=500, y=820, s=1.0, n=4, dx=15), cars(1250, 280, 58, cols=15, gap=[64, 46], max=58, dur=2.6, color="#2c8c86")], [("348 CARS", "forty-eight", 1250, 170), ("E217", "E217", 500, 460)], sky="tokyo", ground="#cfd3d8"),
]
R["s22"] = [
 S("Pak Aturan membanting stempel ke dokumen impor", "stempel turun, dokumen bertanda silang", [I("doc", x=700, y=540, s=1.5, mark="no", markAt="w:no"), aturan(1250, 840, 1.5, slamAt="w:no", expr="angry", flip=True)], [("NO", "no", 700, 300, "down", "#d8322b")], sky="paper", ground=G, scale="object"),
 S("rangkaian kereta tetap terparkir di Tokyo, kapal pergi kosong", "kapal kosong menjauh, kereta diam di depo", [I("skyline", y=840, fill="#aebccf", seed="t3"), train(300, 580, 0.65, "metro", 2, seed="s"), I("ship", x=1500, y=800, s=0.6, n=0, dx=40)], [("STAYED IN JAPAN", "Japan", 900, 330)], sky="tokyo", ground="#cfd3d8", tr="push"),
 S("dua jalur: kereta lama diperbaiki di kiri, pabrik membuat kereta baru di kanan", "tangan memperbaiki kereta lama, pabrik mengeluarkan kereta baru", [train(100, 560, 0.5, "krl", 1, seed="t"), I("factory", x=1450, y=840, s=1.0), I("arrow", x=860, y=480, x2=1100, y2=480, at="w:new", color="#2c8c86")], [("REFIT", "refit", 520, 360), ("NEW", "new", 1450, 250)], sky="day", ground="#c9bda0", tr="wipe"),
]
R["s23"] = [
 S("peta: dua jalur menuju Jakarta, satu dari Tiongkok, satu dari Jawa Timur", "dua garis berwarna mengalir ke Jakarta", [], [], scale="map", map=dict(pins=["china", "inka", "jakarta"], routes=[dict(CJ, dur=2.6), dict(route(PIN["inka"], (800, 770), PIN["jakarta"]), color="#ff9f6e", at=0.7, dur=1.8, ship=False)]), cam=MAPC),
 S("peta zoom: pin CRRC di Tiongkok dan INKA di Jawa Timur", "kamera bergeser dari Tiongkok ke Jawa Timur", [], [("CRRC SIFANG", "CRRC", 330, 360), ("INKA", "INKA", 960, 360)], scale="map", tr="push", map=dict(pins=["china", "inka"], routes=[dict(CJ, dur=2.0)]), cam=[[480, 540, 1.3], [880, 700, 1.9]]),
]
R["s24"] = [
 S("di bengkel INKA kereta lama diperbaiki, sembilan belas gerbong merah berjajar", "gerbong muncul satu per satu sampai sembilan belas", [I("factory", x=1450, y=840, s=1.0), train(140, 600, 0.55, "krl", 1, seed="u"), cars(960, 250, 19, cols=19, gap=[70, 44], max=19, dur=1.8)], [("19 TRAINS", "nineteen", 960, 140)], sky="day", ground="#c9bda0", scale="place"),
]
R["s25"] = [
 S("kapal dari Tiongkok membawa tiga kereta putih-merah", "kapal berlayar, tiga kereta tampak di dek", [I("ship", x=960, y=780, s=1.2, n=3, lv="cn", dx=-12)], [("3 CHINESE TRAINS", "three", 960, 420), ("JAN 2024", "January", 460, 360)], sky="sea", ground="#9cc3d6", scale="object"),
 S("tiga tumpukan koin sama tinggi di bawah satu dokumen kontrak", "koin jatuh menumpuk tiga kali sama banyak", [I("doc", x=960, y=300, s=0.9, mark="ok", markAt=0.9), coins(600, 840, 5, 1.4, at=0.4), coins(960, 840, 5, 1.4, at=0.7), coins(1320, 840, 5, 1.4, at=1.0)], [("RP 783 B", "billion", 960, 100), ("RP 261 B", "per", 960, 560, "down", "#2c8c86")], sky="paper", ground=G, tr="push"),
]
R["s26"] = [
 S("kereta Tiongkok jauh lebih panjang dibanding kereta lama di sebelahnya", "kereta baru meluncur masuk, lebih panjang dari yang lama", [I("rails", y=900), train(-1300, 560, 0.55, "cn", 3, dx=230, seed="v"), train(200, 330, 0.4, "toei", 1, seed="w", dim=0.2)], [("LONGER", "longer", 900, 360)], sky="jkt", ground=G, scale="object"),
 S("dua belas gerbong baris atas, tiga puluh empat titik orang di bawahnya", "gerbong muncul satu per satu, titik orang mengisi", [cars(960, 280, 12, cols=12, gap=[100, 60], color="#c8102e"), dots(960, 640, 34, 34, cols=17, r=18, gap=50, on="#2c8c86", dur=2.4)], [("12 CARS", "twelve", 960, 170), ("3,400 PEOPLE", "people", 960, 480, "down", "#2c8c86")], sky="paper", ground=G, scale="inside", tr="wipe"),
]
R["s27"] = [
 S("kereta bekas lama di kiri dan kereta baru di kanan, tanda banding di tengah", "kedua kereta bergeser masuk berhadapan", [train(40, 520, 0.4, "toei", 1, dx=60, seed="x"), train(1000, 520, 0.4, "cn", 1, dx=-60, flip=True, seed="y")], [("OLD DEAL", "old", 600, 400)], sky="paper", ground=G, scale="object"),
 S("dua belas gerbong bekas di atas, tiga koin biaya di bawah", "gerbong tersusun, koin menumpuk tiga", [cars(960, 260, 12, cols=12, gap=[100, 60], color="#2166b0"), coins(960, 830, 3, 1.6, at="w:billion")], [("RP 12 B", "billion", 960, 580)], sky="paper", ground=G, scale="object", tr="cut"),
 S("tumpukan koin kecil di kiri, tumpukan raksasa dua puluh kali di kanan", "tumpukan kanan menjulang melewati kamera", [coins(500, 840, 3, 1.2), coins(1300, 840, 16, 1.2, at="w:twenty")], [("20X PRICE", "twenty", 1300, 210, "down", "#d8322b")], sky="paper", ground=G, scale="object", tr="push"),
]
R["s28"] = [
 S("kereta baru mengilap dengan centang di atapnya", "kereta bergeser masuk, kilau menyapu badan, centang muncul", [I("rails", y=900), train(-300, 540, 0.65, "cn", 2, dx=120, seed="z"), I("check", x=1480, y=330, s=1.6, at="w:age")], [("FIXES AGE", "age", 960, 300)], sky="day", ground=G, scale="object"),
 S("tiga Sepuh tua berdiri di senja, satu per satu memudar", "tiga Sepuh dimuat dalam cahaya senja, perlahan memudar", [sepuh(480, 840, 1.1, expr="tired", dim=0.2, out="w:fifty"), sepuh(960, 840, 1.1, expr="tired", dim=0.3), sepuh(1440, 840, 1.1, expr="tired", dim=0.4)], [("NOV 2025", "2025", 960, 340), ("~50 YEARS", "fifty", 1440, 450)], sky="dusk", ground="#6b4a5e", tr="push"),
]
R["s29"] = [
 S("kabin masinis Sepuh dipajang di atas panggung di stasiun Jakarta Kota", "lampu sorot menyala di atas kabin", [I("bar", x=960, y=840, w=520, h=130, color="#8a6a4a"), sepuh(960, 710, 1.3, expr="happy"), I("palm", x=300, y=840, s=1.1), I("palm", x=1620, y=840, s=1.1)], [("JAKARTA KOTA", "Kota", 960, 250)], sky="jkt", ground=G, scale="object"),
 S("Sepuh dengan medali di tengah konfeti, penonton bertepuk tangan", "konfeti berhamburan, penonton melambai", [sepuh(960, 840, 1.3, expr="happy"), crowd(960, 860, 7, s=0.8, pose="wave", gap=250, dy=8), I("confetti", x=960, y=520, at="w:ceremony")], [("RETIREMENT", "retirement", 960, 230)], sky="jkt", ground=G, tr="iris"),
]
R["s30"] = [
 S("peta: dua jalur baru, satu dari Tiongkok, satu dari pabrik INKA", "dua garis menyala menuju Jakarta", [], [], scale="map", map=dict(pins=["china", "inka", "jakarta"], routes=[dict(CJ, dur=2.2), dict(route(PIN["inka"], (800, 770), PIN["jakarta"]), color="#ff9f6e", at=0.5, dur=1.8, ship=False)]), cam=MAPC),
 S("pabrik INKA besar, satu tanda silang di atas cerobong", "asap melemah dan silang menghantam", [I("factory", x=960, y=840, s=1.9), I("x", x=1200, y=380, s=2.0, at="w:weak")], [("WEAK POINT", "weak", 960, 160)], sky="day", ground="#c9bda0", scale="place", tr="push"),
]
R["s31"] = [
 S("peta Jawa: sebelas kereta putih-merah di lintas Bogor dan Cikarang", "kamera turun ke Jabodetabek, sebelas gerbong muncul", [cars(700, 640, 11, cols=11, gap=[60, 40], color="#c8102e", dur=1.8)], [("BOGOR", "Bogor", *proj("bogor", [[900, 760, 1.6], [640, 800, 2.5]]), "down"), ("CIKARANG", "Cikarang", *proj("cikarang", [[900, 760, 1.6], [640, 800, 2.5]]), "down"), ("11 TRAINS", "eleven", 960, 180)], scale="map", map=dict(pins=["kota", "bogor", "cikarang"]), cam=[[900, 760, 1.6], [640, 800, 2.5]]),
 S("dua rel berdampingan: kereta putih-merah dan kereta Jepang lama berpapasan", "dua kereta bergerak berlawanan arah", [I("rails", y=900), train(-1200, 540, 0.55, "cn", 2, dx=210, seed="aa"), train(1900, 330, 0.4, "krl", 2, dx=-130, flip=True, seed="ab", dim=0.1)], [("BOGOR LINE", "Bogor", 960, 250)], sky="jkt", ground=G, scale="object", tr="wipe"),
]
R["s32"] = [
 S("pabrik INKA dan delapan gerbong hijau berjajar sebagai target", "gerbong muncul satu per satu sampai delapan", [I("factory", x=1500, y=840, s=1.1), cars(560, 360, 8, cols=8, gap=[100, 70], color="#2c8c86", dur=1.8)], [("8 PER YEAR", "eight", 560, 220)], sky="day", ground="#c9bda0"),
 S("delapan gerbong abu-abu pudar, hanya tiga yang menyala merah", "tiga gerbong menyala, lima tetap pudar", [I("factory", x=1500, y=840, s=1.1), cars(560, 360, 8, cols=8, gap=[100, 70], color="#c9c9c9", at=0.1, dur=0.5), cars(560, 360, 3, cols=8, gap=[100, 70], color="#d83c33", at="w:two", dur=1.0)], [("2-3 DELIVERED", "delivered", 560, 220)], sky="day", ground="#c9bda0", tr="cut"),
]
R["s33"] = [
 S("enam belas titik, tujuh menyala hijau", "tujuh titik menyala satu per satu", [dots(960, 560, 16, 7, cols=8, r=34, gap=110, on="#2c8c86", dur=1.6)], [("7 OF 16", "seven", 960, 260)], sky="paper", ground=G, scale="object"),
 S("sembilan titik redup menunggu, kereta berhenti kosong di belakang", "sembilan titik berdenyut kuning, kereta diam", [dots(960, 520, 16, 16, cols=8, r=34, gap=110, on="#c9c9c9", dur=0.4), dots(960, 520, 16, 7, cols=8, r=34, gap=110, on="#2c8c86", dur=0.4), I("rails", y=900), train(400, 760, 0.4, "inka", 1, dim=0.3, seed="ac", lit=False)], [("9 WAITING", "nine", 960, 210, "down", "#d83c33")], sky="paper", ground=G, tr="push"),
]
R["s34"] = [
 S("peron Jakarta penuh sesak, kereta datang", "orang berdesakan maju saat kereta masuk", [train(-400, 540, 0.7, "krl", 2, dx=60, seed="ad"), crowd(960, 860, 14, s=1.05, gap=100, step=0.12, hot=0.6)], [("MORE CROWDED", "crowded", 960, 400)], sky="jkt", ground=G, scale="place"),
 S("dua batang: tahun lalu dan semester ini, naik sebelas persen", "batang kedua tumbuh melewati yang pertama", [I("bar", x=820, y=840, w=200, h=300, color="#c9c9c9"), I("bar", x=1120, y=840, w=200, h=333, color="#d83c33", at=0.9)], [("+11%", "eleven", 1120, 450, "down", "#d83c33")], sky="paper", ground=G, scale="object", tr="wipe"),
]
R["s35"] = [
 S("seratus sepuluh titik menyala hijau, satu titik satu juta perjalanan", "titik menyala satu per satu sampai seratus sepuluh", [dots(960, 540, 110, 110, cols=22, r=14, gap=42, on="#2c8c86", dur=2.6)], [("1.1 M TRIPS", "million", 960, 230)], sky="paper", ground=G, scale="object"),
 S("dua batang: rencana pendek, kenyataan tinggi", "batang kenyataan tumbuh melewati rencana", [I("bar", x=800, y=840, w=200, h=105, color="#8a8fa3"), I("bar", x=1120, y=840, w=200, h=300, color="#d83c33", at=0.9)], [("PLANNED 3-4%", "three", 800, 700), ("ACTUAL 11%", "eleven", 1120, 520, "down", "#d83c33")], sky="paper", ground=G, scale="object", tr="wipe"),
]
R["s36"] = [
 S("seratus tiga puluh titik menyala, penumpang padat di peron", "titik menyala sampai seratus tiga puluh", [dots(960, 540, 130, 130, cols=26, r=11, gap=36, on="#2c8c86", dur=2.6)], [("1.3 M", "million", 960, 260)], sky="paper", ground=G, scale="object"),
 S("dua puluh titik merah tambahan di atas seratus sepuluh hijau", "dua puluh titik merah menyala di ujung", [dots(960, 540, 130, 130, cols=26, r=11, gap=36, on="#d83c33", dur=0.4), dots(960, 540, 130, 110, cols=26, r=11, gap=36, on="#2c8c86", dur=0.4, at=0.3)], [("+200,000", "thousand", 960, 260, "down", "#d83c33")], sky="paper", ground=G, scale="object", tr="cut"),
]
R["s37"] = [
 S("seratus lima gerbong kecil tersusun di rak", "gerbong muncul satu per satu sampai seratus lima", [cars(960, 520, 105, cols=21, gap=[78, 54], max=105, dur=2.8, color="#c9c9c9")], [("105 TRAINS", "five", 960, 150)], sky="paper", ground=G, scale="object"),
 S("seratus dua merah, tiga tempat kosong abu-abu", "tiga tempat tersisa kosong", [cars(960, 520, 105, cols=21, gap=[78, 54], max=105, dur=0.4, color="#c9c9c9"), cars(960, 520, 102, cols=21, gap=[78, 54], max=105, at=0.3, dur=1.6, color="#d83c33")], [("102 HAVE", "two", 960, 150, "down", "#d83c33")], sky="paper", ground=G, scale="object", tr="cut"),
]
R["s38"] = [
 S("dua batang: kebutuhan seratus lima, punya seratus dua, selisih menyala", "selisih berdenyut di puncak", [I("bar", x=800, y=840, w=200, h=420, color="#8a8fa3"), I("bar", x=1120, y=840, w=200, h=408, color="#d83c33", at=0.5)], [("GAP", "gap", 1120, 400, "down", "#d83c33")], sky="paper", ground=G, scale="object"),
 S("tiga belas gerbong biru-hijau Tokyo Metro dicoret satu per satu", "gerbong muncul, silang menimpanya", [cars(960, 480, 13, cols=13, gap=[100, 60], color="#2c8c86", dur=1.6), I("x", x=960, y=480, s=3.0, at="w:retire")], [("13 TRAINS", "Thirteen", 960, 200)], sky="paper", ground=G, scale="object", tr="push"),
]
R["s39"] = [
 S("jam berputar di samping pabrik, kereta baru belum selesai", "jarum jam berputar, kereta setengah jadi", [I("clock", x=640, y=500, s=1.8, rate=140), I("factory", x=1450, y=840, s=1.3)], [("1-2 YEARS", "years", 640, 250)], sky="day", ground="#c9bda0"),
 S("garis waktu 2026 ke 2028, penanda di 2027", "titik berjalan dari 2026 ke 2027 dan berhenti", [tl(360, 620, 1200, [2026, 2028], [(2026, "2026"), (2027, "2027")], up=2027, dur=2.6, color="#d83c33")], [("JAN 2026", "January", 360, 520), ("2027", "2027", 960, 470)], sky="paper", ground=G, scale="map", tr="wipe"),
]
R["s40"] = [
 S("peta: kapal berbalik arah dari Jakarta menuju Tokyo", "kapal berlayar ke arah Tokyo, garis menyala", [], [("SEPT 2026", "September", 1590, 330)], scale="map", tr="iris", map=dict(pins=["tokyo", "jakarta"], routes=[dict(route(PIN["jakarta"], (1250, 740), PIN["tokyo"]), dur=3.0)]), cam=MAPC),
]
R["s41"] = [
 S("dokumen permintaan terbang dari kereta ke gedung DPR", "dokumen melayang ke gedung, tanggal berdenyut", [I("parlemen", x=1380, y=840, s=1.3), train(120, 640, 0.5, "krl", 1, seed="ae"), I("doc", x=860, y=480, s=0.8, mark="ok", markAt=2.0), I("arrow", x=620, y=420, x2=1020, y2=420, at="w:parliament", color="#fff")], [("SEPT 23", "23", 960, 220), ("STOPGAP", "stopgap", 1380, 300)], sky="day", ground="#c9d0a8", scale="place"),
]
R["s42"] = [
 S("gedung DPR, centang hijau besar menyala di atasnya", "centang menyala, gedung diterangi", [I("parlemen", x=960, y=840, s=1.8), I("check", x=960, y=330, s=2.2, at="w:agreed")], [("AGREED", "agreed", 960, 160, "down", "#3ddc97")], sky="day", ground="#c9d0a8", scale="place"),
 S("dua puluh tiga gerbong dan pabrik kecil, satu syarat bercahaya", "gerbong muncul sampai dua puluh tiga, pabrik berasap", [cars(660, 360, 23, cols=12, gap=[80, 64], dur=2.0, color="#2166b0"), I("factory", x=1500, y=840, s=1.0)], [("23 USED TRAINS", "twenty-three", 660, 200), ("ONE CONDITION", "condition", 1500, 300)], sky="paper", ground=G, tr="push"),
]
R["s42a"] = [
 S("empat pihak berjajar: kereta KAI, gedung DPR, Sepuh Jepang, Pak Aturan", "keempatnya muncul satu per satu dengan pantulan", [train(40, 640, 0.3, "krl", 1, seed="af", at=0.2), I("parlemen", x=700, y=840, s=0.7, at=0.6), sepuh(1100, 840, 0.9, expr="smug", at=1.0), aturan(1500, 840, 1.1, expr="neutral", at=1.4)], [("4 WANTS", "something", 960, 300)], sky="paper", ground=G, scale="place"),
 S("kereta KAI di samping jam cepat, penumpang menunggu", "jarum jam berputar cepat, kereta bergeser", [train(40, 560, 0.55, "krl", 1, dx=40, seed="ag"), I("clock", x=1400, y=480, s=1.7, rate=420)], [("WITHIN MONTHS", "months", 1400, 250)], sky="jkt", ground=G, scale="object", tr="wipe"),
 S("DPR menunjuk pabrik INKA, pabrik mengembang dan berasap", "panah dari gedung ke pabrik, pabrik membesar", [I("parlemen", x=480, y=840, s=0.9), I("factory", x=1350, y=840, s=1.1), I("arrow", x=760, y=620, x2=1050, y2=620, at="w:growing", color="#2c8c86")], [("HOME INDUSTRY", "home", 1350, 240)], sky="day", ground="#c9d0a8", tr="cut"),
 S("Sepuh Jepang dengan tumpukan koin biaya, silang menimpa koin", "koin menghilang, Sepuh lega", [sepuh(700, 840, 1.4, expr="smug"), coins(1250, 830, 5, 1.5), I("x", x=1250, y=640, s=2.0, at="w:books")], [("OFF ITS BOOKS", "books", 1250, 420)], sky="tokyo", ground="#cfd3d8", tr="push"),
 S("Pak Aturan membanting stempel ke batas umur pada dokumen", "stempel menghantam, dokumen bergetar", [I("doc", x=700, y=540, s=1.5, mark="no", markAt="w:cap"), aturan(1250, 840, 1.5, slamAt="w:cap", expr="angry", flip=True)], [("A CAP", "cap", 700, 300)], sky="paper", ground=G, scale="object", tr="cut"),
]
R["s43"] = [
 S("peron sesak dan batang tinggi yang tumbuh", "batang prakiraan tumbuh, orang berdatangan", [crowd(960, 860, 13, s=1.0, gap=100, step=0.1, hot=0.6), I("bar", x=1700, y=840, w=120, h=400, color="#d83c33", at=0.4)], [("369 M TRIPS", "million", 960, 400)], sky="grey", ground="#aeb2ba", scale="place"),
 S("kereta hilang satu, peron makin penuh", "kerumunan menebal, satu kereta dicoret", [train(100, 520, 0.5, "krl", 1, seed="ah", dim=0.3), I("x", x=520, y=420, s=1.4, at="w:missing"), crowd(1200, 860, 16, s=1.05, gap=70, step=0.08, hot=0.8)], [("FULLER", "fuller", 1200, 440)], sky="grey", ground="#aeb2ba", tr="wipe"),
]
R["s43"] += R.pop("s42a")
R["s44"] = [
 S("Komo mengangkat bahu di samping jam berputar cepat", "jam berputar, Komo mengangkat bahu", [komo(600, 840, 1.45, pose="shrug", expr="tired"), I("clock", x=1350, y=500, s=1.9, rate=200)], [("TIME", "time", 1350, 250)], sky="paper", ground=G, scale="object"),
 S("garis waktu bulan: kapal cepat tiba dalam satu sampai dua bulan", "kapal melaju di atas garis waktu pendek", [tl(360, 640, 1200, [0, 24], [(1, "1 MO"), (2, "2 MO")], up=2, dur=1.8), I("ship", x=900, y=380, s=0.5, n=2, dx=60)], [("1-2 MONTHS", "months", 600, 520)], sky="sea", ground="#9cc3d6", scale="map", tr="push"),
 S("garis waktu tahun: kereta baru butuh satu sampai dua tahun", "titik waktu berjalan jauh lebih lama", [tl(360, 640, 1200, [0, 24], [(12, "1 YR"), (24, "2 YRS")], up=24, dur=3.0, color="#d83c33")], [("1-2 YEARS", "years", 960, 520, "down", "#d8322b")], sky="sea", ground="#9cc3d6", scale="map", tr="wipe"),
]
R["s45"] = [
 S("Pak Aturan mengangkat stempel besar di depan Komo", "stempel naik, Komo menoleh kaget", [aturan(1250, 840, 1.6, expr="neutral", slamAt=1.4, flip=True), komo(560, 840, 1.3, expr="shock", look=1)], [("A RULE", "rule", 960, 260)], sky="paper", ground=G, scale="object"),
 S("garis umur nol sampai tiga puluh tahun, batas dua puluh dengan cahaya merah", "titik berjalan sampai dua puluh dan berhenti", [tl(360, 620, 1200, [0, 30], [(0, "NEW"), (20, "LIMIT")], up=20, dur=2.6, color="#d83c33")], [("20 YEARS MAX", "twenty", 960, 440, "down", "#d8322b")], sky="paper", ground=G, scale="map", tr="wipe"),
]
R["s46"] = [
 S("garis umur dengan batas dua puluh dan kereta tawaran di dua puluh lima sampai dua puluh delapan", "titik melewati batas lalu berhenti di dua puluh delapan", [tl(360, 620, 1200, [0, 30], [(20, "LIMIT"), (25, "25"), (28, "28")], up=28, dur=3.0, color="#d83c33")], [("25-28 YEARS", "twenty-five", 1100, 430)], sky="paper", ground=G, scale="map"),
 S("garis waktu 1995 ke 2026, Sepuh bekerja sejak 1998", "titik mulai dari 1998 dan berjalan sampai kini", [tl(360, 680, 1200, [1995, 2026], [(1998, "1998"), (2026, "NOW")], up=2026, dur=3.0), sepuh(1500, 460, 0.8, expr="tired")], [("SINCE 1998", "1998", 520, 520)], sky="paper", ground=G, scale="map", tr="push"),
]
R["s47"] = [
 S("Pak Aturan dari Kementerian Perhubungan membawa dokumen baru", "dokumen baru dilempar ke tengah", [aturan(1250, 840, 1.6, expr="smug", flip=True), I("doc", x=700, y=540, s=1.4, mark="no", markAt=1.6)], [("TRANSPORT MINISTRY", "transport", 960, 240)], sky="paper", ground=G, scale="object"),
 S("kemeja turunan Komo berlubang dan melorot", "lubang bermunculan di kemeja, Komo menunduk", [komo(780, 840, 1.45, expr="sad"), I("shirt", x=1350, y=540, s=2.2, color="#2c8c86", hole=1, holeAt="w:wear")], [("WEAR OUT", "wear", 1350, 320)], sky="paper", ground=G, scale="object", tr="push"),
 S("garis umur dua puluh ke tiga puluh, hanya sepuluh tahun tersisa bercahaya", "titik berjalan dari dua puluh ke tiga puluh dan habis", [tl(360, 620, 1200, [0, 30], [(20, "20"), (30, "30")], up=30, dur=2.8, color="#d83c33")], [("~10 YEARS LEFT", "ten", 1380, 430, "down", "#d8322b")], sky="paper", ground=G, scale="map", tr="wipe"),
 S("Komo dengan tas belanja di depan etalase kereta baru", "Komo menggaruk kepala, tas belanja bergoyang", [komo(700, 840, 1.4, expr="tired", pose="shrug"), train(1000, 560, 0.4, "cn", 1, seed="ai"), coins(1650, 830, 6, 1.2, at="w:shopping")], [("SHOPPING AGAIN", "shopping", 960, 300)], sky="paper", ground=G, scale="place", tr="cut"),
]
R["s48"] = [
 S("Sepuh berkeringat dan berkarat, kabut karat di badannya", "keringat menetes, Sepuh terbatuk", [sepuh(960, 840, 1.7, expr="tired", sweat=True, dim=0.3)], [("HARDER", "harder", 960, 260)], sky="grey", ground="#aeb2ba", scale="object"),
 S("rak suku cadang kosong, Sepuh melihat dengan sedih", "kotak kecil muncul lalu lenyap satu per satu, silang menimpa", [sepuh(560, 840, 1.3, expr="sad", dim=0.2), cars(1330, 360, 6, cols=3, gap=[90, 70], color="#8a8fa3", dur=1.2), I("x", x=1330, y=380, s=2.2, at="w:out")], [("NO SPARE PARTS", "parts", 1330, 230)], sky="grey", ground="#aeb2ba", tr="push"),
]
R["s49"] = [
 S("dokumen rencana impor dicoret merah besar", "stempel silang menimpa dokumen", [I("doc", x=960, y=540, s=2.0, mark="no", markAt="w:cancelled")], [("NOV 5", "5", 640, 320), ("CANCELLED", "cancelled", 1280, 320, "down", "#d8322b")], sky="paper", ground=G, scale="object"),
 S("kereta baru berkilau dengan centang, Komo menoleh", "kilau menyapu kereta, centang muncul", [I("rails", y=900), train(-200, 540, 0.65, "cn", 2, dx=100, seed="aj"), I("check", x=1500, y=340, s=1.8, at="w:new"), komo(1620, 840, 1.1, expr="happy", flip=True)], [("MUST BE NEW", "new", 960, 300)], sky="day", ground=G, scale="place", tr="wipe"),
]
R["s50"] = [
 S("depo Tokyo tanpa kereta dan Komo mengangkat bahu", "bayangan gerbong hilang, Komo menggaruk kepala", [I("skyline", y=840, fill="#aebccf", seed="t4"), I("rails", y=900), komo(960, 840, 1.45, pose="shrug", expr="tired")], [("RAN OUT?", "ran", 960, 380)], sky="tokyo", ground="#cfd3d8", scale="place"),
 S("depo Tokyo penuh kereta, Komo terkejut dan tanda silang muncul di atas tebakan", "kereta muncul memenuhi depo, silang menimpa tanda tanya", [I("skyline", y=840, fill="#aebccf", seed="t5"), train(60, 560, 0.4, "toei", 2, seed="ak"), train(900, 560, 0.4, "metro", 2, seed="al"), komo(1640, 840, 1.1, expr="shock"), I("x", x=960, y=300, s=1.8, at=0.2)], [], sky="tokyo", ground="#cfd3d8", tr="push"),
 S("kereta Tokyo tua di samping Pak Aturan yang menunjuk batas umur", "stempel menghantam, kereta tertunduk", [train(40, 560, 0.5, "metro", 1, seed="am", dim=0.3), aturan(1250, 840, 1.5, expr="smug", slamAt="w:rule", flip=True)], [("TOO OLD", "old", 960, 280, "down", "#d8322b")], sky="paper", ground=G, scale="object", tr="wipe"),
]
R["s51"] = [
 S("garis umur dua puluh sampai tiga puluh tahun, Sepuh di ujungnya", "titik berjalan dari dua puluh ke tiga puluh", [tl(360, 640, 1200, [0, 40], [(20, "20"), (30, "30")], up=30, dur=2.8), sepuh(1540, 460, 0.8, expr="tired")], [("20-30 YEARS", "thirty", 960, 440)], sky="tokyo", ground="#cfd3d8", scale="map"),
 S("garis umur dengan batas merah dan kereta dijual di dua puluh delapan", "titik melewati batas merah dan berhenti", [tl(360, 640, 1200, [0, 40], [(20, "LIMIT"), (28, "FREE")], up=28, dur=2.8, color="#d83c33")], [("PAST LIMIT", "past", 1000, 440, "down", "#d8322b")], sky="tokyo", ground="#cfd3d8", scale="map", tr="push"),
]
R["s52"] = [
 S("garis waktu 2000 ke 2026, jendela terbuka lalu menutup sendiri", "titik berjalan, silang menutup jendela di ujung", [tl(360, 620, 1200, [2000, 2026], [(2000, "OPEN"), (2026, "CLOSED")], up=2026, dur=3.2), I("x", x=1560, y=420, s=1.6, at="w:closed")], [("2000", "2000", 460, 500)], sky="paper", ground=G, scale="map"),
 S("Sepuh pucat di samping kapal, silang menimpa kapal", "Sepuh memudar saat silang menutup jalur kapal", [sepuh(560, 840, 1.4, expr="sad", dim=0.4), I("ship", x=1330, y=790, s=0.8, n=3, dx=20), I("x", x=1330, y=560, s=2.0, at="w:shipped")], [("AGES OUT", "ages", 560, 330)], sky="sea", ground="#9cc3d6", scale="object", tr="wipe"),
]
R["s53"] = [
 S("Komo dan penumpang menunggu di peron kosong, Komo mengangkat bahu", "penumpang melirik ke ujung rel", [crowd(1200, 860, 6, s=1.0, gap=90, step=0.1), komo(640, 840, 1.45, pose="shrug", expr="tired")], [("WHAT NEXT?", "next", 960, 330)], sky="grey", ground="#aeb2ba", scale="place"),
 S("tiga panggung: pabrik INKA, Sepuh tua, kapal impor", "ketiganya muncul berurutan", [I("factory", x=480, y=840, s=0.7, at="w:INKA"), sepuh(960, 840, 1.0, expr="tired", at="w:old"), I("ship", x=1450, y=780, s=0.7, n=3, at="w:import", dx=10)], [("3 OPTIONS", "three", 960, 220)], sky="paper", ground=G, scale="object", tr="push"),
]
R["s54"] = [
 S("kapal impor dengan silang besar, tiga gerbong menunggu", "silang menimpa kapal", [I("ship", x=960, y=780, s=1.0, n=3), I("x", x=960, y=520, s=2.4, at="w:off")], [("NO IMPORTS", "imports", 960, 300)], sky="sea", ground="#9cc3d6", scale="object"),
 S("Sepuh bertahan di kiri, pabrik INKA mempercepat di kanan", "jam berputar cepat di pabrik", [sepuh(560, 840, 1.3, expr="tired", sweat=True), I("factory", x=1400, y=840, s=1.1), I("clock", x=1020, y=420, s=0.9, rate=360)], [("BUILD FASTER", "faster", 1400, 260)], sky="day", ground="#c9bda0", tr="wipe"),
 S("Sepuh di samping kue berlilin empat puluhan", "lilin menyala, Sepuh menarik napas", [sepuh(700, 840, 1.5, expr="tired", sweat=True), I("cake", x=1330, y=840, s=1.5, candles=12, at="w:forty")], [("PAST 40", "forty", 1330, 470)], sky="paper", ground=G, tr="cut"),
]
R["s55"] = [
 S("dokumen anggaran dengan centang besar", "centang menyala di dokumen", [I("doc", x=960, y=540, s=2.0, mark="ok", markAt="w:approved")], [("APPROVED", "approved", 960, 230, "down", "#3ddc97")], sky="paper", ground=G, scale="object"),
 S("tumpukan koin lima triliun dan tiga puluh gerbong baru di sampingnya", "koin menumpuk, gerbong muncul tiga puluh", [coins(480, 840, 16, 1.0), cars(1100, 480, 30, cols=10, gap=[90, 60], dur=2.2, color="#c8102e")], [("RP 5 T", "trillion", 480, 420), ("30 TRAINS", "thirty", 1100, 300)], sky="paper", ground=G, scale="object", tr="wipe"),
]
R["s56"] = [
 S("delapan puluh empat gerbong tersusun, garis waktu 2026 ke 2030 di bawahnya", "gerbong muncul satu per satu, titik waktu berjalan ke 2030", [cars(960, 330, 84, cols=21, gap=[60, 44], max=84, dur=2.6, color="#e8772e"), tl(420, 820, 1080, [2026, 2030], [(2026, "1.1 M"), (2030, "1.4 M")], up=2030, dur=3.4)], [("84 TRAINS", "eighty-four", 960, 170), ("1.4 M DAILY", "four", 1500, 720)], sky="paper", ground=G, scale="object"),
]
R["s57"] = [
 S("peta: kapal-kapal pembawa kereta Tokyo berlayar ke Jakarta selama dua puluh lima tahun", "kapal bergantian berlayar, garis menebal", [], [("25 YEARS", "twenty-five", 960, 480)], scale="map", tr="iris", map=dict(pins=["tokyo", "jakarta"], routes=[dict(TJ, at=0.2, dur=2.0), dict(TJ, at=0.7, dur=2.0, color="#ffd23f"), dict(TJ, at=1.2, dur=2.0, color="#ff9f6e")]), cam=MAPC),
 S("Sepuh tua melewati stempel Pak Aturan, pabrik membuat kereta baru di kanan", "stempel menghantam, pabrik mengeluarkan kereta", [sepuh(480, 840, 1.1, expr="sad", dim=0.3), aturan(900, 840, 1.2, slamAt="w:aged", expr="smug"), I("factory", x=1520, y=840, s=1.0), train(1180, 600, 0.35, "inka", 1, dx=50, seed="an")], [("HOME-BUILT", "home", 1520, 260)], sky="paper", ground=G, scale="place", tr="wipe"),
 S("Komo di depan lemari kosong, hanya satu kemeja berlubang tergantung; penolakan November bermula dari lemari ini", "lemari kosong bergoyang, kemeja berlubang jatuh", [komo(700, 840, 1.4, expr="sad"), I("shirt", x=1250, y=520, s=2.2, color="#2c8c86", hole=1, holeAt=0.4)], [("NOVEMBER", "November", 1250, 300)], sky="paper", ground=G, scale="object", tr="push"),
]
R["s58"] = [
 S("peta zoom ke pulau Jawa, lebih dari separuh titik penduduk menyala", "kamera masuk ke Jawa, titik menyala sampai lebih dari separuh", [dots(760, 600, 100, 56, cols=20, r=9, gap=22, on="#d83c33", dur=2.2)], [("OVER HALF", "half", 760, 400)], scale="map", tr="push", map=dict(pins=["jakarta"], hi="jawa"), cam=[[900, 760, 1.4], [760, 830, 2.2]]),
 S("pulau Jawa raksasa dikelilingi banyak orang", "kerumunan mengisi pulau, kamera menjauh", [I("island", x=960, y=640, s=2.4), crowd(960, 700, 10, s=0.7, gap=110, step=0.1)], [("WHY JAVA?", "Java", 960, 260)], sky="sea", scale="object", tr="iris"),
]

# ---------------------------------------------------------------- terapkan ke script
ids = [s["id"] for s in d["scenes"]]
missing = [i for i in ids if i not in R]; assert not missing, f"scene tanpa shots: {missing}"
ts = []
for s in d["scenes"]:
    sid = s["id"]; shots = []; ts.append((sid, []))
    for n, (contract, st) in enumerate(R[sid], 1):
        shots.append(dict(sentence=n, **contract)); ts[-1][1].append(st)
    for k in ("visual", "stage"): s.pop(k, None)
    b = s.get("broll")
    if sid == "s02" and b: s.pop("broll")                          # s02 = analogi fondasi, digambar R3 (klip -01 dipindah ke cadangan)
    elif b and "lic" not in b and sid != "s44": s.pop("broll")      # stok tidak terpakai di render 001 (hanya s44)
    if s.get("broll"): s.pop("shots", None); ts.pop()                # scene footage nyata: mesin R3 mengabaikan broll bila ada shots
    else: s["shots"] = shots
d.pop("world", None)
d["anchor"] = {"kind": "map", "desc": "satu peta Jepang-Jawa-Tiongkok: garis laut Tokyo-Jakarta, pin kota, kapal yang membawa kereta bolak-balik; muncul di fondasi, tengah, dan penutup"}
d["cast"] = ["komo", "sepuh", "aturan"]
d["shorts_cuts"] = [
 {"name": "A1-why-tokyo-trains-fit", "scene_ids": ["s01", "s08", "s12", "s14", "s15"], "hook_override": "You step onto a Jakarta train that started in Tokyo. Here's why it still fits."},
 {"name": "A2-too-old-to-import", "scene_ids": ["s42", "s45", "s46", "s49", "s50"], "hook_override": "You'd think Jakarta could just buy more of Tokyo's old trains. A rule said no."},
]
json.dump(d, open(P, "w"), ensure_ascii=False, indent=2)
# ---------------------------------------------------------------- 04-shots.tsx
# 04-shots.tsx sekarang ditulis tangan (versi 3D, 2026-11-26); generator ini tidak lagi membuat atau menimpanya.
print("scenes", len(d["scenes"]), "shots", sum(len(s.get("shots", [])) for s in d["scenes"]))
