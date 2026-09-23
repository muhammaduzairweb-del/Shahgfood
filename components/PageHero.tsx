"use client";

export default function PageHero({ title, subtitle, image, badge }: { title: string; subtitle?: string; image?: string; badge?: string }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(90deg,#5E1A86 0%,#8E1E7C 46%,#B71C66 100%)", color: "#fff" }}>
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(94,26,134,.66) 0%,rgba(142,30,124,.55) 45%,rgba(23,13,27,.72) 100%)" }} />
        </>
      )}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "58px 20px 60px", position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {badge && <div style={{ display: "inline-block", background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".6px", marginBottom: 16 }}>{badge}</div>}
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(32px,5vw,54px)", lineHeight: 1.08, margin: 0, fontWeight: 400, letterSpacing: "-.5px", maxWidth: 760 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.9)", marginTop: 14, maxWidth: 560, lineHeight: 1.7 }}>{subtitle}</p>}
      </div>
    </section>
  );
}
