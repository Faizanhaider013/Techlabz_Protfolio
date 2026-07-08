import { cn } from "@/lib/utils";

/**
 * Tech Labz logo mark — hexagonal circuit node with the signature
 * cyan → purple gradient. Replace the <svg> with your production
 * logo asset when available; the gradient IDs are self-contained.
 */
export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#33C6FF" />
            <stop offset="100%" stopColor="#B13EFF" />
          </linearGradient>
        </defs>
        {/* Hexagon shell */}
        <path
          d="M20 2 L35.5 11 V29 L20 38 L4.5 29 V11 Z"
          fill="none"
          stroke="url(#tl-grad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Circuit node core */}
        <circle cx="20" cy="20" r="5" fill="url(#tl-grad)" />
        <path
          d="M20 15 V8 M20 25 V32 M15.7 17.5 L9.5 14 M24.3 17.5 L30.5 14 M15.7 22.5 L9.5 26 M24.3 22.5 L30.5 26"
          stroke="url(#tl-grad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      {withText && (
        <span className="font-display text-xl font-bold tracking-tight text-white">
          Tech<span className="text-gradient"> Labz</span>
        </span>
      )}
    </span>
  );
}
