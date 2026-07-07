"use client";

import Link from "next/link";
import { useState } from "react";
import { MENU, BRANCHES, HOURS, type Branch, branchSlug, dishImage, distanceKm } from "@/lib/data";
import { fmt as fmtBase } from "@/lib/cart";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import PageHero from "@/components/PageHero";

const RED = "#C1272D";
const CHARCOAL = "#16171B";
const PHONE_DISPLAY = "+92 330 786 2992";
const PHONE_TEL = "+923307862992";

const h2: React.CSSProperties = { fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 25, fontWeight: 400, margin: "34px 0 12px" };
const chip: React.CSSProperties = { textDecoration: "none", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 999, padding: "8px 15px", fontSize: 13, fontWeight: 700, color: "#4A4238" };

function BranchChips() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
      {BRANCHES.map((b) => (
        <Link key={b.name} href={`/branches/${branchSlug(b.name)}`} style={chip}>{b.name}</Link>
      ))}
    </div>
  );
}

/* ---------------- BEST DAAL CHAWAL ---------------- */
export function DaalChawalContent() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const fmt = (n: number) => fmtBase(n, ur);
  const sig = MENU[0];
  const related = MENU.filter((d) => [2, 10, 11].includes(d.id));

  return (
    <>
      <PageHero
        title={ur ? "اسلام آباد اور راولپنڈی میں بہترین دال چاول" : "Best Daal Chawal in Islamabad & Rawalpindi"}
        subtitle={ur ? "شاہ جی فوڈز کی مشہورِ زمانہ دال چاول — گرم گرم آپ تک۔" : "Shah G Foods' legendary daal chawal — delivered hot to your door."}
        badge={ur ? "خاص ڈش" : "THE SIGNATURE"}
        image={dishImage(sig)}
      />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "30px 20px 60px" }}>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: "#4A4238", margin: 0 }}>
          {ur
            ? "اسلام آباد میں بہترین دال چاول کہاں ملتی ہے؟ جواب ہے شاہ جی فوڈز۔ دھیمی آنچ پر پکی دال، ہاتھ کا بگھار اور نرم چاول — ایک ایسی پلیٹ جو گھر کے کھانے کی یاد دلا دے، اور قیمت ہر کسی کی پہنچ میں۔"
            : "Looking for the best daal chawal in Islamabad? The answer, again and again, is Shah G Foods. Slow-simmered lentils, a hand-made tempering (tarka) and fluffy rice come together in a plate that genuinely tastes like home — at a price anyone can afford."}
        </p>

        {/* signature card */}
        <div style={{ marginTop: 24, background: CHARCOAL, borderRadius: 22, overflow: "hidden", display: "flex", flexWrap: "wrap", color: "#fff" }}>
          <div style={{ flex: "1 1 300px", minHeight: 240, position: "relative" }}>
            {dishImage(sig) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dishImage(sig)} alt="Best Daal Chawal in Islamabad — Shah G Foods" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
          <div style={{ flex: "1.1 1 300px", padding: "30px 32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
            <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 34 }}>{ur ? sig.urdu : sig.name}</div>
            <div style={{ color: "rgba(255,255,255,.75)", fontSize: 15, lineHeight: 1.7 }}>{ur ? sig.du : sig.desc}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 6, flexWrap: "wrap" }}>
              <span className="num" style={{ fontSize: 26, fontWeight: 800 }}>{fmt(sig.price)}</span>
              <Link href="/menu" style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "12px 24px", borderRadius: 12 }}>{ur ? "ابھی آرڈر کریں ←" : "Order now →"}</Link>
            </div>
          </div>
        </div>

        <h2 style={h2}>{ur ? "دال چاول کے ساتھ آزمائیں" : "Try it with"}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          {related.map((d) => (
            <Link key={d.id} href="/menu" style={chip}>{ur ? d.urdu : d.name} · {fmt(d.price)}</Link>
          ))}
        </div>

        <h2 style={h2}>{ur ? "اپنے قریب ترین شاخ سے آرڈر کریں" : "Order from your nearest branch"}</h2>
        <BranchChips />

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/menu" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 15 }}>{ur ? "مکمل مینو دیکھیں ←" : "See the full menu →"}</Link>
        </div>
      </div>
    </>
  );
}

