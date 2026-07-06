"use client";

import Link from "next/link";
import { MENU, BRANCHES, SITE_IMAGES, HOURS, getBranchBySlug, branchSlug, dishImage } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { fmt as fmtBase, mono } from "@/lib/cart";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import PageHero from "@/components/PageHero";

const RED = "#C1272D";
const CHARCOAL = "#16171B";

export default function BranchDetail({ slug }: { slug: string }) {
  const { lang } = useApp();
  const t = DICT[lang];
  const ur = lang === "ur";
  const fmt = (n: number) => fmtBase(n, ur);
  const w = useWidth();
  const cols = w < 560 ? 2 : w < 1000 ? 3 : 4;

  const branch = getBranchBySlug(slug);
  if (!branch) return null;

  const area = branch.name.replace(" Markaz", "");
  const popular = MENU.filter((d) => d.p).slice(0, 8);
  const nearby = BRANCHES.filter((b) => b.city === branch.city && b.name !== branch.name).slice(0, 10);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`;

  const intro = ur
    ? `${area}, ${branch.city} میں دیسی کھانے کے شوقین ہیں؟ شاہ جی فوڈز ${branch.name} پر ملتی ہے مشہورِ زمانہ دال چاول کے ساتھ بریانی، کڑاہی، ہانڈی، باربی کیو، رول، چاٹ اور دودھ پتی چائے — تازہ پکی اور گرم گرم ${area} بھر میں ڈیلیور۔ آن لائن آرڈر کریں یا اپنے قریب ترین شاخ ڈھونڈیں۔`
    : `Craving desi comfort food in ${area}? Shah G Foods ${branch.name} serves the legendary Daal Chawal along with chicken biryani, karahi, handi, charcoal BBQ, paratha rolls, chaat and doodh-patti chai — freshly cooked and delivered hot across ${area}, ${branch.city}. Order online for fast home delivery, or find us near you.`;

  const line2 = ur
    ? `شاخ کا پتہ ${branch.address} ہے اور ہم روزانہ ${HOURS} کھلے رہتے ہیں۔ ${area} اور آس پاس کے علاقوں میں تیز ڈیلیوری — عموماً 30–40 منٹ میں۔`
    : `Our ${branch.name} branch is at ${branch.address}, open daily ${HOURS}. We deliver fast across ${area} and nearby areas — usually within 30–40 minutes — so a hot plate of daal chawal is only a few taps away.`;

  const infoCard: React.CSSProperties = { background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px" };
  const h2: React.CSSProperties = { fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 24, fontWeight: 400, margin: "36px 0 14px" };

  return (
    <>
      <PageHero
        title={`Shah G Foods ${branch.name}`}
        subtitle={ur ? `${branch.city} · آن لائن آرڈر · روزانہ ${HOURS}` : `${branch.city} · Order online · Daily ${HOURS}`}
        badge={branch.city}
        image={SITE_IMAGES.homeHero}
      />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "30px 20px 60px" }}>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4A4238", margin: 0 }}>{intro}</p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5A5245", marginTop: 14 }}>{line2}</p>

        {/* order CTA */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
          <Link href="/menu" style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15.5, padding: "13px 26px", borderRadius: 13 }}>{ur ? "ابھی آرڈر کریں ←" : "Order now →"}</Link>
          <a href={mapHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", border: `1.5px solid ${RED}`, color: RED, fontWeight: 800, fontSize: 15.5, padding: "13px 24px", borderRadius: 13 }}>{ur ? "نقشے پر دیکھیں" : "Get directions"}</a>
        </div>

        {/* info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 26 }}>
          <div style={infoCard}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED, letterSpacing: ".5px" }}>{ur ? "پتہ" : "ADDRESS"}</div>
            <div style={{ fontSize: 14.5, marginTop: 6, lineHeight: 1.6 }}>{branch.address}</div>
          </div>
          <div style={infoCard}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED, letterSpacing: ".5px" }}>{ur ? "اوقات" : "TIMINGS"}</div>
            <div className="num" style={{ fontSize: 14.5, marginTop: 6 }}>{HOURS}</div>
            <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 3 }}>{ur ? "روزانہ کھلا" : "Open every day"}</div>
          </div>
          <div style={infoCard}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED, letterSpacing: ".5px" }}>{ur ? "ڈیلیوری" : "DELIVERY"}</div>
            <div className="num" style={{ fontSize: 14.5, marginTop: 6 }}>{ur ? "30–40 منٹ" : "30–40 min"}</div>
            <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 3 }}>{ur ? `${area} اور قریب` : `${area} & nearby`}</div>
          </div>
        </div>

        {/* popular dishes */}
        <h2 style={h2}>{ur ? `${branch.name} کے مقبول کھانے` : `Popular at Shah G Foods ${branch.name}`}</h2>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14 }}>
          {popular.map((d) => (
            <Link key={d.id} href="/menu" style={{ textDecoration: "none", color: "inherit", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ aspectRatio: "1 / 1", background: CHARCOAL, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {dishImage(d) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={dishImage(d)} alt={`${d.name} — Shah G Foods ${branch.name}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ color: "#fff", fontFamily: "'DM Serif Display',serif", fontSize: 30 }}>{mono(d.name)}</span>
                )}
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.3 }}>{ur ? d.urdu : d.name}</div>
                <div className="num" style={{ fontSize: 13, color: RED, fontWeight: 800, marginTop: 4 }}>{fmt(d.price)}</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <Link href="/menu" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 14.5 }}>{t.seeFullMenu}</Link>
        </div>

        {/* nearby branches — internal links */}
        <h2 style={h2}>{ur ? `${branch.city} میں دیگر شاخیں` : `Other Shah G Foods branches in ${branch.city}`}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          {nearby.map((b) => (
            <Link key={b.name} href={`/branches/${branchSlug(b.name)}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 999, padding: "8px 15px", fontSize: 13, fontWeight: 700, color: "#4A4238" }}>{b.name}</Link>
          ))}
        </div>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Link href="/branches" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 14.5 }}>{ur ? "تمام شاخیں دیکھیں ←" : "See all branches →"}</Link>
        </div>
      </div>
    </>
  );
}
