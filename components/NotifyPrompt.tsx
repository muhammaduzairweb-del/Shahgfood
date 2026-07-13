"use client";

import { FaBell } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useApp } from "@/components/AppProvider";

const RED = "#C1272D";

export default function NotifyPrompt() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission !== "default") return; // already granted or blocked
    if (sessionStorage.getItem("notify-prompt-dismissed") === "1") return;
    const t = setTimeout(() => setShow(true), 2200); // small delay so it's not jarring
    return () => clearTimeout(t);
  }, []);

  const enable = async () => {
    try {
      const p = await Notification.requestPermission();
      if (p === "granted") window.dispatchEvent(new Event("notify-enabled"));
    } catch { /* ignore */ }
    setDone(true);
    setTimeout(() => setShow(false), 1300);
  };

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("notify-prompt-dismissed", "1");
  };

  if (!show) return null;

  return (
    <div
      dir={ur ? "rtl" : "ltr"}
      style={{
        position: "fixed",
        top: 92,
        insetInlineEnd: 16,
        zIndex: 65,
        width: "min(320px, calc(100% - 32px))",
        background: "#fff",
        border: "1px solid #EAE1D2",
        borderRadius: 16,
        boxShadow: "0 26px 50px -18px rgba(60,30,10,.45)",
        padding: "14px 15px",
        animation: "rise .35s ease",
      }}
    >
      {done ? (
        <div style={{ fontSize: 14, fontWeight: 700, color: "#2E7D32", textAlign: "center", padding: "4px 0" }}>{ur ? "✓ ہو گیا! شکریہ" : "✓ Done! Thanks"}</div>
      ) : (
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FCF2F1", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><FaBell size={17} color="#C1272D" /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#211812" }}>{ur ? "نوٹیفیکیشن آن کریں" : "Turn on notifications"}</div>
            <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 2, lineHeight: 1.45 }}>{ur ? "آرڈر یاد دہانیاں اور مزیدار آفرز حاصل کریں۔" : "Get order reminders & tasty offers."}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={enable} style={{ cursor: "pointer", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 12.5, fontFamily: "inherit", padding: "8px 15px", borderRadius: 10 }}>{ur ? "آن کریں" : "Turn on"}</button>
              <button onClick={dismiss} style={{ cursor: "pointer", border: "none", background: "transparent", color: "#8A8072", fontWeight: 700, fontSize: 12.5, fontFamily: "inherit", padding: "8px 10px" }}>{ur ? "ابھی نہیں" : "Not now"}</button>
            </div>
          </div>
          <button onClick={dismiss} aria-label="Dismiss" style={{ cursor: "pointer", flex: "none", border: "none", background: "transparent", color: "#B0A692", fontSize: 16, lineHeight: 1, alignSelf: "flex-start" }}>×</button>
        </div>
      )}
    </div>
  );
}
