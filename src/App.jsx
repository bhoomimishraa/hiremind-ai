import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  LayoutDashboard, FileText, ScrollText, Search, Target, AlertTriangle,
  Users, RefreshCw, History, Send, Sparkles, Mail, MessageCircle, Phone,
  MapPin, Briefcase, GraduationCap, CheckCircle2, XCircle, Star, Loader2,
  ChevronDown, ChevronUp, X, Plus, TrendingUp, Clock, Filter, ArrowRight,
  BadgeCheck, CircleDot,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";

/* ---------------------------------------------------------------------- */
/* TOKENS                                                                  */
/* ---------------------------------------------------------------------- */

const C = {
  ink: "#12141C",
  inkSoft: "#565C6B",
  faint: "#8B90A0",
  page: "#F5F5F1",
  panel: "#FFFFFF",
  line: "#E4E3DC",
  navy: "#101425",
  navySoft: "#181D33",
  navyLine: "#2A3050",
  gold: "#C8892E",
  goldSoft: "#F4E3C6",
  teal: "#1D8A82",
  tealSoft: "#DCEFEC",
  green: "#1E8F5F",
  greenSoft: "#DCF0E4",
  red: "#B8433A",
  redSoft: "#F6E1DE",
  amber: "#B8832A",
  amberSoft: "#F3E6CE",
};

const HEAD = "'Fraunces', Georgia, serif";
const BODY = "'Inter', system-ui, sans-serif";
const MONO = "'IBM Plex Mono', monospace";

/* ---------------------------------------------------------------------- */
/* MOCK DATA                                                               */
/* ---------------------------------------------------------------------- */

const ALL_SKILLS = [
  "React","Angular","Vue","JavaScript","TypeScript","Node.js","Python","Django",
  "Flask","Java","Spring Boot","AWS","Azure","GCP","Docker","Kubernetes",
  "Terraform","CI/CD","Jenkins","SQL","PostgreSQL","MongoDB","Redis","GraphQL",
  "REST API","Machine Learning","Deep Learning","NLP","TensorFlow","PyTorch",
  "Pandas","Data Analysis","Tableau","Power BI","Product Management","Agile",
  "Scrum","Figma","UI/UX","HTML","CSS","Tailwind CSS","Go","Microservices","Git",
];

const CITIES = ["Bengaluru","Hyderabad","Pune","Chennai","Gurgaon","Mumbai","Remote"];

const CAND_SEED = [
  { name: "Ananya Rao", title: "Senior Frontend Engineer", location: "Bengaluru", exp: 6,
    skills: ["React","TypeScript","Redux","Tailwind CSS","GraphQL","Git"], edu: "B.Tech, Computer Science",
    email: "ananya.rao@mailbox.dev", phone: "+91 98450 11234", source: "LinkedIn", status: "Interviewing", appliedFor: "Senior Frontend Engineer" },
  { name: "Rohan Mehta", title: "Full Stack Developer", location: "Pune", exp: 4,
    skills: ["Node.js","React","MongoDB","AWS","Docker","REST API"], edu: "B.E, Information Technology",
    email: "r.mehta@mailbox.dev", phone: "+91 98220 33421", source: "Referral", status: "Screened", appliedFor: "Senior Frontend Engineer" },
  { name: "Priya Nair", title: "Data Scientist", location: "Hyderabad", exp: 5,
    skills: ["Python","Machine Learning","TensorFlow","Pandas","SQL","NLP"], edu: "M.Tech, Artificial Intelligence",
    email: "priya.nair@mailbox.dev", phone: "+91 90000 44551", source: "Naukri", status: "New", appliedFor: "Machine Learning Engineer — NLP" },
  { name: "Vikram Singh", title: "DevOps Engineer", location: "Gurgaon", exp: 7,
    skills: ["AWS","Kubernetes","Docker","Terraform","Jenkins","CI/CD"], edu: "B.Tech, Computer Science",
    email: "vikram.singh@mailbox.dev", phone: "+91 99110 22987", source: "LinkedIn", status: "Offered", appliedFor: "DevOps / Platform Engineer" },
  { name: "Sneha Kulkarni", title: "UI/UX Designer", location: "Pune", exp: 3,
    skills: ["Figma","UI/UX","HTML","CSS"], edu: "B.Des, Communication Design",
    email: "sneha.k@mailbox.dev", phone: "+91 98811 77234", source: "Applied", status: "Rejected", appliedFor: "Senior Frontend Engineer" },
  { name: "Arjun Reddy", title: "Backend Engineer", location: "Hyderabad", exp: 5,
    skills: ["Java","Spring Boot","Microservices","SQL","PostgreSQL","AWS"], edu: "B.Tech, Computer Science",
    email: "arjun.reddy@mailbox.dev", phone: "+91 90520 66112", source: "Referral", status: "Hired", appliedFor: "DevOps / Platform Engineer" },
  { name: "Kavya Iyer", title: "Data Analyst", location: "Chennai", exp: 2,
    skills: ["SQL","Tableau","Power BI","Python","Data Analysis"], edu: "B.Sc, Statistics",
    email: "kavya.iyer@mailbox.dev", phone: "+91 90040 55123", source: "Naukri", status: "New", appliedFor: "Machine Learning Engineer — NLP" },
  { name: "Aditya Kumar", title: "React Developer", location: "Bengaluru", exp: 3,
    skills: ["React","JavaScript","Redux","Tailwind CSS","REST API"], edu: "B.Tech, Computer Science",
    email: "aditya.kumar@mailbox.dev", phone: "+91 91234 88765", source: "LinkedIn", status: "Screened", appliedFor: "Senior Frontend Engineer" },
  { name: "Meera Pillai", title: "Machine Learning Engineer", location: "Hyderabad", exp: 6,
    skills: ["Python","PyTorch","Deep Learning","NLP","Machine Learning","AWS"], edu: "M.S, Computer Science",
    email: "meera.pillai@mailbox.dev", phone: "+91 89990 12456", source: "Referral", status: "Pool", appliedFor: "Data Platform Engineer (closed)" },
  { name: "Karan Malhotra", title: "Cloud Engineer", location: "Mumbai", exp: 4,
    skills: ["AWS","Azure","Terraform","Docker","Kubernetes","CI/CD"], edu: "B.E, Electronics",
    email: "karan.m@mailbox.dev", phone: "+91 98202 34098", source: "Applied", status: "New", appliedFor: "DevOps / Platform Engineer" },
  { name: "Divya Bhat", title: "Product Manager", location: "Bengaluru", exp: 5,
    skills: ["Product Management","Agile","Scrum","Figma","Data Analysis"], edu: "MBA, Product Management",
    email: "divya.bhat@mailbox.dev", phone: "+91 90211 43567", source: "LinkedIn", status: "Interviewing", appliedFor: "Group Product Manager" },
  { name: "Nikhil Verma", title: "Senior Backend Engineer", location: "Pune", exp: 8,
    skills: ["Java","Spring Boot","Microservices","Kubernetes","AWS","SQL"], edu: "B.Tech, Computer Science",
    email: "nikhil.verma@mailbox.dev", phone: "+91 99887 65123", source: "Referral", status: "Pool", appliedFor: "Backend Lead (closed)" },
  { name: "Ritu Chawla", title: "Frontend Developer", location: "Gurgaon", exp: 2,
    skills: ["React","JavaScript","HTML","CSS","TypeScript"], edu: "B.Tech, Information Technology",
    email: "ritu.chawla@mailbox.dev", phone: "+91 98765 21098", source: "Naukri", status: "New", appliedFor: "Senior Frontend Engineer" },
  { name: "Suresh Pillai", title: "DevOps / SRE", location: "Hyderabad", exp: 5,
    skills: ["Kubernetes","Docker","AWS","CI/CD","Terraform","Python"], edu: "B.Tech, Computer Science",
    email: "suresh.pillai@mailbox.dev", phone: "+91 90876 54321", source: "LinkedIn", status: "Screened", appliedFor: "DevOps / Platform Engineer" },
];

