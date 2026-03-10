import type { HomeMode, Locale, ProjectShowcase, ServiceCard } from "@/lib/types";

export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

export const siteShellCopy = {
  en: {
    nav: { home: "Home", work: "Work", contact: "Contact" },
    cta: "Start a project",
    strapline: "UI, UX & product engineering",
    footerLine: "Design-led products, launches, and digital systems.",
    languageLabel: "Language",
  },
  fr: {
    nav: { home: "Accueil", work: "Projets", contact: "Contact" },
    cta: "Demarrer un projet",
    strapline: "UI, UX & ingenierie produit",
    footerLine: "Produits, lancements et systemes digitaux design-led.",
    languageLabel: "Langue",
  },
} as const;

export const homeCopy = {
  en: {
    badge: "UI designer, product engineer, full-stack aware",
    kicker: "Thomas / Editorial x product portfolio",
    heroTitle: "Websites and product surfaces",
    heroBody:
      "I design and build launches, product UI, and digital systems that need sharper message hierarchy, stronger interaction logic, and a cleaner production path.",
    heroPrimaryCta: "Browse case studies",
    heroSecondaryCta: "Discuss a project",
    capabilities: [
      { label: "Launches", body: "Rebrands and public pages that sell faster and feel more considered." },
      { label: "Products", body: "Dashboards, onboarding, and analytics with real interface depth." },
      { label: "Delivery", body: "End-to-end implementation awareness when the UI needs to hold up in production." },
    ],
    featuredKicker: "Featured work",
    featuredTitle: "Four registers. One delivery standard.",
    featuredBody:
      "Hospitality branding, conversion-led AI, a shipped analytics app, and an interactive B2B prototype. The grid stays tight, but each case reads with its own role and value.",
    featuredArchiveLink: "See the full archive",
    servicesKicker: "Services",
    servicesTitle: "Three offers shaped for the right level of clarity, polish, and depth.",
    servicesBody:
      "The public launch, the campaign page, and the product surface do not need the same treatment. The offer is split so the structure, motion, and product discipline match the job.",
    processKicker: "Process",
    proofKicker: "Proof",
    toolingTitle: "Tooling in the stack",
    toolingBody:
      "Next.js 15, React 19, Tailwind 4, Cloudflare-ready delivery, and Playwright smoke checks for release confidence.",
    optimiseTitle: "What I optimise for",
    optimiseBody:
      "Strong first impression, tight CTA hierarchy, believable product depth, and motion that never blocks readability.",
    currentSignalLabel: "Current signal",
    commandStageLabel: "Command stage",
    currentRegisterLabel: "Current register",
    linkedCaseLabel: "Linked case",
    finalKicker: "Next step",
    finalTitle: "If the project needs stronger direction and sharper execution, I can help shape it.",
    finalBody:
      "I take on premium landing rebuilds, product UI direction, and digital work that needs to move from interface strategy to implementation without losing clarity.",
    finalPrimaryCta: "Email Thomas",
    finalSecondaryCta: "Contact page",
  },
  fr: {
    badge: "UI, UX, produit et delivery full-stack",
    kicker: "Thomas / Portfolio editorial x produit",
    heroTitle: "Sites web et surfaces produit",
    heroBody:
      "Je concois et je developpe des lancements, des interfaces produit et des systemes digitaux qui demandent une hierarchie de message plus nette, une logique d'interaction plus solide et un chemin vers la prod plus propre.",
    heroPrimaryCta: "Voir les case studies",
    heroSecondaryCta: "Parler d'un projet",
    capabilities: [
      { label: "Lancements", body: "Rebrands et pages publiques qui vendent mieux et paraissent plus maitrisees." },
      { label: "Produits", body: "Dashboards, onboarding et analytics avec une vraie profondeur d'interface." },
      { label: "Execution", body: "Une vision end-to-end quand l'UI doit tenir jusqu'a la production." },
    ],
    featuredKicker: "Projets mis en avant",
    featuredTitle: "Quatre registres. Un meme niveau d'execution.",
    featuredBody:
      "Branding hospitality, IA orientee conversion, app analytics deja livree et prototype B2B interactif. La grille reste lisible, mais chaque case affirme clairement son role et sa valeur.",
    featuredArchiveLink: "Voir toute l'archive",
    servicesKicker: "Services",
    servicesTitle: "Trois offres calibrees selon le bon niveau de clarte, de polish et de profondeur.",
    servicesBody:
      "Un lancement public, une campaign page et une surface produit ne demandent pas le meme traitement. L'offre est separee pour que structure, motion et discipline produit collent au besoin reel.",
    processKicker: "Process",
    proofKicker: "Preuves",
    toolingTitle: "Stack et delivery",
    toolingBody:
      "Next.js 15, React 19, Tailwind 4, livraison prete pour Cloudflare et smoke checks Playwright pour garder de la confiance au release.",
    optimiseTitle: "Ce que j'optimise",
    optimiseBody:
      "Une premiere impression forte, une hierarchie CTA claire, une profondeur produit credible et une motion qui ne gene jamais la lecture.",
    currentSignalLabel: "Signal actuel",
    commandStageLabel: "Scene active",
    currentRegisterLabel: "Registre actif",
    linkedCaseLabel: "Case liee",
    finalKicker: "Etape suivante",
    finalTitle: "Si le projet a besoin de plus de direction et d'une meilleure execution, je peux l'aider a monter d'un cran.",
    finalBody:
      "Je prends des refontes premium de landing pages, de la direction UI produit et des projets digitaux qui doivent aller de la strategie d'interface a l'implementation sans perdre en clarte.",
    finalPrimaryCta: "Envoyer un email",
    finalSecondaryCta: "Page contact",
  },
} as const;

