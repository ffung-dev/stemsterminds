"use client";

import { useActionState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { submitContactForm, type ContactFormState } from "@/app/(site)/contact/actions";
import { ButtonAsButton } from "@/components/ui/Button";
import { cx } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real visitors, often filled in by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field label="Name" name="name" autoComplete="name" error={state.fieldErrors?.name} />
      <Field label="Email" name="email" type="email" autoComplete="email" error={state.fieldErrors?.email} />
      <Field label="Subject" name="subject" error={state.fieldErrors?.subject} />
      <TextAreaField label="Message" name="message" error={state.fieldErrors?.message} />

      <ButtonAsButton type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
        {pending ? "Sending..." : "Send Message"}
      </ButtonAsButton>

      <AnimatePresence mode="wait">
        {state.status === "success" && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="status"
            data-testid="contact-success"
            className="rounded-xl bg-teal-soft px-4 py-3 text-sm text-ink"
          >
            {state.message}
          </motion.p>
        )}
        {state.status === "error" && state.message && !state.fieldErrors && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="alert"
            data-testid="contact-error"
            className="rounded-xl bg-coral/15 px-4 py-3 text-sm text-coral"
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cx(
          "w-full rounded-xl border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-coral",
          error ? "border-coral" : "border-border-soft"
        )}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-coral" data-testid={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({ label, name, error }: { label: string; name: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={5}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cx(
          "w-full rounded-xl border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-coral",
          error ? "border-coral" : "border-border-soft"
        )}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-coral" data-testid={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
