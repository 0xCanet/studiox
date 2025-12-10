"use client";

import React from "react";

/**
 * Component that renders "Studi.0x" with the period in orange and K2D font
 * This is Studi.ox's brand identity - always use this component instead of plain text
 */
export function Studi0x({
  className = "",
  ...props
}: {
  className?: string;
  [key: string]: any;
}) {
  return (
    <span
      className={`font-heading ${className}`}
      {...props}
    >
      Studi<span className="text-[var(--color-accent)]">.</span>0x
    </span>
  );
}

