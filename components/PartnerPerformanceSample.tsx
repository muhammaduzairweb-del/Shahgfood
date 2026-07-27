"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
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

const BLUE = "#1B66C9";
const PURPLE = "#5E1A86";
const INK = "#202124";
const AXIS_W = 34;

type Period = "24h" | "7d" | "28d" | "3m";

interface PeriodConfig {
  id: Period;
  en: string;
  ur: string;
  mult: number;
  ctr: string;
  pos: string;
}

const PERIODS: PeriodConfig[] = [
  { id: "24h", en: "24 hours", ur: "24 گھنٹے", mult: 1, ctr: "9.8%", pos: "1.8" },
  { id: "7d", en: "7 days", ur: "7 دن", mult: 6.8, ctr: "9.5%", pos: "2.1" },
  { id: "28d", en: "28 days", ur: "28 دن", mult: 24, ctr: "9.3%", pos: "2.4" },
  { id: "3m", en: "3 months", ur: "3 مہینے", mult: 68, ctr: "9.1%", pos: "2.6" },
];

// Realistic hourly GSC performance curve data
const BASE_CLICKS = [100, 380, 100, 820, 240, 820, 0, 500, 680, 0, 0, 480, 620, 300, 180, 0];
const BASE_IMPR = [2600, 4800, 5800, 5200, 5200, 3200, 6800, 8100, 9100, 6200, 3600, 6200, 9000, 3200, 2100, 0];

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(Math.round(n));
}

function getPoints(values: number[], max: number, w: number, h: number): [number, number][] {
  const step = w / (values.length - 1);
  return values.map((v, i) => [i * step, h - (v / (max || 1)) * h]);
}

// Rock-solid smooth SVG Bézier path generator
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

