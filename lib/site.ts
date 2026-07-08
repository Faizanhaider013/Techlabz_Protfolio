/**
 * Central site configuration & marketing copy for Tech Labz.
 * All static content lives here so sections stay purely presentational.
 */

export const siteConfig = {
  name: "Tech Labz",
  url: "https://techlabz.com",
  tagline: "Building Intelligent Digital Solutions for Tomorrow",
  description:
    "Tech Labz engineers AI-powered software, enterprise platforms, cloud solutions, and full-stack applications that help businesses innovate faster.",
  email: "hello@techlabz.com",
  phone: "+1 (555) 012-3456",
  address: "Suite 400, Innovation Tower, Silicon District",
  hours: "Mon – Fri, 9:00 AM – 6:00 PM",
  socials: {
    linkedin: "https://linkedin.com/company/techlabz",
    twitter: "https://twitter.com/techlabz",
    github: "https://github.com/techlabz",
    instagram: "https://instagram.com/techlabz",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Global Clients" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

export const technologies = [
  "React", "Next.js", "Node.js", "ServiceNow", "AWS", "Azure", "Python",
  "TensorFlow", "MongoDB", "Docker", "Kubernetes", "PostgreSQL", "OpenAI",
  "Claude", "LangChain", "Pinecone", "Redis",
];

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
    title: "Craftsmanship",
    description: "We sweat the details others ship around.",
    icon: "Gem",
  },
  {
    title: "Transparency",
    description: "Open roadmaps, honest estimates, no surprises.",
    icon: "Eye",
  },
  {
    title: "Velocity",
    description: "Momentum is a feature. We ship every sprint.",
    icon: "Gauge",
  },
  {
    title: "Partnership",
    description: "Your goals are our metrics. We win together.",
    icon: "Handshake",
  },
];

export const timeline = [
  { year: "2021", title: "Founded", description: "Tech Labz launches with a three-person team and a conviction that enterprise software should feel like consumer software." },
  { year: "2022", title: "ServiceNow Practice", description: "Certified ServiceNow partner practice established; first Fortune-500 ITSM rollout delivered." },
  { year: "2023", title: "AI Division", description: "Dedicated AI/ML division formed — shipping RAG systems, copilots, and intelligent agents to production." },
  { year: "2024", title: "Global Expansion", description: "Clients across 4 continents; team grows past 40 engineers, designers, and architects." },
  { year: "2025", title: "20+ Enterprise Clients", description: "Recognized for enterprise delivery excellence with a 99% client-satisfaction score." },
];

export const team = [
  { name: "M. Faizan Haider", role: "Founder & CEO", initials: "FH" },
  { name: "Ayesha Khan", role: "Head of Design", initials: "AK" },
  { name: "Omar Siddiqui", role: "Principal Architect", initials: "OS" },
  { name: "Elena Rodriguez", role: "AI/ML Lead", initials: "ER" },
  { name: "Hassan Raza", role: "ServiceNow Practice Lead", initials: "HR" },
  { name: "Priya Sharma", role: "Head of Delivery", initials: "PS" },
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
