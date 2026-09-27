"use client";

import Link from "next/link";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MENU, BRANCHES, HOURS, ORDER_PHONE, ORDER_TEL, ORDER_WA, type Branch, branchSlug, dishImage, dishSlug, distanceKm } from "@/lib/data";
import { BRANCH_COUNT } from "@/lib/copy";
import { fmt } from "@/lib/format";
import { useWidth } from "@/components/hooks";
import PageHero from "@/components/PageHero";

const RED = "#C1272D";
const CHARCOAL = "#16171B";

const h2: React.CSSProperties = { fontFamily: "'DM Serif Display',serif", fontSize: 25, fontWeight: 400, margin: "34px 0 12px" };
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
  const sig = MENU[0];
  const related = MENU.filter((d) => [2, 10, 11].includes(d.id));

  return (
    <>
      <PageHero
        title="Best Daal Chawal in Islamabad & Rawalpindi"
        subtitle="Slow-cooked daal, a hand-made tarka and fluffy rice. Our signature plate, delivered hot to your door."
        badge="OUR SIGNATURE DISH"
        image={dishImage(sig)}
      />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "30px 20px 60px" }}>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: "#4A4238", margin: 0 }}>
          Looking for the best daal chawal in Islamabad or Rawalpindi? Ask around and you will keep hearing the same name: Shah G Foods. We slow-cook our lentils, finish them with a hand-made tarka and serve them over fluffy long-grain rice. It tastes like home, and it costs less than almost any meal in the city.
        </p>

        {/* signature card */}
        <div style={{ marginTop: 24, background: CHARCOAL, borderRadius: 22, overflow: "hidden", display: "flex", flexWrap: "wrap", color: "#fff" }}>
          <div style={{ flex: "1 1 300px", minHeight: 240, position: "relative" }}>
            {dishImage(sig) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dishImage(sig)} alt="Daal Chawal at Shah G Foods, Islamabad" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
          <div style={{ flex: "1.1 1 300px", padding: "30px 32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 34 }}>{sig.name}</div>
            <div style={{ color: "rgba(255,255,255,.75)", fontSize: 15, lineHeight: 1.7 }}>{sig.desc}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 6, flexWrap: "wrap" }}>
              <span className="num" style={{ fontSize: 26, fontWeight: 800 }}>{fmt(sig.price)}</span>
              <a href={`tel:${ORDER_TEL}`} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "12px 24px", borderRadius: 12 }}><FaPhoneAlt size={13} /> Call to order</a>
            </div>
          </div>
        </div>

        <h2 style={h2}>Goes well with</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          {related.map((d) => (
            <Link key={d.id} href={`/menu/${dishSlug(d.name)}`} style={chip}>{d.name} · {fmt(d.price)}</Link>
          ))}
        </div>

        <h2 style={h2}>Order from your nearest branch</h2>
        <BranchChips />

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/menu" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 15 }}>See the full menu →</Link>
        </div>
      </div>
    </>
  );
}

/* ---------------- SHAH G NEAR ME ---------------- */
export function NearMeContent() {
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
        title="Shah G Foods Near Me"
        subtitle="Find the nearest Shah G Foods branch to your location."
        badge="NEAREST BRANCH"
      />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "30px 20px 60px" }}>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4A4238", marginTop: 0 }}>
          Shah G Foods has {BRANCH_COUNT} branches across Islamabad and Rawalpindi. Tap the button below and allow location access to see the branches closest to you, with distance and directions.
        </p>

        <button
          onClick={locate}
          style={{ cursor: "pointer", marginTop: 8, border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15.5, padding: "14px 26px", borderRadius: 13, fontFamily: "inherit" }}
        >
          {status === "loading" ? "Locating…" : "Use my location"}
        </button>

        {status === "error" && (
          <div style={{ marginTop: 14, fontSize: 14, color: "#9A3B2E" }}>
            We could not get your location. Please allow location access, or choose a branch from the list below.
          </div>
        )}

        {status === "done" && near.length > 0 && (
          <div style={{ marginTop: 22 }}>
            <h2 style={h2}>Closest to you</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {near.slice(0, 6).map((b) => (
                <div key={b.name} style={card}>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>{b.name} <span className="num" style={{ fontSize: 12.5, color: "#2E7D32", fontWeight: 800 }}>· {b.km.toFixed(1)} km</span></div>
                    <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 3 }}>{b.address}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link href={`/branches/${branchSlug(b.name)}`} style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 13, padding: "9px 15px", borderRadius: 10 }}>View</Link>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", border: `1.5px solid ${RED}`, color: RED, fontWeight: 800, fontSize: 13, padding: "9px 15px", borderRadius: 10 }}>Map</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 style={h2}>All branches</h2>
        <BranchChips />
      </div>
    </>
  );
}

