"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { HandHeart, Users, BookOpen } from "lucide-react";

const features = [
  {
    icon: <HandHeart className="h-8 w-8 text-saffron" />,
    title: "Religious Contribution",
    description: "Organizing grand aartis, pushpavarsha, and regular temple activities to strengthen spiritual connection.",
  },
  {
    icon: <Users className="h-8 w-8 text-saffron" />,
    title: "Community Service",
    description: "Dedicated to social welfare, helping the needy, and organizing bhandaras for the community.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-saffron" />,
    title: "Cultural Activities",
    description: "Preserving and promoting Hindu culture through events, discourses, and traditional celebrations.",
  },
];

export function AboutSection() {
  return (
    <Section id="about" title="Our Mission & Vision">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-12 font-body text-lg md:text-xl leading-relaxed text-gray-300">
          The <span className="font-semibold text-saffron">Hanuman Pushpavarsha Committee</span> is dedicated to fostering devotion, 
          preserving our rich cultural heritage, and serving humanity. Inspired by the unwavering devotion of Lord Hanuman towards 
          Shri Ram, we strive to bring positive change in society through spiritual gatherings, community service, and cultural preservation.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl border border-saffron/20 bg-temple-card p-8 shadow-lg transition-colors hover:border-saffron/50"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-saffron/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="mb-6 inline-flex rounded-full bg-saffron/10 p-4 ring-1 ring-saffron/30">
                {feature.icon}
              </div>
              <h3 className="mb-4 font-spiritual text-2xl font-bold text-gold">
                {feature.title}
              </h3>
              <p className="font-body text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
