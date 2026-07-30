"use server";

import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

type FieldName = "name" | "email" | "subject" | "message";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<FieldName, string>>;
}

const CONTACT_EMAIL = process.env.CONTACT_TO_EMAIL || "stemsterminds@gmail.com";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot field: real visitors never fill this hidden input, bots often do.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks for reaching out! We'll get back to you soon." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<FieldName, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as FieldName;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const { name, email, subject, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — skipping real email send (dev no-op).",
      { name, email, subject }
    );
    return {
      status: "success",
      message:
        "Message received! (Dev mode: no email was actually sent — set RESEND_API_KEY to enable delivery.)",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "STEMsterMinds Website <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Website Contact] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please try again or email us directly.",
      };
    }

    return { status: "success", message: "Thanks for reaching out! We'll get back to you soon." };
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or email us directly.",
    };
  }
}
