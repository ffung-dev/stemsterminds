"use client";

import { motion } from "motion/react";

import { Container } from "@/components/ui/Container";
import type { ApplicationLink } from "@/lib/types";

import { ApplicationButtons } from "./ApplicationButtons";

export function Hero({
  title,
  subtitle,
  applicationLinks,
}: {
  title: string;
  subtitle: string;
  applicationLinks: ApplicationLink[];
}) {
  return (
    <section className="brand-gradient relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-coral/20 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl font-bold text-ink sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft sm:text-xl"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <ApplicationButtons links={applicationLinks} />
        </motion.div>
      </Container>
    </section>
  );
}
