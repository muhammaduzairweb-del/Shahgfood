"use client";

import Link from "next/link";
import { LOGO } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { useApp } from "@/components/AppProvider";

const colLink: React.CSSProperties = { color: "rgba(255,255,255,.75)", textDecoration: "none", display: "block" };

export default function SiteFooter() {
  const { lang } = useApp();
  const t = DICT[lang];

  const company: [string, string][] = [
    [t.footCompanyLinks[0], "/about"],
    [t.footCompanyLinks[1], "/branches"],
    [t.footCompanyLinks[2], "/careers"],
  ];
  const help: [string, string][] = [
    [t.footHelpLinks[0], "/contact"],
    [t.footHelpLinks[1], "/track"],
    [t.footHelpLinks[2], "/faqs"],
  ];

  return (
    <footer style={{ background: "#211812", color: "#fff", marginTop: 20 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "34px 20px", display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
        <div style={{ maxWidth: 300 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Shah Jee Foods" style={{ height: 74, width: "auto", objectFit: "contain", display: "block" }} />
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
          <Link href="/admin" style={{ ...colLink, color: "rgba(255,255,255,.5)" }}>Admin</Link>
        </div>

        <div style={{ fontSize: 13, lineHeight: 2.1 }}>
          <div style={{ fontWeight: 800, color: "#fff", marginBottom: 4 }}>{t.footFollow}</div>
          <a href="https://facebook.com/shahjeefoods" target="_blank" rel="noopener noreferrer" style={colLink}>Facebook</a>
          <a href="https://instagram.com/shahjeefoods" target="_blank" rel="noopener noreferrer" style={colLink}>Instagram</a>
          <Link href="/" className="num" style={colLink}>shahjeefoods.com</Link>
        </div>
      </div>
      <div className="num" style={{ borderTop: "1px solid rgba(255,255,255,.1)", padding: "16px 20px", textAlign: "center", fontSize: 12, color: "rgba(255,255,255,.4)" }}>© 2026 Shah Jee Foods · shahjeefoods.com</div>
    </footer>
  );
}
