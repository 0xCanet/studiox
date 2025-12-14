"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { TypewriterText } from "./TypewriterText";
import { LoadingBarTags } from "./LoadingBarTags";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

// Special component for French hero title with specific formatting
function FrenchHeroTitle() {
  const [revealedLength, setRevealedLength] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const fullText = "Vous méritez une image à la hauteur.";
  const firstPart = "Vous méritez";
  const secondPart = " une image à la ";
  const highlightWord = "hauteur";
  const highlightStart = firstPart.length + secondPart.length;

  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setRevealedLength(currentIndex + 1);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (isComplete) {
      const hideTimeout = setTimeout(() => {
        setShowCursor(false);
      }, 1000);
      return () => clearTimeout(hideTimeout);
    }

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [isComplete]);

  return (
    <h1 className="text-[#F0EEE9] mb-4 md:mb-6 hero-h1" style={{ position: "relative" }}>
      {/* Hidden text to reserve space */}
      <span 
        aria-hidden="true" 
        style={{ 
          visibility: "hidden",
          display: "block",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          height: "auto",
        }}
      >
        <TextWithOrangeDots as="span">{fullText}</TextWithOrangeDots>
      </span>
      {/* Visible text */}
      <span 
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      >
        {revealedLength > 0 && (
          <span>
            <TextWithOrangeDots as="span">
              {fullText.slice(0, Math.min(revealedLength, firstPart.length))}
            </TextWithOrangeDots>
            {revealedLength > firstPart.length && (
              <>
                <TextWithOrangeDots as="span">
                  {secondPart.slice(0, Math.min(revealedLength - firstPart.length, secondPart.length))}
                </TextWithOrangeDots>
                {revealedLength > highlightStart && (
                  <span className="text-[#FF7A30] underline">
                    {highlightWord.slice(0, Math.min(revealedLength - highlightStart, highlightWord.length))}
                    {revealedLength >= highlightStart + highlightWord.length && (
                      <span>.</span>
                    )}
                  </span>
                )}
              </>
            )}
          </span>
        )}
        {showCursor && (
          <span
            className="inline-block bg-[#F0EEE9] ml-[2px] align-middle typewriter-cursor"
            style={{
              width: "2px",
              height: "1em",
              borderRadius: "2px",
            }}
          />
        )}
      </span>
    </h1>
  );
}

export interface HeroMessages {
  tagline: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

interface HeroProps {
  messages: HeroMessages;
  onContactClick?: () => void;
}

export function Hero({ messages, onContactClick }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [browserBarHeight, setBrowserBarHeight] = useState(0);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoZoom, setVideoZoom] = useState(1.1); // Start zoomed in, then zoom out
  const [containerZoom, setContainerZoom] = useState(1.15); // Container starts more zoomed, then zooms out
  const [animationPhase, setAnimationPhase] = useState<"video" | "navbar" | "content">("video");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Calculate browser bar height (address bar, navigation bar, etc.)
  useEffect(() => {
    const calculateBrowserBarHeight = () => {
      if (!isMobile) {
        setBrowserBarHeight(0);
        return;
      }

      // Use Visual Viewport API if available (most accurate)
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const barHeight = windowHeight - viewportHeight;
        setBrowserBarHeight(Math.max(0, barHeight));
      } else {
        // Fallback: calculate difference between outer and inner height
        // This is less accurate but works on older browsers
        const windowHeight = window.innerHeight;
        const screenHeight = window.screen.height;
        // Estimate: usually browser bars take 10-15% of screen height on mobile
        const estimatedBarHeight = screenHeight > windowHeight ? (screenHeight - windowHeight) : 0;
        setBrowserBarHeight(estimatedBarHeight);
      }
    };

    calculateBrowserBarHeight();

    // Recalculate on resize and orientation change
    window.addEventListener('resize', calculateBrowserBarHeight);
    window.addEventListener('orientationchange', calculateBrowserBarHeight);
    
    // Visual Viewport API events (more accurate)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', calculateBrowserBarHeight);
      window.visualViewport.addEventListener('scroll', calculateBrowserBarHeight);
    }

