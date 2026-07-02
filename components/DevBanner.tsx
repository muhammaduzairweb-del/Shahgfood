"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/AppProvider";

export default function DevBanner() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("sjf.devbanner") === "hidden") setShow(false);
  }, []);

  if (!show) return null;

  const msg = ur
    ? "یہ ویب سائٹ ابھی زیرِ تعمیر ہے — براہ کرم یہاں اصل آرڈر نہ کریں۔"
    : "This website is under development — please do NOT place real orders here.";

  return (
    <div
      dir={ur ? "rtl" : "ltr"}
      style={{
        position: "relative",
        zIndex: 70,
        background: "repeating-linear-gradient(45deg,#E0A020,#E0A020 14px,#caa019 14px,#caa019 28px)",
        color: "#211812",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "8px 40px",
        fontSize: 13,
        fontWeight: 800,
        textAlign: "center",
        lineHeight: 1.35,
      }}
    >
      <span style={{ fontSize: 15 }}>⚠️</span>
      <span>{msg}</span>
      <button
        onClick={() => {
          setShow(false);
          sessionStorage.setItem("sjf.devbanner", "hidden");
        }}
        aria-label="Dismiss"
        style={{ position: "absolute", insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer", border: "none", background: "rgba(33,24,18,.15)", color: "#211812", width: 24, height: 24, borderRadius: 8, fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        ✕
      </button>
    </div>
  );
}
