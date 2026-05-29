import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { DivineButton } from "@/components/ui/divine-button";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

// Placeholder data - later to be fetched from Supabase
const upcomingEvents = [
  {
    id: 1,
    key: "events.event1",
    date: "13 Oct 2026 - 19 Oct 2026",
    time: "08:30 PM",
    image:
      "https://i.postimg.cc/R0cjfyj5/hpvc-10-2025.jpg",
  },
  {
    id: 2,
    key: "events.event2",
    date: "20 Oct 2026",
    time: "04:00 AM",
    image:
      "https://i.postimg.cc/HsXYwysh/hpvc-7-2025.jpg",
  },

  // NEW EVENT 3
  {
    id: 3,
    key: "events.event3",
    date: "21 Oct 2026",
    time: "07:00 PM",
    image:
      "https://i.postimg.cc/15wmGq5W/hpvc-4-2025.jpg",
  },

  // NEW EVENT 4
  {
    id: 4,
    key: "events.event4",
    date: "24 Oct 2026",
    time: "08:00 PM",
    image:
      "https://i.postimg.cc/MKV67Qpz/hpvc-papa.jpg",
  },
];

export function EventsSection() {
  const { t } = useLanguage();

  return (
    <Section
      id="events"
      title={t("events.title")}
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
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={t(`${event.key}.title`)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-temple-card to-transparent" />
              </div>

              {/* Event Details */}
              <div className="relative z-10 p-6">
                <h3 className="mb-4 font-spiritual text-2xl font-bold text-white transition-colors group-hover:text-gold">
                  {t(`${event.key}.title`)}
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
                    <span>{t(`${event.key}.venue`)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link href="/join">
                    <DivineButton variant="outline" size="sm">
                      {t("events.btn.register")}
                    </DivineButton>
                  </Link>

                  <div className="animate-pulse text-sm text-saffron-light">
                    {t("events.join")}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/live">
            <DivineButton variant="ghost">
              {t("events.btn.view")}
            </DivineButton>
          </Link>
        </div>
      </div>
    </Section>
  );
}