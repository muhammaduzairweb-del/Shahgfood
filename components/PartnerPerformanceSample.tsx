"use client";

const BLUE = "#2F6FED";
const PURPLE = "#5E1A86";

// illustrative-only numbers — not connected to any real Search Console data
const HOURS = ["1 PM", "3 PM", "5 PM", "7 PM", "9 PM", "11 PM", "1 AM", "3 AM", "5 AM", "7 AM", "9 AM", "11 AM"];
const CLICKS = [140, 260, 190, 340, 260, 430, 380, 90, 60, 120, 260, 70];
const IMPRESSIONS = [1600, 2800, 2100, 4200, 3600, 5400, 4800, 1300, 900, 1500, 3200, 800];

function buildPath(values: number[], max: number, w: number, h: number) {
  const step = w / (values.length - 1);
  return values.map((v, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`).join(" ");
}

export default function PartnerPerformanceSample({ ur }: { ur: boolean }) {
  const W = 640;
  const H = 190;
  const clicksPath = buildPath(CLICKS, Math.max(...CLICKS) * 1.15, W, H);
  const imprPath = buildPath(IMPRESSIONS, Math.max(...IMPRESSIONS) * 1.15, W, H);

  const stats = [
    { l: ur ? "کل کلکس" : "Total clicks", v: "3.2K", c: BLUE },
    { l: ur ? "کل امپریشنز" : "Total impressions", v: "41.6K", c: PURPLE },
    { l: ur ? "اوسط CTR" : "Average CTR", v: "7.8%", c: "#8A8072" },
    { l: ur ? "اوسط پوزیشن" : "Average position", v: "4.2", c: "#8A8072" },
  ];

  return (
    <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 22, padding: "22px 22px 18px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 16, insetInlineEnd: 16, background: "#211812", color: "#fff", fontSize: 10, fontWeight: 800, padding: "5px 11px", borderRadius: 999, letterSpacing: ".4px", whiteSpace: "nowrap" }}>
        {ur ? "نمونہ ڈیٹا · محض مثال" : "SAMPLE DATA · ILLUSTRATIVE EXAMPLE"}
      </div>

      <div style={{ fontSize: 17, fontWeight: 800, color: "#211812", marginBottom: 16, maxWidth: 380 }}>{ur ? "کارکردگی" : "Performance"}</div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {[ur ? "24 گھنٹے" : "24 hours", ur ? "7 دن" : "7 days", ur ? "28 دن" : "28 days", ur ? "3 مہینے" : "3 months"].map((lbl, i) => (
          <span key={lbl} style={{ fontSize: 12, fontWeight: 700, padding: "7px 13px", borderRadius: 999, background: i === 0 ? "#E7F0FE" : "#F7F3EB", color: i === 0 ? BLUE : "#8A8072", border: i === 0 ? `1px solid ${BLUE}55` : "1px solid #EAE1D2" }}>
            {lbl}
          </span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10, marginBottom: 18 }}>
        {stats.map((s) => (
          <div key={s.l} style={{ borderTop: `3px solid ${s.c}`, background: "#FBF9F4", borderRadius: 12, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8072" }}>{s.l}</div>
            <div className="num" style={{ fontSize: 22, fontWeight: 800, color: "#211812", marginTop: 2 }}>{s.v}</div>
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="none">
        <path d={imprPath} fill="none" stroke={PURPLE} strokeWidth={2.5} />
        <path d={clicksPath} fill="none" stroke={BLUE} strokeWidth={2.5} />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#B0A692", marginTop: 6 }}>
        {HOURS.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12, fontWeight: 700 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6, color: BLUE }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: BLUE, display: "inline-block" }} />
          {ur ? "کلکس" : "Clicks"}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6, color: PURPLE }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: PURPLE, display: "inline-block" }} />
          {ur ? "امپریشنز" : "Impressions"}
        </span>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: "#8A8072", lineHeight: 1.6, borderTop: "1px solid #F0E9DA", paddingTop: 12 }}>
        {ur
          ? "یہ ایک نمونہ / مثال ہے کہ گوگل سرچ پر نظر آنے کا کیا مطلب ہو سکتا ہے — اصل نمبرز مختلف ہو سکتے ہیں اور یہ کسی حقیقی سرچ کنسول اکاؤنٹ سے منسلک نہیں۔"
          : "This is a sample / illustrative example of what search visibility can look like — actual numbers vary, and this isn't connected to a real Search Console account."}
      </div>
    </div>
  );
}
