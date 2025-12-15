"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactFormContent } from "./ContactFormContent";
import type { ContactMessages } from "./ContactSection";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ContactMessages;
  language?: "en" | "fr";
}

export function ContactModal({ isOpen, onClose, messages, language = "en" }: ContactModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0E0E0E]/80 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            onClick={(e) => {
              // Close if clicking outside modal content
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#F0EEE9] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#0E0E0E]/5 hover:bg-[#0E0E0E]/10 rounded-full transition-colors"
                aria-label={language === "fr" ? "Fermer la modale" : "Close modal"}
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-[#0E0E0E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal content - ContactSection content */}
              <div className="overflow-y-auto max-h-[90vh]">
                <div className="py-6 md:py-12 px-5 md:px-12">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center mb-8 md:mb-12"
                  >
                    <h1 className="section-title text-[#0E0E0E] mb-4">
                      {messages.title.endsWith('.') ? messages.title.slice(0, -1) : messages.title}
                      <span className="text-accent">.</span>
                    </h1>
                  </motion.div>

                  {/* Contact form content */}
                  <ContactFormContent messages={messages} language={language} isModal={true} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
