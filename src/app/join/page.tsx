"use client";

import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { DivineButton } from "@/components/ui/divine-button";
import { Footer } from "@/components/home/footer";
import { Upload, Users } from "lucide-react";

export default function JoinPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32">
        <Section title="Join the Committee">
          <div className="mx-auto max-w-3xl">
            <div className="bg-temple-card border border-saffron/20 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(255,153,51,0.05)]">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-saffron/10 mb-4 border border-saffron/30">
                  <Users className="w-8 h-8 text-saffron" />
                </div>
                <p className="font-body text-gray-300 text-lg">
                  Become a part of our spiritual family and contribute to the service of Dharma and humanity.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Full Name *</label>
                    <input type="text" className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Father's Name</label>
                    <input type="text" className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Age *</label>
                    <input type="number" className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Gender *</label>
                    <select className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" required>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Occupation</label>
                    <input type="text" className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Phone Number *</label>
                    <input type="tel" className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Email Address</label>
                    <input type="email" className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Complete Address *</label>
                  <textarea rows={3} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all resize-none" required></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Why do you want to join? *</label>
                  <textarea rows={3} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all resize-none" required></textarea>
                </div>

                {/* File Uploads */}
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Recent Photo *</label>
                    <div className="border-2 border-dashed border-saffron/30 rounded-lg p-6 flex flex-col items-center justify-center bg-black/50 hover:bg-black transition-colors cursor-pointer group">
                      <Upload className="w-6 h-6 text-saffron mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-gray-400">Click to upload image</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Aadhaar / ID Proof *</label>
                    <div className="border-2 border-dashed border-saffron/30 rounded-lg p-6 flex flex-col items-center justify-center bg-black/50 hover:bg-black transition-colors cursor-pointer group">
                      <Upload className="w-6 h-6 text-saffron mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-gray-400">Click to upload document</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <DivineButton className="w-full" size="lg">
                    Submit Application
                  </DivineButton>
                </div>
              </form>
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
