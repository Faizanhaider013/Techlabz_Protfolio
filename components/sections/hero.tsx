"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Cpu, Cloud, ShieldCheck, Rocket, Users, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { heroWords, stats } from "@/lib/site";
import { Counter } from "@/components/ui/counter";

// Three.js canvas is client-only; skip SSR and lazy-load below the hero content.
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

const WORD_INTERVAL = 3500; // each rotating word stays ~3.5s

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 1.15 } },
};
const item = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/** Floating glass feature cards that parallax with the mouse. */
const floatingCards = [
  { icon: Cpu, title: "AI Solutions", tags: ["Enterprise AI", "LLMs", "Automation"], pos: "left-[2%] top-[22%]", depth: 28, delay: 1.6 },
  { icon: Cloud, title: "Cloud", tags: ["AWS", "Azure", "GCP"], pos: "right-[3%] top-[18%]", depth: -32, delay: 1.8 },
  { icon: ShieldCheck, title: "ServiceNow", tags: ["ITSM", "ITOM", "HRSD"], pos: "right-[6%] bottom-[14%]", depth: -22, delay: 2.0 },
];

const statIcons = [Rocket, Users, Clock, Star];

/** One floating card, parallaxed via shared motion values — no re-renders. */
function FloatingCard({
  card,
  index,
  mouseX,
  mouseY,
}: {
  card: (typeof floatingCards)[number];
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const x = useTransform(mouseX, (v) => v * card.depth);
  const y = useTransform(mouseY, (v) => v * card.depth);
  return (
    <motion.div
      className={`absolute z-20 hidden lg:block ${card.pos}`}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ x, y }}>
        <div
          className="group glass-strong w-56 rounded-2xl p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-cyan/40 hover:shadow-glow-cyan"
          style={{ animation: `float ${7 + index}s ease-in-out ${index * 0.6}s infinite` }}
        >
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-glow-cyan transition-transform duration-300 group-hover:scale-110">
            <card.icon className="h-6 w-6 text-white" aria-hidden />
          </span>
          <p className="font-display text-lg font-semibold text-white">{card.title}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const reduce = useReducedMotion();
  // Normalized -0.5..0.5 pointer position as motion values, so parallax
  // never triggers a React re-render of the whole hero.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Rotate the highlighted word slowly.
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % heroWords.length), WORD_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Track the pointer for parallax — desktop pointers only; the floating
  // cards are hidden below lg, so there is nothing to parallax on touch.
  useEffect(() => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mouseX, mouseY]);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pb-24 pt-40 md:pt-44" aria-label="Hero">
      {/* Layered animated background */}
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="glow-blob left-[-12%] top-[6%] h-[34rem] w-[34rem] animate-aurora bg-brand-cyan/45" aria-hidden />
      <div className="glow-blob bottom-[-14%] right-[-8%] h-[40rem] w-[40rem] animate-aurora bg-brand-purple/45 [animation-delay:-6s]" aria-hidden />
      <div className="glow-blob left-[38%] top-[42%] h-[24rem] w-[24rem] animate-aurora bg-brand-green/15 [animation-delay:-10s]" aria-hidden />

      {/* 3D scene */}
      <div className="absolute inset-0 opacity-80 md:opacity-100">
        <HeroScene />
      </div>

      {/* Readability scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-transparent to-night" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_40%,rgba(7,19,33,0.55))]" aria-hidden />

      {/* Floating glass cards (desktop) — bob slowly, tilt & glow on hover */}
      {floatingCards.map((card, i) => (
        <FloatingCard key={card.title} card={card} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}

      {/* Content */}
      <div className="container-x relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={item}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-xs font-medium text-brand-cyan sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            AI &amp; Enterprise Software Studio
            <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" aria-hidden />
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-bold text-hero text-white"
          >
            Building{" "}
            <span className="relative inline-block align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroWords[wordIndex]}
                  className="text-gradient inline-block"
                  initial={{ opacity: 0, y: "0.35em", filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: "-0.35em", filter: "blur(12px)" }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                  {heroWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            Digital Solutions
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-2xl text-body-lg text-muted"
          >
            We engineer AI-powered software, enterprise platforms, cloud solutions, and
            full-stack applications that help ambitious businesses innovate faster.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-11 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Magnetic className="w-full sm:w-auto">
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Start Your Project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button href="/services" variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Services
              </Button>
            </Magnetic>
          </motion.div>

          {/* Trust stats — each in a glass card with an icon */}
          <motion.dl
            variants={item}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((stat, i) => {
              const Icon = statIcons[i] ?? Star;
              return (
                <div
                  key={stat.label}
                  className="group glass rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/30 hover:shadow-glow-cyan"
                >
                  <Icon className="mx-auto mb-2.5 h-6 w-6 text-brand-cyan transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  <dd className="font-display text-3xl font-bold text-gradient sm:text-[2.5rem]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted">
                    {stat.label}
                  </dt>
                </div>
              );
            })}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#technologies"
        aria-label="Scroll to content"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors hover:text-brand-cyan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
