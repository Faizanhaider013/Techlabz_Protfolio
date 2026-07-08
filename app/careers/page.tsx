import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <ComingSoon
      eyebrow="Join us"
      title="Careers at Tech Labz"
      description="We're always looking for exceptional engineers, designers, and consultants. Open roles will be listed here soon — in the meantime, say hello at hello@techlabz.com."
    />
  );
}
