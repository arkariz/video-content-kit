// T01-005 QRIS: R3 2.5D (arah visual 03-visual.json). Aset di parts/.
import { defineShots, shot } from "@r3";
import { chain } from "./parts/chain";
import { InsideShot, PullOutShot } from "./parts/kode";
import { MapShot } from "./parts/peta";
import { IndoMapShot, GrowthShot, HopShot, PerSixShot, StreetShot, LinkShot, NorthShot, NoDollarShot, GuessShot, InflowShot, TwoStackShot, TopTwoShot, ThreadsShot, TalksShot, HubShot, LightsShot, PlugMapShot, ThumbB, ThumbS1, ThumbS2 } from "./parts/s-asia";
import { MorphShot, WallShot, MergeShot, ClickShot, WiringShot, GlowSocketShot, HatchShot, AdapterShot, BangkokShot } from "./parts/s-dinding";
import { FarOfficeShot, ReportShot, BeamShot, BridgeShot, GlobeShot, CafeShot, FerryShot, SettleShot, TokyoShot, MarketShot, SizeShot } from "./parts/s-luar";
import { MessagesShot, PinShot, SendShot, TurntableShot, BankYesShot, LoopShot, WhoPaysShot, CartShot, TrayShot, WayInShot, DoorShot, ShelfShot, LicensedShot, BoomerangShot, ThaiSwitchShot, SameRoadShot } from "./parts/s-peta";
import { RingShot, Y2019Shot, ClutterShot, WrongShot, NotAppShot, RulebookShot, ProviderShot, FreeShot, BothShot, MdrShot, FreeBarShot, ThinShot, RecordShot, YearsShot, KeepShot, ArriveShot, TouristScanShot, BahtShot, BahtRpShot, BackShot, TogetherShot, WireShot } from "./parts/s-warung";
import { ScanShot, ThumbA } from "./parts/warung";

