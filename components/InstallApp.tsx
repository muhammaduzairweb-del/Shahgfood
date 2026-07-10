"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";

const RED = "#C1272D";

interface BIPEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: string }>;
}

export default function InstallApp() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const isMobile = useWidth() < 820;

  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [iosHelp, setIosHelp] = useState(false);

  useEffect(() => {
    // register the service worker (enables install + offline)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // already installed? then never show
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone) return;
    if (sessionStorage.getItem("pwa-dismissed") === "1") return;

    const ua = navigator.userAgent || "";
    const ios = /iphone|ipad|ipod/i.test(ua) && !/(crios|fxios|edgios)/i.test(ua);
    setIsIOS(ios);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", () => setShow(false));

    // iOS Safari never fires beforeinstallprompt → show the Add-to-Home-Screen hint
    if (ios) setShow(true);

    // allow a footer/link elsewhere to open the install flow
    const onManual = () => install();
    window.addEventListener("pwa-install", onManual);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("pwa-install", onManual);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const install = async () => {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      setShow(false);
    } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      setIosHelp(true);
    }
  };

  const dismiss = () => {
    setShow(false);
    setIosHelp(false);
    sessionStorage.setItem("pwa-dismissed", "1");
  };

  if (!show) return null;

  return (
    <div
      dir={ur ? "rtl" : "ltr"}
      style={{
        position: "fixed",
        bottom: isMobile ? 88 : 22,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 70,
        width: "min(440px, calc(100% - 28px))",
        background: "#fff",
        border: "1px solid #EAE1D2",
        borderRadius: 18,
        boxShadow: "0 24px 50px -18px rgba(60,30,10,.5)",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 13,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icon.svg" alt="Shah G Foods" width={44} height={44} style={{ borderRadius: 11, flex: "none" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {iosHelp ? (
          <div style={{ fontSize: 13, color: "#4A4238", lineHeight: 1.5 }}>
            {ur ? "سفاری میں شیئر بٹن ⬆️ دبائیں، پھر ”Add to Home Screen“ منتخب کریں۔" : "In Safari, tap the Share ⬆️ button, then choose “Add to Home Screen”."}
          </div>
        ) : (
          <>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#211812" }}>{ur ? "شاہ جی فوڈز ایپ انسٹال کریں" : "Install the Shah G Foods app"}</div>
            <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 2 }}>{ur ? "تیز آرڈرنگ · ہوم اسکرین پر · آف لائن بھی" : "Faster ordering · on your home screen · works offline"}</div>
          </>
        )}
      </div>
      {!iosHelp && (
        <button
          onClick={install}
          style={{ cursor: "pointer", flex: "none", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 13.5, fontFamily: "inherit", padding: "10px 18px", borderRadius: 12 }}
        >
          {isIOS ? (ur ? "کیسے؟" : "How?") : ur ? "انسٹال" : "Install"}
        </button>
      )}
      <button onClick={dismiss} aria-label="Dismiss" style={{ cursor: "pointer", flex: "none", border: "none", background: "#F2ECE1", color: "#8A8072", width: 26, height: 26, borderRadius: "50%", fontSize: 16, lineHeight: 1 }}>×</button>
    </div>
  );
}
