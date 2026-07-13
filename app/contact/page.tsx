import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkedinIcon } from "@/components/social-icons";
import { Reveal, RevealStagger } from "@/components/ui/reveal";
import { contactFaqs, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your project with Tech Labz. Tell us about your product, platform, or AI ambition — we respond within 48 hours.",
};

const contactCards = [
  {
    icon: Mail,
    label: "Email us",
    value: siteConfig.email,
    sub: "We reply within 48 hours",
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: LinkedinIcon,
    label: "Connect on LinkedIn",
    value: "Tech Labz Solution",
    sub: "Follow our latest work",
    href: siteConfig.socials.linkedin,
    external: true,
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: siteConfig.address,
    sub: "By appointment",
  },
  {
    icon: Clock,
    label: "Business hours",
    value: siteConfig.hours,
    sub: "Response times may vary",
  },
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
      <section className="relative pb-28" aria-label="Contact form and details">
        <div className="glow-blob left-[-10%] top-1/4 h-96 w-96 bg-brand-cyan/30" aria-hidden />

        <div className="container-x relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <Reveal direction="right">
            <div className="gradient-border rounded-[1.75rem] p-6 sm:p-8 md:p-10">
              <h2 className="font-display text-h3 font-bold text-white">
                Tell us about your project
              </h2>
              <p className="mt-3 text-body text-muted">Fields marked * are required.</p>
              <ContactForm />
            </div>
          </Reveal>

          {/* Info column */}
          <div className="flex flex-col gap-6">
            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {contactCards.map(({ icon: Icon, label, value, sub, href, external }) => {
                const inner = (
                  <>
                    <span className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow-cyan transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-white" aria-hidden />
                    </span>
                    <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-muted">
                      {label}
                    </h3>
                    <p className="mt-1.5 font-display text-lg font-semibold text-white transition-colors group-hover:text-brand-cyan">
                      {value}
                    </p>
                    <p className="mt-1 text-sm text-muted-dark">{sub}</p>
                  </>
                );
                const cls =
                  "group glass block rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-cyan/30 hover:shadow-card-hover";
                return href ? (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cls}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </RevealStagger>

            {/* Map placeholder */}
            <Reveal delay={0.2}>
              <div className="glass relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-grid" aria-hidden />
                <div className="glow-blob left-1/3 top-1/3 h-40 w-40 bg-brand-purple/50" aria-hidden />
                <div className="relative text-center">
                  <MapPin className="mx-auto h-9 w-9 text-brand-cyan" aria-hidden />
                  <p className="mt-3 text-body font-medium text-muted">Interactive map coming soon</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad relative" aria-label="Frequently asked questions">
        <div className="container-x mx-auto max-w-3xl">
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
