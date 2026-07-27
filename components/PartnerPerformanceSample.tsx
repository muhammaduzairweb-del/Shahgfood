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

const BLUE = "#1B66C9";
const PURPLE = "#5E1A86";
const INK = "#202124";
const AXIS_W = 36;

type Period = "24h" | "7d" | "28d" | "3m";

interface PeriodConfig {
  id: Period;
  en: string;
  ur: string;
  mult: number;
}

const PERIODS: PeriodConfig[] = [
  { id: "24h", en: "24 hours", ur: "24 گھنٹے", mult: 1 },
  { id: "7d", en: "7 days", ur: "7 دن", mult: 7.2 },
  { id: "28d", en: "28 days", ur: "28 دن", mult: 28.5 },
  { id: "3m", en: "3 months", ur: "3 مہینے", mult: 91 },
];

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(Math.round(n));
}

function getPoints(values: number[], max: number, w: number, h: number): [number, number][] {
  const step = w / (values.length - 1);
  return values.map((v, i) => [i * step, h - (v / (max || 1)) * h]);
}

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

// Detailed hourly traffic rules
function getTrafficForHour(hr: number, idx: number) {
  // 1. NIGHT DROP (3 AM to 7 AM): Extremely low traffic (30 - 40 clicks)
  if (hr >= 3 && hr < 7) {
    const clicks = 30 + ((hr * 3 + idx * 7) % 11); // Range: 30 to 40 clicks
    const impr = clicks * 10 + ((idx * 13) % 50);  // Range: 300 to 450 impressions
    return { clicks, impr };
  }

  // 2. PEAK NIGHT FOOD TRAFFIC (8 PM to 2 AM -> Hours 20, 21, 22, 23, 0, 1)
  if (hr >= 20 || hr <= 1) {
    const clicks = 820 + ((hr * 17 + idx * 31) % 160); // Range: 820 to 980 clicks
    const impr = clicks * 10 + 200 + ((idx * 83) % 400); // Range: 8,400 to 10,200 impressions
    return { clicks, impr };
  }

  // 3. TRANSITION HOUR (2 AM to 3 AM)
  if (hr === 2) {
    const clicks = 120 + ((idx * 11) % 35); // Range: 120 to 155 clicks
    const impr = clicks * 10 + 100;
    return { clicks, impr };
  }

  // 4. LUNCH TIME PEAK (12 PM to 3 PM)
  if (hr >= 12 && hr <= 14) {
    const clicks = 510 + ((hr * 19 + idx * 23) % 140); // Range: 510 to 650 clicks
    const impr = clicks * 10 + 250;
    return { clicks, impr };
  }

  // 5. MORNING RAMP UP (7 AM to 12 PM)
  if (hr >= 7 && hr < 12) {
    const progress = (hr - 7) / 5;
    const clicks = Math.round(90 + progress * 350 + ((idx * 13) % 30));
    const impr = clicks * 10 + 150;
    return { clicks, impr };
  }

  // 6. AFTERNOON (3 PM to 8 PM)
  const progress = (hr - 15) / 5;
  const clicks = Math.round(410 + progress * 360 + ((idx * 17) % 40));
  const impr = clicks * 10 + 200;
  return { clicks, impr };
}

