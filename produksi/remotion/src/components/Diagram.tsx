import React from "react";
import { Arrow, Box, Note, Pill, VProps, appear, clamp, ease, toneColor, useSize } from "../lib/ui";

type N = { label: string; sub?: string; tone?: any; mono?: boolean };
const edgeOf = (e: any) => (typeof e === "string" ? { label: e } : e ?? {});

/** Rangkaian node dengan panah. spec: {nodes:[{label,sub,tone}], edges:[string | {label,broken,back}], note} */
export const Flow: React.FC<VProps & { nodesIn?: N[] }> = ({ spec, p, vertical, t }) => {
  const nodes: N[] = spec.nodes, n = nodes.length;
  const { width } = useSize();
  const nodeW = vertical ? 800 : Math.min(420, (width - 280 - (n - 1) * 150) / n);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: "center", justifyContent: "center", gap: vertical ? 6 : 8 }}>
        {nodes.map((nd, i) => {
          const e = edgeOf(spec.edges?.[i - 1]);
          return (
            <React.Fragment key={i}>
              {i > 0 && <Arrow t={t} vertical={vertical} label={e.label} broken={e.broken} back={e.back} a={appear(p, i, n)} len={vertical ? 110 : 150} />}
              <Box t={t} tone={nd.tone} a={appear(p, i, n)} w={nodeW} style={{ minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
                <div style={{ fontSize: nodeW < 300 ? 38 : 46, fontWeight: 800, lineHeight: 1.1 }}>{nd.label}</div>
                {nd.sub && <div style={{ fontSize: 30, color: toneColor(nd.tone === "hot" ? "hot" : "muted", t), fontFamily: nd.mono ? t.mono : t.font }}>{nd.sub}</div>}
              </Box>
            </React.Fragment>
          );
        })}
      </div>
      {spec.note && <Note t={t} a={appear(p, n, n + 1)}>{spec.note}</Note>}
    </div>
  );
};

/** Beberapa jalur Flow bertumpuk. spec: {lanes:[{title, nodes, edges}]} */
export const Lanes: React.FC<VProps> = ({ spec, p, vertical, t }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
    {spec.lanes.map((l: any, k: number) => (
      <div key={k}>
        <div style={{ fontSize: 34, fontWeight: 800, color: t.accent, marginBottom: 14, textAlign: "center", opacity: appear(p, k, spec.lanes.length * 1.5) }}>{l.title}</div>
        <Flow spec={l} p={clamp((p - k * 0.28) / 0.65)} vertical={false} t={t} />
      </div>
    ))}
  </div>
);

/** Blok garis waktu / kalender. spec: {blocks:[{title,sub,tone:"lit"|"dim"|"hot"}]} */
export const Timeline: React.FC<VProps> = ({ spec, p, vertical, t }) => {
  const b: any[] = spec.blocks;
  return (
    <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: 24, justifyContent: "center", alignItems: "stretch" }}>
      {b.map((x, i) => {
        const a = appear(p, i, b.length), lit = x.tone === "lit" || x.tone === "hot";
        return (
          <Box key={i} t={t} tone={x.tone === "hot" ? "hot" : lit ? "good" : "muted"} a={a * (lit ? 1 : 0.45)} w={vertical ? 800 : undefined} style={{ flex: 1, minWidth: 190, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, minHeight: 150, boxShadow: lit ? `0 0 40px ${x.tone === "hot" ? t.accent : t.good}55` : undefined }}>
            <div style={{ fontSize: 42, fontWeight: 800 }}>{x.title}</div>
            {x.sub && <div style={{ fontSize: 30, color: lit ? t.fg : t.muted }}>{x.sub}</div>}
          </Box>
        );
      })}
    </div>
  );
};

