import type { Metadata } from "next";

// Set SITE_URL at build time if the public origin differs.
export const SITE_URL = new URL(process.env.SITE_URL || "https://izwelakheconsulting.co.za").origin;
export const SITE_DESCRIPTION = "Izwelakhe is a South African company providing business consulting, construction and maintenance, and property development services.";
export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).toString();

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website", locale: "en_ZA", siteName: "Izwelakhe",
      title, description, url: absoluteUrl(path),
      images: [{ url: absoluteUrl("/izwelakhe-hero-development-v2.png"), alt: "Izwelakhe" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/izwelakhe-hero-development-v2.png")] },
  };
}
