// Komponen adegan T01 siklus 004 (GTA VI), gaya R3 3D berkedalaman. Gaya disetujui kreator lewat preview s01-s06 (2026-11-26).
// Semua tokoh dan benda orisinal (tanpa aset, logo, atau tokoh GTA/Rockstar/console). Isi gambar ada di parts/.
import { defineShots } from "@r3";
import * as A from "./parts/s01-06";
import * as B from "./parts/s07-15";
import * as C from "./parts/s16-23";
import * as D from "./parts/s24-37";

export default defineShots({
  s01: [A.s01, null, null],
  s02: [A.s02a, A.s02b],
  s03: [A.s03a, A.s03b, null],
  s04: [A.s04, null],
  s05: [A.s05a, A.s05b, null],
  s06: [A.s06, null, null, null, null],
  s07: [B.s07a, null, B.s07b],
  s08: [B.s08a, null, B.s08b, B.s08c],
  s09: [B.s09, null],
  s10: [B.s10a, null, null, B.s10b],
  s11: [B.s11, null, null],
  s12: [B.s12a, B.s12b],
  s13: [B.s13a, B.s13b, B.s13c, B.s13d],
  s14: [B.s14, null],
  s15: [B.s15a, B.s15b, B.s15c, B.s15d],
  s16: [C.s16, null, null],
  s17: [C.s17a, C.s17b, C.s17c],
  s18: [C.s18, null, null],
  s19: [C.s19a, C.s19b],
  s20: [C.s20, null],
  s21: [C.s21, null, null],
  s22: [C.s22a, C.s22b, C.s22c],
  s23: [C.s23, null],
  s24: [D.s24, null],
  s25: [D.s25a, D.s25b, D.s25c],
  s26: [D.s26a, D.s26b, D.s26c],
  s27: [D.s27a, D.s27b, null],
  s28: [D.s28a, D.s28b, D.s28c],
  s29: [D.s29, null, null],
  s30: [D.s30a, D.s30b],
  s31: [D.s31a, D.s31b],
  s32: [D.s32a, D.s32b, D.s32c],
  s33: [D.s33, null],
  s34: [D.s34, null, null, null],
  s35: [D.s35a, D.s35b, D.s35c],
  s36: [D.s36, null, null],
  s37: [D.s37a, D.s37b, D.s37c],
  thumbA: [D.thumbA],
  thumbB: [D.thumbB],
  thumbS1: [D.thumbS1],
  thumbS2: [D.thumbS2],
});
