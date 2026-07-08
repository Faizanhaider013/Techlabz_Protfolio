import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/** Consistent eyebrow + headline + description block for every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-16 max-w-3xl md:mb-20",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <p
        className={cn(
          "mb-5 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-eyebrow font-semibold uppercase text-brand-cyan",
          align === "center" && "mx-auto"
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-display font-bold text-h2 text-white">{title}</h2>
      {description && (
        <p className={cn("mt-6 text-body-lg text-muted", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
