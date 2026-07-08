"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealStagger, staggerChild } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { industries } from "@/lib/site";

/** Industry coverage strip. */
export function Industries() {
  return (
    <section className="section-pad relative" aria-label="Industries we serve">
      <div className="glow-blob left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 bg-brand-cyan/25" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries"
          title={
            <>
              Domain depth across <span className="text-gradient">eight industries</span>
            </>
          }
        />

        <RevealStagger className="grid grid-cols-2 gap-4 sm:grid-cols-4" stagger={0.05}>
          {industries.map((industry) => (
            <motion.div
              key={industry.name}
              variants={staggerChild}
              className="group glass flex flex-col items-center gap-3 rounded-2xl px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/40 hover:shadow-glow-purple"
            >
              <ServiceIcon
                name={industry.icon}
                className="h-7 w-7 text-muted transition-colors duration-300 group-hover:text-brand-cyan"
              />
              <span className="font-display text-sm font-medium text-foreground">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
