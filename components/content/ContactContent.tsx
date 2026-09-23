"use client";

import { useEffect, useState } from "react";
import { FaPaperclip, FaCheckCircle, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa";
import { useApp } from "@/components/AppProvider";
import PageHero from "@/components/PageHero";
import SuccessModal from "@/components/SuccessModal";
import { BRANCHES, ORDER_PHONE, ORDER_TEL, ORDER_WA } from "@/lib/data";
import { PUBLIC_EMAIL, HOURS_TEXT } from "@/lib/copy";

const RED = "#C1272D";

const TOPICS: [string, string][] = [
  ["question", "General question"],
  ["feedback", "Feedback or compliment"],
  ["order_issue", "Problem with an order"],
  ["catering", "Catering or bulk order"],
  ["other", "Something else"],
];

const EMPTY = { name: "", phone: "", email: "", topic: "question", branch: "", orderDate: "", items: "", details: "" };

export default function ContactContent() {
  const { area, hydrated } = useApp();
  const [f, setF] = useState(EMPTY);
  const [addr, setAddr] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [modal, setModal] = useState(false);
  const [err, setErr] = useState("");

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const isOrderIssue = f.topic === "order_issue";

  // prefill the address with the customer's saved location once storage hydrates
  useEffect(() => {
    if (hydrated && area) setAddr((p) => p || area);
  }, [hydrated, area]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setState("sending");
    const topicLabel = TOPICS.find(([v]) => v === f.topic)?.[1] || f.topic;
    const fd = new FormData();
    Object.entries({ ...f, area: addr, topicLabel }).forEach(([k, v]) => fd.append(k, v));
    if (attachment) fd.append("attachment", attachment);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const j = await res.json();
      if (j.ok) {
        setModal(true);
        setState("idle");
        setF(EMPTY);
        setAttachment(null);
      } else {
        setState("error");
        setErr(j.error || "Your message could not be sent.");
      }
    } catch {
      setState("error");
      setErr("Something went wrong. Please try again, or call us instead.");
    }
  };

  const input: React.CSSProperties = { width: "100%", border: "1.5px solid #E0D6C4", background: "#fff", borderRadius: 12, padding: 12, fontSize: 15, fontFamily: "inherit", outline: "none", marginTop: 6 };
  const lbl: React.CSSProperties = { fontSize: 12.5, fontWeight: 800, color: "#5A5245" };
  const card: React.CSSProperties = { flex: "1 1 200px", textDecoration: "none", color: "#211812", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 };
  const iconBox = (bg: string): React.CSSProperties => ({ width: 40, height: 40, borderRadius: 12, background: bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" });

  return (
    <>
      <PageHero title="Contact Shah G Foods" subtitle="Questions, feedback, catering or a problem with an order. We read every message and reply quickly." badge="WE'RE HERE TO HELP" />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "30px 20px 64px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <a href={`tel:${ORDER_TEL}`} style={card}>
            <span style={iconBox(RED)}><FaPhoneAlt size={15} /></span>
            <span><span style={{ display: "block", fontSize: 12, color: "#8A8072", fontWeight: 700 }}>Call us</span><span className="num" style={{ fontWeight: 800 }}>{ORDER_PHONE}</span></span>
          </a>
          <a href={`https://wa.me/${ORDER_WA}`} target="_blank" rel="noopener noreferrer" style={card}>
            <span style={iconBox("#25D366")}><FaWhatsapp size={19} /></span>
            <span><span style={{ display: "block", fontSize: 12, color: "#8A8072", fontWeight: 700 }}>WhatsApp</span><span style={{ fontWeight: 800 }}>Message us</span></span>
          </a>
          <a href={`mailto:${PUBLIC_EMAIL}`} style={{ ...card, flex: "1 1 260px" }}>
            <span style={iconBox("#5E1A86")}><FaEnvelope size={15} /></span>
            <span style={{ minWidth: 0 }}><span style={{ display: "block", fontSize: 12, color: "#8A8072", fontWeight: 700 }}>Email</span><span style={{ fontWeight: 800, fontSize: 14, overflowWrap: "anywhere" }}>{PUBLIC_EMAIL}</span></span>
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#5A5245", fontWeight: 700, marginBottom: 22 }}>
          <FaClock size={13} color="#8A8072" /> All branches are open daily, {HOURS_TEXT}.
        </div>

        <form onSubmit={submit} style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, padding: "26px 24px" }}>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, marginBottom: 16 }}>Send us a message</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px" }}><div style={lbl}>Your name *</div><input required value={f.name} onChange={set("name")} style={input} /></div>
            <div style={{ flex: "1 1 160px" }}><div style={lbl}>Phone or WhatsApp *</div><input required value={f.phone} onChange={set("phone")} placeholder="03XX XXXXXXX" style={input} /></div>
          </div>
          <div style={{ marginTop: 12 }}><div style={lbl}>Email *</div><input required type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" style={input} /></div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <div style={{ flex: "1 1 200px" }}>
              <div style={lbl}>What is this about? *</div>
              <select required value={f.topic} onChange={set("topic")} style={{ ...input, cursor: "pointer" }}>{TOPICS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <div style={lbl}>Branch{isOrderIssue ? " *" : ""}</div>
              <select required={isOrderIssue} value={f.branch} onChange={set("branch")} style={{ ...input, cursor: "pointer" }}>
                <option value="">Select a branch</option>
                {BRANCHES.map((b) => <option key={b.name} value={b.name}>{b.name}, {b.city}</option>)}
              </select>
            </div>
          </div>

          {isOrderIssue && (
            <>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
                <div style={{ flex: "1 1 160px" }}><div style={lbl}>Order date and time</div><input value={f.orderDate} onChange={set("orderDate")} placeholder="e.g. 12 July, 8 PM" style={input} /></div>
                <div style={{ flex: "1 1 200px" }}><div style={lbl}>Your area</div><input value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="e.g. F-10, Islamabad" style={input} /></div>
              </div>
              <div style={{ marginTop: 12 }}><div style={lbl}>What did you order?</div><input value={f.items} onChange={set("items")} placeholder="e.g. 2 Daal Chawal, 1 Chicken Biryani" style={input} /></div>
            </>
          )}

          <div style={{ marginTop: 12 }}><div style={lbl}>Your message *</div><textarea required rows={5} value={f.details} onChange={set("details")} placeholder="Tell us how we can help…" style={{ ...input, resize: "vertical" }} /></div>

          <div style={{ marginTop: 14 }}>
            <div style={lbl}>Photo or screenshot (optional)</div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, border: `1.5px dashed ${attachment ? "#2E9E4F" : "#E0D6C4"}`, background: attachment ? "#EEF7EE" : "#FBF7EF", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontSize: 13.5, color: attachment ? "#2E7D32" : "#8A8072" }}>
              <span style={{ display: "flex" }}>{attachment ? <FaCheckCircle size={16} color="#2E9E4F" /> : <FaPaperclip size={16} color="#8A8072" />}</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{attachment ? attachment.name : "Attach a file"}</span>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setAttachment(e.target.files?.[0] || null)} style={{ display: "none" }} />
            </label>
          </div>

          {err && <div style={{ fontSize: 13, color: "#9A3B2E", marginTop: 12 }}>{err}</div>}
          <button type="submit" disabled={state === "sending"} style={{ cursor: state === "sending" ? "not-allowed" : "pointer", width: "100%", marginTop: 18, border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 15, borderRadius: 14 }}>{state === "sending" ? "Sending…" : "Send message"}</button>
        </form>
      </div>

      <SuccessModal open={modal} title="Message sent" message="Thank you for getting in touch. Our team will reply to you soon." onClose={() => setModal(false)} />
    </>
  );
}
