import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shah G Foods",
    short_name: "Shah G",
    description: "Desi comfort food delivery across Islamabad & Rawalpindi.",
    start_url: "/",
    display: "standalone",
    background_color: "#F2ECE1",
    theme_color: "#C1272D",
    icons: [
      {
        src: "/Shahglogo.png",
        sizes: "386x358",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
