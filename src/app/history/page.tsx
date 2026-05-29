"use client";

import { motion } from "framer-motion";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/home/footer";
import { useLanguage } from "@/lib/language-context";

const historyContent = {
  en: {
    title: "Our Divine Journey",
    heading: "The Legacy of Faith & Devotion",

    paragraphs: [
      `Hanuman Pushpa Varsha Committee, Prayagraj, is a religious and cultural organization that has been setting a remarkable example of faith, tradition, and service for decades. Established in the year 1954, the committee has continuously preserved and carried forward its unique tradition with dedication and devotion.`,

      `Located at Sulaki Chauraha in Prayagraj, the committee organizes a special and divine event during the sacred occasion of Dussehra, which has become a center of faith not only for the local residents but also for devotees visiting from far and wide. This event is not just a program, but a living symbol of devotion, spirituality, and cultural heritage.`,

      `During Dussehra, when the sacred procession of Lord Ram, Laxman, and Mata Sita passes through Sulaki Chauraha, Lord Hanuman performs the divine Pushpa Varsha (flower shower) organized by the Hanuman Pushpa Varsha Committee.`,

      `The most special highlight of this tradition is the two main days when Lord Hanuman performs the grand Aarti, creating a deeply emotional and spiritual experience for all devotees.`,

      `The tradition of Hanuman Pushpa Varsha Committee is not limited to a religious event alone; it also promotes unity, cooperation, and cultural values within society.`,

      `Today, after more than 70 years of this glorious journey, Hanuman Pushpa Varsha Committee continues to carry forward its invaluable tradition with the same devotion and enthusiasm.`,
    ],

    foundersTitle: "Founders & Contributors",

    founderIntro:
      "We respectfully remember and pay tribute to the great individuals whose invaluable contributions led to the establishment of the Hanuman Pushpa Varsha Committee:",

    founders: [
      "Late Munna Pehlwan",
      "Late Makkhan Lal Kesarwani",
      "Late Shyam Manohar Gupta",
      "Late Mohan Lal Jaiswal",
    ],

    contributorsIntro:
      "We also express our sincere gratitude to those who played a significant role in supporting the foundation and growth of the committee:",

    contributors: [
      "Late Shri Krishna Tiwari",
      "Rajendra Gupta",
      "Ram Chandra Gupta",
      "Harish Chandra Gupta",
    ],

    footer: "|| Jai Shri Ram ||",
  },

  hi: {
    title: "हमारी दिव्य यात्रा",
    heading: "आस्था और भक्ति की गौरवशाली विरासत",

    paragraphs: [
      `हनुमान पुष्प वर्षा कमेटी, प्रयागराज, एक धार्मिक और सांस्कृतिक संस्था है जो वर्षों से आस्था, परंपरा और सेवा की मिसाल प्रस्तुत कर रही है।`,

      `प्रयागराज के सुलाकी चौराहा क्षेत्र में स्थित यह कमेटी दशहरा के पावन अवसर पर विशेष और दिव्य आयोजन करती है।`,

      `दशहरा के दौरान भगवान श्रीराम, लक्ष्मण और माता सीता की पवित्र झांकी के स्वागत में हनुमान जी द्वारा भव्य पुष्प वर्षा की जाती है।`,

      `इस परंपरा का विशेष आकर्षण वे दो मुख्य दिन होते हैं जब हनुमान जी द्वारा भव्य आरती की जाती है।`,

      `यह परंपरा केवल धार्मिक आयोजन तक सीमित नहीं है बल्कि समाज में एकता और सांस्कृतिक मूल्यों को भी मजबूत करती है।`,

      `70 वर्षों से अधिक की इस गौरवशाली यात्रा के साथ कमेटी अपनी इस अमूल्य परंपरा को निरंतर आगे बढ़ा रही है।`,
    ],

    foundersTitle: "संस्थापक एवं योगदानकर्ता",

    founderIntro:
      "हनुमान पुष्प वर्षा कमेटी की स्थापना में जिन महान व्यक्तियों का अमूल्य योगदान रहा, उन्हें हम सादर नमन करते हैं:",

    founders: [
      "स्वर्गीय मुन्ना पहलवान",
      "स्वर्गीय मक्कन लाल केसरवानी",
      "स्वर्गीय श्याम मनोहर गुप्ता",
      "स्वर्गीय मोहन लाल जायसवाल",
    ],

    contributorsIntro:
      "कमेटी की स्थापना और संचालन में महत्वपूर्ण भूमिका निभाने वाले महान व्यक्तियों के प्रति हम अपनी कृतज्ञता व्यक्त करते हैं:",

    contributors: [
      "स्वर्गीय श्री कृष्ण तिवारी",
      "श्री राजेंद्र गुप्ता",
      "श्री राम चंद्र गुप्ता",
      "श्री हरीश चंद्र गुप्ता",
    ],

    footer: "|| जय श्री राम ||",
  },
};

export default function HistoryPage() {
  const { language } = useLanguage();

  const current =
    language === "hi"
      ? historyContent.hi
      : historyContent.en;

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      {/* Main Content */}
      <div className="relative z-10 grow pt-32 pb-20">
        <Section title={current.title}>
          <div className="mx-auto max-w-4xl px-4 md:px-8 space-y-12">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h3 className="font-spiritual text-2xl md:text-3xl text-yellow-400 mb-4 uppercase tracking-widest">
                {current.heading}
              </h3>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto rounded-full" />
            </motion.div>

            {/* History Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 md:p-12 bg-black/40 backdrop-blur-sm border border-orange-400/10 rounded-3xl"
            >
              <div className="space-y-8">
                {current.paragraphs.map(
                  (paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="text-gray-300 text-lg leading-loose text-justify md:text-center"
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            </motion.div>

            {/* Founders Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 md:p-12 bg-black/40 backdrop-blur-sm border border-yellow-400/10 rounded-3xl"
            >
              <div className="space-y-10">

                <div className="text-center">
                  <h3 className="font-spiritual text-2xl md:text-3xl text-yellow-400 mb-4">
                    👑 {current.foundersTitle}
                  </h3>

                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full" />
                </div>

                {/* Founders */}
                <div className="space-y-5">
                  <h4 className="text-orange-400 text-xl font-bold text-center">
                    🕊️ {language === "hi"
                      ? "संस्थापक"
                      : "Founder Members"}
                  </h4>

                  <p className="text-gray-300 text-lg leading-loose text-center">
                    {current.founderIntro}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    {current.founders.map(
                      (founder: string, index: number) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-orange-400/20 bg-black/30 px-6 py-4 text-center text-white text-lg"
                        >
                          {founder}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Contributors */}
                <div className="space-y-5 pt-6">
                  <h4 className="text-yellow-400 text-xl font-bold text-center">
                    🤝 {language === "hi"
                      ? "अहम सहयोगी"
                      : "Key Contributors"}
                  </h4>

                  <p className="text-gray-300 text-lg leading-loose text-center">
                    {current.contributorsIntro}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    {current.contributors.map(
                      (contributor: string, index: number) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-yellow-400/20 bg-black/30 px-6 py-4 text-center text-white text-lg"
                        >
                          {contributor}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex justify-center mt-16"
            >
              <div className="px-8 py-4 border border-yellow-400/30 rounded-full bg-orange-400/5 text-yellow-400 font-spiritual text-xl">
                {current.footer}
              </div>
            </motion.div>

          </div>
        </Section>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}