/**
 * Central site configuration & marketing copy for Tech Labz.
 * All static content lives here so sections stay purely presentational.
 */

export const siteConfig = {
  name: "Tech Labz",
  url: "https://techlabz.net",
  tagline: "Building Intelligent Digital Solutions for Tomorrow",
  description:
    "Tech Labz engineers AI-powered software, enterprise platforms, cloud solutions, and full-stack applications that help businesses innovate faster.",
  email: "hr@techlabz.net",
  phone: "+1 (555) 012-3456",
  address: "Suite 400, Innovation Tower, Silicon District",
  hours: "Mon – Fri, 9:00 AM – 6:00 PM",
  socials: {
    linkedin: "https://www.linkedin.com/company/techlabz-solution/",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/** Header navigation — includes in-page anchors to homepage sections. */
export const headerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Technologies", href: "/#technologies" },
  { label: "Industries", href: "/#industries" },
  { label: "Contact", href: "/contact" },
];

/** Rotating words in the hero headline (slow fade+blur, ~3.5s each). */
export const heroWords = [
  "Intelligent",
  "AI-Powered",
  "Enterprise",
  "Cloud-Native",
  "Future-Ready",
];

/**
 * The "Trusted by" wall. Most of our work sits under NDA, so the wall shows the
 * sector rather than inventing company names — swap an entry's `client` for a
 * real name (and drop `confidential`) once a logo release is signed.
 */
export const clientIndustries = [
  { industry: "Healthcare", icon: "HeartPulse", client: "Confidential Client", confidential: true },
  { industry: "Finance", icon: "Landmark", client: "Confidential Client", confidential: true },
  { industry: "Retail", icon: "ShoppingBag", client: "Confidential Client", confidential: true },
  { industry: "Manufacturing", icon: "Factory", client: "Confidential Client", confidential: true },
  { industry: "Education", icon: "GraduationCap", client: "Confidential Client", confidential: true },
  { industry: "Telecommunications", icon: "RadioTower", client: "Confidential Client", confidential: true },
  { industry: "Government", icon: "Building2", client: "Confidential Client", confidential: true },
  { industry: "Startups", icon: "Rocket", client: "Confidential Client", confidential: true },
];

/** Delivery guarantees shown in the trust strip. */
export const guarantees = [
  { label: "NDA-protected engagements", icon: "Lock" },
  { label: "48-hour response time", icon: "Zap" },
  { label: "99% client satisfaction", icon: "Star" },
  { label: "Dedicated senior team", icon: "Users" },
  { label: "On-time, on-budget delivery", icon: "CalendarCheck" },
];

/**
 * Technology partnerships and compliance readiness (illustrative — replace
 * with badges you have actually earned before publishing).
 */
export const partners = [
  "ServiceNow", "AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes",
];

export const compliance = [
  { name: "SOC 2", detail: "Type II ready" },
  { name: "ISO 27001", detail: "Aligned" },
  { name: "GDPR", detail: "Compliant" },
  { name: "HIPAA", detail: "Ready" },
];

export const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Global Clients" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

/* The technology showcase is data-driven from `lib/tech-stack.ts`, which pairs
   each name with its official SVG mark. */

export const whyChooseUs = [
  {
    title: "Enterprise Quality",
    description:
      "Battle-tested engineering standards, rigorous code review, and SLAs built for mission-critical systems.",
    icon: "ShieldCheck",
  },
  {
    title: "AI-First Development",
    description:
      "Generative AI, RAG pipelines, and intelligent agents woven into every product we ship — not bolted on.",
    icon: "BrainCircuit",
  },
  {
    title: "Cloud Native",
    description:
      "Containerized, auto-scaling architectures on AWS, Azure, and GCP designed for global reach from day one.",
    icon: "CloudCog",
  },
  {
    title: "Secure Architecture",
    description:
      "Zero-trust design, encrypted data flows, and compliance-ready foundations across every layer.",
    icon: "Lock",
  },
  {
    title: "Modern UI/UX",
    description:
      "Interfaces crafted with obsessive attention to motion, accessibility, and conversion.",
    icon: "Sparkles",
  },
  {
    title: "Scalable Systems",
    description:
      "Event-driven microservices and data platforms that grow from a thousand users to a hundred million.",
    icon: "TrendingUp",
  },
  {
    title: "Agile Delivery",
    description:
      "Two-week sprints, transparent roadmaps, and demos you can click — not decks you have to trust.",
    icon: "Zap",
  },
  {
    title: "Dedicated Support",
    description:
      "A named team that knows your stack, with proactive monitoring and 24/7 incident response.",
    icon: "Headset",
  },
];

export const industries = [
  { name: "Healthcare", icon: "HeartPulse" },
  { name: "Finance", icon: "Landmark" },
  { name: "Education", icon: "GraduationCap" },
  { name: "Retail", icon: "ShoppingBag" },
  { name: "Manufacturing", icon: "Factory" },
  { name: "Government", icon: "Building2" },
  { name: "Telecommunications", icon: "RadioTower" },
  { name: "Startups", icon: "Rocket" },
];

export const testimonials = [
  {
    quote:
      "Tech Labz rebuilt our ServiceNow estate and cut ticket resolution time by 43%. They operate like an extension of our own engineering org.",
    name: "Sarah Mitchell",
    role: "CIO, Meridian Health Group",
  },
  {
    quote:
      "The AI copilot they built on top of our knowledge base paid for itself in the first quarter. Exceptional engineering and even better communication.",
    name: "David Chen",
    role: "VP of Product, FinEdge Capital",
  },
  {
    quote:
      "From Figma to production in nine weeks. The platform is fast, beautiful, and our customers noticed immediately.",
    name: "Amira Hassan",
    role: "Founder & CEO, Cartlane",
  },
  {
    quote:
      "Their cloud migration was flawless — zero downtime across 200+ services. The most professional team we've worked with, full stop.",
    name: "James O'Connor",
    role: "Head of Infrastructure, NovaTel",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We immerse in your business, users, and constraints to define measurable outcomes before a single line of code.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wireframes, prototypes, and design systems that make the product tangible early and often.",
  },
  {
    step: "03",
    title: "Develop",
    description:
      "Agile sprints with continuous integration, automated testing, and demo-driven checkpoints.",
  },
  {
    step: "04",
    title: "Deploy",
    description:
      "Hardened releases with observability, rollback strategies, and performance budgets enforced.",
  },
  {
    step: "05",
    title: "Scale",
    description:
      "Ongoing optimization, feature evolution, and proactive support as your product grows.",
  },
];

export const values = [
  {
    title: "Innovation",
    description: "We ship what's next, not what's safe — AI woven into products, never bolted on.",
    icon: "Sparkles",
  },
  {
    title: "Engineering Excellence",
    description: "Rigorous review, real test coverage, and code we're proud to sign our name to.",
    icon: "Gem",
  },
  {
    title: "Transparency",
    description: "Open roadmaps, honest estimates, and progress you can click — never just trust.",
    icon: "Eye",
  },
  {
    title: "Long-Term Partnership",
    description: "Your goals become our metrics. Most clients stay with us long past launch.",
    icon: "Handshake",
  },
];

export const timeline = [
  { year: "2021", title: "Company Founded", description: "Tech Labz launches with a three-person team and a conviction that enterprise software should feel like consumer software." },
  { year: "2022", title: "First Enterprise Project", description: "Certified ServiceNow partner practice established; first Fortune-500 ITSM rollout delivered end to end." },
  { year: "2023", title: "AI Services Introduced", description: "Dedicated AI/ML division formed — shipping RAG systems, copilots, and intelligent agents to production." },
  { year: "2024", title: "Cloud & DevOps Expansion", description: "Containerized, auto-scaling platforms across AWS, Azure, and GCP; team grows past 40 engineers and architects." },
  { year: "2025", title: "Serving Global Clients", description: "Clients across four continents, recognized for enterprise delivery with a 99% client-satisfaction score." },
];

export const team = [
  { name: "M. Faizan Haider", role: "Founder & CEO", initials: "FH" },
  { name: "Ayesha Khan", role: "Head of Design", initials: "AK" },
  { name: "Omar Siddiqui", role: "Principal Architect", initials: "OS" },
  { name: "Elena Rodriguez", role: "AI/ML Lead", initials: "ER" },
  { name: "Hassan Raza", role: "ServiceNow Practice Lead", initials: "HR" },
  { name: "Priya Sharma", role: "Head of Delivery", initials: "PS" },
];

export const caseStudies = [
  {
    tag: "ServiceNow · ITSM",
    title: "43% faster incident resolution for a health network",
    description:
      "Re-architected a Fortune-500 ServiceNow estate with AI-assisted triage, a healthy CMDB, and Virtual Agent — cutting mean time to resolution nearly in half.",
    metric: "43%",
    metricLabel: "Faster MTTR",
    accent: "cyan",
  },
  {
    tag: "AI · RAG Copilot",
    title: "An AI knowledge copilot that paid for itself in a quarter",
    description:
      "Built a retrieval-augmented copilot on top of a capital firm's knowledge base — grounded, auditable answers that deflected thousands of support hours.",
    metric: "1 Qtr",
    metricLabel: "To ROI",
    accent: "purple",
  },
  {
    tag: "Full-Stack · Commerce",
    title: "From Figma to a production platform in nine weeks",
    description:
      "Designed and shipped a headless commerce platform with Next.js and a real-time data layer — fast, beautiful, and conversion-optimized from day one.",
    metric: "9 wks",
    metricLabel: "To launch",
    accent: "green",
  },
];

export const homeFaqs = [
  {
    question: "What kind of companies do you work with?",
    answer:
      "From venture-backed startups shipping their first MVP to enterprises modernizing legacy estates. Our process scales to the engagement — enterprise rigor at startup speed.",
  },
  {
    question: "How do engagements typically start?",
    answer:
      "With a discovery call within 48 hours of your inquiry, followed by a short paid discovery sprint that produces a concrete plan, architecture, and estimate before full delivery begins.",
  },
  {
    question: "Do you build with AI, or just talk about it?",
    answer:
      "We ship production AI — RAG systems, copilots, and agents with evals, guardrails, and observability. We're model-agnostic across OpenAI, Claude, Gemini, and open models.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project includes a support window, and most clients continue on a managed-services retainer covering monitoring, enhancements, and 24/7 incident response.",
  },
  {
    question: "Can you work with our existing team and stack?",
    answer:
      "Absolutely. We embed with in-house teams, adopt your tooling and conventions, and leave behind documentation and practices your engineers own.",
  },
];

export const contactFaqs = [
  {
    question: "How quickly can we start?",
    answer:
      "Discovery calls happen within 48 hours of your inquiry. Most engagements kick off within 1–2 weeks.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer:
      "Both. We run enterprise-grade process at startup speed — MVPs in weeks, platforms in months.",
  },
  {
    question: "What engagement models do you offer?",
    answer:
      "Fixed-scope projects, dedicated teams, and staff augmentation. We'll recommend the right fit on the first call.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes — every project includes a support window, and most clients continue with a managed-services retainer.",
  },
];
