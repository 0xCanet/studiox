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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://studiox.dev"),
  title: {
    default: "Studi.0x — Design Agency | Branding, UX/UI, Web2 & Web3",
    template: "%s | Studi.0x",
  },
  description:
    "We design what your users remember. Strong brands, fluid experiences — identity, interface, product, and content. Full-service 360° design agency specializing in Brand Identity, UX/UI Design, Web2 & Web3, and Content Creation.",
  keywords: [
    "design agency",
    "branding",
    "UX/UI design",
    "web3 design",
    "web design",
    "digital identity",
    "brand identity",
    "user experience",
    "interface design",
    "dApps design",
    "NFT projects",
    "content creation",
    "visual design",
    "motion design",
    "Jessy Canet",
    "Studi.0x",
  ],
  authors: [{ name: "Jessy Canet", url: "https://x.com/0xcanet" }],
  creator: "Jessy Canet @ Studi.0x",
  publisher: "Studi.0x",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    siteName: "Studi.0x",
    title: "Studi.0x — Design Agency | Branding, UX/UI, Web2 & Web3",
    description:
      "We design what your users remember. Strong brands, fluid experiences — identity, interface, product, and content. Full-service 360° design agency.",
    url: "/",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Studi.0x — Design Agency specializing in Branding, UX/UI, Web2 & Web3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studi.0x — Design Agency",
    description:
      "We design what your users remember. Strong brands, fluid experiences — identity, interface, product, and content.",
    creator: "@0xCanet",
    site: "@0xCanet",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/",
    },
  },
  category: "Design Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${k2d.variable} ${ibmPlexMono.variable} scrollbar-hidden`} suppressHydrationWarning>
      <body className={`${k2d.variable} ${ibmPlexMono.variable} antialiased`} suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
