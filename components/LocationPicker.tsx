"use client";

import { useMemo, useState } from "react";
import { BRANCHES } from "@/lib/data";
import { EXTRA } from "@/lib/i18n-extra";
import { useApp } from "@/components/AppProvider";

const RED = "#C1272D";

function haversine(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

export default function LocationPicker() {
  const { lang, setBranch, setArea, setLocated } = useApp();
  const x = EXTRA[lang];
  const ur = lang === "ur";
  const [city, setCity] = useState<"Islamabad" | "Rawalpindi">("Islamabad");
  const [selected, setSelected] = useState<string>("");
  const [detecting, setDetecting] = useState(false);

  const inCity = useMemo(() => BRANCHES.filter((b) => b.city === city), [city]);

  const detect = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let best = BRANCHES[0];
        let bestD = Infinity;
        for (const b of BRANCHES) {
          const d = haversine(latitude, longitude, b.lat, b.lng);
          if (d < bestD) {
            bestD = d;
            best = b;
          }
        }
        setCity(best.city);
        setSelected(best.name);
        setDetecting(false);
      },
      () => setDetecting(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const confirm = (branchName: string) => {
    setBranch(branchName);
    setArea(branchName);
    setLocated(true);
  };

  return (
    <div dir={ur ? "rtl" : "ltr"} style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fade .2s ease" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(30,18,10,.6)", backdropFilter: "blur(3px)" }} />
      <div style={{ position: "relative", width: "min(460px,100%)", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", background: "#F7F3EB", borderRadius: 26, boxShadow: "0 40px 90px -20px rgba(0,0,0,.5)", animation: "rise .3s ease" }}>
        <div style={{ background: "linear-gradient(150deg,#C1272D,#8E1B12)", padding: "26px 26px 22px", color: "#fff", textAlign: "center" }}>
          <div style={{ fontSize: 34 }}>📍</div>
          <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 24, marginTop: 6 }}>{x.locTitle}</div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.85)", marginTop: 8, lineHeight: 1.6 }}>{x.locDesc}</div>
        </div>

        <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }} className="noscroll">
          <button onClick={detect} disabled={detecting} style={{ cursor: "pointer", border: `1.5px solid ${RED}`, background: "#FCF2F1", color: RED, fontWeight: 800, fontSize: 15, fontFamily: "inherit", padding: 14, borderRadius: 13 }}>
            {detecting ? x.locDetecting : x.locDetect}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#B0A692", fontSize: 12, fontWeight: 700 }}>
            <div style={{ flex: 1, height: 1, background: "#E0D6C4" }} />
            {x.locOr}
            <div style={{ flex: 1, height: 1, background: "#E0D6C4" }} />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {(["Islamabad", "Rawalpindi"] as const).map((c) => {
              const on = city === c;
              return (
                <div key={c} onClick={() => { setCity(c); setSelected(""); }} style={{ cursor: "pointer", flex: 1, textAlign: "center", padding: 11, borderRadius: 12, fontSize: 13.5, fontWeight: 700, border: `1.5px solid ${on ? RED : "#E7DECD"}`, background: on ? "#FCF2F1" : "#fff", color: on ? RED : "#5A5245" }}>{c}</div>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 220, overflowY: "auto" }} className="noscroll">
            {inCity.map((b) => {
              const on = selected === b.name;
              return (
                <div key={b.name} onClick={() => setSelected(b.name)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, border: `1.5px solid ${on ? RED : "#EAE1D2"}`, background: on ? "#FCF2F1" : "#fff", borderRadius: 13, padding: "12px 14px" }}>
                  <span style={{ fontSize: 17 }}>◉</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 800 }}>{b.name}</div>
                    <div style={{ fontSize: 11.5, color: "#8A8072" }}>{b.address}</div>
                  </div>
                  {on && <span style={{ color: RED, fontWeight: 800 }}>✓</span>}
                </div>
              );
            })}
          </div>

          <button onClick={() => confirm(selected || inCity[0].name)} style={{ cursor: "pointer", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 15, borderRadius: 14, boxShadow: "0 12px 24px -10px rgba(193,39,45,.7)" }}>
            {x.locConfirm}
          </button>
          <div onClick={() => setLocated(true)} style={{ cursor: "pointer", textAlign: "center", fontSize: 13, fontWeight: 700, color: "#8A8072" }}>{x.locSkip}</div>
        </div>
      </div>
    </div>
  );
}
