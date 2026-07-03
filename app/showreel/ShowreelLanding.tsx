"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar, type NavbarLink, type NavbarMessages } from "../components/Navbar";
import { Footer, type FooterMessages } from "../components/Footer";
import { ConsentBanner } from "../components/ConsentBanner";
import { SmoothScrollEffects } from "../components/SmoothScrollEffects";
import { TextWithOrangeDots } from "../components/TextWithOrangeDots";

type Language = "en" | "fr";

interface LocalVideoItem {
  title: string;
  eyebrow: string;
  description: string;
  src: string;
}

interface YouTubeVideoItem {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  publishedAt: string;
  duration: string;
}

interface LightroomGallery {
  title: string;
  eyebrow: string;
  date: string;
  href: string;
  thumbnail: string;
  description: string;
}

const darkSectionIds = ["hero", "videos", "contact"];

const navLinks: Record<Language, NavbarLink[]> = {
  en: [
    { href: "/", label: "Webdesign" },
    { href: "#videos", label: "Videos" },
    { href: "#photos", label: "Photos" },
  ],
  fr: [
    { href: "/", label: "Webdesign" },
    { href: "#videos", label: "Vidéos" },
    { href: "#photos", label: "Photos" },
  ],
};

const navbarMessages: Record<Language, NavbarMessages> = {
  en: {
    logo: "Studi.0x",
    links: {
      services: "Services",
      work: "Projects",
      pricing: "Offers",
      about: "About",
      letsTalk: "Let's talk",
    },
    contact: "Contact",
  },
  fr: {
    logo: "Studi.0x",
    links: {
      services: "Services",
      work: "Projets",
      pricing: "Offres",
      about: "À propos",
      letsTalk: "Discuter",
    },
    contact: "Contact",
  },
};

const footerMessages: Record<Language, FooterMessages> = {
  en: {
    copyright: "© 2025 Studi.0x. All rights reserved.",
    tagline: "Video, photo and webdesign direction",
    quickLinksTitle: "Showreel",
    socialLinksTitle: "Social",
    quickLinks: [
      { label: "Webdesign", href: "/" },
      { label: "Videos", href: "#videos" },
      { label: "Photos", href: "#photos" },
      { label: "Contact", href: "#contact" },
    ],
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jessy-h/" },
      { label: "X/Twitter", href: "https://x.com/0xcanet" },
      { label: "Email", href: "mailto:contact@studi0x.agency" },
    ],
  },
  fr: {
    copyright: "© 2025 Studi.0x. Tous droits réservés.",
    tagline: "Direction vidéo, photo et webdesign",
    quickLinksTitle: "Showreel",
    socialLinksTitle: "Réseaux",
    quickLinks: [
      { label: "Webdesign", href: "/" },
      { label: "Vidéos", href: "#videos" },
      { label: "Photos", href: "#photos" },
      { label: "Contact", href: "#contact" },
    ],
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jessy-h/" },
      { label: "X/Twitter", href: "https://x.com/0xcanet" },
      { label: "Email", href: "mailto:contact@studi0x.agency" },
    ],
  },
};

