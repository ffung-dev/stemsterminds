import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import type { SocialPlatform } from "@/lib/types";

const ICONS: Record<SocialPlatform, typeof FaLink> = {
  email: FaEnvelope,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  twitter: FaXTwitter,
  facebook: FaFacebook,
  other: FaLink,
};

export function SocialIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  const Icon = ICONS[platform] ?? FaLink;
  return <Icon className={className} aria-hidden="true" />;
}
