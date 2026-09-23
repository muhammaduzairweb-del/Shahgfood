"use client";

import { useEffect, useState } from "react";
import { useWidth } from "@/components/hooks";

const RED = "#C1272D";

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A5245" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M6 11v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8" />
    </svg>
  );
}
function PlusSquareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A5245" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M12 9v6M9 12h6" />
    </svg>
  );
}

interface BIPEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: string }>;
}

export default function InstallApp() {
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
      <img src="/icon.svg" alt="Shah G Foods" width={44} height={44} style={{ borderRadius: 11, flex: "none", alignSelf: iosHelp ? "flex-start" : "center" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {iosHelp ? (
          <div style={{ fontSize: 13, color: "#4A4238" }}>
            <div style={{ fontWeight: 800, color: "#211812", marginBottom: 8 }}>Install in Safari</div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7 }}>
              <span style={{ flex: "none", width: 24, height: 24, borderRadius: 7, background: "#F2ECE1", display: "flex", alignItems: "center", justifyContent: "center" }}><ShareIcon /></span>
              <span>Tap the Share button below</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ flex: "none", width: 24, height: 24, borderRadius: 7, background: "#F2ECE1", display: "flex", alignItems: "center", justifyContent: "center" }}><PlusSquareIcon /></span>
              <span>Choose “Add to Home Screen”</span>
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#211812" }}>Install Shah G Foods</div>
            <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 2 }}>Order faster, right from your home screen</div>
          </>
        )}
      </div>
      {!iosHelp && (
        <button
          onClick={install}
          style={{ cursor: "pointer", flex: "none", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 13.5, fontFamily: "inherit", padding: "10px 18px", borderRadius: 12 }}
        >
          {isIOS ? ("How?") : "Install"}
        </button>
      )}
      <button onClick={dismiss} aria-label="Dismiss" style={{ cursor: "pointer", flex: "none", border: "none", background: "#F2ECE1", color: "#8A8072", width: 26, height: 26, borderRadius: "50%", fontSize: 16, lineHeight: 1 }}>×</button>
    </div>
  );
}
