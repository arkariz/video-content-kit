#!/usr/bin/env python3
"""Validasi ringan Video Content Kit, tanpa dependensi.

Pemakaian:
    python3 scripts/check_kit.py                  # cek struktur kit + STATE
    python3 scripts/check_kit.py hasil/siklus/001-x/03-script.json   # cek satu script.json
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
errors: list[str] = []


def err(msg: str) -> None:
    errors.append(msg)


def check_structure() -> None:
    required = [
        "AGENTS.md", "hasil/STATE.md", "hasil/learnings.md", "hasil/backlog.md",
        "instruksi/referensi/aturan-platform.md", "instruksi/templates/script.schema.json",
    ]
    for rel in required:
        if not (ROOT / rel).exists():
            err(f"File wajib tidak ada: {rel}")
    for skill in (ROOT / "skills").glob("*/SKILL.md"):
        text = skill.read_text(encoding="utf-8")
        m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
        if not m:
            err(f"{skill.relative_to(ROOT)}: frontmatter tidak ada")
            continue
        fm = m.group(1)
        name = re.search(r"^name:\s*(\S+)", fm, re.M)
        if not name:
            err(f"{skill.relative_to(ROOT)}: field 'name' tidak ada")
        elif name.group(1) != skill.parent.name:
            err(f"{skill.relative_to(ROOT)}: name '{name.group(1)}' beda dengan nama folder")
        if not re.search(r"^description:", fm, re.M):
            err(f"{skill.relative_to(ROOT)}: field 'description' tidak ada")


def check_state() -> None:
    path = ROOT / "hasil/STATE.md"
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        err("hasil/STATE.md: frontmatter tidak ada")
        return
    fm = m.group(1)
    for key in ["fase", "niche", "mode_gate", "siklus_aktif", "langkah_berikutnya", "menunggu_keputusan"]:
        if not re.search(rf"^{key}:", fm, re.M):
            err(f"hasil/STATE.md: key '{key}' tidak ada")
    fase = re.search(r"^fase:\s*(\S+)", fm, re.M)
    niche = re.search(r"^niche:\s*(.+?)(\s+#.*)?$", fm, re.M)
    if fase and fase.group(1) == "siklus" and niche and niche.group(1).strip() in ("null", "", '""'):
        err("hasil/STATE.md: fase 'siklus' tapi niche masih kosong")
    siklus = re.search(r"^siklus_aktif:\s*(\S+)", fm, re.M)
    if siklus and siklus.group(1) not in ("null",) and not (ROOT / "hasil/siklus" / siklus.group(1)).is_dir():
        err(f"hasil/STATE.md: folder siklus '{siklus.group(1)}' tidak ditemukan")


def check_script(path: Path) -> None:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        err(f"{path}: JSON tidak valid ({e})")
        return
    for key in ["cycle", "title_options", "promise", "creator_evidence", "scenes", "shorts_cuts"]:
        if key not in data:
            err(f"{path}: key wajib '{key}' tidak ada")
    if len(data.get("title_options", [])) != 3:
        err(f"{path}: title_options harus 3")
    if not data.get("creator_evidence"):
        err(f"{path}: creator_evidence kosong (konten tanpa bukti kreator = slop)")
    scenes = data.get("scenes", [])
    ids = {s.get("id") for s in scenes}
    if scenes and scenes[0].get("role") != "hook":
        err(f"{path}: scene pertama harus role 'hook'")
    for s in scenes:
        if not re.fullmatch(r"s\d{2}", str(s.get("id", ""))):
            err(f"{path}: id scene tidak valid: {s.get('id')}")
        if not s.get("narration", {}).get("en"):
            err(f"{path}: scene {s.get('id')} tanpa narasi EN")
    for ev in data.get("creator_evidence", []):
        if ev.get("scene_id") not in ids:
            err(f"{path}: creator_evidence merujuk scene yang tidak ada: {ev.get('scene_id')}")
    for cut in data.get("shorts_cuts", []):
        for sid in cut.get("scene_ids", []):
            if sid not in ids:
                err(f"{path}: shorts_cut '{cut.get('name')}' merujuk scene yang tidak ada: {sid}")
    broll = [s for s in scenes if s.get("visual", {}).get("type") == "broll"]
    if scenes and len(broll) / len(scenes) > 0.4:
        err(f"{path}: {len(broll)}/{len(scenes)} scene berupa B-roll (batas sekitar sepertiga)")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        for arg in sys.argv[1:]:
            check_script(Path(arg))
    else:
        check_structure()
        check_state()
    if errors:
        print("GAGAL")
        for e in errors:
            print(" -", e)
        sys.exit(1)
    print("OK")
