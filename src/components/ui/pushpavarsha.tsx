"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface PushpavarshaProps {
  isActive?: boolean;
  intensity?: "low" | "medium" | "high";
}

export function Pushpavarsha({ isActive = true, intensity = "medium" }: PushpavarshaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const colors = ["#FF9933", "#FFB366", "#D4AF37", "#F9E076", "#FFCCCC", "#FF6666"];

    const getSettings = () => {
      switch (intensity) {
        case "low":
          return { particleCount: 1, spread: 60, ticks: 200, gravity: 0.3, origin: { y: -0.1 } };
        case "high":
          return { particleCount: 5, spread: 120, ticks: 400, gravity: 0.5, origin: { y: -0.1 } };
        case "medium":
        default:
          return { particleCount: 3, spread: 90, ticks: 300, gravity: 0.4, origin: { y: -0.1 } };
      }
    };

    const frame = () => {
      const settings = getSettings();
      
      myConfetti({
        ...settings,
        origin: { x: Math.random(), y: -0.1 },
        colors: [colors[Math.floor(Math.random() * colors.length)]],
        shapes: ["circle"], // Representing petals
        scalar: Math.random() * 0.8 + 0.4, // Random petal sizes
        disableForReducedMotion: true,
      });

      animationFrameId.current = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      myConfetti.reset();
    };
  }, [isActive, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      aria-hidden="true"
    />
  );
}
