"use client";

import { motion } from "framer-motion";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/home/footer";
import { Radio } from "lucide-react";

export default function LivePage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32">
        <Section>
          <div className="mx-auto max-w-5xl">
            
            {/* Live Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="font-spiritual text-3xl md:text-5xl font-bold text-saffron gold-glow mb-2">
                  Maha Aarti & Pushpavarsha
                </h1>
                <p className="font-body text-gray-400 text-lg">Sangam Ghat, Prayagraj</p>
              </div>
              <div className="flex items-center gap-2 bg-red-500/20 text-red-500 border border-red-500/50 px-4 py-2 rounded-full font-body font-bold animate-pulse">
                <Radio className="w-5 h-5" />
                <span>LIVE NOW</span>
              </div>
            </div>

            {/* Video Player Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full aspect-video bg-temple-card rounded-2xl overflow-hidden border border-saffron/30 shadow-[0_0_30px_rgba(255,153,51,0.15)] group"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
                {/* This will be replaced by an actual iframe (e.g., YouTube embed) */}
                <img 
                  src="https://images.unsplash.com/photo-1542104445-5cb3d4b655ab?auto=format&fit=crop&q=80&w=1200" 
                  alt="Live Event Thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-20 flex flex-col items-center">
                  <div className="w-20 h-20 bg-saffron/20 border-2 border-saffron rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(255,153,51,0.5)] cursor-pointer hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="mt-4 font-spiritual text-xl text-white font-bold tracking-widest drop-shadow-md">
                    Click to Join Livestream
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Live Ticker / Announcements */}
            <div className="mt-8 bg-temple-card border border-saffron/20 rounded-xl p-4 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 bg-saffron w-2" />
              <div className="flex items-center gap-4 pl-4">
                <span className="font-bold text-saffron uppercase tracking-wider whitespace-nowrap">Announcements:</span>
                <div className="overflow-hidden relative w-full h-6">
                  <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="absolute whitespace-nowrap text-gray-300 font-body"
                  >
                    Welcome to the live broadcast of Maha Aarti. • Please maintain digital decorum in chat. • Pushpavarsha will commence shortly.
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </Section>
      </div>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
