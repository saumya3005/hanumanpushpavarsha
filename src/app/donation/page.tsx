"use client";

import { useState } from "react";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { DivineButton } from "@/components/ui/divine-button";
import { Footer } from "@/components/home/footer";
import { QrCode, CreditCard, HeartHandshake } from "lucide-react";

export default function DonationPage() {
  const [amount, setAmount] = useState<number | "">("");
  const [method, setMethod] = useState<"upi" | "card">("upi");

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32">
        <Section title="Make a Divine Offering">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
            
            {/* Donation Form */}
            <div className="bg-temple-card border border-saffron/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(255,153,51,0.05)]">
              <h3 className="font-spiritual text-2xl font-bold text-saffron mb-6 flex items-center gap-2">
                <HeartHandshake className="w-6 h-6" /> Donation Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Select Amount (₹)</label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[101, 501, 1100, 2100, 5100, 11000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setAmount(preset)}
                        className={`py-2 rounded-lg border font-body font-semibold transition-all ${
                          amount === preset
                            ? "bg-saffron border-saffron text-white shadow-[0_0_10px_rgba(255,153,51,0.5)]"
                            : "bg-black border-saffron/30 text-gray-300 hover:border-saffron"
                        }`}
                      >
                        ₹{preset}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                    className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Purpose of Donation</label>
                  <select className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all">
                    <option>General Temple Development</option>
                    <option>Annadaan (Food Distribution)</option>
                    <option>Pushpavarsha Event</option>
                    <option>Goshala Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Personal Details</label>
                  <div className="space-y-3">
                    <input type="text" placeholder="Full Name" className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                    <input type="email" placeholder="Email Address" className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                    <input type="tel" placeholder="Phone Number" className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-temple-card border border-saffron/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-transparent pointer-events-none" />
              
              <div className="flex bg-black rounded-lg p-1 border border-saffron/30 mb-8 w-full max-w-xs">
                <button
                  className={`flex-1 py-2 font-body font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${method === "upi" ? "bg-saffron text-white" : "text-gray-400 hover:text-white"}`}
                  onClick={() => setMethod("upi")}
                >
                  <QrCode className="w-4 h-4" /> UPI / QR
                </button>
                <button
                  className={`flex-1 py-2 font-body font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${method === "card" ? "bg-saffron text-white" : "text-gray-400 hover:text-white"}`}
                  onClick={() => setMethod("card")}
                >
                  <CreditCard className="w-4 h-4" /> Card / Net
                </button>
              </div>

              {method === "upi" ? (
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center border-4 border-saffron/50 mb-6 shadow-[0_0_20px_rgba(255,153,51,0.2)]">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=hanumancommittee@upi&pn=Hanuman%20Pushpavarsha%20Committee" alt="Donation QR Code" className="w-full h-full" />
                  </div>
                  <p className="font-body text-gray-300 mb-2">Scan with any UPI App</p>
                  <p className="font-spiritual text-saffron text-xl font-bold">hanumancommittee@upi</p>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <CreditCard className="w-24 h-24 text-saffron/50 mb-6" />
                  <p className="font-body text-gray-300 mb-8">Proceed with Razorpay secure checkout for Cards, Net Banking, and Wallets.</p>
                  <DivineButton className="w-full">
                    Pay via Razorpay
                  </DivineButton>
                </div>
              )}
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
