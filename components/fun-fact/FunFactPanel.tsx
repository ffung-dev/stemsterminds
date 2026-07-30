"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SocialLink } from "@/lib/types";

const ROTATE_INTERVAL_MS = 8000;

export function FunFactPanel({
  facts,
  socialLinks,
}: {
  facts: string[];
  socialLinks: SocialLink[];
}) {
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open || facts.length < 2) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % facts.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [open, facts.length]);

  if (facts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <motion.div
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="relative w-72"
      >
        <div className="brand-gradient rounded-r-3xl border border-l-0 border-border-soft p-5 shadow-lg">
          <div className="mb-3 flex items-center gap-2 text-ink">
            <Lightbulb className="h-5 w-5 text-coral" aria-hidden="true" />
            <span className="font-display text-sm font-bold uppercase tracking-wide">Did You Know?</span>
          </div>
          <div className="min-h-20">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-sm leading-relaxed text-ink"
              >
                {facts[index]}
              </motion.p>
            </AnimatePresence>
          </div>
          {socialLinks.length > 0 && (
            <div className="mt-4 flex items-center gap-3 border-t border-ink/10 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform + link.url}
                  href={link.url}
                  target={link.platform === "email" ? undefined : "_blank"}
                  rel={link.platform === "email" ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-surface/70 text-ink transition-transform hover:scale-110 hover:text-coral"
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Hide fun facts" : "Show fun facts"}
          data-testid="fun-fact-toggle"
          className="pointer-events-auto absolute -right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-soft bg-button text-ink shadow-md transition-transform hover:scale-105"
        >
          {open ? <ChevronLeft className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
        </button>
      </motion.div>
    </div>
  );
}
