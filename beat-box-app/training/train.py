#!/usr/bin/env python3
"""Measure and train the beatbox drum classifiers against the AVP dataset.

    python3 -I train.py data/avp/AVP_Dataset            # full report + writes the model
    python3 -I train.py data/avp/AVP_Dataset --onsets   # onset detection report only (fast)

Every number comes from running the shipping CLI (../cli/neuralnote_drums) on
the dataset audio through the same ffmpeg conversion the web app uses, so the
features a model is trained on are exactly the features it will see.

Dataset: Amateur Vocal Percussion (AVP), CC BY 4.0, https://zenodo.org/records/5036529
Annotation rows: onset_seconds,label[,onset_phoneme,coda_phoneme]; labels kd sd hhc hho.
"""
import argparse
import json
import math
import os
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
LABEL_NOTE = {"kd": 36, "sd": 38, "hhc": 42, "hho": 46}
NOTES = [36, 38, 42, 46]
NAMES = {36: "kick", 38: "snare", 42: "hat-closed", 46: "hat-open"}
MATCH_WINDOW = 0.050  # seconds: a detection this close to an annotation is that hit
TEACH_SECONDS = 5.0   # the web app's teach clip length


def read_annotations(csv_path):
    """[(onset_seconds, note)] — tolerant of CRLF, stray spaces, missing final newline."""
    rows = []
    for line in csv_path.read_text(errors="replace").splitlines():
        parts = [p.strip() for p in line.split(",")]
        if len(parts) >= 2 and parts[1] in LABEL_NOTE:
            rows.append((float(parts[0]), LABEL_NOTE[parts[1]]))
    return sorted(rows)


def run_cli(cli, wav, extra=(), seconds=None):
    """ffmpeg to 22050 Hz mono (as the server does), then the CLI's JSON result."""
    with tempfile.TemporaryDirectory() as tmp:
        converted = os.path.join(tmp, "in.wav")
        cut = ["-t", str(seconds)] if seconds else []
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(wav), *cut, "-ar", "22050", "-ac", "1",
                        "-sample_fmt", "s16", converted], check=True)
        out = subprocess.run([str(cli), "-i", converted, "--json", *extra], check=True, capture_output=True, text=True)
    return json.loads(out.stdout)


def match(annotations, hits):
    """One-to-one nearest matching within MATCH_WINDOW.
    Returns (pairs [(annotation_index, hit_index)], offsets_seconds)."""
    candidates = sorted(
        (abs(h["time"] - a[0]), ai, hi)
        for ai, a in enumerate(annotations) for hi, h in enumerate(hits)
        if abs(h["time"] - a[0]) <= MATCH_WINDOW)
    used_a, used_h, pairs = set(), set(), []
    for _, ai, hi in candidates:
        if ai not in used_a and hi not in used_h:
            used_a.add(ai); used_h.add(hi); pairs.append((ai, hi))
    return pairs, [hits[hi]["time"] - annotations[ai][0] for ai, hi in pairs]


def load_dataset(root, cli):
    """One record per recording, with annotations and the CLI's detections."""
    jobs = []
    for csv_path in sorted(root.glob("*/Participant_*/*.csv")):
        wav = csv_path.with_suffix(".wav")
        if wav.exists():
            jobs.append((csv_path, wav))

    def work(job):
        csv_path, wav = job
        participant = int(csv_path.parent.name.split("_")[1])
        _, kind, modality = csv_path.stem.split("_")  # P8_Kick_Personal
        result = run_cli(cli, wav)
        annotations = read_annotations(csv_path)
        pairs, offsets = match(annotations, result["hits"])
        return {"participant": participant, "kind": kind, "modality": modality, "wav": wav,
                "annotations": annotations, "hits": result["hits"], "pairs": pairs, "offsets": offsets}

    with ThreadPoolExecutor(max_workers=os.cpu_count()) as pool:
        return list(pool.map(work, jobs))


def onset_report(records):
    print("\n== Onset detection (one-to-one match within +/-50 ms) ==")

    def line(label, recs):
        truth = sum(len(r["annotations"]) for r in recs)
        found = sum(len(r["hits"]) for r in recs)
        hit = sum(len(r["pairs"]) for r in recs)
        recall, precision = hit / max(truth, 1), hit / max(found, 1)
        f1 = 2 * recall * precision / max(recall + precision, 1e-9)
        print(f"  {label:26s} annotated={truth:5d} detected={found:5d}  recall={recall:.3f} precision={precision:.3f} F1={f1:.3f}")
        return f1

    f1 = line("all recordings", records)
    line("isolated repeats", [r for r in records if r["kind"] != "Improvisation"])
    line("improvisations (real beats)", [r for r in records if r["kind"] == "Improvisation"])
    for note in NOTES:
        truth = sum(1 for r in records for a in r["annotations"] if a[1] == note)
        hit = sum(1 for r in records for ai, _ in r["pairs"] if r["annotations"][ai][1] == note)
        print(f"  recall {NAMES[note]:11s} {hit / max(truth, 1):.3f}  ({hit}/{truth})")
    offsets = np.array([o for r in records for o in r["offsets"]]) * 1000
    print(f"  detector - annotation offset: mean {offsets.mean():+.1f} ms, std {offsets.std():.1f} ms, "
          f"p5 {np.percentile(offsets, 5):+.0f} ms, p95 {np.percentile(offsets, 95):+.0f} ms")
    return f1


