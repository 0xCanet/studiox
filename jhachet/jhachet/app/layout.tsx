import type { Metadata } from "next";
import { K2D } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { FontLoader } from "./components/FontLoader";

const k2d = K2D({
  variable: "--font-k2d",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studi.0x — Design Agency | Branding, UX/UI, Web2 & Web3",
  description:
    "We design what your users remember. Strong brands, fluid experiences — identity, interface, product, and content. Full-service 360° design agency.",
  keywords: ["design agency", "branding", "UX/UI", "web3", "web design", "digital identity"],
  openGraph: {
    title: "Studi.0x — Design Agency",
    description: "We design what your users remember. Strong brands, fluid experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={k2d.variable} suppressHydrationWarning>
      <body className={`${k2d.variable} antialiased`} suppressHydrationWarning>
        <FontLoader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
