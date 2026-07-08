"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { Reveal, RevealStagger, staggerChild } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { BrandOrbit } from "@/components/brand-orbit";
import { AboutTimeline } from "@/components/about-timeline";
import { TechGlyph } from "@/components/tech-logo-sprite";
import { techWall } from "@/lib/tech-stack";
import { stats, values } from "@/lib/site";

/** Blur-to-sharp entrance, used for the headline and the section blocks. */
const blurIn = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/** Low-opacity immersive backdrop. Everything here is decorative. */
function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Aurora */}
      <div className="glow-blob left-[-12%] top-[8%] h-[28rem] w-[28rem] bg-brand-cyan/30 animate-aurora" />
      <div className="glow-blob right-[-10%] top-[38%] h-[32rem] w-[32rem] bg-brand-purple/25 animate-aurora [animation-delay:6s]" />
      <div className="glow-blob bottom-[4%] left-[38%] h-[24rem] w-[24rem] bg-brand-green/10 animate-aurora [animation-delay:11s]" />

      {/* Digital grid + circuit traces */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-circuit opacity-[0.035]" />

      {/* Radial lighting + holographic sweep lines */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(51,198,255,0.07), transparent 70%)" }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent"
      />

      {/* Grain, last so it sits over the glow */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}

function StatCards() {
  return (
    <RevealStagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4" stagger={0.07}>
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={staggerChild}>
          <div className="card-premium group h-full px-4 py-5 text-center">
            <span className="block font-display text-3xl font-bold text-gradient">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="mt-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              {stat.label}
            </span>
          </div>
        </motion.div>
      ))}
    </RevealStagger>
  );
}

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    body: "Make enterprise software feel effortless — intelligent, fast, and beautiful — so businesses can move at the speed of their ideas.",
    tint: "text-brand-cyan",
  },
  {
    icon: Telescope,
    title: "Our Vision",
    body: "To be the engineering partner behind the next generation of AI-native businesses — trusted from first prototype to global scale.",
    tint: "text-brand-purple",
  },
];

function MissionVision() {
  return (
    <RevealStagger className="grid gap-6 md:grid-cols-2" stagger={0.1}>
      {PILLARS.map(({ icon: Icon, title, body, tint }) => (
        <motion.div key={title} variants={staggerChild}>
          <div className="card-premium group h-full p-8">
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:rotate-6 group-hover:scale-110">
              <Icon className={`h-6 w-6 ${tint}`} aria-hidden />
            </span>
            <h3 className="font-display text-card font-semibold text-white">{title}</h3>
            <p className="mt-3 text-body text-muted">{body}</p>
          </div>
        </motion.div>
      ))}
    </RevealStagger>
  );
}

function CoreValues() {
  return (
    <RevealStagger className="grid gap-6 sm:grid-cols-2" stagger={0.08}>
      {values.map((value) => (
        <motion.div key={value.title} variants={staggerChild}>
          <div className="card-premium group flex h-full items-start gap-5 p-7">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-6">
              <ServiceIcon name={value.icon} className="h-5 w-5 text-brand-cyan" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{value.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{value.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </RevealStagger>
  );
}

function TechWall() {
  return (
    <RevealStagger className="flex flex-wrap justify-center gap-3" stagger={0.035}>
      {techWall.map((mark, i) => (
        <motion.div key={mark.id} variants={staggerChild}>
          <div
            className="logo-float group flex cursor-default items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-glow-cyan"
            style={{ animationDelay: `${(i % 5) * 1.3}s` }}
          >
            <TechGlyph
              mark={mark}
              className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:scale-110"
              wordmarkClassName="text-[11px]"
            />
            {mark.kind !== "wordmark" && (
              <span className="font-display text-sm font-medium text-muted transition-colors duration-500 group-hover:text-white">
                {mark.name}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </RevealStagger>
  );
}

/**
 * About section — immersive brand orbit on the left, story on the right,
 * then mission/vision, core values, milestones, and the technology wall.
 */
export function AboutPreview() {
  return (
    <section id="about" className="section-pad relative scroll-mt-28 overflow-hidden" aria-label="About Tech Labz">
      <Backdrop />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* --- Story --- */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal direction="right">
            <BrandOrbit />
          </Reveal>

          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={blurIn}>
              <p className="mb-6 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-eyebrow font-semibold uppercase text-brand-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" aria-hidden />
                Who we are
              </p>
              <h2 className="font-display font-bold text-h2 text-white">
                A software house{" "}
                <span className="text-gradient-animated">engineered for the AI era</span>
              </h2>
              <p className="mt-7 text-body-lg text-muted">
                We build the systems enterprises bet on — ServiceNow platforms, production AI, and
                cloud-native products shipped by senior engineers who have done it before. No
                offshore handoffs, no proof-of-concept theatre. Architecture that survives audit,
                interfaces people actually want to use, and a team that stays long after launch.
              </p>
            </motion.div>

            <StatCards />

            <Reveal delay={0.2} className="mt-10">
              <Button href="/about" variant="outline">
                Our Full Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Reveal>
          </div>
        </div>

        {/* --- Mission & Vision --- */}
        <div className="mt-28 md:mt-36">
          <MissionVision />
        </div>

        {/* --- Core values --- */}
        <div className="mt-28 md:mt-36">
          <Reveal className="mb-14 text-center">
            <h3 className="font-display text-h3 font-bold text-white">
              What we <span className="text-gradient">stand for</span>
            </h3>
          </Reveal>
          <CoreValues />
        </div>

        {/* --- Milestones --- */}
        <div className="mt-28 md:mt-36">
          <Reveal className="mb-16 text-center">
            <h3 className="font-display text-h3 font-bold text-white">
              Five years of <span className="text-gradient">momentum</span>
            </h3>
          </Reveal>
          <AboutTimeline />
        </div>

        {/* --- Technology wall --- */}
        <div className="mt-28 md:mt-36">
          <Reveal className="mb-12 text-center">
            <h3 className="font-display text-h3 font-bold text-white">
              The stack we <span className="text-gradient">build on</span>
            </h3>
          </Reveal>
          <TechWall />
        </div>
      </div>
    </section>
  );
}
