"use client";

import { motion } from "framer-motion";
import { ContactFormContent } from "./ContactFormContent";
import { Section } from "./Section";

export interface ContactMessages {
  title: string;
  subtitle: string;
  calendar: {
    title: string;
    subtitle: string;
    monthNames: string[];
    dayNames: string[];
    timeSlots: string[];
    selectDate: string;
    selectTime: string;
    confirmBtn: string;
    successTitle: string;
    successMessage: string;
    prevMonth: string;
    nextMonth: string;
    fillFormMessage?: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitBookingBtn: string;
    successMessage: string;
    successBookingMessage: string;
    errorRequiredFields: string;
    errorInvalidEmail: string;
    errorSubmitFailed: string;
    errorGeneric: string;
    submitting: string;
  };
  divider: string;
}

interface ContactSectionProps {
  messages: ContactMessages;
  language?: "en" | "fr";
  isModal?: boolean;
}

export function ContactSection({ messages, language = "en", isModal = false }: ContactSectionProps) {
  if (isModal) {
    return <ContactFormContent messages={messages} language={language} isModal={true} />;
  }

  return (
    <Section id="contact" variant="base" background="bg">
      <ContactFormContent messages={messages} language={language} isModal={false} />
    </Section>
  );
}
