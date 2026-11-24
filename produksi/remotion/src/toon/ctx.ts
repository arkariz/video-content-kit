import { createContext, useContext } from "react";
export type StageCtx = { w: number; h: number; u: number; vertical: boolean; groundY: number };
export const Ctx = createContext<StageCtx>({ w: 1920, h: 1080, u: 330, vertical: false, groundY: 860 });
export const useStage = () => useContext(Ctx);
export const INK = "#1b1b1b";
export const makeCtx = (w: number, h: number, vertical: boolean): StageCtx => ({ w, h, vertical, u: vertical ? w / 2.7 : Math.min(h * 0.5, w / 4.8), groundY: vertical ? h * 0.66 : h * 0.8 });
