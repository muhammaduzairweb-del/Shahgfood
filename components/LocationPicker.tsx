"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { BRANCHES, cityFromCoords, matchCoverage, type City } from "@/lib/data";
import { getPrecisePosition, reverseGeocode } from "@/lib/geo";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { FaCrosshairs, FaMapMarkerAlt, FaHome, FaHandPointer } from "react-icons/fa";

const MapPicker = dynamic(() => import("@/components/MapPicker"), { ssr: false });

const RED = "#C1272D";
const PURPLE = "#5E1A86";

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
  const { setBranch, setArea, setLocated, setPickerOpen, setCity: setGlobalCity } = useApp();
  const isMobile = useWidth() < 760;

  const [detecting, setDetecting] = useState(false);
  const [label, setLabel] = useState("");
  const [house, setHouse] = useState("");
  const [geoError, setGeoError] = useState("");
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [nearest, setNearest] = useState<{ name: string; city: City } | null>(null);
  // the city we resolved the pin to: a served city, or "other" = outside coverage
  const [served, setServed] = useState<City | "other" | null>(null);
  const houseRef = useRef<HTMLInputElement>(null);

  // shared for GPS fix and map pin: nearest branch (internal) + exact street address
  const applyCoords = async (latitude: number, longitude: number) => {
    let best = BRANCHES[0];
    let bestD = Infinity;
    for (const b of BRANCHES) {
      const d = haversine(latitude, longitude, b.lat, b.lng);
      if (d < bestD) { bestD = d; best = b; }
    }
    setNearest({ name: best.name, city: best.city });
    setPin({ lat: latitude, lng: longitude });
    setGeoError("");
    // reverse-geocode → exact street address; house number only exists where
    // OpenStreetMap has it mapped, hence the manual house field below
    try {
      const r = await reverseGeocode(latitude, longitude);
      setLabel(r.label);
      // the ADMIN REGION decides coverage: border towns (Khanpur ~18 km from
      // B-17) are physically close but in a different province — not served
      setServed(matchCoverage(r) ?? "other");
      // map data rarely carries house numbers here, hand the cursor to the
      // house field so the user completes the address in one step
      if (!/house/i.test(r.label) && !house.trim()) houseRef.current?.focus();
    } catch {
      setLabel(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      setServed(cityFromCoords(latitude, longitude) ?? "other");
      houseRef.current?.focus();
    }
  };

  const detect = async () => {
    setGeoError("");
    if (!navigator.geolocation) {
      setGeoError("Your browser does not support location. Tap your spot on the map instead.");
      return;
    }
    setDetecting(true);
    try {
      // LIVE tracking: watches the GPS as it warms up, keeps the best fix
      const pos = await getPrecisePosition(50, 15000);
      await applyCoords(pos.coords.latitude, pos.coords.longitude);
    } catch {
      setGeoError(
        "We could not get your location. Just tap your spot on the map instead."
      );
    }
    setDetecting(false);
  };

  const finalAddress = () => {
    const h = house.trim();
    if (!h) return label;
    const prefix = `House ${h}`;
    // don't double-add if OSM already returned a house number
    return label && !label.toLowerCase().includes("house")
      ? `${prefix}, ${label}`
      : label || prefix;
  };

  const canConfirm = !!(pin || label);

  const confirm = () => {
    const branchName = nearest?.name || BRANCHES[0].name;
    setBranch(branchName);
    // honest coverage: outside our cities → "other", so the homepage shows
    // that we do not deliver there yet
    setGlobalCity(served ?? (nearest ? nearest.city : ""));
    setArea(finalAddress() || branchName);
    setLocated(true);
    setPickerOpen(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? 0 : 22, animation: "fade .2s ease" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(24,12,30,.62)", backdropFilter: "blur(4px)" }} />

      <div
        style={{
          position: "relative",
          width: isMobile ? "100%" : "min(940px,100%)",
          height: isMobile ? "100dvh" : "min(620px,94vh)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          overflow: "hidden",
          background: "#F7F3EB",
          borderRadius: isMobile ? 0 : 28,
          boxShadow: "0 48px 110px -24px rgba(0,0,0,.6)",
          animation: "rise .32s ease",
        }}
      >
        {/* MAP, the star of the show */}
        <div style={{ position: "relative", flex: isMobile ? "1 1 auto" : "1.25 1 0%", minHeight: isMobile ? 240 : undefined }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <MapPicker initial={pin} onPick={(lat, lng) => applyCoords(lat, lng)} height="100%" />
          </div>
          {/* floating hint */}
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 14, zIndex: 500, background: "rgba(22,14,26,.82)", color: "#fff", fontSize: 12.5, fontWeight: 700, padding: "9px 16px", borderRadius: 999, whiteSpace: "nowrap", backdropFilter: "blur(4px)", pointerEvents: "none" }}>
            <FaHandPointer size={13} style={{ marginInlineEnd: 7, verticalAlign: "-2px" }} />Tap the map or drag the pin to your exact spot
          </div>
          {/* skip (X) over the map on mobile */}
          {isMobile && (
            <button onClick={() => { setLocated(true); setPickerOpen(false); }} aria-label="skip" style={{ position: "absolute", top: 12, insetInlineEnd: 12, zIndex: 500, width: 38, height: 38, borderRadius: "50%", border: "none", background: "rgba(22,14,26,.72)", color: "#fff", fontSize: 17, cursor: "pointer", backdropFilter: "blur(4px)" }}>✕</button>
          )}
        </div>

        {/* CONTROLS */}
        <div style={{ flex: isMobile ? "none" : "1 1 0%", display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* header */}
          <div style={{ background: `linear-gradient(135deg,${PURPLE},#8E1E7C 55%,#B71C66)`, color: "#fff", padding: isMobile ? "16px 20px" : "24px 26px 20px", position: "relative" }}>
            {!isMobile && (
              <button onClick={() => { setLocated(true); setPickerOpen(false); }} aria-label="skip" style={{ position: "absolute", top: 14, insetInlineEnd: 14, width: 34, height: 34, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.16)", color: "#fff", fontSize: 15, cursor: "pointer" }}>✕</button>
            )}
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: isMobile ? 21 : 26, lineHeight: 1.2 }}>
              <FaMapMarkerAlt size={20} style={{ verticalAlign: "-2px", marginInlineEnd: 8 }} />Where are you?
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.85)", marginTop: 6, lineHeight: 1.6 }}>
              We use it to find your nearest branch and fill in your delivery address.
            </div>
          </div>

          {/* body */}
          <div className="noscroll" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: isMobile ? "14px 18px 18px" : "20px 24px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={detect}
              disabled={detecting}
              style={{ cursor: detecting ? "default" : "pointer", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, fontFamily: "inherit", padding: "15px 16px", borderRadius: 14, boxShadow: "0 14px 28px -12px rgba(193,39,45,.65)", opacity: detecting ? 0.75 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}
            >
              {detecting ? (
                <>
                  <span style={{ width: 15, height: 15, border: "2.5px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "orbitSpin 1s linear infinite" }} />
                  Finding your location…
                </>
              ) : (
                <><FaCrosshairs size={15} /> Use my current location</>
              )}
            </button>

            {geoError && (
              <div style={{ background: "#FCE9E9", color: RED, borderRadius: 12, padding: "10px 13px", fontSize: 12.5, fontWeight: 700, lineHeight: 1.5 }}>{geoError}</div>
            )}

            {served === "other" && (
              <div style={{ background: "#FCF7EE", border: "1px solid #EFE3CF", color: "#8a6a2f", borderRadius: 13, padding: "11px 14px", fontSize: 12.5, fontWeight: 700, lineHeight: 1.6 }}>
                Sorry, we do not deliver to this area yet. Shah G Foods currently delivers across Islamabad and Rawalpindi.
              </div>
            )}

            {label && (
              <div style={{ background: "#E7F3E7", border: "1px solid #CBE5CB", color: "#1E5631", borderRadius: 13, padding: "11px 14px", fontSize: 13, fontWeight: 700, lineHeight: 1.55, display: "flex", gap: 9 }}>
                <span style={{ flex: "none", display: "flex", marginTop: 2 }}><FaMapMarkerAlt size={14} color="#1E5631" /></span>
                <span>{finalAddress()}</span>
              </div>
            )}

            {/* house number, map data rarely has it in Pakistan, so the user adds it */}
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: ".4px", color: "#8A8072", marginBottom: 6 }}>
                <FaHome size={12} style={{ verticalAlign: "-1px", marginInlineEnd: 5 }} />YOUR HOUSE / FLAT NUMBER
              </div>
              <input
                ref={houseRef}
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                placeholder="e.g. 12-B, type it to complete your address"
                style={{ width: "100%", boxSizing: "border-box", fontFamily: "inherit", fontSize: 14.5, padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${label && !house.trim() ? "#E0A020" : "#E0D6C4"}`, background: "#fff", color: "#211812", outline: "none", transition: "border-color .2s" }}
              />
              {label && !house.trim() && (
                <div style={{ fontSize: 11.5, color: "#A87A10", fontWeight: 700, marginTop: 6, lineHeight: 1.5 }}>
                  GPS cannot read house numbers. Type yours above to complete the address.
                </div>
              )}
            </div>

            <div style={{ flex: 1 }} />

            <button
              onClick={confirm}
              disabled={!canConfirm}
              style={{ cursor: canConfirm ? "pointer" : "default", border: "none", background: canConfirm ? "#1E7A33" : "#D8D0C0", color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 16, borderRadius: 14, boxShadow: canConfirm ? "0 14px 30px -12px rgba(30,122,51,.6)" : "none", transition: "background .2s ease" }}
            >
              {canConfirm ? "✓ Yes, this is my location" : "Set your location first"}
            </button>
            <button onClick={() => { setLocated(true); setPickerOpen(false); }} style={{ cursor: "pointer", border: "none", background: "transparent", fontFamily: "inherit", textAlign: "center", fontSize: 13, fontWeight: 700, color: "#8A8072", padding: 4 }}>
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
