"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BRANCHES, LOGO, LOGO_FILTER } from "@/lib/data";
import { EXTRA } from "@/lib/i18n-extra";
import { useApp } from "@/components/AppProvider";
import { ORDER_STATUSES, listOrders, updateStatus, type Order, type OrderStatus } from "@/lib/orders";

const RED = "#C1272D";
const GREEN = "#1E5631";
const BRANCH_PW = "shahg";
const SUPER_PW = "superadmin";

const NEXT: Record<OrderStatus, OrderStatus | null> = {
  received: "preparing",
  preparing: "onway",
  onway: "delivered",
  delivered: null,
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  received: "#E0A020",
  preparing: "#C1272D",
  onway: "#2563EB",
  delivered: GREEN,
};

export default function AdminConsole({ superMode = false }: { superMode?: boolean }) {
  const { lang, setLang } = useApp();
  const x = EXTRA[lang];
  const ur = lang === "ur";

  const sessionKey = superMode ? "sjf.admin.super" : "sjf.admin.branch";
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loginBranch, setLoginBranch] = useState(BRANCHES[0].name);
  const [branch, setBranch] = useState(BRANCHES[0].name);
  const [orders, setOrders] = useState<Order[]>([]);
  const [drill, setDrill] = useState<string | null>(null); // super: selected branch

  useEffect(() => {
    try {
      const s = sessionStorage.getItem(sessionKey);
      if (s) {
        const parsed = JSON.parse(s);
        setAuthed(true);
        if (!superMode && parsed.branch) setBranch(parsed.branch);
      }
    } catch {
      /* ignore */
    }
  }, [sessionKey, superMode]);

  const load = useCallback(() => {
    if (!authed) return;
    setOrders(listOrders(superMode ? undefined : branch));
  }, [authed, superMode, branch]);

  useEffect(() => {
    if (!authed) return;
    load();
    const iv = setInterval(load, 3000);
    return () => clearInterval(iv);
  }, [authed, load]);

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = superMode ? SUPER_PW : BRANCH_PW;
    if (pw !== expected) {
      setErr(x.wrongPw);
      return;
    }
    setAuthed(true);
    if (!superMode) setBranch(loginBranch);
    sessionStorage.setItem(sessionKey, JSON.stringify({ branch: loginBranch }));
    setPw("");
    setErr("");
  };

  const logout = () => {
    sessionStorage.removeItem(sessionKey);
    setAuthed(false);
    setDrill(null);
  };

  const advance = (o: Order) => {
    const next = NEXT[o.status];
    if (!next) return;
    updateStatus(o.id, next);
    load();
  };

  const fmt = (n: number) => "Rs. " + n.toLocaleString("en-US");
  const statusLabel = (s: OrderStatus) => x.st[s];

  // ---- LOGIN SCREEN ----
  if (!authed) {
    return (
      <Shell lang={lang} setLang={setLang} superMode={superMode}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <form onSubmit={signIn} style={{ width: "min(400px,100%)", background: "#fff", borderRadius: 22, border: "1px solid #EAE1D2", boxShadow: "0 30px 70px -30px rgba(0,0,0,.3)", overflow: "hidden" }}>
            <div style={{ background: superMode ? "linear-gradient(150deg,#211812,#3a2a1c)" : "linear-gradient(150deg,#C1272D,#8E1B12)", padding: "26px", textAlign: "center", color: "#fff" }}>
              <div style={{ fontSize: 30 }}>{superMode ? "🛡️" : "🍽️"}</div>
              <div style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 23, marginTop: 6 }}>{superMode ? x.superAdmin : x.branchAdmin}</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.8)", marginTop: 4 }}>{x.adminSubtitle}</div>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              {!superMode && (
                <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{x.selectBranch}
                  <select value={loginBranch} onChange={(e) => setLoginBranch(e.target.value)} style={{ marginTop: 6, width: "100%", border: "1.5px solid #E0D6C4", background: "#F9F6F0", borderRadius: 12, padding: 13, fontSize: 15, fontFamily: "inherit", outline: "none" }}>
                    {BRANCHES.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
                  </select>
                </label>
              )}
              <label style={{ fontSize: 11.5, fontWeight: 700, color: "#8A8072" }}>{x.adminPassword}
                <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" style={{ marginTop: 6, width: "100%", border: "1.5px solid #E0D6C4", background: "#F9F6F0", borderRadius: 12, padding: 13, fontSize: 15, fontFamily: "inherit", outline: "none" }} />
              </label>
              {err && <div style={{ color: RED, fontSize: 12.5, fontWeight: 700 }}>{err}</div>}
              <button type="submit" style={{ cursor: "pointer", border: "none", background: superMode ? "#211812" : RED, color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "inherit", padding: 14, borderRadius: 13 }}>{x.signIn}</button>
              <div style={{ fontSize: 11, color: "#A99C86", textAlign: "center" }}>Demo password: <b>{superMode ? SUPER_PW : BRANCH_PW}</b></div>
            </div>
          </form>
        </div>
      </Shell>
    );
  }

  // ---- SUPER: overview + drilldown ----
  if (superMode && !drill) {
    const byBranch = BRANCHES.map((b) => {
      const list = orders.filter((o) => o.branch === b.name);
      const revenue = list.reduce((a, o) => a + o.total, 0);
      const active = list.filter((o) => o.status !== "delivered").length;
      return { name: b.name, city: b.city, count: list.length, revenue, active };
    });
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((a, o) => a + o.total, 0);
    return (
      <Shell lang={lang} setLang={setLang} superMode onLogout={logout}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 60px", width: "100%" }}>
          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 28, margin: "0 0 4px" }}>{x.allBranchesTitle}</h1>
          <div style={{ color: "#8A8072", fontSize: 14, marginBottom: 20 }}>{x.superSubtitle}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 22 }}>
            <Stat label={x.branchesLabel} value={String(BRANCHES.length)} />
            <Stat label={x.totalOrdersLabel} value={String(totalOrders)} />
            <Stat label={x.revenueToday} value={fmt(totalRevenue)} />
            <Stat label={x.activeNow} value={String(orders.filter((o) => o.status !== "delivered").length)} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>{x.perBranch}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
            {byBranch.map((b) => (
              <div key={b.name} onClick={() => setDrill(b.name)} style={{ cursor: "pointer", background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 15.5, fontWeight: 800 }}>{b.name}</div>
                  {b.active > 0 && <span className="num" style={{ background: "#FCE9C9", color: "#8a5a00", fontSize: 11, fontWeight: 800, padding: "3px 8px", borderRadius: 12 }}>{b.active} {x.activeNow}</span>}
                </div>
                <div style={{ fontSize: 12, color: "#8A8072", marginTop: 3 }}>{b.city}</div>
                <div className="num" style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 13 }}>
                  <div><b style={{ fontSize: 18 }}>{b.count}</b> <span style={{ color: "#8A8072" }}>{x.ordersLower}</span></div>
                  <div><b style={{ fontSize: 18 }}>{fmt(b.revenue)}</b></div>
                </div>
                <div style={{ color: RED, fontWeight: 700, fontSize: 13, marginTop: 12 }}>{x.openDashboard}</div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  // ---- ORDER LIST (branch admin, or super drilldown) ----
  const activeBranch = superMode ? drill! : branch;
  const list = superMode ? orders.filter((o) => o.branch === activeBranch) : orders;
  const revenue = list.reduce((a, o) => a + o.total, 0);
  const active = list.filter((o) => o.status !== "delivered").length;

  return (
    <Shell lang={lang} setLang={setLang} superMode={superMode} onLogout={logout}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px 60px", width: "100%" }}>
        {superMode && <div onClick={() => setDrill(null)} style={{ cursor: "pointer", color: "#8A8072", fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{x.backToOverview}</div>}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 26, margin: 0 }}>{activeBranch}</h1>
          <span className="num" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#E7F3E7", color: GREEN, fontSize: 11.5, fontWeight: 800, padding: "5px 11px", borderRadius: 20 }}>● {x.autoRefresh}</span>
        </div>
        <div style={{ color: "#8A8072", fontSize: 14, marginBottom: 18 }}>{x.adminSubtitle}</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 22 }}>
          <Stat label={x.ordersToday} value={String(list.length)} />
          <Stat label={x.revenueToday} value={fmt(revenue)} />
          <Stat label={x.activeNow} value={String(active)} />
        </div>

        {list.length === 0 ? (
          <div style={{ background: "#fff", border: "1px dashed #D9CFBB", borderRadius: 20, padding: "50px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🧾</div>
            <div style={{ fontWeight: 800, fontSize: 17, marginTop: 8 }}>{x.noOrdersYet}</div>
            <div style={{ color: "#8A8072", fontSize: 13.5, marginTop: 4 }}>{x.noOrdersSub}</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {list.map((o) => {
              const step = ORDER_STATUSES.indexOf(o.status);
              const isNew = o.status === "received";
              const next = NEXT[o.status];
              const nextLabel = next === "preparing" ? x.markPreparing : next === "onway" ? x.markOnway : next === "delivered" ? x.markDelivered : x.done;
              return (
                <div key={o.id} style={{ background: "#fff", border: `1px solid ${isNew ? RED : "#EAE1D2"}`, borderRadius: 18, padding: 18, boxShadow: isNew ? "0 0 0 3px rgba(193,39,45,.08)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span className="num" style={{ fontWeight: 800, fontSize: 15 }}>{o.id}</span>
                    {isNew && <span style={{ background: RED, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 12 }}>{x.newBadge}</span>}
                    <span className="num" style={{ background: STATUS_COLOR[o.status] + "22", color: STATUS_COLOR[o.status], fontSize: 11.5, fontWeight: 800, padding: "4px 10px", borderRadius: 20 }}>● {statusLabel(o.status)}</span>
                    <span className="num" style={{ marginInlineStart: "auto", fontSize: 12.5, color: "#8A8072" }}>{new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", marginTop: 10, fontSize: 13.5 }}>
                    <div><span style={{ color: "#8A8072" }}>👤 </span><b>{o.customer.name || "—"}</b></div>
                    <div className="num"><span style={{ color: "#8A8072" }}>📞 </span>{o.customer.phone || "—"}</div>
                    <div style={{ flexBasis: "100%", color: "#5A5245" }}><span style={{ color: "#8A8072" }}>📍 </span>{o.customer.address || "—"}, {o.city}</div>
                    {o.customer.notes && <div style={{ flexBasis: "100%", color: "#8A8072", fontStyle: "italic" }}>“{o.customer.notes}”</div>}
                  </div>

                  <div style={{ background: "#F9F6F0", borderRadius: 12, padding: "10px 12px", marginTop: 12, fontSize: 13 }}>
                    {o.items.map((it) => (
                      <div key={it.id} className="num" style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
                        <span>{it.qty}× {ur ? it.urdu : it.name}</span>
                        <span style={{ fontWeight: 700 }}>{fmt(it.price * it.qty)}</span>
                      </div>
                    ))}
                    <div style={{ height: 1, background: "#EAE1D2", margin: "8px 0" }} />
                    <div className="num" style={{ display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
                      <span>{o.items.reduce((a, i) => a + i.qty, 0)} {x.itemsLabel}</span><span style={{ color: RED }}>{fmt(o.total)}</span>
                    </div>
                  </div>

                  {/* status stepper */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 14 }}>
                    {ORDER_STATUSES.map((s, i) => (
                      <div key={s} style={{ flex: 1, display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", flex: "none", background: i <= step ? STATUS_COLOR[o.status] : "#E5DCCB" }} />
                        {i < 3 && <div style={{ flex: 1, height: 2, background: i < step ? STATUS_COLOR[o.status] : "#E5DCCB" }} />}
                      </div>
                    ))}
                  </div>

                  {next && (
                    <button onClick={() => advance(o)} style={{ cursor: "pointer", width: "100%", marginTop: 14, border: "none", background: next === "delivered" ? GREEN : RED, color: "#fff", fontWeight: 800, fontSize: 14.5, fontFamily: "inherit", padding: 13, borderRadius: 12 }}>{nextLabel} →</button>
                  )}
                  {!next && <div style={{ textAlign: "center", marginTop: 14, color: GREEN, fontWeight: 800, fontSize: 14 }}>✓ {x.done}</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 16, padding: "16px 18px" }}>
      <div className="num" style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: 26, color: RED }}>{value}</div>
      <div style={{ fontSize: 12, color: "#8A8072", fontWeight: 600, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Shell({ children, lang, setLang, superMode, onLogout }: { children: React.ReactNode; lang: string; setLang: (l: "en" | "ur") => void; superMode?: boolean; onLogout?: () => void }) {
  const ur = lang === "ur";
  const x = EXTRA[ur ? "ur" : "en"];
  return (
    <div dir={ur ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: "#F2ECE1", display: "flex", flexDirection: "column" }}>
      <header style={{ background: "#211812", color: "#fff", position: "sticky", top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Shah G Foods" style={{ height: 40, width: "auto", objectFit: "contain", display: "block", filter: LOGO_FILTER }} />
          <div style={{ fontWeight: 800, fontSize: 15 }}>{x.adminPortal}</div>
          <span style={{ fontSize: 11, fontWeight: 700, background: superMode ? "#E0A020" : "rgba(255,255,255,.15)", color: superMode ? "#211812" : "#fff", padding: "3px 9px", borderRadius: 12 }}>{superMode ? x.superAdmin : x.branchAdmin}</span>
          <div style={{ marginInlineStart: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", background: "rgba(255,255,255,.12)", borderRadius: 999, overflow: "hidden", padding: 2 }}>
              <div onClick={() => setLang("en")} className="num" style={{ cursor: "pointer", padding: "5px 10px", fontWeight: 800, fontSize: 11.5, borderRadius: 999, background: ur ? "transparent" : "#C1272D", color: "#fff" }}>EN</div>
              <div onClick={() => setLang("ur")} className="urdu" style={{ cursor: "pointer", padding: "3px 11px", fontWeight: 700, fontSize: 13, borderRadius: 999, background: ur ? "#C1272D" : "transparent", color: "#fff" }}>اردو</div>
            </div>
            {!superMode && <Link href="/admin/super" style={{ color: "rgba(255,255,255,.6)", fontSize: 12.5, fontWeight: 700, textDecoration: "none" }}>{x.superAdmin} →</Link>}
            <Link href="/" style={{ color: "rgba(255,255,255,.6)", fontSize: 12.5, fontWeight: 700, textDecoration: "none" }}>{x.viewStore}</Link>
            {onLogout && <button onClick={onLogout} style={{ cursor: "pointer", border: "none", background: "rgba(255,255,255,.15)", color: "#fff", fontWeight: 700, fontSize: 12.5, fontFamily: "inherit", padding: "7px 13px", borderRadius: 10 }}>{x.logout}</button>}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
