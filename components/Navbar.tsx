"use client";

import Link from "next/link";
import { FaStore } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { BRANCHES, LOGO, LOGO_FILTER } from "@/lib/data";
import { DICT } from "@/lib/i18n";
import { useApp } from "@/components/AppProvider";
import { useWidth, useHideOnScroll } from "@/components/hooks";
import { IconHome, IconMenu, IconInfo, IconBriefcase, IconChat } from "@/components/icons";
import { useChatUnread } from "@/lib/chat-store";
import { showChatSoon } from "@/components/ChatSoonToast";

const PURPLE = "#8E1E7C";

export default function Navbar() {
  const { lang, setLang, branch, area, setPickerOpen } = useApp();
  const chatUnread = useChatUnread();
  const t = DICT[lang];
  const ur = lang === "ur";
  const pathname = usePathname();
  const w = useWidth();
  const isMobile = w < 820;
  const selBranch = BRANCHES.find((b) => b.name === branch) || BRANCHES[0];

  const MENU_PATH = "/restaurant/shah-g-foods/menu";
  const NAV: [string, string][] = [
    ["/", t.home],
    [MENU_PATH, t.menu],
    ["/partner", ur ? "پارٹنر" : "Partner"],
    ["/about", t.about],
  ];

  // mobile "liquid glass" dock — icons only; the droplet slides to the active tab
  const M_TABS: { href: string; Icon: (p: { size?: number; color?: string; strokeWidth?: number }) => React.ReactElement; match: (p: string) => boolean }[] = [
    { href: "/", Icon: IconHome, match: (p) => p === "/" },
    { href: MENU_PATH, Icon: IconMenu, match: (p) => p.startsWith("/menu") || p.startsWith("/restaurant") },
    { href: "/partner", Icon: IconBriefcase, match: (p) => p.startsWith("/partner") },
    { href: "/about", Icon: IconInfo, match: (p) => p.startsWith("/about") },
  ];
  const M_TAB_W = 64;
  const mFound = M_TABS.findIndex((tb) => tb.match(pathname));
  const mActive = mFound >= 0; // false on pages not in the dock (privacy/terms/contact…)
  const mIdx = mActive ? mFound : 0;

  // dynamic hiding — bars slide away on scroll-down, return on scroll-up
  const hidden = useHideOnScroll();

  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ height: 4, background: "linear-gradient(90deg,#F26B21,#ED1E79)" }} />
        <div style={{ background: "linear-gradient(90deg,rgba(94,26,134,.82) 0%,rgba(142,30,124,.74) 46%,rgba(183,28,102,.82) 100%)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", boxShadow: "0 6px 24px -12px rgba(94,26,134,.7)", borderBottom: "1px solid rgba(255,255,255,.12)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "10px 22px", display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" style={{ flex: "none", display: "flex", alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="Shah G Foods" style={{ height: isMobile ? 46 : 60, width: "auto", objectFit: "contain", display: "block", filter: LOGO_FILTER }} />
            </Link>

            {!isMobile && (
              <div onClick={() => setPickerOpen(true)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 11, marginInlineStart: 6 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FCE3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff", fontWeight: 800, fontSize: 17 }}>{ur ? "آپ کی لوکیشن" : "Your location"} <span style={{ fontSize: 12, opacity: 0.85 }}>▾</span></div>
                  <div style={{ color: "rgba(255,255,255,.75)", fontSize: 12.5, marginTop: 1, maxWidth: 280, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{area || `${branch}, ${selBranch.city}`}</div>
                </div>
              </div>
            )}

            <div style={{ marginInlineStart: "auto", display: "flex", alignItems: "center", gap: 12 }}>
              {!isMobile && (
                <nav style={{ display: "flex", gap: 4 }}>
                  {NAV.map(([href, label]) => {
                    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        style={{ textDecoration: "none", fontWeight: 700, fontSize: 13.5, padding: "8px 15px", borderRadius: 999, color: active ? PURPLE : "rgba(255,255,255,.92)", background: active ? "#fff" : "transparent", boxShadow: active ? "0 4px 14px -5px rgba(0,0,0,.4)" : "none", transition: "background .25s ease, color .25s ease" }}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              )}

              <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,.16)", borderRadius: 999, padding: 3, gap: 2, height: 32, flex: "none" }}>
                <div onClick={() => setLang("en")} className="num" style={{ cursor: "pointer", padding: "0 10px", height: 26, display: "flex", alignItems: "center", fontWeight: 800, fontSize: 11.5, borderRadius: 999, background: ur ? "transparent" : "#fff", color: ur ? "rgba(255,255,255,.85)" : PURPLE }}>EN</div>
                <div onClick={() => setLang("ur")} className="urdu" style={{ cursor: "pointer", padding: "0 11px", height: 26, display: "flex", alignItems: "center", fontWeight: 700, fontSize: 12.5, lineHeight: 1, borderRadius: 999, background: ur ? "#fff" : "transparent", color: ur ? PURPLE : "rgba(255,255,255,.85)" }}>اردو</div>
              </div>


              {/* chat is gated behind a coming-soon toast until the WhatsApp relay goes live */}
              <Link href="/chat" onClick={(e) => { e.preventDefault(); showChatSoon(); }} aria-label={ur ? "چیٹس" : "Chats"} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.16)", color: "#fff", flex: "none" }}>
                <IconChat size={19} strokeWidth={1.9} />
                {chatUnread > 0 && (
                  <span className="num" style={{ position: "absolute", top: -3, insetInlineEnd: -3, minWidth: 17, height: 17, borderRadius: 9, background: "#25D366", color: "#fff", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", border: "1.5px solid rgba(94,26,134,1)" }}>{chatUnread}</span>
                )}
              </Link>

              <Link href="/partner" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 7, background: "#fff", color: PURPLE, fontWeight: 800, fontSize: isMobile ? 12.5 : 13.5, borderRadius: 999, padding: isMobile ? "9px 13px" : "9px 18px", whiteSpace: "nowrap" }}>
                <FaStore size={14} /> {isMobile ? (ur ? "لسٹ" : "List") : (ur ? "ریستوران لسٹ کریں" : "List Restaurant")}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* mobile bottom nav — iOS "liquid glass" droplet dock (icons only) */}
      {isMobile && (
        <nav
          aria-label="Primary"
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: `translateX(-50%) scale(${hidden ? 0.82 : 1})`,
            transformOrigin: "bottom center",
            transition: "transform .38s cubic-bezier(.34,1.56,.64,1)",
            direction: "ltr",
            zIndex: 60,
            height: 54,
            borderRadius: 27,
            background: "rgba(26,14,34,.4)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,.22)",
            boxShadow: "0 16px 40px -10px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.3)",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          {/* the droplet — slides & springs to the active tab */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 5,
              left: 10 + (M_TAB_W - 44) / 2,
              width: 44,
              height: 44,
              borderRadius: 15,
              background: "linear-gradient(160deg,rgba(255,255,255,.98),rgba(255,255,255,.82))",
              boxShadow: "0 8px 18px -5px rgba(0,0,0,.45), inset 0 1px 1px rgba(255,255,255,.9)",
              transform: `translateX(${mIdx * M_TAB_W}px)`,
              opacity: mActive ? 1 : 0,
              transition: "transform .5s cubic-bezier(.34,1.56,.64,1), opacity .25s",
            }}
          />
          {M_TABS.map((tb, i) => {
            const active = mActive && i === mIdx;
            return (
              <Link
                key={tb.href}
                href={tb.href}
                aria-current={active ? "page" : undefined}
                style={{ position: "relative", zIndex: 1, width: M_TAB_W, height: 54, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
              >
                <span style={{ display: "flex", transform: active ? "scale(1.08)" : "scale(1)", transition: "transform .45s cubic-bezier(.34,1.56,.64,1)" }}>
                  <tb.Icon size={22} color={active ? "#8E1E7C" : "#fff"} strokeWidth={2.2} />
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
