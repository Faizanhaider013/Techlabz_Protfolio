"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { RevealStagger, staggerChild, Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ServiceIcon } from "@/components/service-icon";
import { services } from "@/lib/services";

/** Home-page services grid — six premium tilting cards with feature peeks. */
export function ServicesPreview() {
  return (
    <section className="section-pad relative" aria-label="Our services">
      <div className="glow-blob right-[-12%] top-0 h-[28rem] w-[28rem] bg-brand-purple/35" aria-hidden />

      <div className="container-x relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Services engineered for <span className="text-gradient">impact</span>
            </>
          }
          description="Ten specialized practices, one accountable partner — covering the full lifecycle from strategy and design to build, launch, and scale."
        />

        <RevealStagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <motion.div key={service.slug} variants={staggerChild}>
              <TiltCard className="group h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="gradient-border relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-8 transition-all duration-500 hover:shadow-card-hover"
                >
                  {/* Hover gradient wash */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(120% 90% at 0% 0%, rgba(51,198,255,0.09), transparent 55%)" }}
                    aria-hidden
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="mb-6 flex items-start justify-between">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand/10 glass transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow-cyan">
                        <ServiceIcon name={service.icon} className="h-8 w-8 text-brand-cyan transition-colors group-hover:text-white" />
                      </span>
                      <ArrowUpRight className="h-6 w-6 text-muted-dark transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-cyan" aria-hidden />
                    </div>

                    <h3 className="font-display font-semibold text-card text-white">{service.shortTitle}</h3>
                    <p className="mt-3 text-body text-muted">{service.tagline}</p>

                    {/* Feature peek — revealed on hover */}
                    <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-5">
                      {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </RevealStagger>

        <Reveal className="mt-14 text-center">
          <Button href="/services" variant="outline" size="lg">
            View All Services
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
