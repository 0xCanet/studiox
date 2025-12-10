"use client";

import { motion } from "framer-motion";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

export interface AboutMessages {
  title: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  values: {
    title: string;
    description: string;
  }[];
}

interface AboutSectionProps {
  messages: AboutMessages;
}

export function AboutSection({ messages }: AboutSectionProps) {
  return (
    <section id="about" className="bg-[#F0EEE9] py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="section-title text-[#0E0E0E] mb-6">{messages.title}</h3>
            <p className="text-[#0E0E0E]/70 text-lg leading-relaxed mb-10">
              <TextWithOrangeDots>{messages.description}</TextWithOrangeDots>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {messages.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="font-heading font-bold text-3xl md:text-4xl text-[#FF7A30] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[#0E0E0E]/50 text-sm font-body">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {messages.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-6 border-l-2 border-[#FF7A30]/30 hover:border-[#FF7A30] transition-colors"
              >
                <h4 className="font-heading font-semibold text-lg text-[#0E0E0E] mb-2">
                  {value.title}
                </h4>
                <p className="text-[#0E0E0E]/60 text-sm leading-relaxed">
                  <TextWithOrangeDots>{value.description}</TextWithOrangeDots>
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
