"use client";

import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.history": "History",
    "nav.members": "Members",
    "nav.gallery": "Gallery",
    "nav.live": "Live Event",
    "nav.join": "Join Us",
    "nav.donate": "Contribute",
    "nav.community": "Community Members",
    "community.title": "Community Members",
    "nav.admin": "Admin Dashboard",
    "admin.title": "Admin Dashboard",

    // Hero
    "hero.trust": "Trusted by Devotees & Spiritual Communities",
    "hero.line1": "जय श्री राम",
    "hero.line2": "Hanuman Pushpavarsha Committee",
    "hero.subtitle": "Serving Dharma, Devotion, Culture & Humanity Through Spiritual Events, Seva, and Pushpavarsha Celebrations.",
    "hero.btn.join": "Join Committee",
    "hero.btn.donate": "Contribute Now",

    // Footer
    "footer.title": "Hanuman Pushpavarsha",
    "footer.subtitle": "Serving Dharma, Devotion, Culture & Humanity. Join our community to spread the message of love and spirituality.",
    "footer.links": "Quick Links",
    "footer.about": "About Us",
    "footer.events": "Upcoming Events",
    "footer.gallery": "Gallery",
    "footer.donate": "Make a Contribution",
    "footer.contact": "Contact Us",
    "footer.timings": "Arti & Pushpvarsha Timings",
    "footer.timings.morning": "Maha Aarti",
    "footer.timings.darshan": "Darshan",
    "footer.timings.evening": "Pushpvarsha",

    // About Section
    "about.title": "Our Mission & Vision",
    "about.p": `
Hanuman Pushpa Varsha Committee, Prayagraj
(Established – 1954)

On the sacred occasion of Dussehra, this divine tradition held at Sulaki Chauraha, Prayagraj, has been a symbol of faith and devotion for decades.

During the days of Dussehra, Lord Hanuman performs daily Pushpa Varsha (flower shower), which is considered a blessing for all devotees.

The highlight of this tradition is the two special days when Lord Hanuman performs the grand Aarti, creating a truly divine and unforgettable experience for every devotee.
`,
    "about.feat1.title": "Religious Contribution",
    "about.feat1.desc": "Hanuman Pushpa Varsha Committee has been preserving this divine tradition of faith and devotion for decades. The sacred Pushpa Varsha and special celebrations during Dussehra create a spiritual and blessed experience for devotees. The committee continuously works towards promoting religious values and Sanatan culture.",
    "about.feat2.title": "Community Service",
    "about.feat2.desc": "The committee is not limited to religious events alone, but also strengthens the spirit of unity, cooperation, and service within society. All members contribute selflessly to make the celebrations successful. This tradition plays an important role in bringing people together and strengthening collective faith.",
    "about.feat3.title": "Cultural Activities",
    "about.feat3.desc": "Hanuman Pushpa Varsha Committee actively works towards preserving cultural heritage and traditions. The grand celebrations during Dussehra beautifully showcase Indian culture, devotion, and festive spirit. This tradition also serves as a bridge connecting the younger generation with their cultural roots and values.",

    // Stats Section
    "stats.members": "Total Members",
    "stats.events": "Events Organized",
    "stats.years": "Years of Service",
    "stats.donations": "Donations Collected",
    "stats.volunteers": "Volunteers Joined",

    // Events Section
    "events.title": "Upcoming Events",
    "events.btn.view": "View All Events",
    "events.btn.register": "Register Now",
    "events.join": "Join Us",
    "events.event1.title": "Pushpavarsha",
    "events.event1.venue": "Sulaki Chauraha, Prayagraj",
    "events.event2.title": "Maha Arti",
    "events.event2.venue": "Sulaki Chauraha, Prayagraj",
    "events.event3.title": "Roshni",
    "events.event3.venue": "Sulaki Chauraha, Prayagraj",

    "events.event4.title": "Gate Visarjan and Sundarkand",
    "events.event4.venue": "Sulaki Chauraha, Prayagraj",

    // Donation Appeal Section
    "donation.appeal.title": "Support Our Divine Cause",
    "donation.appeal.desc": "Your generous contribution helps us organize spiritual events, maintain our heritage, and serve the community through food distribution and social welfare programs. Every small donation makes a big difference.",
    "donation.appeal.btn": "Contribute Now",
    "donation.appeal.secure": "Secure Checkout",
    "donation.appeal.tax": "",

    // History Page
    "history.title": "Our Journey",
    "history.mission.title": "Spiritual Mission",
    "history.mission.p": "For over two decades, the Hanuman Pushpavarsha Committee has stood as a beacon of devotion, culture, and selfless service. Our mission has always been to spread the teachings of Lord Hanuman and foster a sense of brotherhood among all devotees.",
    "history.timeline.1995.title": "Foundation",
    "history.timeline.1995.desc": "The committee was formed by a group of dedicated devotees.",
    "history.timeline.2002.title": "First Grand Pushpavarsha",
    "history.timeline.2002.desc": "Organized the first massive flower petal rain during Hanuman Jayanti.",
    "history.timeline.2010.title": "Community Service Launch",
    "history.timeline.2010.desc": "Started weekly bhandaras for the underprivileged.",
    "history.timeline.2020.title": "Digital Outreach",
    "history.timeline.2020.desc": "Began live streaming aartis to connect devotees globally.",
    "history.founders.title": "Our Founders",
    "history.founder1.role": "Visionary Founder",

    // Members Page
    "members.title": "Committee Members",
    "members.search.placeholder": "Search members by name...",
    "members.filter.all": "All",
    "members.role.president": "President",
    "members.role.priest": "Chief Priest",
    "members.role.treasurer": "Treasurer",
    "members.role.coordinator": "Event Coordinator",
    "members.notfound": "No members found matching your criteria.",
    "members.member1.name": "Shri Ram Das",
    "members.member1.desc": "Leading the committee with a vision of spreading Hanuman ji's devotion across the nation.",
    "members.member2.name": "Pandit Hari Om",
    "members.member2.desc": "Head of all spiritual ceremonies and aarti programs organized by the committee.",
    "members.member3.name": "Rajiv Sharma",
    "members.member3.desc": "Managing committee funds and ensuring transparency in all charitable activities.",
    "members.member4.name": "Vikram Singh",
    "members.member4.desc": "Orchestrating grand events, pushpavarsha, and bhandaras.",

    // Gallery Page
    "gallery.title": "Divine Gallery",

    // Donation Page
    "donation.title": "Make a Divine Offering",
    "donation.form.title": "Donation Details",
    "donation.form.amount": "Select Amount (₹)",
    "donation.form.custom": "Custom Amount",
    "donation.form.purpose": "Purpose of Donation",
    "donation.form.purpose.general": "General Temple Development",
    "donation.form.purpose.food": "Annadaan (Food Distribution)",
    "donation.form.purpose.event": "Pushpavarsha Event",
    "donation.form.purpose.cows": "Goshala Maintenance",
    "donation.form.personal": "Personal Details",
    "donation.form.name": "Full Name",
    "donation.form.email": "Email Address",
    "donation.form.phone": "Phone Number",
    "donation.form.method.upi": "UPI / QR",
    "donation.form.method.card": "Card / Net",
    "donation.form.method.scan": "Scan with any UPI App",
    "donation.form.method.razorpay": "Proceed with Razorpay secure checkout for Cards, Net Banking, and Wallets.",
    "donation.form.btn.pay": "Pay via Razorpay",

    // Live Page
    "live.title": "Maha Aarti & Pushpavarsha",
    "live.venue": "Sangam Ghat, Prayagraj",
    "live.badge": "LIVE NOW",
    "live.action": "Click to Join Livestream",
    "live.announcements": "Announcements:",
    "live.announcement1": "Welcome to the live broadcast of Maha Aarti. • Please maintain digital decorum in chat. • Pushpavarsha will commence shortly.",

    // Join Page
    "join.title": "Join the Committee",
    "join.subtitle": "Become a part of our spiritual family and contribute to the service of Dharma.",
    "join.form.name": "Full Name *",
    "join.form.father": "Father's Name",
    "join.form.age": "Age *",
    "join.form.gender": "Gender *",
    "join.form.gender.select": "Select",
    "join.form.gender.male": "Male",
    "join.form.gender.female": "Female",
    "join.form.gender.other": "Other",
    "join.form.occupation": "Occupation",
    "join.form.phone": "Phone Number *",
    "join.form.email": "Email Address",
    "join.form.address": "Complete Address *",
    "join.form.reason": "Why do you want to join? *",
    "join.form.photo": "Recent Photo *",
    "join.form.photo.upload": "Click to upload image",
    "join.form.id": "Aadhaar / ID Proof *",
    "join.form.id.upload": "Click to upload document",
    "join.form.btn": "Submit Application",
  },
  hi: {
    // Navbar
    "nav.home": "मुख्य पृष्ठ",
    "nav.about": "हमारे बारे में",
    "nav.history": "इतिहास",
    "nav.members": "सदस्य",
    "nav.gallery": "गैलरी",
    "nav.live": "लाइव कार्यक्रम",
    "nav.join": "जुड़ें",
    "nav.donate": "दान करें",
    "nav.community": "समुदाय सदस्य",
    "community.title": "समुदाय सदस्य",
    "nav.admin": "एडमिन डैशबोर्ड",
    "admin.title": "एडमिन डैशबोर्ड",

    // Hero
    "hero.trust": "श्रद्धालुओं एवं आध्यात्मिक समुदायों द्वारा विश्वसनीय",
    "hero.line1": "जय श्री राम",
    "hero.line2": "हनुमान पुष्पवर्षा समिति",
    "hero.subtitle": "आध्यात्मिक आयोजनों, सेवा और भव्य पुष्पवर्षा उत्सवों के माध्यम से धर्म, भक्ति, संस्कृति और मानवता की सेवा।",
    "hero.btn.join": "समिति से जुड़ें",
    "hero.btn.donate": "अभी दान करें",

    // Footer
    "footer.title": "हनुमान पुष्पवर्षा",
    "footer.subtitle": "धर्म, भक्ति, संस्कृति और मानवता की सेवा। प्रेम और आध्यात्मिकता का संदेश फैलाने के लिए हमारे समुदाय से जुड़ें।",
    "footer.links": "त्वरित लिंक्स",
    "footer.about": "हमारे बारे में",
    "footer.events": "आगामी कार्यक्रम",
    "footer.gallery": "गैलरी",
    "footer.donate": "दान करें",
    "footer.contact": "संपर्क करें",
    "footer.timings": "आरती एवं पुष्पवर्षा का समय",
    "footer.timings.morning": "महा आरती",
    "footer.timings.darshan": "दर्शन",
    "footer.timings.evening": "पुष्पवर्षा",

    // About Section
    "about.title": "हमारा उद्देश्य और दृष्टिकोण",
    "about.p": `
हनुमान पुष्प वर्षा कमेटी, प्रयागराज
(स्थापना – 1954)

दशहरा के पावन अवसर पर सुलाकी चौराहा, प्रयागराज में आयोजित यह दिव्य परंपरा वर्षों से आस्था और भक्ति का प्रतीक बनी हुई है।

दशहरा के दिनों में हनुमान जी द्वारा प्रतिदिन भव्य पुष्प वर्षा की जाती है, जो श्रद्धालुओं के लिए आशीर्वाद का रूप है।

इस परंपरा का विशेष आकर्षण वे दो दिन होते हैं, जब हनुमान जी द्वारा भव्य आरती की जाती है, जो हर भक्त के लिए एक अद्भुत और दिव्य अनुभव होता है।
`,
    "about.feat1.title": "धार्मिक योगदान",
    "about.feat1.desc": "हनुमान पुष्प वर्षा कमेटी वर्षों से धार्मिक आस्था और भक्ति की इस दिव्य परंपरा को संजोए हुए है। दशहरा के पावन अवसर पर आयोजित पुष्प वर्षा और विशेष आयोजन श्रद्धालुओं के लिए आशीर्वाद और आध्यात्मिक अनुभव का माध्यम बनते हैं। कमेटी निरंतर धार्मिक मूल्यों और सनातन संस्कृति को आगे बढ़ाने का कार्य कर रही है।",
    "about.feat2.title": "सामुदायिक सेवा",
    "about.feat2.desc": "कमेटी केवल धार्मिक आयोजनों तक सीमित नहीं है, बल्कि समाज में एकता, सहयोग और सेवा की भावना को भी मजबूत करती है। सभी सदस्य निस्वार्थ भाव से आयोजन को सफल बनाने में अपना योगदान देते हैं। यह परंपरा लोगों को जोड़ने और सामूहिक आस्था को सशक्त बनाने का कार्य करती है।",
    "about.feat3.title": "सांस्कृतिक गतिविधियां",
    "about.feat3.desc": "हनुमान पुष्प वर्षा कमेटी सांस्कृतिक विरासत और परंपराओं को जीवित रखने का कार्य कर रही है। दशहरा के दौरान आयोजित भव्य आयोजन भारतीय संस्कृति, श्रद्धा और उत्सव की अद्भुत झलक प्रस्तुत करते हैं। यह परंपरा नई पीढ़ी को अपनी संस्कृति और मूल्यों से जोड़ने का माध्यम भी है।",

    // Stats Section
    "stats.members": "कुल सदस्य",
    "stats.events": "आयोजित कार्यक्रम",
    "stats.years": "सेवा के वर्ष",
    "stats.donations": "एकत्रित दान",
    "stats.volunteers": "सक्रिय स्वयंसेवक",

    // Events Section
    "events.title": "आगामी कार्यक्रम",
    "events.btn.view": "सभी कार्यक्रम देखें",
    "events.btn.register": "अभी पंजीकरण करें",
    "events.join": "जुड़ें",
    "events.event1.title": "पुष्पवर्षा",
    "events.event1.venue": "सुलाकी चौराहा, प्रयागराज",

    "events.event2.title": "महा आरती",
    "events.event2.venue": "सुलाकी चौराहा, प्रयागराज",

    "events.event3.title": "रोशनी",
    "events.event3.venue": "सुलाकी चौराहा, प्रयागराज",

    "events.event4.title": "गेट विसर्जन एवं सुंदरकांड",
    "events.event4.venue": "सुलाकी चौराहा, प्रयागराज",

    // Donation Appeal Section
    "donation.appeal.title": "हमारे पावन कार्य में सहयोग करें",
    "donation.appeal.desc": "आपका उदार योगदान हमें आध्यात्मिक कार्यक्रमों को आयोजित करने, हमारी विरासत को बनाए रखने और भोजन वितरण एवं समाज कल्याण कार्यक्रमों के माध्यम से समुदाय की सेवा करने में मदद करता है। हर छोटा दान एक बड़ा बदलाव लाता है।",
    "donation.appeal.btn": "अभी दान करें",
    "donation.appeal.secure": "सुरक्षित भुगतान",
    "donation.appeal.tax": "",

    // History Page
    "history.title": "हमारी यात्रा",
    "history.mission.title": "आध्यात्मिक मिशन",
    "history.mission.p": "दो दशकों से अधिक समय से, हनुमान पुष्पवर्षा समिति भक्ति, संस्कृति और निष्काम सेवा के प्रतीक के रूप में खड़ी है। हमारा मिशन हमेशा भगवान हनुमान की दिव्य शिक्षाओं का प्रसार करना और सभी भक्तों के बीच भाईचारे की भावना को बढ़ावा देना रहा है।",
    "history.timeline.1995.title": "स्थापना",
    "history.timeline.1995.desc": "समिति का गठन समर्पित भक्तों के एक समूह द्वारा किया गया था।",
    "history.timeline.2002.title": "प्रथम भव्य पुष्पवर्षा",
    "history.timeline.2002.desc": "हनुमान जयंती के दौरान पहली बार बड़े पैमाने पर फूलों की पंखुड़ियों की बारिश का आयोजन किया गया।",
    "history.timeline.2010.title": "सामुदायिक सेवा की शुरुआत",
    "history.timeline.2010.desc": "वंचितों के लिए साप्ताहिक भंडारे की शुरुआत की गई।",
    "history.timeline.2020.title": "डिजिटल आउटरीच",
    "history.timeline.2020.desc": "भक्तों को वैश्विक रूप से जोड़ने के लिए आरतियों का लाइव प्रसारण शुरू किया गया।",
    "history.founders.title": "हमारे संस्थापक",
    "history.founder1.role": "दूरदर्शी संस्थापक",

    // Members Page
    "members.title": "समिति के सदस्य",
    "members.search.placeholder": "नाम से सदस्यों को खोजें...",
    "members.filter.all": "सभी",
    "members.role.president": "अध्यक्ष",
    "members.role.priest": "मुख्य पुजारी",
    "members.role.treasurer": "कोषाध्यक्ष",
    "members.role.coordinator": "कार्यक्रम संयोजक",
    "members.notfound": "आपकी खोज के अनुसार कोई सदस्य नहीं मिला।",
    "members.member1.desc": "देश भर में हनुमान जी की भक्ति का प्रसार करने के दृष्टिकोण के साथ समिति का नेतृत्व करना।",
    "members.member2.desc": "समिति द्वारा आयोजित सभी आध्यात्मिक समारोहों और आरती कार्यक्रमों के प्रमुख।",
    "members.member3.desc": "समिति के कोष का प्रबंधन और सभी धर्मार्थ गतिविधियों में पारदर्शिता सुनिश्चित करना।",
    "members.member4.desc": "भव्य कार्यक्रमों, पुष्पवर्षा और भंडारों का कुशल आयोजन।",

    // Gallery Page
    "gallery.title": "दिव्य गैलरी",

    // Donation Page
    "donation.title": "दिव्य भेंट प्रदान करें",
    "donation.form.title": "दान का विवरण",
    "donation.form.amount": "राशि चुनें (₹)",
    "donation.form.custom": "अन्य राशि",
    "donation.form.purpose": "दान का उद्देश्य",
    "donation.form.purpose.general": "सामान्य मंदिर विकास",
    "donation.form.purpose.food": "अन्नदान (भोजन वितरण)",
    "donation.form.purpose.event": "पुष्पवर्षा कार्यक्रम",
    "donation.form.purpose.cows": "गौशाला रखरखाव",
    "donation.form.personal": "व्यक्तिगत विवरण",
    "donation.form.name": "पूरा नाम",
    "donation.form.email": "ईमेल पता",
    "donation.form.phone": "फ़ोन नंबर",
    "donation.form.method.upi": "UPI / QR कोड",
    "donation.form.method.card": "कार्ड / नेट बैंकिंग",
    "donation.form.method.scan": "किसी भी UPI ऐप से स्कैन करें",
    "donation.form.method.razorpay": "कार्ड, नेट बैंकिंग और वॉलेट के लिए रेजरपे सुरक्षित भुगतान का उपयोग करें।",
    "donation.form.btn.pay": "रेज़रपे द्वारा भुगतान करें",

    // Live Page
    "live.title": "महा आरती एवं पुष्पवर्षा",
    "live.badge": "लाइव प्रसारण",
    "live.venue": "संगम घाट, प्रयागराज",
    "live.action": "लाइवस्ट्रीम से जुड़ने के लिए क्लिक करें",
    "live.announcements": "घोषणाएँ:",
    "live.announcement1": "महा आरती के सीधे प्रसारण में आपका स्वागत है। • कृपया चैट में मर्यादा बनाए रखें। • पुष्पवर्षा शीघ्र ही शुरू होगी।",

    // Join Page
    "join.title": "समिति में शामिल हों",
    "join.subtitle": "हमारे आध्यात्मिक परिवार का हिस्सा बनें और धर्म और मानवता की सेवा में योगदान दें।",
    "join.form.name": "पूरा नाम *",
    "join.form.father": "पिता का नाम",
    "join.form.age": "आयु *",
    "join.form.gender": "लिंग *",
    "join.form.gender.select": "चुनें",
    "join.form.gender.male": "पुरुष",
    "join.form.gender.female": "महिला",
    "join.form.gender.other": "अन्य",
    "join.form.occupation": "व्यवसाय",
    "join.form.phone": "फ़ोन नंबर *",
    "join.form.email": "ईमेल पता",
    "join.form.address": "पूरा पता *",
    "join.form.reason": "आप शामिल क्यों होना चाहते हैं? *",
    "join.form.photo": "नवीनतम फोटो *",
    "join.form.photo.upload": "फोटो अपलोड करने के लिए क्लिक करें",
    "join.form.id": "आधार / पहचान पत्र *",
    "join.form.id.upload": "पहचान पत्र अपलोड करने के लिए क्लिक करें",
    "join.form.btn": "आवेदन पत्र जमा करें",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved === "en" || saved === "hi") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
