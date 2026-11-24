import React from "react";
import { Box, VProps, appear, clamp, ease } from "../lib/ui";

/** Pesan terformat (ISO 8583 dll). spec: {title, lines:[{k,v,note}], focus:[idx...], note}
 *  Baris muncul satu per satu; bila `focus` ada, sorotan berpindah berurutan di paruh kedua scene. */
export const CodeBlock: React.FC<VProps> = ({ spec, p, vertical, t }) => {
  const lines: any[] = spec.lines, focus: number[] | undefined = spec.focus;
  const f = focus?.length ? Math.min(focus.length - 1, Math.floor(clamp((p - 0.2) / 0.7) * focus.length)) : -1;
  const hot = f >= 0 && p > 0.2 ? focus![f] : -1;
  return (
    <div>
      <Box t={t} tone="muted" w={vertical ? 940 : 1400} pad={36} style={{ margin: "0 auto", background: "#0a121f", textAlign: "left" }}>
        <div style={{ fontFamily: t.mono, fontSize: 28, color: t.muted, marginBottom: 20 }}>{spec.title ?? "message (example data)"}</div>
        {lines.map((l, i) => {
          const a = focus ? ease(p / 0.12) : appear(p, i, lines.length);
          const on = hot === i, dim = hot >= 0 && !on;
          return (
            <div key={i} style={{ opacity: a * (dim ? 0.35 : 1), display: "flex", gap: 28, alignItems: "baseline", padding: "12px 18px", margin: "4px 0", borderRadius: 12, background: on ? `${t.accent}26` : "transparent", border: on ? `3px solid ${t.accent}` : "3px solid transparent", fontFamily: t.mono, fontSize: vertical ? 40 : 46 }}>
              <span style={{ color: t.muted, minWidth: 130 }}>{l.k}</span>
              <span style={{ color: on ? t.accent : t.fg, fontWeight: 700 }}>{l.v}</span>
              {l.note && <span style={{ color: on ? t.fg : t.muted, fontFamily: t.font, fontSize: 34, marginLeft: "auto", opacity: on || !focus ? 1 : 0.7 }}>{l.note}</span>}
            </div>
          );
        })}
      </Box>
      {spec.note && <div style={{ marginTop: 32, textAlign: "center", fontSize: 38, color: t.muted, fontWeight: 600, opacity: ease((p - 0.6) / 0.15) }}>{spec.note}</div>}
    </div>
  );
};
