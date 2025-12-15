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

  const description = project.description.en || project.description.fr;
  const title = `${project.title} — Studi.0x Design Project`;
  const category = project.category;

  let imageUrl = `${baseUrl}/images/backgrounds/scorage-banner.png`;
  if (slug === "scorage") {
    imageUrl = `${baseUrl}/images/backgrounds/scorage-banner.png`;
  } else if (slug === "totem") {
    imageUrl = `${baseUrl}/images/backgrounds/totem-mockup.png`;
  } else if (slug === "academie-mouvement") {
    imageUrl = `${baseUrl}/images/backgrounds/academie-mouvement.png`;
  } else if (project.video) {
    imageUrl = `${baseUrl}/og-default.jpg`;
  }

  return {
    title,
    description: `${description}${category ? ` • ${category}` : ""}`,
    keywords: [
      project.title,
      category,
      "Studi.0x",
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
      siteName: "Studi.0x",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - Studi.0x Design Project`,
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

