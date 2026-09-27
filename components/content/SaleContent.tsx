"use client";

import Link from "next/link";
import {
  FaGoogle, FaMousePointer, FaEye, FaTrophy, FaGlobe, FaCode, FaUtensils, FaMapMarkedAlt, FaExclamationCircle,
  FaWhatsapp, FaMobileAlt, FaBell, FaEnvelope, FaSearch, FaAd, FaServer, FaCheckCircle, FaRocket, FaStore,
  FaMotorcycle, FaChartLine, FaHandshake, FaShieldAlt, FaBolt, FaStar,
} from "react-icons/fa";
import { SALE_EMAIL } from "@/components/Navbar";
import { useWidth } from "@/components/hooks";
import { GODADDY_LISTING_PRICE, GODADDY_LISTING_URL, GODADDY_SCREENSHOT, TRAFFIC_AS_OF, WEBSITE_PRICE, BUNDLE_PRICE, gmailLink, mailtoLink } from "@/lib/sale";

const GOLD = "#F7D774";
const RED = "#C1272D";
const serif = "'DM Serif Display',serif";

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
  { h: "150+ pages already built", p: "92 dish pages with real photos and prices, 40 branch landing pages, food guides, a branch finder and a complaint form, all indexed by Google." },
  { h: "Zero monthly running cost", p: "The site runs on Vercel's free hosting. There is no server bill. You only pay the yearly domain renewal." },
  { h: "Ready to earn", p: "Google AdSense is already installed, and ordering works by Call and WhatsApp, so it can make money from ads, orders or leads straight away." },
];

