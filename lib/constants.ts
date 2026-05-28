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

export const NAV = ["About", "Services", "Why Us", "Contact"] as string[];
