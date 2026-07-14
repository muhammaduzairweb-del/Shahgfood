"use client";

// First-visit gate for /chat: we need a name + WhatsApp number before opening a
// session so the restaurant knows who's talking (the number itself stays masked
// from the vendor UI — it's for order coordination only).

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaCommentDots, FaLock, FaUser, FaPhoneAlt } from "react-icons/fa";
import { saveChatProfile } from "@/lib/chat-store";

const GREEN = "#00A884";
const GREEN_DARK = "#008069";
const INK = "#111B21";

export default function WelcomeForm({ ur }: { ur: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setErr(ur ? "براہ کرم اپنا نام لکھیں" : "Please enter your name");
      return;
    }
    if (!/^0?3\d{9}$|^\+?92\s?3\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      setErr(ur ? "درست پاکستانی موبائل نمبر لکھیں (مثلاً 03001234567)" : "Enter a valid Pakistani mobile number (e.g. 03001234567)");
      return;
    }
    saveChatProfile({ name, phone });
  };

  const input: React.CSSProperties = {
    width: "100%", boxSizing: "border-box", fontFamily: "inherit", fontSize: 15,
    padding: "13px 15px", borderRadius: 12, border: "1.5px solid #D1D7DB",
    background: "#fff", color: INK, outline: "none",
  };
  const label: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, fontWeight: 800,
    letterSpacing: ".4px", color: "#54656F", marginBottom: 7,
  };

  return (
    <div dir={ur ? "rtl" : "ltr"} style={{ height: "100dvh", background: "#F0F2F5", display: "flex", flexDirection: "column" }}>
      <div style={{ background: GREEN_DARK, color: "#fff", padding: "14px 18px", display: "flex", alignItems: "center", gap: 13 }}>
        <Link href="/" aria-label="Back" style={{ color: "#fff", display: "flex" }}>
          <FaArrowLeft size={17} style={{ transform: ur ? "scaleX(-1)" : "none" }} />
        </Link>
        <div style={{ fontWeight: 800, fontSize: 17 }}>{ur ? "شاہ جی چیٹ" : "Shah G Chat"}</div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <form onSubmit={submit} style={{ width: "min(430px,100%)", background: "#fff", borderRadius: 22, padding: "30px 28px", boxShadow: "0 24px 60px -28px rgba(0,0,0,.35)", animation: "rise .3s ease" }}>
          <div style={{ width: 74, height: 74, borderRadius: "50%", background: "#E7F8F3", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <FaCommentDots size={30} color={GREEN} />
          </div>
          <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 25, textAlign: "center", color: INK }}>
            {ur ? "ریستوران سے بات کریں" : "Chat with restaurants"}
          </div>
          <p style={{ fontSize: 13.5, color: "#667781", textAlign: "center", lineHeight: 1.7, margin: "10px 0 22px" }}>
            {ur
              ? "اپنا نام اور واٹس ایپ نمبر بتائیں تاکہ ریستوران آپ کا آرڈر کنفرم کر سکے۔ آپ کا نمبر ریستوران کو نظر نہیں آتا۔"
              : "Tell us your name and WhatsApp number so the restaurant can confirm your order. Your number is never shown to the restaurant."}
          </p>

          <div style={{ marginBottom: 14 }}>
            <div style={label}><FaUser size={11} /> {ur ? "آپ کا نام" : "YOUR NAME"}</div>
            <input value={name} onChange={(e) => { setName(e.target.value); setErr(""); }} placeholder={ur ? "مثلاً علی خان" : "e.g. Ali Khan"} style={input} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={label}><FaPhoneAlt size={11} /> {ur ? "واٹس ایپ نمبر" : "WHATSAPP NUMBER"}</div>
            <input value={phone} onChange={(e) => { setPhone(e.target.value); setErr(""); }} placeholder="03XX XXXXXXX" inputMode="tel" className="num" style={input} />
          </div>

          {err && <div style={{ background: "#FCE9E9", color: "#C1272D", borderRadius: 10, padding: "9px 13px", fontSize: 12.5, fontWeight: 700, marginBottom: 14 }}>{err}</div>}

          <button type="submit" style={{ cursor: "pointer", width: "100%", border: "none", background: GREEN, color: "#fff", fontWeight: 800, fontSize: 15.5, fontFamily: "inherit", padding: 15, borderRadius: 13 }}>
            {ur ? "چیٹ شروع کریں" : "Start chatting"}
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11.5, color: "#8696A0", marginTop: 14 }}>
            <FaLock size={9} /> {ur ? "شاہ جی آن لائن کے ذریعے محفوظ رابطہ" : "Relayed privately by Shah G Online"}
          </div>
        </form>
      </div>
    </div>
  );
}
