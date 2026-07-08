import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Insights"
      title="The Tech Labz Blog"
      description="Deep dives on AI engineering, ServiceNow, cloud architecture, and product design — launching soon. Subscribe to the newsletter in the footer to be first to read."
    />
  );
}
