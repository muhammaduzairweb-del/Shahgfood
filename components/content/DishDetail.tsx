"use client";

import Link from "next/link";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FaUtensils, FaClock } from "react-icons/fa";
import { MENU, CATS, getDishBySlug, dishSlug, dishImage, dishVariants, ORDER_TEL, waOrderLink, TILE } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { dishKB } from "@/lib/kb";
import { fmt as fmtBase, mono } from "@/lib/cart";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";

const RED = "#C1272D";
const CHARCOAL = "#16171B";
const WA_GREEN = "#25D366";

export default function DishDetail({ slug }: { slug: string }) {
  const { lang, area } = useApp();
  const t = DICT[lang];
  const ur = lang === "ur";
  const fmt = (n: number) => fmtBase(n, ur);
  const w = useWidth();
  const isPhone = w < 760;
  const cols = w < 560 ? 2 : w < 1000 ? 3 : 4;

  const d = getDishBySlug(slug);
  if (!d) return null;

  const cat = CATS.find((c) => c.key === d.cat);
  const img = dishImage(d);
  const variants = dishVariants(d);
  const kb = dishKB(d);
  const title = d.groupName ? (ur ? d.groupNameU! : d.groupName) : ur ? d.urdu : d.name;
  const serves = d.serves ?? kb.serves;
  const servesU = d.serves ?? kb.servesU;
  const related = MENU.filter((x) => x.cat === d.cat && x.id !== d.id && (!x.group || x.group !== d.group) && (!x.group || x.primary)).slice(0, 8);

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "18px 20px 60px" }}>
      <Link href={cat ? `/menu?cat=${d.cat}` : "/menu"} style={{ textDecoration: "none", color: "#8A8072", fontSize: 13.5, fontWeight: 700 }}>{ur ? "← مینو پر واپس" : "← Back to menu"}</Link>

      <div style={{ marginTop: 14, background: "#fff", border: "1px solid #EAE1D2", borderRadius: 24, overflow: "hidden", display: "flex", flexWrap: "wrap", boxShadow: "0 24px 50px -34px rgba(60,30,10,.5)" }}>
        {/* full dish image */}
        <div style={{ flex: "1 1 380px", minHeight: isPhone ? 300 : 440, background: CHARCOAL, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={`${d.name} — Shah G Foods`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span className="num" style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 64, color: "rgba(255,255,255,.9)", background: TILE[d.cat], position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{mono(d.name)}</span>
          )}
        </div>

        {/* details */}
        <div style={{ flex: "1.05 1 340px", padding: isPhone ? "24px 22px 26px" : "42px 46px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Link href={`/menu?cat=${d.cat}`} style={{ textDecoration: "none", background: "#FCF2F1", color: RED, fontSize: 12, fontWeight: 800, padding: "5px 12px", borderRadius: 999 }}>{cat ? (ur ? cat.lu : cat.label) : ""}</Link>
            <span style={{ background: d.p ? "#E0A020" : "#EFE7D8", color: "#211812", fontSize: 11, fontWeight: 800, padding: "5px 11px", borderRadius: 999 }}>{d.p ? t.tagBest : t.tagPop}</span>
          </div>

          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(30px,4.5vw,44px)", lineHeight: 1.08, margin: 0, color: "#211812" }}>{title}</h1>
          {!ur && <div className="urdu" style={{ fontSize: 20, color: "#8A8072", marginTop: -4 }}>{d.groupNameU ?? d.urdu}</div>}

          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: "#5A5245" }}>{ur ? d.du : d.desc}</p>

          {/* variant selector (Half / Full / pieces) */}
          {variants.length > 1 && (
            <div style={{ marginTop: 2 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "#8A8072", letterSpacing: ".4px", marginBottom: 8 }}>{ur ? "سائز منتخب کریں" : "CHOOSE SIZE"}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {variants.map((v) => {
                  const active = v.id === d.id;
                  return (
                    <Link
                      key={v.id}
                      href={`/menu/${dishSlug(v.name)}`}
                      style={{ textDecoration: "none", border: `1.5px solid ${active ? RED : "#E0D6C4"}`, background: active ? "#FCF2F1" : "#fff", borderRadius: 13, padding: "9px 15px", display: "flex", flexDirection: "column", alignItems: ur ? "flex-end" : "flex-start", minWidth: 96 }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 800, color: active ? RED : "#211812" }}>{ur ? v.variantU : v.variant}</span>
                      <span className="num" style={{ fontSize: 12.5, color: "#8A8072" }}>{fmt(v.price)} · {ur ? `${v.serves} افراد` : `serves ${v.serves}`}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* quick facts */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
            <span style={{ background: "#F5EEE1", color: "#5A5245", fontSize: 12.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999 }}><FaUtensils size={11} style={{ verticalAlign: "-1px", marginInlineEnd: 5 }} />{ur ? `${servesU} کے لیے` : `Serves ${serves}`}</span>
            <span style={{ background: "#F5EEE1", color: "#5A5245", fontSize: 12.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999 }}><FaClock size={11} style={{ verticalAlign: "-1px", marginInlineEnd: 5 }} />{ur ? kb.prepU : kb.prep}</span>
          </div>

          <div style={{ marginTop: 6 }}>
            <span className="num" style={{ fontSize: 30, fontWeight: 800, color: "#211812" }}>{fmt(d.price)}</span>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
            <a href={`tel:${ORDER_TEL}`} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 26px", borderRadius: 13 }}><FaPhoneAlt size={14} /> {ur ? "کال کر کے آرڈر کریں" : "Order via Call"}</a>
            <a href={waOrderLink(d.name, area)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: WA_GREEN, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 22px", borderRadius: 13 }}>
              <FaWhatsapp size={19} /> WhatsApp
            </a>
          </div>
          <div style={{ fontSize: 12, color: "#B0A692", marginTop: 8 }}>{ur ? "شاہ جی فوڈز پر لسٹڈ · براہِ راست آرڈر کریں" : "Listed by Shah G Foods · order directly"}</div>
        </div>
      </div>

      {/* knowledge base — ingredients, prep & serving */}
      <div style={{ marginTop: 22, background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: "22px 24px" }}>
        <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 21, marginBottom: 14 }}>{ur ? "اجزاء اور تیاری" : "What's in it & how it's made"}</div>
        <div style={{ display: "grid", gridTemplateColumns: isPhone ? "1fr" : "1.4fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: RED, letterSpacing: ".5px", marginBottom: 9 }}>{ur ? "اجزاء" : "INGREDIENTS"}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(ur ? kb.ingU : kb.ing).map((ing, i) => (
                <span key={i} style={{ background: "#F5EEE1", color: "#4A4238", fontSize: 13, fontWeight: 600, padding: "7px 13px", borderRadius: 999 }}>{ing}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#FCF7EE", borderRadius: 14, padding: "13px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#B07A15", letterSpacing: ".4px" }}><FaClock size={11} style={{ verticalAlign: "-1px", marginInlineEnd: 5 }} />{ur ? "تیاری کا وقت" : "PREP TIME"}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4, color: "#211812" }}>{ur ? kb.prepU : kb.prep}</div>
            </div>
            <div style={{ background: "#FCF7EE", borderRadius: 14, padding: "13px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#B07A15", letterSpacing: ".4px" }}><FaUtensils size={11} style={{ verticalAlign: "-1px", marginInlineEnd: 5 }} />{ur ? "کتنے افراد کے لیے" : "SERVES"}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4, color: "#211812" }}>{ur ? servesU : serves}</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#B0A692", marginTop: 14, lineHeight: 1.6 }}>{ur ? "تمام کھانے تازہ، آرڈر پر تیار کیے جاتے ہیں۔ اجزاء موسم کے مطابق تھوڑے مختلف ہو سکتے ہیں۔" : "Everything is cooked fresh to order. Ingredients may vary slightly with the season."}</div>
      </div>

      {/* related dishes */}
      {related.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 24, marginBottom: 16 }}>{ur ? `${cat ? (ur ? cat.lu : cat.label) : ""} میں مزید` : `More in ${cat ? cat.label : "the menu"}`}</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14 }}>
            {related.map((r) => (
              <Link key={r.id} href={`/menu/${dishSlug(r.name)}`} style={{ textDecoration: "none", color: "inherit", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ aspectRatio: "1 / 1", position: "relative", background: dishImage(r) ? "#eee" : TILE[r.cat], overflow: "hidden" }}>
                  {dishImage(r) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={dishImage(r)} alt={ur ? r.urdu : r.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
                <div style={{ padding: "10px 12px 12px" }}>
                  <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.3 }}>{ur ? r.urdu : r.name}</div>
                  <div className="num" style={{ fontSize: 13, color: RED, fontWeight: 800, marginTop: 4 }}>{fmt(r.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
