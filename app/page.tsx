"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar, type NavbarMessages } from "./components/Navbar";
import { Hero, type HeroMessages } from "./components/Hero";
import { RouteServicesSection, type RouteServicesMessages } from "./components/RouteServicesSection";
import { WorkSection, type WorkMessages } from "./components/WorkSection";
import { AboutSection, type AboutMessages } from "./components/AboutSection";
import { ContactSection, type ContactMessages } from "./components/ContactSection";
import { Footer, type FooterMessages } from "./components/Footer";
import { ConsentBanner } from "./components/ConsentBanner";
import { pricingCopy } from "@/content/pricing";
import { replaceVariablesInObject } from "./lib/i18n-utils";

// Lazy load des composants lourds pour améliorer les performances initiales
const ContactModal = dynamic(() => import("./components/ContactModal").then(mod => ({ default: mod.ContactModal })), {
  ssr: false,
});

const PricingSection = dynamic(() => import("./components/PricingSection").then(mod => ({ default: mod.PricingSection })), {
  ssr: true,
  loading: () => {
    const lang = typeof window !== "undefined" && navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-muted">{lang === "fr" ? "Chargement..." : "Loading..."}</div>
      </div>
    );
  },
});

type Language = "en" | "fr";

const messages: Record<
  Language,
  {
    navbar: NavbarMessages;
    hero: HeroMessages;
    services: RouteServicesMessages;
    work: WorkMessages;
    about: AboutMessages;
    contact: ContactMessages;
    footer: FooterMessages;
  }
