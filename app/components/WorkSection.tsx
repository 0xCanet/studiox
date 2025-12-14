"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TextWithOrangeDots } from "./TextWithOrangeDots";
import { useMemo } from "react";

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image?: string;
  video?: string;
}

export interface WorkMessages {
  title: string;
  subtitle: string;
  cta: string;
  viewProject: string;
  items: WorkItem[];
}

interface WorkSectionProps {
  messages: WorkMessages;
  hideHeader?: boolean;
}

// Extracted ProjectCard component to avoid duplication
function ProjectCard({ 
  project, 
  viewProjectText, 
  isComingSoon 
}: { 
  project: WorkItem; 
  viewProjectText: string;
  isComingSoon: boolean;
}) {
  const cardContent = (
    <>
      {/* Project Card */}
      <div className="relative rounded-2xl overflow-hidden bg-[#F0EEE9] aspect-[16/10] md:aspect-[16/9]">
        {/* Video or Image */}
        {project.video ? (
          <div className="absolute inset-0 overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:blur-lg group-hover:brightness-[0.8] group-hover:sepia-[0.3] group-hover:saturate-[1.5] group-hover:hue-rotate-[-5deg]"
                      aria-label={`${project.title} project video`}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a]"
            style={project.image ? { backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,122,48,0.1),transparent_50%)]" />
          </div>
        )}

        {/* Hover Overlay - Orange tint for video */}
        {project.video ? (
          <div className="absolute inset-0 bg-[#FF7A30]/0 group-hover:bg-[#FF7A30]/15 transition-all duration-500 ease-in-out" />
        ) : (
          <div className="absolute inset-0 bg-[#0E0E0E]/0 group-hover:bg-[#0E0E0E]/40 transition-colors duration-300" />
        )}

        {/* View Project CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="btn btn-primary">
            {viewProjectText}
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Project Info */}
      <div className="mt-4 md:mt-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#FF7A30] text-xs font-body uppercase tracking-wider">
            {project.category}
          </span>
        </div>
        <h4 className="font-heading font-semibold text-xl md:text-2xl text-[#0E0E0E] mb-2 group-hover:text-[#FF7A30] transition-colors">
          {project.title}
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#0E0E0E]/50 font-body"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (isComingSoon) {
    return <div className="block cursor-not-allowed">{cardContent}</div>;
  }

  return (
    <Link href={`/projects/${project.id}`} className="block cursor-pointer">
      {cardContent}
    </Link>
  );
}

export function WorkSection({ messages, hideHeader = false }: WorkSectionProps) {
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }), []);

  return (
    <section id="work" className="bg-[#F0EEE9] py-24 md:py-32 px-5 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
          >
            <div>
              <h1 className="section-title text-[#0E0E0E] mb-4">
                {messages.title.replace(/\.$/, '')}
                <span className="text-[#FF7A30]">.</span>
              </h1>
              <h2 className="text-[#0E0E0E] max-w-xl font-heading font-normal text-lg md:text-xl leading-relaxed">
                <TextWithOrangeDots>{messages.subtitle.replace(/\.$/, '')}</TextWithOrangeDots>
                <span className="text-[#FF7A30]">.</span>
              </h2>
            </div>
            <a
              href="/#work"
              className="btn btn-secondary mt-6 md:mt-0 w-fit"
            >
              {messages.cta}
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {messages.items.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group ${index === 0 ? "md:col-span-2" : ""} ${project.id === "coming-soon" ? "opacity-60" : ""}`}
            >
              <ProjectCard
                project={project}
                viewProjectText={messages.viewProject}
                isComingSoon={project.id === "coming-soon"}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