const INCLUDED = [
  { Icon: FaGlobe, t: "The domain shahgfood.com", d: "Transferred to your own registrar account." },
  { Icon: FaCode, t: "Full source code", d: "Next.js 16 + TypeScript, transferred as a GitHub repository." },
  { Icon: FaUtensils, t: "Menu system", d: "92 dishes with photos, prices, categories, search and a page for every dish." },
  { Icon: FaMapMarkedAlt, t: "Location pages", d: "40 branch landing pages built for local search, plus a 'near me' finder." },
  { Icon: FaExclamationCircle, t: "Customer complaint form", d: "Customers can report problems privately; every complaint goes straight to your inbox." },
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
  { Icon: FaStar, t: "Restaurant chains", d: "Built for many branches: every branch already has its own page on Google." },
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
  { q: "Can this become the official Shah G Foods website?", a: "Yes. It already has the full menu with photos, all 40 branch pages and Call and WhatsApp ordering on your number. After the handover it is yours to run, change and grow." },
  { q: "Do I need coding skills to run it?", a: "Not for day-to-day use. It is hosted for free on Vercel and updates deploy automatically. Changing menus or text is simple for any web developer." },
  { q: "What is the price?", a: `The domain and website are sold together as one package for ${BUNDLE_PRICE}: the domain shahgfood.com (listed on GoDaddy's premium marketplace at ${GODADDY_LISTING_PRICE}) plus the complete website with code, SEO, all pages and handover (${WEBSITE_PRICE}).` },
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
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "1px", color: "rgba(255,255,255,.6)" }}>COMPLETE PACKAGE · DOMAIN + WEBSITE</div>
            <div className="num" style={{ fontSize: isPhone ? 34 : 46, fontWeight: 800, color: GOLD, lineHeight: 1.15 }}>{BUNDLE_PRICE}</div>
            <div className="num" style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>Domain {GODADDY_LISTING_PRICE} + website {WEBSITE_PRICE}</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#pricing" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: GOLD, color: "#211812", fontWeight: 800, fontSize: 16, padding: "15px 28px", borderRadius: 14 }}>See what you get ↓</a>
            <a href={gmailLink()} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, border: "1.5px solid rgba(255,255,255,.4)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 26px", borderRadius: 14 }}><FaEnvelope size={15} /> Email to buy</a>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)" }}>{SALE_EMAIL}</div>
        </div>
      </section>

      {/* PRICING: sold together as one package */}
      <section id="pricing" style={{ ...section, scrollMarginTop: 130 }}>
        <h2 style={h2}>One package, everything included</h2>
        <p style={sub}>The domain and the website are sold together, so you get the name, the working website and all of its Google traffic in one handover.</p>
        <div style={{ marginTop: 28, borderRadius: 26, overflow: "hidden", border: "1px solid #EAE1D2", boxShadow: "0 30px 60px -40px rgba(0,0,0,.55)", background: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: isPhone ? "1fr" : "1fr 1fr" }}>
            {[
              {
                badge: "PREMIUM DOMAIN",
                title: "shahgfood.com",
                price: GODADDY_LISTING_PRICE,
                note: "GoDaddy premium listing price",
                dark: true,
                items: [
                  "Listed on GoDaddy Premium Domains",
                  "Ownership verified by GoDaddy",
                  "Short, memorable .com with a food keyword",
                  "86,800 Google impressions in 3 months",
                  "2,510 organic clicks, average position 6.1",
                  "Already indexed and ranking on page one",
                  "Safe transfer through GoDaddy",
                ],
              },
              {
                badge: "THE WEBSITE",
                title: "Complete website",
                price: WEBSITE_PRICE,
                note: "code, SEO, pages and handover",
                dark: false,
                items: [
                  "Full source code (Next.js 16 + TypeScript) on GitHub",
                  "150+ pages: 92 dishes, 40 branches, guides",
                  "Full SEO setup: structured data, sitemap, unique titles",
                  "Menu with real photos, prices, search and categories",
                  "Call & WhatsApp ordering on every dish",
                  "Branch finder with GPS and map",
                  "Complaint form with private email delivery",
                  "Installable app (PWA) and push notifications",
                  "Security headers, AdSense ready",
                  "Free Vercel hosting setup and full handover",
                ],
              },
            ].map((p) => (
              <div key={p.badge} style={{ padding: isPhone ? "24px 20px" : "30px 30px", background: p.dark ? "linear-gradient(160deg,#2A1233,#16171B)" : "#fff", color: p.dark ? "#fff" : "#211812" }}>
                <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: ".8px", padding: "5px 12px", borderRadius: 999, background: p.dark ? "rgba(247,215,116,.16)" : "#FCF2F1", color: p.dark ? GOLD : RED }}>{p.badge}</span>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
                  <div style={{ fontFamily: serif, fontSize: 26 }}>{p.title}</div>
                  <div className="num" style={{ fontSize: 20, fontWeight: 800, color: p.dark ? GOLD : "#211812" }}>{p.price}</div>
                </div>
                <div style={{ fontSize: 12.5, color: p.dark ? "rgba(255,255,255,.6)" : "#8A8072", marginTop: 2 }}>{p.note}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.items.map((it) => (
                    <li key={it} style={{ display: "flex", gap: 10, fontSize: 14.5, lineHeight: 1.5, color: p.dark ? "rgba(255,255,255,.88)" : "#4A4238" }}>
                      <FaCheckCircle size={15} color={p.dark ? GOLD : "#2E9E4F"} style={{ flex: "none", marginTop: 3 }} /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* total + the one buy button */}
          <div style={{ padding: isPhone ? "22px 20px" : "26px 30px", background: `linear-gradient(135deg,${GOLD},#F2B84B)`, color: "#211812", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "1px" }}>COMPLETE PACKAGE · DOMAIN + WEBSITE</div>
              <div className="num" style={{ fontSize: isPhone ? 34 : 42, fontWeight: 800, lineHeight: 1.1, marginTop: 4 }}>{BUNDLE_PRICE}</div>
              <div className="num" style={{ fontSize: 13, color: "#4A3A1C", marginTop: 3 }}>{GODADDY_LISTING_PRICE} domain + {WEBSITE_PRICE} website</div>
            </div>
            <a href={gmailLink()} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: "#16171B", color: "#fff", fontWeight: 800, fontSize: 16, padding: "15px 26px", borderRadius: 14 }}>
              <FaEnvelope size={15} /> Buy the complete package
            </a>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 13, color: "#8A8072", marginTop: 14 }}>
          The button opens a ready-to-send email in Gmail. Not using Gmail? <a href={mailtoLink()} style={{ color: RED, fontWeight: 700 }}>Open in your email app</a> or write to <b>{SALE_EMAIL}</b>.
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
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 14, background: "#fff", border: "1px solid #EAE1D2", borderRadius: 14, padding: "12px 16px", fontSize: 13.5, color: "#5A5245", lineHeight: 1.6 }}>
          <FaCheckCircle size={15} color="#2E9E4F" style={{ flex: "none", marginTop: 3 }} />
          <span>
            <b>Data as of {TRAFFIC_AS_OF}.</b> Traffic changes over time, so today&apos;s numbers may be a little higher or lower, but all of it is organic and real, coming from Google Search with no paid ads.
          </span>
        </div>
      </section>

      {/* GODADDY LISTING */}
      <section style={section}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#E8FBF6", border: "1px solid #B7EBDD", fontSize: 12, fontWeight: 800, padding: "6px 13px", borderRadius: 999, color: "#0B7A5E" }}><FaCheckCircle size={12} /> OWNERSHIP VERIFIED BY GODADDY</span>
        </div>
        <h2 style={h2}>Listed on GoDaddy Premium Domains</h2>
        <p style={sub}>shahgfood.com is listed for sale on GoDaddy&apos;s premium domain marketplace. GoDaddy has verified the current owner, so the transfer can go through GoDaddy safely.</p>
        <figure style={{ margin: "26px 0 0", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: isPhone ? 8 : 14, boxShadow: "0 24px 50px -34px rgba(0,0,0,.45)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href={GODADDY_LISTING_URL} target="_blank" rel="noopener noreferrer" aria-label="Open the live GoDaddy listing for shahgfood.com">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={GODADDY_SCREENSHOT} alt={`GoDaddy listing for shahgfood.com, premium and verified domain, listed at ${GODADDY_LISTING_PRICE}`} loading="lazy" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }} />
          </a>
          <figcaption style={{ fontSize: 12.5, color: "#8A8072", textAlign: "center", marginTop: 10 }}>Screenshot of the GoDaddy listing, {TRAFFIC_AS_OF}. The listing price is for the domain only.</figcaption>
        </figure>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 18 }}>
          <a href={GODADDY_LISTING_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: "#111", color: "#fff", fontWeight: 800, fontSize: 15.5, padding: "14px 24px", borderRadius: 14 }}>
            <FaCheckCircle size={15} color="#3DDC97" /> Verify it yourself on GoDaddy ↗
          </a>
          <div style={{ fontSize: 12.5, color: "#8A8072", textAlign: "center" }}>Opens the live GoDaddy listing for shahgfood.com in a new tab.</div>
        </div>
      </section>

      {/* FOR SHAH G FOODS */}
      <section style={section}>
        <div style={{ background: "linear-gradient(135deg,#5E1A86,#B71C66)", color: "#fff", borderRadius: 26, padding: isPhone ? "30px 22px" : "44px 44px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "1px", color: GOLD }}>FOR SHAH G FOODS</div>
          <div style={{ fontFamily: serif, fontSize: "clamp(26px,3.6vw,40px)", lineHeight: 1.15, marginTop: 8 }}>Your name, your customers, already on Google</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, marginTop: 22 }}>
            {[
              { h: "Your brand as a .com", p: "shahgfood.com matches the name your customers already search for. It is the most natural address for your official website." },
              { h: "Every branch on Google", p: "All 40 branches already have their own page with address, timings and directions, so each branch can be found in local searches." },
              { h: "Your full menu, online", p: "92 dishes with real photos and prices, each with its own page, ready for customers to browse and order." },
              { h: "Orders straight to you", p: "Call and WhatsApp buttons on every dish send customers directly to your number, with no commission to any app." },
            ].map((x) => (
              <div key={x.h} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 16, padding: "18px 18px" }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{x.h}</div>
                <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,.85)" }}>{x.p}</p>
              </div>
            ))}
          </div>
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

      {/* BUILT PROPERLY */}
      <section style={section}>
        <h2 style={h2}>Built properly, not a template</h2>
        <p style={sub}>Clean, modern code that any developer can pick up and extend.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12, marginTop: 26 }}>
          {[
            { Icon: FaCode, t: "Next.js 16 + TypeScript", d: "The same technology used by large modern web apps, with strict type checking." },
            { Icon: FaBolt, t: "Fast static pages", d: "150+ pages are pre-built, so they load almost instantly on mobile data." },
            { Icon: FaShieldAlt, t: "Security headers", d: "HTTPS enforced, content security policy and protection against clickjacking." },
            { Icon: FaSearch, t: "SEO built in", d: "Structured data for the restaurant and every branch, a sitemap and unique titles on every page." },
          ].map((x) => (
            <div key={x.t} style={{ ...card, padding: "18px 18px" }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: "#16171B", color: GOLD, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><x.Icon size={17} /></span>
              <div style={{ fontWeight: 800, fontSize: 15.5, marginTop: 10 }}>{x.t}</div>
              <p style={{ margin: "5px 0 0", fontSize: 13.5, color: "#6B6355", lineHeight: 1.6 }}>{x.d}</p>
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
          <p style={{ margin: 0, color: "rgba(255,255,255,.75)", fontSize: 15.5, maxWidth: 560, lineHeight: 1.7 }}>The domain and the complete website together for <b style={{ color: GOLD }}>{BUNDLE_PRICE}</b>, handed over as one package.</p>
          <a href={gmailLink()} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: GOLD, color: "#211812", fontWeight: 800, fontSize: 16, padding: "15px 30px", borderRadius: 14, marginTop: 6 }}><FaEnvelope size={15} /> {SALE_EMAIL}</a>
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
