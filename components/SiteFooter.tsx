"use client";

import Link from "next/link";
import { LOGO, LOGO_FILTER } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { IconFacebook, IconInstagram } from "@/components/icons";

const colLink: React.CSSProperties = { color: "rgba(255,255,255,.75)", textDecoration: "none", display: "block" };
const social: React.CSSProperties = { color: "rgba(255,255,255,.85)", textDecoration: "none", display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 600 };

const FB_URL = "https://www.facebook.com/shah.g.foods.627153/";
const IG_URL = "https://www.instagram.com/shahgfoodsofficial/";

export default function SiteFooter() {
  const { lang } = useApp();
  const t = DICT[lang];
  const ur = lang === "ur";
  const isMobile = useWidth() < 820;

  const company: [string, string][] = [
    [ur ? "ہمارے بارے میں" : "About us", "/about"],
    [ur ? "شاخیں" : "Branches", "/branches"],
    [ur ? "ریستوران لسٹ کریں" : "List your restaurant", "/partner"],
  ];
  const help: [string, string][] = [
    [ur ? "شکایت درج کریں" : "File a complaint", "/complaint"],
    [ur ? "سوالات" : "FAQs", "/faqs"],
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
          <Link href="/partner" style={colLink}>{ur ? "ریستوران لسٹ کریں" : "List your restaurant"}</Link>
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
        <span className="num">© 2026 Shah G Online · shahgfood.com</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <Link href="/privacy" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>{ur ? "پرائیویسی" : "Privacy"}</Link>
        <Link href="/terms" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>{ur ? "شرائط و ضوابط" : "Terms"}</Link>
        <Link href="/refund" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>{ur ? "ری فنڈ" : "Refunds"}</Link>
        <Link href="/shipping" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>{ur ? "سروس پالیسی" : "Service Policy"}</Link>
      </div>
    </footer>
  );
}
