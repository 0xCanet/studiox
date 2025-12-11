"use client";

import { useState, useEffect } from "react";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
}

export function TypewriterText({
  text,
  speed = 30,
  delay = 0,
  className = "",
  as = "span",
}: TypewriterTextProps) {
  const [revealedLength, setRevealedLength] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Start typing after delay
    const delayTimeout = setTimeout(() => {
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setRevealedLength(currentIndex + 1);
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(typeInterval);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [text, speed, delay]);

  // Cursor blinking animation
  useEffect(() => {
    if (isComplete) {
      // Hide cursor after completion with a delay
      const hideTimeout = setTimeout(() => {
        setShowCursor(false);
      }, 1000);
      return () => clearTimeout(hideTimeout);
    }

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [isComplete]);

  const Component = as;
  const lastChar = text[text.length - 1];
  const isLastCharDot = lastChar === ".";
  const textWithoutLastChar = isLastCharDot ? text.slice(0, -1) : text;
  const isFullyRevealed = revealedLength === text.length;
  // Only blink the dot for H2, not H1
  const shouldShowBlinkingDot = isComplete && isLastCharDot && isFullyRevealed && as === "h2";

  return (
    <Component className={className} style={{ position: "relative" }}>
      {/* Hidden text to reserve space and calculate dimensions */}
      <span 
        aria-hidden="true" 
        style={{ 
          visibility: "hidden",
          display: "block",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          height: "auto",
        }}
      >
        <TextWithOrangeDots as="span">
          {text}
        </TextWithOrangeDots>
      </span>
      {/* Visible text with revealed characters - positioned absolutely to overlay */}
      <span 
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      >
        {revealedLength > 0 && (
          <>
            {isLastCharDot && isFullyRevealed ? (
              <>
                <TextWithOrangeDots as="span">
                  {textWithoutLastChar}
                </TextWithOrangeDots>
                <span
                  className="text-[var(--color-accent)] blinking-dot"
                  style={{
                    animation: shouldShowBlinkingDot ? "blinkDot 1s infinite" : "none",
                  }}
                >
                  .
                </span>
              </>
            ) : (
              <TextWithOrangeDots as="span">
                {text.slice(0, revealedLength)}
              </TextWithOrangeDots>
            )}
          </>
        )}
        {showCursor && (
          <span
            className="inline-block bg-[#F0EEE9] ml-[2px] align-middle typewriter-cursor"
            style={{
              width: "2px",
              height: "1em",
              borderRadius: "2px",
              willChange: "opacity",
            }}
          />
        )}
      </span>
    </Component>
  );
}

