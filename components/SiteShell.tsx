"use client";

import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import InstallApp from "@/components/InstallApp";
import NotifyReminder from "@/components/NotifyReminder";
import NotifyPrompt from "@/components/NotifyPrompt";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F2ECE1", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <SiteFooter />
      <InstallApp />
      <NotifyReminder />
      <NotifyPrompt />
    </div>
  );
}
