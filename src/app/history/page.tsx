"use client";

import { motion } from "framer-motion";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/home/footer";

export default function HistoryPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32 pb-20">
        <Section title="Our Divine Journey">
          <div className="mx-auto max-w-4xl px-4 md:px-8 space-y-12">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h3 className="font-spiritual text-2xl md:text-3xl text-gold mb-4 uppercase tracking-widest">
                The Genesis of Devotion
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-saffron to-transparent mx-auto rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative p-8 md:p-12 bg-black/40 backdrop-blur-sm border border-saffron/10 rounded-3xl shadow-[0_0_30px_rgba(255,153,51,0.05)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-saffron/5 to-transparent rounded-3xl pointer-events-none" />
              
              <p className="font-body text-gray-300 text-lg md:text-xl leading-loose md:leading-loose text-justify md:text-center relative z-10 mb-8">
                For over two decades, the Hanuman Pushpavarsha Committee has stood as a beacon of unwavering devotion, deep-rooted culture, and selfless service. What began as a humble gathering of dedicated devotees has now blossomed into a massive spiritual movement, echoing the eternal glories of Lord Hanuman. 
              </p>

              <p className="font-body text-gray-300 text-lg md:text-xl leading-loose md:leading-loose text-justify md:text-center relative z-10 mb-8">
                Guided by the divine blessings of Shri Ram, our journey commenced with a singular vision: to create an atmosphere where every soul could experience the divine grace of Bajrangbali. Through years of perseverance and collective faith, the grand tradition of Pushpavarsha—a breathtaking rain of sacred flower petals—was introduced, symbolizing our boundless love and surrender to the supreme protector.
              </p>
              
              <p className="font-body text-gray-300 text-lg md:text-xl leading-loose md:leading-loose text-justify md:text-center relative z-10">
                Today, our mission transcends beyond the spectacular celebrations. It is a vow to foster brotherhood, serve the underprivileged, and keep the flame of Dharma burning bright in the hearts of the younger generation. Every chant, every petal, and every prayer offered under our banner is a testament to the timeless strength and compassion of Hanuman Ji.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center mt-16"
            >
              <div className="px-8 py-4 border border-gold/30 rounded-full bg-saffron/5 text-gold font-spiritual text-xl shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                || Jai Shri Ram ||
              </div>
            </motion.div>

          </div>
        </Section>
      </div>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
