import { ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  direction?: "row" | "col";
  gap?: "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  className?: string;
}

/**
 * Stack - Standardized flex container with consistent gap spacing
 * 
 * Usage:
 * ```tsx
 * <Stack direction="col" gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 * ```
 */
export function Stack({ 
  children, 
  direction = "col",
  gap = "md",
  align = "stretch",
  justify = "start",
  className = ""
}: StackProps) {
  const directionClass = direction === "row" ? "flex-row" : "flex-col";
  
  const gapClass = {
    sm: "gap-2 md:gap-3",
    md: "gap-4 md:gap-6",
    lg: "gap-6 md:gap-8",
    xl: "gap-8 md:gap-12",
  }[gap];

  const alignClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  }[align];

  const justifyClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  }[justify];

  return (
    <div className={`flex ${directionClass} ${gapClass} ${alignClass} ${justifyClass} ${className}`}>
      {children}
    </div>
  );
}
