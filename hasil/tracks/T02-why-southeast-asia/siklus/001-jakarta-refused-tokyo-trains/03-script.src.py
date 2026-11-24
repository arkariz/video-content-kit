#!/usr/bin/env python3
"""Generator 03-script.json untuk T02 siklus 001 (dijalankan sekali, hasilnya di-commit)."""
import json, sys

OUT = sys.argv[1]

SRC = {
 "toei2000": "https://en.wikipedia.org/wiki/KRL_Commuterline",
 "katadata2019": "https://katadata.co.id/berita/2019/08/21/candu-impor-kereta-bekas-jepang",
 "bisnis2013": "https://ekonomi.bisnis.com/read/20130830/98/159808/kereta-bekas-rp1-miliar-kalau-baru-rp10-miliar-bisa-bikin-ongkos-naik-lagi",
 "detik2019": "https://finance.detik.com/read/2019/08/19/161619/4671967/1036/ri-bisa-bikin-krl-tapi-kok-impor-yang-bekas-dari-jepang",
 "nwj": "https://www.newsweekjapan.jp/articles/-/21721?page=1",
 "gauge": "https://en.wikipedia.org/wiki/Rail_transport_in_Indonesia",
 "elec1925": "https://en.wikipedia.org/wiki/KRL_Commuterline",
 "rmol2012": "https://rmol.id/read/2012/05/16/64003/atap-berkarat-gerbong-penuh-poster-iklan",
 "bisnis2026jul": "https://ekonomi.bisnis.com/read/20260713/98/1987706/kai-sebut-18-krl-baru-siap-beroperasi-9-rangkaian-pensiun-tahun-ini",
 "cnbc2023": "https://www.cnbcindonesia.com/news/20230303072844-4-418508/impor-krl-bekas-jepang-berpolemik-ini-biang-keroknya",
 "metrotv": "https://www.metrotvnews.com/play/NxGCXq5a-dulu-ditolak-kini-indonesia-mau-impor-krl-bekas-dari-jepang",
 "bisnis2024": "https://ekonomi.bisnis.com/read/20240201/98/1737487/perbandingan-impor-krl-dari-china-dan-jepang-siapa-lebih-mahal",
 "liputan6": "https://www.liputan6.com/bisnis/read/6007403/kai-commuter-kembali-terima-2-krl-baru-dari-china",
 "rri2025": "https://rri.co.id/en/archipelago/1967107/jakarta-s-legendary-krl-trains-retired-after-decades-of-service",
 "irj": "https://www.railjournal.com/fleet/indonesias-kai-abandons-plans-to-import-second-hand-japanese-trains/",
 "katadata2026sep": "https://katadata.co.id/infografik/6ab9d5bf9a9fd/infografik-impor-krl-eks-jepang-kembali-diizinkan",
 "katadata2026nov": "https://katadata.co.id/amp/finansial/makro/6aec65cdc2b9f/kai-batalkan-impor-krl-bekas-23-trainset-akan-dipasok-dari-dalam-negeri",
 "bisnis2026oct3": "https://ekonomi.bisnis.com/read/20261003/98/2009402/impor-krl-bekas-terganjal-usia-kereta",
 "bisnis2026oct10": "https://ekonomi.bisnis.com/read/20261010/98/2011478/kemenhub-ingin-pt-kai-punya-krl-baru-bukan-bekas",
 "bisnis2026nov10": "https://ekonomi.bisnis.com/read/20261110/98/2020013/3-pertimbangan-kai-batal-impor-krl-bekas-jepang",
 "detik2026nov5": "https://finance.detik.com/infrastruktur/d-8740270/impor-krl-bekas-akhirnya-batal",
 "irjfleet": "https://www.railjournal.com/passenger/commuter-rail/indonesia-pursues-major-fleet-modernisation/",
 "w205": "https://en.wikipedia.org/wiki/205_series",
 "puslit2024": "https://berkas.dpr.go.id/pusaka/files/isu_sepekan/Isu Sepekan---I-PUSLIT-Februari-2024-228.pdf",
 "detik18": "https://finance.detik.com/infrastruktur/d-8571647/kai-buka-bukaan-18-krl-baru-sudah-beroperasi",
 "republika2014": "https://ekonomi.republika.co.id/berita/ng0apv/impor-kereta-demi-tarif-murah",
 "afu": "https://afu.id/ekonomi/dirut-kai-batalkan-impor-23-krl-bekas-jepang-yang-sudah-disetujui-dpr-ini-alasannya",
 "detik2025crrc": "https://finance.detik.com/infrastruktur/d-7943442/krl-made-in-china-resmi-operasi-punya-banyak-fitur-baru",
 "investortrust": "https://investortrust.id/business/121803/kai-scraps-plan-to-import-used-japanese-commuter-trains-prioritizes-domestic-fleet",
}
def src(key, claim): return {"url": SRC[key], "claim": claim}
def A(id, kind, x, label=None, emo=None, say=None, at=None, **kw):
    a = {"id": id, "kind": kind, "x": x}
    if label: a["label"] = label
    if emo: a["emo"] = emo
    if say: a["say"] = {"text": say, "at": at if at is not None else 0.2}
    a.update(kw); return a

S = []
def scene(id, role, en, idn, vtype, desc, spec=None, ost=None, stage=None, broll=None, sources=None):
    v = {"type": vtype, "description": desc}
    if ost: v["on_screen_text"] = ost
    if spec: v["spec"] = spec
    s = {"id": id, "role": role, "narration": {"en": en, "id": idn}, "visual": v, "stage": stage or {"bg": "paper"}}
    if broll: s["broll"] = broll
    if sources: s["sources"] = sources
    S.append(s)

GUIDE = lambda x=0.14, **kw: A("g", "guide", x, "GUIDE", **kw)

# ---------- HOOK ----------
scene("s01", "hook",
 "This train used to carry commuters in Tokyo. Jakarta still runs hundreds of cars like it, and this month it refused to buy any more.",
 "Kereta ini dulu mengangkut penumpang di Tokyo. Jakarta masih menjalankan ratusan gerbong seperti ini, dan bulan ini Jakarta menolak membeli lagi.",
 "broll", "Footage milik kreator: interior KRL eks JR East 205, stiker dan tulisan Jepang di dinding gerbong",
 ost="Filmed on Jakarta's commuter line, Nov 2026",
 stage={"bg": "none", "actors": [GUIDE(0.12, emo="think", scale=0.7)]},
 broll={"own": "krl-01.mp4"},
 sources=[src("detik2026nov5", "KAI memastikan tidak mengimpor KRL bekas Jepang (5 Nov 2026)")])
scene("s02", "context",
 "The reason it came here is simple. The reason it stopped is a rule about age, and it explains what Jakarta's commuters ride next.",
 "Alasan kereta ini datang ke sini sederhana. Alasan berhentinya adalah aturan soal umur, dan itu menentukan kereta apa yang dinaiki warga Jakarta berikutnya.",
 "broll", "Footage milik kreator: rangkaian eks Jepang masuk peron",
 stage={"bg": "none", "actors": []}, broll={"own": "krl-02.mp4"})
scene("s03", "context",
 "Three parts. Why Tokyo's trains fit Jakarta. Why the deal worked for twenty-five years. And why it ended in November 2026.",
 "Tiga bagian. Kenapa kereta Tokyo cocok untuk Jakarta. Kenapa cara ini berjalan dua puluh lima tahun. Dan kenapa berakhir di November 2026.",
 "remotion-diagram", "Garis waktu tiga blok: 2000 (mulai), 2000-2025 (jalan), Nov 2026 (berhenti)",
 spec={"kind": "timeline", "blocks": [{"title": "Why they fit", "sub": "the rails", "tone": "lit"}, {"title": "Why it worked", "sub": "2000 to 2025", "tone": "dim"}, {"title": "Why it ended", "sub": "Nov 2026", "tone": "dim"}]},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [GUIDE(0.18, emo="happy", scale=0.75), A("t", "train", 0.72, "OLD TRAIN", "smug", "I've heard this story.", 0.55, scale=0.8)]})

