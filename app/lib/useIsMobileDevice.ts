"use client";

import { useEffect, useState } from "react";

export function useIsMobileDevice(breakpoint = 1024) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const widthQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    const checkDevice = () => {
      setIsMobileDevice(widthQuery.matches || coarsePointerQuery.matches);
    };

    checkDevice();

    widthQuery.addEventListener("change", checkDevice);
    coarsePointerQuery.addEventListener("change", checkDevice);
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);

    return () => {
      widthQuery.removeEventListener("change", checkDevice);
      coarsePointerQuery.removeEventListener("change", checkDevice);
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, [breakpoint]);

  return isMobileDevice;
}
