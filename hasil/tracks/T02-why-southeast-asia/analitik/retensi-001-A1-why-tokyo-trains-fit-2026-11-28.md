# Retensi T02 siklus 001 (A1-why-tokyo-trains-fit), 2026-11-28

Sumber: `youtube-retensi-001-A1-why-tokyo-trains-fit-6r6uGB9LA_4-2026-11-28.csv`. Dibaca dengan retention.py (youtube-agent-skill, MIT). Transkrip dari caption en.

```
/Users/202604033/dev/video-content-kit/hasil/tracks/T02-why-southeast-asia/analitik/youtube-retensi-001-A1-why-tokyo-trains-fit-6r6uGB9LA_4-2026-11-28.csv   100 points   121.7% -> 22.2%

  HOOK LEAK   91.8% lost in the opening   [severe]
              under 25 is healthy for this length. Fix the first line before anything else.

  CLIFFS      the moments people actually left
    - 11.1%  at       5s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n"
    -  7.7%  at       6s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n"
    -  5.3%  at       5s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more."
    -  5.3%  at       7s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n"
    -  4.8%  at       6s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n"

  SLIDE       0.193% per unit across the middle
              a flat slide is pacing, not content. Cut the middle, do not rewrite it.
```

<details><summary>JSON</summary>

```json
{
 "points": 100,
 "start": 121.74,
 "hook_leak": 91.79,
 "end": 22.22,
 "cliffs": [
  {
   "from": 10.0,
   "to": 11.0,
   "lost": 11.11,
   "at_seconds": 5.1
  },
  {
   "from": 12.0,
   "to": 13.0,
   "lost": 7.73,
   "at_seconds": 6.1
  },
  {
   "from": 9.0,
   "to": 10.0,
   "lost": 5.32,
   "at_seconds": 4.6
  },
  {
   "from": 14.0,
   "to": 15.0,
   "lost": 5.31,
   "at_seconds": 7.1
  },
  {
   "from": 11.0,
   "to": 12.0,
   "lost": 4.83,
   "at_seconds": 5.6
  }
 ],
 "slide_per_unit": 0.193,
 "said": {
  "10.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n",
  "12.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n",
  "9.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more.",
  "14.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n",
  "11.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n"
 }
}
```
</details>

## Yang diubah di siklus berikutnya
Tidak ada aturan baru; aturan uji hook di learnings.md tetap. Angka "HOOK LEAK" tidak dipakai (alat menghitung dari awal kurva di atas 100%).
