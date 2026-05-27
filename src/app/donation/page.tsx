"use client";

import { useState } from "react";
import Script from "next/script";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { DivineButton } from "@/components/ui/divine-button";
import { Footer } from "@/components/home/footer";
import { HeartHandshake, CheckCircle2, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Add window type for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonationPage() {
  const [amount, setAmount] = useState<number | "">("");
  const [purpose, setPurpose] = useState("General Temple Development");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    if (!amount || Number(amount) < 1) {
      setError("Please enter a valid donation amount.");
      return;
    }
    if (!name || !phone) {
      setError("Please provide your name and phone number.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      // 1. Create order on the server
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await response.json();

      if (!response.ok || !data.order) {
        throw new Error(data.error || "Failed to create order");
      }

      // 2. Initialize Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SuNEYsIiBeW0Ia", // Use public key if available, fallback to provided test key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Hanuman Pushpavarsha Committee",
        description: `Donation for ${purpose}`,
        order_id: data.order.id,
        handler: async function (response: any) {
          // 3. Save to Supabase on Success
          try {
            const { error: dbError } = await supabase.from("donations").insert([
              {
                donor_name: name,
                phone: phone,
                email: email || null,
                amount: Number(amount),
                message: purpose,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                payment_status: "SUCCESS"
              }
            ]);

            if (dbError) {
              console.error("Supabase Error:", dbError);
              throw new Error("Payment succeeded but failed to record in database.");
            }

            setSuccess(true);
          } catch (err: any) {
            setError(err.message || "An error occurred while saving your donation record.");
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#FF9933", // Saffron color
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response: any) {
        setError(response.error.description || "Payment failed. Please try again.");
      });

      paymentObject.open();

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="relative min-h-screen w-full flex flex-col bg-black">
        <div className="fixed inset-0 z-0">
          <SpiritualBackground />
        </div>
        <div className="relative z-10 flex-grow pt-32 flex items-center justify-center">
          <div className="bg-temple-card border border-saffron/20 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(255,153,51,0.1)] text-center max-w-lg mx-auto">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-20 h-20 text-green-500" />
            </div>
            <h2 className="font-spiritual text-4xl text-saffron mb-4 font-bold">|| Jai Shree Ram ||</h2>
            <h3 className="text-xl text-white font-body mb-6">Your Donation was Successful!</h3>
            <p className="text-gray-300 font-body mb-8">
              Thank you for your generous offering of ₹{amount} towards {purpose}. 
              May Lord Hanuman bless you and your family with peace and prosperity.
            </p>
            <DivineButton onClick={() => {
              setSuccess(false);
              setAmount("");
              setName("");
              setEmail("");
              setPhone("");
            }}>
              Make Another Donation
            </DivineButton>
          </div>
        </div>
        <div className="relative z-10">
          <Footer />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32 pb-20">
        <Section title="Make a Divine Offering">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
            
            {/* Donation Form */}
            <div className="bg-temple-card border border-saffron/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(255,153,51,0.05)]">
              <h3 className="font-spiritual text-2xl font-bold text-saffron mb-6 flex items-center gap-2">
                <HeartHandshake className="w-6 h-6" /> Donation Details
              </h3>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-400 font-body text-sm text-center">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Select Amount (₹) *</label>
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
                  <select 
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all"
                  >
                    <option>General Temple Development</option>
                    <option>Annadaan (Food Distribution)</option>
                    <option>Pushpavarsha Event</option>
                    <option>Goshala Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Personal Details</label>
                  <div className="space-y-3">
                    <input type="text" placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                    <input type="tel" placeholder="Phone Number *" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                    <input type="email" placeholder="Email Address (Optional)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-temple-card border border-saffron/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-transparent pointer-events-none" />
              
              <div className="flex flex-col items-center w-full relative z-10">
                <div className="w-24 h-24 rounded-full bg-saffron/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,153,51,0.2)]">
                  <ShieldCheck className="w-12 h-12 text-saffron" />
                </div>
                <h4 className="font-spiritual text-2xl text-white mb-2">Secure Payment</h4>
                <p className="font-body text-gray-300 mb-8 max-w-sm">
                  Proceed with Razorpay's highly secure checkout supporting Cards, Net Banking, UPI, and Wallets.
                </p>
                <DivineButton className="w-full max-w-xs" onClick={handlePayment} disabled={loading}>
                  {loading ? "Processing..." : "Pay via Razorpay"}
                </DivineButton>
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
