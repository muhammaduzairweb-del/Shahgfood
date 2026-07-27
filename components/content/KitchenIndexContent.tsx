"use client";

import Link from "next/link";
import { FaUtensils, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useApp } from "@/components/AppProvider";
import { KITCHENS } from "@/lib/kitchens";

const RED = "#C1272D";
const PURPLE = "#5E1A86";

export default function KitchenIndexContent() {
  const { lang } = useApp();
  const ur = lang === "ur";

  return (
    <>
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(115deg,${PURPLE} 0%,#8E1E7C 55%,#B71C66 100%)`, color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px 62px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".6px" }}>
            {ur ? "ہوم کچنز" : "HOME KITCHENS"}
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(32px,5vw,54px)", lineHeight: 1.1, margin: 0 }}>{ur ? "ہمارے ہوم کچن پارٹنرز" : "Our home kitchen partners"}</h1>
          <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.9)", margin: 0, maxWidth: 620, lineHeight: 1.75 }}>
            {ur ? "گھر پر بنا خالص اور تازہ کھانا، براہِ راست کچن سے۔" : "Fresh, homestyle food made and delivered directly by independent home cooks."}
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          {KITCHENS.map((k) => (
            <Link
              key={k.slug}
              href={`/kitchen/${k.slug}`}
              style={{ textDecoration: "none", color: "inherit", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: "22px 20px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 16px 34px -28px rgba(60,30,10,.6)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: "#F7F3EB", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <FaUtensils size={18} color={RED} />
                </span>
                <span style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 20, color: "#211812" }}>{k.name}</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#8A8072", margin: 0, lineHeight: 1.6 }}>{ur ? k.taglineU : k.tagline}</p>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12.5, color: "#5A5245" }}>
                <FaMapMarkerAlt size={13} color={RED} style={{ flex: "none", marginTop: 2 }} />
                <span>{k.areas.join(", ")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: RED, fontWeight: 800, fontSize: 13.5, marginTop: 4 }}>
                {ur ? "مینو دیکھیں" : "View menu"} <FaArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", background: "#FCF3DC", border: "1px solid #E9D6A0", borderRadius: 20, padding: "22px 20px" }}>
          <div style={{ fontSize: 14.5, color: "#5A4B2A", lineHeight: 1.7, marginBottom: 14 }}>
            {ur ? "اپنا ہوم کچن یا ریستوران بھی لسٹ کرنا چاہتے ہیں؟" : "Want to list your own home kitchen or restaurant?"}
          </div>
          <Link href="/partner" style={{ textDecoration: "none", display: "inline-flex", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 26px", borderRadius: 14 }}>
            {ur ? "پارٹنر بنیں →" : "Become a partner →"}
          </Link>
        </div>
      </div>
    </>
  );
}
