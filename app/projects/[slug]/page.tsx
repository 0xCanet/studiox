"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar, type NavbarMessages } from "../../components/Navbar";
import { Footer, type FooterMessages } from "../../components/Footer";
import { WorkSection, type WorkMessages } from "../../components/WorkSection";
import { TextWithOrangeDots } from "../../components/TextWithOrangeDots";
import { PDFViewer } from "../../components/PDFViewer";

// Helper function to format description with links
const formatDescriptionWithLinks = (text: string, language: Language): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let keyIndex = 0;
  
  // Split by patterns: Jessy Canet, Studi.0x, and link patterns like (link x: x.com/0xcanet)
  const pattern = /(Jessy Canet|Studi\.0x|\(link\s+x\s*:\s*([^)]+)\))/gi;
  const matches = Array.from(text.matchAll(pattern));
  let lastIndex = 0;

  matches.forEach((match) => {
    const matchIndex = match.index!;
    const matchText = match[0];
    
    // Add text before match
    if (matchIndex > lastIndex) {
      parts.push(<span key={`text-${keyIndex++}`}>{text.slice(lastIndex, matchIndex)}</span>);
    }
    
    // Handle different match types
    if (matchText === "Jessy Canet") {
      parts.push(
        <a
          key={`link-${keyIndex++}`}
          href="https://x.com/0xcanet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF7A30] underline hover:text-[#E86A20] transition-colors"
        >
          {matchText}
        </a>
      );
    } else if (matchText === "Studi.0x") {
      parts.push(
        <span key={`bold-${keyIndex++}`} className="font-bold text-[#0E0E0E]">
          Studi.0x<span className="text-[#FF7A30]">.</span>
        </span>
      );
    } else if (matchText.startsWith("(link")) {
      // Extract link text from pattern (link x: x.com/0xcanet)
      const linkText = match[2] || matchText.replace(/\(link\s+x\s*:\s*/, "").replace(/\)/, "");
      parts.push(
        <>
          <span key={`link-prefix-${keyIndex}`}>(link x : </span>
          <a
            key={`link-${keyIndex++}`}
            href="https://x.com/0xcanet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF7A30] underline hover:text-[#E86A20] transition-colors"
          >
            {linkText}
          </a>
          <span key={`link-suffix-${keyIndex++}`}>)</span>
        </>
      );
    }
    
    lastIndex = matchIndex + matchText.length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key={`text-${keyIndex++}`}>{text.slice(lastIndex)}</span>);
  }

  return <>{parts.length > 0 ? parts : text}</>;
};

