"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/home/footer";
import { Radio } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LivePage() {
  const [liveData, setLiveData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLive() {
      const { data, error } = await supabase.from("live_event_settings").select("*").limit(1).single();
      if (!error && data) {
        setLiveData(data);
      }
      setLoading(false);
    }
    fetchLive();
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 grow pt-32">
        <Section>
          <div className="mx-auto max-w-5xl">
            
            {/* Live Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 text-center md:text-left">
              <div>
                <h1 className="font-spiritual text-3xl md:text-5xl font-bold text-saffron gold-glow mb-2">
                  {liveData?.title || "Live Stream"}
                </h1>
                <p className="font-body text-gray-400 text-lg">{liveData?.description || "Stay tuned for upcoming live events."}</p>
              </div>
              {liveData?.is_live && (
                  <div className="flex items-center gap-2 bg-red-500/20 text-red-500 border border-red-500/50 px-4 py-2 rounded-full font-body font-bold animate-pulse">
                    <Radio className="w-5 h-5" />
                    <span>LIVE NOW</span>
                  </div>
              )}
            </div>

            {/* Video Player Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full aspect-video bg-temple-card rounded-2xl overflow-hidden border border-saffron/30 shadow-[0_0_30px_rgba(255,153,51,0.15)] group flex items-center justify-center"
            >
              {loading ? (
                 <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-10 h-10 border-4 border-saffron border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-saffron font-spiritual tracking-widest uppercase text-sm">Connecting...</p>
                 </div>
              ) : liveData?.is_live && liveData?.live_url ? (
                 liveData.live_url.includes("instagram.com") ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-6 text-center border-4 border-transparent" style={{ backgroundClip: "padding-box" }}>
                      <div className="w-20 h-20 bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,39,67,0.3)] animate-pulse">
                         <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </div>
                      <h2 className="font-spiritual text-3xl text-white font-bold mb-4 drop-shadow-md">Live on Instagram</h2>
                      <p className="text-gray-300 font-body mb-8 max-w-md">Join us directly on Instagram to experience the live event, participate in the chat, and share the divine moments.</p>
                      <a 
                        href={liveData.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-linear-to-r from-orange-500 to-saffron text-white px-8 py-3 rounded-full font-bold font-body shadow-[0_0_20px_rgba(255,153,51,0.4)] hover:scale-105 transition-transform"
                      >
                        Watch Live on Instagram
                      </a>
                    </div>
                 ) : (
                    <iframe 
                        src={liveData.live_url} 
                        className="w-full h-full absolute inset-0 border-0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    />
                 )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
                  <Radio className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="font-spiritual text-2xl text-gray-400 font-bold tracking-widest drop-shadow-md">
                    No live event right now
                  </p>
                </div>
              )}
            </motion.div>

            {/* Live Ticker / Announcements */}
            <div className="mt-8 bg-temple-card border border-saffron/20 rounded-xl p-4 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 bg-saffron w-2" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pl-4">
                <span className="font-bold text-saffron uppercase tracking-wider text-sm sm:text-base whitespace-nowrap">Announcements:</span>
                <div className="overflow-hidden relative w-full h-6 flex-1">
                  <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="absolute whitespace-nowrap text-gray-300 font-body"
                  >
                    Welcome to our digital platform. • Stay tuned for upcoming live events.
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
