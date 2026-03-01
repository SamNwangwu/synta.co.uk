import { Link } from "react-router-dom";
import { useState } from "react";

const T = {
  accent: "#20C9B0",
  accentSoft: "rgba(32,201,176,0.07)",
  accentMid: "rgba(32,201,176,0.14)",
  accentBorder: "rgba(32,201,176,0.18)",
  indigo: "#6383FF",
  indigoSoft: "rgba(99,131,255,0.07)",
  indigoBorder: "rgba(99,131,255,0.15)",
  indigoMid: "rgba(99,131,255,0.25)",
  amber: "#FF9F43",
  amberSoft: "rgba(255,159,67,0.07)",
  red: "#EF5F5F",
  redSoft: "rgba(239,95,95,0.06)",
  slate: "#1A1D2B",
  body: "#4A5068",
  muted: "#8B92AD",
  light: "#B0B7CF",
  border: "#E8EAF0",
  pageBg: "#FAFBFE",
  codeBg: "#F4F5FA",
};

/* ════════════════════════════════════════════════════════
   DIAGRAM 1 — Governance Hub Wheel
   Central hub with synta logo, 5 governance pillars as
   segments around it, dashed connectors to outcome nodes
   Syskit-style: bold, circular, labelled, clean
   ════════════════════════════════════════════════════════ */
