#!/bin/bash
# Render satu siklus sampai selesai: master, semua Shorts, thumbnail, campur musik, QA otomatis. Satu render per waktu.
# Pemakaian: bash scripts/produksi/render-semua.sh T02 002   (berhenti bila lewat tenggat BATAS, bawaan 05:45)
set -uo pipefail
cd "$(dirname "$0")/../.."
T=$1; S=$2
LOG=produksi/render/.log-$T-$S.txt
rm -f produksi/render/$T/$S/Master16x9-en.mp4
node scripts/produksi/render.mjs --track $T --siklus $S --comp Master16x9 --lang en > $LOG 2>&1 || { echo "render master keluar dengan kode $?"; grep -vE 'THREE\.|Rendered [0-9]|Encoded [0-9]|^ *at ' $LOG | grep -iE -m15 'error|fail|crash|timeout|memory|rendering frame'; }
[ -f produksi/render/$T/$S/Master16x9-en.mp4 ] || { echo "MASTER GAGAL"; exit 1; }
for c in $(node -e 'const fs=require("fs"),p=require("path");const t=fs.readdirSync("hasil/tracks").find(d=>d.startsWith(process.argv[1]+"-"));const b=p.join("hasil/tracks",t,"siklus");const d=fs.readdirSync(b).find(d=>d.startsWith(process.argv[2]));console.log((JSON.parse(fs.readFileSync(p.join(b,d,"03-script.json"))).shorts_cuts||[]).map(c=>c.name).join(" "))' $T $S); do
  node scripts/produksi/render.mjs --track $T --siklus $S --comp Short9x16 --lang en --cut $c 2>&1 | grep -E '^render|rror' | tail -3
done
node scripts/produksi/render.mjs --track $T --siklus $S --thumb 2>&1 | tail -6
node scripts/produksi/mix.mjs --track $T --siklus $S 2>&1 | tail -6
node scripts/pipeline/qa.mjs --track $T --siklus $S 2>&1 | tail -15
echo "SELESAI $T $S $(date +%H:%M)"
