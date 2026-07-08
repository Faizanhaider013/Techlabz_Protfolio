import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { timeline } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Alternating vertical company timeline with gradient spine. */
export function TimelineSection() {
  return (
    <section className="section-pad relative" aria-label="Company timeline">
      <div className="glow-blob right-[-10%] top-1/2 h-80 w-80 bg-brand-cyan/30" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Timeline"
          title={
            <>
              Five years of <span className="text-gradient">momentum</span>
            </>
          }
        />

        <div className="relative">
          {/* Spine */}
          <div
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand-cyan via-brand-purple to-transparent md:left-1/2"
            aria-hidden
          />
          <ol className="space-y-10">
            {timeline.map((item, i) => (
              <li key={item.year} className="relative">
                <Reveal
                  direction={i % 2 === 0 ? "right" : "left"}
                  className={cn(
                    "ml-12 md:ml-0 md:w-[calc(50%-2.5rem)]",
                    i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  )}
                >
                  <div className="glass rounded-3xl p-6 transition-colors hover:border-brand-cyan/30">
                    <span className="font-display text-sm font-bold text-gradient">{item.year}</span>
                    <h3 className="mt-1 font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </Reveal>
                {/* Node */}
                <span
                  className="absolute left-4 top-7 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-brand shadow-glow-cyan md:left-1/2"
                  aria-hidden
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
