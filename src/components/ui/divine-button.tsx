"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface DivineButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  withGlow?: boolean;
}

export function DivineButton({
  children,
  className,
  variant = "primary",
  size = "md",
  withGlow = true,
  ...props
}: DivineButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const variants = {
    primary: "bg-gradient-to-r from-saffron to-saffron-dark text-white border-saffron-light",
    secondary: "bg-maroon-dark text-gold border-gold/50",
    outline: "bg-transparent border-saffron text-saffron hover:bg-saffron/10",
    ghost: "bg-transparent border-transparent text-saffron hover:text-gold",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-full border shadow-lg transition-all duration-300",
        "flex items-center justify-center gap-2 tracking-wide font-body",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Magnetic Ripple / Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.2), transparent 40%)`,
        }}
      />

      {/* Persistent Glow Effect for Primary/Secondary */}
      {withGlow && (variant === "primary" || variant === "secondary") && (
        <div className="absolute inset-0 -z-10 animate-glow-pulse rounded-full opacity-50 blur-xl"
             style={{ background: variant === 'primary' ? 'var(--saffron)' : 'var(--gold)' }} />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
        {children}
      </span>
    </motion.button>
  );
}
