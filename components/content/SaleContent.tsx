"use client";

import Link from "next/link";
import {
  FaGoogle, FaMousePointer, FaEye, FaTrophy, FaGlobe, FaCode, FaUtensils, FaMapMarkedAlt, FaExclamationCircle,
  FaWhatsapp, FaMobileAlt, FaBell, FaEnvelope, FaSearch, FaAd, FaServer, FaCheckCircle, FaRocket, FaStore,
  FaMotorcycle, FaBlog, FaChartLine, FaHandshake,
} from "react-icons/fa";
import { SALE_EMAIL } from "@/components/Navbar";
import { useWidth } from "@/components/hooks";

const GOLD = "#F7D774";
const RED = "#C1272D";
const serif = "'DM Serif Display',serif";
const MAILTO = `mailto:${SALE_EMAIL}?subject=${encodeURIComponent("Offer for shahgfood.com (website + domain)")}`;

// Numbers straight from Google Search Console (last 3 months, Jul to Sep 2026)
const STATS = [
  { Icon: FaMousePointer, v: "2,510", l: "Clicks from Google", s: "last 3 months" },
  { Icon: FaEye, v: "86,800", l: "Search impressions", s: "last 3 months" },
  { Icon: FaTrophy, v: "6.1", l: "Average position", s: "first page of Google" },
  { Icon: FaChartLine, v: "2.9%", l: "Click-through rate", s: "from search results" },
];

const STRENGTHS = [
  { h: "Real Google traffic from day one", p: "No waiting 6 to 12 months for SEO. The site is already indexed and brings in visitors from Google every single day, with peaks of around 60 clicks and 1,600 impressions a day." },
  { h: "Ranking on the first page", p: "An average position of 6.1 means the site shows up on page one for food searches. Getting there from scratch usually takes a new site many months of content and link building." },
  { h: "A food keyword domain", p: "shahgfood.com is short, easy to remember and clearly about food, which suits a restaurant, a cloud kitchen, a delivery service or a food review brand." },
  { h: "150+ pages already built", p: "92 dish pages with real photos and prices, 40 local landing pages, food guides and a Pakistan-wide complaints and ratings section that keeps adding fresh content." },
  { h: "Zero monthly running cost", p: "The site runs on Vercel's free hosting. There is no server bill. You only pay the yearly domain renewal." },
  { h: "Ready to earn", p: "Google AdSense is already installed, and ordering works by Call and WhatsApp, so it can make money from ads, orders or leads straight away." },
];

const INCLUDED = [
  { Icon: FaGlobe, t: "The domain shahgfood.com", d: "Transferred to your own registrar account." },
  { Icon: FaCode, t: "Full source code", d: "Next.js 16 + TypeScript, transferred as a GitHub repository." },
  { Icon: FaUtensils, t: "Menu system", d: "92 dishes with photos, prices, categories, search and a page for every dish." },
  { Icon: FaMapMarkedAlt, t: "Location pages", d: "40 branch landing pages built for local search, plus a 'near me' finder." },
  { Icon: FaExclamationCircle, t: "Complaints & ratings platform", d: "Pakistan-wide, with 31 cities, filters, rankings and a submission form." },
  { Icon: FaWhatsapp, t: "Call & WhatsApp ordering", d: "One-tap ordering with pre-filled WhatsApp messages and the customer's location." },
  { Icon: FaMobileAlt, t: "Installable app (PWA)", d: "Customers can add it to their phone's home screen like an app." },
  { Icon: FaBell, t: "Push notifications", d: "Meal-time notifications to bring visitors back every day." },
  { Icon: FaEnvelope, t: "Forms with email delivery", d: "Contact and complaint forms that land straight in your inbox." },
  { Icon: FaSearch, t: "Technical SEO", d: "Structured data, sitemap, per-page titles and descriptions, fast static pages." },
  { Icon: FaAd, t: "AdSense ready", d: "Ad code and ads.txt already in place." },
  { Icon: FaServer, t: "Free hosting setup", d: "Deploys automatically to Vercel on every update." },
];

const FOR_WHO = [
  { Icon: FaStore, t: "Restaurants", d: "Launch with an online menu, ordering and Google traffic already in place." },
  { Icon: FaUtensils, t: "Cloud kitchens", d: "Put your own menu in and start taking Call and WhatsApp orders." },
  { Icon: FaMotorcycle, t: "Delivery startups", d: "A ready base with location, menus and ordering to build on." },
  { Icon: FaBlog, t: "Food review brands", d: "Grow the complaints and ratings section into a national platform." },
];

const STEPS = [
  { h: "Get in touch", p: "Email your offer or questions. Serious buyers can see the Search Console data live on a screen share." },
  { h: "Agree and pay safely", p: "We agree the price. Using an escrow service or a trusted middleman is recommended, so both sides are protected." },
  { h: "Handover", p: "The domain is moved to your registrar account, and the GitHub repository and Vercel project are transferred to you." },
  { h: "Go live as yours", p: "Rebrand it, add your menu and keep the Google traffic flowing." },
];

