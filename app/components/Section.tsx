import { ReactNode, forwardRef } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  variant?: "base" | "hero" | "dense";
  background?: "bg" | "surface" | "surface-2" | "transparent";
  className?: string;
}

/**
 * Section - Standardized section with consistent vertical padding
 * 
 * Variants:
 * - base: py-10 md:py-12 lg:py-16 (standard sections)
 * - hero: py-14 md:py-18 lg:py-24 (hero sections)
 * - dense: py-8 md:py-10 (compact sections)
 * 
 * Usage:
 * ```tsx
 * <Section id="about" variant="base">
 *   <Container>Content</Container>
 * </Section>
 * ```
 */
export const Section = forwardRef<HTMLElement, SectionProps>(({ 
  children, 
  id,
  variant = "base",
  background = "bg",
  className = ""
}, ref) => {
  const paddingClass = {
    base: "py-10 md:py-12 lg:py-16",
    hero: "py-14 md:py-18 lg:py-24",
    dense: "py-8 md:py-10",
  }[variant];

  const bgClass = {
    bg: "bg-bg",
    surface: "bg-surface",
    "surface-2": "bg-surface-2",
    transparent: "",
  }[background];

  return (
    <section 
      ref={ref}
      id={id}
      className={`${paddingClass} ${bgClass} ${className}`}
    >
      {children}
    </section>
  );
});

Section.displayName = "Section";
