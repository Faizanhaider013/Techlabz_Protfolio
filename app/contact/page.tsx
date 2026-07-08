import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealStagger } from "@/components/ui/reveal";
import { contactFaqs, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your project with Tech Labz. Tell us about your product, platform, or AI ambition — we respond within 48 hours.",
};

const contactCards = [
  { icon: Mail, label: "Email us", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Call us", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}` },
  { icon: MapPin, label: "Visit us", value: siteConfig.address },
  { icon: Clock, label: "Business hours", value: siteConfig.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s start the <span className="text-gradient">conversation</span>
          </>
        }
        description="Whether you have a detailed spec or a napkin sketch, we'll help you shape it into a plan. Every inquiry gets a response within 48 hours."
      />

      {/* Split layout: form + info */}
      <section className="relative pb-24" aria-label="Contact form and details">
        <div className="glow-blob left-[-10%] top-1/4 h-96 w-96 bg-brand-cyan/30" aria-hidden />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
          {/* Form */}
          <Reveal direction="right">
            <div className="gradient-border rounded-3xl p-7 md:p-10">
              <h2 className="font-display text-2xl font-bold text-white">
                Tell us about your project
              </h2>
              <p className="mt-2 text-sm text-muted">
                Fields marked * are required.
              </p>
              <ContactForm />
            </div>
          </Reveal>

          {/* Info column */}
          <div className="flex flex-col gap-5">
            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {contactCards.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="group glass rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-cyan/30"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand shadow-glow-cyan transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-white" aria-hidden />
                  </span>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
                    {label}
                  </h3>
                  {href ? (
                    <a href={href} className="mt-1 block font-medium text-white transition-colors hover:text-brand-cyan">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-medium text-white">{value}</p>
                  )}
                </div>
              ))}
            </RevealStagger>

            {/* Map placeholder */}
            <Reveal delay={0.2}>
              <div className="glass relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-grid" aria-hidden />
                <div className="glow-blob left-1/3 top-1/3 h-40 w-40 bg-brand-purple/50" aria-hidden />
                <div className="relative text-center">
                  <MapPin className="mx-auto h-8 w-8 text-brand-cyan" aria-hidden />
                  <p className="mt-2 text-sm font-medium text-muted">
                    Interactive map coming soon
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad relative" aria-label="Frequently asked questions">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Before you <span className="text-gradient">reach out</span>
              </>
            }
          />
          <FaqAccordion faqs={contactFaqs} />
        </div>
      </section>
    </>
  );
}