export const servicesByLocale: Record<Locale, ServiceCard[]> = {
  en: [
    {
      title: "Landing / rebrand refresh",
      deliverable: "Sharper public pages for service brands, launches, and repositioning work that currently undersell the offer.",
      fit: "Best when the business is credible but the site feels dated, generic, or too soft on trust and CTA hierarchy.",
      ctaLabel: "Reset the public signal",
    },
    {
      title: "Premium marketing UI",
      deliverable: "Editorial campaign surfaces with stronger motion, composition, and message control than a standard landing build.",
      fit: "For brands that need more identity, more precision, and a page system that can stretch across launches and campaigns.",
      ctaLabel: "Elevate the launch",
    },
    {
      title: "Product UI / dashboard",
      deliverable: "Operational dashboards, onboarding, analytics, and internal tools that read like real software instead of dressed-up concepts.",
      fit: "For product teams that need interface direction plus implementation support, with full-stack awareness where the product path demands it.",
      ctaLabel: "Design the product layer",
    },
  ],
  fr: [
    {
      title: "Landing / refresh de rebrand",
      deliverable: "Des pages publiques plus nettes pour des marques de service, des lancements et des repositionnements qui sous-vendent aujourd'hui leur vraie valeur.",
      fit: "Ideal quand le business est credible mais que le site parait date, trop generique ou trop faible sur la confiance et la hierarchie CTA.",
      ctaLabel: "Recaler le signal public",
    },
    {
      title: "Premium marketing UI",
      deliverable: "Des surfaces editoriales de campagne avec plus de motion, de composition et de maitrise du message qu'une landing standard.",
      fit: "Pour les marques qui ont besoin de plus d'identite, plus de precision et d'un systeme de pages capable de s'etendre a plusieurs lancements.",
      ctaLabel: "Elever le lancement",
    },
    {
      title: "Product UI / dashboard",
      deliverable: "Des dashboards, onboarding, analytics et outils internes qui lisent comme du vrai software, pas comme des concepts maquilles.",
      fit: "Pour les equipes produit qui ont besoin de direction d'interface et de support d'implementation, avec une conscience full-stack quand le produit l'exige.",
      ctaLabel: "Designer la couche produit",
    },
  ],
};

export const proofPointsByLocale = {
  en: [
    { label: "Interface registers", value: "4 distinct modes" },
    { label: "Delivery range", value: "Premium launches to shipped product surfaces" },
    { label: "Deployment posture", value: "GitHub + Cloudflare-ready" },
  ],
  fr: [
    { label: "Registres d'interface", value: "4 modes distincts" },
    { label: "Amplitude de delivery", value: "Lancements premium jusqu'a surfaces produit livrees" },
    { label: "Posture de deploiement", value: "GitHub + Cloudflare-ready" },
  ],
} as const;

