"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { FaPhoneAlt, FaWhatsapp, FaExclamationCircle } from "react-icons/fa";
import { CATS, MENU, REVIEWS, SITE_IMAGES, ORDER_TEL, dishImage, waOrderLink } from "@/lib/data";
import { T, FAQS } from "@/lib/copy";
import { fmt, mono } from "@/lib/format";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { DishCard, DishRow, RED } from "@/components/ui";
import { CategoryIcon, IconStar } from "@/components/icons";
import type { CategoryKey, Review } from "@/lib/data";

const CHARCOAL = "#16171B"; // sampled from the Daal Chawal photo background
const PH_IDS = [1, 4, 8, 72, 18, 55, 71, 87]; // dish ids that cycle through the search placeholder

function Highlight({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark style={{ background: "#FCE9B0", color: "inherit", borderRadius: 3, padding: "0 1px" }}>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

// ---- Testimonial helpers -------------------------------------------------
const AVATAR_BG = ["#C1272D", "#5E1A86", "#B71C66", "#E0A020", "#1F7A4D", "#2A6BB0"];
function avatarBg(name: string) {
  let s = 0;
  for (const ch of name) s += ch.charCodeAt(0);
  return AVATAR_BG[s % AVATAR_BG.length];
}

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ flex: "none" }} aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <article style={{ flex: "none", width: 320, background: "#fff", color: "#211D18", border: "1px solid #EAE1D2", borderRadius: 18, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 16px 34px -26px rgba(60,30,10,.5)", whiteSpace: "normal", textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div style={{ width: 42, height: 42, borderRadius: "50%", flex: "none", display: "grid", placeItems: "center", background: avatarBg(r.name), color: "#fff", fontWeight: 800, fontSize: 17 }}>{r.name.charAt(0)}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</div>
          <div className="num" style={{ fontSize: 11.5, color: "#8A8072", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.meta}</div>
        </div>
        <GoogleG />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ display: "inline-flex", gap: 1 }}>{[0, 1, 2, 3, 4].map((i) => <IconStar key={i} size={14} color={i < r.rating ? "#FBBC04" : "#E3DDD0"} />)}</span>
        <span className="num" style={{ fontSize: 11.5, color: "#8A8072" }}>{r.when}</span>
      </div>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "#4A4238", display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.text}</p>
    </article>
  );
}

function MarqueeRow({ items, dir, dur }: { items: Review[]; dir: "left" | "right"; dur: number }) {
  return (
    <div className={`marquee marquee--${dir}`} style={{ ["--marquee-dur" as string]: `${dur}s` } as CSSProperties}>
      <div className="marquee__track" aria-hidden>
        {[...items, ...items].map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} r={r} />
        ))}
      </div>
    </div>
  );
}