> = {
  en: {
    navbar: {
      logo: "Studi.0x",
      links: {
        services: "Services",
        work: "Projects",
        pricing: "Offers",
        about: "About",
        letsTalk: "Let's talk about your project",
      },
      contact: "Contact",
    },
    hero: {
      tagline: "Designer 360° | UX/UI • Branding • Web2 & Web3",
      title: "You deserve a brand image that matches your ambition.",
      subtitle:
        "We help brands clarify and elevate their visual identity, from branding to digital experience.",
      primaryCta: "Let's talk about your project",
      secondaryCta: "View projects",
    },
    services: {
      title: "What we do.",
      subtitle:
        "360° design to build strong brands, fluid products and memorable experiences.",
      items: [
        {
          id: "brand_identity",
          label: "Brand Identity",
          shortDescription:
            "Logos, guidelines, color systems and consistent visual languages. Identities that inspire trust.",
          xDesktop: 18,
          yDesktop: 52,
          orderMobile: 1,
          animationSrc: "/src/services-1.mp4",
        },
        {
          id: "ux_ui",
          label: "UX/UI Design",
          shortDescription:
            "Intuitive, conversion-oriented interfaces. From wireframes to final mockups.",
          xDesktop: 39,
          yDesktop: 40,
          orderMobile: 2,
          animationSrc: "/src/service-2.mp4",
        },
        {
          id: "content",
          label: "Content & Social",
          shortDescription:
            "Assets and templates for socials, decks and campaigns. A consistent image across all touchpoints.",
          xDesktop: 80,
          yDesktop: 38,
          orderMobile: 4,
          animationSrc: "/src/service-4.mp4",
        },
        {
          id: "web2_web3",
          label: "Web2 & Web3",
          shortDescription:
            "Modern, interactive experiences, from corporate to the crypto ecosystem.",
          xDesktop: 60,
          yDesktop: 62,
          orderMobile: 3,
          animationSrc: "/src/service-3.mp4",
        },
      ],
    },
    work: {
      title: "Selected projects.",
      subtitle:
        "A collection of collaborations where strategy meets design.",
      cta: "View all projects",
      viewProject: "View Project",
      downloadPDF: "Download PDF",
      availableNow: "Available now",
      items: [
        {
          id: "ebook-design-2026",
          title: "Pourquoi le design est une nécessité en 2026 (FR ONLY)",
          category: "EBOOK",
          tags: ["Discover why design is essential in 2026 and how it can transform your business"],
          downloadUrl: "/src/Pourquoi_le_design_est_une_necessite_en_2026.pdf",
          image: "/images/backgrounds/ebook-mockup.png",
        },
        {
          id: "sendo-market",
          title: "Sendo.Market",
          category: "WEB3 • UX/UI • BRANDING • VIDEO MAKING",
          tags: ["Creation of a strong brand identity and modern web design for Sendo.Market, with a structured art direction and a clear, product-focused user experience."],
          video: "/src/sendo-market-video.mp4",
        },
        {
          id: "scorage",
          title: "ScoRAGE",
          category: "BRANDING - WebDesign - Communication",
          tags: ["Full visual identity and website design for ScoRage™, combining clarity, performance, and a technical tone to support a high-stakes crypto analysis tool."],
          image: "/images/backgrounds/scorage-banner.png",
        },
        {
          id: "totem",
          title: "Totem",
          category: "Wireframing - UX/UI Design",
          tags: ["Design of multiple landing pages for Totem, a subsidiary of the Orange Group, featuring a modern and structured UI that highlights their telecom infrastructure solutions."],
          image: "/images/backgrounds/totem-mockup.png",
        },
        {
          id: "academie-mouvement",
          title: "L'académie du Mouvement",
          category: "Wireframing - UX/UI Design",
          tags: ["Production of five landing page mockups focused on wellness and fitness, including gym, swimming, relaxation, baby swimming, and specialized therapeutic spaces."],
          image: "/images/backgrounds/academie-mouvement.png",
        },
        {
          id: "coming-soon",
          title: "Coming soon",
          category: "Coming soon",
          tags: ["A new project is coming soon, crafted to push the boundaries of experience and design."],
        },
      ],
    },
    about: {
      heading: "About.",
      intro: [
        "Studi.0x is a 360° visual & design studio founded by Jessy Canet. We help brands unlock their potential through strong identities, clear websites and consistent creative direction.",
        "Our promise: a credible, memorable image that's simple to deploy, without agency friction.",
      ],
      pillarsTitle: "Our approach",
      pillars: [
        {
          id: "process",
          title: "Smooth & collaborative process",
          desc: "Short workshops, fast feedback, one point of contact. You progress with full clarity.",
        },
        {
          id: "strategy",
          title: "Strategic design",
          desc: "Every design choice serves a purpose: trust, clarity, conversion.",
        },
        {
          id: "speed",
          title: "Fast execution, premium quality",
          desc: "Clean, production-ready deliverables, without unnecessary delays.",
        },
      ],
      stats: [
        { id: "years", value: "10+", label: "years in design" },
        { id: "clients", value: "20+", label: "clients supported" },
        { id: "projects", value: "90+", label: "projects delivered" },
      ],
      founder: {
        name: "Jessy Canet",
        role: "CEO & Designer @ Studi.0x",
        portraitAlt: "Portrait of Jessy Canet",
      },
      cta: {
        primary: "Let's talk about your project",
        secondary: "Explore more projects",
      },
    },
    contact: {
      title: "Let's talk.",
      subtitle:
        "Ready to create something memorable? Book a discovery call or send a message.",
      calendar: {
        title: "Book a discovery call",
        subtitle: "30 minutes to discuss your project",
        monthNames: [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December",
        ],
        dayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
        selectDate: "Select a date",
        selectTime: "Available times",
        confirmBtn: "Confirm booking",
        successTitle: "You're booked!",
        successMessage: "We'll send you a calendar invite shortly.",
        prevMonth: "Previous month",
        nextMonth: "Next month",
        fillFormMessage: "Please fill in all fields in the form on the right to confirm your booking.",
      },
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name or company",
        emailLabel: "Email",
        emailPlaceholder: "Your business email",
        phoneLabel: "Phone",
        phonePlaceholder: "Phone (optional)",
        messageLabel: "Message",
        messagePlaceholder: "Tell me about your project…",
        submitBtn: "Send message",
        submitBookingBtn: "Confirm booking",
        successMessage: "Your message has been sent successfully.",
        successBookingMessage: "Your booking has been confirmed.",
        errorRequiredFields: "Please fill in all required fields (name, email, message).",
        errorInvalidEmail: "Please enter a valid email address.",
        errorSubmitFailed: "An error occurred while sending. Please try again.",
        errorGeneric: "An error occurred. Please try again.",
        submitting: "Sending...",
      },
      divider: "Or send a message",
    },
    footer: {
      copyright: "© 2025 Studi.0x. All rights reserved.",
      tagline: "The 360° visual & design studio",
      quickLinksTitle: "Quick links",
      socialLinksTitle: "Social",
      quickLinks: [
        { label: "Services", href: "#services" },
        { label: "Projects", href: "#work" },
        { label: "Offers", href: "#pricing" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
      socialLinks: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/jessy-h/" },
        { label: "X/Twitter", href: "https://x.com/0xcanet" },
        { label: "Email", href: "mailto:contact@studi0x.agency" },
      ],
    },
  },
  fr: {
    navbar: {
      logo: "Studi.0x",
      links: {
        services: "Services",
        work: "Projets",
        pricing: "Offres",
        about: "À propos",
        letsTalk: "Parlez-moi de votre projet",
      },
      contact: "Contact",
    },
    hero: {
      tagline: "Designer 360° | UX/UI • Branding • Web2 & Web3",
      title: "Vous méritez une image de marque à la hauteur de vos ambitions.",
      subtitle:
        "Nous aidons les marques à clarifier et professionnaliser leur univers visuel. Du branding à l'expérience digitale.",
      primaryCta: "Parlez-moi de votre projet",
      secondaryCta: "Voir les projets",
    },
    services: {
      title: "Ce que nous faisons.",
      subtitle:
        "Design 360° pour créer des marques fortes, des produits fluides et des expériences mémorables.",
      items: [
        {
          id: "brand_identity",
          label: "Identité de marque",
          shortDescription:
            "Logos, chartes, palettes et systèmes visuels cohérents. Des identités qui inspirent confiance.",
          xDesktop: 18,
          yDesktop: 52,
          orderMobile: 1,
          animationSrc: "/src/services-1.mp4",
        },
        {
          id: "ux_ui",
          label: "UX/UI Design",
          shortDescription:
            "Interfaces intuitives et orientées conversion. Du wireframe aux maquettes finales.",
          xDesktop: 39,
          yDesktop: 40,
          orderMobile: 2,
          animationSrc: "/src/service-2.mp4",
        },
        {
          id: "content",
          label: "Contenu & Social",
          shortDescription:
            "Assets et templates pour réseaux, présentations et campagnes. Image homogène sur tous les canaux.",
          xDesktop: 80,
          yDesktop: 38,
          orderMobile: 4,
          animationSrc: "/src/service-4.mp4",
        },
        {
          id: "web2_web3",
          label: "Web2 & Web3",
          shortDescription:
            "Expériences modernes et interactives, du corporate classique à l'écosystème crypto.",
          xDesktop: 60,
          yDesktop: 62,
          orderMobile: 3,
          animationSrc: "/src/service-3.mp4",
        },
      ],
    },
    work: {
      title: "Projets sélectionnés.",
      subtitle:
        "Une collection de collaborations où stratégie et design se rencontrent.",
      cta: "Voir tous les projets",
      viewProject: "Voir le projet",
      downloadPDF: "Télécharger le PDF",
      availableNow: "Disponible maintenant",
      items: [
        {
          id: "ebook-design-2026",
          title: "Pourquoi le design est une nécessité en 2026",
          category: "EBOOK",
          tags: ["Découvrez pourquoi le design est essentiel en 2026 et comment il peut transformer votre entreprise"],
          downloadUrl: "/src/Pourquoi_le_design_est_une_necessite_en_2026.pdf",
          image: "/images/backgrounds/ebook-mockup.png",
        },
        {
          id: "sendo-market",
          title: "Sendo.Market",
          category: "WEB3 • UX/UI • BRANDING",
          tags: ["Création d'une identité de marque forte et d'un webdesign moderne pour Sendo.Market, avec une direction artistique structurée et une expérience claire axée produit."],
          video: "/src/sendo-market-video.mp4",
        },
        {
          id: "scorage",
          title: "ScoRAGE",
          category: "BRANDING - WebDesign - Communication",
          tags: ["Développement complet de l'identité visuelle et design du site ScoRage™, alliant performance, clarté et tonalité technique pour soutenir un outil d'analyse crypto exigeant."],
          image: "/images/backgrounds/scorage-banner.png",
        },
        {
          id: "totem",
          title: "Totem",
          category: "Wireframing - UX/UI Design",
          tags: ["Conception de plusieurs landing pages pour Totem, filiale du Groupe Orange, avec une UI moderne et structurée mettant en valeur leurs solutions d'infrastructure télécom."],
          image: "/images/backgrounds/totem-mockup.png",
        },
        {
          id: "academie-mouvement",
          title: "L'académie du Mouvement",
          category: "Wireframing - UX/UI Design",
          tags: ["Production de cinq maquettes de landing pages autour du bien-être et du sport, incluant fitness, natation, relaxation, bébé nageur et espace de soin spécialisé."],
          image: "/images/backgrounds/academie-mouvement.png",
        },
        {
          id: "coming-soon",
          title: "Bientôt disponible",
          category: "À venir",
          tags: ["Un nouveau projet arrive bientôt, pensé pour repousser les limites en matière d'expérience et de design."],
        },
      ],
    },
    about: {
      heading: "À propos.",
      intro: [
        "Studi.0x est une agence visuelle & design 360° fondée par Jessy Canet. Nous aidons les marques à révéler leur potentiel grâce à des identités fortes, des sites clairs et une direction artistique cohérente.",
        "Notre promesse : une image crédible, mémorable et simple à déployer, sans lourdeur d'agence.",
      ],
      pillarsTitle: "Notre approche",
      pillars: [
        {
          id: "process",
          title: "Processus fluide & collaboratif",
          desc: "Ateliers courts, feedbacks rapides, un seul interlocuteur. Vous avancez en toute clarté.",
        },
        {
          id: "strategy",
          title: "Design stratégique",
          desc: "Chaque choix esthétique sert un objectif : confiance, lisibilité, conversion.",
        },
        {
          id: "speed",
          title: "Exécution rapide, qualité premium",
          desc: "Livrables propres et prêts à l'emploi, sans délais inutiles.",
        },
      ],
      stats: [
        { id: "years", value: "10+", label: "années de design" },
        { id: "clients", value: "20+", label: "clients accompagnés" },
        { id: "projects", value: "90+", label: "projets réalisés" },
      ],
      founder: {
        name: "Jessy Canet",
        role: "CEO & Designer @ Studi.0x",
        portraitAlt: "Portrait de Jessy Canet",
      },
      cta: {
        primary: "Parlez-moi de votre projet",
        secondary: "Découvrir plus de projets",
      },
    },
    contact: {
      title: "Discutons.",
      subtitle:
        "Prêt à créer quelque chose de mémorable ? Réservez un appel découverte ou envoyez un message.",
      calendar: {
        title: "Réserver un appel",
        subtitle: "30 minutes pour discuter de votre projet",
        monthNames: [
          "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
          "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
        ],
        dayNames: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
        timeSlots: ["9h00", "10h00", "11h00", "14h00", "15h00", "16h00"],
        selectDate: "Sélectionnez une date",
        selectTime: "Créneaux disponibles",
        confirmBtn: "Confirmer le rendez-vous",
        successTitle: "C'est réservé !",
        successMessage: "Nous vous enverrons une invitation calendrier.",
        prevMonth: "Mois précédent",
        nextMonth: "Mois suivant",
        fillFormMessage: "Veuillez remplir tous les champs du formulaire à droite pour confirmer le rendez-vous.",
      },
      form: {
        nameLabel: "Nom",
        namePlaceholder: "Votre nom ou entreprise",
        emailLabel: "Email",
        emailPlaceholder: "Votre email professionnel",
        phoneLabel: "Téléphone",
        phonePlaceholder: "Téléphone (optionnel)",
        messageLabel: "Message",
        messagePlaceholder: "Parlez-moi de votre projet…",
        submitBtn: "Envoyer le message",
        submitBookingBtn: "Confirmer le rendez-vous",
        successMessage: "Votre message a été envoyé avec succès.",
        successBookingMessage: "Votre rendez-vous a été confirmé.",
        errorRequiredFields: "Veuillez remplir tous les champs (nom, email, message).",
        errorInvalidEmail: "Veuillez entrer une adresse email valide.",
        errorSubmitFailed: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
        submitting: "Envoi...",
      },
      divider: "Ou envoyez un message",
    },
    footer: {
      copyright: "© 2025 Studi.0x. Tous droits réservés.",
      tagline: "L'agence visuelle & design 360°",
      quickLinksTitle: "Liens rapides",
      socialLinksTitle: "Réseaux sociaux",
      quickLinks: [
        { label: "Services", href: "#services" },
        { label: "Projets", href: "#work" },
        { label: "Offres", href: "#pricing" },
        { label: "À propos", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
      socialLinks: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/jessy-h/" },
        { label: "X/Twitter", href: "https://x.com/0xcanet" },
        { label: "Email", href: "mailto:contact@studi0x.agency" },
      ],
    },
  },
};

const detectBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("fr")) {
    return "fr";
  }
  return "en";
};

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [isMounted, setIsMounted] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    setLanguage(detectBrowserLanguage());
  }, []);
  
  const t = replaceVariablesInObject(messages[language]);

  return (
    <div className="min-h-screen bg-[#F0EEE9] overflow-x-hidden" style={{ width: '100%', maxWidth: '100%', marginRight: 0, paddingRight: 0 }}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#F0EEE9] focus:px-4 focus:py-2 focus:text-[#0E0E0E]"
        suppressHydrationWarning
      >
        {isMounted && language === "fr" ? "Aller au contenu principal" : "Skip to main content"}
      </a>

      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        messages={t.navbar}
      />

      <main id="main">
        <Hero messages={t.hero} onContactClick={() => setIsContactModalOpen(true)} />
        <RouteServicesSection messages={t.services} />
        <WorkSection messages={t.work} />
        <section id="pricing">
          <PricingSection
            lang={language}
            copy={pricingCopy}
            onPrimary={(tierId) => {
              setIsContactModalOpen(true);
            }}
          />
        </section>
        <AboutSection messages={t.about} />
        <ContactSection messages={t.contact} language={language} />
      </main>

      <Footer messages={t.footer} />
      
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        messages={t.contact}
        language={language}
      />
      
      <ConsentBanner language={language} />
    </div>
  );
}
