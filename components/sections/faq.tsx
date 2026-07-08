import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { homeFaqs } from "@/lib/site";

/** Home FAQ section. */
export function Faq() {
  return (
    <section className="section-pad relative" aria-label="Frequently asked questions">
      <div className="glow-blob left-[-8%] top-1/2 h-[24rem] w-[24rem] bg-brand-purple/25" aria-hidden />

      <div className="container-x relative mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="text-gradient">answered</span>
            </>
          }
          description="Everything you need to know before starting a conversation with us."
        />
        <FaqAccordion faqs={homeFaqs} />
      </div>
    </section>
  );
}
