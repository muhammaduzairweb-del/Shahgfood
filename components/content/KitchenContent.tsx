"use client";

import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { mono } from "@/lib/cart";
import { kitchenDishPriceText, kitchenDishWaLink, kitchenWaLink, type Kitchen, type KitchenDish } from "@/lib/kitchens";

const RED = "#C1272D";
const PURPLE = "#5E1A86";
const WA_GREEN = "#25D366";
// rotating placeholder gradients until real dish photos are supplied
const TILES = ["linear-gradient(140deg,#C56A1A,#8a410c)", "linear-gradient(140deg,#9E1B2F,#5f1018)", "linear-gradient(140deg,#B7318C,#6E1A86)"];

function priceLabel(d: KitchenDish, ur: boolean): string {
  const price = kitchenDishPriceText(d);
  if (price) return price;
  return ur ? "قیمت کے لیے کال کریں" : "Call for price";
}

function DishTile({ d, i, kitchen, ur }: { d: KitchenDish; i: number; kitchen: Kitchen; ur: boolean }) {
  const name = ur && d.nameU ? d.nameU : d.name;
  const telHref = `tel:${kitchen.phone.replace(/[^0-9+]/g, "")}`;
  const waHref = kitchenDishWaLink(kitchen, d);

  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,.05)", borderRadius: 20, overflow: "hidden", boxShadow: "0 14px 30px -24px rgba(60,30,10,.6)", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", aspectRatio: "1 / 1", background: d.img ? "#eee" : TILES[i % TILES.length], display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {d.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={d.img} alt={name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <div style={{ position: "absolute", inset: 0, opacity: 0.14, background: "radial-gradient(circle at 30% 30%, #F7D774 0 8px, transparent 9px),radial-gradient(circle at 72% 68%, #F7D774 0 6px, transparent 7px)" }} />
            <span className="num" style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 46, color: "rgba(255,255,255,.92)" }}>{mono(d.name)}</span>
          </>
        )}
        <div style={{ position: "absolute", top: 10, insetInlineStart: 10, background: "rgba(0,0,0,.4)", backdropFilter: "blur(4px)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 9px", borderRadius: 20 }}>{ur ? "گھر کا کھانا" : "Home-cooked"}</div>
      </div>
      <div style={{ padding: "14px 15px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, lineHeight: 1.3, color: "#211812" }}>{name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 14, gap: 8, flexWrap: "wrap" }}>
          <span className="num" style={{ fontSize: 15, fontWeight: 800, color: RED }}>{priceLabel(d, ur)}</span>
          <div style={{ display: "flex", gap: 6, flex: "none" }}>
            <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 11, background: WA_GREEN, color: "#fff", flex: "none" }}>
              <FaWhatsapp size={19} />
            </a>
            <a href={telHref} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, background: RED, color: "#fff", fontWeight: 800, fontSize: 13.5, padding: "9px 17px", borderRadius: 11, whiteSpace: "nowrap" }}>
              <FaPhoneAlt size={12} /> {ur ? "کال کریں" : "Call"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KitchenContent({ kitchen }: { kitchen: Kitchen }) {
  const { lang } = useApp();
  const ur = lang === "ur";
  const w = useWidth();
  const cols = w < 640 ? 2 : w < 900 ? 3 : 4;
  const telHref = `tel:${kitchen.phone.replace(/[^0-9+]/g, "")}`;
  const waHref = kitchenWaLink(kitchen);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ filter: kitchen.paused ? "blur(5px)" : undefined, pointerEvents: kitchen.paused ? "none" : undefined, userSelect: kitchen.paused ? "none" : undefined }}>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(115deg,${PURPLE} 0%,#8E1E7C 55%,#B71C66 100%)`, color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px 62px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".6px" }}>
            {ur ? "ہوم کچن پارٹنر" : "HOME KITCHEN PARTNER"}
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(36px,6vw,60px)", lineHeight: 1.1, margin: 0, fontWeight: 400 }}>{kitchen.name}</h1>
          <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.9)", margin: 0, maxWidth: 560, lineHeight: 1.75 }}>{ur ? kitchen.taglineU : kitchen.tagline}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 6 }}>
            <a href={telHref} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9, background: "#fff", color: RED, fontWeight: 800, fontSize: 15, padding: "13px 22px", borderRadius: 14 }}>
              <FaPhoneAlt size={14} /> {ur ? "کال کریں" : "Call"}
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9, background: "#25D366", color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 22px", borderRadius: 14 }}>
              <FaWhatsapp size={16} /> {ur ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 60px" }}>
        {/* AREAS */}
        <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: "20px 22px", marginBottom: 32, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <FaMapMarkerAlt size={18} color={RED} style={{ flex: "none", marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#8A8072", marginBottom: 8, letterSpacing: ".4px" }}>{ur ? "ڈیلیوری ایریاز" : "DELIVERS TO"}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {kitchen.areas.map((a) => (
                <span key={a} style={{ background: "#F7F3EB", border: "1px solid #EAE1D2", color: "#4A4238", fontSize: 13, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>
                  {a}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: RED, marginTop: 10 }}>{ur ? "ڈیلیوری فیس: " : "Delivery fee: "}{kitchen.deliveryFee}</div>
          </div>
        </div>

        {/* MENU */}
        <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 26, marginBottom: 16, color: "#211812" }}>{ur ? "مینو" : "Menu"}</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18 }}>
          {kitchen.dishes.map((d, i) => (
            <DishTile key={d.name} d={d} i={i} kitchen={kitchen} ur={ur} />
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px 28px", borderRadius: 14 }}>
            {ur ? "آرڈر کے لیے رابطہ کریں" : "Contact to order"}
          </a>
          <div style={{ fontSize: 11.5, color: "#B0A692", marginTop: 12 }}>
            {ur ? "آرڈر براہِ راست کچن کو جاتا ہے۔ قیمتیں و اوقات پارٹنر خود مقرر کرتا ہے۔" : "Orders go directly to the kitchen. Prices and timings are set by the partner."}
          </div>
        </div>
      </div>
      </div>

      {kitchen.paused && (
        <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
          <div style={{ position: "sticky", top: "35vh", display: "flex", justifyContent: "center", padding: "0 20px" }}>
            <div style={{ background: "#16110D", borderRadius: 20, padding: "28px 30px", textAlign: "center", maxWidth: 380, boxShadow: "0 30px 70px -20px rgba(0,0,0,.6)" }}>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: ".4px", color: "#fff" }}>{ur ? "کچن عارضی طور پر بند ہے" : "KITCHEN TEMPORARILY DOWN"}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.75)", marginTop: 8, lineHeight: 1.6 }}>{kitchen.pausedReason}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
