## Thomas Portfolio Hub

Design-led portfolio hub for showcasing freelance work across launches, conversion-led product pages, analytics apps, and interactive product prototypes.

## Positioning

- `Thomas` portfolio with a studio-grade visual system
- English-first public hub for client-facing case studies
- Built to aggregate separate project repos rather than hide work behind branches
- Positioned around UI, UX, and product engineering with explicit end-to-end delivery language

## Public Links

- Live portfolio: `https://portfolio-hub-ehh.pages.dev`
- Repository: `https://github.com/itsalphazell/portfolio-hub`

## Included case studies

- `Coconut Paradise Spa` - multilingual hospitality marketing surface with promotions/admin workflow
- `AnimAid` - conversion-focused product landing with upload, preview, and paid unlock flow
- `DashboardMeta` - shipped analytics product for Meta Ads, profit reading, auth, billing, and Cloudflare-backed app delivery
- `Signal Desk` - interactive B2B prototype showing overview, analytics, projects, onboarding, and settings UI

## Commands

```bash
npm run dev
npm run build
```

## Routes

- `/`
- `/work`
- `/work/[slug]`
- `/contact`

## Notes

- Case study content lives in `content/work/*.mdx`
- Contact links intentionally hide missing social or booking data instead of rendering placeholders
- Set `NEXT_PUBLIC_BOOKING_URL` and `NEXT_PUBLIC_LINKEDIN_URL` before building if you want those CTAs visible
- The home page now uses `Motion` plus a mode-driven command stage, signal-band navigation, and a short techno display layer for home-only visual emphasis
- Cloudflare Pages is connected to the GitHub repo, so pushes to `main` trigger production deploys automatically
