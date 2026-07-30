"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import type { NavItem } from "@/lib/types";
import { cx } from "@/lib/utils";

import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar({ items, organizationName }: { items: NavItem[]; organizationName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on navigation. Adjusting state during render
  // (rather than in an effect) avoids an extra post-navigation render.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-cream/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo organizationName={organizationName} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {items.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item._key}
                href={item.href}
                className={cx(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive ? "text-coral" : "text-ink hover:text-coral"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-coral"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            data-testid="mobile-menu-button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border-soft bg-cream md:hidden"
            data-testid="mobile-menu"
          >
            <Container className="flex flex-col gap-1 py-4">
              {items.map((item, index) => (
                <motion.div
                  key={item._key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={cx(
                      "block rounded-xl px-4 py-3 text-base font-semibold",
                      pathname === item.href ? "bg-decoration text-ink" : "text-ink hover:bg-decoration/60"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
