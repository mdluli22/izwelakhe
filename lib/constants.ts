export type Service = {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  desc: string;
  items: string[];
};

export type Stat = { num: string; label: string };
export type WhyItem = { icon: string; title: string; body: string };
export type Industry = { name: string; detail: string };
export type ProcessStep = { step: string; title: string; body: string };
export type Project = { title: string; sector: string; body: string; metric: string };

export const SERVICES: Service[] = [
  {
    id: "consulting",
    icon: "◈",
    title: "Business Consulting",
    tagline: "STRATEGY · GROWTH · RESULTS",
    desc: "We help South African businesses and entrepreneurs define clear strategic direction, improve operations, and create sustainable growth plans tailored to local market realities.",
    items: ["Strategic Planning", "Business Development", "Market Expansion", "Performance Frameworks", "Organisational Growth"],
    
  },
  {
    id: "construction",
    icon: "◉",
    title: "Construction & Maintenance",
    tagline: "BUILD · MAINTAIN · UPGRADE",
    desc: "From civil works to interior carpentry, we deliver reliable, cost-effective construction and property maintenance services across residential and commercial assets.",
    items: ["Civil Maintenance & Repairs", "Property Renovations", "Renovations & Improvements", "Interior Carpentry Work"],
  },
  {
    id: "property",
    icon: "◎",
    title: "Property Development",
    tagline: "DEVELOP · MANAGE · OPTIMISE",
    desc: "We develop and manage accommodation solutions across the spectrum—student housing, short-term lets, and long-term residential rentals that generate lasting income.",
    items: ["Student Accommodation", "Short-Term Rentals", "Long-Term Residential", "Rental Optimisation", "Property Acquisition"],
  },
];

// export const STATS: Stat[] = [
//   { num: "3", label: "Core Divisions" },
//   { num: "360°", label: "End-to-End Service" },
//   { num: "SA", label: "Market Focused" },
//   { num: "∞", label: "Long-Term Value" },
// ];

export const WHY: WhyItem[] = [
  { icon: "⬡", title: "Multi-Disciplinary", body: "Strategy, construction, and property under one roof — no coordination overhead." },
  { icon: "◈", title: "Real-World Execution", body: "Practical solutions built on proven, local market experience." },
  { icon: "◉", title: "Long-Term Mindset", body: "Every engagement is designed for sustained impact, not short-term gain." },
  { icon: "◎", title: "SA Market-Ready", body: "We understand South African economic realities and build solutions that fit them." },
];

export const NAV = ["Mission", "Capabilities", "Industries", "Process", "Contact"] as string[];

export const INDUSTRIES: Industry[] = [
  { name: "Infrastructure", detail: "Civil maintenance, upgrades, and practical delivery for assets that communities rely on." },
  { name: "Property", detail: "Student accommodation, residential rentals, short-term lets, and income-focused development." },
  { name: "Commercial", detail: "Construction, maintenance, and operational improvements for business environments." },
  { name: "Entrepreneurs", detail: "Strategy, market expansion, and performance frameworks for growing ventures." },
  { name: "Residential", detail: "Renovations, carpentry, and property improvements built for long-term value." },
  { name: "Public Realm", detail: "Practical solutions shaped around South African market realities and local needs." },
];

export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    body: "We clarify the opportunity, constraints, market context, and the value the work must create.",
  },
  {
    step: "02",
    title: "Design",
    body: "We shape a disciplined plan across strategy, construction, property, partners, budgets, and delivery risk.",
  },
  {
    step: "03",
    title: "Deliver",
    body: "We execute with practical coordination, clear accountability, and decisions grounded in the realities on site.",
  },
  {
    step: "04",
    title: "Support",
    body: "We stay close to performance after handover, helping assets and businesses keep improving over time.",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Student Accommodation Platform",
    sector: "Property Development",
    body: "Accommodation concepts designed around demand, management efficiency, and lasting rental income.",
    metric: "Income-ready assets",
  },
  {
    title: "Commercial Upgrade Programme",
    sector: "Construction & Maintenance",
    body: "Renovation, civil maintenance, and interior carpentry work coordinated for operating properties.",
    metric: "End-to-end delivery",
  },
  {
    title: "Growth Strategy Framework",
    sector: "Business Consulting",
    body: "Strategic planning, market expansion, and performance systems for South African entrepreneurs.",
    metric: "Local market fit",
  },
];

export const STATS: Stat[] = [
  { num: "3", label: "Integrated divisions" },
  { num: "360", label: "Delivery mindset" },
  { num: "4", label: "Process stages" },
  { num: "SA", label: "Market focus" },
];