# ---------- ACT 1: why they fit ----------
scene("s04", "body",
 "It started with a gift. In May 2000, Japan donated seventy-two used subway cars from Tokyo's Mita Line.",
 "Semuanya dimulai dari hibah. Mei 2000, Jepang memberi tujuh puluh dua gerbong kereta bawah tanah bekas dari jalur Mita di Tokyo.",
 "remotion-data", "Angka besar 72 gerbong, label Toei 6000, Mei 2000",
 spec={"kind": "bignum", "total": "72 cars", "label": "Toei 6000 series, donated May 2000", "mark": "from Tokyo's Mita Line"},
 stage={"bg": "sea", "insert": {"pos": "top"}, "actors": [A("sh", "ship", 0.3, "SHIP", "happy", scale=0.9), A("t", "train", 0.7, "TOEI 6000", "happy", "Is it always this warm?", 0.45, scale=0.7)]},
 sources=[src("toei2000", "Mei 2000, Jepang lewat JICA dan Pemerintah Metropolitan Tokyo menghibahkan 72 unit Toei 6000 bekas jalur Mita")])
scene("s04b", "body",
 "Those cars were built from 1968. Tokyo retired them after about thirty years of service, and Jakarta kept them running until 2016.",
 "Gerbong itu dibuat mulai 1968. Tokyo memensiunkannya setelah sekitar tiga puluh tahun, dan Jakarta masih menjalankannya sampai 2016.",
 "remotion-diagram", "Garis waktu Toei 6000: 1968 dibuat, 1999 pensiun di Tokyo, 2000-2016 di Jakarta",
 spec={"kind": "timeline", "blocks": [{"title": "1968", "sub": "built for Tokyo", "tone": "dim"}, {"title": "1999", "sub": "retired in Tokyo", "tone": "hot"}, {"title": "2000 to 2016", "sub": "second life in Jakarta", "tone": "lit"}]},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("t", "train", 0.78, "TOEI 6000", "happy", "Retirement? Never heard of it.", 0.6, scale=0.75)]},
 sources=[src("toei2000", "Toei 6000 beroperasi di jalur Mita 1968-1999, di KCI 2000-2016"), src("katadata2019", "Toei 6000 mulai beroperasi di Jepang 1968, dipensiunkan setelah 32 tahun")])
scene("s05", "body",
 "They were the first air-conditioned electric trains in Indonesia. At the time, crowded riders hung out of open doors or sat on the roof.",
 "Itu kereta listrik ber-AC pertama di Indonesia. Waktu itu, penumpang yang berjejal bergelantungan di pintu terbuka, bahkan duduk di atap.",
 "remotion-diagram", "Dua kolom: sebelum 2000 (tanpa AC, penumpang di atap), sesudah (gerbong ber-AC)",
 spec={"kind": "checks", "header": "Jakarta commuter trains", "items": [{"text": "Older trains: no air conditioning", "mark": "odd"}, {"text": "Riders on the roof at rush hour", "mark": "odd"}, {"text": "2000: first air-conditioned electric trains", "mark": "ok"}]},
 stage={"bg": "station", "insert": {"pos": "right"}, "actors": [A("c", "commuter", 0.2, "COMMUTER", "shock", "Wait, it's cold in here?", 0.5, scale=0.85)]},
 sources=[src("toei2000", "Toei 6000 adalah kereta listrik ber-AC pertama di Indonesia"), src("katadata2019", "Sebelum itu banyak penumpang duduk di atap karena gerbong terlalu padat")])
scene("s06", "body",
 "Then Jakarta started buying them. In 2014, the operator said a used car from Japan cost eight hundred million to one billion rupiah.",
 "Lalu Jakarta mulai membeli. Tahun 2014, operatornya bilang satu gerbong bekas dari Jepang harganya delapan ratus juta sampai satu miliar rupiah.",
 "remotion-data", "Statistik: gerbong bekas sekitar Rp1 miliar",
 spec={"kind": "stats", "items": [{"label": "Used car from Japan", "value": "Rp 0.8 to 1 bn", "tone": "good", "sub": "2014"}]},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.2, "BUYER", "think", scale=0.8), A("t", "train", 0.75, "USED CAR", "smug", "I come pre-loved.", 0.5, scale=0.8)]},
 sources=[src("republika2014", "KCJ 2014: kereta bekas dari Jepang Rp800 juta sampai Rp1 miliar per unit, kereta baru Rp10 sampai 12 miliar")])
scene("s07", "body",
 "A new car cost ten to twelve billion. Same seats, same doors, about one tenth of the price.",
 "Gerbong baru sepuluh sampai dua belas miliar. Kursinya sama, pintunya sama, harganya kira-kira sepersepuluh.",
 "remotion-data", "Batang: bekas Rp1 miliar vs baru Rp10 miliar",
 spec={"kind": "bars", "bars": [{"label": "Used, from Japan", "v": 1, "tone": "good"}, {"label": "New", "v": 11, "tone": "hot"}], "unit": "billion rupiah per car, 2014"},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.2, "BUYER", "happy", "I'll take ten.", 0.6, scale=0.8)], "fx": [{"type": "coins", "at": 0.5, "n": 10}]},
 sources=[src("republika2014", "Kereta baru Rp10 sampai 12 miliar, bekas Rp800 juta sampai Rp1 miliar (2014)")])
scene("s08", "body",
 "Indonesia's own train maker, INKA, quoted about one point three million dollars for a new car in 2019.",
 "Pabrik kereta Indonesia sendiri, INKA, mematok sekitar satu koma tiga juta dolar per gerbong baru di 2019.",
 "remotion-data", "Statistik: harga INKA US$1,3 juta per gerbong (2019)",
 spec={"kind": "stats", "items": [{"label": "Used, from Japan", "value": "~Rp 2 bn", "tone": "good", "sub": "INKA's estimate, 2019"}, {"label": "New, from INKA", "value": "US$1.3 m", "tone": "hot", "sub": "2019"}], "between": "vs"},
 stage={"bg": "city", "insert": {"pos": "full"}, "actors": []},
 sources=[src("detik2019", "Dirut INKA 2019: kereta bekas Jepang sekitar Rp2 miliar, kereta INKA sekitar US$1,3 juta")])
scene("s09", "body",
 "For Japan, the deal was just as good. Scrapping a train costs money. Shipping it to Jakarta cost less, and somebody else would keep using it.",
 "Untuk Jepang, ini juga untung. Membuang kereta itu mahal. Mengirimnya ke Jakarta lebih murah, dan keretanya tetap dipakai orang lain.",
 "remotion-diagram", "Alur: kereta pensiun di Tokyo → ongkos membuang mahal → kirim ke Jakarta",
 spec={"kind": "flow", "nodes": [{"label": "Retired in Tokyo"}, {"label": "Scrap it", "sub": "costs money", "tone": "bad"}, {"label": "Ship it to Jakarta", "sub": "costs less", "tone": "good"}], "edges": ["option 1", "option 2"]},
 stage={"bg": "sea", "insert": {"pos": "top"}, "actors": [A("sh", "ship", 0.25, "SHIP", "happy", "Next stop, Tanjung Priok.", 0.55, scale=0.9)]},
 sources=[src("katadata2019", "Di Jepang, membuang barang bekas pun ongkosnya mahal")])

scene("s10", "rehook",
 "But price alone doesn't explain it. A train from Tokyo can't run in most countries without major changes. In Jakarta, it can.",
 "Tapi harga saja tidak cukup menjelaskan. Kereta dari Tokyo tidak bisa jalan di kebanyakan negara tanpa diubah besar. Di Jakarta, bisa.",
 "broll", "Footage milik kreator: rel dan kabel listrik aliran atas dari jendela kereta",
 stage={"bg": "none", "actors": [GUIDE(0.12, emo="smug", scale=0.7)]}, broll={"own": "krl-05.mp4"})
