import fs from "node:fs";
const dir = "hasil/tracks/T01-plumbing-of-money/siklus/001-approved-not-paid/";
const j = JSON.parse(fs.readFileSync(dir + "03-script.json")); const specs = JSON.parse(fs.readFileSync(dir + "04-visual-spec.json"));
// Pemeran tetap siklus ini (dipakai ulang di semua scene)
const A = (id, kind, x, o = {}) => ({ id, kind, x, ...o });
const you = (x, o) => A("you", "you", x, { label: "YOU", ...o });
const owner = (x, o) => A("owner", "owner", x, { label: "SHOP OWNER", ...o });
const term = (x, o) => A("term", "terminal", x, { label: "TERMINAL", ...o });
const card = (x, o) => A("card", "card", x, { label: "CARD", ...o });
const phone = (x, o) => A("phone", "phone", x, { label: "PHONE", ...o });
const acq = (x, o) => A("acq", "bank", x, { label: "ACQUIRER", acc: "glasses", color: "#cfe3f7", ...o });
const net = (x, o) => A("net", "network", x, { label: "NETWORK", acc: "shades", ...o });
const iss = (x, o) => A("iss", "bank-big", x, { label: "ISSUER", acc: "tie", color: "#e6d3a8", ...o });
const vault = (x, o) => A("vault", "vault", x, { label: "CENTRAL BANK", acc: "crown", ...o });
const clerk = (x, o) => A("clerk", "clerk", x, { label: "HOTEL", ...o });
const pilot = (x, o) => A("pilot", "pilot", x, { label: "AIRLINE", ...o });
const say = (text, at = 0.12, o = {}) => ({ text, at, ...o });
const pk = (from, to, label, at, o = {}) => ({ type: "packet", from, to, label, at, dur: 0.14, ...o });
const stamp = (text, tone, at, x = 0.5, y = 0.3) => ({ type: "stamp", text, tone, at, x, y });
const pow = (text, at, x = 0.5, y = 0.3, color) => ({ type: "pow", text, at, x, y, ...(color ? { color } : {}) });
const S = {
  s01: { bg: "cafe", actors: [you(0.2, { emo: "happy", say: say("Approved!", 0.1) }), term(0.5, { emo: "happy" }), owner(0.8, { emo: "neutral", emoAt: [[0.5, "worry"]], say: say("…and my money?", 0.5) })], fx: [stamp("APPROVED", "good", 0.3, 0.5, 0.2), pow("$0.00", 0.62, 0.86, 0.2, "#ff9b8f")] },
  s02: { bg: "paper", insert: { pos: "top" }, actors: [you(0.22, { emo: "shock", say: say("There's MORE?", 0.45) }), owner(0.78, { emo: "smug", say: say("Two more systems.", 0.6) })] },
  s03: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.3, { emo: "think", say: say("Pending? Posted? Gone?", 0.35) }), phone(0.72, { emo: "neutral" })] },
  s04: { bg: "cafe", actors: [card(0.2, { emo: "happy", pose: "point" }), term(0.55, { emo: "happy", say: say("Got both. Thanks.", 0.6) }), you(0.86, { emo: "neutral", scale: 0.9 })], fx: [pk("card", "term", "4111…", 0.12), pk("card", "term", "8F3A…", 0.3, { y: 0.4 })] },
  s05: { bg: "bank", actors: [card(0.22, { emo: "smug", say: say("Replay it tomorrow!", 0.1) }), iss(0.78, { emo: "neutral", emoAt: [[0.45, "angry"]] })], fx: [pk("card", "iss", "8F3A…", 0.3, { dur: 0.16 }), stamp("REJECTED", "bad", 0.55, 0.75, 0.3)] },
  s06: { bg: "paper", insert: { pos: "top" }, actors: [card(0.22, { emo: "smug", say: say("Secret key stays inside.", 0.3) }), iss(0.78, { emo: "happy", say: say("I hold the twin key.", 0.62) })] },
  s07: { bg: "cafe", actors: [phone(0.28, { emo: "smug", say: say("Token, not my card number.", 0.12) }), term(0.72, { emo: "happy" })], fx: [pk("phone", "term", "tok_7Q2", 0.4)] },
  s08: { bg: "street", actors: [A("thief", "friend", 0.28, { label: "THIEF", emo: "smug", say: say("Stolen token!", 0.1) }), term(0.72, { emo: "neutral", emoAt: [[0.55, "angry"]] })], fx: [pk("thief", "term", "tok_7Q2", 0.3), stamp("REJECTED", "bad", 0.58, 0.72, 0.28)] },
  s09: { bg: "cafe", actors: [term(0.22, { emo: "happy", say: say("Hey bank, may I charge this?", 0.1) }), acq(0.76, { emo: "neutral", say: say("I just forward things.", 0.55) })], fx: [pk("term", "acq", "0100", 0.3)] },
  s10: { bg: "bank", actors: [acq(0.15, { scale: 0.9 }), net(0.5, { emo: "smug", say: say("BIN 4111 11… → that bank!", 0.45) }), iss(0.85, { emo: "neutral", scale: 0.9 })], fx: [pk("acq", "net", "0100", 0.1), pk("net", "iss", "0100", 0.62)] },
  s11: { bg: "sky", actors: [acq(0.15, { scale: 0.9 }), net(0.5, { emo: "smug", say: say("I carry messages. Never money.", 0.1) }), iss(0.85, { scale: 0.9 })], fx: [pk("acq", "net", "msg", 0.4), { type: "packet", kind: "coin", from: "acq", to: "net", label: "fee", at: 0.55, dur: 0.14 }, pk("net", "iss", "msg", 0.75)] },
  s12: { bg: "paper", insert: { pos: "right" }, actors: [term(0.2, { emo: "happy", say: say("ISO 8583. Since 1987.", 0.1) })] },
  s13: { bg: "paper", insert: { pos: "right" }, actors: [term(0.2, { emo: "happy", pose: "point", say: say("0100 = may I charge this card?", 0.2) })] },
  s14: { bg: "paper", insert: { pos: "right" }, actors: [term(0.2, { emo: "think", say: say("Card, amount, currency.", 0.2) })] },
  s15: { bg: "bank", actors: [net(0.25, { emo: "neutral" }), iss(0.72, { emo: "shock", say: say("Under one second?!", 0.2) })], fx: [pk("net", "iss", "0100", 0.08), pow("< 1s", 0.45, 0.5, 0.3)] },
  s16: { bg: "bank", insert: { pos: "top" }, actors: [iss(0.5, { emo: "happy", say: say("Real card? Right code? ✓", 0.15, { by: 0.02 }) })] },
  s17: { bg: "bank", insert: { pos: "top" }, actors: [iss(0.3, { emo: "think", say: say("Hmm. Usual shop? Usual hour?", 0.2) }), you(0.74, { emo: "neutral" })] },
  s18: { bg: "bank", insert: { pos: "top" }, actors: [iss(0.3, { emo: "worry", say: say("Abroad? Hmm…", 0.4) }), you(0.74, { emo: "happy", say: say("Holiday!", 0.2) })] },
  s19: { bg: "paper", insert: { pos: "right" }, actors: [iss(0.2, { emo: "happy", scale: 0.95 })], fx: [stamp("APPROVED", "good", 0.5, 0.25, 0.28)] },
  s20: { bg: "paper", insert: { pos: "right" }, actors: [term(0.2, { emo: "happy", say: say("Approval code. Keep it!", 0.3) })] },
  s21: { bg: "paper", insert: { pos: "right" }, actors: [iss(0.2, { emo: "angry", scale: 0.95, say: say("51 or 05. No.", 0.3) })] },
  s22: { bg: "cafe", actors: [you(0.2, { emo: "shock", say: say("Why?!", 0.3) }), term(0.5, { emo: "sad" }), owner(0.8, { emo: "worry", pose: "shrug", say: say("No idea.", 0.55) })], fx: [stamp("DECLINED", "bad", 0.2, 0.5, 0.26)] },
  s23: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.25, { emo: "happy" }), owner(0.75, { emo: "worry", say: say("Zero. Between banks.", 0.4) })] },
  s24: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.3, { emo: "think", say: say("I see $95?", 0.3) }), phone(0.74, { emo: "smug" })] },
  s25: { bg: "none", actors: [phone(0.84, { emo: "smug", scale: 0.9, say: say("Pending and posted are two records.", 0.2) })] },
  s26: { bg: "none", actors: [clerk(0.84, { emo: "smug", scale: 0.9, say: say("We hold a bit extra. Don't mind us.", 0.2) })] },
  s27: { bg: "bank", insert: { pos: "top" }, actors: [clerk(0.25, { emo: "smug", say: say("Just a little hold…", 0.3) }), you(0.75, { emo: "shock" })] },
  s28: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.3, { emo: "happy", say: say("Gone! Good.", 0.65) }), phone(0.74, { emo: "neutral" })] },
  s29: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.3, { emo: "shock", say: say("I bought ONE coffee!", 0.3) }), owner(0.75, { emo: "smug" })] },
  s30: { bg: "bank", actors: [term(0.15, { emo: "worry", say: say("Hello?? Hello??", 0.6) }), net(0.5, { emo: "neutral" }), iss(0.85, { emo: "happy", scale: 0.9 })], fx: [pk("term", "iss", "0100", 0.08, { dur: 0.2 }), pk("iss", 0.45, "0110", 0.32, { dur: 0.12, hold: 0.02 }), pow("LOST", 0.45, 0.45, 0.3), pk("term", "iss", "0100", 0.72, { dur: 0.16 })] },
  s31: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.3, { emo: "shock", say: say("Two holds!", 0.3) }), term(0.74, { emo: "sad" })] },
  s32: { bg: "paper", insert: { pos: "right" }, actors: [term(0.2, { emo: "happy", say: say("Reversal sent. Sorry!", 0.4) })] },
  s33: { bg: "none", actors: [pilot(0.84, { emo: "smug", scale: 0.9, say: say("No signal. The card decides.", 0.2) })] },
  s34: { bg: "sky", actors: [term(0.28, { emo: "happy", say: say("Approved. Offline!", 0.2) }), iss(0.78, { emo: "shock", scale: 0.9, label: "BANK (no signal)", say: say("Hello? Anyone?", 0.55) })] },
  s35: { bg: "sky", actors: [A("plane", "plane", 0.28, { label: "AIRLINE", emo: "happy", scale: 1.1, say: say("Landed! Uploading sales.", 0.1) }), iss(0.78, { emo: "angry", scale: 0.9, say: say("This card is no good!", 0.6) })], fx: [pk("plane", "iss", "sales", 0.35, { dur: 0.18 }), pow("1 BAD CARD", 0.6, 0.55, 0.28, "#ff9b8f")] },
  s36: { bg: "sky", insert: { pos: "top" }, actors: [pilot(0.3, { emo: "think", say: say("Cap the cabin spend.", 0.4) }), you(0.74, { emo: "happy" })] },
  s37: { bg: "cafe", actors: [term(0.2, { emo: "happy", say: say("End of day: one big batch.", 0.15) }), acq(0.78, { emo: "happy" })], fx: [pk("term", "acq", "sale 1", 0.3), pk("term", "acq", "sale 2", 0.42), pk("term", "acq", "sale 3", 0.54)] },
  s38: { bg: "bank", actors: [acq(0.2, { emo: "happy", say: say("Code A1B2C3. Match!", 0.25) }), net(0.5, { scale: 0.9 }), iss(0.8, { emo: "happy", scale: 0.9 })], fx: [pk("acq", "iss", "A1B2C3", 0.1, { dur: 0.2 }), stamp("MATCH", "good", 0.6, 0.5, 0.26)] },
  s39: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.25, { emo: "happy", say: say("Generous tip!", 0.3) }), owner(0.75, { emo: "happy" })] },
  s40: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.25, { emo: "shock", say: say("It says $10.85?!", 0.4) }), phone(0.75, { emo: "smug" })] },
  s41: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.25, { emo: "neutral" }), phone(0.75, { emo: "happy", say: say("Pending → posted.", 0.5) })] },
  s42: { bg: "paper", insert: { pos: "top" }, actors: [term(0.28, { emo: "think", say: say("Two ways to do it.", 0.3) }), owner(0.74, { emo: "think" })] },
  s43: { bg: "paper", insert: { pos: "right" }, actors: [term(0.2, { emo: "happy", say: say("One message: approve + charge.", 0.3) })] },
  s44: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.28, { emo: "happy", say: say("Posts sooner!", 0.3) }), owner(0.75, { emo: "sad", say: say("Still waiting on my money.", 0.6) })] },
  s45: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.25, { emo: "neutral", say: say("−$5 for me.", 0.3) }), owner(0.75, { emo: "sad", say: say("$0.00 for me.", 0.5) })] },
  s46: { bg: "sky", insert: { pos: "top" }, actors: [net(0.5, { emo: "smug", say: say("I net it all out.", 0.5) })] },
  s47: { bg: "sky", insert: { pos: "top" }, actors: [net(0.5, { emo: "happy", say: say("Millions in. A few out.", 0.4) })] },
  s48: { bg: "bank", insert: { pos: "top" }, actors: [iss(0.28, { emo: "shock", say: say("Today's total!", 0.3) }), you(0.74, { emo: "smug", say: say("My $5 is in there. Somewhere.", 0.6) })] },
  s49: { bg: "vault", actors: [iss(0.12, { scale: 0.7, label: "BANK A" }), acq(0.3, { scale: 0.7, label: "BANK B", acc: "none" }), vault(0.7, { emo: "smug", scale: 1.05, say: say("One net amount per bank.", 0.5) })], fx: [pk("iss", "vault", "net", 0.2, { dur: 0.2 }), pk("acq", "vault", "net", 0.3, { dur: 0.2 })] },
  s50: { bg: "cafe", actors: [acq(0.25, { emo: "happy" }), owner(0.75, { emo: "happy" })], fx: [{ type: "packet", kind: "coin", from: "acq", to: "owner", label: "paid", at: 0.45, dur: 0.18 }, pow("1–3 DAYS", 0.15, 0.5, 0.3)] },
  s51: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.25, { emo: "think" }), owner(0.75, { emo: "sad", say: say("Friday sale. Tuesday money.", 0.5) })] },
  s52: { bg: "cafe", insert: { pos: "top" }, actors: [owner(0.5, { emo: "shock", say: say("Where did the rest go?", 0.5) })] },
  s53: { bg: "bank", insert: { pos: "top" }, actors: [owner(0.28, { emo: "think" }), acq(0.76, { emo: "smug", say: say("Some fees. Details later.", 0.55) })] },
  s54: { bg: "bank", actors: [owner(0.1, { scale: 0.8, emo: "worry" }), acq(0.3, { scale: 0.8 }), net(0.5, { scale: 0.8 }), iss(0.7, { scale: 0.8 }), you(0.9, { scale: 0.8, emo: "happy", say: say("I dispute that charge!", 0.1) })], fx: [{ type: "packet", kind: "coin", from: "owner", to: "acq", label: "back", at: 0.3, dur: 0.1 }, { type: "packet", kind: "coin", from: "acq", to: "net", at: 0.45, dur: 0.1 }, { type: "packet", kind: "coin", from: "net", to: "iss", at: 0.58, dur: 0.1 }, { type: "packet", kind: "coin", from: "iss", to: "you", at: 0.7, dur: 0.1 }] },
  s55: { bg: "paper", insert: { pos: "right" }, actors: [owner(0.2, { emo: "worry", say: say("I have the approval code!", 0.4) })] },
  s56: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.28, { emo: "happy" }), owner(0.75, { emo: "neutral", say: say("Refund sent. Give it days.", 0.5) })] },
  s57: { bg: "cafe", insert: { pos: "top" }, actors: [you(0.2, { emo: "happy", say: say("Promise. Bill. Money.", 0.4) }), term(0.5, { emo: "happy" }), owner(0.8, { emo: "happy" })] },
  s58: { bg: "night", insert: { pos: "top" }, actors: [you(0.3, { emo: "happy", say: say("Who takes a cut?", 0.4) }), owner(0.7, { emo: "smug", say: say("I wonder…", 0.6) })], fx: [{ type: "coins", at: 0.1, n: 12 }] },
};
// kamera bervariasi + skala aktor lebih kecil bila papan di atas
const ids = j.scenes.map((s) => s.id); const out = {};
ids.forEach((id, i) => {
  const s = S[id]; if (!s) throw new Error("tanpa adegan: " + id);
  const top = s.insert && s.insert.pos === "top";
  s.actors = s.actors.map((a) => ({ ...a, scale: a.scale ?? (top ? 0.7 : 1), ...(a.say ? {} : {}) }));
  s.cam = [{ z: [1, 1.08] }, { z: [1.08, 1] }, { z: [1.02, 1.02], x: [-0.012, 0.012] }][i % 3];
  if (s.insert && !specs[id]) throw new Error("insert tanpa spec: " + id);
  out[id] = s;
});
fs.writeFileSync(dir + "04-stage.base.json", JSON.stringify(out, null, 2) + "\n"); console.log(Object.keys(out).length, "adegan");
