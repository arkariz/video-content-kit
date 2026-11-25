#!/usr/bin/env python3
"""Ubah visual 03-script.json ke gaya wajib diorama 2.5D (world + stage.engine=diorama).
Narasi, sumber, broll, shorts_cuts tidak diubah. Jalankan: python3 03-script.diorama.py"""
import json, pathlib
here = pathlib.Path(__file__).parent
P = here / "03-script.json"
d = json.load(open(P))

# ---------- dunia: satu peta Tokyo - laut - Jawa - Tiongkok, posisinya tidak berpindah
def obj(id, asset, x, z, **k): return {"id": id, "asset": asset, "x": x, "z": z, **k}
world = {
  "ground": "#a9cf8e",
  "areas": [
    {"points": [[-30, -12], [6, -12], [10, 60], [-30, 66]], "color": "#7cc4dd"},          # laut Jawa - Jepang
    {"points": [[-14, 50], [64, 50], [64, 68], [-14, 68]], "color": "#7cc4dd"},            # laut utara Jawa
    {"points": [[-24, 68], [30, 68], [30, 92], [-24, 92]], "color": "#cdd4a6"},            # daratan Tiongkok
    {"points": [[-64, 0], [-32, 0], [-32, 52], [-64, 52]], "color": "#cfc9b9"},            # Tokyo
    {"points": [[8, 0], [36, 0], [36, 30], [8, 30]], "color": "#dccfb0"},                  # Jakarta
  ],
  "scatter": [
    {"asset": "pine", "count": 70, "area": [-64, 6, -33, 50]},
    {"asset": "palm", "count": 90, "area": [38, 18, 62, 46]},
    {"asset": "tree", "count": 40, "area": [42, 18, 62, 40]},
    {"asset": "house", "count": 40, "area": [12, 19, 31, 30]},
    {"asset": "bush", "count": 70, "area": [-62, 8, 62, 44]},
  ],
  "objects": [
    obj("tokyo", "tower", -42, 26, scale=1.5, label="TOKYO"), obj("tk2", "tower", -47, 32), obj("tk3", "tower", -37, 34), obj("tk4", "tower", -50, 24, scale=0.8),
    obj("oldjp", "actor:train", -35, 16, scale=1.0),
    obj("ship", "actor:ship", -28, 14, scale=1.0, hidden=True),
    obj("jkt", "tower", 20, 17, scale=1.4, label="JAKARTA"), obj("jk2", "tower", 26, 21), obj("jk3", "tower", 15, 22, scale=0.9),
    obj("kota", "house", 12, 6, scale=1.3, label="JAKARTA KOTA"),
    obj("bogor", "house", 30, -14, scale=1.2, label="BOGOR"),
    obj("cikarang", "house", 38, 24, scale=1.2, label="CIKARANG"),
    obj("inka", "shop", 54, 8, scale=1.3, label="INKA"),
    obj("crrc", "tower", 2, 78, scale=1.3, label="CHINA: CRRC"),
    obj("kai", "bankhall", 33, 9, scale=0.8, label="KAI RAILWAY"),
    obj("gov", "bankhall", 9, 15, scale=0.8, label="GOVERNMENT"),
    obj("t_old", "actor:train", 20, 2, scale=0.8),
    obj("t_new", "actor:train", 27, 0, scale=0.8, hidden=True),
    obj("t_metro", "actor:train", 24, 4, scale=0.8, hidden=True),
    obj("t_cn", "actor:train", 2, 73, scale=0.8, hidden=True),
    obj("t_ink", "actor:train", 54, 3, scale=0.8, hidden=True),
    obj("cabin", "actor:train", 14, 3, scale=0.5, hidden=True),
    obj("lock", "lock", 9, 12, y=3.6, scale=1.3, hidden=True),
    obj("guide", "actor:guide", 13, -3, scale=0.65),
  ],
  "paths": [
    {"id": "p_ship", "points": ["oldjp", [-14, 20], "jkt"], "hidden": True, "color": "#e4572e"},
    {"id": "p_cn", "points": ["crrc", [10, 46], "jkt"], "hidden": True, "color": "#e4572e"},
    {"id": "p_ink", "points": ["inka", [40, 6], "jkt"], "hidden": True, "color": "#e4572e"},
    {"id": "p_rail", "points": ["kota", [20, 2], "bogor"], "hidden": True},
    {"id": "p_rail2", "points": ["jkt", [30, 22], "cikarang"], "hidden": True},
  ],
}
d["world"] = world

