"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

// ============================================
// DATA MODEL
// ============================================
export interface ServiceRouteItem {
  id: string;
  label: string;
  subtitle?: string;
  shortDescription: string;
  xDesktop: number; // percentage on desktop map container
  yDesktop: number;
  orderMobile: number;
  animationSrc: string; // path to 8-bit animation (webm or gif)
}

export interface RouteServicesMessages {
  title: string;
  subtitle: string;
  items: ServiceRouteItem[];
}

interface RouteServicesSectionProps {
  messages: RouteServicesMessages;
}

// ============================================
// SERVICE CARD COMPONENT (Military Map Style)
// ============================================
interface ServiceCardProps {
  service: ServiceRouteItem;
  isMobile: boolean;
  fixedPosition: { left: number; top: number };
  parallaxOffset?: number;
}

function ServiceCard({ service, isMobile, fixedPosition, parallaxOffset = 0 }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  // Effet de parallaxe pour desktop uniquement - basé sur le scroll
  useLenis(({ scroll }) => {
    if (isMobile) return;
    
    requestAnimationFrame(() => {
      if (cardRef.current) {
        // Trouver la section parente
        const section = cardRef.current.closest('section');
        if (!section) return;
        
        const sectionRect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportCenterY = viewportHeight / 2;
        
        // Calculer la position de la section dans le viewport
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const sectionCenterY = sectionTop + sectionHeight / 2;
        
        // Calculer la distance du centre de la section au centre du viewport
        const distanceFromCenter = sectionCenterY - viewportCenterY;
        const normalizedDistance = distanceFromCenter / viewportHeight;
        
        // Appliquer un décalage de parallaxe différent selon l'offset de la card
        // Chaque card se déplace indépendamment avec une intensité différente
        const parallaxIntensity = parallaxOffset * 200; // Intensité très augmentée pour visibilité
        const newParallaxY = normalizedDistance * parallaxIntensity;
        
        setParallaxY(newParallaxY);
      }
    });
  }, [isMobile, parallaxOffset]);

  if (isMobile) {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="glass-pill-light rounded-2xl" style={{ padding: '24px' }}>
          {/* Video */}
          <div className="w-full aspect-video rounded-lg overflow-hidden mb-6">
            {service.animationSrc ? (
              service.animationSrc.endsWith(".webm") || service.animationSrc.endsWith(".mp4") ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{
                  imageRendering: "pixelated" as any,
                  filter: "sepia(0.2)",
                }}
                aria-label={`${service.label} animation`}
              >
                <source src={service.animationSrc} type={service.animationSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
              </video>
              ) : (
                <img
                  src={service.animationSrc}
                  alt={`${service.label} animation`}
                  className="w-full h-full object-cover"
                  style={{
                    imageRendering: "pixelated" as any,
                  }}
                />
              )
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#FF7A30]/20 to-[#FF7A30]/10 flex items-center justify-center">
                <div className="text-[#0E0E0E]/20 font-body text-sm text-center px-4">
                  Pixel Art<br />Animation
                </div>
              </div>
            )}
          </div>

          {/* Text Content */}
          <h4 className="font-bold mb-4 whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: '24px', fontFamily: 'K2D, sans-serif', color: '#FF7A30' }}>
            {service.label}
          </h4>
          {service.subtitle && (
            <p className="font-body text-xs text-[#0E0E0E]/50 mb-5 uppercase tracking-wider">
              {service.subtitle}
            </p>
          )}
          <p className="font-body text-sm text-[#0E0E0E]/70 leading-normal">
            <TextWithOrangeDots>{service.shortDescription}</TextWithOrangeDots>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: parallaxOffset * 0.1 + 0.2 // Délai différent pour chaque card
      }}
      className="absolute z-30"
      style={{
        left: `${fixedPosition.left}px`,
        top: `${fixedPosition.top}px`,
        width: '280px',
        transform: `translateY(${parallaxY}px)`,
      }}
    >
      <div
        className="glass-pill-light rounded-xl"
        style={{
          padding: '20px',
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 240, 230, 0.6) 25%, rgba(240, 245, 255, 0.6) 50%, rgba(255, 240, 250, 0.6) 75%, rgba(255, 255, 255, 0.7) 100%)",
          backgroundSize: "200% 200%",
          animation: "iridescent-shift 10s ease-in-out infinite",
          WebkitBackdropFilter: "blur(2px) saturate(180%)",
          backdropFilter: "blur(2px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(255, 122, 48, 0.15)",
        }}
      >
        {/* Small video thumbnail - reduced size */}
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4" style={{ maxHeight: '120px' }}>
          {service.animationSrc ? (
            service.animationSrc.endsWith(".webm") || service.animationSrc.endsWith(".mp4") ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{
                  imageRendering: "pixelated" as any,
                  filter: "sepia(0.2)",
                }}
              >
                <source src={service.animationSrc} type={service.animationSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
              </video>
            ) : (
              <img
                src={service.animationSrc}
                alt={`${service.label} animation`}
                className="w-full h-full object-cover"
                style={{
                  imageRendering: "pixelated" as any,
                }}
              />
            )
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FF7A30]/20 to-[#FF7A30]/10 flex items-center justify-center">
              <div className="text-[#0E0E0E]/20 font-body text-xs text-center px-2">
                Pixel Art
              </div>
            </div>
          )}
        </div>

        {/* Text Content */}
        <h4 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis mb-3" style={{ fontSize: '24px', fontFamily: 'K2D, sans-serif', color: '#FF7A30' }}>
          {service.label}
        </h4>
        {service.subtitle && (
          <p className="font-body text-[10px] text-[#0E0E0E]/50 mb-4 uppercase tracking-wider">
            {service.subtitle}
          </p>
        )}
        <p className="font-body text-xs text-[#0E0E0E]/70 leading-normal">
          <TextWithOrangeDots>{service.shortDescription}</TextWithOrangeDots>
        </p>
      </div>
    </motion.div>
  );
}

