import { PricingCopy } from "@/types/copy";

export const pricingCopy: PricingCopy = {
  heading: {
    fr: "Votre site ne convertit pas ? On règle ça en 5 jours.",
    en: "Your site isn't converting? We fix that in 5 days.",
  },
  intro: {
    fr: "Et si vous êtes satisfait, on peut aller plus loin ensemble.",
    en: "And if you're satisfied, we can go further together.",
  },
  tiers: [
    {
      id: "signature",
      featured: true,
      title: { fr: "Landing page déléguée", en: "Delegated landing page" },
      promise: {
        fr: "Une page claire et structurée pour présenter votre offre, sans y passer du temps.",
        en: "A clear and structured page to present your offer, without spending time on it.",
      },
      duration: { fr: "5 jours", en: "5 days" },
      priceRange: {
        fr: "800 € HT",
        en: "€800 excl. VAT",
      },
      deliverables: {
        fr: [
          "1 landing page complète (desktop)",
          "Structure claire (message, offre, CTA)",
          "Design professionnel",
          "1 aller-retour maximum",
          "Livrée prête à publier",
        ],
        en: [
          "1 complete landing page (desktop)",
          "Clear structure (message, offer, CTA)",
          "Professional design",
          "Maximum 1 round of revisions",
          "Delivered ready to publish",
        ],
      },
      primaryCta: { fr: "Discuter de ma landing page", en: "Discuss my landing page" },
    },
    {
      id: "audit",
      title: { fr: "Refonte site", en: "Website redesign" },
      promise: {
        fr: "Quand une simple landing ne suffit plus.",
        en: "When a simple landing page is not enough.",
      },
      duration: { fr: "4–6 semaines", en: "4–6 weeks" },
      priceRange: { fr: "À partir de 5 000 € HT", en: "From €5,000 excl. VAT" },
      deliverables: {
        fr: [
          "Audit visuel et structurel",
          "Refonte des pages clés",
          "Intégration responsive",
          "Livraison clé en main",
        ],
        en: [
          "Visual and structural audit",
          "Redesign of key pages",
          "Responsive integration",
          "Turnkey delivery",
        ],
      },
      primaryCta: { fr: "Discuter de mon projet", en: "Discuss my project" },
    },
    {
      id: "retainer",
      title: {
        fr: "Direction continue",
        en: "Continuous direction",
      },
      categoryLabel: {
        fr: "Clients existants",
        en: "Existing clients",
      },
      promise: {
        fr: "Pour maintenir un site propre et cohérent dans le temps.",
        en: "To maintain a clean and consistent site over time.",
      },
      duration: { fr: "Abonnement mensuel", en: "Monthly retainer" },
      priceRange: { fr: "À partir de 450 € HT / mois", en: "From €450 excl. VAT / month" },
      deliverables: {
        fr: [
          "5 à 10h / mois",
          "Ajustements et nouveaux assets",
          "Support prioritaire",
        ],
        en: [
          "5 to 10h / month",
          "Adjustments and new assets",
          "Priority support",
        ],
      },
      primaryCta: {
        fr: "",
        en: "",
      },
      hideCta: true,
    },
  ],
  legalNote: {
    fr: "Pas de refonte lourde. Un livrable clair. On commence simple.",
    en: "No heavy redesign. A clear deliverable. We start simple.",
  },
};
