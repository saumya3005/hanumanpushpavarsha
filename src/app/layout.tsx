import type { Metadata } from "next";
import { Inter, Cinzel, Kalam } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/ui/navbar";
import { Chatbot } from "@/components/ui/chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin", "devanagari"],
  variable: "--font-kalam",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hanumanpushpavarsha.vercel.app"),
  applicationName: "Hanuman Pushpavarsha Committee",
  title: "Hanuman Pushpavarsha Committee | Spiritual & Devotional Service",
  description: "Official website of Hanuman Pushpavarsha Committee. Serving Dharma, Devotion, Culture & Humanity through spiritual events and community service.",
  icons: {
    icon: [
      { url: "/brand/hanuman-icon.png", type: "image/png", sizes: "781x781" },
    ],
    shortcut: "/brand/hanuman-icon.png",
    apple: "/brand/hanuman-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Hanuman Pushpavarsha Committee",
    title: "Hanuman Pushpavarsha Committee",
    description: "Serving Dharma, Devotion, Culture & Humanity through spiritual events and community service.",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    images: [{
      url: "/brand/hanuman-share.jpg",
      width: 1000,
      height: 1024,
      type: "image/jpeg",
      alt: "Hanuman ji — Hanuman Pushpavarsha Committee",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanuman Pushpavarsha Committee",
    description: "Spiritual events, devotion and community service.",
    images: [{ url: "/brand/hanuman-share.jpg", alt: "Hanuman ji — Hanuman Pushpavarsha Committee" }],
  },
  verification: {
    google: "fcAlA-W3vw6thbY2c3itoxc58DVVeK_Cr20hy2MB6r8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${kalam.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Hanuman Pushpavarsha Committee",
          alternateName: "Hanuman Pushp Varsha Committee",
          url: "https://hanumanpushpavarsha.vercel.app/",
          image: "https://hanumanpushpavarsha.vercel.app/brand/hanuman-share.jpg",
        }) }} />
        <Providers>
          <Navbar />
          {children}
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
