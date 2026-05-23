"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { DivineButton } from "@/components/ui/divine-button";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";

// Placeholder data - later to be fetched from Supabase
const upcomingEvents = [
  {
    id: 1,
    title: "Maha Aarti & Pushpavarsha",
    date: "25 Oct 2026",
    time: "06:00 PM",
    venue: "Main Temple Ground, Prayagraj",
    image:
      "https://images.unsplash.com/photo-1542104445-5cb3d4b655ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Sundarkand Path",
    date: "02 Nov 2026",
    time: "04:00 PM",
    venue: "Community Hall",
    image:
      "https://images.unsplash.com/photo-1623910270519-7977ba2e01df?auto=format&fit=crop&q=80&w=800",
  },
];

export function EventsSection() {
  return (
    <Section
      id="events"
      title="Upcoming Events"
      className="bg-temple-bg/50"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-saffron/20 bg-temple-card shadow-xl transition-all hover:border-saffron/60 hover:shadow-saffron/20"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-temple-card to-transparent" />
              </div>

              {/* Event Details */}
              <div className="relative z-10 p-6">
                <h3 className="mb-4 font-spiritual text-2xl font-bold text-white transition-colors group-hover:text-gold">
                  {event.title}
                </h3>

                <div className="mb-6 space-y-2 font-body text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-saffron" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-saffron" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-saffron" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link href="/join">
                    <DivineButton variant="outline" size="sm">
                      Register Now
                    </DivineButton>
                  </Link>

                  <div className="animate-pulse text-sm text-saffron-light">
                    Join Us
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/live">
            <DivineButton variant="ghost">
              View All Events
            </DivineButton>
          </Link>
        </div>
      </div>
    </Section>
  );
}