import { Link } from "react-router-dom";
import { useState } from "react";

// ── Brand tokens ──
const T = {
  accent: "#20C9B0",
  accentSoft: "rgba(32,201,176,0.07)",
  accentMid: "rgba(32,201,176,0.14)",
  accentBorder: "rgba(32,201,176,0.18)",
  indigo: "#6383FF",
  indigoSoft: "rgba(99,131,255,0.07)",
  indigoBorder: "rgba(99,131,255,0.15)",
  amber: "#FF9F43",
  amberSoft: "rgba(255,159,67,0.07)",
  amberBorder: "rgba(255,159,67,0.15)",
  red: "#EF5F5F",
  redSoft: "rgba(239,95,95,0.06)",
  slate: "#1A1D2B",
  body: "#4A5068",
  muted: "#8B92AD",
  light: "#B0B7CF",
  border: "#E8EAF0",
  cardBg: "#fff",
  pageBg: "#FAFBFE",
  codeBg: "#F4F5FA",
};

/* ════════════════════════════════════════════════════════
   DIAGRAM 1 — Licence Waste Flow
   Clean line-art style: spend → breakdown → savings
   ════════════════════════════════════════════════════════ */
const WasteFlowDiagram = () => (
  <svg viewBox="0 0 720 220" fill="none" style={{ width: "100%" }}>
    {/* ─── Box 1: M365 Spend ─── */}
    <rect x="20" y="45" width="160" height="130" rx="16" fill="#fff" stroke={T.border} strokeWidth="1.5" />
    {/* Licence card stack */}
    <rect x="52" y="72" width="96" height="14" rx="5" fill={T.accent} opacity="0.25" />
    <rect x="48" y="82" width="104" height="14" rx="5" fill={T.accent} opacity="0.45" />
    <rect x="44" y="92" width="112" height="14" rx="5" fill={T.accent} opacity="0.7" />
    <rect x="40" y="102" width="120" height="16" rx="5" fill={T.accent} />
    {/* M365 icon on top card */}
    <text x="100" y="114" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="'Source Sans 3', sans-serif">M365</text>
    <text x="100" y="148" textAnchor="middle" fontSize="12" fontWeight="600" fill={T.slate} fontFamily="'Source Sans 3', sans-serif">Your M365 Spend</text>
    <text x="100" y="164" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">E3, E5, F1/F3, Add-ons</text>

    {/* ─── Arrow 1 ─── */}
    <line x1="192" y1="110" x2="240" y2="110" stroke={T.light} strokeWidth="1.5" strokeDasharray="5 4" />
    <polygon points="240,105 250,110 240,115" fill={T.light} />

    {/* ─── Box 2: Analysis ─── */}
    <rect x="260" y="28" width="200" height="164" rx="16" fill="#fff" stroke={T.border} strokeWidth="1.5" />
    <text x="360" y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill={T.slate} fontFamily="'Source Sans 3', sans-serif">synta.optimize scan</text>

    {/* Donut chart */}
    <circle cx="360" cy="112" r="42" fill="none" stroke={T.codeBg} strokeWidth="14" />
    {/* Active segment - ~70% */}
    <circle cx="360" cy="112" r="42" fill="none" stroke={T.accent} strokeWidth="14"
      strokeDasharray="184.7 264" strokeDashoffset="66" strokeLinecap="round" />
    {/* Waste segment - ~18% */}
    <circle cx="360" cy="112" r="42" fill="none" stroke={T.red} strokeWidth="14"
      strokeDasharray="47.5 264" strokeDashoffset="-118.7" strokeLinecap="round" opacity="0.8" />
    {/* Downgrade segment - ~12% */}
    <circle cx="360" cy="112" r="42" fill="none" stroke={T.amber} strokeWidth="14"
      strokeDasharray="31.7 264" strokeDashoffset="-166.2" strokeLinecap="round" opacity="0.8" />

    {/* Center label */}
    <text x="360" y="109" textAnchor="middle" fontSize="16" fontWeight="700" fill={T.slate} fontFamily="'Source Sans 3', sans-serif">82%</text>
    <text x="360" y="122" textAnchor="middle" fontSize="8" fontWeight="500" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">utilised</text>

    {/* Legend */}
    <circle cx="298" cy="178" r="4" fill={T.accent} />
    <text x="307" y="181" fontSize="9" fill={T.body} fontFamily="'Source Sans 3', sans-serif">Active</text>
    <circle cx="340" cy="178" r="4" fill={T.red} opacity="0.8" />
    <text x="349" y="181" fontSize="9" fill={T.body} fontFamily="'Source Sans 3', sans-serif">Waste</text>
    <circle cx="386" cy="178" r="4" fill={T.amber} opacity="0.8" />
    <text x="395" y="181" fontSize="9" fill={T.body} fontFamily="'Source Sans 3', sans-serif">Downgrade</text>

    {/* ─── Arrow 2 ─── */}
    <line x1="472" y1="110" x2="520" y2="110" stroke={T.light} strokeWidth="1.5" strokeDasharray="5 4" />
    <polygon points="520,105 530,110 520,115" fill={T.light} />

    {/* ─── Box 3: Savings ─── */}
    <rect x="540" y="45" width="160" height="130" rx="16" fill="#fff" stroke={T.accentBorder} strokeWidth="1.5" />
    {/* Pound sign in circle */}
    <circle cx="620" cy="92" r="24" fill={T.accentSoft} stroke={T.accentBorder} strokeWidth="1.2" />
    <text x="620" y="98" textAnchor="middle" fontSize="22" fontWeight="600" fill={T.accent} fontFamily="'Source Sans 3', sans-serif">£</text>
    {/* Down arrow showing savings */}
    <path d="M608 70 L608 64 L620 64 L620 70" stroke={T.accent} strokeWidth="1.5" fill="none" opacity="0.5" />
    <text x="620" y="140" textAnchor="middle" fontSize="12" fontWeight="600" fill={T.slate} fontFamily="'Source Sans 3', sans-serif">Recovered Savings</text>
    <text x="620" y="156" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">15-25% of total spend</text>
  </svg>
);


