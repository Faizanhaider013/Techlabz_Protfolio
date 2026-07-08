import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesPreview } from "@/components/sections/services-preview";
import { WhyChoose } from "@/components/sections/why-choose";
import { Industries } from "@/components/sections/industries";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <AboutPreview />
      <ServicesPreview />
      <WhyChoose />
      <Industries />
      <Testimonials />
      <CTA />
    </>
  );
}
