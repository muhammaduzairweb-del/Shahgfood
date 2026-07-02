"use client";

import { useRouter } from "next/navigation";
import { dishImage, TILE } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { cartLines, cartMath, fmt as fmtBase, mono } from "@/lib/cart";
import { useApp } from "@/components/AppProvider";
import { SummaryRow, RED } from "@/components/ui";

export default function CartDrawer() {
  const { lang, cart, cartOpen, setCartOpen, addItem, decItem } = useApp();
  const router = useRouter();
  const t = DICT[lang];
  const ur = lang === "ur";
  const fmt = (n: number) => fmtBase(n, ur);

  if (!cartOpen) return null;

  const lines = cartLines(cart);
  const { count, subtotal, delivery, tax, total } = cartMath(cart);
  const deliveryLabel = delivery === 0 ? t.free : fmt(delivery);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, animation: "fade .2s ease" }} dir={ur ? "rtl" : "ltr"}>
      <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(30,18,10,.5)" }} />
      <div style={{ position: "absolute", top: 0, insetInlineEnd: 0, bottom: 0, width: "min(430px,100%)", background: "#F7F3EB", display: "flex", flexDirection: "column", animation: "slideIn .28s cubic-bezier(.4,0,.2,1)", boxShadow: "-20px 0 60px rgba(0,0,0,.3)" }}>
        <div style={{ padding: "22px 22px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #EAE1D2" }}>
          <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 23 }}>{t.cartTitle}</div>
          <button onClick={() => setCartOpen(false)} style={{ cursor: "pointer", marginInlineStart: "auto", border: "none", background: "#EFE7D8", width: 34, height: 34, borderRadius: 10, fontSize: 18, color: "#5A5245" }}>✕</button>
        </div>

        {count === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 15, padding: 30, textAlign: "center" }}>
            <div style={{ width: 88, height: 88, borderRadius: "50%", background: "#F0E7D8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>🛍️</div>
            <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 20 }}>{t.emptyTitle}</div>
            <div style={{ fontSize: 13.5, color: "#8A8072", maxWidth: 240, lineHeight: 1.6 }}>{t.emptyDesc}</div>
            <button onClick={() => { setCartOpen(false); router.push("/menu"); }} style={{ cursor: "pointer", border: "none", background: RED, color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "inherit", padding: "12px 24px", borderRadius: 13 }}>{t.browseMenu}</button>
          </div>
        ) : (
          <>
            <div className="noscroll" style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {lines.map(({ d, qty }) => (
                  <div key={d.id} style={{ display: "flex", gap: 12, alignItems: "center", background: "#fff", borderRadius: 15, padding: 11, border: "1px solid rgba(0,0,0,.05)" }}>
                    <div style={{ flex: "none", width: 54, height: 54, borderRadius: 11, background: TILE[d.cat], display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {dishImage(d) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={dishImage(d)} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span className="num" style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 19, color: "rgba(255,255,255,.92)" }}>{mono(d.name)}</span>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 800 }}>{ur ? d.urdu : d.name}</div>
                      <div className="num" style={{ fontSize: 13, fontWeight: 700, color: RED, marginTop: 2 }}>{fmt(d.price * qty)}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 11, background: "#F5EEE1", borderRadius: 11, padding: "5px 9px" }}>
                      <button onClick={() => decItem(d.id)} style={{ cursor: "pointer", border: "none", background: "transparent", color: RED, fontSize: 18, fontWeight: 700, width: 18, lineHeight: 1 }}>−</button>
                      <span className="num" style={{ fontWeight: 800, fontSize: 14, minWidth: 14, textAlign: "center" }}>{qty}</span>
                      <button onClick={() => addItem(d.id)} style={{ cursor: "pointer", border: "none", background: "transparent", color: RED, fontSize: 18, fontWeight: 700, width: 18, lineHeight: 1 }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "16px 20px 20px", borderTop: "1px solid #EAE1D2", background: "#F7F3EB" }}>
              <SummaryRow label={t.subtotal} value={fmt(subtotal)} big />
              <SummaryRow label={t.delivery} value={deliveryLabel} big />
              <SummaryRow label={t.gst} value={fmt(tax)} big />
              <div style={{ height: 1, background: "#EAE1D2", margin: "9px 0" }} />
              <div className="num" style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, padding: "3px 0 12px" }}>
                <span style={{ fontFamily: "'Noto Nastaliq Urdu','Plus Jakarta Sans',serif" }}>{t.total}</span><span style={{ color: RED }}>{fmt(total)}</span>
              </div>
              <button onClick={() => { setCartOpen(false); router.push("/checkout"); }} style={{ cursor: "pointer", width: "100%", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 15, borderRadius: 14, boxShadow: "0 12px 24px -10px rgba(193,39,45,.7)" }}>{t.placeOrder}{fmt(total)}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