/* ════════════════════════════════════════════════════════
   DIAGRAM 2 — Issue Type Cards with clean icons
   ════════════════════════════════════════════════════════ */
const IssueCards = () => {
  const issues = [
    {
      title: "Disabled Accounts",
      desc: "Users who have left the organisation but still hold active licence assignments",
      pct: "35%",
      color: T.red,
      soft: T.redSoft,
      icon: (
        <g stroke={T.red} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="16" cy="10" r="4" />
          <path d="M6 22v-1a6 6 0 0112 0v1" />
          <line x1="24" y1="8" x2="30" y2="14" />
          <line x1="30" y1="8" x2="24" y2="14" />
        </g>
      ),
    },
    {
      title: "Duplicate Licences",
      desc: "Users assigned multiple overlapping SKUs that include the same service plans",
      pct: "25%",
      color: T.amber,
      soft: T.amberSoft,
      icon: (
        <g stroke={T.amber} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="6" y="8" width="12" height="16" rx="2" />
          <rect x="18" y="8" width="12" height="16" rx="2" opacity="0.5" />
          <path d="M10 14h4M10 18h4" />
        </g>
      ),
    },
    {
      title: "Inactive Users",
      desc: "Licensed users with no sign-in activity for 90 or more consecutive days",
      pct: "30%",
      color: T.indigo,
      soft: T.indigoSoft,
      icon: (
        <g stroke={T.indigo} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="18" cy="18" r="10" />
          <polyline points="18,12 18,18 22,20" />
          <path d="M12 6 L10 4" />
          <path d="M24 6 L26 4" />
        </g>
      ),
    },
    {
      title: "Service Accounts",
      desc: "Non-person accounts consuming paid licence SKUs that should use free alternatives",
      pct: "10%",
      color: T.muted,
      soft: "rgba(139,146,173,0.07)",
      icon: (
        <g stroke={T.muted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M12 15a4 4 0 11-8 0 4 4 0 018 0z" />
          <path d="M14.7 8.3a2 2 0 013 0l6 6a2 2 0 010 3l-6 6a2 2 0 01-3 0l-6-6a2 2 0 010-3l6-6z" transform="translate(8, -2) scale(0.7)" />
          <rect x="20" y="10" width="10" height="12" rx="2" />
          <line x1="23" y1="14" x2="27" y2="14" />
          <line x1="23" y1="18" x2="27" y2="18" />
        </g>
      ),
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {issues.map((issue, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 16, padding: "24px 20px",
          border: `1px solid ${T.border}`, position: "relative",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}>
          {/* Top accent line */}
          <div style={{
            position: "absolute", top: 0, left: 20, right: 20, height: 2,
            background: issue.color, borderRadius: "0 0 2px 2px", opacity: 0.6,
          }} />

          {/* Icon */}
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: issue.soft,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 16,
          }}>
            <svg width="36" height="36" viewBox="0 0 36 32">{issue.icon}</svg>
          </div>

          {/* Percentage */}
          <div style={{
            fontFamily: "'Newsreader', serif", fontSize: 32, fontWeight: 600,
            color: issue.color, marginBottom: 4, letterSpacing: "-0.02em",
          }}>{issue.pct}</div>

          {/* Title */}
          <div style={{
            fontSize: 15, fontWeight: 700, color: T.slate, marginBottom: 8,
          }}>{issue.title}</div>

          {/* Description */}
          <div style={{
            fontSize: 13, color: T.muted, lineHeight: 1.6,
          }}>{issue.desc}</div>
        </div>
      ))}
    </div>
  );
};


