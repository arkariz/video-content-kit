// Pintu masuk mesin R3 untuk komponen adegan per siklus (04-shots.tsx): import { ... } from "@r3";
export * from "./kit";
export * from "./count";
export { useShot, useLabel } from "./context";
export type { ShotCtx, R3Label, R3Word, R3ShotSpec } from "./context";
export { defineShots, shot } from "./registry";
export type { ShotOpts, ShotDef, ShotsModule } from "./registry";
export * as cast from "./cast";
