## Thomas Portfolio Hub

Premium front-end portfolio hub for showcasing freelance work across marketing surfaces, conversion-led product pages, and product UI concepts.

## Positioning

- `Thomas` portfolio with a studio-grade visual system
- English-first public hub for client-facing case studies
- Built to aggregate separate project repos rather than hide work behind branches

## Included case studies

- `Coconut Paradise Spa` - multilingual hospitality marketing surface with promotions/admin workflow
- `AnimAid` - conversion-focused product landing with upload, preview, and paid unlock flow
- `Signal Desk` - concept B2B dashboard showing overview, analytics, onboarding, and settings UI

## Commands

```bash
npm run dev
npm run build
npm run cf:deploy
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
- The project is prepared for static deployment to Cloudflare Pages via the generated `out/` directory
