"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import PageHero from "@/components/PageHero";
import SuccessModal from "@/components/SuccessModal";

const RED = "#C1272D";

export default function ComplaintContent() {
  const { lang } = useApp();
  const ur = lang === "ur";

  const ISSUES = ur
    ? [["not_delivered", "کھانا نہیں پہنچا"], ["wrong_order", "غلط آرڈر ملا"], ["poor_quality", "خراب معیار / صفائی"], ["overcharged", "زیادہ پیسے لیے"], ["rude_staff", "بدتمیز عملہ"], ["scam", "دھوکہ / فراڈ"], ["other", "کوئی اور"]]
    : [["not_delivered", "Food not delivered"], ["wrong_order", "Wrong / incomplete order"], ["poor_quality", "Poor quality / hygiene"], ["overcharged", "Overcharged"], ["rude_staff", "Rude staff"], ["scam", "Scam / fraud"], ["other", "Something else"]];

  const [f, setF] = useState({ name: "", phone: "", email: "", restaurant: "", area: "", orderDate: "", items: "", amount: "", payment: "cash", issue: "not_delivered", details: "" });
  const [evidence, setEvidence] = useState<File | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [modal, setModal] = useState(false);
  const [err, setErr] = useState("");

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setState("sending");
    const issueLabel = ISSUES.find(([v]) => v === f.issue)?.[1] || f.issue;
    const fd = new FormData();
    Object.entries({ ...f, issueLabel }).forEach(([k, v]) => fd.append(k, v));
    fd.append("payment", f.payment === "online" ? "Online / bank" : "Cash on delivery");
    if (evidence) fd.append("evidence", evidence);
    try {
      const res = await fetch("/api/complaint", { method: "POST", body: fd });
      const j = await res.json();
      if (j.ok) {
        setModal(true);
        setState("idle");
        setF({ name: "", phone: "", email: "", restaurant: "", area: "", orderDate: "", items: "", amount: "", payment: "cash", issue: "not_delivered", details: "" });
        setEvidence(null);
      } else { setState("error"); setErr(j.error || "Failed to send."); }
    } catch {
      setState("error");
      setErr(ur ? "بھیجنے میں مسئلہ ہوا۔ دوبارہ کوشش کریں۔" : "Something went wrong. Please try again.");
    }
  };

  const input: React.CSSProperties = { width: "100%", border: "1.5px solid #E0D6C4", background: "#fff", borderRadius: 12, padding: 12, fontSize: 15, fontFamily: "inherit", outline: "none", marginTop: 6 };
  const lbl: React.CSSProperties = { fontSize: 12.5, fontWeight: 800, color: "#5A5245" };

  return (
    <>
      <PageHero
        title={ur ? "شکایت درج کریں" : "File a Complaint"}
        subtitle={ur ? "کسی لسٹڈ ریستوران سے آرڈر پر مسئلہ ہوا؟ ہمیں تفصیل بتائیں — ہم تحقیق کریں گے۔" : "Had an issue with an order from a listed restaurant? Tell us what happened — we'll investigate."}
        badge={ur ? "کسٹمر سپورٹ" : "CUSTOMER SUPPORT"}
      />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "30px 20px 64px" }}>
        <div style={{ background: "#FCF7EE", border: "1px solid #EFE3CF", borderRadius: 14, padding: "14px 16px", fontSize: 13.5, color: "#8a6a2f", lineHeight: 1.6, marginBottom: 22 }}>
          ⚠️ {ur ? "شاہ جی آن لائن ایک مارکیٹ پلیس ہے — آرڈر سیدھا ریستوران سے ہوتا ہے۔ اگر کسی ریستوران نے دھوکہ دیا یا کھانا نہیں دیا تو یہ فارم بھریں، ہم پورے معاملے کی تحقیق کریں گے۔" : "Shah G Online is a marketplace — orders are placed directly with the restaurant. If a restaurant scammed you or didn't deliver, fill this form and we'll investigate the whole matter."}
        </div>

        <form onSubmit={submit} style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: "26px 24px" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px" }}><div style={lbl}>{ur ? "آپ کا نام" : "Your name"} *</div><input required value={f.name} onChange={set("name")} style={input} /></div>
            <div style={{ flex: "1 1 160px" }}><div style={lbl}>{ur ? "فون / واٹس ایپ" : "Phone / WhatsApp"} *</div><input required value={f.phone} onChange={set("phone")} placeholder="03XX XXXXXXX" style={input} /></div>
          </div>
          <div style={{ marginTop: 12 }}><div style={lbl}>{ur ? "آپ کی ای میل" : "Your email"} *</div><input required type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" style={input} /></div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <div style={{ flex: "1 1 200px" }}><div style={lbl}>{ur ? "کس ریستوران سے آرڈر کیا؟" : "Which restaurant did you order from?"} *</div><input required value={f.restaurant} onChange={set("restaurant")} placeholder={ur ? "مثلاً شاہ جی فوڈز F-10" : "e.g. Shah G Foods F-10"} style={input} /></div>
            <div style={{ flex: "1 1 140px" }}><div style={lbl}>{ur ? "علاقہ / شہر" : "Area / city"} *</div><input required value={f.area} onChange={set("area")} placeholder={ur ? "مثلاً F-10، اسلام آباد" : "e.g. F-10, Islamabad"} style={input} /></div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <div style={{ flex: "1 1 160px" }}><div style={lbl}>{ur ? "آرڈر کی تاریخ / وقت" : "Order date / time"}</div><input value={f.orderDate} onChange={set("orderDate")} placeholder={ur ? "مثلاً 12 جولائی، شام 8 بجے" : "e.g. 12 July, 8 PM"} style={input} /></div>
            <div style={{ flex: "1 1 120px" }}><div style={lbl}>{ur ? "ادا کی گئی رقم" : "Amount paid"}</div><input value={f.amount} onChange={set("amount")} placeholder="Rs …" style={input} /></div>
            <div style={{ flex: "1 1 140px" }}><div style={lbl}>{ur ? "ادائیگی" : "Payment"}</div><select value={f.payment} onChange={set("payment")} style={{ ...input, cursor: "pointer" }}><option value="cash">{ur ? "کیش آن ڈیلیوری" : "Cash on delivery"}</option><option value="online">{ur ? "آن لائن / بینک" : "Online / bank"}</option></select></div>
          </div>

          <div style={{ marginTop: 12 }}><div style={lbl}>{ur ? "آپ نے کیا آرڈر کیا؟" : "What did you order?"}</div><input value={f.items} onChange={set("items")} placeholder={ur ? "مثلاً 2x دال چاول، 1x بریانی" : "e.g. 2x Daal Chawal, 1x Biryani"} style={input} /></div>

          <div style={{ marginTop: 12 }}><div style={lbl}>{ur ? "مسئلہ کیا تھا؟" : "What went wrong?"} *</div><select required value={f.issue} onChange={set("issue")} style={{ ...input, cursor: "pointer" }}>{ISSUES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>

          <div style={{ marginTop: 12 }}><div style={lbl}>{ur ? "تفصیل سے بتائیں" : "Describe the issue in detail"} *</div><textarea required rows={4} value={f.details} onChange={set("details")} placeholder={ur ? "کیا ہوا، پورا واقعہ لکھیں…" : "Tell us exactly what happened…"} style={{ ...input, resize: "vertical" }} /></div>

          <div style={{ marginTop: 14 }}>
            <div style={lbl}>{ur ? "ثبوت (اسکرین شاٹ / تصویر) — اختیاری" : "Evidence (screenshot / photo) — optional"}</div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, border: `1.5px dashed ${evidence ? "#2E9E4F" : "#E0D6C4"}`, background: evidence ? "#EEF7EE" : "#FBF7EF", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontSize: 13.5, color: evidence ? "#2E7D32" : "#8A8072" }}>
              <span style={{ fontSize: 18 }}>{evidence ? "✅" : "📎"}</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{evidence ? evidence.name : ur ? "کوئی اسکرین شاٹ یا تصویر اپ لوڈ کریں" : "Upload a screenshot or photo"}</span>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setEvidence(e.target.files?.[0] || null)} style={{ display: "none" }} />
            </label>
          </div>

          {err && <div style={{ fontSize: 13, color: "#9A3B2E", marginTop: 12 }}>{err}</div>}
          <button type="submit" disabled={state === "sending"} style={{ cursor: state === "sending" ? "not-allowed" : "pointer", width: "100%", marginTop: 18, border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 15, borderRadius: 14 }}>{state === "sending" ? (ur ? "بھیجا جا رہا ہے…" : "Sending…") : ur ? "شکایت جمع کریں" : "Submit complaint"}</button>
        </form>
      </div>

      <SuccessModal
        open={modal}
        ur={ur}
        title={ur ? "شکایت موصول ہو گئی! 🙏" : "Complaint received! 🙏"}
        message={ur ? "شکریہ! ہم اس معاملے کی مکمل تحقیق کریں گے اور جلد آپ سے رابطہ کریں گے۔" : "Thank you! We'll investigate the whole matter and get back to you shortly."}
        onClose={() => setModal(false)}
      />
    </>
  );
}
