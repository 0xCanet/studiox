"use client";

import { motion } from "framer-motion";
import { Studi0x } from "./Studi0x";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

export interface FooterMessages {
  copyright: string;
  tagline: string;
  links: {
    label: string;
    href: string;
  }[];
}

interface FooterProps {
  messages: FooterMessages;
}

export function Footer({ messages }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#F0EEE9] border-t border-[#0E0E0E]/8"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left - Logo & Tagline */}
          <div>
            <a
              href="#"
              className="font-bold text-xl text-[#0E0E0E] hover:text-[#FF7A30] transition-colors inline-block"
            >
              <Studi0x />
            </a>
            <p className="text-[#0E0E0E]/50 text-sm mt-1 font-body">
              <TextWithOrangeDots>{messages.tagline}</TextWithOrangeDots>
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex flex-wrap gap-6">
            {messages.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#0E0E0E]/60 hover:text-[#FF7A30] text-sm font-heading transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right - Copyright */}
          <p className="text-[#0E0E0E]/40 text-sm font-body">
            <TextWithOrangeDots>{messages.copyright}</TextWithOrangeDots>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
