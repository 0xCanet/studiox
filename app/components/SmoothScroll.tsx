"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: ReactNode;
}

function ScrollRestoration() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    // Prevent Next.js default scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      // Always scroll to top immediately when navigating to a new page
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  useEffect(() => {
    // Save scroll position before navigation
    const scrollKey = `scroll-${pathname}`;
    
    if (lenis) {
      // Save current scroll position periodically
      const handleScroll = () => {
        const currentScroll = Math.round(lenis.scroll);
        if (currentScroll > 0) {
          sessionStorage.setItem(scrollKey, currentScroll.toString());
        }
      };

      lenis.on("scroll", handleScroll);
      return () => {
        lenis.off("scroll", handleScroll);
      };
    }
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root>
      <ScrollRestoration />
      {children}
    </ReactLenis>
  );
}