const copy = {
  en: {
    skip: "Skip to main content",
    heroEyebrow: "Video / Photo / Art direction",
    heroTitle: "Images made to be watched, not explained.",
    heroSubtitle:
      "Films, short edits, product content and photo galleries for projects that need a sharper visual presence, from capture to web and social delivery.",
    heroPrimary: "Watch videos",
    heroSecondary: "View photos",
    heroSoundOn: "Enable sound",
    heroSoundOff: "Mute sound",
    videosEyebrow: "Films",
    videosTitle: "Video formats for products, events and online presence.",
    videosIntro:
      "A selection of product films, event edits, SaaS content and YouTube formats, ordered from newest to oldest.",
    importedLabel: "Featured project",
    youtubeLabel: "Published films",
    photosEyebrow: "Still images",
    photosTitle: "Photo series for events, teams and field moments.",
    photosIntro:
      "Each gallery opens the full Lightroom selection, ready to browse and share.",
    lightroomLabel: "Open gallery",
    contactEyebrow: "Available formats",
    contactTitle: "A launch film, a portrait series, event coverage.",
    contactBody:
      "Art direction, shooting, editing and final formats for websites, decks and social channels.",
    contactCta: "Write an email",
  },
  fr: {
    skip: "Aller au contenu principal",
    heroEyebrow: "Vidéo / Photo / Direction artistique",
    heroTitle: "Des images à regarder, pas à expliquer.",
    heroSubtitle:
      "Films, formats courts, contenus produit et galeries photo pour donner à un projet, un événement ou une marque une présence visuelle plus nette.",
    heroPrimary: "Voir les vidéos",
    heroSecondary: "Voir les photos",
    heroSoundOn: "Activer le son",
    heroSoundOff: "Couper le son",
    videosEyebrow: "Films",
    videosTitle: "Des formats vidéo pour produits, événements et présence en ligne.",
    videosIntro:
      "Une sélection de films produit, edits événementiels, contenus SaaS et formats YouTube, classée du plus récent au plus ancien.",
    importedLabel: "Projet mis en avant",
    youtubeLabel: "Films publiés",
    photosEyebrow: "Images fixes",
    photosTitle: "Séries photo pour événements, équipes et moments terrain.",
    photosIntro:
      "Chaque galerie ouvre la sélection Lightroom complète, prête à parcourir et partager.",
    lightroomLabel: "Ouvrir la galerie",
    contactEyebrow: "Formats possibles",
    contactTitle: "Un film de lancement, une série portrait, une couverture événement.",
    contactBody:
      "Direction artistique, tournage, montage et déclinaisons finales pour site, deck et réseaux.",
    contactCta: "Écrire un email",
  },
} satisfies Record<Language, Record<string, string>>;

const localVideos: Record<Language, LocalVideoItem[]> = {
  en: [
    {
      title: "Sendo.Market",
      eyebrow: "Motion design / AI video generation / edit",
      description:
        "A product film combining AI-generated sequences, motion design and editing to set the Sendo.Market universe in a few sharp shots.",
      src: "/src/sendo-market-video.mp4",
    },
  ],
  fr: [
    {
      title: "Sendo.Market",
      eyebrow: "Motion design / génération IA vidéo / montage",
      description:
        "Film produit mêlant scènes générées par IA, motion design et montage pour poser l'univers Sendo.Market en quelques plans nets.",
      src: "/src/sendo-market-video.mp4",
    },
  ],
};

