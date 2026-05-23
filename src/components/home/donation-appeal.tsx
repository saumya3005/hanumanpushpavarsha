"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { DivineButton } from "@/components/ui/divine-button";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";

export function DonationAppealSection() {
  return (
    <Section id="donate" className="relative overflow-hidden border-y border-saffron/20 bg-maroon-dark/20">
      {/* Background glowing orb */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/10 blur-[100px]" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center justify-center rounded-full bg-saffron/10 p-6 ring-1 ring-saffron/30"
        >
          <HeartHandshake className="h-12 w-12 text-saffron" />
        </motion.div>

        <h2 className="mb-6 font-spiritual text-4xl md:text-5xl font-bold text-white gold-glow">
          Support Our Divine Cause
        </h2>
        
        <p className="mb-10 font-body text-lg text-gray-300 md:text-xl leading-relaxed">
          Your generous contribution helps us organize spiritual events, maintain our heritage, 
          and serve the community through food distribution and social welfare programs. 
          Every small donation makes a big difference.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link href="/donation" className="w-full sm:w-auto">
            <DivineButton size="lg" className="w-full">
              Donate Now
            </DivineButton>
          </Link>
          <div className="text-sm text-gray-400 font-body flex flex-col items-center">
            <span>Secure Checkout</span>
            <span className="text-saffron-light">80G Tax Exemption Available</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