export const processStepsByLocale = {
  en: [
    {
      title: "Frame the business case",
      body: "Offer, audience, trust, and action get clarified first so the interface can be expressive without drifting.",
    },
    {
      title: "Design the interaction system",
      body: "Typography, layout, motion, and state design are treated as one system, not separate layers added late.",
    },
    {
      title: "Ship a credible product experience",
      body: "Responsive states, reduced motion, and production constraints matter as much as the first impression.",
    },
  ],
  fr: [
    {
      title: "Poser le business case",
      body: "Offre, audience, confiance et action sont clarifiees d'abord pour que l'interface puisse etre expressive sans deriver.",
    },
    {
      title: "Designer le systeme d'interaction",
      body: "Typographie, layout, motion et etats sont traites comme un seul systeme, pas comme des couches ajoutees trop tard.",
    },
    {
      title: "Livrer une experience credible",
      body: "Etats responsive, reduced motion et contraintes de production comptent autant que la premiere impression.",
    },
  ],
} as const;

export const homeModesByLocale: Record<Locale, HomeMode[]> = {
  en: [
    {
      slug: "coconut-paradise-spa",
      label: "Hospitality brand",
      eyebrow: "Atmosphere-led public launch",
      heroLine: "with atmosphere and trust that still convert.",
      valueLine: "Hospitality mood / multilingual trust / premium booking signal",
      stageTitle: "A service brand surface should feel calm, premium, and immediately trustworthy.",
      stageSummary:
        "This register is about editorial pacing, hospitality tone, and public-facing clarity without flattening the atmosphere.",
      pulse: "Brand atmosphere stays intentional while service detail and trust still scan fast.",
      accent: "#f2b36a",
      accentSoft: "rgba(242, 179, 106, 0.18)",
      metrics: [
        { label: "Languages", value: "4 live" },
        { label: "Surface", value: "Marketing + admin" },
        { label: "Trust cue", value: "Local credibility" },
      ],
      cues: ["Editorial hero pacing", "Soft luxury without vagueness", "CTA and proof stay visible"],
      modules: [
        { label: "Atmosphere", value: "Story-led" },
        { label: "Trust", value: "Local proof" },
        { label: "Action", value: "Book clearly" },
      ],
    },
    {
      slug: "animaidstudioai",
      label: "Conversion-led AI",
      eyebrow: "Upload to unlock flow",
      heroLine: "that explain value fast and convert cleanly.",
      valueLine: "Single-path offer / preview loop / paid unlock",
      stageTitle: "A product landing should remove ambiguity before it asks for money.",
      stageSummary:
        "This register focuses on one dominant flow: explain the loop, show the preview, then make the upgrade feel integrated.",
      pulse: "The surface keeps one clear path from upload to paid unlock, with product logic ahead of noise.",
      accent: "#6d8fff",
      accentSoft: "rgba(109, 143, 255, 0.2)",
      metrics: [
        { label: "Flow", value: "Upload to unlock" },
        { label: "Runtime", value: "Next.js + Cloudflare" },
        { label: "Conversion", value: "Single CTA path" },
      ],
      cues: ["Offer explained in one pass", "Preview states reduce friction", "Monetization feels native"],
      modules: [
        { label: "Input", value: "Upload" },
        { label: "Preview", value: "Generate" },
        { label: "Upgrade", value: "Unlock" },
      ],
    },
    {
      slug: "dashboard-meta",
      label: "Analytics app",
      eyebrow: "Shipped operator product",
      heroLine: "that make dense data feel legible at speed.",
      valueLine: "Ads diagnostics / profit reading / live operator context",
      stageTitle: "A shipped analytics app needs denser reading, harder edges, and less presentation fluff.",
      stageSummary:
        "This register is about operational confidence: dense dashboards, real product states, and decision surfaces that earn their complexity.",
      pulse: "The product reads like a live operator tool, not a presentation board pretending to be software.",
      accent: "#2fd6bb",
      accentSoft: "rgba(47, 214, 187, 0.18)",
      metrics: [
        { label: "Type", value: "Shipped app" },
        { label: "Focus", value: "Ads + profit ops" },
        { label: "Runtime", value: "Functions live" },
      ],
      cues: ["Dense but scannable", "Diagnostics over decoration", "Billing and auth included"],
      modules: [
        { label: "Profit", value: "Readable" },
        { label: "Alerts", value: "Actionable" },
        { label: "Ops", value: "Continuous" },
      ],
    },
    {
      slug: "signal-desk",
      label: "Interactive prototype",
      eyebrow: "Product state and depth",
      heroLine: "that feel credible before the backend is live.",
      valueLine: "Mode switching / selectable states / explorable product rhythm",
      stageTitle: "A strong prototype should already feel like software before it becomes production software.",
      stageSummary:
        "This register proves product thinking through interactive states, explorable views, and a tighter sense of interface behavior.",
      pulse: "The prototype is intentionally honest, but it now feels explorable enough to sell product depth, not just polish.",
      accent: "#7be8ff",
      accentSoft: "rgba(123, 232, 255, 0.18)",
      metrics: [
        { label: "Type", value: "Interactive" },
        { label: "Views", value: "5 screens" },
        { label: "Focus", value: "B2B ops" },
      ],
      cues: ["Client-side state depth", "Overview to onboarding", "Credible product rhythm"],
      modules: [
        { label: "Overview", value: "Selectable" },
        { label: "Analytics", value: "Segmented" },
        { label: "Onboarding", value: "Guided" },
      ],
    },
  ],
  fr: [
    {
      slug: "coconut-paradise-spa",
      label: "Marque hospitality",
      eyebrow: "Lancement public atmosphere-led",
      heroLine: "avec atmosphere et confiance qui convertissent quand meme.",
      valueLine: "Ambiance hospitality / confiance multilingue / signal de reservation premium",
      stageTitle: "Une surface de marque de service doit paraitre calme, premium et immediatement fiable.",
      stageSummary:
        "Ce registre parle de rythme editorial, de tonalite hospitality et de clarte publique sans ecraser l'atmosphere.",
      pulse: "L'atmosphere de marque reste intentionnelle pendant que les details de service et la confiance se lisent vite.",
      accent: "#f2b36a",
      accentSoft: "rgba(242, 179, 106, 0.18)",
      metrics: [
        { label: "Langues", value: "4 live" },
        { label: "Surface", value: "Marketing + admin" },
        { label: "Confiance", value: "Credibilite locale" },
      ],
      cues: ["Rythme editorial du hero", "Luxe doux sans flou", "CTA et preuve restent visibles"],
      modules: [
        { label: "Atmosphere", value: "Story-led" },
        { label: "Confiance", value: "Preuve locale" },
        { label: "Action", value: "Reserver clairement" },
      ],
    },
    {
      slug: "animaidstudioai",
      label: "IA orientee conversion",
      eyebrow: "Upload vers unlock",
      heroLine: "qui expliquent vite la valeur et convertissent proprement.",
      valueLine: "Offre mono-parcours / boucle de preview / unlock payant",
      stageTitle: "Une landing produit doit enlever l'ambiguite avant de demander de payer.",
      stageSummary:
        "Ce registre se concentre sur un flux dominant : expliquer la boucle, montrer la preview, puis rendre l'upgrade integre.",
      pulse: "La surface garde un chemin clair de l'upload a l'unlock payant, avec une logique produit avant le bruit.",
      accent: "#6d8fff",
      accentSoft: "rgba(109, 143, 255, 0.2)",
      metrics: [
        { label: "Flow", value: "Upload vers unlock" },
        { label: "Runtime", value: "Next.js + Cloudflare" },
        { label: "Conversion", value: "Un seul chemin CTA" },
      ],
      cues: ["Offre expliquee en un pass", "Les previews reduisent la friction", "La monetisation parait native"],
      modules: [
        { label: "Input", value: "Upload" },
        { label: "Preview", value: "Generate" },
        { label: "Upgrade", value: "Unlock" },
      ],
    },
    {
      slug: "dashboard-meta",
      label: "App analytics",
      eyebrow: "Produit operateur livre",
      heroLine: "qui rendent des donnees denses lisibles a vitesse reelle.",
      valueLine: "Diagnostics Ads / lecture de profit / contexte operateur live",
      stageTitle: "Une app analytics livree demande plus de densite de lecture, des aretes plus franches et moins de fluff.",
      stageSummary:
        "Ce registre parle de confiance operationnelle : dashboards denses, etats produit reels et surfaces de decision qui meritent leur complexite.",
      pulse: "Le produit se lit comme un vrai outil operateur, pas comme une presentation deguisee en software.",
      accent: "#2fd6bb",
      accentSoft: "rgba(47, 214, 187, 0.18)",
      metrics: [
        { label: "Type", value: "App livree" },
        { label: "Focus", value: "Ads + profit ops" },
        { label: "Runtime", value: "Functions live" },
      ],
      cues: ["Dense mais lisible", "Diagnostics avant decoration", "Billing et auth inclus"],
      modules: [
        { label: "Profit", value: "Lisible" },
        { label: "Alertes", value: "Actionnables" },
        { label: "Ops", value: "Continu" },
      ],
    },
    {
      slug: "signal-desk",
      label: "Prototype interactif",
      eyebrow: "Etats produit et profondeur",
      heroLine: "qui paraissent credibles avant meme que le backend soit live.",
      valueLine: "Switch de modes / etats selectionnables / rythme produit explorable",
      stageTitle: "Un bon prototype doit deja ressembler a du software avant de devenir du software en production.",
      stageSummary:
        "Ce registre prouve la reflexion produit a travers des etats interactifs, des vues explorables et un sens plus net du comportement d'interface.",
      pulse: "Le prototype reste honnete, mais parait maintenant assez explorable pour vendre de la profondeur produit, pas juste du polish.",
      accent: "#7be8ff",
      accentSoft: "rgba(123, 232, 255, 0.18)",
      metrics: [
        { label: "Type", value: "Interactif" },
        { label: "Vues", value: "5 ecrans" },
        { label: "Focus", value: "Ops B2B" },
      ],
      cues: ["Profondeur d'etats client-side", "Overview jusqu'a onboarding", "Rythme produit credible"],
      modules: [
        { label: "Overview", value: "Selectionnable" },
        { label: "Analytics", value: "Segmente" },
        { label: "Onboarding", value: "Guide" },
      ],
    },
  ],
};

