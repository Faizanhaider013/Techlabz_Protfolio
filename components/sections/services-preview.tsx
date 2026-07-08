"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { RevealStagger, staggerChild } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/services";

/** Home-page services grid — top six services as tilting gradient cards. */
export function ServicesPreview() {
  return (
    <section className="section-pad relative" aria-label="Our services">
      <div className="glow-blob right-[-12%] top-0 h-96 w-96 bg-brand-purple/40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Services engineered for <span className="text-gradient">impact</span>
            </>
          }
          description="Ten specialized practices, one accountable partner — covering the full lifecycle from strategy and design to build, launch, and scale."
        />

        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <motion.div key={service.slug} variants={staggerChild}>
              <TiltCard className="group h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="gradient-border flex h-full flex-col rounded-3xl p-7 transition-shadow duration-500 hover:shadow-glow-cyan"
                >
                  <span className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl glass transition-transform duration-500 group-hover:scale-110">
                    <ServiceIcon name={service.icon} className="h-6 w-6 text-brand-cyan transition-colors group-hover:text-white" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {service.shortTitle}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                    {service.tagline}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan">
                    Explore
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </RevealStagger>

        <Reveal className="mt-12 text-center">
          <Button href="/services" variant="outline" size="lg">
            View All Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
