// Global route-loading skeleton: every page under app/ shows this shimmering
// placeholder (hero, chips, card grid) while its content is being fetched.

export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", background: "#F7F3EB" }}>
      {/* navbar bar */}
      <div style={{ background: "linear-gradient(90deg,#5E1A86 0%,#8E1E7C 46%,#B71C66 100%)", padding: "14px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div className="sk--dark" style={{ width: 120, height: 44, borderRadius: 10 }} />
          <div style={{ flex: 1 }} />
          {[70, 70, 70].map((w, i) => (
            <div key={i} className="sk--dark" style={{ width: w, height: 30, borderRadius: 999 }} />
          ))}
        </div>
      </div>

      {/* hero */}
      <div style={{ background: "linear-gradient(90deg,#5E1A86 0%,#8E1E7C 46%,#B71C66 100%)", padding: "44px 20px 52px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div className="sk--dark" style={{ width: 190, height: 28, borderRadius: 999 }} />
          <div className="sk--dark" style={{ width: "min(620px,90%)", height: 46 }} />
          <div className="sk--dark" style={{ width: "min(480px,75%)", height: 20 }} />
          <div className="sk--dark" style={{ width: "min(620px,100%)", height: 56, borderRadius: 18, marginTop: 10 }} />
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <div className="sk--dark" style={{ width: 160, height: 48, borderRadius: 14 }} />
            <div className="sk--dark" style={{ width: 180, height: 48, borderRadius: 14 }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "26px 20px 60px" }}>
        {/* location bar */}
        <div className="sk" style={{ height: 64, borderRadius: 16 }} />

        {/* section heading */}
        <div className="sk" style={{ width: 240, height: 28, marginTop: 30 }} />

        {/* category chips */}
        <div style={{ display: "flex", gap: 12, marginTop: 18, overflow: "hidden" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="sk" style={{ flex: "none", width: 158, height: 76, borderRadius: 18 }} />
          ))}
        </div>

        {/* card grid */}
        <div className="sk" style={{ width: 200, height: 28, marginTop: 36 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18, marginTop: 18 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 18, overflow: "hidden" }}>
              <div className="sk" style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 0 }} />
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 9 }}>
                <div className="sk" style={{ width: "75%", height: 16 }} />
                <div className="sk" style={{ width: "45%", height: 13 }} />
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <div className="sk" style={{ flex: 1, height: 34, borderRadius: 10 }} />
                  <div className="sk" style={{ flex: 1, height: 34, borderRadius: 10 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
