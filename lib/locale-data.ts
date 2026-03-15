import type { HomeMode, HomeStageChapter, Locale, ProjectShowcase, ServiceCard } from "@/lib/types";

export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

export const siteShellCopy = {
  en: {
    nav: { home: "Home", work: "Work", contact: "Contact" },
    cta: "Start a project",
    ctaMobile: "Contact",
    strapline: "Design-led websites and product systems",
    footerLine: "Design-led websites, launches, and product systems built to scan fast and ship cleanly.",
    languageLabel: "Language",
  },
  fr: {
    nav: { home: "Accueil", work: "Projets", contact: "Contact" },
    cta: "Lancer un projet",
    ctaMobile: "Contact",
    strapline: "Sites et systemes produit guides par le design",
    footerLine: "Sites, lancements et systemes produit penses pour se parcourir vite et se livrer proprement.",
    languageLabel: "Langue",
  },
} as const;

export const homeCopy = {
  en: {
    badge: "UI designer, product engineer, full-stack aware",
    kicker: "Thomas / Editorial x product portfolio",
    heroTitle: "Websites and product systems",
    heroBody:
      "I design and build launches, product UI, and digital systems that need stronger hierarchy, better interaction logic, and a cleaner path to production.",
    heroPrimaryCta: "Browse case studies",
    heroSecondaryCta: "Discuss a project",
    stageNarrativeKicker: "Canvas scroll narrative",
    stageNarrativeTitle: "One immersive stage. Four very different kinds of digital work.",
    stageNarrativeBody:
      "The first scroll is stage-led on purpose. Each chapter reframes the same scene, then hands off to proof, featured work, and a cleaner archive.",
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
    servicesTitle: "Three offers shaped for the right level of clarity, polish, and product depth.",
    servicesBody:
      "A public launch, a campaign page, and a product surface do not need the same treatment. The offer is split so the structure, motion, and product discipline match the job.",
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
    linkedCaseCta: "Open case study",
    finalKicker: "Next step",
    finalTitle: "If the project needs stronger direction and sharper execution, I can help shape it.",
    finalBody:
      "I take on premium landing rebuilds, product UI direction, and digital work that needs to move from interface strategy to implementation without losing clarity.",
    finalPrimaryCta: "Email Thomas",
    finalSecondaryCta: "Contact page",
  },
  fr: {
    badge: "Designer UI, ingenierie produit, vision full-stack",
    kicker: "Thomas / portfolio editorial x produit",
    heroTitle: "Sites web et systemes produit",
    heroBody:
      "Je concois et je developpe des sites, des pages de lancement et des interfaces produit quand le message doit gagner en clarte, l'experience en precision et la mise en ligne en fiabilite.",
    heroPrimaryCta: "Voir les etudes de cas",
    heroSecondaryCta: "Discuter du projet",
    stageNarrativeKicker: "Narration immersive",
    stageNarrativeTitle: "Une scene immersive, quatre registres de travail tres differents.",
    stageNarrativeBody:
      "Le premier scroll est volontairement porte par la scene. Chaque chapitre recadre le meme univers avant de laisser place aux preuves, aux projets et a une archive plus lisible.",
    capabilities: [
      { label: "Lancements", body: "Refontes et pages publiques qui clarifient l'offre et renforcent l'attrait de la marque." },
      { label: "Produits", body: "Tableaux de bord, onboarding et vues produit avec une vraie profondeur d'interface, pas juste un bel habillage." },
      { label: "Livraison", body: "Une execution de bout en bout quand l'interface doit rester solide jusqu'a la mise en ligne." },
    ],
    featuredKicker: "Projets mis en avant",
    featuredTitle: "Quatre registres. Une meme exigence d'execution.",
    featuredBody:
      "Marque de service, page IA orientee conversion, produit d'analyse deja en ligne et prototype B2B interactif. Quatre registres differents, un meme niveau de direction et d'execution.",
    featuredArchiveLink: "Voir toute l'archive",
    servicesKicker: "Services",
    servicesTitle: "Trois offres selon le niveau de clarte, de mise en scene et de profondeur produit dont le projet a besoin.",
    servicesBody:
      "Un site de lancement, une campagne et une interface produit n'appellent pas le meme traitement. L'offre est donc structuree pour que la forme, le mouvement et la discipline produit servent le besoin reel.",
    processKicker: "Process",
    proofKicker: "Preuves",
    toolingTitle: "Stack et mise en ligne",
    toolingBody:
      "Next.js 15, React 19, Tailwind 4, un deploiement GitHub + Cloudflare et des smoke checks Playwright pour garder de la fiabilite jusqu'a la mise en ligne.",
    optimiseTitle: "Ce que j'optimise",
    optimiseBody:
      "Une premiere impression forte, une hierarchie CTA lisible, une profondeur produit credible et une motion qui ne parasite jamais la lecture.",
    currentSignalLabel: "Signal en cours",
    commandStageLabel: "Scene directrice",
    currentRegisterLabel: "Registre actif",
    linkedCaseLabel: "Projet associe",
    linkedCaseCta: "Ouvrir l'etude de cas",
    finalKicker: "Etape suivante",
    finalTitle: "Si le projet a besoin d'une direction plus nette et d'une execution plus juste, je peux aider.",
    finalBody:
      "J'interviens sur des refontes premium de landing pages, de la direction UI produit et des projets digitaux qui doivent aller du cadrage d'interface a l'implementation sans perdre en clarte.",
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
      title: "Landing / repositionnement",
      deliverable: "Des pages publiques plus nettes pour les marques de service, les lancements et les repositionnements qui ne racontent pas encore leur vraie valeur.",
      fit: "A privilegier quand le business est solide mais que le site parait date, trop generique ou trop faible sur la confiance et la hierarchie CTA.",
      ctaLabel: "Recaler le signal public",
    },
    {
      title: "UI marketing premium",
      deliverable: "Des surfaces editoriales de campagne avec plus de rythme, de precision et de maitrise du message qu'une landing standard.",
      fit: "Pour les marques qui ont besoin de plus d'identite, d'un discours plus tenu et d'un systeme de pages capable d'accompagner plusieurs lancements.",
      ctaLabel: "Elever la campagne",
    },
    {
      title: "UI produit / dashboard",
      deliverable: "Des dashboards, onboarding, analytics et outils internes qui ressemblent a un vrai produit, pas a un concept bien presente.",
      fit: "Pour les equipes produit qui ont besoin d'une direction d'interface et d'un appui d'implementation, avec une vraie vision full-stack quand le produit l'exige.",
      ctaLabel: "Structurer la couche produit",
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
    { label: "Champ d'intervention", value: "Des lancements premium aux interfaces produit deja en ligne" },
    { label: "Mise en ligne", value: "GitHub + Cloudflare" },
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
      title: "Clarifier l'enjeu business",
      body: "On clarifie d'abord l'offre, l'audience, la confiance et l'action attendue pour que l'interface puisse etre expressive sans se disperser.",
    },
    {
      title: "Concevoir le systeme d'interaction",
      body: "Typographie, composition, motion et etats sont penses comme un seul systeme, pas comme des couches ajoutees trop tard.",
    },
    {
      title: "Livrer une experience credible",
      body: "Le responsive, le reduced motion et les contraintes de production comptent autant que la premiere impression.",
    },
  ],
} as const;

