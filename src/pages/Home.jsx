import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// ── Brand System ──
const C = {
  accent: "#20C9B0",
  indigo: "#6383FF",
  amber: "#FF9F43",
  slate: "#1A1D2B",
  body: "#4A5068",
  muted: "#8B92AD",
  light: "#B0B7CF",
  border: "#E8EAF0",
  pageBg: "#FAFBFE",
  codeBg: "#F4F5FA",
  darkBg: "#0c0f1a",
  darkBg2: "#111528",
};

// ── Animated Logo ──
const PRODUCTS = ["optimize", "govern", "ops"];
const PRODUCT_COLORS = [C.accent, C.indigo, C.amber];

function AnimatedLogo({ size = 32, light = false }) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(true);
  const [blink, setBlink] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    if (paused) {
      const id = setInterval(() => setBlink(v => !v), 480);
      return () => clearInterval(id);
    }
    setBlink(true);
  }, [paused]);

  useEffect(() => {
    const word = PRODUCTS[wordIdx];
    if (!deleting) {
      if (text.length < word.length) {
        setPaused(false);
        timer.current = setTimeout(() => setText(word.slice(0, text.length + 1)), 105);
      } else {
        setPaused(true);
        timer.current = setTimeout(() => { setPaused(false); setDeleting(true); }, 2200);
      }
    } else {
      if (text.length > 0) {
        timer.current = setTimeout(() => setText(text.slice(0, -1)), 55);
      } else {
        setPaused(true);
        setDeleting(false);
        timer.current = setTimeout(() => { setPaused(false); setWordIdx((wordIdx + 1) % PRODUCTS.length); }, 400);
      }
    }
    return () => clearTimeout(timer.current);
  }, [text, deleting, wordIdx]);

  const color = PRODUCT_COLORS[wordIdx];
  const baseColor = light ? "#fff" : C.slate;

  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", whiteSpace: "nowrap" }}>
      <span style={{ fontSize: size, fontWeight: 700, color: baseColor, letterSpacing: "-0.04em" }}>synta</span>
      <span style={{
        display: "inline-block",
        width: size * 0.22, height: size * 0.22,
        borderRadius: "50%",
        background: blink ? color : "transparent",
        transition: "background 0.05s step-end",
        boxShadow: blink ? `0 0 ${size * 0.3}px ${color}50` : "none",
        marginLeft: size * 0.06, marginBottom: size * 0.06,
      }} />
      {text && (
        <span style={{
          fontSize: size, fontWeight: 300, color,
          letterSpacing: "-0.025em", marginLeft: size * 0.05,
        }}>{text}</span>
      )}
    </span>
  );
}

// ── Scroll-triggered fade-in ──
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Product Card ──
function ProductCard({ name, tagline, features, color, colorSoft, icon, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "36px 32px",
          border: `1.5px solid ${hovered ? color : C.border}`,
          boxShadow: hovered ? `0 8px 32px ${color}15` : "0 1px 4px rgba(0,0,0,0.03)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: color, opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }} />

        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: colorSoft,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon} />
          </svg>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.slate, letterSpacing: "-0.02em" }}>synta</span>
          <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: color, marginLeft: 1.5, marginBottom: 1 }} />
          <span style={{ fontSize: 13, fontWeight: 400, color, marginLeft: 2 }}>{name}</span>
        </div>

        <h3 style={{
          fontFamily: "'Newsreader', serif", fontSize: 22, fontWeight: 600,
          color: C.slate, marginBottom: 12, letterSpacing: "-0.02em",
        }}>{tagline}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: 14, color: C.body }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 20, display: "flex", alignItems: "center", gap: 6,
          fontSize: 13, fontWeight: 600, color,
        }}>
          Learn more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.2s ease" }}>
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </FadeIn>
  );
}

