"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cx } from "@/lib/utils";

/**
 * Card with a full-bleed media slot on top. The hover shadow lives on the
 * outer element (not overflow-hidden) so it isn't clipped; only the media
 * wrapper clips to get flush rounded top corners.
 */
export function MediaCard({
  media,
  children,
  className,
}: {
  media: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 22px 45px -22px rgba(63,57,57,0.3)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cx("flex flex-col rounded-2xl border border-border-soft bg-surface shadow-sm", className)}
    >
      <div className="overflow-hidden rounded-t-2xl">{media}</div>
      <div className="flex flex-1 flex-col p-6">{children}</div>
    </motion.div>
  );
}
