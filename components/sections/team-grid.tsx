"use client";

import { motion } from "framer-motion";
import { LinkedinIcon } from "@/components/social-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealStagger, staggerChild } from "@/components/ui/reveal";
import { team } from "@/lib/site";

/** Team cards with gradient initial avatars (swap for photos when ready). */
export function TeamGrid() {
  return (
    <section className="section-pad relative" aria-label="Meet our team">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our team"
          title={
            <>
              The minds behind <span className="text-gradient">the work</span>
            </>
          }
          description="Senior engineers, designers, and architects — no hand-offs to a B-team."
        />

        <RevealStagger className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerChild}
              className="group glass rounded-3xl p-5 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-purple/40"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-brand font-display text-xl font-bold text-white shadow-glow-cyan transition-transform duration-500 group-hover:scale-105">
                {member.initials}
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-xs text-muted">{member.role}</p>
              <a
                href="#"
                aria-label={`${member.name} on LinkedIn`}
                className="mt-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-brand-cyan"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
