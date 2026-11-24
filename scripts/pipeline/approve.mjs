// Persetujuan kreator -> publish. Alat publish BELUM dipilih: bagian kirim sengaja berhenti di adaptor kosong.
import fs from "node:fs"; import path from "node:path"; import readline from "node:readline";
import { ROOT, args, resolveCycle, readJson, writeJson } from "./../produksi/lib.mjs";
const o = args(); const { dir, cycleId } = resolveCycle(o.track, o.siklus); const qa = readJson(path.join(dir, "05-qa.auto.json"), null);
const state = readJson(path.join(dir, ".pipeline.json"), { log: [] });
if (o.revisi) { state.log.push({ tahap: "revisi", catatan: o.revisi, waktu: new Date().toISOString() }); writeJson(path.join(dir, ".pipeline.json"), state); console.log("Catatan revisi disimpan. Jalankan 'lanjut " + o.track + "' di sesi Claude Code untuk memperbaiki."); process.exit(0); }
if (!qa) { console.log("QA otomatis belum dijalankan."); process.exit(1); }
if (qa.verdict === "GAGAL") { console.log("QA GAGAL: tidak bisa disetujui. Perbaiki temuan kritis dulu."); process.exit(2); }
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question(`Anda sudah menonton, mendengarkan audio, dan memeriksa fakta untuk ${o.track}/${cycleId}? Ketik SETUJU untuk menyetujui publish: `, (a) => {
  rl.close(); if (a.trim() !== "SETUJU") { console.log("Dibatalkan."); process.exit(1); }
  state.log.push({ tahap: "disetujui", waktu: new Date().toISOString() }); writeJson(path.join(dir, ".pipeline.json"), state);
  const adapter = path.join(ROOT, "scripts/pipeline/publish.mjs");
  if (!fs.existsSync(adapter)) { console.log("Disetujui dan dicatat, tetapi adaptor publish tidak ada."); process.exit(0); }
  import(adapter).then((m) => m.publish({ track: o.track, siklus: o.siklus, dir })).catch((e) => { console.error("PUBLISH GAGAL:", e.message); process.exit(1); });
});
