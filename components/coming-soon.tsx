import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { ArrowLeft } from "lucide-react";

/** Shared placeholder body for routes that are planned but not yet built. */
export function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={
          <>
            {title} — <span className="text-gradient">coming soon</span>
          </>
        }
        description={description}
      />
      <section className="pb-32 pt-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Button href="/" variant="outline">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </div>
      </section>
    </>
  );
}
