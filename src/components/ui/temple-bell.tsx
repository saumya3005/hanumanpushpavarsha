"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Bell } from "lucide-react";

export function TempleBell({ className }: { className?: string }) {
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bellRef.current) return;

    // Gentle pendulum swing
    gsap.to(bellRef.current, {
      rotation: 15,
      transformOrigin: "top center",
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      duration: 2,
    });
  }, []);

  return (
    <div
      ref={bellRef}
      className={`relative inline-flex flex-col items-center justify-center ${className}`}
    >
      {/* Chain/Rope */}
      <div className="h-16 w-1 bg-gradient-to-b from-black to-gold shadow-md" />
      {/* Bell */}
      <div className="relative flex items-center justify-center rounded-t-full rounded-b-md bg-gradient-to-br from-gold-light via-gold to-gold-dark p-4 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
        <Bell className="h-8 w-8 text-black opacity-80" strokeWidth={1.5} />
        {/* Glow behind bell */}
        <div className="absolute inset-0 -z-10 animate-glow-pulse rounded-full bg-gold opacity-30 blur-xl" />
      </div>
      {/* Clapper */}
      <div className="h-3 w-3 rounded-full bg-yellow-900 shadow-inner" />
    </div>
  );
}
