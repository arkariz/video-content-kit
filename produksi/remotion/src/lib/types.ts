export type Lang = "en" | "id";
export type CaptionWord = { text: string; startMs: number; endMs: number };
export type SceneProps = {
  id: string;
  type: string;
  text: string;            // on_screen_text
  description: string;
  audio?: string;          // path relatif ke public-dir (produksi/)
  durationFrames: number;
  clip?: string;           // path footage relatif ke public-dir
  captions: CaptionWord[]; // waktu relatif ke awal scene
};
export type VideoProps = { trackId: string; lang: Lang; scenes: SceneProps[]; hookOverride?: string };
