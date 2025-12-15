"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TextWithOrangeDots } from "./TextWithOrangeDots";
import { useMemo } from "react";
import { Container } from "./Container";
import { Section } from "./Section";

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image?: string;
  video?: string;
  downloadUrl?: string; // For PDF downloads like ebooks
}

export interface WorkMessages {
  title: string;
  subtitle: string;
  cta: string;
  viewProject: string;
  downloadPDF?: string;
  availableNow?: string;
  items: WorkItem[];
}

interface WorkSectionProps {
  messages: WorkMessages;
  hideHeader?: boolean;
}

// Special card component for ebook - more refined and distinct design
const EbookCard = memo(function EbookCard({
  project,
  downloadText,
  availableNowText,
}: {
  project: WorkItem;
  downloadText?: string;
  availableNowText?: string;
}) {
  return (
    <a
      href={project.downloadUrl}
      download
      className="group block cursor-pointer"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative overflow-hidden rounded-xl border border-[#0E0E0E]/10 bg-[#F0EEE9] p-6 md:p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left side - Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] md:text-xs font-body uppercase tracking-widest text-accent font-medium">
                {project.category}
              </span>
              <span className="text-accent">•</span>
              <span className="text-[10px] md:text-xs font-body uppercase tracking-widest text-[#0E0E0E]/40">
                {availableNowText || "Available now"}
              </span>
            </div>
            
            <h3 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-[#0E0E0E] mb-3 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            
            {project.tags && project.tags.length > 0 && (
              <p className="text-sm md:text-base text-[#0E0E0E]/60 font-body leading-relaxed max-w-2xl mb-6">
                {project.tags[0]}
              </p>
            )}
            
            <div className="inline-flex items-center gap-2 text-accent font-body text-sm md:text-base group-hover:gap-3 transition-all">
              <span>{downloadText || "Download PDF"}</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
          
          {/* Right side - Mockup/Image */}
          <div className="relative w-full md:w-auto md:flex-shrink-0">
            {project.image ? (
              <div className="relative aspect-[3/4] w-full md:w-48 lg:w-64 rounded-lg overflow-hidden bg-[#0E0E0E]/5 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 256px"
                  loading="lazy"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ) : (
              <div className="relative aspect-[3/4] w-full md:w-48 lg:w-64 rounded-lg overflow-hidden bg-gradient-to-br from-accent/10 via-accent/5 to-transparent flex items-center justify-center border border-accent/20">
                <svg
                  className="w-16 h-16 text-accent/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
});

// Extracted ProjectCard component to avoid duplication - Memoized for performance
const ProjectCard = memo(function ProjectCard({ 
  project, 
  viewProjectText,
  downloadText,
  isComingSoon 
}: { 
  project: WorkItem; 
  viewProjectText: string;
  downloadText?: string;
  isComingSoon: boolean;
}) {
  const cardContent = (
    <>
      {/* Project Card */}
      <div className="relative rounded-2xl overflow-hidden bg-surface aspect-[16/10] md:aspect-[16/9]">
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
        ) : project.image ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={85}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,122,48,0.1),transparent_50%)]" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,122,48,0.1),transparent_50%)]" />
          </div>
        )}

        {/* Hover Overlay - Orange tint for video */}
        {project.video ? (
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-all duration-500 ease-in-out" />
        ) : (
          <div className="absolute inset-0 bg-text/0 group-hover:bg-text/40 transition-colors duration-300" />
        )}

        {/* View Project CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="btn btn-primary">
            {project.downloadUrl ? (downloadText || "Download PDF") : viewProjectText}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {project.downloadUrl ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              )}
            </svg>
          </span>
        </div>
      </div>

      {/* Project Info */}
      <motion.div 
        className="mt-4 md:mt-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-body uppercase tracking-wider">
            {project.category.split('•').map((part, index, array) => (
              <React.Fragment key={index}>
                <span className="text-accent">{part.trim()}</span>
                {index < array.length - 1 && <span className="text-accent"> • </span>}
              </React.Fragment>
            ))}
          </span>
        </div>
        <h4 className="font-heading font-semibold text-xl md:text-2xl text-text mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted font-body"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </>
  );

  if (isComingSoon) {
    return <div className="block cursor-not-allowed">{cardContent}</div>;
  }

  // Handle PDF download
  if (project.downloadUrl) {
    return (
      <a 
        href={project.downloadUrl} 
        download
        className="block cursor-pointer group"
        target="_blank"
        rel="noopener noreferrer"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={`/projects/${project.id}`} className="block cursor-pointer">
      {cardContent}
    </Link>
  );
});

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
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }), []);

  return (
    <Section id="work" variant="base" background="bg">
      <Container maxWidth="wide">
        {/* Header */}
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mt-8 md:mt-12 mb-12 md:mb-16"
          >
            <div>
              <h1 className="section-title text-text mb-6">
                {messages.title.replace(/\.$/, '')}
                <span className="text-accent">.</span>
              </h1>
              <h2 className="text-text max-w-xl font-heading font-normal text-lg md:text-xl leading-relaxed">
                <TextWithOrangeDots>{messages.subtitle.replace(/\.$/, '')}</TextWithOrangeDots>
                <span className="text-accent">.</span>
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
          viewport={{ once: true, margin: "0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {messages.items.map((project, index) => {
            // Use special ebook card for ebook projects
            if (project.downloadUrl && project.id === "ebook-design-2026") {
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="md:col-span-2"
                >
                  <EbookCard
                    project={project}
                    downloadText={messages.downloadPDF}
                    availableNowText={messages.availableNow}
                  />
                </motion.div>
              );
            }
            
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={`group ${index === 0 && !project.downloadUrl ? "md:col-span-2" : ""} ${project.id === "coming-soon" ? "opacity-60" : ""}`}
              >
                <ProjectCard
                  project={project}
                  viewProjectText={messages.viewProject}
                  downloadText={messages.downloadPDF}
                  isComingSoon={project.id === "coming-soon"}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}

