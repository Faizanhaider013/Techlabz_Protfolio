import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-all duration-300 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-brand-animated text-white shadow-glow-cyan hover:shadow-glow-purple hover:scale-[1.03] active:scale-[0.98]",
        outline:
          "glass text-foreground hover:border-brand-cyan/50 hover:bg-white/[0.07] hover:scale-[1.03] active:scale-[0.98]",
        ghost:
          "text-muted hover:text-white hover:bg-white/5",
      },
      size: {
        default: "h-13 px-8 text-[0.95rem]",
        lg: "h-15 px-10 text-base",
        sm: "h-11 px-6 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { href?: string };

/** Brand button; renders a Next <Link> when `href` is provided. */
export function Button({ className, variant, size, href, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