const youtubeVideos: Record<Language, YouTubeVideoItem[]> = {
  en: [
    {
      id: "lu85KICxL3U",
      title: "Drifting Family K. Trosset short clip",
      eyebrow: "Automotive / drift / short format",
      description: "A short drift clip built around speed, close framing and the raw energy of the run.",
      publishedAt: "2026-05-31",
      duration: "1:01",
    },
    {
      id: "9WdB9H2ws2k",
      title: "Drifting family guillaume",
      eyebrow: "Automotive / drift / music edit",
      description: "A music-led automotive edit with tight rhythm, track action and a more atmospheric pace.",
      publishedAt: "2026-02-28",
      duration: "0:34",
    },
    {
      id: "gDJ_GhOys5w",
      title: "J'ai (enfin) attaqué mon garage...",
      eyebrow: "Long format / garage / documentary edit",
      description: "A long-form episode turning a garage reset into a filmed workshop story, with pacing made for YouTube retention.",
      publishedAt: "2025-06-09",
      duration: "18:28",
    },
    {
      id: "xyly0FfNtdY",
      title: "Selfbar - BlockExpo 2024",
      eyebrow: "Event / aftermovie / product booth",
      description: "A short aftermovie of Selfbar's BlockExpo presence, between booth moments, product demos and conversations on site.",
      publishedAt: "2024-10-07",
      duration: "1:04",
    },
    {
      id: "VBLQNq2u2dk",
      title: "1978 - Hello world.",
      eyebrow: "Experimental / internet homage",
      description: "A short conceptual film around the first line every developer meets: a simple idea, treated as a visual object.",
      publishedAt: "2024-07-23",
      duration: "0:52",
    },
    {
      id: "h5eq8v00iiA",
      title: "Public ViiBE Report for asynchronous collaborations",
      eyebrow: "Product video / SaaS / support workflow",
      description: "A SaaS product video designed to make an asynchronous support workflow clear in under two minutes.",
      publishedAt: "2022-06-13",
      duration: "1:12",
    },
    {
      id: "BH7O4EGnG30",
      title: "ViiBE integrated in IBM Maximo - interview",
      eyebrow: "Product interview / IBM Maximo / SaaS",
      description: "Interview format and product demonstration around visual support inside IBM Maximo.",
      publishedAt: "2021-10-12",
      duration: "2:19",
    },
    {
      id: "QZUgiDColqQ",
      title: "IBM includes ViiBE in its offer",
      eyebrow: "Corporate video / SaaS partnership",
      description: "Partnership film presenting a remote-diagnostic use case for maintenance and support teams.",
      publishedAt: "2021-10-12",
      duration: "4:18",
    },
    {
      id: "bZXj8_eULWk",
      title: "video horizon 2021 v7",
      eyebrow: "Archive / brand film",
      description: "Brand-film archive focused on a clean corporate rhythm and direct visual messaging.",
      publishedAt: "2021-05-03",
      duration: "2:57",
    },
    {
      id: "LS3mF_4xRH8",
      title: "EPK19 - ElektricPark after movie + backstage",
      eyebrow: "Festival / aftermovie / backstage",
      description: "Festival aftermovie and backstage edit, built from live energy, artist moments and fast event coverage.",
      publishedAt: "2019-09-08",
      duration: "3:05",
    },
  ],
  fr: [
    {
      id: "lu85KICxL3U",
      title: "Drifting Family K. Trosset short clip",
      eyebrow: "Automobile / drift / format court",
      description: "Clip drift court construit sur la vitesse, les cadrages serrés et l'énergie brute du run.",
      publishedAt: "2026-05-31",
      duration: "1:01",
    },
    {
      id: "9WdB9H2ws2k",
      title: "Drifting family guillaume",
      eyebrow: "Automobile / drift / music edit",
      description: "Edit automobile musical, avec un rythme resserré et de l'action sur piste.",
      publishedAt: "2026-02-28",
      duration: "0:34",
    },
    {
      id: "gDJ_GhOys5w",
      title: "J'ai (enfin) attaqué mon garage...",
      eyebrow: "Format long / garage / documentaire",
      description: "Format long qui transforme un reset de garage en épisode atelier, avec un rythme pensé pour YouTube.",
      publishedAt: "2025-06-09",
      duration: "18:28",
    },
    {
      id: "xyly0FfNtdY",
      title: "Selfbar - BlockExpo 2024",
      eyebrow: "Événement / aftermovie / présence stand",
      description: "Petit aftermovie de la présence de Selfbar à BlockExpo, entre stand, démo produit et échanges sur place.",
      publishedAt: "2024-10-07",
      duration: "1:04",
    },
    {
      id: "VBLQNq2u2dk",
      title: "1978 - Hello world.",
      eyebrow: "Expérimental / hommage internet",
      description: "Film court autour de la première ligne que rencontre un développeur: une idée simple, traitée comme un objet visuel.",
      publishedAt: "2024-07-23",
      duration: "0:52",
    },
    {
      id: "h5eq8v00iiA",
      title: "Public ViiBE Report for asynchronous collaborations",
      eyebrow: "Vidéo produit / SaaS / support",
      description: "Vidéo produit SaaS pensée pour rendre lisible un workflow de support asynchrone en moins de deux minutes.",
      publishedAt: "2022-06-13",
      duration: "1:12",
    },
    {
      id: "BH7O4EGnG30",
      title: "ViiBE integrated in IBM Maximo - interview",
      eyebrow: "Interview produit / IBM Maximo / SaaS",
      description: "Format interview et démonstration produit autour du support visuel intégré à IBM Maximo.",
      publishedAt: "2021-10-12",
      duration: "2:19",
    },
    {
      id: "QZUgiDColqQ",
      title: "IBM includes ViiBE in its offer",
      eyebrow: "Corporate / partenariat SaaS",
      description: "Film de partenariat présentant un cas d'usage de diagnostic à distance pour les équipes maintenance et support.",
      publishedAt: "2021-10-12",
      duration: "4:18",
    },
    {
      id: "bZXj8_eULWk",
      title: "video horizon 2021 v7",
      eyebrow: "Archive / film de marque",
      description: "Archive film de marque, centrée sur un rythme corporate net et un message visuel direct.",
      publishedAt: "2021-05-03",
      duration: "2:57",
    },
    {
      id: "LS3mF_4xRH8",
      title: "EPK19 - ElektricPark after movie + backstage",
      eyebrow: "Festival / aftermovie / backstage",
      description: "Aftermovie festival et backstage, construit entre énergie live, moments artistes et couverture événementielle rapide.",
      publishedAt: "2019-09-08",
      duration: "3:05",
    },
  ],
};

