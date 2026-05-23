"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/home/footer";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1542104445-5cb3d4b655ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1582500057200-a6813dddb307?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1623910270519-7977ba2e01df?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1545634575-f09b55581e28?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1584036531338-e692da39ff0d?auto=format&fit=crop&q=80&w=800",
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32">
        <Section title="Divine Gallery">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedImage(src)}
                  className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square bg-temple-card border border-saffron/20 hover:border-saffron/60 transition-colors"
                >
                  <img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-10 h-10 text-saffron" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-saffron transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Enlarged gallery view"
              className="max-h-[90vh] max-w-full rounded-lg border border-saffron/30 shadow-[0_0_30px_rgba(255,153,51,0.2)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
