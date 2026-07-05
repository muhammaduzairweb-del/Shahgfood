"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRANCHES, LOGO, LOGO_FILTER } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { IconHome, IconMenu, IconPin, IconInfo, IconBag } from "@/components/icons";

const PURPLE = "#8E1E7C";

const NAV: [string, "home" | "menu" | "branches" | "about"][] = [
  ["/", "home"],
  ["/menu", "menu"],
  ["/branches", "branches"],
  ["/about", "about"],
];

export default function Navbar() {
  const { lang, setLang, branch, setLocated, cartCount, setCartOpen, user } = useApp();
  const t = DICT[lang];
  const ur = lang === "ur";
  const pathname = usePathname();
  const w = useWidth();
  const isMobile = w < 820;
  const selBranch = BRANCHES.find((b) => b.name === branch) || BRANCHES[0];

  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ height: 4, background: "linear-gradient(90deg,#F26B21,#ED1E79)" }} />
        <div style={{ background: "linear-gradient(90deg,#5E1A86 0%,#8E1E7C 46%,#B71C66 100%)", boxShadow: "0 6px 24px -12px rgba(94,26,134,.7)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "10px 22px", display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" style={{ flex: "none", display: "flex", alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="Shah G Foods" style={{ height: isMobile ? 46 : 60, width: "auto", objectFit: "contain", display: "block", filter: LOGO_FILTER }} />
            </Link>

            {!isMobile && (
              <div onClick={() => setLocated(false)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 11, marginInlineStart: 6 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FCE3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff", fontWeight: 800, fontSize: 17 }}>{ur ? "ڈیلیوری" : "Deliver to"} <span style={{ fontSize: 12, opacity: 0.85 }}>▾</span></div>
                  <div style={{ color: "rgba(255,255,255,.75)", fontSize: 12.5, marginTop: 1 }}>{branch}, {selBranch.city} · ETA ~ {t.etaVal}</div>
                </div>
              </div>
            )}

            <div style={{ marginInlineStart: "auto", display: "flex", alignItems: "center", gap: 12 }}>
              {!isMobile && (
                <nav style={{ display: "flex", gap: 2 }}>
                  {NAV.map(([href, key]) => {
                    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                    return (
                      <Link key={href} href={href} style={{ textDecoration: "none", fontWeight: 700, fontSize: 13.5, padding: "8px 14px", borderRadius: 999, color: active ? PURPLE : "rgba(255,255,255,.9)", background: active ? "#fff" : "transparent" }}>{t[key]}</Link>
                    );
                  })}
                </nav>
              )}

              <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,.16)", borderRadius: 999, padding: 3, gap: 2, height: 32, flex: "none" }}>
                <div onClick={() => setLang("en")} className="num" style={{ cursor: "pointer", padding: "0 10px", height: 26, display: "flex", alignItems: "center", fontWeight: 800, fontSize: 11.5, borderRadius: 999, background: ur ? "transparent" : "#fff", color: ur ? "rgba(255,255,255,.85)" : PURPLE }}>EN</div>
                <div onClick={() => setLang("ur")} className="urdu" style={{ cursor: "pointer", padding: "0 11px", height: 26, display: "flex", alignItems: "center", fontWeight: 700, fontSize: 12.5, lineHeight: 1, borderRadius: 999, background: ur ? "#fff" : "transparent", color: ur ? PURPLE : "rgba(255,255,255,.85)" }}>اردو</div>
              </div>

              <button onClick={() => setCartOpen(true)} aria-label={t.cart} style={{ cursor: "pointer", position: "relative", border: "none", background: "rgba(255,255,255,.16)", width: 42, height: 42, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <IconBag size={20} strokeWidth={2} />
                <span className="num" style={{ position: "absolute", top: -6, insetInlineEnd: -6, background: "#fff", color: "#C01A6B", fontSize: 11, fontWeight: 800, minWidth: 20, height: 20, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px", boxShadow: "0 2px 6px rgba(0,0,0,.25)" }}>{cartCount}</span>
              </button>

              <Link href="/login" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.16)", borderRadius: 999, padding: isMobile ? "5px 6px" : "5px 14px 5px 6px", color: "#fff" }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.22)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FCE3B4"><circle cx="12" cy="8" r="4.2" /><path d="M4 20.5c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5z" /></svg>
                </span>
                {!isMobile && (
                  <>
                    <span style={{ fontWeight: 800, fontSize: 13.5, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user ? user.name : t.login}</span>
                    <span style={{ fontSize: 11, opacity: 0.85 }}>▾</span>
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* mobile bottom nav — floating island */}
      {isMobile && (
        <nav style={{ position: "fixed", bottom: 14, insetInlineStart: 14, insetInlineEnd: 14, zIndex: 60, height: 66, borderRadius: 22, background: "linear-gradient(90deg,#5E1A86 0%,#8E1E7C 48%,#B71C66 100%)", boxShadow: "0 14px 34px -8px rgba(94,26,134,.65)", display: "flex", alignItems: "center", padding: "0 6px" }}>
          <MobileTab href="/" Icon={IconHome} label={t.home} active={pathname === "/"} />
          <MobileTab href="/menu" Icon={IconMenu} label={t.menu} active={pathname.startsWith("/menu")} />
          <MobileTab href="/branches" Icon={IconPin} label={t.branches} active={pathname.startsWith("/branches")} />
          <MobileTab href="/about" Icon={IconInfo} label={t.about} active={pathname.startsWith("/about")} />
        </nav>
      )}
    </>
  );
}

function MobileTab({ href, Icon, label, active }: { href: string; Icon: (p: { size?: number; color?: string; strokeWidth?: number }) => React.ReactElement; label: string; active: boolean }) {
  return (
    <Link href={href} style={{ textDecoration: "none", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <div style={{ width: 46, height: 32, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: active ? "#fff" : "transparent", transition: "background .18s" }}>
        <Icon size={21} color={active ? "#8E1E7C" : "#fff"} strokeWidth={2.2} />
      </div>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: active ? "#fff" : "rgba(255,255,255,.85)" }}>{label}</span>
    </Link>
  );
}
