"use client";

import { useState, useEffect } from "react";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { MemberCard } from "@/components/members/member-card";
import { Footer } from "@/components/home/footer";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { MainMember } from "@/lib/main-members";
import { supabase } from "@/lib/supabase";

const membersDict: Record<string, Record<string, string>> = {
  en: {
    "members.title": "Committee Members",
    "executive.title": "Executive Members",
    "members.role.all": "All",
    "members.role.president": "President",
    "members.role.priest": "Vice President",
    "members.role.treasurer": "Treasurer",
    "members.role.coordinator": "General Secretary",
    "members.role.minister": "Minister",
    "members.role.executive": "Executive Members",

    "members.search": "Search members by name...",
    "members.empty": "No members found matching your criteria.",
    "members.desc.president":
      "Leading the committee with a vision of spreading Hanuman ji's devotion across the nation.",
    "members.desc.priest":
      "Supporting all committee activities and spiritual events.",
    "members.desc.treasurer":
      "Managing committee funds and ensuring transparency in all charitable activities.",
    "members.desc.coordinator":
      "Orchestrating grand events, pushpavarsha, and bhandaras.",
    "members.desc.minister":
      "Actively contributing to committee management and public coordination.",
  },

  hi: {
    "members.title": "कमेटी सदस्य",
    "executive.title": "कार्यकारिणी सदस्य",
    "members.role.all": "सभी",
    "members.role.president": "अध्यक्ष",
    "members.role.priest": "उपाध्यक्ष",
    "members.role.treasurer": "कोषाध्यक्ष",
    "members.role.coordinator": "महामंत्री",
    "members.role.minister": "मंत्री",
    "members.role.executive": "कार्यकारिणी सदस्य",

    "members.search": "सदस्य का नाम खोजें...",
    "members.empty": "आपकी खोज के अनुसार कोई सदस्य नहीं मिला।",
    "members.desc.president":
      "हनुमान जी की भक्ति को पूरे देश में फैलाने के उद्देश्य से कमेटी का नेतृत्व कर रहे हैं।",
    "members.desc.priest":
      "कमेटी के सभी कार्यक्रमों एवं धार्मिक आयोजनों में सहयोग प्रदान करते हैं।",
    "members.desc.treasurer":
      "कमेटी के धन का प्रबंधन और सभी सेवा कार्यों में पारदर्शिता सुनिश्चित करना।",
    "members.desc.coordinator":
      "भव्य आयोजनों, पुष्पवर्षा और भंडारों का संचालन।",
    "members.desc.minister":
      "कमेटी संचालन एवं जनसमन्वय में सक्रिय योगदान।",
  },
};

const roles = [
  "members.role.all",
  "members.role.president",
  "members.role.priest",
  "members.role.treasurer",
  "members.role.coordinator",
  "members.role.minister",
  "members.role.executive",
];

