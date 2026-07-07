"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { BRANCHES, MENU, SITE_IMAGES, type CategoryKey, TILE, branchSlug } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { EXTRA, PAGES } from "@/lib/i18n-extra";
import { useApp } from "@/components/AppProvider";
import { ORDER_STATUSES, getOrder, type Order } from "@/lib/orders";
import ImageSlot from "@/components/ImageSlot";
import PageHero from "@/components/PageHero";

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
  const { ur, t, p } = useLangPack();
  const sig = MENU[0];
  const storyImgs = [SITE_IMAGES.aboutStory1, SITE_IMAGES.aboutStory2, SITE_IMAGES.aboutStory3];

  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#5E1A86 0%,#8E1E7C 50%,#B71C66 100%)", color: "#fff" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.13, background: "radial-gradient(circle at 88% 16%, #F7D774 0 12px, transparent 13px),radial-gradient(circle at 12% 78%, #F7D774 0 9px, transparent 10px),radial-gradient(circle at 60% 92%, #F7D774 0 6px, transparent 7px)" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 20px 34px", position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".6px" }}>{p.aboutBadge}</div>
          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(32px,5vw,58px)", lineHeight: 1.06, marginTop: 18, maxWidth: 820, fontWeight: 400, letterSpacing: "-.5px" }}>{p.aboutHeadline}</h1>
          <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.9)", marginTop: 16, maxWidth: 620, lineHeight: 1.75 }}>{p.aboutSub}</p>
        </div>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px", position: "relative", transform: "translateY(34px)" }}>
          <ImageSlot src={SITE_IMAGES.aboutHero} alt="Shah G Foods — our kitchen" ratio="16 / 9" label={ur ? "ہیرو تصویر" : "About hero image"} />
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 20px 60px" }}>
        {/* INTRO */}
        <p style={{ fontSize: 18, lineHeight: 1.9, color: "#3D362D", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>{p.aboutIntro}</p>

        {/* ALTERNATING STORY ROWS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48, marginTop: 54 }}>
          {p.aboutBlocks.map((b, i) => {
            const imageRight = i % 2 === 0; // block 1 & 3: image on the right
            return (
              <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", flexDirection: imageRight ? "row" : "row-reverse" }}>
                <div style={{ flex: "1 1 300px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 12, background: "#FCF2F1", color: RED, fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 20, marginBottom: 14 }}>{i + 1}</div>
                  <h2 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, margin: "0 0 12px", lineHeight: 1.15 }}>{b.h}</h2>
                  <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "#5A5245", margin: 0 }}>{b.p}</p>
                </div>
                <div style={{ flex: "1 1 320px", width: "100%" }}>
                  <ImageSlot src={storyImgs[i]} alt={b.h} ratio="1 / 1" label={ur ? `کہانی تصویر ${i + 1}` : `Story image ${i + 1}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* QUOTE */}
        <div style={{ textAlign: "center", margin: "56px auto", maxWidth: 720 }}>
          <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(22px,3vw,32px)", fontStyle: "italic", color: "#211812", lineHeight: 1.4 }}>{p.aboutQuote}</div>
          <div style={{ marginTop: 14, fontWeight: 800, color: RED, fontSize: 13, letterSpacing: 1 }}>— SHAH G FOODS</div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
          {[{ v: "35+", l: t.statBranches }, { v: "92", l: t.statDishes }, { v: "2", l: t.statCities }, { v: "Rs.180", l: ur ? sig.urdu : sig.name }].map((s, i) => (
            <div key={i} style={{ ...card, textAlign: "center" }}>
              <div className="num" style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 34, color: RED }}>{s.v}</div>
              <div style={{ fontSize: 12.5, color: "#8A8072", fontWeight: 600, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* KNOWN FOR */}
        <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 26, margin: "44px 0 14px", textAlign: "center" }}>{t.knownFor}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          {[{ icon: "🍛", tt: t.c1t, dd: t.c1d }, { icon: "🔥", tt: t.c2t, dd: t.c2d }, { icon: "🥤", tt: t.c3t, dd: t.c3d }].map((c, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ fontWeight: 800, marginTop: 8 }}>{c.tt}</div>
              <div style={{ fontSize: 13, color: "#8A8072", marginTop: 4, lineHeight: 1.6 }}>{c.dd}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/" style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, padding: "16px 36px", borderRadius: 14, boxShadow: "0 14px 28px -12px rgba(193,39,45,.6)" }}>{t.seeMenu}</Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------- BRANCHES ---------------- */
export function BranchesContent() {
  const { t, p } = useLangPack();
  const { branch, setBranch } = useApp();
  return (
    <>
    <PageHero title={t.brTitle} subtitle={t.brDesc} image={SITE_IMAGES.aboutHero} />
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
