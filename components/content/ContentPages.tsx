"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { BRANCHES, SITE_IMAGES, type CategoryKey, TILE, branchSlug } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { EXTRA, PAGES } from "@/lib/i18n-extra";
import { useApp } from "@/components/AppProvider";
import { ORDER_STATUSES, getOrder, type Order } from "@/lib/orders";
import PageHero from "@/components/PageHero";
import FoodOrbit from "@/components/FoodOrbit";

const TrackingMap = dynamic(() => import("@/components/TrackingMap"), { ssr: false });

const RED = "#C1272D";
const WRAP: React.CSSProperties = { maxWidth: 1000, margin: "0 auto", padding: "34px 20px 60px" };
const H1: React.CSSProperties = { fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 400, margin: 0, lineHeight: 1.1 };
const card: React.CSSProperties = { background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, padding: 20 };
const ETA_MIN = 35;

function useLangPack() {
  const { lang } = useApp();
  return { lang, ur: lang === "ur", t: DICT[lang], x: EXTRA[lang], p: PAGES[lang] };
}

/* ---------------- ABOUT ---------------- */
export function AboutContent() {
  const { ur } = useLangPack();
  // animated panels per story block (replaced the old static photos)
  const orbits = [
    { center: "🍛", items: ["📱", "🍕", "🍗", "🥤", "🫓", "⭐"] },
    { center: "🏪", items: ["📈", "💰", "🧾", "⭐", "📣", "🤝"] },
    { center: "🇵🇰", items: ["🍛", "🏪", "🚀", "❤️", "🌟", "🤝"] },
  ];

  const A = ur
    ? {
        badge: "ہماری کہانی · مارکیٹ پلیس",
        headline: "شاہ جی آن لائن، پاکستان کا فوڈ مارکیٹ پلیس",
        sub: "ہم بھوکے گاہکوں کو ملک کے بہترین مقامی کچن سے جوڑتے ہیں۔ اصل ذائقہ، ایک کلک پر۔",
        intro: "شاہ جی آن لائن ایک سادہ سوچ سے شروع ہوا: ہر محلے کا بہترین کھانا ایک جگہ لے آنا۔ ہم خود کھانا نہیں پکاتے۔ ہم پاکستان بھر کے ریستورانوں اور ہوم کچن کے مینو لسٹ کرتے ہیں تاکہ آپ سیدھا اُن سے آرڈر کر سکیں، بغیر کسی درمیانی کمیشن کے۔ ہمارے پہلے فیچرڈ پارٹنر شاہ جی فوڈز ہیں۔",
        blocks: [
          { h: "گاہکوں کے لیے", p: "پسندیدہ ڈش تلاش کریں اور سیدھا کال یا واٹس ایپ پر آرڈر کریں۔ کوئی جھنجھٹ نہیں، صرف تازہ، اصل دیسی کھانا آپ کے علاقے کے بہترین کچن سے۔" },
          { h: "ریستورانوں کے لیے", p: "اپنا مینو ہزاروں بھوکے گاہکوں کے سامنے لائیں۔ صفر کمیشن، صفر ڈیلیوری جھنجھٹ، بس ایک ماہانہ سلاٹ اور آرڈرز سیدھا آپ کے نمبر پر۔" },
          { h: "ہمارا مشن", p: "عمدہ کھانا سب کی پہنچ میں۔ ہم ہر کچن کو، چھوٹا ہو یا بڑا، ڈیجیٹل طاقت دیتے ہیں تاکہ وہ بھاری فیس کے بغیر آن لائن بڑھ سکے۔" },
        ],
        quote: "”عمدہ کھانا ڈھونڈنا آسان ہونا چاہیے، اور اسے بیچنا اس سے بھی آسان۔“",
        stats: [{ v: "10,000+", l: "روزانہ وزیٹرز" }, { v: "0%", l: "کمیشن" }, { v: "90+", l: "لسٹڈ ڈشز" }, { v: "🇵🇰", l: "پورے پاکستان میں" }],
        hungryT: "بھوک لگی ہے؟", hungry: "مینو دیکھیں اور آرڈر کریں →",
        ownerT: "ریستوران کے مالک ہیں؟", owner: "اپنا ریستوران لسٹ کریں →",
      }
    : {
        badge: "OUR STORY · MARKETPLACE",
        headline: "Shah G Online, Pakistan's food marketplace",
        sub: "We connect hungry customers with the country's best local kitchens. Authentic taste, one click away.",
        intro: "Shah G Online began with a simple idea: bring every neighbourhood's best food into one place. We don't cook. We list the menus of restaurants and home kitchens across Pakistan so you can order directly from them, with zero middle-man commission. Our very first featured partner is Shah G Foods.",
        blocks: [
          { h: "For hungry customers", p: "Find a dish you love and order it straight from the kitchen by Call or WhatsApp. No fuss, just fresh, authentic desi food from the best kitchens serving your area." },
          { h: "For restaurants", p: "Put your menu in front of thousands of hungry customers. Zero commission, zero delivery headache, just a simple monthly slot and orders straight to your own number." },
          { h: "Our mission", p: "Great food should be easy to find, and easy to sell. We give every kitchen, big or small, the digital power to grow online without heavy fees." },
        ],
        quote: "“Great food should be easy to find, and even easier to sell.”",
        stats: [{ v: "10,000+", l: "Daily visitors" }, { v: "0%", l: "Commission" }, { v: "90+", l: "Dishes listed" }, { v: "🇵🇰", l: "Nationwide" }],
        hungryT: "Feeling hungry?", hungry: "Explore menus & order →",
        ownerT: "Own a restaurant?", owner: "List your restaurant →",
      };

  return (
    <div>
      {/* HERO, text one side, food-orbit animation on the other */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#5E1A86 0%,#8E1E7C 50%,#B71C66 100%)", color: "#fff" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.13, background: "radial-gradient(circle at 88% 16%, #F7D774 0 12px, transparent 13px),radial-gradient(circle at 12% 78%, #F7D774 0 9px, transparent 10px),radial-gradient(circle at 60% 92%, #F7D774 0 6px, transparent 7px)" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 20px 52px", position: "relative", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 34 }}>
          <div style={{ flex: "1.2 1 340px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
            <div style={{ display: "inline-block", background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".6px" }}>{A.badge}</div>
            <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(30px,4.6vw,52px)", lineHeight: ur ? 1.5 : 1.08, margin: 0, fontWeight: 400, letterSpacing: ur ? "normal" : "-.5px" }}>{A.headline}</h1>
            <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.9)", margin: 0, maxWidth: 560, lineHeight: 1.75 }}>{A.sub}</p>
          </div>
          <div style={{ flex: "1 1 280px", minWidth: 260 }}>
            <FoodOrbit center="🍽️" items={["🍛", "🍗", "🥘", "🫓", "🍢", "🥤", "🍰", "🫖"]} onDark speed={26} />
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 20px 60px" }}>
        <p style={{ fontSize: 18, lineHeight: 1.9, color: "#3D362D", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>{A.intro}</p>

        {/* STORY ROWS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48, marginTop: 54 }}>
          {A.blocks.map((b, i) => {
            const imageRight = i % 2 === 0;
            return (
              <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", flexDirection: imageRight ? "row" : "row-reverse" }}>
                <div style={{ flex: "1 1 300px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 12, background: "#FCF2F1", color: RED, fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 20, marginBottom: 14 }}>{i + 1}</div>
                  <h2 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, margin: "0 0 12px", lineHeight: 1.15 }}>{b.h}</h2>
                  <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "#5A5245", margin: 0 }}>{b.p}</p>
                </div>
                <div style={{ flex: "1 1 320px", width: "100%", background: "linear-gradient(160deg,#FCF6EC,#F6EDDD)", border: "1px solid #EFE5D3", borderRadius: 22, padding: "18px 0" }}>
                  <FoodOrbit center={orbits[i].center} items={orbits[i].items} speed={20 + i * 4} />
                </div>
              </div>
            );
          })}
        </div>

        {/* QUOTE */}
        <div style={{ textAlign: "center", margin: "56px auto", maxWidth: 720 }}>
          <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(22px,3vw,32px)", fontStyle: "italic", color: "#211812", lineHeight: 1.4 }}>{A.quote}</div>
          <div style={{ marginTop: 14, fontWeight: 800, color: RED, fontSize: 13, letterSpacing: 1 }}>— SHAH G ONLINE</div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
          {A.stats.map((s, i) => (
            <div key={i} style={{ ...card, textAlign: "center" }}>
              <div className="num" style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 34, color: RED }}>{s.v}</div>
              <div style={{ fontSize: 12.5, color: "#8A8072", fontWeight: 600, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* DUAL CTA */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: 44 }}>
          <div style={{ background: "#16171B", color: "#fff", borderRadius: 20, padding: "30px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 30 }}>🍛</div>
            <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 24 }}>{A.hungryT}</div>
            <Link href="/restaurant/shah-g-foods/menu" style={{ alignSelf: "flex-start", textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 24px", borderRadius: 13, marginTop: 4 }}>{A.hungry}</Link>
          </div>
          <div style={{ background: "linear-gradient(160deg,#5E1A86,#B71C66)", color: "#fff", borderRadius: 20, padding: "30px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 30 }}>🏪</div>
            <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 24 }}>{A.ownerT}</div>
            <Link href="/partner" style={{ alignSelf: "flex-start", textDecoration: "none", background: "#fff", color: "#5E1A86", fontWeight: 800, fontSize: 15, padding: "13px 24px", borderRadius: 13, marginTop: 4 }}>{A.owner}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- BRANCHES ---------------- */
export function BranchesContent() {
  const { ur, t, p } = useLangPack();
  const { branch, setBranch } = useApp();
  return (
    <>
    <PageHero title={ur ? "شاہ جی فوڈز کی شاخیں" : "Shah G Foods Branches"} subtitle={t.brDesc} badge={ur ? "فیچرڈ ریستوران" : "FEATURED RESTAURANT"} image={SITE_IMAGES.aboutHero} />
    <div style={WRAP}>
      <div style={{ fontSize: 13, color: "#B0A692", marginBottom: 18 }}>{p.branchesNote}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
        {BRANCHES.map((b) => (
          <div key={b.name} onClick={() => setBranch(b.name)} style={{ ...card, cursor: "pointer", border: `1.5px solid ${branch === b.name ? RED : "#EAE1D2"}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{b.name}</div>
              <div className="num" style={{ fontSize: 10.5, fontWeight: 800, color: "#2E7D32", background: "#E7F3E7", padding: "4px 9px", borderRadius: 20, whiteSpace: "nowrap" }}>● {t.openNow}</div>
            </div>
            <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 6, lineHeight: 1.5 }}>{b.address}</div>
            <div className="num" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12, fontSize: 12, color: "#5A5245", fontWeight: 600 }}>
              <span>🕐 {t.hoursText}</span><span>📍 {b.dist}</span>
            </div>
            <Link href={`/branches/${branchSlug(b.name)}`} onClick={(e) => e.stopPropagation()} style={{ display: "inline-block", marginTop: 12, textDecoration: "none", color: RED, fontWeight: 800, fontSize: 12.5 }}>
              {t.branches === "Branches" ? `View ${b.name} page →` : `${b.name} کا صفحہ ←`}
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

/* ---------------- CAREERS ---------------- */
export function CareersContent() {
  const { p } = useLangPack();
  return (
    <>
    <PageHero title={p.careersTitle} subtitle={p.careersSub} image={SITE_IMAGES.homeHero} />
    <div style={WRAP}>
      <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 22, margin: "8px 0 14px" }}>{p.perksTitle}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 14 }}>
        {p.perks.map((perk, i) => (
          <div key={i} style={card}>
            <div style={{ fontSize: 20 }}>{["💰", "🍽️", "📈", "🤝"][i] || "✨"}</div>
            <div style={{ fontWeight: 700, marginTop: 8, fontSize: 14.5 }}>{perk}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 22, margin: "34px 0 14px" }}>{p.openRoles}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {p.roles.map((r, i) => (
          <div key={i} style={{ ...card, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{r.title}</div>
              <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 3 }}>{r.type} · {r.loc}</div>
            </div>
            <a href="mailto:careers@shahgfood.com" style={{ textDecoration: "none", border: `1.5px solid ${RED}`, color: RED, fontWeight: 800, fontSize: 13.5, padding: "10px 20px", borderRadius: 12 }}>{p.apply}</a>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

/* ---------------- CONTACT ---------------- */
export function ContactContent() {
  const { p } = useLangPack();
  const [sent, setSent] = useState(false);
  const input: React.CSSProperties = { marginTop: 6, width: "100%", border: "1.5px solid #E0D6C4", background: "#F9F6F0", borderRadius: 12, padding: 13, fontSize: 15, fontFamily: "inherit", outline: "none" };
  return (
    <>
    <PageHero title={p.contactTitle} subtitle={p.contactSub} image={SITE_IMAGES.aboutHero} />
    <div style={WRAP}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 22, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 14 }}>
          {[{ icon: "📞", t: p.callTitle, v: p.callVal, href: "tel:+923307862992" }, { icon: "✉️", t: p.emailTitle, v: p.emailVal, href: "mailto:hello@shahgfood.com" }, { icon: "📍", t: p.visitTitle, v: p.visitVal }].map((c, i) => (
            <div key={i} style={{ ...card, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F5EEE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flex: "none" }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 11.5, color: "#8A8072", fontWeight: 700 }}>{c.t}</div>
                {c.href ? <a href={c.href} className="num" style={{ fontWeight: 800, fontSize: 15, color: "#211D18", textDecoration: "none" }}>{c.v}</a> : <div style={{ fontWeight: 800, fontSize: 15 }}>{c.v}</div>}
              </div>
            </div>
          ))}
          <div style={{ ...card, background: "#211812", color: "#fff", border: "none", textAlign: "center", fontWeight: 700, fontSize: 13.5 }}>🕐 {p.hoursTitle}</div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ ...card, flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{p.formTitle}</div>
          {sent ? (
            <div style={{ padding: "20px 0", textAlign: "center", color: "#1E5631", fontWeight: 700 }}>✅ {p.fSent}</div>
          ) : (
            <>
              <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{p.fName}<input required placeholder={p.fName} style={input} /></label>
              <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{p.fPhone}<input className="num" required placeholder="03XX XXXXXXX" style={input} /></label>
              <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{p.fMsg}<textarea required rows={3} placeholder={p.fMsg} style={{ ...input, resize: "none" }} /></label>
              <button type="submit" style={{ cursor: "pointer", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 14, borderRadius: 13 }}>{p.fSend}</button>
            </>
          )}
        </form>
      </div>
    </div>
    </>
  );
}

/* ---------------- FAQS ---------------- */
export function FaqsContent() {
  const { p } = useLangPack();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
    <PageHero title={p.faqTitle} subtitle={p.faqSub} image={SITE_IMAGES.homeHero} />
    <div style={{ ...WRAP, maxWidth: 800 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {p.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div onClick={() => setOpen(isOpen ? null : i)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "16px 18px" }}>
                <div style={{ fontWeight: 800, fontSize: 15, flex: 1 }}>{f.q}</div>
                <div style={{ color: RED, fontSize: 20, fontWeight: 700, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform .2s" }}>+</div>
              </div>
              {isOpen && <div style={{ padding: "0 18px 18px", fontSize: 14, color: "#5A5245", lineHeight: 1.7 }}>{f.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

/* ---------------- TRACK ---------------- */
export function TrackContent() {
  const { ur, t, x, p } = useLangPack();
  const [id, setId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const timers = useRef<ReturnType<typeof setInterval>[]>([]);

  const fmt = (n: number) => (ur ? "" : "Rs. ") + n.toLocaleString("en-US") + (ur ? " روپے" : "");

  const clearTimers = () => { timers.current.forEach(clearInterval); timers.current = []; };

  const fetchOrder = useCallback((orderId: string): Order | null => {
    return getOrder(orderId) || null;
  }, []);

  const startTracking = useCallback((clean: string) => {
    const o = fetchOrder(clean);
    if (!o) { setOrder(null); setError(p.trackNotFound); return; }
    setError("");
    setOrder(o);
    setNow(Date.now());
    clearTimers();
    // Re-read localStorage so admin status changes (in another tab) show up live.
    timers.current.push(setInterval(() => { const u = fetchOrder(clean); if (u) setOrder(u); }, 1500));
    timers.current.push(setInterval(() => setNow(Date.now()), 1000));
  }, [fetchOrder, p.trackNotFound]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = id.trim().toUpperCase();
    if (clean) startTracking(clean);
  };

  // auto-load when arriving from checkout via /track?id=SJF-xxxx
  useEffect(() => {
    const qid = new URLSearchParams(window.location.search).get("id");
    if (qid) {
      setId(qid);
      startTracking(qid.trim().toUpperCase());
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trackStep = order ? ORDER_STATUSES.indexOf(order.status) : 0;
  useEffect(() => {
    if (!order) return;
    const elapsed = (now - order.createdAt) / 1000 / 60;
    const frac = Math.max(0, Math.min(1, elapsed / ETA_MIN));
    const floor = [0.04, 0.15, 0.45, 1][trackStep];
    const cap = [0.12, 0.4, 0.95, 1][trackStep];
    setProgress(Math.max(floor, Math.min(cap, frac)));
  }, [now, order, trackStep]);

  const secondsLeft = order ? Math.max(0, Math.round((order.createdAt + ETA_MIN * 60000 - now) / 1000)) : 0;
  const etaCountdown = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const orderBranch = order ? BRANCHES.find((b) => b.name === order.branch) || BRANCHES[0] : null;

  const inputStyle: React.CSSProperties = { flex: 1, border: "1.5px solid #E0D6C4", background: "#fff", borderRadius: 12, padding: 14, fontSize: 15, fontFamily: "inherit", outline: "none" };

  return (
    <div style={{ ...WRAP, maxWidth: 720 }}>
      <h1 style={H1}>{p.trackTitle}</h1>
      <p style={{ fontSize: 15.5, color: "#8A8072", marginTop: 8, marginBottom: 20, lineHeight: 1.7 }}>{p.trackSub}</p>

      <form onSubmit={submit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input className="num" value={id} onChange={(e) => setId(e.target.value)} placeholder={p.trackPh} style={inputStyle} />
        <button type="submit" style={{ cursor: "pointer", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, fontFamily: "inherit", padding: "0 24px", borderRadius: 12 }}>{p.trackBtn}</button>
      </form>
      {error && <div style={{ color: RED, fontSize: 13.5, fontWeight: 700, marginTop: 12 }}>{error}</div>}

      {order && orderBranch && (
        <div style={{ marginTop: 22 }}>
          <div style={{ background: "linear-gradient(150deg,#1E5631,#164023)", borderRadius: 22, padding: "22px 24px", color: "#fff", textAlign: "center" }}>
            <div className="num" style={{ fontSize: 13, opacity: 0.85 }}>{t.orderId}: {order.id}</div>
            <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.16)", padding: "9px 16px", borderRadius: 30 }}>
              <span style={{ fontSize: 16 }}>🕐</span>
              <span className="num" style={{ fontWeight: 800, fontSize: 14 }}>{trackStep >= 3 ? t.st3 : `${x.arrivingAt} ${etaCountdown}`}</span>
            </div>
          </div>

          <div style={{ marginTop: 16, borderRadius: 20, overflow: "hidden", border: "1px solid #EAE1D2" }}>
            <TrackingMap branch={{ lat: orderBranch.lat, lng: orderBranch.lng }} dest={order.dest} progress={progress} />
          </div>

          <div style={{ ...card, marginTop: 16 }}>
            {[0, 1, 2, 3].map((i) => {
              const icons = ["🧾", "👨‍🍳", "🛵", "🎉"];
              const titles = [t.st0, t.st1, t.st2, t.st3];
              const st = i < trackStep ? "done" : i === trackStep ? "active" : "pending";
              return (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, background: st === "active" ? RED : st === "done" ? "#1E5631" : "#EFE7D8", boxShadow: st === "active" ? "0 0 0 5px rgba(193,39,45,.15)" : "none" }}>{icons[i]}</div>
                    {i < 3 && <div style={{ width: 2, flex: 1, background: i < trackStep ? "#1E5631" : "#EFE7D8", minHeight: 20 }} />}
                  </div>
                  <div style={{ paddingBottom: 18, flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 14.5, color: st !== "pending" ? "#211D18" : "#A99C86" }}>{titles[i]}</div>
                  </div>
                </div>
              );
            })}
            <div style={{ height: 1, background: "#EEE5D6", margin: "4px 0 12px" }} />
            {order.items.map((it) => (
              <div key={it.id} className="num" style={{ display: "flex", alignItems: "center", gap: 10, padding: "3px 0" }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: TILE[it.cat as CategoryKey] || RED, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{it.qty}</div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{ur ? it.urdu : it.name}</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{fmt(it.price * it.qty)}</div>
              </div>
            ))}
            <div style={{ height: 1, background: "#EEE5D6", margin: "10px 0" }} />
            <div className="num" style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16 }}>
              <span style={{ fontFamily: "'Noto Nastaliq Urdu','Plus Jakarta Sans',serif" }}>{t.total}</span><span style={{ color: RED }}>{fmt(order.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
