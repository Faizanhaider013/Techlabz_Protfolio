import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealStagger } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { Counter } from "@/components/ui/counter";
import { CTA } from "@/components/sections/cta";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { TechLogoSprite } from "@/components/tech-logo-sprite";
import { TimelineSection } from "@/components/sections/timeline";
import { TeamGrid } from "@/components/sections/team-grid";
import { processSteps, stats, values } from "@/lib/site";
import { Award, Globe2, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Tech Labz is a full-service software house building AI-powered products, enterprise platforms, and cloud solutions. Meet the team and the story behind the work.",
};

export default function AboutPage() {
  return (
    <>
      {/* Mounted once — TechMarquee <use>s these symbols. */}
      <TechLogoSprite />
      <PageHeader
        eyebrow="About Tech Labz"
        title={
          <>
            Engineers, designers &amp; strategists{" "}
            <span className="text-gradient">obsessed with craft</span>
          </>
        }
        description="Founded to close the gap between enterprise reliability and startup velocity, Tech Labz builds intelligent software for companies who refuse to choose between the two."
      />

      {/* Story + Mission/Vision */}
      <section className="section-pad relative" aria-label="Our story">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our <span className="text-gradient">story</span>
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                Tech Labz began with a simple observation: enterprise software is where good
                user experiences go to die. Powerful platforms, painful products. We set out
                to change that — bringing consumer-grade design and modern engineering to the
                systems businesses actually run on.
              </p>
              <p>
                Today we&apos;re a multidisciplinary team of engineers, designers, and
                architects delivering ServiceNow platforms, production AI systems, cloud
                infrastructure, and full-stack products for clients across four continents.
              </p>
              <p>
                Every engagement runs on the same principles: transparent communication,
                demo-driven progress, and code we&apos;re proud to sign.
              </p>
            </div>
          </Reveal>

          <RevealStagger className="grid content-start gap-5">
            <div className="gradient-border rounded-3xl p-7">
              <h3 className="font-display text-xl font-semibold text-white">Mission</h3>
              <p className="mt-2.5 leading-relaxed text-muted">
                Make enterprise software feel effortless — intelligent, fast, and beautiful —
                so businesses can move at the speed of their ideas.
              </p>
            </div>
            <div className="gradient-border rounded-3xl p-7">
              <h3 className="font-display text-xl font-semibold text-white">Vision</h3>
              <p className="mt-2.5 leading-relaxed text-muted">
                To be the engineering partner behind the next generation of AI-native
                businesses — trusted from first prototype to global scale.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4 text-center">
                  <dd className="font-display text-2xl font-bold text-gradient">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </RevealStagger>
        </div>
      </section>

      {/* Core values */}
      <section className="section-pad relative" aria-label="Core values">
        <div className="glow-blob left-[-10%] top-1/3 h-80 w-80 bg-brand-purple/35" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core values"
            title={
              <>
                What we <span className="text-gradient">stand for</span>
              </>
            }
          />
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="group glass rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-cyan/30"
              >
                <ServiceIcon
                  name={value.icon}
                  className="mb-4 h-7 w-7 text-brand-cyan transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="font-display text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad relative" aria-label="Our process">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our process"
            title={
              <>
                From idea to impact in <span className="text-gradient">five moves</span>
              </>
            }
          />
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <div key={step.step} className="group relative">
                <div className="glass h-full rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-cyan/30">
                  <span className="font-display text-4xl font-bold text-gradient opacity-60">
                    {step.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <TimelineSection />
      <TeamGrid />
      <TechMarquee />

      {/* Awards + global reach + offices (placeholders) */}
      <section className="section-pad relative" aria-label="Recognition and reach">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3 lg:px-8">
          <Reveal>
            <div className="glass flex h-full flex-col items-center justify-center rounded-3xl p-10 text-center">
              <Award className="mb-4 h-9 w-9 text-brand-cyan" aria-hidden />
              <h3 className="font-display text-lg font-semibold text-white">Awards</h3>
              <p className="mt-2 text-sm text-muted">
                Industry recognition showcase — coming soon.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass flex h-full flex-col items-center justify-center rounded-3xl p-10 text-center">
              <Globe2 className="mb-4 h-9 w-9 text-brand-purple" aria-hidden />
              <h3 className="font-display text-lg font-semibold text-white">Global Clients</h3>
              <p className="mt-2 text-sm text-muted">
                Serving clients across North America, Europe, the Middle East &amp; Asia.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="glass flex h-full flex-col items-center justify-center rounded-3xl p-10 text-center">
              <ImageIcon className="mb-4 h-9 w-9 text-brand-cyan" aria-hidden />
              <h3 className="font-display text-lg font-semibold text-white">Our Offices</h3>
              <p className="mt-2 text-sm text-muted">
                Office &amp; culture photo gallery — coming soon.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
