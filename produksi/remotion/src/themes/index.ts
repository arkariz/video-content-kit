export type Theme = { bg: string; fg: string; accent: string; font: string; layout: "left" | "center" };
export const themes: Record<string, Theme> = {
  T01: { bg: "#0f1b2d", fg: "#f4f1ea", accent: "#f5b700", font: "Inter, sans-serif", layout: "left" },
  T02: { bg: "#1b2a1f", fg: "#f7f3e8", accent: "#e4572e", font: "Georgia, serif", layout: "center" },
};
export const themeFor = (trackId: string): Theme => themes[trackId] ?? themes.T01;
