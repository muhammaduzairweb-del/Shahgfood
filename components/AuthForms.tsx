"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { EXTRA } from "@/lib/i18n-extra";
import { LOGO, LOGO_FILTER } from "@/lib/data";

const RED = "#C1272D";
type Mode = "login" | "signup" | "forgot";

const inputStyle: React.CSSProperties = {
  marginTop: 6,
  width: "100%",
  border: "1.5px solid #E0D6C4",
  background: "#fff",
  borderRadius: 12,
  padding: 14,
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
};

export default function AuthForms({ mode }: { mode: Mode }) {
  const router = useRouter();
  const { lang, setLang, login } = useApp();
  const x = EXTRA[lang];
  const ur = lang === "ur";

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const title = mode === "login" ? x.welcomeBack : mode === "signup" ? x.createAccount : x.forgotTitle;
  const sub = mode === "login" ? x.loginSub : mode === "signup" ? x.signupSub : x.forgotSub;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (mode === "forgot") {
      setSent(true);
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setErr(x.nameReq);
      return;
    }
    login({ name: name.trim() || contact || "Guest", contact });
    router.push("/");
  };

  return (
    <div dir={ur ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: "#F2ECE1", display: "flex", flexDirection: "column" }}>
      {/* top bar */}
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Shah G Foods" style={{ height: 50, width: "auto", objectFit: "contain", display: "block", filter: "brightness(1.02) contrast(1.12) drop-shadow(0 2px 5px rgba(0,0,0,.28))" }} />
        </Link>
        <div style={{ marginInlineStart: "auto", display: "flex", background: "#fff", border: "1px solid #E7DECD", borderRadius: 999, overflow: "hidden", padding: 2 }}>
          <div onClick={() => setLang("en")} className="num" style={{ cursor: "pointer", padding: "6px 12px", fontWeight: 800, fontSize: 12, borderRadius: 999, background: ur ? "transparent" : RED, color: ur ? "#8A8072" : "#fff" }}>EN</div>
          <div onClick={() => setLang("ur")} className="urdu" style={{ cursor: "pointer", padding: "4px 13px", fontWeight: 700, fontSize: 14, borderRadius: 999, background: ur ? RED : "transparent", color: ur ? "#fff" : "#8A8072" }}>اردو</div>
        </div>
      </div>

      {/* card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 20px 60px" }}>
        <div style={{ width: "min(430px,100%)", background: "#F7F3EB", borderRadius: 26, overflow: "hidden", boxShadow: "0 40px 90px -30px rgba(60,30,10,.45)", border: "1px solid #EAE1D2" }}>
          <div style={{ background: "linear-gradient(150deg,#C1272D,#8E1B12)", padding: "30px 30px 26px", textAlign: "center", color: "#fff" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Shah G Foods" style={{ height: 86, width: "auto", objectFit: "contain", margin: "0 auto", display: "block", filter: LOGO_FILTER }} />
            <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 26, marginTop: 14 }}>{title}</div>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.85)", marginTop: 6, lineHeight: 1.6 }}>{sub}</div>
          </div>

          <div style={{ padding: "26px 30px 30px" }}>
            {sent ? (
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 14, padding: "10px 0 6px" }}>
                <div style={{ width: 70, height: 70, borderRadius: "50%", background: "#E7F3E7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto" }}>📨</div>
                <div style={{ fontWeight: 800, fontSize: 17 }}>{x.resetSent}</div>
                <div style={{ fontSize: 13.5, color: "#8A8072", lineHeight: 1.6 }}>{x.resetSentSub}</div>
                <Link href="/login" style={{ color: RED, fontWeight: 800, textDecoration: "none", marginTop: 4 }}>{x.backToLogin}</Link>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {mode === "signup" && (
                  <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{x.fullName}
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder={ur ? "مثلاً علی خان" : "e.g. Ali Khan"} style={inputStyle} />
                  </label>
                )}
                <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{mode === "signup" || mode === "forgot" ? x.emailOrPhone : x.emailOrPhone}
                  <input className="num" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="03XX XXXXXXX" style={inputStyle} />
                </label>
                {mode !== "forgot" && (
                  <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{x.passwordLbl}
                    <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" style={inputStyle} />
                  </label>
                )}
                {mode === "signup" && (
                  <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{x.confirmPw}
                    <input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="••••••••" style={inputStyle} />
                  </label>
                )}

                {mode === "login" && (
                  <div style={{ textAlign: ur ? "left" : "right", marginTop: -4 }}>
                    <Link href="/forgot-password" style={{ color: RED, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>{x.forgotQ}</Link>
                  </div>
                )}
                {err && <div style={{ color: RED, fontSize: 12.5, fontWeight: 700 }}>{err}</div>}

                <button type="submit" style={{ cursor: "pointer", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 15, borderRadius: 13, boxShadow: "0 12px 24px -10px rgba(193,39,45,.7)", marginTop: 2 }}>
                  {mode === "login" ? x.loginBtn : mode === "signup" ? x.signupBtn : x.sendReset}
                </button>

                {mode !== "forgot" && (
                  <div style={{ textAlign: "center", fontSize: 13.5, color: "#8A8072" }}>
                    {mode === "login" ? x.noAccount : x.haveAccount}{" "}
                    <Link href={mode === "login" ? "/signup" : "/login"} style={{ color: RED, fontWeight: 700, textDecoration: "none" }}>{mode === "login" ? x.signupLink : x.loginLink}</Link>
                  </div>
                )}
                {mode === "forgot" && (
                  <Link href="/login" style={{ textAlign: "center", color: "#8A8072", fontWeight: 700, textDecoration: "none", fontSize: 13.5 }}>{x.backToLogin}</Link>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#B0A692", fontSize: 12, fontWeight: 700 }}>
                  <div style={{ flex: 1, height: 1, background: "#E0D6C4" }} />{x.orContinue}<div style={{ flex: 1, height: 1, background: "#E0D6C4" }} />
                </div>
                <Link href="/" style={{ textAlign: "center", color: "#211D18", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>{x.guestBrowse}</Link>
                <div style={{ textAlign: "center", fontSize: 11, color: "#A99C86", lineHeight: 1.5, marginTop: 4 }}>{x.agree}</div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
