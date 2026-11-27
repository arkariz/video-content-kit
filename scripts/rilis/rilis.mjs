// Alat rilis dari terminal (isi yang sama dengan dashboard).
//   node scripts/rilis/rilis.mjs plan   --track T01 --siklus 006
//   node scripts/rilis/rilis.mjs cek    --track T01 --siklus 006          (rencana, masalah, tugas manual)
//   node scripts/rilis/rilis.mjs setuju --track T01 --siklus 006          (kreator mengetik SETUJU)
//   node --env-file=.env scripts/rilis/rilis.mjs kirim --track T01 --siklus 006 [--uji]
//   node --env-file=.env scripts/rilis/rilis.mjs pasca --track T01 --siklus 006
//   node --env-file=.env scripts/rilis/rilis.mjs reset --track T01 --siklus 006   (lupakan video yang sudah dihapus di Studio)
import readline from "node:readline/promises";
import { args } from "../produksi/lib.mjs";
import { buatRencana, cari, checklist, disetujui, masalah, muat, qaManual, setujui } from "./inti.mjs";
import { kirim, lupakanTerhapus, pascaTayang, terapkanJadwal } from "./youtube.mjs";

try {
  const o = args(); const c = cari(o.track, o.siklus); const cmd = o._[0];
  const ringkas = (r) => {
    console.log(`${c.track}/${c.nama} -> ${c.channel || "(channel belum diisi di TRACK.md)"}`);
    for (const i of r.items) console.log(`  ${i.nama}: "${i.judul}" | ${i.jadwal ? i.jadwal.replace("T", " ") + " WIB" : "tayang segera"} | komentar: ${i.komentar ? "ada" : "kosong"} | ${r.hasil[i.nama]?.youtube?.url ?? "belum di YouTube"}`);
    if (r.kunci_manual) console.log(`Unggah dikunci: ${r.kunci_manual}`);
    console.log(`QA manual: ${qaManual(c)}`);
    const m = masalah(c, r); console.log(m.length ? `Masalah:\n  - ${m.join("\n  - ")}` : "Tidak ada masalah."); console.log(disetujui(r) ? "Status: disetujui." : "Status: belum disetujui.");
  };
  if (cmd === "plan") { ringkas(buatRencana(c)); console.log(`Ditulis: ${c.rel}/06-rilis.json`); }
  else {
    const r = muat(c); if (!r) throw new Error("rencana belum dibuat (jalankan: plan)");
    if (cmd === "cek") { ringkas(r); for (const t of checklist(c, r)) console.log(`  [${t.selesai ? "x" : " "}] ${t.item}: ${t.label}`); }
    else if (cmd === "setuju") {
      ringkas(r);
      if (!process.stdin.isTTY) throw new Error("persetujuan hanya bisa diketik kreator di terminal");
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const a = await rl.question("Anda sudah menonton, mendengarkan, dan memeriksa fakta? Ketik SETUJU: "); rl.close();
      setujui(c, a.trim(), "terminal"); console.log("Disetujui.");
    } else if (cmd === "kirim") await kirim(c, { uji: !!o.uji });
    else if (cmd === "pasca") await pascaTayang(c);
    else if (cmd === "reset") await lupakanTerhapus(c);
    else if (cmd === "jadwal") await terapkanJadwal(c);
    else throw new Error("perintah: plan | cek | setuju | kirim | pasca | jadwal | reset");
  }
} catch (e) { console.error("GAGAL:", e.message); process.exit(1); }
