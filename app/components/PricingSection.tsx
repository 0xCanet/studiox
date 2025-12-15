"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { PricingCopy } from "@/types/copy";
import { Container } from "./Container";
import { Section } from "./Section";

/**
 * PricingSection Component
 * 
 * Usage example:
 * ```tsx
 * import { PricingSection } from "@/components/PricingSection";
 * import { pricingCopy } from "@/content/pricing";
 * 
 * function MyPage() {
 *   const [lang, setLang] = useState<"fr" | "en">("fr");
 * 
 *   return (
 *     <PricingSection
 *       lang={lang}
 *       copy={pricingCopy}
 *       onPrimary={(tierId) => {
 *         console.log("Primary clicked:", tierId);
 *         // Handle primary action (e.g., open contact modal)
 *       }}
 *       onSecondary={(tierId) => {
 *         console.log("Secondary clicked:", tierId);
 *         // Handle secondary action (e.g., show details)
 *       }}
 *       intensity="subtle" // or "medium"
 *     />
 *   );
 * }
 * ```
 */

interface PricingSectionProps {
  lang: "fr" | "en";
  copy: PricingCopy;
  onPrimary: (tierId: "audit" | "signature" | "retainer") => void;
  intensity?: "subtle" | "medium";
}

type CardVariants = {
  hidden: {
    opacity: number;
    y: number;
    scale: number;
  };
  visible: {
    opacity: number;
    y: number;
    scale: number;
    transition: {
      duration: number;
      ease: number[];
    };
  };
};

/* Tailwind tokens assumed (documented in comment, not modifying config):
 * - bg-neutral-950: near-black (#0E0F11 or similar)
 * - bg-neutral-900: dark card background
 * - text-neutral-200: primary text
 * - text-neutral-400: secondary text
 * - --accent: CSS variable for orange (#FF7A2F / #FF7A30)
 * Custom classes used:
 * - accent gradient: bg-[linear-gradient(135deg,#FF7A2F,#E86A20)]
 * - glow effects: shadow-[0_0_20px_rgba(255,122,47,0.3)]
 */

export function PricingSection({
  lang,
  copy,
  onPrimary,
  intensity = "subtle",
}: PricingSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [pricingScrollY, setPricingScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const prevPricingScrollYRef = useRef(0);

  // Container animation
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

  // Card animation
  const cardVariants: CardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
      scale: shouldReduceMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Parallax scroll effect with zoom
  useLenis(({ scroll }) => {
    requestAnimationFrame(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        const buffer = 10;
        
        let newPricingScrollY = 0;
        
        if (rect.bottom <= buffer || rect.top >= viewportHeight - buffer) {
          newPricingScrollY = 0;
        } else if (rect.top < viewportHeight && rect.bottom > 0) {
          const scrollProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
          
          const maxParallax = 200;
          newPricingScrollY = scrollProgress * maxParallax;
        }
        
        const currentValue = prevPricingScrollYRef.current;
        const targetValue = newPricingScrollY;
        const diff = targetValue - currentValue;
        
        if (Math.abs(diff) > 0.1) {
          const interpolationSpeed = diff > 0 ? 0.25 : 0.15;
          const smoothedValue = currentValue + diff * interpolationSpeed;
          prevPricingScrollYRef.current = smoothedValue;
          setPricingScrollY(smoothedValue);
        } else {
          // Snap to target if very close
          prevPricingScrollYRef.current = targetValue;
          setPricingScrollY(targetValue);
        }
      } else {
        const currentValue = prevPricingScrollYRef.current;
        if (Math.abs(currentValue) > 0.1) {
          const smoothedValue = currentValue * 0.9; // Smooth decay
          prevPricingScrollYRef.current = smoothedValue;
          setPricingScrollY(smoothedValue);
        } else {
          prevPricingScrollYRef.current = 0;
          setPricingScrollY(0);
        }
      }
    });
  }, []);

  return (
    <Section 
      ref={sectionRef}
      variant="base"
      background="bg"
      className="relative py-12 md:py-16 lg:py-20"
    >
      {/* Dark container with margins like Hero section - 24px (md:ml-6 md:mr-6) from edges */}
      <div 
        className="relative bg-neutral-950 overflow-hidden rounded-none md:rounded-[32px] mx-0 md:mx-6"
      >
        {/* Video Background */}
        <div 
          ref={videoRef}
          className="absolute inset-0 z-0"
          style={{
            transform: pricingScrollY > 0 
              ? `translateY(${pricingScrollY * 0.4}px) scale(${1.1 * (1 + pricingScrollY * 0.0002)})`
              : `scale(1.1)`,
            transformOrigin: "center center",
            willChange: 'transform',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              filter: "grayscale(100%) blur(0.5px)",
              WebkitFilter: "grayscale(100%) blur(0.5px)",
            }}
            aria-label="Pricing section background video"
          >
            <source src="/src/video-pricing.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-neutral-950/60" />
        </div>

        {/* Content wrapper with max-width constraint like other sections */}
        <Container maxWidth="wide" className="relative z-10 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h1 
              className="section-title mb-6 font-heading font-bold"
              style={{ color: '#F0EEE9' }}
            >
              {copy.heading[lang].replace(/\.$/, '')}
              <span className="text-accent">.</span>
            </h1>
            <h2 
              className="font-heading font-normal text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: '#F0EEE9' }}
            >
              {copy.intro[lang].replace(/\.$/, '')}
              <span className="text-accent">.</span>
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-stretch"
          >
            {copy.tiers.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                lang={lang}
                onPrimary={() => onPrimary(tier.id)}
                shouldReduceMotion={shouldReduceMotion}
                cardVariants={cardVariants}
              />
            ))}
          </motion.div>

          {/* Legal Note */}
          {copy.legalNote && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center text-xs md:text-sm mt-12 md:mt-16 lg:mt-20"
              style={{ color: '#F0EEE9' }}
            >
              {copy.legalNote[lang]}
            </motion.p>
          )}
        </Container>
      </div>
    </Section>
  );
}

