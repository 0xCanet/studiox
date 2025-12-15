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
  highlightColor = "#FF7A30",
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

    // Initialize: random chars matching case/style, preserve spaces/punctuation (same for H1 and H2)
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

    // Start animation
    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now();
      const charsPerMs = replaceableCharsCount / duration;

      const animate = () => {
        const elapsed = performance.now() - startTime;
        const newRevealedLength = Math.min(elapsed * charsPerMs, replaceableCharsCount);
        // Use smoother interpolation - keep decimal for smoother transitions
        setRevealedLength(newRevealedLength);

        // Update display: revealed chars = final text, unrevealed = regenerate random chars
        let replaceableCount = 0;
        const newDisplayChars = text.split("").map((finalChar) => {
          if (!shouldReplaceChar(finalChar)) {
            return finalChar;
          }
          
          // Use fractional reveal for smoother animation
          // Reveal when we're close to the next character (within 0.2 threshold)
          if (replaceableCount < newRevealedLength - 0.2) {
            replaceableCount++;
            return finalChar;
          } else {
            replaceableCount++;
            // Generate random char matching the target char's case and type
            return generateRandomChar(finalChar);
          }
        });
        setDisplayChars(newDisplayChars);

        if (newRevealedLength < replaceableCharsCount) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
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

  // Render text with highlight if needed, applying monospace to random chars for consistent width
  const renderText = () => {
    // Count replaceable chars to know which are revealed
    let replaceableCount = 0;
    const replaceableIndices = text.split("").map((char) => {
      if (shouldReplaceChar(char)) {
        const idx = replaceableCount;
        replaceableCount++;
        return idx;
      }
      return -1;
    });
    
    // Build rendered text character by character with monospace for unrevealed chars
    const renderedElements: React.ReactNode[] = [];
    displayChars.forEach((displayChar, index) => {
      const finalChar = text[index];
      const isReplaceable = shouldReplaceChar(finalChar);
      const replaceableIdx = replaceableIndices[index];
      const isRevealed = isReplaceable && replaceableIdx !== -1 && replaceableIdx < revealedLength - 0.2;
      
      // Apply orange color to dots
      const isDot = displayChar === ".";
      
      // For unrevealed replaceable chars, use monospace to keep consistent width
      if (isReplaceable && !isRevealed) {
        renderedElements.push(
          <span key={index} style={{ fontFamily: "monospace", fontVariantNumeric: "tabular-nums" }}>
            {displayChar}
          </span>
        );
      } else if (isDot) {
        renderedElements.push(
          <span key={index} className="text-[var(--color-accent)]">
            {displayChar}
          </span>
        );
      } else {
        renderedElements.push(<React.Fragment key={index}>{displayChar}</React.Fragment>);
      }
    });
    
    if (highlightWord && text.includes(highlightWord)) {
      const highlightStart = text.indexOf(highlightWord);
      const highlightEnd = highlightStart + highlightWord.length;
      
      const before = renderedElements.slice(0, highlightStart);
      const highlight = renderedElements.slice(highlightStart, highlightEnd);
      const after = renderedElements.slice(highlightEnd);
      
      return (
        <>
          {before.length > 0 && <span>{before}</span>}
          <span className="underline" style={{ color: highlightColor }}>
            {highlight}
          </span>
          {after.length > 0 && <span>{after}</span>}
        </>
      );
    }
    
    return <span>{renderedElements}</span>;
  };

  // Hidden text for layout
  const hiddenText = highlightWord && text.includes(highlightWord) ? (
    <>
      <TextWithOrangeDots as="span">{text.slice(0, text.indexOf(highlightWord))}</TextWithOrangeDots>
      <span className="underline" style={{ color: highlightColor }}>
        {highlightWord}
      </span>
      <TextWithOrangeDots as="span">{text.slice(text.indexOf(highlightWord) + highlightWord.length)}</TextWithOrangeDots>
    </>
  ) : (
    <TextWithOrangeDots as="span">{text}</TextWithOrangeDots>
  );

  const containerStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 30,
    maxWidth: isH1 ? "100%" : "100%", // Full width on mobile, will be constrained by parent
  };

  const hiddenSpanStyle: React.CSSProperties = {
    display: isH1 ? "inline-block" : "block",
    opacity: 0,
    height: "auto",
    pointerEvents: "none",
    whiteSpace: "pre-wrap", // Allow wrapping for H1 to display on 2 lines
    width: isH1 ? "100%" : "auto",
    lineHeight: "inherit",
  };

  const visibleSpanStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    whiteSpace: "pre-wrap", // Allow wrapping for H1 to display on 2 lines
    lineHeight: "inherit",
  };

  return (
    <Component className={className} style={containerStyle}>
      <span aria-hidden="true" style={hiddenSpanStyle}>
        {hiddenText}
      </span>
      <span style={visibleSpanStyle}>
        {renderText()}
      </span>
    </Component>
  );
}

