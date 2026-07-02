"use client";

import { useEffect, useMemo, useState } from "react";
import { CATS, MENU, type CategoryKey } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { fmt as fmtBase } from "@/lib/cart";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { DishCard, RED } from "@/components/ui";
import PageHero from "@/components/PageHero";

export default function MenuContent() {
  const { lang, cart, addItem, decItem } = useApp();
  const t = DICT[lang];
  const ur = lang === "ur";
  const fmt = (n: number) => fmtBase(n, ur);
  const w = useWidth();
  const cols = w < 560 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : 4;

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
  const dishes = useMemo(
    () => MENU.filter((d) => (cat === "all" || d.cat === cat) && (!query || d.name.toLowerCase().includes(query) || d.urdu.includes(search.trim()))),
    [cat, query, search]
  );

  return (
    <>
    <PageHero title={t.menuTitle} subtitle={t.menuSub} image={encodeURI("/chicken Biryani.jpg")} />
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 50px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <div style={{ flex: "1 1 260px", maxWidth: 420, background: "#fff", border: "1px solid #EAE1D2", borderRadius: 14, display: "flex", alignItems: "center", gap: 10, padding: "12px 15px" }}>
          <span style={{ color: "#B0A692", fontSize: 17 }}>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPh} style={{ border: "none", outline: "none", flex: 1, fontSize: 14, fontFamily: "inherit", background: "transparent" }} />
        </div>
      </div>

      <div className="noscroll" style={{ display: "flex", gap: 9, overflowX: "auto", paddingBottom: 14, marginBottom: 6 }}>
        {CATS.map((c) => {
          const active = cat === c.key;
          return <button key={c.key} onClick={() => setCat(c.key)} style={{ flex: "none", cursor: "pointer", border: `1.5px solid ${active ? RED : "#E7DECD"}`, padding: "10px 17px", borderRadius: 24, fontSize: 13.5, fontWeight: 700, fontFamily: "inherit", background: active ? RED : "#fff", color: active ? "#fff" : "#5A5245" }}>{ur ? c.lu : c.label}</button>;
        })}
      </div>

      <div className="num" style={{ fontSize: 13, fontWeight: 700, color: "#8A8072", margin: "8px 0 18px" }}>{dishes.length} {t.dishesWord}</div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18 }}>
        {dishes.map((d) => (
          <DishCard key={d.id} d={d} ur={ur} t={t} fmt={fmt} qty={cart[d.id] || 0} onAdd={() => addItem(d.id)} onDec={() => decItem(d.id)} showDesc />
        ))}
      </div>
    </div>
    </>
  );
}
