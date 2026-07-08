"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechGlyph } from "@/components/tech-logo-sprite";
import { techRows, type TechMark } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

function TechCard({ mark, delay }: { mark: TechMark; delay: number }) {
  return (
    <div className="group/card relative shrink-0 cursor-pointer">
      {/* Cyan→purple bloom behind the card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2 -z-10 rounded-[24px] bg-gradient-brand opacity-0 blur-xl transition-opacity duration-500 group-hover/card:opacity-30"
      />
      <div className="logo-float" style={{ animationDelay: `${delay}s` }}>
        <div className="logo-card flex h-[132px] w-[146px] flex-col items-center justify-center gap-3.5 px-4 sm:h-[144px] sm:w-[164px] lg:h-[152px] lg:w-[176px]">
          <span className="flex h-11 w-[84px] items-center justify-center sm:h-12 sm:w-[92px]">
            <TechGlyph
              mark={mark}
              className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-110"
              wordmarkClassName="text-[15px] sm:text-base"
            />
          </span>
          <span className="font-display text-[13px] font-medium text-muted transition-colors duration-500 group-hover/card:text-white sm:text-sm">
            {mark.name}
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

function MarqueeRow({ marks, reverse }: { marks: TechMark[]; reverse?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="marquee-row relative overflow-hidden py-4">
      <div className={cn("marquee-rail", reverse && "marquee-rail--reverse")}>
        <ul className="flex w-max items-stretch" style={{ gap: "var(--marquee-gap)" }}>
          {marks.map((mark, i) => (
            <motion.li
              key={mark.id}
              variants={enter}
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: Math.min(i, 10) * 0.055,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TechCard mark={mark} delay={(i % 5) * 1.4} />
            </motion.li>
          ))}
        </ul>

        {/* Seamless second lap. Hidden from AT and from reduced-motion layout. */}
        <ul
          aria-hidden
          data-marquee-clone="true"
          className="flex w-max items-stretch"
          style={{ gap: "var(--marquee-gap)" }}
        >
          {marks.map((mark, i) => (
            <li key={`${mark.id}-clone`}>
              <TechCard mark={mark} delay={(i % 5) * 1.4} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Technology showcase — two counter-scrolling rows of official brand marks.
 * The rails stay parked until the section is on screen so we never burn frames
 * animating something nobody can see.
 *
 * Requires <TechLogoSprite /> to be mounted once on the page.
 */
export function TechMarquee() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "200px" });

  return (
    <section
      ref={ref}
      id="technologies"
      aria-label="Technologies we trust"
      data-marquee-active={inView}
      className="marquee-scope section-pad relative scroll-mt-28 overflow-hidden border-y border-white/5"
    >
      <div className="glow-blob left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 bg-brand-purple/20" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technology Stack"
          title={
            <>
              Trusted technologies <span className="text-gradient">powering our work</span>
            </>
          }
          description="The frameworks, models, and platforms we ship to production every week — chosen for longevity, not novelty."
        />
      </div>

      <div className="relative flex flex-col gap-6">
        <MarqueeRow marks={techRows[0]} />
        <MarqueeRow marks={techRows[1]} reverse />
      </div>
    </section>
  );
}
