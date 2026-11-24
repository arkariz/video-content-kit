import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { Video, totalFrames } from "./compositions/Video";
import type { VideoProps } from "./lib/types";

const FPS = 30;
const empty: VideoProps = { trackId: "T01", lang: "en", scenes: [] };
const meta = ({ props }: { props: VideoProps }) => ({ durationInFrames: Math.max(1, totalFrames(props.scenes)) });

const Thumb: React.FC<{ text: string; trackId: string }> = ({ text }) => (
  <AbsoluteFill style={{ background: "#0f1b2d", color: "#f5b700", justifyContent: "center", alignItems: "center", fontSize: 150, fontWeight: 900 }}>{text}</AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition id="Master16x9" component={Video} width={1920} height={1080} fps={FPS} durationInFrames={1} defaultProps={empty} calculateMetadata={meta} />
    <Composition id="Short9x16" component={Video} width={1080} height={1920} fps={FPS} durationInFrames={1} defaultProps={{ ...empty, vertical: true }} calculateMetadata={meta} />
    <Composition id="ClipID9x16" component={Video} width={1080} height={1920} fps={FPS} durationInFrames={1} defaultProps={{ ...empty, lang: "id" as const, vertical: true }} calculateMetadata={meta} />
    <Composition id="Thumbnail" component={Thumb} width={1280} height={720} fps={FPS} durationInFrames={1} defaultProps={{ text: "APPROVED ≠ PAID", trackId: "T01" }} />
  </>
);