const HIST_SEED = {
  "Ananya Rao": [
    { date: "2026-07-02", stage: "Applied", note: "Applied via LinkedIn Easy Apply." },
    { date: "2026-07-05", stage: "Screened", note: "Recruiter screen — strong React/TS depth, 6 yrs relevant." },
    { date: "2026-07-14", stage: "Interviewing", note: "Cleared technical round 1. Panel round scheduled." },
  ],
  "Vikram Singh": [
    { date: "2026-06-10", stage: "Applied", note: "Sourced by recruiter on LinkedIn." },
    { date: "2026-06-14", stage: "Screened", note: "Strong Kubernetes/Terraform background." },
    { date: "2026-06-25", stage: "Interviewing", note: "Cleared 2 technical rounds." },
    { date: "2026-08-01", stage: "Offered", note: "Offer extended — awaiting response." },
  ],
  "Arjun Reddy": [
    { date: "2026-04-11", stage: "Applied", note: "Referred by internal engineer." },
    { date: "2026-04-18", stage: "Screened", note: "Solid microservices experience." },
    { date: "2026-05-02", stage: "Interviewing", note: "Cleared all rounds." },
    { date: "2026-05-20", stage: "Offered", note: "Offer accepted." },
    { date: "2026-06-16", stage: "Hired", note: "Joined as Backend Engineer II." },
  ],
  "Divya Bhat": [
    { date: "2026-07-20", stage: "Applied", note: "Applied via careers page." },
    { date: "2026-07-25", stage: "Screened", note: "Strong product sense, relevant B2B SaaS background." },
    { date: "2026-08-10", stage: "Interviewing", note: "Panel round scheduled with design + eng leads." },
  ],
  "Meera Pillai": [
    { date: "2025-12-03", stage: "Applied", note: "Applied for Data Platform Engineer role." },
    { date: "2025-12-09", stage: "Screened", note: "Good ML fundamentals, role required stronger data-eng skillset." },
    { date: "2026-01-04", stage: "Pool", note: "Not selected for that role — moved to talent pool for future NLP/ML openings." },
  ],
  "Nikhil Verma": [
    { date: "2025-09-14", stage: "Applied", note: "Applied for Backend Lead role." },
    { date: "2025-09-22", stage: "Screened", note: "Deep backend expertise, exceeded scope of open role." },
    { date: "2025-10-30", stage: "Pool", note: "Role closed with another candidate — retained in pool as high-potential." },
  ],
};

let CID = 1;
const CANDIDATES_INIT = CAND_SEED.map((c) => ({
  id: CID++,
  ...c,
  history: HIST_SEED[c.name] || [{ date: "2026-07-01", stage: "Applied", note: "Application received." }],
}));

const JOBS_INIT = [
  { id: "j1", title: "Senior Frontend Engineer", company: "Northgate Retail Tech", location: "Bengaluru",
    minExp: 4, maxExp: 7, required: ["React","TypeScript","Redux","Tailwind CSS","GraphQL"], nice: ["Jest","Next.js"],
    text: "We're looking for a Senior Frontend Engineer to lead our web platform. You'll own component architecture, mentor mid-level engineers, and work closely with design. 4-7 years experience. Required: React, TypeScript, Redux, Tailwind CSS, GraphQL. Nice to have: Jest, Next.js." },
  { id: "j2", title: "Machine Learning Engineer — NLP", company: "Lumen Analytics", location: "Hyderabad",
    minExp: 3, maxExp: 6, required: ["Python","Machine Learning","NLP","PyTorch","Deep Learning"], nice: ["AWS","TensorFlow"],
    text: "Join our applied AI team building NLP systems for enterprise search. 3-6 years experience. Required: Python, Machine Learning, NLP, PyTorch, Deep Learning. Nice to have: AWS, TensorFlow." },
  { id: "j3", title: "DevOps / Platform Engineer", company: "Cascade Freight", location: "Pune (Remote-friendly)",
    minExp: 3, maxExp: 6, required: ["AWS","Kubernetes","Docker","Terraform","CI/CD"], nice: ["Jenkins","Python"],
    text: "We need a Platform Engineer to scale our multi-region infrastructure. 3-6 years experience. Required: AWS, Kubernetes, Docker, Terraform, CI/CD. Nice to have: Jenkins, Python." },
];

const STATUS_COLOR = {
  New: { bg: C.tealSoft, fg: C.teal },
  Screened: { bg: C.amberSoft, fg: C.amber },
  Interviewing: { bg: C.goldSoft, fg: C.gold },
  Offered: { bg: C.greenSoft, fg: C.green },
  Hired: { bg: C.greenSoft, fg: C.green },
  Rejected: { bg: C.redSoft, fg: C.red },
  Pool: { bg: "#E7E6F2", fg: "#5B4FA0" },
};

/* ---------------------------------------------------------------------- */
/* SCORING / MATCH ENGINE                                                  */
/* ---------------------------------------------------------------------- */

function computeMatch(candidate, job) {
  const req = job.required;
  const matched = req.filter((s) => candidate.skills.includes(s));
  const missing = req.filter((s) => !candidate.skills.includes(s));
  const matchedNice = job.nice.filter((s) => candidate.skills.includes(s));
  const skillScore = req.length ? (matched.length / req.length) * 100 : 100;

  let expScore;
  if (candidate.exp >= job.minExp && candidate.exp <= job.maxExp) expScore = 100;
  else if (candidate.exp < job.minExp) expScore = Math.max(0, 100 - (job.minExp - candidate.exp) * 22);
  else expScore = Math.max(55, 100 - (candidate.exp - job.maxExp) * 8);

  const eduScore = 100;
  const bonus = matchedNice.length * 3;
  const overall = Math.min(100, Math.round(skillScore * 0.55 + expScore * 0.3 + eduScore * 0.15 + bonus));

  return { overall, skillScore: Math.round(skillScore), expScore: Math.round(expScore), eduScore,
    matched, missing, matchedNice };
}

function cosineSim(a, b) {
  const set = new Set([...a, ...b]);
  let dot = 0, magA = 0, magB = 0;
  set.forEach((s) => {
    const x = a.includes(s) ? 1 : 0;
    const y = b.includes(s) ? 1 : 0;
    dot += x * y; magA += x * x; magB += y * y;
  });
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

function parseNLQuery(q) {
  const lower = q.toLowerCase();
  const skills = ALL_SKILLS.filter((s) => lower.includes(s.toLowerCase()));
  const yrMatch = lower.match(/(\d+)\+?\s*(?:years|yrs|year)/);
  const minYears = yrMatch ? parseInt(yrMatch[1], 10) : null;
  const location = CITIES.find((c) => lower.includes(c.toLowerCase()));
  return { skills, minYears, location };
}

/* ---------------------------------------------------------------------- */
/* SMALL UI PRIMITIVES                                                     */
/* ---------------------------------------------------------------------- */

function Panel({ children, style, ...rest }) {
  return (
    <div
      style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

function Chip({ children, tone = "neutral", small }) {
  const tones = {
    neutral: { bg: "#EFEEE8", fg: C.inkSoft },
    matched: { bg: C.greenSoft, fg: C.green },
    missing: { bg: C.redSoft, fg: C.red },
    nice: { bg: C.tealSoft, fg: C.teal },
    gold: { bg: C.goldSoft, fg: C.gold },
  };
  const t = tones[tone];
  return (
    <span
      style={{
        background: t.bg, color: t.fg, fontFamily: BODY, fontWeight: 600,
        fontSize: small ? 11 : 12.5, padding: small ? "3px 8px" : "4px 10px",
        borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 4,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function ScoreRing({ value, size = 56 }) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = value >= 80 ? C.green : value >= 60 ? C.gold : C.red;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={C.line} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: HEAD, fontWeight: 600, fontSize: size / 3.1, color: C.ink,
      }}>{value}</div>
    </div>
  );
}

function MetricBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: BODY, fontSize: 12.5, color: C.inkSoft, marginBottom: 4 }}>
        <span>{label}</span><span style={{ fontWeight: 700, color: C.ink }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: C.line, borderRadius: 999 }}>
        <div style={{ height: 6, width: `${value}%`, background: color, borderRadius: 999, transition: "width .5s ease" }} />
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div style={{ marginBottom: 22 }}>
      {eyebrow && <div style={{ fontFamily: MONO, fontSize: 11.5, color: C.gold, letterSpacing: 0.4, marginBottom: 6 }}>{eyebrow}</div>}
      <h1 style={{ fontFamily: HEAD, fontSize: 27, fontWeight: 600, color: C.ink, margin: 0 }}>{title}</h1>
      {desc && <p style={{ fontFamily: BODY, fontSize: 14, color: C.inkSoft, marginTop: 6, maxWidth: 620, lineHeight: 1.5 }}>{desc}</p>}
    </div>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 20px", color: C.faint }}>
      <Icon size={26} style={{ marginBottom: 10, opacity: 0.6 }} />
      <div style={{ fontFamily: BODY, fontSize: 13.5 }}>{text}</div>
    </div>
  );
}