/* ---------------- CONTACT NUMBER ---------------- */
export function ContactNumberContent() {

  return (
    <>
      <PageHero
        title="Shah G Foods Contact Number"
        subtitle="One number for every branch. Call to order, share feedback or ask about catering."
        badge="CONTACT"
      />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "30px 20px 60px" }}>
        <a
          href={`tel:${ORDER_TEL}`}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16, background: "#fff", border: `1.5px solid ${RED}`, borderRadius: 18, padding: "22px 24px" }}
        >
          <span style={{ width: 52, height: 52, borderRadius: 14, background: "#FCF2F1", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><FaPhoneAlt size={20} color={RED} /></span>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: RED, letterSpacing: ".5px" }}>CALL US (ALL BRANCHES)</div>
            <div className="num" style={{ fontSize: 24, fontWeight: 800, marginTop: 4, color: "#211812" }}>{ORDER_PHONE}</div>
          </div>
        </a>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginTop: 16 }}>
          <a href={`https://wa.me/${ORDER_WA}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px", color: "inherit" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED }}>WHATSAPP</div>
            <div className="num" style={{ fontSize: 15, marginTop: 5 }}>{ORDER_PHONE}</div>
          </a>
          <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED }}>TIMINGS</div>
            <div className="num" style={{ fontSize: 15, marginTop: 5 }}>{HOURS}</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED }}>HEAD OFFICE</div>
            <div style={{ fontSize: 14.5, marginTop: 5, lineHeight: 1.5 }}>F-10/4 Markaz, Islamabad</div>
          </div>
        </div>

        <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "#5A5245", marginTop: 20 }}>
          This is the central order line for every Shah G Foods branch in Islamabad and Rawalpindi. You can also message us on WhatsApp on the same number. For a branch address and directions, choose your branch below.
        </p>
        <div style={{ marginTop: 10 }}><BranchChips /></div>
      </div>
    </>
  );
}

/* ---------------- PHOTOS ---------------- */
export function PhotosContent() {
  const w = useWidth();
  const cols = w < 480 ? 2 : w < 800 ? 3 : 4;
  const shots = MENU.filter((d) => dishImage(d));

  return (
    <>
      <PageHero
        title="Shah G Foods Photos"
        subtitle="Real photos of our food, from Daal Chawal and karahi to charcoal BBQ, shakes and fresh juice."
        badge="GALLERY"
      />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 20px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
          {shots.map((d) => (
            <Link key={d.id} href={`/menu/${dishSlug(d.name)}`} style={{ display: "block", position: "relative", aspectRatio: "1 / 1", borderRadius: 14, overflow: "hidden", background: CHARCOAL }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dishImage(d)} alt={`${d.name} at Shah G Foods`} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 10px 8px", background: "linear-gradient(0deg,rgba(0,0,0,.72),transparent)", color: "#fff", fontSize: 12, fontWeight: 700 }}>{d.name}</div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link href="/menu" style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 26px", borderRadius: 13 }}>See the menu and order →</Link>
        </div>
      </div>
    </>
  );
}
