"use client";

import { useEffect, useState } from "react";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/home/footer";
import { MemberCard } from "@/components/members/member-card";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/language-context";

// Translation Dictionary
const communityDict: Record<string, Record<string, string>> = {
    en: {
        "community.title": "Community Members",
        "community.subtitle":
            "These are the respected community members who joined Hanuman Pushpavarsha Committee through the membership process.",
        "community.empty": "No community members found yet.",
        "community.defaultRole": "Community Member",
        "community.defaultDescription": "Paid Community Member",
    },

    hi: {
        "community.title": "समुदाय सदस्य",
        "community.subtitle":
            "ये वे सम्मानित सदस्य हैं जिन्होंने सदस्यता प्रक्रिया के माध्यम से हनुमान पुष्पवर्षा समिति से जुड़कर अपना योगदान दिया है।",
        "community.empty": "अभी तक कोई समुदाय सदस्य नहीं मिला।",
        "community.defaultRole": "समुदाय सदस्य",
        "community.defaultDescription": "सशुल्क समुदाय सदस्य",
    },
};

export default function CommunityMembersPage() {
    const [members, setMembers] = useState<any[]>([]);
    const { language } = useLanguage();

    const getTranslated = (key: string): string => {
        return (
            communityDict[language]?.[key] ||
            communityDict.en?.[key] ||
            key
        );
    };

    useEffect(() => {
        const fetchCommunityMembers = async () => {
            const { data, error } = await supabase
                .from("join_members")
                .select("*")
                .neq("is_lead_member", true)
                .not("razorpay_payment_id", "is", null);

            if (error) {
                console.error("Community members fetch error:", error);
                return;
            }

            const mappedMembers =
                data?.map((member: any) => ({
                    id: member.id,

                    name:
                        member.full_name ||
                        getTranslated("community.defaultRole"),

                    role:
                        member.interest_role ||
                        member.interest ||
                        getTranslated("community.defaultRole"),

                    image:
                        member.photo_url ||
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",

                    description:
                        [member.city, member.state]
                            .filter(Boolean)
                            .join(", ") ||
                        getTranslated("community.defaultDescription"),

                    phone: member.phone_number,
                    email: member.email,
                })) || [];

            setMembers(mappedMembers);
        };

        fetchCommunityMembers();
    }, [language]);

    return (
        <main className="relative flex min-h-screen w-full flex-col bg-black">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <SpiritualBackground />
            </div>

            {/* Main Content */}
            <div className="relative z-10 grow pt-32">
                <Section title={getTranslated("community.title")}>
                    <div className="mx-auto max-w-7xl">

                        {/* Subtitle */}
                        <p className="mx-auto mb-12 max-w-3xl text-center font-body text-gray-300">
                            {getTranslated("community.subtitle")}
                        </p>

                        {/* Members Grid */}
                        {members.length > 0 ? (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {members.map((member, index) => (
                                    <MemberCard
                                        key={member.id}
                                        index={index}
                                        member={member}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center font-body text-gray-400">
                                {getTranslated("community.empty")}
                            </div>
                        )}

                    </div>
                </Section>
            </div>

            {/* Footer */}
            <div className="relative z-10">
                <Footer />
            </div>
        </main>
    );
}