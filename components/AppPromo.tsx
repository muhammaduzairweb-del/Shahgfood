"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";

const CHARCOAL = "#16171B";

function AppleBadge() {
  return (
    <svg width="20" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M16.36 12.9c.02 2.53 2.22 3.37 2.24 3.38-.02.06-.35 1.2-1.16 2.38-.7 1.02-1.42 2.03-2.56 2.05-1.12.02-1.48-.66-2.76-.66-1.28 0-1.68.64-2.74.68-1.1.04-1.94-1.1-2.64-2.12-1.44-2.08-2.54-5.87-1.06-8.43.73-1.27 2.04-2.07 3.46-2.09 1.08-.02 2.1.73 2.76.73.66 0 1.9-.9 3.2-.77.54.02 2.07.22 3.05 1.65-.08.05-1.82 1.06-1.8 3.17M14.28 5.5c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.25-.54.62-1.01 1.61-.88 2.56.93.07 1.88-.47 2.46-1.16" />
    </svg>
  );
}
function PlayBadge() {
  return (
    <svg width="20" height="22" viewBox="0 0 24 24" aria-hidden>
      <path d="M3.6 2.2C3.3 2.5 3.1 2.9 3.1 3.5v17c0 .6.2 1 .5 1.3l.1.1L13.5 12v-.2L3.6 2.2z" fill="#00D3FF" />
      <path d="M16.9 15.2 13.5 12v-.2l3.4-3.2.1.1 4 2.3c1.1.6 1.1 1.7 0 2.3l-4.1 1.9z" fill="#FFCE00" />
      <path d="M16.9 15.2 13.5 12 3.6 21.8c.4.4 1 .4 1.7.1l11.6-6.7" fill="#FF3D44" />
      <path d="M16.9 8.8 5.3 2.1C4.6 1.7 4 1.8 3.6 2.2L13.5 12l3.4-3.2z" fill="#00F076" />
    </svg>
  );
}

export default function AppPromo() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const [notifState, setNotifState] = useState<"idle" | "on" | "denied">("idle");

  const install = () => window.dispatchEvent(new Event("pwa-install"));

  const enableReminders = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const p = await Notification.requestPermission();
    if (p === "granted") {
      window.dispatchEvent(new Event("notify-enabled"));
      setNotifState("on");
    } else {
      setNotifState("denied");
    }
  };

  const badge: React.CSSProperties = { cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: "#000", color: "#fff", border: "1px solid rgba(255,255,255,.25)", borderRadius: 12, padding: "9px 16px", fontFamily: "inherit" };

  return (
    <section style={{ background: CHARCOAL, color: "#fff", borderRadius: 26, overflow: "hidden", margin: "40px 0 0", boxShadow: "0 24px 50px -30px rgba(0,0,0,.7)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 26px 44px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.svg" alt="Shah G Foods app" width={62} height={62} style={{ borderRadius: 16 }} />
        <h2 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 400, margin: 0, lineHeight: 1.1 }}>{ur ? "شاہ جی فوڈز ایپ حاصل کریں" : "Get the Shah G Foods app"}</h2>
        <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,.72)", maxWidth: 520, lineHeight: 1.7 }}>{ur ? "تیز آرڈرنگ، ہوم اسکرین پر، اور آف لائن بھی۔ ابھی انسٹال کریں۔" : "Faster ordering, right on your home screen, works offline too. Install it in one tap."}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 6 }}>
          <button onClick={install} style={badge}>
            <AppleBadge />
            <span style={{ textAlign: "left", lineHeight: 1.1 }}>
              <span style={{ display: "block", fontSize: 9.5, opacity: 0.85 }}>{ur ? "ڈاؤن لوڈ کریں" : "Download on the"}</span>
              <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>App Store</span>
            </span>
          </button>
          <button onClick={install} style={badge}>
            <PlayBadge />
            <span style={{ textAlign: "left", lineHeight: 1.1 }}>
              <span style={{ display: "block", fontSize: 9.5, opacity: 0.85 }}>{ur ? "حاصل کریں" : "GET IT ON"}</span>
              <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>Google Play</span>
            </span>
          </button>
        </div>

        <button
          onClick={enableReminders}
          disabled={notifState === "on"}
          style={{ cursor: notifState === "on" ? "default" : "pointer", marginTop: 8, border: "1px solid rgba(255,255,255,.3)", background: notifState === "on" ? "rgba(46,125,50,.25)" : "rgba(255,255,255,.08)", color: "#fff", fontWeight: 700, fontSize: 13.5, fontFamily: "inherit", padding: "10px 18px", borderRadius: 999 }}
        >
          {notifState === "on" ? (ur ? "✓ نوٹیفیکیشن آن ہیں" : "✓ Notifications on") : notifState === "denied" ? (ur ? "اجازت مسترد — براؤزر سیٹنگز سے آن کریں" : "Blocked — enable in browser settings") : `🔔 ${ur ? "نوٹیفیکیشن آن کریں" : "Turn on notifications"}`}
        </button>
      </div>
    </section>
  );
}