/* ---------------- SHAH G NEAR ME ---------------- */
export function NearMeContent() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [near, setNear] = useState<(Branch & { km: number })[]>([]);

  const locate = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) { setStatus("error"); return; }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const list = BRANCHES.map((b) => ({ ...b, km: distanceKm(latitude, longitude, b.lat, b.lng) })).sort((a, b) => a.km - b.km);
        setNear(list);
        setStatus("done");
      },
      () => setStatus("error"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const card: React.CSSProperties = { background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" };

  return (
    <>
      <PageHero
        title={ur ? "شاہ جی فوڈز آپ کے قریب" : "Shah G Foods Near Me"}
        subtitle={ur ? "اپنی لوکیشن سے قریب ترین شاہ جی فوڈز شاخ تلاش کریں۔" : "Find the nearest Shah G Foods branch to your location."}
        badge={ur ? "قریب ترین شاخ" : "NEAREST BRANCH"}
      />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "30px 20px 60px" }}>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4A4238", marginTop: 0 }}>
          {ur
            ? "شاہ جی فوڈز کی اسلام آباد اور راولپنڈی میں 40+ شاخیں ہیں۔ نیچے بٹن دبائیں، اپنی لوکیشن کی اجازت دیں، اور ہم آپ کو قریب ترین شاخیں فاصلے کے ساتھ دکھا دیں گے۔"
            : "Shah G Foods has 40+ branches across Islamabad & Rawalpindi. Tap the button below, allow your location, and we'll show you the closest branches with their distance — so you can order daal chawal from the one nearest you."}
        </p>

        <button
          onClick={locate}
          style={{ cursor: "pointer", marginTop: 8, border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15.5, padding: "14px 26px", borderRadius: 13, fontFamily: "inherit" }}
        >
          {status === "loading" ? (ur ? "تلاش کیا جا رہا ہے…" : "Locating…") : (ur ? "📍 میری لوکیشن استعمال کریں" : "📍 Use my location")}
        </button>

        {status === "error" && (
          <div style={{ marginTop: 14, fontSize: 14, color: "#9A3B2E" }}>
            {ur ? "لوکیشن نہیں مل سکی۔ براہ کرم اجازت دیں یا نیچے سے اپنی شاخ منتخب کریں۔" : "We couldn't get your location. Please allow access, or pick your branch from the list below."}
          </div>
        )}

        {status === "done" && near.length > 0 && (
          <div style={{ marginTop: 22 }}>
            <h2 style={h2}>{ur ? "آپ کے قریب ترین شاخیں" : "Closest to you"}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {near.slice(0, 6).map((b) => (
                <div key={b.name} style={card}>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>{b.name} <span className="num" style={{ fontSize: 12.5, color: "#2E7D32", fontWeight: 800 }}>· {b.km.toFixed(1)} km</span></div>
                    <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 3 }}>{b.address}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link href={`/branches/${branchSlug(b.name)}`} style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 13, padding: "9px 15px", borderRadius: 10 }}>{ur ? "دیکھیں" : "View"}</Link>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", border: `1.5px solid ${RED}`, color: RED, fontWeight: 800, fontSize: 13, padding: "9px 15px", borderRadius: 10 }}>{ur ? "نقشہ" : "Map"}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 style={h2}>{ur ? "تمام شاخیں" : "All branches"}</h2>
        <BranchChips />
      </div>
    </>
  );
}