const lightroomGalleries: Record<Language, LightroomGallery[]> = {
  en: [
    {
      title: "Les bénévoles - CXR 2026",
      eyebrow: "Lightroom gallery / event",
      date: "2026-01-18",
      href: "https://adobe.ly/49rzuJV",
      thumbnail:
        "https://photos.adobe.io/v2/spaces/048bbc0f9a21428aab80bd3f17f35630/assets/4dc4003763fc46689d50e27a894d5b99/revisions/738b28cdbd88451ba7c98131217e0c1e/renditions/e6e80586538a3c6373c058e9638cbed9?api_key=LightroomMobileWeb1",
      description: "Team portraits, field moments and the people who make the event happen behind the scenes.",
    },
    {
      title: "Kryptosphere - Ieseg 2025",
      eyebrow: "Lightroom gallery / event",
      date: "2025-11-07",
      href: "https://adobe.ly/3JRGeXt",
      thumbnail:
        "https://photos.adobe.io/v2/spaces/491bdac6fc36491db611fc801ee56c7e/assets/fe1202d7852b491a9855c76a6b48c321/revisions/64ba01ae02cb55d5b327f5ed3b9574a8/renditions/70ed147e1ce8fd664b661645a719fadf?api_key=LightroomMobileWeb1",
      description: "Talks, networking and candid moments from a tech community event.",
    },
    {
      title: "Course d'orientation - The League 2025",
      eyebrow: "Lightroom gallery / sport",
      date: "2025-10-30",
      href: "https://adobe.ly/4qB3ARw",
      thumbnail:
        "https://photos.adobe.io/v2/spaces/686e10e635204648976150bd9f7be0bf/assets/a2c0f079b2194a9ea96059762799a765/revisions/5fefed92ba84436da6b8cc4a7b7b851c/renditions/19771b70f380afe2a0663be78aca35a5?api_key=LightroomMobileWeb1",
      description: "Outdoor action, starts, checkpoints and portraits from The League 2025.",
    },
    {
      title: "Selfbar - BlockExpo 2024",
      eyebrow: "Lightroom gallery / conference",
      date: "2024-10-07",
      href: "https://adobe.ly/4gWmU7i",
      thumbnail:
        "https://photos.adobe.io/v2/spaces/65cf9e8e9e794a6eb155cbceff23c895/assets/719e12a060a64cd8beb67ef3220cdb48/revisions/0d560aa64b82fa0d46541492215fa4f1/renditions/b4771c4503ae3042c4fbadecff262307?api_key=LightroomMobileWeb1",
      description: "Booth presence, product moments and event interactions during BlockExpo.",
    },
  ],
  fr: [
    {
      title: "Les bénévoles - CXR 2026",
      eyebrow: "Galerie Lightroom / événement",
      date: "2026-01-18",
      href: "https://adobe.ly/49rzuJV",
      thumbnail:
        "https://photos.adobe.io/v2/spaces/048bbc0f9a21428aab80bd3f17f35630/assets/4dc4003763fc46689d50e27a894d5b99/revisions/738b28cdbd88451ba7c98131217e0c1e/renditions/e6e80586538a3c6373c058e9638cbed9?api_key=LightroomMobileWeb1",
      description: "Portraits d'équipe, moments terrain et coulisses de celles et ceux qui font vivre l'événement.",
    },
    {
      title: "Kryptosphere - Ieseg 2025",
      eyebrow: "Galerie Lightroom / événement",
      date: "2025-11-07",
      href: "https://adobe.ly/3JRGeXt",
      thumbnail:
        "https://photos.adobe.io/v2/spaces/491bdac6fc36491db611fc801ee56c7e/assets/fe1202d7852b491a9855c76a6b48c321/revisions/64ba01ae02cb55d5b327f5ed3b9574a8/renditions/70ed147e1ce8fd664b661645a719fadf?api_key=LightroomMobileWeb1",
      description: "Conférences, networking et instants pris sur le vif autour d'un événement tech communautaire.",
    },
    {
      title: "Course d'orientation - The League 2025",
      eyebrow: "Galerie Lightroom / sport",
      date: "2025-10-30",
      href: "https://adobe.ly/4qB3ARw",
      thumbnail:
        "https://photos.adobe.io/v2/spaces/686e10e635204648976150bd9f7be0bf/assets/a2c0f079b2194a9ea96059762799a765/revisions/5fefed92ba84436da6b8cc4a7b7b851c/renditions/19771b70f380afe2a0663be78aca35a5?api_key=LightroomMobileWeb1",
      description: "Action outdoor, départs, checkpoints et portraits de participants pour The League 2025.",
    },
    {
      title: "Selfbar - BlockExpo 2024",
      eyebrow: "Galerie Lightroom / conférence",
      date: "2024-10-07",
      href: "https://adobe.ly/4gWmU7i",
      thumbnail:
        "https://photos.adobe.io/v2/spaces/65cf9e8e9e794a6eb155cbceff23c895/assets/719e12a060a64cd8beb67ef3220cdb48/revisions/0d560aa64b82fa0d46541492215fa4f1/renditions/b4771c4503ae3042c4fbadecff262307?api_key=LightroomMobileWeb1",
      description: "Présence stand, moments produit et rencontres pendant BlockExpo.",
    },
  ],
};

