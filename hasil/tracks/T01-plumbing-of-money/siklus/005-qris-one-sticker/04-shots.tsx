// T01-005 QRIS: R3 2.5D (arah visual 03-visual.json). Aset di parts/.
// Tahap sekarang: scene uji gaya (s01, s10, s12, thumbA); scene lain menyusul setelah gaya disetujui.
import { defineShots, shot } from "@r3";
import { ScanShot, ThumbA } from "./parts/warung";
import { MapShot } from "./parts/peta";
import { InsideShot, PullOutShot } from "./parts/kode";

export default defineShots({
  s01: [shot(ScanShot, { labels: { QRIS: [1250, 290], "2 SECONDS": [620, 210, "right"] }, drift: false, focus: 1250 }), null],
  s10: [shot(MapShot, { labels: { "YOUR APP": [400, 190], SWITCH: [960, 320], BANK: [1510, 290] }, drift: false }), null],
  s12: [shot(InsideShot, { labels: "own", drift: false }), null, shot(PullOutShot, { labels: { "NO AMOUNT": [1360, 440] }, from: [960, 540], drift: false, focus: 1100 })],
  thumbA: [ThumbA],
});
