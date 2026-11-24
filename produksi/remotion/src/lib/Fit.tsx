import React, { useLayoutEffect, useRef, useState } from "react";

/** Ukur isi lalu skalakan agar pas di area (maks. `max`); tidak pernah meluber. */
export const Fit: React.FC<{ availW: number; availH: number; max: number; children: React.ReactNode }> = ({ availW, availH, max, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const next = Math.min(max, availW / el.scrollWidth, availH / el.scrollHeight);
    if (Math.abs(next - k) > 0.001) setK(next);
  });
  return <div ref={ref} style={{ width: "max-content", transform: `scale(${k})`, transformOrigin: "center" }}>{children}</div>;
};