# ---------- kamera
OV = ([-8, 22], 52, 36)          # peta Tokyo - Jawa
def cm(look, dist, h): return {"look": look, "dist": dist, "height": h}
C = lambda look, dist, h: (look, dist, h)

# tiap scene: kamera tujuan, mood, dan aksi. Waktu = pecahan 0..1 dari suara scene.
S = {
 "s01": dict(c=C("t_old", 11, 5), co=[("t_old", "EX-TOKYO", .35)], pa=[("p_ship", .3)]),
 "s02": dict(c=OV, pa=[("p_ship", .15)], mv=[("actor:train", "oldjp", "jkt", [[-14, 20]], .2, .6, "")], co=[("gov", "AGE RULE", .8)], hl=[("gov", .8)]),
 "s03": dict(c=C([22, 30], 56, 40), co=[("kai", "KAI", .1, .3), ("gov", "RULES", .3, .5), ("inka", "INKA", .5, .7), ("crrc", "CRRC", .7)], hl=[("kai", .1, .3), ("gov", .3, .5), ("inka", .5, .7), ("crrc", .7, 1)]),
 "s04": dict(c=C("tokyo", 22, 12), pa=[("p_ship", .1)], mv=[("envelope", "tokyo", "jkt", [[-14, 20]], .3, .6, "GIFT, MAY 2000")], co=[("tokyo", "72 CARS", .2)]),
 "s05": dict(c=C("t_old", 14, 6), co=[("oldjp", "BUILT 1968", .15, .55), ("t_old", "RAN TO 2016", .6)], mv=[("actor:train", "oldjp", "t_old", [[-14, 20]], .3, .4, "")]),
 "s06": dict(c=C("t_old", 10, 4), co=[("t_old", "FIRST A/C", .25)], gr=[("t_old", 1.25, .4)]),
 "s07": dict(c=C("t_old", 14, 6), co=[("t_old", "Rp0.8-1 BN", .4)], sh=[("t_old", 0)]),
 "s08": dict(c=C([23, 1], 14, 6), sh=[("t_new", .15)], co=[("t_new", "Rp10-12 BN", .3, .7), ("t_old", "1/10 PRICE", .75)]),
 "s09": dict(c=C("inka", 18, 8), sh=[("t_ink", .1)], co=[("inka", "$1.3M NEW", .3, .75), ("t_old", "1/9 PRICE", .8)], hl=[("inka", .3, .7)]),
 "s10": dict(c=C("tokyo", 20, 10), pa=[("p_ship", .1)], mv=[("actor:train", "oldjp", "jkt", [[-14, 20]], .3, .6, "")], co=[("tokyo", "SCRAP COSTS", .15, .6), ("jkt", "RE-USED", .85)]),
 "s11": dict(c=C("t_old", 12, 5), co=[("t_old", "WHY FIT?", .5)], emo={"guide": "think"}),
 "s12": dict(c=C("tokyo", 20, 9), pa=[("p_rail", .05)], co=[("kota", "1,067 MM", .2, .55), ("oldjp", "1,067 MM", .6)], hl=[("kota", .2, .5), ("oldjp", .6, .95)]),
 "s13": dict(c=C("kota", 22, 11), pa=[("p_rail", .05)], co=[("kota", "1867 WIDE", .15, .6), ("kota", "1940s NARROW", .65)], mood="dusk"),
 "s14": dict(c=C("tokyo", 18, 8), co=[("kota", "1925: 1,500 V", .1, .5), ("oldjp", "205: 1,500 V", .55)]),
 "s15": dict(c=C("jkt", 18, 8), mv=[("actor:ship", "ship", "jkt", [[-14, 20]], .1, .7, "")], sh=[("ship", 0), ("t_old", .8)], co=[("jkt", "NEW SIGNS", .85)], pa=[("p_ship", .05)]),
 "s16": dict(c=C("jkt", 20, 9), co=[("jkt", "2012: 140", .15, .55), ("jkt", "2019: 1,440", .6)], gr=[("t_old", 1.5, .55)]),
 "s17": dict(c=C("t_old", 14, 6), mv=[("actor:train", "oldjp", "jkt", [[-14, 20]], .2, .6, "205 SERIES")], co=[("jkt", "2013", .85)]),
 "s18": dict(c=C("t_old", 16, 7), sh=[("t_metro", .45)], co=[("t_old", "780 JR EAST", .15), ("t_metro", "128 METRO", .55)]),
 "s19": dict(c=C("t_old", 12, 5), co=[("t_old", "34-41 YEARS", .3)], mood="dusk"),
 "s20": dict(c=C("gov", 18, 8), sh=[("lock", .45)], co=[("gov", "BLOCKED 2023", .55)], hl=[("gov", .5, 1)], mood="dusk"),
 "s21": dict(c=C("tokyo", 22, 10), pa=[("p_ship", .1)], mv=[("actor:train", "oldjp", "jkt", [[-14, 20]], .25, .5, "E217")], co=[("oldjp", "348 CARS", .2)], mood="dusk"),
 "s22": dict(c=C("gov", 16, 7), sh=[("lock", .25)], co=[("gov", "NO", .3)], hl=[("gov", .3, 1)], mood="dusk"),
 "s23": dict(c=C([20, 40], 50, 34), pa=[("p_cn", .1), ("p_ink", .3)], sh=[("t_cn", .2), ("t_ink", .4)], co=[("t_cn", "CHINA", .25, .55), ("t_ink", "EAST JAVA", .6)]),
 "s24": dict(c=C("inka", 16, 7), mv=[("actor:train", "t_old", "inka", [], .15, .45, "REFIT")], co=[("inka", "REFIT 19", .5)], hl=[("inka", .5, 1)]),
 "s25": dict(c=C("crrc", 22, 10), pa=[("p_cn", .1)], sh=[("t_cn", 0)], mv=[("actor:train", "crrc", "jkt", [[10, 46]], .3, .6, "")], co=[("crrc", "3 TRAINS", .1, .45), ("crrc", "Rp783 BN", .5)]),
 "s26": dict(c=C("t_new", 12, 5), sh=[("t_new", 0)], gr=[("t_new", 1.6, .25)], co=[("t_new", "12 CARS", .25, .6), ("t_new", "3,400 RIDERS", .65)]),
 "s27": dict(c=C([24, 0], 14, 6), sh=[("t_new", 0)], gr=[("t_new", 1.9, .5)], co=[("t_old", "~Rp12 BN", .15, .6), ("t_new", "20x", .65)]),
 "s28": dict(c=C("t_old", 14, 6), co=[("t_old", "NOV 2025", .15, .45), ("t_old", "~50 YEARS", .5)], mood="dusk"),
 "s29": dict(c=C("kota", 12, 5), sh=[("cabin", .25)], co=[("kota", "ON DISPLAY", .45)], mood="dusk"),
 "s30": dict(c=C("inka", 18, 8), hl=[("inka", .25, 1)], co=[("inka", "WEAK POINT", .45)], emo={"guide": "think"}),
 "s31": dict(c=C("bogor", 14, 6), pa=[("p_rail", .05), ("p_rail2", .2)], co=[("bogor", "11 RUNNING", .4)]),
 "s32": dict(c=C("inka", 14, 6), co=[("inka", "PLAN 8/YR", .15, .55), ("inka", "REAL 2-3", .6)]),
 "s33": dict(c=C("inka", 18, 8), sh=[("t_ink", 0)], co=[("inka", "7 OF 16", .2, .6), ("t_ink", "9 IDLE", .65)]),
 "s34": dict(c=C("jkt", 22, 10), gr=[("jkt", 1.7, .5)], co=[("jkt", "+11%", .45)]),
 "s35": dict(c=C("jkt", 22, 10), co=[("jkt", "1.1M / DAY", .15, .55), ("jkt", "PLAN +3-4%", .6)]),
 "s36": dict(c=C("jkt", 20, 9), gr=[("jkt", 2.0, .4)], co=[("jkt", "1.3M PEAK", .2, .6), ("jkt", "+200K", .65)]),
 "s37": dict(c=C("kota", 16, 7), co=[("kota", "NEED 105", .15, .55), ("kota", "HAVE 102", .6)]),
 "s38": dict(c=C("t_metro", 14, 6), sh=[("t_metro", 0)], hd=[("t_metro", .7)], co=[("t_metro", "13 RETIRE", .3)]),
 "s39": dict(c=C([6, 48], 36, 22), pa=[("p_cn", .05)], sh=[("t_cn", 0)], mv=[("actor:train", "crrc", "jkt", [[10, 46]], .1, .85, "")], co=[("crrc", "1-2 YEARS", .15, .8), ("jkt", "2027+", .88)]),
 "s40": dict(c=C("tokyo", 24, 10), pa=[("p_ship", .1)], hl=[("tokyo", .3, 1)], co=[("tokyo", "SEPT 2026", .45)], emo={"guide": "smug"}),
 "s41": dict(c=C("kai", 18, 8), mv=[("envelope", "kai", "gov", [], .3, .5, "REQUEST")], co=[("kai", "SEP 23", .15)]),
 "s42": dict(c=C("gov", 16, 7), co=[("gov", "AGREED", .25, .55), ("gov", "23 TRAINS", .6)], hl=[("gov", .25, 1)]),
 "s43": dict(c=C("jkt", 24, 11), gr=[("jkt", 2.0, .4)], co=[("jkt", "369M TRIPS", .3)]),
 "s44": dict(c=C([-8, 22], 48, 32), pa=[("p_ship", .05), ("p_cn", .05)], mv=[("actor:train", "oldjp", "jkt", [[-14, 20]], .1, .25, "1-2 MONTHS"), ("actor:train", "crrc", "jkt", [[10, 46]], .1, .85, "1-2 YEARS")]),
 "s45": dict(c=C("gov", 16, 7), sh=[("lock", .25)], co=[("gov", "MAX 20 YRS", .3)], hl=[("gov", .3, 1)], mood="dusk"),
 "s46": dict(c=C("oldjp", 14, 6), co=[("oldjp", "25-28 YEARS", .25, .6), ("oldjp", "SINCE 1998", .65)], mood="dusk"),
 "s47": dict(c=C("t_old", 14, 6), co=[("t_old", "~10 YRS LEFT", .4)], mood="dusk"),
 "s48": dict(c=C("t_old", 12, 5), co=[("t_old", "NO SPARES", .4)], mood="dusk"),
 "s49": dict(c=C("kai", 16, 7), sh=[("lock", .45)], hd=[("ship", 0)], co=[("kai", "NOV 5: CANCELLED", .45)], hl=[("kai", .45, 1)], mood="dusk"),
 "s50": dict(c=C("tokyo", 24, 10), co=[("tokyo", "STILL FOR SALE", .2, .6), ("oldjp", "TOO OLD", .65)], emo={"guide": "think"}),
 "s51": dict(c=C("oldjp", 18, 8), co=[("oldjp", "KEPT 20-30 YRS", .3)], mood="dusk"),
 "s52": dict(c=OV, pa=[("p_ship", 0)], hd=[("ship", 0)], co=[("jkt", "WINDOW CLOSED", .6)], mood="dusk"),
 "s53": dict(c=C([24, 10], 40, 26), co=[("inka", "ORDER INKA", .15, .45), ("t_old", "KEEP OLD", .5, .75), ("tokyo", "IMPORT USED", .8)]),
 "s54": dict(c=C("t_old", 16, 7), hl=[("inka", .2, .5), ("t_old", .55, 1)], co=[("t_old", ">40 YEARS", .65)], mood="dusk"),
 "s55": dict(c=C("gov", 18, 8), sh=[("t_new", .4)], co=[("gov", "Rp5 TRILLION", .25, .65), ("t_new", "30 TRAINS", .7)], mood="day"),
 "s56": dict(c=C("jkt", 22, 10), pa=[("p_ink", .05)], mv=[("actor:train", "inka", "jkt", [[40, 6]], .15, .6, "84 REPLACED")], co=[("jkt", "1.1M > 1.4M", .8)]),
 "s57": dict(c=OV, pa=[("p_ink", .1)], co=[("inka", "BUILT AT HOME", .7)], mood="dusk"),
 "s58": dict(c=C([30, 10], 54, 40), hl=[("jkt", .3, 1)], co=[("jkt", "JAVA", .45)], emo={"guide": "happy"}),
}