export default function PartnerPerformanceSample({ ur }: { ur?: boolean }) {
  const [period, setPeriod] = useState<Period>("24h");
  const [hover, setHover] = useState<number | null>(null);
  const [showClicks, setShowClicks] = useState<boolean>(true);
  const [showImpr, setShowImpr] = useState<boolean>(true);
  const [now, setNow] = useState<Date | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(1024);

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNow(new Date());
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    const interval = setInterval(() => setNow(new Date()), 30000);

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isNarrow = windowWidth < 860;
  const currentPeriod = PERIODS.find((x) => x.id === period)!;

  // Strict & Unified Real-time Math Engine
  const dynamicMetrics = useMemo(() => {
    const d = now || new Date();
    const LAG_HOURS = 3; // Fixed 3 hour latency for Search Console

    const updateText = ur 
      ? `آخری اپڈیٹ: ${LAG_HOURS} گھنٹے پہلے` 
      : `Last update: ${LAG_HOURS} hours ago`;

    const posBase = 2.4 + (d.getHours() % 4) * 0.1;
    const ctrBase = 9.1 + (d.getHours() % 3) * 0.2;

    const clicksArr: number[] = [];
    const imprArr: number[] = [];
    const timeTicks: { label: string; dateSub?: string }[] = [];

    const totalPoints = 16;
    // Rightmost point (index 15) is EXACTLY (now - 3 hours)
    const baseTime = new Date(d.getTime() - LAG_HOURS * 3600 * 1000);

    // Loop from oldest point (left) to newest point (right)
    for (let k = totalPoints - 1; k >= 0; k--) {
      const ptTime = new Date(baseTime.getTime() - k * 90 * 60 * 1000);
      const hr = ptTime.getHours();

      const { clicks, impr } = getTrafficForHour(hr, k);

      clicksArr.push(clicks);
      imprArr.push(impr);

      let displayHr = hr % 12 || 12;
      const ampm = hr >= 12 ? "PM" : "AM";
      const timeStr = `${displayHr} ${ampm}`;

      // Attach date subtext to rightmost edge (index 15)
      if (k === 0) {
        const month = ptTime.getMonth() + 1;
        const day = ptTime.getDate();
        const year = String(ptTime.getFullYear()).slice(-2);
        timeTicks.push({ label: timeStr, dateSub: `${month}/${day}/${year}` });
      } else {
        timeTicks.push({ label: timeStr });
      }
    }

    return {
      updateText,
      clicksArr,
      imprArr,
      timeTicks,
      position: posBase.toFixed(1),
      ctr: `${ctrBase.toFixed(1)}%`,
    };
  }, [now, ur]);

  const W = 680;
  const H = 210;
  const solidCount = 12;

  const clicksScaled = useMemo(
    () => dynamicMetrics.clicksArr.map((v) => Math.round(v * currentPeriod.mult)),
    [dynamicMetrics.clicksArr, currentPeriod.mult]
  );
  const imprScaled = useMemo(
    () => dynamicMetrics.imprArr.map((v) => Math.round(v * currentPeriod.mult)),
    [dynamicMetrics.imprArr, currentPeriod.mult]
  );

  const clicksMax = Math.max(...clicksScaled) * 1.25;
  const imprMax = Math.max(...imprScaled) * 1.25;

  const clicksPts = getPoints(clicksScaled, clicksMax, W, H);
  const imprPts = getPoints(imprScaled, imprMax, W, H);

  const clicksSolid = smoothPath(clicksPts.slice(0, solidCount + 1));
  const imprSolid = smoothPath(imprPts.slice(0, solidCount + 1));
  const clicksDot = smoothPath(clicksPts.slice(solidCount));
  const imprDot = smoothPath(imprPts.slice(solidCount));

  const totalClicksVal = fmt(clicksScaled.reduce((a, b) => a + b, 0));
  const totalImprVal = fmt(imprScaled.reduce((a, b) => a + b, 0));

  const handleMove = (e: React.MouseEvent) => {
    const el = chartRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setHover(Math.min(clicksScaled.length - 1, Math.max(0, Math.round(frac * (clicksScaled.length - 1)))));
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
        color: active ? BLUE : "#5F6368",
        fontWeight: active ? 700 : 500,
        fontSize: 13.5,
        cursor: active ? "pointer" : "default",
      }}
    >
      <Icon size={14} color={active ? BLUE : "#5F6368"} />
      <span>{label}</span>
    </div>
  );

  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto" }}>
      {/* EXACT HEADING AS REQUESTED */}
      

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #DADCE0",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: isNarrow ? "column" : "row",
          fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif",
          boxShadow: "0 1px 3px rgba(60,64,67,0.08)",
        }}
      >
        {/* SIDEBAR */}
        {!isNarrow && (
          <div style={{ flex: "none", width: 220, background: "#F8F9FA", borderInlineEnd: "1px solid #DADCE0", padding: "18px 0" }}>
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

            <div style={{ marginTop: 14, padding: "0 16px", fontSize: 11, fontWeight: 700, color: "#70757A", display: "flex", alignItems: "center", justifyContent: "space-between", letterSpacing: "0.5px" }}>
              {ur ? "انڈیکسنگ" : "Indexing"} <FaChevronDown size={9} color="#70757A" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}>
              {navItem(FaFileAlt, ur ? "صفحات" : "Pages", false)}
              {navItem(FaSitemap, ur ? "سائٹ میپس" : "Sitemaps", false)}
              {navItem(FaEyeSlash, ur ? "ہٹائے گئے" : "Removals", false)}
            </div>

            <div style={{ marginTop: 14, padding: "0 16px", fontSize: 11, fontWeight: 700, color: "#70757A", display: "flex", alignItems: "center", justifyContent: "space-between", letterSpacing: "0.5px" }}>
              {ur ? "تجربہ" : "Experience"} <FaChevronDown size={9} color="#70757A" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}>
              {navItem(FaTachometerAlt, ur ? "کور ویب وائٹلز" : "Core Web Vitals", false)}
              {navItem(FaLock, ur ? "HTTPS" : "HTTPS", false)}
            </div>
          </div>
        )}

        {/* MAIN PANEL */}
        <div style={{ flex: 1, minWidth: 0, padding: isNarrow ? "16px 12px" : "24px 24px 20px" }}>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 22, fontWeight: 500, color: INK }}>
              {ur ? "کارکردگی" : "Performance"}
            </div>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#3C4043", cursor: "pointer" }}>
              <FaDownload size={12} /> {ur ? "ایکسپورٹ" : "Export."}
            </span>
          </div>

          {/* FILTERS */}
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
                  transition: "all 0.15s ease",
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
            {dynamicMetrics.updateText}
          </div>

          {/* CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isNarrow ? "repeat(2, 1fr)" : "repeat(4, 1fr) 90px",
              gap: 0,
              marginBottom: 20,
              border: "1px solid #DADCE0",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {/* CLICKS CARD */}
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

            {/* IMPRESSIONS CARD */}
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
                {ur ? "کل امپریشنز" : "All the motifs"}
              </div>
              <div style={{ fontSize: 28, fontWeight: 500, marginTop: 4 }}>{totalImprVal}</div>
            </div>

            {/* CTR CARD */}
            <div style={{ borderInlineEnd: "1px solid #DADCE0", background: "#fff", padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: "#5F6368" }}>
                <span style={{ width: 14, height: 14, borderRadius: 2, border: "1.5px solid #5F6368", background: "transparent" }} />
                {ur ? "اوسط CTR" : "Middle CTR"}
              </div>
              <div style={{ fontSize: 28, fontWeight: 500, color: INK, marginTop: 4 }}>{dynamicMetrics.ctr}</div>
            </div>

            {/* POSITION CARD */}
            <div style={{ background: "#fff", padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: "#5F6368" }}>
                <span style={{ width: 14, height: 14, borderRadius: 2, border: "1.5px solid #5F6368", background: "transparent" }} />
                {ur ? "اوسط پوزیشن" : "Average position"}
              </div>
              <div style={{ fontSize: 28, fontWeight: 500, color: INK, marginTop: 4 }}>{dynamicMetrics.position}</div>
            </div>

            {!isNarrow && (
              <div style={{ borderInlineStart: "1px solid #DADCE0", background: "#fff", padding: "14px 10px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                <div style={{ border: "1px solid #DADCE0", borderRadius: 16, padding: "4px 10px", fontSize: 12, color: "#3C4043", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  Per hour <FaChevronDown size={8} />
                </div>
              </div>
            )}
          </div>

          {/* CHART */}
          <div style={{ display: "flex", gap: 6, height: H, position: "relative" }}>
            
            {/* Y-AXIS (CLICKS) */}
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

            {/* SVG SVG GRAPH */}
            <div
              ref={chartRef}
              onMouseMove={handleMove}
              onMouseLeave={() => setHover(null)}
              style={{ flex: 1, minWidth: 280, height: H, position: "relative", cursor: "crosshair" }}
            >
              <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
                {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((ratio, idx) => (
                  <line key={idx} x1={0} y1={H * ratio} x2={W} y2={H * ratio} stroke="#E8EAED" strokeWidth={1} />
                ))}

                {showImpr && (
                  <>
                    <path d={imprSolid} fill="none" stroke={PURPLE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d={imprDot} fill="none" stroke={PURPLE} strokeWidth={2.2} strokeLinecap="round" strokeDasharray="3 4" />
                  </>
                )}

                {showClicks && (
                  <>
                    <path d={clicksSolid} fill="none" stroke={BLUE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d={clicksDot} fill="none" stroke={BLUE} strokeWidth={2.2} strokeLinecap="round" strokeDasharray="3 4" />
                  </>
                )}

                {hover !== null && (
                  <>
                    <line x1={clicksPts[hover][0]} y1={0} x2={clicksPts[hover][0]} y2={H} stroke="#BDC1C6" strokeWidth={1} />
                    {showImpr && <circle cx={imprPts[hover][0]} cy={imprPts[hover][1]} r={4} fill="#fff" stroke={PURPLE} strokeWidth={2} />}
                    {showClicks && <circle cx={clicksPts[hover][0]} cy={clicksPts[hover][1]} r={4} fill="#fff" stroke={BLUE} strokeWidth={2} />}
                  </>
                )}
              </svg>

              {/* TOOLTIP */}
              {hover !== null && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: `min(max(${(hover / (clicksScaled.length - 1)) * 100}%, 80px), calc(100% - 80px))`,
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
                    {dynamicMetrics.timeTicks[hover]?.label || ""}
                  </div>
                  {showClicks && <div style={{ color: BLUE, fontWeight: 600 }}>{ur ? "کلکس" : "Clicks"}: {fmt(clicksScaled[hover])}</div>}
                  {showImpr && <div style={{ color: PURPLE, fontWeight: 600 }}>{ur ? "امپریشنز" : "Impressions"}: {fmt(imprScaled[hover])}</div>}
                </div>
              )}
            </div>

            {/* Y-AXIS (MOTIFS / IMPRESSIONS) */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: AXIS_W, height: H, fontSize: 10, color: "#5F6368", flex: "none" }}>
              <span>Motifs</span>
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
              {dynamicMetrics.timeTicks.map((t, i) => (
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
    </div>
  );
}