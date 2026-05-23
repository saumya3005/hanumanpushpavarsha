"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "History", href: "/history" },
  { name: "Members", href: "/members" },
  { name: "Gallery", href: "/gallery" },
  { name: "Live Event", href: "/live" },
  { name: "Join Us", href: "/join" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-saffron/20 py-4 shadow-lg shadow-black/50"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold p-0.5 shadow-[0_0_15px_rgba(255,153,51,0.5)] transition-transform group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-black font-hindi text-xl text-saffron">
              ॐ
            </div>
          </div>
          <span className="font-spiritual text-xl font-bold tracking-wider text-white transition-colors group-hover:text-saffron hidden sm:block">
            Hanuman Pushpavarsha
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-body text-sm font-medium tracking-wide transition-colors hover:text-saffron",
                pathname === link.href ? "text-saffron" : "text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/donation"
            className="flex items-center gap-2 rounded-full border border-saffron/50 bg-saffron/10 px-5 py-2 font-body text-sm font-semibold text-saffron transition-all hover:bg-saffron hover:text-white"
          >
            Donate <Heart className="h-4 w-4" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-saffron/20 bg-black/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-spiritual text-lg text-gray-300 hover:text-saffron"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/donation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-full bg-saffron px-8 py-3 font-body font-semibold text-white"
              >
                Donate Now <Heart className="h-4 w-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

