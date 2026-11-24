// Kosakata yang dikenali mesin visual (sumber tunggal untuk validasi). Tambah di sini DAN di komponen saat menambah item baru.
export const VOCAB = {
  actors: ["you", "owner", "clerk", "pilot", "friend", "terminal", "bank", "bank-big", "network", "phone", "card", "vault", "plane"],
  bg: ["cafe", "street", "bank", "sky", "night", "vault", "paper", "none"],
  emo: ["neutral", "happy", "shock", "angry", "smug", "sad", "think", "worry", "dead"],
  pose: ["down", "up", "point", "shrug", "hold"],
  from: ["pop", "left", "right", "drop"],
  acc: ["glasses", "tie", "shades", "crown", "none"],
  fx: ["packet", "stamp", "pow", "coins"],
  packetKind: ["msg", "coin", "card"],
  insertPos: ["top", "left", "right", "full"],
  tone: ["good", "bad", "hot", "say", "shout", "think"],
  spec: { // kind -> bidang wajib
    flow: ["nodes"], lanes: ["lanes"], timeline: ["blocks"], rows: ["rows"], checks: ["items"], gauge: ["zones"], stamp: ["stamp"], hub: ["items", "hub"],
    code: ["lines"], stats: ["items"], counter: ["values"], bars: ["bars"], netting: ["banks", "gross", "net"], collapse: ["from", "to"], bignum: ["total"], breakdown: ["total", "parts"],
  },
};
