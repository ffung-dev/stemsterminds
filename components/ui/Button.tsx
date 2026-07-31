"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "@/lib/utils";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  // Bordered with the fixed button-ink (not theme-switching --ink) so the
  // edge stays a consistent dark outline even where a background gradient
  // happens to match --button almost exactly.
  primary: "bg-button text-button-ink border-2 border-button-ink hover:bg-button-hover shadow-md hover:shadow-lg",
  // Solid-ish backdrop + full-strength border so this reads clearly against
  // busy gradients, not just flat surfaces.
  secondary: "bg-surface/90 text-ink border-2 border-ink hover:border-coral hover:text-coral shadow-sm hover:shadow-md",
  ghost: "bg-transparent text-ink hover:bg-decoration/60",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-50 disabled:pointer-events-none";

const tapAnimation = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 400, damping: 20 },
};

interface LinkButtonProps {
  href: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({ href, external, variant = "primary", size = "md", className, children }: LinkButtonProps) {
  const classes = cx(baseClasses, variantClasses[variant], sizeClasses[size], className);
  const isMailto = href.startsWith("mailto:");
  const isExternal = external || href.startsWith("http");

  if (isExternal || isMailto) {
    return (
      <motion.a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={classes}
        {...tapAnimation}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} className={classes} {...tapAnimation}>
      {children}
    </MotionLink>
  );
}

type SafeButtonAttributes = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
>;

interface ButtonAsButtonProps extends SafeButtonAttributes {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonAsButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...buttonProps
}: ButtonAsButtonProps) {
  const classes = cx(baseClasses, variantClasses[variant], sizeClasses[size], className);

  return (
    <motion.button className={classes} {...tapAnimation} {...buttonProps}>
      {children}
    </motion.button>
  );
}
