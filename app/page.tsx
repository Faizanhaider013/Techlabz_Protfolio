import { TechLogoSprite } from "@/components/tech-logo-sprite";
import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { ClientLogos } from "@/components/sections/client-logos";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Process } from "@/components/sections/process";
import { WhyChoose } from "@/components/sections/why-choose";
import { Industries } from "@/components/sections/industries";
import { StatsBand } from "@/components/sections/stats-band";
import { CaseStudies } from "@/components/sections/case-studies";
import { Certifications } from "@/components/sections/certifications";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { TrustStrip } from "@/components/sections/trust-strip";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      {/* Mounted once — TechMarquee and the About orbit both <use> these symbols. */}
      <TechLogoSprite />
      <Hero />
      <TechMarquee />
      <ClientLogos />
      <AboutPreview />
      <ServicesPreview />
      <Process />
      <WhyChoose />
      <Industries />
      <StatsBand />
      <CaseStudies />
      <Certifications />
      <Testimonials />
      <Faq />
      <TrustStrip />
      <CTA />
    </>
  );
}
