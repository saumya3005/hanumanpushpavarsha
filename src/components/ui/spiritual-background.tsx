"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SpiritualBackgroundProps {
  children?: React.ReactNode;
}

export function SpiritualBackground({ children }: SpiritualBackgroundProps) {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityAura = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5 - 0.5; // Moving up
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? "#FF9933" : "#D4AF37"; // Saffron or Gold
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < 0) {
          this.y = canvas!.height;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Dark Cinematic Base */}
      <div className="absolute inset-0 bg-[#050505] -z-50" />

      {/* Divine Aura Glow */}
      <motion.div
        style={{ opacity: opacityAura }}
        className="absolute left-1/2 top-0 -z-40 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron opacity-20 blur-[150px] mix-blend-screen"
      />

      {/* Smoke / Fog Overlay (Subtle) */}
      <motion.div
        className="absolute inset-0 -z-30 opacity-30 mix-blend-screen"
        style={{
          y: yBg,
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)"
        }}
      />

      {/* Floating Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20 h-full w-full opacity-60 mix-blend-screen"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
