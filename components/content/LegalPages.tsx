"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import PageHero from "@/components/PageHero";
import { PRIVACY, TERMS, REFUND, SERVICE, type LegalDoc } from "@/lib/legal";

const RED = "#C1272D";

function LegalDocView({ doc, backLabel }: { doc: LegalDoc; backLabel: string }) {
  return (
    <>
      <PageHero title={doc.title} subtitle={doc.updated} badge={doc.badge} />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "34px 20px 64px" }}>
        <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "#4A4238", marginTop: 0 }}>{doc.intro}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 26 }}>
          {doc.sections.map((s, i) => (
            <section key={i} style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, padding: "22px 24px" }}>
              <h2 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 21, fontWeight: 400, margin: "0 0 12px", color: "#211812" }}>{s.h}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {s.body.map((para, j) => (
                  <p key={j} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.8, color: "#5A5245" }}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Link href="/" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 14.5 }}>{backLabel}</Link>
        </div>
      </div>
    </>
  );
}

export function PrivacyContent() {
  const { lang } = useApp();
  const ur = lang === "ur";
  return <LegalDocView doc={PRIVACY[lang]} backLabel={ur ? "← اسٹور پر واپس" : "← Back to store"} />;
}

export function TermsContent() {
  const { lang } = useApp();
  const ur = lang === "ur";
  return <LegalDocView doc={TERMS[lang]} backLabel={ur ? "← اسٹور پر واپس" : "← Back to store"} />;
}

export function RefundContent() {
  const { lang } = useApp();
  const ur = lang === "ur";
  return <LegalDocView doc={REFUND[lang]} backLabel={ur ? "← اسٹور پر واپس" : "← Back to store"} />;
}

export function ServiceContent() {
  const { lang } = useApp();
  const ur = lang === "ur";
  return <LegalDocView doc={SERVICE[lang]} backLabel={ur ? "← اسٹور پر واپس" : "← Back to store"} />;
}
