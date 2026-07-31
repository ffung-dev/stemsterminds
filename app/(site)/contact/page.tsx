import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { getContactPage, getSiteSettings, getVolunteerPage } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactPage();
  return buildMetadata(contact.seo, {
    title: "Contact",
    description: "Get in touch with STEMsterMinds.",
  });
}

export default async function ContactPage() {
  const [contact, siteSettings, volunteer] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getVolunteerPage(),
  ]);

  const faqPreview = volunteer.faqs.slice(0, 3);

  return (
    <>
      <PageHero title={contact.heroTitle} description={contact.introText} />

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <ContactForm />
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card>
              <h2 className="font-header text-lg font-bold text-ink">Get in Touch</h2>
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="mt-3 flex items-center gap-2 text-sm text-ink-soft hover:text-coral"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteSettings.contactEmail}
              </a>
              {siteSettings.mailingAddress && (
                <p className="mt-2 text-sm text-ink-soft">{siteSettings.mailingAddress}</p>
              )}
              {siteSettings.officeHours && (
                <p className="mt-2 text-sm text-ink-soft">{siteSettings.officeHours}</p>
              )}
            </Card>

            <Card>
              <h2 className="font-header text-lg font-bold text-ink">Follow Along</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {siteSettings.socialLinks.map((link) => (
                  <a
                    key={link.platform + link.url}
                    href={link.url}
                    target={link.platform === "email" ? undefined : "_blank"}
                    rel={link.platform === "email" ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-decoration text-ink transition-transform hover:scale-110 hover:text-coral"
                  >
                    <SocialIcon platform={link.platform} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {faqPreview.length > 0 && (
        <section className="bg-surface-soft py-16 sm:py-20">
          <Container className="mx-auto max-w-3xl">
            <h2 className="font-header text-2xl font-bold text-ink">Frequently Asked Questions</h2>
            <div className="mt-6">
              <Accordion
                items={faqPreview.map((faq) => ({ key: faq._key, question: faq.question, answer: faq.answer }))}
              />
            </div>
            <p className="mt-6 text-center text-sm text-ink-soft">
              Have more questions about volunteering?{" "}
              <Link href="/volunteer" className="font-semibold text-coral hover:underline">
                Visit the Volunteer page
              </Link>
              .
            </p>
          </Container>
        </section>
      )}
    </>
  );
}
