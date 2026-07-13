"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import { CITIES, restaurantsForCity, type City } from "@/lib/data";

const RED = "#C1272D";
const CHARCOAL = "#16171B";

/**
 * Location-aware restaurant directory. Fetches the visitor's city (GPS → nearest
 * branch) and lists only the restaurants that actually serve that city, so people
 * never see kitchens they can't order from. Falls back to a manual city picker.
 */
export default function RestaurantsNearYou() {
  const { lang, city, setCity, locStatus, detectLocation, hydrated } = useApp();
  const ur = lang === "ur";

  // Try to detect the visitor's location once, on first load, if we don't know it yet.
  useEffect(() => {
    if (hydrated && !city && locStatus === "idle") detectLocation();
  }, [hydrated, city, locStatus, detectLocation]);

  const list = restaurantsForCity(city);

  const label = (() => {
    if (locStatus === "locating") return ur ? "آپ کا مقام تلاش کیا جا رہا ہے…" : "Finding your location…";
    if (city) return ur ? `${cityUr(city)} میں دستیاب` : `Serving ${city}`;
    if (locStatus === "denied") return ur ? "مقام کی اجازت نہیں ملی — شہر منتخب کریں" : "Location off — pick your city";
    if (locStatus === "outside") return ur ? "فی الحال آپ کے علاقے میں سروس نہیں — شہر منتخب کریں" : "Not in your area yet — pick a city";
    return ur ? "اپنا شہر منتخب کریں" : "Choose your city";
  })();

  return (
    <section style={{ marginBottom: 30 }}>
      {/* Location bar */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
          background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16,
          padding: "12px 16px", marginBottom: 18,
        }}
      >
        <span aria-hidden style={{ fontSize: 20, lineHeight: 1 }}>📍</span>
        <div style={{ flex: "1 1 auto", minWidth: 160 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".5px", color: "#8A8072" }}>
            {ur ? "آپ کے علاقے میں" : "AVAILABLE IN YOUR AREA"}
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: CHARCOAL, marginTop: 2 }}>{label}</div>
        </div>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value as City | "")}
          aria-label={ur ? "شہر منتخب کریں" : "Select city"}
          style={{
            fontFamily: "inherit", fontSize: 14, fontWeight: 700, color: CHARCOAL,
            border: "1px solid #EAE1D2", borderRadius: 11, padding: "9px 12px",
            background: "#FCF9F3", cursor: "pointer",
          }}
        >
          <option value="">{ur ? "تمام شہر" : "All cities"}</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{ur ? cityUr(c) : c}</option>
          ))}
        </select>

        <button
          onClick={detectLocation}
          disabled={locStatus === "locating"}
          style={{
            fontFamily: "inherit", fontSize: 13.5, fontWeight: 800, color: "#fff",
            background: RED, border: "none", borderRadius: 11, padding: "10px 15px",
            cursor: locStatus === "locating" ? "default" : "pointer", opacity: locStatus === "locating" ? 0.6 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {locStatus === "locating" ? (ur ? "…" : "…") : ur ? "میرا مقام" : "Use my location"}
        </button>
      </div>

      {/* Heading */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
        <h2 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 23, margin: 0, fontWeight: 400 }}>
          {ur ? "آپ کے قریب ریستوران" : "Restaurants near you"}
        </h2>
        <Link href="/partner" style={{ textDecoration: "none", fontSize: 14, fontWeight: 700, color: RED, whiteSpace: "nowrap" }}>
          {ur ? "اپنا ریستوران لسٹ کریں →" : "List your restaurant →"}
        </Link>
      </div>

      {list.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
          {list.map((r) => (
            <Link
              key={r.slug}
              href={r.menuPath}
              style={{
                textDecoration: "none", color: "inherit", background: "#fff",
                border: "1px solid #EAE1D2", borderRadius: 18, overflow: "hidden",
                display: "flex", flexDirection: "column", boxShadow: "0 12px 30px -24px rgba(0,0,0,.5)",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "16/9", background: CHARCOAL }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={r.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                {r.featured && (
                  <span style={{ position: "absolute", top: 10, insetInlineStart: 10, background: "#E0A020", color: "#211812", fontSize: 10.5, fontWeight: 800, padding: "4px 9px", borderRadius: 20, letterSpacing: ".4px" }}>
                    {ur ? "فیچرڈ" : "FEATURED"}
                  </span>
                )}
              </div>
              <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ fontSize: 16.5, fontWeight: 800, color: CHARCOAL }}>{ur ? r.nameUr : r.name}</div>
                  <span className="num" style={{ fontSize: 13, fontWeight: 800, color: "#1A8917", whiteSpace: "nowrap" }}>★ {r.rating}</span>
                </div>
                <div style={{ fontSize: 12.5, color: "#8A8072" }}>{ur ? r.cuisineUr : r.cuisine}</div>
                <div className="num" style={{ fontSize: 11.5, color: "#B0A79A", marginTop: 2 }}>
                  {r.reviews.toLocaleString()}+ {ur ? "ریویوز" : "reviews"} · {r.coverageCities.map((c) => (ur ? cityUr(c) : c)).join(" · ")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ background: "#FCF9F3", border: "1px dashed #E3D9C7", borderRadius: 18, padding: "34px 22px", textAlign: "center" }}>
          <div style={{ fontSize: 34, marginBottom: 8 }}>🍽️</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: CHARCOAL }}>
            {ur ? "آپ کے شہر میں ابھی کوئی ریستوران لسٹ نہیں" : "No listed kitchens in your city yet"}
          </div>
          <div style={{ fontSize: 13.5, color: "#8A8072", marginTop: 6, maxWidth: 420, marginInline: "auto", lineHeight: 1.6 }}>
            {ur
              ? "ہم تیزی سے پھیل رہے ہیں — جلد آپ کے علاقے میں بھی ریستوران دستیاب ہوں گے۔"
              : "We're expanding fast — restaurants in your area are coming soon. Own a restaurant? List it below."}
          </div>
          <Link href="/partner" style={{ display: "inline-block", marginTop: 14, textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 14, padding: "11px 20px", borderRadius: 12 }}>
            {ur ? "اپنا ریستوران لسٹ کریں" : "List your restaurant"}
          </Link>
        </div>
      )}
    </section>
  );
}

function cityUr(c: City): string {
  return c === "Islamabad" ? "اسلام آباد" : "راولپنڈی";
}
