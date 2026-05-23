"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  title?: string;
}

export function Section({ children, className, id, title }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-24 px-6 md:px-12 lg:px-24",
        "border-t border-saffron/10 bg-temple-bg/80 backdrop-blur-md",
        className
      )}
    >
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="font-spiritual text-3xl md:text-5xl font-bold text-white gold-glow">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-transparent via-saffron to-transparent" />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