scene("s11", "body",
 "The rails are the same width. Japan's regular lines and Java's lines are both one thousand and sixty-seven millimetres apart.",
 "Lebar relnya sama. Jalur kereta biasa di Jepang dan jalur di Jawa sama-sama seribu enam puluh tujuh milimeter.",
 "remotion-data", "Dua batang sama panjang: Jepang 1.067 mm, Jawa 1.067 mm; pembanding 1.435 mm (Eropa, China)",
 spec={"kind": "bars", "bars": [{"label": "Japan, regular lines: 1,067 mm", "v": 1067, "tone": "good"}, {"label": "Java: 1,067 mm", "v": 1067, "tone": "good"}, {"label": "Europe, China: 1,435 mm", "v": 1435, "tone": "muted"}], "unit": "track gauge"},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.82, "ENGINEER", "happy", "Measured twice.", 0.6, scale=0.8)]},
 sources=[src("nwj", "Jalur konvensional Jepang 1.067 mm; Indonesia sama; Eropa, China 1.435 mm atau lebih"), src("gauge", "Lebar rel utama Indonesia 1.067 mm")])
scene("s12", "body",
 "That match has a history. Java's first railway was built wider. During the Japanese occupation in the 1940s, those lines were converted to the Japanese width.",
 "Kesamaan ini ada sejarahnya. Jalur kereta pertama di Jawa dibangun lebih lebar. Saat pendudukan Jepang tahun 1940-an, jalur itu diubah ke lebar rel Jepang.",
 "remotion-diagram", "Garis waktu: 1867 rel 1.435 mm, 1942-1945 diubah ke 1.067 mm",
 spec={"kind": "timeline", "blocks": [{"title": "1867", "sub": "first line: 1,435 mm", "tone": "dim"}, {"title": "1942 to 1945", "sub": "converted to 1,067 mm", "tone": "hot"}, {"title": "Today", "sub": "Java runs on 1,067 mm", "tone": "lit"}]},
 stage={"bg": "map", "view": {"lon": [104, 116], "lat": [-10, -3]}, "insert": {"pos": "top"}, "actors": [GUIDE(0.12, emo="think", scale=0.7)], "fx": [{"type": "pin", "place": "jakarta", "label": "Batavia", "at": 0.3}, {"type": "route", "from": [110.4, -7.0], "to": [110.4, -7.8], "label": "1867", "at": 0.5, "dur": 0.2}]},
 sources=[src("gauge", "Rel pertama 1867 memakai 1.435 mm; saat pendudukan Jepang dikonversi ke 1.067 mm"), src("nwj", "Lebar rel Indonesia diseragamkan oleh Jepang saat Perang Dunia II")])
scene("s13", "body",
 "The power matches too. Jakarta's electric line opened in 1925 on fifteen hundred volts DC, the same system the 205 series was built for in Tokyo.",
 "Listriknya juga cocok. Jalur listrik Jakarta dibuka tahun 1925 dengan seribu lima ratus volt DC, sistem yang sama dengan rancangan seri 205 di Tokyo.",
 "remotion-data", "Statistik: 1.500 V DC aliran atas, sejak 1925",
 spec={"kind": "stats", "items": [{"label": "Jakarta, since 1925", "value": "1,500 V DC", "tone": "good"}, {"label": "205 series, Tokyo", "value": "1,500 V DC", "tone": "good"}], "between": "="},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("t", "train", 0.2, "OLD TRAIN", "happy", "Feels like home.", 0.55, scale=0.8)]},
 sources=[src("elec1925", "Jalur listrik Jakarta selesai 1924-1925 dengan 1.500 V DC aliran atas"), src("w205", "Seri 205 (komuter Tokyo) memakai 1.500 V DC aliran atas")])
scene("s14", "body",
 "Same rails, same power. A Tokyo train arrives by ship, gets new signs and checks, and goes into service with no rebuilding of the tracks.",
 "Rel sama, listrik sama. Kereta Tokyo datang naik kapal, diganti tandanya dan diperiksa, lalu langsung dipakai tanpa membongkar rel.",
 "remotion-diagram", "Alur: kapal → pelabuhan → pemeriksaan → beroperasi",
 spec={"kind": "flow", "nodes": [{"label": "Ship"}, {"label": "Tanjung Priok port"}, {"label": "Checks, new signs"}, {"label": "In service", "tone": "good"}], "edges": ["", "", ""]},
 stage={"bg": "sea", "insert": {"pos": "top"}, "actors": [A("sh", "ship", 0.2, "SHIP", "happy", scale=0.85), A("e", "engineer", 0.8, "ENGINEER", "smug", "No new rails needed.", 0.6, scale=0.8)]},
 sources=[src("rmol2012", "Gerbong eks Jepang diturunkan di Pelabuhan Tanjung Priok lalu dirangkai")])
scene("s15", "body",
 "So Jakarta kept buying. In 2012, the operator planned to bring in one hundred and forty cars that year, and aimed for fourteen hundred and forty cars by 2019.",
 "Jadi Jakarta terus membeli. Tahun 2012, operatornya menargetkan seratus empat puluh gerbong tahun itu, dan seribu empat ratus empat puluh gerbong di 2019.",
 "remotion-data", "Counter naik: 140 (2012) ke 1.440 (target 2019)",
 spec={"kind": "counter", "values": ["140", "500", "1,000", "1,440"], "label": "planned fleet, cars (target for 2019)", "tone": "hot"},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("c", "commuter", 0.15, "COMMUTER", "happy", scale=0.75), A("h", "hijab", 0.85, "COMMUTER", "happy", "More trains, fewer roofs.", 0.6, scale=0.75)]},
 sources=[src("rmol2012", "KCJ 2012 menargetkan 140 unit tahun itu dan 1.440 kereta pada 2019")])
scene("s15b", "body",
 "The biggest batch came later. JR East's 205 series, a Tokyo commuter train first built in 1985, started running in Jakarta in 2013.",
 "Gelombang terbesar datang belakangan. Seri 205 milik JR East, kereta komuter Tokyo yang pertama dibuat tahun 1985, mulai jalan di Jakarta tahun 2013.",
 "remotion-diagram", "Garis waktu seri 205: 1985 diperkenalkan di Tokyo, 2013 mulai di Jakarta",
 spec={"kind": "timeline", "blocks": [{"title": "1985", "sub": "205 series enters service in Tokyo", "tone": "dim"}, {"title": "2013", "sub": "first 205s run in Jakarta", "tone": "lit"}]},
 stage={"bg": "sea", "insert": {"pos": "top"}, "actors": [A("sh", "ship", 0.22, "SHIP", "happy", scale=0.85), A("t", "train", 0.78, "205 SERIES", "smug", "Window seat, please.", 0.6, scale=0.75)]},
 sources=[src("w205", "Seri 205 diperkenalkan JNR 1985, dioperasikan KAI Commuter sejak 2013")])
scene("s16", "body",
 "Today the backbone is still Japanese. Seven hundred and eighty cars came from JR East's 205 series, and one hundred and twenty-eight from Tokyo Metro.",
 "Sampai sekarang tulang punggungnya masih Jepang. Tujuh ratus delapan puluh gerbong dari seri 205 milik JR East, dan seratus dua puluh delapan dari Tokyo Metro.",
 "remotion-data", "Breakdown armada: 780 JR East 205, 128 Tokyo Metro 6000",
 spec={"kind": "breakdown", "total": "908 cars", "parts": [{"label": "JR East 205", "value": "780"}, {"label": "Tokyo Metro 6000", "value": "128"}]},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("t", "train", 0.18, "205 SERIES", "smug", scale=0.8)]},
 sources=[src("bisnis2026jul", "Masih beroperasi 780 unit JR East 205 dan 128 unit Tokyo Metro 6000 (Juli 2026)")])