function PrimaryBtn({ children, onClick, disabled, style, icon: Icon }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? "#D8D5C8" : C.navy, color: "#fff", border: "none",
      borderRadius: 8, padding: "10px 16px", fontFamily: BODY, fontWeight: 600, fontSize: 13.5,
      display: "inline-flex", alignItems: "center", gap: 8, cursor: disabled ? "default" : "pointer", ...style,
    }}>
      {Icon && <Icon size={15} />}{children}
    </button>
  );
}

function GhostBtn({ children, onClick, style, icon: Icon }) {
  return (
    <button onClick={onClick} style={{
      background: "transparent", color: C.ink, border: `1px solid ${C.line}`,
      borderRadius: 8, padding: "9px 14px", fontFamily: BODY, fontWeight: 600, fontSize: 13,
      display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", ...style,
    }}>
      {Icon && <Icon size={14} />}{children}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* MODULE: DASHBOARD                                                       */
/* ---------------------------------------------------------------------- */

function JourneyDiagram({ funnel }) {
  const width = 900, height = 172, cy = 66;
  const n = funnel.length;
  const maxCount = Math.max(...funnel.map((f) => f.count), 1);
  const xs = funnel.map((_, i) => 60 + i * ((width - 120) / (n - 1)));
  const radii = funnel.map((f) => 20 + (f.count / maxCount) * 26);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={172} style={{ display: "block" }}>
      <defs>
        <marker id="journeyArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={C.faint} />
        </marker>
      </defs>
      {xs.slice(0, -1).map((x, i) => (
        <line key={i}
          x1={x + radii[i] + 4} y1={cy}
          x2={xs[i + 1] - radii[i + 1] - 10} y2={cy}
          stroke={C.line} strokeWidth={2} markerEnd="url(#journeyArrow)" />
      ))}
      {funnel.map((f, i) => {
        const color = STATUS_COLOR[f.stage]?.fg || C.navy;
        return (
          <g key={f.stage}>
            <circle cx={xs[i]} cy={cy} r={radii[i]} fill={color} />
            <text x={xs[i]} y={cy + 5} textAnchor="middle" fontFamily={BODY} fontWeight={700} fontSize={14} fill="#fff">{f.count}</text>
            <text x={xs[i]} y={cy + radii[i] + 22} textAnchor="middle" fontFamily={BODY} fontWeight={600} fontSize={12.5} fill={C.ink}>{f.stage}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Dashboard({ candidates, jobs, setActiveModule }) {
  const total = candidates.length;
  const stages = ["New", "Screened", "Interviewing", "Offered", "Hired"];
  const funnel = stages.map((s, i) => {
    const idxOrder = ["New","Screened","Interviewing","Offered","Hired"];
    const atOrPast = candidates.filter(c => idxOrder.indexOf(c.status) >= i && idxOrder.indexOf(c.status) !== -1);
    return { stage: s, count: atOrPast.length };
  });

  let bottleneck = null, biggestDrop = -1;
  for (let i = 1; i < funnel.length; i++) {
    const drop = funnel[i - 1].count - funnel[i].count;
    if (drop > biggestDrop) { biggestDrop = drop; bottleneck = { from: funnel[i - 1].stage, to: funnel[i].stage, drop }; }
  }
  const activeCount = candidates.filter(c => ["New","Screened","Interviewing","Offered"].includes(c.status)).length;

  const sourceCounts = {};
  candidates.forEach(c => { sourceCounts[c.source] = (sourceCounts[c.source] || 0) + 1; });
  const sourceData = Object.entries(sourceCounts).map(([name, value]) => ({ name, value }));
  const pieColors = [C.gold, C.teal, C.green, C.navy, C.red];

  const skillFreq = {};
  candidates.forEach(c => c.skills.forEach(s => { skillFreq[s] = (skillFreq[s] || 0) + 1; }));
  const topSkills = Object.entries(skillFreq).sort((a,b) => b[1]-a[1]).slice(0,6).map(([skill,count]) => ({ skill, count }));

  const trend = [
    { month: "Mar", days: 34 }, { month: "Apr", days: 31 }, { month: "May", days: 29 },
    { month: "Jun", days: 27 }, { month: "Jul", days: 24 }, { month: "Aug", days: 22 },
  ];

  const metrics = [
    { label: "Candidates in pool", value: total, sub: `${jobs.length} active requisitions` },
    { label: "In active pipeline", value: candidates.filter(c => ["New","Screened","Interviewing","Offered"].includes(c.status)).length, sub: "across all roles" },
    { label: "Hired this quarter", value: candidates.filter(c => c.status === "Hired").length, sub: "vs 3 last quarter" },
    { label: "Avg. time to hire", value: "22d", sub: "↓ 12 days since Mar" },
  ];

  const autoProcessed = candidates.filter(c => c.source === "WhatsApp" || c.source === "Bulk Upload").length;
  const minutesPerManualScreen = 6;
  const hoursSaved = Math.round((autoProcessed * minutesPerManualScreen / 60) * 10) / 10;

  return (
    <div>
      <SectionTitle eyebrow="Pipeline overview"
        title={`${activeCount} candidates active across ${jobs.length} open roles`}
        desc={bottleneck && bottleneck.drop > 0
          ? `The steepest drop-off is between ${bottleneck.from} and ${bottleneck.to} — ${bottleneck.drop} candidate${bottleneck.drop === 1 ? "" : "s"} stall there. Worth a closer look.`
          : "Every stage is moving cleanly right now — no stage is bleeding candidates."} />

      <Panel style={{ padding: "18px 22px", marginBottom: 20, background: C.navy, border: "none", display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <RefreshCw size={20} color={C.navy} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, color: "#9AA0BE", letterSpacing: 0.3 }}>AUTOMATION IMPACT</div>
          <div style={{ fontFamily: HEAD, fontSize: 17, fontWeight: 600, color: "#fff", marginTop: 2 }}>
            {autoProcessed} resume{autoProcessed === 1 ? "" : "s"} auto-processed via WhatsApp / bulk ingestion — an estimated <span style={{ color: C.gold }}>{hoursSaved} hours</span> of manual screening saved
          </div>
        </div>
        <GhostBtn icon={ArrowRight} style={{ borderColor: "#2A3050", color: "#fff" }} onClick={() => setActiveModule("ingestion")}>Ingest more</GhostBtn>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {metrics.map((m) => (
          <Panel key={m.label} style={{ padding: "18px 18px" }}>
            <div style={{ fontFamily: HEAD, fontSize: 32, fontWeight: 600, color: C.ink }}>{m.value}</div>
            <div style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft, marginTop: 4 }}>{m.label}</div>
            <div style={{ fontFamily: BODY, fontSize: 11.5, color: C.gold, marginTop: 6 }}>{m.sub}</div>
          </Panel>
        ))}
      </div>

      <Panel style={{ padding: "20px 20px 8px", marginBottom: 20 }}>
        <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 15.5, marginBottom: 4 }}>Candidate journey</div>
        <div style={{ fontFamily: BODY, fontSize: 12, color: C.faint, marginBottom: 4 }}>Node size reflects how many candidates are currently at or past that stage</div>
        <JourneyDiagram funnel={funnel} />
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel style={{ padding: 20 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 15.5, marginBottom: 14 }}>Pipeline funnel</div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={funnel} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} />
              <XAxis dataKey="stage" tick={{ fontFamily: BODY, fontSize: 11.5, fill: C.inkSoft }} axisLine={{ stroke: C.line }} tickLine={false} />
              <YAxis tick={{ fontFamily: BODY, fontSize: 11.5, fill: C.inkSoft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontFamily: BODY, fontSize: 12.5, borderRadius: 8, border: `1px solid ${C.line}` }} />
              <Bar dataKey="count" fill={C.gold} radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel style={{ padding: 20 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 15.5, marginBottom: 14 }}>Sourcing channels</div>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={sourceData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={78} paddingAngle={2}>
                {sourceData.map((entry, i) => <Cell key={entry.name} fill={pieColors[i % pieColors.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontFamily: BODY, fontSize: 12.5, borderRadius: 8, border: `1px solid ${C.line}` }} />
              <Legend wrapperStyle={{ fontFamily: BODY, fontSize: 11.5 }} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Panel style={{ padding: 20 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 15.5, marginBottom: 14 }}>Time-to-hire trend</div>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={trend} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} />
              <XAxis dataKey="month" tick={{ fontFamily: BODY, fontSize: 11.5, fill: C.inkSoft }} axisLine={{ stroke: C.line }} tickLine={false} />
              <YAxis tick={{ fontFamily: BODY, fontSize: 11.5, fill: C.inkSoft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontFamily: BODY, fontSize: 12.5, borderRadius: 8, border: `1px solid ${C.line}` }} />
              <Line type="monotone" dataKey="days" stroke={C.teal} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel style={{ padding: 20 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 15.5, marginBottom: 14 }}>Talent-pool skill density</div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={topSkills} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} horizontal={false} />
              <XAxis type="number" tick={{ fontFamily: BODY, fontSize: 11, fill: C.inkSoft }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="skill" width={90} tick={{ fontFamily: BODY, fontSize: 11.5, fill: C.inkSoft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontFamily: BODY, fontSize: 12.5, borderRadius: 8, border: `1px solid ${C.line}` }} />
              <Bar dataKey="count" fill={C.navy} radius={[0,5,5,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
        <GhostBtn icon={ArrowRight} onClick={() => setActiveModule("matching")}>Go to Matching & Scoring</GhostBtn>
        <GhostBtn icon={ArrowRight} onClick={() => setActiveModule("ingestion")}>Go to Resume Ingestion</GhostBtn>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* MODULE: NL SEARCH                                                       */
/* ---------------------------------------------------------------------- */

function NLSearch({ candidates, onOpenCandidate }) {
  const [q, setQ] = useState("react developers with 4+ years in Bengaluru");
  const [filters, setFilters] = useState(null);

  const run = () => setFilters(parseNLQuery(q));

  const results = useMemo(() => {
    if (!filters) return [];
    return candidates.filter((c) => {
      if (filters.skills.length && !filters.skills.every((s) => c.skills.includes(s))) return false;
      if (filters.minYears && c.exp < filters.minYears) return false;
      if (filters.location && c.location !== filters.location) return false;
      return true;
    });
  }, [filters, candidates]);

  return (
    <div>
      <SectionTitle eyebrow="Module 11" title="Natural Language Candidate Search"
        desc="Search your pool the way you'd brief a colleague. Filters for skills, experience and location are interpreted automatically." />

      <Panel style={{ padding: 16, display: "flex", gap: 10, marginBottom: 16 }}>
        <Search size={18} style={{ color: C.faint, marginTop: 10 }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder="e.g. NLP engineers with 5+ years in Hyderabad"
          style={{ flex: 1, border: "none", outline: "none", fontFamily: BODY, fontSize: 14.5, padding: "10px 0" }} />
        <PrimaryBtn onClick={run}>Search</PrimaryBtn>
      </Panel>

      {filters && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ fontFamily: BODY, fontSize: 12, color: C.faint }}>Interpreted as:</span>
          {filters.skills.map((s) => <Chip key={s} tone="matched" small>{s}</Chip>)}
          {filters.minYears && <Chip tone="gold" small>{filters.minYears}+ yrs</Chip>}
          {filters.location && <Chip tone="nice" small><MapPin size={10}/>{filters.location}</Chip>}
          {!filters.skills.length && !filters.minYears && !filters.location && <Chip small>No filters recognized — showing nothing</Chip>}
          <span style={{ fontFamily: BODY, fontSize: 12, color: C.faint, marginLeft: 4 }}>· {results.length} match{results.length !== 1 ? "es" : ""}</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {results.map((c) => (
          <Panel key={c.id} style={{ padding: 16, cursor: "pointer" }} onClick={() => onOpenCandidate(c)}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 16 }}>{c.name}</div>
                <div style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft }}>{c.title} · {c.location} · {c.exp} yrs</div>
              </div>
              <Chip small tone="neutral" style={{ background: STATUS_COLOR[c.status]?.bg }}>{c.status}</Chip>
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
              {c.skills.slice(0, 6).map((s) => <Chip key={s} small>{s}</Chip>)}
            </div>
          </Panel>
        ))}
      </div>
      {filters && results.length === 0 && <EmptyState icon={Search} text="No candidates match that search yet." />}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* MODULE: MATCHING & EXPLAINABLE SCORING                                  */
/* ---------------------------------------------------------------------- */

function downloadCSV(filename, rows) {
  const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = rows.map((row) => row.map(escape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function Matching({ candidates, jobs, jobId, setJobId, onOpenCandidate }) {
  const job = jobs.find((j) => j.id === jobId) || jobs[0];
  const [expanded, setExpanded] = useState(null);

  const ranked = useMemo(() => {
    return candidates.map((c) => ({ c, m: computeMatch(c, job) })).sort((a, b) => b.m.overall - a.m.overall);
  }, [candidates, job]);

  const exportShortlist = () => {
    const rows = [
      ["Name", "Score", "Location", "Experience (yrs)", "Matched skills", "Missing skills", "Status"],
      ...ranked.map(({ c, m }) => [c.name, m.overall, c.location, c.exp, m.matched.join("; "), m.missing.join("; "), c.status]),
    ];
    downloadCSV(`shortlist-${job.title.replace(/\s+/g, "-").toLowerCase()}.csv`, rows);
  };

  return (
    <div>
      <SectionTitle eyebrow="Modules 03 · 04" title="Hybrid Matching & Explainable Scoring"
        desc="Every score blends keyword coverage of required skills with experience fit, and shows exactly why a candidate ranks where they do." />

      <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft }}>Ranking against:</span>
          <select value={jobId} onChange={(e) => setJobId(e.target.value)} style={{
            border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: BODY, fontSize: 13, background: C.panel,
          }}>
            {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}{j.company ? " · " + j.company : ""}</option>)}
          </select>
        </div>
        <GhostBtn icon={FileText} onClick={exportShortlist}>Export shortlist (CSV)</GhostBtn>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ranked.map(({ c, m }) => (
          <Panel key={c.id} style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <ScoreRing value={m.overall} />
              <div style={{ flex: 1, cursor: "pointer" }} onClick={() => onOpenCandidate(c)}>
                <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 16.5 }}>{c.name}</div>
                <div style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft }}>{c.title} · {c.location} · {c.exp} yrs</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
                  {m.matched.map((s) => <Chip key={s} tone="matched" small>{s}</Chip>)}
                  {m.missing.map((s) => <Chip key={s} tone="missing" small>{s}</Chip>)}
                </div>
              </div>
              <GhostBtn icon={expanded === c.id ? ChevronUp : ChevronDown}
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                {expanded === c.id ? "Hide" : "Why this score"}
              </GhostBtn>
            </div>

            {expanded === c.id && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.line}`, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 24 }}>
                <div>
                  <MetricBar label="Skill match" value={m.skillScore} color={C.gold} />
                  <MetricBar label="Experience fit" value={m.expScore} color={C.teal} />
                  <MetricBar label="Education match" value={m.eduScore} color={C.green} />
                </div>
                <div style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft, lineHeight: 1.7 }}>
                  Matches <strong style={{ color: C.ink }}>{m.matched.length} of {job.required.length}</strong> required
                  skills ({m.matched.join(", ") || "none"}){m.missing.length > 0 && <> — missing <strong style={{ color: C.red }}>{m.missing.join(", ")}</strong></>}.
                  {" "}Has <strong style={{ color: C.ink }}>{c.exp} years</strong> of experience against a target range
                  of <strong style={{ color: C.ink }}>{job.minExp}–{job.maxExp} years</strong>{m.expScore === 100 ? " — squarely in range." : m.expScore < 100 && c.exp < job.minExp ? " — below target, worth a screen on depth." : " — above target, may be over-qualified for scope."}
                  {m.matchedNice.length > 0 && <> Also brings bonus strength in <strong style={{ color: C.teal }}>{m.matchedNice.join(", ")}</strong>.</>}
                </div>
              </div>
            )}
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* MODULE: SKILL GAP ANALYSIS                                              */
/* ---------------------------------------------------------------------- */

const UPSKILL = {
  "GraphQL": "Apollo Client crash course + build one query-driven feature",
  "TypeScript": "Migrate one existing JS module to strict TypeScript",
  "Kubernetes": "CKA prep track — focus on deployments & services",
  "Terraform": "HashiCorp Terraform Associate learning path",
  "NLP": "Hugging Face NLP course, chapters 1–4",
  "PyTorch": "Fast.ai practical deep learning course",
  "AWS": "AWS Solutions Architect Associate — core services module",
  "Docker": "Docker fundamentals + multi-stage build workshop",
  "CI/CD": "Build a pipeline in GitHub Actions end to end",
  "Tailwind CSS": "Rebuild one screen using Tailwind utility classes",
  "Microservices": "Service decomposition workshop on a sample monolith",
};

/* ---------------------------------------------------------------------- */
/* MODULE: RESUME INGESTION (local parsing — no external API, no server)  */
/* ---------------------------------------------------------------------- */

function parseResumeTextLocally(text) {
  const firstLine = text.split("\n").map((l) => l.trim()).filter(Boolean)[0] || "Unnamed Candidate";
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  const phoneMatch = text.match(/(\+?\d[\d\s-]{8,14}\d)/);
  const skills = ALL_SKILLS.filter((s) => text.toLowerCase().includes(s.toLowerCase()));
  const expMatch = text.match(/(\d+)\+?\s*(?:years|yrs)/i);
  const location = CITIES.find((c) => text.toLowerCase().includes(c.toLowerCase())) || "—";
  const eduMatch = text.match(/\b(B\.?\s?Tech|B\.?\s?E|M\.?\s?Tech|MBA|B\.?\s?Sc|M\.?\s?S|Bachelor[^\n,]*|Master[^\n,]*)\b[^\n]*/i);
  return {
    name: firstLine.length < 60 ? firstLine : "Unnamed Candidate",
    email: emailMatch ? emailMatch[0] : "—",
    phone: phoneMatch ? phoneMatch[0].trim() : "—",
    skills,
    experience_years: expMatch ? parseInt(expMatch[1], 10) : 0,
    location,
    education: eduMatch ? eduMatch[0].trim() : "—",
  };
}

const WHATSAPP_NUMBER = "+91 99596 67164";

const INGESTION_NODES = [
  { key: "whatsapp", label: "WhatsApp Resume Ingestion", icon: MessageCircle, desc: "Resumes shared in the hiring WhatsApp group land here." },
  { key: "bulk", label: "Bulk Resume Ingestion", icon: Send, desc: "Multiple resumes pasted or uploaded at once through the portal." },
  { key: "inbound", label: "Resume Inbound Node", icon: FileText, desc: "Every incoming resume, from either source, is normalized here." },
  { key: "queue", label: "Resume Queue", icon: RefreshCw, desc: "Holds incoming resumes until they're picked up for processing." },
  { key: "processing", label: "Resume Processing Node", icon: Users, desc: "Extracts fields locally in-browser and adds the candidate to the pool." },
];

function IngestionHub({ onAddCandidate, setActiveModule }) {
  const [raw, setRaw] = useState("");
  const [queue, setQueue] = useState([]);
  const [processedCount, setProcessedCount] = useState(0);
  const [source, setSource] = useState("WhatsApp");

  const addToQueue = () => {
    const chunks = raw.split(/^-{3,}$/m).map((c) => c.trim()).filter(Boolean);
    if (chunks.length === 0) return;
    const items = chunks.map((text, i) => ({ id: Date.now() + i, text, status: "Queued" }));
    setQueue((prev) => [...prev, ...items]);
    setRaw("");
  };

  const processQueue = () => {
    const toProcess = queue.filter((q) => q.status === "Queued");
    if (toProcess.length === 0) return;
    toProcess.forEach((item) => {
      const parsed = parseResumeTextLocally(item.text);
      onAddCandidate(parsed, source === "WhatsApp" ? "WhatsApp" : "Bulk Upload");
    });
    setQueue((prev) => prev.map((q) => (q.status === "Queued" ? { ...q, status: "Done" } : q)));
    setProcessedCount((n) => n + toProcess.length);
  };

  const queuedCount = queue.filter((q) => q.status === "Queued").length;

  return (
    <div>
      <SectionTitle eyebrow="Module 01" title="Resume Ingestion"
        desc="Resumes flow in from WhatsApp or bulk upload, land in a queue, and get parsed entirely in your browser — no external API calls, so there's nothing to rate-limit or go down no matter how many come in at once." />

      <Panel style={{ padding: 20, marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 46, height: 46, borderRadius: 10, background: C.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <MessageCircle size={22} color={C.green} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: BODY, fontSize: 11, color: C.faint, fontWeight: 700 }}>WHATSAPP RESUME GROUP (DEMO)</div>
          <div style={{ fontFamily: HEAD, fontSize: 20, fontWeight: 600, color: C.ink }}>{WHATSAPP_NUMBER}</div>
          <div style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft, marginTop: 2 }}>
            Share this number with your hiring group — resumes posted there are treated as inbound to the pipeline below.
            This build simulates ingestion locally; connecting a live number requires the WhatsApp Business API and a backend webhook.
          </div>
        </div>
      </Panel>

      <Panel style={{ padding: "20px 20px 24px", marginBottom: 16 }}>
        <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 15.5, marginBottom: 16 }}>Pipeline</div>
        <div style={{ display: "flex", alignItems: "stretch", gap: 8, flexWrap: "wrap" }}>
          {INGESTION_NODES.map((n, i) => {
            const Icon = n.icon;
            return (
              <React.Fragment key={n.key}>
                <div style={{ flex: "1 1 150px", background: C.page, border: `1px solid ${C.line}`, borderRadius: 10, padding: 14 }}>
                  <Icon size={17} color={C.gold} />
                  <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12.5, color: C.ink, marginTop: 8 }}>{n.label}</div>
                  <div style={{ fontFamily: BODY, fontSize: 11, color: C.faint, marginTop: 4, lineHeight: 1.4 }}>{n.desc}</div>
                </div>
                {i < INGESTION_NODES.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", color: C.faint }}><ArrowRight size={16} /></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Panel style={{ padding: 18 }}>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12.5, color: C.inkSoft, marginBottom: 10 }}>BULK RESUME INGESTION</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {["WhatsApp", "Portal Upload"].map((s) => (
              <button key={s} onClick={() => setSource(s)} style={{
                border: `1px solid ${source === s ? C.gold : C.line}`, borderRadius: 999, padding: "5px 12px",
                fontFamily: BODY, fontSize: 12, cursor: "pointer", background: source === s ? C.goldSoft : "transparent",
                color: source === s ? C.gold : C.inkSoft, fontWeight: 600,
              }}>{s}</button>
            ))}
          </div>
          <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={10}
            placeholder={"Paste one or more resumes. Separate multiple resumes with a line of three dashes:\n\nJohn Doe\njohn@mail.com | +91 90000 00000 | Pune\n5 years experience, React, Node.js, AWS\nB.Tech, Computer Science\n\n---\n\nNext resume here..."}
            style={{ width: "100%", border: `1px solid ${C.line}`, borderRadius: 8, padding: 12, fontFamily: MONO, fontSize: 12, resize: "vertical", boxSizing: "border-box" }} />
          <PrimaryBtn icon={Plus} style={{ marginTop: 12 }} onClick={addToQueue}>Add to queue</PrimaryBtn>
        </Panel>

        <Panel style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12.5, color: C.inkSoft }}>RESUME QUEUE ({queuedCount} waiting)</div>
            <PrimaryBtn icon={RefreshCw} onClick={processQueue} disabled={queuedCount === 0}>Process queue</PrimaryBtn>
          </div>
          {queue.length === 0 && <EmptyState icon={FileText} text="Queued resumes will appear here." />}
          <div style={{ maxHeight: 320, overflowY: "auto" }}>
            {queue.slice().reverse().map((q) => (
              <div key={q.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.line}` }}>
                <div style={{ fontFamily: BODY, fontSize: 12.5, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>
                  {q.text.split("\n")[0] || "Untitled resume"}
                </div>
                <Chip small tone={q.status === "Done" ? "matched" : "gold"}>{q.status}</Chip>
              </div>
            ))}
          </div>
          {processedCount > 0 && (
            <div style={{ fontFamily: BODY, fontSize: 11.5, color: C.green, marginTop: 10 }}>
              <CheckCircle2 size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />
              {processedCount} resume{processedCount === 1 ? "" : "s"} processed and added to the candidate pool.
            </div>
          )}
        </Panel>
      </div>

      <GhostBtn icon={ArrowRight} style={{ marginTop: 16 }} onClick={() => setActiveModule("nlsearch")}>View candidate pool</GhostBtn>
    </div>
  );
}