def labeled_rows(records):
    """Matched hits as arrays: features, true note, classic note, participant, is_improvisation, modality."""
    X, y, classic, groups, improv, personal = [], [], [], [], [], []
    for r in records:
        for ai, hi in r["pairs"]:
            X.append(r["hits"][hi]["features"]); y.append(r["annotations"][ai][1])
            classic.append(r["hits"][hi]["note"]); groups.append(r["participant"])
            improv.append(r["kind"] == "Improvisation"); personal.append(r["modality"] == "Personal")
    return (np.array(X, dtype=np.float64), np.array(y), np.array(classic), np.array(groups),
            np.array(improv), np.array(personal))


def accuracy_table(title, y, pred, masks):
    print(f"  {title}")
    for name, mask in masks.items():
        print(f"    {name:28s} {np.mean(pred[mask] == y[mask]):.3f}  (n={mask.sum()})")


def confusion(y, pred):
    print("    rows = true, cols = predicted   " + "  ".join(f"{NAMES[n][:6]:>6s}" for n in NOTES))
    for t in NOTES:
        counts = [int(np.sum((y == t) & (pred == p))) for p in NOTES]
        print(f"    {NAMES[t]:30s}  " + "  ".join(f"{c:6d}" for c in counts))


def classic_rule(X, low=0.25, zcr_lo=0.09, zcr_hi=0.35, high=0.25, dur_ms=120.0):
    """classifyOnset() from the CLI, vectorised, for the threshold search only.
    Defaults mirror the shipped constants; the report prints both answers and they must agree.
    X columns: lowRatio, highRatio, zcr, log10(durationMs), ..."""
    low_ratio, high_ratio, zcr, dur = X[:, 0], X[:, 1], X[:, 2], 10 ** X[:, 3]
    kick = (low_ratio > low) | (zcr < zcr_lo)
    hat = (zcr > zcr_hi) | (high_ratio > high)
    return np.where(kick, 36, np.where(hat, np.where(dur > dur_ms, 46, 42), 38))


def fit_mlp(X, y, seed=0):
    from sklearn.neural_network import MLPClassifier
    mean, std = X.mean(axis=0), X.std(axis=0) + 1e-9
    model = MLPClassifier(hidden_layer_sizes=(24,), activation="relu", alpha=1e-3, max_iter=800, random_state=seed)
    model.fit((X - mean) / std, y)
    return model, mean, std


def export_model(path, model, mean, std, feature_version):
    """Weights as rows-per-output-unit so the C++ forward pass is a plain loop."""
    layers = [{"W": w.T.tolist(), "b": b.tolist()} for w, b in zip(model.coefs_, model.intercepts_)]
    payload = {"featureVersion": feature_version, "mean": mean.tolist(), "std": std.tolist(),
               "layers": layers, "classes": [int(c) for c in model.classes_]}
    Path(path).write_text(json.dumps(payload))
    print(f"  wrote {path} ({Path(path).stat().st_size} bytes)")