scene("s17", "body",
 "Those cars are thirty-four to forty-one years old. Many of them started work in Tokyo before the Berlin Wall fell.",
 "Umur gerbong itu tiga puluh empat sampai empat puluh satu tahun. Banyak yang mulai bekerja di Tokyo sebelum Tembok Berlin runtuh.",
 "remotion-data", "Angka besar: 34 sampai 41 tahun",
 spec={"kind": "bignum", "total": "34 to 41 years", "label": "age of the Japanese cars still running", "mark": "built in the 1980s"},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("t", "train", 0.2, "205 SERIES", "sad", "My knees, though.", 0.6, scale=0.8)]},
 sources=[src("bisnis2026jul", "Usia JR East 205 dan Tokyo Metro 6000: 34 sampai 41 tahun")])

# ---------- ACT 2: 2023 ----------
scene("s18", "rehook",
 "A fleet that old needs replacing. The first attempt to replace it with more Tokyo trains came in 2023, and it was blocked.",
 "Armada setua itu harus diganti. Upaya pertama menggantinya dengan kereta Tokyo lagi terjadi di 2023, dan ditolak.",
 "remotion-diagram", "Stempel DITOLAK di atas tahun 2023",
 spec={"kind": "stamp", "lines": ["Import request, 2023", "Used cars from Japan"], "stamp": "BLOCKED", "tone": "bad"},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("c", "city", 0.2, "JAKARTA", "worry", scale=0.8)], "fx": [{"type": "stamp", "text": "BLOCKED", "tone": "bad", "at": 0.6, "x": 0.5, "y": 0.2}]})
scene("s19", "body",
 "The operator asked to import three hundred and forty-eight used cars of a newer Japanese model, the E217, for 2023 and 2024.",
 "Operatornya minta izin impor tiga ratus empat puluh delapan gerbong bekas model Jepang yang lebih baru, E217, untuk 2023 dan 2024.",
 "remotion-data", "Breakdown: 120 gerbong (2023) + 228 gerbong (2024) = 348 E217",
 spec={"kind": "breakdown", "total": "348 cars", "parts": [{"label": "for 2023", "value": "120"}, {"label": "for 2024", "value": "228"}]},
 stage={"bg": "paper", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.2, "OPERATOR", "happy", "Just a few more?", 0.6, scale=0.8)]},
 sources=[src("cnbc2023", "KCI mengajukan impor 120 unit KRL tipe E217 untuk 2023 dan 228 unit untuk 2024")])
scene("s20", "body",
 "The government said no. The cars stayed in Japan. Officials chose to refit old trains and buy new ones instead.",
 "Pemerintah menolak. Gerbongnya tetap di Jepang. Pemerintah memilih memperbarui kereta lama dan membeli kereta baru.",
 "remotion-diagram", "Daftar pilihan 2023: retrofit kereta lama, beli baru dari INKA, beli baru dari China",
 spec={"kind": "checks", "header": "The 2023 decision", "items": [{"text": "Import used cars from Japan", "mark": "odd"}, {"text": "Refit the old trains", "mark": "ok"}, {"text": "Buy new trains", "mark": "ok"}]},
 stage={"bg": "paper", "insert": {"pos": "right"}, "actors": [GUIDE(0.18, emo="neutral", scale=0.8)]},
 sources=[src("metrotv", "2023 pemerintah menolak impor KRL bekas Jepang, memilih retrofit KRL lama dan pengadaan KRL baru")])
scene("s21", "body",
 "New trains came from two places. A Chinese maker, CRRC Sifang, and INKA in East Java.",
 "Kereta baru datang dari dua tempat. Pabrikan China, CRRC Sifang, dan INKA di Jawa Timur.",
 "remotion-diagram", "Dua sumber kereta baru: CRRC Sifang (China), INKA (Madiun)",
 spec={"kind": "flow", "nodes": [{"label": "CRRC Sifang", "sub": "China"}, {"label": "KAI Commuter", "tone": "hot"}, {"label": "INKA", "sub": "Madiun, East Java"}], "edges": ["new trains", {"label": "new trains", "back": True}]},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.5, "OPERATOR", "think", scale=0.8)]},
 sources=[src("liputan6", "Total pemesanan: 16 trainset INKA dan 11 trainset CRRC Qingdao Sifang")])
scene("s21b", "body",
 "INKA also took a contract to refit nineteen of the old trains, so they could keep running while the new ones were built.",
 "INKA juga mendapat kontrak memperbarui sembilan belas rangkaian lama, supaya tetap bisa jalan selama kereta baru dibuat.",
 "remotion-data", "Angka besar: 19 rangkaian lama di-retrofit oleh INKA",
 spec={"kind": "bignum", "total": "19 trains", "label": "old trains refitted by INKA", "mark": "keep them running a few more years"},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.82, "INKA", "happy", "New paint, same knees.", 0.6, scale=0.8)]},
 sources=[src("puslit2024", "KAI Commuter melakukan peremajaan atau retrofit 19 rangkaian KRL oleh PT INKA")])
scene("s22", "body",
 "In January 2024, the operator signed for three Chinese trains. The contract was seven hundred and eighty-three billion rupiah, about two hundred and sixty-one billion per train.",
 "Januari 2024, operatornya meneken kontrak tiga rangkaian dari China. Nilainya tujuh ratus delapan puluh tiga miliar rupiah, sekitar dua ratus enam puluh satu miliar per rangkaian.",
 "remotion-data", "Angka besar: Rp783 miliar untuk 3 rangkaian, Rp261 miliar per rangkaian",
 spec={"kind": "bignum", "total": "Rp 783 bn", "label": "3 new trains from CRRC Sifang, January 2024", "mark": "Rp 261 bn per train"},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.8, "OPERATOR", "shock", "That's a lot of zeros.", 0.6, scale=0.8)], "fx": [{"type": "coins", "at": 0.4, "n": 14}]},
 sources=[src("bisnis2024", "KCI membeli 3 trainset KCI-SFC120-V seharga Rp783 miliar, Rp261 miliar per trainset (31 Jan 2024)")])
scene("s22b", "body",
 "The new trains are longer. Each one has twelve cars and can carry about three thousand four hundred people per trip.",
 "Kereta barunya lebih panjang. Tiap rangkaian berisi dua belas gerbong dan bisa mengangkut sekitar tiga ribu empat ratus orang sekali jalan.",
 "remotion-data", "Statistik: 12 gerbong, ~3.400 penumpang sekali jalan",
 spec={"kind": "stats", "items": [{"label": "Cars per new train", "value": "12", "tone": "good"}, {"label": "Passengers per trip", "value": "~3,400", "tone": "hot"}]},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("h", "hijab", 0.18, "COMMUTER", "happy", "Finally, legroom. Kind of.", 0.6, scale=0.75)]},
 sources=[src("detik2025crrc", "Rangkaian CRRC 12 gerbong, kapasitas 1 rangkaian sekitar 3.400 penumpang sekali jalan")])
