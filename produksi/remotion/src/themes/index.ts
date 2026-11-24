export type Theme = { screenBg: string; screenFg: string; screenMuted: string; bg: string; fg: string; accent: string; font: string; mono: string; panel: string; good: string; bad: string; muted: string; layout: "left" | "center" };
const mono = "'SF Mono', Menlo, Consolas, monospace";
export const themes: Record<string, Theme> = {
  T01: { screenBg: "#101a2c", screenFg: "#f4f1ea", screenMuted: "#9aa7bf", bg: "#fff6df", fg: "#1b1b1b", accent: "#d98a00", font: "'Chalkboard SE','Marker Felt','Comic Sans MS',sans-serif", mono, panel: "#ffffff", good: "#1fa86b", bad: "#e0443e", muted: "#6b6f7a", layout: "left" },
  T02: { screenBg: "#16241a", screenFg: "#f7f3e8", screenMuted: "#9db2a3", bg: "#f4f0e0", fg: "#1b1b1b", accent: "#c4421c", font: "'Chalkboard SE','Marker Felt','Comic Sans MS',sans-serif", mono, panel: "#ffffff", good: "#2a8f4a", bad: "#d6482a", muted: "#6a7468", layout: "center" },
};
export const themeFor = (trackId: string): Theme => themes[trackId] ?? themes.T01;
