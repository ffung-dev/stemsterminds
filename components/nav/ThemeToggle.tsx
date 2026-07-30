"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes' documented fix for SSR/client theme mismatch: the real
  // theme is only known after mount, so briefly render a neutral placeholder.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="block h-9 w-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="theme-toggle"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-decoration/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center"
      >
        {isDark ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
      </motion.span>
    </button>
  );
}
