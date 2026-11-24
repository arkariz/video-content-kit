# Skill pihak ketiga

Disalin apa adanya dari repo aslinya. Lisensi aslinya disertakan di setiap folder. Jangan diedit di sini. Untuk update, salin ulang dari sumbernya.

| Skill | Sumber | Commit | Tanggal commit | Lisensi | Dasar |
| --- | --- | --- | --- | --- | --- |
| `humanizer` | https://github.com/blader/humanizer | a32f24407364c74c812b43c15926d638bee1e072 | 2026-11-19 | MIT | Panduan Wikipedia "Signs of AI writing" (WikiProject AI Cleanup) |
| `stop-slop` | https://github.com/hardikpandya/stop-slop | 8da1f030185bdfe8471220585162991eaeb970e9 | 2026-03-18 | MIT | Daftar frasa, struktur, dan skor 5 dimensi |

Kenapa dua skill ini dipilih: keduanya paling banyak dipakai di kategorinya (humanizer sekitar 69 ribu bintang dan stop-slop sekitar 19 ribu bintang di GitHub per 24 Nov 2026), berlisensi MIT, dan mengikuti format Agent Skills sehingga jalan di Claude Code, Codex, dan agent lain.

Cara update ke versi terbaru:

```bash
npx skills add blader/humanizer
npx skills add hardikpandya/stop-slop
```

Atau clone ulang repo-nya, lalu salin `SKILL.md`, `LICENSE`, dan `references/` ke folder yang sama.
