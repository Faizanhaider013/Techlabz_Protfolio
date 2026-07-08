"use client";

import { motion } from "framer-motion";
import { RevealStagger, staggerChild } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { guarantees } from "@/lib/site";

/** Compact strip of delivery guarantees / promises. */
export function TrustStrip() {
  return (
    <section className="container-x mx-auto max-w-7xl py-6" aria-label="Our guarantees">
      <RevealStagger className="flex flex-wrap items-center justify-center gap-3">
        {guarantees.map((g) => (
          <motion.div
            key={g.label}
            variants={staggerChild}
            className="group glass flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 hover:border-brand-cyan/30 hover:shadow-glow-cyan"
          >
            <ServiceIcon name={g.icon} className="h-5 w-5 text-brand-green" />
            <span className="text-sm font-medium text-foreground">{g.label}</span>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}