scene("s23", "body",
 "Compare that with the old deal. Each Chinese train has twelve cars. Twelve used cars from Japan once cost about twelve billion. The new train cost around twenty times as much.",
 "Bandingkan dengan cara lama. Tiap rangkaian China berisi dua belas gerbong. Dua belas gerbong bekas Jepang dulu sekitar dua belas miliar. Rangkaian baru harganya kira-kira dua puluh kali lipat.",
 "remotion-data", "Batang: 12 gerbong bekas (~Rp12 miliar, harga 2013) vs 1 rangkaian baru CRRC (Rp261 miliar)",
 spec={"kind": "bars", "bars": [{"label": "12 used cars from Japan (2014 prices)", "v": 12, "tone": "good"}, {"label": "1 new 12-car train from China (2024)", "v": 261, "tone": "hot"}], "unit": "billion rupiah"},
 stage={"bg": "paper", "insert": {"pos": "top"}, "actors": [A("t", "train", 0.18, "OLD TRAIN", "smug", "Told you I was a bargain.", 0.65, scale=0.75)]},
 sources=[src("republika2014", "Gerbong bekas Rp800 juta sampai Rp1 miliar (2014)"), src("bisnis2024", "Rp261 miliar per trainset CRRC"), src("puslit2024", "KCI-SFC120-V masing-masing terdiri dari 12 gerbong")])
scene("s24", "body",
 "New trains fix one problem: age. In November 2025, three of the oldest Japanese series retired, some of them close to fifty years old.",
 "Kereta baru menyelesaikan satu masalah: umur. November 2025, tiga seri Jepang tertua pensiun, sebagian umurnya hampir lima puluh tahun.",
 "remotion-diagram", "Daftar seri pensiun Nov 2025: Tokyu 8500, Tokyo Metro 7000, JR 203",
 spec={"kind": "checks", "header": "Retired, November 2025", "items": [{"text": "Tokyu 8500", "mark": "ok"}, {"text": "Tokyo Metro 7000", "mark": "ok"}, {"text": "JR 203", "mark": "ok"}]},
 stage={"bg": "station", "insert": {"pos": "right"}, "actors": [A("t", "train", 0.2, "8500 SERIES", "happy", "Finally, a pension.", 0.6, scale=0.8)]},
 sources=[src("rri2025", "Nov 2025: KRL seri 8500, 7000, dan 203 resmi pensiun, sebagian berusia hingga 50 tahun")])
scene("s25", "body",
 "Their driver cabins are going on display at Jakarta Kota station. Jakarta gave its second-hand trains a retirement ceremony.",
 "Kabin masinisnya akan dipajang di Stasiun Jakarta Kota. Jakarta memberi kereta bekasnya upacara pensiun.",
 "remotion-text", "Teks: kabin masinis dipajang di Stasiun Jakarta Kota",
 spec={"headline": "On display at Jakarta Kota station", "sub": "driver cabins of the retired series"},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("c", "commuter", 0.2, "COMMUTER", "sad", "I'll miss the creaks.", 0.55, scale=0.8), A("h", "hijab", 0.8, "COMMUTER", "smug", scale=0.8)]},
 sources=[src("rri2025", "Bagian kabin masinis ketiga seri dipajang permanen di Stasiun Jakarta Kota")])

# ---------- ACT 3: the factory gap ----------
scene("s26", "rehook",
 "So the plan was new trains from China and from INKA. The weak point was INKA's factory.",
 "Jadi rencananya kereta baru dari China dan dari INKA. Titik lemahnya ada di pabrik INKA.",
 "remotion-diagram", "Dua sumber; INKA disorot merah",
 spec={"kind": "flow", "nodes": [{"label": "CRRC Sifang", "sub": "11 trains", "tone": "good"}, {"label": "KAI Commuter"}, {"label": "INKA", "sub": "16 trains", "tone": "bad"}], "edges": ["", ""]},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [GUIDE(0.12, emo="worry", scale=0.75)]},
 sources=[src("liputan6", "Pesanan 16 trainset INKA dan 11 trainset CRRC")])
scene("s27", "body",
 "All eleven Chinese trains are running. Most of them work the Bogor and Cikarang lines.",
 "Kesebelas rangkaian China sudah beroperasi. Sebagian besar melayani lintas Bogor dan Cikarang.",
 "broll", "Footage milik kreator: rangkaian CRRC baru di lintas Bogor",
 ost="CRRC Sifang train, Bogor line (filmed Nov 2026)",
 stage={"bg": "none", "actors": []}, broll={"own": "krl-04.mp4"},
 sources=[src("detik18", "11 rangkaian CRRC sudah dioperasikan untuk Bogor Line dan Cikarang Line")])
scene("s28", "body",
 "INKA was expected to build eight trains a year. It delivered two to three.",
 "INKA diproyeksikan membuat delapan rangkaian setahun. Yang terwujud dua sampai tiga.",
 "remotion-data", "Batang: target 8 per tahun vs realisasi 2-3",
 spec={"kind": "bars", "bars": [{"label": "Projected", "v": 8, "tone": "muted"}, {"label": "Delivered", "v": 2.5, "tone": "bad"}], "unit": "trains per year"},
 stage={"bg": "paper", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.82, "INKA", "worry", "Working on it.", 0.6, scale=0.8)]},
 sources=[src("metrotv", "Proyeksi INKA 8 trainset per tahun, realisasi 2 sampai 3 trainset per tahun")])
scene("s29", "body",
 "By September 2026, seven of the sixteen INKA trains were in service.",
 "Sampai September 2026, baru tujuh dari enam belas rangkaian INKA yang beroperasi.",
 "remotion-data", "Counter: 7 dari 16",
 spec={"kind": "counter", "values": ["0 / 16", "3 / 16", "5 / 16", "7 / 16"], "label": "INKA trains in service, September 2026", "tone": "bad"},
 stage={"bg": "paper", "insert": {"pos": "top"}, "actors": [GUIDE(0.12, emo="think", scale=0.7)]},
 sources=[src("irj", "Baru 7 dari 16 EMU iE305 INKA yang beroperasi"), src("metrotv", "Hingga September 2026 baru 7 rangkaian yang beroperasi")])
scene("s30", "body",
 "Meanwhile the trains got more crowded. Ridership in the first half of 2026 was up about eleven percent on a year earlier.",
 "Sementara itu kereta makin padat. Jumlah penumpang semester pertama 2026 naik sekitar sebelas persen dibanding tahun sebelumnya.",
 "broll", "Footage milik kreator: peron saat jam sibuk, diambil dari belakang (tanpa wajah dekat)",
 stage={"bg": "none", "actors": []}, broll={"own": "krl-03.mp4"},
 sources=[src("irj", "Penumpang komuter KAI naik 11,3% year-on-year di semester I 2026")])
scene("s31", "body",
 "That is about one point one million trips a day, far above the three to four percent growth the operator had planned for.",
 "Itu sekitar satu koma satu juta perjalanan per hari, jauh di atas pertumbuhan tiga sampai empat persen yang direncanakan.",
 "remotion-data", "Statistik: 1,1 juta perjalanan per hari; pertumbuhan +11% vs rencana 3-4%",
 spec={"kind": "stats", "items": [{"label": "Trips per day", "value": "~1.1 m", "tone": "hot"}, {"label": "Growth, H1 2026", "value": "+11%", "tone": "bad", "sub": "plan: 3 to 4%"}]},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("c", "commuter", 0.15, "COMMUTER", "worry", "Is there room for my bag?", 0.6, scale=0.75), A("h", "hijab", 0.85, "COMMUTER", "angry", scale=0.75)]},
 sources=[src("irj", "Ridership harian sekitar 1,1 juta"), src("investortrust", "Pertumbuhan 11,5% semester I 2026, jauh di atas proyeksi awal 3 sampai 4%")])
scene("s31b", "body",
 "On the busiest days, the count can reach one point three million. The network was planned around far fewer.",
 "Di hari tersibuk, jumlahnya bisa mencapai satu koma tiga juta. Jaringannya direncanakan untuk jauh lebih sedikit.",
 "remotion-data", "Counter: 1,1 juta → 1,3 juta perjalanan pada hari tersibuk",
 spec={"kind": "counter", "values": ["1.1 m", "1.2 m", "1.3 m"], "label": "trips on the busiest days", "tone": "bad"},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("c", "commuter", 0.15, "COMMUTER", "dead", scale=0.75)]},
 sources=[src("metrotv", "1,1 juta penumpang per hari; pada hari tertentu bisa 1,3 juta"), src("investortrust", "Pertumbuhan jauh melampaui proyeksi awal 3 sampai 4 persen")])
