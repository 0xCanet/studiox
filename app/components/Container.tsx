import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "narrow" | "default" | "wide";
}

/**
 * Container - Standardized container with consistent padding and max-width
 * 
 * Usage:
 * ```tsx
 * <Container>
 *   <h1>Content</h1>
 * </Container>
 * ```
 */
export function Container({ 
  children, 
  className = "",
  maxWidth = "default" 
}: ContainerProps) {
  const maxWidthClass = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  }[maxWidth];

  return (
    <div className={`mx-auto w-full ${maxWidthClass} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
