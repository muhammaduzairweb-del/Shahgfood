"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaCreditCard, FaGlobeAsia, FaUtensils, FaCrown, FaHome, FaMapMarkerAlt, FaCamera, FaInfoCircle, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import SuccessModal from "@/components/SuccessModal";
import PartnerPerformanceSample from "@/components/PartnerPerformanceSample";

const RED = "#C1272D";
const PURPLE = "#5E1A86";
const CHARCOAL = "#16171B";

interface Pkg { id: string; name: string; monthly: number; dishes: string; max: number; featured?: boolean; popular?: boolean; perks: string[] }
const PACKAGES: Pkg[] = [
  { id: "starter", name: "Starter", monthly: 15000, dishes: "5 signature dishes", max: 5, perks: ["List up to 5 signature dishes", "0% commission on every sale", "Direct call & WhatsApp orders", "Shown only in your covered areas", "Zero setup or IT cost"] },
  { id: "growth", name: "Growth", monthly: 25000, dishes: "10 dishes", max: 10, popular: true, perks: ["List up to 10 dishes", "0% commission on every sale", "Priority placement in your areas", "Direct call & WhatsApp orders", "Zero setup or IT cost"] },
  { id: "premium", name: "Super Premium", monthly: 32000, dishes: "Featured on homepage", max: 21, featured: true, perks: ["★ Featured on the Shah G Online homepage", "List up to 21 dishes", "Top placement across the whole site", "Direct call & WhatsApp orders", "Dedicated priority support"] },
];
const yearly = (m: number) => Math.round(m * 12 * 0.8);

const DISH_TYPES = [
  { v: "fixed", label: "Single price" },
  { v: "halffull", label: "Half / Full (karahi, salan)" },
  { v: "pieces", label: "By pieces (kebab, tikka)" },
  { v: "weight", label: "By weight / kg (pulao, degh)" },
  { v: "size", label: "By size (pizza S/M/L)" },
];
const typePlaceholder: Record<string, string> = {
  fixed: "e.g. Rs 250",
  halffull: "e.g. Half Rs 800 · Full Rs 1500",
  pieces: "e.g. 6 pcs Rs 720 · 12 pcs Rs 1320",
  weight: "e.g. 1 kg Rs 1600 · 1/2 kg Rs 850",
  size: "e.g. Small 900 · Medium 1400 · Large 1900",
};
const typeLabel = (v: string) => DISH_TYPES.find((t) => t.v === v)?.label ?? v;

// Simulated incoming-order feed for the payment panel: cycles realistic call &
// WhatsApp orders so owners SEE what a listing gets them. Clearly labelled a preview.
const SIM_ORDERS = [
  { d: "Chicken Karahi (Full)", du: "چکن کڑاہی (فل)", a: "F-10, Islamabad", wa: true },
  { d: "Daal Chawal ×2", du: "دال چاول ×2", a: "G-9, Islamabad", wa: false },
  { d: "Seekh Kebab (12 pcs)", du: "سیخ کباب (12 عدد)", a: "Bahria Town", wa: true },
  { d: "Bannu Beef Pulao (1 kg)", du: "بنوں بیف پلاؤ (1 کلو)", a: "Blue Area", wa: false },
  { d: "Malai Boti + 4 Naan", du: "ملائی بوٹی + 4 نان", a: "Saddar, Rawalpindi", wa: true },
  { d: "Chicken Biryani (Family)", du: "چکن بریانی (فیملی)", a: "DHA Phase 2", wa: false },
  { d: "Mix BBQ Platter", du: "مکس باربی کیو پلیٹر", a: "E-11, Islamabad", wa: true },
  { d: "Halwa Puri Nashta ×3", du: "حلوہ پوری ناشتہ ×3", a: "Satellite Town", wa: false },
];

