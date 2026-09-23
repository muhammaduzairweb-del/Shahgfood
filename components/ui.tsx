"use client";

import Link from "next/link";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { dishImage, dishSlug, TILE, ORDER_TEL, waOrderLink, type Dish } from "@/lib/data";
import { fmt, mono } from "@/lib/format";
import { T } from "@/lib/copy";
import { useApp } from "@/components/AppProvider";

export const RED = "#C1272D";
const WA_GREEN = "#25D366";

// Order buttons: call or WhatsApp the restaurant directly.
// The WhatsApp message is prefilled with the customer's saved location.
function OrderButtons({ name, compact }: { name: string; compact?: boolean }) {
  const { area } = useApp();
  return (
    <div style={{ display: "flex", gap: 6, flex: "none" }} onClick={(e) => e.stopPropagation()}>
      <a href={waOrderLink(name, area)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: compact ? 34 : 38, height: compact ? 34 : 38, borderRadius: 11, background: WA_GREEN, color: "#fff", flex: "none" }}>
        <FaWhatsapp size={compact ? 17 : 19} />
      </a>
      <a href={`tel:${ORDER_TEL}`} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, background: RED, color: "#fff", fontWeight: 800, fontSize: compact ? 12.5 : 13.5, padding: compact ? "8px 14px" : "9px 17px", borderRadius: 11, whiteSpace: "nowrap" }}>
        <FaPhoneAlt size={compact ? 11 : 12} /> Call
      </a>
    </div>
  );
}

export function DishCard({ d, showDesc }: { d: Dish; showDesc?: boolean }) {
  const img = dishImage(d);
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,.05)", borderRadius: 20, overflow: "hidden", boxShadow: "0 14px 30px -24px rgba(60,30,10,.6)", display: "flex", flexDirection: "column" }}>
      <Link href={`/menu/${dishSlug(d.name)}`} style={{ position: "relative", aspectRatio: "1 / 1", background: img ? "#eee" : TILE[d.cat], display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", textDecoration: "none" }}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={d.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <div style={{ position: "absolute", inset: 0, opacity: 0.14, background: "radial-gradient(circle at 30% 30%, #F7D774 0 8px, transparent 9px),radial-gradient(circle at 72% 68%, #F7D774 0 6px, transparent 7px)" }} />
            <span className="num" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 46, color: "rgba(255,255,255,.92)" }}>{mono(d.name)}</span>
          </>
        )}
        <div style={{ position: "absolute", top: 10, insetInlineStart: 10, background: "rgba(0,0,0,.4)", backdropFilter: "blur(4px)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 9px", borderRadius: 20 }}>{d.p ? T.tagBest : T.tagPop}</div>
      </Link>
      <div style={{ padding: "14px 15px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <Link href={`/menu/${dishSlug(d.name)}`} style={{ fontSize: 15.5, fontWeight: 800, lineHeight: 1.3, color: "inherit", textDecoration: "none" }}>{d.groupName ?? d.name}</Link>
        {showDesc && <div style={{ fontSize: 12, color: "#8A8072", marginTop: 5, lineHeight: 1.55, minHeight: 34 }}>{d.desc}</div>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 14, gap: 8 }}>
          <span className="num" style={{ fontSize: 17, fontWeight: 800 }}>{d.group ? `from ${fmt(d.price)}` : fmt(d.price)}</span>
          <OrderButtons name={d.name} />
        </div>
      </div>
    </div>
  );
}

// Compact horizontal row — used on phones instead of the big card.
export function DishRow({ d }: { d: Dish }) {
  const img = dishImage(d);
  return (
    <div style={{ display: "flex", gap: 12, background: "#fff", borderRadius: 16, padding: 10, border: "1px solid rgba(0,0,0,.05)", boxShadow: "0 8px 20px -18px rgba(60,30,10,.6)" }}>
      <Link href={`/menu/${dishSlug(d.name)}`} style={{ flex: "none", width: 96, height: 96, borderRadius: 12, overflow: "hidden", background: img ? "#eee" : TILE[d.cat], display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={d.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span className="num" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 30, color: "rgba(255,255,255,.92)" }}>{mono(d.name)}</span>
        )}
      </Link>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Link href={`/menu/${dishSlug(d.name)}`} style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.25, color: "inherit", textDecoration: "none" }}>{d.groupName ?? d.name}</Link>
        <div style={{ fontSize: 12, color: "#8A8072", marginTop: 3, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{d.desc}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8, gap: 8 }}>
          <span className="num" style={{ fontSize: 16, fontWeight: 800 }}>{d.group ? `from ${fmt(d.price)}` : fmt(d.price)}</span>
          <OrderButtons name={d.name} compact />
        </div>
      </div>
    </div>
  );
}
