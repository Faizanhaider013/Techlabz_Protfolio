"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5500;

/** Auto-advancing testimonial slider with manual dot navigation. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % testimonials.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [next, paused]);

  const current = testimonials[index];

  return (
    <section
      className="section-pad relative"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="glow-blob right-[-10%] top-1/4 h-80 w-80 bg-brand-purple/35" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Trusted by teams who <span className="text-gradient">ship</span>
            </>
          }
        />

        <div className="gradient-border relative min-h-[300px] rounded-3xl p-8 sm:min-h-[260px] md:p-12">
          <Quote className="absolute right-8 top-8 h-10 w-10 text-brand-cyan/20" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="text-lg leading-relaxed text-foreground md:text-xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                {/* Initials avatar */}
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-white">
                  {current.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="font-display font-semibold text-white">{current.name}</p>
                  <p className="text-sm text-muted">{current.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2.5" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-gradient-brand" : "w-2 bg-white/15 hover:bg-white/30"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
