/**
 * Services dataset — drives /services and /services/[slug].
 * Icons are lucide-react icon names resolved by <ServiceIcon />.
 */

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  description: string;
  category: "platform" | "engineering" | "intelligence" | "operations" | "design";
  features: string[];
  benefits: { title: string; description: string }[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
};

export const serviceCategories = [
  { id: "all", label: "All Services" },
  { id: "platform", label: "Platforms" },
  { id: "engineering", label: "Engineering" },
  { id: "intelligence", label: "AI & Data" },
  { id: "operations", label: "Cloud & Ops" },
  { id: "design", label: "Design & QA" },
] as const;

export const services: Service[] = [
  {
    slug: "servicenow",
    title: "ServiceNow Consulting & Implementation",
    shortTitle: "ServiceNow",
    icon: "Workflow",
    tagline: "The full Now Platform, engineered end-to-end.",
    description:
      "Certified ServiceNow expertise across every module — from ITSM foundations to Now Assist AI. We implement, migrate, customize, and manage the Now Platform so work flows the way your enterprise actually operates.",
    category: "platform",
    features: [
      "ITSM — Incident, Problem, Change & Request",
      "ITOM — Discovery, Event Management & Health Log Analytics",
      "ITBM / SPM — Strategic Portfolio Management",
      "CMDB — Design, health & data governance",
      "ITAM — Hardware & Software Asset Management",
      "HRSD — HR Service Delivery & Employee Center",
      "CSM — Customer Service Management",
      "GRC / IRM — Governance, Risk & Compliance",
      "SecOps — Security Incident & Vulnerability Response",
      "App Engine — Custom application development",
      "Integration Hub & Flow Designer automation",
      "Service Portal & Employee Center experiences",
      "Virtual Agent & Now Assist AI enablement",
      "Performance Analytics & Reporting",
      "Field Service Management",
      "Implementation, migration, administration & managed services",
    ],
    benefits: [
      { title: "Faster resolution", description: "Automated routing, virtual agents, and AI-assisted triage cut MTTR dramatically." },
      { title: "One system of action", description: "A healthy CMDB and integrated workflows replace swivel-chair operations." },
      { title: "Lower run cost", description: "Managed services and automation reduce platform TCO year over year." },
      { title: "AI-ready platform", description: "Now Assist and Virtual Agent configured to deliver value from week one." },
    ],
    technologies: ["ServiceNow", "Now Assist AI", "Integration Hub", "Flow Designer", "App Engine", "Service Portal", "Performance Analytics", "REST/SOAP APIs", "MID Server", "JavaScript / Glide"],
    faqs: [
      { question: "Do you handle new implementations and existing instances?", answer: "Both. We run greenfield implementations, health-check and remediate existing instances, and manage complex upgrades and migrations." },
      { question: "Can you build custom apps on the Now Platform?", answer: "Yes — our App Engine team builds scoped applications with the same rigor as our product engineering practice." },
      { question: "Do you offer ongoing administration?", answer: "We offer flexible managed-services retainers covering administration, enhancements, upgrades, and 24/7 support." },
    ],
  },
  {
    slug: "web-development",
    title: "Web & Full-Stack Development",
    shortTitle: "Web Development",
    icon: "Globe",
    tagline: "High-performance web platforms, built to convert and scale.",
    description:
      "From marketing sites that win awards to enterprise platforms that process millions of transactions — we engineer full-stack web applications with modern frameworks, robust APIs, and obsessive performance budgets.",
    category: "engineering",
    features: [
      "Next.js, React, Angular & Vue applications",
      "Node.js, Express & NestJS backends",
      "Laravel / PHP & ASP.NET solutions",
      "Java Spring Boot microservices",
      "REST & GraphQL API design",
      "MERN stack (MongoDB, Express, React, Node)",
      "MEAN stack (MongoDB, Express, Angular, Node)",
      "Progressive Web Apps & SSR/ISR architectures",
    ],
    benefits: [
      { title: "Core Web Vitals in the green", description: "Performance budgets enforced in CI — fast sites rank and convert better." },
      { title: "Type-safe end to end", description: "TypeScript across the stack means fewer runtime surprises." },
      { title: "Built for iteration", description: "Component architecture and CI/CD pipelines make change cheap." },
      { title: "SEO by construction", description: "Server rendering, structured data, and semantic markup baked in." },
    ],
    technologies: ["Next.js", "React", "Angular", "Vue", "TypeScript", "Node.js", "NestJS", "Laravel", "ASP.NET", "Spring Boot", "GraphQL", "PostgreSQL", "MongoDB"],
    faqs: [
      { question: "Which stack do you recommend?", answer: "It depends on your team and constraints — we're fluent in the React, Angular, Vue, PHP, .NET, and Java ecosystems and recommend based on fit, not fashion." },
      { question: "Can you take over an existing codebase?", answer: "Yes. We start with an architecture and code-quality audit, then stabilize, document, and accelerate." },
    ],
  },
  {
    slug: "ai-ml",
    title: "AI & Machine Learning",
    shortTitle: "AI / ML",
    icon: "BrainCircuit",
    tagline: "Production AI — from copilots to computer vision.",
    description:
      "We design, train, and deploy AI systems that create measurable business value: generative AI copilots, RAG knowledge systems, intelligent agents, computer vision pipelines, and predictive models — engineered for production, not demos.",
    category: "intelligence",
    features: [
      "Generative AI with OpenAI, Claude, Gemini & Llama",
      "RAG systems & vector databases (Pinecone, pgvector)",
      "AI agents with LangChain, CrewAI & AutoGen",
      "Custom chatbots & enterprise copilots",
      "Computer vision & OCR pipelines",
      "NLP, speech AI & recommendation systems",
      "Predictive analytics & forecasting",
      "Fine-tuning & prompt engineering",
      "ML Ops — evaluation, monitoring & guardrails",
    ],
    benefits: [
      { title: "Grounded, not hallucinating", description: "Retrieval-augmented architectures keep answers anchored to your data." },
      { title: "Model-agnostic", description: "We benchmark OpenAI, Claude, Gemini, and open models against your task and budget." },
      { title: "Production-grade", description: "Evals, observability, cost controls, and guardrails from day one." },
      { title: "Compounding value", description: "AI systems that learn from usage and improve every quarter." },
    ],
    technologies: ["OpenAI", "Claude", "Gemini", "Llama", "LangChain", "CrewAI", "AutoGen", "Pinecone", "TensorFlow", "PyTorch", "Hugging Face", "Python"],
    faqs: [
      { question: "Which LLM should we use?", answer: "We run structured evaluations against your actual tasks — accuracy, latency, and cost — and recommend a primary plus fallback. Most clients land on a multi-model strategy." },
      { question: "Is our data safe?", answer: "We architect for data privacy: private deployments, zero-retention API configurations, and PII redaction where required." },
      { question: "Can you fine-tune models on our data?", answer: "Yes — when fine-tuning beats retrieval for your use case. We'll prove it with evals before you commit." },
    ],
  },
  {
    slug: "data-engineering",
    title: "Data Engineering & Analytics",
    shortTitle: "Data Engineering",
    icon: "Database",
    tagline: "Pipelines, warehouses, and dashboards you can trust.",
    description:
      "We build the data backbone of modern enterprises: streaming and batch pipelines, cloud warehouses, and analytics layers that turn raw events into decisions — reliably, at scale.",
    category: "intelligence",
    features: [
      "ETL / ELT pipeline design & orchestration",
      "Apache Spark & Kafka streaming platforms",
      "Airflow orchestration & data quality gates",
      "Snowflake warehousing & data lakes",
      "Dimensional modeling & data governance",
      "Power BI, Tableau & Looker dashboards",
    ],
    benefits: [
      { title: "Single source of truth", description: "Modeled, tested, documented data that every team can trust." },
      { title: "Real-time when it matters", description: "Streaming architectures for decisions that can't wait for a nightly batch." },
      { title: "AI-ready data", description: "Clean, cataloged data is the substrate every AI initiative needs." },
    ],
    technologies: ["Apache Spark", "Kafka", "Airflow", "Snowflake", "dbt", "Power BI", "Tableau", "Looker", "Python", "SQL"],
    faqs: [
      { question: "Can you modernize a legacy warehouse?", answer: "Yes — we migrate legacy ETL and on-prem warehouses to cloud-native stacks with zero-loss cutover plans." },
      { question: "Do you handle data governance?", answer: "We implement cataloging, lineage, quality tests, and access controls as part of every data platform." },
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortTitle: "Cloud & DevOps",
    icon: "CloudCog",
    tagline: "Infrastructure that ships itself.",
    description:
      "Cloud architecture, migration, and DevOps automation across AWS, Azure, and Google Cloud. We containerize, codify, and automate your infrastructure so deployments are boring and scaling is automatic.",
    category: "operations",
    features: [
      "AWS, Azure & Google Cloud architecture",
      "Docker containerization & Kubernetes orchestration",
      "Terraform infrastructure as code",
      "CI/CD pipeline engineering",
      "Observability — monitoring, logging & alerting",
      "Cost optimization & FinOps",
      "Zero-downtime cloud migrations",
    ],
    benefits: [
      { title: "Deploy daily, safely", description: "Automated pipelines with testing gates and instant rollback." },
      { title: "Elastic economics", description: "Right-sized, auto-scaling infrastructure that tracks demand." },
      { title: "Everything as code", description: "Reproducible environments, auditable changes, no snowflake servers." },
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD", "Prometheus", "Grafana"],
    faqs: [
      { question: "Can you migrate us with zero downtime?", answer: "For most workloads, yes — blue-green and canary strategies with rehearsed cutovers and instant rollback." },
      { question: "Do you offer ongoing SRE support?", answer: "Yes, we run managed cloud operations with SLOs, on-call rotation, and monthly cost reviews." },
    ],
  },
  {
    slug: "mobile-development",
    title: "Mobile App Development",
    shortTitle: "Mobile",
    icon: "Smartphone",
    tagline: "Native-quality apps for every pocket.",
    description:
      "Cross-platform and native mobile applications with Flutter, React Native, and native Android/iOS — designed for app-store excellence and engineered for offline-first reliability.",
    category: "engineering",
    features: [
      "Flutter cross-platform development",
      "React Native applications",
      "Native Android (Kotlin) & iOS (Swift)",
      "Offline-first architecture & sync",
      "Push notifications & deep linking",
      "App Store & Play Store launch support",
    ],
    benefits: [
      { title: "One codebase, two stores", description: "Cross-platform stacks cut cost and time-to-market nearly in half." },
      { title: "60fps everywhere", description: "Performance profiling on real low-end devices, not just simulators." },
      { title: "Launch-ready", description: "Store assets, review compliance, and phased rollout handled." },
    ],
    technologies: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase", "GraphQL", "SQLite"],
    faqs: [
      { question: "Flutter or React Native?", answer: "Both are excellent. We recommend based on your team's skills, design ambitions, and existing web investment." },
      { question: "Do you maintain apps post-launch?", answer: "Yes — OS updates, store policy changes, crash monitoring, and feature evolution under a support retainer." },
    ],
  },
  {
    slug: "qa-testing",
    title: "Quality Assurance & Testing",
    shortTitle: "QA & Testing",
    icon: "BadgeCheck",
    tagline: "Ship with confidence, every release.",
    description:
      "Comprehensive quality engineering: automated test suites, manual exploratory testing, performance benchmarking, and security testing integrated straight into your delivery pipeline.",
    category: "design",
    features: [
      "Test automation frameworks (Playwright, Cypress, Selenium)",
      "Manual & exploratory testing",
      "Performance & load testing",
      "Security testing & code review",
      "API & integration testing",
      "CI-integrated quality gates",
    ],
    benefits: [
      { title: "Regressions caught early", description: "Automated suites run on every commit, not every quarter." },
      { title: "Real-world confidence", description: "Load tests that model actual traffic patterns before launch day." },
      { title: "Quality as culture", description: "We leave behind frameworks and practices your team owns." },
    ],
    technologies: ["Playwright", "Cypress", "Selenium", "k6", "JMeter", "Postman", "OWASP ZAP"],
    faqs: [
      { question: "Can you add tests to an untested codebase?", answer: "Yes — we prioritize critical paths first, building coverage where bugs cost the most." },
    ],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    shortTitle: "Security",
    icon: "ShieldCheck",
    tagline: "Defense in depth for modern attack surfaces.",
    description:
      "Defensive security services that harden your organization: vulnerability assessment and penetration testing, security audits, cloud security posture management, and SOC advisory.",
    category: "operations",
    features: [
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "Security audits & compliance readiness",
      "Cloud security posture management",
      "SOC advisory & incident response planning",
      "Secure SDLC & code review",
      "Security awareness programs",
    ],
    benefits: [
      { title: "Find it before attackers do", description: "Authorized, methodical testing across your applications and infrastructure." },
      { title: "Compliance without chaos", description: "Practical roadmaps to SOC 2, ISO 27001, and HIPAA readiness." },
      { title: "Resilience by design", description: "Security embedded in architecture and pipeline, not audited in later." },
    ],
    technologies: ["Burp Suite", "Nessus", "OWASP", "Wiz", "Splunk", "CrowdStrike"],
    faqs: [
      { question: "Are your penetration tests safe for production?", answer: "Engagements are scoped, authorized, and rules-of-engagement governed — with staging-first testing wherever possible." },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX & Product Design",
    shortTitle: "UI/UX Design",
    icon: "Palette",
    tagline: "Design that makes complex products feel effortless.",
    description:
      "Research-driven product design: wireframes, high-fidelity prototypes, and scalable design systems in Figma — crafted to make enterprise software feel like consumer software.",
    category: "design",
    features: [
      "Product discovery & UX research",
      "Wireframing & information architecture",
      "High-fidelity prototyping in Figma",
      "Design systems & component libraries",
      "Usability testing & iteration",
      "Motion design & micro-interactions",
    ],
    benefits: [
      { title: "Fewer rebuilds", description: "Validated prototypes before engineering means we build the right thing once." },
      { title: "Consistency at scale", description: "Design systems keep every screen coherent as your product grows." },
      { title: "Conversion-focused", description: "Every flow measured, tested, and tuned toward outcomes." },
    ],
    technologies: ["Figma", "FigJam", "Framer", "Storybook", "Maze", "Lottie"],
    faqs: [
      { question: "Do you hand off to our developers?", answer: "Yes — annotated Figma files, tokens, and Storybook-ready specs. Or our engineers build it with you." },
    ],
  },
  {
    slug: "enterprise-consulting",
    title: "Enterprise & Digital Transformation Consulting",
    shortTitle: "Consulting",
    icon: "Compass",
    tagline: "Strategy that survives contact with engineering.",
    description:
      "Technology strategy, architecture advisory, and digital transformation roadmaps from consultants who still write code. We help enterprises modernize legacy estates and adopt AI responsibly.",
    category: "platform",
    features: [
      "Digital transformation roadmaps",
      "Architecture review & modernization strategy",
      "AI adoption & governance frameworks",
      "Legacy system modernization",
      "Technology due diligence",
      "Team enablement & training",
    ],
    benefits: [
      { title: "Practitioner-led", description: "Advice from architects who ship, not slide decks from analysts." },
      { title: "De-risked modernization", description: "Incremental strangler-pattern migrations instead of big-bang rewrites." },
      { title: "Lasting capability", description: "We upskill your team so improvements outlive the engagement." },
    ],
    technologies: ["TOGAF", "AWS Well-Architected", "Azure CAF", "Event Storming", "C4 Modeling"],
    faqs: [
      { question: "Can consulting lead into delivery?", answer: "Often it does — the same architects who write your roadmap can lead the build, keeping strategy and execution aligned." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
