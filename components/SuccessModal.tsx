"use client";

const RED = "#C1272D";

export default function SuccessModal({ open, ur, title, message, onClose }: { open: boolean; ur: boolean; title: string; message: string; onClose: () => void }) {
  if (!open) return null;
  const confetti = ["🎉", "🎊", "✨", "🥳", "🍽️", "⭐"];
  return (
    <div dir={ur ? "rtl" : "ltr"} onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(30,18,10,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fade .2s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", background: "#fff", borderRadius: 24, maxWidth: 420, width: "100%", padding: "40px 30px 30px", textAlign: "center", boxShadow: "0 40px 90px -30px rgba(0,0,0,.5)", animation: "pop .45s cubic-bezier(.34,1.56,.64,1)", overflow: "hidden" }}>
        {confetti.map((e, i) => (
          <span key={i} aria-hidden style={{ position: "absolute", top: -14, left: `${8 + i * 16}%`, fontSize: 18, animation: `confettiFall ${1.8 + (i % 3) * 0.4}s ease-in ${i * 0.12}s infinite` }}>{e}</span>
        ))}
        <div style={{ width: 84, height: 84, margin: "0 auto", borderRadius: "50%", background: "#EAF7EE", display: "grid", placeItems: "center", animation: "checkPop .5s cubic-bezier(.34,1.56,.64,1) .1s both" }}>
          <svg width="46" height="46" viewBox="0 0 52 52" aria-hidden>
            <circle cx="26" cy="26" r="24" fill="none" stroke="#2E9E4F" strokeWidth="3" opacity=".28" />
            <path d="M14 27l8 8 16-18" fill="none" stroke="#2E9E4F" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 48, strokeDashoffset: 48, animation: "checkDraw .4s ease .45s forwards" }} />
          </svg>
        </div>
        <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 26, marginTop: 16, color: "#211812" }}>{title}</div>
        <div style={{ fontSize: 14.5, color: "#5A5245", marginTop: 10, lineHeight: 1.65 }}>{message}</div>
        <div style={{ marginTop: 14, background: "#FCF7EE", borderRadius: 12, padding: "10px 14px", fontSize: 12.5, color: "#B07A15", lineHeight: 1.5, textAlign: ur ? "right" : "left" }}>📩 {ur ? "براہ کرم اپنا اسپام/جنک فولڈر بھی چیک کریں — کبھی کبھار ای میل وہاں چلی جاتی ہے۔" : "Please also check your Spam / Junk folder — our email sometimes lands there."}</div>
        <button onClick={onClose} style={{ cursor: "pointer", marginTop: 20, border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "12px 32px", borderRadius: 13, fontFamily: "inherit" }}>{ur ? "زبردست، شکریہ!" : "Great, thanks!"}</button>
      </div>
    </div>
  );
}
