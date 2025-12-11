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
  const [logoIsOverDark, setLogoIsOverDark] = useState(true);
  const [navPillIsOverDark, setNavPillIsOverDark] = useState(true);
  const [contactIsOverDark, setContactIsOverDark] = useState(true);
  const [langIsOverDark, setLangIsOverDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();
  const navbarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navPillRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLButtonElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Show navbar after 2 seconds (after video animation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  // Detect background color at a specific point - real-time detection
  const detectBackgroundAtPoint = (x: number, y: number): boolean => {
    // Hero section is dark, all other sections are light (#F0EEE9)
    const heroSection = document.getElementById("hero");
    if (!heroSection) return true; // Default to dark if hero not found

    const heroRect = heroSection.getBoundingClientRect();
    // Trigger transition 50px earlier - when hero bottom is 150px from top of viewport
    // This makes navbar switch to light mode before hero fully exits
    const threshold = 100; // Distance from top of viewport to trigger transition
    
    // Check if hero bottom is still above the threshold
    // If heroRect.bottom > threshold, we're still over the hero (dark)
    // If heroRect.bottom <= threshold, we've passed to light sections
    const isOverHero = heroRect.bottom > threshold;
    
    return isOverHero;
  };

  // Initial detection on mount - before refs are available
  useEffect(() => {
    // On initial load, we're always over the hero (dark background)
    // Set all states to dark immediately
    setLogoIsOverDark(true);
    setNavPillIsOverDark(true);
    setContactIsOverDark(true);
    setLangIsOverDark(true);
    setIsOverDark(true);
  }, []);

  // Real-time independent detection for each element
  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth, real-time updates
      requestAnimationFrame(() => {
        // Detect for logo
        if (logoRef.current) {
          const rect = logoRef.current.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const centerX = rect.left + rect.width / 2;
          const isDark = detectBackgroundAtPoint(centerX, centerY);
          setLogoIsOverDark(isDark);
        } else {
          // Fallback: use global state if ref not available
          const heroSection = document.getElementById("hero");
          if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            setLogoIsOverDark(heroRect.bottom > 150);
          }
        }

        // Detect for nav pill (center navigation)
        if (navPillRef.current) {
          const rect = navPillRef.current.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const centerX = rect.left + rect.width / 2;
          setNavPillIsOverDark(detectBackgroundAtPoint(centerX, centerY));
        } else {
          // Fallback
          const heroSection = document.getElementById("hero");
          if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            setNavPillIsOverDark(heroRect.bottom > 150);
          }
        }

        // Detect for contact button
        if (contactRef.current) {
          const rect = contactRef.current.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const centerX = rect.left + rect.width / 2;
          setContactIsOverDark(detectBackgroundAtPoint(centerX, centerY));
        } else {
          // Fallback
          const heroSection = document.getElementById("hero");
          if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            setContactIsOverDark(heroRect.bottom > 150);
          }
        }

        // Detect for language switcher
        if (langRef.current) {
          const rect = langRef.current.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const centerX = rect.left + rect.width / 2;
          setLangIsOverDark(detectBackgroundAtPoint(centerX, centerY));
        } else {
          // Fallback
          const heroSection = document.getElementById("hero");
          if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            setLangIsOverDark(heroRect.bottom > 150);
          }
        }

        // Keep global state for mobile navbar
        if (navbarRef.current) {
          const rect = navbarRef.current.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const centerX = rect.left + rect.width / 2;
          setIsOverDark(detectBackgroundAtPoint(centerX, centerY));
        } else {
          // Fallback
          const heroSection = document.getElementById("hero");
          if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            setIsOverDark(heroRect.bottom > 150);
          }
        }
      });
    };

    // Initial check immediately to set correct state on load
    handleScroll();
    
    // Also check after a short delay to ensure refs are attached
    const initialTimeout = setTimeout(() => {
      handleScroll();
    }, 100);
    
    // Check again after navbar becomes visible (after 2 seconds)
    const visibleTimeout = setTimeout(() => {
      handleScroll();
    }, 2100);

    // Listen to scroll with improved throttling to prevent jank
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Only update if scroll position actually changed significantly
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY);
          
          // Only process if scroll delta is meaningful (prevents micro-movements)
          if (scrollDelta > 0.5 || currentScrollY === 0) {
            handleScroll();
            lastScrollY = currentScrollY;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Also listen to Lenis scroll if available - with throttling
    if (lenis) {
      lenis.on('scroll', throttledScroll);
    }
    
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(visibleTimeout);
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleScroll);
      if (lenis) {
        lenis.off('scroll', throttledScroll);
      }
    };
  }, [lenis]);

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
        initial={{ opacity: 0, y: -100 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : -100 
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.4, 0, 0.2, 1] as const,
          delay: 0
        }}
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
            <a ref={logoRef} href="#" className="flex-shrink-0 relative z-10 group cursor-pointer">
              <div className="relative h-7 md:h-8" style={{ width: '160px' }}>
                {/* Dark logo - visible when OUT of hero section OR menu is open */}
                <Image
                  src="/logos/studiox-logo-dark-colored.svg"
                  alt="Studi.0x"
                  width={160}
                  height={28}
                  className={`h-7 md:h-8 w-auto absolute top-0 left-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-opacity group-hover:opacity-0 ${
                    logoIsOverDark && !isMenuOpen ? "opacity-0" : "opacity-100"
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
                  className={`h-7 md:h-8 w-auto absolute top-0 left-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-opacity group-hover:opacity-0 ${
                    logoIsOverDark && !isMenuOpen ? "opacity-100" : "opacity-0"
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
              <div ref={navPillRef} className={`glass-pill ${navPillIsOverDark ? 'glass-pill-dark' : 'glass-pill-light'}`}>
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
                      className={`glass-pill-link ${navPillIsOverDark ? 'text-[#F0EEE9]' : ''} ${activeLink === link.href ? "active" : ""} ${hoveredLink === link.href ? "hovered" : ""}`}
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
                <div ref={langRef} className="lang-switch-minimal flex items-center gap-2">
                  <button
                    onClick={() => onLanguageChange("en")}
                    className={`cursor-pointer font-heading text-sm font-semibold tracking-wide transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-auto ${
                      language === "en" 
                        ? langIsOverDark ? "text-[#F0EEE9]" : "text-[var(--color-charcoal)]"
                        : langIsOverDark ? "text-[#F0EEE9]/50" : "text-[var(--color-charcoal)]/40"
                    }`}
                    style={{ transform: 'translateZ(0)' }}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <span className={`text-sm transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-auto ${langIsOverDark ? "text-[#F0EEE9]/30" : "text-[var(--color-charcoal)]/20"}`} style={{ transform: 'translateZ(0)' }}>|</span>
            <button
              onClick={() => onLanguageChange("fr")}
                    className={`cursor-pointer font-heading text-sm font-semibold tracking-wide transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-auto ${
                language === "fr"
                        ? langIsOverDark ? "text-[#F0EEE9]" : "text-[var(--color-charcoal)]"
                        : langIsOverDark ? "text-[#F0EEE9]/50" : "text-[var(--color-charcoal)]/40"
              }`}
                    style={{ transform: 'translateZ(0)' }}
                    aria-label="Passer en français"
            >
              FR
            </button>
                </div>

                <button
                  ref={contactRef}
                  onClick={scrollToContact}
                  className={`cursor-pointer glass-pill-link glass-pill-link-standalone text-sm px-6 py-2.5 ${
                    contactIsOverDark ? 'glass-pill-link-standalone-dark' : 'glass-pill-link-standalone-light'
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
