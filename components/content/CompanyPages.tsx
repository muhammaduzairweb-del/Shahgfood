"use client";

// Company pages for the footer "Company" section, all about Shah G Online.
// Front-facing brand: "Shah G Online". (SEO metadata in the route files keeps
// the Shah G Foods terms since the domain is shahgfood.com.)

import Link from "next/link";
import {
  FaSearch, FaPhoneAlt, FaUtensils, FaBoxOpen, FaClipboardList, FaRocket, FaStore, FaHandshake, FaGlobeAsia,
  FaCamera, FaEye, FaMoneyBillWave, FaChartLine, FaMapMarkedAlt, FaCrown, FaHome, FaMapMarkerAlt, FaStar, FaHeart,
} from "react-icons/fa";
import { useApp } from "@/components/AppProvider";
import FoodOrbit from "@/components/FoodOrbit";

const RED = "#C1272D";
const PURPLE = "#5E1A86";
const CHARCOAL = "#16171B";
const SERIF = "'DM Serif Display','Noto Nastaliq Urdu',serif";
const WRAP: React.CSSProperties = { maxWidth: 1000, margin: "0 auto", padding: "44px 20px 64px" };
const card: React.CSSProperties = { background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, padding: "22px 22px" };

function useUr() {
  const { lang } = useApp();
  return lang === "ur";
}

function Hero({ badge, title, sub, ur }: { badge: string; title: string; sub: string; ur: boolean }) {
  return (
    <section style={{ background: `linear-gradient(150deg,${PURPLE} 0%,#8E1E7C 55%,#B71C66 100%)`, color: "#fff" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "52px 20px 56px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 15 }}>
        <div style={{ background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".6px" }}>{badge}</div>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(30px,4.6vw,50px)", lineHeight: ur ? 1.5 : 1.1, margin: 0, maxWidth: 800, fontWeight: 400 }}>{title}</h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.9)", margin: 0, maxWidth: 640, lineHeight: 1.75 }}>{sub}</p>
      </div>
    </section>
  );
}

function DualCta({ ur }: { ur: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: 44 }}>
      <div style={{ background: CHARCOAL, color: "#fff", borderRadius: 20, padding: "28px 26px", display: "flex", flexDirection: "column", gap: 11 }}>
        <div><FaUtensils size={26} color="#fff" /></div>
        <div style={{ fontFamily: SERIF, fontSize: 23 }}>{ur ? "بھوک لگی ہے؟" : "Feeling hungry?"}</div>
        <Link href="/restaurant/shah-g-foods/menu" style={{ alignSelf: "flex-start", textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 14.5, padding: "12px 22px", borderRadius: 12, marginTop: 4 }}>{ur ? "مینو دیکھیں →" : "Explore menus →"}</Link>
      </div>
      <div style={{ background: `linear-gradient(160deg,${PURPLE},#B71C66)`, color: "#fff", borderRadius: 20, padding: "28px 26px", display: "flex", flexDirection: "column", gap: 11 }}>
        <div><FaStore size={26} color="#fff" /></div>
        <div style={{ fontFamily: SERIF, fontSize: 23 }}>{ur ? "ریستوران کے مالک ہیں؟" : "Own a restaurant?"}</div>
        <Link href="/partner" style={{ alignSelf: "flex-start", textDecoration: "none", background: "#fff", color: PURPLE, fontWeight: 800, fontSize: 14.5, padding: "12px 22px", borderRadius: 12, marginTop: 4 }}>{ur ? "اپنا ریستوران لسٹ کریں →" : "List your restaurant →"}</Link>
      </div>
    </div>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
