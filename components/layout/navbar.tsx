"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { headerLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Premium sticky header. 90px tall at top, smoothly shrinks to 72px on scroll
 * with deeper blur + shadow and a slightly smaller logo. Logo left, nav
 * centered, CTA right — all vertically centered with flexbox.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close drawer on route change (adjust-state-during-render pattern).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // While the drawer is open, freeze page scroll (Lenis scrolls the window
  // natively, so clamping the root is enough) and auto-close if the viewport
  // grows into the desktop layout.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => {
      root.style.overflow = prev;
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  // Hash links (Technologies/Industries) are never "active" — they only
  // underline on hover; page routes underline when their route matches.
  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:px-6">
      <motion.nav
        aria-label="Main navigation"
        initial={false}
        animate={{ height: scrolled ? 72 : 90 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex w-full max-w-7xl items-center justify-between rounded-2xl px-5 transition-[background,box-shadow,border-color] duration-500 md:px-7",
          scrolled
            ? "border border-white/10 bg-night-800/70 shadow-card backdrop-blur-[20px]"
            : "border border-white/5 bg-night-800/30 backdrop-blur-[12px]"
        )}
      >
        {/* LEFT — logo */}
        <Link href="/" aria-label="Tech Labz — Home" className="shrink-0">
          <motion.span
            className="inline-flex"
            initial={false}
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left center" }}
          >
            <Logo />
          </motion.span>
        </Link>

        {/* CENTER — nav links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {headerLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative rounded-full px-4 py-2 text-[1.05rem] font-medium transition-all duration-300 hover:-translate-y-0.5",
                    active ? "text-white" : "text-muted hover:text-white"
                  )}
                >
                  {/* `text-gradient` keeps `background` and `background-clip` in
                      one rule — applying them as separate utilities lets the
                      shorthand reset the clip and paint the whole box. */}
                  <span className="transition-colors duration-300 group-hover:text-gradient">
                    {link.label}
                  </span>
                  {/* Animated underline — slides in from left on hover; full when active */}
                  <span
                    className={cn(
                      "absolute inset-x-3 bottom-1 h-px origin-left bg-gradient-brand transition-transform duration-300 ease-out",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT — CTA */}
        <div className="hidden shrink-0 lg:block">
          <Magnetic strength={12}>
            <Button href="/contact" size="sm">
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          className="-mr-2 flex h-12 w-12 items-center justify-center rounded-lg text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-strong absolute inset-x-4 top-[86px] max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-2xl p-4 shadow-card lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {headerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    // Hash links to the current page don't change the pathname,
                    // so the route-change close never fires — close explicitly.
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-5 py-4 text-lg font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-white/5 text-white"
                        : "text-muted hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-white/5 pt-4">
              <Button href="/contact" className="w-full">
                Start Your Project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
