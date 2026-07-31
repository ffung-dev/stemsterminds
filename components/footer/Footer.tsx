import Link from "next/link";
import { Brain } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { FooterData, NavItem, SiteSettings } from "@/lib/types";

export function Footer({
  footer,
  siteSettings,
}: {
  footer: FooterData;
  siteSettings: SiteSettings;
}) {
  const links: NavItem[] = footer.quickLinks?.length ? footer.quickLinks : [];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-soft bg-surface-soft">
      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-button">
              <Brain className="h-4 w-4 text-button-ink" aria-hidden="true" />
            </span>
            <span className="font-header text-lg font-bold text-ink">{siteSettings.organizationName}</span>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">{siteSettings.footerText || siteSettings.missionStatement}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">Quick Links</h3>
          <ul className="space-y-2">
            {links.map((item) => (
              <li key={item._key}>
                <Link href={item.href} className="text-sm text-ink-soft transition-colors hover:text-coral">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">Connect</h3>
          <div className="flex flex-wrap gap-3">
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
          <p className="mt-4 text-sm text-ink-soft">
            <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-coral">
              {siteSettings.contactEmail}
            </a>
          </p>
        </div>
      </Container>

      <div className="border-t border-border-soft py-5">
        <Container>
          <p className="text-center text-xs text-ink-soft">
            © {year} {footer.copyrightText || `${siteSettings.organizationName}. All rights reserved.`}
          </p>
        </Container>
      </div>
    </footer>
  );
}