export default function PartnerPerformanceSample({ ur }: { ur?: boolean }) {
  const [period, setPeriod] = useState<Period>("24h");
  const [hover, setHover] = useState<number | null>(null);
  const [showClicks, setShowClicks] = useState<boolean>(true);
  const [showImpr, setShowImpr] = useState<boolean>(true);
  const [now, setNow] = useState<Date | null>(null);

  const chartRef = useRef<HTMLDivElement>(null);
  const windowWidth = useWidth();
  const isNarrow = windowWidth < 860;

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const p = PERIODS.find((x) => x.id === period)!;

  // Real-time Search Console 4-hour delay calculations
  const timeData = useMemo(() => {
    const currentDate = now || new Date();
    const lagHours = 4;
    const lastUpdateDate = new Date(currentDate.getTime() - lagHours * 60 * 60 * 1000);

    const ticks: { label: string; dateSub?: string }[] = [];
    const totalTicks = 12;

    for (let i = totalTicks - 1; i >= 0; i--) {
      const tickTime = new Date(lastUpdateDate.getTime() - i * 2 * 60 * 60 * 1000);
      let hours = tickTime.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const timeStr = `${hours} ${ampm}`;

      if (i === totalTicks - 1) {
        const month = tickTime.getMonth() + 1;
        const day = tickTime.getDate();
        const year = String(tickTime.getFullYear()).slice(-2);
        ticks.push({ label: timeStr, dateSub: `${month}/${day}/${year}` });
      } else {
        ticks.push({ label: timeStr });
      }
    }

    return {
      ticks,
      lastUpdateText: ur ? "آخری اپڈیٹ: 4 گھنٹے پہلے" : "Last update: 4 hours ago",
    };
  }, [now, ur]);

  const W = 680;
  const H = 210;
  const n = BASE_CLICKS.length;
  const solidCount = 12;

  const clicksScaled = useMemo(() => BASE_CLICKS.map((v) => Math.round(v * p.mult)), [p.mult]);
  const imprScaled = useMemo(() => BASE_IMPR.map((v) => Math.round(v * p.mult)), [p.mult]);

  const clicksMax = 1000;
  const imprMax = 10000;

  const clicksPts = getPoints(clicksScaled, clicksMax, W, H);
  const imprPts = getPoints(imprScaled, imprMax, W, H);

  const clicksSolid = smoothPath(clicksPts.slice(0, solidCount + 1));
  const imprSolid = smoothPath(imprPts.slice(0, solidCount + 1));
  const clicksDot = smoothPath(clicksPts.slice(solidCount));
  const imprDot = smoothPath(imprPts.slice(solidCount));

  const totalClicksVal = period === "24h" ? "9.68K" : fmt(clicksScaled.reduce((a, b) => a + b, 0));
  const totalImprVal = period === "24h" ? "98.8K" : fmt(imprScaled.reduce((a, b) => a + b, 0));

  const handleMove = (e: React.MouseEvent) => {
    const el = chartRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setHover(Math.min(n - 1, Math.max(0, Math.round(frac * (n - 1)))));
  };

  const navItem = (Icon: any, label: string, active?: boolean) => (
    <div
      key={label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "9px 14px",
        borderRadius: active ? "0 20px 20px 0" : 0,
        background: active ? "#E8F0FE" : "transparent",
        color: active ? BLUE : "#9AA0A6",
        fontWeight: active ? 700 : 500,
        fontSize: 13.5,
        cursor: active ? "pointer" : "not-allowed",
        pointerEvents: active ? "auto" : "none",
        opacity: active ? 1 : 0.65,
      }}
    >
      <Icon size={14} color={active ? BLUE : "#9AA0A6"} />
      <span>{label}</span>
    </div>
  );

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #DADCE0",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: isNarrow ? "column" : "row",
        fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif",
      }}
    >
      {/* SIDEBAR */}
      {!isNarrow && (
        <div style={{ flex: "none", width: 210, background: "#F8F9FA", borderInlineEnd: "1px solid #DADCE0", padding: "18px 0 18px 0" }}>
          {/* LOGO MATCHING SCREENSHOT (#7E0A3F BURGUNDY) */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px 16px", borderBottom: "1px solid #DADCE0", marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#7E0A3F", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flex: "none" }}>
              SG
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: INK, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              shahgfood.com
            </div>
            <FaChevronDown size={10} color="#70757A" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {navItem(FaHome, ur ? "جائزہ" : "Overview", false)}
            {navItem(FaLightbulb, ur ? "بصیرت" : "Insights", false)}
            {navItem(FaChartLine, ur ? "کارکردگی" : "Performance", true)}
            {navItem(FaSearch, ur ? "یو آر ایل معائنہ" : "URL inspection", false)}
          </div>

          <div style={{ marginTop: 14, padding: "0 16px", fontSize: 11, fontWeight: 700, color: "#9AA0A6", display: "flex", alignItems: "center", justifyContent: "space-between", letterSpacing: "0.5px" }}>
            {ur ? "انڈیکسنگ" : "Indexing"} <FaChevronDown size={9} color="#9AA0A6" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}>
            {navItem(FaFileAlt, ur ? "صفحات" : "Pages", false)}
            {navItem(FaSitemap, ur ? "سائٹ میپس" : "Sitemaps", false)}
            {navItem(FaEyeSlash, ur ? "ہٹائے گئے" : "Removals", false)}
          </div>

          <div style={{ marginTop: 14, padding: "0 16px", fontSize: 11, fontWeight: 700, color: "#9AA0A6", display: "flex", alignItems: "center", justifyContent: "space-between", letterSpacing: "0.5px" }}>
            {ur ? "تجربہ" : "Experience"} <FaChevronDown size={9} color="#9AA0A6" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}>
            {navItem(FaTachometerAlt, ur ? "کور ویب وائٹلز" : "Core Web Vitals", false)}
            {navItem(FaLock, ur ? "HTTPS" : "HTTPS", false)}
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, minWidth: 0, padding: isNarrow ? "16px 12px" : "24px 24px 20px" }}>
        
        {/* TOP TITLE */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 500, color: INK }}>
            {ur ? "کارکردگی" : "Performance"}
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#3C4043", cursor: "pointer" }}>
            <FaDownload size={12} /> {ur ? "ایکسپورٹ" : "EXPORT"}
          </span>
        </div>

        {/* PERIOD SELECTOR & FILTERS */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {PERIODS.map((pd) => (
            <button
              key={pd.id}
              type="button"
              onClick={() => setPeriod(pd.id)}
              style={{
                cursor: "pointer",
                fontSize: 12.5,
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: 999,
                background: period === pd.id ? "#C2E7FF" : "#fff",
                color: period === pd.id ? "#001D35" : "#3C4043",
                border: period === pd.id ? "1.5px solid #001D35" : "1px solid #DADCE0",
              }}
            >
              {period === pd.id ? "✓ " : ""}
              {ur ? pd.ur : pd.en}
            </button>
          ))}
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#3C4043", border: "1px solid #DADCE0", borderRadius: 999, padding: "6px 12px" }}>
            <FaFilter size={10} /> {ur ? "ویب سرچ" : "Search type: Web"}
          </span>
        </div>

        {/* LAST UPDATE TIMESTAMP */}
        <div style={{ fontSize: 12, color: "#5F6368", textAlign: "end", marginBottom: 14 }}>
          {timeData.lastUpdateText}
        </div>

        {/* METRICS TOGGLE CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isNarrow ? "repeat(2, 1fr)" : "repeat(4, 1fr) 100px",
            gap: 0,
            marginBottom: 20,
            border: "1px solid #DADCE0",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {/* TOTAL CLICKS CARD */}
          <div
            onClick={() => setShowClicks(!showClicks)}
            style={{
              cursor: "pointer",
              borderInlineEnd: "1px solid #DADCE0",
              background: showClicks ? BLUE : "#fff",
              color: showClicks ? "#ffffff" : INK,
              padding: "14px 16px",
              userSelect: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: showClicks ? "#ffffff" : "#5F6368" }}>
              <span style={{ width: 14, height: 14, borderRadius: 2, border: `1.5px solid ${showClicks ? "#ffffff" : "#5F6368"}`, background: showClicks ? "#ffffff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: BLUE, fontSize: 10, fontWeight: 800 }}>
                {showClicks ? "✓" : ""}
              </span>
              {ur ? "کل کلکس" : "Total clicks"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, marginTop: 4 }}>{totalClicksVal}</div>
          </div>

          {/* TOTAL IMPRESSIONS CARD */}
          <div
            onClick={() => setShowImpr(!showImpr)}
            style={{
              cursor: "pointer",
              borderInlineEnd: "1px solid #DADCE0",
              background: showImpr ? PURPLE : "#fff",
              color: showImpr ? "#ffffff" : INK,
              padding: "14px 16px",
              userSelect: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: showImpr ? "#ffffff" : "#5F6368" }}>
              <span style={{ width: 14, height: 14, borderRadius: 2, border: `1.5px solid ${showImpr ? "#ffffff" : "#5F6368"}`, background: showImpr ? "#ffffff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: PURPLE, fontSize: 10, fontWeight: 800 }}>
                {showImpr ? "✓" : ""}
              </span>
              {ur ? "کل امپریشنز" : "Total impressions"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, marginTop: 4 }}>{totalImprVal}</div>
          </div>

          {/* AVERAGE CTR */}
          <div style={{ borderInlineEnd: "1px solid #DADCE0", background: "#fff", padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: "#5F6368" }}>
              <span style={{ width: 14, height: 14, borderRadius: 2, border: "1.5px solid #5F6368", background: "transparent" }} />
              {ur ? "اوسط CTR" : "Average CTR"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, color: INK, marginTop: 4 }}>{p.ctr}</div>
          </div>

          {/* AVERAGE POSITION */}
          <div style={{ background: "#fff", padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: "#5F6368" }}>
              <span style={{ width: 14, height: 14, borderRadius: 2, border: "1.5px solid #5F6368", background: "transparent" }} />
              {ur ? "اوسط پوزیشن" : "Average position"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, color: INK, marginTop: 4 }}>{p.pos}</div>
          </div>

          {/* HOURLY DROPDOWN */}
          {!isNarrow && (
            <div style={{ borderInlineStart: "1px solid #DADCE0", background: "#fff", padding: "14px 12px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
              <div style={{ border: "1px solid #DADCE0", borderRadius: 16, padding: "4px 10px", fontSize: 12, color: "#3C4043", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                Hourly <FaChevronDown size={8} />
              </div>
            </div>
          )}
        </div>

        {/* CHART SECTION */}
        <div style={{ display: "flex", gap: 6, height: H, position: "relative" }}>
          
          {/* LEFT Y-AXIS (CLICKS) */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: AXIS_W, height: H, fontSize: 10, color: "#5F6368", textAlign: "end", flex: "none" }}>
            <span>Clicks</span>
            <span>1K</span>
            <span>900</span>
            <span>800</span>
            <span>700</span>
            <span>600</span>
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>

          {/* GRAPH SVG CONTAINER */}
          <div
            ref={chartRef}
            onMouseMove={handleMove}
            onMouseLeave={() => setHover(null)}
            style={{ flex: 1, minWidth: 280, height: H, position: "relative", cursor: "crosshair" }}
          >
            <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
              {/* Horizontal Grid Lines */}
              {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((ratio, idx) => (
                <line key={idx} x1={0} y1={H * ratio} x2={W} y2={H * ratio} stroke="#E8EAED" strokeWidth={1} />
              ))}

              {/* Purple Impressions Line */}
              {showImpr && (
                <>
                  <path d={imprSolid} fill="none" stroke={PURPLE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d={imprDot} fill="none" stroke={PURPLE} strokeWidth={2.2} strokeLinecap="round" strokeDasharray="3 4" />
                </>
              )}

              {/* Blue Clicks Line */}
              {showClicks && (
                <>
                  <path d={clicksSolid} fill="none" stroke={BLUE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d={clicksDot} fill="none" stroke={BLUE} strokeWidth={2.2} strokeLinecap="round" strokeDasharray="3 4" />
                </>
              )}

              {/* Hover Cursor and Nodes */}
              {hover !== null && (
                <>
                  <line x1={clicksPts[hover][0]} y1={0} x2={clicksPts[hover][0]} y2={H} stroke="#BDC1C6" strokeWidth={1} />
                  {showImpr && <circle cx={imprPts[hover][0]} cy={imprPts[hover][1]} r={4} fill="#fff" stroke={PURPLE} strokeWidth={2} />}
                  {showClicks && <circle cx={clicksPts[hover][0]} cy={clicksPts[hover][1]} r={4} fill="#fff" stroke={BLUE} strokeWidth={2} />}
                </>
              )}
            </svg>

            {/* Hover Tooltip */}
            {hover !== null && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: `min(max(${(hover / (n - 1)) * 100}%, 80px), calc(100% - 80px))`,
                  transform: "translateX(-50%)",
                  background: "#ffffff",
                  border: "1px solid #DADCE0",
                  borderRadius: 8,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                  padding: "8px 12px",
                  fontSize: 11.5,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                <div style={{ fontWeight: 700, color: INK, marginBottom: 3 }}>
                  {timeData.ticks[hover]?.label || ""}
                </div>
                {showClicks && <div style={{ color: BLUE, fontWeight: 600 }}>{ur ? "کلکس" : "Clicks"}: {fmt(clicksScaled[hover])}</div>}
                {showImpr && <div style={{ color: PURPLE, fontWeight: 600 }}>{ur ? "امپریشنز" : "Impressions"}: {fmt(imprScaled[hover])}</div>}
              </div>
            )}
          </div>

          {/* RIGHT Y-AXIS (IMPRESSIONS) */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: AXIS_W, height: H, fontSize: 10, color: "#5F6368", flex: "none" }}>
            <span>Impressions</span>
            <span>10K</span>
            <span>9K</span>
            <span>8K</span>
            <span>7K</span>
            <span>6K</span>
            <span>5K</span>
            <span>4K</span>
            <span>3K</span>
            <span>2K</span>
            <span>1K</span>
            <span>0</span>
          </div>
        </div>

        {/* X-AXIS TIMELINE LABELS */}
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <div style={{ width: AXIS_W, flex: "none" }} />
          <div style={{ flex: 1, minWidth: 280, display: "flex", justifyContent: "space-between", fontSize: 10, color: "#5F6368" }}>
            {timeData.ticks.map((t, i) => (
              <span key={i} style={{ textAlign: "center" }}>
                {t.label}
                {t.dateSub && <><br />{t.dateSub}</>}
              </span>
            ))}
          </div>
          <div style={{ width: AXIS_W, flex: "none" }} />
        </div>

      </div>
    </div>
  );
}