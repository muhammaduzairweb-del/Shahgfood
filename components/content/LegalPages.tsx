"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import { PRIVACY, TERMS, REFUND, type LegalDoc } from "@/lib/legal";

const RED = "#C1272D";

function LegalDocView({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero title={doc.title} subtitle={doc.updated} badge={doc.badge} />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "34px 20px 64px" }}>
        <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "#4A4238", marginTop: 0 }}>{doc.intro}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 26 }}>
          {doc.sections.map((s, i) => (
            <section key={i} style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, padding: "22px 24px" }}>
              <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 21, fontWeight: 400, margin: "0 0 12px", color: "#211812" }}>{s.h}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {s.body.map((para, j) => (
                  <p key={j} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.8, color: "#5A5245" }}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Link href="/" style={{ textDecoration: "none", color: RED, fontWeight: 800, fontSize: 14.5 }}>← Back to home</Link>
        </div>
      </div>
    </>
  );
}

export const PrivacyContent = () => <LegalDocView doc={PRIVACY} />;
export const TermsContent = () => <LegalDocView doc={TERMS} />;
export const RefundContent = () => <LegalDocView doc={REFUND} />;
