import { cn } from "@/lib/utils";

/**
 * Tech Labz logo mark — lab flask ("TL") inside a circuit ring with the
 * signature cyan → purple gradient and lime-green circuit nodes, matching
 * the brand identity. Self-contained SVG (crisp, scalable, transparent).
 */
export function Logo({
  className,
  withText = true,
  tagline = false,
}: {
  className?: string;
  withText?: boolean;
  tagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.35rem] font-bold tracking-tight">
            <span className="text-brand-cyan">Tech</span>{" "}
            <span className="text-brand-purple">Labz</span>
          </span>
          {tagline && (
            <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-muted">
              Software House
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/** The flask mark on its own — reusable at any size. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="tl-ring" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#33C6FF" />
          <stop offset="100%" stopColor="#B13EFF" />
        </linearGradient>
        <linearGradient id="tl-flask" x1="20" y1="18" x2="46" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3AC9FF" />
          <stop offset="100%" stopColor="#B13EFF" />
        </linearGradient>
      </defs>

      {/* Circuit ring (broken circle, like the brand) */}
      <path
        d="M32 6 a26 26 0 0 1 0 52"
        stroke="url(#tl-ring)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M32 58 a26 26 0 0 1 -20-42.5"
        stroke="url(#tl-ring)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Flask body — rounded triangular beaker */}
      <path
        d="M28 17 v10 l-8.5 15.5 a5 5 0 0 0 4.4 7.4 h16.2 a5 5 0 0 0 4.4-7.4 L36 27 v-10"
        stroke="url(#tl-flask)"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Flask neck rim */}
      <path d="M25.5 17 h13" stroke="url(#tl-flask)" strokeWidth="2.6" strokeLinecap="round" />
      {/* Liquid line */}
      <path
        d="M22.5 39.5 h19"
        stroke="#B13EFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Circuit traces + green nodes */}
      <g stroke="#56E0A0" strokeWidth="1.5" strokeLinecap="round">
        <path d="M28 22 h-6 v-4" />
        <path d="M28 27 h-9" />
        <path d="M26 33 h-5 v4" />
      </g>
      <g fill="#56E0A0">
        <circle cx="22" cy="18" r="1.6" />
        <circle cx="19" cy="27" r="1.6" />
        <circle cx="21" cy="37" r="1.6" />
      </g>
    </svg>
  );
}
