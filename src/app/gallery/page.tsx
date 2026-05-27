"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpiritualBackground } from "@/components/ui/spiritual-background";
import { Section } from "@/components/ui/section";
import { Footer } from "@/components/home/footer";
import {
  X, ZoomIn, ArrowLeft, Calendar, Image as ImageIcon, Sparkles,
  ChevronLeft, ChevronRight, Play, Pause, LayoutGrid, SlidersHorizontal,
  Maximize2, Minimize2, Check, Info, Heart
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// Highly detailed interface for images
interface GalleryImage {
  id: string;
  src: string;
  category: string;
  captionKey: string;
  dateKey: string;
  aspectRatio?: string; // For masonry grids
}

// Interface for year-wise albums
interface Album {
  year: string;
  titleKey: string;
  descKey: string;
  coverImage: string;
  images: GalleryImage[];
}

const albumsData: Album[] = [
  {
    year: "2025",
    titleKey: "gallery.album.2026.title",
    descKey: "gallery.album.2026.desc",
    coverImage: "https://i.postimg.cc/pXzWfFLN/hpvc-2025-8.jpg",
    images: [
      {
        id: "25-1",
        src: "https://i.postimg.cc/Fs3ryLs8/hpvc-10-2025.jpg",
        category: "Pushp Varsha",
        captionKey: "gallery.photo.26_1.caption",
        dateKey: "gallery.date.jan26",
        aspectRatio: "aspect-[4/3]"
      },
      {
        id: "25-2",
        src: "https://i.postimg.cc/m2CLYHgZ/hpvc2025.jpg",
        category: "Roshni",
        captionKey: "gallery.photo.26_2.caption",
        dateKey: "gallery.date.apr26",
        aspectRatio: "aspect-[3/4]"
      },
      {
        id: "25-3",
        src: "https://i.postimg.cc/gk8zVZ2P/hpvc-52025.jpg",
        category: "Ram Dal",
        captionKey: "gallery.photo.26_3.caption",
        dateKey: "gallery.date.may26",
        aspectRatio: "aspect-[1/1]"
      },
      {
        id: "25-4",
        src: "https://i.postimg.cc/TYgdVD3G/hpvc-62025.jpg",
        category: "Maha Aarti",
        captionKey: "gallery.photo.26_4.caption",
        dateKey: "gallery.date.jun26",
        aspectRatio: "aspect-[4/3]"
      },
      {
        id: "25-5",
        src: "https://i.postimg.cc/PrYXWwrc/hpvc-3-2025.jpg",
        category: "Moments",
        captionKey: "gallery.photo.26_5.caption",
        dateKey: "gallery.date.jul26",
        aspectRatio: "aspect-[3/4]"
      },
      {
        id: "25-6",
        src: "https://i.postimg.cc/MKV67Qpz/hpvc-papa.jpg",
        category: "Gate Visarjan",
        captionKey: "gallery.photo.26_6.caption",
        dateKey: "gallery.date.aug26",
        aspectRatio: "aspect-[4/3]"
      }
    ],
  },
  {
    year: "2024",
    titleKey: "gallery.album.2025.title",
    descKey: "gallery.album.2025.desc",
    coverImage: "https://i.postimg.cc/rwvm403V/hpvc-2025-5.jpg",
    images: [
      {
        id: "24-1",
        src: "https://i.postimg.cc/t4LT6ZwX/hpvc-2025-6.jpg",
        category: "Moments",
        captionKey: "gallery.photo.25_1.caption",
        dateKey: "gallery.date.feb25",
        aspectRatio: "aspect-[3/4]"
      },
      {
        id: "24-2",
        src: "https://i.postimg.cc/T3ZwbLF2/hpvc-2025-7.jpg",
        category: "Pushp Varsha",
        captionKey: "gallery.photo.25_2.caption",
        dateKey: "gallery.date.apr25",
        aspectRatio: "aspect-[4/3]"
      },
      {
        id: "24-3",
        src: "https://i.postimg.cc/2SP6WbMf/hpvc-2025-1.jpg",
        category: "Roshni",
        captionKey: "gallery.photo.25_3.caption",
        dateKey: "gallery.date.oct25",
        aspectRatio: "aspect-[4/3]"
      },
      {
        id: "24-4",
        src: "https://i.postimg.cc/mg0D9zJf/hpvc-2025-3.jpg",
        category: "Maha Aarti",
        captionKey: "gallery.photo.25_4.caption",
        dateKey: "gallery.date.nov25",
        aspectRatio: "aspect-[3/4]"
      },
      {
        id: "24-5",
        src: "https://images.unsplash.com/photo-1590076211181-768a846c4f03?auto=format&fit=crop&q=80&w=800",
        category: "Pushpavarsha",
        captionKey: "gallery.photo.25_5.caption",
        dateKey: "gallery.date.dec25",
        aspectRatio: "aspect-[1/1]"
      }
    ],
  },
  {
    year: "2023",
    titleKey: "gallery.album.2024.title",
    descKey: "gallery.album.2024.desc",
    coverImage: "https://images.unsplash.com/photo-1623910270519-7977ba2e01df?auto=format&fit=crop&q=80&w=800",
    images: [
      {
        id: "24-1",
        src: "https://images.unsplash.com/photo-1623910270519-7977ba2e01df?auto=format&fit=crop&q=80&w=800",
        category: "Pushpavarsha",
        captionKey: "gallery.photo.24_1.caption",
        dateKey: "gallery.date.mar24",
        aspectRatio: "aspect-[4/3]"
      },
      {
        id: "24-2",
        src: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80&w=800",
        category: "Bhajan / Kirtan",
        captionKey: "gallery.photo.24_2.caption",
        dateKey: "gallery.date.may24",
        aspectRatio: "aspect-[3/4]"
      },
      {
        id: "24-3",
        src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
        category: "Committee Celebrations",
        captionKey: "gallery.photo.24_3.caption",
        dateKey: "gallery.date.jul24",
        aspectRatio: "aspect-[4/3]"
      },
      {
        id: "24-4",
        src: "https://images.unsplash.com/photo-1472653425572-fa5afe8be96e?auto=format&fit=crop&q=80&w=800",
        category: "Maha Aarti",
        captionKey: "gallery.photo.24_4.caption",
        dateKey: "gallery.date.sep24",
        aspectRatio: "aspect-[1/1]"
      },
      {
        id: "24-5",
        src: "https://images.unsplash.com/photo-1584036531338-e692da39ff0d?auto=format&fit=crop&q=80&w=800",
        category: "Seva / Bhandara",
        captionKey: "gallery.photo.24_5.caption",
        dateKey: "gallery.date.nov24",
        aspectRatio: "aspect-[3/4]"
      }
    ],
  },
  {
    year: "2022",
    titleKey: "gallery.album.2023.title",
    descKey: "gallery.album.2023.desc",
    coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800",
    images: [
      {
        id: "23-1",
        src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800",
        category: "Committee Celebrations",
        captionKey: "gallery.photo.23_1.caption",
        dateKey: "gallery.date.jan23",
        aspectRatio: "aspect-[4/3]"
      },
      {
        id: "23-2",
        src: "https://images.unsplash.com/photo-1584036531338-e692da39ff0d?auto=format&fit=crop&q=80&w=800",
        category: "Seva / Bhandara",
        captionKey: "gallery.photo.23_2.caption",
        dateKey: "gallery.date.apr23",
        aspectRatio: "aspect-[3/4]"
      },
      {
        id: "23-3",
        src: "https://images.unsplash.com/photo-1542104445-5cb3d4b655ab?auto=format&fit=crop&q=80&w=800",
        category: "Maha Aarti",
        captionKey: "gallery.photo.23_3.caption",
        dateKey: "gallery.date.aug23",
        aspectRatio: "aspect-[1/1]"
      },
      {
        id: "23-4",
        src: "https://images.unsplash.com/photo-1590076211181-768a846c4f03?auto=format&fit=crop&q=80&w=800",
        category: "Pushpavarsha",
        captionKey: "gallery.photo.23_4.caption",
        dateKey: "gallery.date.dec23",
        aspectRatio: "aspect-[4/3]"
      }
    ],
  },
  {
    year: "2021",
    titleKey: "gallery.album.2022.title",
    descKey: "gallery.album.2022.desc",
    coverImage: "https://images.unsplash.com/photo-1590076211181-768a846c4f03?auto=format&fit=crop&q=80&w=800",
    images: [
      {
        id: "22-1",
        src: "https://images.unsplash.com/photo-1590076211181-768a846c4f03?auto=format&fit=crop&q=80&w=800",
        category: "Pushpavarsha",
        captionKey: "gallery.photo.22_1.caption",
        dateKey: "gallery.date.mar22",
        aspectRatio: "aspect-[4/3]"
      },
      {
        id: "22-2",
        src: "https://images.unsplash.com/photo-1608958220025-a131b7e0c0df?auto=format&fit=crop&q=80&w=800",
        category: "Maha Aarti",
        captionKey: "gallery.photo.22_2.caption",
        dateKey: "gallery.date.nov22",
        aspectRatio: "aspect-[3/4]"
      },
      {
        id: "22-3",
        src: "https://images.unsplash.com/photo-1609137882641-524f2b1c4e0f?auto=format&fit=crop&q=80&w=800",
        category: "Temple Moments",
        captionKey: "gallery.photo.22_3.caption",
        dateKey: "gallery.date.dec22",
        aspectRatio: "aspect-[1/1]"
      }
    ],
  },
];

// High-fidelity dictionaries for complete bilingual capability
const galleryDict: Record<string, Record<string, string>> = {
  en: {
    "gallery.back": "Back to Albums",
    "gallery.photos": "Photos",
    "gallery.categories": "Categories",
    "gallery.timeline": "Historical Timeline",
    "gallery.photo": "Memory",
    "gallery.of": "of",
    "gallery.album.2026.title": "2025 Recap",
    "gallery.album.2026.desc": "Divine scenes of 2025 — celebrating Pushpa Varsha and the grand Aarti",
    "gallery.album.2025.title": "2024 Recap",
    "gallery.album.2025.desc": "Hanuman Janmotsav path recitals and monumental public Bhandara distributions.",
    "gallery.album.2024.title": "2023 Recap",
    "gallery.album.2024.desc": "Swaying bhajan sandhyas and local volunteering service campaigns.",
    "gallery.album.2023.title": "2022 Recap",
    "gallery.album.2023.desc": "Weekly feeding drives, Kartik light installations, and Sangam gatherings.",
    "gallery.album.2022.title": "2021 Recap",
    "gallery.album.2022.desc": "Post-lockdown petal cascade returns and direct live audio-video broadcast streams.",

    // Image details translations
    "gallery.photo.26_1.caption": "Divine Pushpa Varsha by Lord Hanuman -a beautiful symbol of faith and blessings",
    "gallery.photo.26_2.caption": "A divine and mesmerizing sight during the sacred occasion of Roshni, filled with faith and devotion.",
    "gallery.photo.26_3.caption": "A divine and vibrant moment during the sacred occasion of Ram Dal, filled with faith and devotion.",
    "gallery.photo.26_4.caption": "Traditional musical chants praising Lord Hanuman's courage.",
    "gallery.photo.26_5.caption": "Some special and memorable moments.",
    "gallery.photo.26_6.caption": "Divine moments of Hawan and conclusion during the sacred occasion of Gate Visarjan.",

    "gallery.photo.25_1.caption": "Divine glimpses",
    "gallery.photo.25_2.caption": "Sacred and unforgettable moments of Divine Pushpa Varsha.",
    "gallery.photo.25_3.caption": "Divine and mesmerizing glimpses from the sacred occasion of Roshni.",
    "gallery.photo.25_4.caption": "Divine and soulful moments of Maha Aarti.",
    "gallery.photo.25_5.caption": "Fresh red petals falling from height on sacred procession cart.",

    "gallery.photo.24_1.caption": "Red rose petals showering upon the gathering.",
    "gallery.photo.24_2.caption": "Traditional sitar and harmonium bhajan accompaniment.",
    "gallery.photo.24_3.caption": "Core committee meeting defining charitable hospital plans.",
    "gallery.photo.24_4.caption": "Hand-held deepak lamps lighting the aarti crowd.",
    "gallery.photo.24_5.caption": "Volunteers distributing warm food packages to people.",

    "gallery.photo.23_1.caption": "A grand community parade through the city streets.",
    "gallery.photo.23_2.caption": "Preparing sweet boondi for Hanuman Jayanti Prasad.",
    "gallery.photo.23_3.caption": "Ghats lit by massive brass multi-layered deepaks.",
    "gallery.photo.23_4.caption": "Petal rains descending upon the deity and temple courtyard.",

    "gallery.photo.22_1.caption": "First post-lockdown grand scale flower shower festival.",
    "gallery.photo.22_2.caption": "Shining row of brass aarti bells and holy flame lamps.",
    "gallery.photo.22_3.caption": "Ornate dome arches shimmering under yellow lights.",

    // Dates
    "gallery.date.jan26": "Sep 2025",
    "gallery.date.apr26": "Sep 2025",
    "gallery.date.may26": "Sep 2025",
    "gallery.date.jun26": "Sep 2025",
    "gallery.date.jul26": "Sep 2025",
    "gallery.date.aug26": "Sep 2025",
    "gallery.date.feb25": "Oct 2024",
    "gallery.date.apr25": "Oct 2024",
    "gallery.date.oct25": "Oct 2024",
    "gallery.date.nov25": "Oct 2024",
    "gallery.date.dec25": "Oct 2024",
    "gallery.date.mar24": "Oct 2024",
    "gallery.date.may24": "May 2023",
    "gallery.date.jul24": "Jul 2023",
    "gallery.date.sep24": "Sep 2023",
    "gallery.date.nov24": "Nov 2023",
    "gallery.date.jan23": "Jan 2022",
    "gallery.date.apr23": "Apr 2022",
    "gallery.date.aug23": "Aug 2022",
    "gallery.date.dec23": "Dec 2022",
    "gallery.date.mar22": "Mar 2021",
    "gallery.date.nov22": "Nov 2021",
    "gallery.date.dec22": "Dec 2021",

    // UI Tools
    "gallery.filter.all": "All Memories",
    "gallery.layout.label": "View Layout",
    "gallery.layout.classic": "Classic Grid",
    "gallery.layout.masonry": "Masonry Flow",
    "gallery.slideshow.start": "Autoplay",
    "gallery.slideshow.pause": "Pause",
    "gallery.zoom.in": "Zoom In",
    "gallery.zoom.out": "Fit Screen",
    "gallery.stats.overview": "Album Stats",
    "gallery.tip": "Tip: Use Left/Right keys for quick browsing, Escape to exit lightbox. Hover zoom inside image to pan.",
  },
  hi: {
    "gallery.back": "एल्बम पर वापस जाएं",
    "gallery.photos": "तस्वीरें",
    "gallery.categories": "श्रेणियां",
    "gallery.timeline": "ऐतिहासिक समयरेखा",
    "gallery.photo": "स्मृति",
    "gallery.of": "की",
    "gallery.album.2026.title": "2026 स्मृतियां",
    "gallery.album.2026.desc": "2025 के दिव्य दृश्य — पुष्प वर्षा और भव्य आरती के पावन पल।",
    "gallery.album.2025.title": "2025 स्मृतियां",
    "gallery.album.2025.desc": "हनुमान जन्मोत्सव के पावन पाठ, कीर्तन और विशाल सार्वजनिक भंडारा वितरण अभियान।",
    "gallery.album.2024.title": "2024 स्मृतियां",
    "gallery.album.2024.desc": "भक्तिमय भजन संध्या कार्यक्रम और विभिन्न क्षेत्रों में सक्रिय स्वयंसेवक सेवा अभियान।",
    "gallery.album.2023.title": "2023 स्मृतियां",
    "gallery.album.2023.desc": "निरंतर भंडारा, भव्य कार्तिक दीपोत्सव और संगम तट पर आयोजित विशेष आध्यात्मिक सभाएं।",
    "gallery.album.2022.title": "2022 स्मृतियां",
    "gallery.album.2022.desc": "लॉकडाउन के बाद पुष्पवर्षा की भव्य वापसी और पहले डिजिटल लाइव प्रसारण की शुरुआत।",

    // Image details translations (Hindi)
    "gallery.photo.26_1.caption": "हनुमान जी द्वारा की गई दिव्य पुष्प वर्षा — आस्था और आशीर्वाद का अद्भुत दृश्य।",
    "gallery.photo.26_2.caption": "रोशनी के पावन अवसर पर आस्था, भक्ति और दिव्यता से सजा अद्भुत दृश्य।",
    "gallery.photo.26_3.caption": "राम दल के पावन अवसर पर भक्ति, श्रद्धा और उत्साह से भरा दिव्य दृश्य।",
    "gallery.photo.26_4.caption": "हनुमान चालीसा और दिव्य भजनों का सामूहिक संगीतमय गायन।",
    "gallery.photo.26_5.caption": "कुछ विशेष और यादगार पल।",
    "gallery.photo.26_6.caption": "गेट विसर्जन के पावन अवसर पर हवन एवं समापन के दिव्य पल।",

    "gallery.photo.25_1.caption": "दिव्य झलकियाँ",
    "gallery.photo.25_2.caption": "दिव्य पुष्प वर्षा के पावन और अविस्मरणीय पल।",
    "gallery.photo.25_3.caption": "रोशनी के पावन अवसर की दिव्य और मनमोहक झलकियाँ।",
    "gallery.photo.25_4.caption": "महाआरती के दिव्य और भावपूर्ण पल।",
    "gallery.photo.25_5.caption": "रथ यात्रा के दौरान आसमान से बरसती गुलाब की पंखुड़ियां।",

    "gallery.photo.24_1.caption": "भक्ति की बयार में भक्तों पर बरसते सुंदर लाल गुलाब के फूल।",
    "gallery.photo.24_2.caption": "सितार और हारमोनियम की जुगलबंदी पर थिरकते भजन गायक।",
    "gallery.photo.24_3.caption": "धर्मार्थ चिकित्सालय के निर्माण पर विचार करती समिति की बैठक।",
    "gallery.photo.24_4.caption": "हाथों में प्रज्वलित दीयों से जगमगाती आरती सभा।",
    "gallery.photo.24_5.caption": "जरूरतमंदों को ताज़ा और पौष्टिक भोजन वितरित करते सेवादार।",

    "gallery.photo.23_1.caption": "नगर के मुख्य मार्गों पर निकाली गई भव्य आध्यात्मिक शोभायात्रा।",
    "gallery.photo.23_2.caption": "जन्मोत्सव पर वितरण के लिए शुद्ध देशी घी की मीठी बूंदी तैयार करना।",
    "gallery.photo.23_3.caption": "विशाल पीतल के दीयों से जगमगाते संगम के पवित्र घाट।",
    "gallery.photo.23_4.caption": "मंदिर प्रांगण और हनुमान जी के विग्रह पर होती अनुपम पुष्प वर्षा।",

    "gallery.photo.22_1.caption": "लॉकडाउन की पाबंदियों के बाद आयोजित पहला भव्य पुष्पवर्षा उत्सव।",
    "gallery.photo.22_2.caption": "आरती की घंटियों और कपूर की पवित्र लौ का मनोरम दृश्य।",
    "gallery.photo.22_3.caption": "स्वर्णिम प्रकाश में चमकते मंदिर के अलंकृत शिखर और मेहराब।",

    // Dates
    "gallery.date.jan26": "सितंबर  २०२५",
    "gallery.date.apr26": "सितंबर  २०२५",
    "gallery.date.may26": "सितंबर  २०२५",
    "gallery.date.jun26": "सितंबर  २०२५",
    "gallery.date.jul26": "सितंबर  २०२५",
    "gallery.date.aug26": "सितंबर  २०२५",
    "gallery.date.feb25": "अक्टूबर २०२४",
    "gallery.date.apr25": "अक्टूबर २०२४",
    "gallery.date.oct25": "अक्टूबर २०२४",
    "gallery.date.nov25": "अक्टूबर २०२४",
    "gallery.date.dec25": "अक्टूबर २०२४",
    "gallery.date.mar24": "मार्च २०२४",
    "gallery.date.may24": "मई २०२४",
    "gallery.date.jul24": "जुलाई २०२४",
    "gallery.date.sep24": "सितंबर २०२४",
    "gallery.date.nov24": "नवंबर २०२४",
    "gallery.date.jan23": "जनवरी २०२३",
    "gallery.date.apr23": "अप्रैल २०२३",
    "gallery.date.aug23": "अगस्त २०२३",
    "gallery.date.dec23": "दिसंबर २०२३",
    "gallery.date.mar22": "मार्च २०२२",
    "gallery.date.nov22": "नवंबर २०२२",
    "gallery.date.dec22": "दिसंबर २०२२",

    // UI Tools
    "gallery.filter.all": "सभी यादें",
    "gallery.layout.label": "गैलरी लेआउट",
    "gallery.layout.classic": "क्लासिक ग्रिड",
    "gallery.layout.masonry": "कलात्मक मेसनरी",
    "gallery.slideshow.start": "ऑटोप्ले",
    "gallery.slideshow.pause": "रोकें",
    "gallery.zoom.in": "ज़ूम करें",
    "gallery.zoom.out": "फिट स्क्रीन",
    "gallery.stats.overview": "एल्बम विवरण",
    "gallery.tip": "सुझाव: त्वरित देखने के लिए बाएं/दाएं कुंजियों का उपयोग करें, बाहर जाने के लिए Esc दबाएं। ज़ूम इन पर कर्सर घुमाकर पैन करें।",
  },
};

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Interactive Filter Tags
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Grid style selector (classic square vs fluid artistic masonry)
  const [gridStyle, setGridStyle] = useState<"classic" | "masonry">("masonry");

  // Detailed Lightbox parameters
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const filmstripRef = useRef<HTMLDivElement>(null);

  const activeAlbum = albumsData.find((a) => a.year === selectedYear);

  const getTranslated = (key: string): string => {
    return galleryDict[language]?.[key] || galleryDict["en"]?.[key] || key;
  };

  // Capture all unique categories in active album
  const categoriesList = activeAlbum
    ? ["All", ...Array.from(new Set(activeAlbum.images.map((img) => img.category)))]
    : [];

  // Filtered images list
  const displayedImages = activeAlbum
    ? activeAlbum.images.filter((img) => activeCategory === "All" || img.category === activeCategory)
    : [];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null || !activeAlbum) return;

      if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, selectedYear, displayedImages]);

  // Slideshow Autoplay mechanism
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && selectedImageIndex !== null) {
      interval = setInterval(() => {
        handleNextImage();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedImageIndex, displayedImages]);

  // Automatically scroll active thumbnail into view inside the Filmstrip row
  useEffect(() => {
    if (selectedImageIndex !== null && filmstripRef.current) {
      const activeEl = filmstripRef.current.children[selectedImageIndex] as HTMLElement;
      if (activeEl) {
        filmstripRef.current.scrollTo({
          left: activeEl.offsetLeft - filmstripRef.current.offsetWidth / 2 + activeEl.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [selectedImageIndex]);

  const handleNextImage = () => {
    if (selectedImageIndex === null || displayedImages.length === 0) return;
    setDirection(1);
    setIsZoomed(false);
    setSelectedImageIndex((prev) => (prev !== null && prev < displayedImages.length - 1 ? prev + 1 : 0));
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === null || displayedImages.length === 0) return;
    setDirection(-1);
    setIsZoomed(false);
    setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : displayedImages.length - 1));
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    setIsPlaying(false);
    setIsZoomed(false);
  };

  // Magnifier zoom cursor tracking function
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // Reset tag when selecting another folder
  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    setActiveCategory("All");
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <SpiritualBackground />
      </div>

      <div className="relative z-10 flex-grow pt-32">
        <Section title={t("gallery.title")}>
          <div className="mx-auto max-w-7xl px-4 pb-16">

            <AnimatePresence mode="wait">
              {/* ALBUM SELECTION GRID VIEW */}
              {!selectedYear ? (
                <motion.div
                  key="albums-grid"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-12"
                >
                  {/* Subtle folder section sub-tag */}
                  <div className="text-center -mt-6 mb-12 max-w-2xl mx-auto">
                    <p className="font-body text-sm text-gray-400 leading-relaxed uppercase tracking-widest flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-saffron" />
                      <span>{getTranslated("gallery.recaps")}</span>
                      <Sparkles className="w-4 h-4 text-saffron" />
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {albumsData.map((album, idx) => (
                      <motion.div
                        key={album.year}
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, type: "spring", stiffness: 90, damping: 14 }}
                        whileHover="hover"
                        onClick={() => handleSelectYear(album.year)}
                        className="group relative cursor-pointer flex flex-col"
                      >
                        {/* Interactive smartphone-style stacked folder */}
                        <div className="relative aspect-[4/3] w-full rounded-2xl mb-6 select-none bg-temple-card/40 border border-white/5 shadow-2xl p-1">

                          {/* Folder Tab Design Accent */}
                          <div className="absolute top-[-10px] left-8 w-24 h-4 bg-temple-card/80 border-t border-x border-white/10 rounded-t-lg z-0" />

                          <div className="relative w-full h-full rounded-xl overflow-visible">
                            {/* Layer 3 - Backmost Stack Card */}
                            <motion.div
                              variants={{
                                hover: { y: -28, rotate: -9, scale: 0.88, opacity: 0.5 },
                              }}
                              transition={{ type: "spring", stiffness: 220, damping: 16 }}
                              className="absolute inset-0 bg-cover bg-center rounded-xl border border-white/5 opacity-15 scale-90 translate-y-[-10px] rotate-[-4deg] z-0 shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
                              style={{ backgroundImage: `url(${album.images[2]?.src || album.coverImage})` }}
                            />

                            {/* Layer 2 - Middle Stack Card */}
                            <motion.div
                              variants={{
                                hover: { y: -14, rotate: 9, scale: 0.94, opacity: 0.8 },
                              }}
                              transition={{ type: "spring", stiffness: 220, damping: 16 }}
                              className="absolute inset-0 bg-cover bg-center rounded-xl border border-white/5 opacity-45 scale-95 translate-y-[-5px] rotate-[4deg] z-10 shadow-[0_14px_28px_rgba(0,0,0,0.85)]"
                              style={{ backgroundImage: `url(${album.images[1]?.src || album.coverImage})` }}
                            />

                            {/* Layer 1 - Front Cover Card */}
                            <motion.div
                              variants={{
                                hover: { scale: 1.03, y: -4 },
                              }}
                              transition={{ type: "spring", stiffness: 220, damping: 16 }}
                              className="absolute inset-0 bg-cover bg-center rounded-xl border border-saffron/20 group-hover:border-saffron/50 transition-colors z-20 overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.9)] flex flex-col justify-end"
                              style={{ backgroundImage: `url(${album.coverImage})` }}
                            >
                              {/* Glowing saffron vignette inside card */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10 opacity-90 group-hover:from-saffron/30 group-hover:via-black/25 transition-all duration-700" />

                              {/* Saffron Year badge */}
                              <div className="absolute top-4 right-4 bg-gradient-to-r from-saffron to-gold border border-saffron/40 rounded-full px-4 py-1.5 text-xs font-bold text-black z-30 shadow-lg font-spiritual tracking-wider">
                                {album.year}
                              </div>

                              {/* Photo Counts sticker */}
                              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-xs text-orange-100 z-30">
                                <ImageIcon className="w-3.5 h-3.5 text-saffron animate-pulse" />
                                <span className="font-bold text-white">{album.images.length}</span>
                                <span className="text-gray-300 font-medium">{getTranslated("gallery.photos")}</span>
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Folder details textual metadata */}
                        <div className="px-3 mt-1 space-y-1">
                          <h3 className="font-spiritual text-2xl font-semibold text-white group-hover:text-gold transition-colors tracking-wide flex items-center gap-2">
                            {getTranslated(album.titleKey)}
                            <Sparkles className="w-4 h-4 text-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </h3>
                          <p className="font-body text-sm text-gray-400 leading-relaxed line-clamp-2">
                            {getTranslated(album.descKey)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* SINGLE ALBUM DETAILS VIEW WITH MORPHING STACK NAVIGATION */
                <motion.div
                  key="album-view"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-10"
                >
                  {/* Smartphone stack folder opening top controls */}
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-saffron/25 pb-8">

                    <button
                      onClick={() => setSelectedYear(null)}
                      className="group flex items-center gap-2 text-saffron hover:text-white transition-colors cursor-pointer self-start py-2.5 px-5 rounded-full border border-saffron/20 hover:border-saffron bg-saffron/5 hover:bg-saffron/20 font-body text-sm shadow-md"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      <span>{getTranslated("gallery.back")}</span>
                    </button>

                    {activeAlbum && (
                      <div className="text-left flex-1 md:ml-8 space-y-2">
                        <div className="flex items-center gap-3">
                          <h1 className="font-spiritual text-3xl md:text-4xl font-bold text-white gold-glow">
                            {getTranslated(activeAlbum.titleKey)}
                          </h1>
                          <span className="bg-gradient-to-r from-saffron to-gold text-black text-xs font-bold rounded px-3 py-1 font-spiritual tracking-widest shadow-md">
                            {activeAlbum.year}
                          </span>
                        </div>
                        <p className="font-body text-sm text-gray-300 max-w-2xl">
                          {getTranslated(activeAlbum.descKey)}
                        </p>
                      </div>
                    )}

                    {/* Folder Quick Stats */}
                    {activeAlbum && (
                      <div className="flex items-center gap-5 bg-temple-card/65 border border-saffron/10 backdrop-blur-xl rounded-2xl p-4 self-start shadow-xl">
                        <div className="text-center px-4 border-r border-white/10">
                          <div className="font-spiritual text-2xl font-bold text-saffron">
                            {activeAlbum.images.length}
                          </div>
                          <div className="font-body text-2xs text-gray-400 uppercase tracking-widest mt-0.5">
                            {getTranslated("gallery.photos")}
                          </div>
                        </div>
                        <div className="text-center px-4">
                          <div className="font-spiritual text-2xl font-bold text-gold">
                            {activeAlbum.images.reduce((acc, current) => {
                              if (!acc.includes(current.category)) acc.push(current.category);
                              return acc;
                            }, [] as string[]).length}
                          </div>
                          <div className="font-body text-2xs text-gray-400 uppercase tracking-widest mt-0.5">
                            {getTranslated("gallery.categories")}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* HIGH-FIDELITY CONTROLS BAR: Category tabs and layout style switcher */}
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between bg-temple-card/30 border border-white/5 backdrop-blur-md rounded-2xl p-4 select-none">

                    {/* Horizontal Pill tags */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full">
                      {categoriesList.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`relative py-2 px-4 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap ${activeCategory === category
                            ? "text-black font-semibold"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                            }`}
                        >
                          <span className="relative z-10">
                            {category === "All" ? getTranslated("gallery.filter.all") : category}
                          </span>

                          {activeCategory === category && (
                            <motion.div
                              layoutId="categoryTagHighlight"
                              transition={{ type: "spring", stiffness: 220, damping: 19 }}
                              className="absolute inset-0 bg-gradient-to-r from-saffron to-gold rounded-full border border-saffron/20 shadow-md"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Layout switchers classical vs masonry */}
                    <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                      <span className="font-body text-xs text-gray-400 flex items-center gap-1.5">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-saffron" />
                        {getTranslated("gallery.layout.label")}:
                      </span>

                      <div className="flex bg-black/60 rounded-lg p-1 border border-white/5">
                        <button
                          onClick={() => setGridStyle("classic")}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-2xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${gridStyle === "classic"
                            ? "bg-gradient-to-r from-saffron/15 to-gold/15 border border-saffron/30 text-saffron"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          <LayoutGrid className="w-3.5 h-3.5" />
                          <span>{getTranslated("gallery.layout.classic")}</span>
                        </button>
                        <button
                          onClick={() => setGridStyle("masonry")}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-2xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${gridStyle === "masonry"
                            ? "bg-gradient-to-r from-saffron/15 to-gold/15 border border-saffron/30 text-saffron"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>{getTranslated("gallery.layout.masonry")}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* PHOTO LIST DISPLAY MODES WITH STAGGERED FLUID ARRANGEMENT */}
                  <AnimatePresence mode="popLayout">
                    {gridStyle === "classic" ? (
                      /* CLASSIC STANDARD SQUARE GRID MODE */
                      <motion.div
                        key="classic-grid"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
                          exit: { opacity: 0 }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                      >
                        {displayedImages.map((image, index) => (
                          <motion.div
                            key={image.id}
                            layout
                            variants={{
                              hidden: { opacity: 0, y: 25 },
                              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                            }}
                            onClick={() => setSelectedImageIndex(index)}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square bg-temple-card/30 border border-saffron/15 hover:border-saffron/60 transition-colors shadow-lg select-none"
                          >
                            <img
                              src={image.src}
                              alt={getTranslated(image.captionKey)}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                              loading="lazy"
                            />

                            {/* Premium Glow border inside card */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-saffron/40 rounded-2xl transition-colors pointer-events-none z-10" />

                            {/* Glassmorphic hover details sheet */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 z-20">
                              <span className="absolute top-4 right-4 bg-gradient-to-r from-saffron to-gold text-black text-2xs font-bold uppercase rounded-md px-2.5 py-1 tracking-wider font-spiritual shadow-md">
                                {image.category}
                              </span>

                              <ZoomIn className="w-8 h-8 text-saffron mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_8px_var(--saffron)]" />
                              <h4 className="font-spiritual text-lg font-semibold text-white mb-1.5 line-clamp-1 gold-glow">{getTranslated(image.captionKey)}</h4>
                              <p className="font-body text-xs text-gray-400 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-saffron" />
                                <span>{getTranslated(image.dateKey)}</span>
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      /* FLUID MASONRY COLUMN FLOW MODE */
                      <motion.div
                        key="masonry-grid"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1 },
                          exit: { opacity: 0 }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                      >
                        {/* Render columns manually to achieve absolute CSS column layout stability */}
                        {[0, 1, 2].map((colIndex) => (
                          <div key={colIndex} className="flex flex-col gap-6">
                            {displayedImages
                              .filter((_, i) => i % 3 === colIndex)
                              .map((image) => {
                                // Match indexes back to full list for lightbox clicking
                                const globalIndex = displayedImages.findIndex((img) => img.id === image.id);
                                return (
                                  <motion.div
                                    key={image.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 90, damping: 14 }}
                                    onClick={() => setSelectedImageIndex(globalIndex)}
                                    className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-temple-card/30 border border-saffron/15 hover:border-saffron/60 transition-colors shadow-lg select-none ${image.aspectRatio || "aspect-square"
                                      }`}
                                  >
                                    <img
                                      src={image.src}
                                      alt={getTranslated(image.captionKey)}
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                                      loading="lazy"
                                    />

                                    {/* Gold borders */}
                                    <div className="absolute inset-0 border border-transparent group-hover:border-saffron/40 rounded-2xl transition-colors pointer-events-none z-10" />

                                    {/* Glassmorphic hover details overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 z-20">
                                      <span className="absolute top-4 right-4 bg-gradient-to-r from-saffron to-gold text-black text-2xs font-bold uppercase rounded-md px-2.5 py-1 tracking-wider font-spiritual shadow-md">
                                        {image.category}
                                      </span>

                                      <ZoomIn className="w-8 h-8 text-saffron mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_8px_var(--saffron)]" />
                                      <h4 className="font-spiritual text-lg font-semibold text-white mb-1.5 line-clamp-2 gold-glow">{getTranslated(image.captionKey)}</h4>
                                      <p className="font-body text-xs text-gray-400 flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-saffron" />
                                        <span>{getTranslated(image.dateKey)}</span>
                                      </p>
                                    </div>
                                  </motion.div>
                                );
                              })}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>
      </div>

      {/* FULLSCREEN SMARTPHONE-STYLE MULTIFUNCTION LIGHTBOX */}
      <AnimatePresence>
        {selectedImageIndex !== null && activeAlbum && displayedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/98 p-4 md:p-6 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Auto-Slideshow progress bar inside lightbox header */}
            {isPlaying && (
              <motion.div
                key={selectedImageIndex} // Re-mount and restart progress bar timing on image slides
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-saffron via-gold to-saffron z-[120] shadow-[0_0_10px_var(--saffron)]"
              />
            )}

            {/* LIGHTBOX HEADER TOOLBAR */}
            <div className="w-full flex items-center justify-between z-[110] select-none bg-black/40 border border-white/5 rounded-2xl py-3 px-5 backdrop-blur-md">
              <span className="font-body text-xs md:text-sm text-gray-300 flex items-center gap-2">
                <span className="bg-saffron/10 border border-saffron/30 rounded px-2.5 py-0.5 text-saffron font-spiritual uppercase tracking-wider text-2xs">
                  {getTranslated(activeAlbum.titleKey)}
                </span>
                <span>
                  {getTranslated("gallery.photo")} <span className="font-bold text-saffron">{selectedImageIndex + 1}</span> {getTranslated("gallery.of")} <span className="font-bold text-white">{displayedImages.length}</span>
                </span>
              </span>

              {/* Quick Playback controls */}
              <div className="flex items-center gap-3">
                <button
                  title={getTranslated("gallery.slideshow.start")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-2xs font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${isPlaying
                    ? "bg-saffron text-black border-saffron shadow-lg shadow-saffron/20"
                    : "bg-white/5 hover:bg-white/10 text-white border-white/10"
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isPlaying ? getTranslated("gallery.slideshow.pause") : getTranslated("gallery.slideshow.start")}</span>
                </button>

                <button
                  title={getTranslated("gallery.zoom.in")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-2xs font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${isZoomed
                    ? "bg-gold text-black border-gold shadow-lg shadow-gold/20"
                    : "bg-white/5 hover:bg-white/10 text-white border-white/10"
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                >
                  {isZoomed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isZoomed ? getTranslated("gallery.zoom.out") : getTranslated("gallery.zoom.in")}</span>
                </button>

                <button
                  className="text-white hover:text-saffron bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 p-2 rounded-full transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* LIGHTBOX MAIN PHOTO SLIDER AND SIDE CONTROLS */}
            <div className="relative w-full flex-grow flex items-center justify-center my-4 overflow-hidden">

              {/* Prev Slide arrow */}
              <button
                className="absolute left-2 md:left-6 z-[110] text-white hover:text-saffron bg-black/60 hover:bg-saffron/15 border border-white/5 p-3 rounded-full transition-all hover:scale-105 cursor-pointer shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* CENTRAL DYNAMIC STACK SLIDING VIEWER */}
              <div
                className="relative w-full max-w-4xl h-[55vh] flex items-center justify-center cursor-zoom-in overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                onMouseMove={handleMouseMove}
              >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.img
                    key={displayedImages[selectedImageIndex].id}
                    custom={direction}
                    initial={{ opacity: 0, scale: 0.95, x: direction > 0 ? 80 : -80 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: direction > 0 ? -80 : 80 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                    src={displayedImages[selectedImageIndex].src}
                    alt={getTranslated(displayedImages[selectedImageIndex].captionKey)}
                    className="max-h-full max-w-full rounded-2xl border border-saffron/20 shadow-[0_0_60px_rgba(255,153,51,0.22)] object-contain select-none"
                    style={{
                      transform: isZoomed ? "scale(2.2)" : "scale(1)",
                      transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : "center",
                      transition: "transform-origin 0.1s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </AnimatePresence>
              </div>

              {/* Next Slide arrow */}
              <button
                className="absolute right-2 md:right-6 z-[110] text-white hover:text-saffron bg-black/60 hover:bg-saffron/15 border border-white/5 p-3 rounded-full transition-all hover:scale-105 cursor-pointer shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* LIGHTBOX FOOTER: Caption overlays and scrolling filmstrip list */}
            <div className="w-full space-y-4 select-none z-[110]" onClick={(e) => e.stopPropagation()}>

              {/* Image specific Caption cards */}
              <div className="mx-auto max-w-2xl text-center bg-gradient-to-b from-temple-card/90 to-black border border-white/5 backdrop-blur-xl p-5 rounded-2xl shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="bg-saffron/10 border border-saffron/30 text-saffron text-2xs font-bold uppercase rounded px-2.5 py-0.5 tracking-wider font-spiritual">
                    {displayedImages[selectedImageIndex].category}
                  </span>
                  <span className="font-body text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-saffron" />
                    {getTranslated(displayedImages[selectedImageIndex].dateKey)}
                  </span>
                </div>

                <h3 className="font-spiritual text-lg md:text-xl font-medium text-white mb-1.5 leading-snug gold-glow">
                  {getTranslated(displayedImages[selectedImageIndex].captionKey)}
                </h3>
              </div>

              {/* SCROLLING FILMSTRIP ROW CONTAINER */}
              <div className="relative mx-auto max-w-xl">
                <div
                  ref={filmstripRef}
                  className="flex items-center gap-3 overflow-x-auto py-2 px-6 scrollbar-none snap-x"
                >
                  {displayedImages.map((image, thumbIdx) => (
                    <button
                      key={image.id}
                      onClick={() => {
                        setDirection(thumbIdx > (selectedImageIndex || 0) ? 1 : -1);
                        setSelectedImageIndex(thumbIdx);
                        setIsZoomed(false);
                      }}
                      className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all snap-center ${selectedImageIndex === thumbIdx
                        ? "border-saffron scale-110 shadow-[0_0_10px_var(--saffron)] opacity-100"
                        : "border-transparent opacity-45 hover:opacity-80"
                        }`}
                    >
                      <img
                        src={image.src}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Left/Right fading vignettes to isolate filmstrip row nicely */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />
              </div>

              {/* Bottom Quick Help Tip */}
              <p className="text-center font-body text-3xs text-gray-500 max-w-lg mx-auto leading-relaxed hidden md:block">
                {getTranslated("gallery.tip")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
