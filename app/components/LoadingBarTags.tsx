"use client";

import React, { useState, useEffect } from "react";

interface LoadingBarTagsProps {
  tags: string[];
  duration?: number;
  delay?: number;
  className?: string;
}

const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateRandomChar(): string {
  return randomChars[Math.floor(Math.random() * randomChars.length)];
}

export function LoadingBarTags({
  tags,
  duration = 2000,
  delay = 0,
  className = "",
}: LoadingBarTagsProps) {
  const [revealedChars, setRevealedChars] = useState<number[]>([]);
  const [displayChars, setDisplayChars] = useState<string[][]>([]);
  const hasStartedRef = React.useRef(false);

  useEffect(() => {
    // Only run once
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Initialize: each tag starts with 0 revealed characters
    setRevealedChars(tags.map(() => 0));
    // Initialize random characters for each position of each tag
    setDisplayChars(
      tags.map((tag) =>
        Array.from({ length: tag.length }, () => generateRandomChar())
      )
    );

    const delayTimeout = setTimeout(() => {
      const startTime = Date.now();
      const totalChars = tags.reduce((sum, tag) => sum + tag.length, 0);
      const charsPerMs = totalChars / duration;

      const updateInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const totalRevealed = Math.min(
          Math.floor(elapsed * charsPerMs),
          totalChars
        );

        // Distribute revealed characters across tags
        let remaining = totalRevealed;
        const newRevealedChars = tags.map((tag) => {
          const toReveal = Math.min(remaining, tag.length);
          remaining = Math.max(0, remaining - tag.length);
          return toReveal;
        });

        setRevealedChars(newRevealedChars);

        // Update random characters for unrevealed positions
        setDisplayChars((prev) =>
          prev.map((tagChars, tagIndex) =>
            tagChars.map((char, charIndex) =>
              charIndex < newRevealedChars[tagIndex]
                ? tags[tagIndex][charIndex]
                : generateRandomChar()
            )
          )
        );

        if (totalRevealed >= totalChars) {
          clearInterval(updateInterval);
        }
      }, 30); // Update every 30ms for smooth animation

      return () => clearInterval(updateInterval);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [tags, duration, delay]);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            <span
              className="font-body text-xs uppercase text-[#F0EEE9]/70"
              style={{
                letterSpacing: "0.1em",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  letterSpacing: "0.2em",
                  whiteSpace: "nowrap",
                }}
              >
                {displayChars[index]?.join("") || tag}
              </span>
            </span>
            {index < tags.length - 1 && (
              <span
                className="text-[var(--color-accent)] font-body text-xs"
                style={{ margin: "0 0.25rem" }}
              >
                •
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

