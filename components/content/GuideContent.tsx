"use client";

import Link from "next/link";
import { BRANCHES, SITE_IMAGES, HOURS, branchSlug } from "@/lib/data";
import { useApp } from "@/components/AppProvider";
import PageHero from "@/components/PageHero";

const RED = "#C1272D";

interface Sec { h: string; body: string[] }

const EN = {
  title: "Best Desi Food & Daal Chawal in Islamabad & Rawalpindi",
  sub: "A local's guide to the most-loved desi comfort food in the twin cities — and where to order it hot.",
  badge: "THE 2026 GUIDE",
  secs: [
    {
      h: "The legendary Daal Chawal",
      body: [
        "If you ask anyone in Islamabad where to get the best daal chawal, one name comes up again and again: Shah G Foods. What started as a single counter in F-10 Markaz is now the go-to plate for students, office workers and families across the twin cities — budget-friendly, filling, and cooked the way it's meant to be. The daal is slow-simmered and tempered by hand, served over fluffy rice for a plate that genuinely tastes like home.",
        "It's the dish people search for by name — \"shah g daal chawal\", \"best daal in islamabad\" — and it's still on the menu at a price that surprises first-timers.",
      ],
    },
    {
      h: "Biryani, Karahi & Handi",
      body: [
        "Beyond daal chawal, the desi mains are the reason people keep coming back. Chicken biryani layered with aromatic spice, tomato-rich beef karahi, creamy white handi and slow-cooked mutton — all cooked fresh to order. Pair them with a hot roghni or khameeri naan straight from the tandoor.",
      ],
    },
    {
      h: "Charcoal BBQ & Rolls",
      body: [
        "For the evening crowd, the charcoal BBQ is a highlight: chicken tikka, seekh kebab, malai boti and reshmi kebab, plus crispy paratha rolls and burgers for a quick bite. It's proper twin-cities street food, delivered hot.",
      ],
    },
    {
      h: "Best chai & lassi in the twin cities",
      body: [
        "No desi meal is complete without proper doodh-patti chai or a tall glass of sweet or salty lassi. Both are a signature at every branch — the perfect finish to a plate of daal chawal or a BBQ platter.",
      ],
    },
    {
      h: "Why Shah G Foods",
      body: [
        "Freshly cooked, hand-seasoned food at prices anyone can afford, served fast and hot across 40+ branches in Islamabad and Rawalpindi. Open daily from 11:00 AM to 2:00 AM, with home delivery usually within 30–40 minutes and live order tracking so you always know where your rider is.",
      ],
    },
  ] as Sec[],
  areasIsb: "Order in Islamabad",
  areasRwp: "Order in Rawalpindi",
  areasNote: "Tap your area for menu, timings and delivery.",
  cta: "Order now →",
  seeMenu: "See the full menu →",
};

