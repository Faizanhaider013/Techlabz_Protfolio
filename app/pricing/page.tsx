import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <ComingSoon
      eyebrow="Pricing"
      title="Engagement Models & Pricing"
      description="Fixed-scope projects, dedicated teams, and managed services — transparent pricing details are on the way. For a tailored quote today, start a conversation."
    />
  );
}
