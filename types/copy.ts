export type Lang = "fr" | "en";

export interface TierCopy {
  id: "audit" | "signature" | "retainer";
  title: Record<Lang, string>;
  promise: Record<Lang, string>;
  duration: Record<Lang, string>;
  priceRange: Record<Lang, string>; // text, not number
  deliverables: Record<Lang, string[]>; // 3–6 bullets
  note?: Record<Lang, string>;
  primaryCta: Record<Lang, string>;
  secondaryCta?: Record<Lang, string>;
  featured?: boolean;
}

export interface PricingCopy {
  heading: Record<Lang, string>;
  intro: Record<Lang, string>;
  tiers: TierCopy[];
  legalNote?: Record<Lang, string>;
}
