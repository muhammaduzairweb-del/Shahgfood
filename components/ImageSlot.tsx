"use client";

/**
 * Renders an image when `src` is provided, otherwise a styled placeholder that
 * shows the recommended aspect ratio — so it's obvious where photos go and what
 * size to use. Paste URLs into SITE_IMAGES / DISH_IMAGES in lib/data.ts.
 */
export default function ImageSlot({
  src,
  alt,
  ratio = "16 / 9",
  radius = 22,
  label,
}: {
  src?: string;
  alt: string;
  ratio?: string;
  radius?: number;
  label?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio,
        borderRadius: radius,
        overflow: "hidden",
        background: src ? "#eee" : "linear-gradient(135deg,#EDE4D4,#E2D6BF)",
        border: src ? "none" : "1.5px dashed #C9BB9F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ textAlign: "center", color: "#A2957B", padding: 16 }}>
          <div style={{ fontSize: 30 }}>🖼️</div>
          <div style={{ fontSize: 12.5, fontWeight: 800, marginTop: 6 }}>{label || alt}</div>
          <div className="num" style={{ fontSize: 11, fontWeight: 700, marginTop: 3, opacity: 0.8 }}>{ratio.replace(/\s/g, "")}</div>
        </div>
      )}
    </div>
  );
}
