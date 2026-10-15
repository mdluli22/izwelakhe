# Izwelakhe — Landing Page

A production-ready Next.js landing page for Izwelakhe, built with a **black, grey, and gold** luxury-editorial aesthetic.

## Tech Stack
- **Next.js 16** (App Router)
- **React** (hooks, no external UI libs)
- **Google Fonts** — Playfair Display + DM Sans
- Inline styles + `globals.css` for animations & responsive overrides

## Search and AI discoverability

Canonical URLs, social metadata, JSON-LD business and service data, `/robots.txt`, `/sitemap.xml`, and `/llms.txt` share the origin in `lib/seo.ts`. It defaults to `https://izwelakheconsulting.co.za`; set `SITE_URL` before building if production uses another origin. Rebuild after changing it. Docker Compose passes `SITE_URL` from the deployment environment as a build argument.

The sitemap includes the homepage, contact page and all service pages. FAQ structured data uses the same content shown on service pages. `llms.txt` is a supplementary guide, not a guarantee of indexing or AI citations.

`/agents.md` provides a public business summary for assistants, and `/llms-full.txt` includes service details, intended outcomes, process and FAQs from the same constants used on the website. Both are linked from `/llms.txt`. The public `/agents.md` is business content, not repository development instructions. These supplementary files are not universally supported standards and do not guarantee recommendations or trust. `/robots.txt` explicitly permits search, user-request and training agents for OpenAI, Anthropic, Perplexity and Google while retaining the `/api/` exclusion. Robots rules are crawler guidance, not access control; hosting and firewall policies also affect access.

After deployment, verify these endpoints and canonicals on the public domain, submit the sitemap in Google Search Console and Bing Webmaster Tools, and ensure hosting or firewall bot protection permits search crawlers. Indexing and citations depend on external services.

## Contact form configuration

Copy `.env.example` to a private `.env` and provide your SMTP credentials. Never commit real credentials. The API validates and limits JSON bodies before sending mail. Rate limiting is bounded and held in memory per server process; multi-instance deployments need a shared limiter at the proxy or application layer. Contact delivery should be checked with a controlled enquiry after SMTP is configured.
