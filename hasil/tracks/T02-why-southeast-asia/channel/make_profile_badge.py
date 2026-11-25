#!/usr/bin/env python3
"""Foto profil emblem (1000x1000) untuk channel T02. Guide dari make_assets.guide(); gunung api dan kapal diporting dari toon/Actors.tsx (tanpa wajah)."""
import os, subprocess, math
from make_assets import guide, INK, RED, CREAM, OUTFIT, FONT, HERE
W = 1000; C = W / 2; R_OUT, R_IN = 480, 352
TOP_TXT, BOT_TXT = "EQUATOR LOGIC", "WHY SOUTHEAST ASIA WORKS"
H = 610  # garis cakrawala = khatulistiwa
SY, GS = 470, 1.45  # pusat matahari = pusat kepala Guide; skala Guide


def arc_text(txt, r, size, spacing, weight, fill, top=True, adv=0.66):
    """Huruf satu per satu di busur (librsvg tidak mendukung textPath). top: dibaca di atas, bawah: dibaca dari kiri."""
    W_ = {" ": 0.30, "I": 0.30, "W": 0.98, "M": 0.92, "Q": 0.80, "O": 0.80, "G": 0.78, "C": 0.72, "D": 0.76, "H": 0.74, "U": 0.72, "A": 0.72, "N": 0.74, "R": 0.66, "L": 0.56, "E": 0.60, "T": 0.62, "S": 0.62, "K": 0.68, "Y": 0.66, "P": 0.64}
    widths = [size*W_.get(ch, adv) + spacing for ch in txt]
    total = sum(widths); ang_total = total / r; out = []
    a = (-math.pi/2 - ang_total/2) if top else (math.pi/2 + ang_total/2)
    for ch, w in zip(txt, widths):
        da = w / r; mid = a + (da/2 if top else -da/2)
        x, y = C + r*math.cos(mid), C + r*math.sin(mid)
        rot = math.degrees(mid) + (90 if top else -90)
        if ch != " ":
            out.append(f'<text x="{x:.1f}" y="{y:.1f}" transform="rotate({rot:.2f} {x:.1f} {y:.1f})" text-anchor="middle" font-family="{FONT}" font-weight="{weight}" font-size="{size}" fill="{fill}">{ch}</text>')
        a = a + da if top else a - da
    return "".join(out)

def arc(id_, r, top=True):
    # busur untuk teks: atas searah jarum jam, bawah berlawanan supaya terbaca tegak
    if top: return f'<path id="{id_}" d="M {C-r},{C} A {r},{r} 0 0 1 {C+r},{C}"/>'
    return f'<path id="{id_}" d="M {C-r},{C} A {r},{r} 0 0 0 {C+r},{C}"/>'

volcano = (f'<g transform="translate(150,{H-250}) scale(1.15)">'
           f'<path d="M0,220 L96,22 L142,22 L238,220z" fill="#7d6b5a" stroke="{INK}" stroke-width="7" stroke-linejoin="round"/>'
           f'<path d="M96,22 Q119,46 142,22 Q119,8 96,22z" fill="#ff7a2f" stroke="{INK}" stroke-width="5"/>'
           f'<path d="M119,36 q-14,40 4,60 q10,18 -2,40" fill="none" stroke="#ff7a2f" stroke-width="9" stroke-linecap="round"/>'
           f'<g fill="#e9e4dc" stroke="{INK}" stroke-width="5"><circle cx="108" cy="-4" r="22"/><circle cx="138" cy="-22" r="26"/><circle cx="118" cy="-52" r="20"/></g></g>')
ship = (f'<g transform="translate(640,{H-112}) scale(0.62)">'
        f'<path d="M14,100 L286,100 L252,170 L48,170z" fill="#35557a" stroke="{INK}" stroke-width="8" stroke-linejoin="round"/>'
        + "".join(f'<rect x="{x}" y="46" width="50" height="54" fill="{f}" stroke="{INK}" stroke-width="5"/>' for x, f in [(30, RED), (86, "#f0a830"), (142, "#2a9d8f")]) +
        f'<rect x="204" y="0" width="66" height="100" rx="8" fill="#f4f1ea" stroke="{INK}" stroke-width="7"/>'
        f'<rect x="216" y="18" width="42" height="22" rx="4" fill="#bfe3f7" stroke="{INK}" stroke-width="4"/></g>')
sun_rays = "".join(f'<line x1="{C+math.cos(a)*200:.1f}" y1="{SY+math.sin(a)*200:.1f}" x2="{C+math.cos(a)*262:.1f}" y2="{SY+math.sin(a)*262:.1f}" stroke="#ff8a3d" stroke-width="18" stroke-linecap="round"/>' for a in [math.radians(d) for d in range(0, 360, 20)])
waves = "".join(f'<path d="M{x},{y} q22,-14 44,0 t44,0 t44,0" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.55"/>' for x, y in [(200, H+70), (590, H+110), (330, H+170), (660, H+200)])

inner = (f'<rect width="{W}" height="{W}" fill="url(#sky)"/>'
         + sun_rays + f'<circle cx="{C}" cy="{SY}" r="178" fill="#ffd166" stroke="{INK}" stroke-width="8"/>'
         + volcano +
         f'<rect x="0" y="{H}" width="{W}" height="{W-H}" fill="url(#sea)"/>' + waves + ship +
         f'<line x1="0" y1="{H}" x2="{W}" y2="{H}" stroke="{RED}" stroke-width="14" stroke-dasharray="44 26"/>'
         f'<g transform="translate({C-150*GS},{SY-108*GS}) scale({GS})">{guide()}</g>')

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{W}" height="{W}" viewBox="0 0 {W} {W}">
<defs>
 <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9e57"/><stop offset="0.55" stop-color="#ffd89a"/><stop offset="1" stop-color="#fff1cf"/></linearGradient>
 <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4aa3d1"/><stop offset="1" stop-color="#2c7fb8"/></linearGradient>
 <clipPath id="disc"><circle cx="{C}" cy="{C}" r="{R_IN}"/></clipPath>
 {arc("topArc", 418, True)}{arc("botArc", 448, False)}
</defs>
<rect width="{W}" height="{W}" fill="{OUTFIT}"/>
<circle cx="{C}" cy="{C}" r="{R_OUT}" fill="{CREAM}" stroke="{INK}" stroke-width="14"/>
<circle cx="{C}" cy="{C}" r="{R_OUT-26}" fill="none" stroke="{INK}" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>
{arc_text(TOP_TXT, 392, 76, 7, 800, INK, True)}
{arc_text(BOT_TXT, 436, 42, 5, 700, OUTFIT, False)}
<g fill="{RED}" stroke="{INK}" stroke-width="4"><circle cx="{C-R_OUT+52}" cy="{C}" r="13"/><circle cx="{C+R_OUT-52}" cy="{C}" r="13"/></g>
<g clip-path="url(#disc)">{inner}</g>
<circle cx="{C}" cy="{C}" r="{R_IN}" fill="none" stroke="{INK}" stroke-width="14"/>
</svg>'''
p = os.path.join(HERE, "profil-equator-logic-emblem.svg"); open(p, "w").write(svg)
subprocess.run(["rsvg-convert", "-w", str(W), "-h", str(W), "-o", p.replace(".svg", ".png"), p], check=True)
print("ok")
