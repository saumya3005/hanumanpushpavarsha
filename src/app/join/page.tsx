"use client";

import { useState } from "react";
import Script from "next/script";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { DivineButton } from "@/components/ui/divine-button";
import { Footer } from "@/components/home/footer";
import { Upload, Users, CheckCircle2, FileText, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function JoinPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    fathers_name: "",
    age: "",
    gender: "",
    occupation: "",
    phone_number: "",
    email: "",
    address: "",
    message: ""
  });
  
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file for your photo.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Photo size should be less than 5MB.");
      return;
    }
    
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setError("Please upload an image or PDF for Aadhaar.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Aadhaar file size should be less than 5MB.");
      return;
    }
    
    setAadhaarFile(file);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!photoFile) {
      setError("Please upload a recent photo.");
      return;
    }
    if (!aadhaarFile) {
      setError("Please upload your Aadhaar / ID Proof.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // 1. Generate Razorpay Order for Membership Fee (₹1100)
      const membershipFee = 1100;
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: membershipFee }),
      });

      const data = await response.json();
      if (!response.ok || !data.order) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SuNEYsIiBeW0Ia",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Hanuman Pushpavarsha Committee",
        description: "Lifetime Membership Fee",
        order_id: data.order.id,
        prefill: {
          name: formData.full_name,
          email: formData.email,
          contact: formData.phone_number,
        },
        theme: {
          color: "#FF9933",
        },
        handler: async function (paymentResponse: any) {
          try {
            setLoading(true);

            // 3. Upload Photo to public bucket
            const photoExt = photoFile.name.split('.').pop();
            const photoFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${photoExt}`;
            const { error: photoError } = await supabase.storage
              .from('member-photos')
              .upload(photoFileName, photoFile);
              
            if (photoError) throw new Error("Failed to upload photo.");
            
            const { data: photoData } = supabase.storage
              .from('member-photos')
              .getPublicUrl(photoFileName);

            // 4. Upload Aadhaar to private bucket
            const aadhaarExt = aadhaarFile.name.split('.').pop();
            const aadhaarFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${aadhaarExt}`;
            const { error: aadhaarError } = await supabase.storage
              .from('aadhaar-files')
              .upload(aadhaarFileName, aadhaarFile);
              
            if (aadhaarError) throw new Error("Failed to upload Aadhaar document.");

            // 5. Save all data to database
            const { error: submitError } = await supabase.from("join_members").insert([
              {
                full_name: formData.full_name,
                fathers_name: formData.fathers_name || null,
                age: formData.age ? parseInt(formData.age) : null,
                gender: formData.gender,
                occupation: formData.occupation || null,
                phone_number: formData.phone_number,
                email: formData.email || null,
                address: formData.address,
                message: formData.message,
                interest_role: formData.occupation || null,
                city: null,
                state: null,
                photo_url: photoData.publicUrl,
                aadhaar_path: aadhaarFileName,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                payment_status: "SUCCESS",
                member_status: "approved"
              }
            ]);

            if (submitError) throw submitError;

            setSuccess(true);
            setFormData({
              full_name: "", fathers_name: "", age: "", gender: "", occupation: "",
              phone_number: "", email: "", address: "", message: ""
            });
            setPhotoFile(null);
            setPhotoPreview(null);
            setAadhaarFile(null);

          } catch (err: any) {
            console.error(err);
            setError(err.message || "Payment succeeded, but data saving failed. Please contact support.");
          } finally {
            setLoading(false);
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response: any) {
        setError(response.error.description || "Payment failed. Please try again.");
        setLoading(false);
      });

      paymentObject.open();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to initiate onboarding. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 grow pt-32 pb-20">
        <Section title="Join the Committee">
          <div className="mx-auto max-w-3xl">
            <div className="bg-temple-card border border-saffron/20 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(255,153,51,0.05)]">
              
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-saffron/10 mb-4 border border-saffron/30">
                  <Users className="w-8 h-8 text-saffron" />
                </div>
                <p className="font-body text-gray-300 text-lg mb-2">
                  Become a part of our spiritual family and contribute to the service of Dharma.
                </p>
                <div className="inline-block bg-saffron/20 border border-saffron/50 rounded-full px-4 py-1 text-saffron font-semibold font-body">
                  Membership Fee: ₹1100
                </div>
              </div>

              {success ? (
                <div className="bg-green-500/10 border border-green-500/50 rounded-2xl p-10 text-center">
                  <div className="flex justify-center mb-6">
                    <CheckCircle2 className="w-20 h-20 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-spiritual text-green-400 mb-4">|| Jai Shree Ram ||</h3>
                  <p className="text-white text-lg font-body mb-2">Welcome to the Committee!</p>
                  <p className="text-gray-300 font-body mb-8">
                    Your payment and application have been successfully processed. 
                    You are now an approved member.
                  </p>
                  <DivineButton onClick={() => setSuccess(false)}>Submit Another Application</DivineButton>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-center">
                      <p className="text-red-400 font-body">{error}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Full Name *</label>
                      <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Father's Name</label>
                      <input type="text" name="fathers_name" value={formData.fathers_name} onChange={handleChange} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Age *</label>
                      <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Gender *</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Occupation</label>
                      <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Phone Number *</label>
                      <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Complete Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all resize-none" required></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Why do you want to join? *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-black border border-saffron/30 rounded-lg p-3 text-white focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all resize-none" required></textarea>
                  </div>

                  {/* File Uploads */}
                  <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-800">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Recent Photo * (Max 5MB)</label>
                      <label className="border-2 border-dashed border-saffron/30 rounded-lg p-6 flex flex-col items-center justify-center bg-black/50 hover:bg-black transition-colors cursor-pointer group relative overflow-hidden h-40">
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <>
                            <ImageIcon className="w-8 h-8 text-saffron mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm text-gray-300 font-medium">Click to upload photo</span>
                          </>
                        )}
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-body">Aadhaar / ID Proof * (Max 5MB)</label>
                      <label className="border-2 border-dashed border-saffron/30 rounded-lg p-6 flex flex-col items-center justify-center bg-black/50 hover:bg-black transition-colors cursor-pointer group h-40">
                        <input type="file" accept="image/*,application/pdf" onChange={handleAadhaarChange} className="hidden" />
                        {aadhaarFile ? (
                          <div className="flex flex-col items-center">
                            <FileText className="w-8 h-8 text-green-500 mb-3" />
                            <span className="text-sm text-green-400 font-medium text-center truncate max-w-50">
                              {aadhaarFile.name}
                            </span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-saffron mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm text-gray-300 font-medium">Upload Image or PDF</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="pt-8">
                    <DivineButton className="w-full" size="lg" disabled={loading}>
                      {loading ? "Processing Payment & Uploading..." : "Pay ₹1100 & Join Committee"}
                    </DivineButton>
                  </div>
                </form>
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
