"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

export interface HeroMessages {
  tagline: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

interface HeroProps {
  messages: HeroMessages;
}

export function Hero({ messages }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Detect mobile - improved detection for real devices
  useEffect(() => {
    const checkMobile = () => {
      // Check both width and touch capability for better mobile detection
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(isSmallScreen && isTouchDevice);
    };
    
    checkMobile();
    
    // Use matchMedia for better performance and accuracy
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const handleChange = () => checkMobile();
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Get scroll position from Lenis - ONLY apply parallax on mobile
  useLenis(({ scroll }) => {
    // Only calculate parallax if on mobile
    if (!isMobile) {
      setHeroScrollY(0);
      return;
    }
    
    // Calculate hero-specific scroll offset (only when hero is visible)
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Strict condition: only apply parallax when hero section is actively in viewport
      // Add a small buffer to ensure parallax stops before section leaves viewport
      const buffer = 10; // 10px buffer
      
      if (rect.bottom <= buffer || rect.top >= viewportHeight - buffer) {
        // Hero section is out of view (with buffer) - completely reset parallax
        setHeroScrollY(0);
      } else if (rect.top < viewportHeight && rect.bottom > 0) {
        // Hero section is in viewport - calculate parallax
        // Calculate scroll progress within hero section (0 to 1)
        // When section top is at viewport top: progress = 0
        // When section bottom reaches viewport top: progress = 1
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
        
        // Convert to scroll offset, but limit it to prevent overflow
        // Max parallax: 200px for video, 150px for text
        const maxParallax = 200;
        setHeroScrollY(scrollProgress * maxParallax);
      } else {
        // Fallback: reset parallax
        setHeroScrollY(0);
      }
    } else {
      // Section ref not available - reset parallax
      setHeroScrollY(0);
    }
  }, [isMobile]);


  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="relative h-screen bg-[var(--color-cream)] p-[20px] md:p-[50px] overflow-hidden" 
      style={{ 
        width: '100vw', 
        marginRight: 0, 
        paddingRight: 0, 
        height: isMobile ? '100dvh' : '100vh',
        minHeight: isMobile ? '100dvh' : '100vh',
        transform: 'none',
        position: 'relative'
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full rounded-3xl md:rounded-[32px] overflow-hidden bg-[var(--color-charcoal)]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          width: '100%', 
          maxWidth: '100%',
          height: '100%',
          transform: 'none',
          position: 'relative'
        }}
      >
        {/* Video Background - Grayscale base */}
        <div 
          ref={videoRef}
          className="absolute inset-0 w-full h-full"
          style={{
            filter: isMobile ? "blur(0.5px)" : "grayscale(100%) blur(0.5px)",
            WebkitFilter: isMobile ? "blur(0.5px)" : "grayscale(100%) blur(0.5px)",
            transform: isMobile && heroScrollY > 0 ? `translateY(${heroScrollY * 0.4}px) scale(${1 + heroScrollY * 0.0002})` : 'none',
            willChange: isMobile && heroScrollY > 0 ? 'transform' : 'auto',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'auto'
            }}
          >
            <source src="/src/video_01.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Color reveal layer - follows mouse with premium effect - fixed to video */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 5,
            transform: isMobile && heroScrollY > 0 ? `translateY(${heroScrollY * 0.4}px) scale(${1 + heroScrollY * 0.0002})` : 'none',
            maskImage: isHovering && !isMobile
              ? `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 25%, rgba(0,0,0,0.98) 30%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)`
              : "transparent",
            WebkitMaskImage: isHovering && !isMobile
              ? `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 25%, rgba(0,0,0,0.98) 30%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)`
              : "transparent",
            transition: "mask-image 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), -webkit-mask-image 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: isMobile && heroScrollY > 0 ? "mask-image, -webkit-mask-image, transform" : "mask-image, -webkit-mask-image"
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'auto',
              filter: 'blur(0.5px)',
              WebkitFilter: 'blur(0.5px)'
            }}
          >
            <source src="/src/video_01.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Premium glow effect around mouse - multiple layers for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-7"
          style={{
            background: isHovering
              ? `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.02) 50%, transparent 75%, transparent 100%)`
              : "transparent",
            transition: "opacity 0.25s ease-out, background 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            filter: "blur(30px)",
            willChange: "background",
            transform: isMobile ? 'none' : undefined,
          }}
        />
        
        {/* Subtle inner glow for premium feel */}
        <div
          className="absolute inset-0 pointer-events-none z-8"
          style={{
            background: isHovering
              ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.03) 60%, transparent 85%, transparent 100%)`
              : "transparent",
            transition: "opacity 0.2s ease-out, background 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            filter: "blur(15px)",
            mixBlendMode: "soft-light",
            willChange: "background",
            transform: isMobile ? 'none' : undefined,
          }}
        />

        {/* Gradient Overlay for text readability - fixed position, no parallax */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-[var(--color-charcoal)]/30 to-[var(--color-charcoal)]/10 z-10"
          style={{
            transform: 'none',
            willChange: 'auto'
          }}
        />

        {/* Content */}
        <div 
          ref={textRef}
          className="absolute inset-0 flex flex-col justify-end z-20"
          style={{
            paddingLeft: isMobile ? '24px' : '48px',
            paddingRight: isMobile ? '24px' : '48px',
            paddingTop: isMobile ? '20px' : '48px',
            paddingBottom: isMobile ? 'calc(60px + env(safe-area-inset-bottom, 0px))' : '64px',
            transform: isMobile && heroScrollY > 0 ? `translateY(${-heroScrollY * 0.6}px)` : 'none',
            willChange: isMobile && heroScrollY > 0 ? 'transform' : 'auto',
          }}
        >
          <div className="max-w-4xl">
            {/* Micro-tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="font-body text-xs tracking-[0.15em] uppercase text-white/70">
                {messages.tagline.split(" • ").map((item, i, arr) => (
                  <span key={i}>
                    {item}
                    {i < arr.length - 1 && (
                      <span className="text-[var(--color-accent)] mx-2">•</span>
                    )}
                  </span>
                ))}
              </span>
            </motion.div>

            {/* H1 - White text with orange dots */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white text-balance mb-4 md:mb-6"
            >
              <TextWithOrangeDots>
                {messages.title}
              </TextWithOrangeDots>
            </motion.h1>

            {/* H2 / Subtitle - White text with orange dots */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-body text-white/80 max-w-2xl mb-8 md:mb-10"
            >
              <TextWithOrangeDots>
                {messages.subtitle}
              </TextWithOrangeDots>
            </motion.h2>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#work" className="btn bg-white text-[var(--color-charcoal)] hover:bg-[var(--color-accent)] hover:text-white">
                {messages.primaryCta.replace(" →", "")}
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
              </a>
              <a href="#about" className="btn btn-ghost">
                {messages.secondaryCta}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
