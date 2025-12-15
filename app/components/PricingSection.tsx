"use client";

/**
 * PricingSection Component
 * 
 * Premium pricing/offers section for Studi.ox with dark elegant UI.
 * 
 * Tailwind Tokens Used (assumed available):
 * - Colors:
 *   - bg-neutral-950, bg-neutral-900, bg-neutral-800 (dark backgrounds)
 *   - text-neutral-200, text-neutral-300, text-neutral-400, text-neutral-500 (text hierarchy)
 *   - accent: #FF7A30 (orange) - using --color-accent from globals.css or hardcoded
 *   - accent-hover: #E86A20
 * - Spacing: p-6, p-8, p-10, p-16, gap-6, gap-8, gap-10, mb-4, mb-6, mb-8, mb-12, mb-16, mb-20
 * - Border radius: rounded-xl, rounded-2xl, rounded-lg
 * - Backdrop blur: backdrop-blur-sm
 * - Grid: grid-cols-1, md:grid-cols-2, lg:grid-cols-3
 * - Responsive breakpoints: sm: (640px+), md: (768px+), lg: (1024px+)
 * 
 * If custom tokens needed, add to tailwind.config or use CSS variables from globals.css
 */

import { motion, useReducedMotion } from "framer-motion";
import { PricingCopy, Lang } from "../types/copy";
import { TopographyBg } from "./TopographyBg";

interface PricingSectionProps {
  lang: Lang;
  copy: PricingCopy;
  onPrimary?: (tierId: string) => void;
  onSecondary?: (tierId: string) => void;
  intensity?: "subtle" | "medium";
}

interface PricingCardProps {
  tier: PricingCopy["tiers"][number];
  lang: Lang;
  onPrimary?: (tierId: string) => void;
  variants: any;
  shouldReduceMotion: boolean;
  index: number;
}

export function PricingSection({
  lang,
  copy,
  onPrimary,
  onSecondary,
  intensity = "subtle",
}: PricingSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      className="relative bg-[#F0EEE9] py-12 md:py-16"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="relative w-full rounded-2xl md:rounded-[32px] bg-[#0E0E0E] md:mt-6 md:mb-6 p-8 md:p-12 lg:p-16">
          <TopographyBg intensity={intensity} className="z-0" />

          <div className="relative z-10">
            <motion.div
              className="text-center mb-10 md:mb-12"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2
                id="pricing-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0EEE9] mb-4"
              >
                {copy.heading[lang]}
              </h2>
              <p className="text-lg sm:text-xl text-[#F0EEE9]/80 max-w-2xl mx-auto">
                {copy.intro[lang]}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {copy.tiers.map((tier, index) => (
                <PricingCard
                  key={tier.id}
                  tier={tier}
                  lang={lang}
                  onPrimary={onPrimary}
                  variants={cardVariants}
                  shouldReduceMotion={shouldReduceMotion}
                  index={index}
                />
              ))}
            </motion.div>

            {copy.legalNote && (
              <motion.p
                className="text-center text-sm text-[#F0EEE9]/60 mt-10 md:mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {copy.legalNote[lang]}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  lang,
  onPrimary,
  variants,
  shouldReduceMotion,
  index,
}: PricingCardProps) {
  const isFeatured = tier.featured;

  return (
    <motion.div
      variants={variants}
      className={`relative group ${
        isFeatured
          ? "md:col-span-2 lg:col-span-1"
          : ""
      }`}
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        className={`relative h-full rounded-xl p-6 md:p-8 transition-all duration-300 ${
          isFeatured
            ? "bg-[#F0EEE9] border-2 border-[#FF7A30]"
            : "bg-[#F0EEE9] border border-[#0E0E0E]/10"
        } group-hover:border-[#FF7A30] group-hover:shadow-lg`}
      >
        <div className="relative z-10">
          {/* Title */}
          <h3
            className={`text-xl sm:text-2xl font-bold mb-3 md:mb-4 transition-all duration-300 ${
              isFeatured ? "text-[#0E0E0E]" : "text-[#0E0E0E]"
            } group-hover:text-[#FF7A30]`}
          >
            {tier.title[lang]}
          </h3>

          {/* Promise */}
          <p className="text-[#0E0E0E]/70 text-sm sm:text-base mb-4 md:mb-6 leading-relaxed">
            {tier.promise[lang]}
          </p>

          {/* Duration & Price */}
          <div className="mb-4 md:mb-6 space-y-2">
            <div className="text-xs sm:text-sm text-[#0E0E0E]/50 uppercase tracking-wide">
              {tier.duration[lang]}
            </div>
            <div className="text-lg sm:text-xl font-semibold text-[#FF7A30]">
              {tier.priceRange[lang]}
            </div>
          </div>

          {/* Deliverables */}
          <ul className="mb-6 md:mb-8 space-y-2 sm:space-y-3">
            {tier.deliverables[lang].map((item, idx) => (
              <li
                key={idx}
                className="text-sm sm:text-base text-[#0E0E0E]/80 flex items-start gap-2 sm:gap-3"
              >
                <span className="text-[#FF7A30] mt-1.5 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Note */}
          {tier.note && (
            <p className="text-xs sm:text-sm text-[#0E0E0E]/60 italic mb-6 md:mb-8">
              {tier.note[lang]}
            </p>
          )}

          {/* CTA Button */}
          <button
            onClick={() => onPrimary?.(tier.id)}
            className="
              relative group/btn w-full px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-medium text-sm sm:text-base
              transition-all duration-300 overflow-hidden
              bg-[#FF7A30] text-white hover:bg-[#E86A20] hover:shadow-[0_0_20px_rgba(255,122,48,0.4)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A30] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0EEE9]
            "
            aria-label={`${tier.primaryCta[lang]} - ${tier.title[lang]}`}
          >
            {!shouldReduceMotion && (
              <motion.span
                className="absolute inset-0 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["-200% 0", "200% 0"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
            <span className="relative z-10">{tier.primaryCta[lang]}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