function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "fr";
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function scrollToHash(hash: string) {
  const element = document.querySelector<HTMLElement>(hash);
  if (!element) return;

  if (window.studioxLenis) {
    window.studioxLenis.scrollTo(element, { offset: -72, duration: 1.35 });
  } else {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function formatDate(date: string, language: Language) {
  return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function youTubeEmbedUrl(id: string, autoplay = false) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });

  if (autoplay) {
    params.set("autoplay", "1");
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function youTubeThumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function youTubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

function SectionIntro({
  eyebrow,
  title,
  intro,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  inverted?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 flex w-full max-w-7xl flex-col gap-5 px-5 sm:px-8 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-4xl">
        <p
          className="mb-4 font-body text-xs uppercase tracking-[0.18em]"
          style={{ color: inverted ? "rgba(240, 238, 233, 0.55)" : "rgba(14, 14, 14, 0.4)" }}
        >
          {eyebrow}
        </p>
        <h2
          className="font-heading text-4xl font-bold leading-[0.98] md:text-6xl"
          style={{ color: inverted ? "#F0EEE9" : "#0E0E0E" }}
        >
          <TextWithOrangeDots>{title.replace(/\.$/, "")}</TextWithOrangeDots>
          <span className="text-accent">.</span>
        </h2>
      </div>
      <p
        className="max-w-xl font-body text-sm leading-relaxed md:text-base"
        style={{ color: inverted ? "rgba(240, 238, 233, 0.68)" : "rgba(14, 14, 14, 0.6)" }}
      >
        {intro}
      </p>
    </div>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 9v6h4l5 4V5L8 9H4z" />
      {muted ? (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9l4 4m0-4l-4 4" />
        </>
      ) : (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 9.5a4 4 0 010 5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7a7 7 0 010 10" />
        </>
      )}
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function HeroTitle({ language }: { language: Language }) {
  if (language === "fr") {
    return (
      <>
        Des images à <span className="text-accent">regarder</span>, pas à expliquer
        <span className="text-accent">.</span>
      </>
    );
  }

  return (
    <>
      Images made to be <span className="text-accent">watched</span>, not explained
      <span className="text-accent">.</span>
    </>
  );
}

function LocalVideoPanel({ item }: { item: LocalVideoItem }) {
  return (
    <article className="group md:col-span-2">
      <div className="project-depth-card relative aspect-video overflow-hidden rounded-lg bg-[#0E0E0E]">
        <video
          controls
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.015]"
          aria-label={item.title}
        >
          <source src={item.src} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,122,48,0.2),transparent_38%)] opacity-70" />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <p className="font-body text-[11px] uppercase tracking-[0.18em]" style={{ color: "#FF7A30" }}>
          {item.eyebrow}
        </p>
        <h3 className="font-heading text-2xl font-semibold" style={{ color: "#F0EEE9" }}>
          {item.title}
        </h3>
        <p className="max-w-2xl font-body text-sm leading-relaxed" style={{ color: "rgba(240, 238, 233, 0.62)" }}>
          {item.description}
        </p>
      </div>
    </article>
  );
}

