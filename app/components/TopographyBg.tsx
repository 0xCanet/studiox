"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface TopographyBgProps {
  intensity?: "subtle" | "medium";
  className?: string;
}

export function TopographyBg({ intensity = "subtle", className = "" }: TopographyBgProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    if (!shouldReduceMotion && intensity === "medium") {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldReduceMotion, intensity]);

  const opacity = intensity === "subtle" ? 0.05 : 0.08;
  const strokeWidth = intensity === "subtle" ? 0.5 : 0.75;

  // Generate topographic contour lines (simplified pattern) - only on client
  const paths = isMounted ? Array.from({ length: 15 }, (_, i) => {
    const baseY = (i * 100) / 15;
    const amplitude = 15 + Math.sin(i * 0.7) * 12;
    const frequency = 0.015 + (i % 4) * 0.008;
    const phase = i * 0.3;
    
    let path = `M 0 ${baseY}`;
    for (let x = 0; x <= 1000; x += 4) {
      const wave1 = Math.sin(x * frequency + phase) * amplitude;
      const wave2 = Math.sin(x * frequency * 1.5 + phase * 1.3) * (amplitude * 0.4);
      const pointY = baseY + (wave1 + wave2) * (1 - i / 15) * 0.6;
      path += ` L ${x} ${pointY}`;
    }
    return path;
  }) : [];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-[#F0EEE9]"
            style={{ opacity }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -10, 0],
                    x: isHovering && intensity === "medium" ? mousePosition.x * (i % 3) * 0.1 : 0,
                  }
            }
            transition={{
              y: {
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
              },
              x: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

