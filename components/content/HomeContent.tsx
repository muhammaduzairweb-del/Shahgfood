"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATS, MENU, SITE_IMAGES, dishImage } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { fmt as fmtBase, mono } from "@/lib/cart";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { DishCard, RED } from "@/components/ui";

const CHARCOAL = "#16171B"; // sampled from the Daal Chawal photo background

export default function HomeContent() {
  const { lang, cart, addItem, decItem, setCartOpen } = useApp();
  const router = useRouter();
  const t = DICT[lang];
  const ur = lang === "ur";
  const fmt = (n: number) => fmtBase(n, ur);
  const w = useWidth();
  const cols = w < 560 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : 4;
  const [search, setSearch] = useState("");
  const sig = MENU[0];
  // "Most loved" excludes Daal Chawal (id 1) since it's already the hero legend above
  const featured = MENU.filter((d) => d.p && d.id !== 1).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(90deg,#5E1A86 0%,#8E1E7C 46%,#B71C66 100%)", color: "#fff" }}>
        {SITE_IMAGES.homeHero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE_IMAGES.homeHero} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(94,26,134,.62) 0%,rgba(142,30,124,.5) 45%,rgba(23,13,27,.7) 100%)" }} />
          </>
        )}
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "72px 20px 70px", position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".7px" }}>{t.badge}</div>
          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(36px,6vw,68px)", lineHeight: 1.05, marginTop: 20, maxWidth: 820, fontWeight: 400, letterSpacing: "-.5px" }}>{t.heroTitle}</h1>
          <div style={{ color: "#F7D774", fontSize: "clamp(18px,2.4vw,25px)", marginTop: 14, fontWeight: 600 }}>{t.heroTagline}</div>
          <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.9)", marginTop: 16, maxWidth: 580, lineHeight: 1.75 }}>{t.heroDesc}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 28 }}>
            <Link href="/menu" style={{ textDecoration: "none", background: "#fff", color: RED, fontWeight: 800, fontSize: 16, padding: "16px 32px", borderRadius: 15, boxShadow: "0 16px 32px -12px rgba(0,0,0,.5)" }}>{t.orderNow}</Link>
            <Link href="/branches" style={{ textDecoration: "none", border: "1.5px solid rgba(255,255,255,.55)", background: "rgba(255,255,255,.08)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 28px", borderRadius: 15 }}>{t.findBranch}</Link>
          </div>
          <div className="num" style={{ display: "flex", gap: 22, flexWrap: "wrap", justifyContent: "center", marginTop: 26, fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>
            <span>⭐ 4.8 / 5</span><span>🛵 30–40 min</span><span>◉ 35+ {t.branches}</span><span>🍽️ 54 {t.dishesWord}</span>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); router.push(`/menu?q=${encodeURIComponent(search)}`); }} style={{ background: "#fff", borderRadius: 16, display: "flex", alignItems: "center", gap: 11, padding: "15px 18px", marginTop: 30, width: "min(540px,100%)", boxShadow: "0 24px 44px -22px rgba(0,0,0,.5)" }}>
            <span style={{ color: "#B0A692", fontSize: 19 }}>⌕</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPh} style={{ border: "none", outline: "none", flex: 1, fontSize: 15, fontFamily: "inherit", background: "transparent", color: "#211D18" }} />
          </form>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "26px 20px 40px" }}>
        {/* SIGNATURE */}
        <div style={{ background: CHARCOAL, borderRadius: 26, overflow: "hidden", display: "flex", flexWrap: "wrap", color: "#fff", boxShadow: "0 24px 50px -30px rgba(0,0,0,.7)" }}>
          <div style={{ flex: "1 1 360px", minHeight: 320, background: CHARCOAL, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {dishImage(sig) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dishImage(sig)} alt={sig.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span className="num" style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 92, color: "rgba(255,255,255,.92)" }}>{mono(sig.name)}</span>
            )}
          </div>
          <div style={{ flex: "1.2 1 360px", padding: "40px 46px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 13 }}>
            <div style={{ alignSelf: "flex-start", background: "#E0A020", color: "#211812", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20, letterSpacing: ".6px" }}>{t.featBadge}</div>
            <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(30px,3.8vw,44px)", lineHeight: 1.08 }}>{ur ? sig.urdu : sig.name}</div>
            <div style={{ color: "rgba(255,255,255,.72)", fontSize: 15, lineHeight: 1.75, maxWidth: 460 }}>{t.sigSub}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
              <span className="num" style={{ fontSize: 26, fontWeight: 800 }}>{fmt(sig.price)}</span>
              <button onClick={() => { addItem(1); setCartOpen(true); }} style={{ cursor: "pointer", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 26px", borderRadius: 13, fontFamily: "inherit" }}>{t.add}</button>
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        <div style={{ marginTop: 36 }}>
          <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 23, marginBottom: 15 }}>{t.browseCat}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14 }}>
            {CATS.filter((c) => c.key !== "all").map((c) => (
              <Link key={c.key} href={`/menu?cat=${c.key}`} style={{ textDecoration: "none", color: "inherit", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, padding: 18, display: "flex", alignItems: "center", gap: 13 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, background: "#F5EEE1", flex: "none" }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, lineHeight: 1.25 }}>{ur ? c.su : c.short}</div>
                  <div className="num" style={{ fontSize: 11.5, color: "#8A8072", marginTop: 3 }}>{MENU.filter((d) => d.cat === c.key).length} {t.dishesWord}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* MOST LOVED */}
        <div style={{ marginTop: 40 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
            <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 23 }}>{t.mostLoved}</div>
            <Link href="/menu" style={{ textDecoration: "none", fontSize: 14, fontWeight: 700, color: RED, whiteSpace: "nowrap" }}>{t.seeFullMenu}</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18 }}>
            {featured.map((d) => (
              <DishCard key={d.id} d={d} ur={ur} t={t} fmt={fmt} qty={cart[d.id] || 0} onAdd={() => addItem(d.id)} onDec={() => decItem(d.id)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
