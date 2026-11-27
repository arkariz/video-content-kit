#!/bin/zsh
# Klik dua kali untuk membuka dashboard rilis. Biarkan jendela ini terbuka, atau aktifkan
# "Jalankan otomatis saat login" di dashboard supaya tidak perlu file ini lagi.
cd "$(dirname "$0")" || exit 1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
URL="http://127.0.0.1:4747"
if curl -s -o /dev/null --max-time 2 "$URL"; then open "$URL"; exit 0; fi
command -v node >/dev/null || { echo "Node tidak ditemukan."; read -k1; exit 1; }
(for n in {1..40}; do sleep 0.5; curl -s -o /dev/null --max-time 1 "$URL" && { open "$URL"; break; }; done) &
exec node --env-file-if-exists=.env scripts/rilis/dashboard.mjs