scene("s32", "body",
 "The operator calculated it needs one hundred and five trains. It has one hundred and two.",
 "Operatornya menghitung butuh seratus lima rangkaian. Yang tersedia seratus dua.",
 "remotion-data", "Statistik: butuh 105, ada 102",
 spec={"kind": "stats", "items": [{"label": "Trains needed", "value": "105", "tone": "hot"}, {"label": "Trains available", "value": "102", "tone": "bad"}], "between": "vs"},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.82, "OPERATOR", "worry", "Three short.", 0.55, scale=0.8)]},
 sources=[src("irj", "Operator memperkirakan butuh 105 rangkaian, tersedia 102")])
scene("s33", "body",
 "And the gap was about to grow. Thirteen former Tokyo Metro trains were due to retire this year.",
 "Dan kekurangannya akan membesar. Tiga belas rangkaian eks Tokyo Metro dijadwalkan pensiun tahun ini.",
 "remotion-data", "Angka besar: 13 rangkaian Tokyo Metro 6000 pensiun 2026",
 spec={"kind": "bignum", "total": "13 trains", "label": "former Tokyo Metro 6000 series", "mark": "due to retire in 2026"},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("t", "train", 0.2, "6000 SERIES", "sad", scale=0.8)]},
 sources=[src("irj", "13 rangkaian eks Tokyo Metro seri 6000 akan ditarik tahun ini")])
scene("s34", "body",
 "A new train takes one to two years from order to delivery. Jakarta's shortage was this year's problem.",
 "Kereta baru butuh satu sampai dua tahun dari pesan sampai datang. Kekurangan kereta di Jakarta adalah masalah tahun ini.",
 "remotion-diagram", "Garis waktu: pesan → 1-2 tahun → datang; kekurangan sekarang",
 spec={"kind": "timeline", "blocks": [{"title": "Order", "sub": "today", "tone": "lit"}, {"title": "1 to 2 years", "sub": "build and test", "tone": "dim"}, {"title": "New train", "sub": "too late for 2026", "tone": "hot"}]},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("c", "city", 0.2, "JAKARTA", "worry", "I needed it yesterday.", 0.6, scale=0.8)]},
 sources=[src("afu", "Kereta baru butuh satu sampai dua tahun sejak dipesan")])

# ---------- ACT 4: Sep-Nov 2026 ----------
scene("s35", "rehook",
 "So in September 2026, Jakarta went back to Tokyo.",
 "Maka September 2026, Jakarta kembali melirik Tokyo.",
 "broll", "Footage stok: kereta komuter Tokyo di stasiun",
 stage={"bg": "none", "actors": [GUIDE(0.12, emo="shock", scale=0.7)]},
 broll={"keywords": ["tokyo commuter train station", "japan train platform"], "avoid": ["face close up"]})
scene("s36", "body",
 "On September 23, the head of the national railway asked parliament to allow used Japanese trains again, as a stopgap for 2026 and 2027.",
 "Tanggal 23 September, pimpinan KAI meminta DPR mengizinkan lagi kereta bekas Jepang, sebagai tambalan untuk 2026 dan 2027.",
 "remotion-diagram", "Kartu usulan: impor KRL bekas, sementara, 2026-2027",
 spec={"kind": "stamp", "lines": ["Proposal, 23 Sept 2026", "Used Japanese trains, temporary"], "chips": ["2026", "2027"], "stamp": "PROPOSED", "tone": "hot"},
 stage={"bg": "paper", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.2, "KAI", "think", "Just as a bridge.", 0.6, scale=0.8)]},
 sources=[src("irj", "Usulan impor EMU bekas Jepang ke DPR pada 23 September sebagai langkah sementara")])
scene("s37", "body",
 "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industry.",
 "Komisi VI DPR setuju. Rencananya dua puluh tiga rangkaian bekas, dengan satu syarat: industri kereta dalam negeri tetap diperkuat.",
 "remotion-diagram", "Stempel DISETUJUI, 23 rangkaian, syarat industri dalam negeri",
 spec={"kind": "stamp", "lines": ["23 used trains from Japan", "Condition: grow domestic industry"], "stamp": "APPROVED", "tone": "good"},
 stage={"bg": "paper", "insert": {"pos": "top"}, "actors": [GUIDE(0.82, emo="happy", scale=0.75)], "fx": [{"type": "stamp", "text": "APPROVED", "tone": "good", "at": 0.35, "x": 0.5, "y": 0.2}]},
 sources=[src("katadata2026sep", "Komisi VI DPR menyetujui usulan impor KRL bekas dari Jepang (28 Sept 2026)"), src("katadata2026nov", "Rencana impor 23 rangkaian; syarat tetap meningkatkan industri perkeretaapian dalam negeri")])
scene("s37b", "body",
 "The forecast for 2026 was three hundred and sixty-nine million passenger trips. Every missing train makes the remaining ones fuller.",
 "Proyeksi untuk 2026 adalah tiga ratus enam puluh sembilan juta perjalanan. Setiap rangkaian yang kurang membuat rangkaian lain makin penuh.",
 "remotion-data", "Angka besar: 369 juta perjalanan (proyeksi 2026)",
 spec={"kind": "bignum", "total": "369 m", "label": "passenger trips forecast for 2026", "mark": "Greater Jakarta commuter line"},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("c", "city", 0.2, "JAKARTA", "worry", "Somebody count the seats.", 0.6, scale=0.8)]},
 sources=[src("katadata2026sep", "Proyeksi penumpang KRL diestimasi 369 juta penumpang sepanjang 2026")])
scene("s38", "body",
 "The reasoning was time. A used train could arrive in one to two months. A new one takes one to two years.",
 "Alasannya waktu. Kereta bekas bisa datang dalam satu sampai dua bulan. Kereta baru butuh satu sampai dua tahun.",
 "remotion-data", "Batang: bekas (bulan) vs baru (1-2 tahun)",
 spec={"kind": "bars", "bars": [{"label": "Used, from Japan: 1 to 2 months", "v": 1.5, "tone": "good"}, {"label": "New: 1 to 2 years", "v": 18, "tone": "hot"}], "unit": "time to arrive, months"},
 stage={"bg": "sea", "insert": {"pos": "top"}, "actors": [A("sh", "ship", 0.2, "SHIP", "happy", "Already packed.", 0.6, scale=0.85)]},
 sources=[src("afu", "Pengadaan KRL bekas sekitar satu sampai dua bulan, kereta baru satu sampai dua tahun sejak dipesan")])
scene("s39", "body",
 "Then it hit a rule. Indonesia's trade ministry only allows used capital goods like these up to twenty years old.",
 "Lalu rencananya menabrak aturan. Kementerian Perdagangan hanya mengizinkan barang modal bekas seperti ini maksimal berumur dua puluh tahun.",
 "remotion-data", "Gauge: batas usia impor 20 tahun",
 spec={"kind": "gauge", "zones": ["allowed: up to 20 years", "not allowed"], "target": "20 years", "label": "import age limit"},
 stage={"bg": "paper", "insert": {"pos": "top"}, "actors": [A("t", "train", 0.15, "JAPANESE TRAIN", "worry", scale=0.75)]},
 sources=[src("bisnis2026oct3", "Ketentuan Kementerian Perdagangan: usia maksimal 20 tahun")])
