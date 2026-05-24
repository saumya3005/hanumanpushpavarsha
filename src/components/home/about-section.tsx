import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { HandHeart, Users, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const features = [
  {
    icon: <HandHeart className="h-8 w-8 text-saffron" />,
    key: "about.feat1",
  },
  {
    icon: <Users className="h-8 w-8 text-saffron" />,
    key: "about.feat2",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-saffron" />,
    key: "about.feat3",
  },
];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t("about.title")}>
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-12 font-body text-lg md:text-xl leading-relaxed text-gray-300">
          {t("about.p")}
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl border border-saffron/20 bg-temple-card p-8 shadow-lg transition-colors hover:border-saffron/50"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-saffron/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="mb-6 inline-flex rounded-full bg-saffron/10 p-4 ring-1 ring-saffron/30">
                {feature.icon}
              </div>
              <h3 className="mb-4 font-spiritual text-2xl font-bold text-gold">
                {t(`${feature.key}.title`)}
              </h3>
              <p className="font-body text-gray-400">
                {t(`${feature.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
