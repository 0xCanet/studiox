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
  const intervalRef = React.useRef<number | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup previous animation
    if (intervalRef.current !== null) {
      cancelAnimationFrame(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Initialize: each tag starts with 0 revealed characters
    setRevealedChars(tags.map(() => 0));
    // Initialize random characters for each position of each tag
    setDisplayChars(
      tags.map((tag) =>
        Array.from({ length: tag.length }, () => generateRandomChar())
      )
    );

    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now();
      const totalChars = tags.reduce((sum, tag) => sum + tag.length, 0);
      const charsPerMs = totalChars / duration;
      let animationFrameId: number | null = null;

      const animate = () => {
        const elapsed = performance.now() - startTime;
        const totalRevealed = Math.min(
          elapsed * charsPerMs,
          totalChars
        );

        // Distribute revealed characters across tags
        let remaining = Math.floor(totalRevealed);
        const newRevealedChars = tags.map((tag) => {
          const toReveal = Math.min(remaining, tag.length);
          remaining = Math.max(0, remaining - tag.length);
          return toReveal;
        });

        setRevealedChars(newRevealedChars);

        // Update random characters for unrevealed positions - always generate new random chars
        setDisplayChars((prev) =>
          prev.map((tagChars, tagIndex) =>
            tagChars.map((char, charIndex) =>
              charIndex < newRevealedChars[tagIndex]
                ? tags[tagIndex][charIndex]
                : generateRandomChar()
            )
          )
        );

        if (totalRevealed < totalChars) {
          animationFrameId = requestAnimationFrame(animate);
          intervalRef.current = animationFrameId;
        } else {
          // Ensure we set the final state
          setRevealedChars(tags.map((tag) => tag.length));
          setDisplayChars(tags.map((tag) => tag.split("")));
          intervalRef.current = null;
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      intervalRef.current = animationFrameId;
    }, delay);

    return () => {
      if (intervalRef.current !== null) {
        cancelAnimationFrame(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [tags, duration, delay]);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {tags.map((tag, index) => {
          const revealedCount = revealedChars[index] || 0;
          const displayText = displayChars[index]?.join("") || tag;
          
          // Render character by character to style | in orange
          const renderedChars = Array.from({ length: Math.max(displayText.length, tag.length) }, (_, charIndex) => {
            const isRevealed = charIndex < revealedCount;
            const char = isRevealed ? tag[charIndex] : displayText[charIndex];
            const isPipe = char === '|';
            
            if (isPipe) {
              return (
                <span key={charIndex} className="text-accent">
                  {char}
                </span>
              );
            }
            return <React.Fragment key={charIndex}>{char}</React.Fragment>;
          });

          return (
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
                  {renderedChars}
                </span>
              </span>
              {index < tags.length - 1 && (
                <span
                  className="text-accent font-body text-xs"
                  style={{ margin: "0 0.25rem" }}
                >
                  •
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

