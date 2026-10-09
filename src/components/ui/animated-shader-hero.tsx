"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Types for component props
interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      href?: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      href?: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

// Reusable Hero Component
const Hero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = "",
}) => {
  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      {/* Desktop Background Image */}
      <Image
        src="/hero-bg.jpg"
        alt="Hanuman Pushpvarsha Hero Desktop"
        fill
        className="hidden md:block object-cover object-center z-0"
        priority
      />
      {/* Mobile Background Image */}
      <Image
        src="/hero-bg-mobile.jpg"
        alt="Hanuman Pushpvarsha Hero Mobile"
        fill
        className="block md:hidden object-cover object-center z-0"
        priority
      />
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-none z-0"></div>
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0"></div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-32 md:justify-center text-white p-6 sm:p-12 md:p-20">
        <div className="max-w-4xl text-left space-y-6">
          {/* Trust Badge */}
          {trustBadge && (
            <div className="mb-6 animate-fade-in-down inline-block">
              <div className="flex items-center gap-2 px-6 py-3 bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full text-sm">
                {trustBadge.icons && (
                  <div className="flex">
                    {trustBadge.icons.map((icon, index) => (
                      <span key={index} className={`text-${index === 0 ? "yellow" : index === 1 ? "orange" : "amber"}-300`}>
                        {icon}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-orange-100">{trustBadge.text}</span>
              </div>
            </div>
          )}

          {/* Main Heading with Animation */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-linear-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
              {headline.line1}
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
              {headline.line2}
            </h1>
          </div>
          
          {/* Subtitle with Animation */}
          <div className="max-w-2xl animate-fade-in-up animation-delay-600">
            <p className="text-lg md:text-xl lg:text-2xl text-orange-100/90 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>
          
          {/* CTA Buttons with Animation */}
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up animation-delay-800">
              {buttons.primary && (
                buttons.primary.href ? (
                  <Link 
                    href={buttons.primary.href}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-linear-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 flex items-center justify-center w-full sm:w-auto"
                  >
                    {buttons.primary.text}
                  </Link>
                ) : (
                  <button 
                    onClick={buttons.primary.onClick}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-linear-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 w-full sm:w-auto"
                  >
                    {buttons.primary.text}
                  </button>
                )
              )}
              {buttons.secondary && (
                buttons.secondary.href ? (
                  <Link 
                    href={buttons.secondary.href}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center w-full sm:w-auto"
                  >
                    {buttons.secondary.text}
                  </Link>
                ) : (
                  <button 
                    onClick={buttons.secondary.onClick}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
                  >
                    {buttons.secondary.text}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
