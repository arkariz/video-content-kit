import React from "react";
import { Arrow, Box, Note, VProps, appear, clamp, ease, toneColor } from "../lib/ui";

/** Angka berdampingan. spec: {items:[{label,value,tone}], between, note} */
const Stats: React.FC<VProps> = ({ spec, p, vertical, t }) => {
  const it: any[] = spec.items;
  return (
    <div>
      <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: "center", justifyContent: "center", gap: 36 }}>
        {it.map((x, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Arrow t={t} vertical={vertical} label={spec.between} a={appear(p, i, it.length)} len={160} />}
            <Box t={t} tone={x.tone ?? "default"} a={appear(p, i, it.length)} w={vertical ? 860 : 620} pad={36}>
              <div style={{ fontSize: 36, color: t.muted }}>{x.label}</div>
              <div style={{ fontSize: 120, fontWeight: 900, fontFamily: t.mono, color: toneColor(x.tone, t) }}>{x.value}</div>
              {x.sub && <div style={{ fontSize: 30, color: t.muted }}>{x.sub}</div>}
            </Box>
          </React.Fragment>
        ))}
      </div>
      {spec.note && <Note t={t} a={ease((p - 0.6) / 0.15)}>{spec.note}</Note>}
    </div>
  );
};

/** Satu angka besar yang berganti. spec: {label, values:[..], tone} */
const Counter: React.FC<VProps> = ({ spec, p, t }) => {
  const v: string[] = spec.values, i = Math.min(v.length - 1, Math.floor(clamp((p - 0.1) / 0.8) * v.length));
  return (
    <Box t={t} tone={spec.tone ?? "default"} a={ease(p / 0.1)} w={1100} pad={44} style={{ margin: "0 auto" }}>
      <div style={{ fontSize: 40, color: t.muted }}>{spec.label}</div>
      <div style={{ fontSize: 190, fontWeight: 900, fontFamily: t.mono, color: toneColor(spec.tone, t) }}>{v[i]}</div>
    </Box>
  );
};

/** Batang horizontal. spec: {bars:[{label,v,tone}], unit} */
const Bars: React.FC<VProps> = ({ spec, p, t }) => {
  const b: any[] = spec.bars, max = Math.max(...b.map((x) => x.v));
  return (
    <div style={{ width: 1300, margin: "0 auto" }}>
      {b.map((x, i) => (
        <div key={i} style={{ margin: "26px 0", opacity: appear(p, i, b.length) }}>
          <div style={{ fontSize: 38, fontWeight: 700, marginBottom: 8 }}>{x.label}</div>
          <div style={{ height: 70, width: `${(x.v / max) * 100 * ease((p - 0.15 - i * 0.2) / 0.3)}%`, background: toneColor(x.tone ?? "hot", t), borderRadius: 12 }} />
        </div>
      ))}
      {spec.unit && <Note t={t} a={ease((p - 0.6) / 0.15)}>{spec.unit}</Note>}
    </div>
  );
};

