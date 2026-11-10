import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundService } from '../utils/soundService.ts';

interface HeartParticle {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  rotation: number;
  scale: number;
  delay: number;
  duration: number;
  type: 'heart' | 'star' | 'sparkle';
}

interface FireworkBurst {
  id: string;
  cx: number;
  cy: number;
  particles: HeartParticle[];
}

const HEART_COLORS = [
  '#ff1493', // Deep Pink
  '#ff69b4', // Hot Pink
  '#ff007f', // Rose
  '#ff85a2', // Baby Pink
  '#ffb6c1', // Light Pink
  '#ffd700', // Gold
  '#ff4500', // Orange Red
  '#e056fd', // Neon Purple
  '#ff9ff3', // Pastel Pink
  '#ffffff', // Sparkle White
];

export const HeartFireworks: React.FC<{
  autoTrigger?: boolean;
  onExplode?: () => void;
  className?: string;
}> = ({ autoTrigger = false, onExplode, className = '' }) => {
  const [bursts, setBursts] = useState<FireworkBurst[]>([]);
  const [isMegaFireworkActive, setIsMegaFireworkActive] = useState(false);

  const createBurst = useCallback((originX?: number, originY?: number, intensity: number = 40) => {
    soundService.playFirework();
    onExplode?.();

    const cx = originX ?? Math.random() * 80 + 10; // percentage
    const cy = originY ?? Math.random() * 50 + 20;

    const burstId = `burst-${Date.now()}-${Math.random()}`;
    const newParticles: HeartParticle[] = [];

    for (let i = 0; i < intensity; i++) {
      const angle = (i / intensity) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
      const distance = Math.random() * 220 + 70; // px displacement
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;

      newParticles.push({
        id: `p-${burstId}-${i}`,
        x: 0,
        y: 0,
        targetX,
        targetY,
        size: Math.random() * 24 + 14,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        rotation: (Math.random() - 0.5) * 360,
        scale: Math.random() * 0.6 + 0.8,
        delay: Math.random() * 0.08,
        duration: Math.random() * 0.6 + 1.2,
        type: i % 4 === 0 ? 'star' : 'heart',
      });
    }

    // Trigger canvas confetti heart shapes simultaneously for hyper-dense display
    try {
      const heartShape = confetti.shapeFromPath({
        path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
      });
      confetti({
        particleCount: 35,
        spread: 90,
        origin: { x: cx / 100, y: cy / 100 },
        shapes: [heartShape, 'circle'],
        colors: ['#ff1493', '#ff69b4', '#ffd700', '#ff007f', '#ffffff'],
        scalar: 1.3,
        ticks: 200,
      });
    } catch {
      // Fallback if shapeFromPath is unavailable in some canvas contexts
    }

    setBursts((prev) => [...prev.slice(-4), { id: burstId, cx, cy, particles: newParticles }]);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 2400);
  }, [onExplode]);

  const triggerGrandExplosion = useCallback(() => {
    // Bahut saare phatake (Multi-wave explosive barrage!)
    createBurst(50, 40, 50);

    setTimeout(() => createBurst(25, 30, 45), 250);
    setTimeout(() => createBurst(75, 32, 45), 450);
    setTimeout(() => createBurst(40, 20, 55), 750);
    setTimeout(() => createBurst(60, 22, 55), 950);
    setTimeout(() => createBurst(50, 45, 60), 1200);
  }, [createBurst]);

  useEffect(() => {
    if (autoTrigger) {
      triggerGrandExplosion();
    }
  }, [autoTrigger, triggerGrandExplosion]);

  useEffect(() => {
    let interval: any = null;
    if (isMegaFireworkActive) {
      triggerGrandExplosion();
      interval = setInterval(() => {
        createBurst(
          Math.random() * 70 + 15,
          Math.random() * 45 + 15,
          Math.floor(Math.random() * 20 + 35)
        );
      }, 700);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMegaFireworkActive, createBurst, triggerGrandExplosion]);

  return (
    <div className={`relative ${className}`}>
      {/* SVG Canvas Overlay for exploding Heart Paths */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {bursts.map((burst) => (
            <div
              key={burst.id}
              className="absolute pointer-events-none"
              style={{
                left: `${burst.cx}%`,
                top: `${burst.cy}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {burst.particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0.1,
                    opacity: 1,
                    rotate: 0,
                    filter: `drop-shadow(0 0 12px ${p.color})`,
                  }}
                  animate={{
                    x: p.targetX,
                    y: p.targetY + 45, // realistic gravity drop
                    scale: [0.2, p.scale * 1.4, p.scale, 0],
                    opacity: [1, 1, 0.9, 0],
                    rotate: p.rotation,
                    filter: [
                      `drop-shadow(0 0 8px ${p.color})`,
                      `drop-shadow(0 0 20px ${p.color})`,
                      `drop-shadow(0 0 4px ${p.color})`,
                    ],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: [0.12, 0.8, 0.35, 1],
                  }}
                  className="absolute left-0 top-0 will-change-transform"
                >
                  {p.type === 'heart' ? (
                    <svg
                      width={p.size}
                      height={p.size}
                      viewBox="0 0 24 24"
                      className="overflow-visible"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill={p.color}
                        stroke="#ffffff"
                        strokeWidth="0.8"
                      />
                    </svg>
                  ) : (
                    // Sparkling 4-point golden star
                    <svg
                      width={p.size * 0.9}
                      height={p.size * 0.9}
                      viewBox="0 0 24 24"
                      className="overflow-visible"
                    >
                      <path
                        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                        fill={p.color}
                      />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Control Buttons Panel */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => triggerGrandExplosion()}
          className="relative group overflow-hidden px-7 py-3.5 rounded-full font-bold text-base md:text-lg text-white shadow-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 transition-all border border-pink-300/40 flex items-center gap-2.5 cursor-pointer"
        >
          <span className="text-2xl animate-bounce">🎆</span>
          <span>Launch Heart Fireworks! 💖</span>
          <span className="text-xl">✨</span>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMegaFireworkActive((prev) => !prev)}
          className={`px-5 py-3 rounded-full text-sm font-semibold transition-all border flex items-center gap-2 cursor-pointer ${
            isMegaFireworkActive
              ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/50 animate-pulse'
              : 'bg-black/60 dark:bg-zinc-900/80 text-pink-300 border-pink-500/40 hover:bg-pink-950/40'
          }`}
        >
          <span>{isMegaFireworkActive ? '🛑 Pause Non-Stop Fireworks' : '✨ Non-Stop Sky Show'}</span>
        </motion.button>
      </div>
    </div>
  );
};
