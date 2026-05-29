import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Section } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

const stats = [
  { key: "stats.members", value: 50, suffix: "+" },

  { key: "stats.years", value: 70, suffix: "+" },


];

export function StatsSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Section id="stats" className="border-y border-saffron/20 bg-linear-to-b from-black to-temple-bg py-16">
      <div ref={ref} className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8 md:gap-16">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-center">
            <div className="font-spiritual text-4xl md:text-6xl font-bold text-saffron gold-glow">
              {inView ? (
                <CountUp end={stat.value} duration={2.5} separator="," />
              ) : (
                "0"
              )}
              {stat.suffix}
            </div>
            <div className="mt-2 font-body text-sm md:text-base font-medium uppercase tracking-widest text-gray-400">
              {t(stat.key)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
