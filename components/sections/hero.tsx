"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

// Three.js canvas is client-only and below-the-fold-priority; skip SSR.
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 1.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden" aria-label="Hero">
      {/* Layered background: grid + glows + 3D scene */}
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="glow-blob left-[-10%] top-[10%] h-[30rem] w-[30rem] bg-brand-cyan/50" aria-hidden />
      <div className="glow-blob bottom-[-10%] right-[-5%] h-[34rem] w-[34rem] bg-brand-purple/50" aria-hidden />
      <div className="absolute inset-0 opacity-70 md:opacity-100">
        <HeroScene />
      </div>
      {/* Readability scrim over the 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/30 via-transparent to-night" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8">
        <div className="max-w-4xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm font-medium text-brand-cyan"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            AI &amp; Enterprise Software Studio
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Building Intelligent{" "}
            <span className="text-gradient">Digital Solutions</span> for Tomorrow
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          >
            We engineer AI-powered software, enterprise platforms, cloud solutions, and
            full-stack applications that help businesses innovate faster.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button href="/contact" size="lg">
                Start Your Project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/services" variant="outline" size="lg">
                Explore Services
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#technologies"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors hover:text-brand-cyan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
