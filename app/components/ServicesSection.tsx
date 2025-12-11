"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ServicesMessages {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

interface ServicesSectionProps {
  messages: ServicesMessages;
}

// Custom SVG Icons - Thin stroke, tech-minimal aesthetic
const ServiceIcons: Record<string, React.ReactNode> = {
  branding: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      <path
        d="M16 4L6 10V22L16 28L26 22V10L16 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 10V22M6 10L16 16L26 10M6 22L16 16L26 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  uxui: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      <rect
        x="6"
        y="8"
        width="20"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M6 14H26M10 18H22M10 22H18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  web: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      <path
        d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M16 4C12.686 4 10 9.373 10 16C10 22.627 12.686 28 16 28C19.314 28 22 22.627 22 16C22 9.373 19.314 4 16 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M4 16H28M16 4V28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  content: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      <rect
        x="6"
        y="6"
        width="20"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M6 12H26M12 6V26M20 6V26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
      <circle cx="22" cy="10" r="1" fill="currentColor" />
      <circle cx="10" cy="22" r="1" fill="currentColor" />
      <circle cx="22" cy="22" r="1" fill="currentColor" />
    </svg>
  ),
};

// Topographic Lines Component - Animated SVG pattern
function TopographicLines({ isHovered, cardId }: { isHovered: boolean; cardId: string }) {
  const gradientId = `topoGradient-${cardId}`;
  
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 0.2 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(14, 14, 14, 0.15)" />
            <stop offset="50%" stopColor="rgba(14, 14, 14, 0.08)" />
            <stop offset="100%" stopColor="rgba(14, 14, 14, 0.02)" />
          </linearGradient>
        </defs>
        {/* Animated topographic contour lines - subtle wave patterns */}
        <motion.path
          d="M0,200 Q100,150 200,200 T400,200"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isHovered
              ? {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 1.2, ease: "easeInOut" },
                }
              : { pathLength: 0, opacity: 0, transition: { duration: 0.3 } }
          }
        />
        <motion.path
          d="M0,180 Q100,130 200,180 T400,180"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isHovered
              ? {
                  pathLength: 1,
                  opacity: 0.7,
                  transition: { duration: 1.2, delay: 0.1, ease: "easeInOut" },
                }
              : { pathLength: 0, opacity: 0, transition: { duration: 0.3 } }
          }
        />
        <motion.path
          d="M0,220 Q100,170 200,220 T400,220"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isHovered
              ? {
                  pathLength: 1,
                  opacity: 0.7,
                  transition: { duration: 1.2, delay: 0.2, ease: "easeInOut" },
                }
              : { pathLength: 0, opacity: 0, transition: { duration: 0.3 } }
          }
        />
        <motion.path
          d="M0,160 Q100,110 200,160 T400,160"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isHovered
              ? {
                  pathLength: 1,
                  opacity: 0.5,
                  transition: { duration: 1.2, delay: 0.3, ease: "easeInOut" },
                }
              : { pathLength: 0, opacity: 0, transition: { duration: 0.3 } }
          }
        />
        <motion.path
          d="M0,240 Q100,190 200,240 T400,240"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isHovered
              ? {
                  pathLength: 1,
                  opacity: 0.5,
                  transition: { duration: 1.2, delay: 0.4, ease: "easeInOut" },
                }
              : { pathLength: 0, opacity: 0, transition: { duration: 0.3 } }
          }
        />
      </svg>
    </motion.div>
  );
}

// Premium Service Card Component with 3D Parallax
function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Parallax effect using mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["1.5deg", "-1.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const iconComponent = ServiceIcons[service.id] || ServiceIcons.branding;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      }}
    >
      {/* Glassmorphism Card */}
      <div
        className="relative h-full rounded-2xl p-8 md:p-10 backdrop-blur-[30px] border transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          borderColor: "rgba(14, 14, 14, 0.08)",
          borderWidth: "1px",
          transform: isHovered ? "scale(1.015)" : "scale(1)",
          boxShadow: isHovered
            ? "0 20px 60px rgba(0, 0, 0, 0.12), 0 0 40px rgba(255, 122, 48, 0.1)"
            : "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Topographic Lines Background */}
        <TopographicLines isHovered={isHovered} cardId={service.id} />

        {/* Orange Accent Glow on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.12 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at center, rgba(255, 122, 48, 0.15) 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <motion.div
            className="mb-6 text-[#0E0E0E] transition-colors duration-300"
            animate={{
              color: isHovered ? "#FF7A30" : "#0E0E0E",
            }}
            transition={{ duration: 0.3 }}
          >
            {iconComponent}
          </motion.div>

          {/* Title */}
          <h4 className="font-heading font-bold text-xl md:text-2xl text-[#0E0E0E] mb-4 leading-tight">
            {service.title}
          </h4>

          {/* Description */}
          <p className="font-body text-sm md:text-base text-[#0E0E0E]/60 leading-relaxed flex-grow">
            <TextWithOrangeDots>{service.description}</TextWithOrangeDots>
          </p>
        </div>

        {/* Subtle inner glow edge */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%)"
              : "transparent",
            transition: "background 0.3s ease",
          }}
        />
      </div>
    </motion.div>
  );
}

export function ServicesSection({ messages }: ServicesSectionProps) {
  const [backgroundScrollY, setBackgroundScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const prevBackgroundScrollYRef = useRef(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Parallax effect using Lenis scroll
  useLenis(({ scroll }) => {
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
        
        // Smooth interpolation
        const currentValue = prevBackgroundScrollYRef.current;
        const targetValue = newBackgroundScrollY;
        const diff = targetValue - currentValue;
        
        if (Math.abs(diff) > 0.1) {
          const interpolationSpeed = diff > 0 ? 0.25 : 0.15;
          const smoothedValue = currentValue + diff * interpolationSpeed;
          prevBackgroundScrollYRef.current = smoothedValue;
          setBackgroundScrollY(smoothedValue);
        } else {
          prevBackgroundScrollYRef.current = targetValue;
          setBackgroundScrollY(targetValue);
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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden min-h-screen"
      style={{
        position: "relative",
      }}
    >
      {/* Background Image - Full Page with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/backgrounds/bg_img_s2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.6,
          transform: backgroundScrollY > 0 
            ? `translateY(${backgroundScrollY * 0.5}px) scale(${1 + backgroundScrollY * 0.0003})`
            : "translateY(0) scale(1)",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />
      
      {/* Overlay for content readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(240, 238, 233, 0.85) 0%, rgba(240, 238, 233, 0.75) 50%, rgba(240, 238, 233, 0.85) 100%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto z-10 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h3 className="section-title text-[#0E0E0E] mb-6 font-heading font-bold">
            {messages.title}
          </h3>
          <p className="font-body text-lg md:text-xl text-[#0E0E0E]/70 max-w-3xl mx-auto leading-relaxed">
            <TextWithOrangeDots>{messages.subtitle}</TextWithOrangeDots>
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {messages.items.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
