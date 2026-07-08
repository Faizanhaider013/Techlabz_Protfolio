import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return (
    <ComingSoon
      eyebrow="Our work"
      title="Case Studies"
      description="Detailed breakdowns of how we've helped clients ship AI platforms, ServiceNow rollouts, and full-stack products — being prepared for publication now."
    />
  );
}