export function HowItWorksContent() {
  const ur = useUr();
  const customer = ur
    ? [
        { i: <FaSearch size={22} color={RED} />, h: "ڈش تلاش کریں", p: "اپنے علاقے کے ریستورانوں کے مینو دیکھیں اور پسندیدہ ڈش چنیں۔" },
        { i: <FaPhoneAlt size={22} color={RED} />, h: "سیدھا آرڈر کریں", p: "کال یا واٹس ایپ کا بٹن دبائیں، آرڈر سیدھا کچن کو جاتا ہے، کوئی درمیانی نہیں۔" },
        { i: <FaUtensils size={22} color={RED} />, h: "کھانا وصول کریں", p: "قیمت اور ڈیلیوری ریستوران خود طے کرتا ہے، تازہ کھانا سیدھا آپ تک۔" },
      ]
    : [
        { i: <FaSearch size={22} color={RED} />, h: "Find a dish", p: "Browse menus from restaurants that serve your area and pick what you're craving." },
        { i: <FaPhoneAlt size={22} color={RED} />, h: "Order directly", p: "Tap Call or WhatsApp, your order goes straight to the kitchen, no middle-man." },
        { i: <FaUtensils size={22} color={RED} />, h: "Enjoy your food", p: "Price and delivery are agreed directly with the restaurant, fresh food, straight to you." },
      ];
  const owner = ur
    ? [
        { i: <FaBoxOpen size={22} color={RED} />, h: "پیکج منتخب کریں", p: "اسٹارٹر، گروتھ یا سپر پریمیم، جو آپ کے کچن کے مطابق ہو۔" },
        { i: <FaClipboardList size={22} color={RED} />, h: "مینو جمع کرائیں", p: "اپنی ڈشز اور قیمتیں بھیجیں، تصاویر ہماری ٹیم برانڈ کی یکسانیت کے لیے خود لگاتی ہے۔" },
        { i: <FaRocket size={22} color={RED} />, h: "24 گھنٹے میں لائیو", p: "آپ کا مینو آپ کے کوریج والے علاقوں میں نظر آنا شروع، آرڈرز سیدھے آپ کے نمبر پر۔" },
      ]
    : [
        { i: <FaBoxOpen size={22} color={RED} />, h: "Pick a package", p: "Starter, Growth or Super Premium, whichever fits your kitchen." },
        { i: <FaClipboardList size={22} color={RED} />, h: "Submit your menu", p: "Send your dishes and prices, our team places the images for brand consistency." },
        { i: <FaRocket size={22} color={RED} />, h: "Go live in 24 hrs", p: "Your menu appears to customers in the areas you cover, orders ring your own number." },
      ];

  return (
    <div>
      <Hero
        ur={ur}
        badge={ur ? "یہ کیسے کام کرتا ہے" : "HOW IT WORKS"}
        title={ur ? "شاہ جی آن لائن کیسے کام کرتا ہے" : "How Shah G Online works"}
        sub={ur ? "نہ ہم کھانا پکاتے ہیں نہ ڈیلیور کرتے ہیں۔ ہم بھوکے گاہکوں کو براہِ راست بہترین کچن سے جوڑتے ہیں۔" : "We don't cook and we don't deliver. We connect hungry customers directly with the best kitchens, with zero commission in between."}
      />
      <div style={WRAP}>
        {[
          { t: ur ? "گاہکوں کے لیے" : "For customers", steps: customer },
          { t: ur ? "ریستورانوں کے لیے" : "For restaurants", steps: owner },
        ].map((g, gi) => (
          <div key={gi} style={{ marginTop: gi === 0 ? 0 : 40 }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 27, fontWeight: 400, margin: "0 0 18px" }}>{g.t}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
              {g.steps.map((s, i) => (
                <div key={i} style={card}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 26 }}>{s.i}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: 8, background: "#FCF2F1", color: RED, fontWeight: 800, fontSize: 13 }} className="num">{i + 1}</span>
                  </div>
                  <div style={{ fontSize: 16.5, fontWeight: 800 }}>{s.h}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "#5A5245", margin: "8px 0 0" }}>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <DualCta ur={ur} />
      </div>
    </div>
  );
}

