# Izwelakhe — Landing Page

A production-ready Next.js landing page for Izwelakhe, built with a **black, grey, and gold** luxury-editorial aesthetic.

## Tech Stack
- **Next.js 14** (App Router)
- **React** (hooks, no external UI libs)
- **Google Fonts** — Playfair Display + DM Sans
- Inline styles + `globals.css` for animations & responsive overrides

## File Structure

```
app/
  layout.jsx        ← Root layout (fonts, meta)
  page.jsx          ← Full landing page component
  globals.css       ← Keyframes, hover states, responsive breakpoints
```

## Quick Start

```bash
# 1. Create a new Next.js project
npx create-next-app@latest izwelakhe --app --no-tailwind --no-eslint

# 2. Replace the generated app/ folder contents with these three files:
#    layout.jsx → app/layout.jsx
#    page.jsx   → app/page.jsx
#    globals.css → app/globals.css

# 3. Run the dev server
cd izwelakhe
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form email delivery

The `/contact` form sends enquiries to `sifiso@izwelakheconsulting.co.za` through the configured SMTP server.

1. Copy `.env.example` to `.env.local`.
2. Add the SMTP host, port, credentials, and sender address supplied by your email host.
3. Use port `465` with `SMTP_SECURE=true`, or port `587` with `SMTP_SECURE=false` and `SMTP_REQUIRE_TLS=true`.

SMTP credentials are read only by the server-side `/api/contact` route and must never be exposed as public environment variables.

## CI/CD and VPS deployment

The GitHub Actions workflow in `.github/workflows/clean-main.yml` runs linting and a production build for pull requests targeting `clean-main` and for pushes to that branch. After validation succeeds on a push to `clean-main`, it connects to the private VPS over SSH and rebuilds the Docker Compose service. Manual workflow runs validate the project without deploying it.

Configure these secrets in the GitHub `production` environment or repository settings:

- `SSH_HOST`: VPS hostname or IP address
- `SSH_USER`: VPS deployment user
- `SSH_PRIVATE_KEY`: private key used by GitHub Actions
- `APP_DIR`: absolute path to the repository on the VPS

Create a `.env` file inside `APP_DIR` on the VPS with:

```dotenv
APP_PORT=3001
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_USER=website@izwelakheconsulting.co.za
SMTP_PASSWORD=replace_with_your_smtp_password
SMTP_FROM=Izwelakhe Website <website@izwelakheconsulting.co.za>
```

The Compose service binds to `127.0.0.1:${APP_PORT}` so it can sit behind the VPS reverse proxy without exposing the Next.js server directly. Change `APP_PORT` if port `3001` is already occupied.

## Sections
| Section | Description |
|---|---|
| **Hero** | Full-viewport headline with stat card and CTAs |
| **Marquee** | Animated gold ticker with service keywords |
| **About** | Two-column company overview |
| **Services** | Interactive tabbed service explorer |
| **Why Choose Us** | Four-card value proposition grid |
| **CTA Band** | Full-width conversion prompt |
| **Contact** | Form with live success state |
| **Footer** | Minimal branded footer |

## Customisation
- Swap placeholder email/phone in the Contact section
- Replace `#C9A84C` (GOLD constant) to adjust the accent colour
- Add real company images by inserting `<img>` or Next.js `<Image>` into the hero right panel
