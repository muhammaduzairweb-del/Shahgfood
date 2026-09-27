"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaPaperclip, FaCheckCircle, FaShieldAlt, FaUserSecret, FaReply } from "react-icons/fa";
import PageHero from "@/components/PageHero";
import SuccessModal from "@/components/SuccessModal";
import { IconStar } from "@/components/icons";
import { useWidth } from "@/components/hooks";
import {
  COMPLAINT_CATEGORIES,
  COMPLAINT_CITIES,
  LIMITS,
  publishedComplaints,
  summarize,
  type Complaint,
} from "@/lib/complaints";

const RED = "#C1272D";
const serif = "'DM Serif Display',serif";
const card: React.CSSProperties = { background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18 };

function Stars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }} aria-label={`${n} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} size={size} color={i < Math.round(n) ? "#FBBC04" : "#E3DDD0"} />)}
    </span>
  );
}

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

/* ---------------- LIST ---------------- */
export function ComplaintsList() {
  const [list] = useState<Complaint[]>(publishedComplaints);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [cat, setCat] = useState("");
  const [shown, setShown] = useState(20);
  const isPhone = useWidth() < 640;


  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return list.filter((c) =>
      (!city || c.city === city) &&
      (!cat || c.category === cat) &&
      (!needle || `${c.restaurant} ${c.area} ${c.title} ${c.story}`.toLowerCase().includes(needle))
    );
  }, [list, q, city, cat]);
  const top = useMemo(() => summarize(list).slice(0, 8), [list]);

  const input: React.CSSProperties = { border: "1.5px solid #E0D6C4", background: "#fff", borderRadius: 12, padding: "11px 13px", fontSize: 14.5, fontFamily: "inherit", outline: "none" };

  return (
    <>
      <PageHero
        title="Restaurant Complaints"
        subtitle="Real experiences from restaurant customers across Pakistan, from Karachi and Lahore to Islamabad, Peshawar and Quetta. Read before you order, and share yours to help others."
        badge="COMPLAINTS & RATINGS"
      />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "26px 20px 60px" }}>
        <div style={{ ...card, padding: "18px 20px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14, background: "#16171B", color: "#fff", border: "none" }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 22 }}>Had a bad experience at a restaurant?</div>
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 14, marginTop: 4 }}>Tell us what happened. Every complaint is reviewed before it is published.</div>
          </div>
          <Link href="/complaints/new" style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 24px", borderRadius: 13, whiteSpace: "nowrap" }}>File a complaint →</Link>
        </div>

        <h2 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, margin: "32px 0 6px" }}>Browse complaints by city</h2>
        <div style={{ fontSize: 13.5, color: "#8A8072", marginBottom: 14 }}>Complaints about restaurants in every city of Pakistan. Tap a city to see its complaints.</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["", ...COMPLAINT_CITIES].map((c) => {
            const active = city === c;
            const n = c ? list.filter((x) => x.city === c).length : list.length;
            return (
              <button key={c || "all"} onClick={() => { setCity(c); setShown(20); }} aria-pressed={active} style={{ cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${active ? RED : "#EAE1D2"}`, background: active ? RED : "#fff", color: active ? "#fff" : "#4A4238" }}>
                {c || "All Pakistan"}{n > 0 && <span className="num" style={{ opacity: 0.75, marginInlineStart: 6 }}>{n}</span>}
              </button>
            );
          })}
        </div>

        {top.length > 0 && (
          <>
            <h2 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, margin: "32px 0 14px" }}>Most complained about</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 12 }}>
              {top.map((r) => (
                <button key={r.key} onClick={() => setQ(r.name)} style={{ ...card, padding: "14px 16px", textAlign: "left", cursor: "pointer", fontFamily: "inherit", color: "inherit" }}>
                  <div style={{ fontWeight: 800, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <Stars n={r.avg} size={13} />
                    <span className="num" style={{ fontSize: 12.5, color: "#8A8072", fontWeight: 700 }}>{r.avg.toFixed(1)} · {r.count} {r.count === 1 ? "complaint" : "complaints"}</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        <h2 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, margin: "32px 0 14px" }}>Latest complaints</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
          <input value={q} onChange={(e) => { setQ(e.target.value); setShown(20); }} placeholder="Search a restaurant, area or keyword…" style={{ ...input, flex: "1 1 260px" }} />
          <select value={city} onChange={(e) => setCity(e.target.value)} style={{ ...input, flex: "1 1 140px", cursor: "pointer" }}>
            <option value="">All cities</option>
            {COMPLAINT_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ ...input, flex: "1 1 160px", cursor: "pointer" }}>
            <option value="">All issues</option>
            {COMPLAINT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ ...card, padding: "40px 20px", textAlign: "center", color: "#8A8072", fontSize: 15 }}>
            {list.length === 0 ? "No complaints have been published yet. Be the first to share your experience." : "No complaints match your search."}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.slice(0, shown).map((c) => (
              <article key={c.id} style={{ ...card, padding: isPhone ? "16px" : "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ width: 40, height: 40, borderRadius: "50%", background: "#F5EEE1", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><FaUserSecret size={17} color="#8A8072" /></span>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{c.restaurant}</div>
                    <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 2 }}>{c.area ? `${c.area}, ` : ""}{c.city}</div>
                    <div style={{ fontSize: 11.5, color: "#8A8072", marginTop: 3, fontWeight: 600 }}>Complaint posted · {fmtDate(c.publishedAt)}</div>
                  </div>
                  <span style={{ background: "#FCF2F1", color: RED, fontSize: 11, fontWeight: 800, padding: "5px 11px", borderRadius: 999 }}>{c.category}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                  <Stars n={c.rating} />
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{c.title}</span>
                </div>
                <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.75, color: "#4A4238", whiteSpace: "pre-wrap" }}>{c.story}</p>
                {c.reply && (
                  <div style={{ marginTop: 12, background: "#F5F9F5", border: "1px solid #DCEBDC", borderRadius: 12, padding: "11px 14px" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#2E7D32" }}><FaReply size={10} style={{ marginInlineEnd: 5 }} />RESPONSE FROM THE RESTAURANT</div>
                    <p style={{ margin: "5px 0 0", fontSize: 14, lineHeight: 1.65, color: "#3D4A3D", whiteSpace: "pre-wrap" }}>{c.reply}</p>
                  </div>
                )}
              </article>
            ))}
            {filtered.length > shown && (
              <button onClick={() => setShown((n) => n + 20)} style={{ alignSelf: "center", cursor: "pointer", border: `1.5px solid ${RED}`, background: "#fff", color: RED, fontWeight: 800, fontSize: 14.5, fontFamily: "inherit", padding: "11px 24px", borderRadius: 12 }}>Show more</button>
            )}
          </div>
        )}

        <div style={{ marginTop: 30, fontSize: 12.5, color: "#8A8072", lineHeight: 1.7, display: "flex", gap: 10 }}>
          <FaShieldAlt size={14} style={{ flex: "none", marginTop: 3 }} />
          <span>
            Complaints are the personal experiences and opinions of customers, either sent to us directly or collected from public reviews posted online. They are checked by our team before publishing but have not been independently verified.
            Restaurant owners can respond to or dispute a complaint by sending their side through the <Link href="/complaints/new" style={{ color: RED, fontWeight: 700 }}>complaint form</Link>.
          </span>
        </div>
      </div>
    </>
  );
}

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

      <SuccessModal open={done} title="Complaint received" message="Thank you. Our team will review your complaint, and once approved it will appear on the complaints page." onClose={() => setDone(false)} />
    </>
  );
}
