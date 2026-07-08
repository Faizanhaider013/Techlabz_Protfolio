"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealStagger, staggerChild } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { whyChooseUs } from "@/lib/site";

/** Eight differentiators in a compact glass grid. */
export function WhyChoose() {
  return (
    <section className="section-pad relative" aria-label="Why choose Tech Labz">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Tech Labz"
          title={
            <>
              The partner serious teams <span className="text-gradient">choose</span>
            </>
          }
          description="Eight reasons enterprises and fast-moving startups trust us with their most important products."
        />

        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerChild}
              className="group glass relative overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-brand-cyan/30 hover:shadow-card-hover"
            >
              {/* Hover gradient wash */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(51,198,255,0.08), transparent 50%, rgba(177,62,255,0.08))",
                }}
                aria-hidden
              />
              <div className="relative">
                <ServiceIcon
                  name={item.icon}
                  className="mb-5 h-9 w-9 text-brand-cyan transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2.5 text-body text-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
