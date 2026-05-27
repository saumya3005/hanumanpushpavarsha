"use client";

import { useState } from "react";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { DivineButton } from "@/components/ui/divine-button";
import { Footer } from "@/components/home/footer";
import { Upload, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
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
          // Mapping fields requested by user to existing UI equivalents
          interest_role: formData.occupation || null,
          city: null,
          state: null
        }
      ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
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
    } catch (err: any) {
      console.error("FULL ERROR:", err);
      alert(JSON.stringify(err, null, 2));
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 grow pt-32">
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

              {success ? (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-spiritual text-green-400 mb-2">Application Submitted Successfully</h3>
                  <p className="text-gray-300 font-body">Thank you for joining our mission. We will contact you soon.</p>
                  <DivineButton className="mt-6" onClick={() => setSuccess(false)}>Submit Another Application</DivineButton>
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
                    <DivineButton className="w-full" size="lg" disabled={loading}>
                      {loading ? "Submitting..." : "Submit Application"}
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
