"use client";

import { useState } from "react";
import Link from "next/link";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { BRANCHES, MENU, SITE_IMAGES, ORDER_TEL, branchSlug } from "@/lib/data";
import { T, FAQS, BRANCH_COUNT, DISH_COUNT } from "@/lib/copy";
import { useApp } from "@/components/AppProvider";
import PageHero from "@/components/PageHero";

const RED = "#C1272D";
const WRAP: React.CSSProperties = { maxWidth: 1000, margin: "0 auto", padding: "34px 20px 60px" };
const card: React.CSSProperties = { background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, padding: 20 };
const serif = "'DM Serif Display',serif";

/* ---------------- ABOUT ---------------- */
const STORY = [
  {
    h: "Where it began: F-10 Markaz",
    p: "Shah G Foods started at a single counter in F-10 Markaz, Islamabad, with a small kitchen, a big pot of daal and a mountain of fluffy rice. Students, office workers, families and late-night friends queued for a plate that filled them up without emptying their pockets. That same Daal Chawal is still on our menu today, at a price that still surprises people.",
    img: SITE_IMAGES.aboutStory1,
  },
  {
    h: "One dish, a loyal following",
    p: "As the queues grew, so did the menu. We added Bannu beef pulao, chicken biryani, karahi and handi, charcoal BBQ, rolls and burgers, chaat, shakes and proper doodh patti. What never changed is how we cook: everything is made fresh, spiced by hand and served hot and fast. Customers kept coming back, and they brought their friends.",
    img: SITE_IMAGES.aboutStory2,
  },
  {
    h: `${BRANCH_COUNT} branches and growing`,
    p: `From that first counter in F-10, Shah G Foods has grown to ${BRANCH_COUNT} branches across Islamabad and Rawalpindi, from Blue Area and Bahria Town to Saddar and beyond. Every kitchen follows the same recipes and the same standards, because we believe good desi food should be within everyone's reach.`,
    img: SITE_IMAGES.aboutStory3,
  },
];

const VALUES = [
  { h: "Cooked fresh", p: "Daal, karahi and BBQ are made through the day in every branch, never reheated from yesterday." },
  { h: "Fair prices", p: "A filling meal should not cost a fortune. Our Daal Chawal proves it every day." },
  { h: "Open late", p: "Every branch is open from 8 AM to 2 AM, seven days a week, for breakfast, lunch, dinner and late-night cravings." },
];

