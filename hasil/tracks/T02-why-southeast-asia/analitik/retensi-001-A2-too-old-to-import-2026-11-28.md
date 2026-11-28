# Retensi T02 siklus 001 (A2-too-old-to-import), 2026-11-28

Sumber: `youtube-retensi-001-A2-too-old-to-import-DPSRC4Ef_8w-2026-11-28.csv`. Dibaca dengan retention.py (youtube-agent-skill, MIT). Transkrip dari caption en.

```
/Users/202604033/dev/video-content-kit/hasil/tracks/T02-why-southeast-asia/analitik/youtube-retensi-001-A2-too-old-to-import-DPSRC4Ef_8w-2026-11-28.csv   100 points   134.7% -> 34.7%

  HOOK LEAK   92.8% lost in the opening   [severe]
              under 25 is healthy for this length. Fix the first line before anything else.

  CLIFFS      the moments people actually left
    - 10.2%  at       4s   "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr"
    -  8.2%  at       5s   "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr"
    -  7.1%  at       6s   "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr"
    -  5.1%  at       5s   "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr"
    -  5.1%  at       6s   "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr"

  SLIDE       0.238% per unit across the middle
              a flat slide is pacing, not content. Cut the middle, do not rewrite it.
```

<details><summary>JSON</summary>

```json
{
 "points": 100,
 "start": 134.69,
 "hook_leak": 92.85,
 "end": 34.69,
 "cliffs": [
  {
   "from": 10.0,
   "to": 11.0,
   "lost": 10.2,
   "at_seconds": 4.3
  },
  {
   "from": 12.0,
   "to": 13.0,
   "lost": 8.17,
   "at_seconds": 5.2
  },
  {
   "from": 15.0,
   "to": 16.0,
   "lost": 7.14,
   "at_seconds": 6.5
  },
  {
   "from": 11.0,
   "to": 12.0,
   "lost": 5.1,
   "at_seconds": 4.7
  },
  {
   "from": 14.0,
   "to": 15.0,
   "lost": 5.1,
   "at_seconds": 6.0
  }
 ],
 "slide_per_unit": 0.238,
 "said": {
  "10.0": "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr",
  "12.0": "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr",
  "15.0": "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr",
  "11.0": "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr",
  "14.0": "Parliament's committee agreed. The order would be twenty-three used trains, on one condition: keep building up Indonesia's own train industr"
 }
}
```
</details>

## Yang diubah di siklus berikutnya
Tidak ada aturan baru; aturan uji hook di learnings.md tetap. Angka "HOOK LEAK" tidak dipakai (alat menghitung dari awal kurva di atas 100%).
