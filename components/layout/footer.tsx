import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/social-icons";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

export function Footer() {
  return (
    <footer className="relative mt-28 border-t border-white/5">
      {/* Ambient glow */}
      <div className="glow-blob -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 bg-brand-purple/40" aria-hidden />

      <div className="container-x relative mx-auto max-w-7xl pb-10 pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <Logo tagline />
            <p className="mt-6 max-w-xs text-body text-muted">{siteConfig.description}</p>
            <div className="mt-7 flex gap-3">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tech Labz on LinkedIn"
                className="glass flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-all hover:-translate-y-0.5 hover:border-brand-cyan/40 hover:text-brand-cyan"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label={`Email ${siteConfig.email}`}
                className="glass flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-all hover:-translate-y-0.5 hover:border-brand-cyan/40 hover:text-brand-cyan"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Company
            </h3>
            <ul className="mt-6 space-y-3.5">
              {[...navLinks, { label: "Careers", href: "/careers" }, { label: "Blog", href: "/blog" }].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body text-muted transition-colors hover:text-brand-cyan">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Services
            </h3>
            <ul className="mt-6 space-y-3.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-body text-muted transition-colors hover:text-brand-cyan"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + newsletter */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Stay in the loop
            </h3>
            <p className="mt-6 text-body text-muted">
              Monthly insights on AI, cloud, and enterprise engineering. No spam.
            </p>
            <NewsletterForm />
            <ul className="mt-7 space-y-3 text-body text-muted">
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-brand-cyan" aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-cyan">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <LinkedinIcon className="h-4.5 w-4.5 text-brand-cyan" />
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan">
                  linkedin.com/company/techlabz-solution
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>
            Engineered with <span className="text-gradient font-semibold">precision</span> by Tech Labz
          </p>
        </div>
      </div>
    </footer>
  );
}
