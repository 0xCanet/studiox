"use client";

import React from "react";

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
  let text: string;
  if (typeof children === 'string') {
    text = children;
  } else if (typeof children === 'number') {
    text = String(children);
  } else if (children == null) {
    text = '';
  } else {
    text = String(children);
  }
  
  if (!text || text.trim() === '') {
    return null;
  }
  
  const parts = text.split(/(\.)/g);
  
  return (
    <Component className={className} {...props}>
      {parts.map((part, index) => {
        if (part === ".") {
          return (
            <span key={index} className="text-accent">
              .
            </span>
          );
        }
        if (part) {
          return <span key={index}>{part}</span>;
        }
        return null;
      })}
    </Component>
  );
}