/* ════════════════════════════════════════════════════════
   DIAGRAM 3 — How It Works — Connected step flow
   ════════════════════════════════════════════════════════ */
const HowItWorksDiagram = () => (
  <svg viewBox="0 0 720 300" fill="none" style={{ width: "100%" }}>
    {/* ─── Step 1: Connect ─── */}
    <rect x="10" y="40" width="152" height="180" rx="16" fill="#fff" stroke={T.border} strokeWidth="1.5" />
    {/* Number badge */}
    <circle cx="40" cy="68" r="14" fill={T.accentSoft} stroke={T.accentBorder} strokeWidth="1" />
    <text x="40" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent} fontFamily="'Source Sans 3', sans-serif">1</text>
    {/* Lock/link icon */}
    <g transform="translate(56, 100)">
      <rect x="0" y="14" width="60" height="40" rx="8" fill={T.accentSoft} stroke={T.accentBorder} strokeWidth="1" />
      <rect x="15" y="2" width="30" height="20" rx="10" fill="none" stroke={T.accent} strokeWidth="2" />
      <circle cx="30" cy="32" r="4" fill={T.accent} />
      <line x1="30" y1="36" x2="30" y2="42" stroke={T.accent} strokeWidth="2" strokeLinecap="round" />
    </g>
    <text x="86" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill={T.slate} fontFamily="'Source Sans 3', sans-serif">Connect</text>
    <text x="86" y="184" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">OAuth consent</text>
    <text x="86" y="196" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Read-only access</text>
    <text x="86" y="208" textAnchor="middle" fontSize="10" fill={T.accent} fontWeight="600" fontFamily="'Source Sans 3', sans-serif">2 minutes</text>

    {/* ─── Connector 1→2 ─── */}
    <line x1="170" y1="130" x2="195" y2="130" stroke={T.light} strokeWidth="1.5" strokeDasharray="4 3" />
    <polygon points="195,126 203,130 195,134" fill={T.light} />

    {/* ─── Step 2: Scan ─── */}
    <rect x="207" y="40" width="152" height="180" rx="16" fill="#fff" stroke={T.border} strokeWidth="1.5" />
    <circle cx="237" cy="68" r="14" fill={T.indigoSoft} stroke={T.indigoBorder} strokeWidth="1" />
    <text x="237" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill={T.indigo} fontFamily="'Source Sans 3', sans-serif">2</text>
    {/* Document scan icon */}
    <g transform="translate(253, 94)">
      <rect x="0" y="0" width="46" height="56" rx="6" fill={T.indigoSoft} stroke={T.indigoBorder} strokeWidth="1" />
      <line x1="10" y1="14" x2="36" y2="14" stroke={T.indigo} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="10" y1="22" x2="30" y2="22" stroke={T.indigo} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="10" y1="30" x2="34" y2="30" stroke={T.indigo} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="10" y1="38" x2="26" y2="38" stroke={T.indigo} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Scan line */}
      <rect x="-2" y="20" width="50" height="2" rx="1" fill={T.indigo} opacity="0.3" />
    </g>
    <text x="283" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill={T.slate} fontFamily="'Source Sans 3', sans-serif">Scan</text>
    <text x="283" y="184" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Graph API pulls</text>
    <text x="283" y="196" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Licences, users, usage</text>
    <text x="283" y="208" textAnchor="middle" fontSize="10" fill={T.indigo} fontWeight="600" fontFamily="'Source Sans 3', sans-serif">15 minutes</text>

    {/* ─── Connector 2→3 ─── */}
    <line x1="367" y1="130" x2="392" y2="130" stroke={T.light} strokeWidth="1.5" strokeDasharray="4 3" />
    <polygon points="392,126 400,130 392,134" fill={T.light} />

    {/* ─── Step 3: Identify ─── */}
    <rect x="404" y="40" width="152" height="180" rx="16" fill="#fff" stroke={T.border} strokeWidth="1.5" />
    <circle cx="434" cy="68" r="14" fill={T.amberSoft} stroke={T.amberBorder} strokeWidth="1" />
    <text x="434" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill={T.amber} fontFamily="'Source Sans 3', sans-serif">3</text>
    {/* Lightbulb icon */}
    <g transform="translate(450, 92)">
      <path d="M23 4C13 4 6 12 6 20c0 5 3 9 7 12v6c0 2 2 4 4 4h12c2 0 4-2 4-4v-6c4-3 7-7 7-12 0-8-7-16-17-16z"
        fill={T.amberSoft} stroke={T.amber} strokeWidth="1.3" opacity="0.8" />
      <line x1="16" y1="38" x2="30" y2="38" stroke={T.amber} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="18" y1="42" x2="28" y2="42" stroke={T.amber} strokeWidth="1.3" strokeLinecap="round" />
      {/* Light rays */}
      <line x1="23" y1="0" x2="23" y2="-4" stroke={T.amber} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <line x1="35" y1="6" x2="38" y2="3" stroke={T.amber} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <line x1="11" y1="6" x2="8" y2="3" stroke={T.amber} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </g>
    <text x="480" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill={T.slate} fontFamily="'Source Sans 3', sans-serif">Identify</text>
    <text x="480" y="184" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Waste, duplicates,</text>
    <text x="480" y="196" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">inactive, downgrades</text>
    <text x="480" y="208" textAnchor="middle" fontSize="10" fill={T.amber} fontWeight="600" fontFamily="'Source Sans 3', sans-serif">Automatic</text>

    {/* ─── Connector 3→4 ─── */}
    <line x1="564" y1="130" x2="589" y2="130" stroke={T.light} strokeWidth="1.5" strokeDasharray="4 3" />
    <polygon points="589,126 597,130 589,134" fill={T.light} />

    {/* ─── Step 4: Save ─── */}
    <rect x="601" y="40" width="110" height="180" rx="16" fill="#fff" stroke={T.accentBorder} strokeWidth="1.5" />
    <circle cx="631" cy="68" r="14" fill={T.accentSoft} stroke={T.accentBorder} strokeWidth="1" />
    <text x="631" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent} fontFamily="'Source Sans 3', sans-serif">4</text>
    {/* Pound/savings icon */}
    <g transform="translate(626, 96)">
      <circle cx="30" cy="24" r="22" fill={T.accentSoft} stroke={T.accentBorder} strokeWidth="1.2" />
      <text x="30" y="28" textAnchor="middle" fontSize="20" fontWeight="600" fill={T.accent} fontFamily="'Source Sans 3', sans-serif">£</text>
      {/* Down arrow */}
      <path d="M30 50 L30 58 M26 54 L30 58 L34 54" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="656" y="174" textAnchor="middle" fontSize="14" fontWeight="700" fill={T.slate} fontFamily="'Source Sans 3', sans-serif">Save</text>
    <text x="656" y="190" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">Actionable report</text>
    <text x="656" y="202" textAnchor="middle" fontSize="10" fill={T.muted} fontFamily="'Source Sans 3', sans-serif">with £ savings</text>

    {/* ─── Bottom: timeline bar ─── */}
    <rect x="10" y="250" width="701" height="3" rx="1.5" fill={T.codeBg} />
    <rect x="10" y="250" width="701" height="3" rx="1.5" fill={`url(#timeGrad)`} />
    <defs>
      <linearGradient id="timeGrad" x1="0" y1="0" x2="720" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={T.accent} />
        <stop offset="35%" stopColor={T.indigo} />
        <stop offset="65%" stopColor={T.amber} />
        <stop offset="100%" stopColor={T.accent} />
      </linearGradient>
    </defs>
    <text x="86" y="272" textAnchor="middle" fontSize="9" fontWeight="600" fill={T.accent} fontFamily="'Source Sans 3', sans-serif">0 min</text>
    <text x="283" y="272" textAnchor="middle" fontSize="9" fontWeight="600" fill={T.indigo} fontFamily="'Source Sans 3', sans-serif">2 min</text>
    <text x="480" y="272" textAnchor="middle" fontSize="9" fontWeight="600" fill={T.amber} fontFamily="'Source Sans 3', sans-serif">17 min</text>
    <text x="656" y="272" textAnchor="middle" fontSize="9" fontWeight="600" fill={T.accent} fontFamily="'Source Sans 3', sans-serif">20 min</text>
  </svg>
);


