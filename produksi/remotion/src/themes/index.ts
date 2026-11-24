export type Theme = { bg: string; fg: string; accent: string; font: string; mono: string; panel: string; good: string; bad: string; muted: string; layout: "left" | "center" };
const mono = "'SF Mono', Menlo, Consolas, monospace";
export const themes: Record<string, Theme> = {
  T01: { bg: "#0f1b2d", fg: "#f4f1ea", accent: "#f5b700", font: "Inter, 'Helvetica Neue', sans-serif", mono, panel: "#182a44", good: "#3ddc97", bad: "#ff5d5d", muted: "#7d8aa3", layout: "left" },
  T02: { bg: "#1b2a1f", fg: "#f7f3e8", accent: "#e4572e", font: "Georgia, serif", mono, panel: "#26382b", good: "#7bd88f", bad: "#ff7a59", muted: "#93a597", layout: "center" },
};
export const themeFor = (trackId: string): Theme => themes[trackId] ?? themes.T01;
