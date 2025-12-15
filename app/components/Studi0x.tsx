"use client";

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
      Studi<span className="text-accent">.</span>0x
    </span>
  );
}

