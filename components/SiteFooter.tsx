"use client";

import Link from "next/link";
import { LOGO, LOGO_FILTER, ORDER_PHONE, ORDER_TEL } from "@/lib/data";
import { T } from "@/lib/copy";
import { useWidth } from "@/components/hooks";
import { IconFacebook, IconInstagram } from "@/components/icons";

const colLink: React.CSSProperties = { color: "rgba(255,255,255,.75)", textDecoration: "none", display: "block" };
const social: React.CSSProperties = { color: "rgba(255,255,255,.85)", textDecoration: "none", display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 600 };

const FB_URL = "https://www.facebook.com/profile.php?id=61592033124593";
const IG_URL = "https://www.instagram.com/shahgfoodsofficial/";

export default function SiteFooter() {
  const t = T;
  const isMobile = useWidth() < 820;

  const company: [string, string][] = [
    ["About us", "/about"],
    ["Full menu", "/menu"],
    ["Our branches", "/branches"],
    ["Find a branch near me", "/shah-g-near-me"],
    ["Food photos", "/shah-g-foods-photos"],
  ];
  const help: [string, string][] = [
    ["Restaurant complaints", "/complaints"],
    ["File a complaint", "/complaints/new"],
    ["Contact", "/contact"],
    ["FAQs", "/faqs"],
    ["Contact number", "/shah-g-contact-number"],
    ["Best Daal Chawal in Islamabad", "/best-daal-chawal-islamabad"],
  ];

  return (
    <footer style={{ background: "#211812", color: "#fff", marginTop: 20 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "34px 20px", display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
        <div style={{ maxWidth: 300 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Shah G Foods" style={{ height: 74, width: "auto", objectFit: "contain", display: "block", filter: LOGO_FILTER }} />
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 12, lineHeight: 1.7 }}>{t.footTag}</div>
        </div>

        <div style={{ fontSize: 13, lineHeight: 2.1 }}>
          <div style={{ fontWeight: 800, color: "#fff", marginBottom: 4 }}>{t.footCompany}</div>
          {company.map(([label, href]) => (
            <Link key={href} href={href} style={colLink}>{label}</Link>
          ))}
        </div>

        <div style={{ fontSize: 13, lineHeight: 2.1 }}>
          <div style={{ fontWeight: 800, color: "#fff", marginBottom: 4 }}>{t.footHelp}</div>
          {help.map(([label, href]) => (
            <Link key={href} href={href} style={colLink}>{label}</Link>
          ))}
          <a href={`tel:${ORDER_TEL}`} className="num" style={colLink}>{ORDER_PHONE}</a>
        </div>

        <div style={{ fontSize: 13, lineHeight: 2.1 }}>
          <div style={{ fontWeight: 800, color: "#fff", marginBottom: 10 }}>{t.footFollow}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" style={social}><IconFacebook size={22} />Facebook</a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" style={social}><IconInstagram size={22} />Instagram</a>
          </div>
          <Link href="/" className="num" style={{ ...colLink, marginTop: 10 }}>shahgfood.com</Link>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", padding: isMobile ? "16px 20px 104px" : "16px 20px", display: "flex", flexWrap: "wrap", gap: "6px 18px", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(255,255,255,.4)" }}>
        <span className="num">© {new Date().getFullYear()} shahgfood.com</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <Link href="/privacy" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>Privacy Policy</Link>
        <Link href="/terms" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>Terms</Link>
        <Link href="/refund" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>Refund Policy</Link>
      </div>
    </footer>
  );
}
