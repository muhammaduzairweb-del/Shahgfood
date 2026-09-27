"use client";

import Link from "next/link";
import { FaPhoneAlt, FaWhatsapp, FaClock, FaExclamationCircle, FaHandshake } from "react-icons/fa";
import PageHero from "@/components/PageHero";
import { SALE_EMAIL } from "@/components/Navbar";
import { ORDER_PHONE, ORDER_TEL, ORDER_WA } from "@/lib/data";
import { HOURS_TEXT } from "@/lib/copy";

const RED = "#C1272D";

export default function ContactContent() {
  const card: React.CSSProperties = { textDecoration: "none", color: "#211812", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, padding: "20px 20px", display: "flex", alignItems: "center", gap: 14 };
  const iconBox = (bg: string, color = "#fff"): React.CSSProperties => ({ width: 46, height: 46, borderRadius: 14, background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" });
  const label: React.CSSProperties = { display: "block", fontSize: 12, color: "#8A8072", fontWeight: 700 };

  return (
    <>
      <PageHero title="Contact" subtitle="Call or WhatsApp to order. Had a problem at a restaurant? Use the complaint form." badge="GET IN TOUCH" />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "30px 20px 64px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#8A8072", letterSpacing: ".6px" }}>ORDER FROM SHAH G FOODS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
          <a href={`tel:${ORDER_TEL}`} style={card}>
            <span style={iconBox(RED)}><FaPhoneAlt size={17} /></span>
            <span><span style={label}>Call to order</span><span className="num" style={{ fontWeight: 800, fontSize: 17 }}>{ORDER_PHONE}</span></span>
          </a>
          <a href={`https://wa.me/${ORDER_WA}`} target="_blank" rel="noopener noreferrer" style={card}>
            <span style={iconBox("#25D366")}><FaWhatsapp size={22} /></span>
            <span><span style={label}>WhatsApp</span><span style={{ fontWeight: 800, fontSize: 17 }}>Message to order</span></span>
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#5A5245", fontWeight: 700 }}>
          <FaClock size={13} color="#8A8072" /> Open daily, {HOURS_TEXT}.
        </div>

        <div style={{ fontSize: 13, fontWeight: 800, color: "#8A8072", letterSpacing: ".6px", marginTop: 16 }}>COMPLAINTS</div>
        <Link href="/complaints/new" style={{ ...card, flexWrap: "wrap" }}>
          <span style={iconBox("#FCF2F1", RED)}><FaExclamationCircle size={20} /></span>
          <span style={{ flex: "1 1 220px" }}>
            <span style={{ display: "block", fontWeight: 800, fontSize: 16 }}>Had a bad experience at a restaurant?</span>
            <span style={{ display: "block", fontSize: 13.5, color: "#6B6355", marginTop: 3 }}>File a complaint about any restaurant in Pakistan. Your contact details stay private.</span>
          </span>
          <span style={{ color: RED, fontWeight: 800, fontSize: 14, whiteSpace: "nowrap" }}>File a complaint →</span>
        </Link>

        <div style={{ fontSize: 13, fontWeight: 800, color: "#8A8072", letterSpacing: ".6px", marginTop: 16 }}>ACQUISITION INQUIRIES</div>
        <a href={`mailto:${SALE_EMAIL}?subject=${encodeURIComponent("Acquisition inquiry: shahgfood.com")}`} style={{ ...card, background: "#16171B", border: "none", color: "#fff" }}>
          <span style={iconBox("#F7D774", "#211812")}><FaHandshake size={20} /></span>
          <span style={{ minWidth: 0 }}>
            <span style={{ ...label, color: "#F7D774" }}>For acquisition inquiries only</span>
            <span style={{ display: "block", fontWeight: 800, fontSize: "clamp(13.5px,3.9vw,16px)", whiteSpace: "nowrap" }}>{SALE_EMAIL}</span>
            <span style={{ display: "block", fontSize: 12.5, color: "rgba(255,255,255,.6)", marginTop: 3 }}>For buying this website and domain. Orders and complaints are not handled by email.</span>
          </span>
        </a>
        <Link href="/website-for-sale" style={{ alignSelf: "flex-start", color: RED, fontWeight: 800, fontSize: 13.5, textDecoration: "none" }}>See what is included in the sale →</Link>
      </div>
    </>
  );
}