export default defineShots({
  s01: [shot(ScanShot, { labels: {"QRIS": [1250, 290], "2 SECONDS": [620, 210, "right"]}, drift: false, focus: 1250 }), null],
  s02: [shot(IndoMapShot, { labels: {"71.9M PEOPLE": [600, 330], "51.3M SHOPS": [1330, 330]}, drift: false }), null, shot(GrowthShot, { labels: {"+71%": [960, 280, "none"]}, drift: false })],
  s03: [shot(RingShot, { drift: false }), shot(HopShot, { labels: "own", drift: false })],
  s04: [shot(Y2019Shot, { labels: {"2019": [1250, 150], "26 FORMATS": [960, 80, "none"]}, from: [1250, 430], drift: false }), null],
  s05: [shot(chain(ClutterShot, WrongShot, { bubble: { at: [480, 430], in: "a" } }), { labels: "own", bubble: "own", drift: false, focus: 1300 }), null],
  s06: [shot(chain(MorphShot, WallShot, { labels: { PLUG: [620, 270], SOCKET: [1260, 270] } }), { labels: "own", from: [960, 500], drift: false }), null],
  s07: [shot(chain(MergeShot, ClickShot, { labels: { "17 AUG 2019": [960, 250], QRIS: [960, 270] } }), { labels: "own", bubble: "own", drift: false }), null],
  s08: [shot(NotAppShot, { labels: {"NOT AN APP": [960, 150]}, drift: false }), shot(RulebookShot, { labels: {"RULEBOOK": [960, 180]}, from: [960, 500], drift: false })],
  s09: [shot(ProviderShot, { labels: {"2020": [960, 200], "ONE PROVIDER": [1560, 320]}, drift: false }), null, shot(FreeShot, { labels: {"FREE": [900, 230]}, drift: false })],
  s10: [shot(MapShot, { labels: {"YOUR APP": [400, 190], "SWITCH": [960, 320], "BANK": [1510, 290]}, drift: false }), null],
  s11: [shot(WiringShot, { labels: {"WIRING": [900, 560]}, from: [560, 320], drift: false, focus: 900 }), shot(MessagesShot, { labels: {"MESSAGES": [960, 230]}, drift: false })],
  s12: [shot(InsideShot, { labels: "own", drift: false }), null, shot(PullOutShot, { labels: {"NO AMOUNT": [1360, 440]}, from: [960, 540], drift: false, focus: 1100 })],
  s13: [shot(PinShot, { labels: {"Rp50,000": [590, 300, "right"]}, drift: false }), shot(SendShot, { from: [400, 600], drift: false })],
  s14: [shot(TurntableShot, { from: [960, 640], drift: false }), shot(BankYesShot, { labels: {"YES": [1330, 230]}, drift: false, focus: 1300 })],
  s15: [shot(chain(BothShot, LoopShot, { k: 2, labels: { AMOUNT: [800, 230], "ROUND TRIP": [480, 230] } }), { labels: "own", bubble: "own", drift: false }), null, null],
  s16: [shot(WhoPaysShot, { drift: false }), shot(CartShot, { labels: {"$2.75": [960, 290]}, drift: false })],
  s17: [shot(MdrShot, { labels: {"MDR": [960, 210]}, drift: false }), null],
  s18: [shot(FreeBarShot, { labels: {"0% TO 100K": [720, 290], "0% TO 500K": [760, 545]}, drift: false }), null],
  s19: [shot(ThinShot, { labels: {"UNDER 1%": [960, 130]}, drift: false, bubble: "own" }), null],
  s20: [shot(TrayShot, { drift: false }), shot(WayInShot, { labels: {"WAY IN": [1350, 220]}, from: [1350, 600], drift: false, focus: 1200 })],
  s21: [shot(RecordShot, { labels: {"RECORD": [900, 330], "LOAN": [1010, 430]}, drift: false }), null, shot(YearsShot, { labels: {"3 YEARS": [960, 130]}, drift: false })],
  s22: [shot(chain(DoorShot, ShelfShot, { bubble: { at: [1340, 780], in: "b" } }), { labels: "own", bubble: "own", drift: false }), null],
  s23: [shot(KeepShot, { labels: {"Rp50,000": [660, 420], "Rp1,400": [1530, 420]}, drift: false }), null],
  s24: [shot(PerSixShot, { labels: {"1 PER 6": [960, 280]}, drift: false }), shot(StreetShot, { labels: {"SMALL SHOPS": [960, 200]}, from: [960, 600], drift: false })],
  s25: [shot(LicensedShot, { labels: {"LICENSED": [960, 250]}, drift: false }), null],
  s26: [shot(FarOfficeShot, { from: [400, 600], drift: false, focus: 1400 })],
  s27: [shot(ReportShot, { labels: {"TRADE BARRIERS": [620, 250], "2025": [1450, 250]}, drift: false }), null],
  s28: [shot(chain(BoomerangShot, BeamShot, { labels: { "DOMESTIC RULE": [1450, 190] }, bubble: { at: [520, 330], in: "b" } }), { labels: "own", bubble: "own", drift: false, focus: 800 }), null],
  s29: [shot(GlowSocketShot, { drift: false }), shot(HatchShot, { labels: {"EMVCO": [960, 150]}, from: [960, 520], drift: false, bubbleAt: [360, 520] })],
  s30: [shot(BridgeShot, { drift: false, focus: 900 })],
  s31: [shot(GlobeShot, { labels: {"CROSS-BORDER": [1310, 150]}, drift: false, focus: 900 }), null],
  s32: [shot(CafeShot, { drift: false })],
  s33: [shot(LinkShot, { labels: {"2022": [380, 765], "2023": [670, 765]}, from: [960, 600], drift: false }), null],
  s34: [shot(NorthShot, { labels: {"2025": [1250, 765], "2026": [1540, 765], "6 COUNTRIES": [330, 260, "up"]}, drift: false }), null],
  s35: [shot(chain(NoDollarShot, GuessShot, { labels: { "NO DOLLARS": [960, 560, "none"], "THE GUESS": [960, 560, "none"] } }), { labels: "own", bubble: "own", drift: false }), null],
  s36: [shot(ArriveShot, { drift: false, focus: 1200 }), shot(TouristScanShot, { drift: false, focus: 1220 })],
  s37: [shot(chain(ThaiSwitchShot, SameRoadShot, { labels: { "THAI SWITCH": [960, 300, "none"], "SAME ROAD": [960, 300, "none"] } }), { labels: "own", from: [420, 600], drift: false }), null],
  s38: [shot(chain(BahtShot, BahtRpShot, { labels: { BAHT: [570, 330, "right"], RUPIAH: [1440, 200] } }), { labels: "own", bubble: "own", drift: false }), null],
  s39: [shot(chain(FerryShot, SettleShot, { labels: { "APPOINTED BANKS": [960, 210, "none"], SETTLEMENT: [960, 330, "none"] } }), { labels: "own", from: [960, 600], drift: false }), null],
  s40: [shot(AdapterShot, { labels: {"ADAPTER": [960, 230]}, drift: false }), null, shot(BangkokShot, { labels: {"BANGKOK": [620, 230, "none"]}, drift: false, focus: 900 })],
  s41: [shot(chain(InflowShot, TwoStackShot, { labels: { INBOUND: [960, 180, "none"], "Rp5.9T": [560, 120, "none"], "3X": [1360, 230, "none"] } }), { labels: "own", bubble: "own", drift: false }), null, shot(TopTwoShot, { labels: "own", drift: false })],
  s42: [shot(chain(ThreadsShot, TokyoShot, { labels: { "35 SHOPS": [420, 190, "none"], "ONE WAY": [960, 580] } }), { labels: "own", bubble: "own", drift: false }), null],
  s43: [shot(TalksShot, { labels: {"IN TALKS": [960, 130, "none"]}, drift: false }), shot(MarketShot, { from: [1500, 600], drift: false, focus: 1100 })],
  s44: [shot(HubShot, { labels: {"SHARED HUB": [420, 200, "none"]}, from: [1200, 500], drift: false }), null],
  s45: [shot(chain(BackShot, LightsShot, { labels: { "51M SHOPS": [960, 190, "none"] } }), { labels: "own", from: [960, 540], drift: false }), null],
  s46: [shot(chain(SizeShot, PlugMapShot, {}), { labels: "own", bubble: "own", drift: false }), null],
  s47: [shot(TogetherShot, { drift: false, bubble: "own", focus: 1100 }), null],
  s48: [shot(WireShot, { drift: false, focus: 1100 })],
  thumbA: [ThumbA],
  thumbB: [ThumbB],
  thumbS1: [ThumbS1],
  thumbS2: [ThumbS2],
});