const stateInfo = (s: string, t: any) => ({
  pending: { c: t.accent, tag: "PENDING", op: 1, strike: false },
  posted: { c: t.fg, tag: "POSTED", op: 1, strike: false },
  gone: { c: t.muted, tag: "GONE", op: 0.35, strike: true },
  credit: { c: t.good, tag: "CREDIT", op: 1, strike: false },
}[s] ?? { c: t.fg, tag: "", op: 1, strike: false });

/** Daftar transaksi ala aplikasi bank (fiktif). spec: {header, rows:[{label,amount,state | from,to,toAmount,switchAt,appearAt}], note} */
export const Rows: React.FC<VProps> = ({ spec, p, vertical, t }) => {
  const rows: any[] = spec.rows;
  return (
    <div>
      <Box t={t} tone="muted" pad={30} w={vertical ? 900 : 1100} style={{ margin: "0 auto", textAlign: "left" }}>
        <div style={{ fontSize: 30, color: t.muted, marginBottom: 18, letterSpacing: 2, textTransform: "uppercase" }}>{spec.header ?? "Transactions (example)"}</div>
        {rows.map((r, i) => {
          const sw = r.to && p > (r.switchAt ?? 0.55);
          const st = stateInfo(sw ? r.to : r.state ?? r.from, t);
          const a = r.appearAt !== undefined ? ease((p - r.appearAt) / 0.12) : appear(p, i, rows.length);
          return (
            <div key={i} style={{ opacity: a * st.op, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderTop: i ? `2px solid ${t.bg}` : undefined, transform: `translateX(${(1 - a) * 40}px)` }}>
              <div style={{ fontSize: 42, fontWeight: 700, textDecoration: st.strike ? "line-through" : "none" }}>{r.label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: st.c, border: `2px solid ${st.c}`, borderRadius: 8, padding: "2px 10px" }}>{st.tag}</span>
                <span style={{ fontSize: 42, fontFamily: t.mono, color: st.c, textDecoration: st.strike ? "line-through" : "none" }}>{sw && r.toAmount ? r.toAmount : r.amount}</span>
              </div>
            </div>
          );
        })}
      </Box>
      {spec.note && <Note t={t} a={ease((p - 0.6) / 0.15)}>{spec.note}</Note>}
    </div>
  );
};

/** Daftar centang. spec: {header, items:[string | {text,mark:"ok"|"odd"}]} */
export const Checks: React.FC<VProps> = ({ spec, p, t }) => {
  const items: any[] = spec.items;
  return (
    <Box t={t} tone="muted" w={1000} style={{ margin: "0 auto", textAlign: "left" }}>
      {spec.header && <div style={{ fontSize: 30, color: t.muted, marginBottom: 14, letterSpacing: 2, textTransform: "uppercase" }}>{spec.header}</div>}
      {items.map((it, i) => {
        const x = typeof it === "string" ? { text: it, mark: "ok" } : it, a = appear(p, i, items.length);
        return (
          <div key={i} style={{ opacity: a, display: "flex", gap: 24, alignItems: "center", padding: "14px 0", fontSize: 46, fontWeight: 700 }}>
            <span style={{ color: x.mark === "ok" ? t.good : t.accent, fontSize: 56 }}>{x.mark === "ok" ? "✓" : "!"}</span>{x.text}
          </div>
        );
      })}
    </Box>
  );
};

/** Skor risiko tiga zona. spec: {zones:[..], target:1, label} */
export const Gauge: React.FC<VProps> = ({ spec, p, t }) => {
  const z: string[] = spec.zones, cols = [t.good, t.accent, t.bad];
  const pos = 0.03 + ease((p - 0.25) / 0.45) * (((spec.target ?? 1) + 0.5) / z.length - 0.03);
  return (
    <div style={{ width: 1200, margin: "0 auto" }}>
      <div style={{ position: "relative", display: "flex", gap: 10, opacity: ease(p / 0.12) }}>
        {z.map((n, i) => (<div key={i} style={{ flex: 1, background: cols[i % 3], color: t.bg, fontSize: 40, fontWeight: 800, textAlign: "center", padding: "36px 0", borderRadius: 16 }}>{n}</div>))}
        <div style={{ position: "absolute", left: `${pos * 100}%`, top: -46, transform: "translateX(-50%)", fontSize: 64, color: t.fg }}>▼</div>
      </div>
      {spec.label && <Note t={t} a={ease((p - 0.2) / 0.15)}>{spec.label}</Note>}
    </div>
  );
};

