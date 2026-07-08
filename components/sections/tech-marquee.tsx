import { technologies } from "@/lib/site";

/**
 * Infinite technology marquee. The list is duplicated so the CSS
 * animation can loop seamlessly at -50% translation.
 */
export function TechMarquee() {
  const row = [...technologies, ...technologies];
  return (
    <section id="technologies" aria-label="Technologies we trust" className="relative border-y border-white/5 py-10">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted">
        Trusted technologies powering our work
      </p>
      <div
        className="group relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {row.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="glass shrink-0 rounded-full px-6 py-2.5 font-display text-sm font-medium text-muted transition-colors hover:border-brand-cyan/40 hover:text-white"
              aria-hidden={i >= technologies.length}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