/* ---------------- OUR MISSION ---------------- */
export function MissionContent() {
  const ur = useUr();
  const values = ur
    ? [
        { i: "0%", h: "صفر کمیشن", p: "ہر آرڈر کی پوری قیمت ریستوران کی، ہم فروخت پر ایک روپیہ نہیں لیتے۔" },
        { i: <FaHandshake size={24} color={RED} />, h: "براہِ راست رشتہ", p: "گاہک اور کچن کے بیچ کوئی نہیں، آرڈر، قیمت اور اعتماد سب براہِ راست۔" },
        { i: <FaGlobeAsia size={24} color={RED} />, h: "پورا پاکستان", p: "چھوٹے شہر کا ہوم کچن ہو یا بڑی چین، ہر معیاری کچن کے لیے جگہ۔" },
        { i: <FaCamera size={24} color={RED} />, h: "برانڈ کی یکسانیت", p: "ہر لسٹنگ کی تصاویر ہماری ٹیم لگاتی ہے تاکہ پورا پلیٹ فارم خوبصورت اور قابلِ اعتماد لگے۔" },
      ]
    : [
        { i: "0%", h: "Zero commission", p: "Every rupee of every order belongs to the restaurant, we never take a cut of sales." },
        { i: <FaHandshake size={24} color={RED} />, h: "Direct relationships", p: "Nobody sits between the customer and the kitchen, orders, prices and trust are all direct." },
        { i: <FaGlobeAsia size={24} color={RED} />, h: "All of Pakistan", p: "A home kitchen in a small city or a big chain, there's a place for every quality kitchen." },
        { i: <FaCamera size={24} color={RED} />, h: "Brand consistency", p: "Our team places the imagery on every listing, so the whole platform looks beautiful and trustworthy." },
      ];

  return (
    <div>
      <Hero
        ur={ur}
        badge={ur ? "ہمارا مشن" : "OUR MISSION"}
        title={ur ? "عمدہ کھانا سب کی پہنچ میں" : "Great food, within everyone's reach"}
        sub={ur ? "ہم ہر کچن کو، چھوٹا ہو یا بڑا، ڈیجیٹل طاقت دیتے ہیں تاکہ وہ بھاری فیس اور کمیشن کے بغیر آن لائن بڑھ سکے۔" : "We give every kitchen, big or small, the digital power to grow online without heavy fees or commissions."}
      />
      <div style={WRAP}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
          <div style={{ flex: "1.2 1 320px" }}>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "#3D362D", margin: 0 }}>
              {ur
                ? "پاکستان کے بہترین کھانے اکثر آن لائن نظر ہی نہیں آتے، اور جو آتے ہیں، اُن سے بھاری کمیشن لیا جاتا ہے۔ شاہ جی آن لائن اسی مسئلے کا حل ہے: ایک قومی فوڈ مارکیٹ پلیس جہاں ریستوران ایک سادہ ماہانہ سلاٹ لے کر لسٹ ہوتے ہیں اور گاہک سیدھا اُنہیں کال یا واٹس ایپ پر آرڈر کرتے ہیں۔"
                : "Pakistan's best food is often invisible online, and the kitchens that do get online pay heavy commissions for it. Shah G Online fixes that: a national food marketplace where restaurants take a simple monthly slot and customers order from them directly by Call or WhatsApp."}
            </p>
            <div style={{ marginTop: 22, fontFamily: SERIF, fontSize: "clamp(20px,2.6vw,27px)", fontStyle: "italic", color: "#211812", lineHeight: 1.45 }}>
              {ur ? "”عمدہ کھانا ڈھونڈنا آسان ہونا چاہیے، اور اسے بیچنا اس سے بھی آسان۔“" : "“Great food should be easy to find, and even easier to sell.”"}
            </div>
            <div style={{ marginTop: 10, fontWeight: 800, color: RED, fontSize: 12.5, letterSpacing: 1 }}>— SHAH G ONLINE</div>
          </div>
          <div style={{ flex: "1 1 280px", background: "linear-gradient(160deg,#FCF6EC,#F6EDDD)", border: "1px solid #EFE5D3", borderRadius: 22, padding: "18px 0" }}>
            <FoodOrbit
              center={<FaHeart size={46} color={RED} />}
              items={[<FaUtensils key="u" size={19} color={RED} />, <FaStore key="s" size={19} color="#E0A020" />, <FaHandshake key="h" size={19} color={RED} />, <FaGlobeAsia key="g" size={19} color="#E0A020" />, <FaRocket key="r" size={19} color={RED} />, <FaStar key="st" size={19} color="#E0A020" />]}
              speed={24}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 44 }}>
          {values.map((v, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 26, fontWeight: 800, color: RED }} className="num">{v.i}</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 8 }}>{v.h}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#5A5245", margin: "7px 0 0" }}>{v.p}</p>
            </div>
          ))}
        </div>
        <DualCta ur={ur} />
      </div>
    </div>
  );
}

