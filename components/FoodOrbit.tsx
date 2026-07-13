"use client";

interface Props {
  /** big icon in the middle (real SVG icon, not an emoji) */
  center: React.ReactNode;
  /** icons that circle around it */
  items: React.ReactNode[];
  /** true when rendered on a dark / gradient background */
  onDark?: boolean;
  /** orbit rotation duration in seconds */
  speed?: number;
}

/**
 * Pure-CSS animated panel: a floating centre emoji with satellites orbiting it,
 * soft pulsing rings behind. Replaces static photos on the about page & heroes.
 * Fully square (aspect 1/1) so it drops into the old ImageSlot spots.
 */
export default function FoodOrbit({ center, items, onDark = false, speed = 22 }: Props) {
  const ringColor = onDark ? "rgba(255,255,255,.28)" : "rgba(193,39,45,.22)";
  const satBg = onDark ? "rgba(255,255,255,.94)" : "#fff";
  const centerBg = onDark ? "rgba(255,255,255,.96)" : "#fff";

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", maxWidth: 420, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden>
      {/* pulsing rings */}
      {[0, 1.4].map((delay) => (
        <div key={delay} style={{ position: "absolute", inset: "12%", borderRadius: "50%", border: `2px solid ${ringColor}`, animation: `ringPulse 3.2s ease-out ${delay}s infinite` }} />
      ))}
      {/* static orbit track */}
      <div style={{ position: "absolute", inset: "17%", borderRadius: "50%", border: `1.5px dashed ${ringColor}` }} />

      {/* rotating satellites */}
      <div style={{ position: "absolute", inset: "17%", animation: `orbitSpin ${speed}s linear infinite` }}>
        {items.map((icon, i) => {
          const angle = (360 / items.length) * i;
          return (
            <div
              key={`sat-${i}`}
              style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div style={{ position: "absolute", top: -21, left: "50%", marginLeft: -21, width: 42, height: 42, borderRadius: "50%", background: satBg, boxShadow: "0 10px 22px -10px rgba(0,0,0,.4)", display: "flex", alignItems: "center", justifyContent: "center", animation: `orbitCounter ${speed}s linear infinite` }}>
                {icon}
              </div>
            </div>
          );
        })}
      </div>

      {/* floating centre plate */}
      <div style={{ position: "relative", width: "38%", aspectRatio: "1 / 1", borderRadius: "50%", background: centerBg, boxShadow: "0 26px 55px -22px rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", animation: "floatY 4.2s ease-in-out infinite" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>{center}</span>
      </div>
    </div>
  );
}
