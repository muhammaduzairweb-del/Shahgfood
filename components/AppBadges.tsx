"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/AppProvider";

function AppleBadge() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M16.36 12.9c.02 2.53 2.22 3.37 2.24 3.38-.02.06-.35 1.2-1.16 2.38-.7 1.02-1.42 2.03-2.56 2.05-1.12.02-1.48-.66-2.76-.66-1.28 0-1.68.64-2.74.68-1.1.04-1.94-1.1-2.64-2.12-1.44-2.08-2.54-5.87-1.06-8.43.73-1.27 2.04-2.07 3.46-2.09 1.08-.02 2.1.73 2.76.73.66 0 1.9-.9 3.2-.77.54.02 2.07.22 3.05 1.65-.08.05-1.82 1.06-1.8 3.17M14.28 5.5c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.25-.54.62-1.01 1.61-.88 2.56.93.07 1.88-.47 2.46-1.16" />
    </svg>
  );
}
function PlayBadge() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 24" aria-hidden>
      <path d="M3.6 2.2C3.3 2.5 3.1 2.9 3.1 3.5v17c0 .6.2 1 .5 1.3l.1.1L13.5 12v-.2L3.6 2.2z" fill="#00D3FF" />
      <path d="M16.9 15.2 13.5 12v-.2l3.4-3.2.1.1 4 2.3c1.1.6 1.1 1.7 0 2.3l-4.1 1.9z" fill="#FFCE00" />
      <path d="M16.9 15.2 13.5 12 3.6 21.8c.4.4 1 .4 1.7.1l11.6-6.7" fill="#FF3D44" />
      <path d="M16.9 8.8 5.3 2.1C4.6 1.7 4 1.8 3.6 2.2L13.5 12l3.4-3.2z" fill="#00F076" />
    </svg>
  );
}

// Compact app-store badges for the footer. Hidden once the app is installed.
export default function AppBadges() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const [installed, setInstalled] = useState(true); // assume installed until we check (avoids flash)

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
  }, []);

  if (installed) return null;

  const install = () => window.dispatchEvent(new Event("pwa-install"));
  const badge: React.CSSProperties = { cursor: "pointer", display: "flex", alignItems: "center", gap: 9, background: "#000", color: "#fff", border: "1px solid rgba(255,255,255,.28)", borderRadius: 11, padding: "8px 13px", fontFamily: "inherit" };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: "rgba(255,255,255,.85)", marginBottom: 9 }}>{ur ? "ایپ حاصل کریں" : "Get the app"}</div>
      <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
        <button onClick={install} style={badge}>
          <AppleBadge />
          <span style={{ textAlign: "left", lineHeight: 1.05 }}>
            <span style={{ display: "block", fontSize: 8, opacity: 0.85 }}>{ur ? "ڈاؤن لوڈ" : "Download on the"}</span>
            <span style={{ display: "block", fontSize: 13, fontWeight: 700 }}>App Store</span>
          </span>
        </button>
        <button onClick={install} style={badge}>
          <PlayBadge />
          <span style={{ textAlign: "left", lineHeight: 1.05 }}>
            <span style={{ display: "block", fontSize: 8, opacity: 0.85 }}>{ur ? "حاصل کریں" : "GET IT ON"}</span>
            <span style={{ display: "block", fontSize: 13, fontWeight: 700 }}>Google Play</span>
          </span>
        </button>
      </div>
    </div>
  );
}
