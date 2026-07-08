import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/social-icons";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

const socialIcons = [
  { icon: LinkedinIcon, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: XIcon, href: siteConfig.socials.twitter, label: "Twitter / X" },
  { icon: GithubIcon, href: siteConfig.socials.github, label: "GitHub" },
  { icon: InstagramIcon, href: siteConfig.socials.instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      {/* Ambient glow */}
      <div className="glow-blob -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 bg-brand-purple/40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-all hover:-translate-y-0.5 hover:border-brand-cyan/40 hover:text-brand-cyan"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {[...navLinks, { label: "Careers", href: "/careers" }, { label: "Blog", href: "/blog" }].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-brand-cyan">
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
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-muted transition-colors hover:text-brand-cyan"
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
            <p className="mt-5 text-sm text-muted">
              Monthly insights on AI, cloud, and enterprise engineering. No spam.
            </p>
            <NewsletterForm />
            <ul className="mt-6 space-y-2.5 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-cyan" aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-cyan">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-cyan" aria-hidden />
                <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="hover:text-brand-cyan">{siteConfig.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                {siteConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>
            Engineered with <span className="text-gradient font-semibold">precision</span> by Tech Labz
          </p>
        </div>
      </div>
    </footer>
  );
}
