"use client";

import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaUtensils } from "react-icons/fa";
import { useApp } from "@/components/AppProvider";
import type { Kitchen } from "@/lib/kitchens";

const RED = "#C1272D";
const PURPLE = "#5E1A86";

export default function KitchenContent({ kitchen }: { kitchen: Kitchen }) {
  const { lang } = useApp();
  const ur = lang === "ur";
  const telHref = `tel:${kitchen.phone.replace(/[^0-9+]/g, "")}`;
  const waHref = `https://wa.me/${kitchen.whatsapp}`;

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(115deg,${PURPLE} 0%,#8E1E7C 55%,#B71C66 100%)`, color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px 62px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".6px" }}>
            {ur ? "ہوم کچن پارٹنر" : "HOME KITCHEN PARTNER"}
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(36px,6vw,60px)", lineHeight: 1.1, margin: 0, fontWeight: 400 }}>{kitchen.name}</h1>
          <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.9)", margin: 0, maxWidth: 560, lineHeight: 1.75 }}>{ur ? kitchen.taglineU : kitchen.tagline}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 6 }}>
            <a href={telHref} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9, background: "#fff", color: RED, fontWeight: 800, fontSize: 15, padding: "13px 22px", borderRadius: 14 }}>
              <FaPhoneAlt size={14} /> {kitchen.phone}
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9, background: "#25D366", color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 22px", borderRadius: 14 }}>
              <FaWhatsapp size={16} /> {ur ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 60px" }}>
        {/* AREAS */}
        <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: "20px 22px", marginBottom: 32, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <FaMapMarkerAlt size={18} color={RED} style={{ flex: "none", marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#8A8072", marginBottom: 8, letterSpacing: ".4px" }}>{ur ? "ڈیلیوری ایریاز" : "DELIVERS TO"}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {kitchen.areas.map((a) => (
                <span key={a} style={{ background: "#F7F3EB", border: "1px solid #EAE1D2", color: "#4A4238", fontSize: 13, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* MENU */}
        <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 26, marginBottom: 16, color: "#211812" }}>{ur ? "مینو" : "Menu"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {kitchen.dishes.map((d) => (
            <div key={d.name} style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 38, height: 38, borderRadius: 10, background: "#F7F3EB", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <FaUtensils size={15} color={RED} />
                </span>
                <span style={{ fontWeight: 800, fontSize: 15.5, color: "#211812" }}>{ur && d.nameU ? d.nameU : d.name}</span>
              </div>

              {d.type === "fixed" && d.price != null && (
                <span className="num" style={{ fontWeight: 800, fontSize: 16, color: RED }}>Rs {d.price.toLocaleString()}</span>
              )}

              {d.type === "halffull" && d.half != null && d.full != null && (
                <div style={{ fontSize: 13, fontWeight: 700, color: "#5A5245", textAlign: "end" }}>
                  <div>{ur ? "ہاف" : "Half"}: <span className="num" style={{ color: RED }}>Rs {d.half.toLocaleString()}</span></div>
                  <div>{ur ? "فل" : "Full"}: <span className="num" style={{ color: RED }}>Rs {d.full.toLocaleString()}</span></div>
                </div>
              )}

              {d.type === "halffull" && (d.half == null || d.full == null) && (
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#B07A15" }}>{ur ? "قیمت کے لیے کال کریں" : "Call for price"}</span>
              )}

              {d.note && <span style={{ fontSize: 13, fontWeight: 700, color: "#5A5245" }}>{d.note}</span>}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px 28px", borderRadius: 14 }}>
            {ur ? "آرڈر کے لیے رابطہ کریں" : "Contact to order"}
          </a>
          <div style={{ fontSize: 11.5, color: "#B0A692", marginTop: 12 }}>
            {ur ? "آرڈر براہِ راست کچن کو جاتا ہے۔ قیمتیں و اوقات پارٹنر خود مقرر کرتا ہے۔" : "Orders go directly to the kitchen. Prices and timings are set by the partner."}
          </div>
        </div>
      </div>
    </>
  );
}