export const homeStageChaptersByLocale: Record<Locale, HomeStageChapter[]> = {
  en: [
    {
      slug: "coconut-paradise-spa",
      chapter: "01",
      chapterLabel: "Hospitality brand",
      headline: "Atmosphere, trust, and booking clarity can live in the same premium surface.",
      body:
        "This chapter is about quiet luxury without vagueness. The public face still needs to sell, reassure, and move people toward action.",
      valueCue: "Hospitality-led trust and multilingual clarity.",
    },
    {
      slug: "animaidstudioai",
      chapter: "02",
      chapterLabel: "AI-oriented conversion",
      headline: "A product landing should collapse the path from curiosity to paid action.",
      body:
        "The surface stays focused on one conversion loop: input, preview, unlock. The scene shifts, but the selling logic stays sharp.",
      valueCue: "Single CTA path with cleaner monetization framing.",
    },
    {
      slug: "dashboard-meta",
      chapter: "03",
      chapterLabel: "Analytics app",
      headline: "Operator software needs denser reading, stronger hierarchy, and less presentation fluff.",
      body:
        "This chapter shows the more operational side of the portfolio: analytics, alerts, and profit reading that already behave like a real product.",
      valueCue: "Shipped analytics product with live operator depth.",
    },
    {
      slug: "signal-desk",
      chapter: "04",
      chapterLabel: "Interactive prototype",
      headline: "A convincing prototype should already feel explorable before the backend is live.",
      body:
        "The goal here is not fake polish. It is product rhythm, state depth, and enough interaction logic to make the concept believable.",
      valueCue: "Interactive product prototype with credible state behavior.",
    },
  ],
  fr: [
    {
      slug: "coconut-paradise-spa",
      chapter: "01",
      chapterLabel: "Marque de service",
      headline: "Une interface premium peut rester chaleureuse, inspirer confiance et clarifier la reservation.",
      body:
        "Le but est de poser un luxe sobre sans perdre la lisibilite publique ni la capacite a convertir.",
      valueCue: "Confiance locale, reservation claire et lecture multilingue.",
    },
    {
      slug: "animaidstudioai",
      chapter: "02",
      chapterLabel: "Conversion IA",
      headline: "Une page produit doit raccourcir le chemin entre la curiosite et l'action payante.",
      body:
        "La surface reste concentree sur une seule boucle de conversion : import, apercu, deblocage. La scene evolue, mais la logique de vente reste nette.",
      valueCue: "Un seul parcours, de l'import au deblocage payant.",
    },
    {
      slug: "dashboard-meta",
      chapter: "03",
      chapterLabel: "Application d'analyse",
      headline: "Un logiciel metier a besoin d'une lecture plus dense, d'une hierarchie plus ferme et de moins d'effets de presentation.",
      body:
        "Ce chapitre montre la facette la plus operationnelle du portfolio : analyse, alertes et lecture de la rentabilite qui se comportent deja comme un vrai produit.",
      valueCue: "Un produit d'analyse deja en ligne, pense pour l'operateur.",
    },
    {
      slug: "signal-desk",
      chapter: "04",
      chapterLabel: "Prototype interactif",
      headline: "Un prototype convaincant doit deja se laisser explorer avant meme que le backend soit actif.",
      body:
        "Ici, l'objectif n'est pas seulement de faire joli. Il s'agit d'installer un rythme produit, des etats credibles et assez de logique d'interface pour rendre le concept convaincant.",
      valueCue: "Un prototype interactif avec de vrais etats et un comportement credible.",
    },
  ],
};

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
        { label: "Focus", value: "B2B" },
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
      label: "Marque de service",
      eyebrow: "Lancement de marque premium",
      heroLine: "ou confiance et desirabilite se lisent ensemble.",
      valueLine: "Ambiance premium / parcours multilingue / reservation fluide",
      stageTitle: "Une marque de service doit paraitre calme, premium et immediatement rassurante.",
      stageSummary:
        "Ici, tout repose sur un rythme editorial juste, une tonalite d'accueil claire et une lecture publique qui ne casse pas l'ambiance.",
      pulse: "L'offre, la preuve et le CTA restent lisibles sans casser l'ambiance.",
      accent: "#f2b36a",
      accentSoft: "rgba(242, 179, 106, 0.18)",
      metrics: [
        { label: "Langues", value: "4 langues" },
        { label: "Surface", value: "Marketing + admin" },
        { label: "Preuve", value: "Confiance locale" },
      ],
      cues: ["Rythme editorial maitrise", "Luxe sobre, sans flou", "CTA et preuves visibles"],
      modules: [
        { label: "Ambiance", value: "Narration" },
        { label: "Confiance", value: "Preuve locale" },
        { label: "Action", value: "Reserver clairement" },
      ],
    },
    {
      slug: "animaidstudioai",
      label: "IA orientee conversion",
      eyebrow: "De l'import a l'achat",
      heroLine: "qui expliquent vite la valeur et convertissent sans friction.",
      valueLine: "Promesse mono-parcours / boucle d'apercu / deblocage payant",
      stageTitle: "Une page produit doit lever l'ambiguite avant de demander de payer.",
      stageSummary:
        "Ici, tout s'organise autour d'un flux dominant : expliquer la boucle, montrer l'apercu, puis rendre l'achat naturel.",
      pulse: "La page garde un chemin clair, de l'import au deblocage payant, avec une logique produit avant l'effet.",
      accent: "#6d8fff",
      accentSoft: "rgba(109, 143, 255, 0.2)",
      metrics: [
        { label: "Parcours", value: "Import puis achat" },
        { label: "Stack", value: "Next.js + Cloudflare" },
        { label: "Conversion", value: "Un seul CTA" },
      ],
      cues: ["La promesse se comprend d'un coup", "Les apercus reduisent la friction", "La monetisation parait native"],
      modules: [
        { label: "Entree", value: "Import" },
        { label: "Apercu", value: "Generation" },
        { label: "Paiement", value: "Deblocage" },
      ],
    },
    {
      slug: "dashboard-meta",
      label: "Produit d'analyse",
      eyebrow: "Produit metier deja en ligne",
      heroLine: "qui rendent des donnees denses lisibles sans les aplatir.",
      valueLine: "Diagnostics publicitaires / rentabilite / contexte operateur",
      stageTitle: "Un produit d'analyse en ligne demande plus de densite de lecture, des aretes plus franches et moins d'effets de presentation.",
      stageSummary:
        "Ici, l'enjeu est la confiance operationnelle : tableaux de bord denses, etats produit reels et surfaces de decision qui meritent leur complexite.",
      pulse: "Le produit se lit comme un vrai outil operateur, pas comme une demo deguisee en logiciel.",
      accent: "#2fd6bb",
      accentSoft: "rgba(47, 214, 187, 0.18)",
      metrics: [
        { label: "Type", value: "App livree" },
        { label: "Usage", value: "Ads + rentabilite" },
        { label: "Back-end", value: "Cloudflare Functions" },
      ],
      cues: ["Dense mais lisible", "Le diagnostic avant le decor", "Auth et facturation integrees"],
      modules: [
        { label: "Rentabilite", value: "Lisible" },
        { label: "Alertes", value: "Actionnables" },
        { label: "Operationnel", value: "En continu" },
      ],
    },
    {
      slug: "signal-desk",
      label: "Prototype interactif",
      eyebrow: "Etats produit et profondeur",
      heroLine: "qui restent credibles avant meme que le backend soit branche.",
      valueLine: "Modes de vue / etats selectionnables / rythme produit explorable",
      stageTitle: "Un bon prototype doit deja se comporter comme un produit avant meme d'entrer en production.",
      stageSummary:
        "Ici, la reflexion produit se voit dans les etats interactifs, les vues explorables et un comportement d'interface plus credible.",
      pulse: "Le prototype assume son statut, mais il se laisse assez explorer pour vendre une vraie profondeur produit, pas seulement une belle finition.",
      accent: "#7be8ff",
      accentSoft: "rgba(123, 232, 255, 0.18)",
      metrics: [
        { label: "Type", value: "Interactif" },
        { label: "Vues", value: "5 ecrans" },
        { label: "Focus", value: "B2B ops" },
      ],
      cues: ["Etats client plus riches", "De la vue d'ensemble a l'onboarding", "Rythme produit credible"],
      modules: [
        { label: "Vue d'ensemble", value: "Pilotable" },
        { label: "Analyse", value: "Segmentee" },
        { label: "Onboarding", value: "Accompagne" },
      ],
    },
  ],
};