scene("s40", "body",
 "The trains on offer were twenty-five to twenty-eight years old. On average, they had been carrying passengers in Japan since 1998.",
 "Kereta yang ditawarkan berumur dua puluh lima sampai dua puluh delapan tahun. Rata-rata sudah mengangkut penumpang di Jepang sejak 1998.",
 "remotion-data", "Stats: batas 20 tahun vs kereta 25-28 tahun",
 spec={"kind": "stats", "items": [{"label": "Import limit", "value": "20 yrs", "tone": "good"}, {"label": "Trains on offer", "value": "25 to 28 yrs", "tone": "bad", "sub": "in service since 1998"}], "between": "vs"},
 stage={"bg": "paper", "insert": {"pos": "top"}, "actors": [A("t", "train", 0.15, "JAPANESE TRAIN", "shock", "I'm only 28.", 0.6, scale=0.75)]},
 sources=[src("bisnis2026oct3", "KAI berencana impor KRL dengan usia pakai 25 tahun"), src("bisnis2026nov10", "Rata-rata kereta berumur 28 tahun, dipakai sejak 1998")])
scene("s41", "body",
 "The transport ministry added another problem. A train used for twenty to thirty years in Japan might have only about ten years left.",
 "Kementerian Perhubungan menambah satu masalah. Kereta yang sudah dipakai dua puluh sampai tiga puluh tahun di Jepang mungkin cuma tersisa sekitar sepuluh tahun.",
 "remotion-diagram", "Garis waktu umur kereta: 20-30 tahun di Jepang, sisa ~10 tahun di Jakarta",
 spec={"kind": "timeline", "blocks": [{"title": "Japan", "sub": "20 to 30 years", "tone": "dim"}, {"title": "Jakarta", "sub": "about 10 years left", "tone": "hot"}, {"title": "Then", "sub": "replace again", "tone": "dim"}]},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.82, "ENGINEER", "think", "Ten years, maybe.", 0.6, scale=0.8)]},
 sources=[src("bisnis2026oct10", "Sisa masa pakai diprediksi hanya 10 tahun, karena sudah dipakai 20 sampai 30 tahun di Jepang")])
scene("s42", "body",
 "Old trains are also harder to keep running. When three Japanese series retired in 2025, one stated reason was that their spare parts had run out.",
 "Kereta tua juga makin sulit dirawat. Saat tiga seri Jepang pensiun di 2025, salah satu alasannya adalah suku cadangnya sudah habis.",
 "remotion-diagram", "Daftar alasan pensiun 2025: umur, suku cadang habis",
 spec={"kind": "checks", "header": "Why three series retired in 2025", "items": [{"text": "Age: up to 50 years", "mark": "odd"}, {"text": "Spare parts ran out", "mark": "odd"}]},
 stage={"bg": "station", "insert": {"pos": "right"}, "actors": [A("t", "train", 0.2, "OLD TRAIN", "dead", scale=0.8)], "fx": [{"type": "pow", "text": "CLUNK", "at": 0.5, "x": 0.25, "y": 0.35}]},
 sources=[src("rri2025", "Seri 8500, 7000, dan 203 pensiun karena usia dan habisnya suku cadang"), src("katadata2019", "Suku cadang kereta bekas Jepang susah didapat karena banyak yang sudah tidak diproduksi")])
scene("s43", "body",
 "On November 5, the railway's chief executive cancelled the plan. His words: for the public, it must be new.",
 "Tanggal 5 November, direktur utama KAI membatalkan rencana itu. Katanya: untuk rakyat, harus yang baru.",
 "remotion-diagram", "Stempel DIBATALKAN, 5 Nov 2026",
 spec={"kind": "stamp", "lines": ["Used trains from Japan", "5 November 2026"], "stamp": "CANCELLED", "tone": "bad"},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("c", "city", 0.2, "JAKARTA", "shock", scale=0.8)], "fx": [{"type": "stamp", "text": "CANCELLED", "tone": "bad", "at": 0.35, "x": 0.5, "y": 0.2}]},
 sources=[src("katadata2026nov", "Dirut KAI 5 Nov: kami tidak impor bekas, untuk rakyat harus yang baru"), src("detik2026nov5", "KAI memastikan tidak mengimpor KRL bekas Jepang")])
scene("s44", "rehook",
 "Look at what actually blocked it. Japan still has trains to sell. They are too old for Indonesia's own rule.",
 "Lihat apa yang sebenarnya menghalangi. Jepang masih punya kereta untuk dijual. Keretanya terlalu tua untuk aturan Indonesia sendiri.",
 "remotion-diagram", "Dua kolom: Jepang punya kereta / aturan 20 tahun menolak",
 spec={"kind": "flow", "nodes": [{"label": "Japan's retired trains", "sub": "25 to 28 years old"}, {"label": "Indonesia's rule", "sub": "max 20 years", "tone": "bad"}], "edges": [{"label": "blocked", "broken": True}]},
 stage={"bg": "paper", "insert": {"pos": "top"}, "actors": [GUIDE(0.12, emo="smug", scale=0.75)]},
 sources=[src("bisnis2026oct3", "KRL bekas berusia 25 tahun, ketentuan maksimal 20 tahun")])
scene("s45", "body",
 "Japan keeps its commuter trains for twenty to thirty years. By the time a car is free to sell, it's already past Jakarta's limit.",
 "Jepang memakai kereta komuternya dua puluh sampai tiga puluh tahun. Saat gerbongnya siap dijual, umurnya sudah lewat batas Jakarta.",
 "remotion-diagram", "Garis waktu satu gerbong: 0 tahun (baru di Tokyo), 20 tahun (batas impor), 25-30 tahun (pensiun di Jepang)",
 spec={"kind": "timeline", "blocks": [{"title": "Year 0", "sub": "new in Tokyo", "tone": "dim"}, {"title": "Year 20", "sub": "Jakarta's import limit", "tone": "hot"}, {"title": "Year 25 to 30", "sub": "retired in Japan", "tone": "bad"}]},
 stage={"bg": "station", "insert": {"pos": "top"}, "actors": [A("t", "train", 0.82, "JAPANESE TRAIN", "sad", "Missed it by five years.", 0.65, scale=0.75)]},
 sources=[src("bisnis2026oct10", "Usia penggunaan di Jepang sekitar 20 sampai 30 tahun")])
scene("s46", "body",
 "The window that opened in 2000 closed on its own. The supply that made Jakarta's network cheap now ages out before it can be shipped.",
 "Jendela yang terbuka tahun 2000 tertutup dengan sendirinya. Pasokan yang membuat jaringan Jakarta murah sekarang keburu tua sebelum bisa dikirim.",
 "remotion-diagram", "Timeline 2000 → 2023 (ditolak) → 2026 (batal)",
 spec={"kind": "timeline", "blocks": [{"title": "2000", "sub": "first donation", "tone": "good"}, {"title": "2023", "sub": "import blocked", "tone": "hot"}, {"title": "Nov 2026", "sub": "import cancelled", "tone": "bad"}]},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("c", "city", 0.2, "JAKARTA", "think", scale=0.8)]})

# ---------- ACT 5: what next ----------
scene("s47", "body",
 "So what do commuters ride next? The operator had three options: order from INKA, keep the old trains running longer, or import used ones.",
 "Jadi penumpang naik apa berikutnya? Operatornya punya tiga pilihan: pesan ke INKA, memperpanjang umur kereta lama, atau impor bekas.",
 "remotion-diagram", "Tiga pilihan; impor bekas dicoret",
 spec={"kind": "checks", "header": "KAI's three options", "items": [{"text": "Order new trains from INKA", "mark": "ok"}, {"text": "Extend the old trains' service life", "mark": "ok"}, {"text": "Import used trains", "mark": "odd"}]},
 stage={"bg": "station", "insert": {"pos": "right"}, "actors": [A("c", "commuter", 0.18, "COMMUTER", "think", "Option four: I walk?", 0.6, scale=0.8)]},
 sources=[src("bisnis2026nov10", "KAI punya tiga opsi: pesan ke INKA, perpanjang usia kereta yang ada, impor bekas")])
