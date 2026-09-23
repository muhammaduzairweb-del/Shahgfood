"use client";

import Link from "next/link";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MENU, BRANCHES, SITE_IMAGES, HOURS, ORDER_TEL, ORDER_WA, getBranchBySlug, branchSlug, dishImage, dishSlug } from "@/lib/data";
import { T } from "@/lib/copy";
import { fmt, mono } from "@/lib/format";
import { useWidth } from "@/components/hooks";
import PageHero from "@/components/PageHero";

const RED = "#C1272D";
const CHARCOAL = "#16171B";

export default function BranchDetail({ slug }: { slug: string }) {
  const t = T;
  const w = useWidth();
  const cols = w < 560 ? 2 : w < 1000 ? 3 : 4;

  const branch = getBranchBySlug(slug);
  if (!branch) return null;

  const area = branch.name.replace(" Markaz", "");
  const popular = MENU.filter((d) => d.p).slice(0, 8);
  const nearby = BRANCHES.filter((b) => b.city === branch.city && b.name !== branch.name).slice(0, 10);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`;

  const intro = `Looking for good desi food in ${area}? Shah G Foods ${branch.name} serves our famous Daal Chawal alongside chicken biryani, karahi, charcoal BBQ, paratha rolls, chaat and doodh patti chai, all cooked fresh and delivered hot across ${area}, ${branch.city}.`;

  const line2 = `You will find us at ${branch.address}. The branch is open every day from ${HOURS}, and most deliveries in ${area} and the surrounding areas arrive within 30 to 40 minutes. Call or WhatsApp us to order.`;

  const infoCard: React.CSSProperties = { background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px" };
  const h2: React.CSSProperties = { fontFamily: "'DM Serif Display',serif", fontSize: 24, fontWeight: 400, margin: "36px 0 14px" };

  return (
    <>
      <PageHero
        title={`Shah G Foods ${branch.name}`}
        subtitle={`${branch.address} · Open daily ${HOURS}`}
        badge={branch.city}
        image={SITE_IMAGES.homeHero}
      />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "30px 20px 60px" }}>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4A4238", margin: 0 }}>{intro}</p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5A5245", marginTop: 14 }}>{line2}</p>

        {/* order CTA */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
          <a href={`tel:${ORDER_TEL}`} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: RED, color: "#fff", fontWeight: 800, fontSize: 15.5, padding: "13px 24px", borderRadius: 13 }}><FaPhoneAlt size={13} /> Call to order</a>
          <a href={`https://wa.me/${ORDER_WA}?text=${encodeURIComponent(`Hello Shah G Foods ${branch.name}! I would like to place an order.`)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", fontWeight: 800, fontSize: 15.5, padding: "13px 22px", borderRadius: 13 }}><FaWhatsapp size={17} /> WhatsApp</a>
          <a href={mapHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", border: `1.5px solid ${RED}`, color: RED, fontWeight: 800, fontSize: 15.5, padding: "13px 24px", borderRadius: 13 }}>Get directions</a>
        </div>

        {/* info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 26 }}>
          <div style={infoCard}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED, letterSpacing: ".5px" }}>ADDRESS</div>
            <div style={{ fontSize: 14.5, marginTop: 6, lineHeight: 1.6 }}>{branch.address}</div>
          </div>
          <div style={infoCard}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED, letterSpacing: ".5px" }}>TIMINGS</div>
            <div className="num" style={{ fontSize: 14.5, marginTop: 6 }}>{HOURS}</div>
            <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 3 }}>Open every day</div>
          </div>
          <div style={infoCard}>
            <div style={{ fontSize: 12, fontWeight: 800, color: RED, letterSpacing: ".5px" }}>DELIVERY</div>
            <div className="num" style={{ fontSize: 14.5, marginTop: 6 }}>30 to 40 min</div>
            <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 3 }}>{area} and nearby areas</div>
          </div>
        </div>

        {/* popular dishes */}
        <h2 style={h2}>Popular at Shah G Foods {branch.name}</h2>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14 }}>
          {popular.map((d) => (
            <Link key={d.id} href={`/menu/${dishSlug(d.name)}`} style={{ textDecoration: "none", color: "inherit", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ aspectRatio: "1 / 1", background: CHARCOAL, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {dishImage(d) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={dishImage(d)} alt={`${d.name} at Shah G Foods ${branch.name}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ color: "#fff", fontFamily: "'DM Serif Display',serif", fontSize: 30 }}>{mono(d.name)}</span>
                )}
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.3 }}>{d.name}</div>
                <div className="num" style={{ fontSize: 13, color: RED, fontWeight: 800, marginTop: 4 }}>{fmt(d.price)}</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <Link href="/menu" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 14.5 }}>{t.seeFullMenu}</Link>
        </div>

        {/* nearby branches (internal links) */}
        <h2 style={h2}>Other Shah G Foods branches in {branch.city}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          {nearby.map((b) => (
            <Link key={b.name} href={`/branches/${branchSlug(b.name)}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 999, padding: "8px 15px", fontSize: 13, fontWeight: 700, color: "#4A4238" }}>{b.name}</Link>
          ))}
        </div>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Link href="/branches" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 14.5 }}>See all branches →</Link>
        </div>
      </div>
    </>
  );
}