export const workPageCopy = {
  en: {
    kicker: "Work archive",
    title: "Case studies that show both taste and execution.",
    body:
      "The archive stays selective on purpose. Each project proves a different register: hospitality storytelling, conversion-led product landing, a shipped analytics app, and an interactive product prototype.",
  },
  fr: {
    kicker: "Archive des projets",
    title: "Des case studies qui montrent a la fois le gout et l'execution.",
    body:
      "L'archive reste volontairement selective. Chaque projet prouve un registre different : storytelling hospitality, landing produit orientee conversion, app analytics livree et prototype produit interactif.",
  },
} as const;

export const workArchiveLabels = {
  en: {
    all: "all",
    real: "real",
    concept: "concept",
    marketing: "marketing",
    product: "product",
    motion: "motion",
    empty: "No projects match this filter yet.",
  },
  fr: {
    all: "tous",
    real: "reels",
    concept: "concepts",
    marketing: "marketing",
    product: "produit",
    motion: "motion",
    empty: "Aucun projet ne correspond encore a ce filtre.",
  },
} as const;

export const projectCardLabels = {
  en: {
    caseStudy: "Case study",
    shippedCase: "Shipped case",
    conceptCase: "Concept case",
    live: "Live",
    delivery: "Delivery",
    prototype: "Prototype",
    view: "View",
    liveDemo: "Live demo",
    repository: "Repository",
  },
  fr: {
    caseStudy: "Etude de cas",
    shippedCase: "Projet livre",
    conceptCase: "Concept portfolio",
    live: "Live",
    delivery: "Livraison",
    prototype: "Prototype",
    view: "Voir",
    liveDemo: "Demo live",
    repository: "Depot",
  },
} as const;