/* ---------------- CONTACT NUMBER ---------------- */
export function ContactNumberContent() {
  const { lang } = useApp();
  const ur = lang === "ur";

  return (
    <>
      <PageHero
        title={ur ? "شاہ جی فوڈز کا رابطہ نمبر" : "Shah G Foods Contact Number"}
        subtitle={ur ? "آرڈر، فیڈبیک یا کیٹرنگ کے لیے کال کریں۔" : "Call us to order, give feedback or ask about catering."}
        badge={ur ? "رابطہ" : "CONTACT"}
      />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "30px 20px 60px" }}>
        <a
          href={`tel:${PHONE_TEL}`}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16, background: "#fff", border: `1.5px solid ${RED}`, borderRadius: 18, padding: "22px 24px" }}
        >
          <span style={{ width: 52, height: 52, borderRadius: 14, background: "#FCF2F1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flex: "none" }}>📞</span>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: RED, letterSpacing: ".5px" }}>{ur ? "کال کریں (تمام شاخیں)" : "CALL US (ALL BRANCHES)"}</div>
            <div className="num" style={{ fontSize: 24, fontWeight: 800, marginTop: 4, color: "#211812" }}>{PHONE_DISPLAY}</div>
          </div>
        </a>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginTop: 16 }}>
          <a href="mailto:hello@shahgfood.com" style={{ textDecoration: "none", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px", color: "inherit" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED }}>{ur ? "ای میل" : "EMAIL"}</div>
            <div className="num" style={{ fontSize: 15, marginTop: 5 }}>hello@shahgfood.com</div>
          </a>
          <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED }}>{ur ? "اوقات" : "TIMINGS"}</div>
            <div className="num" style={{ fontSize: 15, marginTop: 5 }}>{HOURS}</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED }}>{ur ? "ہیڈ آفس" : "HEAD OFFICE"}</div>
            <div style={{ fontSize: 14.5, marginTop: 5, lineHeight: 1.5 }}>F-10/4 Markaz, Islamabad</div>
          </div>
        </div>

        <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "#5A5245", marginTop: 20 }}>
          {ur
            ? "یہی نمبر اسلام آباد اور راولپنڈی کی تمام شاہ جی فوڈز شاخوں کے لیے ہے۔ اپنی مخصوص شاخ کا پتہ اور تفصیلات دیکھنے کے لیے نیچے سے شاخ منتخب کریں۔"
            : "This is the central number for all Shah G Foods branches across Islamabad & Rawalpindi. To see a specific branch's address and details, pick your branch below."}
        </p>
        <div style={{ marginTop: 10 }}><BranchChips /></div>
      </div>
    </>
  );
}

/* ---------------- PHOTOS ---------------- */
export function PhotosContent() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const w = useWidth();
  const cols = w < 480 ? 2 : w < 800 ? 3 : 4;
  const shots = MENU.filter((d) => dishImage(d));

  return (
    <>
      <PageHero
        title={ur ? "شاہ جی فوڈز کی تصاویر" : "Shah G Foods Photos"}
        subtitle={ur ? "ہمارے دیسی کھانوں کی گیلری — دال چاول سے باربی کیو تک۔" : "A gallery of our desi food — from daal chawal to charcoal BBQ."}
        badge={ur ? "گیلری" : "GALLERY"}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 20px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
          {shots.map((d) => (
            <div key={d.id} style={{ position: "relative", aspectRatio: "1 / 1", borderRadius: 14, overflow: "hidden", background: CHARCOAL }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dishImage(d)} alt={`${d.name} — Shah G Foods`} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 10px 8px", background: "linear-gradient(0deg,rgba(0,0,0,.72),transparent)", color: "#fff", fontSize: 12, fontWeight: 700 }}>{ur ? d.urdu : d.name}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link href="/menu" style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 26px", borderRadius: 13 }}>{ur ? "مینو دیکھیں اور آرڈر کریں ←" : "See menu & order →"}</Link>
        </div>
      </div>
    </>
  );
}