/** Layar terminal dengan stempel status. spec: {lines:[..], chips:[..], stamp, tone, side:{label,value}} */
export const Stamp: React.FC<VProps> = ({ spec, p, vertical, t }) => {
  const sa = ease((p - 0.4) / 0.12), pop = 1.35 - 0.35 * sa;
  return (
    <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: 48, justifyContent: "center", alignItems: "center" }}>
      <Box t={t} tone="muted" w={vertical ? 860 : 900} pad={36} style={{ background: "#0a121f", minHeight: 330, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
        {(spec.chips ?? []).length > 0 && <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>{spec.chips.map((c: string, i: number) => <Pill key={i} t={t} mono tone="muted" a={appear(p, i, 4)}>{c}</Pill>)}</div>}
        {(spec.lines ?? []).map((l: string, i: number) => <div key={i} style={{ fontFamily: t.mono, fontSize: 36, color: t.muted, opacity: appear(p, i, 4) }}>{l}</div>)}
        <div style={{ opacity: sa, transform: `scale(${pop}) rotate(${-3 * sa}deg)`, fontSize: 96, fontWeight: 900, letterSpacing: 4, color: toneColor(spec.tone ?? "good", t), border: `8px solid ${toneColor(spec.tone ?? "good", t)}`, borderRadius: 16, padding: "6px 28px", alignSelf: "center" }}>{spec.stamp}</div>
      </Box>
      {spec.side && (
        <Box t={t} tone="bad" a={ease((p - 0.5) / 0.15)} w={vertical ? 860 : 520}>
          <div style={{ fontSize: 34, color: t.muted }}>{spec.side.label}</div>
          <div style={{ fontSize: 120, fontWeight: 900, fontFamily: t.mono }}>{spec.side.value}</div>
        </Box>
      )}
    </div>
  );
};

/** Banyak sumber menuju satu titik. spec: {items:[..], hub:{label,sub}} */
export const Hub: React.FC<VProps> = ({ spec, p, vertical, t }) => {
  const items: string[] = spec.items;
  return (
    <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: "center", justifyContent: "center", gap: 36 }}>
      <div style={{ display: "flex", flexDirection: vertical ? "row" : "column", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((s, i) => <Box key={i} t={t} a={appear(p, i, items.length + 1)} pad={16} w={vertical ? 360 : 300} style={{ fontSize: 38, fontWeight: 700 }}>{s}</Box>)}
      </div>
      <Arrow t={t} vertical={vertical} a={appear(p, items.length, items.length + 1)} />
      <Box t={t} tone="hot" a={appear(p, items.length, items.length + 1)} w={vertical ? 800 : 520}>
        <div style={{ fontSize: 50, fontWeight: 800 }}>{spec.hub.label}</div>
        {spec.hub.sub && <div style={{ fontSize: 32, color: t.accent, marginTop: 8 }}>{spec.hub.sub}</div>}
      </Box>
    </div>
  );
};

export const Diagram: React.FC<VProps> = (props) => {
  switch (props.spec.kind) {
    case "lanes": return <Lanes {...props} />;
    case "timeline": return <Timeline {...props} />;
    case "rows": return <Rows {...props} />;
    case "checks": return <Checks {...props} />;
    case "gauge": return <Gauge {...props} />;
    case "stamp": return <Stamp {...props} />;
    case "hub": return <Hub {...props} />;
    default: return <Flow {...props} />;
  }
};