export const projectTagLabels = {
  en: {
    marketing: "marketing",
    motion: "motion",
    product: "product",
    analytics: "analytics",
    concept: "concept",
    real: "real",
  },
  fr: {
    marketing: "marketing",
    motion: "motion",
    product: "produit",
    analytics: "analytics",
    concept: "concept",
    real: "reel",
  },
} as const;

export const contactPageCopy = {
  en: {
    kicker: "Contact",
    title: "If the next release needs a stronger website or product experience, start here.",
    body:
      "I take on selective freelance work across design-led websites, product surfaces, and digital systems. The fastest path is to send the current product, the business goal, and where the experience is underperforming.",
    primaryContact: "Primary contact",
    bookCall: "Book a call",
  },
  fr: {
    kicker: "Contact",
    title: "Si la prochaine version a besoin d'un meilleur site ou d'une meilleure experience produit, c'est ici que ca commence.",
    body:
      "Je prends des missions freelance selectives autour de sites design-led, de surfaces produit et de systemes digitaux. Le plus rapide est d'envoyer le produit actuel, l'objectif business et l'endroit ou l'experience sous-performe.",
    primaryContact: "Contact principal",
    bookCall: "Reserver un appel",
  },
} as const;

export const caseStudyCopy = {
  en: {
    topKicker: "Client-facing project story",
    openLiveDemo: "Open live demo",
    viewRepository: "View repository",
    discussSimilar: "Discuss a similar project",
    projectFrame: "Project frame",
    portfolioConcept: "Portfolio concept",
    clientDelivery: "Client delivery",
    outcomeFrame: "Outcome frame",
    outcomeBody: "Built to show how design direction holds up once the interface has to work.",
    industry: "Industry",
    status: "Status",
    stack: "Stack",
    readingLens: "Reading lens",
    readingTitle: "A sellable project story, not just a build log.",
    readingBody:
      "Each case study is structured to show the business problem, the interface system, and the implementation decisions behind the outcome.",
    structureTitle: "Case structure",
    structureBodyOne:
      "Challenge, role, system, interactions, implementation, and outcome stay consistent across every project.",
    structureBodyTwo:
      "That makes it easier to compare different project types without losing the business story behind the visuals.",
    nextMove: "Next move",
    nextTitle: "If you need the same standard on a real product, website, or redesign, let's talk.",
    nextBody:
      "I work on projects that need stronger interface direction, better interaction quality, and cleaner delivery from concept through implementation.",
    nextPrimaryCta: "Discuss a project",
    nextSecondaryCta: "Back to archive",
    leadSurface: "Lead surface",
    mobileView: "Mobile view",
    detailPrefix: "Detail",
    shippedCase: "Shipped case study",
    conceptCase: "Concept case study",
  },
  fr: {
    topKicker: "Recit projet oriente client",
    openLiveDemo: "Ouvrir la demo live",
    viewRepository: "Voir le depot",
    discussSimilar: "Parler d'un projet similaire",
    projectFrame: "Cadre du projet",
    portfolioConcept: "Concept portfolio",
    clientDelivery: "Livraison client",
    outcomeFrame: "Angle de resultat",
    outcomeBody: "Construit pour montrer comment une direction design tient une fois que l'interface doit vraiment fonctionner.",
    industry: "Secteur",
    status: "Statut",
    stack: "Stack",
    readingLens: "Angle de lecture",
    readingTitle: "Un recit de projet vendable, pas juste un journal de build.",
    readingBody:
      "Chaque case study est structuree pour montrer le probleme business, le systeme d'interface et les decisions d'implementation derriere le resultat.",
    structureTitle: "Structure du case study",
    structureBodyOne:
      "Challenge, role, systeme, interactions, implementation et outcome restent coherents sur chaque projet.",
    structureBodyTwo:
      "Ca permet de comparer des types de projets differents sans perdre l'histoire business derriere les visuels.",
    nextMove: "Suite logique",
    nextTitle: "Si tu veux le meme niveau sur un vrai produit, site ou redesign, parlons-en.",
    nextBody:
      "Je travaille sur des projets qui ont besoin d'une meilleure direction d'interface, d'une meilleure qualite d'interaction et d'un delivery plus propre du concept a l'implementation.",
    nextPrimaryCta: "Parler d'un projet",
    nextSecondaryCta: "Retour a l'archive",
    leadSurface: "Surface principale",
    mobileView: "Vue mobile",
    detailPrefix: "Detail",
    shippedCase: "Projet livre",
    conceptCase: "Concept portfolio",
  },
} as const;

