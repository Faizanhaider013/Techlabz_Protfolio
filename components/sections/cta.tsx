import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";

/** Full-width closing call-to-action band. */
export function CTA() {
  return (
    <section className="relative px-6 py-12 lg:px-8" aria-label="Start a project">
      <Reveal>
        <div className="gradient-border relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-8 py-20 text-center md:py-28">
          {/* Interior glows */}
          <div className="glow-blob left-[-8%] top-[-30%] h-72 w-72 bg-brand-cyan/60" aria-hidden />
          <div className="glow-blob bottom-[-30%] right-[-8%] h-72 w-72 bg-brand-purple/60" aria-hidden />
          <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />

          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let&apos;s build something{" "}
              <span className="text-gradient">amazing</span> together.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Tell us about your product, platform, or AI ambition — we&apos;ll come back
              within 48 hours with a plan.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Button href="/contact" size="lg">
                  Start Your Project
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href="/services" variant="outline" size="lg">
                  Explore Services
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
