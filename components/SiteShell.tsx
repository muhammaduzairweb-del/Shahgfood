"use client";

import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { useWidth } from "@/components/hooks";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const w = useWidth();
  const isMobile = w < 820;
  return (
    <div style={{ minHeight: "100vh", background: "#F2ECE1", paddingBottom: isMobile ? 96 : 0 }}>
      <Navbar />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
