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