function YouTubePanel({ item, language }: { item: YouTubeVideoItem; language: Language }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playLabel = language === "fr" ? `Lire ${item.title}` : `Play ${item.title}`;

  return (
    <article className="group">
      <div className="project-depth-card relative aspect-video overflow-hidden rounded-lg bg-[#0E0E0E]">
        {isPlaying ? (
          <iframe
            src={youTubeEmbedUrl(item.id, true)}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={playLabel}
            className="relative h-full w-full cursor-pointer overflow-hidden text-left"
          >
            <Image
              src={youTubeThumbnailUrl(item.id)}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
              quality={85}
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/82 via-[#0E0E0E]/16 to-[#0E0E0E]/12" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F0EEE9]/28 bg-[#0E0E0E]/42 text-[#F0EEE9] shadow-[0_16px_42px_rgba(0,0,0,0.34)] backdrop-blur transition duration-300 group-hover:scale-105 group-hover:border-[#FF7A30]/70 group-hover:text-[#FF7A30]">
                <PlayIcon />
              </span>
            </div>
            <div className="absolute bottom-4 right-4 rounded-full border border-[#F0EEE9]/18 bg-[#0E0E0E]/44 px-3 py-1 font-body text-[11px] uppercase tracking-[0.14em] text-[#F0EEE9]/80 backdrop-blur">
              {item.duration}
            </div>
          </button>
        )}
      </div>
      <div className="mt-4">
        <p className="mb-2 font-body text-[11px] uppercase tracking-[0.18em]" style={{ color: "#FF7A30" }}>
          {item.eyebrow}
        </p>
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[11px] uppercase tracking-[0.14em]" style={{ color: "rgba(240, 238, 233, 0.48)" }}>
          <span>{formatDate(item.publishedAt, language)}</span>
          <span>{item.duration}</span>
          <a href={youTubeWatchUrl(item.id)} target="_blank" rel="noopener noreferrer" className="transition hover:text-accent">
            YouTube
          </a>
        </div>
        <h3 className="font-heading text-2xl font-semibold" style={{ color: "#F0EEE9" }}>
          {item.title}
        </h3>
        <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed" style={{ color: "rgba(240, 238, 233, 0.62)" }}>
          {item.description}
        </p>
      </div>
    </article>
  );
}

function LightroomCard({
  gallery,
  language,
  label,
}: {
  gallery: LightroomGallery;
  language: Language;
  label: string;
}) {
  return (
    <a
      href={gallery.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="project-depth-card overflow-hidden rounded-lg bg-[#0E0E0E]">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11]">
          <Image
            src={gallery.thumbnail}
            alt={gallery.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
            quality={85}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/92 via-[#0E0E0E]/22 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
            <p className="mb-2 font-body text-[11px] uppercase tracking-[0.18em]" style={{ color: "#FF7A30" }}>
              {gallery.eyebrow}
            </p>
            <h3 className="font-heading text-2xl font-semibold" style={{ color: "#F0EEE9" }}>
              {gallery.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[11px] uppercase tracking-[0.14em]" style={{ color: "rgba(240, 238, 233, 0.58)" }}>
              <span>{formatDate(gallery.date, language)}</span>
              <span>{label}</span>
            </div>
            <p className="max-w-xl font-body text-sm leading-relaxed" style={{ color: "rgba(240, 238, 233, 0.76)" }}>
              {gallery.description}
            </p>
          </div>
        </div>
      </article>
    </a>
  );
}

export function ShowreelLanding() {
  const shouldReduceMotion = useReducedMotion();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [language, setLanguage] = useState<Language>("fr");
  const [heroMuted, setHeroMuted] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setLanguage(detectBrowserLanguage());
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const t = copy[language];
  const videos = localVideos[language];
  const youtube = youtubeVideos[language];
  const galleries = lightroomGalleries[language];

  const heroTags = useMemo(
    () => t.heroEyebrow.split(" / "),
    [t.heroEyebrow]
  );

  const toggleHeroSound = () => {
    const video = heroVideoRef.current;
    if (!video) return;

    const nextMuted = !heroMuted;
    video.muted = nextMuted;
    video.volume = nextMuted ? 0 : 0.8;

    if (!nextMuted) {
      void video.play().catch(() => {
        video.muted = true;
        setHeroMuted(true);
      });
    }

    setHeroMuted(nextMuted);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-text">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120] focus:rounded-lg focus:bg-[#F0EEE9] focus:px-4 focus:py-2 focus:text-[#0E0E0E]"
      >
        {t.skip}
      </a>

      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        messages={navbarMessages[language]}
        navLinks={navLinks[language]}
        darkSectionIds={darkSectionIds}
        contactHref="#contact"
      />

      <SmoothScrollEffects />

      <main id="main">
        <section id="hero" className="relative h-screen min-h-[680px] overflow-hidden bg-[#0E0E0E]">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Showreel background video"
          >
            <source src="/src/sendo-market-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/42 to-[#0E0E0E]/12" />
          <div className="absolute inset-x-0 top-0 z-10 h-32 bg-[#0E0E0E]" />
          <div className="absolute inset-x-0 top-0 z-10 h-80 bg-gradient-to-b from-[#0E0E0E] via-[#0E0E0E]/86 to-transparent" />
          <div className="hero-kinetic-grid" aria-hidden="true" />
          <div className="hero-scanline" aria-hidden="true" />
          <div className="hero-scroll-bloom" aria-hidden="true" />

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-x-0 bottom-0 z-20 px-5 pb-12 sm:px-8 md:pb-16 lg:px-[73px]"
          >
            <div className="max-w-6xl">
              <div className="mb-6 flex flex-wrap gap-2">
                {heroTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#F0EEE9]/18 px-3 py-1.5 font-body text-[11px] uppercase tracking-[0.16em] text-[#F0EEE9]/74 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="max-w-5xl font-heading text-5xl font-bold leading-[0.94] text-[#F0EEE9] md:text-7xl lg:text-8xl">
                <HeroTitle language={language} />
              </h1>
              <p
                className="mt-6 max-w-3xl font-body text-base leading-relaxed md:text-lg"
                style={{ color: "rgba(240, 238, 233, 0.86)" }}
              >
                {t.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToHash("#videos")}
                  className="cursor-pointer glass-pill-link glass-pill-link-standalone glass-pill-link-orange px-6 py-2.5 text-sm text-[#F0EEE9]"
                >
                  {t.heroPrimary}
                </button>
                <button
                  onClick={() => scrollToHash("#photos")}
                  className="cursor-pointer glass-pill-link glass-pill-link-standalone glass-pill-link-standalone-dark px-6 py-2.5 text-sm"
                >
                  {t.heroSecondary}
                </button>
                <button
                  type="button"
                  onClick={toggleHeroSound}
                  aria-pressed={!heroMuted}
                  className="cursor-pointer glass-pill-link glass-pill-link-standalone glass-pill-link-standalone-dark gap-2 px-5 py-2.5 text-sm"
                >
                  <SoundIcon muted={heroMuted} />
                  {heroMuted ? t.heroSoundOn : t.heroSoundOff}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="videos" className="bg-[#0E0E0E] py-14 text-[#F0EEE9] md:py-20">
          <SectionIntro
            eyebrow={t.videosEyebrow}
            title={t.videosTitle}
            intro={t.videosIntro}
            inverted
          />

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <p className="mb-5 font-body text-xs uppercase tracking-[0.18em]" style={{ color: "rgba(240, 238, 233, 0.45)" }}>
              {t.importedLabel}
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              {videos.map((item) => (
                <LocalVideoPanel key={item.src} item={item} />
              ))}
            </div>

            <div className="mt-14">
              <p className="mb-5 font-body text-xs uppercase tracking-[0.18em]" style={{ color: "rgba(240, 238, 233, 0.45)" }}>
                {t.youtubeLabel}
              </p>
              <div className="grid gap-8 md:grid-cols-2">
                {youtube.map((item) => (
                  <YouTubePanel key={item.id} item={item} language={language} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="photos" className="bg-bg py-14 md:py-20">
          <SectionIntro
            eyebrow={t.photosEyebrow}
            title={t.photosTitle}
            intro={t.photosIntro}
          />

          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-5 sm:px-8 md:grid-cols-2">
            {galleries.map((gallery) => (
              <LightroomCard
                key={gallery.href}
                gallery={gallery}
                language={language}
                label={t.lightroomLabel}
              />
            ))}
          </div>
        </section>

        <section id="contact" className="bg-[#0E0E0E] py-16 text-[#F0EEE9] md:py-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 font-body text-xs uppercase tracking-[0.18em]" style={{ color: "rgba(240, 238, 233, 0.5)" }}>
                {t.contactEyebrow}
              </p>
              <h2 className="font-heading text-4xl font-bold leading-[0.98] md:text-6xl" style={{ color: "#F0EEE9" }}>
                <TextWithOrangeDots>{t.contactTitle.replace(/\.$/, "")}</TextWithOrangeDots>
                <span className="text-accent">.</span>
              </h2>
              <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed md:text-base" style={{ color: "rgba(240, 238, 233, 0.66)" }}>
                {t.contactBody}
              </p>
            </div>
            <Link
              href="mailto:contact@studi0x.agency?subject=Projet%20vid%C3%A9o%20%2F%20photo"
              className="glass-pill-link glass-pill-link-standalone glass-pill-link-orange w-fit px-6 py-2.5 text-sm text-[#F0EEE9]"
            >
              {t.contactCta}
            </Link>
          </div>
        </section>
      </main>

      <Footer messages={footerMessages[language]} />
      <ConsentBanner language={language} />
    </div>
  );
}