// ============================================
// PIN COMPONENT (Military Style)
// ============================================
interface PinProps {
  service: ServiceRouteItem;
  animationDelay: number;
}

function Pin({ service, animationDelay }: PinProps) {
  return (
    <div
      className="absolute z-20 flex flex-col items-center justify-center"
      style={{
        left: `${service.xDesktop}%`,
        top: `${service.yDesktop}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Pin */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: animationDelay,
          duration: 0.4,
          ease: "easeOut"
        }}
        className="relative"
        style={{
          width: "24px",
          height: "24px",
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, #FF7A30 0%, rgba(255, 122, 48, 0.8) 100%)",
            boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.9), 0 0 0 3px rgba(255, 122, 48, 0.3), 0 4px 12px rgba(255, 122, 48, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            border: "none",
          }}
        />

        {/* Inner dot */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 0%, rgba(255, 122, 48, 0.3) 70%, transparent 100%)",
            transform: "scale(0.5)",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: "3px",
              height: "3px",
              background: "#FF7A30",
              boxShadow: "0 0 4px rgba(255, 122, 48, 0.8)",
            }}
          />
        </div>
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: animationDelay + 0.2,
          duration: 0.3,
        }}
        className="mt-3 whitespace-nowrap pointer-events-none text-center"
      >
        <span className="font-body text-xs text-[#0E0E0E]/80 font-medium">
          {service.label}
        </span>
      </motion.div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function RouteServicesSection({ messages }: RouteServicesSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [backgroundScrollY, setBackgroundScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const prevBackgroundScrollYRef = useRef(0);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<Map<string, { left: number; top: number }>>(new Map());

  // Positions responsives pour les cards sur desktop
  useEffect(() => {
    if (isMobile) return;

    const calculatePositions = () => {
      if (!mapContainerRef.current) return;

      const containerWidth = mapContainerRef.current.offsetWidth;
      const containerHeight = mapContainerRef.current.offsetHeight || 700; // fallback à minHeight
      
      // Positions de référence pour un écran de 1400px (largeur max du conteneur)
      const baseWidth = 1400;
      const baseHeight = 700;
      
      // Calcul du ratio pour adapter les positions
      const widthRatio = containerWidth / baseWidth;
      const heightRatio = containerHeight / baseHeight;
      
      // Positions de base en pixels pour un écran de 1400px
      const basePositions: Record<string, { left: number; top: number }> = {
        brand_identity: { left: 14, top: 380.5 },
        ux_ui: { left: 406, top: 5 },
        web2_web3: { left: 710, top: 418.25 },
        content: { left: 1080, top: 59.25 },
      };

      // Calculer les nouvelles positions en fonction du ratio
      const responsivePositions = new Map<string, { left: number; top: number }>();
      
      Object.entries(basePositions).forEach(([key, pos]) => {
        responsivePositions.set(key, {
          left: pos.left * widthRatio,
          top: pos.top * heightRatio,
        });
      });

      setCardPositions(responsivePositions);
    };

    // Calculer au montage
    calculatePositions();

    // Recalculer lors du resize (uniquement desktop)
    const handleResize = () => {
      if (!isMobile) {
        calculatePositions();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
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

  // Parallax effect using Lenis scroll
  useLenis(() => {
    requestAnimationFrame(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        const buffer = 10;
        let newBackgroundScrollY = 0;
        
        if (rect.bottom <= buffer || rect.top >= viewportHeight - buffer) {
          newBackgroundScrollY = 0;
        } else if (rect.top < viewportHeight && rect.bottom > 0) {
          const scrollProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
          const maxParallax = 150;
          newBackgroundScrollY = scrollProgress * maxParallax;
        }
        
        const currentValue = prevBackgroundScrollYRef.current;
        const targetValue = newBackgroundScrollY;
        const diff = targetValue - currentValue;
        
        if (Math.abs(diff) > 0.1) {
          const interpolationSpeed = diff > 0 ? 0.25 : 0.15;
          const smoothedValue = currentValue + diff * interpolationSpeed;
          prevBackgroundScrollYRef.current = smoothedValue;
          setBackgroundScrollY(prev => {
            if (Math.abs(prev - smoothedValue) < 0.01) return prev;
            return smoothedValue;
          });
        } else {
          prevBackgroundScrollYRef.current = targetValue;
          setBackgroundScrollY(prev => {
            if (Math.abs(prev - targetValue) < 0.01) return prev;
            return targetValue;
          });
        }
      } else {
        const currentValue = prevBackgroundScrollYRef.current;
        if (Math.abs(currentValue) > 0.1) {
          const smoothedValue = currentValue * 0.9;
          prevBackgroundScrollYRef.current = smoothedValue;
          setBackgroundScrollY(smoothedValue);
        } else {
          prevBackgroundScrollYRef.current = 0;
          setBackgroundScrollY(0);
        }
      }
    });
  }, []);

  // Get pin position relative to container for better positioning
  const getPinPositionRelative = (service: ServiceRouteItem) => {
    if (!mapContainerRef.current || isMobile) return { x: 0, y: 0 };
    
    const containerRect = mapContainerRef.current.getBoundingClientRect();
    const x = containerRect.width * service.xDesktop / 100;
    const y = containerRect.height * service.yDesktop / 100;
    
    return { x, y };
  };

  // Sort services by orderMobile for mobile layout
  const sortedServices = [...messages.items].sort((a, b) => a.orderMobile - b.orderMobile);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 px-5 md:px-12 overflow-hidden min-h-screen"
    >
      {/* Background Video with Parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <motion.video
          src="/src/video-bg-service.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: 0.6,
            transform: backgroundScrollY > 0 
              ? `translateY(${backgroundScrollY * 0.5}px) scale(${1 + backgroundScrollY * 0.0003})`
              : "translateY(0) scale(1)",
            transformOrigin: "center center",
            willChange: "transform",
          }}
          aria-label="Services section background video"
        />
      </div>
      
      {/* Overlay for content readability - en dessous du tracé pour le laisser visible */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(240, 238, 233, 0.75) 0%, rgba(240, 238, 233, 0.65) 50%, rgba(240, 238, 233, 0.75) 100%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto z-10 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="section-title text-[#0E0E0E] mb-6 font-heading font-bold">
            {messages.title.replace(/\.$/, '')}
            <span className="text-[#FF7A30]">.</span>
          </h1>
          <h2 className="font-heading font-normal text-lg md:text-xl text-[#0E0E0E] max-w-3xl mx-auto leading-relaxed">
            <TextWithOrangeDots>{messages.subtitle.replace(/\.$/, '')}</TextWithOrangeDots>
            <span className="text-[#FF7A30]">.</span>
          </h2>
        </motion.div>

        {/* Desktop: Military Map with Pins and Cards */}
        <div className="hidden lg:block">
          <div 
            ref={mapContainerRef}
            className="relative w-full" 
            style={{ aspectRatio: "16/9", minHeight: "700px" }}
          >
            {/* Pins and Cards */}
            {messages.items.map((service, index) => {
              const sortedByOrder = [...messages.items].sort((a, b) => a.orderMobile - b.orderMobile);
              const pinIndex = sortedByOrder.findIndex(s => s.id === service.id);
              const animationDelay = pinIndex * 0.2;
              const fixedPos = cardPositions.get(service.id) || { left: 0, top: 0 };
              
              // Définir un offset de parallaxe différent pour chaque card (de -3 à 3)
              // Chaque card aura un mouvement indépendant et différent
              const parallaxOffsets = [-3, -1, 1, 3];
              const parallaxOffset = parallaxOffsets[index % parallaxOffsets.length];

              return (
                <div key={service.id}>
                  <Pin service={service} animationDelay={animationDelay} />
                  <ServiceCard
                    service={service}
                    isMobile={false}
                    fixedPosition={fixedPos}
                    parallaxOffset={parallaxOffset}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {sortedServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              isMobile={true}
              fixedPosition={{ left: 0, top: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
