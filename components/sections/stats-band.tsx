import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/lib/site";

/** Full-width gradient-bordered statistics band. */
export function StatsBand() {
  return (
    <section className="container-x relative mx-auto max-w-7xl py-8" aria-label="By the numbers">
      <Reveal>
        <div className="gradient-border relative overflow-hidden rounded-[2rem] px-6 py-14 md:px-12">
          <div className="glow-blob left-[10%] top-[-40%] h-56 w-56 bg-brand-cyan/40" aria-hidden />
          <div className="glow-blob right-[10%] bottom-[-40%] h-56 w-56 bg-brand-purple/40" aria-hidden />
          <div className="absolute inset-0 bg-dots opacity-50" aria-hidden />

          <dl className="relative grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dd className="font-display text-5xl font-bold text-gradient md:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-3 text-sm font-medium uppercase tracking-wider text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