function OrderSim({ ur }: { ur: boolean }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    const id = setInterval(() => setN((x) => x + 1), 2600);
    return () => clearInterval(id);
  }, []);
  const ages = [ur ? "ابھی ابھی" : "just now", ur ? "2 منٹ پہلے" : "2 min ago", ur ? "5 منٹ پہلے" : "5 min ago"];

  return (
    <div style={{ marginTop: 4, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.18)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ position: "relative", width: 34, height: 34, flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(255,255,255,.5)", animation: "ringPulse 2s ease-out infinite" }} />
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaPhoneAlt size={12} color={PURPLE} />
          </span>
        </span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".5px" }}>{ur ? "آپ کا فون، بجتا ہوا" : "YOUR PHONE, RINGING"}</div>
          <div style={{ fontSize: 10.5, opacity: 0.7 }}>{ur ? "(پیش نظارہ — ایسے آرڈر آتے ہیں)" : "(preview — this is how orders arrive)"}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[0, 1, 2].map((off) => {
          const o = SIM_ORDERS[(n - off + SIM_ORDERS.length * 100) % SIM_ORDERS.length];
          return (
            <div key={`${n}-${off}`} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.12)", borderRadius: 12, padding: "9px 12px", opacity: off === 0 ? 1 : off === 1 ? 0.75 : 0.5, animation: off === 0 ? "rise .4s ease" : undefined }}>
              <span style={{ width: 30, height: 30, borderRadius: "50%", flex: "none", background: o.wa ? "#25D366" : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {o.wa ? <FaWhatsapp size={15} color="#fff" /> : <FaPhoneAlt size={11} color={PURPLE} />}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ur ? o.du : o.d}</span>
                <span style={{ display: "block", fontSize: 11, opacity: 0.75, marginTop: 1 }}>{o.a} · {ages[off]}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PartnerContent() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const isNarrow = useWidth() < 700;

  const [sel, setSel] = useState<Pkg | null>(null);
  const [term, setTerm] = useState<"yearly" | "monthly">("monthly");
  const [toast, setToast] = useState(false);
  const [f, setF] = useState({ restaurant: "", owner: "", email: "", phone: "", areas: "", deliveryFee: "" });
  const [agree, setAgree] = useState(false);
  const [dishes, setDishes] = useState([{ name: "", type: "fixed", details: "", half: "", full: "" }]);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [modal, setModal] = useState(false);
  const [err, setErr] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sg-pkg");
    if (saved) { const p = PACKAGES.find((x) => x.id === saved); if (p) setSel(p); }
  }, []);

  const choose = (p: Pkg) => {
    setSel(p);
    localStorage.setItem("sg-pkg", p.id);
    setDishes((d) => d.slice(0, p.max));
    setToast(true);
    setTimeout(() => setToast(false), 5000);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const amount = sel ? (term === "yearly" ? yearly(sel.monthly) : sel.monthly) : 0;
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const setDish = (i: number, k: "name" | "type" | "details" | "half" | "full", v: string) => setDishes((arr) => arr.map((d, j) => (j === i ? { ...d, [k]: v } : d)));
  const addDish = () => sel && dishes.length < sel.max && setDishes((a) => [...a, { name: "", type: "fixed", details: "", half: "", full: "" }]);
  const rmDish = (i: number) => setDishes((a) => a.filter((_, j) => j !== i));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sel || !agree) return;
    setErr("");
    setState("sending");
    const dishesText = dishes
      .filter((d) => d.name.trim())
      .map((d, i) => {
        const priceInfo = d.type === "halffull" ? `Half Rs ${d.half || "-"} · Full Rs ${d.full || "-"}` : d.details;
        return `${i + 1}. ${d.name} [${typeLabel(d.type)}], ${priceInfo}`;
      })
      .join("\n");
    const fd = new FormData();
    fd.append("restaurant", f.restaurant);
    fd.append("owner", f.owner);
    fd.append("email", f.email);
    fd.append("phone", f.phone);
    fd.append("areas", f.areas);
    fd.append("deliveryFee", f.deliveryFee);
    fd.append("package", `${sel.name} · ${sel.dishes}`);
    fd.append("term", term === "yearly" ? "Yearly (20% off)" : "Monthly");
    fd.append("amount", `Rs ${amount.toLocaleString()}`);
    fd.append("dishes", dishesText);
    fd.append("lang", lang);
    fd.append("consent", agree ? "yes" : "no");
    fd.append("consentAt", new Date().toISOString());
    try {
      const res = await fetch("/api/partner", { method: "POST", body: fd });
      const j = await res.json();
      if (j.ok) { setModal(true); setState("idle"); setF({ restaurant: "", owner: "", email: "", phone: "", areas: "", deliveryFee: "" }); setDishes([{ name: "", type: "fixed", details: "", half: "", full: "" }]); setAgree(false); }
      else { setState("error"); setErr(j.error || "Failed to send."); }
    } catch {
      setState("error");
      setErr(ur ? "بھیجنے میں مسئلہ ہوا۔ دوبارہ کوشش کریں۔" : "Something went wrong. Please try again.");
    }
  };

  const input: React.CSSProperties = { width: "100%", border: "1.5px solid #E0D6C4", background: "#fff", borderRadius: 12, padding: 12, fontSize: 15, fontFamily: "inherit", outline: "none", marginTop: 6 };
  const lbl: React.CSSProperties = { fontSize: 12.5, fontWeight: 800, color: "#5A5245" };

  return (
    <>
      {/* toast — how payment works */}
      {toast && (
        <div style={{ position: "fixed", top: 84, left: "50%", transform: "translateX(-50%)", zIndex: 80, width: "min(430px, calc(100% - 28px))", background: "#211812", color: "#fff", borderRadius: 14, boxShadow: "0 24px 50px -16px rgba(0,0,0,.5)", padding: "13px 16px", display: "flex", alignItems: "center", gap: 11, animation: "rise .3s ease" }}>
          <span style={{ display: "flex" }}><FaCreditCard size={18} color="#F7D774" /></span>
          <span style={{ fontSize: 13.5, lineHeight: 1.5 }}>{ur ? "نیچے اپنی تفصیلات بھریں — ادائیگی کی تفصیلات آپ کو ای میل پر بھیج دی جائیں گی۔" : "Fill in your details below — payment details will be shared with you by email."}</span>
        </div>
      )}

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(115deg,${PURPLE} 0%,#8E1E7C 55%,#B71C66 100%)`, color: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 20px 62px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".6px" }}>{ur ? "پارٹنر پروگرام" : "PARTNER PROGRAM"}</div>
          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(32px,5vw,54px)", lineHeight: 1.08, margin: 0, maxWidth: 820, fontWeight: 400 }}>{ur ? "اپنا ریستوران، یا ہوم کچن، شاہ جی آن لائن پر لسٹ کریں" : "List your restaurant, and the home kitchen, on Shah G Online"}</h1>
          <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.9)", margin: 0, maxWidth: 640, lineHeight: 1.75 }}>{ur ? "روزانہ 10,000+ بھوکے گاہک شاہ جی آن لائن پر کھانا تلاش کرتے ہیں۔ صفر کمیشن، صفر ڈیلیوری جھنجھٹ، صرف براہِ راست کال اور واٹس ایپ آرڈرز۔" : "10,000+ hungry customers browse Shah G Online every day. Zero commission, zero delivery headache, just direct call & WhatsApp orders straight to your kitchen."}</p>
          <a href="#packages" style={{ textDecoration: "none", background: "#fff", color: RED, fontWeight: 800, fontSize: 16, padding: "15px 30px", borderRadius: 14, marginTop: 4 }}>{ur ? "پیکجز دیکھیں →" : "See packages →"}</a>
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, margin: "-34px 0 0", position: "relative", zIndex: 2 }}>
          {[{ v: "10,000+", l: ur ? "روزانہ وزیٹرز" : "Daily visitors" }, { v: "0%", l: ur ? "کمیشن" : "Commission" }, { v: "24 hrs", l: ur ? "لائیو ہونے کا وقت" : "To go live" }, { v: <FaGlobeAsia size={24} color={RED} style={{ verticalAlign: "-3px" }} />, l: ur ? "پورے پاکستان میں" : "Nationwide" }].map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "18px 16px", textAlign: "center", boxShadow: "0 16px 32px -26px rgba(60,30,10,.6)" }}>
              <div className="num" style={{ fontSize: 24, fontWeight: 800, color: RED }}>{s.v}</div>
              <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* WHY SHAH G ONLINE — search-visibility pitch, illustrative example only */}
        <div style={{ marginTop: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 30, color: "#211812" }}>{ur ? "دیکھیں کتنے لوگ شاہ جی آن لائن سائٹ پر آتے ہیں" : "See how much people come to Shah g online site"}</div>
          </div>
          <PartnerPerformanceSample ur={ur} />
        </div>

        {/* HOME KITCHENS — not just restaurants, home cooks can list too */}
        <div style={{ marginTop: 40, background: "linear-gradient(115deg,#FCF3DC,#F7E7C4)", border: "1px solid #E9D6A0", borderRadius: 24, padding: "28px 26px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 22 }}>
          <div style={{ flex: "none", width: 64, height: 64, borderRadius: 18, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 28px -16px rgba(160,110,20,.5)" }}>
            <FaHome size={28} color="#A0720F" />
          </div>
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
              <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 22, color: "#211812" }}>{ur ? "ہوم کچن بھی خوش آمدید" : "Home kitchens welcome too"}</div>
              <span style={{ background: "#A0720F", color: "#fff", fontSize: 10.5, fontWeight: 800, padding: "4px 11px", borderRadius: 999, letterSpacing: ".5px" }}>{ur ? "گھر کا کھانا" : "GHAR KA KHANA"}</span>
            </div>
            <p style={{ fontSize: 14.5, color: "#5A4B2A", lineHeight: 1.75, margin: 0 }}>
              {ur
                ? "شاہ جی آن لائن صرف ریستورانوں کے لیے نہیں — اگر آپ گھر پر تازہ، کم مصالحے اور کم تیل والا کھانا بناتے ہیں تو آپ بھی لسٹ ہو سکتے ہیں۔ خاص طور پر ان لوگوں کے لیے بہترین جو تیز مرچ مصالحہ پسند نہیں کرتے اور روزانہ سادہ گھریلو کھانا چاہتے ہیں۔"
                : "Shah G Online isn't just for restaurants — if you cook fresh, homestyle food at home (less oil, less spice), you can list here too. Perfect for people who don't like heavy, spicy restaurant food and just want simple, home-cooked meals every day."}
            </p>
          </div>
        </div>

        {/* FEATURED PARTNER */}
        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: RED, letterSpacing: ".6px", marginBottom: 12 }}>{ur ? "ہمارا بانی پارٹنر" : "OUR FOUNDING PARTNER"}</div>
          <div style={{ background: CHARCOAL, borderRadius: 24, overflow: "hidden", display: "flex", flexWrap: "wrap", color: "#fff" }}>
            <div style={{ flex: "1 1 300px", minHeight: 220, position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Shahgfoods__Feature.jpg" alt="Shah G Foods, founding partner" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 14, insetInlineStart: 14, background: "#E0A020", color: "#211812", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 999 }}>★ {ur ? "ٹاپ پارٹنر" : "TOP PARTNER"}</div>
            </div>
            <div style={{ flex: "1.1 1 320px", padding: "32px 34px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 30 }}>Shah G Foods</div>
                <span style={{ background: "linear-gradient(120deg,#F7D774,#E0A020)", color: "#211812", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 999, letterSpacing: ".4px" }}>{ur ? "پہلا پارٹنر" : "FIRST PARTNER"}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,.75)", fontSize: 15, lineHeight: 1.7 }}>
                {ur
                  ? "شاہ جی فوڈز ہمارا سب سے پہلا پارٹنر ہے، 90+ ڈشز لسٹڈ اور پورے سال کے لیے سب سے بڑا سپر پریمیم پیکج۔ شاہ جی آن لائن کا پہلا فیچرڈ پارٹنر، مکمل مینو تمام شاخوں کے ساتھ لسٹڈ۔"
                  : "Shah G Foods is our very first partner, more than 90 items listed on the top Super Premium package for the whole year. The first featured partner on Shah G Online, full menu listed across all branches."}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {([
                  [<FaUtensils key="u" size={12} />, ur ? "90+ ڈشز لسٹڈ" : "90+ dishes listed"],
                  [<FaCrown key="c" size={12} />, ur ? "سپر پریمیم · سالانہ" : "Super Premium · Yearly"],
                  [<FaHome key="h" size={12} />, ur ? "ہوم پیج فیچرڈ" : "Homepage featured"],
                  [<FaMapMarkerAlt key="m" size={12} />, ur ? "تمام شاخیں" : "All branches"],
                ] as [React.ReactNode, string][]).map(([ic, chip], i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.92)", fontSize: 12.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999 }}>{ic}{chip}</span>
                ))}
              </div>
              <Link href="/restaurant/shah-g-foods/menu" style={{ alignSelf: "flex-start", textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "12px 24px", borderRadius: 12, marginTop: 4 }}>{ur ? "شاہ جی کا مینو دیکھیں →" : "View Shah G's menu →"}</Link>
            </div>
          </div>
        </div>

        {/* PACKAGES */}
        <div id="packages" style={{ marginTop: 48, scrollMarginTop: 84 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 30 }}>{ur ? "اپنا پیکج منتخب کریں" : "Choose your package"}</div>
            <p style={{ fontSize: 14.5, color: "#8A8072", margin: "8px 0 18px" }}>{ur ? "سالانہ پلان پر 20% رعایت، ایک بار ادائیگی، پورا سال لسٹنگ۔" : "Save 20% on the yearly plan, pay once, stay listed all year."}</p>
            <div style={{ display: "inline-flex", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 999, padding: 4, gap: 4 }}>
              <button onClick={() => setTerm("yearly")} style={{ cursor: "pointer", border: "none", borderRadius: 999, padding: "8px 18px", fontWeight: 800, fontSize: 13.5, fontFamily: "inherit", background: term === "yearly" ? RED : "transparent", color: term === "yearly" ? "#fff" : "#5A5245" }}>{ur ? "سالانہ · 20% رعایت" : "Yearly · save 20%"}</button>
              <button onClick={() => setTerm("monthly")} style={{ cursor: "pointer", border: "none", borderRadius: 999, padding: "8px 18px", fontWeight: 800, fontSize: 13.5, fontFamily: "inherit", background: term === "monthly" ? RED : "transparent", color: term === "monthly" ? "#fff" : "#5A5245" }}>{ur ? "ماہانہ" : "Monthly"}</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 18, marginTop: 26 }}>
            {PACKAGES.map((p) => {
              const price = term === "yearly" ? yearly(p.monthly) : p.monthly;
              const active = sel?.id === p.id;
              return (
                <div key={p.id} style={{ position: "relative", background: p.featured ? `linear-gradient(160deg,${PURPLE},#B71C66)` : "#fff", color: p.featured ? "#fff" : "#211812", border: `2px solid ${active ? RED : p.featured ? "transparent" : "#EAE1D2"}`, borderRadius: 22, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12, boxShadow: p.featured ? "0 24px 50px -26px rgba(94,26,134,.7)" : "0 16px 34px -28px rgba(60,30,10,.6)" }}>
                  {p.popular && <div style={{ position: "absolute", top: -12, insetInlineStart: 22, background: "#E0A020", color: "#211812", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999 }}>{ur ? "مقبول" : "MOST POPULAR"}</div>}
                  {p.featured && <div style={{ position: "absolute", top: -12, insetInlineStart: 22, background: "#F7D774", color: "#211812", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999 }}>★ {ur ? "ہوم پیج فیچرڈ" : "HOMEPAGE FEATURED"}</div>}
                  <div style={{ fontSize: 19, fontWeight: 800 }}>{p.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.8 }}>{p.dishes}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span className="num" style={{ fontSize: 34, fontWeight: 800 }}>Rs {price.toLocaleString()}</span>
                    <span style={{ fontSize: 13, opacity: 0.8 }}>/ {term === "yearly" ? (ur ? "سال" : "yr") : ur ? "ماہ" : "mo"}</span>
                  </div>
                  {term === "yearly" && <div style={{ fontSize: 11.5, color: p.featured ? "#F7D774" : "#2E9E4F", fontWeight: 700, marginTop: -6 }}>{ur ? `20% بچت (Rs ${(p.monthly * 12 - yearly(p.monthly)).toLocaleString()})` : `You save Rs ${(p.monthly * 12 - yearly(p.monthly)).toLocaleString()}`}</div>}
                  <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 4 }}>
                    {p.perks.map((pk, i) => (
                      <div key={i} style={{ display: "flex", gap: 9, fontSize: 13.5, alignItems: "flex-start" }}><span style={{ color: p.featured ? "#F7D774" : "#2E9E4F", fontWeight: 900, flex: "none" }}>✓</span><span style={{ color: p.featured ? "rgba(255,255,255,.92)" : "#4A4238" }}>{pk}</span></div>
                    ))}
                  </div>
                  <button onClick={() => choose(p)} style={{ cursor: "pointer", marginTop: 8, border: "none", background: active ? "#2E9E4F" : p.featured ? "#fff" : RED, color: active ? "#fff" : p.featured ? PURPLE : "#fff", fontWeight: 800, fontSize: 15, fontFamily: "inherit", padding: 13, borderRadius: 13 }}>{active ? (ur ? "✓ منتخب" : "✓ Selected") : ur ? "یہ پیکج منتخب کریں" : "Select this plan"}</button>
                </div>
              );
            })}
          </div>
        </div>

        {/* FORM (after a package is selected) */}
        {sel && (
          <div ref={formRef} style={{ scrollMarginTop: 84, margin: "44px 0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            {/* what happens next — sticky at its natural height, so no dead space */}
            <div style={{ background: `linear-gradient(160deg,${PURPLE},#B71C66)`, color: "#fff", borderRadius: 22, padding: "30px 28px", display: "flex", flexDirection: "column", gap: 14, alignSelf: "start", position: isNarrow ? "static" : "sticky", top: 96 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: ".5px", opacity: 0.85 }}>{sel.name} · {term === "yearly" ? (ur ? "سالانہ" : "Yearly") : ur ? "ماہانہ" : "Monthly"}</div>
              <div className="num" style={{ fontSize: 40, fontWeight: 800 }}>Rs {amount.toLocaleString()}<span style={{ fontSize: 15, opacity: 0.8 }}> / {term === "yearly" ? (ur ? "سال" : "yr") : ur ? "ماہ" : "mo"}</span></div>
              <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 12, padding: "12px 14px", fontSize: 13, lineHeight: 1.6, display: "flex", gap: 9, alignItems: "flex-start" }}><FaCreditCard size={15} color="#F7D774" style={{ flex: "none", marginTop: 2 }} /> {ur ? "اپنی تفصیلات جمع کرائیں — ادائیگی کی تفصیلات آپ کو ای میل کے ذریعے بھیجی جائیں گی۔" : "Submit your details — payment details will be shared with you by email."}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 2, fontSize: 13.5 }}>
                {[ur ? "تفصیلات بھیجیں" : "Submit your details", ur ? "ادائیگی کی تفصیلات ای میل پر ملیں گی" : "Payment details arrive by email", ur ? "24 گھنٹے میں لائیو" : "Live within 24 hours"].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 9 }}><span style={{ fontWeight: 800 }}>{i + 1}.</span><span style={{ opacity: 0.92 }}>{s}</span></div>
                ))}
              </div>

              {/* live order simulator — fills the panel & sells the dream */}
              <OrderSim ur={ur} />
            </div>

            {/* form */}
            <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 22, padding: "28px 26px" }}>
              {(
                <form onSubmit={submit}>
                  <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 23, marginBottom: 2 }}>{ur ? "اپنی تفصیلات بھریں" : "Your restaurant details"}</div>
                  <div style={{ fontSize: 12.5, color: "#8A8072", marginBottom: 14 }}>{sel.name} · {ur ? `زیادہ سے زیادہ ${sel.max} ڈشز` : `up to ${sel.max} dishes`}</div>

                  <div style={{ marginBottom: 11 }}><div style={lbl}>{ur ? "ریستوران کا نام" : "Restaurant name"} *</div><input required value={f.restaurant} onChange={set("restaurant")} placeholder={ur ? "مثلاً کریم کڑاہی" : "e.g. Kareem Karahi"} style={input} /></div>
                  <div style={{ display: "flex", gap: 11, marginBottom: 11, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 130px" }}><div style={lbl}>{ur ? "مالک" : "Owner"} *</div><input required value={f.owner} onChange={set("owner")} placeholder={ur ? "آپ کا نام" : "Your name"} style={input} /></div>
                    <div style={{ flex: "1 1 130px" }}><div style={lbl}>{ur ? "فون / واٹس ایپ" : "Phone / WhatsApp"} *</div><input required value={f.phone} onChange={set("phone")} placeholder="03XX XXXXXXX" style={input} /></div>
                  </div>
                  <div style={{ marginBottom: 4 }}><div style={lbl}>{ur ? "آپ کی ای میل (فعال)" : "Your email (active)"} *</div><input required type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" style={input} /></div>
                  <div style={{ fontSize: 11.5, color: "#B07A15", background: "#FCF7EE", borderRadius: 8, padding: "8px 11px", margin: "8px 0 12px", lineHeight: 1.5, display: "flex", gap: 7, alignItems: "flex-start" }}><FaInfoCircle size={13} color="#B07A15" style={{ flex: "none", marginTop: 2 }} /> <span>{ur ? "ایک فعال ای میل دیں، شاہ جی آن لائن اپنی سرکاری ای میل سے آپ سے رابطہ کرے گا، اور آپ کو ابھی تصدیقی ای میل بھی جائے گی۔" : "Use an active email. Shah G Online contacts you from its official email, and you'll get an instant confirmation email too."}</span></div>

                  <div style={{ marginBottom: 11 }}><div style={lbl}>{ur ? "آپ کن علاقوں میں ڈیلیور کرتے ہیں؟" : "Which areas do you serve / deliver to?"} *</div><input required value={f.areas} onChange={set("areas")} placeholder={ur ? "مثلاً F-10، F-11، بلیو ایریا" : "e.g. F-10, F-11, Blue Area, G-9"} style={input} /><div style={{ fontSize: 11, color: "#B0A692", marginTop: 4 }}>{ur ? "آپ کی لسٹنگ صرف انہی علاقوں کے گاہکوں کو دکھائی دے گی۔" : "Your listing will only show to customers in these areas."}</div></div>
                  <div style={{ marginBottom: 14 }}><div style={lbl}>{ur ? "ان علاقوں میں ڈیلیوری فیس کتنی ہے؟" : "What's the delivery fee for these areas?"} *</div><input required value={f.deliveryFee} onChange={set("deliveryFee")} placeholder={ur ? "مثلاً Rs 100، یا مفت" : "e.g. Rs 100, or Free"} style={input} /></div>

                  {/* dishes */}
                  <div style={lbl}>{ur ? "آپ کی ڈشز اور قیمتیں" : "Your dishes & prices"} *</div>
                  <div style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "#F4F0FB", border: "1px solid #E3DAF3", borderRadius: 12, padding: "11px 13px", fontSize: 13, lineHeight: 1.6, color: "#4A3E63", margin: "8px 0 4px" }}>
                    <span style={{ flex: "none", display: "flex", marginTop: 1 }}><FaCamera size={15} color="#4A3E63" /></span>
                    <span>{ur ? "ڈشز کی تصاویر ہماری ٹیم خود لگائے گی تاکہ برانڈ کی یکسانیت برقرار رہے، آپ کو تصاویر بھیجنے کی ضرورت نہیں۔" : "Dish images will be placed by our team for brand consistency, you don't need to send any photos."}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "8px 0 6px" }}>
                    {dishes.map((d, i) => (
                      <div key={i} style={{ background: "#F7F3EB", borderRadius: 12, padding: 12 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <input value={d.name} onChange={(e) => setDish(i, "name", e.target.value)} placeholder={ur ? `ڈش ${i + 1} کا نام` : `Dish ${i + 1} name`} style={{ ...input, marginTop: 0, flex: 1 }} />
                          {dishes.length > 1 && <button type="button" onClick={() => rmDish(i)} aria-label="remove" style={{ cursor: "pointer", border: "none", background: "#EFE0DE", color: RED, width: 34, height: 34, borderRadius: 9, fontSize: 16, flex: "none" }}>×</button>}
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                          <select value={d.type} onChange={(e) => setDish(i, "type", e.target.value)} style={{ ...input, marginTop: 0, flex: "1 1 150px", cursor: "pointer" }}>
                            {DISH_TYPES.map((t) => <option key={t.v} value={t.v}>{t.label}</option>)}
                          </select>
                          {d.type === "halffull" ? (
                            <>
                              <div style={{ flex: "1 1 140px" }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: "#8A8072", marginBottom: 4 }}>{ur ? "ہاف" : "Half"}</div>
                                <input required value={d.half} onChange={(e) => setDish(i, "half", e.target.value)} placeholder={ur ? "مثلاً Rs 800" : "e.g. Rs 800"} style={{ ...input, marginTop: 0 }} />
                              </div>
                              <div style={{ flex: "1 1 140px" }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: "#8A8072", marginBottom: 4 }}>{ur ? "فل" : "Full"}</div>
                                <input required value={d.full} onChange={(e) => setDish(i, "full", e.target.value)} placeholder={ur ? "مثلاً Rs 1500" : "e.g. Rs 1500"} style={{ ...input, marginTop: 0 }} />
                              </div>
                            </>
                          ) : (
                            <input required value={d.details} onChange={(e) => setDish(i, "details", e.target.value)} placeholder={typePlaceholder[d.type]} style={{ ...input, marginTop: 0, flex: "2 1 200px" }} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {sel && dishes.length < sel.max && <button type="button" onClick={addDish} style={{ cursor: "pointer", border: `1.5px dashed ${RED}`, background: "transparent", color: RED, fontWeight: 800, fontSize: 13.5, fontFamily: "inherit", padding: "9px 16px", borderRadius: 11, marginBottom: 14 }}>+ {ur ? "ڈش شامل کریں" : "Add dish"} ({dishes.length}/{sel.max})</button>}

                  <label style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 12.5, color: "#5A5245", lineHeight: 1.6, margin: "6px 0 14px", cursor: "pointer" }}>
                    <input required type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 2, width: 16, height: 16, flex: "none", accentColor: RED, cursor: "pointer" }} />
                    <span>
                      {ur ? (
                        <>میں شاہ جی آن لائن کی <Link href="/terms" target="_blank" style={{ color: RED, fontWeight: 700 }}>شرائطِ استعمال</Link> اور <Link href="/privacy" target="_blank" style={{ color: RED, fontWeight: 700 }}>پرائیویسی پالیسی</Link> سے اتفاق کرتا/کرتی ہوں۔ *</>
                      ) : (
                        <>I agree to Shah G Online's <Link href="/terms" target="_blank" style={{ color: RED, fontWeight: 700 }}>Terms of Service</Link> and <Link href="/privacy" target="_blank" style={{ color: RED, fontWeight: 700 }}>Privacy Policy</Link>. *</>
                      )}
                    </span>
                  </label>

                  {err && <div style={{ fontSize: 13, color: "#9A3B2E", marginBottom: 12 }}>{err}</div>}
                  <button type="submit" disabled={state === "sending" || !agree} style={{ cursor: state === "sending" || !agree ? "not-allowed" : "pointer", width: "100%", border: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 15, borderRadius: 14, opacity: !agree ? 0.55 : 1 }}>{state === "sending" ? (ur ? "بھیجا جا رہا ہے…" : "Sending…") : ur ? "تفصیلات بھیجیں" : "Submit my details"}</button>
                  <div style={{ fontSize: 11.5, color: "#B0A692", marginTop: 10, textAlign: "center" }}>{ur ? "ادائیگی کی تفصیلات آپ کو ای میل پر بھیجی جائیں گی۔" : "Payment details will be sent to you by email."}</div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      <SuccessModal
        open={modal}
        ur={ur}
        title={ur ? "درخواست موصول ہو گئی!" : "Request received!"}
        message={ur ? "شکریہ! آپ کی درخواست موصول ہو گئی ہے۔ ادائیگی کی تفصیلات آپ کو ای میل پر بھیج دی جائیں گی، اس کے بعد آپ کی لسٹنگ لائیو ہو جائے گی۔" : "Thank you! Your request has been received. Payment details will be shared with you by email, and your listing goes live right after."}
        onClose={() => setModal(false)}
      />
    </>
  );
}