export const projectShowcasesByLocale: Record<Locale, Record<string, ProjectShowcase>> = {
  en: {
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
          caption: "Promotions and admin hooks show the system can stay fresh without relying on manual code edits.",
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
    "dashboard-meta": {
      metrics: [
        { label: "Type", value: "Shipped app" },
        { label: "Focus", value: "Ads + profit ops" },
        { label: "Runtime", value: "Cloudflare functions" },
      ],
      shots: [
        {
          src: "/work/dashboard-meta/cover.svg",
          alt: "DashboardMeta overview and operations dashboard preview",
          caption: "A denser operational dashboard built for media-buying diagnostics, profit reading, and recurring decision-making in a live app context.",
          viewport: "desktop",
        },
        {
          src: "/work/dashboard-meta/detail-1.svg",
          alt: "DashboardMeta analytics and diagnostics detail",
          caption: "The product balances trend visibility, diagnostics, and deep-dive modules without drifting into presentation-only charts.",
          viewport: "detail",
        },
        {
          src: "/work/dashboard-meta/detail-2.svg",
          alt: "DashboardMeta alerts and operational modules detail",
          caption: "Auth, billing, alerts, and operational screens make the case feel product-complete rather than front-end-only.",
          viewport: "detail",
        },
        {
          src: "/work/dashboard-meta/mobile.svg",
          alt: "DashboardMeta mobile analytics summary preview",
          caption: "The mobile view compresses KPI, alerting, and chart signal into a tighter operator-first layout.",
          viewport: "mobile",
        },
      ],
    },
    "signal-desk": {
      metrics: [
        { label: "Type", value: "Interactive prototype" },
        { label: "Focus", value: "B2B operations" },
        { label: "Views", value: "5 explorable screens" },
      ],
      shots: [
        {
          src: "/work/signal-desk/cover.svg",
          alt: "Signal Desk overview dashboard concept",
          caption: "An interactive prototype overview where mode changes, focus states, and denser product rhythm all read like a real board.",
          viewport: "desktop",
        },
        {
          src: "/work/signal-desk/detail-1.svg",
          alt: "Signal Desk projects board and table concept",
          caption: "Selectable rows, detail states, and operational filters help the projects view feel explorable instead of staged.",
          viewport: "detail",
        },
        {
          src: "/work/signal-desk/detail-2.svg",
          alt: "Signal Desk analytics screen concept",
          caption: "Analytics now lean on segment switching, comparative reading, and stateful metric focus rather than decorative chart noise.",
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
  },
  fr: {
    "coconut-paradise-spa": {
      metrics: [
        { label: "Langues", value: "EN / TH / FR / RU" },
        { label: "Surface", value: "Marketing + admin" },
        { label: "Hebergement", value: "Cloudflare Pages" },
      ],
      shots: [
        {
          src: "/work/coconut/cover.svg",
          alt: "Concept de homepage desktop Coconut Paradise Spa",
          caption: "Un hero desktop qui equilibre ambiance hospitality, clarte CTA et confiance multilingue.",
          viewport: "desktop",
        },
        {
          src: "/work/coconut/detail-1.svg",
          alt: "Modules services et preuves Coconut Paradise Spa",
          caption: "Les blocs services et preuve gardent du rythme sans surcharger l'histoire.",
          viewport: "detail",
        },
        {
          src: "/work/coconut/detail-2.svg",
          alt: "Apercu promotions et admin Coconut Paradise Spa",
          caption: "Les hooks promotions et admin montrent que le systeme peut rester a jour sans dependre d'editions manuelles.",
          viewport: "detail",
        },
        {
          src: "/work/coconut/mobile.svg",
          alt: "Apercu mobile Coconut Paradise Spa",
          caption: "La navigation mobile et le CTA restent lisibles malgre un traitement visuel plus doux.",
          viewport: "mobile",
        },
      ],
    },
    animaidstudioai: {
      metrics: [
        { label: "Flow", value: "Upload vers unlock payant" },
        { label: "Surface", value: "Landing produit" },
        { label: "Runtime", value: "Next.js sur Cloudflare" },
      ],
      shots: [
        {
          src: "/work/animaid/cover.svg",
          alt: "Vue desktop de la landing AnimAid",
          caption: "Un flow unique qui explique l'offre, la boucle de preview et le paid unlock en un seul passage.",
          viewport: "desktop",
        },
        {
          src: "/work/animaid/detail-1.svg",
          alt: "Interface upload et preview AnimAid",
          caption: "Les etats de preview guident l'utilisateur vers la generation sans cacher la logique de monetisation.",
          viewport: "detail",
        },
        {
          src: "/work/animaid/detail-2.svg",
          alt: "Apercu monetisation et checkout AnimAid",
          caption: "Le framing du checkout reste produit, pas publicitaire, pour que l'upgrade paraisse integre.",
          viewport: "detail",
        },
        {
          src: "/work/animaid/mobile.svg",
          alt: "Flow mobile de conversion AnimAid",
          caption: "La version mobile garde le flow compact pour un usage one-thumb et un scan rapide.",
          viewport: "mobile",
        },
      ],
    },
    "dashboard-meta": {
      metrics: [
        { label: "Type", value: "App livree" },
        { label: "Focus", value: "Ads + profit ops" },
        { label: "Runtime", value: "Cloudflare functions" },
      ],
      shots: [
        {
          src: "/work/dashboard-meta/cover.svg",
          alt: "Apercu overview et operations DashboardMeta",
          caption: "Un dashboard operationnel plus dense pense pour les diagnostics media-buying, la lecture de profit et la prise de decision recurrente dans un contexte reellement live.",
          viewport: "desktop",
        },
        {
          src: "/work/dashboard-meta/detail-1.svg",
          alt: "Detail analytics et diagnostics DashboardMeta",
          caption: "Le produit equilibre visibilite des tendances, diagnostics et modules de deep-dive sans tomber dans des charts de presentation.",
          viewport: "detail",
        },
        {
          src: "/work/dashboard-meta/detail-2.svg",
          alt: "Detail alertes et modules operationnels DashboardMeta",
          caption: "Auth, billing, alertes et ecrans operationnels rendent le cas produit-complet plutot que front-end-only.",
          viewport: "detail",
        },
        {
          src: "/work/dashboard-meta/mobile.svg",
          alt: "Apercu mobile analytics DashboardMeta",
          caption: "La vue mobile compresse KPI, alerting et signal chart dans une lecture plus serree orientee operateur.",
          viewport: "mobile",
        },
      ],
    },
    "signal-desk": {
      metrics: [
        { label: "Type", value: "Prototype interactif" },
        { label: "Focus", value: "Operations B2B" },
        { label: "Vues", value: "5 ecrans explorables" },
      ],
      shots: [
        {
          src: "/work/signal-desk/cover.svg",
          alt: "Concept overview dashboard Signal Desk",
          caption: "Une overview de prototype interactif ou changements de modes, focus states et rythme produit plus dense se lisent comme un vrai board.",
          viewport: "desktop",
        },
        {
          src: "/work/signal-desk/detail-1.svg",
          alt: "Concept board projets et table Signal Desk",
          caption: "Lignes selectionnables, etats de detail et filtres operationnels rendent la vue projets explorable au lieu d'etre simplement mise en scene.",
          viewport: "detail",
        },
        {
          src: "/work/signal-desk/detail-2.svg",
          alt: "Concept ecran analytics Signal Desk",
          caption: "Les analytics s'appuient maintenant sur les switches de segments, la lecture comparative et les focus states au lieu d'un simple bruit visuel.",
          viewport: "detail",
        },
        {
          src: "/work/signal-desk/mobile.svg",
          alt: "Concept vue mobile Signal Desk",
          caption: "Le resume mobile compresse les priorites dans une pile claire et rapidement lisible.",
          viewport: "mobile",
        },
      ],
    },
  },
};
