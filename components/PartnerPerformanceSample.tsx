"use client";

import { useState } from "react";
import {
  FaHome,
  FaLightbulb,
  FaChartLine,
  FaSearch,
  FaFileAlt,
  FaSitemap,
  FaEyeSlash,
  FaTachometerAlt,
  FaLock,
  FaChevronDown,
  FaDownload,
  FaFilter,
} from "react-icons/fa";
import { useWidth } from "@/components/hooks";

const BLUE = "#1A73E8";
const PURPLE = "#5E1A86";
const INK = "#202124";

// Styled after Google Search Console's own layout — illustrative numbers only,
// not wired to a real Search Console account.
const HOURS = ["1 PM", "3 PM", "5 PM", "7 PM", "9 PM", "11 PM", "1 AM", "3 AM", "5 AM", "7 AM", "9 AM", "11 AM"];
const CLICKS_BASE = [150, 520, 480, 800, 380, 900, 430, 60, 40, 130, 620, 80, 30];
const IMPR_BASE = [1600, 5200, 4800, 8200, 3600, 9500, 4900, 900, 700, 1600, 6300, 900, 400];
// last couple of points render dotted, like GSC's "today, still counting" tail
const DOTTED_FROM = 11;

type Period = "24h" | "7d" | "28d" | "3m";
const PERIODS: { id: Period; en: string; ur: string; mult: number; ctr: string; pos: string }[] = [
  { id: "24h", en: "24 hours", ur: "24 گھنٹے", mult: 1, ctr: "9.8%", pos: "1.8" },
  { id: "7d", en: "7 days", ur: "7 دن", mult: 6.8, ctr: "9.5%", pos: "2.1" },
  { id: "28d", en: "28 days", ur: "28 دن", mult: 24, ctr: "9.3%", pos: "2.4" },
  { id: "3m", en: "3 months", ur: "3 مہینے", mult: 68, ctr: "9.1%", pos: "2.6" },
];

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 2)}K`;
  return String(Math.round(n));
}

function pathFor(values: number[], max: number, w: number, h: number, from: number, to: number) {
  const step = w / (values.length - 1);
  const pts: string[] = [];
  for (let i = from; i <= to; i++) {
    pts.push(`${i === from ? "M" : "L"} ${(i * step).toFixed(1)},${(h - (values[i] / max) * h).toFixed(1)}`);
  }
  return pts.join(" ");
}

const NAV_MAIN: { Icon: typeof FaHome; en: string; ur: string; active?: boolean }[] = [
  { Icon: FaHome, en: "Overview", ur: "جائزہ" },
  { Icon: FaLightbulb, en: "Insights", ur: "بصیرت" },
  { Icon: FaChartLine, en: "Performance", ur: "کارکردگی", active: true },
  { Icon: FaSearch, en: "URL inspection", ur: "یو آر ایل معائنہ" },
];
const NAV_INDEXING: { Icon: typeof FaHome; en: string; ur: string }[] = [
  { Icon: FaFileAlt, en: "Pages", ur: "صفحات" },
  { Icon: FaSitemap, en: "Sitemaps", ur: "سائٹ میپس" },
  { Icon: FaEyeSlash, en: "Removals", ur: "ہٹائے گئے" },
];
const NAV_EXPERIENCE: { Icon: typeof FaHome; en: string; ur: string }[] = [
  { Icon: FaTachometerAlt, en: "Core Web Vitals", ur: "کور ویب وائٹلز" },
  { Icon: FaLock, en: "HTTPS", ur: "HTTPS" },
];

export default function PartnerPerformanceSample({ ur }: { ur: boolean }) {
  const [period, setPeriod] = useState<Period>("24h");
  const isNarrow = useWidth() < 860;
  const p = PERIODS.find((x) => x.id === period)!;

  const W = 640;
  const H = 190;
  const upTo = period === "24h" ? DOTTED_FROM : CLICKS_BASE.length - 1;
  const clicksScaled = CLICKS_BASE.map((v) => v * p.mult);
  const imprScaled = IMPR_BASE.map((v) => v * p.mult);
  const clicksMax = Math.max(...clicksScaled) * 1.12;
  const imprMax = Math.max(...imprScaled) * 1.12;
  const clicksSolid = pathFor(clicksScaled, clicksMax, W, H, 0, upTo);
  const imprSolid = pathFor(imprScaled, imprMax, W, H, 0, upTo);
  const clicksDot = period === "24h" ? pathFor(clicksScaled, clicksMax, W, H, DOTTED_FROM, clicksScaled.length - 1) : "";
  const imprDot = period === "24h" ? pathFor(imprScaled, imprMax, W, H, DOTTED_FROM, imprScaled.length - 1) : "";

  const totalClicks = clicksScaled.slice(0, upTo + 1).reduce((a, b) => a + b, 0);
  const totalImpr = imprScaled.slice(0, upTo + 1).reduce((a, b) => a + b, 0);

  const stats = [
    { l: ur ? "کل کلکس" : "Total clicks", v: fmt(totalClicks), c: BLUE, checked: true },
    { l: ur ? "کل امپریشنز" : "Total impressions", v: fmt(totalImpr), c: PURPLE, checked: true },
    { l: ur ? "اوسط CTR" : "Average CTR", v: p.ctr, c: null, checked: false },
    { l: ur ? "اوسط پوزیشن" : "Average position", v: p.pos, c: null, checked: false },
  ];

  const navItem = (Icon: typeof FaHome, label: string, active?: boolean) => (
    <div
      key={label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "9px 14px",
        borderRadius: active ? 0 : 8,
        background: active ? "#E8F0FE" : "transparent",
        borderInlineStart: active ? `3px solid ${BLUE}` : "3px solid transparent",
        color: active ? BLUE : "#3C4043",
        fontWeight: active ? 700 : 500,
        fontSize: 13.5,
        cursor: "default",
      }}
    >
      <Icon size={14} />
      <span>{label}</span>
    </div>
  );

  return (
    <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 22, position: "relative", overflow: "hidden", display: "flex", flexDirection: isNarrow ? "column" : "row" }}>
      <div style={{ position: "absolute", top: 14, insetInlineEnd: 14, zIndex: 2, background: "#211812", color: "#fff", fontSize: 10, fontWeight: 800, padding: "5px 11px", borderRadius: 999, letterSpacing: ".4px", whiteSpace: "nowrap" }}>
        {ur ? "نمونہ ڈیٹا · محض مثال" : "SAMPLE DATA · ILLUSTRATIVE EXAMPLE"}
      </div>

      {/* SIDEBAR — mirrors Google Search Console's own nav, for illustration */}
      {!isNarrow && (
        <div style={{ flex: "none", width: 208, background: "#F8F9FC", borderInlineEnd: "1px solid #EAE1D2", padding: "18px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px 16px", borderBottom: "1px solid #EAE1D2", marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${PURPLE},#B71C66)`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flex: "none" }}>SG</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>shahgfood.com</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{NAV_MAIN.map((n) => navItem(n.Icon, ur ? n.ur : n.en, n.active))}</div>
          <div style={{ marginTop: 14, padding: "0 16px", fontSize: 11.5, fontWeight: 700, color: "#5F6368", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {ur ? "انڈیکسنگ" : "Indexing"} <FaChevronDown size={9} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}>{NAV_INDEXING.map((n) => navItem(n.Icon, ur ? n.ur : n.en))}</div>
          <div style={{ marginTop: 14, padding: "0 16px", fontSize: 11.5, fontWeight: 700, color: "#5F6368", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {ur ? "تجربہ" : "Experience"} <FaChevronDown size={9} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}>{NAV_EXPERIENCE.map((n) => navItem(n.Icon, ur ? n.ur : n.en))}</div>
        </div>
      )}

      {/* MAIN */}
      <div style={{ flex: 1, minWidth: 0, padding: "22px 22px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 16, paddingInlineEnd: isNarrow ? 0 : 140 }}>
          <div style={{ fontSize: 19, fontWeight: 700, color: INK }}>{ur ? "کارکردگی" : "Performance"}</div>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: "#3C4043", cursor: "default" }}>
            <FaDownload size={12} /> {ur ? "ایکسپورٹ" : "EXPORT"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
          {PERIODS.map((pd) => (
            <button
              key={pd.id}
              type="button"
              onClick={() => setPeriod(pd.id)}
              style={{
                cursor: "pointer",
                fontSize: 12.5,
                fontWeight: 700,
                fontFamily: "inherit",
                padding: "7px 14px",
                borderRadius: 999,
                background: period === pd.id ? "#E8F0FE" : "#fff",
                color: period === pd.id ? BLUE : "#3C4043",
                border: period === pd.id ? `1.5px solid ${BLUE}` : "1.5px solid #DADCE0",
              }}
            >
              {period === pd.id ? "✓ " : ""}
              {ur ? pd.ur : pd.en}
            </button>
          ))}
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#3C4043", border: "1.5px solid #DADCE0", borderRadius: 999, padding: "7px 12px" }}>
            <FaFilter size={10} /> {ur ? "ویب سرچ" : "Search type: Web"}
          </span>
        </div>
        <div style={{ fontSize: 11.5, color: "#5F6368", textAlign: "end", marginBottom: 14 }}>{ur ? "آخری اپڈیٹ: 4 گھنٹے پہلے" : "Last update: 4 hours ago"}</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 0, marginBottom: 20, border: "1px solid #EAE1D2", borderRadius: 12, overflow: "hidden" }}>
          {stats.map((s, i) => (
            <div key={s.l} style={{ borderInlineStart: i === 0 ? "none" : "1px solid #EAE1D2", background: s.c ? (i === 0 ? "#E8F0FE" : "#F3E9F8") : "#fff", padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, fontWeight: 700, color: s.c ? (i === 0 ? BLUE : PURPLE) : "#5F6368" }}>
                <span style={{ width: 13, height: 13, borderRadius: 3, border: `1.5px solid ${s.c ? (i === 0 ? BLUE : PURPLE) : "#9AA0A6"}`, background: s.checked ? (i === 0 ? BLUE : PURPLE) : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9 }}>
                  {s.checked ? "✓" : ""}
                </span>
                {s.l}
              </div>
              <div className="num" style={{ fontSize: 24, fontWeight: 700, color: INK, marginTop: 4 }}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 9.5, color: "#9AA0A6", paddingBottom: 18, textAlign: "end" }}>
            {["1K", "", "", "", "", "", "", "", "", "0"].map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="none">
              <path d={imprSolid} fill="none" stroke={PURPLE} strokeWidth={2.5} />
              {imprDot && <path d={imprDot} fill="none" stroke={PURPLE} strokeWidth={2.5} strokeDasharray="3 4" />}
              <path d={clicksSolid} fill="none" stroke={BLUE} strokeWidth={2.5} />
              {clicksDot && <path d={clicksDot} fill="none" stroke={BLUE} strokeWidth={2.5} strokeDasharray="3 4" />}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9AA0A6", marginTop: 6 }}>
              {HOURS.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 9.5, color: "#9AA0A6", paddingBottom: 18 }}>
            {["10K", "", "", "", "", "", "", "", "", "0"].map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 4, fontSize: 12, fontWeight: 700 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: BLUE }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: BLUE, display: "inline-block" }} />
            {ur ? "کلکس" : "Clicks"}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: PURPLE }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: PURPLE, display: "inline-block" }} />
            {ur ? "امپریشنز" : "Impressions"}
          </span>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: "#8A8072", lineHeight: 1.6, borderTop: "1px solid #F0E9DA", paddingTop: 12 }}>
          {ur
            ? "یہ گوگل سرچ کنسول کے انداز میں بنایا گیا ایک نمونہ / مثال ہے کہ اسلام آباد اور راولپنڈی میں سرچ وزیبیلیٹی کیسی نظر آ سکتی ہے — یہ کسی حقیقی سرچ کنسول اکاؤنٹ سے منسلک نہیں۔"
            : "Styled after Google Search Console — a sample / illustrative example of what search visibility in Islamabad & Rawalpindi can look like. Not connected to a real Search Console account."}
        </div>
      </div>
    </div>
  );
}