scene("s48", "body",
 "With imports off the table, that leaves two. Old Japanese cars stay in service longer, and INKA has to build faster.",
 "Karena impor dicoret, tinggal dua. Gerbong Jepang lama dipakai lebih lama, dan INKA harus membuat lebih cepat.",
 "broll", "Footage milik kreator: eks JR 205 di peron (pengambilan berbeda dari s02)",
 stage={"bg": "none", "actors": []}, broll={"own": "krl-02b.mp4"},
 sources=[src("bisnis2026nov10", "Opsi tersisa: produksi INKA dan perpanjangan usia rangkaian yang beroperasi")])
scene("s48b", "body",
 "The money for new trains was already approved. A year earlier, the government set aside five trillion rupiah for thirty new trains, due within a year.",
 "Dananya sudah disetujui. Setahun sebelumnya, pemerintah menyiapkan lima triliun rupiah untuk tiga puluh rangkaian baru, ditargetkan selesai dalam setahun.",
 "remotion-data", "Statistik: Rp5 triliun untuk 30 rangkaian baru",
 spec={"kind": "stats", "items": [{"label": "Budget for new trains", "value": "Rp 5 tn", "tone": "good"}, {"label": "New trains", "value": "30", "tone": "hot", "sub": "target: one year"}]},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.82, "INKA", "shock", "Within a year?", 0.6, scale=0.8)], "fx": [{"type": "coins", "at": 0.35, "n": 12}]},
 sources=[src("afu", "Setahun sebelum pembatalan, anggaran Rp5 triliun disetujui untuk 30 rangkaian KRL baru, target rampung dalam satu tahun")])
scene("s49", "payoff",
 "The longer plan is to replace eighty-four old Japanese trains with INKA-built ones, and raise capacity from one point one to one point four million passengers a day by 2030.",
 "Rencana jangka panjangnya mengganti delapan puluh empat rangkaian Jepang tua dengan buatan INKA, dan menaikkan kapasitas dari satu koma satu ke satu koma empat juta penumpang per hari pada 2030.",
 "remotion-data", "Statistik: 84 rangkaian diganti; kapasitas 1,1 → 1,4 juta/hari pada 2030",
 spec={"kind": "stats", "items": [{"label": "Old Japanese trains to replace", "value": "84", "tone": "hot"}, {"label": "Capacity by 2030", "value": "1.1 → 1.4 m/day", "tone": "good"}]},
 stage={"bg": "city", "insert": {"pos": "top"}, "actors": [A("e", "engineer", 0.82, "INKA", "think", "No pressure.", 0.6, scale=0.8)]},
 sources=[src("irjfleet", "Program jangka panjang mengganti 84 EMU bekas Jepang (rata-rata 40 tahun) dengan buatan INKA, kapasitas 1,1 juta ke 1,4 juta per hari pada 2030")])
scene("s50", "payoff",
 "For twenty-five years, Tokyo's old trains let Jakarta grow a rail network it couldn't afford to buy new. The age rule ended that, and now the trains have to be built at home.",
 "Selama dua puluh lima tahun, kereta tua Tokyo membuat Jakarta bisa membangun jaringan kereta yang tak sanggup dibeli baru. Aturan umur mengakhirinya, dan sekarang keretanya harus dibuat di dalam negeri.",
 "broll", "Footage milik kreator: interior eks JR 205, tulisan Jepang (pengambilan penutup)",
 stage={"bg": "none", "actors": []}, broll={"own": "krl-01b.mp4"})
scene("s51", "cta",
 "Those trains carry people to and from one island that holds more than half of Indonesia. Next video: why so many Indonesians live on Java.",
 "Kereta-kereta itu mengangkut orang di satu pulau yang dihuni lebih dari separuh penduduk Indonesia. Video berikutnya: kenapa begitu banyak orang Indonesia tinggal di Jawa.",
 "remotion-diagram", "Peta Jawa disorot, teks video berikutnya",
 spec={"headline": "Next: why so many Indonesians live on Java", "sub": "one island, more than half the country"},
 stage={"bg": "map", "view": {"lon": [102, 118], "lat": [-10, -2]}, "insert": {"pos": "top"}, "actors": [GUIDE(0.1, emo="happy", scale=0.7)], "fx": [{"type": "pin", "place": "jakarta", "label": "Jakarta", "at": 0.2}, {"type": "pin", "place": "surabaya", "label": "Surabaya", "at": 0.4}]},
 sources=[{"url": "https://en.wikipedia.org/wiki/Java", "claim": "Jawa dihuni lebih dari separuh penduduk Indonesia (verifikasi angka BPS di siklus 002)"}])

old_ids = [x["id"] for x in S]
MAP = {o: f"s{i+1:02d}" for i, o in enumerate(old_ids)}
for x in S: x["id"] = MAP[x["id"]]
script = {
 "cycle": "001-jakarta-refused-tokyo-trains",
 "title_options": [
  "Jakarta Just Refused Tokyo's Old Trains. Here's Why",
  "Why Jakarta Runs on Tokyo's Retired Trains, and Why That Just Ended",
  "Tokyo's Old Trains Are Now Too Old for Jakarta",
 ],
 "thumbnail_text": ["TOO OLD TO IMPORT", "TOKYO'S TRAINS, REJECTED"],
 "promise": "After watching, you can explain why Jakarta could run Tokyo's retired trains for 25 years without rebuilding its tracks, and why a 20-year import age limit ended that in November 2026.",
 "creator_evidence": [
  {"what": "Footage milik kreator: interior KRL eks JR East 205 dengan tulisan Jepang", "scene_id": "s01", "source_path": "produksi/footage-own/T02/krl-01.mp4"},
  {"what": "Footage milik kreator: rangkaian eks Jepang masuk peron", "scene_id": "s02", "source_path": "produksi/footage-own/T02/krl-02.mp4"},
  {"what": "Footage milik kreator: rel dan kabel aliran atas dari jendela", "scene_id": "s10", "source_path": "produksi/footage-own/T02/krl-05.mp4"},
  {"what": "Footage milik kreator: rangkaian CRRC baru di lintas Bogor", "scene_id": "s27", "source_path": "produksi/footage-own/T02/krl-04.mp4"},
  {"what": "Sumber berbahasa Indonesia (Bisnis, Katadata, detik, Liputan6, MetroTV, CNBC Indonesia) yang belum dipakai video berbahasa Inggris tentang topik ini", "scene_id": "s39"},
 ],
 "pronunciations": [
  {"term": "Sifang", "say_as": "Si-fahng"},
 ],
 "scenes": S,
 "shorts_cuts": [
  {"name": "A1-why-tokyo-trains-fit", "scene_ids": ["s01", "s07", "s11", "s13", "s14"], "hook_override": "Why Jakarta's trains still have Japanese writing inside."},
  {"name": "A2-too-old-to-import", "scene_ids": ["s37", "s39", "s40", "s43", "s45"], "hook_override": "Jakarta wanted Tokyo's old trains again. A rule said no."},
 ],
 "anti_slop": {"text_score_en": 0, "text_score_id": 0},
}
# sumber tingkat atas untuk QA otomatis (satu klaim = satu tautan)
for ev in script["creator_evidence"]: ev["scene_id"] = MAP[ev["scene_id"]]
for c in script["shorts_cuts"]: c["scene_ids"] = [MAP[i] for i in c["scene_ids"]]
json.dump(MAP, open(OUT.replace("03-script.json", ".idmap.json"), "w"))
top = []
for s in S:
    for x in s.get("sources", []):
        top.append({"scene": s["id"], "url": x["url"], "claim": x["claim"]})
script["sources"] = top
json.dump(script, open(OUT, "w"), ensure_ascii=False, indent=1)
en = sum(len(s["narration"]["en"].split()) for s in S); idw = sum(len(s["narration"]["id"].split()) for s in S)
print(len(S), "scenes;", en, "words EN;", idw, "words ID;", len(top), "sources")