function SkillGap({ candidates, jobs }) {
  const [jobId, setJobId] = useState(jobs[0].id);
  const [candId, setCandId] = useState(candidates[0].id);
  const job = jobs.find((j) => j.id === jobId);
  const cand = candidates.find((c) => c.id === Number(candId)) || candidates.find(c=>c.id===candId);
  const m = computeMatch(cand, job);
  const allReq = [...job.required, ...job.nice];

  return (
    <div>
      <SectionTitle eyebrow="Module 08" title="Skill Gap Analysis"
        desc="Compare one candidate against a role's requirements to see precisely what's missing — and what closing that gap would take." />

      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <select value={candId} onChange={(e) => setCandId(Number(e.target.value))} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: BODY, fontSize: 13 }}>
          {candidates.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={jobId} onChange={(e) => setJobId(e.target.value)} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: BODY, fontSize: 13 }}>
          {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Panel style={{ padding: 18 }}>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12.5, color: C.inkSoft, marginBottom: 10 }}>REQUIREMENT COVERAGE</div>
          {allReq.map((s) => {
            const has = cand.skills.includes(s);
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${C.line}` }}>
                {has ? <CheckCircle2 size={16} color={C.green} /> : <XCircle size={16} color={C.red} />}
                <span style={{ fontFamily: BODY, fontSize: 13.5, color: C.ink }}>{s}</span>
                {!job.required.includes(s) && <span style={{ fontFamily: BODY, fontSize: 11, color: C.faint }}>(nice to have)</span>}
              </div>
            );
          })}
        </Panel>

        <Panel style={{ padding: 18 }}>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12.5, color: C.inkSoft, marginBottom: 10 }}>CLOSING THE GAP</div>
          {m.missing.length === 0 ? (
            <EmptyState icon={CheckCircle2} text={`${cand.name} covers every required skill for this role.`} />
          ) : m.missing.map((s) => (
            <div key={s} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <AlertTriangle size={14} color={C.amber} />
                <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 13.5 }}>{s}</span>
              </div>
              <div style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft, marginTop: 3, marginLeft: 20 }}>
                {UPSKILL[s] || `Targeted upskilling recommended in ${s} before placement.`}
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* MODULE: SIMILAR CANDIDATES                                              */
/* ---------------------------------------------------------------------- */

function SimilarCandidates({ candidates, onOpenCandidate }) {
  const [anchorId, setAnchorId] = useState(candidates[0].id);
  const anchor = candidates.find((c) => c.id === anchorId);

  const similar = useMemo(() => {
    return candidates.filter((c) => c.id !== anchorId)
      .map((c) => ({ c, sim: cosineSim(anchor.skills, c.skills) }))
      .sort((a, b) => b.sim - a.sim)
      .slice(0, 5);
  }, [anchorId, candidates]);

  return (
    <div>
      <SectionTitle eyebrow="Module 09" title="Similar Candidate Finder"
        desc="Pick any candidate to surface others in the pool with the closest skill profile, ranked by cosine similarity across skill vectors." />

      <select value={anchorId} onChange={(e) => setAnchorId(Number(e.target.value))} style={{
        border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: BODY, fontSize: 13, marginBottom: 18,
      }}>
        {candidates.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.title}</option>)}
      </select>

      <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 16 }}>
        <Panel style={{ padding: 18 }}>
          <div style={{ fontFamily: BODY, fontSize: 11, color: C.faint, marginBottom: 6 }}>ANCHOR</div>
          <div style={{ fontFamily: HEAD, fontSize: 18, fontWeight: 600 }}>{anchor.name}</div>
          <div style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft }}>{anchor.title} · {anchor.location}</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
            {anchor.skills.map((s) => <Chip key={s} tone="gold" small>{s}</Chip>)}
          </div>
        </Panel>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {similar.map(({ c, sim }) => (
            <Panel key={c.id} style={{ padding: 14, display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }} onClick={() => onOpenCandidate(c)}>
              <ScoreRing value={Math.round(sim * 100)} size={46} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 15 }}>{c.name}</div>
                <div style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft }}>{c.title} · {c.location}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 6 }}>
                  {c.skills.filter((s) => anchor.skills.includes(s)).map((s) => <Chip key={s} tone="matched" small>{s}</Chip>)}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* MODULE: REDISCOVERY                                                     */
/* ---------------------------------------------------------------------- */

function Rediscovery({ candidates, jobs, onOpenCandidate }) {
  const [jobId, setJobId] = useState(jobs[0].id);
  const job = jobs.find((j) => j.id === jobId);
  const pool = candidates.filter((c) => ["Pool", "Rejected"].includes(c.status));

  const ranked = useMemo(() => pool.map((c) => ({ c, m: computeMatch(c, job) }))
    .filter(({ m }) => m.overall >= 40)
    .sort((a, b) => b.m.overall - a.m.overall), [pool, job]);

  return (
    <div>
      <SectionTitle eyebrow="Module 05" title="Candidate Rediscovery"
        desc="Surface strong-fit candidates already sitting in your pool from past requisitions — before you spend budget sourcing new ones." />

      <select value={jobId} onChange={(e) => setJobId(e.target.value)} style={{
        border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: BODY, fontSize: 13, marginBottom: 18,
      }}>
        {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
      </select>

      {ranked.length === 0 && <EmptyState icon={RefreshCw} text="No strong rediscovery matches in the pool for this role yet." />}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ranked.map(({ c, m }) => (
          <Panel key={c.id} style={{ padding: 16, display: "flex", gap: 16, alignItems: "center", cursor: "pointer" }} onClick={() => onOpenCandidate(c)}>
            <ScoreRing value={m.overall} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 16 }}>{c.name}</div>
                <Chip tone="gold" small>Previously: {c.appliedFor}</Chip>
              </div>
              <div style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft, marginTop: 2 }}>{c.title} · {c.location} · {c.exp} yrs</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
                {m.matched.map((s) => <Chip key={s} tone="matched" small>{s}</Chip>)}
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* MODULE: CANDIDATE TRACKING / HISTORY                                    */
/* ---------------------------------------------------------------------- */

const STAGES_ORDER = ["New","Screened","Interviewing","Offered","Hired"];

function Tracking({ candidates, candId, setCandId }) {
  const cand = candidates.find((c) => c.id === candId) || candidates[0];

  return (
    <div>
      <SectionTitle eyebrow="Module 06" title="Candidate History & Tracking"
        desc="A full timeline of every touchpoint — screens, interviews, offers — so nothing about a candidate's journey gets lost." />

      <select value={cand.id} onChange={(e) => setCandId(Number(e.target.value))} style={{
        border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: BODY, fontSize: 13, marginBottom: 18,
      }}>
        {candidates.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <Panel style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontFamily: HEAD, fontSize: 20, fontWeight: 600 }}>{cand.name}</div>
            <div style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft }}>{cand.title} · {cand.location} · Applied for {cand.appliedFor}</div>
          </div>
          <Chip style={{ background: STATUS_COLOR[cand.status]?.bg, color: STATUS_COLOR[cand.status]?.fg }}>{cand.status}</Chip>
        </div>

        {STAGES_ORDER.includes(cand.status) && (
          <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            {STAGES_ORDER.map((s, i) => {
              const reached = STAGES_ORDER.indexOf(cand.status) >= i;
              return (
                <React.Fragment key={s}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 999, background: reached ? C.gold : C.line }} />
                    <span style={{ fontFamily: BODY, fontSize: 11, color: reached ? C.ink : C.faint }}>{s}</span>
                  </div>
                  {i < STAGES_ORDER.length - 1 && <div style={{ flex: 1, height: 2, background: STAGES_ORDER.indexOf(cand.status) > i ? C.gold : C.line, marginBottom: 18 }} />}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </Panel>

      <Panel style={{ padding: 20 }}>
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12.5, color: C.inkSoft, marginBottom: 14 }}>TIMELINE</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {cand.history.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CircleDot size={16} color={C.gold} />
                {i < cand.history.length - 1 && <div style={{ width: 2, flex: 1, background: C.line, minHeight: 30 }} />}
              </div>
              <div style={{ paddingBottom: 20 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 13.5 }}>{h.stage}</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: C.faint }}>{h.date}</span>
                </div>
                <div style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft, marginTop: 2 }}>{h.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* MODULE: OUTREACH                                                        */
/* ---------------------------------------------------------------------- */

const TEMPLATES = {
  "Interview invite": (c) => `Hi ${c.name.split(" ")[0]}, thanks for applying for ${c.appliedFor}! We'd love to set up a first conversation — do you have 30 minutes this week?`,
  "Follow-up": (c) => `Hi ${c.name.split(" ")[0]}, just following up on your application for ${c.appliedFor}. We're finishing up screens this week and will update you shortly.`,
  "Offer": (c) => `Hi ${c.name.split(" ")[0]}, wonderful news — we'd like to extend you an offer for ${c.appliedFor}! I'll send the formal letter shortly, but wanted to share the news directly first.`,
  "Rejection": (c) => `Hi ${c.name.split(" ")[0]}, thank you for the time you invested in interviewing for ${c.appliedFor}. We've decided to move forward with another candidate, but we'd like to keep your profile for future roles.`,
};

function Outreach({ candidates }) {
  const [candId, setCandId] = useState(candidates[0].id);
  const [channel, setChannel] = useState("Email");
  const [template, setTemplate] = useState("Interview invite");
  const cand = candidates.find((c) => c.id === candId);
  const [body, setBody] = useState(TEMPLATES["Interview invite"](cand));
  const [sent, setSent] = useState([]);

  useEffect(() => { setBody(TEMPLATES[template](cand)); }, [template, candId]);

  const send = () => {
    setSent([{ id: Date.now(), name: cand.name, channel, template, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...sent]);
  };

  return (
    <div>
      <SectionTitle eyebrow="Module 07" title="WhatsApp / Email Outreach"
        desc="Compose and send candidate messages from templates — personalized automatically with role and name." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Panel style={{ padding: 18 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <select value={candId} onChange={(e) => setCandId(Number(e.target.value))} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: BODY, fontSize: 13 }}>
              {candidates.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div style={{ display: "flex", border: `1px solid ${C.line}`, borderRadius: 8, overflow: "hidden" }}>
              {["Email", "WhatsApp"].map((ch) => (
                <button key={ch} onClick={() => setChannel(ch)} style={{
                  border: "none", padding: "8px 14px", fontFamily: BODY, fontSize: 13, cursor: "pointer",
                  background: channel === ch ? C.navy : "transparent", color: channel === ch ? "#fff" : C.ink,
                  display: "flex", alignItems: "center", gap: 6,
                }}>{ch === "Email" ? <Mail size={13}/> : <MessageCircle size={13}/>}{ch}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {Object.keys(TEMPLATES).map((t) => (
              <button key={t} onClick={() => setTemplate(t)} style={{
                border: `1px solid ${template === t ? C.gold : C.line}`, borderRadius: 999, padding: "6px 12px",
                fontFamily: BODY, fontSize: 12, cursor: "pointer", background: template === t ? C.goldSoft : "transparent",
                color: template === t ? C.gold : C.inkSoft, fontWeight: 600,
              }}>{t}</button>
            ))}
          </div>

          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8}
            style={{ width: "100%", border: `1px solid ${C.line}`, borderRadius: 8, padding: 12, fontFamily: BODY, fontSize: 13.5, resize: "vertical", boxSizing: "border-box" }} />

          <PrimaryBtn icon={Send} style={{ marginTop: 12 }} onClick={send}>Send {channel === "Email" ? "email" : "WhatsApp message"}</PrimaryBtn>
        </Panel>

        <Panel style={{ padding: 18 }}>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12.5, color: C.inkSoft, marginBottom: 10 }}>SENT LOG</div>
          {sent.length === 0 && <EmptyState icon={Send} text="Messages you send will be logged here." />}
          {sent.map((s) => (
            <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.line}` }}>
              <div>
                <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13.5 }}>{s.name}</div>
                <div style={{ fontFamily: BODY, fontSize: 11.5, color: C.faint }}>{s.template} · {s.channel}</div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11.5, color: C.faint }}>{s.time}</div>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* CANDIDATE DRAWER                                                        */
/* ---------------------------------------------------------------------- */

function CandidateDrawer({ candidate, onClose }) {
  if (!candidate) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(16,20,37,0.35)" }} />
      <div style={{ position: "relative", width: 420, background: C.panel, height: "100%", padding: 26, overflowY: "auto", boxShadow: "-8px 0 24px rgba(0,0,0,0.08)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: C.faint }}><X size={20} /></button>
        <div style={{ fontFamily: HEAD, fontSize: 24, fontWeight: 600 }}>{candidate.name}</div>
        <div style={{ fontFamily: BODY, fontSize: 13.5, color: C.inkSoft, marginTop: 4 }}>{candidate.title}</div>
        <Chip style={{ marginTop: 10, background: STATUS_COLOR[candidate.status]?.bg, color: STATUS_COLOR[candidate.status]?.fg }}>{candidate.status}</Chip>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8, fontFamily: BODY, fontSize: 13, color: C.inkSoft }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Mail size={14} />{candidate.email}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Phone size={14} />{candidate.phone}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><MapPin size={14} />{candidate.location}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Briefcase size={14} />{candidate.exp} years experience</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><GraduationCap size={14} />{candidate.edu}</div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontFamily: BODY, fontSize: 11, color: C.faint, marginBottom: 6 }}>SKILLS</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {candidate.skills.map((s) => <Chip key={s} small>{s}</Chip>)}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ fontFamily: BODY, fontSize: 11, color: C.faint, marginBottom: 8 }}>RECENT ACTIVITY</div>
          {candidate.history.slice(-3).reverse().map((h, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${C.line}` }}>
              <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 12.5 }}>{h.stage} <span style={{ fontFamily: MONO, fontWeight: 400, color: C.faint, fontSize: 11 }}>· {h.date}</span></div>
              <div style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft, marginTop: 2 }}>{h.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* LOGIN PAGE                                                              */
/* ---------------------------------------------------------------------- */

function HiringIllustration() {
  const nodes = [
    { x: 90, y: 100, r: 17, fill: C.teal, op: 0.85 },
    { x: 322, y: 78, r: 13, fill: C.gold, op: 0.4 },
    { x: 66, y: 272, r: 19, fill: C.gold, op: 0.9 },
    { x: 330, y: 292, r: 15, fill: C.teal, op: 0.55 },
    { x: 205, y: 48, r: 11, fill: "#8890B0", op: 0.35 },
    { x: 210, y: 344, r: 14, fill: C.teal, op: 0.65 },
    { x: 350, y: 180, r: 10, fill: "#8890B0", op: 0.3 },
  ];
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ maxWidth: 420 }}>
      {nodes.map((n, i) => (
        <line key={i} x1={200} y1={200} x2={n.x} y2={n.y} stroke={C.gold} strokeWidth={2} strokeOpacity={n.op * 0.6} />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.fill} opacity={n.op} />
      ))}
      <circle cx={200} cy={200} r={30} fill={C.gold} />
      <circle cx={200} cy={200} r={30} fill="none" stroke="#fff" strokeOpacity={0.3} strokeWidth={2} />
    </svg>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) onLogin();
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: BODY, background: C.navy }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ flex: 1.1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <HiringIllustration />
        <div style={{ marginTop: 8, textAlign: "center", maxWidth: 380 }}>
          <div style={{ fontFamily: HEAD, fontSize: 21, fontWeight: 600, color: "#fff" }}>Every candidate, matched with reason</div>
          <div style={{ fontFamily: BODY, fontSize: 13, color: "#9AA0BE", marginTop: 8, lineHeight: 1.6 }}>
            Parse resumes, analyze roles, and score fit — with an explanation for every match.
          </div>
        </div>
      </div>

      <div style={{ width: 440, background: C.page, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 52px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 36 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAD, fontWeight: 700, color: C.navy, fontSize: 16 }}>S</div>
          <div>
            <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 16, color: C.ink, lineHeight: 1.15 }}>Softpal Technologies</div>
            <div style={{ fontFamily: MONO, fontSize: 9.5, color: C.faint, letterSpacing: 0.4 }}>PVT. LTD.</div>
          </div>
        </div>

        <div style={{ fontFamily: HEAD, fontSize: 25, fontWeight: 600, color: C.ink, marginBottom: 6 }}>Welcome back</div>
        <div style={{ fontFamily: BODY, fontSize: 13.5, color: C.inkSoft, marginBottom: 28 }}>Sign in to your recruiting workspace.</div>

        <div onKeyDown={(e) => e.key === "Enter" && submit(e)}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: C.inkSoft, marginBottom: 6 }}>EMAIL</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@softpal.com"
              style={{ width: "100%", border: `1px solid ${C.line}`, borderRadius: 8, padding: "11px 12px", fontFamily: BODY, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: C.inkSoft, marginBottom: 6 }}>PASSWORD</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width: "100%", border: `1px solid ${C.line}`, borderRadius: 8, padding: "11px 12px", fontFamily: BODY, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <PrimaryBtn onClick={submit} style={{ width: "100%", justifyContent: "center", padding: "12px 16px" }}>Sign in</PrimaryBtn>
        </div>

        <div style={{ fontFamily: BODY, fontSize: 11.5, color: C.faint, marginTop: 20, textAlign: "center" }}>
          Demo build — any email and password will do.
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* APP SHELL                                                               */
/* ---------------------------------------------------------------------- */

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, mod: "10" },
  { id: "ingestion", label: "Resume Ingestion", icon: MessageCircle, mod: "01" },
  { id: "nlsearch", label: "Candidate Search", icon: Search, mod: "11" },
  { id: "matching", label: "Matching & Scoring", icon: Target, mod: "03·04" },
  { id: "gap", label: "Skill Gap Analysis", icon: AlertTriangle, mod: "08" },
  { id: "similar", label: "Similar Candidates", icon: Users, mod: "09" },
  { id: "rediscovery", label: "Rediscovery", icon: RefreshCw, mod: "05" },
  { id: "tracking", label: "Candidate Tracking", icon: History, mod: "06" },
  { id: "outreach", label: "Outreach", icon: Send, mod: "07" },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [candidates, setCandidates] = useState(CANDIDATES_INIT);
  const [jobs, setJobs] = useState(JOBS_INIT);
  const [jobId, setJobId] = useState(JOBS_INIT[0].id);
  const [trackId, setTrackId] = useState(CANDIDATES_INIT[0].id);
  const [drawerCand, setDrawerCand] = useState(null);

  const addCandidate = (parsed, source = "Bulk Upload") => {
    const nc = {
      id: Date.now() + Math.round(Math.random() * 1000),
      name: parsed.name || "New Candidate",
      title: (parsed.skills && parsed.skills[0]) ? `${parsed.skills[0]} Engineer` : "Candidate",
      location: parsed.location || "—",
      exp: parsed.experience_years || 0,
      skills: (parsed.skills || []).filter((s) => ALL_SKILLS.includes(s)).length ? parsed.skills.filter((s) => ALL_SKILLS.includes(s)) : (parsed.skills || []),
      edu: parsed.education || "—",
      email: parsed.email || "—",
      phone: parsed.phone || "—",
      source,
      status: "New",
      appliedFor: "Unassigned",
      history: [{ date: new Date().toISOString().slice(0,10), stage: "New", note: `Ingested via ${source} and parsed locally.` }],
    };
    setCandidates((prev) => [nc, ...prev]);
  };

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  return (
    <div style={{ fontFamily: BODY, background: C.page, minHeight: "100vh", color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        select { outline: none; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: #D7D5CB; border-radius: 8px; }
      `}</style>

      <div style={{ display: "flex" }}>
        {/* SIDEBAR */}
        <div style={{ width: 240, background: C.navy, minHeight: "100vh", padding: "22px 14px", position: "sticky", top: 0, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 10px", marginBottom: 26 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAD, fontWeight: 700, color: C.navy, fontSize: 15 }}>S</div>
            <div>
              <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 15.5, color: "#fff", lineHeight: 1.15 }}>Softpal Technologies</div>
              <div style={{ fontFamily: MONO, fontSize: 9.5, color: "#8890B0", letterSpacing: 0.4 }}>PVT. LTD.</div>
            </div>
          </div>

          {NAV.map((n) => {
            const Icon = n.icon;
            const active = activeModule === n.id;
            return (
              <button key={n.id} onClick={() => setActiveModule(n.id)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", marginBottom: 3,
                background: active ? C.navySoft : "transparent", border: "none", borderRadius: 8, cursor: "pointer",
                borderLeft: active ? `2px solid ${C.gold}` : "2px solid transparent",
              }}>
                <Icon size={15} color={active ? C.gold : "#9AA0BE"} />
                <span style={{ fontFamily: BODY, fontSize: 13, fontWeight: active ? 600 : 500, color: active ? "#fff" : "#B4B9D2", flex: 1, textAlign: "left" }}>{n.label}</span>
                <span style={{ fontFamily: MONO, fontSize: 9.5, color: "#5B6188" }}>{n.mod}</span>
              </button>
            );
          })}

          <div style={{ marginTop: 24, padding: 14, background: C.navySoft, borderRadius: 10, border: `1px solid ${C.navyLine}` }}>
            <div style={{ fontFamily: BODY, fontSize: 11.5, color: "#9AA0BE", lineHeight: 1.5 }}>
              <strong style={{ color: "#fff" }}>{candidates.length}</strong> candidates ·{" "}
              <strong style={{ color: "#fff" }}>{jobs.length}</strong> open roles
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, padding: "30px 40px", maxWidth: 1280 }}>
          {activeModule === "dashboard" && <Dashboard candidates={candidates} jobs={jobs} setActiveModule={setActiveModule} />}
          {activeModule === "ingestion" && <IngestionHub onAddCandidate={addCandidate} setActiveModule={setActiveModule} />}
          {activeModule === "nlsearch" && <NLSearch candidates={candidates} onOpenCandidate={setDrawerCand} />}
          {activeModule === "matching" && <Matching candidates={candidates} jobs={jobs} jobId={jobId} setJobId={setJobId} onOpenCandidate={setDrawerCand} />}
          {activeModule === "gap" && <SkillGap candidates={candidates} jobs={jobs} />}
          {activeModule === "similar" && <SimilarCandidates candidates={candidates} onOpenCandidate={setDrawerCand} />}
          {activeModule === "rediscovery" && <Rediscovery candidates={candidates} jobs={jobs} onOpenCandidate={setDrawerCand} />}
          {activeModule === "tracking" && <Tracking candidates={candidates} candId={trackId} setCandId={setTrackId} />}
          {activeModule === "outreach" && <Outreach candidates={candidates} />}
        </div>
      </div>

      <CandidateDrawer candidate={drawerCand} onClose={() => setDrawerCand(null)} />
    </div>
  );
}
