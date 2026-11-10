import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundService } from '../utils/soundService.ts';

interface BalloonData {
  id: number;
  x: number;
  color: string;
  size: number;
  speed: number;
  delay: number;
  sway: number;
  stringLength: number;
}

const BALLOON_COLORS = [
  { main: '#ff2d75', highlight: '#ff77a9', shadow: '#b30040' }, // Rose Pink
  { main: '#1c1917', highlight: '#44403c', shadow: '#0c0a09' }, // Glossy Obsidian Black
  { main: '#fbbf24', highlight: '#fde68a', shadow: '#b45309' }, // Shimmer Gold
  { main: '#f43f5e', highlight: '#fda4af', shadow: '#9f1239' }, // Hot Pink
  { main: '#a855f7', highlight: '#d8b4fe', shadow: '#6b21a8' }, // Lavender Purple
  { main: '#f472b6', highlight: '#fbcfe8', shadow: '#db2777' }, // Baby Pink
];

export const InteractiveBalloons: React.FC<{
  count?: number;
  allowRelease?: boolean;
}> = ({ count = 7, allowRelease = true }) => {
  const [balloons, setBalloons] = useState<BalloonData[]>(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      x: 10 + (i * 80) / count + (Math.random() * 6 - 3),
      color: BALLOON_COLORS[i % BALLOON_COLORS.length].main,
      size: 54 + (i % 3) * 8,
      speed: 12 + (i % 4) * 2,
      delay: i * 0.8,
      sway: 15 + (i % 3) * 8,
      stringLength: 50 + (i % 3) * 10,
    }))
  );

  const [poppedIds, setPoppedIds] = useState<number[]>([]);

  const popBalloon = (id: number) => {
    soundService.playPop();
    setPoppedIds((prev) => [...prev, id]);
  };

  const releaseMoreBalloons = () => {
    soundService.playSparkle();
    const newBalloons: BalloonData[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 85 + 5,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)].main,
      size: 52 + Math.floor(Math.random() * 18),
      speed: 10 + Math.random() * 4,
      delay: Math.random() * 0.6,
      sway: 20 + Math.random() * 15,
      stringLength: 55 + Math.random() * 15,
    }));
    setBalloons((prev) => [...prev, ...newBalloons]);
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {allowRelease && (
        <div className="pointer-events-auto absolute bottom-4 right-4 z-30">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={releaseMoreBalloons}
            className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold bg-pink-600/90 hover:bg-pink-500 text-white shadow-lg backdrop-blur border border-pink-300/30 flex items-center gap-2 cursor-pointer transition-all"
            title="Release a fresh cluster of balloons into the sky!"
          >
            <span>🎈</span>
            <span>Release Balloons</span>
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {balloons.map((b) => {
          if (poppedIds.includes(b.id)) return null;
          return (
            <motion.div
              key={b.id}
              initial={{ y: '110vh', x: 0 }}
              animate={{
                y: '-25vh',
                x: [-b.sway, b.sway, -b.sway],
              }}
              transition={{
                y: {
                  duration: b.speed,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: b.delay,
                },
                x: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="pointer-events-auto absolute cursor-pointer select-none group"
              style={{
                left: `${b.x}%`,
                width: `${b.size}px`,
                height: `${b.size * 1.25}px`,
              }}
              onClick={() => popBalloon(b.id)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.8 }}
            >
              {/* Balloon Body with 3D Glossy Light Gradient */}
              <div
                className="relative w-full h-full rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-xl transition-all"
                style={{
                  backgroundColor: b.color,
                  boxShadow: `0 12px 25px -4px rgba(0,0,0,0.5), inset -8px -12px 18px rgba(0,0,0,0.4), inset 8px 12px 18px rgba(255,255,255,0.45)`,
                }}
              >
                {/* Glossy specular highlight reflection */}
                <div className="absolute top-[14%] left-[20%] w-[24%] h-[38%] rounded-[50%] bg-white/70 blur-[1px] rotate-[-25deg]" />
                <div className="absolute top-[20%] left-[30%] w-[10%] h-[15%] rounded-[50%] bg-white/90" />

                {/* Balloon Tie Knot */}
                <div
                  className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-3.5 h-2.5 rounded-b-md"
                  style={{ backgroundColor: b.color }}
                />

                {/* Gentle String */}
                <svg
                  className="absolute top-full left-1/2 transform -translate-x-1/2 overflow-visible"
                  width="12"
                  height={b.stringLength}
                >
                  <path
                    d={`M6 0 Q10 ${b.stringLength / 2} 6 ${b.stringLength}`}
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>

                {/* Hover hint */}
                <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity whitespace-nowrap">
                  Pop me! 💥
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
