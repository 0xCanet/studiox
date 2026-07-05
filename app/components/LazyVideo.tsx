"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

type VideoSource = {
  src: string;
  type?: string;
  media?: string;
};

interface LazyVideoProps
  extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "children" | "src"> {
  sources: VideoSource[];
  wrapperClassName?: string;
  rootMargin?: string;
  threshold?: number;
  loadImmediately?: boolean;
}

export function LazyVideo({
  sources,
  wrapperClassName,
  rootMargin = "320px 0px",
  threshold = 0.12,
  loadImmediately = false,
  autoPlay = true,
  muted = true,
  playsInline = true,
  preload = "none",
  poster,
  className,
  ...videoProps
}: LazyVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(loadImmediately);

  useEffect(() => {
    if (loadImmediately && !shouldLoad) {
      const frame = requestAnimationFrame(() => setShouldLoad(true));
      return () => cancelAnimationFrame(frame);
    }

    if (shouldLoad) return;

    const node = wrapperRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setShouldLoad(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadImmediately, rootMargin, shouldLoad, threshold]);

  useEffect(() => {
    if (!shouldLoad || !autoPlay) return;

    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {
      // Mobile browsers can reject autoplay until the element is visible enough.
    });
  }, [autoPlay, shouldLoad]);

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      {poster && !shouldLoad ? (
        <img src={poster} alt="" aria-hidden="true" className={className} loading="lazy" decoding="async" />
      ) : null}

      {shouldLoad ? (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
          className={className}
          {...videoProps}
        >
          {sources.map((source) => (
            <source key={`${source.media ?? "default"}-${source.src}`} {...source} />
          ))}
        </video>
      ) : null}
    </div>
  );
}
