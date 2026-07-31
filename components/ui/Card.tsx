"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cx } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
}

export function Card({ children, className, hoverLift = true }: CardProps) {
  return (
    <motion.div
      className={cx(
        "rounded-2xl border border-border-soft bg-surface p-6 shadow-sm",
        className
      )}
      whileHover={
        hoverLift
          ? { y: -6, boxShadow: "0 22px 45px -22px rgba(63,57,57,0.3)" }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