prev = cm(*OV)
for sc in d["scenes"]:
    k = S[sc["id"]]; look, dist, h = k["c"]; to = cm(look, dist, h)
    st = {"engine": "diorama", "mood": k.get("mood", "day"), "camera": {"from": prev, "to": to, "arrive": 0.9}}
    prev = to
    if k.get("pa"): st["paths"] = [{"id": i, "at": a} for i, a in k["pa"]]
    if k.get("mv"):
        st["moves"] = []
        for asset, fr, to_, via, at, dur, lab in k["mv"]:
            m = {"asset": asset, "from": fr, "to": to_, "at": at, "dur": dur}
            if via: m["via"] = via
            if lab: m["label"] = lab
            st["moves"].append(m)
    if k.get("sh"): st["show"] = [{"id": i, "at": a} for i, a in k["sh"]]
    if k.get("hd"): st["hide"] = [{"id": i, "at": a} for i, a in k["hd"]]
    if k.get("gr"): st["grow"] = [{"id": i, "to": t, "at": a} for i, t, a in k["gr"]]
    if k.get("hl"):
        st["highlight"] = []
        for x in k["hl"]:
            e = {"id": x[0], "at": x[1]}
            if len(x) > 2: e["until"] = x[2]
            st["highlight"].append(e)
    if k.get("co"):
        st["callouts"] = []
        for x in k["co"]:
            e = {"id": x[0], "text": x[1], "at": x[2]}
            if len(x) > 3: e["until"] = x[3]
            st["callouts"].append(e)
    if k.get("emo"): st["emo"] = k["emo"]
    sc["stage"] = st
    if not sc.get("broll"):  # deskripsi visual dipertahankan (idempoten)
        sc["visual"]["type"] = "remotion-diagram"
        sc["visual"].pop("spec", None); sc["visual"].pop("on_screen_text", None)

d["thumbnails"] = [
  {"lines": [{"text": "TOO OLD", "color": "#ffd23f", "size": 170}, {"text": "TO IMPORT", "color": "#ffffff", "size": 150}],
   "stage": {"bg": "station", "cam": {"z": [1, 1]}, "actors": [{"id": "t", "kind": "train", "x": 0.78, "scale": 1.7, "emo": "shock"}]}},
  {"lines": [{"text": "TOKYO'S TRAINS", "color": "#ffffff", "size": 130}, {"text": "REJECTED", "color": "#e4572e", "size": 190}],
   "stage": {"bg": "sea", "cam": {"z": [1, 1]}, "actors": [{"id": "t", "kind": "train", "x": 0.8, "scale": 1.7, "emo": "sad"}]}},
]
json.dump(d, open(P, "w"), ensure_ascii=False, indent=1)
print("ok", len(d["scenes"]), "scene")
