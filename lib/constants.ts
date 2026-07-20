export type Service = {
  id: string;
  icon: string;
  image: string;
  title: string;
  tagline: string;
  desc: string;
  items: string[];
  overview: string;
  detailIntro: string;
  serviceAreas: { title: string; body: string }[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
};

export type Stat = { num: string; label: string };
export type WhyItem = { icon: string; title: string; body: string };
export type Industry = { name: string; detail: string; persona: string; image: string };
export type ProcessStep = { step: string; title: string; body: string };
export type Project = { title: string; sector: string; body: string; metric: string; image: string };

export const SERVICES: Service[] = [
  {
    id: "consulting",
    icon: "◈",
    image: "/capability-consulting.png",
    title: "Business Consulting",
    tagline: "STRATEGY · GROWTH · RESULTS",
    desc: "We help South African businesses and entrepreneurs define clear strategic direction, improve operations, and create sustainable growth plans tailored to local market realities.",
    items: ["Strategic Planning", "Business Development", "Market Expansion", "Performance Frameworks", "Organisational Growth"],
    overview: "Business consulting is the discipline of turning ambition into a clear, practical plan. Izwelakhe works with business owners, entrepreneurs, and leadership teams to understand where the organisation is, where it can grow, and what must change to get there.",
    detailIntro: "The work combines strategic thinking with execution support, so plans are not left as documents. We help define priorities, sharpen offers, improve operations, and build performance systems that suit the South African market.",
    serviceAreas: [
      {
        title: "Strategic direction",
        body: "We clarify business goals, market position, competitive advantage, and the steps required to move from current performance to sustainable growth.",
      },
      {
        title: "Business development",
        body: "We support opportunity identification, partnership thinking, customer acquisition planning, and practical routes into new markets.",
      },
      {
        title: "Performance frameworks",
        body: "We help teams measure what matters, set useful targets, and create operating rhythms that make progress visible.",
      },
    ],
    outcomes: ["Clearer growth priorities", "Practical market expansion plans", "Better decision-making structures", "Improved operational focus"],
    faqs: [
      {
        question: "Who is business consulting for?",
        answer: "It is suited to entrepreneurs, growing companies, and established teams that need clearer strategy, stronger operations, or support entering a new market.",
      },
      {
        question: "Do we need a fully formed business plan before engaging?",
        answer: "No. We can help shape the plan from an early idea, refine an existing plan, or diagnose why a current strategy is not delivering the expected results.",
      },
      {
        question: "What does the consulting process usually include?",
        answer: "Most engagements begin with discovery, then move into strategy design, priorities, implementation planning, and performance tracking.",
      },
    ],
  },
  {
    id: "construction",
    icon: "◉",
    image: "/capability-construction.png",
    title: "Construction & Maintenance",
    tagline: "BUILD · MAINTAIN · UPGRADE",
    desc: "From civil works to interior carpentry, we deliver reliable, cost-effective construction and property maintenance services across residential and commercial assets.",
    items: ["Civil Maintenance & Repairs", "Property Renovations", "Renovations & Improvements", "Interior Carpentry Work"],
    overview: "Construction and maintenance keep buildings, sites, and assets functional, safe, and ready for use. Izwelakhe provides practical building, repair, upgrade, and interior work for residential and commercial properties.",
    detailIntro: "This service is built around reliable delivery. We coordinate scope, materials, workmanship, timing, and on-site decisions so that repairs, renovations, and improvements are completed with care and cost awareness.",
    serviceAreas: [
      {
        title: "Civil maintenance and repairs",
        body: "We handle practical repairs and maintenance needs that protect the value, usability, and safety of built assets.",
      },
      {
        title: "Property renovations",
        body: "We upgrade spaces for better function, presentation, rental readiness, or commercial use, depending on the property objective.",
      },
      {
        title: "Interior carpentry",
        body: "We deliver interior woodwork and fitted improvements that help make spaces more useful, durable, and refined.",
      },
    ],
    outcomes: ["Reliable maintenance delivery", "Improved property condition", "Better tenant or user experience", "Longer asset life"],
    faqs: [
      {
        question: "What types of properties do you work on?",
        answer: "We support residential, commercial, and income-generating properties, including spaces that require repairs, renovations, or practical upgrades.",
      },
      {
        question: "Can you help with both small repairs and larger renovations?",
        answer: "Yes. The scope can range from focused maintenance tasks to coordinated renovations and improvements, depending on the condition and goal of the property.",
      },
      {
        question: "How is the work scoped before it starts?",
        answer: "We review the site, clarify the required outcome, assess constraints, and define a practical scope so cost, timing, and responsibilities are clear.",
      },
    ],
  },
  {
    id: "property",
    icon: "◎",
    image: "/capability-property.png",
    title: "Property Development",
    tagline: "DEVELOP · MANAGE · OPTIMISE",
    desc: "We develop and manage accommodation solutions across the spectrum—student housing, short-term lets, and long-term residential rentals that generate lasting income.",
    items: ["Student Accommodation", "Short-Term Rentals", "Long-Term Residential", "Rental Optimisation", "Property Acquisition"],
    overview: "Property development is the process of turning property opportunities into useful, income-generating assets. Izwelakhe focuses on accommodation models that can serve real demand and create long-term value.",
    detailIntro: "We look at property through both development and operating lenses. That means considering acquisition, market fit, renovation needs, rental strategy, tenant experience, and management from the beginning.",
    serviceAreas: [
      {
        title: "Student accommodation",
        body: "We shape accommodation concepts around location, demand, affordability, management efficiency, and student living needs.",
      },
      {
        title: "Short-term rentals",
        body: "We support short-stay property thinking, from space readiness to positioning and operational considerations.",
      },
      {
        title: "Long-term residential",
        body: "We help improve and manage residential rental assets with a focus on stability, tenant suitability, and dependable income.",
      },
    ],
    outcomes: ["Income-ready accommodation assets", "Sharper rental positioning", "Better acquisition and upgrade decisions", "Improved long-term asset value"],
    faqs: [
      {
        question: "What kind of property opportunities do you focus on?",
        answer: "We focus on accommodation-led opportunities, especially student housing, short-term rentals, and long-term residential rental assets.",
      },
      {
        question: "Can you assist before a property is purchased?",
        answer: "Yes. Early involvement can help assess fit, likely demand, upgrade requirements, operating assumptions, and income potential before acquisition.",
      },
      {
        question: "Do you only develop, or do you also help optimise existing properties?",
        answer: "We can support both. Existing properties can often be improved through better positioning, maintenance, renovation, rental strategy, and management practices.",
      },
    ],
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
  {
    name: "Infrastructure",
    detail: "Civil maintenance, upgrades, and practical delivery for assets that communities rely on.",
    persona: "The builder",
    image: "/capability-construction.png",
  },
  {
    name: "Property",
    detail: "Student accommodation, residential rentals, short-term lets, and income-focused development.",
    persona: "The operator",
    image: "/capability-property.png",
  },
  {
    name: "Commercial",
    detail: "Construction, maintenance, and operational improvements for business environments.",
    persona: "The fixer",
    image: "/capability-construction.png",
  },
  {
    name: "Entrepreneurs",
    detail: "Strategy, market expansion, and performance frameworks for growing ventures.",
    persona: "The strategist",
    image: "/capability-consulting.png",
  },
  {
    name: "Residential",
    detail: "Renovations, carpentry, and property improvements built for long-term value.",
    persona: "The caretaker",
    image: "/capability-property.png",
  },
  {
    name: "Public Realm",
    detail: "Practical solutions shaped around South African market realities and local needs.",
    persona: "The connector",
    image: "/izwelakhe_landingPic.png",
  },
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
    image: "/capability-property.png",
  },
  {
    title: "Commercial Upgrade Programme",
    sector: "Construction & Maintenance",
    body: "Renovation, civil maintenance, and interior carpentry work coordinated for operating properties.",
    metric: "End-to-end delivery",
    image: "/capability-construction.png",
  },
  {
    title: "Growth Strategy Framework",
    sector: "Business Consulting",
    body: "Strategic planning, market expansion, and performance systems for South African entrepreneurs.",
    metric: "Local market fit",
    image: "/capability-consulting.png",
  },
];

export const STATS: Stat[] = [
  { num: "3", label: "Integrated divisions" },
  { num: "360", label: "Delivery mindset" },
  { num: "4", label: "Process stages" },
  { num: "SA", label: "Market focus" },
];
