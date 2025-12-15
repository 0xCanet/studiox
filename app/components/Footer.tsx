"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TextWithOrangeDots } from "./TextWithOrangeDots";
import { useLenis } from "lenis/react";
import { Container } from "./Container";

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
      className="bg-bg border-t border-border-subtle"
    >
      <Container maxWidth="wide" className="py-8 md:py-12">
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
              <p className="text-muted text-sm font-body max-w-xs">
                <TextWithOrangeDots>{messages.tagline}</TextWithOrangeDots>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-subtle text-[18px] font-heading uppercase tracking-wider mb-2">
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
                    className="text-muted hover:text-accent text-sm font-heading transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-subtle text-[18px] font-heading uppercase tracking-wider mb-2">
                {messages.socialLinksTitle}
              </h4>
              <nav className="flex flex-col gap-3">
                {messages.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="text-muted hover:text-accent text-sm font-heading transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-6 border-t border-border-subtle">
            <p className="text-subtle text-sm font-body">
              <TextWithOrangeDots>{messages.copyright}</TextWithOrangeDots>
            </p>
          </div>
        </div>
      </Container>
    </motion.footer>
  );
}