/* ---------------- WHY SHAH G ONLINE ---------------- */
export function WhyUsContent() {
  const ur = useUr();
  const perks = ur
    ? [
        { i: <FaEye size={24} color={RED} />, h: "روزانہ 10,000+ وزیٹرز", p: "آپ کا مینو ہر روز ہزاروں بھوکے گاہکوں کے سامنے۔" },
        { i: <FaMoneyBillWave size={24} color={RED} />, h: "0% کمیشن", p: "ڈیلیوری ایپس 25–35% تک لیتی ہیں، ہم فروخت سے کچھ نہیں لیتے، صرف سادہ سلاٹ فیس۔" },
        { i: <FaChartLine size={24} color={RED} />, h: "گوگل پر رینکنگ", p: "ہر ڈش اور ریستوران کا اپنا SEO پیج، گاہک گوگل سے سیدھا آپ تک پہنچتے ہیں۔" },
        { i: <FaPhoneAlt size={22} color={RED} />, h: "براہِ راست آرڈر", p: "کال اور واٹس ایپ سیدھا آپ کے نمبر پر، گاہک کا نمبر بھی آپ ہی کے پاس۔" },
        { i: <FaCamera size={24} color={RED} />, h: "پروفیشنل لُک", p: "تصاویر ہماری ٹیم لگاتی ہے، آپ کی لسٹنگ ہمیشہ صاف اور برانڈڈ نظر آتی ہے۔" },
        { i: <FaMapMarkedAlt size={24} color={RED} />, h: "صرف آپ کے علاقے", p: "آپ صرف اُن گاہکوں کو نظر آتے ہیں جن تک آپ واقعی پہنچ سکتے ہیں۔" },
      ]
    : [
        { i: <FaEye size={24} color={RED} />, h: "10,000+ daily visitors", p: "Your menu in front of thousands of hungry customers, every single day." },
        { i: <FaMoneyBillWave size={24} color={RED} />, h: "0% commission", p: "Delivery apps take 25–35% per order, we take nothing from sales, just a simple slot fee." },
        { i: <FaChartLine size={24} color={RED} />, h: "Ranked on Google", p: "Every dish and restaurant gets its own SEO page, customers land on you straight from search." },
        { i: <FaPhoneAlt size={22} color={RED} />, h: "Direct orders", p: "Calls and WhatsApp ring your own number, you keep the customer relationship, and their number." },
        { i: <FaCamera size={24} color={RED} />, h: "Professional look", p: "Our team places the imagery, so your listing always looks clean, consistent and on-brand." },
        { i: <FaMapMarkedAlt size={24} color={RED} />, h: "Only your areas", p: "You're shown only to customers you can actually serve, no wasted calls from across the country." },
      ];

  return (
    <div>
      <Hero
        ur={ur}
        badge={ur ? "شاہ جی آن لائن ہی کیوں؟" : "WHY SHAH G ONLINE"}
        title={ur ? "کمیشن والی ایپس نہیں، آپ کا اپنا ڈیجیٹل مینو" : "Not another commission app. Your own digital menu"}
        sub={ur ? "ڈیلیوری ایپس آپ کے منافع سے کھاتی ہیں۔ شاہ جی آن لائن ایک سادہ لسٹنگ سلاٹ ہے: گاہک آپ کے، آرڈر آپ کے، پیسے آپ کے۔" : "Delivery apps eat your margin. Shah G Online is a simple listing slot: your customers, your orders, your money."}
      />
      <div style={WRAP}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14 }}>
          {perks.map((v, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 26 }}>{v.i}</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 8 }}>{v.h}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#5A5245", margin: "7px 0 0" }}>{v.p}</p>
            </div>
          ))}
        </div>
        <DualCta ur={ur} />
      </div>
    </div>
  );
}