    return () => {
      window.removeEventListener('resize', calculateBrowserBarHeight);
      window.removeEventListener('orientationchange', calculateBrowserBarHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', calculateBrowserBarHeight);
        window.visualViewport.removeEventListener('scroll', calculateBrowserBarHeight);
      }
    };
  }, [isMobile]);

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

  // Animation sequence: video (2s) -> navbar -> content
  useEffect(() => {
    // Hide scrollbar initially - add class immediately
    const htmlElement = document.documentElement;
    htmlElement.classList.add('scrollbar-hidden');
    
    // Phase 1: Video appears and zooms out over 2 seconds
    setVideoVisible(true);
    
    // Container zoom out animation over 2 seconds (more dramatic)
    const containerZoomStartTime = Date.now();
    const containerZoomDuration = 2000;
    const containerStartZoom = 1.15;
    const containerEndZoom = 1.0;
    
    const containerZoomInterval = setInterval(() => {
      const elapsed = Date.now() - containerZoomStartTime;
      const progress = Math.min(elapsed / containerZoomDuration, 1);
      // Use easeOut cubic for smooth, dynamic animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentContainerZoom = containerStartZoom - (containerStartZoom - containerEndZoom) * easedProgress;
      setContainerZoom(currentContainerZoom);
      
      if (progress >= 1) {
        clearInterval(containerZoomInterval);
      }
    }, 16); // ~60fps
    
    // Video zoom out animation over 2 seconds
    const zoomStartTime = Date.now();
    const zoomDuration = 2000;
    const startZoom = 1.1;
    const endZoom = 1.0;
    
    const zoomInterval = setInterval(() => {
      const elapsed = Date.now() - zoomStartTime;
      const progress = Math.min(elapsed / zoomDuration, 1);
      // Use easeOut cubic for smooth, dynamic animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentZoom = startZoom - (startZoom - endZoom) * easedProgress;
      setVideoZoom(currentZoom);
      
      if (progress >= 1) {
        clearInterval(zoomInterval);
      }
    }, 16); // ~60fps
    
    // Show scrollbar after 2 seconds
    const scrollbarTimeout = setTimeout(() => {
      const htmlElement = document.documentElement;
      htmlElement.classList.remove('scrollbar-hidden');
    }, 2000);
    
    // Phase 2: After 2 seconds, navbar appears
    const navbarTimeout = setTimeout(() => {
      setAnimationPhase("navbar");
    }, 2000);

    // Phase 3: Content starts appearing (slightly after navbar)
    const contentTimeout = setTimeout(() => {
      setAnimationPhase("content");
    }, 2200);

    return () => {
      clearInterval(containerZoomInterval);
      clearInterval(zoomInterval);
      clearTimeout(scrollbarTimeout);
      clearTimeout(navbarTimeout);
      clearTimeout(contentTimeout);
      // Cleanup: remove class on unmount
      document.documentElement.classList.remove('scrollbar-hidden');
    };
  }, []);

  // Get scroll position from Lenis - Apply parallax on both mobile and desktop
  // Use ref to store previous value for smooth interpolation
  const prevHeroScrollYRef = useRef(0);
  
  // Memoize tagline tags and duration calculation
  const taglineTags = useMemo(() => messages.tagline.split(" • "), [messages.tagline]);
  const taglineDuration = useMemo(() => {
    // Calculate total duration: 
    // Delay before content phase: 2200ms (2s video + 200ms navbar)
    // H1: messages.title.length * 30ms
    // Delay between H1 and H2: 200ms
    // H2: messages.subtitle.length * 25ms
    return 2200 + (messages.title.length * 30) + 200 + (messages.subtitle.length * 25);
  }, [messages.title.length, messages.subtitle.length]);
  
  useLenis(({ scroll }) => {
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      // Calculate hero-specific scroll offset (only when hero is visible)
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Strict condition: only apply parallax when hero section is actively in viewport
        // Add a small buffer to ensure parallax stops before section leaves viewport
        const buffer = 10; // 10px buffer
        
        let newHeroScrollY = 0;
        
        if (rect.bottom <= buffer || rect.top >= viewportHeight - buffer) {
          // Hero section is out of view (with buffer) - smoothly reset parallax
          newHeroScrollY = 0;
        } else if (rect.top < viewportHeight && rect.bottom > 0) {
          // Hero section is in viewport - calculate parallax
          // Calculate scroll progress within hero section (0 to 1)
          // When section top is at viewport top: progress = 0
          // When section bottom reaches viewport top: progress = 1
          const scrollProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
          
          // Convert to scroll offset, but limit it to prevent overflow
          // Max parallax: 200px for video, 150px for text
          const maxParallax = 200;
          newHeroScrollY = scrollProgress * maxParallax;
        }
        
        // Smooth interpolation to prevent jank
        const currentValue = prevHeroScrollYRef.current;
        const targetValue = newHeroScrollY;
        const diff = targetValue - currentValue;
        
        // Only update if difference is significant (prevents micro-adjustments)
        if (Math.abs(diff) > 0.1) {
          // Different interpolation speed for scrolling down vs up
          // Faster when scrolling down to prevent lag, smoother when scrolling up
          const interpolationSpeed = diff > 0 ? 0.25 : 0.15; // 25% when going down, 15% when going up
          const smoothedValue = currentValue + diff * interpolationSpeed;
          prevHeroScrollYRef.current = smoothedValue;
          setHeroScrollY(smoothedValue);
        } else {
          // Snap to target if very close
          prevHeroScrollYRef.current = targetValue;
          setHeroScrollY(targetValue);
        }
      } else {
        // Section ref not available - smoothly reset parallax
        const currentValue = prevHeroScrollYRef.current;
        if (Math.abs(currentValue) > 0.1) {
          const smoothedValue = currentValue * 0.9; // Smooth decay
          prevHeroScrollYRef.current = smoothedValue;
          setHeroScrollY(smoothedValue);
        } else {
          prevHeroScrollYRef.current = 0;
          setHeroScrollY(0);
        }
      }
    });
  }, []);


  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="relative h-screen bg-[var(--color-cream)] pt-5 px-5 pb-5 md:pt-6 md:px-12 md:pb-12" 
      style={{ 
        width: '100%', 
        maxWidth: '100%',
        marginRight: 0, 
        height: isMobile ? '100dvh' : '102vh',
        minHeight: isMobile ? '100dvh' : '102vh',
        transform: 'none',
        position: 'relative',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full rounded-b-3xl md:rounded-[32px] bg-[var(--color-charcoal)] md:mt-6 md:ml-6 md:mr-6 md:mb-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          width: isMobile ? '100%' : 'calc(100% - 48px)',
          maxWidth: isMobile ? '100%' : 'calc(100% - 48px)',
          height: isMobile ? '100%' : 'calc(100% - 24px)',
          minHeight: isMobile ? '100%' : 'calc(100% - 24px)',
          transform: `scale(${containerZoom})`,
          transformOrigin: 'center center',
          position: 'relative',
          boxSizing: 'border-box',
          willChange: 'transform',
          transition: 'opacity 0.8s ease-out',
          opacity: videoVisible ? 1 : 0
        }}
      >
        {/* Inner wrapper with overflow-hidden for video content */}
        <div 
          className="absolute inset-0 rounded-b-3xl md:rounded-[32px] overflow-hidden"
          style={{
            borderRadius: isMobile ? '0 0 1.5rem 1.5rem' : '32px'
          }}
        >
        {/* Video Background - Grayscale base */}
        <motion.div 
          ref={videoRef}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: videoVisible ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            filter: isMobile ? "blur(0.5px)" : "grayscale(100%) blur(0.5px)",
            WebkitFilter: isMobile ? "blur(0.5px)" : "grayscale(100%) blur(0.5px)",
            transform: heroScrollY > 0 
              ? `translateY(${heroScrollY * 0.4}px) scale(${videoZoom * (1 + heroScrollY * 0.0002)})`
              : `scale(${videoZoom})`,
            transformOrigin: "center center",
            willChange: 'transform, opacity',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'auto'
            }}
            aria-label="Hero background video"
          >
            <source src="/src/video_01.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Color reveal layer - follows mouse with premium effect - fixed to video */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: videoVisible ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            transform: heroScrollY > 0 
              ? `translateY(${heroScrollY * 0.4}px) scale(${videoZoom * (1 + heroScrollY * 0.0002)})`
              : `scale(${videoZoom})`,
            transformOrigin: "center center",
            maskImage: isHovering && !isMobile
              ? `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 25%, rgba(0,0,0,0.98) 30%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)`
              : "transparent",
            WebkitMaskImage: isHovering && !isMobile
              ? `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 25%, rgba(0,0,0,0.98) 30%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)`
              : "transparent",
            transition: "mask-image 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), -webkit-mask-image 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: heroScrollY > 0 ? "mask-image, -webkit-mask-image, transform" : "mask-image, -webkit-mask-image"
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'auto'
            }}
            aria-label="Hero background video"
          >
            <source src="/src/video_01.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Premium glow effect around mouse - multiple layers for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-7"
          style={{
            background: isHovering
              ? `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, rgba(240,238,233,0.08) 0%, rgba(240,238,233,0.05) 25%, rgba(240,238,233,0.02) 50%, transparent 75%, transparent 100%)`
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
              ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(240,238,233,0.15) 0%, rgba(240,238,233,0.08) 30%, rgba(240,238,233,0.03) 60%, transparent 85%, transparent 100%)`
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
        </div>

        {/* Content */}
        <div 
          ref={textRef}
          className="absolute inset-0 flex flex-col justify-end z-20"
          style={{
            paddingLeft: isMobile ? '20px' : '48px',
            paddingRight: isMobile ? '20px' : '48px',
            paddingTop: isMobile ? '32px' : '48px',
            paddingBottom: isMobile ? `calc(80px + env(safe-area-inset-bottom, 0px))` : '48px',
            transform: isMobile 
              ? `translateY(${-browserBarHeight - 10 - (heroScrollY > 0 ? heroScrollY * 0.6 : 0)}px)`
              : heroScrollY > 0
                ? `translateY(${-32 - (heroScrollY * 0.6)}px)`
                : 'translateY(-32px)',
            willChange: heroScrollY > 0 ? 'transform' : 'auto',
            overflowX: 'hidden',
            maxWidth: '100%'
          }}
        >
          <div className={isMobile ? 'w-full max-w-full' : 'max-w-6xl'}>
            {/* Micro-tagline with letter-by-letter animation during video */}
            <div className="mb-6" style={{ 
              maxWidth: '100%',
              overflow: 'hidden',
              wordBreak: 'break-word'
            }}>
              <LoadingBarTags
                tags={taglineTags}
                duration={taglineDuration}
                delay={0}
                className="w-full"
              />
            </div>

            {/* H1 - White text with orange dots - Typewriter effect */}
            {animationPhase === "content" && messages.title.includes("Vous méritez") ? (
              <FrenchHeroTitle />
            ) : animationPhase === "content" ? (
              <TypewriterText
                text={messages.title}
                speed={30}
                delay={0}
                as="h1"
                className="text-[#F0EEE9] text-balance mb-4 md:mb-6 hero-h1"
              />
            ) : null}

            {/* H2 / Subtitle - White text with orange dots - Typewriter effect */}
            {animationPhase === "content" && (
              <TypewriterText
                text={messages.subtitle}
                speed={25}
                delay={messages.title.length * 30 + 200}
                as="h2"
                className="font-body text-[#F0EEE9]/80 max-w-5xl mb-8 md:mb-10 hero-h2"
              />
            )}

            {/* CTAs */}
            {animationPhase === "content" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: (messages.title.length * 30 + messages.subtitle.length * 25) / 1000 + 0.5
                }}
                className="flex flex-wrap items-center gap-4"
              >
              <button
                onClick={onContactClick}
                className="cursor-pointer glass-pill-link glass-pill-link-standalone glass-pill-link-orange text-sm px-6 py-2.5 transition-colors duration-500 ease-in-out text-[#F0EEE9] inline-flex items-center"
              >
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
              </button>
              <a href="#about" className="btn btn-ghost">
                {messages.secondaryCta}
              </a>
            </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