// ── Blog Card ──
function BlogCard({ title, excerpt, tag, tagColor, readTime, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff", borderRadius: 20, overflow: "hidden",
          border: `1.5px solid ${hovered ? C.border : C.border}`,
          boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.06)" : "0 1px 4px rgba(0,0,0,0.03)",
          transition: "all 0.3s ease", cursor: "pointer",
        }}
      >
        {/* Preview header */}
        <div style={{
          height: 160, background: `linear-gradient(135deg, ${C.darkBg}, ${C.darkBg2})`,
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.03,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }} />
          <div style={{
            position: "absolute", top: -40, right: -20, width: 160, height: 160,
            borderRadius: "50%", background: `radial-gradient(circle, ${tagColor}10 0%, transparent 60%)`,
          }} />
          <span style={{
            position: "relative", zIndex: 1,
            display: "flex", alignItems: "baseline",
          }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#EDEEF2", letterSpacing: "-0.04em" }}>synta</span>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: tagColor, marginLeft: 2, marginBottom: 2, boxShadow: `0 0 6px ${tagColor}50` }} />
          </span>
        </div>

        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 12,
            background: `${tagColor}0a`, border: `1px solid ${tagColor}20`,
            marginBottom: 14,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: tagColor }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: tagColor }}>{tag}</span>
          </div>

          <h3 style={{
            fontFamily: "'Newsreader', serif", fontSize: 20, fontWeight: 600,
            color: C.slate, lineHeight: 1.3, marginBottom: 10, letterSpacing: "-0.02em",
          }}>{title}</h3>

          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>{excerpt}</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.light }}>{readTime} min read</span>
            <span style={{
              fontSize: 13, fontWeight: 600, color: tagColor,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              Read article
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s ease" }}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ── Stat Counter ──
function StatCounter({ value, label, suffix = "" }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Newsreader', serif", fontSize: 44, fontWeight: 600,
        color: "#fff", letterSpacing: "-0.03em",
      }}>{value}{suffix}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
//  MAIN WEBSITE
// ══════════════════════════════════════════════════════
export default function SyntaWebsite() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: C.body, background: C.pageBg,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(32,201,176,0.15); }
        a { text-decoration: none; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* ═══════════════ NAV ═══════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(12,15,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
        padding: "0 48px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <AnimatedLogo size={22} light />

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {["Products", "Blog", "About"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.65)",
              padding: "8px 16px", borderRadius: 8,
              transition: "color 0.2s",
            }}>{item}</a>
          ))}
          <a href="#assessment" style={{
            fontSize: 14, fontWeight: 600, color: "#fff",
            padding: "9px 22px", borderRadius: 10, marginLeft: 8,
            background: C.accent, boxShadow: `0 2px 12px ${C.accent}30`,
            transition: "box-shadow 0.2s",
          }}>Free Assessment</a>
        </div>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(165deg, ${C.darkBg} 0%, ${C.darkBg2} 50%, #0d1020 100%)`,
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "120px 48px 80px",
      }}>
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }} />

        {/* Orbs */}
        <div style={{
          position: "absolute", top: "10%", right: "5%", width: 500, height: 500,
          borderRadius: "50%", background: `radial-gradient(circle, ${C.accent}08 0%, transparent 60%)`,
          animation: "float 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "15%", width: 400, height: 400,
          borderRadius: "50%", background: `radial-gradient(circle, ${C.indigo}06 0%, transparent 60%)`,
          animation: "float 10s ease-in-out infinite 2s",
        }} />

        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${C.accent}, ${C.indigo}, ${C.accent})`,
        }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 820 }}>
          {/* Badge */}
          <FadeIn>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 18px", borderRadius: 24,
              background: "rgba(32,201,176,0.08)", border: "1px solid rgba(32,201,176,0.18)",
              marginBottom: 32,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, boxShadow: `0 0 6px ${C.accent}60` }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.accent, letterSpacing: "0.04em" }}>
                Microsoft Cloud Intelligence
              </span>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={100}>
            <h1 style={{
              fontFamily: "'Newsreader', serif", fontSize: 58, fontWeight: 600,
              color: "#EDEEF2", lineHeight: 1.15, letterSpacing: "-0.03em",
              marginBottom: 20,
            }}>
              Stop overspending on M365.
              <br />
              <span style={{ color: C.accent }}>Start governing your Azure estate.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p style={{
              fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
              maxWidth: 560, margin: "0 auto 36px",
            }}>
              Synta is an IT operations intelligence platform that eliminates M365 licence waste,
              unifies Azure governance, and automates infrastructure operations.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={300}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 64 }}>
              <a href="#assessment" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "15px 32px", borderRadius: 12,
                background: C.accent, color: "#fff",
                fontSize: 15, fontWeight: 600,
                boxShadow: `0 4px 20px ${C.accent}35`,
              }}>
                Start Free Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#products" style={{
                display: "inline-flex", alignItems: "center",
                padding: "15px 32px", borderRadius: 12,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: 500,
              }}>View Platform</a>
            </div>
          </FadeIn>

          {/* Product pills */}
          <FadeIn delay={400}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              {[
                { name: "optimize", label: "License Intelligence", color: C.accent },
                { name: "govern", label: "Cloud Governance", color: C.indigo },
                { name: "ops", label: "IT Operations", color: C.amber },
              ].map(p => (
                <div key={p.name} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 20px", borderRadius: 12,
                  background: `${p.color}08`, border: `1px solid ${p.color}18`,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, boxShadow: `0 0 6px ${p.color}40` }} />
                  <span style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>synta</span>
                    <span style={{ display: "inline-block", width: 3.5, height: 3.5, borderRadius: "50%", background: p.color }} />
                    <span style={{ fontSize: 13, fontWeight: 400, color: p.color }}>{p.name}</span>
                  </span>
                  <span style={{ fontSize: 11, color: `${p.color}88`, marginLeft: 4 }}>{p.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ STATS STRIP ═══════════════ */}
      <section style={{
        background: `linear-gradient(135deg, #141722, #1a1f35)`,
        padding: "48px 48px",
        display: "flex", justifyContent: "center", gap: 80,
      }}>
        <StatCounter value="15-25" suffix="%" label="Average M365 licence waste" />
        <StatCounter value="62" label="Subscriptions governed" />
        <StatCounter value="156" suffix="K" label="Annual savings identified" />
        <StatCounter value="20" suffix=" min" label="Time to first insight" />
      </section>

      {/* ═══════════════ PRODUCTS ═══════════════ */}
      <section id="products" style={{
        maxWidth: 1120, margin: "0 auto",
        padding: "96px 24px 80px",
      }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{
              fontSize: 12, fontWeight: 700, color: C.accent,
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>Platform</span>
            <h2 style={{
              fontFamily: "'Newsreader', serif", fontSize: 38, fontWeight: 600,
              color: C.slate, marginTop: 8, letterSpacing: "-0.025em",
            }}>Three products. One platform.</h2>
            <p style={{ fontSize: 16, color: C.muted, marginTop: 10, maxWidth: 520, margin: "10px auto 0" }}>
              Each product works standalone. Together they give you complete visibility across your Microsoft estate.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          <ProductCard
            name="optimize"
            tagline="M365 licence intelligence that pays for itself"
            color={C.accent}
            colorSoft="rgba(32,201,176,0.07)"
            icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            features={[
              "Identify wasted and duplicate licences",
              "E5 feature usage analysis and downgrades",
              "Disabled account licence recovery",
              "Month-over-month savings tracking",
            ]}
            delay={0}
          />
          <ProductCard
            name="govern"
            tagline="Your entire Azure estate, scored and ranked"
            color={C.indigo}
            colorSoft="rgba(99,131,255,0.07)"
            icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            features={[
              "Subscription health scoring (A-F)",
              "FinOps cost tracking and trends",
              "Policy compliance monitoring",
              "Remediation lifecycle tracking",
            ]}
            delay={100}
          />
          <ProductCard
            name="ops"
            tagline="Infrastructure automation and monitoring"
            color={C.amber}
            colorSoft="rgba(255,159,67,0.07)"
            icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            features={[
              "Certificate lifecycle management",
              "Multi-cloud network monitoring",
              "Identity automation (JML)",
              "Service management integration",
            ]}
            delay={200}
          />
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF STRIP ═══════════════ */}
      <section style={{
        background: "#fff", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
        padding: "48px 48px",
        display: "flex", justifyContent: "center", alignItems: "center", gap: 48,
      }}>
        <FadeIn>
          <div style={{
            display: "flex", alignItems: "center", gap: 48,
            fontSize: 14, color: C.muted,
          }}>
            <span style={{ fontWeight: 600, color: C.slate }}>Built for</span>
            {["Mid-market organisations", "50-5,000 Azure subscriptions", "500-10,000 M365 users"].map((t, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════ BLOG ═══════════════ */}
      <section id="blog" style={{
        maxWidth: 1120, margin: "0 auto",
        padding: "96px 24px 80px",
      }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{
              fontSize: 12, fontWeight: 700, color: C.indigo,
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>Insights</span>
            <h2 style={{
              fontFamily: "'Newsreader', serif", fontSize: 38, fontWeight: 600,
              color: C.slate, marginTop: 8, letterSpacing: "-0.025em",
            }}>From the blog</h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <Link to="/blog/m365-licence-waste" style={{ textDecoration: "none" }}>
          <BlogCard
            title="Your Organisation Is Wasting Up to 25% on Microsoft 365 Licences"
            excerpt="Most companies don't know it. The ones that do lack the tooling to fix it. Here's what's actually happening inside your M365 tenant and how to recover tens of thousands in annual savings."
            tag="M365 Optimization"
            tagColor={C.accent}
            readTime={6}
            delay={0}
          />
          </Link>
          <Link to="/blog/azure-governance" style={{ textDecoration: "none" }}>
          <BlogCard
            title="Nobody Has a Single Pane of Glass for Azure Estate Governance"
            excerpt="Azure gives you the data. Defender gives you security scores. Cost Management gives you bills. But nowhere can you see your entire estate's health in one view."
            tag="Azure Governance"
            tagColor={C.indigo}
            readTime={8}
            delay={100}
          />
          </Link>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section id="assessment" style={{
        maxWidth: 1120, margin: "0 auto", padding: "0 24px 96px",
      }}>
        <FadeIn>
          <div style={{
            background: `linear-gradient(135deg, ${C.darkBg}, ${C.darkBg2})`,
            borderRadius: 28, padding: "72px 64px", textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0, opacity: 0.02,
              backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }} />
            <div style={{
              position: "absolute", top: -60, right: -30, width: 250, height: 250,
              borderRadius: "50%", background: `radial-gradient(circle, ${C.accent}08 0%, transparent 60%)`,
            }} />
            <div style={{
              position: "absolute", bottom: -80, left: -20, width: 200, height: 200,
              borderRadius: "50%", background: `radial-gradient(circle, ${C.indigo}06 0%, transparent 60%)`,
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{
                fontFamily: "'Newsreader', serif", fontSize: 36, fontWeight: 600,
                color: "#EDEEF2", marginBottom: 14, letterSpacing: "-0.025em",
              }}>
                See what your Microsoft estate is really costing you
              </h2>
              <p style={{
                fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
                maxWidth: 500, margin: "0 auto 32px",
              }}>
                We'll run a free assessment on your M365 and Azure environment.
                No commitment. No sales pitch. Just a clear report with exact savings.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
                <a href="#" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "15px 32px", borderRadius: 12,
                  background: C.accent, color: "#fff",
                  fontSize: 15, fontWeight: 600,
                  boxShadow: `0 4px 20px ${C.accent}30`,
                }}>
                  Book Free Assessment
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a href="mailto:hello@synta.io" style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "15px 32px", borderRadius: 12,
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)", fontSize: 15, fontWeight: 500,
                }}>hello@synta.io</a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{
        borderTop: `1px solid ${C.border}`, padding: "40px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        maxWidth: 1120, margin: "0 auto",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: C.slate, letterSpacing: "-0.04em" }}>synta</span>
            <span style={{ display: "inline-block", width: 4.5, height: 4.5, borderRadius: "50%", background: C.accent, marginLeft: 2, marginBottom: 1.5 }} />
          </div>
          <p style={{ fontSize: 13, color: C.muted, maxWidth: 280, lineHeight: 1.6 }}>
            IT Operations Intelligence for Microsoft environments. Based in London, working with clients across the UK.
          </p>
          <p style={{ fontSize: 12, color: C.light, marginTop: 16 }}>2026 Synta Ltd. All rights reserved.</p>
        </div>

        <div style={{ display: "flex", gap: 56 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.slate, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Platform</div>
            {[
              { name: "synta.optimize", color: C.accent },
              { name: "synta.govern", color: C.indigo },
              { name: "synta.ops", color: C.amber },
            ].map(p => (
              <a key={p.name} href="#" style={{ display: "block", fontSize: 13, color: C.muted, marginBottom: 8 }}>{p.name}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.slate, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Resources</div>
            {["Blog", "Free Assessment", "Contact"].map(item => (
              <a key={item} href="#" style={{ display: "block", fontSize: 13, color: C.muted, marginBottom: 8 }}>{item}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.slate, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Connect</div>
            {["LinkedIn", "Email"].map(item => (
              <a key={item} href="#" style={{ display: "block", fontSize: 13, color: C.muted, marginBottom: 8 }}>{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
