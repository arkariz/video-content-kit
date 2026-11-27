# Retensi T02 siklus 001 (A1-why-tokyo-trains-fit), 2026-11-27

Sumber: ekspor YouTube Studio kreator, rentang 2026-11-25 sampai 2026-11-26 (`retensi-001-A1-why-tokyo-trains-fit-2026-11-27-studio.csv`). Dibaca dengan retention.py (youtube-agent-skill, MIT). Transkrip dari caption en.

```
/Users/202604033/Downloads/Retensi penonton 2026-11-25_2026-11-26 You step onto a Jakarta train that started in Tokyo. Here's why it still fits./Semua.csv   100 points   121.7% -> 22.2%

  HOOK LEAK   91.8% lost in the opening   [severe]
              under 25 is healthy for this length. Fix the first line before anything else.

  CLIFFS      the moments people actually left
    - 11.1%  at       5s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more."
    -  7.7%  at       6s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n"
    -  5.3%  at       4s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more."
    -  5.3%  at       7s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n"
    -  4.8%  at       5s   "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n"

  SLIDE       0.198% per unit across the middle
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
   "from": 9.0,
   "to": 10.0,
   "lost": 11.11,
   "at_seconds": 4.6
  },
  {
   "from": 11.0,
   "to": 12.0,
   "lost": 7.73,
   "at_seconds": 5.6
  },
  {
   "from": 8.0,
   "to": 9.0,
   "lost": 5.32,
   "at_seconds": 4.1
  },
  {
   "from": 13.0,
   "to": 14.0,
   "lost": 5.31,
   "at_seconds": 6.6
  },
  {
   "from": 10.0,
   "to": 11.0,
   "lost": 4.83,
   "at_seconds": 5.1
  }
 ],
 "slide_per_unit": 0.198,
 "said": {
  "9.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more.",
  "11.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n",
  "8.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more.",
  "13.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n",
  "10.0": "You step onto a Jakarta commuter train that started its working life in Tokyo decades ago. In November, Jakarta refused to buy any more. A n"
 }
}
```
</details>

## Angka Studio (ditempel kreator)

| Metrik | A1 | Lulus | Gagal |
| --- | --- | --- | --- |
| Viewed vs swiped away | 57,4% ditonton | 65% atau lebih | di bawah 50% |
| Rata-rata durasi tonton | 0:27 dari 0:51, sekitar 53% (dihitung) | 70% atau lebih | di bawah 50% |

Ambang dari `validasi/rencana.md` berlaku untuk median paket uji, bukan satu video. Rata-rata titik kurva CSV 44,8%, lebih rendah dari 53%; selisihnya belum bisa dijelaskan.

## Bacaan per kalimat

| Detik | Kalimat | Retensi (awal ke akhir, sekitar) |
| --- | --- | --- |
| 0 sampai 4,7 | You step onto a Jakarta commuter train ... | 122% ke 100% |
| 5 sampai 8 | In November, Jakarta refused to buy any more. | 93% ke 69% |
| 9 sampai 14,4 | A new car cost ten to twelve billion ... one tenth of the price. | 64% ke 45% |
| 15 sampai 29 | Rel 1.067 mm (jawaban janji hook mulai di sini) | 43% ke 31% |
| 30 sampai 50 | Listrik dan penutup | 30% ke 22% |

Angka "HOOK LEAK 91,8" dari alat di atas tidak dipakai: alat menghitung 30 detik pertama dalam poin persentase, tidak cocok untuk video 51 detik yang mulai di atas 100%.

## Yang diubah di siklus berikutnya

Dugaan (satu video): penonton pergi saat jawaban atas janji hook ditunda oleh konteks (penolakan, harga tanpa mata uang). Aturan uji: jawaban atas janji hook mulai di kalimat kedua, paling lambat detik 6. Ukur retensi detik 15 (A1: 43%) dan viewed vs swiped (A1: 57,4%).
