import { PricingCopy } from "@/types/copy";

export const pricingCopy: PricingCopy = {
  heading: {
    fr: "Nos offres.",
    en: "Our offers.",
  },
  intro: {
    fr: "Trois niveaux d'accompagnement pour clarifier et professionnaliser votre image, du diagnostic rapide à la refonte complète.",
    en: "Three levels of support to clarify and professionalize your brand, from quick audit to full redesign.",
  },
  tiers: [
    {
      id: "audit",
      title: { fr: "Diagnostic", en: "Audit" },
      promise: {
        fr: "En 3 jours, un regard expert et une direction claire pour décider sereinement.",
        en: "In 3 days, an expert review and a clear direction to decide with confidence.",
      },
      duration: { fr: "3–5 jours", en: "3–5 days" },
      priceRange: { fr: "À partir de 500 € HT", en: "From €500 excl. VAT" },
      deliverables: {
        fr: [
          "Audit visuel de l'identité et du site",
          "Moodboard / piste créative",
          "Restitution 1:1 (30–45 min)",
        ],
        en: [
          "Visual audit of brand & website",
          "Moodboard / creative direction",
          "1:1 handoff (30–45 min)",
        ],
      },
      primaryCta: { fr: "Réserver un diagnostic", en: "Book an audit" },
    },
    {
      id: "signature",
      featured: true,
      title: { fr: "Refonte 360°", en: "360° Redesign" },
      promise: {
        fr: "Identité, UX/UI et supports clés pour une image claire, cohérente et crédible.",
        en: "Identity, UX/UI and key assets for a clear, consistent and credible brand.",
      },
      duration: { fr: "4–6 semaines", en: "4–6 weeks" },
      priceRange: {
        fr: "À partir de 5 000 € HT",
        en: "From €5,000 excl. VAT",
      },
      deliverables: {
        fr: [
          "Identité visuelle & charte",
          "Maquettes UI (pages clés)",
          "Kit de communication prêt à l'emploi",
        ],
        en: [
          "Visual identity & guidelines",
          "UI mockups (key pages)",
          "Ready-to-use communication kit",
        ],
      },
      primaryCta: { fr: "Discuter de votre projet", en: "Discuss your project" },
    },
    {
      id: "retainer",
      title: {
        fr: "Direction continue",
        en: "Continuous direction",
      },
      promise: {
        fr: "Votre directeur artistique à la demande pour maintenir la cohérence dans le temps.",
        en: "Your on-demand art director to maintain consistency over time.",
      },
      duration: { fr: "Abonnement mensuel", en: "Monthly retainer" },
      priceRange: { fr: "À partir de 450 € HT", en: "From €450 excl. VAT" },
      deliverables: {
        fr: [
          "5–10h design / mois",
          "Déclinaisons & nouveaux assets",
          "Optimisations UI continues",
        ],
        en: [
          "5–10h design / month",
          "New assets & variations",
          "Ongoing UI improvements",
        ],
      },
      primaryCta: {
        fr: "Devenir client partenaire",
        en: "Become a partner client",
      },
    },
  ],
  legalNote: {
    fr: "Tarifs indicatifs. Un devis précis est fourni après échange et cadrage.",
    en: "Indicative ranges. A precise quote is provided after discovery and scoping.",
  },
};