interface PricingCardProps {
  tier: PricingCopy["tiers"][number];
  lang: "fr" | "en";
  onPrimary: () => void;
  shouldReduceMotion: boolean;
  cardVariants: CardVariants;
}

function PricingCard({
  tier,
  lang,
  onPrimary,
  shouldReduceMotion,
  cardVariants,
}: PricingCardProps) {
  const isFeatured = tier.featured === true;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      className={`group relative flex ${
        isFeatured ? "sm:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Glassmorphism Card - Liquid Glass Style */}
      <div className="relative rounded-xl md:rounded-2xl p-5 md:p-8 sm:p-10 h-full overflow-hidden flex flex-col">
        {/* Base glass layer with backdrop blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0EEE9]/[0.08] via-[#F0EEE9]/[0.04] to-[#F0EEE9]/[0.02] backdrop-blur-lg rounded-2xl border border-[#F0EEE9]/10 group-hover:border-[#FF7A2F]/40 transition-all duration-500" />
        
        {/* Orange tint layer - subtle by default, stronger on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A2F]/5 via-[#FF7A2F]/3 to-transparent rounded-2xl group-hover:from-[#FF7A2F]/15 group-hover:via-[#FF7A2F]/8 group-hover:to-transparent transition-all duration-500" />
        
        {/* Liquid glass highlight effect - top reflection */}
        <div className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
          style={{ 
            background: 'linear-gradient(180deg, rgba(240,238,233,0.2) 0%, rgba(240,238,233,0.05) 30%, transparent 60%)',
          }} 
        />
        
        {/* Orange glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A2F]/0 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(255,122,47,0.25) 0%, transparent 60%)',
          }}
        />
        
        {/* Inner shine effect */}
        <div className="absolute inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(240,238,233,0.3) 0%, transparent 50%)',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <CardContent
            tier={tier}
            lang={lang}
            onPrimary={onPrimary}
            isFeatured={isFeatured}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface CardContentProps {
  tier: PricingCopy["tiers"][number];
  lang: "fr" | "en";
  onPrimary: () => void;
  isFeatured: boolean;
  shouldReduceMotion: boolean;
}

function CardContent({
  tier,
  lang,
  onPrimary,
  isFeatured,
  shouldReduceMotion,
}: CardContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <h3 className="text-xl md:text-2xl sm:text-3xl font-bold text-[#F0EEE9] mb-2 md:mb-3 group-hover:text-[#FF7A2F] transition-colors duration-300 relative inline-block" style={{ color: '#F0EEE9' }}>
        {tier.title[lang]}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF7A2F] group-hover:w-full transition-all duration-300" />
      </h3>

      {/* Promise */}
      <p className="text-[#F0EEE9] text-sm md:text-base sm:text-lg mb-4 md:mb-6 opacity-90" style={{ color: '#F0EEE9' }}>
        {tier.promise[lang]}
      </p>

      {/* Duration & Price */}
      <div className="mb-4 md:mb-6 space-y-1 md:space-y-2">
        <div className="text-xs md:text-sm text-neutral-400 uppercase tracking-wide">
          {tier.duration[lang]}
        </div>
        <div className="text-xl md:text-2xl sm:text-3xl font-bold text-[#F0EEE9]" style={{ color: '#F0EEE9' }}>
          {tier.priceRange[lang]}
        </div>
      </div>

      {/* Deliverables */}
      <ul className="mb-4 md:mb-6 space-y-2 md:space-y-3 flex-grow min-h-0">
        {tier.deliverables[lang].map((item, idx) => (
          <li key={idx} className="flex items-start text-neutral-200">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-[#FF7A2F] mr-2 md:mr-3 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-xs md:text-sm sm:text-base">{item}</span>
          </li>
        ))}
      </ul>

      {/* Note */}
      {tier.note && (
        <p className="text-xs md:text-sm text-neutral-400 italic mb-4 md:mb-6">
          {tier.note[lang]}
        </p>
      )}

      {/* Button - toujours en bas grâce à mt-auto */}
      <div className="mt-auto pt-3 md:pt-4">
        <PrimaryButton
          onClick={onPrimary}
          label={tier.primaryCta[lang]}
          shouldReduceMotion={shouldReduceMotion}
          isFeatured={isFeatured}
        />
      </div>
    </div>
  );
}

interface PrimaryButtonProps {
  onClick: () => void;
  label: string;
  shouldReduceMotion: boolean;
  isFeatured: boolean;
}

function PrimaryButton({
  onClick,
  label,
  shouldReduceMotion,
  isFeatured,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer glass-pill-link glass-pill-link-standalone glass-pill-link-orange text-sm px-6 py-2.5 transition-colors duration-500 ease-in-out text-[#F0EEE9] inline-flex items-center w-full justify-center"
      aria-label={label}
    >
      {label}
      <svg
        className="ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </button>
  );
}

