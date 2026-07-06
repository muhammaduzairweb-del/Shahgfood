"use client";

import { useEffect, useState } from "react";
import { CATS, MENU, TILE, type Category, type CategoryKey, dishImage } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { fmt as fmtBase } from "@/lib/cart";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { DishCard, DishRow, RED } from "@/components/ui";
import PageHero from "@/components/PageHero";

function CategoryBanner({ c, ur, count, h, imgW }: { c: Category; ur: boolean; count: number; h: number; imgW: string }) {
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
          style={{ position: "absolute", top: 0, insetInlineEnd: 0, height: "100%", width: imgW, objectFit: "cover", objectPosition: "center", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 34%)", maskImage: "linear-gradient(90deg, transparent, #000 34%)" }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1, padding: "0 28px", maxWidth: "54%" }}>
        <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(32px,7.5vw,56px)", lineHeight: 1.02, color: "#F7EFE0", textTransform: ur ? "none" : "lowercase", letterSpacing: ur ? "normal" : "-.5px", textShadow: "0 4px 20px rgba(0,0,0,.5)" }}>{word}</div>
        {(ur ? c.subu : c.sub) && (
          <div style={{ marginTop: 10, color: "rgba(255,255,255,.92)", fontSize: "clamp(13px,1.6vw,16px)", fontWeight: 500, lineHeight: 1.55, fontStyle: ur ? "normal" : "italic", maxWidth: 460, textShadow: "0 2px 8px rgba(0,0,0,.45)", display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ur ? c.subu : c.sub}</div>
        )}
        <div className="num" style={{ marginTop: 13, display: "inline-block", background: "rgba(0,0,0,.32)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>{count} {ur ? "ڈشز" : "items"}</div>
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
  const bannerH = isPhone ? 240 : 320; // as big as the home Daal Chawal feature
  const imgW = isPhone ? "58%" : "50%";

  const [cat, setCat] = useState<"all" | CategoryKey>("all");
  const [search, setSearch] = useState("");

  // read ?cat= and ?q= from the URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("cat");
    const q = params.get("q");
    if (c && CATS.some((x) => x.key === c)) setCat(c as CategoryKey);
    if (q) setSearch(q);
  }, []);

  const query = search.trim().toLowerCase();
  const matches = (d: (typeof MENU)[number]) => !query || d.name.toLowerCase().includes(query) || d.urdu.includes(search.trim());

  const shownCats = cat === "all" ? CATS.filter((c) => c.key !== "all") : CATS.filter((c) => c.key === cat);
  const sections = shownCats
    .map((c) => ({ c, items: MENU.filter((d) => d.cat === c.key && matches(d)) }))
    .filter((s) => s.items.length > 0);
  const total = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <>
      <PageHero title={t.menuTitle} subtitle={t.menuSub} image={encodeURI("/chicken Biryani.jpg")} />

      {/* search — normal width, scrolls away */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 4px" }}>
        <div style={{ flex: "1 1 260px", maxWidth: 420, background: "#fff", border: "1px solid #EAE1D2", borderRadius: 14, display: "flex", alignItems: "center", gap: 10, padding: "12px 15px" }}>
          <span style={{ color: "#B0A692", fontSize: 17 }}>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPh} style={{ border: "none", outline: "none", flex: 1, fontSize: 14, fontFamily: "inherit", background: "transparent" }} />
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
              <CategoryBanner c={c} ur={ur} count={items.length} h={bannerH} imgW={imgW} />
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
