"use client";

import { useEffect, useState } from "react";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/home/footer";
import { MemberCard } from "@/components/members/member-card";
import { supabase } from "@/lib/supabase";

export default function CommunityMembersPage() {
    const [members, setMembers] = useState<any[]>([]);

    useEffect(() => {
        const fetchCommunityMembers = async () => {
            const { data, error } = await supabase
                .from("join_members")
                .select("*")
                .eq("is_lead_member", false)
                .not("razorpay_payment_id", "is", null)
                .eq("member_status", "approved");

            if (error) {
                console.error("Community members fetch error:", error);
                return;
            }

            const approvedData = data?.filter((m: any) => {
                const currentStatus = (m.member_status || m.status || "pending").toLowerCase();
                return currentStatus === "approved";
            });

            const mappedMembers =
                approvedData?.map((member: any) => ({
                    id: member.id,
                    name: member.full_name || member.first_name ? `${member.first_name} ${member.last_name}` : "Community Member",
                    role: member.interest_role || member.interest || "Community Member",
                    image:
                        member.photo_url ||
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
                    description:
                        [member.city, member.state].filter(Boolean).join(", ") ||
                        "Paid Community Member",
                    phone: member.phone_number || member.phone,
                    email: member.email,
                })) || [];

            setMembers(mappedMembers);
        };

        fetchCommunityMembers();
    }, []);

    return (
        <main className="relative flex min-h-screen w-full flex-col bg-black">
            <div className="fixed inset-0 z-0">
                <SpiritualBackground />
            </div>

            <div className="relative z-10 grow pt-32">
                <Section title="Community Members">
                    <div className="mx-auto max-w-7xl">
                        <p className="mx-auto mb-12 max-w-3xl text-center font-body text-gray-300">
                            These are the respected community members who joined Hanuman
                            Pushpavarsha Committee through the membership process.
                        </p>

                        {members.length > 0 ? (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {members.map((member, index) => (
                                    <MemberCard key={member.id} index={index} member={member} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center font-body text-gray-400">
                                No community members found yet.
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