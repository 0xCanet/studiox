"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLenis } from "lenis/react";

export interface NavbarMessages {
  logo: string;
  links: {
    services: string;
    work: string;
    about: string;
    letsTalk: string;
  };
    contact: string;
}

interface NavbarProps {
  language: "en" | "fr";
  onLanguageChange: (lang: "en" | "fr") => void;
  messages: NavbarMessages;
}

export function Navbar({ language, onLanguageChange, messages }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isOverDark, setIsOverDark] = useState(true); // Start as true since hero is dark (white logo/EN/FR)
  const [isMobile, setIsMobile] = useState(false);
  const lenis = useLenis();
  const navbarRef = useRef<HTMLElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Detect if navbar is still in hero section (dark background)
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (!heroSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      
      // Navbar is in hero section if hero bottom is still visible
      // In hero: isOverDark = true → white logo, white EN/FR
      // Out of hero: isOverDark = false → black logo, black EN/FR
      const isInHero = heroRect.bottom > 0;
      
      setIsOverDark(isInHero);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Scroll spy - detect which section is in view
  useEffect(() => {
    const sections = ["services", "work", "about", "contact"];
    
    const updateActiveLink = () => {
      const scrollY = window.scrollY;
      const offset = 200; // Offset pour déclencher avant le haut de la section
      
      // Si on est tout en haut, pas de section active
      if (scrollY < 100) {
        setActiveLink(null);
        return;
      }

      // Trouver la section la plus proche du haut de la viewport
      let currentSection = null;
      let maxTop = -Infinity;

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = scrollY + rect.top;
        
        // La section est active si son haut est au-dessus du point de déclenchement
        // et qu'elle est la plus haute parmi celles qui remplissent cette condition
        if (elementTop <= scrollY + offset && elementTop > maxTop) {
          maxTop = elementTop;
          currentSection = sectionId;
        }
      });

      if (currentSection) {
        setActiveLink(`#${currentSection}`);
      } else {
        // Si aucune section n'est trouvée, garder la dernière connue ou null
        setActiveLink(null);
      }
    };

    // Initial check
    updateActiveLink();

    // Listen to scroll events with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveLink, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveLink);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToContact = () => {
    setIsMenuOpen(false);
    lenis?.scrollTo("#contact", {
      offset: -100,
      duration: 1.5,
    });
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setActiveLink(href);
    lenis?.scrollTo(href, {
      offset: -100,
      duration: 1.5,
    });
  };

  const navLinks = [
    { href: "#services", label: messages.links.services },
    { href: "#work", label: messages.links.work },
    { href: "#about", label: messages.links.about },
    { href: "#contact", label: messages.links.letsTalk },
  ];

  return (
    <>
      <motion.nav
        ref={navbarRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        className={`fixed top-[30px] md:top-[73px] left-[30px] md:left-[73px] right-[30px] md:right-[73px] z-[100] ${
          isMobile ? 'glass-pill' : ''
        } ${isMobile && isOverDark ? 'glass-pill-dark' : isMobile ? 'glass-pill-light' : ''}`}
        style={{ 
          willChange: 'auto', 
          maxWidth: 'calc(100% - 60px)',
          position: 'fixed',
          top: isMobile ? '30px' : undefined,
          left: isMobile ? '30px' : undefined,
          right: isMobile ? '30px' : undefined
        }}
      >
        <div className={`${isMobile ? '' : 'pb-4'}`}>
          <div className="flex items-center justify-between w-full">
            {/* Logo - switches color based on background */}
            <a href="#" className="flex-shrink-0 relative z-10 group cursor-pointer">
              <div className="relative h-7 md:h-8" style={{ width: '160px' }}>
                {/* Dark logo - visible when OUT of hero section OR menu is open */}
                <Image
                  src="/logos/studiox-logo-dark-colored.svg"
                  alt="Studi.0x"
                  width={160}
                  height={28}
                  className={`h-7 md:h-8 w-auto absolute top-0 left-0 transition-all duration-500 ease-in-out will-change-opacity group-hover:opacity-0 ${
                    isOverDark && !isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ transform: 'translateZ(0)', width: 'auto' }}
                  priority
                />
                {/* Light logo - visible when IN hero section (default white) AND menu is closed */}
                <Image
                  src="/logos/studiox-logo-light-colored.svg"
                  alt="Studi.0x"
                  width={160}
                  height={28}
                  className={`h-7 md:h-8 w-auto absolute top-0 left-0 transition-all duration-500 ease-in-out will-change-opacity group-hover:opacity-0 ${
                    isOverDark && !isMenuOpen ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transform: 'translateZ(0)', width: 'auto' }}
                  priority
                />
                {/* Orange logo overlay - appears on hover */}
                <Image
                  src="/logos/studiox-logo-dark-colored.svg"
                  alt="Studi.0x"
                  width={160}
                  height={28}
                  className="h-7 md:h-8 w-auto absolute top-0 left-0 transition-opacity duration-500 ease-in-out will-change-opacity opacity-0 group-hover:opacity-100"
                  style={{ 
                    transform: 'translateZ(0)',
                    width: 'auto',
                    filter: 'brightness(0) saturate(100%) invert(48%) sepia(100%) saturate(2000%) hue-rotate(0deg) brightness(1) contrast(1)'
                  }}
                  priority
                />
              </div>
            </a>

            {/* Center - Glass Pill Navigation (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
              <div className={`glass-pill ${isOverDark ? 'glass-pill-dark' : 'glass-pill-light'}`}>
                <div className="flex items-center gap-1.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={`glass-pill-link ${isOverDark ? 'text-[#F0EEE9]' : ''} ${activeLink === link.href ? "active" : ""} ${hoveredLink === link.href ? "hovered" : ""}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
        </div>

            {/* Right Side - Desktop: Lang + Contact | Mobile: Hamburger */}
            <div className="flex items-center gap-3">
              {/* Desktop: Language Switch + Contact */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="lang-switch-minimal flex items-center gap-2">
                  <button
                    onClick={() => onLanguageChange("en")}
                    className={`cursor-pointer font-heading text-sm font-semibold tracking-wide transition-colors duration-500 ease-in-out will-change-auto ${
                      language === "en" 
                        ? isOverDark ? "text-[#F0EEE9]" : "text-[var(--color-charcoal)]"
                        : isOverDark ? "text-[#F0EEE9]/50" : "text-[var(--color-charcoal)]/40"
                    }`}
                    style={{ transform: 'translateZ(0)' }}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <span className={`text-sm transition-colors duration-500 ease-in-out will-change-auto ${isOverDark ? "text-[#F0EEE9]/30" : "text-[var(--color-charcoal)]/20"}`} style={{ transform: 'translateZ(0)' }}>|</span>
            <button
              onClick={() => onLanguageChange("fr")}
                    className={`cursor-pointer font-heading text-sm font-semibold tracking-wide transition-colors duration-500 ease-in-out will-change-auto ${
                language === "fr"
                        ? isOverDark ? "text-[#F0EEE9]" : "text-[var(--color-charcoal)]"
                        : isOverDark ? "text-[#F0EEE9]/50" : "text-[var(--color-charcoal)]/40"
              }`}
                    style={{ transform: 'translateZ(0)' }}
                    aria-label="Passer en français"
            >
              FR
            </button>
                </div>

                <button
                  onClick={scrollToContact}
                  className={`cursor-pointer glass-pill-link glass-pill-link-standalone text-sm px-6 py-2.5 transition-colors duration-500 ease-in-out ${
                    isOverDark ? 'glass-pill-link-standalone-dark' : 'glass-pill-link-standalone-light'
                  } ${activeLink === "#contact" ? "active" : ""}`}
                >
                  {messages.contact}
                </button>
              </div>

              {/* Mobile: Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <motion.span
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 8 : 0,
                    }}
                    className={`block h-0.5 w-full origin-center transition-colors duration-500 ease-in-out ${
                      isMenuOpen ? "bg-[var(--color-charcoal)]" : isOverDark ? "bg-[#F0EEE9]" : "bg-[var(--color-charcoal)]"
                    }`}
                  />
                  <motion.span
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      scaleX: isMenuOpen ? 0 : 1,
                    }}
                    className={`block h-0.5 w-full transition-colors duration-500 ease-in-out ${
                      isMenuOpen ? "bg-[var(--color-charcoal)]" : isOverDark ? "bg-[#F0EEE9]" : "bg-[var(--color-charcoal)]"
              }`}
                  />
                  <motion.span
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? -8 : 0,
                    }}
                    className={`block h-0.5 w-full origin-center transition-colors duration-500 ease-in-out ${
                      isMenuOpen ? "bg-[var(--color-charcoal)]" : isOverDark ? "bg-[#F0EEE9]" : "bg-[var(--color-charcoal)]"
                    }`}
                  />
                </div>
            </button>
          </div>
        </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Page Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-cream)] lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 px-6">
              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="mobile-nav-link text-left"
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Contact in mobile menu */}
                <motion.button
                  onClick={scrollToContact}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                  className="mobile-nav-link text-left text-[var(--color-accent)]"
                >
                  {messages.contact}
                </motion.button>
      </nav>

              {/* Bottom: Language Switch */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pb-12"
              >
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => onLanguageChange("en")}
                    className={`text-lg font-heading font-medium transition-colors ${
                      language === "en"
                        ? "text-[var(--color-charcoal)]"
                        : "text-[var(--color-charcoal)]/40"
                    }`}
                  >
                    English
                  </button>
                  <span className="text-[var(--color-charcoal)]/20">|</span>
                  <button
                    onClick={() => onLanguageChange("fr")}
                    className={`text-lg font-heading font-medium transition-colors ${
                      language === "fr"
                        ? "text-[var(--color-charcoal)]"
                        : "text-[var(--color-charcoal)]/40"
                    }`}
                  >
                    Français
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
