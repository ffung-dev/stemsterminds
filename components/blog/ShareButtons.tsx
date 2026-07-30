"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently ignore.
    }
  }

  const linkClasses =
    "flex h-9 w-9 items-center justify-center rounded-full bg-decoration text-ink transition-colors hover:text-coral";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-ink-soft">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={linkClasses}
      >
        <FaXTwitter className="h-4 w-4" aria-hidden="true" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className={linkClasses}
      >
        <FaFacebook className="h-4 w-4" aria-hidden="true" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={linkClasses}
      >
        <FaLinkedin className="h-4 w-4" aria-hidden="true" />
      </a>
      <button type="button" onClick={handleCopy} aria-label="Copy link" data-testid="copy-link-button" className={linkClasses}>
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
