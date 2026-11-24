#!/usr/bin/env python3
"""Validasi ringan Video Content Kit, tanpa dependensi.

Pemakaian:
    python3 scripts/check_kit.py                  # cek struktur kit, STATE portfolio, semua TRACK.md
    python3 scripts/check_kit.py hasil/tracks/<ID>/siklus/001-x/03-script.json   # cek satu script.json
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
        "AGENTS.md", "hasil/STATE.md", "hasil/learnings-global.md",
        "instruksi/referensi/aturan-platform.md", "instruksi/templates/script.schema.json",
        "instruksi/templates/track.md", "instruksi/templates/validasi-rencana.md",
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


TAHAP = {"usulan", "validasi", "aktif", "jeda", "drop"}


def frontmatter(path: Path) -> str | None:
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        err(f"{path.relative_to(ROOT)}: frontmatter tidak ada")
        return None
    return m.group(1)


def value(fm: str, key: str) -> str | None:
    m = re.search(rf"^{key}:\s*(.*?)(\s+#.*)?$", fm, re.M)
    if not m:
        return None
    return m.group(1).strip().strip('"')


def as_int(v: str | None) -> int | None:
    try:
        return int(v) if v not in (None, "", "null") else None
    except ValueError:
        return None


def check_state() -> None:
    path = ROOT / "hasil/STATE.md"
    if not path.exists():
        return
    fm = frontmatter(path)
    if fm is None:
        return
    for key in ["mode_gate", "kapasitas_jam_per_minggu", "batas_track_aktif", "batas_track_validasi",
                "track_fokus", "langkah_berikutnya", "menunggu_keputusan"]:
        if value(fm, key) is None:
            err(f"hasil/STATE.md: key '{key}' tidak ada")
    state_text = path.read_text(encoding="utf-8")

    tracks = sorted((ROOT / "hasil/tracks").glob("*/TRACK.md"))
    ids, count, jam = set(), {"aktif": 0, "validasi": 0}, 0
    for tp in tracks:
        rel = tp.relative_to(ROOT)
        tfm = frontmatter(tp)
        if tfm is None:
            continue
        tid = value(tfm, "id") or ""
        if not re.fullmatch(r"T\d{2}", tid):
            err(f"{rel}: id '{tid}' tidak valid (format T01)")
        if not tp.parent.name.startswith(tid + "-"):
            err(f"{rel}: nama folder harus diawali '{tid}-'")
        if tid in ids:
            err(f"{rel}: id {tid} dipakai lebih dari sekali")
        ids.add(tid)
        tahap = value(tfm, "tahap")
        if tahap not in TAHAP:
            err(f"{rel}: tahap '{tahap}' tidak dikenal")
        for key in ["niche", "sudut", "channel", "langkah_berikutnya", "menunggu_keputusan", "siklus_aktif"]:
            if value(tfm, key) is None:
                err(f"{rel}: key '{key}' tidak ada")
        if f"| {tid} " not in state_text:
            err(f"{rel}: {tid} belum tercatat di tabel Track pada STATE.md")
        siklus = value(tfm, "siklus_aktif")
        if siklus not in (None, "null", "") and not (tp.parent / "siklus" / siklus).is_dir():
            err(f"{rel}: folder siklus '{siklus}' tidak ditemukan")
        if tahap in ("validasi", "aktif"):
            count[tahap] += 1
            jam += as_int(value(tfm, "jam_per_minggu")) or 0
            for f in ["backlog.md", "learnings.md"]:
                if not (tp.parent / f).exists():
                    err(f"{rel}: {f} belum dibuat untuk track {tahap}")
        if tahap == "aktif" and not (tp.parent / "validasi" / "hasil.md").exists() \
                and "validasi-dilewati" not in tp.read_text(encoding="utf-8"):
            err(f"{rel}: tahap aktif tanpa validasi/hasil.md (tulis 'validasi-dilewati' + alasan di Keputusan bila sengaja)")

    fokus = value(fm, "track_fokus")
    if fokus not in (None, "null", "") and fokus not in ids:
        err(f"hasil/STATE.md: track_fokus '{fokus}' tidak ada di hasil/tracks/")
    for tahap, key in (("aktif", "batas_track_aktif"), ("validasi", "batas_track_validasi")):
        batas = as_int(value(fm, key))
        if batas is not None and count[tahap] > batas:
            err(f"hasil/STATE.md: {count[tahap]} track {tahap}, melebihi {key}={batas}")
    kapasitas = as_int(value(fm, "kapasitas_jam_per_minggu"))
    if kapasitas is not None and jam > kapasitas:
        err(f"hasil/STATE.md: total jam track aktif+validasi {jam}, melebihi kapasitas {kapasitas}")


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