export default function HomeContent() {
  const { area } = useApp();
  const router = useRouter();
  const t = T;
  const w = useWidth();
  const isPhone = w < 640;
  const cols = w < 900 ? 2 : w < 1200 ? 3 : 4;
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const sig = MENU[0];
  // "Most loved" excludes Daal Chawal (id 1) since it's already the hero legend above
  const featured = MENU.filter((d) => d.p && d.id !== 1).slice(0, 8);

  // hero search — same rich matching + suggestions as the menu page
  const query = search.trim().toLowerCase();
  const matches = (d: (typeof MENU)[number]) => {
    if (!query) return false;
    const c = CATS.find((x) => x.key === d.cat);
    const hay = `${d.name} ${d.desc} ${c?.label ?? ""} ${c?.short ?? ""}`.toLowerCase();
    return hay.includes(query);
  };
  const suggestions = query ? MENU.filter(matches).slice(0, 7) : [];
  const catLabel = (key: (typeof MENU)[number]["cat"]) => {
    const c = CATS.find((x) => x.key === key);
    return c ? c.short : "";
  };
  const [phIdx, setPhIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhIdx((i) => (i + 1) % PH_IDS.length), 2200);
    return () => clearInterval(id);
  }, []);
  const phDish = MENU.find((x) => x.id === PH_IDS[phIdx]);
  const heroPlaceholder = phDish ? `Search "${phDish.name}"…` : t.searchPh;

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(90deg,#5E1A86 0%,#8E1E7C 46%,#B71C66 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", minHeight: isPhone ? "calc(100svh - 96px)" : undefined }}>
        {SITE_IMAGES.homeHero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE_IMAGES.homeHero} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(94,26,134,.62) 0%,rgba(142,30,124,.5) 45%,rgba(23,13,27,.7) 100%)" }} />
          </>
        )}
        <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", padding: isPhone ? "40px 20px 44px" : "52px 20px 56px", position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {<div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".7px", marginBottom: 16 }}>{t.badge}</div>}
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(32px,5vw,54px)", lineHeight: 1.08, marginTop: 0, maxWidth: 820, fontWeight: 400, letterSpacing: "-.5px" }}>{t.heroTitle}</h1>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,.9)", margin: "12px 0 0", maxWidth: 600, lineHeight: 1.7 }}>{t.heroDesc}</p>

          <div style={{ position: "relative", width: "min(620px,100%)", marginTop: 26 }}>
            <div className="ai-search" style={{ borderRadius: 18, boxShadow: "0 24px 44px -22px rgba(0,0,0,.55)" }}>
              <form onSubmit={(e) => { e.preventDefault(); router.push(`/menu?q=${encodeURIComponent(search.trim())}`); }} className="ai-search__inner" style={{ background: "#fff", borderRadius: 15, display: "flex", alignItems: "center", gap: 8, padding: "8px 8px 8px 16px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B0A692" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-3.5-3.5" /></svg>
                <input value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)} placeholder={heroPlaceholder} style={{ border: "none", outline: "none", flex: 1, fontSize: 15.5, fontFamily: "inherit", background: "transparent", color: "#211D18" }} />
                <button type="submit" aria-label="Search" style={{ cursor: "pointer", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "inherit", padding: "11px 20px", borderRadius: 12, flex: "none" }}>Search</button>
              </form>
            </div>

            {focused && query && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "#fff", border: "1px solid #EAE1D2", borderRadius: 14, boxShadow: "0 26px 50px -18px rgba(0,0,0,.5)", overflow: "hidden", zIndex: 20, textAlign: "left" }}>
                {suggestions.length > 0 ? (
                  suggestions.map((s, i) => (
                    <button
                      key={s.id}
                      onMouseDown={(e) => { e.preventDefault(); router.push(`/menu?q=${encodeURIComponent(s.name)}`); }}
                      style={{ width: "100%", textAlign: "left", cursor: "pointer", border: "none", background: "transparent", padding: "11px 15px", display: "flex", alignItems: "center", gap: 11, borderTop: i === 0 ? "none" : "1px solid #F4EEE2", color: "#211D18" }}
                    >
                      <span style={{ color: "#B0A692", fontSize: 14, flex: "none" }}>⌕</span>
                      <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600 }}><Highlight text={s.name} q={query} /></span>
                      <span className="num" style={{ fontSize: 12, color: "#8A8072", flex: "none" }}>{catLabel(s.cat)} · {fmt(s.price)}</span>
                    </button>
                  ))
                ) : (
                  <div style={{ padding: "14px 16px", fontSize: 14, color: "#8A8072" }}>No dishes match that. Try another word.</div>
                )}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 18 }}>
            <Link href="/menu" style={{ textDecoration: "none", background: "#fff", color: RED, fontWeight: 800, fontSize: 16, padding: "15px 30px", borderRadius: 14, boxShadow: "0 16px 32px -14px rgba(0,0,0,.5)" }}>See the menu →</Link>
            <Link href="/shah-g-near-me" style={{ textDecoration: "none", border: "1.5px solid rgba(255,255,255,.55)", background: "rgba(255,255,255,.08)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 28px", borderRadius: 14 }}>Find your nearest branch</Link>
          </div>

        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "26px 20px 40px" }}>

        {/* COMPLAINTS tagline */}
        <Link href="/complaints/new" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: "#fff", border: "1.5px solid #F1D5D6", borderRadius: 18, padding: "15px 18px", marginBottom: 26 }}>
          <span style={{ width: 42, height: 42, borderRadius: 12, background: "#FCF2F1", color: RED, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><FaExclamationCircle size={19} /></span>
          <span style={{ flex: "1 1 240px" }}>
            <span style={{ display: "block", fontWeight: 800, fontSize: 16 }}>Had a bad experience at a restaurant?</span>
            <span style={{ display: "block", fontSize: 13.5, color: "#8A8072", marginTop: 2 }}>File a complaint about any restaurant in Pakistan. Your contact details stay private.</span>
          </span>
          <span style={{ color: RED, fontWeight: 800, fontSize: 14, whiteSpace: "nowrap" }}>File a complaint →</span>
        </Link>

        {/* SIGNATURE */}
        <div style={{ background: CHARCOAL, borderRadius: 26, overflow: "hidden", display: "flex", flexWrap: "wrap", color: "#fff", boxShadow: "0 24px 50px -30px rgba(0,0,0,.7)" }}>
          <div style={{ flex: "1 1 360px", minHeight: isPhone ? 190 : 320, background: CHARCOAL, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {dishImage(sig) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dishImage(sig)} alt={sig.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span className="num" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 92, color: "rgba(255,255,255,.92)" }}>{mono(sig.name)}</span>
            )}
          </div>
          <div style={{ flex: "1.2 1 360px", padding: isPhone ? "20px 20px 22px" : "40px 46px", display: "flex", flexDirection: "column", justifyContent: "center", gap: isPhone ? 8 : 13 }}>
            <div style={{ alignSelf: "flex-start", background: "#E0A020", color: "#211812", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20, letterSpacing: ".6px" }}>{t.featBadge}</div>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: isPhone ? 28 : "clamp(30px,3.8vw,44px)", lineHeight: 1.08 }}>{sig.name}</div>
            <div style={{ color: "rgba(255,255,255,.72)", fontSize: isPhone ? 13.5 : 15, lineHeight: isPhone ? 1.55 : 1.75, maxWidth: 460 }}>{t.sigSub}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: isPhone ? 4 : 8, flexWrap: "wrap" }}>
              <span className="num" style={{ fontSize: 26, fontWeight: 800 }}>{fmt(sig.price)}</span>
              <a href={`tel:${ORDER_TEL}`} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: RED, color: "#fff", fontWeight: 800, fontSize: 14.5, padding: "12px 22px", borderRadius: 13 }}>
                <FaPhoneAlt size={13} /> Call to order
              </a>
              <a href={waOrderLink(sig.name, area)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", fontWeight: 800, fontSize: 14.5, padding: "12px 20px", borderRadius: 13 }}>
                <FaWhatsapp size={17} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* CATEGORIES — single-line scroller */}
        <div style={{ marginTop: 36 }}>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 23, marginBottom: 15 }}>{t.browseCat}</div>
          <div className="no-bar" style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
            {CATS.filter((c) => c.key !== "all").map((c) => (
              <Link key={c.key} href={`/menu?cat=${c.key}`} style={{ flex: "none", minWidth: 158, textDecoration: "none", color: "inherit", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, padding: "15px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "#FCF2F1", flex: "none" }}><CategoryIcon cat={c.key as CategoryKey} size={23} color={RED} strokeWidth={1.9} /></div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, lineHeight: 1.25, whiteSpace: "nowrap" }}>{c.short}</div>
                  <div className="num" style={{ fontSize: 11.5, color: "#8A8072", marginTop: 3 }}>{MENU.filter((d) => d.cat === c.key).length} {t.dishesWord}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* MOST LOVED */}
        <div style={{ marginTop: 40 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 23 }}>{t.mostLoved}</div>
            <Link href="/menu" style={{ textDecoration: "none", fontSize: 14, fontWeight: 700, color: RED, whiteSpace: "nowrap" }}>{t.seeFullMenu}</Link>
          </div>
          {isPhone ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {featured.map((d) => (
                <DishRow key={d.id} d={d} />
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18 }}>
              {featured.map((d) => (
                <DishCard key={d.id} d={d} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TESTIMONIALS — 15,000+ verified reviews, looping marquee */}
      <section style={{ background: "#F2ECE1", color: "#211812", padding: "58px 0 62px", marginTop: 10, overflow: "hidden" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px 7px 11px", borderRadius: 999, letterSpacing: ".5px" }}>
            <GoogleG size={16} /> {t.reviewsBadge}
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(26px,3.6vw,40px)", fontWeight: 400, margin: 0, lineHeight: 1.12 }}>{t.reviewsTitle}</h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span className="num" style={{ fontSize: 30, fontWeight: 800 }}>4.8</span>
            <span style={{ display: "inline-flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((i) => <IconStar key={i} size={18} color="#FBBC04" />)}</span>
            <span style={{ fontSize: 13, color: "#8A8072", fontWeight: 700 }}>{t.onGoogle}</span>
          </div>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "#6B6355", maxWidth: 560 }}>{t.reviewsSub}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 34 }}>
          <MarqueeRow items={REVIEWS.slice(0, 5)} dir="left" dur={64} />
          <MarqueeRow items={REVIEWS.slice(5, 10)} dir="right" dur={78} />
          <MarqueeRow items={REVIEWS.slice(10, 15)} dir="left" dur={70} />
        </div>
      </section>

      {/* FAQ */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 20px 58px" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26 }}>{t.homeFaqTitle}</div>
          <div style={{ color: "#8A8072", fontSize: 14.5, marginTop: 6 }}>{t.homeFaqSub}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, padding: "4px 22px" }}>
          {FAQS.slice(0, 5).map((f, i) => (
            <details className="faq" key={i} style={{ borderTop: i === 0 ? "none" : "1px solid #EFE7D8" }}>
              <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "16px 2px", fontWeight: 800, fontSize: 15.5 }}>
                <span>{f.q}</span>
                <span className="faq-sign" style={{ flex: "none", color: RED, fontSize: 24, fontWeight: 400, lineHeight: 1 }}>+</span>
              </summary>
              <p style={{ margin: "0 2px 16px", color: "#5A5245", fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>
            </details>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 22 }}>
          <Link href="/faqs" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 14.5 }}>See all FAQs →</Link>
        </div>
      </div>
    </>
  );
}