const UR = {
  title: "اسلام آباد اور راولپنڈی میں بہترین دیسی کھانا اور دال چاول",
  sub: "جڑواں شہروں کے سب سے پسندیدہ دیسی کھانوں کی مقامی گائیڈ — اور انہیں گرم گرم منگوانے کا طریقہ۔",
  badge: "گائیڈ 2026",
  secs: [
    {
      h: "مشہورِ زمانہ دال چاول",
      body: [
        "اسلام آباد میں بہترین دال چاول کہاں ملتی ہے؟ ایک ہی نام بار بار آتا ہے: شاہ جی فوڈز۔ F-10 مرکز کے ایک کاؤنٹر سے شروع ہونے والا یہ ذائقہ آج جڑواں شہروں بھر میں طلبہ، دفتر والوں اور خاندانوں کی پہلی پسند ہے — کم قیمت، پیٹ بھر، اور اصل انداز میں پکی ہوئی۔",
        "یہی وہ ڈش ہے جسے لوگ نام لے کر تلاش کرتے ہیں، اور آج بھی اس کی قیمت نئے گاہکوں کو حیران کر دیتی ہے۔",
      ],
    },
    {
      h: "بریانی، کڑاہی اور ہانڈی",
      body: [
        "دال چاول کے علاوہ دیسی مین ڈشز بھی لاجواب ہیں: خوشبودار چکن بریانی، ٹماٹر والی بیف کڑاہی، کریمی وائٹ ہانڈی اور دم پر پکی مٹن — سب تازہ تیار۔ ساتھ تندور سے نکلی گرم روغنی یا خمیری نان۔",
      ],
    },
    {
      h: "کوئلوں کا باربی کیو اور رول",
      body: [
        "شام کے لیے باربی کیو خاص ہے: چکن تکہ، سیخ کباب، ملائی بوٹی اور ریشمی کباب، اور جلدی کھانے کے لیے کرسپی پراٹھا رول اور برگر — گرم گرم آپ تک۔",
      ],
    },
    {
      h: "بہترین چائے اور لسی",
      body: [
        "دیسی کھانا اصل دودھ پتی چائے یا میٹھی و نمکین لسی کے بغیر ادھورا ہے۔ دونوں ہر شاخ کی پہچان ہیں۔",
      ],
    },
    {
      h: "شاہ جی فوڈز ہی کیوں",
      body: [
        "تازہ، ہاتھ سے مصالحہ لگا کھانا ایسی قیمت پر جو سب کی پہنچ میں ہو، اسلام آباد اور راولپنڈی کی 40+ شاخوں پر گرم گرم۔ روزانہ صبح 11 سے رات 2 بجے تک، ڈیلیوری عموماً 30–40 منٹ میں اور لائیو ٹریکنگ کے ساتھ۔",
      ],
    },
  ] as Sec[],
  areasIsb: "اسلام آباد میں آرڈر کریں",
  areasRwp: "راولپنڈی میں آرڈر کریں",
  areasNote: "مینو، اوقات اور ڈیلیوری کے لیے اپنا علاقہ منتخب کریں۔",
  cta: "ابھی آرڈر کریں ←",
  seeMenu: "مکمل مینو دیکھیں ←",
};

export default function GuideContent() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const g = ur ? UR : EN;
  const isb = BRANCHES.filter((b) => b.city === "Islamabad");
  const rwp = BRANCHES.filter((b) => b.city === "Rawalpindi");

  const chip: React.CSSProperties = { textDecoration: "none", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 999, padding: "8px 15px", fontSize: 13, fontWeight: 700, color: "#4A4238" };
  const h2: React.CSSProperties = { fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 25, fontWeight: 400, margin: "34px 0 12px" };

  return (
    <>
      <PageHero title={g.title} subtitle={g.sub} badge={g.badge} image={SITE_IMAGES.aboutHero} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "30px 20px 60px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
          <Link href="/menu" style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15.5, padding: "13px 26px", borderRadius: 13 }}>{g.cta}</Link>
          <Link href="/branches" style={{ textDecoration: "none", border: `1.5px solid ${RED}`, color: RED, fontWeight: 800, fontSize: 15.5, padding: "13px 24px", borderRadius: 13 }}>{ur ? "تمام شاخیں" : "All branches"}</Link>
        </div>

        {g.secs.map((s, i) => (
          <section key={i}>
            <h2 style={h2}>{s.h}</h2>
            {s.body.map((para, j) => (
              <p key={j} style={{ margin: "0 0 12px", fontSize: 15.5, lineHeight: 1.85, color: "#4A4238" }}>{para}</p>
            ))}
          </section>
        ))}

        {/* Areas served — internal links to every branch page */}
        <h2 style={h2}>{g.areasIsb}</h2>
        <div style={{ fontSize: 13, color: "#8A8072", marginBottom: 12 }}>{g.areasNote}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          {isb.map((b) => (
            <Link key={b.name} href={`/branches/${branchSlug(b.name)}`} style={chip}>{b.name}</Link>
          ))}
        </div>

        <h2 style={h2}>{g.areasRwp}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          {rwp.map((b) => (
            <Link key={b.name} href={`/branches/${branchSlug(b.name)}`} style={chip}>{b.name}</Link>
          ))}
        </div>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Link href="/menu" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 15 }}>{g.seeMenu}</Link>
        </div>
      </div>
    </>
  );
}
