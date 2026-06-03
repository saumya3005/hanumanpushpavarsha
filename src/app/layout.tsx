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
  title: "Hanuman Pushpavarsha Committee | Spiritual & Devotional Service",
  description: "Official website of Hanuman Pushpavarsha Committee. Serving Dharma, Devotion, Culture & Humanity through spiritual events and community service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${kalam.variable}`}>
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