/** Matriks bank × bank yang dipadatkan jadi satu angka bersih. spec: {banks, gross:[[..]], net:[..]} */
const Netting: React.FC<VProps> = ({ spec, p, t }) => {
  const k = ease((p - 0.5) / 0.2), banks: string[] = spec.banks;
  const cell: React.CSSProperties = { padding: "14px 26px", fontSize: 40, fontFamily: t.mono, textAlign: "right" };
  return (
    <Box t={t} tone="muted" w={1300} pad={30} style={{ margin: "0 auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr><td style={{ ...cell, textAlign: "left", color: t.muted, fontFamily: t.font, fontSize: 28 }}>owes →</td>{banks.map((b) => <td key={b} style={{ ...cell, color: t.muted, fontFamily: t.font, fontSize: 30 }}>{b}</td>)}<td style={{ ...cell, color: t.accent, fontFamily: t.font, fontSize: 30, opacity: k }}>NET</td></tr></thead>
        <tbody>{banks.map((b, i) => (
          <tr key={b} style={{ opacity: appear(p, i, banks.length) }}>
            <td style={{ ...cell, textAlign: "left", fontFamily: t.font, fontWeight: 700 }}>{b}</td>
            {spec.gross[i].map((g: string, j: number) => <td key={j} style={{ ...cell, opacity: 1 - 0.7 * k }}>{g}</td>)}
            <td style={{ ...cell, color: spec.net[i].startsWith("−") ? t.bad : t.good, fontWeight: 900, opacity: k, fontSize: 46 }}>{spec.net[i]}</td>
          </tr>))}</tbody>
      </table>
    </Box>
  );
};

/** Ribuan titik menyusut jadi beberapa batang. spec: {from, to} */
const Collapse: React.FC<VProps> = ({ spec, p, t }) => {
  const k = ease((p - 0.45) / 0.3);
  return (
    <div style={{ width: 1300, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 40, color: t.muted, opacity: 1 - k }}>{spec.from}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", margin: "26px 0", minHeight: 220, alignContent: "center" }}>
        {Array.from({ length: 84 }).map((_, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 11, background: t.fg, opacity: (0.2 + ((i * 37) % 10) / 14) * (1 - k) * ease(p / 0.2) }} />)}
      </div>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", height: 70 }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 300 * k, height: 70, background: t.accent, borderRadius: 12, opacity: k }} />)}</div>
      <div style={{ fontSize: 44, fontWeight: 800, color: t.accent, marginTop: 18, opacity: k }}>{spec.to}</div>
    </div>
  );
};

/** Angka sangat besar dengan satu titik kecil bertanda. spec: {total,label,mark} */
const BigNum: React.FC<VProps> = ({ spec, p, t }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: 40, color: t.muted, opacity: ease(p / 0.1) }}>{spec.label}</div>
    <div style={{ fontSize: 150, fontWeight: 900, fontFamily: t.mono, opacity: ease(p / 0.15) }}>{spec.total}</div>
    <div style={{ opacity: ease((p - 0.5) / 0.15), marginTop: 30, display: "inline-flex", alignItems: "center", gap: 20, color: t.accent, fontSize: 44, fontWeight: 800 }}>
      <span style={{ width: 16, height: 16, borderRadius: 8, background: t.accent, boxShadow: `0 0 0 10px ${t.accent}44` }} />{spec.mark}
    </div>
  </div>
);

/** Satu angka dibuka jadi beberapa potongan tanda tanya. spec: {total, parts:[{label,value}]} */
const Breakdown: React.FC<VProps> = ({ spec, p, vertical, t }) => {
  const k = ease((p - 0.35) / 0.25), parts: any[] = spec.parts;
  return (
    <div style={{ textAlign: "center" }}>
      <Box t={t} tone="hot" a={ease(p / 0.12)} w={vertical ? 860 : 760} pad={36} style={{ margin: "0 auto" }}>
        <div style={{ fontSize: 40, color: t.muted }}>on the monthly statement</div>
        <div style={{ fontSize: 80, fontWeight: 900 }}>{spec.total}</div>
      </Box>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
        {parts.map((x, i) => (
          <Box key={i} t={t} tone="muted" a={k} w={vertical ? 760 : 380} style={{ transform: `translateY(${(1 - k) * -40}px)` }}>
            <div style={{ fontSize: 34, color: t.muted }}>{x.label}</div>
            <div style={{ fontSize: 90, fontWeight: 900, color: t.accent }}>{x.value}</div>
          </Box>
        ))}
      </div>
    </div>
  );
};

export const DataPanel: React.FC<VProps> = (props) => {
  switch (props.spec.kind) {
    case "counter": return <Counter {...props} />;
    case "bars": return <Bars {...props} />;
    case "netting": return <Netting {...props} />;
    case "collapse": return <Collapse {...props} />;
    case "bignum": return <BigNum {...props} />;
    case "breakdown": return <Breakdown {...props} />;
    default: return <Stats {...props} />;
  }
};
