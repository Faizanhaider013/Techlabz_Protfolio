"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealStagger, staggerChild, Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/lib/site";
import { cn } from "@/lib/utils";

const accentClasses: Record<string, string> = {
  cyan: "text-brand-cyan",
  purple: "text-brand-purple",
  green: "text-brand-green",
};

/** Selected work — outcome-led case study cards. */
export function CaseStudies() {
  return (
    <section className="section-pad relative" aria-label="Case studies">
      <div className="glow-blob right-[-10%] top-1/4 h-[26rem] w-[26rem] bg-brand-green/12" aria-hidden />

      <div className="container-x relative mx-auto max-w-7xl">
        <SectionHeading
          align="left"
          eyebrow="Selected work"
          title={
            <>
              Outcomes, not just <span className="text-gradient">output</span>
            </>
          }
          description="A look at how we've helped clients ship platforms, copilots, and products that move the metrics that matter."
        />

        <RevealStagger className="grid gap-7 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <motion.div key={study.title} variants={staggerChild}>
              <Link
                href="/case-studies"
                className="group gradient-border relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                    {study.tag}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-dark transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-cyan" aria-hidden />
                </div>

                <div className="mb-6 flex items-baseline gap-3">
                  <span className={cn("font-display text-5xl font-bold", accentClasses[study.accent])}>
                    {study.metric}
                  </span>
                  <span className="text-sm font-medium uppercase tracking-wider text-muted">
                    {study.metricLabel}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold leading-snug text-white">
                  {study.title}
                </h3>
                <p className="mt-3 flex-1 text-body text-muted">{study.description}</p>
              </Link>
            </motion.div>
          ))}
        </RevealStagger>

        <Reveal className="mt-14">
          <Button href="/case-studies" variant="outline" size="lg">
            View All Case Studies
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