const GovernanceHubDiagram = () => {
  // Segment positions (evenly around the circle)
  const segments = [
    { label: "SECURE\nSCORING", angle: -90 },
    { label: "COST\nMONITORING", angle: -18 },
    { label: "POLICY\nCOMPLIANCE", angle: 54 },
    { label: "REMEDIATION\nTRACKING", angle: 126 },
    { label: "ESTATE\nRANKING", angle: 198 },
  ];

  // Outcome nodes
  const outcomes = [
    { label: "VISIBILITY", x: 600, y: 60, icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
    { label: "CONTROL", x: 600, y: 160, icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
    { label: "SAVINGS", x: 600, y: 260, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  const cx = 250, cy = 165, outerR = 120, innerR = 55;

  return (
    <svg viewBox="0 0 680 330" fill="none" style={{ width: "100%" }}>
      {/* ── Outer ring segments ── */}
      {segments.map((seg, i) => {
        const startAngle = (i * 72 - 90) * Math.PI / 180;
        const endAngle = ((i + 1) * 72 - 90) * Math.PI / 180;
        const midAngle = ((i * 72 + 36) - 90) * Math.PI / 180;
        const gap = 0.04; // gap between segments

        const x1o = cx + outerR * Math.cos(startAngle + gap);
        const y1o = cy + outerR * Math.sin(startAngle + gap);
        const x2o = cx + outerR * Math.cos(endAngle - gap);
        const y2o = cy + outerR * Math.sin(endAngle - gap);
        const x1i = cx + (innerR + 8) * Math.cos(endAngle - gap);
        const y1i = cy + (innerR + 8) * Math.sin(endAngle - gap);
        const x2i = cx + (innerR + 8) * Math.cos(startAngle + gap);
        const y2i = cy + (innerR + 8) * Math.sin(startAngle + gap);

        // Label position
        const labelR = (outerR + innerR + 8) / 2;
        const lx = cx + labelR * Math.cos(midAngle);
        const ly = cy + labelR * Math.sin(midAngle);

        return (
          <g key={i}>
            <path
              d={`M${x1o},${y1o} A${outerR},${outerR} 0 0,1 ${x2o},${y2o} L${x1i},${y1i} A${innerR + 8},${innerR + 8} 0 0,0 ${x2i},${y2i} Z`}
              fill={T.indigo}
              opacity={0.85 - i * 0.05}
            />
            {seg.label.split("\n").map((line, li) => (
              <text key={li} x={lx} y={ly + (li - 0.5) * 12} textAnchor="middle"
                fontSize="8" fontWeight="800" fill="#fff" letterSpacing="0.05em"
                fontFamily="'Source Sans 3', sans-serif"
              >{line}</text>
            ))}
          </g>
        );
      })}

      {/* ── Inner circle with logo ── */}
      <circle cx={cx} cy={cy} r={innerR} fill="#fff" stroke={T.indigo} strokeWidth="2" />
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="16" fontWeight="700" fill={T.slate}
        fontFamily="'Source Sans 3', sans-serif" letterSpacing="-0.03em">synta</text>
      <circle cx={cx + 26} cy={cy - 13} r="2.5" fill={T.accent} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fontWeight="600" fill={T.indigo}
        fontFamily="'Source Sans 3', sans-serif" letterSpacing="0.12em">GOVERN</text>

      {/* ── Dashed connector path from hub to outcomes ── */}
      <path d={`M${cx + outerR + 10},${cy - 40} C${cx + outerR + 60},${cy - 60} 520,60 560,60`}
        stroke={T.accent} strokeWidth="2" strokeDasharray="6 4" fill="none" />
      <path d={`M${cx + outerR + 10},${cy} C${cx + outerR + 80},${cy} 520,160 560,160`}
        stroke={T.accent} strokeWidth="2" strokeDasharray="6 4" fill="none" />
      <path d={`M${cx + outerR + 10},${cy + 40} C${cx + outerR + 60},${cy + 60} 520,260 560,260`}
        stroke={T.accent} strokeWidth="2" strokeDasharray="6 4" fill="none" />

      {/* ── Outcome nodes ── */}
      {outcomes.map((o, i) => (
        <g key={i}>
          <circle cx={o.x + 28} cy={o.y} r="32" fill={T.accent} />
          <svg x={o.x + 14} y={o.y - 14} width="28" height="28" viewBox="0 0 24 24">
            <path d={o.icon} fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <text x={o.x + 28} y={o.y + 48} textAnchor="middle" fontSize="9" fontWeight="800"
            fill={T.accent} letterSpacing="0.12em" fontFamily="'Source Sans 3', sans-serif"
          >{o.label}</text>
        </g>
      ))}
    </svg>
  );
};


/* ════════════════════════════════════════════════════════
   DIAGRAM 2 — Subscription Health Scoring
   Horizontal subscriptions with score bars and ratings
   ════════════════════════════════════════════════════════ */
const SubscriptionScoring = () => {
  const subs = [
    { name: "Production-Corp", score: 87, grade: "A", policies: 42, compliant: 39 },
    { name: "Production-AVD", score: 74, grade: "B", policies: 38, compliant: 30 },
    { name: "Development", score: 61, grade: "C", policies: 35, compliant: 22 },
    { name: "Sandbox-Testing", score: 43, grade: "D", policies: 30, compliant: 13 },
    { name: "Legacy-Migration", score: 28, grade: "F", policies: 28, compliant: 8 },
  ];

  const gradeColor = (g) => {
    if (g === "A") return T.accent;
    if (g === "B") return "#5BBEAF";
    if (g === "C") return T.amber;
    if (g === "D") return "#E8875B";
    return T.red;
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 16, border: `1px solid ${T.border}`,
      overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
    }}>
      {/* Header */}
      <div style={{
        display: "grid", gridTemplateColumns: "1.8fr 0.5fr 2fr 0.8fr",
        padding: "14px 28px", background: T.codeBg, borderBottom: `1px solid ${T.border}`,
        alignItems: "center",
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Subscription</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>Grade</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Health Score</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "right" }}>Policies</span>
      </div>

      {subs.map((sub, i) => {
        const gc = gradeColor(sub.grade);
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1.8fr 0.5fr 2fr 0.8fr",
            padding: "16px 28px", borderBottom: i < subs.length - 1 ? `1px solid ${T.codeBg}` : "none",
            alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.slate }}>{sub.name}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: `${gc}15`, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: gc,
              }}>{sub.grade}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 8, borderRadius: 4, background: T.codeBg, overflow: "hidden" }}>
                <div style={{ width: `${sub.score}%`, height: "100%", borderRadius: 4, background: `linear-gradient(90deg, ${gc}bb, ${gc})` }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: gc, width: 36, textAlign: "right" }}>{sub.score}</span>
            </div>
            <div style={{ textAlign: "right", fontSize: 13, color: T.body }}>
              <span style={{ fontWeight: 600, color: T.slate }}>{sub.compliant}</span>
              <span style={{ color: T.muted }}> / {sub.policies}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};


/* ════════════════════════════════════════════════════════
   DIAGRAM 3 — Remediation Lifecycle
   Circular flow: Detect → Prioritise → Assign → Remediate → Verify
   Syskit-style with dashed circular path and nodes
   ════════════════════════════════════════════════════════ */
