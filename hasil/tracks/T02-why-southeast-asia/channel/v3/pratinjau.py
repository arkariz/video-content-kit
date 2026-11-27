#!/usr/bin/env python3
"""Lembar pratinjau (butuh ffmpeg). Atas, kiri ke kanan: profil A, B, C dipotong bulat pada 270, 98, dan 32 px.
Bawah: banner A lalu B dipotong ke area aman HP (1546x423 di tengah)."""
import os, subprocess
H = os.path.dirname(os.path.abspath(__file__))
names = ["profil-A-planet", "profil-B-tanda", "profil-C-pulau", "banner-A-senja", "banner-B-siang"]
f = ["color=c=0x0f0f0f:s=1400x1000:d=1[bg0]"]; k = 0
def put(src, x, y):
    global k; f.append(f"[bg{k}][{src}]overlay={x}:{y}[bg{k+1}]"); k += 1
for i in range(3):
    f.append(f"[{i}:v]split=3[s{i}0][s{i}1][s{i}2]")
    for j, (d, dx, dy) in enumerate([(270, 0, 0), (98, 290, 0), (32, 323, 130)]):
        r = d / 2
        f.append(f"[s{i}{j}]scale={d}:{d},format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*clip({r}-hypot(X+0.5-{r},Y+0.5-{r}),0,1)'[c{i}{j}]")
        put(f"c{i}{j}", 40 + i * 450 + dx, 40 + dy)
for i in range(2):
    f.append(f"[{3+i}:v]crop=1546:423:507:508,scale=1070:-2[b{i}]"); put(f"b{i}", 165, 350 + i * 320)
cmd = ["ffmpeg", "-v", "error", "-y"]
for n in names: cmd += ["-i", os.path.join(H, n + ".png")]
cmd += ["-filter_complex", ";".join(f), "-map", f"[bg{k}]", "-frames:v", "1", os.path.join(H, "pratinjau.png")]
subprocess.run(cmd, check=True)
