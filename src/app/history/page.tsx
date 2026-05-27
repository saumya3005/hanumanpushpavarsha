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

      `During Dussehra, when the sacred procession of Lord Ram, Laxman, and Mata Sita passes through Sulaki Chauraha, Lord Hanuman performs the divine Pushpa Varsha (flower shower) organized by the Hanuman Pushpa Varsha Committee. This flower shower is considered a blessing for the devotees, and thousands gather every year to witness this divine moment.`,

      `The most special highlight of this tradition is the two main days when Lord Hanuman performs the grand Aarti, creating a deeply emotional and spiritual experience for all devotees, strengthening their faith and devotion.`,

      `The tradition of Hanuman Pushpa Varsha Committee is not limited to a religious event alone; it also promotes unity, cooperation, and cultural values within society. All the members associated with the committee contribute with full dedication and selfless service to make this event successful.`,

      `Today, after more than 70 years of this glorious journey, Hanuman Pushpa Varsha Committee continues to carry forward its invaluable tradition with the same devotion and enthusiasm. Embracing modern times, the committee is now moving towards digital platforms to share this divine tradition with a wider audience, ensuring that future generations remain connected to this heritage and continue to preserve it.`,
    ],
    footer: "|| Jai Shri Ram ||",
  },

  hi: {
    title: "हमारी दिव्य यात्रा",
    heading: "आस्था और भक्ति की गौरवशाली विरासत",
    paragraphs: [
      `हनुमान पुष्प वर्षा कमेटी, प्रयागराज, एक ऐसी धार्मिक और सांस्कृतिक संस्था है जो वर्षों से आस्था, परंपरा और सेवा की अद्भुत मिसाल प्रस्तुत कर रही है। इस कमेटी की स्थापना वर्ष 1954 में हुई थी और तब से लेकर आज तक यह कमेटी निरंतर अपनी अनूठी परंपरा को संजोए हुए है।`,

      `प्रयागराज के सुलाकी चौराहा क्षेत्र में स्थित यह कमेटी दशहरा के पावन अवसर पर एक विशेष और दिव्य आयोजन करती है, जो न केवल शहर के लोगों के लिए बल्कि दूर-दूर से आने वाले श्रद्धालुओं के लिए आस्था का केंद्र बन चुका है। यह आयोजन केवल एक कार्यक्रम नहीं, बल्कि श्रद्धा, भक्ति और सांस्कृतिक विरासत का जीवंत प्रतीक है।`,

      `दशहरा के दौरान, जब भगवान श्रीराम, लक्ष्मण और माता सीता की पवित्र झांकी सुलाकी चौराहा से होकर गुजरती है, तब हनुमान पुष्प वर्षा कमेटी द्वारा हनुमान जी भव्य पुष्प वर्षा करते हैं। यह पुष्प वर्षा भक्तों के लिए भगवान के आशीर्वाद का प्रतीक मानी जाती है और इस दिव्य दृश्य को देखने के लिए हर वर्ष हजारों श्रद्धालु एकत्रित होते हैं।`,

      `इस परंपरा का विशेष आकर्षण वे दो मुख्य दिन होते हैं, जब हनुमान जी द्वारा भव्य आरती की जाती है। यह आरती भक्तों के लिए अत्यंत भावपूर्ण और दिव्य अनुभव होती है, जो सभी के मन में श्रद्धा और भक्ति की भावना को और गहरा करती है।`,

      `हनुमान पुष्प वर्षा कमेटी की यह परंपरा केवल धार्मिक आयोजन तक सीमित नहीं है, बल्कि यह समाज में एकता, सहयोग और सांस्कृतिक मूल्यों को भी सुदृढ़ करने का कार्य करती है। इस कमेटी से जुड़े सभी सदस्य पूरे समर्पण और निस्वार्थ भाव से इस आयोजन को सफल बनाने में अपना योगदान देते हैं।`,

      `आज, 70 से अधिक वर्षों की इस गौरवशाली यात्रा के साथ, हनुमान पुष्प वर्षा कमेटी निरंतर अपनी इस अमूल्य परंपरा को आगे बढ़ा रही है। समय के साथ आधुनिकता को अपनाते हुए, यह कमेटी अब अपनी इस दिव्य परंपरा को डिजिटल माध्यम से भी लोगों तक पहुँचाने की दिशा में अग्रसर है, ताकि आने वाली पीढ़ियाँ भी इस विरासत से जुड़ सकें और इसे आगे बढ़ा सकें।`,
    ],
    footer: "|| जय श्री राम ||",
  },
};

export default function HistoryPage() {
  const { language } = useLanguage();

  const current =
    language === "hi" ? historyContent.hi : historyContent.en;

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow pt-32 pb-20">
        <Section title={current.title}>
          <div className="mx-auto max-w-4xl px-4 md:px-8 space-y-12">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h3 className="font-spiritual text-2xl md:text-3xl text-gold mb-4 uppercase tracking-widest">
                {current.heading}
              </h3>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-saffron to-transparent mx-auto rounded-full" />
            </motion.div>

            {/* History Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="relative p-8 md:p-12 bg-black/40 backdrop-blur-sm border border-saffron/10 rounded-3xl shadow-[0_0_30px_rgba(255,153,51,0.05)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-saffron/5 to-transparent rounded-3xl pointer-events-none" />

              <div className="relative z-10 space-y-8">
                {current.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-body text-gray-300 text-lg md:text-xl leading-loose md:leading-loose text-justify md:text-center"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Footer Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center mt-16"
            >
              <div className="px-8 py-4 border border-gold/30 rounded-full bg-saffron/5 text-gold font-spiritual text-xl shadow-[0_0_20px_rgba(255,215,0,0.1)]">
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