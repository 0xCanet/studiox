"use client";

import { useEffect } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

declare global {
  interface Window {
    studioxLenis?: Lenis;
  }
}

const particles = Array.from({ length: 14 }, (_, index) => index);

export function SmoothScrollEffects() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const lowPowerMobile = window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;

    if (shouldReduceMotion || lowPowerMobile) {
      root.style.setProperty("--scroll-progress", "0");
      root.style.setProperty("--scroll-velocity", "0");
      root.dataset.smoothScroll = "reduced";
      if (window.studioxLenis) {
        window.studioxLenis.destroy();
        delete window.studioxLenis;
      }
      return () => {
        delete root.dataset.smoothScroll;
        root.style.removeProperty("--scroll-progress");
        root.style.removeProperty("--scroll-velocity");
      };
    }

    root.style.setProperty("--scroll-progress", "0");
    root.style.setProperty("--scroll-velocity", "0");
    root.dataset.smoothScroll = "ready";

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.08,
      syncTouch: false,
    });

    window.studioxLenis = lenis;

    lenis.on("scroll", ({ progress, velocity }) => {
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-velocity", Math.min(Math.abs(velocity) / 80, 1).toFixed(3));
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    const scrollToCurrentHash = (immediate = false) => {
      if (!window.location.hash) return;
      const element = document.querySelector<HTMLElement>(window.location.hash);
      if (!element) return;

      lenis.scrollTo(element, {
        offset: -72,
        immediate,
        duration: immediate ? 0 : 1.35,
      });
    };

    const hashFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToCurrentHash(true));
    });

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href^='#'], a[href^='/#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const hash = href.startsWith("/#") ? href.slice(1) : href;
      const element = document.querySelector<HTMLElement>(hash);
      if (!element) return;

      event.preventDefault();
      lenis.scrollTo(element, {
        offset: -72,
        duration: 1.45,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });

      window.history.pushState(null, "", hash);
    };

    const handleHashChange = () => scrollToCurrentHash(false);

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", handleHashChange);
      cancelAnimationFrame(hashFrame);
      cancelAnimationFrame(frame);
      lenis.destroy();
      if (window.studioxLenis === lenis) delete window.studioxLenis;
      delete root.dataset.smoothScroll;
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--scroll-velocity");
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div className="wow-scroll-layer" aria-hidden="true">
      <div className="wow-scroll-aura" />
      <div className="wow-progress-rail">
        <div className="wow-progress-fill" />
      </div>
      <div className="wow-particles">
        {particles.map((particle) => (
          <span
            key={particle}
            style={
              {
                "--particle": particle,
                "--particle-x": `${(particle * 73) % 100}vw`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
