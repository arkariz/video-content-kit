// Entry terpisah untuk eksperimen scene ilustrasi per kalimat (T02 siklus 001, s04-s06). Tidak menyentuh Root.tsx.
// Render: npx remotion render src/experiment/index.tsx Eksperimen <out> --public-dir=..
import React from "react";
import { AbsoluteFill, Audio, Composition, Sequence, registerRoot, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import captions from "../../../captions/T02/001/en.json";
import { FONT } from "./kit";
import { DepotShot, DonorShot, GiftShot } from "./s04";
import { FactoryShot, JakartaShot, RetireShot } from "./s05";
import { AcShot, CrowdShot } from "./s06";

const FPS = 30, PAUSE = 0.55;
type Shot = { from: number; el: React.FC<{ t: number }> }; // from = detik mulai shot di dalam scene
const SCENES: { id: string; ms: number; shots: Shot[] }[] = [
  { id: "s04", ms: 10495, shots: [{ from: 0, el: GiftShot }, { from: 1.82, el: DonorShot }, { from: 6.4, el: DepotShot }] },
  { id: "s05", ms: 8452, shots: [{ from: 0, el: FactoryShot }, { from: 2.48, el: RetireShot }, { from: 5.65, el: JakartaShot }] },
  { id: "s06", ms: 8127, shots: [{ from: 0, el: AcShot }, { from: 3.65, el: CrowdShot }] },
];
const frames = (ms: number) => Math.ceil((ms / 1000 + PAUSE) * FPS);

const Caption: React.FC<{ id: string }> = ({ id }) => {
  const frame = useCurrentFrame();
  const ms = (frame / useVideoConfig().fps) * 1000;
  const words = (captions as Record<string, { text: string; startMs: number; endMs: number }[]>)[id];
  const w = words.find((x) => ms >= x.startMs && ms < x.endMs);
  if (!w) return null;
  return <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, textAlign: "center", fontFamily: FONT, fontWeight: 900, fontSize: 76, color: "#fff", WebkitTextStroke: "12px #1b1b1b", paintOrder: "stroke fill" }}>{w.text}</div>;
};

const Scene: React.FC<{ id: string; shots: Shot[] }> = ({ id, shots }) => {
  const t = useCurrentFrame() / FPS;
  let i = 0;
  while (i < shots.length - 1 && t >= shots[i + 1].from) i++;
  const El = shots[i].el;
  const flash = i > 0 || id !== "s04" ? Math.max(0, 1 - (t - shots[i].from) / 0.16) : 0;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <El t={t} />
      <AbsoluteFill style={{ background: "#fffaf0", opacity: flash * 0.7 }} />
      <Caption id={id} />
      <Audio src={staticFile(`audio/T02/001/en/${id}.mp3`)} />
    </AbsoluteFill>
  );
};

const Preview: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill>
      {SCENES.map((s) => {
        const dur = frames(s.ms);
        const el = <Sequence key={s.id} from={from} durationInFrames={dur}><Scene id={s.id} shots={s.shots} /></Sequence>;
        from += dur;
        return el;
      })}
    </AbsoluteFill>
  );
};

registerRoot(() => <Composition id="Eksperimen" component={Preview} width={1920} height={1080} fps={FPS} durationInFrames={SCENES.reduce((a, s) => a + frames(s.ms), 0)} />);
