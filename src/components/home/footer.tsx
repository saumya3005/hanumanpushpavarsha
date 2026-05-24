import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="relative border-t border-saffron/20 bg-black pt-16 pb-8 overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-saffron to-transparent opacity-50" />
      
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="font-spiritual text-2xl font-bold text-saffron gold-glow">
              {t("footer.title")}
            </h3>
            <p className="font-body text-sm text-gray-400">
              {t("footer.subtitle")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors" title="Youtube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-spiritual text-lg font-semibold text-white">{t("footer.links")}</h4>
            <ul className="space-y-3 font-body text-sm text-gray-400">
              <li><Link href="/history" className="hover:text-saffron transition-colors">{t("footer.about")}</Link></li>
              <li><Link href="/#events" className="hover:text-saffron transition-colors">{t("footer.events")}</Link></li>
              <li><Link href="/gallery" className="hover:text-saffron transition-colors">{t("footer.gallery")}</Link></li>
              <li><Link href="/donation" className="hover:text-saffron transition-colors">{t("footer.donate")}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-spiritual text-lg font-semibold text-white">{t("footer.contact")}</h4>
            <ul className="space-y-4 font-body text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-saffron shrink-0" />
                <span>Main Temple Complex, Sangam Area, Prayagraj, UP 211005</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-saffron shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-saffron shrink-0" />
                <span>contact@hanumanpushpavarsha.org</span>
              </li>
            </ul>
          </div>

          {/* Temple Timings */}
          <div className="space-y-6">
            <h4 className="font-spiritual text-lg font-semibold text-white">{t("footer.timings")}</h4>
            <ul className="space-y-3 font-body text-sm text-gray-400">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>{t("footer.timings.morning")}</span>
                <span className="text-saffron-light">06:00 AM</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>{t("footer.timings.darshan")}</span>
                <span className="text-saffron-light">07:00 AM - 12:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>{t("footer.timings.evening")}</span>
                <span className="text-saffron-light">07:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-gray-800 pt-8 sm:flex-row">
          <p className="font-body text-xs text-gray-500">
            © {new Date().getFullYear()} {t("footer.title")} {language === "hi" ? "समिति। सर्वाधिकार सुरक्षित।" : "Committee. All rights reserved."}
          </p>
          <div className="mt-4 flex gap-4 text-xs text-gray-500 sm:mt-0">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
