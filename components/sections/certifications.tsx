"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealStagger, staggerChild } from "@/components/ui/reveal";
import { partners, compliance } from "@/lib/site";

/**
 * Partnerships + compliance readiness band. Communicates enterprise
 * trustworthiness. Badges are illustrative — replace with earned ones.
 */
export function Certifications() {
  return (
    <section className="section-pad relative" aria-label="Partnerships and compliance">
      <div className="glow-blob left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 bg-brand-cyan/20" aria-hidden />

      <div className="container-x relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Certifications & partnerships"
          title={
            <>
              Enterprise-grade by <span className="text-gradient">every measure</span>
            </>
          }
          description="We build on the platforms your business already trusts — and to the security standards your auditors expect."
        />

        {/* Technology partners */}
        <RevealStagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <motion.div
              key={partner}
              variants={staggerChild}
              className="group glass flex flex-col items-center justify-center gap-3 rounded-2xl px-4 py-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-cyan/30 hover:shadow-glow-cyan"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand/10 glass">
                <ShieldCheck className="h-5 w-5 text-brand-cyan" aria-hidden />
              </span>
              <span className="font-display text-sm font-semibold leading-tight text-foreground">
                {partner}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-dark">
                Partner
              </span>
            </motion.div>
          ))}
        </RevealStagger>

        {/* Compliance shields */}
        <RevealStagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {compliance.map((item) => (
            <motion.div
              key={item.name}
              variants={staggerChild}
              className="group gradient-border flex items-center gap-4 rounded-2xl px-6 py-5 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Shield badge */}
              <svg viewBox="0 0 40 44" className="h-11 w-11 shrink-0" aria-hidden>
                <defs>
                  <linearGradient id={`shield-${item.name}`} x1="0" y1="0" x2="40" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#33C6FF" />
                    <stop offset="100%" stopColor="#B13EFF" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 2 L36 8 V22 C36 33 29 40 20 42 C11 40 4 33 4 22 V8 Z"
                  fill="none"
                  stroke={`url(#shield-${item.name})`}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M13 22 l5 5 l9-11" fill="none" stroke="#56E0A0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="font-display text-lg font-bold text-white">{item.name}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </RevealStagger>

        <p className="mt-8 text-center text-sm text-muted-dark">
          Partner and compliance marks shown are illustrative of our practice areas.
        </p>
      </div>
    </section>
  );
}
