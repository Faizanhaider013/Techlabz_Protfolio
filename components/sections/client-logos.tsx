"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ServiceIcon } from "@/components/service-icon";
import { clientIndustries } from "@/lib/site";

type ClientEntry = (typeof clientIndustries)[number];

/**
 * A single client card. Deliberately monochrome — the sector mark is the only
 * graphic, so the wall reads as a considered roster rather than a logo dump.
 */
function ClientCard({ entry, delay }: { entry: ClientEntry; delay: number }) {
  return (
    <div className="group/card relative shrink-0 cursor-pointer">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2 -z-10 rounded-[24px] bg-gradient-brand opacity-0 blur-xl transition-opacity duration-500 group-hover/card:opacity-25"
      />
      <div className="logo-float" style={{ animationDelay: `${delay}s` }}>
        {/* Sized for the longest pairing — "Telecommunications" over
            "Confidential Client" — so every card stays identical. */}
        <div className="logo-card flex h-[124px] w-[268px] items-center gap-4 px-5 sm:h-[132px] sm:w-[296px] sm:px-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-500 group-hover/card:border-white/20">
            <ServiceIcon
              name={entry.icon}
              className="h-6 w-6 text-muted transition-colors duration-500 group-hover/card:text-white"
            />
          </span>
          <span className="flex flex-col text-left">
            <span className="whitespace-nowrap font-display text-[15px] font-semibold leading-tight text-foreground sm:text-base">
              {entry.industry}
            </span>
            <span className="mt-1.5 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.14em] text-muted-dark transition-colors duration-500 group-hover/card:text-brand-cyan">
              {entry.client}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

const enter = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/**
 * Client wall — one slow, seamless rail. The base list is repeated so a single
 * group always overflows the widest viewport; the rail then carries two of
 * those groups for the -50% loop.
 */
export function ClientLogos() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const reduced = useReducedMotion();
  const group = [...clientIndustries, ...clientIndustries];

  return (
    <section
      ref={ref}
      aria-label="Trusted by teams across industries"
      data-marquee-active={inView}
      className="marquee-scope client-marquee relative overflow-hidden pb-16 pt-4 sm:pb-20"
    >
      <div className="relative mx-auto mb-12 max-w-3xl px-6 text-center">
        <p className="text-eyebrow font-semibold uppercase text-muted">
          Trusted by teams across industries
        </p>
        <p className="mt-4 text-sm text-muted-dark">
          Most of our engagements run under NDA. Sectors shown; names on request.
        </p>
      </div>

      <div className="marquee-row relative overflow-hidden py-4">
        <div className="marquee-rail">
          <ul className="flex w-max items-stretch" style={{ gap: "var(--marquee-gap)" }}>
            {group.map((entry, i) => (
              <motion.li
                key={`${entry.industry}-${i}`}
                // The list is doubled so one group always overflows the widest
                // viewport; the repeat collapses away when motion is reduced.
                data-marquee-dupe={i >= clientIndustries.length || undefined}
                variants={enter}
                initial={reduced ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: Math.min(i, 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <ClientCard entry={entry} delay={(i % 4) * 1.75} />
              </motion.li>
            ))}
          </ul>

          <ul
            aria-hidden
            data-marquee-clone="true"
            className="flex w-max items-stretch"
            style={{ gap: "var(--marquee-gap)" }}
          >
            {group.map((entry, i) => (
              <li key={`${entry.industry}-${i}-clone`}>
                <ClientCard entry={entry} delay={(i % 4) * 1.75} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