/* ════════════════════════════════════════════════════════
   DIAGRAM 4 — E5 Feature Usage
   ════════════════════════════════════════════════════════ */
const E5UsageChart = () => {
  const features = [
    { name: "Audio Conferencing", pct: 61, color: T.accent },
    { name: "Power BI Pro", pct: 34, color: T.accent },
    { name: "Cloud App Security", pct: 22, color: T.amber },
    { name: "Auto Classification", pct: 12, color: T.red },
    { name: "Advanced eDiscovery", pct: 8, color: T.red },
    { name: "Information Barriers", pct: 3, color: T.red },
  ];

  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "32px", border: `1px solid ${T.border}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.slate }}>E5 Feature Adoption</div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Percentage of E5 users actively using each premium feature</div>
        </div>
        <div style={{
          display: "flex", gap: 12, alignItems: "center", fontSize: 10, color: T.muted,
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 3, background: T.accent }} /> Adopted
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 3, background: T.red }} /> Low
          </span>
        </div>
      </div>

      {features.map((f, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "160px 1fr 48px",
          alignItems: "center", gap: 16, marginBottom: i < features.length - 1 ? 16 : 0,
          padding: "8px 0",
          borderBottom: i < features.length - 1 ? `1px solid ${T.codeBg}` : "none",
        }}>
          <span style={{ fontSize: 13.5, color: T.body, fontWeight: 500 }}>{f.name}</span>
          <div style={{
            height: 10, borderRadius: 5, background: T.codeBg, overflow: "hidden",
          }}>
            <div style={{
              width: `${f.pct}%`, height: "100%", borderRadius: 5,
              background: `linear-gradient(90deg, ${f.color}cc, ${f.color})`,
            }} />
          </div>
          <span style={{
            fontSize: 13, fontWeight: 700, color: f.color, textAlign: "right",
          }}>{f.pct}%</span>
        </div>
      ))}

      {/* Threshold line label */}
      <div style={{
        marginTop: 20, padding: "12px 16px", background: T.redSoft,
        borderRadius: 10, display: "flex", alignItems: "center", gap: 10,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span style={{ fontSize: 12.5, color: T.body }}>
          <strong style={{ color: T.slate }}>70% of E5 users</strong> could be downgraded to E3, saving ~£19 per user per month
        </span>
      </div>
    </div>
  );
};


/* ════════════════════════════════════════════════════════
   COMPARISON TABLE
   ════════════════════════════════════════════════════════ */
const ComparisonTable = () => {
  const Check = () => (
    <div style={{ width: 22, height: 22, borderRadius: 7, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
  const Cross = () => (
    <div style={{ width: 22, height: 22, borderRadius: 7, background: T.codeBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C8CBD9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  );
  const Partial = () => (
    <div style={{ width: 22, height: 22, borderRadius: 7, background: T.amberSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.amber} strokeWidth="2.5" strokeLinecap="round">
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </div>
  );
  const Text = ({ children }) => <span style={{ fontSize: 12.5, fontWeight: 600, color: T.slate }}>{children}</span>;

  const render = (val) => {
    if (val === true) return <Check />;
    if (val === false) return <Cross />;
    if (val === "partial") return <Partial />;
    return <Text>{val}</Text>;
  };

  const rows = [
    { f: "M365 licence waste detection", s: true, n: false, m: "partial" },
    { f: "E5 feature usage analysis", s: true, n: false, m: false },
    { f: "Downgrade recommendations", s: true, n: false, m: false },
    { f: "Cross-tenant cost view", s: true, n: "partial", m: true },
    { f: "Automated daily scanning", s: true, n: false, m: false },
    { f: "Trend tracking over time", s: true, n: "partial", m: "partial" },
    { f: "Time to first insight", s: "15 min", n: "N/A", m: "2-5 days" },
    { f: "Ongoing effort required", s: "Zero", n: "N/A", m: "Hrs/week" },
  ];

  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${T.border}`, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
        padding: "14px 28px", background: T.codeBg, borderBottom: `1px solid ${T.border}`,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Capability</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>synta</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>Native</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>Manual</span>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
          padding: "13px 28px", borderBottom: i < rows.length - 1 ? `1px solid ${T.codeBg}` : "none",
          alignItems: "center",
        }}>
          <span style={{ fontSize: 13.5, color: T.body }}>{row.f}</span>
          <div style={{ display: "flex", justifyContent: "center" }}>{render(row.s)}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>{render(row.n)}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>{render(row.m)}</div>
        </div>
      ))}
    </div>
  );
};

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
   MAIN BLOG POST
   ════════════════════════════════════════════════════════ */
