"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/** Footer newsletter capture (front-end placeholder — wire to your ESP). */
export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubscribed(true);
      }}
    >
      <div className="glass flex items-center rounded-full p-1 transition-colors focus-within:border-brand-cyan/50">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full bg-transparent px-4 text-sm text-white placeholder:text-muted focus:outline-none"
          disabled={subscribed}
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white transition-transform hover:scale-105"
        >
          {subscribed ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      {subscribed && (
        <p className="mt-2 text-xs text-brand-cyan" role="status">
          You&apos;re subscribed — welcome aboard.
        </p>
      )}
    </form>
  );
}
