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
        "mb-14 max-w-3xl md:mb-20",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <p className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
