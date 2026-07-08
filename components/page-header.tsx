"use client";

import { motion } from "framer-motion";

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
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="glow-blob left-[-8%] top-[-20%] h-96 w-96 bg-brand-cyan/40" aria-hidden />
      <div className="glow-blob right-[-8%] top-[10%] h-96 w-96 bg-brand-purple/40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" aria-hidden />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
