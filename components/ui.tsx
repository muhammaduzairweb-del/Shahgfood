"use client";

import Link from "next/link";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { dishImage, dishSlug, TILE, ORDER_TEL, waOrderLink, type Dish } from "@/lib/data";
import { mono } from "@/lib/cart";
import { useApp } from "@/components/AppProvider";
import type { Translation } from "@/lib/i18n";

export const RED = "#C1272D";
const WA_GREEN = "#25D366";

// Order buttons (marketplace: no cart — call or WhatsApp the vendor directly).
// The WhatsApp message is prefilled with the customer's saved location.
function OrderButtons({ name, ur, compact }: { name: string; ur: boolean; t: Translation; compact?: boolean }) {
  const { area } = useApp();
  return (
    <div style={{ display: "flex", gap: 6, flex: "none" }} onClick={(e) => e.stopPropagation()}>
      <a href={waOrderLink(name, area)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: compact ? 34 : 38, height: compact ? 34 : 38, borderRadius: 11, background: WA_GREEN, color: "#fff", flex: "none" }}>
        <FaWhatsapp size={compact ? 17 : 19} />
      </a>
      <a href={`tel:${ORDER_TEL}`} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, background: RED, color: "#fff", fontWeight: 800, fontSize: compact ? 12.5 : 13.5, padding: compact ? "8px 14px" : "9px 17px", borderRadius: 11, whiteSpace: "nowrap" }}>
        <FaPhoneAlt size={compact ? 11 : 12} /> {ur ? "کال کریں" : "Call"}
      </a>
    </div>
  );
}

export function DishCard({ d, ur, t, fmt, showDesc }: { d: Dish; ur: boolean; t: Translation; fmt: (n: number) => string; qty?: number; onAdd?: () => void; onDec?: () => void; showDesc?: boolean }) {
  const img = dishImage(d);
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,.05)", borderRadius: 20, overflow: "hidden", boxShadow: "0 14px 30px -24px rgba(60,30,10,.6)", display: "flex", flexDirection: "column" }}>
      <Link href={`/menu/${dishSlug(d.name)}`} style={{ position: "relative", aspectRatio: "1 / 1", background: img ? "#eee" : TILE[d.cat], display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", textDecoration: "none" }}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={ur ? d.urdu : d.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <div style={{ position: "absolute", inset: 0, opacity: 0.14, background: "radial-gradient(circle at 30% 30%, #F7D774 0 8px, transparent 9px),radial-gradient(circle at 72% 68%, #F7D774 0 6px, transparent 7px)" }} />
            <span className="num" style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 46, color: "rgba(255,255,255,.92)" }}>{mono(d.name)}</span>
          </>
        )}
        <div style={{ position: "absolute", top: 10, insetInlineStart: 10, background: "rgba(0,0,0,.4)", backdropFilter: "blur(4px)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 9px", borderRadius: 20 }}>{d.p ? t.tagBest : t.tagPop}</div>
      </Link>
      <div style={{ padding: "14px 15px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <Link href={`/menu/${dishSlug(d.name)}`} style={{ fontSize: 15.5, fontWeight: 800, lineHeight: 1.3, color: "inherit", textDecoration: "none" }}>{d.groupName ? (ur ? d.groupNameU : d.groupName) : (ur ? d.urdu : d.name)}</Link>
        {showDesc && <div style={{ fontSize: 12, color: "#8A8072", marginTop: 5, lineHeight: 1.55, minHeight: 34 }}>{ur ? d.du : d.desc}</div>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 14, gap: 8 }}>
          <span className="num" style={{ fontSize: 17, fontWeight: 800 }}>{d.group ? `${ur ? "" : "from "}${fmt(d.price)}` : fmt(d.price)}</span>
          <OrderButtons name={d.name} ur={ur} t={t} />
        </div>
      </div>
    </div>
  );
}

// Compact horizontal row — used on phones instead of the big card.
export function DishRow({ d, ur, t, fmt }: { d: Dish; ur: boolean; t: Translation; fmt: (n: number) => string; qty?: number; onAdd?: () => void; onDec?: () => void }) {
  const img = dishImage(d);
  return (
    <div style={{ display: "flex", gap: 12, background: "#fff", borderRadius: 16, padding: 10, border: "1px solid rgba(0,0,0,.05)", boxShadow: "0 8px 20px -18px rgba(60,30,10,.6)" }}>
      <Link href={`/menu/${dishSlug(d.name)}`} style={{ flex: "none", width: 96, height: 96, borderRadius: 12, overflow: "hidden", background: img ? "#eee" : TILE[d.cat], display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={ur ? d.urdu : d.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span className="num" style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 30, color: "rgba(255,255,255,.92)" }}>{mono(d.name)}</span>
        )}
      </Link>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Link href={`/menu/${dishSlug(d.name)}`} style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.25, color: "inherit", textDecoration: "none" }}>{d.groupName ? (ur ? d.groupNameU : d.groupName) : (ur ? d.urdu : d.name)}</Link>
        <div style={{ fontSize: 12, color: "#8A8072", marginTop: 3, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ur ? d.du : d.desc}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8, gap: 8 }}>
          <span className="num" style={{ fontSize: 16, fontWeight: 800 }}>{d.group ? `${ur ? "" : "from "}${fmt(d.price)}` : fmt(d.price)}</span>
          <OrderButtons name={d.name} ur={ur} t={t} compact />
        </div>
      </div>
    </div>
  );
}

export function SummaryRow({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="num" style={{ display: "flex", justifyContent: "space-between", fontSize: big ? 13.5 : 13, color: "#5A5245", padding: "3px 0" }}>
      <span style={{ fontFamily: "'Noto Nastaliq Urdu','Plus Jakarta Sans',serif" }}>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}

export function Field({ label, placeholder, numeric, flex, value, onChange, type }: { label: string; placeholder: string; numeric?: boolean; flex?: boolean; value?: string; onChange?: (v: string) => void; type?: string }) {
  return (
    <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072", flex: flex ? 1 : undefined }}>{label}
      <input type={type} className={numeric ? "num" : undefined} placeholder={placeholder} value={value} onChange={onChange ? (e) => onChange(e.target.value) : undefined} style={{ marginTop: 6, width: "100%", border: "1.5px solid #E0D6C4", background: "#F9F6F0", borderRadius: 12, padding: 13, fontSize: 15, fontFamily: "inherit", outline: "none" }} />
    </label>
  );
}

export function PayOption({ icon, title, desc, active, onClick }: { icon: string; title: string; desc: string; active: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 13, border: `1.5px solid ${active ? RED : "#E7DECD"}`, background: active ? "#FCF2F1" : "#fff", borderRadius: 14, padding: 15 }}>
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14.5 }}>{title}</div><div style={{ fontSize: 12, color: "#8A8072", marginTop: 2 }}>{desc}</div></div>
      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${active ? RED : "#C9BEA9"}`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: active ? RED : "transparent" }} />
      </div>
    </div>
  );
}