export const workPageCopy = {
  en: {
    kicker: "Work archive",
    title: "A curated archive of shipped work and product-facing concepts.",
    body:
      "The archive stays selective on purpose. Each case shows a different register, but the same standard of hierarchy, motion discipline, and production-minded implementation.",
  },
  fr: {
    kicker: "Archive des projets",
    title: "Une archive selective de projets livres et de concepts orientes produit.",
    body:
      "L'archive reste volontairement selective. Chaque projet montre un registre distinct, avec le meme niveau d'exigence sur la hierarchie, la motion et la qualite d'execution.",
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
    real: "livres",
    concept: "concepts",
    marketing: "marketing",
    product: "produit",
    motion: "animation",
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
    conceptCase: "Prototype",
    live: "En ligne",
    delivery: "Livraison",
    prototype: "Prototype",
    view: "Ouvrir",
    liveDemo: "Voir le site",
    repository: "Code source",
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
    motion: "animation",
    product: "produit",
    analytics: "analyse",
    concept: "concept",
    real: "livre",
  },
} as const;

export const contactPageCopy = {
  en: {
    kicker: "Contact",
    title: "If the next release needs stronger direction, cleaner execution, or a sharper surface, start here.",
    body:
      "I take on selective freelance work across design-led websites, product surfaces, and digital systems. The fastest path is to share the current product, the commercial goal, and where the experience is still underperforming.",
    primaryContact: "Primary contact",
    bookCall: "Book a call",
  },
  fr: {
    kicker: "Contact",
    title: "Si la prochaine version a besoin d'une direction plus nette, d'une execution plus propre ou d'une interface mieux tenue, c'est ici que ca commence.",
    body:
      "Je prends des missions freelance selectives autour de sites guides par le design, d'interfaces produit et de systemes digitaux. Le plus simple est d'envoyer le produit actuel, l'objectif commercial et l'endroit ou l'experience perd encore en clarte ou en performance.",
    primaryContact: "Contact principal",
    bookCall: "Planifier un appel",
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
    readingTitle: "A client-facing project story, not just a build log.",
    readingBody:
      "Each case study is structured to show the business problem, the interface system, and the implementation decisions behind the outcome.",
    structureTitle: "Case structure",
    structureBodyOne:
      "Challenge, role, system, interactions, implementation, and outcome stay consistent across every project.",
    structureBodyTwo:
      "That makes it easier to compare different project types without losing the business story behind the visuals.",
    nextMove: "Next move",
    nextTitle: "If the next product, launch, or redesign needs the same standard, let's talk.",
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
    topKicker: "Lecture du projet",
    openLiveDemo: "Voir la version en ligne",
    viewRepository: "Voir le repo Git",
    discussSimilar: "Discuter d'un projet similaire",
    projectFrame: "Cadre du projet",
    portfolioConcept: "Concept de portfolio",
    clientDelivery: "Projet livre",
    outcomeFrame: "Lecture du resultat",
    outcomeBody: "Concu pour montrer comment une direction d'interface tient lorsqu'elle doit vraiment fonctionner.",
    industry: "Secteur",
    status: "Statut",
    stack: "Stack",
    readingLens: "Angle de lecture",
    readingTitle: "Une etude de cas pensee pour etre lue par un client, pas comme un simple journal de production.",
    readingBody:
      "Chaque etude de cas est structuree pour montrer le probleme business, le systeme d'interface et les decisions d'implementation qui soutiennent le resultat.",
    structureTitle: "Structure",
    structureBodyOne:
      "Defi, role, systeme, interactions, implementation et resultat suivent la meme trame sur chaque projet.",
    structureBodyTwo:
      "Cela permet de comparer des projets tres differents sans perdre l'histoire business derriere les visuels.",
    nextMove: "Suite logique",
    nextTitle: "Si le prochain produit, site ou redesign demande ce niveau d'exigence, parlons-en.",
    nextBody:
      "J'interviens sur des projets qui demandent une direction d'interface plus nette, des interactions mieux tenues et une execution plus propre du concept jusqu'a l'implementation.",
    nextPrimaryCta: "Discuter du projet",
    nextSecondaryCta: "Retour a l'archive",
    leadSurface: "Surface principale",
    mobileView: "Vue mobile",
    detailPrefix: "Detail",
    shippedCase: "Etude de cas livree",
    conceptCase: "Etude de cas concept",
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
          alt: "Accueil desktop de Coconut Paradise Spa",
          caption: "Une ouverture desktop qui equilibre ambiance de marque, clarte du CTA et confiance multilingue.",
          viewport: "desktop",
        },
        {
          src: "/work/coconut/detail-1.svg",
          alt: "Modules services et preuves Coconut Paradise Spa",
          caption: "Les blocs services et reassurance gardent du rythme sans alourdir la lecture.",
          viewport: "detail",
        },
        {
          src: "/work/coconut/detail-2.svg",
          alt: "Apercu promotions et administration Coconut Paradise Spa",
          caption: "Les modules promotionnels et admin montrent que le site peut rester a jour sans dependre de retouches manuelles.",
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
        { label: "Parcours", value: "Upload vers achat" },
        { label: "Surface", value: "Landing produit" },
        { label: "Stack", value: "Next.js sur Cloudflare" },
      ],
      shots: [
        {
          src: "/work/animaid/cover.svg",
          alt: "Vue desktop de la landing AnimAid",
          caption: "Un parcours unique qui presente l'offre, la boucle d'apercu et le deblocage payant en un seul passage.",
          viewport: "desktop",
        },
        {
          src: "/work/animaid/detail-1.svg",
          alt: "Interface import et apercu AnimAid",
          caption: "Les etats d'apercu guident l'utilisateur vers la generation sans masquer la logique de monetisation.",
          viewport: "detail",
        },
        {
          src: "/work/animaid/detail-2.svg",
          alt: "Apercu monetisation et checkout AnimAid",
          caption: "Le cadrage du checkout reste produit, pas publicitaire, pour que l'upgrade paraisse integre.",
          viewport: "detail",
        },
        {
          src: "/work/animaid/mobile.svg",
          alt: "Flow mobile de conversion AnimAid",
          caption: "La version mobile garde le parcours compact pour un usage a une main et un scan rapide.",
          viewport: "mobile",
        },
      ],
    },
    "dashboard-meta": {
      metrics: [
        { label: "Type", value: "App livree" },
        { label: "Usage", value: "Ads + rentabilite" },
        { label: "Back-end", value: "Cloudflare Functions" },
      ],
      shots: [
        {
          src: "/work/dashboard-meta/cover.svg",
          alt: "Vue d'ensemble et operations de DashboardMeta",
          caption: "Un tableau de bord operationnel plus dense, pense pour le diagnostic d'achat media, la lecture de la rentabilite et la prise de decision dans un produit deja en ligne.",
          viewport: "desktop",
        },
        {
          src: "/work/dashboard-meta/detail-1.svg",
          alt: "Detail analytics et diagnostics DashboardMeta",
          caption: "Le produit equilibre visibilite des tendances, diagnostic et modules d'analyse detaillee sans tomber dans des graphiques de demonstration.",
          viewport: "detail",
        },
        {
          src: "/work/dashboard-meta/detail-2.svg",
          alt: "Detail alertes et modules operationnels DashboardMeta",
          caption: "Authentification, facturation, alertes et ecrans operationnels donnent au produit une vraie sensation de completude.",
          viewport: "detail",
        },
        {
          src: "/work/dashboard-meta/mobile.svg",
          alt: "Apercu mobile analytics DashboardMeta",
          caption: "La vue mobile compresse KPI, alertes et signaux de lecture dans une pile plus serree, pensee pour l'operateur.",
          viewport: "mobile",
        },
      ],
    },
    "signal-desk": {
      metrics: [
        { label: "Type", value: "Prototype" },
        { label: "Focus", value: "Operations B2B" },
        { label: "Vues", value: "5 ecrans" },
      ],
      shots: [
        {
          src: "/work/signal-desk/cover.svg",
          alt: "Concept vue d'ensemble dashboard Signal Desk",
          caption: "La vue d'ensemble du prototype fait lire les changements de mode, les etats de focus et le rythme produit comme un vrai cockpit.",
          viewport: "desktop",
        },
        {
          src: "/work/signal-desk/detail-1.svg",
          alt: "Concept board projets et table Signal Desk",
          caption: "Lignes selectionnables, etats de detail et filtres operationnels rendent la vue projets exploitable, pas seulement mise en scene.",
          viewport: "detail",
        },
        {
          src: "/work/signal-desk/detail-2.svg",
          alt: "Concept ecran analytics Signal Desk",
          caption: "L'ecran d'analyse s'appuie maintenant sur des segments, de la lecture comparative et des etats de focus au lieu d'un simple bruit visuel.",
          viewport: "detail",
        },
        {
          src: "/work/signal-desk/mobile.svg",
          alt: "Concept vue mobile Signal Desk",
          caption: "Le resume mobile rassemble les priorites dans une pile claire et rapide a parcourir.",
          viewport: "mobile",
        },
      ],
    },
  },
};
