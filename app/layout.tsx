import "./globals.css";
import "./responsive.css";

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Izwelakhe | Business Consulting, Construction & Property Development",
  description: "South African business consulting, construction and maintenance, and property development services from Izwelakhe.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}<WhatsAppButton /></body>
    </html>
  );
}
