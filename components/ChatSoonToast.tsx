"use client";

// Chat is built but not customer-facing yet: every chat entry point calls
// showChatSoon() instead of navigating, and this globally-mounted toast
// explains that WhatsApp conversations are coming soon. Delete the guards
// (not the buttons) when chat goes live.

import { useEffect, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { useApp } from "@/components/AppProvider";

const EVT = "sg-chat-soon";

/** Call from any chat button instead of navigating to /chat. */
export function showChatSoon() {
  window.dispatchEvent(new Event(EVT));
}

export default function ChatSoonToast() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const on = () => {
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 5200);
    };
    window.addEventListener(EVT, on);
    return () => { window.removeEventListener(EVT, on); clearTimeout(timer); };
  }, []);

  if (!visible) return null;

  return (
    <div
      dir={ur ? "rtl" : "ltr"}
      onClick={() => setVisible(false)}
      style={{
        position: "fixed", top: 84, left: "50%", transform: "translateX(-50%)", zIndex: 120,
        width: "min(440px, calc(100% - 28px))", cursor: "pointer",
        background: "#211812", color: "#fff", borderRadius: 15,
        borderInlineStart: "4px solid #00A884",
        boxShadow: "0 24px 50px -16px rgba(0,0,0,.55)",
        padding: "13px 16px", display: "flex", alignItems: "flex-start", gap: 12,
        animation: "rise .3s ease",
      }}
    >
      <span style={{ flex: "none", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,168,132,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FaCommentDots size={16} color="#25D366" />
      </span>
      <span style={{ fontSize: 13.5, lineHeight: 1.6 }}>
        <b>{ur ? "واٹس ایپ چیٹ بہت جلد آ رہی ہے!" : "WhatsApp chat is starting soon!"}</b>{" "}
        {ur
          ? "آپ کے صبر کا شکریہ۔ فی الحال براہِ کرم کال یا واٹس ایپ بٹن سے سیدھا ریستوران کو آرڈر کریں۔"
          : "We appreciate your patience. For now, please order directly from the restaurant using the Call or WhatsApp buttons."}
      </span>
    </div>
  );
}
