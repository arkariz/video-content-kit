// Menghubungkan channel YouTube milik satu track lewat OAuth 2.0 (hanya baca). Dijalankan kreator sendiri.
//   node --env-file=.env scripts/youtube/auth.mjs --track T02
//   node --env-file=.env scripts/youtube/auth.mjs --track T02 --tulis   (izin unggah dan komentar untuk scripts/rilis, token terpisah)
//   node --env-file=.env scripts/youtube/auth.mjs --cek        (status kredensial dan channel tiap track)
// Tiap track punya token sendiri, jadi akun/channel boleh berbeda; ulangi perintah pertama per track.
// Alur loopback + PKCE: buka tautan yang dicetak, pilih akun/channel, setujui, lalu konfirmasi di terminal.
// Refresh token disimpan ke .env sebagai YOUTUBE_REFRESH_TOKEN_<ID> (tidak pernah dicetak), bersama YOUTUBE_CHANNEL_ID_<ID>.
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import crypto from "node:crypto"; import readline from "node:readline/promises";
import { ROOT } from "../produksi/lib.mjs";
import { reachJob } from "./reach.mjs";
import { publishVar } from "../rilis/youtube.mjs";
import { SCOPES, SCOPES_TULIS, accessToken, channelVar, data, oauthClient, opts, tokenRequest, tokenVar, trackOf, tracks } from "./lib.mjs";

const { o } = opts();
if (o.cek) {
  const sumber = (nama, id) => (process.env[`${nama}_${id}`] ? "khusus track" : process.env[nama] ? "bersama" : "kosong");
  for (const t of tracks()) {
    let status = "belum dihubungkan";
    if (process.env[tokenVar(t.id)]) {
      try { const c = (await data("channels", { part: "snippet", mine: "true" }, { token: await accessToken(t.id) })).items?.[0]; status = c ? `channel "${c.snippet.title}" (${c.snippet.customUrl ?? c.id})` : "token tanpa channel"; }
      catch (e) { status = `GAGAL: ${e.message}`; }
    }
    console.log(`${t.id}  API key: ${sumber("YOUTUBE_API_KEY", t.id)} | OAuth client: ${sumber("YOUTUBE_CLIENT_ID", t.id)} | ${status} | izin tulis: ${process.env[publishVar(t.id)] ? "ada" : "belum"} | TRACK.md: ${t.channel ?? "-"}`);
  }
  process.exit(0);
}
if (typeof o.track !== "string") throw new Error("Wajib: --track T02 (atau --cek)");
const track = trackOf(o.track); const tulis = !!o.tulis; const izin = tulis ? SCOPES_TULIS : SCOPES; const envFile = path.resolve(ROOT, typeof o.env === "string" ? o.env : ".env");
const { client_id, client_secret } = oauthClient(track.id);
const verifier = crypto.randomBytes(48).toString("base64url"), state = crypto.randomBytes(16).toString("base64url");

const { code, redirect_uri } = await new Promise((resolve, reject) => {
  let redirect;
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, redirect);
    if (u.pathname !== "/" || u.searchParams.get("state") !== state) { res.writeHead(404).end(); return; }
    const c = u.searchParams.get("code");
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", Connection: "close" }).end(c ? "Izin diterima. Kembali ke terminal." : "Izin ditolak. Kembali ke terminal.");
    clearTimeout(batas); server.close();
    c ? resolve({ code: c, redirect_uri: redirect }) : reject(new Error(`Izin ditolak: ${u.searchParams.get("error")}`));
  });
  const batas = setTimeout(() => { server.close(); reject(new Error("Tidak ada jawaban dalam 5 menit; jalankan ulang")); }, 300_000);
  server.listen(0, "127.0.0.1", () => {
    redirect = `http://127.0.0.1:${server.address().port}`;
    const q = new URLSearchParams({ client_id, redirect_uri: redirect, response_type: "code", scope: izin.join(" "), access_type: "offline", prompt: "consent select_account", state, code_challenge: crypto.createHash("sha256").update(verifier).digest("base64url"), code_challenge_method: "S256" });
    console.log(`\nHubungkan channel untuk ${track.id} (TRACK.md: ${track.channel ?? "channel belum diisi"}).\nBuka tautan ini di browser:\n\nhttps://accounts.google.com/o/oauth2/v2/auth?${q}\n\nMenunggu izin...`);
  });
});

const tok = await tokenRequest({ client_id, client_secret, code, code_verifier: verifier, grant_type: "authorization_code", redirect_uri });
if (!tok.refresh_token) throw new Error("Google tidak mengirim refresh token; cabut akses aplikasi di myaccount.google.com/permissions lalu ulangi");
const kurang = izin.filter((s) => !(tok.scope ?? "").split(" ").includes(s));
if (kurang.length) throw new Error(`Izin belum lengkap, centang semua kotak saat menyetujui. Kurang: ${kurang.join(", ")}`);
const channel = (await data("channels", { part: "snippet", mine: "true" }, { token: tok.access_token })).items?.[0];
if (!channel) throw new Error("Akun ini tidak punya channel YouTube; ulangi dan pilih channel yang benar");

if (tulis && process.env[channelVar(track.id)] && process.env[channelVar(track.id)] !== channel.id) throw new Error(`Channel "${channel.snippet.title}" berbeda dari channel ${track.id} yang sudah terhubung; pilih channel yang sama`);

const sama = tracks().filter((t) => t.id !== track.id && process.env[channelVar(t.id)] === channel.id);
if (sama.length) console.log(`\nPERHATIAN: channel ini sudah dipakai ${sama.map((t) => t.id).join(", ")}. Niche berbeda harus channel berbeda; lanjutkan hanya bila track-nya seniche.`);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const jawab = (await rl.question(`\nTersambung ke channel "${channel.snippet.title}" (${channel.snippet.customUrl ?? channel.id}).\nSimpan untuk ${track.id}? Ketik ya: `)).trim().toLowerCase(); rl.close();
if (jawab !== "ya") { console.log("Dibatalkan, tidak ada yang disimpan."); process.exit(1); }

// Ganti baris variabel track ini saja; baris .env lain tidak disentuh.
let isi = fs.existsSync(envFile) ? fs.readFileSync(envFile, "utf8") : "";
const namaToken = tulis ? publishVar(track.id) : tokenVar(track.id);
for (const [nama, nilai] of [[namaToken, tok.refresh_token], [channelVar(track.id), channel.id]]) {
  const pola = new RegExp(`^[ \\t]*(export[ \\t]+)?${nama}=.*$`, "m"), baris = `${nama}=${nilai}`;
  isi = pola.test(isi) ? isi.replace(pola, () => baris) : `${isi}${isi && !isi.endsWith("\n") ? "\n" : ""}${baris}\n`;
}
const tmp = `${envFile}.tmp-${process.pid}`; fs.writeFileSync(tmp, isi, { mode: 0o600 }); fs.renameSync(tmp, envFile);
console.log(`Disimpan: ${namaToken} dan ${channelVar(track.id)} di ${path.relative(ROOT, envFile)}.`);
if (tulis) process.exit(0);
// Dipasang sedini mungkin: data CTR hanya tersedia mulai 30 hari sebelum job dibuat.
try { console.log((await reachJob(tok.access_token)).baru ? "Job laporan CTR dibuat; data pertama sekitar 48 jam lagi." : "Job laporan CTR sudah ada."); }
catch (e) { console.log(`Job laporan CTR belum bisa dibuat (aktifkan YouTube Reporting API; analitik.mjs akan mencoba lagi): ${e.message}`); }
