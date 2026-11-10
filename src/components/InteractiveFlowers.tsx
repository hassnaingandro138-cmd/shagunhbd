import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundService } from '../utils/soundService.ts';

interface Petal {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  drift: number;
  color: string;
}

const SWEET_NOTES = [
  '🌸 Sent a bouquet of 100 roses with infinite love!',
  '💖 Shagun, you are the sweetest flower in the garden of my life!',
  '🌹 May your fragrance of kindness never fade!',
  '✨ Fresh rose petals for my irreplaceable bestie!',
  '🌷 A million blossoms can’t match your radiant smile!',
];

export const InteractiveFlowers: React.FC<{
  showPetalsBackground?: boolean;
}> = ({ showPetalsBackground = true }) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [flowerToast, setFlowerToast] = useState<string | null>(null);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (!showPetalsBackground) return;
    const items: Petal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 12,
      size: 16 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 120,
      color: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#f472b6'][Math.floor(Math.random() * 5)],
    }));
    setPetals(items);
  }, [showPetalsBackground]);

  const sendFlowerSurprise = (e: React.MouseEvent) => {
    soundService.playSparkle();
    const randomNote = SWEET_NOTES[Math.floor(Math.random() * SWEET_NOTES.length)];
    setFlowerToast(randomNote);

    // Create burst of floating flowers around click
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 80,
      y: rect.top + (Math.random() - 0.5) * 40,
    }));
    setFloatingHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setFlowerToast(null);
    }, 3800);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.slice(8));
    }, 2000);
  };

  return (
    <>
      {/* Falling Rose Petals Layer */}
      {showPetalsBackground && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
          {petals.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: '-10vh', x: `${p.left}vw`, opacity: 0, rotate: 0 }}
              animate={{
                y: '108vh',
                x: `${p.left + p.drift / 10}vw`,
                opacity: [0, 0.85, 0.9, 0],
                rotate: [0, 180, 360, 540],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
              className="absolute will-change-transform"
            >
              <svg width={p.size} height={p.size * 1.3} viewBox="0 0 30 40">
                <path
                  d="M15 0 C25 10 30 25 15 40 C0 25 5 10 15 0 Z"
                  fill={p.color}
                  opacity="0.85"
                  className="filter drop-shadow-[0_2px_4px_rgba(244,63,94,0.3)]"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Flowers on Click */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {floatingHearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ x: h.x, y: h.y, scale: 0.2, opacity: 1 }}
              animate={{
                y: h.y - 120,
                x: h.x + (Math.random() - 0.5) * 60,
                scale: 1.3,
                opacity: 0,
              }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="absolute text-2xl"
            >
              🌹
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sweet Toast Feedback */}
      <AnimatePresence>
        {flowerToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white font-medium shadow-2xl border border-pink-300/40 flex items-center gap-2 text-sm md:text-base backdrop-blur-md"
          >
            <span className="text-xl animate-spin">🌸</span>
            <span>{flowerToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const FlowerBouquetButton: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  const [toast, setToast] = useState(false);

  const handleClick = () => {
    soundService.playSparkle();
    setToast(true);
    onClick?.();
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleClick}
        className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 shadow-md hover:shadow-pink-500/30 transition-all border border-pink-200/40 flex items-center gap-2 cursor-pointer"
      >
        <span className="text-lg">💐</span>
        <span>Send Shagun Fresh Roses</span>
      </motion.button>
      {toast && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -25 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-pink-300 bg-black/80 px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
        >
          🌹 100 Roses Sent With Love!
        </motion.span>
      )}
    </div>
  );
};