// Helper function to format text with bold keywords and orange dots
const formatScorageText = (text: string, keywords: string[]): React.ReactNode => {
  // Escape special regex characters in keywords
  const escapedKeywords = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const boldPattern = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyIndex = 0;

  const matches = Array.from(text.matchAll(boldPattern));

  // Helper to add text with periods in black
  const addTextWithPeriods = (textToAdd: string, prefix: string) => {
    const textParts = textToAdd.split(/(\.)/g);
    textParts.forEach((part, idx) => {
      if (part === ".") {
        parts.push(
          <span key={`${prefix}-dot-${keyIndex++}-${idx}`} className="text-[#0E0E0E]">.</span>
        );
      } else if (part) {
        parts.push(part);
      }
    });
  };

  matches.forEach((match) => {
    const matchIndex = match.index!;
    
    // Add text before match
    if (matchIndex > lastIndex) {
      addTextWithPeriods(text.slice(lastIndex, matchIndex), 'before');
    }
    
    // Add bold keyword
    parts.push(
      <span key={`bold-${keyIndex++}`} className="font-bold text-[#0E0E0E]">
        {match[0]}
      </span>
    );
    
    lastIndex = matchIndex + match[0].length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    addTextWithPeriods(text.slice(lastIndex), 'final');
  }

  return <>{parts.length > 0 ? parts : text}</>;
};

type Language = "en" | "fr";

// ============================================
// PROJECT DATA
// ============================================
const projects: Record<string, {
  title: string;
  category: string;
  tags: {
    en: string[];
    fr: string[];
  };
  description: {
    en: string;
    fr: string;
  };
  details: {
    en: {
      overview: string;
      challenge: string;
      solution: string;
      results: string;
    };
    fr: {
      overview: string;
      challenge: string;
      solution: string;
      results: string;
    };
  };
  links?: {
    label: string | { en: string; fr: string };
    url: string;
  }[];
  video?: string;
  videoDescription?: {
    en: string;
    fr: string;
  };
}> = {
  "sendo-market": {
    title: "Sendo.Market",
    category: "WEB3 • UX/UI • BRANDING",
    tags: {
      en: ["Creation of a strong brand identity and modern web design"],
      fr: ["Création d'une identité impactante & WebDesign"],
    },
    description: {
      en: "Creation of a strong brand identity and modern web design for Sendo.Market, with a structured art direction and a clear, product-focused user experience.",
      fr: "Création d'une identité de marque forte et d'un webdesign moderne pour Sendo.Market, avec une direction artistique structurée et une expérience claire axée produit.",
    },
    details: {
      en: {
        overview: "Sendo.Market is a cutting-edge Web3 marketplace platform that needed a strong visual identity and intuitive user experience to stand out in the competitive decentralized marketplace space.",
        challenge: "Creating a brand that feels both innovative and trustworthy, while designing an interface that makes complex Web3 interactions feel simple and accessible.",
        solution: "We developed a bold, modern brand identity with a distinctive color palette and typography system. The web design focuses on clarity and user flow, making blockchain interactions feel as natural as traditional e-commerce.",
        results: "A cohesive brand identity and web experience that positions Sendo.Market as a leader in the Web3 marketplace space, with increased user engagement and brand recognition.",
      },
      fr: {
        overview: "Sendo.Market est une plateforme de marketplace Web3 de pointe qui avait besoin d'une identité visuelle forte et d'une expérience utilisateur intuitive pour se démarquer dans l'espace concurrentiel des marketplaces décentralisées.",
        challenge: "Créer une marque qui soit à la fois innovante et digne de confiance, tout en concevant une interface qui rende les interactions Web3 complexes simples et accessibles.",
        solution: "Nous avons développé une identité de marque audacieuse et moderne avec une palette de couleurs distinctive et un système typographique. Le design web se concentre sur la clarté et le parcours utilisateur, rendant les interactions blockchain aussi naturelles que le e-commerce traditionnel.",
        results: "Une identité de marque cohérente et une expérience web qui positionnent Sendo.Market comme un leader dans l'espace des marketplaces Web3, avec une augmentation de l'engagement utilisateur et de la reconnaissance de la marque.",
      },
    },
    links: [
      { label: { en: "Visit Website", fr: "Visiter le site" }, url: "#" },
      { label: { en: "Case Study", fr: "Étude de cas" }, url: "#" },
    ],
    video: "/src/sendo-market-video.mp4",
    videoDescription: {
      en: "This presentation video was created entirely using generative AI (model VEO3.1), motion design (After Effects) and post-production (Final Cut Pro).",
      fr: "Cette vidéo de présentation a été créée entièrement avec de l'IA générative (modèle VEO3.1), du motion design (After Effects) et de la post production (Final Cut Pro).",
    },
  },
  "scorage": {
    title: "ScoRAGE",
    category: "BRANDING - WebDesign - Communication",
    tags: {
      en: ["Full visual identity and website design"],
      fr: ["Création d'identité et création d'un site internet."],
    },
    description: {
      en: "Full visual identity and website design for ScoRage™, combining clarity, performance, and a technical tone to support a high-stakes crypto analysis tool.",
      fr: "Développement complet de l'identité visuelle et design du site ScoRage™, alliant performance, clarté et tonalité technique pour soutenir un outil d'analyse crypto exigeant.",
    },
    details: {
      en: {
        overview: "Our mission was to design and develop the $RAGE brand image and the ScoRage™ product, the first product in the ecosystem. As a SaaS, it allowed analyzing any Web3 project in less than 3 minutes and delivering an interactive report, based on the F.I.R.E.S. scoring (Fundamentals, Infra, Reputation, Engagement, Scam Signals). We shaped a coherent, modern and accessible experience, aligned with the client's vision.",
        challenge: "$RAGE faced a double challenge: How to make Web3 risk analysis understandable, fast and accessible, even for non-technical users? How to create a strong and credible identity in a universe saturated with complex, sometimes opaque projects, while standing out through transparency and pedagogy? The product had to be reliable, automated and intuitive enough to be immediately adopted by both experienced users and beginners.",
        solution: "We designed a complete solution, combining branding, UX, AI and infrastructure: Creation of the $RAGE visual identity: branding, artistic direction, tone, graphic style. UX/UI design of the webapp: architecture, information hierarchy, visual storytelling. Development of ScoRage™, an AI agent orchestrating more than 10 APIs to analyze a project from end to end. Implementation of the agent-based backend: automated parsing, file generation, orchestration logic. Each element was designed to reflect the client's mission: accessibility, transparency, efficiency.",
        results: "We delivered to $RAGE an operational, coherent and premium anti-scam platform: A strong identity, immediately recognizable. An analysis tool capable of producing a structured report in less than 3 minutes. A centralized experience on a secure dashboard, to find all reports generated by users. A scalable technological base, ready to evolve towards a true anti-scam infrastructure layer for Web3.",
      },
      fr: {
        overview: "Notre mission consistait à concevoir et développer l'image de $RAGE et le produit ScoRage™, le premier produit l'écosystème, sous forme de SaaS, permettait d'analyser en moins de 3 minutes n'importe quel projet Web3 et de délivrer un rapport interactif, fondé sur le scoring F.I.R.E.S. (Fundamentals, Infra, Reputation, Engagement, Scam Signals). Nous avons façonné une expérience cohérente, moderne et accessible, alignée avec la vision du client.",
        challenge: "$RAGE faisait face à un double défi : Comment rendre l'analyse de risques Web3 compréhensible, rapide et accessible, même pour les utilisateurs non techniques ? Comment créer une identité forte et crédible dans un univers saturé de projets complexes, parfois opaques, tout en se démarquant par la transparence et la pédagogie ? Le produit devait être fiable, automatisé et suffisamment intuitif pour être adopté immédiatement par les personnes confirmées comme par les débutants.",
        solution: "Nous avons conçu une solution complète, alliant branding, UX, IA et infrastructure : Création de l'identité visuelle $RAGE : branding, direction artistique, tonalité, style graphique. Conception UX/UI de la webapp : architecture, hiérarchie de l'information, storytelling visuel. Développement de ScoRage™, un agent IA orchestrant plus de 10 API pour analyser un projet de bout en bout. Mise en place du backend agent-based : parsing automatisé, génération de fichiers, logique d'orchestration. Chaque élément a été pensé pour refléter la mission du client : accessibilité, transparence, efficacité.",
        results: "Nous avons livré à $RAGE une plateforme anti-scam opérationnelle, cohérente et premium : Une identité forte, immédiatement reconnaissable. Un outil d'analyse capable de produire un rapport structuré en moins de 3 minutes. Une expérience centralisée sur un dashboard sécurisé, pour pouvoir retrouver tous les rapports générés par les utilisateurs. Une base technologique scalable, prête à évoluer vers un véritable infrastructure layer anti-scam du Web3.",
      },
    },
    links: [
      { label: { en: "Visit Website", fr: "Visiter le site" }, url: "https://www.get-rage.org/scorage" },
    ],
  },
  "totem": {
    title: "Totem",
    category: "Wireframing - UX/UI Design",
    tags: {
      en: ["Design of multiple landing pages for Totem, a subsidiary of the Orange Group, featuring a modern and structured UI that highlights their telecom infrastructure solutions."],
      fr: ["Conception de plusieurs landing pages pour Totem, filiale du Groupe Orange, avec une UI moderne et structurée mettant en valeur leurs solutions d'infrastructure télécom."],
    },
    description: {
      en: "Design of multiple landing pages for Totem, a subsidiary of the Orange Group, featuring a modern and structured UI that highlights their telecom infrastructure solutions.",
      fr: "Conception de plusieurs landing pages pour Totem, filiale du Groupe Orange, avec une UI moderne et structurée mettant en valeur leurs solutions d'infrastructure télécom.",
    },
    details: {
      en: {
        overview: "Design of multiple landing pages for Totem, a subsidiary of the Orange Group, featuring a modern and structured UI that highlights their telecom infrastructure solutions.",
        challenge: "Creating cohesive landing pages that effectively communicate Totem's telecom infrastructure solutions while maintaining a modern and structured design approach.",
        solution: "We designed multiple landing pages with a modern and structured UI that effectively highlights Totem's telecom infrastructure solutions.",
        results: "A complete set of landing pages that effectively communicate Totem's telecom infrastructure solutions with a modern and structured design.",
      },
      fr: {
        overview: "Conception de plusieurs landing pages pour Totem, filiale du Groupe Orange, avec une UI moderne et structurée mettant en valeur leurs solutions d'infrastructure télécom.",
        challenge: "Créer des landing pages cohérentes qui communiquent efficacement les solutions d'infrastructure télécom de Totem tout en maintenant une approche de design moderne et structurée.",
        solution: "Nous avons conçu plusieurs landing pages avec une UI moderne et structurée qui met efficacement en valeur les solutions d'infrastructure télécom de Totem.",
        results: "Un ensemble complet de landing pages qui communiquent efficacement les solutions d'infrastructure télécom de Totem avec un design moderne et structuré.",
      },
    },
    links: [
      { label: { en: "View Project", fr: "Voir le projet" }, url: "#" },
    ],
  },
  "academie-mouvement": {
    title: "L'académie du Mouvement",
    category: "Wireframing - UX/UI Design",
    tags: {
      en: ["Production of five landing page mockups focused on wellness and fitness, including gym, swimming, relaxation, baby swimming, and specialized therapeutic spaces."],
      fr: ["Production de cinq maquettes de landing pages autour du bien-être et du sport, incluant fitness, natation, relaxation, bébé nageur et espace de soin spécialisé."],
    },
    description: {
      en: "Production of five landing page mockups focused on wellness and fitness, including gym, swimming, relaxation, baby swimming, and specialized therapeutic spaces.",
      fr: "Production de cinq maquettes de landing pages autour du bien-être et du sport, incluant fitness, natation, relaxation, bébé nageur et espace de soin spécialisé.",
    },
    details: {
      en: {
        overview: "Production of 5 landing page mockups on wellness & sports themes: fitness, swimming pool, relaxation, baby swimming and salt cave.",
        challenge: "Creating cohesive and modern landing pages for different wellness and sports services while maintaining a consistent visual identity.",
        solution: "We designed 5 distinct landing pages, each tailored to its specific theme while maintaining visual coherence across all pages.",
        results: "A complete set of landing page mockups that effectively communicate each service's unique value proposition while maintaining brand consistency.",
      },
      fr: {
        overview: "Production de 5 maquettes de landing pages sur les thèmes bien-être & sport : fitness, piscine, relaxation, bébé nageur et grotte de sel.",
        challenge: "Créer des landing pages cohérentes et modernes pour différents services de bien-être et de sport tout en maintenant une identité visuelle cohérente.",
        solution: "Nous avons conçu 5 landing pages distinctes, chacune adaptée à son thème spécifique tout en maintenant une cohérence visuelle sur toutes les pages.",
        results: "Un ensemble complet de maquettes de landing pages qui communiquent efficacement la proposition de valeur unique de chaque service tout en maintenant la cohérence de la marque.",
      },
    },
    links: [
      { label: { en: "View on Figma", fr: "Voir sur Figma" }, url: "https://www.figma.com/design/eU8n0KRnXlg5RDGsFZqRza/Academie-du-mouvement---Landings?node-id=9-1780&t=gXp5gFt5L2lfBJjG-1" },
    ],
  },
  "coming-soon": {
    title: "Coming soon",
    category: "Coming soon",
    tags: {
      en: ["A new project is coming soon, crafted to push the boundaries of experience and design."],
      fr: ["Un nouveau projet arrive bientôt, pensé pour repousser les limites en matière d'expérience et de design."],
    },
    description: {
      en: "A new project is coming soon, crafted to push the boundaries of experience and design.",
      fr: "Un nouveau projet arrive bientôt, pensé pour repousser les limites en matière d'expérience et de design.",
    },
    details: {
      en: {
        overview: "A new project is coming soon, crafted to push the boundaries of experience and design.",
        challenge: "Coming soon.",
        solution: "Coming soon.",
        results: "Coming soon.",
      },
      fr: {
        overview: "Un nouveau projet arrive bientôt, pensé pour repousser les limites en matière d'expérience et de design.",
        challenge: "Bientôt disponible.",
        solution: "Bientôt disponible.",
        results: "Bientôt disponible.",
      },
    },
  },
};

// ============================================
// MESSAGES i18n
// ============================================
const messages: Record<
  Language,
  {
    navbar: NavbarMessages;
    footer: FooterMessages;
    work: WorkMessages;
    project: {
      backToProjects: string;
      videoPresentation: string;
      overview: string;
      challenge: string;
      solution: string;
      results: string;
      otherProjects: string;
      projectNotFound: string;
      backToHome: string;
    };
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
    footer: {
      copyright: "© 2024 Studi.0x",
      tagline: "Design that users remember.",
      links: [
        { label: "GitHub", href: "https://github.com/0xCanet" },
        { label: "X.com", href: "https://x.com/0xCanet" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/jessy-h/" },
      ],
    },
    work: {
      title: "Other projects",
      subtitle: "More work where strategy meets craft.",
      cta: "View all projects",
      viewProject: "View Project",
      items: [
        {
          id: "sendo-market",
          title: "Sendo.Market",
          category: "WEB3 • UX/UI • BRANDING • VIDEO MAKING",
          tags: ["Creation of a strong brand identity and modern web design"],
          video: "/src/sendo-market-video.mp4",
        },
        {
          id: "scorage",
          title: "ScoRAGE",
          category: "BRANDING - WebDesign - Communication",
          tags: ["Full visual identity and website design"],
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
          tags: ["Production of 5 landing page mockups on wellness & sports themes: fitness, swimming pool, relaxation, baby swimming and salt cave."],
          image: "/images/backgrounds/academie-mouvement.png",
        },
        {
          id: "coming-soon",
          title: "Coming soon",
          category: "Coming soon",
          tags: ["Coming soon"],
        },
      ],
    },
    project: {
      backToProjects: "Back to projects",
      videoPresentation: "Project presentation.",
      overview: "Overview",
      challenge: "Challenge",
      solution: "Solution",
      results: "Results",
      otherProjects: "Other projects.",
      projectNotFound: "Project not found",
      backToHome: "Back to home",
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
    footer: {
      copyright: "© 2024 Studi.0x",
      tagline: "Du design dont on se souvient.",
      links: [
        { label: "GitHub", href: "https://github.com/0xCanet" },
        { label: "X.com", href: "https://x.com/0xCanet" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/jessy-h/" },
      ],
    },
    work: {
      title: "Nos autres projets",
      subtitle: "Plus de projets où stratégie et savoir-faire se rencontrent.",
      cta: "Voir tous les projets",
      viewProject: "Voir le projet",
      items: [
        {
          id: "sendo-market",
          title: "Sendo.Market",
          category: "WEB3 • UX/UI • BRANDING • VIDEO MAKING",
          tags: ["Création d'une identité impactante & WebDesign"],
          video: "/src/sendo-market-video.mp4",
        },
        {
          id: "scorage",
          title: "ScoRAGE",
          category: "BRANDING - WebDesign - Communication",
          tags: ["Création d'identité et création d'un site internet."],
          image: "/images/backgrounds/scorage-banner.png",
        },
        {
          id: "totem",
          title: "Totem",
          category: "Wireframing - UX/UI Design",
          tags: ["Conception de plusieurs landing pages pour Totem (filiale du Groupe Orange), mettant en avant leurs services d'infrastructure télécom avec une UI moderne et structurée."],
          image: "/images/backgrounds/totem-mockup.png",
        },
        {
          id: "academie-mouvement",
          title: "L'académie du Mouvement",
          category: "Wireframing - UX/UI Design",
          tags: ["Production de 5 maquettes de landing pages sur les thèmes bien-être & sport : fitness, piscine, relaxation, bébé nageur et grotte de sel."],
          image: "/images/backgrounds/academie-mouvement.png",
        },
        {
          id: "coming-soon",
          title: "Coming soon",
          category: "Coming soon",
          tags: ["Bientôt disponible"],
        },
      ],
    },
    project: {
      backToProjects: "Retour aux projets",
      videoPresentation: "Présentation du projet.",
      overview: "Vue d'ensemble",
      challenge: "Défi",
      solution: "Solution",
      results: "Résultats",
      otherProjects: "Nos autres projets.",
      projectNotFound: "Projet introuvable",
      backToHome: "Retour à l'accueil",
    },
  },
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function ProjectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [language, setLanguage] = useState<Language>("en");
  const t = messages[language];
  
  const project = projects[slug];
  
  // Filter out current project from "other projects" list
  const otherProjects = {
    ...t.work,
    items: t.work.items.filter((item) => item.id !== slug),
  };
  
  if (!project) {
    return (
      <div className="min-h-screen bg-[#F0EEE9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading text-[#0E0E0E] mb-4">{t.project.projectNotFound}</h1>
          <Link href="/" className="btn btn-primary">
            {t.project.backToHome}
          </Link>
        </div>
      </div>
    );
  }

  const projectDetails = project.details[language];

  return (
    <div className="min-h-screen bg-[#F0EEE9] overflow-x-hidden">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        messages={t.navbar}
        forceLightMode={true}
      />

      <main>
        {/* Hero Section */}
        <section className="pt-48 md:pt-56 pb-12 md:pb-16 px-5 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-[#0E0E0E]/60 hover:text-[#FF7A30] transition-colors font-body text-sm mb-8"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {t.project.backToProjects}
              </Link>
            </motion.div>

            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#FF7A30] text-xs font-body uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
              <h1 className="section-title text-[#0E0E0E] mb-4 font-heading font-bold">
                {project.title}
                <span className="text-[#FF7A30]">.</span>
              </h1>
              <div className="text-lg md:text-xl text-[#0E0E0E]/70 max-w-3xl leading-relaxed font-body">
                {slug === "scorage" ? (
                  formatDescriptionWithLinks(project.description[language], language)
                ) : (
                  <TextWithOrangeDots>{project.description[language]}</TextWithOrangeDots>
                )}
              </div>
            </motion.div>

            {/* Project Links */}
            {project.links && project.links.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                {project.links.map((link, linkIndex) => {
                  const linkLabel = typeof link.label === 'string' ? link.label : link.label[language];
                  return (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {linkLabel}
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  );
                })}
              </motion.div>
            )}

            {/* PDF Viewer - Only for ScoRAGE */}
            {slug === "scorage" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8"
              >
                <PDFViewer fileUrl="/src/Scorage_pitch_deck_FR.pdf" />
              </motion.div>
            )}
          </div>
        </section>

        {/* Video Presentation Section */}
        {project.video && project.videoDescription && (
          <section className="py-12 md:py-16 px-5 md:px-8 bg-[#F0EEE9]">
            <div className="max-w-[1200px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="mb-6"
              >
                <h1 className="section-title text-[#0E0E0E] mb-4 font-heading font-bold">
                  {t.project.videoPresentation.replace(/\.$/, '')}
                  <span className="text-[#FF7A30]">.</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-2xl overflow-hidden bg-[#0E0E0E] mb-4"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-3xl mb-8"
              >
                <p className="text-[#0E0E0E]/70 leading-relaxed font-body text-base md:text-lg">
                  {project.videoDescription[language].split(/(VEO3\.1|After Effects|Final Cut Pro)/).map((part, index) => {
                    if (part === "VEO3.1" || part === "After Effects" || part === "Final Cut Pro") {
                      return (
                        <span key={index} className="font-bold text-[#FF7A30]">
                          {part}
                        </span>
                      );
                    }
                    return <span key={index}>{part}</span>;
                  })}
                </p>
              </motion.div>

              {/* PDF Viewer - Only for Sendo.Market */}
              {slug === "sendo-market" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="mt-8"
                >
                  <PDFViewer fileUrl="/src/Branding-kit_SENDO_v1-1_EN.pdf" />
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* Project Details */}
        <section className="py-12 md:py-16 px-5 md:px-8 bg-[#F0EEE9]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-[#FF7A30] text-sm font-body uppercase tracking-wider mb-3">
                  {t.project.overview}
                </h3>
                <p className="text-[#0E0E0E]/70 leading-relaxed font-body">
                  {slug === "scorage" ? (
                    formatScorageText(projectDetails.overview, [
                      "\\$RAGE",
                      "ScoRage™",
                      "F\\.I\\.R\\.E\\.S\\.",
                      "Web3",
                      "SaaS",
                      "3 minutes",
                      "interactive report",
                      "rapport interactif"
                    ])
                  ) : (
                    <TextWithOrangeDots>{projectDetails.overview}</TextWithOrangeDots>
                  )}
                </p>
              </motion.div>

              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h3 className="text-[#FF7A30] text-sm font-body uppercase tracking-wider mb-3">
                  {t.project.challenge}
                </h3>
                <p className="text-[#0E0E0E]/70 leading-relaxed font-body">
                  {slug === "scorage" ? (
                    formatScorageText(projectDetails.challenge, [
                      "\\$RAGE",
                      "Web3",
                      "non-technical users",
                      "utilisateurs non techniques",
                      "double défi",
                      "double challenge"
                    ])
                  ) : (
                    <TextWithOrangeDots>{projectDetails.challenge}</TextWithOrangeDots>
                  )}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-[#FF7A30] text-sm font-body uppercase tracking-wider mb-3">
                  {t.project.solution}
                </h3>
                <p className="text-[#0E0E0E]/70 leading-relaxed font-body">
                  {slug === "scorage" ? (
                    formatScorageText(projectDetails.solution, [
                      "$RAGE",
                      "ScoRage™",
                      "AI",
                      "IA",
                      "API",
                      "APIs",
                      "10 API",
                      "agent-based",
                      "agent-based backend",
                      "backend agent-based",
                      "visual identity",
                      "identité visuelle",
                      "UX/UI",
                      "webapp",
                      "orchestrating"
                    ])
                  ) : (
                    <TextWithOrangeDots>{projectDetails.solution}</TextWithOrangeDots>
                  )}
                </p>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h3 className="text-[#FF7A30] text-sm font-body uppercase tracking-wider mb-3">
                  {t.project.results}
                </h3>
                <p className="text-[#0E0E0E]/70 leading-relaxed font-body">
                  {slug === "scorage" ? (
                    formatScorageText(projectDetails.results, [
                      "\\$RAGE",
                      "3 minutes",
                      "dashboard",
                      "Web3",
                      "infrastructure layer",
                      "anti-scam platform",
                      "plateforme anti-scam",
                      "structured report",
                      "rapport structuré"
                    ])
                  ) : (
                    <TextWithOrangeDots>{projectDetails.results}</TextWithOrangeDots>
                  )}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Other Projects Section */}
        <section className="py-12 md:py-16 px-5 md:px-8 bg-[#F0EEE9]">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <h1 className="section-title text-[#0E0E0E] mb-4 font-heading font-bold">
                {t.project.otherProjects.replace(/\.$/, '')}
                <span className="text-[#FF7A30]">.</span>
              </h1>
            </motion.div>
            {otherProjects.items.length > 0 && (
              <WorkSection messages={otherProjects} hideHeader={true} />
            )}
          </div>
        </section>
      </main>

      <Footer messages={t.footer} />
    </div>
  );
}

