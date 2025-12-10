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
  children: string;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  className?: string;
  [key: string]: any;
}) {
  // Split text by periods and wrap each period in an orange span
  const parts = children.split(/(\.)/g);
  
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
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </Component>
  );
}

