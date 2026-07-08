"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";

/** Floating AI-assistant launcher (placeholder — connect to your bot backend). */
export function ChatbotPlaceholder() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass mb-4 w-80 rounded-2xl p-5 shadow-card"
            role="dialog"
            aria-label="AI assistant"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand">
                <Sparkles className="h-5 w-5 text-white" aria-hidden />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-white">Labz Assistant</p>
                <p className="text-xs text-brand-cyan">● Online</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl rounded-tl-sm bg-white/5 p-3.5 text-sm leading-relaxed text-foreground">
              Hi! I&apos;m the Tech Labz AI assistant. Ask me about our services, or{" "}
              <a href="/contact" className="text-brand-cyan underline underline-offset-2">
                start a project
              </a>
              .
            </div>
            <p className="mt-3 text-center text-[11px] text-muted">
              AI chat coming soon — this is a preview.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow-cyan"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
