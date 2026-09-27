"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPaperclip, FaCheckCircle } from "react-icons/fa";
import PageHero from "@/components/PageHero";
import SuccessModal from "@/components/SuccessModal";
import { IconStar } from "@/components/icons";
import { COMPLAINT_CATEGORIES, COMPLAINT_CITIES, LIMITS } from "@/lib/complaints";

const RED = "#C1272D";
const serif = "'DM Serif Display',serif";
const card: React.CSSProperties = { background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18 };

/* ---------------- FORM ---------------- */
const EMPTY = { name: "", phone: "", email: "", restaurant: "", city: "", area: "", orderDate: "", category: COMPLAINT_CATEGORIES[0], title: "", story: "", website: "" };

export function ComplaintForm() {
  const [f, setF] = useState(EMPTY);
  const [rating, setRating] = useState(0);
  const [agree, setAgree] = useState(false);
  const [evidence, setEvidence] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!rating) { setErr("Please choose a star rating."); return; }
    if (f.story.trim().length < 30) { setErr("Please describe what happened in at least 30 characters."); return; }
    if (evidence && evidence.size > 5 * 1024 * 1024) { setErr("The file is too large. Please attach something under 5 MB."); return; }
    setSending(true);
    const fd = new FormData();
    Object.entries(f).forEach(([k, v]) => fd.append(k, v));
    fd.append("rating", String(rating));
    fd.append("agree", agree ? "yes" : "no");
    if (evidence) fd.append("evidence", evidence);
    try {
      const res = await fetch("/api/complaints", { method: "POST", body: fd });
      const j = await res.json();
      if (j.ok) {
        setDone(true);
        setF(EMPTY);
        setRating(0);
        setAgree(false);
        setEvidence(null);
      } else setErr(j.error || "Your complaint could not be submitted.");
    } catch {
      setErr("Something went wrong. Please try again.");
    }
    setSending(false);
  };

  const input: React.CSSProperties = { width: "100%", border: "1.5px solid #E0D6C4", background: "#fff", borderRadius: 12, padding: 12, fontSize: 15, fontFamily: "inherit", outline: "none", marginTop: 6 };
  const lbl: React.CSSProperties = { fontSize: 12.5, fontWeight: 800, color: "#5A5245" };
  const row: React.CSSProperties = { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 };

  return (
    <>
      <PageHero title="File a Complaint" subtitle="Tell us about a bad experience at any restaurant anywhere in Pakistan. Your contact details stay private." badge="COMPLAINTS & RATINGS" />
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "28px 20px 64px" }}>
        <div style={{ background: "#FCF7EE", border: "1px solid #EFE3CF", borderRadius: 14, padding: "14px 16px", fontSize: 13.5, color: "#7A5A1F", lineHeight: 1.65, marginBottom: 20 }}>
          <b>Before you post:</b> describe only what you experienced yourself, stick to facts, and do not include anyone&apos;s name, phone number or personal details. Complaints with abuse, threats or false claims are not published.
        </div>

        <form onSubmit={submit} style={{ ...card, borderRadius: 20, padding: "24px 22px" }}>
          <div style={{ fontFamily: serif, fontSize: 21 }}>About the restaurant</div>
          <div style={row}>
            <div style={{ flex: "1 1 240px" }}><div style={lbl}>Restaurant name *</div><input required maxLength={LIMITS.restaurant} value={f.restaurant} onChange={set("restaurant")} placeholder="e.g. Pizza Point" style={input} /></div>
            <div style={{ flex: "1 1 150px" }}><div style={lbl}>City *</div><select required value={f.city} onChange={set("city")} style={{ ...input, cursor: "pointer" }}><option value="">Select your city</option>{COMPLAINT_CITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
          </div>
          <div style={row}>
            <div style={{ flex: "1 1 200px" }}><div style={lbl}>Area or branch</div><input maxLength={LIMITS.area} value={f.area} onChange={set("area")} placeholder="e.g. Gulberg, DHA, F-7 Markaz" style={input} /></div>
            <div style={{ flex: "1 1 160px" }}><div style={lbl}>When did it happen?</div><input maxLength={LIMITS.orderDate} value={f.orderDate} onChange={set("orderDate")} placeholder="e.g. 20 Sept, dinner" style={input} /></div>
          </div>

          <div style={{ fontFamily: serif, fontSize: 21, marginTop: 24 }}>What happened</div>
          <div style={row}>
            <div style={{ flex: "1 1 220px" }}><div style={lbl}>Type of problem *</div><select value={f.category} onChange={set("category")} style={{ ...input, cursor: "pointer" }}>{COMPLAINT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div style={{ flex: "1 1 200px" }}>
              <div style={lbl}>Your rating *</div>
              <div style={{ display: "flex", gap: 4, marginTop: 10 }} role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} onClick={() => setRating(n)} role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? "s" : ""}`} style={{ cursor: "pointer", border: "none", background: "transparent", padding: 2 }}>
                    <IconStar size={28} color={n <= rating ? "#FBBC04" : "#E3DDD0"} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}><div style={lbl}>Headline *</div><input required maxLength={LIMITS.title} value={f.title} onChange={set("title")} placeholder="e.g. Cold food and 90 minute delivery" style={input} /></div>
          <div style={{ marginTop: 12 }}>
            <div style={lbl}>Your complaint *</div>
            <textarea required rows={6} maxLength={LIMITS.story} value={f.story} onChange={set("story")} placeholder="Describe what you ordered, what went wrong and how the restaurant responded…" style={{ ...input, resize: "vertical" }} />
            <div className="num" style={{ fontSize: 11.5, color: "#B0A692", textAlign: "right", marginTop: 4 }}>{f.story.length} / {LIMITS.story}</div>
          </div>
          <div style={{ marginTop: 6 }}>
            <div style={lbl}>Receipt or photo (optional, private)</div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, border: `1.5px dashed ${evidence ? "#2E9E4F" : "#E0D6C4"}`, background: evidence ? "#EEF7EE" : "#FBF7EF", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontSize: 13.5, color: evidence ? "#2E7D32" : "#8A8072" }}>
              {evidence ? <FaCheckCircle size={16} color="#2E9E4F" /> : <FaPaperclip size={16} color="#8A8072" />}
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{evidence ? evidence.name : "Attach a receipt, screenshot or photo (max 5 MB)"}</span>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setEvidence(e.target.files?.[0] || null)} style={{ display: "none" }} />
            </label>
            <div style={{ fontSize: 11.5, color: "#B0A692", marginTop: 5 }}>Only our team sees attachments. They help us check your complaint.</div>
          </div>

          <div style={{ fontFamily: serif, fontSize: 21, marginTop: 24 }}>Your details (never published)</div>
          <div style={row}>
            <div style={{ flex: "1 1 200px" }}><div style={lbl}>Your name *</div><input required value={f.name} onChange={set("name")} style={input} /></div>
            <div style={{ flex: "1 1 170px" }}><div style={lbl}>Phone or WhatsApp *</div><input required value={f.phone} onChange={set("phone")} placeholder="03XX XXXXXXX" style={input} /></div>
          </div>
          <div style={{ marginTop: 12 }}><div style={lbl}>Email *</div><input required type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" style={input} /></div>
          {/* honeypot for bots, hidden from people */}
          <input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} aria-hidden style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 18, fontSize: 13.5, color: "#4A4238", lineHeight: 1.55, cursor: "pointer" }}>
            <input type="checkbox" required checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3, width: 16, height: 16, flex: "none" }} />
            <span>I confirm this is my own genuine experience, it is true to the best of my knowledge, and I agree to the <Link href="/terms" style={{ color: RED, fontWeight: 700 }}>terms</Link>.</span>
          </label>

          {err && <div style={{ fontSize: 13.5, color: "#9A3B2E", marginTop: 12 }}>{err}</div>}
          <button type="submit" disabled={sending} style={{ cursor: sending ? "not-allowed" : "pointer", width: "100%", marginTop: 18, border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 15, borderRadius: 14, opacity: sending ? 0.7 : 1 }}>{sending ? "Submitting…" : "Submit complaint"}</button>
        </form>
      </div>

      <SuccessModal open={done} title="Complaint received" message="Thank you. Our team has received your complaint and will look into it." onClose={() => setDone(false)} />
    </>
  );
}
