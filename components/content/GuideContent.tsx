"use client";

import Link from "next/link";
import { BRANCHES, SITE_IMAGES, HOURS, branchSlug } from "@/lib/data";
import PageHero from "@/components/PageHero";

const RED = "#C1272D";

interface Sec { h: string; body: string[] }

const G = {
  title: "Best Desi Food & Daal Chawal in Islamabad & Rawalpindi",
  sub: "A local guide to the desi food people in the twin cities love most, and where to order it hot.",
  badge: "LOCAL FOOD GUIDE",
  secs: [
    {
      h: "The famous Daal Chawal",
      body: [
        "Ask anyone in Islamabad where to find the best daal chawal and one name keeps coming up: Shah G Foods. What began as a single counter in F-10 Markaz is now the everyday plate for students, office workers and families across the twin cities. The daal is slow-cooked, finished with a hand-made tarka and served over fluffy rice.",
        "It is the dish people search for by name, and it is still priced so that first-time customers are surprised by how little it costs.",
      ],
    },
    {
      h: "Biryani, pulao and karahi",
      body: [
        "Beyond daal chawal, our rice and karahi dishes keep people coming back. Chicken biryani, Bannu beef pulao and haleem chawal sit alongside chicken, desi chicken, mutton and BBQ chicken karahi, all cooked fresh when you order. Add a hot roghni naan or kulcha straight from the tandoor.",
      ],
    },
    {
      h: "Charcoal BBQ and rolls",
      body: [
        "In the evening, the charcoal grill takes over: chicken tikka, seekh kebab, malai boti and reshmi kebab, with paratha rolls, zinger burgers and shawarma for a quicker bite.",
      ],
    },
    {
      h: "Chai and lassi",
      body: [
        "No desi meal is complete without a cup of doodh patti or a tall glass of sweet or salty lassi. Both are served at every branch and are the perfect finish to a plate of daal chawal or a BBQ platter.",
      ],
    },
    {
      h: "Why Shah G Foods",
      body: [
        `Fresh, hand-spiced food at prices anyone can afford, served hot from ${BRANCHES.length} branches in Islamabad and Rawalpindi. Every branch is open daily from ${HOURS}, and most deliveries arrive within 30 to 40 minutes. Order by phone or WhatsApp.`,
      ],
    },
  ] as Sec[],
  areasIsb: "Order in Islamabad",
  areasRwp: "Order in Rawalpindi",
  areasNote: "Choose your area for the branch address, timings and delivery details.",
  cta: "See the menu →",
  seeMenu: "See the full menu →",
};

export default function GuideContent() {
  const g = G;
  const isb = BRANCHES.filter((b) => b.city === "Islamabad");
  const rwp = BRANCHES.filter((b) => b.city === "Rawalpindi");

  const chip: React.CSSProperties = { textDecoration: "none", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 999, padding: "8px 15px", fontSize: 13, fontWeight: 700, color: "#4A4238" };
  const h2: React.CSSProperties = { fontFamily: "'DM Serif Display',serif", fontSize: 25, fontWeight: 400, margin: "34px 0 12px" };

  return (
    <>
      <PageHero title={g.title} subtitle={g.sub} badge={g.badge} image={SITE_IMAGES.aboutHero} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "30px 20px 60px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
          <Link href="/menu" style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15.5, padding: "13px 26px", borderRadius: 13 }}>{g.cta}</Link>
          <Link href="/branches" style={{ textDecoration: "none", border: `1.5px solid ${RED}`, color: RED, fontWeight: 800, fontSize: 15.5, padding: "13px 24px", borderRadius: 13 }}>All branches</Link>
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

        <h2 style={h2}>Explore more</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          <Link href="/best-daal-chawal-islamabad" style={chip}>Best Daal Chawal</Link>
          <Link href="/shah-g-near-me" style={chip}>Shah G near me</Link>
          <Link href="/menu" style={chip}>Menu & prices</Link>
          <Link href="/shah-g-contact-number" style={chip}>Contact number</Link>
          <Link href="/shah-g-foods-photos" style={chip}>Photos</Link>
        </div>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Link href="/menu" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 15 }}>{g.seeMenu}</Link>
        </div>
      </div>
    </>
  );
}
