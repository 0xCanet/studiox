"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

export interface AboutMessages {
  heading: string;
  intro: string[];
  pillarsTitle: string;
  pillars: {
    id: string;
    title: string;
    desc: string;
  }[];
  stats: {
    id: string;
    value: string;
    label: string;
  }[];
  founder: {
    name: string;
    role: string;
    portraitAlt: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
}

interface AboutSectionProps {
  messages: AboutMessages;
}

import { Container } from "./Container";
import { Section } from "./Section";

export function AboutSection({ messages }: AboutSectionProps) {
  return (
    <Section id="about" variant="base" background="bg">
      <Container maxWidth="wide">
        {/* First Row: Portrait (left) + About Content & Values (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left Column - Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full aspect-[3/4] max-w-md lg:max-w-lg mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/images/backgrounds/pp_jessy_orange.png"
                alt={messages.founder.portraitAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                priority
              />
            </div>
            <div className="mt-6 text-center lg:text-left">
              <h3 className="font-heading font-bold text-xl text-text mb-1">
                {messages.founder.name}
              </h3>
              <p className="text-muted text-sm font-body">
                {messages.founder.role}
              </p>
            </div>
          </motion.div>

          {/* Right Column - About Content + Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* About Content */}
            <div>
              <h1 className="section-title text-text mb-6">
                {messages.heading.replace(/\.$/, '')}
                <span className="text-accent">.</span>
              </h1>
              <div className="space-y-4 mb-8">
                {messages.intro.map((paragraph, index) => (
                  <p key={index} className="text-muted text-lg leading-relaxed">
                    <TextWithOrangeDots>{paragraph}</TextWithOrangeDots>
                  </p>
                ))}
              </div>
            </div>

            {/* Pillars */}
            <div>
              <h3 className="font-heading font-semibold text-xl text-text mb-6">
                {messages.pillarsTitle}
              </h3>
              <div className="space-y-6">
                {messages.pillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative pl-6 border-l-2 border-accent/30 hover:border-accent transition-colors"
                  >
                    <h4 className="font-heading font-semibold text-lg text-text mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-muted text-sm leading-relaxed">
                      <TextWithOrangeDots>{pillar.desc}</TextWithOrangeDots>
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-4">
              {messages.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-heading font-bold text-3xl md:text-4xl text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted text-sm font-body">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
