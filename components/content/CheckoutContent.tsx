"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TILE } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { cartLines, cartMath, fmt as fmtBase } from "@/lib/cart";
import { createOrder } from "@/lib/orders";
import { useApp } from "@/components/AppProvider";
import { Field, PayOption, SummaryRow, RED } from "@/components/ui";

export default function CheckoutContent() {
  const { lang, branch, cart, clearCart, user } = useApp();
  const router = useRouter();
  const t = DICT[lang];
  const ur = lang === "ur";
  const fmt = (n: number) => fmtBase(n, ur);

  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState<"cod" | "card">("cod");
  const [placing, setPlacing] = useState(false);
  const [cust, setCust] = useState({ name: "", phone: "", address: "", notes: "", city: "Islamabad" as "Islamabad" | "Rawalpindi" });

  useEffect(() => {
    if (user?.name) setCust((c) => ({ ...c, name: c.name || user.name }));
  }, [user]);

  const lines = cartLines(cart);
  const { subtotal, delivery, tax, total } = cartMath(cart);
  const deliveryLabel = delivery === 0 ? t.free : fmt(delivery);

  // empty cart guard
  if (lines.length === 0) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 44 }}>🛍️</div>
        <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 24, marginTop: 10 }}>{t.emptyTitle}</div>
        <div style={{ color: "#8A8072", marginTop: 6 }}>{t.emptyDesc}</div>
        <Link href="/menu" style={{ display: "inline-block", marginTop: 20, textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 26px", borderRadius: 13 }}>{t.browseMenu}</Link>
      </div>
    );
  }

  const placeOrder = () => {
    setPlacing(true);
    const items = lines.map(({ d, qty }) => ({ id: d.id, name: d.name, urdu: d.urdu, qty, price: d.price, cat: d.cat }));
    const order = createOrder({ branch, city: cust.city, customer: { name: cust.name, phone: cust.phone, address: cust.address, notes: cust.notes }, items, subtotal, delivery, tax, total, lang });
    clearCart();
    router.push(`/track?id=${order.id}`);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px 60px" }}>
      <div onClick={() => router.push("/menu")} style={{ cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#8A8072", marginBottom: 14 }}>‹ {t.menu}</div>
      <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 30, marginBottom: 22, fontWeight: 400 }}>{t.checkout}</h1>

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 26, maxWidth: 540 }}>
        {[1, 2, 3].map((n) => {
          const labels = [t.stepAddress, t.stepPayment, t.stepTrack];
          const on = n <= step;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <div className="num" style={{ width: 30, height: 30, borderRadius: "50%", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, background: on ? RED : "#EFE7D8", color: on ? "#fff" : "#A99C86" }}>{n}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: on ? "#211D18" : "#A99C86", whiteSpace: "nowrap" }}>{labels[n - 1]}</div>
              <div style={{ flex: 1, height: 2, background: n < step ? RED : "#EFE7D8", minWidth: 12 }} />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 22, alignItems: "flex-start" }}>
        <div style={{ flex: "2 1 380px", display: "flex", flexDirection: "column", gap: 14 }}>
          {step === 1 && (
            <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{t.deliveryDetails}</div>
              <Field label={t.lblName} placeholder={t.phName} value={cust.name} onChange={(v) => setCust((c) => ({ ...c, name: v }))} />
              <Field label={t.lblPhone} placeholder={t.phPhone} numeric value={cust.phone} onChange={(v) => setCust((c) => ({ ...c, phone: v }))} />
              <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{t.lblAddress}
                <textarea value={cust.address} onChange={(e) => setCust((c) => ({ ...c, address: e.target.value }))} placeholder={t.phAddress} rows={2} style={{ marginTop: 6, width: "100%", border: "1.5px solid #E0D6C4", background: "#F9F6F0", borderRadius: 12, padding: 13, fontSize: 15, fontFamily: "inherit", outline: "none", resize: "none" }} />
              </label>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072", marginBottom: 6 }}>{t.lblCity}</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {(["Islamabad", "Rawalpindi"] as const).map((cc) => {
                    const on = cust.city === cc;
                    return <div key={cc} onClick={() => setCust((c) => ({ ...c, city: cc }))} style={{ cursor: "pointer", flex: 1, textAlign: "center", padding: 11, borderRadius: 12, fontSize: 13.5, fontWeight: 700, border: `1.5px solid ${on ? RED : "#E7DECD"}`, background: on ? "#FCF2F1" : "#fff", color: on ? RED : "#5A5245" }}>{cc}</div>;
                  })}
                </div>
              </div>
              <Field label={t.lblNotes} placeholder={t.phNotes} value={cust.notes} onChange={(v) => setCust((c) => ({ ...c, notes: v }))} />
              <button onClick={() => { setStep(2); window.scrollTo(0, 0); }} style={{ cursor: "pointer", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 15, borderRadius: 14, marginTop: 4 }}>{t.continuePay}</button>
            </div>
          )}
          {step === 2 && (
            <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{t.payMethod}</div>
              <PayOption icon="💵" title={t.cod} desc={t.codDesc} active={payMethod === "cod"} onClick={() => setPayMethod("cod")} />
              <PayOption icon="💳" title={t.card} desc={t.cardDesc} active={payMethod === "card"} onClick={() => setPayMethod("card")} />
              {payMethod === "card" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid #EEE5D6", paddingTop: 14 }}>
                  <Field label={t.lblCardNum} placeholder="4242 4242 4242 4242" numeric />
                  <div style={{ display: "flex", gap: 12 }}>
                    <Field label={t.lblExp} placeholder="MM/YY" numeric flex />
                    <Field label={t.lblCvc} placeholder="123" numeric flex />
                  </div>
                </div>
              )}
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <button onClick={() => { setStep(1); window.scrollTo(0, 0); }} style={{ cursor: "pointer", border: "1.5px solid #E0D6C4", background: "#fff", color: "#211D18", fontWeight: 700, fontSize: 15, fontFamily: "inherit", padding: "14px 18px", borderRadius: 13 }}>{t.backAddress}</button>
                <button onClick={placeOrder} disabled={placing} style={{ cursor: "pointer", flex: 1, border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 14, borderRadius: 13, opacity: placing ? 0.7 : 1 }}>{placing ? "…" : t.placeOrderBtn + fmt(total)}</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: "1 1 280px", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>{t.orderSummary}</div>
          <div className="noscroll" style={{ display: "flex", flexDirection: "column", gap: 9, maxHeight: 240, overflowY: "auto" }}>
            {lines.map(({ d, qty }) => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="num" style={{ width: 26, height: 26, borderRadius: 8, background: TILE[d.cat], color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{qty}</div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{ur ? d.urdu : d.name}</div>
                <div className="num" style={{ fontSize: 13, fontWeight: 700 }}>{fmt(d.price * qty)}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: "#EEE5D6", margin: "14px 0" }} />
          <SummaryRow label={t.subtotal} value={fmt(subtotal)} />
          <SummaryRow label={t.delivery} value={deliveryLabel} />
          <SummaryRow label={t.gst} value={fmt(tax)} />
          <div style={{ height: 1, background: "#EEE5D6", margin: "8px 0" }} />
          <div className="num" style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800, padding: "3px 0" }}>
            <span style={{ fontFamily: "'Noto Nastaliq Urdu','Plus Jakarta Sans',serif" }}>{t.total}</span><span style={{ color: RED }}>{fmt(total)}</span>
          </div>
          <div style={{ marginTop: 12, background: "#F5EEE1", borderRadius: 12, padding: "11px 13px", display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ fontSize: 17 }}>🛵</span>
            <div><div style={{ fontSize: 11, color: "#8A8072", fontWeight: 600 }}>{t.etaLabel}</div><div className="num" style={{ fontSize: 13.5, fontWeight: 800 }}>{t.etaVal}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
