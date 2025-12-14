import type { Metadata } from "next";
import { projects } from "./projects-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://studiox.dev";
  const projectUrl = `${baseUrl}/projects/${slug}`;

  // Use English description by default, fallback to French if needed
  const description = project.description.en || project.description.fr;
  const title = `${project.title} — Studi.ox Design Project`;
  const category = project.category;

  // Get image URL if available
  let imageUrl = `${baseUrl}/images/backgrounds/scorage-banner.png`; // Default fallback
  if (slug === "scorage") {
    imageUrl = `${baseUrl}/images/backgrounds/scorage-banner.png`;
  } else if (slug === "totem") {
    imageUrl = `${baseUrl}/images/backgrounds/totem-mockup.png`;
  } else if (slug === "academie-mouvement") {
    imageUrl = `${baseUrl}/images/backgrounds/academie-mouvement.png`;
  } else if (project.video) {
    imageUrl = `${baseUrl}/og-default.jpg`; // Fallback for video projects
  }

  return {
    title,
    description: `${description}${category ? ` • ${category}` : ""}`,
    keywords: [
      project.title,
      category,
      "Studi.ox",
      "design agency",
      "branding",
      "UX/UI",
      ...project.tags.en,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: projectUrl,
      siteName: "Studi.ox",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - Studi.ox Design Project`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@0xCanet",
      images: [imageUrl],
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

