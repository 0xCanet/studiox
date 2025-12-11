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
import { ConsentBanner } from "../../components/ConsentBanner";

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
import { projects } from "./projects-data";

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
// LANGUAGE DETECTION
// ============================================
const detectBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  
  const browserLang = navigator.language.toLowerCase();
  // Détecter si la langue commence par "fr" (fr, fr-FR, fr-CA, etc.)
  if (browserLang.startsWith("fr")) {
    return "fr";
  }
  // Par défaut, utiliser l'anglais
  return "en";
};

// ============================================
export default function ProjectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [language, setLanguage] = useState<Language>(() => detectBrowserLanguage());
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
      
      <ConsentBanner language={language} />
    </div>
  );
}

