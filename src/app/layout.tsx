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

export const metadata = {
  title: "...",
  description: "...",

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
        <Providers>
          <Navbar />
          {children}
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
