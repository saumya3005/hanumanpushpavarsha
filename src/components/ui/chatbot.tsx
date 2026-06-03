"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message on mount or when language changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        text: t("chatbot.welcome"),
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [language, t]);

  // Scroll to bottom when messages or typing status changes, or chatbot opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate chatbot typing delay
    setTimeout(() => {
      let reply = t("chatbot.reply.default");
      const normalizedText = text.toLowerCase();

      // Check keywords for matches in English and Hindi
      if (
        normalizedText.includes("about") ||
        normalizedText.includes("committee") ||
        normalizedText.includes("history") ||
        normalizedText.includes("mission") ||
        normalizedText.includes("स्थापना") ||
        normalizedText.includes("कमेटी") ||
        normalizedText.includes("समिति") ||
        normalizedText.includes("परिचय") ||
        normalizedText.includes("इतिहास")
      ) {
        reply = t("chatbot.reply.about");
      } else if (
        normalizedText.includes("timing") ||
        normalizedText.includes("time") ||
        normalizedText.includes("event") ||
        normalizedText.includes("aarti") ||
        normalizedText.includes("आरती") ||
        normalizedText.includes("समय") ||
        normalizedText.includes("पुष्पवर्षा") ||
        normalizedText.includes("कार्यक्रम") ||
        normalizedText.includes("दिनांक")
      ) {
        reply = t("chatbot.reply.timings");
      } else if (
        normalizedText.includes("donate") ||
        normalizedText.includes("contribution") ||
        normalizedText.includes("money") ||
        normalizedText.includes("pay") ||
        normalizedText.includes("दान") ||
        normalizedText.includes("सहयोग") ||
        normalizedText.includes("पैसा") ||
        normalizedText.includes("पे") ||
        normalizedText.includes("रुपया")
      ) {
        reply = t("chatbot.reply.donate");
      } else if (
        normalizedText.includes("join") ||
        normalizedText.includes("member") ||
        normalizedText.includes("apply") ||
        normalizedText.includes("जुड़ें") ||
        normalizedText.includes("सदस्य") ||
        normalizedText.includes("आवेदन") ||
        normalizedText.includes("फॉर्म")
      ) {
        reply = t("chatbot.reply.join");
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        text: reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickAction = (actionKey: string, replyKey: string) => {
    const userText = t(actionKey);
    const userMsg: Message = {
      id: Math.random().toString(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: Math.random().toString(),
        text: t(replyKey),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const quickActions = [
    { key: "chatbot.action.about", responseKey: "chatbot.reply.about" },
    { key: "chatbot.action.timings", responseKey: "chatbot.reply.timings" },
    { key: "chatbot.action.donate", responseKey: "chatbot.reply.donate" },
    { key: "chatbot.action.join", responseKey: "chatbot.reply.join" },
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="launcher"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-saffron-light/30 bg-gradient-to-r from-saffron to-saffron-dark text-white shadow-[0_0_20px_rgba(255,153,51,0.5)] transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(255,153,51,0.75)] md:bottom-8 md:right-8 focus:outline-none"
            aria-label={t("chatbot.tooltip")}
          >
            {/* Pulsing Aura */}
            <div className="absolute inset-0 -z-10 animate-glow-pulse rounded-full opacity-60 blur-md" style={{ background: "var(--saffron)" }} />

            <MessageCircle className="h-6 w-6 text-white" />

            {/* Tooltip shown on hover (desktop/tablet) */}
            <span className="absolute right-16 hidden rounded-lg border border-saffron/20 bg-black/90 px-3 py-1.5 font-body text-xs font-semibold whitespace-nowrap text-saffron backdrop-blur-xs transition-all shadow-lg md:inline-block pointer-events-none opacity-0 group-hover:opacity-100 duration-200">
              {t("chatbot.tooltip")}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className={cn(
              "fixed bottom-6 right-6 z-[9999] flex flex-col overflow-hidden rounded-2xl border border-saffron/30 bg-black shadow-[0_10px_50px_rgba(0,0,0,0.8)] backdrop-blur-md md:bottom-8 md:right-8",
              "w-[calc(100vw-32px)] sm:w-[380px] md:w-[400px]",
              "h-[500px] sm:h-[550px] md:h-[600px] max-h-[calc(100dvh-100px)]"
            )}
          >
            {/* Spiritual background image inside chatbot only */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://i.postimg.cc/pXzWfFLN/hpvc-2025-8.jpg")',
              }}
            />
            {/* Dark overlay & blur to ensure text readability */}
            <div className="absolute inset-0 z-10 bg-black/90 backdrop-blur-[2px]" />

            {/* Chatbot Content Container */}
            <div className="relative z-20 flex h-full flex-col">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-saffron/20 bg-black/40 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold p-0.5 shadow-[0_0_10px_rgba(255,153,51,0.3)]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-black font-hindi text-sm text-saffron">
                      ॐ
                    </div>
                  </div>
                  <div>
                    <h3 className="font-spiritual text-sm font-bold tracking-wider text-gold-light">
                      {t("chatbot.title")}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-body text-[10px] text-gray-400">
                        {t("chatbot.subtitle")}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer focus:outline-none"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Message History Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex w-full flex-col",
                      msg.sender === "user" ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed shadow-sm transition-all duration-200",
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-saffron to-saffron-dark text-white rounded-br-none border border-saffron-light/20"
                          : "bg-black/55 text-gray-100 rounded-bl-none border border-saffron/20 backdrop-blur-xs"
                      )}
                    >
                      {msg.text}
                    </div>
                    <span className="mt-1 font-body text-[9px] text-gray-500 px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}

                {/* Loading typing indicator */}
                {isTyping && (
                  <div className="flex w-full flex-col items-start">
                    <div className="flex items-center gap-1.5 rounded-2xl bg-black/55 px-4 py-3 border border-saffron/20 backdrop-blur-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions / Suggestions */}
              {messages.length === 1 && !isTyping && (
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.key}
                        onClick={() => handleQuickAction(action.key, action.responseKey)}
                        className="flex items-center gap-1 cursor-pointer rounded-full border border-saffron/25 bg-black/60 px-3 py-1.5 font-body text-xs text-saffron transition-all hover:bg-saffron hover:text-black hover:border-saffron shadow-sm focus:outline-none"
                      >
                        <Sparkles className="h-3 w-3" />
                        {t(action.key)}
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="border-t border-saffron/20 bg-black/40 p-3"
              >
                <div className="relative flex items-center rounded-full border border-saffron/25 bg-black/60 px-4 py-2 focus-within:border-saffron focus-within:ring-1 focus-within:ring-saffron transition-all">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t("chatbot.placeholder")}
                    className="flex-1 bg-transparent font-body text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-all cursor-pointer",
                      inputValue.trim() && !isTyping
                        ? "bg-saffron text-black hover:bg-gold"
                        : "bg-gray-800 text-gray-500"
                    )}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
