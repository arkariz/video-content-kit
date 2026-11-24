export type Lang = "en" | "id";
export type CaptionWord = { text: string; startMs: number; endMs: number };
export type SceneProps = {
  id: string;
  type: string;            // remotion-diagram | remotion-code | remotion-data | remotion-text | broll
  text: string;            // on_screen_text
  description: string;
  spec?: any;              // data visual per scene (lihat produksi/README.md)
  audio?: string;          // path relatif ke public-dir (produksi/)
  audioFrames: number;     // panjang suara; animasi selesai di sini
  durationFrames: number;  // audioFrames + jeda
  clip?: string;
  captions: CaptionWord[];
};
export type VideoProps = { trackId: string; lang: Lang; scenes: SceneProps[]; hookOverride?: string };