export function AboutContent() {
  const stats = [
    { v: `${BRANCH_COUNT}`, l: "Branches" },
    { v: `${DISH_COUNT}`, l: "Dishes on the menu" },
    { v: "4.8", l: "Google rating" },
    { v: "2", l: "Cities served" },
  ];

  return (
    <div>
      <PageHero
        title="From one plate of Daal Chawal to 40 branches"
        subtitle="The story of Shah G Foods, a desi restaurant built on fresh food, fair prices and a lot of Daal Chawal."
        badge="OUR STORY"
        image={SITE_IMAGES.aboutHero}
      />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 20px 60px" }}>
        <p style={{ fontSize: 18, lineHeight: 1.9, color: "#3D362D", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          Shah G Foods began with a simple idea: give hard-working people a hot, honest, home-style meal they can actually afford. No shortcuts and no compromise, just proper desi food cooked the way it should be.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 48, marginTop: 54 }}>
          {STORY.map((b, i) => (
            <div key={b.h} style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}>
              <div style={{ flex: "1 1 300px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 12, background: "#FCF2F1", color: RED, fontFamily: serif, fontSize: 20, marginBottom: 14 }}>{i + 1}</div>
                <h2 style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, margin: "0 0 12px", lineHeight: 1.15 }}>{b.h}</h2>
                <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "#5A5245", margin: 0 }}>{b.p}</p>
              </div>
              <div style={{ flex: "1 1 320px", width: "100%", aspectRatio: "1 / 1", maxWidth: 440, margin: "0 auto", borderRadius: 22, overflow: "hidden", background: "#EFE5D3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.img} alt={b.h} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", margin: "56px auto", maxWidth: 720 }}>
          <div style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,32px)", fontStyle: "italic", color: "#211812", lineHeight: 1.4 }}>
            “Good food should not be a luxury. It should be a plate of Daal Chawal that anyone can afford.”
          </div>
          <div style={{ marginTop: 14, fontWeight: 800, color: RED, fontSize: 13, letterSpacing: 1 }}>SHAH G FOODS</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
          {stats.map((s) => (
            <div key={s.l} style={{ ...card, textAlign: "center" }}>
              <div className="num" style={{ fontFamily: serif, fontSize: 34, color: RED }}>{s.v}</div>
              <div style={{ fontSize: 12.5, color: "#8A8072", fontWeight: 600, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: serif, fontSize: 28, fontWeight: 400, textAlign: "center", margin: "56px 0 20px" }}>What we stand for</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          {VALUES.map((v) => (
            <div key={v.h} style={card}>
              <div style={{ fontWeight: 800, fontSize: 16.5 }}>{v.h}</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.7, color: "#5A5245" }}>{v.p}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#16171B", color: "#fff", borderRadius: 22, padding: "32px 28px", marginTop: 44, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 26 }}>Hungry yet?</div>
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 14.5, marginTop: 6 }}>Browse all {MENU.length} dishes and order by call or WhatsApp.</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/menu" style={{ textDecoration: "none", background: RED, color: "#fff", fontWeight: 800, fontSize: 15, padding: "13px 24px", borderRadius: 13 }}>See the menu →</Link>
            <a href={`tel:${ORDER_TEL}`} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#211812", fontWeight: 800, fontSize: 15, padding: "13px 22px", borderRadius: 13 }}><FaPhoneAlt size={13} /> Call to order</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- BRANCHES ---------------- */
export function BranchesContent() {
  const { branch, setBranch } = useApp();
  return (
    <>
      <PageHero title="Shah G Foods Branches" subtitle={T.brDesc} badge="ISLAMABAD & RAWALPINDI" image={SITE_IMAGES.aboutHero} />
      <div style={WRAP}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 18 }}>
          <div style={{ fontSize: 13, color: "#8A8072" }}>Tap a branch to make it your default, or open its page for directions.</div>
          <Link href="/shah-g-near-me" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 13.5 }}>Find the branch nearest to me →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
          {BRANCHES.map((b) => (
            <div key={b.name} onClick={() => setBranch(b.name)} style={{ ...card, cursor: "pointer", border: `1.5px solid ${branch === b.name ? RED : "#EAE1D2"}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{b.name}</div>
                <div className="num" style={{ fontSize: 10.5, fontWeight: 800, color: "#2E7D32", background: "#E7F3E7", padding: "4px 9px", borderRadius: 20, whiteSpace: "nowrap" }}>● {T.openNow}</div>
              </div>
              <div style={{ fontSize: 12.5, color: "#8A8072", marginTop: 6, lineHeight: 1.5 }}>{b.address}</div>
              <div className="num" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12, fontSize: 12, color: "#5A5245", fontWeight: 600 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><FaClock size={11} color="#8A8072" /> {T.hoursText}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><FaMapMarkerAlt size={11} color="#8A8072" /> {b.city}</span>
              </div>
              <Link href={`/branches/${branchSlug(b.name)}`} onClick={(e) => e.stopPropagation()} style={{ display: "inline-block", marginTop: 12, textDecoration: "none", color: RED, fontWeight: 800, fontSize: 12.5 }}>
                View {b.name} branch →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------------- FAQS ---------------- */
export function FaqsContent() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero title="Frequently asked questions" subtitle="Ordering, delivery, payment and opening hours at Shah G Foods." image={SITE_IMAGES.homeHero} />
      <div style={{ ...WRAP, maxWidth: 800 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} style={{ ...card, padding: 0, overflow: "hidden" }}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: "100%", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", border: "none", background: "transparent", textAlign: "left", fontFamily: "inherit", color: "inherit" }}>
                  <div style={{ fontWeight: 800, fontSize: 15, flex: 1 }}>{f.q}</div>
                  <div style={{ color: RED, fontSize: 20, fontWeight: 700, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform .2s" }}>+</div>
                </button>
                {isOpen && <div style={{ padding: "0 18px 18px", fontSize: 14, color: "#5A5245", lineHeight: 1.7 }}>{f.a}</div>}
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 26, fontSize: 14.5, color: "#5A5245" }}>
          Still have a question? <Link href="/contact" style={{ color: RED, fontWeight: 800, textDecoration: "none" }}>Contact us</Link>
        </div>
      </div>
    </>
  );
}
