import { techLogos, type TechLogo } from "./tech-logos.generated";

/**
 * A single mark in the technology showcase.
 *
 * Almost every technology ships an official SVG (see `tech-logos.generated.ts`).
 * ServiceNow does not publish a redistributable vector mark, so it renders as a
 * typographic wordmark in its brand green instead.
 */
export type TechMark =
  | ({ kind: "logo" } & TechLogo)
  | { kind: "wordmark"; id: string; name: string; text: string; color: string }
  /** For capabilities that are not products and have no logo, e.g. AI/ML. */
  | { kind: "icon"; id: string; name: string; icon: string; color: string };

const SERVICENOW: TechMark = {
  kind: "wordmark",
  id: "servicenow",
  name: "ServiceNow",
  text: "servicenow",
  color: "#62D84E",
};

const AI_ML: TechMark = {
  kind: "icon",
  id: "ai-ml",
  name: "AI/ML",
  icon: "BrainCircuit",
  color: "#33C6FF",
};

/** Display order — grouped roughly by layer of the stack. */
const ORDER = [
  "react", "nextjs", "nodejs", "typescript", "javascript", "python",
  "tensorflow", "pytorch", "openai", "claude", "gemini", "langchain",
  "mongodb", "postgresql", "mysql", "redis", "docker", "kubernetes",
  "aws", "azure", "googlecloud", "servicenow", "git", "github",
  "linux", "nginx", "firebase", "supabase", "vercel", "netlify",
] as const;

const byId = new Map(techLogos.map((logo) => [logo.id, logo]));

export const techMarks: TechMark[] = ORDER.map((id) => {
  if (id === "servicenow") return SERVICENOW;
  const logo = byId.get(id);
  if (!logo) throw new Error(`tech-stack: no generated logo for "${id}"`);
  return { kind: "logo", ...logo };
});

/** Only the marks that need a sprite <symbol>. */
export const spriteLogos = techMarks.filter(
  (mark): mark is { kind: "logo" } & TechLogo => mark.kind === "logo"
);

/**
 * Two counter-scrolling rows. Interleaving (rather than slicing in half) keeps
 * each row visually varied instead of "all the AI logos on row two".
 */
export const techRows: TechMark[][] = [
  techMarks.filter((_, i) => i % 2 === 0),
  techMarks.filter((_, i) => i % 2 === 1),
];

const markById = new Map(techMarks.map((mark) => [mark.id, mark]));

function pick(ids: readonly string[], extra: Record<string, TechMark> = {}): TechMark[] {
  return ids.map((id) => {
    const mark = extra[id] ?? markById.get(id);
    if (!mark) throw new Error(`tech-stack: unknown mark "${id}"`);
    return mark;
  });
}

/**
 * The brand orbit. Split across two counter-rotating rings — the inner ring
 * carries the five marks most central to our work.
 */
export const orbitRings: TechMark[][] = [
  pick(["react", "nextjs", "servicenow", "openai", "aws"]),
  pick(["azure", "docker", "kubernetes", "python", "nodejs", "mongodb"]),
];

/** Capability chips shown in the About section's technology wall. */
export const techWall: TechMark[] = pick(
  [
    "react", "nextjs", "servicenow", "ai-ml", "openai", "aws", "azure", "docker",
    "kubernetes", "nodejs", "mongodb", "postgresql", "python", "langchain", "tensorflow",
  ],
  { "ai-ml": AI_ML }
);
