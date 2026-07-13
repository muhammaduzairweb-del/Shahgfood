"use client";

import { useEffect, useState } from "react";
import { CATS, MENU, TILE, type Category, type CategoryKey, dishImage } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { fmt as fmtBase } from "@/lib/cart";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { DishCard, DishRow, RED } from "@/components/ui";
import PageHero from "@/components/PageHero";

// dish ids whose names cycle through the search placeholder
const PH_IDS = [1, 4, 8, 72, 18, 55, 71, 87];

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

function CategoryBanner({ c, ur, count, h, imgW, phone }: { c: Category; ur: boolean; count: number; h: number; imgW: string; phone: boolean }) {
  const img = MENU.filter((d) => d.cat === c.key).map(dishImage).find(Boolean);
  const word = ur ? c.lu : c.label;
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, height: h, background: TILE[c.key as CategoryKey], display: "flex", alignItems: "center", boxShadow: "0 16px 32px -24px rgba(0,0,0,.6)" }}>
      {img && (
        // big food photo filling one side, blended into the colour on its left
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={word}
          style={{ position: "absolute", top: 0, insetInlineEnd: 0, height: "100%", width: imgW, objectFit: "cover", objectPosition: "center", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 36%)", maskImage: "linear-gradient(90deg, transparent, #000 36%)" }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1, padding: phone ? "0 20px" : "0 30px", maxWidth: "56%" }}>
        <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(34px,10vw,58px)", lineHeight: 1.0, color: "#F7EFE0", textTransform: ur ? "none" : "lowercase", letterSpacing: ur ? "normal" : "-.5px", textShadow: "0 4px 20px rgba(0,0,0,.5)" }}>{word}</div>
        {(ur ? c.subu : c.sub) && (
          <div style={{ marginTop: phone ? 7 : 10, color: "rgba(255,255,255,.92)", fontSize: phone ? 12 : "clamp(13px,1.5vw,15.5px)", fontWeight: 500, lineHeight: 1.5, fontStyle: ur ? "normal" : "italic", maxWidth: 440, textShadow: "0 2px 8px rgba(0,0,0,.45)", display: "-webkit-box", WebkitLineClamp: phone ? 2 : 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ur ? c.subu : c.sub}</div>
        )}
        <div className="num" style={{ marginTop: phone ? 9 : 13, display: "inline-block", background: "rgba(0,0,0,.32)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>{count} {ur ? "ڈشز" : "items"}</div>
      </div>
    </div>
  );
}

export default function MenuContent() {
  const { lang, cart, addItem, decItem } = useApp();
  const t = DICT[lang];
  const ur = lang === "ur";
  const fmt = (n: number) => fmtBase(n, ur);
  const w = useWidth();
  const isPhone = w < 640;
  const cols = w < 900 ? 2 : w < 1200 ? 3 : 4;
  const navTop = isPhone ? 70 : 84; // sits the sticky filter right under the navbar
  const bannerH = isPhone ? 168 : 230; // Savour-style banner proportions
  const imgW = isPhone ? "50%" : "48%";

  const [cat, setCat] = useState<"all" | CategoryKey>("all");
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  // read ?cat= and ?q= from the URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("cat");
    const q = params.get("q");
    if (c && CATS.some((x) => x.key === c)) setCat(c as CategoryKey);
    if (q) setSearch(q);
  }, []);

  const query = search.trim().toLowerCase();
  // search across name, urdu, description AND category — so "rice", "spicy", "cold" etc. all work
  const matches = (d: (typeof MENU)[number]) => {
    if (!query) return true;
    const c = CATS.find((x) => x.key === d.cat);
    const hay = `${d.name} ${d.urdu} ${d.desc} ${d.du} ${c?.label ?? ""} ${c?.lu ?? ""} ${c?.short ?? ""}`.toLowerCase();
    return hay.includes(query);
  };
  const suggestions = query ? MENU.filter((d) => matches(d) && (!d.group || d.primary)).slice(0, 8) : [];
  const catLabel = (key: CategoryKey) => {
    const c = CATS.find((x) => x.key === key);
    return c ? (ur ? c.lu : c.short) : "";
  };

  // rotating placeholder that shows real dish names
  const [phIdx, setPhIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhIdx((i) => (i + 1) % PH_IDS.length), 2200);
    return () => clearInterval(id);
  }, []);
  const phDish = MENU.find((x) => x.id === PH_IDS[phIdx]);
  const placeholder = phDish ? `${ur ? "تلاش کریں" : "Search"} "${ur ? phDish.urdu : phDish.name}"…` : t.searchPh;

  const shownCats = cat === "all" ? CATS.filter((c) => c.key !== "all") : CATS.filter((c) => c.key === cat);
  const sections = shownCats
    .map((c) => ({ c, items: MENU.filter((d) => d.cat === c.key && matches(d) && (!d.group || d.primary)) }))
    .filter((s) => s.items.length > 0);
  const total = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <>
      <PageHero title={ur ? "شاہ جی فوڈز مینو" : "Shah G Foods Menu"} subtitle={t.menuSub} image={encodeURI("/chicken Biryani.jpg")} badge={ur ? "فیچرڈ ریستوران" : "FEATURED RESTAURANT"} />

      {/* search — normal width, scrolls away */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 4px" }}>
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <div className="ai-search">
            <div className="ai-search__inner" style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 16px" }}>
              <span style={{ color: RED, fontSize: 17, display: "flex" }}>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder={placeholder}
                style={{ border: "none", outline: "none", flex: 1, fontSize: 15, fontFamily: "inherit", background: "transparent", color: "#211D18" }}
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear" style={{ cursor: "pointer", border: "none", background: "#F2ECE1", color: "#8A8072", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, lineHeight: 1, flex: "none" }}>×</button>
              )}
            </div>
          </div>

          {focused && query && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "#fff", border: "1px solid #EAE1D2", borderRadius: 14, boxShadow: "0 22px 44px -18px rgba(0,0,0,.4)", overflow: "hidden", zIndex: 45 }}>
              {suggestions.length > 0 ? (
                suggestions.map((s, i) => (
                  <button
                    key={s.id}
                    onMouseDown={(e) => { e.preventDefault(); setSearch(ur ? s.urdu : s.name); setFocused(false); }}
                    style={{ width: "100%", textAlign: ur ? "right" : "left", cursor: "pointer", border: "none", background: "transparent", padding: "11px 15px", display: "flex", alignItems: "center", gap: 11, borderTop: i === 0 ? "none" : "1px solid #F4EEE2" }}
                  >
                    <span style={{ color: "#B0A692", fontSize: 14, flex: "none" }}>⌕</span>
                    <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: "#211D18" }}><Highlight text={ur ? s.urdu : s.name} q={query} /></span>
                    <span className="num" style={{ fontSize: 12, color: "#8A8072", flex: "none" }}>{catLabel(s.cat)} · {fmt(s.price)}</span>
                  </button>
                ))
              ) : (
                <div style={{ padding: "14px 16px", fontSize: 14, color: "#8A8072" }}>{ur ? "کوئی ڈش نہیں ملی۔" : "No matches — try another word."}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* category filter — spans the navbar width, sticks under the navbar, single line, no scrollbar */}
      <div style={{ position: "sticky", top: navTop, zIndex: 30, background: "#F2ECE1", boxShadow: "0 10px 12px -12px rgba(0,0,0,.35)" }}>
        <div className="no-bar" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "nowrap", gap: 9, overflowX: "auto", padding: "10px 22px 12px" }}>
          {CATS.map((c) => {
            const active = cat === c.key;
            return <button key={c.key} onClick={() => setCat(c.key)} style={{ flex: "none", cursor: "pointer", border: `1.5px solid ${active ? RED : "#E7DECD"}`, padding: "10px 17px", borderRadius: 24, fontSize: 13.5, fontWeight: 700, fontFamily: "inherit", background: active ? RED : "#fff", color: active ? "#fff" : "#5A5245" }}>{ur ? c.lu : c.label}</button>;
          })}
        </div>
      </div>

      {/* dishes — normal width */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 20px 50px" }}>
        {total === 0 ? (
          <div style={{ textAlign: "center", color: "#8A8072", padding: "50px 0", fontSize: 15 }}>{ur ? "کوئی ڈش نہیں ملی۔" : "No dishes found."}</div>
        ) : (
          sections.map(({ c, items }) => (
            <section key={c.key} style={{ marginTop: 26 }}>
              <CategoryBanner c={c} ur={ur} count={items.length} h={bannerH} imgW={imgW} phone={isPhone} />
              <div style={{ marginTop: 16 }}>
                {isPhone ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {items.map((d) => (
                      <DishRow key={d.id} d={d} ur={ur} t={t} fmt={fmt} qty={cart[d.id] || 0} onAdd={() => addItem(d.id)} onDec={() => decItem(d.id)} />
                    ))}
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18 }}>
                    {items.map((d) => (
                      <DishCard key={d.id} d={d} ur={ur} t={t} fmt={fmt} qty={cart[d.id] || 0} onAdd={() => addItem(d.id)} onDec={() => decItem(d.id)} showDesc />
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
}
