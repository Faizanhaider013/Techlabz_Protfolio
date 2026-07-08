"use client";

import { motion } from "framer-motion";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 32, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/** Shared inner-page hero band with animated headline + ambient glows. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-52">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="glow-blob left-[-8%] top-[-20%] h-[28rem] w-[28rem] animate-aurora bg-brand-cyan/40" aria-hidden />
      <div className="glow-blob right-[-8%] top-[6%] h-[28rem] w-[28rem] animate-aurora bg-brand-purple/40 [animation-delay:-8s]" aria-hidden />

      <div className="container-x relative mx-auto max-w-7xl">
        <motion.p
          {...rise(0)}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-eyebrow font-semibold uppercase text-brand-cyan"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" aria-hidden />
          {eyebrow}
        </motion.p>
        <motion.h1 {...rise(0.1)} className="max-w-4xl font-display font-bold text-hero text-white">
          {title}
        </motion.h1>
        {description && (
          <motion.p {...rise(0.2)} className="mt-7 max-w-2xl text-body-lg text-muted">
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
