import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Pushpavarsha } from "@/components/ui/pushpavarsha";
import { DivineButton } from "@/components/ui/divine-button";
import { TempleBell } from "@/components/ui/temple-bell";
import { ArrowRight, Heart, Calendar } from "lucide-react";
import { AboutSection } from "@/components/home/about-section";
import { StatsSection } from "@/components/home/stats-section";
import { EventsSection } from "@/components/home/events-section";
import { DonationAppealSection } from "@/components/home/donation-appeal";
import { Footer } from "@/components/home/footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col">
      {/* Background & Effects */}
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>
      <Pushpavarsha intensity="medium" />

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Top Hanging Bells */}
        <div className="absolute top-0 flex w-full justify-between px-[10%] md:px-[20%]">
          <TempleBell />
          <TempleBell />
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="animate-glow-pulse font-hindi text-4xl md:text-6xl lg:text-8xl text-saffron gold-glow drop-shadow-[0_0_15px_rgba(255,153,51,0.8)]">
            जय श्री राम
          </div>
          
          <h1 className="font-spiritual text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white">
            Hanuman Pushpavarsha <br className="hidden md:block" />
            <span className="text-gold">Committee</span>
          </h1>
          
          <p className="max-w-2xl font-body text-lg md:text-xl text-gray-300">
            Serving Dharma, Devotion, Culture & Humanity. Join us in our spiritual journey and community service.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/join">
              <DivineButton variant="primary" size="lg">
                Join Committee <ArrowRight className="h-5 w-5" />
              </DivineButton>
            </Link>
            <Link href="/donation">
              <DivineButton variant="secondary" size="lg">
                Donate Now <Heart className="h-5 w-5 text-red-500" />
              </DivineButton>
            </Link>
            <Link href="/live">
              <DivineButton variant="outline" size="lg" withGlow={false}>
                Watch Live Event <Calendar className="h-5 w-5" />
              </DivineButton>
            </Link>
          </div>
        </div>
      </section>

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
