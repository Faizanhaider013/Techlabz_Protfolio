import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealStagger } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { FaqAccordion } from "@/components/faq-accordion";
import { CTA } from "@/components/sections/cta";
import { getService, services } from "@/lib/services";
import { processSteps, siteConfig } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    openGraph: { title: `${service.title} | ${siteConfig.name}`, description: service.description },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const service = getService((await params).slug);
  if (!service) notFound();

  // Schema.org Service markup for rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={service.shortTitle}
        title={service.title}
        description={service.description}
      />

      {/* Features */}
      <section className="section-pad relative" aria-label="What's included">
        <div className="glow-blob left-[-10%] top-1/4 h-80 w-80 bg-brand-cyan/35" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Capabilities"
            title={
              <>
                What&apos;s <span className="text-gradient">included</span>
              </>
            }
          />
          <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
            {service.features.map((feature) => (
              <div
                key={feature}
                className="glass flex items-start gap-3 rounded-2xl p-5 transition-colors hover:border-brand-cyan/30"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan" aria-hidden />
                <span className="text-sm font-medium leading-relaxed text-foreground">
                  {feature}
                </span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad relative" aria-label="Benefits">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Benefits"
            title={
              <>
                Why it <span className="text-gradient">matters</span>
              </>
            }
          />
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="gradient-border group rounded-3xl p-6 transition-shadow duration-500 hover:shadow-glow-purple"
              >
                <ServiceIcon
                  name={service.icon}
                  className="mb-4 h-6 w-6 text-brand-purple transition-transform group-hover:scale-110"
                />
                <h3 className="font-display text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.description}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Tech stack */}
      <section className="border-y border-white/5 py-16" aria-label="Technology stack">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Technology stack
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="glass rounded-full px-5 py-2 font-display text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-cyan/40 hover:text-brand-cyan"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad relative" aria-label="Delivery process">
        <div className="glow-blob right-[-10%] top-1/3 h-80 w-80 bg-brand-purple/35" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="How we deliver"
            title={
              <>
                Our proven <span className="text-gradient">process</span>
              </>
            }
          />
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="glass rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-cyan/30"
              >
                <span className="font-display text-3xl font-bold text-gradient opacity-60">
                  {step.step}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad relative" aria-label="Frequently asked questions">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Common <span className="text-gradient">questions</span>
              </>
            }
          />
          <FaqAccordion faqs={service.faqs} />
        </div>
      </section>

      <CTA />
    </>
  );
}