export default function SyntaOptimizeBlogV2() {
  return (
    <div style={{
      background: T.pageBg, minHeight: "100vh",
      fontFamily: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
      color: T.body,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${T.accentMid}; }
      `}</style>

      {/* ── Sticky Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,251,254,0.88)", backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${T.border}`, padding: "0 48px",
        height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: T.slate, letterSpacing: "-0.03em" }}>synta</span>
            <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: T.accent, marginLeft: 1.5, marginBottom: 1.5, boxShadow: `0 0 4px ${T.accent}50` }} />
            <span style={{ fontSize: 18, fontWeight: 400, color: T.accent, marginLeft: 2 }}>optimize</span>
          </div>
          <span style={{ fontSize: 12, color: T.light, fontWeight: 500 }}>Blog</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Link to="/" style={{ fontSize: 13, fontWeight: 500, color: T.body, textDecoration: "none", padding: "7px 14px", borderRadius: 8 }}>Home</Link>
          <a href="#" style={{ fontSize: 13, fontWeight: 500, color: T.body, textDecoration: "none", padding: "7px 14px", borderRadius: 8 }}>Pricing</a>
          <a href="#" style={{
            fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none",
            padding: "8px 20px", borderRadius: 10, background: T.accent,
            boxShadow: `0 2px 8px ${T.accent}30`,
          }}>Get Free Assessment</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header style={{ maxWidth: 780, margin: "0 auto", padding: "80px 24px 56px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 20, background: T.accentSoft,
          border: `1px solid ${T.accentBorder}`, marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: T.accent }}>M365 License Optimization</span>
        </div>

        <h1 style={{
          fontFamily: "'Newsreader', serif", fontSize: 46, fontWeight: 600,
          color: T.slate, lineHeight: 1.2, letterSpacing: "-0.025em",
          maxWidth: 660, margin: "0 auto 20px",
        }}>
          Your Organisation Is Wasting Up to 25% on Microsoft 365 Licences
        </h1>

        <p style={{
          fontSize: 17.5, color: T.muted, lineHeight: 1.7,
          maxWidth: 540, margin: "0 auto 36px",
        }}>
          Most companies don't know it. The ones that do lack the tooling to fix it.
          Here's what's actually happening inside your M365 tenant.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: T.light }}>6 min read</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: T.border }} />
          <span style={{ fontSize: 13, color: T.light }}>March 2026</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: T.border }} />
          <span style={{ fontSize: 13, color: T.light }}>Synta Engineering</span>
        </div>
      </header>

      {/* ── Article ── */}
      <article style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 96px" }}>

        {/* Diagram 1: Waste Flow */}
        <div style={{
          background: "#fff", borderRadius: 20, padding: "36px 28px 28px", marginBottom: 56,
          border: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
        }}>
          <WasteFlowDiagram />
        </div>

        {/* The Problem */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 16, letterSpacing: "-0.02em" }}>
            The hidden cost of licence sprawl
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 16 }}>
            Every organisation running Microsoft 365 has the same problem. Employees leave but their licences remain assigned. Users get upgraded to E5 during a project and never get downgraded. Service accounts accumulate paid SKUs that should be free. And nobody notices because the bill arrives as one opaque line item.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 16 }}>
            The result is predictable: between 15% and 25% of the average M365 estate is pure waste. For a 3,000-user organisation on a mix of E3 and E5 licences, that translates to anywhere from <strong style={{ color: T.slate }}>£50,000 to £150,000 per year</strong> in recoverable spend.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.8 }}>
            The frustrating part isn't that the waste exists. It's that Microsoft's native admin tools make it almost impossible to see the full picture. You can view licence assignments in Entra. You can see billing in the admin centre. But nowhere can you see the relationship between user activity, licence assignment, feature usage, and cost in a single view.
          </p>
        </section>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 56 }}>
          <StatCard value="15-25%" label="Average licence waste" sub="Across mid-market M365 tenants" color={T.red} />
          <StatCard value="90+" label="Days inactive threshold" sub="Before a licence is flagged" color={T.amber} />
          <StatCard value="< 20 min" label="Time to first insight" sub="From consent to actionable data" color={T.accent} />
        </div>

        {/* Issue Types */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 8, letterSpacing: "-0.02em" }}>
            Where the money goes
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 28 }}>
            Licence waste falls into four distinct categories. Each has different root causes, different remediation paths, and different savings potential.
          </p>
          <IssueCards />
        </section>

        {/* Callout */}
        <div style={{
          background: T.accentSoft, borderRadius: 16, padding: "28px 32px",
          borderLeft: `4px solid ${T.accent}`, marginBottom: 56,
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: T.slate, fontWeight: 500, fontStyle: "italic", fontFamily: "'Newsreader', serif" }}>
            "We ran a Synta assessment on a 4,200-user tenant and identified £156,800 in annual savings within the first scan. The biggest single finding was 89 disabled accounts still holding E5 licences at £49 per user per month."
          </p>
          <p style={{ fontSize: 13, color: T.muted, marginTop: 12, fontStyle: "normal" }}>
            -- Synta Assessment, anonymised client
          </p>
        </div>

        {/* E5 Deep Dive */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 8, letterSpacing: "-0.02em" }}>
            The E5 downgrade opportunity most teams miss
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 16 }}>
            Microsoft 365 E5 costs roughly £49 per user per month compared to £30 for E3. The premium buys advanced features like Power BI Pro, Audio Conferencing, and Advanced eDiscovery.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 28 }}>
            But here's the reality: in most organisations, fewer than 30% of E5 users actually use any premium feature. The rest are paying a 60% premium for capabilities they never touch.
          </p>
          <E5UsageChart />
        </section>

        {/* How It Works */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 8, letterSpacing: "-0.02em" }}>
            How synta.optimize works
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 28 }}>
            No agents. No downloads. No footprint in your environment. Just a read-only OAuth consent, and your first assessment is ready before your coffee gets cold.
          </p>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "32px 20px 20px",
            border: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
          }}>
            <HowItWorksDiagram />
          </div>
        </section>

        {/* Comparison */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 28, fontWeight: 600, color: T.slate, marginBottom: 8, letterSpacing: "-0.02em" }}>
            Why not just do it manually?
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, marginBottom: 28 }}>
            You could export CSVs from the Microsoft 365 admin centre, cross-reference sign-in logs, and build a spreadsheet. We've done it. It takes days, and it's out of date the moment you finish.
          </p>
          <ComparisonTable />
        </section>

        {/* CTA */}
        <section style={{
          background: "linear-gradient(135deg, #141722 0%, #1c2035 100%)",
          borderRadius: 24, padding: "60px 48px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -50, right: -30, width: 200, height: 200, borderRadius: "50%", background: "rgba(32,201,176,0.05)" }} />
          <div style={{ position: "absolute", bottom: -60, left: -20, width: 180, height: 180, borderRadius: "50%", background: "rgba(99,131,255,0.04)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 30, fontWeight: 600, color: "#F0F1F5", marginBottom: 12, letterSpacing: "-0.02em" }}>
              Find out what your M365 estate is costing you
            </h2>
            <p style={{ fontSize: 15.5, color: "#8B92AD", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 28px" }}>
              We'll run a free assessment on your tenant. No commitment, no sales pitch. Just a clear report showing where the waste is.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 12, background: T.accent,
                color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none",
                boxShadow: `0 4px 16px ${T.accent}35`,
              }}>
                Start Free Assessment
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
          <span style={{ display: "inline-block", width: 3.5, height: 3.5, borderRadius: "50%", background: T.accent, marginLeft: 1.5, marginBottom: 1 }} />
        </div>
        <span style={{ fontSize: 12, color: T.muted }}>2026 Synta Ltd. All rights reserved.</span>
      </footer>
    </div>
  );
}
