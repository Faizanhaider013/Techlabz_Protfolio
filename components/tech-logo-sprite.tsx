import { spriteLogos, type TechMark } from "@/lib/tech-stack";
import { ServiceIcon } from "@/components/service-icon";
import { cn } from "@/lib/utils";

/**
 * Every official mark is inlined once as an SVG <symbol>; consumers reference
 * it with <use>. That keeps repeated marks (marquee clones, the brand orbit)
 * nearly free — the ~60 KB of path data ships once per page, not once per use.
 *
 * Render this exactly once per page, above any <TechGlyph>. Pages that show
 * technology logos are responsible for mounting it; duplicate mounts would
 * duplicate element ids.
 */
export function TechLogoSprite() {
  return (
    <svg aria-hidden focusable="false" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      {spriteLogos.map((logo) => (
        <symbol
          key={logo.id}
          id={`tech-${logo.id}`}
          viewBox={logo.viewBox}
          dangerouslySetInnerHTML={{ __html: logo.body }}
        />
      ))}
    </svg>
  );
}

/**
 * Renders one technology mark, whichever form it takes: an official SVG from
 * the sprite, a typographic wordmark, or a lucide glyph for concepts that have
 * no logo at all (AI/ML).
 */
export function TechGlyph({
  mark,
  className,
  wordmarkClassName,
}: {
  mark: TechMark;
  className?: string;
  wordmarkClassName?: string;
}) {
  if (mark.kind === "wordmark") {
    return (
      <span
        className={cn("font-display font-semibold lowercase leading-none tracking-tight", wordmarkClassName)}
        style={{ color: mark.color }}
      >
        {mark.text}
      </span>
    );
  }

  if (mark.kind === "icon") {
    // Lucide glyphs paint with `currentColor`, so tint the wrapper.
    return (
      <span className={cn("inline-flex items-center justify-center", className)} style={{ color: mark.color }}>
        <ServiceIcon name={mark.icon} className="h-full w-full" />
      </span>
    );
  }

  return (
    <svg aria-hidden focusable="false" className={cn(className)}>
      <use href={`#tech-${mark.id}`} />
    </svg>
  );
}
