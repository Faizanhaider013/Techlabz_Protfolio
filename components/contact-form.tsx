"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";

type Status = "idle" | "submitting" | "success";

const inputClasses =
  "w-full rounded-xl glass px-4 py-3.5 text-sm text-white placeholder:text-muted/70 transition-colors focus:border-brand-cyan/60 focus:outline-none";

/**
 * Contact form — client-side validated placeholder.
 * Wire `handleSubmit` to your API route / CRM when ready.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Simulated request — replace with a POST to your API route.
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-10 flex flex-col items-center gap-4 py-14 text-center"
        role="status"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand shadow-glow-cyan">
          <CheckCircle2 className="h-8 w-8 text-white" aria-hidden />
        </span>
        <h3 className="font-display text-2xl font-bold text-white">Message sent!</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Thanks for reaching out — our team will get back to you within 48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Full name *
          </label>
          <input id="name" name="name" required placeholder="Jane Smith" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
            Company
          </label>
          <input id="company" name="company" placeholder="Acme Inc." className={inputClasses} />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-foreground">
            Service of interest *
          </label>
          <select id="service" name="service" required defaultValue="" className={inputClasses}>
            <option value="" disabled className="bg-night">
              Select a service…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug} className="bg-night">
                {s.shortTitle}
              </option>
            ))}
            <option value="other" className="bg-night">
              Something else
            </option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="mb-2 block text-sm font-medium text-foreground">
          Estimated budget
        </label>
        <select id="budget" name="budget" defaultValue="" className={inputClasses}>
          <option value="" disabled className="bg-night">
            Select a range…
          </option>
          {["Under $10k", "$10k – $50k", "$50k – $150k", "$150k+"].map((range) => (
            <option key={range} value={range} className="bg-night">
              {range}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          Project details *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what you're building, your timeline, and what success looks like…"
          className={inputClasses}
        />
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="justify-self-start">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
