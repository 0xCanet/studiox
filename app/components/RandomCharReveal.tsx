"use client";

import React, { useState, useEffect, useRef } from "react";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

interface RandomCharRevealProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  highlightWord?: string;
  highlightColor?: string;
  initialText?: string;
}

const randomCharsUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomCharsLowercase = "abcdefghijklmnopqrstuvwxyz";
const randomDigits = "0123456789";

function generateRandomChar(targetChar: string): string {
  // Match the type and case of the target character
  if (/[A-Z]/.test(targetChar)) {
    // Uppercase letter
    return randomCharsUppercase[Math.floor(Math.random() * randomCharsUppercase.length)];
  } else if (/[a-z]/.test(targetChar)) {
    // Lowercase letter
    return randomCharsLowercase[Math.floor(Math.random() * randomCharsLowercase.length)];
  } else if (/[0-9]/.test(targetChar)) {
    // Digit
    return randomDigits[Math.floor(Math.random() * randomDigits.length)];
  }
  // For any other character (shouldn't happen if shouldReplaceChar is correct)
  return targetChar;
}

function shouldReplaceChar(char: string): boolean {
  // Only replace letters and digits, preserve all punctuation, spaces, etc.
  return /[a-zA-Z0-9]/.test(char);
}

export function RandomCharReveal({
  text,
  duration = 2000,
  delay = 0,
  className = "",
  as = "span",
  highlightWord,
  highlightColor = "var(--color-accent)",
  initialText,
}: RandomCharRevealProps) {
  const [revealedLength, setRevealedLength] = useState(0);
  const [displayChars, setDisplayChars] = useState<string[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isH1 = as === "h1";

  useEffect(() => {
    // Cleanup
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Initialize: random chars matching case/style, preserve spaces/punctuation
    setRevealedLength(0);
    
    const initialChars = text.split("").map((finalChar) => {
      if (!shouldReplaceChar(finalChar)) {
        return finalChar;
      }
      return generateRandomChar(finalChar);
    });
    
    setDisplayChars(initialChars);

    // Count replaceable chars for timing
    const replaceableCharsCount = text.split("").filter(char => shouldReplaceChar(char)).length;

    // Start animation - same approach as LoadingBarTags
    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now();
      const charsPerMs = replaceableCharsCount / duration;

      const animate = () => {
        const elapsed = performance.now() - startTime;
        const newRevealedLength = Math.min(
          elapsed * charsPerMs,
          replaceableCharsCount
        );

        setRevealedLength(newRevealedLength);

        // Update display: revealed chars = final text, unrevealed = regenerate random chars
        // Same logic as LoadingBarTags - update every frame for smoothness
        let replaceableCount = 0;
        const newDisplayChars = text.split("").map((finalChar) => {
          if (!shouldReplaceChar(finalChar)) {
            return finalChar;
          }
          
          // Use Math.floor like LoadingBarTags for consistent reveal
          if (replaceableCount < Math.floor(newRevealedLength)) {
            replaceableCount++;
            return finalChar;
          } else {
            replaceableCount++;
            // Always generate new random chars for unrevealed positions (like LoadingBarTags)
            return generateRandomChar(finalChar);
          }
        });

        setDisplayChars(newDisplayChars);

        if (newRevealedLength < replaceableCharsCount) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Ensure we set the final state
          setRevealedLength(replaceableCharsCount);
          setDisplayChars(text.split(""));
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, duration, delay]);

  const Component = as;

  // Count replaceable chars to know which are revealed (same logic as LoadingBarTags)
  let replaceableCount = 0;
  const revealedCount = Math.floor(revealedLength);

  // Render character by character - each char is already in its final position
  // Same approach as LoadingBarTags: use monospace for all chars to keep width constant
  const renderedChars = text.split("").map((finalChar, index) => {
    const displayChar = displayChars[index] || finalChar;
    const isReplaceable = shouldReplaceChar(finalChar);
    const isRevealed = isReplaceable && replaceableCount < revealedCount;
    
    if (isReplaceable) {
      replaceableCount++;
    }
    
    // Apply orange color to dots
    const isDot = finalChar === ".";
    
    // Use the revealed char or the random display char
    const char = isRevealed ? finalChar : displayChar;
    
    if (isDot) {
      return (
        <span key={index} className="text-accent">
          {char}
        </span>
      );
    }
    
    // Use React.Fragment with stable key (like LoadingBarTags)
    return <React.Fragment key={index}>{char}</React.Fragment>;
  });

  // Handle highlight word if needed
  let content: React.ReactNode;
  if (highlightWord && text.includes(highlightWord)) {
    const highlightStart = text.indexOf(highlightWord);
    const highlightEnd = highlightStart + highlightWord.length;
    
    const before = renderedChars.slice(0, highlightStart);
    const highlight = renderedChars.slice(highlightStart, highlightEnd);
    const after = renderedChars.slice(highlightEnd);
    
    content = (
      <>
        {before.length > 0 && <span>{before}</span>}
        <span className="neon-text">
          {highlight}
        </span>
        {after.length > 0 && <span>{after}</span>}
      </>
    );
  } else {
    content = <>{renderedChars}</>;
  }

  // Apply monospace wrapper to keep width constant (like LoadingBarTags)
  // The outer Component keeps its original font, inner span uses monospace
  return (
    <Component className={className}>
      <span
        style={{
          fontFamily: "monospace",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {content}
      </span>
    </Component>
  );
}

