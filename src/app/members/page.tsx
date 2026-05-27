"use client";

import { useState } from "react";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { MemberCard } from "@/components/members/member-card";
import { Footer } from "@/components/home/footer";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// Translation Dictionary
const membersDict: Record<string, Record<string, string>> = {
  en: {
    "members.title": "Committee Members",

    "members.role.all": "All",
    "members.role.president": "President",
    "members.role.priest": "Chief Priest",
    "members.role.treasurer": "Treasurer",
    "members.role.coordinator": "Event Coordinator",

    "members.search": "Search members by name...",

    "members.empty": "No members found matching your criteria.",

    "members.desc.president":
      "Leading the committee with a vision of spreading Hanuman ji's devotion across the nation.",

    "members.desc.priest":
      "Head of all spiritual ceremonies and aarti programs organized by the committee.",

    "members.desc.treasurer":
      "Managing committee funds and ensuring transparency in all charitable activities.",

    "members.desc.coordinator":
      "Orchestrating grand events, pushpavarsha, and bhandaras.",
  },

  hi: {
    "members.title": "समिति सदस्य",

    "members.role.all": "सभी",
    "members.role.president": "अध्यक्ष",
    "members.role.priest": "मुख्य पुजारी",
    "members.role.treasurer": "कोषाध्यक्ष",
    "members.role.coordinator": "कार्यक्रम संयोजक",

    "members.search": "सदस्य का नाम खोजें...",

    "members.empty": "आपकी खोज के अनुसार कोई सदस्य नहीं मिला।",

    "members.desc.president":
      "हनुमान जी की भक्ति को पूरे देश में फैलाने के उद्देश्य से समिति का नेतृत्व कर रहे हैं।",

    "members.desc.priest":
      "समिति द्वारा आयोजित सभी धार्मिक अनुष्ठानों और आरती कार्यक्रमों के प्रमुख।",

    "members.desc.treasurer":
      "समिति के धन का प्रबंधन और सभी सेवा कार्यों में पारदर्शिता सुनिश्चित करना।",

    "members.desc.coordinator":
      "भव्य आयोजनों, पुष्पवर्षा और भंडारों का संचालन।",
  },
};

// Members Data
const membersData = [
  {
    id: "1",
    name: {
      en: "Shobhan Tiwari (Bablu Pandit)",
      hi: "शोभन तिवारी (बब्लू पंडित)",
    },
    roleKey: "members.role.president",
    image: "https://i.postimg.cc/XvFW5MQh/papa-hpvc.jpg",
    descriptionKey: "members.desc.president",
    phone: "+91 9415236933",
    socials: { facebook: "#" },
  },
  {
    id: "2",
    name: {
      en: "Pandit Hari Om",
      hi: "पंडित हरि ओम",
    },
    roleKey: "members.role.priest",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    descriptionKey: "members.desc.priest",
  },
  {
    id: "3",
    name: {
      en: "Rajiv Sharma",
      hi: "राजीव शर्मा",
    },
    roleKey: "members.role.treasurer",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    descriptionKey: "members.desc.treasurer",
  },
  {
    id: "4",
    name: {
      en: "Vikram Singh",
      hi: "विक्रम सिंह",
    },
    roleKey: "members.role.coordinator",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    descriptionKey: "members.desc.coordinator",
  },
];

// Role Filters
const roles = [
  "members.role.all",
  "members.role.president",
  "members.role.priest",
  "members.role.treasurer",
  "members.role.coordinator",
];

export default function MembersPage() {
  const { language } = useLanguage();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("members.role.all");

  const getTranslated = (key: string): string => {
    return membersDict[language]?.[key] || membersDict["en"]?.[key] || key;
  };

  const filteredMembers = membersData.filter((member) => {
    const memberName =
      language === "hi" ? member.name.hi : member.name.en;

    const matchesSearch = memberName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRole =
      selectedRole === "members.role.all" ||
      member.roleKey === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32">
        <Section title={getTranslated("members.title")}>
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
                  placeholder={getTranslated("members.search")}
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
                    className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-all ${selectedRole === role
                      ? "bg-saffron text-white shadow-[0_0_10px_rgba(255,153,51,0.5)]"
                      : "bg-temple-card border border-gray-800 text-gray-300 hover:border-saffron/50"
                      }`}
                  >
                    {getTranslated(role)}
                  </button>
                ))}
              </div>
            </div>

            {/* Members Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMembers.map((member, index) => (
                <MemberCard
                  key={member.id}
                  index={index}
                  member={{
                    ...member,
                    name:
                      language === "hi"
                        ? member.name.hi
                        : member.name.en,
                    role: getTranslated(member.roleKey),
                    description: getTranslated(member.descriptionKey),
                  }}
                />
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-20 text-gray-400 font-body">
                {getTranslated("members.empty")}
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