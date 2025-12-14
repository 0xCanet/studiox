// Projects data exported for use in both page and metadata generation
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

