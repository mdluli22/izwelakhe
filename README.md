# Izwelakhe — Landing Page

A production-ready Next.js landing page for Izwelakhe, built with a **black, grey, and gold** luxury-editorial aesthetic.

## Tech Stack
- **Next.js 14** (App Router)
- **React** (hooks, no external UI libs)
- **Google Fonts** — Playfair Display + DM Sans
- Inline styles + `globals.css` for animations & responsive overrides

## Search and AI discoverability

Canonical URLs, social metadata, JSON-LD business and service data, `/robots.txt`, `/sitemap.xml`, and `/llms.txt` share the origin in `lib/seo.ts`. It defaults to `https://izwelakheconsulting.co.za`; set `SITE_URL` before building if production uses another origin. Rebuild after changing it, including for Docker builds.

The sitemap includes the homepage, contact page and all service pages. FAQ structured data uses the same content shown on service pages. `llms.txt` is a supplementary guide, not a guarantee of indexing or AI citations.

After deployment, verify these endpoints and canonicals on the public domain, submit the sitemap in Google Search Console and Bing Webmaster Tools, and ensure hosting or firewall bot protection permits search crawlers. Indexing and citations depend on external services.
