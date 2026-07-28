"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { FEED_POSTS, relativeTime, type FeedPost } from "@/lib/feed";
import { useWidth } from "@/components/hooks";

const RED = "#C1272D";
const PURPLE = "#5E1A86";

// round-number style like the rest of the site ("10,000+")
function likeLabel(n: number): string {
  if (n >= 1000) return `${(Math.floor(n / 100) / 10).toFixed(1).replace(".0", "")}k+`;
  return String(n);
}

function PostCard({ post, now }: { post: FeedPost; now: Date | null }) {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const count = post.likes + (liked ? 1 : 0);

  const share = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}${post.href}` : post.href;
    const shareData = { title: `${post.name} on Shah G Online`, text: post.body.slice(0, 120), url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      /* user cancelled or share unsupported — fall through to copy */
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #EAE1D2", borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 34px -28px rgba(60,30,10,.6)" }}>
      <div style={{ padding: "18px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href={post.href} style={{ flex: "none", width: 46, height: 46, borderRadius: "50%", background: post.avatarGradient, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, textDecoration: "none" }}>
          {post.avatarInitials}
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Link href={post.href} style={{ fontWeight: 800, fontSize: 15, color: "#211812", textDecoration: "none" }}>{post.name}</Link>
            <span style={{ background: "#FCF3DC", color: "#8A6A2F", fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 999, letterSpacing: ".3px", whiteSpace: "nowrap" }}>{post.badge}</span>
          </div>
          <div className="num" style={{ fontSize: 12, color: "#8A8072", marginTop: 1 }}>{now ? relativeTime(post.createdAt, now) : ""}</div>
        </div>
      </div>

      {post.img && (
        <Link href={post.href} style={{ display: "block", marginTop: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.img} alt={post.name} style={{ width: "100%", aspectRatio: "16 / 10", objectFit: "cover", display: "block" }} />
        </Link>
      )}

      <p style={{ padding: "14px 20px 4px", margin: 0, fontSize: 14.5, lineHeight: 1.75, color: "#3D362D" }}>{post.body}</p>

      <div style={{ padding: "12px 20px 0" }}>
        <Link href={post.href} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, background: "#F7F3EB", border: "1px solid #EAE1D2", color: RED, fontWeight: 800, fontSize: 13, padding: "9px 16px", borderRadius: 11 }}>
          View menu →
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "12px 20px 18px" }}>
        <button
          onClick={() => setLiked((v) => !v)}
          style={{ cursor: "pointer", border: "none", background: "transparent", display: "flex", alignItems: "center", gap: 8, padding: 0, fontFamily: "inherit" }}
        >
          <FaHeart size={18} color={liked ? RED : "#C9BEA9"} />
          <span className="num" style={{ fontSize: 13.5, fontWeight: 700, color: "#5A5245" }}>{liked ? likeLabel(count) : likeLabel(post.likes)}</span>
        </button>
        <button
          onClick={share}
          style={{ cursor: "pointer", border: "none", background: "transparent", display: "flex", alignItems: "center", gap: 8, padding: 0, fontFamily: "inherit", marginInlineStart: "auto", color: PURPLE }}
        >
          <FaShareAlt size={15} />
          <span style={{ fontSize: 13.5, fontWeight: 700 }}>{copied ? "Link copied!" : "Share"}</span>
        </button>
      </div>
    </div>
  );
}

export default function FeedContent() {
  const w = useWidth();
  const feedWidth = w >= 1024 ? 760 : w >= 640 ? 620 : 520;

  // starts null so the server-rendered markup matches the first client render —
  // the real clock only kicks in after mount, then ticks so times keep moving
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(115deg,${PURPLE} 0%,#8E1E7C 55%,#B71C66 100%)`, color: "#fff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 20px 54px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ background: "rgba(224,160,32,.95)", color: "#211812", fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 999, letterSpacing: ".6px" }}>SHAH G ONLINE FEED</div>
          <h1 style={{ fontFamily: "'DM Serif Display','Noto Nastaliq Urdu',serif", fontSize: "clamp(30px,5vw,46px)", lineHeight: 1.1, margin: 0 }}>New on Shah G Online</h1>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,.9)", margin: 0, maxWidth: 480, lineHeight: 1.7 }}>Meet the restaurants and home kitchens that just went live.</p>
        </div>
      </section>

      <div style={{ maxWidth: feedWidth, margin: "0 auto", padding: "28px 20px 60px", display: "flex", flexDirection: "column", gap: 18, transition: "max-width .2s ease" }}>
        {FEED_POSTS.map((post) => (
          <PostCard key={post.id} post={post} now={now} />
        ))}
      </div>
    </>
  );
}
