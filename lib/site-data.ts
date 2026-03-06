import type {
  ContactLinks,
  ProjectShowcase,
  ServiceCard,
} from "@/lib/types";

function getOptionalPublicUrl(envName: string) {
  const value = process.env[envName]?.trim();
  return value ? value : undefined;
}

export const contactLinks: ContactLinks = {
  email: "thomas.cere@outlook.fr",
  bookingUrl: getOptionalPublicUrl("NEXT_PUBLIC_BOOKING_URL"),
  github: "https://github.com/itsalphazell",
  linkedin: getOptionalPublicUrl("NEXT_PUBLIC_LINKEDIN_URL"),
};

export const services: ServiceCard[] = [
  {
    title: "Landing / rebrand refresh",
    deliverable: "High-clarity pages that improve first impression, message hierarchy, and call-to-action rhythm.",
    fit: "For service businesses, launches, and founders who need a sharper front-end surface without a long build cycle.",
    ctaLabel: "Refresh the surface",
  },
  {
    title: "Premium marketing UI",
    deliverable: "Editorial sections, motion-led storytelling, and polished responsive components for high-end public pages.",
    fit: "For brands that need a stronger identity, richer composition, and visuals that still convert cleanly.",
    ctaLabel: "Design a premium launch",
  },
  {
    title: "Product UI / dashboard",
    deliverable: "Structured app screens, analytics views, onboarding flows, and restrained premium systems for product teams.",
    fit: "For startups that need product-grade front-end direction without sacrificing clarity or speed.",
    ctaLabel: "Shape the product UI",
  },
];

export const proofPoints = [
  { label: "Interface registers", value: "3 distinct modes" },
  { label: "Languages shipped", value: "4 on one client site" },
  { label: "Deployment posture", value: "GitHub + Cloudflare-ready" },
];

export const processSteps = [
  {
    title: "Frame the message",
    body: "I reduce the surface to its offer, trust signal, and action path before styling anything.",
  },
  {
    title: "Build a visual system",
    body: "Typography, spacing, motion, and contrast are treated as one system instead of separate decisions.",
  },
  {
    title: "Ship a credible front-end",
    body: "Responsive states, reduced motion, and build checks matter as much as the hero shot.",
  },
];

export const projectShowcases: Record<string, ProjectShowcase> = {
  "coconut-paradise-spa": {
    metrics: [
      { label: "Languages", value: "EN / TH / FR / RU" },
      { label: "Surface", value: "Marketing + admin" },
      { label: "Hosting", value: "Cloudflare Pages" },
    ],
    shots: [
      {
        src: "/work/coconut/cover.svg",
        alt: "Coconut Paradise Spa desktop homepage concept",
        caption: "Desktop hero balancing hospitality mood, CTA clarity, and multilingual trust.",
        viewport: "desktop",
      },
      {
        src: "/work/coconut/detail-1.svg",
        alt: "Coconut Paradise Spa services and proof modules",
        caption: "Services and proof blocks keep rhythm without crowding the story.",
        viewport: "detail",
      },
      {
        src: "/work/coconut/detail-2.svg",
        alt: "Coconut Paradise Spa promotion and admin preview",
        caption: "Promotions and admin hooks show the front-end is wired for real updates.",
        viewport: "detail",
      },
      {
        src: "/work/coconut/mobile.svg",
        alt: "Coconut Paradise Spa mobile interface preview",
        caption: "Mobile navigation and CTA remain readable under a softer visual treatment.",
        viewport: "mobile",
      },
    ],
  },
  animaidstudioai: {
    metrics: [
      { label: "Flow", value: "Upload to paid unlock" },
      { label: "Surface", value: "Product landing" },
      { label: "Runtime", value: "Next.js on Cloudflare" },
    ],
    shots: [
      {
        src: "/work/animaid/cover.svg",
        alt: "AnimAid desktop landing overview",
        caption: "A single flow that explains the offer, the preview loop, and the paid unlock in one pass.",
        viewport: "desktop",
      },
      {
        src: "/work/animaid/detail-1.svg",
        alt: "AnimAid upload and preview interface",
        caption: "Preview states guide the user toward generation without hiding the monetization logic.",
        viewport: "detail",
      },
      {
        src: "/work/animaid/detail-2.svg",
        alt: "AnimAid monetization and checkout preview",
        caption: "Checkout framing is product-like, not ad-like, so the upgrade feels integrated.",
        viewport: "detail",
      },
      {
        src: "/work/animaid/mobile.svg",
        alt: "AnimAid mobile conversion flow",
        caption: "The mobile version keeps the flow tight for one-thumb use and fast scanning.",
        viewport: "mobile",
      },
    ],
  },
  "signal-desk": {
    metrics: [
      { label: "Type", value: "Concept app" },
      { label: "Focus", value: "B2B operations" },
      { label: "Views", value: "Overview to settings" },
    ],
    shots: [
      {
        src: "/work/signal-desk/cover.svg",
        alt: "Signal Desk overview dashboard concept",
        caption: "A premium but disciplined overview where density and hierarchy coexist.",
        viewport: "desktop",
      },
      {
        src: "/work/signal-desk/detail-1.svg",
        alt: "Signal Desk projects board and table concept",
        caption: "Operational tables, progress panels, and filters stay legible under a richer visual system.",
        viewport: "detail",
      },
      {
        src: "/work/signal-desk/detail-2.svg",
        alt: "Signal Desk analytics screen concept",
        caption: "Analytics views emphasize trend reading instead of decorative chart noise.",
        viewport: "detail",
      },
      {
        src: "/work/signal-desk/mobile.svg",
        alt: "Signal Desk mobile summary view concept",
        caption: "The mobile summary compresses priorities into one clean glanceable stack.",
        viewport: "mobile",
      },
    ],
  },
};
