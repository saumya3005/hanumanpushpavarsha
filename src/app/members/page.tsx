"use client";

import { useState } from "react";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { MemberCard, Member } from "@/components/members/member-card";
import { Footer } from "@/components/home/footer";
import { Search } from "lucide-react";

// Placeholder data - later to be fetched from Supabase
const membersData: Member[] = [
  {
    id: "1",
    name: "Shri Ram Das",
    role: "President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    description: "Leading the committee with a vision of spreading Hanuman ji's devotion across the nation.",
    phone: "+91 9876543210",
    socials: { facebook: "#" },
  },
  {
    id: "2",
    name: "Pandit Hari Om",
    role: "Chief Priest",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    description: "Head of all spiritual ceremonies and aarti programs organized by the committee.",
  },
  {
    id: "3",
    name: "Rajiv Sharma",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    description: "Managing committee funds and ensuring transparency in all charitable activities.",
  },
  {
    id: "4",
    name: "Vikram Singh",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    description: "Orchestrating grand events, pushpavarsha, and bhandaras.",
  },
];

const roles = ["All", "President", "Chief Priest", "Treasurer", "Event Coordinator"];

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32">
        <Section title="Committee Members">
          <div className="mx-auto max-w-7xl">
            
            {/* Search and Filter */}
            <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search className="h-5 w-5 text-saffron" />
                </div>
                <input
                  type="text"
                  placeholder="Search members by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-full border border-saffron/30 bg-black/50 p-3 pl-12 text-white placeholder-gray-400 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron transition-all"
                />
              </div>

              {/* Role Filter */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-all ${
                      selectedRole === role
                        ? "bg-saffron text-white shadow-[0_0_10px_rgba(255,153,51,0.5)]"
                        : "bg-temple-card border border-gray-800 text-gray-300 hover:border-saffron/50"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Members Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMembers.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
            
            {filteredMembers.length === 0 && (
              <div className="text-center py-20 text-gray-400 font-body">
                No members found matching your criteria.
              </div>
            )}
            
          </div>
        </Section>
      </div>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
