#!/usr/bin/env python3
"""Foto profil + banner channel T02 (Equator Logic). Tokoh Guide diporting dari produksi/remotion/src/toon/Actors.tsx + Face.tsx,
garis pantai dari toon/geo.ts. Jalankan: python3 make_assets.py && rsvg-convert dipanggil otomatis."""
import subprocess, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
INK = "#1b1b1b"; SKIN = "#c98f62"; OUTFIT = "#2f7d6d"; HAIR = "#1b1209"; SAND = "#e7d9a8"; CREAM = "#fff6df"; RED = "#d9362b"
NAME = "EQUATOR LOGIC"; TAG = "Why Southeast Asia works like this"; SUB = "geography · infrastructure · history, from Indonesia"
FONT = "Poppins"

def guide(emo="happy"):
    """Guide dalam viewBox 300x380 (kepala pusat 150,108 r84)."""
    s, cx, cy = 84, 150, 118
    ex, ey, my, er, sw = 0.38*s, cy-0.08*s, cy+0.42*s, 0.11*s, max(3, s*0.07)
    face = (f'<ellipse cx="{cx-ex}" cy="{ey}" rx="{er}" ry="{er}" fill="{INK}"/><ellipse cx="{cx+ex}" cy="{ey}" rx="{er}" ry="{er}" fill="{INK}"/>'
            f'<path d="M{cx-0.3*s},{my-0.06*s} Q{cx},{my+0.42*s} {cx+0.3*s},{my-0.06*s} Z" fill="#fff" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    arm = lambda x1,y1,x2,y2: (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{INK}" stroke-width="30" stroke-linecap="round"/>'
                               f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{OUTFIT}" stroke-width="19" stroke-linecap="round"/>'
                               f'<circle cx="{x2}" cy="{y2}" r="15" fill="{SKIN}" stroke="{INK}" stroke-width="4"/>')
    return (arm(104,222,50,286) + arm(196,222,300,214) +
            f'<rect x="92" y="185" width="116" height="160" rx="42" fill="{OUTFIT}" stroke="{INK}" stroke-width="6"/>'
            f'<circle cx="68" cy="112" r="14" fill="{SKIN}" stroke="{INK}" stroke-width="6"/><circle cx="232" cy="112" r="14" fill="{SKIN}" stroke="{INK}" stroke-width="6"/>'
            f'<circle cx="150" cy="108" r="84" fill="{SKIN}" stroke="{INK}" stroke-width="6"/>'
            f'<path d="M68,100 Q70,30 150,26 Q230,30 232,100 Q200,60 150,66 Q100,60 68,100z" fill="{HAIR}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>'
            + face +
            f'<g fill="none" stroke="{INK}" stroke-width="5"><circle cx="118" cy="110" r="24"/><circle cx="182" cy="110" r="24"/><line x1="142" y1="108" x2="158" y2="108"/></g>')

def sea_bg(w, h, grid=12):
    g = "".join(f'<line x1="{i*w/grid}" y1="0" x2="{i*w/grid}" y2="{h}" stroke="#fff" stroke-width="{max(2,w/900)}" opacity="0.22"/>' for i in range(grid+1))
    g += "".join(f'<line x1="0" y1="{i*h/7}" x2="{w}" y2="{i*h/7}" stroke="#fff" stroke-width="{max(2,w/900)}" opacity="0.22"/>' for i in range(8))
    return (f'<defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc6ea"/><stop offset="1" stop-color="#4aa3d1"/></linearGradient></defs>'
            f'<rect width="{w}" height="{h}" fill="url(#sea)"/>' + g)

def coast():
    src = open(os.path.join(HERE, "../../../../produksi/remotion/src/toon/geo.ts")).read()
    out = []
    for m in re.finditer(r'id: "([^"]+)", pts: \[(.*?)\] \}', src):
        pts = [tuple(map(float, p)) for p in re.findall(r'\[(-?[\d.]+), (-?[\d.]+)\]', m.group(2))]
        out.append(pts)
    return out

def project(ll, w, h, v):
    k = min(w/(v[0][1]-v[0][0]), h/(v[1][1]-v[1][0])); cx = sum(v[0])/2; cy = sum(v[1])/2
    return (w/2 + (ll[0]-cx)*k, h/2 - (ll[1]-cy)*k)

def write(name, w, h, body):
    p = os.path.join(HERE, name + ".svg")
    open(p, "w").write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>')
    subprocess.run(["rsvg-convert", "-w", str(w), "-h", str(h), "-o", os.path.join(HERE, name + ".png"), p], check=True)

def main():
    # ---------- foto profil 800x800 (dipotong lingkaran oleh platform) ----------
    W = 800
    eq_y = 560
    prof = sea_bg(W, W, 8)
    prof += f'<line x1="0" y1="{eq_y}" x2="{W}" y2="{eq_y}" stroke="{RED}" stroke-width="12" stroke-dasharray="38 24"/>'
    prof += f'<g transform="translate(115,95) scale(1.9)">{guide()}</g>'
    write("profil-equator-logic", W, W, prof)

    # ---------- banner YouTube 2560x1440, area aman 1546x423 di tengah ----------
    BW, BH = 2560, 1440
    v = ((92, 142), (-10, 18))
    ban = sea_bg(BW, BH, 16)
    for pts in coast():
        ban += '<polygon points="' + " ".join("%.1f,%.1f" % project(p, BW, BH, v) for p in pts) + f'" fill="{SAND}" stroke="{INK}" stroke-width="7" stroke-linejoin="round"/>'
    ey = project((0, 0), BW, BH, v)[1]
    ban += f'<line x1="0" y1="{ey}" x2="{BW}" y2="{ey}" stroke="{RED}" stroke-width="9" stroke-dasharray="40 26" opacity="0.9"/>'
    sx, sy, sw_, sh = (BW-1546)/2, (BH-423)/2, 1546, 423
    px, py, pw, ph = sx+20, sy+18, sw_-40, sh-36
    ban += f'<rect x="{px+12}" y="{py+14}" width="{pw}" height="{ph}" rx="40" fill="{INK}" opacity="0.25"/>'
    ban += f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="40" fill="{CREAM}" stroke="{INK}" stroke-width="8"/>'
    ban += f'<g transform="translate({px+40},{py+18}) scale(0.95)">{guide()}</g>'
    tx = px + 380
    ban += f'<text x="{tx}" y="{py+170}" font-family="{FONT}" font-weight="800" font-size="112" letter-spacing="3" fill="{INK}">{NAME}</text>'
    ban += f'<rect x="{tx}" y="{py+200}" width="250" height="10" rx="5" fill="{RED}"/>'
    ban += f'<text x="{tx}" y="{py+282}" font-family="{FONT}" font-weight="700" font-size="58" fill="{OUTFIT}">{TAG}</text>'
    ban += f'<text x="{tx}" y="{py+344}" font-family="{FONT}" font-weight="500" font-size="38" fill="#4a4a4a">{SUB}</text>'
    write("banner-youtube-equator-logic", BW, BH, ban)
    print("ok")

if __name__ == "__main__":
    main()
