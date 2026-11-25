export type Lang = "en" | "id";
export type CaptionWord = { text: string; startMs: number; endMs: number };
export type SceneProps = {
  id: string;
  type: string;            // remotion-diagram | remotion-code | remotion-data | remotion-text | broll
  text: string;            // on_screen_text
  description: string;
  spec?: any;
  stage?: any;             // adegan kartun per scene (04-stage.json)              // data visual per scene (lihat produksi/README.md)
  audio?: string;          // path relatif ke public-dir (produksi/)
  audioRate?: number;      // >1 hanya untuk track dubbing yang lebih panjang dari slot scene
  audioFrames: number;     // panjang suara; animasi selesai di sini
  durationFrames: number;  // audioFrames + jeda
  clip?: string;
  clipFrames?: number;     // panjang klip (untuk loop bila lebih pendek dari scene)
  captions: CaptionWord[];
};
export type VideoProps = { trackId: string; lang: Lang; scenes: SceneProps[]; hookOverride?: string };
