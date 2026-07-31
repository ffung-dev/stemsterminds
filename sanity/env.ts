export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-project";

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

/**
 * True once real Sanity credentials are provided via env vars. Until then,
 * lib/sanity/fetch.ts serves fixtures from lib/mock-data.ts so the whole
 * site can be built and tested without a live project.
 */
export const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