const FAQ = [
  { q: "Is the traffic real?", a: "Yes. Every number on this page comes from Google Search Console. Serious buyers can check the account live on a screen share before paying." },
  { q: "How old is the website?", a: "About 3 months. It started receiving Google traffic in early July 2026." },
  { q: "Does the sale include the Shah G Foods restaurant brand?", a: "No. The sale covers the domain shahgfood.com and the website with all its code and pages. The site can be fully rebranded with your own name, logo, menu and colours." },
  { q: "Do I need coding skills to run it?", a: "Not for day-to-day use. It is hosted for free on Vercel and updates deploy automatically. Changing menus or text is simple for any web developer." },
  { q: "Why 'starting from' 2,800 USD?", a: "2,800 USD is the starting price for the domain and website as they are. Extra work such as rebranding or custom features can be quoted separately." },
];

export default function SaleContent() {
  const w = useWidth();
  const isPhone = w < 640;
  const card: React.CSSProperties = { background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18 };
  const h2: React.CSSProperties = { fontFamily: serif, fontSize: "clamp(26px,3.4vw,36px)", fontWeight: 400, margin: 0, lineHeight: 1.15, textAlign: "center" };
  const sub: React.CSSProperties = { textAlign: "center", color: "#6B6355", fontSize: 15, lineHeight: 1.7, maxWidth: 620, margin: "10px auto 0" };
  const section: React.CSSProperties = { maxWidth: 1080, margin: "0 auto", padding: isPhone ? "48px 18px 0" : "70px 20px 0" };

  return (
    <div style={{ paddingBottom: 70 }}>
      {/* HERO */}
      <section style={{ background: "radial-gradient(1200px 500px at 50% -10%, #5E1A86 0%, #2A1233 45%, #16171B 100%)", color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: isPhone ? "46px 18px 54px" : "70px 20px 76px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(247,215,116,.14)", border: "1px solid rgba(247,215,116,.4)", color: GOLD, fontSize: 12, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".8px" }}>
            <FaHandshake size={14} /> WEBSITE + DOMAIN FOR SALE
          </div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(34px,6vw,64px)", lineHeight: 1.05, margin: 0, fontWeight: 400, letterSpacing: "-.5px" }}>
            Own <span style={{ color: GOLD }}>shahgfood.com</span>, a food website that already has Google traffic
          </h1>
          <p style={{ margin: 0, fontSize: isPhone ? 15.5 : 17.5, lineHeight: 1.7, color: "rgba(255,255,255,.82)", maxWidth: 680 }}>
            In just 3 months this site has earned <b style={{ color: "#fff" }}>86,800 Google impressions</b> and <b style={{ color: "#fff" }}>2,510 clicks</b>, ranking on the first page. Skip the slow start and launch your food business with an audience from day one.
          </p>
          <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 20, padding: "16px 26px", marginTop: 4 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "1px", color: "rgba(255,255,255,.6)" }}>STARTING FROM</div>
            <div className="num" style={{ fontSize: isPhone ? 40 : 52, fontWeight: 800, color: GOLD, lineHeight: 1.1 }}>2,800 <span style={{ fontSize: "0.45em", color: "#fff" }}>USD</span></div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>Domain + full website + source code</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a href={MAILTO} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: GOLD, color: "#211812", fontWeight: 800, fontSize: 16, padding: "15px 28px", borderRadius: 14 }}><FaEnvelope size={15} /> Make an offer</a>
            <a href="#numbers" style={{ textDecoration: "none", border: "1.5px solid rgba(255,255,255,.4)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 26px", borderRadius: 14 }}>See the numbers ↓</a>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)" }}>{SALE_EMAIL}</div>
        </div>
      </section>

      {/* NUMBERS */}
      <section id="numbers" style={{ ...section, scrollMarginTop: 130 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #EAE1D2", fontSize: 12, fontWeight: 800, padding: "6px 13px", borderRadius: 999, color: "#5A5245" }}><FaGoogle size={12} color="#4285F4" /> GOOGLE SEARCH CONSOLE · LAST 3 MONTHS</span>
        </div>
        <h2 style={h2}>Traffic you can verify</h2>
        <p style={sub}>Real, organic visitors from Google Search. No ads were paid for. The site has been live for about 3 months.</p>
        <div style={{ display: "grid", gridTemplateColumns: isPhone ? "1fr 1fr" : "repeat(4,1fr)", gap: 12, marginTop: 28 }}>
          {STATS.map((s, i) => (
            <div key={s.l} style={{ borderRadius: 18, padding: isPhone ? "18px 16px" : "24px 22px", color: "#fff", background: ["#4285F4", "#5E35B1", "#00897B", "#E37400"][i] }}>
              <s.Icon size={18} style={{ opacity: 0.85 }} />
              <div className="num" style={{ fontSize: isPhone ? 30 : 40, fontWeight: 800, marginTop: 10, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontWeight: 800, fontSize: isPhone ? 13 : 14.5, marginTop: 8 }}>{s.l}</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>{s.s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY STRONG */}
      <section style={section}>
        <h2 style={h2}>Why this site is a strong start for a food business</h2>
        <p style={sub}>Building a website is easy. Getting Google to send you customers is the hard part, and this site already does it.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14, marginTop: 28 }}>
          {STRENGTHS.map((s, i) => (
            <div key={s.h} style={{ ...card, padding: "22px 22px" }}>
              <div className="num" style={{ width: 34, height: 34, borderRadius: 10, background: "#FCF2F1", color: RED, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontWeight: 800, fontSize: 17, marginTop: 12 }}>{s.h}</div>
              <p style={{ margin: "7px 0 0", fontSize: 14.5, lineHeight: 1.7, color: "#5A5245" }}>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INCLUDED */}
      <section style={section}>
        <h2 style={h2}>Everything included</h2>
        <p style={sub}>You get the complete, working product, not a template.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 12, marginTop: 28 }}>
          {INCLUDED.map((it) => (
            <div key={it.t} style={{ ...card, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: "#16171B", color: GOLD, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><it.Icon size={17} /></span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{it.t}</div>
                <div style={{ fontSize: 13.5, color: "#6B6355", marginTop: 3, lineHeight: 1.55 }}>{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOR WHO */}
      <section style={section}>
        <h2 style={h2}>Perfect for</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginTop: 26 }}>
          {FOR_WHO.map((f) => (
            <div key={f.t} style={{ ...card, padding: "22px 20px", textAlign: "center" }}>
              <span style={{ width: 52, height: 52, borderRadius: 16, background: "#FCF2F1", color: RED, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><f.Icon size={22} /></span>
              <div style={{ fontWeight: 800, fontSize: 16.5, marginTop: 12 }}>{f.t}</div>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#6B6355", lineHeight: 1.6 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={section}>
        <h2 style={h2}>How the sale works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginTop: 26 }}>
          {STEPS.map((s, i) => (
            <div key={s.h} style={{ ...card, padding: "20px 20px" }}>
              <div className="num" style={{ fontFamily: serif, fontSize: 34, color: RED, lineHeight: 1 }}>{i + 1}</div>
              <div style={{ fontWeight: 800, fontSize: 16, marginTop: 8 }}>{s.h}</div>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#6B6355", lineHeight: 1.6 }}>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ ...section, maxWidth: 820 }}>
        <h2 style={h2}>Questions buyers ask</h2>
        <div style={{ ...card, padding: "4px 22px", marginTop: 24 }}>
          {FAQ.map((f, i) => (
            <details className="faq" key={f.q} style={{ borderTop: i === 0 ? "none" : "1px solid #EFE7D8" }}>
              <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "16px 2px", fontWeight: 800, fontSize: 15.5 }}>
                <span>{f.q}</span>
                <span className="faq-sign" style={{ flex: "none", color: RED, fontSize: 24, fontWeight: 400, lineHeight: 1 }}>+</span>
              </summary>
              <p style={{ margin: "0 2px 16px", color: "#5A5245", fontSize: 14.5, lineHeight: 1.7 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={section}>
        <div style={{ background: "linear-gradient(135deg,#16171B,#2A1233)", color: "#fff", borderRadius: 26, padding: isPhone ? "34px 22px" : "50px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <FaRocket size={30} color={GOLD} />
          <div style={{ fontFamily: serif, fontSize: "clamp(26px,3.6vw,40px)", lineHeight: 1.15 }}>Start your food business with a head start</div>
          <p style={{ margin: 0, color: "rgba(255,255,255,.75)", fontSize: 15.5, maxWidth: 560, lineHeight: 1.7 }}>shahgfood.com, the full website and its Google traffic, starting from <b style={{ color: GOLD }}>2,800 USD</b>. Send your offer today.</p>
          <a href={MAILTO} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: GOLD, color: "#211812", fontWeight: 800, fontSize: 16, padding: "15px 30px", borderRadius: 14, marginTop: 6 }}><FaEnvelope size={15} /> {SALE_EMAIL}</a>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 4 }}>
            {["Verified Google data", "Full code ownership", "Free hosting"].map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><FaCheckCircle size={12} color="#4CAF50" /> {t}</span>
            ))}
          </div>
          <Link href="/" style={{ color: "rgba(255,255,255,.55)", fontSize: 13, marginTop: 6 }}>Back to the website</Link>
        </div>
      </section>
    </div>
  );
}