export default function MembersPage() {
  const { language } = useLanguage();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("members.role.all");
  const [mainMembers, setMainMembers] = useState<MainMember[]>([]);
  const [mainMembersError, setMainMembersError] = useState(false);
  const [mainMembersLoading, setMainMembersLoading] = useState(true);
  const [dynamicLeadMembers, setDynamicLeadMembers] = useState<any[]>([]);
  const [dbExecutiveMembers, setDbExecutiveMembers] = useState<{ en: string; hi: string }[]>([]);
  const [executiveMembersError, setExecutiveMembersError] = useState(false);
  const [executiveMembersLoading, setExecutiveMembersLoading] = useState(true);

  useEffect(() => {
    const fetchLeadMembers = async () => {
      const { data, error } = await supabase
        .from("join_members")
        .select("*")
        .eq("is_lead_member", true)
        .eq("member_status", "approved");

      if (error) {
        console.error("Lead members fetch error:", error);
        return;
      }

      if (data) {
        const mapped = data.map((d: any) => ({
          id: `db-${d.id}`,
          name: {
            en: d.full_name || "Committee Member",
            hi: d.full_name || "कमेटी सदस्य",
          },
          roleKey: "members.role.all",
          customRole: d.interest_role || d.interest || "Lead Member",
          image:
            d.photo_url ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
          descriptionKey: "",
          customDescription:
            [d.city, d.state].filter(Boolean).join(", ") ||
            "Committee Lead Member",
          phone: d.phone_number,
          email: d.email,
        }));

        setDynamicLeadMembers(mapped);
      }
    };

    const fetchExecutiveMembers = async () => {
      setExecutiveMembersLoading(true);
      const { data, error } = await supabase
        .from("executive_members")
        .select("name_en, name_hi")
        .eq("is_active", true)
        .order("display_order", { ascending: true }).order("id");

      setExecutiveMembersError(Boolean(error));
      setDbExecutiveMembers((data || []).map((d) => ({ en: d.name_en, hi: d.name_hi })));
      setExecutiveMembersLoading(false);
    };

    const fetchMainMembers = async () => {
      const { data, error } = await supabase.from("main_members").select("*").order("display_order").order("id");
      setMainMembersError(Boolean(error));
      setMainMembers(data || []);
      setMainMembersLoading(false);
    };
    fetchMainMembers();
    fetchLeadMembers();
    fetchExecutiveMembers();
  }, []);

  const getTranslated = (key: string): string => {
    return membersDict[language]?.[key] || membersDict.en?.[key] || key;
  };

  const allMembers = [...mainMembers.map(member => ({
    id: member.id,
    name: { en: member.name_en, hi: member.name_hi },
    roleKey: member.role_key,
    customRole: language === "hi" ? member.role_hi : member.role_en,
    image: member.photo_url,
    descriptionKey: "",
    customDescription: language === "hi" ? member.description_hi : member.description_en,
    phone: member.phone,
  })), ...dynamicLeadMembers];

  // Main Members Filter
  const filteredMembers = allMembers.filter((member) => {
    const memberName =
      language === "hi" ? member.name.hi : member.name.en;

    const matchesSearch = memberName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRole =
      selectedRole === "members.role.all" ||
        selectedRole === "members.role.executive"
        ? selectedRole !== "members.role.executive"
        : member.roleKey === selectedRole;

    return matchesSearch && matchesRole;
  });

  // Executive Members Filter — only database results are displayed
  const filteredExecutiveMembers = dbExecutiveMembers.filter((member) => {
    const memberName =
      language === "hi" ? member.hi : member.en;

    const matchesSearch = memberName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRole =
      selectedRole === "members.role.all" ||
      selectedRole === "members.role.executive";

    return matchesSearch && matchesRole;
  });

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 grow pt-32">
        <Section title={getTranslated("members.title")}>
          <div className="mx-auto max-w-7xl">

            <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">

              <div className="relative w-full max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-5 w-5 text-saffron" />
                </div>

                <input
                  type="text"
                  placeholder={getTranslated("members.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-full border border-saffron/30 bg-black/50 p-3 pl-12 text-white placeholder-gray-400 transition-all focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-all ${selectedRole === role
                      ? "bg-saffron text-white shadow-[0_0_10px_rgba(255,153,51,0.5)]"
                      : "border border-gray-800 bg-temple-card text-gray-300 hover:border-saffron/50"
                      }`}
                  >
                    {getTranslated(role)}
                  </button>
                ))}
              </div>
            </div>

            {mainMembersError && <p role="alert" className="mb-6 text-center text-gray-400">{language === "hi" ? "मुख्य सदस्यों की सूची लोड नहीं हो सकी। कृपया पेज रिफ्रेश करें।" : "Unable to load main members. Please refresh the page."}</p>}
            {mainMembersLoading && <p className="mb-6 text-center text-gray-400">{language === "hi" ? "मुख्य सदस्य लोड हो रहे हैं..." : "Loading main members..."}</p>}
            {/* Members Grid */}
            {selectedRole !== "members.role.executive" && (
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
                      role:
                        member.customRole ||
                        getTranslated(member.roleKey),
                      description:
                        member.customDescription ||
                        getTranslated(member.descriptionKey),
                    }}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!mainMembersLoading && !mainMembersError && !executiveMembersLoading && filteredMembers.length === 0 &&
              filteredExecutiveMembers.length === 0 && (
                <div className="py-20 text-center font-body text-gray-400">
                  {getTranslated("members.empty")}
                </div>
              )}

            {/* Executive Members */}
            {executiveMembersError && (
              <p role="alert" className="text-center text-gray-400">
                {language === "hi" ? "कार्यकारिणी सदस्यों की सूची लोड नहीं हो सकी। कृपया पेज रिफ्रेश करें।" : "Unable to load executive members. Please refresh the page."}
              </p>
            )}
            {(filteredExecutiveMembers.length > 0 || executiveMembersLoading) &&
              (selectedRole === "members.role.all" || selectedRole === "members.role.executive") && (
              <div className="mt-24">
                <h2 className="mb-10 text-center font-heading text-3xl text-saffron">
                  {getTranslated("executive.title")}
                </h2>

                {executiveMembersLoading ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-14 rounded-2xl border border-saffron/10 bg-black/30 animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredExecutiveMembers.map((member, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-saffron/20 bg-black/40 px-6 py-4 text-center backdrop-blur-sm transition-all hover:border-saffron/50"
                      >
                        <p className="font-body text-lg text-white">
                          {language === "hi" ? member.hi : member.en}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
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