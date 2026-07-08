import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ServiceNow, AI & machine learning, web and mobile development, data engineering, cloud & DevOps, QA, cyber security, and product design — end-to-end software services from Tech Labz.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title={
          <>
            Everything you need to <span className="text-gradient">build &amp; scale</span>
          </>
        }
        description="Ten specialized practices under one roof — filter by discipline or explore the full catalog."
      />
      <ServicesGrid />
      <CTA />
    </>
  );
}
