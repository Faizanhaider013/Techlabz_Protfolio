"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/lib/site";

/**
 * Horizontal milestone timeline. The connecting rail draws itself as you
 * scroll and each node lights up when the rail reaches it.
 *
 * GSAP rather than Framer here because `SmoothScroll` already drives
 * ScrollTrigger from the Lenis ticker, so a scrubbed timeline stays glued to
 * the smoothed scroll position instead of fighting it.
 */
export function AboutTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Idempotent; SmoothScroll registers it too, but child effects run first.
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(rail.current, { scaleX: 1 });
      gsap.set(root.current?.querySelectorAll(".tl-node") ?? [], { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(rail.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 78%", end: "bottom 72%", scrub: 0.6 },
      });

      gsap.utils.toArray<HTMLElement>(".tl-node").forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0.35, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: { trigger: node, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      {/* Rail: dim track + gradient fill that scrubs in from the left. Inset to
          the centre of the first and last nodes (11rem/4 = 1.375rem radius). */}
      <div
        className="absolute left-[1.375rem] top-[1.375rem] hidden h-px md:block"
        style={{ right: "calc(20% - 1.375rem)" }}
        aria-hidden
      >
        <span className="absolute inset-0 bg-white/10" />
        <span
          ref={rail}
          className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-green"
        />
      </div>

      <ol className="grid gap-10 md:grid-cols-5 md:gap-5">
        {timeline.map((item) => (
          <li key={item.year} className="relative md:pt-0">
            <div className="tl-node relative mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-night md:mb-7">
              <span className="h-3 w-3 rounded-full bg-gradient-brand shadow-glow-cyan" aria-hidden />
            </div>
            <span className="font-display text-sm font-bold text-gradient">{item.year}</span>
            <h3 className="mt-1.5 font-display text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
