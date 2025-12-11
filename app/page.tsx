// page.tsx — Studi.ox Landing Page with i18n

"use client";

import { useState } from "react";
import { Navbar, type NavbarMessages } from "./components/Navbar";
import { Hero, type HeroMessages } from "./components/Hero";
import { RouteServicesSection, type RouteServicesMessages } from "./components/RouteServicesSection";
import { WorkSection, type WorkMessages } from "./components/WorkSection";
import { AboutSection, type AboutMessages } from "./components/AboutSection";
import { ContactSection, type ContactMessages } from "./components/ContactSection";
import { Footer, type FooterMessages } from "./components/Footer";

type Language = "en" | "fr";

// ============================================
// MESSAGES i18n
// ============================================
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
        work: "Work",
        about: "About",
        letsTalk: "Let's talk",
      },
      contact: "Contact",
    },
    hero: {
      tagline: "Design • Branding • UX/UI • Web2 • Web3 • Visual & Content Creation",
      title: "If you can imagine\u00A0it, we can create it.",
      subtitle:
        "We craft strong brands and fluid experiences, designed to\u00A0be\u00A0memorable, from the\u00A0big idea to the\u00A0smallest detail.",
      primaryCta: "View projects →",
      secondaryCta: "Learn more",
    },
    services: {
      title: "What we do",
      subtitle:
        "360° design expertise across digital and physical touchpoints.",
      items: [
        {
          id: "brand",
          label: "Brand Identity",
          shortDescription:
            "Visual identities that resonate. Logos, typography systems, color palettes and brand guidelines that stand out.",
          xDesktop: 18,
          yDesktop: 52,
          orderMobile: 1,
          animationSrc: "/src/services-1.mp4",
        },
        {
          id: "uxui",
          label: "UX/UI Design",
          shortDescription:
            "Intuitive interfaces and seamless experiences. From research to high-fidelity prototypes and design systems.",
          xDesktop: 39,
          yDesktop: 40,
          orderMobile: 2,
          animationSrc: "/src/service-2.mp4",
        },
        {
          id: "web2web3",
          label: "Web2 & Web3",
          shortDescription:
            "Modern web experiences across traditional and decentralized platforms: dApps, NFT projects, and web applications.",
          xDesktop: 60,
          yDesktop: 62,
          orderMobile: 3,
          animationSrc: "/src/service-3.mp4",
        },
        {
          id: "content",
          label: "Content & Social",
          shortDescription:
            "Visual content that captures attention. Social media assets, presentations, and marketing materials.",
          xDesktop: 80,
          yDesktop: 38,
          orderMobile: 4,
          animationSrc: "/src/service-4.mp4",
        },
      ],
    },
    work: {
      title: "Selected work",
      subtitle:
        "A curated collection of projects where strategy meets craft.",
      cta: "View all projects",
      items: [
        {
          id: "project-1",
          title: "Nexus Protocol",
          category: "Web3 • Branding",
          tags: ["Identity", "dApp Design", "Token Launch"],
        },
        {
          id: "project-2",
          title: "Bloom Studio",
          category: "Brand Identity",
          tags: ["Logo", "Visual System", "Guidelines"],
        },
        {
          id: "project-3",
          title: "Vantage App",
          category: "Product Design",
          tags: ["UX Research", "UI Design", "Prototyping"],
        },
        {
          id: "project-4",
          title: "Monolith Finance",
          category: "Web3 • Product",
          tags: ["DeFi", "Dashboard", "Design System"],
        },
      ],
    },
    about: {
      title: "About us",
      description:
        "We're a design studio obsessed with craft and impact. We partner with ambitious teams to create brands and products that users actually remember. No templates, no shortcuts — just thoughtful design that works.",
      stats: [
        { label: "Projects delivered", value: "50+" },
        { label: "Happy clients", value: "30+" },
        { label: "Years of experience", value: "8+" },
      ],
      values: [
        {
          title: "Craft over shortcuts",
          description:
            "Every pixel matters. We obsess over the details that others overlook.",
        },
        {
          title: "Strategy-led design",
          description:
            "Beautiful design that doesn't convert is just art. We balance aesthetics with business goals.",
        },
        {
          title: "Collaborative spirit",
          description:
            "Your expertise + our design skills = exceptional results. We work as an extension of your team.",
        },
      ],
    },
    contact: {
      title: "Let's talk",
      subtitle:
        "Ready to create something memorable? Book a discovery call or drop us a message.",
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
      },
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name or company",
        emailLabel: "Email",
        emailPlaceholder: "hello@company.com",
        messageLabel: "Message",
        messagePlaceholder: "Tell us about your project...",
        submitBtn: "Send message",
      },
      divider: "Or send a message",
    },
    footer: {
      copyright: "© 2024 Studi.0x",
      tagline: "Design that users remember.",
      links: [
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Dribbble", href: "#" },
      ],
    },
  },
  fr: {
    navbar: {
      logo: "Studi.0x",
      links: {
        services: "Services",
        work: "Projets",
        about: "À propos",
        letsTalk: "Discutons",
      },
      contact: "Contact",
    },
    hero: {
      tagline: "Design • Branding • UX/UI • Web2 • Web3 • Image & Contenu",
      title: "Si vous pouvez l'imaginer, nous pouvons le\u00A0créer.",
      subtitle:
        "Nous concevons des\u00A0marques fortes et des\u00A0expériences fluides, pensées\u00A0pour être mémorables, du\u00A0concept au\u00A0détail.",
      primaryCta: "Voir les projets →",
      secondaryCta: "En savoir plus",
    },
    services: {
      title: "Ce que nous faisons",
      subtitle:
        "Design 360° pour créer des marques fortes, des produits fluides et des expériences qui marquent.",
      items: [
        {
          id: "brand",
          label: "Identité de marque",
          shortDescription:
            "Des identités visuelles qui marquent et qui durent. Logos, typographies, palettes et systèmes graphiques conçus pour incarner votre ADN — du concept fondateur au déploiement complet.",
          xDesktop: 18,
          yDesktop: 52,
          orderMobile: 1,
          animationSrc: "/src/services-1.mp4",
        },
        {
          id: "uxui",
          label: "UX/UI Design",
          shortDescription:
            "Interfaces intuitives et expériences fluides. De la recherche UX aux prototypes haute-fidélité : nous concevons des parcours élégants, clairs et efficaces.",
          xDesktop: 39,
          yDesktop: 40,
          orderMobile: 2,
          animationSrc: "/src/service-2.mp4",
        },
        {
          id: "web2web3",
          label: "Web2 & Web3",
          shortDescription:
            "Sites modernes, dApps, dashboards et produits digitaux conçus pour la performance et parfaitement intégrés dans votre écosystème.",
          xDesktop: 60,
          yDesktop: 62,
          orderMobile: 3,
          animationSrc: "/src/service-3.mp4",
        },
        {
          id: "content",
          label: "Contenu & Social",
          shortDescription:
            "Photographie, vidéo, motion design, assets réseaux sociaux et narratifs visuels pour amplifier votre image de marque.",
          xDesktop: 80,
          yDesktop: 38,
          orderMobile: 4,
          animationSrc: "/src/service-4.mp4",
        },
      ],
    },
    work: {
      title: "Projets sélectionnés",
      subtitle:
        "Une collection de projets où stratégie et savoir-faire se rencontrent.",
      cta: "Voir tous les projets",
      items: [
        {
          id: "project-1",
          title: "Nexus Protocol",
          category: "Web3 • Branding",
          tags: ["Identité", "Design dApp", "Lancement token"],
        },
        {
          id: "project-2",
          title: "Bloom Studio",
          category: "Identité de marque",
          tags: ["Logo", "Système visuel", "Charte"],
        },
        {
          id: "project-3",
          title: "Vantage App",
          category: "Design produit",
          tags: ["Recherche UX", "Design UI", "Prototypage"],
        },
        {
          id: "project-4",
          title: "Monolith Finance",
          category: "Web3 • Produit",
          tags: ["DeFi", "Dashboard", "Design System"],
        },
      ],
    },
    about: {
      title: "À propos",
      description:
        "Nous sommes un studio de design obsédé par le craft et l'impact. Nous accompagnons des équipes ambitieuses pour créer des marques et produits dont les utilisateurs se souviennent vraiment. Pas de templates, pas de raccourcis — juste du design réfléchi qui fonctionne.",
      stats: [
        { label: "Projets livrés", value: "50+" },
        { label: "Clients satisfaits", value: "30+" },
        { label: "Années d'expérience", value: "8+" },
      ],
      values: [
        {
          title: "Le craft avant les raccourcis",
          description:
            "Chaque pixel compte. Nous sommes obsédés par les détails que d'autres négligent.",
        },
        {
          title: "Design stratégique",
          description:
            "Un beau design qui ne convertit pas n'est que de l'art. Nous équilibrons esthétique et objectifs business.",
        },
        {
          title: "Esprit collaboratif",
          description:
            "Votre expertise + nos compétences design = résultats exceptionnels. Nous travaillons comme une extension de votre équipe.",
        },
      ],
    },
    contact: {
      title: "Discutons",
      subtitle:
        "Prêt à créer quelque chose de mémorable ? Réservez un appel découverte ou envoyez-nous un message.",
      calendar: {
        title: "Réserver un appel découverte",
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
      },
      form: {
        nameLabel: "Nom",
        namePlaceholder: "Votre nom ou entreprise",
        emailLabel: "Email",
        emailPlaceholder: "hello@entreprise.com",
        messageLabel: "Message",
        messagePlaceholder: "Parlez-nous de votre projet...",
        submitBtn: "Envoyer le message",
      },
      divider: "Ou envoyez un message",
    },
    footer: {
      copyright: "© 2024 Studi.0x",
      tagline: "Du design dont on se souvient.",
      links: [
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Dribbble", href: "#" },
      ],
    },
  },
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const t = messages[language];

  return (
    <div className="min-h-screen bg-[#F0EEE9] overflow-x-hidden" style={{ width: '100%', maxWidth: '100%', marginRight: 0, paddingRight: 0 }}>
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#F0EEE9] focus:px-4 focus:py-2 focus:text-[#0E0E0E]"
      >
        {language === "fr" ? "Aller au contenu principal" : "Skip to main content"}
      </a>

      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        messages={t.navbar}
      />

      <main id="main">
        <Hero messages={t.hero} />
        <RouteServicesSection messages={t.services} />
        <WorkSection messages={t.work} />
        <AboutSection messages={t.about} />
        <ContactSection messages={t.contact} />
      </main>

      <Footer messages={t.footer} />
    </div>
  );
}
