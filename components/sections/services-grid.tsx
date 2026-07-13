"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { ServiceIcon } from "@/components/service-icon";
import { serviceCategories, services } from "@/lib/services";
import { cn } from "@/lib/utils";

/** Full services catalog with animated category filtering. */
export function ServicesGrid() {
  const [filter, setFilter] = useState<string>("all");
  const visible = filter === "all" ? services : services.filter((s) => s.category === filter);

  return (
    <section className="relative pb-24" aria-label="Services catalog">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Filter pills */}
        <div className="mb-12 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter services by category">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={filter === cat.id}
              onClick={() => setFilter(cat.id)}
              className={cn(
                "relative min-h-12 rounded-full px-5 py-3 font-display text-[0.95rem] font-medium transition-all duration-300 sm:px-6",
                filter === cat.id
                  ? "text-white"
                  : "glass text-muted hover:text-white"
              )}
            >
              {filter === cat.id && (
                <motion.span
                  layoutId="service-filter"
                  className="absolute inset-0 rounded-full bg-gradient-brand"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((service) => (
              <motion.div
                key={service.slug}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="group h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="gradient-border flex h-full flex-col rounded-[1.75rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl glass transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow-cyan">
                        <ServiceIcon
                          name={service.icon}
                          className="h-8 w-8 text-brand-cyan transition-colors group-hover:text-white"
                        />
                      </span>
                      <ArrowUpRight
                        className="h-6 w-6 text-muted-dark transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-cyan"
                        aria-hidden
                      />
                    </div>
                    <h3 className="font-display font-semibold text-card text-white">
                      {service.shortTitle}
                    </h3>
                    <p className="mt-3 flex-1 text-body text-muted">
                      {service.description.length > 130
                        ? `${service.description.slice(0, 130)}…`
                        : service.description}
                    </p>
                    {/* Tech chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 4 && (
                        <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-brand-cyan">
                          +{service.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
