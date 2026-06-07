export const projects: Record<string, {
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
  image?: string;
  brandKitPdf?: string;
  video?: string;
  videoDescription?: {
    en: string;
    fr: string;
  };
}> = {
  "enjeux": {
    title: "Enjeux",
    category: "Branding • UX/UI • WebDesign • AI Product",
    tags: {
      en: ["Complete brand identity, mascot system and website design for an autonomous AI agent dedicated to physiotherapists."],
      fr: ["Identité de marque complète, système mascotte et webdesign d'un agent IA autonome dédié aux kinésithérapeutes."],
    },
    description: {
      en: "End-to-end product and visual design for Enjeux, the first autonomous AI agent for physiotherapists in France: brand identity, mascot design, art direction, interface storytelling and a conversion-focused website.",
      fr: "Conception produit et direction artistique de A à Z pour Enjeux, le premier agent IA autonome pour kinés en France : identité, mascotte, storytelling d'interface et site orienté conversion.",
    },
    details: {
      en: {
        overview: "Enjeux helps physiotherapists automate patient follow-up through questionnaires, AI reports and smart alerts. The mission covered the full brand system and website experience: logo, logomark, mascot, character design, color palette, typography and interface narrative.",
        challenge: "The product had to make medical AI feel clear, trustworthy and immediately useful. The challenge was to combine clinical credibility with a friendly AI personality, while explaining automation, GDPR constraints and healthcare data flows without creating a cold or overly technical experience.",
        solution: "We designed a premium medical-tech identity built around primary blue #2883FF, deep navy #041A38, light interface neutrals and blue shades #3977CA / #60A5FA. Space Grotesk drives expressive headers, Inter keeps body content highly readable, and the robot mascot makes the AI agent tangible across onboarding, patient follow-up, alerts and product storytelling.",
        results: "A focused launch experience and complete brand kit that positions Enjeux as a credible AI product for healthcare professionals. The system gives the team a consistent visual language for the website, demos, investor material, future product screens and mascot-led communication.",
      },
      fr: {
        overview: "Enjeux aide les kinés à automatiser le suivi patient grâce aux questionnaires, rapports IA et alertes intelligentes. La mission a couvert tout le système de marque et l'expérience du site : logo, logomark, mascotte, character design, palette, typographies et récit d'interface.",
        challenge: "Il fallait rendre l'IA médicale claire, crédible et immédiatement utile. Le défi : associer la rigueur attendue dans la santé à une personnalité IA plus accessible, tout en expliquant l'automatisation, les contraintes RGPD et les flux de données sans tomber dans une expérience froide ou trop technique.",
        solution: "Nous avons construit une identité medical-tech premium autour du bleu primaire #2883FF, du navy profond #041A38, de neutres clairs et des nuances #3977CA / #60A5FA. Space Grotesk porte les titres, Inter assure la lisibilité des contenus, et la mascotte robot rend l'agent IA tangible dans l'onboarding, le suivi patient, les alertes et le storytelling produit.",
        results: "Une expérience de lancement lisible et un brand kit complet, qui positionnent Enjeux comme un produit IA crédible pour les professionnels de santé. Le système donne une base cohérente pour le site, les démos, les supports investisseurs, les futurs écrans produit et la communication portée par la mascotte.",
      },
    },
    links: [
      { label: { en: "Visit Website", fr: "Visiter le site" }, url: "https://enjeux.vercel.app/" },
      { label: { en: "View Brand Kit", fr: "Voir le brand kit" }, url: "/src/Enjeux_AI_Branding_Kit.pdf" },
    ],
    image: "/images/backgrounds/enjeux-mockup.png",
    brandKitPdf: "/src/Enjeux_AI_Branding_Kit.pdf",
  },
  "illoozz": {
    title: "Illoozz",
    category: "Branding • UX/UI • WebDesign • Gaming Product",
    tags: {
      en: ["Complete art direction and product website design for a collectible mystery box experience."],
      fr: ["Direction artistique complète et design produit d'une expérience mystery box collectible."],
    },
    description: {
      en: "Creation of the full visual direction and product website for Illoozz, a gaming mystery box experience combining collectible packs, transparent probabilities, blockchain verification and marketplace mechanics.",
      fr: "Création de toute la direction artistique et du site produit d'Illoozz, une expérience mystery box gaming mêlant packs collectibles, probabilités transparentes, vérification blockchain et mécanique marketplace.",
    },
    details: {
      en: {
        overview: "Illoozz is a collectible mystery box web app with pack opening, transparent probabilities, blockchain verification and marketplace flows. The work focused on making the experience feel playful, premium and product-ready from the first screen.",
        challenge: "The main challenge was to balance excitement and trust: the interface needed the energy of a gaming product while making probabilities, blockchain verification and purchase flows legible enough to feel credible.",
        solution: "We created a dark arcade-inspired art direction with red and gold highlights, pixel display typography, a persistent navigation rail, live product KPIs, pack cards and clear probability sections. The UI turns the central mystery box interaction into the emotional anchor of the product.",
        results: "A distinctive, memorable product experience with a strong visual universe, clear conversion paths for pack opening, and reassurance modules around transparency, verification and marketplace utility.",
      },
      fr: {
        overview: "Illoozz est une webapp de mystery box collectible avec ouverture de packs, probabilités transparentes, vérification blockchain et parcours marketplace. Le travail a consisté à rendre l'expérience ludique, premium et prête produit dès le premier écran.",
        challenge: "Le principal défi était d'équilibrer excitation et confiance : l'interface devait avoir l'énergie d'un produit gaming tout en rendant les probabilités, la vérification blockchain et les parcours d'achat suffisamment lisibles et crédibles.",
        solution: "Nous avons créé une direction artistique dark arcade, avec accents rouges et dorés, typographie pixel, navigation latérale persistante, KPIs live, cartes de packs et sections de probabilités claires. L'interaction autour de la mystery box devient l'ancrage émotionnel du produit.",
        results: "Une expérience produit distinctive et mémorable, avec un univers visuel fort, des chemins de conversion clairs pour l'ouverture de packs et des modules de réassurance autour de la transparence, de la vérification et de l'utilité marketplace.",
      },
    },
    links: [
      { label: { en: "Visit Website", fr: "Visiter le site" }, url: "https://illoozz.com/" },
    ],
    image: "/images/backgrounds/illoozz-mockup.png",
  },
  "totalenergies-lubrifiants": {
    title: "TotalEnergies",
    category: "Full Stack • UX/UI • WebDesign",
    tags: {
      en: ["Full stack Next.JS web calendar for internal communication and physical event management"],
      fr: ["Calendrier web full stack Next.JS pour la gestion de la communication interne et des évènements physiques"],
    },
    description: {
      en: "Design and development of an internal web calendar for the TotalEnergies Lubrifiants BU to manage team communications and physical events (seminars, etc.).",
      fr: "Conception et développement d'un calendrier web interne pour la BU TotalEnergies Lubrifiants afin de gérer la communication d'équipe et les évènements physiques (séminaires, etc.).",
    },
    details: {
      en: {
        overview: "A comprehensive internal solution to plan, organize, and track events for the TotalEnergies Lubrifiants BU. This full stack Next.JS project integrates UI/UX design, accessibility standards, and robust development.",
        challenge: "Centralize internal communication by providing a unified platform for physical event management, requiring database management, authentication, and calendar export functionalities.",
        solution: "We developed a full stack application using Next.JS, focusing on a clean, accessible design. Features include advanced filtering, simplified event creation/modification, global dashboard monitoring, and data exports.",
        results: "An effective, centralized tool that simplifies event tracking for multiple active directions, improving internal communication and organizational efficiency.",
      },
      fr: {
        overview: "Une solution interne complète pour planifier, organiser et suivre les événements de la BU TotalEnergies Lubrifiants. Ce projet full stack Next.JS intègre le design UI/UX, l'accessibilité et un développement robuste.",
        challenge: "Centraliser la communication interne en fournissant une plateforme unifiée pour la gestion des événements physiques, nécessitant la gestion de base de données, l'authentification et l'exportation de calendriers.",
        solution: "Nous avons développé une application full stack avec Next.JS, en nous concentrant sur un design épuré et accessible. Les fonctionnalités incluent le filtrage avancé, la création/modification simplifiée d'événements, un tableau de bord global et des exports de données.",
        results: "Un outil centralisé et efficace qui simplifie le suivi des événements pour plusieurs directions actives, améliorant la communication interne et l'efficacité organisationnelle.",
      },
    },
  },
  "blobb-io": {
    title: "Blobb.io",
    category: "WebDesign • Branding",
    tags: {
      en: ["Website redesign and brand image improvement"],
      fr: ["Refonte site internet et amélioration image de marque"],
    },
    description: {
      en: "Website redesign and brand image improvement for Blobb.io, a platform for turnkey Bitcoin mining and custom infrastructure projects.",
      fr: "Refonte du site internet et amélioration de l'image de marque pour Blobb.io, plateforme de minage de Bitcoin clé en main et de projets d'infrastructure sur-mesure.",
    },
    details: {
      en: {
        overview: "Blobb.io provides turnkey Bitcoin mining solutions and custom energy infrastructures. The project involved a complete redesign of their website and an enhancement of their brand image to match their premium services.",
        challenge: "To modernize the visual identity and build a high-performance website that clearly communicates complex Bitcoin mining and infrastructure services to both professionals and investors.",
        solution: "We designed a modern, sleek interface with a strong visual hierarchy. The new branding emphasizes clarity, professionalism, and trustworthiness, optimizing the user journey for all target audiences.",
        results: "A strengthened, professional brand identity and an optimized website that effectively communicates Blobb.io's value proposition, increasing user trust and engagement.",
      },
      fr: {
        overview: "Blobb.io propose des solutions de minage de Bitcoin clé en main et des infrastructures énergétiques sur-mesure. Le projet a consisté en une refonte complète de leur site internet et une amélioration de leur image de marque pour s'aligner sur leurs services premium.",
        challenge: "Moderniser l'identité visuelle et créer un site internet performant qui communique clairement des services complexes de minage et d'infrastructure à la fois aux professionnels et aux investisseurs.",
        solution: "Nous avons conçu une interface moderne et épurée avec une forte hiérarchie visuelle. La nouvelle image de marque met l'accent sur la clarté, le professionnalisme et la confiance, optimisant le parcours utilisateur pour tous les publics cibles.",
        results: "Une identité de marque renforcée et professionnelle et un site web optimisé qui communique efficacement la proposition de valeur de Blobb.io, augmentant la confiance et l'engagement des utilisateurs.",
      },
    },
    links: [
      { label: { en: "Visit Website", fr: "Visiter le site" }, url: "https://blobb.io" },
    ],
  },
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
      { label: { en: "View on Figma", fr: "Voir sur Figma" }, url: "https://www.figma.com/design/Vgk2rvqQPmVlbXHS1EUky0/TOTEM-x-Jhachet-x-Dagobert?node-id=83-855&t=sXjz6TMphJoInK16-1" },
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