const RemediationCycleDiagram = () => {
  const steps = [
    { label: "DETECT", desc: "Automated scan\nfinds issues", angle: -90 },
    { label: "PRIORITISE", desc: "AI scores by\nrisk and impact", angle: -18 },
    { label: "ASSIGN", desc: "Route to team\nor individual", angle: 54 },
    { label: "REMEDIATE", desc: "Track fix with\nSLA timeline", angle: 126 },
    { label: "VERIFY", desc: "Confirm resolution\nin next scan", angle: 198 },
  ];

  const cx = 240, cy = 170, R = 110;

  return (
    <svg viewBox="0 0 480 340" fill="none" style={{ width: "100%", maxWidth: 480 }}>
      {/* Dashed circle path */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={T.indigo} strokeWidth="2" strokeDasharray="8 5" opacity="0.3" />

      {/* Direction arrows on the path */}
      {[0, 1, 2, 3, 4].map(i => {
        const a = ((i * 72 + 36) - 90) * Math.PI / 180;
        const ax = cx + R * Math.cos(a);
        const ay = cy + R * Math.sin(a);
        const a2 = a + 0.15;
        const tx = cx + R * Math.cos(a2);
        const ty = cy + R * Math.sin(a2);
        return (
          <polygon key={i}
            points={`${tx - 4},${ty - 4} ${tx + 4},${ty} ${tx - 4},${ty + 4}`}
            fill={T.indigo} opacity="0.35"
            transform={`rotate(${i * 72 + 36}, ${tx}, ${ty})`}
          />
        );
      })}

      {/* Step nodes */}
      {steps.map((step, i) => {
        const a = (step.angle) * Math.PI / 180;
        const nx = cx + R * Math.cos(a);
        const ny = cy + R * Math.sin(a);
        // Label offset - push labels outward
        const lx = cx + (R + 58) * Math.cos(a);
        const ly = cy + (R + 58) * Math.sin(a);

        return (
          <g key={i}>
            {/* Node circle */}
            <circle cx={nx} cy={ny} r="22" fill={T.indigo} />
            <text x={nx} y={ny + 1} textAnchor="middle" dominantBaseline="middle"
              fontSize="17" fontWeight="700" fill="#fff" fontFamily="'Source Sans 3', sans-serif"
            >{i + 1}</text>

            {/* Label */}
            <text x={lx} y={ly - 6} textAnchor="middle"
              fontSize="9" fontWeight="800" fill={T.indigo} letterSpacing="0.1em"
              fontFamily="'Source Sans 3', sans-serif"
            >{step.label}</text>
            {step.desc.split("\n").map((line, li) => (
              <text key={li} x={lx} y={ly + 8 + li * 12} textAnchor="middle"
                fontSize="9" fill={T.muted} fontFamily="'Source Sans 3', sans-serif"
              >{line}</text>
            ))}
          </g>
        );
      })}

      {/* Center label */}
      <circle cx={cx} cy={cy} r="36" fill="#fff" stroke={T.indigo} strokeWidth="1.5" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="8" fontWeight="800" fill={T.indigo}
        letterSpacing="0.12em" fontFamily="'Source Sans 3', sans-serif">CONTINUOUS</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fontWeight="800" fill={T.indigo}
        letterSpacing="0.12em" fontFamily="'Source Sans 3', sans-serif">GOVERNANCE</text>
    </svg>
  );
};


/* ════════════════════════════════════════════════════════
   DIAGRAM 4 — Market Gap Positioning
   Shows where Synta fits between native tools and enterprise
   ════════════════════════════════════════════════════════ */
const MarketGapDiagram = () => (
  <svg viewBox="0 0 680 260" fill="none" style={{ width: "100%" }}>
    {/* Axis */}
    <line x1="60" y1="220" x2="640" y2="220" stroke={T.border} strokeWidth="1.5" />
    <line x1="60" y1="220" x2="60" y2="30" stroke={T.border} strokeWidth="1.5" />

    {/* Y-axis label */}
    <text x="20" y="125" textAnchor="middle" fontSize="9" fontWeight="700" fill={T.muted}
      fontFamily="'Source Sans 3', sans-serif" letterSpacing="0.1em"
      transform="rotate(-90, 20, 125)">GOVERNANCE DEPTH</text>

    {/* X-axis label */}
    <text x="350" y="252" textAnchor="middle" fontSize="9" fontWeight="700" fill={T.muted}
      fontFamily="'Source Sans 3', sans-serif" letterSpacing="0.1em">ANNUAL COST</text>

    {/* X-axis ticks */}
    <text x="120" y="238" textAnchor="middle" fontSize="8" fill={T.light} fontFamily="'Source Sans 3', sans-serif">Free</text>
    <text x="280" y="238" textAnchor="middle" fontSize="8" fill={T.light} fontFamily="'Source Sans 3', sans-serif">£10K</text>
    <text x="420" y="238" textAnchor="middle" fontSize="8" fill={T.light} fontFamily="'Source Sans 3', sans-serif">£50K</text>
    <text x="580" y="238" textAnchor="middle" fontSize="8" fill={T.light} fontFamily="'Source Sans 3', sans-serif">£200K+</text>

    {/* Native tools zone */}
    <rect x="80" y="130" width="140" height="80" rx="12" fill={T.codeBg} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
    <text x="150" y="158" textAnchor="middle" fontSize="9" fontWeight="700" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Azure Advisor</text>
    <text x="150" y="172" textAnchor="middle" fontSize="9" fontWeight="700" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Cost Management</text>
    <text x="150" y="186" textAnchor="middle" fontSize="9" fontWeight="700" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Azure Policy</text>
    <text x="150" y="200" textAnchor="middle" fontSize="8" fill={T.light} fontFamily="'Source Sans 3', sans-serif">(Fragmented)</text>

    {/* Enterprise zone */}
    <rect x="440" y="48" width="180" height="80" rx="12" fill={T.codeBg} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
    <text x="530" y="76" textAnchor="middle" fontSize="9" fontWeight="700" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Wiz / Prisma Cloud</text>
    <text x="530" y="90" textAnchor="middle" fontSize="9" fontWeight="700" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Orca Security</text>
    <text x="530" y="104" textAnchor="middle" fontSize="9" fontWeight="700" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">CloudGuard</text>
    <text x="530" y="118" textAnchor="middle" fontSize="8" fill={T.light} fontFamily="'Source Sans 3', sans-serif">(Enterprise CSPM)</text>

    {/* THE GAP — highlighted zone */}
    <rect x="240" y="55" width="170" height="110" rx="16" fill={T.accentSoft} stroke={T.accent} strokeWidth="2" strokeDasharray="0" />

    {/* Synta dot */}
    <circle cx="325" cy="105" r="24" fill={T.accent} />
    <text x="325" y="101" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="'Source Sans 3', sans-serif">synta</text>
    <circle cx="350" cy="96" r="2" fill="#fff" />
    <text x="325" y="114" textAnchor="middle" fontSize="7" fontWeight="600" fill="#fff" letterSpacing="0.08em" fontFamily="'Source Sans 3', sans-serif">GOVERN</text>

    {/* Gap label */}
    <text x="325" y="74" textAnchor="middle" fontSize="9" fontWeight="800" fill={T.accent} letterSpacing="0.1em" fontFamily="'Source Sans 3', sans-serif">MID-MARKET GAP</text>

    {/* Price label for synta */}
    <text x="325" y="152" textAnchor="middle" fontSize="9" fontWeight="600" fill={T.accent} fontFamily="'Source Sans 3', sans-serif">£24-36K/year</text>

    {/* Arrows showing the gap */}
    <path d="M225,170 C235,145 240,135 240,110" stroke={T.accent} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
    <path d="M435,100 C420,105 415,105 410,105" stroke={T.accent} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
  </svg>
);

const StatCard = ({ value, label, sub, color = T.accent }) => (
  <div style={{
    background: "#fff", borderRadius: 16, padding: "28px 24px", textAlign: "center",
    border: `1px solid ${T.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
  }}>
    <div style={{ fontFamily: "'Newsreader', serif", fontSize: 36, fontWeight: 600, color, letterSpacing: "-0.02em" }}>{value}</div>
    <div style={{ fontSize: 14, fontWeight: 600, color: T.slate, marginTop: 6 }}>{label}</div>
    <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{sub}</div>
  </div>
);


/* ════════════════════════════════════════════════════════
   MAIN BLOG
   ════════════════════════════════════════════════════════ */
export default function SyntaGovernBlog() {
  return (
    <div style={{
      background: T.pageBg, minHeight: "100vh",
      fontFamily: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
      color: T.body,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${T.indigoSoft}; }
      `}</style>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,251,254,0.88)", backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${T.border}`, padding: "0 48px",
        height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: T.slate, letterSpacing: "-0.03em" }}>synta</span>
            <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: T.indigo, marginLeft: 1.5, marginBottom: 1.5, boxShadow: `0 0 4px ${T.indigo}50` }} />
            <span style={{ fontSize: 18, fontWeight: 400, color: T.indigo, marginLeft: 2 }}>govern</span>
          </div>
          <span style={{ fontSize: 12, color: T.light, fontWeight: 500 }}>Blog</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Link to="/" style={{ fontSize: 13, fontWeight: 500, color: T.body, textDecoration: "none", padding: "7px 14px", borderRadius: 8 }}>Home</Link>
          <a href="#" style={{ fontSize: 13, fontWeight: 500, color: T.body, textDecoration: "none", padding: "7px 14px", borderRadius: 8 }}>Pricing</a>
          <a href="#" style={{
            fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none",
            padding: "8px 20px", borderRadius: 10, background: T.indigo,
            boxShadow: `0 2px 8px ${T.indigo}30`,
          }}>Get Free Health Check</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header style={{ maxWidth: 780, margin: "0 auto", padding: "80px 24px 56px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 20, background: T.indigoSoft,
          border: `1px solid ${T.indigoBorder}`, marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.indigo }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: T.indigo }}>Azure Governance</span>
        </div>

        <h1 style={{
          fontFamily: "'Newsreader', serif", fontSize: 46, fontWeight: 600,
          color: T.slate, lineHeight: 1.2, letterSpacing: "-0.025em",
          maxWidth: 660, margin: "0 auto 20px",
        }}>
          Nobody Has a Single Pane of Glass for Azure Estate Governance
        </h1>

        <p style={{
          fontSize: 17.5, color: T.muted, lineHeight: 1.7,
          maxWidth: 540, margin: "0 auto 36px",
        }}>
          Azure gives you the data. Defender gives you security scores. Cost Management gives you bills.
          But nowhere can you see your entire estate's health, ranked and tracked, in one view.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: T.light }}>8 min read</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: T.border }} />
          <span style={{ fontSize: 13, color: T.light }}>March 2026</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: T.border }} />
          <span style={{ fontSize: 13, color: T.light }}>Synta Engineering</span>
        </div>
      </header>

      {/* ── Article ── */}
      <article style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 96px" }}>

        {/* Hub Diagram */}
        <div style={{
          background: "#fff", borderRadius: 20, padding: "36px 28px 20px", marginBottom: 56,
          border: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
        }}>
          <GovernanceHubDiagram />
        </div>

        {/* Problem */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 16, letterSpacing: "-0.02em" }}>
            The fragmentation problem
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 16 }}>
            Ask any Azure administrator how healthy their estate is and you'll get one of two answers: a vague "pretty good, I think" or a 30-minute explanation of which portals they need to check. Neither is acceptable when you're managing 50+ subscriptions and the CFO wants a governance report by Friday.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 16 }}>
            The tools exist in isolation. Azure Defender for Cloud gives you secure scores per subscription, but can't rank your estate or track remediation over time. Azure Policy shows compliance, but doesn't correlate with cost impact. Cost Management shows spend, but doesn't know which subscriptions are well-governed and which are drifting.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.8 }}>
            The result is a governance blind spot. IT leaders make decisions based on fragmented data, and problems compound until they surface as audit findings, security incidents, or surprise bills.
          </p>
        </section>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 56 }}>
          <StatCard value="62" label="Subscriptions scanned" sub="Across 3 management groups" color={T.indigo} />
          <StatCard value="73%" label="Average health score" sub="27% remediation opportunity" color={T.amber} />
          <StatCard value="< 15 min" label="Estate-wide assessment" sub="Via read-only service principal" color={T.accent} />
        </div>

        {/* What Synta Govern Does */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 8, letterSpacing: "-0.02em" }}>
            What a unified governance view looks like
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 28 }}>
            Synta Govern pulls data from Azure Resource Graph, Defender for Cloud, Cost Management, and Azure Policy into a single scored dashboard. Every subscription gets a health grade based on security posture, policy compliance, cost efficiency, and resource hygiene.
          </p>
          <SubscriptionScoring />
        </section>

        {/* Remediation */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 8, letterSpacing: "-0.02em" }}>
            From findings to fixes: the remediation lifecycle
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 28 }}>
            Visibility without action is just a prettier dashboard. Synta Govern closes the loop with a continuous remediation cycle that tracks every finding from detection through to verified resolution.
          </p>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "28px 20px", marginBottom: 16,
            border: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
            display: "flex", justifyContent: "center",
          }}>
            <RemediationCycleDiagram />
          </div>
        </section>

        {/* Callout */}
        <div style={{
          background: T.indigoSoft, borderRadius: 16, padding: "28px 32px",
          borderLeft: `4px solid ${T.indigo}`, marginBottom: 56,
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: T.slate, fontWeight: 500, fontStyle: "italic", fontFamily: "'Newsreader', serif" }}>
            "The first time we saw all 62 subscriptions ranked by health score on a single page, we immediately spotted three subscriptions that had drifted completely out of compliance. One had no policy assignments at all. It had been invisible for months."
          </p>
          <p style={{ fontSize: 13, color: T.muted, marginTop: 12, fontStyle: "normal" }}>
            -- Synta Assessment, anonymised client
          </p>
        </div>

        {/* Market Gap */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 8, letterSpacing: "-0.02em" }}>
            Why this gap exists in the market
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 16 }}>
            The cloud security market has bifurcated. At the top, enterprise CSPM platforms like Wiz and Prisma Cloud offer comprehensive security posture management, but at six-figure annual price points with months-long implementations. At the bottom, Azure's native tools are free but fragmented across five different portals.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 28 }}>
            Nobody has built the middle layer: a unified operational governance dashboard that combines secure scoring, cost monitoring, policy compliance, and remediation tracking for organisations with 50 to 5,000 Azure subscriptions, at a price point that doesn't require board approval.
          </p>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "32px 24px 24px",
            border: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
          }}>
            <MarketGapDiagram />
          </div>
        </section>

        {/* What's included */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 24, letterSpacing: "-0.02em" }}>
            What's included
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[
              { title: "Estate Health Dashboard", desc: "Every subscription scored, graded, and ranked. See your best and worst performers instantly.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: T.indigo },
              { title: "FinOps Cost Tracking", desc: "Monthly spend with effective savings rate, commitment utilisation, and month-over-month trends.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", color: T.accent },
              { title: "Policy Compliance", desc: "Azure Policy compliance per subscription with drift detection and remediation guidance.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: T.indigo },
              { title: "Remediation Tracking", desc: "Findings assigned, tracked, and verified. SLA timelines with escalation paths.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", color: T.accent },
              { title: "Resource Graph Explorer", desc: "Query your entire Azure estate. Surface orphaned resources, misconfigured VNets, and tagging gaps.", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4", color: T.indigo },
              { title: "Executive Reporting", desc: "One-page estate summary designed for leadership. No jargon, just health scores and action items.", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", color: T.accent },
            ].map((f, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 16, padding: "24px",
                border: `1px solid ${T.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                display: "flex", gap: 16,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: f.color === T.indigo ? T.indigoSoft : T.accentSoft,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon} />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.slate, marginBottom: 4 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: "linear-gradient(135deg, #141722 0%, #1a1f35 100%)",
          borderRadius: 24, padding: "60px 48px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -50, right: -30, width: 200, height: 200, borderRadius: "50%", background: "rgba(99,131,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -60, left: -20, width: 180, height: 180, borderRadius: "50%", background: "rgba(32,201,176,0.04)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 30, fontWeight: 600, color: "#F0F1F5", marginBottom: 12, letterSpacing: "-0.02em" }}>
              See your Azure estate health score
            </h2>
            <p style={{ fontSize: 15.5, color: "#8B92AD", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 28px" }}>
              Connect a read-only service principal and get a full estate assessment in under 15 minutes.
              No agents, no commitment, no sales pitch.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 12, background: T.indigo,
                color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none",
                boxShadow: `0 4px 16px ${T.indigo}35`,
              }}>
                Start Free Health Check
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center",
                padding: "14px 28px", borderRadius: 12,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#C8CBD9", fontSize: 15, fontWeight: 500, textDecoration: "none",
              }}>
                View Product
              </a>
            </div>
          </div>
        </section>
      </article>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: `1px solid ${T.border}`, padding: "24px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.slate, letterSpacing: "-0.03em" }}>synta</span>
          <span style={{ display: "inline-block", width: 3.5, height: 3.5, borderRadius: "50%", background: T.indigo, marginLeft: 1.5, marginBottom: 1 }} />
        </div>
        <span style={{ fontSize: 12, color: T.muted }}>2026 Synta Ltd. All rights reserved.</span>
      </footer>
    </div>
  );
}
