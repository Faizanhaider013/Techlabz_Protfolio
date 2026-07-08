"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealStagger, staggerChild } from "@/components/ui/reveal";
import { processSteps } from "@/lib/site";

/** How-we-work process rail with a connecting gradient line. */
export function Process() {
  return (
    <section className="section-pad relative" aria-label="Our process">
      <div className="glow-blob left-[-10%] top-1/3 h-[26rem] w-[26rem] bg-brand-cyan/25" aria-hidden />

      <div className="container-x relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              From idea to impact in <span className="text-gradient">five moves</span>
            </>
          }
          description="A transparent, demo-driven process that de-risks delivery and keeps you in the loop at every step."
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent lg:block"
            aria-hidden
          />
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <motion.div key={step.step} variants={staggerChild} className="relative">
                <div className="group glass h-full rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-brand-cyan/30 hover:shadow-card-hover">
                  <span className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand font-display text-lg font-bold text-white shadow-glow-cyan">
                    {step.step}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2.5 text-body text-muted">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
