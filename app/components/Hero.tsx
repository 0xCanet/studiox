"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { LoadingBarTags } from "./LoadingBarTags";
import { RandomCharReveal } from "./RandomCharReveal";


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
  const [navbarHeight, setNavbarHeight] = useState(96); // Default minimum height for mobile navbar (30px top + ~56px navbar + 10px margin)
  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentPosition, setContentPosition] = useState<'top' | 'center' | 'bottom'>('bottom'); // Position strategy for mobile
  const [minSectionHeight, setMinSectionHeight] = useState(600); // Minimum section height for mobile
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
        const windowHeight = window.innerHeight;
        const screenHeight = window.screen.height;
        // Estimate: usually browser bars take 10-15% of screen height on mobile
        const estimatedBarHeight = screenHeight > windowHeight ? (screenHeight - windowHeight) : 0;
        setBrowserBarHeight(estimatedBarHeight);
      }
    };

    calculateBrowserBarHeight();

    window.addEventListener('resize', calculateBrowserBarHeight);
    window.addEventListener('orientationchange', calculateBrowserBarHeight);
    
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
    
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const handleChange = () => checkMobile();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
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

  // Calculate viewport height and determine content positioning strategy
  useEffect(() => {
    const calculateViewportHeight = () => {
      if (!isMobile) {
        setViewportHeight(0);
        return;
      }

      // Use Visual Viewport API if available (most accurate)
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
      } else {
        setViewportHeight(window.innerHeight);
      }
    };

    calculateViewportHeight();
    
    window.addEventListener('resize', calculateViewportHeight);
    window.addEventListener('orientationchange', calculateViewportHeight);
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', calculateViewportHeight);
    }
    
    return () => {
      window.removeEventListener('resize', calculateViewportHeight);
      window.removeEventListener('orientationchange', calculateViewportHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', calculateViewportHeight);
      }
    };
  }, [isMobile]);

  // Calculate navbar height on mobile to ensure Hero content starts after it
  useEffect(() => {
    const calculateNavbarHeight = () => {
      if (!isMobile) {
        setNavbarHeight(0);
        return;
      }

      // Try multiple selectors to find the navbar
      const navbar = document.querySelector('nav[class*="fixed"]') || 
                     document.querySelector('nav') ||
                     document.querySelector('[role="navigation"]');
      
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        // Navbar top position (30px) + navbar height + small margin
        const totalHeight = rect.top + rect.height + 10; // 10px margin
        setNavbarHeight(Math.max(96, totalHeight)); // Minimum 96px to ensure content is always below navbar
      } else {
        // Fallback: estimate navbar height (30px top + ~56px navbar + 10px margin)
        setNavbarHeight(96);
      }
    };

    // Calculate immediately
    calculateNavbarHeight();
    
    // Recalculate multiple times to catch navbar when it becomes visible
    const timers = [
      setTimeout(() => calculateNavbarHeight(), 100),
      setTimeout(() => calculateNavbarHeight(), 500),
      setTimeout(() => calculateNavbarHeight(), 1000),
      setTimeout(() => calculateNavbarHeight(), 2100), // When navbar becomes visible
      setTimeout(() => calculateNavbarHeight(), 2500), // After navbar animation completes
    ];

    window.addEventListener('resize', calculateNavbarHeight);
    window.addEventListener('orientationchange', calculateNavbarHeight);
    
    // Use MutationObserver to detect when navbar is added/modified
    const observer = new MutationObserver(() => {
      calculateNavbarHeight();
    });
    
    // Observe body for navbar changes
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    }
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      window.removeEventListener('resize', calculateNavbarHeight);
      window.removeEventListener('orientationchange', calculateNavbarHeight);
      observer.disconnect();
    };
  }, [isMobile]);

  // Determine content positioning strategy based on viewport height and content size
  useEffect(() => {
    if (!isMobile || viewportHeight === 0) {
      setContentPosition('bottom');
      return;
    }

    const calculateContentPosition = () => {
      // Estimate content height (tagline + title + subtitle + buttons + padding)
      // Rough estimate: ~400-500px for typical mobile content
      const estimatedContentHeight = 500;
      const availableHeight = viewportHeight - navbarHeight;
      
      // Update minimum section height based on estimate
      setMinSectionHeight(Math.max(600, navbarHeight + estimatedContentHeight + 100));
      
      // If we have enough space (content + 100px margin), start from top
      if (availableHeight >= estimatedContentHeight + 100) {
        setContentPosition('top');
      } 
      // If we have moderate space (content + 50px margin), center it
      else if (availableHeight >= estimatedContentHeight + 50) {
        setContentPosition('center');
      } 
      // Otherwise, position at bottom (default)
      else {
        setContentPosition('bottom');
      }
    };

    // Initial calculation with estimate
    calculateContentPosition();

        // Wait for content to be rendered before recalculating with actual height
    const timers = [
      setTimeout(() => {
        if (textRef.current && animationPhase === 'content') {
          const contentRect = textRef.current.getBoundingClientRect();
          const actualContentHeight = contentRect.height;
          const availableHeight = viewportHeight - navbarHeight;
          
          // Use actual content height if available and reasonable
          if (actualContentHeight > 100 && actualContentHeight < 2000) {
            const contentHeight = actualContentHeight;
            
            // Update minimum section height based on actual content
            setMinSectionHeight(Math.max(600, navbarHeight + contentHeight + 100));
            
            if (availableHeight >= contentHeight + 100) {
              setContentPosition('top');
            } else if (availableHeight >= contentHeight + 50) {
              setContentPosition('center');
            } else {
              setContentPosition('bottom');
            }
          }
        }
      }, 2500), // After content animation completes
      setTimeout(() => {
        // Final check after all animations
        if (textRef.current && animationPhase === 'content') {
          const contentRect = textRef.current.getBoundingClientRect();
          const actualContentHeight = contentRect.height;
          const availableHeight = viewportHeight - navbarHeight;
          
          if (actualContentHeight > 100 && actualContentHeight < 2000) {
            const contentHeight = actualContentHeight;
            
            // Update minimum section height based on actual content
            setMinSectionHeight(Math.max(600, navbarHeight + contentHeight + 100));
            
            if (availableHeight >= contentHeight + 100) {
              setContentPosition('top');
            } else if (availableHeight >= contentHeight + 50) {
              setContentPosition('center');
            } else {
              setContentPosition('bottom');
            }
          }
        }
      }, 3000)
    ];
    
    window.addEventListener('resize', calculateContentPosition);
    window.addEventListener('orientationchange', calculateContentPosition);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      window.removeEventListener('resize', calculateContentPosition);
      window.removeEventListener('orientationchange', calculateContentPosition);
    };
  }, [isMobile, viewportHeight, navbarHeight, animationPhase]);

  useEffect(() => {
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
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentContainerZoom = containerStartZoom - (containerStartZoom - containerEndZoom) * easedProgress;
      setContainerZoom(currentContainerZoom);
      
      if (progress >= 1) {
        clearInterval(containerZoomInterval);
      }
    }, 16);
    
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
    }, 16);
    
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
      document.documentElement.classList.remove('scrollbar-hidden');
    };
  }, []);

  // Get scroll position from Lenis - Apply parallax on both mobile and desktop
  // Use ref to store previous value for smooth interpolation
  const prevHeroScrollYRef = useRef(0);
  
  // Memoize tagline tags - all animations use same duration and start together
  const taglineTags = useMemo(() => messages.tagline.split(" • "), [messages.tagline]);
  const animationDuration = 2200; // Reduced duration for more minimalist, subtle effect
  
  useLenis(({ scroll }) => {
    requestAnimationFrame(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        const buffer = 10;
        
        let newHeroScrollY = 0;
        
        if (rect.bottom <= buffer || rect.top >= viewportHeight - buffer) {
          newHeroScrollY = 0;
        } else if (rect.top < viewportHeight && rect.bottom > 0) {
          const scrollProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
          
          const maxParallax = 200;
          newHeroScrollY = scrollProgress * maxParallax;
        }
        
        const currentValue = prevHeroScrollYRef.current;
        const targetValue = newHeroScrollY;
        const diff = targetValue - currentValue;
        
        if (Math.abs(diff) > 0.1) {
          const interpolationSpeed = diff > 0 ? 0.25 : 0.15;
          const smoothedValue = currentValue + diff * interpolationSpeed;
          prevHeroScrollYRef.current = smoothedValue;
          setHeroScrollY(smoothedValue);
        } else {
          // Snap to target if very close
          prevHeroScrollYRef.current = targetValue;
          setHeroScrollY(targetValue);
        }
      } else {
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
      className="relative h-screen bg-[var(--color-cream)] px-5 pb-5 md:pt-6 md:px-12 md:pb-12" 
      style={{ 
        width: '100%', 
        maxWidth: '100%',
        marginRight: 0, 
        paddingTop: isMobile && contentPosition === 'top' ? `${Math.max(96, navbarHeight)}px` : isMobile ? '0px' : undefined,
        height: isMobile ? '100dvh' : '102vh',
        minHeight: isMobile 
          ? contentPosition === 'top' 
            ? `${minSectionHeight}px` // Minimum height calculated based on actual content
            : '100dvh'
          : '102vh',
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
            opacity: videoVisible ? 1 : 0,
          }}
        >
        <div 
          className="absolute inset-0 rounded-b-3xl md:rounded-[32px] overflow-hidden"
          style={{
            borderRadius: isMobile ? '0 0 1.5rem 1.5rem' : '32px'
          }}
        >
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
            preload="metadata"
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
            preload="metadata"
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

        <div 
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-[var(--color-charcoal)]/30 to-[var(--color-charcoal)]/10 z-10"
          style={{
            transform: 'none',
            willChange: 'auto'
          }}
        />
        </div>

        <div 
          ref={textRef}
          className={`absolute inset-0 flex flex-col z-20 ${
            isMobile 
              ? contentPosition === 'top' 
                ? 'justify-start' 
                : contentPosition === 'center' 
                  ? 'justify-center' 
                  : 'justify-end'
              : 'justify-end'
          }`}
          style={{
            paddingLeft: isMobile ? '20px' : '48px',
            paddingRight: isMobile ? '20px' : '48px',
            paddingTop: isMobile 
              ? contentPosition === 'top' 
                ? `${navbarHeight + 20}px` // Start after navbar with margin
                : contentPosition === 'center'
                  ? '32px'
                  : '32px'
              : '48px',
            paddingBottom: isMobile 
              ? contentPosition === 'bottom'
                ? `calc(80px + env(safe-area-inset-bottom, 0px))`
                : contentPosition === 'center'
                  ? '32px'
                  : '32px'
              : '48px',
            transform: isMobile 
              ? contentPosition === 'top'
                ? `translateY(${heroScrollY > 0 ? heroScrollY * 0.6 : 0}px)` // Minimal transform for top position
                : contentPosition === 'center'
                  ? `translateY(${-browserBarHeight * 0.3 - (heroScrollY > 0 ? heroScrollY * 0.6 : 0)}px)` // Slight upward adjustment
                  : `translateY(${-browserBarHeight - 10 - (heroScrollY > 0 ? heroScrollY * 0.6 : 0)}px)` // Original bottom position
              : heroScrollY > 0
                ? `translateY(${-64 - (heroScrollY * 0.6)}px)`
                : 'translateY(-64px)',
            willChange: heroScrollY > 0 ? 'transform' : 'auto',
            overflowX: 'hidden',
            maxWidth: '100%',
          }}
        >
          <div className={isMobile ? 'w-full max-w-full' : 'max-w-6xl'}>
            {animationPhase === "content" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut"
                }}
              >
                <div className="mb-6" style={{ 
                  maxWidth: '100%',
                  overflow: 'hidden',
                  wordBreak: 'break-word'
                }}>
                  <LoadingBarTags
                    tags={taglineTags}
                    duration={animationDuration}
                    delay={0}
                    className="w-full mb-4 md:mb-6"
                  />
                </div>

                {messages.title.includes("Vous méritez") ? (
                  <RandomCharReveal
                    key="h1-french"
                    text={messages.title}
                    duration={animationDuration}
                    delay={0}
                    as="h1"
                    className="text-[#F0EEE9] text-balance mb-3 md:mb-6 hero-h1 text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                    highlightWord="ambitions."
                    highlightColor="var(--color-accent)"
                    initialText="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                  />
                ) : (
                  <RandomCharReveal
                    key="h1-english"
                    text={messages.title}
                    duration={animationDuration}
                    delay={0}
                    as="h1"
                    className="text-[#F0EEE9] text-balance mb-3 md:mb-6 hero-h1 text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                    highlightWord="ambition."
                    highlightColor="var(--color-accent)"
                    initialText="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                  />
                )}

                <RandomCharReveal
                  key="h2"
                  text={messages.subtitle}
                  duration={animationDuration}
                  delay={0}
                  as="h2"
                  className="font-body text-[#F0EEE9]/80 max-w-5xl mb-8 md:mb-10 hero-h2"
                />
              </motion.div>
            )}

            {animationPhase === "content" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: animationDuration / 1000 + 0.2,
                  ease: "easeOut"
                }}
                className="flex flex-wrap items-center gap-3 md:gap-4"
              >
              <button
                onClick={onContactClick}
                className="cursor-pointer glass-pill-link glass-pill-link-standalone glass-pill-link-orange text-sm px-6 py-2.5 text-[#F0EEE9] inline-flex items-center"
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
              <a href="#work" className="btn btn-ghost">
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
