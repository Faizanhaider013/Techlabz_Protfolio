import { ArrowRight, Target, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { Reveal, RevealStagger } from "@/components/ui/reveal";
import { Logo } from "@/components/logo";
import { stats } from "@/lib/site";

/** Split about section: brand visual left, story + stats right. */
export function AboutPreview() {
  return (
    <section className="section-pad relative" aria-label="About Tech Labz">
      <div className="glow-blob left-[-15%] top-1/3 h-96 w-96 bg-brand-cyan/40" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* Visual panel — brand mark in a glass frame (swap for a team photo) */}
        <Reveal direction="right">
          <div className="gradient-border group relative aspect-[4/3] overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-float">
                <Logo withText={false} className="[&>svg]:h-40 [&>svg]:w-40 [&>svg]:drop-shadow-[0_0_60px_rgba(51,198,255,0.45)]" />
              </div>
            </div>
            <div className="glass absolute bottom-5 left-5 right-5 rounded-2xl p-4">
              <p className="font-display text-sm font-semibold text-white">
                Enterprise engineering. <span className="text-gradient">Startup velocity.</span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Story */}
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" aria-hidden />
              Who we are
            </p>
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              A software house built for the <span className="text-gradient">AI era</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Tech Labz is a full-service software house helping enterprises and ambitious
              startups ship intelligent products. From ServiceNow platforms to production
              AI systems, we combine deep engineering rigor with design obsession.
            </p>
          </Reveal>

          <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <Target className="mb-3 h-6 w-6 text-brand-cyan" aria-hidden />
              <h3 className="font-display font-semibold text-white">Our Mission</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Make enterprise software feel effortless — intelligent, fast, and beautiful.
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <Telescope className="mb-3 h-6 w-6 text-brand-purple" aria-hidden />
              <h3 className="font-display font-semibold text-white">Our Vision</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Be the engineering partner behind the next generation of AI-native businesses.
              </p>
            </div>
          </RevealStagger>

          {/* Stats */}
          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <Button href="/about" variant="outline">
              Our Full Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
