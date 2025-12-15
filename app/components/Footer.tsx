"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TextWithOrangeDots } from "./TextWithOrangeDots";
import { useLenis } from "lenis/react";

export interface FooterMessages {
  copyright: string;
  tagline: string;
  quickLinksTitle: string;
  socialLinksTitle: string;
  quickLinks: {
    label: string;
    href: string;
  }[];
  socialLinks: {
    label: string;
    href: string;
  }[];
}

interface FooterProps {
  messages: FooterMessages;
}

export function Footer({ messages }: FooterProps) {
  const lenis = useLenis();

  const handleQuickLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      lenis?.scrollTo(href, {
        offset: -100,
        duration: 1.5,
      });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#F0EEE9] border-t border-[#0E0E0E]/8"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 py-8 md:py-12">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex-shrink-0">
              <a
                href="/"
                className="inline-block group mb-3"
              >
                <Image
                  src="/logos/studiox-logo-dark-colored.svg"
                  alt="Studi.0x"
                  width={160}
                  height={28}
                  className="h-7 md:h-8 w-auto transition-opacity duration-300 group-hover:opacity-70"
                  priority
                />
              </a>
              <p className="text-[#0E0E0E]/50 text-sm font-body max-w-xs">
                <TextWithOrangeDots>{messages.tagline}</TextWithOrangeDots>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[#0E0E0E]/40 text-[18px] font-heading uppercase tracking-wider mb-2">
                {messages.quickLinksTitle}
              </h4>
              <nav className="flex flex-col gap-3">
                {messages.quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        handleQuickLinkClick(link.href);
                      }
                    }}
                    className="text-[#0E0E0E]/60 hover:text-[#FF7A30] text-sm font-heading transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[#0E0E0E]/40 text-[18px] font-heading uppercase tracking-wider mb-2">
                {messages.socialLinksTitle}
              </h4>
              <nav className="flex flex-col gap-3">
                {messages.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="text-[#0E0E0E]/60 hover:text-[#FF7A30] text-sm font-heading transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-6 border-t border-[#0E0E0E]/8">
            <p className="text-[#0E0E0E]/40 text-sm font-body">
              <TextWithOrangeDots>{messages.copyright}</TextWithOrangeDots>
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
