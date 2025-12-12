"use client";

import React from "react";

/**
 * Component that renders text with orange dots (periods) as accent color
 * This is Studi.ox's brand identity - all periods should be orange
 */
export function TextWithOrangeDots({
  children,
  as: Component = "span",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  [key: string]: any;
}) {
  // Ensure children is a string - handle React.ReactNode properly
  let text: string;
  if (typeof children === 'string') {
    text = children;
  } else if (typeof children === 'number') {
    text = String(children);
  } else if (children == null) {
    text = '';
  } else {
    // For other React nodes, try to extract text content
    text = String(children);
  }
  
  // If text is empty, return null to avoid hydration issues
  if (!text || text.trim() === '') {
    return null;
  }
  
  // Split text by periods and wrap each period in an orange span
  const parts = text.split(/(\.)/g);
  
  return (
    <Component className={className} {...props}>
      {parts.map((part, index) => {
        if (part === ".") {
          return (
            <span key={index} className="text-[var(--color-accent)]">
              .
            </span>
          );
        }
        // Only render non-empty parts to avoid hydration issues
        if (part) {
          return <span key={index}>{part}</span>;
        }
        return null;
      })}
    </Component>
  );
}

