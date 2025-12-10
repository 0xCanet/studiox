"use client";

import { motion } from "framer-motion";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ServicesMessages {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

interface ServicesSectionProps {
  messages: ServicesMessages;
}

export function ServicesSection({ messages }: ServicesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section id="services" className="bg-[#F0EEE9] py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <h3 className="section-title text-[#0E0E0E] mb-4">{messages.title}</h3>
          <p className="text-[#0E0E0E]/60 max-w-2xl mx-auto">
            <TextWithOrangeDots>{messages.subtitle}</TextWithOrangeDots>
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {messages.items.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="service-card group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#FF7A30]/10 flex items-center justify-center mb-5 group-hover:bg-[#FF7A30]/20 transition-colors">
                <span className="text-2xl">{service.icon}</span>
              </div>

              {/* Title */}
              <h4 className="font-heading font-semibold text-lg text-[#0E0E0E] mb-3">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-[#0E0E0E]/60 text-sm leading-relaxed">
                <TextWithOrangeDots>{service.description}</TextWithOrangeDots>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