/* ---------------- SUCCESS STORIES ---------------- */
export function SuccessStoriesContent() {
  const ur = useUr();
  const chips: { icon: React.ReactNode; label: string }[] = [
    { icon: <FaUtensils size={12} />, label: ur ? "90+ ڈشز لسٹڈ" : "90+ dishes listed" },
    { icon: <FaCrown size={12} />, label: ur ? "سپر پریمیم · سالانہ" : "Super Premium · Yearly" },
    { icon: <FaHome size={12} />, label: ur ? "ہوم پیج فیچرڈ" : "Homepage featured" },
    { icon: <FaMapMarkerAlt size={12} />, label: ur ? "تمام شاخیں" : "All branches" },
  ];

  return (
    <div>
      <Hero
        ur={ur}
        badge={ur ? "کامیابی کی کہانیاں" : "SUCCESS STORIES"}
        title={ur ? "ہمارے پارٹنرز کی کہانیاں" : "Stories from our partners"}
        sub={ur ? "شاہ جی آن لائن پر لسٹ ہونے والے کچن، اور اُن کا سفر۔" : "The kitchens listed on Shah G Online, and how it's going for them."}
      />
      <div style={WRAP}>
        {/* Founding partner story */}
        <div style={{ background: CHARCOAL, borderRadius: 24, overflow: "hidden", display: "flex", flexWrap: "wrap", color: "#fff" }}>
          <div style={{ flex: "1 1 300px", minHeight: 240, position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Shahgfoods__Feature.jpg" alt="Shah G Foods, founding partner on Shah G Online" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 14, insetInlineStart: 14, background: "#E0A020", color: "#211812", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 999 }}>★ {ur ? "پہلا پارٹنر" : "FIRST PARTNER"}</div>
          </div>
          <div style={{ flex: "1.15 1 320px", padding: "32px 34px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 13 }}>
            <div style={{ fontFamily: SERIF, fontSize: 30 }}>Shah G Foods</div>
            <p style={{ color: "rgba(255,255,255,.78)", fontSize: 15, lineHeight: 1.75, margin: 0 }}>
              {ur
                ? "شاہ جی فوڈز شاہ جی آن لائن کا سب سے پہلا پارٹنر ہے، پورے سال کے سپر پریمیم پیکج پر 90 سے زائد ڈشز لسٹڈ، تمام شاخوں کے ساتھ۔ دال چاول کی ایک پلیٹ سے شروع ہونے والا سفر اب پورے ملک کے گاہکوں تک۔"
                : "Shah G Foods is the very first partner on Shah G Online, 90+ dishes listed on the top Super Premium yearly package, across all branches. A journey that began with one plate of Daal Chawal now reaches customers nationwide."}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {chips.map((c, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.92)", fontSize: 12.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999 }}>{c.icon}{c.label}</span>
              ))}
            </div>
            <Link href="/restaurant/shah-g-foods/menu" style={{ alignSelf: "flex-start", textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "12px 24px", borderRadius: 12, marginTop: 4 }}>{ur ? "شاہ جی کا مینو دیکھیں →" : "View Shah G's menu →"}</Link>
          </div>
        </div>

        {/* your story next */}
        <div style={{ marginTop: 26, background: "linear-gradient(160deg,#FCF6EC,#F6EDDD)", border: "1px dashed #D9C9A8", borderRadius: 24, padding: "38px 26px", textAlign: "center" }}>
          <div><FaStar size={30} color="#E0A020" /></div>
          <div style={{ fontFamily: SERIF, fontSize: 26, marginTop: 8 }}>{ur ? "اگلی کہانی آپ کی ہو سکتی ہے" : "The next story could be yours"}</div>
          <p style={{ fontSize: 14.5, color: "#5A5245", maxWidth: 520, margin: "10px auto 0", lineHeight: 1.75 }}>
            {ur ? "اپنا مینو ہزاروں گاہکوں کے سامنے رکھیں، صفر کمیشن، براہِ راست آرڈرز، 24 گھنٹے میں لائیو۔" : "Put your menu in front of thousands of customers, zero commission, direct orders, live within 24 hours."}
          </p>
          <Link href="/partner" style={{ display: "inline-block", marginTop: 18, textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 26px", borderRadius: 13 }}>{ur ? "اپنا ریستوران لسٹ کریں →" : "List your restaurant →"}</Link>
        </div>
      </div>
    </div>
  );
}