def kit_report(records, cli, kit_ranges):
    """Per participant: teach a kit from the first seconds of their four single-sound
    recordings (through the app's own teach code), then transcribe their beat."""
    print("\n== My Kit, personal sounds (teach from 5 s clips, test on that person's improvisation) ==")
    teach_js = ("const k=require(process.argv[1]);const h=JSON.parse(require('fs').readFileSync(0,'utf8'));"
                "try{k.addSound(process.argv[2],{note:+process.argv[3],name:process.argv[4],hits:h.hits,"
                "featureVersion:h.featureVersion,scales:h.featureScales,range:h.kitRange});}"
                "catch(e){process.stdout.write('SKIP '+e.message)}")
    kind_note = {"Kick": 36, "Snare": 38, "HHclosed": 42, "HHopened": 46}
    personal = [r for r in records if r["modality"] == "Personal"]
    participants = sorted({r["participant"] for r in personal})

    def work(participant):
        with tempfile.TemporaryDirectory() as tmp:
            kit = os.path.join(tmp, "kit.json")
            taught = 0
            for r in personal:
                if r["participant"] != participant or r["kind"] not in kind_note:
                    continue
                heard = run_cli(cli, r["wav"], seconds=TEACH_SECONDS)
                out = subprocess.run(["node", "-e", teach_js, str(HERE.parent / "backend/services/kit.js"), kit,
                                      str(kind_note[r["kind"]]), r["kind"]], input=json.dumps(heard),
                                     capture_output=True, text=True, check=True)
                taught += not out.stdout.startswith("SKIP")
            improv = next((r for r in personal if r["participant"] == participant and r["kind"] == "Improvisation"), None)
            if improv is None or taught == 0:
                return None
            per_range = {}
            for kit_range in kit_ranges:
                result = run_cli(cli, improv["wav"], ["--mode", "kit", "--kit", kit, "--kit-range", str(kit_range)])
                pairs, _ = match(improv["annotations"], result["hits"])
                right = sum(result["hits"][hi]["note"] == improv["annotations"][ai][1] for ai, hi in pairs)
                by_kit = sum(result["hits"][hi]["source"] == "kit" for _, hi in pairs)
                per_range[kit_range] = (right, by_kit, len(pairs))
            return taught, per_range

    with ThreadPoolExecutor(max_workers=os.cpu_count()) as pool:
        results = [r for r in pool.map(work, participants) if r]
    print(f"  participants: {len(results)}, sounds taught per participant: {np.mean([r[0] for r in results]):.1f} of 4")
    best = None
    for kit_range in kit_ranges:
        right = sum(r[1][kit_range][0] for r in results)
        by_kit = sum(r[1][kit_range][1] for r in results)
        total = sum(r[1][kit_range][2] for r in results)
        accuracy = right / total
        print(f"    kit-range {kit_range:<5} accuracy {accuracy:.3f}   matched by kit {by_kit / total:.2f}  (n={total})")
        if best is None or accuracy > best[1] + 0.002:
            best = (kit_range, accuracy)
    print(f"  best kit-range: {best[0]}  ({best[1]:.3f})")
    return best


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("dataset", type=Path, help="path to the extracted AVP_Dataset folder")
    parser.add_argument("--cli", type=Path, default=HERE.parent / "cli/neuralnote_drums")
    parser.add_argument("--model", type=Path, default=HERE.parent / "cli/drum_model.json")
    parser.add_argument("--onsets", action="store_true", help="onset detection report only")
    args = parser.parse_args()

    records = load_dataset(args.dataset, args.cli)
    if not records:
        sys.exit(f"No recordings found under {args.dataset}")
    print(f"{len(records)} recordings, {sum(len(r['annotations']) for r in records)} annotated hits, "
          f"{len({r['participant'] for r in records})} participants")
    onset_report(records)
    if args.onsets:
        return

    X, y, classic, groups, improv, personal = labeled_rows(records)
    masks = {"all matched hits": np.ones(len(y), bool), "improvisations only": improv,
             "personal sounds, improvisations": improv & personal, "fixed sounds, improvisations": improv & ~personal}

    print("\n== Classification on correctly detected hits ==")
    accuracy_table("Classic (fixed thresholds), as shipped:", y, classic, masks)
    confusion(y, classic)

    # Held-out by participant: the model never sees the voice it is tested on
    from sklearn.model_selection import GroupKFold
    neural = np.zeros_like(y)
    for train, test in GroupKFold(n_splits=5).split(X, y, groups):
        model, mean, std = fit_mlp(X[train], y[train])
        neural[test] = model.predict((X[test] - mean) / std)
    accuracy_table("Neural (MLP 16-24-4), 5-fold by participant:", y, neural, masks)
    confusion(y, neural)

    print("\n== Classic threshold search (5-fold by participant, picks on train, scores on held-out) ==")
    grid = [(low, zl, zh, hi, d) for low in (0.25, 0.35, 0.45, 0.55) for zl in (0.03, 0.06, 0.09)
            for zh in (0.25, 0.35, 0.45) for hi in (0.08, 0.15, 0.25, 0.35) for d in (90.0, 120.0, 160.0, 220.0)]
    tuned = np.zeros_like(y)
    for train, test in GroupKFold(n_splits=5).split(X, y, groups):
        best = max(grid, key=lambda g: np.mean(classic_rule(X[train], *g) == y[train]))
        tuned[test] = classic_rule(X[test], *best)
    overall_best = max(grid, key=lambda g: np.mean(classic_rule(X, *g) == y))
    print(f"  shipped thresholds, re-implemented here: {np.mean(classic_rule(X) == y):.3f} "
          f"(CLI's own answer: {np.mean(classic == y):.3f} — these two must agree)")
    print(f"  tuned thresholds, held-out: {np.mean(tuned == y):.3f}   improvisations: {np.mean(tuned[improv] == y[improv]):.3f}")
    print(f"  best on all data: low={overall_best[0]} zcrLow={overall_best[1]} zcrHigh={overall_best[2]} "
          f"high={overall_best[3]} openHatMs={overall_best[4]}")

    kit_report(records, args.cli, [0.5, 0.6, 0.75, 0.9, 1.0, 1.25, 2.0])

    print("\n== Final model (all data) ==")
    feature_version = run_cli(args.cli, records[0]["wav"])["featureVersion"]
    model, mean, std = fit_mlp(X, y)
    export_model(args.model, model, mean, std, feature_version)


if __name__ == "__main__":
    main()
