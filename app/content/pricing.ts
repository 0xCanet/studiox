import { PricingCopy } from "../types/copy";

export const pricingCopy: PricingCopy = {
  heading: {
    fr: "Nos offres.",
    en: "Our offers.",
  },
  intro: {
    fr: "Trois niveaux d'accompagnement pour clarifier et professionnaliser votre image — du diagnostic rapide à la refonte complète.",
    en: "Three levels of support to clarify and professionalize your brand — from quick audit to full redesign.",
  },
  tiers: [
    {
      id: "audit",
      title: { fr: "Diagnostic visuel express", en: "Visual Audit — Express" },
      promise: {
        fr: "En 3 jours, un regard expert et une direction claire pour décider sereinement de la suite.",
        en: "In 3 days, an expert review and a clear direction so you can decide with confidence.",
      },
      duration: { fr: "3–5 jours", en: "3–5 days" },
      priceRange: { fr: "à partir de 600–900 € HT", en: "from €600–900" },
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
      secondaryCta: { fr: "Détails de l'offre", en: "Offer details" },
    },
    {
      id: "signature",
      featured: true,
      title: { fr: "Refonte 360°", en: "360° Redesign" },
      promise: {
        fr: "Identité, UX/UI et supports clés — une image claire, cohérente et crédible.",
        en: "Identity, UX/UI and key assets — a clear, consistent and credible brand.",
      },
      duration: { fr: "4–6 semaines", en: "4–6 weeks" },
      priceRange: {
        fr: "5 000–7 000 € HT (jusqu'à 12k selon portée)",
        en: "€5,000–7,000 (up to €12k depending on scope)",
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
      note: {
        fr: "Option sprint 10 jours et/ou motion léger possible.",
        en: "Optional 10-day sprint and/or light motion available.",
      },
      primaryCta: { fr: "Discuter de votre projet", en: "Discuss your project" },
      secondaryCta: { fr: "Voir un exemple", en: "See an example" },
    },
    {
      id: "retainer",
      title: { fr: "Direction design continue", en: "Continuous Design Direction" },
      promise: {
        fr: "Votre directeur artistique à la demande pour entretenir la cohérence.",
        en: "Your on-demand art director to maintain consistency over time.",
      },
      duration: { fr: "Abonnement mensuel", en: "Monthly retainer" },
      priceRange: { fr: "450–950 € / mois", en: "€450–950 / month" },
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
      primaryCta: { fr: "Devenir client partenaire", en: "Become a partner client" },
    },
  ],
  legalNote: {
    fr: "Tarifs indicatifs. Un devis précis est fourni après échange et cadrage.",
    en: "Indicative ranges. A precise quote is provided after discovery and scoping.",
  },
};
