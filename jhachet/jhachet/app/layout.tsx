import type { Metadata } from "next";
import { K2D, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "./components/SmoothScroll";

const k2d = K2D({
  variable: "--font-k2d",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${k2d.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body className={`${k2d.variable} ${ibmPlexMono.variable} antialiased`} suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
