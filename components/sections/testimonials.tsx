"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5500;
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

/** Auto-advancing testimonial slider with swipe + manual dot navigation. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % testimonials.length),
    []
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
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

        <motion.div
          className="gradient-border relative min-h-[300px] touch-pan-y rounded-3xl p-6 sm:min-h-[260px] sm:p-8 md:p-12"
          // Swipe left/right to change testimonials; constraints snap the card
          // back so only the gesture (not the card) travels.
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={() => setPaused(true)}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) next();
            else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) prev();
            setPaused(false);
          }}
        >
          <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-cyan/20 sm:right-8 sm:top-8" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-display text-xl font-medium leading-snug text-foreground sm:text-2xl md:text-[1.75rem]">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-9 flex items-center gap-4">
                {/* Initials avatar */}
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-base font-bold text-white shadow-glow-cyan">
                  {current.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-white">{current.name}</p>
                  <p className="text-body text-muted">{current.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>

        {/* Dots — the visible pill sits inside a 48px-tall touch target. */}
        <div className="mt-4 flex justify-center gap-1" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className="group flex h-12 items-center px-1.5"
            >
              <span
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-gradient-brand" : "w-2 bg-white/15 group-hover:bg-white/30"
                )}
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
