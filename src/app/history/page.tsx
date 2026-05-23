"use client";

import { motion } from "framer-motion";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/home/footer";
import Image from "next/image";

const timelineEvents = [
  { year: "1995", title: "Foundation", description: "The committee was formed by a group of dedicated devotees." },
  { year: "2002", title: "First Grand Pushpavarsha", description: "Organized the first massive flower petal rain during Hanuman Jayanti." },
  { year: "2010", title: "Community Service Launch", description: "Started weekly bhandaras for the underprivileged." },
  { year: "2020", title: "Digital Outreach", description: "Began live streaming aartis to connect devotees globally." },
];

export default function HistoryPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32">
        <Section title="Our Journey">
          {/* Mission Section */}
          <div className="mx-auto max-w-4xl text-center mb-20">
            <h3 className="font-spiritual text-3xl font-bold text-saffron mb-6">Spiritual Mission</h3>
            <p className="font-body text-gray-300 text-lg leading-relaxed">
              For over two decades, the Hanuman Pushpavarsha Committee has stood as a beacon of devotion,
              culture, and selfless service. Our mission has always been to spread the divine teachings
              of Lord Hanuman and foster a sense of brotherhood among all devotees.
            </p>
          </div>

          {/* Timeline Section */}
          <div className="mx-auto max-w-4xl relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-saffron/20 -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 w-full p-6 bg-temple-card border border-saffron/20 rounded-2xl shadow-lg hover:border-saffron/50 transition-colors">
                    <h4 className="font-spiritual text-2xl font-bold text-white mb-2">{event.title}</h4>
                    <p className="font-body text-gray-400">{event.description}</p>
                  </div>
                  
                  <div className="w-16 h-16 shrink-0 rounded-full bg-black border-4 border-saffron flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,153,51,0.5)]">
                    <span className="font-bold text-white text-sm">{event.year}</span>
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Founder Section */}
          <div className="mx-auto max-w-5xl mt-32 text-center">
            <h3 className="font-spiritual text-3xl font-bold text-saffron mb-12">Our Founders</h3>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 relative rounded-full overflow-hidden border-2 border-gold mb-4 p-1">
                  <div className="w-full h-full relative rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544168190-79c154273140?auto=format&fit=crop&q=80&w=400" alt="Founder 1" className="object-cover w-full h-full" />
                  </div>
                </div>
                <h4 className="font-spiritual text-xl font-bold text-white">Shri Mahant Ji</h4>
                <p className="text-gray-400 text-sm">Visionary Founder</p>
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
