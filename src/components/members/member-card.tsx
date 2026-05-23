"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  phone?: string;
  email?: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  description?: string;
}

interface MemberCardProps {
  member: Member;
  index: number;
}

export function MemberCard({ member, index }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-saffron/20 bg-temple-card p-6 shadow-xl transition-all hover:border-saffron/60 hover:shadow-[0_0_20px_rgba(255,153,51,0.15)]"
    >
      {/* Glow background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-saffron/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full border-2 border-saffron p-1">
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Member Info */}
        <h3 className="mb-1 font-spiritual text-xl font-bold text-white group-hover:text-gold transition-colors">
          {member.name}
        </h3>
        <span className="mb-4 inline-block rounded-full bg-saffron/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-saffron">
          {member.role}
        </span>
        
        {member.description && (
          <p className="mb-6 font-body text-sm text-gray-400 line-clamp-3">
            {member.description}
          </p>
        )}

        {/* Contact & Socials */}
        <div className="mt-auto flex items-center justify-center gap-4 border-t border-gray-800 pt-4 w-full">
          {member.phone && (
            <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-saffron transition-colors" title="Phone">
              <Phone className="h-4 w-4" />
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-saffron transition-colors" title="Email">
              <Mail className="h-4 w-4" />
            </a>
          )}
          {member.socials?.facebook && (
            <a href={member.socials.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-saffron transition-colors" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          )}
          {member.socials?.instagram && (
            <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-saffron transition-colors" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
