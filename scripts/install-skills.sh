#!/usr/bin/env bash
# Salin skill dari skills/ ke folder yang dibaca masing-masing agent.
# Pemakaian: bash scripts/install-skills.sh            (project-level, default)
#            bash scripts/install-skills.sh --global   (ke folder home masing-masing agent)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/skills"

if [[ "${1:-}" == "--global" ]]; then
  TARGETS=("$HOME/.claude/skills" "$HOME/.codex/skills" "$HOME/.agents/skills" "$HOME/.gemini/skills" "$HOME/.copilot/skills")
else
  TARGETS=("$ROOT/.claude/skills" "$ROOT/.agents/skills" "$ROOT/.github/skills" "$ROOT/.gemini/skills")
fi

for target in "${TARGETS[@]}"; do
  mkdir -p "$target"
  for skill in "$SRC"/*/; do
    name="$(basename "$skill")"
    [[ -f "$skill/SKILL.md" ]] || continue
    rm -rf "${target:?}/$name"
    cp -R "$skill" "$target/$name"
  done
  echo "OK  $target"
done

echo "Selesai. Jalankan ulang skrip ini setiap kali isi skills/ berubah."
