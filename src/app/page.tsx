"use client";

import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Pushpavarsha } from "@/components/ui/pushpavarsha";
import Hero from "@/components/ui/animated-shader-hero";
import { AboutSection } from "@/components/home/about-section";
import { StatsSection } from "@/components/home/stats-section";
import { EventsSection } from "@/components/home/events-section";
import { DonationAppealSection } from "@/components/home/donation-appeal";
import { Footer } from "@/components/home/footer";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen w-full flex flex-col">
      {/* Background & Effects */}
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>
      <Pushpavarsha intensity="medium" />

      {/* Hero Section */}
      <Hero
        trustBadge={{
          text: t("hero.trust"),
          icons: ["🕉️", "✨", "🚩"],
        }}
        headline={{
          line1: t("hero.line1"),
          line2: t("hero.line2"),
        }}
        subtitle={t("hero.subtitle")}
        buttons={{
          primary: {
            text: t("hero.btn.join"),
            href: "/join",
          },
          secondary: {
            text: t("hero.btn.donate"),
            href: "/donation",
          },
        }}
      />

      {/* Main Content Sections */}
      <div className="relative z-10 bg-temple-bg/90 backdrop-blur-md">
        <AboutSection />
        <StatsSection />
        <EventsSection />
        <DonationAppealSection />
        <Footer />
      </div>
    </main>
  );
}
